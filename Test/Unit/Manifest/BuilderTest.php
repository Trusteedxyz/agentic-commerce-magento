<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Manifest;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Cache\FrontendInterface;
use Magento\Framework\Event\ManagerInterface as EventManager;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Store\Api\Data\StoreInterface;
use Magento\Store\Model\StoreManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Manifest\Builder;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

/**
 * Manifest store-view filter unit tests (compliance/leakage fix).
 *
 * Verifies `collectStoreViews()` honours `trusteed_general/general/store_view_selection`
 * (CSV of store CODES) with safe fallbacks for empty and misconfigured selection.
 */
final class BuilderTest extends TestCase
{
    private const CONFIG_PATH = 'trusteed_general/general/store_view_selection';

    /** @var StoreManagerInterface&MockObject */
    private $storeManager;
    /** @var ScopeConfigInterface&MockObject */
    private $scopeConfig;
    /** @var LoggerInterface&MockObject */
    private $logger;

    private Builder $builder;

    protected function setUp(): void
    {
        $this->storeManager = $this->createMock(StoreManagerInterface::class);
        $this->scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $this->logger = $this->createMock(LoggerInterface::class);

        $this->builder = new Builder(
            $this->storeManager,
            $this->scopeConfig,
            $this->createMock(FrontendInterface::class),
            $this->createMock(EventManager::class),
            $this->logger,
            $this->createMock(SecretReader::class),
            $this->createMock(Curl::class),
            new InternalHmacSigner(),
        );
    }

    public function test_empty_selection_returns_all_active_stores(): void
    {
        $this->givenActiveStores(['default', 'fr', 'de']);
        $this->givenSelection('');

        $this->logger->expects($this->never())->method('warning');

        $views = $this->invokeCollect();
        $this->assertSame(['default', 'fr', 'de'], array_column($views, 'code'));
    }

    public function test_selection_filters_to_listed_codes(): void
    {
        $this->givenActiveStores(['default', 'fr', 'de']);
        $this->givenSelection('default,fr');

        $this->logger->expects($this->never())->method('warning');
        $this->logger->expects($this->once())
            ->method('debug')
            ->with('manifest_store_filter_applied', $this->callback(
                static fn(array $ctx): bool => $ctx['selected'] === 2 && $ctx['total'] === 3
            ));

        $views = $this->invokeCollect();
        $this->assertSame(['default', 'fr'], array_column($views, 'code'));
    }

    public function test_partially_unknown_selection_logs_warning_and_skips_unknown(): void
    {
        $this->givenActiveStores(['default', 'fr', 'de']);
        $this->givenSelection('default,xx');

        $this->logger->expects($this->once())
            ->method('warning')
            ->with('manifest_store_filter_unknown_entry', ['entry' => 'xx']);

        $views = $this->invokeCollect();
        $this->assertSame(['default'], array_column($views, 'code'));
    }

    public function test_all_unknown_selection_falls_back_to_all_stores_with_severity_warning(): void
    {
        $this->givenActiveStores(['default', 'fr', 'de']);
        $this->givenSelection('xx,yy');

        // Expect two unknown-entry warnings + one fallback warning.
        $this->logger->expects($this->exactly(3))->method('warning');

        $views = $this->invokeCollect();
        $this->assertSame(['default', 'fr', 'de'], array_column($views, 'code'));
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    /**
     * @param array<int, string> $codes
     */
    private function givenActiveStores(array $codes): void
    {
        $stores = [];
        foreach ($codes as $code) {
            $store = $this->createMock(StoreInterface::class);
            $store->method('getCode')->willReturn($code);
            $store->method('getBaseUrl')->willReturn("https://{$code}.example.com/");
            // Builder also calls isActive() on the concrete store; StoreInterface
            // lacks it, so we stub via dynamic mock additions.
            $store->method('isActive')->willReturn(true);
            $stores[] = $store;
        }
        $this->storeManager->method('getStores')->with(false)->willReturn($stores);
    }

    private function givenSelection(string $value): void
    {
        $this->scopeConfig->method('getValue')
            ->willReturnCallback(static fn(string $path) => $path === self::CONFIG_PATH ? $value : '');
    }

    /**
     * @return array<int, array{code: string, base_url: string}>
     */
    private function invokeCollect(): array
    {
        $ref = new \ReflectionClass(Builder::class);
        $method = $ref->getMethod('collectStoreViews');
        $method->setAccessible(true);
        /** @var array<int, array{code: string, base_url: string}> $result */
        $result = $method->invoke($this->builder);
        return $result;
    }
}
