<?php
/**
 * Trusteed AgenticCommerce — Adobe Commerce Cloud (ACC) webserver configuration.
 *
 * On Adobe Commerce Cloud, Nginx is managed by Fastly/Magento Platform and
 * cannot be modified directly. Instead, configure web.locations in
 * .magento.app.yaml to pass /.well-known/mcp.json through to PHP.
 *
 * NO PHP CODE IS NEEDED IN THIS FILE for ACC. The comment below contains
 * the required .magento.app.yaml snippet. This file is included in the
 * module so merchants can copy-paste the correct configuration.
 *
 * Add the following to your .magento.app.yaml under web > locations:
 *
 * web:
 *   locations:
 *     "/.well-known":
 *       root: "pub"
 *       rules:
 *         "^/mcp\\.json$":
 *           passthru: "/index.php"
 *       allow: false
 *       scripts: false
 *       index: []
 *
 * After deploying, verify with: bin/magento trusteed:check-webserver
 *
 * Note: If you have an existing "/.well-known" block, merge the rule into it
 * rather than creating a duplicate block. YAML does not allow duplicate keys.
 */
