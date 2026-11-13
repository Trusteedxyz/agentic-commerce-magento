<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Protection;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Backend\Model\Auth\Session as AuthSession;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\ResultInterface;
use Trusteed\AgenticCommerce\Model\Embed\TrustSeal;

/**
 * POST trusteed/protection/activate: «Activar mi protección» del Inicio del módulo.
 *
 * Acción explícita del comerciante (paridad con WooCommerce y PrestaShop). Idempotente: si ya hay
 * sello responde ok sin crear otro. Un fallo devuelve un error comprensible, nunca un 500.
 */
class Activate extends Action implements HttpPostActionInterface
{
    public const ADMIN_RESOURCE = 'Trusteed_AgenticCommerce::token';

    public function __construct(
        Context $context,
        private readonly JsonFactory $jsonFactory,
        private readonly AuthSession $authSession,
        private readonly TrustSeal $trustSeal
    ) {
        parent::__construct($context);
    }

    protected function _isAllowed(): bool
    {
        return $this->_authorization->isAllowed(self::ADMIN_RESOURCE);
    }

    public function execute(): ResultInterface
    {
        $result = $this->jsonFactory->create();
        $adminUser = $this->authSession->getUser();
        $adminId = $adminUser ? (int)$adminUser->getId() : 0;
        if ($adminId <= 0) {
            return $result->setHttpResponseCode(401)->setData(['ok' => false, 'error' => 'admin_session_missing']);
        }

        $activation = $this->trustSeal->activate($adminId);
        if (!$activation['ok']) {
            return $result->setHttpResponseCode(502)->setData([
                'ok' => false,
                'error' => 'activation_failed',
                'message' => (string)__('We could not activate your protection right now. Try again in a few minutes.'),
            ]);
        }

        return $result->setData(['ok' => true]);
    }
}
