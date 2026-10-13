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
 * Exercises the REAL observer `CheckoutSubmitBefore::execute()`, with a real
 * `EnforcementClient` and `AgentTokenVerifier` and a test transport that
 * captures what is sent to `/v1/rules/evaluate`.
 *
 * - The agent identity arrives in `X-Trusteed-Agent-*` headers on the request
 *   that places the order (it used to come only from two session keys that
 *   nothing wrote, so every checkout looked organic).
 * - The payload of an organic checkout stays BYTE FOR BYTE as before: the
 *   literal below is written by hand and was checked against the previous
 *   observer output with this same harness before the change.
 * - A human is not blocked by a failure on our side: neither by an evaluator
 *   503 nor by an exception while building the payload.
 *
 * Local harness: depends on the stubs in `Test/Unit/stubs/MagentoFrameworkStubs.php`
 * (minimal session, Quote and Observer). Skipped when the real framework is loaded.
 */
final class CheckoutSubmitBeforeIdentityChannelTest extends TestCase
{
    /** @var list<string> */
    private array $posted = [];

    /** @var list<string> Bodies sent to /v1/agent-events/nonce-consume. */
    private array $noncePosts = [];

    /** @var array{jws:string,jwks:string}|null Signed snapshot served on GET (null means 503). */
    private ?array $snapshot = null;

    /** Exception the transport throws when POSTing the evaluation (timeout, network...). */
    private ?\Throwable $postThrows = null;

    /** Quote currency (a non-UTF-8 value makes `json_encode` fail). */
    private string $currency = 'eur';

    /** HTTP status of /v1/agent-events/nonce-consume (200 ACCEPTED, 409 REPLAY, 503 INDETERMINATE). */
    private int $nonceStatus = 200;

    private ?Quote $lastQuote = null;

