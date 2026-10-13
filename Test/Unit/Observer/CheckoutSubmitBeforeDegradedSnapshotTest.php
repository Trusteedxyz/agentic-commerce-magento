<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Quote\Model\Quote;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Real flow (`CheckoutSubmitBefore` + `EnforcementClient` +
 * `AgentTokenVerifier` + `SnapshotJwsVerifier`) against a degraded snapshot,
 * using the real `snapshotPayload` from the shared fixture (resolver as a
 * LIST, with the test DID appended), signed with Ed25519 and served by a test
 * transport that tells snapshot, JWKS, evaluate and nonce requests apart.
 *
 * Credentials: the ones from the module configuration (written by the
 * `Setup\Save` wizard under `trusteed/enforcement/*`). The transport checks
 * that evaluate, nonce and snapshot requests are signed with them.
 */
final class CheckoutSubmitBeforeDegradedSnapshotTest extends TestCase
{
    private const DID    = 'did:web:magento-test-agent.example.com';
    private const SECRET = 'example-hmac-secret';

    /** @var list<array{method:string,url:string,body:string,headers:array<string,string>}> */
    private array $calls = [];

    /** 'ok' | 'tampered' | 'unavailable' | 'network' | 'stale' | 'deflated' | 'zip_unknown' */
    private string $snapshotMode = 'ok';

    /** @var list<string> JWKS bodies served in order (the last one repeats); '' means 503. */
    private array $jwksBodies = [];

    private int $evaluateStatus = 200;
    private string $evaluateBody = '{"decision":"ALLOW"}';
    private int $nonceStatus = 200;

    /** @var array<int,array<string,mixed>> Rules of the served snapshot (besides the fixture's). */
    private array $extraRules = [];

    /** @var list<array<string,mixed>>|null Resolver override (null means fixture list + test DID). */
    private ?array $resolver = null;

    /** JWS served as is (vector from the `compressedSnapshot` fixture); null means signed here. */
    private ?string $servedJws = null;

    /** Token identity [did, secret key]; null means the harness one. */
    private ?array $tokenIdentity = null;

