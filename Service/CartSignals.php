<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

/**
 * B7 — Pure cart-signal detection for the Magento CEL observer.
 *
 * Mirror of `AgenticMCP_Cart_Signals` (WooCommerce) and
 * `PriceSnapVerifier` (PrestaShop). Mapping to Magento concepts:
 *   - stock      → `Stock\Item::getQty()` or `GetProductSalableQtyInterface`
 *   - giftcard   → product `type_id === "giftcard"` or `is_gift_card` custom attr
 *   - b2b        → billing company OR `extension_attributes.company_attributes.company_id`
 *   - subscription remains handled directly by CheckoutSubmitBefore (vendor-specific
 *     attrs: `aw_sarp2_*`, `is_subscription`, etc.) — already covered there
 *
 * The observer wraps Magento objects into primitive dicts and calls these
 * pure functions so the audit-flagged gaps can be unit-tested without a
 * Magento kernel.
 */
final class CartSignals
{
    public const PRICE_SNAP_VERSION = 'tps.v1';

    /**
     * @var string[] Multi-language PO-box prefixes (UTF-8 aware).
     * Audit docs/analysis/rules.md L228 — expanded coverage 2026-05-21:
     * en, es (ES/MX/AR/UY/CL/PY/CO), fr (FR/CH-FR/Africa), de, it (Vaticano CP),
     * pt (BR/PT), nl, ru (а/я), ja (私書箱), zh (邮政信箱).
     */
    private const PO_BOX_PATTERNS = [
        // English
        '/\b(p\.?\s*o\.?\s*box|post\s+office\s+box|postbox|po\s*-?\s*box)\b/iu',
        // Spanish (incl. Casilla PY/AR/UY/CL, Apartado aéreo CO)
        '/\b(apartado(\s+postal|\s+de\s+correos|\s+a[eé]reo)?|apdo\.?\s*(postal)?)\b/iu',
        '/\bcasilla(\s+(de\s+)?correo)?(\s+postal)?\b/iu',
        // French (Boîte/Boite/Case Postale, B.P. abbr)
        '/\b(bo[iî]te\s+postale|case\s+postale|b\.?p\.?)\b/iu',
        // German (Postfach + Postlagernd poste-restante)
        '/\b(postfach|postlagernd)\b/iu',
        // Italian (incl. abbr CP, Vaticano)
        '/\b(casella\s+postale|c\.p\.?)\b/iu',
        // Portuguese
        '/\bcaixa[\s-]?postal\b/iu',
        // Dutch
        '/\bpostbus\b/iu',
        // Russian
        '/(а\/я|абонентский\s+ящик)/iu',
        // Japanese
        '/私書箱/u',
        // Chinese
        '/(邮政信箱|郵政信箱)/u',
    ];

    /**
     * @var string[] Consumer freight forwarders (lower-case substring match).
     * Audit docs/analysis/rules.md L228 — expanded to cover local re-shipping
     * brands across US/EU/MENA/APAC 2026-05-21.
     */
    private const FREIGHT_FORWARDERS = [
        // Original
        'shipito', 'myus', 'stackry', 'planet express', 'reship',
        'borderlinx', 'usgobuy', 'shipforward', 'comgateway',
        // Audit expansion
        'us global mail', 'opas', 'skypax', 'forward2me',
        'bongo international', 'shop2ship', 'big apple buddy',
        'aramex shop', 'shop & ship',
        'reship.com', 'borderlinx.com',
    ];

    /** Magento gift-card product type id + common custom-attribute flags. */
    private const GIFT_CARD_TYPE_IDS  = ['giftcard'];
    private const GIFT_CARD_FLAG_KEYS = ['is_gift_card', 'amasty_gift_card_type'];

    // ─── R025 sensitive delivery address ────────────────────────────────────

    public static function detectPoBox(string $street): bool
    {
        $street = trim($street);
        if ($street === '') {
            return false;
        }
        foreach (self::PO_BOX_PATTERNS as $regex) {
            if (preg_match($regex, $street) === 1) {
                return true;
            }
        }
        return false;
    }

    public static function detectFreightForwarder(string $street, string $company): bool
    {
        $haystack = strtolower(trim($street . ' ' . $company));
        if ($haystack === '') {
            return false;
        }
        foreach (self::FREIGHT_FORWARDERS as $brand) {
            if (strpos($haystack, $brand) !== false) {
                return true;
            }
        }
        return false;
    }

