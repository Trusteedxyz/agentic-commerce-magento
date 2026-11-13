<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Security;

/**
 * Single canonical signer for the MCPWebStore internal Magento API surface.
 *
 * M4 (audit 2026-06-01): the internal `/api/v1/internal/magento/*` endpoints
 * were signed with two divergent schemes — the analytics event sink + manifest
 * sign endpoint used the canonical
 * `method\npath\nsortedQuery\nts\nsha256hex(rawBody)` HMAC over
 * `internal_hmac_secret`, while `Cron/EmitLagHeartbeat` used a weaker bare
 * `HMAC(rawBody)` scheme with non-canonical headers. The backend has now
 * UNIFIED the lag-heartbeat verifier onto the canonical scheme
 * ({@see apps/api/src/routes/internal-magento-event.routes.ts
 * `requireMagentoInternalHmac`}), so the PHP side MUST emit a single canonical
 * signature for every internal endpoint or production heartbeats 401 after
 * deploy.
 *
 * This class is the ONE authoritative implementation. It is intentionally
 * dependency-free (no Magento framework symbols) so it can be unit-tested as a
 * pure function and reused by every internal caller
 * ({@see \Trusteed\AgenticCommerce\Cron\EmitLagHeartbeat},
 *  {@see \Trusteed\AgenticCommerce\Setup\Patch\Data\EmitInstallEvent},
 *  {@see \Trusteed\AgenticCommerce\Model\Manifest\Builder}).
 *
 * Canonical signing string (MUST byte-for-byte match the backend verifier):
 *
 *     signing_string = method               "\n"
 *                    || path                 "\n"   (URL path, e.g. /api/v1/internal/magento/lag-heartbeat)
 *                    || sortedQuery          "\n"   (lexicographically sorted query, or "" when none)
 *                    || timestamp_unix_secs  "\n"
 *                    || sha256_hex(rawBodyBytes)
 *
 *     signature      = HMAC-SHA256(internal_hmac_secret, signing_string)
 *
 * The signed body bytes MUST equal the exact JSON bytes sent on the wire.
 */
class InternalHmacSigner
{
    /** Etiqueta de la derivación de la clave por conexión (común con la API). */
    public const KEY_DERIVATION_LABEL = 'trusteed-internal-hmac-v1';

    /** Header carrying the MagentoStoreConnection id (authoritative identity). */
    public const HEADER_CONNECTION_ID = 'X-Trusteed-Connection-Id';

    /** Header carrying the unix-seconds timestamp (±300s freshness window). */
    public const HEADER_TIMESTAMP = 'X-Trusteed-Timestamp';

    /** Header carrying the canonical signature: `hmac-sha256=<hex>`. */
    public const HEADER_SIGNATURE = 'X-Trusteed-Signature';

    /**
     * Clave HMAC interna POR CONEXIÓN: HMAC-SHA256 de una etiqueta fija con el `webhook_secret` de
     * la conexión como CLAVE (tercer argumento de hash_hmac). Es el HEX de 64 caracteres, como
     * CADENA, el secreto con el que se firma después. Idéntico byte a byte a la derivación de la API
     * (vector común en specs/050-magento-integration/fixtures/internal-hmac-key-derivation.json).
     */
    public function deriveConnectionKey(string $webhookSecret): string
    {
        return hash_hmac('sha256', self::KEY_DERIVATION_LABEL, $webhookSecret);
    }

    /**
     * Compute the canonical HMAC-SHA256 signature (lowercase hex) for a request.
     *
     * @param string $secret      The decrypted `internal_hmac_secret`.
     * @param string $method      HTTP method, e.g. "POST".
     * @param string $path        URL path only (no scheme/host/query), e.g.
     *                            "/api/v1/internal/magento/lag-heartbeat".
     * @param string $rawBody     The exact request body bytes that will be sent.
     * @param string $timestamp   Unix-seconds timestamp as a string (the SAME
     *                            value placed in the X-Trusteed-Timestamp header).
     * @param string $sortedQuery Lexicographically sorted query string, or "" when
     *                            the request has no query (the common case here).
     */
    public function sign(
        string $secret,
        string $method,
        string $path,
        string $rawBody,
        string $timestamp,
        string $sortedQuery = ''
    ): string {
        $bodySha = hash('sha256', $rawBody);
        $signingString = $method . "\n"
            . $path . "\n"
            . $sortedQuery . "\n"
            . $timestamp . "\n"
            . $bodySha;

        return hash_hmac('sha256', $signingString, $secret);
    }

    /**
     * Build the canonical authentication headers for an internal request.
     *
     * Returns the connection-id, timestamp and `hmac-sha256=<hex>` signature
     * headers ready to pass to the cURL client. The body/timestamp used here MUST
     * be the exact same values handed to the transport.
     *
     * @return array<string,string>
     */
    public function buildHeaders(
        string $secret,
        string $connectionId,
        string $method,
        string $path,
        string $rawBody,
        string $timestamp,
        string $sortedQuery = ''
    ): array {
        $signature = $this->sign($secret, $method, $path, $rawBody, $timestamp, $sortedQuery);

        return [
            self::HEADER_CONNECTION_ID => $connectionId,
            self::HEADER_TIMESTAMP => $timestamp,
            self::HEADER_SIGNATURE => 'hmac-sha256=' . $signature,
        ];
    }
}
