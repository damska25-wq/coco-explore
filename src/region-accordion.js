(function () {
  var wrap = document.getElementById("region-accordion");
  if (!wrap) return;

  wrap.addEventListener("click", function (e) {
    var btn = e.target.closest(".region-accordion-toggle");
    if (!btn) return;
    var item = btn.closest(".region-accordion-item");
    var body = item && item.querySelector(".region-accordion-body");
    var expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (body) body.hidden = expanded;
  });
})();
