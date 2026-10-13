<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\Api\FilterBuilder;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Quote\Model\Quote;
use Magento\Sales\Api\CreditmemoRepositoryInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;
use Trusteed\AgenticCommerce\Service\AgentHistoryFetcher;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * The history of a VERIFIED agent reaches the REAL observer.
 *
 * Background (and why the projection is a single signal):
 * - `etc/di.xml` did not bind `historyFetcher` (optional constructor argument,
 *   so null): `projectAgentHistorySignals` returned on its first line and no
 *   signal was ever sent.
 * - Of the six remaining reads, three ask the server for routes that DO NOT
 *   EXIST (`/agents/{hash}/cross-merchant-abuse-check`,
 *   `/merchants/{id}/disputes/count`) and three read `sales_order.agent_id_hash`,
 *   a column this module neither creates (`etc/db_schema.xml`) nor writes (no
 *   observer does). Wiring them with a fail-closed failure policy would have
 *   blocked EVERY verified agent in `enforce`. Only `/checkout-failures/count`
 *   (R011) exists and is signed the way the server expects.
 *
 * Policy: a read failure is NOT "no signal" or "0": it is treated as "history
 * unavailable" ({@see \Trusteed\AgenticCommerce\Enforcement\FailurePolicy::decideOnHistoryUnavailable}).
 * It only runs for an agent with a VALID token: a human neither waits nor is
 * blocked by this call.
 *
 * Local harness (stubs from `MagentoFrameworkStubs.php`); skipped when the
 * real framework is present.
 */
final class CheckoutSubmitBeforeHistoryWiringTest extends TestCase
{
    private const DID = 'did:web:agent.example.com';

