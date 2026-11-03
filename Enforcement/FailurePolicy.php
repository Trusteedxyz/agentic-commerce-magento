<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Enforcement;

/**
 * Política del flujo principal — port PHP de
 * packages/shared/src/enforcement/platform-flow.ts, fijado por
 * packages/shared/src/enforcement/__fixtures__/platform-flow-conformance.json
 * (Test/Unit/Enforcement/FailurePolicyConformanceTest.php).
 *
 * Invariante (auditoría spec-048 2026-09-27, A8; decisión D1 del plan 04): un
 * comprador humano —checkout sin ninguna señal agéntica— nunca se bloquea por
 * una avería nuestra (red, 5xx, 4xx incluido 429, timeout, respuesta ilegible,
 * excepción interna). Sólo puede bloquearlo una regla `appliesTo: ALL`/`HUMAN`
 * del propio comerciante que la válvula offline siga evaluando (el tope de
 * R030, países, horario…). El `failure_mode` del comerciante sólo gobierna a
 * los checkouts agénticos.
 *
 * Magento no evalúa ninguna regla localmente antes de preguntar al servidor,
 * así que la cuarta decisión de la referencia (`needsServerEvaluation`) no
 * tiene port aquí. Desde la Task 23b porta también la decisión por causa de
 * avería (decideDegraded) y el resolver de DIDs (resolveAgentDidPublicKey).
 *
 * Funciones puras: sin Magento, sin I/O. No mutan sus parámetros (PHP pasa los
 * arrays por valor y aquí sólo se filtran copias).
 *
 * @since 1.3.5
 */
final class FailurePolicy
{
    /** Vocabulario de `trusteed/enforcement/failure_mode` en este módulo (igual que el fixture). */
    public const FAILURE_MODES = ['enforce', 'observe'];

    /** Valor que toma un `failure_mode` AUSENTE (default histórico del módulo). */
    public const DEFAULT_FAILURE_MODE = 'enforce';

    /**
     * Modos que ABREN a un agente ante una avería, comparados exactamente. Es la
     * lista GLOBAL de la referencia (`AGENT_OPENING_FAILURE_MODES`): por eso el
     * módulo normaliza contra SU vocabulario antes (normalizeFailureMode), para
     * que un `balanced`/`permissive` de otra plataforma no abra aquí.
     */
    public const AGENT_OPENING_FAILURE_MODES = ['observe', 'balanced', 'permissive'];

    /**
     * Cualquier señal que sólo pone nuestro lado o el agente ⇒ agéntico. Un
     * token presentado cuenta aunque no verifique: nunca se trata como humano.
     *
     * @param string|null $agentId      DID del agente; '' equivale a ausente.
     * @param bool        $tokenPresent Se presentó un token de agente.
     * @param bool        $originMarker Marca de origen (cabecera X-Trusteed-Agent-*).
     */
    public static function isAgentic(?string $agentId, bool $tokenPresent, bool $originMarker): bool
    {
        return ($agentId !== null && $agentId !== '') || $tokenPresent || $originMarker;
    }

    /**
     * Reglas que la válvula offline puede aplicar, en el orden recibido y
     * reindexadas. `appliesTo` sin distinguir mayúsculas.
     *
     * - Agente: todas salvo las `HUMAN` (con `appliesTo` ausente incluido).
     * - Humano: sólo `ALL` y `HUMAN`; ausente no cuenta (ante la duda, nunca
     *   bloquear a una persona).
     *
     * @param array<int,mixed> $rules `rules[]` del snapshot firmado.
     * @return array<int,array<string,mixed>>
     */
    public static function offlineRulesFor(array $rules, bool $isAgentic): array
    {
        return array_values(array_filter(
            $rules,
            static function ($rule) use ($isAgentic): bool {
                if (!is_array($rule)) {
                    return false;
                }
                $appliesTo = strtoupper((string) ($rule['appliesTo'] ?? ''));
                return $isAgentic
                    ? $appliesTo !== 'HUMAN'
                    : ($appliesTo === 'ALL' || $appliesTo === 'HUMAN');
            }
        ));
    }

    /**
     * Resuelve el modo configurado contra el vocabulario de ESTE módulo: recorta
     * y pasa a minúsculas; ausente o vacío ⇒ DEFAULT_FAILURE_MODE; fuera de
     * FAILURE_MODES (p. ej. `permissive` de otra plataforma) ⇒ null, «no
     * resuelto», que decideUnavailable() cierra para un agente.
     *
     * @param mixed $raw Valor configurado (no confiable).
     */
    public static function normalizeFailureMode($raw): ?string
    {
        $normalized = strtolower(trim(is_scalar($raw) ? (string) $raw : ''));
        if ($normalized === '') {
            return self::DEFAULT_FAILURE_MODE;
        }
        return in_array($normalized, self::FAILURE_MODES, true) ? $normalized : null;
    }

