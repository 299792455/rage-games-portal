# CURRENT STEP

## Etapes precedentes validees

- Etape 1 - Initialisation projet Next.js + TypeScript + Tailwind : terminee
- Etape 2 - Architecture dossiers propre : terminee
- Etape 3 - Configuration globale UI / theme dark gaming rage games : terminee
- Etape 4 - Modeles TypeScript de base : terminee
- Etape 5 - Donnees placeholder des jeux et categories rage games : terminee
- Etape 6 - Donnees placeholder scores / temps / essais / leaderboards / badges : terminee
- Etape 7 - Design system : Button, Card, Header, Footer, SearchBar, GameCard, CategoryChip, DifficultyBadge, RageLevel, AdSlot : terminee
- Etape 8 - Homepage complete : terminee
- Etape 9 - Pages categories : terminee
- Etape 10 - Pages jeux avec iframe placeholder : terminee
- Etape 11 - Recherche et filtres : terminee
- Etape 12 - Favoris locaux : terminee
- Etape 13 - Recently played local : terminee
- Etape 14 - Continue playing local : terminee
- Etape 15 - Scores personnels locaux / meilleurs temps / essais : terminee
- Etape 16 - Leaderboards simples placeholder ou anonymes : terminee
- Etape 17 - Badges legers locaux : terminee
- Etape 18 - Help Center : terminee

## Etape actuelle

Etape 18B - Integration manuelle de liens embed reels valides

## Statut

En attente de demarrage

## Objectif De L'etape 18B

Integrer manuellement des liens embed reels uniquement s'ils sont explicitement fournis et valides par le porteur du projet, avant de reprendre la roadmap normale avec l'etape 19 - Pages legales.

## Autorise A L'etape 18B

Uniquement apres validation explicite de demarrage :

- recevoir une liste de jeux et de liens embed fournis par le porteur du projet ;
- verifier que chaque lien embed a ete explicitement fourni ;
- proposer les modifications exactes avant toute integration ;
- modifier `src/data/games.ts` uniquement apres validation explicite ;
- verifier si `/juegos/[slug]` gere correctement les iframes avec `embedUrl` renseigne ;
- proposer une modification de `/juegos/[slug]` uniquement si necessaire et apres validation explicite.

## Interdit A L'etape 18B Sans Validation Explicite

- scraper des sites tiers ;
- chercher ou recuperer des embeds soi-meme ;
- brancher une API provider ;
- brancher un feed JSON/XML ;
- ajouter de la publicite reelle ;
- ajouter de l'analytics ;
- ajouter des images externes non autorisees ;
- modifier le modele economique ;
- modifier des pages existantes sans validation explicite ;
- modifier `/juegos/[slug]` sans besoin identifie et validation explicite ;
- creer une logique provider automatisee ;
- commencer l'etape 19.

## Point RGPD A Garder En Memoire

Les iframes providers peuvent impliquer des cookies ou contenus tiers.
Le traitement cookies/RGPD devra etre gere plus tard a l'etape 20 - Cookie consent.

## Prochaine Etape Apres Validation Explicite

Etape 19 - Pages legales

## Regle De Passage

Ne pas commencer l'etape 18B tant que son demarrage n'est pas valide explicitement.

Ne pas passer a l'etape 19 sans validation explicite de fin de l'etape 18B.
