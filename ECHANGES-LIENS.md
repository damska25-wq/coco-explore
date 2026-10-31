# Suivi des échanges de liens

Fichier de suivi interne (non publié sur le site). Il liste les fiches créées dans le cadre d'un échange de liens : la fiche Coco Explore offerte à la personne, contre un lien vers cocoexplore.com de sa part. Aucun badge public : ce n'est pas un partenariat payant, et aucune mention « échange de liens » n'est affichée au public. Seule une ligne discrète « Fiche réalisée en collaboration avec … » figure en bas de la fiche.

Statuts du lien reçu : `à demander` · `promis` · `reçu` · `à vérifier` (lien disparu ou modifié).

| Personne | Activité / lieu | Fiche Coco Explore | Fiche créée le | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|---|
| Charlotte | Garde d'animaux à domicile, Sainte-Maxime | /dogsitter-charlotte-sainte-maxime | 15/10/2026 | Partage du lien de la fiche sur sa page Facebook | promis | Prénom seul affiché (pas de nom de famille, à la demande de l'utilisateur). Tél. publié avec son accord. À vérifier : lien vers cocoexplore.com aussi dans la description de sa page ou sur son site, s'il y en a un. |

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

**31/10/2026** : 4e article Bimo publié (sujet 3, aliments du terroir) : `/guide-aliments-terroir-chien` (`src/guides/aliments-terroir-chien.njk`, image `src/assets/guides/chien-vacances-france-aliments-a-eviter(-og).jpg`). Chaque affirmation relue sur sa source (ASPCA aliments à éviter, AAHA pancréatite, CAPAE-Ouest raisin, Ordre des vétérinaires). Corrections : phrase commerciale « C'est exactement ce que permet Bimo » remplacée par « Des outils comme Bimo peuvent aider » ; os : « les os cuits peuvent se briser » retiré (l'ASPCA parle des os en général : blessure ou obstruction) ; sel : signes alignés sur l'ASPCA (soif et urines accrues, vomissements, diarrhée, tremblements ou convulsions selon la quantité) ; oignon/ail : « même en petite quantité » remplacé par « le risque dépend de la quantité » (ASPCA) ; raisin : insuffisance rénale aiguë ajoutée (CAPAE-Ouest) ; pâte à pain : risque de dilatation-torsion ajouté (ASPCA) ; diarrhée ajoutée aux signes de pancréatite (AAHA) ; section « Fiche image SEO » retirée ; liens internes ajoutés (vétérinaires, hébergements, guides urgence vétérinaire et repas sur la route). Reste 1 article attendu : rations du chien sportif.
