<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Console\Command;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckWebserver extends Command
{
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        string $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setName('trusteed:check-webserver')
             ->setDescription('Check that /.well-known/mcp.json is served correctly by the webserver');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $baseUrl = rtrim((string)$this->scopeConfig->getValue(
            \Magento\Store\Model\Store::XML_PATH_UNSECURE_BASE_URL
        ), '/');

        $url = "{$baseUrl}/.well-known/mcp.json";
        $output->writeln("Checking: {$url}");

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $body = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            $output->writeln("<error>FAIL: cURL error: {$error}</error>");
            return Command::FAILURE;
        }

        if ($httpCode === 200) {
            $decoded = json_decode($body, true);
            if (isset($decoded['mcpVersion'])) {
                $output->writeln('<info>OK: /.well-known/mcp.json served correctly</info>');
                return Command::SUCCESS;
            }
            $output->writeln('<error>FAIL: Response is not a valid MCP manifest</error>');
            return Command::FAILURE;
        }

        $output->writeln("<error>FAIL: HTTP {$httpCode}</error>");
        $output->writeln('');
        $output->writeln('<comment>Fix for Nginx -- add to your server block:</comment>');
        $output->writeln('location = /.well-known/mcp.json {');
        $output->writeln('    try_files $uri /index.php?/.well-known/mcp.json;');
        $output->writeln('}');
        $output->writeln('');
        $output->writeln('<comment>Fix for Apache -- add to .htaccess:</comment>');
        $output->writeln('RewriteCond %{REQUEST_FILENAME} !-f');
        $output->writeln('RewriteRule ^\.well-known/mcp\.json$ index.php [L,QSA]');

        return Command::FAILURE;
    }
}
