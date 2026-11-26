# Clubs canins 76 / 27 / 77 (lot clubs-5, 26/11/2026)

Brief : `scratchpad/brief-clubs.md`. 9 fiches créées (sur 12 maximum), non publiées : `order: 0`, `heroImage`/`ogImage` vides, `photoUsername`/`photoName` vides. Front matter vérifié avec js-yaml, tous les liens internes pointent vers des fiches existantes, 300 mots minimum (307 à 494), aucune première personne, aucun nom de famille ni portable personnel.

## Fiches créées

| Fichier | Commune | Sources lues le 26/11/2026 |
|---|---|---|
| activite-club-canin-sotteville-les-rouen-76 | Sotteville-lès-Rouen (76) | stadesottevillaisomnisports.fr (section Club canin), clubcaninsotteville76300.com |
| activite-club-canin-de-la-heve-le-havre-76 | Le Havre (76) | clubcanindelaheve.asso-web.com (accueil, horaires, découverte, inscription, contact) |
| activite-club-canin-saint-romain-de-colbosc-76 | Saint-Romain-de-Colbosc (76) | clubcanindestromain.webnode.fr (accueil, programmes, tarifs, contact) |
| activite-cecv-saint-valery-en-caux-76 | Saint-Valery-en-Caux (76) | cecv76.fr (accueil, éducation, agenda, adresse) |
| activite-canieduc-eure-val-de-reuil-27 | Val-de-Reuil (27) | canieduceure.fr (accueil, contact, nos terrains) |
| activite-association-canine-fertoise-la-ferte-sous-jouarre-77 | La Ferté-sous-Jouarre (77) | associationcaninefertoise.fr (accueil, présentation, école du chiot, horaires, contact) |
| activite-acvl-amicale-canine-vallee-du-loing-grez-sur-loing-77 | Grez-sur-Loing (77) | acvl77.com (accueil, infos pratiques, planning, adresse) |
| activite-club-canin-chaumes-en-brie-77 | Chaumes-en-Brie (77) | agility-chaumes.fr (accueil, fiche de bienvenue) |
| activite-sports-loisirs-canins-torcy-77 | Torcy (77) | slctorcy.fr (accueil, adhésion, horaires, accès) |

## Points à connaître avant publication
- **Le Havre (Hève)** : cours complets en 2026, inscriptions à partir du 09/01/2027 pour les chiens de moins de 12 mois, petites races refusées ; dit dans la fiche. Position : géocodage du « chemin rural 15 » à Bléville, score 0,68 (< 0,7), commune correcte, à contrôler.
- **Saint-Valery-en-Caux (CECV)** : site très mince (pas de tarif ni de pièces à fournir) ; position approximative (secteur d'Étennemare, score 0,72). Fiche la plus courte (307 mots).
- **Grez-sur-Loing (ACVL)** : position prise sur les coordonnées GPS publiées par le club (48°19'17" N, 2°41'02" E), le géocodage de « route de Villiers » échoue.
- **Sotteville** : le site historique contient encore des consignes de réservation de la période sanitaire (doute dit dans la fiche). Contact par le secrétariat du Stade Sottevillais (02 35 63 06 17), pas par le portable de la responsable de section.
- **Val-de-Reuil** : page « Adhésion et règlement » en 403, tarif non lu (dit dans la fiche) ; téléphone et mail du club publiés par le club lui-même sur la page Contact.
- **Fertoise, Chaumes, ACVL, Saint-Romain** : seuls des portables de bénévoles ou de présidents sont publiés, donc fiche avec mail du club ou formulaire du site (Chaumes : mail du club publié).
- Liens internes : Saint-Romain renvoie vers la fiche Hève (nouvelle fiche du même lot) ; Sotteville renvoie vers les fiches Mont-Saint-Aignan et Europe Centre Canin (en ligne). À publier ensemble ou retirer le lien Saint-Romain → Hève.
- Pas de photo ni d'`order` : à attribuer à la publication. Chaque carte Sources porte la date de lecture 26/11/2026.

## Clubs écartés
- **Coulommiers Sport Canin (77)** : son seul site (coulommiersportcanin.free.fr) renvoie 404 ; seulement un article actu.fr et des annuaires.
- **Club canin Le Mée-sur-Seine (77)** : site Wix sans adresse du terrain ni horaires de cours.
- **Cani-Sports Eure (Vernon, 27)** : association de canicross/cani-VTT, pas un club d'éducation ; pas d'adresse de terrain publiée.
- **Clubs seulement dans les annuaires SCC ou chienplus.com** (Bois-Guillaume, Bonsecours, Montivilliers, Offranville, Entente cynophile havraise, Sotteville-sous-le-Val, Petit-Couronne, Torcy hors site, Tournan-en-Brie, Provins, Fontainebleau, Claye-Souilly, Vaux-le-Pénil, Villemer…) : pas de page propre trouvée, donc pas de fiche (règle du brief). Mont-Saint-Aignan et Mouroux, Villeparisis : déjà en ligne.
- **Éducateurs indépendants de l'Eure** (Correct'Eure Canin, Paw'sitive, CaniDuo, Hubert Hamot, Liberty Hall) : pas des clubs associatifs ; hors périmètre du brief.
- Pas de doublon trouvé dans `src/fiches` ni dans `propositions/nouvelles-fiches` (grep sur noms et communes).

## Résumé
1. 9 fiches de clubs créées dans `propositions/nouvelles-fiches/clubs-5/` : 4 en Seine-Maritime (Sotteville, Le Havre, Saint-Romain-de-Colbosc, Saint-Valery-en-Caux), 1 dans l'Eure (Val-de-Reuil), 4 en Seine-et-Marne (La Ferté-sous-Jouarre, Grez-sur-Loing, Chaumes-en-Brie, Torcy).
2. Aucun club retenu à Rouen même : les clubs rouennais ont soit déjà une fiche (Mont-Saint-Aignan), soit pas de page propre.
3. Eure : un seul vrai club associatif avec site (Val-de-Reuil) ; les autres sont des éducateurs indépendants.
4. Points à contrôler avant publication : position du Havre (score 0,68) et de Saint-Valery, tarif non publié à Val-de-Reuil et Chaumes, inscriptions fermées jusqu'en janvier 2027 au Havre.
5. `order` et photos à attribuer ; build non lancé (pas de build ni de git, selon le brief).
