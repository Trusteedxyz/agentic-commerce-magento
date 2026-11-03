<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Model\Manifest;

/**
 * Thrown when the manifest cannot be signed.
 *
 * Causes (ADR-050 Option A — backend remote signing):
 *  - HTTPS / SSRF-allowlist validation failure on api_base_url.
 *  - Missing connection_id or internal_hmac_secret config.
 *  - The backend remote-sign endpoint is unreachable or returns non-2xx.
 *  - The backend response shape / JWS is invalid.
 */
class ManifestSigningException extends \RuntimeException
{
}
