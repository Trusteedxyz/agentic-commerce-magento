<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\Order\Shipment;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Psr\Log\LoggerInterface;

/**
 * Spec-050 Gap #5 — emits `order_fulfilled` when a shipment is created.
 *
 * Observes `sales_order_shipment_save_after` (dispatched by Magento core when a
 * shipment record is persisted) and enqueues a signed `order_fulfilled` outbox
 * event. Mirrors the signing/outbox path of {@see SalesOrderSaveAfter} and
 * {@see SalesCreditmemoSaveAfter}: same UUID generation, secret-version read,
 * and never-throw guarantee (shipment creation must not be derailed by webhook
 * bookkeeping).
 *
 * The backend `order_fulfilled` handler (apps/api … order-fulfilled.ts) advances
 * the fulfillment / delivery state. Before this observer existed the handler was
 * dead-but-reserved (no Magento emitter produced `order_fulfilled`).
 *
 * Idempotency: the first shipment for an order emits the canonical fulfillment
 * signal. Subsequent partial shipments re-emit; the backend terminal-state guard
 * deduplicates by (connectionId, eventId, secretVersion) and the run-order-event
 * pipeline safely no-ops once the order is already in a fulfilled terminal state.
 */
class ShipmentSaveAfter implements ObserverInterface
{
    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(Observer $observer): void
    {
        /** @var Shipment $shipment */
        $shipment = $observer->getEvent()->getShipment();

        if (!$shipment instanceof Shipment) {
            return;
        }

        // Only emit on the initial creation of the shipment record. Later saves
        // (e.g. tracking-number edits) must not re-enqueue duplicate events.
        if (!$shipment->isObjectNew()) {
            return;
        }

        $order = $shipment->getOrder();

        if (!$order instanceof Order) {
            return;
        }

        $compositeId = 'MAG:' . $order->getId();

        try {
            $this->outboxRepository->insert([
                'event_id'        => $this->generateUuid(),
                'event_type'      => 'order_fulfilled',
                'entity_id'       => (int)$order->getId(),
                'increment_id'    => (string)$order->getIncrementId(),
                'composite_id'    => $compositeId,
                'store_view_code' => $order->getStore()->getCode() ?: 'default',
                'payload'         => json_encode([
                    'grand_total'    => $order->getGrandTotal(),
                    'status'         => $order->getStatus(),
                    'state'          => $order->getState(),
                    'shipment_id'    => $shipment->getId(),
                    'tracking_count' => count($shipment->getAllTracks()),
                    'customer_email' => null, // PII omitted from webhook payload
                ]),
                'updated_at'      => $shipment->getCreatedAt() ?? date('c'),
                'secret_version'  => (int)($this->scopeConfig->getValue(
                    'trusteed_general/general/webhook_secret_version',
                    ScopeInterface::SCOPE_STORE
                ) ?: 1),
            ]);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to enqueue Trusteed shipment webhook', [
                'order_id'    => $order->getId(),
                'shipment_id' => $shipment->getId(),
                'error'       => $e->getMessage(),
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
