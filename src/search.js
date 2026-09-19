(function () {
  var lieux = window.COCO_LIEUX || [];
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

  function search(query) {
    var q = normalize(query).trim();
    if (!q) return [];
    return lieux
      .filter(function (l) {
        return (
          normalize(l.titre).indexOf(q) !== -1 ||
          normalize(l.lieu).indexOf(q) !== -1 ||
          normalize(l.categorie).indexOf(q) !== -1
        );
      })
      .slice(0, 8);
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
      a.href = l.slug;
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
})();
