<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Psr\Log\LoggerInterface;

/**
 * Spec-048 P0b — Magento checkout-failure emitter.
 *
 * Observes `sales_order_payment_failed` (dispatched by Magento core when a
 * payment attempt fails) and POSTs a HMAC-signed payload to the Trusteed
 * backend at `/api/v1/checkout-failures`.
 *
 * The observer NEVER throws — payment failure handling must not be derailed
 * by enforcement bookkeeping. R011 degrades to BLOCK-count proxy when emission
 * fails.
 *
 * @package Trusteed\AgenticCommerce
 */
class SalesOrderPaymentFailedObserver implements ObserverInterface
{
    private const ENDPOINT_PATH = '/api/v1/checkout-failures';

    private const CFG_API_BASE        = 'trusteed_general/general/api_base_url';
    private const CFG_MERCHANT_ID     = 'trusteed_general/general/merchant_id';
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

            $event = $observer->getEvent();
            $order = $event->getOrder();
            $quote = $event->getQuote();

            $reason   = $this->resolveReason($event);
            $agentDid = $this->resolveAgentDid($order, $quote);

            $body = [
                'installationId' => $installationId,
                'merchantId'     => $merchantId,
                'platform'       => 'magento',
                'reason'         => $reason,
            ];
            if ($agentDid !== null) {
                $body['agentDid'] = $agentDid;
            }
            // Spec-048 T14 — idempotency key from Magento increment id
            // (human-readable order number, stable across retries). Falls
            // back to quote id when the order has not been created yet.
            $externalRef = $this->resolveExternalRef($order, $quote);
            if ($externalRef !== null) {
                $body['externalRef'] = $externalRef;
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
            $this->curl->addHeader('User-Agent', 'Trusteed-Magento/1.0 spec-048-p0b');
            $this->curl->post($url, $payload);
        } catch (\Throwable $e) {
            // Never propagate — payment-failure path must keep flowing.
            $this->logger->warning(
                '[spec-048 P0b] checkout-failure emit exception: ' . $e->getMessage()
            );
        }
    }

    /**
     * @param \Magento\Framework\Event $event
     */
    private function resolveReason($event): string
    {
        // Magento sales_order_payment_failed payload may carry a 'message' or
        // a Payment object exposing gateway message. Best-effort heuristic.
        try {
            $message = '';
            if (method_exists($event, 'getMessage')) {
                $message = (string) ($event->getMessage() ?? '');
            }
            if ($message === '') {
                $payment = method_exists($event, 'getPayment') ? $event->getPayment() : null;
                if ($payment !== null && method_exists($payment, 'getAdditionalInformation')) {
                    $info = $payment->getAdditionalInformation('error_message');
                    if (is_string($info)) {
                        $message = $info;
                    }
                }
            }
            $low = strtolower($message);
            if ($low !== '') {
                if (str_contains($low, 'declined')) return 'payment_declined';
                if (str_contains($low, 'insufficient')) return 'insufficient_funds';
                if (str_contains($low, 'timeout')) return 'payment_timeout';
                if (str_contains($low, 'gateway')) return 'gateway_error';
            }
        } catch (\Throwable $e) {
            // ignore
        }
        return 'payment_failed';
    }

    /**
     * Spec-048 T14 — resolve an idempotency key. Prefer order increment id
     * (stable, human-friendly); fall back to quote id when the order has
     * not been persisted yet (early failure path).
     */
    private function resolveExternalRef($order, $quote): ?string
    {
        try {
            if ($order !== null && method_exists($order, 'getIncrementId')) {
                $inc = (string) ($order->getIncrementId() ?? '');
                if ($inc !== '') return $inc;
            }
            if ($order !== null && method_exists($order, 'getId')) {
                $oid = (string) ($order->getId() ?? '');
                if ($oid !== '') return 'order_' . $oid;
            }
            if ($quote !== null && method_exists($quote, 'getId')) {
                $qid = (string) ($quote->getId() ?? '');
                if ($qid !== '') return 'quote_' . $qid;
            }
        } catch (\Throwable $e) {
            // ignore
        }
        return null;
    }

    private function resolveAgentDid($order, $quote): ?string
    {
        try {
            if ($order !== null && method_exists($order, 'getData')) {
                $did = $order->getData('trusteed_agent_did');
                if (is_string($did) && $did !== '') return $did;
            }
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
