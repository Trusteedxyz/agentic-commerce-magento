<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Wellknown;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Response\Http as HttpResponse;
use Magento\Framework\Controller\Result\RawFactory;
use Magento\Framework\Controller\Result\Raw;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;
use Psr\Log\LoggerInterface;

/**
 * `/.well-known/ucp` discovery hop.
 *
 * Mirrors the WooCommerce (`includes/discovery/ucp-wellknown.php`) and
 * PrestaShop (`src/Discovery/UcpWellknownResolver.php`) resolvers: this
 * storefront route NEVER builds or duplicates the UCP profile body or its
 * version. It only 302-redirects to the centrally generated per-store
 * document:
 *
 *   {api_base}/.well-known/ucp?store={merchant_id}
 *
 * Fails closed to 404 when `merchant_id` is not configured, so an agent is
 * never redirected to a store-less URL. `api_base_url` is admin-configurable,
 * so it is checked against {@see ApiBaseUrlValidator}, the same SSRF/HTTPS
 * guard `EnforcementClient::isOutboundAuthorized()` applies to every other
 * outbound call this module makes, before it is ever used as a redirect
 * target.
 */
class UcpProfile implements HttpGetActionInterface
{
    private const CONFIG_PATH_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_PATH_API_BASE = 'trusteed_general/general/api_base_url';
    private const DEFAULT_API_BASE = 'https://api.trusteed.xyz';

    public function __construct(
        private readonly RawFactory $rawFactory,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly ApiBaseUrlValidator $urlValidator,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(): Raw
    {
        $result = $this->rawFactory->create();

        $merchantId = trim((string)$this->scopeConfig->getValue(
            self::CONFIG_PATH_MERCHANT_ID,
            ScopeInterface::SCOPE_STORE
        ));

        // Fail closed: never redirect to a store-less URL.
        if ($merchantId === '') {
            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_404);
            return $result;
        }

        $apiBase = trim((string)$this->scopeConfig->getValue(
            self::CONFIG_PATH_API_BASE,
            ScopeInterface::SCOPE_STORE
        ));
        if ($apiBase === '') {
            $apiBase = self::DEFAULT_API_BASE;
        }
        $apiBase = rtrim($apiBase, '/');

        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[trusteed] ucp well-known redirect rejected by SSRF guard', [
                'host' => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_404);
            return $result;
        }

        $target = $apiBase . '/.well-known/ucp?store=' . rawurlencode($merchantId);

        $result->setHttpResponseCode(HttpResponse::STATUS_CODE_302);
        $result->setHeader('Location', $target, true);
        return $result;
    }
}
