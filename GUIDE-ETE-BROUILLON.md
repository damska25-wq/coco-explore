# Brouillon — Guide "Vacances d'été avec son chien"

> **Statut : brouillon de travail, non publié.** Ce fichier est volontairement hors de `src/` (pas de build Eleventy, invisible sur le site). Publication prévue en **mars-avril 2027** : copier le contenu ci-dessous dans un nouveau fichier `src/guides/ete-chien.njk`, avec le frontmatter exact du gabarit (voir modèle dans `src/guides/regles-plages-chien.njk` ou `src/guides/hiver-neige-chien.njk`), puis **revérifier que toutes les sources listées en bas sont toujours d'actualité** (en particulier les montants d'amende, qui peuvent changer, et les pages gouvernementales qui bougent parfois d'URL).

## Frontmatter prévu pour la version finale

```yaml
---
layout: guide.njk
permalink: "{{ permalinkPath }}"
permalinkPath: guide-ete-chien.html
title: "Vacances d'été avec son chien : chaleur, voiture, plage et hébergement"
description: "Coup de chaleur, transport en voiture, hydratation, plages et hébergements climatisés : tout pour des vacances d'été sereines avec son chien."
h1: "Les vacances d'été avec son chien"
kicker: "Vacances d'été"
order: [à déterminer selon le nombre de guides publiés au moment de la bascule — actuellement 8 guides, donc probablement 9, mais recompter dans src/guides/*.njk avant de fixer la valeur]
updated: "[date de la bascule, pas celle de ce brouillon — revérifier les sources avant de la fixer]"
readingTime: 7
sources: [voir la liste en bas de ce brouillon, au même format label + url]
related: ["plage-chien", "hebergement-chien", "veterinaire-chien", "balade-chien"]
---
```

Note datée : ce brouillon a été rédigé et sourcé le **23 octobre 2026**. Les montants d'amende (Code de la route, Code pénal) et les pages gouvernementales/ANSES citées sont stables dans le temps mais pas immuables — un rapide contrôle avant publication suffit, pas besoin de tout rechercher à nouveau si rien n'a changé.

---

## Corps du guide (brouillon)

Les vacances d'été sont la meilleure saison pour voyager avec son chien — et celle qui demande le plus de vigilance. La chaleur est, de loin, le premier risque : le coup de chaleur est l'une des urgences vétérinaires les plus fréquentes et les plus graves de l'été. Voici comment le reconnaître, comment transporter ton chien en voiture sans risque, où et comment le faire boire, et ce qui compte vraiment dans un hébergement en pleine canicule.

### Le coup de chaleur : la première urgence de l'été

Le chien se refroidit très mal : il ne transpire presque pas (seulement un peu par les coussinets) et régule sa température essentiellement en **haletant**. Quand l'air ambiant est déjà chaud, ce mécanisme devient vite inefficace — c'est pourquoi un coup de chaleur peut s'installer en quelques minutes, y compris chez un chien en bonne santé.

