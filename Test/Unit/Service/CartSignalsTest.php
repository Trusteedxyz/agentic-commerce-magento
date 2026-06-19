<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Service;

use Trusteed\AgenticCommerce\Service\CartSignals;
use PHPUnit\Framework\TestCase;
use Magento\Quote\Model\Quote;
use Magento\Quote\Model\Quote\Item;

require_once __DIR__ . '/../../../Service/CartSignals.php';
if (!interface_exists(\Magento\Framework\Event\ObserverInterface::class)) {
    require_once __DIR__ . '/../stubs/MagentoFrameworkStubs.php';
}

/**
 * B7 — Magento cart-signal detection for R015/R016/R025/R027/R028.
 *
 * Pure-function layer mirrors the WooCommerce `AgenticMCP_Cart_Signals` and
 * PrestaShop `PriceSnapVerifier` so cross-platform behavior stays aligned.
 */
final class CartSignalsTest extends TestCase
{
    // ── R025 PO box / freight forwarder ──────────────────────────────────────

    public function test_po_box_multi_language(): void
    {
        $this->assertTrue(CartSignals::detectPoBox('P.O. Box 47'));
        $this->assertTrue(CartSignals::detectPoBox('Apartado postal 9'));
        $this->assertTrue(CartSignals::detectPoBox('Boîte Postale 3'));
        $this->assertTrue(CartSignals::detectPoBox('Postfach 88'));
        $this->assertTrue(CartSignals::detectPoBox('Casella Postale 5'));
    }

    /** Audit `docs/analysis/rules.md` L228 — local PO-box formats. */
    public function test_po_box_local_audit_expansion(): void
    {
        // Spanish regional
        $this->assertTrue(CartSignals::detectPoBox('Casilla 1234'));         // PY/AR/UY/CL
        $this->assertTrue(CartSignals::detectPoBox('Apartado aéreo 50321')); // CO
        // French
        $this->assertTrue(CartSignals::detectPoBox('Case Postale 99'));      // CH-FR
        $this->assertTrue(CartSignals::detectPoBox('B.P. 42'));              // FR abbr
        // German poste-restante
        $this->assertTrue(CartSignals::detectPoBox('Postlagernd 9'));
        // Dutch
        $this->assertTrue(CartSignals::detectPoBox('Postbus 17'));
        // Russian abbr
        $this->assertTrue(CartSignals::detectPoBox('а/я 88'));
        // CJK
        $this->assertTrue(CartSignals::detectPoBox('私書箱 7'));
        $this->assertTrue(CartSignals::detectPoBox('邮政信箱 100'));
        // Freight forwarder audit expansion
        $this->assertTrue(CartSignals::detectFreightForwarder('1 Main', 'Forward2Me Ltd'));
        $this->assertTrue(CartSignals::detectFreightForwarder('99 Logistics', 'Aramex Shop & Ship'));
    }

    public function test_po_box_negatives(): void
    {
        $this->assertFalse(CartSignals::detectPoBox('123 Main Street'));
        $this->assertFalse(CartSignals::detectPoBox('Boxwood Lane 4'));
        $this->assertFalse(CartSignals::detectPoBox(''));
    }

    public function test_freight_forwarder_brand_match(): void
    {
        $this->assertTrue(CartSignals::detectFreightForwarder('123 Logistics Way', 'Shipito Inc'));
        $this->assertTrue(CartSignals::detectFreightForwarder('MyUS Suite 9 — 456 Oak', ''));
        $this->assertFalse(CartSignals::detectFreightForwarder('456 Elm St', 'Acme Corp'));
    }

    // ── R016 lowest stock ────────────────────────────────────────────────────

    public function test_lowest_stock_min_finite(): void
    {
        $this->assertSame(3, CartSignals::lowestStock([
            ['stock' => 50], ['stock' => 3], ['stock' => 17],
        ]));
    }

    public function test_lowest_stock_null_when_all_unmanaged(): void
    {
        $this->assertNull(CartSignals::lowestStock([['stock' => null], ['stock' => null]]));
        $this->assertNull(CartSignals::lowestStock([]));
    }

