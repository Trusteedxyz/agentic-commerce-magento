<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Router;

use Magento\Framework\App\ActionFactory;
use Magento\Framework\App\ActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\RouterInterface;
use Trusteed\AgenticCommerce\Controller\Wellknown\McpManifest;
use Trusteed\AgenticCommerce\Controller\Wellknown\UcpProfile;

/**
 * Custom router matching /.well-known/mcp.json and /.well-known/ucp.
 *
 * Serves the identical signed manifest payload regardless of which
 * configured store-view domain receives the request.
 *
 * Registered with sortOrder=10 in etc/frontend/di.xml so it runs
 * before the standard Magento router chain. Returns the target action
 * directly instead of forwarding: a Forward leaves the request pathInfo
 * unchanged, so this router would re-match every routing iteration and
 * trip the front controller's 100-iteration loop guard.
 */
class WellKnownRouter implements RouterInterface
{
    private const WELL_KNOWN_PATH = '/.well-known/mcp.json';
    private const UCP_PROFILE_PATH = '/.well-known/ucp';

    /** @var array<string, class-string> Path to controller action class. */
    private const ROUTES = [
        self::WELL_KNOWN_PATH => McpManifest::class,
        self::UCP_PROFILE_PATH => UcpProfile::class,
    ];

    public function __construct(
        private readonly ActionFactory $actionFactory,
    ) {}

    public function match(RequestInterface $request): ?ActionInterface
    {
        $pathInfo = $request->getPathInfo();

        if (!isset(self::ROUTES[$pathInfo])) {
            return null;
        }

        $request->setModuleName('nlweb')
            ->setControllerName('wellknown')
            ->setActionName('mcpmanifest');

        return $this->actionFactory->create(self::ROUTES[$pathInfo]);
    }
}
