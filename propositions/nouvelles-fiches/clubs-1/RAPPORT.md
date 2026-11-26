# Clubs canins lot 1 (Rhône, Ain, Isère, Loire), préparé le 26/11/2026

Aucune fiche publiée : tout reste dans ce dossier. `order: 0`, `heroImage`, `ogImage`, `photoUsername`, `photoName` vides (à attribuer). Géocodage Géoplateforme, sauf CCDP (coordonnées du lien Google Maps du club) et Péronnas (coordonnées de la liste SCC, score de la Géoplateforme trop bas).

## Fiches créées (10)
| Fichier | Commune | Sources lues le 26/11/2026 | Points à vérifier |
|---|---|---|---|
| activite-ccdp-saint-laurent-de-mure-69 | Saint-Laurent-de-Mure (69) | ccdplyon.org | jour des séances non précisé sur la page des horaires ; adresse « Départementale 306 » sans numéro |
| activite-cabot-gleize-69 | Gleizé (69) | clubcabot.com | 9h30 (accueil) contre 10h (coordonnées) ; portable du président non repris, mail seul |
| activite-4-pattes-club-arnas-69 | Arnas (69) | clubcanineducarnas.com, spa-lyon.org/partenaires (adresse) | site très succinct : pas d'horaires ni de tarif ; portable de la présidente non repris |
| activite-club-du-chien-bourg-en-bresse-01 | Bourg-en-Bresse (01) | clubduchienbourg.fr, annuaire beaucerons.des.alpes.free.fr (adresse) | adresse « chemin de Curtafay » seulement par annuaire (position cohérente avec la liste SCC) ; pas de tarif |
| activite-cgec-thoiry-01 | Thoiry (01) | clubcaningessien.fr, centrale-canine.fr | deux adresses sur le site (Thoiry, rue des Combes / Prévessin-Moëns, route du Maroc) ; position = coordonnées SCC Thoiry |
| activite-sport-loisir-canain-peronnas-01 | Péronnas (01) | slca01960.wixsite.com/slca (cours, inscriptions), centrale-canine.fr | adresse du terrain seulement par la SCC ; tarifs 2026 |
| activite-case-sainte-euphemie-01 | Sainte-Euphémie (01) | caseagility.com (accueil, horaires, situer, éducation, disciplines) | tarif et âge minimum non lus ; dates de fermeture d'été (28/06-05/09, année probablement 2026) |
| activite-cesc-berjallien-bourgoin-jallieu-38 | Bourgoin-Jallieu (38) | cescberjallien.free.fr | site ancien, pas de tarif ; position à ~550 m des coordonnées GPS du club (géocodage de l'adresse gardé) |
| activite-club-canin-forezien-saint-just-saint-rambert-42 | Saint-Just-Saint-Rambert (42) | sgccf.free.fr, stjust-strambert.fr, annuaire-entreprises | page d'accueil datée de 2022 : horaires d'accueil à confirmer |
| activite-club-canin-ondaine-chambon-feugerolles-42 | Le Chambon-Feugerolles (42) | clubcaninondaine42.wixsite.com, centrale-canine.fr | site peu détaillé, articles de 2017 ; l'adresse publiée n'est pas dit être le terrain |

Aucun doublon dans `src/fiches` ni `propositions/nouvelles-fiches` (grep sur noms et communes). Liens internes vers des fiches existantes vérifiés (permalinkPath relu). Front matter validé avec js-yaml, 353 à 490 mots par fiche, titres de 40 à 64 caractères.

## Clubs écartés
- Club canin des Dombes (Messimy-sur-Saône, 01) : site Wix sans horaires ni tarifs lisibles (page vide) ; les avis Google récents signalent des méthodes coercitives (collier étrangleur), pas de fiche.
- Club d'éducation canine de Vienne (38) et Club d'éducation canine de Mably-Roanne (42) : seulement une page de l'office des sports / de l'annuaire communal, pas de page propre du club.
- Club du chien de travail de Villefranche (Ville-sur-Jarnioux, 69) : site cctvillefranche.fr injoignable le 26/11.
- Simandres (69) : ancien site wifeo qui renvoie vers club-canin-simandres.com, injoignable le 26/11.
- Club du chien d'accompagnement de Rillieux, Amis du chien de Sourcieux-les-Mines, Dagneux, Oyonnax, Revermont, CCEL de Cuisiat, Club des Amis du Chien du Forez (Montrond) : aucune page propre exploitable lue (annuaire, mairie ou Facebook seul).
- Club canin d'agility du Gier (Saint-Joseph, 42) : déjà en ligne.
- Éducateurs individuels (Grenoble, Froges, etc.) : hors périmètre (pas des clubs associatifs).

## Résumé
1. 10 fiches de clubs préparées dans `propositions/nouvelles-fiches/clubs-1/` : 2 dans le Rhône, 5 dans l'Ain, 1 en Isère, 2 dans la Loire.
2. Lyon et sa métropole sont faibles : seul le CCDP Lyon (Saint-Laurent-de-Mure) a un site exploitable ; Simandres, Villefranche (CCT) et Rillieux n'avaient pas de source lisible ce jour.
3. Isère : un seul club avec site propre lisible (Bourgoin-Jallieu) ; Grenoble n'a que des éducateurs individuels dans les résultats.
4. Vie privée : aucun portable de président ou de présidente repris (mail ou site du club seulement) ; CCDP, CCBB et CESC Berjallien gardent le fixe du club.
5. Doutes les plus nets : CGEC (deux adresses), Club Canin Forézien (site de 2022) et Club Canin Ondaine (site peu daté) à confirmer avant publication.
