<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Magento\Framework\App\CacheInterface;

/**
 * Negative cache (60 s) for the forced JWKS retry of {@see SnapshotJwsVerifier}.
 *
 * Magento keeps nothing between requests except what it asks of
 * `CacheInterface`. Without this, every checkout with a snapshot that fails to
 * verify downloaded the JWKS a second time. There is one entry per server. It
 * remembers the verdict of the LAST retry that failed to verify and for which
 * `kid`: a different `kid` (a real rotation) does not inherit it, and made-up
 * `kid`s cannot fill the cache.
 *
 * Failure tolerant: with no cache (null), a cache that throws, or garbage
 * content, everything behaves as before (the retry happens). The clock is a
 * closure so tests can control it.
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

    /** @return string|null `tampered`|`unavailable` while the entry is for this `kid` and still current. */
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
            // Without the negative cache the next checkout retries, as before.
        }
    }

    private function key(): string
    {
        return 'trusteed_jwks_retry_' . md5($this->apiBase);
    }
}
