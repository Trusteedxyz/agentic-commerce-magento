<?php

declare(strict_types=1);

/**
 * Namespaced cURL shims for console-command unit tests.
 *
 * {@see \Trusteed\AgenticCommerce\Console\Command\CheckWebserver} calls the
 * cURL extension through unqualified function names. PHP resolves unqualified
 * function calls against the current namespace *before* falling back to the
 * global scope, so declaring `curl_*` inside that namespace lets the unit suite
 * drive the command with canned HTTP responses — no network, no webserver.
 *
 * State is held in {@see CurlStubState}; each test sets the response it wants
 * and resets afterwards.
 *
 * @package Trusteed\AgenticCommerce\Test\Unit
 */

namespace Trusteed\AgenticCommerce\Test\Unit\Console {
    /**
     * Canned-response holder for the namespaced cURL shims below.
     */
    final class CurlStubState
    {
        public static string $body = '';
        public static int $httpCode = 200;
        public static string $error = '';

        /** @var array<int, string> URLs the command asked for, in order. */
        public static array $requestedUrls = [];

        public static function reset(): void
        {
            self::$body = '';
            self::$httpCode = 200;
            self::$error = '';
            self::$requestedUrls = [];
        }
    }
}

namespace Trusteed\AgenticCommerce\Console\Command {
    use Trusteed\AgenticCommerce\Test\Unit\Console\CurlStubState;

    if (!\function_exists(__NAMESPACE__ . '\curl_init')) {
        function curl_init(string $url = '')
        {
            CurlStubState::$requestedUrls[] = $url;
            return new \stdClass();
        }

        function curl_setopt_array($handle, array $options): bool
        {
            return true;
        }

        function curl_exec($handle)
        {
            return CurlStubState::$error !== '' ? false : CurlStubState::$body;
        }

        function curl_getinfo($handle, ?int $option = null)
        {
            return CurlStubState::$httpCode;
        }

        function curl_error($handle): string
        {
            return CurlStubState::$error;
        }

        function curl_close($handle): void
        {
        }
    }
}
