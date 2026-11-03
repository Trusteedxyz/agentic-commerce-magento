<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

/** Modos de verificación de firma Web Bot Auth: off | observe | enforce. */
class BrowserAgentSignatureMode implements OptionSourceInterface
{
    public function toOptionArray(): array
    {
        return [
            ['value' => 'off', 'label' => 'Off'],
            ['value' => 'observe', 'label' => 'Observe (verify and log only)'],
            ['value' => 'enforce', 'label' => 'Enforce'],
        ];
    }
}
