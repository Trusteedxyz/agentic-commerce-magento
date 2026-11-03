<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Service\EnforcementClient;

/**
 * A8 (auditoría spec-048 2026-09-27): un comprador humano nunca se bloquea por
 * una avería nuestra. Conductual sobre `EnforcementClient::evaluate()` real,
 * con un transporte de prueba que responde lo que diga cada caso: 503 (el
 * timeout del evaluador), 429, excepción de red, un `\Error` interno, un 2xx
 * ilegible y una URL rechazada por el guard SSRF.
 *
 * El `failure_mode` del comerciante sólo gobierna a los agénticos (agentId o
 * `endpointClass: agentic_endpoint`), y un modo que no es de este vocabulario
 * (enforce|observe) cierra al agente. Ese cierre por avería sale como
 * `DECISION_UNAVAILABLE` (fix ronda 1), nunca como `DECISION_BLOCK`, que queda
 * para las reglas (decisión del servidor o válvula offline).
 */
final class HumanCheckoutNotBlockedByOutageTest extends TestCase
{
    /**
     * @param array<string,string|null> $extra
     */
    private static function config(array $extra = []): ScopeConfigInterface
    {
        $values = array_merge([
            'trusteed_general/general/api_base_url' => 'https://api.trusteed.test',
            'trusteed/enforcement/installation_id'  => 'inst_abc',
            'trusteed/enforcement/hmac_secret'      => 'example-hmac-secret',
        ], $extra); // failure_mode ausente ⇒ 'enforce' por defecto

        return new class($values) implements ScopeConfigInterface {
            /** @param array<string,string|null> $values */
            public function __construct(private readonly array $values) {}
            public function getValue($path, $scopeType = 'default', $scopeCode = null)
            {
                return $this->values[$path] ?? null;
            }
            public function isSetFlag($path, $scopeType = 'default', $scopeCode = null)
            {
                return false;
            }
        };
    }

    /**
     * Transporte de prueba. `post()` responde $status/$body o lanza $throw;
     * `get()` sirve el snapshot firmado y el JWKS (o 503 si no hay snapshot).
     *
     * @param array{jws:string,jwks:string}|null $snapshot
     */
    private static function curl(int $status, string $body, ?\Throwable $throw = null, ?array $snapshot = null): Curl
    {
        return new class($status, $body, $throw, $snapshot) extends Curl {
            private string $lastGet = '';
            public function __construct(
                private readonly int $status,
                private readonly string $body,
                private readonly ?\Throwable $throw,
                private readonly ?array $snapshot
            ) {}
            public function setTimeout(int $seconds): void {}
            public function setOption($option, $value): void {}
            public function addHeader(string $name, string $value): void {}
            public function post(string $url, $body): void
            {
                $this->lastGet = '';
                if ($this->throw !== null) {
                    throw $this->throw;
                }
            }
            public function get(string $url): void
            {
                $this->lastGet = $url;
            }
            public function getStatus(): int
            {
                if ($this->lastGet === '') {
                    return $this->status;
                }
                return $this->snapshot === null ? 503 : 200;
            }
            public function getBody(): string
            {
                if ($this->lastGet === '') {
                    return $this->body;
                }
                if ($this->snapshot === null) {
                    return '';
                }
                return str_contains($this->lastGet, '.well-known/jwks.json')
                    ? $this->snapshot['jwks']
                    : $this->snapshot['jws'];
            }
        };
    }

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /** @return array{jws:string,jwks:string} */
    private static function signedSnapshot(array $rules): array
    {
        $keypair = sodium_crypto_sign_keypair();
        $header  = self::b64url((string) json_encode(['alg' => 'EdDSA', 'kid' => 'k1']));
        $body    = self::b64url((string) json_encode(['rules' => $rules, 'validUntil' => gmdate('Y-m-d\\TH:i:s\\Z', time() + 300)]));
        $sig     = self::b64url(sodium_crypto_sign_detached("{$header}.{$body}", sodium_crypto_sign_secretkey($keypair)));
        $jwks    = json_encode(['keys' => [[
            'kty' => 'OKP', 'crv' => 'Ed25519', 'kid' => 'k1',
            'x'   => self::b64url(sodium_crypto_sign_publickey($keypair)),
        ]]]);
        return ['jws' => "{$header}.{$body}.{$sig}", 'jwks' => (string) $jwks];
    }

