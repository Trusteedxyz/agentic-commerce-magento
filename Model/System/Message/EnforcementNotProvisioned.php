<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\System\Message;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Notification\MessageInterface;
use Magento\Framework\Phrase;

/**
 * Aviso de administración: la tienda está conectada pero el enforcement de
 * checkout no puede evaluar nada — auditoría de onboarding 2026-09-09, hueco A2.
 *
 * ## El fallo que cierra
 *
 * `Service\EnforcementClient::evaluate()` devuelve `DECISION_ALLOW`
 * incondicional mientras `trusteed/enforcement/installation_id` esté vacío
 * (ver el corto-circuito en ese fichero). La decisión es correcta —una tienda a
 * medio configurar no debe bloquear ventas—, pero era **silenciosa**: el
 * asistente conectaba la tienda, decía «Trusteed configuration saved
 * successfully» y el comerciante se quedaba creyendo que tenía enforcement.
 * Nada en todo el back office lo desmentía.
 *
 * WooCommerce ya resolvía esto (`Trusteed_Plugin::NOTICE_OPTION_INSTALLATION_STUB`);
 * esta clase es su contraparte en Magento.
 *
 * ## Por qué se calla si la tienda no está conectada
 *
 * Sin `merchant_id` el comerciante tiene otro problema y otro paso pendiente
 * (§6 de la guía de instalación). Encadenarle dos avisos a la vez sobre cosas
 * distintas convierte los dos en ruido.
 *
 * ## Por qué exige TAMBIÉN el secreto
 *
 * Un `installation_id` sin `hmac_secret` supera el corto-circuito y luego no
 * puede firmar: `/v1/rules/evaluate` rechaza la llamada y el evaluador degrada
 * a ALLOW por la otra puerta. Desde fuera es indistinguible de no tener nada,
 * así que cuenta como no provisionado.
 *
 * ## Dependencia deliberadamente blanda con Magento_AdminNotification
 *
 * `MessageInterface` vive en `magento/framework`, que ya es dependencia. El
 * módulo NO añade `magento/module-admin-notification` a `composer.json` para no
 * romper instalaciones que lo hayan desactivado: el enganche vive sólo en
 * `etc/di.xml`, y si esa lista no existe el aviso queda inerte sin romper nada.
 */
class EnforcementNotProvisioned implements MessageInterface
{
    /**
     * Identidad estable. Magento la hashea y guarda como «ya visto» cuando el
     * comerciante descarta el aviso; si variase entre peticiones el aviso
     * reaparecería para siempre por mucho que lo cerrasen.
     */
    private const IDENTITY = 'trusteed_enforcement_not_provisioned';

    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_INSTALLATION_ID = 'trusteed/enforcement/installation_id';
    private const CONFIG_HMAC_SECRET = 'trusteed/enforcement/hmac_secret';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
    ) {
    }

    public function getIdentity(): string
    {
        return self::IDENTITY;
    }

    public function isDisplayed(): bool
    {
        if (!$this->isSet(self::CONFIG_MERCHANT_ID)) {
            // Tienda sin conectar: no es este el aviso que le toca.
            return false;
        }

        return !$this->isSet(self::CONFIG_INSTALLATION_ID)
            || !$this->isSet(self::CONFIG_HMAC_SECRET);
    }

    public function getText(): Phrase
    {
        return __(
            'Trusteed: checkout enforcement is NOT active on this store. '
            . 'Your store is connected, but the enforcement credentials '
            . '(Installation ID and HMAC Secret) have not been provisioned, so '
            . 'every checkout is being allowed through without a single rule '
            . 'being evaluated. Ask Trusteed for those two values and enter '
            . 'them under Trusteed → Configuración, section "Checkout '
            . 'Enforcement (CEL)". If you do not need enforcement you can '
            . 'dismiss this notice — the rest of the module works.'
        );
    }

    public function getSeverity(): int
    {
        // MAJOR y no NOTICE: el comerciante cree tener un control de seguridad
        // que no tiene. Eso no es una sugerencia de configuración.
        return MessageInterface::SEVERITY_MAJOR;
    }

    /**
     * Vacío, sólo espacios o ausente cuentan todos como «sin provisionar». Un
     * `!empty()` a secas dejaría pasar `"   "`, que no firma nada.
     */
    private function isSet(string $path): bool
    {
        return trim((string) $this->scopeConfig->getValue($path)) !== '';
    }
}
