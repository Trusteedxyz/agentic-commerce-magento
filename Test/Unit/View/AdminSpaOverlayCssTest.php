<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\View;

use PHPUnit\Framework\TestCase;

/**
 * El detalle de un recibo (capa fija de la SPA con un panel `max-w-md`) salía a pantalla completa y por debajo del
 * menú de Magento, con el texto cortado: la regla que ensancha los contenedores de la SPA también ensanchaba el panel.
 */
final class AdminSpaOverlayCssTest extends TestCase
{
    private function css(): string
    {
        $phtml = (string)file_get_contents(__DIR__ . '/../../../view/adminhtml/templates/reglas.phtml');
        $this->assertSame(1, preg_match('#<style>(.*?)</style>#s', $phtml, $m));

        return $m[1];
    }

    public function test_los_paneles_de_una_capa_fija_conservan_su_ancho(): void
    {
        $css = $this->css();
        foreach (['md' => '28rem', '2xl' => '42rem', '3xl' => '48rem', '4xl' => '56rem', '5xl' => '64rem', '6xl' => '72rem'] as $size => $width) {
            $this->assertStringContainsString("#amcp-root .fixed .max-w-{$size} { max-width: {$width} !important; }", $css);
        }
    }

    public function test_la_capa_fija_va_por_encima_del_menu_de_magento(): void
    {
        // El menú lateral de Magento tiene z-index 700.
        $this->assertMatchesRegularExpression('/#amcp-root \.fixed\.inset-0\.z-50 \{ z-index: (\d+) !important; \}/', $this->css());
        preg_match('/#amcp-root \.fixed\.inset-0\.z-50 \{ z-index: (\d+)/', $this->css(), $m);
        $this->assertGreaterThan(900, (int)$m[1]);
    }

    public function test_las_excepciones_van_despues_de_la_regla_que_ensancha(): void
    {
        $css = $this->css();
        $this->assertGreaterThan(
            (int)strpos($css, '#amcp-root [class*="max-w-6xl"]'),
            (int)strpos($css, '#amcp-root .fixed .max-w-md')
        );
    }
}
