import { execSync } from "node:child_process";
import departements from "./src/_data/departements.js";

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
function gitLastModified(filePath) {
  return gitDateMap.get(filePath.replace(/^\.\//, "")) || null;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/vendor");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/avis.js");
  eleventyConfig.addPassthroughCopy("src/map.js");
  eleventyConfig.addPassthroughCopy("src/geoloc.js");
  eleventyConfig.addPassthroughCopy("src/conseils.js");
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

  // Badge "Toute l'année" / "Saisonnier" sur les vignettes de plages, dérivé
  // du texte déjà écrit dans les champs "Chiens"/"Horaires chiens" de la
  // fiche — on ne réaffirme jamais une règle d'accès qui ne serait pas déjà
  // écrite noir sur blanc ailleurs sur le site (pas de champ à part à tenir
  // à jour ni de risque de contredire le corps de la fiche).
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
  eleventyConfig.addFilter("vetBadge", (infoItems) => {
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
  });

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

  eleventyConfig.addFilter("related", (fiches, catId, dept, excludePath, n) => {
    const pool = fiches.filter(
      (f) => f.data.breadcrumbCatId === catId && f.data.permalinkPath !== excludePath
    );
    const bySlug = (a, b) => a.data.slug.localeCompare(b.data.slug);
    const sameDept = pool
      .filter((f) => (f.data.departement || []).some((d) => (dept || []).includes(d)))
      .sort(bySlug);
    const rest = pool.filter((f) => !sameDept.includes(f)).sort(bySlug);
    const chosen = rotatedSlice(sameDept, excludePath, n);
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
