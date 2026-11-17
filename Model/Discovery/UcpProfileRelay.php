<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Discovery;

use Magento\Framework\App\CacheInterface;

/**
 * Relays the centrally generated per-store UCP profile body (never builds or
 * edits it), so `/.well-known/ucp` answers 200 from the merchant's own origin:
 * a 302 to another host is not followed by every UCP client.
 *
 * Fresh for 5 minutes; a stale copy (up to 24 h) covers a central outage. The
 * caller has ALREADY passed the target through ApiBaseUrlValidator (SSRF guard);
 * this class only requests https and never follows redirects.
 */
class UcpProfileRelay
{
    public const FRESH_TTL = 300;
    public const STALE_TTL = 86400;
    private const CACHE_KEY_PREFIX = 'trusteed_ucp_profile_';

    public function __construct(
        private readonly CacheInterface $cache,
    ) {
    }

    public function fetch(string $target, ?int $now = null): ?string
    {
        $now = $now ?? time();
        $key = self::CACHE_KEY_PREFIX . sha1($target);

        $raw = $this->cache->load($key);
        $cached = is_string($raw) ? json_decode($raw, true) : null;
        $valid = is_array($cached) && isset($cached['body'], $cached['at']) && is_string($cached['body']);
        if ($valid && $now - (int)$cached['at'] < self::FRESH_TTL) {
            return $cached['body'];
        }

        if (str_starts_with($target, 'https://')) {
            $res = $this->httpGet($target);
            $body = (string)($res['body'] ?? '');
            if ((int)($res['code'] ?? 0) === 200 && json_decode($body) !== null) {
                $this->cache->save(
                    (string)json_encode(['body' => $body, 'at' => $now]),
                    $key,
                    ['trusteed_ucp_profile'],
                    self::STALE_TTL
                );
                return $body;
            }
        }

        return ($valid && $now - (int)$cached['at'] < self::STALE_TTL) ? $cached['body'] : null;
    }

    /** @return array{code:int, body:string} */
    /** Protected so tests can replace the transport (Magento DI cannot autowire a callable). */
    protected function httpGet(string $url): array
    {
        if (!function_exists('curl_init') || ($ch = curl_init($url)) === false) {
            return ['code' => 0, 'body' => ''];
        }
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);
        $body = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ['code' => $code, 'body' => is_string($body) ? $body : ''];
    }
}
