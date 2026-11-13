<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Manifest;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Cache\FrontendInterface;
use Magento\Framework\Event\ManagerInterface as EventManager;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Model\StoreManagerInterface;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Manifest\Builder;
use Trusteed\AgenticCommerce\Model\Manifest\ManifestSigningException;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

/**
 * «Catálogo publicado» del panel lee TRUSTEED_MANIFEST_LAST_BUILT_AT y, hasta la 1.3.13, nadie la
 * escribía: el manifiesto se firmaba y se servía, y la tarjeta decía «Aún no generado» para siempre.
 */
final class BuilderBuiltAtTest extends TestCase
{
    private const BUILT_AT_KEY = 'TRUSTEED_MANIFEST_LAST_BUILT_AT';

    /** @var array<string, string> */
    private array $saved = [];

    public function test_a_signed_build_records_when_the_manifest_was_built(): void
    {
        $before = time();
        $this->builder(200, $this->signResponse())->build('m1');

        $this->assertArrayHasKey(self::BUILT_AT_KEY, $this->saved);
        $this->assertGreaterThanOrEqual($before, (int)$this->saved[self::BUILT_AT_KEY]);
    }

    public function test_a_failed_signature_records_nothing(): void
    {
        try {
            $this->builder(500, '{}')->build('m1');
            $this->fail('un fallo de firma debe propagarse');
        } catch (ManifestSigningException) {
            $this->assertArrayNotHasKey(self::BUILT_AT_KEY, $this->saved);
        }
    }

    private function signResponse(): string
    {
        return (string)json_encode([
            'jws' => 'a.b.c',
            'kid' => 'trusteed-2026-test',
            'alg' => 'EdDSA',
            'signed_at' => '2026-11-13T19:00:00Z',
            'signed_payload' => ['schema_version' => '1.0'],
        ]);
    }

    private function builder(int $status, string $body): Builder
    {
        $config = [
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.xyz',
            'trusteed_general/general/merchant_id' => 'm1',
            'trusteed_general/general/connection_id' => 'c1',
        ];
        $scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $scopeConfig->method('getValue')->willReturnCallback(static fn(string $path) => $config[$path] ?? '');

        $secrets = $this->createMock(SecretReader::class);
        $secrets->method('read')->willReturn('whsec-not-a-real-secret');

        $storeManager = $this->createMock(StoreManagerInterface::class);
        $storeManager->method('getStores')->willReturn([]);

        $curl = $this->createMock(Curl::class);
        $curl->method('getStatus')->willReturn($status);
        $curl->method('getBody')->willReturn($body);

        $cache = $this->createMock(FrontendInterface::class);
        $cache->method('load')->willReturn(false);
        $cache->method('save')->willReturnCallback(function (string $data, string $id): bool {
            $this->saved[$id] = $data;

            return true;
        });

        return new Builder(
            $storeManager,
            $scopeConfig,
            $cache,
            $this->createMock(EventManager::class),
            $this->createMock(LoggerInterface::class),
            $secrets,
            $curl,
            new InternalHmacSigner(),
        );
    }
}
