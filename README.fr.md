[English](README.md) | [Español](README.es.md) | **Français** | [Deutsch](README.de.md)

# Trusteed Agentic Commerce pour Magento 2

Permettez aux nouveaux acheteurs en ligne, les agents d'IA, d'effectuer des achats dans votre boutique de manière sûre et fiable grâce à Trusteed : le réseau qui instaure la confiance entre les entreprises et les agents.

- **Définissez vos règles métier** : qui vous autorisez à acheter, jusqu'à quel montant, quelles catégories vous ne voulez pas proposer aux agents, fixez des limites de prix, maintenez des niveaux de stock pour vous protéger contre d'éventuels agents frauduleux, et bien plus encore.
- **Reçus infalsifiables** : nous générons des reçus signés électroniquement et cryptographiquement infalsifiables, qui font office de preuve de la transaction réelle en cas de litige. Compatible avec les réglementations eIDAS (UE, Royaume-Uni) et eSIGN (États-Unis).
- **Analytique des agents** : consultez des statistiques sur les achats des agents — combien ils dépensent, quels produits ils achètent et à quelle fréquence.
- **Blocage d'agents** : bloquez les agents potentiellement dangereux ou problématiques.
- **Monnaies numériques** : le réseau Trusteed règle les paiements des agents via le protocole x402.
  Ce module ne traite pas ces paiements lui-même — votre tunnel de commande Magento reste exactement
  tel qu'il est aujourd'hui ; les rails sont configurés du côté de Trusteed, puis remontés au panneau
  d'administration.
- **Transactions entre agent et marchand** : les agents effectuent leurs achats auprès de votre
  boutique par l'intermédiaire du réseau Trusteed, qui porte l'identité, les règles et le reçu de
  chaque commande. Le règlement continue de passer par vos moyens de paiement Magento existants.

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

Chaque commande initiée par un agent génère un reçu de confiance signé, répertorié sous **Trusteed → Mis ventas → Recibos de venta** avec son statut de vérification et l'URI du reçu. Depuis la liste, vous pouvez ouvrir le détail d'un reçu pour consulter ses champs et copier le JWS brut. La vérification publique autonome d'un JWS quelconque ne dispose pas encore de point de terminaison dédié.

## Fonctionnalités

- **Point de terminaison MCP** sur `/.well-known/mcp.json` — découvert automatiquement par les plateformes d'agents d'IA
- **File d'attente sortante de webhooks (outbox)** — livraison fiable des commandes/expéditions/remboursements au backend de Trusteed, avec réessai et backoff automatiques
- **Vérification du jeton de l'agent** — valide l'identité de l'agent à chaque requête de checkout
- **Verrou d'application (HITL)** — lorsque la règle R043 du backend se déclenche, la commande est mise en attente d'une approbation humaine au lieu d'être soumise
- **Trust Receipts** — chaque transaction d'un agent génère un reçu signé cryptographiquement (Ed25519)
- **Tableau de bord d'administration** — SPA affichant les sessions d'agents, les ventes, les règles et l'état de santé
- **Journal d'audit** — chaque interaction d'un agent est enregistrée avec son identité et le verdict

## Documentation

Les manuels ne sont pas encore traduits en français ; les versions anglaise et espagnole sont les seules disponibles.

