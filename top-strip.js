/**
 * Shared top strip — banner, session times, date, language bar
 */
(function (global) {
  "use strict";

  function renderMount() {
    var mount = document.getElementById("siteTopStrip");
    if (!mount) return;
    mount.outerHTML =
      '<div class="top-strip">' +
      '<div class="container strip-inner">' +
      '<div class="strip-left">' +
      '<span class="live-dot" aria-hidden="true"></span>' +
      '<span id="siteBanner"></span>' +
      "</div>" +
      '<nav class="lang-bar" aria-label="Article language">' +
      '<button type="button" class="lang-btn" data-lang="si">සිංහල</button>' +
      '<button type="button" class="lang-btn active" data-lang="en">English</button>' +
      "</nav>" +
      '<time id="todayDate"></time>' +
      "</div></div>";
  }

  function refresh() {
    if (typeof F1Data === "undefined" || typeof I18n === "undefined") return;
    var data = F1Data.load();
    var dateEl = document.getElementById("todayDate");
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString(I18n.dateLocale(), {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
    }
    var banner = document.getElementById("siteBanner");
    var label = data.siteBanner || I18n.t("siteBanner");
    if (banner) banner.textContent = label;
  }

  function init() {
    renderMount();
  }

  global.F1TopStrip = { refresh: refresh, init: init };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
