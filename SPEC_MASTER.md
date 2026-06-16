# SPEC MASTER

Ce fichier est la reference officielle du projet dans le repo.

Il contient le cahier des charges complet du portail de jeux HTML5/WebGL gratuits specialises dans les jeux difficiles, rage games, die & retry et jeux impossibles.

Regles de statut :

- Ce fichier ne doit pas etre modifie sans validation explicite.
- Le contenu du chat ne remplace jamais ce fichier.
- A chaque nouveau chat Codex, il faut lire `SPEC_MASTER.md`, `ROADMAP.md` et `CURRENT_STEP.md` avant de travailler.
- Le travail doit suivre uniquement l'etape indiquee dans `CURRENT_STEP.md`.
- Aucune etape ne doit etre consideree comme terminee sans validation explicite.

## 0. Memoire Projet Dans Le Repo

Avant toute initialisation technique ou generation de code applicatif, le repo doit contenir :

- `SPEC_MASTER.md`
- `ROADMAP.md`
- `CURRENT_STEP.md`

Roles :

- `SPEC_MASTER.md` contient le cahier des charges complet du projet et sert de reference permanente.
- `ROADMAP.md` contient l'ordre de developpement valide et evite de melanger les phases.
- `CURRENT_STEP.md` indique l'etape actuelle, ce qui est autorise, ce qui est interdit, le statut et la prochaine etape prevue apres validation.

## 1. Contexte Produit

Le projet est un portail de jeux HTML5/WebGL gratuits specialises dans :

- jeux difficiles ;
- jeux frustrants ;
- die & retry ;
- rage games ;
- plateformes hardcore ;
- jeux a pieges ;
- jeux impossibles.

Le site ne developpera pas ses propres jeux.
Le site n'hebergera pas localement les fichiers des jeux.

Les jeux seront integres plus tard via des providers officiels HTML5/WebGL, probablement par :

- iframe ;
- embed link ;
- feed JSON/XML ;
- API.

Providers envisages plus tard :

- GamePix ;
- Gamezop ;
- GameDistribution ;
- ou equivalent.

Dans la premiere phase, aucun vrai provider ne doit etre branche.
Le site doit etre construit avec un catalogue placeholder propre, afin de pouvoir etre presente aux providers comme une plateforme deja prete.

Le dernier grand bloc du projet sera seulement :

- integration vraie API/feed provider ;
- remplacement du catalogue placeholder par les vrais jeux ;
- activation progressive de la publicite reelle.

La niche rage games / jeux impossibles ne doit pas dependre d'une categorie brute fournie par un provider. Elle doit etre construite par curation editoriale interne avec categories, tags, niveaux de difficulte et criteres de selection propres au site.

## Etape Exceptionnelle 18B - Integration Manuelle De Liens Embed Reels Valides

Une pause controlee de la roadmap est autorisee entre l'etape 18 - Help Center et l'etape 19 - Pages legales.

Objectif :

- integrer manuellement des liens embed reels uniquement s'ils sont explicitement fournis et valides par le porteur du projet ;
- tester progressivement le comportement des pages jeux avec des `embedUrl` renseignes ;
- conserver le catalogue placeholder comme base tant que l'integration provider officielle n'est pas encore branchee.

Contraintes :

- seuls les liens embed explicitement fournis par le porteur du projet peuvent etre integres ;
- l'etape 18B peut autoriser l'utilisation d'images provider distantes uniquement si leurs URLs sont explicitement fournies par le porteur du projet depuis une page partenaire/provider validee ;
- ces images ne doivent pas etre telechargees, rehostees, modifiees ou transferees vers Cloudinary ;
- le site doit conserver un fallback placeholder pour les jeux sans image provider ;
- aucun scraping n'est autorise ;
- aucune API provider, feed JSON/XML ou integration automatisee ne doit etre branchee a cette etape ;
- aucune image externe non autorisee ne doit etre utilisee ;
- aucune publicite reelle ne doit etre activee ;
- aucun analytics ne doit etre ajoute ;
- aucun changement de modele economique ne doit etre fait ;
- aucune modification de page existante ne doit etre effectuee sans validation explicite ;
- `src/data/games.ts` ne doit etre modifie que plus tard, uniquement apres validation explicite et uniquement pour les jeux/liens fournis ;
- la page `/juegos/[slug]` ne doit etre modifiee que si necessaire, apres verification et validation explicite.

Verification a prevoir :

- verifier si les pages jeux gerent correctement les iframes quand `embedUrl` est renseigne ;
- verifier l'affichage du placeholder quand `embedUrl` reste `null` ;
- verifier que l'integration reste compatible avec le positionnement V1 sans compte utilisateur.

Point RGPD :

- les iframes providers peuvent avoir un impact sur les cookies, traceurs ou contenus tiers ;
- cet impact devra etre traite plus tard a l'etape 20 - Cookie consent ;
- aucune gestion cookies supplementaire ne doit etre improvisee pendant l'etape 18B sans validation explicite.

