<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\View;

use PHPUnit\Framework\TestCase;

/**
 * C6 (654ff1b7b): el texto que ve el comerciante no lleva rayas largas.
 * Cubre las cadenas traducibles de las plantillas del admin y los CSV de i18n.
 */
final class NoEmDashInUserFacingCopyTest extends TestCase
{
    private const ROOT = __DIR__ . '/../../..';

    public function testI18nCsvFilesHaveNoEmDash(): void
    {
        foreach (glob(self::ROOT . '/i18n/*.csv') ?: [] as $file) {
            self::assertStringNotContainsString("\u{2014}", (string) file_get_contents($file), basename($file));
        }
    }

    public function testTranslatableStringsInAdminTemplatesHaveNoEmDash(): void
    {
        foreach (glob(self::ROOT . '/view/adminhtml/templates/*.phtml') ?: [] as $file) {
            preg_match_all("/__\\('((?:[^'\\\\]|\\\\.)*)'/", (string) file_get_contents($file), $m);
            foreach ($m[1] as $msg) {
                self::assertStringNotContainsString("\u{2014}", $msg, basename($file) . ': ' . $msg);
            }
        }
    }
}
