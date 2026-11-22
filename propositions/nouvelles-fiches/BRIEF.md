# Brief : nouvelles fiches préparées hors ligne (rigueur maximale, du premier coup)

Règle de l'utilisateur (22/11/2026) : chaque fiche doit être juste et complète dès sa création, pour ne jamais repasser dessus. Elle est ensuite stockée hors du site (`propositions/nouvelles-fiches/<zone>/`), jamais dans `src/`.

## Sélection
- Ne retenir un établissement que si **sa propre page officielle** (son site, ou la page dédiée à cet hôtel sur le site de sa chaîne) dit explicitement que les chiens / animaux sont acceptés. Recouper avec l'office de tourisme quand il existe. Un office de tourisme seul ne suffit pas : établissement suivant.
- Pas de doublon : `grep -ril "<nom>" src/fiches propositions/nouvelles-fiches` ; rien sur les établissements supprimés ou à ne pas recréer (`CLAUDE.md`, `propositions/a-trancher-chantier-amelio.md`, `propositions/decisions-en-attente-2026-11-20.md`).
- Établissement ouvert (pas de fermeture définitive publiée, pas de liquidation).

## Contenu (tout lu sur une source, rien d'inventé)
- Titre exact : « <Nom avec type>, <Commune> : chien accepté, supplément N €/nuit » ; supplément seulement s'il est net et avec unité (€/nuit, €/jour, €/séjour) ; si le titre dépasse 80 caractères, supplément retiré du titre mais gardé dans la description et le texte.
- Adresse complète, téléphone publié par l'établissement (jamais de 08 9x ; sinon « Non publié »), site officiel, conditions chien (nombre, taille, catégories, supplément, zones interdites, chien seul en chambre), période d'ouverture si saisonnier.
- Position : géocodage de l'adresse publiée (`https://api-adresse.data.gouv.fr/search/?q=...&limit=1`), score ≥ 0,7 et bonne commune.
- Texte de 300 mots au moins, utile au propriétaire de chien : conditions, quartier, balades et parcs voisins **seulement s'ils sont sourcés** (sinon lien vers les fiches existantes du site), sans première personne ni récit de recherche, sans jargon de travail.
- Encadré « À vérifier… » seulement pour un vrai doute (dit une fois) ; carte Sources avec chaque page lue « (lue le JJ/MM/AAAA) », date réelle (`date +%d/%m/%Y`).
- Structure : celle d'une fiche hébergement existante (ex. `src/fiches/hebergement-thalazur-arcachon.njk`), `heroImage: ""`, `order: 0`, pas de guillemet droit " dans les champs YAML entre guillemets (utiliser « »).
- Contrôle final : `node -e` avec js-yaml sur chaque fichier, ou relecture du front matter.
