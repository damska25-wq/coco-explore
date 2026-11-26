# Clubs canins, lot clubs-12 (26/11/2026) : Côtes-d'Armor 22, Ille-et-Vilaine 35, Mayenne 53, Eure-et-Loir 28

Résultat : 5 fiches (`order: 0`, `heroImage: ""`, front matter validé avec js-yaml, titres de 54 à 62 caractères, 485 à 677 mots, liens internes vérifiés, aucun doublon dans `src/fiches` ni `propositions/nouvelles-fiches`). Objectif 5 par département : atteint pour 28 (3 -> 5) et 22 (4 -> 5) ; 35 passe de 4 à 6 ; 53 reste à 4 (aucun club avec une page propre exploitable).

## Fiches créées
| Fichier | Commune | Sources lues le 26/11/2026 |
|---|---|---|
| activite-club-canin-hanches-28.njk | Hanches (28) | club-canin-hanches.com (accueil, rejoindre, organisation des cours, où sommes-nous, contact) |
| activite-entente-canine-dunoise-chateaudun-28.njk | Châteaudun (28) | ecdchateaudun.com (accueil, agility, tarifs, règlement), fiche sports-canins.net |
| activite-club-education-canine-dinard-35.njk | Dinard (35) | cecdinard.wixsite.com (accueil, inscription, disciplines, contact), annuaire mairie de Dinard, liste SCC |
| activite-camagus-domloup-35.njk | Domloup (35) | camagus.fr (accueil, agility, éducation et comportement, contact) ; structure professionnelle (prénom seul, pas de domicile : seule la commune est publiée) |
| activite-dinan-sport-canin-quevert-22.njk | Quévert (22) | page Facebook et Instagram officiels du club, répertoire chienplus.com (Société canine bretonne) |

## Points à voir avant publication
- Hanches : le seul téléphone publié est le portable de la présidente (non repris, ni son nom) ; contact par mail du club. Position = coordonnées GPS du club (48°36'01" N, 1°38'03" E, saisies en degrés/minutes), la Géoplateforme ne trouve que « rue des Graviers » (score 0,67). Affiliation SCC non indiquée par le site : non affirmée.
- Châteaudun : l'horaire d'éducation (dimanche 9h30-12h) vient du règlement ; la page agility dit 9h45. Position rue de « Chollet » (score 0,85, la voie s'écrit ainsi à la BAN, « Cholet » sur le site du club).
- Dinard : horaires du site en image (illisible) ; créneaux repris de l'annuaire de la mairie. « Mon Repos » introuvable à la Géoplateforme : position issue de la liste officielle SCC (48°36'17" N, 2°04'48" W), approximative. Cani-rando du 21/11/2026 déjà passée, citée comme « dernière annoncée ».
- Camagus : site professionnel sans adresse de rue (seulement « 35410 Domloup »), position au centre de la commune. Le téléphone 06 est celui publié par l'entreprise elle-même.
- Dinan Sport Canin : fiche plus légère (horaires de la page Facebook ; tarifs, âge, inscription non lisibles ; détails dans des stories Instagram). Le portable de la page Facebook n'est pas repris (contact par Messenger). Position au lieu-dit (score 0,96) ; une carte en ligne le place ~600 m plus loin.

## Clubs écartés
- Mayenne : Club d'éducation canine de Château-Gontier (Azé) : site clubcanin53.fr détourné (renvoie vers un article de blog sans rapport), page Facebook sans horaires ni tarifs ; Club lavallois du chien de travail (Laval) : seulement un groupe Facebook privé et la fiche sports-canins.net (ring), pas d'horaires officiels. Canis Disciplina (Saint-Berthevin) : déjà en ligne. Éducateurs à domicile (Educagil, Maison CaniKiff, Un Chien Au Poil) : pas de club, nom de famille dans le texte des pages ou pas de terrain d'accueil.
- Eure-et-Loir : Club canin de la Voise (Ymeray) : éducation canine suspendue, en recherche de moniteur, siège chez un particulier ; seulement agility. Multi-Pat's (Vernouillet) et Aux Chiens Agiles (Villeau) : sites e-monsite inaccessibles (403). Cloyes, Drouais, Étilleux : pas de page lisible.
- Côtes-d'Armor : Club canin de Trémorel (site e-monsite : dimanche 9h30, rue de l'Avenir ; un avis Google de 2022 décrit un collier étrangleur exigé et des coups de laisse, aucune réponse du club) mis dans `a-revoir/` en note ; 4 Patt'Fun (Pléhédel) : seulement un groupe Facebook privé et un article de presse, pas d'adresse ni d'horaires, seul numéro = portable de la présidente ; Sport canin loudéacien : site injoignable, sources de 2018 et 2021 ; club de La Méaugon (créé en 2025) : aucune page propre ; Plouézec, Laurenan, Quintin, Lanrodec, Trégueux : répertoire seul.
- Ille-et-Vilaine : Club canin Meet Your Dog (Saint-Armel, site Jimdo, éducation et loisirs, complet jusqu'en janvier 2027) : aucune adresse de terrain lisible ; Corps-Nuds, Gosné, Saint-Erblon, Erbrée, Bourgbarre : répertoire seul.

## Résumé
1. 5 fiches préparées dans `propositions/nouvelles-fiches/clubs-12/` (28 : 2, 35 : 2, 22 : 1, 53 : 0).
2. 28 passe à 5 fiches éducation, 22 à 5, 35 à 6 ; 53 reste à 4.
3. Aucun nom de famille ni portable personnel dans les fiches ; positions approximatives pour Hanches, Dinard, Camagus et Dinan Sport Canin.
4. Dinan Sport Canin est la fiche la plus légère (tarifs non publiés).
5. Rien dans `src/`, pas de build ni de git.
