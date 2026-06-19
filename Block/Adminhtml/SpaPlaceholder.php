<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Framework\App\Config\ScopeConfigInterface;

/**
 * SpaPlaceholder block — Phase B seam reservation (T117-T119, US4).
 *
 * Renders a minimal mount-point div so the future Phase B SPA can be
 * injected without any code change to Module A.
 *
 * Security note: only merchant_id (non-secret identifier) is exposed as a
 * data attribute. No credentials, tokens or PII are rendered here.
 * Phase B SPA bootstrap uses the embed-bootstrap service (spec-039) which
 * issues a short-lived HS256 token via a separate authenticated request.
 */
class SpaPlaceholder extends Template
{
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';

    public function __construct(
        Template\Context $context,
        private readonly ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    /**
     * Return the configured merchant_id for this Magento installation.
     *
     * Returns an empty string when the merchant has not yet completed the
     * setup wizard — the Phase B SPA should treat an empty value as a signal
     * to redirect to the wizard.
     */
    public function getMerchantId(): string
    {
        return (string) $this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID);
    }
}
