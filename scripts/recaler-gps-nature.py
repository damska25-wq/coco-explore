#!/usr/bin/env python3
"""Recalage GPS des fiches nature (balades, plages, lacs) sur les lieux-dits de la
Base Adresse Nationale. Prudent : nom du lieu (titre avant « : », « — », « , »)
identique au nom du lieu-dit BAN, même commune (cardTag), écart > 300 m et < 10 km.

    GPS_CACHE=cache.json GPS_PLAN=plan.jsonl python3 scripts/recaler-gps-nature.py [--apply]
"""
import glob, json, os, re, sys
sys.argv, APPLY = [sys.argv[0]], "--apply" in sys.argv
ns = {}
exec(open(os.path.join(os.path.dirname(__file__), "recaler-gps-2.py")).read().split("rows = list")[0], ns)
norm, dist_km, fetch, cache = ns["norm"], ns["dist_km"], ns["fetch"], ns["cache"]
from concurrent.futures import ThreadPoolExecutor

rows = []
for f in sorted(glob.glob("src/fiches/*.njk")):
    fm = open(f).read().split("bodyHtml:", 1)[0]
    cat = re.search(r'breadcrumbCatId: "([^"]+)"', fm)
    lat = re.search(r"^lat:\s*([-\d.]+)$", fm, re.M)
    lng = re.search(r"^lng:\s*([-\d.]+)$", fm, re.M)
    title = re.search(r'^title: "([^"]+)"', fm, re.M)
    tag = re.search(r'cardTag: "([^"]+)"', fm)
    if not (cat and lat and lng and title and tag) or cat.group(1) not in ("balades", "plages", "lacs"):
        continue
    name = re.split(r"\s[:—–(]|,|\savec\s|\s—", title.group(1))[0].strip()
    if re.search(r"[/+→]| et ", name) or len(name) < 4:
        continue
    rows.append((f, float(lat.group(1)), float(lng.group(1)), name, tag.group(1), f"{name} {tag.group(1)}"))

todo = sorted({r[5] for r in rows if cache.get(r[5], "erreur") == "erreur"})
print(f"{len(rows)} fiches, {len(todo)} requêtes", flush=True)
with ThreadPoolExecutor(int(os.environ.get("GPS_WORKERS", 8))) as ex:
    for i, (q, res) in enumerate(ex.map(fetch, todo), 1):
        cache[q] = res
        if i % 100 == 0 or i == len(todo):
            json.dump(cache, open(os.environ.get("GPS_CACHE", "gps-cache.json"), "w"), ensure_ascii=False)

stats, plan = {}, open(os.environ["GPS_PLAN"], "w") if os.environ.get("GPS_PLAN") else None
for f, lat, lng, name, tag, q in rows:
    feat = cache.get(q)
    k = "non sûre"
    if feat and feat != "erreur":
        p = feat["properties"]
        nlng, nlat = feat["geometry"]["coordinates"]
        d = dist_km(lat, lng, nlat, nlng)
        if p["type"] == "locality" and norm(p["name"]) == norm(name) and norm(p["city"]) in norm(tag + " " + f):
            k = "déjà bonne" if d < 0.3 else ("recalée" if d < 10 else "non sûre")
            if k == "recalée":
                if plan:
                    plan.write(json.dumps({"f": f, "name": name, "label": p["label"], "d": round(d, 2)}, ensure_ascii=False) + "\n")
                if APPLY:
                    base = os.path.basename(f)[:-4]
                    for path in (f, f"src/en/fiches/{base}-en.njk"):
                        if os.path.exists(path):
                            t = open(path).read()
                            t = re.sub(r"^lat:\s*[-\d.]+$", f"lat: {round(nlat, 5)}", t, count=1, flags=re.M)
                            t = re.sub(r"^lng:\s*[-\d.]+$", f"lng: {round(nlng, 5)}", t, count=1, flags=re.M)
                            open(path, "w").write(t)
    stats[k] = stats.get(k, 0) + 1
print(("Appliqué : " if APPLY else "Simulation : ") + ", ".join(f"{k} {v}" for k, v in sorted(stats.items())))
