<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Trust;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Trust\MilestoneText;

require_once __DIR__ . '/../../../Model/Trust/MilestoneText.php';

/**
 * «Próximo paso: milestone.cold_start»: la clave de la API se pintaba cruda. Ahora se traduce con los mismos
 * textos que la SPA de WooCommerce y PrestaShop y una clave desconocida nunca sale tal cual.
 */
final class MilestoneTextTest extends TestCase
{
    public function test_las_claves_conocidas_dan_el_texto_de_la_spa_con_o_sin_prefijo(): void
    {
        $esperado = [
            'no_store' => 'Open your store to start building your reputation.',
            'cold_start' => 'Complete onboarding and make your first sales to raise your score.',
            'human_established' => 'Make your first sales to shopping agents to unlock the top score tier.',
        ];
        foreach ($esperado as $clave => $texto) {
            $this->assertSame($texto, MilestoneText::source('milestone.' . $clave));
            $this->assertSame($texto, MilestoneText::source($clave));
        }
    }

    public function test_sin_clave_no_hay_paso_que_mostrar(): void
    {
        $this->assertNull(MilestoneText::source(null));
        $this->assertNull(MilestoneText::source(''));
        $this->assertNull(MilestoneText::source('  '));
    }

    public function test_una_clave_desconocida_va_al_texto_generico_nunca_cruda(): void
    {
        foreach (['milestone.agent_verified_plus', 'milestone.', 'algo_nuevo', 'milestone.x.y'] as $clave) {
            $this->assertSame(MilestoneText::GENERIC, MilestoneText::source($clave));
        }
        $this->assertSame('Keep selling to improve your score.', MilestoneText::GENERIC);
    }

    public function test_el_asistente_manda_el_idioma_del_admin_a_la_ventana_de_conexion(): void
    {
        $js = (string)file_get_contents(__DIR__ . '/../../../view/adminhtml/web/js/wizard-mixin.js');

        $this->assertStringContainsString('document.documentElement.lang', $js);
        $this->assertStringContainsString('"&lang=" + connectLang()', $js);
        // Solo en/es: ningún otro idioma se manda.
        $this->assertStringContainsString('return "en"', $js);
        $this->assertStringContainsString('return "es"', $js);
        $this->assertStringNotContainsString('lang=" + document', $js);
    }
}
