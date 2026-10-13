<?php

declare(strict_types=1);

// Minimal stubs for the capabilities report cron. Declared only when the real framework is not loaded.

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
