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
 * PL-F6 (fable audit 2026-07-02) regression.
 *
 * Root cause: `buildSignature()` used to fabricate a placeholder signature
 * `"t=<ts>,s=dev-bypass"` whenever the HMAC secret config was empty, instead
 * of failing. A merchant who completed the `api_base_url` + `installation_id`
 * steps of the connector wizard but never set the HMAC secret would silently
 * send requests that LOOK signed (a well-formed `X-Trusteed-Signature`
 * header is present) but carry no real HMAC — the enforcement API would
 * reject them, but the client had no way to distinguish "genuinely
 * unconfigured" from "signature rejected" in its own logs/behaviour.
 *
 * Fix: an empty HMAC secret now joins the existing "unconfigured connector →
 * never call the API, never block" short-circuit (mirrors the
 * apiBase/installationId-empty branches already covered by
 * EnforcementActivationTest), and `buildSignature()` itself refuses to
 * fabricate a signature as a defense-in-depth backstop.
 *
 * These tests assert, for all three EnforcementClient network call sites:
 *   1. NO network call happens when the HMAC secret is empty.
 *   2. The safe fail-open outcome is returned (ALLOW / null / INDETERMINATE).
 */
class EmptyHmacSecretTest extends TestCase
{
    /**
     * Curl stub that records whether any HTTP verb was invoked. Any call
     * during an empty-hmac-secret scenario is itself a test failure signal.
     */
    private function makeCurl(object $calls): Curl
    {
        return new class($calls) extends Curl {
            public function __construct(private readonly object $calls) {}
            public function setTimeout(int $seconds): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                $this->calls->called = true;
            }
            public function get(string $url): void
            {
                $this->calls->called = true;
            }
            public function getStatus(): int { return 200; }
            public function getBody(): string { return '{"decision":"ALLOW"}'; }
        };
    }

    /**
     * @param array<string,string|null> $overrides
     */
    private function makeScopeConfig(array $overrides = []): ScopeConfigInterface
    {
        $config = array_merge([
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            // hmac_secret intentionally ABSENT — this is the scenario under test.
            'trusteed_general/general/merchant_id'  => 'merchant_xyz',
        ], $overrides);

        return new class($config) implements ScopeConfigInterface {
            /** @param array<string,string|null> $config */
            public function __construct(private readonly array $config) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $this->config[$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    private function payload(): array
    {
        return [
            'merchantId'     => 'merchant_xyz',
            'agentId'        => 'did:web:agent.example',
            'orderContext'   => ['total' => 1000],
            'platform'       => 'MAGENTO',
            'installationId' => 'inst_abc',
            'timestamp'      => gmdate('Y-m-d\TH:i:s\Z'),
        ];
    }

    /** F6-01 — evaluate(): empty HMAC secret → ALLOW, no network call. */
    public function testEvaluateShortCircuitsOnEmptyHmacSecret(): void
    {
        $calls = new \stdClass();
        $calls->called = false;

        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects($this->atLeastOnce())
            ->method('warning')
            ->with($this->stringContains('HMAC secret not configured'));

        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($calls),
            $logger
        );

        $decision = $client->evaluate($this->payload());

        $this->assertSame('ALLOW', $decision, 'Empty HMAC secret must never fabricate a signature and must fail open to ALLOW');
        $this->assertFalse($calls->called, 'No API call may be made when the HMAC secret is unconfigured');
    }

    /** F6-02 — getDidResolver()/fetchSnapshotPayload(): empty HMAC secret → null payload, no network call. */
    public function testSnapshotFetchShortCircuitsOnEmptyHmacSecret(): void
    {
        $calls = new \stdClass();
        $calls->called = false;

        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects($this->atLeastOnce())
            ->method('warning')
            ->with($this->stringContains('HMAC secret not configured'));

        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($calls),
            $logger
        );

        $resolver = $client->getDidResolver('merchant_xyz');

        $this->assertSame([], $resolver, 'Empty HMAC secret must fail open to an empty resolver');
        $this->assertFalse($calls->called, 'No API call may be made when the HMAC secret is unconfigured');
    }

    /** F6-03 — consumeNonce(): empty HMAC secret → INDETERMINATE hmac_secret_missing, no network call. */
    public function testConsumeNonceShortCircuitsOnEmptyHmacSecret(): void
    {
        $calls = new \stdClass();
        $calls->called = false;

        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects($this->atLeastOnce())
            ->method('warning')
            ->with($this->stringContains('HMAC secret not configured'));

        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($calls),
            $logger
        );

        $result = $client->consumeNonce('did:web:agent.example', 'abc123XYZ_nonce-0001', time() + 300);

        $this->assertSame(NonceOutcome::INDETERMINATE, $result['outcome']);
        $this->assertSame('hmac_secret_missing', $result['reason']);
        $this->assertNull($result['httpStatus']);
        $this->assertFalse($calls->called, 'No API call may be made when the HMAC secret is unconfigured');
    }

    /**
     * F6-04 — direct backstop: buildSignature() itself must refuse to
     * fabricate a signature for an empty secret (defense-in-depth, in case a
     * future caller forgets to short-circuit).
     */
    public function testBuildSignatureThrowsOnEmptySecret(): void
    {
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl(new \stdClass()),
            $this->createMock(LoggerInterface::class)
        );

        $ref = new \ReflectionMethod(EnforcementClient::class, 'buildSignature');
        $ref->setAccessible(true);

        $this->expectException(\RuntimeException::class);
        $ref->invoke($client, 'raw-body', '');
    }
}
