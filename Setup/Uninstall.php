<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Setup;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\UninstallInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;

/**
 * Da de baja el comercio en Trusteed al desinstalar el módulo — 2026-09-05.
 *
 * ## El agujero que cierra
 *
 * Magento no tenía nada equivalente al `app/uninstalled` de Shopify, ni
 * siquiera un fichero de desinstalación. Al quitar el módulo, el comercio
 * seguía publicado en `/.well-known/merchant-index.json`, en
 * `/api/v1/stores/directory` y con su endpoint MCP anunciado, con la
 * puntuación de confianza recalculándose sobre un catálogo que ya nadie
 * sincroniza. No existía ninguna otra señal de baja.
 *
 * ## Alcance real, y conviene no exagerarlo
 *
 * `UninstallInterface` la invoca `bin/magento module:uninstall`. Un
 * administrador que borre los ficheros a mano NO pasa por aquí. Este aviso
 * cubre la desinstalación ordenada; la desordenada la cubre el barrido por
 * latido, que no depende de que nadie avise.
 *
 * ## Por qué esta credencial
 *
 * `embed_secret` es el secreto S2S por conexión, guardado cifrado en config y
 * el único DURADERO que el módulo conserva en este momento — los tokens del
 * panel son de sesión y aquí ya no existen. Es el mismo que valida
 * `createAgenticToolsS2SAuth` en el backend, así que no se añade auth nueva.
 *
 * No lanza: una desinstalación no puede fallar porque nuestro backend no
 * conteste.
 */
class Uninstall implements UninstallInterface
{
    private const ENDPOINT_PATH = '/api/v1/embed/agentic-tools/deprovision';

    private const CONFIG_API_BASE = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_EMBED_SECRET = 'trusteed_general/general/embed_secret';

    private const DEFAULT_API_BASE = 'https://api.trusteed.xyz';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly SecretReader $secretReader,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function uninstall(SchemaSetupInterface $setup, ModuleContextInterface $context): void
    {
        $setup->startSetup();

        try {
            $this->notifyTrusteed();
        } catch (\Throwable $e) {
            // Ver la cabecera: el aviso nunca puede impedir la desinstalación.
            $this->logger->warning(
                '[trusteed] uninstall: no se pudo dar de baja el comercio: ' . $e->getMessage()
            );
        }

        $setup->endSetup();
    }

    private function notifyTrusteed(): void
    {
        $merchantId = (string) $this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID);
        $secret = $this->secretReader->read(self::CONFIG_EMBED_SECRET);

        if ($merchantId === '' || $secret === '') {
            $this->logger->info(
                '[trusteed] uninstall: sin credenciales configuradas, no hay baja que dar'
            );
            return;
        }

        $apiBase = (string) $this->scopeConfig->getValue(self::CONFIG_API_BASE);
        if ($apiBase === '') {
            $apiBase = self::DEFAULT_API_BASE;
        }

        $payload = json_encode(
            ['merchant_id' => $merchantId, 'platform' => 'MAGENTO'],
            JSON_UNESCAPED_SLASHES
        );
        if ($payload === false) {
            return;
        }

        // Plazo corto: esto corre mientras el administrador espera a que
        // termine `module:uninstall`.
        $this->curl->setTimeout(10);
        $this->curl->addHeader('Content-Type', 'application/json');
        $this->curl->addHeader('Accept', 'application/json');
        $this->curl->addHeader('X-Trusteed-S2S-Secret', $secret);
        $this->curl->post(rtrim($apiBase, '/') . self::ENDPOINT_PATH, $payload);

        if ($this->curl->getStatus() === 200) {
            $this->logger->info('[trusteed] uninstall: comercio dado de baja en Trusteed');
            return;
        }

        $this->logger->warning(
            '[trusteed] uninstall: la baja devolvió HTTP ' . $this->curl->getStatus()
            . '. El comercio puede seguir publicado hasta el barrido por latido.'
        );
    }
}
