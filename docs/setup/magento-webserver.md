# Webserver Configuration for /.well-known/mcp.json

The Trusteed AgenticCommerce module serves its agent-discovery manifest at
`/.well-known/mcp.json`. Magento's standard PHP routing only runs after the
webserver checks for a static file at the requested path. Because no static
file exists at `/.well-known/mcp.json`, your webserver must be configured to
forward that specific path to PHP/Magento.

After making changes, run the built-in verification command:

```bash
bin/magento trusteed:check-webserver
```

---

## Nginx

Add the following inside your server {} block, before the main Magento
catch-all `location /` block:

```nginx
location /.well-known/mcp.json {
    try_files $uri /index.php?$args;
}
```

Full snippet: `view/frontend/templates/install/webserver/nginx-snippet.conf`

Reload Nginx after the change:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Apache

Add the following inside your `<VirtualHost>` block or in `.htaccess`
(requires `AllowOverride All`). Place it **before** the generic Magento
rewrite rules:

```apache
RewriteEngine On
RewriteRule ^\.well-known/mcp\.json$ /index.php [L,QSA]
```

Full snippet: `view/frontend/templates/install/webserver/apache-snippet.conf`

Restart Apache after the change:

```bash
sudo apachectl configtest && sudo systemctl reload apache2
```

---

## Adobe Commerce Cloud

On Adobe Commerce Cloud the Nginx config is managed by the platform. You
must configure the rewrite in `.magento.app.yaml` instead:

```yaml
web:
  locations:
    "/.well-known":
      root: "pub"
      rules:
        "^/mcp\\.json$":
          passthru: "/index.php"
      allow: false
      scripts: false
      index: []
```

If you already have a `/.well-known` block, merge the rule into the existing
block, since YAML does not allow duplicate keys at the same level.

After committing and deploying the change, verify:

```bash
bin/magento trusteed:check-webserver
```

Full template: `view/frontend/templates/install/webserver/acc-magento-vars.php`

---

## Verification

```bash
bin/magento trusteed:check-webserver
```

Expected output on success:

```
[OK]  /.well-known/mcp.json → HTTP 200, Content-Type: application/json
[OK]  signature field present
[OK]  store_views[] field present
```

On failure the command prints the exact webserver snippet needed to fix the
issue and exits with code 1 so CI pipelines can gate on it.
