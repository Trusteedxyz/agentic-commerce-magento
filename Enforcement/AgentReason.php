<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * `agent_reason` aditivo de POST /api/v1/rules/evaluate en un BLOCK: motivo
 * accionable para quien compra. Es entrada no fiable (viene de la red), así que
 * se sanea antes de que llegue al texto de la excepción.
 */
final class AgentReason
{
    private const MAX_LEN = 400;
    private const RULE_CODE = '/^R\d{3}(\.[a-z0-9-]+)?$/';

    /**
     * @param mixed $raw
     * @return array{reason_category:string,reason:string,next_action:string,rule_code:string,human_checkout?:array,blocked_item?:array,published_limit?:array,limit_exceeded?:array}|null
     *         null si no hay un `reason` utilizable.
     */
    public static function sanitize($raw): ?array
    {
        if (!is_array($raw)) {
            return null;
        }
        $reason = self::text($raw['reason'] ?? null);
        // Con limit_exceeded valido el texto mostrado es el suyo: `reason` puede llevar cifras.
        $limitExceeded = self::limitExceeded($raw['limit_exceeded'] ?? null);
        // La frase del contrato no lleva digitos (umbrales), '<' '>' ni entidades HTML.
        $banned = $limitExceeded !== null ? '/[<>]|&#?[A-Za-z0-9]+;/u' : '/[\p{Nd}<>]|&#?[A-Za-z0-9]+;/u';
        if ($reason === '' || preg_match($banned, $reason) === 1) {
            return null;
        }
        $code = is_string($raw['rule_code'] ?? null) ? $raw['rule_code'] : '';

        // Claves opcionales: cada una se valida sola y, si es invalida, se omite sin tocar el resto.
        $extras = array_filter([
            'human_checkout' => self::humanCheckout($raw['human_checkout'] ?? null),
            'blocked_item'   => self::blockedItem($raw['blocked_item'] ?? null),
            'published_limit' => self::publishedLimit($raw['published_limit'] ?? null),
            'limit_exceeded' => $limitExceeded,
        ], static fn($v) => $v !== null);

        return [
            'reason_category' => self::text($raw['reason_category'] ?? null),
            'reason'          => $reason,
            'next_action'     => self::text($raw['next_action'] ?? null),
            // `$` de PCRE casa antes de un "\n" final: se compara también la longitud.
            'rule_code'       => strlen($code) <= 64 && preg_match(self::RULE_CODE, $code) === 1 && strpos($code, "\n") === false ? $code : '',
        ] + $extras;
    }

    /**
     * Texto para el comprador: frase de categoría (+ regla si es publicable) y, si vienen,
     * elemento bloqueado, límite (con la moneda de la tienda) y checkout humano.
     * Todo llega ya validado (sin marcado); es texto plano.
     */
    public static function message(array $agentReason, string $currency = ''): string
    {
        $exceeded = $agentReason['limit_exceeded'] ?? null;
        $text = $exceeded !== null ? $exceeded['message'] : $agentReason['reason'];
        if ($agentReason['rule_code'] !== '') {
            $text .= ' (rule ' . $agentReason['rule_code'] . ')';
        }
        if (isset($agentReason['blocked_item'])) {
            $text .= ' Blocked item: ' . $agentReason['blocked_item']['value'] . '.';
        }
        $limit = $agentReason['published_limit'] ?? null;
        if ($limit !== null && $exceeded === null) {
            $text .= $limit['kind'] === 'max_cart_value'
                ? ' Limit: max. ' . number_format($limit['amount_cents'] / 100, 2, '.', '') . ($currency !== '' ? ' ' . $currency : '') . ' per cart.'
                : ' Limit: max. ' . $limit['units'] . ' units per line.';
        }
        $human = $agentReason['human_checkout'] ?? null;
        if ($human !== null) {
            $text .= ' ' . (isset($human['url']) && $human['available'] ? $human['message'] . ' ' . $human['url'] : $human['message']);
        }

        return $text;
    }

