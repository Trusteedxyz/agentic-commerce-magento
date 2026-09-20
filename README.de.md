[English](README.md) | [Español](README.es.md) | [Français](README.fr.md) | **Deutsch**

# Trusteed Agentic Commerce für Magento 2

KI-Agenten sind eine neue Art von Online-Käufern. Mit Trusteed, dem Netzwerk, das Unternehmen und Agenten verbindet, können sie zu Ihren Bedingungen in Ihrem Shop einkaufen.

- Legen Sie Ihre Geschäftsregeln fest: wer kaufen darf, bis zu welchem Betrag, welche Kategorien Sie Agenten nicht anbieten, Preisgrenzen, Lagerbestände, die Sie vor betrügerischen Agenten schützen, und mehr.
- Erhalten Sie signierte Belege. Jede Transaktion erzeugt einen kryptografisch signierten Beleg, an dem sich jede Manipulation erkennen lässt und den Sie im Streitfall als Nachweis des Kaufs verwenden können. An eIDAS (EU) und eSIGN (USA) ausgerichtet.
- Sehen Sie, was Agenten tun: wie viel sie ausgeben, was sie kaufen und wie oft.
- Sperren Sie Agenten, die gefährlich wirken oder Probleme verursachen.
- Nehmen Sie Agentenzahlungen in digitalen Währungen an. Das Trusteed-Netzwerk begleicht sie über das x402-Protokoll. Dieses Modul verarbeitet diese Zahlungen nicht selbst, Ihr Magento-Checkout bleibt also so, wie er heute ist. Die Zahlungswege werden auf der Trusteed-Seite konfiguriert und an das Admin-Panel zurückgemeldet.
- Lassen Sie Agenten über das Trusteed-Netzwerk in Ihrem Shop einkaufen. Es führt Identität, Regeln und Beleg zu jeder Bestellung mit. Die Zahlung läuft weiterhin über Ihre bestehenden Magento-Zahlungsarten.

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

Jede von einem Agenten ausgelöste Bestellung erzeugt einen signierten Trust Receipt, aufgeführt unter **Trusteed → Mis ventas → Recibos de venta** mit Verifizierungsstatus und Beleg-URI. Aus der Liste können Sie die Detailansicht eines Belegs öffnen, um seine Felder zu lesen und den rohen JWS zu kopieren. Für die eigenständige öffentliche Prüfung eines beliebigen JWS gibt es bislang keinen eigenen Endpunkt.

## Funktionen

- MCP-Endpunkt unter `/.well-known/mcp.json`: wird automatisch von KI-Agentenplattformen erkannt.
- Webhook-Outbox: zuverlässige Zustellung von Bestellungen, Versand und Rückerstattungen an das Trusteed-Backend, mit automatischem Wiederholungsversuch und Backoff.
- Agenten-Token-Verifizierung: prüft die Identität des Agenten bei jeder Checkout-Anfrage.
- Freigabe-Gate (HITL): löst die Regel R043 des Backends aus, wird die Bestellung zur Freigabe durch einen Menschen zurückgehalten, statt abgeschickt zu werden.
- Trust Receipts: jede Agententransaktion erzeugt einen mit Ed25519 signierten Beleg.
- Admin-Dashboard: eine SPA mit Agentensitzungen, Verkäufen, Regeln und Statusübersicht.
- Audit-Log: jede Interaktion eines Agenten wird mit Identität und Ergebnis protokolliert.

## Dokumentation

Die Handbücher liegen bislang nur auf Englisch und Spanisch vor:

- [Installationsanleitung (EN)](docs/INSTALLATION_GUIDE.md) ([ES](docs/INSTALLATION_GUIDE_ES.md)): Voraussetzungen, Installation, Verbindung, Überprüfung, Fehlersuche
- [Benutzerhandbuch (EN)](docs/USER_GUIDE.md) ([ES](docs/USER_GUIDE_ES.md)): täglicher Umgang mit dem Admin-Panel und den Geschäftsregeln
- [Referenzhandbuch (EN)](docs/REFERENCE_MANUAL.md) ([ES](docs/REFERENCE_MANUAL_ES.md)): Endpunkte, Konfigurationspfade, CLI-Befehle, Datenmodell

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