Etat valide a la cloture de l'etape 18B :

- l'integration manuelle du catalogue est terminee cote donnees ;
- le catalogue contient 23 jeux reels avec `embedUrl` valide ;
- les jeux fictifs et placeholders ont ete supprimes de `src/data/games.ts` ;
- les donnees fictives de leaderboards et de local-stats ont ete videes ;
- aucune donnee fictive ne doit etre recreee pour remplacer ces donnees.

## Etape Exceptionnelle 18C - Stabilisation Pre-Prod Du Catalogue Reel

Une mini-etape de stabilisation est inseree entre l'etape 18B et l'etape 19 - Pages legales.

Objectif :

- stabiliser les pages publiques apres le passage a un catalogue compose uniquement de jeux reels ;
- corriger les incoherences visibles sans creer de donnees fictives, de backend ou d'analytics ;
- preparer le site pour l'etape 19 sans commencer les pages legales.

Travaux autorises :

- creer `/populares` avec un etat vide honnete, sans popularite globale artificielle ;
- creer `/aleatorio` avec une redirection vers un jeu reel choisi aleatoirement dans le catalogue actuel ;
- nettoyer les textes publics obsoletes lies aux jeux placeholders, fictifs, integrations pending ou providers a venir ;
- masquer ou clarifier les statistiques indisponibles : `averageRetryTime` a `null`, `rating` a `0` et `playCount` a `0` ;
- ajouter un etat vide propre sur `/clasificaciones` lorsque les tableaux de leaderboards sont vides.

Contraintes :

- ne pas modifier `src/data/games.ts` sauf validation explicite d'une correction technique strictement necessaire ;
- ne creer aucune donnee fictive, aucun score artificiel et aucune popularite globale fictive ;
- ne pas ajouter de backend, d'analytics ou de nouvelle dependance ;
- ne pas traiter `/contacto`, `/sobre-nosotros`, `/privacidad`, `/cookies` ou `/terminos`, qui restent reserves a l'etape 19 ;
- ne pas traiter le consentement des iframes providers ni leur impact RGPD, qui restent reserves a l'etape 20 ;
- ne pas commencer automatiquement l'etape 19 ou l'etape 20.

## 2. Positionnement

Le site est un portail de jeux gratuits difficiles, frustrants, exigeants et memorables, jouables instantanement dans le navigateur.

Positionnement :

- rage games gratuits ;
- jeux impossibles ;
- die & retry ;
- plateformes hardcore ;
- jeux a pieges ;
- jeux de reflexes ;
- skill games ;
- navigateur uniquement ;
- no download ;
- mobile-first quand le gameplay le permet ;
- experience simple, rapide et directe ;
- catalogue moderne et curate ;
- SEO propre ;
- design premium, actuel, inspire des tendances 2026/2027 ;
- retention legere sans compte utilisateur en V1 : favoris locaux, historique local, continue playing local, scores locaux, badges locaux.

Marches vises en V1 :

- Espagne ;
- LATAM ;
- langue espagnole uniquement.

Important :

- Pour la V1, pas de multilingue.
- Pas de EN / FR en V1.
- Tout le site doit etre pense en espagnol.

Positionnement editorial en espagnol :

Le site doit parler de jeux difficiles avec un ton direct, energique et moderne, sans agressivite excessive.

Lexique possible :

- juegos imposibles ;
- rage games ;
- juegos dificiles ;
- juegos frustrantes ;
- die & retry ;
- plataformas hardcore ;
- juegos con trampas ;
- retos rapidos ;
- juegos de habilidad ;
- solo un intento mas ;
- vuelve a intentarlo.

## 3. Stack Technique Validee

Stack obligatoire :

- Next.js ;
- TypeScript ;
- Tailwind CSS ;
- MongoDB ;
- VPS Hostinger deja disponible : VM2 ;
- Umami self-hosted pour l'analytics, mais seulement a partir de l'etape prevue ;
- MongoDB Atlas Free Cluster / ancien M0 pour demarrer ;
- Cloudinary ou autre provider images : a decider plus tard seulement si necessaire.

Contraintes :

- Ne pas proposer d'autre stack sauf demande explicite.
- Ne pas changer la stack.
- Auth.js / NextAuth n'est pas prevu en V1.
- L'authentification, les comptes utilisateurs, les profils, les favoris synchronises et l'historique multi-device sont repousses a une V1.5 ou version ulterieure.

## 3B. Decisions Techniques Validees

### Images Et Thumbnails Placeholder

- Pour la phase placeholder, ne pas utiliser Cloudinary.
- Utiliser en priorite des placeholders locaux generes en SVG/CSS avec gradients gaming.
- Les placeholders doivent evoquer l'univers rage games : danger, pieges, plateformes, spikes, neons, retry, difficulte.
- `picsum.photos` peut etre utilise uniquement temporairement en developpement si validation explicite.
- Ne jamais utiliser d'images recuperees depuis Minijuegos, Friv, Plays.org ou autres sites tiers.
- Ne pas utiliser de thumbnails de vrais jeux providers avant autorisation.
- Cloudinary ou autre provider images sera decide plus tard seulement si necessaire.