    // ─── R016 stock confidence ───────────────────────────────────────────────

    /**
     * @param array<int, array{stock?: int|null}> $items
     */
    public static function lowestStock(array $items): ?int
    {
        $min = null;
        foreach ($items as $item) {
            $stock = $item['stock'] ?? null;
            if (!is_int($stock)) {
                continue;
            }
            if ($min === null || $stock < $min) {
                $min = $stock;
            }
        }
        return $min;
    }

    // ─── R027 stored value (gift cards) ──────────────────────────────────────

    /**
     * @param array<int, array<string,mixed>> $items
     */
    public static function storedValueCents(array $items): int
    {
        $total = 0;
        foreach ($items as $item) {
            if (!self::isStoredValue($item)) {
                continue;
            }
            $price = (int) ($item['price_cents'] ?? 0);
            $qty   = max(1, (int) ($item['qty'] ?? 1));
            $total += $price * $qty;
        }
        return $total;
    }

    /**
     * @param array<string,mixed> $item
     */
    private static function isStoredValue(array $item): bool
    {
        $typeId = strtolower((string) ($item['type_id'] ?? ''));
        if (in_array($typeId, self::GIFT_CARD_TYPE_IDS, true)) {
            return true;
        }
        foreach (self::GIFT_CARD_FLAG_KEYS as $key) {
            if (!empty($item[$key])) {
                return true;
            }
        }
        return false;
    }

    // ─── R028 B2B detection ──────────────────────────────────────────────────

    public static function isB2bOrder(string $company, ?int $companyId): bool
    {
        if (trim($company) !== '') {
            return true;
        }
        return $companyId !== null && $companyId > 0;
    }

    // ─── R015 price snapshot + delta ─────────────────────────────────────────

    /**
     * @param array<string,int> $current
     * @param array<string,int> $snapshot
     */
    public static function maxPriceDeltaBps(array $current, array $snapshot): int
    {
        $max = 0;
        foreach ($current as $pid => $cents) {
            $pidStr = (string) $pid;
            if (!isset($snapshot[$pidStr])) {
                continue;
            }
            $orig = (int) $snapshot[$pidStr];
            if ($orig <= 0) {
                continue;
            }
            $delta = (int) round(abs(((int) $cents) - $orig) / $orig * 10000);
            if ($delta > $max) {
                $max = $delta;
            }
        }
        return $max;
    }

    /**
     * @param array<string,int> $prices
     */
    public static function buildPriceSnapCookie(array $prices, string $hmacKeyHex): string
    {
        ksort($prices, SORT_STRING);
        $msg = self::canonicalPriceMessage($prices);
        $key = (string) @hex2bin($hmacKeyHex);
        $h   = hash_hmac('sha256', $msg, $key === '' ? $hmacKeyHex : $key);
        return base64_encode((string) json_encode(['v' => self::PRICE_SNAP_VERSION, 'p' => $prices, 'h' => $h]));
    }

    /**
     * @return array<string,int>
     */
    public static function verifyPriceSnap(string $cookieRaw, string $hmacKeyHex): array
    {
        if ($cookieRaw === '' || $hmacKeyHex === '') {
            return [];
        }
        $decoded = base64_decode($cookieRaw, true);
        if (!is_string($decoded) || $decoded === '') {
            return [];
        }
        $payload = json_decode($decoded, true);
        if (!is_array($payload) || ($payload['v'] ?? null) !== self::PRICE_SNAP_VERSION) {
            return [];
        }
        $prices = $payload['p'] ?? null;
        $hmac   = $payload['h'] ?? null;
        if (!is_array($prices) || !is_string($hmac) || $hmac === '') {
            return [];
        }
        $normalized = [];
        foreach ($prices as $pid => $cents) {
            $pidStr = (string) $pid;
            if ($pidStr === '' || (!is_int($cents) && !(is_string($cents) && ctype_digit($cents)))) {
                return [];
            }
            $value = (int) $cents;
            if ($value < 0) {
                return [];
            }
            $normalized[$pidStr] = $value;
        }
        $key = @hex2bin($hmacKeyHex);
        if ($key === false || $key === '') {
            return [];
        }
        $expected = hash_hmac('sha256', self::canonicalPriceMessage($normalized), $key);
        if (!hash_equals($expected, $hmac)) {
            return [];
        }
        return $normalized;
    }

