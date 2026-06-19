<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Storefront;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Module\Manager as ModuleManager;
use Magento\Store\Model\ScopeInterface;

/**
 * Detects whether a Hyvä or PWA Studio theme is active.
 *
 * Used to auto-disable the WebMCP storefront bridge on incompatible themes.
 * Luma and Luma-based themes return false — bridge is allowed.
 *
 * Detection order:
 *   1. Hyva_Theme module enabled → true
 *   2. Magento_PwaStudio module enabled → true
 *   3. Active theme ID config contains 'hyva' (case-insensitive) → true
 *   4. Otherwise → false
 *
 * Spec 050 T066, clarification T066a.
 */
class ThemeDetector
{
    private const CONFIG_THEME_ID = 'design/theme/theme_id';
    private const MODULE_HYVA = 'Hyva_Theme';
    private const MODULE_PWA_STUDIO = 'Magento_PwaStudio';

    public function __construct(
        private readonly ModuleManager $moduleManager,
        private readonly ScopeConfigInterface $scopeConfig,
    ) {}

    public function isHyvaOrPwa(): bool
    {
        if ($this->moduleManager->isEnabled(self::MODULE_HYVA)) {
            return true;
        }

        if ($this->moduleManager->isEnabled(self::MODULE_PWA_STUDIO)) {
            return true;
        }

        $themeId = (string)$this->scopeConfig->getValue(
            self::CONFIG_THEME_ID,
            ScopeInterface::SCOPE_STORE
        );

        if (stripos($themeId, 'hyva') !== false) {
            return true;
        }

        return false;
    }
}
