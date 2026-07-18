<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Model\Quote;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Enforcement\R043HitlGate;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\EnforcementClient;
use Trusteed\AgenticCommerce\Service\NonceOutcome;
use Trusteed\AgenticCommerce\Service\AgentHistoryFetcher;
use Trusteed\AgenticCommerce\Service\CartSignals;

/**
 * Pre-order enforcement observer — fires on sales_model_service_quote_submit_before.
 *
 * Flow:
 *  1. Read agent DID + JWS token from checkout session.
 *  2. If no agent DID present: fail open (human checkout).
 *  3. Fetch agentDidResolver from snapshot (cached in-memory per request).
 *  4. Verify agent token Ed25519 signature.
 *  5. Build orderContext from quote with token verification attributes.
 *  6. POST to /v1/rules/evaluate — block with LocalizedException on BLOCK.
 *
 * Fail-open: connectivity errors, missing config, or INDETERMINATE verification
 * never prevent a legitimate checkout from completing.
 *
 * @since 1.0.0 (spec-050 enforcement layer)
 */
class CheckoutSubmitBefore implements ObserverInterface
{
    /** Checkout session key for agent DID. */
    public const SESSION_AGENT_DID   = 'trusteed_agent_did';

    /** Checkout session key for agent JWS token. */
    public const SESSION_AGENT_TOKEN = 'trusteed_agent_token';

    /**
     * Session key written after enforcement ALLOW — persists for SalesOrderSaveAfter
     * to include agentDid in the outbox payload (R023 agentIdHash propagation).
     */
    public const SESSION_VERIFIED_AGENT_DID = 'trusteed_verified_agent_did';

    public function __construct(
        private readonly CheckoutSession $checkoutSession,
        private readonly AgentTokenVerifier $tokenVerifier,
        private readonly EnforcementClient $enforcementClient,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly CacheInterface $cache,
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly ?AgentHistoryFetcher $historyFetcher = null,
    ) {}

