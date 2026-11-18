<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service\PolicyPages;

use Magento\Cms\Model\ResourceModel\Page\CollectionFactory;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Magento\Store\Model\StoreManagerInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Embed\TrustSeal;

/**
 * Comunica a Trusteed las páginas de condiciones, privacidad y devoluciones que el comercio
 * eligió en Ajustes (`trusteed_general/policy_pages/*_page`, identificador de la página CMS).
 * Se llama al guardar los ajustes y a diario por cron. Nunca lanza: un fallo se registra.
 */
class PolicyPagesReporter
{
    public const ENDPOINT = '/v1/embed/merchant/policy-pages';
    private const CONFIG_PREFIX = 'trusteed_general/policy_pages/';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly CollectionFactory $pageCollectionFactory,
        private readonly StoreManagerInterface $storeManager,
        private readonly TrustSeal $trustSeal,
        private readonly LoggerInterface $logger
    ) {
    }

    public function report(): bool
    {
        try {
            $payload = PolicyPagesPayload::build($this->loadChosenPages());
            $res = $this->trustSeal->requestAsSystem(
                'PUT',
                self::ENDPOINT,
                (string)json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            );
            if ($res === null || $res['status'] !== 200) {
                $this->logger->warning('[Trusteed][policy-pages] not delivered', ['status' => $res['status'] ?? null]);

                return false;
            }

            return true;
        } catch (\Throwable $e) {
            $this->logger->warning('[Trusteed][policy-pages] failed: ' . $e->getMessage());

            return false;
        }
    }

    /** @return array<string,array{url:string,title:string,update_time:string,is_active:bool}|null> */
    private function loadChosenPages(): array
    {
        $store = $this->storeManager->getDefaultStoreView() ?? $this->storeManager->getStore();
        $base = rtrim((string)$store->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_WEB, true), '/');
        $pages = [];
        foreach (PolicyPagesPayload::TYPES as $type) {
            $identifier = trim((string)($this->scopeConfig->getValue(self::CONFIG_PREFIX . $type . '_page', ScopeInterface::SCOPE_STORE) ?? ''));
            $pages[$type] = null;
            if ($identifier === '') {
                continue;
            }
            $collection = $this->pageCollectionFactory->create();
            $collection->addFieldToFilter('identifier', $identifier)->addFieldToFilter('is_active', 1);
            $collection->addStoreFilter((int)$store->getId());
            $page = $collection->getFirstItem();
            if (!$page->getId()) {
                continue;
            }
            $pages[$type] = [
                'url' => $base . '/' . ltrim($identifier, '/'),
                'title' => (string)$page->getTitle(),
                'update_time' => (string)$page->getUpdateTime(),
                'is_active' => true,
            ];
        }

        return $pages;
    }
}
