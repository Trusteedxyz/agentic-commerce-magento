<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * Consume el fixture compartido del flujo principal
 * (packages/shared/src/enforcement/__fixtures__/platform-flow-conformance.json),
 * el mismo que valida la referencia TS `platform-flow.ts`.
 *
 * Cada bloque cuenta los vectores que EJECUTA (no basta con «verde»: un bloque
 * que no corre nada también sale verde). `serverRouting` no aplica a Magento:
 * `EnforcementClient::evaluate()` no evalúa ninguna regla localmente y pregunta
 * siempre al servidor, así que no hay decisión de enrutado que portar; un test
 * comprueba que el fixture no trae ningún vector para Magento.
 */
final class FailurePolicyConformanceTest extends TestCase
{
    private static function fixture(): array
    {
        $path = __DIR__ . '/../../../../shared/src/enforcement/__fixtures__/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json, 'el fixture tiene que ser alcanzable desde el monorepo');
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

    /** Los 21 vectores contra el port puro, que compara EXACTAMENTE como la referencia. */
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
     * CARRY de la Task 1: el port normaliza su modo contra SU vocabulario
     * (enforce|observe) antes de llamar a la política. Un valor de otro
     * vocabulario (`permissive`, `balanced`, `strict`) es «no resuelto» y
     * cierra a un agente; a un humano nunca lo toca.
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

    /** Task 27c (M6): una avería propia no depende del modo: agente BLOCK, humano ALLOW. */
    public function testAnInternalErrorHoldsAnAgentAndNeverAHuman(): void
    {
        self::assertSame('BLOCK', FailurePolicy::decideOnInternalError(true));
        self::assertSame('ALLOW', FailurePolicy::decideOnInternalError(false));
    }
}
