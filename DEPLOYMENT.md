# Deployment - JuegosDificiles.com

Ce document prepare le deploiement production de JuegosDificiles.com sur un VPS Hostinger VM2.

Il decrit la cible technique, les variables d'environnement, Docker Compose, Nginx, HTTPS, les controles de securite de base, les logs et les procedures de verification. Il ne remplace pas une execution de deploiement : les commandes reelles sur le VPS restent reservees a l'etape 26.

## 1. Architecture cible

- VPS cible : Hostinger VM2.
- Systeme cible : Ubuntu LTS.
- Application : Next.js lancee dans un container Docker prive.
- Process applicatif : `npm run start`, donc `next start`.
- Port applicatif interne : `3000`.
- Exposition Docker : `127.0.0.1:3000:3000`.
- Reverse proxy public : Nginx installe sur le host.
- HTTPS : Certbot installe sur le host.
- Domaine canonique : `https://www.juegosdificiles.com`.
- Redirection attendue : non-www vers www.
- Acces direct par IP : refuse au niveau Nginx.
- Publicite : aucune publicite reelle activee a ce stade.
- Analytics : GA4 / Google Tag avec Google Consent Mode, conditionne au consentement utilisateur.

La strategie V1 utilise Docker Compose et un Dockerfile multi-stage classique. Elle n'utilise pas PM2 et n'utilise pas `output: "standalone"`.

## 2. Prerequis locaux

- Node.js et npm installes.
- Git disponible.
- Dependances installees via `npm ci` ou environnement local equivalent.
- Verification locale attendue avant deploiement :
  - `npm.cmd exec tsc -- --noEmit`
  - `npm.cmd run lint`
  - `npm.cmd run build`
- Aucun secret ne doit etre versionne.
- Le fichier `.env.local` reste reserve au developpement local.

## 3. Prerequis VPS

Sur le VPS Hostinger VM2, les composants cibles sont :

- Ubuntu LTS.
- Docker Engine.
- Docker Compose.
- Nginx sur le host.
- Certbot sur le host.
- UFW.
- Fail2ban.
- Git.

La V1 ne prevoit pas de durcissement SSH agressif :

- ne pas desactiver root login a cette etape ;
- ne pas desactiver password authentication a cette etape ;
- ne pas changer le port SSH a cette etape.

L'acces principal reste la console Hostinger.

## 4. Variables d'environnement

Convention :

- developpement local : `.env.local` ;
- production VPS reelle : `.env.production` ;
- exemple versionne : `.env.production.example`.

Le vrai fichier `.env.production` doit etre cree manuellement sur le VPS. Il ne doit jamais etre versionne.

Le fichier `.env.production.example` peut etre versionne car il ne contient aucune vraie valeur sensible :

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

`NEXT_PUBLIC_GA_MEASUREMENT_ID` est attendu pour GA4 / Google Tag. L'ID GA4 reel ne doit jamais etre hardcode dans le code, dans Dockerfile, dans Compose ou dans la documentation versionnee.

Point important pour Next.js : les variables `NEXT_PUBLIC_*` sont integrees au build client. Pour que `NEXT_PUBLIC_GA_MEASUREMENT_ID` soit disponible dans l'image, l'environnement doit etre charge au moment du build Docker, pas seulement au runtime.

Methode prevue :

```bash
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
```

ou equivalent adapte au serveur. Le fichier `.env.production` reste local au VPS.

## 5. Docker / Docker Compose

La strategie Docker V1 repose sur :

- Dockerfile multi-stage ;
- `npm ci` pour installer les dependances ;
- `npm run build` pendant la construction de l'image ;
- `npm run start` au runtime ;
- `next start` comme serveur applicatif ;
- `NODE_ENV=production` ;
- `PORT=3000` ;
- `HOSTNAME=0.0.0.0`.

La strategie ne repose pas sur `output: "standalone"` et ne modifie pas `next.config.ts`.

Le service Docker Compose attendu :

- construit l'image depuis `Dockerfile` ;
- utilise `.env.production` sur le VPS ;
- expose uniquement `127.0.0.1:3000:3000` ;
- utilise `restart: unless-stopped` ;
- prevoit un healthcheck HTTP local ;
- configure la rotation des logs Docker avec `json-file`.

Healthcheck attendu :

- verifier `http://127.0.0.1:3000/` depuis le container ;
- echouer si l'application ne repond pas correctement.

Rotation logs Docker attendue :

