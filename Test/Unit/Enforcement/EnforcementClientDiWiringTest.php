<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Plan 04 Task 29c (L3) — los opcionales de constructor no se inyectan solos.
 *
 * `EnforcementClient::$cache` es nullable (los tests construyen el cliente sin
 * ella) y Magento NO inyecta por tipo un argumento con valor por defecto: sin
 * su binding en `etc/di.xml` la caché negativa del JWKS sería siempre null y
 * nadie lo vería (mismo fallo que `request` en `CheckoutSubmitBefore`, o el
 * `historyFetcher` que sigue sin cablear). El gate lee el di.xml REAL y exige
 * que cada argumento declarado exista en el constructor y que `cache` apunte a
 * `CacheInterface`.
 */
final class EnforcementClientDiWiringTest extends TestCase
{
    /** @return array<string,string> nombre del argumento => clase inyectada */
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
