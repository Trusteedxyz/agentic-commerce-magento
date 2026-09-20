# Installation Guide — Trusteed Agentic Commerce for Magento 2

Version 1.1.1 · Magento Open Source & Adobe Commerce 2.4.7 / 2.4.8 · PHP 8.2+

---

## Table of contents

1. [System requirements](#1-system-requirements)
2. [Pre-installation checklist](#2-pre-installation-checklist)
3. [Installation via Composer](#3-installation-via-composer)
4. [Manual installation](#4-manual-installation)
5. [Post-Installation Setup](#5-post-installation-setup)
6. [Connecting to Trusteed](#6-connecting-to-trusteed)
7. [Verifying the installation](#7-verifying-the-installation)
8. [Cron configuration](#8-cron-configuration)
9. [Upgrade instructions](#9-upgrade-instructions)
10. [Uninstallation](#10-uninstallation)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. System requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Magento Open Source | 2.4.7 | 2.4.8 |
| Adobe Commerce | 2.4.7 | 2.4.8 |
| PHP | 8.2 | 8.3 |
| PHP extensions | `curl`, `json`, `openssl` | + `ext-sodium` |
| MySQL / MariaDB | 8.0 / 10.6 | MySQL 8.0 |
| Composer | 2.x | 2.7+ |
| Cron | Required | — |

> **Install `ext-sodium`.** The module includes a pure-PHP fallback
> (`paragonie/sodium_compat`) for Ed25519 agent token verification, but native
> `ext-sodium` is the better choice and is available in all PHP 8.2+ builds.

---

## 2. Pre-installation checklist

Before installing, confirm:

- [ ] You have a Trusteed account at [app.trusteed.xyz](https://app.trusteed.xyz)
- [ ] Magento cron is running (`bin/magento cron:run` completes without errors)
- [ ] You have Magento Marketplace credentials (public key / private key) **or** you are installing manually
- [ ] Magento is in maintenance mode during initial installation on production:
  ```bash
  bin/magento maintenance:enable
  ```
- [ ] A full database backup has been made

---

## 3. Installation via Composer

### 3.1 Configure Magento Marketplace authentication

If not already configured:

```bash
composer config http-basic.repo.magento.com <PUBLIC_KEY> <PRIVATE_KEY>
```

### 3.2 Require the package

```bash
composer require trusteed/agentic-commerce-magento
```

### 3.3 Enable the module

```bash
bin/magento module:enable Trusteed_AgenticCommerce
```

### 3.4 Run setup upgrade

```bash
bin/magento setup:upgrade
```

This creates the `trusteed_webhook_outbox` database table and adds the
`trusteed_receipt_uri` / `trusteed_receipt_status` columns to `sales_order`.

### 3.5 Compile dependency injection

```bash
bin/magento setup:di:compile
```

### 3.6 Deploy static content (production only)

```bash
bin/magento setup:static-content:deploy -f
```

### 3.7 Clear caches

```bash
bin/magento cache:flush
bin/magento cache:clean
```

### 3.8 Disable maintenance mode

```bash
bin/magento maintenance:disable
```

---

## 4. Manual installation

Use this method if you do not have Magento Marketplace credentials, or if you
obtained the module as a `.zip` file from the Marketplace download page.

### 4.1 Extract the archive

```bash
unzip trusteed-agentic-commerce-magento-1.1.1.zip -d /tmp/trusteed-module
```

### 4.2 Copy files into Magento

```bash
mkdir -p <MAGENTO_ROOT>/app/code/Trusteed/AgenticCommerce
cp -r /tmp/trusteed-module/* <MAGENTO_ROOT>/app/code/Trusteed/AgenticCommerce/
```

### 4.3 Continue from step 3.3

Follow steps 3.3 through 3.8 above.

---

## 5. Post-Installation Setup

After installation the **Trusteed** menu appears in the Magento admin sidebar
(below **Stores**).

### 5.1 Open the Setup Wizard

Navigate to **Trusteed → Configuración** (Setup Wizard).

The wizard presents four sections:

| Section | Purpose |
|---------|---------|
| Internal HMAC Secret | Signs internal heartbeat requests to the Trusteed API |
| Checkout Enforcement (CEL) | Holds the Enforcement Installation ID and the Enforcement HMAC Secret that Trusteed provides. Until both are set, enforcement does nothing |
| Conecta tu tienda con Trusteed | The **Conectar con Trusteed →** button, which connects the store to your Trusteed account |
| ¿Qué tiendas quieres activar? | The store views that agents can see |

### 5.2 Generate the internal HMAC secret

The HMAC secret signs internal heartbeat requests to the Trusteed API. It must
match the value configured in the Trusteed backend for your merchant account.

Trusteed Operations provisions this value. Use the one Trusteed gave you for your
merchant account.

Paste it into **Internal HMAC Secret** and click **Guardar**.

### 5.3 Configure Store Views

Under **¿Qué tiendas quieres activar?** select the store views you want to
expose to AI agents. Agents can only browse and purchase in enabled store views.

---

## 6. Connecting to Trusteed

### 6.1 Get your API credentials

Log in to [app.trusteed.xyz](https://app.trusteed.xyz) and navigate to
**Settings → Integrations → Magento**. You will find:

| Credential | Where to find |
|------------|--------------|
| Merchant ID | Settings → Account → Merchant ID |
| Integration Token | Settings → Integrations → Magento → Token |
| Webhook Secret | Settings → Integrations → Magento → Webhook Secret |
| Connection ID | Assigned automatically after connecting |

### 6.2 Enter credentials in Magento

Navigate to **Stores → Configuration → Trusteed → Agentic Commerce**:

1. **API Base URL**: `https://api.trusteed.xyz`. Leave it unchanged unless Trusteed tells you otherwise.
2. **Merchant ID**: paste the value from your Trusteed account.
3. **Integration Token**: paste the integration token. Magento stores it encrypted.
4. **Webhook Secret**: paste the webhook secret. Magento stores it encrypted.

Click **Save Config**.

### 6.3 Click "Conectar con Trusteed"

In the Setup Wizard (**Trusteed → Configuración**) click the
**Conectar con Trusteed →** button. This:

1. Validates connectivity to the Trusteed API
2. Registers your Magento instance as a connected store
3. Returns a **Connection ID**, which Magento saves to the configuration automatically

A green **"Your store is connected"** banner will appear on the Dashboard
(**Trusteed → Inicio**) once the connection is established.

---

## 7. Verifying the installation

### 7.1 Check module status

```bash
bin/magento module:status Trusteed_AgenticCommerce
# Expected: Module is enabled
```

### 7.2 Verify database tables

```bash
mysql -u <user> -p <dbname> -e "DESCRIBE trusteed_webhook_outbox;"
mysql -u <user> -p <dbname> -e "SHOW COLUMNS FROM sales_order LIKE 'trusteed_%';"
```

### 7.3 Verify the MCP manifest endpoint

```bash
curl -sf https://<YOUR_STORE>/.well-known/mcp.json
# Should return a JSON manifest with store capabilities
```

### 7.4 Check the admin dashboard

Navigate to **Trusteed → Inicio**. The dashboard should show:

- Green "Your store is connected" banner
- Store ID matching your Trusteed account
- Count of active store views

### 7.5 Verify cron jobs

```bash
bin/magento cron:run --group=default
# In system log: look for "trusteed_webhook_drain" and "trusteed_lag_heartbeat"
grep trusteed var/log/cron.log
```

---

## 8. Cron configuration

The module registers two cron jobs in the `default` group:

| Job | Schedule | Purpose |
|-----|----------|---------|
| `trusteed_webhook_drain` | Every minute | Delivers pending webhooks from the outbox to the Trusteed API with exponential backoff |
| `trusteed_lag_heartbeat` | Every minute | Emits a lag metric so the Trusteed dashboard can alert on delivery delays |

**Cron is required.** Without it, order events (created, shipped, refunded) will
accumulate in the `trusteed_webhook_outbox` table and never be delivered.

Verify Magento cron is scheduled in your server's crontab:

```cron
* * * * * php /var/www/html/bin/magento cron:run 2>&1 | grep -v "^$" >> /var/www/html/var/log/magento.cron.log
```

For Magento Cloud (Adobe Commerce Cloud), cron is managed by the platform and
requires no additional configuration.

---

## 9. Upgrade instructions

### From a previous 1.x version

```bash
composer update trusteed/agentic-commerce-magento
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

Check the changelog in this package for configuration changes between versions.

---

## 10. Uninstallation

### 10.1 Disable the module

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
```

### 10.2 Remove the package

```bash
composer remove trusteed/agentic-commerce-magento
```

### 10.3 Remove database objects (optional)

Only do this if you want to permanently remove all data:

```sql
-- Drop outbox table
DROP TABLE IF EXISTS trusteed_webhook_outbox;

-- Remove columns from sales_order
ALTER TABLE sales_order
  DROP COLUMN IF EXISTS trusteed_receipt_uri,
  DROP COLUMN IF EXISTS trusteed_receipt_status;
```

### 10.4 Clean up configuration

```sql
DELETE FROM core_config_data
  WHERE path LIKE 'trusteed_general/%' OR path LIKE 'trusteed/%';
```

```bash
bin/magento cache:flush
```

---

## 11. Troubleshooting

### Module is not visible in the admin menu

```bash
bin/magento module:status Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento cache:flush
```

### "Store is not connected" after entering credentials

1. Verify `API Base URL` is `https://api.trusteed.xyz` (HTTPS required)
2. Check that your server can reach the Trusteed API:
   ```bash
   curl -sf https://api.trusteed.xyz/api/v1/health
   ```
3. Verify the Integration Token is correct (no trailing spaces)
4. Check `var/log/system.log` for `[trusteed]` entries

### Webhook outbox accumulating entries

```bash
# Check outbox depth
mysql -u <user> -p <dbname> -e "SELECT status, COUNT(*) FROM trusteed_webhook_outbox GROUP BY status;"

# Confirm cron is running
bin/magento cron:run --group=default
grep trusteed_webhook var/log/cron.log
```

### `ext-sodium` not available

Install via your package manager:

```bash
# Ubuntu / Debian
sudo apt-get install php8.2-sodium

# CentOS / RHEL
sudo dnf install php-sodium

# After installing, restart PHP-FPM
sudo systemctl restart php8.2-fpm
```

The pure-PHP fallback activates automatically if `ext-sodium` is absent. You don't
need to change any configuration.

### Orders not appearing in the Trusteed dashboard

Confirm the `sales_order_save_after` observer is registered:

```bash
bin/magento dev:di:info Trusteed\\AgenticCommerce\\Observer\\SalesOrderSaveAfter
```

And check `var/log/system.log` for `[trusteed] outbox enqueue` entries after
placing a test order.
