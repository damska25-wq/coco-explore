# SEO — pages prioritaires (d'après Search Console)

Fichier de travail non publié (racine du dépôt, hors `src/`). Généré le 22/10/2026 à partir de l'export Search Console « Performances » des 3 derniers mois (17/09 → 21/10/2026, recherche Web). À regénérer à partir d'un nouvel export quand les chiffres auront bougé (dans ~1 mois).

## Règles à respecter

- **Ne jamais remettre de `noindex` ni filtrer le sitemap par région.** Le commit `21b28c2` (noindex sur les 9221 pages hors PACA) a été annulé par `b05606f` : les fiches hors PACA font **88 % des clics** (470 contre 62 pour PACA).
- **Deux sessions poussent sur `claude/github-connexion-otichf`** (la branche de production Netlify) : `git fetch` + `git rebase` avant chaque push.
- Pages catégorie (`src/categorie.njk`, `src/categorie-departement.njk`, configuration dans `src/_data/categoryPages.js`) : dogwash, toiletteurs, garde/pension, balades. Une page département est générée automatiquement dès qu'un département atteint 3 fiches de la catégorie (`minFiches`) — la catégorie d'une fiche (`breadcrumbCatId`) décide donc des pages sur lesquelles elle apparaît.
- Titres de fiches : ne plus y mettre de mention de travail (« confiance X », « à vérifier »…) — le `title` est le lien bleu affiché par Google.

## Vue d'ensemble

654 clics, 74 000 impressions, CTR 0,9 %, position moyenne 18,5. 80 % des clics viennent du mobile (position moyenne 10,7 sur mobile contre 28 sur ordinateur).

| Catégorie | Clics | Impressions | CTR |
|---|---|---|---|
| balades | 108 | 2857 | 3,8% |
| dogwash | 72 | 2133 | 3,4% |
| activites | 59 | 1812 | 3,3% |
| lacs | 53 | 2503 | 2,1% |
| dogsitters | 52 | 1340 | 3,9% |
| restaurants | 51 | 5280 | 1,0% |
| toiletteurs | 49 | 1592 | 3,1% |
| page département | 44 | 1783 | 2,5% |
| veterinaires | 33 | 9287 | 0,4% |
| hebergements | 30 | 7331 | 0,4% |
| plages | 20 | 1547 | 1,3% |
| cote-azur | 4 | 744 | 0,5% |

Lecture : balades, dogsitters, dogwash et toiletteurs convertissent bien (> 3 %). Vétérinaires et hébergements ont beaucoup d'impressions mais ~0,4 % de CTR : requêtes de navigation vers l'établissement lui-même (« clinique vétérinaire de la marne », « camping les oyats »), l'internaute clique le site officiel ou Google Maps.

## A. Lever les doutes visibles dans le titre ou la description (par impressions)

> ✅ **Fait** (lots 1 à 4, commits « SEO-PRIORITES §A », 22/10/2026). Liste conservée pour mémoire.

Fiches dont le `title` ou la `description` (donc le résultat Google) affiche un doute. Les trancher avec des sources (Parallel Search) quand c'est possible ; sinon garder le doute dans le `bodyHtml` mais reformuler titre/description de façon neutre. Classées par impressions : traiter le haut de la liste d'abord.