### Authentification

- Aucune authentification en V1.
- Ne pas installer Auth.js / NextAuth.
- Ne pas creer de pages login, register, forgot password ou profil utilisateur.
- Ne pas creer de systeme de compte.
- Ne pas creer de modele User en V1.
- Toute logique liee aux comptes utilisateurs est repoussee a une V1.5.

### Stockage Local V1

- Les favoris doivent etre stockes localement via `localStorage`.
- Les recently played doivent etre stockes localement via `localStorage`.
- Le continue playing doit etre stocke localement via `localStorage`.
- Les scores personnels peuvent etre stockes localement si necessaire.
- Les badges peuvent etre stockes localement si necessaire.
- Aucune synchronisation multi-device en V1.

### MongoDB

- Choix valide pour demarrer : MongoDB Atlas Free Cluster / ancien M0.
- Utiliser une variable d'environnement `MONGODB_URI`.
- Ne jamais hardcoder l'URL de connexion.
- Ne pas self-hoster MongoDB sur le VPS en V1 sauf validation explicite.
- MongoDB servira principalement aux donnees catalogue, categories, scores/leaderboards si valides plus tard et futures integrations provider.
- Ne pas creer de modele utilisateur en V1.

### Analytics

- Choix valide pour la V1 : Umami self-hosted sur VPS.
- Aucun analytics reel ne doit etre integre avant l'etape prevue dans la roadmap.
- Prevoir une couche d'evenements produit compatible avec Umami.
- Le tracking doit rester compatible RGPD et respecter la gestion du consentement si necessaire.

## 4. Design Et Direction Artistique

Le site doit suivre une direction artistique moderne proche d'un portail gaming premium specialise dans les jeux difficiles.

Direction visuelle :

- dark mode ;
- neons / gradients violet / bleu / cyan / rouge ;
- touches visuelles danger / glitch / retry ;
- glassmorphism leger ;
- cards arrondies ;
- interface moderne ;
- homepage riche facon portail catalogue ;
- mobile-first ;
- UX claire ;
- gros hero visuel ;
- sections de jeux ;
- recherche visible ;
- categories rapides ;
- favoris locaux ;
- recently played local ;
- continue playing local ;
- scores locaux ;
- temps personnels locaux ;
- nombre d'essais local si disponible ;
- leaderboards simples placeholder ou anonymes ;
- badges legers locaux ;
- top categories ;
- emplacements pub prevus mais non actifs au debut.

Reference visuelle validee :

- header avec logo, navigation, search ;
- hero "juegos imposibles / juega gratis / sin descarga" ;
- categories en chips ;
- sections "Juegos imposibles", "Rage games populares", "Die & Retry", "Plataformas hardcore", "Retos rapidos" ;
- cards de jeux modernes ;
- indicateurs de difficulte ;
- classement simple ;
- footer complet ;
- help center ;
- pages legales.

Le design doit etre premium, pas cheap.
Le theme rage/difficulte doit etre present sans rendre l'interface illisible ou agressive.

## 5. Modele Economique

Les utilisateurs ne paient pas.

Interdits :

- systeme de paiement ;
- Stripe ;
- PayPal cote utilisateur ;
- abonnement ;
- panier ;
- compte premium.

Modele economique prevu :

- publicite ;
- revenus eventuels via les providers selon leurs conditions ;
- monetisation activee seulement plus tard.

Le layout doit prevoir des emplacements publicitaires propres des le depart.

Au debut :

- `AdSlot` placeholder seulement ;
- pas de vraie pub agressive ;
- pas de regie publicitaire reelle sans validation explicite ;
- pas de header bidding ;
- pas d'ad refresh avance ;
- pas de rewarded ads.

## 6. Objectif Avant De Contacter Les Providers

Le site doit etre pret a environ 99 % avant de contacter les providers.

Avant contact providers, le site doit deja avoir :

- homepage complete ;
- pages categories ;
- pages jeux placeholder ;
- favoris locaux ;
- recently played local ;
- continue playing local ;
- scores personnels locaux ;
- meilleurs temps personnels locaux si pertinent ;
- nombre d'essais local si pertinent ;
- leaderboards simples placeholder ou anonymes ;
- badges legers locaux ;
- recherche ;
- filtres ;
- filtres par difficulte ;
- filtres par type de controles ;
- filtres mobile OK / desktop recommande ;
- help center ;
- pages legales ;
- cookie consent pret ;
- analytics prevu ou active proprement ;
- emplacements publicitaires placeholders ;
- SEO technique ;
- donnees structurees pertinentes ;
- preparation visibilite IA / LLM SEO / GEO ;
- sitemap ;
- robots.txt ;
- `llms.txt` prevu a l'etape SEO avancee ;
- deploiement sur domaine reel ;
- design propre ;
- mobile-first.

