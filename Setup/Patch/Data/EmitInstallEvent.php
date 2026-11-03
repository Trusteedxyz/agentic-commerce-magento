<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Module\ModuleListInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

class EmitInstallEvent implements DataPatchInterface
{
    /** URL path of the backend analytics event sink. */
    private const EVENT_PATH = '/api/v1/internal/magento/event';

    /**
     * Scope granted to this module at connect-token validation
     * ({@see \Trusteed\AgenticCommerce\Controller\Adminhtml\Setup\IntrospectToken}
     * REQUIRED_SCOPE). Presented to the backend for H2 per-platform scope
     * enforcement (FR-A-003, observe mode by default).
     */
    private const GRANTED_SCOPE = 'magento:store:write';

    public function __construct(
        private readonly Curl $curlClient,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly ModuleListInterface $moduleList,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader,
        private readonly InternalHmacSigner $internalHmacSigner,
        // Nullable for legacy positional unit-test construction; production is
        // guaranteed a non-null guard via etc/di.xml. When null the callout
        // fails closed.
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    /**
     * Emit magento.module.installed analytics event to AgenticMCPStores API.
     * Non-fatal: analytics loss is acceptable — errors are logged as warnings only.
     * Spec 050: T021a FR-B-003 instrumentation event #1.
     */
    public function apply(): self
    {
        $apiBase = rtrim((string)($this->scopeConfig->getValue('trusteed_general/general/api_base_url') ?? ''), '/');
        $merchantId = (string)($this->scopeConfig->getValue('trusteed_general/general/merchant_id') ?? '');
        $connectionId = (string)($this->scopeConfig->getValue('trusteed_general/general/connection_id') ?? '');
        $token = $this->secretReader->read('trusteed_general/general/integration_token');
        $internalSecret = $this->secretReader->read('trusteed_general/general/internal_hmac_secret');

        if (empty($apiBase) || empty($merchantId) || $token === '') {
            // Not configured yet (or decrypt failed) — skip event, wizard will emit on first save
            return $this;
        }

        if ($internalSecret === '' || $connectionId === '') {
            // The backend event sink requires the canonical internal HMAC
            // (connection_id + internal_hmac_secret). Without them the request
            // would 401 — skip rather than emit an unsigned request. The wizard
            // re-emits analytics once the connection is fully provisioned.
            $this->logger->warning(
                'Skipping magento.module.installed event: connection_id/internal_hmac_secret not yet provisioned'
            );
            return $this;
        }

        // SSRF guard: the integration token + internal HMAC must only ever be
        // POSTed to an allowlisted/sealed host. A tampered api_base_url (admin
        // CSRF / stored XSS / supply-chain) would otherwise exfiltrate the
        // bearer token + signature. Validate BEFORE signing or making the call.
        if ($this->urlValidator === null) {
            // Fail closed: production wires this via di.xml.
            $this->logger->warning(
                'Skipping magento.module.installed event: SSRF guard unavailable'
            );
            return $this;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning(
                'Skipping magento.module.installed event: SSRF guard rejected api_base_url',
                ['host' => $authz['host'], 'outcome' => $authz['outcome']]
            );
            return $this;
        }

        $moduleInfo = $this->moduleList->getOne('Trusteed_AgenticCommerce');

        /** @var \Magento\Framework\App\ProductMetadataInterface $productMetadata */
        $productMetadata = \Magento\Framework\App\ObjectManager::getInstance()
            ->get(\Magento\Framework\App\ProductMetadataInterface::class);

        $payload = json_encode([
            'event' => 'magento.module.installed',
            'merchant_id' => $merchantId,
            'magento_version' => $productMetadata->getVersion(),
            'module_version' => $moduleInfo['setup_version'] ?? '1.0.0',
        ]);

        // Sign with the SAME shared canonical signer used by lag-heartbeat +
        // manifest-sign (M4 unification). H2 (FR-A-003): additionally present the
        // granted scope + claimed merchant so the backend can enforce
        // per-platform scope (observe mode by default, non-breaking).
        $timestamp = (string)time();
        $authHeaders = $this->internalHmacSigner->buildHeaders(
            $internalSecret,
            $connectionId,
            'POST',
            self::EVENT_PATH,
            (string)$payload,
            $timestamp
        );

        try {
            $this->curlClient->addHeader('Authorization', "Bearer {$token}");
            $this->curlClient->addHeader('Content-Type', 'application/json');
            foreach ($authHeaders as $name => $value) {
                $this->curlClient->addHeader($name, $value);
            }
            // H2 observe-mode readiness headers (FR-A-003).
            $this->curlClient->addHeader('X-Trusteed-Scope', self::GRANTED_SCOPE);
            $this->curlClient->addHeader('X-Trusteed-Merchant-Id', $merchantId);
            $this->curlClient->post($apiBase . self::EVENT_PATH, (string)$payload);
        } catch (\Throwable $e) {
            // Non-fatal — analytics event loss is acceptable
            $this->logger->warning(
                'Failed to emit magento.module.installed event',
                ['error' => $e->getMessage()]
            );
        }

        return $this;
    }

    public static function getDependencies(): array
    {
        return [];
    }

    public function getAliases(): array
    {
        return [];
    }
}
