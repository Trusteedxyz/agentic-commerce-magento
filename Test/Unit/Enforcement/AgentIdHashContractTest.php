<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\AgentIdHash;

/**
 * Task 43b (M2) — contrato del hash de identidad con el servidor.
 *
 * El servidor guarda y busca los fallos de checkout con
 * `hashAgentIdPerMerchant(agentId, merchantId)` = sha256(agentId . merchantId),
 * sin separador (`packages/shared/src/enforcement/agent-id-hash.ts`). Si el
 * módulo envía otro hash a `GET /checkout-failures/count`, el recuento de R011
 * sale siempre 0 con HTTP 200: la señal declarada miente.
 *
 * Los vectores se calcularon FUERA de este código, con la implementación del
 * servidor (node: `createHash("sha256").update(agentId + merchantId)`) y a
 * mano con `printf '%s' '<agentId><merchantId>' | sha256sum`.
 */
final class AgentIdHashContractTest extends TestCase
{
    /** @return array<string, array{string,string,string}> */
    public static function vectors(): array
    {
        return [
            'did:web + merchant_xyz' => [
                'did:web:agent.example.com',
                'merchant_xyz',
                'abffeb051103471661faea7945b0dc1d57a177cf29c15a52c8a72c274f001887',
            ],
            'otro agente y otra tienda' => [
                'did:web:agent.openai.com',
                'store-0001',
                '944c578277fc0196bd3c90646880f08c80de7c6a3d039e95203930910dba1a59',
            ],
        ];
    }

    /** @dataProvider vectors */
    public function testMatchesTheServerVector(string $did, string $merchant, string $expected): void
    {
        self::assertSame($expected, AgentIdHash::perMerchant($did, $merchant));
    }

    public function testIsNotTheBareDidHashTheModuleSentBefore(): void
    {
        // sha256("did:web:agent.example.com") — lo que enviaba 1.3.5 y no casa con ninguna fila.
        self::assertNotSame(
            '0523505d32d555754483b4729a8e67af4b9eaa5e1b8dd993e47b7fca4c0202df',
            AgentIdHash::perMerchant('did:web:agent.example.com', 'merchant_xyz')
        );
    }

    public function testTheMerchantChangesTheHash(): void
    {
        self::assertNotSame(
            AgentIdHash::perMerchant('did:web:agent.example.com', 'merchant_a'),
            AgentIdHash::perMerchant('did:web:agent.example.com', 'merchant_b')
        );
    }

    public function testOrderIsAgentThenMerchantWithoutSeparator(): void
    {
        self::assertSame(hash('sha256', 'ab'), AgentIdHash::perMerchant('a', 'b'));
        self::assertNotSame(AgentIdHash::perMerchant('a', 'b'), AgentIdHash::perMerchant('b', 'a'));
        self::assertNotSame(hash('sha256', 'a|b'), AgentIdHash::perMerchant('a', 'b'));
    }

    /**
     * Cuando el módulo vive dentro del monorrepo, lee la implementación del
     * servidor y falla si deja de ser sha256(agentId . merchantId): el vector
     * de arriba protege al módulo y esta lectura protege del cambio del lado
     * del servidor. Fuera del monorrepo (módulo distribuido) se omite.
     */
    public function testServerImplementationStillHashesAgentThenMerchant(): void
    {
        $src = dirname(__DIR__, 4) . '/shared/src/enforcement/agent-id-hash.ts';
        if (!is_file($src)) {
            self::markTestSkipped('fuente del servidor no disponible fuera del monorrepo');
        }
        $code = (string) file_get_contents($src);
        self::assertSame(1, preg_match(
            '/export function hashAgentIdPerMerchant\([^)]*\)[^{]*\{\s*return createHash\("sha256"\)\s*\.update\(`\$\{agentId\}\$\{merchantId\}`\)\s*\.digest\("hex"\)/s',
            $code
        ), 'el servidor cambió la fórmula del hash per-merchant: alinea AgentIdHash::perMerchant');
    }

    public function testObserverUsesTheContractHashForR011(): void
    {
        $src = (string) file_get_contents(dirname(__DIR__, 3) . '/Observer/CheckoutSubmitBefore.php');
        self::assertStringContainsString('failedCheckoutCount(AgentIdHash::perMerchant($agentDid, $merchantId), 300)', $src);
        self::assertStringNotContainsString("failedCheckoutCount(hash('sha256', \$agentDid)", $src);
    }
}