**Les chiffres de température varient un peu selon les sources consultées** (il faut le dire plutôt que trancher à l'aveugle) : la température normale d'un chien se situe entre 37,8 °C et 39,5 °C selon les sources ; on parle de coup de chaleur net au-delà de 40,5 °C pour la plupart des sites vétérinaires consultés (Santévet, Le Mag du Chien/Ouest-France), certains évoquant un seuil d'alerte dès 39,5 °C. Au-delà de 41 °C, les organes vitaux (cœur, cerveau, reins) commencent à souffrir sérieusement ; le centre hospitalier universitaire vétérinaire de Montréal et les Urgences Vétérinaires françaises (3115) sont unanimes sur ce point : c'est une urgence où le pronostic vital est engagé, et chaque minute compte.

**Sont plus à risque** : les chiens aux museaux courts/écrasés (bouledogues, carlins, boxers…), les chiens âgés, ceux qui souffrent déjà de troubles respiratoires, cardiaques ou d'obésité, et plus généralement tout chien laissé en plein soleil, en voiture, ou soumis à un effort intense par forte chaleur.

**Les signes à repérer** (compilés à partir de plusieurs sources vétérinaires concordantes — Santévet, urgences-veterinaires.fr, Dr Pierre Fabing cité par Le Figaro et par ICI/France Bleu) :
- halètement rapide, bruyant, et de plus en plus intense ;
- langue très sortie, salive épaisse et abondante ;
- gencives qui deviennent rouge foncé, voire violacées ;
- le chien cherche désespérément un endroit frais, ou au contraire devient faible, abattu, refuse d'avancer ;
- stade avancé : démarche instable, tremblements, vomissements, convulsions, perte de connaissance.

**Les premiers gestes, en attendant le vétérinaire** (cohérents entre les sources, avec une précision importante à retenir) :
1. Mets immédiatement le chien à l'**ombre** ou dans un endroit frais et ventilé.
2. Rafraîchis-le **progressivement** avec de l'eau tempérée (pas glacée) — insiste sur le ventre, les aisselles et les coussinets. Le Dr Fabing (cité par ICI/France Bleu) insiste : l'eau glacée ou un bain très froid peuvent provoquer un choc thermique qui empêche l'évacuation de la chaleur accumulée — **c'est contre-productif**, même si l'intuition pousse à faire l'inverse.
3. Appelle les urgences vétérinaires **sans attendre**, même si le chien semble déjà reprendre du poil de la bête : des complications (rénales, hépatiques) peuvent apparaître plusieurs heures après l'épisode.

**Pour l'éviter** : sors ton chien aux heures fraîches (tôt le matin, tard le soir), donne-lui à manger tôt/tard plutôt qu'en pleine journée (son appétit baisse avec la chaleur), maintiens-le à l'ombre, évite tout effort physique entre 12 h et 16-17 h, et attention au bitume/goudron qui peut brûler les coussinets même quand l'air ambiant semble supportable.

<div class="callout">Le conseil de Coco : mon humain pose toujours le dos de sa main sur le trottoir avant de me faire traverser en été. Si c'est trop chaud pour sa main, c'est trop chaud pour mes coussinets — et on change de trottoir ou on attend le soir.</div>

### Voiture : ne jamais laisser seul, bien attacher

**Ne jamais laisser son chien seul dans une voiture en été**, même pour « deux minutes » de courses, même vitres entrouvertes, même à l'ombre apparente. Le ministère de l'Intérieur (cité par CNEWS) est formel : l'habitacle peut dépasser 40 °C en moins de dix minutes, et grimper autour de 60 °C en un quart d'heure en cas de canicule. L'ANSES le rappelle aussi dans sa fiche « Santé et fortes chaleurs » : ne laissez pas vos animaux dans une voiture à l'arrêt, ils risqueraient de se déshydrater — et plus que ça, de faire un coup de chaleur mortel.

**Ce que tu risques légalement si tu le fais** : laisser un animal domestique dans des conditions qui lui infligent des souffrances constitue un **mauvais traitement** au sens de l'article R654-1 du Code pénal (contravention de 4ᵉ classe). Le montant maximal d'une contravention de 4ᵉ classe, fixé par l'article 131-13 du Code pénal, est de **750 €** — c'est le chiffre que reprend CNEWS pour ce cas précis, et le tribunal peut en plus décider de retirer l'animal à son propriétaire.

**Si tu croises un chien enfermé en plein soleil** : la marche à suivre prudente, rappelée par la Fondation Assistance aux Animaux, est de **prévenir la police ou la gendarmerie** avant d'intervenir, pour qu'un représentant des forces de l'ordre soit présent (ou effectue lui-même l'ouverture). Le Code pénal protège toutefois celui qui casse une vitre pour sauver un animal en danger immédiat, au titre de l'**état de nécessité** (article 122-7 du Code pénal) : « N'est pas pénalement responsable la personne qui, face à un danger actuel ou imminent qui menace elle-même, autrui ou un bien, accomplit un acte nécessaire à la sauvegarde de la personne ou du bien, sauf s'il y a disproportion entre les moyens employés et la gravité de la menace. » Dans l'urgence, mieux vaut quand même essayer de joindre les secours en parallèle : cela évite une contestation ultérieure du propriétaire du véhicule.