    private function client(Curl $curl, array $config = []): EnforcementClient
    {
        return new EnforcementClient(self::config($config), $curl, $this->createMock(LoggerInterface::class));
    }

    private static function payload(?string $agentId, bool $agentic, int $totalCents = 5000): array
    {
        $base = [
            'merchantId' => 'merchant_xyz', 'agentId' => $agentId,
            'orderContext' => ['cartTotalCents' => $totalCents, 'currency' => 'EUR', 'itemCount' => 1],
            'platform' => 'MAGENTO', 'installationId' => 'inst_abc', 'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
        ];
        return $agentic ? array_merge($base, ['endpointClass' => 'agentic_endpoint']) : $base;
    }

    private const BLOCK_BODY = '{"decision":"BLOCK","reason":"evaluator timeout"}';

    public function testHumanIsAllowedWhenTheApiReturns503InEnforceMode(): void
    {
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(503, self::BLOCK_BODY))->evaluate(self::payload(null, false)));
    }

    public function testIdentifiedAgentStillBlocksOn503(): void
    {
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(503, self::BLOCK_BODY))->evaluate(self::payload('did:web:a.example', true)));
    }

    public function testAnonymousAgentStillBlocksOn503(): void
    {
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(503, self::BLOCK_BODY))->evaluate(self::payload(null, true)));
    }

    /** agentId sin endpointClass (llamadores antiguos) sigue contando como agente. */
    public function testAgentIdAloneCountsAsAgentic(): void
    {
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(503, ''))->evaluate(self::payload('did:web:a.example', false)));
    }

    public function testHumanIsAllowedOn429(): void
    {
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(429, ''))->evaluate(self::payload(null, false)));
    }

    public function testHumanIsAllowedOnANetworkException(): void
    {
        $curl = self::curl(0, '', new \RuntimeException('Connection timed out after 5000 ms'));
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client($curl)->evaluate(self::payload(null, false)));
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client($curl)->evaluate(self::payload(null, true)));
    }

    /** Un `\Error` nuestro (no `\Exception`) antes se escapaba y abortaba el checkout de cualquiera. */
    public function testHumanIsAllowedOnAnInternalError(): void
    {
        $curl = self::curl(0, '', new \TypeError('internal bug'));
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client($curl)->evaluate(self::payload(null, false)));
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client($curl)->evaluate(self::payload('did:web:a.example', true)));
    }

    /** Un 2xx ilegible es «no hay política legible»: humano pasa (como antes), agente según el modo. */
    public function testUnreadable2xxBodyAllowsHumanAndClosesAgentInEnforce(): void
    {
        $curl = self::curl(200, '<html>gateway</html>');
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client($curl)->evaluate(self::payload(null, false)));
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client($curl)->evaluate(self::payload(null, true)));
        self::assertSame(
            EnforcementClient::DECISION_ALLOW,
            $this->client($curl, ['trusteed/enforcement/failure_mode' => 'observe'])->evaluate(self::payload(null, true))
        );
    }

    public function testSsrfRejectedBaseUrlAllowsHumanAndClosesAgent(): void
    {
        $config = ['trusteed_general/general/api_base_url' => 'http://api.trusteed.test'];
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(200, '{"decision":"ALLOW"}'), $config)->evaluate(self::payload(null, false)));
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(200, '{"decision":"ALLOW"}'), $config)->evaluate(self::payload(null, true)));
    }

    public function testObserveModeOpensForAnAgent(): void
    {
        $config = ['trusteed/enforcement/failure_mode' => ' OBSERVE '];
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(503, ''), $config)->evaluate(self::payload('did:web:a.example', true)));
    }

    /** CARRY de la Task 1: un modo de otro vocabulario no abre aquí. */
    public function testForeignFailureModeClosesForAnAgentButNeverForAHuman(): void
    {
        foreach (['permissive', 'balanced', 'strict', 'unknown'] as $mode) {
            $config = ['trusteed/enforcement/failure_mode' => $mode];
            self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(503, ''), $config)->evaluate(self::payload(null, true)), 'agente con ' . $mode);
            self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(503, ''), $config)->evaluate(self::payload(null, false)), 'humano con ' . $mode);
        }
    }

    /** La regla ALL del comerciante (tope de R030) sigue valiendo offline para un humano: caso 2.1.1. */
    public function testMerchantAllRuleStillBlocksAHumanOffline(): void
    {
        $snapshot = self::signedSnapshot([
            ['ruleCode' => 'R030', 'enabled' => true, 'appliesTo' => 'ALL', 'params' => ['maxAmountCents' => 1000]],
        ]);
        $curl = self::curl(503, '', null, $snapshot);
        self::assertSame(
            EnforcementClient::DECISION_BLOCK,
            $this->client($curl, ['trusteed/enforcement/failure_mode' => 'observe'])->evaluate(self::payload(null, false, 5000))
        );
    }

    /** Una regla AGENT en la válvula ya no bloquea a un humano (antes R029 `estricto` lo hacía). */
    public function testAgentOnlyRuleInTheValveNoLongerBlocksAHuman(): void
    {
        $snapshot = self::signedSnapshot([
            ['ruleCode' => 'R029', 'enabled' => true, 'appliesTo' => 'AGENT', 'params' => ['preset' => 'estricto']],
        ]);
        $observe = ['trusteed/enforcement/failure_mode' => 'observe'];
        self::assertSame(
            EnforcementClient::DECISION_ALLOW,
            $this->client(self::curl(503, '', null, $snapshot), $observe)->evaluate(self::payload(null, false))
        );
        self::assertSame(
            EnforcementClient::DECISION_BLOCK,
            $this->client(self::curl(503, '', null, $snapshot), $observe)->evaluate(self::payload(null, true)),
            'al agente la válvula sí le aplica la regla AGENT'
        );
    }

    public function testServerDecisionsAreStillHonoured(): void
    {
        self::assertSame(EnforcementClient::DECISION_BLOCK, $this->client(self::curl(200, '{"decision":"BLOCK"}'))->evaluate(self::payload(null, false)));
        self::assertSame(EnforcementClient::DECISION_ALLOW, $this->client(self::curl(200, '{"decision":"ALLOW"}'))->evaluate(self::payload(null, true)));
    }

    /** Fix ronda 1 (IMPORTANT 3): ninguna avería devuelve DECISION_BLOCK, que es de las reglas. */
    public function testNoOutageCauseIsReportedAsARuleBlock(): void
    {
        $agent = self::payload('did:web:a.example', true);
        $cases = [
            '5xx'     => [self::curl(503, self::BLOCK_BODY), []],
            '429'     => [self::curl(429, ''), []],
            'timeout' => [self::curl(0, '', new \RuntimeException('Operation timed out')), []],
            'ssrf'    => [self::curl(200, '{"decision":"ALLOW"}'), ['trusteed_general/general/api_base_url' => 'http://api.trusteed.test']],
            '2xx'     => [self::curl(200, 'not json'), []],
        ];
        $run = 0;
        foreach ($cases as $cause => [$curl, $config]) {
            self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client($curl, $config)->evaluate($agent), (string) $cause);
            $run++;
        }
        $bad = array_merge($agent, ['orderContext' => ['currency' => "\xB1\xB1"]]);
        self::assertSame(EnforcementClient::DECISION_UNAVAILABLE, $this->client(self::curl(200, '{"decision":"ALLOW"}'))->evaluate($bad), 'json_encode');
        self::assertSame(5, $run);
    }
}
