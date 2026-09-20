# User Guide — Trusteed Agentic Commerce for Magento 2

Version 1.3.4

---

## Table of contents

1. [Overview](#1-overview)
2. [How AI agent commerce works](#2-how-ai-agent-commerce-works)
3. [Admin dashboard](#3-admin-dashboard)
4. [My sales (Mis ventas)](#4-my-sales-mis-ventas)
5. [Who I sell to (A quién le vendo)](#5-who-i-sell-to-a-quién-le-vendo)
6. [My Rules (Mis Reglas)](#6-my-rules-mis-reglas)
7. [Payment methods (Métodos de pago)](#7-payment-methods-métodos-de-pago)
8. [Security (Seguridad)](#8-security-seguridad)
9. [Settings (Ajustes)](#9-settings-ajustes)
10. [Trust Receipts](#10-trust-receipts)
11. [Viewing agent orders in standard Magento](#11-viewing-agent-orders-in-standard-magento)
12. [Understanding the Trust Receipt badge](#12-understanding-the-trust-receipt-badge)
13. [HITL — Human-in-the-Loop Approvals](#13-hitl--human-in-the-loop-approvals)
14. [Frequently asked questions](#14-frequently-asked-questions)

---

## 1. Overview

Trusteed Agentic Commerce connects your Magento store to AI shopping assistants
such as Claude, ChatGPT and other MCP-compatible agents. When a customer asks
their AI assistant to "buy a blue widget from [your store]", the agent:

1. Discovers your store via the MCP manifest at `/.well-known/mcp.json`
2. Browses your catalog and adds items to a cart
3. Validates the order against your rules (price limits, allowed agents, manual approval)
4. Completes the purchase and receives a cryptographically signed Trust Receipt

Every step is logged and auditable, and you control it from the **Trusteed** admin menu.

---

## 2. How AI agent commerce works

```
Customer → AI Agent → MCP Discovery → Your Magento Store
                              ↓
                    Trusteed Rule Engine
                              ↓
                    Order Created in Magento
                              ↓
                    Trust Receipt (signed)
```

**Key concepts:**

| Term | Meaning |
|------|---------|
| **Agent** | An AI assistant (Claude, ChatGPT, etc.) acting on behalf of a customer |
| **MCP** | Model Context Protocol — the open standard agents use to interact with stores |
| **Trust Receipt** | A cryptographically signed record of each agent transaction (Ed25519) |
| **Rule** | A merchant-defined constraint (max order value, allowed agents, category blocklist) |
| **HITL** | Human-in-the-Loop: agent orders that wait for your manual approval before they complete |
| **Enforcement mode** | `observe` = log only; `enforce` = block orders that violate rules |

---

## 3. Admin dashboard

**Path:** Trusteed → Inicio

The dashboard is your starting point. It shows:

- Connection status: a green banner confirms your store is connected to Trusteed
- Store ID: your unique identifier in the Trusteed network
- Quick links: shortcuts to the four main sections

### Connection banner states

| Banner | Meaning |
|--------|---------|
| Green "Your store is connected" | Store is live and receiving agent traffic |
| Yellow "Connection pending" | Setup Wizard not completed. Go to Trusteed → Configuración |
| Red "Store disconnected" | API credentials invalid or Trusteed API unreachable |

---

## 4. My sales (Mis ventas)

**Path:** Trusteed → Mis ventas

This section shows all orders placed by AI agents in your store. It has four tabs:

### My orders tab

Lists agent-placed orders with:

- Order number (links to standard Magento order view)
- Agent identity (AI platform + customer)
- Order total
- Trust Receipt, with a detail view
- Date

Orders placed by agents appear here **and** in the standard **Sales → Orders** list.
They are normal Magento orders and go through your standard fulfillment workflow.

### AI sales tab

Aggregate metrics: total revenue from agent orders, average order value, top
products purchased by agents.

### Keys tab

API keys issued to AI platforms for accessing your store's MCP endpoint. Each key
is scoped to a specific agent platform and can be revoked individually.

### Audit tab

A per-order audit trail showing every rule evaluation, token verification, and
enforcement decision for each agent order.

---

## 5. Who I sell to (A quién le vendo)

**Path:** Trusteed → A quién le vendo

Manage which AI agents are allowed to purchase in your store.

### Agent list

Shows all agents that have accessed your store, with:

- Agent DID (decentralized identifier)
- Platform (Claude, ChatGPT, etc.)
- First seen / last seen dates
- Status (Allowed / Blocked)
- Order count

### Blocking an agent

Click on any agent row and toggle the **Status** switch to **Blocked**. The agent
will receive a `BLOCK` decision on its next order attempt. Existing completed orders
are not affected.

### Agent identity levels

| Level        | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `verified`   | Agent presented a valid cryptographic identity token                      |
| `unverified` | Agent identified itself but token could not be cryptographically verified |
| `anonymous`  | No agent identity presented                                               |

You can configure minimum trust levels in **Mis Reglas**.

---

## 6. My Rules (Mis Reglas)

**Path:** Trusteed → Mis Reglas

Rules define how agent orders are evaluated before they are placed. Each rule can
be in `observe` mode (log only) or `enforce` mode (block violations).

### Common rules

| Rule Code | Name                             | Description                                                                         |
| --------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| R001      | Verified Agent Required          | Requires a cryptographically identified buying agent; rejects anonymous agents      |
| R005      | Revoked Agent Block              | Blocks agents that have been revoked or suspended                                   |
| R007      | Cross-Merchant Abuse Signal      | Blocks agents carrying an abuse signal raised across merchants                      |
| R011      | Repeat Failed Checkout           | Blocks agents with too many recent failed checkout attempts                         |
| R022      | Payment Rail Restriction         | Restricts which payment methods or rails agent checkout may use                     |
| R030      | Simple Controls                  | Basic max-amount and allowed-country controls in a single rule                      |
| R032      | Category Blocklist               | Blocks agent purchases in categories you list (alcohol, tobacco, weapons, adult)    |
| R035      | Max Order Value                  | Caps the total amount of an agent order                                             |
| R042      | Max Orders Per Agent Per Day     | Caps successful orders per agent per 24 h — complements R011, which counts failures |
| R043      | Agent Checkout Approval Required | Requires your manual approval for **every** agent order via the HITL flow           |

Codes and names above are the canonical ones. A rule code means the same thing on
every platform, so `R035` is the amount cap everywhere — do not read a code by its
number. The engine ships **46** rules in total; this table is the subset merchants
configure most often.

### Rule modes

- **Observe**: the rule evaluates and logs its verdict, but never blocks an order.
  Use this when initially deploying a rule to understand its impact before enforcing.
- **Enforce**: the rule blocks or escalates orders that violate it.

### Switching a rule to enforce mode

1. Navigate to **Trusteed → Mis Reglas**
2. Click the rule you want to enforce
3. Toggle **Mode** from `observe` to `enforce`
4. Click **Save**

> **Tip:** Start with all rules in `observe` mode for at least 7 days. Review the
> audit log in **Mis ventas → Audit** to understand how many orders would have been
> affected before switching to `enforce`.

---

## 7. Payment methods (Métodos de pago)

**Path:** Trusteed → Métodos de pago

Configure the order in which Trusteed attempts to charge agent orders:

1. Primary method: tried first (e.g., x402 micropayment protocol)
2. Fallback method: tried if the primary fails (e.g., stored card on file)

When an agent places an order, Trusteed tries the primary method. If it fails, it
falls back to the next method in sequence. If all methods fail, the order is not
created.

> **To change your payment method order**, contact Trusteed support at
> support@trusteed.xyz or access the main portal at trusteed.xyz/dashboard.

---

## 8. Security (Seguridad)

**Path:** Trusteed → Seguridad

The Security page gives you visibility and control over who accesses your store.

### Audit log

A chronological record of every agent interaction:

- Timestamp
- Agent identity
- Action (browse / add-to-cart / checkout / payment)
- Rule evaluation outcome (ALLOW / BLOCK / ESCALATE)
- Trust Receipt ID (for completed orders)

### Anomaly alerts

Trusteed monitors agent behavior patterns and alerts you when:

- An agent attempts unusually high-value orders
- The same agent retries a blocked order multiple times
- An unknown agent platform attempts access

### Webhook status

Shows the health of the webhook delivery pipeline:

- Outbox depth (pending deliveries)
- Last successful delivery timestamp
- Delivery error rate

---

## 9. Settings (Ajustes)

**Path:** Trusteed → Ajustes

### Enforcement system failure mode

Controls what happens when the Trusteed API is temporarily unreachable.

First, the module checks the last rules snapshot it pulled against a small set of
rules it can evaluate on its own: the country check of R014, R018, R019, R020, R025,
R027, R028, R029 and R030. If one of them matches, the order is blocked whatever the
mode. If none matches, the mode decides:

| Mode      | Behavior                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `observe` | If the API is down, all orders are allowed through. Violations are logged retroactively. Use in low-risk environments. |
| `enforce` | If the API is down, all agent orders are blocked. Use in high-value or regulated environments.                         |

When the API is unreachable this module falls back to its bundled offline
evaluator (`Enforcement/OfflineSafetyValveEvaluator.php`), which decides nine
rules on its own: **R014** (country dimension only — the cancellation-history
dimension needs a backend lookup), **R018**, **R019**, **R020**, **R025**,
**R027**, **R028**, **R029** and **R030**. Those nine keep working under either
mode above.

Every other rule needs the backend, **including R001 and R007** — under
`observe` they are skipped, and under `enforce` the order is blocked by the
setting above rather than evaluated.

### Payment method order

See [Payment Methods](#7-payment-methods-métodos-de-pago).

---

## 10. Trust Receipts

**Path:** Trust Receipts → Verify Receipt

Trust Receipts are cryptographically signed records of agent transactions. They use
Ed25519 signatures (RFC 8037) and are issued by the Trusteed API after each
successful agent order.

> **Separate module.** The **Trust Receipts** menu (Verify Receipt, Self-Test and
> Audit Log) and the order badge described in section 12 belong to the Trusteed Trust
> Receipt Verifier module (Composer package `trusteed/trust-verifier-for-magento`,
> Magento module `Trusteed_TrustVerifier`). Install it alongside Trusteed Agentic
> Commerce to get them. Without it, the order still stores its receipt address in the
> `trusteed_receipt_uri` field.

### What a Trust Receipt contains

- Order ID and amount
- Agent identity (DID)
- Merchant identity
- Timestamp
- Payment method used
- Cryptographic signature

### Verifying a receipt

1. Navigate to **Trust Receipts → Verify Receipt**
2. Paste the JWS string from a customer's receipt
3. Click **Verify**

Results:

- **VERIFIED**: the signature is valid and the receipt is authentic and unaltered
- **INVALID**: the signature does not match, so the receipt may have been altered
- **INDETERMINATE**: verification could not complete (e.g., JWKS endpoint unreachable)

### Self-Test

**Trust Receipts → Self-Test** runs the built-in conformance suite against your
installation to confirm the verifier is working correctly with known test vectors.

### Audit log

**Trust Receipts → Audit Log** shows every verification attempt with verdict,
latency, and the admin user who performed the verification.

---

## 11. Viewing agent orders in standard Magento

Agent orders are normal Magento orders and appear in **Sales → Orders** alongside
human-placed orders. They are distinguished by:

- The **Trusteed** label in the order source column
- The `trusteed_receipt_uri` field visible in the order detail page

Fulfill, invoice and ship agent orders exactly as you would any other order.
When you ship an order, Trusteed is automatically notified via the webhook outbox.

---

## 12. Understanding the Trust Receipt badge

This badge comes from the Trusteed Trust Receipt Verifier module (see section 10).

On the order detail page (**Sales → Orders → [Order]**), the module adds a green badge
to the page header when the order has a Trust Receipt address stored. The badge reads
**VERIFIED · Order** followed by the order status: Completed, Refunded, Cancelled,
On Hold or Processing.

The badge only tells you that the order has a receipt address. It does not check the
signature. To check the signature, paste the receipt into **Trust Receipts → Verify
Receipt**.

---

## 13. HITL — Human-in-the-Loop Approvals

When rule **R043** is active in `enforce` mode and an agent order needs approval, the
order is not created. Instead:

1. The module freezes the cart, so the shopper's intent is recorded as pending
   merchant approval
2. The agent receives the message "Your order is pending review and requires merchant
   approval before it can be completed"

The module only freezes the cart. The approval decision itself is handled through
your Trusteed dashboard, not through a screen in the Magento admin.

### Configuring the HITL rule

R043 sends every agent order to manual approval. It has no amount threshold. The only setting is `ttlMinutes`, how long the approval window stays open (60 minutes by default). You set it in **Trusteed → Mis Reglas**.

---

## 14. Frequently asked questions

**Q: Do agent orders count toward my Magento analytics and reports?**

Yes. Agent orders are standard Magento orders and appear in all standard reports
(Sales → Reports, Business Intelligence, etc.).

**Q: Can agents apply discount codes?**

Agents can apply the discount codes your store accepts. Rule **R017**
(`discount-anomaly-applied`) caps the number of discount codes on a cart and the total
discount depth, so you can stop carts with unusual discounts.

**Q: What happens to agent orders if Trusteed is down?**

The module first checks the local rules described in **Settings**. If none matches,
your **Enforcement failure mode** setting decides. In `observe` mode, orders proceed
normally. In `enforce` mode (the default), orders are blocked until connectivity is
restored.

**Q: Can I limit which products agents can purchase?**

Yes. Configure rule **R032 (Category Blocklist)** in **Mis Reglas**. It blocks the
categories you list. (`R007` is a different rule: it blocks agents carrying a
cross-merchant abuse signal.)

**Q: How are agent payments handled?**

Agents pay using the methods configured in **Métodos de pago**. The most common
method is the x402 micropayment protocol, which allows agents to pay on behalf of
customers using pre-authorized payment credentials.

**Q: Is my customer data shared with AI agents?**

No. Agents receive product and pricing information but are never given customer PII.
Order confirmation data is provided to the agent after a successful purchase, scoped
to what is necessary for the customer to receive their purchase confirmation.

**Q: How do I open a support case?**

Email support@trusteed.xyz with your Store ID (visible on **Trusteed → Inicio**),
the order ID or Trust Receipt URI, and a description of the issue.