    public function test_lowest_stock_zero_meaningful(): void
    {
        $this->assertSame(0, CartSignals::lowestStock([['stock' => 5], ['stock' => 0]]));
    }

    // ── R027 stored value (Magento gift cards) ───────────────────────────────

    public function test_stored_value_giftcard_type_id(): void
    {
        $items = [
            ['type_id' => 'simple', 'price_cents' => 1500, 'qty' => 1],
            ['type_id' => 'giftcard', 'price_cents' => 5000, 'qty' => 2],
        ];
        $this->assertSame(10000, CartSignals::storedValueCents($items));
    }

    public function test_stored_value_via_custom_attribute(): void
    {
        $items = [
            ['type_id' => 'simple', 'price_cents' => 2500, 'qty' => 1, 'is_gift_card' => true],
        ];
        $this->assertSame(2500, CartSignals::storedValueCents($items));
    }

    public function test_stored_value_zero_when_absent(): void
    {
        $items = [['type_id' => 'simple', 'price_cents' => 1500, 'qty' => 2]];
        $this->assertSame(0, CartSignals::storedValueCents($items));
    }

    // ── R028 B2B ─────────────────────────────────────────────────────────────

    public function test_b2b_when_company_present(): void
    {
        $this->assertTrue(CartSignals::isB2bOrder('Acme Corp', null));
    }

    public function test_b2b_when_customer_company_id_set(): void
    {
        // Magento Commerce B2B: customer has `extension_attributes.company_attributes.company_id`.
        $this->assertTrue(CartSignals::isB2bOrder('', 42));
    }

    public function test_b2b_negatives(): void
    {
        $this->assertFalse(CartSignals::isB2bOrder('', null));
        $this->assertFalse(CartSignals::isB2bOrder('   ', 0));
    }

    // ── R015 price-delta ─────────────────────────────────────────────────────

    public function test_price_delta_bps_unchanged(): void
    {
        $this->assertSame(0, CartSignals::maxPriceDeltaBps(['1' => 100], ['1' => 100]));
    }

    public function test_price_delta_bps_picks_max(): void
    {
        $current  = ['1' => 100, '2' => 2700];
        $snapshot = ['1' => 100, '2' => 2500];
        $this->assertSame(800, CartSignals::maxPriceDeltaBps($current, $snapshot));
    }

    public function test_price_delta_bps_div_zero_safe(): void
    {
        $this->assertSame(0, CartSignals::maxPriceDeltaBps(['1' => 100], ['1' => 0]));
    }

    // ── R015 HMAC envelope (parity with WC + PS) ─────────────────────────────

    public function test_price_snap_round_trip(): void
    {
        $key   = bin2hex(random_bytes(32));
        $prices = ['100' => 1500, '200' => 2500];
        $cookie = CartSignals::buildPriceSnapCookie($prices, $key);
        $this->assertSame($prices, CartSignals::verifyPriceSnap($cookie, $key));
    }

    public function test_price_snap_rejects_tampered(): void
    {
        $key    = bin2hex(random_bytes(32));
        $cookie = CartSignals::buildPriceSnapCookie(['100' => 1500], $key);
        $decoded = json_decode((string) base64_decode($cookie, true), true);
        $decoded['p']['100'] = 1;
        $tampered = base64_encode((string) json_encode($decoded));
        $this->assertSame([], CartSignals::verifyPriceSnap($tampered, $key));
    }

    public function test_price_snap_rejects_legacy_unsigned(): void
    {
        $legacy = base64_encode((string) json_encode(['100' => 1500]));
        $this->assertSame([], CartSignals::verifyPriceSnap($legacy, bin2hex(random_bytes(32))));
    }

    public function test_canonical_message_byte_identical_to_ts_spec(): void
    {
        $this->assertSame('a=1,b=2,c=3', CartSignals::canonicalPriceMessage(['b' => 2, 'a' => 1, 'c' => 3]));
    }

    // ── B7b — resolveR015HmacKey from snapshot rules ─────────────────────────

    public function test_resolveR015HmacKey_returns_key_when_present_short_code(): void
    {
        $rules = [
            ['ruleCode' => 'R001', 'params' => []],
            ['ruleCode' => 'R015', 'params' => ['priceSnapHmacKeyHex' => 'aabbccdd']],
        ];
        $this->assertSame('aabbccdd', CartSignals::resolveR015HmacKey($rules));
    }