### Über Composer (von GitHub, noch kein Packagist-Eintrag)

Dieses Paket ist **noch nicht auf Packagist veröffentlicht**, daher kann Composer es
nicht allein über den Namen auflösen. Fügen Sie zuerst das Repository in die
`composer.json` Ihres Magento-Projekts ein:

```json
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/Trusteedxyz/agentic-commerce-magento" }
  ]
}
```

Danach installieren Sie es:

```bash
composer require trusteed/agentic-commerce-magento:^1.2
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Manueller Upload

1. **Laden Sie die installierbare `.zip`** von der
   [**⬇ neuesten GitHub Release**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest)
   herunter — die angehängte Datei heißt `trusteed-agentic-commerce-magento-<Version>.zip`.
   Alle veröffentlichten Versionen finden Sie auf der [Releases-Seite](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Entpacken Sie das Archiv nach `app/code/Trusteed/AgenticCommerce/`
3. Führen Sie die obigen `bin/magento`-Befehle im Root-Verzeichnis Ihres Magento aus

## Konfiguration

1. Melden Sie sich in Ihrem Magento-**Admin Panel** an
2. Gehen Sie zu **Trusteed → Configuración** (der Einrichtungsassistent)
3. Klicken Sie auf **Conectar con Trusteed →** und autorisieren Sie Ihren Shop im Popup-Fenster, das sich öffnet
4. Wählen Sie die Store-Ansichten aus, die Sie KI-Agenten zugänglich machen möchten
5. Klicken Sie auf **Guardar**

### Erweiterte Einstellungen

Gehen Sie zu **Stores → Configuration → Trusteed → Agentic Commerce**:

**API Connection** (`trusteed_general/general`):

| Einstellung | Beschreibung |
|---------|-------------|
| API Base URL | Endpunkt des Trusteed-Backends, z. B. `https://api.trusteed.xyz` |
| Merchant ID | Ihre Händlerkennung |
| Integration Token | Verschlüsselt. Authentifiziert diesen Shop gegenüber der Trusteed-API |
| Webhook Secret | Verschlüsselt. Prüft die Signaturen eingehender Webhooks |
| Internal HMAC Secret | Verschlüsselt. Signiert interne Heartbeat- und Admin-Aufrufe (Header `X-Trusteed-Connection-Id`, `X-Trusteed-Timestamp` und `X-Trusteed-Signature`, HMAC-SHA256); wird vom Trusteed-Betrieb bereitgestellt |
| Webhook Secret Version | Beim Rotieren des Webhook-Secrets hochzählen |
| Connection ID | Wird von Trusteed nach dem Verbinden des Shops ausgegeben; identifiziert diesen Shop bei der Webhook-Zustellung |

**Features** (`trusteed_general/features`):

| Einstellung | Beschreibung |
|---------|-------------|
| Enable WebMCP Bridge | Bindet die JavaScript-Bridge im Shop-Frontend ein. Bei Hyvä- und PWA-Studio-Themes automatisch deaktiviert |
| Enable Phase B (Embedded SPA) | Für ein künftiges Release reserviert — lassen Sie die Option aus, sofern der Trusteed-Support nichts anderes sagt |

Das Durchsetzungsverhalten (einschließlich des Human-in-the-Loop-Gates R043) wird hier nicht
konfiguriert: Es richtet sich nach den Regeln, die Sie unter **Trusteed → Mis Reglas** festlegen, und
nach dem signierten Regel-Snapshot, den das Backend ausliefert. Agenten-Tokens werden bis zu einem
Höchstalter von 330 Sekunden akzeptiert (zuzüglich einer Toleranz von 30 Sekunden auf `exp`); dieses
Zeitfenster ist im Konnektor fest hinterlegt und keine Einstellung.

## Admin-Seiten

Nach der Installation erscheint in der Seitenleiste des Magento-Admins ein **Trusteed**-Menü:

