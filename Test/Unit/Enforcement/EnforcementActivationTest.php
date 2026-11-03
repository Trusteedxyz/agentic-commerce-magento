<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * Spec-050 C4 regression — enforcement activation.
 *
 * Proves the root cause and the fix for the "silent no-op" bug:
 *   - When `trusteed/enforcement/installation_id` is empty (the pre-fix state,
 *     because the wizard only ever wrote `trusteed_general/general/*`),
 *     EnforcementClient::evaluate() short-circuits to unconditional ALLOW and
 *     never calls the API.
 *   - Once the wizard (Setup\Save) persists the enforcement installation_id +
 *     hmac_secret to those exact paths, evaluate() reaches the API and honours a
 *     real ALLOW / BLOCK decision.
 *
 * The HTTP layer is stubbed; the test asserts whether the network call happened
 * (proving short-circuit vs. real evaluation) and that the decision is returned.
 */
class EnforcementActivationTest extends TestCase
{
    /**
     * Curl stub that records whether post() was invoked and returns a canned
     * status + JSON body.
     */
    private function makeCurl(int $status, string $body, object $calls): Curl
    {
        return new class($status, $body, $calls) extends Curl {
            public function __construct(
                private readonly int $status,
                private readonly string $body,
                private readonly object $calls
            ) {}
            public function setTimeout(int $seconds): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                $this->calls->posted = true;
            }
            public function getStatus(): int { return $this->status; }
            public function getBody(): string { return $this->body; }
        };
    }

    /**
     * @param array<string,string|null> $config
     */
    private function makeScopeConfig(array $config): ScopeConfigInterface
    {
        return new class($config) implements ScopeConfigInterface {
            /** @param array<string,string|null> $config */
            public function __construct(private readonly array $config) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $this->config[$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    private function payload(): array
    {
        return [
            'merchantId'     => 'merchant_xyz',
            'agentId'        => 'did:web:agent.example',
            'orderContext'   => ['total' => 1000],
            'platform'       => 'MAGENTO',
            'installationId' => 'inst_abc',
            'timestamp'      => gmdate('Y-m-d\TH:i:s\Z'),
        ];
    }

    /**
     * C4-01 — PRE-FIX STATE: installation_id missing (wizard never wrote it) →
     * unconditional ALLOW and NO network call. This is exactly the silent no-op.
     */
    public function testUnconfiguredInstallationIdIsSilentNoOp(): void
    {
        $calls = new \stdClass();
        $calls->posted = false;

        $config = [
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            // installation_id + hmac_secret intentionally ABSENT (pre-fix).
        ];

        $client = new EnforcementClient(
            $this->makeScopeConfig($config),
            $this->makeCurl(200, '{"decision":"BLOCK"}', $calls),
            $this->createMock(LoggerInterface::class)
        );

        $decision = $client->evaluate($this->payload());

        $this->assertSame('ALLOW', $decision, 'Missing installation_id must short-circuit to ALLOW');
        $this->assertFalse($calls->posted, 'No API call may be made when enforcement is unconfigured');
    }

    /**
     * C4-02 — POST-FIX STATE: wizard persisted installation_id + hmac_secret to
     * the enforcement paths → evaluate() calls the API and returns BLOCK.
     */
    public function testConfiguredEnforcementReachesBlockDecision(): void
    {
        $calls = new \stdClass();
        $calls->posted = false;

        $config = [
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            'trusteed/enforcement/hmac_secret'      => 'sekret',
        ];

        $client = new EnforcementClient(
            $this->makeScopeConfig($config),
            $this->makeCurl(200, '{"decision":"BLOCK"}', $calls),
            $this->createMock(LoggerInterface::class)
        );

        $decision = $client->evaluate($this->payload());

        $this->assertTrue($calls->posted, 'A configured installation must reach the API');
        $this->assertSame('BLOCK', $decision, 'BLOCK from the API must be honoured');
    }

    /**
     * C4-03 — POST-FIX STATE: configured + API returns ALLOW → real ALLOW
     * (distinct from the unconditional no-op: the network call DID happen).
     */
    public function testConfiguredEnforcementReachesAllowDecision(): void
    {
        $calls = new \stdClass();
        $calls->posted = false;

        $config = [
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            'trusteed/enforcement/hmac_secret'      => 'sekret',
        ];

        $client = new EnforcementClient(
            $this->makeScopeConfig($config),
            $this->makeCurl(200, '{"decision":"ALLOW"}', $calls),
            $this->createMock(LoggerInterface::class)
        );

        $decision = $client->evaluate($this->payload());

        $this->assertTrue($calls->posted, 'A configured installation must reach the API');
        $this->assertSame('ALLOW', $decision, 'ALLOW from the API must be honoured (real evaluation)');
    }
}
