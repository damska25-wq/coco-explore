# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 101 départements couverts (96 métropolitains + 5 DOM, couverture nationale complète), ~9300 fiches.

## Historique — campagnes SIRENE + enrichissement hébergements/plages-balades (octobre 2026, résolues)

Deux chantiers nationaux, menés l'un après l'autre comme prévu (pas en parallèle) :

- **Campagne SIRENE** (vérification factuelle adresse/téléphone/statut des fiches vétérinaires) : terminée sur les 101 départements (dernier round, Mayotte 976, le 17/10/2026).
- **Enrichissement hébergements + plages/balades** (idée issue d'un brainstorm Gemini, démarrée juste après la fin de SIRENE le 17/10/2026, terminée le 22/10/2026) : traité en méthode batch par département (recherche par lots puis rédaction), couvrant la quasi-totalité des départements (01 à 59 + toute la Normandie en premier) ; le reste (60 à 95, 2A/2B, DOM) s'est avéré déjà enrichi avec les mêmes critères lors d'un round antérieur (constat fait fiche par fiche, pas de simple supposition).
  - **Fiches hébergements** : conditions d'accueil précises quand elles existaient chez la source — supplément tarifaire par nuit/par animal, restrictions de taille/catégorie/nombre de chiens, chien seul en chambre ou non, "pet amenities" (toutoubar/gamelle d'eau, espace de rinçage retour de plage, friandises d'accueil, jardin clos).
  - **Fiches plages/balades** : réglementation saisonnière quand elle existait (arrêté municipal : dates/horaires, laisse obligatoire ou non) et données de terrain utiles au chien (type de sol, ombre, points d'eau/rivières, difficulté du parcours, présence de troupeaux/patous en montagne).

Si une lacune resurgit sur ces deux critères (ex. nouvelle fiche créée sans ces infos, ou département oublié), la retraiter à l'identique (recherche par lot → rédaction → build → commit), pas besoin de relancer tout le chantier.

## Historique — campagne SIRENE toiletteurs (octobre 2026, résolue)

Après les campagnes garde de chien/dogwash (chantier J, menées par une autre session), vérification factuelle de la catégorie **toiletteurs** sur les 100 départements qui en comptent (1189 fiches) selon la même méthode SIRENE que pour les vétérinaires : recherche directe sur le site officiel, la page Facebook ou le compte Instagram de chaque salon (via le connecteur Parallel Search, qui contourne le blocage réseau de l'environnement), plutôt que de se limiter aux extraits WebSearch ou aux annuaires tiers. Traité en 20 lots de ~5 départements, par agents en parallèle, avec build + `check-site.mjs` avant chaque commit et consolidation régulière (push ~toutes les 4-5 lots).

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, horaires, sites officiels ajoutés) ou confirmées inchangées. Quelques renommages d'enseigne appliqués uniquement quand une source datée confirmait la reprise (ex. Atout Poils → Crea'Dogs à Roquebrune-Cap-Martin, Styl' Canin → Au Bonheur Canin à Audincourt, Esprit Canin → La Truffe Poudrée à Albertville) ; ancien nom toujours conservé en mention "(ex-...)".

**Fermetures quasi-certaines (résolu, 24/10/2026)** : 4 fiches supprimées sur décision de l'utilisateur — **Peluche** (Cayenne, 973 — liquidation judiciaire depuis le 7/05/2026, Bodacc), **À poils et à pattes** (Orléans, 45 — fermeture définitive annoncée pour novembre 2026, le salon cherchait un repreneur), **Idefix Toilettage** (Orléans, 45 — SIREN radié le 23/09/2024), **Pil Poil** (Saint-Claude, 39 — entité radiée du registre depuis 2016). Redirection 301 ajoutée pour chacune vers la page département de la catégorie toiletteurs (`src/_redirects.njk`).

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — anomalies signalées dans le `bodyHtml` mais moins tranchées qu'une fermeture confirmée (contradiction de source, ou remplacement par un autre établissement sans preuve de reprise) :
- **Hair Dog Toilettage** (Chamalières, 63) : SIRENE indique fermé/radié (2023), mais des annuaires tiers le listent encore actif — contradiction non tranchée.
- **Atelier Canin** (Strasbourg, 67) : un autre salon ("Pood'els") occupe l'adresse depuis plus de 3 ans.
- **Au Bonheur du Chien** (Fontainebleau, 77) : un autre salon occupe l'adresse sans lien de reprise confirmé.
- **Patt Club Toilettage** (Pontoise, 95) : remplacé apparemment par "Le Salon de Martine" à la même adresse, sans preuve datée de reprise.
- **Cani Salon** (Delle, 90) : l'adresse réelle du salon est en fait dans le Doubs (25), pas dans le Territoire de Belfort — fiche laissée dans son département actuel, classement géographique à revoir si besoin.

**Catégorisation à vérifier (pas des toiletteurs, ou mixte)** :
- **Michette** (Paris 10e) et **Le SPA Petsochic** (Paris 6e) : toilettage réservé aux chats / n'acceptent pas certains chiens — signalé dans la fiche pour un lecteur qui voyage avec un chien.
- **M2JF Confiez-Nous Marie** (Sainte-Maure-de-Touraine, 37) et **Au'tour du chien** (Bernay, 27) : probables confusions avec une agence de services à la personne / une éducatrice canine plutôt qu'un vrai toiletteur.

Si une nouvelle fiche toiletteur est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE hébergements (octobre 2026, résolue)

Même méthode que toiletteurs/vétérinaires, appliquée aux **2173 fiches hébergements** sur les 101 départements (y compris Mayotte). Traité en 26 lots (3-4 départements chacun, un peu plus gros que les lots toiletteurs car la catégorie est plus dense), par agents en parallèle, avec build + `check-site.mjs` avant chaque commit et consolidation régulière. Consigne spécifique à cette catégorie : ne pas retoucher les conditions d'accueil chien déjà enrichies (supplément/jour, restrictions catégorie/taille, pet amenities) sauf contradiction avérée avec le site officiel lui-même.

**Incident technique en cours de route** : deux lots (dépts 88-91 et 92-95) ont été interrompus par une panne transitoire du classificateur de sécurité côté serveur (pas un problème de contenu). Le travail déjà fait a été récupéré et commité, puis les deux lots ont été rejoués en entier pour garantir une couverture complète (le re-passage sur une fiche déjà corrigée ne fait que la confirmer, sans la retoucher).

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, sites officiels ajoutés, contradictions de tarif/accueil résolues via la source officielle) ou confirmées inchangées. Plusieurs renommages d'enseigne appliqués avec preuve datée, ancien nom conservé en "(ex-...)" — notamment Château de Gilly → Les Sources de Vougeot (21), Hôtel Le Forum → Alfred Hotels Monaco (Beausoleil, 06), Hôtel Jules Verne quittant Best Western (Biarritz, 64), Hôtel Le Cervolan → Hôtel Miura (73), Hôtel Salvator → Best Western Mulhouse Salvator Centre (68), Hôtel du Choiseul → Relais d'Amboise (37), Hôtel Kyriad Bourgoin-Jallieu → Best Western (38), Hôtel Auréna → B&B Hôtel Aurillac-Le Lioran (15), Hôtel Brit Belfort Bessoncourt → Kyriad ECO Belfort Bessoncourt (90), Camping La Perroche Plage → Camping Les Flots-Atlantique (17), Le Manoir du Sphinx → Les Bassans (Perros-Guirec, 22). Aussi retrouvé et corrigé au passage une variante du bug "confiance X" en champ public ("Confiance élevée", non couverte par le grep du chantier de nettoyage de novembre) sur quelques fiches.

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — signaux de fermeture ou contradictions fortes signalés dans le `bodyHtml` :
- **Hôtel Beau Rivage / restaurant La Rosita** (Nogent-sur-Seine, 10) : société exploitante en liquidation judiciaire depuis le 28/10/2025, site officiel pourtant toujours en ligne.
- **Le Relais de Montignac** (24) : le site officiel lui-même annonce ne pas réouvrir cette saison.
- **Hôtel-Restaurant du Causse** (Saint-Cirq-Lapopie, 46) : avis client (2024) affirmant une fermeture définitive, aucune présence en ligne active trouvée pour confirmer ou infirmer.
- **Hôtel Terminus** (Laroche-Migennes, 89) : société historique radiée le 03/11/2021, mais l'hôtel reste commercialisé activement (réservations jusqu'en 2027) — probable reprise non confirmée.
- **Camping Le Cosson** (La Ferté-Saint-Aubin, 45) : SIREN radié fin 2023, et l'office de tourisme ne présente plus l'adresse que comme une aire de services camping-car.
- **Adonis Paris Sud** (Chevilly-Larue, 94) : société exploitante en redressement judiciaire, mais site officiel actif avec réservations en ligne.
- **Camping Montaigu Plage** (82) : renommé "Base de Loisirs du Plan d'eau des Chênes" par l'office de tourisme en 2026, conditions à reconfirmer après la publication des nouvelles modalités de gestion.

Si une nouvelle fiche hébergement est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE restaurants (octobre 2026, résolue)