    private string $agentSecretKey = '';
    private string $agentPublicX = '';
    private string $platformSecretKey = '';
    private string $platformJwks = '';

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('local stub harness; does not apply with the real framework');
        }
        $agent = sodium_crypto_sign_keypair();
        $this->agentSecretKey = sodium_crypto_sign_secretkey($agent);
        $this->agentPublicX   = self::b64url(sodium_crypto_sign_publickey($agent));
        $platform = sodium_crypto_sign_keypair();
        $this->platformSecretKey = sodium_crypto_sign_secretkey($platform);
        $this->platformJwks = self::jwks('snap-k1', sodium_crypto_sign_publickey($platform));
        $this->jwksBodies = [$this->platformJwks];
    }

    // ── fixture / signing ────────────────────────────────────────────────

    private static function fixturePayload(): array
    {
        $path = __DIR__ . '/../../fixtures/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json);
        return $json['snapshotResolverShape']['snapshotPayload'];
    }

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function jwks(string $kid, string $rawPublic): string
    {
        return (string) json_encode(['keys' => [['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => $kid, 'x' => self::b64url($rawPublic)]]]);
    }

    private function snapshotPayload(): array
    {
        $payload = self::fixturePayload();
        $payload['validUntil'] = gmdate('Y-m-d\TH:i:s.000\Z', $this->snapshotMode === 'stale' ? time() - 5 : time() + 60);
        $payload['agentDidResolver'] = $this->resolver ?? array_merge($payload['agentDidResolver'], [[
            'did' => self::DID,
            'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => $this->agentPublicX],
        ]]);
        $payload['rules'] = array_merge($payload['rules'], $this->extraRules);
        return $payload;
    }

    private function signedSnapshot(): string
    {
        $json    = (string) json_encode($this->snapshotPayload());
        $deflate = $this->snapshotMode === 'deflated';
        // Unknown `zip` over a plain JSON gives an authentic signature, unreadable payload.
        $zip     = $deflate ? ['zip' => 'DEF'] : ($this->snapshotMode === 'zip_unknown' ? ['zip' => 'GZIP'] : []);
        $header  = ['alg' => 'EdDSA', 'kid' => 'snap-k1', 'typ' => 'cel-snapshot+jwt'] + $zip;
        $h   = self::b64url((string) json_encode($header));
        $b   = self::b64url($deflate ? (string) gzdeflate($json) : $json);
        $sig = self::b64url(sodium_crypto_sign_detached("{$h}.{$b}", $this->platformSecretKey));
        if ($this->snapshotMode === 'tampered') {
            $forged = $this->snapshotPayload();
            $forged['rules'] = [];
            $b = self::b64url((string) json_encode($forged));
        }
        return "{$h}.{$b}.{$sig}";
    }

    /** @param array<string,mixed> $claims */
    private function token(array $claims = []): string
    {
        $now = time();
        [$did, $secret] = $this->tokenIdentity ?? [self::DID, $this->agentSecretKey];
        $h = self::b64url((string) json_encode(['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt', 'kid' => $did . '#key-1']));
        $b = self::b64url((string) json_encode(array_merge([
            'iss' => $did, 'aud' => 'trusteed', 'iat' => $now, 'exp' => $now + 120,
            'nonce' => str_repeat('n', 32), 'jti' => 'jti_' . bin2hex(random_bytes(10)),
        ], $claims)));
        $s = self::b64url(sodium_crypto_sign_detached("{$h}.{$b}", $secret));
        return "{$h}.{$b}.{$s}";
    }

    // ── transport ────────────────────────────────────────────────────────

    private function curl(): Curl
    {
        $test = $this;
        return new class($test) extends Curl {
            private string $last = '';
            private int $status = 0;
            private string $body = '';
            /** @var array<string,string> */
            private array $pending = [];
            private int $jwksServed = 0;
            public function __construct(private readonly object $test) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void
            {
                $this->pending[$name] = $value;
            }
            public function post(string $url, $body): void
            {
                [$this->status, $this->body] = $this->test->respond('POST', $url, (string) $body, $this->pending);
                $this->pending = [];
            }
            public function get(string $url): void
            {
                [$this->status, $this->body] = $this->test->respond('GET', $url, '', $this->pending);
                $this->pending = [];
            }
            public function getStatus(): int
            {
                return $this->status;
            }
            public function getBody(): string
            {
                return $this->body;
            }
        };
    }

    /**
     * @param array<string,string> $headers
     * @return array{0:int,1:string}
     */
    public function respond(string $method, string $url, string $body, array $headers): array
    {
        $this->calls[] = ['method' => $method, 'url' => $url, 'body' => $body, 'headers' => $headers];
        if (str_ends_with($url, '/.well-known/jwks.json')) {
            $n    = count(array_filter($this->calls, static fn (array $c): bool => str_ends_with($c['url'], '/.well-known/jwks.json')));
            $jwks = $this->jwksBodies[min($n, count($this->jwksBodies)) - 1];
            return $jwks === '' ? [503, ''] : [200, $jwks];
        }
        $this->assertSignedWithModuleCredentials($body, $headers);
        if (str_contains($url, '/v1/rules/snapshot/')) {
            return match ($this->snapshotMode) {
                'unavailable' => [503, ''],
                'network'     => throw new \RuntimeException('connection reset'),
                default       => [200, $this->servedJws ?? $this->signedSnapshot()],
            };
        }
        if (str_ends_with($url, '/v1/agent-events/nonce-consume')) {
            return [$this->nonceStatus, '{}'];
        }
        return [$this->evaluateStatus, $this->evaluateBody];
    }

    /** @param array<string,string> $headers */
    private function assertSignedWithModuleCredentials(string $body, array $headers): void
    {
        self::assertSame('inst_abc', $headers['X-Trusteed-Installation-Id'] ?? null, 'installationId from the configuration');
        self::assertMatchesRegularExpression('/^t=(\d+),s=([0-9a-f]{64})$/', $headers['X-Trusteed-Signature'] ?? '');
        preg_match('/^t=(\d+),s=([0-9a-f]{64})$/', $headers['X-Trusteed-Signature'], $m);
        self::assertSame(hash_hmac('sha256', "{$m[1]}.{$body}", self::SECRET), $m[2], 'HMAC with the configured secret');
    }

    /** @return list<string> */
    private function urls(string $suffix): array
    {
        return array_values(array_map(
            static fn (array $c): string => $c['url'],
            array_filter($this->calls, static fn (array $c): bool => str_contains($c['url'], $suffix))
        ));
    }

    // ── observer ─────────────────────────────────────────────────────────

    private static function config(array $extra): ScopeConfigInterface
    {
        $values = array_merge([
            'trusteed_general/general/merchant_id'  => '11111111-2222-3333-4444-555555555555',
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            'trusteed/enforcement/hmac_secret'      => self::SECRET,
        ], $extra);
        return new class($values) implements ScopeConfigInterface {
            public function __construct(private readonly array $values) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $this->values[$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    /** @param array<string,string> $headers */
    private static function request(array $headers): RequestInterface
    {
        return new class($headers) implements RequestInterface {
            public function __construct(private readonly array $headers) {}
            public function getParam($key, $defaultValue = null)
            {
                return $defaultValue;
            }
            public function getHeader($name, $default = false)
            {
                return $this->headers[$name] ?? $default;
            }
        };
    }

    private static function quote(float $total, bool $virtual): Quote
    {
        $quote = new class extends Quote {
            public function getQuoteCurrencyCode() { return 'EUR'; }
            public function getId() { return 0; }
            public function getBillingAddress() { return null; }
            public function getShippingAddress() { return null; }
            public function getCustomer() { return null; }
        };
        $quote->grandTotal = $total;
        if ($virtual) {
            $product = new class {
                public function getTypeId() { return 'virtual'; }
                public function getCategoryIds() { return []; }
                public function getData($key = null) { return null; }
            };
            $quote->visibleItems = [new class($product, $total) {
                public function __construct(private readonly object $product, private readonly float $price) {}
                public function getQty() { return 1; }
                public function getPrice() { return $this->price; }
                public function getSku() { return "SKU-VIRT-7"; }
                public function getProductId() { return 7; }
                public function getProduct() { return $this->product; }
            }];
        }
        return $quote;
    }

    /**
     * Runs the real observer. Returns the exception message ('' means passed).
     *
     * @param array<string,string> $headers
     */
    private function checkout(array $headers, array $config = [], float $total = 49.99, bool $virtual = false): string
    {
        $logger   = $this->createMock(LoggerInterface::class);
        $scope    = self::config($config);
        $observer = new CheckoutSubmitBefore(
            new CheckoutSession(),
            new AgentTokenVerifier($logger),
            new EnforcementClient($scope, $this->curl(), $logger),
            $scope,
            $logger,
            $this->createMock(CacheInterface::class),
            $this->createMock(CategoryRepositoryInterface::class),
            null,
            request: self::request($headers),
        );
        $event = new class(self::quote($total, $virtual)) extends Observer {
            public function __construct(private readonly Quote $quote) {}
            public function getEvent()
            {
                return new class($this->quote) {
                    public function __construct(private readonly Quote $quote) {}
                    public function getData($key) { return $key === 'quote' ? $this->quote : null; }
                };
            }
        };
        try {
            $observer->execute($event);
            return '';
        } catch (LocalizedException $e) {
            return $e->getMessage();
        }
    }

    private function agentWithToken(array $claims = []): array
    {
        return ['X-Trusteed-Agent-Token' => $this->token($claims)];
    }

    /** @return array<string,mixed> */
    private function evaluated(): array
    {
        $posts = array_values(array_filter($this->calls, static fn (array $c): bool => str_ends_with($c['url'], '/v1/rules/evaluate')));
        self::assertCount(1, $posts, 'one evaluation');
        return (array) json_decode($posts[0]['body'], true);
    }

    private const HELD = 'could not be verified';
    private const RULE = 'did not pass';

    // ── tampered snapshot ────────────────────────────────────────────────

    public function testTamperedSnapshotHoldsAnAgentWithATokenInEveryMode(): void
    {
        foreach (['enforce', 'observe'] as $mode) {
            $this->calls = [];
            $this->snapshotMode = 'tampered';
            $msg = $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => $mode]);
            self::assertStringContainsString(self::HELD, $msg, $mode);
            self::assertSame([], $this->urls('/v1/rules/evaluate'), "{$mode}: sin evaluar");
            self::assertSame([], $this->urls('nonce-consume'), "{$mode}: el jti no se gasta");
            self::assertCount(2, $this->urls('jwks.json'), "{$mode}: el JWKS se vuelve a bajar una vez antes de concluir");
        }
    }

    public function testTamperedSnapshotWithTheEvaluatorDownHoldsAnAgentWithoutTokenEvenInObserve(): void
    {
        $this->snapshotMode = 'tampered';
        $this->evaluateStatus = 503;
        $msg = $this->checkout(['X-Trusteed-Agent-Id' => self::DID], ['trusteed/enforcement/failure_mode' => 'observe']);
        self::assertStringContainsString(self::HELD, $msg, 'invalid_signature cierra al agente en todo modo');
    }

    public function testTamperedSnapshotNeverAppliesItsRulesToAHuman(): void
    {
        $this->snapshotMode = 'tampered';
        $this->evaluateStatus = 503;
        $this->extraRules = [self::r030Cap(1000)];
        self::assertSame('', $this->checkout([], [], 49.99), 'persona: pasa, sin reglas de un snapshot manipulado');
    }

    // ── snapshot unavailable ─────────────────────────────────────────────

    public function testUnavailableSnapshotHoldsAnAgentWithATokenInEveryMode(): void
    {
        // 'deflated' (a legitimate DEF zip) is now readable; the "authentic
        // signature, unreadable payload" case is covered by 'zip_unknown'.
        foreach (['unavailable', 'network', 'stale', 'zip_unknown'] as $cause) {
            foreach (['enforce', 'observe'] as $mode) {
                $this->calls = [];
                $this->snapshotMode = $cause;
                $msg = $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => $mode]);
                self::assertStringContainsString(self::HELD, $msg, "{$cause}/{$mode}");
                self::assertSame([], $this->urls('/v1/rules/evaluate'), "{$cause}/{$mode}");
                self::assertSame([], $this->urls('nonce-consume'), "{$cause}/{$mode}");
            }
        }
    }

    /** With no snapshot and no token the mode decides; an unreadable `zip` counts as unavailable, not as tampered. */
    public function testUnavailableSnapshotWithoutTokenFollowsTheMode(): void
    {
        foreach (['unavailable', 'zip_unknown'] as $cause) {
            $this->snapshotMode = $cause;
            $this->evaluateStatus = 503;
            $this->calls = [];
            self::assertStringContainsString(self::HELD, $this->checkout(['X-Trusteed-Agent-Id' => self::DID]), "{$cause}: enforce cierra");
            $this->calls = [];
            self::assertSame('', $this->checkout(['X-Trusteed-Agent-Id' => self::DID], ['trusteed/enforcement/failure_mode' => 'observe']), "{$cause}: observe abre");
            $this->calls = [];
            self::assertSame('', $this->checkout([]), "{$cause}: persona pasa");
        }
    }

    /**
     * A malformed token is discarded before verification (the resolver is not
     * needed: it is already invalid) and the server decides. If the server is
     * also down and there is no snapshot, it is still a present token, so held
     * in every mode.
     */
    public function testMalformedTokenWithEverythingDownIsHeldEvenInObserve(): void
    {
        $this->snapshotMode = 'unavailable';
        $this->evaluateStatus = 503;
        $msg = $this->checkout(['X-Trusteed-Agent-Token' => 'not-a-jws'], ['trusteed/enforcement/failure_mode' => 'observe']);
        self::assertStringContainsString(self::HELD, $msg);
        self::assertSame('true', $this->evaluated()['orderContext']['cartAttributes']['_agent_token_present'] ?? null, 'the server was asked');
    }

    public function testJwksDownOnTheRetryIsUnavailableNotTampered(): void
    {
        $this->snapshotMode = 'ok';
        $this->jwksBodies = [self::jwks('other-kid', random_bytes(32)), ''];
        $this->evaluateStatus = 503;
        $msg = $this->checkout(['X-Trusteed-Agent-Id' => self::DID], ['trusteed/enforcement/failure_mode' => 'observe']);
        self::assertSame('', $msg, 'missing_snapshot opens in observe; invalid_signature would have closed');
        self::assertCount(2, $this->urls('jwks.json'));
    }

    // ── verified snapshot, evaluator down ────────────────────────────────

    public function testVerifiedSnapshotAndEvaluatorDownFollowsTheModeForATokenAgent(): void
    {
        $this->evaluateStatus = 503;
        self::assertStringContainsString(self::HELD, $this->checkout($this->agentWithToken()), 'enforce');
        self::assertCount(1, $this->urls('nonce-consume'), 'the token verified against the list: jti consumed');
        $this->calls = [];
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => 'observe']), 'observe');
    }

    public function testVerifiedSnapshotValveStillBlocksAHumanOverTheCap(): void
    {
        $this->evaluateStatus = 503;
        $this->extraRules = [self::r030Cap(1000)];
        self::assertStringContainsString(self::RULE, $this->checkout([], [], 49.99), 'the valve: merchant rule');
        $this->calls = [];
        self::assertSame('', $this->checkout([], [], 5.00), 'bajo el tope pasa');
    }

    public function testKeyRotationWithinTheRequestIsNotTampering(): void
    {
        $this->jwksBodies = [self::jwks('old-kid', random_bytes(32)), $this->platformJwks];
        $payload = null;
        self::assertSame('', $this->checkout(['X-Trusteed-Agent-Id' => self::DID] + $this->agentWithToken()));
        $payload = $this->evaluated();
        self::assertSame(self::DID, $payload['agentId'], 'verified after downloading the JWKS again');
    }

    // ── layer disabled ───────────────────────────────────────────────────

    public function testUnconfiguredLayerHoldsNobody(): void
    {
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/hmac_secret' => null]));
        self::assertSame([], $this->calls, 'sin configurar no sale nada');
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/installation_id' => null]));
        self::assertSame([], $this->calls);
    }

    // ── compressed snapshot (zip: DEF) ──────────────────────────────────

    /** @return array<string,mixed> `compressedSnapshot` section of the shared fixture. */
    private static function compressed(): array
    {
        $path = __DIR__ . '/../../fixtures/platform-flow-conformance.json';
        $json = json_decode((string) file_get_contents($path), true);
        self::assertIsArray($json);
        return $json['compressedSnapshot'];
    }

    private function serveCompressedVector(string $id): void
    {
        $section = self::compressed();
        foreach ($section['vectors'] as $v) {
            if ($v['id'] === $id) {
                $this->servedJws = $v['jws'];
            }
        }
        self::assertNotNull($this->servedJws, $id);
        $this->jwksBodies = [(string) json_encode($section['jwks'])];
        $seed = hash('sha256', $section['agent']['seedLabel'], true);
        $this->tokenIdentity = [$section['agent']['did'], sodium_crypto_sign_secretkey(sodium_crypto_sign_seed_keypair($seed))];
    }

    public function testALegitimateAgentIsNotHeldByTheCompressedSnapshotOfTheRealSignerAndItsTokenVerifies(): void
    {
        foreach (['enforce', 'observe'] as $mode) {
            $this->calls = [];
            $this->serveCompressedVector('valid.deflated-by-real-signer');
            self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => $mode]), 'antes: zip DEF = unavailable, so held in ' . $mode);
            self::assertSame(self::compressed()['agent']['did'], $this->evaluated()['agentId'], 'verified against the 300-DID resolver');
            self::assertCount(1, $this->urls('nonce-consume'));
        }
    }

    public function testALocallyDeflatedSnapshotAlsoVerifiesAToken(): void
    {
        $this->snapshotMode = 'deflated';
        self::assertSame('', $this->checkout($this->agentWithToken()));
        self::assertSame(self::DID, $this->evaluated()['agentId']);
    }

    public function testAPersonPassesWithTheCompressedSnapshotAndTheValveReadsItsCap(): void
    {
        $this->serveCompressedVector('valid.deflated-by-real-signer');
        $this->evaluateStatus = 503;
        self::assertSame('', $this->checkout([], [], 49.99), 'por debajo del tope R030 (5000,00)');
        $this->calls = [];
        self::assertStringContainsString(self::RULE, $this->checkout([], [], 6000.0), 'el tope R030 viene DENTRO del payload comprimido');
    }

    public function testTheCompressedBombHoldsAnAgentWithATokenAndLetsAPersonThrough(): void
    {
        foreach (['enforce', 'observe'] as $mode) {
            $this->calls = [];
            $this->serveCompressedVector('bomb.over-cap');
            self::assertStringContainsString(self::HELD, $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => $mode]), $mode);
            self::assertSame([], $this->urls('/v1/rules/evaluate'), $mode);
        }
        $this->calls = [];
        $this->evaluateStatus = 503;
        self::assertSame('', $this->checkout([], ['trusteed/enforcement/failure_mode' => 'enforce']), 'una persona nunca queda retenida por esto');
    }

    // ── resolver (list) ──────────────────────────────────────────────────

    public function testLegitTokenVerifiesAgainstTheRealListResolver(): void
    {
        self::assertSame('', $this->checkout($this->agentWithToken()));
        $payload = $this->evaluated();
        self::assertSame(self::DID, $payload['agentId']);
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes']);
        $nonce = array_values(array_filter($this->calls, static fn (array $c): bool => str_ends_with($c['url'], 'nonce-consume')));
        self::assertCount(1, $nonce);
        self::assertSame(self::DID, json_decode($nonce[0]['body'], true)['agentId']);
    }

    public function testDuplicateDidLastWellFormedEntryWinsAndAMalformedOneNeverOverrides(): void
    {
        $fixture = self::fixturePayload()['agentDidResolver'];
        $this->resolver = array_merge($fixture, [
            ['did' => self::DID, 'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => self::b64url(random_bytes(32))]],
            ['did' => self::DID, 'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => $this->agentPublicX]],
            ['did' => self::DID, 'publicKeyJwk' => 'garbage'],
            ['did' => self::DID],
            'not-an-entry',
        ]);
        self::assertSame('', $this->checkout($this->agentWithToken()));
        self::assertSame(self::DID, $this->evaluated()['agentId']);
    }

    public function testLegacyMapResolverAlsoVerifies(): void
    {
        $this->resolver = null;
        $payload = self::fixturePayload();
        $map = [self::DID => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => $this->agentPublicX]];
        foreach ($payload['agentDidResolver'] as $entry) {
            $map[$entry['did']] = $entry['publicKeyJwk'];
        }
        $this->resolver = $map;
        self::assertSame('', $this->checkout($this->agentWithToken()));
        self::assertSame(self::DID, $this->evaluated()['agentId']);
    }

    // ── claims only from VALID tokens ────────────────────────────────────

    private const CLAIMS = ['return_policy' => 'final_sale', 'scope' => 'checkout:write cart:read', 'providerConfidence' => 0.95];

    public function testClaimsOfAValidTokenAreProjected(): void
    {
        $this->checkout($this->agentWithToken(self::CLAIMS), [], 20.0, true);
        $attrs = $this->evaluated()['orderContext']['cartAttributes'];
        self::assertArrayNotHasKey('_return_policy_mismatch', $attrs);
        self::assertSame('checkout:write,cart:read', $attrs['_requested_scopes'] ?? null);
        self::assertArrayHasKey('_provider_confidence', $attrs);
    }

    public function testClaimsOfAnUnverifiableTokenAreIgnored(): void
    {
        $this->resolver = self::fixturePayload()['agentDidResolver']; // DID absent gives INDETERMINATE
        $this->checkout($this->agentWithToken(self::CLAIMS), [], 20.0, true);
        $attrs = $this->evaluated()['orderContext']['cartAttributes'];
        self::assertSame('true', $attrs['_agent_token_signature_invalid'] ?? null);
        self::assertSame('true', $attrs['_return_policy_mismatch'] ?? null, 'final_sale de un token sin probar no esquiva R013');
        self::assertArrayNotHasKey('_requested_scopes', $attrs);
        self::assertArrayNotHasKey('_provider_confidence', $attrs);
    }

    public function testClaimsOfAForgedTokenAreIgnored(): void
    {
        $forged = substr($this->token(self::CLAIMS), 0, -4) . 'AAAA';
        $this->checkout(['X-Trusteed-Agent-Token' => $forged], [], 20.0, true);
        $attrs = $this->evaluated()['orderContext']['cartAttributes'];
        self::assertSame('true', $attrs['_agent_token_signature_invalid'] ?? null);
        self::assertSame('true', $attrs['_return_policy_mismatch'] ?? null);
        self::assertArrayNotHasKey('_requested_scopes', $attrs);
        self::assertArrayNotHasKey('_provider_confidence', $attrs);
    }

    public function testClaimsOfAReplayedTokenAreIgnored(): void
    {
        $this->nonceStatus = 409;
        $this->checkout($this->agentWithToken(self::CLAIMS), [], 20.0, true);
        $attrs = $this->evaluated()['orderContext']['cartAttributes'];
        self::assertSame('true', $attrs['_agent_token_replay'] ?? null);
        self::assertSame('true', $attrs['_return_policy_mismatch'] ?? null);
        self::assertArrayNotHasKey('_requested_scopes', $attrs);
        self::assertArrayNotHasKey('_provider_confidence', $attrs);
    }

    /** @return array<string,mixed> */
    private static function r030Cap(int $maxCents): array
    {
        return [
            'ruleCode' => 'R030', 'enabled' => true, 'mode' => 'enforce', 'appliesTo' => 'ALL', 'tier' => 1,
            'params' => ['maxAmountCents' => $maxCents],
        ];
    }
}
