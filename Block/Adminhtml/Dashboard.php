<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;

class Dashboard extends Template
{
    private const CONFIG_MERCHANT_ID      = 'trusteed_general/general/merchant_id';
    private const CONFIG_API_BASE         = 'trusteed_general/general/api_base_url';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';
    private const CONFIG_STORE_VIEWS      = 'trusteed_general/general/store_view_selection';

    public function __construct(
        Context $context,
        private readonly ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    public function isConnected(): bool
    {
        $token = $this->scopeConfig->getValue(self::CONFIG_INTEGRATION_TOKEN);
        $merchantId = $this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID);
        return !empty($token) && !empty($merchantId);
    }

    public function getMerchantId(): string
    {
        return (string)($this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID) ?? '');
    }

    public function getStoreCount(): int
    {
        $views = $this->scopeConfig->getValue(self::CONFIG_STORE_VIEWS) ?? '';
        if ($views === '') {
            return 0;
        }
        return count(explode(',', $views));
    }

    public function getSetupUrl(): string
    {
        return $this->getUrl('trusteed/setup/wizard');
    }

    public function getHealthUrl(): string
    {
        return $this->getUrl('trusteed/health/index');
    }

    public function getVentasUrl(): string
    {
        return $this->getUrl('trusteed/ventas/index');
    }

    public function getReglasUrl(): string
    {
        return $this->getUrl('trusteed/reglas/index');
    }

    public function getSeguridadUrl(): string
    {
        return $this->getUrl('trusteed/seguridad/index');
    }
}
