<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Security;

use PHPUnit\Framework\TestCase;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;

require_once __DIR__ . '/../../../Model/Security/InternalHmacSigner.php';

/**
 * M4 (audit 2026-06-01): proves the PHP module signs EVERY internal endpoint —
 * /internal/magento/event AND /internal/magento/lag-heartbeat — with the SAME
 * canonical HMAC scheme the unified backend verifier now enforces
 * ({@see apps/api/src/routes/internal-magento-event.routes.ts}
 *  `computeCanonicalSignature` / `requireMagentoInternalHmac`).
 *
 * The reference signature below is computed the SAME way the backend does, as a
 * pure cross-check that the PHP signer is byte-for-byte compatible.
 */
final class InternalHmacSignerTest extends TestCase
{
    private const SECRET = 'internal-hmac-secret-fixture-32bytes!!';
    private const EVENT_PATH = '/api/v1/internal/magento/event';
    private const HEARTBEAT_PATH = '/api/v1/internal/magento/lag-heartbeat';

    private InternalHmacSigner $signer;

    protected function setUp(): void
    {
        $this->signer = new InternalHmacSigner();
    }

    /**
     * Independent reference implementation mirroring the backend verifier:
     *   signing_string = method\npath\nsortedQuery\ntimestamp\nsha256hex(rawBody)
     *   signature      = HMAC-SHA256(secret, signing_string)
     */
    private function referenceSignature(
        string $secret,
        string $method,
        string $path,
        string $sortedQuery,
        string $timestamp,
        string $rawBody
    ): string {
        $bodySha = hash('sha256', $rawBody);
        $signingString = "{$method}\n{$path}\n{$sortedQuery}\n{$timestamp}\n{$bodySha}";
        return hash_hmac('sha256', $signingString, $secret);
    }

    public function test_signature_matches_backend_canonical_reference(): void
    {
        $timestamp = '1717200000';
        $body = '{"merchant_id":"merch-1","pending_count":3}';

        $actual = $this->signer->sign(
            self::SECRET,
            'POST',
            self::HEARTBEAT_PATH,
            $body,
            $timestamp
        );

        $expected = $this->referenceSignature(
            self::SECRET,
            'POST',
            self::HEARTBEAT_PATH,
            '',
            $timestamp,
            $body
        );

        $this->assertSame($expected, $actual);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{64}$/', $actual);
    }

    /**
     * Core M4 invariant: lag-heartbeat and event use the IDENTICAL scheme — only
     * the path + body differ. Same secret, same algorithm, same canonical layout.
     */
    public function test_lag_heartbeat_and_event_use_identical_scheme(): void
    {
        $timestamp = '1717200000';
        $eventBody = '{"event":"magento.module.installed","merchant_id":"merch-1"}';
        $heartbeatBody = '{"merchant_id":"merch-1","pending_count":0,"dead_count":0}';

        $eventSig = $this->signer->sign(self::SECRET, 'POST', self::EVENT_PATH, $eventBody, $timestamp);
        $heartbeatSig = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $heartbeatBody, $timestamp);

        // Both must equal their backend-equivalent reference computations.
        $this->assertSame(
            $this->referenceSignature(self::SECRET, 'POST', self::EVENT_PATH, '', $timestamp, $eventBody),
            $eventSig
        );
        $this->assertSame(
            $this->referenceSignature(self::SECRET, 'POST', self::HEARTBEAT_PATH, '', $timestamp, $heartbeatBody),
            $heartbeatSig
        );
    }

    /**
     * Same path + same body + same timestamp ⇒ same signature, regardless of
     * which caller (event vs heartbeat) produced it. Proves there is ONE signer.
     */
    public function test_same_inputs_produce_same_signature(): void
    {
        $timestamp = '1717200000';
        $body = '{"x":1}';

        $a = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $timestamp);
        $b = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $timestamp);

        $this->assertSame($a, $b);
    }

    public function test_signature_is_sensitive_to_path_body_timestamp_and_secret(): void
    {
        $ts = '1717200000';
        $body = '{"merchant_id":"merch-1"}';
        $base = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $ts);

        $this->assertNotSame(
            $base,
            $this->signer->sign(self::SECRET, 'POST', self::EVENT_PATH, $body, $ts),
            'path change must alter signature'
        );
        $this->assertNotSame(
            $base,
            $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body . ' ', $ts),
            'body change must alter signature'
        );
        $this->assertNotSame(
            $base,
            $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, '1717200001'),
            'timestamp change must alter signature'
        );
        $this->assertNotSame(
            $base,
            $this->signer->sign('other-secret', 'POST', self::HEARTBEAT_PATH, $body, $ts),
            'secret change must alter signature'
        );
    }

    public function test_sorted_query_is_part_of_the_signed_string(): void
    {
        $ts = '1717200000';
        $body = '{}';

        $noQuery = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $ts, '');
        $withQuery = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $ts, 'a=1&b=2');

        $this->assertNotSame($noQuery, $withQuery);
        $this->assertSame(
            $this->referenceSignature(self::SECRET, 'POST', self::HEARTBEAT_PATH, 'a=1&b=2', $ts, $body),
            $withQuery
        );
    }

    public function test_build_headers_emit_canonical_header_set(): void
    {
        $ts = '1717200000';
        $body = '{"merchant_id":"merch-1"}';
        $connectionId = 'conn-abc-123';

        $headers = $this->signer->buildHeaders(
            self::SECRET,
            $connectionId,
            'POST',
            self::HEARTBEAT_PATH,
            $body,
            $ts
        );

        $this->assertSame($connectionId, $headers[InternalHmacSigner::HEADER_CONNECTION_ID]);
        $this->assertSame($ts, $headers[InternalHmacSigner::HEADER_TIMESTAMP]);

        $expectedSig = $this->signer->sign(self::SECRET, 'POST', self::HEARTBEAT_PATH, $body, $ts);
        $this->assertSame(
            'hmac-sha256=' . $expectedSig,
            $headers[InternalHmacSigner::HEADER_SIGNATURE]
        );

        // The canonical header names the unified backend verifier reads.
        $this->assertSame('X-Trusteed-Connection-Id', InternalHmacSigner::HEADER_CONNECTION_ID);
        $this->assertSame('X-Trusteed-Timestamp', InternalHmacSigner::HEADER_TIMESTAMP);
        $this->assertSame('X-Trusteed-Signature', InternalHmacSigner::HEADER_SIGNATURE);
    }

    /**
     * The header bundle a lag-heartbeat request would emit is identical in SHAPE
     * to what an event request emits — same three canonical X-Trusteed-* headers,
     * same `hmac-sha256=<hex>` signature format — differing only by path/body.
     */
    public function test_heartbeat_and_event_header_shape_match(): void
    {
        $ts = '1717200000';
        $conn = 'conn-1';

        $eventHeaders = $this->signer->buildHeaders(
            self::SECRET, $conn, 'POST', self::EVENT_PATH, '{"event":"x"}', $ts
        );
        $heartbeatHeaders = $this->signer->buildHeaders(
            self::SECRET, $conn, 'POST', self::HEARTBEAT_PATH, '{"pending_count":0}', $ts
        );

        $this->assertSame(array_keys($eventHeaders), array_keys($heartbeatHeaders));
        foreach ([$eventHeaders, $heartbeatHeaders] as $h) {
            $this->assertMatchesRegularExpression(
                '/^hmac-sha256=[0-9a-f]{64}$/',
                $h[InternalHmacSigner::HEADER_SIGNATURE]
            );
        }
    }
}