    /**
     * @param array<string,int> $prices
     */
    public static function canonicalPriceMessage(array $prices): string
    {
        ksort($prices, SORT_STRING);
        $parts = [];
        foreach ($prices as $pid => $cents) {
            $parts[] = $pid . '=' . $cents;
        }
        return implode(',', $parts);
    }

    /**
     * B7b — extract per-merchant R015 HMAC key from a decoded snapshot's rules
     * array. Returns '' on any mismatch / absent field so the caller can
     * degrade R015 to PASS instead of trusting an unverifiable cookie.
     *
     * @param array<int, array<string,mixed>> $rules `payload.rules` from the JWS-decoded snapshot
     */
    public static function resolveR015HmacKey(array $rules): string
    {
        foreach ($rules as $rule) {
            if (!is_array($rule)) {
                continue;
            }
            $code = (string) ($rule['ruleCode'] ?? '');
            if ($code !== 'R015' && strpos($code, 'R015.') !== 0) {
                continue;
            }
            $params = $rule['params'] ?? [];
            if (is_array($params) && isset($params['priceSnapHmacKeyHex'])) {
                $key = (string) $params['priceSnapHmacKeyHex'];
                if ($key !== '') {
                    return $key;
                }
            }
        }
        return '';
    }

    // ─── R018 cart composition guard ─────────────────────────────────────────

    /**
     * Highest per-SKU quantity in the cart (R018 bulk-buy spike signal).
     *
     * @param array<int, array{qty?: int|null, id?: string|null}> $items
     */
    public static function maxQtyPerSku(array $items): int
    {
        $maxByPid = [];
        foreach ($items as $item) {
            $pid = (string) ($item['id'] ?? '');
            if ($pid === '') {
                continue;
            }
            $qty = max(1, (int) ($item['qty'] ?? 1));
            $maxByPid[$pid] = ($maxByPid[$pid] ?? 0) + $qty;
        }
        return $maxByPid === [] ? 0 : max($maxByPid);
    }

    /**
     * Compute basis-points delta of cart total vs merchant-avg-order baseline
     * for R018. Returns 0 when avg is non-positive or cart total is zero.
     */
    public static function cartTotalDeviationBps(int $cartTotalCents, int $merchantAvgOrderCents): int
    {
        if ($merchantAvgOrderCents <= 0 || $cartTotalCents <= 0) {
            return 0;
        }
        $diff = abs($cartTotalCents - $merchantAvgOrderCents);
        return (int) round($diff / $merchantAvgOrderCents * 10000);
    }

    // ─── R023 refund-abuse ratio ─────────────────────────────────────────────

    /**
     * Clamp refundCount/orderCount to a [0,1] float. Returns 0 when no history.
     */
    public static function refundRatio(int $refundCount, int $orderCount): float
    {
        if ($orderCount <= 0 || $refundCount <= 0) {
            return 0.0;
        }
        $r = $refundCount / $orderCount;
        if ($r < 0.0) {
            return 0.0;
        }
        if ($r > 1.0) {
            return 1.0;
        }
        return $r;
    }

    // ─── R022 payment-rail restriction ───────────────────────────────────────

    /**
     * R022 — extract the payment method code from a Magento order/quote.
     *
     * Magento exposes the chosen rail via `$order->getPayment()->getMethod()`
     * which returns strings such as `"checkmo"`, `"banktransfer"`,
     * `"stripe_payments"`, `"adyen_cc"`. The evaluator (`evaluateR022` in
     * `rule-catalog.ts`) lowercases its allow/block lists and uses substring
     * matching, so we normalise to lowercase here for parity.
     *
     * Fail-open semantics:
     *   - Order without a `getPayment()` accessor → null
     *   - Payment object without `getMethod()` accessor → null
     *   - Empty / whitespace method string → null
     *
     * Returning `null` makes the observer omit the `paymentMethod` field,
     * which causes `evaluateR022` to emit `NO_SIGNAL` rather than HIT.
     *
     * @param object|null $order Magento order or quote (duck-typed)
     */
    public static function extractPaymentMethod(?object $order): ?string
    {
        if ($order === null || !method_exists($order, 'getPayment')) {
            return null;
        }
        $payment = $order->getPayment();
        if ($payment === null || !method_exists($payment, 'getMethod')) {
            return null;
        }
        $raw = $payment->getMethod();
        if (!is_string($raw)) {
            return null;
        }
        $normalized = strtolower(trim($raw));
        return $normalized === '' ? null : $normalized;
    }

