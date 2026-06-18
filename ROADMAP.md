# ROADMAP

Ce fichier contient l'ordre de developpement valide.

Regles :

- Ne pas ajouter d'etapes non demandees.
- Ne pas transformer le projet en MVP rapide.
- Ne pas melanger les phases.
- Ne pas commencer l'etape suivante sans validation explicite.
- Mettre a jour `CURRENT_STEP.md` uniquement apres validation explicite de fin d'etape.

## V1 - Ordre De Developpement Valide

0. Creation des fichiers de cadrage projet : `SPEC_MASTER.md`, `ROADMAP.md`, `CURRENT_STEP.md`
1. Initialisation projet Next.js + TypeScript + Tailwind
2. Architecture dossiers propre
3. Configuration globale UI / theme dark gaming rage games
4. Modeles TypeScript de base
5. Donnees placeholder des jeux et categories rage games
6. Donnees placeholder scores / temps / essais / leaderboards / badges
7. Design system : Button, Card, Header, Footer, SearchBar, GameCard, CategoryChip, DifficultyBadge, RageLevel, AdSlot
8. Homepage complete
9. Pages categories
10. Pages jeux avec iframe placeholder
11. Recherche et filtres
12. Favoris locaux
13. Recently played local
14. Continue playing local
15. Scores personnels locaux / meilleurs temps / essais
16. Leaderboards simples placeholder ou anonymes
17. Badges legers locaux
18. Help Center
18B. Integration manuelle de liens embed reels valides
18C. Stabilisation pre-prod du catalogue reel
19. Pages legales
20. Cookie consent
21. Integration GA4 / Google Tag avec Google Consent Mode
22. Architecture publicite : AdSlot + interstitial leger desactive par defaut
23. SEO dynamique + donnees structurees Schema.org
24. Sitemap / robots.txt / llms.txt / preparation visibilite IA
25. Preparation production VPS
26. Deploiement
27. Preparation dossier de contact providers
28. Integration vraie API/feed seulement quand l'acces provider aura ete obtenu
29. Activation reelle de la publicite seulement apres validation explicite

## V1.5 - Hors Perimetre V1

Les etapes suivantes sont possibles uniquement apres validation explicite.
Elles ne font pas partie de la V1 et ne doivent pas etre anticipees.

30. Auth.js / NextAuth v5
31. Modele User MongoDB
32. Register / Login / Logout
33. Profil simple
34. Favoris synchronises
35. Recently played synchronise
36. Continue playing synchronise
37. Scores utilisateurs synchronises
38. Leaderboards utilisateurs reels
39. Badges synchronises
40. Suppression de compte

## Rappels Importants

- Aucune logique Auth.js / NextAuth ne doit etre installee, importee, configuree ou preparee en V1.
- Aucun modele `User`, `Account` ou `Session` ne doit etre cree en V1.
- Aucune page `/login`, `/registro`, `/perfil`, `/forgot-password` ou `/cuenta` ne doit etre creee en V1.
- Aucun provider de jeux reel ne doit etre integre avant l'etape 28 et avant obtention des acces.
- Aucune publicite reelle ne doit etre activee avant l'etape 29 et sans validation explicite.
- Les elements SEO avances, sitemap, robots.txt, llms.txt et preparation IA / LLM SEO / GEO ne doivent pas etre implementes avant les etapes prevues.
- L'etape 18B est une pause controlee exceptionnelle avant les pages legales.
- Elle ne remplace pas l'etape 28 d'integration vraie API/feed provider.
- Elle autorise seulement l'integration manuelle de liens embed explicitement fournis et valides par le porteur du projet.
- Elle autorise aussi les images provider distantes validees uniquement si leurs URLs sont explicitement fournies par le porteur du projet depuis une page partenaire/provider validee, sans telechargement, rehost, modification ou transfert vers Cloudinary, et avec fallback placeholder conserve.
- Aucun scraping, aucune API provider et aucune integration automatisee ne sont autorises a cette etape.
- L'etape 18B est terminee cote donnees avec 23 jeux reels, aucun jeu placeholder dans `src/data/games.ts` et les donnees fictives de leaderboards/local-stats videes.
- L'etape 18C est terminee : elle a stabilise le catalogue reel avant les pages legales.
- Elle comprend la creation de `/populares` avec un etat vide honnete, la creation de `/aleatorio` avec redirection vers un jeu reel, le nettoyage des textes placeholder obsoletes, la clarification des statistiques nulles ou a zero et un etat vide propre sur `/clasificaciones`.
- Elle ne doit creer aucune popularite, aucun score ni aucune donnee fictive.
- Les pages `/contacto`, `/sobre-nosotros`, `/privacidad`, `/cookies` et `/terminos` restent reservees a l'etape 19.
- Le consentement des iframes providers et leur impact RGPD restent reserves a l'etape 20.
