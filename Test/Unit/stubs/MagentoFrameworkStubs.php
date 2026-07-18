<?php

declare(strict_types=1);

/**
 * Minimal Magento framework stubs for local PHPUnit runs.
 *
 * Real Magento classes are pulled via `composer install` from repo.magento.com
 * in CI. Locally (without those credentials) we provide just-enough shapes for
 * the unit suite to compile and execute against pure-PHP Trusteed sources.
 *
 * Each declaration is guarded by `*_exists()` so this file is a no-op when the
 * real framework is autoloaded.
 *
 * @package Trusteed\AgenticCommerce\Test\Unit
 */

// ── Magento\Framework\Event ──────────────────────────────────────────────────

namespace Magento\Framework {
    if (!\class_exists(Event::class)) {
        class Event
        {
            public function getOrder()
            {
                return null;
            }

            public function getQuote()
            {
                return null;
            }

            public function getCreditmemo()
            {
                return null;
            }

            public function getMessage(): ?string
            {
                return null;
            }

            public function getPayment()
            {
                return null;
            }

            public function getAddress()
            {
                return null;
            }

            public function getRule()
            {
                return null;
            }
        }
    }
}

namespace Magento\Framework\Event {
    if (!\interface_exists(ObserverInterface::class)) {
        interface ObserverInterface
        {
            public function execute(Observer $observer);
        }
    }

    if (!\class_exists(Observer::class)) {
        class Observer
        {
            public function getEvent()
            {
                return null;
            }
        }
    }
}

// ── Magento\Framework\App\Config ─────────────────────────────────────────────

namespace Magento\Framework\App\Config {
    if (!\interface_exists(ScopeConfigInterface::class)) {
        interface ScopeConfigInterface
        {
            public function getValue($path, $scopeType = 'default', $scopeCode = null);

            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null);
        }
    }
}

// ── Magento\Framework\HTTP\Client ────────────────────────────────────────────

namespace Magento\Framework\HTTP\Client {
    if (!\class_exists(Curl::class)) {
        class Curl
        {
            public function setOption(int $option, $value): void
            {
            }

            public function setTimeout(int $seconds): void
            {
            }

            public function addHeader(string $name, string $value): void
            {
            }

            public function post(string $url, $body): void
            {
            }

            public function get(string $url): void
            {
            }

            public function getBody(): string
            {
                return '';
            }

            public function getStatus(): int
            {
                return 0;
            }
        }
    }
}

// ── Magento\Framework\App\CacheInterface ─────────────────────────────────────

namespace Magento\Framework\App {
    if (!\interface_exists(CacheInterface::class)) {
        interface CacheInterface
        {
            public function load($identifier);

            public function save($data, $identifier, $tags = [], $lifeTime = null);

            public function remove($identifier);

            public function clean($tags = []);
        }
    }
}

// ── Magento\Sales\Api ────────────────────────────────────────────────────────

namespace Magento\Sales\Api {
    if (!\interface_exists(OrderRepositoryInterface::class)) {
        interface OrderRepositoryInterface
        {
            public function getList(\Magento\Framework\Api\SearchCriteriaInterface $criteria);
        }
    }
    if (!\interface_exists(CreditmemoRepositoryInterface::class)) {
        interface CreditmemoRepositoryInterface
        {
            public function getList(\Magento\Framework\Api\SearchCriteriaInterface $criteria);
        }
    }
}

// ── Magento\Framework\Api ────────────────────────────────────────────────────

namespace Magento\Framework\Api {
    if (!\interface_exists(SearchCriteriaInterface::class)) {
        interface SearchCriteriaInterface
        {
        }
    }
    if (!\class_exists(SearchCriteriaBuilder::class)) {
        class SearchCriteriaBuilder
        {
            public function addFilters(array $filters): self
            {
                return $this;
            }

            public function create(): SearchCriteriaInterface
            {
                return new class implements SearchCriteriaInterface {};
            }
        }
    }
    if (!\class_exists(FilterBuilder::class)) {
        class FilterBuilder
        {
            public function setField(string $field): self
            {
                return $this;
            }

            public function setValue($value): self
            {
                return $this;
            }

            public function setConditionType(string $type): self
            {
                return $this;
            }

            public function create()
            {
                return new \stdClass();
            }
        }
    }
}

// ── Magento\Quote\Model ──────────────────────────────────────────────────────

namespace Magento\Quote\Model {
    if (!\class_exists(Quote::class)) {
        class Quote
        {
            /** @var float */
            public $grandTotal = 0.0;

            /** @var array<int,object> */
            public $visibleItems = [];

            public function getData($key = null, $index = null)
            {
                return null;
            }

            public function getCouponCode(): ?string
            {
                return null;
            }

            public function getGrandTotal(): float
            {
                return (float) $this->grandTotal;
            }

            /** @return array<int,object> */
            public function getAllVisibleItems(): array
            {
                return $this->visibleItems;
            }
        }
    }
}

namespace Magento\Quote\Model\Quote {
    if (!\class_exists(Item::class)) {
        class Item
        {
            /** @var float */
            public $rowTotalInclTax = 0.0;
            /** @var int|null */
            public $itemId = null;
            /** @var string|null */
            public $sku = null;

            public function getRowTotalInclTax(): float
            {
                return (float) $this->rowTotalInclTax;
            }

            public function getItemId(): ?int
            {
                return $this->itemId;
            }

            public function getSku(): ?string
            {
                return $this->sku;
            }
        }
    }
}

// ── Magento\Sales\Model ──────────────────────────────────────────────────────

