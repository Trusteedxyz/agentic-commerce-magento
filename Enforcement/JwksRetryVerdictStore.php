<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Magento\Framework\App\CacheInterface;

/**
 * Plan 04 Task 29c (L3) — caché negativa (60 s) del reintento forzado del JWKS
 * de {@see SnapshotJwsVerifier}.
 *
 * Magento no guarda nada entre peticiones salvo lo que pida a `CacheInterface`:
 * sin esto, cada checkout con un snapshot que no verifica volvía a descargar el
 * JWKS una segunda vez. La entrada es única por servidor y recuerda el
 * veredicto del ÚLTIMO reintento que no verificó y para qué `kid`: un `kid`
 * distinto (rotación real) no la hereda, y `kid`s inventados no llenan la caché.
 *
 * Tolerante a fallos: sin caché (null), con caché que lanza o con basura, todo
 * se comporta como antes (se reintenta). El reloj es un cierre para los tests.
 *
 * @since 1.3.5
 */
final class JwksRetryVerdictStore
{
    public const TTL_SECONDS = 60;

    /** @param \Closure():int $now */
    public function __construct(
        private readonly ?CacheInterface $cache,
        private readonly string $apiBase,
        private readonly \Closure $now
    ) {
    }

    /** @return string|null `tampered`|`unavailable` mientras la entrada sea de este `kid` y siga vigente. */
    public function read(string $kid): ?string
    {
        if ($this->cache === null) {
            return null;
        }
        try {
            $raw   = $this->cache->load($this->key());
            $entry = is_string($raw) ? json_decode($raw, true) : null;
        } catch (\Throwable) {
            return null;
        }
        if (
            !is_array($entry)
            || ($entry['kid'] ?? null) !== $kid
            || !in_array($entry['verdict'] ?? null, [SnapshotJwsVerifier::TAMPERED, SnapshotJwsVerifier::UNAVAILABLE], true)
            || (int) ($entry['until'] ?? 0) <= ($this->now)()
        ) {
            return null;
        }

        return (string) $entry['verdict'];
    }

    public function remember(string $kid, string $verdict): void
    {
        if ($this->cache === null) {
            return;
        }
        try {
            $this->cache->save(
                (string) json_encode(['kid' => $kid, 'verdict' => $verdict, 'until' => ($this->now)() + self::TTL_SECONDS]),
                $this->key(),
                [],
                self::TTL_SECONDS
            );
        } catch (\Throwable) {
            // Sin caché negativa el siguiente checkout reintenta, como antes.
        }
    }

    private function key(): string
    {
        return 'trusteed_jwks_retry_' . md5($this->apiBase);
    }
}
