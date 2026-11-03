<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Test\Unit\Controller\Adminhtml\Setup;

require_once __DIR__ . '/../../../../../Model/Security/ApiBaseUrlValidator.php';

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Unit tests for IntrospectToken SSRF hardening (Spec 050).
 *
 * The SSRF-critical surface is concentrated in {@see ApiBaseUrlValidator}
 * (host allowlist + sealed sha256(host) + DNS-aware private-IP guard + TLS
 * probe). These tests exercise that surface end-to-end via the validator
 * (the controller delegates to it 1:1).
 *
 * Adversarial vectors covered:
 *   - IT-01 ALLOW exact-match allowlist host (api.trusteed.xyz).
 *   - IT-02 ALLOW configured host with sealed sha256(host) match.
 *   - IT-03 REJECT wildcard suffix bypass (evil.trusteed.xyz).
 *   - IT-04 REJECT sealed-hash mismatch (admin tampered config post-save).
 *   - IT-05 REJECT host that resolves to RFC1918 private IP (10.x).
 *   - IT-06 REJECT http:// downgrade.
 *   - IT-07 REJECT save-time probe surfacing redirect.
 *   - IT-08 REJECT loopback 127.0.0.1.
 *   - IT-09 REJECT IPv6 loopback ::1.
 *   - IT-10 REJECT CGNAT 100.64.0.0/10.
 *   - IT-11 REJECT link-local 169.254.x.
 *   - IT-12 REJECT malformed URL ("https://").
 *   - IT-13 REJECT case-bypass / IDN normalization (mixed case host).
 *   - IT-14 REJECT empty configured base (no custom host registered).
 *   - IT-15 REJECT TLS validation failure at save.
 */
class IntrospectTokenTest extends TestCase
{
    /** @var ScopeConfigInterface&MockObject */
    private ScopeConfigInterface $scopeConfig;

    private ApiBaseUrlValidator $validator;

    protected function setUp(): void
    {
        $this->scopeConfig = $this->createMock(ScopeConfigInterface::class);
        $this->validator = new ApiBaseUrlValidator($this->scopeConfig);
    }

    // ── Allowlist (exact-match, no wildcard) ─────────────────────────────────

    public function testAllowsExactMatchAllowlistHost(): void
    {
        $result = $this->validator->isAuthorized('https://api.trusteed.xyz');
        self::assertTrue($result['authorized']);
        self::assertSame('api.trusteed.xyz', $result['host']);
        self::assertSame(ApiBaseUrlValidator::OK_ALLOWLIST, $result['outcome']);
    }

    public function testAllowsStagingExactMatch(): void
    {
        $result = $this->validator->isAuthorized('https://staging.trusteed.xyz/api');
        self::assertTrue($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::OK_ALLOWLIST, $result['outcome']);
    }

    public function testRejectsWildcardSuffixBypass(): void
    {
        // Critical: pre-hardening this was accepted via `str_ends_with('.trusteed.xyz')`.
        // Attacker registers `evil.trusteed.xyz` (DNS poison / dangling CNAME /
        // subdomain takeover) and exfiltrates the integration token.
        $result = $this->validator->isAuthorized('https://evil.trusteed.xyz/api/v1/auth/introspect');
        self::assertFalse($result['authorized']);
        self::assertSame('evil.trusteed.xyz', $result['host']);
        self::assertSame(ApiBaseUrlValidator::REJECT_HOST_NOT_ALLOWED, $result['outcome']);
    }