    /** @var list<string> */
    private array $posted = [];
    /** @var list<string> */
    private array $noncePosts = [];
    /** @var array{jws:string,jwks:string}|null */
    private ?array $snapshot = null;
    /** nonce-consume answers 409 (the token was already used). */
    private bool $nonceReplay = false;

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('local stub harness; does not apply with the real framework');
        }
        $this->posted     = [];
        $this->noncePosts = [];
        $this->snapshot   = null;
        $this->nonceReplay = false;
    }

    // ── harness ──────────────────────────────────────────────────────────

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

    private function curl(): Curl
    {
        return new class($this->posted, $this->noncePosts, $this->snapshot, $this->nonceReplay) extends Curl {
            private string $last = '';
            public function __construct(private array &$posted, private array &$noncePosts, private readonly ?array $snapshot, private readonly bool $replay) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                $this->last = str_ends_with($url, '/v1/agent-events/nonce-consume') ? 'nonce' : 'evaluate';
                if ($this->last === 'nonce') {
                    $this->noncePosts[] = (string) $body;
                } else {
                    $this->posted[] = (string) $body;
                }
            }
            public function get(string $url): void
            {
                $this->last = str_contains($url, '.well-known/jwks.json') ? 'jwks' : 'snapshot';
            }
            public function getStatus(): int
            {
                if ($this->last === 'nonce') {
                    return $this->replay ? 409 : 200;
                }

                return $this->last === 'jwks' || $this->last === 'snapshot' ? ($this->snapshot === null ? 503 : 200) : 200;
            }
            public function getBody(): string
            {
                return match ($this->last) {
                    'jwks'     => $this->snapshot['jwks'] ?? '',
                    'snapshot' => $this->snapshot['jws'] ?? '',
                    'nonce'    => '{}',
                    default    => '{"decision":"ALLOW"}',
                };
            }
        };
    }

    private static function b64url(string $d): string
    {
        return rtrim(strtr(base64_encode($d), '+/', '-_'), '=');
    }

    /** @return array{token:string, snapshot:array{jws:string,jwks:string}} Real token and snapshot signed with Ed25519. */
    private static function mint(string $did, bool $badSignature = false): array
    {
        $agentKeys = sodium_crypto_sign_keypair();
        $now       = time();
        $tHeader   = self::b64url((string) json_encode(['alg' => 'EdDSA', 'typ' => 'trusteed-agent-token+jwt', 'kid' => $did . '#key-1']));
        $tBody     = self::b64url((string) json_encode([
            'iss' => $did, 'aud' => 'trusteed', 'iat' => $now, 'exp' => $now + 120,
            'nonce' => str_repeat('n', 32), 'jti' => 'jti_' . bin2hex(random_bytes(10)),
        ]));
        $signer = $badSignature ? sodium_crypto_sign_secretkey(sodium_crypto_sign_keypair()) : sodium_crypto_sign_secretkey($agentKeys);
        $token  = "{$tHeader}.{$tBody}." . self::b64url(sodium_crypto_sign_detached("{$tHeader}.{$tBody}", $signer));

        $platform = sodium_crypto_sign_keypair();
        $sHeader  = self::b64url((string) json_encode(['alg' => 'EdDSA', 'kid' => 'k1']));
        $sBody    = self::b64url((string) json_encode([
            'rules' => [], 'validUntil' => gmdate('Y-m-d\TH:i:s\Z', time() + 300),
            'agentDidResolver' => [['did' => $did, 'publicKeyJwk' => ['kty' => 'OKP', 'crv' => 'Ed25519', 'x' => self::b64url(sodium_crypto_sign_publickey($agentKeys))]]],
        ]));
        $sSig = self::b64url(sodium_crypto_sign_detached("{$sHeader}.{$sBody}", sodium_crypto_sign_secretkey($platform)));
        $jwks = (string) json_encode(['keys' => [['kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => 'k1', 'x' => self::b64url(sodium_crypto_sign_publickey($platform))]]]);

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

    private static function event(): Observer
    {
        $quote = new class extends Quote {
            public function __construct() {}
            public function getQuoteCurrencyCode() { return 'eur'; }
            public function getId() { return 0; }
            public function getBillingAddress() { return null; }
            public function getShippingAddress() { return null; }
            public function getCustomer() { return null; }
        };
        $quote->grandTotal = 49.99;

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

    /** Fake history: counts calls, returns what was configured and can simulate a read failure. */
    private static function history(?int $failedCount = 2, bool $fails = false, ?\Throwable $throws = null): AgentHistoryFetcher
    {
        return new class($failedCount, $fails, $throws) extends AgentHistoryFetcher {
            /** @var list<string> */
            public array $calls = [];
            private bool $failed = false;
            public function __construct(private readonly ?int $count, private readonly bool $fails, private readonly ?\Throwable $throws) {}
            public function failedCheckoutCount(string $agentIdHash, int $windowSeconds): ?int
            {
                $this->calls[] = $agentIdHash . '|' . $windowSeconds;
                if ($this->throws !== null) {
                    throw $this->throws;
                }
                $this->failed = $this->fails;
                return $this->fails ? null : $this->count;
            }
            public function takeReadFailures(): array
            {
                $out = $this->failed ? ['failed_checkout_count'] : [];
                $this->failed = false;
                return $out;
            }
        };
    }

    private function checkout(?RequestInterface $request, ?AgentHistoryFetcher $history, array $config = [], ?CheckoutSession $session = null): CheckoutSession
    {
        $session ??= new CheckoutSession();
        $logger  = $this->createMock(LoggerInterface::class);
        $scope   = $this->config($config);
        (new CheckoutSubmitBefore(
            $session,
            new AgentTokenVerifier($logger),
            new EnforcementClient($scope, $this->curl(), $logger),
            $scope,
            $logger,
            $this->createMock(CacheInterface::class),
            $this->createMock(CategoryRepositoryInterface::class),
            $history,
            request: $request,
        ))->execute(self::event());

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

    private function agentRequest(): RequestInterface
    {
        $minted = self::mint(self::DID);
        $this->snapshot = $minted['snapshot'];

        return self::request(['X-Trusteed-Agent-Token' => $minted['token']]);
    }

    // ── di.xml wiring ────────────────────────────────────────────────────

    /** @return array<string,string> */
    private static function diArguments(string $type): array
    {
        $xml = simplexml_load_file(__DIR__ . '/../../../etc/di.xml');
        self::assertNotFalse($xml, 'etc/di.xml no se puede leer');
        $out = [];
        foreach ($xml->xpath('//type[@name="' . $type . '"]/arguments/argument') ?: [] as $arg) {
            $out[(string) $arg['name']] = trim((string) $arg);
        }

        return $out;
    }

    public function testDiXmlBindsTheHistoryFetcherToTheObserver(): void
    {
        $args = self::diArguments(CheckoutSubmitBefore::class);

        self::assertSame(AgentHistoryFetcher::class, $args['historyFetcher'] ?? null, 'un opcional de constructor no se inyecta solo');
        self::assertArrayHasKey('request', $args, 'el binding existente sigue');
    }

    public function testEveryDiArgumentOfTheObserverExistsInItsConstructor(): void
    {
        $params = array_map(
            static fn (\ReflectionParameter $p): string => $p->getName(),
            (new \ReflectionMethod(CheckoutSubmitBefore::class, '__construct'))->getParameters()
        );
        foreach (array_keys(self::diArguments(CheckoutSubmitBefore::class)) as $name) {
            self::assertContains($name, $params, "di.xml declara `{$name}` pero el constructor no lo tiene");
        }
    }

    public function testTheHistoryFetcherDependenciesAreInjectableByType(): void
    {
        // No constructor default except `urlValidator`, which di.xml already binds.
        foreach ((new \ReflectionMethod(AgentHistoryFetcher::class, '__construct'))->getParameters() as $p) {
            self::assertTrue(
                !$p->isOptional() || array_key_exists($p->getName(), self::diArguments(AgentHistoryFetcher::class)),
                "AgentHistoryFetcher::\${$p->getName()} is optional and is not wired in di.xml"
            );
        }
    }

    // ── behavior ─────────────────────────────────────────────────────────

    public function testAVerifiedAgentGetsItsFailedCheckoutCountProjectedFromTheVerifiedDidOnly(): void
    {
        $history = self::history(2);
        $this->checkout($this->agentRequest(), $history);

        self::assertSame([hash('sha256', self::DID . 'merchant_xyz') . '|300'], $history->calls);
        $payload = $this->lastPayload();
        self::assertSame('2', $payload['orderContext']['cartAttributes']['_failed_checkout_count'] ?? null);
        self::assertSame(self::DID, $payload['agentId']);
    }

    public function testNoSignalMeansNoAttributeNotAZero(): void
    {
        $this->checkout($this->agentRequest(), self::history(null));

        self::assertArrayNotHasKey('_failed_checkout_count', $this->lastPayload()['orderContext']['cartAttributes']);
    }

    public function testAReadFailureInEnforceIsAnOutageNotAPermitAndNothingIsSpentOrEvaluated(): void
    {
        foreach ([[], ['trusteed/enforcement/failure_mode' => 'enforce'], ['trusteed/enforcement/failure_mode' => 'permissive']] as $config) {
            $this->posted = $this->noncePosts = [];
            try {
                $this->checkout($this->agentRequest(), self::history(0, true), $config, $session = new CheckoutSession());
                self::fail('un fallo de lectura no abre a un agente en ' . json_encode($config));
            } catch (LocalizedException $e) {
                self::assertStringContainsString('could not be verified', $e->getMessage());
                self::assertStringNotContainsString('did not pass', $e->getMessage(), 'an outage is not reported as "a rule blocked you"');
            }
            self::assertSame([], $this->posted, 'no evaluation with a signal that could not be read');
            self::assertSame([], $this->noncePosts, 'el jti no se gasta: el agente puede reintentar con el mismo token');
        }
    }

    public function testAReadFailureInObserveContinuesWithoutTheSignalAndKeepsTheIdentity(): void
    {
        $this->checkout($this->agentRequest(), self::history(0, true), ['trusteed/enforcement/failure_mode' => 'observe']);

        $payload = $this->lastPayload();
        self::assertSame(self::DID, $payload['agentId']);
        self::assertArrayNotHasKey('_failed_checkout_count', $payload['orderContext']['cartAttributes'], 'neither "0" nor the signal: it could not be read');
    }

    public function testAThrowingFetcherIsAnInternalFailureAgentsDoNotPassEvenInObserve(): void
    {
        foreach (['enforce', 'observe'] as $mode) {
            $this->posted = [];
            try {
                $this->checkout($this->agentRequest(), self::history(0, false, new \RuntimeException('db down')), ['trusteed/enforcement/failure_mode' => $mode]);
                self::fail('our own exception is not a permit: ' . $mode);
            } catch (LocalizedException $e) {
                self::assertStringContainsString('could not be verified', $e->getMessage());
            }
            self::assertSame([], $this->posted, $mode);
        }
    }

    public function testAHumanNeverWaitsForNorIsBlockedByTheHistoryCall(): void
    {
        $history = self::history(0, true);
        $this->checkout(self::request([]), $history);

        self::assertSame([], $history->calls, 'un humano no consulta historial');
        self::assertCount(1, $this->posted);
    }

    public function testADeclaredButUnverifiedDidDoesNotTriggerTheHistoryCall(): void
    {
        $history = self::history(0, true);
        $this->checkout(self::request(['X-Trusteed-Agent-Id' => self::DID]), $history);

        self::assertSame([], $history->calls, 'un DID declarado no es verificado: no se consulta ni se espera');
    }

    public function testAnInvalidTokenDoesNotTriggerTheHistoryCall(): void
    {
        $minted = self::mint(self::DID, badSignature: true);
        $this->snapshot = $minted['snapshot'];
        $history = self::history(0, true);

        $this->checkout(self::request(['X-Trusteed-Agent-Token' => $minted['token']]), $history);

        self::assertSame([], $history->calls);
        self::assertNull($this->lastPayload()['agentId']);
    }

    public function testAReplayedTokenTravelsAnonymousWithoutTheHistorySignal(): void
    {
        $history = self::history(5);
        $this->nonceReplay = true;
        $this->checkout($this->agentRequest(), $history);

        $payload = $this->lastPayload();
        self::assertNull($payload['agentId']);
        self::assertArrayNotHasKey('_failed_checkout_count', $payload['orderContext']['cartAttributes'], 'un token reutilizado no toca el historial de su DID');
    }

    public function testWithoutAFetcherTheCheckoutBehavesAsBefore(): void
    {
        $this->checkout($this->agentRequest(), null);

        $payload = $this->lastPayload();
        self::assertSame(self::DID, $payload['agentId']);
        self::assertArrayNotHasKey('_failed_checkout_count', $payload['orderContext']['cartAttributes']);
    }

    public function testTheDeclaredSignalsAreExactlyTheOnesWithAWorkingProducer(): void
    {
        $declared = CheckoutSubmitBefore::signalsProvided();

        self::assertContains('_failed_checkout_count', $declared);
        foreach (['_agent_revoked', '_cross_merchant_abuse', '_dispute_count', '_completed_orders', '_cancel_count', '_refund_ratio'] as $dead) {
            self::assertNotContains($dead, $declared, "{$dead}: no route on the server or no column in sales_order; declaring it promises something that is not sent");
        }
    }

    // ── real network calls per checkout (real fetcher) ───────────────────

    public function testAColdVerifiedCheckoutMakesExactlyOneHistoryGetAndAWarmOneNone(): void
    {
        $gets  = [];
        $store = [];
        $cache = new class($store) implements CacheInterface {
            public function __construct(private array &$store) {}
            public function load($identifier) { return $this->store[$identifier] ?? false; }
            public function save($data, $identifier, $tags = [], $lifeTime = null) { $this->store[$identifier] = $data; return true; }
            public function remove($identifier) { return true; }
            public function clean($tags = []) { return true; }
        };
        $curl = new class($gets) extends Curl {
            public function __construct(private array &$gets) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void {}
            public function get(string $url): void { $this->gets[] = $url; }
            public function getStatus(): int { return 200; }
            public function getBody(): string { return '{"count":1}'; }
        };
        $fetcher = new AgentHistoryFetcher(
            $this->config(),
            $curl,
            $this->createMock(LoggerInterface::class),
            $cache,
            $this->createMock(OrderRepositoryInterface::class),
            $this->createMock(CreditmemoRepositoryInterface::class),
            new SearchCriteriaBuilder(),
            new FilterBuilder(),
        );

        $this->checkout($this->agentRequest(), $fetcher);
        self::assertCount(1, $gets, 'cold: a single history network call');
        self::assertStringContainsString('/api/v1/checkout-failures/count', $gets[0]);
        self::assertSame('1', $this->lastPayload()['orderContext']['cartAttributes']['_failed_checkout_count'] ?? null);

        $this->posted = [];
        $this->checkout($this->agentRequest(), $fetcher);
        self::assertCount(1, $gets, 'warm (60 s cache): no more calls');
    }

    public function testTheRealFetcherReportsReadFailuresThatTheObserverTurnsIntoAnOutage(): void
    {
        $curl = new class extends Curl {
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void {}
            public function get(string $url): void {}
            public function getStatus(): int { return 500; }
            public function getBody(): string { return ''; }
        };
        $fetcher = new AgentHistoryFetcher(
            $this->config(),
            $curl,
            $this->createMock(LoggerInterface::class),
            $this->createMock(CacheInterface::class),
            $this->createMock(OrderRepositoryInterface::class),
            $this->createMock(CreditmemoRepositoryInterface::class),
            new SearchCriteriaBuilder(),
            new FilterBuilder(),
        );

        try {
            $this->checkout($this->agentRequest(), $fetcher);
            self::fail('un 500 del historial en enforce cierra al agente');
        } catch (LocalizedException $e) {
            self::assertStringContainsString('could not be verified', $e->getMessage());
        }
        self::assertSame([], $this->posted);
    }
}
