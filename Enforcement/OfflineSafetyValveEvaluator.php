<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Offline safety-valve evaluator — local PHP port of the "universal merchant
 * policy" rule subset from `packages/shared/src/enforcement/rule-catalog.ts`
 * (R014-country-only, R018, R019, R020, R025, R027, R028, R029, R030).
 *
 * Why this exists: `CheckoutSubmitBefore` has ZERO local per-rule
 * evaluator — every ALLOW/BLOCK verdict comes from the single remote
 * `EnforcementClient::evaluate()` call. If that call fails (network error,
 * timeout, non-2xx), the merchant's own safety rules (max order amount,
 * blocked countries, business hours, PO-box block, gift-card cap...) never
 * get a chance to fire — `EnforcementClient::failClosedDecision()` falls
 * through to the blunt `failure_mode` policy (block everything / allow
 * everything) instead.
 *
 * This class is a FALLBACK, not a replacement: the remote evaluator stays
 * primary (it has richer history/DB signal for rules outside this subset).
 * This only runs when the remote call is unavailable, evaluating the last
 * `EnforcementClient::getRules()` snapshot (already request-cached) against
 * the current cart — pure functions, no network, no DB.
 *
 * CONFORMANCE: every method here MUST match the behavior of its TypeScript
 * counterpart in rule-catalog.ts EXACTLY, and the WooCommerce/PrestaShop
 * plugins' equivalents (same rule subset, mirrored independently). All are
 * tested against the same fixture: `packages/shared/src/enforcement/
 * __fixtures__/offline-safety-valve-conformance.json`. If you change one,
 * update the fixture and re-run all test suites before shipping.
 */
final class OfflineSafetyValveEvaluator
{
    private const DEFAULT_HIGH_RISK_COUNTRIES = ['KP', 'IR', 'SY', 'CU'];

    /**
     * Evaluate the offline-capable rule subset against a pulled snapshot's
     * rules array + the current cart. Returns the FIRST rule that blocks
     * (first-match-wins), or null when everything passes.
     *
     * @param array<int, array{ruleCode?: string, enabled?: bool, params?: array}> $rules
     * @param array{cartTotalCents?: int, itemCount?: int, billingCountry?: string, shippingCountry?: string, lineItems?: array} $orderContext
     * @param array<string, string> $cartAttributes
     * @return array{ruleCode: string, reason: string}|null
     */
    public static function evaluate(array $rules, array $orderContext, array $cartAttributes): ?array
    {
        $dispatch = [
            'R014' => 'evalR014',
            'R018' => 'evalR018',
            'R019' => 'evalR019',
            'R020' => 'evalR020',
            'R025' => 'evalR025',
            'R027' => 'evalR027',
            'R028' => 'evalR028',
            'R029' => 'evalR029',
            'R030' => 'evalR030',
        ];

        foreach ($rules as $rule) {
            if (!is_array($rule) || empty($rule['enabled'])) {
                continue;
            }
            $ruleCode = self::shortCode((string) ($rule['ruleCode'] ?? ''));
            if (!isset($dispatch[$ruleCode])) {
                continue;
            }
            $params = (array) ($rule['params'] ?? []);
            $method = $dispatch[$ruleCode];
            $reason = self::$method($params, $orderContext, $cartAttributes);
            if ($reason !== null) {
                return ['ruleCode' => $ruleCode, 'reason' => $reason];
            }
        }

        return null;
    }

    private static function shortCode(string $ruleCode): string
    {
        $dot = strpos($ruleCode, '.');
        return $dot === false ? $ruleCode : substr($ruleCode, 0, $dot);
    }

    private static function orderCountry(array $orderContext): ?string
    {
        return $orderContext['billingCountry'] ?? $orderContext['shippingCountry'] ?? null;
    }

    private static function attrBool(array $cartAttributes, string $key): bool
    {
        $v = $cartAttributes[$key] ?? null;
        return $v === 'true' || $v === '1';
    }

    private static function attrNumber(array $cartAttributes, string $key): ?float
    {
        if (!array_key_exists($key, $cartAttributes) || !is_numeric($cartAttributes[$key])) {
            return null;
        }
        return (float) $cartAttributes[$key];
    }

    // ── R014 (country dimension only — cancellation-history needs a DB lookup) ──

    private static function evalR014(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $highRisk = $params['highRiskCountries'] ?? self::DEFAULT_HIGH_RISK_COUNTRIES;
        $country = self::orderCountry($orderContext);
        if ($country !== null && in_array($country, $highRisk, true)) {
            return "delivery country {$country} is high-risk";
        }
        return null;
    }

    // ── R018 cart-composition-guard ──

