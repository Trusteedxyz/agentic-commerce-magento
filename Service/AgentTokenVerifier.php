<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * Agent token JWS verifier, Ed25519 offline verification for Magento.
 *
 * Verifies a Trusteed agent token (JWS Compact Serialization with EdDSA/Ed25519)
 * against a public key resolved from the enforcement snapshot's agentDidResolver.
 *
 * Three-state result (state field):
 *   'valid'        , signature cryptographically correct
 *   'invalid'      , signature wrong or claims rejected
 *   'indeterminate', cannot verify (no sodium, DID absent from resolver)
 *
 * Mirrors the PrestaShop and WooCommerce token verifiers.
 *
 * @since 1.0.0
 */
class AgentTokenVerifier
{
    private const EXPECTED_TYP = 'trusteed-agent-token+jwt';
    private const EXPECTED_AUD = 'trusteed';
    /**
     * Max token age from `iat` to now (seconds). The
     * SAME number in every verifier, the 300 s the contract declares
     * (`AgentTokenPayloadSchema`: `exp - iat <= 300`). It was 330 (300 + the 30 s
     * `exp` grace), which accepted tokens the server and the Shopify Function
     * already reject. Kept in sync across
     * languages by a parity test in the server repository.
     */
    private const MAX_AGE_SECONDS = 300;

    /**
     * Format gate of the single-use identifier base64url
     * characters, 16-64 chars (the canonical schema's `nonce` length; the
     * alphabet of the server's nonce-consume endpoint). Mirrors the WC and PS
     * verifiers.
     */
    private const REPLAY_ID_RE = '/^[A-Za-z0-9_-]{16,64}$/';

    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    /**
     * Verify a JWS Compact agent token.
     *
     * @param string $jwsCompact   JWS Compact Serialization string.
     * @param array  $didResolver  agentDidResolver: list [{ did, publicKeyJwk: { kty, crv, x } }] or legacy map.
     * @param string $merchantId   Expected merchantId claim.
     * @return array{state: string, agentDid: string, trustScore: float, error: string, kid: string, jti: string, exp: int, claims: array<string,mixed>}
     *         `claims`: the decoded payload, ONLY for a 'valid' token ([] otherwise:
     *         a claim of an unverified token is never a signal).
     *         `jti`/`exp` populated only for a 'valid' token. The
     *         `jti` key holds the single-use identifier: the canonical `nonce`
     *         claim, or the legacy `jti` claim as an alias when `nonce` is absent). Missing/malformed → INVALID with error=missing_jti|bad_jti
     *         (codes kept for the `_agent_token_jti_*` attributes the server knows;
     *         they now cover the nonce).
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
        // RFC 7515 section 4.1.11: `crit` requires understanding extensions that
        // we do not understand and the token signer never emits. Present (even `[]`) means invalid.
        if (array_key_exists('crit', $header)) {
            return $this->result('invalid', '', 0.0, 'crit_header');
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

        // Key-confusion guard: iss must match kid-derived DID.
        if (($payload['iss'] ?? '') !== $did) {
            return $this->result('invalid', $did, 0.0, 'iss_kid_mismatch');
        }
        if (($payload['aud'] ?? '') !== self::EXPECTED_AUD) {
            return $this->result('invalid', $did, 0.0, 'wrong_aud');
        }
        if (isset($payload['merchantId']) && $payload['merchantId'] !== $merchantId) {
            return $this->result('invalid', $did, 0.0, 'merchant_id_mismatch');
        }

        // `exp`, `iat` and `nonce` are REQUIRED. The canonical token schema
        // demands them and the WooCommerce verifier already did. The two checks
        // below used to hang off `> 0`, so a token that OMITTED the claim (or set
        // it to 0) skipped expiry and the age cap entirely: valid forever.
        if (!isset($payload['exp']) || !is_numeric($payload['exp'])) {
            return $this->result('invalid', $did, 0.0, 'missing_exp', $kid);
        }
        if (!isset($payload['iat']) || !is_numeric($payload['iat'])) {
            return $this->result('invalid', $did, 0.0, 'missing_iat', $kid);
        }

        $now = time();
        $exp = (int)$payload['exp'];
        if ($now > $exp + 30) {
            return $this->result('invalid', $did, 0.0, 'expired');
        }
        $iat = (int)$payload['iat'];
        // Future `iat` plus lifetime cap: without them, an advanced iat gives a sliding window
        // (same guard as PrestaShop and WooCommerce): 30 s of clock tolerance and 300 s + 30 s of lifetime.
        if (($iat - 30) > $now) {
            return $this->result('invalid', $did, 0.0, 'iat_in_future', $kid);
        }
        if (($exp - $iat) > self::MAX_AGE_SECONDS + 30) {
            return $this->result('invalid', $did, 0.0, 'lifetime_too_long', $kid);
        }
        if (($now - $iat) > self::MAX_AGE_SECONDS) {
            return $this->result('invalid', $did, 0.0, 'too_old');
        }

        // Single-use identifier for backend replay protection:
        // the canonical `nonce` claim, or the legacy `jti` as an alias when `nonce`
        // is absent or empty (with both present `nonce` wins; a malformed `nonce`
        // is not rescued by a valid `jti`). Missing or malformed is INVALID. It is
        // only RETURNED for a 'valid' token, i.e. after the signature below.
        $replayId = $this->replayIdentifier($payload);
        if ($replayId === null) {
            return $this->result('invalid', $did, 0.0, 'missing_jti', $kid);
        }
        if ($replayId === '' || preg_match(self::REPLAY_ID_RE, $replayId) !== 1) {
            return $this->result('invalid', $did, 0.0, 'bad_jti', $kid);
        }

        // Resolve public key from agentDidResolver (list, last well-formed entry
        // of the DID wins, a malformed one never overrides it, or legacy map).
        $jwk = FailurePolicy::resolveAgentDidPublicKey($didResolver, $did);
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
        return $this->result('valid', $did, $trustScore, '', $kid, $replayId, $exp, $payload);
    }

    /**
     * Raw single-use identifier of a payload: `nonce` (canonical) or, when it is
     * absent or empty, `jti` (legacy alias). null = neither is present; a value
     * that is not a string is returned as '' so the caller reports it malformed.
     */
    private function replayIdentifier(array $payload): ?string
    {
        $raw = $payload['nonce'] ?? null;
        if ($raw === null || $raw === '') {
            $raw = $payload['jti'] ?? null;
        }
        if ($raw === null || $raw === '') {
            return null;
        }
        return is_string($raw) ? $raw : '';
    }

    private function result(
        string $state,
        string $agentDid,
        float $trustScore,
        string $error,
        string $kid = '',
        string $jti = '',
        int $exp = 0,
        array $claims = []
    ): array {
        return compact('state', 'agentDid', 'trustScore', 'error', 'kid', 'jti', 'exp', 'claims');
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
