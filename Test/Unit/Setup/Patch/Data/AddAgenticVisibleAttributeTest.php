<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Setup\Patch\Data;

use PHPUnit\Framework\TestCase;

/**
 * Spec-050 FR-A-013 — unit test for the AddAgenticVisibleAttribute data patch.
 *
 * Validates that the patch declares the expected EAV attribute on both
 * `catalog_product` and `catalog_category` with the correct flags (boolean,
 * default 1, user_defined, applied to all sellable product types).
 *
 * The test stubs the Magento EAV setup surfaces locally so it runs without
 * the Magento framework being installed (see bootstrap.php — only loaded when
 * the real classes are absent).
 */
final class AddAgenticVisibleAttributeTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        require_once __DIR__ . '/../../../stubs/MagentoEavSetupStubs.php';
        require_once __DIR__
            . '/../../../../../Setup/Patch/Data/AddAgenticVisibleAttribute.php';
    }

    public function testApplyAddsProductAndCategoryAttributes(): void
    {
        $productSetup = new FakeEavSetup();
        $categorySetup = new FakeCategorySetup();

        $moduleDataSetup = new FakeModuleDataSetup();
        $eavSetupFactory = new FakeFactory($productSetup);
        $categorySetupFactory = new FakeFactory($categorySetup);

        $patch = new \Trusteed\AgenticCommerce\Setup\Patch\Data\AddAgenticVisibleAttribute(
            $moduleDataSetup,
            $eavSetupFactory,
            $categorySetupFactory
        );

        $patch->apply();

        // Product attribute registered.
        self::assertArrayHasKey(
            'is_agentic_visible',
            $productSetup->added['catalog_product'] ?? []
        );
        $productAttr = $productSetup->added['catalog_product']['is_agentic_visible'];
        self::assertSame('int', $productAttr['type']);
        self::assertSame('boolean', $productAttr['input']);
        self::assertSame('1', $productAttr['default']);
        self::assertTrue($productAttr['user_defined']);
        self::assertFalse($productAttr['visible_on_front']);
        self::assertStringContainsString('simple', $productAttr['apply_to']);
        self::assertStringContainsString('configurable', $productAttr['apply_to']);
        self::assertStringContainsString('bundle', $productAttr['apply_to']);
        self::assertStringContainsString('virtual', $productAttr['apply_to']);
        self::assertStringContainsString('downloadable', $productAttr['apply_to']);

        // Category attribute registered.
        self::assertArrayHasKey(
            'is_agentic_visible',
            $categorySetup->added['catalog_category'] ?? []
        );
        $categoryAttr = $categorySetup->added['catalog_category']['is_agentic_visible'];
        self::assertSame('boolean', $categoryAttr['input']);
        self::assertSame('1', $categoryAttr['default']);
        self::assertTrue($categoryAttr['user_defined']);
    }

    public function testApplyIsIdempotentWhenAttributeAlreadyExists(): void
    {
        $productSetup = new FakeEavSetup();
        $productSetup->existingAttributes['catalog_product']['is_agentic_visible'] = 42;

        $categorySetup = new FakeCategorySetup();
        $categorySetup->existingAttributes['catalog_category']['is_agentic_visible'] = 43;

        $patch = new \Trusteed\AgenticCommerce\Setup\Patch\Data\AddAgenticVisibleAttribute(
            new FakeModuleDataSetup(),
            new FakeFactory($productSetup),
            new FakeFactory($categorySetup)
        );

        $patch->apply();

        // No new additions because attribute already existed.
        self::assertSame([], $productSetup->added);
        self::assertSame([], $categorySetup->added);
    }

    public function testDependenciesAndAliasesAreEmptyByDefault(): void
    {
        self::assertSame(
            [],
            \Trusteed\AgenticCommerce\Setup\Patch\Data\AddAgenticVisibleAttribute::getDependencies()
        );

        $patch = new \Trusteed\AgenticCommerce\Setup\Patch\Data\AddAgenticVisibleAttribute(
            new FakeModuleDataSetup(),
            new FakeFactory(new FakeEavSetup()),
            new FakeFactory(new FakeCategorySetup())
        );

        self::assertSame([], $patch->getAliases());
    }
}