    public function testRejectsLookalikeHost(): void
    {
        $result = $this->validator->isAuthorized('https://api.trusteed.xyz.evil.com');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_HOST_NOT_ALLOWED, $result['outcome']);
    }

    public function testHostMatchingIsCaseInsensitive(): void
    {
        $result = $this->validator->isAuthorized('https://API.Trusteed.XYZ');
        self::assertTrue($result['authorized']);
        self::assertSame('api.trusteed.xyz', $result['host']);
    }

    // ── Configured host with sealed sha256 hash ──────────────────────────────

    public function testAllowsConfiguredHostWithMatchingSealedHash(): void
    {
        $customHost = 'agentic.example.com';
        $customBase = 'https://' . $customHost;
        $sealedHash = hash('sha256', $customHost);

        $this->scopeConfig
            ->method('getValue')
            ->willReturnCallback(function (string $path) use ($customBase, $sealedHash) {
                return match ($path) {
                    ApiBaseUrlValidator::CONFIG_API_BASE => $customBase,
                    ApiBaseUrlValidator::CONFIG_API_HOST_HASH => $sealedHash,
                    default => null,
                };
            });

        $result = $this->validator->isAuthorized($customBase . '/api/v1/auth/introspect');
        self::assertTrue($result['authorized']);
        self::assertSame($customHost, $result['host']);
        self::assertSame(ApiBaseUrlValidator::OK_CONFIGURED_HASH_MATCH, $result['outcome']);
    }

    public function testRejectsConfiguredHostWithMismatchedSealedHash(): void
    {
        // Threat: attacker compromises admin panel (CSRF / stored XSS /
        // supply-chain) and rewrites `api_base_url` to their server WITHOUT
        // updating the sealed hash. Runtime must reject.
        $tamperedHost = 'attacker.example.com';
        $tamperedBase = 'https://' . $tamperedHost;
        $oldHash = hash('sha256', 'legitimate.example.com'); // sealed at save time

        $this->scopeConfig
            ->method('getValue')
            ->willReturnCallback(function (string $path) use ($tamperedBase, $oldHash) {
                return match ($path) {
                    ApiBaseUrlValidator::CONFIG_API_BASE => $tamperedBase,
                    ApiBaseUrlValidator::CONFIG_API_HOST_HASH => $oldHash,
                    default => null,
                };
            });

        $result = $this->validator->isAuthorized($tamperedBase);
        self::assertFalse($result['authorized']);
        // Configured base host matches request host but hash disagrees ⇒ HASH_MISMATCH.
        self::assertSame(ApiBaseUrlValidator::REJECT_HASH_MISMATCH, $result['outcome']);
    }

    public function testRejectsConfiguredHostNotMatchingRequestHost(): void
    {
        // Attacker passes a different URL than what's configured.
        $this->scopeConfig
            ->method('getValue')
            ->willReturnCallback(function (string $path) {
                return match ($path) {
                    ApiBaseUrlValidator::CONFIG_API_BASE => 'https://configured.example.com',
                    ApiBaseUrlValidator::CONFIG_API_HOST_HASH => hash('sha256', 'configured.example.com'),
                    default => null,
                };
            });

        $result = $this->validator->isAuthorized('https://attacker.example.com');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_HOST_NOT_ALLOWED, $result['outcome']);
    }

    public function testRejectsWhenNoCustomHostRegistered(): void
    {
        $this->scopeConfig->method('getValue')->willReturn('');

        $result = $this->validator->isAuthorized('https://custom.example.com');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_HOST_NOT_ALLOWED, $result['outcome']);
    }

    // ── Scheme / URL parsing ─────────────────────────────────────────────────

    public function testRejectsHttpDowngrade(): void
    {
        $result = $this->validator->isAuthorized('http://api.trusteed.xyz');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_SCHEME, $result['outcome']);
    }

    public function testRejectsFileScheme(): void
    {
        $result = $this->validator->isAuthorized('file:///etc/passwd');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_SCHEME, $result['outcome']);
    }

    public function testRejectsGopherScheme(): void
    {
        $result = $this->validator->isAuthorized('gopher://api.trusteed.xyz');
        self::assertFalse($result['authorized']);
        self::assertSame(ApiBaseUrlValidator::REJECT_SCHEME, $result['outcome']);
    }

    public function testRejectsMalformedHttpsUrl(): void
    {
        $result = $this->validator->isAuthorized('https://');
        self::assertFalse($result['authorized']);
        // No host parsed → BAD_URL.
        self::assertContains($result['outcome'], [
            ApiBaseUrlValidator::REJECT_BAD_URL,
            ApiBaseUrlValidator::REJECT_HOST_NOT_ALLOWED,
        ]);
    }

    // ── Private/loopback IP guard (save-time) ────────────────────────────────

    public function testSaveRejectsRfc1918PrivateIp(): void
    {
        $result = $this->validator->validateForSave('https://10.0.0.1');
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_PRIVATE_IP, $result['outcome']);
    }

    public function testSaveRejectsLoopbackIPv4(): void
    {
        $result = $this->validator->validateForSave('https://127.0.0.1');
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_PRIVATE_IP, $result['outcome']);
    }

    public function testSaveRejectsLoopbackIPv6(): void
    {
        $result = $this->validator->validateForSave('https://[::1]');
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_PRIVATE_IP, $result['outcome']);
    }

    public function testSaveRejectsLinkLocal(): void
    {
        $result = $this->validator->validateForSave('https://169.254.169.254'); // AWS metadata
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_PRIVATE_IP, $result['outcome']);
    }

    public function testIsPublicIpRejectsCgnat(): void
    {
        self::assertFalse($this->validator->isPublicIp('100.64.0.1'));
        self::assertFalse($this->validator->isPublicIp('100.127.255.254'));
    }

    public function testIsPublicIpRejectsPrivateRanges(): void
    {
        self::assertFalse($this->validator->isPublicIp('10.0.0.1'));
        self::assertFalse($this->validator->isPublicIp('172.16.0.1'));
        self::assertFalse($this->validator->isPublicIp('192.168.1.1'));
        self::assertFalse($this->validator->isPublicIp('127.0.0.1'));
        self::assertFalse($this->validator->isPublicIp('169.254.1.1'));
        self::assertFalse($this->validator->isPublicIp('::1'));
    }

    public function testIsPublicIpAcceptsPublicAddress(): void
    {
        self::assertTrue($this->validator->isPublicIp('8.8.8.8'));
        self::assertTrue($this->validator->isPublicIp('1.1.1.1'));
    }

    // ── Save-time HTTP probe ─────────────────────────────────────────────────

    public function testSaveAllowsAllowlistHostsWithoutProbe(): void
    {
        // Operator-owned allowlist hosts skip DNS/TLS validation deliberately.
        $result = $this->validator->validateForSave('https://api.trusteed.xyz');
        self::assertTrue($result['ok']);
        self::assertSame('api.trusteed.xyz', $result['host']);
        self::assertSame(hash('sha256', 'api.trusteed.xyz'), $result['hash']);
        self::assertSame(ApiBaseUrlValidator::OK_ALLOWLIST, $result['outcome']);
    }

    public function testSaveRejectsOnRedirectFromProbe(): void
    {
        $probe = fn(string $url): array => [
            'ok' => false,
            'outcome' => ApiBaseUrlValidator::REJECT_REDIRECT,
        ];

        $result = $this->validator->validateForSave('https://8.8.8.8', $probe);
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_REDIRECT, $result['outcome']);
    }

    public function testSaveRejectsOnTlsFailure(): void
    {
        $probe = fn(string $url): array => [
            'ok' => false,
            'outcome' => ApiBaseUrlValidator::REJECT_TLS,
        ];

        $result = $this->validator->validateForSave('https://8.8.8.8', $probe);
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_TLS, $result['outcome']);
    }

    public function testSaveSucceedsForCustomHostWithPublicIpAndOkProbe(): void
    {
        $okProbe = fn(string $url): array => [
            'ok' => true,
            'outcome' => ApiBaseUrlValidator::OK_CONFIGURED_HASH_MATCH,
        ];

        // 1.1.1.1 is a public IP literal (skips DNS).
        $result = $this->validator->validateForSave('https://1.1.1.1', $okProbe);
        self::assertTrue($result['ok']);
        self::assertSame('1.1.1.1', $result['host']);
        self::assertSame(hash('sha256', '1.1.1.1'), $result['hash']);
    }

    public function testSaveRejectsHttpDowngrade(): void
    {
        $result = $this->validator->validateForSave('http://api.trusteed.xyz');
        self::assertFalse($result['ok']);
        self::assertSame(ApiBaseUrlValidator::REJECT_SCHEME, $result['outcome']);
        self::assertNull($result['host']);
        self::assertNull($result['hash']);
    }
}
