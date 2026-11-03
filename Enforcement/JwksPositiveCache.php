<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Magento\Framework\App\CacheInterface;

/**
 * Task 38b (3) — caché POSITIVA (300 s) del JWKS de la plataforma entre
 * peticiones.
 *
 * Magento construye el cliente de enforcement por petición y sólo conserva lo
 * que se pida a `CacheInterface`: sin esto cada checkout con token descargaba
 * el JWKS entero (una llamada de red más, hasta 5 s de espera) para verificar
 * el snapshot. La entrada es única por servidor (`api_base_url`) y guarda
 * `kid => clave Ed25519 en bruto` con su propio vencimiento, de modo que un
 * almacén que no expira por TTL tampoco la sirve pasada de hora.
 *
 * Esta caché NO decide nada de seguridad: el que manda sigue siendo el
 * verificador. Una verificación que no cuadra con la copia (un `kid` que no
 * está —rotación—, o una firma que no verifica) fuerza UNA re-descarga
 * ({@see SnapshotJwsVerifier}), sujeta a la caché negativa de 60 s por `kid`
 * ({@see JwksRetryVerdictStore}); lo descargado SUSTITUYE a la copia. Una
 * re-descarga fallida la deja como estaba.
 *
 * Coste conocido: una clave retirada del JWKS sigue verificando hasta 5 minutos.
 *
 * Tolerante a fallos, como la negativa: sin caché (null), con caché que lanza o
 * con basura, se comporta como antes (se descarga). El reloj es un cierre para
 * los tests.
 *
 * @since 1.3.5
 */
final class JwksPositiveCache
{
    public const TTL_SECONDS = 300;

    /** Longitud de una clave pública Ed25519 en bruto (SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES). */
    private const KEY_BYTES = 32;

    /** @param \Closure():int $now */
    public function __construct(
        private readonly ?CacheInterface $cache,
        private readonly string $apiBase,
        private readonly \Closure $now
    ) {
    }

    /** @return array<string,string> `kid => clave en bruto`; [] = no hay copia vigente y válida. */
    public function read(): array
    {
        if ($this->cache === null) {
            return [];
        }
        try {
            $raw   = $this->cache->load($this->key());
            $entry = is_string($raw) ? json_decode($raw, true) : null;
        } catch (\Throwable) {
            return [];
        }
        if (!is_array($entry) || (int) ($entry['until'] ?? 0) <= ($this->now)() || !is_array($entry['keys'] ?? null)) {
            return [];
        }
        $keys = [];
        foreach ($entry['keys'] as $kid => $b64) {
            $rawKey = is_string($b64) ? base64_decode($b64, true) : false;
            if (!is_string($kid) || $kid === '' || $rawKey === false || strlen($rawKey) !== self::KEY_BYTES) {
                return []; // una entrada a medias no se sirve: se vuelve a descargar entera
            }
            $keys[$kid] = $rawKey;
        }

        return $keys;
    }

    /** @param array<string,string> $keys `kid => clave en bruto`; vacío no se guarda. */
    public function write(array $keys): void
    {
        if ($this->cache === null || $keys === []) {
            return;
        }
        try {
            $this->cache->save(
                (string) json_encode([
                    'until' => ($this->now)() + self::TTL_SECONDS,
                    'keys'  => array_map(static fn (string $raw): string => base64_encode($raw), $keys),
                ]),
                $this->key(),
                [],
                self::TTL_SECONDS
            );
        } catch (\Throwable) {
            // Sin copia el siguiente checkout descarga, como antes.
        }
    }

    private function key(): string
    {
        return 'trusteed_jwks_pos_' . md5($this->apiBase);
    }
}
