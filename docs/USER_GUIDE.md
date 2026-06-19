# User Guide — Trusteed Agentic Commerce for Magento 2

Version 1.0.0

---

## Table of Contents

1. [Overview](#1-overview)
2. [How AI Agent Commerce Works](#2-how-ai-agent-commerce-works)
3. [Admin Dashboard](#3-admin-dashboard)
4. [My Sales (Mis ventas)](#4-my-sales-mis-ventas)
5. [Who I Sell To (A quién le vendo)](#5-who-i-sell-to-a-quién-le-vendo)
6. [My Rules (Mis Reglas)](#6-my-rules-mis-reglas)
7. [Payment Methods (Métodos de pago)](#7-payment-methods-métodos-de-pago)
8. [Security (Seguridad)](#8-security-seguridad)
9. [Settings (Ajustes)](#9-settings-ajustes)
10. [Trust Receipts](#10-trust-receipts)
11. [Viewing Agent Orders in Standard Magento](#11-viewing-agent-orders-in-standard-magento)
12. [Understanding the Trust Receipt Badge](#12-understanding-the-trust-receipt-badge)
13. [HITL — Human-in-the-Loop Approvals](#13-hitl--human-in-the-loop-approvals)
14. [Frequently Asked Questions](#14-frequently-asked-questions)

---

## 1. Overview

Trusteed Agentic Commerce connects your Magento store to AI shopping assistants
such as Claude, ChatGPT, and other MCP-compatible agents. When a customer asks
their AI assistant to "buy a blue widget from [your store]", the agent:

1. Discovers your store via the MCP manifest at `/.well-known/mcp.json`
2. Browses your catalog and adds items to a cart
3. Validates the order against your rules (price limits, allowed agents, HITL thresholds)
4. Completes the purchase and receives a cryptographically signed Trust Receipt

Every step is logged, auditable, and controllable from the **Trusteed** admin menu.

---

## 2. How AI Agent Commerce Works

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
| **Trust Receipt** | A cryptographically signed proof of each agent transaction (Ed25519) |
| **Rule** | A merchant-defined constraint (max order value, allowed agents, HITL threshold) |
| **HITL** | Human-in-the-Loop — orders above a threshold require your manual approval |
| **Enforcement mode** | `observe` = log only; `enforce` = block orders that violate rules |

---

## 3. Admin Dashboard

**Path:** Trusteed → Inicio

The dashboard is your starting point. It shows:

- **Connection status** — green banner confirms your store is connected to Trusteed
- **Store ID** — your unique identifier in the Trusteed network
- **Quick links** — shortcuts to the four main sections

### Connection banner states

| Banner | Meaning |
|--------|---------|
| Green "Your store is connected" | Store is live and receiving agent traffic |
| Yellow "Connection pending" | Setup Wizard not completed — go to Trusteed → Configuración |
| Red "Store disconnected" | API credentials invalid or Trusteed API unreachable |

---

## 4. My Sales (Mis ventas)

**Path:** Trusteed → Mis ventas

This section shows all orders placed by AI agents in your store. It has four tabs:

### My orders tab

Lists agent-placed orders with:
- Order number (links to standard Magento order view)
- Agent identity (AI platform + customer)
- Order total
- Trust Receipt status (PENDING / ISSUED / VERIFIED)
- Date

Orders placed by agents appear here **and** in the standard **Sales → Orders** list.
They are normal Magento orders — they go through your standard fulfillment workflow.

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

## 5. Who I Sell To (A quién le vendo)

**Path:** Trusteed → Agentes

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

| Level | Description |
|-------|-------------|
| `verified` | Agent presented a valid cryptographic identity token |
| `unverified` | Agent identified itself but token could not be cryptographically verified |
| `anonymous` | No agent identity presented |

You can configure minimum trust levels in **Mis Reglas**.

---

## 6. My Rules (Mis Reglas)

**Path:** Trusteed → Reglas

Rules define how agent orders are evaluated before they are placed. Each rule can
be in `observe` mode (log only) or `enforce` mode (block violations).

### Common rules

| Rule Code | Name | Description |
|-----------|------|-------------|
| R001 | Agent identity required | Rejects anonymous agents |
| R005 | Max order amount | Blocks orders above a configured threshold |
| R007 | Allowed product categories | Restricts which categories agents can purchase |
| R011 | Cart abandonment guard | Flags suspicious cart-abandon patterns |
| R022 | Retry abuse guard | Limits order retry frequency per agent |
| R043 | HITL threshold | Sends orders above a value for human review instead of auto-approving |

### Rule modes

- **Observe**: the rule evaluates and logs its verdict, but never blocks an order.
  Use this when initially deploying a rule to understand its impact before enforcing.
- **Enforce**: the rule blocks or escalates orders that violate it.

### Switching a rule to enforce mode

1. Navigate to **Trusteed → Reglas**
2. Click the rule you want to enforce
3. Toggle **Mode** from `observe` to `enforce`
4. Click **Save**

> **Tip:** Start with all rules in `observe` mode for at least 7 days. Review the
> audit log in **Mis ventas → Audit** to understand how many orders would have been
> affected before switching to `enforce`.

---

## 7. Payment Methods (Métodos de pago)

**Path:** Trusteed → Métodos de pago

Configure the order in which Trusteed attempts to charge agent orders:

1. **Primary method** — tried first (e.g., x402 micropayment protocol)
2. **Fallback method** — tried if the primary fails (e.g., stored card on file)

When an agent places an order, Trusteed tries the primary method. If it fails, it
falls back to the next method in sequence. If all methods fail, the order is not
created.

> **To change your payment method order**, contact Trusteed support at
> support@trusteed.xyz or access the main portal at app.trusteed.xyz.

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

Controls what happens when the Trusteed API is temporarily unreachable:

| Mode | Behavior |
|------|---------|
| `observe` | If the API is down, all orders are allowed through. Violations are logged retroactively. Use in low-risk environments. |
| `enforce` | If the API is down, all agent orders are blocked. Use in high-value or regulated environments. |

Level-1 rules (R001, R007) are always evaluated locally, even when the API is
unreachable, regardless of this setting.

### Payment method order

See [Payment Methods](#7-payment-methods-métodos-de-pago).

---

## 10. Trust Receipts

**Path:** Trust Receipts → Verify Receipt

Trust Receipts are cryptographically signed proofs of agent transactions. They use
Ed25519 signatures (RFC 8037) and are issued by the Trusteed API after each
successful agent order.

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
- **VERIFIED** — signature is valid, receipt is authentic and untampered
- **INVALID** — signature does not match; receipt may have been altered
- **INDETERMINATE** — verification could not complete (e.g., JWKS endpoint unreachable)

### Self-Test

**Trust Receipts → Self-Test** runs the built-in conformance suite against your
installation to confirm the verifier is working correctly with known test vectors.

### Audit Log

**Trust Receipts → Audit Log** shows every verification attempt with verdict,
latency, and the admin user who performed the verification.

---

## 11. Viewing Agent Orders in Standard Magento

Agent orders are normal Magento orders and appear in **Sales → Orders** alongside
human-placed orders. They are distinguished by:

- The **Trusteed** label in the order source column
- The `trusteed_receipt_uri` field visible in the order detail page

You fulfill, invoice, and ship agent orders exactly as you would any other order.
When you ship an order, Trusteed is automatically notified via the webhook outbox.

---

## 12. Understanding the Trust Receipt Badge

On the order detail page (**Sales → Orders → [Order]**), a Trust Receipt badge
shows the receipt status:

| Badge | Meaning |
|-------|---------|
| **PENDING** | Order created; receipt not yet issued by Trusteed |
| **ISSUED** | Receipt issued and URI stored on the order |
| **VERIFIED** | Receipt has been verified via the Trust Receipts verifier |

The badge links directly to the Trust Receipts → Verify Receipt page with the
receipt URI pre-populated.

---

## 13. HITL — Human-in-the-Loop Approvals

When rule **R043** is active in `enforce` mode and an agent order exceeds your
configured HITL threshold, the order is not created automatically. Instead:

1. The agent receives a "pending merchant approval" response
2. The order appears in **Trusteed → Mis ventas** with status **HITL_PENDING**
3. You receive a notification in the Magento admin notification bell

### Approving a pending order

1. Open **Trusteed → Mis ventas**
2. Click the order with status **HITL_PENDING**
3. Review the order details and agent identity
4. Click **Approve** to create the order, or **Reject** to cancel it

Approved orders proceed through normal Magento order processing. Rejected orders
are logged in the audit trail and the agent is notified.

### Configuring the HITL threshold

The threshold is configured in your Trusteed account dashboard at
[app.trusteed.xyz/settings/rules/r043](https://app.trusteed.xyz/settings/rules/r043).
It is applied globally across all platforms that connect to your store.

---

## 14. Frequently Asked Questions

**Q: Do agent orders count toward my Magento analytics and reports?**

Yes. Agent orders are standard Magento orders and appear in all standard reports
(Sales → Reports, Business Intelligence, etc.).

**Q: Can agents apply discount codes?**

Only discount codes that have been explicitly allowlisted in your Trusteed rules.
By default, agents cannot apply arbitrary coupon codes (rule R009).

**Q: What happens to agent orders if Trusteed is down?**

This depends on your **Enforcement failure mode** setting (see Settings). In
`observe` mode, orders proceed normally. In `enforce` mode, agent orders are blocked
until connectivity is restored.

**Q: Can I limit which products agents can purchase?**

Yes — configure rule **R007 (Allowed product categories)** in **Mis Reglas**.

**Q: How are agent payments handled?**

Agents pay using the methods configured in **Métodos de pago**. The most common
method is the x402 micropayment protocol, which allows agents to pay on behalf of
customers using pre-authorized payment credentials.

**Q: Is my customer data shared with AI agents?**

No. Agents receive product and pricing information but are never given customer PII.
Order confirmation data is provided to the agent after a successful purchase, scoped
to what is necessary for the customer to receive their purchase confirmation.

**Q: How do I get a support case reviewed?**

Email support@trusteed.xyz with your Store ID (visible on **Trusteed → Inicio**),
the order ID or Trust Receipt URI, and a description of the issue.
