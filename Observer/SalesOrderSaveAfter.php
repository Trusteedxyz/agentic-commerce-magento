<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Sales\Model\Order;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Psr\Log\LoggerInterface;

class SalesOrderSaveAfter implements ObserverInterface
{
    private const EVENT_TYPE_MAP = [
        Order::STATE_NEW => 'order_created',
        Order::STATE_PROCESSING => 'order_created',
        Order::STATE_COMPLETE => 'order_completed',
        Order::STATE_CLOSED => 'order_refunded',
        Order::STATE_CANCELED => 'order_cancelled',
        'holded' => 'order_created',
    ];

    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly CheckoutSession $checkoutSession,
    ) {}

    public function execute(Observer $observer): void
    {
        /** @var Order $order */
        $order = $observer->getEvent()->getOrder();

        if (!$order instanceof Order) {
            return;
        }

        // NEVER clear trusteed_receipt_uri — immutability rule FR-A-015
        if ($order->dataHasChangedFor('trusteed_receipt_uri') && !$order->getData('trusteed_receipt_uri')) {
            // Restore original value
            $order->setData('trusteed_receipt_uri', $order->getOrigData('trusteed_receipt_uri'));
        }

        $state = $order->getState();
        $eventType = self::EVENT_TYPE_MAP[$state] ?? null;

        if ($eventType === null) {
            return;
        }

        // Only enqueue on state change to avoid duplicate events on non-state saves
        if (!$order->dataHasChangedFor('state')) {
            return;
        }

        $compositeId = 'MAG:' . $order->getId();

        // Read verified agentDid written by CheckoutSubmitBefore on ALLOW.
        // Only present for agent-initiated orders; null for human checkouts.
        $agentDid = $this->checkoutSession->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID);
        if (!is_string($agentDid) || $agentDid === '') {
            $agentDid = null;
        }

        try {
            $this->outboxRepository->insert([
                'event_id' => $this->generateUuid(),
                'event_type' => $eventType,
                'entity_id' => (int)$order->getId(),
                'increment_id' => (string)$order->getIncrementId(),
                'composite_id' => $compositeId,
                'store_view_code' => $order->getStore()->getCode() ?: 'default',
                'payload' => json_encode([
                    'grand_total' => $order->getGrandTotal(),
                    'status' => $order->getStatus(),
                    'state' => $state,
                    'customer_email' => null, // PII omitted from webhook payload
                    'agent_did' => $agentDid,
                ]),
                'updated_at' => $order->getUpdatedAt() ?? date('c'),
                'secret_version' => (int)($this->scopeConfig->getValue(
                    'trusteed_general/general/webhook_secret_version',
                    ScopeInterface::SCOPE_STORE
                ) ?: 1),
            ]);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to enqueue Trusteed webhook', [
                'order_id' => $order->getId(),
                'error' => $e->getMessage(),
            ]);
        }
    }

    private function generateUuid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
