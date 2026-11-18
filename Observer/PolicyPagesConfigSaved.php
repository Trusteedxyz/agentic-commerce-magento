<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Trusteed\AgenticCommerce\Service\PolicyPages\PolicyPagesReporter;

/** Al guardar los ajustes de Trusteed se comunican de inmediato las páginas elegidas. Nunca lanza. */
class PolicyPagesConfigSaved implements ObserverInterface
{
    public function __construct(private readonly PolicyPagesReporter $reporter)
    {
    }

    public function execute(Observer $observer): void
    {
        $this->reporter->report();
    }
}
