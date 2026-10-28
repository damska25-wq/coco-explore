# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 101 départements couverts (96 métropolitains + 5 DOM, couverture nationale complète), ~9300 fiches.

## Historique — campagnes SIRENE + enrichissement hébergements/plages-balades (octobre 2026, résolues)

Deux chantiers nationaux, menés l'un après l'autre comme prévu (pas en parallèle) :

- **Campagne SIRENE** (vérification factuelle adresse/téléphone/statut des fiches vétérinaires) : terminée sur les 101 départements (dernier round, Mayotte 976, le 17/10/2026).
- **Enrichissement hébergements + plages/balades** (idée issue d'un brainstorm Gemini, démarrée juste après la fin de SIRENE le 17/10/2026, terminée le 22/10/2026) : traité en méthode batch par département (recherche par lots puis rédaction), couvrant la quasi-totalité des départements (01 à 59 + toute la Normandie en premier) ; le reste (60 à 95, 2A/2B, DOM) s'est avéré déjà enrichi avec les mêmes critères lors d'un round antérieur (constat fait fiche par fiche, pas de simple supposition).
  - **Fiches hébergements** : conditions d'accueil précises quand elles existaient chez la source — supplément tarifaire par nuit/par animal, restrictions de taille/catégorie/nombre de chiens, chien seul en chambre ou non, "pet amenities" (toutoubar/gamelle d'eau, espace de rinçage retour de plage, friandises d'accueil, jardin clos).
  - **Fiches plages/balades** : réglementation saisonnière quand elle existait (arrêté municipal : dates/horaires, laisse obligatoire ou non) et données de terrain utiles au chien (type de sol, ombre, points d'eau/rivières, difficulté du parcours, présence de troupeaux/patous en montagne).

Si une lacune resurgit sur ces deux critères (ex. nouvelle fiche créée sans ces infos, ou département oublié), la retraiter à l'identique (recherche par lot → rédaction → build → commit), pas besoin de relancer tout le chantier.

## Historique — campagne SIRENE toiletteurs (octobre 2026, résolue)

Après les campagnes garde de chien/dogwash (chantier J, menées par une autre session), vérification factuelle de la catégorie **toiletteurs** sur les 100 départements qui en comptent (1189 fiches) selon la même méthode SIRENE que pour les vétérinaires : recherche directe sur le site officiel, la page Facebook ou le compte Instagram de chaque salon (via le connecteur Parallel Search, qui contourne le blocage réseau de l'environnement), plutôt que de se limiter aux extraits WebSearch ou aux annuaires tiers. Traité en 20 lots de ~5 départements, par agents en parallèle, avec build + `check-site.mjs` avant chaque commit et consolidation régulière (push ~toutes les 4-5 lots).

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, horaires, sites officiels ajoutés) ou confirmées inchangées. Quelques renommages d'enseigne appliqués uniquement quand une source datée confirmait la reprise (ex. Atout Poils → Crea'Dogs à Roquebrune-Cap-Martin, Styl' Canin → Au Bonheur Canin à Audincourt, Esprit Canin → La Truffe Poudrée à Albertville) ; ancien nom toujours conservé en mention "(ex-...)".

**Fermetures quasi-certaines (résolu, 24/10/2026)** : 4 fiches supprimées sur décision de l'utilisateur — **Peluche** (Cayenne, 973 — liquidation judiciaire depuis le 7/05/2026, Bodacc), **À poils et à pattes** (Orléans, 45 — fermeture définitive annoncée pour novembre 2026, le salon cherchait un repreneur), **Idefix Toilettage** (Orléans, 45 — SIREN radié le 23/09/2024), **Pil Poil** (Saint-Claude, 39 — entité radiée du registre depuis 2016). Redirection 301 ajoutée pour chacune vers la page département de la catégorie toiletteurs (`src/_redirects.njk`).

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — anomalies signalées dans le `bodyHtml` mais moins tranchées qu'une fermeture confirmée (contradiction de source, ou remplacement par un autre établissement sans preuve de reprise) :
- **Hair Dog Toilettage** (Chamalières, 63) : SIRENE indique fermé/radié (2023), mais des annuaires tiers le listent encore actif — contradiction non tranchée.
- **Atelier Canin** (Strasbourg, 67) : un autre salon ("Pood'els") occupe l'adresse depuis plus de 3 ans.
- **Au Bonheur du Chien** (Fontainebleau, 77) : un autre salon occupe l'adresse sans lien de reprise confirmé.
- **Patt Club Toilettage** (Pontoise, 95) : remplacé apparemment par "Le Salon de Martine" à la même adresse, sans preuve datée de reprise.
- **Cani Salon** (Delle, 90) : l'adresse réelle du salon est en fait dans le Doubs (25), pas dans le Territoire de Belfort — fiche laissée dans son département actuel, classement géographique à revoir si besoin.

**Catégorisation à vérifier (pas des toiletteurs, ou mixte)** :
- **Michette** (Paris 10e) et **Le SPA Petsochic** (Paris 6e) : toilettage réservé aux chats / n'acceptent pas certains chiens — signalé dans la fiche pour un lecteur qui voyage avec un chien.
- **M2JF Confiez-Nous Marie** (Sainte-Maure-de-Touraine, 37) et **Au'tour du chien** (Bernay, 27) : probables confusions avec une agence de services à la personne / une éducatrice canine plutôt qu'un vrai toiletteur.

Si une nouvelle fiche toiletteur est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE hébergements (octobre 2026, résolue)

Même méthode que toiletteurs/vétérinaires, appliquée aux **2173 fiches hébergements** sur les 101 départements (y compris Mayotte). Traité en 26 lots (3-4 départements chacun, un peu plus gros que les lots toiletteurs car la catégorie est plus dense), par agents en parallèle, avec build + `check-site.mjs` avant chaque commit et consolidation régulière. Consigne spécifique à cette catégorie : ne pas retoucher les conditions d'accueil chien déjà enrichies (supplément/jour, restrictions catégorie/taille, pet amenities) sauf contradiction avérée avec le site officiel lui-même.

**Incident technique en cours de route** : deux lots (dépts 88-91 et 92-95) ont été interrompus par une panne transitoire du classificateur de sécurité côté serveur (pas un problème de contenu). Le travail déjà fait a été récupéré et commité, puis les deux lots ont été rejoués en entier pour garantir une couverture complète (le re-passage sur une fiche déjà corrigée ne fait que la confirmer, sans la retoucher).

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, sites officiels ajoutés, contradictions de tarif/accueil résolues via la source officielle) ou confirmées inchangées. Plusieurs renommages d'enseigne appliqués avec preuve datée, ancien nom conservé en "(ex-...)" — notamment Château de Gilly → Les Sources de Vougeot (21), Hôtel Le Forum → Alfred Hotels Monaco (Beausoleil, 06), Hôtel Jules Verne quittant Best Western (Biarritz, 64), Hôtel Le Cervolan → Hôtel Miura (73), Hôtel Salvator → Best Western Mulhouse Salvator Centre (68), Hôtel du Choiseul → Relais d'Amboise (37), Hôtel Kyriad Bourgoin-Jallieu → Best Western (38), Hôtel Auréna → B&B Hôtel Aurillac-Le Lioran (15), Hôtel Brit Belfort Bessoncourt → Kyriad ECO Belfort Bessoncourt (90), Camping La Perroche Plage → Camping Les Flots-Atlantique (17), Le Manoir du Sphinx → Les Bassans (Perros-Guirec, 22). Aussi retrouvé et corrigé au passage une variante du bug "confiance X" en champ public ("Confiance élevée", non couverte par le grep du chantier de nettoyage de novembre) sur quelques fiches.

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — signaux de fermeture ou contradictions fortes signalés dans le `bodyHtml` :
- **Hôtel Beau Rivage / restaurant La Rosita** (Nogent-sur-Seine, 10) : société exploitante en liquidation judiciaire depuis le 28/10/2025, site officiel pourtant toujours en ligne.
- **Le Relais de Montignac** (24) : le site officiel lui-même annonce ne pas réouvrir cette saison.
- **Hôtel-Restaurant du Causse** (Saint-Cirq-Lapopie, 46) : avis client (2024) affirmant une fermeture définitive, aucune présence en ligne active trouvée pour confirmer ou infirmer.
- **Hôtel Terminus** (Laroche-Migennes, 89) : société historique radiée le 03/11/2021, mais l'hôtel reste commercialisé activement (réservations jusqu'en 2027) — probable reprise non confirmée.
- **Camping Le Cosson** (La Ferté-Saint-Aubin, 45) : SIREN radié fin 2023, et l'office de tourisme ne présente plus l'adresse que comme une aire de services camping-car.
- **Adonis Paris Sud** (Chevilly-Larue, 94) : société exploitante en redressement judiciaire, mais site officiel actif avec réservations en ligne.
- **Camping Montaigu Plage** (82) : renommé "Base de Loisirs du Plan d'eau des Chênes" par l'office de tourisme en 2026, conditions à reconfirmer après la publication des nouvelles modalités de gestion.

