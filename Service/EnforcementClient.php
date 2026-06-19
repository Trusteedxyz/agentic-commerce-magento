<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Outcome of consumeNonce() — single-use replay protection (spec-048 P2.8).
 *
 *   ACCEPTED       — HTTP 200, nonce stored, token may be used.
 *   REPLAY         — HTTP 409, nonce already seen — caller must mark token INVALID.
 *   INDETERMINATE  — network / 5xx / 4xx / bad response — caller maps per failure_mode.
 *
 * Mirrors WC Amcp_Nonce_Outcome + PS Mcpwebstore\Enforcement\NonceOutcome.
 */
class NonceOutcome
{
    public const ACCEPTED      = 'ACCEPTED';
    public const REPLAY        = 'REPLAY';
    public const INDETERMINATE = 'INDETERMINATE';
}

/**
 * HTTP client for POST /v1/rules/evaluate and GET /v1/rules/snapshot/:merchantId.
 *
 * Signs requests with HMAC-SHA256 in Stripe-style format:
 *   X-Trusteed-Signature: t=<unix>,s=<sha256-hex>
 *
 * Failure semantics (spec-050 audit Stream B — M1 fail-closed in enforce mode):
 *   - evaluate(): on transport error / non-2xx / SSRF-guard rejection, returns
 *     'BLOCK' when `trusteed/enforcement/failure_mode` === 'enforce', else
 *     'ALLOW' (observe). Snapshot/history fetches always degrade to a safe empty
 *     default so they never themselves block a checkout.
 *
 * Decision outcomes returned by evaluate():
 *   - 'ALLOW'    — proceed with checkout.
 *   - 'BLOCK'    — hard block (rule violation or fail-closed transport error).
 *   - 'ESCALATE' — R043 HITL: the order must NOT be created but the intent is
 *                  recorded as pending merchant approval.
 *
 * @since 1.0.0 (spec-050 enforcement layer)
 */
class EnforcementClient
{
    public const DECISION_ALLOW    = 'ALLOW';
    public const DECISION_BLOCK    = 'BLOCK';
    public const DECISION_ESCALATE = 'ESCALATE';

    private const TIMEOUT_SECONDS = 5;
    private const SNAPSHOT_CACHE_TTL = 60;

    /** In-memory cache: agentDidResolver per merchantId (legacy callers). */
    private array $snapshotCache = [];

    /** In-memory cache: full decoded snapshot payload per merchantId (B7b). */
    private array $payloadCache = [];

    /**
     * @param ApiBaseUrlValidator|null $urlValidator SSRF guard for the
     *        admin-configurable api_base_url. Production DI auto-wires this by
     *        type-hint; legacy unit tests that construct the client positionally
     *        may pass null, in which case the SSRF allowlist check is skipped but
     *        HTTPS scheme + TLS hardening are still enforced (defence in depth).
     */
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    /**
     * SSRF + HTTPS guard for an admin-configurable api_base_url. Returns true
     * when the base URL is safe to POST/GET signed material to.
     *
     * - HTTPS scheme is ALWAYS required (even when no validator is injected).
     * - When a validator is present, the host must be allowlisted or match the
     *   sealed sha256(host) registered at config-save time.
     *
     * @param string $apiBase Already rtrim()'d base URL (no trailing slash).
     */
    private function isOutboundAuthorized(string $apiBase): bool
    {
        if (!str_starts_with($apiBase, 'https://')) {
            $this->logger->warning('[trusteed] outbound rejected: api_base_url is not HTTPS');
            return false;
        }
        if ($this->urlValidator === null) {
            return true;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[trusteed] outbound rejected by SSRF guard', [
                'host'    => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return false;
        }
        return true;
    }

    /**
     * Apply strict TLS + HTTPS-only transport hardening before every outbound
     * curl call. Mirrors Controller/Adminhtml/Token/Issue.php so a tampered
     * api_base_url can never be downgraded to plaintext or follow a redirect to
     * an attacker-controlled host.
     */
    private function applyTlsHardening(): void
    {
        $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
        $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
    }