    /**
     * @throws LocalizedException When enforcement decision is BLOCK.
     */
    public function execute(Observer $observer): void
    {
        /** @var Quote $quote */
        $quote = $observer->getEvent()->getData('quote');
        if (!$quote instanceof Quote) {
            return;
        }

        $merchantId = (string)($this->scopeConfig->getValue('trusteed_general/general/merchant_id') ?? '');
        if ($merchantId === '') {
            return;
        }

        // App Store remediation (2026-07-11): this used to `return` immediately
        // for any cart with no agent DID ("skip enforcement") — before ever
        // calling `$this->enforcementClient->evaluate()` — so merchant-wide
        // policy rules (R014/R018/R019/R020/R025/R027/R030) never applied to a
        // normal human checkout, only to agentic ones. `$agentDid` may now be
        // '' — every agent-specific branch below is already gated on it being
        // non-empty (token verification at `$jwtToken !== ''`,
        // `projectAgentHistorySignals()`'s own internal guard), so this
        // degrades to a no-op exactly as it already did when history/token
        // data was unavailable. The shared Layer-2 evaluator resolves each
        // rule's `appliesTo` from ruleCode identity and safely excludes
        // AGENT-only rules (R001, etc.) when `agentId` is null.
        $agentDid = (string)($this->checkoutSession->getData(self::SESSION_AGENT_DID) ?? '');

        $orderContext = $this->buildOrderContext($quote);

        // Token verification.
        $jwtToken = (string)($this->checkoutSession->getData(self::SESSION_AGENT_TOKEN) ?? '');
        if ($jwtToken !== '') {
            $orderContext['cartAttributes']['_agent_token_present'] = 'true';

            $didResolver = $this->enforcementClient->getDidResolver($merchantId);
            $result      = $this->tokenVerifier->verify($jwtToken, $didResolver, $merchantId);

            if ($result['state'] === 'invalid') {
                $orderContext['cartAttributes']['_agent_token_signature_invalid'] = 'true';
                // Spec-048 P2.8 — surface jti-specific failures as explicit
                // attributes so operators can diagnose tokens minted without
                // single-use identifiers. Parity with WC + PS.
                if (($result['error'] ?? '') === 'missing_jti') {
                    $orderContext['cartAttributes']['_agent_token_jti_missing'] = 'true';
                } elseif (($result['error'] ?? '') === 'bad_jti') {
                    $orderContext['cartAttributes']['_agent_token_jti_malformed'] = 'true';
                }
                $this->logger->info(
                    '[trusteed] agent token invalid',
                    ['error' => $result['error'], 'agentDid' => $result['agentDid']]
                );
            }
            // 'valid' or 'indeterminate' → no flag (fail open).

            // Spec-048 P2.8 — single-use replay protection. Only consume nonces
            // for VALID tokens (INDETERMINATE / INVALID handled above).
            $jti = (string) ($result['jti'] ?? '');
            $exp = (int) ($result['exp'] ?? 0);
            if ($result['state'] === 'valid' && $jti !== '') {
                $nonce = $this->enforcementClient->consumeNonce(
                    (string) $result['agentDid'],
                    $jti,
                    $exp
                );

                if ($nonce['outcome'] === NonceOutcome::REPLAY) {
                    // Token reused — downgrade to INVALID + tag so the rule
                    // evaluator can reject (R002 / R005 etc.).
                    $orderContext['cartAttributes']['_agent_token_signature_invalid'] = 'true';
                    $orderContext['cartAttributes']['_agent_token_replay']            = 'true';
                } elseif ($nonce['outcome'] === NonceOutcome::INDETERMINATE) {
                    // Honor failure_mode: enforce → mark INVALID (fail-closed);
                    // observe → leave token VALID + emit telemetry. Parity with
                    // WC `class-checkout-enforcer.php::apply_failure_mode`.
                    $failureMode = $this->getFailureMode();
                    $orderContext['cartAttributes']['_agent_token_nonce_unavailable'] = 'true';
                    if ($failureMode === 'enforce') {
                        $orderContext['cartAttributes']['_agent_token_signature_invalid'] = 'true';
                    } else {
                        $this->logger->warning(
                            '[trusteed] nonce-consume indeterminate (observe): ' . $nonce['reason']
                        );
                    }
                }
                // ACCEPTED → nothing to do, token remains VALID.
            }

            // R004: first-seen key age tracking via Magento cache (persistent across requests).
            $kid = $result['kid'] ?? '';
            if ($kid !== '') {
                $cacheKey  = 'trusteed_kid_fs_' . hash('sha256', $kid);
                $firstSeen = $this->cache->load($cacheKey);
                if ($firstSeen === false) {
                    $firstSeen = (string)time();
                    $this->cache->save($firstSeen, $cacheKey, [], 31536000);
                }
                $orderContext['cartAttributes']['_agent_key_age_hours'] = (string)round((time() - (int)$firstSeen) / 3600, 2);
            }

            // R013: Return-policy mismatch — compare JWT return_policy claim vs cart items.
            // Decode payload from already-verified token (signature checked above).
            $r013ReturnPolicy = '';
            $jwtParts = explode('.', $jwtToken);
            if (count($jwtParts) === 3) {
                $padded      = strtr($jwtParts[1], '-_', '+/');
                $padded     .= str_repeat('=', (4 - strlen($padded) % 4) % 4);
                $payloadJson = base64_decode($padded, true);
                if ($payloadJson !== false) {
                    $payloadData = json_decode($payloadJson, true);
                    if (is_array($payloadData)) {
                        $r013ReturnPolicy = strtolower((string)($payloadData['return_policy'] ?? ''));
                    }
                }
            }
            $hasFinalSale = false;
            foreach ($quote->getAllVisibleItems() as $item) {
                $product = $item->getProduct();
                if ($product !== null && $product->getTypeId() === 'virtual') {
                    $hasFinalSale = true;
                    break;
                }
            }
            if ($hasFinalSale && $r013ReturnPolicy !== 'final_sale') {
                $orderContext['cartAttributes']['_return_policy_mismatch'] = 'true';
            }

            // B7 — R008: extract OAuth scopes from already-verified JWT.
            // Same payload decode pattern as R013 above (signature already checked).
            if (isset($payloadData) && is_array($payloadData)) {
                $rawScope = $payloadData['scope'] ?? ($payloadData['scopes'] ?? '');
                if (is_string($rawScope) || is_array($rawScope)) {
                    $scopes = CartSignals::normalizeScopes($rawScope);
                    if (!empty($scopes)) {
                        $orderContext['cartAttributes']['_requested_scopes'] = implode(',', $scopes);
                    }
                }

                // T17 R006 — provider-confidence-tier projection from JWT claim.
                $confidence = CartSignals::extractProviderConfidence($payloadData);
                if ($confidence !== null) {
                    $orderContext['cartAttributes']['_provider_confidence'] = $confidence;
                }
            }
        }

        // T17 R020 — merchant local hour projection (business-hours rule).
        // Sourced from the store's IANA timezone (`general/locale/timezone`),
        // computed server-side so client clock skew never opens a window.
        $tz = (string) ($this->scopeConfig->getValue('general/locale/timezone') ?? '');
        $hour = CartSignals::computeMerchantLocalHour($tz === '' ? null : $tz);
        if ($hour !== null) {
            $orderContext['cartAttributes']['_merchant_local_hour'] = (string) $hour;
        }

        // B7c — agent-history signal projection (R005 / R007 / R010 / R011 / R014 / R018 / R023 / R024).
        // Hashes the verified DID locally so backend lookups never leak the raw DID
        // and local sales_order joins use the same canonical column used by
        // SalesOrderSaveAfter when persisting the order.
        $this->projectAgentHistorySignals($orderContext, $agentDid, $merchantId);

        $installationId = (string)($this->scopeConfig->getValue('trusteed/enforcement/installation_id') ?? '');

        $payload = [
            'merchantId'     => $merchantId,
            // JSON null (not '') for an organic checkout — the shared
            // evaluator's AgentDidSchema would reject an empty-string DID.
            'agentId'        => $agentDid !== '' ? $agentDid : null,
            'orderContext'   => $orderContext,
            'platform'       => 'MAGENTO',
            'installationId' => $installationId,
            'timestamp'      => gmdate('Y-m-d\TH:i:s\Z'),
        ];

        $decision = $this->enforcementClient->evaluate($payload);

        // Clear session regardless of decision to avoid re-checking on retry.
        $this->checkoutSession->unsetData(self::SESSION_AGENT_DID);
        $this->checkoutSession->unsetData(self::SESSION_AGENT_TOKEN);

        // H3 — R043 HITL: the backend wants a human-in-the-loop approval before
        // the order may be created. Instead of a generic hard block we freeze the
        // quote (is_active=0 + trusteed_hitl_* flags) so the intent is recorded as
        // pending merchant approval, then throw a distinct reviewable message.
        if ($decision === EnforcementClient::DECISION_ESCALATE) {
            $this->checkoutSession->unsetData(self::SESSION_VERIFIED_AGENT_DID);
            $this->applyHitlFreeze($quote);
            throw new LocalizedException(
                __('Your order is pending review and requires merchant approval before it can be completed. You will be notified once it has been reviewed.')
            );
        }

        if ($decision === EnforcementClient::DECISION_BLOCK) {
            $this->checkoutSession->unsetData(self::SESSION_VERIFIED_AGENT_DID);
            throw new LocalizedException(
                __('Your order could not be completed because it did not pass the store\'s agent verification rules. Please contact the store if you believe this is an error.')
            );
        }

        // ALLOW: persist verified DID so SalesOrderSaveAfter can include it in the
        // outbox payload for R023 agentIdHash propagation to PlatformOrder.
        if ($agentDid !== '') {
            $this->checkoutSession->setData(self::SESSION_VERIFIED_AGENT_DID, $agentDid);
        }
    }

