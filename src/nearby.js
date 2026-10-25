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

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("nearby-btn");
    var status = document.getElementById("nearby-status");
    if (!btn || !window.CocoGeoloc) return;
    var stored = window.CocoGeoloc.getStored();
    if (stored) render(stored);
    btn.addEventListener("click", function () {
      status.textContent = "Localisation en cours…";
      window.CocoGeoloc.request(render, function (msg) { status.textContent = msg; });
    });
  });
})();
