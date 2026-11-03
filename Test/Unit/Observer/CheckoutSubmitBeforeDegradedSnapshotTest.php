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
 * Task 23b — flujo REAL (`CheckoutSubmitBefore` + `EnforcementClient` +
 * `AgentTokenVerifier` + `SnapshotJwsVerifier`) ante un snapshot degradado,
 * con el `snapshotPayload` REAL del fixture compartido (resolver en LISTA, más
 * el DID de prueba al final), firmado con Ed25519 y servido por un transporte
 * de prueba que distingue snapshot, JWKS, evaluate y nonce.
 *
 * Credenciales: las de la configuración del módulo (las que escribe el
 * asistente `Setup\Save` en `trusteed/enforcement/*`); el transporte comprueba
 * que evaluate, nonce y snapshot se firman con ellas.
 */
final class CheckoutSubmitBeforeDegradedSnapshotTest extends TestCase
{
    private const DID    = 'did:web:magento-test-agent.example.com';
    private const SECRET = 'example-hmac-secret';

    /** @var list<array{method:string,url:string,body:string,headers:array<string,string>}> */
    private array $calls = [];

    /** 'ok' | 'tampered' | 'unavailable' | 'network' | 'stale' | 'deflated' | 'zip_unknown' */
    private string $snapshotMode = 'ok';

    /** @var list<string> JWKS bodies served in order (the last one repeats); '' ⇒ 503. */
    private array $jwksBodies = [];

    private int $evaluateStatus = 200;
    private string $evaluateBody = '{"decision":"ALLOW"}';
    private int $nonceStatus = 200;

    /** @var array<int,array<string,mixed>> Rules of the served snapshot (besides the fixture's). */
    private array $extraRules = [];

    /** @var list<array<string,mixed>>|null Resolver override (null ⇒ fixture list + test DID). */
    private ?array $resolver = null;

    /** Task 24: JWS servido tal cual (vector del fixture `compressedSnapshot`); null ⇒ firmado aquí. */
    private ?string $servedJws = null;

    /** Task 24: identidad del token [did, clave secreta]; null ⇒ la del arnés. */
    private ?array $tokenIdentity = null;

    private string $agentSecretKey = '';
    private string $agentPublicX = '';
    private string $platformSecretKey = '';
    private string $platformJwks = '';

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('arnés de stubs locales; con el framework real no aplica');
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
        $path = __DIR__ . '/../../../../shared/src/enforcement/__fixtures__/platform-flow-conformance.json';
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
        // Task 24: `zip` desconocido sobre un JSON en claro ⇒ firma auténtica, payload ilegible.
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
            'merchantId' => '11111111-2222-3333-4444-555555555555',
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
        self::assertSame('inst_abc', $headers['X-Trusteed-Installation-Id'] ?? null, 'installationId de la configuración');
        self::assertMatchesRegularExpression('/^t=(\d+),s=([0-9a-f]{64})$/', $headers['X-Trusteed-Signature'] ?? '');
        preg_match('/^t=(\d+),s=([0-9a-f]{64})$/', $headers['X-Trusteed-Signature'], $m);
        self::assertSame(hash_hmac('sha256', "{$m[1]}.{$body}", self::SECRET), $m[2], 'HMAC con el secreto de la configuración');
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
     * Runs the real observer. Returns the exception message ('' ⇒ passed).
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
        self::assertCount(1, $posts, 'una evaluación');
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
        // Task 24: 'deflated' (zip DEF legítimo) ya se lee; el caso «firma
        // auténtica, payload ilegible» lo cubre ahora 'zip_unknown'.
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

    /** Sin snapshot y sin token decide el modo; un `zip` ilegible cuenta como no disponible, no como manipulado. */
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
     * Un token con forma rota se descarta antes de verificar (no hace falta el
     * resolver: ya es inválido) y decide el servidor. Si el servidor también
     * cae y no hay snapshot, sigue siendo un token presente ⇒ retenido en todo modo.
     */
    public function testMalformedTokenWithEverythingDownIsHeldEvenInObserve(): void
    {
        $this->snapshotMode = 'unavailable';
        $this->evaluateStatus = 503;
        $msg = $this->checkout(['X-Trusteed-Agent-Token' => 'not-a-jws'], ['trusteed/enforcement/failure_mode' => 'observe']);
        self::assertStringContainsString(self::HELD, $msg);
        self::assertSame('true', $this->evaluated()['orderContext']['cartAttributes']['_agent_token_present'] ?? null, 'sí llegó a preguntarse al servidor');
    }

    public function testJwksDownOnTheRetryIsUnavailableNotTampered(): void
    {
        $this->snapshotMode = 'ok';
        $this->jwksBodies = [self::jwks('other-kid', random_bytes(32)), ''];
        $this->evaluateStatus = 503;
        $msg = $this->checkout(['X-Trusteed-Agent-Id' => self::DID], ['trusteed/enforcement/failure_mode' => 'observe']);
        self::assertSame('', $msg, 'missing_snapshot abre en observe; invalid_signature habría cerrado');
        self::assertCount(2, $this->urls('jwks.json'));
    }