    // ─── T17 R005 revoked-agent projection ───────────────────────────────────

    /**
     * R005 — Pure helper: returns true when either the backend-flag lookup
     * marks the agent as revoked, or an upstream-injected cart attribute
     * declares revocation. Fail-open: null/unknown values yield false so a
     * connectivity blip never blocks a legitimate checkout.
     *
     * @param bool|null   $backendRevoked Result of the HMAC `/api/v1/agents/.../revoked` lookup.
     *                                    Pass `null` when the lookup is unavailable.
     * @param string|null $cartAttrStatus Optional `_agent_status` cart attribute
     *                                    (case-insensitive — only "revoked" matches).
     */
    public static function isAgentRevoked(?bool $backendRevoked, ?string $cartAttrStatus): bool
    {
        if ($backendRevoked === true) {
            return true;
        }
        if ($cartAttrStatus !== null && strtolower(trim($cartAttrStatus)) === 'revoked') {
            return true;
        }
        return false;
    }

    // ─── T17 R006 provider-confidence projection ─────────────────────────────

    /**
     * R006 — Extract `providerConfidence` claim from a decoded JWT payload.
     *
     * Accepts the float-typed claim (canonical) and tolerates string-encoded
     * floats from non-conformant token issuers. Values outside [0,1] are
     * dropped (fail-open: evaluator's NO_SIGNAL when attribute absent ≠ HIT).
     *
     * @param array<string,mixed>|null $payloadData Decoded JWT payload (or null).
     * @return string|null The confidence formatted as a fixed-precision string
     *                     ready for the cart-attribute map (e.g. "0.8500"),
     *                     or null when absent / out of range.
     */
    public static function extractProviderConfidence(?array $payloadData): ?string
    {
        if ($payloadData === null) {
            return null;
        }
        $raw = $payloadData['providerConfidence'] ?? null;
        if ($raw === null) {
            return null;
        }
        if (is_int($raw) || is_float($raw)) {
            $value = (float) $raw;
        } elseif (is_string($raw) && is_numeric($raw)) {
            $value = (float) $raw;
        } else {
            return null;
        }
        if ($value < 0.0 || $value > 1.0) {
            return null;
        }
        return number_format($value, 4, '.', '');
    }

    // ─── T17 R020 business-hours projection ──────────────────────────────────

    /**
     * R020 — Compute the merchant's local hour (0-23) using the configured
     * store timezone. Returns null when the timezone is empty / invalid so the
     * upstream evaluator degrades to NO_SIGNAL rather than minting a phantom
     * hour from the server's wall clock.
     *
     * @param string|null            $timezone IANA timezone id (e.g. "America/New_York").
     * @param \DateTimeInterface|null $now      Inject for deterministic tests; defaults to now().
     */
    public static function computeMerchantLocalHour(
        ?string $timezone,
        ?\DateTimeInterface $now = null
    ): ?int {
        if ($timezone === null || trim($timezone) === '') {
            return null;
        }
        try {
            $tz   = new \DateTimeZone($timezone);
            $when = $now !== null
                ? \DateTimeImmutable::createFromInterface($now)
                : new \DateTimeImmutable('now');
            $local = $when->setTimezone($tz);
            $hour  = (int) $local->format('G');
            if ($hour < 0 || $hour > 23) {
                return null;
            }
            return $hour;
        } catch (\Throwable $e) {
            return null;
        }
    }

    // ─── R008 scope normalisation ────────────────────────────────────────────

    /**
     * Accepts either:
     *   - OAuth space-delimited string ("a b c")
     *   - CSV string ("a,b,c")
     *   - already-parsed string[]
     *
     * @param string|array<int,string> $raw
     * @return string[]
     */
    public static function normalizeScopes(string|array $raw): array
    {
        if (is_array($raw)) {
            $out = [];
            foreach ($raw as $s) {
                $s = trim((string) $s);
                if ($s !== '') {
                    $out[] = $s;
                }
            }
            return $out;
        }
        $raw = trim($raw);
        if ($raw === '') {
            return [];
        }
        $sep = (strpos($raw, ',') !== false) ? ',' : ' ';
        $parts = array_map('trim', explode($sep, $raw));
        return array_values(array_filter($parts, static fn(string $s): bool => $s !== ''));
    }

