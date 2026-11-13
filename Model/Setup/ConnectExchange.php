<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Setup;

/**
 * Contrato del canje del connect_token con la API de Trusteed
 * (`POST /api/v1/platform/magento/validate-connect-token`).
 *
 * Puro y sin dependencias de Magento para poder probarlo en unitarios: lo que la
 * API exige (store_url https, store_id, integration_token) y la ruta con su
 * prefijo `/api/v1` ya fallaron en silencio una vez (404 / 400 en producción).
 */
final class ConnectExchange
{
    private const PATH = '/platform/magento/validate-connect-token';
    private const API_PREFIX = '/api/v1';
    private const PROVISION_PATH = '/enforcement/installations/provision';

    public static function endpoint(string $apiBase): string
    {
        $base = rtrim($apiBase, '/');
        if (!str_ends_with($base, self::API_PREFIX)) {
            $base .= self::API_PREFIX;
        }

        return $base . self::PATH;
    }

    /**
     * @param list<string> $storeViewCodes
     * @return array<string, mixed>
     */
    public static function body(
        string $connectToken,
        string $storeUrl,
        string $storeId,
        string $integrationToken,
        array $storeViewCodes,
        string $currency
    ): array {
        $body = [
            'connect_token' => $connectToken,
            'store_url' => rtrim($storeUrl, '/'),
            'store_id' => $storeId,
            'integration_token' => $integrationToken,
            'store_view_codes' => array_values($storeViewCodes),
        ];
        if (preg_match('/^[A-Za-z]{3}$/', $currency) === 1) {
            $body['currency'] = $currency;
        }

        return $body;
    }

    /** POST que entrega el Installation ID y el secreto HMAC del enforcement. */
    public static function provisionEndpoint(string $apiBase): string
    {
        $base = rtrim($apiBase, '/');
        if (!str_ends_with($base, self::API_PREFIX)) {
            $base .= self::API_PREFIX;
        }

        return $base . self::PROVISION_PATH;
    }

    /**
     * `merchantId` es el id de la TIENDA en Trusteed (el `store_id` del canje), no el del
     * comerciante: con éste la API responde 401 como si el secreto fuera erróneo.
     *
     * @return array<string, string>
     */
    public static function provisionBody(string $trusteedStoreId, string $connectionId): array
    {
        return [
            'merchantId' => $trusteedStoreId,
            'platform' => 'MAGENTO',
            'connectionId' => $connectionId,
        ];
    }

    /**
     * Lee la respuesta de la provisión. Sólo vale un 201 con un UUID de instalación y un
     * secreto no vacío; cualquier otra cosa devuelve null (la conexión sigue válida, pero
     * el enforcement queda sin credenciales y el módulo lo avisa).
     *
     * @return array{installation_id: string, hmac_secret: string}|null
     */
    public static function parseProvision(int $status, string $rawBody): ?array
    {
        if ($status !== 201) {
            return null;
        }
        $decoded = json_decode($rawBody, true);
        if (!is_array($decoded)) {
            return null;
        }
        $id = trim((string)($decoded['installationId'] ?? ''));
        $secret = (string)($decoded['hmacSecret'] ?? '');
        $uuid = '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i';
        if (preg_match($uuid, $id) !== 1 || $secret === '') {
            return null;
        }

        return ['installation_id' => $id, 'hmac_secret' => $secret];
    }

    /**
     * La API responde 200 con `{valid:false, error}` cuando rechaza el canje; sin
     * esto el comerciante veía «did not return the expected connection
     * credentials», que no dice qué hacer.
     */
    public static function refusalMessage(string $code): string
    {
        return match ($code) {
            'token_invalid_or_expired' =>
                'The connection code has expired or was already used. Click «Connect with Trusteed» again.',
            'store_url_owned_by_another_merchant' =>
                'This store URL is already connected to another Trusteed account. Sign in with that account, or contact support.',
            'invalid_store_url' => 'The store URL must be https and publicly reachable.',
            '' => 'Trusteed refused the connection without a reason. Try again or contact support.',
            default => 'Trusteed refused the connection (' . $code . ').',
        };
    }
}
