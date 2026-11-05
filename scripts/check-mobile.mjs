// Contrôle mobile : ouvre un échantillon de pages du site généré (_site) dans Chromium à la largeur
// d'un téléphone (375 px) et signale celles qui débordent en largeur (défilement horizontal),
// avec les éléments qui dépassent. À lancer en local après le build (pas sur Netlify, sans navigateur) :
//   npx @11ty/eleventy && node scripts/check-mobile.mjs [nombre de pages par type, défaut 4]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
// Playwright est installé globalement dans l'environnement (require le trouve, pas import).
const { chromium } = createRequire(import.meta.url)("playwright");

const ROOT = path.resolve("_site");
const PER_TYPE = Number(process.argv[2] || 4);
const TYPES = {
  "fiche-": (f) => f.startsWith("fiche-"),
  "ville": (f) => f.endsWith("-avec-son-chien.html"),
  "departement": (f) => f.startsWith("departement-"),
  "guide": (f) => f.startsWith("guide-"),
  "categorie-dep": (f) => /^(plage|hebergement|restaurant|veterinaire|balade|toiletteur|dogwash|lac)-chien-[a-z-]+\.html$/.test(f),
};
const FIXED = ["index.html", "guides.html", "noel-chien.html", "hiver-chien.html", "espace-pro.html", "404.html", "plage-chien.html", "hebergement-chien.html"];

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
function sample(list, n) {
  // échantillon déterministe réparti sur toute la liste
  if (list.length <= n) return list;
  const step = list.length / n;
  return Array.from({ length: n }, (_, i) => list[Math.floor(i * step)]);
}
const pages = new Set(FIXED.filter((f) => files.includes(f)));
for (const test of Object.values(TYPES)) sample(files.filter(test).sort(), PER_TYPE).forEach((f) => pages.add(f));

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  let file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
// pas de réseau externe (images, polices, analytics) : seul le gabarit compte ici
await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
const page = await ctx.newPage();
const problems = [];
for (const f of pages) {
  try {
    await page.goto(`${base}/${f}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      if (sw <= vw + 1) return null;
      const out = [];
      for (const el of document.body.querySelectorAll("*")) {
        const b = el.getBoundingClientRect();
        if (b.width && b.right > vw + 1) {
          const st = getComputedStyle(el);
          if (st.position === "fixed" || st.visibility === "hidden") continue;
          out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : ""} (${Math.round(b.right)} px)`);
          if (out.length >= 5) break;
        }
      }
      return { vw, sw, out };
    });
    if (r) problems.push(`${f} : largeur ${r.sw} px pour ${r.vw} px — ${r.out.join(", ")}`);
  } catch (e) {
    problems.push(`${f} : erreur de chargement (${e.message.split("\n")[0]})`);
  }
}
await browser.close();
server.close();
if (problems.length) {
  console.log(`✘ Contrôle mobile : ${problems.length} page(s) sur ${pages.size} débordent en largeur à 375 px :`);
  problems.forEach((p) => console.log("  - " + p));
  process.exit(1);
}
console.log(`✔ Contrôle mobile OK : ${pages.size} pages sans débordement horizontal à 375 px.`);
