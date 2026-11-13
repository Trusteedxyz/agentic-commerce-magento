<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Trust;

/**
 * Rótulo del nivel de confianza de la puntuación («Tienda nueva · tope 70»).
 *
 * El tope que se pinta es SIEMPRE el `scoreCap` que devuelve la API, el mismo que va en «sobre %1» junto a la
 * puntuación. Hasta la 1.3.14 el rótulo llevaba el tope escrito a mano por nivel («cap 65») y la pantalla decía
 * «70 sobre 70» con «New store (cap 65)»: dos fuentes del mismo número. Sin tope recibido, el rótulo va sin cifra.
 */
final class ConfidenceLabel
{
    /**
     * Cadena de traducción y argumentos para `__()`: `__($parts[0], ...$parts[1])`.
     *
     * @return array{0: string, 1: list<string>}
     */
    public static function parts(?string $level, ?float $cap): array
    {
        $capText = ScoreNodeNormalizer::formatScore($cap);

        return match ($level) {
            'cold_start' => self::withCap('New store', $capText),
            'human_established' => self::withCap('With human history', $capText),
            'agent_verified' => self::withCap('Verified with agents', $capText),
            'agent_verified_thin' => ['First agent orders', []],
            'insufficient_data' => ['Not enough data', []],
            default => ['Unclassified', []],
        };
    }

    /** @return array{0: string, 1: list<string>} */
    private static function withCap(string $label, ?string $capText): array
    {
        return $capText === null ? [$label, []] : [$label . ' · cap %1', [$capText]];
    }
}
