<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Sales\Api\CreditmemoRepositoryInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Api\FilterBuilder;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * B7c — Agent history projection for Magento.
 *
 * Provides per-agent counters used by R007 (cross-merchant abuse global flag),
 * R010 (new-agent probation via completed-orders count), R023 (refund-abuse via
 * creditmemo / order ratio), and R024 (dispute history — backend canonical).
 *
 * All backend lookups are HMAC-signed (Stripe-style header) and cached 60s in
 * Magento's cache pool so a single checkout doesn't fan out N requests.
 * Fail-open: every error path returns a "no signal" sentinel that lets the
 * upstream evaluator pass without minting a phantom risk score.
 *
 * Local lookups (R010 order count, R023 creditmemo count) use the canonical
 * `agent_id_hash` sales-order custom attribute populated by SalesOrderSaveAfter.
 *
 * @since 1.0.0 (audit `rules_claude.md` 2026-05-21 — Magento parity sprint)
 */
class AgentHistoryFetcher
{
    /** Cache TTL for cross-merchant + dispute backend lookups (seconds). */
    private const CACHE_TTL_SECONDS = 60;

    /** HTTP timeout for backend lookups (seconds). */
    private const HTTP_TIMEOUT_SECONDS = 3;

    private const CACHE_TAG = 'TRUSTEED_AGENT_HISTORY';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
        private readonly CacheInterface $cache,
        private readonly OrderRepositoryInterface $orderRepository,
        private readonly CreditmemoRepositoryInterface $creditmemoRepository,
        private readonly SearchCriteriaBuilder $searchCriteriaBuilder,
        private readonly FilterBuilder $filterBuilder,
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    /**
     * SSRF + HTTPS guard for the admin-configurable api_base_url. Returns true
     * when it is safe to send signed lookups to. HTTPS is always required; when
     * a validator is injected (production DI) the host must additionally be
     * allowlisted or match the sealed sha256(host). All callers treat `false`
     * as "no signal" (fail-open) — a rejected URL never blocks a checkout.
     *
     * @param string $apiBase Already rtrim()'d base URL.
     */
    private function isOutboundAuthorized(string $apiBase): bool
    {
        if (!str_starts_with($apiBase, 'https://')) {
            $this->logger->warning('[trusteed] history outbound rejected: api_base_url is not HTTPS');
            return false;
        }
        if ($this->urlValidator === null) {
            return true;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[trusteed] history outbound rejected by SSRF guard', [
                'host'    => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return false;
        }
        return true;
    }

    /**
     * Apply strict TLS + HTTPS-only transport hardening before every outbound
     * curl call. Mirrors EnforcementClient + Controller/Adminhtml/Token/Issue.
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
     * R007 — Cross-merchant abuse flag (global, source-of-truth = backend).
     *
     * Returns true if the backend has marked this agent as abuse-flagged across
     * any tenant in the trust network. Cached 60s. Returns false (fail-open) on
     * any error so a connectivity blip never blocks a legitimate checkout.
     */
    public function isCrossMerchantAbuse(string $agentIdHash): bool
    {
        if ($agentIdHash === '') {
            return false;
        }
        $cacheKey = 'trusteed_xma_' . hash('sha256', $agentIdHash);
        $cached   = $this->cache->load($cacheKey);
        if ($cached !== false) {
            return $cached === '1';
        }
        $flagged = $this->backendLookup(
            '/api/v1/agents/' . rawurlencode($agentIdHash) . '/cross-merchant-abuse-check',
            'crossMerchantAbuse'
        );
        $this->cache->save($flagged ? '1' : '0', $cacheKey, [self::CACHE_TAG], self::CACHE_TTL_SECONDS);
        return $flagged;
    }