Important :

- Les elements SEO avances, donnees structurees, sitemap, robots.txt, llms.txt et preparation visibilite IA / LLM SEO / GEO doivent etre traites uniquement aux etapes prevues dans la roadmap.
- Ils ne doivent pas etre implementes avant ces etapes.

Le seul gros element manquant avant providers sera :

- vrai catalogue de jeux ;
- vraies `embedUrl` ;
- vraie API/feed provider.

Elements explicitement repousses a V1.5 :

- Auth.js / NextAuth ;
- comptes utilisateurs ;
- Register ;
- Login ;
- Logout ;
- Forgot password ;
- profil utilisateur ;
- pseudo/avatar utilisateur persistants ;
- favoris synchronises ;
- recently played synchronise ;
- continue playing synchronise ;
- historique multi-device ;
- suppression de compte ;
- leaderboards utilisateurs reels lies a des comptes.

## 7. Fonctionnalites Utilisateur Validees En V1

En V1, les utilisateurs ne creent pas de compte.

Fonctions utilisateur V1 sans compte :

- navigation dans le catalogue ;
- recherche ;
- filtres ;
- favoris locaux ;
- recently played local ;
- continue playing local ;
- scores personnels locaux si pertinent ;
- meilleurs temps personnels locaux si pertinent ;
- nombre d'essais local si pertinent ;
- badges legers locaux ;
- consultation de leaderboards placeholder ou anonymes ;
- consultation des pages categories ;
- consultation des pages jeux ;
- acces help center ;
- acces pages legales.

Fonctions non prevues en V1 :

- Register ;
- Login ;
- Logout ;
- Forgot password ;
- Profil utilisateur ;
- Pseudo persistant ;
- Avatar utilisateur ;
- Suppression du compte ;
- Favoris synchronises ;
- Recently played synchronise ;
- Continue playing synchronise ;
- Historique multi-device ;
- Chat ;
- Amis ;
- Messagerie ;
- Commentaires ;
- Profils publics complexes ;
- Reseau social ;
- Follow/unfollow ;
- Equipes/clans ;
- Tournois complexes ;
- Paiement ;
- Abonnement ;
- Marketplace.

La V1 doit rester utilisable sans compte.
Aucune fonctionnalite ne doit dependre d'une authentification.

## 8. Scores, Leaderboards Et Badges

Prevoir des le depart un systeme simple de scores locaux, temps locaux, essais locaux et classements placeholder/anonymes.

Objectif :

- Ajouter une couche de retention et de gamification legere.
- Ne pas creer de compte utilisateur.
- Ne pas transformer le site en reseau social.

Fonctionnalites a prevoir en V1 :

- score personnel local par jeu ;
- meilleur score local par jeu ;
- meilleur temps local si le jeu s'y prete ;
- nombre d'essais local si le jeu s'y prete ;
- leaderboards simples placeholder ou anonymes ;
- badges legers locaux.

Exemples de badges simples :

- Primer juego jugado ;
- 10 juegos jugados ;
- 5 favoritos guardados ;
- Superviviente ;
- Rey del retry ;
- Sin rendirse ;
- Fan de plataformas hardcore ;
- Maestro de trampas ;
- 100 intentos ;
- Primer juego imposible completado.

A ne pas faire en V1 :

- leaderboards utilisateurs reels lies a des comptes ;
- profils publics ;
- chat ;
- amis ;
- messagerie ;
- commentaires ;
- follow/unfollow ;
- equipes/clans ;
- tournois avances.

Si les vrais jeux providers ne permettent pas toujours de remonter les scores, temps ou essais automatiquement, l'architecture doit rester flexible.
Ne pas inventer une integration score provider si elle n'existe pas encore.
Le systeme peut commencer avec des scores simules ou locaux sur placeholder, puis etre adapte selon les possibilites reelles des providers.

## 9. Publicite V1 / V1.5

Prevoir une architecture publicitaire simple des le depart, mais ne pas activer de vraie regie publicitaire tant que le site n'a pas ses vrais jeux/providers et une validation explicite.

Formats a prevoir dans le code :

- banniere classique sur homepage ;
- banniere ou bloc pub sur pages categories ;
- bloc pub sous ou autour de la zone de jeu ;
- interstitial leger avant lancement du jeu.

Contraintes :

- l'interstitial doit rester optionnel ;
- il doit pouvoir etre active/desactive facilement ;
- il ne doit pas bloquer l'experience de facon agressive ;
- il doit respecter le consentement cookies/pub ;
- aucune pub reelle ne doit etre integree sans validation explicite ;
- prevoir un composant `AdSlot` reutilisable ;
- prevoir un composant `InterstitialAd` ou equivalent, mais desactive par defaut.

Formats exclus pour le moment :

- rewarded ads ;
- ad refresh avance ;
- header bidding ;
- publicite video complexe ;
- daily games / defis quotidiens.

## 10. Catalogue Placeholder

