<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Trusteed\AgenticCommerce\Service\CartSignals;

/**
 * Señales que salen de los claims del token de agente: R013
 * (`_return_policy_mismatch`), R008 (`_requested_scopes`) y R006
 * (`_provider_confidence`). El observer escribe las claves; aquí sólo se
 * calculan los valores (el gate de `signalsProvided` exige que las escrituras
 * sigan en el constructor del observer).
 *
 * Task 23b (hallazgo abierto de la Task 16): el observer decodificaba el
 * payload del JWT aunque el token fuera inválido o INDETERMINATE, con un
 * comentario que decía «already-verified token». Un agente con un token sin
 * firma válida podía declarar `return_policy: final_sale` para esquivar R013 o
 * inventarse su `_provider_confidence`. Ahora sólo cuentan los claims de un
 * token VÁLIDO (`claims` de `AgentTokenVerifier::verify()`); para cualquier
 * otro se calcula como si no trajera claims: R013 marca la discrepancia si el
 * carrito lleva un producto virtual, y no hay scopes ni confianza.
 *
 * @since 1.3.5
 */
final class TokenClaimSignals
{
    /**
     * @param array<string,mixed> $verifiedClaims   Claims de un token VÁLIDO; [] si no lo es.
     * @param bool                $hasFinalSaleItem El carrito lleva un producto `virtual`.
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

    /** @param iterable<object> $items Líneas visibles del quote. */
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
