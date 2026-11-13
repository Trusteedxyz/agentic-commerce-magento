<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\I18n;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Trust\ConfidenceLabel;

require_once __DIR__ . '/../../../Model/Trust/ScoreNodeNormalizer.php';
require_once __DIR__ . '/../../../Model/Trust/ConfidenceLabel.php';

/**
 * Toda cadena de «¿Cómo va mi tienda?» tiene su traducción: si el CSV traduce otra cadena (p. ej. «New store
 * (cap 60)» frente a la fuente «New store (cap 65)»), Magento no la casa y la pantalla sale en inglés en español.
 */
final class HealthTemplateTranslationsTest extends TestCase
{
    private const MODULE = __DIR__ . '/../../..';
    /** Textos que se escriben igual en los dos idiomas. */
    private const SAME_IN_SPANISH = [];

    /** @return list<string> */
    private function sourceStrings(): array
    {
        $php = (string)file_get_contents(self::MODULE . '/view/adminhtml/templates/health.phtml');
        preg_match_all("/__\\('((?:[^'\\\\]|\\\\.)*)'/", $php, $m);
        $strings = array_map(static fn(string $s): string => str_replace("\\'", "'", $s), $m[1]);
        // El rótulo del nivel de confianza se compone fuera del .phtml: sus cadenas fuente salen del helper.
        foreach (['cold_start', 'human_established', 'agent_verified', 'agent_verified_thin', 'insufficient_data', 'x'] as $level) {
            foreach ([null, 70.0] as $cap) {
                $strings[] = ConfidenceLabel::parts($level, $cap)[0];
            }
        }

        return array_values(array_unique($strings));
    }

    /** @return array<string, string> */
    private function csv(string $locale): array
    {
        $map = [];
        $h = fopen(self::MODULE . "/i18n/{$locale}.csv", 'r');
        while (($row = fgetcsv($h, 0, ',', '"', '')) !== false) {
            if (count($row) >= 2) {
                $map[$row[0]] = $row[1];
            }
        }
        fclose($h);

        return $map;
    }

    public function test_el_panel_tiene_cadenas_que_comprobar(): void
    {
        $this->assertGreaterThan(30, count($this->sourceStrings()));
    }

    public function test_cada_cadena_del_panel_esta_traducida_al_espanol(): void
    {
        $es = $this->csv('es_ES');
        $sinTraducir = [];
        foreach ($this->sourceStrings() as $source) {
            if (!isset($es[$source]) || ($es[$source] === $source && !in_array($source, self::SAME_IN_SPANISH, true))) {
                $sinTraducir[] = $source;
            }
        }
        $this->assertSame([], $sinTraducir, 'Cadenas de health.phtml sin traducción en es_ES.csv');
    }

    public function test_cada_cadena_del_panel_esta_en_el_csv_en_ingles(): void
    {
        $en = $this->csv('en_US');
        $this->assertSame([], array_values(array_filter(
            $this->sourceStrings(),
            static fn(string $s): bool => !isset($en[$s])
        )), 'Cadenas de health.phtml sin entrada en en_US.csv');
    }
}
