import departements from "./departements.js";

// Ordre d'affichage des régions : PACA en premier (région d'origine du site),
// puis les régions ajoutées ensuite dans leur ordre de traitement.
const ORDRE_REGIONS = ["Provence-Alpes-Côte d'Azur", "Occitanie"];

export default ORDRE_REGIONS.map((nom) => ({
  nom,
  departements: departements.filter((dep) => dep.region === nom),
})).filter((region) => region.departements.length > 0);
