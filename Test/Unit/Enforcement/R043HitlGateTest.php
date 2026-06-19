<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use Trusteed\AgenticCommerce\Enforcement\R043HitlGate;
use PHPUnit\Framework\TestCase;

/**
 * Spec-048 Sprint E.2 T-E45 — R043 HITL Gate (Magento).
 */
final class R043HitlGateTest extends TestCase
{
    public function testDetectsCanonicalHitlResponse(): void
    {
        $resp = [
            'decision' => 'BLOCK',
            'ucp' => [
                'state' => 'requires_escalation',
                'reason_code' => 'trusteed:R043.agent-checkout-approval-required',
            ],
        ];
        self::assertTrue(R043HitlGate::isHitlResponse($resp));
    }

    public function testRejectsPlainBlock(): void
    {
        $resp = ['decision' => 'BLOCK', 'ucp' => ['state' => 'failed', 'reason_code' => 'trusteed:R001']];
        self::assertFalse(R043HitlGate::isHitlResponse($resp));
    }

    public function testRejectsAllowEvenWithEscalation(): void
    {
        $resp = ['decision' => 'ALLOW', 'ucp' => ['state' => 'requires_escalation', 'reason_code' => 'trusteed:R043']];
        self::assertFalse(R043HitlGate::isHitlResponse($resp));
    }

    public function testRejectsOtherRuleCodes(): void
    {
        $resp = ['decision' => 'BLOCK', 'ucp' => ['state' => 'requires_escalation', 'reason_code' => 'trusteed:R031']];
        self::assertFalse(R043HitlGate::isHitlResponse($resp));
    }

    public function testRuleCodeFromStripsPrefix(): void
    {
        $resp = ['ucp' => ['reason_code' => 'trusteed:R043.agent-checkout-approval-required']];
        self::assertSame('R043.agent-checkout-approval-required', R043HitlGate::ruleCodeFrom($resp));
    }

    public function testBuildFreezePayloadMarksIsActiveZero(): void
    {
        $resp = [
            'decision' => 'BLOCK',
            'reason' => 'agent checkout requires merchant approval',
            'evaluationId' => 'eval-mage-1',
            'ucp' => [
                'state' => 'requires_escalation',
                'reason_code' => 'trusteed:R043.agent-checkout-approval-required',
            ],
        ];
        $payload = R043HitlGate::buildFreezePayload($resp);
        self::assertTrue($payload['freeze']);
        self::assertSame(0, $payload['is_active']);
        self::assertSame('R043.agent-checkout-approval-required', $payload['rule_code']);
        self::assertSame('agent checkout requires merchant approval', $payload['reason']);
        self::assertSame('eval-mage-1', $payload['evaluation_id']);
        self::assertTrue(R043HitlGate::requiresFreeze($payload));
    }

    public function testBuildFreezePayloadKeepsIsActiveOneForAllow(): void
    {
        $payload = R043HitlGate::buildFreezePayload(['decision' => 'ALLOW']);
        self::assertFalse($payload['freeze']);
        self::assertSame(1, $payload['is_active']);
        self::assertFalse(R043HitlGate::requiresFreeze($payload));
    }
}