    /**
     * El servidor no contestó (o no hay política legible). La válvula offline ya
     * filtrada con offlineRulesFor() bloquea a cualquiera; sin ella, un humano
     * pasa SIEMPRE, y a un agente se le aplica el modo del comerciante: abre
     * sólo con un modo de AGENT_OPENING_FAILURE_MODES y cierra con cualquier
     * otro valor, null incluido. No normaliza (igual que la referencia): el
     * llamador pasa el valor de normalizeFailureMode().
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideUnavailable(bool $isAgentic, ?string $failureMode, bool $offlineBlock): string
    {
        if ($offlineBlock) {
            return 'BLOCK';
        }
        if (!$isAgentic) {
            return 'ALLOW';
        }
        return $failureMode !== null && in_array($failureMode, self::AGENT_OPENING_FAILURE_MODES, true)
            ? 'ALLOW'
            : 'BLOCK';
    }

    /**
     * Una excepción NUESTRA durante la evaluación (no una regla, no la red). Un
     * humano nunca se bloquea por ella; a un agente no se le abre en ningún
     * modo —una avería propia no es un permiso—, ni siquiera con `observe` o
     * cualquier modo que abre ante una caída del servicio. Igual que
     * `decide_on_internal_error` de Odoo, `InternalErrorGuard` de PrestaShop y
     * el `CEL-INTERNAL-ERROR` de WooCommerce. No lee la configuración: la
     * decisión no depende del modo.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideOnInternalError(bool $isAgentic): string
    {
        return $isAgentic ? 'BLOCK' : 'ALLOW';
    }

    /**
     * Task 38b (2) — el historial de un agente VERIFICADO no se pudo leer
     * (red, no-200, cuerpo ilegible). Es «historial no disponible»: la misma
     * clase que «el evaluador no contestó», así que decide el modo del
     * comerciante igual que {@see decideUnavailable()} para un agente —
     * `enforce` (y cualquier valor no resuelto) cierra, `observe` abre y sigue
     * sin la señal—; nunca se convierte en «0 fallos» ni se reduce a «sin
     * señal» en silencio. Sólo se llama para un agente con token válido: a un
     * humano no se le pregunta (ni se le bloquea) por esta lectura.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideOnHistoryUnavailable(?string $failureMode): string
    {
        return self::decideDegraded(self::KIND_EVALUATOR_UNAVAILABLE, true, true, $failureMode, false);
    }

    /** Causas de capa degradada (`PlatformDegradedKind` de la referencia). */
    public const KIND_INVALID_SIGNATURE     = 'invalid_signature';
    public const KIND_MISSING_SNAPSHOT      = 'missing_snapshot';
    public const KIND_EVALUATOR_UNAVAILABLE = 'evaluator_unavailable';
    public const KIND_LAYER_DISABLED        = 'layer_disabled';

    /**
     * Port literal de `decideOnDegradedEnforcement` (Task 20, puntos 1 y 3).
     * Sobre un agente: snapshot manipulado ⇒ BLOCK en todo modo; sin snapshot y
     * con token ⇒ BLOCK en todo modo (sin el resolver del snapshot el token no
     * se puede verificar); sin snapshot y sin token ⇒ el modo; capa 2 caída
     * con snapshot VERIFICADO ⇒ el modo y la válvula; capa apagada o sin
     * configurar ⇒ ALLOW. Un humano sólo se cierra por la válvula de un
     * snapshot verificado. Causa desconocida ⇒ como `invalid_signature`.
     *
     * @return string 'ALLOW' | 'BLOCK'.
     */
    public static function decideDegraded(
        string $kind,
        bool $isAgentic,
        bool $tokenPresent,
        ?string $failureMode,
        bool $offlineBlock
    ): string {
        $isAgentic = $isAgentic || $tokenPresent;
        switch ($kind) {
            case self::KIND_LAYER_DISABLED:
                return 'ALLOW';
            case self::KIND_EVALUATOR_UNAVAILABLE:
                return self::decideUnavailable($isAgentic, $failureMode, $offlineBlock);
            case self::KIND_MISSING_SNAPSHOT:
                if (!$isAgentic) {
                    return 'ALLOW';
                }
                return $tokenPresent ? 'BLOCK' : self::decideUnavailable(true, $failureMode, false);
            default:
                return $isAgentic ? 'BLOCK' : 'ALLOW';
        }
    }

    /**
     * Port de `resolveAgentDidPublicKey`: la clave pública de `$did` en el
     * `agentDidResolver` del snapshot. El servidor emite una LISTA
     * `[{did, publicKeyJwk:{kty,crv,x,kid?}}]`: vale la ÚLTIMA entrada bien
     * formada con `did` exacto, y una malformada posterior ya no pisa a la
     * buena. También acepta el MAPA antiguo `{did: jwk}` (sólo la clave
     * exacta). Nunca lanza. Sólo resuelve: `kty`/`crv` y la firma son del
     * verificador.
     *
     * @param mixed $resolver `agentDidResolver` del snapshot tal cual.
     * @return array{x:string,kty?:string,crv?:string,kid?:string}|null
     */
    public static function resolveAgentDidPublicKey($resolver, string $did): ?array
    {
        if ($did === '' || !is_array($resolver)) {
            return null;
        }
        if ($resolver !== [] && array_is_list($resolver)) {
            $found = null;
            foreach ($resolver as $entry) {
                if (!self::isJsonObject($entry) || ($entry['did'] ?? null) !== $did) {
                    continue;
                }
                $found = self::toAgentPublicKey($entry['publicKeyJwk'] ?? null) ?? $found;
            }
            return $found;
        }
        return array_key_exists($did, $resolver) ? self::toAgentPublicKey($resolver[$did]) : null;
    }

    /** @param mixed $value */
    private static function isJsonObject($value): bool
    {
        return is_array($value) && ($value === [] || !array_is_list($value));
    }

    /**
     * @param mixed $jwk
     * @return array{x:string,kty?:string,crv?:string,kid?:string}|null
     */
    private static function toAgentPublicKey($jwk): ?array
    {
        if (!self::isJsonObject($jwk) || !is_string($jwk['x'] ?? null) || $jwk['x'] === '') {
            return null;
        }
        $key = ['x' => $jwk['x']];
        foreach (['kty', 'crv', 'kid'] as $field) {
            if (is_string($jwk[$field] ?? null)) {
                $key[$field] = $jwk[$field];
            }
        }
        return $key;
    }
}
