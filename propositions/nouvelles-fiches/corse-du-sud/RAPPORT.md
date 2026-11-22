# Rapport : hébergements Corse-du-Sud (2A), lot 1, rédigé le 22/11/2026

10 fiches dans ce dossier (rien dans `src/`, `heroImage: ""`, `order: 0`, `departement: ["2A"]`, YAML validé par js-yaml). Pas de doublon avec les 32 hébergements 2A existants ni avec `propositions/nouvelles-fiches`. Aucun établissement concerné par `CLAUDE.md`, `a-trancher-chantier-amelio.md` ou `decisions-en-attente-2026-11-20.md`.

Remarque de méthode : l'outil de lecture (Parallel `web_fetch`) renvoie parfois une version en cache (champ `acquired_at` entre juin et novembre 2026 selon les pages) ; toutes les pages sont datées « lues le 22/11/2026 » dans les fiches. Les contenus cités (chiens, tarifs, saison) viennent tous de pages officielles de l'établissement ou de sa chaîne.

| Fiche | Commune | Conditions chien (source officielle) | Saison | Sources lues | Position | Doute |
|---|---|---|---|---|---|---|
| Hôtel A'mare Corsica (`hotel-amare-corsica-propriano-2a`) | Propriano | Chiens acceptés partout, 1 chien < 15 kg par chambre (30 kg, races citées, dans 2 suites villas), sur demande par e-mail, 35 €/jour, laisse, jamais seul | 1er juin-30 sept (offices de tourisme, pas le site) | amarecorsica.com (animaux, accueil, contact, chambres, sports) ; lacorsedesorigines.com ; visit-corsica.com | BAN « Quartier Bartaccia », score 0,95 | Saison absente du site de l'hôtel ; adresse du site (Bartaccia) différente de « route de la Corniche » de l'office |
| Hôtel Les Roches Blanches | Porto-Vecchio | 1 animal ≤ 10 kg, chambre Supérieure, sur demande, 10 €/jour, pas en août, pas au petit-déjeuner ni à la piscine | Non publiée | hotel-lesrochesblanches.com (animal, accueil, tarifs, accès) ; FAQ office de tourisme | Coordonnées Waze du site (BAN non fiable, 0,47) | Deux téléphones sur le site (04 95 27 81 55 et 04 95 70 17 00), tous deux gardés ; titre sans supplément (trop long) |
| Hôtel Moderne | Porto-Vecchio | « Politique pet-friendly », 25 €/jour (CGV : 25 €/nuit, « petits animaux », sur demande), jamais seul en chambre | Toute l'année | hotel-moderne.com (accueil, L'hôtel, CGV) ; FAQ office | Coordonnées de la carte du site (BAN 0,55, même point à 10 m) | « animal de compagnie » vs « petits animaux » ; pas de limite de poids |
| Hôtel ibis Styles Porto-Vecchio | Porto-Vecchio | « Animaux acceptés » (services, page Accor de l'hôtel) ; rien d'autre | Non publiée | all.accor.com (B7M0) ; FAQ office | GPS publié par Accor (BAN non fiable) | Supplément, poids, nombre non publiés |
| Hôtel ibis Styles Ajaccio Napoléon | Ajaccio | « Animaux acceptés » (page Accor) | Non publiée | all.accor.com (9930) ; FAQ office | BAN 0,98 | Idem |
| Hôtel ibis budget Ajaccio | Ajaccio | « Animaux admis » / « Animaux acceptés » (page Accor) | Non publiée | all.accor.com (8442) ; FAQ office | GPS publié par Accor (BAN rue seule 0,66, cohérent) | Idem ; l'hôtel cite la plage du Ricanto (interdite aux chiens, voir la fiche existante) |
| Hôtel Résidence Ta Kladia Omigna | Cargèse | CGV : animaux domestiques autorisés sur demande, 15 €/jour/animal ; rien de plus | Non publiée | takladia-omigna.com (accueil, hébergements, région, contact, CGV) | BAN lieu-dit « Route du Pero », score 0,94 (adresse du site : plage du Péro) | Pas de poids ni de nombre ; titre sans supplément (trop long) |
| Camping Kevano Plage | Pianottoli-Caldarello | « Accepté tenu en laisse. Douche canine » ; CGV : 2 max, 35 kg max, cat. 1-2 refusées, coût journalier ; page tarifs : 9,70 €/nuit | 4 avril-2 nov. 2026 ; 30 avril-17 oct. 2027 | campingkevano.com (accueil, tarifs, CGV) | BAN 0,95 | Tarif 9,70 € sur une page « saison 2025 | saison 2026 » (hors titre) ; dates 2027 de la version italienne différentes ; téléphone 06 03 36 57 36 = numéro du groupe, aussi sur La Vetta |
| Camping Acqua e Sole | Conca (Sainte-Lucie-de-Porto-Vecchio) | « Un chien autorisé (hors 1ère et 2ème cat.) », payant, montant non publié (page Homair du camping) | 11 avril-30 sept. 2026 ; 10 avril-26 sept. 2027 | homair.com (page du camping) ; camping-acquaesole.com (contact) ; FAQ office | BAN 0,94 | Deux numéros sur la page contact (04 95 50 15 75 retenu, répété 2 fois ; 04 42 16 89 90 écarté) ; règles sur site non publiées |
| Camping Pertamina Village | Bonifacio | « Animaux autorisés : tenus en laisse avec un carnet de vaccination à jour » (pages emplacements) ; animaux en supplément (page Etap'Camping-car) | D'avril à début novembre | camping-pertamina.com (accueil, emplacements tente/caravane/Etap') ; FAQ office | Centre de la commune de Bonifacio (BAN impossible ; camping à ~5 km au nord) | Conditions des locations et montant du supplément non lus/non publiés |

## Écartés

- Camping Le Sagone (Sagone/Vico) : son site officiel (camping-sagone.fr) ne dit rien des animaux sur les pages lues ; seules des pages tierces (agence du tourisme de la Corse, campings.com, mondiapic) disent « animaux acceptés ».
- Hôtel Mercure Ajaccio Centre : la page Accor lue ne montre pas la liste des services ; seule la fiche visit-corsica.com dit « animaux autorisés : oui ».
- Camping U Stabiacciu (Porto-Vecchio), Camping Sole e Vista (Porto/Ota), Camping Villata, Camping Santa Lucia, Camping Le Damier : pas de page officielle lue disant explicitement les chiens acceptés (Stabiacciu : page d'accueil muette) ; à reprendre dans un prochain lot.
- Camping Porto-Vecchio (groupe San Damiano) : page officielle non lue ; seule une source annuaire (EmmeneTonChien, non officielle) disait les chiens acceptés.
- Hôtel Capo Rosso (Piana) : refuse les animaux (déjà noté sur le site).
- Locations/gîtes de particuliers (Sagone, Pietrosella, Alata, San-Gavino-di-Carbini) : annuaires seuls, ou particuliers (vie privée) ; non retenus.

## Points d'attention pour la publication

- Photos : `heroImage`/`ogImage` vides, à attribuer (aucune photo Unsplash utilisée ici).
- Les fiches Accor (3) n'ont aucun supplément publié : titre sans montant ; ne pas en inventer.
- Hôtel Les Roches Blanches : « pas d'animaux en août » est dit dans le texte, la description et la carte latérale, pas dans le titre.
