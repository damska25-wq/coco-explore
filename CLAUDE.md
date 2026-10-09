# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 101 départements couverts (96 métropolitains + 5 DOM, couverture nationale complète), ~9300 fiches.

## Programme partenaire (démarrage commercial)

Le site propose une mise en avant payante optionnelle aux professionnels déjà référencés gratuitement (vétérinaires, restaurants, hébergements...). Statut : en phase de test manuel, pas encore de vrai partenariat signé.

- **Page publique** : `src/devenir-partenaire.njk` (accessible depuis le menu hamburger) — volontairement sans tarif affiché, juste les explications et un contact mailto.
- **Mécanisme technique** : ajouter `partenaire: true` au frontmatter d'une fiche déclenche un badge doré "Partenaire" sur ses cartes (accueil, page département, "à proximité") et un tag dans son hero. CSS : classes `.fiche-card.is-partenaire`, `.access-badge.badge-partenaire`, `.fiche-partenaire-tag` dans `src/style.css`.
- **Tarif cible convenu avec l'utilisateur** : 19 à 29 €/mois, sans engagement, 1er mois offert. Pas de facturation à la performance (pas de données de trafic pour le justifier pour l'instant).
- **Cohérence éditoriale** : la page "À propos" (`src/a-propos.njk`) a été mise à jour pour rester honnête vis-à-vis de ce programme (le classement/contenu reste neutre, seule la mise en avant visuelle est payante).

### Modèle d'email de démarchage (sans prix — à adapter par fiche/pro)

```
Objet : Votre clinique déjà référencée sur Coco Explore — une mise en avant possible ?

Bonjour [Nom],

Je gère Coco Explore, un guide en ligne qui aide les propriétaires de chiens à
trouver des lieux adaptés partout en France (plages, hébergements,
vétérinaires, toiletteurs...). Votre [établissement] y est déjà référencé
gratuitement : [lien vers la fiche]

Je lance actuellement un test auprès de quelques professionnels pour une mise
en avant de leur fiche : badge "Partenaire" visible, priorité d'affichage
dans les résultats de votre secteur. L'idée est de vous rendre plus visible
auprès de personnes qui cherchent activement [un vétérinaire / un
hébergement / ...] pour leur chien — souvent des visiteurs ou nouveaux
arrivants dans la région, donc avec un besoin assez immédiat.

Plus de détails ici si ça vous intéresse : [lien vers devenir-partenaire.html]

Belle journée à vous,
[Prénom/nom]
Coco Explore — cocoexplore.com
```

Premier envoi test envisagé auprès de la Clinique Vétérinaire du Dr Jackowski (Cavalaire-sur-Mer) — fiche supprimée début novembre 2026 après un faisceau d'indices de fermeture (avis client isolé évoquant une fermeture fin 2023, site officiel chezmonveto.com injoignable en DNS, aucun email public trouvé), **puis recréée le 9 octobre 2026** : l'utilisateur a vérifié sur place (capture Google Maps) et la clinique est bien active — 4,8/5 sur 85 avis, en activité depuis plus de 5 ans. Les infos de contact (téléphone, adresse, horaires) viennent de l'ancienne recherche, déjà cohérentes avec l'adresse vue sur Maps. Pas de nouveau site web renseigné (l'ancien restait mort). Premier envoi test du mail de démarchage toujours à faire — email du Dr Jackowski pas encore trouvé, ou possibilité de démarcher par téléphone directement.

## Historique — audit performance accueil (octobre 2026, résolu)

Audit PageSpeed Insights (mobile + desktop) mené début octobre 2026 sur `cocoexplore.com`. Tout corrigé et poussé sur `claude/github-connexion-otichf` :
- Polices Google chargées via `<link rel="stylesheet">` au lieu d'un `@import` dans `style.css` (bloquait le rendu).
- Filtre Eleventy `optimizeImg` (dans `eleventy.config.js`) : retire le `fm=jpg` figé dans les URLs Unsplash des fiches et ajoute `auto=format,compress` pour servir du WebP/AVIF. Appliqué partout où une image Unsplash est affichée (`src=`, `imgSrcset`, préchargement LCP dans `base.njk`, `map-data.njk`). **Ne pas toucher** `og:image`/`twitter:image`/JSON-LD, volontairement laissés en JPG forcé (compatibilité réseaux sociaux/Google).
- Accueil (`src/index.njk`) : les ~198 images des sections par catégorie cachées par défaut (`hidden`, une seule visible selon le filtre cliqué) n'ont plus de vraie `src=` au chargement — juste un espace réservé (SVG vide en data URI), avec l'URL réelle dans `data-src`/`data-srcset`. `map.js` (fonction `revealImages`, appelée dans `showCatIds`) ne déclenche leur téléchargement qu'au moment où la section devient réellement visible. Les autres pages (département, fiche, nouveautés, 404) n'ont pas ce problème — leurs images sont déjà toutes visibles au chargement, pas de changement là-bas.

Si le point "Améliorer l'affichage des images" de PageSpeed Insights reste élevé après tout ça, retester en conditions réelles (le réseau de l'environnement Claude Code bloque `cocoexplore.com` et `images.unsplash.com`, donc aucune vérification réseau directe n'a pu être faite depuis cet environnement) plutôt que de supposer qu'il reste un problème.

## Connecteur Parallel Search (novembre 2026) — contourne le blocage réseau des sources de recherche

Le réseau de l'environnement Claude Code bloque l'accès direct (WebFetch) à plusieurs sites utilisés comme sources pour les fiches : `chien.com`, `emmenetonchien.com`, `pagesjaunes.fr`, `justacote.com`, `acceslibre.beta.gouv.fr`, et d'autres annuaires tiers. Jusqu'à présent, les agents de recherche devaient se contenter d'extraits WebSearch tronqués pour ces sites, d'où un grand nombre de fiches en confiance "faible/moyenne" avec la mention "source non consultée directement".

Un connecteur MCP **Parallel Search** (gratuit, sans compte ni clé API — "Free token-efficient search using Parallel") a été connecté au compte et est maintenant disponible dans les sessions qui démarrent après sa connexion. Il expose `mcp__Parallel_Search__web_search` et `mcp__Parallel_Search__web_fetch`. Le fetch se fait depuis les serveurs de Parallel, pas depuis cet environnement — testé et confirmé : il contourne le blocage réseau (ex. `chien.com` entièrement lisible via ce connecteur alors qu'il est inaccessible en WebFetch direct).

**À faire dans les prochains rounds de recherche** : donner aux agents de recherche la consigne explicite d'utiliser `mcp__Parallel_Search__web_fetch` (avec `objective` et éventuellement `search_queries` de l'appel `web_search` précédent) pour lire en entier les pages de ces sites précédemment bloqués, plutôt que de se limiter aux extraits WebSearch. Cela devrait réduire le nombre de fiches "source non consultée directement" et permettre de recouper plus fiablement tarifs/conditions chien/téléphones. Si l'outil n'apparaît pas dans une session (connecteur pas encore chargé), le signaler plutôt que de supposer qu'il est indisponible — les connecteurs ne sont chargés qu'au démarrage d'une session.

## Conventions du projet (voir aussi contexte de session)

- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- Build de vérification avant tout commit : `npx @11ty/eleventy` (doit tourner sans erreur).
