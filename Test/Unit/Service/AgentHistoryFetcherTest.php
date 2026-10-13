<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Service;

use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Api\FilterBuilder;
use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Sales\Api\CreditmemoRepositoryInterface;
use Trusteed\AgenticCommerce\Service\AgentHistoryFetcher;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

require_once __DIR__ . '/../../../Service/AgentHistoryFetcher.php';

/**
 * AgentHistoryFetcher::failedCheckoutCount.
 *
 * Verifies the Magento helper correctly wires up the backend
 * `GET /api/v1/checkout-failures/count` endpoint.
 *
 * Cases covered:
 *   - backend response 200 + count=5 → returns 5
 *   - backend response 200 + count=0 → returns 0
 *   - backend response non-200 → returns null
 *   - HTTP exception (timeout, connection refused, …) → returns null
 *   - non-JSON body → returns null
 *   - missing endpoint config → returns null (no curl issued)
 *   - empty agent hash / zero window → returns null short-circuit
 *
 * Pure unit test; depends on `Test/Unit/stubs/MagentoFrameworkStubs.php` for
 * the Magento framework surface area when running outside a full Magento env.
 */
final class AgentHistoryFetcherTest extends TestCase
{
    /**
     * Build a fetcher with a captured curl mock and pre-seeded config.
     *
     * @param array<string,string> $config
     */
    private function buildFetcher(
        Curl $curl,
        array $config = []
    ): AgentHistoryFetcher {
        $scopeConfig = new class($config) implements ScopeConfigInterface {
            public function __construct(private array $values) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $this->values[$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return !empty($this->values[$path]);
            }
        };

        $cache = new class implements CacheInterface {
            public function load($identifier) { return false; }
            public function save($data, $identifier, $tags = [], $lifeTime = null) { return true; }
            public function remove($identifier) { return true; }
            public function clean($tags = []) { return true; }
        };

        $logger    = $this->createMock(LoggerInterface::class);
        $orderRepo = $this->createMock(OrderRepositoryInterface::class);
        $cmRepo    = $this->createMock(CreditmemoRepositoryInterface::class);

        return new AgentHistoryFetcher(
            $scopeConfig,
            $curl,
            $logger,
            $cache,
            $orderRepo,
            $cmRepo,
            new SearchCriteriaBuilder(),
            new FilterBuilder(),
        );
    }

    private function defaultConfig(): array
    {
        return [
            'trusteed_general/general/api_base_url' => 'https://api.example.test',
            'trusteed/enforcement/installation_id'  => 'install-1',
            'trusteed/enforcement/hmac_secret'      => 'shhh-very-secret',
        ];
    }

    /**
     * Curl test double that records calls and returns a scripted response.
     */
    private function curlDouble(int $status, string $body, ?\Throwable $throwOnGet = null): Curl
    {
        return new class($status, $body, $throwOnGet) extends Curl {
            public int $getCallCount = 0;
            public ?string $lastUrl  = null;
            public array $headers    = [];
            public function __construct(
                private int $status,
                private string $body,
                private ?\Throwable $throwOnGet,
            ) {}
            public function setTimeout(int $seconds): void {}
            public function setOption(int $option, $value): void {}
            public function addHeader(string $name, string $value): void
            {
                $this->headers[$name] = $value;
            }
            public function get(string $url): void
            {
                $this->getCallCount++;
                $this->lastUrl = $url;
                if ($this->throwOnGet !== null) {
                    throw $this->throwOnGet;
                }
            }
            public function getBody(): string { return $this->body; }
            public function getStatus(): int { return $this->status; }
        };
    }

