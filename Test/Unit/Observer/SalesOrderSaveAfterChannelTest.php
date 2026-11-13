<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event;
use Magento\Framework\Event\Observer;
use Magento\Sales\Model\Order;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;
use Trusteed\AgenticCommerce\Observer\SalesOrderSaveAfter;

/** Task 5: el canal WebMCP viaja en el payload del pedido; un pedido humano queda como estaba. */
final class SalesOrderSaveAfterChannelTest extends TestCase
{
    /** @return array<string,mixed> */
    private function runWith(?string $channel): array
    {
        $session = new CheckoutSession();
        if ($channel !== null) {
            $session->setData(CheckoutSubmitBefore::SESSION_AGENT_CHANNEL_FOR_ORDER, $channel);
        }
        $store = $this->createMock(\Magento\Store\Model\Store::class);
        $store->method('getCode')->willReturn('default');
        $order = $this->createMock(Order::class);
        $order->method('getId')->willReturn(42);
        $order->method('getIncrementId')->willReturn('000000042');
        $order->method('getState')->willReturn(Order::STATE_NEW);
        $order->method('getStatus')->willReturn('pending');
        $order->method('getGrandTotal')->willReturn(10.0);
        $order->method('getStore')->willReturn($store);
        $order->method('dataHasChangedFor')->willReturnCallback(static fn($k) => $k === 'state');
        $event = $this->createMock(Event::class);
        $event->method('getOrder')->willReturn($order);
        $obs = $this->createMock(Observer::class);
        $obs->method('getEvent')->willReturn($event);

        $inserted = [];
        $outbox = $this->createMock(OutboxRepository::class);
        $outbox->method('insert')->willReturnCallback(function (array $d) use (&$inserted): int {
            $inserted[] = $d;
            return 1;
        });

        (new SalesOrderSaveAfter($outbox, $this->createMock(ScopeConfigInterface::class), $this->createMock(LoggerInterface::class), $session))->execute($obs);
        self::assertCount(1, $inserted);
        return json_decode($inserted[0]['payload'], true);
    }

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('arnés de stubs locales');
        }
    }

    public function testWebmcpChannelIsRecordedInThePayload(): void
    {
        self::assertSame('webmcp', $this->runWith('webmcp')['agent_channel']);
    }

    public function testHumanOrderPayloadHasNoChannelKey(): void
    {
        self::assertArrayNotHasKey('agent_channel', $this->runWith(null));
    }

    public function testUnknownChannelValueIsNotPropagated(): void
    {
        self::assertArrayNotHasKey('agent_channel', $this->runWith('<script>'));
    }

    public function testHumanOrderPayloadOmitsAgentDidInsteadOfSendingNull(): void
    {
        // La API valida agent_did como texto: un null rechaza todo el sobre (400).
        self::assertArrayNotHasKey('agent_did', $this->runWith(null));
    }
}
