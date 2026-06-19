<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Support;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\Result\Json;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;

/**
 * POST trusteed/support/submit
 *
 * Recibe el formulario de soporte del panel de Magento y lo reenvía a la
 * API de Trusteed (POST /v1/embed/support/report) usando el token de
 * integración configurado en el wizard.
 *
 * Rate limit simple basado en sesión de admin: máximo 3 envíos por hora.
 * Spec: sección "Soporte" en módulo Trusteed_AgenticCommerce.
 */
class Submit extends Action implements HttpPostActionInterface
{
    private const RESOURCE = 'Trusteed_AgenticCommerce::config';

    private const CONFIG_API_BASE         = 'trusteed_general/general/api_base_url';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';

    private const SESSION_COUNT_KEY   = 'trusteed_support_count';
    private const SESSION_WINDOW_KEY  = 'trusteed_support_window';
    private const RATE_LIMIT_MAX      = 3;
    private const RATE_LIMIT_WINDOW   = 3600; // segundos

    public function __construct(
        Context $context,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly JsonFactory $jsonFactory,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader
    ) {
        parent::__construct($context);
    }

    protected function _isAllowed(): bool
    {
        return $this->_authorization->isAllowed(self::RESOURCE);
    }

    public function execute(): Json
    {
        $result = $this->jsonFactory->create();

        // ── Rate limit (sesión de admin) ─────────────────────────────────────
        $session = $this->_session;
        $now     = time();
        $window  = (int)($session->getData(self::SESSION_WINDOW_KEY) ?? 0);
        $count   = (int)($session->getData(self::SESSION_COUNT_KEY)  ?? 0);

        if ($now - $window > self::RATE_LIMIT_WINDOW) {
            $count  = 0;
            $window = $now;
        }

        if ($count >= self::RATE_LIMIT_MAX) {
            return $result->setData([
                'success' => false,
                'error'   => 'Has enviado demasiados tickets recientemente. Espera 1 hora antes de enviar otro.',
            ]);
        }

        // ── Validar entrada ──────────────────────────────────────────────────
        $message = trim((string)$this->getRequest()->getParam('message', ''));

        if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
            return $result->setData([
                'success' => false,
                'error'   => 'El mensaje debe tener entre 10 y 2000 caracteres.',
            ]);
        }

        // ── Configuración de la API ──────────────────────────────────────────
        $apiBase = rtrim(
            (string)($this->scopeConfig->getValue(self::CONFIG_API_BASE) ?? 'https://api.trusteed.xyz'),
            '/'
        );
        $token = $this->secretReader->read(self::CONFIG_INTEGRATION_TOKEN);

        if ($token === '') {
            return $result->setData([
                'success' => false,
                'error'   => 'Tu tienda no tiene token de integración configurado. Completa el wizard de configuración.',
            ]);
        }

        // ── Llamada a la API ─────────────────────────────────────────────────
        $payload = json_encode([
            'platform'   => 'magento',
            'message'    => $message,
            'currentUrl' => $this->getRequest()->getParam('currentUrl', 'unknown'),
            'errorLogs'  => [],
        ]);

        $ch = curl_init($apiBase . '/api/v1/embed/support/report');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $token,
                // Magento embed tokens are minted as wp-embed; the /v1/embed
                // routes only accept shopify-embed/wp-embed/ps-embed sources.
                'X-Embed-Source: wp-embed',
            ],
        ]);

        $body = curl_exec($ch);
        $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err  = curl_error($ch);
        curl_close($ch);

        if ($err !== '' || $body === false) {
            $this->logger->error('Trusteed support submit: curl error', ['error' => $err]);
            return $result->setData([
                'success' => false,
                'error'   => 'No pudimos conectar con el servidor de soporte. Inténtalo de nuevo.',
            ]);
        }

        $decoded = json_decode((string)$body, true);

        if ($http !== 201 || !($decoded['success'] ?? false)) {
            $this->logger->error('Trusteed support submit: API error', ['http' => $http, 'body' => $body]);
            return $result->setData([
                'success' => false,
                'error'   => $decoded['error'] ?? 'Error desconocido al crear el ticket.',
            ]);
        }

        // ── Actualizar contador de rate limit ────────────────────────────────
        $session->setData(self::SESSION_COUNT_KEY, $count + 1);
        $session->setData(self::SESSION_WINDOW_KEY, $window);

        return $result->setData([
            'success'      => true,
            'ticketNumber' => $decoded['ticketNumber'] ?? null,
        ]);
    }
}