    // ═════════════════════════════════════════════════════════════════════
    // Spec-048 Sprint E (T-E43, ADR-054) — Agentic Starter Kit signals.
    //   R032 (blocked-category) — Magento category lineage match.
    //   R034 (blocked-sku-list) — Product SKU Set lookup.
    //   R038 (max-items-per-order) — Σ quantities.
    //   R039 (max-quantity-per-sku) — per-line quantity max.
    //   R048 (no-digital-goods-for-agents) — virtual/downloadable/giftcard.
    //
    // R031 (kill-switch) + R042 (history) + R043 (HITL) live outside this class.
    //
    // Source mapping for Magento:
    //   - R032: Quote item → Product → categoryIds (Magento\Catalog\Model\Category)
    //   - R034: Quote item → Product->getSku() (canonical)
    //   - R048: Product->getTypeId() ∈ {"downloadable","virtual","giftcard"}
    //     (giftcard via existing GIFT_CARD_TYPE_IDS / GIFT_CARD_FLAG_KEYS)
    //
    // Items are wrapped by the observer into primitive dicts so these are
    // pure functions testable without a Magento kernel.
    // ═════════════════════════════════════════════════════════════════════

    /** Magento product type ids that map to "downloadable" digital good category. */
    private const DIGITAL_DOWNLOADABLE_TYPE_IDS = ['downloadable', 'virtual'];

