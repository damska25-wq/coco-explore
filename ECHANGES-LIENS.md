# Suivi des échanges de liens

Fichier de suivi interne (non publié sur le site). Il liste les fiches créées dans le cadre d'un échange de liens : la fiche Coco Explore offerte à la personne, contre un lien vers cocoexplore.com de sa part. Aucun badge public : ce n'est pas un partenariat payant, et aucune mention « échange de liens » n'est affichée au public. Seule une ligne discrète « Fiche réalisée en collaboration avec … » figure en bas de la fiche.

Statuts du lien reçu : `à demander` · `promis` · `reçu` · `à vérifier` (lien disparu ou modifié).

| Personne | Activité / lieu | Fiche Coco Explore | Fiche créée le | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|---|
| Charlotte | Garde d'animaux à domicile, Sainte-Maxime | /dogsitter-charlotte-sainte-maxime | 15/10/2026 | Partage du lien de la fiche sur sa page Facebook | promis | Prénom seul affiché (pas de nom de famille, à la demande de l'utilisateur). Tél. publié avec son accord. À vérifier : lien vers cocoexplore.com aussi dans la description de sa page ou sur son site, s'il y en a un. |
| Bruno Ernould | Chambres d'hôtes La Vie de Château, Grignan (26) | /fiche-la-vie-de-chateau-grignan | fiche existante, corrigée le 03/11/2026 | Lien vers cocoexplore.com sur laviedechateau-grignan.com | non tenu (lien absent du site au 06/11/2026, pas de réponse) | Fiche corrigée à sa demande (animaux au cas par cas, 10 €/nuit). Échange accepté par mail le 03/11 ; ligne `fiche-collab` ajoutée le même jour, retirée le 06/11/2026 (échange non tenu, décision de l'utilisateur ; fiche gardée). siteWeb passé de laviedechateau26.fr à laviedechateau-grignan.com (adresse donnée par le propriétaire). À vérifier : présence du lien sur son site. |

## Articles invités

