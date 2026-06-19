<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Service;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;

/**
 * Unit tests for AgentTokenVerifier.
 *
 * Mirrors WooCommerce TokenVerifierTest — 22 cases, TV-01 through TV-22.
 * Uses real ext-sodium for Ed25519 key generation and signing.
 *
 * Result shape: array{state: string, agentDid: string, trustScore: float, error: string}
 */
class AgentTokenVerifierTest extends TestCase
{
    private AgentTokenVerifier $verifier;
    /** @var LoggerInterface&MockObject */
    private LoggerInterface $logger;

    private string $pubkeyRaw;
    private string $privkeyRaw;
    private string $merchantId = 'merchant_abc123';
    private string $did        = 'did:web:agent.example.com';

    protected function setUp(): void
    {
        $this->logger = $this->createMock(LoggerInterface::class);
        $this->verifier = new AgentTokenVerifier($this->logger);

        $keypair = sodium_crypto_sign_keypair();
        $this->pubkeyRaw  = sodium_crypto_sign_publickey($keypair);
        $this->privkeyRaw = sodium_crypto_sign_secretkey($keypair);
    }

    // ------------------------------------------------------------------ helpers

    private function b64url(string $bytes): string
    {
        return rtrim(strtr(base64_encode($bytes), '+/', '-_'), '=');
    }

    private function defaultHeader(): array
    {
        return [
            'alg' => 'EdDSA',
            'typ' => 'trusteed-agent-token+jwt',
            'kid' => $this->did . '#key-1',
        ];
    }

    private function baseClaims(): array
    {
        $now = time();
        return [
            'iss'            => $this->did,
            'aud'            => 'trusteed',
            'merchantId'     => $this->merchantId,
            'agentDid'       => $this->did,
            'iat'            => $now,
            'exp'            => $now + 3600,
            'agentTrustScore'=> 0.9,
            // Spec-048 P2.8 — base64url jti, 16-128 chars (default valid).
            'jti'            => 'abc123XYZ_test-nonce-0001',
        ];
    }

    private function buildResolver(?string $raw = null): array
    {
        return [[
            'did' => $this->did,
            'publicKeyJwk' => [
                'kty' => 'OKP',
                'crv' => 'Ed25519',
                'x'   => $this->b64url($raw ?? $this->pubkeyRaw),
            ],
        ]];
    }

    /**
     * @param array|null $header  null = defaultHeader()
     * @param array|null $claims  null = baseClaims()
     * @param string|null $privkey null = $this->privkeyRaw
     */
    private function makeToken(?array $header = null, ?array $claims = null, ?string $privkey = null): string
    {
        $h = $this->b64url(json_encode($header ?? $this->defaultHeader()));
        $p = $this->b64url(json_encode($claims ?? $this->baseClaims()));
        $sigBytes = sodium_crypto_sign_detached("$h.$p", $privkey ?? $this->privkeyRaw);
        $s = $this->b64url($sigBytes);
        return "$h.$p.$s";
    }

    private function makeTokenTamperedPayload(): string
    {
        $h = $this->b64url(json_encode($this->defaultHeader()));
        $p = $this->b64url(json_encode($this->baseClaims()));
        $sigBytes = sodium_crypto_sign_detached("$h.$p", $this->privkeyRaw);
        $s = $this->b64url($sigBytes);
        // Swap payload segment after signing
        $evil = $this->b64url(json_encode(array_merge($this->baseClaims(), ['evil' => true])));
        return "$h.$evil.$s";
    }

    // ------------------------------------------------------------------ tests

