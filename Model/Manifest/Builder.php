<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Manifest;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Cache\FrontendInterface;
use Magento\Framework\Event\ManagerInterface as EventManager;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Model\ScopeInterface;
use Magento\Store\Model\StoreManagerInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

/**
 * Builds the .well-known/mcp.json manifest payload and obtains a backend-signed
 * detached JWS for it.
 *
 * Design decisions:
 * - ALL configured store-views are included in store_views[] regardless of the
 *   domain that served the request (clarification Q1 — one signing key per
 *   merchant connection, multi-domain dispatch).
 * - Payload is cached 300 s with tag TRUSTEED_MANIFEST; cache is busted when
 *   store views change (store_save_after observer triggers regeneration).
 *
 * Signing architecture (ADR-050 — Accepted, Option A, 2026-06-01):
 * - The manifest is signed SERVER-SIDE by MCPWebStore. This module POSTs the
 *   canonical manifest payload to `POST /api/v1/internal/magento/manifest/sign`
 *   and embeds the returned detached JWS. The Ed25519 PRIVATE KEY NEVER LEAVES
 *   THE BACKEND — this module never holds key material.
 * - The previous flow (GET /api/v1/internal/magento/signing-key → local
 *   `sodium_crypto_sign_detached`) is REMOVED. Handing a private key to the
 *   merchant host was the rejected option (ADR-050 §Considered Options C/Option
 *   A; STRIDE Information Disclosure mitigation = "private key never leaves
 *   SecretVault").
 * - Auth reuses the canonical internal HMAC scheme already shipping for the
 *   analytics event sink (`internal_hmac_secret` + `connection_id`):
 *
 *       signing_string = "POST"                 "\n"
 *                      || "/api/v1/internal/magento/manifest/sign" "\n"
 *                      || ""                     "\n"  (no query)
 *                      || timestamp_unix_secs    "\n"
 *                      || sha256_hex(rawBody)
 *
 *       signature      = HMAC-SHA256(internal_hmac_secret, signing_string)
 *
 *   The backend overwrites `issuer`/`merchant_id`/`capabilities` from the
 *   connection (ADR-014 ServerTrustedStoreId) and returns the exact canonical
 *   `signed_payload` it signed, which this module serves verbatim so the JWS
 *   `manifest_hash` verifies against the served bytes.
 *
 * - On signing failure: throws ManifestSigningException (caller returns 503 /
 *   serves last-known-good cache where available).
 * - Emits trusteed_manifest_published analytics event (T021b).
 */
class Builder
{
    private const CACHE_KEY = 'TRUSTEED_MANIFEST';
    private const CACHE_LIFETIME = 300;
    private const CACHE_TAG = 'TRUSTEED_MANIFEST';

    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_CONNECTION_ID = 'trusteed_general/general/connection_id';
    private const CONFIG_INTERNAL_HMAC_SECRET = 'trusteed_general/general/internal_hmac_secret';
    private const CONFIG_STORE_VIEW_SELECTION = 'trusteed_general/general/store_view_selection';

    /** Backend remote-sign endpoint (ADR-050 Option A). */
    private const SIGN_PATH = '/api/v1/internal/magento/manifest/sign';

    private const SIGN_TIMEOUT_SECONDS = 5;

    /**
     * Allowlist of permitted API hostnames. Prevents SSRF (token/HMAC
     * exfiltration via a tampered api_base_url). Mirrors the closed allowlist
     * doctrine in {@see \Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator}.
     */
    private const ALLOWED_API_HOSTS = [
        'api.trusteed.xyz',
        'staging.trusteed.xyz',
        'trusteed.xyz',
        'api-staging.trusteed.xyz',
    ];

    public function __construct(
        private readonly StoreManagerInterface $storeManager,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly FrontendInterface $cache,
        private readonly EventManager $eventManager,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader,
        private readonly Curl $curlClient,
        private readonly InternalHmacSigner $internalHmacSigner,
    ) {}