- [Guide d'installation](docs/INSTALLATION_GUIDE.md) ([ES](docs/INSTALLATION_GUIDE_ES.md)) — prérequis, installation, connexion, vérification, dépannage
- [Guide de l'utilisateur](docs/USER_GUIDE.md) ([ES](docs/USER_GUIDE_ES.md)) — utilisation quotidienne du panneau d'administration et des règles métier
- [Manuel de référence](docs/REFERENCE_MANUAL.md) ([ES](docs/REFERENCE_MANUAL_ES.md)) — points de terminaison, chemins de configuration, commandes CLI, modèle de données

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

### Via Composer (depuis GitHub, pas encore référencé sur Packagist)

Ce paquet **n'est pas encore publié sur Packagist**, Composer ne peut donc pas le
résoudre par son seul nom. Ajoutez d'abord le dépôt au `composer.json` de votre
projet Magento :

```json
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/Trusteedxyz/agentic-commerce-magento" }
  ]
}
```

Installez-le ensuite :

```bash
composer require trusteed/agentic-commerce-magento:^1.2
bin/magento module:enable Trusteed_AgenticCommerce
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento cache:flush
```

### Téléversement manuel

1. **Téléchargez le `.zip` installable** depuis la
   [**⬇ dernière GitHub Release**](https://github.com/Trusteedxyz/agentic-commerce-magento/releases/latest)
   — le fichier joint s'appelle `trusteed-agentic-commerce-magento-<version>.zip`.
   Toutes les versions publiées sont listées sur la [page des Releases](https://github.com/Trusteedxyz/agentic-commerce-magento/releases).
2. Extrayez-le dans `app/code/Trusteed/AgenticCommerce/`
3. Exécutez les commandes `bin/magento` ci-dessus depuis la racine de votre Magento

## Configuration

1. Connectez-vous à votre **Panneau d'administration** Magento
2. Allez dans **Trusteed → Configuración** (l'assistant de configuration)
3. Renseignez votre **API Key** depuis [trusteed.xyz/dashboard/settings](https://trusteed.xyz/dashboard/settings)
4. Sélectionnez les vues de boutique que vous souhaitez exposer aux agents d'IA
5. Cliquez sur **Save & Verify** — l'assistant teste la connectivité et enregistre votre boutique

### Paramètres avancés

Accédez à **Stores → Configuration → Trusteed → Agentic Commerce** :

**API Connection** (`trusteed_general/general`) :

| Paramètre | Description |
|---------|-------------|
| API Base URL | Point de terminaison du backend Trusteed, par exemple `https://api.trusteed.xyz` |
| Merchant ID | Votre identifiant de marchand |
| Integration Token | Chiffré. Authentifie cette boutique auprès de l'API Trusteed |
| Webhook Secret | Chiffré. Vérifie la signature des webhooks entrants |
| Internal HMAC Secret | Chiffré. Signe les appels internes de heartbeat et d'administration (`X-Internal-Auth`, HMAC-SHA256) ; fourni par l'équipe d'exploitation de Trusteed |
| Webhook Secret Version | À incrémenter lors de la rotation du secret de webhook |
| Connection ID | Émis par Trusteed une fois la boutique connectée ; identifie cette boutique dans la livraison des webhooks |

**Features** (`trusteed_general/features`) :

| Paramètre | Description |
|---------|-------------|
| Enable WebMCP Bridge | Injecte le pont JavaScript dans la vitrine. Désactivé automatiquement sur les thèmes Hyvä et PWA Studio |
| Enable Phase B (Embedded SPA) | Réservé à une version future — laissez cette option désactivée, sauf indication contraire du support Trusteed |

Le comportement d'application des règles (y compris le verrou human-in-the-loop R043) ne se configure
pas ici : il est piloté par les règles que vous définissez dans **Trusteed → Mis Reglas** et par
l'instantané de règles signé que sert le backend. Les jetons d'agent sont acceptés jusqu'à une
ancienneté maximale de 330 secondes (plus une tolérance de 30 secondes sur `exp`) ; cette fenêtre est
figée dans le connecteur, ce n'est pas un paramètre.

## Pages d'administration

Après l'installation, un menu **Trusteed** apparaît dans la barre latérale de l'administration Magento. Ses libellés s'affichent en espagnol — ce sont ceux que voit le marchand — avec leur traduction française entre guillemets :

| Page | Route | Description |
|------|------|-------------|
| Inicio | `trusteed/dashboard` | Vue d'ensemble des sessions et de l'activité des agents (« Accueil ») |
| ¿Cómo va mi tienda? | `trusteed/health` | Santé de la connexion et score de confiance (« Comment va ma boutique ? ») |
| Mis ventas | `trusteed/ventas` | Commandes provenant d'agents et leurs reçus de confiance (« Mes ventes ») |
| A quién le vendo | `trusteed/agentes` | Identités des agents vues par votre boutique (« À qui je vends ») |
| Mis Reglas | `trusteed/reglas` | Règles métier appliquées au checkout (« Mes règles ») |
| Métodos de pago | `trusteed/pagos` | Rails de paiement déclarés par Trusteed (« Moyens de paiement ») |
| Seguridad | `trusteed/seguridad` | Journal d'audit et alertes d'anomalies (« Sécurité ») |
| Ajustes | `trusteed/ajustes` | Configuration du module (« Réglages ») |
| Configuración | `trusteed/setup/wizard` | Assistant de configuration : connecter ou reconnecter la boutique (« Configuration ») |

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

## Le tableau de bord de préparation agentique

**Les agents me trouvent-ils ?** est une page de votre panneau d'administration
qui répond à une seule question : lorsqu'un agent d'achat IA visite votre
boutique, obtient-il ce que vous croyez qu'il obtient ?

Aucune note unique n'est affichée. Trois colonnes, jamais moyennées, car elles
répondent à des questions différentes et peuvent légitimement se contredire :

| Colonne | Ce que c'est |
| --- | --- |
| **Ce que dit un tiers** | Le verdict d'un scanner externe, cité tel quel. Jamais réinterprété dans une échelle qui serait la nôtre : dès que l'on convertit la note d'un autre, on corrige sa propre copie |
| **Ce que vous dites correspond-il à ce que vous faites ?** | 16 vérifications qui confrontent ce que votre boutique **annonce** à ce qu'elle **répond réellement**. C'est la partie qu'aucun scanner externe ne peut faire : elle exige vos identifiants |
| **Ce que nous avons vu passer** | Le trafic agentique réel sur la période choisie : quels agents sont venus, quels outils ils ont utilisés, jusqu'où ils sont allés et où ils ont échoué |

Une vérification qui n'a pas pu être faite est signalée comme **non vérifiée**,
avec son motif. Elle n'est jamais écartée en silence ni comptée comme réussie.
« Nous n'avons pas pu regarder » et « nous avons regardé et tout allait bien »
sont deux réponses distinctes, et la page indique laquelle s'applique.

### Ce que vérifie chaque contrôle

| Contrôle | Ce qu'il détecte |
| --- | --- |
| C1 | Vous annoncez des outils que votre boutique ne sert pas |
| C2 | Vous annoncez un protocole de paiement dont le point de terminaison ne répond pas |
| C3 | Le prix du catalogue n'est pas le prix facturé |
| C4 | Annoncé disponible alors que ce n'est pas le cas |
| C5 | Votre politique de retour dit des choses différentes selon la source |
| C6 | Vous annoncez comme disponible quelque chose qui est désactivé |
| C7 | Des règles activées qui ne peuvent pas agir faute de données |
| C8 | Vos règles observent mais ne bloquent pas |
| C9 | La méthode d'identification que vous annoncez ne fonctionne pas |
| C10 | Un agent peut acheter n'importe quel montant sans votre confirmation |
| C11 | Le point de vente utilise des règles expirées |
| C12 | Des opérations sans reçu signé |
| C13 | Des adresses annoncées qui ne fonctionnent pas |
| C14 | Les agents voient des données périmées de votre boutique |
| C15 | Des justificatifs d'identité sur le point d'expirer |
| C16 | Le délai de livraison promis n'est pas celui que vous tenez |

Certains contrôles ont besoin de plus que vos réglages, et la page le dit au lieu
de laisser un vide :

- **Nécessite une boutique connectée** (C3, C4, C5, C14) : ils comparent avec
  votre catalogue réel, et sans identifiants il n'y a rien à comparer.
- **Nécessite des commandes livrées** (C16) : il compare ce que vous promettez à
  ce que vous avez réellement tenu, ce qui est impossible sans historique.
- **Rien à comparer cette fois** : C12, par exemple, n'a rien à vérifier tant
  qu'un agent n'a pas réellement finalisé un achat. Ce n'est pas un échec.

Les contrôles s'exécutent une fois par jour et la page affiche le résultat **avec
sa date**, pour qu'un verdict d'hier ressemble à un verdict d'hier. Un « tout va
bien » mis en cache et présenté comme actuel serait exactement l'auto-illusion
que cette page existe pour débusquer.

## Journal des modifications

### 1.3.0

- **Nouveau — tableau de bord de préparation agentique.** *Les agents me trouvent-ils ?* arrive dans le panneau d'administration. Il confronte ce que votre boutique annonce à ce qu'elle répond réellement, en **16 vérifications**, et les affiche toutes les seize, pas seulement celles qui échouent. Une vérification impossible indique **pourquoi** (boutique non connectée, aucune commande livrée pour l'instant, rien à comparer cette fois) au lieu de laisser un vide qui ressemble à une panne. Voir « Le tableau de bord de préparation agentique » ci-dessus.
- **Corrigé** — le diagnostic était rédigé en espagnol dans l'API et affiché tel quel : un marchand utilisant le panneau en anglais lisait des titres anglais au-dessus de constats espagnols. Les vérifications émettent désormais des codes neutres et le texte est composé au moment de servir, dans votre langue.
- **Corrigé** — la vérification C1 (« vous annoncez des outils que votre boutique ne sert pas ») considérait tout le catalogue public comme servi en l'absence de liste configurée : elle annonçait 46 sur 48 alors que le serveur en sert 12. L'erreur allait dans le sens flatteur, précisément celui que ce tableau de bord doit débusquer.
- **Corrigé** — la vérification C6 (« vous annoncez comme disponible quelque chose qui est désactivé ») signalait une capacité comme désactivée dès que son indicateur n'était pas défini, y compris pour ceux activés par défaut. C'était une fausse alerte sur toutes les boutiques.

### 1.2.1

- **Corrigé** — `bin/magento trusteed:check-webserver` renvoyait toujours `FAIL`, même face à un
  manifeste parfaitement servi. La commande n'acceptait la réponse que si celle-ci comportait une clé
  `mcpVersion` de premier niveau ; or le manifeste émis par ce module n'en a jamais eu (sa clé de
  version est `schema_version`), de sorte que le contrôle ne pouvait pas réussir. Les marchands qui
  suivaient le guide d'installation s'entendaient dire que leur serveur web était mal configuré
  alors qu'il ne l'était pas.
- **Corrigé — documentation** — le README annonçait deux champs de configuration qui n'existent pas
  (« HITL enforcement mode » et « HITL amount threshold » — R043 n'a aucun seuil de montant
  configurable), en omettait sept qui existent bel et bien, et donnait la fenêtre du jeton d'agent
  à 300 secondes au lieu de 330. Le tableau des pages d'administration en listait six sous des noms
  anglais inventés ; il y en a neuf, et le menu est en espagnol. Le paragraphe sur les reçus de
  confiance renvoyait vers `receipts.trusteed.xyz`, un hôte qui ne résout pas, et décrivait le
  collage d'un JWS dans un outil de vérification qui n'existe pas. Les puces x402 et pair à pair
  promettaient des capacités que ce module n'implémente pas. Enfin, les manuels situés dans `docs/`
  n'étaient référencés depuis aucune page, et leurs sections de référence décrivaient une forme de
  manifeste, des routes de webhook, une politique de réessai, une commande CLI et une route frontend
  qui ne correspondaient pas au code.

- **Corrigé** — le bundle du panneau d'administration (`view/adminhtml/web/js/admin-spa.js`) était distribué non minifié : 869 Ko / 25 064 lignes au lieu des 490 Ko / 41 lignes que produit réellement la commande de build documentée. Sa provenance ne pouvait pas être vérifiée. Reconstruit depuis la source.
- **Corrigé** — la règle R047 (montant minimum de contribution) n'avait pas de champ de formulaire dans le panneau d'administration ; ses paramètres existaient dans le schéma mais ne pouvaient être définis que via l'API. Également : l'affichage du nom d'une catégorie marchande imprimait les délimiteurs anti-injection (`<<<MERCHANT_CONTENT_START>>> … <<<MERCHANT_CONTENT_END>>>`) autour, au lieu de les retirer pour l'affichage.
- **Corrigé — documentation** — `USER_GUIDE.md`/`USER_GUIDE_ES.md` décrivaient cinq des six lignes du tableau de configuration des règles avec la mauvaise règle : indiquait au marchand de configurer `R007` pour restreindre les catégories (R007 bloque en réalité les signaux d'abus inter-marchands) et `R005` comme plafond de montant (R005 bloque en réalité les agents révoqués). Corrigé par rapport aux définitions réelles des règles ; `R030`/`R032`/`R035`/`R042` ajoutées pour que le guide réponde à ce que les marchands demandent réellement. Retiré également la fausse affirmation que R001/R007 sont "toujours évaluées localement" (l'évaluateur hors ligne résout neuf règles différentes, aucune n'étant R001 ni R007) et la fausse affirmation que R007 contrôle la visibilité du catalogue via un attribut `trusteed_agentic_visible` (l'attribut réel est `is_agentic_visible`, sans rapport avec une quelconque règle CEL).

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
