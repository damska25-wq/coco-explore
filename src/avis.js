// Coco Explore — module Avis & photos
// Un seul script partagé par toutes les fiches. Chaque section .avis porte
// un attribut data-fiche qui identifie le lieu auprès de la fonction Netlify.
(function () {
  var API = "/api/avis";
  var MAX_PHOTO_SIDE = 900; // px, redimensionnement côté navigateur
  var JPEG_QUALITY = 0.72;
  var MAX_PHOTO_DATA_URL_CHARS = 380000; // marge sous la limite serveur (400 000)

  document.addEventListener("DOMContentLoaded", function () {
    var copyBtn = document.getElementById("copy-address");
    var copyStatus = document.getElementById("copy-address-status");
    if (copyBtn && copyStatus) {
      copyBtn.addEventListener("click", function () {
        var text = copyBtn.getAttribute("data-address") || "";
        function showCopied() {
          copyStatus.textContent = "Copié !";
          setTimeout(function () { copyStatus.textContent = ""; }, 2500);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied, function () {
            copyStatus.textContent = text;
          });
        } else {
          copyStatus.textContent = text;
        }
      });
    }

    var section = document.querySelector(".avis[data-fiche]");
    if (!section) return;

    var fiche = section.getAttribute("data-fiche");
    var form = section.querySelector(".avis-form");
    var list = section.querySelector(".avis-list");
    var nameInput = section.querySelector('input[name="name"]');
    var messageInput = section.querySelector('textarea[name="message"]');
    var photoInput = section.querySelector('input[name="photo"]');
    var photoBtn = section.querySelector(".avis-photo-btn");
    var photoBtnLabel = photoBtn ? photoBtn.querySelector("span") : null;
    var preview = section.querySelector(".avis-preview");
    var previewImg = preview ? preview.querySelector("img") : null;
    var previewRemove = preview ? preview.querySelector("button") : null;
    var status = section.querySelector(".avis-status");
    var submitBtn = section.querySelector(".avis-submit");
    var stars = Array.prototype.slice.call(section.querySelectorAll(".avis-star"));
    var ratingInput = section.querySelector('input[name="rating"]');
    var ratingSummary = document.getElementById("avis-rating-summary");

    var photoDataUrl = null;
    var ratings = [];

    function setSelectedStars(value) {
      stars.forEach(function (star) {
        star.classList.toggle("filled", Number(star.getAttribute("data-value")) <= value);
      });
    }

    stars.forEach(function (star) {
      star.addEventListener("click", function () {
        var value = Number(star.getAttribute("data-value"));
        if (ratingInput) ratingInput.value = String(value);
        setSelectedStars(value);
      });
    });

    function updateRatingSummary() {
      if (!ratingSummary || !ratings.length) return;
      var avg = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
      ratingSummary.textContent =
        "★ " + avg.toFixed(1) + " (" + ratings.length + (ratings.length > 1 ? " avis" : " avis") + ")";
      ratingSummary.hidden = false;

      // Ajoute la note moyenne aux données structurées de la fiche (premier
      // bloc JSON-LD, celui du lieu) une fois qu'on a de vraies notes — les
      // avis n'existent qu'en base de données, invisibles au moment du build.
      var ldScript = document.querySelector('script[type="application/ld+json"]');
      if (ldScript) {
        try {
          var data = JSON.parse(ldScript.textContent);
          data.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": avg.toFixed(1),
            "reviewCount": ratings.length
          };
          ldScript.textContent = JSON.stringify(data);
        } catch (e) { /* JSON-LD non conforme, on n'insiste pas */ }
      }
    }

    function starsMarkup(value) {
      value = Math.round(Number(value) || 0);
      if (!value) return "";
      var out = "";
      for (var i = 1; i <= 5; i++) out += i <= value ? "★" : "☆";
      return out;
    }

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text || "";
      status.className = "avis-status" + (kind ? " " + kind : "");
    }

    function initials(name) {
      return (name || "?").trim().charAt(0).toUpperCase();
    }

    function formatDate(iso) {
      try {
        var d = new Date(iso);
        return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      } catch (e) {
        return "";
      }
    }

    function renderComment(entry, prepend) {
      var empty = list.querySelector(".avis-empty");
      if (empty) empty.remove();

      var item = document.createElement("div");
      item.className = "avis-item";

      var avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = initials(entry.name);
      item.appendChild(avatar);

      var body = document.createElement("div");

      var who = document.createElement("span");
      who.className = "who";
      who.textContent = entry.name || "Anonyme";
      body.appendChild(who);

      var when = document.createElement("span");
      when.className = "when";
      when.textContent = formatDate(entry.date);
      body.appendChild(when);

      if (entry.rating) {
        var starsEl = document.createElement("span");
        starsEl.className = "avis-item-stars";
        starsEl.textContent = starsMarkup(entry.rating);
        starsEl.setAttribute("aria-label", entry.rating + " étoiles sur 5");
        body.appendChild(starsEl);
        ratings.push(Number(entry.rating));
      }

      var msg = document.createElement("p");
      msg.textContent = entry.message || "";
      body.appendChild(msg);

      if (entry.photo) {
        var figure = document.createElement("div");
        figure.className = "photo";
        var img = document.createElement("img");
        img.src = entry.photo;
        img.alt = "Photo envoyée par " + (entry.name || "un visiteur");
        img.loading = "lazy";
        figure.appendChild(img);
        body.appendChild(figure);
      }

      item.appendChild(body);

      if (prepend && list.firstChild) {
        list.insertBefore(item, list.firstChild);
      } else {
        list.appendChild(item);
      }
    }

    function loadComments() {
      fetch(API + "?fiche=" + encodeURIComponent(fiche))
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (entries) {
          if (!Array.isArray(entries) || entries.length === 0) return;
          entries
            .slice()
            .reverse()
            .forEach(function (entry) { renderComment(entry, false); });
          updateRatingSummary();
        })
        .catch(function () { /* silencieux : la fiche reste utilisable sans avis */ });
    }

    function resizePhoto(file, callback) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          function renderAt(maxSide) {
            var scale = Math.min(1, maxSide / Math.max(img.width, img.height));
            var canvas = document.createElement("canvas");
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas;
          }

          // La fonction serveur refuse les photos trop lourdes en base64 ;
          // on essaie plusieurs qualités puis, si besoin, une taille plus
          // petite, pour ne jamais renvoyer une image que le serveur rejettera.
          var qualities = [JPEG_QUALITY, 0.6, 0.5, 0.4];
          var canvas = renderAt(MAX_PHOTO_SIDE);
          var dataUrl = null;
          for (var i = 0; i < qualities.length; i++) {
            dataUrl = canvas.toDataURL("image/jpeg", qualities[i]);
            if (dataUrl.length <= MAX_PHOTO_DATA_URL_CHARS) break;
          }
          if (dataUrl.length > MAX_PHOTO_DATA_URL_CHARS) {
            canvas = renderAt(Math.round(MAX_PHOTO_SIDE * 0.65));
            dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          }
          callback(dataUrl.length <= MAX_PHOTO_DATA_URL_CHARS ? dataUrl : null);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    if (photoInput) {
      photoInput.addEventListener("change", function () {
        var file = photoInput.files && photoInput.files[0];
        if (!file) return;
        if (!file.type || file.type.indexOf("image/") !== 0) {
          setStatus("Ce fichier n'est pas une image.", "err");
          photoInput.value = "";
          return;
        }
        resizePhoto(file, function (dataUrl) {
          if (!dataUrl) {
            setStatus("Cette photo est trop lourde même après compression, essaie une autre photo.", "err");
            photoInput.value = "";
            return;
          }
          photoDataUrl = dataUrl;
          if (previewImg) previewImg.src = dataUrl;
          if (preview) preview.hidden = false;
          if (photoBtn) photoBtn.classList.add("has-photo");
          if (photoBtnLabel) photoBtnLabel.textContent = "Photo ajoutée";
          // Sur mobile, revenir du sélecteur de photo natif laisse parfois le
          // clavier fermé même après un tap sur le champ de message. On remet
          // le focus dessus pour éviter à la personne de devoir taper deux fois.
          if (messageInput && !messageInput.value) messageInput.focus();
        });
      });
    }

    if (previewRemove) {
      previewRemove.addEventListener("click", function () {
        photoDataUrl = null;
        if (photoInput) photoInput.value = "";
        if (preview) preview.hidden = true;
        if (photoBtn) photoBtn.classList.remove("has-photo");
        if (photoBtnLabel) photoBtnLabel.textContent = "Photo";
      });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (nameInput.value || "").trim();
        var message = (messageInput.value || "").trim();

        if (!name || !message) {
          setStatus("Merci de remplir ton prénom et un petit message.", "err");
          return;
        }

        submitBtn.disabled = true;
        setStatus("Envoi en cours…");

        fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fiche: fiche,
            name: name.slice(0, 60),
            message: message.slice(0, 500),
            photo: photoDataUrl,
            rating: ratingInput && ratingInput.value ? Number(ratingInput.value) : null
          })
        })
          .then(function (r) {
            if (r.ok) return r.json();
            // Une erreur 4xx vient d'un champ invalide (ex: photo trop
            // lourde) : réessayer sans rien changer échouera à nouveau, donc
            // on affiche le vrai motif plutôt que le message réseau générique.
            return r.json().catch(function () { return {}; }).then(function (body) {
              var err = new Error(body.error || "request_failed");
              err.isKnownApiError = r.status < 500 && !!body.error;
              throw err;
            });
          })
          .then(function (entry) {
            renderComment(entry, true);
            updateRatingSummary();
            form.reset();
            setSelectedStars(0);
            photoDataUrl = null;
            if (preview) preview.hidden = true;
            if (photoBtn) photoBtn.classList.remove("has-photo");
            if (photoBtnLabel) photoBtnLabel.textContent = "Photo";
            setStatus("Merci, ton avis a été publié !", "ok");
          })
          .catch(function (err) {
            setStatus(
              err && err.isKnownApiError ? err.message : "L'envoi a échoué, réessaie dans un instant.",
              "err"
            );
          })
          .finally(function () {
            submitBtn.disabled = false;
          });
      });
    }

    loadComments();
  });
})();
