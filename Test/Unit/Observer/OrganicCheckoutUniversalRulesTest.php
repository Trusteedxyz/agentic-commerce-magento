<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Observer;

use PHPUnit\Framework\TestCase;

/**
 * Merchant-wide policy rules (the ones that apply to every checkout, such as
 * R030) must also apply to a normal human (non-agentic) Magento checkout,
 * not just to agentic carts.
 *
 * The bug: CheckoutSubmitBefore::execute() used to `return` immediately with
 * the comment "Not an agent-initiated cart - skip enforcement" whenever no
 * agent DID was in the checkout session. It did so before ever calling
 * `EnforcementClient::evaluate()`, so a merchant's universal safety-valve
 * rules never applied to a real customer.
 *
 * `CheckoutSubmitBefore::execute()` depends on the live Magento kernel
 * (Magento\Quote\Model\Quote, CheckoutSession, ScopeConfigInterface, etc.)
 * and cannot be instantiated in this unit-test process. As with the
 * WooCommerce and PrestaShop equivalents, this test asserts the control flow
 * structurally against the real source. The substrings below must match the
 * source byte for byte.
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
        // The identity no longer comes only from the session (nothing wrote
        // it): it comes from the REST header with the session as fallback,
        // resolved in execute() and passed to buildEvaluationPayload(). What
        // this test protects is unchanged: the DID is resolved before the
        // context is built, with no `return` in between. The search starts
        // inside buildEvaluationPayload(), where the context is built (the same
        // line also exists in execute(), and measuring from there would pass
        // by coincidence).
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
     * This test used to accept persisting the DID as "verified" just because
     * it was non-empty (`if ($agentDid !== '')`), without looking at the
     * token. With header-based identity that would let anyone attribute orders
     * to someone else's DID. Now only a DID proven by a VALID token
     * (`$verifiedDid`) is persisted, and any other ALLOW clears it. The
     * behavior is exercised in CheckoutSubmitBeforeIdentityChannelTest; this
     * test only checks the shape of the code.
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
