<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Cron;

use Magento\Framework\Module\ModuleListInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\CapabilitiesReporter;

/**
 * Reports capabilities periodically, not only on `setup:upgrade`.
 *
 * The server refreshes the store's `lastSeenAt` with every signed report and
 * treats a store with no signal for 30 days as dead: with a single report at
 * install time, a healthy store with little traffic ended up degraded. It
 * ALWAYS reports (not only when the version changed): the heartbeat is the
 * point. Never throws.
 */
class ReportCapabilities
{
    private const MODULE_NAME = 'Trusteed_AgenticCommerce';

    public function __construct(
        private readonly CapabilitiesReporter $reporter,
        private readonly ModuleListInterface $moduleList,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function execute(): void
    {
        try {
            $module  = $this->moduleList->getOne(self::MODULE_NAME);
            $version = (string) ($module['setup_version'] ?? '0.0.0');
            $this->reporter->report($version);
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] periodic capabilities report failed: ' . $e->getMessage());
        }
    }
}
