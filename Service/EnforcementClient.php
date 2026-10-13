<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Magento\Framework\App\CacheInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;
use Trusteed\AgenticCommerce\Enforcement\JwksPositiveCache;
use Trusteed\AgenticCommerce\Enforcement\JwksRetryVerdictStore;
use Trusteed\AgenticCommerce\Enforcement\OfflineSafetyValveEvaluator;
use Trusteed\AgenticCommerce\Enforcement\SnapshotJwsVerifier;
use Trusteed\AgenticCommerce\Enforcement\SnapshotPayloadDecoder;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Outcome of consumeNonce(), single-use replay protection.
 *
 *   ACCEPTED      , HTTP 200, nonce stored, token may be used.
 *   REPLAY        , HTTP 409, nonce already seen, caller must mark token INVALID.
 *   INDETERMINATE , network / 5xx / 4xx / bad response, caller maps per failure_mode.
 *
 * Mirrors the nonce outcome enums of the WooCommerce and PrestaShop modules.
 */
class NonceOutcome
{
    public const ACCEPTED      = 'ACCEPTED';
    public const REPLAY        = 'REPLAY';
    public const INDETERMINATE = 'INDETERMINATE';
}

/**
 * HTTP client for POST /v1/rules/evaluate and GET /v1/rules/snapshot/:merchantId.
 *
 * Signs requests with HMAC-SHA256 in Stripe-style format:
 *   X-Trusteed-Signature: t=<unix>,s=<sha256-hex>
 *
 * Failure semantics (since 1.3.5):
 *   - evaluate(): on transport error / non-2xx / SSRF-guard rejection / an
 *     unreadable 2xx body / an internal error, {@see FailurePolicy::decideDegraded()}
 *     decides by the CAUSE read from the snapshot: verified means the
 *     offline safety valve (scoped by who is checking out) and then the mode , 
 *     an AGENTIC checkout gets DECISION_UNAVAILABLE when
 *     `trusteed/enforcement/failure_mode` resolves to 'enforce' (the default)
 *     or to a value outside enforce|observe, ALLOW with 'observe'; no usable
 *     snapshot: an agent with a token is held in every mode, one without
 *     follows the mode; tampered snapshot: an agent is held in every mode. A
 *     HUMAN checkout (no agentId, no `endpointClass: agentic_endpoint`, no
 *     token) is never held by our outage, only by the valve of a verified
 *     snapshot. The snapshot/history fetches themselves never throw.
 *
 * Decision outcomes returned by evaluate():
 *   - 'ALLOW'   , proceed with checkout.
 *   - 'BLOCK'   , hard block by a rule (server decision or offline safety valve).
 *   - 'UNAVAILABLE', agentic checkout closed because the evaluator could not
 *                  decide (failure_mode 'enforce' or unresolved; or, whatever
 *                  the mode, a tampered snapshot / a token without snapshot). Since 1.3.5.
 *   - 'ESCALATE', R043 HITL: the order must NOT be created but the intent is
 *                  recorded as pending merchant approval.
 *
 * @since 1.0.0
 */
class EnforcementClient
{
    public const DECISION_ALLOW    = 'ALLOW';
    public const DECISION_BLOCK    = 'BLOCK';
    public const DECISION_ESCALATE = 'ESCALATE';
    /**
     * The evaluator could not decide (outage, SSRF rejection, unreadable body,
     * internal error, degraded snapshot) and its cause or the merchant's
     * failure_mode closes for this AGENTIC checkout. Distinct from DECISION_BLOCK so the caller never tells an agent
     * that "a store rule" rejected it when it was our outage.
     * Never returned for a human checkout.
     */
    public const DECISION_UNAVAILABLE = 'UNAVAILABLE';

    private const TIMEOUT_SECONDS = 5;

    /** Most bytes read from a snapshot / JWKS response (a legitimate compact JWS is ≤ ~4 MiB). */
    public const MAX_RESPONSE_BYTES = 4194304;

