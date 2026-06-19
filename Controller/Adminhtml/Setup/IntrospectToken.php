<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Setup;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Backend\Model\Auth\Session as AuthSession;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * POST trusteed/setup/introspectToken
 *
 * Validates an integration token against MCPWebStore before wizard save:
 *   - Token must have scope 'magento:store:write'
 *   - If merchant_id already configured, token merchant_id must match
 *   - Master/admin tokens (scope 'admin' present) are rejected
 *
 * Security hardening (Spec 050 SSRF closure 2026-05-26):
 *   - Host allowlist is exact-match (no wildcard suffix). See {@see ApiBaseUrlValidator}.
 *   - Self-hosted deployments require sha256(host) sealed at config save time;
 *     mismatch ⇒ reject (detects post-save admin tampering / CSRF / stored XSS).
 *   - cURL with strict TLS verify, no redirects (`CURLOPT_FOLLOWLOCATION=0`),
 *     HTTPS-only protocols, 5s timeout, no HTTP downgrade.
 *   - Every call is audit-logged with {adminUserId, hostUsed, outcome}.
 *
 * Spec 050 T063, FR-A-002.
 */
class IntrospectToken extends Action implements HttpPostActionInterface
{
    private const RESOURCE = 'Trusteed_AgenticCommerce::config';
    private const INTROSPECT_PATH = '/api/v1/auth/introspect';
    private const REQUIRED_SCOPE = 'magento:store:write';
    private const FORBIDDEN_SCOPE = 'admin';
    private const REQUEST_TIMEOUT_SECONDS = 5;

    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';

    public function __construct(
        Context $context,
        private readonly JsonFactory $jsonFactory,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly ApiBaseUrlValidator $urlValidator,
        private readonly Curl $curl,
        private readonly ?AuthSession $authSession = null,
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

        $body = (string)$this->getRequest()->getContent();
        $data = json_decode($body, true);

        if (!is_array($data)) {
            return $result->setData(['valid' => false, 'error' => 'invalid_request']);
        }

        $token = trim((string)($data['token'] ?? ''));
        $merchantIdFromRequest = trim((string)($data['merchant_id'] ?? ''));
        $apiBaseUrl = rtrim(trim((string)($data['api_base_url'] ?? '')), '/');

        if ($token === '' || $apiBaseUrl === '') {
            return $result->setData(['valid' => false, 'error' => 'missing_fields']);
        }

        $authz = $this->urlValidator->isAuthorized($apiBaseUrl);
        if (!$authz['authorized']) {
            $this->auditLog($authz['host'], $authz['outcome']);
            $this->logger->warning('IntrospectToken: SSRF guard rejected URL', [
                'url' => $apiBaseUrl,
                'outcome' => $authz['outcome'],
            ]);
            return $result->setData(['valid' => false, 'error' => 'url_not_allowed']);
        }

        $introspectUrl = $apiBaseUrl . self::INTROSPECT_PATH;

        try {
            $response = $this->callIntrospect($introspectUrl, $token);
        } catch (\Throwable $e) {
            $this->auditLog($authz['host'], 'token_introspect_failed');
            $this->logger->error('Token introspection failed', [
                'error' => $e->getMessage(),
                'host' => $authz['host'],
            ]);
            return $result->setData(['valid' => false, 'error' => 'token_introspect_failed']);
        }

        $scopes = $response['scopes'] ?? [];
        if (in_array(self::FORBIDDEN_SCOPE, $scopes, true)) {
            $this->auditLog($authz['host'], 'master_token_rejected');
            return $result->setData(['valid' => false, 'error' => 'master_token_rejected']);
        }

        if (!in_array(self::REQUIRED_SCOPE, $scopes, true)) {
            $this->auditLog($authz['host'], 'scope_missing');
            return $result->setData(['valid' => false, 'error' => 'scope_missing']);
        }

        $responseMerchantId = (string)($response['merchant_id'] ?? '');
        $configuredMerchantId = (string)$this->scopeConfig->getValue(
            self::CONFIG_MERCHANT_ID,
            ScopeInterface::SCOPE_STORE
        );
        $checkMerchantId = $merchantIdFromRequest !== '' ? $merchantIdFromRequest : $configuredMerchantId;

        if ($checkMerchantId !== '' && $responseMerchantId !== '' && $responseMerchantId !== $checkMerchantId) {
            $this->auditLog($authz['host'], 'merchant_id_mismatch');
            return $result->setData(['valid' => false, 'error' => 'merchant_id_mismatch']);
        }

        $this->auditLog($authz['host'], 'ok');

        return $result->setData([
            'valid' => true,
            'merchant_id' => $responseMerchantId,
        ]);
    }

    /**
     * Strict cURL call: HTTPS-only, peer/host verify, no redirects, 5s timeout.
     *
     * @return array<string, mixed>
     */
    private function callIntrospect(string $url, string $token): array
    {
        // Defence in depth: re-assert HTTPS before invoking cURL.
        if (!str_starts_with($url, 'https://')) {
            throw new \RuntimeException('Introspect URL must be HTTPS');
        }

        $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
        $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
        $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        $this->curl->setOption(CURLOPT_CONNECTTIMEOUT, self::REQUEST_TIMEOUT_SECONDS);
        $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_MAXREDIRS, 0);
        $this->curl->setTimeout(self::REQUEST_TIMEOUT_SECONDS);

        $this->curl->addHeader('Content-Type', 'application/json');
        $this->curl->addHeader('Accept', 'application/json');
        $this->curl->addHeader('Authorization', 'Bearer ' . $token);

        $this->curl->post($url, (string)json_encode(['token' => $token]));

        $status = $this->curl->getStatus();
        $responseBody = $this->curl->getBody();

        // Any 3xx ⇒ server tried to redirect us (we disabled follow). Reject.
        if ($status >= 300 && $status < 400) {
            throw new \RuntimeException('Introspect endpoint attempted redirect (HTTP ' . $status . ')');
        }
        if ($status < 200 || $status >= 500) {
            throw new \RuntimeException('Introspect endpoint returned HTTP ' . $status);
        }
        if (!is_string($responseBody) || $responseBody === '') {
            throw new \RuntimeException('Introspect endpoint returned empty body');
        }

        $decoded = json_decode($responseBody, true);
        if (!is_array($decoded)) {
            throw new \RuntimeException('Introspect endpoint returned non-JSON response');
        }
        return $decoded;
    }

    private function auditLog(?string $host, string $outcome): void
    {
        $adminUserId = null;
        try {
            if ($this->authSession !== null
                && method_exists($this->authSession, 'getUser')
                && $this->authSession->getUser() !== null) {
                $adminUserId = (int)$this->authSession->getUser()->getId();
            }
        } catch (\Throwable) {
            $adminUserId = null;
        }

        $this->logger->info('IntrospectToken audit', [
            'event' => 'trusteed.introspect_token',
            'adminUserId' => $adminUserId,
            'hostUsed' => $host,
            'outcome' => $outcome,
        ]);
    }
}
