<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Controller\Webmcp;

require_once __DIR__ . '/../../stubs/MagentoWebmcpStubs.php';

use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Data\Form\FormKey;
use Magento\Framework\UrlInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Model\Quote;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Controller\Webmcp\Checkout;
use Trusteed\AgenticCommerce\Service\BrowserAgentSignature;

/**
 * Endpoint WebMCP del checkout (Task 5). Misma conducta que el de WooCommerce
 * (`WebmcpCheckoutEndpointTest`): marca de agente SOLO en servidor, `complete` nunca crea pedido.
 * Arnés local con stubs mínimos (Test/Unit/stubs/MagentoWebmcpStubs.php).
 */
final class CheckoutTest extends TestCase
{
    public const FORM_KEY = 'fk_session_bound_123';
    public const ORIGIN   = 'https://shop.example';

    private CheckoutSession $session;
    private object $quote;
    private object $address;
    /** @var list<string> */
    private array $saved = [];
    /** @var list<array> */
    private array $resolveCalls = [];
    private ?\Throwable $resolveThrows = null;
    private string $signatureMode = 'observe';
    private string $setting = '1';

    protected function setUp(): void
    {
        if (!\defined('TRUSTEED_MAGENTO_UNIT_STUBS')) {
            self::markTestSkipped('arnés de stubs locales; con el framework real no aplica');
        }
        $this->saved         = [];
        $this->resolveCalls  = [];
        $this->resolveThrows = null;
        $this->signatureMode = 'observe';
        $this->setting       = '1';
        $this->address       = $this->makeAddress(['m1' => 10.0, 'm2' => 20.0]);
        $this->quote         = $this->makeQuote($this->address, 1);
        $this->session       = $this->makeSession($this->quote);
    }

    /** @param array<string,float> $rates code => price */
    private function makeAddress(array $rates): object
    {
        return new class($rates) {
            public array $calls = [];
            public array $data = ['street' => ['', ''], 'city' => '', 'postcode' => '', 'country' => '', 'region' => '', 'first' => '', 'last' => ''];
            public string $method = '';
            public function __construct(public array $rates) {}
            public function setCollectShippingRates($v) { $this->calls[] = 'setCollect'; return $this; }
            public function collectShippingRates() { $this->calls[] = 'collectRates'; return $this; }
            public function getAllShippingRates(): array
            {
                return array_map(static fn(string $c) => new class($c) { public function __construct(private string $c) {} public function getCode() { return $this->c; } }, array_keys($this->rates));
            }
            public function setStreet($v) { $this->data['street'] = array_values((array) $v) + ['', '']; return $this; }
            public function getStreetLine($n) { return $this->data['street'][$n - 1] ?? ''; }
            public function setCity($v) { $this->data['city'] = $v; return $this; }
            public function getCity() { return $this->data['city']; }
            public function setPostcode($v) { $this->data['postcode'] = $v; return $this; }
            public function getPostcode() { return $this->data['postcode']; }
            public function setCountryId($v) { $this->data['country'] = $v; return $this; }
            public function getCountryId() { return $this->data['country']; }
            public function setRegionCode($v) { $this->data['region'] = $v; return $this; }
            public function setFirstname($v) { $this->data['first'] = $v; return $this; }
            public function setLastname($v) { $this->data['last'] = $v; return $this; }
            public function setShippingMethod($v) { $this->method = $v; return $this; }
            public function getShippingMethod() { return $this->method; }
            public function getShippingAmount() { return $this->method !== '' ? ($this->rates[$this->method] ?? 0.0) : 0.0; }
            public function getTaxAmount() { return 0.0; }
        };
    }

    private function makeQuote(object $address, int $count): object
    {
        return new class($address, $count) extends Quote {
            public array $calls = [];
            public string $email = '';
            public function __construct(public object $address, public int $count) {}
            public function getItemsCount() { return $this->count; }
            public function getShippingAddress() { return $this->address; }
            public function collectTotals() { $this->calls[] = 'collectTotals'; return $this; }
            public function setCustomerEmail($v) { $this->email = $v; return $this; }
            public function getCustomerEmail() { return $this->email; }
            public function getQuoteCurrencyCode() { return 'EUR'; }
            public function getSubtotal() { return 30.0; }
            public function getGrandTotal(): float { return 30.0 + $this->address->getShippingAmount(); }
            public function getAllVisibleItems(): array
            {
                return [new class { public function getName() { return 'Camiseta'; } public function getQty() { return 2; } public function getRowTotal() { return 30.0; } }];
            }
        };
    }

