<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * The `degradedEnforcement` and `snapshotResolverShape` sections of the shared
 * fixture (Test/fixtures/platform-flow-conformance.json) against the Magento PHP port
 * (`FailurePolicy::decideDegraded` and `FailurePolicy::resolveAgentDidPublicKey`).
 *
 * Each block counts the vectors it EXECUTES: a block that runs nothing also
 * comes out green.
 */
final class DegradedEnforcementConformanceTest extends TestCase
{
    private static function fixture(): array
    {
        $path = __DIR__ . '/../../fixtures/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json, 'the fixture must be reachable');
        return $json;
    }

    /** @return list<array<string,mixed>> */
    private static function vectors(?string $port): array
    {
        $all = self::fixture()['degradedEnforcement']['vectors'];
        return array_values(array_filter($all, static fn (array $v): bool => $port === null || $v['port'] === $port));
    }

    private static function decide(array $v, ?string $mode): string
    {
        return FailurePolicy::decideDegraded($v['kind'], $v['isAgentic'], $v['tokenPresent'], $mode, $v['offlineBlock']);
    }

    /** The 17 Magento vectors, with the mode ALREADY resolved as the vector carries it. */
    public function testMagentoDegradedVectors(): void
    {
        $run = 0;
        foreach (self::vectors('magento') as $v) {
            self::assertSame($v['expected'], self::decide($v, $v['failureMode']), $v['id']);
            $run++;
        }
        self::assertSame(17, $run, 'vectores degradedEnforcement.magento ejecutados');
    }

    /**
     * The same 17 going through the module's mode resolver
     * (`normalizeFailureMode`, the one `EnforcementClient` uses): the `''` of the
     * "unresolved" vector is here an ABSENT mode, which the module resolves to
     * `enforce` and also fails closed; the result does not change in any vector.
     */
    public function testMagentoDegradedVectorsThroughTheModuleModeResolver(): void
    {
        $run = 0;
        foreach (self::vectors('magento') as $v) {
            self::assertSame($v['expected'], self::decide($v, FailurePolicy::normalizeFailureMode($v['failureMode'])), $v['id']);
            $run++;
        }
        self::assertSame(17, $run);
    }

    /** The port is literal: it also reproduces the vectors of the other ports. */
    public function testEveryPortVectorAgainstThePurePort(): void
    {
        $run = 0;
        foreach (self::vectors(null) as $v) {
            self::assertSame($v['expected'], self::decide($v, $v['failureMode']), $v['id']);
            $run++;
        }
        self::assertSame(100, $run, 'vectores degradedEnforcement (todos los ports) ejecutados');
    }

    public function testUnknownKindClosesAnAgentAndNeverAHuman(): void
    {
        self::assertSame('BLOCK', FailurePolicy::decideDegraded('snapshot_on_fire', true, false, 'observe', false));
        self::assertSame('BLOCK', FailurePolicy::decideDegraded('', false, true, 'observe', false), 'token = agente');
        self::assertSame('ALLOW', FailurePolicy::decideDegraded('snapshot_on_fire', false, false, 'observe', true));
    }

    public function testKindConstantsMatchTheReferenceVocabulary(): void
    {
        $kinds = array_values(array_unique(array_map(static fn (array $v): string => $v['kind'], self::vectors(null))));
        sort($kinds);
        $mine = [
            FailurePolicy::KIND_EVALUATOR_UNAVAILABLE,
            FailurePolicy::KIND_INVALID_SIGNATURE,
            FailurePolicy::KIND_LAYER_DISABLED,
            FailurePolicy::KIND_MISSING_SNAPSHOT,
        ];
        self::assertSame($kinds, $mine);
    }

    /** The 19 resolver shape vectors (list, map, malformed, others). */
    public function testSnapshotResolverShapeVectors(): void
    {
        $run = 0;
        foreach (self::fixture()['snapshotResolverShape']['vectors'] as $v) {
            self::assertSame(
                self::sorted($v['expected']),
                self::sorted(FailurePolicy::resolveAgentDidPublicKey($v['resolver'], $v['did'])),
                $v['id']
            );
            $run++;
        }
        self::assertSame(19, $run, 'vectores snapshotResolverShape ejecutados');
    }

    /** The REAL `snapshotPayload` resolves its two DIDs (list, one with `kid`). */
    public function testTheRealSnapshotPayloadResolvesBothDids(): void
    {
        $payload  = self::fixture()['snapshotResolverShape']['snapshotPayload'];
        $resolver = $payload['agentDidResolver'];
        self::assertTrue(array_is_list($resolver), 'el servidor emite una LISTA');
        $run = 0;
        foreach ($resolver as $entry) {
            $key = FailurePolicy::resolveAgentDidPublicKey($resolver, $entry['did']);
            self::assertNotNull($key, $entry['did']);
            self::assertSame($entry['publicKeyJwk']['x'], $key['x']);
            $run++;
        }
        self::assertSame(2, $run);
    }

    /** No garbage shape throws (PHP: strings, nested lists, numeric keys). */
    public function testGarbageNeverThrows(): void
    {
        $did = 'did:web:agent-a.example.com';
        foreach ([null, 'x', 7, 1.5, true, [[]], [null], [['did' => $did, 'publicKeyJwk' => 'x']],
            [['did' => $did, 'publicKeyJwk' => ['x' => ['nested']]]], [$did => 'x'], [$did => ['x' => '']]] as $resolver) {
            self::assertNull(FailurePolicy::resolveAgentDidPublicKey($resolver, $did), var_export($resolver, true));
        }
        self::assertNull(FailurePolicy::resolveAgentDidPublicKey([['did' => '', 'publicKeyJwk' => ['x' => 'k']]], ''));
    }

    /** @param array<string,string>|null $key */
    private static function sorted(?array $key): ?array
    {
        if ($key === null) {
            return null;
        }
        ksort($key);
        return $key;
    }
}
