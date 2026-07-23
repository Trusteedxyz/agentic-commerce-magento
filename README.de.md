[English](README.md) | [Español](README.es.md) | [Français](README.fr.md) | **Deutsch**

# Trusteed Agentic Commerce für Magento 2

Ermöglichen Sie den neuen Online-Käufern, den KI-Agenten, sicher und zuverlässig in Ihrem Shop einzukaufen — dank Trusteed, dem Netzwerk, das Vertrauen zwischen Unternehmen und Agenten schafft.

- **Legen Sie Ihre Geschäftsregeln fest**: wem Sie den Kauf erlauben, bis zu welchem Betrag, welche Kategorien Sie Agenten nicht anbieten möchten, setzen Sie Preisgrenzen, halten Sie Lagerbestände aufrecht, um sich vor potenziell betrügerischen Agenten zu schützen, und vieles mehr.
- **Manipulationssichere Belege**: Wir erzeugen elektronisch signierte und kryptographisch manipulationssichere Belege, die im Streitfall als Nachweis der tatsächlichen Transaktion dienen. Kompatibel mit eIDAS (EU, Großbritannien) und eSIGN (USA).
- **Agenten-Analytik**: Sehen Sie sich Statistiken zu Agentenkäufen an — wie viel sie ausgeben, welche Produkte sie kaufen und wie oft.
- **Agenten-Blockierung**: Blockieren Sie potenziell gefährliche oder problematische Agenten.
- **Digitale Währungen**: ermöglicht Käufe in digitalen Währungen dank des X402-Protokolls.
- **Peer-to-Peer-Transaktionen**: ermöglicht direkten Peer-to-Peer-Handel zwischen Agenten und Händlern.

## Screenshots

| Dashboard | Agentenverkäufe | Geschäftsregeln |
|-----------|------------|----------------|
| ![Dashboard](docs/screenshots/screenshot-02-dashboard.png) | ![Sales](docs/screenshots/screenshot-04-ventas.png) | ![Rules](docs/screenshots/screenshot-05-rules.png) |

| Agenten | Regeln & Schalter | Trust Receipts |
|--------|----------------|----------------|
| ![Agents](docs/screenshots/screenshot-06-agentes.png) | ![Rules Detail](docs/screenshots/screenshot-07-rules-detail.png) | ![Trust Receipts](docs/screenshots/screenshot-08-trust-receipts.png) |

| Einrichtungsassistent | Konfiguration des Assistenten |
|-------------|-------------|
| ![Setup](docs/screenshots/screenshot-01-setup-wizard.png) | ![Config](docs/screenshots/screenshot-03-setup-wizard-config.png) |

| KI-Verkäufe — Liste automatisierter Belege |
|------------------------------------------------|
| ![Belegliste](docs/screenshots/screenshot-09-receipts-list.png) |

Jede von einem Agenten ausgelöste Bestellung erzeugt einen signierten Trust Receipt, aufgeführt unter **Trusteed → Mis ventas → Recibos de venta** mit Verifizierungsstatus und Beleg-URI — verlinkt zum öffentlichen Prüfer unter `receipts.trusteed.xyz`, oder füge den JWS direkt in das **Trust Receipts**-Tool ein (siehe oben), um ihn zu prüfen.

## Funktionen

- **MCP-Endpunkt** unter `/.well-known/mcp-manifest.json` — wird automatisch von KI-Agentenplattformen erkannt
- **Webhook-Outbox** — zuverlässige Zustellung von Bestellungen/Versand/Rückerstattungen an das Trusteed-Backend mit automatischem Wiederholungsversuch und Backoff
- **Agenten-Token-Verifizierung** — validiert die Identität des Agenten bei jeder Checkout-Anfrage
- **Freigabe-Gate (HITL)** — konfigurierbare Freigabe durch einen Menschen (human-in-the-loop) für hochwertige Agentenbestellungen
- **Trust Receipts** — jede Agententransaktion erzeugt einen kryptographisch signierten Beleg (Ed25519)
- **Admin-Dashboard** — SPA mit Agentensitzungen, Verkäufen, Regeln und Statusübersicht
- **Audit-Log** — jede Interaktion eines Agenten wird mit Identität und Ergebnis protokolliert

## Kompatibilität

| Magento-Version | PHP | Status |
|-----------------|-----|--------|
| Open Source 2.4.7 | 8.2, 8.3 | ✅ Unterstützt |
| Open Source 2.4.8 | 8.2, 8.3 | ✅ Unterstützt |
| Adobe Commerce 2.4.7 | 8.2, 8.3 | ✅ Unterstützt |
| Adobe Commerce 2.4.8 | 8.2, 8.3 | ✅ Unterstützt |

