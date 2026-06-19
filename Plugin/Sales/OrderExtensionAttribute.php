<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Plugin\Sales;

use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Model\Order\Payment;
use Psr\Log\LoggerInterface;

/**
 * Plugin for Magento\Sales\Model\Order\Payment.
 *
 * Manages the trusteed_receipt_uri extension attribute lifecycle on orders:
 *
 * - aroundPlaceOrder: prepares the extension attributes slot so the receipt_uri
 *   field is available for downstream consumers immediately after place.
 * - afterPlaceOrder: sets trusteed_receipt_uri when a URI is present in
 *   the session/checkout context. NEVER clears an existing URI (immutability,
 *   FR-A-015 clarification Q4).
 *
 * The durable DB persistence is handled by OrderRepositoryPlugin (T079a).
 * This plugin only manages the runtime extension attribute on the Order object.
 *
 * Spec 050 T079.
 */
class OrderExtensionAttribute
{
    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    /**
     * Before place order: ensure extension attributes container exists so
     * downstream plugins can safely call getExtensionAttributes() without null.
     */
    public function aroundPlaceOrder(
        Payment $subject,
        callable $proceed,
        string $orderOrId,
        bool $isOnline = false,
        array $data = []
    ): mixed {
        $order = $subject->getOrder();
        if ($order !== null) {
            $extensionAttributes = $order->getExtensionAttributes();
            if ($extensionAttributes === null) {
                /** @var \Magento\Sales\Api\Data\OrderExtensionInterface $extensionAttributes */
                $extensionAttributes = \Magento\Framework\App\ObjectManager::getInstance()->create(
                    \Magento\Sales\Api\Data\OrderExtensionInterface::class
                );
                $order->setExtensionAttributes($extensionAttributes);
            }
        }

        return $proceed($orderOrId, $isOnline, $data);
    }

    /**
     * After place order: if a receipt URI was attached to the order via
     * extension attributes, preserve it. The set-once guard ensures an
     * existing URI is never overwritten.
     */
    public function afterPlaceOrder(
        Payment $subject,
        mixed $result,
        string $orderOrId,
        bool $isOnline = false,
        array $data = []
    ): mixed {
        $order = $subject->getOrder();
        if ($order === null) {
            return $result;
        }

        $extensionAttributes = $order->getExtensionAttributes();
        if ($extensionAttributes === null) {
            return $result;
        }

        $existingUri = '';
        if (method_exists($extensionAttributes, 'getTrusteedReceiptUri')) {
            $existingUri = (string)$extensionAttributes->getTrusteedReceiptUri();
        }

        // If a URI was set in extension attributes but the order data column is empty,
        // copy from extension attributes to order data so the repository plugin can persist it.
        if ($existingUri !== '' && $order->getData('trusteed_receipt_uri') === null) {
            $order->setData('trusteed_receipt_uri', $existingUri);
        }

        return $result;
    }
}
