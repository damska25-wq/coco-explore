// Coco Explore — module Avis & photos
// Un seul script partagé par toutes les fiches. Chaque section .avis porte
// un attribut data-fiche qui identifie le lieu auprès de la fonction Netlify.
(function () {
  var API = "/api/avis";
  var MAX_PHOTO_SIDE = 900; // px, redimensionnement côté navigateur
  var JPEG_QUALITY = 0.72;

  document.addEventListener("DOMContentLoaded", function () {
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

    var photoDataUrl = null;

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
        })
        .catch(function () { /* silencieux : la fiche reste utilisable sans avis */ });
    }

    function resizePhoto(file, callback) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          var scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(img.width, img.height));
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          callback(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
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
            photo: photoDataUrl
          })
        })
          .then(function (r) {
            if (!r.ok) throw new Error("request_failed");
            return r.json();
          })
          .then(function (entry) {
            renderComment(entry, true);
            form.reset();
            photoDataUrl = null;
            if (preview) preview.hidden = true;
            if (photoBtn) photoBtn.classList.remove("has-photo");
            if (photoBtnLabel) photoBtnLabel.textContent = "Photo";
            setStatus("Merci, ton avis a été publié !", "ok");
          })
          .catch(function () {
            setStatus("L'envoi a échoué, réessaie dans un instant.", "err");
          })
          .finally(function () {
            submitBtn.disabled = false;
          });
      });
    }

    loadComments();
  });
})();
