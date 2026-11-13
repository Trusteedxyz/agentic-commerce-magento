<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\View;

use PHPUnit\Framework\TestCase;

/**
 * El asistente de conexión llevaba cuatro fieldsets con solo campos ocultos (api_base_url, merchant_id,
 * tokens e ids de conexión): cada uno dejaba un bloque en blanco y juntos un hueco de unos 250 px bajo
 * el botón Guardar. Se ocultan con una clase y un estilo cargado por el layout.
 */
final class WizardHiddenStepsTest extends TestCase
{
    private const ROOT = __DIR__ . '/../../..';

    public function testTheFourHiddenFieldFieldsetsCarryTheHidingClass(): void
    {
        $xml = (string)file_get_contents(self::ROOT . '/view/adminhtml/ui_component/trusteed_setup_form.xml');
        foreach (['step_api_connection', 'step_merchant_id', 'step_token_hidden', 'step_connection_ids'] as $name) {
            $block = (string)preg_match('/<fieldset name="' . $name . '">.*?<\/fieldset>/s', $xml, $m) ? $m[0] : '';
            self::assertStringContainsString('trusteed-hidden-step', $block, $name);
            self::assertStringContainsString('formElement="hidden"', $block, $name . ' solo debe tener campos ocultos');
        }
    }

    public function testTheLayoutLoadsTheStyleAndTheStyleHidesTheClass(): void
    {
        $layout = (string)file_get_contents(self::ROOT . '/view/adminhtml/layout/trusteed_setup_wizard.xml');
        self::assertStringContainsString('Trusteed_AgenticCommerce::wizard_styles.phtml', $layout);
        $tpl = (string)file_get_contents(self::ROOT . '/view/adminhtml/templates/wizard_styles.phtml');
        self::assertMatchesRegularExpression('/\.trusteed-hidden-step\s*\{[^}]*display:\s*none/', $tpl);
    }
}
