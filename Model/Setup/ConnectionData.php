<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Setup;

/**
 * Datos que el asistente guarda tras canjear el código de conexión (función pura, sin Magento).
 *
 * Reúne en un sitio lo que antes estaba disperso en `Save.php` para poder probarlo: en una instalación
 * limpia faltaba el token de integración que el propio módulo crea, y sin él el Inicio y el panel decían
 * «Aún no has conectado tu tienda» y la cola de envíos no podía autenticarse.
 */
final class ConnectionData
{
    /**
     * @param array<string, mixed>                                       $data        lo que trae el formulario
     * @param array{connection_id: string, webhook_secret: string, embed_secret: string, store_id: string} $exchanged
     * @param string                                                     $integrationToken token de integración creado por el módulo
     * @param array{installation_id: string, hmac_secret: string}|null   $provisioned credenciales de enforcement, si se pudieron pedir
     *
     * @return array<string, mixed>
     */
    public static function afterExchange(array $data, array $exchanged, string $integrationToken, ?array $provisioned): array
    {
        $data['connection_id'] = $exchanged['connection_id'];
        $data['webhook_secret'] = $exchanged['webhook_secret'];
        $data['embed_secret'] = $exchanged['embed_secret'];

        // Se guarda cifrado después; un valor vacío NUNCA pisa uno ya guardado.
        if ($integrationToken !== '') {
            $data['integration_token'] = $integrationToken;
        }

        // La instalación de enforcement y /v1/rules/* pertenecen a la TIENDA de Trusteed, no al comerciante.
        // Una API anterior no devuelve `store_id`: entonces se conserva el que mandó el formulario.
        if ($exchanged['store_id'] !== '') {
            $data['merchant_id'] = $exchanged['store_id'];
        }

        if ($provisioned !== null) {
            $data['enforcement_installation_id'] = $provisioned['installation_id'];
            $data['enforcement_hmac_secret'] = $provisioned['hmac_secret'];
        }

        // El código de un solo uso no se conserva en ninguna rama posterior.
        unset($data['connect_token']);

        return $data;
    }
}
