<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Webhook;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Trusteed\AgenticCommerce\Model\Webhook\SignaturePublisher;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;

class SignaturePublisherTest extends TestCase
{
    private SignaturePublisher $publisher;

    protected function setUp(): void
    {
        $curlMock = $this->createMock(Curl::class);
        $curlMock->method('getStatus')->willReturn(200);
        $scopeConfigMock = $this->createMock(ScopeConfigInterface::class);
        $scopeConfigMock->method('getValue')->willReturnMap([
            ['trusteed_general/general/api_base_url', null, null, 'https://api.trusteed.xyz'],
            ['trusteed_general/general/merchant_id', null, null, 'merch-1'],
            ['trusteed_general/general/webhook_secret', null, null, 'secret-key-123'],
            ['trusteed_general/general/integration_token', null, null, 'tok-abc'],
            ['trusteed_general/general/webhook_secret_version', null, null, '1'],
        ]);

        // computeSignature() is pure (HMAC over its arguments); the SecretReader
        // and optional url validator are not exercised by these cases, so a bare
        // mock satisfies the constructor without needing real secret resolution.
        $this->publisher = new SignaturePublisher(
            $curlMock,
            $scopeConfigMock,
            $this->createMock(LoggerInterface::class),
            $this->createMock(SecretReader::class)
        );
    }

    public function testComputeSignatureIsConsistent(): void
    {
        $sig1 = $this->publisher->computeSignature('{"test":1}', 'secret', '1234567890', 'nonce123', 1);
        $sig2 = $this->publisher->computeSignature('{"test":1}', 'secret', '1234567890', 'nonce123', 1);
        $this->assertSame($sig1, $sig2);
    }

    public function testComputeSignatureDiffersOnDifferentSecret(): void
    {
        $sig1 = $this->publisher->computeSignature('payload', 'secret1', '100', 'nonce', 1);
        $sig2 = $this->publisher->computeSignature('payload', 'secret2', '100', 'nonce', 1);
        $this->assertNotSame($sig1, $sig2);
    }

    public function testComputeSignatureUsesHmacSha256IncludingSecretVersion(): void
    {
        $payload = 'test-payload';
        $secret = 'my-secret';
        $timestamp = '1715000000';
        $nonce = 'abc';
        $secretVersion = 3;
        // Codex P1 2026-05-13: canonical = "{ts}.{nonce}.{secretVersion}.{body}"
        $expected = hash_hmac(
            'sha256',
            "{$timestamp}.{$nonce}.{$secretVersion}.{$payload}",
            $secret
        );
        $this->assertSame(
            $expected,
            $this->publisher->computeSignature($payload, $secret, $timestamp, $nonce, $secretVersion)
        );
    }

    public function testComputeSignatureDiffersOnDifferentTimestamp(): void
    {
        $sig1 = $this->publisher->computeSignature('payload', 'secret', '100', 'nonce', 1);
        $sig2 = $this->publisher->computeSignature('payload', 'secret', '200', 'nonce', 1);
        $this->assertNotSame($sig1, $sig2);
    }

    public function testComputeSignatureDiffersOnDifferentNonce(): void
    {
        $sig1 = $this->publisher->computeSignature('payload', 'secret', '100', 'nonce-a', 1);
        $sig2 = $this->publisher->computeSignature('payload', 'secret', '100', 'nonce-b', 1);
        $this->assertNotSame($sig1, $sig2);
    }

    /**
     * Codex P1 replay-bypass coverage: the canonical string must vary when
     * the attacker only changes X-Trusteed-Webhook-Secret-Version.
     */
    public function testComputeSignatureDiffersOnDifferentSecretVersion(): void
    {
        $sig1 = $this->publisher->computeSignature('payload', 'secret', '100', 'nonce', 1);
        $sig2 = $this->publisher->computeSignature('payload', 'secret', '100', 'nonce', 2);
        $this->assertNotSame($sig1, $sig2);
    }
}