    /**
     * R010 — Completed-order count for this agent at this merchant.
     *
     * Source-of-truth = local `sales_order.agent_id_hash`. Returns 0 when
     * the column is absent or the agent has never transacted here. Never
     * throws; on internal error the count degrades to 0 so probation rules
     * fall back to default-deny semantics if configured.
     */
    public function completedOrderCount(string $agentIdHash): int
    {
        if ($agentIdHash === '') {
            return 0;
        }
        try {
            $filter = $this->filterBuilder
                ->setField('agent_id_hash')
                ->setValue($agentIdHash)
                ->setConditionType('eq')
                ->create();
            $criteria = $this->searchCriteriaBuilder->addFilters([$filter])->create();
            return (int) $this->orderRepository->getList($criteria)->getTotalCount();
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] R010 order count error: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * Spec-048 Sprint E (T-E44) — R042 velocity-cap counter.
     *
     * Returns the number of completed orders for this agent at this merchant
     * inside a sliding time window. Source-of-truth = local `sales_order`
     * filtered by `agent_id_hash` AND `status = "complete"` AND
     * `created_at >= NOW() - INTERVAL <windowSeconds> SECOND`.
     *
     * Returns `null` (not 0) on any error so the evaluator can distinguish
     * "no signal" from "zero completions" and degrade gracefully.
     */
    public function completedOrderCountInWindow(string $agentIdHash, int $windowSeconds): ?int
    {
        if ($agentIdHash === '' || $windowSeconds <= 0) {
            return null;
        }
        try {
            $sinceTs = (new \DateTimeImmutable('@' . (time() - $windowSeconds)))
                ->format('Y-m-d H:i:s');
            $hashFilter = $this->filterBuilder
                ->setField('agent_id_hash')
                ->setValue($agentIdHash)
                ->setConditionType('eq')
                ->create();
            $statusFilter = $this->filterBuilder
                ->setField('status')
                ->setValue('complete')
                ->setConditionType('eq')
                ->create();
            $sinceFilter = $this->filterBuilder
                ->setField('created_at')
                ->setValue($sinceTs)
                ->setConditionType('gteq')
                ->create();
            $criteria = $this->searchCriteriaBuilder
                ->addFilters([$hashFilter])
                ->addFilters([$statusFilter])
                ->addFilters([$sinceFilter])
                ->create();
            return (int) $this->orderRepository->getList($criteria)->getTotalCount();
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] R042 order count error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * R023 — Creditmemo count for this agent at this merchant. Used together
     * with `completedOrderCount` to compute a refund ratio via
     * `CartSignals::refundRatio`. Returns 0 on any error.
     */
    public function refundCount(string $agentIdHash): int
    {
        if ($agentIdHash === '') {
            return 0;
        }
        try {
            $filter = $this->filterBuilder
                ->setField('agent_id_hash')
                ->setValue($agentIdHash)
                ->setConditionType('eq')
                ->create();
            $criteria = $this->searchCriteriaBuilder->addFilters([$filter])->create();
            return (int) $this->creditmemoRepository->getList($criteria)->getTotalCount();
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] R023 refund count error: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * R024 — Dispute count (backend canonical: Magento has no native dispute
     * concept). Looks up the `merchant_disputes` table via the backend API.
     * Cached 60s. Returns 0 on any error (fail-open).
     */
    public function disputeCount(string $agentIdHash, string $merchantId): int
    {
        if ($agentIdHash === '' || $merchantId === '') {
            return 0;
        }
        $cacheKey = 'trusteed_dc_' . hash('sha256', $agentIdHash . '|' . $merchantId);
        $cached   = $this->cache->load($cacheKey);
        if ($cached !== false && ctype_digit((string) $cached)) {
            return (int) $cached;
        }
        $path  = '/api/v1/merchants/' . rawurlencode($merchantId)
               . '/disputes/count?agentIdHash=' . rawurlencode($agentIdHash);
        $count = $this->backendCount($path);
        $this->cache->save((string) $count, $cacheKey, [self::CACHE_TAG], self::CACHE_TTL_SECONDS);
        return $count;
    }

    /**
     * Spec-048 Residuales T20 — Failed-checkout attempt count for the agent
     * within a sliding window. Source-of-truth = backend `CheckoutFailureEvent`
     * table (BLOCK R001 events + native platform failure rows).
     *
     * Endpoint: `GET /api/v1/checkout-failures/count
     *               ?agentIdHash=<sha256>&windowSeconds=<int>` →
     * `{ "count": int }`. Auth = HMAC headers (installation id + timestamp +
     * sha256 over `GET\n<path>\n<sorted-query>\n<timestamp>`). 2s curl timeout
     * — never blocks checkout. Cached 60s.
     *
     * Returns `null` (not 0) on any failure so the evaluator can distinguish
     * "no signal" from "zero failures".
     */
    public function failedCheckoutCount(string $agentIdHash, int $windowSeconds): ?int
    {
        if ($agentIdHash === '' || $windowSeconds <= 0) {
            return null;
        }
        $cacheKey = 'trusteed_fc_' . hash('sha256', $agentIdHash . '|' . $windowSeconds);
        $cached   = $this->cache->load($cacheKey);
        if ($cached !== false) {
            return ctype_digit((string) $cached) ? (int) $cached : null;
        }
        $body = $this->doFailedCheckoutCountGet($agentIdHash, $windowSeconds);
        if ($body === null) {
            return null;
        }
        $val = $body['count'] ?? null;
        $count = null;
        if (is_int($val)) {
            $count = max(0, $val);
        } elseif (is_string($val) && ctype_digit($val)) {
            $count = (int) $val;
        }
        if ($count !== null) {
            $this->cache->save((string) $count, $cacheKey, [self::CACHE_TAG], self::CACHE_TTL_SECONDS);
        }
        return $count;
    }

    /**
     * Issue the HMAC-signed GET against the canonical count endpoint. Returns
     * decoded JSON body or NULL on any error (timeout, non-200, parse error,
     * missing config). Never throws.
     *
     * @return array<string,mixed>|null
     */
    private function doFailedCheckoutCountGet(string $agentIdHash, int $windowSeconds): ?array
    {
        $apiBase        = (string) ($this->scopeConfig->getValue('trusteed_general/general/api_base_url') ?? '');
        $installationId = (string) ($this->scopeConfig->getValue('trusteed/enforcement/installation_id') ?? '');
        $hmacSecret     = (string) ($this->scopeConfig->getValue('trusteed/enforcement/hmac_secret') ?? '');
        $apiBase = rtrim($apiBase, '/');
        if ($apiBase === '' || $installationId === '' || $hmacSecret === '') {
            return null;
        }
        // H1 — SSRF + HTTPS guard. Rejection → null ("no signal", fail-open).
        if (!$this->isOutboundAuthorized($apiBase)) {
            return null;
        }

        $path  = '/api/v1/checkout-failures/count';
        $query = [
            'agentIdHash'   => $agentIdHash,
            'windowSeconds' => (string) $windowSeconds,
        ];
        $timestamp = (string) time();
        $signature = $this->signGetRequest($path, $query, $timestamp, $hmacSecret);

        // URL-encoded transport form (raw values were used to build the signature).
        $qsParts = [];
        foreach ($query as $k => $v) {
            $qsParts[] = rawurlencode($k) . '=' . rawurlencode($v);
        }
        $url = $apiBase . $path . '?' . implode('&', $qsParts);

        try {
            $this->curl->setTimeout(2);
            $this->applyTlsHardening();
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Timestamp', $timestamp);
            $this->curl->addHeader('X-Trusteed-Signature', $signature);
            $this->curl->addHeader('Accept', 'application/json');
            $this->curl->get($url);
            $status = (int) $this->curl->getStatus();
            if ($status !== 200) {
                $this->logger->info("[trusteed] R011 count GET status {$status}");
                return null;
            }
            $decoded = json_decode((string) $this->curl->getBody(), true);
            return is_array($decoded) ? $decoded : null;
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] R011 count GET error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Build the canonical sha256 hex HMAC over
     *   GET\n<path>\n<sorted-query-string>\n<timestamp>
     *
     * `query` values are the raw strings (NOT URL-encoded) — encoding is a
     * transport concern, not part of the signed material. The backend builds
     * the same canonical string before verification.
     *
     * @param array<string,string> $query
     */
    private function signGetRequest(string $path, array $query, string $timestamp, string $secret): string
    {
        $sorted = $query;
        ksort($sorted, SORT_STRING);
        $parts = [];
        foreach ($sorted as $k => $v) {
            $parts[] = $k . '=' . $v;
        }
        $canonical = "GET\n" . $path . "\n" . implode('&', $parts) . "\n" . $timestamp;
        return hash_hmac('sha256', $canonical, $secret);
    }

    /**
     * T17 R014 — Cancellation history for the agent within a sliding window
     * (default 90 days). Source-of-truth = local `sales_order.state = 'canceled'`
     * joined on `agent_id_hash`. Returns null on any error so R014 evaluator
     * degrades to PASS rather than fabricating a phantom history.
     */
    public function cancelCount(string $agentIdHash, int $windowDays = 90): ?int
    {
        if ($agentIdHash === '' || $windowDays <= 0) {
            return null;
        }
        try {
            $cutoff = (new \DateTimeImmutable("-{$windowDays} days"))->format('Y-m-d H:i:s');
            $hashFilter = $this->filterBuilder
                ->setField('agent_id_hash')
                ->setValue($agentIdHash)
                ->setConditionType('eq')
                ->create();
            $stateFilter = $this->filterBuilder
                ->setField('state')
                ->setValue('canceled')
                ->setConditionType('eq')
                ->create();
            $dateFilter = $this->filterBuilder
                ->setField('created_at')
                ->setValue($cutoff)
                ->setConditionType('gteq')
                ->create();
            $criteria = $this->searchCriteriaBuilder
                ->addFilters([$hashFilter])
                ->addFilters([$stateFilter])
                ->addFilters([$dateFilter])
                ->create();
            return (int) $this->orderRepository->getList($criteria)->getTotalCount();
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] R014 cancel count error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * GET a JSON endpoint expecting `{ "<flagField>": bool }` shape. Returns
     * false on any non-200 / parse error.
     */
    private function backendLookup(string $path, string $flagField): bool
    {
        $body = $this->doBackendGet($path);
        if ($body === null) {
            return false;
        }
        $val = $body[$flagField] ?? null;
        return $val === true || $val === 1 || $val === '1';
    }

    /**
     * GET a JSON endpoint expecting `{ "count": int }` shape. Returns 0 on any
     * non-200 / parse error.
     */
    private function backendCount(string $path): int
    {
        $body = $this->doBackendGet($path);
        if ($body === null) {
            return 0;
        }
        $val = $body['count'] ?? null;
        if (is_int($val)) {
            return max(0, $val);
        }
        if (is_string($val) && ctype_digit($val)) {
            return (int) $val;
        }
        return 0;
    }

    /**
     * @return array<string,mixed>|null
     */
    private function doBackendGet(string $path): ?array
    {
        $apiBase        = (string) ($this->scopeConfig->getValue('trusteed_general/general/api_base_url') ?? '');
        $installationId = (string) ($this->scopeConfig->getValue('trusteed/enforcement/installation_id') ?? '');
        $hmacSecret     = (string) ($this->scopeConfig->getValue('trusteed/enforcement/hmac_secret') ?? '');
        $apiBase = rtrim($apiBase, '/');
        if ($apiBase === '' || $installationId === '') {
            return null;
        }
        // H1 — SSRF + HTTPS guard. Rejection → null ("no signal", fail-open).
        if (!$this->isOutboundAuthorized($apiBase)) {
            return null;
        }
        $url = $apiBase . $path;
        try {
            $this->curl->setTimeout(self::HTTP_TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature('', $hmacSecret));
            $this->curl->get($url);
            $status = (int) $this->curl->getStatus();
            if ($status !== 200) {
                $this->logger->info("[trusteed] history GET {$path} status {$status}");
                return null;
            }
            $decoded = json_decode($this->curl->getBody(), true);
            return is_array($decoded) ? $decoded : null;
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] history GET error: ' . $e->getMessage());
            return null;
        }
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
}
