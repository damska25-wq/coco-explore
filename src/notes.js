// Coco Explore — notes des visiteurs sur les vignettes et la carte
// Récupère une seule fois la note moyenne de chaque fiche (avis publiés avec
// étoiles) et l'affiche « ★ 4,6 (12) » sur les vignettes [data-avis]. Les
// fiches sans note restent inchangées. Les cartes (map.js, dept-map.js)
// lisent la même donnée via window.CocoNotes au moment d'ouvrir une bulle.
(function () {
  var notes = {};

  function format(note) {
    return "★ " + Number(note[0]).toFixed(1).replace(".", ",") + " (" + note[1] + " avis)";
  }

  // Clé d'avis d'un lieu de la carte : son champ "avis" s'il diffère du
  // slug, sinon le slug sans le préfixe "fiche-".
  function keyFor(lieu) {
    return lieu.avis || String(lieu.slug || "").replace(/^\/?fiche-/, "");
  }

  window.CocoNotes = {
    popupLine: function (lieu) {
      var note = notes[keyFor(lieu)];
      return note ? '<span class="coco-popup-note">' + format(note) + "</span>" : "";
    }
  };

  function decorateCards() {
    var cards = document.querySelectorAll(".fiche-card[data-avis]");
    for (var i = 0; i < cards.length; i++) {
      var note = notes[cards[i].getAttribute("data-avis")];
      var body = cards[i].querySelector(".body");
      if (!note || !body || body.querySelector(".card-note")) continue;
      var span = document.createElement("span");
      span.className = "card-note";
      span.textContent = format(note);
      var title = body.querySelector("h3");
      body.insertBefore(span, title ? title.nextSibling : null);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var hasMap = document.getElementById("coco-map") || document.getElementById("coco-dept-map");
    if (!hasMap && !document.querySelector(".fiche-card[data-avis]")) return;
    fetch("/api/avis?notes")
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (data) {
        notes = data || {};
        decorateCards();
      })
      .catch(function () { /* sans notes, le site s'affiche comme avant */ });
  });
})();
