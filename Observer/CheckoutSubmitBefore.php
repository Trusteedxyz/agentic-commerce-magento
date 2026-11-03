<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Observer;

use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Model\Quote;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Enforcement\AgentReason;
use Trusteed\AgenticCommerce\Enforcement\AgentIdHash;
use Trusteed\AgenticCommerce\Enforcement\AgentIdentityResolver;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;
use Trusteed\AgenticCommerce\Enforcement\R043HitlGate;
use Trusteed\AgenticCommerce\Enforcement\TokenClaimSignals;
use Trusteed\AgenticCommerce\Service\AgentTokenVerifier;
use Trusteed\AgenticCommerce\Service\BrowserAgentSignature;
use Trusteed\AgenticCommerce\Service\EnforcementClient;
use Trusteed\AgenticCommerce\Service\NonceOutcome;
use Trusteed\AgenticCommerce\Service\AgentHistoryFetcher;
use Trusteed\AgenticCommerce\Service\CartSignals;

/**
 * Pre-order enforcement observer — fires on sales_model_service_quote_submit_before.
 *
 * Flow:
 *  1. Resolve the agent identity: `X-Trusteed-Agent-*` headers of the REST
 *     request that places the order, with the checkout session as fallback
 *     ({@see AgentIdentityResolver}, C2 since 1.3.5). No signal ⇒ human.
 *  2. Fetch agentDidResolver from the VERIFIED snapshot (cached in-memory per
 *     request). A token with a tampered/unavailable snapshot is held in every
 *     mode (Task 23b: "could not be verified", no evaluate, jti not spent).
 *  3. Verify agent token Ed25519 signature; its claims count only if VALID.
 *  4. Build orderContext from quote with token verification attributes.
 *  5. POST to /v1/rules/evaluate — block with LocalizedException on BLOCK.
 *     Agentic checkouts add `endpointClass: agentic_endpoint`; the organic
 *     payload is unchanged.
 *
 * Failures of ours (A8 since 1.3.5): a human checkout is never blocked by an
 * evaluator outage or by an internal error while building the payload — only a
 * merchant rule (server decision, or an `appliesTo: ALL` rule in the offline
 * safety valve of a VERIFIED snapshot) can block it. An agentic checkout
 * follows the cause and the merchant's `failure_mode` (default 'enforce' ⇒
 * blocked; see FailurePolicy::decideDegraded). A store that has not finished
 * connecting (no merchant ID / installation) is not evaluated at all.
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

    /** Marca que SOLO escribe el endpoint WebMCP (Controller/Webmcp/Checkout): el cliente no la puede quitar. */
    public const SESSION_AGENTIC_ORIGIN  = 'trusteed_agentic_origin';
    public const SESSION_AGENTIC_CHANNEL = 'trusteed_agentic_channel';

    /** Canal de la marca consumida, para que SalesOrderSaveAfter lo anote en el pedido. */
    public const SESSION_AGENT_CHANNEL_FOR_ORDER = 'trusteed_agent_channel_for_order';

    /** @param RequestInterface|null $request `X-Trusteed-Agent-*` headers (etc/di.xml); null ⇒ session only. */
    public function __construct(
        private readonly CheckoutSession $checkoutSession,
        private readonly AgentTokenVerifier $tokenVerifier,
        private readonly EnforcementClient $enforcementClient,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly CacheInterface $cache,
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly ?AgentHistoryFetcher $historyFetcher = null,
        private readonly ?RequestInterface $request = null,
        private readonly ?BrowserAgentSignature $browserSignature = null,
    ) {}

    /**
     * Spec-048 4.9 — señales de carrito que ESTA instalación sabe proyectar.
     *
     * Es la mitad "qué aporto" del contrato cuya otra mitad es
     * `RULE_SIGNALS_READ` ("qué lee cada regla") en el servidor. Cruzarlas
     * convierte el silencio de `NO_SIGNAL` —una regla activada en ENFORCE que
     * nunca dispara porque su señal no llega— en un aviso que el comerciante
     * ve al activarla.
     *
     * Del historial del agente sólo proyecta `_failed_checkout_count` (R011): es
     * la única lectura con productor (Task 38b: R005/R007/R024 piden rutas que el
     * servidor no tiene y R010/R014/R023 una columna que el módulo no crea; el
     * servidor las resuelve por su cuenta). La lista NO se mantiene a ojo: el gate
     * `signals-provided-plugin-declarations.test.ts` (en `packages/shared`)
     * escanea el cuerpo de esta clase y exige que coincida exactamente con las
     * claves que escribe.
     *
     * @return string[]
     */
    public static function signalsProvided(): array
    {
        return [
            '_agent_key_age_hours',
            '_agent_token_jti_malformed',
            '_agent_token_jti_missing',
            '_agent_token_nonce_unavailable',
            '_agent_token_present',
            '_agent_token_replay',
            '_agent_token_signature_invalid',
            '_autorenew',
            '_b2b_order',
            '_cart_total_cents',
            '_cart_total_dev_bps',
            '_failed_checkout_count',
            '_lowest_stock',
            '_merchant_local_hour',
            '_price_delta_bps',
            '_product_categories',
            '_product_platform',
            '_provider_confidence',
            '_qty_per_sku_max',
            '_requested_scopes',
            '_return_policy_mismatch',
            '_shipping_freight_forwarder',
            '_shipping_po_box',
            '_stored_value_cents',
            '_subscription',
        ];
    }

    /**
     * @throws LocalizedException When enforcement decision is BLOCK.
     *
     * SIGNALS_PROVIDED_BUILDER_START — ancla del gate de 4.9: todo lo que esta
     * clase escriba en `cartAttributes` de aquí abajo tiene que estar en
     * `signalsProvided()`.
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

        // C2 + A8 — resolved once; never throws (an unreadable source = no signal).
        $identity    = $this->resolveAgentIdentity();
        $verifiedDid = '';
        $webmcp      = $this->webmcpMarked();
        if ($webmcp) {
            $identity['agentic'] = true;
        }

        try {
            $built       = $this->buildEvaluationPayload($quote, $merchantId, $identity);
            $verifiedDid = $built['verifiedDid'];
            $decision    = $built['held'] ? EnforcementClient::DECISION_UNAVAILABLE : $this->enforcementClient->evaluate($built['payload']);
            // Task 16: nonce store down in enforce closed the token; a BLOCK is then our outage.
            $decision = $built['nonceClosed'] && $decision === EnforcementClient::DECISION_BLOCK ? EnforcementClient::DECISION_UNAVAILABLE : $decision;
        } catch (\Throwable $e) {
            // Our own failure: a human passes, an agent gets failure_mode — never propagated.
            $decision = $this->decideOnInternalFailure($identity['agentic'], $e);
        }

        // DID/token se limpian siempre; la marca agéntica (origin/channel) sólo en ALLOW: un agente retenido que reenvía no pasa a ser persona.
        $this->checkoutSession->unsetData(self::SESSION_AGENT_DID);
        $this->checkoutSession->unsetData(self::SESSION_AGENT_TOKEN);
        $this->checkoutSession->unsetData(self::SESSION_AGENT_CHANNEL_FOR_ORDER);

        // A8 — our own failure blocked an agent: say so, never "a rule blocked you".
        if ($decision === EnforcementClient::DECISION_UNAVAILABLE) {
            $this->checkoutSession->unsetData(self::SESSION_VERIFIED_AGENT_DID);
            throw new LocalizedException(
                __('Your order could not be verified right now. Please try again in a few minutes.')
            );
        }

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
            // Con `agent_reason` saneado, la frase de categoría; sin él (servidor antiguo) la fija.
            $agentReason = $this->enforcementClient->getLastAgentReason();
            throw new LocalizedException(
                $agentReason !== null
                    ? __('%1', AgentReason::message($agentReason, (string)($quote->getQuoteCurrencyCode() ?? '')))
                    : __('Your order could not be completed because it did not pass the store\'s agent verification rules. Please contact the store if you believe this is an error.')
            );
        }

        $this->checkoutSession->unsetData(self::SESSION_AGENTIC_ORIGIN);
        $this->checkoutSession->unsetData(self::SESSION_AGENTIC_CHANNEL);

        // ALLOW: SalesOrderSaveAfter sends this as agent_did (R023). Only a DID proven
        // by a VALID token; anything else clears it, so no later order inherits one.
        if ($verifiedDid !== '') {
            $this->checkoutSession->setData(self::SESSION_VERIFIED_AGENT_DID, $verifiedDid);
        } else {
            $this->checkoutSession->unsetData(self::SESSION_VERIFIED_AGENT_DID);
        }
        if ($webmcp) {
            $this->checkoutSession->setData(self::SESSION_AGENT_CHANNEL_FOR_ORDER, 'webmcp');
        }
        // Failure emitters (payment failed, coupon) read the DID from the quote; nobody wrote it.
        // Same rule: only a DID proven by a VALID token, never a declared one.
        if (method_exists($quote, 'setData')) {
            if ($verifiedDid !== '') {
                $quote->setData(self::SESSION_AGENT_DID, $verifiedDid);
            } elseif (method_exists($quote, 'unsetData')) {
                $quote->unsetData(self::SESSION_AGENT_DID);
            }
        }
    }

    /**
     * Builds the `/v1/rules/evaluate` body (C2: from the resolved identity).
     * May throw; the caller turns that into {@see decideOnInternalFailure()}.
     *
     * @param array{did:string, token:string, agentic:bool, tokenRejected:bool} $identity
     * @return array{payload: array<string,mixed>, verifiedDid: string, nonceClosed: bool, held: bool} `verifiedDid`: DID
     *         a VALID token proves ('' otherwise); `nonceClosed`: our nonce store failed in enforce;
     *         `held`: token presented with a degraded snapshot (no payload, no evaluate).
     */
    private function buildEvaluationPayload(Quote $quote, string $merchantId, array $identity): array
    {
        // A cart with no agent DID is still evaluated (R030 etc. apply to humans too).
        // C2 (1.3.5): `X-Trusteed-Agent-*` headers first, session as fallback — a DECLARED DID.
        $agentDid = $identity['did'];

        $orderContext = $this->buildOrderContext($quote);

        $jwtToken    = $identity['token']; // Token verification.
        $tokenState  = '';
        $nonceClosed = false;
        $failedCount = null; // R011, sólo de un token VÁLIDO (Task 38b)
        if ($jwtToken !== '') {
            $orderContext['cartAttributes']['_agent_token_present'] = 'true';
            // Task 23b — tampered/unavailable snapshot ⇒ the token cannot be verified: held
            // in every mode, before evaluate and before its jti is spent.
            if ($this->enforcementClient->holdsTokenOnDegradedSnapshot($merchantId)) {
                return ['payload' => [], 'verifiedDid' => '', 'nonceClosed' => false, 'held' => true];
            }

            $didResolver = $this->enforcementClient->getDidResolver($merchantId);
            $result      = $this->tokenVerifier->verify($jwtToken, $didResolver, $merchantId);
            // A valid token of ANOTHER agent ⇒ invalid; no declared DID ⇒ the token's.
            $bound      = AgentIdentityResolver::bindToken($agentDid, (string) $result['state'], (string) ($result['agentDid'] ?? ''));
            $tokenState = $bound['state'];
            $agentDid   = $bound['did'];
            $result     = $bound['mismatch'] ? array_merge($result, ['error' => 'token_did_mismatch']) : $result;

            // Task 16: not VALID (INVALID, INDETERMINATE, another agent's) = invalid for the agent.
            if ($tokenState !== 'valid') {
                $orderContext['cartAttributes']['_agent_token_signature_invalid'] = 'true';
                // Spec-048 P2.8 — surface identifier-specific failures as explicit
                // attributes so operators can diagnose tokens minted without a
                // single-use identifier. The names say `jti` for compatibility with
                // the server; since B5 they cover the canonical `nonce` (or the
                // legacy `jti` alias). Parity with WC.
                if (($result['error'] ?? '') === 'missing_jti') {
                    $orderContext['cartAttributes']['_agent_token_jti_missing'] = 'true';
                } elseif (($result['error'] ?? '') === 'bad_jti') {
                    $orderContext['cartAttributes']['_agent_token_jti_malformed'] = 'true';
                }
                $this->logger->info(
                    '[trusteed] agent token invalid',
                    // Never the full DID in logs: a short hash is enough to correlate.
                    ['error' => $result['error'], 'agentDidHash' => substr(hash('sha256', (string) $result['agentDid']), 0, 12)]
                );
            }

            // Task 38b (2) — historial del agente VERIFICADO, leído ANTES de gastar el jti. Un
            // fallo de lectura no es «0 fallos»: es «historial no disponible» y decide el modo.
            if ($tokenState === 'valid' && $this->historyFetcher !== null) {
                $failedCount = $this->historyFetcher->failedCheckoutCount(AgentIdHash::perMerchant($agentDid, $merchantId), 300);
                if ($this->historyFetcher->takeReadFailures() !== []) {
                    $failedCount = null;
                    $this->logger->warning('[trusteed] agent history unavailable (R011 read failed)');
                    if (FailurePolicy::decideOnHistoryUnavailable($this->getFailureMode()) === 'BLOCK') {
                        return ['payload' => [], 'verifiedDid' => '', 'nonceClosed' => false, 'held' => true];
                    }
                }
            }

            // Spec-048 P2.8 — single-use replay protection. Only consume nonces
            // for VALID tokens (INDETERMINATE / INVALID handled above).
            $jti = (string) ($result['jti'] ?? '');
            $exp = (int) ($result['exp'] ?? 0);
            if ($tokenState === 'valid' && $jti !== '') {
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
                    // failure_mode: observe → token stays VALID + telemetry; enforce
                    // or unresolved → INVALID (fail-closed), published as an outage.
                    $failureMode = $this->getFailureMode();
                    $orderContext['cartAttributes']['_agent_token_nonce_unavailable'] = 'true';
                    if ($failureMode !== 'observe') {
                        // La firma SÍ verificó: el DID es auténtico y no se marca como firma inválida.
                        // Se retiene al agente antes de preguntar al servidor (un ALLOW no lo abre).
                        $nonceClosed = true;
                    } else {
                        $this->logger->warning(
                            '[trusteed] nonce-consume indeterminate (observe): ' . $nonce['reason']
                        );
                    }
                }
                // ACCEPTED → nothing to do, token remains VALID.
            }

            // R004: first-seen key age tracking via Magento cache. Only a VALID token's key (Task 16).
            $kid = $result['kid'] ?? '';
            if ($kid !== '' && $tokenState === 'valid') {
                $cacheKey  = 'trusteed_kid_fs_' . hash('sha256', $kid);
                $firstSeen = $this->cache->load($cacheKey);
                if ($firstSeen === false) {
                    $firstSeen = (string)time();
                    $this->cache->save($firstSeen, $cacheKey, [], 31536000);
                }
                $orderContext['cartAttributes']['_agent_key_age_hours'] = (string)round((time() - (int)$firstSeen) / 3600, 2);
            }

            // R013 / R008 / R006 — claims ONLY of a token still VALID after the
            // nonce check (Task 23b); any other token counts as one without claims.
            $trusted = $tokenState === 'valid' && !isset($orderContext['cartAttributes']['_agent_token_signature_invalid']);
            $claim   = TokenClaimSignals::project($trusted ? (array) ($result['claims'] ?? []) : [], TokenClaimSignals::hasFinalSaleItem($quote->getAllVisibleItems()));
            if ($claim['mismatch']) {
                $orderContext['cartAttributes']['_return_policy_mismatch'] = 'true';
            }
            if ($claim['scopes'] !== '') {
                $orderContext['cartAttributes']['_requested_scopes'] = $claim['scopes'];
            }
            if ($claim['confidence'] !== null) {
                $orderContext['cartAttributes']['_provider_confidence'] = $claim['confidence'];
            }
        }

        // C2 — a token was presented but had no JWS shape (or was oversized): it
        // was dropped before verification, and it is still an invalid token of
        // an agent, never a reason to treat the checkout as human.
        if ($identity['tokenRejected']) {
            $orderContext['cartAttributes']['_agent_token_present']           = 'true';
            $orderContext['cartAttributes']['_agent_token_signature_invalid'] = 'true';
        }
        $verifiedDid = $tokenState === 'valid' && !isset($orderContext['cartAttributes']['_agent_token_signature_invalid']) ? $agentDid : '';
        // Task 16: only a proven DID travels as agentId and keys the history; else anonymous agent.
        // Firma Web Bot Auth verificada (enforce): `wba:<origen>#<keyId>` es la identidad si ningún token la dio.
        $signatureIdentity = $verifiedDid === '' ? (string)($identity['signatureIdentity'] ?? '') : '';
        $verifiedDid       = $verifiedDid !== '' ? $verifiedDid : $signatureIdentity;
        $agentDid = $verifiedDid;

        // T17 R020 — merchant local hour projection (business-hours rule).
        // Sourced from the store's IANA timezone (`general/locale/timezone`),
        // computed server-side so client clock skew never opens a window.
        $tz = (string) ($this->scopeConfig->getValue('general/locale/timezone') ?? '');
        $hour = CartSignals::computeMerchantLocalHour($tz === '' ? null : $tz);
        if ($hour !== null) {
            $orderContext['cartAttributes']['_merchant_local_hour'] = (string) $hour;
        }

        // B7c / Task 38b — historial del agente verificado (R011), ya leído arriba; un DID no
        // probado (anónimo, token reutilizado) no recibe el de nadie.
        $this->projectAgentHistorySignals($orderContext, $agentDid, $failedCount);

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

        if ($signatureIdentity !== '') {
            $payload['agentIdentityLevel'] = 'verified_signature';
        }

        // Sólo en agénticos: el payload orgánico queda byte a byte como antes.
        return [
            'payload'     => $identity['agentic'] ? array_merge($payload, ['endpointClass' => 'agentic_endpoint']) : $payload,
            // L1 (29c): R023 sólo con nonce ACEPTADO — con el almacén de nonces caído (observe) la identidad viaja, no se guarda.
            'verifiedDid' => isset($orderContext['cartAttributes']['_agent_token_nonce_unavailable']) ? '' : $verifiedDid,
            'nonceClosed' => $nonceClosed,
            'held'        => $nonceClosed,
        ];
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
        $skuAliases     = []; // R034: SKU alias lines (qty 0, price 0), keyed by SKU to dedupe.
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
            $sku = trim((string)$item->getSku());
            if ($sku !== '' && $sku !== (string)$item->getProductId()) {
                $skuAliases[$sku] = ['id' => $sku, 'qty' => 0, 'priceCents' => 0];
            }

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
            // R034 compares `id` with the merchant's SKU list; the SKU travels as an alias line
            // that changes no amount (same shape the server adds for its own rails).
            'lineItems'      => array_merge($lineItems, array_values(array_filter(
                $skuAliases,
                static fn (array $a): bool => !in_array($a['id'], array_column($lineItems, 'id'), true)
            ))),
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
     * B7c / Task 38b — proyecta el historial del agente VERIFICADO sobre
     * `orderContext.cartAttributes`. Hoy sólo R011: `_failed_checkout_count`
     * (`/checkout-failures/count`, ruta real del servidor). Ausente (`null`) =
     * sin señal, nunca un «0»; el fallo de lectura ya se decidió al leerla.
     * R005/R007/R024 (rutas inexistentes) y R010/R014/R023 (columna
     * `sales_order.agent_id_hash` inexistente) no se proyectan: ver
     * {@see AgentHistoryFetcher}.
     */
    private function projectAgentHistorySignals(array &$context, string $agentDid, ?int $failedCount): void
    {
        if ($agentDid !== '' && $failedCount !== null) {
            $context['cartAttributes']['_failed_checkout_count'] = (string) $failedCount;
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
    private function getFailureMode(): ?string
    {
        // Trim + lowercase against enforce|observe; absent ⇒ 'enforce'; any
        // other value ⇒ null ("unresolved"), which closes (FailurePolicy).
        return FailurePolicy::normalizeFailureMode(
            $this->scopeConfig->getValue('trusteed/enforcement/failure_mode')
        );
    }

    /**
     * A8 — an internal error of ours before or while evaluating. A human is
     * never blocked by it; an agent is, in EVERY failure mode
     * ({@see FailurePolicy::decideOnInternalError()}): an own failure is not a
     * permit. Not published as a rule (`DECISION_UNAVAILABLE`, generic message).
     */
    private function decideOnInternalFailure(bool $isAgentic, \Throwable $e): string
    {
        $decision = FailurePolicy::decideOnInternalError($isAgentic);
        $this->logger->warning(sprintf( // class name only: the message could echo request data
            '[trusteed] enforcement internal error (%s) agentic=%s decision=%s',
            get_class($e),
            $isAgentic ? 'true' : 'false',
            $decision
        ));
        return $decision === 'BLOCK' ? EnforcementClient::DECISION_UNAVAILABLE : EnforcementClient::DECISION_ALLOW;
    }

    /** Marca de servidor del endpoint WebMCP en la sesión de checkout; nunca lanza (ilegible = sin marca). */
    private function webmcpMarked(): bool
    {
        try {
            return (string)($this->checkoutSession->getData(self::SESSION_AGENTIC_ORIGIN) ?? '') === '1'
                && (string)($this->checkoutSession->getData(self::SESSION_AGENTIC_CHANNEL) ?? '') === 'webmcp';
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] checkout session unreadable: ' . get_class($e));
            return false;
        }
    }

    /**
     * C2 — identity from the `X-Trusteed-Agent-*` headers, session fallback.
     * Never throws: a failure reading either source counts as "no signal".
     *
     * @return array{did:string, token:string, agentic:bool, tokenRejected:bool, signatureIdentity?:string}
     */
    private function resolveAgentIdentity(): array
    {
        $sessionDid = $sessionToken = '';
        $headers    = [];
        try {
            $sessionDid   = (string)($this->checkoutSession->getData(self::SESSION_AGENT_DID) ?? '');
            $sessionToken = (string)($this->checkoutSession->getData(self::SESSION_AGENT_TOKEN) ?? '');
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] checkout session unreadable: ' . get_class($e));
        }
        try {
            $headers = AgentIdentityResolver::readHeaders($this->request);
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] request headers unreadable: ' . get_class($e));
        }
        return $this->applyBrowserSignature(AgentIdentityResolver::resolve($headers, $sessionDid, $sessionToken));
    }

    /**
     * Web Bot Auth (RFC 9421) de un agente de navegador. Solo en `enforce` cambia algo, y solo con
     * verified (identidad `wba:...`, nivel verified_signature) o spoofed (agente anónimo); unverified,
     * error o timeout dejan la clasificación como estaba. En `observe` solo se registra. Nunca lanza.
     *
     * @param array{did:string, token:string, agentic:bool, tokenRejected:bool} $identity
     * @return array{did:string, token:string, agentic:bool, tokenRejected:bool, signatureIdentity?:string}
     */
    private function applyBrowserSignature(array $identity): array
    {
        if ($this->browserSignature === null || $this->request === null) {
            return $identity;
        }
        try {
            if ($this->browserSignature->mode() === 'off') {
                return $identity;
            }
            $result = $this->browserSignature->resolve(
                BrowserAgentSignature::collectHeaders($this->request),
                method_exists($this->request, 'getMethod') ? (string)$this->request->getMethod() : 'POST',
                method_exists($this->request, 'getRequestUri') ? (string)$this->request->getRequestUri() : ''
            );
            if ($result === null || $this->browserSignature->mode() !== 'enforce') {
                return $identity;
            }
            if ($result['status'] === 'verified' && $result['identity'] !== '') {
                return array_merge($identity, ['agentic' => true, 'signatureIdentity' => $result['identity']]);
            }
            if ($result['status'] === 'spoofed') {
                return array_merge($identity, ['agentic' => true]);
            }
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] browser signature unreadable: ' . get_class($e));
        }
        return $identity;
    }
}
