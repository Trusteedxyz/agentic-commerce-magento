<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Setup;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Cache\TypeListInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;
use Magento\Framework\Controller\Result\RedirectFactory;
use Magento\Framework\Controller\Result\Redirect;
use Magento\Framework\Encryption\EncryptorInterface;
use Magento\Framework\HTTP\Client\Curl;
use Trusteed\AgenticCommerce\Model\Manifest\Builder as ManifestBuilder;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;
use Trusteed\AgenticCommerce\Model\Storefront\ThemeDetector;
use Psr\Log\LoggerInterface;

/**
 * POST trusteed/setup/save
 *
 * Persists wizard configuration:
 *   - api_base_url, merchant_id → plain config
 *   - integration_token, webhook_secret → encrypted via EncryptorInterface
 *   - store_view_selection → serialised array
 *
 * Side effects:
 *   - If Hyvä/PWA Studio detected, forces trusteed/webmcp/enabled = 0 and
 *     adds an admin warning message.
 *   - Runs B2B/tier-pricing detection on first 100 products and surfaces
 *     a non-blocking warning if tier prices are found.
 *   - Invalidates the manifest cache to trigger regeneration.
 *
 * Spec 050 T064, FR-A-017, clarification Q3 (magento:store:write scope).
 */
class Save extends Action implements HttpPostActionInterface
{
    private const RESOURCE = 'Trusteed_AgenticCommerce::config';

    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_API_HOST_HASH = ApiBaseUrlValidator::CONFIG_API_HOST_HASH;
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';
    private const CONFIG_WEBHOOK_SECRET = 'trusteed_general/general/webhook_secret';
    private const CONFIG_WEBHOOK_SECRET_VERSION = 'trusteed_general/general/webhook_secret_version';
    private const CONFIG_WEBMCP_ENABLED = 'trusteed_general/features/webmcp_enabled';
    private const CONFIG_STORE_VIEWS = 'trusteed_general/general/store_view_selection';
    private const CONFIG_CONNECTION_ID = 'trusteed_general/general/connection_id';
    private const CONFIG_INTEGRATION_TOKEN_SECRET_ID = 'trusteed_general/general/integration_token_secret_id';
    private const CONFIG_WEBHOOK_SECRET_SECRET_ID = 'trusteed_general/general/webhook_secret_secret_id';
    private const CONFIG_INTERNAL_HMAC_SECRET = 'trusteed_general/general/internal_hmac_secret';

    /**
     * Provisioned embed secret. Persisted ENCRYPTED via EncryptorInterface.
     * Read (decrypted) by Token\Issue and sent as the X-Embed-Magento-Secret
     * header on the server-to-server embed token relay. This is the per-connection
     * embed secret returned by /platform/magento/validate-connect-token — NOT a
     * global env value and NOT the (now removed) integration_token re-use.
     */
    private const CONFIG_EMBED_SECRET = 'trusteed_general/general/embed_secret';

    /**
     * Connect-token exchange contract (cross-platform onboarding):
     *   POST {api_base}/platform/magento/validate-connect-token
     *   body: { "connect_token": "<single-use>" }
     *   200 : { "connection_id", "webhook_secret", "embed_secret" }
     *
     * The backend stores webhook_secret + embed_secret in its SecretVault keyed by
     * connection_id. The module persists connection_id (plain) + webhook_secret +
     * embed_secret (encrypted). The connect_token is single-use and is NEVER
     * persisted as a long-lived secret — it only ever lives in this request.
     */
    private const VALIDATE_CONNECT_TOKEN_PATH = '/platform/magento/validate-connect-token';
    private const EXCHANGE_TIMEOUT_SECONDS = 10;

    /**
     * Enforcement (CEL) credentials. These are READ by EnforcementClient,
     * AgentHistoryFetcher, CheckoutSubmitBefore and SalesOrderPaymentFailedObserver
     * via plain scopeConfig->getValue() (NOT decrypted). They identify and sign
     * requests to POST /v1/rules/evaluate + GET /v1/rules/snapshot.
     *
     * Until the wizard persists them, EnforcementClient::evaluate() short-circuits
     * to unconditional ALLOW (installation_id === '') and enforcement is a silent
     * no-op. Provisioned by Trusteed ops per the cross-platform contract
     * (cf. PrestaShop TRUSTEED_CEL_INSTALLATION_ID / TRUSTEED_CEL_HMAC_SECRET).
     */
    private const CONFIG_ENFORCEMENT_INSTALLATION_ID = 'trusteed/enforcement/installation_id';
    private const CONFIG_ENFORCEMENT_HMAC_SECRET = 'trusteed/enforcement/hmac_secret';

