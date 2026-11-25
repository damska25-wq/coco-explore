# Caniparcs Bordeaux (33), 25/11/2026 : 5 fiches préparées, aucune publiée

## Source officielle
- Magazine de la Ville de Bordeaux « Les chiens dans la vie urbaine : comment harmoniser notre cohabitation ? » (mis à jour le 25/09/2026), lu le 25/11/2026 : **19 caniparcs** « dans l'ensemble des quartiers », 11 881 m² au total ; chiens sans laisse « uniquement dans les allées aux chiens et les caniparcs » ; amende forfaitaire de 35 € pour les déjections. Carte officielle : plan.bordeaux.fr (non lisible par l'outil).
- Jeu de données ouvert « Espaces canins dans les espaces verts de Bordeaux » (Bordeaux Métropole / Ville, mis à jour le 05/11/2026, API datahub, 31 polygones) : lu via l'API. Il donne le nom du jardin et la géométrie, mais pas d'adresse, de surface ni de type (caniparc ou allée) par zone ; les polygones pointent vers : Jardin des Dames de la Foi, Parc du Grand Parc, Parc Bordelais, Jardin du Moulin d'Ars, Esplanade Charles de Gaulle, Jardin de la Béchade, Jardin de ta sœur (5 zones), Parc Chantegrillon (2), Square Hypoustéguy (3), Jardin Saint-Julien (2), Jardin André Meunier, Jardin Public, place des Martyrs de la Résistance, Salle des fêtes du Grand Parc, Jardin des Barrières, place Buscaillet, Jardin de la Visitation, Jardin de la Faïencerie, Parc de l'arrière-base, Square Émile Combes-Jean Gautier, Parc Rivière, Square du Petit Cardinal, Jardin de Lussy.
- Fiches « parcs et jardins » de bordeaux.fr (lues le 25/11/2026) : seules celles qui citent un équipement canin ont été retenues.

## Fiches créées (5)
| Fichier | Ce que dit la Ville |
|---|---|
| activite-caniparc-jardin-ta-soeur-bordeaux-33 | fiche du jardin : « Cani parc avec une fontaine à boire et un parcours adapté » + « une allée des chiens avec des plantations d'arbres » ; 74 rue Dupaty ; horaires saisonniers |
| activite-caniparc-parc-riviere-bordeaux-33 | magazine : atelier d'éducation canine du 28/09/2026 « à l'entrée du caniparc » du parc Rivière ; zone canine dans le jeu de données ; la fiche du parc ne cite aucun équipement canin |
| activite-allee-chiens-dames-de-la-foi-bordeaux-33 | « Allée pour les chiens » ; seuls les chiens non classés admis (catégorie 2 non mentionnée) |
| activite-allee-chiens-jardin-barrieres-bordeaux-33 | « Allée pour les chiens accessible PMR » ; 99 boulevard Albert 1er |
| activite-allee-chiens-jardin-faiencerie-bordeaux-33 | « Allée pour chiens » ; 64 rue de la Faïencerie |

## DOUBLON (pas de fiche)
- DOUBLON: Parc Bordelais (« Allée pour chiens ») = src/fiches/parc-bordelais-bordeaux.njk
- DOUBLON: Jardin Public (« Allée pour chiens ») = src/fiches/parc-jardin-public-bordeaux.njk
- DOUBLON: caniparc de la Base sous-marine = src/fiches/caniparc-bassins-a-flot-bordeaux.njk

## À corriger dans les fiches déjà en ligne (contradictions avec la source officielle du 25/11)
- parc-jardin-public-bordeaux et parc-bordelais-bordeaux disent que l'« allée pour chiens » se fait en laisse (« pas d'enclos de liberté ») ; le magazine de la Ville du 25/09/2026 dit que les chiens peuvent se défouler sans laisse dans les allées pour chiens et les caniparcs. À reformuler en phase 2.
- parc-riviere-bordeaux dit « aucun espace canin clôturé n'est indiqué par la Ville » ; le magazine cite un caniparc au parc Rivière. À corriger, et lui ajouter le lien vers la nouvelle fiche.
- parc-riviere-bordeaux : lat/lng 44.8459 / -0.5872 alors que 174 rue Mandron = 44.856 / -0.585 (Géoplateforme) et que le polygone canin est à 44.8544 / -0.5870 ; position du parc probablement décalée d'environ 1 km. Parc Bordelais et Jardin Public : écarts de 600 m à 300 m avec le jeu de données (à recaler).

## Non retenus (pas de page officielle décrivant un équipement canin)
Parc de Lussy (zone canine dans le jeu de données ; Google Maps parle d'un « parc à chiens grillagé » mais source non officielle ; la fiche bordeaux.fr n'a pas été trouvée), jardin de la Visitation, parc Chantegrillon, square Hypoustéguy, jardin Saint-Julien, jardin André Meunier, jardin de la Béchade (page officielle lue, aucun équipement canin cité), Esplanade Charles de Gaulle (page lue, rien sur les chiens), Grand Parc, arrière-base, Moulin d'Ars, etc. : zones canines au jeu de données seulement, 14 des 19 caniparcs restent donc à documenter (pages bordeaux.fr introuvables aux slugs testés).

## Lignes GEO (positions posées d'après le jeu de données ouvert quand une zone existe, sinon Géoplateforme)
GEO: activite-caniparc-jardin-ta-soeur-bordeaux-33 | 74 rue Dupaty 33000 Bordeaux (Géoplateforme 0,74 : rue seule, 44.8591 / -0.5626 ; polygone canin 44.8592 / -0.5602, retenu)
GEO: activite-caniparc-parc-riviere-bordeaux-33 | 174 rue Mandron 33300 Bordeaux (Géoplateforme 0,84 : 44.8561 / -0.5850 ; polygone canin 44.8544 / -0.5870, retenu)
GEO: activite-allee-chiens-dames-de-la-foi-bordeaux-33 | rue de Ségur / rue Saint-Genès 33000 Bordeaux (polygone 44.8247 / -0.5822, cohérent avec la rue de Ségur)
GEO: activite-allee-chiens-jardin-barrieres-bordeaux-33 | 99 boulevard Albert 1er 33800 Bordeaux (0,81 ; code postal du géocodage 33800, fiche officielle 33000 : à contrôler)
GEO: activite-allee-chiens-jardin-faiencerie-bordeaux-33 | 64 rue de la Faïencerie 33300 Bordeaux (0,82 : rue seule ; polygone canin 44.8617 / -0.5574, retenu)

## Doutes
- Un polygone du jeu de données peut couvrir tout le jardin et pas seulement l'allée ou le caniparc : positions « du jardin » à ±150 m.
- Aucune surface ni clôture publiée par zone ; le magazine dit seulement que les chiens y sont sans laisse. Doute dit une fois dans l'encadré de chaque fiche.
- Dames de la Foi : la fiche de la Ville n'admet que les chiens non classés ; Barrières, Rivière : non classés en laisse et catégorie 2 en laisse et muselés.
- Jardin des Barrières : le géocodage donne le code postal 33800 pour le numéro 99, la Ville écrit 33000 ; adresse reprise telle que publiée par la Ville.
- heroImage "", ogImage "", photo*, order 0 : à attribuer à la publication.
