<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Cron;

use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Trusteed\AgenticCommerce\Model\Webhook\SignaturePublisher;
use Psr\Log\LoggerInterface;

class DrainOutbox
{
    private const BATCH_SIZE = 50;
    private const MAX_RUNTIME_SECONDS = 55;

    // Exponential backoff schedule (no in-cron sleep): delay = BASE * 2^retry_count,
    // capped at MAX, plus +/- jitter to avoid thundering-herd retries across pods.
    private const BACKOFF_BASE_SECONDS = 2;
    private const BACKOFF_MAX_SECONDS = 3600; // 1 hour cap
    private const BACKOFF_JITTER_RATIO = 0.20; // +/- 20%

    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        private readonly SignaturePublisher $publisher,
        private readonly LoggerInterface $logger,
    ) {}

    public function execute(): void
    {
        $startTime = microtime(true);
        $lockOwner = gethostname() . ':' . getmypid();

        $entries = $this->outboxRepository->claimPending($lockOwner, self::BATCH_SIZE);

        foreach ($entries as $entry) {
            if ((microtime(true) - $startTime) > self::MAX_RUNTIME_SECONDS) {
                $this->logger->info('Trusteed DrainOutbox: approaching max runtime, stopping batch');
                $this->outboxRepository->releaseLock((int)$entry['id']);
                continue;
            }

            try {
                $success = $this->publisher->publish($entry);

                if ($success) {
                    $this->outboxRepository->markDelivered((int)$entry['id']);
                } else {
                    // Schedule the next attempt via backoff instead of sleeping
                    // inside the cron (which blocked the whole batch).
                    $this->outboxRepository->incrementRetry(
                        (int)$entry['id'],
                        $this->backoffDelaySeconds((int)$entry['retry_count'])
                    );
                }
            } catch (\Throwable $e) {
                $this->logger->error('Trusteed DrainOutbox: delivery exception', [
                    'entry_id' => $entry['id'],
                    'error' => $e->getMessage(),
                ]);
                $this->outboxRepository->incrementRetry(
                    (int)$entry['id'],
                    $this->backoffDelaySeconds((int)$entry['retry_count'])
                );
            }
        }
    }

    /**
     * Compute the next-attempt delay using exponential backoff with jitter.
     *
     * @param int $retryCount Current retry count (before this failure).
     */
    private function backoffDelaySeconds(int $retryCount): int
    {
        $retryCount = max(0, $retryCount);

        // Guard the exponent so 2^n cannot overflow before the cap is applied.
        $exponent = min($retryCount, 30);
        $base = self::BACKOFF_BASE_SECONDS * (2 ** $exponent);
        $base = (int)min($base, self::BACKOFF_MAX_SECONDS);

        // Apply symmetric +/- jitter (deterministic range, random offset).
        $jitterSpan = (int)round($base * self::BACKOFF_JITTER_RATIO);
        $jitter = $jitterSpan > 0 ? random_int(-$jitterSpan, $jitterSpan) : 0;

        return max(self::BACKOFF_BASE_SECONDS, $base + $jitter);
    }
}
