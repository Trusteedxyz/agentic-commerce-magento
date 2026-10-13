<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Enforcement\JwksPositiveCache;
use Trusteed\AgenticCommerce\Enforcement\SnapshotJwsVerifier;
use Trusteed\AgenticCommerce\Enforcement\SnapshotPayloadDecoder;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * The snapshot before it is trusted, with the REAL `EnforcementClient` and
 * `SnapshotJwsVerifier`.
 *
 * - Negative cache (60 s, fake clock, test `CacheInterface`) of the forced JWKS
 *   retry. Each request uses a new client (Magento only keeps between requests
 *   what it asks of the cache) and shares the cache.
 * - `validUntil` handling, body size cap and `crit` header rejection.
 */
final class SnapshotHardeningTest extends TestCase
{
    private const T0     = 1800000000;
    private const KID    = 'snap-k1';
    private const MERCHANT = 'merchant_xyz';

    private int $clock = self::T0;
    /** @var array<string,array{0:string,1:int}> */
    private array $store = [];
    private bool $cacheThrows = false;
    private bool $garbage = false;
    private bool $cacheKeepsForever = false;

    /** @var list<string> */
    private array $urls = [];
    /** @var array<int,mixed> */
    private array $options = [];

    private string $platformSecret = '';
    private string $platformPublic = '';
    /** @var list<string> JWKS bodies, the last one repeats; '' means 503. */
    private array $jwksBodies = [];
    private string $snapshotBody = '';
    private int $snapshotStatus = 200;
    private string $jwksBodyOverride = '';

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('local stub harness; does not apply with the real framework');
        }
        $this->clock = self::T0;
        $this->store = [];
        $this->cacheThrows = false;
        $this->garbage = false;
        $this->cacheKeepsForever = false;
        $this->urls = [];
        $this->options = [];
        $this->jwksBodyOverride = '';
        $kp = sodium_crypto_sign_keypair();
        $this->platformSecret = sodium_crypto_sign_secretkey($kp);
        $this->platformPublic = sodium_crypto_sign_publickey($kp);
        $this->jwksBodies = [self::jwks(self::KID, $this->platformPublic)];
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload());
        $this->snapshotStatus = 200;
    }

    // ── harness ──────────────────────────────────────────────────────────

    private static function b64(string $d): string
    {
        return rtrim(strtr(base64_encode($d), '+/', '-_'), '=');
    }

    private static function jwks(string $kid, string $raw): string
    {
        return (string) json_encode(['keys' => [['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => $kid, 'x' => self::b64($raw)]]]);
    }

    /** @return array<string,mixed> */
    private function payload(?string $validUntil = 'default'): array
    {
        $p = ['merchantId' => self::MERCHANT, 'rules' => [], 'agentDidResolver' => []];
        if ($validUntil === 'default') {
            $p['validUntil'] = gmdate('Y-m-d\TH:i:s\Z', time() + 300);
        } elseif ($validUntil !== null) {
            $p['validUntil'] = $validUntil;
        }
        return $p;
    }

    /** @param array<string,mixed> $header @param array<string,mixed> $payload */
    private function sign(array $header, array $payload, ?string $secret = null): string
    {
        $input = self::b64((string) json_encode($header)) . '.' . self::b64((string) json_encode($payload));
        return $input . '.' . self::b64(sodium_crypto_sign_detached($input, $secret ?? $this->platformSecret));
    }

    private function tamper(): void
    {
        [$h, , $s] = explode('.', $this->snapshotBody);
        $this->snapshotBody = $h . '.' . self::b64((string) json_encode(['rules' => [], 'x' => 1])) . '.' . $s;
    }

    public function respond(string $url): array
    {
        $this->urls[] = $url;
        if (str_ends_with($url, '/.well-known/jwks.json')) {
            $n = count(array_filter($this->urls, static fn (string $u): bool => str_ends_with($u, '/.well-known/jwks.json')));
            $body = $this->jwksBodyOverride !== '' ? $this->jwksBodyOverride : $this->jwksBodies[min($n, count($this->jwksBodies)) - 1];
            return $body === '' ? [503, ''] : [200, $body];
        }
        return [$this->snapshotStatus, $this->snapshotBody];
    }

    private function jwksDownloads(): int
    {
        return count(array_filter($this->urls, static fn (string $u): bool => str_ends_with($u, '/.well-known/jwks.json')));
    }

    private function cache(): CacheInterface
    {
        $t = $this;
        return new class($t) implements CacheInterface {
            public function __construct(private readonly SnapshotHardeningTest $t) {}
            public function load($identifier)
            {
                return $this->t->cacheLoad((string) $identifier);
            }
            public function save($data, $identifier, $tags = [], $lifeTime = null)
            {
                return $this->t->cacheSave((string) $data, (string) $identifier, (int) $lifeTime);
            }
            public function remove($identifier)
            {
                return true;
            }
            public function clean($tags = [])
            {
                return true;
            }
        };
    }

    public function cacheLoad(string $id): string|false
    {
        if ($this->cacheThrows) {
            throw new \RuntimeException('cache down');
        }
        if ($this->garbage) {
            return 'not-json{';
        }
        $e = $this->store[$id] ?? null;
        return $e !== null && ($this->cacheKeepsForever || $e[1] > $this->clock) ? $e[0] : false;
    }

    public function cacheSave(string $data, string $id, int $life): bool
    {
        if ($this->cacheThrows) {
            throw new \RuntimeException('cache down');
        }
        $this->store[$id] = [$data, $this->clock + $life];
        return true;
    }

    /** One REQUEST: new client (no memory of its own), same cache and clock. */
    private function pull(?CacheInterface $cache = null, bool $noCache = false): array
    {
        $t = $this;
        $scope = new class implements ScopeConfigInterface {
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return [
                    'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
                    'trusteed/enforcement/installation_id'  => 'inst_abc',
                    'trusteed/enforcement/hmac_secret'      => 'example-hmac-secret',
                ][$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
        $curl = new class($t) extends Curl {
            private int $status = 0;
            private string $body = '';
            public function __construct(private readonly SnapshotHardeningTest $t) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void
            {
                $this->t->recordOption((int) $option, $value);
            }
            public function addHeader(string $name, string $value): void {}
            public function get(string $url): void
            {
                [$this->status, $this->body] = $this->t->respond($url);
            }
            public function getStatus(): int { return $this->status; }
            public function getBody(): string { return $this->body; }
        };
        $client = new class($scope, $curl, $this->createMock(LoggerInterface::class), null, $noCache ? null : ($cache ?? $this->cache()), $t) extends EnforcementClient {
            public function __construct($s, $c, $l, $v, $cache, private readonly SnapshotHardeningTest $t)
            {
                parent::__construct($s, $c, $l, $v, $cache);
            }
            protected function now(): int
            {
                return $this->t->clock();
            }
        };
        return $client->getSnapshotResult(self::MERCHANT);
    }

    public function recordOption(int $option, mixed $value): void
    {
        $this->options[$option] = $value;
    }

    public function clock(): int
    {
        return $this->clock;
    }

    // ── Negative cache ───────────────────────────────────────────────────

    public function testTheForcedJwksRetryIsNotRepeatedByTheNextRequestsWithinTheWindow(): void
    {
        $this->tamper();

        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads(), 'request 1: download + forced retry');

        // From here the NORMAL download is served from the positive copy (300 s);
        // this test only counts the forced retry.
        $this->clock = self::T0 + 30;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads(), 'request 2: no normal download (copy) and no retry (negative)');

        $this->clock = self::T0 + 59;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads());

        $this->clock = self::T0 + 61;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(3, $this->jwksDownloads(), 'vencida la ventana negativa: vuelve el reintento forzado (la copia sigue vigente)');
    }

    public function testTheEntryCarriesItsOwnExpiryWhenTheCacheBackendKeepsItLonger(): void
    {
        // A backend that ignores the lifetime (or extends it) does not stretch the 60 s window.
        $this->cacheKeepsForever = true;
        $this->tamper();
        $this->pull();

        $this->clock = self::T0 + 61;
        $this->urls = [];
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'negative window expired: only the retry (the positive copy is still valid)');
    }

    public function testAJwksThatAnswersWithoutTheKidThenDiesIsRememberedAsUnavailableNotTampered(): void
    {
        // Request 1: the normal download does not carry the `kid`; the forced retry does not answer.
        // Request 2: the normal download again lacks it; the retry (which would answer
        // with the same list, i.e. "tampered") must not happen.
        $other = self::jwks('another-kid', $this->platformPublic);
        $this->jwksBodies = [$other, '', $other];

        self::assertSame('unavailable', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads());

        $this->clock = self::T0 + 20;
        $r = $this->pull();
        self::assertSame('unavailable', $r['status'], 'se clasifica con lo sabido, no como manipulado');
        self::assertSame('jwks_retry_remembered', $r['detail']);
        self::assertSame(2, $this->jwksDownloads(), 'sin reintento forzado (y la descarga normal la sirve la copia)');
    }

    public function testAnotherKidInsideTheWindowStillGetsItsForcedRetry(): void
    {
        $this->tamper();
        self::assertSame('tampered', $this->pull()['status']);

        $rotated = sodium_crypto_sign_keypair();
        // With the positive copy still valid there is no normal download: the first download is the forced retry.
        $this->jwksBodies = [
            (string) json_encode(['keys' => [
                ['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => self::KID, 'x' => self::b64($this->platformPublic)],
                ['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => 'snap-rotated', 'x' => self::b64(sodium_crypto_sign_publickey($rotated))],
            ]]),
        ];
        $this->urls = [];
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => 'snap-rotated'], $this->payload(), sodium_crypto_sign_secretkey($rotated));

        $this->clock = self::T0 + 5;
        self::assertSame('ok', $this->pull()['status'], 'a rotation is not tampering');
        self::assertSame(1, $this->jwksDownloads(), 'only the forced retry');
    }

    public function testAVerifiableSnapshotIsNeverBlockedByARememberedFailure(): void
    {
        $this->tamper();
        $this->pull();
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload());

        $this->clock = self::T0 + 1;
        self::assertSame('ok', $this->pull()['status']);
    }

    public function testWithoutACacheEveryRequestRetriesAsBefore(): void
    {
        $this->tamper();

        self::assertSame('tampered', $this->pull(null, true)['status']);
        self::assertSame('tampered', $this->pull(null, true)['status']);
        self::assertSame(4, $this->jwksDownloads());
    }

    public function testACacheThatThrowsOrHoldsGarbageNeverBreaksTheClassification(): void
    {
        $this->tamper();
        $this->cacheThrows = true;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(4, $this->jwksDownloads(), 'without a cache it retries');

        $this->cacheThrows = false;
        $this->garbage = true;
        $this->urls = [];
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads(), 'una entrada ilegible no cuenta');
    }

    // ── Positive JWKS cache ─────────────────────────────────────────────

    private function validSnapshot(): void
    {
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload());
    }

    public function testTheJwksIsDownloadedOnceAndServedFromTheCopyOnTheNextRequests(): void
    {
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'request 1: miss, one download');

        $this->clock = self::T0 + 10;
        self::assertSame('ok', $this->pull()['status']);
        $this->clock = self::T0 + 299;
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'hit: no more downloads within 300 s');
    }

    public function testTheCopyExpiresAfter300SecondsEvenIfTheBackendKeepsIt(): void
    {
        $this->cacheKeepsForever = true;
        $this->pull();

        $this->clock = self::T0 + 300;
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads(), 'a los 300 s la entrada trae su propio vencimiento: se descarga otra vez');
    }

    public function testAnUnknownKidForcesOneRedownloadAndTheNewKeysReplaceTheCopy(): void
    {
        $this->pull(); // copy with the KID
        $rotated = sodium_crypto_sign_keypair();
        $both    = (string) json_encode(['keys' => [
            ['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => self::KID, 'x' => self::b64($this->platformPublic)],
            ['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => 'snap-rotated', 'x' => self::b64(sodium_crypto_sign_publickey($rotated))],
        ]]);
        $this->jwksBodies = [$both]; // the first (and only) download is the forced retry
        $this->urls = [];
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => 'snap-rotated'], $this->payload(), sodium_crypto_sign_secretkey($rotated));

        $this->clock = self::T0 + 20;
        self::assertSame('ok', $this->pull()['status'], 'a legitimate rotation is not blocked for 5 minutes');
        self::assertSame(1, $this->jwksDownloads(), 'ONE re-download (the normal one was served by the copy)');

        $this->urls = [];
        $this->clock = self::T0 + 40;
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(0, $this->jwksDownloads(), 'the copy is already the new one: the rotated key is served from the cache');
        $this->validSnapshot();
        self::assertSame('ok', $this->pull()['status'], 'y la clave anterior sigue en la lista nueva');
    }

    public function testAFailingSignatureWithTheCachedKidForcesExactlyOneRedownload(): void
    {
        $this->pull();
        $this->tamper();
        $this->urls = [];

        $this->clock = self::T0 + 10;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'una sola re-descarga forzada');

        $this->urls = [];
        $this->clock = self::T0 + 20;
        self::assertSame('tampered', $this->pull()['status']);
        self::assertSame(0, $this->jwksDownloads(), 'the 60 s negative cache per kid still rules: no copy and no forced retry');
    }

    public function testAFailedForcedRedownloadLeavesTheCopyAsItWas(): void
    {
        $this->pull();
        $rotated = sodium_crypto_sign_keypair();
        $this->jwksBodies = ['']; // the forced retry receives 503
        $this->urls = [];
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => 'snap-rotated'], $this->payload(), sodium_crypto_sign_secretkey($rotated));

        $this->clock = self::T0 + 10;
        $r = $this->pull();
        self::assertSame('unavailable', $r['status'], 'JWKS down on the retry: not tampering');
        self::assertSame(1, $this->jwksDownloads());

        $this->urls = [];
        $this->validSnapshot();
        $this->clock = self::T0 + 20;
        self::assertSame('ok', $this->pull()['status'], 'la copia anterior sobrevive al fallo');
        self::assertSame(0, $this->jwksDownloads());
    }

    public function testAFailedFirstDownloadStoresNothingSoTheNextRequestDownloadsAgain(): void
    {
        $this->jwksBodies = [''];

        self::assertSame('unavailable', $this->pull()['status']);
        $this->jwksBodies = [self::jwks(self::KID, $this->platformPublic)];
        $this->urls = [];
        $this->clock = self::T0 + 5;
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'an empty JWKS is not cached for 5 minutes');
    }

    public function testACacheThatThrowsOrHoldsGarbageNeverBreaksVerificationAndFallsBackToDownloading(): void
    {
        $this->cacheThrows = true;
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(2, $this->jwksDownloads(), 'without a cache every request downloads, as before');

        $this->cacheThrows = false;
        $this->garbage = true;
        $this->urls = [];
        self::assertSame('ok', $this->pull()['status']);
        self::assertSame(1, $this->jwksDownloads(), 'una entrada ilegible es un miss');
    }

    public function testWithoutACacheTheJwksIsDownloadedPerRequestAsBefore(): void
    {
        self::assertSame('ok', $this->pull(null, true)['status']);
        self::assertSame('ok', $this->pull(null, true)['status']);
        self::assertSame(2, $this->jwksDownloads());
    }

    public function testThePositiveCacheIsPerServerAndRejectsHalfWrittenEntries(): void
    {
        $store = [];
        $backend = new class($store) implements CacheInterface {
            public function __construct(public array &$store) {}
            public function load($identifier) { return $this->store[$identifier] ?? false; }
            public function save($data, $identifier, $tags = [], $lifeTime = null) { $this->store[$identifier] = $data; return true; }
            public function remove($identifier) { return true; }
            public function clean($tags = []) { return true; }
        };
        $now = fn (): int => self::T0;
        $a = new JwksPositiveCache($backend, 'https://a.test', $now);
        $b = new JwksPositiveCache($backend, 'https://b.test', $now);

        $a->write([self::KID => $this->platformPublic]);

        self::assertSame([self::KID => $this->platformPublic], $a->read());
        self::assertSame([], $b->read(), 'otro servidor no hereda la copia');

        $a->write([]);
        self::assertSame([self::KID => $this->platformPublic], $a->read(), 'an empty JWKS does not replace the copy');

        $key = array_key_first($store);
        $store[$key] = (string) json_encode(['until' => self::T0 + 100, 'keys' => [self::KID => self::b64($this->platformPublic), 'short' => self::b64('abc')]]);
        self::assertSame([], $a->read(), 'una clave que no mide 32 bytes invalida la entrada entera');
        $store[$key] = (string) json_encode(['until' => self::T0 - 1, 'keys' => [self::KID => self::b64($this->platformPublic)]]);
        self::assertSame([], $a->read(), 'vencida');
    }

    // ── validUntil ───────────────────────────────────────────────────────

    public function testASnapshotWhoseValidUntilPassedIsUnavailable(): void
    {
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload(gmdate('Y-m-d\TH:i:s\Z', time() - 10)));

        $r = $this->pull();

        self::assertSame('unavailable', $r['status']);
        self::assertSame('stale', $r['detail']);
    }

    /**
     * A snapshot signed by our server ALWAYS carries `validUntil` (an ISO-8601
     * string). Absent or unreadable is a malformed payload: "unavailable", like
     * an expired one, and NOT tampered, because the signature verified. This
     * replaces an earlier test that pinned the opposite ("absent is not
     * expired"), which was prior behaviour, not an invariant.
     *
     * @return array<string,array{0:bool,1:mixed}> [absent?, value]
     */
    public static function unreadableValidUntil(): array
    {
        return [
            'ausente'                  => [true, null],
            'null'                     => [false, null],
            'empty string'             => [false, ''],
            'cadena de espacios'       => [false, '   '],
            'basura'                   => [false, 'not-a-date'],
            'fecha imposible'          => [false, '99999-99-99T99:99:99Z'],
            'number in seconds'         => [false, 1900000000],
            'number out of range'    => [false, 99999999999999999999.0],
            'booleano'                 => [false, true],
            'lista'                    => [false, ['2099-01-01T00:00:00Z']],
            'objeto'                   => [false, ['at' => '2099-01-01T00:00:00Z']],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('unreadableValidUntil')]
    public function testASnapshotWithAnAbsentOrUnreadableValidUntilIsUnavailableNotTampered(bool $absent, mixed $value): void
    {
        $payload = $this->payload(null);
        if (!$absent) {
            $payload['validUntil'] = $value;
        }
        $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $payload);

        $r = $this->pull();

        self::assertSame('unavailable', $r['status'], 'the signature verified: not tampered');
        self::assertNull($r['payload'], 'un snapshot no utilizable no entrega reglas');
        self::assertStringStartsWith('valid_until_', $r['detail']);
    }

    public function testTheVerifierItselfRejectsAnUnreadableValidUntilWithoutTheClient(): void
    {
        $jwks = fn (bool $force): array => [self::KID => $this->platformPublic];
        $withUntil = SnapshotJwsVerifier::verify($this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload()), $jwks);
        $without   = SnapshotJwsVerifier::verify($this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload(null)), $jwks);

        self::assertSame('ok', $withUntil['status'], 'control');
        self::assertSame('unavailable', $without['status']);
        self::assertSame('valid_until_missing', $without['detail']);
    }

    public function testTheDecoderTreatsAbsentUnreadableAndPastValidUntilAsNotUsable(): void
    {
        $now = 1_800_000_000;
        self::assertTrue(SnapshotPayloadDecoder::isUsable(['validUntil' => gmdate('Y-m-d\TH:i:s\Z', $now + 1)], $now));
        self::assertFalse(SnapshotPayloadDecoder::isUsable(['validUntil' => gmdate('Y-m-d\TH:i:s\Z', $now)], $now), 'vence en este segundo');
        self::assertFalse(SnapshotPayloadDecoder::isUsable(['validUntil' => gmdate('Y-m-d\TH:i:s\Z', $now - 1)], $now));
        self::assertFalse(SnapshotPayloadDecoder::isUsable([], $now), 'ausente');
        self::assertFalse(SnapshotPayloadDecoder::isUsable(['validUntil' => 'basura'], $now), 'ilegible');
        self::assertNull(SnapshotPayloadDecoder::validUntil(['validUntil' => 1900000000]), 'a number is not the ISO string the server emits');
    }

    public function testASnapshotWithAReadableFutureValidUntilIsStillServedInAnyIsoOffset(): void
    {
        foreach ([gmdate('Y-m-d\TH:i:s\Z', time() + 300), gmdate('Y-m-d\TH:i:s.000\Z', time() + 300), gmdate('c', time() + 300)] as $until) {
            $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID], $this->payload($until));
            self::assertSame('ok', $this->pull()['status'], $until);
        }
    }

    // ── Size cap ─────────────────────────────────────────────────────────

    public function testTheOutboundRequestsAskCurlToRefuseAnOversizedBody(): void
    {
        $this->pull();

        self::assertSame(EnforcementClient::MAX_RESPONSE_BYTES, $this->options[CURLOPT_MAXFILESIZE] ?? null);
    }

    public function testAnOversizedSnapshotBodyIsUnavailableAndNotVerified(): void
    {
        $this->snapshotBody = str_repeat('a', EnforcementClient::MAX_RESPONSE_BYTES + 1);

        $r = $this->pull();

        self::assertSame('unavailable', $r['status'], 'verified would be "tampered": it has no JWS shape');
        self::assertSame('response_too_large', $r['detail']);
        self::assertSame(0, $this->jwksDownloads());
    }

    public function testAnOversizedJwksIsUnavailableNotTampered(): void
    {
        $this->jwksBodyOverride = self::jwks(self::KID, $this->platformPublic) . str_repeat(' ', EnforcementClient::MAX_RESPONSE_BYTES);

        self::assertSame('unavailable', $this->pull()['status']);
    }

    public function testABodyExactlyAtTheCapIsStillExamined(): void
    {
        $this->snapshotBody = str_repeat('a', EnforcementClient::MAX_RESPONSE_BYTES);

        self::assertSame('tampered', $this->pull()['status'], 'dentro del tope se examina (y no es un JWS)');
    }

    // ── crit header ──────────────────────────────────────────────────────

    public function testASnapshotHeaderWithCritIsRejectedEvenWithAValidSignature(): void
    {
        self::assertSame('ok', $this->pull()['status'], 'control: la misma firma sin `crit` verifica');

        foreach ([['exp'], [], 'exp', null] as $crit) {
            $this->snapshotBody = $this->sign(['alg' => 'EdDSA', 'kid' => self::KID, 'crit' => $crit, 'exp' => 1], $this->payload());
            $r = $this->pull();
            self::assertSame('tampered', $r['status'], 'crit=' . json_encode($crit));
            self::assertSame('crit_header', $r['detail']);
        }
    }
}
