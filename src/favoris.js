(function () {
  var KEY = "cocoFavoris";

  function getFavoris() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function setFavoris(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {
      /* localStorage indisponible (navigation privée, etc.) — on ignore silencieusement */
    }
  }

  // Bouton favori sur une fiche
  var toggle = document.getElementById("fav-toggle");
  if (toggle) {
    var slug = toggle.getAttribute("data-slug");

    function refreshButton() {
      var active = getFavoris().indexOf(slug) !== -1;
      toggle.classList.toggle("active", active);
      toggle.setAttribute("aria-pressed", active ? "true" : "false");
      toggle.setAttribute("aria-label", active ? "Retirer des favoris" : "Ajouter aux favoris");
    }

    toggle.addEventListener("click", function () {
      var favs = getFavoris();
      var i = favs.indexOf(slug);
      if (i === -1) {
        favs.push(slug);
      } else {
        favs.splice(i, 1);
      }
      setFavoris(favs);
      refreshButton();
    });

    refreshButton();
  }

  // Section "Mes favoris" sur la page d'accueil
  var favSection = document.getElementById("mes-favoris");
  var favGrid = document.getElementById("mes-favoris-grid");
  if (favSection && favGrid && window.COCO_LIEUX) {
    var favs = getFavoris();
    if (!favs.length) return;

    var bySlug = {};
    window.COCO_LIEUX.forEach(function (l) {
      bySlug[l.slug] = l;
    });

    var found = favs.map(function (s) { return bySlug[s]; }).filter(Boolean);
    if (!found.length) return;

    found.forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.slug;
      a.className = "fiche-card";
      var thumb = document.createElement("div");
      thumb.className = "thumb";
      var img = document.createElement("img");
      img.src = l.img;
      img.alt = l.titre + " — " + l.categorie;
      img.loading = "lazy";
      thumb.appendChild(img);
      var body = document.createElement("div");
      body.className = "body";
      body.innerHTML =
        '<span class="tag">' + l.categorie + "</span>" +
        "<h3>" + l.titre + "</h3>" +
        "<p>" + l.lieu + "</p>";
      a.appendChild(thumb);
      a.appendChild(body);
      favGrid.appendChild(a);
    });

    favSection.hidden = false;
  }
})();
