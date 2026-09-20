**English** | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

# Trusteed Agentic Commerce for Magento 2

AI agents are a new kind of online shopper. With Trusteed, the network that connects businesses and agents, they can buy from your store on your terms.

- Set your business rules: who can buy, up to what amount, which categories you don't offer to agents, price limits, stock levels that protect you from fraudulent agents, and more.
- Get signed receipts. Every transaction produces a cryptographically signed, tamper-evident receipt you can use as evidence of the purchase if there's a dispute. Aligned with eIDAS (EU) and eSIGN (USA).
- See what agents do: how much they spend, what they buy and how often.
- Block agents that look dangerous or cause problems.
- Accept purchases in digital currencies through the X402 protocol.
- Let agents and merchants trade directly, peer to peer.

## Screenshots

| Dashboard | Agent Sales | Business Rules |
|-----------|------------|----------------|
| ![Dashboard](docs/screenshots/screenshot-02-dashboard.png) | ![Sales](docs/screenshots/screenshot-04-ventas.png) | ![Rules](docs/screenshots/screenshot-05-rules.png) |

| Agents | Rules & Toggles | Trust Receipts |
|--------|----------------|----------------|
| ![Agents](docs/screenshots/screenshot-06-agentes.png) | ![Rules Detail](docs/screenshots/screenshot-07-rules-detail.png) | ![Trust Receipts](docs/screenshots/screenshot-08-trust-receipts.png) |

| Setup Wizard | Setup Config |
|-------------|-------------|
| ![Setup](docs/screenshots/screenshot-01-setup-wizard.png) | ![Config](docs/screenshots/screenshot-03-setup-wizard-config.png) |

| AI Sales — Automated receipts list |
|--------------------------------------|
| ![Receipts list](docs/screenshots/screenshot-09-receipts-list.png) |

Every agent-originated order gets a signed trust receipt. It's listed under **Trusteed → Mis ventas → Recibos de venta** with its verification status and receipt URI. From there you can open the public verifier at `receipts.trusteed.xyz`, or paste the JWS directly into the **Trust Receipts** tool (see above) to check it.

## Features

- MCP endpoint at `/.well-known/mcp-manifest.json`, discovered automatically by AI agent platforms.
- Webhook outbox: reliable delivery of orders, shipments and refunds to the Trusteed backend, with automatic retry and backoff.
- Agent token verification: validates the agent's identity on every checkout request.
- Enforcement gate (HITL): configurable human-in-the-loop approval for high-value agent orders.
- Trust Receipts: every agent transaction produces a cryptographically signed receipt (Ed25519).
- Admin dashboard: an SPA showing agent sessions, sales, rules, and health status.
- Audit log: every agent interaction is recorded with its identity and verdict.

## Compatibility

| Magento version | PHP | Status |
|-----------------|-----|--------|
| Open Source 2.4.7 | 8.2, 8.3 | ✅ Supported |
| Open Source 2.4.8 | 8.2, 8.3 | ✅ Supported |
| Adobe Commerce 2.4.7 | 8.2, 8.3 | ✅ Supported |
| Adobe Commerce 2.4.8 | 8.2, 8.3 | ✅ Supported |

## Requirements

- Magento Open Source or Adobe Commerce 2.4.7+
- PHP 8.2 or 8.3
- A Trusteed account ([sign up free at trusteed.xyz](https://trusteed.xyz))

## Installation

### Via Composer (recommended)

```bash
composer require trusteed/agentic-commerce-magento
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Manual upload

1. **Download the installable `.zip`** from the latest GitHub Release:
   [**⬇ trusteed-agentic-commerce-magento-1.1.1.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.1.1.zip)
   or browse all versions at the [Releases page](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Extract to `app/code/Trusteed/AgenticCommerce/`
3. Run the commands above from your Magento root

## Configuration

1. Log in to your Magento **Admin Panel**
2. Go to **Trusteed → Configuración** (the Setup Wizard)
3. Click **Conectar con Trusteed →**. The wizard tests connectivity and registers your store
4. Select the store views you want to expose to AI agents
5. Click **Guardar**

### Advanced settings

Navigate to **Stores → Configuration → Trusteed → Agentic Commerce**:

| Setting | Default | Description |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Trusteed backend endpoint |
| Webhook secret version | `1` | Rotate after key compromise |
| HITL enforcement mode | `observe` | `observe` logs only; `enforce` blocks orders above threshold |
| HITL amount threshold | `500.00` | Orders above this value require human approval |
| Agent token TTL | `300` | Maximum age (seconds) of a valid agent token |

## Admin pages

After installation a **Trusteed** menu appears in the Magento admin sidebar:

| Page | Path | Description |
|------|------|-------------|
| Dashboard | Trusteed → Dashboard | Real-time agent session overview |
| Sales | Trusteed → Ventas | Agent-originated orders and receipts |
| Rules | Trusteed → Reglas | Enforcement rules (CEL-based) |
| Agents | Trusteed → Agentes | Connected agent identities |
| Security | Trusteed → Seguridad | Audit log and anomaly alerts |
| Settings | Trusteed → Ajustes | Module configuration |

## Uninstallation

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
composer remove trusteed/agentic-commerce-magento
```

To remove database tables:

```bash
bin/magento setup:db-declaration:generate-whitelist --module-name=Trusteed_AgenticCommerce
# Then manually drop: trusteed_webhook_outbox
# And columns on sales_order: trusteed_receipt_uri, trusteed_receipt_status
```

## Changelog

### 1.1.1

- Fix: the "My Sales → Ventas" page mounted a static placeholder (Dashboard block + `ventas.phtml`) that never reached the actual TrustReceipt list. It now mounts the real admin SPA in the "Mis Ventas" section, same as Rules and Agents.
- Admin SPA bundle rebuilt.

### 1.1.0

- Fix: checkout enforcement was skipped entirely for organic (non-agent) checkouts. Merchant rules such as maximum order amount, blocked countries, and business-hours restrictions never ran unless an agent DID was present. These rules now apply to every checkout regardless of agent presence.
- Added: an offline safety-valve evaluator that enforces the same universal merchant rules locally when the remote rules-evaluation API is unreachable, instead of only falling back to a blanket allow/block policy.
- Security fix: the enforcement snapshot fetched from the Trusteed backend is now cryptographically verified (Ed25519 signature check against the published JWKS) before it is trusted, instead of being decoded without verification.
- Security fix: `EnforcementClient` no longer fabricates a placeholder `dev-bypass` signature when the HMAC secret is not yet configured. Requests now fail safely open (`ALLOW`, matching the existing "unconfigured connector never blocks" posture), with a distinct log line so ops can tell an installation mid-setup apart from a fully unconfigured one.
- Fixed the support "Send diagnostics" endpoint calling the wrong backend path (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Initial release
- MCP manifest endpoint
- Webhook outbox with retry/backoff
- Agent token verification (Ed25519)
- HITL enforcement gate
- Admin SPA dashboard

## Support

- Support email: support@trusteed.xyz
- GitHub issues: [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## License

Open Software License 3.0 (OSL-3.0). See [LICENSE](LICENSE) for full text.
