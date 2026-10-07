(function () {
  // Groupes de filtres de la carte, alignés sur les catégories du site
  // (mêmes identifiants que les sections de fiches sous la carte et dans
  // menu/accueil) — garantit que chaque fiche appartient à un filtre.
  var CAT_GROUPS = [
    { catIds: ["plages", "cote-azur"], label: "Plages", color: "#BE5B3B", activeBg: "#ba593a" },
    { catIds: ["balades"], label: "Balades", color: "#3C5943", activeBg: "#3C5943" },
    { catIds: ["lacs"], label: "Lacs & points d'eau", color: "#3E7CB1", activeBg: "#3d79ad" },
    { catIds: ["restaurants"], label: "Restaurants", color: "#D98E3E", activeBg: "#a56520" },
    { catIds: ["hebergements"], label: "Hébergements", color: "#C99A4A", activeBg: "#956e2c" },
    { catIds: ["activites"], label: "Activités", color: "#3E8E7E", activeBg: "#388071" },
    { catIds: ["toiletteurs"], label: "Toiletteurs", color: "#A65C8C", activeBg: "#A65C8C" },
    { catIds: ["dogwash"], label: "Douche à chien", color: "#2A9D9D", activeBg: "#228181" },
    { catIds: ["veterinaires"], label: "Vétérinaires", color: "#B0413E", activeBg: "#B0413E" },
    { catIds: ["dogsitters"], label: "Garde de chien", color: "#7C6FAE", activeBg: "#796cac" }
  ];
  var URGENCE_COLOR = "#8B1E1E"; // nuance de marqueur pour les urgences vétérinaires, dans le même groupe/filtre que les vétérinaires

  function groupForCatId(catId) {
    for (var i = 0; i < CAT_GROUPS.length; i++) {
      if (CAT_GROUPS[i].catIds.indexOf(catId) !== -1) return CAT_GROUPS[i];
    }
    return null;
  }

  var lieux = window.COCO_LIEUX || [];
  var mapEl = document.getElementById("coco-map");
  if (!mapEl || !window.L) return;

  var map = L.map(mapEl, { scrollWheelZoom: false }).setView([43.5, 4.2], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
  }).addTo(map);

  function directionsUrl(lat, lng) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
  }

  function makeIcon(color, size, border) {
    return L.divIcon({
      className: "coco-marker",
      html: '<span style="display:block;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + ';border:' + border + ';box-shadow:0 1px 4px rgba(0,0,0,0.35);"></span>',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  }

  // Position de l'utilisateur, une fois connue (voir bouton "Me localiser").
  var userPos = window.CocoGeoloc ? window.CocoGeoloc.getStored() : null;
  var userMarker = null;

  function popupHtmlFor(lieu) {
    var distanceLine = "";
    if (userPos && window.CocoGeoloc) {
      var km = window.CocoGeoloc.distanceKm(userPos.lat, userPos.lng, lieu.lat, lieu.lng);
      distanceLine = '<span class="coco-popup-distance">À ' + window.CocoGeoloc.formatDistance(km) + " de toi</span>";
    }
    return (
      '<div class="coco-popup">' +
      "<strong>" + lieu.titre + "</strong>" +
      '<span class="coco-popup-tag">' + lieu.categorie + " · " + lieu.lieu + "</span>" +
      distanceLine +
      '<div class="coco-popup-actions">' +
      '<a href="' + lieu.slug + '">Voir la fiche</a>' +
      '<a href="' + directionsUrl(lieu.lat, lieu.lng) + '" target="_blank" rel="noopener">Itinéraire</a>' +
      "</div></div>"
    );
  }

  var layerByCatId = {};

  lieux.forEach(function (lieu) {
    var group = groupForCatId(lieu.catId);
    var color = (group && group.color) || "#3C5943";
    if (lieu.categorie === "Urgences vétérinaires") color = URGENCE_COLOR;
    var marker = L.marker([lieu.lat, lieu.lng], { icon: makeIcon(color, 14, "2px solid #FFFDF8") });
    marker.bindPopup(function () { return popupHtmlFor(lieu); });

    if (!layerByCatId[lieu.catId]) layerByCatId[lieu.catId] = L.layerGroup();
    layerByCatId[lieu.catId].addLayer(marker);
  });

  // Sections de fiches déplacées juste sous la carte (une par catId) —
  // masquées par défaut, révélées selon le filtre choisi. L'utilisateur
  // garde la main sur le défilement : rien n'est automatique.
  var ficheSections = {};
  Object.keys(layerByCatId).forEach(function (catId) {
    var el = document.getElementById(catId);
    if (el) ficheSections[catId] = el;
  });

  var activeGroup = null; // null = rien affiché, "TOUT" = tout afficher
  var buttonsByKey = {};
  var mapPrompt = document.getElementById("coco-map-prompt");

  function updatePrompt() {
    if (mapPrompt) mapPrompt.hidden = !!activeGroup;
  }

  function updateButtons() {
    Object.keys(buttonsByKey).forEach(function (key) {
      var isActive = activeGroup === key;
      buttonsByKey[key].classList.toggle("active", isActive);
      buttonsByKey[key].setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  // Les vignettes des sections masquées n'ont pas de vraie src tant qu'on ne
  // les affiche pas (voir index.njk) : Lighthouse comptait ces images comme
  // "chargées en trop grand pour leur taille d'affichage" puisqu'elles ne
  // s'affichent nulle part tant que la catégorie n'est pas choisie. On ne
  // déclenche leur téléchargement qu'au moment où la section devient visible.
  function revealImages(sectionEl) {
    sectionEl.querySelectorAll("img[data-src]").forEach(function (img) {
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      delete img.dataset.src;
      delete img.dataset.srcset;
    });
  }

  function showCatIds(catIds) {
    catIds.forEach(function (catId) {
      if (layerByCatId[catId] && !map.hasLayer(layerByCatId[catId])) layerByCatId[catId].addTo(map);
      if (ficheSections[catId]) {
        ficheSections[catId].hidden = false;
        revealImages(ficheSections[catId]);
      }
    });
  }

  function hideAll() {
    Object.keys(layerByCatId).forEach(function (catId) {
      if (map.hasLayer(layerByCatId[catId])) map.removeLayer(layerByCatId[catId]);
    });
    Object.keys(ficheSections).forEach(function (catId) {
      ficheSections[catId].hidden = true;
    });
  }

  function setActiveKey(key) {
    activeGroup = activeGroup === key ? null : key;
    hideAll();

    if (activeGroup === "TOUT") {
      showCatIds(Object.keys(layerByCatId));
    } else if (activeGroup) {
      var group = CAT_GROUPS.filter(function (g) { return g.label === activeGroup; })[0];
      if (group) showCatIds(group.catIds);
    }

    updateButtons();
    updatePrompt();
  }

  var filterBar = document.getElementById("coco-map-filters");
  if (filterBar) {
    var toutBtn = document.createElement("button");
    toutBtn.type = "button";
    toutBtn.className = "map-filter map-filter-all";
    toutBtn.textContent = "Tout afficher";
    toutBtn.setAttribute("aria-pressed", "false");
    toutBtn.addEventListener("click", function () { setActiveKey("TOUT"); });
    filterBar.appendChild(toutBtn);
    buttonsByKey.TOUT = toutBtn;

    CAT_GROUPS.forEach(function (group) {
      var hasAny = group.catIds.some(function (catId) { return !!layerByCatId[catId]; });
      if (!hasAny) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "map-filter";
      btn.style.setProperty("--dot", group.color);
      btn.style.setProperty("--dot-active", group.activeBg || group.color);
      btn.textContent = group.label;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () { setActiveKey(group.label); });
      filterBar.appendChild(btn);
      buttonsByKey[group.label] = btn;
    });
  }

  // Les fiches ont toutes un fil d'Ariane qui renvoie vers index.html#<catId>
  // (ex. #plages) : il faut révéler la bonne section + le bon filtre quand on
  // arrive par ce lien, sinon l'ancre tombe sur une section masquée.
  function revealFromHash(scrollTo) {
    var catId = (window.location.hash || "").replace("#", "");
    var group = groupForCatId(catId);
    if (!group) return false;
    setActiveKey(group.label);
    if (scrollTo && ficheSections[catId]) {
      window.setTimeout(function () {
        ficheSections[catId].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
    return true;
  }

  // Catégorie affichée par défaut au chargement, pour que la carte ne soit
  // pas vide au premier coup d'œil — l'utilisateur reste libre d'en choisir
  // une autre ou de revenir à rien via le même bouton.
  if (!revealFromHash(true) && layerByCatId.plages) {
    setActiveKey("Plages");
  }
  window.addEventListener("hashchange", function () { revealFromHash(true); });

  // Bouton "Me localiser" : géolocalisation du navigateur, gratuite, sur
  // autorisation explicite de l'utilisateur. Affiche un point rouge et
  // ajoute la distance dans les bulles des lieux déjà affichés.
  var locateBtn = document.getElementById("coco-locate-btn");
  var locateStatus = document.getElementById("coco-locate-status");

  function placeUserMarker(pos, recenter) {
    userPos = pos;
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.marker([pos.lat, pos.lng], {
      icon: makeIcon("#D21F1F", 16, "3px solid #FFFDF8"),
      zIndexOffset: 1000
    }).bindPopup("Toi, à peu près ici");
    userMarker.addTo(map);
    if (recenter) map.setView([pos.lat, pos.lng], Math.max(map.getZoom(), 11));
  }

  if (userPos) placeUserMarker(userPos, false);

  if (locateBtn) {
    locateBtn.addEventListener("click", function () {
      if (!window.CocoGeoloc) return;
      locateBtn.disabled = true;
      if (locateStatus) locateStatus.textContent = "Localisation en cours…";
      window.CocoGeoloc.request(
        function (pos) {
          placeUserMarker(pos, true);
          locateBtn.disabled = false;
          if (locateStatus) locateStatus.textContent = "Position affichée — les distances apparaissent dans les bulles des lieux.";
        },
        function (message) {
          locateBtn.disabled = false;
          if (locateStatus) locateStatus.textContent = message;
        }
      );
    });
  }
})();
