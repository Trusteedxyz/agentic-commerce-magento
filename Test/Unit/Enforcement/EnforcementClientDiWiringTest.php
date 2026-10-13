<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Optional constructor arguments are not injected on their own.
 *
 * `EnforcementClient::$cache` is nullable (tests build the client without
 * it) and Magento does NOT inject by type an argument that has a default
 * value: without its binding in `etc/di.xml` the negative JWKS cache would
 * always be null and nobody would notice (same failure as `request` in
 * `CheckoutSubmitBefore`, or the `historyFetcher` that is still unwired).
 * The gate reads the REAL di.xml and requires that each declared argument
 * exists in the constructor and that `cache` points to `CacheInterface`.
 */
final class EnforcementClientDiWiringTest extends TestCase
{
    /** @return array<string,string> argument name => injected class */
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

    public function testTheNegativeCacheIsBoundToCacheInterfaceInDiXml(): void
    {
        $args = self::diArguments(EnforcementClient::class);

        self::assertSame('Magento\\Framework\\App\\CacheInterface', $args['cache'] ?? null);
        self::assertArrayHasKey('urlValidator', $args, 'el binding existente sigue');
    }

    public function testEveryDiArgumentOfTheClientExistsInItsConstructor(): void
    {
        $params = array_map(
            static fn (\ReflectionParameter $p): string => $p->getName(),
            (new \ReflectionMethod(EnforcementClient::class, '__construct'))->getParameters()
        );

        foreach (array_keys(self::diArguments(EnforcementClient::class)) as $name) {
            self::assertContains($name, $params, "di.xml declara `{$name}` pero el constructor no lo tiene");
        }
    }
}
