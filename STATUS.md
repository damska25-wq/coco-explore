# État d'avancement — Coco Explore

_Dernière mise à jour : session du 18/09/2026. Ce fichier sert de mémoire de reprise si une session Claude s'arrête (limite d'usage) — à lire en premier avant de continuer le travail._

## Départements PACA — état de couverture

- **Var (83)** — ✅ complet (toutes catégories)
- **Alpes-Maritimes (06)** — ✅ complet
- **Bouches-du-Rhône (13)** — ✅ complet
- **Vaucluse (84)** — ✅ complet (pas de plages, département sans littoral)
- **Alpes-de-Haute-Provence (04)** — 🟡 en cours :
  - Balades ✅, Hébergements ✅, Restaurants ✅
  - Toiletteurs : agent de recherche lancé, en cours au moment de la coupure (voir fichiers non commités dans `src/fiches/toiletteur-*04*` ou vérifier `git log` / `git status`)
  - Vétérinaires : **pas encore commencé**
- **Hautes-Alpes (05)** — ❌ pas commencé, aucune catégorie

**Prochaine étape immédiate : terminer toiletteurs + vétérinaires pour le 04, puis attaquer le 05 en entier (mêmes 7 catégories que les autres départements PACA, méthodologie identique).**

## Nouvelles catégories en cours de création

Le site vient d'ajouter deux nouvelles catégories, structure déjà en place (nav.js, sections.js, map.js) mais **sans aucune fiche encore vérifiée/publiée** :

- **Dog Wash** (stations de lavage pour chiens, souvent dans les ports/marinas)
  - Le propriétaire du site a personnellement signalé deux emplacements à vérifier en priorité :
    - Au bout du **Port de Cavalaire** (Cavalaire-sur-Mer, Var)
    - Sur/près des **plages marines de Cogolin** (marina de Cogolin, golfe de Saint-Tropez, Var)
  - Un agent de recherche a été lancé pour vérifier ces deux lieux + en trouver d'autres dans le Var — voir résultat dans les commits récents ou relancer si pas encore fait.
- **Dog-sitter** (garde de chiens) — même agent, recherche de vrais services de garde dans le Var, avec la même discipline "zéro risque" que pour hébergements/restaurants (jamais de téléphone/adresse non confirmé).

## Méthodologie standard (à respecter pour tout nouveau contenu)

1. Chaque fiche = un fichier `.njk` dans `src/fiches/`, TOUT le contenu (y compris le corps HTML) doit être dans le front-matter YAML, dans une clé `bodyHtml: |` — **jamais de contenu après le `---` final** (bug déjà rencontré 2 fois : rend la page avec un corps vide).
2. Toute info vient de recherches web réelles, jamais inventée. Signaler "à vérifier"/"à confirmer" plutôt qu'affirmer.
3. Catégories commerciales (hébergements, restaurants, toiletteurs, vétérinaires, dog wash, dog-sitters) : "zéro risque" — jamais de téléphone/adresse publié sans confirmation par au moins 2 sources indépendantes (ou explicitement marqué "à confirmer"). Pour les vétérinaires (catégorie la plus sensible), ne jamais publier un numéro non confirmé, même hedgé — préférer abandonner la fiche.
4. Toujours vérifier `npm run build` (0 erreur) avant de commit/push.
5. Photos Unsplash : impossible de voir les images dans ce sandbox (réseau bloqué vers images.unsplash.com) — juger uniquement sur le texte `alt_description`/`description`, rejeter tout ce qui évoque la Bretagne/l'Atlantique/la Normandie pour les fiches méditerranéennes.

## Autres tâches en attente (pas urgentes, mentionnées par l'utilisateur)

- **Printemps, avant la saison estivale** : revérifier tous les arrêtés municipaux sur l'accès chiens aux plages (les règles changent souvent d'une année à l'autre) — l'utilisateur a explicitement dit "on verra ça au printemps".
- **Une fois toute la région PACA terminée** : ajouter une navigation par département (ex. cliquer sur "Var" → sous-page listant toutes les catégories de ce département). Nécessite d'ajouter un champ département aux ~260 fiches existantes (scriptable en une passe) + une nouvelle page de destination générée automatiquement. L'utilisateur a validé l'idée mais veut attendre la fin du PACA.
- **Rotation "Conseils de Coco"** : déjà automatisée (voir `eleventyConfig.addFilter("weeklyPick", ...)` dans `eleventy.config.js` + `src/map-data.njk`) — choix automatique chaque semaine d'une plage/balade/restaurant parmi toutes les fiches existantes, sans liste à maintenir à la main. Fonctionne à chaque build ; comme le site ne se reconstruit que sur un `git push`, ça reste à jour tant qu'on pousse régulièrement. Si le rythme de publication ralentit, il faudra un déclencheur de build hebdomadaire (Netlify Scheduled Function + Build Hook — nécessite une petite étape manuelle côté utilisateur sur le tableau de bord Netlify).
- **Signalement continu de photos incorrectes** : l'utilisateur connaît personnellement le Var et repère des photos qui ne correspondent pas aux vrais lieux (déjà corrigé : Bonporteau, qui est une petite crique rocheuse, pas une plage ouverte). Rester attentif à ce type de retour et corriger au cas par cas.

## Infos de contexte technique

- Repo : `damska25-wq/coco-explore`, branche `claude/github-connexion-otichf`, déployé sur Netlify (site `cocoexplore.com`, siteId `ec8f1754-d18d-471e-8d8c-138ba4b5abd7`).
- Le déploiement est automatique à chaque push (Netlify lié au repo GitHub).
- Toujours vérifier l'état du déploiement après un push via l'outil Netlify MCP (`get-project`, vérifier `currentDeploy.state === "ready"`).
