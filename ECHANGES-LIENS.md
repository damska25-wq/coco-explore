# Suivi des échanges de liens

Fichier de suivi interne (non publié sur le site). Il liste les fiches créées dans le cadre d'un échange de liens : la fiche Coco Explore offerte à la personne, contre un lien vers cocoexplore.com de sa part. Aucun badge public : ce n'est pas un partenariat payant, et aucune mention « échange de liens » n'est affichée au public. Seule une ligne discrète « Fiche réalisée en collaboration avec … » figure en bas de la fiche.

Statuts du lien reçu : `à demander` · `promis` · `reçu` · `à vérifier` (lien disparu ou modifié).

| Personne | Activité / lieu | Fiche Coco Explore | Fiche créée le | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|---|
| Charlotte | Garde d'animaux à domicile, Sainte-Maxime | /dogsitter-charlotte-sainte-maxime | 15/10/2026 | Partage du lien de la fiche sur sa page Facebook | promis | Prénom seul affiché (pas de nom de famille, à la demande de l'utilisateur). Tél. publié avec son accord. À vérifier : lien vers cocoexplore.com aussi dans la description de sa page ou sur son site, s'il y en a un. |

## Articles invités

| Partenaire | Articles prévus | Accord du | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|
| Bimo (bimo.dog, alimentation chien) | 1. « Partir en vacances avec son chien : gérer ses repas sur la route » ; 2. « Randonnée : préparer des collations maison pour son chien » | 25/10/2026 | Lien vers cocoexplore.com sur le blog Bimo | reçu (page Partenaires bimo.dog, 29/10/2026) | Conditions acceptées par Bimo : 800 à 1 200 mots, relus et ajustés librement par nous avant publication ; conseils santé appuyés sur des sources sérieuses (vétérinaires, organismes officiels) ; liste des aliments interdits aux chiens dans le 2e article ; mention « Article proposé par Bimo » + lien vers bimo.dog signalé comme partenariat (`rel="sponsored"` à l'origine, passé en `rel="noopener"` le 29/10/2026 à la demande de Bimo, décision de l'utilisateur). Publication dans la rubrique `/guides`. Premier article attendu « dans les prochains jours ». À la réception : vérifier chaque conseil santé et chaque source, retirer tout discours commercial appuyé sur leurs produits. |

Articles Bimo publiés le 27/10/2026 : `/guide-repas-route-chien` et `/guide-collations-randonnee-chien` (sources revérifiées une à une, corrections listées dans les commits). Page « Partenaires » de bimo.dog en ligne avec Coco Explore (description, image, lien dofollow vers cocoexplore.com), confirmé par Bimo le 29/10/2026 : statut `reçu`.

## Affichage sur la fiche

Uniquement `<p class="fiche-collab">Fiche réalisée en collaboration avec …</p>` à la fin du `bodyHtml` : petite ligne grise précédée d'une icône de lien et d'un trait de séparation (style dans `src/style.css`). Rien sur les vignettes ni dans l'en-tête : ne jamais utiliser de badge, de couleur ou de pastille, pour ne pas se confondre avec le badge Partenaire payant. Le nom peut être un lien vers le site ou la page de la personne (`<a href="…" rel="noopener">`), si c'est la contrepartie convenue.

## Comment l'utiliser

- Nouvelle collaboration : ajouter une ligne dans le tableau (date de création de la fiche, lien promis).
- Quand le lien est reçu : mettre le statut à `reçu`, noter la date et l'adresse où il se trouve.
- Revérifier de temps en temps que les liens reçus sont toujours en ligne.
