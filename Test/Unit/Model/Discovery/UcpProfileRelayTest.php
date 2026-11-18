<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Model\Discovery;

require_once __DIR__ . '/../../../../Model/Discovery/UcpProfileRelay.php';

use Magento\Framework\App\CacheInterface;
use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Discovery\UcpProfileRelay;

/**
 * `/.well-known/ucp` se sirve con cuerpo (200) desde el origen del comercio, no con
 * un 302 a otro host: no todos los clientes UCP siguen una redirección entre hosts.
 */
class UcpProfileRelayTest extends TestCase
{
    private const T = 'https://api.trusteed.xyz/.well-known/ucp?store=acme';

    private function relay(CacheInterface $cache, callable $http): UcpProfileRelay
    {
        return new class ($cache, $http) extends UcpProfileRelay {
            /** @var callable */
            private $fake;

            public function __construct(CacheInterface $cache, callable $fake)
            {
                parent::__construct($cache);
                $this->fake = $fake;
            }

            protected function httpGet(string $url): array
            {
                return ($this->fake)($url);
            }
        };
    }

    private function cache(): CacheInterface
    {
        return new class implements CacheInterface {
            /** @var array<string,string> */
            public array $store = [];

            public function load($identifier)
            {
                return $this->store[$identifier] ?? false;
            }

            public function save($data, $identifier, $tags = [], $lifeTime = null)
            {
                $this->store[$identifier] = $data;
                return true;
            }

            public function remove($identifier)
            {
                unset($this->store[$identifier]);
                return true;
            }

            public function clean($tags = [])
            {
                $this->store = [];
                return true;
            }
        };
    }

    public function testRelaysTheCentralBodyAndCachesIt(): void
    {
        $calls = 0;
        $relay = $this->relay($this->cache(), function (string $u) use (&$calls): array {
            $calls++;
            return ['code' => 200, 'body' => '{"ucp":{"version":"x"}}'];
        });
        $this->assertSame('{"ucp":{"version":"x"}}', $relay->fetch(self::T, 1000));
        $this->assertSame('{"ucp":{"version":"x"}}', $relay->fetch(self::T, 1100));
        $this->assertSame(1, $calls, 'Within 5 minutes it is served from cache.');
    }

    public function testServesStaleCopyWhenCentralIsDownAndDropsItAfter24h(): void
    {
        $cache = $this->cache();
        ($this->relay($cache, fn (string $u): array => ['code' => 200, 'body' => '{"a":1}']))->fetch(self::T, 1000);
        $down = $this->relay($cache, fn (string $u): array => ['code' => 503, 'body' => '']);
        $this->assertSame('{"a":1}', $down->fetch(self::T, 1000 + 3600));
        $this->assertNull($down->fetch(self::T, 1000 + 90000));
    }

    public function testNeverRequestsNonHttpsAndDoesNotCacheNonJson(): void
    {
        $calls = 0;
        $http = function (string $u) use (&$calls): array {
            $calls++;
            return ['code' => 200, 'body' => '<html>x</html>'];
        };
        $relay = $this->relay($this->cache(), $http);
        $this->assertNull($relay->fetch('http://api.trusteed.xyz/.well-known/ucp?store=a', 1));
        $this->assertSame(0, $calls);
        $this->assertNull($relay->fetch(self::T, 1));
        $this->assertSame(1, $calls);
        $this->assertNull($relay->fetch(self::T, 2), 'HTML is not cached: it asks again.');
        $this->assertSame(2, $calls);
    }
}
