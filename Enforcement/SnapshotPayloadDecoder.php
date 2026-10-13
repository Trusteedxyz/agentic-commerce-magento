<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Payload of the signed snapshot, decoded AFTER the signature is verified.
 * Used by {@see SnapshotJwsVerifier}.
 *
 * The server compresses every snapshot whose JSON exceeds 50 KB with raw
 * DEFLATE (RFC 1951) and marks it with `zip: "DEF"` in the protected header.
 * The signature covers the COMPRESSED bytes, so the order is: verify the
 * signature over what was received and only then call this class. Never inflate
 * before verifying.
 *
 * Contract (the `compressedSnapshot` section of
 * `Test/fixtures/platform-flow-conformance.json`):
 * - no `zip`: the payload is the JSON as is;
 * - `zip` exactly 'DEF': inflate with a cap of {@see MAX_INFLATED_BYTES};
 * - any other `zip`, a corrupt, truncated or empty stream, going over the cap,
 *   or an output that is not a JSON object: not usable.
 *
 * Zip-bomb protection: `inflate_init(ZLIB_ENCODING_RAW)` plus `inflate_add`
 * fed {@see INPUT_CHUNK_BYTES} bytes at a time. DEFLATE does not expand more
 * than about 1032:1, so each step produces at most about 66 KB, and the
 * accumulated output is compared with the cap after every step. Memory never
 * goes past the cap plus one step, however large the bomb claims to be.
 * (`gzinflate($d, $max)` does not work: its limit is approximate, it returns
 * one byte over the cap, and it cannot tell a bomb from a corrupt stream.)
 */
final class SnapshotPayloadDecoder
{
    public const ZIP_DEFLATE = 'DEF';
    public const MAX_INFLATED_BYTES = 2097152;
    public const INPUT_CHUNK_BYTES = 64;

    public const OK = 'ok';
    public const ZIP_UNSUPPORTED = 'zip_unsupported';
    public const INFLATE_FAILED = 'inflate_failed';
    public const INFLATE_OVER_CAP = 'inflate_over_cap';
    public const PAYLOAD_NOT_JSON = 'payload_not_json';

    /** Whether the header declares any `zip` (if it does, every failure means "not usable"). */
    public static function declaresZip(array $header): bool
    {
        return array_key_exists('zip', $header);
    }

    /**
     * @param array  $header       Parsed protected header.
     * @param string $payloadBytes Payload segment after base64url decoding (the signed bytes).
     * @return array{0:string,1:?array} [OK or reason, payload or null]
     */
    public static function decode(array $header, string $payloadBytes): array
    {
        $json = $payloadBytes;
        if (self::declaresZip($header)) {
            if ($header['zip'] !== self::ZIP_DEFLATE) {
                return [self::ZIP_UNSUPPORTED, null];
            }
            [$status, $inflated] = self::inflateCapped($payloadBytes);
            if ($status !== self::OK) {
                return [$status, null];
            }
            $json = (string) $inflated;
        }

        // A JSON object (not a list or a scalar): it starts with '{'.
        $trimmed = ltrim($json);
        $payload = json_decode($json, true);
        if (!is_array($payload) || $trimmed === '' || $trimmed[0] !== '{') {
            return [self::PAYLOAD_NOT_JSON, null];
        }

        return [self::OK, $payload];
    }

    /**
     * `validUntil` of the payload in unix seconds, or null if missing or
     * unreadable. The server always emits it as an ISO-8601 string: any other
     * type (number, list, object, null, boolean), an empty string, or one that
     * `strtotime` cannot parse counts as unreadable. Same rule as the
     * PrestaShop module (`SnapshotPayloadDecoder::validUntil`).
     */
    public static function validUntil(array $payload): ?int
    {
        $raw = $payload['validUntil'] ?? null;
        if (!is_string($raw) || trim($raw) === '') {
            return null;
        }
        $ts = strtotime($raw);

        return $ts === false ? null : $ts;
    }

    /**
     * Whether the snapshot can be used at this time. A snapshot signed by our
     * server ALWAYS carries `validUntil`: missing or unreadable means a
     * malformed payload and it is classified like an expired one ("unavailable",
     * NOT tampered, since the signature verified). A `validUntil` in the past is
     * not usable either.
     */
    public static function isUsable(array $payload, int $now): bool
    {
        $until = self::validUntil($payload);

        return $until !== null && $until > $now;
    }

    /** @return array{0:string,1:?string} */
    private static function inflateCapped(string $bytes): array
    {
        if ($bytes === '' || !function_exists('inflate_init')) {
            return [self::INFLATE_FAILED, null];
        }
        $ctx = @inflate_init(ZLIB_ENCODING_RAW);
        if ($ctx === false) {
            return [self::INFLATE_FAILED, null];
        }
        $out = '';
        $len = strlen($bytes);
        for ($off = 0; $off < $len; $off += self::INPUT_CHUNK_BYTES) {
            $chunk = @inflate_add($ctx, substr($bytes, $off, self::INPUT_CHUNK_BYTES), ZLIB_SYNC_FLUSH);
            if ($chunk === false) {
                return [self::INFLATE_FAILED, null];
            }
            $out .= $chunk;
            if (strlen($out) > self::MAX_INFLATED_BYTES) {
                return [self::INFLATE_OVER_CAP, null];
            }
            if (inflate_get_status($ctx) === ZLIB_STREAM_END) {
                break;
            }
        }
        if (inflate_get_status($ctx) !== ZLIB_STREAM_END) {
            return [self::INFLATE_FAILED, null];
        }

        return [self::OK, $out];
    }
}
