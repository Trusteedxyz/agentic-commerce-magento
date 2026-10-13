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
 * Mirrors the WooCommerce TokenVerifierTest: 22 cases, TV-01 through TV-22.
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
            'exp'            => $now + 300,
            'agentTrustScore'=> 0.9,
            // base64url jti, 16-128 chars (default valid).
            'jti'            => 'abc123XYZ_test-nonce-0001',
            // The canonical schema requires a `nonce` of 16..64 characters;
            // the verifier checks it.
            'nonce'          => 'nonce-0123456789abcdef',
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

    /** TV-01 Happy path: valid token, correct key */
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

    /** TV-06 kid missing / empty: no DID extractable */
    public function testTV06MissingKid(): void
    {
        $header = ['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt'];
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('missing_kid', $result['error']);
    }

    /** TV-07 iss/kid mismatch (key-confusion guard) */
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

    /** TV-11 iat too old (> MAX_AGE_SECONDS = 300; with the 330 s lifetime cap only 301..330 s is reachable) */
    public function testTV11TooOld(): void
    {
        $claims = array_merge($this->baseClaims(), ['iat' => time() - 320, 'exp' => time() + 10]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('too_old', $result['error']);
    }

    /** 301 s old (inside the former 330 s cap) is now too old. */
    public function testTV11bOneSecondPastMaxAgeIsTooOld(): void
    {
        $claims = array_merge($this->baseClaims(), ['iat' => time() - 301, 'exp' => time() + 29]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('too_old', $result['error']);
    }

    /** Exactly MAX_AGE_SECONDS (300 s) is the boundary → valid (clock re-read so a tick cannot make it 301). */
    public function testTV11cAgeAtMaxAgeIsValid(): void
    {
        do {
            $t      = time();
            $claims = array_merge($this->baseClaims(), ['iat' => $t - 300, 'exp' => $t]);
            $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
            $same   = (time() === $t);
        } while (!$same);
        $this->assertSame('valid', $result['state']);
    }

    /** Ages between the old 120 s (WC/Odoo) limit and 300 s are legitimate. */
    public function testTV11dAgesInsideTheContractAreValid(): void
    {
        foreach ([121, 200, 299] as $age) {
            $claims = array_merge($this->baseClaims(), ['iat' => time() - $age, 'exp' => time() - $age + 300]);
            $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
            $this->assertSame('valid', $result['state'], "age {$age}s must verify");
        }
    }

    /** A future `iat` with a matching exp would give a sliding window: rejected. */
    public function testTV11eFutureIatIsRejected(): void
    {
        $iat    = time() + 3600;
        $claims = array_merge($this->baseClaims(), ['iat' => $iat, 'exp' => $iat + 300]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('iat_in_future', $result['error']);
    }

    /** An `iat` slightly ahead, within the 30 s clock tolerance, is still valid. */
    public function testTV11fSmallClockSkewIatIsValid(): void
    {
        $claims = array_merge($this->baseClaims(), ['iat' => time() + 10, 'exp' => time() + 200]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
    }

    /** Lifetime cap exp - iat (300 s + 30 s grace). */
    public function testTV11gLifetimeAboveCapIsRejected(): void
    {
        $claims = array_merge($this->baseClaims(), ['iat' => time() - 10, 'exp' => time() + 3600]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('lifetime_too_long', $result['error']);
    }

    /** TV-12 Payload tampered after signing: signature fails */
    public function testTV12TamperedPayload(): void
    {
        $result = $this->verifier->verify($this->makeTokenTamperedPayload(), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('sig_invalid', $result['error']);
    }

    /** TV-13 DID not in resolver: INDETERMINATE */
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

    /** TV-14 Empty resolver: INDETERMINATE */
    public function testTV14EmptyResolver(): void
    {
        $result = $this->verifier->verify($this->makeToken(), [], $this->merchantId);
        $this->assertSame('indeterminate', $result['state']);
        $this->assertSame('did_not_in_resolver', $result['error']);
    }

    /** TV-15 exp absent: treated as 0 (no expiry check), token still valid */
    public function testTV15ExpAbsent(): void
    {
        // This test used to assert `valid`: a token WITHOUT `exp` was accepted,
        // meaning it was valid forever. The canonical schema
        // (`AgentTokenPayloadSchema`) requires `exp`, and WooCommerce already
        // rejected it. It now fails closed, like the other ports.
        $claims = $this->baseClaims();
        unset($claims['exp']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('missing_exp', $result['error']);
    }

    /**
     * This test used to require `nonce` with no alias (`missing_nonce`) while
     * the module also demanded a `jti` that no canonical issuer produces. Now
     * a token without `nonce` but with `jti` is valid through the legacy
     * alias; only a token with neither is invalid.
     */
    public function testB5NonceAbsentFallsBackToJtiAlias(): void
    {
        $claims = $this->baseClaims();
        unset($claims['nonce']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
        $this->assertSame('abc123XYZ_test-nonce-0001', $result['jti']);
    }

    public function testB5NeitherNonceNorJtiIsInvalid(): void
    {
        $claims = $this->baseClaims();
        unset($claims['nonce'], $claims['jti']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('missing_jti', $result['error']);
        $this->assertSame('', $result['jti']);
    }

    /** The exact shape of the test token generator: `nonce`, no `jti`. */
    public function testB5CanonicalTokenWithNonceAndNoJtiIsValid(): void
    {
        $claims = $this->baseClaims();
        unset($claims['jti']);
        $claims['nonce'] = bin2hex(random_bytes(16));
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
        $this->assertSame('', $result['error']);
        $this->assertSame($claims['nonce'], $result['jti'], 'el identificador de un solo uso es el nonce');
    }

    public function testB5NonceWinsOverDifferentJti(): void
    {
        $claims = array_merge($this->baseClaims(), ['nonce' => 'theCanonicalNonce0001', 'jti' => 'theLegacyAliasJti0002']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
        $this->assertSame('theCanonicalNonce0001', $result['jti']);
    }

    public function testB5MalformedNonceIsNotRescuedByValidJti(): void
    {
        $claims = array_merge($this->baseClaims(), ['nonce' => 'short']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('bad_jti', $result['error']);
    }

    public function testB5EmptyNonceFallsBackToJtiAndNonStringIsMalformed(): void
    {
        $claims = array_merge($this->baseClaims(), ['nonce' => '']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
        $this->assertSame('abc123XYZ_test-nonce-0001', $result['jti']);

        $claims = array_merge($this->baseClaims(), ['nonce' => ['x']]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('bad_jti', $result['error']);
    }

    public function testB5IdentifierBoundaries16And64AcceptedAnd15And65Rejected(): void
    {
        foreach ([16, 64] as $len) {
            foreach (['nonce', 'jti'] as $claim) {
                $claims = $this->baseClaims();
                unset($claims['nonce'], $claims['jti']);
                $claims[$claim] = str_repeat('a', $len);
                $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
                $this->assertSame('valid', $result['state'], "{$claim} de {$len}");
                $this->assertSame(str_repeat('a', $len), $result['jti']);
            }
        }
        foreach ([15, 65, 128] as $len) {
            foreach (['nonce', 'jti'] as $claim) {
                $claims = $this->baseClaims();
                unset($claims['nonce'], $claims['jti']);
                $claims[$claim] = str_repeat('a', $len);
                $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
                $this->assertSame('invalid', $result['state'], "{$claim} de {$len}");
                $this->assertSame('bad_jti', $result['error']);
            }
        }
    }

    /** Token without `iat` → invalid (it would bypass the age cap). */
    public function testH4IatAbsent(): void
    {
        $claims = $this->baseClaims();
        unset($claims['iat']);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('missing_iat', $result['error']);
    }

    /** TV-16 aud as array instead of string: wrong_aud */
    public function testTV16AudAsArray(): void
    {
        $claims = array_merge($this->baseClaims(), ['aud' => ['trusteed']]);
        $result = $this->verifier->verify($this->makeToken(null, $claims), $this->buildResolver(), $this->merchantId);
        $this->assertSame('invalid', $result['state']);
        $this->assertSame('wrong_aud', $result['error']);
    }

    /** TV-17 Empty payload JSON ({}): iss_kid_mismatch (no iss claim) */
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

    /** TV-18 Public key x has incorrect base64 length (not 32 bytes): bad_pubkey */
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

    /** TV-19 Wrong key type in JWK (kty=RSA): wrong_key_type */
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

    /** TV-20 Wrong curve (P-256): wrong_key_type */
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

    /** TV-21 Correct structure but wrong signing key: sig_invalid */
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

    /** TV-22 kid without fragment (no #key-1): DID extracted correctly, still valid */
    public function testTV22KidWithoutFragment(): void
    {
        $header = array_merge($this->defaultHeader(), ['kid' => $this->did]);
        $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $result['state']);
    }

    /**
     * RFC 7515 section 4.1.11: `crit` requires understanding extensions that
     * this verifier does not understand and our signer does not emit. If
     * present (even `[]`, a string or null) the token is invalid even with a
     * CORRECT signature; the control is that the same token without `crit`
     * verifies.
     */
    public function testTV23CritHeaderMakesTheTokenInvalidEvenWithAValidSignature(): void
    {
        $control = $this->verifier->verify($this->makeToken(), $this->buildResolver(), $this->merchantId);
        $this->assertSame('valid', $control['state'], 'control: sin `crit` verifica');

        foreach ([['exp'], [], 'exp', null] as $crit) {
            $header = array_merge($this->defaultHeader(), ['crit' => $crit, 'exp' => 1]);
            $result = $this->verifier->verify($this->makeToken($header), $this->buildResolver(), $this->merchantId);
            $this->assertSame('invalid', $result['state'], 'crit=' . json_encode($crit));
            $this->assertSame('crit_header', $result['error'], 'crit=' . json_encode($crit));
            $this->assertSame([], $result['claims'], 'un token rechazado no entrega claims');
        }
    }

    /** `crit` is checked before anything that depends on the payload or the resolver: neither the resolver nor the signature is consulted. */
    public function testTV24CritIsRejectedBeforeTheResolverIsConsulted(): void
    {
        $header = array_merge($this->defaultHeader(), ['crit' => ['b64']]);
        $result = $this->verifier->verify($this->makeToken($header), [], $this->merchantId);

        $this->assertSame('invalid', $result['state'], 'with an empty resolver it would be indeterminate if it were not checked first');
        $this->assertSame('crit_header', $result['error']);
    }
}
