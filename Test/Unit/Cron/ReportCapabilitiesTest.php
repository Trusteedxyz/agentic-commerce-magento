<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Cron;

use Magento\Framework\Module\ModuleListInterface;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Cron\ReportCapabilities;
use Trusteed\AgenticCommerce\Service\CapabilitiesReporter;

/** The capabilities report is repeated by cron, not only at install time. */
final class ReportCapabilitiesTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        require_once __DIR__ . '/../stubs/MagentoModuleStubs.php';
    }

    private function modules(string $version): ModuleListInterface
    {
        $m = $this->createMock(ModuleListInterface::class);
        $m->method('getOne')->willReturn(['setup_version' => $version]);
        return $m;
    }

    public function testReportsEveryRunEvenWhenTheVersionDidNotChange(): void
    {
        $reporter = $this->createMock(CapabilitiesReporter::class);
        $reporter->expects(self::exactly(2))->method('report')->with('2.0.1')->willReturn(true);
        $cron = new ReportCapabilities($reporter, $this->modules('2.0.1'), $this->createMock(LoggerInterface::class));
        $cron->execute();
        $cron->execute();
    }

    public function testNeverThrowsWhenTheReporterFails(): void
    {
        $reporter = $this->createMock(CapabilitiesReporter::class);
        $reporter->method('report')->willThrowException(new \RuntimeException('network'));
        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects(self::once())->method('warning');
        (new ReportCapabilities($reporter, $this->modules('2.0.1'), $logger))->execute();
    }

    public function testCronIsRegisteredHourly(): void
    {
        $xml = (string) file_get_contents(__DIR__ . '/../../../etc/crontab.xml');
        self::assertMatchesRegularExpression('#name="trusteed_report_capabilities"\s+instance="Trusteed\\\\AgenticCommerce\\\\Cron\\\\ReportCapabilities"#', $xml);
        self::assertMatchesRegularExpression('#trusteed_report_capabilities.*?<schedule>(\d+) \* \* \* \*</schedule>#s', $xml);
    }
}
