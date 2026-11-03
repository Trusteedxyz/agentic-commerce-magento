<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Enforcement;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Enforcement\AgentIdentityResolver;

/**
 * C2 (auditoría spec-048 2026-09-27): la identidad del agente llega por
 * cabeceras `X-Trusteed-Agent-*` en la petición REST que coloca el pedido, con
 * la sesión de respaldo. Sin ninguna señal ⇒ humano. Cualquier cabecera
 * `X-Trusteed-Agent-*` con valor —válida o no— ⇒ agente: un cliente que las
 * ponga sólo puede endurecer su propio trato, nunca aligerarlo.
 *
 * Respecto al brief de la Task 6, el resultado lleva una cuarta clave
 * `tokenRejected` (se presentó un token que no tiene forma de JWS): sin ella un
 * token basura se descartaba en silencio y el checkout salía humano.
 */
final class AgentIdentityResolverTest extends TestCase
{
    public function testLumaHumanCheckoutWithoutHeadersIsNotAgentic(): void
    {
        $id = AgentIdentityResolver::resolve([], '', '');
        self::assertSame(['did' => '', 'token' => '', 'agentic' => false, 'tokenRejected' => false], $id);
    }

    public function testOriginHeaderAloneIsAnAnonymousAgent(): void
    {
        $id = AgentIdentityResolver::resolve(['X-Trusteed-Agent-Origin' => 'webmcp'], '', '');
        self::assertTrue($id['agentic']);
        self::assertSame('', $id['did']);
    }

    public function testHeadersAreCaseInsensitiveAndValidated(): void
    {
        $id = AgentIdentityResolver::resolve(
            ['x-trusteed-agent-id' => 'did:web:agent.example.com', 'X-TRUSTEED-AGENT-TOKEN' => 'aaa.bbb.ccc'],
            '',
            ''
        );
        self::assertSame('did:web:agent.example.com', $id['did']);
        self::assertSame('aaa.bbb.ccc', $id['token']);
        self::assertTrue($id['agentic']);
        self::assertFalse($id['tokenRejected']);
    }

    public function testMalformedHeaderValuesFallBackToSession(): void
    {
        $id = AgentIdentityResolver::resolve(
            ['X-Trusteed-Agent-Id' => 'not a did', 'X-Trusteed-Agent-Token' => 'nope'],
            'did:key:z6Mk',
            'x.y.z'
        );
        self::assertSame('did:key:z6Mk', $id['did']);
        self::assertSame('x.y.z', $id['token']);
        self::assertTrue($id['agentic']);
        self::assertTrue($id['tokenRejected'], 'el token de la cabecera no tenía forma de JWS');
    }

    /** Token inválido = agente (D1/Task 8): sin sesión de respaldo, sigue siendo agente. */
    public function testMalformedTokenHeaderWithoutSessionIsStillAnAgent(): void
    {
        $id = AgentIdentityResolver::resolve(['X-Trusteed-Agent-Token' => 'not-a-jws'], '', '');
        self::assertSame(['did' => '', 'token' => '', 'agentic' => true, 'tokenRejected' => true], $id);
    }

    public function testMalformedDidHeaderAloneIsAnAnonymousAgent(): void
    {
        $id = AgentIdentityResolver::resolve(['X-Trusteed-Agent-Id' => '<script>alert(1)</script>'], '', '');
        self::assertSame(['did' => '', 'token' => '', 'agentic' => true, 'tokenRejected' => false], $id);
    }

    public function testOversizedValuesAreRejectedButStillCountAsAgentic(): void
    {
        $longDid   = 'did:web:' . str_repeat('a', AgentIdentityResolver::MAX_DID_LENGTH);
        $longToken = str_repeat('a', AgentIdentityResolver::MAX_TOKEN_LENGTH) . '.b.c';
        $id = AgentIdentityResolver::resolve(
            ['X-Trusteed-Agent-Id' => $longDid, 'X-Trusteed-Agent-Token' => $longToken],
            '',
            ''
        );
        self::assertSame('', $id['did']);
        self::assertSame('', $id['token']);
        self::assertTrue($id['agentic']);
        self::assertTrue($id['tokenRejected']);
    }

