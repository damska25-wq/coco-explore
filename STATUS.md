# État d'avancement — Coco Explore

_Dernière mise à jour : session du 18/09/2026 (soir). PACA est maintenant COMPLET sur toutes les catégories applicables. Ce fichier sert de mémoire de reprise si une session Claude s'arrête (limite d'usage) — à lire en premier avant de continuer le travail._

## Stratégie de croissance (décision de l'utilisateur, importante)

Le site ne couvre et n'alimente **que la région PACA** pour l'instant. Une fois que le site aura des visiteurs/du trafic établi, l'utilisateur développera vers d'autres régions françaises. **Ne pas commencer un autre département/région hors PACA sans que l'utilisateur ne le redemande explicitement.** PACA étant désormais complète, la couverture géographique s'arrête là jusqu'à nouvel ordre — le prochain chantier (sauf demande contraire) est le référencement Google gratuit (voir plus bas).

## Départements PACA — état de couverture

- **Var (83)** — ✅ complet (toutes catégories)
- **Alpes-Maritimes (06)** — ✅ complet
- **Bouches-du-Rhône (13)** — ✅ complet
- **Vaucluse (84)** — ✅ complet (pas de plages, département sans littoral)
- **Alpes-de-Haute-Provence (04)** — ✅ complet (Balades, Hébergements, Restaurants, Toiletteurs, Vétérinaires — pas de plages, pas d'urgences vétérinaires 24h/24 trouvées, département rural)
- **Hautes-Alpes (05)** — ✅ **complet** (Balades, Hébergements, Restaurants, Toiletteurs, Vétérinaires — pas de plages, pas d'urgences vétérinaires 24h/24 trouvées malgré recherche ciblée, département rural/montagnard comme le 04)

**🎉 RÉGION PACA ENTIÈREMENT COMPLÈTE (18/09/2026) — les 6 départements ont une couverture complète sur toutes les catégories applicables.**

## Référencement Google gratuit — EN COURS (démarré 18/09/2026)

Demandé explicitement par l'utilisateur, gratuit uniquement — aucune dépense, pas de Google Ads ni d'outils payants.

**Fait :**
- **Données structurées JSON-LD (Schema.org)** sur toutes les fiches (~300) : un bloc `Place`/`LocalBusiness` (type précis selon la catégorie : `BeachOrPool` pour les plages, `TouristAttraction` pour balades/lacs/activités, `Restaurant`, `LodgingBusiness`, `VeterinaryCare`, `LocalBusiness` pour toiletteurs/dogwash/dogsitters) + un `BreadcrumbList`, générés automatiquement dans `src/_includes/fiche.njk` à partir des champs de front-matter déjà présents partout (aucune maintenance manuelle nécessaire, ça s'applique tout seul aux futures fiches). Mapping catégorie→type dans `eleventy.config.js` (filtre `schemaType`).
- **JSON-LD `WebSite`/`Organization`** sur la page d'accueil (`src/index.njk`).
- **`og:locale` fr_FR** ajouté dans `src/_includes/base.njk`.
- **Correction d'un vrai problème de fond** : plusieurs textes visibles (titre de la page d'accueil, meta description, texte du hero, tagline du footer, CGU, mentions légales) décrivaient encore le site comme "guide dog-friendly **du Var**" alors qu'il couvre désormais toute la région PACA — corrigé partout. C'était un problème de cohérence de contenu qui aurait nui au référencement pour les recherches hors Var.
- Vérifié : build propre, JSON-LD valide (testé par script Python sur les 291 fiches + accueil), déploiement Netlify confirmé "ready".

- **Google Search Console** : ✅ FAIT (18/09/2026) — propriété `https://cocoexplore.com` vérifiée via fichier HTML (`src/google42d095cf02301eb6.html`, servi en passthrough copy dans `eleventy.config.js` — ne pas supprimer, c'est la preuve de propriété du site pour Google, la retirer casserait la vérification), sitemap.xml soumis avec succès. Google va indexer les ~300 pages progressivement (quelques jours à quelques semaines). Rien à refaire ici sauf si l'utilisateur change de domaine/hébergeur.

- **Alt text sur les photos** : ✅ FAIT (18/09/2026) — les photos (hero de fiche + vignettes des cartes sur accueil/pages département) sont maintenant de vraies balises `<img>` avec un texte alternatif descriptif généré automatiquement à partir des champs de front-matter existants (h1/tag/lieu pour le hero, cardTitle/cardTag pour les vignettes) — aucune maintenance manuelle nécessaire, s'applique aussi aux futures fiches. Rendu visuel identique à avant (vérifié avec une image de test locale + `object-fit: cover`, le réseau vers Unsplash étant bloqué dans ce sandbox). Modifs dans `src/_includes/fiche.njk`, `src/index.njk`, `src/departement.njk`, `src/style.css`.

**Reste à faire (toujours gratuit) :**
- Vérifier les longueurs de title/meta description (bonnes pratiques Google ~50-60 et ~150-160 caractères) sur un échantillon de fiches — pas encore audité systématiquement.
- Attendre quelques jours/semaines que Google indexe le site (rien à faire, c'est automatique une fois Search Console configuré) puis vérifier le rapport "Performances" avec l'utilisateur pour voir les premiers résultats.
- Un futur `Sitemap ping`/resoumission n'est pas nécessaire à chaque changement, Google recrawle automatiquement une fois Search Console configuré.

## Tâches secondaires restantes avant/à côté du SEO

- Dog Wash / Dog-sitter : encore Var-uniquement, à étendre aux 5 autres départements (voir section dédiée plus bas) — pas prioritaire, à faire "quand il y aura du temps" selon les propres mots de l'utilisateur.

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
