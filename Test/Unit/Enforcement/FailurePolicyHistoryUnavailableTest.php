<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * "History unavailable" for a verified agent is decided by the merchant's
 * mode, the same as "the evaluator did not answer". enforce (and any
 * unresolved value) fails closed; observe lets it through and continues
 * without the signal.
 */
final class FailurePolicyHistoryUnavailableTest extends TestCase
{
    public function testEnforceAndUnresolvedModesCloseAndObserveOpens(): void
    {
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable('enforce'));
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(null), 'modo no resuelto');
        self::assertSame('ALLOW', FailurePolicy::decideOnHistoryUnavailable('observe'));
    }

    public function testItAgreesWithTheModuleVocabularyEndToEnd(): void
    {
        // What the merchant configures, normalized as in production.
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode(null)), 'ausente = enforce');
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode('')));
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode('permissive')), 'a mode from another platform does not open here');
        self::assertSame('ALLOW', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode(' Observe ')));
    }

    public function testItIsTheSameDecisionAsAnUnavailableEvaluatorForAnAgent(): void
    {
        foreach ([null, 'enforce', 'observe', 'balanced', 'permissive', 'nonsense'] as $mode) {
            self::assertSame(
                FailurePolicy::decideUnavailable(true, $mode, false),
                FailurePolicy::decideOnHistoryUnavailable($mode),
                (string) $mode
            );
        }
    }
}