    public function __construct(
        Context $context,
        private readonly WriterInterface $configWriter,
        private readonly EncryptorInterface $encryptor,
        private readonly TypeListInterface $cacheTypeList,
        private readonly ManifestBuilder $manifestBuilder,
        private readonly ThemeDetector $themeDetector,
        private readonly LoggerInterface $logger,
        private readonly ApiBaseUrlValidator $urlValidator,
        private readonly Curl $curl,
    ) {
        parent::__construct($context);
    }

    protected function _isAllowed(): bool
    {
        return $this->_authorization->isAllowed(self::RESOURCE);
    }

    public function execute(): Redirect
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $data = $this->getRequest()->getParams();

        try {
            $this->persistConfig($data);
            $hyvaWarning = $this->applyHyvaGuard();
            $b2bWarning = $this->detectB2bPricing();

            // Invalidate manifest cache so next request regenerates with new config
            $this->manifestBuilder->invalidateCache();
            $this->cacheTypeList->cleanType('config');

            $this->messageManager->addSuccessMessage(__('Trusteed configuration saved successfully.'));

            if ($hyvaWarning) {
                $this->messageManager->addWarningMessage(__(
                    'Hyvä/PWA Studio detected — storefront bridge disabled. '
                    . 'Server-side agent access remains available. '
                    . 'You can manually re-enable the bridge if needed.'
                ));
            }

            if ($b2bWarning !== null) {
                $this->messageManager->addNoticeMessage(__($b2bWarning));
            }
        } catch (\Throwable $e) {
            $this->logger->error('Trusteed config save failed', ['error' => $e->getMessage()]);
            $this->messageManager->addErrorMessage(__('Failed to save configuration: %1', $e->getMessage()));
        }

