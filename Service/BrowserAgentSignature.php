<?php

declare(strict_types=1);

namespace Trusteed\AgenticCommerce\Service;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\HTTP\Client\Curl;
use Psr\Log\LoggerInterface;
use Trusteed\AgenticCommerce\Model\Config\SecretReader;
use Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator;

/**
 * Firma RFC 9421 / Web Bot Auth de un agente que compra NAVEGANDO la web.
 * Port de `Trusteed_Browser_Agent_Signature` (WooCommerce), mismo contrato y mismo endurecimiento.
 *
 * Modo `trusteed_general/features/browser_agent_signature_mode`:
 *  - off      ni una llamada.
 *  - observe  verifica y registra; NO cambia la clasificación (defecto).
 *  - enforce  el observer sube `verified` a `verified_signature` y marca `spoofed` como agente anónimo;
 *             unverified/error/timeout dejan la clasificación como estaba (fail-open en la clasificación).
 *
 * Secreto S2S: el `embed_secret` por conexión (config `trusteed_general/general/embed_secret`, cifrado),
 * el mismo que el backend resuelve en `resolveAnyEmbedSecret` para el middleware S2S.
 */
class BrowserAgentSignature
{
    public const MODES        = ['off', 'observe', 'enforce'];
    public const DEFAULT_MODE = 'observe';

    public const CONFIG_MODE         = 'trusteed_general/features/browser_agent_signature_mode';
    private const CONFIG_API_BASE    = 'trusteed_general/general/api_base_url';
    private const CONFIG_MERCHANT_ID = 'trusteed_general/general/merchant_id';
    private const CONFIG_EMBED       = 'trusteed_general/general/embed_secret';

    public const TIMEOUT_MS     = 1500;
    public const ENDPOINT       = '/v1/embed/agentic-tools/verify-agent-signature';
    public const KNOWN_STATUSES = ['verified', 'spoofed', 'unverified', 'skipped'];

    /** Nunca se reenvían, aunque `Signature-Input` los cubra (credenciales del navegador). */
    public const NEVER_FORWARD = ['cookie', 'authorization', 'proxy-authorization', 'form_key', 'x-form-key', 'x-trusteed-form-key'];