Si une nouvelle fiche hébergement est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE restaurants (octobre 2026, résolue)

Même méthode que toiletteurs/hébergements/vétérinaires, appliquée aux **~1453 fiches restaurants** sur les 99 départements qui en comptent (aucune fiche à 972 Martinique, 973 Guyane, 976 Mayotte). Traité en 20 lots de ~5 départements, par 2 agents en parallèle par vague, avec build + `check-site.mjs` avant chaque commit et consolidation (push + sync `seo-audit-indexation`) après chaque vague de 2 lots.

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, horaires, sites officiels ajoutés, statuts d'accueil chien recoupés via offices de tourisme officiels) ou confirmées inchangées. Renommages d'enseigne appliqués uniquement avec preuve datée, ancien nom conservé en "(ex-...)" — notamment Café de la Fontaine → Grand Café la Fontaine (Maussane-les-Alpilles, 13), Les 3 Causses → Umami (Millau, 12), Roch Et Co → Le Roy Théodore (Sartène, 2A), Cigale et Fourmi → Café de la Tour (Lectoure, 32), Hasle Lecoq → Moma (Vitré, 35), Les Chiens du Guet → La Cantine du Guet (Saint-Malo, 35), Le Mange Grenouille → Le Relais des Braconniers (Saint-Aignan, 41), Le Coq en Paille → Le Coq en Pou(l)pe (Roanne, 42), B-W Au Petit Chez Soi → Black-White (Thionville, 57), Brasserie de la Paix → Bouillon de la Paix (Lille, 59), La Parisienne → La Brasserie Parisienne (Compiègne, 60), La Table d'HautPoul → La Taverne d'Hautpoul (Mazamet, 81), La Mangoune (n'avait en réalité jamais existé à cette adresse) → Au Paysan Gourmand (Limoges, 87), Les Jacobins → Le Clos des Jacobins (Sens, 89), Le Chalet Des Pins → Le Chalet, désormais casher (Le Raincy, 93).

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — signaux de fermeture les plus crédibles (presse datée, liquidation/radiation SIRENE) :
- **Mon Bar** (Arles, 13) : article de presse daté (05/08/2026) évoquant une fermeture et une liquidation judiciaire du gérant, non totalement confirmé (encore listé actif sur des annuaires tiers).
- **Le Grand Bleu** (Beaune, 21) : article de presse daté (21/12/2025) confirmant une fermeture fin 2025 et une reconversion en bar à vin "L'Épinette", société radiée sur Pappers.
- **L'Esprit du Sud-Ouest** (Blagnac, 31) : fermeture définitive annoncée par le gérant (actu.fr, 31/08/2026) après 17 ans d'activité.
- **Le Petit Jardin** (Grenoble, 38) : société en liquidation judiciaire (societe.com), adresse désormais exploitée sous le nom "Le Pompon".
- **Le Django** (Parentis-en-Born, 40) : société radiée le 02/12/2024 après liquidation judiciaire (Societe.com/Bodacc).
- **Courtepaille Beauvais** (60) et **Courtepaille Dreux** (28) : fermetures définitives datées (articles de presse 2023) lors de la vague de fermetures nationales du réseau Courtepaille — à vérifier au cas par cas, certaines adresses Courtepaille restent actives.
- **Crêperie Le Râtelier** (Coutances, 50) : remplacée depuis le 16/10/2026 par le restaurant "La Source" à la même adresse (La Manche Libre, 19/10/2026).
- **La Boucherie** (Douai, 59) : l'office de tourisme officiel du Douaisis référence désormais "Le Bouillon Douaisien" à cette adresse.
- **Le Chanois** (Scey-sur-Saône, 70) : fermeture confirmée par la presse locale (01/10/2025), établissement en vente sans repreneur.
- **La Bonne Maison** (Albi, 81) : SIREN radiée le 27/07/2023, adresse occupée depuis 2022 par un autre établissement ("Opulence Albi").
- **Brasserie K** (Mulhouse, 68) : fermeture pour rénovation confirmée par Visit Alsace, sans date de réouverture annoncée.
- **Chez Lucien** (Lyon, Croix-Rousse, 69) : le site officiel lui-même annonce un déménagement vers "Le P'tit Lucien" (même chef, même mascotte canine), après "8 ans et demi à la Croix-Rousse" selon un post Facebook de l'établissement.
- **L'Escale** (L'Île-Rousse, 2B) : contrairement à l'ancienne fiche, le portail officiel du tourisme de Balagne confirme explicitement et à plusieurs reprises que les chiens n'y sont pas acceptés — question de cohérence éditoriale (garder/retirer la fiche d'un guide "voyager avec son chien") plutôt qu'une fermeture.

D'autres contradictions plus mineures (statut d'ouverture ou accueil chien non tranchable entre deux sources officielles) ont été laissées visibles dans le `bodyHtml` fiche par fiche plutôt que consolidées ici — à retrouver au besoin par une recherche ciblée sur les fiches concernées.

