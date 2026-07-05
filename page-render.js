/**
 * Render editable site pages from F1Data
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function inlineFormat(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function replaceTokens(html) {
    return html
      .replace(/\{contact\}/g, '<a href="./index.html#contact">Contact</a>')
      .replace(/\{privacy\}/g, '<a href="./privacy.html">Privacy Policy</a>');
  }

  function bodyToHtml(text) {
    if (!text) return "";
    return String(text).split(/\n\n+/).filter(function (p) { return p.trim(); }).map(function (p) {
      return "<p>" + replaceTokens(inlineFormat(p.trim())) + "</p>";
    }).join("");
  }

  function renderLegal(slug) {
    var root = document.getElementById("pageRoot");
    if (!root || typeof F1Data === "undefined") return;
    var page = F1Data.getPage(slug);
    if (!page) {
      root.innerHTML = '<p class="load-status error">Page not found.</p>';
      return;
    }

    document.title = page.title + " — PITLANE LK";
    var html = '<a href="./index.html" class="legal-back">← Back to PITLANE LK</a>';
    html += "<h1>" + esc(page.title) + "</h1>";
    if (page.updated) html += '<p class="legal-updated">' + esc(page.updated) + "</p>";
    html += bodyToHtml(page.intro || "");
    (page.sections || []).forEach(function (sec) {
      if (sec.title) html += "<h2>" + esc(sec.title) + "</h2>";
      html += bodyToHtml(sec.body || "");
    });
    root.innerHTML = html;
  }

  function renderAdvertise() {
    var page = typeof F1Data !== "undefined" ? F1Data.getPage("advertise") : null;
    if (!page) return;

    document.title = (page.heroTitle || "Advertise") + " — PITLANE LK";

    var heroTitle = document.getElementById("advertiseHeroTitle");
    if (heroTitle) heroTitle.textContent = page.heroTitle || "Advertise on PITLANE LK";

    var statsEl = document.getElementById("advertiseStats");
    if (statsEl && Array.isArray(page.stats)) {
      statsEl.innerHTML = page.stats.map(function (s) {
        return '<div class="advertise-stat"><strong>' + esc(s.value) + "</strong><span>" + esc(s.label) + "</span></div>";
      }).join("");
    }

    var placementsTitle = document.getElementById("advertisePlacementsTitle");
    var placementsDesc = document.getElementById("advertisePlacementsDesc");
    if (placementsTitle) placementsTitle.textContent = page.placementsTitle || "Banner sizes & placements";
    if (placementsDesc) placementsDesc.textContent = page.placementsDesc || "";

    var packagesTitle = document.getElementById("advertisePackagesTitle");
    var packagesDesc = document.getElementById("advertisePackagesDesc");
    if (packagesTitle) packagesTitle.textContent = page.packagesTitle || "Advertising packages";
    if (packagesDesc) packagesDesc.textContent = page.packagesDesc || "";

    var packagesEl = document.getElementById("advertisePackages");
    if (packagesEl && Array.isArray(page.packages)) {
      packagesEl.innerHTML = page.packages.map(function (pkg) {
        var features = (pkg.features || []).map(function (f) {
          return "<li>" + esc(f) + "</li>";
        }).join("");
        return '<article class="ad-package' + (pkg.featured ? " featured" : "") + '">' +
          "<h3>" + esc(pkg.name) + "</h3>" +
          '<p class="price">' + esc(pkg.price) + " <small>" + esc(pkg.period || "") + "</small></p>" +
          "<ul>" + features + "</ul>" +
          '<a href="./index.html#contact" class="btn btn-primary">' + esc(pkg.cta || "Enquire") + "</a></article>";
      }).join("");
    }

    var footerNote = document.getElementById("advertiseFooterNote");
    if (footerNote && page.footerNote) {
      footerNote.innerHTML = replaceTokens(inlineFormat(page.footerNote));
    }
  }

  function initLegal(slug) {
    function run() { renderLegal(slug); }
    if (typeof F1Data !== "undefined" && F1Data.whenReady) F1Data.whenReady(run);
    else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
    else run();
  }

  function initAdvertise() {
    function run() { renderAdvertise(); }
    if (typeof F1Data !== "undefined" && F1Data.whenReady) F1Data.whenReady(run);
    else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
    else run();
  }

  global.F1PageRender = {
    renderLegal: renderLegal,
    renderAdvertise: renderAdvertise,
    initLegal: initLegal,
    initAdvertise: initAdvertise,
  };
})(typeof window !== "undefined" ? window : this);
