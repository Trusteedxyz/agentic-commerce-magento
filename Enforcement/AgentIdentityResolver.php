<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Resolves the agent identity of a checkout in Magento.
 *
 * Earlier code read two session keys (`trusteed_agent_did`,
 * `trusteed_agent_token`) that nothing ever wrote, so every checkout looked
 * organic. The order is placed over REST
 * (`/V1/guest-carts/:id/payment-information`), from both the Luma checkout and
 * the WebMCP bridge, so the signal travels in headers of that request. The
 * session is still read as a fallback.
 *
 * Threat model: any client can set these headers, so they may only tighten
 * treatment, never relax it.
 *
 * - No `X-Trusteed-Agent-*` header with a value (and no session) means human.
 * - Any of them with a value means agent, valid or not. A DID or token that is
 *   malformed or too long is dropped (it is neither forwarded nor recorded) but
 *   the checkout is still treated as agentic. A rejected token is flagged in
 *   `tokenRejected` so the observer treats it as an invalid token.
 * - A well-formed DID is NOT authenticated: only the token verifies it. It is
 *   the same kind of signal as the `?agent_id=` parameter in WooCommerce.
 *   Without a VALID token for that DID it is not sent as `agentId` (see
 *   bindToken()).
 * - A third party posing as an agent on someone else's purchase would have to
 *   add headers to the buyer's REST request, which only code already running
 *   in the buyer's browser (XSS, an extension) can do. Even then it only
 *   subjects the purchase to the agent rules; it unlocks nothing.
 *
 * No framework dependencies, so it can be tested without Magento.
 *
 * @since 1.3.5
 */
final class AgentIdentityResolver
{
    public const HEADER_AGENT_TOKEN  = 'X-Trusteed-Agent-Token';
    public const HEADER_AGENT_ID     = 'X-Trusteed-Agent-Id';
    public const HEADER_AGENT_ORIGIN = 'X-Trusteed-Agent-Origin';

    /** Length ceiling, applied before any regular expression. */
    public const MAX_DID_LENGTH   = 512;
    public const MAX_TOKEN_LENGTH = 8192;

    private const AGENT_DID_RE = '/^did:(web|key):[A-Za-z0-9._:\-]+$/';
    private const JWS_RE       = '/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]*$/';

    /**
     * @param array<string,mixed> $headers Request headers (name to value).
     * @return array{did:string, token:string, agentic:bool, tokenRejected:bool}
     */
    public static function resolve(array $headers, string $sessionDid, string $sessionToken): array
    {
        $h         = array_change_key_case($headers, CASE_LOWER);
        $rawDid    = self::headerValue($h, self::HEADER_AGENT_ID);
        $rawToken  = self::headerValue($h, self::HEADER_AGENT_TOKEN);
        $rawOrigin = self::headerValue($h, self::HEADER_AGENT_ORIGIN);

        $headerDid   = self::accept($rawDid, self::MAX_DID_LENGTH, self::AGENT_DID_RE);
        $headerToken = self::accept($rawToken, self::MAX_TOKEN_LENGTH, self::JWS_RE);

        $did           = $headerDid !== '' ? $headerDid : $sessionDid;
        $token         = $headerToken !== '' ? $headerToken : $sessionToken;
        $tokenRejected = $rawToken !== '' && $headerToken === '';

        return [
            'did'           => $did,
            'token'         => $token,
            'agentic'       => FailurePolicy::isAgentic(
                $did === '' ? null : $did,
                $token !== '' || $tokenRejected,
                $rawOrigin !== '' || $rawDid !== ''
            ),
            'tokenRejected' => $tokenRejected,
        ];
    }

    /**
     * The three Trusteed headers of the request that places the order.
     * `Magento\Framework\App\RequestInterface` does not declare getHeader();
     * the HTTP/REST implementations do (hence method_exists). No request, or
     * one without getHeader(), yields [] and the caller falls back to the
     * session. Values are never logged. May throw whatever getHeader() throws.
     *
     * @return array<string,string>
     */
    public static function readHeaders(?object $request): array
    {
        if ($request === null || !method_exists($request, 'getHeader')) {
            return [];
        }
        $out = [];
        foreach ([self::HEADER_AGENT_ID, self::HEADER_AGENT_TOKEN, self::HEADER_AGENT_ORIGIN] as $name) {
            $value = $request->getHeader($name);
            if (is_string($value) && $value !== '') {
                $out[$name] = $value;
            }
        }
        return $out;
    }

    /**
     * Ties the verified token to the declared DID.
     *
     * `did` is ONLY the identity a VALID token proves ('' otherwise). A declared
     * DID never travels as `agentId` on its own: the server and the local
     * history projection key the agent's history on it, so a declared-only DID
     * would let an agent inherit another DID's history or burn a victim's. The
     * caller sends such a checkout as an ANONYMOUS agent (`agentId: null`,
     * `endpointClass: agentic_endpoint`).
     *
     * - Token VALID but for a different DID than the declared one: INVALID, no DID.
     * - Token VALID and no declared DID: the token's (verified) DID.
     * - Token not VALID (INVALID, INDETERMINATE): no DID.
     *
     * @return array{state:string, did:string, mismatch:bool}
     */
    public static function bindToken(string $declaredDid, string $tokenState, string $tokenDid): array
    {
        if ($tokenState !== 'valid') {
            return ['state' => $tokenState, 'did' => '', 'mismatch' => false];
        }
        if ($tokenDid === '') {
            return ['state' => 'invalid', 'did' => '', 'mismatch' => false];
        }
        if ($declaredDid === '' || $tokenDid === $declaredDid) {
            return ['state' => 'valid', 'did' => $tokenDid, 'mismatch' => false];
        }
        return ['state' => 'invalid', 'did' => '', 'mismatch' => true];
    }

    /** @param array<string,mixed> $lowerCased */
    private static function headerValue(array $lowerCased, string $name): string
    {
        $value = $lowerCased[strtolower($name)] ?? '';
        return is_string($value) ? trim($value) : '';
    }

    private static function accept(string $value, int $maxLength, string $pattern): string
    {
        if ($value === '' || strlen($value) > $maxLength) {
            return '';
        }
        return preg_match($pattern, $value) === 1 ? $value : '';
    }
}
