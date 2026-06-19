<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Webhook;

use Magento\Framework\App\ResourceConnection;
use Psr\Log\LoggerInterface;

class OutboxRepository
{
    private const TABLE = 'trusteed_webhook_outbox';
    private const LOCK_DURATION_SECONDS = 60;

    /**
     * Maximum delivery attempts before an entry is marked dead-letter.
     * With exponential backoff (base 2s, cap 1h) this spans hours of retries
     * rather than the previous ~minute window of 3 attempts.
     */
    public const MAX_RETRIES = 8;

    public function __construct(
        private readonly ResourceConnection $resource,
        private readonly LoggerInterface $logger,
    ) {}

    private function getConnection(): \Magento\Framework\DB\Adapter\AdapterInterface
    {
        return $this->resource->getConnection();
    }

    /**
     * Insert a new outbox entry.
     */
    public function insert(array $data): int
    {
        $conn = $this->getConnection();
        $conn->insert(self::TABLE, array_merge($data, [
            'status' => 'pending',
            'retry_count' => 0,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]));
        return (int)$conn->lastInsertId();
    }

    /**
     * Claim up to $limit pending entries with a lease lock.
     * Returns only entries this caller locked.
     */
    public function claimPending(string $lockOwner, int $limit = 50): array
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        $now = date('Y-m-d H:i:s');
        $lockExpiry = date('Y-m-d H:i:s', time() + self::LOCK_DURATION_SECONDS);

        // Atomic claim: lock the oldest eligible pending rows.
        // Eligibility = pending, not exhausted, lease free, and backoff window
        // elapsed (next_attempt_at NULL = never scheduled / immediately eligible).
        // ORDER BY created_at ASC guarantees FIFO / oldest-first fairness so a
        // burst of fresh events cannot starve older ones.
        $conn->query(
            "UPDATE {$table} SET locked_until = ?, locked_by = ?, updated_at = ?
             WHERE status = 'pending'
               AND retry_count < ?
               AND (locked_until IS NULL OR locked_until < ?)
               AND (next_attempt_at IS NULL OR next_attempt_at <= ?)
             ORDER BY created_at ASC
             LIMIT ?",
            [$lockExpiry, $lockOwner, $now, self::MAX_RETRIES, $now, $now, $limit]
        );

        return $conn->fetchAll(
            "SELECT * FROM {$table}
             WHERE locked_by = ? AND locked_until >= ? AND status = 'pending'
             ORDER BY created_at ASC",
            [$lockOwner, $now]
        );
    }

    /**
     * Mark entry as delivered.
     */
    public function markDelivered(int $id): void
    {
        $conn = $this->getConnection();
        $conn->update(
            $conn->getTableName(self::TABLE),
            ['status' => 'delivered', 'locked_until' => null, 'locked_by' => null, 'updated_at' => date('Y-m-d H:i:s')],
            ['id = ?' => $id]
        );
    }

    /**
     * Release lock without changing status (will be re-claimed next cycle).
     */
    public function releaseLock(int $id): void
    {
        $conn = $this->getConnection();
        $conn->update(
            $conn->getTableName(self::TABLE),
            ['locked_until' => null, 'locked_by' => null, 'updated_at' => date('Y-m-d H:i:s')],
            ['id = ?' => $id]
        );
    }

    /**
     * Increment retry count and schedule the next attempt via backoff.
     *
     * The lease is released immediately (no in-cron sleep). The row becomes
     * eligible again only once $delaySeconds has elapsed, recorded in
     * next_attempt_at. When MAX_RETRIES is reached the row is marked 'dead'
     * (dead-letter) and next_attempt_at is cleared so it is never re-claimed.
     *
     * @param int $delaySeconds Backoff delay (with jitter) computed by the caller.
     */
    public function incrementRetry(int $id, int $delaySeconds = 0): void
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        $now = date('Y-m-d H:i:s');
        $nextAttempt = date('Y-m-d H:i:s', time() + max(0, $delaySeconds));
        $conn->query(
            "UPDATE {$table}
             SET retry_count = retry_count + 1,
                 status = CASE WHEN retry_count + 1 >= ? THEN 'dead' ELSE 'pending' END,
                 next_attempt_at = CASE WHEN retry_count + 1 >= ? THEN NULL ELSE ? END,
                 locked_until = NULL,
                 locked_by = NULL,
                 updated_at = ?
             WHERE id = ?",
            [self::MAX_RETRIES, self::MAX_RETRIES, $nextAttempt, $now, $id]
        );
    }

    /**
     * List dead-letter entries (exhausted retries) for operator visibility.
     *
     * @return array<int, array<string, mixed>>
     */
    public function listDead(int $limit = 100): array
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        return $conn->fetchAll(
            "SELECT id, event_id, event_type, composite_id, retry_count, updated_at
             FROM {$table}
             WHERE status = 'dead'
             ORDER BY updated_at DESC
             LIMIT ?",
            [$limit]
        );
    }

    /**
     * Get oldest pending age in seconds (for lag heartbeat).
     */
    public function getOldestPendingAgeSeconds(): int
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        $result = $conn->fetchOne(
            "SELECT TIMESTAMPDIFF(SECOND, MIN(created_at), NOW()) FROM {$table} WHERE status = 'pending'"
        );
        return $result !== null ? (int)$result : 0;
    }

    public function getPendingCount(): int
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        return (int)$conn->fetchOne("SELECT COUNT(*) FROM {$table} WHERE status = 'pending'");
    }

    public function getDeadCount(): int
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        return (int)$conn->fetchOne("SELECT COUNT(*) FROM {$table} WHERE status = 'dead'");
    }

    public function getDeliveredLast5Min(): int
    {
        $conn = $this->getConnection();
        $table = $conn->getTableName(self::TABLE);
        return (int)$conn->fetchOne(
            "SELECT COUNT(*) FROM {$table} WHERE status = 'delivered' AND updated_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)"
        );
    }
}
