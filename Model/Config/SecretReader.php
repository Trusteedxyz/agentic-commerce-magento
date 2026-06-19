<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Config;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Encryption\EncryptorInterface;
use Psr\Log\LoggerInterface;

/**
 * Centralised reader for encrypted secrets stored in core_config_data.
 *
 * Pairs with the encrypt path in
 * {@see \Trusteed\AgenticCommerce\Controller\Adminhtml\Setup\Save} which writes
 * ciphertext via {@see EncryptorInterface::encrypt()}. All read sites that
 * consume `trusteed_general/general/integration_token`,
 * `trusteed_general/general/webhook_secret`, and
 * `trusteed_general/general/internal_hmac_secret` MUST go through this helper
 * to avoid the bug class where ciphertext is shipped as a Bearer token.
 *
 * Returns an empty string when:
 *  - the config value is missing/blank, OR
 *  - decryption fails (corrupted ciphertext, missing crypt key, etc).
 *
 * Never logs decrypted secret material. Decrypt failures are logged at warning
 * level with the config path only.
 */
class SecretReader
{
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly EncryptorInterface $encryptor,
        private readonly ?LoggerInterface $logger = null,
    ) {}

    /**
     * Read an encrypted config value and return its decrypted plaintext.
     * Returns '' when the value is unset, blank, or fails to decrypt.
     *
     * @param string      $path  Config path, e.g. trusteed_general/general/integration_token
     * @param string|null $scope Optional scope (defaults to default scope).
     * @param int|string|null $scopeCode Optional scope code/id.
     */
    public function read(string $path, ?string $scope = null, $scopeCode = null): string
    {
        $raw = $scope === null
            ? (string)($this->scopeConfig->getValue($path) ?? '')
            : (string)($this->scopeConfig->getValue($path, $scope, $scopeCode) ?? '');

        if ($raw === '') {
            return '';
        }

        try {
            $plain = (string)$this->encryptor->decrypt($raw);
        } catch (\Throwable $e) {
            $this->logger?->warning(
                'Trusteed: secret decrypt failed',
                ['path' => $path]
            );
            return '';
        }

        return $plain;
    }
}