    public function testBlankHeadersAreAbsent(): void
    {
        $id = AgentIdentityResolver::resolve(
            ['X-Trusteed-Agent-Id' => '   ', 'X-Trusteed-Agent-Token' => '', 'X-Trusteed-Agent-Origin' => " \t"],
            '',
            ''
        );
        self::assertSame(['did' => '', 'token' => '', 'agentic' => false, 'tokenRejected' => false], $id);
    }

    public function testNonStringHeaderValuesAreIgnored(): void
    {
        $id = AgentIdentityResolver::resolve(['X-Trusteed-Agent-Id' => ['did:web:a.example']], '', '');
        self::assertSame(['did' => '', 'token' => '', 'agentic' => false, 'tokenRejected' => false], $id);
    }

    public function testValidHeaderWinsOverSession(): void
    {
        $id = AgentIdentityResolver::resolve(
            ['X-Trusteed-Agent-Id' => 'did:web:header.example'],
            'did:web:session.example',
            ''
        );
        self::assertSame('did:web:header.example', $id['did']);
    }

    public function testSessionOnlyDidIsAgentic(): void
    {
        $id = AgentIdentityResolver::resolve([], 'did:web:session.example', '');
        self::assertSame(['did' => 'did:web:session.example', 'token' => '', 'agentic' => true, 'tokenRejected' => false], $id);
    }

    public function testUnrelatedHeadersDoNotMakeACheckoutAgentic(): void
    {
        $id = AgentIdentityResolver::resolve(['X-Requested-With' => 'XMLHttpRequest', 'Authorization' => 'Bearer x.y.z'], '', '');
        self::assertFalse($id['agentic']);
    }

    /** Fix ronda 1 (IMPORTANT 2): el token verificado se ata al DID declarado. */
    public function testBindTokenTreatsAValidTokenOfAnotherAgentAsInvalid(): void
    {
        self::assertSame(
            // Task 16: `did` es SÓLO lo que prueba un token VÁLIDO; nunca el declarado sin prueba.
            ['state' => 'invalid', 'did' => '', 'mismatch' => true],
            AgentIdentityResolver::bindToken('did:web:a.example', 'valid', 'did:web:b.example')
        );
    }

    public function testBindTokenKeepsAMatchingValidToken(): void
    {
        self::assertSame(
            ['state' => 'valid', 'did' => 'did:web:a.example', 'mismatch' => false],
            AgentIdentityResolver::bindToken('did:web:a.example', 'valid', 'did:web:a.example')
        );
    }

    public function testBindTokenAdoptsTheVerifiedDidWhenNoneWasDeclared(): void
    {
        self::assertSame(
            ['state' => 'valid', 'did' => 'did:web:b.example', 'mismatch' => false],
            AgentIdentityResolver::bindToken('', 'valid', 'did:web:b.example')
        );
    }

    public function testBindTokenTreatsAValidTokenWithoutADidAsInvalid(): void
    {
        self::assertSame(
            ['state' => 'invalid', 'did' => '', 'mismatch' => false],
            AgentIdentityResolver::bindToken('', 'valid', '')
        );
    }

    public function testBindTokenNeverAdoptsTheDidOfANonValidToken(): void
    {
        foreach (['invalid', 'indeterminate'] as $state) {
            self::assertSame(
                ['state' => $state, 'did' => '', 'mismatch' => false],
                AgentIdentityResolver::bindToken('did:web:a.example', $state, 'did:web:a.example'),
                $state . ' con DID declarado'
            );
            self::assertSame(
                ['state' => $state, 'did' => '', 'mismatch' => false],
                AgentIdentityResolver::bindToken('', $state, 'did:web:b.example'),
                $state
            );
        }
    }
}
