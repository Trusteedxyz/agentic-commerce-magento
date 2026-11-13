<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Security;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacKeys;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

require_once __DIR__ . '/../../../Model/Security/InternalHmacSigner.php';
require_once __DIR__ . '/../../../Model/Security/InternalHmacKeys.php';

/**
 * Clave HMAC interna POR CONEXIÓN (plan 2026-11-13): la clave que firma las peticiones internas se
 * deriva del `webhook_secret` de la conexión, el mismo que ya recibe el módulo al conectar. Sustituye
 * al «Internal HMAC Secret» global que ningún comerciante podía obtener.
 *
 * El vector es COMÚN con la API (Node): specs/050-magento-integration/fixtures/internal-hmac-key-derivation.json.
 */
final class InternalHmacKeyDerivationTest extends TestCase
{
    private const FIXTURE = __DIR__ . '/../_files/internal-hmac-key-derivation.json';
    private const ORIGINAL = __DIR__ . '/../../../../../specs/050-magento-integration/fixtures/internal-hmac-key-derivation.json';

    /** @return array<string, mixed> */
    private function vector(): array
    {
        return json_decode((string)file_get_contents(self::FIXTURE), true, 16, JSON_THROW_ON_ERROR);
    }

    public function testLocalCopyIsByteIdenticalToTheSharedOriginal(): void
    {
        if (!is_file(self::ORIGINAL)) {
            self::markTestSkipped('El original vive en el monorepo (specs/050-magento-integration/fixtures); el repo público no lo trae.');
        }
        self::assertSame(file_get_contents(self::ORIGINAL), file_get_contents(self::FIXTURE));
    }

    public function testDerivedKeyMatchesTheSharedVector(): void
    {
        $d = $this->vector()['derivation'];
        self::assertSame(
            $d['derived_key_hex'],
            (new InternalHmacSigner())->deriveConnectionKey($d['webhook_secret'])
        );
    }

    public function testSignatureWithTheDerivedKeyMatchesTheSharedVector(): void
    {
        $v = $this->vector();
        $s = $v['signature'];
        $signer = new InternalHmacSigner();
        $key = $signer->deriveConnectionKey($v['derivation']['webhook_secret']);

        self::assertSame(
            $s['signature_hex'],
            $signer->sign($key, $s['method'], $s['path'], $s['raw_body'], $s['timestamp'], $s['sorted_query'])
        );
        self::assertSame(
            $s['header_value'],
            $signer->buildHeaders($key, 'conn-1', $s['method'], $s['path'], $s['raw_body'], $s['timestamp'], $s['sorted_query'])[InternalHmacSigner::HEADER_SIGNATURE]
        );
    }

    private function keysWith(string $webhookSecret, string $legacy): InternalHmacKeys
    {
        $reader = $this->createMock(SecretReader::class);
        $reader->method('read')->willReturnCallback(
            static fn(string $path): string => match ($path) {
                'trusteed_general/general/webhook_secret' => $webhookSecret,
                'trusteed_general/general/internal_hmac_secret' => $legacy,
                default => '',
            }
        );

        return new InternalHmacKeys($reader, new InternalHmacSigner());
    }

    public function testCandidatesPutTheDerivedKeyFirstAndTheLegacyOneSecond(): void
    {
        $signer = new InternalHmacSigner();
        self::assertSame(
            [$signer->deriveConnectionKey('wh'), 'legacy'],
            $this->keysWith('wh', 'legacy')->candidates()
        );
    }

    public function testWithoutWebhookSecretOnlyTheLegacyKeyRemains(): void
    {
        self::assertSame(['legacy'], $this->keysWith('', 'legacy')->candidates());
        self::assertSame([], $this->keysWith('', '')->candidates());
    }

    public function testWithFallbackRetriesOnceOn401AndStopsOnAnyOtherStatus(): void
    {
        $keys = $this->keysWith('wh', 'legacy');
        $seen = [];
        $status = $keys->withFallback(static function (string $key) use (&$seen): int {
            $seen[] = $key;
            return count($seen) === 1 ? 401 : 200;
        });
        self::assertSame(200, $status);
        self::assertCount(2, $seen);

        $seen = [];
        $status = $keys->withFallback(static function (string $key) use (&$seen): int {
            $seen[] = $key;
            return 500;
        });
        self::assertSame(500, $status);
        self::assertCount(1, $seen, 'solo un 401 justifica el reintento con la clave antigua');

        $seen = [];
        $status = $this->keysWith('wh', '')->withFallback(static function (string $key) use (&$seen): int {
            $seen[] = $key;
            return 401;
        });
        self::assertSame(401, $status);
        self::assertCount(1, $seen, 'sin clave antigua no hay reintento');
    }
}
