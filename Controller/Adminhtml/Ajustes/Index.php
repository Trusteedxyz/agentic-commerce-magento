<?php
declare(strict_types=1);
namespace Trusteed\AgenticCommerce\Controller\Adminhtml\Ajustes;
use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\View\Result\Page;
class Index extends Action implements HttpGetActionInterface
{
    private const RESOURCE = 'Trusteed_AgenticCommerce::config';
    public function __construct(Context $context, private readonly PageFactory $resultPageFactory) {
        parent::__construct($context);
    }
    protected function _isAllowed(): bool { return $this->_authorization->isAllowed(self::RESOURCE); }
    public function execute(): Page {
        $page = $this->resultPageFactory->create();
        $page->getConfig()->getTitle()->prepend(__('Trusteed — Ajustes'));
        return $page;
    }
}
