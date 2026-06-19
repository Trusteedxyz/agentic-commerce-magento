<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Spec-048 FR-008 — snapshot wire-format contract test.
 *
 * The /v1/rules/snapshot/:merchantId endpoint returns a BARE JWS Compact body
 * with Content-Type application/jose when the caller negotiates
 * `Accept: application/jose`. This test proves the Magento EnforcementClient:
 *   1. Sends `Accept: application/jose` (matching WP-plugin/PrestaShop/Odoo).
 *   2. Parses the raw body as a JWS string (NOT a JSON envelope).
 *
 * Closes the cross-component wire-format drift where the client previously
 * json_decode()'d the body and read $body['jwsCompact'].
 */
class SnapshotJoseWireFormatTest extends TestCase
{
    /**
     * Build a Curl stub that returns $body with status 200 and records every
     * header passed to addHeader() so the test can assert Accept negotiation.
     */
    private function makeCurl(string $body, array &$headers): Curl
    {
        return new class($body, $headers) extends Curl {
            /** @param array<string,string> $captured */
            public function __construct(
                private readonly string $body,
                private array &$captured
            ) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void
            {
                $this->captured[$name] = $value;
            }
            public function get(string $uri): void {}
            public function getStatus(): int { return 200; }
            public function getBody(): string { return $this->body; }
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
                    default => null,
                };
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    /**
     * Build a valid-looking JWS Compact whose payload carries a `rules` array.
     */
    private function makeJws(array $payload): string
    {
        $b64 = static function (array $arr): string {
            return rtrim(strtr(base64_encode(json_encode($arr)), '+/', '-_'), '=');
        };
        $header = $b64(['alg' => 'EdDSA', 'kid' => 'k1']);
        $body   = $b64($payload);
        return $header . '.' . $body . '.' . 'c2lnbmF0dXJl';
    }

    /** Sends Accept: application/jose. */
    public function testSendsAcceptJoseHeader(): void
    {
        $captured = [];
        $jws = $this->makeJws(['rules' => [['ruleCode' => 'R001']]]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($jws, $captured),
            $this->createMock(LoggerInterface::class)
        );

        $client->getRules('merchant_xyz');

        $this->assertArrayHasKey('Accept', $captured);
        $this->assertSame('application/jose', $captured['Accept']);
    }

    /** Parses a BARE JWS body (not a JSON envelope) into the rules array. */
    public function testParsesBareJwsBody(): void
    {
        $captured = [];
        $jws = $this->makeJws([
            'rules' => [
                ['ruleCode' => 'R001', 'mode' => 'enforce', 'enabled' => true],
                ['ruleCode' => 'R003', 'mode' => 'observe', 'enabled' => true],
            ],
        ]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($jws, $captured),
            $this->createMock(LoggerInterface::class)
        );

        $rules = $client->getRules('merchant_xyz');

        $this->assertCount(2, $rules);
        $this->assertSame('R001', $rules[0]['ruleCode']);
        $this->assertSame('R003', $rules[1]['ruleCode']);
    }

    /** Tolerates a trailing newline on the bare JWS body. */
    public function testTrimsTrailingWhitespaceOnBody(): void
    {
        $captured = [];
        $jws = $this->makeJws(['rules' => [['ruleCode' => 'R030']]]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($jws . "\n", $captured),
            $this->createMock(LoggerInterface::class)
        );

        $rules = $client->getRules('merchant_xyz');

        $this->assertCount(1, $rules);
        $this->assertSame('R030', $rules[0]['ruleCode']);
    }
}
