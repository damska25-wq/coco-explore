// Aide partagée pour la géolocalisation du visiteur (carte d'accueil et page
// des conseils). Utilise uniquement l'API native du navigateur — aucun
// service tiers, donc aucun coût et aucune clé à gérer.
window.CocoGeoloc = (function () {
  var STORAGE_KEY = "coco_position";
  var MAX_AGE_MS = 2 * 60 * 60 * 1000; // la position reste valable 2h, pour éviter de redemander en changeant de page

  function getStored() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || typeof data.lat !== "number" || typeof data.lng !== "number") return null;
      if (Date.now() - data.at > MAX_AGE_MS) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function store(lat, lng) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat: lat, lng: lng, at: Date.now() }));
    } catch (e) {
      /* stockage indisponible (navigation privée...) — on continue sans mémoriser */
    }
  }

  // Demande la position au navigateur. onSuccess({lat,lng}) / onError(message)
  function request(onSuccess, onError) {
    if (!("geolocation" in navigator)) {
      onError("La géolocalisation n'est pas disponible sur ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        store(lat, lng);
        onSuccess({ lat: lat, lng: lng });
      },
      function (err) {
        var msg = "Impossible de récupérer ta position.";
        if (err && err.code === 1) msg = "Autorisation refusée — tu peux l'accepter depuis les réglages de ton navigateur si tu changes d'avis.";
        onError(msg);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: MAX_AGE_MS }
    );
  }

  // Distance à vol d'oiseau en kilomètres (formule de Haversine).
  function distanceKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLng = ((lng2 - lng1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(km) {
    if (km < 1) return Math.round(km * 1000) + " m";
    return (km < 10 ? km.toFixed(1) : Math.round(km)) + " km";
  }

  return { getStored: getStored, request: request, distanceKm: distanceKm, formatDistance: formatDistance };
})();
