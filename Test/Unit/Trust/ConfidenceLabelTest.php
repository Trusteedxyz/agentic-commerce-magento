<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Trust;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Trust\ConfidenceLabel;
use Trusteed\AgenticCommerce\Model\Trust\ScoreNodeNormalizer;

require_once __DIR__ . '/../../../Model/Trust/ScoreNodeNormalizer.php';
require_once __DIR__ . '/../../../Model/Trust/ConfidenceLabel.php';

/**
 * El rótulo del nivel de confianza llevaba el tope escrito a mano («cap 65») y la pantalla decía
 * «70 sobre 70» con «New store (cap 65)». Ahora la cifra del rótulo es el scoreCap recibido.
 */
final class ConfidenceLabelTest extends TestCase
{
    /** @return array<string, array{0: string, 1: string}> */
    public static function levelsWithCap(): array
    {
        return [
            'tienda nueva' => ['cold_start', 'New store'],
            'con historial humano' => ['human_established', 'With human history'],
            'verificada con agentes' => ['agent_verified', 'Verified with agents'],
        ];
    }

    /** @dataProvider levelsWithCap */
    public function test_la_cifra_del_rotulo_es_el_scoreCap_recibido(string $level, string $label): void
    {
        foreach ([70.0, 65.0, 92.5] as $cap) {
            [$text, $args] = ConfidenceLabel::parts($level, $cap);

            $this->assertSame($label . ' · cap %1', $text);
            $this->assertSame([ScoreNodeNormalizer::formatScore($cap)], $args);
        }
    }

    /** @dataProvider levelsWithCap */
    public function test_sin_tope_el_rotulo_va_sin_cifra(string $level, string $label): void
    {
        $this->assertSame([$label, []], ConfidenceLabel::parts($level, null));
    }

    public function test_los_niveles_sin_tope_no_llevan_cifra_aunque_llegue_scoreCap(): void
    {
        $this->assertSame(['First agent orders', []], ConfidenceLabel::parts('agent_verified_thin', 70.0));
        $this->assertSame(['Not enough data', []], ConfidenceLabel::parts('insufficient_data', 70.0));
        $this->assertSame(['Unclassified', []], ConfidenceLabel::parts(null, 70.0));
        $this->assertSame(['Unclassified', []], ConfidenceLabel::parts('otro_nivel', 70.0));
    }

    public function test_ninguna_cadena_fuente_lleva_una_cifra_fija(): void
    {
        foreach (['cold_start', 'human_established', 'agent_verified', 'agent_verified_thin', 'insufficient_data', 'otro'] as $level) {
            foreach ([null, 70.0] as $cap) {
                $this->assertDoesNotMatchRegularExpression('/\d/', str_replace('%1', '', ConfidenceLabel::parts($level, $cap)[0]));
            }
        }
    }
}
