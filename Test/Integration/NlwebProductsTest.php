<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Integration;

use Magento\TestFramework\TestCase\AbstractController;

/**
 * Integration test: NLWeb Products endpoint.
 *
 * Spec 050 T060 — verifies:
 *   - GET /nlweb/products → HTTP 200 with JSON-LD @context
 *   - ETag header present; second request with matching If-None-Match → 304
 *   - Last-Modified header present; request with If-Modified-Since = now → 304
 */
class NlwebProductsTest extends AbstractController
{
    /**
     * @magentoAppIsolation enabled
     * @magentoDataFixture Magento/Catalog/_files/products.php
     */
    public function testProductsReturnsJsonLd(): void
    {
        $this->dispatch('/nlweb/products');

        $response = $this->getResponse();
        $this->assertEquals(200, $response->getHttpResponseCode(), 'Expected HTTP 200');

        $contentType = (string)$response->getHeader('Content-Type');
        $this->assertStringContainsString('application/ld+json', $contentType, 'Content-Type must be application/ld+json');

        $body = $response->getBody();
        $payload = json_decode($body, true);

        $this->assertIsArray($payload, 'Response must be valid JSON');
        $this->assertArrayHasKey('@context', $payload, 'Payload must have @context (JSON-LD)');
        $this->assertEquals('https://schema.org', $payload['@context'], '@context must be https://schema.org');
    }

    /**
     * @magentoAppIsolation enabled
     * @magentoDataFixture Magento/Catalog/_files/products.php
     */
    public function testProductsReturnsEtagAndConditionalGet304(): void
    {
        // First request — capture ETag
        $this->dispatch('/nlweb/products');
        $response = $this->getResponse();
        $this->assertEquals(200, $response->getHttpResponseCode());

        $etag = $response->getHeader('ETag');
        $this->assertNotEmpty($etag, 'ETag header must be present on first response');

        // Reset and send conditional request with matching ETag
        $this->resetRequest();
        $this->resetResponse();

        $this->getRequest()->setHeader('If-None-Match', (string)$etag);
        $this->dispatch('/nlweb/products');

        $this->assertEquals(
            304,
            $this->getResponse()->getHttpResponseCode(),
            'Second request with matching If-None-Match must return 304'
        );
    }

    /**
     * @magentoAppIsolation enabled
     * @magentoDataFixture Magento/Catalog/_files/products.php
     */
    public function testProductsReturnsLastModifiedAndConditionalGet304(): void
    {
        // First request — capture Last-Modified
        $this->dispatch('/nlweb/products');
        $response = $this->getResponse();
        $this->assertEquals(200, $response->getHttpResponseCode());

        $lastModified = $response->getHeader('Last-Modified');
        $this->assertNotEmpty($lastModified, 'Last-Modified header must be present');

        // Reset and send conditional request with future If-Modified-Since
        $this->resetRequest();
        $this->resetResponse();

        // Use a time definitely after the products were last modified
        $futureDate = gmdate('D, d M Y H:i:s', time() + 3600) . ' GMT';
        $this->getRequest()->setHeader('If-Modified-Since', $futureDate);
        $this->dispatch('/nlweb/products');

        $this->assertEquals(
            304,
            $this->getResponse()->getHttpResponseCode(),
            'Request with recent If-Modified-Since must return 304'
        );
    }

    /**
     * @magentoAppIsolation enabled
     * @magentoDataFixture Magento/Catalog/_files/products.php
     */
    public function testProductsStoreViewParameter(): void
    {
        $this->getRequest()->setParam('store_view', 'default');
        $this->dispatch('/nlweb/products');

        $this->assertEquals(200, $this->getResponse()->getHttpResponseCode());

        $body = $this->getResponse()->getBody();
        $payload = json_decode($body, true);
        $this->assertIsArray($payload);
        $this->assertArrayHasKey('@context', $payload);
    }
}
