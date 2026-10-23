# Suivi des échanges de liens

Fichier de suivi interne (non publié sur le site). Il liste les fiches créées dans le cadre d'un échange de liens : la fiche Coco Explore offerte à la personne, contre un lien vers cocoexplore.com de sa part. Aucun badge public : ce n'est pas un partenariat payant, et aucune mention « échange de liens » n'est affichée au public. Seule une ligne discrète « Fiche réalisée en collaboration avec … » figure en bas de la fiche.

Statuts du lien reçu : `à demander` · `promis` · `reçu` · `à vérifier` (lien disparu ou modifié).

| Personne | Activité / lieu | Fiche Coco Explore | Fiche créée le | Lien attendu en retour | Statut | Notes |
|---|---|---|---|---|---|---|
| Charlotte | Garde d'animaux à domicile, Sainte-Maxime | /dogsitter-charlotte-sainte-maxime | 15/10/2026 | Partage du lien de la fiche sur sa page Facebook | promis | Prénom seul affiché (pas de nom de famille, à la demande de l'utilisateur). Tél. publié avec son accord. À vérifier : lien vers cocoexplore.com aussi dans la description de sa page ou sur son site, s'il y en a un. |

## Affichage sur la fiche

Uniquement `<p class="fiche-collab">Fiche réalisée en collaboration avec …</p>` à la fin du `bodyHtml` : petite ligne grise précédée d'une icône de lien et d'un trait de séparation (style dans `src/style.css`). Rien sur les vignettes ni dans l'en-tête : ne jamais utiliser de badge, de couleur ou de pastille, pour ne pas se confondre avec le badge Partenaire payant. Le nom peut être un lien vers le site ou la page de la personne (`<a href="…" rel="noopener">`), si c'est la contrepartie convenue.

## Comment l'utiliser

- Nouvelle collaboration : ajouter une ligne dans le tableau (date de création de la fiche, lien promis).
- Quand le lien est reçu : mettre le statut à `reçu`, noter la date et l'adresse où il se trouve.
- Revérifier de temps en temps que les liens reçus sont toujours en ligne.
