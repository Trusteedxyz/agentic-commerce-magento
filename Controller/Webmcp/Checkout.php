<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Webmcp;

use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\CsrfAwareActionInterface;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\App\Request\InvalidRequestException;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Data\Form\FormKey;
use Magento\Framework\UrlInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Observer\CheckoutSubmitBefore;
use Trusteed\AgenticCommerce\Service\BrowserAgentSignature;

/**
 * Endpoint WebMCP del checkout: tools `get_checkout`, `update_checkout`, `complete_checkout`.
 * Port de `Trusteed_Webmcp_Checkout` (WooCommerce), misma conducta.
 *
 * - CSRF: la clave de formulario de Magento (ligada a la sesión) viaja en `X-Trusteed-Form-Key`
 *   y se compara con `hash_equals`; el parámetro `form_key` del cuerpo NO vale. Si hay `Origin`,
 *   su esquema+host+puerto debe ser el de la tienda (ausente se admite; `null` se rechaza).
 * - Marca de agente en la sesión de checkout SOLO tras pasar todas las comprobaciones y antes de
 *   despachar; ninguna entrada del cliente la puede quitar.
 * - `complete_checkout` jamás crea pedido: devuelve la URL del checkout para que lo confirme la persona.
 * - Ajuste apagado: 404 sin tocar la sesión.
 */
class Checkout implements HttpPostActionInterface, CsrfAwareActionInterface
{
    public const CONFIG_ENABLED = 'trusteed_general/features/webmcp_checkout_tools';
    public const FORM_KEY_HEADER = 'X-Trusteed-Form-Key';
    public const MAX_BODY_BYTES  = 16384;
    public const TOOLS           = ['get_checkout', 'update_checkout', 'complete_checkout'];

    private const ADDRESS_FIELDS = ['address1', 'address2', 'city', 'postal_code', 'country_code', 'province_code', 'first_name', 'last_name'];

    public function __construct(
        private readonly Http $request,
        private readonly JsonFactory $jsonFactory,
        private readonly CheckoutSession $checkoutSession,
        private readonly FormKey $formKey,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly UrlInterface $url,
        private readonly CartRepositoryInterface $cartRepository,
        private readonly BrowserAgentSignature $browserSignature,
        private readonly LoggerInterface $logger,
    ) {}

    public function createCsrfValidationException(RequestInterface $request): ?InvalidRequestException
    {
        return new InvalidRequestException($this->json(['error' => 'forbidden'], 403));
    }

    /** Apagado ⇒ true: el 404 lo da `execute()` sin que el endpoint revele nada. */
    public function validateForCsrf(RequestInterface $request): ?bool
    {
        if (!$this->enabled()) {
            return true;
        }
        $sent = method_exists($request, 'getHeader') ? $request->getHeader(self::FORM_KEY_HEADER) : false;
        $key  = $this->formKey->getFormKey();
        if (!is_string($sent) || $sent === '' || $key === '' || !hash_equals($key, $sent)) {
            return false;
        }
        return $this->originAllowed($request);
    }

    public function execute(): Json
    {
        if (!$this->enabled()) {
            return $this->json(['error' => 'not_found'], 404);
        }

        // Web Bot Auth en cada llamada; en observe solo se anota y nunca se bloquea a una persona.
        $this->verifySignature();

        $raw = $this->request->getContent();
        if (strlen($raw) > self::MAX_BODY_BYTES) {
            return $this->json(['error' => 'payload_too_large'], 413);
        }
        $body = json_decode($raw, true);
        $tool = is_array($body) && isset($body['tool']) && is_string($body['tool']) ? $body['tool'] : '';
        if (!in_array($tool, self::TOOLS, true)) {
            return $this->json(['error' => 'unknown_tool'], 400);
        }
        $args     = isset($body['arguments']) && is_array($body['arguments']) ? $body['arguments'] : [];
        $checkout = isset($args['checkout']) && is_array($args['checkout']) ? $args['checkout'] : [];

        $quote = $this->checkoutSession->getQuote();
        if ($quote === null || (int)$quote->getItemsCount() === 0) {
            return $this->json(['status' => 'empty'], 200);
        }

        // Una petición nueva no trae tarifas ni totales: recalcular antes de validar y de describir.
        $this->recalculate($quote);

        if ($tool === 'update_checkout' && !$this->shippingMethodIsValid($quote, $checkout)) {
            return $this->json(['error' => 'invalid_shipping_method'], 400);
        }

        // Marcar ANTES de despachar; solo añade restricciones.
        $this->checkoutSession->setData(CheckoutSubmitBefore::SESSION_AGENTIC_ORIGIN, '1');
        $this->checkoutSession->setData(CheckoutSubmitBefore::SESSION_AGENTIC_CHANNEL, 'webmcp');

        if ($tool === 'complete_checkout') {
            return $this->json([
                'status'       => 'requires_buyer_confirmation',
                'checkout_url' => $this->url->getUrl('checkout', ['_secure' => true]),
            ], 200);
        }
        if ($tool === 'update_checkout') {
            $this->applyUpdate($quote, $checkout);
        }
        return $this->json($this->describe($quote), 200);
    }

