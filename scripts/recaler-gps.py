#!/usr/bin/env python3
"""Recale lat/lng des fiches sur le géocodeur officiel (Base Adresse Nationale).

Nécessite l'accès réseau direct à api-adresse.data.gouv.fr (domaine à autoriser
dans les réglages réseau de l'environnement). Usage, depuis la racine du dépôt :

    python3 scripts/recaler-gps.py            # simulation : affiche le bilan
    python3 scripts/recaler-gps.py --apply    # écrit les nouvelles coordonnées

Fiches traitées : celles dont l'infoItem « Adresse »/« Localisation » commence par
un numéro de rue (hors balades, plages, lacs). Un point n'est changé que si le
géocodeur trouve l'adresse au numéro près (type housenumber), score >= 0,7,
même code postal ou même commune, écart > 50 m et < 20 km. La version anglaise
(src/en/fiches/<slug>-en.njk) reçoit les mêmes coordonnées.
"""
import glob, json, math, os, re, sys, time, unicodedata, urllib.parse, urllib.request

APPLY = "--apply" in sys.argv


def norm(x):
    x = unicodedata.normalize("NFD", x).encode("ascii", "ignore").decode().lower()
    return x.replace("-", " ").replace("'", " ")


def dist_km(a, b, c, d):
    return math.hypot((a - c) * 111, (b - d) * 111 * math.cos(math.radians(a)))


def clean(q):
    q = re.sub(r"\(.*?\)", "", q).split(";")[0]
    q = re.split(r"\.\s|\s—\s", q)[0]  # texte rédactionnel après l'adresse
    q = re.sub(r"[«»\"]", "", q).replace("lieu-dit", "").replace(",", " ")
    return " ".join(q.split())


def geocode(q):
    url = "https://api-adresse.data.gouv.fr/search/?" + urllib.parse.urlencode({"q": q, "limit": 1})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=20) as r:
                feats = json.load(r)["features"]
                return feats[0] if feats else None
        except Exception:
            time.sleep(2 ** attempt)
    return None


stats = {"recalées": 0, "déjà bonnes": 0, "non sûres": 0, "sans résultat": 0}
for f in sorted(glob.glob("src/fiches/*.njk")):
    s = open(f).read()
    fm = s.split("bodyHtml:", 1)[0]
    lat = re.search(r"^lat:\s*([-\d.]+)$", fm, re.M)
    lng = re.search(r"^lng:\s*([-\d.]+)$", fm, re.M)
    a = re.search(r'label: "(?:Adresse|Localisation)"\n\s*value: "([^"]+)"', fm)
    cat = re.search(r'breadcrumbCatId: "([^"]+)"', fm)
    if not (lat and lng and a and cat) or cat.group(1) in ("balades", "plages", "lacs"):
        continue
    if not re.match(r"\s*\d", a.group(1)):
        continue
    q = clean(a.group(1))
    feat = geocode(q)
    time.sleep(0.05)  # l'API accepte ~50 requêtes/s
    if not feat:
        stats["sans résultat"] += 1
        continue
    p = feat["properties"]
    nlng, nlat = feat["geometry"]["coordinates"]
    pc = re.search(r"\b\d{5}\b", q)
    same_place = (pc and pc.group(0) == p["postcode"]) or norm(p["city"]) in norm(q)
    d = dist_km(float(lat.group(1)), float(lng.group(1)), nlat, nlng)
    if p.get("type") != "housenumber" or p["score"] < 0.7 or not same_place or d > 20:
        stats["non sûres"] += 1
        continue
    if d < 0.05:
        stats["déjà bonnes"] += 1
        continue
    stats["recalées"] += 1
    if APPLY:
        base = os.path.basename(f)[:-4]
        for path in (f, f"src/en/fiches/{base}-en.njk"):
            if os.path.exists(path):
                t = open(path).read()
                t = re.sub(r"^lat:\s*[-\d.]+$", f"lat: {round(nlat, 5)}", t, count=1, flags=re.M)
                t = re.sub(r"^lng:\s*[-\d.]+$", f"lng: {round(nlng, 5)}", t, count=1, flags=re.M)
                open(path, "w").write(t)

print(("Appliqué : " if APPLY else "Simulation : ") + ", ".join(f"{k} {v}" for k, v in stats.items()))
