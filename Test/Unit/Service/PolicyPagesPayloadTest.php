<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Service;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Service\PolicyPages\PolicyPagesPayload;

require_once __DIR__ . '/../../../Service/PolicyPages/PolicyPagesPayload.php';

/** Cuerpo de PUT /v1/embed/merchant/policy-pages: solo lo que el comercio eligió, activo y con URL segura. */
final class PolicyPagesPayloadTest extends TestCase
{
    private const ROOT = __DIR__ . '/../../..';

    private function page(string $url = 'https://tienda.example/terminos', bool $active = true, string $title = 'Términos'): array
    {
        return ['url' => $url, 'title' => $title, 'update_time' => '2026-09-01 10:00:00', 'is_active' => $active];
    }

    public function testBuildsEntriesWithoutSourceNorExtraKeys(): void
    {
        $out = PolicyPagesPayload::build(['terms' => $this->page(), 'privacy' => null, 'returns' => $this->page('https://tienda.example/devoluciones', true, 'Devoluciones')]);
        self::assertSame([
            'policyPages' => [
                ['type' => 'terms', 'url' => 'https://tienda.example/terminos', 'title' => 'Términos', 'page_modified_at' => '2026-09-01T10:00:00Z'],
                ['type' => 'returns', 'url' => 'https://tienda.example/devoluciones', 'title' => 'Devoluciones', 'page_modified_at' => '2026-09-01T10:00:00Z'],
            ],
        ], $out);
    }

    public function testNothingChosenSendsAnEmptyList(): void
    {
        self::assertSame(['policyPages' => []], PolicyPagesPayload::build([]));
    }

    public function testInactiveAndUnsafeUrlsAreOmitted(): void
    {
        $out = PolicyPagesPayload::build([
            'terms' => $this->page('https://tienda.example/a', false),
            'privacy' => $this->page('http://tienda.example/b'),
            'returns' => $this->page('https://user:pw@tienda.example/c'),
        ]);
        self::assertSame([], $out['policyPages']);
        foreach (['https://127.0.0.1/x', 'https://localhost/x', 'https://[::1]/x', 'https://caja.local/x', 'https://a.internal/x', '', 'https://tienda.example/' . str_repeat('a', 2050)] as $bad) {
            self::assertFalse(PolicyPagesPayload::isSafeUrl($bad), $bad);
        }
    }

    public function testEmptyTitleIsLeftOutAndLongTitleIsCut(): void
    {
        $out = PolicyPagesPayload::build(['terms' => $this->page('https://tienda.example/t', true, '   '), 'privacy' => $this->page('https://tienda.example/p', true, str_repeat('x', 300))]);
        self::assertArrayNotHasKey('title', $out['policyPages'][0]);
        self::assertSame(200, mb_strlen($out['policyPages'][1]['title']));
    }

    public function testReturnsIsNeverGuessedFromTitles(): void
    {
        // Una página llamada «Devoluciones» que el comercio no eligió no entra.
        self::assertSame([], PolicyPagesPayload::build(['returns' => null])['policyPages']);
    }

    public function testWiringIsDeclared(): void
    {
        self::assertStringContainsString('trusteed_report_policy_pages', (string)file_get_contents(self::ROOT . '/etc/crontab.xml'));
        self::assertStringContainsString('admin_system_config_changed_section_trusteed_general', (string)file_get_contents(self::ROOT . '/etc/adminhtml/events.xml'));
        $xml = (string)file_get_contents(self::ROOT . '/etc/adminhtml/system.xml');
        foreach (['terms_page', 'privacy_page', 'returns_page'] as $f) {
            self::assertStringContainsString('id="' . $f . '"', $xml);
        }
        $reporter = (string)file_get_contents(self::ROOT . '/Service/PolicyPages/PolicyPagesReporter.php');
        self::assertStringContainsString("'PUT'", $reporter);
        self::assertStringContainsString('/v1/embed/merchant/policy-pages', $reporter);
    }
}