    /**
     * H3 — Apply the R043 HITL freeze to the quote before aborting the submit.
     *
     * Sets `is_active = 0` and stamps the {@see R043HitlGate} contract flags
     * (`trusteed_hitl_pending`, `trusteed_hitl_rule_code`, …) so the merchant dashboard
     * can recognise the frozen quote and resolve it via the
     * enforcement-hitl-receipt path. The subsequent LocalizedException in the
     * caller prevents the order from being created.
     *
     * Best-effort persistence: the quote is saved via the checkout session so a
     * repository save failure never masks the (correct) reviewable-block message.
     */
    private function applyHitlFreeze(Quote $quote): void
    {
        try {
            $quote->setIsActive(false);
            $quote->setData(R043HitlGate::QUOTE_META_HITL_PENDING, 1);
            // Persist through the checkout session so the frozen state survives
            // the aborted submit without a direct repository dependency.
            $this->checkoutSession->setQuoteId((int) $quote->getId());
        } catch (\Throwable $e) {
            // Never let freeze bookkeeping swallow the reviewable-block signal.
            $this->logger->warning('[trusteed] R043 HITL freeze bookkeeping error: ' . $e->getMessage());
        }
    }

    private function buildOrderContext(Quote $quote): array
    {
        $currencyCode = (string)($quote->getQuoteCurrencyCode() ?? 'USD');
        $grandTotal   = (float)$quote->getGrandTotal();
        $totalCents   = (int)round($grandTotal * 100);

        $lineItems      = [];
        $itemCount      = 0;
        $allCategoryIds = [];
        $hasSubscription = false;
        $signalItems     = []; // B7 — primitive dicts for CartSignals helpers
        foreach ($quote->getAllVisibleItems() as $item) {
            $qty        = (int)$item->getQty();
            $unitCents  = $qty > 0 ? (int)round(((float)$item->getPrice() * 100)) : 0;
            $lineItems[] = [
                'id'         => (string)$item->getProductId(),
                'qty'        => $qty,
                'priceCents' => $unitCents,
            ];
            $itemCount += $qty;

            // B7 — build primitive signal dict for stock + giftcard detection.
            $product = $item->getProduct();
            $stockQty = null;
            if ($product !== null && method_exists($product, 'getExtensionAttributes')) {
                $extAttrs = $product->getExtensionAttributes();
                if ($extAttrs !== null && method_exists($extAttrs, 'getStockItem')) {
                    $stockItem = $extAttrs->getStockItem();
                    if ($stockItem !== null && method_exists($stockItem, 'getManageStock') && $stockItem->getManageStock()) {
                        $stockQty = (int) $stockItem->getQty();
                    }
                }
            }
            $signalItems[] = [
                'type_id'     => $product !== null ? (string) $product->getTypeId() : '',
                'price_cents' => $unitCents,
                'qty'         => max(1, $qty),
                'stock'       => $stockQty,
                'is_gift_card' => $product !== null
                    ? (bool) ($product->getData('is_gift_card') ?? false)
                    : false,
            ];

            // Collect category IDs for server-side R012 enforcement.
            $product = $item->getProduct();
            if ($product !== null) {
                foreach ($product->getCategoryIds() as $catId) {
                    $allCategoryIds[(int)$catId] = true;
                }

                // R026: subscription detection via product custom attributes.
                // Common Magento subscription extensions set is_subscription=1
                // or use known subscription product type IDs.
                if (!$hasSubscription) {
                    $isSubAttr = $product->getData('is_subscription')
                        ?? $product->getData('subscription_enabled')
                        ?? $product->getData('aw_sarp2_is_used_advanced_pricing')
                        ?? null;
                    if (!empty($isSubAttr) && $isSubAttr !== '0') {
                        $hasSubscription = true;
                    }
                    if (!$hasSubscription) {
                        $knownSubTypes = ['subscription', 'aw_sarp2_subscription_plan', 'recurring'];
                        if (in_array($product->getTypeId(), $knownSubTypes, true)) {
                            $hasSubscription = true;
                        }
                    }
                }
            }
        }

        $couponCodes = [];
        if ($quote->getCouponCode() !== null && $quote->getCouponCode() !== '') {
            $couponCodes[] = $quote->getCouponCode();
        }

        $context = [
            'cartTotalCents' => $totalCents,
            'currency'       => strtoupper($currencyCode),
            'itemCount'      => $itemCount,
            'discountCodes'  => $couponCodes,
            'lineItems'      => $lineItems,
            'cartAttributes' => [],
        ];

        // Resolve category IDs → URL keys (server-authoritative, for R012).
        if (!empty($allCategoryIds)) {
            $categorySlugs = [];
            foreach (array_keys($allCategoryIds) as $catId) {
                try {
                    $category = $this->categoryRepository->get($catId);
                    $slug     = $category->getUrlKey() ?: $category->getName();
                    if ($slug !== null && $slug !== '') {
                        $categorySlugs[$slug] = true;
                    }
                } catch (NoSuchEntityException $e) {
                    // Category deleted since product was added — skip silently.
                }
            }
            if (!empty($categorySlugs)) {
                $context['cartAttributes']['_product_categories'] = implode(',', array_keys($categorySlugs));
                $context['cartAttributes']['_product_platform']   = 'magento';
            }
        }

        if ($hasSubscription) {
            $context['cartAttributes']['_subscription'] = 'true';
            $context['cartAttributes']['_autorenew']    = 'true';
        }

        // B7c — R018 cart-composition guard: maxQtyPerSku + cart-total deviation
        // vs merchant-configured average order. `merchant_avg_order_cents` falls
        // back to 5000¢ (per audit default) when admin hasn't tuned it.
        $maxQty = CartSignals::maxQtyPerSku($lineItems);
        if ($maxQty > 0) {
            $context['cartAttributes']['_qty_per_sku_max'] = (string) $maxQty;
        }
        $context['cartAttributes']['_cart_total_cents'] = (string) $totalCents;
        $merchantAvg = (int) ($this->scopeConfig->getValue('trusteed/enforcement/merchant_avg_order_cents') ?? 5000);
        $devBps = CartSignals::cartTotalDeviationBps($totalCents, $merchantAvg);
        if ($devBps > 0) {
            $context['cartAttributes']['_cart_total_dev_bps'] = (string) $devBps;
        }

        // B7 — R016 lowest stock + R027 stored value via pure CartSignals helpers.
        $lowest = CartSignals::lowestStock($signalItems);
        if ($lowest !== null) {
            $context['cartAttributes']['_lowest_stock'] = (string) $lowest;
        }
        $stored = CartSignals::storedValueCents($signalItems);
        if ($stored > 0) {
            $context['cartAttributes']['_stored_value_cents'] = (string) $stored;
        }

        // B7b — R015 price delta from HMAC-signed cookie set at add-to-cart.
        // Cookie name: `amcp_price_snap_{quote_id}`. HMAC key comes from the
        // signed snapshot (R015.params.priceSnapHmacKeyHex), so tampered
        // cookies → empty map → R015 PASS (no false positives from client).
        try {
            $quoteId = (int) $quote->getId();
            if ($quoteId > 0) {
                $cookieKey = 'amcp_price_snap_' . $quoteId;
                $cookieRaw = isset($_COOKIE[$cookieKey]) ? (string) $_COOKIE[$cookieKey] : '';
                if ($cookieRaw !== '') {
                    $merchantId = (string) ($this->scopeConfig->getValue('trusteed_general/general/merchant_id') ?? '');
                    $hmacKeyHex = $this->resolveR015HmacKey($merchantId);
                    if ($hmacKeyHex !== '') {
                        $snapshot = CartSignals::verifyPriceSnap($cookieRaw, $hmacKeyHex);
                        if (!empty($snapshot)) {
                            $current = [];
                            foreach ($lineItems as $li) {
                                $current[(string) $li['id']] = (int) $li['priceCents'];
                            }
                            $delta = CartSignals::maxPriceDeltaBps($current, $snapshot);
                            if ($delta > 0) {
                                $context['cartAttributes']['_price_delta_bps'] = (string) $delta;
                            }
                        }
                    }
                }
            }
        } catch (\Throwable $e) {
            // Never block on price-snap verification failure.
        }

        $billingAddress = $quote->getBillingAddress();
        if ($billingAddress && $billingAddress->getCountryId() !== null) {
            $context['billingCountry'] = strtoupper((string)$billingAddress->getCountryId());
        }

        $shippingAddress = $quote->getShippingAddress();
        if ($shippingAddress && $shippingAddress->getCountryId() !== null) {
            $context['shippingCountry'] = strtoupper((string)$shippingAddress->getCountryId());
        }

        // B7 — R025: server-side PO box (multi-language) + freight forwarder
        // via pure CartSignals helpers. Parity with WC + PS detection.
        if ($shippingAddress) {
            $streetParts = $shippingAddress->getStreet();
            $streetStr   = is_array($streetParts)
                ? implode(' ', array_filter($streetParts, 'strlen'))
                : (string)($streetParts ?? '');
            $shipCompany = (string) ($shippingAddress->getCompany() ?? '');
            if (CartSignals::detectPoBox($streetStr)) {
                $context['cartAttributes']['_shipping_po_box'] = 'true';
            }
            if (CartSignals::detectFreightForwarder($streetStr, $shipCompany)) {
                $context['cartAttributes']['_shipping_freight_forwarder'] = 'true';
            }
        }

        // B7 — R028: B2B detection via billing company (primary) + Magento
        // Commerce B2B company_id (extension attribute) when available.
        if ($billingAddress) {
            $billCompany = (string) ($billingAddress->getCompany() ?? '');
            $companyId   = null;
            try {
                $customer = $quote->getCustomer();
                if ($customer !== null && method_exists($customer, 'getExtensionAttributes')) {
                    $cAttrs = $customer->getExtensionAttributes();
                    if ($cAttrs !== null && method_exists($cAttrs, 'getCompanyAttributes')) {
                        $cInfo = $cAttrs->getCompanyAttributes();
                        if ($cInfo !== null && method_exists($cInfo, 'getCompanyId')) {
                            $companyId = (int) $cInfo->getCompanyId();
                        }
                    }
                }
            } catch (\Throwable $e) {
                // Magento Commerce B2B module not installed — fall back to company field only.
            }
            if (CartSignals::isB2bOrder($billCompany, $companyId)) {
                $context['cartAttributes']['_b2b_order'] = 'true';
            }
        }

        // R022 — project chosen payment rail. Delegated to pure helper so
        // the lowercase normalisation + null-safety is unit-testable without
        // a Magento kernel. Helper returns null when the quote hasn't reached
        // the payment step yet (NO_SIGNAL → PASS, never HIT).
        $paymentMethod = CartSignals::extractPaymentMethod($quote);
        if ($paymentMethod !== null) {
            $context['paymentMethod'] = $paymentMethod;
        }

        return $context;
    }

