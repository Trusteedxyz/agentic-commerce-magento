<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Per-merchant agent identity hash, identical to the one the server computes.
 *
 * The server stores `checkout_failure_events.agentIdHash` and filters the count
 * of `GET /api/v1/checkout-failures/count` with
 * `hashAgentIdPerMerchant(agentId, merchantId)`, which is
 * `sha256(agentId . merchantId)`: plain concatenation, no separator, in that
 * order, UTF-8, lowercase hex. `merchantId` is the same value this module sends
 * in the body of `/checkout-failures` (`trusteed_general/general/merchant_id`);
 * the server takes it from the body and checks it against the installation's.
 *
 * Sending a bare `sha256(agentId)` (what earlier versions did) matches no row,
 * so the R011 count always came back 0 with HTTP 200.
 *
 * @since 1.3.5
 */
final class AgentIdHash
{
    public static function perMerchant(string $agentDid, string $merchantId): string
    {
        return hash('sha256', $agentDid . $merchantId);
    }
}
