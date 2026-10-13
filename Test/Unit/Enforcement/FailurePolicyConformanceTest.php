<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * Consumes the shared fixture of the main flow
 * (Test/fixtures/platform-flow-conformance.json),
 * the same one that validates the TS reference `platform-flow.ts`.
 *
 * Each block counts the vectors it EXECUTES (a plain "green" is not enough: a
 * block that runs nothing also comes out green). `serverRouting` does not apply
 * to Magento: `EnforcementClient::evaluate()` does not evaluate any rule locally
 * and always asks the server, so there is no routing decision to port; a test
 * checks that the fixture carries no vector for Magento.
 */
final class FailurePolicyConformanceTest extends TestCase
{
    private static function fixture(): array
    {
        $path = __DIR__ . '/../../fixtures/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json, 'the fixture must be reachable');
        return $json;
    }

    public function testAgenticDetectionVectors(): void
    {
        $run = 0;
        foreach (self::fixture()['agenticDetection'] as $v) {
            $s = $v['signals'];
            self::assertSame(
                $v['expected'],
                FailurePolicy::isAgentic($s['agentId'], $s['tokenPresent'], $s['originMarker']),
                $v['id']
            );
            $run++;
        }
        self::assertSame(6, $run, 'vectores agenticDetection ejecutados');
    }

    public function testServerRoutingHasNoMagentoVector(): void
    {
        $ports = array_values(array_unique(array_map(
            static fn (array $v): string => $v['port'],
            self::fixture()['serverRouting']
        )));
        sort($ports);
        self::assertSame(['prestashop', 'woocommerce_agentictools'], $ports, 'Magento no enruta por regla local');
    }

    public function testOfflineValveScopeVectors(): void
    {
        $run = 0;
        foreach (self::fixture()['offlineValveScope'] as $v) {
            $codes = array_map(
                static fn (array $r): string => $r['ruleCode'],
                FailurePolicy::offlineRulesFor($v['rules'], $v['isAgentic'])
            );
            self::assertSame($v['expectedCodes'], $codes, $v['id']);
            $run++;
        }
        self::assertSame(6, $run, 'vectores offlineValveScope ejecutados');
    }

    public function testOfflineRulesForDoesNotMutateItsInput(): void
    {
        $rules = [
            ['ruleCode' => 'R029', 'enabled' => true, 'appliesTo' => 'AGENT'],
            ['ruleCode' => 'R030', 'enabled' => true, 'appliesTo' => 'ALL'],
        ];
        $copy = $rules;
        $out  = FailurePolicy::offlineRulesFor($rules, false);
        self::assertSame($copy, $rules);
        self::assertSame([['ruleCode' => 'R030', 'enabled' => true, 'appliesTo' => 'ALL']], $out, 'reindexado desde 0');
    }

    /** The 21 vectors against the pure port, which compares EXACTLY like the reference. */
    public function testUnavailableDecisionVectors(): void
    {
        $run = 0;
        foreach (self::fixture()['unavailableDecision'] as $v) {
            self::assertSame(
                $v['expected'],
                FailurePolicy::decideUnavailable($v['isAgentic'], $v['failureMode'], $v['offlineBlock']),
                $v['id']
            );
            $run++;
        }
        self::assertSame(21, $run, 'vectores unavailableDecision ejecutados');
    }

    /**
     * The port normalizes its mode against ITS vocabulary
     * (enforce|observe) before calling the policy. A value from another
     * vocabulary (`permissive`, `balanced`, `strict`) is "unresolved" and
     * fails closed for an agent; it never touches a human.
     */
    public function testFailureModeNormalizationAgainstThisVocabulary(): void
    {
        $fx      = self::fixture();
        $vocab   = $fx['_vocabulary']['failureModes']['magento'];
        $opening = $fx['_vocabulary']['agentOpeningFailureModes']['magento'];
        self::assertSame(FailurePolicy::FAILURE_MODES, $vocab, 'vocabulario del port = fixture');

        $run = 0;
        foreach ($vocab as $mode) {
            self::assertSame($mode, FailurePolicy::normalizeFailureMode($mode), $mode);
            self::assertSame($mode, FailurePolicy::normalizeFailureMode('  ' . strtoupper($mode) . ' '), $mode);
            $agent = FailurePolicy::decideUnavailable(true, FailurePolicy::normalizeFailureMode($mode), false);
            self::assertSame(in_array($mode, $opening, true) ? 'ALLOW' : 'BLOCK', $agent, 'agente con ' . $mode);
            $run++;
        }

        $foreign = [];
        foreach ($fx['_vocabulary']['failureModes'] as $modes) {
            foreach ($modes as $mode) {
                if (!in_array($mode, $vocab, true)) {
                    $foreign[$mode] = true;
                }
            }
        }
        self::assertSame(['strict', 'balanced', 'permissive'], array_keys($foreign));
        foreach (array_keys($foreign) as $mode) {
            $normalized = FailurePolicy::normalizeFailureMode($mode);
            self::assertNull($normalized, $mode . ' no es de este vocabulario');
            self::assertSame('BLOCK', FailurePolicy::decideUnavailable(true, $normalized, false), 'agente con ' . $mode);
            self::assertSame('ALLOW', FailurePolicy::decideUnavailable(false, $normalized, false), 'humano con ' . $mode);
            $run++;
        }

        foreach ($fx['_vocabulary']['unresolvedFailureModeSamples'] as $raw) {
            $normalized = FailurePolicy::normalizeFailureMode($raw);
            self::assertSame('BLOCK', FailurePolicy::decideUnavailable(true, $normalized, false), 'agente con ' . var_export($raw, true));
            self::assertSame('ALLOW', FailurePolicy::decideUnavailable(false, $normalized, false), 'humano con ' . var_export($raw, true));
            $run++;
        }
        self::assertSame(2 + 3 + 4, $run, 'modos ejecutados: vocabulario + ajenos + muestras no resueltas');
    }

    public function testAbsentFailureModeResolvesToTheDefaultEnforce(): void
    {
        self::assertSame('enforce', FailurePolicy::normalizeFailureMode(null));
        self::assertSame('enforce', FailurePolicy::normalizeFailureMode('   '));
        self::assertSame('BLOCK', FailurePolicy::decideUnavailable(true, null, false), 'no resuelto cierra a un agente');
    }

    /** An internal failure does not depend on the mode: agent BLOCK, human ALLOW. */
    public function testAnInternalErrorHoldsAnAgentAndNeverAHuman(): void
    {
        self::assertSame('BLOCK', FailurePolicy::decideOnInternalError(true));
        self::assertSame('ALLOW', FailurePolicy::decideOnInternalError(false));
    }
}
