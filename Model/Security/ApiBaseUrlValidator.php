<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Security;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

/**
 * SSRF-safe validator for the configurable `trusteed_general/general/api_base_url`.
 *
 * Threat model:
 *   - Wildcard host suffixes (`*.trusteed.xyz`) are too broad: a single
 *     compromised subdomain (DNS poisoning, dangling CNAME, takeover) lets an
 *     attacker exfiltrate the integration token via the introspect call.
 *   - `api_base_url` is admin-configurable. If the admin panel is compromised
 *     (CSRF, stored XSS, supply-chain) the attacker may swap the URL to a host
 *     they control, capturing the bearer token POSTed by IntrospectToken.
 *   - Even when an attacker rewrites a config value through a code path that
 *     bypasses {@see validateForSave()}, the runtime check {@see isAuthorized()}
 *     compares the current host against a SHA-256 hash sealed at save time.
 *     Any mismatch ⇒ reject.
 *
 * Design:
 *   1. A closed, immutable allowlist (`ALLOWED_HOSTS`) — exact match only.
 *   2. Self-hosted deployments still possible: admin can register a custom host
 *      ONCE at config save time. Strict validation runs ONLY at save:
 *        - HTTPS scheme.
 *        - Host resolves to a public IP (no private/loopback/link-local/CGNAT).
 *        - TLS certificate validates (peer + name).
 *        - No HTTP→HTTP redirect chains (handled by IntrospectToken CURLOPT_FOLLOWLOCATION=0).
 *      On success we persist `sha256(host)` in config. On every
 *      authorisation check we recompute the hash against the live host.
 *   3. Pre-DNS guard: rejects RFC1918 + loopback + link-local + multicast +
 *      CGNAT (100.64.0.0/10) + IPv6 ULA/loopback.
 *
 * NOTE: this class is intentionally pure-PHP (no Magento internals beyond
 * {@see ScopeConfigInterface}) so it can be exercised by `Test/Unit/**`
 * without the Magento framework.
 *
 * Spec 050 — IntrospectToken SSRF hardening (Gap closure 2026-05-26).
 */
class ApiBaseUrlValidator
{
    /**
     * Closed allowlist — exact host match. Wildcards are explicitly disallowed.
     */
    public const ALLOWED_HOSTS = [
        'api.trusteed.xyz',
        'staging.trusteed.xyz',
        'trusteed.xyz',
    ];

    public const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    public const CONFIG_API_HOST_HASH = 'trusteed_general/general/api_base_url_host_hash';

    private const CONNECT_TIMEOUT_SECONDS = 5;
    private const TOTAL_TIMEOUT_SECONDS = 5;
    private const HEALTH_PATH = '/api/v1/health';

