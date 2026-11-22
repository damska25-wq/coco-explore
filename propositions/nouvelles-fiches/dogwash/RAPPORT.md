# Dogwash, départements sans station (22/11/2026) : 5 fiches, toutes Jardiland (« Lave dog » / Lav'Toutou)

heroImage "" et order 0 à attribuer. GPS : BAN, score ≥ 0,95 sauf Avranches (0,79). Aucune fiche dans `src/`. Sources lues le 22/11/2026.

Source commune : liste des magasins participants Lav'Toutou publiée par Jardiland (PDF daté du 31/07/2026, assets.ctfassets.net/b85ozb2q358o/1VsFeVHISMhMecN15otkei/…/LAV-TOUTOU_Liste_de_magasins_participants_2.pdf) + page de conseils jardiland.com/conseils-idees/service-toilettage-jardiland-comment-ca-marche (« à partir de 9 € », programmes, bac, PMR, nettoyage gratuit) + page de chaque magasin (adresse, téléphone, horaires).

| Fiche | Dép. | Adresse (page magasin) | Preuve du service | Doute |
|---|---|---|---|---|
| dogwash-jardiland-cherbourg-en-cotentin-50 | 50 | Rue des Marettes, 50470 Cherbourg-en-Cotentin (La Glacerie), 02 33 88 50 10 | page magasin : tuile « Lave dog » + PDF | adresse sans numéro ; tarif/paiement non publiés ; page magasin en cache du 11/10/2026 |
| dogwash-jardiland-soissons-02 | 02 | Allée des Platanes, zone de Chevreux, 02200 Soissons, 03 23 75 37 50 | PDF (« 2200 SOISSONS ») | page magasin sans tuile « Lave dog » dans sa sélection de services |
| dogwash-jardiland-charmeil-03 | 03 | Route de Saint-Pourçain, 03110 Charmeil (Vichy), 04 70 58 89 80 | PDF (« 3110 CHARMEIL - VICHY ») | idem ; adresse sans numéro |
| dogwash-jardiland-saint-maur-36 | 36 | 5 rue des Terres Noires, Zac Cap Sud, 36250 Saint-Maur (Châteauroux), 02 54 61 10 00 | PDF (« 36250 CHATEAUROUX - St Maur ») | idem |
| dogwash-jardiland-avranches-50 | 50 | Parc de la Baie, 50300 Avranches, 02 33 79 43 43 | PDF (« 50300 AVRANCHES ») | idem ; page magasin en cache plus ancienne ; adresse sans rue : BAN rend « Parc d'Activité de la Baie » au niveau de la rue (score 0,79), position approximative |

Points communs à relire avant publication (déjà dits dans l'encadré « À vérifier » des fiches) : prix de chaque magasin, mode de paiement, taille du bac et emplacement de la machine non publiés (seul « à partir de 9 € » est publié par l'enseigne, « dans certains magasins »). Horaires = horaires du magasin (Jardiland écrit que le service est disponible pendant les heures d'ouverture). Les 4 magasins sans tuile « Lave dog » : si l'utilisateur veut une preuve plus nette, appeler les magasins avant publication.

Liens internes (fiches existantes) : Soissons (berges de l'Aisne, parc de l'Arbre à l'oiseau), Charmeil (lac d'Allier, parc des Sources de Vichy), Saint-Maur (forêt de Châteauroux, prairie Saint-Gildas), Avranches (Jardin des Plantes), Cherbourg (plage de Collignon, chiens interdits 1er juillet-31 août).

## Écartés
- **Départements 05, 15, 32, 46, 52, 58, 61 : aucune station trouvée avec preuve officielle** (ni liste Jardiland/Tom&Co, ni page fabricant ou réseau). Jardiland Avignon (84, Montfavet) : page magasin lue, pas de tuile « Lave dog » et absent du PDF Lav'Toutou : écarté. Tom&Co : liste des magasins avec Dog Wash lue, aucun magasin dans les départements demandés. Animalis Avignon (Le Pontet) : aucune mention de borne trouvée.
- Bulles Dog Wash, Brasles (02, parking Gitem, 51 avenue de Château-Thierry) : seulement article de L'Union (27/04/2026) et fiche Google ; pas de site ni page officielle lue : preuve insuffisante.
- Dou & Tou'Net, Navenne (70, 1 rue du Général Leclerc, site Bocquillion) : article L'Est Républicain (2022) et fiche Google seuls ; aucune page officielle ; état actuel incertain.
- France Pare-Brise, Fains-Véel (55) : article L'Est Républicain (2022) seul.
- Lav'eau Dog, Coutances (50, ZA de la Mare) : presse (La Manche Libre) et Google seuls, pas de site lu.
- Cani-Cleaner, Saint-Pair-sur-Mer (50, 1128 route nationale) : presse (actu.fr) et page Facebook seulement.
- Canidouche, Cherbourg (50, 296 boulevard de l'Atlantique) : annuaires seuls et avis très négatifs (machine souvent hors service).
- O Poils, Tavaux (39, route nationale près du Super U) : cité uniquement par une liste du fabricant Dogwash France d'octobre 2017 ; aucun site ni confirmation actuelle trouvés ; ancienne, donc écarté.
- Jardiland Montluçon-Domérat (03), Coutances (50), Granville (50), Le Poinçonnet (36), Luxeuil-Froideconche (70) : magasins Jardiland des départements visés mais absents du PDF Lav'Toutou et sans tuile « Lave dog » lue : écartés.
- Animalerie Procanis (Pulnoy), Toutoumatique (Fontenay-le-Comte), Lucky Wash, etc. : hors départements demandés.
- Aucun doublon : `grep` sur src/fiches, propositions/nouvelles-fiches, CLAUDE.md, a-trancher-chantier-amelio.md et decisions-en-attente-2026-11-20.md ne remonte aucune fiche Jardiland dans ces cinq communes.
