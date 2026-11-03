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
use Trusteed\AgenticCommerce\Service\AgentHistoryFetcher;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * C2 + A8 (auditoría spec-048 2026-09-27) ejercidos sobre el observer REAL
 * `CheckoutSubmitBefore::execute()`, con `EnforcementClient` y
 * `AgentTokenVerifier` reales y un transporte de prueba que captura lo que se
 * envía a `/v1/rules/evaluate`.
 *
 * - La identidad del agente llega por cabeceras `X-Trusteed-Agent-*` de la
 *   petición que coloca el pedido (antes sólo de dos claves de sesión que nada
 *   escribía: todo checkout salía orgánico).
 * - El payload de un checkout orgánico queda BYTE A BYTE como en HEAD
 *   (`eff8b06b9`): el literal de abajo está escrito a mano y se comprobó contra
 *   la salida del observer de HEAD con este mismo arnés antes de tocarlo.
 * - Un humano no se bloquea por una avería nuestra: ni por el 503 del
 *   evaluador ni por una excepción al construir el payload.
 *
 * Arnés local: depende de los stubs de `Test/Unit/stubs/MagentoFrameworkStubs.php`
 * (sesión, Quote, Observer mínimos). Con el framework real cargado se salta.
 */
final class CheckoutSubmitBeforeIdentityChannelTest extends TestCase
{
    /** @var list<string> */
    private array $posted = [];

    /** @var list<string> Cuerpos enviados a /v1/agent-events/nonce-consume. */
    private array $noncePosts = [];

    /** @var array{jws:string,jwks:string}|null Snapshot firmado servido por GET (null ⇒ 503). */
    private ?array $snapshot = null;

    /** Excepción que lanza el transporte al POSTear la evaluación (timeout, red…). */
    private ?\Throwable $postThrows = null;

    /** Moneda del quote (un valor no UTF-8 hace fallar `json_encode`). */
    private string $currency = 'eur';

    /** Estado HTTP de /v1/agent-events/nonce-consume (200 ACCEPTED, 409 REPLAY, 503 INDETERMINATE). */
    private int $nonceStatus = 200;

    private ?Quote $lastQuote = null;

