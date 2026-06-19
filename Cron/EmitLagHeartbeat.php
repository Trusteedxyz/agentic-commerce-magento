<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Cron;

use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;
use Trusteed\AgenticCommerce\Model\Security\InternalHmacSigner;
use Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository;
use Psr\Log\LoggerInterface;

class EmitLagHeartbeat
{
    /**
     * URL path of the backend lag-heartbeat sink. MUST match the path the
     * backend verifier signs over ({@see requireMagentoInternalHmac}).
     */
    private const HEARTBEAT_PATH = '/api/v1/internal/magento/lag-heartbeat';

    public function __construct(
        private readonly OutboxRepository $outboxRepository,
        private readonly Curl $curlClient,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly LoggerInterface $logger,
        private readonly SecretReader $secretReader,
        private readonly InternalHmacSigner $internalHmacSigner,
        // Nullable for legacy positional unit-test construction; production is
        // guaranteed a non-null guard via etc/di.xml. When null the callout
        // fails closed.
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    public function execute(): void
    {
        $apiBase = rtrim((string)$this->scopeConfig->getValue('trusteed_general/general/api_base_url'), '/');
        $merchantId = (string)$this->scopeConfig->getValue('trusteed_general/general/merchant_id');
        $connectionId = (string)$this->scopeConfig->getValue('trusteed_general/general/connection_id');
        $token = $this->secretReader->read('trusteed_general/general/integration_token');
        $internalSecret = $this->secretReader->read('trusteed_general/general/internal_hmac_secret');

        if (empty($apiBase) || empty($merchantId)) {
            return;
        }

        if (empty($internalSecret)) {
            $this->logger->warning(
                'Trusteed lag heartbeat skipped: internal_hmac_secret not configured. ' .
                'Provision via Magento admin → Stores → Configuration → Trusteed → General → Internal HMAC Secret.'
            );
            return;
        }

        if (empty($connectionId)) {
            // Symmetric with EmitInstallEvent: the backend internal HMAC verifier
            // requires the connection_id (it is part of the canonical signed
            // headers). Signing/posting with an empty id would 401 noisily — skip
            // until the connection is fully provisioned.
            $this->logger->debug(
                'Trusteed lag heartbeat skipped: connection_id not yet provisioned'
            );
            return;
        }

        // SSRF guard: the integration token + internal HMAC must only ever be
        // POSTed to an allowlisted/sealed host. A tampered api_base_url (admin
        // CSRF / stored XSS / supply-chain) would otherwise exfiltrate the
        // bearer token + signature. Validate BEFORE signing or making the call.
        if ($this->urlValidator === null) {
            // Fail closed: production wires this via di.xml.
            $this->logger->warning('Trusteed lag heartbeat skipped: SSRF guard unavailable');
            return;
        }
        $authz = $this->urlValidator->isAuthorized($apiBase);
        if (!$authz['authorized']) {
            $this->logger->warning('Trusteed lag heartbeat skipped: SSRF guard rejected api_base_url', [
                'host' => $authz['host'],
                'outcome' => $authz['outcome'],
            ]);
            return;
        }

        $payload = json_encode([
            'merchant_id' => $merchantId,
            'oldest_pending_age_seconds' => $this->outboxRepository->getOldestPendingAgeSeconds(),
            'pending_count' => $this->outboxRepository->getPendingCount(),
            'dead_count' => $this->outboxRepository->getDeadCount(),
        ]);

        // M4 (audit 2026-06-01): the backend UNIFIED the lag-heartbeat verifier
        // onto the canonical internal HMAC scheme used by /internal/magento/event.
        // Sign with the SAME shared signer + `internal_hmac_secret` and emit the
        // canonical X-Trusteed-* headers. The previous bare HMAC(rawBody) scheme
        // (X-Internal-Auth / X-Internal-Timestamp) now 401s in production.
        $timestamp = (string)time();
        $authHeaders = $this->internalHmacSigner->buildHeaders(
            $internalSecret,
            $connectionId,
            'POST',
            self::HEARTBEAT_PATH,
            (string)$payload,
            $timestamp
        );

        try {
            $this->curlClient->setTimeout(5);
            $this->curlClient->addHeader('Content-Type', 'application/json');
            $this->curlClient->addHeader('Authorization', "Bearer {$token}");
            foreach ($authHeaders as $name => $value) {
                $this->curlClient->addHeader($name, $value);
            }
            $this->curlClient->post($apiBase . self::HEARTBEAT_PATH, (string)$payload);
        } catch (\Throwable $e) {
            $this->logger->warning('Trusteed lag heartbeat failed', ['error' => $e->getMessage()]);
        }
    }
}
