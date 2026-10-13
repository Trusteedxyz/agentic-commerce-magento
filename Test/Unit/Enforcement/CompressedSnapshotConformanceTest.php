<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\SnapshotJwsVerifier;
use Trusteed\AgenticCommerce\Enforcement\SnapshotPayloadDecoder;

/**
 * The `compressedSnapshot` section of the shared fixture against the Magento
 * port: the 12 vectors through `SnapshotJwsVerifier::verify()` (signature
 * first, with the fixture JWKS) and the 11 whose signature verifies through
 * `SnapshotPayloadDecoder::decode()` with their reason. Each block counts what
 * it EXECUTES.
 */
final class CompressedSnapshotConformanceTest extends TestCase
{
    private static function section(): array
    {
        $path = __DIR__ . '/../../fixtures/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json, 'the fixture must be reachable');
        return $json['compressedSnapshot'];
    }

    /** @return callable(bool): array<string,string> */
    private static function fixtureJwks(): callable
    {
        $keys = [];
        foreach (self::section()['jwks']['keys'] as $k) {
            $keys[$k['kid']] = (string) SnapshotJwsVerifier::b64urlDecode($k['x']);
        }
        return static fn (bool $force): array => $keys;
    }

    public function testTheFixtureCapIsThePortCap(): void
    {
        self::assertSame(SnapshotPayloadDecoder::MAX_INFLATED_BYTES, self::section()['maxInflatedBytes']);
        self::assertSame('DEF', SnapshotPayloadDecoder::ZIP_DEFLATE);
    }

    public function testEveryVectorThroughTheVerifier(): void
    {
        $run = 0;
        foreach (self::section()['vectors'] as $v) {
            $out = SnapshotJwsVerifier::verify($v['jws'], self::fixtureJwks());
            self::assertSame($v['expected']['status'], $out['status'], $v['id']);
            if ($out['status'] === SnapshotJwsVerifier::OK) {
                self::assertSame($v['expected']['ruleSetVersion'], $out['payload']['ruleSetVersion'], $v['id']);
                self::assertSame($v['expected']['merchantId'], $out['payload']['merchantId'], $v['id']);
                self::assertCount($v['expected']['agentDidResolverCount'], $out['payload']['agentDidResolver'], $v['id']);
            } elseif ($out['status'] === SnapshotJwsVerifier::UNAVAILABLE) {
                self::assertSame('payload_' . $v['expected']['reason'], $out['detail'], $v['id']);
            }
            $run++;
        }
        self::assertSame(12, $run);
    }

    public function testEverySignatureValidVectorThroughTheDecoderWithItsReason(): void
    {
        $run = 0;
        foreach (self::section()['vectors'] as $v) {
            if ($v['expected']['status'] === 'tampered') {
                continue;
            }
            [$h, $p] = explode('.', $v['jws']);
            $header = json_decode((string) SnapshotJwsVerifier::b64urlDecode($h), true);
            [$reason, $payload] = SnapshotPayloadDecoder::decode($header, (string) SnapshotJwsVerifier::b64urlDecode($p));
            if ($v['expected']['status'] === 'ok') {
                self::assertSame(SnapshotPayloadDecoder::OK, $reason, $v['id']);
                self::assertSame($v['expected']['ruleSetVersion'], $payload['ruleSetVersion'], $v['id']);
            } else {
                self::assertSame($v['expected']['reason'], $reason, $v['id']);
                self::assertNull($payload, $v['id']);
            }
            $run++;
        }
        self::assertSame(11, $run);
    }

    public function testTheBombIsRejectedWithoutReservingMoreThanTheCap(): void
    {
        $bomb = null;
        foreach (self::section()['vectors'] as $v) {
            if ($v['id'] === 'bomb.over-cap') {
                $bomb = $v['jws'];
            }
        }
        [$h, $p] = explode('.', (string) $bomb);
        $header  = json_decode((string) SnapshotJwsVerifier::b64urlDecode($h), true);
        $before  = memory_get_usage();
        memory_reset_peak_usage();
        [$reason] = SnapshotPayloadDecoder::decode($header, (string) SnapshotJwsVerifier::b64urlDecode($p));

        self::assertSame(SnapshotPayloadDecoder::INFLATE_OVER_CAP, $reason);
        self::assertLessThan(6 * 1024 * 1024, memory_get_peak_usage() - $before, 'la bomba (8 MiB) no se infla entera');
    }
}
