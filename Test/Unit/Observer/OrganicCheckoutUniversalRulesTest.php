<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use PHPUnit\Framework\TestCase;

/**
 * App Store remediation (2026-07-11) — R030 (and every other merchant-wide
 * "appliesTo:ALL" policy rule: R014/R018/R019/R020/R025/R027) must apply to
 * a normal human (non-agentic) Magento checkout, not just agentic carts.
 *
 * Root cause fixed in CheckoutSubmitBefore::execute(): the method used to
 * `return` immediately with the comment "Not an agent-initiated cart — skip
 * enforcement" whenever no agent DID was in the checkout session — before
 * ever calling `EnforcementClient::evaluate()` — so a merchant's universal
 * safety-valve rules never applied to a real customer.
 *
 * `CheckoutSubmitBefore::execute()` depends on the live Magento kernel
 * (Magento\Quote\Model\Quote, CheckoutSession, ScopeConfigInterface, etc.)
 * and cannot be instantiated in this unit-test process. Following the same
 * established pattern used for the WooCommerce and PrestaShop equivalents
 * of this fix, this test asserts the control-flow structurally against the
 * real source. Every substring below was verified byte-for-byte against the
 * real file (`grep`/`sed -n '<line>p' | cat -A`) before being written here.
 */
final class OrganicCheckoutUniversalRulesTest extends TestCase
{
    private function observerSource(): string
    {
        $src = file_get_contents(
            __DIR__ . '/../../../Observer/CheckoutSubmitBefore.php'
        );
        $this->assertIsString($src);
        return $src;
    }

    public function testNoAgentEarlyReturnIsGone(): void
    {
        $src = $this->observerSource();
        $this->assertStringNotContainsString(
            'Not an agent-initiated cart — skip enforcement',
            $src,
            'execute() must no longer skip enforcement entirely for non-agent carts'
        );
    }

    public function testAgentDidResolutionPrecedesOrderContextBuild(): void
    {
        $src = $this->observerSource();
        // La identidad ya no sale sólo de la sesión (que nadie escribía, C2):
        // cabecera REST con la sesión de respaldo, resuelta en execute() y
        // pasada a buildEvaluationPayload(). Lo que el test protege —que se
        // resuelve antes de construir el contexto y sin `return` entre medias—
        // no cambia; se busca dentro de buildEvaluationPayload(), donde vive
        // ahora la construcción del contexto (la misma línea existe también en
        // execute(), y medir desde allí pasaría por coincidencia).
        $bodyPos = strpos($src, 'private function buildEvaluationPayload(');
        $this->assertNotFalse($bodyPos);
        $agentDidPos = strpos($src, "\$agentDid = \$identity['did'];", $bodyPos);
        $buildContextPos = strpos($src, '$orderContext = $this->buildOrderContext($quote);', $bodyPos);
        $this->assertNotFalse($agentDidPos);
        $this->assertNotFalse($buildContextPos);
        $this->assertLessThan(
            $buildContextPos,
            $agentDidPos,
            'agentDid must still be resolved before orderContext is built, but no early return may sit between them'
        );

        $between = substr($src, $agentDidPos, $buildContextPos - $agentDidPos);
        $this->assertStringNotContainsString('return;', $between);
    }

    public function testPayloadSendsNullNotEmptyStringForAgentId(): void
    {
        $src = $this->observerSource();
        $this->assertStringContainsString(
            "'agentId'        => \$agentDid !== '' ? \$agentDid : null,",
            $src,
            'an organic checkout must send JSON null, not an empty-string DID (AgentDidSchema would reject it)'
        );
    }

    /**
     * Fix ronda 1 (IMPORTANT 1): este test antes fijaba que el DID se
     * persistía como «verificado» con sólo no estar vacío (`if ($agentDid !==
     * '')`), sin mirar el token — con las cabeceras eso deja a cualquiera
     * atribuir pedidos a un DID ajeno. Ahora sólo persiste el DID que prueba un
     * token VÁLIDO (`$verifiedDid`), y cualquier otro ALLOW lo borra. La conducta
     * se ejerce en CheckoutSubmitBeforeIdentityChannelTest; aquí sólo la forma.
     */
    public function testVerifiedDidPersistOnlyWhenProvenByAValidToken(): void
    {
        $src = $this->observerSource();
        $this->assertStringNotContainsString('SESSION_VERIFIED_AGENT_DID, $agentDid);', $src);
        $set = strpos($src, 'setData(self::SESSION_VERIFIED_AGENT_DID, $verifiedDid);');
        $this->assertNotFalse($set);
        $guard = strrpos(substr($src, 0, $set), "if (\$verifiedDid !== '') {");
        $this->assertNotFalse($guard);
        $this->assertLessThan(120, $set - $guard, 'the guard must directly wrap the setData call');
        $this->assertStringContainsString(
            "} else {\n            \$this->checkoutSession->unsetData(self::SESSION_VERIFIED_AGENT_DID);",
            substr($src, $set, 200),
            'an ALLOW without a proven DID clears it'
        );
    }
}
