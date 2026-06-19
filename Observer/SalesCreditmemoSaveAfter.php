<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\Order\Creditmemo;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Psr\Log\LoggerInterface;

/**
 * Captures partial refunds (credit memos) for R023 refund-abuse-guard.
 *
 * SalesOrderSaveAfter already handles full refunds via Order::STATE_CLOSED.
 * This observer covers partial refunds where the order never reaches STATE_CLOSED.
 * Emits order_refunded with data_quality=proxy; the terminal-state guard in the
 * API handler safely deduplicates if a full-refund event arrives later.
 */
class SalesCreditmemoSaveAfter implements ObserverInterface
{
    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(Observer $observer): void
    {
        /** @var Creditmemo $creditmemo */
        $creditmemo = $observer->getEvent()->getCreditmemo();

        if (!$creditmemo instanceof Creditmemo) {
            return;
        }

        $order = $creditmemo->getOrder();

        if (!$order instanceof Order) {
            return;
        }

        // STATE_CLOSED means full refund — SalesOrderSaveAfter already emits order_refunded.
        // Skip to avoid a duplicate that the terminal-state guard would silently drop anyway.
        if ($order->getState() === Order::STATE_CLOSED) {
            return;
        }

        $compositeId = 'MAG:' . $order->getId();

        try {
            $this->outboxRepository->insert([
                'event_id'        => $this->generateUuid(),
                'event_type'      => 'order_refunded',
                'entity_id'       => (int)$order->getId(),
                'increment_id'    => (string)$order->getIncrementId(),
                'composite_id'    => $compositeId,
                'store_view_code' => $order->getStore()->getCode() ?: 'default',
                'payload'         => json_encode([
                    'grand_total'        => $order->getGrandTotal(),
                    'status'             => $order->getStatus(),
                    'state'              => $order->getState(),
                    'creditmemo_id'      => $creditmemo->getId(),
                    'creditmemo_total'   => $creditmemo->getGrandTotal(),
                    'data_quality'       => 'proxy',
                ]),
                'updated_at'      => $creditmemo->getCreatedAt() ?? date('c'),
                'secret_version'  => (int)($this->scopeConfig->getValue(
                    'trusteed_general/general/webhook_secret_version',
                    ScopeInterface::SCOPE_STORE
                ) ?: 1),
            ]);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to enqueue Trusteed creditmemo webhook', [
                'order_id'      => $order->getId(),
                'creditmemo_id' => $creditmemo->getId(),
                'error'         => $e->getMessage(),
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