    /** @var list<object> Visible quote lines. */
    private array $items = [];

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('local stub harness; does not apply with the real framework');
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
     * A real agent token signed with Ed25519 by `$did`, plus the platform
     * snapshot (also signed) that publishes its key in `agentDidResolver`.
     *
     * @param array<string,mixed> $override claims to add or replace
     * @param list<string>        $drop     claims to remove (`['jti']` gives the canonical shape)
     * @return array{token:string, snapshot:array{jws:string,jwks:string}}
     */
    private static function agentTokenAndSnapshot(string $did, array $override = [], array $drop = []): array
    {
        $agentKeys = sodium_crypto_sign_keypair();
        $now       = time();
        $tHeader   = self::b64url((string) json_encode(['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt', 'kid' => $did . '#key-1']));
        $claims    = array_merge([
            'iss' => $did, 'aud' => 'trusteed', 'iat' => $now, 'exp' => $now + 120,
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
            /** @return string|false Same as Laminas: false when the header is absent. */
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
        self::assertCount(1, $this->posted, 'a single evaluation sent');
        $decoded = json_decode($this->posted[0], true);
        self::assertIsArray($decoded);
        return $decoded;
    }

    /**
     * Literal organic body, written by hand. `__TS__` stands in for the
     * `timestamp` (clock); everything else, key order included, is the
     * expected shape.
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
     * This test used to expect that the DID from the header, WITHOUT a token,
     * was sent as `agentId`. That was the vulnerable behavior: the server-side
     * history (R003/R005/R010/R021/R023/R024) and the local projection are
     * keyed by the hash of `agentId`, so an agent could inherit another DID's
     * history or burn a victim's. Now: header without token means ANONYMOUS agent,
     * no history.
     */
    public function testDeclaredDidHeaderWithoutTokenIsAnAnonymousAgent(): void
    {
        $history = self::historySpy();
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'     => 'did:web:agent.example.com',
            'X-Trusteed-Agent-Origin' => 'webmcp',
        ]), history: $history);
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'a merely declared DID does not travel as identity');
        self::assertSame('agentic_endpoint', $payload['endpointClass'], 'sigue siendo agente');
        self::assertArrayNotHasKey('_agent_token_signature_invalid', $payload['orderContext']['cartAttributes'], 'without a token there is no invalid token');
        self::assertSame([], $history->hashes, 'ni se consulta el historial del DID declarado');
        self::assertSame('endpointClass', array_key_last($payload), 'added at the end: the rest does not change');
        // This used to assert that the DID from a header WITHOUT a token ended
        // up stored as "verified" and attributed to the order (R023). That was
        // the vulnerable behavior: it is no longer persisted.
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
        // The session DID is also just a claim.
        self::assertNull($payload['agentId']);
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_AGENT_DID), 'the session is cleared after evaluating');
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
        self::assertSame([], $this->posted, 'it was never evaluated');
    }

    public function testAgentIsBlockedWithAnHonestMessageWhenBuildingThePayloadThrows(): void
    {
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Origin' => 'webmcp']), failOnAddress: true);
            self::fail('an agent does not pass through our own outage in enforce');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
            self::assertStringNotContainsString('did not pass', $e->getMessage(), 'an outage is not "a rule blocked you"');
        }
    }

    /**
     * An exception on OUR side holds the agent in ALL modes. Before, `observe`
     * (and any value that fails open on an outage) let it through, token
     * included: our own failure is not a permit.
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
                self::fail("an agent does not pass through our own outage (failure_mode='{$mode}')");
            } catch (LocalizedException $e) {
                self::assertStringContainsString('could not be verified', $e->getMessage(), $mode);
                self::assertStringNotContainsString('did not pass', $e->getMessage(), $mode);
            }
        }
        self::assertSame([], $this->posted, 'it was never evaluated');
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

    // ── only a VERIFIED token attributes the agent ──────────────────────────

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
        self::assertCount(1, $this->noncePosts, 'the jti of the valid token is consumed');
        self::assertSame('did:web:agent.example.com', $session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    // ── the single-use identifier is `nonce`, not `jti` ─────────────────────

    /** @return list<string> identifiers sent to nonce-consume */
    private function consumedIds(): array
    {
        return array_map(static fn (string $b): string => (string) (json_decode($b, true)['nonce'] ?? ''), $this->noncePosts);
    }

    /** Exact shape of the test token generator (nonce, no jti): VALID and consumes its nonce. */
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

    /** Header did:web:A with a VALID token from B: the token is not valid for A. */
    public function testValidTokenOfAnotherAgentIsTreatedAsInvalid(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:b.example.com');
        $this->snapshot = $minted['snapshot'];
        $session = $this->checkout(self::request([
            'X-Trusteed-Agent-Id'    => 'did:web:a.example.com',
            'X-Trusteed-Agent-Token' => $minted['token'],
        ]));
        $payload = $this->lastPayload();
        self::assertNull($payload['agentId'], 'neither the declared agent nor the foreign token identity is used');
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid']);
        self::assertSame([], $this->noncePosts, 'no se quema el jti de otro agente');
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID));
    }

    /** Without a DID header, a valid token provides its verified DID. */
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

    /** Attack case: victim's DID plus a self-signed token with an unknown did:key (INDETERMINATE). */
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
        self::assertNull($payload['agentId'], 'the victim history is untouched');
        self::assertSame('agentic_endpoint', $payload['endpointClass']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_signature_invalid'] ?? null, 'INDETERMINATE counts as invalid for the agent');
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
        // Of the history reads, only R011 has a producer (see CheckoutSubmitBeforeHistoryWiringTest).
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

    /** A reused token neither identifies the agent nor is attributed (R023), in all modes. */
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
            self::assertStringNotContainsString('did:web:agent.example.com', (string) json_encode($payload), $mode . ': the DID does not travel in any field');
            self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID), $mode);
            // History is read BEFORE the jti is spent (a failure does not burn the token), so
            // a reused token does trigger a read for its DID; what it does not do is travel with it.
            self::assertArrayNotHasKey('_failed_checkout_count', $payload['orderContext']['cartAttributes'], $mode . ': un token reutilizado no recibe el historial de su DID');
        }
    }

    /** With the nonce store down (observe) the identity is sent, but R023 does not store it. */
    public function testNonceStoreDownInObserveSendsTheIdentityButDoesNotStoreItForR023(): void
    {
        $minted = self::agentTokenAndSnapshot('did:web:agent.example.com');
        $this->snapshot    = $minted['snapshot'];
        $this->nonceStatus = 503;
        $session = $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), config: ['trusteed/enforcement/failure_mode' => 'observe']);
        $payload = $this->lastPayload();
        self::assertSame('did:web:agent.example.com', $payload['agentId']);
        self::assertSame('true', $payload['orderContext']['cartAttributes']['_agent_token_nonce_unavailable'] ?? null);
        self::assertNull($session->getData(CheckoutSubmitBefore::SESSION_VERIFIED_AGENT_DID), 'R023 only with an accepted nonce');
    }

    /** Nonce store down in enforce is a failure (not "a rule"), held BEFORE asking the server. */
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

    /** Even if the server said ALLOW, in enforce the agent is held and not attributed. */
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

    /** The signature DID verify; `_agent_token_signature_invalid` is never set because the nonce store is down. */
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

    /** The verified DID is left on the quote for failure events (coupon, payment). */
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

    /** R034 compares `lineItems[].id` with SKUs; the plugin also sends the SKU as an alias line (qty 0, price 0). */
    public function testLineItemsCarryTheSkuAsAnAliasLine(): void
    {
        $this->items = [self::quoteItem(42, 'TSHIRT-RED-M', 2, 19.99)];
        $this->checkout(self::request([]));
        $items = $this->lastPayload()['orderContext']['lineItems'];
        self::assertSame(['id' => '42', 'qty' => 2, 'priceCents' => 1999], $items[0]);
        self::assertContains(['id' => 'TSHIRT-RED-M', 'qty' => 0, 'priceCents' => 0], $items);
        self::assertSame('2', $this->lastPayload()['orderContext']['cartAttributes']['_qty_per_sku_max'], 'the alias does not alter quantity signals');
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

    /** Fake history: records which hash it is queried with. */
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
            'a human order does not inherit the DID of an earlier order in the session'
        );
    }

    // ── a failure is not reported as a rule ─────────────────────────────────

    private function assertAgentSeesUnavailableMessage(callable $arrange, int $status = 200, string $body = '{"decision":"ALLOW"}', array $config = []): void
    {
        $arrange();
        try {
            $this->checkout(self::request(['X-Trusteed-Agent-Id' => 'did:web:agent.example.com']), $status, $body, $config);
            self::fail('an agent does not pass through our own outage in enforce');
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
        self::assertSame([], $this->posted, 'nothing was sent');
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
