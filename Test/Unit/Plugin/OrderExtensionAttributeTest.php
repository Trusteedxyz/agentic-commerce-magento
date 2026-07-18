<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Plugin;

use Magento\Sales\Api\Data\OrderExtensionInterface;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Plugin\Repository\OrderRepositoryPlugin;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\DB\Adapter\AdapterInterface;

/**
 * Unit tests for OrderRepositoryPlugin (T079a) set-once semantics.
 *
 * Spec 050 T080.
 */
class OrderExtensionAttributeTest extends TestCase
{
    private OrderRepositoryPlugin $plugin;
    private MockObject $resourceConnection;
    private MockObject $dbAdapter;
    private MockObject $logger;

    protected function setUp(): void
    {
        $this->dbAdapter = $this->createMock(AdapterInterface::class);
        $this->dbAdapter->method('getTableName')->willReturnArgument(0);

        $this->resourceConnection = $this->createMock(ResourceConnection::class);
        $this->resourceConnection->method('getConnection')->willReturn($this->dbAdapter);

        $this->logger = $this->createMock(LoggerInterface::class);

        $this->plugin = new OrderRepositoryPlugin(
            $this->resourceConnection,
            $this->logger,
        );
    }

    public function testSetOnceFirstSavePersistsUri(): void
    {
        $orderId = 42;
        $receiptUri = 'https://api.trusteed.xyz/receipts/rec_001';

        // DB column is currently empty (first save)
        $this->dbAdapter
            ->method('fetchOne')
            ->willReturn('');

        $this->dbAdapter
            ->expects($this->once())
            ->method('update')
            ->with(
                'sales_order',
                [
                    'trusteed_receipt_uri'    => $receiptUri,
                    'trusteed_receipt_status' => 'signed',
                ],
                ['entity_id = ?' => $orderId]
            );

        $order = $this->buildOrderMock($orderId, $receiptUri);
        $subject = $this->createMock(OrderRepositoryInterface::class);

        $result = $this->plugin->afterSave($subject, $order, $order);
        $this->assertSame($order, $result);
    }

    public function testSetOnceSecondSaveDoesNotOverwrite(): void
    {
        $orderId = 42;
        $existingUri = 'https://api.trusteed.xyz/receipts/rec_001';
        $newUri = 'https://api.trusteed.xyz/receipts/rec_999_should_not_persist';

        // DB column already has a value
        $this->dbAdapter
            ->method('fetchOne')
            ->willReturn($existingUri);

        // update() must NOT be called
        $this->dbAdapter
            ->expects($this->never())
            ->method('update');

        $order = $this->buildOrderMock($orderId, $newUri);
        $subject = $this->createMock(OrderRepositoryInterface::class);

        $this->plugin->afterSave($subject, $order, $order);
    }

    public function testCancelOrderDoesNotClearReceiptUri(): void
    {
        // Cancelling an order passes through afterSave without a receipt URI
        // in extension attributes — the DB value must remain untouched.
        $orderId = 55;

        $this->dbAdapter
            ->expects($this->never())
            ->method('update');

        // Order with no receipt URI in extension attributes (post-cancel save)
        $extensionAttributes = $this->createMock(OrderExtensionInterface::class);
        $extensionAttributes->method('getTrusteedReceiptUri')->willReturn('');

        $order = $this->createMock(OrderInterface::class);
        $order->method('getEntityId')->willReturn((string)$orderId);
        $order->method('getExtensionAttributes')->willReturn($extensionAttributes);

        $subject = $this->createMock(OrderRepositoryInterface::class);
        $this->plugin->afterSave($subject, $order, $order);
    }

    public function testRefundOrderDoesNotClearReceiptUri(): void
    {
        // Same as cancel: refund save has no receipt URI in extension attributes.
        $orderId = 66;

        $this->dbAdapter
            ->expects($this->never())
            ->method('update');

        $extensionAttributes = $this->createMock(OrderExtensionInterface::class);
        $extensionAttributes->method('getTrusteedReceiptUri')->willReturn(null);

        $order = $this->createMock(OrderInterface::class);
        $order->method('getEntityId')->willReturn((string)$orderId);
        $order->method('getExtensionAttributes')->willReturn($extensionAttributes);

        $subject = $this->createMock(OrderRepositoryInterface::class);
        $this->plugin->afterSave($subject, $order, $order);
    }

    public function testAfterGetHydratesExtensionAttributeFromDb(): void
    {
        $orderId = 77;
        $storedUri = 'https://api.trusteed.xyz/receipts/rec_hydrated';

        $this->dbAdapter
            ->method('fetchOne')
            ->willReturnOnConsecutiveCalls($storedUri, 'VERIFIED');

        $extensionAttributes = $this->createMock(OrderExtensionInterface::class);
        $extensionAttributes
            ->expects($this->once())
            ->method('setTrusteedReceiptUri')
            ->with($storedUri);

        $order = $this->createMock(OrderInterface::class);
        $order->method('getEntityId')->willReturn((string)$orderId);
        $order->method('getExtensionAttributes')->willReturn($extensionAttributes);

        $subject = $this->createMock(OrderRepositoryInterface::class);
        $this->plugin->afterGet($subject, $order);
    }

    private function buildOrderMock(int $orderId, string $receiptUri): OrderInterface
    {
        $extensionAttributes = $this->createMock(OrderExtensionInterface::class);
        $extensionAttributes->method('getTrusteedReceiptUri')->willReturn($receiptUri);

        $order = $this->createMock(OrderInterface::class);
        $order->method('getEntityId')->willReturn((string)$orderId);
        $order->method('getExtensionAttributes')->willReturn($extensionAttributes);

        return $order;
    }
}