Comme aucun provider n'est encore branche, il faut creer un catalogue placeholder propre.

Le catalogue placeholder doit contenir environ :

- 20 a 50 jeux fictifs ;
- 5 a 8 categories principales ;
- thumbnails placeholders ;
- descriptions courtes ;
- tags ;
- fausses notes ;
- fausses donnees de popularite ;
- score placeholder si utile ;
- temps placeholder si utile ;
- nombre d'essais placeholder si utile ;
- champ `embedUrl` vide ou `null`.

Les pages jeux doivent afficher un message clair en espagnol, par exemple :

> Integracion oficial del juego pendiente de aprobacion del proveedor.

Contraintes :

- Ne jamais scraper Minijuegos, Friv, Plays.org ou autres sites.
- Ne pas recuperer leurs thumbnails, textes, jeux ou embeds.
- Ne pas copier des jeux connus comme I Wanna Be The Guy, Getting Over It, Geometry Dash ou autres licences existantes.
- Tout le contenu placeholder doit etre fictif ou genere pour la demo.
- Les jeux fictifs peuvent s'inspirer de mecaniques generales de difficulte, retry, pieges et plateformes, mais jamais copier un nom, univers, personnage, visuel ou gameplay proprietaire precis.

## 11. Categories Principales V1

Categories prioritaires :

- Juegos imposibles ;
- Rage Games ;
- Die & Retry ;
- Plataformas hardcore ;
- Juegos con trampas ;
- One Touch ;
- Reflejos ;
- Speedrun.

Certaines categories peuvent aussi fonctionner comme tags ou axes editoriaux.
Codex doit proposer une structure claire entre categories principales et tags internes avant de coder les donnees placeholder.

Tags internes possibles :

- Muy dificil ;
- Extremo ;
- Injusto ;
- Trampas ocultas ;
- Retry rapido ;
- Mobile OK ;
- Desktop recomendado ;
- Teclado ;
- One touch ;
- Speedrun ;
- Plataformas ;
- Precision ;
- Reflejos ;
- Hardcore ;
- Frustrante ;
- Corto pero dificil.

Le site doit pouvoir ajouter d'autres categories plus tard.

## 12. Structure De Pages Validee

Pages publiques principales :

- `/`
- `/juegos`
- `/juegos/[slug]`
- `/categorias`
- `/categorias/[slug]`
- `/buscar`
- `/populares`
- `/nuevos`
- `/aleatorio`
- `/favoritos`
- `/recientes`
- `/clasificaciones`
- `/clasificaciones/[gameSlug]`
- `/badges`
- `/sobre-nosotros`
- `/contacto`
- `/ayuda`
- `/privacidad`
- `/cookies`
- `/terminos`

Pages explicitement exclues de la V1 :

- `/login`
- `/registro`
- `/perfil`
- `/forgot-password`
- `/cuenta`

Pages ou routes editoriales optionnelles a prevoir plus tard seulement si valide :

- `/juegos-imposibles`
- `/rage-games`
- `/die-and-retry`
- `/plataformas-hardcore`

Les slugs espagnols les plus propres peuvent etre proposes, mais la logique des pages ne doit pas etre changee.

## 13. Page Home

La homepage doit contenir :

- Header ;
- Logo ;
- Navigation ;
- Search bar ;
- Hero principal oriente rage games / jeux impossibles ;
- CTA principal ;
- Categories rapides ;
- Juegos imposibles ;
- Rage games populares ;
- Die & Retry ;
- Plataformas hardcore ;
- Juegos con trampas ;
- Retos rapidos ;
- Nuevos juegos ;
- Seguir jugando si donnees locales disponibles ;
- Top categorias ;
- Leaderboard preview placeholder optionnel ;
- Badges preview locaux optionnel ;
- Newsletter optionnelle ;
- AdSlot placeholder discret ;
- Footer.

Le hero doit communiquer clairement :

- jeux gratuits ;
- navigateur uniquement ;
- sans telechargement ;
- difficiles / rage / retry ;
- jouer instantanement.

## 14. Page Categorie

Chaque page categorie doit contenir :

- H1 ;
- intro courte SEO ;
- grille de jeux ;
- filtres ;
- tri par popularite / nouveaute / note / difficulte ;
- filtre mobile OK / desktop recommande ;
- filtre type de controle : clavier, souris, tactile, one touch ;
- jeux populaires de la categorie ;
- texte SEO en bas de page ;
- liens vers categories proches ;
- AdSlot placeholder.

Les textes SEO doivent etre adaptes a la niche :

- type de challenge ;
- difficulte ;
- mecaniques de retry ;
- pieges ;
- reflexes necessaires.

## 15. Page Jeu

Chaque page jeu doit contenir :

