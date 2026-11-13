<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context;
use Magento\Backend\Model\Auth\Session as AuthSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Trusteed\AgenticCommerce\Model\Embed\TrustSeal;

class Dashboard extends Template
{
    private const CONFIG_MERCHANT_ID      = 'trusteed_general/general/merchant_id';
    private const CONFIG_API_BASE         = 'trusteed_general/general/api_base_url';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';
    private const CONFIG_STORE_VIEWS      = 'trusteed_general/general/store_view_selection';

    public function __construct(
        Context $context,
        private readonly ScopeConfigInterface $scopeConfig,
        // Obligatorios: en Magento un parámetro con valor por defecto null se inyecta como null.
        private readonly TrustSeal $trustSeal,
        private readonly AuthSession $authSession,
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

    private ?string $sealState = null;

    /** Estado real del sello de confianza (`active`, `inactive`, `unknown`); una sola consulta por página. */
    public function getSealState(): string
    {
        if ($this->sealState !== null) {
            return $this->sealState;
        }
        $adminUser = $this->authSession->getUser();
        $adminId = $adminUser ? (int)$adminUser->getId() : 0;

        return $this->sealState = ($this->isConnected() && $adminId > 0)
            ? $this->trustSeal->state($adminId)
            : TrustSeal::STATE_UNKNOWN;
    }

    /** `signed` solo con el sello activo; con cualquier otro estado, `pending`. */
    public function getGuaranteeKey(): string
    {
        return TrustSeal::guaranteeKey($this->getSealState());
    }

    public function getActivateUrl(): string
    {
        return $this->getUrl('trusteed/protection/activate');
    }

    public function getDashboardUrl(): string
    {
        return $this->getUrl('trusteed/dashboard/index');
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
