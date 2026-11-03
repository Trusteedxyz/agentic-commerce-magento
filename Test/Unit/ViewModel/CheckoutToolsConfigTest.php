<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\ViewModel;

require_once __DIR__ . '/../stubs/MagentoWebmcpStubs.php';

use Magento\Framework\Data\Form\FormKey;
use Magento\Framework\UrlInterface;
use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\ViewModel\CheckoutToolsConfig;

final class CheckoutToolsConfigTest extends TestCase
{
    private function vm(string $formKey): CheckoutToolsConfig
    {
        $fk = new class($formKey) extends FormKey {
            public function __construct(private string $k) {}
            public function getFormKey(): string { return $this->k; }
        };
        $url = new class implements UrlInterface {
            public function getBaseUrl($params = []) { return 'https://shop.example/'; }
            public function getUrl($routePath = null, $routeParams = null) { return 'https://shop.example/' . $routePath; }
        };
        return new CheckoutToolsConfig($fk, $url);
    }

    public function testConfigHasTheProtocolFields(): void
    {
        $cfg = json_decode($this->vm('abc')->toJson(), true);
        self::assertSame([
            'endpoint'    => 'https://shop.example/trusteed/webmcp/checkout',
            'nonce'       => 'abc',
            'nonceHeader' => 'X-Trusteed-Form-Key',
            'platform'    => 'magento',
        ], $cfg);
    }

    public function testJsonCannotBreakOutOfAScriptTag(): void
    {
        $json = $this->vm('</script><script>alert(1)</script>"\'&')->toJson();
        self::assertStringNotContainsString('</script', $json);
        self::assertStringNotContainsString('<', $json);
        self::assertSame('</script><script>alert(1)</script>"\'&', json_decode($json, true)['nonce']);
    }
}
