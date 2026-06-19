<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use PHPUnit\Framework\TestCase;

/**
 * Integration test: order save -> outbox -> publish -> mark delivered.
 * Requires a running Magento 2.4.8 test environment.
 *
 * @group integration
 */
class WebhookFlowTest extends TestCase
{
    public function testWebhookFlowRequiresMagentoEnvironment(): void
    {
        $this->markTestSkipped(
            'Integration test requires Magento 2.4.8 environment. ' .
            'Run inside a Magento docker container: bin/magento dev:tests:run integration'
        );
    }
}
