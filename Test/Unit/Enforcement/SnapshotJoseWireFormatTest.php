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
 *   3. (fable audit 2026-07-02, PL-F5) VERIFIES the Ed25519 signature against
 *      the platform JWKS before trusting the payload — a snapshot signed
 *      with an unknown/wrong key must fail-open to an empty rules array.
 *
 * Closes the cross-component wire-format drift where the client previously
 * json_decode()'d the body and read $body['jwsCompact'].
 */
class SnapshotJoseWireFormatTest extends TestCase
{
    /**
     * Build a Curl stub that routes by URL: `.well-known/jwks.json` returns
     * $jwksBody, anything else (the snapshot endpoint) returns $snapshotBody.
     * Both responses report status 200.
     */
    private function makeCurl(string $snapshotBody, string $jwksBody, array &$headers): Curl
    {
        return new class($snapshotBody, $jwksBody, $headers) extends Curl {
            private string $lastUri = '';

            /** @param array<string,string> $captured */
            public function __construct(
                private readonly string $snapshotBody,
                private readonly string $jwksBody,
                private array &$captured
            ) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void
            {
                $this->captured[$name] = $value;
            }
            public function get(string $uri): void
            {
                $this->lastUri = $uri;
            }
            public function getStatus(): int { return 200; }
            public function getBody(): string
            {
                return str_contains($this->lastUri, '.well-known/jwks.json')
                    ? $this->jwksBody
                    : $this->snapshotBody;
            }
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

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Build a REAL Ed25519-signed JWS Compact string whose payload carries
     * $payload, plus the matching JWKS document (kid "k1").
     *
     * @return array{jws: string, jwks: string}
     */
    private function makeSignedJws(array $payload): array
    {
        $keypair = sodium_crypto_sign_keypair();
        $secret  = sodium_crypto_sign_secretkey($keypair);
        $public  = sodium_crypto_sign_publickey($keypair);

        $header = self::b64url((string)json_encode(['alg' => 'EdDSA', 'kid' => 'k1']));
        $body   = self::b64url((string)json_encode($payload));
        $sig    = self::b64url(sodium_crypto_sign_detached("{$header}.{$body}", $secret));
        $jws    = "{$header}.{$body}.{$sig}";

        $jwks = json_encode([
            'keys' => [[
                'kty' => 'OKP',
                'crv' => 'Ed25519',
                'kid' => 'k1',
                'x'   => self::b64url($public),
            ]],
        ]);

        return ['jws' => $jws, 'jwks' => (string)$jwks];
    }

    /** Sends Accept: application/jose. */
    public function testSendsAcceptJoseHeader(): void
    {
        $captured = [];
        $signed = $this->makeSignedJws(['rules' => [['ruleCode' => 'R001']]]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($signed['jws'], $signed['jwks'], $captured),
            $this->createMock(LoggerInterface::class)
        );

        $client->getRules('merchant_xyz');

        $this->assertArrayHasKey('Accept', $captured);
        $this->assertSame('application/jose', $captured['Accept']);
    }

    /** Parses a BARE JWS body (not a JSON envelope) into the rules array, once signature-verified. */
    public function testParsesBareJwsBody(): void
    {
        $captured = [];
        $signed = $this->makeSignedJws([
            'rules' => [
                ['ruleCode' => 'R001', 'mode' => 'enforce', 'enabled' => true],
                ['ruleCode' => 'R003', 'mode' => 'observe', 'enabled' => true],
            ],
        ]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($signed['jws'], $signed['jwks'], $captured),
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
        $signed = $this->makeSignedJws(['rules' => [['ruleCode' => 'R030']]]);
        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($signed['jws'] . "\n", $signed['jwks'], $captured),
            $this->createMock(LoggerInterface::class)
        );

        $rules = $client->getRules('merchant_xyz');

        $this->assertCount(1, $rules);
        $this->assertSame('R030', $rules[0]['ruleCode']);
    }

    /**
     * PL-F5 regression guard — a JWS with a valid shape but a BOGUS signature
     * (e.g. tampered payload, or signed by an unrecognized key) MUST fail
     * open to an empty rules array, never trust the payload.
     */
    public function testRejectsInvalidSignature(): void
    {
        $captured = [];
        $signed = $this->makeSignedJws(['rules' => [['ruleCode' => 'R999']]]);
        // Tamper the payload segment after signing — signature no longer matches.
        $parts = explode('.', $signed['jws']);
        $parts[1] = self::b64url((string)json_encode(['rules' => [['ruleCode' => 'R999-TAMPERED']]]));
        $tamperedJws = implode('.', $parts);

        $client = new EnforcementClient(
            $this->makeScopeConfig(),
            $this->makeCurl($tamperedJws, $signed['jwks'], $captured),
            $this->createMock(LoggerInterface::class)
        );

        $rules = $client->getRules('merchant_xyz');

        $this->assertSame([], $rules);
    }
}
