# Caniparcs Toulouse (31), 26/11/2026 : 5 fiches préparées, aucune publiée

## Source officielle
- Jeu de données ouvert « Caniparcs - Toulouse » (Toulouse Métropole / Mairie de Toulouse, Licence Ouverte 2.0, mis à jour le 01/11/2026), https://data.toulouse-metropole.fr/explore/dataset/caniparcs , lu via l'API le 26/11/2026 : **50 enregistrements** (nom, adresse, date de création, type, « distributeur » oui/non, quartier, tracé). Pas de surface ni d'équipements par site.
- Règlement intérieur des caniparcs (PDF du 18/12/2025) et actualité « Les caniparcs réglementés », lus le 26/11/2026.

## Fiches créées (5, plus grands espaces non encore couverts)
| Fichier | Donnée officielle |
|---|---|
| activite-caniparc-bourrassol-toulouse-31 | Parc de Bourrassol, impasse Pouvillon, créé 18/12/2025, distributeur non |
| activite-caniparc-jardin-en-mouvement-toulouse-31 | Jardin en Mouvement, impasse de la Charbonnière, créé 18/12/2025, distributeur oui |
| activite-caniparc-passage-cazals-lapujade-toulouse-31 | Passage Cazals Lapujade, allée Ginette Forgues, 2018, distributeur oui |
| activite-caniparcs-bois-limayrac-toulouse-31 | Bois de Limayrac, allée de Limayrac, 2 espaces (id 20 et 59), 2006 |
| activite-caniparc-jardin-seminaire-toulouse-31 | Jardin du Séminaire, impasse du Séminaire, 2013, distributeur oui |

## DOUBLONS (pas de fiche)
- DOUBLON: Jardin de la Prairie des Filtres, Jardin Compans, Parc de la Maourine (3 espaces) = src/fiches/activite-caniparcs-toulouse.njk (fiche regroupée) ; Compans et Maourine ont aussi une fiche balade.
- Les 40 autres espaces du jeu de données (Pays d'Oc, Embarthe, Hauts de Bonnefoy, Soleil d'Or, Ponts Jumeaux, Boisseraie, Fontaine Lestang, Saint-Exupéry, Larousse, etc.) : pas de fiche (limite de 5 ; fiches possibles plus tard).

## Lignes GEO
GEO: activite-caniparc-bourrassol-toulouse-31 | Impasse Pouvillon 31000 Toulouse (polygone 43.6024 / 1.41732, mis en lat/lng)
GEO: activite-caniparc-jardin-en-mouvement-toulouse-31 | Impasse de la Charbonnière 31000 Toulouse (polygone 43.5774 / 1.44606)
GEO: activite-caniparc-passage-cazals-lapujade-toulouse-31 | Allée Ginette Forgues 31200 Toulouse (polygone 43.63016 / 1.46669)
GEO: activite-caniparcs-bois-limayrac-toulouse-31 | Allée de Limayrac 31500 Toulouse (polygones 43.58828 / 1.48578 et 43.58841 / 1.48637)
GEO: activite-caniparc-jardin-seminaire-toulouse-31 | Impasse du Séminaire 31200 Toulouse (polygone 43.64212 / 1.43359)
(lat/lng déjà posés au centre du tracé officiel ; codes postaux de l'adresse non publiés, à contrôler par le géocodage.)

## Doutes
- « Surface » : le jeu de données n'en publie pas ; les fiches disent « emprise tracée d'environ N m² », calculée par mes soins à partir du polygone (Bourrassol ~919, Jardin en Mouvement ~897, Cazals ~734, Limayrac ~607 et ~556, Séminaire ~381). Plusieurs dépassent les « 45 à 800 m² » annoncés par la Métropole : le polygone inclut peut-être des abords. À retirer si on préfère ne rien chiffrer.
- Le champ « distributeur » (oui/non) n'est pas défini ; la fiche ne l'interprète pas.
- Aucun horaire propre au site : règle du règlement (mêmes horaires que le parc ou jardin).
- Quartiers : numéros seulement au jeu de données, aucun nom de quartier affiché.