| Seite | Route | Beschreibung |
|------|------|-------------|
| Inicio | `trusteed/dashboard` | „Start“ — Übersicht über Agentensitzungen und Aktivität |
| ¿Cómo va mi tienda? | `trusteed/health` | „Wie läuft mein Shop?“ — Verbindungszustand und Trust Score |
| Mis ventas | `trusteed/ventas` | „Meine Verkäufe“ — von Agenten ausgelöste Bestellungen und ihre Trust Receipts |
| A quién le vendo | `trusteed/agentes` | „Wem ich verkaufe“ — von Ihrem Shop gesehene Agenten-Identitäten |
| Mis Reglas | `trusteed/reglas` | „Meine Regeln“ — Geschäftsregeln, die beim Checkout angewendet werden |
| Métodos de pago | `trusteed/pagos` | „Zahlungsarten“ — von Trusteed gemeldete Zahlungswege |
| Seguridad | `trusteed/seguridad` | „Sicherheit“ — Audit-Log und Anomalie-Warnungen |
| Ajustes | `trusteed/ajustes` | „Einstellungen“, Modulkonfiguration |
| Configuración | `trusteed/setup/wizard` | „Konfiguration“, Einrichtungsassistent (Shop verbinden / neu verbinden) |

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

## Das Dashboard zur Agenten-Bereitschaft

**Finden mich Agenten?** ist eine Seite in Ihrem Verwaltungsbereich, die eine
einzige Frage beantwortet: Wenn ein KI-Einkaufsagent Ihren Shop besucht, bekommt
er das, was Sie glauben, dass er bekommt?

Es wird nie eine einzelne Note angezeigt. Drei Spalten, die nicht gemittelt
werden, weil sie unterschiedliche Fragen beantworten und sich zu Recht
widersprechen können:

| Spalte | Was sie bedeutet |
| --- | --- |
| **Was ein Dritter sagt** | Das Urteil eines externen Scanners, wörtlich zitiert. Nie in eine eigene Skala übersetzt: Sobald man die Note eines anderen umrechnet, korrigiert man seine eigene Prüfung |
| **Stimmt überein, was Sie sagen, mit dem, was Sie tun?** | 16 Prüfungen, die das, was Ihr Shop **ankündigt**, mit dem vergleichen, was er **tatsächlich antwortet**. Genau das kann kein externer Scanner leisten: Es braucht Ihre Zugangsdaten |
| **Was wir gesehen haben** | Echter Agentenverkehr im gewählten Zeitraum: welche Agenten kamen, welche Werkzeuge sie nutzten, wie weit sie kamen und woran sie scheiterten |

Eine Prüfung, die nicht durchgeführt werden konnte, wird als **nicht geprüft**
ausgewiesen, mit Begründung. Sie wird nie stillschweigend verworfen und nie als
bestanden gewertet. «Wir konnten nicht nachsehen» und «wir haben nachgesehen und
es war in Ordnung» sind verschiedene Antworten, und die Seite sagt, welche gilt.

### Was jede Prüfung betrachtet

| Prüfung | Was sie erkennt |
| --- | --- |
| C1 | Sie kündigen Werkzeuge an, die Ihr Shop nicht bereitstellt |
| C2 | Sie kündigen ein Checkout-Protokoll an, dessen Endpunkt nicht antwortet |
| C3 | Der Katalogpreis ist nicht der berechnete Preis |
| C4 | Als verfügbar angekündigt, obwohl nicht verfügbar |
| C5 | Ihre Rückgaberichtlinie sagt je nach Quelle etwas anderes |
| C6 | Sie kündigen etwas als verfügbar an, das abgeschaltet ist |
| C7 | Aktivierte Regeln, die mangels Daten nicht greifen können |
| C8 | Ihre Regeln beobachten, blockieren aber nicht |
| C9 | Die angekündigte Authentifizierungsmethode funktioniert nicht |
| C10 | Ein Agent kann jeden Betrag ohne Ihre Bestätigung kaufen |
| C11 | Die Verkaufsstelle verwendet abgelaufene Regeln |
| C12 | Vorgänge ohne signierten Beleg |
| C13 | Angekündigte Adressen, die nicht funktionieren |
| C14 | Agenten sehen veraltete Daten Ihres Shops |
| C15 | Identitätsnachweise kurz vor Ablauf |
| C16 | Die zugesagte Lieferzeit ist nicht die eingehaltene |

