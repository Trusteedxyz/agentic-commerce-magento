<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Spec-048 Sprint E.2 T-E45 — Magento R043 HITL Gate.
 *
 * Detects R043 HITL outcomes from /v1/rules/evaluate responses and is consumed
 * by the `sales_model_service_quote_submit_before` observer
 * ({@see \Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore}) to freeze the
 * quote (`is_active=0`) plus stamp custom flags from the freeze payload.
 *
 * Freeze semantics on Magento:
 *   - Quote.is_active = 0 → prevents customer-facing recapture.
 *   - Quote.trusteed_hitl_pending = 1 → set on the quote in the observer.
 *   - The observer additionally throws a LocalizedException so the order is NOT
 *     created while the intent is recorded as pending merchant approval.
 *   - When merchant approves via dashboard, quote is reactivated via the
 *     enforcement-hitl-receipt resolve path.
 *
 * Detection contract (matches buildHitlResponse in
 * packages/shared/src/enforcement/rule-evaluator.service.ts):
 *   - response.decision === 'BLOCK'
 *   - response.ucp.state === 'requires_escalation'
 *   - response.ucp.reason_code starts with 'trusteed:R043'
 *
 * Compuerta HITL R043 para Magento — congela quote.is_active=0 + flag pending.
 *
 * @since 1.6.0 (spec-048 Sprint E.2 T-E45)
 */
final class R043HitlGate
{
    public const R043_REASON_PREFIX = 'trusteed:R043';

    public const QUOTE_META_HITL_PENDING = 'trusteed_hitl_pending';
    public const QUOTE_META_RULE_CODE = 'trusteed_hitl_rule_code';
    public const QUOTE_META_REASON = 'trusteed_hitl_reason';
    public const QUOTE_META_EVALUATION_ID = 'trusteed_hitl_evaluation_id';

    /**
     * @param array<string,mixed>|object $response Decoded JSON from /v1/rules/evaluate.
     */
    public static function isHitlResponse($response): bool
    {
        $arr = self::asArray($response);
        if (!isset($arr['decision']) || $arr['decision'] !== 'BLOCK') {
            return false;
        }
        $ucp = self::asArray($arr['ucp'] ?? []);
        if (($ucp['state'] ?? '') !== 'requires_escalation') {
            return false;
        }
        $code = $ucp['reason_code'] ?? '';
        return is_string($code) && strncmp($code, self::R043_REASON_PREFIX, strlen(self::R043_REASON_PREFIX)) === 0;
    }

    /**
     * @param array<string,mixed>|object $response
     */
    public static function ruleCodeFrom($response): string
    {
        $arr = self::asArray($response);
        $ucp = self::asArray($arr['ucp'] ?? []);
        $code = (string) ($ucp['reason_code'] ?? '');
        return ($code !== '' && strncmp($code, 'trusteed:', 9) === 0) ? substr($code, 9) : '';
    }

    /**
     * Builds the patch dict the CheckoutSubmitBefore observer applies to the
     * quote when freezing it for R043 HITL review.
     *
     * @param array<string,mixed>|object $response
     * @return array{freeze:bool,is_active:int,rule_code:string,reason:string,evaluation_id:string}
     */
    public static function buildFreezePayload($response): array
    {
        $arr = self::asArray($response);
        $freeze = self::isHitlResponse($response);
        return [
            'freeze' => $freeze,
            'is_active' => $freeze ? 0 : 1,
            'rule_code' => self::ruleCodeFrom($response),
            'reason' => (string) ($arr['reason'] ?? ''),
            'evaluation_id' => (string) ($arr['evaluationId'] ?? ''),
        ];
    }

    /**
     * @param array<string,mixed> $freezePayload
     */
    public static function requiresFreeze(array $freezePayload): bool
    {
        return !empty($freezePayload['freeze']);
    }

    /**
     * @param mixed $v
     * @return array<string,mixed>
     */
    private static function asArray($v): array
    {
        if (is_object($v)) {
            return get_object_vars($v);
        }
        return is_array($v) ? $v : [];
    }
}
