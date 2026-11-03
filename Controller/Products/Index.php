<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Products;

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Catalog\Model\Product\Visibility;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Api\SortOrderBuilder;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Request\Http as HttpRequest;
use Magento\Framework\App\Response\Http as HttpResponse;
use Magento\Framework\Controller\Result\RawFactory;
use Magento\Framework\Controller\Result\Raw;
use Magento\Store\Api\Data\StoreInterface;
use Magento\Store\Api\StoreRepositoryInterface;
use Magento\Store\Model\StoreManagerInterface;
use Psr\Log\LoggerInterface;

/**
 * NLWeb products endpoint: /nlweb/products
 *
 * Resolved by the standard frontend router: frontName `nlweb` (etc/frontend/routes.xml)
 * + controller path `products` + default action `index` ⇒ this class
 * `Controller\Products\Index`.
 *
 * Returns a JSON-LD (@type=Product) representation of a paginated window of
 * active, agentic-visible products for the requested store view. Supports
 * conditional-GET via ETag (MD5 of serialised payload) and Last-Modified
 * header.
 *
 * Query params:
 *   - store_view: store view code (default: `default`; invalid/empty ⇒ default)
 *   - page:       1-based page number (default: 1; clamped to >= 1)
 *   - pageSize:   items per page (default: 20; clamped to 1..MAX_PAGE_SIZE)
 *
 * Filtering (Spec 050 FR-A-013): only products where the `is_agentic_visible`
 * EAV flag is `1` AND Magento catalog visibility includes the catalog surface
 * (VISIBILITY_IN_CATALOG or VISIBILITY_BOTH) are exposed. This mirrors the
 * connector enforcement in `packages/connectors/magento/src/connector.ts`.
 *
 * Spec 050 FR-A-007: lazy on-demand catalog (no bulk pre-sync).
 */
class Index implements HttpGetActionInterface
{
    private const DEFAULT_PAGE_SIZE = 20;
    private const MAX_PAGE_SIZE = 100;
    private const DEFAULT_STORE_VIEW = 'default';
    private const CONTENT_TYPE = 'application/ld+json';

