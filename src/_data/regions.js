import departements from "./departements.js";

// Ordre d'affichage des régions : PACA en premier (région d'origine du site),
// puis les régions suivantes dans leur ordre de première apparition dans
// departements.js (= leur ordre de traitement). Toute nouvelle région ajoutée
// à departements.js apparaît donc automatiquement ici, sans liste à maintenir à la main.
const ORDRE_PRIORITAIRE = ["Provence-Alpes-Côte d'Azur", "Occitanie", "Nouvelle-Aquitaine"];

const nomsRegions = [
  ...ORDRE_PRIORITAIRE,
  ...[...new Set(departements.map((dep) => dep.region))].filter(
    (nom) => !ORDRE_PRIORITAIRE.includes(nom)
  ),
];

export default nomsRegions
  .map((nom) => ({
    nom,
    departements: departements.filter((dep) => dep.region === nom),
  }))
  .filter((region) => region.departements.length > 0);
