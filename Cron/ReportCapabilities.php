<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Cron;

use Magento\Framework\Module\ModuleListInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\CapabilitiesReporter;

/**
 * Spec-048 4.9 — reporta capacidades periódicamente, no sólo en `setup:upgrade`.
 *
 * El servidor renueva `lastSeenAt` de la tienda con cada reporte firmado y da por
 * muerta a la que lleva 30 días sin señal: con un único reporte en la instalación,
 * una tienda sana con poco tráfico acababa degradada. Reporta SIEMPRE (no sólo si
 * cambió la versión): el latido es el propósito. Nunca lanza.
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
            $this->logger->warning('[spec-048 4.9] periodic capabilities report failed: ' . $e->getMessage());
        }
    }
}