    /**
     * Call /v1/rules/evaluate and return one of DECISION_ALLOW / DECISION_BLOCK
     * / DECISION_ESCALATE.
     *
     * Fail behaviour (M1): on transport error, non-2xx, or SSRF-guard rejection
     * this returns DECISION_BLOCK when failure_mode === 'enforce', else
     * DECISION_ALLOW (observe). The unconfigured short-circuit (no installation)
     * still returns ALLOW so a store that hasn't completed the connector wizard
     * is never blocked.
     *
     * H3: when the backend responds BLOCK + ucp.state === 'requires_escalation'
     * with an R043 reason code, evaluate() surfaces DECISION_ESCALATE so the
     * observer can apply the HITL freeze instead of a hard block.
     *
     * @param array $payload {merchantId, agentId, orderContext, platform, installationId, timestamp}
     */
    public function evaluate(array $payload): string
    {
        $apiBase        = rtrim($this->getApiBase(), '/');
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();

        // Unconfigured connector → never block (wizard not completed yet).
        if ($apiBase === '' || $installationId === '') {
            return self::DECISION_ALLOW;
        }

        // H1 — SSRF + HTTPS guard before signing anything outbound. A tampered
        // api_base_url must fail per failure_mode, never silently exfiltrate the
        // HMAC-signed payload to an attacker-controlled host.
        if (!$this->isOutboundAuthorized($apiBase)) {
            return $this->failClosedDecision();
        }

        $url     = $apiBase . '/v1/rules/evaluate';
        $rawBody = json_encode($payload);
        if ($rawBody === false) {
            // Local encode failure is not a transport/network condition — never
            // fabricate a block from our own bug; degrade to ALLOW.
            $this->logger->warning('[trusteed] evaluate payload json_encode failed');
            return self::DECISION_ALLOW;
        }

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature($rawBody, $hmacSecret));
            $this->curl->post($url, $rawBody);

            $status = (int)$this->curl->getStatus();
            if ($status < 200 || $status >= 300) {
                $this->logger->warning("[trusteed] evaluate HTTP {$status}");
                return $this->failClosedDecision();
            }

