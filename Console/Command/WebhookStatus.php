<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Console\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;

class WebhookStatus extends Command
{
    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        string $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setName('trusteed:webhook:status')
             ->setDescription('Show Trusteed webhook outbox status');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $pending = $this->outboxRepository->getPendingCount();
        $dead = $this->outboxRepository->getDeadCount();
        $oldestAge = $this->outboxRepository->getOldestPendingAgeSeconds();
        $deliveredLast5Min = $this->outboxRepository->getDeliveredLast5Min();

        $output->writeln('Trusteed Webhook Outbox Status');
        $output->writeln(str_repeat('-', 40));
        $output->writeln("Pending:          {$pending}");
        $output->writeln("Dead (terminal):  {$dead}");
        $output->writeln("Oldest pending:   {$oldestAge}s ago");
        $output->writeln("Delivered (5min): {$deliveredLast5Min}");

        if ($oldestAge > 300) {
            $output->writeln('<error>WARNING: Outbox lag exceeds 5 minutes!</error>');
        }

        if ($dead > 0) {
            $output->writeln("<comment>{$dead} dead-letter entries require manual review:</comment>");
            foreach ($this->outboxRepository->listDead(20) as $row) {
                $output->writeln(sprintf(
                    '  - #%s %s [%s] composite=%s retries=%s failed_at=%s',
                    $row['id'] ?? '?',
                    $row['event_type'] ?? '?',
                    $row['event_id'] ?? '?',
                    $row['composite_id'] ?? '?',
                    $row['retry_count'] ?? '?',
                    $row['updated_at'] ?? '?'
                ));
            }
        }

        return Command::SUCCESS;
    }
}
