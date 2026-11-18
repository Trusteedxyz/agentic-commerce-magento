<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service\PolicyPages;

/**
 * Construye el cuerpo de `PUT /v1/embed/merchant/policy-pages` (puro, sin Magento).
 *
 * Solo viajan las páginas que el comercio ELIGIÓ en Ajustes de Trusteed y que están activas:
 * nunca se adivina una página por su título. Sin `source` (lo fija el servidor), sin cuerpo de la
 * página y sin claves extra (el servidor responde 400 si las hay).
 */
final class PolicyPagesPayload
{
    public const TYPES = ['terms', 'privacy', 'returns'];

    private const MAX_URL_LENGTH = 2048;
    private const MAX_TITLE_LENGTH = 200;

    /**
     * @param array<string,array{url:string,title:string,update_time:string,is_active:bool}|null> $pages por tipo; null = sin elegir
     * @return array{policyPages: list<array{type:string,url:string,title?:string,page_modified_at:string}>}
     */
    public static function build(array $pages): array
    {
        $out = [];
        foreach (self::TYPES as $type) {
            $page = $pages[$type] ?? null;
            if ($page === null || empty($page['is_active']) || !self::isSafeUrl((string)$page['url'])) {
                continue;
            }
            $ts = strtotime((string)$page['update_time'] . ' UTC');
            if ($ts === false) {
                continue;
            }
            $entry = ['type' => $type, 'url' => (string)$page['url']];
            $title = mb_substr(trim((string)$page['title']), 0, self::MAX_TITLE_LENGTH);
            if ($title !== '') {
                $entry['title'] = $title;
            }
            $entry['page_modified_at'] = gmdate('Y-m-d\TH:i:s\Z', $ts);
            $out[] = $entry;
        }

        return ['policyPages' => $out];
    }

    /** https, sin credenciales, sin IP ni localhost, tope de longitud. */
    public static function isSafeUrl(string $url): bool
    {
        if ($url === '' || strlen($url) > self::MAX_URL_LENGTH) {
            return false;
        }
        $parts = parse_url($url);
        if (!is_array($parts) || ($parts['scheme'] ?? '') !== 'https' || isset($parts['user']) || isset($parts['pass'])) {
            return false;
        }
        $host = strtolower((string)($parts['host'] ?? ''));
        if ($host === '' || $host === 'localhost' || filter_var(trim($host, '[]'), FILTER_VALIDATE_IP) !== false) {
            return false;
        }

        return !preg_match('/\.(local|internal)$/', $host);
    }
}
