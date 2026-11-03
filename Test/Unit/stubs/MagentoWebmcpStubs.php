<?php

declare(strict_types=1);

/**
 * Formas mínimas de los símbolos de Magento que usa Controller/Webmcp/Checkout.php. Con el
 * framework real cargado (class_exists) no se declara nada.
 */

namespace Magento\Framework\App\Action {
    if (!\interface_exists(HttpPostActionInterface::class)) {
        interface HttpPostActionInterface
        {
            public function execute();
        }
    }
    if (!\interface_exists(CsrfAwareActionInterface::class)) {
        interface CsrfAwareActionInterface
        {
            public function createCsrfValidationException(\Magento\Framework\App\RequestInterface $request): ?\Magento\Framework\App\Request\InvalidRequestException;

            public function validateForCsrf(\Magento\Framework\App\RequestInterface $request): ?bool;
        }
    }
}

namespace Magento\Framework\App\Request {
    if (!\class_exists(InvalidRequestException::class)) {
        class InvalidRequestException extends \Exception
        {
            public function __construct(private readonly mixed $response = null, private readonly array $errors = [])
            {
                parent::__construct('invalid request');
            }

            public function getReplaceResult(): mixed
            {
                return $this->response;
            }
        }
    }
    if (!\class_exists(Http::class)) {
        class Http implements \Magento\Framework\App\RequestInterface
        {
            public function getParam($key, $defaultValue = null)
            {
                return $defaultValue;
            }
            public function getContent(): string
            {
                return '';
            }
            public function getHeader($name, $default = false)
            {
                return $default;
            }
            public function getMethod(): string
            {
                return 'POST';
            }
            public function getRequestUri(): string
            {
                return '';
            }
        }
    }
}

namespace Magento\Framework\Controller\Result {
    if (!\class_exists(Json::class)) {
        class Json
        {
            public mixed $data = null;
            public int $code = 200;

            public function setData($data)
            {
                $this->data = $data;
                return $this;
            }
            public function setHttpResponseCode($code)
            {
                $this->code = (int) $code;
                return $this;
            }
        }
    }
    if (!\class_exists(JsonFactory::class)) {
        class JsonFactory
        {
            public function create(array $data = []): Json
            {
                return new Json();
            }
        }
    }
}

namespace Magento\Framework\Data\Form {
    if (!\class_exists(FormKey::class)) {
        class FormKey
        {
            public function getFormKey(): string
            {
                return '';
            }
        }
    }
}

namespace Magento\Quote\Api {
    if (!\interface_exists(CartRepositoryInterface::class)) {
        interface CartRepositoryInterface
        {
            public function save($quote);
        }
    }
}

namespace Magento\Framework {
    if (!\interface_exists(UrlInterface::class)) {
        interface UrlInterface
        {
            public function getBaseUrl($params = []);

            public function getUrl($routePath = null, $routeParams = null);
        }
    }
}

namespace Magento\Framework\View\Element\Block {
    if (!\interface_exists(ArgumentInterface::class)) {
        interface ArgumentInterface
        {
        }
    }
}
