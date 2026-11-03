<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\EnforcementClient;
use Trusteed\AgenticCommerce\Service\NonceOutcome;

/**
 * Spec-048 P2.8 — nonce-consume HTTP client tests.
 *
 * Mirrors WC NonceConsumeTest + PS SnapshotClientNonceTest. Verifies the four
 * canonical outcomes (ACCEPTED 200 / REPLAY 409 / INDETERMINATE network /
 * INDETERMINATE 503) on POST /v1/agent-events/nonce-consume.
 */
class NonceConsumeTest extends TestCase
{
    /**
     * Build a Curl stub whose getStatus() returns $status and post() either
     * throws ($throw=true) or succeeds.
     */
    private function makeCurl(int $status, bool $throw = false): Curl
    {
        return new class($status, $throw) extends Curl {
            public function __construct(private readonly int $status, private readonly bool $throw) {}
            public function setTimeout(int $seconds): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                if ($this->throw) {
                    throw new \RuntimeException('connect timeout');
                }
            }
            public function getStatus(): int { return $this->status; }
            public function getBody(): string { return ''; }
        };
    }

    private function makeScopeConfig(): ScopeConfigInterface
    {
        return new class implements ScopeConfigInterface {
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return match ($path) {
                    'trusteed_general/general/api_base_url'   => 'https://api.trusteed.test',
                    'trusteed/enforcement/installation_id'    => 'inst_abc',
                    'trusteed/enforcement/hmac_secret'        => 'sekret',
                    'trusteed_general/general/merchant_id'    => 'merchant_xyz',
                    default => null,
                };
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    private function client(int $status, bool $throw = false): EnforcementClient
    {
        return new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($status, $throw),
            $this->createMock(LoggerInterface::class)
        );
    }

    /** NC-01 — 200 → ACCEPTED */
    public function testNonceAccepted200(): void
    {
        $r = $this->client(200)->consumeNonce('did:web:agent.example', 'abc123XYZ_nonce-0001', time() + 300);
        $this->assertSame(NonceOutcome::ACCEPTED, $r['outcome']);
        $this->assertSame('ok', $r['reason']);
        $this->assertSame(200, $r['httpStatus']);
    }

    /** NC-02 — 409 → REPLAY */
    public function testNonceReplay409(): void
    {
        $r = $this->client(409)->consumeNonce('did:web:agent.example', 'abc123XYZ_nonce-0001', time() + 300);
        $this->assertSame(NonceOutcome::REPLAY, $r['outcome']);
        $this->assertSame('replay_detected', $r['reason']);
        $this->assertSame(409, $r['httpStatus']);
    }

    /** NC-03 — network error (post() throws) → INDETERMINATE network_error */
    public function testNonceIndeterminateNetwork(): void
    {
        $r = $this->client(0, true)->consumeNonce('did:web:agent.example', 'abc123XYZ_nonce-0001', time() + 300);
        $this->assertSame(NonceOutcome::INDETERMINATE, $r['outcome']);
        $this->assertSame('network_error', $r['reason']);
        $this->assertNull($r['httpStatus']);
    }

    /** NC-04 — 503 → INDETERMINATE http_5xx */
    public function testNonceIndeterminate503(): void
    {
        $r = $this->client(503)->consumeNonce('did:web:agent.example', 'abc123XYZ_nonce-0001', time() + 300);
        $this->assertSame(NonceOutcome::INDETERMINATE, $r['outcome']);
        $this->assertSame('http_5xx', $r['reason']);
        $this->assertSame(503, $r['httpStatus']);
    }
}