    public function test_resolveR015HmacKey_accepts_canonical_long_code(): void
    {
        $rules = [
            ['ruleCode' => 'R015.price-change-guard', 'params' => ['priceSnapHmacKeyHex' => 'eeff']],
        ];
        $this->assertSame('eeff', CartSignals::resolveR015HmacKey($rules));
    }

    public function test_resolveR015HmacKey_empty_when_rule_absent(): void
    {
        $rules = [['ruleCode' => 'R012', 'params' => []]];
        $this->assertSame('', CartSignals::resolveR015HmacKey($rules));
    }

    public function test_resolveR015HmacKey_empty_when_params_field_missing(): void
    {
        $rules = [['ruleCode' => 'R015']];
        $this->assertSame('', CartSignals::resolveR015HmacKey($rules));
    }

    public function test_resolveR015HmacKey_empty_when_key_is_empty_string(): void
    {
        $rules = [['ruleCode' => 'R015', 'params' => ['priceSnapHmacKeyHex' => '']]];
        $this->assertSame('', CartSignals::resolveR015HmacKey($rules));
    }

    public function test_resolveR015HmacKey_empty_on_malformed_rules_entries(): void
    {
        // Defensive: rule entries that aren't arrays must not crash the walk.
        $rules = ['not-an-array', null, ['ruleCode' => 'R015', 'params' => ['priceSnapHmacKeyHex' => 'aa']]];
        $this->assertSame('aa', CartSignals::resolveR015HmacKey($rules));
    }

    // ── R008 scope extraction ────────────────────────────────────────────────

    public function test_extract_scopes_space_delimited(): void
    {
        $this->assertSame(
            ['checkout:write', 'payment:read'],
            CartSignals::normalizeScopes('checkout:write payment:read')
        );
    }

    public function test_extract_scopes_csv(): void
    {
        $this->assertSame(
            ['a', 'b', 'c'],
            CartSignals::normalizeScopes('a,b, c')
        );
    }

    public function test_extract_scopes_empty_or_array(): void
    {
        $this->assertSame([], CartSignals::normalizeScopes(''));
        $this->assertSame(['x', 'y'], CartSignals::normalizeScopes(['x', 'y']));
    }

    // ── B7c R018 cart-composition guard ──────────────────────────────────────

    public function test_max_qty_per_sku_aggregates_duplicates(): void
    {
        $items = [
            ['id' => 'sku-a', 'qty' => 2],
            ['id' => 'sku-a', 'qty' => 3],
            ['id' => 'sku-b', 'qty' => 1],
        ];
        $this->assertSame(5, CartSignals::maxQtyPerSku($items));
    }

    public function test_max_qty_per_sku_handles_empty_and_missing_id(): void
    {
        $this->assertSame(0, CartSignals::maxQtyPerSku([]));
        $this->assertSame(0, CartSignals::maxQtyPerSku([['qty' => 5]]));
        $this->assertSame(1, CartSignals::maxQtyPerSku([['id' => 'x']]));
    }

    public function test_cart_total_deviation_bps(): void
    {
        // 10000 vs 5000 → +5000 → 10000 bps (100%)
        $this->assertSame(10000, CartSignals::cartTotalDeviationBps(10000, 5000));
        // 6000 vs 5000 → +1000 → 2000 bps (20%)
        $this->assertSame(2000, CartSignals::cartTotalDeviationBps(6000, 5000));
        // No baseline → no signal.
        $this->assertSame(0, CartSignals::cartTotalDeviationBps(10000, 0));
        // Empty cart → no signal.
        $this->assertSame(0, CartSignals::cartTotalDeviationBps(0, 5000));
    }

    // ── R022 payment-rail extraction ─────────────────────────────────────────