**Pendant le trajet** : le Code de la route n'a pas d'article spécifique au transport des animaux de compagnie, mais l'article R412-6-II s'applique par extension — « les possibilités de mouvement et le champ de vision [du conducteur] ne doivent pas être réduits par le nombre ou la position des passagers [ni] par les objets transportés ». Un chien qui circule librement dans l'habitacle et gêne la conduite expose donc à une **amende forfaitaire de 35 €** (contravention de 2ᵉ classe, minorée à 22 € en paiement rapide, majorée jusqu'à 150 € en cas de contestation jugée infondée). **Point de contradiction entre les sources** à signaler : plusieurs sites grand public (digiSchool, L'Argus, Franck Cohen Avocat) évoquent aussi une amende plus lourde de 135 € si l'animal est assimilé à un « passager non attaché » au sens de l'article R412-1 (ceinture de sécurité) — mais L'Argus souligne que cette interprétation est **juridiquement contestable**, un animal n'ayant pas le statut juridique de « passager » en droit français. Dans le doute, autant installer son chien correctement :
- **harnais de sécurité** clipsé à la ceinture (adapté aux chiens de moins de 20 kg environ) ;
- **caisse de transport rigide** ou sac fermé, attaché par la ceinture ;
- **grille ou filet de séparation** entre l'habitacle et le coffre pour les grands chiens.

**Pour le confort pendant le trajet** : pauses toutes les deux heures, eau proposée régulièrement, pas de repas copieux juste avant de partir (risque de mal des transports), et bien sûr — on ne le répétera jamais assez — **jamais seul dans la voiture sur une aire d'autoroute**, même le temps d'un café.

### Plages : voir notre guide dédié

Les chiens ne sont pas automatiquement acceptés sur toutes les plages, et les règles changent énormément d'une commune à l'autre — interdiction totale, créneaux horaires (souvent tôt le matin et en soirée en été), laisse obligatoire, zone réservée... Plutôt que de redire ici ce qui est déjà expliqué en détail, consulte notre guide **[Chiens sur la plage : comprendre les règles](/guide-regles-plages-chien.html)**, qui couvre les arrêtés municipaux, les parcs nationaux et les amendes encourues. Pour trouver une plage qui accepte les chiens près de ta destination, direction notre page **[plages où les chiens sont acceptés](/plage-chien)**.

### Eau : boire plus, et savoir où ne pas le laisser boire

**Les besoins augmentent fortement en été.** La plupart des sources vétérinaires convergent autour de **50 à 70 ml d'eau par kilo de poids corporel et par jour** en temps normal (soit environ 1 à 1,5 L pour un chien de 20 kg), une quantité qui peut **doubler** par forte chaleur ou après un effort (Santévet, La Compagnie des Animaux/Dr Muriel Alnot, PharmaPets). Laisse donc de l'eau fraîche et propre à volonté, change-la régulièrement, et en balade emporte toujours une gourde et une gamelle pliable plutôt que de compter sur les points d'eau rencontrés en chemin.

**Signes de déshydratation à surveiller** (sources concordantes — Santévet, Husse, Le Parisien) :
- gencives et truffe sèches, collantes ;
- perte d'élasticité de la peau (test du pli de peau : pince délicatement la peau entre les omoplates — chez un chien bien hydraté, elle revient immédiatement en place ; si elle reste « tentée », c'est un signe de déshydratation) ;
- fatigue inhabituelle, abattement, perte d'appétit ;
- yeux qui paraissent enfoncés ;
- urine plus sombre et plus concentrée.
En cas de doute, surtout si le chien vomit ou a la diarrhée en plus (ce qui aggrave rapidement la déshydratation), un avis vétérinaire rapide est recommandé.

