<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Model\Setup;

require_once __DIR__ . '/../../../../Model/Setup/ConnectExchange.php';

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Setup\ConnectExchange;

/**
 * El canje del connect_token tiene que hablar el contrato REAL de la API:
 * POST {base}/api/v1/platform/magento/validate-connect-token con connect_token,
 * store_url (https), store_id, integration_token (+ vistas y moneda). Antes el
 * módulo pegaba a `{base}/platform/...` (404 con la base documentada) y solo
 * mandaba connect_token (400 en la API).
 */
class ConnectExchangeTest extends TestCase
{
    public function testEndpointAddsApiV1WhenBaseHasNone(): void
    {
        $this->assertSame(
            'https://api.trusteed.xyz/api/v1/platform/magento/validate-connect-token',
            ConnectExchange::endpoint('https://api.trusteed.xyz')
        );
    }

    public function testEndpointDoesNotDuplicateApiV1(): void
    {
        $this->assertSame(
            'https://api.trusteed.xyz/api/v1/platform/magento/validate-connect-token',
            ConnectExchange::endpoint('https://api.trusteed.xyz/api/v1/')
        );
    }

    public function testBodyCarriesTheFieldsTheApiRequires(): void
    {
        $token = str_repeat('a', 64);
        $body = ConnectExchange::body($token, 'https://shop.example/', 'default', 'inttok', ['default', 'es'], 'EUR');
        $this->assertSame([
            'connect_token' => $token,
            'store_url' => 'https://shop.example',
            'store_id' => 'default',
            'integration_token' => 'inttok',
            'store_view_codes' => ['default', 'es'],
            'currency' => 'EUR',
        ], $body);
    }

    public function testBodyOmitsCurrencyWhenNotAThreeLetterCode(): void
    {
        $body = ConnectExchange::body(str_repeat('a', 64), 'https://shop.example', 'default', 't', ['default'], '');
        $this->assertArrayNotHasKey('currency', $body);
    }

    public function testRefusalMessageNamesTheKnownCauses(): void
    {
        $this->assertStringContainsString('expired', ConnectExchange::refusalMessage('token_invalid_or_expired'));
        $this->assertStringContainsString('another Trusteed account', ConnectExchange::refusalMessage('store_url_owned_by_another_merchant'));
    }

    public function testRefusalMessageKeepsTheCodeForUnknownOnes(): void
    {
        $this->assertStringContainsString('some_new_error', ConnectExchange::refusalMessage('some_new_error'));
        $this->assertStringContainsString('without a reason', ConnectExchange::refusalMessage(''));
    }
}