            $body = json_decode($this->curl->getBody(), true);
            if (!is_array($body) || empty($body['decision'])) {
                // A 2xx with an unparseable body is a protocol error, not a
                // transport failure — preserve historical fail-open behaviour.
                return self::DECISION_ALLOW;
            }
            return $this->mapDecision($body);
        } catch (\Exception $e) {
            $this->logger->warning('[trusteed] evaluate error: ' . $e->getMessage());
            return $this->failClosedDecision();
        }
    }

    /**
     * H3 — Map a 2xx evaluate() body to ALLOW / BLOCK / ESCALATE. A BLOCK whose
     * `ucp.state` is `requires_escalation` with an R043 reason code surfaces as
     * ESCALATE so the observer can apply the HITL freeze rather than a hard
     * block. All other BLOCKs remain hard blocks.
     *
     * @param array<string,mixed> $body
     */
    private function mapDecision(array $body): string
    {
        if (($body['decision'] ?? '') !== 'BLOCK') {
            return self::DECISION_ALLOW;
        }
        $ucp = is_array($body['ucp'] ?? null) ? $body['ucp'] : [];
        $reasonCode = is_string($ucp['reason_code'] ?? null) ? $ucp['reason_code'] : '';
        if (($ucp['state'] ?? '') === 'requires_escalation'
            && str_starts_with($reasonCode, 'trusteed:R043')) {
            return self::DECISION_ESCALATE;
        }
        return self::DECISION_BLOCK;
    }

    /**
     * M1 — fail-closed decision: BLOCK when failure_mode === 'enforce', else
     * ALLOW (observe). Used for transport errors, non-2xx and SSRF rejections.
     */
    private function failClosedDecision(): string
    {
        return $this->getFailureMode() === 'enforce'
            ? self::DECISION_BLOCK
            : self::DECISION_ALLOW;
    }

    /**
     * Resolve `trusteed/enforcement/failure_mode`. Defaults to 'enforce'
     * (fail-closed) when unset, matching CheckoutSubmitBefore::getFailureMode.
     */
    private function getFailureMode(): string
    {
        $mode = (string) ($this->scopeConfig->getValue('trusteed/enforcement/failure_mode') ?? 'enforce');
        return $mode === 'observe' ? 'observe' : 'enforce';
    }

    /**
     * Fetch snapshot and return agentDidResolver array.
     * Returns empty array (fail-open) on any error.
     *
     * @param string $merchantId
     * @return array<array{did: string, publicKeyJwk: array}>
     */
    public function getDidResolver(string $merchantId): array
    {
        if (isset($this->snapshotCache[$merchantId])) {
            return $this->snapshotCache[$merchantId];
        }
        $payload = $this->fetchSnapshotPayload($merchantId);
        if ($payload === null) {
            return [];
        }
        $resolver = isset($payload['agentDidResolver'])
            ? (array) $payload['agentDidResolver']
            : [];
        $this->snapshotCache[$merchantId] = $resolver;
        return $resolver;
    }

    /**
     * B7b — fetch snapshot and return the `rules` array so callers
     * (CheckoutSubmitBefore) can extract per-rule params such as
     * `R015.params.priceSnapHmacKeyHex`.
     *
     * Returns empty array on any failure (fail-open). Cached per-request.
     *
     * @return array<int, array{ruleCode: string, params?: array, mode?: string, enabled?: bool}>
     */
    public function getRules(string $merchantId): array
    {
        $payload = $this->fetchSnapshotPayload($merchantId);
        if ($payload === null || !isset($payload['rules'])) {
            return [];
        }
        return is_array($payload['rules']) ? $payload['rules'] : [];
    }

    /**
     * Shared snapshot fetch + JWS payload decode (fail-open). Caches full
     * payload so `getDidResolver` and `getRules` share a single HTTP round
     * trip per request.
     */
    private function fetchSnapshotPayload(string $merchantId): ?array
    {
        if ($merchantId === '') {
            return null;
        }
        if (array_key_exists($merchantId, $this->payloadCache)) {
            return $this->payloadCache[$merchantId];
        }

        $apiBase        = $this->getApiBase();
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();

        $apiBase = rtrim($apiBase, '/');

        if ($apiBase === '' || $installationId === '') {
            $this->payloadCache[$merchantId] = null;
            return null;
        }

        // H1 — SSRF + HTTPS guard. Snapshot fetch fails open (null) per the
        // existing contract, so a rejected URL simply yields the safe default.
        if (!$this->isOutboundAuthorized($apiBase)) {
            $this->payloadCache[$merchantId] = null;
            return null;
        }

        $url = $apiBase . '/v1/rules/snapshot/' . rawurlencode($merchantId);

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature('', $hmacSecret));
            // Spec-048 FR-008 — negotiate the contract wire format: a bare JWS
            // Compact body with Content-Type application/jose. Mirrors the
            // WP-plugin / PrestaShop / Odoo clients.
            $this->curl->addHeader('Accept', 'application/jose');
            $this->curl->get($url);

            $status = (int)$this->curl->getStatus();
            if ($status !== 200) {
                $this->logger->warning("[trusteed] snapshot HTTP {$status}");
                $this->payloadCache[$merchantId] = null;
                return null;
            }

            // Contract response is the bare JWS Compact string. Trim any
            // trailing whitespace/newlines before decoding.
            $jws = trim((string)$this->curl->getBody());
            if ($jws === '') {
                $this->payloadCache[$merchantId] = null;
                return null;
            }

            $payload = $this->decodeJwsPayloadUnsafe($jws);
            $this->payloadCache[$merchantId] = $payload;
            return $payload;
        } catch (\Exception $e) {
            $this->logger->warning('[trusteed] snapshot error: ' . $e->getMessage());
            $this->payloadCache[$merchantId] = null;
            return null;
        }
    }

    /**
     * Call POST /v1/agent-events/nonce-consume to record a single-use
     * agent-token jti (spec-048 P2.8 replay protection).
     *
     * Mirrors WC consume_nonce() and PS SnapshotClient::consumeNonce(). Reuses
     * the Stripe-style HMAC signing helper already used by evaluate().
     *
     *   200 → ACCEPTED  (nonce stored)
     *   409 → REPLAY    (nonce already seen — token must be downgraded)
     *   timeout / 5xx / 4xx → INDETERMINATE  (caller maps per failure_mode)
     *
     * @param string $agentDid Verified agent DID from token iss/kid claim.
     * @param string $jti      Single-use nonce — base64url 16–128 chars.
     * @param int    $exp      Token exp (unix seconds). Used as TTL upper bound.
     * @return array{outcome:string,reason:string,httpStatus:int|null}
     */
    public function consumeNonce(string $agentDid, string $jti, int $exp): array
    {
        $apiBase        = $this->getApiBase();
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();
        $merchantId     = (string)($this->scopeConfig->getValue('trusteed_general/general/merchant_id') ?? '');

        $apiBase = rtrim($apiBase, '/');

        if ($apiBase === '' || $installationId === '') {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'config_missing', 'httpStatus' => null];
        }

        // H1 — SSRF + HTTPS guard. A rejected URL maps to INDETERMINATE so the
        // caller honours failure_mode (enforce → token treated INVALID).
        if (!$this->isOutboundAuthorized($apiBase)) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'ssrf_guard_rejected', 'httpStatus' => null];
        }

        $rawBody = json_encode([
            'merchantId'     => $merchantId,
            'installationId' => $installationId,
            'agentId'        => $agentDid,
            'nonce'          => $jti,
            'expiresAt'      => gmdate(
                'Y-m-d\TH:i:s\Z',
                $exp > 0 ? $exp : (time() + 300)
            ),
        ]);
        if ($rawBody === false) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'json_encode_failed', 'httpStatus' => null];
        }

        $url = rtrim($apiBase, '/') . '/v1/agent-events/nonce-consume';

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature($rawBody, $hmacSecret));
            $this->curl->post($url, $rawBody);
        } catch (\Exception $e) {
            $this->logger->warning('[trusteed] nonce-consume error: ' . $e->getMessage());
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'network_error', 'httpStatus' => null];
        }

        $status = (int)$this->curl->getStatus();
        if ($status === 200) {
            return ['outcome' => NonceOutcome::ACCEPTED, 'reason' => 'ok', 'httpStatus' => $status];
        }
        if ($status === 409) {
            return ['outcome' => NonceOutcome::REPLAY, 'reason' => 'replay_detected', 'httpStatus' => $status];
        }
        if ($status >= 500) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'http_5xx', 'httpStatus' => $status];
        }
        return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'http_4xx', 'httpStatus' => $status];
    }

    private function buildSignature(string $rawBody, string $secret): string
    {
        $ts = time();
        if ($secret === '') {
            return "t={$ts},s=dev-bypass";
        }
        $hex = hash_hmac('sha256', "{$ts}.{$rawBody}", $secret);
        return "t={$ts},s={$hex}";
    }

    /** Decode JWS payload without signature verification (snapshot trust deferred). */
    private function decodeJwsPayloadUnsafe(string $jwsCompact): ?array
    {
        $parts = explode('.', $jwsCompact);
        if (count($parts) < 2) {
            return null;
        }
        $padded = strtr($parts[1], '-_', '+/');
        $mod    = strlen($padded) % 4;
        if ($mod !== 0) {
            $padded .= str_repeat('=', 4 - $mod);
        }
        $json = base64_decode($padded, true);
        $data = $json !== false ? json_decode($json, true) : null;
        return is_array($data) ? $data : null;
    }

    private function getApiBase(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed_general/general/api_base_url') ?? '');
    }

    private function getInstallationId(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed/enforcement/installation_id') ?? '');
    }

    private function getHmacSecret(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed/enforcement/hmac_secret') ?? '');
    }
}
