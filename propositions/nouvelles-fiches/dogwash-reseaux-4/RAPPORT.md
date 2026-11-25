# Dogwash réseaux, lot 4 (25/11/2026)

11 fiches créées sur 11 stations. Aucune publiée. Pages lues le 25/11/2026 via l'outil de recherche. heroImage vide, order 0. Scripts : scratchpad `dw4-gen.py` (génération), `dw4-check.js` (js-yaml, titres, descriptions, liens internes : tout passe).

| Fiche | Commune réelle | Service sur la page magasin ? | Position |
|---|---|---|---|
| dogwash-jardiland-guipavas-29 | Guipavas | Oui, « Lave dog » (page en cache de l'été 2025) | Google Maps |
| dogwash-jardiland-carquefou-44 | Carquefou | Oui, « Lave dog » + actualité « Lav'toutou » (cache été 2025) | CENTRE de la commune (coordonnées magasin non retrouvées) |
| dogwash-jardiland-bassussarry-64 | Bassussarry | Oui, « Lave dog » (+ dogwash.fr cite Route de Cambo) | Google Maps |
| dogwash-jardiland-frejus-83 | Fréjus (Fréjus Centre, 59 av. de Provence) | Oui, « Lave dog » | Google Maps |
| dogwash-truffaut-chambray-les-tours-37 | Chambray-lès-Tours | Oui, « Lave Dog » dans les services de la page magasin + page service Truffaut | Google Maps |
| dogwash-lavotoutou-plouharnel-56 | Plouharnel | Site de l'établissement (indépendant) | Google Maps |
| dogwash-jardiland-la-meziere-35 (liste : « Rennes Cap Malo ») | La Mézière | Non, liste Lav'Toutou seule (page 2025 : toilettage RDV, pas de Lave dog) | Google Maps |
| dogwash-jardiland-essey-les-nancy-54 (liste : « Nancy ») | Essey-lès-Nancy | Non, liste seule | Google Maps |
| dogwash-jardiland-la-sentinelle-59 (liste : « Valenciennes - La Sentinelle ») | La Sentinelle | Non, liste seule (annuaires cylex/118000 citent « Dogwash », non retenus comme source) | Google Maps |
| dogwash-jardiland-flins-sur-seine-78 | Flins-sur-Seine | Non, liste seule (page : toilettage chien RDV) | Google Maps |
| dogwash-jardiland-gometz-le-chatel-91 | Gometz-le-Châtel | Non, liste seule | Google Maps / ScrapeHero |

Pour les 5 fiches « liste seule », l'encadré « À vérifier… » dit une fois que le service figure sur la liste officielle et conseille d'appeler le magasin.

## Écartés
Aucun : aucun doublon (grep sur communes et enseignes dans src/fiches et propositions/nouvelles-fiches). Voisins existants liés dans les textes : Zoomalia Guipavas, Wash.ME Villers-lès-Nancy, Caniwash Joué-lès-Tours, Planet'Animal Auray.

## BAN (API inaccessible depuis l'environnement : requête vide)
BAN-A-FAIRE: dogwash-jardiland-guipavas-29.njk | Rue Pierre Jakez Helias, 29490 Guipavas
BAN-A-FAIRE: dogwash-jardiland-carquefou-44.njk | Route de Paris, Impasse des Alizées, 44470 Carquefou (position actuelle = centre de Carquefou, À CORRIGER)
BAN-A-FAIRE: dogwash-jardiland-la-meziere-35.njk | Avenue du Phare du Grand Jardin, 35520 La Mézière
BAN-A-FAIRE: dogwash-jardiland-essey-les-nancy-54.njk | 24 Rue des Tarbes, 54270 Essey-lès-Nancy
BAN-A-FAIRE: dogwash-jardiland-la-sentinelle-59.njk | Rue des Vignes, 59174 La Sentinelle
BAN-A-FAIRE: dogwash-jardiland-bassussarry-64.njk | Route de Cambo, 64200 Bassussarry
BAN-A-FAIRE: dogwash-jardiland-flins-sur-seine-78.njk | Route départementale 14, Zac Les Mériels, 78410 Flins-sur-Seine (la page Jardiland donne seulement « D14 »)
BAN-A-FAIRE: dogwash-jardiland-frejus-83.njk | 59 Avenue de Provence, 83600 Fréjus
BAN-A-FAIRE: dogwash-jardiland-gometz-le-chatel-91.njk | 1 Rue du Fromenteau, 91940 Gometz-le-Châtel
BAN-A-FAIRE: dogwash-truffaut-chambray-les-tours-37.njk | 213 Avenue du Grand Sud, 37170 Chambray-lès-Tours
BAN-A-FAIRE: dogwash-lavotoutou-plouharnel-56.njk | 6 Rue du Tramway, 56340 Plouharnel

## Doutes
- Pages Jardiland de Guipavas et Carquefou lues en version cache de l'été 2025 : horaires et service à reconfirmer par appel avant publication.
- Carquefou : aucune coordonnée du magasin trouvée, position provisoire au centre de la commune (à recaler par BAN).
- Fréjus : Jardiland a deux magasins ; seul « Fréjus Centre » (59 av. de Provence) figure sur la liste Lav'Toutou et affiche le Lave dog. L'autre (1586 av. Jean Lachenaud) a, d'après des avis clients sur sa page (08/11/2026), des soldes avant fermeture définitive : non repris dans la fiche, à vérifier si on veut le mentionner.
- Truffaut Chambray : horaires du magasin non lus (page service : Lave-Dog 9h30-19h30 tous les jours ; annuaires : 9h30-19h lun-sam, 9h30-18h dim). Divergence dite dans la fiche. Tarifs Truffaut non publiés.
- Lavo'Toutou : téléphone 06 76 74 07 12 publié par l'établissement (Google, Facebook) mais c'est un portable ; gardé selon la règle « numéro publié par l'établissement ». Le nom de la gérante (cité par la presse) n'est pas repris. Tarifs 13 € et 20 € lus sur lavotoutou.fr.
- Jardiland : « à partir de 9 € » (page conseils du réseau, modifiée le 31/07/2026), aucun prix par magasin.
- Les liens internes existent tous dans src/fiches (vérifié par script).
- Relire horaires juste avant publication (Noël).
