# Coco Explore

Guide gratuit en ligne pour voyager avec son chien en France (plages, restaurants, hébergements, balades, vétérinaires, toiletteurs, dogwash, dogsitters). Site statique Eleventy (11ty), 68 départements couverts, ~6800 fiches.

## Programme partenaire (démarrage commercial)

Le site propose une mise en avant payante optionnelle aux professionnels déjà référencés gratuitement (vétérinaires, restaurants, hébergements...). Statut : en phase de test manuel, pas encore de vrai partenariat signé.

- **Page publique** : `src/devenir-partenaire.njk` (accessible depuis le menu hamburger) — volontairement sans tarif affiché, juste les explications et un contact mailto.
- **Mécanisme technique** : ajouter `partenaire: true` au frontmatter d'une fiche déclenche un badge doré "Partenaire" sur ses cartes (accueil, page département, "à proximité") et un tag dans son hero. CSS : classes `.fiche-card.is-partenaire`, `.access-badge.badge-partenaire`, `.fiche-partenaire-tag` dans `src/style.css`.
- **Tarif cible convenu avec l'utilisateur** : 19 à 29 €/mois, sans engagement, 1er mois offert. Pas de facturation à la performance (pas de données de trafic pour le justifier pour l'instant).
- **Cohérence éditoriale** : la page "À propos" (`src/a-propos.njk`) a été mise à jour pour rester honnête vis-à-vis de ce programme (le classement/contenu reste neutre, seule la mise en avant visuelle est payante).

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

Premier envoi test prévu : Clinique Vétérinaire du Dr Jackowski, Cavalaire-sur-Mer (`src/fiches/veterinaire-jackowski.njk`).

## Conventions du projet (voir aussi contexte de session)

- Fiches : `src/fiches/*.njk`, frontmatter YAML + `bodyHtml`.
- Jamais de photo Unsplash dupliquée entre fiches (vérification regex sur `photo-XXXX` avant chaque commit de contenu).
- Jamais le label `"Urgences"` avec un pattern 24h/24 sauf si réellement vérifié (déclenche un badge automatique `vetBadge`).
- `order` unique par fiche, nouvelles plages allouées par lot d'écriture.
- Build de vérification avant tout commit : `npx @11ty/eleventy` (doit tourner sans erreur).
