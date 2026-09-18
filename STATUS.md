# État d'avancement — Coco Explore

_Dernière mise à jour : session du 18/09/2026 (soir). Ce fichier sert de mémoire de reprise si une session Claude s'arrête (limite d'usage) — à lire en premier avant de continuer le travail._

## Stratégie de croissance (décision de l'utilisateur, importante)

Le site ne couvre et n'alimente **que la région PACA** pour l'instant. Une fois que le site aura des visiteurs/du trafic établi, l'utilisateur développera vers d'autres régions françaises. **Ne pas commencer un autre département/région hors PACA sans que l'utilisateur ne le redemande explicitement** — une fois les Hautes-Alpes (05) terminées, la couverture géographique s'arrête là jusqu'à nouvel ordre.

## Départements PACA — état de couverture

- **Var (83)** — ✅ complet (toutes catégories)
- **Alpes-Maritimes (06)** — ✅ complet
- **Bouches-du-Rhône (13)** — ✅ complet
- **Vaucluse (84)** — ✅ complet (pas de plages, département sans littoral)
- **Alpes-de-Haute-Provence (04)** — ✅ complet (Balades, Hébergements, Restaurants, Toiletteurs, Vétérinaires — pas de plages, pas d'urgences vétérinaires 24h/24 trouvées, département rural)
- **Hautes-Alpes (05)** — 🟡 en cours : Balades ✅ (6 fiches), Hébergements ✅ (6 fiches). Restaurants : agent en cours au moment de la coupure (au moins 1 fiche déjà écrite, `restaurant-farandole-du-gout-embrun.njk` — vérifier si l'agent a continué et pushé d'autres fiches). Toiletteurs et Vétérinaires : **pas encore commencés**.

**Prochaine étape immédiate : vérifier/terminer les restaurants du 05, puis toiletteurs et vétérinaires — dernières catégories avant que toute la région PACA soit complète.**

## Navigation par département — FAIT (18/09/2026, session du soir)

La navigation par secteur demandée par l'utilisateur est en place et déployée :
- Chaque fiche a maintenant un champ `departement: ["83"]` (ou plusieurs codes pour les lieux à cheval sur deux départements : Sainte-Baume 83+13, Mercantour 06+04, Lac de Sainte-Croix 83+04, Serre-Ponçon 05+04, gorges de la Siagne 83+06, l'ancienne fiche "Alpes du Sud" 04+05).
- `src/_data/departements.js` liste les 6 départements PACA (id, nom, slug, intro).
- `src/departement.njk` génère automatiquement une page par département (`departement-var.html`, etc.) listant toutes ses fiches groupées par catégorie — aucune maintenance manuelle nécessaire, ça suit les fiches existantes.
- Nouveaux filtres Eleventy : `byCategoryAndDept`, `countByCatsAndDept`, `countByDept` (dans `eleventy.config.js`).
- Section "Explorer par secteur" ajoutée sur la page d'accueil (sous "Explorer par catégorie"), avec liens vers les 6 pages département.
- Sitemap mis à jour avec les 6 nouvelles pages.

**⚠️ IMPORTANT pour toute nouvelle fiche créée à partir de maintenant : il faut ajouter manuellement le champ `departement: ["XX"]` dans le front-matter (juste après `breadcrumbCatId`), sinon la fiche n'apparaîtra sur AUCUNE page département.** Le script de rattrapage ne tourne qu'une fois (déjà fait sur les 277 fiches existantes au moment de sa création) — il faut penser à instruire les agents de recherche d'ajouter ce champ pour du contenu futur, ou le rajouter soi-même après coup comme fait pour `restaurant-farandole-du-gout-embrun.njk`.

## Nouvelles catégories Dog Wash / Dog-sitter — état

Structure en place (nav.js, sections.js, map.js), contenu initial publié pour le Var uniquement :

- **Dog Wash** (4 fiches, Var) : Toutou Douche (Marines de Cogolin — confirmé, correspond à ce que l'utilisateur avait signalé), The Dog Wash (Saint-Cyr-sur-Mer), Dog Wash du Port (Hyères), Laverie La Baleine (Six-Fours-les-Plages).
  - ⚠️ **Cavalaire-sur-Mer (port)** : l'utilisateur a signalé un dog wash au bout du port de Cavalaire, mais aucune source n'a pu être trouvée malgré plusieurs recherches ciblées — **pas publié**. À revérifier plus tard (installation peut-être trop récente/informelle pour apparaître en ligne), ou demander à l'utilisateur des détails plus précis (nom de l'enseigne, rue exacte).
- **Dog-sitter** (2 fiches, Var) : Pat'Enfoliz (Toulon/Hyères), Pinou & Co (Gassin).
- **Pas encore fait** : Dog Wash / Dog-sitter pour les autres départements (06, 13, 84, 04, à faire aussi pour 05 une fois couvert). Ces deux catégories sont donc partielles sur tout le site — à compléter département par département, comme les autres catégories, quand il y aura du temps (l'utilisateur n'a pas donné d'ordre de priorité explicite pour ça vs. finir le 05 — le 05 semble prioritaire vu la demande explicite de "continuer 04 et 05").

## Méthodologie standard (à respecter pour tout nouveau contenu)

1. Chaque fiche = un fichier `.njk` dans `src/fiches/`, TOUT le contenu (y compris le corps HTML) doit être dans le front-matter YAML, dans une clé `bodyHtml: |` — **jamais de contenu après le `---` final** (bug déjà rencontré 2 fois : rend la page avec un corps vide).
2. Toute info vient de recherches web réelles, jamais inventée. Signaler "à vérifier"/"à confirmer" plutôt qu'affirmer.
3. Catégories commerciales (hébergements, restaurants, toiletteurs, vétérinaires, dog wash, dog-sitters) : "zéro risque" — jamais de téléphone/adresse publié sans confirmation par au moins 2 sources indépendantes (ou explicitement marqué "à confirmer"). Pour les vétérinaires (catégorie la plus sensible), ne jamais publier un numéro non confirmé, même hedgé — préférer abandonner la fiche.
4. Toujours vérifier `npm run build` (0 erreur) avant de commit/push.
5. Photos Unsplash : impossible de voir les images dans ce sandbox (réseau bloqué vers images.unsplash.com) — juger uniquement sur le texte `alt_description`/`description`, rejeter tout ce qui évoque la Bretagne/l'Atlantique/la Normandie pour les fiches méditerranéennes.

## Autres tâches en attente (pas urgentes, mentionnées par l'utilisateur)

- **Printemps, avant la saison estivale** : revérifier tous les arrêtés municipaux sur l'accès chiens aux plages (les règles changent souvent d'une année à l'autre) — l'utilisateur a explicitement dit "on verra ça au printemps".
- ~~Une fois toute la région PACA terminée : ajouter une navigation par département~~ → **FAIT**, voir section dédiée ci-dessus (l'utilisateur a finalement demandé de le faire avant la toute fin du PACA, pendant que le 05 était encore en cours).
- **Rotation "Conseils de Coco"** : déjà automatisée (voir `eleventyConfig.addFilter("weeklyPick", ...)` dans `eleventy.config.js` + `src/map-data.njk`) — choix automatique chaque semaine d'une plage/balade/restaurant parmi toutes les fiches existantes, sans liste à maintenir à la main. Fonctionne à chaque build ; comme le site ne se reconstruit que sur un `git push`, ça reste à jour tant qu'on pousse régulièrement. Si le rythme de publication ralentit, il faudra un déclencheur de build hebdomadaire (Netlify Scheduled Function + Build Hook — nécessite une petite étape manuelle côté utilisateur sur le tableau de bord Netlify).
- **Signalement continu de photos incorrectes** : l'utilisateur connaît personnellement le Var et repère des photos qui ne correspondent pas aux vrais lieux (déjà corrigé : Bonporteau, qui est une petite crique rocheuse, pas une plage ouverte). Rester attentif à ce type de retour et corriger au cas par cas.

## Infos de contexte technique

- Repo : `damska25-wq/coco-explore`, branche `claude/github-connexion-otichf`, déployé sur Netlify (site `cocoexplore.com`, siteId `ec8f1754-d18d-471e-8d8c-138ba4b5abd7`).
- Le déploiement est automatique à chaque push (Netlify lié au repo GitHub).
- Toujours vérifier l'état du déploiement après un push via l'outil Netlify MCP (`get-project`, vérifier `currentDeploy.state === "ready"`).