Même méthode que toiletteurs/hébergements/vétérinaires, appliquée aux **~1453 fiches restaurants** sur les 99 départements qui en comptent (aucune fiche à 972 Martinique, 973 Guyane, 976 Mayotte). Traité en 20 lots de ~5 départements, par 2 agents en parallèle par vague, avec build + `check-site.mjs` avant chaque commit et consolidation (push + sync `seo-audit-indexation`) après chaque vague de 2 lots.

**Résultat** : plusieurs centaines de fiches corrigées (adresses, téléphones, horaires, sites officiels ajoutés, statuts d'accueil chien recoupés via offices de tourisme officiels) ou confirmées inchangées. Renommages d'enseigne appliqués uniquement avec preuve datée, ancien nom conservé en "(ex-...)" — notamment Café de la Fontaine → Grand Café la Fontaine (Maussane-les-Alpilles, 13), Les 3 Causses → Umami (Millau, 12), Roch Et Co → Le Roy Théodore (Sartène, 2A), Cigale et Fourmi → Café de la Tour (Lectoure, 32), Hasle Lecoq → Moma (Vitré, 35), Les Chiens du Guet → La Cantine du Guet (Saint-Malo, 35), Le Mange Grenouille → Le Relais des Braconniers (Saint-Aignan, 41), Le Coq en Paille → Le Coq en Pou(l)pe (Roanne, 42), B-W Au Petit Chez Soi → Black-White (Thionville, 57), Brasserie de la Paix → Bouillon de la Paix (Lille, 59), La Parisienne → La Brasserie Parisienne (Compiègne, 60), La Table d'HautPoul → La Taverne d'Hautpoul (Mazamet, 81), La Mangoune (n'avait en réalité jamais existé à cette adresse) → Au Paysan Gourmand (Limoges, 87), Les Jacobins → Le Clos des Jacobins (Sens, 89), Le Chalet Des Pins → Le Chalet, désormais casher (Le Raincy, 93).

**Cas à trancher humainement (fiches conservées, aucune suppression automatique)** — signaux de fermeture les plus crédibles (presse datée, liquidation/radiation SIRENE) :
- **Mon Bar** (Arles, 13) : article de presse daté (05/08/2026) évoquant une fermeture et une liquidation judiciaire du gérant, non totalement confirmé (encore listé actif sur des annuaires tiers).
- **Le Grand Bleu** (Beaune, 21) : article de presse daté (21/12/2025) confirmant une fermeture fin 2025 et une reconversion en bar à vin "L'Épinette", société radiée sur Pappers.
- **L'Esprit du Sud-Ouest** (Blagnac, 31) : fermeture définitive annoncée par le gérant (actu.fr, 31/08/2026) après 17 ans d'activité.
- **Le Petit Jardin** (Grenoble, 38) : société en liquidation judiciaire (societe.com), adresse désormais exploitée sous le nom "Le Pompon".
- **Le Django** (Parentis-en-Born, 40) : société radiée le 02/12/2024 après liquidation judiciaire (Societe.com/Bodacc).
- **Courtepaille Beauvais** (60) et **Courtepaille Dreux** (28) : fermetures définitives datées (articles de presse 2023) lors de la vague de fermetures nationales du réseau Courtepaille — à vérifier au cas par cas, certaines adresses Courtepaille restent actives.
- **Crêperie Le Râtelier** (Coutances, 50) : remplacée depuis le 16/10/2026 par le restaurant "La Source" à la même adresse (La Manche Libre, 19/10/2026).
- **La Boucherie** (Douai, 59) : l'office de tourisme officiel du Douaisis référence désormais "Le Bouillon Douaisien" à cette adresse.
- **Le Chanois** (Scey-sur-Saône, 70) : fermeture confirmée par la presse locale (01/10/2025), établissement en vente sans repreneur.
- **La Bonne Maison** (Albi, 81) : SIREN radiée le 27/07/2023, adresse occupée depuis 2022 par un autre établissement ("Opulence Albi").
- **Brasserie K** (Mulhouse, 68) : fermeture pour rénovation confirmée par Visit Alsace, sans date de réouverture annoncée.
- **Chez Lucien** (Lyon, Croix-Rousse, 69) : le site officiel lui-même annonce un déménagement vers "Le P'tit Lucien" (même chef, même mascotte canine), après "8 ans et demi à la Croix-Rousse" selon un post Facebook de l'établissement.
- **L'Escale** (L'Île-Rousse, 2B) : contrairement à l'ancienne fiche, le portail officiel du tourisme de Balagne confirme explicitement et à plusieurs reprises que les chiens n'y sont pas acceptés — question de cohérence éditoriale (garder/retirer la fiche d'un guide "voyager avec son chien") plutôt qu'une fermeture.

D'autres contradictions plus mineures (statut d'ouverture ou accueil chien non tranchable entre deux sources officielles) ont été laissées visibles dans le `bodyHtml` fiche par fiche plutôt que consolidées ici — à retrouver au besoin par une recherche ciblée sur les fiches concernées.

Si une nouvelle fiche restaurant est créée sans vérification directe source officielle, la retraiter à l'identique (pas besoin de relancer tout le chantier).

## Historique — campagne SIRENE éducation canine (octobre 2026, résolue)

Même méthode que les autres catégories, appliquée aux **167 fiches « Éducation canine »** (catégorie créée le 23/10, branchée sur le site le 25/10/2026) : 5 lots en parallèle (brief `brief-verif.md`, section « éducation canine »), terminés le 27/10/2026 après une interruption (limite d'utilisation), build + `check-site.mjs` OK. Bilan : ~117 fiches corrigées (tarifs, adresses, téléphones, horaires, disciplines, faux « non trouvé » remplacés, titres « garde de chien » erronés corrigés), ~40 sans source officielle (seules les mentions de travail retirées), aucune fermeture confirmée.

**Cas à trancher humainement (fiches non supprimées)** :
- **Club de Dressage du Nord-Est Parisien** (`activite-club-dressage-nord-est-parisien-aulnay-93`) : a déménagé à Garges-lès-Gonesse (95) selon cddnep.net ; fiche laissée intacte (garde encore une ligne « Confiance » et « à vérifier »).
- **Cohérence Canine** (fiche en 71) : le site officiel la situe à Saint-André-de-Bâgé (01).
- **L'Essentiel Canin** (Torcy-et-Pouligny) : plus de séances en présentiel (visio/téléphone/formation seulement). **Sacrée Patte** (Égletons) : « ne prend plus de séance ».
- **CaniConfort Les Nouillers** : doublon de `activite-caniconfort-saint-jean-dangely` (même SIRET).
- **Canispirit Orthez** : téléphone/adresse de la fiche = ceux d'Animalsup (Gaas, 40) ; aucune trace d'« À l'Éducation Canine d'Orthez ». **Sym Dog Lozère** : identité douteuse.
- **Peace and Dog** : site figé depuis 2018, deux adresses. **Crocs Dynamiques** (973) et **Les Cabots d'Oléron** : pas d'activité en ligne récente (pas une preuve de fermeture).
- **Catégorie mixte** : Domaine Canin (971, surtout formation pro/fourrière), Techni Croc (animalerie), Couralet (pension/élevage), La Grande Vallée Blanche (élevage).
- **Coordonnées lat/lng à recaler** (champs protégés, non touchés) : Otso Harana (Massignac → Roullet-Saint-Estèphe), Dog's Learning (Caen → Bellengreville), CECAM (Achères → Andrésy), Janzé, Figeacanisport.

## Historique — campagne SIRENE lacs (28/10/2026, résolue)

Vérification des 262 fiches « Lacs » (section « lacs et plans d'eau » du brief), sur sources officielles lues directement (arrêtés, règlements, mairies, offices de tourisme, gestionnaires, fiches baignade du ministère). 220 fiches publiées d'abord, puis les 42 dernières (2 agents) le même jour. Build + `check-site.mjs` OK, champs protégés intacts.

**Interdictions totales, fiches gardées sur décision de l'utilisateur** (info utile aux visiteurs, interdiction affichée dans le titre) : Lac de Carcès (83), Lac du Devès à Lapalud (84, + cyanobactéries août 2026), Étang de Bellebouche (36), Étang de la Touche à Lingé (36, réserve de Chérine), Grand Lac de Laffrey (38, espace chiens au lac de Pierre-Châtel voisin), Lac de la Vogealle (74, réserve de Sixt-Passy), Lac Luitel (38, réserve naturelle), Étang Noir à Seignosse (40, + fermé pour travaux depuis le 3/10/2026), plage du lac de Saint-Jean-de-Chevelu (73). Interdictions saisonnières nouvelles : Lauzon, Parisot, base du Laouzas.

**Décisions** : fiche **Vinon-sur-Verdon** (FR + EN) supprimée (aucune source officielle sur le site décrit), 301 vers `/departement-var`. **Étang de Cazaux-Sanguinet, secteur Estey-Broustaricq** reclassé de 33 en 40 (Sanguinet ; l'URL ne contient pas le département).

**Restes à traiter si besoin** : baignades interdites « jusqu'à nouvel ordre » pour cyanobactéries (Bariousses, Coiroux) et fermetures post-incendie (Bassiès, 09) à revérifier en 2027 ; coordonnées lat/lng à recaler (champs protégés) : lac Mort (≈45.028/5.787), lac de Feyt (≈45.144/2.034).

## Historique — campagne SIRENE plages (28-29/10/2026, résolue)

Les **371 fiches plages** vérifiées sur sources officielles (arrêtés municipaux de police des plages, mairies, offices de tourisme, décrets de réserves), en 12 lots (agents Sonnet, consigne d'économie : une lecture par commune, ne corriger que le faux/daté/manquant). Rapports ligne par ligne : `scratchpad/plages-rapport-XX.txt` (non versionnés).

**Interdictions totales (fiches gardées, interdiction affichée dans le titre, même règle que les lacs)** : Capo di Feno et Ricanto (Ajaccio), Andernos-les-Bains, la Redoute (Port-Camargue), Balaruc-les-Bains, Lège-Cap-Ferret (Horizon, Grand Crohot), Hendaye, Saint-Jean-de-Luz (dont Lafitenia), Socoa (Ciboure), Plage Autet (70), Île de la Métairie (37), Miradou/Pétichet (38), plage du Lignon (43), Parc-Plage de Montrichard (41), Saint-Jorioz (74), Fécamp (plage principale), Veules-les-Roses, Mers-les-Bains, Sainte-Anne (971), Le Carbet (972, communiqué 2016), L'Aiguillon-sur-Mer (85). **Fiche supprimée** : Focaghia (Pietrosella, 2A — lieu introuvable), 301 vers `/plage-chien-corse-du-sud`.

**Doutes laissés visibles dans les fiches** (sources officielles contradictoires ou absentes) : Colleville-Montgomery, Ver-sur-Mer, Cavalaire (horaires), Étretat, Pourville, Sainte-Adresse, Dunkerque/Leffrinckoucke, Bray-Dunes, Biarritz/Anglet (dates), Oye-Plage, Peyrefite (Cerbère), Pornic, Damgan, Locmariaquer, Montalivet, L'Île-Rousse (Pietra), plusieurs plages corses et ultramarines sans règle publiée.

## Historique — campagne SIRENE balades (29/10/2026, résolue)

Les **1 063 fiches balades** vérifiées sur sources officielles (communes, offices de tourisme, ONF, parcs nationaux/régionaux, décrets de réserves, Départements/ENS), 34 lots d'agents Sonnet, consigne « rigueur maximale » (chaque fiche relue en ligne, aucune affirmation sans source, « laisse conseillée » quand rien n'est publié). Rapports : `scratchpad/balades-rapport-XX.txt` (non versionnés). Au passage : 85 champs publics nettoyés de variantes « confiance élevée/bonne/basse » (contrôle `check-site.mjs` étendu), 57+ fiches à icônes inexistantes (`i-tree`/`i-park`/`i-shield`) corrigées, mails/portables de particuliers retirés.

**Interdictions totales (fiches gardées, titre explicite)** : réserves des Hauts de Chartreuse, Hauts-Plateaux du Vercors, Courant d'Huchet, Chérine, Massé-Foucault, Biguglia, Sixt-Fer-à-Cheval, Grand-Voyeux, Amana et Kaw-Roura (973), Caravelle (972), îlot Mbouzi (976), cœur du Parc national de la Guadeloupe, Madone de Fenestre (Mercantour), tourbière du Longeyroux, gorges du Fier et du Pont du Diable (74), sentier littoral de Giens, jardin japonais de Nantes, parc des Gayeulles (hors espaces chiens), parcs Boussard (Lardy), Frédéric-Pic (Vanves), île Cointre (Alfortville), Tremblay (Champigny), plaine des Bordes, parc de Conflans (Charenton), circuit du lac du Cébron, plage du Saucil.

**Supprimées (lieu introuvable)** : Étangs de la Souche (02), Lac de Saint-Apollinaire (21), Parc de la Colombière à Chalon (71), 301 vers la page balades du département. **Reclassées** : Roche d'Oëtre (14→61), Gorges du Guiers Vif (73→38), Lac de la Raviège (81→34). Page `/parc-canin-ille-et-vilaine` disparue (moins de 3 parcs) → 301 vers `/parc-canin`.

**À trancher / recaler plus tard** (liste complète : `scratchpad/a-trancher.txt`) : forêt du Neuhof (Ville « chiens non acceptés » vs décret « laisse sur itinéraires »), sentier des Tannes, phare de Chassiron, clues d'Aiglun/Saint-Auban (canyoning), Causse de Sauveterre (confusion avec GRP Lozère), GR36 Suisse normande (14/61) ; lat/lng à recaler : lac de Saint-Amans, Anse du Sud (Préfailles), méandre de Queuille, Chemin du Partage (Bauzon).

## Historique — campagne SIRENE activités + Côte d'Azur/Monaco (29-30/10/2026, résolue)

Les **780 fiches activités** (25 lots) et les **34 fiches Côte d'Azur/Monaco** vérifiées sur sources officielles (site de l'établissement, office de tourisme, commune, arrêtés), consigne « rigueur maximale ». **Toutes les catégories du site sont désormais passées en mode SIRENE.** Rapports : `scratchpad/activites-rapport-XX.txt`, `azur-rapport-00.txt` (non versionnés). Contrôle `check-site.mjs` étendu aux variantes « confiance élevée/bonne/basse ».

**Supprimées** : fermetures confirmées (La Meute And Co, Beauvais — presse + gérante ; refuge Gueules d'Amour, Dembéni — fermé depuis 2021) ; introuvables (Coach4Dogs Île de Ré, Personne & Bête et Educ Detec 46, Les Trévires Sainte-Maxime FR+EN, Cyno Sporting Club de Draveil). 301 vers la page du département. **Reclassées** : fromagerie Duroux (15→19), Canoë-Kayak Redonnais (35→44), musée La Belle Échappée, golf d'Arçonnay et Préférence Plein Air (61→72), tourbière de la Comtesse (90→88).

**Nombreux lieux où les chiens sont interdits** (musées, châteaux, monuments, remontées, plages de Carro/Martigues…) : fiches gardées avec l'interdiction dans le titre, en attendant la décision de l'utilisateur (garder comme info utile ou retirer du guide).

**Décisions en attente de l'utilisateur** (liste complète : `scratchpad/a-trancher.txt`) : fermetures probables (Cynophile Doux — retraite annoncée ; château de Meillant — fermé au public, mobilier vendu ; The Dogry Paris — une source presse) ; cani-randos avec les chiens du musher et non le sien (Vallée Amarok, Artik Basterds, Terre Inukshuk, Leila'Venture, Meutmatah, Tracés Sauvages, Appel Sauvage, Val d'Azun) ; pensions/éducation rangées en activités ; Le Cormenier (CGV « non admis » vs office « bienvenus ») ; Nice Carras (probable doublon de La Lanterne) ; **versions anglaises non resynchronisées** (≈35 fiches `src/en/fiches/` gardent les anciennes infos) ; lat/lng à recaler (Tours de Merle, Jardin Shamrock, CEC Cergy-Vexin, Breizh Légende, club Ham-sous-Varsberg, Cani-School88, Vologne, caniparc de Colombes…).

## Historique — décisions sur le bilan SIRENE (29/10/2026, résolu)

Décisions de l'utilisateur appliquées et mises en ligne :
- **Fermetures probables supprimées** (301 vers la page département) : Château de Meillant (18), Cynophile Doux (Balanzac, 17), The Dogry (Paris). **Plage du Carras** (Nice, FR + EN) supprimée comme doublon de La Lanterne, 301 vers `/fiche-nice-lanterne` et `/en/fiche-nice-lanterne`. Fiche EN orpheline Camping Antipolis (FR déjà supprimée) retirée, 301 vers `/en/departement-alpes-maritimes`.
- **Lieux interdits aux chiens** : gardés comme info utile (interdiction dans le titre).
- **8 cani-randos avec chiens de traîneau** (Vallée d'Amarok, Artik Basterds, Terre Inukshuk, Leila'Venture, Meutmatah, Tracés Sauvages, L'Appel Sauvage, Val d'Azun) : gardées, avec « avec les chiens du musher, pas le tien » dans titre/description/cardTeaser et un encadré « Pas avec ton propre chien » en tête de fiche.
- **Pensions sorties des activités** : Des Élucines, Eskapattes, Dog and Co'ach, L'Oyat des Dunes → `dogsitters` (« Garde de chien ») ; Centre des Pitchounes → `education`. Couralet reste en éducation (club d'agility).
- **91 fiches EN resynchronisées** sur les FR vérifiées (toutes celles dont le FR avait changé depuis le 27/10 ; rapports `scratchpad/en-rapport-0X.txt`).
- **GPS / lieux recalés (28 fiches, rapport `scratchpad/gps-rapport.txt`)** : départements changés (URL inchangées) — Cani Salon 90→25 (Dampierre-les-Bois), Cohérence Canine 71→01 (Saint-André-de-Bâgé), Club de Dressage du Nord-Est Parisien 93→95 (Garges-lès-Gonesse, fiche réécrite), GR36 vallée de l'Orne 61→14, Causse de Sauveterre 12→48 ; lieux corrigés : Mush Gironde (Cazats), Rives de l'Adour (Bours), Bauzon (Usclades-et-Rieutord), tourbière de la Comtesse (Les Forges, 88). Page `/education-canine-saone-et-loire` disparue → 301 vers `/departement-saone-et-loire`.
- **Restent à trancher** : Domitille Henry (site contradictoire : Bezange-la-Petite 57 ou Aigrefeuille 17), Club d'éducation canine Lozérien (terrain à Rimeize selon le seul Petit Futé). Coordonnées approximatives (centre de commune) : CEC Cergy-Vexin, Breizh Légende, Cyno'Pro 973, Otso Harana, Dog's Learning, Vologne, Rives de l'Adour.
- **Bimo** : a demandé (29/10) de passer ses liens en dofollow dans les 2 guides ; refusé sur conseil (risque d'échange de liens aux yeux de Google), liens laissés en `rel="sponsored"`. Leur lien retour (page Partenaires de bimo.dog, dofollow) est reçu.

## Historique — plages, 2e passage « rigueur maximale » (29/10/2026, résolu)

Les 369 fiches plages repassées une à une (12 lots, agents Sonnet, section « plages, 2e passage » de `brief-verif.md`) : arrêtés lus eux-mêmes quand ils sont en ligne, chaque affirmation (règle chien, accès, parking, sol, services, distances) contrôlée, tout ce qui n'est pas sourcé retiré ou formulé prudemment. Rapports : `scratchpad/plages2-rapport-XX.txt`. 25 fiches EN resynchronisées. Mis en ligne le 29/10.

- **Nouvelles interdictions totales (titre explicite)** : Trégunc (8 plages toute l'année), Île d'Aix, Bodri (Corbara), Arromanches (plage, probable), Grolejac (plage), Ardus (82, GPS recalé), Corzent (Thonon, « animaux non acceptés »). Reconfirmées : Ajaccio, Andernos, La Redoute, Balaruc, Lège-Cap-Ferret, Hendaye, Saint-Jean-de-Luz, Socoa, Autet, Saint-Jorioz, Veules, Étretat, Mers, Miradou, Montrichard, Lignon, Cerdon, Sainte-Anne, Le Carbet, Moya/Papani (976), L'Aiguillon-sur-Mer, Trébas.
- **Plus en interdiction totale** : Île de la Métairie (37, chiens en laisse admis, baignade interdite), Fécamp (zone canine depuis le 30/11/2024), Sainte-Marguerite-sur-Mer (juillet-août entre les épis seulement).
- **Doublon supprimé** : Ondres-Océan (= Plage d'Ondres), 301 vers `/fiche-ondres-plages`. **Reclassée** : Beau-Rivage (Sanguinet) 33→40.
- **Doutes laissés visibles** (sources officielles contradictoires ou arrêté illisible) : La Croix-Valmer (7 plages), Barcaggio, Pietra, Nonza, Peyrefite, Oye-Plage, Capbreton, Hossegor, Gujan-Mestras, Colleville, Courseulles, Barneville-Carteret, Damgan, Quiberon, plages martiniquaises « interdites » d'après un seul site de location, etc.
- **La Saule** (Carennac) supprimée sur décision de l'utilisateur (parc aquatique payant qui refuse les animaux), 301 vers `/departement-lot`.

## Historique — soirée du 29/10/2026 (résolu, mis en ligne)

- **Vétérinaires urgences 24h/24, rigueur maximale** : les 179 fiches dont la ligne « Urgences » annonçait 24h/24 ou 7j/7 (hors les 50 fiches du test SEO K4) revues sur le site de chaque clinique (brief `brief-verif.md`, section « vétérinaires urgences/garde », rapports `scratchpad/vets24-rapport-0X.txt`). Badge « Urgences 24h/24 » gardé seulement quand le site de la clinique confirme un service assuré par elle-même (sur place ou astreinte) ; renvois (V2TU, Vetonimo, gardes partagées, CHV voisins) écrits avec le bon numéro ; sinon formule de doute (neutralise `vetBadge` — attention, « annoncé par », « revendiqué »… le neutralisent aussi). Renommages : Clinique Vétérinaire Messine (ex-Goerlinger, Metz), KaruVet (971), Clinique de l'Amiral (Les Herbiers), Univet Nyons, Univet VallDor (Souillac), Alvetia Terville (ex-Mellinger, déménagée le 5/10/2026), Clinique des Viennes (ex-Reginensi, Troyes ; lien établi par le téléphone, pas de preuve datée). **Doublons/fusions supprimés avec 301** : Chanois → O2vet Vercel, Lorenavet → Sablon (Metz), Pasteur et Épenottes (Dole) → Vet'Auréa Authume. 5 fiches EN resynchronisées (badge non affiché en EN : label « Emergencies »).
- **17 nouvelles balades** (sources officielles, modèle Mont Vinaigre/Fenestrettes) : Estérel (Mont Vinaigre, Mont Aigre, Rocher de Roquebrune, Grand Tour de l'Ours, Balcons du Cap Roux, sentier des Douaniers de Saint-Aygulf, Belle Barbe–Perthus, Perthus occidental, Gaillarde, Pic de l'Escale, Mimosa, étangs de Villepey) et Vallée de l'Hérault (Fenestrettes, Castellas de Montpeyroux, Saint-Baudille, Roc des Deux Vierges, Télégraphe, Notre-Dame-du-Lieu-Plaisant, Hannibal, Popian). Dolmen du Pouget fermé par arrêté (non créé). Brief `scratchpad/brief-nouvelles-balades.md`.
- **14 nouvelles plages de Sainte-Maxime à Monaco** (brief `scratchpad/brief-plages-azur.md`, rapports `pa-rapport-1/2/3.txt`) : Issambres (Éclaireurs, Actinies), Saint-Raphaël/Agay (chiens interdits), Mandelieu (Mineurs), Théoule (interdit), Cannes (Brigitte Bardot, Midi, Zamenhof, Gazagnaire : 1er nov.-1er mai), Golfe-Juan (Pont de l'Aube), Villefranche (Deux Rups), Menton (Casino), Beaulieu et Èze (interdits). Plage d'Argens (Fréjus) recalée sur l'arrêté 2026-1797 (3 zones chiens en laisse, 4 juin-20 sept.).
- **Carte des pages département** : le filtre Plages inclut désormais les fiches `cote-azur` (`dept-map.js`).
- **Mention « Infos vérifiées sur sources officielles »** en tête de chaque fiche (FR/EN), avec date de mise à jour (`fiche.njk`).
- **Nouveau guide** `/guide-randonnee-regles-chien` (laisse en forêt, parcs nationaux et réserves, massifs fermés l'été par département, patous, chasse), sans répéter les autres guides.
- **Bimo** : accepte `rel="sponsored"`, 3 nouveaux articles annoncés (voir `ECHANGES-LIENS.md`).
- **Restes à trancher** (`scratchpad/a-trancher.txt`) : Luchon (Dr Peltier à Cierp-Gaud ?), Floralex (Moulins, nom ?), Menton (Hawaï : côté droit seulement selon l'office), plage du Pacha (« toute l'année » vs arrêté saisonnier), GPS approximatifs (Terville, Cannes Midi/Zamenhof, Pont de l'Aube, Télégraphe, Popian). Restent 50 fiches vétérinaires K4 et ~1 400 vétérinaires sans mention 24h/24 à repasser en rigueur maximale après la réinitialisation hebdomadaire (5/11).

## Historique — indexation et points tranchés (29/10/2026, résolu)

- **Indexation (Search Console, données du 23/10)** : 6 840 pages indexées, 4 580 non indexées. Seul vrai sujet : « Détectée, non indexée » (3 657, file d'attente d'exploration d'un site jeune — se résorbe avec le temps et les liens entrants). Le reste est normal : 825 variantes canoniques (anciennes URL `.html`), 12 redirections, 8 « doublons » = anciennes URL `.html` vues fin septembre, la seule 404 (`fiche-ruisseau-ponteves`) est déjà en 301. 79 « Explorée, non indexée » (surtout pages catégorie × département) : **à remesurer mi-novembre** avec K4.
- **Corrections SEO mises en ligne** : 29 titres EN traduits ; `sitemap.xml` devient un index de 14 sitemaps (`sitemap-pages`, `sitemap-fiches-<catégorie>`, `sitemap-en`, gabarits `src/sitemap*.njk`, `check-site.mjs` additionne les enfants) pour suivre l'indexation par catégorie (filtre sitemap dans Indexation → Pages) ; hreflang `x-default` (FR) ; 8 liens internes `.html` corrigés ; section « l'essentiel de chaque adresse » sur les 691 pages catégorie × département (filtre `ficheBrief` : 2 infoItems clés par catégorie, mentions de travail écartées).
- **Points tranchés** (rapport `scratchpad/trancher-rapport.txt`) : Domitille Henry 17→57 (Bezange-la-Petite, site officiel) ; plage Hawaï (Menton) : « côté droit » selon l'office affiché en doute, GPS recalé ; plage du Pacha : toute l'année (office) + arrêté estival 2026-1797 ; Dr Peltier (Luchon) : doute affiché (Cierp-Gaud non prouvé), mobiles retirés. **Restent ouverts** (aucune preuve) : Floralex (Moulins, enseigne), Club canin Lozérien (Rimeize ?), GPS de plage du Midi/Zamenhof (Cannes) et club de Ham-sous-Varsberg.

## Historique — villes et stations (29/10/2026, mis en ligne)

- **Accueil** : bloc « Villes et stations avec son chien », 2 volets dépliables (grandes villes : liste fixe dans `src/index.njk` ; stations : `STATION_VILLES` dans `eleventy.config.js`, page ville dès 10 fiches au lieu de 15). Signature « Le guide vu dans les yeux de Coco » sous le titre de l'accueil et de « À propos » (sans lien Instagram, décision de l'utilisateur).
- **Vague 1 de fiches stations/villes (mode SIRENE)**, 66 nouvelles fiches (orders 97400-97613, rapports `scratchpad/stations-rapport-1..5.txt`, brief `scratchpad/brief-stations.md`) : La Baule-Escoublac 8→17, Soorts-Hossegor 4→12, Le Touquet 10→16, Arcachon 6→15, Saint-Raphaël 14→20, Dinard 13→18, Annecy 13→25, Porto-Vecchio 12→17, Lille 11→18, Montpellier 10→17, Bordeaux 10→18 (cardTag harmonisés, pas de nouvelle fiche). `cardTag` harmonisés sur le nom officiel de la commune (Hossegor → Soorts-Hossegor, communes déléguées d'Annecy, quartiers de Bordeaux).
- **Vagues 2 et 3 (même méthode, orders 97700-98111, rapports `stations-rapport-6..14.txt`)** : 116 nouvelles fiches. Saint-Jean-de-Luz 8→15, Capbreton 6→13, Royan 9→16, Quiberon 9→14, Carnac 12→15, Menton 9→15, Antibes 8→15 (Juan-les-Pins/Cap d'Antibes harmonisés), Étretat 6→11, Honfleur 9→18, Sète 9→15, Le Grau-du-Roi 10→14, Collioure 5→16, Le Lavandou 8→14, Sainte-Maxime 11→15, Ramatuelle 12→14, Fréjus 14→16, Chamonix-Mont-Blanc 6→21 (hameaux harmonisés), Calvi 5→12, Bonifacio 12→14, Argelès 10→14, Noirmoutier-en-l'Île 8→12, Erquy 8→12. Corrigés au passage : Hôtel Méditerranée Menton (sans supplément, site officiel), Hôtel Le Triton Collioure (70 € = prix de chambre). À trancher : Hôtel Les Alcyons (Le Lavandou, même adresse que Beau Soleil) ; cabinet vétérinaire de l'Estuaire (Honfleur) fermé le 31/03/2026 (aucune fiche) ; plages de Capbreton et de Sète (sources contradictoires, doute affiché).
- **Vague 4 (orders 98200-98568, rapports `stations-rapport-15..22.txt`)** : 136 nouvelles fiches. Grandes villes : Perpignan 14→18, Clermont-Ferrand 12→18, Nancy 12→19, Saint-Étienne 11→18 (Rochetaillée harmonisé), Pau 12→18, Troyes 13→18, Chambéry 13→18, Lorient 14→17 (toutes ajoutées à la liste « Grandes villes » de l'accueil). Stations : Bandol 5→12, Sanary 5→11, Six-Fours 9→10, La Ciotat 7→11, Cassis 3→10, Cabourg 5→10, Trouville 6→11, Ouistreham 6→10, Concarneau 6→12, Cancale 5→12, Roscoff 5→11, Agde 12 (Cap d'Agde harmonisé), Gruissan 5→13, Canet 5→11, Megève 5→12, La Clusaz 5→11, Barcelonnette 7→11, Bagnères-de-Luchon 8→12 ; Lourdes et Sarlat ajoutées (déjà à 10). À trancher : parc Sant Vicens (Perpignan, office « interdit » vs mairie « espace clos chiens ») ; coordonnées approximatives nombreuses (géocodeur officiel inaccessible depuis l'environnement). **Vague 5 possible** : Pornic, Lacanau, Biscarrosse, Saint-Gilles-Croix-de-Vie, Courchevel, Tignes, Les Deux Alpes, Cauterets, Saint-Lary-Soulan, Vallon-Pont-d'Arc, L'Isle-sur-la-Sorgue, Rocamadour, L'Île-Rousse, Propriano (déjà dans `STATION_VILLES`).
- **Vague 1 — reste à proposer** : stations sans page (Saint-Jean-de-Luz, Royan, Quiberon, Menton, Antibes, Étretat, Honfleur, Sète, Le Lavandou, Le Grau-du-Roi, Chamonix, Capbreton, Collioure, Calvi…), stations à étoffer (Fréjus, Bonifacio, Carnac, Ramatuelle, Sainte-Maxime, Argelès…). Points notés par les agents : horaires Univet Saint-Raphaël (fiche existante) à confirmer ; fiche « Agay » cardTag à décider ; sentier de Tamaricciu (Porto-Vecchio) « Animaux : non » sur Cirkwi ; dates de la plage d'Arcachon (arrêté vs Toutou guide).

## Historique — pages ville × catégorie (29/10/2026, mis en ligne)

- **Pages ville × catégorie** (`src/ville-categorie.njk`, collection `cityCategoryPages` dans `eleventy.config.js`) : une page par catégorie et par ville dès **3 fiches** (`CITY_CAT_MIN_FICHES`), URL `/<slug catégorie>-<ville>` (ex. `/plage-chien-biarritz`, `/veterinaire-chien-lyon`), textes repris des pages catégorie × département avec {enNom} = « à <Ville> » (filtre `dropVille` pour ne pas répéter le nom de la ville), section « l'essentiel de chaque adresse », liens croisés ; lien « la page dédiée » sur les pages ville ; ajoutées à `sitemap-pages`. Exclues : ville homonyme d'un département (Paris).
- **Variantes de commune regroupées** (fonction `cityOf`) : « Lyon 5e », « Reims (Murigny) », « Besançon, Doubs », « Saint-Malo (Paramé) », alias Annecy-le-Vieux et Cannes La Bocca comptent pour la ville sans changer le cardTag affiché ; les cardTag multi-communes (« / », « et alentours », « + », « → ») ne sont rattachés à aucune. Nouvelles pages ville grâce à ce regroupement (dont Paris).

## Historique — catégories des villes complétées, vague A-H (29/10/2026, mis en ligne)

85 nouvelles fiches (orders 98600-98999, brief `scratchpad/brief-categories.md`, rapports `categories-rapport-A..H.txt`) pour porter à 3 fiches les catégories manquantes des 32 plus grosses villes/stations (Lyon hébergements 0→3, Reims hébergements/restaurants, Grimaud, Toulouse, Grenoble, Le Havre, Poitiers, Saint-Malo, Les Sables-d'Olonne, etc.). Les dogwash restent souvent sous 3 (beaucoup de stations sont dans des communes voisines). À traiter/vérifier : fiches du Havre (parcs fermés après la tempête Austen, à retirer à la réouverture) ; `veterinaire-vetcham-chamonix-mont-blanc` (adresse/téléphone = Cabinet Vétérinaire de la Vallée, doute affiché) ; `veterinaire-univet-beauvais-60` (urgences désormais annoncées par univet.fr) ; dogwash Tom&Co et Animalis Bourges à la même adresse ; Le Club des Poilus (dogwash, Le Havre, ouverture fin octobre 2026) à créer en novembre ; sentier des douaniers de Toulon (sources contradictoires). Reste : ~440 catégories sous 3 dans les ~100 autres villes/stations (`scratchpad/gaps.json`).

## Historique — catégories des villes, vague I-P (30/10/2026, mis en ligne)

111 nouvelles fiches (orders 99000-99368, rapports `categories-rapport-I..P.txt`) pour 32 villes de plus (Orléans, Niort, Nancy, Mulhouse, Marseille, Troyes, Saint-Étienne, Perpignan, Pau, Limoges, Lille, Laval, Honfleur, Dinard, Colmar, Clermont-Ferrand, Chambéry, Bordeaux, Ajaccio, Vannes, Tours, Porto-Vecchio, Nevers, Montpellier, Lorient, La Rochelle, La Roche-sur-Yon, La Baule, Cannes, Briançon, Blois, Royan). Numéros de portable des toiletteurs à domicile (Vanbelle, Couaf' Toutou) retirés, renvoi vers leur site. À vérifier : Luma Restaurant (La Rochelle, signaux de fermeture) ; Dog and Cath's et Dog and Co'ach à la même adresse (La Roche-sur-Yon) ; dogwash Gamm vert La Roche-sur-Yon (seule source : rapport Cavac 2022-23).

## Historique — catégories des villes, vague Q-X (30/10/2026, mis en ligne)

201 nouvelles fiches (orders 99400-99834, rapports `categories-rapport-Q..X.txt`) sur les 69 dernières villes/stations : toutes les villes et stations à page ont maintenant été traitées. Beaucoup de vétérinaires/toiletteurs de petites stations restent sous 3 (souvent 1 seul dans la commune, ou annuaires seulement). À trancher : Dog's Land (Nice) à l'adresse de `toiletteur-au-paradis-canin-nice` (fiche à renommer ?) ; `toiletteur-de-la-porte-baron-cholet-49` (déménagé au 109 rue d'Alsace selon son site) ; `balade-sentier-du-littoral-six-fours-chiens-interdits` (brochure TPM 2022 « chiens interdits », office muet) ; Clinique des Arènes Fréjus annonce désormais 24h/24 (fiche à revoir) ; GR34 fermé à Crozon/Telgruc/Camaret en 2026 (signalé). Coordonnées approximatives nombreuses (géocodeur inaccessible).

## Historique — stations, vague 5 (30/10/2026, mis en ligne)

86 nouvelles fiches (orders 99900-100115, rapports `stations-rapport-23..27.txt`) : les 14 stations restantes de `STATION_VILLES` ont toutes leur page — Pornic 5→12, Saint-Gilles-Croix-de-Vie 3→12, Lacanau 10 (Lacanau-Océan harmonisé), Biscarrosse 11 (Biscarrosse-Plage harmonisé), Courchevel 11, Tignes 10, Les Deux Alpes 10, Cauterets 14, Saint-Lary-Soulan 12, Vallon-Pont-d'Arc 12, L'Isle-sur-la-Sorgue 10, Rocamadour 12, L'Île-Rousse 10 (« Île-Rousse » harmonisé), Propriano 10. Le site compte 147 pages ville. Marge nulle (10 fiches pile) : Tignes, Les Deux Alpes, Lacanau, L'Isle-sur-la-Sorgue, L'Île-Rousse, Propriano — ne pas supprimer de fiche sans vérifier. À trancher : Hôtel Perla Rossa (L'Île-Rousse : office « petit chien » vs site « not allowed ») ; tarif chien contradictoire à l'hôtel Le Lys (Cauterets).

## Historique — fermetures tranchées (29/10/2026, mis en ligne)

Décision de l'utilisateur (« supprimer avec redirection vers la page du département ») : 13 fiches supprimées, 301 vers `/departement-<slug>` — restaurants L'Esprit du Sud-Ouest (Blagnac), Le Grand Bleu (Beaune), Le Django (Parentis), Le Chanois (Scey-sur-Saône), La Bonne Maison (Albi), Crêperie Le Râtelier (Coutances), Le Petit Jardin (Grenoble), Courtepaille Beauvais et Dreux ; Camping Le Cosson (La Ferté-Saint-Aubin) ; toiletteurs Atelier Canin (Strasbourg), Au Bonheur du Chien (Fontainebleau), Patt Club (Pontoise). **Gardés** (preuve insuffisante) : Relais de Montignac (fermeture « cette saison » seulement), Mon Bar, La Boucherie (Douai), Brasserie K, Chez Lucien, Hôtel du Causse. Page `/toiletteur-chien-seine-et-marne` disparue (moins de 3 toiletteurs) → 301 vers `/departement-seine-et-marne`. Puis (même jour) : supprimées avec 301 — L'Escale (L'Île-Rousse, chiens refusés), CaniConfort Les Nouillers (doublon → fiche Saint-Jean-d'Angély), L'Essentiel Canin (Torcy-et-Pouligny) et Sacrée Patte (Égletons), plus de séances sur place. **Hôtel Les Alcyons (Le Lavandou) : ne pas créer** (décision de l'utilisateur). Fiches « Agay » (3) rattachées à Saint-Raphaël (cardTag). Page `/restaurant-chien-haute-corse` disparue (moins de 3 restaurants) → 301 vers `/departement-haute-corse`.

## Historique — nettoyage "Confiance X" en public (novembre 2026, résolu)

En creusant un CTR anormalement bas sur plusieurs fiches bien classées dans Search Console, découverte que ~2133 fiches (sur ~9300, environ un quart du site) avaient la mention interne **"Confiance faible/moyenne/haute"** littéralement dans le champ `description` du frontmatter — donc visible dans le snippet Google, jamais censée être publique (c'est une annotation de travail issue des rounds de recherche/vérification).

- **Les 2133 fiches sont corrigées** : 1831 par script automatisé, puis les ~302 restantes (trop ambiguës pour un script — mention répétée, ou collée à une info factuelle à ne pas perdre) traitées à la main par 6 agents en parallèle. Le champ `description` du site est maintenant propre : plus aucune occurrence de "confiance faible/moyenne/haute" dedans.
- **Ne pas toucher** aux mentions "confiance X" dans le corps (`bodyHtml`) ou les sidebars — c'est une information légitime pour le lecteur là où elle apparaît dans le texte visible normal de la fiche (pas dans un champ meta invisible à l'affichage). Volontairement laissé intact partout.
- **Doutes factuels non résolus** : plusieurs dizaines de fiches gardent un vrai doute non tranché dans leur `bodyHtml` (adresse contradictoire, tarif divergent entre sources, téléphone non reconfirmé, statut chien non trouvé...) — volontairement laissés visibles pour le lecteur plutôt que supprimés ou forcés sans preuve. Pas de liste consolidée conservée ; à ressortir au besoin via une recherche ciblée sur les fiches concernées si un futur round de vérification s'y attaque.

### `cardTeaser` — résolu aussi

Le champ **`cardTeaser`** (texte affiché publiquement sur les cartes du site — accueil, pages département, section "à proximité" des fiches, donc *encore plus visible* que la meta description qui n'apparaît que dans Google) portait lui aussi la mention "confiance X" sur 887 fiches. Corrigé en totalité : 805 par script automatisé, 82 restantes (mention répétée, ou collée à une info factuelle) traitées à la main par 2 agents, avec attention particulière à la ponctuation (ne pas recoller deux phrases sans point après suppression d'une parenthèse "(confiance X)." en milieu de texte — bug repéré et corrigé dans le script avant application, voir `git log`).

**Bilan complet du chantier "confiance X" publique** : `description` (2133 fiches), `cardTeaser` (887 fiches) et `title` (96 fiches, découvert le 22/10/2026 en analysant l'export Search Console — le champ le plus visible, lien bleu Google + og:title) sont désormais propres sur tout le site. `bodyHtml`/sidebars volontairement non touchés (légitimes pour le lecteur). Si un nouveau champ public affichant cette mention est découvert plus tard, même méthode : grep `[Cc]onfiance (faible|moyenne|haute)` sur le champ concerné, script automatisé pour les cas simples (lead/tail safety checks, attention à ne pas supprimer un point qui sert de séparateur de phrases), agents pour les cas ambigus restants.

## Mots-clés SEO — à remesurer mi-novembre 2026 (chantier K4, 28/10/2026)

Mis en ligne le 28/10/2026 après analyse des requêtes Search Console (détail dans `SEO-PRIORITES.md`, section K4) :
- **Hébergements par département** : titre « Camping, hôtel et gîte chien accepté {dép} : N adresses » (cible « camping chien admis/accepté + département », alors en position 25-43).
- **Balades** (« Où promener son chien autour de moi ») et **parcs canins** (« Où promener son chien sans laisse ») : nouveaux titres + encadré « les plus proches de toi » (`nearby: true`, filtre `inCategoryPage`).
- **50 fiches vétérinaires les plus vues** (200-740 impressions, 0-1 clic) : titre « Nom, Ville : horaires, téléphone[, urgences/garde] » et description avec téléphone/horaires vérifiés, jargon interne retiré.

**Vers mi-novembre** : comparer dans Search Console les clics/CTR de ces 50 fiches et la position des requêtes « camping chien accepté + département ». Si le CTR des vétérinaires monte, appliquer le même modèle aux autres fiches vétérinaires (infos vérifiées seulement). Inutile de viser les noms de campings précis (site officiel toujours devant).

## Programme partenaire (démarrage commercial)

Le site propose une mise en avant payante optionnelle aux professionnels déjà référencés gratuitement (vétérinaires, restaurants, hébergements...). Statut : en phase de test manuel, pas encore de vrai partenariat signé.

- **Page publique** : `src/devenir-partenaire.njk` (accessible depuis le menu hamburger) — volontairement sans tarif affiché, juste les explications et un contact mailto.
- **Mécanisme technique** : ajouter `partenaire: true` au frontmatter d'une fiche déclenche un badge doré "Partenaire" sur ses cartes (accueil, page département, "à proximité") et un tag dans son hero. CSS : classes `.fiche-card.is-partenaire`, `.access-badge.badge-partenaire`, `.fiche-partenaire-tag` dans `src/style.css`.
- **Priorité d'affichage (promise sur la page publique)** : les fiches `partenaire: true` passent en tête des pages département, des pages catégorie, des pages ville, et sont toujours proposées dans « À proximité » des fiches du même département et de la même catégorie (`partnersFirst` et filtre `related` dans `eleventy.config.js`). Exception volontaire : sur les pages vétérinaires, les gardes 24h/24 vérifiées restent avant les partenaires.
- **Design du badge (23/10/2026)** : pastille vert profond à liseré doré + médaille (`.partner-badge`, en haut à droite des vignettes, séparée des badges d'accès « Toute l'année »/« Saisonnier » en haut à gauche qu'elle ne masque plus) ; contour doré de la vignette ; même style pour `.fiche-partenaire-tag` dans l'en-tête de fiche.
- **Un seul badge : « Partenaire », payant.** Décision de l'utilisateur (23/10/2026) : pas de badge gratuit « Référencé sur Coco Explore » à afficher par les professionnels (créé puis retiré le même jour, URL redirigée vers `/devenir-partenaire`). Ne rien proposer qui puisse se confondre avec le badge payant ; un échange de lien se fait sans badge.
- **Tarif cible convenu avec l'utilisateur** : 19 à 29 €/mois, sans engagement, 1er mois offert. Pas de facturation à la performance (pas de données de trafic pour le justifier pour l'instant).
- **Cohérence éditoriale** : la page "À propos" (`src/a-propos.njk`) a été mise à jour pour rester honnête vis-à-vis de ce programme (le classement/contenu reste neutre, seule la mise en avant visuelle est payante).

### Premier partenaire potentiel : Les Petits Loots (Angers, 28/10/2026)

Nicolas Barbeau et Lidia (pet-sitters, balades en forêt, taxi animalier, Loire-Authion/Angers, lespetitsloots@gmail.com) ont contacté Coco Explore d'eux-mêmes le 27/10/2026 pour devenir partenaires. Offre envoyée par l'utilisateur le 28/10 : démarrage direct en Partenaire, **1er mois offert puis 19 €/mois sans engagement** (fiche gratuite conservée sans badge s'ils arrêtent), lien « Retrouvez-nous sur Coco Explore » proposé (pas imposé). **Une seule fiche** (décision de l'utilisateur, pas de catégorie taxi animalier) : prête dans `propositions/les-petits-loots/` avec `partenaire: true`, non publiée. **En attente de leur réponse** ; relance avec l'aperçu PDF prévue vers le 02/11 sans nouvelles. À l'accord : copier la fiche dans `src/fiches/`, noter la date de début (fin du mois offert), facturation seulement une fois la micro-entreprise de l'utilisateur immatriculée (SIRET).

### Modèle d'email de démarchage (sans prix — à adapter par fiche/pro)

```
Objet : Votre clinique déjà référencée sur Coco Explore — une mise en avant possible ?

Bonjour [Nom],

Je gère Coco Explore, un guide en ligne qui aide les propriétaires de chiens à
trouver des lieux adaptés partout en France (plages, hébergements,
vétérinaires, toiletteurs...). Votre [établissement] y est déjà référencé
gratuitement : [lien vers la fiche]

Je lance actuellement un test auprès de quelques professionnels pour une mise
en avant de leur fiche : badge "Partenaire" visible, priorité d'affichage
dans les résultats de votre secteur. L'idée est de vous rendre plus visible
auprès de personnes qui cherchent activement [un vétérinaire / un
hébergement / ...] pour leur chien — souvent des visiteurs ou nouveaux
arrivants dans la région, donc avec un besoin assez immédiat.

Plus de détails ici si ça vous intéresse : [lien vers devenir-partenaire.html]

Belle journée à vous,
[Prénom/nom]
Coco Explore — cocoexplore.com
```

Premier envoi test envisagé auprès de la Clinique Vétérinaire du Dr Jackowski (Cavalaire-sur-Mer) — fiche supprimée début novembre 2026 après un faisceau d'indices de fermeture (avis client isolé évoquant une fermeture fin 2023, site officiel chezmonveto.com injoignable en DNS, aucun email public trouvé), **puis recréée le 9 octobre 2026** : l'utilisateur a vérifié sur place (capture Google Maps) et la clinique est bien active — 4,8/5 sur 85 avis, en activité depuis plus de 5 ans. Les infos de contact (téléphone, adresse, horaires) viennent de l'ancienne recherche, déjà cohérentes avec l'adresse vue sur Maps. Pas de nouveau site web renseigné (l'ancien restait mort).

**Changement de canal pour ce premier contact (10/10/2026)** : l'utilisateur a vérifié qu'aucune adresse email n'est trouvable (seul un numéro de téléphone figure sur les sources disponibles), donc le modèle d'email ci-dessus ne s'applique pas à ce cas précis. L'utilisateur a un rendez-vous à venir avec sa chienne Coco chez le Dr Jackowski et démarchera **de vive voix** à cette occasion, plutôt que par écrit. Pas d'action de notre côté à prévoir pour ce premier contact (pas d'email à rédiger/envoyer) — si l'utilisateur le demande, on peut préparer un support oral (quelques points clés à dire en rendez-vous, adaptés du modèle d'email) mais ce n'est pas encore demandé.

## Affiliation (en cours d'inscription, novembre 2026)

Piste explorée en complément (pas en remplacement) du Programme partenaire ci-dessus : l'utilisateur s'inscrit comme affilié chez **SantéVet** (assurance santé chien/chat), programme confirmé via le réseau **Awin** — 6€ par lead "intégré" (devis en ligne), cookie de 30 jours. Contact direct pour candidater : `affiliation@santevet.com`. Alternative notée mais non vérifiée en détail : Carrefour Assurance Animaux (via FlexOffers, ~48€/lead annoncé sur un annuaire tiers, conditions non confirmées sur source primaire). Bulle Bleue écarté : pas de programme d'affiliation public trouvé (marque distribuée par Animal Experts/SantéVet, pas de portail d'inscription).

**Statut au 2026-10-15** : le compte publisher Awin est **actif** (Coco Explore, ID 3122486, immatriculé le 13/10/2026), profil complété (description + site ajouté dans "Espaces publicitaires", secteur Retail & Shopping > Animaux). En revanche, **SantéVet n'apparaît pas dans le répertoire des annonceurs Awin en inscription libre** (recherche testée avec et sans accent, filtres réinitialisés puis essai "Finance" — aucun résultat à chaque fois) : le programme est probablement accessible sur invitation uniquement, pas en self-service. Le message ci-dessous a donc été **envoyé directement** à affiliation@santevet.com le 15/10/2026 à 21:36 (depuis contact@cocoexplore.com), adapté pour mentionner l'ID du compte Awin et demander la marche à suivre. **En attente de la réponse de SantéVet** — elle dira si la candidature passe par une invitation Awin à obtenir d'eux, ou par un autre circuit.

### Message envoyé à SantéVet (affiliation@santevet.com) le 15/10/2026

```
Objet : Candidature programme d'affiliation — Coco Explore (voyager avec son chien)

Bonjour,

Je gère Coco Explore (cocoexplore.com), un guide en ligne gratuit qui aide les
propriétaires de chiens à trouver des lieux adaptés partout en France : plages,
restaurants, hébergements, balades, vétérinaires, toiletteurs. Le site couvre
l'ensemble du territoire (101 départements, métropole et outre-mer) avec
plusieurs milliers de fiches.

J'ai créé un compte publisher sur Awin (ID 3122486, profil complété) et je
souhaiterais candidater à votre programme d'affiliation. Je ne le trouve
cependant pas en inscription libre dans le répertoire des annonceurs Awin —
pourriez-vous me dire si votre programme est accessible sur invitation, ou
m'indiquer la marche à suivre pour candidater ?

L'assurance santé pour chien est un sujet très cohérent avec notre audience —
des propriétaires qui voyagent avec leur animal et se posent naturellement la
question de sa couverture en déplacement.

Je prévoirais d'intégrer le lien de façon pertinente, par exemple dans nos
fiches vétérinaires ou dans un article dédié aux conseils de préparation d'un
voyage avec son chien, avec la mention de lien affilié requise.

N'hésitez pas à me dire si vous avez besoin d'informations complémentaires sur
le site pour étudier la demande.

Belle journée à vous,
Damien Fleurot
Coco Explore — cocoexplore.com
```

Pas d'action de notre côté en attendant la réponse de SantéVet. Une fois la marche à suivre connue (et un lien tracké réel obtenu), prévoir son insertion dans 1-2 fiches vétérinaires urgences et/ou un futur article "conseils de Coco" sur la préparation d'un voyage, avec la mention de lien affilié obligatoire (cadre légal français).

### Affiliation hébergements (23/10/2026)

Étude complète dans `AFFILIATION-HEBERGEMENT.md` (non publié). **Décision de l'utilisateur : candidater d'abord au programme Expedia Group** (affiliates.expediagroup.com, géré via Partnerize : 4 % hôtels, 2 % Abritel/Vrbo, cookie 7 jours même appareil, seuil de paiement 30 €). Candidature faite par l'utilisateur lui-même. Booking (via CJ) seulement après avoir clarifié la clause qui interdit de démarcher les hébergeurs présents sur Booking (conflit possible avec le Programme partenaire). **Aucun lien affilié sur le site tant que l'utilisateur n'a pas validé** : intégration prévue = bouton « Voir les disponibilités sur … » sous les infos pratiques, après le site officiel, mention « Lien sponsorisé » + `rel="sponsored"`, uniquement vers la page exacte d'un établissement qui accepte aussi les chiens sur la plateforme, test sur 20 à 50 fiches, phrase à ajouter dans « À propos ».

## Historique — audit performance accueil (octobre 2026, résolu)

Audit PageSpeed Insights (mobile + desktop) mené début octobre 2026 sur `cocoexplore.com`. Tout corrigé et poussé sur `claude/github-connexion-otichf` :
- Polices Google chargées via `<link rel="stylesheet">` au lieu d'un `@import` dans `style.css` (bloquait le rendu).
- Filtre Eleventy `optimizeImg` (dans `eleventy.config.js`) : retire le `fm=jpg` figé dans les URLs Unsplash des fiches et ajoute `auto=format,compress` pour servir du WebP/AVIF. Appliqué partout où une image Unsplash est affichée (`src=`, `imgSrcset`, préchargement LCP dans `base.njk`, `map-data.njk`). **Ne pas toucher** `og:image`/`twitter:image`/JSON-LD, volontairement laissés en JPG forcé (compatibilité réseaux sociaux/Google).
- Accueil (`src/index.njk`) : les ~198 images des sections par catégorie cachées par défaut (`hidden`, une seule visible selon le filtre cliqué) n'ont plus de vraie `src=` au chargement — juste un espace réservé (SVG vide en data URI), avec l'URL réelle dans `data-src`/`data-srcset`. `map.js` (fonction `revealImages`, appelée dans `showCatIds`) ne déclenche leur téléchargement qu'au moment où la section devient réellement visible. Les autres pages (département, fiche, nouveautés, 404) n'ont pas ce problème — leurs images sont déjà toutes visibles au chargement, pas de changement là-bas.

Si le point "Améliorer l'affichage des images" de PageSpeed Insights reste élevé après tout ça, retester en conditions réelles (le réseau de l'environnement Claude Code bloque `cocoexplore.com` et `images.unsplash.com`, donc aucune vérification réseau directe n'a pu être faite depuis cet environnement) plutôt que de supposer qu'il reste un problème.

## Connecteur Parallel Search (novembre 2026) — contourne le blocage réseau des sources de recherche

Le réseau de l'environnement Claude Code bloque l'accès direct (WebFetch) à plusieurs sites utilisés comme sources pour les fiches : `chien.com`, `emmenetonchien.com`, `pagesjaunes.fr`, `justacote.com`, `acceslibre.beta.gouv.fr`, et d'autres annuaires tiers. Jusqu'à présent, les agents de recherche devaient se contenter d'extraits WebSearch tronqués pour ces sites, d'où un grand nombre de fiches en confiance "faible/moyenne" avec la mention "source non consultée directement".

Un connecteur MCP **Parallel Search** (gratuit, sans compte ni clé API — "Free token-efficient search using Parallel") a été connecté au compte et est maintenant disponible dans les sessions qui démarrent après sa connexion. Il expose `mcp__Parallel_Search__web_search` et `mcp__Parallel_Search__web_fetch`. Le fetch se fait depuis les serveurs de Parallel, pas depuis cet environnement — testé et confirmé : il contourne le blocage réseau (ex. `chien.com` entièrement lisible via ce connecteur alors qu'il est inaccessible en WebFetch direct).

**À faire dans les prochains rounds de recherche** : donner aux agents de recherche la consigne explicite d'utiliser `mcp__Parallel_Search__web_fetch` (avec `objective` et éventuellement `search_queries` de l'appel `web_search` précédent) pour lire en entier les pages de ces sites précédemment bloqués, plutôt que de se limiter aux extraits WebSearch. Cela devrait réduire le nombre de fiches "source non consultée directement" et permettre de recouper plus fiablement tarifs/conditions chien/téléphones. Si l'outil n'apparaît pas dans une session (connecteur pas encore chargé), le signaler plutôt que de supposer qu'il est indisponible — les connecteurs ne sont chargés qu'au démarrage d'une session.

## Avis visiteurs — modération (octobre 2026)

Les avis déposés sur les fiches (formulaire ouvert, photo possible) passent par `netlify/functions/avis.mjs` (stockage Netlify Blobs `avis-coco-explore`, une clé par `avisSlug`).

- **Modération avant publication** depuis le 22/10/2026 : tout nouvel avis est `status: "pending"` et n'apparaît sur la fiche qu'après validation. Les avis antérieurs (sans `status`) restent publiés.
- **Page d'admin** : `/admin-avis` (`src/admin-avis.njk`, noindex, hors sitemap) — onglets En attente / Publiés, boutons Valider / Supprimer. Protégée par la variable Netlify **`ADMIN_KEY`** (secret, choisi par l'utilisateur, jamais à écrire dans le dépôt ni dans une conversation).
- **Notification** : à chaque nouvel avis, push envoyé sur ntfy.sh via la variable **`NTFY_TOPIC`** ; l'utilisateur est abonné au canal dans l'app ntfy sur son iPhone.
- **Anti-spam** : champ piège invisible `website` dans le formulaire (rempli = robot, ignoré sans erreur), 5 avis max par visiteur et par heure, admin bloquée 15 min après 5 mauvais mots de passe. Compteurs dans le store Blobs `avis-limites`, IP hachées (jamais en clair).
- Une variable d'environnement modifiée sur Netlify n'est prise en compte qu'au déploiement suivant.

## Guides pratiques (octobre 2026)

Rubrique `/guides` (`src/guides.njk`) : articles « comment voyager avec son chien » dans `src/guides/*.njk` (gabarit `src/_includes/guide.njk`, collection `guides` triée par `order`, URL `/guide-<sujet>`). Chaque guide liste ses `sources` (pages officielles lues en entier) et sa date `updated`, affichée en tête d'article : la mettre à jour à chaque révision. Règle : aucun tarif, délai ou règle sans source lue ; en cas de contradiction entre sources, le dire dans le texte. Les tarifs (SNCF, compagnies aériennes, ferries) changent souvent : à revérifier au moins une fois par an. C'est aussi là qu'ira le lien affilié SantéVet le moment venu (avec la mention « lien affilié »).

## Échanges de liens

Les fiches créées en échange d'un lien (sans paiement) sont suivies dans `ECHANGES-LIENS.md` (racine, non publié). Pas de badge public : seule une ligne discrète `<p class="fiche-collab">Fiche réalisée en collaboration avec …</p>` en bas de fiche. Mettre à jour le tableau à chaque nouvelle collaboration ou lien reçu.

## Demandes de retrait (ne jamais recréer ces fiches)

Quand un professionnel demande à ne plus être référencé : supprimer sa ou ses fiches, ajouter une redirection 301 vers la page catégorie×département (ou la page département) dans `src/_redirects.njk`, et l'inscrire ici pour qu'aucun round de recherche ne le recrée.

| Établissement | Ville | Date | Fiches supprimées |
|---|---|---|---|
| Bande de Truffes (dog wash, pet-sitting, concept store) | Chambéry (73) | 23/10/2026 | `dogwash-bande-de-truffes-chambery`, `dogsitter-bande-de-truffes-chambery` |

**Bande de Truffes — remise en ligne proposée (24/10/2026)** : Sophie Carpentier, la gérante, a répondu en demandant qu'on corrige les tarifs et qu'on présente ses trois activités. 3 fiches ont été rédigées d'après bandedetruffes.fr (pet-sitting, dog wash + concept store, toilettage + balnéo), prêtes dans `propositions/bande-de-truffes/` (hors site publié). Un mail lui a été envoyé avec l'aperçu en PDF ; on y explique que la mention « confiance » était une note interne retirée partout, on propose d'afficher sa note Google avec un lien, et on lui demande un lien vers Coco Explore sur son site (demande, pas une condition). **En attente de sa réponse.** Si elle valide : copier les 3 fichiers dans `src/fiches/`, retirer les 4 redirections `bande-de-truffes` de `src/_redirects.njk`, retirer sa ligne de ce tableau ; si elle met le lien, ajouter la ligne `fiche-collab` et l'inscrire dans `ECHANGES-LIENS.md`. Si elle refuse : ne rien publier, supprimer le dossier de proposition.

## Conventions du projet (voir aussi contexte de session)

- **Tout ce qu'on ajoute doit être lié au chien** (rappel de l'utilisateur, 29/10/2026) : lieux et établissements qui accueillent les chiens (preuve officielle), services pour chiens (vétérinaires, toiletteurs, dogwash, garde, éducation), ou information utile au propriétaire de chien (règle d'interdiction d'un lieu très fréquenté, titre explicite). Jamais un lieu « généraliste » sans rapport avec le chien.
- **Toute nouvelle fiche est créée en mode SIRENE, rigueur maximale, sans exception** (règle de l'utilisateur, 29/10/2026) : chaque information lue sur une source officielle (site de l'établissement, mairie, arrêté, office de tourisme, gestionnaire), rien d'inventé, doutes visibles si les sources divergent, pas de doublon avec une fiche existante. Méthode : `scratchpad/brief-verif.md` + brief de création du chantier en cours.
- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- **Crédits Netlify : regrouper les mises en ligne.** Chaque `git push` sur `claude/github-connexion-otichf` déclenche un déploiement de production, qui consomme des crédits Netlify (le compte a été à court le 23/10/2026, et les déploiements se sont arrêtés). Donc : committer en local autant que nécessaire, mais **ne pousser qu'environ une fois par heure, ou à la fin d'un chantier** — jamais après chaque petit lot. Pour un commit qui ne change pas le site publié (fichiers `.md` à la racine : `CLAUDE.md`, `SEO-PRIORITES.md`, `ECHANGES-LIENS.md`…), ajouter **`[skip netlify]`** dans le message de commit : Netlify ne lance alors aucun déploiement. Attention, un push contenant à la fois un commit `[skip netlify]` et d'autres commits est déployé normalement (c'est le dernier commit poussé qui compte).
- Build de vérification avant tout commit : `npx @11ty/eleventy && node scripts/check-site.mjs` (les deux doivent passer). Sur Netlify, `npm run build` (`scripts/build.mjs`) enchaîne les deux : **si l'un échoue, le déploiement échoue, la version précédente reste en ligne, et l'utilisateur reçoit une notification ntfy « Mise en ligne bloquee » avec le détail de l'erreur** (variable `NTFY_TOPIC`, scope builds + functions, build de production uniquement). Il bloque : plus de 20 pages en noindex, sitemap qui perd des fiches, « confiance X » dans `title`/`description`/`cardTeaser`, photo Unsplash (`heroImage`) partagée par deux fiches françaises, gabarit `{…}` non remplacé sur les pages catégorie. Ne jamais contourner ce contrôle : corriger la cause.