## Voraussetzungen

- Magento Open Source oder Adobe Commerce 2.4.7+
- PHP 8.2 oder 8.3
- Ein Trusteed-Konto — [kostenlos registrieren auf trusteed.xyz](https://trusteed.xyz)

## Installation

### Über Composer (empfohlen)

```bash
composer require trusteed/agentic-commerce-magento
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Manueller Upload

1. **Laden Sie die installierbare `.zip`** von der neuesten GitHub Release herunter:
   [**⬇ trusteed-agentic-commerce-magento-1.0.0.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.0.0.zip)
   — oder durchsuchen Sie alle Versionen auf der [Releases-Seite](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Entpacken Sie das Archiv nach `app/code/Trusteed/AgenticCommerce/`
3. Führen Sie die obigen Befehle im Root-Verzeichnis Ihres Magento aus

## Konfiguration

1. Melden Sie sich in Ihrem Magento-**Admin Panel** an
2. Gehen Sie zu **Trusteed → Setup Wizard**
3. Geben Sie Ihren **API Key** von [app.trusteed.xyz/settings](https://app.trusteed.xyz/settings) ein
4. Wählen Sie die Store-Ansichten aus, die Sie KI-Agenten zugänglich machen möchten
5. Klicken Sie auf **Save & Verify** — der Assistent testet die Verbindung und registriert Ihren Shop

### Erweiterte Einstellungen

Navigieren Sie zu **Stores → Configuration → Trusteed → Agentic Commerce**:

| Einstellung | Standardwert | Beschreibung |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Endpunkt des Trusteed-Backends |
| Webhook secret version | `1` | Nach Kompromittierung eines Schlüssels rotieren |
| HITL enforcement mode | `observe` | `observe` protokolliert nur; `enforce` blockiert Bestellungen oberhalb des Schwellenwerts |
| HITL amount threshold | `500.00` | Bestellungen oberhalb dieses Werts erfordern eine menschliche Freigabe |
| Agent token TTL | `300` | Maximales Alter (in Sekunden) eines gültigen Agenten-Tokens |

## Admin-Seiten

Nach der Installation erscheint ein **Trusteed**-Menü in der Seitenleiste des Magento-Admins:

| Seite | Pfad | Beschreibung |
|------|------|-------------|
| Dashboard | Trusteed → Dashboard | Echtzeitübersicht der Agentensitzungen |
| Sales | Trusteed → Ventas | Von Agenten ausgelöste Bestellungen und Belege |
| Rules | Trusteed → Reglas | Durchsetzungsregeln (CEL-basiert) |
| Agents | Trusteed → Agentes | Verbundene Agenten-Identitäten |
| Security | Trusteed → Seguridad | Audit-Log und Anomalie-Warnungen |
| Settings | Trusteed → Ajustes | Modulkonfiguration |

## Deinstallation

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
composer remove trusteed/agentic-commerce-magento
```

So entfernen Sie die Datenbanktabellen:

```bash
bin/magento setup:db-declaration:generate-whitelist --module-name=Trusteed_AgenticCommerce
# Then manually drop: trusteed_webhook_outbox
# And columns on sales_order: trusteed_receipt_uri, trusteed_receipt_status
```

## Änderungsprotokoll

### Unveröffentlicht

- **Sicherheitskorrektur** — der vom Trusteed-Backend abgerufene Enforcement-Snapshot wird nun vor der Verwendung kryptographisch verifiziert (Ed25519-Signaturprüfung gegen den veröffentlichten JWKS), statt ohne Verifizierung dekodiert zu werden.
- **Sicherheitskorrektur** — `EnforcementClient` erzeugt nicht mehr eine Platzhalter-Signatur `dev-bypass`, wenn das HMAC-Secret noch nicht konfiguriert ist; Anfragen schlagen jetzt sicher offen fehl (`ALLOW`, entsprechend der bestehenden Haltung „ein unkonfigurierter Connector blockiert niemals"), mit einer eigenen Log-Zeile, damit der Betrieb eine Installation mitten in der Einrichtung von einer vollständig unkonfigurierten unterscheiden kann.
- Behoben: Der Support-Endpunkt „Send diagnostics" rief den falschen Backend-Pfad auf (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Erstveröffentlichung
- MCP-Manifest-Endpunkt
- Webhook-Outbox mit Wiederholung/Backoff
- Agenten-Token-Verifizierung (Ed25519)
- HITL-Freigabe-Gate
- Admin-SPA-Dashboard

## Support

- Support-E-Mail: support@trusteed.xyz
- GitHub-Issues: [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## Lizenz

Open Software License 3.0 (OSL-3.0). Vollständiger Text siehe [LICENSE](LICENSE).