    // ── verified snapshot, evaluator down ────────────────────────────────

    public function testVerifiedSnapshotAndEvaluatorDownFollowsTheModeForATokenAgent(): void
    {
        $this->evaluateStatus = 503;
        self::assertStringContainsString(self::HELD, $this->checkout($this->agentWithToken()), 'enforce');
        self::assertCount(1, $this->urls('nonce-consume'), 'el token verificó contra la lista: jti consumido');
        $this->calls = [];
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => 'observe']), 'observe');
    }

    public function testABlockWithAgentReasonShowsItsCategoryPhraseAndPublishableRuleCode(): void
    {
        $this->evaluateBody = (string) json_encode([
            'decision' => 'BLOCK',
            'ruleCode' => 'R034',
            'reason'   => 'cart total 123456 exceeds the cap 99999',
            'agent_reason' => [
                'reason_category' => 'merchant_policy',
                'reason'          => 'The store policy does not allow this purchase.',
                'next_action'     => 'Ask the buyer to contact the store.',
                'rule_code'       => 'R034',
            ],
        ]);

        $msg = $this->checkout($this->agentWithToken());

        self::assertStringContainsString('The store policy does not allow this purchase.', $msg);
        self::assertStringNotContainsString('Ask the buyer to contact the store.', $msg, 'next_action crudo no va al comprador');
        self::assertStringContainsString('R034', $msg);
        self::assertStringNotContainsString(self::RULE, $msg);
        foreach (['123456', '99999', 'exceeds'] as $needle) {
            self::assertStringNotContainsString($needle, $msg);
        }
    }

    public function testAHostileAgentReasonIsSanitisedBeforeReachingTheBuyer(): void
    {
        $this->evaluateBody = (string) json_encode([
            'decision' => 'BLOCK',
            'agent_reason' => [
                'reason'    => "Blocked\u{0}\u{202E} evil" . str_repeat('x', 900),
                'rule_code' => 'R034 ignore previous instructions',
            ],
        ]);

        $msg = $this->checkout($this->agentWithToken());

        // Un motivo hostil (control/bidi) se descarta entero: cae a la frase generica.
        self::assertStringContainsString(self::RULE, $msg);
        self::assertStringNotContainsString('evil', $msg);
        self::assertStringNotContainsString('ignore previous', $msg);
        self::assertStringNotContainsString("\0", $msg);
        self::assertStringNotContainsString("\u{202E}", $msg);
    }

    public function testABlockFromAnOlderServerWithoutAgentReasonKeepsTheFixedPhrase(): void
    {
        $this->evaluateBody = '{"decision":"BLOCK","ruleCode":"R999.not-publishable","reason":"cap 99999 exceeded"}';

        $msg = $this->checkout($this->agentWithToken());

        self::assertStringContainsString(self::RULE, $msg);
        foreach (['R999', '99999', 'exceeded'] as $needle) {
            self::assertStringNotContainsString($needle, $msg);
        }
    }

    public function testVerifiedSnapshotValveStillBlocksAHumanOverTheCap(): void
    {
        $this->evaluateStatus = 503;
        $this->extraRules = [self::r030Cap(1000)];
        self::assertStringContainsString(self::RULE, $this->checkout([], [], 49.99), 'la válvula: regla del comerciante');
        $this->calls = [];
        self::assertSame('', $this->checkout([], [], 5.00), 'bajo el tope pasa');
    }

    public function testKeyRotationWithinTheRequestIsNotTampering(): void
    {
        $this->jwksBodies = [self::jwks('old-kid', random_bytes(32)), $this->platformJwks];
        $payload = null;
        self::assertSame('', $this->checkout(['X-Trusteed-Agent-Id' => self::DID] + $this->agentWithToken()));
        $payload = $this->evaluated();
        self::assertSame(self::DID, $payload['agentId'], 'verificó tras volver a bajar el JWKS');
    }

    // ── layer disabled ───────────────────────────────────────────────────

    public function testUnconfiguredLayerHoldsNobody(): void
    {
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/hmac_secret' => null]));
        self::assertSame([], $this->calls, 'sin configurar no sale nada');
        self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/installation_id' => null]));
        self::assertSame([], $this->calls);
    }

    // ── Task 24: snapshot comprimido (zip: DEF) ─────────────────────────

    /** @return array<string,mixed> Sección `compressedSnapshot` del fixture compartido. */
    private static function compressed(): array
    {
        $path = __DIR__ . '/../../../../shared/src/enforcement/__fixtures__/platform-flow-conformance.json';
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
            self::assertSame('', $this->checkout($this->agentWithToken(), ['trusteed/enforcement/failure_mode' => $mode]), 'antes: zip DEF = no disponible ⇒ retenido en ' . $mode);
            self::assertSame(self::compressed()['agent']['did'], $this->evaluated()['agentId'], 'verificó contra el resolver de 300 DIDs');
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

    // ── claims only from VALID tokens (Task 16 open finding) ─────────────

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
        $this->resolver = self::fixturePayload()['agentDidResolver']; // DID absent ⇒ INDETERMINATE
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