    private static function evalR018(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $avg = $params['merchantAvgOrderCents'] ?? null;
        $mult = $params['spikeMultiplier'] ?? 5.0;
        $cartTotalCents = (int) ($orderContext['cartTotalCents'] ?? 0);

        if ($avg !== null && $avg > 0) {
            $spike = $cartTotalCents / $avg;
            if ($spike > $mult) {
                return sprintf('cart %d is %.1fx avg %d', $cartTotalCents, $spike, $avg);
            }
        }

        $maxItemCount = $params['maxItemCount'] ?? null;
        $itemCount = (int) ($orderContext['itemCount'] ?? 0);
        if ($maxItemCount !== null && $itemCount > $maxItemCount) {
            return "item count {$itemCount} > {$maxItemCount}";
        }

        $maxQty = $params['maxSingleSkuQty'] ?? null;
        if ($maxQty !== null) {
            foreach ((array) ($orderContext['lineItems'] ?? []) as $line) {
                if (((int) ($line['qty'] ?? 0)) > $maxQty) {
                    return "line item quantity exceeds {$maxQty}";
                }
            }
        }

        return null;
    }

    // ── R019 country-jurisdiction ──

    private static function evalR019(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $country = self::orderCountry($orderContext);
        if ($country === null) {
            return null;
        }
        $blocked = $params['blockedCountries'] ?? [];
        if (in_array($country, $blocked, true)) {
            return "country {$country} is blocked";
        }
        $allowed = $params['allowedCountries'] ?? [];
        if (!empty($allowed) && !in_array($country, $allowed, true)) {
            return "country {$country} is not allowed";
        }
        return null;
    }

    // ── R020 business-hours ──

    private static function evalR020(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $start = $params['startHour'] ?? null;
        $end = $params['endHour'] ?? null;
        if ($start === null || $end === null) {
            return null;
        }

        $hour = self::attrNumber($cartAttributes, '_merchant_local_hour');
        if ($hour === null) {
            $tz = $params['timezone'] ?? 'UTC';
            try {
                $now = new \DateTime('now', new \DateTimeZone((string) $tz));
                $hour = (int) $now->format('G');
            } catch (\Exception $e) {
                return null;
            }
        }

        $inside = $start <= $end
            ? ($hour >= $start && $hour < $end)
            : ($hour >= $start || $hour < $end);

        return $inside ? null : "local hour {$hour} outside {$start}-{$end}";
    }

    // ── R025 sensitive-delivery-address ──

    private static function evalR025(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $blockPoBox = $params['blockPoBox'] ?? true;
        if ($blockPoBox && self::attrBool($cartAttributes, '_shipping_po_box')) {
            return 'sensitive PO box delivery address';
        }
        $blockFreight = $params['blockFreightForwarder'] ?? true;
        if ($blockFreight && self::attrBool($cartAttributes, '_shipping_freight_forwarder')) {
            return 'freight-forwarder delivery address';
        }
        return null;
    }

    // ── R027 gift-card-stored-value ──

    private static function evalR027(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $raw = self::attrNumber($cartAttributes, '_stored_value_cents');
        if ($raw === null) {
            return null;
        }
        $max = $params['maxStoredValueCents'] ?? 0;
        return $raw > $max ? "stored value {$raw} > {$max}" : null;
    }

    // ── R028 b2b-po-guard ──

    private static function evalR028(array $params, array $orderContext, array $cartAttributes): ?string
    {
        if (isset($params['requirePurchaseOrder']) && $params['requirePurchaseOrder'] === false) {
            return null;
        }
        $isB2b = self::attrBool($cartAttributes, '_b2b_order');
        $hasPoHash = array_key_exists('_purchase_order_hash', $cartAttributes);
        return ($isB2b && !$hasPoHash) ? 'B2B purchase order evidence missing' : null;
    }

    // ── R029 merchant-preset ──

    private static function evalR029(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $preset = $params['preset'] ?? 'equilibrado';
        if ($preset === 'abierto') {
            return null;
        }
        if ($preset === 'regulado' && !self::attrBool($cartAttributes, '_regulated_evidence_present')) {
            return 'regulated preset requires additional merchant evidence';
        }
        if ($preset === 'estricto') {
            // Offline evaluator has no agent context (organic checkout by
            // definition here) — "estricto" REQUIRES a verified high-trust
            // agent by design, so this correctly HITs for every organic cart.
            return 'strict preset requires verified high-trust agent';
        }
        return null;
    }

    // ── R030 simple-controls ──

    private static function evalR030(array $params, array $orderContext, array $cartAttributes): ?string
    {
        $max = $params['maxAmountCents'] ?? null;
        $cartTotalCents = (int) ($orderContext['cartTotalCents'] ?? 0);
        if ($max !== null && $cartTotalCents > $max) {
            return "cart total {$cartTotalCents} > merchant max {$max}";
        }
        $country = self::orderCountry($orderContext);
        $allowed = $params['allowedCountries'] ?? [];
        if ($country !== null && !empty($allowed) && !in_array($country, $allowed, true)) {
            return "country {$country} is outside merchant controls";
        }
        return null;
    }
}
