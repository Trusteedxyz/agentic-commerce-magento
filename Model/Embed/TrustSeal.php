<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Embed;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Sello de confianza del comercio (clave de firma): estado y activación.
 *
 * Es la MISMA llamada que usan WooCommerce y PrestaShop desde el Inicio de su panel:
 * `GET /v1/embed/trust/keys` (404 `no_active_key` = sin sello) y
 * `POST /v1/embed/trust/keys/activate` (idempotente), autenticadas con el token efímero de
 * `/v1/embed/magento/issue-token` (cabeceras `Authorization: Bearer` + `X-Embed-Source: magento-embed`).
 * La activación es una ACCIÓN EXPLÍCITA del comerciante: el módulo nunca la dispara solo.
 */
class TrustSeal
{
    public const STATE_ACTIVE = 'active';
    public const STATE_INACTIVE = 'inactive';
    public const STATE_UNKNOWN = 'unknown';

    private const DEFAULT_API_BASE = 'https://api.trusteed.xyz';
    private const TIMEOUT_SECONDS = 10;
    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_CONNECTION_ID = 'trusteed_general/general/connection_id';
    private const CONFIG_EMBED_SECRET = 'trusteed_general/general/embed_secret';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly SecretReader $secretReader,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
        private readonly ApiBaseUrlValidator $urlValidator
    ) {
    }

    /** Estado del sello: `active`, `inactive` (404 no_active_key) o `unknown` (cualquier fallo). */
    public function state(int $adminId): string
    {
        $res = $this->call('GET', '/v1/embed/trust/keys', $adminId);

        return $res === null ? self::STATE_UNKNOWN : self::parseState($res['status'], $res['body']);
    }

    /** @return array{ok: bool, kid: string|null, error: string|null} */
    public function activate(int $adminId): array
    {
        $res = $this->call('POST', '/v1/embed/trust/keys/activate', $adminId);

        return $res === null
            ? ['ok' => false, 'kid' => null, 'error' => 'unreachable']
            : self::parseActivation($res['status'], $res['body']);
    }

    /** Una respuesta de `GET trust/keys`: 200 con `activeKid` = activo; 404 = sin sello; el resto, desconocido. */
    public static function parseState(int $status, string $body): string
    {
        $decoded = json_decode($body, true);
        if ($status === 200 && is_array($decoded) && !empty($decoded['activeKid'])) {
            return self::STATE_ACTIVE;
        }
        if ($status === 404 && is_array($decoded) && ($decoded['error'] ?? '') === 'no_active_key') {
            return self::STATE_INACTIVE;
        }

        return self::STATE_UNKNOWN;
    }

    /**
     * Una respuesta de `POST trust/keys/activate`: 201 (creada) o 200 (ya estaba) con `kid`.
     *
     * @return array{ok: bool, kid: string|null, error: string|null}
     */
    public static function parseActivation(int $status, string $body): array
    {
        $decoded = json_decode($body, true);
        $kid = is_array($decoded) ? trim((string)($decoded['kid'] ?? '')) : '';
        if (($status === 200 || $status === 201) && $kid !== '') {
            return ['ok' => true, 'kid' => $kid, 'error' => null];
        }

        return ['ok' => false, 'kid' => null, 'error' => 'http_' . $status];
    }

    /**
     * Qué clave de texto de «Todos los pedidos están firmados» corresponde a cada estado: la frase
     * solo se afirma con el sello activo (no se puede prometer la firma de lo que aún no se firma).
     */
    public static function guaranteeKey(string $state): string
    {
        return $state === self::STATE_ACTIVE ? 'signed' : 'pending';
    }

    /** @return array{status: int, body: string}|null */
    private function call(string $method, string $path, int $adminId): ?array
    {
        try {
            $token = $this->issueToken($adminId);
            if ($token === null) {
                return null;
            }
            $headers = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
                'X-Embed-Source' => 'magento-embed',
            ];
            $this->prepareCurl();
            $this->curl->setHeaders($headers);
            if ($method === 'POST') {
                $this->curl->addHeader('Content-Type', 'application/json');
                $this->curl->post($this->apiBase() . $path, '{}');
            } else {
                $this->curl->get($this->apiBase() . $path);
            }

            return ['status' => (int)$this->curl->getStatus(), 'body' => (string)$this->curl->getBody()];
        } catch (\Throwable $e) {
            $this->logger->warning('[Trusteed][trust-seal] request failed', ['exception' => $e->getMessage(), 'path' => $path]);

            return null;
        }
    }

    private function issueToken(int $adminId): ?string
    {
        $merchantId = (string)($this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID, ScopeInterface::SCOPE_STORE) ?? '');
        $connectionId = trim((string)($this->scopeConfig->getValue(self::CONFIG_CONNECTION_ID, ScopeInterface::SCOPE_STORE) ?? ''));
        $embedSecret = $this->secretReader->read(self::CONFIG_EMBED_SECRET, ScopeInterface::SCOPE_STORE);
        if ($merchantId === '' || $embedSecret === '' || $adminId <= 0) {
            return null;
        }
        $this->prepareCurl();
        $this->curl->setHeaders([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-Embed-Magento-Secret' => $embedSecret,
        ]);
        $this->curl->post($this->apiBase() . '/v1/embed/magento/issue-token', (string)json_encode([
            'merchant_id' => $merchantId,
            'magento_admin_id' => (string)$adminId,
            'capability_attestation' => 'admin_trusteed',
            ...($connectionId !== '' ? ['connection_id' => $connectionId] : []),
        ], JSON_UNESCAPED_SLASHES));
        $decoded = json_decode((string)$this->curl->getBody(), true);

        return (int)$this->curl->getStatus() === 200 && is_array($decoded) && !empty($decoded['token'])
            ? (string)$decoded['token']
            : null;
    }

    private function apiBase(): string
    {
        $base = rtrim((string)($this->scopeConfig->getValue(self::CONFIG_API_BASE, ScopeInterface::SCOPE_STORE) ?: self::DEFAULT_API_BASE), '/');
        $authz = $this->urlValidator->isAuthorized($base);
        if (!$authz['authorized'] || !str_starts_with($base, 'https://')) {
            throw new \RuntimeException('api_base_url_not_allowed');
        }

        return $base;
    }

    private function prepareCurl(): void
    {
        $this->curl->setOption(CURLOPT_RETURNTRANSFER, true);
        $this->curl->setOption(CURLOPT_TIMEOUT, self::TIMEOUT_SECONDS);
        $this->curl->setOption(CURLOPT_CONNECTTIMEOUT, self::TIMEOUT_SECONDS);
        $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
        $this->curl->setOption(CURLOPT_MAXREDIRS, 0);
        $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
        $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
    }
}
