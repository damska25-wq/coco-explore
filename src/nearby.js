// Coco Explore — « les plus proches de toi » sur une page catégorie
// (activé par `nearby: true` dans src/_data/categoryPages.js). La liste des
// lieux est intégrée à la page (window.COCO_NEARBY) ; le calcul de distance
// se fait dans le navigateur, la position n'est envoyée à aucun serveur.
(function () {
  var MAX = 6;

  function render(pos) {
    var list = document.getElementById("nearby-list");
    var status = document.getElementById("nearby-status");
    var lieux = (window.COCO_NEARBY || []).filter(function (l) {
      return typeof l.a === "number" && typeof l.o === "number";
    });
    lieux.forEach(function (l) {
      l.km = window.CocoGeoloc.distanceKm(pos.lat, pos.lng, l.a, l.o);
    });
    lieux.sort(function (x, y) { return x.km - y.km; });
    list.innerHTML = "";
    lieux.slice(0, MAX).forEach(function (l) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = l.u;
      a.textContent = l.t;
      var meta = document.createElement("span");
      meta.className = "nearby-meta";
      meta.textContent = l.l + " · " + (l.km < 1 ? "moins de 1 km" : "environ " + window.CocoGeoloc.formatDistance(l.km));
      li.appendChild(a);
      li.appendChild(meta);
      list.appendChild(li);
    });
    list.hidden = false;
    status.textContent = "Distances à vol d'oiseau, calculées depuis le centre de chaque commune.";
  }

  // Les lieux sont chargés à la demande (fichier /nearby-<catégorie>.js), pour ne pas
  // alourdir la page de milliers de lignes quand le visiteur ne se localise pas.
  function withData(cb) {
    if (window.COCO_NEARBY || !window.COCO_NEARBY_SRC) return cb();
    var s = document.createElement("script");
    s.src = window.COCO_NEARBY_SRC;
    s.onload = cb;
    document.head.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("nearby-btn");
    var status = document.getElementById("nearby-status");
    if (!btn || !window.CocoGeoloc) return;
    function locate() {
      status.textContent = "Localisation en cours…";
      window.CocoGeoloc.request(function (pos) { withData(function () { render(pos); }); },
        function (msg) { status.textContent = msg; });
    }
    var stored = window.CocoGeoloc.getStored();
    if (stored) withData(function () { render(stored); });
    btn.addEventListener("click", locate);
    // Arrivée depuis un raccourci « … autour de moi » de l'accueil (?autour=1).
    if (/[?&]autour=1/.test(location.search)) {
      var box = document.getElementById("nearby-box");
      if (box) box.scrollIntoView({ block: "start" });
      if (!stored) locate();
    }
  });
})();
