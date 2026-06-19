<?php
declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Token;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Backend\Model\Auth\Session as AuthSession;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\ResultInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Server-to-server relay that issues a Trusteed embed access token for the admin SPA.
 *
 * The per-connection embed secret is read from system config (encrypted) and is
 * NEVER serialized into the response — only the short-lived access token +
 * expires_at are returned to the browser. The jti is intentionally stripped from
 * the relayed response.
 */
class Issue extends Action implements HttpPostActionInterface
{
    public const ADMIN_RESOURCE = 'Trusteed_AgenticCommerce::token';

    private const DEFAULT_API_BASE = 'https://api.trusteed.xyz';
    private const ENDPOINT_PATH = '/v1/embed/magento/issue-token';
    private const TIMEOUT_SECONDS = 10;

    // Reuse the connector wizard values so Paco never sees a duplicate config UI.
    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';

    /**
     * Per-connection embed secret provisioned by the onboarding exchange
     * (POST /platform/magento/validate-connect-token → embed_secret) and stored
     * ENCRYPTED in config by Setup\Save. The backend embed route validates the
     * X-Embed-Magento-Secret header against the per-connection embed_secret held
     * in its SecretVault (keyed by connection_id) — NOT a global env value, and
     * NOT the integration_token (which is the webhook bearer/HMAC, a different
     * secret with a different purpose).
     */
    private const CONFIG_EMBED_SECRET = 'trusteed_general/general/embed_secret';

    public function __construct(
        Context $context,
        private readonly JsonFactory $resultJsonFactory,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly SecretReader $secretReader,
        private readonly Curl $curl,
        private readonly AuthSession $authSession,
        private readonly LoggerInterface $logger,
        private readonly ApiBaseUrlValidator $urlValidator
    ) {
        parent::__construct($context);
    }

    protected function _isAllowed(): bool
    {
        return $this->_authorization->isAllowed(self::ADMIN_RESOURCE);
    }

    public function execute(): ResultInterface
    {
        $result = $this->resultJsonFactory->create();

        $merchantId = (string) ($this->scopeConfig->getValue(
            self::CONFIG_MERCHANT_ID,
            ScopeInterface::SCOPE_STORE
        ) ?? '');

        $apiBase = (string) ($this->scopeConfig->getValue(
            self::CONFIG_API_BASE,
            ScopeInterface::SCOPE_STORE
        ) ?? self::DEFAULT_API_BASE);
        $apiBase = rtrim($apiBase, '/');
        if ($apiBase === '') {
            $apiBase = self::DEFAULT_API_BASE;
        }

        $embedSecret = $this->secretReader->read(
            self::CONFIG_EMBED_SECRET,
            ScopeInterface::SCOPE_STORE
        );

        if ($merchantId === '' || $embedSecret === '') {
            return $result
                ->setHttpResponseCode(503)
                ->setData(['error' => 'embed_not_configured']);
        }

        $adminUser = $this->authSession->getUser();
        $adminId = $adminUser ? (int) $adminUser->getId() : 0;
        if ($adminId <= 0) {
            return $result
                ->setHttpResponseCode(401)
                ->setData(['error' => 'admin_session_missing']);
        }

        // SSRF guard: the S2S secret (X-Embed-Magento-Secret) must only ever be
        // POSTed to an allowlisted/sealed host. Mirrors IntrospectToken so a
        // tampered `api_base_url` (admin CSRF / stored XSS / supply-chain) cannot
        // exfiltrate the secret to an attacker-controlled endpoint.
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[Trusteed][embed-token] SSRF guard rejected api_base_url', [
                'host' => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return $result
                ->setHttpResponseCode(400)
                ->setData(['error' => 'api_base_url_not_allowed']);
        }

        $payload = [
            'merchant_id' => $merchantId,
            'magento_admin_id' => (string) $adminId,
            'capability_attestation' => 'admin_trusteed',
        ];
        $body = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

        try {
            // Defence in depth: re-assert HTTPS before posting the secret.
            $endpoint = $apiBase . self::ENDPOINT_PATH;
            if (!str_starts_with($endpoint, 'https://')) {
                throw new \RuntimeException('Embed token endpoint must be HTTPS');
            }

            $this->curl->setOption(CURLOPT_RETURNTRANSFER, true);
            $this->curl->setOption(CURLOPT_TIMEOUT, self::TIMEOUT_SECONDS);
            $this->curl->setOption(CURLOPT_CONNECTTIMEOUT, self::TIMEOUT_SECONDS);
            $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
            $this->curl->setOption(CURLOPT_MAXREDIRS, 0);
            $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
            $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
            $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'X-Embed-Magento-Secret' => $embedSecret,
            ]);
            $this->curl->post($endpoint, $body);

            $status = (int) $this->curl->getStatus();
            $rawResponse = (string) $this->curl->getBody();
        } catch (\Throwable $e) {
            $this->logger->error('[Trusteed][embed-token] relay transport failure', [
                'exception' => $e->getMessage(),
            ]);
            return $result
                ->setHttpResponseCode(502)
                ->setData(['error' => 'embed_relay_unreachable']);
        }

        if ($status < 200 || $status >= 300) {
            $this->logger->warning('[Trusteed][embed-token] relay non-2xx', [
                'status' => $status,
            ]);
            return $result
                ->setHttpResponseCode($status >= 400 && $status < 600 ? $status : 502)
                ->setData(['error' => 'embed_relay_failed']);
        }

        try {
            $decoded = json_decode($rawResponse, true, 8, JSON_THROW_ON_ERROR);
        } catch (\Throwable $e) {
            $this->logger->error('[Trusteed][embed-token] invalid JSON from relay', [
                'exception' => $e->getMessage(),
            ]);
            return $result
                ->setHttpResponseCode(502)
                ->setData(['error' => 'embed_relay_invalid_response']);
        }

        if (!is_array($decoded) || empty($decoded['token']) || empty($decoded['expires_at'])) {
            return $result
                ->setHttpResponseCode(502)
                ->setData(['error' => 'embed_relay_invalid_response']);
        }

        // Intentionally strip jti — only token + expires_at reach the browser.
        return $result->setData([
            'token' => (string) $decoded['token'],
            'expires_at' => (string) $decoded['expires_at'],
        ]);
    }
}