    public function test_extract_payment_method_lowercases_known_codes(): void
    {
        $orderStripe = new class {
            public function getPayment(): object
            {
                return new class {
                    public function getMethod(): string { return 'Stripe_Payments'; }
                };
            }
        };
        $this->assertSame('stripe_payments', CartSignals::extractPaymentMethod($orderStripe));

        $orderCheckmo = new class {
            public function getPayment(): object
            {
                return new class {
                    public function getMethod(): string { return '  CHECKMO  '; }
                };
            }
        };
        $this->assertSame('checkmo', CartSignals::extractPaymentMethod($orderCheckmo));
    }

    public function test_extract_payment_method_returns_null_when_no_payment(): void
    {
        // Null order
        $this->assertNull(CartSignals::extractPaymentMethod(null));

        // Order without getPayment()
        $orderNoPayment = new class { public function getId(): int { return 1; } };
        $this->assertNull(CartSignals::extractPaymentMethod($orderNoPayment));

        // Order whose getPayment() returns null (typical for pre-payment-step quote)
        $orderEmptyPayment = new class {
            public function getPayment(): mixed { return null; }
        };
        $this->assertNull(CartSignals::extractPaymentMethod($orderEmptyPayment));

        // Payment with no getMethod() accessor
        $orderBadPayment = new class {
            public function getPayment(): object
            {
                return new class { public function getCode(): string { return 'x'; } };
            }
        };
        $this->assertNull(CartSignals::extractPaymentMethod($orderBadPayment));

        // Payment whose getMethod() returns empty / whitespace
        $orderEmptyMethod = new class {
            public function getPayment(): object
            {
                return new class {
                    public function getMethod(): string { return '   '; }
                };
            }
        };
        $this->assertNull(CartSignals::extractPaymentMethod($orderEmptyMethod));
    }

    // ── B7c R023 refund ratio ────────────────────────────────────────────────

    public function test_refund_ratio_clamped(): void
    {
        $this->assertSame(0.0, CartSignals::refundRatio(0, 10));
        $this->assertSame(0.0, CartSignals::refundRatio(5, 0));
        $this->assertSame(0.5, CartSignals::refundRatio(5, 10));
        $this->assertSame(1.0, CartSignals::refundRatio(20, 10)); // upper clamp
    }

    // ── T17 R005 revoked-agent ───────────────────────────────────────────────

    public function test_revoked_agent_backend_flag(): void
    {
        $this->assertTrue(CartSignals::isAgentRevoked(true, null));
    }

    public function test_revoked_agent_cart_attr_match(): void
    {
        $this->assertTrue(CartSignals::isAgentRevoked(false, 'revoked'));
        $this->assertTrue(CartSignals::isAgentRevoked(null, '  REVOKED  '));
    }

    public function test_revoked_agent_negatives(): void
    {
        $this->assertFalse(CartSignals::isAgentRevoked(null, null));
        $this->assertFalse(CartSignals::isAgentRevoked(false, null));
        $this->assertFalse(CartSignals::isAgentRevoked(false, 'active'));
        $this->assertFalse(CartSignals::isAgentRevoked(false, ''));
    }

    // ── T17 R006 provider-confidence ─────────────────────────────────────────

    public function test_provider_confidence_float(): void
    {
        $this->assertSame('0.8500', CartSignals::extractProviderConfidence(['providerConfidence' => 0.85]));
    }

    public function test_provider_confidence_string_numeric(): void
    {
        $this->assertSame('0.5000', CartSignals::extractProviderConfidence(['providerConfidence' => '0.5']));
    }

    public function test_provider_confidence_zero_one_bounds(): void
    {
        $this->assertSame('0.0000', CartSignals::extractProviderConfidence(['providerConfidence' => 0]));
        $this->assertSame('1.0000', CartSignals::extractProviderConfidence(['providerConfidence' => 1]));
    }

    public function test_provider_confidence_rejects_out_of_range(): void
    {
        $this->assertNull(CartSignals::extractProviderConfidence(['providerConfidence' => -0.1]));
        $this->assertNull(CartSignals::extractProviderConfidence(['providerConfidence' => 1.5]));
    }

    public function test_provider_confidence_null_when_absent_or_invalid(): void
    {
        $this->assertNull(CartSignals::extractProviderConfidence(null));
        $this->assertNull(CartSignals::extractProviderConfidence([]));
        $this->assertNull(CartSignals::extractProviderConfidence(['providerConfidence' => 'hi']));
        $this->assertNull(CartSignals::extractProviderConfidence(['providerConfidence' => ['nested']]));
    }

