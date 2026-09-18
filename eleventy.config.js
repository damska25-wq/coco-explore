export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/avis.js");
  eleventyConfig.addPassthroughCopy("src/map.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

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

  // Pioche automatiquement une fiche par semaine dans une catégorie donnée
  // (rotation déterministe basée sur le numéro de semaine ISO — aucune liste à
  // maintenir à la main, la sélection s'étend d'elle-même aux nouvelles fiches).
  eleventyConfig.addFilter("weeklyPick", (fiches, tag) => {
    const pool = fiches
      .filter((f) => f.data.tag === tag)
      .sort((a, b) => a.data.slug.localeCompare(b.data.slug));
    if (!pool.length) return null;
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return pool[weekNum % pool.length].data.permalinkPath;
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