    /** TV-01 Happy path — valid token, correct key */
    public function testTV01HappyPathValid(): void
    {
        $result = $this->verifier->verify($this->makeToken(), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
        $this->assertSame($this->did, $result['agentDid']);
        $this->assertEqualsWithDelta(0.9, $result['trustScore'], 0.001);
        $this->assertSame('', $result['error']);
    }

    /** TV-02 JWS fewer than 3 parts */
    public function testTV02MalformedJws(): void
    {
        $result = $this->verifier->verify('abc.def', [], $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('malformed_jws', $result['error']);
    }

    /** TV-03 Header base64 invalid */
    public function testTV03BadHeaderEncoding(): void
    {
        $result = $this->verifier->verify('!!!.abc.abc', [], $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('bad_header_encoding', $result['error']);
    }

    /** TV-04 alg != EdDSA */
    public function testTV04WrongAlg(): void
    {
        $header = array_merge($this->defaultHeader(), ['alg' => 'RS256']);
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_alg', $result['error']);
    }

    /** TV-05 typ incorrect */
    public function testTV05WrongTyp(): void
    {
        $header = array_merge($this->defaultHeader(), ['typ' => 'JWT']);
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_typ', $result['error']);
    }

    /** TV-06 kid missing / empty — no DID extractable */
    public function testTV06MissingKid(): void
    {
        $header = ['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt'];
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('missing_kid', $result['error']);
    }

    /** TV-07 iss/kid mismatch (HIGH-4 key-confusion guard) */
    public function testTV07IssKidMismatch(): void
    {
        $claims = array_merge($this->baseClaims(), ['iss' => 'did:web:other.example.com']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('iss_kid_mismatch', $result['error']);
    }

    /** TV-08 aud incorrect */
    public function testTV08WrongAud(): void
    {
        $claims = array_merge($this->baseClaims(), ['aud' => 'other-service']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_aud', $result['error']);
    }

    /** TV-09 merchantId mismatch */
    public function testTV09MerchantIdMismatch(): void
    {
        $result = $this->verifier->verify($this->makeToken(), $this->buildResolver(), 'different_merchant');
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('merchant_id_mismatch', $result['error']);
    }

    /** TV-10 Token expired (exp in the past, beyond 30s grace) */
    public function testTV10Expired(): void
    {
        $claims = array_merge($this->baseClaims(), ['exp' => time() - 60]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('expired', $result['error']);
    }

    /** TV-11 iat too old (> MAX_AGE_SECONDS = 330) */
    public function testTV11TooOld(): void
    {
        $claims = array_merge($this->baseClaims(), ['iat' => time() - 400]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('too_old', $result['error']);
    }

    /** TV-12 Payload tampered after signing — signature fails */
    public function testTV12TamperedPayload(): void
    {
        $result = $this->verifier->verify($this->makeTokenTamperedPayload(), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('sig_invalid', $result['error']);
    }

    /** TV-13 DID not in resolver — INDETERMINATE */
    public function testTV13DidNotInResolver(): void
    {
        $resolver = [[
            'did' => 'did:web:other.example.com',
            'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => $this->b64url($this->pubkeyRaw)],
        ]];
        $result = $this->verifier->verify($this->makeToken(), $resolver, $this->merchantId);
        $this->assertSame('indeterminate', $result['state']);
        $this->assertSame('did_not_in_resolver', $result['error']);
    }

    /** TV-14 Empty resolver — INDETERMINATE */
    public function testTV14EmptyResolver(): void
    {
        $result = $this->verifier->verify($this->makeToken(), [], $this->merchantId);
        $this->assertSame('indeterminate', $result['state']);
        $this->assertSame('did_not_in_resolver', $result['error']);
    }

    /** TV-15 exp absent — treated as 0 (no expiry check), token still valid */
    public function testTV15ExpAbsent(): void
    {
        $claims = $this->baseClaims();
        unset($claims['exp']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
    }

    /** TV-16 aud as array instead of string — wrong_aud */
    public function testTV16AudAsArray(): void
    {
        $claims = array_merge($this->baseClaims(), ['aud' => ['trusteed']]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_aud', $result['error']);
    }

    /** TV-17 Empty payload JSON ({}) — iss_kid_mismatch (no iss claim) */
    public function testTV17EmptyPayload(): void
    {
        $h = $this->b64url(json_encode($this->defaultHeader()));
        $p = $this->b64url('{}');
        $sigBytes = sodium_crypto_sign_detached("$h.$p", $this->privkeyRaw);
        $s = $this->b64url($sigBytes);
        $result = $this->verifier->verify("$h.$p.$s", $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('iss_kid_mismatch', $result['error']);
    }

    /** TV-18 Public key x has incorrect base64 length (not 32 bytes) — bad_pubkey */
    public function testTV18BadPubkeyLength(): void
    {
        $resolver = [[
            'did' => $this->did,
            'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => $this->b64url('short')],
        ]];
        $result = $this->verifier->verify($this->makeToken(), $resolver, $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('bad_pubkey', $result['error']);
    }

    /** TV-19 Wrong key type in JWK (kty=RSA) — wrong_key_type */
    public function testTV19WrongKeyType(): void
    {
        $resolver = [[
            'did' => $this->did,
            'publicKeyJwk' => ['kty' => 'RSA', 'crv' => 'Ed25519', 'x' => $this->b64url($this->pubkeyRaw)],
        ]];
        $result = $this->verifier->verify($this->makeToken(), $resolver, $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_key_type', $result['error']);
    }

    /** TV-20 Wrong curve (P-256) — wrong_key_type */
    public function testTV20WrongCurve(): void
    {
        $resolver = [[
            'did' => $this->did,
            'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'P-256', 'x' => $this->b64url($this->pubkeyRaw)],
        ]];
        $result = $this->verifier->verify($this->makeToken(), $resolver, $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_key_type', $result['error']);
    }

    /** TV-21 Correct structure but wrong signing key — sig_invalid */
    public function testTV21WrongSigningKey(): void
    {
        $otherKeypair = sodium_crypto_sign_keypair();
        $otherPrivkey = sodium_crypto_sign_secretkey($otherKeypair);
        // Resolver has $this->pubkeyRaw but token signed with otherPrivkey
        $token = $this->makeToken(null, null, $otherPrivkey);
        $result = $this->verifier->verify($token, $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('sig_invalid', $result['error']);
    }

    /** TV-22 kid without fragment (no #key-1) — DID extracted correctly, still valid */
    public function testTV22KidWithoutFragment(): void
    {
        $header = array_merge($this->defaultHeader(), ['kid' => $this->did]);
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
    }
}
