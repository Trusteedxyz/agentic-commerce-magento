<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Hash de identidad del agente por comerciante, idéntico al del servidor.
 *
 * El servidor guarda `checkout_failure_events.agentIdHash` y filtra el recuento
 * de `GET /api/v1/checkout-failures/count` con
 * `hashAgentIdPerMerchant(agentId, merchantId)` =
 * `sha256(agentId . merchantId)`: concatenación directa, SIN separador, en ese
 * orden, UTF-8, hex en minúsculas
 * (`packages/shared/src/enforcement/agent-id-hash.ts`). `merchantId` es el
 * mismo que este módulo envía en el cuerpo de `/checkout-failures`
 * (`trusteed_general/general/merchant_id`); el servidor lo toma del cuerpo y
 * lo contrasta con el de la instalación.
 *
 * Enviar `sha256(agentId)` a secas (lo que hacía 1.3.5 antes de este arreglo)
 * no casa con ninguna fila: el recuento de R011 salía siempre 0 con HTTP 200.
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