| Fichier | Impr. | Clics | Pos. | Titre / extrait de description |
|---|---|---|---|---|
| `veterinaire-1001-pattes-la-couronne.njk` | 253 | 1 | 11.3 | Clinique Vétérinaire 1001 Pattes, La Couronne — existence à vérifier… |
| `veterinaire-lalande-montauban.njk` | 196 | 1 | 15.5 | …12h/14h-19h, samedi matin à confirmer (8h30 ou 9h selon la source).… |
| `relais-bernard-loiseau-saulieu.njk` | 185 | 1 | 25.6 | …2 rue d'Argentine à Saulieu (Côte-d'Or) : sources contradictoires sur l'accueil des chiens à l'hôtel… |
| `restaurant-otardif-dax.njk` | 146 | 2 | 10.9 | …ne Sud-Ouest et tapas, chien accepté mais accueil possiblement conditionnel — à confirmer sur place.… |
| `hostellerie-levernois-beaune.njk` | 126 | 0 | 21.7 | … du Golf à Levernois près de Beaune (Côte-d'Or) : selon une source agrégée non vérifiée, tous les animaux … |
| `veterinaire-saint-jacques-agen.njk` | 120 | 0 | 25.4 | … 8h-12h/14h-18h, astreinte le soir (nature exacte à vérifier).… |
| `plages-royan.njk` | 115 | 0 | 16.8 | …en : interdites en saison, dates de fin variables selon les sources… |
| `veterinaire-vetalbret-nerac.njk` | 85 | 0 | 10.5 | Clinique Vetalbret à Nérac : adresse divergente selon les sources, revendique une urg… |
| `veterinaire-urgence-67-strasbourg-67.njk` | 83 | 0 | 20.6 | … 25. Second pôle d'un système de garde partagée — à vérifier par téléphone.… |
| `restaurant-cassoulet-gourmand-castelnaudary.njk` | 75 | 0 | 10.0 | …anal du Midi à Castelnaudary : accueil des chiens non confirmé pour cet établissement précis, à vérif… |
| `etang-aureilhan.njk` | 71 | 0 | 22.1 | … chien : règle générale de Mimizan, une exception à vérifier… |
| `veterinaire-arsonval-saint-yrieix.njk` | 70 | 0 | 9.8 | …e, horaires et téléphone. Garde 24/7 revendiquée, non confirmée.… |
| `camping-le-fayolan-clairvaux-les-lacs.njk` | 68 | 0 | 44.2 | …à 30 kg, catégories 1 et 2 interdites, supplément contesté entre les sources.… |
| `balade-parc-moulin-tan-sens-89.njk` | 67 | 1 | 24.1 | Parc du Moulin à Tan, Sens : chiens acceptés selon une source secondaire… |
| `restaurant-petit-poucet-saint-palais-sur-mer.njk` | 66 | 0 | 19.2 | …ès de Royan (Charente-Maritime) : chiens acceptés selon une source spécialisée, commune exacte débattue en… |
| `veterinaire-chv-cordeliers-meaux-77.njk` | 65 | 1 | 15.0 | …offre à Meaux (77). Urgences 24h/24 évoquées mais non confirmées — à vérifier.… |
| `activite-defiplanet-domaine-de-dienne.njk` | 64 | 0 | 29.4 | …en des activités (accrobranche, parcours ludique) non confirmé.… |
| `restaurant-comme-vous-voulez-dunkerque-59.njk` | 61 | 0 | 11.1 | …acceptés selon l'office de tourisme. Prix du menu contradictoire selon les sources.… |
| `hotel-splendid-dax.njk` | 57 | 0 | 51.0 | …ies 1/2 exclues), supplément 14 à 18€/animal/nuit selon la source.… |
| `restaurant-lestanco-le-cheylard.njk` | 55 | 0 | 9.1 | L'Estanco, Le Cheylard : chien accepté selon une source… |
| `plage-hume-gujan-mestras.njk` | 53 | 1 | 22.3 | …é droit hors zone de baignade surveillée, sources contradictoires à confirmer sur place.… |
| `veterinaire-urgvet-rochecorbon-37.njk` | 51 | 0 | 8.2 | …Rochecorbon (37210). Tél 02 46 99 08 00. Horaires contradictoires selon les sources — vérifier par t… |
| `bb-hotel-rennes-parc-expo-aeroport-bruz-35.njk` | 50 | 0 | 20.4 | …ion de Rennes, 35), tél. 08 92 23 40 66 : gratuit selon une source, 6€/animal/nuit sur demande selon une a… |
| `dogwash-jardiland-pau.njk` | 49 | 0 | 6.4 | Jardiland Pau — pour chien, Dogwash (à vérifier)… |
| `dogwash-zoomalia-guipavas-29.njk` | 45 | 0 | 11.6 | …e précise et le téléphone n'ont pas été trouvés — à vérifier avant de s'y rendre.… |
| `lac-courtille-gueret.njk` | 44 | 1 | 11.9 | …e autour du lac. Étang en cours de remise en eau, à vérifier avant de venir.… |
| `dogwash-maxi-zoo-anglet.njk` | 43 | 2 | 11.2 | Maxi Zoo Anglet — pour chien, Dogwash (présence non confirmée)… |
| `houat-hoedic-traversee-plages-56.njk` | 43 | 0 | 33.9 | Houat et Hoëdic avec chien : traversée (départ contesté) et statut des plages… |
| `camping-antipolis-antibes.njk` | 42 | 0 | 10.1 | Camping Antipolis, Antibes : à vérifier avant d'y aller… |
| `restaurant-the-people-lyon.njk` | 40 | 2 | 7.8 | …un brunch pour chien (04/2026), accueil quotidien non confirmé.… |
| `balade-foret-russy-41.njk` | 39 | 0 | 7.2 | …Russy avec chien : laisse et calendrier de chasse à vérifier (41)… |
| `veterinaire-saint-paul-paris-4.njk` | 38 | 0 | 10.2 | …rs vétérinaires sur place, NAC acceptés. Horaires non confirmés officiellement, téléphone non trouvé.… |
| `restaurant-lessentiel-laval-53.njk` | 37 | 0 | 9.0 | …'office de tourisme (mention générique), horaires contradictoires selon les sources.… |
| `veterinaire-vanteaux-limoges.njk` | 37 | 0 | 29.9 | …e. Disponibilité 24/7 revendiquée par le cabinet, non confirmée de façon indépendante.… |
| `lac-etang-noir-seignosse.njk` | 37 | 0 | 34.0 | …Étang Noir (Seignosse/Tosse) avec chien : sources contradictoires, à vérifier… |
| `dogwash-zoomalia-mimizan.njk` | 36 | 1 | 8.9 | … des Ormes : présence d'un Dog Wash probable mais non confirmée spécifiquement pour ce magasin — à vé… |
| `activite-puy-mary.njk` | 36 | 0 | 10.8 | …te des volcans du Cantal, restriction saisonnière à vérifier… |
| `dogwash-lavaur.njk` | 35 | 1 | 10.7 | …endarmerie. Nature exacte du service incertaine — à vérifier sur place.… |
| `veterinaire-anicura-nordvet-la-madeleine-59.njk` | 35 | 0 | 10.1 | …des avis tiers évoquent une disponibilité 24h/24, non confirmée sur une source officielle actuelle.… |
| `veterinaire-atlantic-vet-niort.njk` | 35 | 0 | 16.2 | … sur son propre site un service d'urgence vitale, à vérifier directement par téléphone.… |

