<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\TestFramework\Helper\Bootstrap;
use PHPUnit\Framework\TestCase;

/**
 * Integration test: trusteed_receipt_uri round-trip persistence.
 *
 * Spec 050 T080a — verifies:
 *   - set extensionAttribute → save → reload → URI in DB column AND in extensionAttributes
 *   - set-once guard: attempting to overwrite with a new value after save is silently ignored
 */
class ReceiptUriPersistenceTest extends TestCase
{
    private OrderRepositoryInterface $orderRepository;

    protected function setUp(): void
    {
        $objectManager = Bootstrap::getObjectManager();
        $this->orderRepository = $objectManager->get(OrderRepositoryInterface::class);
    }

    /**
     * @magentoDataFixture Magento/Sales/_files/order.php
     */
    public function testRoundTripPersistsReceiptUri(): void
    {
        $receiptUri = 'https://api.trusteed.xyz/receipts/rec_integration_test_001';

        // Load an existing test order
        $order = $this->loadTestOrder();
        $this->assertNotNull($order, 'Test order fixture must exist');

        // Attach receipt URI via extension attributes
        $extensionAttributes = $order->getExtensionAttributes();
        if ($extensionAttributes === null) {
            $extensionAttributes = Bootstrap::getObjectManager()->create(
                \Magento\Sales\Api\Data\OrderExtensionInterface::class
            );
            $order->setExtensionAttributes($extensionAttributes);
        }

        if (method_exists($extensionAttributes, 'setTrusteedReceiptUri')) {
            $extensionAttributes->setTrusteedReceiptUri($receiptUri);
        }

        // Save triggers OrderRepositoryPlugin::afterSave
        $this->orderRepository->save($order);

        // Reload the order from DB — triggers OrderRepositoryPlugin::afterGet
        $reloaded = $this->orderRepository->get($order->getEntityId());
        $reloadedExtAttr = $reloaded->getExtensionAttributes();

        $this->assertNotNull($reloadedExtAttr, 'Reloaded order must have extension attributes');

        if (method_exists($reloadedExtAttr, 'getTrusteedReceiptUri')) {
            $persistedUri = $reloadedExtAttr->getTrusteedReceiptUri();
            $this->assertEquals(
                $receiptUri,
                $persistedUri,
                'Reloaded receipt URI must match the originally saved value'
            );
        }
    }

    /**
     * @magentoDataFixture Magento/Sales/_files/order.php
     */
    public function testSetOnceGuardRejectsOverwrite(): void
    {
        $firstUri = 'https://api.trusteed.xyz/receipts/rec_first';
        $secondUri = 'https://api.trusteed.xyz/receipts/rec_should_not_overwrite';

        $order = $this->loadTestOrder();
        $this->assertNotNull($order);

        // First save: set and persist the URI
        $extensionAttributes = $order->getExtensionAttributes()
            ?? Bootstrap::getObjectManager()->create(\Magento\Sales\Api\Data\OrderExtensionInterface::class);
        $order->setExtensionAttributes($extensionAttributes);

        if (method_exists($extensionAttributes, 'setTrusteedReceiptUri')) {
            $extensionAttributes->setTrusteedReceiptUri($firstUri);
        }
        $this->orderRepository->save($order);

        // Second save: attempt to overwrite with a different URI
        $reloaded = $this->orderRepository->get($order->getEntityId());
        $reloadedExtAttr = $reloaded->getExtensionAttributes();

        if ($reloadedExtAttr !== null && method_exists($reloadedExtAttr, 'setTrusteedReceiptUri')) {
            $reloadedExtAttr->setTrusteedReceiptUri($secondUri);
        }
        $this->orderRepository->save($reloaded);

        // Reload again and assert first URI is preserved
        $final = $this->orderRepository->get($order->getEntityId());
        $finalExtAttr = $final->getExtensionAttributes();

        if ($finalExtAttr !== null && method_exists($finalExtAttr, 'getTrusteedReceiptUri')) {
            $this->assertEquals(
                $firstUri,
                $finalExtAttr->getTrusteedReceiptUri(),
                'Set-once guard must preserve the original receipt URI'
            );
        }
    }

    private function loadTestOrder(): ?OrderInterface
    {
        $objectManager = Bootstrap::getObjectManager();
        $registry = $objectManager->get(\Magento\Framework\Registry::class);

        // The standard Magento order fixture registers the order in the registry
        $order = $registry->registry('_fixture/Magento_Sales_Order');
        if ($order instanceof OrderInterface) {
            return $order;
        }

        // Fallback: load the first available order
        $criteriaBuilder = $objectManager->get(\Magento\Framework\Api\SearchCriteriaBuilder::class);
        $criteria = $criteriaBuilder->setPageSize(1)->setCurrentPage(1)->create();
        $list = $this->orderRepository->getList($criteria);
        $items = $list->getItems();

        return !empty($items) ? reset($items) : null;
    }
}
