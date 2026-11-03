<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Payload del snapshot firmado — decodificación TRAS verificar la firma
 * (plan 04 de reglas de checkout, Task 24). Lo usa {@see SnapshotJwsVerifier}.
 *
 * El servidor comprime con DEFLATE crudo (RFC 1951) todo snapshot cuyo JSON
 * pasa de 50 KB y lo marca con `zip: "DEF"` en la cabecera protegida. La firma
 * cubre los bytes COMPRIMIDOS, así que el orden es: verificar la firma sobre
 * lo recibido y, sólo si verifica, llamar aquí. Nunca se infla antes.
 *
 * Contrato (sección `compressedSnapshot` de
 * `packages/shared/src/enforcement/__fixtures__/platform-flow-conformance.json`):
 * - sin `zip` ⇒ el payload es el JSON tal cual;
 * - `zip` === 'DEF' exacto ⇒ inflar con tope de {@see MAX_INFLATED_BYTES};
 * - cualquier otro `zip`, flujo corrupto/truncado/vacío, pasar del tope o una
 *   salida que no sea un objeto JSON ⇒ no utilizable.
 *
 * Anti-bomba: `inflate_init(ZLIB_ENCODING_RAW)` + `inflate_add` alimentado de
 * {@see INPUT_CHUNK_BYTES} en {@see INPUT_CHUNK_BYTES} bytes. DEFLATE no
 * expande más de ~1032:1, así que cada paso produce como mucho ~66 KB y la
 * salida acumulada se compara con el tope tras cada paso: la memoria nunca
 * pasa del tope más un paso, por grande que sea lo que la bomba declara.
 * (`gzinflate($d, $max)` no sirve: su límite es aproximado —devuelve un byte
 * más del tope— y no distingue bomba de flujo corrupto.)
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

    /** ¿Declara la cabecera algún `zip`? (con él, todo fallo es «no utilizable»). */
    public static function declaresZip(array $header): bool
    {
        return array_key_exists('zip', $header);
    }

    /**
     * @param array  $header       Cabecera protegida ya parseada.
     * @param string $payloadBytes Segmento payload tras base64url (lo firmado).
     * @return array{0:string,1:?array} [OK o motivo, payload o null]
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

        // Un objeto JSON (no una lista ni un escalar): empieza por '{'.
        $trimmed = ltrim($json);
        $payload = json_decode($json, true);
        if (!is_array($payload) || $trimmed === '' || $trimmed[0] !== '{') {
            return [self::PAYLOAD_NOT_JSON, null];
        }

        return [self::OK, $payload];
    }

    /**
     * `validUntil` del payload en segundos unix, o null si falta o no se lee.
     * El servidor lo emite siempre como cadena ISO-8601: cualquier otro tipo
     * (número, lista, objeto, null, booleano) o una cadena vacía o que
     * `strtotime` no entiende es «ilegible». Misma regla que el módulo de
     * PrestaShop (`SnapshotPayloadDecoder::validUntil`).
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
     * Task 38b (1) — ¿se puede usar el snapshot a esta hora? Un snapshot firmado
     * por nuestro servidor SIEMPRE lleva `validUntil`: ausente o ilegible es un
     * payload malformado y se clasifica como el caducado («no disponible»; NO
     * manipulado: la firma verificó). Un `validUntil` ya pasado tampoco sirve.
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
