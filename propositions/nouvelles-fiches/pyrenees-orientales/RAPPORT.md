# Rapport lot Pyrénées-Orientales (22/11/2026)

10 fiches hébergements, `departement ["66"]`, `heroImage ""`, `order 0` (à attribuer). Front matter vérifié avec js-yaml (10 OK). Titres ≤ 75 caractères, descriptions ≤ 160, corps de 300 à 414 mots. Aucun doublon dans `src/fiches` ni `propositions/nouvelles-fiches` (grep de chaque nom) ; aucun nom dans les listes de suppression / à ne pas recréer.

## Fiches

| Fiche (fichier) | Commune | Conditions chien (source officielle) | Saison | Sources lues le 22/11/2026 | Position | Doute |
|---|---|---|---|---|---|---|
| Hôtel Centre Plage (`hebergement-hotel-centre-plage-argeles-sur-mer-66`) | Argelès-sur-Mer | 11 €/jour, 1 chien par réservation, chats non admis, laisse, interdit en salle de petit-déjeuner | « 360 jours » par an, dates non publiées | centreplage.com (accueil + Nos services), OT Pyrénées Méditerranée | BAN 0,96, numéro exact | pas de taille ni chien seul ; fermeture non datée |
| Hôtel Bleu Azur (`...-hotel-bleu-azur-argeles-sur-mer-66`) | Argelès-sur-Mer | chiens < 10 kg, 8 €/jour, 1 animal, jamais seul en chambre, panier obligatoire | toute l'année | hotel-bleu-azur.fr, OT | BAN 0,96, numéro exact | titre « chien accepté » alors que limité aux petits chiens (dit dans description, texte, infoItems) ; 3 étoiles lu dans le titre de page seulement |
| Hôtel Acajou (`...-hotel-acajou-argeles-sur-mer-66`) | Argelès-sur-Mer | chiens non catégorisés seuls, forfait 5 €/jour, caution 50 € ; long séjour 2 €/jour | non publiée | hotel-acajou.fr, OT | BAN 0,61 pour l'impasse des Huppes (sous le seuil) : retenu le point « avenue de Montgat » BAN 0,95, rue seule, écart estimé ~500 m avec l'impasse | hôtel-résidence, tarifs mensuels différents ; pas d'étoiles publiées |
| Camping Les Pingouins (`camping-les-pingouins-argeles-sur-mer-66`) | Argelès-sur-Mer | 1 animal par hébergement, sauf cat. 1 et 2 ; supplément non publié | 9/04-19/09/2027 | camping-lespingouins.fr (accueil), OT | BAN 0,96, rue seule (chemin de la Salanque, sans numéro) | supplément et espaces communs non lus (grille PDF non lue) |
| Camping Les Criques de Porteils (`camping-les-criques-de-porteils-argeles-sur-mer-66`) | Argelès-sur-Mer | chiens acceptés au camping et dans certains locatifs, sauf cat. 1 et 2 | 27/03-08/11/2026 (2027 non affichée) | lescriques.fr (accueil + page Plan du camping), OT | BAN 0,76, rue seule (route de Collioure) : position approximative | locatifs concernés non listés ; supplément non publié ; point GPS à ±800 m possible |
| Camping Le Méditerranée (`camping-le-mediterranee-argeles-sur-mer-66`) | Argelès-sur-Mer | animaux acceptés avec supplément (non publié), cat. 1 et 2 interdites, vaccins à jour + identification | 04/05-20/09/2027 | lemediterranee-argeles.fr (accueil + hébergements), OT | BAN 0,95, rue seule | montant, nombre, espaces aquatiques non publiés |
| Hôtel du Port (`...-hotel-du-port-canet-en-roussillon-66`) | Canet-en-Roussillon | « animaux acceptés pour un supplément de 8 € » (pages Chambres et Restaurant & Bar) | avril à octobre (site) ; 18/04-03/10/2026 et 01/04-03/10/2027 (OT) | hotel-du-port.net (2 pages), OT 66 | BAN 0,96, numéro exact | unité du supplément absente → pas de montant dans le titre ; dates 2027 viennent de l'OT |
| Hôtel ibis Styles Perpignan Canet-en-Roussillon (`...-ibis-styles-perpignan-canet-en-roussillon-66`) | Canet-en-Roussillon | « Animaux acceptés » avec frais supplémentaires, montant non publié | non publiée | page all.accor.com de l'hôtel | BAN 0,97, numéro exact | montant et conditions non publiés ; la page Accor est celle de l'hôtel sur le site de sa chaîne |
| Hôtel Le Canetois (`...-hotel-le-canetois-canet-en-roussillon-66`) | Canet-en-Roussillon | « animaux bienvenus », 10 €/nuit/animal sur demande (site) ; 7 € sur l'OT | 15/06-30/11 (OT seulement) | hotellecanetois.com (accueil + Services), OT 66 | BAN 0,96, numéro exact | montants divergents (10 vs 7) → titre sans montant ; ouverture non lue sur le site de l'hôtel |
| Villa Camille Hôtel & Spa (`...-villa-camille-hotel-spa-banyuls-sur-mer-66`) | Banyuls-sur-Mer | FAQ : animaux de compagnie acceptés, interdits dans l'espace bien-être ; supplément et taille non publiés | non publiée (réception 24h/24) | hotelvillacamille.com (accueil + FAQ), OT | BAN 0,95, numéro exact (coordonnées JSON-LD de l'hôtel identiques) | la FAQ dit « animaux de compagnie » sans nommer le chien |

Téléphones : tous publiés par l'établissement (aucun 08 9x). Villa Camille : 04 48 07 24 42 (tel +33448072442 du JSON-LD de l'hôtel).

## Écartés

- Camping Les Galets (Argelès) : la page d'accueil dit les chiens bienvenus « moyennant un supplément », hors quartier Privilège et espace aquatique, catégorie 1 interdite ; saison non lue. Disponible en réserve (pas de fiche faute d'ouverture lue).
- Hôtel Saint-Georges (Canet) : site officiel lu, aucune mention des animaux ; seul l'office de tourisme le dit.
- Hôtel Le Coq d'Or (Les Angles) : pages du site (accueil, chambres, appart'hôtels) sans mention des animaux ; seul l'office de tourisme (lesangles.com, supplément 9 €) le dit. Reprendre si une page « conditions » est trouvée.
- Hôtel Le Galion (Canet) : seuls Logis Hôtels et l'office de tourisme mentionnent les animaux ; pas de page officielle explicite lue.
- ibis budget Perpignan Nord (Rivesaltes, pas Perpignan) : numéro publié surtaxé (0 892), donc aucune fiche.
- Camping Les Chênes Rouges (Argelès) : bandeau « exceptionnellement fermé » sur le site.
- Hébergements déjà couverts par le site : Côté Thalasso, Hôtel La Pinède, Les Sables, Flamants Roses, Sunêlia Les Pins, Les Amandiers, etc. (43 fiches existantes).
- Hôtels à Collioure, Font-Romeu : déjà bien fournis, rien de nouveau avec page officielle explicite trouvé dans ce lot. Formiguères et Port-Vendres : recherche sans résultat exploitable. Les Angles : VVF Les Terrasses du Soleil trouvé via EmmèneTonChien seul (pas officiel).