    /** @var array{key:string, result:?array}|null Una verificación por petición. */
    private ?array $cache = null;

    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly SecretReader $secretReader,
        private readonly Curl $curl,
        private readonly LoggerInterface $logger,
        private readonly ?ApiBaseUrlValidator $urlValidator = null,
    ) {}

    public function mode(): string
    {
        return self::normalizeMode((string)($this->scopeConfig->getValue(self::CONFIG_MODE) ?? ''));
    }

    /** Ausente o desconocido ⇒ `observe`. */
    public static function normalizeMode(?string $raw): string
    {
        $mode = strtolower(trim((string)$raw));
        return in_array($mode, self::MODES, true) ? $mode : self::DEFAULT_MODE;
    }

    /**
     * Cabeceras relevantes de la petición (minúsculas ⇒ valor): las tres de firma, content-digest y las que cubre
     * `Signature-Input`, sin credenciales ni cabeceras de autenticación de Magento (`x-magento-*`).
     *
     * @return array<string,string>
     */
    public static function collectHeaders(?object $request): array
    {
        if ($request === null || !method_exists($request, 'getHeader')) {
            return [];
        }
        $names = ['signature', 'signature-input', 'signature-agent', 'content-digest'];
        $input = $request->getHeader('Signature-Input');
        if (is_string($input) && preg_match_all('/\(([^)]*)\)/', $input, $lists)) {
            foreach ($lists[1] as $list) {
                if (preg_match_all('/"([^"]*)"/', $list, $covered)) {
                    foreach ($covered[1] as $n) {
                        if ($n !== '' && $n[0] !== '@') {
                            $names[] = strtolower($n);
                        }
                    }
                }
            }
        }
        $out = [];
        foreach (array_unique($names) as $name) {
            if (self::isForbidden($name)) {
                continue;
            }
            $value = $request->getHeader($name);
            if (is_string($value) && $value !== '') {
                $out[$name] = substr($value, 0, 4096);
            }
        }
        return $out;
    }

    private static function isForbidden(string $name): bool
    {
        return in_array($name, self::NEVER_FORWARD, true) || str_starts_with($name, 'x-magento-');
    }

    /**
     * Solo llama con las tres cabeceras (Signature, Signature-Input, Signature-Agent) y una etiqueta común.
     * `verified` solo se concede si la firma cubre `@authority` o `@target-uri` y hay un origen https en
     * `Signature-Agent` al que atar la identidad (`wba:<origen>#<keyId>`).
     *
     * @param array<string,string> $headers Cabeceras (nombre en minúsculas ⇒ valor), de {@see collectHeaders()}.
     * @return array{status:string, provider:string, keyId:string, identity:string}|null null = nada que hacer.
     */
    public function resolve(array $headers, string $method, string $pathAndQuery): ?array
    {
        try {
            return $this->doResolve(array_change_key_case($headers, CASE_LOWER), $method, $pathAndQuery);
        } catch (\Throwable $e) {
            $this->logger->warning('[trusteed] browser signature verification failed: ' . get_class($e));
            return null;
        }
    }

    private function doResolve(array $headers, string $method, string $pathAndQuery): ?array
    {
        $mode       = $this->mode();
        $merchantId = (string)($this->scopeConfig->getValue(self::CONFIG_MERCHANT_ID) ?? '');
        $origin     = $this->siteOrigin();
        if ($mode === 'off' || $merchantId === '' || $origin === '') {
            return null;
        }
        $input = (string)($headers['signature-input'] ?? '');
        $sig   = (string)($headers['signature'] ?? '');
        $agent = (string)($headers['signature-agent'] ?? '');
        if ($input === '' || $sig === '' || $agent === '') {
            return null;
        }
        $components = self::coveredComponents($input);
        $labels     = array_values(array_intersect(array_keys($components), self::signatureLabels($sig)));
        if ($labels === [] || $pathAndQuery === '') {
            return null;
        }

        $key = sha1($input . "\n" . $sig . "\n" . $agent);
        if ($this->cache !== null && $this->cache['key'] === $key) {
            return $this->cache['result'];
        }

        $apiBase = rtrim((string)($this->scopeConfig->getValue(self::CONFIG_API_BASE) ?? ''), '/');
        $secret  = $this->secretReader->read(self::CONFIG_EMBED); // descifrado solo si hay que llamar
        if ($apiBase === '' || $secret === '' || !$this->isOutboundAuthorized($apiBase)) {
            return null;
        }

        $target = parse_url($pathAndQuery);
        $path   = is_array($target) && isset($target['path']) && $target['path'] !== '' ? $target['path'] : '/';
        $url    = $origin . $path . (isset($target['query']) ? '?' . $target['query'] : '');

        $forward         = array_filter($headers, static fn ($v, $k) => !self::isForbidden((string)$k) && is_string($v) && $v !== '', ARRAY_FILTER_USE_BOTH);
        $forward['host'] = (string)parse_url($origin, PHP_URL_HOST) . (($port = parse_url($origin, PHP_URL_PORT)) ? ':' . $port : '');

        $result = $this->callApi($apiBase, $secret, [
            'merchant_id' => $merchantId,
            'method'      => strtoupper($method !== '' ? $method : 'POST'),
            'url'         => $url,
            'headers'     => $forward,
        ]);
        $result = $this->bindIdentity($result, $components, $labels, $agent);
        $this->logger->info(sprintf(
            '[trusteed] browser_agent_signature mode=%s status=%s provider=%s',
            $mode,
            $result['status'],
            $result['provider']
        ));
        $this->cache = ['key' => $key, 'result' => $result];
        return $result;
    }

    /** Origen (esquema+host+puerto) de la URL base CONFIGURADA de la tienda; nunca de `Host`. */
    private function siteOrigin(): string
    {
        $base  = (string)($this->scopeConfig->getValue('web/secure/base_url') ?? '');
        $base  = $base !== '' ? $base : (string)($this->scopeConfig->getValue('web/unsecure/base_url') ?? '');
        $parts = parse_url($base);
        if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
            return '';
        }
        return strtolower($parts['scheme']) . '://' . strtolower($parts['host']) . (isset($parts['port']) ? ':' . $parts['port'] : '');
    }

    private function isOutboundAuthorized(string $apiBase): bool
    {
        if (!str_starts_with($apiBase, 'https://')) {
            return false;
        }
        return $this->urlValidator === null || $this->urlValidator->isAuthorized($apiBase)['authorized'];
    }

    /** `verified` → `unverified` si no cubre autoridad/URI o no hay origen https del agente. */
    private function bindIdentity(array $result, array $components, array $labels, string $agentHeader): array
    {
        $result['identity'] = '';
        if ($result['status'] !== 'verified') {
            return $result;
        }
        $covers = false;
        foreach ($labels as $label) {
            if (array_intersect(['@authority', '@target-uri'], $components[$label])) {
                $covers = true;
            }
        }
        $origin = self::agentOrigin($agentHeader);
        if (!$covers || $origin === '' || $result['keyId'] === '') {
            $result['status'] = 'unverified';
            return $result;
        }
        $result['identity'] = 'wba:' . $origin . '#' . $result['keyId'];
        return $result;
    }

    /** @return array<string,string[]> etiqueta ⇒ componentes cubiertos (minúsculas). */
    private static function coveredComponents(string $input): array
    {
        $out = [];
        if (preg_match_all('/(?:^|,)\s*([A-Za-z*][A-Za-z0-9_.*\-]*)=\(([^)]*)\)/', $input, $m, PREG_SET_ORDER)) {
            foreach ($m as $member) {
                preg_match_all('/"([^"]*)"/', $member[2], $names);
                $out[$member[1]] = array_map('strtolower', $names[1]);
            }
        }
        return $out;
    }

    /** @return string[] */
    private static function signatureLabels(string $sig): array
    {
        return preg_match_all('/(?:^|,)\s*([A-Za-z*][A-Za-z0-9_.*\-]*)=:/', $sig, $m) ? $m[1] : [];
    }

    /** Origen https normalizado del `Signature-Agent`; '' si no hay. */
    private static function agentOrigin(string $header): string
    {
        if (!preg_match('/https?:\/\/[^"\s,;]+/i', $header, $m)) {
            return '';
        }
        $parts = parse_url($m[0]);
        if (!is_array($parts) || strtolower((string)($parts['scheme'] ?? '')) !== 'https' || empty($parts['host'])) {
            return '';
        }
        return 'https://' . strtolower($parts['host']) . (isset($parts['port']) ? ':' . $parts['port'] : '');
    }

    /** @return array{status:string, provider:string, keyId:string, identity:string} `error` = timeout/HTTP/JSON malo. */
    private function callApi(string $apiBase, string $secret, array $payload): array
    {
        $error = ['status' => 'error', 'provider' => '', 'keyId' => '', 'identity' => ''];
        try {
            $this->curl->setOption(CURLOPT_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setOption(CURLOPT_REDIR_PROTOCOLS, CURLPROTO_HTTPS);
            $this->curl->setOption(CURLOPT_FOLLOWLOCATION, false);
            $this->curl->setOption(CURLOPT_SSL_VERIFYPEER, true);
            $this->curl->setOption(CURLOPT_SSL_VERIFYHOST, 2);
            $this->curl->setOption(CURLOPT_CONNECTTIMEOUT_MS, self::TIMEOUT_MS);
            $this->curl->setOption(CURLOPT_TIMEOUT_MS, self::TIMEOUT_MS);
            $this->curl->addHeader('Content-Type', 'application/json');
            $this->curl->addHeader('x-trusteed-s2s-secret', $secret);
            $this->curl->post($apiBase . self::ENDPOINT, (string)json_encode($payload));
            if ($this->curl->getStatus() !== 200) {
                return $error;
            }
            $body = json_decode((string)$this->curl->getBody(), true);
        } catch (\Throwable $e) {
            return $error;
        }
        if (!is_array($body) || !in_array($body['verificationStatus'] ?? null, self::KNOWN_STATUSES, true)) {
            return $error;
        }
        return [
            'status'   => $body['verificationStatus'],
            'provider' => substr((string)($body['provider'] ?? ''), 0, 200),
            'keyId'    => substr((string)($body['keyId'] ?? ''), 0, 200),
            'identity' => '',
        ];
    }
}
