<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Psr\Log\LoggerInterface;

/**
 * Spec-048 G1 — Magento coupon-attempt-failed emitter.
 *
 * Observes `salesrule_validator_process_negative` (dispatched by
 * Magento\SalesRule\Model\Validator when a rule fails to apply to a quote)
 * and POSTs a HMAC-signed payload to the Trusteed backend at
 * `/api/v1/coupon-attempts-failed`.
 *
 * Mirrors SalesOrderPaymentFailedObserver.php (same HMAC scheme, same
 * scope_config keys). Never throws — coupon validation path must not be
 * derailed by enforcement bookkeeping. R017 degrades to the proxy
 * `_discount_codes_tried` attribute when emission fails.
 *
 * @package Trusteed\AgenticCommerce
 */
class CouponInvalidObserver implements ObserverInterface
{
    private const ENDPOINT_PATH = '/api/v1/coupon-attempts-failed';

    private const CFG_API_BASE        = 'trusteed/general/api_base_url';
    private const CFG_MERCHANT_ID     = 'trusteed/general/merchant_id';
    private const CFG_INSTALLATION_ID = 'trusteed/enforcement/installation_id';
    private const CFG_HMAC_SECRET     = 'trusteed/enforcement/hmac_secret';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(Observer $observer): void
    {
        try {
            $merchantId     = (string) ($this->scopeConfig->getValue(self::CFG_MERCHANT_ID) ?? '');
            $installationId = (string) ($this->scopeConfig->getValue(self::CFG_INSTALLATION_ID) ?? '');
            $hmacSecret     = (string) ($this->scopeConfig->getValue(self::CFG_HMAC_SECRET) ?? '');
            $apiBase        = (string) ($this->scopeConfig->getValue(self::CFG_API_BASE) ?? '');

            if ($merchantId === '' || $installationId === '' || $hmacSecret === '' || $apiBase === '') {
                return; // not configured
            }

            $event   = $observer->getEvent();
            $quote   = method_exists($event, 'getQuote') ? $event->getQuote() : null;
            $address = method_exists($event, 'getAddress') ? $event->getAddress() : null;

            $couponCode = $this->resolveCouponCode($quote, $address);
            if ($couponCode === null || $couponCode === '') {
                return;
            }

            $reason   = $this->resolveReason($event);
            $agentDid = $this->resolveAgentDid($quote);

            $body = [
                'installationId' => $installationId,
                'merchantId'     => $merchantId,
                'platform'       => 'magento',
                'couponCode'     => strtolower($couponCode),
                'reason'         => $reason,
            ];
            if ($agentDid !== null) {
                $body['agentDid'] = $agentDid;
            }

            $body['signature'] = $this->hmacSign($body, $hmacSecret);

            $url     = rtrim($apiBase, '/') . self::ENDPOINT_PATH;
            $payload = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            if ($payload === false) {
                return;
            }

            $this->curl->setOption(CURLOPT_TIMEOUT_MS, 1500);
            $this->curl->setOption(CURLOPT_CONNECTTIMEOUT_MS, 800);
            $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('Accept', 'application/json');
            $this->curl->addHeader('User-Agent', 'Trusteed-Magento/1.0 spec-048-g1');
            $this->curl->post($url, $payload);
        } catch (\Throwable $e) {
            $this->logger->warning(
                '[spec-048 G1] coupon-attempt-failed emit exception: ' . $e->getMessage()
            );
        }
    }

    private function resolveCouponCode($quote, $address): ?string
    {
        try {
            if ($address !== null && method_exists($address, 'getCouponCode')) {
                $code = $address->getCouponCode();
                if (is_string($code) && $code !== '') return $code;
            }
            if ($quote !== null && method_exists($quote, 'getCouponCode')) {
                $code = $quote->getCouponCode();
                if (is_string($code) && $code !== '') return $code;
            }
        } catch (\Throwable $e) {
            // ignore
        }
        return null;
    }

    /**
     * Magento does not surface a structured reason from
     * `salesrule_validator_process_negative`. Best-effort:
     *   - inspect rule via `event->getRule()` for `from_date` / `to_date` to
     *     detect `expired` and `uses_per_coupon` / `uses_per_customer` for
     *     `limit_reached`.
     *   - fall back to `not_found` (most common when no rule matches code).
     */
    private function resolveReason($event): string
    {
        try {
            $rule = method_exists($event, 'getRule') ? $event->getRule() : null;
            if ($rule === null) return 'not_found';

            $now = time();
            if (method_exists($rule, 'getToDate')) {
                $to = (string) ($rule->getToDate() ?? '');
                if ($to !== '' && strtotime($to) !== false && strtotime($to) < $now) {
                    return 'expired';
                }
            }
            if (method_exists($rule, 'getUsesPerCoupon') && method_exists($rule, 'getTimesUsed')) {
                $max  = (int) ($rule->getUsesPerCoupon() ?? 0);
                $used = (int) ($rule->getTimesUsed() ?? 0);
                if ($max > 0 && $used >= $max) {
                    return 'limit_reached';
                }
            }
        } catch (\Throwable $e) {
            // ignore
        }
        return 'not_found';
    }

    private function resolveAgentDid($quote): ?string
    {
        try {
            if ($quote !== null && method_exists($quote, 'getData')) {
                $did = $quote->getData('trusteed_agent_did');
                if (is_string($did) && $did !== '') return $did;
            }
        } catch (\Throwable $e) {
            // ignore
        }
        return null;
    }

    private function hmacSign(array $body, string $secret): string
    {
        $sorted    = $this->recursiveKsort($body);
        $canonical = json_encode($sorted, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        return hash_hmac('sha256', (string) $canonical, $secret);
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    private function recursiveKsort($value)
    {
        if (is_array($value)) {
            $isAssoc = array_keys($value) !== range(0, count($value) - 1);
            if ($isAssoc) {
                ksort($value, SORT_STRING);
            }
            foreach ($value as $k => $v) {
                $value[$k] = $this->recursiveKsort($v);
            }
        }
        return $value;
    }
}
