<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Plugin\Repository;

use Magento\Framework\App\ResourceConnection;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\Data\OrderSearchResultInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use Psr\Log\LoggerInterface;

/**
 * Plugin for Magento\Sales\Api\OrderRepositoryInterface.
 *
 * Provides durable persistence for the trusteed_receipt_uri and
 * trusteed_receipt_status extension attributes beyond Magento's runtime-only
 * extension attribute scope.
 *
 * afterSave:  reads getTrusteedReceiptUri() from extension attributes;
 *             if non-empty AND the DB column is currently empty, writes to
 *             sales_order.trusteed_receipt_uri AND stamps
 *             sales_order.trusteed_receipt_status = 'signed' (a persisted
 *             receipt URI means the backend has issued/signed the TrustReceipt
 *             the URI points to — there is no other status source upstream).
 *             Set-once guard: if column already has a value, the new value
 *             is silently ignored (receipt URI immutability, FR-A-015, Q4).
 *
 * afterGet:   reads the DB column and hydrates back into extensionAttributes
 *             so callers (Module C badge, Magento admin) see the persisted URI.
 *
 * afterGetList: same hydration applied to every order in the result set.
 *
 * Spec 050 T079a + T079b.
 */
class OrderRepositoryPlugin
{
    private const COLUMN_URI = 'trusteed_receipt_uri';
    private const COLUMN_STATUS = 'trusteed_receipt_status';
    private const TABLE = 'sales_order';

    /**
     * Status stamped onto sales_order.trusteed_receipt_status when a receipt
     * URI is first persisted. A durable URI implies the backend has signed
     * the TrustReceipt it references.
     */
    private const STATUS_SIGNED = 'signed';

    public function __construct(
        private readonly ResourceConnection $resource,
        private readonly LoggerInterface $logger,
    ) {}

    /**
     * After saving an order: persist trusteed_receipt_uri to the DB column
     * using a set-once guard.
     */
    public function afterSave(
        OrderRepositoryInterface $subject,
        OrderInterface $result,
        OrderInterface $order
    ): OrderInterface {
        $extensionAttributes = $order->getExtensionAttributes();
        if ($extensionAttributes === null) {
            return $result;
        }

        $newUri = '';
        if (method_exists($extensionAttributes, 'getTrusteedReceiptUri')) {
            $newUri = (string)$extensionAttributes->getTrusteedReceiptUri();
        }

        if ($newUri === '') {
            return $result;
        }

        $orderId = (int)$order->getEntityId();
        if ($orderId <= 0) {
            return $result;
        }

        try {
            $existingUri = $this->fetchColumnValue($orderId, self::COLUMN_URI);

            // Set-once guard: never overwrite an existing URI
            if ($existingUri !== '') {
                return $result;
            }

            $this->updateColumns($orderId, [
                self::COLUMN_URI => $newUri,
                self::COLUMN_STATUS => self::STATUS_SIGNED,
            ]);

            $this->logger->info('Trusteed: persisted receipt_uri for order', [
                'order_id' => $orderId,
            ]);
        } catch (\Throwable $e) {
            $this->logger->error('Trusteed: failed to persist receipt_uri', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
            ]);
        }

        return $result;
    }

    /**
     * After loading a single order: hydrate trusteed_receipt_uri from DB column
     * into extension attributes.
     */
    public function afterGet(
        OrderRepositoryInterface $subject,
        OrderInterface $result
    ): OrderInterface {
        return $this->hydrateOrder($result);
    }

    /**
     * After loading a list of orders: hydrate trusteed_receipt_uri for each item.
     */
    public function afterGetList(
        OrderRepositoryInterface $subject,
        OrderSearchResultInterface $result
    ): OrderSearchResultInterface {
        foreach ($result->getItems() as $order) {
            $this->hydrateOrder($order);
        }
        return $result;
    }

    private function hydrateOrder(OrderInterface $order): OrderInterface
    {
        $orderId = (int)$order->getEntityId();
        if ($orderId <= 0) {
            return $order;
        }

        try {
            $uri = $this->fetchColumnValue($orderId, self::COLUMN_URI);
            if ($uri === '') {
                return $order;
            }

            $extensionAttributes = $order->getExtensionAttributes();
            if ($extensionAttributes === null) {
                $extensionAttributes = \Magento\Framework\App\ObjectManager::getInstance()->create(
                    \Magento\Sales\Api\Data\OrderExtensionInterface::class
                );
                $order->setExtensionAttributes($extensionAttributes);
            }

            if (method_exists($extensionAttributes, 'setTrusteedReceiptUri')) {
                $extensionAttributes->setTrusteedReceiptUri($uri);
            }

            $statusValue = $this->fetchColumnValue($orderId, self::COLUMN_STATUS);
            if ($statusValue !== '' && method_exists($extensionAttributes, 'setTrusteedReceiptStatus')) {
                $extensionAttributes->setTrusteedReceiptStatus($statusValue);
            }
        } catch (\Throwable $e) {
            $this->logger->warning('Trusteed: failed to hydrate receipt_uri', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
            ]);
        }

        return $order;
    }

    private function fetchColumnValue(int $orderId, string $column): string
    {
        $conn = $this->resource->getConnection();
        $table = $conn->getTableName(self::TABLE);

        $value = $conn->fetchOne(
            "SELECT `{$column}` FROM `{$table}` WHERE `entity_id` = ?",
            [$orderId]
        );

        return is_string($value) ? $value : '';
    }

    /**
     * @param array<string, string> $columns Column => value pairs to write in one UPDATE.
     */
    private function updateColumns(int $orderId, array $columns): void
    {
        $conn = $this->resource->getConnection();
        $table = $conn->getTableName(self::TABLE);

        $conn->update(
            $table,
            $columns,
            ['entity_id = ?' => $orderId]
        );
    }
}
