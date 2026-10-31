// Guides à proposer selon la catégorie : encadré « À lire aussi » des fiches
// (fiche.njk) et bloc « Guides utiles » des pages catégorie.
const plages = [["guide-regles-plages-chien", "Chiens sur la plage : qui décide, quelles règles, quelle amende"]];
const rando = ["guide-randonnee-regles-chien", "Randonner avec son chien : où et quand a-t-on le droit ?"];
export default {
  plages,
  "cote-azur": plages,
  lacs: [rando, ["guide-chenilles-processionnaires-chien", "Chenilles processionnaires : risques et bons gestes"]],
  balades: [rando, ["guide-collations-randonnee-chien", "Préparer des collations maison pour la randonnée"]],
  veterinaires: [["guide-urgence-veterinaire-chien", "Urgence vétérinaire en vacances : trouver un vétérinaire de garde"]],
  hebergements: [["guide-camping-location-repas-chien", "Camping ou location : garder les repas de son chien au frais"], ["guide-repas-route-chien", "Gérer les repas de son chien sur la route"]],
  restaurants: [["guide-aliments-terroir-chien", "Spécialités du terroir : les aliments à éviter pour son chien"]],
  activites: [rando, ["guide-chien-sportif-rations", "Canicross et longues randonnées : adapter les rations de son chien"]],
};