    public function __construct(
        private readonly ProductRepositoryInterface $productRepository,
        private readonly SearchCriteriaBuilder $criteriaBuilder,
        private readonly SortOrderBuilder $sortOrderBuilder,
        private readonly StoreManagerInterface $storeManager,
        private readonly StoreRepositoryInterface $storeRepository,
        private readonly Visibility $productVisibility,
        private readonly HttpRequest $request,
        private readonly RawFactory $rawFactory,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(): Raw
    {
        $result = $this->rawFactory->create();

        try {
            $store = $this->resolveStore();
            $this->storeManager->setCurrentStore($store->getId());

            $currency = $this->resolveCurrencyCode($store);
            [$page, $pageSize] = $this->resolvePagination();

            $products = $this->loadProducts($page, $pageSize);
            $jsonLd = $this->buildJsonLd($products, $currency);
            $serialised = json_encode($jsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

            $etag = '"' . md5($serialised) . '"';
            $lastModified = $this->computeLastModified($products);
            $lastModifiedFormatted = gmdate('D, d M Y H:i:s', $lastModified) . ' GMT';

            // Conditional GET: ETag
            $ifNoneMatch = $this->request->getHeader('If-None-Match');
            if ($ifNoneMatch && $ifNoneMatch === $etag) {
                $result->setHttpResponseCode(HttpResponse::STATUS_CODE_304);
                return $result;
            }

            // Conditional GET: Last-Modified
            $ifModifiedSince = $this->request->getHeader('If-Modified-Since');
            if ($ifModifiedSince) {
                $clientTimestamp = strtotime($ifModifiedSince);
                if ($clientTimestamp !== false && $clientTimestamp >= $lastModified) {
                    $result->setHttpResponseCode(HttpResponse::STATUS_CODE_304);
                    return $result;
                }
            }

            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_200);
            $result->setHeader('Content-Type', self::CONTENT_TYPE, true);
            $result->setHeader('ETag', $etag, true);
            $result->setHeader('Last-Modified', $lastModifiedFormatted, true);
            $result->setContents($serialised);
        } catch (\Throwable $e) {
            $this->logger->error('NLWeb products endpoint error', ['error' => $e->getMessage()]);
            $result->setHttpResponseCode(HttpResponse::STATUS_CODE_500);
            $result->setHeader('Content-Type', 'application/json', true);
            $result->setContents(json_encode(['error' => 'internal_error']));
        }

        return $result;
    }

    /**
     * Resolve the requested store view, treating an invalid or empty
     * `store_view` param as the default store view explicitly (never silently
     * mis-scoped against whatever store the manager happened to hold).
     */
    private function resolveStore(): StoreInterface
    {
        $code = trim((string)$this->request->getParam('store_view', self::DEFAULT_STORE_VIEW));
        if ($code === '') {
            $code = self::DEFAULT_STORE_VIEW;
        }

        try {
            return $this->storeRepository->get($code);
        } catch (\Throwable $e) {
            $this->logger->warning(
                'NLWeb products: unknown store_view, falling back to default',
                ['requested' => $code, 'error' => $e->getMessage()]
            );

            // Explicit fallback: resolve the configured default store view.
            return $this->storeRepository->get(self::DEFAULT_STORE_VIEW);
        }
    }

    /**
     * Resolve the active currency for the store view. Prefers the configured
     * current display currency, falling back to the store's base currency.
     */
    private function resolveCurrencyCode(StoreInterface $store): string
    {
        try {
            $current = $store->getCurrentCurrencyCode();
            if (is_string($current) && $current !== '') {
                return $current;
            }
        } catch (\Throwable $e) {
            $this->logger->warning(
                'NLWeb products: failed to resolve current currency, using base',
                ['store' => $store->getCode(), 'error' => $e->getMessage()]
            );
        }

        $base = $store->getBaseCurrencyCode();
        return (is_string($base) && $base !== '') ? $base : 'USD';
    }

    /**
     * Parse and clamp pagination params from the request.
     *
     * @return array{0: int, 1: int} [page, pageSize]
     */
    private function resolvePagination(): array
    {
        $page = (int)$this->request->getParam('page', 1);
        if ($page < 1) {
            $page = 1;
        }

        $pageSize = (int)$this->request->getParam('pageSize', self::DEFAULT_PAGE_SIZE);
        if ($pageSize < 1) {
            $pageSize = self::DEFAULT_PAGE_SIZE;
        }
        if ($pageSize > self::MAX_PAGE_SIZE) {
            $pageSize = self::MAX_PAGE_SIZE;
        }

        return [$page, $pageSize];
    }

    /**
     * Load the requested page of active, agentic-visible products.
     *
     * EAV-backed values (e.g. price) are scoped to the store view via the
     * current store set on the store manager in execute() before this call.
     */
    private function loadProducts(int $page, int $pageSize): array
    {
        $sortOrder = $this->sortOrderBuilder
            ->setField('updated_at')
            ->setDescendingDirection()
            ->create();

        $criteria = $this->criteriaBuilder
            ->addFilter('status', 1)
            // Spec 050 FR-A-013: only agentic-visible products.
            ->addFilter('is_agentic_visible', 1)
            // Respect Magento catalog visibility (in-catalog or both); excludes
            // "not visible individually" (1) and "search only" (2).
            ->addFilter('visibility', $this->productVisibility->getVisibleInCatalogIds(), 'in')
            ->setPageSize($pageSize)
            ->setCurrentPage($page)
            ->addSortOrder($sortOrder)
            ->create();

        $results = $this->productRepository->getList($criteria);
        return $results->getItems();
    }

    private function buildJsonLd(array $products, string $currency): array
    {
        $items = [];
        foreach ($products as $product) {
            $price = (float)$product->getPrice();
            $items[] = [
                '@type' => 'Product',
                '@id' => $product->getProductUrl(),
                'name' => $product->getName(),
                'sku' => $product->getSku(),
                'description' => $product->getShortDescription() ?? $product->getDescription() ?? '',
                'offers' => [
                    '@type' => 'Offer',
                    'price' => $price,
                    'priceCurrency' => $currency,
                    'availability' => $product->isAvailable()
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                ],
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'itemListElement' => $items,
        ];
    }

    private function computeLastModified(array $products): int
    {
        $max = 0;
        foreach ($products as $product) {
            $ts = strtotime((string)$product->getUpdatedAt());
            if ($ts !== false && $ts > $max) {
                $max = $ts;
            }
        }
        return $max > 0 ? $max : time();
    }
}