Einige Prüfungen brauchen mehr als Ihre Einstellungen, und die Seite sagt es,
statt eine Lücke zu lassen:

- **Erfordert einen verbundenen Shop** (C3, C4, C5, C14): Sie vergleichen mit
  Ihrem echten Katalog, und ohne Zugangsdaten gibt es nichts zu vergleichen.
- **Erfordert ausgelieferte Bestellungen** (C16): Vergleicht Zusage und
  tatsächliche Einhaltung, was ohne Historie nicht möglich ist.
- **Diesmal gab es nichts zu vergleichen**: C12 etwa hat nichts zu prüfen, bevor
  ein Agent tatsächlich einen Kauf abgeschlossen hat. Das ist kein Durchfallen.

Die Prüfungen laufen einmal täglich, und die Seite zeigt das Ergebnis **mit
seinem Datum**, damit ein Urteil von gestern auch wie eines von gestern aussieht.
Ein gespeichertes «alles in Ordnung», das als aktuell dargestellt wird, wäre
genau die Selbsttäuschung, die diese Seite aufdecken soll.

## Änderungsprotokoll

### 1.3.3

- Neu: wenn eine Prüfung nicht durchgeführt werden konnte, erklärt das Panel jetzt, was sie freischalten würde (nichts zu tun, Einrichtung nötig, Daten stehen noch aus, oder eine unserer eigenen Prüfungen ist fehlgeschlagen) statt einer unerklärten grauen Liste.
- Neu: das Panel zeigt jetzt, welcher unserer Server Ihre Anfrage beantwortet hat, ein kurzes, undurchsichtiges Kürzel. Nützlich zum Vergleich mit dem, was der Support sieht; es verrät nie einen Hostnamen oder Dienstnamen.

### 1.3.2

- Neu: Unter Einstellungen wählen Sie jetzt aus, welche Werkzeuge Ihr Shop an Agenten ausliefert. Wenn Sie nie eine Liste gespeichert haben, sagt Ihnen das Panel, dass der ausgelieferte Umfang der Grundumfang der Plattform ist und nicht Ihre Wahl.
- Neu: eine Schaltfläche, um die Prüfung ohne Warten auf den täglichen Durchlauf zu wiederholen, und das Panel merkt sich, was sich seit der vorherigen Prüfung geändert hat.
- Geändert: unsere eigenen Störungen zählen nicht mehr als Abweichungen Ihres Shops. Das Panel trennt sie, weil Sie daran nichts ändern können.

### 1.3.1

- Behoben: Die Seite zur Agenten-Bereitschaft wurde ohne ihr Stylesheet ausgeliefert, sodass das Panel unformatiert dargestellt wurde.
- Behoben: Das Panel konnte die Oberfläche in einer Sprache und die Diagnose in einer anderen anzeigen. Die ermittelte Sprache wird jetzt zusammen mit den Texten weitergereicht, statt zweimal getrennt erkannt zu werden.
- Neu: Jeder Befund enthält einen Link dorthin, wo er behoben wird, und die Zusagen des Händlers (die Lieferzeit und die übrigen) erscheinen mit dem jeweils vorhandenen Beleg.
- Geändert: Ein Shop ohne bisherige Prüfung wird als „wird geprüft“ angezeigt statt als „wird einmal täglich geprüft“: Das Öffnen des Panels startet die erste Prüfung bereits im Hintergrund.

### 1.3.0

