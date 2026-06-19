<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Router;

use Magento\Framework\App\ActionFactory;
use Magento\Framework\App\ActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\RouterInterface;
use Trusteed\AgenticCommerce\Controller\Wellknown\McpManifest;

/**
 * Custom router matching exactly /.well-known/mcp.json.
 *
 * Serves the identical signed manifest payload regardless of which
 * configured store-view domain receives the request (clarification Q1).
 *
 * Registered with sortOrder=10 in etc/frontend/di.xml so it runs
 * before the standard Magento router chain. Returns the McpManifest
 * action directly instead of forwarding: a Forward leaves the request
 * pathInfo unchanged, so this router would re-match every routing
 * iteration and trip the front controller's 100-iteration loop guard.
 */
class WellKnownRouter implements RouterInterface
{
    private const WELL_KNOWN_PATH = '/.well-known/mcp.json';

    public function __construct(
        private readonly ActionFactory $actionFactory,
    ) {}

    public function match(RequestInterface $request): ?ActionInterface
    {
        $pathInfo = $request->getPathInfo();

        if ($pathInfo !== self::WELL_KNOWN_PATH) {
            return null;
        }

        $request->setModuleName('nlweb')
            ->setControllerName('wellknown')
            ->setActionName('mcpmanifest');

        return $this->actionFactory->create(McpManifest::class);
    }
}
