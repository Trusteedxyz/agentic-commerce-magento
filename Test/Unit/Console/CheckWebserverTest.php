<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Console;

use Magento\Framework\App\Config\ScopeConfigInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Trusteed\AgenticCommerce\Console\Command\CheckWebserver;

/**
 * `trusteed:check-webserver` acceptance of a real manifest.
 *
 * The command exists to tell a merchant whether their webserver actually serves
 * `/.well-known/mcp.json`. Its verdict is therefore only useful if it accepts
 * the manifest this module emits — the shape produced by
 * {@see \Trusteed\AgenticCommerce\Model\Manifest\Builder}, whose top-level
 * version key is `schema_version`.
 */
final class CheckWebserverTest extends TestCase
{
    protected function setUp(): void
    {
        CurlStubState::reset();
    }

    protected function tearDown(): void
    {
        CurlStubState::reset();
    }

    /**
     * The canonical manifest as `Builder::buildAndSign()` returns it.
     *
     * @return array<string, mixed>
     */
    private function realManifest(): array
    {
        return [
            'schema_version' => '1.0',
            'issuer' => 'https://api.trusteed.xyz',
            'merchant_id' => 'merchant_abc123',
            'store_views' => [
                ['code' => 'default', 'base_url' => 'https://shop.example.com'],
            ],
            'capabilities' => ['checkout', 'catalog_search', 'order_status'],
            'updated_at' => '2026-08-17T10:00:00Z',
            'signature' => [
                'jws' => 'eyJhbGciOiJFZERTQSJ9..c2lnbmF0dXJl',
                'kid' => 'trusteed-manifest-2026',
                'alg' => 'EdDSA',
                'signed_at' => '2026-08-17T10:00:00Z',
            ],
        ];
    }

    private function runCommand(): int
    {
        $scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $scopeConfig->method('getValue')->willReturn('https://shop.example.com/');

        $command = new CheckWebserver($scopeConfig);

        $execute = new \ReflectionMethod($command, 'execute');
        $execute->setAccessible(true);

        return (int)$execute->invoke(
            $command,
            $this->createMock(InputInterface::class),
            $this->createMock(OutputInterface::class)
        );
    }

    public function testAcceptsTheManifestThisModuleActuallyEmits(): void
    {
        CurlStubState::$httpCode = 200;
        CurlStubState::$body = (string)json_encode($this->realManifest());

        self::assertSame(
            0,
            $this->runCommand(),
            'A correctly served Builder-produced manifest must report SUCCESS'
        );
    }

    public function testRequestsTheWellKnownManifestUrl(): void
    {
        CurlStubState::$httpCode = 200;
        CurlStubState::$body = (string)json_encode($this->realManifest());

        $this->runCommand();

        self::assertSame(
            ['https://shop.example.com/.well-known/mcp.json'],
            CurlStubState::$requestedUrls
        );
    }

    public function testRejectsA200ThatIsNotAManifest(): void
    {
        // A webserver misconfiguration that returns the storefront 200 HTML page,
        // or any JSON without the manifest's version key, must still FAIL.
        CurlStubState::$httpCode = 200;
        CurlStubState::$body = (string)json_encode(['message' => 'Page not found']);

        self::assertSame(1, $this->runCommand());
    }

    public function testRejectsNonJsonBody(): void
    {
        CurlStubState::$httpCode = 200;
        CurlStubState::$body = '<html><body>404</body></html>';

        self::assertSame(1, $this->runCommand());
    }

    public function testFailsOnHttpError(): void
    {
        CurlStubState::$httpCode = 404;
        CurlStubState::$body = 'Not Found';

        self::assertSame(1, $this->runCommand());
    }

    public function testFailsOnTransportError(): void
    {
        CurlStubState::$error = 'Could not resolve host: shop.example.com';

        self::assertSame(1, $this->runCommand());
    }
}
