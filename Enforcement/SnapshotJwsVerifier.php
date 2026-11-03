<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Verifica el JWS del snapshot de reglas y dice POR QUÉ no se puede usar
 * (Task 23b, puntos 1 y 3; referencia `decideOnDegradedEnforcement`).
 *
 * Antes `EnforcementClient::verifyAndDecode()` devolvía null para todo: un
 * snapshot manipulado, un JWKS caído y la falta de `sodium` acababan igual,
 * como «sin snapshot», y un agente decidía por el modo. Ahora:
 *
 * - `ok`: la firma verifica contra el JWKS de la plataforma y el payload se lee.
 * - `tampered`: el JWS servido no verifica ni tras volver a descargar el JWKS
 *   UNA vez saltándose la caché de la petición (una rotación de clave no es
 *   manipulación); también un JWS malformado o con `alg` distinto de EdDSA.
 * - `unavailable`: no se puede decidir (sin `sodium`, JWKS vacío o
 *   inalcanzable, también en el reintento, excepción de `sodium`) o la firma
 *   es AUTÉNTICA pero el payload no se puede leer: no es manipulación. Desde
 *   la Task 24 un payload `zip: DEF` se infla con tope
 *   ({@see SnapshotPayloadDecoder}); sólo un `zip` desconocido, una bomba o un
 *   flujo roto quedan como no disponibles. Task 38b: también un `validUntil`
 *   ausente o ilegible (`valid_until_missing` / `valid_until_unreadable`).
 *
 * Sin I/O propia: el JWKS lo trae el llamante con `$fetchJwks(bool $force)`,
 * que devuelve `kid => clave Ed25519 en bruto` (vacío = no disponible). Task
 * 29c: una cabecera con `crit` (RFC 7515) se rechaza, y el veredicto del
 * reintento forzado se recuerda 60 s ({@see JwksRetryVerdictStore}).
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
     * @param JwksRetryVerdictStore|null           $retryVerdicts Caché negativa del reintento forzado (L3).
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
        // L6c (RFC 7515 §4.1.11): `crit` exige entender extensiones que no
        // entendemos ni emite el firmante.
        if (array_key_exists('crit', $header)) {
            return self::outcome(self::TAMPERED, null, 'crit_header');
        }

        $check = self::checkSignature($header['kid'], "{$headerB64}.{$payloadB64}", $sigB64, $fetchJwks(false));
        if ($check === 'mismatch') {
            // L3: ya se reintentó hace menos de un minuto con este `kid` y no
            // verificó: se clasifica con lo sabido, sin otra descarga.
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

        // Sólo tras verificar la firma: inflar (si `zip`) con tope y leer (Task 24).
        $payloadBytes = self::b64urlDecode($payloadB64);
        [$decoded, $payload] = SnapshotPayloadDecoder::decode($header, $payloadBytes === false ? '' : $payloadBytes);
        if ($decoded !== SnapshotPayloadDecoder::OK) {
            $detail = SnapshotPayloadDecoder::declaresZip($header) ? 'payload_' . $decoded : 'payload_unreadable';
            return self::outcome(self::UNAVAILABLE, null, $detail);
        }
        // Task 38b (1): nuestro servidor siempre firma `validUntil`; sin él (o ilegible) el
        // snapshot no se puede tratar como vigente. No es manipulación: la firma verificó.
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