    /** @var list<object> Líneas visibles del quote. */
    private array $items = [];

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('arnés de stubs locales; con el framework real no aplica');
        }
        $this->posted     = [];
        $this->noncePosts = [];
        $this->snapshot   = null;
        $this->postThrows = null;
        $this->currency   = 'eur';
        $this->nonceStatus = 200;
        $this->items = [];
    }

    private function config(array $extra = []): ScopeConfigInterface
    {
        $values = array_merge([
            'trusteed_general/general/merchant_id'  => 'merchant_xyz',
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            'trusteed/enforcement/hmac_secret'      => 'example-hmac-secret',
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

    private function curl(int $status, string $body): Curl
    {
        $posted     = &$this->posted;
        $noncePosts = &$this->noncePosts;
        return new class($status, $body, $posted, $noncePosts, $this->snapshot, $this->postThrows, $this->nonceStatus) extends Curl {
            private string $last = '';
            public function __construct(
                private readonly int $status,
                private readonly string $body,
                private array &$posted,
                private array &$noncePosts,
                private readonly ?array $snapshot,
                private readonly ?\Throwable $postThrows,
                private readonly int $nonceStatus
            ) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                $this->last = 'post';
                if (str_ends_with($url, '/v1/agent-events/nonce-consume')) {
                    $this->last = 'nonce';
                    $this->noncePosts[] = (string) $body;
                    return;
                }
                if (str_ends_with($url, '/v1/rules/evaluate')) {
                    $this->posted[] = (string) $body;
                    if ($this->postThrows !== null) {
                        throw $this->postThrows;
                    }
                }
            }
            public function get(string $url): void
            {
                $this->last = str_contains($url, '.well-known/jwks.json') ? 'jwks' : 'snapshot';
            }
            public function getStatus(): int
            {
                if ($this->last === 'nonce') {
                    return $this->nonceStatus;
                }
                if ($this->last === 'jwks' || $this->last === 'snapshot') {
                    return $this->snapshot === null ? 503 : 200;
                }
                return $this->status;
            }
            public function getBody(): string
            {
                return match ($this->last) {
                    'jwks'     => $this->snapshot['jwks'] ?? '',
                    'snapshot' => $this->snapshot['jws'] ?? '',
                    'nonce'    => '{}',
                    default    => $this->body,
                };
            }
        };
    }

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Token de agente REAL firmado con Ed25519 por `$did` y el snapshot de
     * plataforma (también firmado) que publica su clave en `agentDidResolver`.
     *
     * @param array<string,mixed> $override claims que se añaden o sustituyen (B5)
     * @param list<string>        $drop     claims que se quitan (B5: `['jti']` da la forma canónica)
     * @return array{token:string, snapshot:array{jws:string,jwks:string}}
     */
    private static function agentTokenAndSnapshot(string $did, array $override = [], array $drop = []): array
    {
        $agentKeys = sodium_crypto_sign_keypair();
        $now       = time();
        $tHeader   = self::b64url((string) json_encode(['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt', 'kid' => $did . '#key-1']));
        $claims    = array_merge([
            'iss' => $did, 'aud' => 'trusteed', 'merchantId' => 'merchant_xyz', 'iat' => $now, 'exp' => $now + 120,
            'nonce' => str_repeat('n', 32), 'jti' => 'jti_' . bin2hex(random_bytes(10)),
        ], $override);
        foreach ($drop as $claim) {
            unset($claims[$claim]);
        }
        $tBody     = self::b64url((string) json_encode($claims));
        $tSig  = self::b64url(sodium_crypto_sign_detached("{$tHeader}.{$tBody}", sodium_crypto_sign_secretkey($agentKeys)));
        $token = "{$tHeader}.{$tBody}.{$tSig}";

        $platformKeys = sodium_crypto_sign_keypair();
        $sHeader = self::b64url((string) json_encode(['alg' => 'EdDSA', 'kid' => 'k1']));
        $sBody   = self::b64url((string) json_encode(['rules' => [], 'validUntil' => gmdate('Y-m-d\\TH:i:s\\Z', time() + 300), 'agentDidResolver' => [[
            'did' => $did,
            'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => self::b64url(sodium_crypto_sign_publickey($agentKeys))],
        ]]]));
        $sSig = self::b64url(sodium_crypto_sign_detached("{$sHeader}.{$sBody}", sodium_crypto_sign_secretkey($platformKeys)));
        $jwks = (string) json_encode(['keys' => [[
            'kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => 'k1',
            'x' => self::b64url(sodium_crypto_sign_publickey($platformKeys)),
        ]]]);

        return ['token' => $token, 'snapshot' => ['jws' => "{$sHeader}.{$sBody}.{$sSig}", 'jwks' => $jwks]];
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
            /** @return string|false Igual que Laminas: false si la cabecera no viene. */
            public function getHeader($name, $default = false)
            {
                foreach ($this->headers as $k => $v) {
                    if (strcasecmp($k, $name) === 0) {
                        return $v;
                    }
                }
                return $default;
            }
        };
    }

    private static function quote(bool $failOnAddress = false, string $currency = 'eur'): Quote
    {
        $quote = new class($failOnAddress, $currency) extends Quote {
            /** @var array<string,mixed> */
            private array $bag = [];
            public function __construct(private readonly bool $failOnAddress, private readonly string $currency) {}
            public function setData($key, $value = null)
            {
                $this->bag[$key] = $value;
                return $this;
            }
            public function unsetData($key = null)
            {
                unset($this->bag[$key]);
                return $this;
            }
            public function getData($key = null, $index = null)
            {
                return $this->bag[$key] ?? null;
            }
            public function getQuoteCurrencyCode()
            {
                return $this->currency;
            }
            public function getId()
            {
                return 0;
            }
            public function getBillingAddress()
            {
                if ($this->failOnAddress) {
                    throw new \RuntimeException('address repository unavailable');
                }
                return null;
            }
            public function getShippingAddress()
            {
                return null;
            }
            public function getCustomer()
            {
                return null;
            }
        };
        $quote->grandTotal = 49.99;
        return $quote;
    }

    private static function event(Quote $quote): Observer
    {
        return new class($quote) extends Observer {
            public function __construct(private readonly Quote $quote) {}
            public function getEvent()
            {
                return new class($this->quote) {
                    public function __construct(private readonly Quote $quote) {}
                    public function getData($key)
                    {
                        return $key === 'quote' ? $this->quote : null;
                    }
                };
            }
        };
    }

    private function checkout(
        ?RequestInterface $request,
        int $status = 200,
        string $body = '{"decision":"ALLOW"}',
        array $config = [],
        ?CheckoutSession $session = null,
        bool $failOnAddress = false,
        ?AgentHistoryFetcher $history = null
    ): CheckoutSession {
        $session ??= new CheckoutSession();
        $logger  = $this->createMock(LoggerInterface::class);
        $scope   = $this->config($config);
        $observer = new CheckoutSubmitBefore(
            $session,
            new AgentTokenVerifier($logger),
            new EnforcementClient($scope, $this->curl($status, $body), $logger),
            $scope,
            $logger,
            $this->createMock(CacheInterface::class),
            $this->createMock(CategoryRepositoryInterface::class),
            $history,
            request: $request,
        );
        $quote = self::quote($failOnAddress, $this->currency);
        $this->lastQuote = $quote;
        $quote->visibleItems = $this->items;
        $observer->execute(self::event($quote));
        return $session;
    }

    /** @return array<string,mixed> */
    private function lastPayload(): array
    {
        self::assertCount(1, $this->posted, 'una sola evaluación enviada');
        $decoded = json_decode($this->posted[0], true);
        self::assertIsArray($decoded);
        return $decoded;
    }

    /**
     * Literal del cuerpo orgánico, escrito a mano. `__TS__` sustituye al
     * `timestamp` (reloj); todo lo demás, orden de claves incluido, es el de HEAD.
     */
    private const ORGANIC_BODY_LITERAL =
        '{"merchantId":"merchant_xyz","agentId":null,"orderContext":{"cartTotalCents":4999,'
        . '"currency":"EUR","itemCount":0,"discountCodes":[],"lineItems":[],'
        . '"cartAttributes":{"_cart_total_cents":"4999","_cart_total_dev_bps":"2"}},'
        . '"platform":"MAGENTO","installationId":"inst_abc","timestamp":"__TS__"}';

    public function testOrganicPayloadIsByteIdenticalToHead(): void
    {
        $this->checkout(self::request([]));
        self::assertCount(1, $this->posted);
        $body = (string) preg_replace(
            '/"timestamp":"\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ"/',
            '"timestamp":"__TS__"',
            $this->posted[0]
        );
        self::assertSame(self::ORGANIC_BODY_LITERAL, $body);
    }

    public function testOrganicPayloadWithoutRequestIsAlsoIdentical(): void
    {
        $this->checkout(null);
        $body = (string) preg_replace('/"timestamp":"[^"]+"/', '"timestamp":"__TS__"', $this->posted[0]);
        self::assertSame(self::ORGANIC_BODY_LITERAL, $body);
    }

    /**
     * Task 16 (revisión de seguridad, PoC): este test fijaba que el DID de la
     * cabecera, SIN token, viajaba como `agentId`. Era el comportamiento
     * vulnerable: el historial del servidor (R003/R005/R010/R021/R023/R024) y
     * la proyección local se indexan por el hash de `agentId`, así que el
     * agente heredaba el historial de otro DID o quemaba el de una víctima.
     * Sustituido: cabecera sin token ⇒ agente ANÓNIMO, sin historial.
     */
    public function testDeclaredDidHeaderWithoutTokenIsAnAnonymousAgent(): void
    {
        $history = self::historySpy();
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'     => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Origin' => 'webmcp',
        ]), history: $history);
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'un DID sólo declarado no viaja como identidad');
        self::assertSame('agentic_endpoint', $payload['endpointClass'], 'sigue siendo agente');
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes'], 'sin token no hay token inválido');
        self::assertSame([], $history->hashes, 'ni se consulta el historial del DID declarado');
        self::assertSame('endpointClass', array_key_last($payload), 'se añade al final: el resto no cambia');
        // Fix ronda 1 (IMPORTANT 1): antes aquí se afirmaba que el DID de una
        // cabecera SIN token acababa guardado como «verificado» y atribuido al
        // pedido (R023). Era el comportamiento vulnerable: ya no se persiste.
        self::assertNull(
            $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID),
            'un DID de cabecera sin token verificado no se atribuye al pedido'
        );
    }

    public function testOriginHeaderAloneIsSentAsAnAnonymousAgent(): void
    {
        $this->checkout(self::request(['X-Trusteed-Agent-Origin' => 'webmcp']));
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId']);
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
    }

    /** Task 5: la marca que pone el endpoint WebMCP (servidor) cuenta como agente sin cabeceras. */
    public function testWebmcpChannelAppliesAgentRules(): void
    {
        $session = new CheckoutSession();
        $session->setData('trusteed_agentic_origin', '1');
        $session->setData('trusteed_agentic_channel', 'webmcp');
        $session = $this->checkout(self::request([]), session: $session);
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId']);
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertSame('webmcp', $session->getData(CheckoutSubmitBefore::SESSION_AGENT_CHANNEL_FOR_ORDER), 'el canal pasa al pedido');
        self::assertNull($session->getData('trusteed_agentic_origin'), 'la marca se consume tras evaluar');
        self::assertNull($session->getData('trusteed_agentic_channel'));
    }

    public function testWebmcpMarkIsFailClosedLikeAnyAgent(): void
    {
        $session = new CheckoutSession();
        $session->setData('trusteed_agentic_origin', '1');
        $session->setData('trusteed_agentic_channel', 'webmcp');
        try {
            $this->checkout(self::request([]), status: 503, body: '', session: $session);
            self::fail('un agente WebMCP con el evaluador caído no pasa');
        } catch (LocalizedException) {
            self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_AGENT_CHANNEL_FOR_ORDER));
        }
    }

    /** Un agente retenido que reenvía sin llamar a ninguna tool sigue evaluándose como agente. */
    public function testAgenticMarkSurvivesABlockAndTheResubmitIsStillAnAgent(): void
    {
        $session = new CheckoutSession();
        $session->setData('trusteed_agentic_origin', '1');
        $session->setData('trusteed_agentic_channel', 'webmcp');
        try {
            $this->checkout(self::request([]), status: 503, body: '', session: $session);
            self::fail('retenido');
        } catch (LocalizedException) {
            self::assertSame('1', $session->getData('trusteed_agentic_origin'));
            self::assertSame('webmcp', $session->getData('trusteed_agentic_channel'));
        }
        $this->checkout(self::request([]), session: $session);
        self::assertCount(2, $this->posted, 'dos evaluaciones: la retenida y el reenvío');
        self::assertSame('agentic_endpoint', json_decode($this->posted[1], true)['endpointClass'], 'el reenvío sigue siendo agente');
        self::assertNull($session->getData('trusteed_agentic_origin'), 'ALLOW consume la marca');
    }

    public function testUnmarkedHumanCheckoutIsUnchangedAndCarriesNoChannel(): void
    {
        $session = $this->checkout(self::request([]));
        self::assertArrayNotHasKey('endpointClass', $this->lastPayload());
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_AGENT_CHANNEL_FOR_ORDER));
    }

    public function testMalformedTokenHeaderIsTreatedAsAnInvalidAgentToken(): void
    {
        $this->checkout(self::request(['X-Trusteed-Agent-Token' => 'garbage-token']));
        $payload = $this->lastPayload();
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_present']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid']);
        self::assertStringNotContainsString('garbage-token', $this->posted[0], 'el valor rechazado no se refleja');
    }

    public function testRequestWithoutGetHeaderFallsBackToTheSession(): void
    {
        $request = new class implements RequestInterface {
            public function getParam($key, $defaultValue = null)
            {
                return $defaultValue;
            }
        };
        $session = new CheckoutSession();
        $session->setData(CheckoutSubmitBefore::SESSION_AGENT_DID, 'did:web:session.example');
        $this->checkout($request, session: $session);
        $payload = $this->lastPayload();
        // Task 16: el DID de sesión también es sólo una declaración.
        self::assertNull($payload['agentId']);
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_AGENT_DID), 'la sesión se limpia tras evaluar');
    }

    public function testHeaderReadThatThrowsDegradesToTheSession(): void
    {
        $request = new class implements RequestInterface {
            public function getParam($key, $defaultValue = null)
            {
                return $defaultValue;
            }
            public function getHeader($name, $default = false)
            {
                throw new \RuntimeException('header bag unavailable');
            }
        };
        $this->checkout($request);
        self::assertNull($this->lastPayload()['agentId']);
    }

    public function testHumanPassesWhenTheEvaluatorReturns503InEnforceMode(): void
    {
        $this->checkout(self::request([]), 503, '');
        self::assertCount(1, $this->posted);
    }

    public function testHeaderAgentIsBlockedWhenTheEvaluatorReturns503InEnforceMode(): void
    {
        $this->expectException(LocalizedException::class);
        $this->checkout(self::request(['X-Trusteed-Agent-Id' => 'did:web:agent.example.com']), 503, '');
    }

    public function testHeaderAgentPassesOn503WhenTheMerchantChoseObserve(): void
    {
        $this->checkout(
            self::request(['X-Trusteed-Agent-Id' => 'did:web:agent.example.com']),
            503,
            '',
            ['trusteed/enforcement/failure_mode' => 'observe']
        );
        self::assertCount(1, $this->posted);
    }

    public function testHumanPassesWhenBuildingThePayloadThrows(): void
    {
        $this->checkout(self::request([]), failOnAddress: true);
        self::assertSame([], $this->posted, 'no llegó a evaluarse');
    }

    public function testAgentIsBlockedWithAnHonestMessageWhenBuildingThePayloadThrows(): void
    {
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Origin' => 'webmcp']), failOnAddress: true);
            self::fail('un agente no pasa por una avería nuestra en enforce');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
            self::assertStringNotContainsString('did not pass', $e->getMessage(), 'una avería no es «una regla te bloqueó»');
        }
    }

    /**
     * Task 27c (M6): una excepción NUESTRA retiene al agente en TODOS los modos.
     * Antes `observe` (y cualquier valor que abra ante una caída) lo dejaba
     * pasar, token incluido: una avería propia no es un permiso.
     */
    public function testAnInternalErrorHoldsAnAgentInEveryFailureMode(): void
    {
        foreach (['enforce', 'observe', 'OBSERVE', 'balanced', 'permissive', 'raro', ''] as $mode) {
            try {
                $this->checkout(
                    self::request(['X-Trusteed-Agent-Origin' => 'webmcp']),
                    failOnAddress: true,
                    config: ['trusteed/enforcement/failure_mode' => $mode]
                );
                self::fail("un agente no pasa por una avería propia (failure_mode='{$mode}')");
            } catch (LocalizedException $e) {
                self::assertStringContainsString('could not be verified', $e->getMessage(), $mode);
                self::assertStringNotContainsString('did not pass', $e->getMessage(), $mode);
            }
        }
        self::assertSame([], $this->posted, 'nunca llegó a evaluarse');
    }

    public function testAnInternalErrorNeverHoldsAHumanInAnyFailureMode(): void
    {
        foreach (['enforce', 'observe', 'balanced', 'raro'] as $mode) {
            $this->checkout(self::request([]), failOnAddress: true, config: ['trusteed/enforcement/failure_mode' => $mode]);
        }
        self::assertSame([], $this->posted);
    }

    public function testServerBlockStillBlocksAHuman(): void
    {
        $this->expectException(LocalizedException::class);
        $this->checkout(self::request([]), 200, '{"decision":"BLOCK"}');
    }

    // ── Fix ronda 1 — IMPORTANT 1/2: sólo un token VERIFICADO atribuye ─────────

    public function testValidTokenForTheSameDidIsPersistedAsVerified(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $payload = $this->lastPayload();
        self::assertSame('did:web:agent.example.com', $payload['agentId']);
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes']);
        self::assertCount(1, $this->noncePosts, 'el jti del token válido se consume');
        self::assertSame('did:web:agent.example.com', $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    // ── B5 (2026-10-01) — el identificador de un solo uso es `nonce`, no `jti` ──

    /** @return list<string> identificadores enviados a nonce-consume */
    private function consumedIds(): array
    {
        return array_map(static fn (string $b): string => (string) (json_decode($b, true)['nonce'] ?? ''), $this->noncePosts);
    }

    /** Forma EXACTA de generate-test-agent-token.ts (nonce, sin jti): VÁLIDO y consume su nonce. */
    public function testCanonicalTokenWithNonceAndNoJtiIsValidAndConsumesItsNonce(): void
    {
        $nonce  = bin2hex(random_bytes(16));
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', ['nonce' => $nonce], ['jti']);
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $payload = $this->lastPayload();
        self::assertSame('did:web:agent.example.com', $payload['agentId']);
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes']);
        self::assertArrayNotHasKey('_agent_token_jti_missing', $payload['orderContext']['cartAttributes']);
        self::assertSame([$nonce], $this->consumedIds(), 'al servidor viaja el NONCE del payload firmado');
        self::assertSame('did:web:agent.example.com', $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    public function testReplayOfACanonicalNonceIsAnInvalidToken(): void
    {
        $this->nonceStatus = 409;
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', [], ['jti']);
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $payload = $this->lastPayload();
        self::assertCount(1, $this->noncePosts);
        self::assertNull($payload['agentId'], 'un nonce gastado no prueba identidad');
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid'] ?? null);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    public function testLegacyJtiWithoutNonceIsValidThroughTheAlias(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', ['jti' => 'legacyAliasJti000001'], ['nonce']);
        $this->snapshot = $minted['snapshot'];
        $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        self::assertSame('did:web:agent.example.com', $this->lastPayload()['agentId']);
        self::assertSame(['legacyAliasJti000001'], $this->consumedIds());
    }

    public function testNonceWinsWhenBothClaimsArePresentAndDifferent(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', ['nonce' => 'canonicalNonce000001', 'jti' => 'legacyAliasJti000001']);
        $this->snapshot = $minted['snapshot'];
        $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        self::assertSame(['canonicalNonce000001'], $this->consumedIds());
    }

    public function testTokenWithNeitherNonceNorJtiIsInvalidAndSpendsNothing(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', [], ['nonce', 'jti']);
        $this->snapshot = $minted['snapshot'];
        $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $attrs = $this->lastPayload()['orderContext']['cartAttributes'];
        self::assertNull($this->lastPayload()['agentId']);
        self::assertSame('true', $attrs['_agent_token_jti_missing'] ?? null, 'el atributo heredado cubre el nonce ausente');
        self::assertSame([], $this->noncePosts);
    }

    /** @dataProvider malformedIdentifiers */
    public function testMalformedNonceIsInvalidAndSpendsNothing(string $nonce): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com', ['nonce' => $nonce], ['jti']);
        $this->snapshot = $minted['snapshot'];
        $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $attrs = $this->lastPayload()['orderContext']['cartAttributes'];
        self::assertNull($this->lastPayload()['agentId']);
        self::assertSame('true', $attrs['_agent_token_jti_malformed'] ?? null);
        self::assertSame([], $this->noncePosts);
    }

    /** @return array<string,array{string}> */
    public static function malformedIdentifiers(): array
    {
        return [
            '15 caracteres' => [str_repeat('n', 15)],
            '65 caracteres' => [str_repeat('n', 65)],
            'alfabeto fuera de base64url' => ['has.dot.in.it.illegal0001'],
        ];
    }

    /** IMPORTANT 2 — cabecera did:web:A con un token VÁLIDO de B: el token no vale para A. */
    public function testValidTokenOfAnotherAgentIsTreatedAsInvalid(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:b.example.com');
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:a.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'Task 16: ni A (declarado) ni B (token ajeno)');
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid']);
        self::assertSame([], $this->noncePosts, 'no se quema el jti de otro agente');
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    /** Sin cabecera de DID, un token válido aporta su DID verificado. */
    public function testValidTokenWithoutDidHeaderUsesTheTokenDid(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:b.example.com');
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]));
        $payload = $this->lastPayload();
        self::assertSame('did:web:b.example.com', $payload['agentId']);
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes']);
        self::assertSame('did:web:b.example.com', $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    /** PoC de la revisión: DID de la víctima + token autofirmado con un did:key desconocido (INDETERMINATE). */
    public function testVictimDidWithASelfSignedUnknownDidKeyTokenIsAnonymousAndInvalid(): void
    {
        $victim   = self::agentTokenAndSnapshot('did:web:victim.example.com');
        $attacker = self::agentTokenAndSnapshot('did:key:z6MkAttackerUnknownKey0000000000000000000000000');
        $this->snapshot = $victim['snapshot'];
        $history = self::historySpy();
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:victim.example.com',
            'X-Trusteed-Agent-Token' => $attacker['token'],
        ]), history: $history);
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'el historial de la víctima no se toca');
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid'] ?? null, 'INDETERMINATE = inválido para el agente');
        self::assertSame([], $this->noncePosts);
        self::assertArrayNotHasKey('_agent_key_age_hours', $payload['orderContext']['cartAttributes'], 'R004: la clave de un token sin probar no envejece a nadie');
        self::assertSame([], $history->hashes);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    public function testValidTokenProjectsTheHistoryOfTheVerifiedDidOnly(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot = $minted['snapshot'];
        $history = self::historySpy();
        $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), history: $history);
        self::assertNotSame([], $history->hashes);
        self::assertSame([hash('sha256', 'did:web:agent.example.commerchant_xyz')], array_values(array_unique($history->hashes)));
        // Task 38b: de las lecturas de historial sólo R011 tiene productor (ver CheckoutSubmitBeforeHistoryWiringTest).
        self::assertSame('4', $this->lastPayload()['orderContext']['cartAttributes']['_failed_checkout_count'] ?? null);
    }

    public function testReplayedTokenTravelsAsAnAnonymousAgent(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 409;
        $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]));
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'un token reutilizado no toca el historial de su DID');
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_replay'] ?? null);
    }

    public function testNonceStoreDownInObserveKeepsTheVerifiedIdentity(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 503;
        $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), config: ['trusteed/enforcement/failure_mode' => 'observe']);
        $payload = $this->lastPayload();
        self::assertSame('did:web:agent.example.com', $payload['agentId']);
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes']);
    }

    /** Task 29c (L1): un token reutilizado no identifica al agente ni se atribuye (R023), en todos los modos. */
    public function testReplayedTokenIsAnonymousAndNeverStoredForR023InEveryMode(): void
    {
        foreach (['observe', 'enforce'] as $mode) {
            $this->posted      = [];
            $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
            $this->snapshot    = $minted['snapshot'];
            $this->nonceStatus = 409;
            $history = self::historySpy();
            $session = $this->checkout(
                self::request(['X-Trusteed-Agent-Token' => $minted['token']]),
                config: ['trusteed/enforcement/failure_mode' => $mode],
                history: $history
            );
            $payload = $this->lastPayload();
            self::assertNull($payload['agentId'], $mode);
            self::assertSame('agentic_endpoint', $payload['endpointClass'], $mode);
            self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_replay'] ?? null, $mode);
            self::assertStringNotContainsString('did:web:agent.example.com', (string) json_encode($payload), $mode . ': el DID no viaja en ningún campo');
            self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID), $mode);
            // Task 38b: el historial se lee ANTES de gastar el jti (un fallo no quema el token), de modo que
            // un token reutilizado sí provoca la lectura de su DID; lo que no hace es viajar con ella.
            self::assertArrayNotHasKey('_failed_checkout_count', $payload['orderContext']['cartAttributes'], $mode . ': un token reutilizado no recibe el historial de su DID');
        }
    }

    /** Task 29c (L1): con el almacén de nonces caído (observe) la identidad viaja, pero R023 no la guarda. */
    public function testNonceStoreDownInObserveSendsTheIdentityButDoesNotStoreItForR023(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 503;
        $session = $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), config: ['trusteed/enforcement/failure_mode' => 'observe']);
        $payload = $this->lastPayload();
        self::assertSame('did:web:agent.example.com', $payload['agentId']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_nonce_unavailable'] ?? null);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID), 'R023 sólo con nonce aceptado');
    }

    /** C1 (28fa96d7a): nonce store caído en enforce ⇒ avería (no «una regla»), retenido ANTES de preguntar al servidor. */
    public function testNonceStoreDownInEnforceIsPublishedAsAnOutageNotARule(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 503;
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), 200, '{"decision":"BLOCK"}');
            self::fail('en enforce, sin anti-replay, el agente se cierra');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
            self::assertStringNotContainsString('did not pass', $e->getMessage());
        }
        self::assertCount(0, $this->posted, 'se retiene antes de preguntar al servidor');
    }

    /** C1: aunque el servidor dijera ALLOW, en enforce el agente se retiene y no se atribuye. */
    public function testNonceStoreDownInEnforceWithAServerAllowIsStillHeld(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 503;
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]));
            self::fail('el ALLOW del servidor no debe abrir al agente sin anti-replay');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
        }
        self::assertCount(0, $this->posted);
    }

    /** C1: la firma SÍ verificó; nunca se marca `_agent_token_signature_invalid` por la caída del almacén de nonces. */
    public function testNonceStoreDownNeverMarksTheSignatureAsInvalid(): void
    {
        foreach (['observe', 'enforce'] as $mode) {
            $this->posted = [];
            $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
            $this->snapshot    = $minted['snapshot'];
            $this->nonceStatus = 503;
            try {
                $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), config: ['trusteed/enforcement/failure_mode' => $mode]);
            } catch (LocalizedException) {
            }
            if ($this->posted === []) {
                continue;
            }
            $attrs = $this->lastPayload()['orderContext']['cartAttributes'];
            self::assertArrayNotHasKey('_agent_token_signature_invalid', $attrs, $mode);
        }
        self::assertTrue(true);
    }

    /** C4 (91c7f88d9): el DID verificado se deja en el quote para los eventos de fallo (cupón, pago). */
    public function testVerifiedDidIsWrittenOnTheQuoteForFailureEvents(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot = $minted['snapshot'];
        $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]));
        self::assertSame('did:web:agent.example.com', $this->lastQuote->getData('trusteed_agent_did'));
    }

    public function testUnverifiedAgentLeavesNoDidOnTheQuote(): void
    {
        $this->checkout(self::request(['X-Trusteed-Agent-Id' => 'did:web:victim.example.com']));
        self::assertNull($this->lastQuote->getData('trusteed_agent_did'), 'un DID sin probar no se atribuye a nadie');
    }

    /** C3 (20613d0ee): R034 compara `lineItems[].id` con SKUs; el plugin manda además el SKU como línea alias (qty 0, precio 0). */
    public function testLineItemsCarryTheSkuAsAnAliasLine(): void
    {
        $this->items = [self::quoteItem(42, 'TSHIRT-RED-M', 2, 19.99)];
        $this->checkout(self::request([]));
        $items = $this->lastPayload()['orderContext']['lineItems'];
        self::assertSame(['id' => '42', 'qty' => 2, 'priceCents' => 1999], $items[0]);
        self::assertContains(['id' => 'TSHIRT-RED-M', 'qty' => 0, 'priceCents' => 0], $items);
        self::assertSame('2', $this->lastPayload()['orderContext']['cartAttributes']['_qty_per_sku_max'], 'el alias no altera señales de cantidad');
        self::assertSame(2, $this->lastPayload()['orderContext']['itemCount']);
    }

    public function testNoAliasLineWhenTheSkuIsEmptyOrEqualToTheId(): void
    {
        $this->items = [self::quoteItem(7, '', 1, 5.0), self::quoteItem(8, '8', 1, 5.0)];
        $this->checkout(self::request([]));
        self::assertCount(2, $this->lastPayload()['orderContext']['lineItems']);
    }

    private static function quoteItem(int $productId, string $sku, int $qty, float $price): object
    {
        return new class($productId, $sku, $qty, $price) {
            public function __construct(private int $pid, private string $sku, private int $qty, private float $price) {}
            public function getProductId() { return $this->pid; }
            public function getSku() { return $this->sku; }
            public function getQty() { return $this->qty; }
            public function getPrice() { return $this->price; }
            public function getProduct() { return null; }
        };
    }

    /** Historial de mentira: registra con qué hash se consulta. */
    private static function historySpy(): AgentHistoryFetcher
    {
        return new class extends AgentHistoryFetcher {
            /** @var list<string> */
            public array $hashes = [];
            public function __construct() {}
            public function isCrossMerchantAbuse(string $agentIdHash): bool { $this->hashes[] = $agentIdHash; return false; }
            public function completedOrderCount(string $agentIdHash): int { $this->hashes[] = $agentIdHash; return 3; }
            public function failedCheckoutCount(string $agentIdHash, int $windowSeconds): ?int { $this->hashes[] = $agentIdHash; return 4; }
            public function cancelCount(string $agentIdHash, int $windowDays = 90): ?int { $this->hashes[] = $agentIdHash; return null; }
            public function refundCount(string $agentIdHash): int { $this->hashes[] = $agentIdHash; return 0; }
            public function disputeCount(string $agentIdHash, string $merchantId): int { $this->hashes[] = $agentIdHash; return 0; }
        };
    }

    public function testHumanAllowClearsAVerifiedDidLeftByAPreviousOrder(): void
    {
        $session = new CheckoutSession();
        $session->setData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID, 'did:web:previous.example');
        $this->checkout(self::request([]), session: $session);
        self::assertNull(
            $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID),
            'un pedido humano no hereda el DID de un pedido anterior de la sesión'
        );
    }

    // ── Fix ronda 1 — IMPORTANT 3: una avería no se publica como regla ────────

    private function assertAgentSeesUnavailableMessage(callable $arrange, int $status = 200, string $body = '{"decision":"ALLOW"}', array $config = []): void
    {
        $arrange();
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Id' => 'did:web:agent.example.com']), $status, $body, $config);
            self::fail('un agente no pasa por una avería nuestra en enforce');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
            self::assertStringNotContainsString('did not pass', $e->getMessage());
        }
    }

    public function testAgentOutageOn5xxSaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(static fn () => null, 503, '{"decision":"BLOCK"}');
    }

    public function testAgentOutageOn429SaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(static fn () => null, 429, '');
    }

    public function testAgentOutageOnTimeoutSaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(function (): void {
            $this->postThrows = new \RuntimeException('Operation timed out after 5000 milliseconds');
        });
    }

    public function testAgentOutageOnSsrfRejectionSaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(
            static fn () => null,
            200,
            '{"decision":"ALLOW"}',
            ['trusteed_general/general/api_base_url' => 'http://api.trusteed.test']
        );
    }

    public function testAgentOutageOnUnreadable2xxSaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(static fn () => null, 200, '<html>gateway</html>');
    }

    public function testAgentOutageOnJsonEncodeFailureSaysItCouldNotBeVerified(): void
    {
        $this->assertAgentSeesUnavailableMessage(function (): void {
            $this->currency = "\xB1\xB1";
        });
        self::assertSame([], $this->posted, 'no llegó a enviarse nada');
    }

    public function testHumanStillPassesEachOutageCause(): void
    {
        $cases = [
            '5xx'     => [503, '', [], null, 'eur'],
            '429'     => [429, '', [], null, 'eur'],
            'timeout' => [200, '', [], new \RuntimeException('timeout'), 'eur'],
            'ssrf'    => [200, '{"decision":"ALLOW"}', ['trusteed_general/general/api_base_url' => 'http://api.trusteed.test'], null, 'eur'],
            '2xx'     => [200, 'nope', [], null, 'eur'],
            'json'    => [200, '{"decision":"ALLOW"}', [], null, "\xB1\xB1"],
        ];
        $run = 0;
        foreach ($cases as [$status, $body, $config, $throw, $currency]) {
            $this->postThrows = $throw;
            $this->currency   = $currency;
            $this->checkout(self::request([]), $status, $body, $config);
            $run++;
        }
        self::assertSame(6, $run);
    }

    public function testARealRuleBlockKeepsTheRuleMessageForAnAgent(): void
    {
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Id' => 'did:web:agent.example.com']), 200, '{"decision":"BLOCK"}');
            self::fail('BLOCK del servidor');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('did not pass', $e->getMessage());
        }
    }
}
