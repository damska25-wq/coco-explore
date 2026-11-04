import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

// Formulaire « Espace pro » : un professionnel demande l'ajout, la correction
// ou la mise en avant de sa fiche. La demande est enregistrée dans le store
// Blobs `demandes-pros` et une notification part sur ntfy (variable NTFY_TOPIC,
// la même que pour les avis). Anti-spam : champ piège `website`, au plus
// MAX_POSTS demandes par visiteur (IP hachée) et par heure.
const MAX_POSTS = 5;
const POST_WINDOW = 60 * 60 * 1000;
const TYPES = { ajout: "Ajouter mon etablissement", correction: "Corriger ma fiche", partenaire: "Mise en avant (partenaire)", autre: "Autre demande" };

function json(data, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}
const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "Requête invalide" }, 400); }
  if (body.website) return json({ ok: true }); // robot : ignoré sans erreur

  const entry = {
    type: TYPES[body.type] ? body.type : "autre",
    etablissement: clean(body.etablissement, 120),
    ville: clean(body.ville, 80),
    nom: clean(body.nom, 80),
    email: clean(body.email, 120),
    telephone: clean(body.telephone, 30),
    lien: clean(body.lien, 300),
    message: clean(body.message, 1500),
    date: new Date().toISOString()
  };
  if (!entry.etablissement || !entry.ville) return json({ error: "Indique le nom de l'établissement et sa commune." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) return json({ error: "Adresse e-mail invalide." }, 400);

  const ip = (context && context.ip) || req.headers.get("x-nf-client-connection-ip") || "";
  const limits = getStore("pro-limites");
  const key = "post:" + createHash("sha256").update("coco-explore-pro:" + (ip || "inconnu")).digest("hex").slice(0, 32);
  const now = Date.now();
  const hits = ((await limits.get(key, { type: "json" })) || []).filter((t) => now - t < POST_WINDOW);
  if (hits.length >= MAX_POSTS) return json({ error: "Trop de demandes envoyées, réessaie dans une heure." }, 429);
  await limits.setJSON(key, [...hits, now]);

  const store = getStore("demandes-pros");
  await store.setJSON(entry.date + "-" + Math.random().toString(36).slice(2, 8), entry);

  const topic = process.env.NTFY_TOPIC;
  if (topic) {
    try {
      await fetch("https://ntfy.sh/" + encodeURIComponent(topic), {
        method: "POST",
        headers: { Title: "Demande pro - Coco Explore", Tags: "briefcase" },
        body: TYPES[entry.type] + "\n" + entry.etablissement + " (" + entry.ville + ")\n" + (entry.nom ? entry.nom + " - " : "") + entry.email + (entry.telephone ? " - " + entry.telephone : "") + (entry.lien ? "\n" + entry.lien : "") + (entry.message ? "\n\n" + entry.message : "")
      });
    } catch (e) { /* la notification ne doit jamais bloquer l'enregistrement */ }
  }
  return json({ ok: true });
};

export const config = { path: "/api/pro" };
