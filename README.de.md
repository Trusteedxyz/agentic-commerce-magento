[English](README.md) | [Español](README.es.md) | [Français](README.fr.md) | **Deutsch**

# Trusteed Agentic Commerce für Magento 2

KI-Agenten sind eine neue Art von Online-Käufern. Mit Trusteed, dem Netzwerk, das Unternehmen und Agenten verbindet, können sie zu Ihren Bedingungen in Ihrem Shop einkaufen.

- Legen Sie Ihre Geschäftsregeln fest: wer kaufen darf, bis zu welchem Betrag, welche Kategorien Sie Agenten nicht anbieten, Preisgrenzen, Lagerbestände, die Sie vor betrügerischen Agenten schützen, und mehr.
- Erhalten Sie signierte Belege. Jede Transaktion erzeugt einen kryptografisch signierten Beleg, an dem sich jede Manipulation erkennen lässt und den Sie im Streitfall als Nachweis des Kaufs verwenden können. An eIDAS (EU) und eSIGN (USA) ausgerichtet.
- Sehen Sie, was Agenten tun: wie viel sie ausgeben, was sie kaufen und wie oft.
- Sperren Sie Agenten, die gefährlich wirken oder Probleme verursachen.
- Nehmen Sie Käufe in digitalen Währungen über das X402-Protokoll an.
- Lassen Sie Agenten und Händler direkt miteinander handeln, Peer-to-Peer.

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

Jede von einem Agenten ausgelöste Bestellung erhält einen signierten Trust Receipt. Er steht unter **Trusteed → Mis ventas → Recibos de venta**, mit Verifizierungsstatus und Beleg-URI. Von dort können Sie den öffentlichen Prüfer unter `receipts.trusteed.xyz` öffnen oder den JWS direkt in das **Trust Receipts**-Tool (siehe oben) einfügen, um ihn zu prüfen.

## Funktionen

- MCP-Endpunkt unter `/.well-known/mcp-manifest.json`, den KI-Agentenplattformen automatisch erkennen.
- Webhook-Outbox: zuverlässige Zustellung von Bestellungen, Sendungen und Rückerstattungen an das Trusteed-Backend, mit automatischem Wiederholungsversuch und Backoff.
- Verifizierung des Agenten-Tokens: prüft bei jeder Checkout-Anfrage die Identität des Agenten.
- Freigabeschranke (HITL): konfigurierbare Human-in-the-Loop-Freigabe für hochwertige Agentenbestellungen.
- Trust Receipts: Jede Agententransaktion erzeugt einen kryptografisch signierten Beleg (Ed25519).
- Admin-Dashboard: eine SPA mit Agentensitzungen, Verkäufen, Regeln und Statusübersicht.
- Audit-Log: Jede Interaktion eines Agenten wird mit Identität und Ergebnis protokolliert.

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
- Ein Trusteed-Konto ([kostenlos registrieren auf trusteed.xyz](https://trusteed.xyz))

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

1. **Laden Sie die installierbare `.zip`** aus dem neuesten GitHub-Release herunter:
   [**⬇ trusteed-agentic-commerce-magento-1.1.1.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.1.1.zip)
   oder durchsuchen Sie alle Versionen auf der [Releases-Seite](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Entpacken Sie das Archiv nach `app/code/Trusteed/AgenticCommerce/`
3. Führen Sie die obigen Befehle im Root-Verzeichnis Ihres Magento aus

## Konfiguration

1. Melden Sie sich in Ihrem Magento-**Admin Panel** an
2. Gehen Sie zu **Trusteed → Configuración** (dem Einrichtungsassistenten)
3. Klicken Sie auf **Conectar con Trusteed →**. Der Assistent testet die Verbindung und registriert Ihren Shop
4. Wählen Sie die Store-Ansichten aus, die Sie KI-Agenten zugänglich machen möchten
5. Klicken Sie auf **Guardar**

### Erweiterte Einstellungen

Gehen Sie zu **Stores → Configuration → Trusteed → Agentic Commerce**:

| Einstellung | Standardwert | Beschreibung |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Endpunkt des Trusteed-Backends |
| Webhook secret version | `1` | Nach Kompromittierung eines Schlüssels rotieren |
| HITL enforcement mode | `observe` | `observe` protokolliert nur; `enforce` blockiert Bestellungen oberhalb des Schwellenwerts |
| HITL amount threshold | `500.00` | Bestellungen oberhalb dieses Werts erfordern eine menschliche Freigabe |
| Agent token TTL | `300` | Maximales Alter (in Sekunden) eines gültigen Agenten-Tokens |

## Admin-Seiten

Nach der Installation erscheint in der Seitenleiste des Magento-Admins ein **Trusteed**-Menü:

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

### 1.1.1

- Fix: Die Seite „My Sales → Ventas“ band einen statischen Platzhalter ein (Dashboard-Block + `ventas.phtml`), der nie die echte TrustReceipt-Liste erreichte. Sie bindet jetzt das echte Admin-SPA im Bereich „Mis Ventas“ ein, genau wie Regeln und Agenten.
- Admin-SPA-Bundle neu gebaut.

### 1.1.0

- Fix: Die Checkout-Durchsetzung wurde bei organischen Checkouts (ohne Agent) komplett übersprungen. Händlerregeln wie Höchstbetrag, gesperrte Länder und Geschäftszeiten-Beschränkungen liefen nur, wenn eine Agenten-DID vorhanden war. Diese Regeln gelten jetzt bei jedem Checkout, unabhängig davon, ob ein Agent beteiligt ist.
- Neu: ein Offline-Sicherheitsventil-Evaluator, der dieselben universellen Händlerregeln lokal durchsetzt, wenn die entfernte API zur Regelauswertung nicht erreichbar ist, statt nur auf eine pauschale Erlauben-/Blockieren-Richtlinie zurückzufallen.
- Sicherheitsfix: Der vom Trusteed-Backend abgerufene Enforcement-Snapshot wird jetzt kryptografisch verifiziert (Ed25519-Signaturprüfung gegen den veröffentlichten JWKS), bevor ihm vertraut wird, statt ohne Verifizierung dekodiert zu werden.
- Sicherheitsfix: `EnforcementClient` erzeugt keine Platzhalter-Signatur `dev-bypass` mehr, wenn das HMAC-Secret noch nicht konfiguriert ist. Anfragen schlagen jetzt sicher offen fehl (`ALLOW`, entsprechend der bestehenden Haltung „ein unkonfigurierter Connector blockiert nie“), mit einer eigenen Log-Zeile, damit der Betrieb eine Installation mitten in der Einrichtung von einer vollständig unkonfigurierten unterscheiden kann.
- Behoben: Der Support-Endpunkt „Send diagnostics“ rief den falschen Backend-Pfad auf (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Erstveröffentlichung
- MCP-Manifest-Endpunkt
- Webhook-Outbox mit Wiederholung/Backoff
- Agenten-Token-Verifizierung (Ed25519)
- HITL-Freigabeschranke
- Admin-SPA-Dashboard

## Support

- Support-E-Mail: support@trusteed.xyz
- GitHub-Issues: [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## Lizenz

Open Software License 3.0 (OSL-3.0). Den vollständigen Text finden Sie in [LICENSE](LICENSE).