    /**
     * B7b — extract per-merchant HMAC key for R015 from the signed snapshot.
     * Returns '' on any failure (R015 falls back to PASS rather than minting
     * a delta from an unverifiable cookie). Delegates the rules walk to the
     * pure `CartSignals::resolveR015HmacKey` so the logic is unit-testable
     * without a Magento kernel.
     */
    private function resolveR015HmacKey(string $merchantId): string
    {
        if ($merchantId === '') {
            return '';
        }
        try {
            $rules = $this->enforcementClient->getRules($merchantId);
        } catch (\Throwable $e) {
            return '';
        }
        return CartSignals::resolveR015HmacKey($rules);
    }

    /**
     * B7c — Project agent-history signals (R007, R010, R023, R024) onto the
     * orderContext.cartAttributes map. All five accessors fail open: empty
     * agentDid, missing fetcher binding, network error, or DB error all
     * degrade the corresponding signal to "no signal" rather than fabricating
     * a false-positive risk score.
     *
     *   R007 → `_cross_merchant_abuse` (string "true" only when backend flag is set)
     *   R010 → `_completed_orders` (int, local sales_order count by agent)
     *   R023 → `_refund_ratio` (float in [0,1], creditmemos/orders by agent)
     *   R024 → `_dispute_count` (int, backend merchant_disputes lookup)
     *
     * R018 cart-composition signals (`_qty_per_sku_max`, `_cart_total_cents`,
     * `_cart_total_dev_bps`) are projected directly from the quote inside
     * `buildOrderContext` since they don't require any agent-history join.
     */
    private function projectAgentHistorySignals(array &$context, string $agentDid, string $merchantId): void
    {
        if ($this->historyFetcher === null || $agentDid === '') {
            return;
        }
        $agentIdHash = hash('sha256', $agentDid);
        try {
            // R007 — cross-merchant abuse flag.
            if ($this->historyFetcher->isCrossMerchantAbuse($agentIdHash)) {
                $context['cartAttributes']['_cross_merchant_abuse'] = 'true';
            }
            // T17 R005 — revoked-agent flag. Reuses the existing
            // cross-merchant-abuse backend hop as the revocation source-of-truth
            // (both express "do not transact with this DID"). Fail-open: when
            // backend is unreachable the helper degrades silently.
            $revoked = $this->historyFetcher->isCrossMerchantAbuse($agentIdHash);
            if (CartSignals::isAgentRevoked($revoked, null)) {
                $context['cartAttributes']['_agent_revoked'] = 'true';
            }
            // R010 — completed-order count at this merchant.
            $completed = $this->historyFetcher->completedOrderCount($agentIdHash);
            $context['cartAttributes']['_completed_orders'] = (string) $completed;
            // T17 R011 — failed-checkout velocity (backend-canonical). The
            // helper returns null while the `/checkout-failures/count` endpoint
            // is being wired in spec-048 P0b — evaluator falls back to
            // BLOCK-event count via `failedCheckoutCount` lookup server-side.
            $failed = $this->historyFetcher->failedCheckoutCount($agentIdHash, 300);
            if ($failed !== null) {
                $context['cartAttributes']['_failed_checkout_count'] = (string) $failed;
            }
            // T17 R014 — cancellation history from local sales_order joins.
            $cancels = $this->historyFetcher->cancelCount($agentIdHash, 90);
            if ($cancels !== null && $cancels > 0) {
                $context['cartAttributes']['_cancel_count'] = (string) $cancels;
            }
            // R023 — refund ratio from local creditmemos.
            $refundCount = $this->historyFetcher->refundCount($agentIdHash);
            $ratio       = CartSignals::refundRatio($refundCount, $completed);
            if ($ratio > 0.0) {
                $context['cartAttributes']['_refund_ratio'] = number_format($ratio, 4, '.', '');
            }
            // R024 — dispute history from backend.
            $disputeCount = $this->historyFetcher->disputeCount($agentIdHash, $merchantId);
            if ($disputeCount > 0) {
                $context['cartAttributes']['_dispute_count'] = (string) $disputeCount;
            }
            // T17 R019/R029/R030 — country + preset + simple-controls rely on
            // signals already in the OrderContext (billingCountry/shippingCountry
            // projected in buildOrderContext above; r029.preset + r030.maxAmountCents
            // come from the merchant snapshot params, no projection needed).
        } catch (\Throwable $e) {
            // Never block checkout on signal projection — log and continue.
            $this->logger->warning('[trusteed] history projection error: ' . $e->getMessage());
        }
    }

    /**
     * Resolve failure_mode for INDETERMINATE nonce-consume outcomes (spec-048
     * P2.8). Reads `trusteed/enforcement/failure_mode` scope config. Defaults
     * to `enforce` (fail-closed) when unset.
     *
     * To override per-merchant add this to admin XML or set via:
     *   bin/magento config:set trusteed/enforcement/failure_mode observe
     */
    private function getFailureMode(): string
    {
        $mode = (string) ($this->scopeConfig->getValue('trusteed/enforcement/failure_mode') ?? 'enforce');
        return $mode === 'observe' ? 'observe' : 'enforce';
    }
}
