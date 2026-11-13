<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Trust;

/**
 * Texto del «Próximo paso» de la puntuación a partir de `nextMilestone` de la API.
 *
 * Mismo patrón y mismos textos que la SPA de WooCommerce y PrestaShop (`trustReceipts.milestoneText`): se quita el
 * prefijo `milestone.` y se busca la clave en el mapa. El contrato es abierto (string): una clave desconocida NUNCA
 * se pinta cruda, va a un texto genérico. Sin clave (null o vacía) no hay paso que mostrar.
 */
final class MilestoneText
{
    public const GENERIC = 'Keep selling to improve your score.';

    /** @var array<string, string> clave sin prefijo → cadena fuente (traducida en i18n/*.csv) */
    private const TEXTS = [
        'no_store' => 'Open your store to start building your reputation.',
        'cold_start' => 'Complete onboarding and make your first sales to raise your score.',
        'human_established' => 'Make your first sales to shopping agents to unlock the top score tier.',
    ];

    /** Todas las cadenas fuente que puede devolver (para comprobar que están traducidas). @return list<string> */
    public static function sourceStrings(): array
    {
        return [...array_values(self::TEXTS), self::GENERIC];
    }

    /** Cadena fuente a traducir con `__()`, o null si no hay paso que mostrar. */
    public static function source(?string $milestone): ?string
    {
        $key = trim((string)$milestone);
        if ($key === '') {
            return null;
        }
        $key = preg_replace('/^milestone\./', '', $key) ?? $key;

        return self::TEXTS[$key] ?? self::GENERIC;
    }
}
