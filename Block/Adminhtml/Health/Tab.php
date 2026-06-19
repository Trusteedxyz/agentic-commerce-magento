<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Block\Adminhtml\Health;

use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\HTTP\Client\Curl;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Storefront\ThemeDetector;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;

/**
 * Admin Health Tab block.
 *
 * Exposes operational metrics for the Health dashboard tab:
 *   - Manifest age (seconds since last successful regeneration)
 *   - Last webhook age (seconds since last delivered webhook)
 *   - Outbox lag (oldest pending row age in seconds)
 *   - Dead row count
 *   - Theme compatibility warning for Hyvä/PWA Studio
 *
 * Spec 050 T065, FR-A-019.
 */
class Tab extends Template
{
    private const MANIFEST_CACHE_KEY = 'TRUSTEED_MANIFEST_LAST_BUILT_AT';
    private const TABLE_WEBHOOK_DELIVERY = 'trusteed_webhook_outbox';
    private const SCORE_CACHE_KEY = 'TRUSTEED_TRUST_SCORE_OVERVIEW';
    private const SCORE_CACHE_TTL = 300;
    private const SCORE_HTTP_TIMEOUT = 6;
    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';

    public function __construct(
        Context $context,
        private readonly OutboxRepository $outboxRepository,
        private readonly CacheInterface $cache,
        private readonly ThemeDetector $themeDetector,
        private readonly ResourceConnection $resource,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly Curl $curlClient,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader,
        array $data = [],
    ) {
        parent::__construct($context, $data);
    }

    /**
     * Fetches the merchant trust score from the Trusteed API and caches it
     * for SCORE_CACHE_TTL seconds. Returns null when the store is not
     * configured or the API call fails (the UI degrades gracefully).
     *
     * Shape:
     *   ['status' => 'ready'|'pending'|'stale'|'unavailable',
     *    'score'  => int|null (0-100),
     *    'scoreCap' => int|null,
     *    'confidenceLevel' => string|null,
     *    'nextMilestone'   => string|null]
     */
    /**
     * Whether the store is connected to Trusteed.
     *
     * Mirrors {@see \Trusteed\AgenticCommerce\Block\Adminhtml\Dashboard::isConnected()}
     * — connection is defined by configuration presence (merchant_id +
     * integration_token), NOT by the availability of a trust score. A connected
     * store whose score is still being computed must NOT be reported as
     * disconnected (coherence with the Inicio/Seguridad screens).
     */
    public function isConnected(): bool
    {
        $token = $this->secretReader->read(self::CONFIG_INTEGRATION_TOKEN);
        $merchantId = (string)$this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID);
        return $token !== '' && $merchantId !== '';
    }

    public function getTrustScore(): ?array
    {
        $cached = $this->cache->load(self::SCORE_CACHE_KEY);
        if ($cached !== false && $cached !== null) {
            $decoded = json_decode((string)$cached, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        $apiBase = rtrim((string)$this->scopeConfig->getValue(self::CONFIG_API_BASE), '/');
        $token = $this->secretReader->read(self::CONFIG_INTEGRATION_TOKEN);
        $merchantId = (string)$this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID);

        if ($apiBase === '' || $token === '' || $merchantId === '') {
            return null;
        }

        try {
            $url = $apiBase . '/api/v1/trust/overview?merchantId=' . rawurlencode($merchantId);
            $this->curlClient->setTimeout(self::SCORE_HTTP_TIMEOUT);
            $this->curlClient->addHeader('Accept', 'application/json');
            $this->curlClient->addHeader('Authorization', 'Bearer ' . $token);
            $this->curlClient->get($url);

            $status = (int)$this->curlClient->getStatus();
            if ($status < 200 || $status >= 300) {
                $this->logger->info('Trusteed: trust/overview returned non-2xx', ['status' => $status]);
                return null;
            }

            $body = (string)$this->curlClient->getBody();
            $data = json_decode($body, true);
            if (!is_array($data) || !isset($data['score']) || !is_array($data['score'])) {
                return null;
            }

            $scoreNode = $data['score'];
            $result = [
                'status' => (string)($scoreNode['status'] ?? 'unavailable'),
                'score' => is_int($scoreNode['score'] ?? null) ? (int)$scoreNode['score'] : null,
                'scoreCap' => is_int($scoreNode['scoreCap'] ?? null) ? (int)$scoreNode['scoreCap'] : null,
                'confidenceLevel' => isset($scoreNode['confidenceLevel'])
                    ? (string)$scoreNode['confidenceLevel']
                    : null,
                'nextMilestone' => isset($scoreNode['nextMilestone'])
                    ? (string)$scoreNode['nextMilestone']
                    : null,
            ];

            $this->cache->save(
                json_encode($result, JSON_THROW_ON_ERROR),
                self::SCORE_CACHE_KEY,
                [],
                self::SCORE_CACHE_TTL
            );

            return $result;
        } catch (\Throwable $e) {
            $this->logger->info('Trusteed: trust/overview fetch failed', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Seconds elapsed since the manifest was last successfully built and cached.
     * Returns -1 if the manifest has never been built (cache never populated).
     */
    public function getManifestAge(): int
    {
        $lastBuiltAt = $this->cache->load(self::MANIFEST_CACHE_KEY);
        if ($lastBuiltAt === false || $lastBuiltAt === null) {
            return -1;
        }
        return max(0, (int)(time() - (int)$lastBuiltAt));
    }

    /**
     * Seconds elapsed since the last successfully delivered webhook row
     * (status='delivered') in the outbox table.
     * Returns -1 if no delivered rows exist yet.
     */
    public function getLastWebhookAge(): int
    {
        try {
            $conn = $this->resource->getConnection();
            $table = $conn->getTableName(self::TABLE_WEBHOOK_DELIVERY);
            $lastDeliveredAt = $conn->fetchOne(
                "SELECT MAX(updated_at) FROM {$table} WHERE status = 'delivered'"
            );

            if (empty($lastDeliveredAt)) {
                return -1;
            }

            $ts = strtotime((string)$lastDeliveredAt);
            return $ts !== false ? max(0, (int)(time() - $ts)) : -1;
        } catch (\Throwable) {
            return -1;
        }
    }

    /**
     * Age in seconds of the oldest pending outbox row.
     * Returns 0 when no pending rows exist (queue is clear).
     */
    public function getOutboxLag(): int
    {
        return $this->outboxRepository->getOldestPendingAgeSeconds();
    }

    /**
     * Number of rows in terminal 'dead' state (max retries exceeded).
     * Dead rows require manual investigation.
     */
    public function getDeadCount(): int
    {
        return $this->outboxRepository->getDeadCount();
    }

    /**
     * Returns a warning string if a Hyvä or PWA Studio theme is active;
     * null if the standard Luma-compatible theme is in use.
     */
    public function getThemeWarning(): ?string
    {
        if ($this->themeDetector->isHyvaOrPwa()) {
            return (string)__('Hyvä/PWA Studio theme detected. The storefront WebMCP bridge has been auto-disabled. Agent access via server-side routes is unaffected.');
        }
        return null;
    }

    public function getPendingCount(): int
    {
        return $this->outboxRepository->getPendingCount();
    }

    public function getDeliveredLast5Min(): int
    {
        return $this->outboxRepository->getDeliveredLast5Min();
    }
}
