<?php
/**
 * Spec-048 4.9 — reporta a Trusteed qué señales de carrito sabe proyectar
 * ESTA instalación de Magento.
 *
 * POR QUÉ EXISTE. El servidor sabe qué señal lee cada regla
 * (`RULE_SIGNALS_READ`), pero no sabía qué aporta cada instalación. Sin ese
 * cruce, una regla cuya señal no llega devuelve `NO_SIGNAL` en cada checkout:
 * pasa en silencio, y el comerciante ve una regla en ENFORCE que no bloquea
 * nada. Con el reporte, el panel puede avisarle al activarla.
 *
 * MAGENTO ES EL CASO INTERESANTE: aporta 31 señales, más del doble que
 * cualquier otra plataforma, porque además del contexto de carrito proyecta el
 * historial del agente (`projectAgentHistorySignals`) que en las demás resuelve
 * el servidor. El diagnóstico lo refleja: sólo tres reglas se quedan sin
 * ninguna señal de carrito aquí, frente a seis o siete en el resto.
 *
 * FIRMA. HMAC-SHA256 sobre el JSON canónico del cuerpo sin `signature`, el
 * mismo esquema que el resto de emisores del módulo. El servidor verifica
 * contra el cuerpo tal como llega, así que el orden del array no importa.
 *
 * La lista sale de `CheckoutSubmitBefore::signalsProvided()`, que un gate en
 * `packages/shared` mantiene pegada a lo que el observer escribe de verdad.
 */

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;
use Magento\Framework\HTTP\Client\Curl;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;

class CapabilitiesReporter
{
    private const ENDPOINT_PATH = '/api/v1/enforcement/capabilities';

    // Rutas verificadas contra `Service/EnforcementClient.php` — ojo, NO son
    // homogéneas: merchant id y api base viven bajo `trusteed_general/general/`
    // mientras que las credenciales de enforcement viven bajo
    // `trusteed/enforcement/`.
    private const CONFIG_MERCHANT_ID     = 'trusteed_general/general/merchant_id';
    private const CONFIG_INSTALLATION_ID = 'trusteed/enforcement/installation_id';
    private const CONFIG_HMAC_SECRET     = 'trusteed/enforcement/hmac_secret';
    private const CONFIG_API_BASE        = 'trusteed_general/general/api_base_url';

    /** Dónde se recuerda la última versión reportada. */
    private const CONFIG_REPORTED_VERSION = 'trusteed/enforcement/caps_reported_version';

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly WriterInterface $configWriter,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
    ) {
    }

    /**
     * Manda el reporte si la versión del módulo cambió desde el último envío.
     */
    public function maybeReport(string $moduleVersion): void
    {
        try {
            $reported = (string) ($this->scopeConfig->getValue(self::CONFIG_REPORTED_VERSION) ?? '');
            if ($reported === $moduleVersion) {
                return;
            }
            if ($this->report($moduleVersion)) {
                $this->configWriter->save(self::CONFIG_REPORTED_VERSION, $moduleVersion);
            }
        } catch (\Throwable $e) {
            // Que el diagnóstico no llegue nunca puede romper el flujo del comprador.
            $this->logger->warning('[spec-048 4.9] capabilities report failed: ' . $e->getMessage());
        }
    }

    public function report(string $moduleVersion): bool
    {
        $merchantId     = (string) ($this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID) ?? '');
        $installationId = (string) ($this->scopeConfig->getValue(self::CONFIG_INSTALLATION_ID) ?? '');
        $hmacSecret     = (string) ($this->scopeConfig->getValue(self::CONFIG_HMAC_SECRET) ?? '');
        $apiBase        = (string) ($this->scopeConfig->getValue(self::CONFIG_API_BASE) ?? '');

        if ($merchantId === '' || $installationId === '' || $hmacSecret === '' || $apiBase === '') {
            return false;
        }

        $signals = [];
        foreach (CheckoutSubmitBefore::signalsProvided() as $attr) {
            // El vocabulario del servidor prefija con `cartAttr.`.
            $signals[] = 'cartAttr.' . $attr;
        }

        $body = [
            'installationId'  => $installationId,
            'merchantId'      => $merchantId,
            'platform'        => 'MAGENTO',
            'pluginVersion'   => $moduleVersion,
            'signalsProvided' => $signals,
        ];
        $body['signature'] = $this->hmacSign($body, $hmacSecret);

        $payload = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($payload === false) {
            return false;
        }

        $this->curl->setTimeout(3);
        $this->curl->addHeader('Content-Type', 'application/json');
        $this->curl->addHeader('Accept', 'application/json');
        $this->curl->post(rtrim($apiBase, '/') . self::ENDPOINT_PATH, $payload);

        return $this->curl->getStatus() === 202;
    }

    /**
     * @param array<string, mixed> $body
     */
    private function hmacSign(array $body, string $secret): string
    {
        $sorted    = $this->recursiveKsort($body);
        $canonical = json_encode($sorted, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return hash_hmac('sha256', (string) $canonical, $secret);
    }

    /**
     * Ordena claves recursivamente; las listas conservan su orden a propósito
     * (el servidor firma contra el cuerpo recibido, no contra el normalizado).
     *
     * @param mixed $value
     * @return mixed
     */
    private function recursiveKsort($value)
    {
        if (is_array($value)) {
            $isAssoc = array_keys($value) !== range(0, count($value) - 1);
            if ($isAssoc) {
                ksort($value, SORT_STRING);
            }
            foreach ($value as $k => $v) {
                $value[$k] = $this->recursiveKsort($v);
            }
        }

        return $value;
    }
}
