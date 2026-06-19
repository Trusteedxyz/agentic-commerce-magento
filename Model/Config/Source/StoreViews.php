<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;
use Magento\Store\Model\StoreManagerInterface;

/**
 * Option source providing all active Magento store views for the wizard
 * store-view selection multiselect (Step 4).
 */
class StoreViews implements OptionSourceInterface
{
    public function __construct(
        private readonly StoreManagerInterface $storeManager,
    ) {}

    public function toOptionArray(): array
    {
        $options = [];
        foreach ($this->storeManager->getStores(false) as $store) {
            $options[] = [
                'value' => $store->getCode(),
                'label' => sprintf('%s (%s)', $store->getName(), $store->getCode()),
            ];
        }
        return $options;
    }
}
