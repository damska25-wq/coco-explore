# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 68 départements couverts, ~6800 fiches.

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

Premier envoi test prévu : Clinique Vétérinaire du Dr Jackowski, Cavalaire-sur-Mer (`src/fiches/veterinaire-jackowski.njk`).

## Historique — audit performance accueil (octobre 2026, résolu)

Audit PageSpeed Insights (mobile + desktop) mené début octobre 2026 sur `cocoexplore.com`. Tout corrigé et poussé sur `claude/github-connexion-otichf` :
- Polices Google chargées via `<link rel="stylesheet">` au lieu d'un `@import` dans `style.css` (bloquait le rendu).
- Filtre Eleventy `optimizeImg` (dans `eleventy.config.js`) : retire le `fm=jpg` figé dans les URLs Unsplash des fiches et ajoute `auto=format,compress` pour servir du WebP/AVIF. Appliqué partout où une image Unsplash est affichée (`src=`, `imgSrcset`, préchargement LCP dans `base.njk`, `map-data.njk`). **Ne pas toucher** `og:image`/`twitter:image`/JSON-LD, volontairement laissés en JPG forcé (compatibilité réseaux sociaux/Google).
- Accueil (`src/index.njk`) : les ~198 images des sections par catégorie cachées par défaut (`hidden`, une seule visible selon le filtre cliqué) n'ont plus de vraie `src=` au chargement — juste un espace réservé (SVG vide en data URI), avec l'URL réelle dans `data-src`/`data-srcset`. `map.js` (fonction `revealImages`, appelée dans `showCatIds`) ne déclenche leur téléchargement qu'au moment où la section devient réellement visible. Les autres pages (département, fiche, nouveautés, 404) n'ont pas ce problème — leurs images sont déjà toutes visibles au chargement, pas de changement là-bas.

Si le point "Améliorer l'affichage des images" de PageSpeed Insights reste élevé après tout ça, retester en conditions réelles (le réseau de l'environnement Claude Code bloque `cocoexplore.com` et `images.unsplash.com`, donc aucune vérification réseau directe n'a pu être faite depuis cet environnement) plutôt que de supposer qu'il reste un problème.

## Conventions du projet (voir aussi contexte de session)

- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- Build de vérification avant tout commit : `npx @11ty/eleventy` (doit tourner sans erreur).