    public function test_returns_count_when_backend_responds_200_with_count_5(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['count' => 5]));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('a', 64), 600);

        self::assertSame(5, $count);
        self::assertSame(1, $curl->getCallCount);
        self::assertStringContainsString(
            '/api/v1/checkout-failures/count',
            (string) $curl->lastUrl
        );
        self::assertArrayHasKey('X-Trusteed-Installation-Id', $curl->headers);
        self::assertArrayHasKey('X-Trusteed-Timestamp', $curl->headers);
        self::assertArrayHasKey('X-Trusteed-Signature', $curl->headers);
        self::assertMatchesRegularExpression('/^[0-9a-f]{64}$/', $curl->headers['X-Trusteed-Signature']);
    }

    public function test_returns_zero_when_backend_responds_200_with_count_0(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['count' => 0]));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('b', 64), 60);
        self::assertSame(0, $count);
    }

    public function test_returns_null_on_non_200_response(): void
    {
        $curl  = $this->curlDouble(500, '');
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('c', 64), 60);
        self::assertNull($count);
    }

    public function test_returns_null_on_http_exception(): void
    {
        $curl  = $this->curlDouble(0, '', new \RuntimeException('connection refused'));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('d', 64), 60);
        self::assertNull($count);
    }

    public function test_returns_null_on_non_json_body(): void
    {
        $curl  = $this->curlDouble(200, '<!doctype html><html>...</html>');
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('e', 64), 60);
        self::assertNull($count);
    }

    public function test_returns_null_when_count_field_missing(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['other' => 1]));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        $count = $svc->failedCheckoutCount(str_repeat('f', 64), 60);
        self::assertNull($count);
    }

    public function test_returns_null_when_config_missing_skips_http(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['count' => 99]));
        $svc   = $this->buildFetcher($curl, []); // no config
        $count = $svc->failedCheckoutCount(str_repeat('g', 64), 60);
        self::assertNull($count);
        self::assertSame(0, $curl->getCallCount, 'no HTTP issued when config missing');
    }

    public function test_returns_null_on_empty_agent_hash_short_circuit(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['count' => 1]));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        self::assertNull($svc->failedCheckoutCount('', 60));
        self::assertSame(0, $curl->getCallCount);
    }

    public function test_returns_null_on_non_positive_window_short_circuit(): void
    {
        $curl  = $this->curlDouble(200, json_encode(['count' => 1]));
        $svc   = $this->buildFetcher($curl, $this->defaultConfig());
        self::assertNull($svc->failedCheckoutCount(str_repeat('h', 64), 0));
        self::assertNull($svc->failedCheckoutCount(str_repeat('h', 64), -1));
        self::assertSame(0, $curl->getCallCount);
    }

    public function test_url_contains_url_encoded_query_params(): void
    {
        $curl = $this->curlDouble(200, json_encode(['count' => 2]));
        $svc  = $this->buildFetcher($curl, $this->defaultConfig());
        $svc->failedCheckoutCount(str_repeat('1', 64), 900);
        self::assertStringContainsString('agentIdHash=' . str_repeat('1', 64), (string) $curl->lastUrl);
        self::assertStringContainsString('windowSeconds=900', (string) $curl->lastUrl);
    }

    // ── a read failure is recorded, not mistaken for "no data" ─────────────

    /** @return array<string,array{0:int,1:string,2:?\Throwable}> */
    public static function readFailureCases(): array
    {
        return [
            'no-200'            => [500, '', null],
            '404'               => [404, '{"error":"not_found"}', null],
            '200 sin JSON'      => [200, '<html>gateway</html>', null],
            '200 sin count'     => [200, '{"other":1}', null],
            '200 count no int'  => [200, '{"count":"many"}', null],
            'network exception' => [0, '', new \RuntimeException('Operation timed out')],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('readFailureCases')]
    public function test_a_failed_read_is_reported_and_is_not_a_zero(int $status, string $body, ?\Throwable $throws): void
    {
        $svc = $this->buildFetcher($this->curlDouble($status, $body, $throws), $this->defaultConfig());

        self::assertNull($svc->failedCheckoutCount(str_repeat('a', 64), 300));
        self::assertSame(['failed_checkout_count'], $svc->takeReadFailures());
        self::assertSame([], $svc->takeReadFailures(), 'takeReadFailures empties the list');
    }

    public function test_no_data_is_not_a_failure(): void
    {
        $curl = $this->curlDouble(200, json_encode(['count' => 0]));
        $svc  = $this->buildFetcher($curl, $this->defaultConfig());
        self::assertSame(0, $svc->failedCheckoutCount(str_repeat('b', 64), 300), 'un cero real sigue siendo un cero');
        self::assertSame([], $svc->takeReadFailures());

        // Not configured / arguments that need no network call: nobody to ask, so it is not a failure.
        $svc = $this->buildFetcher($curl, []);
        self::assertNull($svc->failedCheckoutCount(str_repeat('b', 64), 300));
        self::assertNull($svc->failedCheckoutCount('', 300));
        self::assertNull($svc->failedCheckoutCount(str_repeat('b', 64), 0));
        self::assertSame([], $svc->takeReadFailures());
    }

    public function test_an_ssrf_or_non_https_rejection_is_a_failure_to_read(): void
    {
        $curl = $this->curlDouble(200, json_encode(['count' => 1]));
        $svc  = $this->buildFetcher($curl, ['trusteed_general/general/api_base_url' => 'http://api.example.test'] + $this->defaultConfig());

        self::assertNull($svc->failedCheckoutCount(str_repeat('c', 64), 300));
        self::assertSame(0, $curl->getCallCount);
        self::assertSame(['failed_checkout_count'], $svc->takeReadFailures());
    }

    public function test_failures_are_never_cached_and_an_unreadable_cache_entry_is_a_miss(): void
    {
        $store = [];
        $cache = new class($store) implements CacheInterface {
            public function __construct(public array &$store) {}
            public function load($identifier) { return $this->store[$identifier] ?? false; }
            public function save($data, $identifier, $tags = [], $lifeTime = null) { $this->store[$identifier] = $data; return true; }
            public function remove($identifier) { return true; }
            public function clean($tags = []) { return true; }
        };
        $make = fn (Curl $curl): AgentHistoryFetcher => new AgentHistoryFetcher(
            new class($this->defaultConfig()) implements ScopeConfigInterface {
                public function __construct(private array $v) {}
                public function getValue($path, $scopeType = 'default', $scopeCode = null) { return $this->v[$path] ?? null; }
                public function isSetFlag($path, $scopeType = 'default', $scopeCode = null) { return false; }
            },
            $curl,
            $this->createMock(LoggerInterface::class),
            $cache,
            $this->createMock(OrderRepositoryInterface::class),
            $this->createMock(CreditmemoRepositoryInterface::class),
            new SearchCriteriaBuilder(),
            new FilterBuilder(),
        );

        $hash = str_repeat('d', 64);
        $make($this->curlDouble(500, ''))->failedCheckoutCount($hash, 300);
        self::assertSame([], $store, 'a failure is not stored as "no signal" for 60 s');

        $ok = $this->curlDouble(200, json_encode(['count' => 3]));
        $fetcher = $make($ok);
        self::assertSame(3, $fetcher->failedCheckoutCount($hash, 300));
        self::assertSame(3, $fetcher->failedCheckoutCount($hash, 300));
        self::assertSame(1, $ok->getCallCount, 'a success is cached');

        foreach ($store as $k => $_) {
            $store[$k] = 'basura';
        }
        $again = $this->curlDouble(200, json_encode(['count' => 7]));
        self::assertSame(7, $make($again)->failedCheckoutCount($hash, 300), 'una entrada ilegible es un miss, no un null servido');
    }
}
