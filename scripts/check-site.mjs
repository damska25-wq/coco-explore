// Contrôle de sécurité exécuté après chaque build (npm run build) : s'il
// échoue, le build échoue et Netlify garde la version précédente du site en
// ligne au lieu de publier une version cassée. Ajouté après l'incident du
// 22/10/2026 (noindex posé par erreur sur 9221 pages, passé en production).
//
// Pour lancer à la main après un build : node scripts/check-site.mjs
import { readFileSync, readdirSync, openSync, readSync, closeSync } from "node:fs";
import { join } from "node:path";

const SITE = "_site";
const MAX_NOINDEX = 20; // pages volontairement en noindex (ex. /admin-avis)
const MIN_SITEMAP_RATIO = 0.95; // part minimale des fiches présentes dans le sitemap
const CONFIANCE = /[Cc]onfiance (faible|moyenne|haute)/;
const PLACEHOLDER = /\{(enNom|villes|total|nbDeps|n)\}/;

const errors = [];

function head(path, bytes) {
  const fd = openSync(path, "r");
  const buf = Buffer.alloc(bytes);
  const n = readSync(fd, buf, 0, bytes, 0);
  closeSync(fd);
  return buf.toString("utf8", 0, n);
}

// Parcours récursif à la main (readdirSync recursive n'existe pas sur les
// vieilles versions de Node qu'un build Netlify pourrait utiliser).
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

function ficheSources() {
  return ["src/fiches", "src/en/fiches"].flatMap((dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith(".njk"))
      .map((f) => join(dir, f))
  );
}

// 1. Pages en noindex : le <head> suffit, inutile de lire toute la page.
const html = htmlFiles(SITE);
const noindex = html.filter((f) => /<meta name="robots" content="[^"]*noindex/.test(head(f, 6000)));
if (noindex.length > MAX_NOINDEX) {
  errors.push(
    `${noindex.length} pages en noindex (maximum toléré : ${MAX_NOINDEX}). Exemples : ${noindex.slice(0, 5).join(", ")}`
  );
}

// 2. Sitemap : il doit contenir (presque) toutes les fiches.
const sources = ficheSources();
const sitemapUrls = (readFileSync(join(SITE, "sitemap.xml"), "utf8").match(/<loc>/g) || []).length;
if (sitemapUrls < sources.length * MIN_SITEMAP_RATIO) {
  errors.push(`sitemap.xml ne contient que ${sitemapUrls} URL pour ${sources.length} fiches.`);
}

// 3. Mentions de travail "confiance X" dans les champs publics des fiches,
// et 4. photos Unsplash utilisées par deux fiches françaises.
const photos = new Map();
for (const file of sources) {
  const text = readFileSync(file, "utf8");
  for (const field of ["title", "description", "cardTeaser"]) {
    const m = text.match(new RegExp(`^${field}: (.*)$`, "m"));
    if (m && CONFIANCE.test(m[1])) errors.push(`${file} : « confiance X » dans le champ ${field}.`);
  }
  if (file.startsWith("src/fiches")) {
    const hero = text.match(/^heroImage: .*?(photo-[0-9a-f-]+)/m);
    if (hero) {
      if (photos.has(hero[1])) errors.push(`Photo ${hero[1]} utilisée par ${photos.get(hero[1])} et ${file}.`);
      else photos.set(hero[1], file);
    }
  }
}

// 5. Gabarits de texte non remplacés sur les pages catégorie.
for (const file of html.filter((f) => /-chien(-[a-z0-9-]+)?\.html$/.test(f))) {
  if (PLACEHOLDER.test(readFileSync(file, "utf8"))) errors.push(`${file} : gabarit {…} non remplacé.`);
}

if (errors.length) {
  console.error(`\n✖ Contrôle du site : ${errors.length} problème(s), mise en ligne bloquée.\n`);
  for (const e of errors.slice(0, 50)) console.error("  - " + e);
  if (errors.length > 50) console.error(`  … et ${errors.length - 50} autres.`);
  process.exit(1);
}
console.log(
  `✔ Contrôle du site OK : ${html.length} pages, ${noindex.length} en noindex, ${sitemapUrls} URL dans le sitemap, ${photos.size} photos uniques.`
);