- titre du jeu ;
- zone iframe ou placeholder ;
- bouton Play ;
- bouton fullscreen ;
- bouton favori local ;
- categorie ;
- tags ;
- description ;
- infos : gratis, sin descarga, compatible movil si applicable ;
- difficulte ;
- niveau de rage ;
- type de controles recommande ;
- mobile OK ou desktop recommande ;
- type de challenge ;
- score personnel local si disponible ;
- meilleur score local si disponible ;
- meilleur temps local si pertinent ;
- nombre d'essais local si pertinent ;
- leaderboard placeholder ou anonyme ;
- badges locaux lies si applicable ;
- jeux similaires ;
- autres jeux de la meme categorie ;
- recently played local update ;
- AdSlot placeholder sous ou autour du jeu ;
- interstitial leger prevu avant lancement, mais desactive par defaut ;
- message si `embedUrl` absent.

Si `embedUrl` est `null`, afficher un placeholder propre, pas d'erreur.

La page doit aussi pouvoir afficher un message editorial de type :

> Este juego forma parte de nuestra seleccion de retos dificiles y juegos de retry.

## 16. Modeles De Donnees

Prevoir au minimum en V1 les modeles suivants.

### Game

- `title`
- `slug`
- `description`
- `category`
- `tags`
- `thumbnail`
- `embedUrl`
- `provider`
- `isMobileFriendly`
- `isDesktopRecommended`
- `inputType`
- `difficultyLevel`
- `rageLevel`
- `hasHiddenTraps`
- `speedrunFriendly`
- `averageRetryTime`
- `isActive`
- `rating`
- `playCount`
- `language`
- `createdAt`
- `updatedAt`

### Category

- `name`
- `slug`
- `description`
- `icon`
- `order`
- `language`
- `createdAt`
- `updatedAt`

### LocalProgress

- `gameSlug`
- `isFavorite`
- `lastPlayedAt`
- `bestScore`
- `bestTime`
- `attempts`
- `unlockedBadges`
- `updatedAt`

### ScoreLocal

- `gameSlug`
- `score`
- `bestScore`
- `bestTime`
- `attempts`
- `createdAt`
- `updatedAt`

### LeaderboardEntryPlaceholder

- `gameId`
- `usernamePlaceholder`
- `avatarPlaceholder`
- `score`
- `bestTime`
- `attempts`
- `rank`
- `createdAt`

### Badge

- `name`
- `slug`
- `description`
- `icon`
- `condition`
- `createdAt`

### AdPlacement

- `key`
- `type`
- `location`
- `enabled`
- `placeholder`
- `createdAt`
- `updatedAt`

Modeles explicitement repousses a V1.5 :

- `User`
- `UserBadge`
- `UserScore`
- `UserFavorite`
- `UserRecentlyPlayed`
- `Account`
- `Session`

Eventuellement plus tard :

- `GameEvent` / analytics interne ;
- `Provider` ;
- configuration avancee `AdSlot` ;
- `User` ;
- `UserBadge` ;
- `UserScore` ;
- modeles lies a l'auth.

Ne pas complexifier sans necessite.

Les champs `difficultyLevel`, `rageLevel`, `inputType`, mobile/desktop recommande et `speedrunFriendly` sont importants pour la differenciation editoriale de la niche.
Ils doivent etre prevus dans les types et les donnees placeholder au moment approprie, mais ne doivent pas etre implementes avant les etapes prevues.

## 17. SEO Technique

Le site doit etre SEO-ready des le depart, mais les implementations avancees doivent respecter la roadmap.

Prevoir :

- title dynamique ;
- meta description dynamique ;
- H1 propre ;
- URLs propres en espagnol ;
- sitemap automatique ;
- robots.txt ;
- canonical ;
- Open Graph ;
- maillage interne ;
- structure propre des pages ;
- textes SEO courts mais utiles ;
- donnees structurees si pertinent, mais sans inventer.

Logique SEO :

- 1 jeu = 1 page SEO ;
- 1 categorie = 1 page SEO.

Contraintes :

- Pas de multilingue en V1.
- Pas de hreflang EN/FR en V1.

Intentions SEO principales en espagnol :

- juegos imposibles online ;
- rage games gratis ;
- juegos dificiles online ;
- juegos frustrantes gratis ;
- juegos die and retry ;
- juegos de plataformas dificiles ;
- juegos con trampas ;
- juegos de habilidad dificiles ;
- juegos hardcore online ;
- juegos para rage quit.

Ces intentions servent a orienter les textes, pas a bourrer les pages de mots-cles.

## 17B. Visibilite IA / LLM SEO / GEO

Le site doit etre prepare pour une bonne comprehension par les moteurs de recherche classiques et par les moteurs IA / LLMs, sans promettre de positionnement ou de citation automatique.

Objectif :

- rendre le site facilement comprehensible par les crawlers ;
- structurer les pages importantes ;
- renforcer la clarte editoriale ;
- preparer une visibilite future dans les moteurs IA, assistants et systemes de recherche generative.

### Donnees Structurees