    /**
     * Build and return the signed manifest payload.
     *
     * @throws ManifestSigningException when the backend signature cannot be obtained.
     */
    public function build(string $merchantId = ''): array
    {
        $cacheKey = self::CACHE_KEY . '_' . md5($merchantId);
        $cached = $this->cache->load($cacheKey);

        if ($cached !== false && $cached !== null) {
            $decoded = json_decode($cached, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        $payload = $this->buildAndSign($merchantId);

        $this->cache->save(
            json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            $cacheKey,
            [self::CACHE_TAG],
            self::CACHE_LIFETIME
        );

        // T021b: emit analytics event (fire-and-forget; failure must not block response)
        try {
            $this->eventManager->dispatch('trusteed_manifest_published', [
                'merchant_id' => $merchantId,
                'store_view_count' => count($payload['store_views'] ?? []),
            ]);
        } catch (\Throwable $e) {
            $this->logger->warning('Failed to emit manifest.published event', ['error' => $e->getMessage()]);
        }

        return $payload;
    }

    /**
     * Bust the manifest cache. Called when store views are added/removed.
     */
    public function invalidateCache(): void
    {
        $this->cache->clean(\Zend_Cache::CLEANING_MODE_MATCHING_TAG, [self::CACHE_TAG]);
    }

    private function buildAndSign(string $merchantId): array
    {
        $apiBaseUrl = rtrim(
            (string)$this->scopeConfig->getValue(self::CONFIG_API_BASE, ScopeInterface::SCOPE_STORE),
            '/'
        );

        if ($merchantId === '') {
            $merchantId = (string)$this->scopeConfig->getValue(
                self::CONFIG_MERCHANT_ID,
                ScopeInterface::SCOPE_STORE
            );
        }

        $storeViews = $this->collectStoreViews();

        // Local payload draft. The backend overwrites issuer/merchant_id/
        // capabilities from the connection (ADR-014); we send our best-effort
        // values and trust the server-authoritative `signed_payload` it returns.
        $payload = [
            'schema_version' => '1.0',
            'issuer' => $apiBaseUrl,
            'merchant_id' => $merchantId,
            'store_views' => $storeViews,
            'capabilities' => ['checkout', 'catalog_search', 'order_status'],
            'updated_at' => gmdate('Y-m-d\TH:i:s\Z'),
        ];

        // Obtain the backend-signed JWS + the exact canonical manifest the
        // backend signed. Serve THAT manifest verbatim so the embedded JWS
        // verifies against the bytes agents receive.
        $signResult = $this->requestSignature($payload, $apiBaseUrl);

        $signedManifest = $signResult['signed_payload'];
        $signedManifest['signature'] = [
            'jws' => $signResult['jws'],
            'kid' => $signResult['kid'],
            'alg' => $signResult['alg'],
            'signed_at' => $signResult['signed_at'],
        ];

        return $signedManifest;
    }

    /**
     * Collect store views with their base URLs for longest-prefix matching by
     * agents (clarification Q1).
     *
     * Honours the merchant's wizard selection persisted at config path
     * `trusteed_general/general/store_view_selection` (CSV of store CODES, e.g.
     * `default,fr,de`). Empty selection preserves backward-compat: all active
     * stores are published (compliance/leakage fix — Sprint 057-ish).
     *
     * Edge cases:
     *  - Unknown code → log warning `manifest_store_filter_unknown_entry`,
     *    skip silently (do not crash manifest build).
     *  - All entries unknown → fall back to all-active stores and log a
     *    higher-severity warning so ops can detect misconfiguration.
     *  - Disabled stores → already filtered by `isActive()`.
     */
    private function collectStoreViews(): array
    {
        $activeStores = [];
        foreach ($this->storeManager->getStores(false) as $store) {
            if (!$store->isActive()) {
                continue;
            }
            $activeStores[] = $store;
        }

        $selectionRaw = (string)$this->scopeConfig->getValue(self::CONFIG_STORE_VIEW_SELECTION);
        $selectionRaw = trim($selectionRaw);

        $selectedCodes = [];
        if ($selectionRaw !== '') {
            $selectedCodes = array_values(array_filter(
                array_map('trim', explode(',', $selectionRaw)),
                static fn(string $code): bool => $code !== ''
            ));
        }

        if ($selectedCodes === []) {
            return $this->mapStoresToViews($activeStores);
        }

        $activeCodeSet = [];
        foreach ($activeStores as $store) {
            $activeCodeSet[$store->getCode()] = true;
        }

        $matchedStores = array_filter(
            $activeStores,
            static fn($store): bool => in_array($store->getCode(), $selectedCodes, true)
        );

        foreach ($selectedCodes as $code) {
            if (!isset($activeCodeSet[$code])) {
                $this->logger->warning('manifest_store_filter_unknown_entry', [
                    'entry' => $code,
                ]);
            }
        }

        if ($matchedStores === []) {
            $this->logger->warning('manifest_store_filter_all_unknown_fallback_all', [
                'selection' => $selectedCodes,
                'active_count' => count($activeStores),
            ]);
            return $this->mapStoresToViews($activeStores);
        }

        $this->logger->debug('manifest_store_filter_applied', [
            'selected' => count($matchedStores),
            'total' => count($activeStores),
        ]);

        return $this->mapStoresToViews(array_values($matchedStores));
    }

    /**
     * @param array<int, \Magento\Store\Api\Data\StoreInterface> $stores
     * @return array<int, array{code: string, base_url: string}>
     */
    private function mapStoresToViews(array $stores): array
    {
        $views = [];
        foreach ($stores as $store) {
            $views[] = [
                'code' => $store->getCode(),
                'base_url' => rtrim($store->getBaseUrl(), '/'),
            ];
        }
        return $views;
    }

    /**
     * POST the canonical manifest payload to the backend remote-sign endpoint
     * and return the detached JWS + the server-authoritative signed manifest.
     *
     * The private key NEVER leaves the backend; this method only ever sees the
     * resulting signature.
     *
     * @param array<string,mixed> $payload
     * @return array{jws:string, kid:string, alg:string, signed_at:string, signed_payload:array<string,mixed>}
     * @throws ManifestSigningException
     */
    private function requestSignature(array $payload, string $apiBaseUrl): array
    {
        if ($apiBaseUrl === '' || !str_starts_with($apiBaseUrl, 'https://')) {
            throw new ManifestSigningException(
                'API base URL is not configured or does not use HTTPS'
            );
        }

        // SSRF allowlist: prevent HMAC-secret exfiltration via a tampered
        // api_base_url (closed allowlist, exact host match — no wildcards).
        $apiHost = (string)(parse_url($apiBaseUrl, PHP_URL_HOST) ?? '');
        if (!in_array(strtolower($apiHost), self::ALLOWED_API_HOSTS, true)) {
            throw new ManifestSigningException(
                "API host '{$apiHost}' is not in the permitted allowlist"
            );
        }

        $connectionId = (string)$this->scopeConfig->getValue(
            self::CONFIG_CONNECTION_ID,
            ScopeInterface::SCOPE_STORE
        );
        if ($connectionId === '') {
            throw new ManifestSigningException(
                'connection_id is not configured — cannot authenticate manifest signing request'
            );
        }

        $internalSecret = $this->secretReader->read(
            self::CONFIG_INTERNAL_HMAC_SECRET,
            ScopeInterface::SCOPE_STORE
        );
        if ($internalSecret === '') {
            throw new ManifestSigningException(
                'internal_hmac_secret is not configured or failed to decrypt'
            );
        }

        $rawBody = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($rawBody === false) {
            throw new ManifestSigningException('Failed to encode manifest payload to JSON');
        }

        $timestamp = (string)time();
        // M4 (audit 2026-06-01): delegate to the single shared canonical signer
        // so manifest-sign + event + lag-heartbeat all share ONE HMAC scheme.
        $authHeaders = $this->internalHmacSigner->buildHeaders(
            $internalSecret,
            $connectionId,
            'POST',
            self::SIGN_PATH,
            $rawBody,
            $timestamp
        );

        $endpoint = $apiBaseUrl . self::SIGN_PATH;

        try {
            $this->curlClient->setTimeout(self::SIGN_TIMEOUT_SECONDS);
            $this->curlClient->addHeader('Content-Type', 'application/json');
            $this->curlClient->addHeader('Accept', 'application/json');
            foreach ($authHeaders as $name => $value) {
                $this->curlClient->addHeader($name, $value);
            }
            $this->curlClient->post($endpoint, $rawBody);
        } catch (\Throwable $e) {
            throw new ManifestSigningException(
                'Failed to reach manifest-sign endpoint: ' . $e->getMessage()
            );
        }

        $status = $this->curlClient->getStatus();
        if ($status < 200 || $status >= 300) {
            throw new ManifestSigningException(
                "Manifest-sign endpoint returned HTTP {$status}"
            );
        }

        $body = (string)$this->curlClient->getBody();
        $data = json_decode($body, true);
        if (!is_array($data)) {
            throw new ManifestSigningException('Invalid manifest-sign response (not JSON object)');
        }

        $jws = $data['jws'] ?? null;
        $kid = $data['kid'] ?? null;
        $alg = $data['alg'] ?? null;
        $signedAt = $data['signed_at'] ?? null;
        $signedPayload = $data['signed_payload'] ?? null;

        if (!is_string($jws) || $jws === ''
            || !is_string($kid) || $kid === ''
            || !is_string($alg) || $alg === ''
            || !is_string($signedAt) || $signedAt === ''
            || !is_array($signedPayload)
        ) {
            throw new ManifestSigningException(
                'Invalid manifest-sign response shape from MCPWebStore'
            );
        }

        // Detached JWS sanity: compact serialization is three dot-separated parts.
        if (substr_count($jws, '.') !== 2) {
            throw new ManifestSigningException('Manifest-sign response JWS is malformed');
        }

        return [
            'jws' => $jws,
            'kid' => $kid,
            'alg' => $alg,
            'signed_at' => $signedAt,
            'signed_payload' => $signedPayload,
        ];
    }
}
