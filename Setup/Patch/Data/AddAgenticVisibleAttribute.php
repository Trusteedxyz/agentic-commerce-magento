<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Setup\Patch\Data;

use Magento\Catalog\Model\Category;
use Magento\Catalog\Model\Product;
use Magento\Catalog\Setup\CategorySetupFactory;
use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\Patch\PatchRevertableInterface;

/**
 * Spec-050 FR-A-013 — Agentic visibility flag for products and categories.
 *
 * Adds a boolean EAV attribute `is_agentic_visible` (default 1) to:
 *   - catalog_product (all sellable types)
 *   - catalog_category
 *
 * Merchants can toggle this off from the admin form to exclude an item from
 * agentic surfaces (MCP server tools, WebMCP bridge, agent-facing tool calls).
 *
 * Connector enforcement lives in
 * `packages/connectors/magento/src/connector.ts` (filter applied by default in
 * getProducts/getProduct/getCategories; `includeHidden:true` bypass is for
 * admin tooling only).
 *
 * Idempotent — Magento's patch registry guarantees apply() runs exactly once
 * per environment. Re-running setup:upgrade is safe.
 */
class AddAgenticVisibleAttribute implements DataPatchInterface, PatchRevertableInterface
{
    public const ATTRIBUTE_CODE = 'is_agentic_visible';

    private const GROUP_NAME = 'Agentic Commerce';

    public function __construct(
        private readonly ModuleDataSetupInterface $moduleDataSetup,
        private readonly EavSetupFactory $eavSetupFactory,
        private readonly CategorySetupFactory $categorySetupFactory,
    ) {}

    public function apply(): self
    {
        $this->moduleDataSetup->getConnection()->startSetup();

        $this->addProductAttribute();
        $this->addCategoryAttribute();

        $this->moduleDataSetup->getConnection()->endSetup();

        return $this;
    }

    public function revert(): void
    {
        $this->moduleDataSetup->getConnection()->startSetup();

        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['setup' => $this->moduleDataSetup]);

        if ($eavSetup->getAttributeId(Product::ENTITY, self::ATTRIBUTE_CODE)) {
            $eavSetup->removeAttribute(Product::ENTITY, self::ATTRIBUTE_CODE);
        }

        /** @var EavSetup $categorySetup */
        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);

        if ($categorySetup->getAttributeId(Category::ENTITY, self::ATTRIBUTE_CODE)) {
            $categorySetup->removeAttribute(Category::ENTITY, self::ATTRIBUTE_CODE);
        }

        $this->moduleDataSetup->getConnection()->endSetup();
    }

    public static function getDependencies(): array
    {
        return [];
    }

    public function getAliases(): array
    {
        return [];
    }

    private function addProductAttribute(): void
    {
        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['setup' => $this->moduleDataSetup]);

        if ($eavSetup->getAttributeId(Product::ENTITY, self::ATTRIBUTE_CODE)) {
            return;
        }

        $eavSetup->addAttribute(
            Product::ENTITY,
            self::ATTRIBUTE_CODE,
            [
                'type' => 'int',
                'backend' => '',
                'frontend' => '',
                'label' => 'Visible to Agents',
                'note' => 'When disabled, this product is excluded from agentic surfaces (MCP, WebMCP, agent tool calls).',
                'input' => 'boolean',
                'class' => '',
                'source' => 'Magento\Eav\Model\Entity\Attribute\Source\Boolean',
                'global' => 1, // SCOPE_GLOBAL — same flag across all store views
                'visible' => true,
                'required' => false,
                'user_defined' => true,
                'default' => '1',
                'searchable' => false,
                'filterable' => false,
                'comparable' => false,
                'visible_on_front' => false,
                'visible_in_advanced_search' => false,
                'used_in_product_listing' => true,
                'unique' => false,
                'apply_to' => 'simple,configurable,virtual,downloadable,bundle,grouped',
                'group' => self::GROUP_NAME,
                'sort_order' => 10,
                'is_used_in_grid' => true,
                'is_visible_in_grid' => true,
                'is_filterable_in_grid' => true,
            ]
        );
    }

    private function addCategoryAttribute(): void
    {
        /** @var EavSetup $categorySetup */
        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);

        if ($categorySetup->getAttributeId(Category::ENTITY, self::ATTRIBUTE_CODE)) {
            return;
        }

        $categorySetup->addAttribute(
            Category::ENTITY,
            self::ATTRIBUTE_CODE,
            [
                'type' => 'int',
                'label' => 'Visible to Agents',
                'note' => 'When disabled, this category (and its products by default catalog rules) is excluded from agentic surfaces.',
                'input' => 'boolean',
                'source' => 'Magento\Eav\Model\Entity\Attribute\Source\Boolean',
                'global' => 1,
                'visible' => true,
                'required' => false,
                'user_defined' => true,
                'default' => '1',
                'searchable' => false,
                'filterable' => false,
                'comparable' => false,
                'visible_on_front' => false,
                'used_in_product_listing' => false,
                'unique' => false,
                'group' => self::GROUP_NAME,
                'sort_order' => 10,
            ]
        );
    }
}
