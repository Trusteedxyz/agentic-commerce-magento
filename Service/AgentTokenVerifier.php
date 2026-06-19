<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Psr\Log\LoggerInterface;

/**
 * Agent token JWS verifier — Ed25519 offline verification for Magento.
 *
 * Verifies a Trusteed agent token (JWS Compact Serialization with EdDSA/Ed25519)
 * against a public key resolved from the enforcement snapshot's agentDidResolver.
 *
 * Three-state result (state field):
 *   'valid'         — signature cryptographically correct
 *   'invalid'       — signature wrong or claims rejected
 *   'indeterminate' — cannot verify (no sodium, DID absent from resolver)
 *
 * Mirrors packages/prestashop-module-agenticmcpstores/src/Enforcement/TokenVerifier.php
 * and packages/wp-plugin/.../includes/class-token-verifier.php.
 *
 * @since 1.0.0 (spec-050 enforcement layer)
 */
class AgentTokenVerifier
{
    private const EXPECTED_TYP = 'trusteed-agent-token+jwt';
    private const EXPECTED_AUD = 'trusteed';
    private const MAX_AGE_SECONDS = 330;

    /**
     * `jti` format gate (spec-048 P2.8). Base64url-ish characters, 16–128 chars.
     * Mirrors WC class-token-verifier.php and PS TokenVerifier.php JTI_RE.
     */
    private const JTI_RE = '/^[A-Za-z0-9_-]{16,128}$/';

    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    /**
     * Verify a JWS Compact agent token.
     *
     * @param string $jwsCompact   JWS Compact Serialization string.
     * @param array  $didResolver  Array of { did, publicKeyJwk: { kty, crv, x } }.
     * @param string $merchantId   Expected merchantId claim.
     * @return array{state: string, agentDid: string, trustScore: float, error: string, kid: string, jti: string, exp: int}
     *         Spec-048 P2.8 — `jti`/`exp` populated only when token reaches the
     *         signature-check stage. Missing/malformed jti → INVALID with
     *         error=missing_jti|bad_jti.
     */
    public function verify(string $jwsCompact, array $didResolver, string $merchantId): array
    {
        if (!function_exists('sodium_crypto_sign_verify_detached') && !class_exists('\ParagonIE_Sodium_Compat')) {
            return $this->result('indeterminate', '', 0.0, 'sodium_unavailable');
        }

        $parts = explode('.', $jwsCompact);
        if (count($parts) !== 3) {
            return $this->result('invalid', '', 0.0, 'malformed_jws');
        }

        [$headerB64, $payloadB64, $sigB64] = $parts;

        $headerJson = $this->b64urlDecode($headerB64);
        if ($headerJson === false) {
            return $this->result('invalid', '', 0.0, 'bad_header_encoding');
        }
        $header = json_decode($headerJson, true);
        if (!is_array($header)) {
            return $this->result('invalid', '', 0.0, 'bad_header_json');
        }

        if (($header['alg'] ?? '') !== 'EdDSA') {
            return $this->result('invalid', '', 0.0, 'wrong_alg');
        }
        if (($header['typ'] ?? '') !== self::EXPECTED_TYP) {
            return $this->result('invalid', '', 0.0, 'wrong_typ');
        }

        // Extract DID from kid: "did:web:example.com#key-1" → "did:web:example.com".
        $kid = (string)($header['kid'] ?? '');
        $did = str_contains($kid, '#') ? explode('#', $kid)[0] : $kid;
        if ($did === '') {
            return $this->result('invalid', '', 0.0, 'missing_kid');
        }

        $payloadJson = $this->b64urlDecode($payloadB64);
        if ($payloadJson === false) {
            return $this->result('invalid', $did, 0.0, 'bad_payload_encoding');
        }
        $payload = json_decode($payloadJson, true);
        if (!is_array($payload)) {
            return $this->result('invalid', $did, 0.0, 'bad_payload_json');
        }

        // Key-confusion guard (HIGH-4): iss must match kid-derived DID.
        if (($payload['iss'] ?? '') !== $did) {
            return $this->result('invalid', $did, 0.0, 'iss_kid_mismatch');
        }
        if (($payload['aud'] ?? '') !== self::EXPECTED_AUD) {
            return $this->result('invalid', $did, 0.0, 'wrong_aud');
        }
        if (isset($payload['merchantId']) && $payload['merchantId'] !== $merchantId) {
            return $this->result('invalid', $did, 0.0, 'merchant_id_mismatch');
        }

        $now = time();
        $exp = isset($payload['exp']) ? (int)$payload['exp'] : 0;
        if ($exp > 0 && $now > $exp + 30) {
            return $this->result('invalid', $did, 0.0, 'expired');
        }
        $iat = isset($payload['iat']) ? (int)$payload['iat'] : 0;
        if ($iat > 0 && ($now - $iat) > self::MAX_AGE_SECONDS) {
            return $this->result('invalid', $did, 0.0, 'too_old');
        }

        // Spec-048 P2.8 — extract `jti` for backend single-use replay protection.
        // Missing or malformed jti is treated as INVALID to prevent unbounded
        // replay attacks. Mirrors WC class-token-verifier.php + PS TokenVerifier
        // missing_jti / bad_jti gating.
        $jtiRaw = isset($payload['jti']) ? (string)$payload['jti'] : '';
        if ($jtiRaw === '') {
            return $this->result('invalid', $did, 0.0, 'missing_jti', $kid);
        }
        if (preg_match(self::JTI_RE, $jtiRaw) !== 1) {
            return $this->result('invalid', $did, 0.0, 'bad_jti', $kid);
        }

        // Resolve public key from agentDidResolver.
        $resolverMap = $this->buildResolverMap($didResolver);
        $jwk = $resolverMap[$did] ?? null;
        if ($jwk === null) {
            return $this->result('indeterminate', $did, 0.0, 'did_not_in_resolver', $kid);
        }

        if (($jwk['kty'] ?? '') !== 'OKP' || ($jwk['crv'] ?? '') !== 'Ed25519') {
            return $this->result('invalid', $did, 0.0, 'wrong_key_type');
        }

        $pubkeyBytes = $this->b64urlDecode($jwk['x'] ?? '');
        if ($pubkeyBytes === false || strlen($pubkeyBytes) !== SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES) {
            return $this->result('invalid', $did, 0.0, 'bad_pubkey');
        }

        $sigBytes = $this->b64urlDecode($sigB64);
        if ($sigBytes === false || strlen($sigBytes) !== SODIUM_CRYPTO_SIGN_BYTES) {
            return $this->result('invalid', $did, 0.0, 'bad_sig_encoding');
        }

        $signingInput = $headerB64 . '.' . $payloadB64;
        try {
            $valid = sodium_crypto_sign_verify_detached($sigBytes, $signingInput, $pubkeyBytes);
        } catch (\SodiumException $e) {
            $this->logger->warning('[trusteed] agent token sodium exception: ' . $e->getMessage());
            return $this->result('indeterminate', $did, 0.0, 'sodium_exception', $kid);
        }

        if (!$valid) {
            return $this->result('invalid', $did, 0.0, 'sig_invalid');
        }

        $trustScore = isset($payload['agentTrustScore']) ? (float)$payload['agentTrustScore'] : 0.0;
        return $this->result('valid', $did, $trustScore, '', $kid, $jtiRaw, $exp);
    }

    /** @param array<array{did: string, publicKeyJwk: array}> $didResolver */
    private function buildResolverMap(array $didResolver): array
    {
        $map = [];
        foreach ($didResolver as $entry) {
            if (isset($entry['did'], $entry['publicKeyJwk']) && is_string($entry['did'])) {
                $map[$entry['did']] = $entry['publicKeyJwk'];
            }
        }
        return $map;
    }

    private function result(
        string $state,
        string $agentDid,
        float $trustScore,
        string $error,
        string $kid = '',
        string $jti = '',
        int $exp = 0
    ): array {
        return compact('state', 'agentDid', 'trustScore', 'error', 'kid', 'jti', 'exp');
    }

    private function b64urlDecode(string $input): string|false
    {
        $padded = strtr($input, '-_', '+/');
        $mod = strlen($padded) % 4;
        if ($mod !== 0) {
            $padded .= str_repeat('=', 4 - $mod);
        }
        return base64_decode($padded, true);
    }
}