- `max-size: "10m"` ;
- `max-file: "5"`.

## 6. Nginx

Nginx est installe sur le host, pas dans le container applicatif.

Objectifs Nginx :

- reverse proxy vers `http://127.0.0.1:3000` ;
- servir le domaine canonique `www.juegosdificiles.com` ;
- rediriger `juegosdificiles.com` vers `www.juegosdificiles.com` ;
- refuser l'acces direct par IP ;
- ne pas exposer directement le container ;
- conserver une configuration sobre et lisible.

Les en-tetes HTTP de securite doivent etre geres cote Nginx plutot que disperses dans l'application Next.js. Cela evite les doublons entre l'app et le reverse proxy et permet d'ajuster les headers sans reconstruire l'image Docker.

La configuration Nginx reelle sera preparee et appliquee pendant l'etape 26, pas dans ce lot.

## 7. HTTPS / Certbot

Certbot est installe sur le host.

Objectifs HTTPS :

- certificat pour `www.juegosdificiles.com` ;
- prise en charge du domaine racine si necessaire pour la redirection non-www vers www ;
- renouvellement automatique via Certbot ;
- verification post-deploiement du cadenas HTTPS.

La configuration Certbot reelle sera executee pendant l'etape 26.

## 8. Securite VPS

Securite V1 cible :

- UFW actif avec ports strictement necessaires ;
- Nginx expose en HTTP/HTTPS ;
- SSH conserve selon la configuration Hostinger validee ;
- Fail2ban actif avec configuration prudente ;
- pas de durcissement SSH agressif en V1.

Ne pas modifier DNS, SSH, UFW ou Fail2ban sans validation explicite.

## 9. Hardening HTTP

Les en-tetes HTTP doivent etre prepares prudemment et appliques cote Nginx pendant l'etape 26, apres tests sur le domaine HTTPS.

| Header | Statut V1 | Commentaire |
| --- | --- | --- |
| `X-Content-Type-Options: nosniff` | A activer | Reduit les risques de mauvais sniffing MIME. Faible risque de casse. |
| `Referrer-Policy: strict-origin-when-cross-origin` | A activer | Politique sobre et compatible avec la navigation normale. |
| `Permissions-Policy: camera=(), microphone=(), geolocation=()` | A activer | Bloque des permissions non necessaires pour la V1. |
| `X-Frame-Options: SAMEORIGIN` | Candidat prudent | A confirmer avec tests. Alternative moderne : `frame-ancestors 'self'` dans CSP. |
| `Strict-Transport-Security` | Apres HTTPS stable | Ne pas activer brutalement avant validation du certificat, des redirections et du domaine canonique. |
| `Content-Security-Policy` | Report-Only d'abord | A tester avant activation stricte pour ne pas casser les iframes de jeux et ressources providers. |
| `Cross-Origin-Opener-Policy` | A evaluer | Peut modifier le comportement des fenetres et integrations tierces. |
| `Cross-Origin-Resource-Policy` | A evaluer | Peut bloquer certaines ressources externes si trop strict. |
| `Cross-Origin-Embedder-Policy` | A reporter / eviter en V1 | Risque eleve de casse avec les iframes et ressources tierces. |

### X-Frame-Options et frame-ancestors

`X-Frame-Options` controle l'encapsulation de notre site par d'autres sites. Il ne bloque pas les iframes tierces chargees par JuegosDificiles.com.

`SAMEORIGIN` est un candidat prudent pour limiter le clickjacking sans bloquer l'usage normal du site. Une alternative plus moderne consiste a utiliser `frame-ancestors 'self'` dans une CSP.

L'activation doit etre confirmee apres tests, notamment sur les pages jeux et les iframes providers.

### HSTS

HSTS doit etre active uniquement apres validation HTTPS stable.

Strategie prudente :

- ne pas utiliser `preload` en V1 ;
- commencer avec un `max-age` court, par exemple `300` ou `86400` ;
- augmenter progressivement apres validation ;
- ne pas ajouter `includeSubDomains` sans validation DNS/HTTPS complete ;
- verifier les redirections www/non-www avant toute montee en duree.

### CSP candidate

La CSP doit d'abord etre testee en mode `Content-Security-Policy-Report-Only`. Elle ne doit pas etre presentee comme definitive avant validation fonctionnelle.

Candidate de depart a ajuster :

