#!/usr/bin/env python3
"""2e passe du recalage GPS sur la Base Adresse Nationale (après recaler-gps.py).

    GPS_CACHE=cache.json python3 scripts/recaler-gps-2.py          # simulation
    GPS_CACHE=cache.json python3 scripts/recaler-gps-2.py --apply  # écrit lat/lng
    GPS_PLAN=plan.jsonl : écrit chaque décision (pour relecture)

Adresse prise dans « Adresse »/« Localisation », sinon dans le premier autre champ
qui contient un numéro, un type de voie et un code postal. Balades, plages, lacs
et gardes à domicile (dogsitters sans adresse publiée) exclues.
Points acceptés (même commune ou code postal, nom de voie identique à l'adresse) :
- numéro trouvé : quel que soit le score (texte rédactionnel en trop), écart > 50 m
  et < 20 km (< 100 km si le code postal de la fiche est le même) ;
- rue seule (hors route/chemin/départementale, trop longues) : écart > 1 km, < 20 km ;
- lieu-dit : écart > 500 m, < 20 km.
"""
import glob, json, math, os, re, sys, time, unicodedata, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

APPLY = "--apply" in sys.argv
CACHE = os.environ.get("GPS_CACHE", "gps-cache.json")
PLAN = os.environ.get("GPS_PLAN")
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
STOP = {"de", "du", "la", "le", "les", "des", "d", "l", "et", "a", "au", "aux", "en", "sur"}
ABBR = {"av": "avenue", "ave": "avenue", "bd": "boulevard", "bld": "boulevard", "st": "saint",
        "ste": "sainte", "pl": "place", "rte": "route", "chem": "chemin", "imp": "impasse",
        "fbg": "faubourg", "all": "allee", "sq": "square", "gal": "general", "mal": "marechal",
        "pdt": "president", "r": "rue"}
VOIE = r"(rue|avenue|av\.?|bd|boulevard|place|pl\.|chemin|route|rte|all[ée]e|impasse|quai|cours|square|esplanade|faubourg|promenade|lieu-dit|hameau|voie|parvis|mont[ée]e|traverse|sentier|lotissement|zone|za|zi|zac)"


def norm(x):
    x = unicodedata.normalize("NFD", x).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", x).strip()


def toks(x):
    return {ABBR.get(t, t) for t in norm(x).split()} - STOP


def dist_km(a, b, c, d):
    return math.hypot((a - c) * 111, (b - d) * 111 * math.cos(math.radians(a)))


def clean(q):
    q = re.sub(r"\(.*?\)", "", q).split(";")[0]
    # coupe au texte rédactionnel (« . » après un mot de 4 lettres ou plus, ou « — »)
    q = re.split(r"(?<=[^\W\d_]{4})\.\s|\s[—–]\s", q)[0]
    q = re.sub(r"[«»\"]", "", q).replace("lieu-dit", "").replace(",", " ")
    return " ".join(q.split())


def address(fm):
    a = re.search(r'label: "(?:Adresse|Localisation)"\n\s*value: "([^"]+)"', fm)
    if a:
        return a.group(1)
    for v in re.findall(r'\n\s*value: "([^"]+)"', fm):
        m = re.search(r"\b\d{1,4}\s*(?:bis|ter|[a-d])?\b,?\s+" + VOIE + r"\b[^\"]*?\b\d{5}\b[ \w'’-]*", v, re.I)
        if m:
            return m.group(0)
    return None


def fiches():
    for f in sorted(glob.glob("src/fiches/*.njk")):
        fm = open(f).read().split("bodyHtml:", 1)[0]
        lat = re.search(r"^lat:\s*([-\d.]+)$", fm, re.M)
        lng = re.search(r"^lng:\s*([-\d.]+)$", fm, re.M)
        cat = re.search(r'breadcrumbCatId: "([^"]+)"', fm)
        if not (lat and lng and cat) or cat.group(1) in ("balades", "plages", "lacs"):
            continue
        a = address(fm)
        if not a or (cat.group(1) == "dogsitters" and not re.search(r'label: "(?:Adresse|Localisation)"', fm)):
            continue
        q = clean(a)
        if len(q) < 8 or not re.search(r"[^\W\d_]{3}", q):
            continue
        yield f, float(lat.group(1)), float(lng.group(1)), q


