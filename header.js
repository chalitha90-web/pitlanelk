/**
 * Shared site header + main navigation
 */
(function () {
  "use strict";

  var NAV = [
    { id: "news", href: "./index.html#news", label: "News" },
    { id: "standings", href: "./index.html#standings", label: "Standings" },
    { id: "calendar", href: "./index.html#calendar", label: "Calendar" },
    { id: "contact", href: "./index.html#contact", label: "Contact" },
    { id: "about", href: "./about.html", label: "About Us" },
  ];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function renderHeader() {
    var mount = document.getElementById("siteHeader");
    if (!mount) return;

    var navHtml = NAV.map(function (item) {
      return '<a href="' + esc(item.href) + '">' + esc(item.label) + "</a>";
    }).join("");

    mount.outerHTML =
      '<header class="site-header">' +
      '<div class="container header-inner">' +
      '<a href="./index.html" class="logo">' +
      '<img src="' + (typeof F1Paths !== "undefined" ? F1Paths.asset("./assets/logo.png") : "./assets/logo.png") + '" alt="PITLANE LK" class="logo-img" />' +
      "</a>" +
      '<nav class="nav" aria-label="Main">' + navHtml + "</nav>" +
      "</div></header>";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderHeader);
  } else {
    renderHeader();
  }
})();
