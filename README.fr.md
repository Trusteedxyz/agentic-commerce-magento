[English](README.md) | [Español](README.es.md) | **Français** | [Deutsch](README.de.md)

# Trusteed Agentic Commerce pour Magento 2

Les agents IA sont un nouveau type d'acheteur en ligne. Avec Trusteed, le réseau qui met en relation les entreprises et les agents, ils peuvent acheter dans votre boutique selon vos conditions.

- Définissez vos règles métier : qui peut acheter, jusqu'à quel montant, quelles catégories vous ne proposez pas aux agents, des limites de prix, des niveaux de stock qui vous protègent des agents frauduleux, et plus encore.
- Recevez des reçus signés. Chaque transaction produit un reçu signé cryptographiquement, dont toute altération est détectable, que vous pouvez utiliser comme élément de preuve de l'achat en cas de litige. Aligné sur eIDAS (UE) et eSIGN (États-Unis).
- Voyez ce que font les agents : combien ils dépensent, ce qu'ils achètent et à quelle fréquence.
- Bloquez les agents qui semblent dangereux ou qui posent problème.
- Acceptez des achats en monnaies numériques grâce au protocole X402.
- Laissez agents et marchands échanger directement, de pair à pair.

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

Chaque commande initiée par un agent reçoit un reçu de confiance signé. Il est répertorié sous **Trusteed → Mis ventas → Recibos de venta**, avec son statut de vérification et son URI. De là, vous pouvez ouvrir le vérificateur public sur `receipts.trusteed.xyz`, ou coller le JWS directement dans l'outil **Trust Receipts** (voir ci-dessus) pour le vérifier.

## Fonctionnalités

- Point de terminaison MCP sur `/.well-known/mcp-manifest.json`, que les plateformes d'agents IA découvrent automatiquement.
- Outbox de webhooks : livraison fiable des commandes, des expéditions et des remboursements au backend Trusteed, avec réessai et backoff automatiques.
- Vérification du token de l'agent : valide l'identité de l'agent à chaque requête de checkout.
- Verrou d'application (HITL) : approbation humaine (human-in-the-loop) configurable pour les commandes d'agents de forte valeur.
- Trust Receipts : chaque transaction d'un agent produit un reçu signé cryptographiquement (Ed25519).
- Tableau de bord d'administration : un SPA qui affiche les sessions d'agents, les ventes, les règles et l'état de santé.
- Journal d'audit : chaque interaction d'un agent est enregistrée avec son identité et le verdict.

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
- Un compte Trusteed ([inscrivez-vous gratuitement sur trusteed.xyz](https://trusteed.xyz))

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

1. **Téléchargez le `.zip` installable** depuis la dernière Release GitHub :
   [**⬇ trusteed-agentic-commerce-magento-1.1.1.zip**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest/download/trusteed-agentic-commerce-magento-1.1.1.zip)
   ou parcourez toutes les versions sur la [page des Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Extrayez-le dans `app/code/Trusteed/AgenticCommerce/`
3. Exécutez les commandes ci-dessus depuis la racine de votre Magento

## Configuration

1. Connectez-vous à votre **Panneau d'administration** Magento
2. Allez dans **Trusteed → Configuración** (l'assistant de configuration)
3. Cliquez sur **Conectar con Trusteed →**. L'assistant teste la connexion et enregistre votre boutique
4. Sélectionnez les vues de boutique que vous souhaitez exposer aux agents IA
5. Cliquez sur **Guardar**

### Paramètres avancés

Allez dans **Stores → Configuration → Trusteed → Agentic Commerce** :

| Paramètre | Valeur par défaut | Description |
|---------|---------|-------------|
| API Base URL | `https://api.trusteed.xyz` | Point de terminaison du backend Trusteed |
| Webhook secret version | `1` | À faire tourner après compromission d'une clé |
| HITL enforcement mode | `observe` | `observe` se contente de journaliser ; `enforce` bloque les commandes au-delà du seuil |
| HITL amount threshold | `500.00` | Les commandes au-delà de cette valeur nécessitent une approbation humaine |
| Agent token TTL | `300` | Durée de vie maximale (en secondes) d'un token d'agent valide |

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

Pour supprimer les tables de la base de données :

```bash
bin/magento setup:db-declaration:generate-whitelist --module-name=Trusteed_AgenticCommerce
# Then manually drop: trusteed_webhook_outbox
# And columns on sales_order: trusteed_receipt_uri, trusteed_receipt_status
```

## Journal des modifications

### 1.1.1

- Correctif : la page « My Sales → Ventas » montait un placeholder statique (bloc Dashboard + `ventas.phtml`) qui n'atteignait jamais la vraie liste de TrustReceipts. Elle monte désormais le vrai SPA d'administration dans la section « Mis Ventas », comme Règles et Agents.
- Bundle du SPA d'administration reconstruit.

### 1.1.0

- Correctif : l'application des règles au checkout était entièrement ignorée pour les checkouts organiques (sans agent). Les règles du marchand, comme le montant maximal, les pays bloqués et les restrictions d'horaires d'ouverture, ne s'exécutaient que si un DID d'agent était présent. Ces règles s'appliquent désormais à chaque checkout, qu'un agent soit présent ou non.
- Ajout : un évaluateur de soupape de sécurité hors ligne qui applique localement les mêmes règles universelles du marchand lorsque l'API distante d'évaluation des règles est inaccessible, au lieu de se rabattre uniquement sur une politique générale qui autorise ou bloque tout.
- Correctif de sécurité : l'instantané d'application (enforcement snapshot) récupéré auprès du backend Trusteed est désormais vérifié cryptographiquement (contrôle de la signature Ed25519 par rapport au JWKS publié) avant d'être considéré comme fiable, au lieu d'être décodé sans vérification.
- Correctif de sécurité : `EnforcementClient` ne fabrique plus de signature `dev-bypass` de substitution lorsque le secret HMAC n'est pas encore configuré. Les requêtes échouent désormais de façon sûre et ouverte (`ALLOW`, conformément à la posture existante « un connecteur non configuré ne bloque jamais »), avec une ligne de log distincte pour que l'exploitation puisse distinguer une installation en cours de configuration d'une installation totalement non configurée.
- Correction du point de terminaison de support « Send diagnostics », qui appelait le mauvais chemin du backend (`/api/v1/embed/support/report` → `/v1/embed/support/report`).

### 1.0.0 (2026-06-18)

- Version initiale
- Point de terminaison du manifeste MCP
- Outbox de webhooks avec réessai/backoff
- Vérification du token d'agent (Ed25519)
- Verrou d'application HITL
- Tableau de bord d'administration SPA

## Support

- E-mail de support : support@trusteed.xyz
- Issues GitHub : [github.com/Trusteedxyz/agentic-commerce-magento/issues](https://github.com/Trusteedxyz/agentic-commerce-magento/issues)

## Licence

Open Software License 3.0 (OSL-3.0). Voir [LICENSE](LICENSE) pour le texte complet.
