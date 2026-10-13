<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Verifies the JWS of the rules snapshot and says WHY it cannot be used
 * (mirrors the reference `decideOnDegradedEnforcement`).
 *
 * Previously `EnforcementClient::verifyAndDecode()` returned null for
 * everything: a tampered snapshot, a JWKS outage and a missing `sodium` all
 * ended up the same, as "no snapshot", and an agent was decided by the mode.
 * Now:
 *
 * - `ok`: the signature verifies against the platform JWKS and the payload is
 *   readable.
 * - `tampered`: the served JWS does not verify even after downloading the JWKS
 *   ONE more time, bypassing the per-request cache (a key rotation is not
 *   tampering). Also a malformed JWS or one whose `alg` is not EdDSA.
 * - `unavailable`: no decision is possible (no `sodium`, empty or unreachable
 *   JWKS, also on the retry, a `sodium` exception), or the signature is
 *   AUTHENTIC but the payload cannot be read, which is not tampering. A
 *   `zip: DEF` payload is inflated with a cap ({@see SnapshotPayloadDecoder});
 *   only an unknown `zip`, a bomb or a broken stream end up unavailable. So
 *   does a missing or unreadable `validUntil` (`valid_until_missing` /
 *   `valid_until_unreadable`).
 *
 * No I/O of its own: the caller supplies the JWKS through
 * `$fetchJwks(bool $force)`, which returns `kid => raw Ed25519 key` (empty
 * means unavailable). A header with `crit` (RFC 7515) is rejected, and the
 * verdict of the forced retry is remembered for 60 s
 * ({@see JwksRetryVerdictStore}).
 *
 * @since 1.3.5
 */
final class SnapshotJwsVerifier
{
    public const OK          = 'ok';
    public const TAMPERED    = 'tampered';
    public const UNAVAILABLE = 'unavailable';

    /**
     * @param callable(bool): array<string,string> $fetchJwks
     * @param JwksRetryVerdictStore|null           $retryVerdicts Negative cache of the forced retry.
     * @return array{status:string, payload:?array, detail:string}
     */
    public static function verify(string $jwsCompact, callable $fetchJwks, ?JwksRetryVerdictStore $retryVerdicts = null): array
    {
        if (!function_exists('sodium_crypto_sign_verify_detached')) {
            return self::outcome(self::UNAVAILABLE, null, 'sodium_unavailable');
        }
        $parts = explode('.', $jwsCompact);
        if (count($parts) !== 3) {
            return self::outcome(self::TAMPERED, null, 'malformed_jws');
        }
        [$headerB64, $payloadB64, $sigB64] = $parts;
        $header = self::decodeJson($headerB64);
        if ($header === null || ($header['alg'] ?? '') !== 'EdDSA'
            || !is_string($header['kid'] ?? null) || $header['kid'] === '') {
            return self::outcome(self::TAMPERED, null, 'bad_header');
        }
        // RFC 7515 section 4.1.11: `crit` requires understanding extensions
        // that we do not understand and the signer does not emit.
        if (array_key_exists('crit', $header)) {
            return self::outcome(self::TAMPERED, null, 'crit_header');
        }

        $check = self::checkSignature($header['kid'], "{$headerB64}.{$payloadB64}", $sigB64, $fetchJwks(false));
        if ($check === 'mismatch') {
            // A retry for this `kid` already failed less than a minute ago:
            // classify with what is known, without another download.
            $known = $retryVerdicts?->read($header['kid']);
            if ($known !== null) {
                return self::outcome($known, null, 'jwks_retry_remembered');
            }
            // A key rotation within the request cache must not look like tampering.
            $fresh = $fetchJwks(true);
            if ($fresh === []) {
                $retryVerdicts?->remember($header['kid'], self::UNAVAILABLE);
                return self::outcome(self::UNAVAILABLE, null, 'jwks_unavailable_on_retry');
            }
            $check = self::checkSignature($header['kid'], "{$headerB64}.{$payloadB64}", $sigB64, $fresh);
            if ($check === 'mismatch') {
                $retryVerdicts?->remember($header['kid'], self::TAMPERED);
            }
        }
        if ($check !== 'valid') {
            return $check === 'mismatch'
                ? self::outcome(self::TAMPERED, null, 'signature_mismatch')
                : self::outcome(self::UNAVAILABLE, null, $check);
        }

        // Only after the signature verified: inflate (if `zip`) with a cap and read.
        $payloadBytes = self::b64urlDecode($payloadB64);
        [$decoded, $payload] = SnapshotPayloadDecoder::decode($header, $payloadBytes === false ? '' : $payloadBytes);
        if ($decoded !== SnapshotPayloadDecoder::OK) {
            $detail = SnapshotPayloadDecoder::declaresZip($header) ? 'payload_' . $decoded : 'payload_unreadable';
            return self::outcome(self::UNAVAILABLE, null, $detail);
        }
        // Our server always signs `validUntil`; without it (or unreadable) the
        // snapshot cannot be treated as current. Not tampering: the signature verified.
        if (SnapshotPayloadDecoder::validUntil((array) $payload) === null) {
            return self::outcome(
                self::UNAVAILABLE,
                null,
                array_key_exists('validUntil', (array) $payload) ? 'valid_until_unreadable' : 'valid_until_missing'
            );
        }
        return self::outcome(self::OK, $payload, 'verified');
    }

    /**
     * @param array<string,string> $jwks
     * @return string 'valid' | 'mismatch' (unknown kid, wrong length, bad signature) |
     *                'jwks_unavailable' | 'sodium_exception'
     */
    private static function checkSignature(string $kid, string $signingInput, string $sigB64, array $jwks): string
    {
        if ($jwks === []) {
            return 'jwks_unavailable';
        }
        $pubkey = $jwks[$kid] ?? null;
        $sig    = self::b64urlDecode($sigB64);
        if (!is_string($pubkey) || $sig === false || strlen($sig) !== SODIUM_CRYPTO_SIGN_BYTES) {
            return 'mismatch';
        }
        try {
            return sodium_crypto_sign_verify_detached($sig, $signingInput, $pubkey) ? 'valid' : 'mismatch';
        } catch (\SodiumException $e) {
            return 'sodium_exception';
        }
    }

    /** @return array{status:string, payload:?array, detail:string} */
    private static function outcome(string $status, ?array $payload, string $detail): array
    {
        return ['status' => $status, 'payload' => $payload, 'detail' => $detail];
    }

    /** @return array<string,mixed>|null */
    private static function decodeJson(string $b64): ?array
    {
        $json = self::b64urlDecode($b64);
        if ($json === false) {
            return null;
        }
        $data = json_decode($json, true);
        return is_array($data) ? $data : null;
    }

    /** @return string|false */
    public static function b64urlDecode(string $data)
    {
        $padded = strtr($data, '-_', '+/');
        $mod    = strlen($padded) % 4;
        if ($mod !== 0) {
            $padded .= str_repeat('=', 4 - $mod);
        }
        return base64_decode($padded, true);
    }
}