        return $resultRedirect->setPath('trusteed/setup/wizard');
    }

    private function persistConfig(array $data): void
    {
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT;
        $scopeId = 0;

        $apiBase = !empty($data['api_base_url']) ? rtrim((string)$data['api_base_url'], '/') : 'https://api.trusteed.xyz';

        // SSRF hardening: validate the URL and seal sha256(host) at save time.
        // Any later attempt to introspect a token against a host that does not
        // match the sealed hash (e.g. admin panel CSRF / XSS / supply-chain
        // tampering with `api_base_url`) will be rejected at runtime.
        $validation = $this->urlValidator->validateForSave($apiBase);
        if (!$validation['ok']) {
            $this->logger->warning('Trusteed api_base_url rejected at save', [
                'outcome' => $validation['outcome'],
                'host' => $validation['host'],
            ]);
            throw new \RuntimeException(sprintf(
                'API base URL rejected (%s). Must be HTTPS, resolve to a public IP, and present a valid TLS cert.',
                $validation['outcome']
            ));
        }

        $this->configWriter->save(self::CONFIG_API_BASE, $apiBase, $scope, $scopeId);
        $this->configWriter->save(self::CONFIG_API_HOST_HASH, (string)$validation['hash'], $scope, $scopeId);

        // ── Connect-token exchange (single-use → provisioned secrets) ──────────
        // The wizard hands us a single-use connect_token (NEVER persisted). We
        // exchange it server-side for { connection_id, webhook_secret, embed_secret }
        // and merge those into $data so the persistence below writes the real,
        // long-lived provisioned secrets. A failed exchange throws — execute()
        // surfaces an honest error and nothing fake is written.
        $connectToken = trim((string)($data['connect_token'] ?? ''));
        if ($connectToken !== '') {
            $exchanged = $this->exchangeConnectToken($apiBase, $connectToken);

            $data['connection_id'] = $exchanged['connection_id'];
            $data['webhook_secret'] = $exchanged['webhook_secret'];
            $data['embed_secret'] = $exchanged['embed_secret'];

            // Defence in depth: drop the single-use token so no later branch can
            // ever treat it as a long-lived credential.
            unset($data['connect_token']);
        }

        if (isset($data['merchant_id'])) {
            $this->configWriter->save(self::CONFIG_MERCHANT_ID, (string)$data['merchant_id'], $scope, $scopeId);
        }

        if (!empty($data['integration_token'])) {
            $encrypted = $this->encryptor->encrypt((string)$data['integration_token']);
            $this->configWriter->save(self::CONFIG_INTEGRATION_TOKEN, $encrypted, $scope, $scopeId);
        }

        if (!empty($data['webhook_secret'])) {
            $encrypted = $this->encryptor->encrypt((string)$data['webhook_secret']);
            $this->configWriter->save(self::CONFIG_WEBHOOK_SECRET, $encrypted, $scope, $scopeId);
        }

        if (!empty($data['embed_secret'])) {
            $encrypted = $this->encryptor->encrypt((string)$data['embed_secret']);
            $this->configWriter->save(self::CONFIG_EMBED_SECRET, $encrypted, $scope, $scopeId);
        }

        if (isset($data['webhook_secret_version'])) {
            $this->configWriter->save(
                self::CONFIG_WEBHOOK_SECRET_VERSION,
                (int)$data['webhook_secret_version'],
                $scope,
                $scopeId
            );
        }

        if (isset($data['connection_id'])) {
            $this->configWriter->save(
                self::CONFIG_CONNECTION_ID,
                (string)$data['connection_id'],
                $scope,
                $scopeId
            );
        }

        if (isset($data['integration_token_secret_id'])) {
            $this->configWriter->save(
                self::CONFIG_INTEGRATION_TOKEN_SECRET_ID,
                (string)$data['integration_token_secret_id'],
                $scope,
                $scopeId
            );
        }

        if (isset($data['webhook_secret_secret_id'])) {
            $this->configWriter->save(
                self::CONFIG_WEBHOOK_SECRET_SECRET_ID,
                (string)$data['webhook_secret_secret_id'],
                $scope,
                $scopeId
            );
        }

        if (!empty($data['internal_hmac_secret'])) {
            $encrypted = $this->encryptor->encrypt((string)$data['internal_hmac_secret']);
            $this->configWriter->save(self::CONFIG_INTERNAL_HMAC_SECRET, $encrypted, $scope, $scopeId);
        }

        // Enforcement (CEL) credentials — without these EnforcementClient short-circuits
        // to unconditional ALLOW. Stored as plaintext to match the read contract used by
        // EnforcementClient / AgentHistoryFetcher / CheckoutSubmitBefore / the observer
        // (they call scopeConfig->getValue() directly, no decrypt). The installation_id is
        // an opaque identifier; the hmac_secret is masked in the admin UI via the
        // form field's <inputType>password</inputType> (view/adminhtml/ui_component/
        // trusteed_setup_form.xml) and is never echoed back because DataProvider.php
        // returns an empty string for 'enforcement_hmac_secret' (it is not in system.xml).
        if (isset($data['enforcement_installation_id'])) {
            $this->configWriter->save(
                self::CONFIG_ENFORCEMENT_INSTALLATION_ID,
                trim((string)$data['enforcement_installation_id']),
                $scope,
                $scopeId
            );
        }

        // Only overwrite the secret when a non-empty value is submitted, so an empty
        // wizard re-save never wipes a previously provisioned secret.
        if (!empty($data['enforcement_hmac_secret'])) {
            $this->configWriter->save(
                self::CONFIG_ENFORCEMENT_HMAC_SECRET,
                trim((string)$data['enforcement_hmac_secret']),
                $scope,
                $scopeId
            );
        }

        if (isset($data['store_view_selection'])) {
            $views = is_array($data['store_view_selection'])
                ? implode(',', $data['store_view_selection'])
                : (string)$data['store_view_selection'];
            $this->configWriter->save(self::CONFIG_STORE_VIEWS, $views, $scope, $scopeId);
        }
    }

    /**
     * Exchange a single-use connect_token for the provisioned per-connection
     * secrets. Server-to-server only — the connect_token never round-trips back
     * to the browser as a stored credential.
     *
     * Hardening (mirrors IntrospectToken / Token\Issue):
     *   - SSRF guard via ApiBaseUrlValidator::isAuthorized() (sealed host hash).
     *   - HTTPS re-assert + strict TLS verify, no redirects, HTTPS-only protocols.
     *   - Short timeout, fail-closed on any non-2xx / malformed response.
     *
     * @return array{connection_id:string, webhook_secret:string, embed_secret:string}
     * @throws \RuntimeException on any SSRF/transport/contract failure.
     */
    private function exchangeConnectToken(string $apiBase, string $connectToken): array
    {
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[Trusteed][connect-exchange] SSRF guard rejected api_base_url', [
                'host' => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            throw new \RuntimeException('API base URL not allowed for connect-token exchange.');
        }

        $endpoint = $apiBase . self::VALIDATE_CONNECT_TOKEN_PATH;
        if (!str_starts_with($endpoint, 'https://')) {
            throw new \RuntimeException('Connect-token exchange endpoint must be HTTPS.');
        }

        $body = json_encode(['connect_token' => $connectToken], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

        try {
            $this->curl->setOption(CURLOPT_RETURNTRANSFER, true);
            $this->curl->setOption(CURLOPT_TIMEOUT, self::EXCHANGE_TIMEOUT_SECONDS);
            $this->curl->setOption(CURLOPT_CONNECTTIMEOUT, self::EXCHANGE_TIMEOUT_SECONDS);
            $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
            $this->curl->setOption(CURLOPT_MAXREDIRS, 0);
            $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
            $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
            $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]);
            $this->curl->post($endpoint, $body);

            $status = (int)$this->curl->getStatus();
            $rawResponse = (string)$this->curl->getBody();
        } catch (\Throwable $e) {
            $this->logger->error('[Trusteed][connect-exchange] transport failure', [
                'exception' => $e->getMessage(),
                'host' => $authz['host'],
            ]);
            throw new \RuntimeException('Could not reach Trusteed to complete the connection. Try again.');
        }

        // Any 3xx ⇒ server tried to redirect us (follow disabled). Reject.
        if ($status >= 300 && $status < 400) {
            throw new \RuntimeException('Connect-token exchange attempted an unexpected redirect (HTTP ' . $status . ').');
        }
        if ($status < 200 || $status >= 300) {
            $this->logger->warning('[Trusteed][connect-exchange] non-2xx', ['status' => $status]);
            throw new \RuntimeException('Trusteed rejected the connection token (HTTP ' . $status . '). Reconnect and try again.');
        }

        try {
            $decoded = json_decode($rawResponse, true, 8, JSON_THROW_ON_ERROR);
        } catch (\Throwable $e) {
            $this->logger->error('[Trusteed][connect-exchange] invalid JSON from relay', [
                'exception' => $e->getMessage(),
            ]);
            throw new \RuntimeException('Trusteed returned an invalid response while connecting.');
        }

        $connectionId = is_array($decoded) ? trim((string)($decoded['connection_id'] ?? '')) : '';
        $webhookSecret = is_array($decoded) ? (string)($decoded['webhook_secret'] ?? '') : '';
        $embedSecret = is_array($decoded) ? (string)($decoded['embed_secret'] ?? '') : '';

        if ($connectionId === '' || $webhookSecret === '' || $embedSecret === '') {
            $this->logger->warning('[Trusteed][connect-exchange] incomplete contract payload', [
                'has_connection_id' => $connectionId !== '',
                'has_webhook_secret' => $webhookSecret !== '',
                'has_embed_secret' => $embedSecret !== '',
            ]);
            throw new \RuntimeException('Trusteed did not return the expected connection credentials.');
        }

        return [
            'connection_id' => $connectionId,
            'webhook_secret' => $webhookSecret,
            'embed_secret' => $embedSecret,
        ];
    }

    private function applyHyvaGuard(): bool
    {
        if (!$this->themeDetector->isHyvaOrPwa()) {
            return false;
        }

        $this->configWriter->save(
            self::CONFIG_WEBMCP_ENABLED,
            '0',
            ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
            0
        );

        $this->logger->info('Hyvä/PWA Studio detected — storefront bridge auto-disabled on wizard save');
        return true;
    }

    private function detectB2bPricing(): ?string
    {
        // B2B/tier-pricing detection: sample first 100 products for tier prices.
        // Returns a non-blocking warning message if detected; null if clean.
        try {
            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            /** @var \Magento\Catalog\Api\ProductRepositoryInterface $repo */
            $repo = $objectManager->get(\Magento\Catalog\Api\ProductRepositoryInterface::class);
            /** @var \Magento\Framework\Api\SearchCriteriaBuilder $criteriaBuilder */
            $criteriaBuilder = $objectManager->get(\Magento\Framework\Api\SearchCriteriaBuilder::class);

            $criteria = $criteriaBuilder
                ->addFilter('status', 1)
                ->setPageSize(100)
                ->setCurrentPage(1)
                ->create();

            $list = $repo->getList($criteria);
            $tierPriceCount = 0;

            foreach ($list->getItems() as $product) {
                $tierPrices = $product->getTierPrices();
                if (!empty($tierPrices)) {
                    $tierPriceCount++;
                }
            }

            if ($tierPriceCount > 0) {
                return sprintf(
                    'B2B/tier pricing detected on %d product(s) in the first 100 sampled. '
                    . 'Catalog exported to agents may have pricing_completeness != full. '
                    . 'See docs/setup/magento-webserver.md for guidance.',
                    $tierPriceCount
                );
            }
        } catch (\Throwable $e) {
            // B2B detection failure is non-blocking
            $this->logger->warning('B2B tier-pricing detection failed', ['error' => $e->getMessage()]);
        }

        return null;
    }
}
