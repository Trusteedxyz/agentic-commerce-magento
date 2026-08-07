[English](README.md) | [Español](README.es.md) | **Français** | [Deutsch](README.de.md)

# Trusteed Agentic Commerce pour Magento 2

Permettez aux nouveaux acheteurs en ligne, les agents d'IA, d'effectuer des achats dans votre boutique de manière sûre et fiable grâce à Trusteed : le réseau qui instaure la confiance entre les entreprises et les agents.

- **Définissez vos règles métier** : qui vous autorisez à acheter, jusqu'à quel montant, quelles catégories vous ne voulez pas proposer aux agents, fixez des limites de prix, maintenez des niveaux de stock pour vous protéger contre d'éventuels agents frauduleux, et bien plus encore.
- **Reçus infalsifiables** : nous générons des reçus signés électroniquement et cryptographiquement infalsifiables, qui font office de preuve de la transaction réelle en cas de litige. Compatible avec les réglementations eIDAS (UE, Royaume-Uni) et eSIGN (États-Unis).
- **Analytique des agents** : consultez des statistiques sur les achats des agents — combien ils dépensent, quels produits ils achètent et à quelle fréquence.
- **Blocage d'agents** : bloquez les agents potentiellement dangereux ou problématiques.
- **Monnaies numériques** : permet les achats en monnaies numériques grâce au protocole X402.
- **Transactions pair à pair** : permet le commerce direct de pair à pair entre agents et commerçants.

## Captures d'écran

| Tableau de bord | Ventes des agents | Règles métier |
|-----------|------------|----------------|
| ![Dashboard](docs/screenshots/screenshot-02-dashboard.png) | ![Sales](docs/screenshots/screenshot-04-ventas.png) | ![Rules](docs/screenshots/screenshot-05-rules.png) |

| Agents | Règles et options | Reçus de confiance |
|--------|----------------|----------------|
| ![Agents](docs/screenshots/screenshot-06-agentes.png) | ![Rules Detail](docs/screenshots/screenshot-07-rules-detail.png) | ![Trust Receipts](docs/screenshots/screenshot-08-trust-receipts.png) |

| Assistant de configuration | Configuration de l'assistant |
|-------------|-------------|
| ![Setup](docs/screenshots/screenshot-01-setup-wizard.png) | ![Config](docs/screenshots/screenshot-03-setup-wizard-config.png) |

| Ventes IA — Liste des reçus automatisés |
|--------------------------------------------|
| ![Liste des reçus](docs/screenshots/screenshot-09-receipts-list.png) |

Chaque commande initiée par un agent génère un reçu de confiance signé, répertorié sous **Trusteed → Mis ventas → Recibos de venta** avec son statut de vérification et son URI — lien vers le vérificateur public sur `receipts.trusteed.xyz`, ou collez le JWS directement dans l'outil **Trust Receipts** (voir ci-dessus) pour le vérifier.

## Fonctionnalités

- **Point de terminaison MCP** sur `/.well-known/mcp-manifest.json` — découvert automatiquement par les plateformes d'agents d'IA
- **File d'attente sortante de webhooks (outbox)** — livraison fiable des commandes/expéditions/remboursements au backend de Trusteed, avec réessai et backoff automatiques
- **Vérification du jeton de l'agent** — valide l'identité de l'agent à chaque requête de checkout
- **Verrou d'application (HITL)** — approbation humaine configurable (human-in-the-loop) pour les commandes d'agents de forte valeur
- **Trust Receipts** — chaque transaction d'un agent génère un reçu signé cryptographiquement (Ed25519)
- **Tableau de bord d'administration** — SPA affichant les sessions d'agents, les ventes, les règles et l'état de santé
- **Journal d'audit** — chaque interaction d'un agent est enregistrée avec son identité et le verdict

## Compatibilité

| Version de Magento | PHP | Statut |
|-----------------|-----|--------|
| Open Source 2.4.7 | 8.2, 8.3 | ✅ Pris en charge |
| Open Source 2.4.8 | 8.2, 8.3 | ✅ Pris en charge |
| Adobe Commerce 2.4.7 | 8.2, 8.3 | ✅ Pris en charge |
| Adobe Commerce 2.4.8 | 8.2, 8.3 | ✅ Pris en charge |

