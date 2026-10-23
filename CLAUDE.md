# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 101 départements couverts (96 métropolitains + 5 DOM, couverture nationale complète), ~9300 fiches.

## Historique — campagnes SIRENE + enrichissement hébergements/plages-balades (octobre 2026, résolues)

Deux chantiers nationaux, menés l'un après l'autre comme prévu (pas en parallèle) :

- **Campagne SIRENE** (vérification factuelle adresse/téléphone/statut des fiches vétérinaires) : terminée sur les 101 départements (dernier round, Mayotte 976, le 17/10/2026).
- **Enrichissement hébergements + plages/balades** (idée issue d'un brainstorm Gemini, démarrée juste après la fin de SIRENE le 17/10/2026, terminée le 22/10/2026) : traité en méthode batch par département (recherche par lots puis rédaction), couvrant la quasi-totalité des départements (01 à 59 + toute la Normandie en premier) ; le reste (60 à 95, 2A/2B, DOM) s'est avéré déjà enrichi avec les mêmes critères lors d'un round antérieur (constat fait fiche par fiche, pas de simple supposition).
  - **Fiches hébergements** : conditions d'accueil précises quand elles existaient chez la source — supplément tarifaire par nuit/par animal, restrictions de taille/catégorie/nombre de chiens, chien seul en chambre ou non, "pet amenities" (toutoubar/gamelle d'eau, espace de rinçage retour de plage, friandises d'accueil, jardin clos).
  - **Fiches plages/balades** : réglementation saisonnière quand elle existait (arrêté municipal : dates/horaires, laisse obligatoire ou non) et données de terrain utiles au chien (type de sol, ombre, points d'eau/rivières, difficulté du parcours, présence de troupeaux/patous en montagne).

Si une lacune resurgit sur ces deux critères (ex. nouvelle fiche créée sans ces infos, ou département oublié), la retraiter à l'identique (recherche par lot → rédaction → build → commit), pas besoin de relancer tout le chantier.

## Historique — nettoyage "Confiance X" en public (novembre 2026, résolu)

En creusant un CTR anormalement bas sur plusieurs fiches bien classées dans Search Console, découverte que ~2133 fiches (sur ~9300, environ un quart du site) avaient la mention interne **"Confiance faible/moyenne/haute"** littéralement dans le champ `description` du frontmatter — donc visible dans le snippet Google, jamais censée être publique (c'est une annotation de travail issue des rounds de recherche/vérification).

- **Les 2133 fiches sont corrigées** : 1831 par script automatisé, puis les ~302 restantes (trop ambiguës pour un script — mention répétée, ou collée à une info factuelle à ne pas perdre) traitées à la main par 6 agents en parallèle. Le champ `description` du site est maintenant propre : plus aucune occurrence de "confiance faible/moyenne/haute" dedans.
- **Ne pas toucher** aux mentions "confiance X" dans le corps (`bodyHtml`) ou les sidebars — c'est une information légitime pour le lecteur là où elle apparaît dans le texte visible normal de la fiche (pas dans un champ meta invisible à l'affichage). Volontairement laissé intact partout.
- **Doutes factuels non résolus** : plusieurs dizaines de fiches gardent un vrai doute non tranché dans leur `bodyHtml` (adresse contradictoire, tarif divergent entre sources, téléphone non reconfirmé, statut chien non trouvé...) — volontairement laissés visibles pour le lecteur plutôt que supprimés ou forcés sans preuve. Pas de liste consolidée conservée ; à ressortir au besoin via une recherche ciblée sur les fiches concernées si un futur round de vérification s'y attaque.

### `cardTeaser` — résolu aussi

Le champ **`cardTeaser`** (texte affiché publiquement sur les cartes du site — accueil, pages département, section "à proximité" des fiches, donc *encore plus visible* que la meta description qui n'apparaît que dans Google) portait lui aussi la mention "confiance X" sur 887 fiches. Corrigé en totalité : 805 par script automatisé, 82 restantes (mention répétée, ou collée à une info factuelle) traitées à la main par 2 agents, avec attention particulière à la ponctuation (ne pas recoller deux phrases sans point après suppression d'une parenthèse "(confiance X)." en milieu de texte — bug repéré et corrigé dans le script avant application, voir `git log`).

**Bilan complet du chantier "confiance X" publique** : `description` (2133 fiches), `cardTeaser` (887 fiches) et `title` (96 fiches, découvert le 22/10/2026 en analysant l'export Search Console — le champ le plus visible, lien bleu Google + og:title) sont désormais propres sur tout le site. `bodyHtml`/sidebars volontairement non touchés (légitimes pour le lecteur). Si un nouveau champ public affichant cette mention est découvert plus tard, même méthode : grep `[Cc]onfiance (faible|moyenne|haute)` sur le champ concerné, script automatisé pour les cas simples (lead/tail safety checks, attention à ne pas supprimer un point qui sert de séparateur de phrases), agents pour les cas ambigus restants.

## Programme partenaire (démarrage commercial)

Le site propose une mise en avant payante optionnelle aux professionnels déjà référencés gratuitement (vétérinaires, restaurants, hébergements...). Statut : en phase de test manuel, pas encore de vrai partenariat signé.

- **Page publique** : `src/devenir-partenaire.njk` (accessible depuis le menu hamburger) — volontairement sans tarif affiché, juste les explications et un contact mailto.
- **Mécanisme technique** : ajouter `partenaire: true` au frontmatter d'une fiche déclenche un badge doré "Partenaire" sur ses cartes (accueil, page département, "à proximité") et un tag dans son hero. CSS : classes `.fiche-card.is-partenaire`, `.access-badge.badge-partenaire`, `.fiche-partenaire-tag` dans `src/style.css`.
- **Un seul badge : « Partenaire », payant.** Décision de l'utilisateur (23/10/2026) : pas de badge gratuit « Référencé sur Coco Explore » à afficher par les professionnels (créé puis retiré le même jour, URL redirigée vers `/devenir-partenaire`). Ne rien proposer qui puisse se confondre avec le badge payant ; un échange de lien se fait sans badge.
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

Premier envoi test envisagé auprès de la Clinique Vétérinaire du Dr Jackowski (Cavalaire-sur-Mer) — fiche supprimée début novembre 2026 après un faisceau d'indices de fermeture (avis client isolé évoquant une fermeture fin 2023, site officiel chezmonveto.com injoignable en DNS, aucun email public trouvé), **puis recréée le 9 octobre 2026** : l'utilisateur a vérifié sur place (capture Google Maps) et la clinique est bien active — 4,8/5 sur 85 avis, en activité depuis plus de 5 ans. Les infos de contact (téléphone, adresse, horaires) viennent de l'ancienne recherche, déjà cohérentes avec l'adresse vue sur Maps. Pas de nouveau site web renseigné (l'ancien restait mort).

**Changement de canal pour ce premier contact (10/10/2026)** : l'utilisateur a vérifié qu'aucune adresse email n'est trouvable (seul un numéro de téléphone figure sur les sources disponibles), donc le modèle d'email ci-dessus ne s'applique pas à ce cas précis. L'utilisateur a un rendez-vous à venir avec sa chienne Coco chez le Dr Jackowski et démarchera **de vive voix** à cette occasion, plutôt que par écrit. Pas d'action de notre côté à prévoir pour ce premier contact (pas d'email à rédiger/envoyer) — si l'utilisateur le demande, on peut préparer un support oral (quelques points clés à dire en rendez-vous, adaptés du modèle d'email) mais ce n'est pas encore demandé.

## Affiliation (en cours d'inscription, novembre 2026)

Piste explorée en complément (pas en remplacement) du Programme partenaire ci-dessus : l'utilisateur s'inscrit comme affilié chez **SantéVet** (assurance santé chien/chat), programme confirmé via le réseau **Awin** — 6€ par lead "intégré" (devis en ligne), cookie de 30 jours. Contact direct pour candidater : `affiliation@santevet.com`. Alternative notée mais non vérifiée en détail : Carrefour Assurance Animaux (via FlexOffers, ~48€/lead annoncé sur un annuaire tiers, conditions non confirmées sur source primaire). Bulle Bleue écarté : pas de programme d'affiliation public trouvé (marque distribuée par Animal Experts/SantéVet, pas de portail d'inscription).

**Statut au 2026-10-15** : le compte publisher Awin est **actif** (Coco Explore, ID 3122486, immatriculé le 13/10/2026), profil complété (description + site ajouté dans "Espaces publicitaires", secteur Retail & Shopping > Animaux). En revanche, **SantéVet n'apparaît pas dans le répertoire des annonceurs Awin en inscription libre** (recherche testée avec et sans accent, filtres réinitialisés puis essai "Finance" — aucun résultat à chaque fois) : le programme est probablement accessible sur invitation uniquement, pas en self-service. Le message ci-dessous a donc été **envoyé directement** à affiliation@santevet.com le 15/10/2026 à 21:36 (depuis contact@cocoexplore.com), adapté pour mentionner l'ID du compte Awin et demander la marche à suivre. **En attente de la réponse de SantéVet** — elle dira si la candidature passe par une invitation Awin à obtenir d'eux, ou par un autre circuit.

### Message envoyé à SantéVet (affiliation@santevet.com) le 15/10/2026

```
Objet : Candidature programme d'affiliation — Coco Explore (voyager avec son chien)

Bonjour,

Je gère Coco Explore (cocoexplore.com), un guide en ligne gratuit qui aide les
propriétaires de chiens à trouver des lieux adaptés partout en France : plages,
restaurants, hébergements, balades, vétérinaires, toiletteurs. Le site couvre
l'ensemble du territoire (101 départements, métropole et outre-mer) avec
plusieurs milliers de fiches.

J'ai créé un compte publisher sur Awin (ID 3122486, profil complété) et je
souhaiterais candidater à votre programme d'affiliation. Je ne le trouve
cependant pas en inscription libre dans le répertoire des annonceurs Awin —
pourriez-vous me dire si votre programme est accessible sur invitation, ou
m'indiquer la marche à suivre pour candidater ?

L'assurance santé pour chien est un sujet très cohérent avec notre audience —
des propriétaires qui voyagent avec leur animal et se posent naturellement la
question de sa couverture en déplacement.

Je prévoirais d'intégrer le lien de façon pertinente, par exemple dans nos
fiches vétérinaires ou dans un article dédié aux conseils de préparation d'un
voyage avec son chien, avec la mention de lien affilié requise.

N'hésitez pas à me dire si vous avez besoin d'informations complémentaires sur
le site pour étudier la demande.

Belle journée à vous,
Damien Fleurot
Coco Explore — cocoexplore.com
```

Pas d'action de notre côté en attendant la réponse de SantéVet. Une fois la marche à suivre connue (et un lien tracké réel obtenu), prévoir son insertion dans 1-2 fiches vétérinaires urgences et/ou un futur article "conseils de Coco" sur la préparation d'un voyage, avec la mention de lien affilié obligatoire (cadre légal français).

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

## Avis visiteurs — modération (octobre 2026)

Les avis déposés sur les fiches (formulaire ouvert, photo possible) passent par `netlify/functions/avis.mjs` (stockage Netlify Blobs `avis-coco-explore`, une clé par `avisSlug`).

- **Modération avant publication** depuis le 22/10/2026 : tout nouvel avis est `status: "pending"` et n'apparaît sur la fiche qu'après validation. Les avis antérieurs (sans `status`) restent publiés.
- **Page d'admin** : `/admin-avis` (`src/admin-avis.njk`, noindex, hors sitemap) — onglets En attente / Publiés, boutons Valider / Supprimer. Protégée par la variable Netlify **`ADMIN_KEY`** (secret, choisi par l'utilisateur, jamais à écrire dans le dépôt ni dans une conversation).
- **Notification** : à chaque nouvel avis, push envoyé sur ntfy.sh via la variable **`NTFY_TOPIC`** ; l'utilisateur est abonné au canal dans l'app ntfy sur son iPhone.
- **Anti-spam** : champ piège invisible `website` dans le formulaire (rempli = robot, ignoré sans erreur), 5 avis max par visiteur et par heure, admin bloquée 15 min après 5 mauvais mots de passe. Compteurs dans le store Blobs `avis-limites`, IP hachées (jamais en clair).
- Une variable d'environnement modifiée sur Netlify n'est prise en compte qu'au déploiement suivant.

