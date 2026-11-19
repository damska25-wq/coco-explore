(function () {
  var lieux = window.COCO_LIEUX || [];
  var pages = window.COCO_PAGES || [];
  var form = document.getElementById("site-search-form");
  var input = document.getElementById("site-search-input");
  var results = document.getElementById("site-search-results");
  if (!form || !input || !results) return;

  function normalize(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  }

  // Mots vides ignorés : on peut taper une phrase (« une plage à Cavalaire »).
  var STOP = ("un une des le la les l a au aux de du d en et ou pour avec sans sur dans pres proche "
    + "autour moi mon ma mes ton ta son sa je cherche trouver ou quel quelle quels quelles "
    + "pet canin canine canins canines animal animale animaux chien chiens toutou toutous accepte acceptes acceptee admis ok friendly dog").split(" ");
  // Mots qui désignent une catégorie (forme sans accent, au singulier).
  var CATS = {
    plage: ["plages", "cote-azur"], crique: ["plages", "cote-azur"],
    pension: ["dogsitters"], garde: ["dogsitters"], gardiennage: ["dogsitters"], garderie: ["dogsitters"],
    dogsitter: ["dogsitters"], petsitter: ["dogsitters"], sitter: ["dogsitters"], chenil: ["dogsitters"],
    veto: ["veterinaires"], veterinaire: ["veterinaires"], clinique: ["veterinaires"], urgence: ["veterinaires"],
    resto: ["restaurants"], restaurant: ["restaurants"], cafe: ["restaurants"], creperie: ["restaurants"],
    hotel: ["hebergements"], camping: ["hebergements"], gite: ["hebergements"], chambre: ["hebergements"],
    hebergement: ["hebergements"], logement: ["hebergements"], location: ["hebergements"], dormir: ["hebergements"],
    toiletteur: ["toiletteurs"], toilettage: ["toiletteurs"],
    dogwash: ["dogwash"], lavage: ["dogwash"], douche: ["dogwash"], laver: ["dogwash"],
    balade: ["balades"], rando: ["balades"], randonnee: ["balades"], promenade: ["balades"], sentier: ["balades"],
    lac: ["lacs"], etang: ["lacs"], riviere: ["lacs"], baignade: ["lacs"],
    education: ["education"], educateur: ["education"], dressage: ["education"], club: ["education"],
    activite: ["activites"], caniparc: ["activites"], parc: ["activites", "balades"]
  };

  // Singulier approximatif : « plages » → « plage », « chevaux » reste tel quel.
  function stem(w) {
    return w.length > 3 && /s$/.test(w) ? w.slice(0, -1) : w;
  }

  function parse(query) {
    var words = normalize(query).replace(/[’'.,;:!?()\-]/g, " ").split(/\s+/).filter(Boolean);
    var cats = [];
    var place = [];
    words.forEach(function (w) {
      if (STOP.indexOf(w) !== -1) return;
      var c = CATS[stem(w)] || CATS[w];
      if (c) { cats = cats.concat(c); return; }
      place.push(stem(w));
    });
    return { cats: cats, place: place };
  }

  function search(query) {
    var p = parse(query);
    if (!p.cats.length && !p.place.length) return [];
    function placeOk(l) {
      if (!p.place.length) return true;
      var toks = (normalize(l.titre) + " " + normalize(l.lieu) + " " + normalize(l.categorie))
        .split(/[^a-z0-9]+/).filter(Boolean).map(stem);
      // Mot de 4 lettres ou plus : début de mot suffit (« cavala » → Cavalaire) ;
      // mot court (« var », « nice ») : mot entier, pour ne pas trouver « Varrats ».
      return p.place.every(function (w) {
        return toks.some(function (t) { return w.length >= 4 ? t.indexOf(w) === 0 : t === w; });
      });
    }
    function catOk(l) {
      return !p.cats.length || (l.catId && p.cats.indexOf(l.catId) !== -1);
    }
    var pagesHit = pages.filter(function (l) {
      // Pages ville et guides sans catégorie : seulement si on n'a pas demandé de catégorie.
      if (p.cats.length && !l.catId) return false;
      if (!p.cats.length && l.catId) return false;
      return placeOk(l) && catOk(l);
    });
    // Sans lieu tapé, on propose la page nationale de la catégorie.
    if (!p.place.length) pagesHit = pagesHit.filter(function (l) { return l.categorie === "Catégorie"; });
    // Page ville d'abord, puis département, puis page nationale.
    var rank = { "Page ville": 0, "Département": 1, "Catégorie": 2, "Guide": 3 };
    pagesHit.sort(function (a, b) { return (rank[a.categorie] || 0) - (rank[b.categorie] || 0); });
    var top = pagesHit.slice(0, 3);
    var fiches = p.place.length ? lieux.filter(function (l) { return placeOk(l) && catOk(l); }) : [];
    return top.concat(fiches.slice(0, 8 - top.length));
  }

  function render(matches, query) {
    results.innerHTML = "";
    if (!query.trim()) {
      results.hidden = true;
      return;
    }
    if (!matches.length) {
      var empty = document.createElement("div");
      empty.className = "sr-empty";
      empty.textContent = "Aucun résultat pour « " + query + " ».";
      results.appendChild(empty);
      results.hidden = false;
      return;
    }
    matches.forEach(function (l) {
      var a = document.createElement("a");
      a.href = "/" + l.slug;
      var title = document.createElement("span");
      title.className = "sr-title";
      title.textContent = l.titre;
      var meta = document.createElement("span");
      meta.className = "sr-meta";
      meta.textContent = l.categorie + " · " + l.lieu;
      a.appendChild(title);
      a.appendChild(meta);
      results.appendChild(a);
    });
    results.hidden = false;
  }

  input.addEventListener("input", function () {
    render(search(input.value), input.value);
  });

  input.addEventListener("focus", function () {
    if (input.value.trim()) render(search(input.value), input.value);
  });

  document.addEventListener("click", function (e) {
    if (!form.contains(e.target) && !results.contains(e.target)) {
      results.hidden = true;
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      results.hidden = true;
      input.blur();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var matches = search(input.value);
    if (matches.length) {
      window.location.href = matches[0].slug;
    }
  });

  var copyBtn = document.getElementById("copy-link-btn");
  var copyStatus = document.getElementById("copy-link-status");
  if (copyBtn && copyStatus) {
    copyBtn.addEventListener("click", function () {
      var url = "https://cocoexplore.com/";
      function showCopied() {
        copyStatus.textContent = "Lien copié !";
        setTimeout(function () { copyStatus.textContent = ""; }, 2500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(showCopied, function () {
          copyStatus.textContent = url;
        });
      } else {
        copyStatus.textContent = url;
      }
    });
  }
})();
