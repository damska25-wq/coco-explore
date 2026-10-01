(function () {
  var lieux = window.COCO_LIEUX || [];
  var listEl = document.getElementById("coco-conseils-list");
  var locateBtn = document.getElementById("coco-locate-btn");
  var locateStatus = document.getElementById("coco-locate-status");
  if (!listEl || !window.CocoGeoloc) return;

  var NEAR_TAGS = [
    { catId: "plages", label: "Plage" },
    { catId: "balades", label: "Balade" },
    { catId: "restaurants", label: "Restaurant" }
  ];

  function nearestByCatId(catId, pos) {
    var pool = lieux.filter(function (l) { return l.catId === catId; });
    if (!pool.length) return null;
    var best = null;
    var bestDist = Infinity;
    pool.forEach(function (l) {
      var d = window.CocoGeoloc.distanceKm(pos.lat, pos.lng, l.lat, l.lng);
      if (d < bestDist) {
        bestDist = d;
        best = l;
      }
    });
    return best ? { lieu: best, distanceKm: bestDist } : null;
  }

  function renderNearby(pos) {
    var html = "";
    NEAR_TAGS.forEach(function (entry) {
      var found = nearestByCatId(entry.catId, pos);
      if (!found) return;
      html +=
        '<a href="' + found.lieu.slug + '" class="conseil-card">' +
        '<span class="conseil-tag">' + entry.label + "</span>" +
        "<h3>" + found.lieu.titre + "</h3>" +
        '<span class="conseil-lieu">' + found.lieu.lieu + "</span>" +
        '<span class="conseil-card-distance">À ' + window.CocoGeoloc.formatDistance(found.distanceKm) + " de toi</span>" +
        "</a>";
    });
    if (html) listEl.innerHTML = html;
  }

  var stored = window.CocoGeoloc.getStored();
  if (stored) {
    renderNearby(stored);
    if (locateStatus) locateStatus.textContent = "Sélection basée sur ta position.";
  }

  if (locateBtn) {
    locateBtn.addEventListener("click", function () {
      locateBtn.disabled = true;
      if (locateStatus) locateStatus.textContent = "Localisation en cours…";
      window.CocoGeoloc.request(
        function (pos) {
          renderNearby(pos);
          locateBtn.disabled = false;
          if (locateStatus) locateStatus.textContent = "Sélection basée sur ta position.";
        },
        function (message) {
          locateBtn.disabled = false;
          if (locateStatus) locateStatus.textContent = message;
        }
      );
    });
  }
})();