namespace Magento\Sales\Model {
    if (!\class_exists(Order::class)) {
        class Order
        {
            public const STATE_NEW         = 'new';
            public const STATE_PROCESSING  = 'processing';
            public const STATE_CLOSED      = 'closed';
            public const STATE_CANCELED    = 'canceled';
            public const STATE_HOLDED      = 'holded';
            public const STATE_COMPLETE    = 'complete';
            public const STATE_PAYMENT_REVIEW = 'payment_review';

            public function getId(): ?int
            {
                return null;
            }

            public function getIncrementId(): ?string
            {
                return null;
            }

            public function getState(): ?string
            {
                return null;
            }

            public function getStatus(): ?string
            {
                return null;
            }

            public function getGrandTotal(): ?float
            {
                return null;
            }

            public function getStore()
            {
                return null;
            }

            public function getData($key = null, $index = null)
            {
                return null;
            }
        }
    }
}

// ── Magento\Store\Model\ScopeInterface ───────────────────────────────────────

namespace Magento\Store\Model {
    if (!\interface_exists(ScopeInterface::class)) {
        interface ScopeInterface
        {
            public const SCOPE_STORE = 'store';
            public const SCOPE_STORES = 'stores';
            public const SCOPE_WEBSITE = 'website';
            public const SCOPE_WEBSITES = 'websites';
            public const SCOPE_GROUP = 'group';
        }
    }
    if (!\interface_exists(StoreManagerInterface::class)) {
        interface StoreManagerInterface
        {
            public function getStore($storeId = null);
            public function getStores($withDefault = false, $codeKey = false);
            public function getWebsite($websiteId = null);
        }
    }
    if (!\class_exists(Store::class)) {
        class Store
        {
            public function getId()
            {
                return null;
            }
            public function getCode()
            {
                return null;
            }
            public function getName()
            {
                return null;
            }
            public function getBaseUrl($type = 'link', $secure = null)
            {
                return null;
            }
            public function isActive()
            {
                return false;
            }
        }
    }
}

// ── DB adapter, resource connection, PDO statement (Webhook/Outbox, Plugin) ───

namespace Magento\Framework\DB\Adapter {
    if (!\interface_exists(AdapterInterface::class)) {
        interface AdapterInterface
        {
            public function getTableName($tableName);
            public function insert($table, array $bind);
            public function update($table, array $bind, $where = '');
            public function delete($table, $where = '');
            public function query($sql, $bind = []);
            public function fetchAll($sql, $bind = [], $fetchMode = null);
            public function fetchOne($sql, $bind = []);
            public function fetchRow($sql, $bind = [], $fetchMode = null);
            public function lastInsertId($tableName = null, $primaryKey = null);
            public function quoteInto($text, $value, $type = null, $count = null);
            public function select();
            public function beginTransaction();
            public function commit();
            public function rollBack();
        }
    }
}

namespace Magento\Framework\DB\Statement\Pdo {
    if (!\class_exists(Mysql::class)) {
        class Mysql
        {
        }
    }
}

// ── Resource connection ───────────────────────────────────────────────────────

namespace Magento\Framework\App {
    if (!\class_exists(ResourceConnection::class)) {
        class ResourceConnection
        {
            public function getConnection($resourceName = 'default')
            {
                return null;
            }
            public function getTableName($modelEntity, $connectionName = 'default')
            {
                return $modelEntity;
            }
        }
    }
}

// ── Encryptor ─────────────────────────────────────────────────────────────────

namespace Magento\Framework\Encryption {
    if (!\interface_exists(EncryptorInterface::class)) {
        interface EncryptorInterface
        {
            public function encrypt($data);
            public function decrypt($data);
            public function hash($data, $version = null);
            public function validateHash($password, $hash);
            public function getHash($password, $salt = false, $version = null);
        }
    }
}

// ── Cache frontend + event manager (Manifest\Builder deps) ────────────────────

namespace Magento\Framework\Cache {
    if (!\interface_exists(FrontendInterface::class)) {
        interface FrontendInterface
        {
            public function load($identifier);
            public function save($data, $identifier, array $tags = [], $lifeTime = null);
            public function remove($identifier);
        }
    }
}

namespace Magento\Framework\Event {
    if (!\interface_exists(ManagerInterface::class)) {
        interface ManagerInterface
        {
            public function dispatch($eventName, array $data = []);
        }
    }
}

// ── Sales order interface + extension attributes (Plugin/OrderExtension) ──────

namespace Magento\Sales\Api\Data {
    if (!\interface_exists(OrderInterface::class)) {
        interface OrderInterface
        {
            public function getEntityId();
            public function getIncrementId();
            public function getExtensionAttributes();
        }
    }
    if (!\interface_exists(OrderExtensionInterface::class)) {
        interface OrderExtensionInterface
        {
            public function getTrusteedReceiptUri();
            public function setTrusteedReceiptUri($uri);
        }
    }
}

// ── Store data interface (Manifest\Builder) ───────────────────────────────────

namespace Magento\Store\Api\Data {
    if (!\interface_exists(StoreInterface::class)) {
        interface StoreInterface
        {
            public function getId();
            public function getCode();
            public function getName();
            public function getBaseUrl($type = 'link', $secure = null);
            public function isActive();
        }
    }
}

// ── Creditmemo (Observer/SalesCreditmemoSaveAfter) ────────────────────────────

namespace Magento\Sales\Model\Order {
    if (!\class_exists(Creditmemo::class)) {
        class Creditmemo
        {
            public function getOrder()
            {
                return null;
            }
            public function getId(): ?int
            {
                return null;
            }
            public function getGrandTotal(): ?float
            {
                return null;
            }
            public function getCreatedAt(): ?string
            {
                return null;
            }
        }
    }
}