    /**
     * R032 signal: returns true iff any cart item has a category id in $blocked.
     *
     * @param array<int,array<string,mixed>> $items each item: ['categoryIds' => string[]|int[]]
     * @param array<int,string|int> $blocked
     */
    public static function r032HasBlockedCategory(array $items, array $blocked): bool
    {
        if (empty($blocked)) {
            return false;
        }
        $blockedSet = [];
        foreach ($blocked as $b) {
            $key = (string) $b;
            if ($key !== '') {
                $blockedSet[$key] = true;
            }
        }
        if ($blockedSet === []) {
            return false;
        }
        foreach ($items as $item) {
            $cats = $item['categoryIds'] ?? [];
            if (!is_array($cats)) {
                continue;
            }
            foreach ($cats as $cat) {
                $key = (string) $cat;
                if ($key !== '' && isset($blockedSet[$key])) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * R034 signal: returns true iff any cart item SKU is in $blocked.
     * Magento canonical id is `sku` (not entity_id) — agents reference SKU.
     *
     * @param array<int,array<string,mixed>> $items each item: ['sku' => string]
     * @param string[] $blocked
     */
    public static function r034HasBlockedSku(array $items, array $blocked): bool
    {
        if (empty($blocked)) {
            return false;
        }
        $blockedSet = array_fill_keys(array_values(array_filter($blocked, 'is_string')), true);
        if ($blockedSet === []) {
            return false;
        }
        foreach ($items as $item) {
            $sku = $item['sku'] ?? '';
            if (is_string($sku) && $sku !== '' && isset($blockedSet[$sku])) {
                return true;
            }
        }
        return false;
    }

    /**
     * R038 signal: returns total item count Σ qty (negative-qty guard).
     *
     * @param array<int,array<string,mixed>> $items each item: ['quantity' => int|float]
     */
    public static function r038ItemCount(array $items): int
    {
        $count = 0;
        foreach ($items as $item) {
            $qty = (int) ($item['quantity'] ?? 0);
            if ($qty > 0) {
                $count += $qty;
            }
        }
        return $count;
    }

    /**
     * R039 signal: returns max per-line quantity (0 if cart empty).
     *
     * @param array<int,array<string,mixed>> $items
     */
    public static function r039MaxLineQuantity(array $items): int
    {
        $max = 0;
        foreach ($items as $item) {
            $qty = (int) ($item['quantity'] ?? 0);
            if ($qty > $max) {
                $max = $qty;
            }
        }
        return $max;
    }

    /**
     * R048 signal: returns comma-separated digital good types present in cart.
     *
     * Source mapping for Magento:
     *   - type_id === "downloadable" OR "virtual" → "downloadable"
     *   - type_id === "giftcard" OR is_gift_card flag set → "gift_card"
     *
     * @param array<int,array<string,mixed>> $items each item: ['type_id' => string, 'flags' => array<string,bool>]
     */
    public static function r048DigitalGoodTypes(array $items): string
    {
        $types = [];
        foreach ($items as $item) {
            $typeId = strtolower((string) ($item['type_id'] ?? ''));
            if (in_array($typeId, self::GIFT_CARD_TYPE_IDS, true)) {
                $types['gift_card'] = true;
                continue;
            }
            $flags = $item['flags'] ?? [];
            if (is_array($flags)) {
                foreach (self::GIFT_CARD_FLAG_KEYS as $key) {
                    if (!empty($flags[$key])) {
                        $types['gift_card'] = true;
                        break;
                    }
                }
                if (isset($types['gift_card'])) {
                    continue;
                }
            }
            if (in_array($typeId, self::DIGITAL_DOWNLOADABLE_TYPE_IDS, true)) {
                $types['downloadable'] = true;
            }
        }
        return implode(',', array_keys($types));
    }

    // ─── Sprint E.4 — Magento R035 / R036 instance evaluators ─────────────────
    //
    // Mirrors PrestaShop `evaluateR035` / `evaluateR036` in
    // `packages/prestashop-module-agenticmcpstores/src/Service/CartSignals.php`
    // and the canonical catalog in
    // `packages/shared/src/enforcement/rule-catalog.ts`.
    // Boundary inclusive (strict `>`). Missing `maxCents` → no-op PASS.

    /**
     * R035 (max-order-value) — HIT iff Quote grand total exceeds cap (cents).
     *
     * @param \Magento\Quote\Model\Quote $quote
     * @param array<string,mixed> $params expects ['maxCents' => int]
     * @return array{hit:bool,reason?:string}
     */
    public function evaluateR035(\Magento\Quote\Model\Quote $quote, array $params): array
    {
        if (!array_key_exists('maxCents', $params) || $params['maxCents'] === null) {
            return ['hit' => false];
        }
        $cap   = (int) $params['maxCents'];
        $total = (int) round(((float) $quote->getGrandTotal()) * 100);
        if ($total > $cap) {
            return [
                'hit'    => true,
                'reason' => "cart total {$total} exceeds cap {$cap}",
            ];
        }
        return ['hit' => false];
    }

    /**
     * R036 (max-line-item-value) — HIT iff any visible-item row-total
     * (with tax) exceeds cap (cents). Returns first offending line
     * (deterministic — matches catalog `lineItems.find` semantics).
     *
     * Line identifier preference: `item_id` (numeric) → fallback `sku`
     * → `?` sentinel.
     *
     * Verificación M7 (2026-07-28) — la clave del parámetro era `maxCents`,
     * copiada de R035. La canónica de R036 es `maxCentsPerLine`
     * (`rule-params.schemas.ts`, schema `.strict()`, y `r036?: { maxCentsPerLine }`
     * en `rule-catalog.ts`), así que el panel del comerciante NUNCA escribe
     * `maxCents` para esta regla: la comprobación de arriba fallaba siempre y
     * R036 era estructuralmente inerte en este módulo, configurara lo que
     * configurara el comerciante.
     *
     * @param \Magento\Quote\Model\Quote $quote
     * @param array<string,mixed> $params expects ['maxCentsPerLine' => int]
     * @return array{hit:bool,reason?:string}
     */
    public function evaluateR036(\Magento\Quote\Model\Quote $quote, array $params): array
    {
        if (!array_key_exists('maxCentsPerLine', $params) || $params['maxCentsPerLine'] === null) {
            return ['hit' => false];
        }
        $cap = (int) $params['maxCentsPerLine'];
        foreach ($quote->getAllVisibleItems() as $item) {
            $lineCents = (int) round(((float) $item->getRowTotalInclTax()) * 100);
            if ($lineCents > $cap) {
                $id = null;
                if (method_exists($item, 'getItemId')) {
                    $id = $item->getItemId();
                }
                if ($id === null && method_exists($item, 'getSku')) {
                    $id = $item->getSku();
                }
                $idStr = $id === null || $id === '' ? '?' : (string) $id;
                return [
                    'hit'    => true,
                    'reason' => "line {$idStr} value {$lineCents} exceeds cap {$cap}",
                ];
            }
        }
        return ['hit' => false];
    }
}
