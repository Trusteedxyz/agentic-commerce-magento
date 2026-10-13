<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Main-flow failure policy. PHP port of
 * the reference platform flow, pinned by
 * Test/fixtures/platform-flow-conformance.json
 * (Test/Unit/Enforcement/FailurePolicyConformanceTest.php).
 *
 * Invariant: a human buyer (a checkout with no agentic signal) is never blocked
 * by a failure on our side (network, 5xx, any 4xx including 429, timeout,
 * unreadable response, internal exception). Only a merchant rule with
 * `appliesTo: ALL` or `HUMAN` that the offline valve still evaluates can block
 * them (the R030 cap, countries, schedule, and so on). The merchant's
 * `failure_mode` only governs agentic checkouts.
 *
 * Magento evaluates no rule locally before asking the server, so the
 * reference's fourth decision (`needsServerEvaluation`) has no port here. It
 * also ports the per-cause degraded decision (decideDegraded) and the DID
 * resolver (resolveAgentDidPublicKey).
 *
 * Pure functions: no Magento, no I/O. They do not mutate their parameters (PHP
 * passes arrays by value and only copies are filtered here).
 *
 * @since 1.3.5
 */
final class FailurePolicy
{
    /** Vocabulary of `trusteed/enforcement/failure_mode` in this module (same as the fixture). */
    public const FAILURE_MODES = ['enforce', 'observe'];

    /** Value a MISSING `failure_mode` takes (the module's historical default). */
    public const DEFAULT_FAILURE_MODE = 'enforce';

    /**
     * Modes that OPEN for an agent during a failure, compared exactly. This is
     * the reference's GLOBAL list (`AGENT_OPENING_FAILURE_MODES`), which is why
     * the module first normalizes against ITS OWN vocabulary
     * (normalizeFailureMode), so a `balanced` or `permissive` from another
     * platform does not open here.
     */
    public const AGENT_OPENING_FAILURE_MODES = ['observe', 'balanced', 'permissive'];

    /**
     * Any signal that only our side or the agent sets means agentic. A
     * presented token counts even if it does not verify: it is never treated as
     * human.
     *
     * @param string|null $agentId      Agent DID; '' counts as missing.
     * @param bool        $tokenPresent An agent token was presented.
     * @param bool        $originMarker Origin marker (X-Trusteed-Agent-* header).
     */
    public static function isAgentic(?string $agentId, bool $tokenPresent, bool $originMarker): bool
    {
        return ($agentId !== null && $agentId !== '') || $tokenPresent || $originMarker;
    }

    /**
     * Rules the offline valve may apply, in the order received and reindexed.
     * `appliesTo` is case-insensitive.
     *
     * - Agent: all except `HUMAN` (a missing `appliesTo` included).
     * - Human: only `ALL` and `HUMAN`; missing does not count (when in doubt,
     *   never block a person).
     *
     * @param array<int,mixed> $rules `rules[]` of the signed snapshot.
     * @return array<int,array<string,mixed>>
     */
    public static function offlineRulesFor(array $rules, bool $isAgentic): array
    {
        return array_values(array_filter(
            $rules,
            static function ($rule) use ($isAgentic): bool {
                if (!is_array($rule)) {
                    return false;
                }
                $appliesTo = strtoupper((string) ($rule['appliesTo'] ?? ''));
                return $isAgentic
                    ? $appliesTo !== 'HUMAN'
                    : ($appliesTo === 'ALL' || $appliesTo === 'HUMAN');
            }
        ));
    }

    /**
     * Resolves the configured mode against THIS module's vocabulary: trims and
     * lowercases. Missing or empty gives DEFAULT_FAILURE_MODE. A value outside
     * FAILURE_MODES (for example `permissive` from another platform) gives
     * null, meaning "unresolved", which decideUnavailable() closes for an agent.
     *
     * @param mixed $raw Configured value (untrusted).
     */
    public static function normalizeFailureMode($raw): ?string
    {
        $normalized = strtolower(trim(is_scalar($raw) ? (string) $raw : ''));
        if ($normalized === '') {
            return self::DEFAULT_FAILURE_MODE;
        }
        return in_array($normalized, self::FAILURE_MODES, true) ? $normalized : null;
    }

