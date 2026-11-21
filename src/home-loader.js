// Accueil : la carte, la recherche et les favoris ont besoin de map-data.js
// (toutes les fiches du site, plusieurs centaines de Ko même compressé).
// On ne charge ces scripts qu'au moment où le visiteur en a besoin : il touche
// la recherche, clique sur « Me localiser », approche de la carte, arrive par
// une ancre (#plages…) ou a des favoris enregistrés. Le haut de la page
// s'affiche ainsi beaucoup plus vite sur téléphone.
(function () {
  var scripts = [
    "vendor/leaflet/leaflet.js",
    "vendor/leaflet.markercluster/leaflet.markercluster.js",
    "map-data.js",
    "geoloc.js",
    "map.js",
    "search.js",
    "favoris.js"
  ];
  var started = false;
  var pendingLocate = false;

  function done() {
    var input = document.getElementById("site-search-input");
    if (input && input.value.trim()) input.dispatchEvent(new Event("input"));
    if (pendingLocate) {
      var b = document.getElementById("coco-locate-btn");
      if (b) b.click();
    }
  }

  function load() {
    if (started) return;
    started = true;
    var i = 0;
    (function next() {
      if (i >= scripts.length) { done(); return; }
      var s = document.createElement("script");
      s.src = scripts[i++];
      s.onload = next;
      s.onerror = next;
      document.body.appendChild(s);
    })();
  }
  window.CocoLoadHome = load;

  var input = document.getElementById("site-search-input");
  if (input) {
    input.addEventListener("focus", load);
    input.addEventListener("input", load);
  }
  var form = document.getElementById("site-search-form");
  if (form) form.addEventListener("submit", function (e) { if (!started) { e.preventDefault(); load(); } });

  var locateBtn = document.getElementById("coco-locate-btn");
  if (locateBtn) {
    locateBtn.addEventListener("click", function () {
      if (started) return;
      pendingLocate = true;
      load();
    });
  }

  if (window.location.hash && window.location.hash.length > 1) load();
  try {
    if (JSON.parse(localStorage.getItem("cocoFavoris") || "[]").length) load();
  } catch (e) { /* stockage indisponible */ }

  var carte = document.getElementById("carte");
  if (carte && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: "600px 0px" });
    io.observe(carte);
  } else {
    load();
  }
  window.addEventListener("hashchange", load);

  // Recherche vocale : API du navigateur (Chrome, Safari, Edge), sans service
  // ajouté par le site. Le bouton reste caché si le navigateur ne la propose pas.
  var mic = document.getElementById("site-search-mic");
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (mic && input && SR) {
    mic.hidden = false;
    var rec = null;
    var placeholder = input.placeholder;
    mic.addEventListener("click", function () {
      if (rec) { rec.stop(); return; }
      load();
      rec = new SR();
      rec.lang = "fr-FR";
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      mic.classList.add("listening");
      mic.setAttribute("aria-pressed", "true");
      input.value = "";
      input.placeholder = "Je t'écoute… (ex. : plage chien Hyères)";
      rec.onresult = function (e) {
        var text = "";
        for (var i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
        input.value = text.replace(/[.!?]+$/, "");
        input.dispatchEvent(new Event("input"));
      };
      rec.onerror = function (e) {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          input.placeholder = "Micro refusé : autorise-le dans ton navigateur, ou écris ta recherche.";
        }
      };
      rec.onend = function () {
        mic.classList.remove("listening");
        mic.setAttribute("aria-pressed", "false");
        if (!input.value) { setTimeout(function () { input.placeholder = placeholder; }, 3000); }
        else { input.placeholder = placeholder; input.focus(); }
        rec = null;
      };
      try { rec.start(); } catch (err) { rec = null; mic.classList.remove("listening"); }
    });
  }
})();
