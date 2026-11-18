<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Cron;

use Trusteed\AgenticCommerce\Service\PolicyPages\PolicyPagesReporter;

/** Reenvía a diario las páginas de condiciones elegidas por el comercio (por si cambió el CMS). Nunca lanza. */
class ReportPolicyPages
{
    public function __construct(private readonly PolicyPagesReporter $reporter)
    {
    }

    public function execute(): void
    {
        $this->reporter->report();
    }
}
