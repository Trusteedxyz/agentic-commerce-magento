<?php
declare(strict_types=1);
/**
 * Spec 065 F1 — Dashboard Agent-Friendly.
 *
 * Monta la misma SPA embebida que el resto de secciones, en la sección
 * `agent-readiness`. Un solo build sirve a los cuatro hosts.
 */
namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Agentreadiness;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\View\Result\Page;

class Index extends Action implements HttpGetActionInterface
{
    private const RESOURCE = 'Trusteed_AgenticCommerce::config';

    public function __construct(Context $context, private readonly PageFactory $resultPageFactory)
    {
        parent::__construct($context);
    }

    protected function _isAllowed(): bool
    {
        return $this->_authorization->isAllowed(self::RESOURCE);
    }

    public function execute(): Page
    {
        $page = $this->resultPageFactory->create();
        $page->getConfig()->getTitle()->prepend('Trusteed — ' . __('¿Pueden comprar aquí los agentes?'));
        return $page;
    }
}
