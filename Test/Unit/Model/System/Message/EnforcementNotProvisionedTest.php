<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Model\System\Message;

require_once __DIR__ . '/../../../bootstrap.php';
require_once __DIR__ . '/../../../../../Model/System/Message/EnforcementNotProvisioned.php';

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Notification\MessageInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\System\Message\EnforcementNotProvisioned;

/**
 * El aviso que cierra el hueco A2 de la auditoría de onboarding (2026-09-09).
 *
 * `EnforcementClient::evaluate()` devuelve ALLOW incondicional mientras
 * `trusteed/enforcement/installation_id` esté vacío. Es deliberado —una tienda
 * a medio configurar no debe bloquear ventas— pero hasta hoy NADA se lo decía
 * al comerciante: conectaba la tienda, veía «configuration saved successfully»
 * y se quedaba creyendo que el enforcement estaba puesto.
 *
 * La regla que fija esta suite: el aviso se muestra **exactamente** cuando la
 * tienda está conectada pero el enforcement no puede evaluar nada. Ni antes
 * (una tienda sin conectar tiene otro problema y otro mensaje), ni después
 * (una vez provisionado, el aviso desaparece solo).
 */
final class EnforcementNotProvisionedTest extends TestCase
{
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_INSTALLATION_ID = 'trusteed/enforcement/installation_id';
    private const CONFIG_HMAC_SECRET = 'trusteed/enforcement/hmac_secret';

    /** @var ScopeConfigInterface&MockObject */
    private $scopeConfig;

    private EnforcementNotProvisioned $message;

    protected function setUp(): void
    {
        $this->scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $this->message = new EnforcementNotProvisioned($this->scopeConfig);
    }

    /**
     * @param array<string,string|null> $values
     */
    private function withConfig(array $values): void
    {
        $this->scopeConfig
            ->method('getValue')
            ->willReturnCallback(
                static fn (string $path) => $values[$path] ?? null
            );
    }

    public function testNoSeMuestraCuandoLaTiendaNoEstaConectada(): void
    {
        // Sin merchant_id el comerciante ni siquiera ha conectado: mostrarle un
        // aviso sobre enforcement le distrae del paso que sí le toca.
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => '',
            self::CONFIG_INSTALLATION_ID => '',
            self::CONFIG_HMAC_SECRET => '',
        ]);

        $this->assertFalse($this->message->isDisplayed());
    }

    public function testSeMuestraCuandoFaltaElInstallationId(): void
    {
        // Éste es el caso real tras un onboarding «correcto»: tienda conectada,
        // enforcement mudo.
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => '',
            self::CONFIG_HMAC_SECRET => '',
        ]);

        $this->assertTrue($this->message->isDisplayed());
    }

    public function testSeMuestraCuandoHayInstallationIdPeroFaltaElSecreto(): void
    {
        // Un installation_id sin secreto HMAC no puede firmar: las llamadas a
        // /v1/rules/evaluate se rechazan y el evaluador degrada a ALLOW igual.
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => 'inst_abc',
            self::CONFIG_HMAC_SECRET => '',
        ]);

        $this->assertTrue($this->message->isDisplayed());
    }

    public function testDejaDeMostrarseCuandoAmbasEstanPuestas(): void
    {
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => 'inst_abc',
            self::CONFIG_HMAC_SECRET => 'shhh',
        ]);

        $this->assertFalse($this->message->isDisplayed());
    }

    public function testEspaciosEnBlancoNoCuentanComoProvisionado(): void
    {
        // Un valor a base de espacios pasa un `!empty()` ingenuo y no firma nada.
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => '   ',
            self::CONFIG_HMAC_SECRET => "\t",
        ]);

        $this->assertTrue($this->message->isDisplayed());
    }

    public function testElIdentityEsEstableParaQueElAvisoSePuedaDescartar(): void
    {
        // Magento guarda el hash como «ya visto». Si cambiara entre peticiones,
        // el aviso reaparecería eternamente aunque el comerciante lo cerrara.
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => '',
            self::CONFIG_HMAC_SECRET => '',
        ]);

        $this->assertSame($this->message->getIdentity(), $this->message->getIdentity());
        $this->assertNotSame('', $this->message->getIdentity());
    }

    public function testSeveridadMayorParaQueNoSeConfundaConUnaSugerencia(): void
    {
        $this->assertSame(MessageInterface::SEVERITY_MAJOR, $this->message->getSeverity());
    }

    public function testElTextoDiceQueNoHayProteccionYAdondeIr(): void
    {
        $this->withConfig([
            self::CONFIG_MERCHANT_ID => 'mrc_123',
            self::CONFIG_INSTALLATION_ID => '',
            self::CONFIG_HMAC_SECRET => '',
        ]);

        $text = (string) $this->message->getText();

        // No basta con avisar: el comerciante tiene que saber qué NO está
        // pasando y qué hacer. Un «configura el enforcement» a secas es lo que
        // teníamos (nada) con otra forma.
        $this->assertStringContainsString('enforcement', strtolower($text));
        $this->assertMatchesRegularExpression('/checkout/i', $text);
        $this->assertMatchesRegularExpression('/Trusteed/', $text);
    }
}
