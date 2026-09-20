(function () {
  var KEY = "cocoCookieConsent";
  var GA_ID = "G-BG010Z1RGE";

  function getConsent() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* localStorage indisponible — le bandeau se réaffichera, sans plus de conséquence */
    }
  }

  function loadGoogleAnalytics() {
    if (window.__cocoGaLoaded) return;
    window.__cocoGaLoaded = true;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  var banner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("cookie-accept");
  var declineBtn = document.getElementById("cookie-decline");
  var manageLink = document.getElementById("cookie-manage");

  function showBanner() {
    if (banner) banner.hidden = false;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  var consent = getConsent();
  if (consent === "granted") {
    loadGoogleAnalytics();
  } else if (consent !== "denied") {
    showBanner();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setConsent("granted");
      hideBanner();
      loadGoogleAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      setConsent("denied");
      hideBanner();
    });
  }

  if (manageLink) {
    manageLink.addEventListener("click", function (e) {
      e.preventDefault();
      showBanner();
    });
  }
})();
