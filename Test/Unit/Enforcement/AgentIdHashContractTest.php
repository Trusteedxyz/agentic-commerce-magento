<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\AgentIdHash;

/**
 * Contract of the identity hash with the server.
 *
 * The server stores and looks up checkout failures with
 * `hashAgentIdPerMerchant(agentId, merchantId)` = sha256(agentId . merchantId),
 * with no separator. If the module sends a different hash to
 * `GET /checkout-failures/count`, the R011 count is always 0 with HTTP 200:
 * the declared signal lies.
 *
 * The vectors were computed OUTSIDE this code, with the server implementation
 * (node: `createHash("sha256").update(agentId + merchantId)`) and by hand with
 * `printf '%s' '<agentId><merchantId>' | sha256sum`.
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
        // sha256("did:web:agent.example.com"): what an older release sent, which matches no row.
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

    public function testObserverUsesTheContractHashForR011(): void
    {
        $src = (string) file_get_contents(dirname(__DIR__, 3) . '/Observer/CheckoutSubmitBefore.php');
        self::assertStringContainsString('failedCheckoutCount(AgentIdHash::perMerchant($agentDid, $merchantId), 300)', $src);
        self::assertStringNotContainsString("failedCheckoutCount(hash('sha256', \$agentDid)", $src);
    }
}
