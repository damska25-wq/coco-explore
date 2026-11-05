// Filtres rapides des pages catégorie × département et ville × catégorie :
// une pastille par badge présent sur les vignettes (Toute l'année, Saisonnier,
// Restrictions, Urgences 24h/24…) et, sur les hébergements, par supplément chien
// (data-supp : « Sans supplément », « Supplément ≤ 10 €/nuit »), affichée seulement si elle trie vraiment.
(function () {
  document.querySelectorAll(".fiche-grid[data-filterable]").forEach(function (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".fiche-card"));
    if (cards.length < 4) return;
    var counts = {};
    function tags(c) { return [c.getAttribute("data-badge"), c.getAttribute("data-supp")].filter(Boolean); }
    cards.forEach(function (c) { tags(c).forEach(function (b) { counts[b] = (counts[b] || 0) + 1; }); });
    var labels = Object.keys(counts).filter(function (b) { return counts[b] < cards.length; });
    if (!labels.length) return;
    var row = document.createElement("div");
    row.className = "dept-filter-row card-filter-row";
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", "Filtrer les adresses");
    function btn(label, n, value) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "dept-filter-btn" + (value === "" ? " active" : "");
      b.setAttribute("aria-pressed", value === "" ? "true" : "false");
      b.dataset.value = value;
      b.innerHTML = label + ' <span class="dept-filter-count">' + n + "</span>";
      return b;
    }
    row.appendChild(btn("Toutes", cards.length, ""));
    var ORDER = ["Sans supplément", "Supplément ≤ 10 €/nuit", "Toute l'année", "Saisonnier", "Zones limitées", "Restrictions", "Interdits", "Urgences 24h/24", "Règle à vérifier"];
    var rank = function (l) { var i = ORDER.indexOf(l); return i < 0 ? 50 : i; };
    labels.sort(function (a, b) { return rank(a) - rank(b) || a.localeCompare(b); }).forEach(function (l) { row.appendChild(btn(l, counts[l], l)); });
    row.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      row.querySelectorAll("button").forEach(function (x) { var on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      var v = b.dataset.value;
      cards.forEach(function (c) { c.hidden = !!v && tags(c).indexOf(v) < 0; });
    });
    grid.parentNode.insertBefore(row, grid);
  });
})();
