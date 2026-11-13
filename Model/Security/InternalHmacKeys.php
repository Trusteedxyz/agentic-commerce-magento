<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Security;

use Trusteed\AgenticCommerce\Model\Config\SecretReader;

/**
 * Claves con las que el módulo firma sus peticiones internas a Trusteed (manifiesto del catálogo,
 * heartbeat de retraso, evento de instalación).
 *
 * Antes se firmaba con un «Internal HMAC Secret» GLOBAL de la plataforma que ningún comerciante
 * podía obtener, así que «Catálogo publicado» y el heartbeat no funcionaban en una instalación
 * normal. Ahora la clave se deriva del `webhook_secret` de la conexión (que ya recibe el módulo al
 * conectar). El `internal_hmac_secret` antiguo queda como respaldo para instalaciones que lo
 * teclearon a mano y cuyo secreto no pasa por la bóveda de Trusteed.
 */
class InternalHmacKeys
{
    private const CONFIG_WEBHOOK_SECRET = 'trusteed_general/general/webhook_secret';
    private const CONFIG_LEGACY_SECRET = 'trusteed_general/general/internal_hmac_secret';

    public function __construct(
        private readonly SecretReader $secretReader,
        private readonly InternalHmacSigner $signer
    ) {
    }

    /**
     * Claves candidatas en orden de preferencia: la derivada de la conexión y, si existe, la antigua.
     *
     * @return list<string>
     */
    public function candidates(): array
    {
        $keys = [];
        $webhookSecret = $this->secretReader->read(self::CONFIG_WEBHOOK_SECRET);
        if ($webhookSecret !== '') {
            $keys[] = $this->signer->deriveConnectionKey($webhookSecret);
        }
        $legacy = $this->secretReader->read(self::CONFIG_LEGACY_SECRET);
        if ($legacy !== '' && !in_array($legacy, $keys, true)) {
            $keys[] = $legacy;
        }

        return $keys;
    }

    /**
     * Ejecuta `$attempt(clave): int` (estado HTTP) con la primera clave y, SOLO si la API responde
     * 401 y hay otra clave, reintenta UNA vez con la siguiente. Devuelve el último estado, o 0 si no
     * hay ninguna clave.
     *
     * @param callable(string): int $attempt
     */
    public function withFallback(callable $attempt): int
    {
        $keys = $this->candidates();
        $status = 0;
        foreach (array_slice($keys, 0, 2) as $i => $key) {
            $status = $attempt($key);
            if ($status !== 401 || !isset($keys[$i + 1])) {
                break;
            }
        }

        return $status;
    }
}