    // ── T17 R020 merchant-local-hour ─────────────────────────────────────────

    public function test_merchant_local_hour_with_timezone(): void
    {
        // 2026-06-15T12:00:00Z → New York (UTC-4 DST) = 08:00.
        $fixed = new \DateTimeImmutable('2026-06-15T12:00:00+00:00');
        $this->assertSame(8, CartSignals::computeMerchantLocalHour('America/New_York', $fixed));
        // Same instant in Tokyo (UTC+9) = 21:00.
        $this->assertSame(21, CartSignals::computeMerchantLocalHour('Asia/Tokyo', $fixed));
        // UTC anchor.
        $this->assertSame(12, CartSignals::computeMerchantLocalHour('UTC', $fixed));
    }

    public function test_merchant_local_hour_null_when_tz_missing(): void
    {
        $this->assertNull(CartSignals::computeMerchantLocalHour(null));
        $this->assertNull(CartSignals::computeMerchantLocalHour(''));
        $this->assertNull(CartSignals::computeMerchantLocalHour('   '));
    }

    public function test_merchant_local_hour_null_on_invalid_tz(): void
    {
        $fixed = new \DateTimeImmutable('2026-06-15T12:00:00+00:00');
        $this->assertNull(CartSignals::computeMerchantLocalHour('Not/A_Real_Zone', $fixed));
    }

    // ─── Spec-048 Sprint E (T-E43) ──────────────────────────────────────────

    public function test_r032_blocked_category_hit(): void
    {
        $items = [
            ['categoryIds' => ['10', '20']],
            ['categoryIds' => ['30']],
        ];
        $this->assertTrue(CartSignals::r032HasBlockedCategory($items, ['20']));
        $this->assertTrue(CartSignals::r032HasBlockedCategory($items, [20])); // int coercion
    }

    public function test_r032_blocked_category_miss(): void
    {
        $items = [['categoryIds' => ['10']]];
        $this->assertFalse(CartSignals::r032HasBlockedCategory($items, ['99']));
        $this->assertFalse(CartSignals::r032HasBlockedCategory($items, []));
        $this->assertFalse(CartSignals::r032HasBlockedCategory([], ['10']));
    }

    public function test_r034_blocked_sku(): void
    {
        $items = [['sku' => 'SKU-A'], ['sku' => 'SKU-B']];
        $this->assertTrue(CartSignals::r034HasBlockedSku($items, ['SKU-B']));
        $this->assertFalse(CartSignals::r034HasBlockedSku($items, ['SKU-Z']));
        $this->assertFalse(CartSignals::r034HasBlockedSku($items, []));
        $this->assertFalse(CartSignals::r034HasBlockedSku([['sku' => '']], ['SKU-A']));
    }

    public function test_r038_item_count(): void
    {
        $this->assertSame(0, CartSignals::r038ItemCount([]));
        $this->assertSame(5, CartSignals::r038ItemCount([
            ['quantity' => 2],
            ['quantity' => 3],
        ]));
        // Negative-qty guard.
        $this->assertSame(2, CartSignals::r038ItemCount([
            ['quantity' => 2],
            ['quantity' => -10],
        ]));
    }

    public function test_r039_max_line_quantity(): void
    {
        $this->assertSame(0, CartSignals::r039MaxLineQuantity([]));
        $this->assertSame(7, CartSignals::r039MaxLineQuantity([
            ['quantity' => 3],
            ['quantity' => 7],
            ['quantity' => 1],
        ]));
    }

    public function test_r048_digital_goods_downloadable(): void
    {
        $items = [
            ['type_id' => 'downloadable', 'flags' => []],
            ['type_id' => 'simple', 'flags' => []],
        ];
        $this->assertSame('downloadable', CartSignals::r048DigitalGoodTypes($items));
    }

    public function test_r048_digital_goods_giftcard_via_type(): void
    {
        $items = [['type_id' => 'giftcard', 'flags' => []]];
        $this->assertSame('gift_card', CartSignals::r048DigitalGoodTypes($items));
    }