    /**
     * The server did not answer (or there is no readable policy). The offline
     * valve, already filtered with offlineRulesFor(), blocks anyone. Without it
     * a human ALWAYS passes, and an agent gets the merchant's mode: it opens
     * only for a mode in AGENT_OPENING_FAILURE_MODES and closes for any other
     * value, null included. It does not normalize (like the reference): the
     * caller passes the value from normalizeFailureMode().
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideUnavailable(bool $isAgentic, ?string $failureMode, bool $offlineBlock): string
    {
        if ($offlineBlock) {
            return 'BLOCK';
        }
        if (!$isAgentic) {
            return 'ALLOW';
        }
        return $failureMode !== null && in_array($failureMode, self::AGENT_OPENING_FAILURE_MODES, true)
            ? 'ALLOW'
            : 'BLOCK';
    }

    /**
     * An exception of OURS during evaluation (not a rule, not the network). A
     * human is never blocked by it. An agent is never let through in any mode,
     * because our own failure is not a permission, not even with `observe` or
     * any mode that opens when the service is down. Same as
     * `decide_on_internal_error` in Odoo, `InternalErrorGuard` in PrestaShop and
     * `CEL-INTERNAL-ERROR` in WooCommerce. It does not read the configuration:
     * the decision does not depend on the mode.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideOnInternalError(bool $isAgentic): string
    {
        return $isAgentic ? 'BLOCK' : 'ALLOW';
    }

    /**
     * The history of a VERIFIED agent could not be read (network, non-200,
     * unreadable body). This is "history unavailable", the same class as "the
     * evaluator did not answer", so the merchant's mode decides exactly as
     * {@see decideUnavailable()} does for an agent: `enforce` (and any
     * unresolved value) closes, `observe` opens and continues without the
     * signal. It never turns into "0 failures" nor silently into "no signal".
     * It is only called for an agent with a valid token: a human is neither
     * asked nor blocked for this read.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideOnHistoryUnavailable(?string $failureMode): string
    {
        return self::decideDegraded(self::KIND_EVALUATOR_UNAVAILABLE, true, true, $failureMode, false);
    }

    /** Causes of a degraded layer (the reference's `PlatformDegradedKind`). */
    public const KIND_INVALID_SIGNATURE     = 'invalid_signature';
    public const KIND_MISSING_SNAPSHOT      = 'missing_snapshot';
    public const KIND_EVALUATOR_UNAVAILABLE = 'evaluator_unavailable';
    public const KIND_LAYER_DISABLED        = 'layer_disabled';

    /**
     * Literal port of `decideOnDegradedEnforcement`.
     * For an agent: tampered snapshot gives BLOCK in every mode; no snapshot
     * with a token gives BLOCK in every mode (without the snapshot's resolver
     * the token cannot be verified); no snapshot and no token follows the mode;
     * layer 2 down with a VERIFIED snapshot follows the mode and the valve;
     * layer disabled or unconfigured gives ALLOW. A human is only closed by the
     * valve of a verified snapshot. An unknown cause is treated as
     * `invalid_signature`.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideDegraded(
        string $kind,
        bool $isAgentic,
        bool $tokenPresent,
        ?string $failureMode,
        bool $offlineBlock
    ): string {
        $isAgentic = $isAgentic || $tokenPresent;
        switch ($kind) {
            case self::KIND_LAYER_DISABLED:
                return 'ALLOW';
            case self::KIND_EVALUATOR_UNAVAILABLE:
                return self::decideUnavailable($isAgentic, $failureMode, $offlineBlock);
            case self::KIND_MISSING_SNAPSHOT:
                if (!$isAgentic) {
                    return 'ALLOW';
                }
                return $tokenPresent ? 'BLOCK' : self::decideUnavailable(true, $failureMode, false);
            default:
                return $isAgentic ? 'BLOCK' : 'ALLOW';
        }
    }

    /**
     * Port of `resolveAgentDidPublicKey`: the public key of `$did` in the
     * snapshot's `agentDidResolver`. The server emits a LIST
     * `[{did, publicKeyJwk:{kty,crv,x,kid?}}]`: the LAST well-formed entry with
     * an exact `did` wins, and a later malformed one no longer overrides a good
     * one. It also accepts the legacy MAP `{did: jwk}` (exact key only). It
     * never throws. It only resolves: `kty`/`crv` and the signature belong to
     * the verifier.
     *
     * @param mixed $resolver The snapshot's `agentDidResolver` as is.
     * @return array{x:string,kty?:string,crv?:string,kid?:string}|null
     */
    public static function resolveAgentDidPublicKey($resolver, string $did): ?array
    {
        if ($did === '' || !is_array($resolver)) {
            return null;
        }
        if ($resolver !== [] && array_is_list($resolver)) {
            $found = null;
            foreach ($resolver as $entry) {
                if (!self::isJsonObject($entry) || ($entry['did'] ?? null) !== $did) {
                    continue;
                }
                $found = self::toAgentPublicKey($entry['publicKeyJwk'] ?? null) ?? $found;
            }
            return $found;
        }
        return array_key_exists($did, $resolver) ? self::toAgentPublicKey($resolver[$did]) : null;
    }

    /** @param mixed $value */
    private static function isJsonObject($value): bool
    {
        return is_array($value) && ($value === [] || !array_is_list($value));
    }

    /**
     * @param mixed $jwk
     * @return array{x:string,kty?:string,crv?:string,kid?:string}|null
     */
    private static function toAgentPublicKey($jwk): ?array
    {
        if (!self::isJsonObject($jwk) || !is_string($jwk['x'] ?? null) || $jwk['x'] === '') {
            return null;
        }
        $key = ['x' => $jwk['x']];
        foreach (['kty', 'crv', 'kid'] as $field) {
            if (is_string($jwk[$field] ?? null)) {
                $key[$field] = $jwk[$field];
            }
        }
        return $key;
    }
}
