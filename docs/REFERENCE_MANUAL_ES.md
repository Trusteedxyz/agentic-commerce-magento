# Manual de Referencia — Trusteed Agentic Commerce para Magento 2

Versión 1.1.1 · Referencia técnica para desarrolladores e integradores de sistemas

---

## Tabla de contenidos

1. [Arquitectura del módulo](#1-arquitectura-del-módulo)
2. [Referencia de configuración](#2-referencia-de-configuración)
3. [Esquema de base de datos](#3-esquema-de-base-de-datos)
4. [Eventos y observadores](#4-eventos-y-observadores)
5. [Trabajos cron](#5-trabajos-cron)
6. [Recursos ACL](#6-recursos-acl)
7. [Rutas de administración](#7-rutas-de-administración)
8. [Rutas de frontend](#8-rutas-de-frontend)
9. [Servicios](#9-servicios)
10. [Motor de cumplimiento](#10-motor-de-cumplimiento)
11. [Bandeja de salida de webhooks](#11-bandeja-de-salida-de-webhooks)
12. [Verificación de token de agente](#12-verificación-de-token-de-agente)
13. [Manifiesto MCP](#13-manifiesto-mcp)
14. [Atributos de extensión](#14-atributos-de-extensión)
15. [Endpoints de API invocados](#15-endpoints-de-api-invocados)
16. [Modelo de seguridad](#16-modelo-de-seguridad)
17. [Comandos de consola](#17-comandos-de-consola)
18. [Parches de datos](#18-parches-de-datos)
19. [Configuración Di.xml](#19-configuración-dixml)
20. [Registro de eventos (Logging)](#20-registro-de-eventos-logging)

---

## 1. Arquitectura del módulo

```
Trusteed_AgenticCommerce
├── Block/Adminhtml/          Bloques SPA para páginas de administración
├── Console/Command/          Comandos CLI (check-webserver, webhook:status)
├── Controller/
│   ├── Adminhtml/            Controladores de administración
│   └── Wellknown/            Endpoint /.well-known/mcp.json del frontend
├── Cron/                     Vaciador de webhooks + latido de latencia
├── Enforcement/              Lógica de la puerta HITL R043
├── Model/
│   ├── Config/               Lectores ScopeConfig + validador SSRF
│   ├── Manifest/             Constructor del manifiesto MCP
│   ├── Security/             Firmador HMAC + validador de URL de API
│   ├── Setup/                Proveedor de datos del asistente de configuración
│   ├── Storefront/           Detector de temas Hyvä/PWA
│   └── Webhook/              Repositorio de bandeja de salida + publicador de firma
├── Observer/                 Ganchos de eventos Magento (pedido, envío, pago)
├── Plugin/                   Plugin de atributo de extensión de pedido
├── Router/                   Enrutador de URL /.well-known
├── Service/                  EnforcementClient, AgentTokenVerifier, CartSignals
├── Setup/Patch/Data/         Parches de datos (atributo EAV, puente Hyvä, evento instalación)
├── Test/
│   ├── Integration/          Suite de pruebas de integración
│   ├── Static/               Verificador de consistencia de rutas
│   └── Unit/                 Suite de pruebas unitarias
├── etc/                      XML del módulo, DI, ACL, eventos, cron, config del sistema
├── i18n/                     Archivos de traducción
└── view/                     Layout y plantillas del administrador
```

**Nombre del módulo:** `Trusteed_AgenticCommerce`
**Paquete Composer:** `trusteed/agentic-commerce-magento`
**Espacio de nombres PHP:** `Trusteed\AgenticCommerce`
**Versión de configuración:** ninguna (usa Data Patches exclusivamente)

---

## 2. Referencia de configuración

Todas las rutas están en **Tiendas → Configuración → Trusteed → Agentic Commerce**
(sección `trusteed_general` en `system.xml`).

### Grupo: Conexión API (`trusteed_general/general`)

| Campo | Ruta de Configuración | Tipo | Ámbito | Descripción |
|-------|-----------------------|------|--------|-------------|
| API Base URL | `trusteed_general/general/api_base_url` | texto | Global | Raíz de la API de Trusteed (debe ser HTTPS). Predeterminado: `https://api.trusteed.xyz` |
| Merchant ID | `trusteed_general/general/merchant_id` | texto | Global | Asignado por Trusteed al crear la cuenta |
| Integration Token | `trusteed_general/general/integration_token` | oculto | Global | Token Bearer para llamadas API salientes. Almacenado cifrado |
| Webhook Secret | `trusteed_general/general/webhook_secret` | oculto | Global | Secreto HMAC-SHA256 para firmar entregas de webhook. Almacenado cifrado |
| Internal HMAC Secret | `trusteed_general/general/internal_hmac_secret` | oculto | Global | Firma las llamadas internas de latido con las cabeceras `X-Trusteed-Connection-Id`, `X-Trusteed-Timestamp` y `X-Trusteed-Signature`. La API de Trusteed rechaza el esquema anterior `X-Internal-Auth` |
| Webhook Secret Version | `trusteed_general/general/webhook_secret_version` | texto | Global | Incremente al rotar el secreto de webhook. Se usa en la cabecera `X-Trusteed-Webhook-Secret-Version` |
| Connection ID | `trusteed_general/general/connection_id` | texto | Sitio web | Asignado por Trusteed al conectar. Identifica esta tienda en la entrega de webhooks |

### Grupo: Características (`trusteed_general/features`)

| Campo | Ruta de Configuración | Tipo | Ámbito | Descripción |
|-------|-----------------------|------|--------|-------------|
| Enable WebMCP Bridge | `trusteed_general/features/webmcp_enabled` | selección | Sitio web | Inyecta el puente JS del storefront. Se desactiva automáticamente en Hyvä/PWA Studio |
| Enable Phase B | `trusteed_general/features/phase_b_enabled` | selección | Global | Reservado para futura SPA embebida. No activar |

### Rutas de cumplimiento

| Ruta de Configuración | Descripción |
|----------------------|-------------|
| `trusteed/enforcement/failure_mode` | `observe` o `enforce`. Predeterminado: `enforce`. Puede cambiarlo en **Trusteed → Ajustes** |
| `trusteed/enforcement/installation_id` | Enforcement Installation ID que proporciona Trusteed. Se introduce en el Asistente de Configuración |
| `trusteed/enforcement/hmac_secret` | Enforcement HMAC Secret que proporciona Trusteed, usado para firmar `POST /v1/rules/evaluate`. Se introduce en el Asistente de Configuración |

---

## 3. Esquema de base de datos

### Tabla: `trusteed_webhook_outbox`

Bandeja de salida de entrega fiable para eventos de pedido. Las entradas son creadas
por observadores y vaciadas cada minuto por el cron `trusteed_webhook_drain`.

| Columna | Tipo | Nulable | Descripción |
|---------|------|---------|-------------|
| `id` | int unsigned AUTO_INCREMENT | No | Clave primaria |
| `event_id` | varchar(36) UNIQUE | No | Identificador de evento UUID v4 (clave de idempotencia) |
| `event_type` | varchar(32) | No | `order_created`, `order_completed`, `order_refunded`, `order_cancelled`, `order_fulfilled` |
| `entity_id` | int unsigned | No | `entity_id` del pedido Magento |
| `increment_id` | varchar(32) | No | ID de incremento del pedido Magento (p. ej., `000000001`) |
| `composite_id` | varchar(64) | No | ID compuesto en formato `MAG:<entity_id>` |
| `store_view_code` | varchar(32) | No | Código de vista de tienda en el momento del evento |
| `payload` | text | No | Payload del pedido serializado (JSON) |
| `status` | varchar(16) | No | `pending`, `delivered`, `dead` |
| `retry_count` | int unsigned | No | Número de intentos de entrega. Predeterminado: 0 |
| `secret_version` | int unsigned | No | Versión del secreto de webhook al encolar |
| `next_attempt_at` | timestamp | Sí | Hora mínima de entrega elegible (retroceso exponencial). NULL = elegible inmediatamente |
| `locked_until` | timestamp | Sí | Vencimiento del bloqueo de arrendamiento (mecanismo de bloqueo de trabajador) |
| `locked_by` | varchar(64) | Sí | Identificador del proceso que mantiene el arrendamiento |
| `created_at` | timestamp | No | Hora de creación de la entrada |
| `updated_at` | timestamp | No | Hora de última modificación (actualización automática) |

**Índices:**
- `TRUSTEED_WEBHOOK_OUTBOX_EVENT_ID` (UNIQUE) en `event_id`
- `TRUSTEED_WEBHOOK_OUTBOX_STATUS_CREATED_AT` en `(status, created_at)`
- `TRUSTEED_WEBHOOK_OUTBOX_LOCKED_UNTIL` en `locked_until`
- `TRUSTEED_WEBHOOK_OUTBOX_STATUS_NEXT_ATTEMPT` en `(status, next_attempt_at, created_at)`

### Columnas añadidas a `sales_order`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `trusteed_receipt_uri` | varchar(1024) nulable | URI del TrustReceipt. Inmutable una vez establecido |
| `trusteed_receipt_status` | varchar(16) nulable | `signed`. Se establece al guardar por primera vez la URI del recibo |

---

## 4. Eventos y observadores

| Evento Magento | Clase Observador | Propósito |
|----------------|-----------------|-----------|
| `sales_order_save_after` | `SalesOrderSaveAfter` | Encola eventos `order_created` (pedidos nuevos, en proceso y en espera), `order_completed`, `order_refunded` (pedidos cerrados) y `order_cancelled` según el estado del pedido |
| `sales_order_creditmemo_save_after` | `SalesCreditmemoSaveAfter` | Encola `order_refunded` para reembolsos parciales |
| `sales_model_service_quote_submit_before` | `CheckoutSubmitBefore` | Cumplimiento pre-pedido: verifica el token del agente, llama a `/v1/rules/evaluate`, aplica congelación HITL (R043) o lanza `LocalizedException` en BLOCK |
| `sales_order_payment_failed` | `SalesOrderPaymentFailedObserver` | Envía una señal de fallo de checkout firmada con HMAC a `/api/v1/checkout-failures` para el seguimiento de R011. No usa la bandeja de salida |
| `sales_order_shipment_save_after` | `ShipmentSaveAfter` | Encola `order_fulfilled` cuando se crea un envío |

### Plugins

| Clase Plugin | Objetivo | Método | Tipo | Propósito |
|-------------|----------|--------|------|-----------|
| `OrderRepositoryPlugin` | `Magento\Sales\Api\OrderRepositoryInterface` | `get` | after | Carga los atributos de extensión `trusteed_receipt_uri` y `trusteed_receipt_status` al cargar el pedido |
| `OrderExtensionAttribute` | `Magento\Sales\Api\OrderRepositoryInterface` | `save` | around | Persiste los atributos de extensión al guardar el pedido |

---

## 5. Trabajos cron

Ambos trabajos están en el grupo cron `default` y se ejecutan cada minuto.

### `trusteed_webhook_drain`

**Clase:** `Trusteed\AgenticCommerce\Cron\DrainOutbox`

Procesa la tabla `trusteed_webhook_outbox`:

1. Selecciona entradas donde `status = 'pending'` Y (`next_attempt_at IS NULL` O `next_attempt_at <= NOW()`) Y (`locked_until IS NULL` O `locked_until < NOW()`)
2. Adquiere un arrendamiento (`locked_by = <worker-id>`, `locked_until = NOW() + 60s`)
3. Hace POST del payload a `POST /api/v1/webhook/magento/<connection_id>` con las cabeceras de firma descritas en [Bandeja de salida de webhooks](#11-bandeja-de-salida-de-webhooks)
4. En éxito (2xx): establece `status = 'delivered'`
5. En fallo: incrementa `retry_count`, establece un `next_attempt_at` exponencial (2 s × 2^retry_count, con tope de 1 hora y una variación aleatoria de ±20 %)
6. Tras 8 reintentos: establece `status = 'dead'`

### `trusteed_lag_heartbeat`

**Clase:** `Trusteed\AgenticCommerce\Cron\EmitLagHeartbeat`

Cada minuto, calcula la antigüedad de la entrada `pending` más antigua de la bandeja
de salida y la informa a `POST /api/v1/internal/magento/lag-heartbeat` para que el panel de Trusteed
pueda alertar sobre latencias de entrega.

---

## 6. Recursos ACL

| ID de Recurso | Título | Notas |
|--------------|-------|-------|
| `Trusteed_AgenticCommerce::config` | Trusteed Agentic Commerce | Concede acceso a todas las páginas de administración de Trusteed |
| `Trusteed_AgenticCommerce::token` | Trusteed Embed Token Relay | Concede acceso al controlador de emisión de tokens usado por el Asistente de Configuración |

Para conceder a un rol personalizado acceso a las páginas de Trusteed, añada
`Trusteed_AgenticCommerce::config` en **Sistema → Permisos → Roles de Usuario → [Rol] → Recursos del Rol**.

---

## 7. Rutas de administración

**Nombre frontal:** `trusteed` (definido en `etc/adminhtml/routes.xml`)

| Patrón URL | Controlador | Descripción |
|-----------|-----------|-------------|
| `/trusteed/dashboard/index` | `Controller/Adminhtml/Dashboard/Index` | Host SPA del panel |
| `/trusteed/health/index` | `Controller/Adminhtml/Health/Index` | SPA de salud de la tienda |
| `/trusteed/ventas/index` | `Controller/Adminhtml/Ventas/Index` | SPA de ventas de agentes |
| `/trusteed/agentes/index` | `Controller/Adminhtml/Agentes/Index` | SPA de directorio de agentes |
| `/trusteed/reglas/index` | `Controller/Adminhtml/Reglas/Index` | SPA de reglas |
| `/trusteed/pagos/index` | `Controller/Adminhtml/Pagos/Index` | SPA de métodos de pago |
| `/trusteed/seguridad/index` | `Controller/Adminhtml/Seguridad/Index` | SPA de seguridad |
| `/trusteed/ajustes/index` | `Controller/Adminhtml/Ajustes/Index` | SPA de ajustes |
| `/trusteed/setup/wizard` | `Controller/Adminhtml/Setup/Wizard` | Asistente de Configuración |
| `/trusteed/setup/save` | `Controller/Adminhtml/Setup/Save` | Acción de guardado del asistente |
| `/trusteed/setup/introspecttoken` | `Controller/Adminhtml/Setup/IntrospectToken` | Introspección de token AJAX |
| `/trusteed/token/issue` | `Controller/Adminhtml/Token/Issue` | Emite token embebido (POST) |
| `/trusteed/support/submit` | `Controller/Adminhtml/Support/Submit` | Envío de formulario de soporte |

---

## 8. Rutas de frontend

**Nombre frontal:** `nlweb` (definido en `etc/frontend/routes.xml`)

| Patrón URL | Controlador | Descripción |
|-----------|-----------|-------------|
| `/nlweb/products/index` | `Controller/Products/Index` | Endpoint de búsqueda de productos NLWeb (proxiado) |
| `/nlweb/wellknown/mcpmanifest` | `Controller/Wellknown/McpManifest` | Devuelve el JSON del manifiesto MCP |

La URL canónica `/.well-known/mcp.json` es manejada por `Router/WellKnownRouter.php`,
que mapea `/.well-known/mcp.json` a `nlweb/wellknown/mcpmanifest`.

---

## 9. Servicios

### `EnforcementClient`

**Clase:** `Trusteed\AgenticCommerce\Service\EnforcementClient`

Cliente HTTP para la API de evaluación de reglas de Trusteed.

| Método | Devuelve | Descripción |
|--------|---------|-------------|
| `evaluate(array $payload): string` | `ALLOW` \| `BLOCK` \| `ESCALATE` | Llama a `POST /v1/rules/evaluate`. En error de transporte, prueba primero la válvula de seguridad offline y después devuelve `BLOCK` (modo enforce) o `ALLOW` (modo observe) |
| `getDidResolver(string $merchantId): array` | `array<{did, publicKeyJwk}>` | Obtiene el mapa DID de agente → clave pública del snapshot. Array vacío en fallo |
| `getRules(string $merchantId): array` | `array<{ruleCode, params, mode, enabled}>` | Obtiene la configuración de reglas del snapshot |
| `consumeNonce(string $agentDid, string $jti, int $exp): array` | `{outcome, reason, httpStatus}` | Registra un nonce de un solo uso para protección contra replay |

**Formato de firma** (estilo Stripe):
```
X-Trusteed-Signature: t=<unix-timestamp>,s=<hmac-sha256-hex>
```
donde el HMAC se calcula sobre `"<timestamp>.<rawBody>"`.

### `AgentTokenVerifier`

**Clase:** `Trusteed\AgenticCommerce\Service\AgentTokenVerifier`

Verifica tokens JWT de agente firmados con Ed25519:

1. Analiza la cabecera/payload del JWT (decodificación base64url directa, sin librería)
2. Busca la clave pública del agente en el snapshot (`getDidResolver`)
3. Verifica la firma Ed25519 usando `sodium_crypto_sign_verify_detached` (o fallback `paragonie/sodium_compat`)
4. Valida las claims `exp`, `iat`, `iss`, `aud`
5. Llama a `consumeNonce` para protección contra replay

### `CartSignals`

**Clase:** `Trusteed\AgenticCommerce\Service\CartSignals`

Extrae señales de nivel de carrito de un presupuesto Magento para incluirlas en el
payload de `/v1/rules/evaluate`:

- Total del carrito
- Número de artículos
- IDs de categoría de producto
- Metadatos del agente de los atributos personalizados del presupuesto

### `AgentHistoryFetcher`

**Clase:** `Trusteed\AgenticCommerce\Service\AgentHistoryFetcher`

Obtiene el historial de pedidos del agente desde la API de Trusteed para rellenar
el campo de contexto `agentHistory` en `/v1/rules/evaluate`.

---

## 10. Motor de cumplimiento

### Flujo

```
sales_model_service_quote_submit_before
    ↓
CheckoutSubmitBefore::execute()
    ↓
¿Es un pedido de agente? (la sesión de checkout tiene trusteed_agent_token)
    ↓ SÍ
AgentTokenVerifier::verify()
    ↓ VALID / INVALID / UNVERIFIED
EnforcementClient::evaluate({
    merchantId, agentId, orderContext,
    platform: "MAGENTO",
    installationId, timestamp
})
    ↓
ALLOW    → continuar (el pedido se crea normalmente)
BLOCK    → lanzar LocalizedException (el pedido NO se crea)
ESCALATE → congelar presupuesto (is_active=0), sellar flags HITL, lanzar LocalizedException
```

Los checkouts de clientes humanos también pasan por `evaluate()`, con `agentId` a
`null`, así que sus reglas de comerciante también se les aplican.

### ESCALATE (R043 HITL)

Cuando `evaluate()` devuelve `ESCALATE`:

1. `R043HitlGate::buildFreezePayload()` extrae el código de regla, motivo e ID de evaluación
2. El presupuesto se marca con metadatos personalizados:
   - `trusteed_hitl_pending = 1`
   - `trusteed_hitl_rule_code = <ruleCode>`
   - `trusteed_hitl_reason = <reason>`
   - `trusteed_hitl_evaluation_id = <evaluationId>`
3. El presupuesto `is_active` se establece en `0` (evita la recaptura del cliente)
4. Se lanza una `LocalizedException`, por lo que Magento no crea el pedido
5. El intento aparece en el panel de Trusteed para revisión del comerciante

### Modo de fallo

Cuando falla la llamada a `evaluate()` (error de transporte, respuesta que no es 2xx o
una URL base de API rechazada), el módulo prueba primero la válvula de seguridad
offline. Comprueba el último snapshot de reglas con R014 (solo la comprobación de país),
R018, R019, R020, R025, R027, R028, R029 y R030, y devuelve `BLOCK` si coincide alguna.
Si no coincide ninguna, decide el modo de fallo:

| Valor de configuración | Comportamiento |
|-----------------------|----------------|
| `enforce` (predeterminado) | Devuelve `BLOCK`. El pedido es rechazado |
| `observe` | Devuelve `ALLOW`. El pedido procede |

---

## 11. Bandeja de salida de webhooks

### Formato del payload de entrega

Cada entrada se entrega con `POST <api_base_url>/api/v1/webhook/magento/<connection_id>`.
Este es el cuerpo de un evento de estado del pedido (`sales_order_save_after`):

```json
{
  "event_id": "<uuid-v4>",
  "event_type": "order_created",
  "entity_id": 1,
  "increment_id": "000000001",
  "composite_id": "MAG:1",
  "store_view_code": "default",
  "updated_at": "2026-06-18T10:00:00+00:00",
  "payload": {
    "grand_total": 99.99,
    "status": "pending",
    "state": "new",
    "customer_email": null,
    "agent_did": null
  }
}
```

`customer_email` es siempre `null`, porque el payload omite los datos personales.
`agent_did` contiene la identidad verificada del agente en los pedidos de agentes y es
`null` en los checkouts de clientes humanos.

### Cabeceras de firma

```
Authorization: Bearer <integration token>
X-Trusteed-Signature: <hmac-sha256 en hexadecimal>
X-Trusteed-Timestamp: <segundos unix>
X-Trusteed-Nonce: <32 caracteres hexadecimales>
X-Trusteed-Webhook-Secret-Version: 1
```

Entrada HMAC, con el secreto de webhook como clave:
`"<timestamp>.<nonce>.<secretVersion>.<rawBody>"`

### Programación de reintentos

La espera antes de cada reintento es de 2 segundos × 2^`retry_count`, con tope de 1 hora y una variación aleatoria de ±20 %. Tras 8 reintentos, el estado de la entrada pasa a `dead`.

Las entradas `dead` no se reintentan. Use el panel de Trusteed para reproducir
webhooks muertos manualmente si es necesario.

---

## 12. Verificación de token de agente

Los tokens de agente son JWTs firmados con Ed25519 (algoritmo `EdDSA`, curva `Ed25519`).

### Claims del token

| Claim | Tipo | Descripción |
|-------|------|-------------|
| `iss` | string | DID del agente (p. ej., `did:web:claude.ai`) |
| `sub` | string | Identificador del cliente |
| `aud` | string | Merchant ID |
| `exp` | timestamp Unix | Vencimiento del token (máx. 300 segundos desde iat) |
| `iat` | timestamp Unix | Emitido en |
| `jti` | string | Nonce de un solo uso (base64url, 16–128 chars) |
| `platform` | string | Plataforma del agente (`claude`, `chatgpt`, etc.) |

### Resultados de la verificación

| Resultado | Significado |
|-----------|-------------|
| `VERIFIED` | Firma válida, claims válidas, nonce no reproducido |
| `INVALID` | Firma inválida, token vencido o nonce ya usado |
| `UNVERIFIED` | Sin token o token no analizable |

### Resolución de clave pública

Las claves públicas de los agentes se obtienen del snapshot de cumplimiento
(`GET /v1/rules/snapshot/<merchantId>`) como conjunto JWK. El snapshot se almacena
en caché en memoria durante la duración de la solicitud para evitar llamadas API repetidas.

---

## 13. Manifiesto MCP

**Endpoint:** `GET /.well-known/mcp.json`
**Controlador:** `Trusteed\AgenticCommerce\Controller\Wellknown\McpManifest`
**Constructor:** `Trusteed\AgenticCommerce\Model\Manifest\Builder`

El manifiesto indica a los agentes IA qué capacidades expone su tienda.
Está firmado con una clave Ed25519 provisionada por Trusteed.

### Campos del manifiesto

```json
{
  "schema_version": "1.2",
  "merchant_id": "<merchant-id>",
  "store_url": "https://su-tienda.com",
  "connection_id": "<connection-id>",
  "platform": "magento",
  "capabilities": {
    "browse_catalog": true,
    "add_to_cart": true,
    "checkout": true,
    "payment_methods": ["x402", "stored_card"]
  },
  "mcp_endpoint": "https://api.trusteed.xyz/mcp/<merchant-id>",
  "issued_at": "<iso8601>",
  "signature": "<jws-compact>"
}
```

---

## 14. Atributos de extensión

El módulo añade atributos de extensión a `Magento\Sales\Api\Data\OrderInterface`:

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `trusteed_receipt_uri` | string | URI del TrustReceipt |
| `trusteed_receipt_status` | string | Estado del recibo. El módulo establece `signed` al guardar por primera vez la URI del recibo |

Definidos en `etc/extension_attributes.xml`. Cargados/guardados mediante
`Plugin/Sales/OrderExtensionAttribute.php` y `Plugin/Repository/OrderRepositoryPlugin.php`.

---

## 15. Endpoints de API invocados

El módulo realiza llamadas HTTPS salientes a la API de Trusteed. Todas las llamadas
requieren HTTPS y son validadas por `ApiBaseUrlValidator` (guardia SSRF).

| Método | Ruta | Cuándo | Autenticación |
|--------|------|--------|---------------|
| `POST` | `/v1/rules/evaluate` | En cada intento de checkout | `X-Trusteed-Signature` (HMAC) |
| `GET` | `/v1/rules/snapshot/<merchantId>` | Por fallo de caché de solicitud | `X-Trusteed-Signature` (HMAC) |
| `POST` | `/v1/agent-events/nonce-consume` | Tras la verificación del token | `X-Trusteed-Signature` (HMAC) |
| `POST` | `/api/v1/webhook/magento/<connection_id>` | Entrega de webhook | Token Bearer de integración y `X-Trusteed-Signature` (HMAC) |
| `POST` | `/api/v1/internal/magento/lag-heartbeat` | Cada minuto (monitor de latencia) | Token Bearer de integración y `X-Trusteed-Signature` (HMAC) |
| `POST` | `/api/v1/checkout-failures` | Cuando falla un pago (señal de R011) | Payload firmado con HMAC |
| `POST` | `/api/v1/coupon-attempts-failed` | Cuando se rechaza un cupón | Payload firmado con HMAC |
| `POST` | `/api/v1/auth/introspect` | Comprobación del token en el Asistente de Configuración | Token Bearer de integración |
| `POST` | `/api/v1/internal/magento/event` | Una vez, en la instalación (data patch) | Token Bearer de integración |

**Timeouts:** 5 segundos para las llamadas de evaluación de reglas, snapshot y nonce, y
10 segundos para la entrega de webhooks. Las señales de fallo de checkout y de cupón
caducan a los 1,5 segundos, para que nunca retrasen un checkout. La verificación TLS entre pares
siempre está habilitada (`CURLOPT_SSL_VERIFYPEER=true`, `CURLOPT_SSL_VERIFYHOST=2`).
Las redirecciones HTTP están deshabilitadas (`CURLOPT_FOLLOWLOCATION=false`).

---

## 16. Modelo de seguridad

### Protección SSRF

`Model/Security/ApiBaseUrlValidator.php` valida la `api_base_url` configurable por
el administrador contra una lista de hosts de API de Trusteed conocidos y permitidos.
Cualquier intento de cambiar la URL de API a un host no permitido es rechazado
antes de enviar cualquier payload firmado.

### Fortalecimiento TLS

Todas las llamadas curl salientes aplican:

- Solo esquema HTTPS (`CURLPROTO_HTTPS`)
- Verificación TLS de par y host
- Sin seguimiento de redirecciones

### Firma HMAC

Las llamadas a `POST /v1/rules/evaluate` están firmadas con HMAC-SHA256 en formato
estilo Stripe: `t=<timestamp>,s=<hex>`. La entrada de firma es
`"<timestamp>.<rawBody>"`. Las entregas de webhook usan las cabeceras y la entrada de
firma distintas descritas en [Bandeja de salida de webhooks](#11-bandeja-de-salida-de-webhooks).

### Versionado del secreto de webhook

Cada entrada de la bandeja de salida guarda la versión del secreto de webhook vigente
cuando se encoló, y la cabecera de entrega `X-Trusteed-Webhook-Secret-Version` lleva
esa versión. Rote los secretos así:

1. Actualice el secreto en el panel de Trusteed
2. Pegue el nuevo secreto en la configuración de Magento
3. Incremente `Webhook Secret Version`

### Protección contra replay

Los tokens de agente incluyen un claim `jti` (JWT ID). El módulo llama a
`POST /v1/agent-events/nonce-consume` tras verificar cada token. Una respuesta 409
indica replay, y el módulo trata el token como `INVALID`.

---

## 17. Comandos de consola

| Comando | Clase | Descripción |
|---------|-------|-------------|
| `trusteed:check-webserver` | `Console/Command/CheckWebserver.php` | Valida que el endpoint `/.well-known/mcp.json` sea accesible desde el propio servidor |
| `trusteed:webhook:status` | `Console/Command/WebhookStatus.php` | Imprime estadísticas de la bandeja de salida: recuentos de pendientes, entregados y muertos, y antigüedad de la entrada pendiente más antigua |

Uso:
```bash
bin/magento trusteed:check-webserver
bin/magento trusteed:webhook:status
```

---

## 18. Parches de datos

| Clase de Parche | Propósito | Idempotente |
|----------------|-----------|------------|
| `AddAgenticVisibleAttribute` | Añade el atributo EAV `is_agentic_visible` (booleano, valor predeterminado 1) a productos y categorías. El endpoint de productos de NLWeb filtra por él, así que puede ocultar elementos a los agentes | Sí |
| `DisableBridgeOnHyva` | Detecta temas Hyvä o PWA Studio y establece `trusteed_general/features/webmcp_enabled = 0` para evitar conflictos JS del storefront | Sí |
| `EmitInstallEvent` | Llama a `POST /api/v1/internal/magento/event` para registrar la marca temporal de instalación y la versión de Magento en el panel de Trusteed | Sí |

---

## 19. Configuración Di.xml

Entradas clave de inyección de dependencias:

```xml
<!-- EnforcementClient recibe el validador SSRF vía DI -->
<type name="Trusteed\AgenticCommerce\Service\EnforcementClient">
    <arguments>
        <argument name="urlValidator" xsi:type="object">
            Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator
        </argument>
    </arguments>
</type>

<!-- El repositorio de bandeja de salida usa el patrón ResourceModel de Magento -->
<preference for="Trusteed\AgenticCommerce\Model\Webhook\OutboxRepositoryInterface"
            type="Trusteed\AgenticCommerce\Model\Webhook\OutboxRepository"/>
```

Consulte `etc/di.xml` y `etc/frontend/di.xml` para la configuración completa.

---

## 20. Registro de eventos (Logging)

Todas las entradas de registro del módulo llevan el prefijo `[trusteed]` y se
escriben en `var/log/system.log` (registrador predeterminado de Magento) en los
siguientes niveles:

| Nivel | Mensajes de ejemplo |
|-------|---------------------|
| `debug` | Acierto de caché del snapshot, nonce consumido ACCEPTED |
| `info` | Encole exitoso en bandeja de salida, webhook entregado |
| `warning` | Timeout de API, rechazo del guardia SSRF, desajuste de verificación HMAC, HTTP no-2xx en evaluate |
| `error` | Configuración obligatoria faltante, fallo de vaciado de bandeja de salida tras máximos reintentos |

Para habilitar el registro de debug:
```bash
bin/magento config:set dev/debug/debug_logging 1
```

### Atajos de grep para registros

```bash
# Todas las entradas de Trusteed
grep '\[trusteed\]' var/log/system.log

# Solo problemas de entrega de bandeja de salida
grep '\[trusteed\] webhook\|deliver\|dead\|retry' var/log/system.log

# Decisiones de cumplimiento
grep '\[trusteed\] evaluate\|BLOCK\|ALLOW\|ESCALATE' var/log/system.log

# Problemas de tokens de agente
grep '\[trusteed\] token\|nonce\|verify\|INVALID\|REPLAY' var/log/system.log
```