    private function enabled(): bool
    {
        return $this->scopeConfig->isSetFlag(self::CONFIG_ENABLED);
    }

    private function json(array $data, int $code): Json
    {
        return $this->jsonFactory->create()->setHttpResponseCode($code)->setData($data);
    }

    private function verifySignature(): void
    {
        try {
            if ($this->browserSignature->mode() === 'off') {
                return;
            }
            $this->browserSignature->resolve(
                BrowserAgentSignature::collectHeaders($this->request),
                (string)$this->request->getMethod(),
                (string)$this->request->getRequestUri()
            );
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] webmcp signature check failed: ' . get_class($e));
        }
    }

    private function originAllowed(RequestInterface $request): bool
    {
        $origin = method_exists($request, 'getHeader') ? $request->getHeader('Origin') : false;
        if ($origin === false || $origin === null || $origin === '') {
            return true;
        }
        $mine = self::originOf($this->url->getBaseUrl(['_secure' => true]));
        $got  = is_string($origin) ? self::originOf($origin) : null;
        return $got !== null && $got === $mine;
    }

    /** `scheme://host:port` en minúsculas con el puerto por defecto explícito; null si no es una URL. */
    private static function originOf(string $url): ?string
    {
        $p = parse_url($url);
        if (!is_array($p) || empty($p['scheme']) || empty($p['host'])) {
            return null;
        }
        $scheme = strtolower($p['scheme']);
        return $scheme . '://' . strtolower($p['host']) . ':' . ($p['port'] ?? ($scheme === 'https' ? 443 : 80));
    }

    private function recalculate(object $quote): void
    {
        $address = $quote->getShippingAddress();
        $address->setCollectShippingRates(true);
        $quote->collectTotals();
        $address->collectShippingRates();
    }

    /** @param array<string,mixed> $checkout */
    private function shippingMethodIsValid(object $quote, array $checkout): bool
    {
        $method = $checkout['fulfillment']['method_id'] ?? null;
        if ($method === null || $method === '') {
            return true;
        }
        if (!is_string($method)) {
            return false;
        }
        foreach ($quote->getShippingAddress()->getAllShippingRates() as $rate) {
            if ($rate->getCode() === $method) {
                return true;
            }
        }
        return false;
    }

    /** @param array<string,mixed> $checkout */
    private function applyUpdate(object $quote, array $checkout): void
    {
        $address = $quote->getShippingAddress();

        $email = $checkout['buyer']['email'] ?? null;
        if (is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
            $quote->setCustomerEmail($email);
        }

        $fulfillment = isset($checkout['fulfillment']) && is_array($checkout['fulfillment']) ? $checkout['fulfillment'] : [];
        $in = isset($fulfillment['address']) && is_array($fulfillment['address']) ? $fulfillment['address'] : [];
        $v  = [];
        foreach (self::ADDRESS_FIELDS as $field) {
            if (isset($in[$field]) && is_string($in[$field])) {
                $v[$field] = trim(strip_tags($in[$field]));
            }
        }
        if (isset($v['address1']) || isset($v['address2'])) {
            $address->setStreet([$v['address1'] ?? $address->getStreetLine(1), $v['address2'] ?? $address->getStreetLine(2)]);
        }
        isset($v['city']) && $address->setCity($v['city']);
        isset($v['postal_code']) && $address->setPostcode($v['postal_code']);
        isset($v['country_code']) && $address->setCountryId($v['country_code']);
        isset($v['province_code']) && $address->setRegionCode($v['province_code']);
        isset($v['first_name']) && $address->setFirstname($v['first_name']);
        isset($v['last_name']) && $address->setLastname($v['last_name']);

        $methodId = $fulfillment['method_id'] ?? null;
        if (is_string($methodId) && $methodId !== '') {
            $address->setShippingMethod($methodId);
        }

        $this->recalculate($quote);
        $this->cartRepository->save($quote);
    }

    /** @return array<string,mixed> */
    private function describe(object $quote): array
    {
        $items = [];
        foreach ($quote->getAllVisibleItems() as $item) {
            $items[] = [
                'name'       => (string)$item->getName(),
                'quantity'   => (int)$item->getQty(),
                'line_total' => (float)$item->getRowTotal(),
            ];
        }
        $address = $quote->getShippingAddress();
        $method  = (string)$address->getShippingMethod();

        return [
            'status'      => 'open',
            'currency'    => (string)$quote->getQuoteCurrencyCode(),
            'items'       => $items,
            'totals'      => [
                'subtotal' => (float)$quote->getSubtotal(),
                'shipping' => (float)$address->getShippingAmount(),
                'tax'      => (float)$address->getTaxAmount(),
                'total'    => (float)$quote->getGrandTotal(),
            ],
            'buyer'       => ['email' => (string)$quote->getCustomerEmail()],
            'fulfillment' => [
                'address'   => [
                    'address1'     => (string)$address->getStreetLine(1),
                    'city'         => (string)$address->getCity(),
                    'postal_code'  => (string)$address->getPostcode(),
                    'country_code' => (string)$address->getCountryId(),
                ],
                'method_id' => $method !== '' ? $method : null,
            ],
        ];
    }
}