- Neu: Dashboard zur Agenten-Bereitschaft. *Finden mich Agenten?* ist jetzt im Verwaltungsbereich verfügbar. Es vergleicht, was Ihr Shop ankündigt, mit dem, was er tatsächlich antwortet, in **16 Prüfungen**, und zeigt alle sechzehn, nicht nur die fehlgeschlagenen. Eine Prüfung, die nicht laufen konnte, nennt den **Grund** (Shop nicht verbunden, noch keine ausgelieferten Bestellungen, diesmal nichts zu vergleichen), statt eine Lücke zu lassen, die wie ein Defekt wirkt. Siehe «Das Dashboard zur Agenten-Bereitschaft» oben.
- Behoben: die Diagnose wurde innerhalb der API auf Spanisch verfasst und unverändert angezeigt: Wer den Bereich auf Englisch nutzte, las englische Überschriften über spanischen Befunden. Die Prüfungen liefern jetzt sprachneutrale Codes, und der Text wird beim Ausliefern in Ihrer Sprache erzeugt.
- Behoben: Prüfung C1 («Sie kündigen Werkzeuge an, die Ihr Shop nicht bereitstellt») wertete den gesamten öffentlichen Katalog als bereitgestellt, wenn keine Werkzeugliste konfiguriert war: gemeldet wurden 46 von 48, tatsächlich liefert der Server 12. Der Fehler ging in die schmeichelhafte Richtung, genau die, die dieses Dashboard aufdecken soll.
- Behoben: Prüfung C6 («Sie kündigen etwas als verfügbar an, das abgeschaltet ist») meldete eine Funktion als abgeschaltet, sobald ihr Schalter nicht gesetzt war, auch bei Schaltern, die standardmäßig aktiv sind. Das war ein Fehlalarm in jedem Shop.

### 1.2.1

- Behoben: `bin/magento trusteed:check-webserver` meldete immer `FAIL`, selbst bei einem
  einwandfrei ausgelieferten Manifest. Der Befehl akzeptierte die Antwort nur, wenn sie einen
  Schlüssel `mcpVersion` auf oberster Ebene enthielt; das Manifest dieses Moduls hat einen solchen
  Schlüssel nie geführt (der Versionsschlüssel heißt `schema_version`), die Prüfung konnte also
  niemals bestehen. Händlern, die der Installationsanleitung folgten, wurde ein falsch
  konfigurierter Webserver gemeldet, obwohl er es nicht war.
- Behoben (Dokumentation): die README bewarb zwei Konfigurationsfelder, die es nicht gibt
  („HITL enforcement mode“, „HITL amount threshold“, R043 hat keinen konfigurierbaren
  Betragsschwellenwert), verschwieg sieben tatsächlich vorhandene und gab das Zeitfenster für
  Agenten-Tokens mit 300 statt 330 Sekunden an. Die Tabelle der Admin-Seiten führte sechs Seiten
  unter erfundenen englischen Namen auf; es sind neun, und das Menü ist auf Spanisch. Der Absatz zu
  den Trust Receipts verwies auf `receipts.trusteed.xyz`, einen Host, der nicht auflöst, und
  beschrieb das Einfügen eines JWS in ein Prüfwerkzeug, das nicht existiert. Die Punkte zu x402 und
  Peer-to-Peer versprachen Funktionen, die dieses Modul nicht umsetzt. Die Handbücher unter `docs/`
  waren von nirgendwo verlinkt, und ihre Referenzabschnitte beschrieben eine Manifest-Struktur,
  Webhook-Routen, eine Wiederholungsrichtlinie, einen CLI-Befehl und eine Frontend-Route, die nicht
  zum Code passten.

