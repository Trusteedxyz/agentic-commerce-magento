# Reference Manual — Trusteed Agentic Commerce for Magento 2

Version 1.2.1 · Technical Reference for Developers and System Integrators

---

## Table of Contents

1. [Module Architecture](#1-module-architecture)
2. [Configuration Reference](#2-configuration-reference)
3. [Database Schema](#3-database-schema)
4. [Events and Observers](#4-events-and-observers)
5. [Cron Jobs](#5-cron-jobs)
6. [ACL Resources](#6-acl-resources)
7. [Admin Routes](#7-admin-routes)
8. [Frontend Routes](#8-frontend-routes)
9. [Services](#9-services)
10. [Enforcement Engine](#10-enforcement-engine)
11. [Webhook Outbox](#11-webhook-outbox)
12. [Agent Token Verification](#12-agent-token-verification)
13. [MCP Manifest](#13-mcp-manifest)
14. [Extension Attributes](#14-extension-attributes)
15. [API Endpoints Called](#15-api-endpoints-called)
16. [Security Model](#16-security-model)
17. [Console Commands](#17-console-commands)
18. [Data Patches](#18-data-patches)
19. [Di.xml Wiring](#19-dixml-wiring)
20. [Logging](#20-logging)

---

## 1. Module Architecture

```
Trusteed_AgenticCommerce
├── Block/Adminhtml/          SPA placeholder blocks for admin pages
├── Console/Command/          CLI commands (checkwebserver, webhook:status)
├── Controller/
│   ├── Adminhtml/            Admin controllers (Dashboard, Setup, Health, etc.)
│   └── Wellknown/            Frontend /.well-known/mcp.json endpoint
├── Cron/                     Webhook drainer + lag heartbeat
├── Enforcement/              R043 HITL gate logic
├── Model/
│   ├── Config/               ScopeConfig readers + SSRF validator
│   ├── Manifest/             MCP manifest builder
│   ├── Security/             HMAC signer + API URL validator
│   ├── Setup/                Setup wizard data provider
│   ├── Storefront/           Hyvä/PWA theme detector
│   └── Webhook/              Outbox repository + signature publisher
├── Observer/                 Magento event hooks (order, shipment, payment)
├── Plugin/                   Order extension attribute plugin
├── Router/                   /.well-known URL router
├── Service/                  EnforcementClient, AgentTokenVerifier, CartSignals
├── Setup/Patch/Data/         Data patches (EAV attribute, Hyvä bridge, install event)
├── Test/
│   ├── Integration/          Integration test suite
│   ├── Static/               Route consistency checker
│   └── Unit/                 Unit test suite
├── etc/                      Module XML, DI, ACL, events, cron, system config
├── i18n/                     Translation files
└── view/                     Admin layout + templates
```

**Module name:** `Trusteed_AgenticCommerce`
**Composer package:** `trusteed/agentic-commerce-magento`
**PHP namespace:** `Trusteed\AgenticCommerce`
**Setup version:** none (uses Data Patches exclusively)

---

## 2. Configuration Reference

All paths are under `Stores → Configuration → Trusteed → Agentic Commerce`
(`trusteed_general` section in `system.xml`).

### Group: API Connection (`trusteed_general/general`)

| Field                  | Config Path                                       | Type    | Scope   | Description                                                                                                         |
| ---------------------- | ------------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| API Base URL           | `trusteed_general/general/api_base_url`           | text    | Global  | Trusteed API root (must be HTTPS). Default: `https://api.trusteed.xyz`                                              |
| Merchant ID            | `trusteed_general/general/merchant_id`            | text    | Global  | Assigned by Trusteed at account creation                                                                            |
| Integration Token      | `trusteed_general/general/integration_token`      | obscure | Global  | Bearer token for outbound API calls. Stored encrypted via `Magento\Config\Model\Config\Backend\Encrypted`           |
| Webhook Secret         | `trusteed_general/general/webhook_secret`         | obscure | Global  | HMAC-SHA256 secret for signing webhook deliveries. Stored encrypted                                                 |
| Internal HMAC Secret   | `trusteed_general/general/internal_hmac_secret`   | obscure | Global  | Signs internal heartbeat calls (`X-Internal-Auth` header). Must match `INTERNAL_API_SECRET` in the Trusteed API env |
| Webhook Secret Version | `trusteed_general/general/webhook_secret_version` | text    | Global  | Increment when rotating the webhook secret. Used in `X-Trusteed-Secret-Version` header                              |
| Connection ID          | `trusteed_general/general/connection_id`          | text    | Website | Assigned by Trusteed after connecting. Identifies this store in webhook delivery                                    |

### Group: Features (`trusteed_general/features`)

| Field                | Config Path                                 | Type   | Scope   | Description                                                                                    |
| -------------------- | ------------------------------------------- | ------ | ------- | ---------------------------------------------------------------------------------------------- |
| Enable WebMCP Bridge | `trusteed_general/features/webmcp_enabled`  | select | Website | Injects storefront JS bridge. Auto-disabled on Hyvä/PWA Studio via `DisableBridgeOnHyva` patch |
| Enable Phase B       | `trusteed_general/features/phase_b_enabled` | select | Global  | Reserved for future embedded SPA. Do not enable                                                |

### Enforcement paths (set programmatically by Setup Wizard)

| Config Path                            | Description                                         |
| -------------------------------------- | --------------------------------------------------- |
| `trusteed/enforcement/failure_mode`    | `observe` or `enforce`                              |
| `trusteed/enforcement/installation_id` | Installation ID returned by Trusteed API on connect |
| `trusteed/enforcement/hmac_secret`     | HMAC secret for signing `POST /v1/rules/evaluate`   |

---

## 3. Database Schema

### Table: `trusteed_webhook_outbox`

Reliable delivery outbox for order events. Entries are created by observers and
drained every minute by the `trusteed_webhook_drain` cron job.

| Column            | Type                        | Nullable | Description                                                                        |
| ----------------- | --------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `id`              | int unsigned AUTO_INCREMENT | No       | Primary key                                                                        |
| `event_id`        | varchar(36) UNIQUE          | No       | UUID v4 event identifier (idempotency key)                                         |
| `event_type`      | varchar(32)                 | No       | `order.created`, `order.fulfilled`, `order.refunded`, `order.payment_failed`       |
| `entity_id`       | int unsigned                | No       | Magento order `entity_id`                                                          |
| `increment_id`    | varchar(32)                 | No       | Magento order increment ID (e.g. `000000001`)                                      |
| `composite_id`    | varchar(64)                 | No       | Composite ID in format `MAG:<increment_id>`                                        |
| `store_view_code` | varchar(32)                 | No       | Store view code at time of event                                                   |
| `payload`         | text                        | No       | Serialized order payload (JSON)                                                    |
| `status`          | varchar(16)                 | No       | `pending`, `delivered`, `dead`                                                     |
| `retry_count`     | int unsigned                | No       | Delivery attempt count. Default: 0                                                 |
| `secret_version`  | int unsigned                | No       | Webhook secret version at time of enqueue                                          |
| `next_attempt_at` | timestamp                   | Yes      | Earliest eligible delivery time (exponential backoff). NULL = eligible immediately |
| `locked_until`    | timestamp                   | Yes      | Lease lock expiry (worker lease mechanism)                                         |
| `locked_by`       | varchar(64)                 | Yes      | Process identifier holding the lease                                               |
| `created_at`      | timestamp                   | No       | Entry creation time                                                                |
| `updated_at`      | timestamp                   | No       | Last modification time (auto-updated)                                              |

**Indexes:**

- `TRUSTEED_WEBHOOK_OUTBOX_EVENT_ID` (UNIQUE) on `event_id`
- `TRUSTEED_WEBHOOK_OUTBOX_STATUS_CREATED_AT` on `(status, created_at)`
- `TRUSTEED_WEBHOOK_OUTBOX_LOCKED_UNTIL` on `locked_until`
- `TRUSTEED_WEBHOOK_OUTBOX_STATUS_NEXT_ATTEMPT` on `(status, next_attempt_at, created_at)`

### Columns added to `sales_order`

| Column                    | Type                   | Description                          |
| ------------------------- | ---------------------- | ------------------------------------ |
| `trusteed_receipt_uri`    | varchar(1024) nullable | TrustReceipt URI. Immutable once set |
| `trusteed_receipt_status` | varchar(16) nullable   | `PENDING`, `ISSUED`, `VERIFIED`      |

---

## 4. Events and Observers

| Magento Event                             | Observer Class                    | Purpose                                                                                                                                     |
| ----------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `sales_order_save_after`                  | `SalesOrderSaveAfter`             | Enqueues `order.created`, `order.fulfilled`, `order.refunded`, `order.cancelled` events to the outbox based on order state transitions      |
| `sales_order_creditmemo_save_after`       | `SalesCreditmemoSaveAfter`        | Enqueues `order.refunded` for partial refunds (full refunds handled via STATE_CLOSED in `sales_order_save_after`)                           |
| `sales_model_service_quote_submit_before` | `CheckoutSubmitBefore`            | Pre-order enforcement: verifies agent token, calls `/v1/rules/evaluate`, applies HITL freeze (R043) or throws `LocalizedException` on BLOCK |
| `sales_order_payment_failed`              | `SalesOrderPaymentFailedObserver` | Enqueues `order.payment_failed` signal for R011 checkout failure tracking                                                                   |
| `sales_order_shipment_save_after`         | `ShipmentSaveAfter`               | Enqueues `order.fulfilled` when a shipment is created                                                                                       |

### Plugin

| Plugin Class              | Target                                       | Method | Type   | Purpose                                                                                       |
| ------------------------- | -------------------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------------- |
| `OrderRepositoryPlugin`   | `Magento\Sales\Api\OrderRepositoryInterface` | `get`  | after  | Loads `trusteed_receipt_uri` and `trusteed_receipt_status` extension attributes on order load |
| `OrderExtensionAttribute` | `Magento\Sales\Api\OrderRepositoryInterface` | `save` | around | Persists extension attributes on order save                                                   |

---

## 5. Cron Jobs

Both jobs are in the `default` cron group and run every minute.

### `trusteed_webhook_drain`

**Class:** `Trusteed\AgenticCommerce\Cron\DrainOutbox`

Processes the `trusteed_webhook_outbox` table:

1. Selects entries where `status = 'pending'` AND (`next_attempt_at IS NULL` OR `next_attempt_at <= NOW()`) AND (`locked_until IS NULL` OR `locked_until < NOW()`)
2. Acquires a lease (`locked_by = <worker-id>`, `locked_until = NOW() + 60s`)
3. POSTs payload to `POST /api/v1/webhook/magento/<connectionId>` with signature `X-Trusteed-Signature: t=<ts>,s=<hmac-sha256>`
4. On success (2xx): sets `status = 'delivered'`
5. On failure: increments `retry_count` and sets an exponential `next_attempt_at` — `2s × 2^retry_count`, capped at 3600 s, ±20% jitter (see §11)
6. After 8 retries (`OutboxRepository::MAX_RETRIES`): sets `status = 'dead'`

### `trusteed_lag_heartbeat`

**Class:** `Trusteed\AgenticCommerce\Cron\EmitLagHeartbeat`

Every minute, calculates the age of the oldest `pending` outbox entry and reports
it to `POST /api/v1/internal/magento/lag-heartbeat` so the Trusteed dashboard can alert on
delivery lag.

---

## 6. ACL Resources

| Resource ID                        | Title                      | Notes                                                                |
| ---------------------------------- | -------------------------- | -------------------------------------------------------------------- |
| `Trusteed_AgenticCommerce::config` | Trusteed Agentic Commerce  | Grants access to all Trusteed admin pages                            |
| `Trusteed_AgenticCommerce::token`  | Trusteed Embed Token Relay | Grants access to the token issue controller used by the Setup Wizard |

To grant a custom role access to Trusteed pages, add `Trusteed_AgenticCommerce::config`
in **System → Permissions → User Roles → [Role] → Role Resources**.

---

## 7. Admin Routes

**Front name:** `trusteed` (defined in `etc/adminhtml/routes.xml`)

| URL Pattern                       | Controller                                   | Description               |
| --------------------------------- | -------------------------------------------- | ------------------------- |
| `/trusteed/dashboard/index`       | `Controller/Adminhtml/Dashboard/Index`       | Dashboard SPA host        |
| `/trusteed/health/index`          | `Controller/Adminhtml/Health/Index`          | Store health SPA          |
| `/trusteed/ventas/index`          | `Controller/Adminhtml/Ventas/Index`          | Agent sales SPA           |
| `/trusteed/agentes/index`         | `Controller/Adminhtml/Agentes/Index`         | Agent directory SPA       |
| `/trusteed/reglas/index`          | `Controller/Adminhtml/Reglas/Index`          | Rules SPA                 |
| `/trusteed/pagos/index`           | `Controller/Adminhtml/Pagos/Index`           | Payment methods SPA       |
| `/trusteed/seguridad/index`       | `Controller/Adminhtml/Seguridad/Index`       | Security SPA              |
| `/trusteed/ajustes/index`         | `Controller/Adminhtml/Ajustes/Index`         | Settings SPA              |
| `/trusteed/setup/wizard`          | `Controller/Adminhtml/Setup/Wizard`          | Setup Wizard              |
| `/trusteed/setup/save`            | `Controller/Adminhtml/Setup/Save`            | Setup Wizard save action  |
| `/trusteed/setup/introspecttoken` | `Controller/Adminhtml/Setup/IntrospectToken` | Token introspection AJAX  |
| `/trusteed/token/issue`           | `Controller/Adminhtml/Token/Issue`           | Issues embed token (POST) |
| `/trusteed/support/submit`        | `Controller/Adminhtml/Support/Submit`        | Support form submit       |

---

## 8. Frontend Routes

**Front name:** `nlweb` (defined in `etc/frontend/routes.xml` — the route `id` and
`frontName` are both `nlweb`; there is no `trusteed` frontend route)

| URL Pattern                    | Controller                         | Description                             |
| ------------------------------ | ---------------------------------- | --------------------------------------- |
| `/nlweb/products/index`        | `Controller/Products/Index`        | NLWeb product search endpoint (proxied) |
| `/nlweb/wellknown/mcpmanifest` | `Controller/Wellknown/McpManifest` | Returns the MCP manifest JSON           |

`/.well-known/mcp.json` is the canonical manifest URL and the one agents use. It is
**not** reached through the `nlweb` frontName: it is matched by
`Router/WellKnownRouter.php`, a custom router registered with `sortOrder=10` in
`etc/frontend/di.xml`, which dispatches the `Controller/Wellknown/McpManifest` action
directly. The `/nlweb/wellknown/mcpmanifest` path above is the same controller reached
through the ordinary frontName, and exists only as a fallback for webservers that
cannot be made to rewrite the dotted `/.well-known/` path.

---

## 9. Services

### `EnforcementClient`

**Class:** `Trusteed\AgenticCommerce\Service\EnforcementClient`

HTTP client for the Trusteed rule evaluation API.

| Method                                                         | Returns                                    | Description                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `evaluate(array $payload): string`                             | `ALLOW` \| `BLOCK` \| `ESCALATE`           | Calls `POST /v1/rules/evaluate`. On transport error, returns `BLOCK` (enforce mode) or `ALLOW` (observe mode) |
| `getDidResolver(string $merchantId): array`                    | `array<{did, publicKeyJwk}>`               | Fetches agent DID → public key map from the snapshot. Empty array on failure                                  |
| `getRules(string $merchantId): array`                          | `array<{ruleCode, params, mode, enabled}>` | Fetches rule configuration from the snapshot                                                                  |
| `consumeNonce(string $agentDid, string $jti, int $exp): array` | `{outcome, reason, httpStatus}`            | Registers a single-use nonce for replay protection                                                            |

**Signature format** (Stripe-style):

```
X-Trusteed-Signature: t=<unix-timestamp>,s=<hmac-sha256-hex>
```

where the HMAC is computed over `"<timestamp>.<rawBody>"`.

### `AgentTokenVerifier`

**Class:** `Trusteed\AgenticCommerce\Service\AgentTokenVerifier`

Verifies Ed25519-signed agent JWT tokens:

1. Parses JWT header/payload (no library dependency — raw base64url decode)
2. Looks up the agent's public key from the snapshot (`getDidResolver`)
3. Verifies the Ed25519 signature using `sodium_crypto_sign_verify_detached` (or `paragonie/sodium_compat` fallback)
4. Validates `exp`, `iat`, `iss`, `aud` claims
5. Calls `consumeNonce` for replay protection

### `CartSignals`

**Class:** `Trusteed\AgenticCommerce\Service\CartSignals`

Extracts cart-level signals from a Magento quote for inclusion in the
`/v1/rules/evaluate` payload:

- Cart total
- Item count
- Product category IDs
- Agent metadata from quote custom attributes

### `AgentHistoryFetcher`

**Class:** `Trusteed\AgenticCommerce\Service\AgentHistoryFetcher`

Fetches the agent's order history from the Trusteed API to populate the
`/v1/rules/evaluate` `agentHistory` context field.

---

## 10. Enforcement Engine

### Flow

```
sales_model_service_quote_submit_before
    ↓
CheckoutSubmitBefore::execute()
    ↓
Is this an agent order? (quote has amcp_agent_token)
    ↓ YES
AgentTokenVerifier::verify()
    ↓ VALID / INVALID / UNVERIFIED
EnforcementClient::evaluate({
    merchantId, agentId, orderContext,
    platform: "magento",
    installationId, timestamp
})
    ↓
ALLOW  → continue (order is created normally)
BLOCK  → throw LocalizedException (order is NOT created)
ESCALATE → freeze quote (is_active=0), stamp HITL flags, throw LocalizedException
```

### ESCALATE (R043 HITL)

When `evaluate()` returns `ESCALATE`:

1. `R043HitlGate::buildFreezePayload()` extracts rule code, reason, and evaluation ID
2. The quote is stamped with custom metadata:
   - `amcp_hitl_pending = 1`
   - `amcp_hitl_rule_code = <ruleCode>`
   - `amcp_hitl_reason = <reason>`
   - `amcp_hitl_evaluation_id = <evaluationId>`
3. Quote `is_active` is set to `0` (prevents customer-facing recapture)
4. A `LocalizedException` is thrown — Magento does not create the order
5. The intent appears in the Trusteed dashboard for merchant review

### Failure mode

| Config value | Transport error behavior                                 |
| ------------ | -------------------------------------------------------- |
| `enforce`    | Returns `BLOCK` — agent order is rejected                |
| `observe`    | Returns `ALLOW` — agent order proceeds, violation logged |

---

## 11. Webhook Outbox

### Delivery payload format

```json
{
  "eventId": "<uuid-v4>",
  "eventType": "order.created",
  "merchantId": "<merchant-id>",
  "connectionId": "<connection-id>",
  "compositeOrderId": "MAG:000000001",
  "storeViewCode": "default",
  "secretVersion": 1,
  "order": {
    "incrementId": "000000001",
    "entityId": 1,
    "status": "pending",
    "grandTotal": "99.99",
    "currency": "USD",
    "items": [...]
  },
  "timestamp": "2026-06-18T10:00:00Z"
}
```

### Signature header

```
X-Trusteed-Signature: t=<unix>,s=<hmac-sha256>
X-Trusteed-Secret-Version: 1
```

HMAC input: `"<timestamp>.<rawBody>"`

### Retry schedule

Exponential backoff, computed by `Cron/DrainOutbox.php::backoffDelaySeconds()`:

```
delay = min(2 × 2^retry_count, 3600) ± 20% jitter
```

The base is **2 seconds** (`BACKOFF_BASE_SECONDS`), the cap **3600 seconds**
(`BACKOFF_MAX_SECONDS`), and symmetric ±20% jitter (`BACKOFF_JITTER_RATIO = 0.20`) is
applied to avoid thundering-herd retries across pods. The delay never falls below the
2-second base. The cron does not sleep; it stamps `next_attempt_at` and returns.

| Attempt (`retry_count`) | Nominal delay before next attempt |
| ----------------------- | --------------------------------- |
| 0                       | 2 s                               |
| 1                       | 4 s                               |
| 2                       | 8 s                               |
| 3                       | 16 s                              |
| ...                     | doubles each time                 |
| 11 and beyond           | 3600 s (capped)                   |

After **8 attempts** (`OutboxRepository::MAX_RETRIES = 8`) the row is marked `dead`.
Dead entries are not retried. Each drain run processes at most 50 rows
(`BATCH_SIZE`) and stops after 55 seconds (`MAX_RUNTIME_SECONDS`).

---

## 12. Agent Token Verification

Agent tokens are JWTs signed with Ed25519 (algorithm `EdDSA`, curve `Ed25519`).

### Token claims

All of `iss`, `aud`, `exp`, `iat`, `nonce` and `jti` are **mandatory**. A token that
omits any of them is rejected as `invalid` (see `Service/AgentTokenVerifier.php`).

| Claim        | Type           | Validated as                                                                                 |
| ------------ | -------------- | -------------------------------------------------------------------------------------------- |
| `iss`        | string         | Agent DID. Must equal the DID derived from the header `kid` — key-confusion guard             |
| `aud`        | string         | Must be the literal `trusteed`. (This is **not** the merchant ID)                             |
| `merchantId` | string         | Optional. When present, must match the store's configured Merchant ID                        |
| `exp`        | unix timestamp | Expiry. Rejected once `now > exp + 30` (30-second clock-skew tolerance)                      |
| `iat`        | unix timestamp | Issued at. Rejected once `now - iat > 330` (`MAX_AGE_SECONDS`)                                |
| `nonce`      | string         | Mandatory, 16–64 characters                                                                  |
| `jti`        | string         | Single-use identifier, must match `/^[A-Za-z0-9_-]{16,128}$/`; missing → `missing_jti`        |

`sub` and `platform` are not read by the verifier. The maximum token age is therefore
**330 seconds** from `iat`, not 300.

### Verification outcomes

| Outcome      | Meaning                                                 |
| ------------ | ------------------------------------------------------- |
| `VERIFIED`   | Signature valid, claims valid, nonce not replayed       |
| `INVALID`    | Signature invalid, token expired, or nonce already used |
| `UNVERIFIED` | No token present or token could not be parsed           |

### Public key resolution

Agent public keys are fetched from the enforcement snapshot
(`GET /v1/rules/snapshot/<merchantId>`) as a JWK set. The snapshot is cached
in-memory for the duration of the request to avoid repeated API calls.

---

## 13. MCP Manifest

**Endpoint:** `GET /.well-known/mcp.json`
**Controller:** `Trusteed\AgenticCommerce\Controller\Wellknown\McpManifest`
**Builder:** `Trusteed\AgenticCommerce\Model\Manifest\Builder`

The manifest tells AI agents what capabilities your store exposes. It is signed
with an Ed25519 key provisioned by Trusteed.

### Manifest fields

```json
{
  "schema_version": "1.0",
  "issuer": "https://api.trusteed.xyz",
  "merchant_id": "<merchant-id>",
  "store_views": [
    { "code": "default", "base_url": "https://your-store.com" },
    { "code": "fr", "base_url": "https://your-store.fr" }
  ],
  "capabilities": ["checkout", "catalog_search", "order_status"],
  "updated_at": "<iso8601>",
  "signature": {
    "jws": "<detached-jws-compact>",
    "kid": "<key-id>",
    "alg": "EdDSA",
    "signed_at": "<iso8601>"
  }
}
```

Notes on the actual shape:

- `capabilities` is a flat **array of three strings** — `checkout`, `catalog_search`,
  `order_status` — not an object of feature flags, and it carries no payment-method list.
- `signature` is an **object** (`jws` / `kid` / `alg` / `signed_at`), not a bare JWS string.
- `issuer` is the configured Trusteed API base URL. There are no `store_url`,
  `connection_id`, `platform`, `mcp_endpoint` or `issued_at` fields.
- `store_views[]` lists every published store view with its base URL, so agents can do
  longest-prefix matching across multiple domains.
- The `signed_payload` returned by the backend is served **verbatim**: the backend is
  authoritative for `issuer`, `merchant_id` and `capabilities` (ADR-014), and serving its
  exact bytes is what makes the detached JWS verify against what the agent received.
- `schema_version` is the key `bin/magento trusteed:check-webserver` looks for when
  deciding whether the endpoint is serving a real manifest.

---

## 14. Extension Attributes

The module adds extension attributes to `Magento\Sales\Api\Data\OrderInterface`:

| Attribute                 | Type   | Description                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| `trusteed_receipt_uri`    | string | TrustReceipt URI                                 |
| `trusteed_receipt_status` | string | Receipt status (`PENDING`, `ISSUED`, `VERIFIED`) |

Defined in `etc/extension_attributes.xml`. Loaded/saved via
`Plugin/Sales/OrderExtensionAttribute.php` and `Plugin/Repository/OrderRepositoryPlugin.php`.

---

## 15. API Endpoints Called

The module makes outbound HTTPS calls to the Trusteed API. All calls require
HTTPS and are validated by `ApiBaseUrlValidator` (SSRF guard).

| Method | Path                                                        | When                                      | Auth                          | Timeout |
| ------ | ----------------------------------------------------------- | ----------------------------------------- | ----------------------------- | ------- |
| `POST` | `/v1/rules/evaluate`                                        | On every checkout attempt                 | `X-Trusteed-Signature` (HMAC) | 5 s     |
| `GET`  | `/v1/rules/snapshot/<merchantId>`                           | Per-request cache miss                    | `X-Trusteed-Signature` (HMAC) | 5 s     |
| `POST` | `/v1/agent-events/nonce-consume`                            | After token verification                  | `X-Trusteed-Signature` (HMAC) | 5 s     |
| `GET`  | `/.well-known/jwks.json`                                    | Snapshot signature verification           | none (public keys)            | 5 s     |
| `POST` | `/api/v1/webhook/magento/<connectionId>`                    | Outbox delivery (order/shipment/refund)   | `X-Trusteed-Signature` (HMAC) | 10 s    |
| `POST` | `/api/v1/internal/magento/lag-heartbeat`                    | Every minute (lag monitor cron)           | `X-Internal-Auth` (HMAC)      | 10 s    |
| `POST` | `/api/v1/internal/magento/event`                            | Install-event data patch                  | `X-Internal-Auth` (HMAC)      | 10 s    |
| `POST` | `/api/v1/internal/magento/manifest/sign`                    | Manifest build (remote signing, ADR-050)  | `X-Internal-Auth` (HMAC)      | 5 s     |
| `POST` | `/api/v1/enforcement/capabilities`                          | Once per capability-set version           | `X-Internal-Auth` (HMAC)      | 3 s     |
| `POST` | `/api/v1/auth/introspect`                                   | Setup Wizard token introspection          | bearer token under test       | 5 s     |
| `POST` | `/platform/magento/validate-connect-token`                  | Setup Wizard connect                      | connect token                 | 5 s     |
| `GET`  | `/api/v1/trust/overview?merchantId=<id>`                    | Health tab render                         | `X-Trusteed-Signature` (HMAC) | 6 s     |
| `POST` | `/api/v1/coupon-attempts-failed`                            | Invalid coupon observer                   | `X-Trusteed-Signature` (HMAC) | 1.5 s   |
| `POST` | `/api/v1/checkout-failures`                                 | Payment-failed observer                   | `X-Trusteed-Signature` (HMAC) | 1.5 s   |
| `POST` | `/v1/embed/magento/issue-token`                             | Admin SPA token issuance                  | `X-Embed-Magento-Secret` (per-connection `embed_secret`) | 10 s    |
| `POST` | `/v1/embed/support/report`                                  | Admin "Send diagnostics"                  | `Authorization: Bearer <integration_token>` + `X-Embed-Source` | 10 s    |
| `GET`  | `/api/v1/checkout-failures/count`                           | Agent history signals                     | `X-Trusteed-Signature` (HMAC) | 3 s     |
| `GET`  | `/api/v1/agents/<agentIdHash>/cross-merchant-abuse-check`   | Agent history signals                     | `X-Trusteed-Signature` (HMAC) | 3 s     |
| `GET`  | `/api/v1/merchants/<merchantId>/disputes/count`             | Agent history signals                     | `X-Trusteed-Signature` (HMAC) | 3 s     |
| `GET`  | `/api/v1/health`                                            | `ApiBaseUrlValidator` reachability probe   | none                          | 5 s     |

**Timeouts are not uniform** — they differ per caller, as listed above:
`EnforcementClient` and `ApiBaseUrlValidator` use 5 s, `Manifest\Builder` 5 s
(`SIGN_TIMEOUT_SECONDS`), `Webhook\SignaturePublisher` 10 s (`TIMEOUT_SECONDS`, and it
also serves the heartbeat and install-event calls), `Adminhtml\Token\Issue` and
`Adminhtml\Support\Submit` 10 s, `Block\Adminhtml\Health\Tab` 6 s
(`SCORE_HTTP_TIMEOUT`), `AgentHistoryFetcher` 3 s (`HTTP_TIMEOUT_SECONDS`), and
`CapabilitiesReporter` 3 s. The two fire-and-forget observers are the tightest: 1500 ms
total and 800 ms to connect (`CURLOPT_TIMEOUT_MS` / `CURLOPT_CONNECTTIMEOUT_MS`), so a
slow backend cannot delay a checkout. `ApiBaseUrlValidator` additionally caps connect
time at 5 s (`CONNECT_TIMEOUT_SECONDS`).

The two `/v1/embed/*` routes use **different secrets, deliberately**: token issuance
sends the per-connection `embed_secret` (provisioned by the onboarding exchange and
validated against the backend SecretVault by `connection_id`), while the support report
sends the `integration_token` as a bearer. They are not interchangeable.

TLS peer verification is always enabled (`CURLOPT_SSL_VERIFYPEER=true`,
`CURLOPT_SSL_VERIFYHOST=2`) and HTTP redirects are disabled
(`CURLOPT_FOLLOWLOCATION=false`). `Manifest\Builder` additionally enforces a closed
host allowlist before sending the internal HMAC secret anywhere.

---

## 16. Security Model

### SSRF protection

`Model/Security/ApiBaseUrlValidator.php` validates the admin-configurable
`api_base_url` against an allowlist of known Trusteed API hostnames. Any attempt
to change the API URL to a non-allowlisted host is rejected before any signed
payload is sent.

### TLS hardening

All outbound curl calls enforce:

- HTTPS scheme only (`CURLPROTO_HTTPS`)
- TLS peer and host verification
- No redirect following

### HMAC signing

All outbound API calls and webhook deliveries are signed with HMAC-SHA256 in
Stripe-style format: `t=<timestamp>,s=<hex>`. The signing input is
`"<timestamp>.<rawBody>"`.

### Webhook secret versioning

The `webhook_secret_version` config field is included in every delivery header.
Rotate secrets by:

1. Updating the secret in Trusteed dashboard
2. Pasting the new secret into Magento config
3. Incrementing `Webhook Secret Version`

Trusteed accepts the previous version for a 5-minute grace window during rotation.

### Replay protection

Agent tokens include a `jti` (JWT ID) claim. The module calls
`POST /v1/agent-events/nonce-consume` after verifying each token. A 409 response
indicates replay — the token is treated as `INVALID`.

---

## 17. Console Commands

| Command                    | Class                                | Description                                                                                      |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `trusteed:check-webserver` | `Console/Command/CheckWebserver.php` | Fetches `/.well-known/mcp.json` over the store's unsecure base URL and confirms the response is a real manifest (checks for a top-level `schema_version`). On failure prints the Nginx and Apache rewrite snippets |
| `trusteed:webhook:status`  | `Console/Command/WebhookStatus.php`  | Prints outbox statistics: pending, delivered, dead counts and oldest pending entry age           |

Both names are registered in `etc/di.xml` under
`Magento\Framework\Console\CommandListInterface`.

Usage:

```bash
bin/magento trusteed:check-webserver
bin/magento trusteed:webhook:status
```

---

## 18. Data Patches

| Patch Class                  | Purpose                                                                                                                                                                                                                                  | Idempotent |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `AddAgenticVisibleAttribute` | Adds `is_agentic_visible` product EAV attribute (boolean, default 1). Spec-050 FR-A-013 catalog filtering only — `Controller/Products/Index.php` serves agents just the products flagged `1`. It is **not** a rule: no CEL rule reads it | Yes        |
| `DisableBridgeOnHyva`        | Detects Hyvä or PWA Studio themes and sets `trusteed_general/features/webmcp_enabled = 0` to prevent storefront JS conflicts                                                                                                             | Yes        |
| `EmitInstallEvent`           | Calls `POST /api/v1/internal/magento/event` to log the installation timestamp and Magento version in the Trusteed dashboard                                                                                                              | Yes        |
| `ReportSignalCapabilities`   | Reports which cart signals this installation can project, via `POST /api/v1/enforcement/capabilities`. Without it a rule whose signal never arrives returns `NO_SIGNAL` on every checkout — it passes silently while showing as ENFORCE   | Yes        |

---

## 19. Di.xml Wiring

Key dependency injection entries:

```xml
<!-- EnforcementClient receives the SSRF validator via DI -->
<type name="Trusteed\AgenticCommerce\Service\EnforcementClient">
    <arguments>
        <argument name="urlValidator" xsi:type="object">
            Trusteed\AgenticCommerce\Model\Security\ApiBaseUrlValidator
        </argument>
    </arguments>
</type>

<!-- Console commands -->
<type name="Magento\Framework\Console\CommandListInterface">
    <arguments>
        <argument name="commands" xsi:type="array">
            <item name="trusteed_check_webserver" xsi:type="object">
                Trusteed\AgenticCommerce\Console\Command\CheckWebserver
            </item>
            <item name="trusteed_webhook_status" xsi:type="object">
                Trusteed\AgenticCommerce\Console\Command\WebhookStatus
            </item>
        </argument>
    </arguments>
</type>
```

`Model\Webhook\OutboxRepository` is injected as a **concrete class**. There is no
`OutboxRepositoryInterface` and no `<preference>` for it — depend on the class.

See `etc/di.xml` and `etc/frontend/di.xml` for full wiring.

---

## 20. Logging

All module log entries are prefixed with `[trusteed]` and written to
`var/log/system.log` (Magento default logger) at the following levels:

| Level     | Example messages                                                                     |
| --------- | ------------------------------------------------------------------------------------ |
| `debug`   | Snapshot cache hit, nonce consume ACCEPTED                                           |
| `info`    | Outbox enqueue success, webhook delivered                                            |
| `warning` | API timeout, SSRF guard rejection, HMAC verification mismatch, evaluate HTTP non-2xx |
| `error`   | Fatal configuration missing, outbox drain failure after max retries                  |

To enable debug logging:

```bash
bin/magento config:set dev/debug/debug_logging 1
```

Or set `MAGE_MODE=developer` in your environment.

### Log grep shortcuts

```bash
# All Trusteed entries
grep '\[trusteed\]' var/log/system.log

# Outbox delivery problems only
grep '\[trusteed\] webhook\|deliver\|dead\|retry' var/log/system.log

# Enforcement decisions
grep '\[trusteed\] evaluate\|BLOCK\|ALLOW\|ESCALATE' var/log/system.log

# Agent token issues
grep '\[trusteed\] token\|nonce\|verify\|INVALID\|REPLAY' var/log/system.log
```