(90 fiches concernées dans l'export ; les autres fiches avec doute n'ont pas encore d'impressions — les traiter après.)

## B. Enrichir les fiches bloquées en bas de page 1

Position ≤ 12, au moins 80 impressions, CTR < 2 %. Google hésite : enrichir le contenu utile au chien (accès, parking, ombre, eau, horaires, règles précises, sources vérifiées) pour gagner quelques places. **Ne pas toucher aux titres** (ils sont corrects, le frein est la position).

| Fichier | Impr. | Clics | Pos. |
|---|---|---|---|
| `veterinaire-marne-le-passage-d-agen.njk` | 602 | 0 | 9.7 |
| `balade-parc-glacis-besancon-25.njk` | 468 | 0 | 9.8 |
| `base-de-loisirs-de-brioudes-muret.njk` | 295 | 3 | 6.4 |
| `veterinaire-1001-pattes-la-couronne.njk` | 253 | 1 | 11.3 |
| `restaurant-grand-pin-port-grimaud.njk` | 208 | 0 | 10.3 |
| `restaurant-otardif-dax.njk` | 146 | 2 | 10.9 |
| `restaurant-bistrot-des-nuances-villeneuve-loubet.njk` | 143 | 0 | 9.2 |
| `dogsitter-spa-cher-bourges-18.njk` | 137 | 0 | 10.8 |
| `balade-rhune-sare-ascain.njk` | 126 | 1 | 9.6 |
| `veterinaire-anne-demay-celles-sur-belle.njk` | 126 | 0 | 10.0 |
| `veterinaire-vetpole-melle.njk` | 122 | 1 | 11.1 |
| `veterinaire-foresterie-rouillon-72.njk` | 122 | 0 | 11.5 |
| `veterinaire-zenimo-billere.njk` | 121 | 0 | 7.9 |
| `dogwash-tom-co-chinon-37.njk` | 117 | 1 | 10.6 |
| `restaurant-la-pizzaiolette-vieux-boucau.njk` | 116 | 1 | 8.6 |
| `veterinaire-penin-miramont-de-guyenne.njk` | 116 | 0 | 10.4 |
| `veterinaire-andaine-vet-bagnoles-61.njk` | 116 | 0 | 10.5 |
| `veterinaire-lac-joue-les-tours-37.njk` | 110 | 0 | 7.8 |
| `dogsitter-animalor-maire-levescault.njk` | 108 | 0 | 8.7 |
| `veterinaire-2-toute-urgence-rennes-35.njk` | 108 | 0 | 10.4 |
| `restaurant-la-medina-le-puy-en-velay.njk` | 104 | 0 | 10.9 |
| `restaurant-trattoria-ile-de-re-saint-martin-de-re.njk` | 103 | 0 | 9.8 |
| `restaurant-la-bonne-franquette-cournon-dauvergne.njk` | 102 | 0 | 8.2 |
| `restaurant-les-chiens-fous-soulac-sur-mer.njk` | 97 | 0 | 11.6 |
| `dogwash-teddy-wash-marseille.njk` | 96 | 0 | 9.2 |
| `parc-tete-or-lyon-69.njk` | 89 | 1 | 9.1 |
| `restaurant-mandarin-morteau.njk` | 87 | 1 | 9.3 |
| `toiletteur-elegance-canine-feytiat.njk` | 86 | 1 | 8.9 |
| `restaurant-prohibistro-hossegor.njk` | 86 | 1 | 11.3 |
| `restaurant-hippopotamus-toison-dor-dijon.njk` | 86 | 0 | 8.6 |
| `veterinaire-vetalbret-nerac.njk` | 85 | 0 | 10.5 |
| `restaurant-relais-grepissot-nuits-saint-georges.njk` | 83 | 1 | 9.6 |
| `cote-lac-ploermel-56.njk` | 81 | 0 | 9.8 |
| `veterinaire-lois-joel-ruffec.njk` | 81 | 0 | 10.8 |
| `dogwash-mydogwash-marseille.njk` | 80 | 1 | 8.0 |
| `veterinaire-vetoletta-oletta-2b.njk` | 80 | 0 | 9.4 |

## C. Compléter le dogwash (départements à 0-2 stations)

Le dogwash est l'une des catégories qui convertit le mieux, et des requêtes locales existent (« dog wash le havre », « lavage chien libre service 77 », « dogwash autour de moi »). Chercher : bornes de lavage auto (Wash, Eléphant Bleu…), animaleries (Animalis, Jardiland, Tom&Co, Maxi Zoo…), cabines autonomes, toiletteurs avec self-wash. **Priorité : 76 (Seine-Maritime) et 77 (Seine-et-Marne)**, qui ont déjà des recherches dans Search Console.

- **2 stations** (20) : Corse-du-Sud (2A), Loir-et-Cher (41), Eure (27), Seine-Maritime (76), Yonne (89), Loire (42), Isère (38), Corrèze (19), Haute-Vienne (87), Charente (16), Alpes-de-Haute-Provence (04), Gard (30), Lozère (48), Hautes-Pyrénées (65), Tarn (81), Tarn-et-Garonne (82), Seine-et-Marne (77), Essonne (91), Val-d'Oise (95), Maine-et-Loire (49)
- **1 station** (31) : Haute-Corse (2B), Loiret (45), Cher (18), Manche (50), Côtes-d'Armor (22), Territoire de Belfort (90), Jura (39), Rhône (69), Puy-de-Dôme (63), Haute-Savoie (74), Drôme (26), Ain (01), Creuse (23), Hérault (34), Aude (11), Ariège (09), Gers (32), Hauts-de-Seine (92), Seine-Saint-Denis (93), Aube (10), Marne (51), Moselle (57), Bas-Rhin (67), Haut-Rhin (68), Nord (59), Oise (60), Pas-de-Calais (62), Somme (80), Loire-Atlantique (44), Mayenne (53), Sarthe (72)
- **0 station** (23) : Indre (36), Orne (61), Doubs (25), Saône-et-Loire (71), Nièvre (58), Haute-Saône (70), Cantal (15), Allier (03), Vaucluse (84), Hautes-Alpes (05), Aveyron (12), Lot (46), Val-de-Marne (94), Ardennes (08), Haute-Marne (52), Meuse (55), Vosges (88), Aisne (02), Guadeloupe (971), Martinique (972), Guyane (973), La Réunion (974), Mayotte (976)

## D. Auditer les campings

Beaucoup d'impressions mais positions 20-48 et 0 clic : la fiche n'apporte probablement pas assez face au site officiel du camping. Avant de modifier en masse : comparer 3 fiches aux 3 premiers résultats Google de la même requête, puis proposer un plan (infos chien exclusives : supplément exact, nombre de chiens, catégories, accès plage chien, douche à chien, zones interdites).

| Page | Impr. | Clics | Pos. |
|---|---|---|---|
| `camping-domaine-de-soleil-plage-vitrac.njk` | 413 | 0 | 38.1 |
| `camping-brise-camargue-saintes-maries.njk` | 410 | 0 | 40.0 |
| `camping-airotel-ocean-lacanau.njk` | 383 | 0 | 22.7 |
| `camping-hautes-prairies-lourmarin.njk` | 369 | 0 | 21.5 |
| `camping-les-oyats-seignosse.njk` | 250 | 0 | 39.1 |
| `camping-atlantic-club-montalivet.njk` | 210 | 0 | 35.7 |
| `camping-le-mas-les-eyzies.njk` | 180 | 0 | 31.6 |
| `camping-lou-puntaou-leon.njk` | 133 | 0 | 36.3 |
| `camping-maguide-biscarrosse.njk` | 130 | 0 | 24.9 |
| `camping-kalliste-saint-florent-2b.njk` | 128 | 0 | 31.8 |
| `camping-la-civelle-capbreton.njk` | 103 | 0 | 33.9 |
| `camping-lou-pignada-ondres.njk` | 97 | 0 | 38.9 |
| `camping-jobel-tarnos.njk` | 89 | 0 | 37.7 |
| `camping-paoute.njk` | 87 | 0 | 37.4 |
| `camping-le-pessac-vielmur-sur-agout.njk` | 76 | 0 | 17.5 |
| `camping-siblu-mer-et-soleil-oleron.njk` | 76 | 0 | 26.5 |
| `camping-port-blanc-dinard-35.njk` | 73 | 0 | 34.0 |
| `camping-grande-metairie-carnac-56.njk` | 69 | 0 | 36.5 |
| `camping-le-fayolan-clairvaux-les-lacs.njk` | 68 | 0 | 44.2 |
| `camping-yelloh-serignan-plage.njk` | 58 | 0 | 37.3 |

## E. Contenu à créer (ajouté le 22/10/2026, par ordre de priorité)

Toujours la méthode habituelle : recherche par lot avec Parallel Search (`web_fetch` pour lire les sources en entier) → rédaction → build → commit par lot. Pas de photo Unsplash dupliquée, `order` unique.

### E1. Corriger les fiches rangées dans la mauvaise catégorie ⭐ (à faire en premier)

Le `breadcrumbCatId` d'une fiche décide des pages catégorie sur lesquelles elle apparaît ; plusieurs départements sont mal classés, ce qui prive le site de pages catégorie qui devraient exister :

- **Plages classées en « balades »** : la Vendée (85) a 0 fiche `plages` alors que ses plages existent en `balades` (ex. « Grande Plage, L'Aiguillon-sur-Mer »). Même chose probable sur d'autres départements côtiers (Loire-Atlantique, Nord, Pas-de-Calais, Alpes-Maritimes, Bouches-du-Rhône…).
- **Balades classées en « lacs »** : le Rhône (69) et la Haute-Savoie (74) ont 0 fiche `balades` mais 19 et 33 fiches `lacs`, dont des balades urbaines, parcs et aires canines (ex. « Berges du Rhône à Lyon », « Aires canines de Villeurbanne »). Conséquence : pas de page `/balade-chien-rhone` ni `/balade-chien-haute-savoie`.

Méthode : auditer `breadcrumbCatId` sur tout le site (commencer par 85, 69, 74), **présenter d'abord la liste des changements à l'utilisateur, sans rien modifier**, puis appliquer après accord. Ne changer que `breadcrumbCatId` et `breadcrumbCatLabel` (et `tag`/`cardPictos` si incohérents) — **jamais les URL** (`permalinkPath`), qui sont indexées.

Une fois ce tri fait : demander à l'utilisateur s'il veut une page catégorie « Plages où les chiens sont acceptés » (ajout de `plages` dans `src/_data/categoryPages.js`).

### E2. Compléter le dogwash

Voir section C. Ordre : Seine-Maritime (76) et Seine-et-Marne (77) d'abord (requêtes Search Console existantes), puis Paris et petite couronne (92, 93, 94), Rhône (69), Nord (59). Pour chaque station : adresse, horaires, tarif et mode de paiement quand ils existent.

### E3. Balades dans les départements qui en manquent

Moins de 3 fiches `balades` (après E1, recompter : certains départements seront peut-être déjà au-dessus) : Puy-de-Dôme (0), Haute-Loire (0), Loire (0), Drôme (0), Territoire de Belfort (0), Hérault (1), Gard (2), Finistère (2), Corse-du-Sud (2). Mêmes critères que l'enrichissement d'octobre : réglementation (laisse, arrêtés saisonniers, espaces protégés), ombre, points d'eau, type de sol, difficulté, troupeaux/patous en montagne.

### E4. Contenu de saison : hiver avec son chien (à lancer maintenant)

Les recherches d'hiver montent dès novembre et culminent en décembre-janvier ; Google met plusieurs semaines à indexer, donc à publier courant novembre. Fiches sur les stations de ski et sites de raquettes/ski de fond acceptant les chiens (Alpes, Pyrénées, Vosges, Jura, Massif central) : règles chien sur les pistes de fond/raquettes, sentiers piétons damés, hébergements de station acceptant les chiens. Tout vérifié par sources ; si une règle n'est pas trouvée, le dire dans la fiche.

### E5. Garde de chien dans les départements qui en manquent

Moins de 3 fiches `dogsitters` : Alpes-de-Haute-Provence (2), Vosges (2), Guadeloupe (2), Martinique (1), Guyane (2), Mayotte (2). Pensions, dogsitters, garderies : conditions d'accueil, vaccins exigés, tarifs.

## Ce qui n'est pas prioritaire

- Traduction anglaise : 4 clics en 3 mois.
- Réécriture massive des titres/descriptions : le frein principal est la position, pas le snippet.
- « Détectée, actuellement non indexée » (~3000 pages) et « Autre page avec balise canonique correcte » (826, anciennes URL `.html` redirigées) : normal pour un site d'un mois, ça se résorbe seul.
- Page « À propos » en tête des clics (37) : trafic de marque (position 2,4, CTR 54 %), requêtes masquées par Google. Rien à corriger.
