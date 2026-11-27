// Coco Explore — page « Autour de moi » : les adresses les plus proches dans
// chaque catégorie, d'un seul geste. Réutilise les fichiers /nearby-<catégorie>.js
// des pages catégorie (chargés un par un, seulement après le clic) ; le calcul
// des distances se fait dans le navigateur, la position n'est envoyée nulle part.
(function () {
  var PER_CAT = 3;
  var CATS = [
    { slug: "plage-chien", label: "Plages" },
    { slug: "balade-chien", label: "Balades" },
    { slug: "hebergement-chien", label: "Hébergements" },
    { slug: "restaurant-chien", label: "Restaurants" },
    { slug: "veterinaire-chien", label: "Vétérinaires" },
    { slug: "parc-canin", label: "Parcs canins" },
    { slug: "dogwash-chien", label: "Dogwash" },
    { slug: "garde-pension-chien", label: "Pension canine" }
  ];

  function loadCat(slug, cb) {
    window.COCO_NEARBY = null;
    var s = document.createElement("script");
    s.src = "/nearby-" + slug + ".js";
    s.onload = function () { var d = window.COCO_NEARBY || []; window.COCO_NEARBY = null; cb(d); };
    s.onerror = function () { cb([]); };
    document.head.appendChild(s);
  }

  function section(cat, lieux, pos) {
    var G = window.CocoGeoloc;
    lieux = lieux.filter(function (l) { return typeof l.a === "number" && typeof l.o === "number"; });
    lieux.forEach(function (l) { l.km = G.distanceKm(pos.lat, pos.lng, l.a, l.o); });
    lieux.sort(function (x, y) { return x.km - y.km; });
    var wrap = document.createElement("div");
    wrap.className = "nearby-box";
    var h = document.createElement("h2");
    h.textContent = cat.label;
    wrap.appendChild(h);
    var ol = document.createElement("ol");
    ol.className = "nearby-list";
    lieux.slice(0, PER_CAT).forEach(function (l) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = l.u;
      a.textContent = l.t;
      var meta = document.createElement("span");
      meta.className = "nearby-meta";
      meta.textContent = l.l + " · " + (l.km < 1 ? "moins de 1 km" : "environ " + G.formatDistance(l.km)) + " · ";
      var go = document.createElement("a");
      go.className = "nearby-go";
      go.href = "https://www.google.com/maps/dir/?api=1&destination=" + l.a + "," + l.o;
      go.target = "_blank";
      go.rel = "noopener";
      go.setAttribute("data-track", "itineraire-autour");
      go.textContent = "Itinéraire ↗";
      meta.appendChild(go);
      li.appendChild(a);
      li.appendChild(meta);
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    var more = document.createElement("p");
    var m = document.createElement("a");
    m.href = "/" + cat.slug + "?autour=1";
    m.textContent = "Voir plus de " + cat.label.toLowerCase() + " autour de moi →";
    more.appendChild(m);
    wrap.appendChild(more);
    return wrap;
  }

  function run(pos) {
    var out = document.getElementById("autour-results");
    var status = document.getElementById("autour-status");
    out.innerHTML = "";
    var i = 0;
    status.textContent = "Recherche des adresses proches…";
    (function next() {
      if (i >= CATS.length) { status.textContent = "Voici les adresses les plus proches de toi."; return; }
      var cat = CATS[i++];
      loadCat(cat.slug, function (lieux) {
        if (lieux.length) out.appendChild(section(cat, lieux, pos));
        next();
      });
    })();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("autour-btn");
    var status = document.getElementById("autour-status");
    if (!btn || !window.CocoGeoloc) return;
    btn.addEventListener("click", function () {
      status.textContent = "Localisation en cours…";
      window.CocoGeoloc.request(run, function (msg) { status.textContent = msg; });
    });
    var stored = window.CocoGeoloc.getStored();
    if (stored) run(stored);
  });
})();
