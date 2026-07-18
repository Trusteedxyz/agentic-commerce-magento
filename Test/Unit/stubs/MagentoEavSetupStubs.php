<?php

declare(strict_types=1);

/**
 * Minimal Magento EAV setup stubs for the spec-050 FR-A-013 patch unit test.
 *
 * Only includes the surface exercised by AddAgenticVisibleAttribute:
 *   - Magento\Eav\Setup\EavSetup (getAttributeId, addAttribute, removeAttribute)
 *   - Magento\Eav\Setup\EavSetupFactory (create)
 *   - Magento\Catalog\Setup\CategorySetupFactory (create)
 *   - Magento\Catalog\Model\Product (ENTITY const)
 *   - Magento\Catalog\Model\Category (ENTITY const)
 *   - Magento\Framework\Setup\ModuleDataSetupInterface (+ Patch interfaces)
 *
 * Each declaration is guarded so the real classes (CI with Magento installed)
 * override these unconditionally.
 *
 * @package Trusteed\AgenticCommerce\Test\Unit
 */

namespace Magento\Eav\Setup {
    if (!\class_exists(EavSetup::class)) {
        class EavSetup
        {
            public function getAttributeId(string $entityType, string $code)
            {
                return null;
            }
            public function addAttribute(string $entityType, string $code, array $data): void {}
            public function removeAttribute(string $entityType, string $code): void {}
        }
    }
    if (!\class_exists(EavSetupFactory::class)) {
        class EavSetupFactory
        {
            public function create(array $args = []): EavSetup { return new EavSetup(); }
        }
    }
}

namespace Magento\Catalog\Setup {
    // In this standalone stub CategorySetupFactory extends EavSetupFactory so a
    // single test double (FakeFactory) can satisfy BOTH the EavSetupFactory and
    // CategorySetupFactory constructor typehints of AddAgenticVisibleAttribute.
    if (!\class_exists(CategorySetupFactory::class)) {
        class CategorySetupFactory extends \Magento\Eav\Setup\EavSetupFactory
        {
            public function create(array $args = []): \Magento\Eav\Setup\EavSetup
            {
                return new \Magento\Eav\Setup\EavSetup();
            }
        }
    }
}

namespace Magento\Catalog\Model {
    if (!\class_exists(Product::class)) {
        class Product
        {
            public const ENTITY = 'catalog_product';
        }
    }
    if (!\class_exists(Category::class)) {
        class Category
        {
            public const ENTITY = 'catalog_category';
        }
    }
}

namespace Magento\Framework\Setup {
    if (!\interface_exists(ModuleDataSetupInterface::class)) {
        interface ModuleDataSetupInterface
        {
            public function getConnection();
        }
    }
}

namespace Magento\Framework\Setup\Patch {
    if (!\interface_exists(DataPatchInterface::class)) {
        interface DataPatchInterface
        {
            public function apply();
            public static function getDependencies(): array;
            public function getAliases(): array;
        }
    }
    if (!\interface_exists(PatchRevertableInterface::class)) {
        interface PatchRevertableInterface
        {
            public function revert(): void;
        }
    }
}

// ── Test-side fakes (used directly by AddAgenticVisibleAttributeTest) ───────

namespace Trusteed\AgenticCommerce\Test\Unit\Setup\Patch\Data {

    final class FakeConnection
    {
        public function startSetup(): void {}
        public function endSetup(): void {}
    }

    final class FakeModuleDataSetup implements \Magento\Framework\Setup\ModuleDataSetupInterface
    {
        public function getConnection()
        {
            return new FakeConnection();
        }
    }

    /**
     * Captures addAttribute calls so the test can assert on the registered
     * EAV attribute spec.
     */
    class FakeEavSetup extends \Magento\Eav\Setup\EavSetup
    {
        /** @var array<string, array<string, int>> */
        public array $existingAttributes = [];
        /** @var array<string, array<string, array<string, mixed>>> */
        public array $added = [];

        public function getAttributeId(string $entityType, string $code)
        {
            return $this->existingAttributes[$entityType][$code] ?? null;
        }

        public function addAttribute(string $entityType, string $code, array $data): void
        {
            $this->added[$entityType][$code] = $data;
        }
    }

    /**
     * CategorySetupFactory in real Magento returns an EavSetup-compatible
     * object (it extends it). We mirror that with FakeCategorySetup so the
     * patch can call the same EAV API on either.
     */
    class FakeCategorySetup extends FakeEavSetup {}

    /**
     * Generic factory that returns a pre-built instance — Magento factories
     * normally accept a `['setup' => ModuleDataSetupInterface]` argument; we
     * ignore it for the test.
     */
    final class FakeFactory extends \Magento\Catalog\Setup\CategorySetupFactory
    {
        public function __construct(private readonly object $instance) {}

        public function create(array $args = []): \Magento\Eav\Setup\EavSetup
        {
            return $this->instance;
        }
    }
}