- Utiliser Schema.org quand pertinent.
- Prevoir un JSON-LD propre sur les pages jeux.
- Types possibles selon le cas : `VideoGame`, `Game`, `SoftwareApplication`.
- Prevoir `FAQPage` sur les pages d'aide ou blocs FAQ reellement presents.
- Ne jamais inventer de donnees structurees non visibles ou non verifiables sur la page.
- Ne pas ajouter de faux avis, fausses notes reelles ou fausses donnees de provider.

### Pages Jeux

- Chaque page jeu doit avoir un contenu textuel utile, meme si le jeu est placeholder.
- Prevoir une description claire.
- Expliquer le type de jeu, la categorie, le fonctionnement general, la difficulte, le type de controle et les informations utiles.
- Ne pas se limiter a trois lignes generiques si la page doit etre indexable.
- Tant que le jeu est placeholder, indiquer clairement que l'integration officielle est en attente.

### Pages Categories

- Chaque page categorie doit avoir une intro utile.
- Prevoir un court bloc editorial en bas de page.
- Expliquer le type de challenge, les mecaniques de retry, les niveaux de difficulte, les controles et les variantes de la categorie.
- Eviter le contenu creux, repetitif ou genere uniquement pour remplir.

### Fichier llms.txt

- Prevoir la generation ou creation d'un fichier `/llms.txt` a l'etape SEO avancee.
- Le fichier `llms.txt` doit resumer clairement le role du site, ses pages principales, ses categories et ses contenus importants.
- Considerer `llms.txt` comme un signal experimental / emergent, pas comme une garantie de visibilite IA.
- Ne pas remplacer `robots.txt` ou `sitemap.xml` par `llms.txt`.

### Fichier llms-full.txt

- Optionnel.
- A envisager seulement si le contenu editorial du site devient suffisamment riche.
- Ne pas creer sans validation explicite.

### Autorite Et Confiance

- Prevoir une page sobre `Sobre nosotros`.
- Prevoir une page contact claire.
- Prevoir des pages legales propres.
- Ne pas inventer d'equipe, d'adresse, de certification, de partenariat provider ou de chiffres d'audience inexistants.

La visibilite LLM / GEO ne doit pas ajouter de fonctionnalite hors scope.
Elle doit rester integree a la logique SEO technique du projet.

## 18. Cookies / RGPD

Prevoir une gestion cookies propre avant analytics/pub reelle.

Il faut :

- banniere cookies ;
- accepter ;
- refuser ;
- personnaliser ;
- stockage du consentement ;
- blocage analytics/pub avant consentement si necessaire ;
- page cookies ;
- page confidentialite.

Au depart :

- cookies fonctionnels necessaires ;
- favoris/recently played/continue playing/scores locaux cote navigateur ;
- analytics seulement si consentement requis selon outil choisi ;
- publicite reelle plus tard.

## 19. Analytics

Prevoir un systeme de tracking produit.

Evenements utiles :

- page view ;
- clic Play ;
- jeu lance ;
- ajout favori local ;
- retrait favori local ;
- recherche interne ;
- categorie consultee ;
- filtre utilise ;
- filtre difficulte utilise ;
- filtre mobile/desktop utilise ;
- jeu recemment joue ;
- score local enregistre ;
- meilleur temps local enregistre ;
- nombre d'essais local enregistre si disponible ;
- badge local debloque ;
- leaderboard consulte ;
- impression AdSlot placeholder ;
- clic interstitial si active plus tard ;
- device mobile/desktop si disponible ;
- popularite des jeux ;
- taux de retry si disponible.

Contraintes :

- Ne pas implementer d'analytics invasif sans consentement.
- Utiliser une solution propre et simple basee sur Umami self-hosted uniquement a l'etape prevue.
- Avant cette etape, ne prevoir qu'une couche d'evenements produit ou des interfaces preparatoires si necessaire.

## 20. Help Center

Creer un centre d'aide simple.

Pages possibles :

- `/ayuda`
- `/ayuda/como-jugar`
- `/ayuda/favoritos`
- `/ayuda/el-juego-no-carga`
- `/ayuda/jugar-en-movil`
- `/ayuda/controles`
- `/ayuda/dificultad`
- `/ayuda/clasificaciones`
- `/ayuda/badges`
- `/ayuda/anuncios`
- `/ayuda/privacidad`
- `/ayuda/reportar-un-juego`
- `/ayuda/contacto`

Page d'aide exclue de la V1 :

- `/ayuda/cuenta`

Contenus courts, simples, en espagnol.

Le help center doit pouvoir expliquer :

- comment jouer ;
- comment fonctionnent les favoris locaux ;
- comment fonctionnent les classements placeholder ou anonymes ;
- ce que signifient les niveaux de difficulte ;
- ce que signifie "mobile OK" ou "desktop recomendado" ;
- pourquoi certains jeux sont difficiles ou frustrants ;
- quoi faire si un jeu ne charge pas.

## 21. Deploiement

Le site sera deploye sur un VPS Hostinger VM2.

Prevoir plus tard :

