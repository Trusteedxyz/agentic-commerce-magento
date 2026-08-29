**English** | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

# Trusteed Agentic Commerce for Magento 2

Enable new online shoppers, AI agents, to make purchases in your store securely and reliably thanks to Trusteed: the network that fosters trust between businesses and agents.

- **Set your business rules**: who you allow to buy, up to what amount, which categories you don't want to offer to agents, set price limits, maintain stock levels to protect yourself against potential fraudulent agents, and more.
- **Tamper-proof receipts**: we generate electronically signed and cryptographically tamper-proof receipts that serve as proof of the actual transaction in case of any dispute. Compatible with eIDAS (EU, UK) and eSIGN (USA) regulations.
- **Agent analytics**: view statistics on agent purchases — how much they spend, what products they buy, and how often.
- **Agent blocking**: block potentially dangerous or problematic agents.
- **Digital currencies**: the Trusteed network settles agent payments over the x402 protocol. This
  module does not process those payments itself — your Magento checkout stays exactly as it is today;
  the rails are configured on the Trusteed side and reported back to the admin panel.
- **Agent-to-merchant transactions**: agents transact against your store through the Trusteed
  network, which carries the identity, rules and receipt for each order. Settlement still runs
  through your existing Magento payment methods.

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

Every agent-originated order gets a signed trust receipt, listed under **Trusteed → My sales → Recibos de venta** with its verification status and receipt URI. From the list you can open a receipt's detail to read its fields and copy the raw JWS. Standalone public verification of an arbitrary JWS does not have a dedicated endpoint yet.

## Features

- **MCP endpoint** at `/.well-known/mcp.json` — discovered automatically by AI agent platforms
- **Webhook outbox** — reliable order/shipment/refund delivery to the Trusteed backend with automatic retry and backoff
- **Agent token verification** — validates agent identity on every checkout request
- **Enforcement gate (HITL)** — when the backend's R043 rule fires, the order is held for human approval instead of being submitted
- **Trust Receipts** — every agent transaction produces a cryptographically signed receipt (Ed25519)
- **Admin dashboard** — SPA showing agent sessions, sales, rules, and health status
- **Audit log** — every agent interaction recorded with identity and verdict

## Documentation

