<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\ViewModel;

use Magento\Framework\Data\Form\FormKey;
use Magento\Framework\UrlInterface;
use Magento\Framework\View\Element\Block\ArgumentInterface;

/** Configuración de `window.__trusteedCheckoutTools` para la página de checkout. */
class CheckoutToolsConfig implements ArgumentInterface
{
    public function __construct(
        private readonly FormKey $formKey,
        private readonly UrlInterface $url,
    ) {}

    /** JSON seguro para incrustar dentro de un <script>: `<`, `>`, `&` y comillas van escapados. */
    public function toJson(): string
    {
        return (string)json_encode([
            'endpoint'    => $this->url->getUrl('trusteed/webmcp/checkout', ['_secure' => true]),
            'nonce'       => $this->formKey->getFormKey(),
            'nonceHeader' => 'X-Trusteed-Form-Key',
            'platform'    => 'magento',
        ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    }
}
