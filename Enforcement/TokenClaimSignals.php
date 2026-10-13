<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Trusteed\AgenticCommerce\Service\CartSignals;

/**
 * Signals derived from the claims of the agent token: R013
 * (`_return_policy_mismatch`), R008 (`_requested_scopes`) and R006
 * (`_provider_confidence`). The observer writes the keys; this class only
 * computes the values (the `signalsProvided` gate requires the writes to stay
 * in the observer's constructor).
 *
 * Only the claims of a VALID token count (`claims` from
 * `AgentTokenVerifier::verify()`). Decoding the payload of an invalid or
 * INDETERMINATE token would let an agent without a valid signature declare
 * `return_policy: final_sale` to dodge R013, or make up its
 * `_provider_confidence`. For any other token the values are computed as if it
 * carried no claims: R013 flags the mismatch when the cart holds a virtual
 * product, and there are no scopes and no confidence.
 *
 * @since 1.3.5
 */
final class TokenClaimSignals
{
    /**
     * @param array<string,mixed> $verifiedClaims   Claims of a VALID token; [] otherwise.
     * @param bool                $hasFinalSaleItem The cart holds a `virtual` product.
     * @return array{mismatch:bool, scopes:string, confidence:?string}
     */
    public static function project(array $verifiedClaims, bool $hasFinalSaleItem): array
    {
        $policy = $verifiedClaims['return_policy'] ?? '';
        $policy = is_scalar($policy) ? strtolower((string) $policy) : '';

        $rawScope = $verifiedClaims['scope'] ?? ($verifiedClaims['scopes'] ?? '');
        $scopes   = is_string($rawScope) || is_array($rawScope) ? CartSignals::normalizeScopes($rawScope) : [];

        return [
            'mismatch'   => $hasFinalSaleItem && $policy !== 'final_sale',
            'scopes'     => implode(',', $scopes),
            'confidence' => $verifiedClaims === [] ? null : CartSignals::extractProviderConfidence($verifiedClaims),
        ];
    }

    /** @param iterable<object> $items Visible quote lines. */
    public static function hasFinalSaleItem(iterable $items): bool
    {
        foreach ($items as $item) {
            $product = method_exists($item, 'getProduct') ? $item->getProduct() : null;
            if ($product !== null && $product->getTypeId() === 'virtual') {
                return true;
            }
        }
        return false;
    }
}