    /** @param mixed $v */
    private static function humanCheckout($v): ?array
    {
        if (!is_array($v) || !is_bool($v['available'] ?? null)) {
            return null;
        }
        $message = self::text($v['message'] ?? null);
        // El mensaje lleva cifras en su propio campo: sin filtro de digitos, pero sin marcado.
        if ($message === '' || preg_match('/[<>]|&#?[A-Za-z0-9]+;/', $message) === 1) {
            return null;
        }
        $out = ['available' => $v['available'], 'message' => $message];
        if (array_key_exists('url', $v)) {
            $url = $v['url'];
            if (!is_string($url) || strlen($url) > 2048 || preg_match('#^https?://[^\s<>"\'\\\\\x00-\x1f\x7f]+$#i', $url) !== 1) {
                return null; // url presente pero invalida: se descarta el bloque (no se ofrece un enlace a medias).
            }
            $out['url'] = $url;
        }

        return $out;
    }

    /** @param mixed $v */
    private static function blockedItem($v): ?array
    {
        if (!is_array($v) || !in_array($v['kind'] ?? null, ['category', 'sku', 'digital_good_type'], true)) {
            return null;
        }
        $value = $v['value'] ?? null;
        if (!is_string($value) || preg_match('/^[\p{L}\p{N}_.:\/ -]{1,64}$/u', $value) !== 1 || strpos($value, "\n") !== false) {
            return null;
        }

        return ['kind' => $v['kind'], 'value' => $value];
    }

    /** @param mixed $v */
    private static function limitExceeded($v): ?array
    {
        if (!is_array($v)) {
            return null;
        }
        $rule = $v['rule'] ?? null;
        $code = $v['rule_code'] ?? null;
        $name = is_string($v['rule_name'] ?? null) ? self::text($v['rule_name']) : '';
        $message = is_string($v['message'] ?? null) ? self::text($v['message']) : '';
        $kinds = ['max_cart_value' => 'minor_units_of_store_currency', 'max_line_value' => 'minor_units_of_store_currency',
            'max_items_per_order' => 'units', 'max_units_per_line' => 'units'];
        $kind = $v['kind'] ?? null;
        $markup = '/[<>]|&#?[A-Za-z0-9]+;/';
        if (!is_string($rule) || preg_match('/^R\d{3}\z/', $rule) !== 1
            || !is_string($code) || preg_match('/^R\d{3}\.[a-z0-9-]{1,60}\z/', $code) !== 1
            || $name === '' || mb_strlen($name, 'UTF-8') > 80 || preg_match($markup, $name) === 1
            || !is_string($kind) || !isset($kinds[$kind]) || ($v['unit'] ?? null) !== $kinds[$kind]
            || !is_int($v['limit'] ?? null) || $v['limit'] < 0 || !is_int($v['observed'] ?? null) || $v['observed'] < 0
            || $message === '' || $message !== $v['message'] || preg_match($markup, $message) === 1) {
            return null;
        }

        return ['rule' => $rule, 'rule_code' => $code, 'rule_name' => $name, 'kind' => $kind, 'limit' => $v['limit'],
            'observed' => $v['observed'], 'unit' => $v['unit'], 'message' => $message];
    }

    /** @param mixed $v */
    private static function publishedLimit($v): ?array
    {
        if (!is_array($v) || !is_string($v['source'] ?? null) || self::text($v['source']) === '' || preg_match('/[<>]|&#?[A-Za-z0-9]+;/', $v['source']) === 1) {
            return null;
        }
        $source = self::text($v['source']);
        if (($v['kind'] ?? null) === 'max_cart_value') {
            $c = $v['amount_cents'] ?? null;
            if (!is_int($c) || $c < 0 || ($v['unit'] ?? null) !== 'minor_units_of_store_currency') {
                return null;
            }

            return ['kind' => 'max_cart_value', 'amount_cents' => $c, 'unit' => 'minor_units_of_store_currency', 'source' => $source];
        }
        if (($v['kind'] ?? null) === 'max_units_per_line') {
            $u = $v['units'] ?? null;

            return is_int($u) && $u >= 0 ? ['kind' => 'max_units_per_line', 'units' => $u, 'source' => $source] : null;
        }

        return null;
    }

    /** @param mixed $v */
    private static function text($v): string
    {
        if (!is_string($v)) {
            return '';
        }
        // Control, formato (bidi, ancho cero) y separadores de linea: se descarta el texto entero,
        // no se limpia. UTF-8 invalido => preg devuelve null => vacio.
        if (preg_match('/[\p{Cc}\p{Cf}\x{2028}\x{2029}]/u', $v) !== 0) {
            return '';
        }

        return trim(mb_substr($v, 0, self::MAX_LEN, 'UTF-8'));
    }
}
