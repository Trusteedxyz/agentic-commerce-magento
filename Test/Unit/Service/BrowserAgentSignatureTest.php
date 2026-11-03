<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Service;

use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Quote\Model\Quote;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\BrowserAgentSignature;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Port de BrowserAgentSignatureTest (WooCommerce): firma RFC 9421 de un agente de navegador,
 * verificada contra la API de Trusteed con el embed_secret de la conexión.
 */
final class BrowserAgentSignatureTest extends TestCase
{
    private const INPUT = 'sig1=("@method" "@authority" "x-custom");created=1;keyid="k1";tag="web-bot-auth"';

    /** @var list<array{url:string,body:array<string,mixed>,headers:array<string,string>,options:array<int,mixed>}> */
    private array $calls = [];
    private int $status = 200;
    private string $body = '';
    private bool $throws = false;
    private int $secretReads = 0;

    protected function setUp(): void
    {
        $this->calls = [];
        $this->status = 200;
        $this->throws = false;
        $this->secretReads = 0;
        $this->apiSays('verified');
    }

    private function apiSays(string $status, string $key = 'key-123'): void
    {
        $this->body = (string)json_encode(['verified' => $status === 'verified', 'verificationStatus' => $status, 'provider' => 'openai', 'keyId' => $key]);
    }

    /** @return array<string,string> */
    private static function signed(array $extra = []): array
    {
        return array_merge([
            'signature-input' => self::INPUT,
            'signature'       => 'sig1=:YWJj:',
            'signature-agent' => '"https://agent.example"',
            'x-custom'        => 'covered',
        ], $extra);
    }

