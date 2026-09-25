(function () {
  var row = document.getElementById("dept-filter-row");
  if (!row) return;

  var buttons = Array.prototype.slice.call(row.querySelectorAll(".dept-filter-btn"));
  var emptyMsg = document.getElementById("dept-filter-empty");
  var validCats = buttons.map(function (b) {
    return b.getAttribute("data-cat");
  });

  function sectionsList() {
    return Array.prototype.slice.call(document.querySelectorAll("section.fiches[id]"));
  }

  function applyFilter(cat, updateUrl) {
    var sections = sectionsList();
    var found = true;

    if (cat === "tout") {
      sections.forEach(function (s) {
        s.hidden = false;
      });
    } else {
      found = false;
      sections.forEach(function (s) {
        var match = s.id === cat;
        s.hidden = !match;
        if (match) found = true;
      });
    }

    if (emptyMsg) emptyMsg.hidden = found;

    buttons.forEach(function (b) {
      var active = b.getAttribute("data-cat") === cat;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (updateUrl) {
      var url = new URL(window.location.href);
      if (cat === "tout") {
        url.searchParams.delete("cat");
      } else {
        url.searchParams.set("cat", cat);
      }
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-cat"), true);
    });
  });

  var initialCat = "tout";
  try {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("cat");
    if (fromUrl && validCats.indexOf(fromUrl) !== -1) initialCat = fromUrl;
  } catch (e) {}

  applyFilter(initialCat, false);
})();