**Attention aux cyanobactéries dans les eaux stagnantes** (étangs, lacs, mares, certaines rivières à faible courant) : ce sont des micro-organismes, parfois appelés à tort « algues bleues », qui peuvent proliférer rapidement par forte chaleur et libérer des toxines très dangereuses. Selon un signalement de toxicovigilance de l'ANSES et une alerte officielle de la DRAAF Centre-Val de Loire, des chiens meurent chaque année en France après avoir bu de l'eau contaminée ou léché des amas de cyanobactéries échoués sur les berges — le chien est, de très loin, l'espèce la plus touchée par ce type d'intoxication (99,4 % des signalements chien/chat dans une étude citée par Santévet). Les signes évocateurs d'une proliération : eau trouble, verdâtre ou recouverte d'une sorte d'écume, dépôts brunâtres/verdâtres sur les berges ou les galets, odeur inhabituelle — mais **l'eau peut aussi être contaminée sans signe visible**, donc la prudence vaut même quand ça « a l'air propre ». En pratique : tiens ton chien à l'écart des eaux stagnantes et calmes en été, ne le laisse pas boire directement dans un étang ou une mare, respecte les interdictions de baignade affichées (souvent liées à des alertes cyanobactéries), et en cas de symptômes après une baignade ou une balade près d'un point d'eau (vomissements, tremblements, grande fatigue soudaine, salivation excessive, perte d'équilibre) : vétérinaire en urgence, sans attendre.

### Hébergement : ce qui compte vraiment en été

Pour un séjour sans stress en pleine chaleur, quelques critères comptent plus que d'habitude quand tu choisis un hébergement :
- **Climatisation ou au minimum un ventilateur** dans la pièce où dormira ton chien — une chambre qui cuit toute la journée sous les toits est un vrai risque, pas juste un inconfort.
- **Un jardin ou un extérieur ombragé**, pour que le chien puisse sortir faire ses besoins sans traverser une cour en plein cagnard à 14 h.
- **Des horaires de balade adaptés** : privilégie un hébergement proche d'un espace où tu peux sortir ton chien tôt le matin et en soirée plutôt qu'en pleine journée — c'est aussi vrai en vacances qu'au quotidien.
- Un point d'eau accessible (robinet extérieur, gamelle commune, douche de rinçage si tu es près d'une plage) est un vrai plus.

Pour trouver un établissement adapté, direction notre page **[hébergements qui acceptent les chiens](/hebergement-chien)**, classée par département : chaque fiche précise les conditions d'accueil relevées auprès de l'établissement (quand elles existent), et tu peux y repérer celles qui mentionnent un extérieur ombragé ou une climatisation.

<div class="callout">Le conseil de Coco : l'été, mon humain réserve toujours une chambre au rez-de-chaussée ou avec un vrai accès extérieur. Moins d'escaliers à affronter en pleine chaleur, et je peux sortir dès que j'ai soif de prendre l'air (et de faire mes besoins, soyons honnêtes).</div>

---

## Sources (format label + url, à copier dans le frontmatter final)

