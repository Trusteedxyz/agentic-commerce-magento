<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Config\Source;

use Magento\Cms\Model\ResourceModel\Page\CollectionFactory;
use Magento\Framework\Data\OptionSourceInterface;

/** Páginas CMS activas, con el identificador (URL key) como valor; la primera opción es «ninguna». */
class CmsPage implements OptionSourceInterface
{
    public function __construct(private readonly CollectionFactory $collectionFactory)
    {
    }

    /** @return list<array{value:string,label:string}> */
    public function toOptionArray(): array
    {
        $options = [['value' => '', 'label' => (string)__('(None)')]];
        $collection = $this->collectionFactory->create()->addFieldToFilter('is_active', 1);
        foreach ($collection as $page) {
            $options[] = ['value' => (string)$page->getIdentifier(), 'label' => (string)$page->getTitle() . ' (' . $page->getIdentifier() . ')'];
        }

        return $options;
    }
}
