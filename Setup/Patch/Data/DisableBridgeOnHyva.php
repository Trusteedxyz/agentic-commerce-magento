<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Setup\Patch\Data;

use Magento\Framework\App\Config\Storage\WriterInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Storefront\ThemeDetector;
use Psr\Log\LoggerInterface;

/**
 * Idempotent data patch: disable the WebMCP storefront bridge if Hyvä or
 * PWA Studio is active at install time.
 *
 * This patch runs once on `bin/magento setup:upgrade`. If the merchant later
 * switches themes they can manually re-enable the bridge in the admin wizard.
 *
 * The same logic is also applied on every wizard save in
 * Controller/Adminhtml/Setup/Save.php so the guard works across theme changes.
 *
 * Spec 050 T066a.
 */
class DisableBridgeOnHyva implements DataPatchInterface
{
    private const CONFIG_WEBMCP_ENABLED = 'trusteed_general/features/webmcp_enabled';

    public function __construct(
        private readonly ThemeDetector $themeDetector,
        private readonly WriterInterface $configWriter,
        private readonly LoggerInterface $logger,
    ) {}

    public function apply(): self
    {
        if (!$this->themeDetector->isHyvaOrPwa()) {
            return $this;
        }

        $this->configWriter->save(
            self::CONFIG_WEBMCP_ENABLED,
            '0',
            ScopeInterface::SCOPE_DEFAULT,
            0
        );

        $this->logger->info(
            'Trusteed DisableBridgeOnHyva: Hyvä/PWA Studio detected '
            . '— storefront bridge auto-disabled on install'
        );

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