```yaml
sources:
  - label: "Urgences Vétérinaires (3115) — Le coup de chaleur chez le chien, urgence absolue"
    url: "https://www.urgences-veterinaires.fr/urgence-veterinaire-chez-le-chien/coup-de-chaleur-chez-le-chien"
  - label: "Santévet — Coup de chaleur chez le chien : une urgence vétérinaire à éviter"
    url: "https://www.santevet.com/articles/coup-de-chaleur-une-urgence-veterinaire-a-eviter"
  - label: "Centre hospitalier universitaire vétérinaire de Montréal — Le coup de chaleur"
    url: "https://chuv.umontreal.ca/le-chuv/hopital-des-animaux-de-compagnie/ressources/coup-de-chaleur"
  - label: "ICI (France Bleu) — Coup de chaleur chez le chien et le chat : les signes d'alerte et les gestes qui peuvent lui sauver la vie (Dr Pierre Fabing)"
    url: "https://www.ici.fr/emissions/les-conseils-du-veto/coup-de-chaleur-chez-le-chien-et-le-chat-les-signes-d-alerte-et-les-gestes-qui-peuvent-lui-sauver-la-vie-8097040"
  - label: "ANSES — Fiche « Santé et fortes chaleurs » (recommandations, dont animaux de compagnie)"
    url: "https://www.anses.fr/fr/system/files/ANSES-Ft-CaniculeRecos.pdf"
  - label: "Météo-France — Vigilance canicule"
    url: "https://vigilance.meteofrance.fr/fr/canicule"
  - label: "Ministère de l'Agriculture — Guide pratique « Cet été, ayez les bons réflexes pour prendre soin de votre animal de compagnie »"
    url: "https://agriculture.gouv.fr/guide-pratique-cet-ete-ayez-les-bons-reflexes-pour-prendre-soin-de-votre-animal-de-compagnie"
  - label: "Ministère de l'Agriculture — Professionnels, consommateurs : les précautions à prendre en cas de canicule"
    url: "https://agriculture.gouv.fr/professionnels-particuliers-les-precautions-prendre-en-cas-de-vague-de-chaleur"
  - label: "Légifrance — Code de la route, article R412-6 (gêne du conducteur)"
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019277061"
  - label: "Légifrance — Code pénal, article R654-1 (mauvais traitements envers un animal)"
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037229026"
  - label: "Légifrance — Code pénal, article 131-13 (montant des amendes contraventionnelles)"
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417259/"
  - label: "CNEWS — Canicule : que risque-t-on si on laisse son chien dans sa voiture sous de fortes chaleurs ?"
    url: "https://www.cnews.fr/france/2026-05-26/canicule-que-risque-t-si-laisse-son-chien-dans-sa-voiture-sous-des-fortes"
  - label: "Fondation Assistance aux Animaux — Loi : que faire si on trouve un chien dans une voiture en plein soleil"
    url: "https://www.fondationassistanceauxanimaux.org/actu/loi-chien-voiture-soleil-399"
  - label: "digiSchool — Le transport des animaux en voiture en toute sécurité"
    url: "https://www.digischool.fr/articles/auto/reglementation/transport-animaux-voiture"
  - label: "L'Argus — Transport d'un chien en voiture : que dit le Code de la route ?"
    url: "https://www.largus.fr/actualite-automobile/transport-d-un-chien-en-voiture-que-dit-le-code-de-la-route-30026663.html"
  - label: "La Compagnie des Animaux — 5 choses à savoir sur l'hydratation du chien (Dr Muriel Alnot)"
    url: "https://www.lacompagniedesanimaux.com/conseil-veterinaire/5-choses-a-savoir-sur-lhydratation-du-chien.html"
  - label: "Santévet — Prévenir la déshydratation chez le chien"
    url: "https://www.santevet.com/articles/prevenir-deshydratation-chien"
  - label: "DRAAF Centre-Val de Loire — Vigilance risque cyanobactéries"
    url: "https://draaf.centre-val-de-loire.agriculture.gouv.fr/vigilance-risque-cyanobacteries-a1908.html"
  - label: "ANSES / VigilAnses n°8 (juin 2019) — Les toxines de cyanobactéries : une préoccupation sanitaire croissante"
    url: "https://vigilanses.anses.fr/sites/default/files/VigilAnsesN8_Juin2019_Toxicovigilance_Cyanobacteries.pdf"
  - label: "Santévet — Intoxication aux cyanobactéries chez le chat (chiffres chien/chat de l'étude 2023)"
    url: "https://www.santevet.com/articles/cyanobacteries-chez-le-chat"
```

## Points de vigilance avant publication (mars-avril 2027)

- **Revérifier le montant des amendes** (35 €/22 €/150 € pour R412-6, 750 € pour R654-1 via l'article 131-13) : ces montants sont stables depuis des années mais une réforme du Code pénal ou du Code de la route reste possible.
- **Revérifier que les URL agriculture.gouv.fr et anses.fr n'ont pas bougé** (ces sites réorganisent parfois leurs pages) et que le guide pratique « Cet été » du ministère est toujours la version la plus récente.
- **Recompter le nombre de guides publiés** dans `src/guides/*.njk` au moment de la bascule, pour fixer un `order` qui ne collisionne pas avec un guide ajouté entre-temps (ex. un guide "tiques" ou "épillets" mentionné comme piste dans `SEO-PRIORITES.md` section H1 pourrait être publié avant celui-ci).
- **Vérifier qu'aucun autre guide ne couvre déjà ce sujet** entre-temps (peu probable, mais le fichier a été écrit plusieurs mois avant publication).
- Le lien interne vers `/guide-regles-plages-chien.html` et `/plage-chien`/`/hebergement-chien` doit être vérifié : si ces URL ont changé, les mettre à jour.
