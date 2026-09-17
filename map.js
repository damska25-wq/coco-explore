(function () {
  var COLORS = {
    "Plage": "#BE5B3B",
    "Balade": "#3C5943",
    "Hébergement": "#C99A4A",
    "Lacs & points d'eau": "#3E7CB1",
    "Toiletteur": "#A65C8C",
    "Vétérinaire": "#B0413E",
    "Activité": "#3E8E7E",
    "Restaurant": "#D98E3E"
  };

  var lieux = window.COCO_LIEUX || [];
  var conseilsSlugs = window.COCO_CONSEILS_SEMAINE || [];
  var mapEl = document.getElementById("coco-map");

  // Construit la liste des cartes "conseils de la semaine" à partir de COCO_CONSEILS_SEMAINE
  // (seule liste à modifier chaque semaine dans map-data.js).
  var conseilsList = document.getElementById("coco-conseils-list");
  if (conseilsList) {
    var bySlug = {};
    lieux.forEach(function (l) { bySlug[l.slug] = l; });
    conseilsSlugs.forEach(function (slug) {
      var lieu = bySlug[slug];
      if (!lieu) return;
      var card = document.createElement("button");
      card.type = "button";
      card.className = "conseil-card";
      card.setAttribute("data-conseil-slug", slug);
      card.innerHTML =
        '<div><span class="conseil-tag">' + lieu.categorie + "</span>" +
        "<h3>" + lieu.titre + "</h3>" +
        '<span class="conseil-lieu">' + lieu.lieu + "</span></div>";
      conseilsList.appendChild(card);
    });
  }

  if (!mapEl || !window.L) return;

  var map = L.map(mapEl, { scrollWheelZoom: false }).setView([43.45, 6.3], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(map);

  function directionsUrl(lat, lng) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
  }

  function makeIcon(categorie, isConseil) {
    var color = COLORS[categorie] || "#3C5943";
    var size = isConseil ? 22 : 14;
    var border = isConseil ? "3px solid #C99A4A" : "2px solid #FFFDF8";
    return L.divIcon({
      className: "coco-marker",
      html: '<span style="display:block;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + ';border:' + border + ';box-shadow:0 1px 4px rgba(0,0,0,0.35);"></span>',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  }

  var markersBySlug = {};
  var layerByCategorie = {};

  lieux.forEach(function (lieu) {
    var isConseil = conseilsSlugs.indexOf(lieu.slug) !== -1;
    var marker = L.marker([lieu.lat, lieu.lng], { icon: makeIcon(lieu.categorie, isConseil) });

    var popupHtml =
      '<div class="coco-popup">' +
      (isConseil ? '<span class="coco-popup-badge">Conseil de Coco</span>' : "") +
      "<strong>" + lieu.titre + "</strong>" +
      '<span class="coco-popup-tag">' + lieu.categorie + " · " + lieu.lieu + "</span>" +
      '<div class="coco-popup-actions">' +
      '<a href="' + lieu.slug + '">Voir la fiche</a>' +
      '<a href="' + directionsUrl(lieu.lat, lieu.lng) + '" target="_blank" rel="noopener">Itinéraire</a>' +
      "</div></div>";

    marker.bindPopup(popupHtml);
    markersBySlug[lieu.slug] = marker;

    if (!layerByCategorie[lieu.categorie]) {
      layerByCategorie[lieu.categorie] = L.layerGroup();
    }
    layerByCategorie[lieu.categorie].addLayer(marker);
  });

  Object.keys(layerByCategorie).forEach(function (cat) {
    layerByCategorie[cat].addTo(map);
  });

  // Filtres par catégorie
  var filterBar = document.getElementById("coco-map-filters");
  if (filterBar) {
    Object.keys(COLORS).forEach(function (cat) {
      if (!layerByCategorie[cat]) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "map-filter active";
      btn.style.setProperty("--dot", COLORS[cat]);
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", "true");
      btn.addEventListener("click", function () {
        var active = btn.classList.toggle("active");
        btn.setAttribute("aria-pressed", active ? "true" : "false");
        if (active) {
          layerByCategorie[cat].addTo(map);
        } else {
          map.removeLayer(layerByCategorie[cat]);
        }
      });
      filterBar.appendChild(btn);
    });
  }

  // Clic sur une carte "conseil de la semaine" -> centre la carte et ouvre la bulle
  document.querySelectorAll("[data-conseil-slug]").forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      var slug = card.getAttribute("data-conseil-slug");
      var marker = markersBySlug[slug];
      if (!marker) return;
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      map.flyTo(marker.getLatLng(), 13, { duration: 0.6 });
      window.setTimeout(function () {
        marker.openPopup();
      }, 650);
    });
  });
})();
