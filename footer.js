/**

 * Shared site footer — one place to update links & social URLs

 */

(function () {

  "use strict";



  var SVG = {

    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>',

    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.91v-8.41H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87v2.24h3.32l-.53 3.5h-2.79v8.41C19.61 23.09 24 18.09 24 12.07z"/></svg>',

    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c2.67 0 2.99.01 4.04.06 1.01.05 1.56.22 1.93.37.48.19.82.41 1.18.77.36.36.58.7.77 1.18.15.37.32.92.37 1.93.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.01-.22 1.56-.37 1.93-.19.48-.41.82-.77 1.18-.36.36-.7.58-1.18.77-.37.15-.92.32-1.93.37-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.01-.05-1.56-.22-1.93-.37a3.2 3.2 0 0 1-1.18-.77 3.2 3.2 0 0 1-.77-1.18c-.15-.37-.32-.92-.37-1.93C2.21 14.99 2.2 14.67 2.2 12s.01-2.99.06-4.04c.05-1.01.22-1.56.37-1.93.19-.48.41-.82.77-1.18.36-.36.7-.58 1.18-.77.37-.15.92-.32 1.93-.37C9.01 2.21 9.33 2.2 12 2.2zm0-2.2C9.27 0 8.93.01 7.86.06 6.81.11 6.04.29 5.37.57a5.4 5.4 0 0 0-1.95 1.27A5.4 5.4 0 0 0 2.15 3.8C1.87 4.47 1.69 5.24 1.64 6.3.01 8.93 0 9.27 0 12c0 2.73.01 3.07.06 4.14.05 1.06.23 1.83.51 2.5a5.4 5.4 0 0 0 1.27 1.95 5.4 5.4 0 0 0 1.95 1.27c.67.28 1.44.46 2.5.51C8.93 23.99 9.27 24 12 24s3.07-.01 4.14-.06c1.06-.05 1.83-.23 2.5-.51a5.4 5.4 0 0 0 1.95-1.27 5.4 5.4 0 0 0 1.27-1.95c.28-.67.46-1.44.51-2.5.05-1.07.06-1.41.06-4.14 0-2.73-.01-3.07-.06-4.14-.05-1.06-.23-1.83-.51-2.5a5.4 5.4 0 0 0-1.27-1.95A5.4 5.4 0 0 0 20.63.57C19.96.29 19.19.11 18.14.06 17.07.01 16.73 0 14 0h-2z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.32A4.16 4.16 0 1 1 16.16 12 4.16 4.16 0 0 1 12 16.16zm6.45-11.89a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>',

  };



  function esc(s) {

    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  }



  function socialLink(key, label, social) {

    var url = (social && social[key]) || "#";

    return '<a href="' + esc(url) + '" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="' + esc(label) + '">' + SVG[key] + "</a>";

  }



  function renderFooter() {

    var el = document.getElementById("siteFooter");

    if (!el) return;



    var social = {

      youtube: "https://www.youtube.com/",

      facebook: "https://www.facebook.com/",

      instagram: "https://www.instagram.com/",

    };

    if (typeof F1Data !== "undefined") {

      social = Object.assign(social, F1Data.getSocial());

    }



    var onHome = /index\.html$/.test(location.pathname) || /\/$/.test(location.pathname) || location.pathname === "";

    var contact = onHome ? "#contact" : "./index.html#contact";



    el.innerHTML =

      '<div class="container footer-grid">' +

      '<div class="footer-col footer-legal">' +

      "<p class=\"footer-copy\">© 2026 Pitlane LK</p>" +

      '<p class="footer-meta">Developed by EnCrate Global FZ-LLC. All rights reserved.</p>' +

      '<p class="footer-meta">Not affiliated with Formula 1 or the FIA.</p>' +

      "</div>" +

      '<nav class="footer-col footer-social" aria-label="Social media">' +

      socialLink("youtube", "YouTube", social) +

      socialLink("facebook", "Facebook", social) +

      socialLink("instagram", "Instagram", social) +

      "</nav>" +

      '<nav class="footer-col footer-nav" aria-label="Footer links">' +

      '<a href="./index.html">Home</a>' +

      '<a href="./about.html">About</a>' +

      '<a href="' + contact + '">Contact</a>' +

      '<a href="./advertise.html">Advertising</a>' +

      '<a href="./disclaimer.html">Disclaimer</a>' +

      '<a href="./privacy.html">Privacy</a>' +

      '<a href="./cookies.html">Cookies</a>' +

      "</nav>" +

      "</div>";

  }



  function boot() {
    renderFooter();
  }

  if (typeof F1Data !== "undefined" && F1Data.whenReady) {
    F1Data.whenReady(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