Si une nouvelle fiche restaurant est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE éducation canine (octobre 2026, résolue)

Même méthode que les autres catégories, appliquée aux **167 fiches « Éducation canine »** (catégorie créée le 23/10, branchée sur le site le 25/10/2026) : 5 lots en parallèle (brief `brief-verif.md`, section « éducation canine »), terminés le 27/10/2026 après une interruption (limite d'utilisation), build + `check-site.mjs` OK. Bilan : ~117 fiches corrigées (tarifs, adresses, téléphones, horaires, disciplines, faux « non trouvé » remplacés, titres « garde de chien » erronés corrigés), ~40 sans source officielle (seules les mentions de travail retirées), aucune fermeture confirmée.

**Cas à trancher humainement (fiches non supprimées)** :
- **Club de Dressage du Nord-Est Parisien** (`activite-club-dressage-nord-est-parisien-aulnay-93`) : a déménagé à Garges-lès-Gonesse (95) selon cddnep.net ; fiche laissée intacte (garde encore une ligne « Confiance » et « à vérifier »).
- **Cohérence Canine** (fiche en 71) : le site officiel la situe à Saint-André-de-Bâgé (01).
- **L'Essentiel Canin** (Torcy-et-Pouligny) : plus de séances en présentiel (visio/téléphone/formation seulement). **Sacrée Patte** (Égletons) : « ne prend plus de séance ».
- **CaniConfort Les Nouillers** : doublon de `activite-caniconfort-saint-jean-dangely` (même SIRET).
- **Canispirit Orthez** : téléphone/adresse de la fiche = ceux d'Animalsup (Gaas, 40) ; aucune trace d'« À l'Éducation Canine d'Orthez ». **Sym Dog Lozère** : identité douteuse.
- **Peace and Dog** : site figé depuis 2018, deux adresses. **Crocs Dynamiques** (973) et **Les Cabots d'Oléron** : pas d'activité en ligne récente (pas une preuve de fermeture).
- **Catégorie mixte** : Domaine Canin (971, surtout formation pro/fourrière), Techni Croc (animalerie), Couralet (pension/élevage), La Grande Vallée Blanche (élevage).
- **Coordonnées lat/lng à recaler** (champs protégés, non touchés) : Otso Harana (Massignac → Roullet-Saint-Estèphe), Dog's Learning (Caen → Bellengreville), CECAM (Achères → Andrésy), Janzé, Figeacanisport.

## En pause — campagne SIRENE lacs (28/10/2026)

Vérification des 262 fiches « Lacs » lancée le 27/10 (6 lots, consignes : section « lacs et plans d'eau » du brief de vérification), **mise en pause sur demande de l'utilisateur le 28/10** après plusieurs coupures par limite d'utilisation. Travail partiel (~216 fiches modifiées, non validé, pas de build) sauvegardé sur la branche **`wip-lacs-sirene`** (commit `[skip netlify]`, jamais déployée). Le site publié n'a pas changé. **Ne reprendre que lorsque l'utilisateur le demande** : alors fusionner la branche, terminer les fiches manquantes, build + `check-site.mjs`, bilan (interdictions chiens confirmées à trancher) avant publication.

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
- **Priorité d'affichage (promise sur la page publique)** : les fiches `partenaire: true` passent en tête des pages département, des pages catégorie, des pages ville, et sont toujours proposées dans « À proximité » des fiches du même département et de la même catégorie (`partnersFirst` et filtre `related` dans `eleventy.config.js`). Exception volontaire : sur les pages vétérinaires, les gardes 24h/24 vérifiées restent avant les partenaires.
- **Design du badge (23/10/2026)** : pastille vert profond à liseré doré + médaille (`.partner-badge`, en haut à droite des vignettes, séparée des badges d'accès « Toute l'année »/« Saisonnier » en haut à gauche qu'elle ne masque plus) ; contour doré de la vignette ; même style pour `.fiche-partenaire-tag` dans l'en-tête de fiche.
- **Un seul badge : « Partenaire », payant.** Décision de l'utilisateur (23/10/2026) : pas de badge gratuit « Référencé sur Coco Explore » à afficher par les professionnels (créé puis retiré le même jour, URL redirigée vers `/devenir-partenaire`). Ne rien proposer qui puisse se confondre avec le badge payant ; un échange de lien se fait sans badge.
- **Tarif cible convenu avec l'utilisateur** : 19 à 29 €/mois, sans engagement, 1er mois offert. Pas de facturation à la performance (pas de données de trafic pour le justifier pour l'instant).
- **Cohérence éditoriale** : la page "À propos" (`src/a-propos.njk`) a été mise à jour pour rester honnête vis-à-vis de ce programme (le classement/contenu reste neutre, seule la mise en avant visuelle est payante).

### Premier partenaire potentiel : Les Petits Loots (Angers, 28/10/2026)

Nicolas Barbeau et Lidia (pet-sitters, balades en forêt, taxi animalier, Loire-Authion/Angers, lespetitsloots@gmail.com) ont contacté Coco Explore d'eux-mêmes le 27/10/2026 pour devenir partenaires. Offre envoyée par l'utilisateur le 28/10 : démarrage direct en Partenaire, **1er mois offert puis 19 €/mois sans engagement** (fiche gratuite conservée sans badge s'ils arrêtent), lien « Retrouvez-nous sur Coco Explore » proposé (pas imposé). **Une seule fiche** (décision de l'utilisateur, pas de catégorie taxi animalier) : prête dans `propositions/les-petits-loots/` avec `partenaire: true`, non publiée. **En attente de leur réponse** ; relance avec l'aperçu PDF prévue vers le 02/11 sans nouvelles. À l'accord : copier la fiche dans `src/fiches/`, noter la date de début (fin du mois offert), facturation seulement une fois la micro-entreprise de l'utilisateur immatriculée (SIRET).

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

### Affiliation hébergements (23/10/2026)

Étude complète dans `AFFILIATION-HEBERGEMENT.md` (non publié). **Décision de l'utilisateur : candidater d'abord au programme Expedia Group** (affiliates.expediagroup.com, géré via Partnerize : 4 % hôtels, 2 % Abritel/Vrbo, cookie 7 jours même appareil, seuil de paiement 30 €). Candidature faite par l'utilisateur lui-même. Booking (via CJ) seulement après avoir clarifié la clause qui interdit de démarcher les hébergeurs présents sur Booking (conflit possible avec le Programme partenaire). **Aucun lien affilié sur le site tant que l'utilisateur n'a pas validé** : intégration prévue = bouton « Voir les disponibilités sur … » sous les infos pratiques, après le site officiel, mention « Lien sponsorisé » + `rel="sponsored"`, uniquement vers la page exacte d'un établissement qui accepte aussi les chiens sur la plateforme, test sur 20 à 50 fiches, phrase à ajouter dans « À propos ».

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

## Demandes de retrait (ne jamais recréer ces fiches)

Quand un professionnel demande à ne plus être référencé : supprimer sa ou ses fiches, ajouter une redirection 301 vers la page catégorie×département (ou la page département) dans `src/_redirects.njk`, et l'inscrire ici pour qu'aucun round de recherche ne le recrée.

| Établissement | Ville | Date | Fiches supprimées |
|---|---|---|---|
| Bande de Truffes (dog wash, pet-sitting, concept store) | Chambéry (73) | 23/10/2026 | `dogwash-bande-de-truffes-chambery`, `dogsitter-bande-de-truffes-chambery` |

**Bande de Truffes — remise en ligne proposée (24/10/2026)** : Sophie Carpentier, la gérante, a répondu en demandant qu'on corrige les tarifs et qu'on présente ses trois activités. 3 fiches ont été rédigées d'après bandedetruffes.fr (pet-sitting, dog wash + concept store, toilettage + balnéo), prêtes dans `propositions/bande-de-truffes/` (hors site publié). Un mail lui a été envoyé avec l'aperçu en PDF ; on y explique que la mention « confiance » était une note interne retirée partout, on propose d'afficher sa note Google avec un lien, et on lui demande un lien vers Coco Explore sur son site (demande, pas une condition). **En attente de sa réponse.** Si elle valide : copier les 3 fichiers dans `src/fiches/`, retirer les 4 redirections `bande-de-truffes` de `src/_redirects.njk`, retirer sa ligne de ce tableau ; si elle met le lien, ajouter la ligne `fiche-collab` et l'inscrire dans `ECHANGES-LIENS.md`. Si elle refuse : ne rien publier, supprimer le dossier de proposition.

## Conventions du projet (voir aussi contexte de session)

- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- **Crédits Netlify : regrouper les mises en ligne.** Chaque `git push` sur `claude/github-connexion-otichf` déclenche un déploiement de production, qui consomme des crédits Netlify (le compte a été à court le 23/10/2026, et les déploiements se sont arrêtés). Donc : committer en local autant que nécessaire, mais **ne pousser qu'environ une fois par heure, ou à la fin d'un chantier** — jamais après chaque petit lot. Pour un commit qui ne change pas le site publié (fichiers `.md` à la racine : `CLAUDE.md`, `SEO-PRIORITES.md`, `ECHANGES-LIENS.md`…), ajouter **`[skip netlify]`** dans le message de commit : Netlify ne lance alors aucun déploiement. Attention, un push contenant à la fois un commit `[skip netlify]` et d'autres commits est déployé normalement (c'est le dernier commit poussé qui compte).
- Build de vérification avant tout commit : `npx @11ty/eleventy && node scripts/check-site.mjs` (les deux doivent passer). Sur Netlify, `npm run build` (`scripts/build.mjs`) enchaîne les deux : **si l'un échoue, le déploiement échoue, la version précédente reste en ligne, et l'utilisateur reçoit une notification ntfy « Mise en ligne bloquee » avec le détail de l'erreur** (variable `NTFY_TOPIC`, scope builds + functions, build de production uniquement). Il bloque : plus de 20 pages en noindex, sitemap qui perd des fiches, « confiance X » dans `title`/`description`/`cardTeaser`, photo Unsplash (`heroImage`) partagée par deux fiches françaises, gabarit `{…}` non remplacé sur les pages catégorie. Ne jamais contourner ce contrôle : corriger la cause.