```nginx
Content-Security-Policy-Report-Only "
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com;
  img-src 'self' data: blob: https://img.gamepix.com https://www.onlinegames.io https://images.twoplayergames.org;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  frame-src https://play.gamepix.com https://cloud.onlinegames.io https://www.onlinegames.io https://www.twoplayergames.org;
  frame-ancestors 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
";
```

`script-src` devra etre affine a partir du comportement reel de l'application. Une premiere CSP pourra utiliser `'unsafe-inline'` si necessaire, puis etre progressivement durcie avec nonce/hash apres validation fonctionnelle.

La CSP ne doit pas casser les iframes de jeux. La liste des providers n'est pas exhaustive et devra etre mise a jour lors de l'ajout d'un nouveau provider ou d'une nouvelle source d'images.

## 10. Scripts tiers

GA4 / Google Tag :

- l'integration existe cote application ;
- le chargement depend du consentement utilisateur ;
- la variable attendue est `NEXT_PUBLIC_GA_MEASUREMENT_ID` ;
- l'ID reel doit venir de l'environnement ;
- aucun ID GA4 ne doit etre hardcode.
- domaine script a prevoir : `www.googletagmanager.com` ;
- domaines de collecte a prevoir : `www.google-analytics.com` et `*.google-analytics.com`.

Google Consent Mode :

- le consentement analytics doit etre respecte ;
- les champs publicitaires restent prepares sans activer de publicite reelle.

Providers jeux et images :

- iframes GamePix : `play.gamepix.com` ;
- iframes OnlineGames.io : `cloud.onlinegames.io`, `www.onlinegames.io` ;
- iframes TwoPlayerGames : `www.twoplayergames.org` ;
- images GamePix : `img.gamepix.com` ;
- images OnlineGames.io : `www.onlinegames.io` ;
- images TwoPlayerGames : `images.twoplayergames.org`.

Cette liste n'est pas exhaustive et devra etre mise a jour lors de l'ajout d'un nouveau provider ou d'une nouvelle source d'images.

Autres connexions externes :

- `x.com` est uniquement utilise comme lien externe simple dans le footer ; aucun script X/Twitter n'est charge ;
- aucune police externe n'est utilisee actuellement ;
- aucun backend ou fetch applicatif externe n'est utilise actuellement ;
- le healthcheck Docker utilise une requete locale vers `http://127.0.0.1:3000/`.

Publicite :

- aucune publicite reelle n'est activee en V1 a ce stade ;
- aucune configuration Google Ads ne doit etre ajoutee pendant l'etape 25 ;
- la future publicite sera documentee plus tard, apres validation explicite.
- `AdSlot` existe dans le code applicatif mais il est desactive par defaut ;
- aucune regie publicitaire n'est active ;
- la CSP devra etre revue si une regie publicitaire est ajoutee plus tard.

## 11. Logs

Logs applicatifs :

- collectes par Docker ;
- rotation via `json-file` ;
- limites : `10m` et `5` fichiers.

Logs Nginx :

- geres sur le host ;
- a verifier avec la rotation standard du systeme ;
- utiles pour diagnostiquer proxy, HTTPS, erreurs 4xx/5xx.

Logs Certbot :

- conserves sur le host selon la configuration Certbot.

## 12. Rollback

La strategie de rollback repose sur Git et Docker Compose.

Avant tout rollback :

1. Verifier l'etat courant du VPS.
2. Identifier le commit actuellement deploye.
3. Consulter les derniers commits ou tags stables disponibles.
4. Verifier les logs Docker et Nginx pour comprendre la cause du rollback.
5. Confirmer que le probleme ne vient pas uniquement de l'environnement.

Commandes futures a documenter pour l'etape 26 :

```bash
git status
git log --oneline -5
docker compose ps
docker compose logs --tail=100
```

### Rollback par commit stable

Principe :

1. Identifier le commit stable precedent.
2. Revenir au commit stable sur le VPS.
3. Reconstruire l'image Docker.
4. Relancer le service via Docker Compose.
5. Verifier le healthcheck, HTTPS et les pages principales.

Commandes futures indicatives :

```bash
git checkout <commit-stable>
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
docker compose ps
docker compose logs --tail=100
```

### Rollback par tag Git

Si un tag stable existe, le rollback peut se faire depuis ce tag.

Commandes futures indicatives :

```bash
git checkout <tag-stable>
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
```

### Tag pre-prod

Un tag pre-prod pourra etre cree apres validation complete de l'etape 25, juste avant le passage a l'etape 26, et uniquement apres validation explicite.

Nom propose :

