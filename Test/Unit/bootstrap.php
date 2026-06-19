<?php

declare(strict_types=1);

/**
 * PHPUnit bootstrap for Magento module unit tests.
 *
 * Loads only the classes under test — no Magento framework needed.
 */

require_once __DIR__ . '/../../Service/AgentTokenVerifier.php';

/*
 * Local fallback stubs for Magento framework symbols.
 *
 * In CI (`composer install` against repo.magento.com) the real Magento
 * classes are autoloaded and these stubs are skipped via class_exists guards.
 * Locally — and in environments without Magento credentials — these stubs let
 * the pure-unit observer/plugin tests still run against the Trusteed sources.
 *
 * Only the surface area exercised by `Test/Unit/**` is stubbed.
 */
if (!interface_exists(\Magento\Framework\Event\ObserverInterface::class)) {
    require_once __DIR__ . '/stubs/MagentoFrameworkStubs.php';
}

require_once __DIR__ . '/../../Observer/SalesOrderPaymentFailedObserver.php';
require_once __DIR__ . '/../../Service/EnforcementClient.php';
