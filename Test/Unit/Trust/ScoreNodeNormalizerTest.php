<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Trust;

use Trusteed\AgenticCommerce\Model\Trust\ScoreNodeNormalizer;
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../../Model/Trust/ScoreNodeNormalizer.php';

/**
 * F1-4b — the Health tab used to parse the trust score with
 * `is_int($scoreNode['score']) ? (int)… : null`.
 *
 * The v4.1 engine rounds scores to ONE DECIMAL (`round1`), and `json_decode`
 * maps a JSON `81.4` to a PHP **float**, so `is_int()` returned false and the
 * score was silently discarded (null) — the merchant saw "no score" while
 * having one. Only scores that happen to land on a whole number (e.g. 65,
 * which serialises as a JSON int) survived.
 *
 * The values below are the REAL production scores measured on 2026-07-27
 * across the 15 live stores.
 */
final class ScoreNodeNormalizerTest extends TestCase
{
    /** The five decimal scores observed in production — all were dropped before. */
    private const PRODUCTION_DECIMAL_SCORES = [44.7, 52.7, 55.7, 61.5, 81.4];

    // ── normalizeNumber: the actual defect ───────────────────────────────────

    public function test_accepts_the_real_production_decimal_scores(): void
    {
        foreach (self::PRODUCTION_DECIMAL_SCORES as $score) {
            $this->assertSame(
                $score,
                ScoreNodeNormalizer::normalizeNumber($score),
                "decimal score {$score} must survive normalisation"
            );
        }
    }

    public function test_accepts_a_whole_number_score_as_float(): void
    {
        // 65 arrives as a JSON int (8 of the 15 production stores sit here).
        $this->assertSame(65.0, ScoreNodeNormalizer::normalizeNumber(65));
    }

    public function test_accepts_zero(): void
    {
        // 0 is a legitimate score and must not be confused with "absent".
        $this->assertSame(0.0, ScoreNodeNormalizer::normalizeNumber(0));
        $this->assertSame(0.0, ScoreNodeNormalizer::normalizeNumber(0.0));
    }

    public function test_returns_null_for_null(): void
    {
        // `insufficient_data` → the engine emits score: null, cap: null.
        $this->assertNull(ScoreNodeNormalizer::normalizeNumber(null));
    }

    public function test_returns_null_for_non_numeric_types(): void
    {
        // Strings are rejected on purpose: the contract says `number`, so a
        // string signals a genuinely broken payload that must not be masked.
        $this->assertNull(ScoreNodeNormalizer::normalizeNumber('81.4'));
        $this->assertNull(ScoreNodeNormalizer::normalizeNumber(true));
        $this->assertNull(ScoreNodeNormalizer::normalizeNumber([]));
    }

    // ── formatScore: presentation ────────────────────────────────────────────

    public function test_formats_decimals_with_one_decimal_place(): void
    {
        // Matches what every other platform SPA renders (55.7, not 56).
        $this->assertSame('44.7', ScoreNodeNormalizer::formatScore(44.7));
        $this->assertSame('52.7', ScoreNodeNormalizer::formatScore(52.7));
        $this->assertSame('55.7', ScoreNodeNormalizer::formatScore(55.7));
        $this->assertSame('61.5', ScoreNodeNormalizer::formatScore(61.5));
        $this->assertSame('81.4', ScoreNodeNormalizer::formatScore(81.4));
    }

    public function test_formats_whole_numbers_without_a_trailing_zero(): void
    {
        $this->assertSame('65', ScoreNodeNormalizer::formatScore(65.0));
        $this->assertSame('100', ScoreNodeNormalizer::formatScore(100.0));
        $this->assertSame('0', ScoreNodeNormalizer::formatScore(0.0));
    }

    public function test_format_never_truncates_downwards(): void
    {
        // `(int)81.4` would render 81 — a systematic downward bias. The whole
        // value is preserved instead.
        $this->assertSame('81.4', ScoreNodeNormalizer::formatScore(81.4));
        $this->assertNotSame('81', ScoreNodeNormalizer::formatScore(81.4));
    }

    public function test_formats_null_as_null(): void
    {
        $this->assertNull(ScoreNodeNormalizer::formatScore(null));
    }

    // ── normalize: the whole score node ──────────────────────────────────────

    public function test_normalizes_a_real_ready_node_with_a_decimal_score(): void
    {
        $node = [
            'status' => 'ready',
            'score' => 81.4,
            'scoreCap' => 92,
            'confidenceLevel' => 'agent_verified_thin',
            'nextMilestone' => 'milestone.agent_verified',
        ];

        $this->assertSame(
            [
                'status' => 'ready',
                'score' => 81.4,
                'scoreCap' => 92.0,
                'confidenceLevel' => 'agent_verified_thin',
                'nextMilestone' => 'milestone.agent_verified',
            ],
            ScoreNodeNormalizer::normalize($node)
        );
    }

    public function test_normalizes_the_insufficient_data_node(): void
    {
        $node = [
            'status' => 'ready',
            'score' => null,
            'scoreCap' => null,
            'confidenceLevel' => 'insufficient_data',
            'nextMilestone' => 'milestone.no_store',
        ];

        $out = ScoreNodeNormalizer::normalize($node);
        $this->assertNull($out['score']);
        $this->assertNull($out['scoreCap']);
        $this->assertSame('insufficient_data', $out['confidenceLevel']);
    }

    public function test_defaults_missing_fields_without_fataling(): void
    {
        $out = ScoreNodeNormalizer::normalize([]);

        $this->assertSame('unavailable', $out['status']);
        $this->assertNull($out['score']);
        $this->assertNull($out['scoreCap']);
        $this->assertNull($out['confidenceLevel']);
        $this->assertNull($out['nextMilestone']);
    }

    public function test_survives_a_json_cache_round_trip(): void
    {
        // The block caches the normalised array as JSON for 300s; a float must
        // still be a float after decoding, or the bug returns via the cache.
        $normalized = ScoreNodeNormalizer::normalize(['status' => 'ready', 'score' => 55.7, 'scoreCap' => 92]);
        $roundTripped = json_decode(json_encode($normalized, JSON_THROW_ON_ERROR), true);

        $this->assertSame(55.7, $roundTripped['score']);
        $this->assertSame('55.7', ScoreNodeNormalizer::formatScore($roundTripped['score']));
    }
}