    private function scope(array $extra = []): ScopeConfigInterface
    {
        $values = array_merge([
            'trusteed_general/general/merchant_id'  => 'merchant-1',
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test/api',
            'web/secure/base_url'                  => 'https://shop.example.com/',
        ], $extra);
        return new class($values) implements ScopeConfigInterface {
            public function __construct(private readonly array $values) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null) { return $this->values[$path] ?? null; }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null) { return false; }
        };
    }

    private function curl(): Curl
    {
        $test = $this;
        return new class($test) extends Curl {
            private array $headers = [];
            private array $options = [];
            private int $status = 0;
            private string $body = '';
            public function __construct(private readonly object $test) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void { $this->options[$option] = $value; }
            public function addHeader(string $name, string $value): void { $this->headers[$name] = $value; }
            public function post(string $url, $body): void
            {
                [$this->status, $this->body] = $this->test->respond($url, (string)$body, $this->headers, $this->options);
                $this->headers = [];
            }
            public function getStatus(): int { return $this->status; }
            public function getBody(): string { return $this->body; }
        };
    }

    /** @return array{0:int,1:string} */
    public function respond(string $url, string $body, array $headers, array $options): array
    {
        $this->calls[] = ['url' => $url, 'body' => json_decode($body, true), 'headers' => $headers, 'options' => $options];
        if ($this->throws) {
            throw new \RuntimeException('Operation timed out');
        }
        return [$this->status, $this->body];
    }

    private function sig(string $mode = 'enforce', array $config = []): BrowserAgentSignature
    {
        $secrets = $this->createMock(SecretReader::class);
        $secrets->method('read')->willReturnCallback(function (): string {
            $this->secretReads++;
            return 'embed-secret';
        });
        return new BrowserAgentSignature(
            $this->scope(array_merge(['trusteed_general/features/browser_agent_signature_mode' => $mode], $config)),
            $secrets,
            $this->curl(),
            $this->createMock(LoggerInterface::class)
        );
    }

    // ── M3 ───────────────────────────────────────────────────────────────

    public function testNoCallWithoutAllThreeHeaders(): void
    {
        $sig = $this->sig();
        foreach (['signature', 'signature-input', 'signature-agent'] as $missing) {
            $h = self::signed();
            unset($h[$missing]);
            self::assertNull($sig->resolve($h, 'POST', '/rest/V1/x'));
        }
        // etiqueta no común
        self::assertNull($sig->resolve(self::signed(['signature' => 'other=:YWJj:']), 'POST', '/rest/V1/x'));
        self::assertSame([], $this->calls);
        self::assertSame(0, $this->secretReads, 'el secreto solo se descifra si hay que llamar');
    }

    public function testOffModeMakesNoCall(): void
    {
        self::assertNull($this->sig('off')->resolve(self::signed(), 'POST', '/rest/V1/x'));
        self::assertSame([], $this->calls);
    }

    public function testModeDefaultsToObserveAndRejectsUnknownValues(): void
    {
        self::assertSame('observe', BrowserAgentSignature::normalizeMode(null));
        self::assertSame('observe', BrowserAgentSignature::normalizeMode('bogus'));
        self::assertSame('enforce', BrowserAgentSignature::normalizeMode(' ENFORCE '));
        self::assertSame('off', BrowserAgentSignature::normalizeMode('off'));
    }

    // ── request / H1 ─────────────────────────────────────────────────────

    public function testRequestCarriesS2sSecretMerchantAndCoveredHeaders(): void
    {
        $r = $this->sig()->resolve(self::signed(), 'post', '/rest/V1/guest-carts/abc/payment-information?x=1');
        self::assertSame('verified', $r['status']);
        self::assertCount(1, $this->calls);
        $c = $this->calls[0];
        self::assertSame('https://api.trusteed.test/api/v1/embed/agentic-tools/verify-agent-signature', $c['url']);
        self::assertSame('embed-secret', $c['headers']['x-trusteed-s2s-secret']);
        self::assertSame('merchant-1', $c['body']['merchant_id']);
        self::assertSame('POST', $c['body']['method']);
        self::assertSame('covered', $c['body']['headers']['x-custom']);
        self::assertSame('shop.example.com', $c['body']['headers']['host']);
        self::assertSame(1500, $c['options'][CURLOPT_TIMEOUT_MS]);
    }

    public function testUrlFromStoreBaseUrlNotHostHeader(): void
    {
        $this->sig()->resolve(self::signed(['host' => 'evil.example']), 'POST', '/rest/V1/x?y=2');
        self::assertSame('https://shop.example.com/rest/V1/x?y=2', $this->calls[0]['body']['url']);
        self::assertSame('shop.example.com', $this->calls[0]['body']['headers']['host']);
    }

    public function testRequestUriCannotSmuggleAnotherAuthority(): void
    {
        $this->sig()->resolve(self::signed(), 'POST', '//evil.example/path');
        self::assertStringStartsWith('https://shop.example.com', $this->calls[0]['body']['url']);
        self::assertStringNotContainsString('evil.example', (string)parse_url($this->calls[0]['body']['url'], PHP_URL_HOST));
    }

    public function testNeverForwardsCookieAuthorizationFormKeyOrMagentoAuthHeaders(): void
    {
        $input = 'sig1=("@authority" "cookie" "authorization" "proxy-authorization" "form_key" "x-magento-tags" "x-custom")';
        $h = self::signed([
            'signature-input' => $input,
            'cookie' => 'PHPSESSID=abc', 'authorization' => 'Bearer t', 'proxy-authorization' => 'x',
            'form_key' => 'fk', 'x-form-key' => 'fk', 'x-magento-tags' => 'a',
        ]);
        $this->sig()->resolve($h, 'POST', '/rest/V1/x');
        $sent = $this->calls[0]['body']['headers'];
        foreach (['cookie', 'authorization', 'proxy-authorization', 'form_key', 'x-form-key', 'x-magento-tags'] as $name) {
            self::assertArrayNotHasKey($name, $sent);
        }
        self::assertArrayHasKey('x-custom', $sent);
    }

    public function testNeverForwardsOurOwnCsrfHeader(): void
    {
        $h = self::signed([
            'signature-input' => 'sig1=("@authority" "x-trusteed-form-key" "x-custom")',
            'x-trusteed-form-key' => 'fk',
        ]);
        $this->sig()->resolve($h, 'POST', '/rest/V1/x');
        $sent = $this->calls[0]['body']['headers'];
        self::assertArrayNotHasKey('x-trusteed-form-key', $sent);
        self::assertArrayHasKey('x-custom', $sent);
    }

    public function testCollectHeadersFromRequestSkipsCredentials(): void
    {
        $values = self::signed(['cookie' => 'PHPSESSID=abc', 'x-magento-tags' => 'a']);
        $values['signature-input'] = 'sig1=("@authority" "cookie" "x-magento-tags" "x-custom")';
        $request = new class($values) {
            public function __construct(private readonly array $v) {}
            public function getHeader($name) { return $this->v[strtolower($name)] ?? false; }
        };
        $out = BrowserAgentSignature::collectHeaders($request);
        self::assertSame(['signature', 'signature-input', 'signature-agent', 'x-custom'], array_keys($out));
    }

    // ── H1 / M1 ──────────────────────────────────────────────────────────

    public function testVerifiedWithoutAuthorityOrTargetUriDowngrades(): void
    {
        $h = self::signed(['signature-input' => 'sig1=("@method" "x-custom");keyid="k1"']);
        $r = $this->sig()->resolve($h, 'POST', '/rest/V1/x');
        self::assertSame('unverified', $r['status']);
        self::assertSame('', $r['identity']);
    }

    public function testTargetUriCoveredIsEnough(): void
    {
        $h = self::signed(['signature-input' => 'sig1=("@target-uri");keyid="k1"']);
        self::assertSame('verified', $this->sig()->resolve($h, 'POST', '/rest/V1/x')['status']);
    }

    public function testIdentityBoundToHttpsSignatureAgentOrigin(): void
    {
        $r = $this->sig()->resolve(self::signed(['signature-agent' => '"https://Agent.Example:8443/dir"']), 'POST', '/rest/V1/x');
        self::assertSame('wba:https://agent.example:8443#key-123', $r['identity']);
    }

    public function testIdentityRequiresHttpsSignatureAgent(): void
    {
        foreach (['"http://agent.example"', 'garbage'] as $agent) {
            $r = $this->sig()->resolve(self::signed(['signature-agent' => $agent]), 'POST', '/rest/V1/x');
            self::assertSame('unverified', $r['status']);
            self::assertSame('', $r['identity']);
        }
    }

    public function testResultIsCachedWithinTheRequest(): void
    {
        $sig = $this->sig();
        $sig->resolve(self::signed(), 'POST', '/rest/V1/x');
        $sig->resolve(self::signed(), 'POST', '/rest/V1/x');
        self::assertCount(1, $this->calls);
    }

    // ── fallos: nunca reclasifican ───────────────────────────────────────

    public function testVerifierTimeoutKeepsClassification(): void
    {
        $this->throws = true;
        $r = $this->sig()->resolve(self::signed(), 'POST', '/rest/V1/x');
        self::assertSame('error', $r['status']);
        self::assertSame('', $r['identity']);
    }

    public function testNon200OrBadJsonIsError(): void
    {
        $this->status = 503;
        self::assertSame('error', $this->sig()->resolve(self::signed(), 'POST', '/a')['status']);
        $this->status = 200;
        $this->body = 'not json';
        self::assertSame('error', $this->sig()->resolve(self::signed(), 'POST', '/b')['status']);
    }

    public function testNoCallWhenApiBaseIsNotHttps(): void
    {
        $sig = $this->sig('enforce', ['trusteed_general/general/api_base_url' => 'http://api.trusteed.test']);
        self::assertNull($sig->resolve(self::signed(), 'POST', '/rest/V1/x'));
        self::assertSame([], $this->calls);
    }

    // ── observer ─────────────────────────────────────────────────────────

    /** @return array<string,mixed> payload enviado a evaluate() */
    private function checkout(string $mode, ?string $apiStatus = 'verified'): array
    {
        if ($apiStatus === null) {
            $this->throws = true;
        } else {
            $this->apiSays($apiStatus);
        }
        $headers = self::signed();
        $request = new class($headers) implements RequestInterface {
            public function __construct(private readonly array $h) {}
            public function getParam($key, $defaultValue = null) { return $defaultValue; }
            public function getHeader($name, $default = false) { return $this->h[strtolower($name)] ?? $default; }
            public function getMethod() { return 'POST'; }
            public function getRequestUri() { return '/rest/V1/guest-carts/x/payment-information'; }
        };
        $captured = [];
        $enforcement = $this->createMock(EnforcementClient::class);
        $enforcement->method('evaluate')->willReturnCallback(function (array $p) use (&$captured): string {
            $captured = $p;
            return EnforcementClient::DECISION_ALLOW;
        });
        $logger = $this->createMock(LoggerInterface::class);
        $scope = $this->scope(['trusteed_general/features/browser_agent_signature_mode' => $mode]);
        $secrets = $this->createMock(SecretReader::class);
        $secrets->method('read')->willReturn('embed-secret');
        $observer = new CheckoutSubmitBefore(
            new CheckoutSession(),
            new AgentTokenVerifier($logger),
            $enforcement,
            $scope,
            $logger,
            $this->createMock(CacheInterface::class),
            $this->createMock(CategoryRepositoryInterface::class),
            null,
            $request,
            new BrowserAgentSignature($scope, $secrets, $this->curl(), $logger)
        );
        $quote = new class extends Quote {
            public function getQuoteCurrencyCode() { return 'EUR'; }
            public function getId() { return 0; }
            public function getBillingAddress() { return null; }
            public function getShippingAddress() { return null; }
            public function getCustomer() { return null; }
        };
        $quote->grandTotal = 50.0;
        $event = new class($quote) extends Observer {
            public function __construct(private readonly Quote $quote) {}
            public function getEvent()
            {
                return new class($this->quote) {
                    public function __construct(private readonly Quote $quote) {}
                    public function getData($key) { return $key === 'quote' ? $this->quote : null; }
                };
            }
        };
        $observer->execute($event);
        return $captured;
    }

    public function testEnforceVerifiedSetsVerifiedSignature(): void
    {
        $p = $this->checkout('enforce');
        self::assertSame('wba:https://agent.example#key-123', $p['agentId']);
        self::assertSame('verified_signature', $p['agentIdentityLevel']);
        self::assertSame('agentic_endpoint', $p['endpointClass']);
    }

    public function testEnforceSpoofedMarksAnonymousAgent(): void
    {
        $p = $this->checkout('enforce', 'spoofed');
        self::assertNull($p['agentId']);
        self::assertSame('agentic_endpoint', $p['endpointClass']);
        self::assertArrayNotHasKey('agentIdentityLevel', $p);
    }

    public function testObserveNeverReclassifies(): void
    {
        foreach (['verified', 'spoofed'] as $status) {
            $p = $this->checkout('observe', $status);
            self::assertNull($p['agentId']);
            self::assertArrayNotHasKey('endpointClass', $p);
            self::assertArrayNotHasKey('agentIdentityLevel', $p);
        }
        self::assertNotSame([], $this->calls, 'observe sí verifica');
    }

    public function testEnforceUnverifiedOrTimeoutKeepsClassification(): void
    {
        foreach (['unverified', null] as $status) {
            $p = $this->checkout('enforce', $status);
            self::assertNull($p['agentId']);
            self::assertArrayNotHasKey('endpointClass', $p);
        }
    }
}