def fetch(q):
    url = "https://api-adresse.data.gouv.fr/search/?" + urllib.parse.urlencode({"q": q[:200], "limit": 1})
    for attempt in range(10):
        try:
            with urllib.request.urlopen(url, timeout=8) as r:
                feats = json.load(r)["features"]
                return q, (feats[0] if feats else None)
        except Exception:
            time.sleep(min(2 ** attempt, 8) * 0.5)
    return q, "erreur"


def decide(lat, lng, q, feat):
    if not feat or feat == "erreur":
        return "sans résultat", None
    p = feat["properties"]
    nlng, nlat = feat["geometry"]["coordinates"]
    pc = re.search(r"\b\d{5}\b", q)
    same_pc = bool(pc and pc.group(0) == p.get("postcode"))
    same = same_pc or norm(p.get("city", "")) in norm(q)
    d = dist_km(lat, lng, nlat, nlng)
    name = p.get("street") or p.get("name", "")
    name_ok = bool(toks(name)) and toks(name) <= toks(q)
    t = p.get("type")
    if not same or not name_ok:
        return "non sûre", None
    if t == "housenumber":
        num = re.match(r"\s*(\d+)", q)
        if not num or num.group(1) != re.match(r"\d+", p["housenumber"]).group(0):
            return "non sûre", None
        ok, lo, hi = True, 0.05, (100 if same_pc else 20)
    elif t == "street":
        if re.match(r"(route|chemin|rd|rn|d\d|n\d|voie|departementale|nationale)", norm(name)) or p["score"] < 0.6:
            return "non sûre", None
        lo, hi = 1, 20
    elif t == "locality":
        if p["score"] < 0.6:
            return "non sûre", None
        lo, hi = 0.5, 20
    else:
        return "non sûre", None
    if d < lo:
        return "déjà bonne", None
    if d > hi:
        return "non sûre", None
    return "recalée (" + t + ")", (round(nlat, 5), round(nlng, 5), round(d, 2), p["label"])


rows = list(fiches())
todo = sorted({q for *_, q in rows if cache.get(q, "erreur") == "erreur"})
print(f"{len(rows)} fiches, {len(todo)} adresses à interroger", flush=True)
with ThreadPoolExecutor(int(os.environ.get("GPS_WORKERS", 8))) as ex:
    for i, (q, res) in enumerate(ex.map(fetch, todo), 1):
        cache[q] = res
        if i % 100 == 0 or i == len(todo):
            json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
            print(f"{i}/{len(todo)}", flush=True)

stats = {}
plan = open(PLAN, "w") if PLAN else None
for f, lat, lng, q in rows:
    k, new = decide(lat, lng, q, cache.get(q))
    stats[k] = stats.get(k, 0) + 1
    if plan and new:
        plan.write(json.dumps({"f": f, "q": q, "label": new[3], "d": new[2], "type": k}, ensure_ascii=False) + "\n")
    if APPLY and new:
        base = os.path.basename(f)[:-4]
        for path in (f, f"src/en/fiches/{base}-en.njk"):
            if os.path.exists(path):
                t = open(path).read()
                t = re.sub(r"^lat:\s*[-\d.]+$", f"lat: {new[0]}", t, count=1, flags=re.M)
                t = re.sub(r"^lng:\s*[-\d.]+$", f"lng: {new[1]}", t, count=1, flags=re.M)
                open(path, "w").write(t)

print(("Appliqué : " if APPLY else "Simulation : ") + ", ".join(f"{k} {v}" for k, v in sorted(stats.items())))
