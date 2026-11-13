<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Model\Webhook;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Webhook\SignaturePublisher;

/** La API exige updated_at en ISO 8601 con Z; con el formato de MySQL rechaza todo el sobre (400). */
final class SignaturePublisherDateTest extends TestCase
{
    public function testMysqlDatetimeBecomesIsoUtcWithZ(): void
    {
        self::assertSame('2026-11-13T17:40:03Z', SignaturePublisher::toIsoUtc('2026-11-13 17:40:03'));
    }

    public function testAlreadyIsoIsNormalisedToUtc(): void
    {
        self::assertSame('2026-11-13T17:40:03Z', SignaturePublisher::toIsoUtc('2026-11-13T18:40:03+01:00'));
    }

    public function testMissingOrGarbageFallsBackToANowTimestampInTheRightShape(): void
    {
        foreach ([null, '', 'no es una fecha'] as $v) {
            self::assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', SignaturePublisher::toIsoUtc($v));
        }
    }
}
