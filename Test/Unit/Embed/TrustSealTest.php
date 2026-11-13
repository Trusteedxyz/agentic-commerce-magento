<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Embed;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Embed\TrustSeal;

require_once __DIR__ . '/../../../Model/Embed/TrustSeal.php';

/**
 * Sello de confianza (clave de firma) en Magento: paridad con WooCommerce y PrestaShop.
 * El comerciante lo activa con el botón «Activar mi protección» del Inicio; nada lo activa solo,
 * y la página Seguridad solo afirma que los pedidos están firmados cuando el sello está activo.
 */
final class TrustSealTest extends TestCase
{
    private const ROOT = __DIR__ . '/../../..';

    public function testStateFromTheApiResponses(): void
    {
        self::assertSame('active', TrustSeal::parseState(200, '{"activeKid":"k1","retiredGraceKids":[]}'));
        self::assertSame('inactive', TrustSeal::parseState(404, '{"error":"no_active_key"}'));
        self::assertSame('unknown', TrustSeal::parseState(404, '{"error":"other"}'), 'un 404 distinto no es «sin sello»');
        self::assertSame('unknown', TrustSeal::parseState(401, '{"error":"embed_auth_required"}'));
        self::assertSame('unknown', TrustSeal::parseState(200, '{"activeKid":""}'));
        self::assertSame('unknown', TrustSeal::parseState(500, 'no es json'));
    }

    public function testActivationIsOkOn201AndOnIdempotent200(): void
    {
        self::assertSame(['ok' => true, 'kid' => 'k1', 'error' => null], TrustSeal::parseActivation(201, '{"activated":true,"kid":"k1"}'));
        self::assertSame(['ok' => true, 'kid' => 'k1', 'error' => null], TrustSeal::parseActivation(200, '{"activated":false,"kid":"k1"}'));
        self::assertSame(['ok' => false, 'kid' => null, 'error' => 'http_502'], TrustSeal::parseActivation(502, '{}'));
        self::assertSame(['ok' => false, 'kid' => null, 'error' => 'http_200'], TrustSeal::parseActivation(200, '{"activated":true}'), 'sin kid no se da por activado');
    }

    public function testTheSignedOrdersClaimOnlyComesWithAnActiveSeal(): void
    {
        self::assertSame('signed', TrustSeal::guaranteeKey('active'));
        self::assertSame('pending', TrustSeal::guaranteeKey('inactive'));
        self::assertSame('pending', TrustSeal::guaranteeKey('unknown'));
    }

    public function testSecurityPageStatesTheSignatureOnlyInsideTheSignedBranch(): void
    {
        $tpl = (string)file_get_contents(self::ROOT . '/view/adminhtml/templates/seguridad.phtml');
        self::assertStringContainsString("getGuaranteeKey() === 'signed'", $tpl);
        self::assertSame(1, substr_count($tpl, "__('Every order is digitally signed')"));
        self::assertMatchesRegularExpression(
            "/\\\$signed\\s*\\?\\s*\\[[^\\]]*__\\('Every order is digitally signed'\\)/s",
            $tpl,
            'la frase «firmados» va solo en la rama $signed'
        );
        self::assertStringContainsString("__('Orders will be signed once you activate your protection')", $tpl);
    }

    public function testHomeShowsTheActivateButtonOnlyWithoutSeal(): void
    {
        $tpl = (string)file_get_contents(self::ROOT . '/view/adminhtml/templates/dashboard.phtml');
        self::assertStringContainsString("\$sealState === 'inactive'", $tpl);
        self::assertStringContainsString("__('Activate my protection →')", $tpl);
        self::assertStringContainsString('getActivateUrl()', $tpl);
        // El botón y su llamada están dentro de la rama «inactive», antes de la rama «active».
        self::assertLessThan(strpos($tpl, "\$sealState === 'active'"), strpos($tpl, 'trusteed-seal-activate'));
    }

    public function testNothingActivatesTheSealOnItsOwn(): void
    {
        foreach (['/Controller/Adminhtml/Setup/Save.php', '/Cron/EmitLagHeartbeat.php', '/Observer/SalesOrderSaveAfter.php'] as $file) {
            self::assertStringNotContainsString('keys/activate', (string)file_get_contents(self::ROOT . $file), $file);
        }
        $controller = (string)file_get_contents(self::ROOT . '/Controller/Adminhtml/Protection/Activate.php');
        self::assertStringContainsString('HttpPostActionInterface', $controller, 'solo POST: no se activa con una visita');
    }
}
