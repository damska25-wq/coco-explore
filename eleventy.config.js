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

  eleventyConfig.addFilter("mapCategorie", (tag) =>
    tag === "Lac" || tag === "Point d'eau" ? "Lacs & points d'eau" : tag
  );

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
