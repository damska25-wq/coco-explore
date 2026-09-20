import { execSync } from "node:child_process";

const gitDateCache = new Map();
function gitLastModified(filePath) {
  if (gitDateCache.has(filePath)) return gitDateCache.get(filePath);
  let date = null;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`).toString().trim();
    if (out) date = out.slice(0, 10);
  } catch (e) {
    /* pas un dépôt git, ou fichier non suivi — on retombera sur la date du jour */
  }
  gitDateCache.set(filePath, date);
  return date;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/avis.js");
  eleventyConfig.addPassthroughCopy("src/map.js");
  eleventyConfig.addPassthroughCopy("src/search.js");
  eleventyConfig.addPassthroughCopy("src/favoris.js");
  eleventyConfig.addPassthroughCopy("src/cookie-consent.js");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/google42d095cf02301eb6.html");

  eleventyConfig.addCollection("fiches", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/fiches/*.njk").sort((a, b) =>
      a.data.slug.localeCompare(b.data.slug)
    )
  );

  eleventyConfig.addFilter("byCategory", (fiches, catId) =>
    fiches
      .filter((f) => f.data.breadcrumbCatId === catId)
      .sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addFilter("countByCats", (fiches, catIds) =>
    fiches.filter((f) => catIds.includes(f.data.breadcrumbCatId)).length
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
  );

  eleventyConfig.addFilter("countByCatsAndDept", (fiches, catIds, deptId) =>
    fiches.filter(
      (f) =>
        catIds.includes(f.data.breadcrumbCatId) &&
        (f.data.departement || []).includes(deptId)
    ).length
  );

  eleventyConfig.addFilter("countByDept", (fiches, deptId) =>
    fiches.filter((f) => (f.data.departement || []).includes(deptId)).length
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

  // Date de dernière modification réelle d'un fichier source (dernier commit git),
  // pour un sitemap.xml dont le <lastmod> reflète les vraies corrections de contenu.
  eleventyConfig.addFilter("lastmod", (inputPath) =>
    gitLastModified(inputPath) || new Date().toISOString().slice(0, 10)
  );

  // Date au format RFC 822, requis par la spec RSS pour <pubDate>.
  eleventyConfig.addFilter("rfc822", (isoDate) =>
    new Date(isoDate + "T12:00:00Z").toUTCString()
  );

  // Autres fiches de la même catégorie à suggérer en bas d'une fiche
  // (priorité à celles du même département, puis complété par les autres).
  eleventyConfig.addFilter("related", (fiches, catId, dept, excludePath, n) => {
    const pool = fiches.filter(
      (f) => f.data.breadcrumbCatId === catId && f.data.permalinkPath !== excludePath
    );
    const bySlug = (a, b) => a.data.slug.localeCompare(b.data.slug);
    const sameDept = pool
      .filter((f) => (f.data.departement || []).some((d) => (dept || []).includes(d)))
      .sort(bySlug);
    const rest = pool.filter((f) => !sameDept.includes(f)).sort(bySlug);
    return [...sameDept, ...rest].slice(0, n);
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
      return pool[weekNum % pool.length].data.permalinkPath;
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
