<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Trust;

/**
 * Normalises the `score` node of `GET /api/v1/trust/overview` (F1-4b).
 *
 * WHY THIS EXISTS
 * ---------------
 * The Health tab used to parse the score with:
 *
 *     'score' => is_int($node['score'] ?? null) ? (int)$node['score'] : null
 *
 * The v4.1 trust engine rounds every score to ONE DECIMAL (`round1` in
 * `apps/api/src/services/trust/trust-score-v41.ts`), and `json_decode` maps a
 * JSON `81.4` to a PHP **float**. `is_int(81.4)` is `false`, so every decimal
 * score was silently turned into `null` and the merchant saw "no score" while
 * having one. Only whole-number scores (e.g. 65, serialised as a JSON int)
 * survived. Measured on 2026-07-27 across the 15 production stores: 8 sat at
 * exactly 65 and rendered fine; 44.7 / 52.7 / 55.7 / 61.5 / 81.4 rendered as
 * "no score".
 *
 * DESIGN DECISIONS
 * ----------------
 * 1. `int|float` is accepted and normalised to `float`. A single return type
 *    means callers never have to branch on int-vs-float again — which is the
 *    exact mistake this class replaces.
 * 2. Numeric STRINGS are rejected (`null`). The contract says `number`; a
 *    string means the payload is genuinely broken and masking that would trade
 *    one silent failure for another.
 * 3. Presentation keeps the decimal: `formatScore` renders `81.4`, not `81`.
 *    `(int)` truncation would bias every score downwards by up to a point
 *    (44.7 → 44), and rounding to `81` would still disagree with what the
 *    merchant sees in the WooCommerce/PrestaShop/Odoo admin SPA, which renders
 *    the raw one-decimal value. Whole numbers drop the `.0` (65, not 65.0).
 * 4. The decimal separator is always `.`, matching the SPA's `String(55.7)`
 *    across every platform, rather than following the Magento admin locale.
 *
 * Pure and framework-free on purpose, so it is unit-testable without the
 * Magento DI container. Tests: `Test/Unit/Trust/ScoreNodeNormalizerTest.php`.
 */
final class ScoreNodeNormalizer
{
    /**
     * Normalise a JSON-decoded numeric field to a float.
     *
     * @return float|null `null` when absent, JSON `null`, or not a JSON number.
     */
    public static function normalizeNumber(mixed $value): ?float
    {
        // is_int OR is_float — booleans are excluded (is_int(true) is false in
        // PHP, but being explicit documents the intent).
        if (is_int($value) || is_float($value)) {
            $asFloat = (float)$value;
            return is_finite($asFloat) ? $asFloat : null;
        }
        return null;
    }

    /**
     * Render a score for display: one decimal, no trailing `.0`, `.` separator.
     *
     * @return string|null `null` when there is no score (caller renders its own
     *                     placeholder, e.g. an em dash).
     */
    public static function formatScore(?float $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $rounded = round($value, 1);
        if ($rounded === floor($rounded)) {
            return (string)(int)$rounded;
        }
        return number_format($rounded, 1, '.', '');
    }

    /**
     * Normalise the whole `score` node into the shape the Health tab caches.
     *
     * @param array<string, mixed> $scoreNode
     * @return array{
     *   status: string,
     *   score: float|null,
     *   scoreCap: float|null,
     *   confidenceLevel: string|null,
     *   nextMilestone: string|null
     * }
     */
    public static function normalize(array $scoreNode): array
    {
        return [
            'status' => (string)($scoreNode['status'] ?? 'unavailable'),
            'score' => self::normalizeNumber($scoreNode['score'] ?? null),
            // `scoreCap` is null in the engine's `insufficient_data` state, and
            // is normalised as a number for the same reason as `score`: the
            // caps are whole today (65/85/92/100) but nothing in the contract
            // promises they stay that way.
            'scoreCap' => self::normalizeNumber($scoreNode['scoreCap'] ?? null),
            'confidenceLevel' => isset($scoreNode['confidenceLevel'])
                ? (string)$scoreNode['confidenceLevel']
                : null,
            'nextMilestone' => isset($scoreNode['nextMilestone'])
                ? (string)$scoreNode['nextMilestone']
                : null,
        ];
    }
}
