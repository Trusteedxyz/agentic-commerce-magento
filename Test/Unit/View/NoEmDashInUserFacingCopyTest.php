<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\View;

use PHPUnit\Framework\TestCase;

/**
 * Text shown to the merchant contains no long dashes.
 * Covers the translatable strings in the admin templates and the i18n CSV files.
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