- build Next.js ;
- configuration production ;
- variables d'environnement ;
- MongoDB Atlas via `MONGODB_URI` ;
- reverse proxy Nginx ;
- HTTPS ;
- logs ;
- redemarrage app ;
- securite basique ;
- Umami self-hosted sur VPS a l'etape analytics prevue.

Contraintes :

- Ne pas partir sur Vercel sauf demande explicite.
- Ne pas self-hoster MongoDB sur le VPS en V1 sauf validation explicite.

## 22. Methode De Travail Obligatoire

Travailler etape par etape.

A chaque etape :

1. Lire `SPEC_MASTER.md`, `ROADMAP.md` et `CURRENT_STEP.md` si ces fichiers existent.
2. Expliquer brievement l'objectif de l'etape.
3. Lister les fichiers concernes.
4. Dire clairement ce qui sera modifie et ce qui ne le sera pas.
5. Fournir le code complet pret a copier/coller seulement si demande.
6. Ne pas passer a l'etape suivante sans validation explicite.
7. Ne pas ajouter de fonctionnalite non demandee.
8. Ne pas modifier la stack.
9. Ne pas inventer de provider ou d'integration reelle avant obtention des acces.
10. Si une information manque, le dire clairement au lieu d'inventer.
11. Mettre a jour `CURRENT_STEP.md` uniquement apres validation de fin d'etape.
12. Ne jamais commencer l'etape suivante automatiquement.

Avant toute modification de fichiers ou de code, afficher une mini-checklist :

- Etape actuelle lue dans `CURRENT_STEP.md` :
- Objectif exact de l'etape :
- Fichiers que tu vas modifier :
- Fichiers que tu ne dois pas modifier :
- Fonctionnalites explicitement interdites a cette etape :
- Dependances npm a ajouter : aucune, sauf validation explicite.

Si une modification depasse le perimetre de `CURRENT_STEP.md`, s'arreter et demander validation.

Contraintes absolues de travail :

- Aucune nouvelle dependance npm sans validation explicite.
- Aucun fichier hors de la liste annoncee ne doit etre cree ou modifie sans validation explicite.
- Aucune fonctionnalite V1.5 ne doit etre anticipee ou preparee pendant la V1 sans validation explicite.
- Aucune logique Auth.js / NextAuth ne doit etre installee, importee, configuree ou preparee en V1.

Avant toute modification de fichiers, annoncer :

- l'objectif ;
- les fichiers concernes ;
- les commandes eventuelles ;
- les limites de l'etape ;
- les dependances eventuelles si strictement necessaires.

Puis attendre la validation si l'utilisateur n'a pas explicitement demande d'executer.

## 23. Ordre De Developpement Valide

La V1 doit suivre exactement l'ordre defini dans `ROADMAP.md`, de l'etape 0 a l'etape 29.

Les etapes V1.5 sont separees et ne doivent pas etre commencees pendant la V1.
Aucune logique Auth ne doit etre anticipee ou installee en V1 sans validation explicite.

## 24. Premiere Tache A Faire

Commencer uniquement par la preparation du repo et de la memoire projet.

Premiere action :

- creer uniquement `SPEC_MASTER.md` ;
- creer uniquement `ROADMAP.md` ;
- creer uniquement `CURRENT_STEP.md`.

Contraintes :

- Ne creer aucun code applicatif.
- Ne pas lancer `create-next-app`.
- Ne pas configurer Next.js.
- Ne pas creer de composants.
- Ne pas creer de pages.

Apres creation des trois fichiers de cadrage, attendre validation.

Une fois ces fichiers valides, `CURRENT_STEP.md` pourra etre mis a jour vers :

> Etape 1 - Initialisation projet Next.js + TypeScript + Tailwind

A ce moment-la seulement, fournir :

- la commande exacte de creation du projet ;
- les choix a selectionner dans le terminal ;
- l'arborescence initiale attendue ;
- les verifications a faire apres installation.

Puis attendre validation avant d'executer ou de modifier quoi que ce soit.

## 24B. Utilisation Dans Les Futurs Chats Codex

Si ce projet est repris dans un nouveau chat Codex, ne pas repartir de zero.

Lire d'abord :

- `SPEC_MASTER.md`
- `ROADMAP.md`
- `CURRENT_STEP.md`

Puis repondre uniquement en fonction de l'etape actuelle indiquee dans `CURRENT_STEP.md`.

Si `CURRENT_STEP.md` est absent, incomplet ou contradictoire, le signaler clairement avant de continuer.

Ne jamais supposer qu'une etape est terminee si `CURRENT_STEP.md` ne l'indique pas.

## 25. Regle Absolue

Ne pas chercher a ameliorer le projet hors cadre.

Le but n'est pas de proposer des idees nouvelles, mais d'executer proprement le cahier des charges valide.

Toute suggestion hors scope doit etre clairement marquee comme optionnelle et ne doit jamais etre integree sans validation explicite.

Meme si une amelioration semble logique techniquement, elle ne doit jamais etre integree si elle n'est pas prevue dans `CURRENT_STEP.md` ou validee explicitement.
