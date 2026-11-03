<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\FailurePolicy;

/**
 * Task 38b (2) — «historial no disponible» de un agente verificado: lo decide el
 * modo del comerciante, igual que «el evaluador no contestó». enforce (y cualquier
 * valor no resuelto) cierra; observe abre y sigue sin la señal.
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
        // Lo que configura el comerciante, normalizado como en producción.
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode(null)), 'ausente = enforce');
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode('')));
        self::assertSame('BLOCK', FailurePolicy::decideOnHistoryUnavailable(FailurePolicy::normalizeFailureMode('permissive')), 'un modo de otra plataforma no abre aquí');
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
