<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Backend\Model\Locale\Resolver as BackendLocaleResolver;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Data\Form\FormKey;
use Magento\Framework\Module\Dir\Reader as ModuleDirReader;
use Magento\Framework\View\Asset\Repository as AssetRepository;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;

/**
 * SpaShell block — Phase B Admin SPA mount support (spec 050).
 *
 * Exposes only safe, public-facing values to the .phtml template:
 *  - Bundle URL with cache-busting v= param (or null if asset missing)
 *  - Token relay URL (controller endpoint, NOT the relay HMAC secret)
 *  - API base, merchant_id (non-secret identifier)
 *  - Magento form_key for AJAX POST CSRF protection
 *  - Configured / initialSection helpers
 *
 * The HMAC secret used by the relay controller is NEVER exposed here.
 */
class SpaShell extends Template
{
    private const DEFAULT_API_BASE = 'https://api.trusteed.xyz';

    // Reuse the connector wizard values — Paco only fills these once during onboarding.
    // No duplicate "Embed" config group is exposed.
    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_HMAC_SECRET = 'trusteed_general/general/integration_token';

    private const BUNDLE_MODULE_REL_PATH = 'view/adminhtml/web/js/admin-spa.js';
    private const BUNDLE_ASSET_PATH = 'Trusteed_AgenticCommerce::js/admin-spa.js';

    private readonly FormKey $formKeyHelper;
    private readonly BackendLocaleResolver $localeResolver;

    public function __construct(
        Template\Context $context,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly SecretReader $secretReader,
        private readonly ModuleDirReader $moduleDirReader,
        private readonly AssetRepository $assetRepository,
        FormKey $formKey,
        BackendLocaleResolver $localeResolver,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->formKeyHelper = $formKey;
        $this->localeResolver = $localeResolver;
    }

    /**
     * Admin panel locale (e.g. "es_ES", "en_US"). The SPA normalises to "es" / "en".
     */
    public function getAdminLocale(): string
    {
        return (string) $this->localeResolver->getLocale();
    }

    /**
     * Returns the cache-busted URL of the admin SPA bundle, or null if the
     * compiled bundle does not exist on disk yet (allows graceful fallback).
     */
    public function getBundleUrl(): ?string
    {
        $moduleDir = $this->moduleDirReader->getModuleDir('', 'Trusteed_AgenticCommerce');
        $absolutePath = $moduleDir . DIRECTORY_SEPARATOR . self::BUNDLE_MODULE_REL_PATH;

        if (!is_file($absolutePath)) {
            return null;
        }

        $version = (string) @filemtime($absolutePath);
        $url = $this->assetRepository->getUrl(self::BUNDLE_ASSET_PATH);

        $separator = str_contains($url, '?') ? '&' : '?';
        return $url . $separator . 'v=' . rawurlencode($version);
    }

    /**
     * URL of the server-side relay controller that issues the embed access
     * token. The browser POSTs to this URL with the admin form_key.
     */
    public function getTokenRelayUrl(): string
    {
        return $this->getUrl('trusteed/token/issue');
    }

    /**
     * Public Trusteed API base URL used by the SPA for non-token requests.
     */
    public function getApiBase(): string
    {
        $value = (string) ($this->scopeConfig->getValue(
            self::CONFIG_API_BASE,
            ScopeInterface::SCOPE_STORE
        ) ?? '');
        $value = rtrim($value, '/');
        return $value !== '' ? $value : self::DEFAULT_API_BASE;
    }

    /**
     * Trusteed merchant UUID. Null when not yet configured.
     */
    public function getMerchantId(): ?string
    {
        $value = (string) ($this->scopeConfig->getValue(
            self::CONFIG_MERCHANT_ID,
            ScopeInterface::SCOPE_STORE
        ) ?? '');
        return $value !== '' ? $value : null;
    }

    /**
     * True when both merchant_id and hmac_secret are populated. Used by the
     * template to decide whether to render the SPA mount node or a setup hint.
     */
    public function isConfigured(): bool
    {
        $merchantId = $this->getMerchantId();
        if ($merchantId === null) {
            return false;
        }

        // Decrypt only to validate non-empty; the plaintext value is discarded.
        $plain = $this->secretReader->read(
            self::CONFIG_HMAC_SECRET,
            ScopeInterface::SCOPE_STORE
        );
        return $plain !== '';
    }

    /**
     * Magento backend form_key for CSRF protection on the token relay POST.
     */
    public function getFormKey(): string
    {
        return (string) $this->formKeyHelper->getFormKey();
    }

    /**
     * Initial SPA section requested by the parent controller (e.g.
     * "mis-reglas", "agentes", "payment-methods", "settings"). Defaults to
     * "mis-reglas" — a section the SPA actually mounts (the legacy "inicio"
     * default was never SPA-mounted).
     */
    public function getInitialSection(): string
    {
        $section = (string) $this->getData('section');
        return $section !== '' ? $section : 'mis-reglas';
    }
}
