import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

const MAX_NAME = 60;
const MAX_MESSAGE = 500;
const MAX_PHOTO_CHARS = 400000; // ~300 Ko en base64, après redimensionnement côté client
const MAX_ENTRIES_PER_FICHE = 300;
const MAX_PAGE = 200;

// Modération : chaque nouvel avis est enregistré "pending" et n'apparaît sur
// la fiche qu'une fois validé depuis /admin-avis. Les avis déposés avant la
// mise en place de la modération n'ont pas de champ status : ils restent
// publiés.
//
// Variables d'environnement Netlify :
// - ADMIN_KEY  : mot de passe de la page /admin-avis (obligatoire pour l'admin).
// - NTFY_TOPIC : canal ntfy.sh qui reçoit une notification à chaque nouvel avis
//                (optionnel : sans lui, aucune notification n'est envoyée).

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

const isPublished = (entry) => !entry.status || entry.status === "approved";

function isAdmin(req) {
  const expected = process.env.ADMIN_KEY || "";
  const given = req.headers.get("x-admin-key") || "";
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

async function notify(entry, fiche) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  const stars = entry.rating ? " " + "★".repeat(entry.rating) : "";
  try {
    await fetch("https://ntfy.sh/" + encodeURIComponent(topic), {
      method: "POST",
      headers: {
        // ntfy lit les en-têtes en latin-1 : titre sans caractère accentué.
        Title: "Nouvel avis a valider - Coco Explore",
        Tags: "dog",
        Click: "https://cocoexplore.com/admin-avis"
      },
      body:
        entry.name + stars + " sur " + (entry.page || fiche) + "\n" +
        entry.message + (entry.photo ? "\n(avec une photo)" : "")
    });
  } catch (e) {
    /* la notification ne doit jamais empêcher l'enregistrement de l'avis */
  }
}

async function adminList(store) {
  const { blobs } = await store.list();
  const all = [];
  for (const { key } of blobs) {
    const entries = (await store.get(key, { type: "json" })) || [];
    for (const entry of entries) all.push({ ...entry, fiche: key, status: entry.status || "approved" });
  }
  all.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return all;
}

async function adminUpdate(store, fiche, id, action) {
  const entries = (await store.get(fiche, { type: "json" })) || [];
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return false;
  if (action === "delete") entries.splice(index, 1);
  else entries[index] = { ...entries[index], status: "approved" };
  await store.setJSON(fiche, entries);
  return true;
}

export default async (req) => {
  const store = getStore("avis-coco-explore");
  const url = new URL(req.url);

  if (url.searchParams.has("admin")) {
    if (!process.env.ADMIN_KEY) return json({ error: "ADMIN_KEY non configurée sur Netlify." }, 503);
    if (!isAdmin(req)) return json({ error: "Mot de passe incorrect." }, 401);

    if (req.method === "GET") return json(await adminList(store));

    if (req.method === "POST") {
      let body;
      try {
        body = await req.json();
      } catch (e) {
        return json({ error: "corps invalide" }, 400);
      }
      if (!["approve", "delete"].includes(body.action) || typeof body.fiche !== "string" || typeof body.id !== "string") {
        return json({ error: "action invalide" }, 400);
      }
      const ok = await adminUpdate(store, body.fiche, body.id, body.action);
      return ok ? json({ ok: true }) : json({ error: "avis introuvable" }, 404);
    }

    return json({ error: "méthode non autorisée" }, 405);
  }

  if (req.method === "GET") {
    const fiche = url.searchParams.get("fiche");
    if (!fiche) return json({ error: "fiche manquante" }, 400);
    const entries = (await store.get(fiche, { type: "json" })) || [];
    return json(entries.filter(isPublished));
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return json({ error: "corps invalide" }, 400);
    }

    const fiche = typeof body.fiche === "string" ? body.fiche.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const photo = typeof body.photo === "string" ? body.photo : null;
    const rating = Number.isInteger(body.rating) ? body.rating : null;
    const page = typeof body.page === "string" && body.page.startsWith("/") ? body.page.slice(0, MAX_PAGE) : null;

    if (!fiche || !name || !message) {
      return json({ error: "Merci de remplir ton prénom et un petit message." }, 400);
    }
    if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
      return json({ error: "Le prénom ou le message est trop long." }, 400);
    }
    if (photo && (photo.length > MAX_PHOTO_CHARS || !photo.startsWith("data:image/"))) {
      return json({ error: "Cette photo est trop lourde, réessaie avec une photo plus légère." }, 400);
    }
    if (body.rating != null && (rating === null || rating < 1 || rating > 5)) {
      return json({ error: "La note doit être comprise entre 1 et 5 étoiles." }, 400);
    }

    const entries = (await store.get(fiche, { type: "json" })) || [];

    const entry = {
      id: crypto.randomUUID(),
      name: name.slice(0, MAX_NAME),
      message: message.slice(0, MAX_MESSAGE),
      photo: photo || null,
      rating: rating,
      page: page,
      status: "pending",
      date: new Date().toISOString()
    };

    entries.push(entry);
    if (entries.length > MAX_ENTRIES_PER_FICHE) {
      entries.splice(0, entries.length - MAX_ENTRIES_PER_FICHE);
    }

    await store.setJSON(fiche, entries);
    await notify(entry, fiche);
    return json({ pending: true }, 201);
  }

  return json({ error: "méthode non autorisée" }, 405);
};

export const config = { path: "/api/avis" };
