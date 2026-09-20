# État d'avancement — Coco Explore

_Dernière mise à jour : session du 20/09/2026 (après-midi). PACA est COMPLET sur toutes les catégories applicables ; référencement gratuit en place ; liens "Site officiel" ajoutés sur les fiches commerciales ; recherche, favoris, 404, favicon, Google Analytics, fiches similaires, manifeste web, accessibilité clavier, mode sombre, flux RSS, partage du site, infos toilettes publiques, itinéraire, mode hors-ligne, retour en haut et "Conseils de Coco" cohérents géographiquement ajoutés. Ce fichier sert de mémoire de reprise si une session Claude s'arrête (limite d'usage) — à lire en premier avant de continuer le travail._

## Conseils de Coco cohérents géographiquement — FAIT (20/09/2026)

L'utilisateur a repéré que les "Conseils de Coco" (une plage, une balade, un restaurant par semaine) pouvaient être dans des secteurs totalement différents (ex: plage à Nice, restaurant à Marseille) — pas cohérent pour quelqu'un qui planifie sa journée. Corrigé : nouveau filtre `weeklyConseils` (remplace `weeklyPick`) dans `eleventy.config.js` — choisit d'abord UN département qui a bien les trois catégories (seuls Var/83, Alpes-Maritimes/06 et Bouches-du-Rhône/13 en ont — Vaucluse/84, 04 et 05 n'ont aucune fiche "Plage"), puis une fiche de chaque catégorie dans ce même département. Vérifié par simulation sur 20 semaines : toujours cohérent, bonne rotation entre les 3 départements éligibles.

## Quatre améliorations supplémentaires — FAIT (20/09/2026, après-midi)