| Partenaire | Articles prévus | Accord du | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|
| Bimo (bimo.dog, alimentation chien) | 1. « Partir en vacances avec son chien : gérer ses repas sur la route » ; 2. « Randonnée : préparer des collations maison pour son chien » | 25/10/2026 | Lien vers cocoexplore.com sur le blog Bimo | reçu (page Partenaires bimo.dog, 29/10/2026) | Conditions acceptées par Bimo : 800 à 1 200 mots, relus et ajustés librement par nous avant publication ; conseils santé appuyés sur des sources sérieuses (vétérinaires, organismes officiels) ; liste des aliments interdits aux chiens dans le 2e article ; mention « Article proposé par Bimo » + lien vers bimo.dog signalé comme partenariat (`rel="sponsored"` ; Bimo a demandé le 29/10/2026 un passage en dofollow, refusé pour éviter le risque d'échange de liens aux yeux de Google). Publication dans la rubrique `/guides`. Premier article attendu « dans les prochains jours ». À la réception : vérifier chaque conseil santé et chaque source, retirer tout discours commercial appuyé sur leurs produits. |

Articles Bimo publiés le 27/10/2026 : `/guide-repas-route-chien` et `/guide-collations-randonnee-chien` (sources revérifiées une à une, corrections listées dans les commits). Page « Partenaires » de bimo.dog en ligne avec Coco Explore (description, image, lien dofollow vers cocoexplore.com), confirmé par Bimo le 29/10/2026 : statut `reçu`.

**29/10/2026** : Bimo accepte que les liens restent en `rel="sponsored"` (« c'est la règle de Google pour les articles invités, on la respecte complètement »). Ils prennent les 3 sujets proposés, mêmes conditions (sources vérifiées, mention « Article proposé par Bimo », relecture libre de notre côté) : 1. alimentation du chien en camping ou en location (conservation, chaleur) — attendu « d'ici quelques jours » ; 2. adapter les rations d'un chien sportif (canicross, longues randonnées) ; 3. aliments du terroir à éviter en voyage (fromages, charcuterie, raisin…). À la réception : même relecture que pour les deux premiers (chaque conseil santé vérifié sur source vétérinaire/officielle, pas de discours commercial appuyé, liens bimo.dog en `rel="sponsored noopener"`).

**30/10/2026** : 3e article Bimo publié (sujet 1, camping/location) : `/guide-camping-location-repas-chien` (`src/guides/camping-location-repas-chien.njk`, image `src/assets/guides/chien-camping-repas-maison-glaciere(-og).jpg`). Chaque affirmation relue sur sa source (USDA FSIS camping, ANSES chaîne du froid, FDA pet food, OSAV canicule, CAPAE-Ouest, Ordre des vétérinaires). Corrections : phrase commerciale « C'est justement pour ça qu'on a créé Bimo » remplacée par la formule neutre « Des outils comme Bimo peuvent aider » ; ANSES −18 °C : « ne les détruit pas » → « la plupart des micro-organismes survivent » ; pains de glace plus durables que les glaçons (l'USDA ne compare pas les blocs gel) ; conseil ANSES pare-soleil replacé dans son contexte (courses en voiture) ; FDA : la consigne vise les aliments humides du commerce (boîte/sachet), étendue au fait maison par prudence et dit comme tel ; signes du coup de chaleur alignés sur l'OSAV ; os et restes gras du barbecue sourcés (FDA, page fêtes), oignon/ail et chocolat (CAPAE-Ouest) ; horaires du CNITV ajoutés ; section technique « Fiche image SEO » retirée ; liens internes ajoutés (hébergements, vétérinaires, guides repas sur la route et urgence vétérinaire).

## Affichage sur la fiche

Uniquement `<p class="fiche-collab">Fiche réalisée en collaboration avec …</p>` à la fin du `bodyHtml` : petite ligne grise précédée d'une icône de lien et d'un trait de séparation (style dans `src/style.css`). Rien sur les vignettes ni dans l'en-tête : ne jamais utiliser de badge, de couleur ou de pastille, pour ne pas se confondre avec le badge Partenaire payant. Le nom peut être un lien vers le site ou la page de la personne (`<a href="…" rel="noopener">`), si c'est la contrepartie convenue.

## Comment l'utiliser

- Nouvelle collaboration : ajouter une ligne dans le tableau (date de création de la fiche, lien promis).
- Quand le lien est reçu : mettre le statut à `reçu`, noter la date et l'adresse où il se trouve.
- Revérifier de temps en temps que les liens reçus sont toujours en ligne.

**31/10/2026** : 3e article de la nouvelle série Bimo publié (sujet 3, aliments du terroir ; fichier Bimo n° 5) : `/guide-aliments-terroir-chien` (`src/guides/aliments-terroir-chien.njk`, image `src/assets/guides/chien-vacances-france-aliments-a-eviter(-og).jpg`). Chaque affirmation relue sur sa source (ASPCA aliments à éviter, AAHA pancréatite, CAPAE-Ouest raisin, Ordre des vétérinaires). Corrections : phrase commerciale « C'est exactement ce que permet Bimo » remplacée par « Des outils comme Bimo peuvent aider » ; os : « les os cuits peuvent se briser » retiré (l'ASPCA parle des os en général : blessure ou obstruction) ; sel : signes alignés sur l'ASPCA (soif et urines accrues, vomissements, diarrhée, tremblements ou convulsions selon la quantité) ; oignon/ail : « même en petite quantité » remplacé par « le risque dépend de la quantité » (ASPCA) ; raisin : insuffisance rénale aiguë ajoutée (CAPAE-Ouest) ; pâte à pain : risque de dilatation-torsion ajouté (ASPCA) ; diarrhée ajoutée aux signes de pancréatite (AAHA) ; section « Fiche image SEO » retirée ; liens internes ajoutés (vétérinaires, hébergements, guides urgence vétérinaire et repas sur la route). Reste 1 article attendu : rations du chien sportif (sujet 2, probablement n° 4 chez Bimo).

**31/10/2026** : dernier article de la nouvelle série Bimo publié (sujet 2, chien sportif) : `/guide-chien-sportif-rations` (`src/guides/chien-sportif-rations.njk`, image `src/assets/guides/chien-sportif-canicross-ration(-og).jpg`, reçue seule ; texte collé par l'utilisateur, le .docx n'ayant pas pu être téléchargé). Chaque affirmation relue sur sa source (AAHA facteurs énergétiques, grille WSAVA, WSU dilatation-torsion, consensus UK BWG 2021). Corrections : « C'est pour ça qu'on a créé Bimo » → « Des outils comme Bimo peuvent aider » ; effort intense « jusqu'à 11 » → « de 5,0 à 11 » (AAHA) ; phrase attribuée à l'AAHA sur le réglage par l'état corporel rendue générale (non lue dans l'encadré AAHA) ; « une pesée toutes les deux semaines » présentée comme exemple ; « l'eau bien plus qu'un supplément de nourriture » remplacé par le rappel du BWG (la déshydratation gêne la thermorégulation) ; 74 % des coups de chaleur liés à l'exercice précisés (cas à cause connue, 5 % en voiture) ; conseils BWG complétés (heures chaudes/humides, chien peu entraîné) ; liens internes (urgence vétérinaire, collations, balades, règles de randonnée). Guide ajouté aux « À lire aussi » des activités (`guidesByCat.js`). **Série de 3 articles terminée.**

**31/10/2026** : Bimo propose de continuer (1/semaine ou 2/mois). Décision de l'utilisateur : **un article par mois**. Page `/guides` réorganisée par thèmes (Transports et formalités, Règles et sécurité, **Alimentation en voyage** = section de la série Bimo, chapeau avec lien sponsorisé, ancre `/guides#alimentation`). Ordre proposé à Bimo : fêtes de fin d'année (reçu vers le 15-20/11), hiver/montagne, train/avion/ferry, restaurant, passer la frontière (sources Commission européenne/douanes indispensables). Articles centrés sur l'alimentation, renvoyant vers nos guides. Même cadre (800-1 200 mots, sources, Word ou texte + 2 images, mention et lien sponsorisé, relecture libre).

## Demandes de liens envoyées (mails « Votre fiche sur Coco Explore »)

Statut : `envoyé` · `réponse` · `lien reçu` · `refus`. Textes dans `propositions/liens-entrants/mails-prets-2026-11-14*.md`.

| # | Établissement | E-mail | Envoyé le | Statut | Notes |
|---|---|---|---|---|---|
| 1 | Pension Cayron (Roquebrune-sur-Argens) | contact@pensioncayron.com | 14/11/2026 | envoyé | |
| 2 | Les Fripouilles du Rocher (Roquebrune-sur-Argens) | lesfripouillesdurocher@hotmail.fr | 14/11/2026 | envoyé | |
| 3 | Peace and Dog's (Loriol-sur-Drôme) | peace.and.dogs26@gmail.com | 14/11/2026 | envoyé | |
| 4 | Pension canine Des Élucines (Oloron-Sainte-Marie) | contact@elucines.com | 14/11/2026 | envoyé | |
| 5 | Dog Faculty (La Houssaye) | contact@dogfaculty.com | 14/11/2026 | envoyé | |
| 6 | Pension des Aulnes (Touville-sur-Montfort) | contact@pension-des-aulnes.fr | 14/11/2026 | envoyé | |
| 7 | Pôle Canin (Mérignac) | contact@polecanin.fr | 14/11/2026 | envoyé | |
| 8 | AntibesDogz (Antibes) | reservation@antibesdogz.fr | 14/11/2026 | envoyé | |
| 9 | Flair & Crocs Azuréen (Cannes) | contact@fca-cannes.fr | 14/11/2026 | envoyé | |
| 10 | Varec'h Kayak Bretagne (Baden) | varechkayak@gmail.com | 14/11/2026 | envoyé | |
| 11 | Strolls Paris | info@strollsparis.com | 14/11/2026 | envoyé | |
| 12 | Doggypark (Geispolsheim) | doggypark.strasbourg@gmail.com | 14/11/2026 | envoyé | |
| 13 | Doghouse (Le Rouget-Pers) | doghousepension@gmail.com | 14/11/2026 | envoyé | |
| 14 | Domaine des Rintintins (Saint-Just-Luzac) | pensiondepepiron@gmail.com | 14/11/2026 | envoyé | |
| 15 | Domaine de l'Auzaire (Les Achards) | domaine-de-lauzaire@outlook.fr | 14/11/2026 | envoyé | |
| 16 | Le Toutous Ranch (Perrignier) | letoutousranch@gmail.com | 14/11/2026 | envoyé | |
| 17 | Pension du Mont Liévain (Thieux) | pension.montlievain@orange.fr | 14/11/2026 | envoyé | |
| 18 | Chenil du Clos des Jarousses (Saint-Pardoux-l'Ortigier) | contact@chenil-jarousses.fr | 14/11/2026 | envoyé | |
| 19 | Les Grands Chenils de l'Ouest (Bouguenais) | lgco@wanadoo.fr | 14/11/2026 | envoyé | |
| 20 | Véro Animaux Services (Haguenau) | contact@veroanimaux.fr | 14/11/2026 | envoyé | |
| 21 | Debbie et les chiens (Fauillet) | debbieetleschiens@gmail.com | 14/11/2026 | envoyé | |
| 22 | Club HAM (Saint-Avold) | clubcaninham@gmail.com | 14/11/2026 | envoyé | |
| 23 | CaniMinet (Senlis) | info@caniminet.com | 14/11/2026 | envoyé | |
| 24 | Domaine de l'Empreinte (Tercé) | pensionlempreinte@gmail.com | 14/11/2026 | envoyé | |
| 25 | L'École des Woofs (Saint-Pierre-du-Mont) | lecoledeswoofs@gmail.com | 14/11/2026 | envoyé | |
| 26 | Domaine de Milly (Noron-la-Poterie) | pensionmilly@hotmail.com | 14/11/2026 | envoyé | |
| 27 | Garde à Woofs (Vaudevant) | contact@gardeawoofs.fr | 14/11/2026 | envoyé | |
