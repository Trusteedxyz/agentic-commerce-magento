<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Wellknown;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Response\Http as HttpResponse;
use Magento\Framework\Controller\Result\RawFactory;
use Magento\Framework\Controller\Result\Raw;
use Trusteed\AgenticCommerce\Model\Manifest\Builder;
use Trusteed\AgenticCommerce\Model\Manifest\ManifestSigningException;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

/**
 * Serves the signed .well-known/mcp.json manifest.
 *
 * Returns the identical signed payload for ALL configured store-view domains
 * (clarification Q1: one signing key per merchant connection regardless of
 * how many domains serve the request).
 *
 * On Builder failure, returns HTTP 503 with a safe error envelope so agents
 * can distinguish a transient error from a permanent misconfiguration.
 */
class McpManifest implements HttpGetActionInterface
{
    private const CONFIG_PATH_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CACHE_CONTROL = 'public, max-age=300';

    public function __construct(
        private readonly Builder $builder,
        private readonly RawFactory $rawFactory,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(): Raw
    {
        $result = $this->rawFactory->create();
        $merchantId = (string)$this->scopeConfig->getValue(
            self::CONFIG_PATH_MERCHANT_ID,
            ScopeInterface::SCOPE_STORE
        );

        try {
            $payload = $this->builder->build($merchantId);
            $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_200);
            $result->setHeader('Content-Type', 'application/json', true);
            $result->setHeader('Cache-Control', self::CACHE_CONTROL, true);
            $result->setContents($json);
        } catch (ManifestSigningException $e) {
            $this->logger->error('Manifest signing failed', ['error' => $e->getMessage()]);
            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_503);
            $result->setHeader('Content-Type', 'application/json', true);
            $result->setContents(json_encode(['error' => 'manifest_unavailable']));
        } catch (\Throwable $e) {
            $this->logger->error('Manifest build unexpected error', ['error' => $e->getMessage()]);
            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_503);
            $result->setHeader('Content-Type', 'application/json', true);
            $result->setContents(json_encode(['error' => 'manifest_unavailable']));
        }

        return $result;
    }
}
