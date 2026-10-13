<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

use Magento\Framework\App\CacheInterface;

/**
 * POSITIVE cache (300 s) of the platform JWKS, shared between requests.
 *
 * Magento builds the enforcement client per request and only keeps what it
 * asks of `CacheInterface`. Without this, every checkout with a token
 * downloaded the whole JWKS (one more network call, up to 5 s of waiting) to
 * verify the snapshot. There is one entry per server (`api_base_url`). It holds
 * `kid => raw Ed25519 key` with its own expiry, so a store that does not
 * expire entries by TTL still will not serve it past its time.
 *
 * This cache decides nothing about security: the verifier remains the
 * authority. A verification that does not match the copy (a `kid` that is
 * missing because of a rotation, or a signature that fails) forces ONE
 * re-download ({@see SnapshotJwsVerifier}), subject to the 60 s negative cache
 * per `kid` ({@see JwksRetryVerdictStore}). What is downloaded REPLACES the
 * copy. A failed re-download leaves it untouched.
 *
 * Known cost: a key removed from the JWKS keeps verifying for up to 5 minutes.
 *
 * Failure tolerant, like the negative cache: with no cache (null), a cache that
 * throws, or garbage content, it behaves as before (the JWKS is downloaded).
 * The clock is a closure so tests can control it.
 *
 * @since 1.3.5
 */
final class JwksPositiveCache
{
    public const TTL_SECONDS = 300;

    /** Length of a raw Ed25519 public key (SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES). */
    private const KEY_BYTES = 32;

    /** @param \Closure():int $now */
    public function __construct(
        private readonly ?CacheInterface $cache,
        private readonly string $apiBase,
        private readonly \Closure $now
    ) {
    }

    /** @return array<string,string> `kid => raw key`; [] means there is no current, valid copy. */
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
                return []; // a half-valid entry is not served: the whole JWKS is downloaded again
            }
            $keys[$kid] = $rawKey;
        }

        return $keys;
    }

    /** @param array<string,string> $keys `kid => raw key`; an empty array is not stored. */
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
            // Without a copy the next checkout downloads, as before.
        }
    }

    private function key(): string
    {
        return 'trusteed_jwks_pos_' . md5($this->apiBase);
    }
}
