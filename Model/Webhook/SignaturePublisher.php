<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Webhook;

use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

class SignaturePublisher
{
    private const TIMEOUT_SECONDS = 10;

    public function __construct(
        private readonly Curl $curlClient,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader,
        // Nullable for legacy positional unit-test construction; production is
        // guaranteed a non-null guard via etc/di.xml (mirrors EnforcementClient /
        // AgentHistoryFetcher doctrine). When null the callout fails closed.
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    /**
     * Compute HMAC-SHA256 over canonical payload.
     *
     * Format: HMAC(secret, "{timestamp}.{nonce}.{secretVersion}.{canonicalJson}")
     *
     * Codex P1 2026-05-13 (replay-across-rotation bypass): secretVersion MUST
     * be inside the signed bytes. Otherwise an attacker captures a v1 request
     * within the 300s window and replays it with X-Trusteed-Webhook-Secret-Version=2
     * to bypass the (connectionId,eventId,secretVersion) unique dedup index.
     */
    public function computeSignature(
        string $canonicalJson,
        string $secret,
        string $timestamp,
        string $nonce,
        int $secretVersion
    ): string {
        return hash_hmac(
            'sha256',
            "{$timestamp}.{$nonce}.{$secretVersion}.{$canonicalJson}",
            $secret
        );
    }

    /**
     * Publish a webhook entry to MCPWebStore.
     * Returns true on success, false on failure.
     */
    public function publish(array $entry): bool
    {
        $apiBase = rtrim((string)$this->scopeConfig->getValue('trusteed_general/general/api_base_url'), '/');
        $connectionId = (string)$this->scopeConfig->getValue(
            'trusteed_general/general/connection_id',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
        $merchantId = (string)$this->scopeConfig->getValue(
            'trusteed_general/general/merchant_id',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        if (empty($apiBase) || empty($merchantId)) {
            $this->logger->warning('Trusteed: API connection not configured, cannot publish webhook');
            return false;
        }

        // P3 (spec-050): the backend resolves MagentoStoreConnection by
        // connection_id. A merchant_id fallback for the webhook route param 401s
        // (no connection lookup), so REQUIRE connection_id — never publish without
        // it. The connection is provisioned by validate-connect-token; until then
        // we hold the event in the outbox rather than emit an unroutable request.
        if (empty($connectionId)) {
            $this->logger->warning(
                'Trusteed: connection_id not provisioned, cannot publish webhook'
            );
            return false;
        }

        // SSRF guard: the integration token + webhook HMAC must only ever be
        // POSTed to an allowlisted/sealed host. A tampered api_base_url (admin
        // CSRF / stored XSS / supply-chain) would otherwise exfiltrate the
        // bearer token + signature. Validate BEFORE adding any header / callout.
        if ($this->urlValidator === null) {
            // Fail closed: production wires this via di.xml; a null guard means
            // misconfiguration and must never send credentials unchecked.
            $this->logger->warning('Trusteed: SSRF guard unavailable, refusing webhook publish');
            return false;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('Trusteed: SSRF guard rejected api_base_url for webhook publish', [
                'host' => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return false;
        }

        $webhookSecret = $this->secretReader->read('trusteed_general/general/webhook_secret');
        if ($webhookSecret === '') {
            $this->logger->warning('Trusteed: webhook_secret not configured or decrypt failed');
            return false;
        }

        // Replay-across-rotation protection (Codex P1 2026-05-13): use the
        // secret_version captured at enqueue time (written by
        // SalesOrderSaveAfter / SalesCreditmemoSaveAfter) so the signed bytes
        // and the X-Trusteed-Webhook-Secret-Version header reflect the version
        // that was current when the event was produced — NOT the (possibly
        // rotated) current config value at publish time. Otherwise a rotation
        // between enqueue and delivery would mint a signature under a new
        // version for an old event, defeating the backend's
        // (connectionId, eventId, secretVersion) dedup index. Falls back to the
        // current config version only when the entry predates the column.
        $secretVersion = isset($entry['secret_version']) && (int)$entry['secret_version'] > 0
            ? (int)$entry['secret_version']
            : (int)($this->scopeConfig->getValue('trusteed_general/general/webhook_secret_version') ?: 1);

        $payload = json_encode([
            'event_id' => $entry['event_id'],
            'event_type' => $entry['event_type'],
            'entity_id' => (int)$entry['entity_id'],
            'increment_id' => $entry['increment_id'],
            'composite_id' => $entry['composite_id'],
            'store_view_code' => $entry['store_view_code'] ?? 'default',
            'updated_at' => $entry['updated_at'] ?? date('c'),
            'payload' => json_decode((string)$entry['payload'], true) ?? [],
        ], JSON_THROW_ON_ERROR);

        $timestamp = (string)time();
        $nonce = bin2hex(random_bytes(16));
        $signature = $this->computeSignature(
            $payload,
            $webhookSecret,
            $timestamp,
            $nonce,
            $secretVersion
        );

        $integrationToken = $this->secretReader->read('trusteed_general/general/integration_token');

        // P3 (spec-050): route strictly on connection_id (guarded above). A
        // merchant_id fallback 401s because the backend looks up
        // MagentoStoreConnection by connection_id only.
        $url = "{$apiBase}/api/v1/webhook/magento/{$connectionId}";

        $this->curlClient->setTimeout(self::TIMEOUT_SECONDS);
        $this->curlClient->addHeader('Content-Type', 'application/json');
        $this->curlClient->addHeader('Authorization', "Bearer {$integrationToken}");
        $this->curlClient->addHeader('X-Trusteed-Signature', $signature);
        $this->curlClient->addHeader('X-Trusteed-Timestamp', $timestamp);
        $this->curlClient->addHeader('X-Trusteed-Nonce', $nonce);
        $this->curlClient->addHeader('X-Trusteed-Webhook-Secret-Version', (string)$secretVersion);

        $this->curlClient->post($url, $payload);
        $status = $this->curlClient->getStatus();

        if ($status >= 200 && $status < 300) {
            return true;
        }

        $this->logger->warning('Trusteed webhook publish failed', [
            'status' => $status,
            'event_id' => $entry['event_id'],
        ]);
        return false;
    }
}
