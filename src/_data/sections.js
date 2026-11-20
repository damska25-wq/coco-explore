// Ordre d'hiver (20/11/2026, même ordre que CAT_GROUPS de src/map.js) : hébergements, restaurants, balades, vétérinaires, pension canine, plages, puis les catégories secondaires.
// Ordre d'été à rétablir au printemps : plages, cote-azur, balades, lacs, restaurants, hebergements, activites, toiletteurs, dogwash, veterinaires, dogsitters, education.
export default [
  {
    id: "hebergements",
    eyebrow: "Hébergements",
    heading: "Où dormir avec son chien",
    catGrid: { icon: "i-house", label: "Hébergements", countIds: ["hebergements"] },
  },
  {
    id: "restaurants",
    eyebrow: "Restaurants",
    heading: "Où passer à table sans laisser son chien dehors",
    catGrid: { icon: "i-fork", label: "Restaurants", countIds: ["restaurants"] },
  },
  {
    id: "balades",
    eyebrow: "Balades",
    heading: "Sentiers et chemins à explorer",
    catGrid: { icon: "i-trail", label: "Balades", countIds: ["balades"] },
  },
  {
    id: "veterinaires",
    eyebrow: "Vétérinaires",
    heading: "Pour la santé de ton compagnon",
    catGrid: { icon: "i-vet", label: "Vétérinaires", countIds: ["veterinaires"] },
  },
  {
    id: "dogsitters",
    eyebrow: "Pension canine",
    heading: "Faire garder son chien en toute confiance",
    catGrid: { icon: "i-paw", label: "Pension canine", countIds: ["dogsitters"] },
  },
  {
    id: "plages",
    eyebrow: "Plages",
    heading: "Où poser sa serviette avec son chien",
    catGrid: { icon: "i-beach", label: "Plages", countIds: ["plages", "cote-azur"] },
  },
  {
    id: "cote-azur",
    eyebrow: "De Menton à la Camargue",
    heading: "Plages de la Côte d'Azur et de Camargue avec son chien",
  },
  {
    id: "lacs",
    eyebrow: "Lacs &amp; points d'eau",
    heading: "Lacs et points d'eau avec son chien",
    catGrid: { icon: "i-lake", label: "Lacs &amp; points d'eau", countIds: ["lacs"] },
  },
  {
    id: "activites",
    eyebrow: "Activités",
    heading: "Bouger, jouer et naviguer avec son chien",
    catGrid: { icon: "i-activity", label: "Activités", countIds: ["activites"] },
  },
  {
    id: "dogwash",
    eyebrow: "Douche à chien",
    heading: "Rincer son chien après la plage ou la balade",
    catGrid: { icon: "i-drop", label: "Douche à chien", countIds: ["dogwash"] },
  },
  {
    id: "toiletteurs",
    eyebrow: "Toiletteurs",
    heading: "Pour un chien tout beau, tout propre",
    catGrid: { icon: "i-scissors", label: "Toiletteurs", countIds: ["toiletteurs"] },
  },
  {
    id: "education",
    eyebrow: "Éducation canine",
    heading: "Clubs canins et éducateurs pour bien vivre avec son chien",
    catGrid: { icon: "i-dog", label: "Éducation canine", countIds: ["education"] },
  },
];
