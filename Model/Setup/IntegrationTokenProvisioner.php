<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Setup;

use Magento\Authorization\Model\UserContextInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;
use Magento\Integration\Api\AuthorizationServiceInterface;
use Magento\Integration\Api\IntegrationServiceInterface;
use Magento\Integration\Api\OauthServiceInterface;
use Magento\Integration\Model\Integration;
use Magento\Integration\Model\Oauth\TokenFactory;

/**
 * Crea (o reutiliza) la integración «Trusteed» de Magento y devuelve su token de
 * acceso, que la API de Trusteed usa para leer el catálogo por REST.
 *
 * Hasta ahora el módulo no la creaba y el comerciante tenía que hacerlo a mano
 * en System → Integrations, aunque el canje exige `integration_token`. Solo se
 * concede lo que lee el conector (catálogo, stock, configuración de tienda y
 * pedidos), no «All».
 *
 * `oauth/consumer/enable_integration_as_bearer` va a 1: sin él el token de
 * integración no sirve como `Authorization: Bearer` y `/rest/V1/*` responde 401
 * «The consumer isn't authorized», que parece un fallo de permisos.
 */
class IntegrationTokenProvisioner
{
    public const INTEGRATION_NAME = 'Trusteed';
    private const CONFIG_BEARER = 'oauth/consumer/enable_integration_as_bearer';

    /** @var list<string> */
    private const RESOURCES = [
        'Magento_Catalog::catalog',
        'Magento_Catalog::products',
        'Magento_Catalog::categories',
        'Magento_Catalog::catalog_inventory',
        'Magento_Catalog::attributes_attributes',
        'Magento_CatalogInventory::cataloginventory',
        'Magento_InventorySalesApi::stock',
        'Magento_Inventory::inventory',
        'Magento_Backend::stores',
        'Magento_Backend::store',
        'Magento_Sales::sales',
        'Magento_Sales::sales_operation',
        'Magento_Sales::sales_order',
        'Magento_Sales::actions_view',
    ];

    public function __construct(
        private readonly IntegrationServiceInterface $integrations,
        private readonly OauthServiceInterface $oauth,
        private readonly AuthorizationServiceInterface $authorization,
        private readonly TokenFactory $tokenFactory,
        private readonly WriterInterface $configWriter,
    ) {
    }

    public function accessToken(): string
    {
        $integration = $this->integrations->findByName(self::INTEGRATION_NAME);
        if (!$integration->getId()) {
            $integration = $this->integrations->create([
                'name' => self::INTEGRATION_NAME,
                'status' => Integration::STATUS_INACTIVE,
                'setup_type' => Integration::TYPE_MANUAL,
            ]);
        }

        $this->authorization->grantPermissions((int)$integration->getId(), self::RESOURCES);

        $token = $this->tokenFactory->create()->loadByConsumerIdAndUserType(
            (int)$integration->getConsumerId(),
            UserContextInterface::USER_TYPE_INTEGRATION
        );
        if (!$token->getId()) {
            $this->oauth->createAccessToken((int)$integration->getConsumerId(), true);
            $token = $this->tokenFactory->create()->loadByConsumerIdAndUserType(
                (int)$integration->getConsumerId(),
                UserContextInterface::USER_TYPE_INTEGRATION
            );
        }

        if ((int)$integration->getStatus() !== Integration::STATUS_ACTIVE) {
            $integration->setStatus(Integration::STATUS_ACTIVE)->save();
        }
        $this->configWriter->save(self::CONFIG_BEARER, '1');

        $value = (string)$token->getToken();
        if ($value === '') {
            throw new \RuntimeException('Could not obtain an access token for the Trusteed integration.');
        }

        return $value;
    }
}