    public function test_r048_digital_goods_giftcard_via_flag(): void
    {
        $items = [['type_id' => 'simple', 'flags' => ['is_gift_card' => true]]];
        $this->assertSame('gift_card', CartSignals::r048DigitalGoodTypes($items));
    }

    public function test_r048_digital_goods_virtual_maps_to_downloadable(): void
    {
        $items = [['type_id' => 'virtual', 'flags' => []]];
        $this->assertSame('downloadable', CartSignals::r048DigitalGoodTypes($items));
    }

    public function test_r048_digital_goods_empty_when_physical(): void
    {
        $items = [['type_id' => 'simple', 'flags' => []]];
        $this->assertSame('', CartSignals::r048DigitalGoodTypes($items));
    }

    public function test_r048_digital_goods_mixed(): void
    {
        $items = [
            ['type_id' => 'downloadable', 'flags' => []],
            ['type_id' => 'giftcard', 'flags' => []],
        ];
        $out = CartSignals::r048DigitalGoodTypes($items);
        $this->assertStringContainsString('gift_card', $out);
        $this->assertStringContainsString('downloadable', $out);
    }

    // ── R035 max-order-value (Sprint E.4) ────────────────────────────────────

    public function test_r035_blocks_when_grand_total_exceeds_cap(): void
    {
        $signals = new CartSignals();
        $quote = new Quote();
        $quote->grandTotal = 150.00; // 15000 cents
        $result = $signals->evaluateR035($quote, ['maxCents' => 10000]);
        $this->assertTrue($result['hit']);
        $this->assertSame('cart total 15000 exceeds cap 10000', $result['reason']);
    }

    public function test_r035_passes_when_grand_total_equals_cap(): void
    {
        $signals = new CartSignals();
        $quote = new Quote();
        $quote->grandTotal = 100.00; // 10000 cents (boundary, strict >)
        $result = $signals->evaluateR035($quote, ['maxCents' => 10000]);
        $this->assertFalse($result['hit']);
    }

    public function test_r035_passes_when_max_cents_missing(): void
    {
        $signals = new CartSignals();
        $quote = new Quote();
        $quote->grandTotal = 999999.0;
        $this->assertFalse($signals->evaluateR035($quote, [])['hit']);
        $this->assertFalse($signals->evaluateR035($quote, ['maxCents' => null])['hit']);
    }

    // ── R036 max-line-item-value (Sprint E.4) ────────────────────────────────

    public function test_r036_blocks_first_line_over_cap_with_item_id(): void
    {
        $signals = new CartSignals();
        $item1 = new Item();
        $item1->itemId = 42;
        $item1->rowTotalInclTax = 50.00; // 5000 cents (passes)
        $item2 = new Item();
        $item2->itemId = 77;
        $item2->rowTotalInclTax = 200.00; // 20000 cents (HIT)
        $quote = new Quote();
        $quote->visibleItems = [$item1, $item2];
        $result = $signals->evaluateR036($quote, ['maxCents' => 10000]);
        $this->assertTrue($result['hit']);
        $this->assertSame('line 77 value 20000 exceeds cap 10000', $result['reason']);
    }

    public function test_r036_passes_when_all_lines_under_cap(): void
    {
        $signals = new CartSignals();
        $item = new Item();
        $item->itemId = 1;
        $item->rowTotalInclTax = 10.00; // 1000 cents
        $quote = new Quote();
        $quote->visibleItems = [$item];
        $this->assertFalse($signals->evaluateR036($quote, ['maxCents' => 5000])['hit']);
    }

    public function test_r036_passes_when_max_cents_missing_or_cart_empty(): void
    {
        $signals = new CartSignals();
        $quote = new Quote();
        $quote->visibleItems = [];
        $this->assertFalse($signals->evaluateR036($quote, ['maxCents' => 100])['hit']);
        // Missing param with non-empty cart
        $item = new Item();
        $item->itemId = 9;
        $item->rowTotalInclTax = 9999.0;
        $quote->visibleItems = [$item];
        $this->assertFalse($signals->evaluateR036($quote, [])['hit']);
        $this->assertFalse($signals->evaluateR036($quote, ['maxCents' => null])['hit']);
    }
}