## Guides pratiques (octobre 2026)

Rubrique `/guides` (`src/guides.njk`) : articles « comment voyager avec son chien » dans `src/guides/*.njk` (gabarit `src/_includes/guide.njk`, collection `guides` triée par `order`, URL `/guide-<sujet>`). Chaque guide liste ses `sources` (pages officielles lues en entier) et sa date `updated`, affichée en tête d'article : la mettre à jour à chaque révision. Règle : aucun tarif, délai ou règle sans source lue ; en cas de contradiction entre sources, le dire dans le texte. Les tarifs (SNCF, compagnies aériennes, ferries) changent souvent : à revérifier au moins une fois par an. C'est aussi là qu'ira le lien affilié SantéVet le moment venu (avec la mention « lien affilié »).

## Échanges de liens

Les fiches créées en échange d'un lien (sans paiement) sont suivies dans `ECHANGES-LIENS.md` (racine, non publié). Pas de badge public : seule une ligne discrète `<p class="fiche-collab">Fiche réalisée en collaboration avec …</p>` en bas de fiche. Mettre à jour le tableau à chaque nouvelle collaboration ou lien reçu.

## Conventions du projet (voir aussi contexte de session)

- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- **Crédits Netlify : regrouper les mises en ligne.** Chaque `git push` sur `claude/github-connexion-otichf` déclenche un déploiement de production, qui consomme des crédits Netlify (le compte a été à court le 23/10/2026, et les déploiements se sont arrêtés). Donc : committer en local autant que nécessaire, mais **ne pousser qu'environ une fois par heure, ou à la fin d'un chantier** — jamais après chaque petit lot. Pour un commit qui ne change pas le site publié (fichiers `.md` à la racine : `CLAUDE.md`, `SEO-PRIORITES.md`, `ECHANGES-LIENS.md`…), ajouter **`[skip netlify]`** dans le message de commit : Netlify ne lance alors aucun déploiement. Attention, un push contenant à la fois un commit `[skip netlify]` et d'autres commits est déployé normalement (c'est le dernier commit poussé qui compte).
- Build de vérification avant tout commit : `npx @11ty/eleventy && node scripts/check-site.mjs` (les deux doivent passer). Sur Netlify, `npm run build` (`scripts/build.mjs`) enchaîne les deux : **si l'un échoue, le déploiement échoue, la version précédente reste en ligne, et l'utilisateur reçoit une notification ntfy « Mise en ligne bloquee » avec le détail de l'erreur** (variable `NTFY_TOPIC`, scope builds + functions, build de production uniquement). Il bloque : plus de 20 pages en noindex, sitemap qui perd des fiches, « confiance X » dans `title`/`description`/`cardTeaser`, photo Unsplash (`heroImage`) partagée par deux fiches françaises, gabarit `{…}` non remplacé sur les pages catégorie. Ne jamais contourner ce contrôle : corriger la cause.
