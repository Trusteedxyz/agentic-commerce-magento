<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Setup;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\ObjectManager;
use Magento\Framework\View\Element\UiComponent\DataProvider\DataProviderInterface;

/**
 * DataProvider for trusteed_setup_form UI component.
 * Implements DataProviderInterface directly (no collection — config-only form).
 */
class DataProvider implements DataProviderInterface
{
    private const DEFAULT_API_BASE        = 'https://api.trusteed.xyz';
    private const CONFIG_API_BASE         = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID      = 'trusteed_general/general/merchant_id';
    private const CONFIG_WEBHOOK_SECRET_V = 'trusteed_general/general/webhook_secret_version';
    private const CONFIG_STORE_VIEWS      = 'trusteed_general/general/store_view_selection';
    private const CONFIG_CONNECTION_ID    = 'trusteed_general/general/connection_id';
    private const CONFIG_INTEGRATION_TOKEN = 'trusteed_general/general/integration_token';
    private const CONFIG_ENFORCEMENT_INSTALLATION_ID = 'trusteed/enforcement/installation_id';

    public function __construct(
        private readonly string $name,
        private readonly string $primaryFieldName,
        private readonly string $requestFieldName,
        private readonly ScopeConfigInterface $scopeConfig,
        private array $meta = [],
        private array $data = [],
    ) {}

    public function getName()
    {
        return $this->name;
    }

    public function getConfigData()
    {
        return $this->data;
    }

    public function setConfigData($config): void
    {
        $this->data = $config;
    }

    public function getMeta()
    {
        return $this->meta;
    }

    public function getFieldMetaInfo($fieldSetName, $fieldName)
    {
        return [];
    }

    public function getFieldSetMetaInfo($fieldSetName)
    {
        return [];
    }

    public function getFieldsMetaInfo($fieldSetName)
    {
        return [];
    }

    public function getPrimaryFieldName()
    {
        return $this->primaryFieldName;
    }

    public function getRequestFieldName()
    {
        return $this->requestFieldName;
    }

    public function getData()
    {
        $storeViews = $this->scopeConfig->getValue(self::CONFIG_STORE_VIEWS) ?? '';
        $storeViewArray = $storeViews !== '' ? explode(',', $storeViews) : [];

        return [
            '' => [
                'api_base_url'       => $this->scopeConfig->getValue(self::CONFIG_API_BASE) ?: self::DEFAULT_API_BASE,
                'merchant_id'        => $this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID) ?? '',
                'webhook_secret_version' => $this->scopeConfig->getValue(self::CONFIG_WEBHOOK_SECRET_V) ?? '1',
                'store_view_selection'   => $storeViewArray,
                'connection_id'      => $this->scopeConfig->getValue(self::CONFIG_CONNECTION_ID) ?? '',
                // Echo the installation id (non-secret identifier) so the wizard shows it;
                // the enforcement_hmac_secret is intentionally NEVER echoed back.
                'enforcement_installation_id' => $this->scopeConfig->getValue(self::CONFIG_ENFORCEMENT_INSTALLATION_ID) ?? '',
                'enforcement_hmac_secret'     => '',
                'is_connected'       => !empty($this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID))
                    && !empty($this->scopeConfig->getValue(self::CONFIG_INTEGRATION_TOKEN)),
                'verify_token_url'   => ObjectManager::getInstance()
                    ->get(\Magento\Backend\Model\UrlInterface::class)
                    ->getUrl('trusteed/setup/introspectToken'),
            ],
        ];
    }

    public function addFilter(\Magento\Framework\Api\Filter $filter): void {}

    public function addOrder($field, $direction): void {}

    public function setLimit($offset, $size): void {}

    public function getSearchCriteria()
    {
        return null;
    }

    public function getSearchResult()
    {
        return null;
    }
}
