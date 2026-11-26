# Clubs canins lot 2 : 31 (Toulouse et agglomération), 34, 11 (rapport du 26/11/2026)

10 fiches préparées, non publiées (`order: 0`, `heroImage: ""`, photos à attribuer). Frontmatter relu avec js-yaml (OK), titres ≤ 75 caractères, 490 à 650 mots de corps. Liens internes : uniquement vers des fiches existantes de `src/fiches/`.

## Fiches créées

| Fichier | Commune | Source principale (lue le 26/11/2026) | Point à surveiller |
|---|---|---|---|
| activite-abcd-blagnac-31 | Blagnac (31) | clubchienblagnac.com (club, horaires, tarifs, adresse) | complet ; GPS publié par le club |
| activite-esprit-canin-31-balma-31 | Balma (31) | espritcanin31.fr (accueil, qui sommes-nous, contact) | horaires = annonce de rentrée (3/10) ; pas de tarif publié |
| activite-ctcdp-toulouse-31 | Toulouse (31) | ctcdp.com (le club, accueil) | ni horaires ni tarifs publiés ; GPS du club |
| activite-aerochiens-bord-de-save-levignac-31 | Lévignac (31) | aerochiens.com (accueil, tarifs et inscription) | page Horaires vide à la lecture ; adresse « stade de Lévignac », position = avenue de la Save (approximative) |
| activite-agility-cugnalais-cugnaux-31 | Cugnaux (31) | clubagilitycugnalais.fr (accueil, horaires, contact) | pas de tarif ; mail de la présidente non repris (nom de famille) |
| activite-cercle-canin-aussonnais-aussonne-31 | Aussonne (31) | ccaaussonne.wordpress.com (club, planning, inscription, éducation) | nom et portable d'un bénévole non repris ; mail g003@orange.fr gardé |
| activite-club-canin-mauguio-carnon-34 | Mauguio (34) | clubcaninmauguio.com (accueil, tarifs 2026-2027, contact) | deux adresses mail différentes sur le site, pas de téléphone repris ; planning par discipline ambigu, renvoyé au site |
| activite-education-canine-dardaillon-lunel-viel-34 | Lunel-Viel (34) | ledardaillon.fr / ecdd.wifeo.com + Midi Libre 08/09/2026 | terrain fermé le 25/11/2026 « jusqu'à nouvel ordre » (annonce du club) : revérifier avant publication ; horaires de l'année non publiés ; GPS du club |
| activite-portel-sport-canin-portel-des-corbieres-11 | Portel-des-Corbières (11) | portelsportcanin.wifeo.com (accueil, horaires) | site non daté, sans adresse ni téléphone ; adresse du terrain tirée d'un répertoire de clubs (chienplus.com), position approximative (route de Durban) |
| activite-team-agility-cathare-ferrals-les-corbieres-11 | Ferrals-les-Corbières (11) | page Facebook officielle (intro, tél.) + L'Indépendant 21/08 et 07/11/2026 | site teamagilitycathare.fr hors ligne ; pas de rue ; position = centre de la commune (à ajuster) ; téléphone des moniteurs publié par le club sur sa page |

Aucun doublon dans `src/fiches` ni dans `propositions/nouvelles-fiches` (grep sur noms et communes). Clubs déjà en ligne dans ces départements non recréés : Garonne Agility, Toulouse Véto Agility, Posi'pattes, CECM Montauban, Castelsarrasin, Club Canin Carcassonnais, Club de la Clape, Montredon, Septimanie, Béziers Sport Canin, CECA Agde.

## Tarn-et-Garonne (82) : aucune fiche

- Fun Educ'Agility (Escatalens) : site propre mais une seule page (contact, dernière mise à jour 19/01/2024), ni adresse précise, ni horaires, ni tarifs : impossible d'écrire 300 mots justes. À reprendre si le club publie davantage.
- Cani'Aventure (Verdun-sur-Garonne) : club de traction canine (canicross, cani-VTT) affilié à la FFSLC, pas un club d'éducation ; entraînements en 12 lieux tournants, publiés seulement aux adhérents. Hors périmètre (peut intéresser une catégorie « activités »).
- Déjà en ligne : CECM Montauban, Club cynophile de Castelsarrasin.

## Clubs écartés

- Capitole Agility (Saint-Jean) : le site redirige vers un domaine qui ne répond plus (DNS) ; seules des données fédérales anciennes.
- Club des Chiens Actifs Columérins (Colomiers) : site chiens-actifs-colomiers.fr injoignable, seul un annuaire (dernière mise à jour 2020).
- Cabochards (Castelmaurou), Bauzifon'Chiens (Fonbeauzard), Amis Cynophiles de Verfeil, Les 3C (Cintegabelle), Pat'Agil 31 (Le Castéra) : sites injoignables ou absents, seulement des annuaires ou la liste de la régionale (CREACPG, 2018) ; pas de fiche.
- Club Cynophile du Clapas (Restinclières) : seule la liste des associations de la mairie, pas de page propre lisible.
- Éducation canine Lunel : Yelsy Dog (professionnelle à Aubais, Gard), pas un club associatif ; hors lot.
- Trèbes Sports Canins, Club canin Sallélois, Club canin chaurien (Castelnaudary), Agility Club Névianais (site agility-club-nevianais.com injoignable, mail et téléphone seulement via la presse) : pas de page propre exploitable ; Névianais et Trèbes pourraient être repris plus tard avec leur page Facebook si elle devient lisible.
- Sporting Club Canin de Fabrégues : site non mis à jour depuis 2019.
- Club Canin du Soleil : situé à Marseille (hors départements du lot).
- Doute général : les numéros de portable de bénévoles ou de présidents (Aussonne, Esprit Canin, Mauguio, Cugnaux, Lunel-Viel) n'ont pas été repris ; seul le numéro de la page Facebook du club est gardé pour la Team Agility Cathare.

## À faire avant publication

1. Relire horaires et fermeture du terrain de Lunel-Viel (annonce du 25/11).
2. Attribuer `heroImage`, `photoUsername`, `photoName`, `order` (vérifier qu'aucune photo n'est dupliquée).
3. Ajuster les positions approximatives (Lévignac, Portel, Ferrals) si une adresse précise est publiée.
4. Les fiches Esprit Canin et ABCD citent des prix et horaires datés de la rentrée 2026 ; relire juste avant mise en ligne.

## Résumé

1. 10 fiches de clubs créées : 6 en Haute-Garonne (Blagnac, Balma, Toulouse, Lévignac, Cugnaux, Aussonne), 2 dans l'Hérault (Mauguio, Lunel-Viel), 2 dans l'Aude (Portel-des-Corbières, Ferrals-les-Corbières).
2. Aucune fiche pour le Tarn-et-Garonne : un seul club candidat avec un site propre (Escatalens), trop peu documenté ; les deux autres clubs du 82 sont déjà en ligne.
3. Toutes les fiches reposent sur le site ou la page du club lui-même, complétée par la presse locale pour Lunel-Viel et Ferrals ; une adresse de terrain (Portel) vient d'un répertoire fédéral privé et est signalée.
4. Doutes visibles à vérifier : terrain de Lunel-Viel fermé le 25/11, horaires manquants (Lévignac, Toulouse CTCDP, Portel), positions approximatives (Lévignac, Portel, Ferrals).
5. Vie privée respectée : aucun nom de famille ni portable de bénévole ; les fichiers sont dans `propositions/nouvelles-fiches/clubs-2/`, rien n'est publié.