- Behoben: das Admin-Panel-Bundle (`view/adminhtml/web/js/admin-spa.js`) wurde unminifiziert ausgeliefert: 869 KB / 25.064 Zeilen statt der 490 KB / 41 Zeilen, die der dokumentierte Build-Befehl tatsächlich erzeugt. Die Herkunft ließ sich nicht verifizieren. Neu aus der Quelle gebaut.
- Behoben: die Regel R047 (Mindestbeitrag) hatte kein Formularfeld im Admin-Panel; ihre Parameter existierten im Schema, konnten aber nur über die API gesetzt werden. Ebenfalls: Beim Anzeigen eines Händler-Kategorienamens wurden die Anti-Injection-Trennzeichen (`<<<MERCHANT_CONTENT_START>>> … <<<MERCHANT_CONTENT_END>>>`) mit ausgegeben, statt sie für die Darstellung zu entfernen.
- Behoben (Dokumentation): `USER_GUIDE.md`/`USER_GUIDE_ES.md` beschrieben fünf von sechs Zeilen der Regel-Konfigurationstabelle mit der falschen Regel: Händlern wurde gesagt, `R007` zur Kategorie-Einschränkung zu konfigurieren (R007 blockiert tatsächlich Cross-Merchant-Missbrauchssignale) und `R005` als Betragsobergrenze (R005 blockiert tatsächlich widerrufene Agenten). Gegen die echten Regeldefinitionen korrigiert; `R030`/`R032`/`R035`/`R042` ergänzt, damit der Leitfaden beantwortet, was Händler tatsächlich fragen. Ebenfalls entfernt: die falsche Behauptung, R001/R007 würden "immer lokal ausgewertet" (der Offline-Evaluator löst neun andere Regeln auf, keine davon R001 oder R007) und die falsche Behauptung, R007 steuere die Katalogsichtbarkeit über ein Attribut `trusteed_agentic_visible` (das echte Attribut heißt `is_agentic_visible` und hat nichts mit einer CEL-Regel zu tun).

### 1.2.0

- Sicherheitsfix: der Agent-Token-Verifizierer behandelte `exp`, `iat` und `nonce` als optional. Beide Zeitprüfungen hingen an `> 0`, sodass ein Token, das den Claim schlicht wegließ, Ablauf und Höchstalter vollständig umging: es war für immer gültig. Alle drei Claims sind jetzt verpflichtend (`nonce` 16–64 Zeichen), passend zum kanonischen Token-Schema und zu den übrigen Konnektoren.
- Sicherheitsfix: das SIGNIERTE Frischefenster des Enforcement-Snapshots (`validUntil`) wurde ignoriert. Ein abgelaufener Snapshot (von der API oder von einem zwischenspeichernden Vermittler ausgeliefert) wurde angewendet, als wäre er aktuell. Magento war der einzige Konnektor, der das nicht prüfte. Ein abgelaufener Snapshot gilt nun als nicht vorhanden, sodass die Rückfallrichtlinie des Händlers greift. `validUntil` reist INNERHALB der signierten Nutzlast und lässt sich daher nicht verlängern; fehlt der Wert oder ist er nicht lesbar, gilt der Snapshot nicht als abgelaufen, bei einem unerwarteten Format zu degradieren würde legitime Bestellungen blockieren.
- Fix: Vertrauenswerte mit Dezimalstelle wurden als „kein Wert“ angezeigt. Der Health-Tab las den Wert mit `is_int()`, während die Engine auf eine Dezimalstelle rundet, was `json_decode` in einen PHP-`float` umsetzt: `is_int(81.4)` ist falsch, der Wert wurde also still zu `null`. Nur ganze Zahlen überlebten. Am 2026-07-27 über die Produktions-Shops gemessen: 44,7, 52,7, 55,7, 61,5 und 81,4 erschienen sämtlich als „kein Wert“. Der Wert läuft jetzt durch einen einzigen Normalisierer und wird mit seiner Dezimalstelle angezeigt (`81.4`, nicht `81`), genau wie in allen anderen Oberflächen.
- Fix: Regel R036 (maximaler Positionswert) las ihre Obergrenze aus einem Parameter namens `maxCents`; der kanonische Name lautet `maxCentsPerLine` und ist der einzige, den das strikte Schema des Händlerpanels akzeptiert. Mit dem falschen Schlüssel konnte die Regel nie auslösen.
- Neu: der Konnektor meldet jetzt, welche Warenkorb-Signale diese Installation projizieren kann (`POST /api/v1/enforcement/capabilities`, HMAC-signiert, einmal pro Version des Fähigkeitssatzes). Ohne das liefert eine Regel, deren Signal nie eintrifft, bei jedem Checkout `NO_SIGNAL`: sie passiert stillschweigend, und der Händler sieht eine Regel in ENFORCE, die nichts blockiert. Mit der Meldung kann das Panel bereits beim Aktivieren warnen. Magento projiziert 31 Signale (mehr als doppelt so viele wie jede andere Plattform) weil es zusätzlich die Agentenhistorie projiziert, die anderswo der Server auflöst.

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
