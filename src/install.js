// Bouton « Installer Coco Explore » : propose d'ajouter le site à l'écran
// d'accueil du téléphone (Android/Chrome via beforeinstallprompt, iPhone via
// une consigne Safari). Rien ne s'affiche si le site est déjà installé.
(function () {
  var slot = document.getElementById("install-app");
  if (!slot) return;
  var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone;
  if (standalone) return;
  var ua = navigator.userAgent || "";
  var isIOS = /iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
  if (isIOS) {
    slot.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg><span>Garde Coco Explore sous la main : dans Safari, touche <strong>Partager</strong> puis <strong>« Sur l\'écran d\'accueil »</strong>.</span>';
    slot.hidden = false;
    return;
  }
  var deferred = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    slot.innerHTML = '<button type="button" class="install-app-btn"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>Installer Coco Explore sur ton téléphone</button>';
    slot.hidden = false;
    slot.querySelector("button").addEventListener("click", function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; slot.hidden = true; });
    });
  });
  window.addEventListener("appinstalled", function () { slot.hidden = true; });
})();