```bash
git tag juegosdificiles-pre-prod-v1
git push origin juegosdificiles-pre-prod-v1
```

Ce tag ne doit pas etre cree automatiquement pendant la preparation. Il sert uniquement de repere stable avant deploiement.

### Verifications apres rollback

Apres rollback :

- le container doit demarrer correctement ;
- le healthcheck Docker doit etre sain ;
- `https://www.juegosdificiles.com` doit rester accessible ;
- les pages principales doivent repondre ;
- les pages jeux et iframes providers doivent fonctionner ;
- les logs Docker et Nginx doivent etre consultables ;
- GA4 ne doit se charger qu'apres consentement analytics.

Ne jamais modifier `.env.production` pendant un rollback sauf si la cause est explicitement liee a l'environnement.

## 13. Checklist pre-deploiement

- Working tree propre.
- Dernier commit pousse.
- Tag pre-prod cree si cette action a ete validee explicitement.
- `npm.cmd exec tsc -- --noEmit` OK.
- `npm.cmd run lint` OK.
- `npm.cmd run build` OK.
- `npm audit` verifie.
- `Dockerfile` present.
- `.dockerignore` present.
- `docker-compose.yml` present.
- `.env.production.example` versionne sans vraie valeur.
- `.env.production` cree manuellement sur le VPS.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` renseigne dans l'environnement VPS si GA4 doit fonctionner.
- DNS pret pour `www.juegosdificiles.com`.
- VPS accessible.
- Console Hostinger accessible.
- Ports 80 et 443 prevus pour Nginx.
- Port 3000 non public, accessible uniquement en local via `127.0.0.1:3000`.
- Nginx, Certbot, UFW et Fail2ban installes ou planifies.
- Aucun secret versionne.

## 14. Checklist post-deploiement

- Container demarre.
- Service Docker Compose actif.
- Healthcheck Docker sain.
- Logs Docker consultables.
- Nginx actif.
- HTTPS actif.
- Certificat Certbot valide.
- Redirection HTTP vers HTTPS OK.
- `https://www.juegosdificiles.com` accessible.
- Redirection non-www vers www OK.
- Acces direct IP refuse.
- Pages principales accessibles :
  - `/`
  - `/juegos`
  - `/categorias`
  - `/nuevos`
  - `/populares`
  - `/sobre-nosotros`
  - `/contacto`
  - `/privacidad`
  - `/cookies`
  - `/terminos`
- Pages jeux accessibles.
- Iframes providers non bloquees par la configuration proxy.
- Iframes de jeux testees apres ajout eventuel des headers Nginx.
- `/sitemap.xml` accessible.
- `/robots.txt` accessible.
- `/llms.txt` accessible.
- Bannieres et preferences de consentement fonctionnelles.
- GA4 charge uniquement si consentement analytics accorde et variable presente.
- GA4 teste uniquement apres acceptation du consentement analytics.
- Aucune erreur console bloquante sur les pages principales et pages jeux.
- CSP testee en mode Report-Only avant activation stricte, sans bloquer les providers.
- HSTS active uniquement apres validation HTTPS stable.
- Redirections www/non-www verifiees.
- IP directe verifiee : elle ne doit pas servir le site public.
- Logs Docker et Nginx consultables.

## 15. Commandes utiles etape 26

Ces commandes sont documentees pour l'etape 26. Elles ne doivent pas etre executees pendant l'etape 25 sans validation explicite.

Git :

```bash
git status
git log --oneline -5
```

Docker Compose :

```bash
docker compose ps
docker compose logs --tail=100
docker compose logs -f
docker compose build
docker compose up -d
docker compose restart
docker compose down
```

Nginx :

```bash
nginx -t
systemctl status nginx
```

Certbot :

```bash
certbot certificates
```

Securite VPS :

```bash
ufw status
fail2ban-client status
```

## 16. Criteres de passage vers etape 26

L'etape 25 peut etre consideree comme terminee lorsque :

- les fichiers Docker sont prets ;
- `DEPLOYMENT.md` est complet ;
- les variables d'environnement sont documentees ;
- `.env.production.example` est versionne sans vraie valeur ;
- le rollback est documente ;
- les checklists pre-deploiement et post-deploiement sont completes ;
- la securite VPS et HTTP est documentee ;
- aucun secret n'est versionne ;
- le build local est OK ;
- aucun deploiement reel n'a ete effectue pendant l'etape 25 ;
- l'utilisateur donne une validation explicite de fin d'etape 25.
