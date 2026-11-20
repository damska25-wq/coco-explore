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
| 7 | Pôle Canin (Mérignac) | contact@polecanin.fr | 14/11/2026 | réponse 16/11 | Réponse positive : signale le Pôle Canin Campus à Cestas (parc de loisirs, garderie de jour), qui a déjà sa fiche ; titre de la fiche Cestas mis en avant le 16/11. Lien non encore demandé explicitement en retour |
| 8 | AntibesDogz (Antibes) | reservation@antibesdogz.fr | 14/11/2026 | envoyé | |
| 9 | Flair & Crocs Azuréen (Cannes) | contact@fca-cannes.fr | 14/11/2026 | envoyé | |
| 10 | Varec'h Kayak Bretagne (Baden) | varechkayak@gmail.com | 14/11/2026 | réponse 15/11 | Corrections reçues et appliquées le 15/11 (pas de chien sur les paddles ni en randonnée accompagnée, tarifs en hausse en 2027) ; pas de réponse sur le lien |
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
| 21 | Debbie et les chiens (Fauillet) | debbieetleschiens@gmail.com | 14/11/2026 | envoyé | réponse 16/11 : fiche validée telle quelle (« Tout m'a l'air parfait »), pas de lien mentionné |
| 22 | Club HAM (Saint-Avold) | clubcaninham@gmail.com | 14/11/2026 | envoyé | |
| 23 | CaniMinet (Senlis) | info@caniminet.com | 14/11/2026 | envoyé | |
| 24 | Domaine de l'Empreinte (Tercé) | pensionlempreinte@gmail.com | 14/11/2026 | envoyé | |
| 25 | L'École des Woofs (Saint-Pierre-du-Mont) | lecoledeswoofs@gmail.com | 14/11/2026 | envoyé | |
| 26 | Domaine de Milly (Noron-la-Poterie) | pensionmilly@hotmail.com | 14/11/2026 | envoyé | |
| 27 | Garde à Woofs (Vaudevant) | contact@gardeawoofs.fr | 14/11/2026 | envoyé | |
| 28 | Château de Langeais | contact@chateau-de-langeais.com | 15-16/11/2026 | envoyé | |
| 29 | Grottes du Cerdon | info@grotte-cerdon.com | 15-16/11/2026 | envoyé | |
| 30 | Grottes du Roc de Cazelle | info@rocdecazelle.com | 15-16/11/2026 | envoyé | |
| 31 | Jardins de Kerdalo | lesjardinsdekerdalo@gmail.com | 16/11/2026 | envoyé | |
| 32 | Domaine de la Bastide Blanche | contact@bastide-blanche.fr | 16/11/2026 | envoyé | |
| 33 | Vign'Appart | contact@vignappart.com | 15-16/11/2026 | envoyé | |
| 34 | Auberge des Montauds | contact@auberge-des-montauds.fr | 15-16/11/2026 | envoyé | |
| 35 | Camping Le Petit Liou | info@camping-lepetitliou.com | 15-16/11/2026 | envoyé | |
| 36 | Camping de l'Océan | info@relaisdelocean.com | 15-16/11/2026 | réponse 16/11 | dates 2027, BP 18 retirée, Bocabo signalé ; fiche corrigée, réponse envoyée le 16/11 ; pas de réponse sur le lien |
| 37 | Maison d'hôtes Le Pic d'Anie | contact@hebergement-picdanie.fr | 15-16/11/2026 | envoyé | |
| 38 | Camping Domaine Arleblanc | info@arleblanc.com | 15-16/11/2026 | réponse 16/11 | corrections via l'espace pro (tarifs 2027, services, interdictions) ; fiche corrigée, réponse envoyée le 16/11 |
| 39 | Domaine Le Gui | info@domainelegui.com | 15-16/11/2026 | envoyé | |
| 40 | Gîte L'Écrin de la Brenne | contact@ecrin-brenne.fr | 15-16/11/2026 | envoyé | |
| 41 | Vedettes Jolie France (Îles Chausey) | accueil@vedettesjoliefrance.com | 15-16/11/2026 | envoyé | |
| 42 | La Maison Plûme | reservation@lamaisonplume.com | 15-16/11/2026 | réponse 16/11 | supplément 20 €/nuit, balades, photo fournie ; fiche corrigée, réponse envoyée le 16/11 |
| 43 | Château de la Roche | contact@lechateaudelaroche.fr | 16/11/2026 | envoyé | |
| 44 | Haras national de Cluny | accueil@ehnc.fr | 16/11/2026 | envoyé | |
| 45 | Hôtel Aux Ducs de Savoie | info@ducs-de-savoie.com | 16/11/2026 | envoyé | |
| 46 | L'Esprit Chien | cyno-pro@lespritchien.fr | 16/11/2026 | envoyé | |
| 47 | Le Pouget | info@lepouget-dordogne.fr | 16/11/2026 | envoyé | |
| 48 | Centre canin Lady Noire | contact@lady-noire.fr | 16/11/2026 | envoyé | |
| 49 | Animar | contact@animar.fr | 16/11/2026 | envoyé | |
| 50 | Animalegria | contact@animalegria.fr | 16/11/2026 | envoyé | |
| 51 | Les Trois Frênes | contact@lestroisfrenes.com | 16/11/2026 | envoyé | |
| 52 | Centre Canin Thomas Cormier | contact@centrecaninthomascormier.com | 16/11/2026 | envoyé | |
| 53 | Com'Chien et Chat | contact@com-chien-chat.com | 16/11/2026 | envoyé | |
| 54 | Pension du Pont de Sèvres | contact@pensiondupontdesevres.fr | 16/11/2026 | envoyé | |
| 55 | Pitchounes | contact@pitchounes16.com | 16/11/2026 | envoyé | |
| 56 | Paw'sitive Job | contact@pawsitivejob.fr | 16/11/2026 | envoyé | |
| 57 | Les Nouvelles Carrières Noires | contact@lescarrieresnoires.fr | 16/11/2026 | envoyé | |
| 58 | Moulin de Petoulle (Charenton-du-Cher) | moulindepetoulle@gmail.com | 17/11/2026 | envoyé | |
| 59 | Camping Les Bois du Bardelet (Poilly-lez-Gien) | contact@bardelet.com | 17/11/2026 | envoyé | |
| 60 | Camping Merendella (Moriani-Plage) | contact@merendella.com | 17/11/2026 | envoyé | |
| 61 | Le Mas Normand (Ver-sur-Mer) | lemasnormand14@gmail.com | 17/11/2026 | envoyé | |
| 62 | Canoë Les 7 Rives (Montignac-Lascaux) | contact@canoe-montignac.com | 17/11/2026 | envoyé | |
| 63 | Camping Gwel Kaër (Lanvéoc) | info@camping-gwel-kaer.com | 17/11/2026 | envoyé | |
| 64 | Chez Cabeillou (Orthez) | chezcabeillou64@gmail.com | 17/11/2026 | envoyé | |
| 65 | Camping Le Panoramic (Telgruc-sur-Mer) | info@camping-panoramic.com | 17/11/2026 | envoyé | |
| 66 | Au Site Normand (Clécy) | sitenormand@orange.fr | 17/11/2026 | envoyé | |
| 67 | Villa Aliénor (Les Andelys) | villa.alienor@gmail.com | 17/11/2026 | envoyé | |
| 68 | Château les Reuilles (Savignac-de-Duras) | lesreuilles.chateau@gmail.com | 17/11/2026 | envoyé | |
| 69 | Domaine du Ciran (Ménestreau-en-Villette) | contact@domaineduciran.com | 17/11/2026 | envoyé | |
| 70 | Dogwash Perle and Co (Mouans-Sartoux) | dogwashperleandco@gmail.com | 17/11/2026 | envoyé | |
| 71 | Lab Wash, Lab & Compagnie (La Martyre) | contact@labetcompagnie.com | 17/11/2026 | envoyé | |
| 72 | Au Terrier (Châteauroux) | auterriertoilettage@gmail.com | 17/11/2026 | envoyé | |
| 73 | Hôtellerie Saint-Yves (Chartres) | hotellerie@maison-st-yves.com | 17/11/2026 | envoyé |  |
| 74 | Hôtel Le Pré de la Cure (Yvoire) | lepredelacure@wanadoo.fr | 17/11/2026 | envoyé |  |
| 75 | Sud Hôtel (Bastia) | sudhotelbastia@gmail.com | 17/11/2026 | envoyé | 1er envoi revenu (ancienne adresse contact@sudhotel-bastia.com), renvoyé à l'adresse du site officiel |
| 76 | Camping de Champlitte (Champlitte) | campingchamplitte@yahoo.com | 17/11/2026 | envoyé |  |
| 77 | Ferme des Buttons (Rosnay) | lafermedesbuttons@gmail.com | 17/11/2026 | envoyé |  |
| 78 | Logis Hôtel-Restaurant Les Capucins (Avallon) | contact@avallonlescapucins.com | 17/11/2026 | envoyé |  |
| 79 | Camping Le Fanal (Isigny-sur-Mer) | info@camping-lefanal.com | 17/11/2026 | envoyé |  |
| 80 | Le Pitchoun (Le Val) | lepitchoun.contact@gmail.com | 17/11/2026 | envoyé |  |
| 81 | Camping du Lauzart (Lescun) | campingdulauzart@pyreneesloisirs.fr | 17/11/2026 | envoyé |  |
| 82 | Hôtel-restaurant Le Connétable (Saint-Bonnet-en-Champsaur) | contact@hotel-le-connetable.com | 17/11/2026 | envoyé |  |
| 83 | Esthétique Canin (Le Cannet) | esthetique.canin06110@gmail.com | 17/11/2026 | envoyé |  |
| 84 | Dog&cat élégance (Tours) | aucune adresse valide (contact@dogcatelegance.fr inopérante) | — | non envoyé | adresse du site inopérante ; salon « fermé temporairement » selon Google Maps (nov. 2026) ; contact possible par Instagram @dogandcat_elegance ou 06 29 74 06 93 |
| 85 | Dogwash Mende (Mende) | dogwashmende@orange.fr | 17/11/2026 | réponse 17/11 | précisions reçues (local à part, 6h-23h 7j/7, 8 €/10 min avec pause, équipements, bouton d'appel) ; fiche corrigée le 17/11 |
| 86 | Auberge du Cratère (Volvic) | auberge.cratere@orange.fr | 17/11/2026 | envoyé |  |
| 87 | Campo di Fiori, maisons de charme (Calvi) | contact@location-campodifiori.com | 17/11/2026 | envoyé |  |
| 88 | Camping Monaco Parc (Longny-au-Perche) | campingmonacoparc@gmail.com | 18/11/2026 | envoyé | nouveau style |
| 89 | La Signoria & Spa (Calvi) | info@hotel-la-signoria.com | 18/11/2026 | envoyé | nouveau style |
| 90 | Hôtellerie du Cheval Blanc (Sainte-Maure-de-Touraine) | contact@hotellerieduchevalblanc.fr | 18/11/2026 | envoyé | nouveau style |
| 91 | Camping Toul ar Ster (Penmarc'h) | campingpenmarch@orange.fr | 18/11/2026 | envoyé | nouveau style |
| 92 | Le Petit Gourmet (Montmorillon) | petitgourmet@free.fr | 18/11/2026 | envoyé | nouveau style |
| 93 | Camping Canal de Berry (Saint-Amand-Montrond) | accueil@campingcanaldeberry.fr | 18/11/2026 | envoyé | nouveau style |
| 94 | Le Clos Marie (Langeais) | leclosmarie@free.fr | 18/11/2026 | envoyé | nouveau style |
| 95 | Hôtel-Restaurant Le Styvel (Camaret-sur-Mer) | hotelstyvel@wanadoo.fr | 18/11/2026 | envoyé | nouveau style |
| 96 | Camping Les Pieds dans l'Eau (Crozon) | info@campingcrozon.com | 18/11/2026 | envoyé | nouveau style |
| 97 | Aux Quatre Pat' (Lavaur) | auxquatrepat@gmail.com | 18/11/2026 | envoyé | nouveau style |
| 98 | Hôtel Le Beaugency (Beaugency) | reception@lebeaugency45.fr | 18/11/2026 | envoyé | |
| 99 | Logis Hôtel Les Glycines (Melle) | contact@hotel-lesglycines.com | 18/11/2026 | envoyé | |
| 100 | Brasserie L'Europe (Pau) | contact@leuropepau.com | 18/11/2026 | envoyé | |
| 101 | Logis Hôtel Le Fontarabie (Fontenay-le-Comte) | reception@hotel-fontarabie.com | 18/11/2026 | envoyé | |
| 102 | Gîte La Chapelle (La Rosière) | gitelachapelle@orange.fr | 18/11/2026 | mail revenu | adresse inexistante (Orange, destinataire invalide) ; retirée de la fiche ; seul contact : 03 84 94 65 28 |
| 103 | Camping Le Mandriale (Cargèse) | camping.le.mandriale@gmail.com | 18/11/2026 | réponse auto 18/11 | camping fermé ; réservations 2027 dès le 1er février, 7 nuits minimum (ajouté à la fiche) ; relancer après le 1er février 2027 |
| 104 | Poppy's Dogs (Lourdes) | poppysdogs65@gmail.com | 18/11/2026 | réponse 18/11 | précisions (pas de nouveaux clients en toilettage, griffes ouvertes à tous, chats pour les griffes, vente sur commande, tarifs en fourchettes) ; fiche corrigée le 18/11 ; pas de réponse sur le lien |
| 105 | Camping de Ceyreste (Ceyreste) | campingceyreste@gmail.com | 18/11/2026 | envoyé | |
| 106 | Au Plaisir Du Chien (Loudéac) | auplaisirduchien22@gmail.com | 18/11/2026 | envoyé | |
| 107 | Hôtel Le Clos d'Amboise (Amboise) | infos@leclosdamboise.com | 18/11/2026 | envoyé | |
| 108 | K-Nin Concept Store (Belfort) | kninconceptstore@gmail.com | 20/11/2026 | envoyé | série 9 |
| 109 | Clebs Concept Store (Rennes) | hello@clebs-store.fr | 20/11/2026 | envoyé | série 9 |
| 110 | Pension Innovadog (Plieux) | pensioninnovadog@gmail.com | 20/11/2026 | envoyé | série 9 |
| 111 | FlashDogPro (Aix-les-Bains) | flashdogpro@flashdogpro.com | 20/11/2026 | envoyé | série 9 |
| 112 | Welldog (Divatte-sur-Loire) | contact@welldog.fr | 20/11/2026 | envoyé | série 9 |
| 113 | Rebel Dogs Academy (Angers) | info@rebeldogs.academy | 20/11/2026 | envoyé | série 9 |
| 114 | Camping Bellevue (Montferrat) | campingbellevue38@gmail.com | 20/11/2026 | envoyé | série 9 |
| 115 | Camping La Grande Tortue (Candé-sur-Beuvron) | camping@grandetortue.com | 19/11/2026 | réponse 19/11 | supplément animal 5 €/nuit et par animal ; fiche corrigée le 19/11 (titre avec supplément) ; remerciement envoyé le 20/11 |
| 116 | Camping La Maïade (Mimizan) | contact@campinglamaiade.fr | 20/11/2026 | envoyé | série 9 |
| 117 | Camping Dolce Vita (Calvi) | info@dolce-vita-calvi.com | 20/11/2026 | envoyé | série 9 |
| 118 | Camping de la Presqu'île (Crozon) | info@campingcrozon.bzh | 20/11/2026 | envoyé | série 10 |
| 119 | Hôtel Château des Forges (Angers) | contact@lechateaudesforges.fr | 20/11/2026 | envoyé | série 10 |
| 120 | Camping l'Île Blanche (La Flotte-en-Ré) | contact@ile-blanche.com | 20/11/2026 | envoyé | série 10 |
| 121 | Camping Lou Pignada (Ondres) | info@camping-loupignada.com | 20/11/2026 | envoyé | série 10 |
| 122 | Camping de l'Ombrade (Aurillac) | campingombrade@aurillacagglo.fr | 20/11/2026 | envoyé | série 10 |
| 123 | Lave Ton Dog (Argelès-sur-Mer) | info@lavetondog.com | 20/11/2026 | envoyé | série 10 |
| 124 | Lucky Wash (Poitiers) | contact@luckywash.fr | 20/11/2026 | envoyé | série 10 |
| 125 | Hôtel La Couronne (Riquewihr) | couronne@hoteldelacouronne.com | 20/11/2026 | envoyé | série 10 |
| 126 | Hôtel Le Tremplin (Méribel) | info@hoteltremplin.com | 20/11/2026 | envoyé | série 10 |
| 127 | Hôtel Les Fougères (Soorts-Hossegor) | contact@hotel-lesfougeres.fr | 20/11/2026 | envoyé | série 10 |

**15/11/2026** : article Bimo n° 6 (fêtes de fin d'année) préparé : `/guide-fetes-repas-chien` (`src/guides/fetes-repas-chien.njk`, image `src/assets/guides/chien-fetes-repas-maison-aliments-a-eviter(-og).jpg`), en ligne avec la prochaine mise en ligne (16/11). Chaque affirmation relue sur sa source (ASPCA conseils fêtes, aliments à éviter et aliments à partager ; CAPAE-Ouest chocolat et raisin ; FDA xylitol ; AAHA pancréatite ; WSAVA guide des friandises ; Ordre des vétérinaires). Corrections : « les os cuits » → os de volaille (ASPCA), « cuits comme crus » attribué à la WSAVA ; échalote attribuée à ASPCA + WSAVA ; « courge cuite » → « potiron cuit » (ASPCA) ; phrase commerciale « C'est justement le rôle de Bimo » → « Des outils comme Bimo peuvent aider » ; section « Fiche image SEO » retirée ; liens internes (feux d'artifice, Noël avec son chien, vétérinaires, urgence vétérinaire, hébergements) ; lien depuis `/noel-chien` et « À lire aussi » des restaurants. Prochain sujet proposé à Bimo : hiver/montagne, vers mi-janvier 2027 (choix de l'utilisateur le 15/11 : l'article des fêtes, reçu mi-novembre, couvre décembre ; publication avant les vacances de février).

**16/11/2026** : réponse du Camping de l'Océan (Saint-Pierre-Quiberon, série 3 n° 36) : site en refonte, saison 2027 du 2 avril au 30 octobre 2027, BP 18 à supprimer, toiletteur le plus proche signalé : Bocabo (Quiberon). Fiche corrigée le 16/11. Piste : fiche « Toiletteur Quiberon : Bocabo » à créer en mode SIRENE plus tard (pas de fiche existante). Pas de réponse sur le lien.

**16/11/2026** : Bimo valide les ajustements de l'article n° 6 (fêtes, en ligne le 16/11) et le lien depuis la page Noël. Prochain article (hiver/montagne) annoncé vers mi-janvier 2027.

- **La Maison Plûme (Villequier, 76)** — réponse reçue le 16/11/2026 au mail de la série 3 : supplément animal 20 €/nuit (option de réservation), balades (voies piétonnes au bord de la Seine, sacs gratuits sur le quai, forêt derrière la maison), photo de la maison fournie pour remplacer la photo Unsplash. Fiche corrigée le 16/11 ; réponse prête dans `propositions/liens-entrants/reponses-a-envoyer-apres-mise-en-ligne.md`, à envoyer après la prochaine mise en ligne. Pas de lien demandé dans cette réponse (déjà demandé dans le premier mail).

- **Réponses envoyées le 16/11/2026** (après la mise en ligne de 15 h 39) : La Maison Plûme, Domaine Arleblanc, Camping de l'Océan (Kerhostin), Pôle Canin (Cestas), Debbie et les chiens (mot de remerciement).

- **Envoyés le 20/11/2026** (après la mise en ligne du 20/11) : réponses au Camping La Grande Tortue, à Poppy's Dogs et au Dogwash Mende ; séries 9 (n° 108-117, sauf 115) et 10 (n° 118-127). 125 demandes de liens envoyées au total (105 au 18/11, n° 115 le 19/11, 19 le 20/11).
