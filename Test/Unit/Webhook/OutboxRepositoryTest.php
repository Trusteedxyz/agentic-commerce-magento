<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Webhook;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\DB\Adapter\AdapterInterface;
use Psr\Log\LoggerInterface;

class OutboxRepositoryTest extends TestCase
{
    private MockObject $connectionMock;
    private MockObject $resourceMock;
    private OutboxRepository $repository;

    protected function setUp(): void
    {
        $this->connectionMock = $this->createMock(AdapterInterface::class);
        $this->resourceMock = $this->createMock(ResourceConnection::class);
        $this->resourceMock->method('getConnection')->willReturn($this->connectionMock);
        $this->connectionMock->method('getTableName')->willReturnArgument(0);

        $this->repository = new OutboxRepository(
            $this->resourceMock,
            $this->createMock(LoggerInterface::class)
        );
    }

    public function testInsertCallsDbInsert(): void
    {
        $this->connectionMock->expects($this->once())->method('insert');
        $this->connectionMock->method('lastInsertId')->willReturn('1');
        $result = $this->repository->insert([
            'event_id' => 'uuid-1',
            'event_type' => 'order_created',
            'entity_id' => 1,
            'increment_id' => '1',
            'composite_id' => 'MAG:1',
            'payload' => '{}',
            'secret_version' => 1,
        ]);
        $this->assertSame(1, $result);
    }

    public function testMarkDeliveredUpdatesStatus(): void
    {
        $this->connectionMock->expects($this->once())->method('update')
            ->with($this->anything(), $this->arrayHasKey('status'));
        $this->repository->markDelivered(1);
    }

    public function testGetOldestPendingAgeReturnsInt(): void
    {
        $this->connectionMock->method('fetchOne')->willReturn('120');
        $this->assertSame(120, $this->repository->getOldestPendingAgeSeconds());
    }

    public function testGetOldestPendingAgeReturnsZeroWhenNull(): void
    {
        $this->connectionMock->method('fetchOne')->willReturn(null);
        $this->assertSame(0, $this->repository->getOldestPendingAgeSeconds());
    }

    public function testReleaseLockClearsLockFields(): void
    {
        $this->connectionMock->expects($this->once())->method('update')
            ->with(
                $this->anything(),
                $this->callback(function (array $data): bool {
                    return $data['locked_until'] === null && $data['locked_by'] === null;
                })
            );
        $this->repository->releaseLock(42);
    }

    public function testGetPendingCountReturnsInt(): void
    {
        $this->connectionMock->method('fetchOne')->willReturn('7');
        $this->assertSame(7, $this->repository->getPendingCount());
    }

    public function testGetDeadCountReturnsInt(): void
    {
        $this->connectionMock->method('fetchOne')->willReturn('3');
        $this->assertSame(3, $this->repository->getDeadCount());
    }

    public function testGetDeliveredLast5MinReturnsInt(): void
    {
        $this->connectionMock->method('fetchOne')->willReturn('15');
        $this->assertSame(15, $this->repository->getDeliveredLast5Min());
    }

    public function testClaimPendingOrdersByAgeAndFiltersNextAttempt(): void
    {
        $capturedSql = [];
        $this->connectionMock->method('query')
            ->willReturnCallback(function (string $sql) use (&$capturedSql) {
                $capturedSql[] = $sql;
                return $this->createMock(\Magento\Framework\DB\Statement\Pdo\Mysql::class);
            });
        $this->connectionMock->method('fetchAll')
            ->willReturnCallback(function (string $sql) use (&$capturedSql) {
                $capturedSql[] = $sql;
                return [];
            });

        $this->repository->claimPending('host:123', 10);

        // The atomic claim UPDATE must order oldest-first and honor the
        // next_attempt_at backoff window.
        $updateSql = $capturedSql[0];
        $this->assertStringContainsString('ORDER BY created_at ASC', $updateSql);
        $this->assertStringContainsString('next_attempt_at IS NULL OR next_attempt_at <=', $updateSql);
    }

    public function testIncrementRetrySchedulesNextAttempt(): void
    {
        $capturedBind = null;
        $this->connectionMock->method('query')
            ->willReturnCallback(function (string $sql, array $bind) use (&$capturedBind) {
                $capturedBind = $bind;
                return $this->createMock(\Magento\Framework\DB\Statement\Pdo\Mysql::class);
            });

        $this->repository->incrementRetry(7, 120);

        // Bind order: [MAX_RETRIES, MAX_RETRIES, nextAttempt, now, id]
        $this->assertNotNull($capturedBind);
        $this->assertSame(7, $capturedBind[4]);
        // next_attempt timestamp (index 2) must be in the future relative to now (index 3).
        $this->assertGreaterThan(
            strtotime($capturedBind[3]),
            strtotime($capturedBind[2])
        );
    }

    public function testListDeadReturnsRows(): void
    {
        $rows = [['id' => 1, 'event_id' => 'uuid-9', 'status' => 'dead']];
        $this->connectionMock->method('fetchAll')->willReturn($rows);
        $this->assertSame($rows, $this->repository->listDead(50));
    }
}
