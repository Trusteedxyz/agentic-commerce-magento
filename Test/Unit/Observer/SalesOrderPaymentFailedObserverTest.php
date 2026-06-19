<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event;
use Magento\Framework\Event\Observer;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Quote\Model\Quote;
use Magento\Sales\Model\Order;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Observer\SalesOrderPaymentFailedObserver;

/**
 * Spec-048 P0b — SalesOrderPaymentFailedObserver unit tests.
 *
 * Mirrors the pattern in {@see SalesCreditmemoSaveAfterTest}: pure mock-based
 * harness, no Magento bootstrapping required beyond the framework class stubs
 * already loaded by Composer autoload in CI.
 */
final class SalesOrderPaymentFailedObserverTest extends TestCase
{
    private SalesOrderPaymentFailedObserver $observer;
    private MockObject $scopeConfig;
    private MockObject $curl;
    private MockObject $logger;

    protected function setUp(): void
    {
        $this->scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $this->curl        = $this->createMock(Curl::class);
        $this->logger      = $this->createMock(LoggerInterface::class);

        $this->observer = new SalesOrderPaymentFailedObserver(
            $this->scopeConfig,
            $this->curl,
            $this->logger,
        );
    }

    /**
     * Configure all four scope_config keys with sane defaults.
     */
    private function primeConfig(
        string $apiBase = 'https://api.trusteed.example',
        string $merchantId = 'mer_123',
        string $installationId = 'inst_abc',
        string $hmacSecret = 'super-secret'
    ): void {
        // Observer invokes getValue(path) with a single positional argument.
        $this->scopeConfig->method('getValue')->willReturnCallback(
            function (string $path) use ($apiBase, $merchantId, $installationId, $hmacSecret) {
                return match ($path) {
                    'trusteed_general/general/api_base_url' => $apiBase,
                    'trusteed_general/general/merchant_id'  => $merchantId,
                    'trusteed/enforcement/installation_id' => $installationId,
                    'trusteed/enforcement/hmac_secret'     => $hmacSecret,
                    default                                 => null,
                };
            }
        );
    }

    private function makeObserverFromEvent(
        ?Order $order,
        ?Quote $quote,
        ?string $message = null
    ): Observer {
        $event = $this->createMock(Event::class);
        $event->method('getOrder')->willReturn($order);
        $event->method('getQuote')->willReturn($quote);
        if ($message !== null) {
            $event->method('getMessage')->willReturn($message);
        }

        $obs = $this->createMock(Observer::class);
        $obs->method('getEvent')->willReturn($event);
        return $obs;
    }

    public function testEmitsHmacSignedPostWithExpectedBody(): void
    {
        $this->primeConfig();

        $order = $this->createMock(Order::class);
        $order->method('getIncrementId')->willReturn('000000099');
        $order->method('getData')->with('trusteed_agent_did')->willReturn('did:example:agent-1');

        $captured = ['url' => null, 'payload' => null];
        $this->curl->method('post')->willReturnCallback(
            function (string $url, string $payload) use (&$captured): void {
                $captured['url']     = $url;
                $captured['payload'] = $payload;
            }
        );

        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, 'Card declined by issuer')
        );

        $this->assertSame(
            'https://api.trusteed.example/api/v1/checkout-failures',
            $captured['url']
        );

        $body = json_decode((string) $captured['payload'], true);
        $this->assertIsArray($body);
        $this->assertSame('mer_123', $body['merchantId']);
        $this->assertSame('inst_abc', $body['installationId']);
        $this->assertSame('magento', $body['platform']);
        $this->assertSame('payment_declined', $body['reason']);
        $this->assertSame('did:example:agent-1', $body['agentDid']);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{64}$/', $body['signature']);

        // Verify HMAC = sha256(canonical(body sin signature), secret).
        $unsigned = $body;
        unset($unsigned['signature']);
        ksort($unsigned, SORT_STRING);
        $canonical = json_encode($unsigned, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $expected  = hash_hmac('sha256', (string) $canonical, 'super-secret');
        $this->assertSame($expected, $body['signature']);
    }

    public function testReasonHeuristicMapsKnownPhrases(): void
    {
        $this->primeConfig();

        $order = $this->createMock(Order::class);
        $order->method('getIncrementId')->willReturn('000000100');
        $order->method('getData')->willReturn(null);

        $captured = null;
        $this->curl->method('post')->willReturnCallback(
            function (string $url, string $payload) use (&$captured): void {
                $captured = json_decode($payload, true);
            }
        );

        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, 'Insufficient funds on card')
        );

        $this->assertSame('insufficient_funds', $captured['reason']);
    }

    public function testReasonFallsBackToPaymentFailed(): void
    {
        $this->primeConfig();

        $order = $this->createMock(Order::class);
        $order->method('getIncrementId')->willReturn('000000101');
        $order->method('getData')->willReturn(null);

        $captured = null;
        $this->curl->method('post')->willReturnCallback(
            function (string $url, string $payload) use (&$captured): void {
                $captured = json_decode($payload, true);
            }
        );

        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, '')
        );

        $this->assertSame('payment_failed', $captured['reason']);
    }

    public function testSkipsEmissionWhenNotConfigured(): void
    {
        // No primeConfig() => all getValue() calls return null.
        $this->scopeConfig->method('getValue')->willReturn(null);

        $order = $this->createMock(Order::class);
        $this->curl->expects($this->never())->method('post');

        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, 'whatever')
        );
    }

    public function testOmitsAgentDidWhenAbsent(): void
    {
        $this->primeConfig();

        $order = $this->createMock(Order::class);
        $order->method('getIncrementId')->willReturn('000000102');
        $order->method('getData')->willReturn(null);

        $captured = null;
        $this->curl->method('post')->willReturnCallback(
            function (string $url, string $payload) use (&$captured): void {
                $captured = json_decode($payload, true);
            }
        );

        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, 'gateway error')
        );

        $this->assertArrayNotHasKey('agentDid', $captured);
        $this->assertSame('gateway_error', $captured['reason']);
    }

    public function testNeverThrowsOnCurlException(): void
    {
        $this->primeConfig();

        $order = $this->createMock(Order::class);
        $order->method('getIncrementId')->willReturn('000000103');
        $order->method('getData')->willReturn(null);

        $this->curl->method('post')->willThrowException(new \RuntimeException('network down'));

        $this->logger
            ->expects($this->once())
            ->method('warning')
            ->with($this->stringContains('[spec-048 P0b]'));

        // Must not throw — payment-failure path must keep flowing.
        $this->observer->execute(
            $this->makeObserverFromEvent($order, null, 'declined')
        );
    }

    public function testExtractsAgentDidFromQuoteWhenOrderMissing(): void
    {
        $this->primeConfig();

        $quote = $this->createMock(Quote::class);
        $quote->method('getData')->with('trusteed_agent_did')->willReturn('did:example:from-quote');

        $captured = null;
        $this->curl->method('post')->willReturnCallback(
            function (string $url, string $payload) use (&$captured): void {
                $captured = json_decode($payload, true);
            }
        );

        $this->observer->execute(
            $this->makeObserverFromEvent(null, $quote, 'card declined')
        );

        $this->assertSame('did:example:from-quote', $captured['agentDid']);
    }
}