    private function makeSession(object $quote): CheckoutSession
    {
        return new class($quote) extends CheckoutSession {
            public function __construct(private object $quote) {}
            public function getQuote() { return $this->quote; }
        };
    }

    private function makeRequest(string $body, array $headers = [], string $method = 'POST'): Http
    {
        return new class($body, $headers, $method) extends Http {
            public function __construct(private string $body, private array $headers, private string $method) {}
            public function getContent(): string { return $this->body; }
            public function getMethod(): string { return $this->method; }
            public function getRequestUri(): string { return '/trusteed/webmcp/checkout'; }
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

    private function controller(Http $request): Checkout
    {
        $config = new class($this->setting) implements ScopeConfigInterface {
            public function __construct(private string $setting) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $path === 'trusteed_general/features/webmcp_checkout_tools' ? $this->setting : null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return $path === 'trusteed_general/features/webmcp_checkout_tools' && $this->setting === '1';
            }
        };
        $formKey = new class extends FormKey { public function getFormKey(): string { return CheckoutTest::FORM_KEY; } };
        $url = new class implements UrlInterface {
            public function getBaseUrl($params = []) { return CheckoutTest::ORIGIN . '/'; }
            public function getUrl($routePath = null, $routeParams = null) { return CheckoutTest::ORIGIN . '/' . $routePath . '/'; }
        };
        $carts = new class($this->saved) implements CartRepositoryInterface {
            public function __construct(private array &$saved) {}
            public function save($quote) { $this->saved[] = 'saved'; return $quote; }
        };
        $self = $this;
        $signature = new class($config, $this->signatureMode, $self) extends BrowserAgentSignature {
            public function __construct(ScopeConfigInterface $c, private string $m, private object $t) {}
            public function mode(): string { return $this->m; }
            public function resolve(array $headers, string $method, string $pathAndQuery): ?array
            {
                return ($this->t->onResolve)($headers, $method, $pathAndQuery);
            }
        };
        $this->onResolve = function (array $h, string $m, string $p): ?array {
            $this->resolveCalls[] = [$h, $m, $p];
            if ($this->resolveThrows !== null) {
                throw $this->resolveThrows;
            }
            return null;
        };

        return new Checkout(
            $request,
            new JsonFactory(),
            $this->session,
            $formKey,
            $config,
            $url,
            $carts,
            $signature,
            $this->createMock(LoggerInterface::class)
        );
    }

    /** @var callable */
    public $onResolve;

    /** @return array{0:int,1:mixed} */
    private function call(string $body, array $headers = ['X-Trusteed-Form-Key' => self::FORM_KEY]): array
    {
        $c = $this->controller($this->makeRequest($body, $headers));
        $req = $this->makeRequest($body, $headers);
        $csrf = $c->validateForCsrf($req);
        if ($csrf === false) {
            return [403, null];
        }
        $r = $c->execute();
        self::assertInstanceOf(Json::class, $r);
        return [$r->code, $r->data];
    }

    private function tool(string $tool, array $args = []): string
    {
        return (string) json_encode(['tool' => $tool, 'arguments' => $args]);
    }

    private function marked(): bool
    {
        return $this->session->getData('trusteed_agentic_origin') === '1';
    }

    public function testGetCheckoutReturnsStateAndMarksTheSession(): void
    {
        [$code, $data] = $this->call($this->tool('get_checkout'));
        self::assertSame(200, $code);
        self::assertSame('open', $data['status']);
        self::assertSame('EUR', $data['currency']);
        self::assertSame('Camiseta', $data['items'][0]['name']);
        self::assertSame(2, $data['items'][0]['quantity']);
        self::assertTrue($this->marked());
        self::assertSame('webmcp', $this->session->getData('trusteed_agentic_channel'));
        self::assertContains('collectTotals', $this->quote->calls, 'totales recalculados antes de describir');
    }

    public function testEmptyQuoteReportsEmptyAndMarksNothing(): void
    {
        $this->quote = $this->makeQuote($this->address, 0);
        $this->session = $this->makeSession($this->quote);
        [$code, $data] = $this->call($this->tool('get_checkout'));
        self::assertSame(200, $code);
        self::assertSame(['status' => 'empty'], $data);
        self::assertFalse($this->marked());
    }

    public function testUnknownToolIs400AndUnmarked(): void
    {
        [$code, $data] = $this->call($this->tool('place_order'));
        self::assertSame(400, $code);
        self::assertSame('unknown_tool', $data['error']);
        self::assertFalse($this->marked());
    }

    public function testNonJsonBodyIs400(): void
    {
        [$code] = $this->call('not json');
        self::assertSame(400, $code);
        self::assertFalse($this->marked());
    }

    public function testOversizedBodyIs413AndUnmarked(): void
    {
        $body = (string) json_encode(['tool' => 'get_checkout', 'arguments' => ['pad' => str_repeat('a', 17000)]]);
        [$code, $data] = $this->call($body);
        self::assertSame(413, $code);
        self::assertSame('payload_too_large', $data['error']);
        self::assertFalse($this->marked());
    }

    public function testInvalidShippingMethodIs400AndWritesNothing(): void
    {
        [$code, $data] = $this->call($this->tool('update_checkout', ['checkout' => [
            'buyer' => ['email' => 'a@b.co'],
            'fulfillment' => ['method_id' => 'nope_nope', 'address' => ['city' => 'Madrid']],
        ]]));
        self::assertSame(400, $code);
        self::assertSame('invalid_shipping_method', $data['error']);
        self::assertSame('', $this->quote->email);
        self::assertSame('', $this->address->getCity());
        self::assertSame('', $this->address->method);
        self::assertSame([], $this->saved);
        self::assertFalse($this->marked());
        self::assertContains('collectTotals', $this->quote->calls, 'tarifas recalculadas ANTES de validar');
        self::assertContains('collectRates', $this->address->calls);
    }

    public function testUpdateWritesOnlyTheAllowedFieldsAndRecalculates(): void
    {
        [$code, $data] = $this->call($this->tool('update_checkout', ['checkout' => [
            'buyer' => ['email' => 'buyer@example.com', 'phone' => '555'],
            'payment' => ['card' => '4242'],
            'items' => [['sku' => 'X']],
            'fulfillment' => [
                'method_id' => 'm2',
                'address' => ['address1' => 'Calle 1', 'address2' => '2B', 'city' => 'Madrid', 'postal_code' => '28001',
                    'country_code' => 'ES', 'province_code' => 'M', 'first_name' => 'Ana', 'last_name' => 'Ruiz', 'evil' => 'x'],
            ],
        ]]));
        self::assertSame(200, $code);
        self::assertSame('buyer@example.com', $this->quote->email);
        self::assertSame('Calle 1', $this->address->getStreetLine(1));
        self::assertSame('2B', $this->address->getStreetLine(2));
        self::assertSame('28001', $this->address->getPostcode());
        self::assertSame('ES', $this->address->getCountryId());
        self::assertSame('m2', $this->address->method);
        self::assertSame(['saved'], $this->saved);
        self::assertSame('m2', $data['fulfillment']['method_id']);
        self::assertSame(50.0, $data['totals']['total']);
        self::assertTrue($this->marked());
    }

    public function testInvalidEmailIsIgnored(): void
    {
        $this->call($this->tool('update_checkout', ['checkout' => ['buyer' => ['email' => 'not-an-email']]]));
        self::assertSame('', $this->quote->email);
    }

    public function testCompleteCheckoutNeverPlacesAnOrder(): void
    {
        [$code, $data] = $this->call($this->tool('complete_checkout'));
        self::assertSame(200, $code);
        self::assertSame('requires_buyer_confirmation', $data['status']);
        self::assertSame(self::ORIGIN . '/checkout/', $data['checkout_url']);
        self::assertSame([], $this->saved, 'complete no escribe el quote');
        self::assertTrue($this->marked());
    }

    public function testClientCannotClearAgenticMark(): void
    {
        $this->call($this->tool('get_checkout'));
        self::assertTrue($this->marked());
        $this->call($this->tool('update_checkout', ['trusteed_agentic_origin' => '', 'checkout' => [
            'trusteed_agentic_origin' => '0', 'trusteed_agentic_channel' => '',
            'buyer' => ['email' => 'x@y.co'],
        ]]));
        self::assertTrue($this->marked());
        self::assertSame('webmcp', $this->session->getData('trusteed_agentic_channel'));
    }

    public function testCsrfRequiresTheFormKeyHeader(): void
    {
        $c = $this->controller($this->makeRequest('{}'));
        self::assertTrue($c->validateForCsrf($this->makeRequest('{}', ['X-Trusteed-Form-Key' => self::FORM_KEY])));
        self::assertFalse($c->validateForCsrf($this->makeRequest('{}', [])));
        self::assertFalse($c->validateForCsrf($this->makeRequest('{}', ['X-Trusteed-Form-Key' => 'other'])));
        self::assertFalse($c->validateForCsrf($this->makeRequest('{}', ['X-Trusteed-Form-Key' => ''])));
    }

    public function testBodyFormKeyParamDoesNotSubstituteTheHeader(): void
    {
        $c = $this->controller($this->makeRequest((string) json_encode(['form_key' => self::FORM_KEY])));
        self::assertFalse($c->validateForCsrf($this->makeRequest((string) json_encode(['form_key' => self::FORM_KEY]), [])));
    }

    public function testCsrfExceptionCarriesA403JsonResult(): void
    {
        $c = $this->controller($this->makeRequest('{}'));
        $e = $c->createCsrfValidationException($this->makeRequest('{}'));
        $r = $e->getReplaceResult();
        self::assertInstanceOf(Json::class, $r);
        self::assertSame(403, $r->code);
    }

    /** @return array<string,array{0:array<string,string>,1:bool}> */
    public static function origins(): array
    {
        return [
            'same origin'          => [['Origin' => 'https://shop.example'], true],
            'same, default port'   => [['Origin' => 'https://SHOP.example:443'], true],
            'absent'               => [[], true],
            'other host'           => [['Origin' => 'https://evil.example'], false],
            'other scheme'         => [['Origin' => 'http://shop.example'], false],
            'other port'           => [['Origin' => 'https://shop.example:8443'], false],
            'null literal'         => [['Origin' => 'null'], false],
            'garbage'              => [['Origin' => 'shop.example'], false],
        ];
    }

    /** @dataProvider origins */
    public function testOriginCheck(array $headers, bool $allowed): void
    {
        $c = $this->controller($this->makeRequest('{}'));
        $req = $this->makeRequest('{}', ['X-Trusteed-Form-Key' => self::FORM_KEY] + $headers);
        self::assertSame($allowed, $c->validateForCsrf($req));
    }

    public function testWrongOriginIs403AndUnmarked(): void
    {
        [$code] = $this->call($this->tool('get_checkout'), ['X-Trusteed-Form-Key' => self::FORM_KEY, 'Origin' => 'https://evil.example']);
        self::assertSame(403, $code);
        self::assertFalse($this->marked());
    }

    public function testSettingOffAnswers404AndDoesNothing(): void
    {
        $this->setting = '0';
        [$code] = $this->call($this->tool('get_checkout'), []);
        self::assertSame(404, $code, 'con el ajuste apagado ni se pide la clave: 404 sin tocar la sesión');
        self::assertFalse($this->marked());
        self::assertSame([], $this->resolveCalls);
    }

    public function testSignatureIsVerifiedOnEveryCallAndNeverBlocks(): void
    {
        $this->call($this->tool('get_checkout'));
        self::assertCount(1, $this->resolveCalls);
        self::assertSame('POST', $this->resolveCalls[0][1]);
        self::assertSame('/trusteed/webmcp/checkout', $this->resolveCalls[0][2]);
        $this->resolveThrows = new \RuntimeException('verifier down');
        [$code, $data] = $this->call($this->tool('get_checkout'));
        self::assertSame(200, $code, 'un fallo del verificador nunca bloquea a una persona');
        self::assertSame('open', $data['status']);
        self::assertCount(2, $this->resolveCalls);
    }

    public function testSignatureOffMakesNoVerifierCall(): void
    {
        $this->signatureMode = 'off';
        $this->call($this->tool('get_checkout'));
        self::assertSame([], $this->resolveCalls);
    }
}