    /** Snapshot status when the connector is not configured (layer_disabled). */
    public const SNAPSHOT_DISABLED = 'disabled';
    private const SNAPSHOT_CACHE_TTL = 60;

    /**
     * In-memory cache (per request): snapshot outcome per merchantId , 
     * {status: ok|tampered|unavailable|disabled, payload, detail}.
     * Only an `ok` outcome carries a (verified) payload.
     */
    private array $snapshotResults = [];

    /**
     * In-memory cache: JWKS keys (kid => raw Ed25519 pubkey) per apiBase
     * Per-request only, mirrors the scope
     * of $snapshotResults above; this client is DI-constructed
     * per request, unlike the WC/PS clients which persist via APCu.
     */
    private array $jwksCache = [];

    /**
     * @param CacheInterface|null $cache Negative cache of the forced JWKS retry. Nullable
     *        like `urlValidator`, and like it NOT auto-injected: etc/di.xml binds it (covered by EnforcementClientDiWiringTest).
     * @param ApiBaseUrlValidator|null $urlValidator SSRF guard for the
     *        admin-configurable api_base_url. Production DI auto-wires this by
     *        type-hint; legacy unit tests that construct the client positionally
     *        may pass null, in which case the SSRF allowlist check is skipped but
     *        HTTPS scheme + TLS hardening are still enforced (defence in depth).
     */
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
        private readonly ?CacheInterface $cache = null,
    ) {}

    /** Clock for the JWKS negative cache (protected so tests can pin it). */
    protected function now(): int
    {
        return time();
    }

    /**
     * SSRF + HTTPS guard for an admin-configurable api_base_url. Returns true
     * when the base URL is safe to POST/GET signed material to.
     *
     * - HTTPS scheme is ALWAYS required (even when no validator is injected).
     * - When a validator is present, the host must be allowlisted or match the
     *   sealed sha256(host) registered at config-save time.
     *
     * @param string $apiBase Already rtrim()'d base URL (no trailing slash).
     */
    private function isOutboundAuthorized(string $apiBase): bool
    {
        if (!str_starts_with($apiBase, 'https://')) {
            $this->logger->warning('[trusteed] outbound rejected: api_base_url is not HTTPS');
            return false;
        }
        if ($this->urlValidator === null) {
            return true;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('[trusteed] outbound rejected by SSRF guard', [
                'host'    => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return false;
        }
        return true;
    }

    /**
     * Apply strict TLS + HTTPS-only transport hardening before every outbound
     * curl call. Mirrors Controller/Adminhtml/Token/Issue.php so a tampered
     * api_base_url can never be downgraded to plaintext or follow a redirect to
     * an attacker-controlled host.
     */
    private function applyTlsHardening(): void
    {
        $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
        $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
        $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
        $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
        // libcurl refuses a body announced (and, in recent versions, streamed) above the cap.
        $this->curl->setOption(CURLOPT_MAXFILESIZE, self::MAX_RESPONSE_BYTES);
    }

    /**
     * Call /v1/rules/evaluate and return one of DECISION_ALLOW / DECISION_BLOCK / DECISION_UNAVAILABLE
     * / DECISION_ESCALATE.
     *
     * Fail behaviour: on transport error, non-2xx, SSRF-guard
     * rejection, unreadable 2xx body or an internal error, see the class
     * docblock, a human is never blocked by it; an agent by cause and mode.
     * The unconfigured short-circuit (no installation / no HMAC secret) still
     * returns ALLOW for everyone so a store that hasn't completed the connector
     * wizard is never blocked.
     *
     * When the backend responds BLOCK + ucp.state === 'requires_escalation'
     * with an R043 reason code, evaluate() surfaces DECISION_ESCALATE so the
     * observer can apply the HITL freeze instead of a hard block.
     *
     * @param array $payload {merchantId, agentId, orderContext, platform, installationId, timestamp[, endpointClass]}
     */
    public function evaluate(array $payload): string
    {
        // Who is checking out, read once from what the observer sends:
        // an agentId, or the explicit `endpointClass: agentic_endpoint` of an
        // anonymous agent. Governs only the outage branches below.
        $agentId   = $payload['agentId'] ?? null;
        $isAgentic = FailurePolicy::isAgentic(
            is_string($agentId) ? $agentId : null,
            false,
            ($payload['endpointClass'] ?? '') === 'agentic_endpoint'
        );

        $apiBase        = rtrim($this->getApiBase(), '/');
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();

        // Unconfigured connector → never block (wizard not completed yet).
        // An empty HMAC secret joins this
        // short-circuit rather than falling through to buildSignature(),
        // which used to fabricate a "t=...,s=dev-bypass" header that LOOKED
        // signed but wasn't. Ops needs a distinct log line to find merchants
        // stuck mid-setup (HMAC secret step skipped) vs. a fully unconfigured
        // connector.
        if ($apiBase === '' || $installationId === '') {
            return self::DECISION_ALLOW;
        }
        if ($hmacSecret === '') {
            $this->logger->warning('[trusteed] evaluate skipped: HMAC secret not configured (installation incomplete)');
            return self::DECISION_ALLOW;
        }

        // SSRF + HTTPS guard before signing anything outbound. A tampered
        // api_base_url must fail per failure_mode, never silently exfiltrate the
        // HMAC-signed payload to an attacker-controlled host.
        if (!$this->isOutboundAuthorized($apiBase)) {
            return $this->decideOnOutage($payload, $isAgentic);
        }

        $url     = $apiBase . '/v1/rules/evaluate';
        $rawBody = json_encode($payload);
        if ($rawBody === false) {
            // Local encode failure is our own bug: never a reason to block a
            // human, never a permission for an agent.
            $this->logger->warning('[trusteed] evaluate payload json_encode failed');
            return $this->decideOnOutage($payload, $isAgentic);
        }

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature($rawBody, $hmacSecret));
            $this->curl->post($url, $rawBody);

            $status = (int)$this->curl->getStatus();
            if ($status < 200 || $status >= 300) {
                $this->logger->warning("[trusteed] evaluate HTTP {$status}");
                return $this->decideOnOutage($payload, $isAgentic);
            }

            $body = json_decode($this->curl->getBody(), true);
            if (!is_array($body) || empty($body['decision'])) {
                // A 2xx with an unreadable body is "no readable policy":
                // a human still passes, as before; an agent gets failure_mode.
                $this->logger->warning('[trusteed] evaluate returned an unreadable 2xx body');
                return $this->decideOnOutage($payload, $isAgentic);
            }
            return $this->mapDecision($body);
        } catch (\Throwable $e) {
            // \Throwable, not \Exception: an \Error of ours used to escape and
            // abort every checkout, a human's included.
            $this->logger->warning('[trusteed] evaluate error: ' . $e->getMessage());
            return $this->decideOnOutage($payload, $isAgentic);
        }
    }

    /**
     * Before falling back
     * to the blunt failure_mode policy (block everything / allow
     * everything), try the offline safety-valve evaluator against the last
     * `getRules()` snapshot (request-cached, no extra network round trip
     * when the snapshot was already fetched earlier in this request, e.g.
     * for the DID resolver). Lets a merchant's own universal policy rules
     * (max order amount, blocked countries, business hours, PO-box block,
     * gift-card cap...) still fire during a remote-API outage, instead of
     * either silently letting every cart through or blocking every
     * legitimate human checkout.
     *
     * Returns self::DECISION_BLOCK when the offline evaluator finds a
     * match, or null when it finds nothing (or has no verified snapshot to
     * evaluate against). Only {@see decideOnOutage()} calls it, and only with
     * a VERIFIED snapshot (`evaluator_unavailable`).
     *
     * Since 1.3.5 the rules are first scoped by who is checking out
     * ({@see FailurePolicy::offlineRulesFor()}): a human only gets the
     * merchant's `appliesTo: ALL`/`HUMAN` rules (R030 cap, countries…), never an
     * AGENT rule such as R028/R029. Any error inside the valve counts as "found
     * nothing": it never blocks by itself.
     *
     * @param array $payload {merchantId, orderContext, ...}
     */
    private function tryOfflineSafetyValve(array $payload, bool $isAgentic): ?string
    {
        $merchantId = (string) ($payload['merchantId'] ?? '');
        if ($merchantId === '') {
            return null;
        }
        try {
            $rules = FailurePolicy::offlineRulesFor($this->getRules($merchantId), $isAgentic);
            if (empty($rules)) {
                return null;
            }
            // Actor signal for the valve's currency-not-comparable branch
            // (agent: block, person: skip). Overrides anything in the payload.
            $orderContext = array_merge((array) ($payload['orderContext'] ?? []), ['agentCheckout' => $isAgentic]);
            $cartAttributes = (array) ($orderContext['cartAttributes'] ?? []);
            $block = OfflineSafetyValveEvaluator::evaluate($rules, $orderContext, $cartAttributes);
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed.offline_safety_valve] error: ' . get_class($e));
            return null;
        }
        if ($block === null) {
            return null;
        }
        $this->logger->warning(sprintf(
            '[trusteed.offline_safety_valve] BLOCK ruleCode=%s reason=%s',
            $block['ruleCode'],
            $block['reason']
        ));
        return self::DECISION_BLOCK;
    }

    /**
     * Map a 2xx evaluate() body to ALLOW / BLOCK / ESCALATE. A BLOCK whose
     * `ucp.state` is `requires_escalation` with an R043 reason code surfaces as
     * ESCALATE so the observer can apply the HITL freeze rather than a hard
     * block. All other BLOCKs remain hard blocks.
     *
     * @param array<string,mixed> $body
     */
    private function mapDecision(array $body): string
    {
        if (($body['decision'] ?? '') !== 'BLOCK') {
            return self::DECISION_ALLOW;
        }
        $ucp = is_array($body['ucp'] ?? null) ? $body['ucp'] : [];
        $reasonCode = is_string($ucp['reason_code'] ?? null) ? $ucp['reason_code'] : '';
        if (($ucp['state'] ?? '') === 'requires_escalation'
            && str_starts_with($reasonCode, 'trusteed:R043')) {
            return self::DECISION_ESCALATE;
        }
        return self::DECISION_BLOCK;
    }

    /**
     * The evaluator could not decide (transport error,
     * non-2xx, SSRF rejection, unreadable body, internal error). The CAUSE is
     * read from the snapshot ({@see FailurePolicy::decideDegraded()}):
     * verified snapshot: `evaluator_unavailable` (offline valve, then the
     * mode); no usable snapshot: `missing_snapshot` (an agent with a token is
     * held in every mode, one without decides by the mode); tampered:
     * `invalid_signature` (an agent is held in every mode). A human is never
     * held by our outage; only the valve of a VERIFIED snapshot blocks it.
     * A valve match is a merchant rule (DECISION_BLOCK); anything else that
     * closes is our outage (DECISION_UNAVAILABLE), never "a rule blocked you".
     */
    private function decideOnOutage(array $payload, bool $isAgentic): string
    {
        $cart         = (array) (((array) ($payload['orderContext'] ?? []))['cartAttributes'] ?? []);
        $tokenPresent = ($cart['_agent_token_present'] ?? '') === 'true';
        $snapshot     = $this->getSnapshotResult((string) ($payload['merchantId'] ?? ''));
        $kind         = self::degradedKind($snapshot['status']);
        $valve        = $kind === FailurePolicy::KIND_EVALUATOR_UNAVAILABLE
            ? $this->tryOfflineSafetyValve($payload, $isAgentic || $tokenPresent)
            : null;
        $mode     = $this->getFailureMode();
        $verdict  = FailurePolicy::decideDegraded($kind, $isAgentic, $tokenPresent, $mode, $valve !== null);
        $decision = $verdict === 'ALLOW' ? self::DECISION_ALLOW
            : ($valve !== null ? self::DECISION_BLOCK : self::DECISION_UNAVAILABLE);
        $this->logger->warning(sprintf(
            '[trusteed.enforcement_unavailable] kind=%s mode=%s agentic=%s token=%s decision=%s',
            $kind,
            $mode ?? 'unresolved',
            $isAgentic ? 'true' : 'false',
            $tokenPresent ? 'true' : 'false',
            $decision
        ));
        return $decision;
    }

    /** Snapshot status to cause of the degraded layer (reference `PlatformDegradedKind`). */
    public static function degradedKind(string $status): string
    {
        return match ($status) {
            SnapshotJwsVerifier::OK       => FailurePolicy::KIND_EVALUATOR_UNAVAILABLE,
            SnapshotJwsVerifier::TAMPERED => FailurePolicy::KIND_INVALID_SIGNATURE,
            self::SNAPSHOT_DISABLED       => FailurePolicy::KIND_LAYER_DISABLED,
            default                       => FailurePolicy::KIND_MISSING_SNAPSHOT,
        };
    }

    /**
     * A presented token needs the snapshot's DID resolver. When the
     * snapshot is tampered or unavailable the token cannot be verified, so the
     * agent is held in EVERY mode (`decideDegraded`) before any evaluate call
     * and before its jti is spent. A verified snapshot, or a layer that is not
     * configured, holds nobody here.
     */
    public function holdsTokenOnDegradedSnapshot(string $merchantId): bool
    {
        $snapshot = $this->getSnapshotResult($merchantId);
        if ($snapshot['status'] === SnapshotJwsVerifier::OK) {
            return false;
        }
        $kind = self::degradedKind($snapshot['status']);
        $held = FailurePolicy::decideDegraded($kind, true, true, $this->getFailureMode(), false) === 'BLOCK';
        if ($held) {
            $this->logger->warning(sprintf(
                '[trusteed.snapshot_degraded] kind=%s detail=%s agent token held',
                $kind,
                $snapshot['detail']
            ));
        }
        return $held;
    }

    /**
     * Resolve `trusteed/enforcement/failure_mode` against this module's
     * vocabulary (trim + lowercase): absent gives 'enforce'; a value outside
     * enforce|observe (e.g. `permissive` from another platform) gives null,
     * "unresolved", which closes for an agent. See FailurePolicy.
     */
    private function getFailureMode(): ?string
    {
        return FailurePolicy::normalizeFailureMode(
            $this->scopeConfig->getValue('trusteed/enforcement/failure_mode')
        );
    }

    /**
     * The snapshot's `agentDidResolver` as served (list, or legacy map), only
     * from a VERIFIED snapshot; [] otherwise.
     *
     * @return array<mixed>
     */
    public function getDidResolver(string $merchantId): array
    {
        $payload  = $this->getSnapshotResult($merchantId)['payload'];
        $resolver = $payload['agentDidResolver'] ?? [];
        return is_array($resolver) ? $resolver : [];
    }

    /**
     * The VERIFIED snapshot's `rules` (e.g. `R015.params.priceSnapHmacKeyHex`,
     * the offline valve). [] when there is no verified snapshot. Cached per request.
     *
     * @return array<int, array{ruleCode: string, params?: array, mode?: string, enabled?: bool}>
     */
    public function getRules(string $merchantId): array
    {
        $rules = $this->getSnapshotResult($merchantId)['payload']['rules'] ?? [];
        return is_array($rules) ? $rules : [];
    }

    /**
     * Fetch + verify the snapshot once per request and say why it
     * cannot be used: `disabled` (connector not configured), `unavailable`
     * (network, non-200, empty body, SSRF guard, stale `validUntil`, JWKS or
     * sodium missing, unreadable authentic payload), `tampered` (the served
     * JWS does not verify even after re-downloading the JWKS once) or `ok`.
     * Magento keeps no snapshot across requests, so there is no stored copy to
     * re-verify: every request pulls a fresh one.
     *
     * @return array{status:string, payload:?array, detail:string}
     */
    public function getSnapshotResult(string $merchantId): array
    {
        if (!array_key_exists($merchantId, $this->snapshotResults)) {
            $this->snapshotResults[$merchantId] = $this->pullSnapshot($merchantId);
        }
        return $this->snapshotResults[$merchantId];
    }

    /** @return array{status:string, payload:?array, detail:string} */
    private function pullSnapshot(string $merchantId): array
    {
        $apiBase        = rtrim($this->getApiBase(), '/');
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();
        if ($merchantId === '' || $apiBase === '' || $installationId === '') {
            return self::snapshotOutcome(self::SNAPSHOT_DISABLED, 'not_configured');
        }
        // An empty HMAC secret is an incomplete installation, like
        // evaluate()'s short-circuit: never a fabricated signature.
        if ($hmacSecret === '') {
            $this->logger->warning('[trusteed] snapshot fetch skipped: HMAC secret not configured (installation incomplete)');
            return self::snapshotOutcome(self::SNAPSHOT_DISABLED, 'hmac_secret_missing');
        }
        // SSRF + HTTPS guard before sending anything signed.
        if (!$this->isOutboundAuthorized($apiBase)) {
            return self::snapshotOutcome(SnapshotJwsVerifier::UNAVAILABLE, 'ssrf_guard_rejected');
        }

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature('', $hmacSecret));
            // Contract wire format: a bare JWS Compact body
            // (Content-Type application/jose), as the WP/PrestaShop/Odoo clients.
            $this->curl->addHeader('Accept', 'application/jose');
            $this->curl->get($apiBase . '/v1/rules/snapshot/' . rawurlencode($merchantId));

            $status = (int)$this->curl->getStatus();
            $body   = (string)$this->curl->getBody();
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] snapshot error: ' . get_class($e));
            return self::snapshotOutcome(SnapshotJwsVerifier::UNAVAILABLE, 'network_error');
        }
        // Over the cap nothing is verified.
        if (strlen($body) > self::MAX_RESPONSE_BYTES) {
            $this->logger->warning('[trusteed] snapshot response over the size cap');
            return self::snapshotOutcome(SnapshotJwsVerifier::UNAVAILABLE, 'response_too_large');
        }
        $jws = trim($body);
        if ($status !== 200 || $jws === '') {
            $this->logger->warning("[trusteed] snapshot HTTP {$status}");
            return self::snapshotOutcome(SnapshotJwsVerifier::UNAVAILABLE, 'http_' . $status);
        }

        // Signature verified against the platform JWKS;
        // tampered vs unavailable, with one forced JWKS re-download.
        $result = SnapshotJwsVerifier::verify(
            $jws,
            fn (bool $force): array => $this->fetchJwks($force),
            new JwksRetryVerdictStore($this->cache, $apiBase, fn (): int => $this->now())
        );
        if ($result['status'] !== SnapshotJwsVerifier::OK) {
            $this->logger->warning(sprintf('[trusteed] snapshot %s (%s)', $result['status'], $result['detail']));
            return $result;
        }
        // The signed `validUntil`: an expired snapshot is absent.
        if ($this->isSnapshotStale((array) $result['payload'])) {
            $this->logger->warning('[trusteed] snapshot stale (validUntil in the past), applying fallback policy');
            return self::snapshotOutcome(SnapshotJwsVerifier::UNAVAILABLE, 'stale');
        }
        return $result;
    }

    /** @return array{status:string, payload:null, detail:string} */
    private static function snapshotOutcome(string $status, string $detail): array
    {
        return ['status' => $status, 'payload' => null, 'detail' => $detail];
    }

    /**
     * Call POST /v1/agent-events/nonce-consume to record a single-use
     * agent-token jti (replay protection).
     *
     * Mirrors the WooCommerce and PrestaShop nonce calls. Reuses
     * the Stripe-style HMAC signing helper already used by evaluate().
     *
     *   200 = ACCEPTED  (nonce stored)
     *   409 = REPLAY    (nonce already seen, token must be downgraded)
     *   timeout / 5xx / 4xx = INDETERMINATE  (caller maps per failure_mode)
     *
     * @param string $agentDid Verified agent DID from token iss/kid claim.
     * @param string $jti      Single-use nonce, base64url 16-128 chars.
     * @param int    $exp      Token exp (unix seconds). Used as TTL upper bound.
     * @return array{outcome:string,reason:string,httpStatus:int|null}
     */
    public function consumeNonce(string $agentDid, string $jti, int $exp): array
    {
        $apiBase        = $this->getApiBase();
        $installationId = $this->getInstallationId();
        $hmacSecret     = $this->getHmacSecret();
        $merchantId     = (string)($this->scopeConfig->getValue('trusteed_general/general/merchant_id') ?? '');

        $apiBase = rtrim($apiBase, '/');

        if ($apiBase === '' || $installationId === '') {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'config_missing', 'httpStatus' => null];
        }
        // See evaluate() for rationale. Distinguish "HMAC secret step
        // of setup skipped" from the generic config_missing reason so ops can
        // tell the two setup gaps apart in logs/metrics.
        if ($hmacSecret === '') {
            $this->logger->warning('[trusteed] nonce-consume skipped: HMAC secret not configured (installation incomplete)');
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'hmac_secret_missing', 'httpStatus' => null];
        }

        // SSRF + HTTPS guard. A rejected URL maps to INDETERMINATE so the
        // caller honours failure_mode (enforce: token treated INVALID).
        if (!$this->isOutboundAuthorized($apiBase)) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'ssrf_guard_rejected', 'httpStatus' => null];
        }

        $rawBody = json_encode([
            'merchantId'     => $merchantId,
            'installationId' => $installationId,
            'agentId'        => $agentDid,
            'nonce'          => $jti,
            'expiresAt'      => gmdate(
                'Y-m-d\TH:i:s\Z',
                $exp > 0 ? $exp : (time() + 300)
            ),
        ]);
        if ($rawBody === false) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'json_encode_failed', 'httpStatus' => null];
        }

        $url = rtrim($apiBase, '/') . '/v1/agent-events/nonce-consume';

        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('X-Trusteed-Installation-Id', $installationId);
            $this->curl->addHeader('X-Trusteed-Signature', $this->buildSignature($rawBody, $hmacSecret));
            $this->curl->post($url, $rawBody);
        } catch (\Exception $e) {
            $this->logger->warning('[trusteed] nonce-consume error: ' . $e->getMessage());
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'network_error', 'httpStatus' => null];
        }

        $status = (int)$this->curl->getStatus();
        if ($status === 200) {
            return ['outcome' => NonceOutcome::ACCEPTED, 'reason' => 'ok', 'httpStatus' => $status];
        }
        if ($status === 409) {
            return ['outcome' => NonceOutcome::REPLAY, 'reason' => 'replay_detected', 'httpStatus' => $status];
        }
        if ($status >= 500) {
            return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'http_5xx', 'httpStatus' => $status];
        }
        return ['outcome' => NonceOutcome::INDETERMINATE, 'reason' => 'http_4xx', 'httpStatus' => $status];
    }

    /**
     * Previously returned a placeholder
     * "t=...,s=dev-bypass" signature when `$secret` was empty, a header
     * that LOOKS signed but isn't, sent silently to the enforcement API.
     * All three call sites (evaluate/pullSnapshot/consumeNonce) now
     * short-circuit before ever reaching this method when the HMAC secret is
     * unconfigured, matching the existing "unconfigured connector → never
     * block" fail-open posture used elsewhere in this file. This method
     * additionally refuses to fabricate a signature as a defense-in-depth
     * backstop, in case a future caller forgets to guard.
     *
     * @throws \RuntimeException when $secret is empty.
     */
    private function buildSignature(string $rawBody, string $secret): string
    {
        if ($secret === '') {
            throw new \RuntimeException('buildSignature() called without an HMAC secret configured');
        }
        $ts  = time();
        $hex = hash_hmac('sha256', "{$ts}.{$rawBody}", $secret);
        return "t={$ts},s={$hex}";
    }

    /**
     * Has the snapshot passed its signed freshness window?
     *
     * `validUntil` travels INSIDE the signed payload, so an attacker cannot
     * extend it. A missing or unreadable value is NOT treated as "current": a
     * snapshot from our server always carries it, and without it there is no
     * way to know whether it expired. {@see SnapshotJwsVerifier} rejects it
     * earlier (`valid_until_*`); this is the same rule, in case a payload
     * arrives by another path. Mirrors the PrestaShop payload decoder.
     */
    private function isSnapshotStale(array $payload): bool
    {
        return !SnapshotPayloadDecoder::isUsable($payload, time());
    }

    /**
     * Fetch + cache (per-request) the platform JWKS as kid => raw Ed25519
     * public key. Returns an empty map on any transport/parse failure (the
     * snapshot is then `unavailable`, never `tampered`). `$force` skips the
     * cache once (a key rotation must not look like tampering); a failed
     * forced download leaves the cache as it was.
     *
     * @return array<string, string>
     */
    private function fetchJwks(bool $force = false): array
    {
        $apiBase = rtrim($this->getApiBase(), '/');
        if (!$force && isset($this->jwksCache[$apiBase])) {
            return $this->jwksCache[$apiBase];
        }
        // Current copy across requests (300 s); a forced retry skips it.
        $positive = new JwksPositiveCache($this->cache, $apiBase, fn (): int => $this->now());
        if (!$force) {
            $copy = $positive->read();
            if ($copy !== []) {
                return $this->jwksCache[$apiBase] = $copy;
            }
        }

        $keys = [];
        try {
            $this->curl->setTimeout(self::TIMEOUT_SECONDS);
            $this->applyTlsHardening();
            $this->curl->addHeader('Accept', 'application/json');
            $this->curl->get($apiBase . '/.well-known/jwks.json');

            $jwksBody = (string)$this->curl->getBody();
            if ((int)$this->curl->getStatus() === 200 && strlen($jwksBody) <= self::MAX_RESPONSE_BYTES) {
                $data = json_decode($jwksBody, true);
                foreach ((is_array($data) ? ($data['keys'] ?? []) : []) as $key) {
                    if (!is_array($key)) {
                        continue;
                    }
                    if (($key['kty'] ?? '') !== 'OKP' || ($key['crv'] ?? '') !== 'Ed25519') {
                        continue;
                    }
                    if (empty($key['kid']) || empty($key['x'])) {
                        continue;
                    }
                    $raw = SnapshotJwsVerifier::b64urlDecode((string)$key['x']);
                    if ($raw !== false && strlen($raw) === SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES) {
                        $keys[(string)$key['kid']] = $raw;
                    }
                }
            }
        } catch (\Exception $e) {
            $this->logger->warning('[trusteed] jwks fetch error: ' . $e->getMessage());
        }

        if (!$force || $keys !== []) {
            $this->jwksCache[$apiBase] = $keys;
        }
        $positive->write($keys); // the fresh download REPLACES the copy; an empty result is not stored
        return $keys;
    }

    private function getApiBase(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed_general/general/api_base_url') ?? '');
    }

    private function getInstallationId(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed/enforcement/installation_id') ?? '');
    }

    private function getHmacSecret(): string
    {
        return (string)($this->scopeConfig->getValue('trusteed/enforcement/hmac_secret') ?? '');
    }
}
