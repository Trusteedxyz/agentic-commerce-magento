<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event;
use Magento\Framework\Event\Observer;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\Order\Creditmemo;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Trusteed\AgenticCommerce\Observer\SalesCreditmemoSaveAfter;

class SalesCreditmemoSaveAfterTest extends TestCase
{
    private SalesCreditmemoSaveAfter $observer;
    private MockObject $outboxRepository;
    private MockObject $scopeConfig;
    private MockObject $logger;

    protected function setUp(): void
    {
        $this->outboxRepository = $this->createMock(OutboxRepository::class);
        $this->scopeConfig      = $this->createMock(ScopeConfigInterface::class);
        $this->logger           = $this->createMock(LoggerInterface::class);

        $this->observer = new SalesCreditmemoSaveAfter(
            $this->outboxRepository,
            $this->scopeConfig,
            $this->logger,
        );
    }

    private function makeObserver(Creditmemo $creditmemo): Observer
    {
        $event = $this->createMock(Event::class);
        $event->method('getCreditmemo')->willReturn($creditmemo);

        $obs = $this->createMock(Observer::class);
        $obs->method('getEvent')->willReturn($event);
        return $obs;
    }

    private function makeOrder(string $state, int $id = 42): MockObject
    {
        $store = $this->createMock(\Magento\Store\Model\Store::class);
        $store->method('getCode')->willReturn('default');

        $order = $this->createMock(Order::class);
        $order->method('getId')->willReturn($id);
        $order->method('getIncrementId')->willReturn('000000042');
        $order->method('getState')->willReturn($state);
        $order->method('getStatus')->willReturn('processing');
        $order->method('getGrandTotal')->willReturn(99.99);
        $order->method('getStore')->willReturn($store);
        return $order;
    }

    private function makeCreditmemo(MockObject $order, int $cmId = 7): MockObject
    {
        $cm = $this->createMock(Creditmemo::class);
        $cm->method('getOrder')->willReturn($order);
        $cm->method('getId')->willReturn($cmId);
        $cm->method('getGrandTotal')->willReturn(20.00);
        $cm->method('getCreatedAt')->willReturn('2026-05-20T12:00:00+00:00');
        return $cm;
    }

    public function testPartialRefundEnqueuesOrderRefunded(): void
    {
        $order = $this->makeOrder(Order::STATE_PROCESSING);
        $cm    = $this->makeCreditmemo($order);

        $this->scopeConfig->method('getValue')->willReturn(1);

        $this->outboxRepository
            ->expects($this->once())
            ->method('insert')
            ->with($this->callback(function (array $data): bool {
                $payload = json_decode($data['payload'], true);
                return $data['event_type'] === 'order_refunded'
                    && $data['composite_id'] === 'MAG:42'
                    && $payload['data_quality'] === 'proxy'
                    && $payload['creditmemo_id'] === 7;
            }));

        $this->observer->execute($this->makeObserver($cm));
    }

    public function testFullRefundStateClosedSkipsEnqueue(): void
    {
        $order = $this->makeOrder(Order::STATE_CLOSED);
        $cm    = $this->makeCreditmemo($order);

        // SalesOrderSaveAfter handles STATE_CLOSED — no duplicate enqueue expected.
        $this->outboxRepository->expects($this->never())->method('insert');

        $this->observer->execute($this->makeObserver($cm));
    }

    public function testNonCreditmemoEventNoOp(): void
    {
        $event = $this->createMock(Event::class);
        $event->method('getCreditmemo')->willReturn(null);

        $obs = $this->createMock(Observer::class);
        $obs->method('getEvent')->willReturn($event);

        $this->outboxRepository->expects($this->never())->method('insert');

        $this->observer->execute($obs);
    }

    public function testOutboxExceptionLogsAndDoesNotThrow(): void
    {
        $order = $this->makeOrder(Order::STATE_PROCESSING);
        $cm    = $this->makeCreditmemo($order);

        $this->scopeConfig->method('getValue')->willReturn(1);
        $this->outboxRepository->method('insert')->willThrowException(new \RuntimeException('DB down'));

        $this->logger
            ->expects($this->once())
            ->method('error')
            ->with('Failed to enqueue Trusteed creditmemo webhook', $this->arrayHasKey('error'));

        // Must not propagate — error is logged, checkout is not interrupted.
        $this->observer->execute($this->makeObserver($cm));
    }

    public function testPayloadContainsDataQualityProxy(): void
    {
        $order = $this->makeOrder(Order::STATE_PROCESSING, 99);
        $cm    = $this->makeCreditmemo($order, 5);

        $this->scopeConfig->method('getValue')->willReturn(2);

        $captured = null;
        $this->outboxRepository
            ->expects($this->once())
            ->method('insert')
            ->willReturnCallback(function (array $data) use (&$captured): int {
                $captured = $data;
                return 1;
            });

        $this->observer->execute($this->makeObserver($cm));

        $payload = json_decode($captured['payload'], true);
        $this->assertSame('proxy', $payload['data_quality']);
        $this->assertSame(5, $payload['creditmemo_id']);
        $this->assertSame('MAG:99', $captured['composite_id']);
        $this->assertSame(2, $captured['secret_version']);
    }
}
