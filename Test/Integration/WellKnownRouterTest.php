<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use Magento\TestFramework\TestCase\AbstractController;

/**
 * Integration test: WellKnownRouter dispatches correctly and returns a valid manifest.
 *
 * Spec 050 T059 — verifies:
 *   - GET /.well-known/mcp.json → HTTP 200
 *   - Content-Type is application/json
 *   - Payload contains required fields: schema_version, store_views, signature
 *   - Payload is identical for different HTTP_HOST values (multi-domain semantics, clarification Q1)
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
     * Clarification Q1: manifest payload is identical regardless of which domain
     * (HTTP_HOST) serves the request — one signing key per merchant connection.
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
        // If body is not JSON (e.g. HTML 404), the assertion above passes vacuously — that is correct.
    }
}
