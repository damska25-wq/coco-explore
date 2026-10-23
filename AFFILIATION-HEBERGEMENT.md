# Affiliation hébergements : étude de faisabilité (fichier de travail, non publié)

Étude du 23/10/2026. Aucune modification du site ici, c'est une analyse avant décision.

**Méthode.** Les pages officielles des programmes (pages « affiliation », conditions générales, FAQ, profils publics d'annonceurs Awin) ont été lues via le connecteur Parallel Search (`web_fetch`). Chaque chiffre est suivi de sa source. Quand une information ne vient que d'un site tiers, c'est écrit **(source tierce)**. Quand rien n'a été trouvé, c'est écrit **non trouvé**. Rien n'a été déduit ni deviné.

**Contexte du site, vérifié dans le dépôt le 23/10/2026.** 2 173 fiches ont `breadcrumbCatId: "hebergements"` : 1 370 « Hébergement », 326 « Hôtel », 185 « Camping », 92 « Hôtel-restaurant », 65 « Gîte », 86 chambres d'hôtes et 5 villages vacances. Nombre de fiches hébergement qui citent une marque (recherche texte, ordre de grandeur seulement) :

| Marque citée | Nombre de fiches |
|---|---|
| ibis | 127 |
| Mercure | 43 |
| Novotel | 20 |
| Adagio | 9 |
| Kyriad, Campanile, B&B Hotels ou Best Western | 147 |
| Gîtes de France | 96 |
| Capfun | 15 |
| Homair | 12 |
| Flower | 10 |
| Yelloh! Village | 9 |
| Sandaya | 9 |
| Huttopia | 9 |
| VVF | 5 |
| Siblu | 4 |
| Les Castels | 3 |
| Pierre & Vacances | 3 |
| Clévacances | 1 |
| Belambra, Center Parcs, Interhome, Vacansoleil | 0 |

---

## 1. Tableau comparatif

Abréviations : « CG » = conditions générales, « s.o. » = sans objet.

| Programme | Existe ? | Réseau | Commission | Cookie / attribution | Conditions d'acceptation | Lien vers un établissement précis | Filtre « animaux » dans le lien | Restrictions notables |
|---|---|---|---|---|---|---|---|---|
| **Booking.com** | Oui | **CJ** pour la France (page FR). La page EN dit « Awin ou CJ selon la région » | Version « Longtail » des CG (PDF Booking) : **25 %** de la commission perçue par Booking jusqu'à 50 séjours réalisés par mois, 30 % (51-150), 35 % (151-500), 40 % (> 500). La page Awin Australie annonce « 4 % » pour l'hébergement, mais pour l'Australie et l'APAC seulement | **Pas de cookie** : « Booking.com does not use cookies to track affiliate reservations ». Le suivi passe uniquement par l'identifiant affilié (AID) dans l'URL | Non trouvé : pas de seuil de trafic publié. Liens interdits sur des sites « inappropriate or unlawful » ou dont on n'est pas propriétaire | **Oui** : liens vers « specific properties », « pre-filtered search results » ou des pages d'atterrissage | Non trouvé dans les pages lues | Ne pas copier le contenu de Booking. Pas d'iframe hors produits officiels. Nom de domaine ressemblant à « Booking » interdit. **« You must not contact Booking.com supply partners directly »**. Paiement sous 60 jours après la fin du mois de départ du client, reporté tant que le total est sous **100 €** (CG Longtail) |
| **Expedia Group** (Expedia, Hotels.com, Vrbo, **Abritel**) | Oui | Programme maison géré par Partnerize (« Performance Horizon Group ») | Hôtel **4 %**, location de vacances (Abritel, Vrbo) **2 %**, forfait 2 %. Calcul sur la valeur nette, séjours terminés seulement | **7 jours**, dernier clic, même appareil | Non trouvé : pas de seuil de trafic publié. Candidature « Apply to join ». Sites « ineligible » listés dans les CG | **Oui** (« Creator Toolbox » : liens vers une page d'établissement). Les CG imposent que l'hébergement lié soit **le même** que celui présenté dans le contenu | Non trouvé | Interdit d'enchérir sur les marques Expedia sans accord écrit. Codes promo seulement s'ils sont fournis par Expedia. Seuil de paiement **30 €**. Paiement 60 à 150 jours après la fin du séjour |
| **Airbnb** | Le programme éditeurs « n'accepte pas les candidatures ». Il existe un « Airbnb Demand Program » pour les blogueurs, via Impact | Impact (Demand Program) | Non trouvé : conditions sur Impact non lues | Non trouvé | « ouvert à certains partenaires éditeurs, influenceurs et blogueurs sur certains marchés » | Non trouvé | Non trouvé | Le programme public Airbnb Associates a fermé le 31/03/2021 **(sources tierces)** |
| **Gîtes de France** | Non trouvé : la page « Partenaires » ne liste que des institutions et fédérations | Non trouvé | Non trouvé | Non trouvé | Non trouvé | s.o. | Le moteur du site officiel a un champ « Animal » (constaté sur la page) | s.o. |
| **Clévacances** | Pas de programme d'affiliation trouvé. Communiqué du 20/06/2024 : « Clévacances s'associe avec Booking ». Le programme Awin « Cleva » (ID 20924) est un fabricant d'aspirateurs, **pas** Clévacances | Peut-être indirectement via Booking (non vérifié fiche par fiche) | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | s.o. |
| **Huttopia** | Non trouvé sur le site officiel | Takeads, statut « Active », CPA, FR **(source tierce)** | 5-10 % selon shopper.com **(source tierce, non fiable)** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Sandaya** | Non trouvé sur le site officiel | TradeTracker, d'après la politique de confidentialité d'un blog britannique **(source tierce)**. FlexOffers indique 2,4 % et 100 jours pour l'Irlande, programme « not currently offering » **(source tierce)** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Le site officiel a une page « Camping Dogfriendly » (constaté sur sandaya.fr) | Non trouvé |
| **Yelloh! Village** | Non trouvé : seulement des partenariats CSE et fidélité sur le site officiel | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Capfun** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Homair** (groupe European Camping Group) | Non trouvé pour Homair France | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Le site officiel a une page « Campsite Dog-friendly » (constaté sur homair.com) | s.o. |
| **Eurocamp UK** (même groupe que Homair) | Oui, mais marché **britannique** | **Awin** (ID 128387) | **4 %** par réservation confirmée | 30 jours sur la fiche Awin, « 28 day cookie » dans le texte de l'annonceur | Non trouvé | Non trouvé | Non trouvé | Peu adapté à un public français (site en anglais, prix en £) |
| **Siblu** | Non trouvé : seule une page Sovrn vide | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Flower Campings** | Non trouvé : seulement un programme de fidélité sur le site officiel | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Les Castels** | Non trouvé : la page « Join us » ne parle que d'adhésion au réseau et de partenaires fournisseurs | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Vacansoleil** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |
| **Campings.com** (distribue Sandaya, Homair, Flower, Tohapi…) | Le site officiel parle de distribution via « les sites internet de nos Partenaires », sans conditions d'affiliation publiques | Programme néerlandais sur affiliate-net.nl (deeplinks oui, SEA « beperkt ») **(source tierce)** | Non trouvé | Non trouvé | Non trouvé | « Deeplinks Ja » **(source tierce)** | Non trouvé | Codes promo et cashback interdits **(source tierce)** |
| **Pierre & Vacances** | La page officielle « Devenir partenaire » vise les programmes de fidélité et clubs avantages (remises contre communication), **pas** l'affiliation | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Le site affiche « Animaux domestiques admis » par résidence (constaté) | s.o. |
| **Center Parcs** | Pas de page officielle trouvée | CJ FR à 5 % et Awin CH/DE/DK à 4 % avec 30 jours, selon avidaffiliate.com **(source tierce)** | 5 % sur CJ FR **(source tierce)** | 30 jours **(source tierce)** | Non trouvé | Deep linking « Yes » sur CJ FR **(source tierce)** | Non trouvé | Aucune fiche Center Parcs sur le site actuellement |
| **Belambra** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Aucune fiche Belambra sur le site |
| **VVF** (villages vacances) | **Oui** | **Awin** (ID 13108) | « Site affinitaire » : **10 %** nouveau client, 2 % ancien client. Codes de réduction : 3,5 % / 2 %. Display : 5 % / 2 % | **30 jours** | « ouvert à tout affilié souhaitant diffuser les différentes offres VVF » | Non trouvé | Non trouvé. **Il faut vérifier village par village si les chiens sont admis** | Cashback interdit. Relayer des codes partenaires interdit (ventes annulées) |
| **Interhome** | Oui (« programme d'affiliation », liens, bannières, iFrame) | Programme maison : portail Partenaire avec identifiant partenaire, statistiques en temps réel, paiements mensuels | Non trouvé (« commission attractive ») | Non trouvé | Inscription sur partner-registration.interhome.group | Liens et iFrame générés depuis le portail (niveau de détail non trouvé) | Non trouvé | Aucune fiche Interhome sur le site |
| **Accor (ALL)** | **Oui** | **Kwanko** pour la France, CJ pour d'autres pays | Les CG donnent « à partir de » 3 % (luxe) et 6 % (haut de gamme, milieu de gamme, économique), mais en précisant que ces chiffres sont indicatifs et « ne s'appliquent qu'à la typologie Cashback ». La FAQ annonce « jusqu'à 15 % pour un panier moyen de 360 € ». **Contradiction entre les deux documents officiels** : le taux réel est à lire dans Kwanko | **30 jours** après le dernier clic | « Tous les sites internet proposant un contenu pertinent en lien avec l'univers du voyage ». Refus automatiques : agences de voyages, contenus non pertinents, trafic non autorisé, **site rattaché à une adresse e-mail personnelle** | Non trouvé de manière explicite : les CG parlent de liens « pointant vers une page du site All.accor.com » | Non trouvé | Achat de mots-clés sur les marques Accor interdit (longue liste de mots-clés négatifs). Site-under interdit. Pas de marque Accor dans le code HTML pour le SEO sans accord écrit. Réservations faites à l'hôtel ou par téléphone non rémunérées |
| **Spécifique « vacances avec animaux »** | Rien trouvé d'utilisable en France. Holidog est une plateforme de pet-sitting, sans programme d'affiliation trouvé. Starwood Pet Travel (FlexOffers) est américain et porte sur le transport d'animaux **(source tierce)** | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé | Non trouvé |

### Sources lues (URL)

- **Booking.com**
  - Page affiliation FR (inscription via CJ) : https://www.booking.com/affiliate-program/v2/index.fr.html
  - Page EN (« Awin or CJ ») : https://www.booking.com/affiliate-program/v2/index.en-gb.html
  - CG « Longtail Partner Terms » (barème 25-40 %, paiement, seuil 100 €) : https://image.email.partnerships.booking.com/lib/fe3011737364047d711079/m/1/bea2428a-9a15-4f65-b450-2d0d12b0495a.pdf
  - Guidelines (pas de cookie, AID, interdictions) : https://affiliates.support.booking.com/kb/s/article/Guidelines-for-Compliant-Use-of-Booking-com-Affiliate-Services
  - Liens (vers un établissement précis, résultats préfiltrés) : https://affiliates.support.booking.com/kb/s/article/Links
  - Page Awin Australie (4 %) : https://www.awin.com/au/advertisers/partner/booking.com
- **Expedia Group**
  - Commissions et cookie 7 jours : https://affiliates.expediagroup.com/commission-terms
  - Accueil du programme : https://affiliates.expediagroup.com/home
  - Centre d'aide (paiement 60-150 jours, même appareil) : https://help.affiliates.expediagroup.com/hc/en-us
  - CG (mots-clés, codes promo, seuil 30 €, même hébergement) : https://affiliates.expediagroup.com/doc/affiliate?locale=en_US
- **Airbnb** : https://www.airbnb.fr/help/article/4236. La fermeture d'Airbnb Associates en 2021 vient de sources tierces (rentalscaleup.com, affilibuddy.com, hospitable.com).
- **Gîtes de France** : https://www.gites-de-france.com/fr/partenaires et https://www.gites-de-france.com/fr/faq
- **Clévacances** : https://www.clevacances.com/fr/pages/7-espace-presse. Le profil Awin « Cleva » : https://ui.awin.com/merchant-profile/20924
- **Eurocamp UK sur Awin** : https://ui.awin.com/merchant-profile/128387
- **VVF sur Awin** : https://ui.awin.com/merchant-profile/13108
- **Accor**
  - Page affiliation : https://all.accor.com/a/fr/affiliate-program.html
  - CG : https://all.accor.com/a/content/dam/all/global-marketing/brand-experience/partnership/contract/msa_d_0000001.pdf
  - FAQ : https://all.accor.com/a/content/dam/all/global-marketing/brand-experience/partnership/contract/msa_d_0000003.pdf
- **Interhome** : https://www.interhome.group/fr-ca/programme-partenaire et https://www.interhome.group/fr-ca/programme-partenaire/mod%C3%A8les-de-partenariats
- **Pierre & Vacances** : https://www.pierreetvacances.com/fr-fr/devenir-partenaire_om
- **Campings.com** : https://join.campings.com/fr/home ; source tierce : https://affiliate-net.nl/programmas/campings/
- **Sources tierces sur les campings**
  - Huttopia : https://takeads.com/merchants/huttopia-fr/ et https://www.shopper.com/partnerships/huttopia-com-affiliate-program
  - Sandaya : https://www.flexoffers.com/affiliate-programs/sandaya-camping-ie-affiliate-program et https://www.familycampingeurope.co.uk/privacy-policy/
  - Center Parcs : https://avidaffiliate.com/programs/centerparcs-ch

---

## 2. Recommandation

### Ce qu'il faut retenir

1. **Les grands réseaux de campings français (Yelloh!, Sandaya, Huttopia, Capfun, Siblu, Flower, Castels) n'ont pas de programme d'affiliation public vérifiable** sur leurs sites officiels. Les seules traces viennent de sites tiers (Takeads, TradeTracker, FlexOffers), avec des taux non confirmés. Inutile de construire une stratégie dessus pour l'instant.
2. **Les deux seules options qui couvrent largement les 2 173 fiches sont Booking.com et Expedia (Hotels.com/Abritel).** Elles permettent de lier la page exacte d'un établissement, à condition qu'il soit présent sur la plateforme.
3. **Accor (via Kwanko) a un intérêt ciblé** : plus de 190 fiches citent ibis, Mercure, Novotel ou Adagio (recherche texte, à affiner). Les conditions sont claires et le cookie dure 30 jours.
4. **VVF (Awin, 10 % nouveau client, cookie 30 jours)** passe par le compte Awin déjà actif. Mais seules 5 fiches citent VVF, et l'accueil des chiens n'est pas vérifié village par village.
5. **Gîtes de France** (96 fiches qui le citent) : aucun programme d'affiliation trouvé. Le lien vers leur site reste un lien normal, non rémunéré.

### Ordre de candidature conseillé

1. **Expedia Group Affiliate Program** en premier.
   - Inscription directe, sans passer par un réseau tiers.
   - Conditions publiques et précises : 4 % hôtel, 2 % Abritel, seuil de paiement 30 €.
   - Lien vers la page exacte de l'établissement, avec obligation contractuelle qu'il s'agisse bien du même établissement. C'est cohérent avec la règle « pas de lien vers un hébergement qui n'accepte pas les chiens ».
   - Limite : le cookie ne dure que 7 jours et doit être cliqué sur le même appareil. Sur un trafic surtout mobile, où l'on prépare souvent son voyage sur téléphone puis on réserve plus tard, une partie des réservations ne sera pas attribuée.
2. **Booking.com via CJ** en deuxième.
   - Il faut ouvrir un compte éditeur CJ : le compte Awin ne suffit pas, puisque la page française renvoie vers CJ.
   - Le suivi par AID dans l'URL évite la question du cookie, mais il n'est pas clair si une réservation faite plus tard sans repasser par le lien est attribuée. Les pages lues ne le disent pas.
   - Le barème « 25 % de la commission de Booking » vient des CG « Longtail ». Le contrat signé via CJ peut être différent : à lire au moment de l'inscription.
   - Clause sensible : « You must not contact Booking.com supply partners directly ». Le **Programme partenaire** du site démarche justement des professionnels, dont des hôtels qui peuvent être sur Booking. **À clarifier avec Booking/CJ avant de candidater.**
3. **Accor via Kwanko** en troisième, si l'utilisateur accepte d'ouvrir un compte Kwanko.
   - Point bloquant possible : refus automatique d'un « site internet rattaché à une adresse e-mail personnelle ». Il faut candidater avec contact@cocoexplore.com.
4. **VVF sur Awin** en option, après vérification de l'accueil des chiens dans les 5 villages concernés. Le compte Awin existe déjà, donc le coût d'essai est faible.
5. **À ne pas poursuivre pour l'instant** : Airbnb (programme fermé aux nouveaux éditeurs, sauf peut-être le « Demand Program » sur Impact, non vérifié), Gîtes de France et Clévacances (pas de programme trouvé), et les chaînes de campings (rien de vérifiable). Interhome, Center Parcs et Belambra ne sont pas utiles : le site n'a aucune fiche de ces marques.

### Gains à attendre (estimation prudente)

**Ceci est une estimation en ordre de grandeur. Ce ne sont pas des données mesurées.** Les seules données connues sont environ 650 clics Google en 3 mois sur tout le site, soit environ 7 par jour, toutes pages confondues. La part de ces visites qui arrive sur des fiches hébergement **n'est pas connue** : à mesurer dans Search Console avant toute décision.

Raisonnement par tranche, tous les pourcentages ci-dessous étant des **hypothèses** :

- Si quelques centaines de visites par mois arrivent sur des fiches hébergement, et qu'une petite partie clique sur « Voir les disponibilités », on parle de quelques dizaines de clics sortants par mois.
- Avec un cookie de 7 jours (Expedia), sans garantie de réservation, et des clics surtout sur mobile, on parle de **0 à quelques réservations par mois**.
- Une réservation d'hôtel à quelques centaines d'euros rapporte environ 4 % chez Expedia, soit **quelques euros à une quinzaine d'euros par réservation**. Une location Abritel rapporte 2 %. Chez Booking, le gain dépend de la commission que Booking prend à l'hôtel, qui n'est pas publiée dans les pages lues : le montant par réservation n'est donc **pas calculable** ici.
- **Ordre de grandeur réaliste la première année : de 0 € à quelques dizaines d'euros par mois.** Il faut y ajouter un délai de paiement long (après la fin du séjour, plus 60 à 150 jours chez Expedia) et des seuils de paiement (30 € chez Expedia ; 100 € dans les CG Longtail de Booking).
- Ce revenu ne grandit qu'avec le trafic. C'est un complément, pas une source de revenu principale. Le Programme partenaire (19 à 29 €/mois par pro) reste plus rentable par unité, s'il trouve preneur.

---

## 3. Règles à respecter en France

### 3.1 Signaler clairement le lien rémunéré (sources légales lues)

- **Article 20 de la LCEN** (loi n° 2004-575) : « Toute publicité, sous quelque forme que ce soit, accessible par un service de communication au public en ligne, doit pouvoir être clairement identifiée comme telle. Elle doit rendre clairement identifiable la personne physique ou morale pour le compte de laquelle elle est réalisée. »
  - https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000018048180
  - Conséquence : le bouton doit indiquer la plateforme (« sur Booking.com ») **et** son caractère commercial.
- **Code de la consommation, L121-4, 11°** : est réputé trompeur le fait « d'utiliser un contenu rédactionnel dans les médias pour faire la promotion d'un produit ou d'un service alors que le professionnel a financé celle-ci lui-même, sans l'indiquer clairement ».
  - https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563107
  - Attention : ce texte vise le cas où c'est le professionnel qui paie le contenu. Il concerne donc surtout le Programme partenaire. L'affiliation relève plutôt de la LCEN et de la règle générale sur les pratiques trompeuses (L121-3, auquel la loi de 2023 renvoie).
- **Loi n° 2023-451 du 9 juin 2023 (loi « influenceurs »)**
  - Article 1 : vise « les personnes physiques ou morales qui, à titre onéreux, mobilisent leur notoriété auprès de leur audience pour communiquer au public par voie électronique des contenus visant à faire la promotion […] de biens, de services ». https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050468930
  - Article 5-2 (en vigueur depuis le 08/11/2024) : l'absence de « mention claire, lisible et compréhensible […] de l'intention commerciale », « dès lors que cette intention ne ressort pas déjà du contexte », est une pratique commerciale trompeuse. Mentions possibles : « publicité », « collaboration commerciale » ou « une mention équivalente adaptée ». https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050457275
  - **Est-ce que cette loi s'applique à un site-guide qui touche des commissions ? Ce n'est pas tranché dans les textes lus.** La définition (« mobilisent leur notoriété auprès de leur audience ») n'exclut pas un site éditorial. Par prudence, on applique la même règle de transparence, ce qui ne coûte rien.
  - Sanctions prévues à l'article 5 : deux ans d'emprisonnement et 300 000 € d'amende. https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050468897
- **DGCCRF**
  - La fiche pratique de la DGCCRF donne comme mentions acceptables « communication commerciale », « publicité », « partenariat rémunéré avec », « #sponsorisé par », etc., « de façon visible immédiatement et en français ». https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/promotion-faite-par-les-influenceurs-et-achat-les-reseaux-sociaux
  - Le guide de bonne conduite (juin 2026) renvoie aux recommandations de l'ARPP. https://www.economie.gouv.fr/files/files/2026/Guide-influence-commerciale.pdf
  - **Aucun passage spécifique aux « liens d'affiliation » n'a été trouvé** dans les extraits lus de ce guide.
- **ARPP** : la recommandation « Communication publicitaire numérique » existe (https://www.arpp.org/wp-content/uploads/2021/12/Recommandation-Communication-Publicitaire-Numerique-ARPP.pdf). Seul son extrait a été lu, pas le texte complet. La recommandation « Mentions et renvois », citée par economie.gouv.fr, n'a pas été lue.
- **Libellé conseillé**, qui couvre tous ces textes : afficher à côté du bouton **« Lien sponsorisé »** ou **« Lien affilié (publicité) »**, avec une info-bulle ou une ligne : « Si vous réservez via ce lien, Coco Explore touche une commission de [plateforme], sans surcoût pour vous. » « Lien affilié » seul est peu compris du grand public. La DGCCRF demande une mention « visible immédiatement et en français », donc on évite les termes anglais et le jargon.
- **SEO** : Google demande de marquer avec `rel="sponsored"` les liens « qui représentent des annonces ou des emplacements payants » (`nofollow` reste acceptable). https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links?hl=fr

### 3.2 Neutralité, cohérente avec la page « À propos »

La page `src/a-propos.njk` promet que « le contenu et les informations de chaque fiche restent les mêmes pour tous, jamais influencés par un paiement ». Pour tenir cette promesse :

- **Le lien affilié n'a aucun effet sur le classement.**
  - Il ne déclenche aucun badge et n'entre pas dans `partnersFirst` ni dans le filtre `related`.
  - L'ordre des fiches (`order`), les pages département, catégorie et ville, et le bloc « À proximité » ne changent pas selon qu'une fiche a un lien affilié ou non.
  - Ne pas confondre avec le badge « Partenaire », qui reste le seul dispositif de mise en avant payante.
- **Le lien vers le site officiel reste affiché** et garde la priorité visuelle. Le lien affilié s'ajoute, il ne remplace jamais le contact direct (téléphone, site).
- **Pas de lien affilié en échange d'une évaluation plus favorable** : le texte de la fiche ne change pas.
- **Mettre à jour « À propos »** avec une phrase sur l'affiliation, par exemple : « Certaines fiches proposent un lien de réservation vers une plateforme (Booking.com, Expedia…) qui nous verse une petite commission. Ces liens sont signalés, sans surcoût, et n'influencent ni le contenu ni l'ordre des fiches. »
- **Point L111-7 du Code de la consommation**, à garder en tête : les « places de marché » et « comparateurs en ligne » doivent informer sur toute rémunération qui influence le classement (https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033219601). Coco Explore n'est pas un comparateur de prix, mais garder un classement indépendant des commissions évite toute discussion sur ce point.

### 3.3 Jamais de lien vers un hébergement qui n'accepte pas les chiens

- Un lien affilié n'est posé que si la fiche a été vérifiée comme acceptant les chiens **et** si la page de la plateforme indique elle aussi que les animaux sont admis.
  - En cas de contradiction (par exemple la fiche dit « chiens acceptés » mais Booking dit « animaux non admis »), **pas de lien**, et le doute est signalé dans la fiche comme d'habitude.
- Le lien pointe vers **la page de l'établissement** sur la plateforme, jamais vers une recherche générale de la ville. Une recherche générale enverrait le lecteur vers des hébergements non vérifiés pour les chiens, ce qui contredit l'objet du site.
  - Expedia impose d'ailleurs déjà que l'hébergement lié soit le même que celui présenté (CG, section 9).
- Le filtre « animaux acceptés » dans les URL Booking ou Expedia n'a **pas été trouvé** dans la documentation officielle lue. Ne pas utiliser de paramètre d'URL non documenté.
- À chaque round de vérification des fiches, revérifier aussi la politique animaux de la page liée. Noter la date de vérification.
- Côté Booking : ne pas reprendre de texte ni de photos de Booking dans les fiches (« must not copy content »). Les fiches existantes sont rédigées et illustrées par Unsplash, ce qui est compatible.

---

## 4. Proposition d'intégration discrète (sans code)

**Emplacement.** Dans la fiche hébergement, **sous les infos pratiques** (bloc `infoItems` : adresse, téléphone, site, catégorie), avant le corps du texte ou juste après.

**Contenu du bloc « Réserver »** :

1. En premier : le lien **« Site officiel »**, déjà présent dans `infoItems`. Il reste en premier et n'est pas rémunéré.
2. En dessous, un bouton secondaire, plus discret que le badge Partenaire : **« Voir les disponibilités sur Booking.com »** (ou « …sur Hotels.com », « …sur Abritel »).
   - Juste à côté, en petit mais lisible : **« Lien sponsorisé »**.
   - Une ligne d'explication sous le bouton : « Coco Explore touche une commission si vous réservez via ce lien, sans surcoût pour vous. Cela ne change ni le contenu ni l'ordre des fiches. »
   - Attributs du lien : `rel="sponsored noopener"`, ouverture dans un nouvel onglet.
3. Une seule plateforme par fiche, ou deux au maximum, pour ne pas transformer la fiche en comparateur.

**Données à prévoir dans le frontmatter** (pour plus tard, rien n'est créé maintenant) : la plateforme, l'URL exacte de l'établissement, la date de vérification « chiens acceptés sur la plateforme », et éventuellement un label de suivi (Booking permet un `label` par emplacement). Sans URL vérifiée, le bloc ne s'affiche pas.

**Ce qu'on ne fait pas** :

- Pas de widget de recherche ni de bannière.
- Pas de lien sur les pages département, catégorie ou accueil.
- Pas de lien dans `cardTeaser`, `title` ni `description`.
- Pas d'effet sur l'ordre des fiches ni sur le bloc « À proximité ».

**Déploiement progressif.**

- Commencer par un **lot test de 20 à 50 fiches** à fort trafic, repérées dans Search Console, et présentes sur la plateforme avec « animaux admis ».
- Mesurer 2 à 3 mois : clics sur le bouton (statistiques de la plateforme) et réservations.
- Décider ensuite d'étendre ou non.
- Si le lot test est intégré au site, le faire en un seul push, conformément à la règle des crédits Netlify.

**Contrôle automatique possible**, à décider : faire échouer `scripts/check-site.mjs` si une fiche porte un lien affilié sans date de vérification « chiens », ou sans mention « Lien sponsorisé » dans le HTML généré.

---

## 5. Points non confirmés

1. **Booking.com**
   - Barème réellement appliqué aux affiliés inscrits via CJ en France : le barème 25-40 % vient d'une version « Longtail » des CG Booking, peut-être différente du contrat CJ.
   - Attribution d'une réservation faite plus tard sans repasser par le lien : Booking dit ne pas utiliser de cookie.
   - Existence d'un paramètre d'URL officiel « animaux acceptés ».
   - Seuil de trafic éventuel pour être accepté.
   - Portée exacte de « You must not contact Booking.com supply partners directly » par rapport au Programme partenaire du site, qui démarche des hôtels. **À clarifier avant candidature.**
2. **Expedia** : critères d'acceptation précis (seuil de trafic, langue), et paramètre « animaux » dans les liens.
3. **Airbnb** : conditions du « Airbnb Demand Program » sur Impact (commission, cookie, éligibilité des sites en France). Non lues.
4. **Accor** : taux réellement appliqué sur Kwanko (CG « à partir de 3 %/6 % » contre FAQ « jusqu'à 15 % »), et possibilité de lier la page exacte d'un hôtel.
5. **VVF** : quels villages acceptent les chiens, et possibilité de lier un village précis.
6. **Campings** (Huttopia, Sandaya, Yelloh!, Capfun, Homair FR, Siblu, Flower, Castels, Vacansoleil) : aucune information officielle. Les mentions Takeads, TradeTracker et FlexOffers sont tierces et non vérifiées. On pourrait chercher ces marques directement dans le répertoire des annonceurs de l'interface Awin (connecté avec le compte 3122486) et sur CJ et Kwanko après inscription. Ces répertoires ne sont pas visibles publiquement.
7. **Center Parcs FR** (CJ 5 %, source tierce) et **Interhome** (taux non publié) : non confirmés, et sans fiche concernée sur le site.
8. **Gîtes de France et Clévacances** : absence de programme constatée sur leurs pages publiques. Une demande directe par e-mail pourrait confirmer.
9. **Champ d'application de la loi n° 2023-451** à un site-guide affilié : non tranché dans les textes lus. La mention « Lien sponsorisé » est appliquée par prudence.
10. **ARPP** : recommandations « Communication publicitaire numérique » et « Mentions et renvois » non lues en entier.
11. **Trafic réel des fiches hébergement** : inconnu. C'est la donnée qui détermine tout le reste de l'estimation.

---

## 6. Lot test retenu (23/10/2026)

**Décision de l'utilisateur : on s'arrête à 10 hôtels pour l'instant, pas d'élargissement tant que la candidature Expedia Group n'est pas acceptée.** Recherche faite via Parallel Search (web_search + web_fetch), aucune fiche du site modifiée, aucun compte créé, aucun lien généré.

Point de départ : les ~40 fiches hébergements les plus vues dans Search Console (déjà enrichies, voir section D de `SEO-PRIORITES.md`). Sur un premier sous-ensemble de 32 fiches vérifiées une à une sur Expedia/Hotels.com/Abritel, seuls 10 hôtels sont confirmés — les 19 campings du lot et 2 autres hôtels (Hostellerie de Levernois, ibis budget Orly Rungis, présents sur Booking mais pas trouvés sur Expedia/Hotels.com) ont été écartés. Aucun résultat sur Abritel pour l'ensemble du lot (cohérent : Abritel cible les locations privées, pas les hôtels ni les campings classiques).

### Les 10 hôtels confirmés

| Fiche | Établissement | Trouvé sur | Politique chien confirmée sur la plateforme |
|---|---|---|---|
| `chateau-grand-barrail-saint-emilion.njk` | Château Hôtel Spa Grand Barrail (Saint-Émilion) | Expedia | 20 €/animal/jour, chambres spécifiques — cohérent avec la fiche |
| `domaine-riberach-belesta.njk` | Domaine Riberach (Bélesta) | Expedia | 15 €/animal/nuit — cohérent |
| `hotel-bourgogne-cluny.njk` | Hôtel de Bourgogne (Cluny) | Hotels.com | 15 €/animal/séjour — cohérent (légère différence de formulation nuit/séjour avec la fiche, pas de contradiction de fond) |
| `hotel-cote-saint-jacques-joigny.njk` | La Côte Saint-Jacques & Spa (Joigny) | Expedia | Gratuit (« pets stay free ») — cohérent |
| `hotel-dauphin-laigle-61.njk` | Hôtel du Dauphin / Brit Hotel (L'Aigle) | Expedia | 10 €/animal/nuit, chiens uniquement — cohérent |
| `hotel-duc-de-padoue-corte-2b.njk` | Hôtel Duc de Padoue (Corte) | Expedia | 7,50 €/animal/nuit — cohérent |
| `hotel-bb-albi.njk` | B&B Hôtel Albi | Expedia (+ Hotels.com via Google Hotels) | 6 €/nuit — cohérent |
| `hotel-ithurria-ainhoa.njk` | Hôtel Ithurria (Ainhoa) | Expedia | 12 €/animal/jour, chiens uniquement — cohérent |
| `hotel-splendid-dax.njk` | Hôtel & Spa Le Splendid (Dax) | Expedia + Hotels.com | 14-15 €/nuit, 1 animal max 8 kg — cohérent (léger écart de tarif selon plateforme) |
| `relais-bernard-loiseau-saulieu.njk` | Relais Bernard Loiseau (Saulieu) | Expedia | 25 €/animal/nuit — cohérent |

**1 cas laissé de côté par prudence** (ni validé ni écarté) : `hotel-bb-montauban.njk` (B&B Hôtel Montauban) — référencé sur Expedia (visible via un avis client dans un guide tiers), mais l'URL de fiche propre et le texte exact de la politique chien n'ont pas pu être confirmés directement. À revérifier si on l'ajoute au lot un jour.

### Prochaine étape (seulement une fois la candidature Expedia acceptée)

1. Se connecter à l'espace affilié Expedia Group (Creator Toolbox / Partnerize) et vérifier, pour chacun des 10 hôtels ci-dessus, que l'établissement est bien disponible dans l'outil de génération de liens.
2. Générer le lien de suivi (deep link) vers la page exacte de chaque établissement.
3. Revérifier à ce moment-là que la politique chien affichée sur la page liée n'a pas changé depuis cette recherche (23/10/2026).
4. Seulement à ce stade : intégrer les 10 boutons sur le site, selon le format décrit en section 4 (bouton « Voir les disponibilités sur Expedia », mention « Lien sponsorisé », `rel="sponsored noopener"`, un seul push conformément à la règle des crédits Netlify).
5. Ne pas élargir le lot au-delà de ces 10 avant d'avoir mesuré les premiers résultats (clics/réservations dans le tableau de bord Expedia).
