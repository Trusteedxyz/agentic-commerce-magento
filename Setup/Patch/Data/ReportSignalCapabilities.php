<?php
/**
 * Spec-048 4.9 — dispara el reporte de capacidades de señales.
 *
 * Va en un data patch porque los data patches corren en `setup:upgrade`, que es
 * exactamente cuando cambia la versión del módulo — y la versión es lo único
 * que hace variar el reporte. Colgarlo de un observer de checkout habría metido
 * una petición HTTP en el camino del comprador para un dato que cambia una vez
 * por release.
 *
 * `getAliases()` vacío y `getDependencies()` vacío: no toca esquema ni datos de
 * nadie, sólo habla con el backend.
 */

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Setup\Patch\Data;

use Magento\Framework\Module\ModuleListInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\CapabilitiesReporter;

class ReportSignalCapabilities implements DataPatchInterface
{
    private const MODULE_NAME = 'Trusteed_AgenticCommerce';

    public function __construct(
        private readonly CapabilitiesReporter $reporter,
        private readonly ModuleListInterface $moduleList,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function apply(): self
    {
        try {
            $module  = $this->moduleList->getOne(self::MODULE_NAME);
            $version = (string) ($module['setup_version'] ?? '0.0.0');
            $this->reporter->maybeReport($version);
        } catch (\Throwable $e) {
            // Un fallo de red no puede tumbar un `setup:upgrade`. El reporte
            // se reintenta en el siguiente cambio de versión, y mientras tanto
            // el servidor simplemente no sabe qué aporta esta instalación
            // (`unknown`, que es un estado honesto y previsto).
            $this->logger->warning(
                '[spec-048 4.9] capabilities data patch failed: ' . $e->getMessage()
            );
        }

        return $this;
    }

    /**
     * @return string[]
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * @return string[]
     */
    public function getAliases(): array
    {
        return [];
    }
}
