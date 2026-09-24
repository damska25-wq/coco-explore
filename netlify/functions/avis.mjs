import { getStore } from "@netlify/blobs";

const MAX_NAME = 60;
const MAX_MESSAGE = 500;
const MAX_PHOTO_CHARS = 400000; // ~300 Ko en base64, après redimensionnement côté client
const MAX_ENTRIES_PER_FICHE = 300;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export default async (req) => {
  const store = getStore("avis-coco-explore");
  const url = new URL(req.url);

  if (req.method === "GET") {
    const fiche = url.searchParams.get("fiche");
    if (!fiche) return json({ error: "fiche manquante" }, 400);
    const entries = (await store.get(fiche, { type: "json" })) || [];
    return json(entries);
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
      date: new Date().toISOString()
    };

    entries.push(entry);
    if (entries.length > MAX_ENTRIES_PER_FICHE) {
      entries.splice(0, entries.length - MAX_ENTRIES_PER_FICHE);
    }

    await store.setJSON(fiche, entries);
    return json(entry, 201);
  }

  return json({ error: "méthode non autorisée" }, 405);
};

export const config = { path: "/api/avis" };
