(function () {
  var mapEl = document.getElementById("coco-dept-map");
  if (!mapEl || !window.L || !window.COCO_LIEUX) return;

  var deptId = mapEl.getAttribute("data-dept");
  var lieux = window.COCO_LIEUX.filter(function (l) {
    return (l.departement || []).indexOf(deptId) !== -1;
  });
  if (!lieux.length) return;

  var CAT_COLORS = {
    plages: "#BE5B3B",
    "cote-azur": "#BE5B3B",
    balades: "#3C5943",
    lacs: "#3E7CB1",
    restaurants: "#D98E3E",
    hebergements: "#C99A4A",
    activites: "#3E8E7E",
    toiletteurs: "#A65C8C",
    dogwash: "#2A9D9D",
    veterinaires: "#B0413E",
    dogsitters: "#7C6FAE"
  };

  function makeIcon(color) {
    return L.divIcon({
      className: "coco-marker",
      html: '<span style="display:block;width:14px;height:14px;border-radius:50%;background:' + color + ';border:2px solid #FFFDF8;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></span>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -7]
    });
  }

  var map = L.map(mapEl, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(map);

  var allBounds = [];
  var layerByCatId = {};

  lieux.forEach(function (lieu) {
    var color = CAT_COLORS[lieu.catId] || "#3C5943";
    var marker = L.marker([lieu.lat, lieu.lng], { icon: makeIcon(color) });
    marker.bindPopup(
      '<div class="coco-popup"><strong>' + lieu.titre + "</strong>" +
      '<span class="coco-popup-tag">' + lieu.categorie + " · " + lieu.lieu + "</span>" +
      '<div class="coco-popup-actions"><a href="' + lieu.slug + '">Voir la fiche</a></div></div>'
    );
    if (!layerByCatId[lieu.catId]) layerByCatId[lieu.catId] = L.layerGroup();
    layerByCatId[lieu.catId].addLayer(marker);
    allBounds.push([lieu.lat, lieu.lng]);
  });

  var activeLayer = null;

  function boundsForCat(cat) {
    if (cat === "tout") return allBounds;
    return lieux
      .filter(function (l) { return l.catId === cat; })
      .map(function (l) { return [l.lat, l.lng]; });
  }

  function showCat(cat) {
    if (activeLayer) map.removeLayer(activeLayer);

    if (cat === "tout") {
      activeLayer = L.layerGroup(Object.keys(layerByCatId).map(function (id) { return layerByCatId[id]; }));
    } else {
      activeLayer = layerByCatId[cat] || L.layerGroup();
    }
    activeLayer.addTo(map);

    var bounds = boundsForCat(cat);
    if (bounds.length) {
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 13 });
    }
  }

  var initialCat = "tout";
  try {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("cat");
    if (fromUrl) initialCat = fromUrl;
  } catch (e) {}

  showCat(initialCat);

  var filterRow = document.getElementById("dept-filter-row");
  if (filterRow) {
    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest(".dept-filter-btn");
      if (!btn) return;
      showCat(btn.getAttribute("data-cat"));
    });
  }
})();
