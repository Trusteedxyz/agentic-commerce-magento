<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use Magento\TestFramework\TestCase\AbstractController;

/**
 * Integration test: WellKnownRouter dispatches correctly and returns a valid manifest.
 *
 * Verifies:
 *   - GET /.well-known/mcp.json returns HTTP 200
 *   - Content-Type is application/json
 *   - Payload contains required fields: schema_version, store_views, signature
 *   - Payload is identical for different HTTP_HOST values (multi-domain semantics)
 */
class WellKnownRouterTest extends AbstractController
{
    /**
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_merchant_001
     */
    public function testWellKnownManifestReturnsHttp200(): void
    {
        $this->dispatch('/.well-known/mcp.json');

        $response = $this->getResponse();
        $this->assertEquals(200, $response->getHttpResponseCode(), 'Expected HTTP 200 for /.well-known/mcp.json');
    }

    /**
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_merchant_001
     */
    public function testWellKnownManifestContentType(): void
    {
        $this->dispatch('/.well-known/mcp.json');

        $response = $this->getResponse();
        $contentType = $response->getHeader('Content-Type');
        $this->assertNotEmpty($contentType, 'Content-Type header must be present');
        $this->assertStringContainsString(
            'application/json',
            (string)$contentType,
            'Content-Type must be application/json'
        );
    }

    /**
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_merchant_001
     */
    public function testWellKnownManifestHasRequiredFields(): void
    {
        $this->dispatch('/.well-known/mcp.json');

        $body = $this->getResponse()->getBody();
        $payload = json_decode($body, true);

        $this->assertIsArray($payload, 'Response body must be valid JSON');
        $this->assertArrayHasKey('schema_version', $payload, 'Payload must contain schema_version');
        $this->assertArrayHasKey('store_views', $payload, 'Payload must contain store_views');
        $this->assertArrayHasKey('signature', $payload, 'Payload must contain signature');
    }

    /**
     * The manifest payload is identical regardless of which domain
     * (HTTP_HOST) serves the request: one signing key per merchant connection.
     *
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_merchant_001
     */
    public function testManifestPayloadIdenticalForDifferentHttpHosts(): void
    {
        // First request with domain1.com
        $_SERVER['HTTP_HOST'] = 'domain1.com';
        $this->dispatch('/.well-known/mcp.json');
        $body1 = $this->getResponse()->getBody();
        $payload1 = json_decode($body1, true);

        // Reset response for second request
        $this->resetRequest();
        $this->resetResponse();

        // Second request with domain2.com
        $_SERVER['HTTP_HOST'] = 'domain2.com';
        $this->dispatch('/.well-known/mcp.json');
        $body2 = $this->getResponse()->getBody();
        $payload2 = json_decode($body2, true);

        // Both payloads must contain same store_views (signed with same key)
        $this->assertEquals(
            $payload1['merchant_id'] ?? null,
            $payload2['merchant_id'] ?? null,
            'merchant_id must be identical across domains'
        );
        $this->assertEquals(
            $payload1['store_views'] ?? null,
            $payload2['store_views'] ?? null,
            'store_views must be identical across domains'
        );
    }

    /**
     * /.well-known/ucp 302-redirects to the centrally generated per-store
     * profile. The storefront never builds or duplicates the document
     * body or version (same as the WooCommerce and PrestaShop plugins).
     *
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     * @magentoConfigFixture default_store trusteed_general/general/merchant_id test_merchant_001
     */
    public function testUcpProfileRedirectsToCentralEndpoint(): void
    {
        $this->dispatch('/.well-known/ucp');

        $response = $this->getResponse();
        $this->assertEquals(302, $response->getHttpResponseCode(), 'Expected HTTP 302 for /.well-known/ucp');

        $location = $response->getHeader('Location');
        $this->assertNotFalse($location, 'Location header must be present on the redirect');
        $this->assertEquals(
            'https://api.trusteed.xyz/.well-known/ucp?store=test_merchant_001',
            $location->getFieldValue()
        );
    }

    /**
     * Fail-closed: no merchant_id configured gives 404, never a store-less redirect.
     *
     * @magentoAppIsolation enabled
     * @magentoConfigFixture default_store trusteed_general/general/api_base_url https://api.trusteed.xyz
     */
    public function testUcpProfileFailsClosedWithoutMerchantId(): void
    {
        $this->dispatch('/.well-known/ucp');

        $response = $this->getResponse();
        $this->assertEquals(404, $response->getHttpResponseCode(), 'Expected HTTP 404 without merchant_id');
    }

    /**
     * Unrelated `.well-known` paths must not be routed to UcpProfile either.
     */
    public function testUnrelatedWellKnownPathIsNotMatchedByUcpRoute(): void
    {
        $this->dispatch('/.well-known/ucp-inexistente');

        $response = $this->getResponse();
        $this->assertNotEquals(302, $response->getHttpResponseCode(), 'Unrelated well-known path must not redirect');
    }

    /**
     * Non-well-known paths must not be handled by WellKnownRouter.
     */
    public function testNonWellKnownPathIsNotHandled(): void
    {
        $this->dispatch('/some/other/path');

        // Should NOT return the manifest (no schema_version field)
        $body = $this->getResponse()->getBody();
        $payload = json_decode($body, true);

        if (is_array($payload)) {
            $this->assertArrayNotHasKey(
                'schema_version',
                $payload,
                'Non-well-known path must not return manifest payload'
            );
        }
        // If body is not JSON (e.g. HTML 404), the assertion above passes vacuously, which is correct.
    }
}
