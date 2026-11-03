<?php

declare(strict_types=1);

// Stubs mínimos para el cron de reporte de capacidades: sólo se declaran si el framework real no está cargado.

namespace Magento\Framework\App\Config\Storage {
    if (!\interface_exists(WriterInterface::class)) {
        interface WriterInterface
        {
            public function save($path, $value, $scope = 'default', $scopeId = 0);
        }
    }
}

namespace Magento\Framework\Module {
    if (!\interface_exists(ModuleListInterface::class)) {
        interface ModuleListInterface
        {
            public function getOne($name);
        }
    }
}
