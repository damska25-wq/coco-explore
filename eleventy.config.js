import { execSync } from "node:child_process";
import departements from "./src/_data/departements.js";
import categoryPages from "./src/_data/categoryPages.js";

// Une seule invocation `git log` pour tout l'historique plutôt qu'un
// `git log -1 -- <fichier>` par fiche : avec plusieurs milliers de fiches,
// un appel par fichier (process git synchrone à chaque fois) faisait dépasser
// largement le temps de build (et donc le timeout de déploiement Netlify).
function buildGitDateMap() {
  const map = new Map();
  try {
    const out = execSync('git log --name-only --format="COMMIT:%cI"', {
      maxBuffer: 1024 * 1024 * 64,
    }).toString();
    let currentDate = null;
    for (const line of out.split("\n")) {
      if (line.startsWith("COMMIT:")) {
        currentDate = line.slice(7, 17); // YYYY-MM-DD
      } else if (line.trim() && currentDate && !map.has(line.trim())) {
        // git log liste les commits du plus récent au plus ancien : la
        // première occurrence d'un chemin correspond à sa dernière modif.
        map.set(line.trim(), currentDate);
      }
    }
  } catch (e) {
    /* pas un dépôt git — lastmod retombera sur la date du jour */
  }
  return map;
}

const gitDateMap = buildGitDateMap();

// Badge "Urgences 24h/24" d'une fiche vétérinaire (voir le filtre vetBadge).
function vetBadge(infoItems) {
  const urgence = (infoItems || []).find((i) => i.label === "Urgences");
  const text = (urgence ? urgence.value : "").toLowerCase();
  if (!/24h\s*\/\s*24|24\/24|7j\s*\/\s*7/.test(text)) return null;
  // La plupart des mentions de "24h/24" dans ce champ servent justement à
  // expliquer qu'un service permanent n'est PAS confirmé (c'est la règle du
  // site : jamais affirmer un 24h/24 non vérifié). Sans ce filtre de doute,
  // le badge s'affiche quand même sur la seule présence du motif "24h/24"
  // dans le texte, même quand la phrase le dément — contredisant la fiche
  // qu'il résume. On n'affiche donc le badge que si rien n'indique un doute.
  const hedge =
    /\bpas\b|\baucun[e]?\b|non confirm|n'a pas|non recoup|non audit|non v[ée]rifi|non d('|’)une|ne confirme|n'affirme|n'est pas|rien ne confirme|[àa] distinguer|revendiqu|annonc[ée]e? par|auto-d[ée]clar|\bjamais\b|sans (audit|confirmation|revendication|source)|non ind[ée]pendant|contradiction|au contraire|source g[ée]n[ée]rique/;
  if (hedge.test(text)) return null;
  return { label: "Urgences 24h/24", cls: "badge-urgence" };
}

// Une fiche appartient-elle à une page catégorie de src/_data/categoryPages.js ?
// Catégorie dans `cats` (ou `cat`), et, si `match` est défini, titre / tag /
// cardTitle correspondant à ce motif (ex. parcs canins, répartis entre
// plusieurs catégories), sauf s'il correspond aussi à `exclude`.
function inCategoryPage(f, cp) {
  if (!(cp.cats || [cp.cat]).includes(f.data.breadcrumbCatId)) return false;
  if (!cp.match) return true;
  const text = [f.data.title, f.data.tag, f.data.cardTitle].join(" ");
  if (cp.exclude && new RegExp(cp.exclude, "i").test(text)) return false;
  return new RegExp(cp.match, "i").test(text);
}

// Programme partenaire (voir CLAUDE.md) : la page /devenir-partenaire promet
// une « priorité d'affichage dans les listes de votre secteur » et dans les
// suggestions « à proximité ». Tri stable : l'ordre existant est conservé à
// l'intérieur des partenaires et des autres fiches.
const partnersFirst = (fiches) => fiches.sort((a, b) => !!b.data.partenaire - !!a.data.partenaire);