- **Lien "S'y rendre" (itinéraire Google Maps)** sur chaque fiche, généré à partir de `lat`/`lng` déjà présents dans le front-matter — aucune fiche à modifier une par une.
- **Mode hors-ligne basique** (`src/sw.js`, service worker réseau-d'abord-puis-cache) : une page déjà consultée reste lisible sans connexion — pertinent pour les zones à réseau faible (constaté ce matin même à Bonporteau). Enregistré dans `base.njk`. Testé avec une vraie coupure réseau simulée (Playwright `context.setOffline(true)`), pas juste supposé.
- **Bouton "Retour en haut"** flottant, apparaît après ~600px de scroll. Point d'attention géré : il se repositionne dynamiquement au-dessus de la bannière cookies tant qu'elle est affichée (sinon les deux se chevauchent en bas d'écran).
- **`<link rel="preconnect">`** vers les domaines Google Fonts, pour accélérer légèrement le premier affichage.

**Point technique pour la suite** : si un futur changement de `style.css`/`base.njk`/`sw.js` doit être visible immédiatement pour les visiteurs récurrents, il faut penser à changer `CACHE_NAME` (actuellement `"coco-explore-v1"`) dans `src/sw.js` — sinon un visiteur qui a déjà mis le site en cache continuera de voir l'ancienne version de ces fichiers tant que le service worker ne se réactive pas avec un nouveau nom de cache. Pas grave pour du contenu (les pages HTML sont re-fetchées réseau-d'abord à chaque visite en ligne), mais à surveiller pour des changements structurels du CSS/JS partagé.

## Bug réel sur l'envoi d'avis — PARTIELLEMENT DIAGNOSTIQUÉ (20/09/2026)

L'utilisateur a testé le formulaire d'avis en conditions réelles (plage de Bonporteau, prénom + message + photo réelle) et a eu "L'envoi a échoué, réessaie dans un instant." au moment de publier.

**Ce qui a été corrigé, confirmé par des tests headless (pas juste supposé) :**
- `netlify/functions/avis.mjs` limite les photos à ~300 Ko en base64 (`MAX_PHOTO_CHARS`). Le message d'erreur générique ne disait pas pourquoi ça échouait — corrigé : `src/avis.js` distingue maintenant une vraie erreur serveur (4xx, ex: photo trop lourde) d'un échec réseau générique, et affiche le message exact renvoyé par le serveur dans le premier cas.
- `src/avis.js` : la compression de la photo essaie maintenant plusieurs niveaux de qualité/taille avant d'abandonner, au lieu d'un seul réglage fixe qui pouvait dépasser la limite serveur.
- **Bug trouvé en testant mon propre correctif** (pas juste le cas nominal) : une vraie coupure réseau simulée affichait le message technique brut du navigateur ("Failed to fetch") au lieu du message générique convivial — corrigé (`err.isKnownApiError` distingue maintenant une erreur serveur connue d'une erreur JS/réseau quelconque).

**Ce qui N'A PAS été confirmé comme la cause de l'échec réel de l'utilisateur** : la photo qu'il a soumise ce jour-là (celle de Coco sur le sentier) a été testée après coup et compresse à ~282 Ko, sous la limite de 300 Ko — donc la taille de la photo n'explique probablement PAS son échec précis. Cet outil (sandbox Claude) n'a pas accès aux logs de la fonction Netlify pour voir l'erreur serveur réelle. Deux pistes restantes, à explorer si le problème se reproduit :
1. Un problème de réseau/signal ponctuel (l'utilisateur avait 2 barres de réseau dans la crique, signal probablement faible) — dans ce cas c'était transitoire, rien à corriger.
2. Un souci lié à Netlify Blobs ou aux quotas de fonctions, potentiellement encore affecté par l'épisode de crédit épuisé (voir section plus bas) même après la recharge — si le problème se reproduit, consulter les logs de la fonction `avis` dans le tableau de bord Netlify (Functions → avis → logs) pour voir l'erreur exacte.

**Note technique (20/09/2026) :** le crédit d'hébergement Netlify de l'utilisateur a été épuisé (101 déploiements de production consommés), ce qui a bloqué le déploiement automatique pendant plusieurs commits. L'utilisateur a rechargé son crédit. Si une session future constate à nouveau que `currentDeploy` reste bloqué sur un vieil ID malgré des commits poussés, vérifier d'abord ce point (tableau de bord Netlify → Billing → Credit usage) avant de chercher un bug côté code.

## Photo réelle sur la fiche Bonporteau — FAIT (20/09/2026)

L'utilisateur a pris ses propres photos de la plage de Bonporteau (Cavalaire-sur-Mer) et a demandé de remplacer la photo Unsplash générique par une vraie photo du lieu. Photo choisie, redimensionnée (1600px de large, JPEG qualité 0.82, via un canvas headless — pas d'outil ImageMagick/sharp dans ce sandbox) et enregistrée en local dans `src/assets/bonporteau.jpg` (plus d'URL Unsplash externe pour cette fiche).

**Point technique important pour toute future fiche avec une photo perso (pas Unsplash) :**
- Le champ `photoUsername`/`photoName` ne doit plus être renseigné (ces champs déclenchent l'affichage du crédit "Photo : ... / Unsplash" dans `fiche.njk`, désormais conditionnel — `{% if photoUsername %}` — donc rien ne s'affiche si absent).
- **La photo était au format portrait (téléphone), alors que le bandeau `.fiche-hero` du site est très large et bas (ratio proche de 5:1)** — un centrage par défaut ne montrait qu'une fine bande horizontale de l'image, coupant la plage/le sable. Nouveau champ optionnel `heroImagePosition` (ex: `"center 55%"`) ajouté dans `fiche.njk` (`style="object-position: ..."` sur le `<img>` du bandeau) pour recentrer verticalement une photo portrait dans ce bandeau très large, sans toucher au recadrage des vignettes (cartes plages sur l'accueil/pages département), qui utilisent un ratio 16:10 bien plus tolérant et affichent déjà toute la composition correctement par défaut.
- Réglage trouvé par test empirique (capture d'écran headless), pas par calcul seul — le rapport entre la largeur du bandeau et la hauteur du contenu texte rend le calcul peu intuitif, mieux vaut toujours vérifier visuellement avant de valider un `heroImagePosition`.

**Précisions d'accès ajoutées (mêmes photos, panneaux officiels sur place)** : parking exact (Chemin Pierre Foncin, 1,4 km à pied) et mention du sentier de la Corniche des Maures (site naturel protégé, classé patrimoine national) dans le corps de la fiche + sidebar.

**Photo de Coco sur le sentier ajoutée à la page "À propos"** (`src/assets/coco-sentier.jpg`), dans le premier paragraphe de l'histoire — illustre concrètement le goût de Coco pour les balades en nature.

## Toilettes publiques sur les fiches plages — FAIT (20/09/2026)

Demande de l'utilisateur suite à une correction terrain (voir ci-dessous) : indiquer les toilettes publiques à proximité sur les fiches plages, uniquement quand une source fiable le confirme (jamais deviner).

**Déclencheur** : l'utilisateur a personnellement vérifié sur place que la fiche `bonporteau.njk` mentionnait à tort une douche canine ("Douche sur la plage") — corrigée en "Aucune douche sur la plage", avec ajout de l'info WC public confirmée par lui de visu.

**Infrastructure** : nouvelle icône `i-wc` dans `src/_includes/base.njk` (simple pictogramme porte/poignée, cohérent avec le style des autres icônes du site). Nouvelle entrée `infoItems` standard :
```yaml
  - icon: "i-wc"
    label: "Toilettes"
    value: "<description factuelle>"
```

**Recherche menée sur les 40 fiches plages du site** (catégories `plages` + `cote-azur`), via 4 agents en parallèle, chacun avec consigne stricte : n'ajouter l'info que si une source officielle (mairie, office de tourisme, CRT/CDT régional) confirme explicitement des toilettes pour CETTE plage précise — jamais une mention vague de forum, jamais une déduction ("d'autres plages de la commune en ont, donc celle-ci doit en avoir aussi" a été explicitement rejeté comme insuffisant par les agents).

- **23 fiches complétées** avec l'info toilettes (sourcée, vérifiée individuellement) : bonporteau, canadel, escalet, mourillon-toulon, pampelonne, port-grimaud, antibes-salis, bormes-les-mimosas, cap-dail, capucins-la-ciotat, carro-martigues, iles-lerins, le-pradet-caniplouf, napoleon-port-saint-louis, nice-carras, piemanson-arles, roquebrune-cap-martin, saint-jean-cap-ferrat, saint-laurent-du-var-vespins, saint-raphael-beaurivage, six-fours, villefranche, villeneuve-loubet.
- **17 fiches laissées inchangées**, faute de source fiable spécifique à la plage (ou source confirmant explicitement l'absence de toilettes) : bonne-terrasse, ramatuelle, sainte-maxime, bandol, beauduc-camargue, cagnes-hippodrome, frejus-argens, frioul-marseille, hyeres-merou, ile-verte, la-londe-bormettes, la-seyne-toutou-beach, menton, nice-lanterne, nice-lenval, niolon, plage-est-saintes-maries.
- Build vérifié propre après chaque lot, rendu HTML contrôlé sur un échantillon de chaque lot avant commit, déployé.

**Reste à faire si on veut pousser plus loin (pas urgent)** : les 17 fiches sans info pourraient être revisitées si l'utilisateur repère lui-même des toilettes lors d'une visite (comme pour Bonporteau) — c'est un champ optionnel, zéro maintenance si rien ne change.

## Mode sombre, RSS, partage du site, correction CLS — FAIT (20/09/2026)

- **Mode sombre** : bouton soleil/lune dans le header (`#theme-toggle`), état mémorisé dans `localStorage` (`cocoTheme`), respecte `prefers-color-scheme` du système à la toute première visite, appliqué par un script bloquant en tête de `<head>` pour éviter tout flash blanc au chargement. **Point technique important pour la suite** : plusieurs variables de couleur de marque (`--blanc`, `--pin-deep`, `--pin`, `--sable`) servent à la fois de fond d'accent fixe (hero, footer, tags, bandeau cookies — qui ne doivent JAMAIS changer entre les deux thèmes) et de couleur de texte/surface sur fond clair (qui, elle, doit changer). Un remplacement direct de ces variables aurait cassé le premier usage. Solution : nouveaux alias sémantiques `--surface`, `--surface-soft`, `--heading`, `--heading-soft` (isolent le second rôle) et `--ink` (triplet RGB réutilisé via `rgba(var(--ink), X)` pour toutes les bordures discrètes et texte atténué). **Pour toute nouvelle règle CSS ajoutée à l'avenir : ne jamais utiliser `var(--blanc)`/`var(--pin-deep)`/`var(--pin)`/`var(--sable)` pour du texte ou un fond de carte — utiliser les alias `--surface`/`--surface-soft`/`--heading`/`--heading-soft` à la place, sinon ce texte restera invisible en mode sombre.** Testé visuellement sur 5 types de pages (accueil, fiche, page légale, 404, FAQ) en clair et en sombre.
- **Flux RSS** (`src/feed.njk` → `feed.xml`) : les 30 dernières fiches ajoutées, lié dans `<head>` (découverte auto par les lecteurs RSS) et dans le footer. Échappement XML correct des apostrophes/caractères spéciaux (validé par un parseur XML) en n'utilisant volontairement PAS le filtre `| safe` sur les champs texte, contrairement au reste du site — Nunjucks échappe alors automatiquement en entités valides à la fois en HTML et en XML.
- **Partage du site** sur la page d'accueil (en plus du partage par fiche déjà existant) : bouton WhatsApp + "Copier le lien" (`src/search.js`, presse-papiers avec repli si l'API est indisponible).
- **Vrai bug de décalage visuel (CLS) corrigé** : les photos jointes aux avis par les visiteurs (dimensions variables, contrairement aux photos Unsplash déjà protégées par un `aspect-ratio` CSS) n'avaient aucun espace réservé — le texte sautait pendant leur chargement. Corrigé avec `aspect-ratio: 4/3` + `object-fit: cover` sur `.avis-item .photo`.

## Quatre améliorations supplémentaires — FAIT (20/09/2026)

- **"Autres idées à proximité"** : en bas de chaque fiche, jusqu'à 3 suggestions de la même catégorie (même département en priorité, complété par les autres si besoin). Nouveau filtre Eleventy `related` dans `eleventy.config.js`, section ajoutée dans `src/_includes/fiche.njk`, masquée automatiquement si aucune fiche à suggérer (catégories très restreintes).
- **`site.webmanifest`** : permet d'ajouter proprement Coco Explore en icône sur l'écran d'accueil d'un téléphone (nom, couleurs de marque, favicon + apple-touch-icon déjà existants). Lié dans `src/_includes/base.njk` avec un `<meta name="theme-color">`.
- **`sitemap.xml` avec de vraies dates `<lastmod>`** : remplacé l'ancien système qui affichait la date du build pour toutes les URLs (donc sans aucune valeur informative) par la date du dernier commit git de chaque fichier fiche (nouveau filtre `lastmod`, `execSync("git log -1 --format=%cI -- <fichier>")`, mémoïsé). Résultat vérifié : la fiche Escalet (photo corrigée le 19/09) affiche bien `2026-09-19`, différente des autres fiches non touchées — aide Google à identifier les pages réellement mises à jour. Ajoute ~4-5s au temps de build (310 appels git), sans impact pratique.
- **Accessibilité clavier** : lien "Aller au contenu" (`.skip-link`, visible uniquement au focus clavier) + landmark sémantique `<main id="main-content">` autour du contenu de chaque page + contour de focus visible (`:focus-visible`, couleur terracotta) sur tous les liens/boutons/champs du site, pour la navigation au clavier et les lecteurs d'écran.
- Tout testé en headless (Playwright) avant déploiement : fiches similaires rendues avec les bons titres, lien d'évitement qui devient visible au focus (Tab), manifeste et sitemap vérifiés directement dans le HTML/XML généré.

## Google Analytics (GA4) + bannière cookies — FAIT (20/09/2026)

- Propriété/flux GA4 créé côté utilisateur (ID de mesure `G-BG010Z1RGE`). Blocage mobile finalement contourné en passant Safari en "Affichage pour ordinateur" puis en tournant le téléphone en paysage pour faire apparaître le bouton "Créer le flux" caché par la mise en page desktop compressée sur petit écran.
- Snippet gtag.js **jamais chargé par défaut** : ajouté dans `src/cookie-consent.js`, injecté dynamiquement uniquement après consentement explicite de l'utilisateur (bandeau en bas de toutes les pages via `src/_includes/base.njk`, bouton "Accepter"/"Refuser", aucune case pré-cochée). Choix mémorisé dans `localStorage` (`cocoCookieConsent`), rechargé automatiquement aux visites suivantes sans redemander. Lien "Gérer les cookies" dans le footer pour rouvrir le bandeau et changer d'avis à tout moment (conforme RGPD/CNIL : consentement préalable, refus aussi facile que l'acceptation, réversible).
- `src/politique-confidentialite.njk` mis à jour : nouvelle section "Mesure d'audience (Google Analytics)" + ligne ajoutée au tableau récapitulatif des données (remplace l'ancienne mention "le Site n'utilise pas d'outil de mesure d'audience").
- Testé en headless (Playwright) : bandeau visible à la première visite, clic "Refuser" → zéro requête vers `googletagmanager.com` même après rechargement, clic "Accepter" → script chargé + consentement persisté, visite ultérieure avec consentement déjà "granted" → chargement automatique sans réafficher le bandeau, lien "Gérer les cookies" → rouvre le bandeau même après un choix antérieur.
- **Rien à refaire côté utilisateur dans Google Analytics.** Le tableau de bord GA4 mettra quelques jours à afficher du trafic une fois que le site aura de vraies visites.

## Améliorations du site — FAIT (session du 19/09/2026, soir)

Une série d'idées d'amélioration proposées par Claude et validées une par une par l'utilisateur, toutes gratuites (aucun service payant) :

- **Recherche fonctionnelle sur l'accueil** : la barre de recherche était purement décorative (`onsubmit="return false"`) — remplacée par une vraie recherche côté client (`src/search.js`), filtre `window.COCO_LIEUX` (titre/lieu/catégorie, insensible aux accents), affiche jusqu'à 8 résultats en menu déroulant, Entrée/submit va vers le premier résultat. Zéro dépendance externe.
- **Bug d'accessibilité mobile corrigé** : le menu de navigation par catégorie était en `display: none` sur mobile, sans aucun autre moyen d'accès — remplacé par un vrai menu hamburger fonctionnel (`src/_includes/base.njk`, bouton `#nav-toggle` + script inline), testé et vérifié.
- **Section "Nouveautés"** sur l'accueil : affiche automatiquement les 6 dernières fiches ajoutées (nouveau filtre Eleventy `latest(n)`, tri par `data.order` décroissant) — zéro maintenance, suit les futurs ajouts tout seul.
- **Icône Instagram** dans l'en-tête (`danslesyeuxdecoco`), placée hors du menu mobile collapsible pour rester toujours visible (`.header-actions`), corrigé après un premier essai où elle était invisible sur téléphone.
- **Lien "Signaler une erreur"** sur chaque fiche : `mailto:contact@cocoexplore.com` pré-rempli avec le nom et l'URL de la fiche.
- **Partage WhatsApp** sur chaque fiche : lien `wa.me` pré-rempli avec un message décrivant le lieu.
- **Page FAQ** (`src/faq.njk`) : 8 questions/réponses en accordéons natifs `<details>`, plus JSON-LD `FAQPage` (texte identique au contenu visible, requis par Google).
- **Page "À propos"** (`src/a-propos.njk`) : histoire d'origine du site, valeurs, lien Instagram/contact. **⚠️ Contenu volontairement générique par endroits — l'utilisateur doit fournir de vrais détails personnels (âge de Coco, élément déclencheur du projet, depuis quand le site existe) pour enrichir cette page. Il a dit "je te donnerai ça demain" — à relancer.**
- **Favicon** (`src/favicon.svg`, patte de couleur marque) + `apple-touch-icon.png` (512×512, généré par capture d'écran headless faute d'outil SVG→PNG dans le sandbox).
- **Page 404 personnalisée** (`src/404.njk`) : message convivial + 3 suggestions de fiches dynamiques (`latest(3)`). Repose sur la convention Netlify par défaut (sert `404.html` pour toute route non trouvée, aucune config `netlify.toml` nécessaire). **Piège rencontré et corrigé** : la première version mettait la boucle Nunjucks dans le champ de données `bodyHtml` affiché via le layout `legal.njk` (qui fait juste `{{ bodyHtml | safe }}`) — une donnée de front-matter n'est jamais re-analysée comme un template, donc la boucle s'affichait en texte brut. Corrigé en utilisant `layout: base.njk` directement avec le contenu dans le corps du fichier (comme `index.njk`), qui lui est bien compilé par Nunjucks (`{{ content | safe }}` dans `base.njk`).
- **Système de favoris** (`src/favoris.js`, `localStorage`) : bouton étoile sur chaque fiche (`#fav-toggle`), section "Mes favoris" sur l'accueil qui n'apparaît que si l'utilisateur a au moins un favori enregistré. `window.COCO_LIEUX` étendu avec un champ `"img"` pour permettre le rendu des cartes favoris.

Tout testé fonctionnellement en headless (Playwright) avant déploiement : recherche, menu mobile, bascule favori + persistance localStorage + apparition de la section sur l'accueil, page 404 sans résidu de syntaxe Nunjucks. Build propre, déployé, Netlify confirmé `state: "ready"`.

**Fait depuis (session du 20/09/2026 matin) :**
- **"À propos" enrichie** avec les vrais détails fournis par l'utilisateur (Coco a 6 ans, ses habitudes, l'idée du site mûrie plus d'un an et demi avant sa mise en ligne, née de balades entre amis). Ton volontairement resté sobre et simple à la demande explicite de l'utilisateur — pas de détails trop personnels.
- **Google Analytics** : fait, voir section dédiée plus haut.

**Reste à faire :** l'utilisateur veut continuer à demander des idées d'amélioration jusqu'à épuisement, puis basculer vers la recherche de fiches supplémentaires (portée pas encore définie — la règle "PACA uniquement sauf demande contraire" reste en vigueur).

## Liens "Site officiel" sur les fiches commerciales — FAIT (19/09/2026)

Demande de l'utilisateur : sur les fiches restaurant/toiletteur/vétérinaire/hébergement, permettre un accès direct au site web du commerce. Consigne explicite et répétée par l'utilisateur : **rester strict, ne jamais publier un lien qui ne correspond pas exactement au bon établissement — plutôt ne rien mettre que de deviner.**

**Infrastructure (générique, s'applique automatiquement à toute fiche) :**
- Nouveau champ optionnel `siteWeb` en front-matter (placé juste après `departement`).
- `src/_includes/fiche.njk` affiche un lien "Site officiel ↗" dans le bandeau d'infos UNIQUEMENT si `siteWeb` est renseigné — sinon rien ne s'affiche, pas de lien cassé ni deviné.
- Nouvelle icône `i-link` dans `src/_includes/base.njk`. Style dans `src/style.css`.

**Contenu : 126 fiches sur ~176 fiches commerciales ont désormais un lien confirmé** (toiletteurs, vétérinaires, restaurants, hébergements/campings, dog wash, dog-sitters). Le reste (~50 fiches) a été volontairement laissé sans lien — pas de site officiel trouvé/confirmable, ou seulement des annuaires génériques (PagesJaunes, Google Maps, etc., qui ne comptent jamais comme "site officiel"). Une page Facebook/Instagram dédiée à l'établissement compte comme "officiel" si aucun site propre n'existe.

**Contrôle qualité fait sérieusement (pas juste le rapport des agents pris pour argent comptant) :**
- Une passe de vérification indépendante (nouvel agent, recherches fraîches) a été lancée spécifiquement sur les cas les plus à risque (adresses ambiguës, domaines similaires, catégorie vétérinaire).
- **2 erreurs réelles trouvées et corrigées :**
  1. `restaurant-petite-etoile.njk` (Draguignan) : deux domaines quasi-identiques existent pour ce restaurant, correspondant à deux adresses différentes sur la même avenue (14 vs 26). Le mauvais avait été choisi initialement — corrigé vers celui qui correspond réellement à l'adresse de la fiche (confirmée par un arrêté municipal officiel de Draguignan).
  2. `camping-huttopia-serre-poncon-ubaye.njk` : la fiche situait le camping sur la commune "Le Lauzet-Ubaye", qui est en réalité une commune distincte et non voisine-fusionnée. Le camping est en fait à Saint-Vincent-les-Forts (commune d'Ubaye-Serre-Ponçon). Nom de lieu, adresse et coordonnées GPS corrigés. Le lien du site officiel, lui, était déjà correct.
- Un numéro de téléphone potentiellement discordant (CHV Massilia, urgences vétérinaires Marseille) a été personnellement revérifié par recherche web directe : le numéro de la fiche (04 91 82 13 13) est confirmé exact par 7+ sources indépendantes fraîches — fausse alerte, aucune correction nécessaire.
- 3 vérifications supplémentaires par échantillonnage (Nice, Cogolin, La Seyne-sur-Mer) toutes confirmées bonnes.
- Aucun autre problème structurel détecté (0 doublon de champ, bon placement partout, build propre, JSON-LD toujours valide).

**Reste à faire si on veut pousser plus loin (pas urgent, l'essentiel est fait) :** les ~50 fiches sans lien pourraient être revisitées ponctuellement si l'utilisateur repère lui-même qu'un établissement a ouvert un site depuis. Pas de suivi automatique nécessaire — c'est un champ optionnel, zéro maintenance si rien ne change.

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

- **Longueurs title/meta description** : ✅ FAIT (19/09/2026) — audit systématique des 310 fiches (pas juste un échantillon). 68 fiches corrigées : 39 descriptions trop courtes (surtout des toiletteurs/vétérinaires avec une description d'une seule ligne) enrichies avec des faits déjà vérifiés ailleurs dans la même fiche (adresse, services) ; 23 descriptions trop longues raccourcies en gardant les faits et réserves de sourcing importants ; 6 titres largement au-dessus de 70 caractères raccourcis. Zéro problème restant (title 15-70 car., description 70-160 car.) au dernier passage.

**Reste à faire (toujours gratuit) :**
- Attendre quelques jours/semaines que Google indexe le site (rien à faire, c'est automatique une fois Search Console configuré) puis vérifier le rapport "Performances" avec l'utilisateur pour voir les premiers résultats. **C'est maintenant le seul élément restant du chantier référencement.**
- Un futur `Sitemap ping`/resoumission n'est pas nécessaire à chaque changement, Google recrawle automatiquement une fois Search Console configuré.

## Tâches secondaires restantes avant/à côté du SEO

- Dog Wash / Dog-sitter : ✅ FAIT (19/09/2026) — étendu aux 5 autres départements PACA (06, 13, 84, 04, 05), voir section dédiée plus bas pour le détail complet. Ces deux catégories couvrent maintenant toute la région PACA comme les autres.

## Navigation par département — FAIT (18/09/2026, session du soir)

La navigation par secteur demandée par l'utilisateur est en place et déployée :
- Chaque fiche a maintenant un champ `departement: ["83"]` (ou plusieurs codes pour les lieux à cheval sur deux départements : Sainte-Baume 83+13, Mercantour 06+04, Lac de Sainte-Croix 83+04, Serre-Ponçon 05+04, gorges de la Siagne 83+06, l'ancienne fiche "Alpes du Sud" 04+05).
- `src/_data/departements.js` liste les 6 départements PACA (id, nom, slug, intro).
- `src/departement.njk` génère automatiquement une page par département (`departement-var.html`, etc.) listant toutes ses fiches groupées par catégorie — aucune maintenance manuelle nécessaire, ça suit les fiches existantes.
- Nouveaux filtres Eleventy : `byCategoryAndDept`, `countByCatsAndDept`, `countByDept` (dans `eleventy.config.js`).
- Section "Explorer par secteur" ajoutée sur la page d'accueil (sous "Explorer par catégorie"), avec liens vers les 6 pages département.
- Sitemap mis à jour avec les 6 nouvelles pages.

**⚠️ IMPORTANT pour toute nouvelle fiche créée à partir de maintenant : il faut ajouter manuellement le champ `departement: ["XX"]` dans le front-matter (juste après `breadcrumbCatId`), sinon la fiche n'apparaîtra sur AUCUNE page département.** Le script de rattrapage ne tourne qu'une fois (déjà fait sur les 277 fiches existantes au moment de sa création) — il faut penser à instruire les agents de recherche d'ajouter ce champ pour du contenu futur, ou le rajouter soi-même après coup comme fait pour `restaurant-farandole-du-gout-embrun.njk`.

## Nouvelles catégories Dog Wash / Dog-sitter — ✅ COMPLET SUR TOUTE LA RÉGION PACA (19/09/2026)

Structure en place (nav.js, sections.js, map.js). Contenu par département :

- **Var (83)** — Dog Wash (5) : Toutou Douche (Marines de Cogolin), The Dog Wash (Saint-Cyr-sur-Mer), Dog Wash du Port (Hyères), Laverie La Baleine (Six-Fours-les-Plages), Dog Wash du Port (Cavalaire-sur-Mer — seule fiche du site sourcée sur connaissance personnelle de l'utilisateur plutôt que sur une recherche web, explicitement indiqué dans le corps de la fiche). Dog-sitter (2) : Pat'Enfoliz (Toulon/Hyères), Pinou & Co (Gassin).
- **Alpes-Maritimes (06)** — Dog Wash (2) : Doggy Wash Express (Nice), DogWash Perle & Co (Mouans-Sartoux). Dog-sitter (3) : AntibesDogz, DogSitting à Nice, Dog Attitude (Mougins, chenil professionnel).
- **Bouches-du-Rhône (13)** — Dog Wash (6) : Teddy Wash, Dogwash La Valentine, My Dog Wash (tous Marseille), Dogwash de Ceyreste (La Ciotat), Liberty Dog Wash (Châteauneuf-les-Martigues), Les Copains de Romy (Salon-de-Provence). Dog-sitter (4) : AD Petsitting (Salon-de-Provence), Les Animaux d'Élodie (Allauch), Naïa & Co (Aix-en-Provence), Mélissa Cô (Lambesc).
- **Vaucluse (84)** — Dog Wash : 0 (aucune station trouvée, département rural sans littoral — recherche exhaustive faite, résultat honnête). Dog-sitter (2) : Animob'Isle (L'Isle-sur-la-Sorgue, pension sans box), Chenil des Confines (Sorgues, chenil professionnel avec boxes).
- **Alpes-de-Haute-Provence (04)** — Dog Wash (2) : deux bornes Dogwash à Manosque (Relais des Ponches / station Total, et devant l'animalerie Top Animal). Dog-sitter : 0 (rien de solidement sourcé trouvé).
- **Hautes-Alpes (05)** — Dog Wash : 0 (rien trouvé, attendu pour ce département rural/montagnard). Dog-sitter (1) : Coco Pet Sitting (Gap) — sourcing plus faible que les autres (une seule source pour tarifs/avis), explicitement signalé dans la fiche.

**Ces deux catégories couvrent désormais toute la région PACA**, comme toutes les autres. Beaucoup de fiches Dog Wash/Dog-sitter comportent plus de hedging ("à confirmer sur place", tarifs non publiés) que les catégories plus anciennes du site (plages, restaurants) car ce sont des services plus récents/informels avec moins de présence en ligne — c'est normal et assumé, pas un signe de mauvais travail.

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
