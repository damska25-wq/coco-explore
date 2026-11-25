# Caniparcs Lyon (69), 25/11/2026 : 3 fiches préparées (2 aires + 1 fiche regroupée), aucune publiée

Mise à jour 25/11 (décision de l'utilisateur) : les 6 fiches minces « Aire à chiens » (Bazin, Popy, Mairie du 5e, Garde, Montel, Antoine Perrin) sont fusionnées en une seule fiche, `activite-aires-chiens-lyon-69.njk` (une section par parc, règles dites une fois). Les fichiers individuels sont supprimés ; Clos Layat et stade Dargent lient la fiche regroupée.

## Source officielle
- Pas de liste unique publiée par la Ville de Lyon. Sources officielles lues le 25/11/2026 : fiches « équipements » de lyon.fr qui portent la mention « Aire à chiens » (annuaire des parcs, pages reprises par les mairies d'arrondissement), page de la mairie du 8e « Les aires d'ébats canins » (seule à décrire des aires : surfaces, adresses, équipements), page Métropole de Lyon « Mon chien en ville », office de tourisme de Lyon « Lyon avec un chien » (08/09/2026), présentation Métropole sur le chien citadin (27/02/2023).
- Chiffre de la presse (Tribune de Lyon, 28/04/2026, non repris dans les fiches) : 53 aires sur le territoire lyonnais (30 aires de liberté, 23 espaces aménagés restreints). Inventaire exhaustif impossible sans la liste de la Ville (cartes.lyon.fr non lisible par l'outil) : seuls les parcs dont la fiche lyon.fr porte « Aire à chiens » et les 2 aires décrites par la mairie du 8e sont traités.

## Fiches créées (8)
| Fichier | Source principale | Ce que la Ville dit de l'aire |
|---|---|---|
| activite-aire-clos-layat-lyon-69 | mairie8.lyon.fr + lyon.fr (Parc du Clos Layat) | 800 m², espace clos et sécurisé, sans laisse, entrée nord, 260 route de Vienne |
| activite-aire-stade-dargent-lyon-69 | mairie8.lyon.fr | 559 m², agrès en bois, fontaine à eau, assise ombragée, 55 rue Professeur Sisley |
| activite-aires-chiens-lyon-69 (fiche regroupée) | lyon.fr + mairie5/mairie7.lyon.fr, OT Lyon, Métropole | 6 parcs avec « Aire à chiens » : Bazin 3e (25 258 m², 16 av. des Acacias), Popy 4e (10 633 m², 33 rue H. Gorjus), Mairie du 5e (23 630 m², 14 rue Dr E. Locard), Garde 5e (40 561 m², 6 rue de la Garde), Montel 9e (13 798 m², 39 rue du Bourbonnais), Antoine Perrin 8e (8 842 m², 130 rue G. Paradin) |

Les 6 parcs « Aire à chiens » de lyon.fr sont minces côté source (la Ville ne décrit ni clôture, ni équipements, ni règlement) : le doute est dit une fois dans l'encadré, les textes (290-370 mots) reposent sur les faits publiés et les règles de la Métropole. À toi de décider si on les publie telles quelles ou si on les regroupe en une fiche par arrondissement.

## DOUBLON (pas de fiche)
- DOUBLON: parc Chazière (aire à chiens) = src/fiches/caniparc-chaziere-lyon-69.njk
- DOUBLON: parc Blandan (aire canine clôturée, en rénovation) = src/fiches/parc-sergent-blandan-lyon-69.njk
- DOUBLON: parc Chambovet (espaces canins) = src/fiches/parc-chambovet-lyon-69.njk
- DOUBLON: parc de la Tête d'Or, Pelouse des Ébats (2 espaces clos) = src/fiches/parc-tete-or-lyon-69.njk
- DOUBLON: berges du Rhône (4 espaces canins) = src/fiches/berges-rhone-lyon-69.njk
- Hors Lyon, déjà en ligne : caniparcs-villeurbanne-69, parc-canin-venissieux-69 (Parilly côté Vénissieux).

## Non retenus (preuve officielle insuffisante)
- Aire canine de la Visitation (Lyon 5e, ouverte le 20/07/2026, ~3 000 m², clôturée, jeux, bancs, borne-fontaine) : presse seule (Le Progrès 04/10/2026, actu.fr 26/09/2026) ; la fiche lyon.fr du parc de la Visitation (23 rue Roger Radisson) ne mentionne pas l'aire. À créer dès qu'une page de la Ville ou de la mairie du 5e la décrit.
- Parc de la Garde, parc Petit Serin, Hautefeuilles, square Alban Vistel, Jardin des Plantes (cités par l'office de tourisme comme parcs avec « leur propre aire ») : pages lyon.fr introuvables aux adresses testées, sauf la Garde (retenu). Fort Montluc, Gros-Caillou, esplanade Pina-Bausch, square Noël-Aymard, rue de Marseille : presse ou blog seulement.
- Pelouse des Ébats : déjà couverte (Tête d'Or).

## Lignes GEO (positions BAN/Géoplateforme déjà posées dans les fichiers, score noté)
GEO: activite-aires-chiens-lyon-69 | Lyon, centre de la commune (Hôtel de ville, place de la Comédie 69001 Lyon) : 45.7676 / 4.8357, position volontairement au centre car 6 parcs (adresses des parcs dans le texte)
GEO: activite-aire-clos-layat-lyon-69 | 260 route de Vienne 69008 Lyon (0,98)
GEO: activite-aire-stade-dargent-lyon-69 | 55 rue Professeur Sisley 69008 Lyon (0,77, nom de rue « Paul Sisley » ; à contrôler à l'angle du cours Albert Thomas)
Position = entrée/adresse du parc, pas l'emplacement exact de l'aire (non publié, sauf Clos Layat : entrée nord).

## Doutes
- Clôture, équipements, règlement et horaires hors mai-septembre non publiés pour les 6 aires « Aire à chiens » ; formulation elliptique de la Ville pour Clos Layat et Popy (« fermeture estivale 8h-22h / 6h30 en juillet et août »), citée telle quelle.
- La Ville de Lyon n'a pas de page citable pour l'amende des déjections : la fiche reprend le « minimum 68 € » de la page Métropole (une source tierce, Rocca, annonce 135 € forfaitaire : non reprise, à trancher).
- Fiche regroupée : texte de 567 mots, règles dites une fois ; plus de risque de textes proches.
- heroImage "", ogImage "", photo*, order 0 : à attribuer à la publication.
