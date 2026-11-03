<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use Magento\TestFramework\TestCase\AbstractController;

/**
 * Integration test: Phase B seam (T121, US4) — trusteed_dashboard_index layout.
 *
 * Verifies ST-5: toggling trusteed_general/general/phase_b_enabled renders or hides
 * the SPA placeholder div so the future Phase B embed-shell SPA can mount
 * without any code change to Module A.
 *
 * When phase_b_enabled = 1:
 *   - The adminhtml dashboard page contains <div id="trusteed-spa-root">
 *   - The div carries a data-merchant-id attribute matching the configured value.
 *
 * When phase_b_enabled = 0:
 *   - The layout block is suppressed by the ifconfig gate.
 *   - No <div id="trusteed-spa-root"> appears in the response.
 *
 * Security: data-merchant-id is the only data attribute rendered — no
 * credentials or tokens are exposed in the HTML (see SpaPlaceholder.php).
 */
class PhaseBSeamTest extends AbstractController
{
    /**
     * ST-5a: placeholder div is present when phase_b_enabled = 1.
     *
     * @magentoAppArea adminhtml
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/phase_b_enabled 1
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_magento_merchant_001
     */
    public function testPlaceholderRenderedWhenPhaseBEnabled(): void
    {
        $this->dispatch('backend/trusteed/dashboard/index');

        $body = $this->getResponse()->getBody();

        $this->assertStringContainsString(
            'id="trusteed-spa-root"',
            $body,
            'SPA mount-point div must be present when phase_b_enabled = 1'
        );
    }

    /**
     * ST-5b: data-merchant-id attribute carries the configured merchant_id.
     *
     * @magentoAppArea adminhtml
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/phase_b_enabled 1
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_magento_merchant_001
     */
    public function testPlaceholderContainsMerchantId(): void
    {
        $this->dispatch('backend/trusteed/dashboard/index');

        $body = $this->getResponse()->getBody();

        $this->assertStringContainsString(
            'data-merchant-id="test_magento_merchant_001"',
            $body,
            'data-merchant-id must reflect the configured merchant_id'
        );
    }

    /**
     * ST-5c: placeholder div is absent when phase_b_enabled = 0.
     *
     * The ifconfig="trusteed_general/general/phase_b_enabled" gate in the layout XML
     * must suppress the block entirely when the flag is off.
     *
     * @magentoAppArea adminhtml
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/phase_b_enabled 0
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_magento_merchant_001
     */
    public function testPlaceholderHiddenWhenPhaseBDisabled(): void
    {
        $this->dispatch('backend/trusteed/dashboard/index');

        $body = $this->getResponse()->getBody();

        $this->assertStringNotContainsString(
            'id="trusteed-spa-root"',
            $body,
            'SPA mount-point div must NOT be present when phase_b_enabled = 0'
        );
    }

    /**
     * ST-5d: disabling phase_b_enabled does not affect other dashboard content.
     *
     * Verifies the dashboard controller responds with HTTP 200 regardless of
     * the flag value — the flag only gates the SPA placeholder block.
     *
     * @magentoAppArea adminhtml
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/phase_b_enabled 0
     */
    public function testDashboardResponds200WhenPhaseBDisabled(): void
    {
        $this->dispatch('backend/trusteed/dashboard/index');

        $this->assertEquals(
            200,
            $this->getResponse()->getHttpResponseCode(),
            'Dashboard must return HTTP 200 regardless of phase_b_enabled flag'
        );
    }
}
