<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Trusteed\AgenticCommerce\Enforcement\OfflineSafetyValveEvaluator;
use PHPUnit\Framework\TestCase;

/**
 * App Store remediation follow-up (2026-07-11/12) — cross-language
 * conformance test. Loads the SAME fixture consumed by
 * packages/shared/src/enforcement/__tests__/offline-safety-valve-conformance.test.ts
 * and the WooCommerce/PrestaShop plugins' equivalents, and asserts
 * OfflineSafetyValveEvaluator matches the canonical TS evaluators for every
 * vector.
 */
final class OfflineSafetyValveConformanceTest extends TestCase
{
    private function loadFixture(): array
    {
        $path = __DIR__ . '/../../fixtures/offline-safety-valve-conformance.json';
        $this->assertFileExists($path, 'conformance fixture must be reachable from the monorepo layout');
        $json = json_decode((string) file_get_contents($path), true);
        $this->assertIsArray($json);
        return $json['vectors'];
    }

    public function testFixtureHasVectorsForEveryImplementedRule(): void
    {
        $vectors = $this->loadFixture();
        $codes = array_unique(array_map(static fn($v) => $v['ruleCode'], $vectors));
        sort($codes);
        $this->assertSame(
            ['R014', 'R018', 'R019', 'R020', 'R025', 'R027', 'R028', 'R029', 'R030'],
            $codes
        );
    }

    /**
     * @dataProvider vectorProvider
     */
    public function testVectorMatchesExpectation(array $vector): void
    {
        $rules = [
            [
                'ruleCode' => $vector['ruleCode'],
                'enabled' => true,
                'params' => $vector['params'],
            ],
        ];
        $result = OfflineSafetyValveEvaluator::evaluate(
            $rules,
            $vector['orderContext'],
            $vector['cartAttributes']
        );

        if ($vector['expectedMatch']) {
            $this->assertNotNull(
                $result,
                "vector '{$vector['id']}' ({$vector['ruleCode']}) expected a BLOCK but got ALLOW"
            );
            $this->assertSame($vector['ruleCode'], $result['ruleCode']);
        } else {
            $this->assertNull(
                $result,
                "vector '{$vector['id']}' ({$vector['ruleCode']}) expected ALLOW but got BLOCK: " . ($result['reason'] ?? '')
            );
        }
    }

    public static function vectorProvider(): array
    {
        $path = __DIR__ . '/../../fixtures/offline-safety-valve-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        $cases = [];
        foreach ($json['vectors'] as $vector) {
            $cases[$vector['id']] = [$vector];
        }
        return $cases;
    }
}
