<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Setup;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Setup\ConnectionData;

require_once __DIR__ . '/../../../Model/Setup/ConnectionData.php';

/**
 * Qué se guarda tras canjear el código de conexión. En una instalación LIMPIA (sin ningún dato
 * previo) faltaba el token de integración: el Inicio y el panel decían «Aún no has conectado tu
 * tienda» y la cola de envíos no podía autenticarse, porque ambos lo leen de la configuración.
 */
final class ConnectionDataTest extends TestCase
{
    private const STORE_ID = '6ed1ef88-1bbf-413a-9a33-c98f9ee6c56e';

    /** @return array<string, string> */
    private function exchanged(string $storeId = self::STORE_ID): array
    {
        return ['connection_id' => 'conn-1', 'webhook_secret' => 'wh', 'embed_secret' => 'emb', 'store_id' => $storeId];
    }

    public function testCleanInstallStoresTheIntegrationTokenTheModuleCreated(): void
    {
        // Lo único que trae el formulario en una instalación limpia: el código de un solo uso y el
        // id del COMERCIANTE que envía la ventana de Trusteed. Nada de token de integración.
        $posted = ['connect_token' => str_repeat('a', 64), 'merchant_id' => 'merchant-account-id'];

        $saved = ConnectionData::afterExchange(
            $posted,
            $this->exchanged(),
            'integration-token-created-by-the-module',
            ['installation_id' => 'inst-1', 'hmac_secret' => 'hmac-1']
        );

        self::assertSame('integration-token-created-by-the-module', $saved['integration_token']);
        self::assertSame('conn-1', $saved['connection_id']);
        self::assertSame('wh', $saved['webhook_secret']);
        self::assertSame('emb', $saved['embed_secret']);
        self::assertSame(self::STORE_ID, $saved['merchant_id'], 'merchant_id es el id de la TIENDA, no el del comerciante');
        self::assertSame('inst-1', $saved['enforcement_installation_id']);
        self::assertSame('hmac-1', $saved['enforcement_hmac_secret']);
        self::assertArrayNotHasKey('connect_token', $saved, 'el código de un solo uso nunca se conserva');
    }

    public function testAnAlreadyConnectedInstallKeepsWorkingWhenItReconnects(): void
    {
        // Instalación que ya tenía el token por otra vía: reconectar lo deja igual de válido.
        $posted = ['connect_token' => str_repeat('b', 64), 'merchant_id' => 'm', 'integration_token' => 'old-token'];

        $saved = ConnectionData::afterExchange($posted, $this->exchanged(), 'old-token', null);

        self::assertSame('old-token', $saved['integration_token']);
        self::assertArrayNotHasKey('enforcement_installation_id', $saved, 'sin provisión no se inventan credenciales');
    }

    public function testAnEmptyTokenNeverOverwritesAStoredOne(): void
    {
        $saved = ConnectionData::afterExchange(['connect_token' => 'x', 'integration_token' => 'kept'], $this->exchanged(), '', null);

        self::assertSame('kept', $saved['integration_token']);
    }

    public function testAnOlderApiWithoutStoreIdKeepsThePostedMerchantId(): void
    {
        $saved = ConnectionData::afterExchange(['connect_token' => 'x', 'merchant_id' => 'posted'], $this->exchanged(''), 'tok', null);

        self::assertSame('posted', $saved['merchant_id']);
    }

    public function testTheWizardSaveUsesTheHelperSoTheTokenIsPersisted(): void
    {
        $src = (string)file_get_contents(__DIR__ . '/../../../Controller/Adminhtml/Setup/Save.php');
        self::assertStringContainsString('ConnectionData::afterExchange(', $src);
        self::assertStringContainsString('$this->integrationTokens->accessToken()', $src);
        self::assertStringContainsString("if (!empty(\$data['integration_token']))", $src, 'la persistencia cifrada sigue donde estaba');
    }
}
