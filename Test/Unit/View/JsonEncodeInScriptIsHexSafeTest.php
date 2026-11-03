<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\View;

use PHPUnit\Framework\TestCase;

/**
 * C8: todo `json_encode` que vuelca un valor dentro de un <script> de las plantillas del admin
 * lleva JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT (un `</script>` en un valor
 * no puede cerrar el bloque), y la bandera hace lo que dice.
 */
final class JsonEncodeInScriptIsHexSafeTest extends TestCase
{
    public function testEveryJsonEncodeInAdminTemplatesUsesTheHexFlags(): void
    {
        $required = ['JSON_HEX_TAG', 'JSON_HEX_AMP', 'JSON_HEX_APOS', 'JSON_HEX_QUOT'];
        foreach (glob(__DIR__ . '/../../../view/adminhtml/templates/*.phtml') ?: [] as $file) {
            foreach (file($file) ?: [] as $i => $line) {
                if (!str_contains($line, 'json_encode(') || str_trim_comment($line)) {
                    continue;
                }
                foreach ($required as $flag) {
                    self::assertStringContainsString($flag, $line, basename($file) . ':' . ($i + 1));
                }
            }
        }
    }

    public function testTheFlagsNeutraliseAClosingScriptTag(): void
    {
        $flags = JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
        $out = (string) json_encode('</script><script>alert(1)</script>&\'"', $flags);
        self::assertStringNotContainsString('</script>', $out);
        self::assertStringNotContainsString('<', $out);
    }
}

function str_trim_comment(string $line): bool
{
    return str_starts_with(ltrim($line), '//') || str_starts_with(ltrim($line), '*');
}