    /**
     * Outcome codes for audit log / API response.
     */
    public const OK_ALLOWLIST = 'ok_allowlist';
    public const OK_CONFIGURED_HASH_MATCH = 'ok_configured_hash_match';
    public const REJECT_SCHEME = 'reject_scheme_not_https';
    public const REJECT_BAD_URL = 'reject_bad_url';
    public const REJECT_HOST_NOT_ALLOWED = 'reject_host_not_allowed';
    public const REJECT_HASH_MISMATCH = 'reject_configured_host_hash_mismatch';
    public const REJECT_PRIVATE_IP = 'reject_resolved_to_private_ip';
    public const REJECT_UNRESOLVABLE = 'reject_host_unresolvable';
    public const REJECT_TLS = 'reject_tls_validation_failed';
    public const REJECT_REDIRECT = 'reject_unexpected_redirect';
    public const REJECT_HEALTH = 'reject_health_probe_failed';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
    ) {}

    // ─── Runtime check (called from IntrospectToken on every request) ──────

    /**
     * @return array{authorized:bool, host:?string, outcome:string}
     */
    public function isAuthorized(string $url): array
    {
        $parsed = $this->parseHttpsUrl($url);
        if ($parsed === null) {
            return [
                'authorized' => false,
                'host' => null,
                'outcome' => str_starts_with($url, 'https://')
                    ? self::REJECT_BAD_URL
                    : self::REJECT_SCHEME,
            ];
        }
        $host = $parsed['host'];

        // 1. Exact match against the closed allowlist always wins.
        if (in_array($host, self::ALLOWED_HOSTS, true)) {
            return ['authorized' => true, 'host' => $host, 'outcome' => self::OK_ALLOWLIST];
        }

        // 2. Custom self-hosted: requires sealed sha256(host) hash from save time.
        $configuredBase = (string)$this->scopeConfig->getValue(
            self::CONFIG_API_BASE,
            ScopeInterface::SCOPE_STORE
        );
        $sealedHash = (string)$this->scopeConfig->getValue(
            self::CONFIG_API_HOST_HASH,
            ScopeInterface::SCOPE_STORE
        );

        if ($configuredBase === '' || $sealedHash === '') {
            return ['authorized' => false, 'host' => $host, 'outcome' => self::REJECT_HOST_NOT_ALLOWED];
        }

        $configuredHost = $this->normalizeHost((string)parse_url($configuredBase, PHP_URL_HOST));
        if ($configuredHost === null || $configuredHost !== $host) {
            return ['authorized' => false, 'host' => $host, 'outcome' => self::REJECT_HOST_NOT_ALLOWED];
        }

        $expected = $this->hashHost($host);
        if (!hash_equals($sealedHash, $expected)) {
            // Configured host changed post-save without re-validation.
            return ['authorized' => false, 'host' => $host, 'outcome' => self::REJECT_HASH_MISMATCH];
        }

        return ['authorized' => true, 'host' => $host, 'outcome' => self::OK_CONFIGURED_HASH_MATCH];
    }

    // ─── Save-time validation (called from Save controller) ────────────────

    /**
     * Heavy validation: HTTPS, public IP, TLS, optional health probe.
     *
     * @param  callable|null  $httpProbe  Optional probe override for tests.
     *                                    Signature: fn(string $url): array{ok:bool, outcome:string}
     * @return array{ok:bool, host:?string, hash:?string, outcome:string}
     */
    public function validateForSave(string $url, ?callable $httpProbe = null): array
    {
        $parsed = $this->parseHttpsUrl($url);
        if ($parsed === null) {
            return [
                'ok' => false,
                'host' => null,
                'hash' => null,
                'outcome' => str_starts_with($url, 'https://') ? self::REJECT_BAD_URL : self::REJECT_SCHEME,
            ];
        }
        $host = $parsed['host'];

        // Trusted allowlist hosts skip DNS/TLS validation (they're operator-owned).
        if (in_array($host, self::ALLOWED_HOSTS, true)) {
            return [
                'ok' => true,
                'host' => $host,
                'hash' => $this->hashHost($host),
                'outcome' => self::OK_ALLOWLIST,
            ];
        }

        // Custom host → must resolve to a public IP.
        $ipCheck = $this->resolveToPublicIp($host);
        if (!$ipCheck['ok']) {
            return ['ok' => false, 'host' => $host, 'hash' => null, 'outcome' => $ipCheck['outcome']];
        }

        // TLS / redirect / health probe. Real implementation uses cURL with strict
        // verification + no redirects. Tests inject `$httpProbe`.
        $probe = $httpProbe ?? fn(string $u): array => $this->defaultHttpProbe($u);
        $probeResult = $probe($url . self::HEALTH_PATH);
        if (!$probeResult['ok']) {
            return [
                'ok' => false,
                'host' => $host,
                'hash' => null,
                'outcome' => $probeResult['outcome'] ?? self::REJECT_HEALTH,
            ];
        }

        return [
            'ok' => true,
            'host' => $host,
            'hash' => $this->hashHost($host),
            'outcome' => self::OK_CONFIGURED_HASH_MATCH,
        ];
    }

    // ─── Internals ──────────────────────────────────────────────────────────

    /**
     * @return array{host:string,url:string}|null
     */
    private function parseHttpsUrl(string $url): ?array
    {
        if (!str_starts_with($url, 'https://')) {
            return null;
        }
        $parts = parse_url($url);
        if (!is_array($parts) || ($parts['scheme'] ?? '') !== 'https') {
            return null;
        }
        $host = $this->normalizeHost((string)($parts['host'] ?? ''));
        if ($host === null) {
            return null;
        }
        return ['host' => $host, 'url' => $url];
    }

    private function normalizeHost(string $host): ?string
    {
        $host = strtolower(trim($host));
        if ($host === '') {
            return null;
        }
        // Strip surrounding brackets from IPv6 literals.
        if (str_starts_with($host, '[') && str_ends_with($host, ']')) {
            $host = substr($host, 1, -1);
        }
        return $host;
    }

    private function hashHost(string $host): string
    {
        return hash('sha256', $host);
    }

    /**
     * @return array{ok:bool, outcome:string, ips:list<string>}
     */
    private function resolveToPublicIp(string $host): array
    {
        // If the host is a literal IP, validate it directly.
        if (filter_var($host, FILTER_VALIDATE_IP) !== false) {
            return $this->isPublicIp($host)
                ? ['ok' => true, 'outcome' => self::OK_CONFIGURED_HASH_MATCH, 'ips' => [$host]]
                : ['ok' => false, 'outcome' => self::REJECT_PRIVATE_IP, 'ips' => [$host]];
        }

        $records = @dns_get_record($host, DNS_A | DNS_AAAA);
        if (!is_array($records) || $records === []) {
            // Fall back to gethostbynamel for environments where dns_get_record is sandboxed.
            $fallback = @gethostbynamel($host);
            if (!is_array($fallback) || $fallback === []) {
                return ['ok' => false, 'outcome' => self::REJECT_UNRESOLVABLE, 'ips' => []];
            }
            $records = array_map(fn($ip) => ['ip' => $ip], $fallback);
        }

        $ips = [];
        foreach ($records as $rec) {
            $ip = $rec['ip'] ?? $rec['ipv6'] ?? null;
            if (!is_string($ip)) {
                continue;
            }
            $ips[] = $ip;
            if (!$this->isPublicIp($ip)) {
                return ['ok' => false, 'outcome' => self::REJECT_PRIVATE_IP, 'ips' => $ips];
            }
        }

        if ($ips === []) {
            return ['ok' => false, 'outcome' => self::REJECT_UNRESOLVABLE, 'ips' => []];
        }

        return ['ok' => true, 'outcome' => self::OK_CONFIGURED_HASH_MATCH, 'ips' => $ips];
    }

    public function isPublicIp(string $ip): bool
    {
        // Reject anything in RFC1918, loopback, link-local, multicast, reserved.
        $public = filter_var(
            $ip,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
        );
        if ($public === false) {
            return false;
        }

        // Manually exclude CGNAT 100.64.0.0/10 (not covered by FILTER_FLAG_NO_RES_RANGE on all PHP builds).
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) {
            $long = ip2long($ip);
            if ($long !== false) {
                $cgnatStart = ip2long('100.64.0.0');
                $cgnatEnd = ip2long('100.127.255.255');
                if ($cgnatStart !== false && $cgnatEnd !== false && $long >= $cgnatStart && $long <= $cgnatEnd) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Default cURL-based health probe. Strict TLS, no redirects, 5s timeout.
     *
     * @return array{ok:bool, outcome:string, httpCode?:int}
     */
    private function defaultHttpProbe(string $url): array
    {
        if (!function_exists('curl_init')) {
            // No cURL available — fail closed.
            return ['ok' => false, 'outcome' => self::REJECT_HEALTH];
        }

        $ch = curl_init($url);
        if ($ch === false) {
            return ['ok' => false, 'outcome' => self::REJECT_HEALTH];
        }

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_CONNECTTIMEOUT => self::CONNECT_TIMEOUT_SECONDS,
            CURLOPT_TIMEOUT => self::TOTAL_TIMEOUT_SECONDS,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
            CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);

        $body = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $errno = curl_errno($ch);
        curl_close($ch);

        if ($errno === CURLE_SSL_CACERT
            || $errno === CURLE_SSL_PEER_CERTIFICATE
            || $errno === CURLE_SSL_CONNECT_ERROR
            || $errno === CURLE_PEER_FAILED_VERIFICATION) {
            return ['ok' => false, 'outcome' => self::REJECT_TLS];
        }
        if ($errno !== 0 || $body === false) {
            return ['ok' => false, 'outcome' => self::REJECT_HEALTH];
        }
        if ($httpCode >= 300 && $httpCode < 400) {
            return ['ok' => false, 'outcome' => self::REJECT_REDIRECT, 'httpCode' => $httpCode];
        }
        if ($httpCode < 200 || $httpCode >= 500) {
            return ['ok' => false, 'outcome' => self::REJECT_HEALTH, 'httpCode' => $httpCode];
        }

        return ['ok' => true, 'outcome' => self::OK_CONFIGURED_HASH_MATCH, 'httpCode' => $httpCode];
    }
}