// "en Gironde", "dans le Var", "dans l'Indre", "à Paris"... repris du H1 SEO
// de chaque département (src/_data/departements.js).
const deptEnNom = (dep) => dep.seoH1.replace(/^Où aller avec son chien /, "");
function gitLastModified(filePath) {
  return gitDateMap.get(filePath.replace(/^\.\//, "")) || null;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/vendor");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/avis.js");
  eleventyConfig.addPassthroughCopy("src/map.js");
  eleventyConfig.addPassthroughCopy("src/notes.js");
  eleventyConfig.addPassthroughCopy("src/nearby.js");
  eleventyConfig.addPassthroughCopy("src/card-filter.js");
  eleventyConfig.addPassthroughCopy("src/geoloc.js");
  eleventyConfig.addPassthroughCopy("src/search.js");
  eleventyConfig.addPassthroughCopy("src/favoris.js");
  eleventyConfig.addPassthroughCopy("src/dept-filter.js");
  eleventyConfig.addPassthroughCopy("src/dept-map.js");
  eleventyConfig.addPassthroughCopy("src/region-accordion.js");
  eleventyConfig.addPassthroughCopy("src/cookie-consent.js");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy("src/google42d095cf02301eb6.html");

  eleventyConfig.addCollection("fiches", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/fiches/*.njk").sort((a, b) =>
      a.data.slug.localeCompare(b.data.slug)
    )
  );

  // Guides pratiques (src/guides/*.njk), dans l'ordre du champ `order`.
  eleventyConfig.addCollection("guides", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/guides/*.njk").sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  // Fiches traduites en anglais (pilote : accueil + menu + département du
  // Var uniquement) — collection séparée pour ne jamais se mélanger aux
  // fiches françaises affichées sur l'accueil, la carte ou la recherche.
  eleventyConfig.addCollection("fichesEn", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/en/fiches/*.njk").sort((a, b) =>
      a.data.slug.localeCompare(b.data.slug)
    )
  );

  // Pages catégorie (src/categorie.njk + src/categorie-departement.njk) :
  // fiches de chaque catégorie de src/_data/categoryPages.js regroupées par
  // département. Une entrée par couple catégorie × département ayant au moins
  // une fiche ; `hasPage` indique si le département atteint le seuil
  // `minFiches` de la catégorie (sinon il n'est listé que sur la page nationale).
  const categoryDepts = (collectionApi) => {
    const all = collectionApi.getFilteredByGlob("src/fiches/*.njk");
    return categoryPages.flatMap((cp) => {
      const fiches = all
        .filter((f) => inCategoryPage(f, cp))
        .sort((a, b) => (a.data.cardTag || "").localeCompare(b.data.cardTag || "", "fr"));
      // Vétérinaires : ceux dont la garde 24h/24 est vérifiée en premier.
      partnersFirst(fiches);
      // Vétérinaires : ceux dont la garde 24h/24 est vérifiée passent quand même
      // avant les partenaires (sécurité de quelqu'un qui cherche une urgence).
      if (cp.urgentFirst) {
        fiches.sort((a, b) => !!vetBadge(b.data.infoItems) - !!vetBadge(a.data.infoItems));
      }
      return departements
        .map((dep) => ({
          ...dep,
          cat: cp.cat,
          cp,
          enNom: deptEnNom(dep),
          fiches: fiches.filter((f) => (f.data.departement || []).includes(dep.id)),
        }))
        .filter((dep) => dep.fiches.length > 0)
        .map((dep) => ({ ...dep, hasPage: dep.fiches.length >= cp.minFiches }));
    });
  };
  eleventyConfig.addCollection("categoryDepts", categoryDepts);
  eleventyConfig.addCollection("categoryDeptPages", (collectionApi) =>
    categoryDepts(collectionApi).filter((dep) => dep.hasPage)
  );
  // Seuil des pages catégorie × département relevé de 3 à 5 fiches le
  // 12/11/2026 (accord de l'utilisateur, après la chute Google) : les anciennes
  // pages de 3-4 fiches sont redirigées (301) vers la section de la page
  // département (src/_redirects.njk).
  eleventyConfig.addCollection("categoryDeptRedirects", (collectionApi) =>
    categoryDepts(collectionApi).filter((dep) => !dep.hasPage && dep.fiches.length >= 3)
  );

  // Pages ville (src/ville.njk) : une page "<Ville> avec son chien" pour
  // chaque commune comptant au moins CITY_MIN_FICHES fiches (champ cardTag),
  // toutes catégories confondues. Le département retenu est celui de la
  // majorité de ses fiches.
  const CITY_MIN_FICHES = 15;
  // Stations et villes de vacances : page dès 10 adresses, et volet « Stations » de l'accueil.
  const STATION_MIN_FICHES = 10;
  // Section « Autour de <ville> » des pages ville : rayon et nombre maximum de fiches.
  const NEARBY_KM = 12;
  const NEARBY_MAX = 12;
  const STATION_VILLES = [
    "Agde", "Aix-les-Bains", "Ajaccio", "Anglet", "Annecy", "Antibes", "Arcachon", "Argelès-sur-Mer",
    "Bagnères-de-Luchon", "Bandol", "Barcelonnette", "Berck-sur-Mer", "Biarritz", "Biscarrosse", "Bonifacio",
    "Bormes-les-Mimosas", "Briançon", "Cabourg", "Calvi", "Cancale", "Canet-en-Roussillon", "Cannes",
    "Capbreton", "Carnac", "Cassis", "Cauterets", "Cavalaire-sur-Mer", "Chamonix-Mont-Blanc", "Collioure",
    "Concarneau", "Courchevel", "Crozon", "Deauville", "Dinard", "Embrun", "Erquy", "Étretat", "Fécamp",
    "Fréjus", "Gérardmer", "Granville", "Grimaud", "Gruissan", "Hendaye", "Honfleur", "Hyères",
    "L'Île-Rousse", "L'Isle-sur-la-Sorgue", "La Baule-Escoublac", "La Ciotat", "La Clusaz", "La Croix-Valmer",
    "La Rochelle", "Lacanau", "Le Grau-du-Roi", "Le Lavandou", "Le Touquet-Paris-Plage", "Les Deux Alpes",
    "Les Sables-d'Olonne", "Lourdes", "Megève", "Menton", "Noirmoutier-en-l'Île", "Ouistreham", "Paimpol",
    "Perros-Guirec", "Pornic", "Porto-Vecchio", "Propriano", "Quiberon", "Ramatuelle", "Rocamadour",
    "Roscoff", "Royan", "Saint-Gilles-Croix-de-Vie", "Saint-Jean-de-Luz", "Saint-Jean-de-Monts",
    "Saint-Lary-Soulan", "Saint-Malo", "Saint-Martin-de-Ré", "Saint-Raphaël", "Saint-Tropez",
    "Saint-Valery-sur-Somme", "Sainte-Maxime", "Sanary-sur-Mer", "Sarlat-la-Canéda", "Sarzeau", "Sète",
    "Six-Fours-les-Plages", "Soorts-Hossegor", "Tignes", "Trouville-sur-Mer", "Vallon-Pont-d'Arc",
    "Villefranche-sur-Mer", "Val-d'Isère", "Les Arcs", "La Plagne", "Méribel", "Val Thorens", "Les Menuires", "Morzine", "Font-Romeu",
    "Obernai", "Sélestat", "Kaysersberg Vignoble", "Riquewihr", "Eguisheim", "Ribeauvillé", "La Bresse",
    "Mandelieu-la-Napoule", "Saint-Cyprien", "La Grande-Motte", "Douarnenez", "Bidart", "Seignosse",
    "Mimizan", "Le Crotoy", "Arzon", "Moustiers-Sainte-Marie", "Wimereux", "Houlgate",
  ];
  const slugify = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/['’]/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  // "à Nantes", "au Havre", "aux Sables-d'Olonne", "à La Rochelle".
  const aVille = (ville) =>
    ville.startsWith("Le ") ? "au " + ville.slice(3) : ville.startsWith("Les ") ? "aux " + ville.slice(4) : "à " + ville;
  // "de Nantes", "du Havre", "des Sables-d'Olonne", "d'Angers", "de La Rochelle".
  const deVille = (ville) =>
    ville.startsWith("Le ") ? "du " + ville.slice(3)
      : ville.startsWith("Les ") ? "des " + ville.slice(4)
      : /^[AEIOUYÉÈÊÎÔ]/i.test(ville) ? "d'" + ville
      : "de " + ville;
  // Commune d'un cardTag : les variantes d'une même commune comptent pour sa page
  // ville (« Lyon 5e », « Reims (Murigny) », « Besançon, Doubs », « Cannes La
  // Bocca »…). Le cardTag affiché sur les cartes ne change pas. Les cardTag
  // multi-communes (« Rennes / Betton ») ne sont rattachés à aucune.
  const CITY_ALIASES = { "Annecy-le-Vieux": "Annecy", "Cannes La Bocca": "Cannes" };
  const cityOf = (tag) => {
    if (!tag) return tag;
    if (CITY_ALIASES[tag]) return CITY_ALIASES[tag];
    if (/\/|\+| et (alentours|région)|→/.test(tag)) return tag;
    return tag
      .replace(/\s+\d+(er|e)(\/\d+e)?$/, "")
      .replace(/\s*\([^)]*\)$/, "")
      .replace(/,\s.*$/, "")
      .trim();
  };
  const computeCityPages = (collectionApi) => {
    // Communes homonymes (Saint-Denis 93 / 974) : regroupées par nom ET département.
    const byCity = new Map();
    const all = collectionApi.getFilteredByGlob("src/fiches/*.njk");
    for (const f of all) {
      const ville = cityOf(f.data.cardTag);
      if (!ville || /[0-9+/()]/.test(ville)) continue;
      const key = `${ville}|${(f.data.departement || [])[0]}`;
      if (!byCity.has(key)) byCity.set(key, { ville, fiches: [] });
      byCity.get(key).fiches.push(f);
    }
    const kept = [...byCity.values()].filter(
      ({ ville, fiches }) => fiches.length >= (STATION_VILLES.includes(ville) ? STATION_MIN_FICHES : CITY_MIN_FICHES)
    );
    return kept
      .map(({ ville, fiches }) => {
        const deptId = (fiches[0].data.departement || [])[0];
        const dep = departements.find((d) => d.id === deptId);
        // Deux homonymes ayant chacun leur page : le département départage les URL.
        const homonyme = kept.filter((c) => c.ville === ville).length > 1;
        // « Autour de la ville » : fiches d'autres communes à moins de NEARBY_KM
        // du centre (médiane des coordonnées des fiches de la ville).
        const med = (xs) => { const v = xs.filter(Number.isFinite).sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
        const lat0 = med(fiches.map((f) => Number(f.data.lat)));
        const lng0 = med(fiches.map((f) => Number(f.data.lng)));
        const own = new Set(fiches);
        const nearby = Number.isFinite(lat0) && Number.isFinite(lng0)
          ? all
              .filter((f) => !own.has(f) && Number.isFinite(Number(f.data.lat)) && Number.isFinite(Number(f.data.lng)))
              .map((f) => ({ f, km: Math.hypot((Number(f.data.lat) - lat0) * 111, (Number(f.data.lng) - lng0) * 111 * Math.cos((lat0 * Math.PI) / 180)) }))
              .filter((x) => x.km <= NEARBY_KM)
              .sort((a, b) => a.km - b.km)
              // 3 fiches au plus par catégorie, pour varier la sélection.
              .filter(((perCat) => (x) => {
                const cat = x.f.data.breadcrumbCatId;
                perCat.set(cat, (perCat.get(cat) || 0) + 1);
                return perCat.get(cat) <= 3;
              })(new Map()))
              .slice(0, NEARBY_MAX)
              .map((x) => x.f)
          : [];
        return {
          ville,
          aVille: aVille(ville),
          deVille: deVille(ville),
          station: STATION_VILLES.includes(ville),
          slug: slugify(ville) + (homonyme ? "-" + dep.slug : "") + "-avec-son-chien",
          dep,
          depId: deptId,
          fiches: partnersFirst(fiches.sort((a, b) => a.data.order - b.data.order)),
          nearby,
          lat0,
          lng0,
        };
      })
      .sort((a, b) => a.ville.localeCompare(b.ville, "fr"));
  };
  eleventyConfig.addCollection("cityPages", computeCityPages);

  // Fiches dogwash, pour proposer la station la plus proche sur les fiches
  // plages, lacs et balades (après la baignade ou la boue).
  // FAQ des pages catégorie → entrées schema.org FAQPage.
  eleventyConfig.addFilter("faqEntities", (faq) =>
    (faq || []).map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: String(i.a).replace(/<[^>]+>/g, "") } }))
  );
  // Centre approximatif d'un département (médiane des coordonnées de ses fiches).
  eleventyConfig.addFilter("deptCenter", (fiches, depId) => {
    const inDep = (fiches || []).filter((f) => (f.data.departement || []).includes(depId));
    const med = (xs) => { const v = xs.filter(Number.isFinite).sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
    return { lat: med(inDep.map((f) => Number(f.data.lat))), lng: med(inDep.map((f) => Number(f.data.lng))) };
  });
  eleventyConfig.addCollection("dogwashFiches", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/fiches/*.njk")
      .filter((f) => f.data.breadcrumbCatId === "dogwash" && Number.isFinite(Number(f.data.lat)) && Number.isFinite(Number(f.data.lng)))
  );
  // Vétérinaires et gardes, pour les encadrés « le plus proche » des fiches lieux.
  eleventyConfig.addCollection("vetFiches", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/fiches/*.njk")
      .filter((f) => f.data.breadcrumbCatId === "veterinaires" && Number.isFinite(Number(f.data.lat)) && Number.isFinite(Number(f.data.lng)))
  );
  eleventyConfig.addCollection("vet24Fiches", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/fiches/*.njk")
      .filter((f) => f.data.breadcrumbCatId === "veterinaires" && vetBadge(f.data.infoItems) && Number.isFinite(Number(f.data.lat)) && Number.isFinite(Number(f.data.lng)))
  );
  eleventyConfig.addCollection("gardeFiches", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/fiches/*.njk")
      .filter((f) => f.data.breadcrumbCatId === "dogsitters" && Number.isFinite(Number(f.data.lat)) && Number.isFinite(Number(f.data.lng)))
  );
  // { fiche, km } de la fiche la plus proche d'un point, à moins de maxKm, ou null.
  eleventyConfig.addFilter("nearestFiche", (fiches, lat, lng, maxKm = 30) => {
    const la = Number(lat), ln = Number(lng);
    if (!Number.isFinite(la) || !Number.isFinite(ln)) return null;
    let best = null;
    for (const f of fiches || []) {
      const km = Math.hypot((Number(f.data.lat) - la) * 111, (Number(f.data.lng) - ln) * 111 * Math.cos((la * Math.PI) / 180));
      if (km <= maxKm && (!best || km < best.km)) best = { fiche: f, km };
    }
    return best;
  });

  // Pages ville choisies pour le bloc de l'accueil, dans l'ordre donné (villes sans page ignorées).
  eleventyConfig.addFilter("pickCities", (cities, villes) =>
    villes.map((v) => (cities || []).find((c) => c.ville === v)).filter(Boolean)
  );

  // Pages ville absentes d'une liste (volet « Autres villes » de l'accueil).
  eleventyConfig.addFilter("omitCities", (cities, villes) => (cities || []).filter((c) => !villes.includes(c.ville)));

  // Pages ville × catégorie : retire la liste des communes quand elle se réduit à la ville elle-même.
  eleventyConfig.addFilter("dropVille", (str, ville) =>
    String(str || "")
      .split(` (${ville})`).join("")
      .split(`</strong> : ${ville}.`).join("</strong>.")
      .split(`Communes : ${ville}. `).join("")
  );

  // Pages ville × catégorie (src/ville-categorie.njk) : « Hébergements à
  // Biarritz avec son chien »… dès CITY_CAT_MIN_FICHES fiches de la catégorie
  // dans la ville. Reprend les textes des pages catégorie × département avec
  // {enNom} = « à Biarritz ».
  // Seuil relevé de 3 à 5 le 11/11/2026 (décision de l'utilisateur, après la
  // chute Google : les pages de 3-4 fiches doublonnaient la page ville). Les
  // anciennes pages de 3-4 fiches sont redirigées (301) vers la section de la
  // page ville (collection cityCategoryRedirects, src/_redirects.njk).
  const CITY_CAT_MIN_FICHES = 5;
  const CITY_CAT_OLD_MIN = 3;
  const computeCityCategory = (collectionApi, min, max = Infinity) => {
    const cities = computeCityPages(collectionApi);
    return categoryPages
      .filter((cp) => !cp.secondary)
      .flatMap((cp) =>
        cities.map((city) => ({ cp, city, fiches: city.fiches.filter((f) => inCategoryPage(f, cp)) }))
      )
      .filter((p) => p.fiches.length >= min && p.fiches.length < max)
      // Ville homonyme d'un département (Paris) : la page catégorie × département suffit.
      .filter((p) => !departements.some((d) => `${d.slug}-avec-son-chien` === p.city.slug))
      .map((p) => ({
        ...p,
        slug: `${p.cp.slug}-${p.city.slug.replace(/-avec-son-chien$/, "")}`,
        enNom: p.city.aVille,
      }));
  };
  eleventyConfig.addCollection("cityCategoryPages", (collectionApi) =>
    computeCityCategory(collectionApi, CITY_CAT_MIN_FICHES)
  );
  eleventyConfig.addCollection("cityCategoryRedirects", (collectionApi) =>
    computeCityCategory(collectionApi, CITY_CAT_OLD_MIN, CITY_CAT_MIN_FICHES)
  );

  // Données structurées des pages de liste (catégorie, catégorie × département,
  // ville) : fil d'Ariane (BreadcrumbList) + liste des lieux (ItemList).
  // `crumbs` et `items` : [{ name, path }] avec un chemin relatif au site.
  const SITE = "https://cocoexplore.com/";
  eleventyConfig.addFilter("listJsonLd", (items, crumbs, listName) =>
    JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: SITE + c.path,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: listName,
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          url: SITE + it.path,
        })),
      },
    ]).replace(/</g, "\\u003c")
  );
  // Fiches → éléments { name, path } pour listJsonLd.
  eleventyConfig.addFilter("ficheItems", (fiches) =>
    (fiches || []).map((f) => ({
      name: f.data.cardTitle || f.data.breadcrumbLast || f.data.slug,
      path: (f.data.permalinkPath || "").replace(/\.html$/, ""),
    }))
  );
  // Pages département d'une catégorie → éléments { name, path } pour listJsonLd.
  eleventyConfig.addFilter("catDeptItems", (catDepts, cp) =>
    (catDepts || [])
      .filter((d) => d.hasPage)
      .map((d) => ({ name: cp.label + " " + d.enNom, path: cp.slug + "-" + d.slug }))
  );

  // Fiches d'un lot appartenant à l'une des catégories données.
  // Restaurants et hébergements : accueil du chien établi par le titre de la
  // fiche (« chien accepté », « petits chiens »…), refusé (« chiens non
  // acceptés ») ou non établi (titre neutre « Nom, Commune »). Le nom de
  // l'établissement est retiré avant le test (« Le Chien Fou », « Les Chiens
  // Fous »). Sert aux pages ville : les fiches non établies ou refusées sont
  // regroupées dans un bloc replié, après les autres (11/11/2026).
  const dogStatusOf = (f) => {
    const d = f.data || {};
    if (!["restaurants", "hebergements"].includes(d.breadcrumbCatId)) return "ok";
    let t = String(d.title || "").toLowerCase();
    for (const n of [d.cardTitle, d.h1, d.breadcrumbLast]) {
      if (n) t = t.split(String(n).toLowerCase()).join(" ");
    }
    if (/non accept|non admis|refus|interdit|pas accept|non autoris/.test(t)) return "refus";
    if (/chien|animaux|animal|toutou|dog/.test(t)) return "ok";
    return "neutre";
  };
  eleventyConfig.addFilter("dogStatusIs", (fiches, statuses) =>
    (fiches || []).filter((f) => [].concat(statuses).includes(dogStatusOf(f)))
  );
  eleventyConfig.addFilter("inCategories", (fiches, catIds) =>
    (fiches || []).filter((f) => (catIds || []).includes(f.data.breadcrumbCatId))
  );

  // Page catégorie associée à un breadcrumbCatId (undefined si aucune).
  eleventyConfig.addFilter("categoryPage", (catId) =>
    categoryPages.find((cp) => !cp.secondary && (cp.cats || [cp.cat]).includes(catId))
  );

  // Nombre de fiches d'une page catégorie (toutes ses catégories confondues).
  eleventyConfig.addFilter("countCategoryPage", (fiches, cp) =>
    fiches.filter((f) => inCategoryPage(f, cp)).length
  );

  // Fiches d'une page catégorie (encadré « les plus proches de toi »).
  eleventyConfig.addFilter("inCategoryPage", (fiches, cp) =>
    fiches.filter((f) => inCategoryPage(f, cp))
  );

  // Remplace les {cle} d'un gabarit de texte de categoryPages.js.
  eleventyConfig.addFilter("fill", (str, vars) =>
    (str || "").replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] !== undefined ? vars[k] : m))
  );

  // Éléments d'une liste dont la propriété `key` vaut `value` (Nunjucks n'a
  // pas d'équivalent natif : selectattr ne teste que la véracité).
  eleventyConfig.addFilter("whereDept", (fiches, depId) =>
    (fiches || []).filter((f) => (f.data.departement || []).includes(depId))
  );
  eleventyConfig.addFilter("whereData", (list, key, value) => (list || []).filter((f) => f && f.data && f.data[key] === value));
  eleventyConfig.addFilter("whereEq", (list, key, value) =>
    (list || []).filter((item) => item[key] === value)
  );

  // Liste des communes (cardTag) d'un lot de fiches, sans doublon, pour les
  // intros/descriptions des pages catégorie par département.
  eleventyConfig.addFilter("ficheVilles", (fiches, max) => {
    const villes = [...new Set((fiches || []).map((f) => f.data.cardTag).filter(Boolean))];
    if (!max || villes.length <= max) return villes.join(", ");
    return villes.slice(0, max).join(", ") + "…";
  });

  // Résumé d'une fiche pour les pages catégorie × département : 2 infos clés tirées
  // de ses infoItems (déjà vérifiées), dans l'ordre de préférence de sa catégorie.
  const BRIEF_LABELS = {
    plages: ["Chiens", "Statut chien", "Chien", "Hors saison", "Accès", "Terrain"],
    "cote-azur": ["Chiens", "Laisse", "Nature", "Accès"],
    lacs: ["Chiens", "Chien", "Baignade", "Accès"],
    balades: ["Chiens", "Statut chien", "Chien", "Parcours", "Accès", "Départ"],
    activites: ["Chiens", "Tarifs", "Tarif", "Horaires"],
    restaurants: ["Chiens", "Cuisine", "Terrasse", "Type"],
    hebergements: ["Type", "Chiens", "Supplément", "Tarif", "Tarifs"],
    veterinaires: ["Horaires", "Urgences", "Téléphone", "Services"],
    toiletteurs: ["Services", "Tarifs", "Horaires", "Téléphone"],
    dogwash: ["Tarif", "Tarifs", "Horaires", "Type"],
    dogsitters: ["Service", "Services", "Tarifs", "Tarif", "Conditions"],
    education: ["Activités", "Services", "Tarifs", "Téléphone"],
  };
  const briefText = (v, max) => {
    const t = String(v || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s*\([^()]*confiance[^()]*\)/gi, "")
      .replace(/\s*[—–;,-]\s*confiance (faible|moyenne|haute|élevée|bonne|basse)\b[^.;]*/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      // Garde la 1re proposition : ce qui suit un tiret est souvent un commentaire sur la source.
      .replace(/^(.{12,}?) [—–] .*$/, "$1");
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    return cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).replace(/[\s,;:(—-]+$/, "") + "…";
  };
  // Bandeau d'infos des fiches : la ligne de travail « Confiance » (niveau de
  // vérification noté pendant les recherches) et les « (confiance moyenne) »
  // glissés dans une valeur ne sont pas affichés. Les fichiers ne changent pas.
  const CONF_LEVEL = "(?:faible|moyenne|haute|élevée|elevee|bonne|basse|limitée|moyenne-haute|moyenne à haute|high|medium|low)";
  const cleanInfoValue = (v) =>
    String(v || "")
      .replace(/\s*\([^()]*\b(?:confiance|confidence)\b[^()]*\)/gi, "")
      .replace(new RegExp(`(⚠️?)\\s*(?:confiance|confidence)\\s*${CONF_LEVEL}\\s*,?`, "gi"), "$1 ")
      .replace(new RegExp(`\\s*[—–;,-]\\s*(?:niveau de )?(?:confiance|confidence)\\s*:?\\s*${CONF_LEVEL}\\b[^.;]*`, "gi"), "")
      .replace(new RegExp(`(^|[.;]\\s+)[^.;]*\\b(?:confiance|confidence)\\s*:?\\s*${CONF_LEVEL}\\b[^.;]*[.;]?`, "gi"), "$1")
      // Tournures libres (« confiance relevée à haute », « niveau de confiance élevé »…) :
      // le bout de phrase qui contient le mot, jusqu'au séparateur suivant.
      .replace(/(?:\s*[—–:,]\s*|^|(?<=[.;!]\s))[^—–:,;.()]*\b(?:confiance|confidence)\b[^—–;.]*(?:\([^()]*\))?[^—–;.()]*[.;]?/gi, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s+([.,;])/g, "$1")
      .replace(/^[\s.,;—–-]+|[\s,;—–-]+$/g, "")
      .trim();
  // Téléphone et adresse postale pour le JSON-LD des établissements, seulement quand
  // la valeur affichée est nette (un seul numéro, adresse « rue, CP Ville ») et sans réserve.
  const LD_DOUBT = /confirm|annuaire|v[ée]rifier|divergen|contradict|ancien|non trouv|non publi|doute|incertain|approximati|selon|ex-|ferm/i;
  // Numéros de téléphone français cliquables (tel:) dans le bandeau des fiches,
  // seulement sur les lignes de contact et si la valeur ne contient pas déjà un lien.
  // Premier numéro de la ligne Téléphone (barre d'actions mobile des fiches).
  eleventyConfig.addFilter("firstTel", (items) => {
    for (const it of items || []) {
      if (!/^(t[ée]l[ée]phone|phone)$/i.test(String(it.label || "").trim())) continue;
      const m = String(it.value || "").replace(/<[^>]+>/g, "").match(/(?:\+33\s?|0)[1-9](?:[\s.]?\d\d){4}/);
      if (m) return "+33" + m[0].replace(/[\s.]/g, "").replace(/^\+33/, "0").slice(1);
    }
    return "";
  });
  eleventyConfig.addFilter("telLinks", (value, label) => {
    const v = String(value == null ? "" : value);
    if (!/t[ée]l[ée]phone|phone|urgence|emergenc|contact|garde/i.test(String(label || "")) || /<a\b/i.test(v)) return v;
    return v.replace(/(^|[^\d+])((?:\+33\s?|0)[1-9](?:[\s.]?\d\d){4})(?!\d)/g, (m, pre, num) => {
      const digits = num.replace(/[\s.]/g, "").replace(/^\+33/, "0");
      return pre + '<a href="tel:+33' + digits.slice(1) + '" data-track="telephone">' + num + "</a>";
    });
  });
  eleventyConfig.addFilter("setKey", (obj, k, v) => Object.assign({}, obj, { [k]: v }));
  eleventyConfig.addFilter("ldMerge", (obj, extra) => Object.assign({}, obj, extra));
  eleventyConfig.addFilter("ldContact", (items) => {
    const out = {};
    for (const it of items || []) {
      const label = String(it.label || "").trim().toLowerCase();
      let v = String(it.value || "").replace(/<[^>]+>/g, "").trim();
      if (!v || LD_DOUBT.test(v)) continue;
      v = v.replace(/\s*\((?:site officiel|source officielle)[^)]*\)\s*$/i, "").trim();
      if ((label === "téléphone" || label === "phone") && !out.telephone) {
        const m = v.match(/^(?:\+33\s?|0)([1-9])((?:[\s.]?\d\d){4})$/);
        if (m) out.telephone = "+33 " + m[1] + " " + m[2].replace(/[\s.]/g, "").match(/\d\d/g).join(" ");
      } else if ((label === "adresse" || label === "address") && !out.postalCode) {
        const m = v.match(/^([^;()]+?),\s*(\d{5})\s+([^,;()]+)$/);
        if (m && /\d|rue|avenue|av\.|boulevard|bd|place|chemin|route|allée|impasse|quai|cours|lieu-dit|zone|zac|za /i.test(m[1])) {
          out.streetAddress = m[1].trim();
          out.postalCode = m[2];
          out.addressLocality = m[3].trim();
        }
      }
    }
    return out;
  });
  eleventyConfig.addFilter("publicInfoItems", (items) =>
    (items || [])
      .filter((it) => it && !/^\s*(?:niveau de\s+)?(?:confiance|confidence)/i.test(String(it.label || "")))
      .map((it) => ({ ...it, label: String(it.label || "").replace(/\s*\([^()]*\b(?:confiance|confidence)\b[^()]*\)/gi, "").replace(/\s*[—–-]+\s*(?:confiance|confidence)\b.*$/gi, ""), value: cleanInfoValue(it.value) }))
      .filter((it) => it.value)
  );

  eleventyConfig.addFilter("ficheBrief", (fiche, n = 2) => {
    const items = (fiche.data.infoItems || []).filter((it) => it && it.label && it.value);
    const out = [];
    for (const label of BRIEF_LABELS[fiche.data.breadcrumbCatId] || ["Chiens", "Adresse"]) {
      const it = items.find((i) => i.label === label);
      const value = it && briefText(it.value, 150);
      if (value && !/confiance|^non trouvé|lors de cette recherche/i.test(value)) out.push({ label, value });
      if (out.length >= n) break;
    }
    return out;
  });

  eleventyConfig.addFilter("byCategory", (fiches, catId) =>
    fiches
      .filter((f) => f.data.breadcrumbCatId === catId)
      .sort((a, b) => a.data.order - b.data.order)
  );

  // Fiches d'une catégorie (par countIds, comme countByCats) restreintes à un département.
  eleventyConfig.addFilter("byCategoryAndDept", (fiches, catIds, deptId) =>
    fiches
      .filter(
        (f) =>
          catIds.includes(f.data.breadcrumbCatId) &&
          (f.data.departement || []).includes(deptId)
      )
      .sort((a, b) => a.data.order - b.data.order)
      .sort((a, b) => !!b.data.partenaire - !!a.data.partenaire)
  );

  eleventyConfig.addFilter("countByCatsAndDept", (fiches, catIds, deptId) =>
    fiches.filter(
      (f) =>
        catIds.includes(f.data.breadcrumbCatId) &&
        (f.data.departement || []).includes(deptId)
    ).length
  );

  // Compteurs par département calculés une seule fois par collection : le
  // filtre est appelé ~10 000 fois par build (chaque page département liste
  // les 101 départements), et reparcourir les ~10 000 fiches à chaque appel
  // pesait à lui seul un tiers du temps de build.
  const deptCountCache = new WeakMap();
  eleventyConfig.addFilter("countByDept", (fiches, deptId) => {
    let counts = deptCountCache.get(fiches);
    if (!counts) {
      counts = new Map();
      for (const f of fiches) {
        for (const d of f.data.departement || []) counts.set(d, (counts.get(d) || 0) + 1);
      }
      deptCountCache.set(fiches, counts);
    }
    return counts.get(deptId) || 0;
  });

  // Aperçu borné d'une catégorie pour l'accueil : évite d'embarquer dans le
  // HTML les fiches des 51 départements à la fois (la page atteignait 5,5 Mo
  // avant ce plafond), tout en montrant les ajouts les plus récents.
  eleventyConfig.addFilter("latestByCategory", (fiches, catId, n) =>
    fiches
      .filter((f) => f.data.breadcrumbCatId === catId)
      .sort((a, b) => b.data.order - a.data.order)
      .slice(0, n)
  );

  // Les N fiches ajoutées le plus récemment (order croissant à chaque nouvelle fiche).
  eleventyConfig.addFilter("latest", (fiches, n) =>
    [...fiches].sort((a, b) => b.data.order - a.data.order).slice(0, n)
  );

  eleventyConfig.addFilter("mapCategorie", (tag) =>
    tag === "Lac" || tag === "Point d'eau" ? "Lacs & points d'eau" : tag
  );

  // Type schema.org (données structurées JSON-LD) selon la catégorie de la fiche.
  const SCHEMA_TYPES = {
    plages: "BeachOrPool",
    "cote-azur": "BeachOrPool",
    balades: "TouristAttraction",
    lacs: "TouristAttraction",
    activites: "TouristAttraction",
    restaurants: "Restaurant",
    hebergements: "LodgingBusiness",
    toiletteurs: "LocalBusiness",
    dogwash: "LocalBusiness",
    dogsitters: "LocalBusiness",
    veterinaires: "VeterinaryCare",
  };
  eleventyConfig.addFilter("schemaType", (catId) => SCHEMA_TYPES[catId] || "LocalBusiness");

  // Région administrative réelle d'une fiche, déduite de son département —
  // remplace un ancien "Provence-Alpes-Côte d'Azur" figé dans les données
  // structurées, faux depuis l'arrivée des départements d'Occitanie.
  eleventyConfig.addFilter("regionFor", (deptIds) => {
    const id = Array.isArray(deptIds) ? deptIds[0] : deptIds;
    const dep = departements.find((d) => d.id === id);
    return dep ? dep.region : "Provence-Alpes-Côte d'Azur";
  });

  // Slug du département (pour construire le lien "/en/departement-<slug>"
  // depuis une fiche anglaise, sans jamais figer un seul département).
  eleventyConfig.addFilter("deptSlug", (deptIds) => {
    const id = Array.isArray(deptIds) ? deptIds[0] : deptIds;
    const dep = departements.find((d) => d.id === id);
    return dep ? dep.slug : "var";
  });

  // Département précédé de sa préposition ("en Gironde", "dans le Var",
  // "dans l'Indre", "à Paris"...), reprise du H1 SEO : évite les "du
  // Guadeloupe" d'un article ajouté à la main devant le nom.
  eleventyConfig.addFilter("deptEnNom", (deptIds) => {
    const id = Array.isArray(deptIds) ? deptIds[0] : deptIds;
    const dep = departements.find((d) => d.id === id) || departements.find((d) => d.id === "83");
    return deptEnNom(dep);
  });

  // Badge "Toute l'année" / "Saisonnier" sur les vignettes de plages, dérivé
  // du texte déjà écrit dans les champs "Chiens"/"Horaires chiens" de la
  // fiche — on ne réaffirme jamais une règle d'accès qui ne serait pas déjà
  // écrite noir sur blanc ailleurs sur le site (pas de champ à part à tenir
  // à jour ni de risque de contredire le corps de la fiche).
  // Badge « Restrictions » : la fiche annonce une interdiction (totale ou partielle :
  // « chiens interdits », « non admis à l'intérieur », « plages interdites en été »…)
  // dans son titre. Volontairement nuancé : le détail est dans la fiche.
  eleventyConfig.addFilter("restrictBadge", (title) =>
    /interdit|non admis|non acceptés?|pas acceptés?|refusés?/i.test(String(title || ""))
      ? { label: "Restrictions", cls: "badge-restrict" }
      : null
  );
  // Badge unique d'une vignette : règle chien classée (`regleChien`, plages/lacs/Côte d'Azur),
  // sinon déduction historique depuis les infoItems, badge urgences des vétérinaires,
  // puis badge « Restrictions » d'après le titre.
  const REGLE_BADGES = {
    "toute-annee": { label: "Toute l'année", cls: "badge-year-round" },
    "saisonnier": { label: "Saisonnier", cls: "badge-seasonal" },
    "zones": { label: "Zones limitées", cls: "badge-restrict" },
    "interdit": { label: "Interdits", cls: "badge-restrict" },
  };
  // Filtre « supplément chien » des hébergements (pastilles de card-filter.js) : seulement quand la fiche
  // donne un tarif net, sans doute ni contradiction (sinon rien).
  const SUPP_LABEL = /chien|animal|animaux|suppl[ée]ment/i;
  const SUPP_DOUBT = /guide|assistance|bringfido|d'après|sous réserve|cas par cas|majorité|source dist|possiblement|mentionn|précis|indiqu|trouvé|avec suppl|payant|selon l'h|selon les|plateforme|\d\s*à\s*\d|reconfirm|autour de|restaurant|contradi|à confirmer|a confirmer|non confirm|selon un|seule? source|tiers|revendeur|agrégateur|ota\b|expedia|booking|trip\.com|hotels\.com|confiance (faible|moyenne|basse)|doute|diverg|environ|usd|\$|semaine|séjour|sejour|selon la catégorie|selon le type|selon la saison|haute saison|basse saison|à partir de|a partir de|jusqu'à|jusqu'a|non précisé|non detaill|non détaill|ménage|caution|dépôt/i;
  eleventyConfig.addFilter("suppTier", function (fiche) {
    if (!fiche || !fiche.data || fiche.data.breadcrumbCatId !== "hebergements") return null;
    const items = fiche.data.infoItems;

  if (!Array.isArray(items)) return null;
  let tier = null;
  for (const it of items) {
    const l = String(it && it.label || "").trim(), v = String(it && it.value || "");
    if (!SUPP_LABEL.test(l)) continue;
    if (/non admis|non accept|interdit|refus|pas accept|n'accept/i.test(v)) return null;
    if (SUPP_DOUBT.test(v) || SUPP_DOUBT.test(l)) return null;
    const free = /gratuit|sans suppl[ée]ment|pas de suppl[ée]ment|sans frais|aucun suppl[ée]ment|offert/i.test(v);
    const amounts = [...v.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:€|euros?)\s*(?:\/|par|la|le)?\s*(?:nuit|jour|nuitée)/gi)].map(m => parseFloat(m[1].replace(",", ".")));
    const anyEuro = /\d\s*(?:€|euros?)/i.test(v);
    let t = null;
    if (free && !anyEuro) t = "Sans supplément";
    else if (!free && amounts.length && new Set(amounts).size === 1 && amounts[0] > 0 && amounts[0] <= 10 && (v.match(/\d\s*(?:€|euros?)/gi) || []).length === 1) t = "Supplément ≤ 10 €/nuit";
    else if (anyEuro || free) return null;
    if (t) { if (tier && tier !== t) return null; tier = t; }
  }
  return tier;
  });

  // Bloc « En bref » des pages ville (11/11/2026) : chiffres calculés sur nos
  // fiches de la ville, sans texte ajouté. Une ligne par sujet présent.
  eleventyConfig.addFilter("cityBrief", function (fiches) {
    const fs = fiches || [];
    const cat = (...ids) => fs.filter((f) => ids.includes(f.data.breadcrumbCatId));
    const pl = (n, one, many) => `${n} ${n > 1 ? many : one}`;
    const lines = [];
    const heb = cat("hebergements");
    if (heb.length) {
      const ok = heb.filter((f) => dogStatusOf(f) === "ok");
      const tiers = ok.map((f) => eleventyConfig.getFilter("suppTier")(f));
      const free = tiers.filter((t) => t === "Sans supplément").length;
      const low = tiers.filter((t) => t === "Supplément ≤ 10 €/nuit").length;
      let t = ok.length
        ? `${pl(ok.length, "hébergement", "hébergements")} où le chien est accepté`
        : "aucun hébergement où l'accueil du chien est confirmé";
      const extra = [];
      if (free) extra.push(`${free} sans supplément`);
      if (low) extra.push(`${low} avec un supplément de 10 €/nuit au plus`);
      if (extra.length) t += ` (dont ${extra.join(", ")})`;
      if (heb.length > ok.length) t += ` ; ${pl(heb.length - ok.length, "autre adresse", "autres adresses")} à confirmer ou refusant les chiens`;
      lines.push({ label: "Dormir", text: t, anchor: "hebergements" });
    }
    const resto = cat("restaurants");
    if (resto.length) {
      const ok = resto.filter((f) => dogStatusOf(f) === "ok").length;
      let t = ok ? `${pl(ok, "restaurant", "restaurants")} qui acceptent le chien` : "aucun restaurant où l'accueil du chien est confirmé";
      if (ok === 1) t = "1 restaurant qui accepte le chien";
      if (resto.length > ok) t += ` ; ${pl(resto.length - ok, "autre adresse", "autres adresses")} à confirmer ou refusant les chiens`;
      lines.push({ label: "Manger", text: t, anchor: "restaurants" });
    }
    const eau = cat("plages", "cote-azur", "lacs");
    if (eau.length) {
      const c = (r) => eau.filter((f) => f.data.regleChien === r).length;
      const parts = [];
      if (c("toute-annee")) parts.push(`chien admis toute l'année : ${c("toute-annee")}`);
      if (c("saisonnier")) parts.push(`hors saison seulement : ${c("saisonnier")}`);
      if (c("zones")) parts.push(`sur des zones limitées : ${c("zones")}`);
      if (c("interdit")) parts.push(`interdit aux chiens : ${c("interdit")}`);
      const rest = eau.length - c("toute-annee") - c("saisonnier") - c("zones") - c("interdit");
      if (rest) parts.push(`règle à vérifier : ${rest}`);
      const nPl = cat("plages", "cote-azur").length, nLa = cat("lacs").length;
      const what = [nPl ? pl(nPl, "plage", "plages") : "", nLa ? pl(nLa, "lac ou plan d'eau", "lacs ou plans d'eau") : ""].filter(Boolean).join(" et ");
      lines.push({ label: "Baignade", text: `${what} (${parts.join(" ; ")})`, anchor: nPl ? "plages" : "lacs" });
    }
    const bal = cat("balades");
    if (bal.length) lines.push({ label: "Se promener", text: pl(bal.length, "balade", "balades"), anchor: "balades" });
    const vet = cat("veterinaires");
    if (vet.length) {
      const g = vet.filter((f) => eleventyConfig.getFilter("vetBadge")(f.data.infoItems)).length;
      lines.push({ label: "Santé", text: `${pl(vet.length, "vétérinaire", "vétérinaires")}${g ? `, dont ${g} avec urgences 24h/24 vérifiées` : ""}`, anchor: "veterinaires" });
    }
    const serv = [];
    const tl = cat("toiletteurs").length, dw = cat("dogwash").length, gd = cat("dogsitters").length, ed = cat("education").length;
    if (tl) serv.push(pl(tl, "toiletteur", "toiletteurs"));
    if (dw) serv.push(pl(dw, "dogwash", "dogwash"));
    if (gd) serv.push(pl(gd, "garde de chien", "gardes de chien"));
    if (ed) serv.push(pl(ed, "éducateur ou club canin", "éducateurs ou clubs canins"));
    if (serv.length) lines.push({ label: "Services", text: serv.join(", ") });
    return lines;
  });
  // Bloc « En bref » des pages catégorie × département et ville × catégorie
  // (12/11/2026) : chiffres calculés sur les fiches de la page, à la place du
  // texte d'introduction identique d'une page à l'autre.
  eleventyConfig.addFilter("catBrief", function (fiches, cat) {
    const fs = fiches || [];
    const pl = (n, one, many) => `${n} ${n > 1 ? many : one}`;
    const lines = [];
    if (cat === "hebergements" || cat === "restaurants") {
      const ok = fs.filter((f) => dogStatusOf(f) === "ok");
      const refus = fs.filter((f) => dogStatusOf(f) === "refus").length;
      const neutre = fs.length - ok.length - refus;
      lines.push({ label: "Chien accepté", text: cat === "hebergements" ? pl(ok.length, "hébergement", "hébergements") : pl(ok.length, "restaurant", "restaurants") });
      if (cat === "hebergements") {
        const tiers = ok.map((f) => eleventyConfig.getFilter("suppTier")(f));
        const free = tiers.filter((t) => t === "Sans supplément").length;
        const low = tiers.filter((t) => t === "Supplément ≤ 10 €/nuit").length;
        if (free) lines.push({ label: "Sans supplément pour le chien", text: String(free) });
        if (low) lines.push({ label: "Supplément de 10 €/nuit au plus", text: String(low) });
      }
      if (neutre) lines.push({ label: "Accueil du chien à confirmer", text: pl(neutre, "adresse", "adresses") });
      if (refus) lines.push({ label: "Chiens non acceptés", text: pl(refus, "adresse", "adresses") + " (signalées pour t'éviter un refus)" });
    } else if (["plages", "lacs"].includes(cat)) {
      const c = (r) => fs.filter((f) => f.data.regleChien === r).length;
      const rows = [["toute-annee", "Chien admis toute l'année"], ["saisonnier", "Hors saison seulement"], ["zones", "Sur des zones limitées"], ["interdit", "Interdit aux chiens"]];
      let known = 0;
      for (const [k, l] of rows) if (c(k)) { lines.push({ label: l, text: String(c(k)) }); known += c(k); }
      if (fs.length - known) lines.push({ label: "Règle à vérifier", text: String(fs.length - known) });
    } else if (cat === "veterinaires") {
      const g = fs.filter((f) => vetBadge(f.data.infoItems)).length;
      if (g) lines.push({ label: "Urgences 24h/24 vérifiées", text: pl(g, "clinique", "cliniques") });
    }
    // Communes les plus représentées.
    const byTown = {};
    for (const f of fs) { const t = f.data.cardTag; if (t && !/[\/+→]| et /.test(t)) byTown[t] = (byTown[t] || 0) + 1; }
    const towns = Object.entries(byTown).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"));
    if (towns.length) {
      lines.push({ label: "Communes", text: `${towns.length} (${towns.slice(0, 5).map(([t, n]) => `${t} ${n}`).join(", ")}${towns.length > 5 ? "…" : ""})` });
    }
    return lines;
  });
  eleventyConfig.addFilter("cardBadge", function (fiche) {
    const d = (fiche && fiche.data) || {};
    const cat = d.breadcrumbCatId;
    let badge = null;
    if (d.regleChien && REGLE_BADGES[d.regleChien]) badge = REGLE_BADGES[d.regleChien];
    else if (d.regleChien === "incertain") badge = null;
    else if (cat === "plages" || cat === "cote-azur") badge = eleventyConfig.getFilter("accessBadge")(d.infoItems);
    else if (cat === "veterinaires") badge = eleventyConfig.getFilter("vetBadge")(d.infoItems);
    if (!badge) badge = eleventyConfig.getFilter("restrictBadge")(d.title);
    if (!badge && d.regleChien === "incertain") badge = { label: "Règle à vérifier", cls: "badge-unknown" };
    return badge;
  });
  eleventyConfig.addFilter("accessBadge", (infoItems) => {
    const find = (label) => (infoItems || []).find((i) => i.label === label);
    const chiens = find("Chiens");
    const horaires = find("Horaires chiens");
    const text = ((chiens ? chiens.value : "") + " " + (horaires ? horaires.value : "")).toLowerCase();
    if (text.includes("hors saison") || /été 20\d\d/.test(text)) {
      return { label: "Saisonnier", cls: "badge-seasonal" };
    }
    if (text.includes("toute l'année") || text.includes("toute l’année") || text.includes("sans restriction")) {
      return { label: "Toute l'année", cls: "badge-year-round" };
    }
    return null;
  });

  // srcset pour les photos hébergées sur Unsplash : l'API Unsplash accepte déjà
  // un paramètre `w` dans l'URL, donc on peut demander plusieurs largeurs sans
  // stocker de fichiers supplémentaires. Renvoie null pour les photos locales
  // (assets/*.jpg), qui n'ont qu'une seule taille disponible.
  // Les fiches stockent des URLs Unsplash avec `fm=jpg` figé en dur (choix fait
  // à la rédaction de chaque fiche) : ça empêche le navigateur de recevoir du
  // WebP/AVIF, nettement plus légers, même quand il les supporte. On retire ce
  // `fm` explicite et on active la négociation de format d'Unsplash/Imgix
  // (`auto=format`), qui sert automatiquement le format le plus léger supporté
  // par le navigateur (via l'en-tête Accept), à qualité équivalente.
  function unsplashAutoFormat(url) {
    const u = new URL(url);
    u.searchParams.delete("fm");
    u.searchParams.set("auto", "format,compress");
    return u;
  }
  eleventyConfig.addFilter("optimizeImg", (url) => {
    if (!url || !url.includes("images.unsplash.com")) return url;
    try {
      return unsplashAutoFormat(url).toString();
    } catch (e) {
      return url;
    }
  });

  eleventyConfig.addFilter("imgSrcset", (url) => {
    if (!url || !url.includes("images.unsplash.com")) return null;
    try {
      return [400, 800, 1080]
        .map((w) => {
          const u = unsplashAutoFormat(url);
          u.searchParams.set("w", String(w));
          return `${u.toString()} ${w}w`;
        })
        .join(", ");
    } catch (e) {
      return null;
    }
  });

  // Image + dimensions pour og:image/twitter:image. Sur Unsplash, on force un
  // recadrage 1200x630 (ratio standard des aperçus de partage) via l'API
  // Unsplash elle-même, ce qui garantit que les dimensions annoncées sont
  // exactes. Pour les photos locales, dimensions réelles du fichier (mesurées
  // une fois, `file <chemin>`) — jamais de dimension devinée.
  const LOCAL_IMAGE_DIMENSIONS = {
    "assets/coco-hero.jpg": [1200, 1600],
    "assets/bonporteau.jpg": [1600, 2133],
    "assets/coco-sentier.jpg": [1200, 1600],
    "assets/grand-pin-port-grimaud.jpg": [1500, 2000],
    "assets/charlotte-garde-animaux-sainte-maxime.jpg": [1500, 1496],
  };
  eleventyConfig.addFilter("ogImage", (url) => {
    const src = url || "https://cocoexplore.com/assets/coco-hero.jpg";
    if (src.includes("images.unsplash.com")) {
      try {
        const u = new URL(src);
        u.searchParams.set("w", "1200");
        u.searchParams.set("h", "630");
        u.searchParams.set("fit", "crop");
        u.searchParams.set("crop", "entropy");
        return { url: u.toString(), width: 1200, height: 630 };
      } catch (e) {
        return { url: src, width: null, height: null };
      }
    }
    const match = Object.keys(LOCAL_IMAGE_DIMENSIONS).find((k) => src.endsWith(k));
    if (match) {
      const [width, height] = LOCAL_IMAGE_DIMENSIONS[match];
      return { url: src, width, height };
    }
    return { url: src, width: null, height: null };
  });

  // URL absolue d'une image pour le sitemap (balises <image:image>, requiert des
  // URLs absolues) : les photos Unsplash sont déjà en https://, les photos locales
  // (src/assets/*.jpg) sont préfixées avec le domaine.
  eleventyConfig.addFilter("absoluteImg", (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : "https://cocoexplore.com/" + url;
  });

  // URL "propre" d'une fiche/page, sans l'extension .html : c'est la version
  // canonique de chaque URL depuis la correction des doublons détectés par
  // Google Search Console (les fichiers de sortie restent en .html sur disque,
  // Netlify les sert aussi sans extension — voir _redirects.njk pour les 301).
  eleventyConfig.addFilter("cleanUrl", (path) => (path || "").replace(/\.html$/, ""));

  // Badge "Urgences 24h/24" sur les vignettes de vétérinaires, dérivé du champ
  // "Urgences" des infoItems déjà présent sur la fiche — même principe que
  // accessBadge : on ne réaffirme jamais une info qui ne serait pas déjà
  // écrite noir sur blanc ailleurs sur la fiche.
  eleventyConfig.addFilter("vetBadge", vetBadge);

  // Date de dernière modification réelle d'un fichier source (dernier commit git),
  // pour un sitemap.xml dont le <lastmod> reflète les vraies corrections de contenu.
  eleventyConfig.addFilter("lastmod", (inputPath) =>
    gitLastModified(inputPath) || new Date().toISOString().slice(0, 10)
  );

  // "22 octobre 2026" (ou "22 October 2026" pour les fiches anglaises), à
  // partir d'une date YYYY-MM-DD (ex. sortie du filtre lastmod).
  eleventyConfig.addFilter("dateLong", (isoDate, lang) =>
    new Date(isoDate + "T12:00:00Z").toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  // Date au format RFC 822, requis par la spec RSS pour <pubDate>.
  eleventyConfig.addFilter("rfc822", (isoDate) =>
    new Date(isoDate + "T12:00:00Z").toUTCString()
  );

  // Autres fiches de la même catégorie à suggérer en bas d'une fiche
  // (priorité à celles du même département, puis complété par les autres).
  // La fenêtre choisie tourne de façon déterministe selon la fiche consultée
  // (hash de son propre permalink) plutôt que de toujours prendre les mêmes
  // premières fiches par ordre alphabétique : sans ça, dans un groupe
  // département+catégorie de plus de n fiches, les mêmes n fiches seraient
  // suggérées partout et les autres ne recevraient jamais de lien "à
  // proximité" (maillage interne très déséquilibré à l'échelle du site).
  function rotatedSlice(arr, seed, n) {
    if (arr.length <= n) return arr;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const offset = hash % arr.length;
    return arr.slice(offset).concat(arr.slice(0, offset)).slice(0, n);
  }

  // Fiches de chaque catégorie, triées par slug, calculées une seule fois par
  // collection (le filtre "related" est appelé une fois par fiche : refiltrer
  // et retrier les ~10 000 fiches à chaque appel pesait 40 % du build).
  const relatedPoolCache = new WeakMap();
  function fichesByCategory(fiches) {
    let byCat = relatedPoolCache.get(fiches);
    if (!byCat) {
      byCat = new Map();
      const sorted = [...fiches].sort((a, b) => a.data.slug.localeCompare(b.data.slug));
      for (const f of sorted) {
        const cat = f.data.breadcrumbCatId;
        if (!byCat.has(cat)) byCat.set(cat, []);
        byCat.get(cat).push(f);
      }
      relatedPoolCache.set(fiches, byCat);
    }
    return byCat;
  }

  eleventyConfig.addFilter("related", (fiches, catId, dept, excludePath, n) => {
    const pool = (fichesByCategory(fiches).get(catId) || []).filter(
      (f) => f.data.permalinkPath !== excludePath
    );
    const sameDept = pool.filter((f) => (f.data.departement || []).some((d) => (dept || []).includes(d)));
    const sameDeptSet = new Set(sameDept);
    const rest = pool.filter((f) => !sameDeptSet.has(f));
    // Les partenaires du même département sont toujours proposés en premier.
    const sameDeptPartners = sameDept.filter((f) => f.data.partenaire).slice(0, n);
    const chosen = [
      ...sameDeptPartners,
      ...rotatedSlice(sameDept.filter((f) => !f.data.partenaire), excludePath, n - sameDeptPartners.length),
    ];
    if (chosen.length < n) {
      chosen.push(...rotatedSlice(rest, excludePath, n - chosen.length));
    }
    return chosen;
  });

  // "Les conseils de Coco" : une plage, une balade et un restaurant piochés
  // chaque semaine (rotation déterministe basée sur le numéro de semaine ISO —
  // aucune liste à maintenir à la main). Cohérence géographique : on choisit
  // d'abord UN département qui a bien les trois catégories, puis une fiche de
  // chaque catégorie dans ce même département — jamais une plage à Nice avec
  // un restaurant à Marseille.
  eleventyConfig.addFilter("weeklyConseils", (fiches, departements) => {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    const tags = ["Plage", "Balade", "Restaurant"];
    const hasTagInDept = (tag, deptId) =>
      fiches.some((f) => f.data.tag === tag && (f.data.departement || []).includes(deptId));
    const eligible = departements.filter((dep) => tags.every((tag) => hasTagInDept(tag, dep.id)));
    if (!eligible.length) return [];

    const dept = eligible[weekNum % eligible.length];
    return tags.map((tag) => {
      const pool = fiches
        .filter((f) => f.data.tag === tag && (f.data.departement || []).includes(dept.id))
        .sort((a, b) => a.data.slug.localeCompare(b.data.slug));
      const f = pool[weekNum % pool.length].data;
      return {
        tag: f.tag,
        titre: f.h1,
        lieu: f.lieu,
        permalinkPath: f.permalinkPath,
        heroImage: f.heroImage,
        lat: f.lat,
        lng: f.lng,
      };
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
