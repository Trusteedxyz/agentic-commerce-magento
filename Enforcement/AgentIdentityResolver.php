<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Identidad del agente en Magento (auditoría spec-048 2026-09-27, C2; D4 del
 * plan 04).
 *
 * Antes se leían dos claves de sesión (`trusteed_agent_did`,
 * `trusteed_agent_token`) que nada escribía: todo checkout salía orgánico. El
 * pedido se coloca por REST (`/V1/guest-carts/:id/payment-information`), tanto
 * desde el checkout Luma como desde el bridge WebMCP, así que la señal viaja en
 * cabeceras de esa petición. La sesión se sigue leyendo como respaldo.
 *
 * Modelo de amenaza. Estas cabeceras las puede poner CUALQUIER cliente, así que
 * sólo pueden endurecer el trato, nunca aligerarlo:
 *
 * - Sin ninguna cabecera `X-Trusteed-Agent-*` con valor (ni sesión) ⇒ humano.
 * - Cualquiera de ellas con valor ⇒ agente, sea válido o no. Un DID o token con
 *   forma inválida o demasiado largo se descarta (no viaja ni se registra) pero
 *   el checkout sigue siendo agéntico; un token rechazado se marca en
 *   `tokenRejected` para que el observer lo trate como token inválido.
 * - Un DID bien formado NO está autenticado: sólo el token lo verifica. Es la
 *   misma clase de señal que el `?agent_id=` de WooCommerce. Sin token VÁLIDO
 *   de ese DID no viaja como `agentId` (Task 16, ver bindToken()).
 * - B9-inverso (un tercero haciendo pasar por agente la compra de otra
 *   persona): exige añadir cabeceras a la petición REST del comprador, lo que
 *   sólo consigue quien ya ejecuta código en su navegador (XSS, extensión). Y
 *   aun así sólo lo somete a las reglas de agente; no le abre nada.
 *
 * Sin dependencias del framework: testeable sin Magento.
 *
 * @since 1.3.5
 */
final class AgentIdentityResolver
{
    public const HEADER_AGENT_TOKEN  = 'X-Trusteed-Agent-Token';
    public const HEADER_AGENT_ID     = 'X-Trusteed-Agent-Id';
    public const HEADER_AGENT_ORIGIN = 'X-Trusteed-Agent-Origin';

    /** Techo de longitud antes de aplicar ninguna expresión regular. */
    public const MAX_DID_LENGTH   = 512;
    public const MAX_TOKEN_LENGTH = 8192;

    private const AGENT_DID_RE = '/^did:(web|key):[A-Za-z0-9._:\-]+$/';
    private const JWS_RE       = '/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]*$/';

    /**
     * @param array<string,mixed> $headers Cabeceras de la petición (nombre ⇒ valor).
     * @return array{did:string, token:string, agentic:bool, tokenRejected:bool}
     */
    public static function resolve(array $headers, string $sessionDid, string $sessionToken): array
    {
        $h         = array_change_key_case($headers, CASE_LOWER);
        $rawDid    = self::headerValue($h, self::HEADER_AGENT_ID);
        $rawToken  = self::headerValue($h, self::HEADER_AGENT_TOKEN);
        $rawOrigin = self::headerValue($h, self::HEADER_AGENT_ORIGIN);

        $headerDid   = self::accept($rawDid, self::MAX_DID_LENGTH, self::AGENT_DID_RE);
        $headerToken = self::accept($rawToken, self::MAX_TOKEN_LENGTH, self::JWS_RE);

        $did           = $headerDid !== '' ? $headerDid : $sessionDid;
        $token         = $headerToken !== '' ? $headerToken : $sessionToken;
        $tokenRejected = $rawToken !== '' && $headerToken === '';

        return [
            'did'           => $did,
            'token'         => $token,
            'agentic'       => FailurePolicy::isAgentic(
                $did === '' ? null : $did,
                $token !== '' || $tokenRejected,
                $rawOrigin !== '' || $rawDid !== ''
            ),
            'tokenRejected' => $tokenRejected,
        ];
    }

    /**
     * The three Trusteed headers of the request that places the order.
     * `Magento\Framework\App\RequestInterface` does not declare getHeader();
     * the HTTP/REST implementations do (hence method_exists). No request, or
     * one without getHeader(), yields [] and the caller falls back to the
     * session. Values are never logged. May throw whatever getHeader() throws.
     *
     * @return array<string,string>
     */
    public static function readHeaders(?object $request): array
    {
        if ($request === null || !method_exists($request, 'getHeader')) {
            return [];
        }
        $out = [];
        foreach ([self::HEADER_AGENT_ID, self::HEADER_AGENT_TOKEN, self::HEADER_AGENT_ORIGIN] as $name) {
            $value = $request->getHeader($name);
            if (is_string($value) && $value !== '') {
                $out[$name] = $value;
            }
        }
        return $out;
    }

    /**
     * Ties the verified token to the declared DID (fix ronda 1, IMPORTANT 2).
     *
     * `did` is ONLY the identity a VALID token proves ('' otherwise). Task 16
     * (security review): a declared DID never travels as `agentId` on its own
     * — the server and the local history projection key the agent's history
     * on it, so a declared-only DID let an agent inherit another DID's history
     * or burn a victim's. The caller sends such a checkout as an ANONYMOUS
     * agent (`agentId: null`, `endpointClass: agentic_endpoint`).
     *
     * - Token VALID but for another DID than the declared one ⇒ INVALID, no DID.
     * - Token VALID and no declared DID ⇒ the token's (verified) DID.
     * - Token not VALID (INVALID, INDETERMINATE) ⇒ no DID.
     *
     * @return array{state:string, did:string, mismatch:bool}
     */
    public static function bindToken(string $declaredDid, string $tokenState, string $tokenDid): array
    {
        if ($tokenState !== 'valid') {
            return ['state' => $tokenState, 'did' => '', 'mismatch' => false];
        }
        if ($tokenDid === '') {
            return ['state' => 'invalid', 'did' => '', 'mismatch' => false];
        }
        if ($declaredDid === '' || $tokenDid === $declaredDid) {
            return ['state' => 'valid', 'did' => $tokenDid, 'mismatch' => false];
        }
        return ['state' => 'invalid', 'did' => '', 'mismatch' => true];
    }

    /** @param array<string,mixed> $lowerCased */
    private static function headerValue(array $lowerCased, string $name): string
    {
        $value = $lowerCased[strtolower($name)] ?? '';
        return is_string($value) ? trim($value) : '';
    }

    private static function accept(string $value, int $maxLength, string $pattern): string
    {
        if ($value === '' || strlen($value) > $maxLength) {
            return '';
        }
        return preg_match($pattern, $value) === 1 ? $value : '';
    }
}