## Prérequis

- Magento Open Source ou Adobe Commerce 2.4.7+
- PHP 8.2 ou 8.3
- Un compte Trusteed — [inscrivez-vous gratuitement sur trusteed.xyz](https://trusteed.xyz)

## Installation

### Via Composer (recommandé)

```bash
composer require trusteed/agentic-commerce-magento
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Téléversement manuel

1. **Téléchargez le `.zip` installable** depuis la dernière GitHub Release :
   [**⬇ trusteed-agentic-commerce-magento-1.2.0.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.2.0.zip)
   — ou parcourez toutes les versions sur la [page des Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Extrayez-le dans `app/code/Trusteed/AgenticCommerce/`
3. Exécutez les commandes ci-dessus depuis la racine de votre Magento

## Configuration

1. Connectez-vous à votre **Panneau d'administration** Magento
2. Allez dans **Trusteed → Setup Wizard**
3. Renseignez votre **API Key** depuis [trusteed.xyz/dashboard/settings](https://trusteed.xyz/dashboard/settings)
4. Sélectionnez les vues de boutique que vous souhaitez exposer aux agents d'IA
5. Cliquez sur **Save & Verify** — l'assistant teste la connectivité et enregistre votre boutique

### Paramètres avancés

Accédez à **Stores → Configuration → Trusteed → Agentic Commerce** :

| Paramètre | Valeur par défaut | Description |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Point de terminaison du backend Trusteed |
| Webhook secret version | `1` | À faire tourner après compromission d'une clé |
| HITL enforcement mode | `observe` | `observe` se contente de journaliser ; `enforce` bloque les commandes au-delà du seuil |
| HITL amount threshold | `500.00` | Les commandes au-delà de cette valeur nécessitent une approbation humaine |
| Agent token TTL | `300` | Durée de vie maximale (en secondes) d'un jeton d'agent valide |

## Pages d'administration

Après l'installation, un menu **Trusteed** apparaît dans la barre latérale de l'administration Magento :

| Page | Chemin | Description |
|------|------|-------------|
| Dashboard | Trusteed → Dashboard | Vue d'ensemble en temps réel des sessions d'agents |
| Sales | Trusteed → Ventas | Commandes et reçus provenant des agents |
| Rules | Trusteed → Reglas | Règles d'application (basées sur CEL) |
| Agents | Trusteed → Agentes | Identités des agents connectés |
| Security | Trusteed → Seguridad | Journal d'audit et alertes d'anomalies |
| Settings | Trusteed → Ajustes | Configuration du module |

## Désinstallation

```bash
bin/magento module:disable Trusteed_AgenticCommerce
bin/magento setup:upgrade
composer remove trusteed/agentic-commerce-magento
```

Pour supprimer les tables de base de données :

```bash
bin/magento setup:db-declaration:generate-whitelist --module-name=Trusteed_AgenticCommerce
# Then manually drop: trusteed_webhook_outbox
# And columns on sales_order: trusteed_receipt_uri, trusteed_receipt_status
```

## Journal des modifications

### 1.2.0

- **Correctif de sécurité** — le vérificateur de jetons d'agent traitait `exp`, `iat` et `nonce` comme facultatifs. Les deux contrôles temporels dépendaient de `> 0`, si bien qu'un jeton qui omettait simplement le claim échappait entièrement à l'expiration et à la limite d'ancienneté : il restait valable indéfiniment. Les trois claims sont désormais obligatoires (`nonce` de 16 à 64 caractères), conformément au schéma canonique du jeton et aux autres connecteurs.
- **Correctif de sécurité** — la fenêtre de fraîcheur SIGNÉE de l'instantané d'enforcement (`validUntil`) était ignorée. Un instantané périmé — servi par l'API ou par tout intermédiaire qui le met en cache — était appliqué comme s'il était courant. Magento était le seul connecteur à ne pas le vérifier. Un instantané périmé est maintenant traité comme absent, de sorte que la politique de repli du marchand s'applique. `validUntil` voyage À L'INTÉRIEUR de la charge utile signée : personne ne peut l'allonger. Une valeur absente ou illisible n'est pas considérée comme périmée, car dégrader sur un format inattendu bloquerait des paiements légitimes.
- **Correctif** — les scores de confiance comportant une décimale s'affichaient comme « aucun score ». L'onglet Santé lisait le score avec `is_int()`, alors que le moteur arrondit à une décimale, que `json_decode` convertit en `float` PHP : `is_int(81.4)` est faux, donc le score devenait silencieusement `null`. Seuls les entiers survivaient. Mesuré sur les boutiques de production le 2026-07-27 : 44,7, 52,7, 55,7, 61,5 et 81,4 s'affichaient toutes comme « aucun score ». Le score passe désormais par un normaliseur unique et s'affiche avec sa décimale (`81.4`, pas `81`), comme dans toutes les autres interfaces.
- **Correctif** — la règle R036 (valeur maximale par ligne) lisait son plafond dans un paramètre nommé `maxCents` ; le nom canonique est `maxCentsPerLine`, seul accepté par le schéma strict du panneau marchand. Avec la mauvaise clé, la règle ne pouvait jamais se déclencher.
- **Nouveauté** — le connecteur déclare désormais quels signaux de panier cette installation sait projeter (`POST /api/v1/enforcement/capabilities`, signé en HMAC, envoyé une fois par version du jeu de capacités). Sans cela, une règle dont le signal n'arrive jamais renvoie `NO_SIGNAL` à chaque paiement : elle passe en silence, et le marchand voit une règle en ENFORCE qui ne bloque rien. Avec la déclaration, le panneau peut l'avertir au moment même de l'activation. Magento projette 31 signaux — plus du double de toute autre plateforme — car il projette aussi l'historique de l'agent, que le serveur résout ailleurs.

### 1.1.1

- **Correctif** — la page « Mes Ventes » montait un placeholder statique (bloc Dashboard + `ventas.phtml`) qui n'atteignait jamais la vraie liste de TrustReceipts. Elle monte désormais le vrai SPA d'administration dans la section « Mes Ventes », comme Règles et Agents.
- Bundle du SPA d'administration reconstruit.

### 1.1.0

- **Correctif** — l'application des règles au checkout était entièrement ignorée pour les checkouts organiques (sans agent) : les règles du marchand comme le montant maximum, les pays bloqués et les restrictions d'horaires d'ouverture ne s'exécutaient que si un DID d'agent était présent. Ces règles s'appliquent désormais à chaque checkout, indépendamment de la présence d'un agent.
- **Ajout** — un évaluateur de soupape de sécurité hors ligne qui applique les mêmes règles universelles du marchand localement lorsque l'API distante d'évaluation des règles est inaccessible, au lieu de se rabattre uniquement sur une politique globale d'autorisation/blocage.
- **Correctif de sécurité** — l'instantané d'application (enforcement snapshot) récupéré depuis le backend de Trusteed est désormais vérifié cryptographiquement (contrôle de signature Ed25519 par rapport au JWKS publié) avant d'être approuvé, au lieu d'être décodé sans vérification.
- **Correctif de sécurité** — `EnforcementClient` ne fabrique plus de signature `dev-bypass` de substitution lorsque le secret HMAC n'est pas encore configuré ; les requêtes échouent désormais de façon sûre et ouverte (`ALLOW`, conformément à la posture existante « un connecteur non configuré ne bloque jamais ») avec une ligne de log distincte permettant aux équipes d'exploitation de distinguer une installation en cours de configuration d'une installation totalement non configurée.
- Correction du point de terminaison de support « Send diagnostics » qui appelait le mauvais chemin backend (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Version initiale
- Point de terminaison de manifeste MCP
- File d'attente sortante de webhooks avec réessai/backoff
- Vérification du jeton d'agent (Ed25519)
- Verrou d'application HITL
- Tableau de bord d'administration SPA

## Support

- E-mail de support : support@trusteed.xyz
- Issues GitHub : [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## Licence

Open Software License 3.0 (OSL-3.0). Voir [LICENSE](LICENSE) pour le texte complet.
