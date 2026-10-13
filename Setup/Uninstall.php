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
 * Deregisters the merchant from Trusteed when the module is uninstalled.
 *
 * ## The gap it closes
 *
 * Magento has nothing equivalent to Shopify's `app/uninstalled`, not even an
 * uninstall file. When the module was removed, the merchant stayed published
 * in `/.well-known/merchant-index.json` and `/api/v1/stores/directory`, with
 * its MCP endpoint still advertised and its trust score being recalculated
 * over a catalog nobody syncs anymore. There was no other removal signal.
 *
 * ## Real scope, without overstating it
 *
 * `UninstallInterface` is invoked by `bin/magento module:uninstall`. An
 * administrator who deletes the files by hand does NOT go through here. This
 * notice covers the orderly uninstall; the unorderly one is covered by the
 * heartbeat sweep, which does not depend on anyone notifying.
 *
 * ## Why this credential
 *
 * `embed_secret` is the per-connection S2S secret, stored encrypted in config
 * and the only DURABLE one the module keeps at the moment (the panel tokens
 * are session-bound and no longer exist here). It is the same one the backend
 * validates for its S2S auth, so no new auth is added.
 *
 * It never throws: an uninstall cannot fail because our backend does not
 * answer.
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
            // See the class docblock: the notice must never block the uninstall.
            $this->logger->warning(
                '[trusteed] uninstall: could not deregister the store: ' . $e->getMessage()
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
                '[trusteed] uninstall: no credentials configured, nothing to deregister'
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

        // Short timeout: this runs while the administrator waits for
        // `module:uninstall` to finish.
        $this->curl->setTimeout(10);
        $this->curl->addHeader('Content-Type', 'application/json');
        $this->curl->addHeader('Accept', 'application/json');
        $this->curl->addHeader('X-Trusteed-S2S-Secret', $secret);
        $this->curl->post(rtrim($apiBase, '/') . self::ENDPOINT_PATH, $payload);

        if ($this->curl->getStatus() === 200) {
            $this->logger->info('[trusteed] uninstall: store deregistered from Trusteed');
            return;
        }

        $this->logger->warning(
            '[trusteed] uninstall: deregistration returned HTTP ' . $this->curl->getStatus()
            . '. El comercio puede seguir publicado hasta el barrido por latido.'
        );
    }
}