- [Installation Guide](docs/INSTALLATION_GUIDE.md) ([ES](docs/INSTALLATION_GUIDE_ES.md)) — requirements, install, connect, verify, troubleshoot
- [User Guide](docs/USER_GUIDE.md) ([ES](docs/USER_GUIDE_ES.md)) — day-to-day use of the admin panel and business rules
- [Reference Manual](docs/REFERENCE_MANUAL.md) ([ES](docs/REFERENCE_MANUAL_ES.md)) — endpoints, config paths, CLI commands, data model

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
- A Trusteed account — [sign up free at trusteed.xyz](https://trusteed.xyz)

## Installation

### Via Composer (from GitHub, no Packagist listing yet)

This package is **not published on Packagist yet**, so Composer cannot resolve it by
name alone. First add the repository to the `composer.json` of your Magento project:

```json
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/Trusteedxyz/agentic-commerce-magento" }
  ]
}
```

Then install it:

```bash
composer require trusteed/agentic-commerce-magento:^1.2
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Manual upload

1. **Download the installable `.zip`** from the
   [**⬇ latest GitHub Release**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest)
   — the attached asset is named `trusteed-agentic-commerce-magento-<version>.zip`.
   All published versions are listed on the [Releases page](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Extract to `app/code/Trusteed/AgenticCommerce/`
3. Run the `bin/magento` commands above from your Magento root

## Configuration

1. Log in to your Magento **Admin Panel**
2. Go to **Trusteed → Configuración** (the setup wizard)
3. Enter your **API Key** from [trusteed.xyz/dashboard/settings](https://trusteed.xyz/dashboard/settings)
4. Select the store views you want to expose to AI agents
5. Click **Save & Verify** — the wizard tests connectivity and registers your store

### Advanced settings

Navigate to **Stores → Configuration → Trusteed → Agentic Commerce**:

**API Connection** (`trusteed_general/general`):

| Setting | Description |
|---------|-------------|
| API Base URL | Trusteed backend endpoint, e.g. `https://api.trusteed.xyz` |
| Merchant ID | Your merchant identifier |
| Integration Token | Encrypted. Authenticates this store against the Trusteed API |
| Webhook Secret | Encrypted. Verifies inbound webhook signatures |
| Internal HMAC Secret | Encrypted. Signs internal heartbeat/admin calls (`X-Internal-Auth`, HMAC-SHA256); provisioned by Trusteed ops |
| Webhook Secret Version | Increment when rotating the webhook secret |
| Connection ID | Issued by Trusteed after the store is connected; identifies this store in webhook delivery |

**Features** (`trusteed_general/features`):

| Setting | Description |
|---------|-------------|
| Enable WebMCP Bridge | Injects the storefront JavaScript bridge. Auto-disabled on Hyvä / PWA Studio themes |
| Enable Phase B (Embedded SPA) | Reserved for a future release — leave off unless Trusteed support tells you otherwise |

Enforcement behaviour (including the R043 human-in-the-loop gate) is not configured here: it is
driven by the rules you set in **Trusteed → Mis Reglas** and by the signed rule snapshot the backend
serves. Agent tokens are accepted for a maximum age of 330 seconds (plus a 30-second tolerance on
`exp`); this window is fixed in the connector, not a setting.

## Admin Pages

After installation a **Trusteed** menu appears in the Magento admin sidebar:

| Page | Route | Description |
|------|-------|-------------|
| Home | `trusteed/dashboard` | Agent session and activity overview |
| How is my store doing? | `trusteed/health` | Connection health and trust score |
| My sales | `trusteed/ventas` | Agent-originated orders and their trust receipts |
| Who I'm selling to | `trusteed/agentes` | Agent identities seen by your store |
| My Rules | `trusteed/reglas` | Business rules applied at checkout |
| Payment Methods | `trusteed/pagos` | Payment rails reported by Trusteed |
| Security | `trusteed/seguridad` | Audit log and anomaly alerts |
| Settings | `trusteed/ajustes` | Module configuration |
| Setup Wizard | `trusteed/setup/wizard` | Setup wizard (connect / reconnect the store) |

Menu labels are sourced in English (`etc/adminhtml/menu.xml`) and translated per-locale via
`i18n/{en_US,es_ES}.csv`, so an English-locale admin now sees this table verbatim and a
Spanish-locale admin sees the Spanish column of that CSV — fixed 2026-08-18, previously the
XML source strings were themselves in Spanish, which broke translation for every locale
(Magento CSV lookup is an exact-match on the source string).

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

## The agent readiness dashboard

**Can agents find me?** is a page inside your admin panel that answers one
question: when an AI shopping agent visits your store, does it get what you
think it gets?

It never shows a single score. Three columns, never averaged, because they
answer different questions and can legitimately disagree:

| Column | What it is |
| --- | --- |
| **What a third party says** | The verdict of an external scanner, quoted verbatim. Never reinterpreted into a scale of ours — the moment we rescale someone else's grade, we are grading our own exam |
| **Does what you say match what you do?** | 16 checks that contrast what your store *advertises* against what it *actually answers*. This is the part no external scanner can do: it needs your credentials |
| **What we have seen** | Real agent traffic in the selected window — which agents arrived, which tools they used, how far they got, and where they failed |

A check that could not run is reported as **not checked**, with the reason. It is
never silently dropped and never counted as a pass. "We could not look" and
"we looked and it was fine" are different answers, and the page says which one
it is.

### What each check looks at

| Check | What it detects |
| --- | --- |
| C1 | You advertise tools your store does not serve |
| C2 | You advertise a checkout protocol whose endpoint does not answer |
| C3 | The catalogue price is not the price charged |
| C4 | Things are advertised as available when they are not |
| C5 | Your return policy says different things depending on where you look |
| C6 | You advertise as available something that is switched off |
| C7 | Rules switched on that cannot act for lack of data |
| C8 | Your rules observe but do not block |
| C9 | The identification method you advertise does not work |
| C10 | An agent can buy any amount without your confirmation |
| C11 | The point of sale is using expired rules |
| C12 | Operations with no signed receipt |
| C13 | Advertised addresses that do not work |
| C14 | Agents are seeing stale data from your store |
| C15 | Identity credentials about to expire |
| C16 | The delivery time you promise is not the one you meet |

Some checks need more than your settings to run, and the page says so instead of
leaving a gap:

- **Needs your store connected** (C3, C4, C5, C14) — they compare against your
  real catalogue, and without credentials there is nothing to compare with.
- **Needs delivered orders** (C16) — it compares what you promise against what
  you actually met, and that cannot be done without history.
- **Nothing to compare this time** — for example, C12 has nothing to check until
  an agent has actually completed a purchase. That is not a failing grade.

The checks run once a day and the page shows the result **with its date**, so a
verdict from yesterday looks like a verdict from yesterday. A cached "all good"
presented as current would be exactly the kind of self-deception this page
exists to catch.

## Changelog

### 1.3.1

- Fixed: the agent readiness page shipped without its stylesheet, so the panel rendered unstyled.
- Fixed: the panel could show its shell in one language and the diagnosis in another. The resolved language now travels with the texts instead of being detected twice.
- New: every finding carries a link to where it is fixed, and the merchant's own claims — the delivery promise and the rest — appear with the backing each one has.
- Changed: a store with no run yet reads as "checking" instead of "checked once a day": opening the panel already triggers the first run in the background.

### 1.3.0

- **New — agent readiness dashboard.** *Can agents find me?* now ships in the admin panel. It contrasts what your store advertises against what it actually answers, in **16 checks**, and shows all sixteen — not only the ones that fail. A check that could not run says **why** (store not connected, no delivered orders yet, nothing to compare this time) instead of leaving a gap that reads like a fault. See "The agent readiness dashboard" above.
- **Fixed** — the diagnosis was written in Spanish inside the API and shown verbatim, so a merchant with the panel in English read English headings above Spanish findings. The checks now emit language-neutral codes and the text is composed when served, in the language you are using.
- **Fixed** — check C1 ("you advertise tools your store does not serve") counted the full public catalogue as served when no tool list was configured, reporting 46 of 48 answering when the server actually serves 12. It failed in the flattering direction, which is the one this panel exists to catch.
- **Fixed** — check C6 ("you advertise as available something that is switched off") reported a capability as off whenever its flag was unset, even for flags that are on by default. It was a false alarm on every store.

### 1.2.1

- **Fixed** — `bin/magento trusteed:check-webserver` always reported `FAIL`, even against a
  perfectly served manifest. It accepted the response only if it carried a top-level `mcpVersion`
  key; the manifest this module emits has never had one (the version key is `schema_version`), so
  the check could not pass. Merchants following the installation guide were told their webserver was
  misconfigured when it was not.
- **Fixed — documentation** — the README advertised two configuration fields that do not exist
  ("HITL enforcement mode", "HITL amount threshold" — R043 has no configurable amount threshold),
  omitted seven that do, and gave the agent-token window as 300 seconds instead of 330. The admin
  page table listed six pages under invented English names; there are nine, and the menu is in
  Spanish. The trust-receipt paragraph pointed at `receipts.trusteed.xyz`, a host that does not
  resolve, and described pasting a JWS into a verifier tool that does not exist. The x402 and
  peer-to-peer bullets promised capabilities this module does not implement. The manuals under
  `docs/` were not linked from anywhere, and their reference sections described a manifest shape,
  webhook routes, retry policy, CLI command and frontend route that did not match the code.

- **Fixed** — the admin panel bundle (`view/adminhtml/web/js/admin-spa.js`) shipped unminified: 869 KB / 25,064 lines instead of the 490 KB / 41 lines the documented build command actually produces. Provenance could not be verified. Rebuilt from source.
- **Fixed** — the R047 (minimum contribution amount) rule had no form field in the admin panel; its parameters existed in the schema but could only be set via the API. Also: displaying a merchant category name printed the anti-injection delimiters (`<<<MERCHANT_CONTENT_START>>> … <<<MERCHANT_CONTENT_END>>>`) around it instead of stripping them for display.
- **Fixed — documentation** — `USER_GUIDE.md`/`USER_GUIDE_ES.md` described five of the six rows in the merchant rule-configuration table with the wrong rule: told the merchant to configure `R007` to restrict categories (R007 actually blocks cross-merchant abuse signals) and `R005` as an amount cap (R005 actually blocks revoked agents). Corrected against the real rule definitions; `R030`/`R032`/`R035`/`R042` added so the guide answers what merchants actually ask. Also removed the false claim that R001/R007 are "always evaluated locally" (the offline evaluator resolves nine different rules, none of them R001 or R007) and the false claim that R007 controls catalog visibility via a `trusteed_agentic_visible` attribute (the real attribute is `is_agentic_visible`, unrelated to any CEL rule).

### 1.2.0

- **Security fix** — the agent token verifier treated `exp`, `iat` and `nonce` as optional. Both time checks hung off `> 0`, so a token that simply omitted the claim skipped expiry and max-age entirely: it was valid forever. All three claims are now mandatory (`nonce` 16–64 chars), matching the canonical token schema and the other platform connectors.
- **Security fix** — the enforcement snapshot's signed freshness window (`validUntil`) was ignored. A snapshot past its window — served by the API or by any intermediary that cached it — was applied as if current. Magento was the only connector that did not check this. An expired snapshot is now treated as absent, so the merchant's fallback policy applies. `validUntil` travels *inside* the signed payload, so it cannot be stretched by an attacker; a missing or unparseable value is not treated as expired, since degrading on an unexpected format would block legitimate checkouts.
- **Fix** — trust scores with a decimal were displayed as "no score". The Health tab parsed the score with `is_int()`, and the scoring engine rounds to one decimal, which `json_decode` maps to a PHP float — so `is_int(81.4)` was `false` and the score silently became `null`. Only whole numbers survived. Measured across production stores on 2026-07-27: scores of 44.7, 52.7, 55.7, 61.5 and 81.4 all rendered as "no score". Now normalised through a single `ScoreNodeNormalizer`, and rendered with the decimal intact (`81.4`, not `81`) so it matches every other admin surface.
- **Fix** — rule R036 (max line-item value) read its cap from a parameter named `maxCents`; the canonical name is `maxCentsPerLine`, and it is the only one the merchant panel's strict schema accepts. With the wrong key the rule could never fire.
- **Added** — the connector now reports which cart signals this installation can project (`POST /api/v1/enforcement/capabilities`, HMAC-signed, sent once per capability-set version). Without it, a rule whose signal never arrives returns `NO_SIGNAL` on every checkout: it passes silently, and the merchant sees a rule in ENFORCE that blocks nothing. With the report, the panel can warn at the moment the rule is switched on. Magento projects 31 signals — more than double any other platform — because it also projects agent history, which elsewhere the server resolves.

### 1.1.1

- **Fix** — the "My Sales → Ventas" page mounted a static placeholder (Dashboard block + `ventas.phtml`) that never reached the actual TrustReceipt list. It now mounts the real admin SPA in the "Mis Ventas" section, same as Rules and Agents.
- Admin SPA bundle rebuilt.

### 1.1.0

- **Fix** — checkout enforcement was skipped entirely for organic (non-agent) checkouts: merchant rules such as maximum order amount, blocked countries, and business-hours restrictions never ran unless an agent DID was present. These rules now apply to every checkout regardless of agent presence.
- **Added** — an offline safety-valve evaluator that enforces the same universal merchant rules locally when the remote rules-evaluation API is unreachable, instead of only falling back to a blanket allow/block policy.
- **Security fix** — the enforcement snapshot fetched from the Trusteed backend is now cryptographically verified (Ed25519 signature check against the published JWKS) before being trusted, instead of being decoded without verification.
- **Security fix** — `EnforcementClient` no longer fabricates a placeholder `dev-bypass` signature when the HMAC secret is not yet configured; requests now fail safely open (`ALLOW`, matching the existing "unconfigured connector never blocks" posture) with a distinct log line so ops can tell an installation mid-setup apart from a fully unconfigured one.
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
