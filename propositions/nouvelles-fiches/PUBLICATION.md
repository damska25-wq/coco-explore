# Préparation de la publication des nouvelles fiches (contrôle du 22/11/2026)

Contrôle par script, sans recherche : liens internes, doublons avec le site, encadrés « À vérifier ».

## Résultat
- Aucun lien vers une page inexistante.
- Deux doublons avec des fiches en ligne, mis de côté dans `a-revoir/` :
  - `cote-opale/a-revoir/hebergement-hotel-voco-le-touquet-62.njk` : même hôtel que la fiche en ligne `hebergement-holiday-inn-touquet-62` (même adresse, l'hôtel a changé d'enseigne). À utiliser pour mettre à jour la fiche en ligne (nom voco, supplément 20 €/nuit lu sur ihg.com) plutôt que de publier une 2e fiche.
  - `lacs-ouest/a-revoir/lac-ribou-cholet-49.njk` : même lac que la balade en ligne `balade-lac-ribou-cholet-49` (titres presque identiques). À fusionner dans la balade (règle de baignade de la Ville de Cholet) plutôt que publier.
- Fiches qui renvoient vers d'autres fiches préparées : à publier dans le même lot.
  - haute-corse : Stella Marina et U Ricordu (Macinaggio).
  - lacs-est : Bellefontaine, Mortes, Ilay, Narlay.
  - landes : Résidence du Parc et Hôtel du Parc (Soorts-Hossegor).
  - vosges-jura : Grand Hôtel, Beau Rivage, Hôtel de la Paix, La Jamagne (Gérardmer).
- `order` et `heroImage` : à attribuer au moment de publier chaque lot (numéros uniques, photo Unsplash non utilisée ailleurs).

## Ordre de publication conseillé (dossiers avec le moins de doutes d'abord)

| Dossier | Fiches | Fiches avec encadré « À vérifier » |
|---|---|---|
| gard | 10 | 0 |
| vosges-jura | 10 | 6 |
| dordogne-lot | 10 | 7 |
| aude | 10 | 8 |
| lacs-est | 8 | 7 |
| haute-corse | 10 | 9 |
| pays-basque | 10 | 9 |
| val-de-loire | 10 | 9 |
| vaucluse | 10 | 9 |
| alsace | 10 | 10 |
| annecy-bourget | 10 | 10 |
| bordeaux | 9 | 9 |
| bretagne-sud | 10 | 10 |
| charente-maritime | 10 | 10 |
| corse-du-sud | 10 | 10 |
| cote-opale | 9 | 9 |
| dogwash | 5 | 5 |
| gironde | 9 | 9 |
| herault | 10 | 10 |
| lacs-ouest | 4 | 4 |
| landes | 10 | 10 |
| lille-nord | 10 | 10 |
| lyon | 9 | 9 |
| montagne-hiver | 10 | 10 |
| montagne-hiver-2 | 10 | 10 |
| nantes | 10 | 10 |
| normandie | 10 | 10 |
| outre-mer | 3 | 3 |
| paris | 10 | 10 |
| pyrenees-orientales | 10 | 10 |
| toulouse | 5 | 5 |
| vendee | 10 | 10 |

Avant chaque lot : relire le `RAPPORT.md` du dossier (positions approximatives, tarifs lus en cache), relire les sources à la date du jour.
