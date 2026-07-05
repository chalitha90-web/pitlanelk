/**
 * PITLANE LK — promotional ad slots (house ads for advertisers)
 */
(function () {
  "use strict";

  var MEDIA_KIT = "./advertise.html";
  var AD_CTA = "Advertise with us";

  var COPY = {
    leaderboard: {
      badge: "Premium placement",
      title: "Your brand on the starting grid",
      line: "Leaderboard banner · high visibility on every page",
      size: "728 × 90",
    },
    billboard: {
      badge: "Homepage spotlight",
      title: "Reach Sri Lanka's F1 audience",
      line: "Billboard placement above the news feed",
      size: "970 × 250",
    },
    mpu: {
      badge: "Sidebar",
      title: "Put your message in the pit lane",
      line: "Medium rectangle · news & article pages",
      size: "300 × 250",
    },
    inline: {
      badge: "In-feed",
      title: "Sponsor the championship story",
      line: "Native banner between news sections",
      size: "Responsive",
    },
    strip: {
      badge: "Race weekend special",
      title: "Launch your campaign for the next Grand Prix",
      line: "Limited slots for Austrian GP, Silverstone & beyond",
      size: "Full width",
    },
    article: {
      title: "Place your advert here",
      line: "Inside F1 news articles",
      size: "300 × 250",
    },
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderArticlePlaceholder(el, kind) {
    var c = COPY.article;
    if (kind === "inline") {
      c = { title: COPY.article.title, line: COPY.article.line, size: COPY.inline.size };
    }

    el.className = "ad-promo ad-promo--" + kind + " ad-promo--placeholder";
    el.setAttribute("role", "complementary");
    el.setAttribute("aria-label", "Advertisement");
    el.innerHTML =
      '<div class="ad-promo-link ad-promo-link--static">' +
      '<span class="ad-promo-checker" aria-hidden="true"></span>' +
      '<span class="ad-promo-stripe" aria-hidden="true"></span>' +
      '<span class="ad-promo-size">' + esc(c.size) + "</span>" +
      '<strong class="ad-promo-title">' + esc(c.title) + "</strong>" +
      '<span class="ad-promo-line">' + esc(c.line) + "</span>" +
      "</div>";
  }

  function renderImageAd(el, cfg) {
    var kind = el.getAttribute("data-ad-slot");
    var href = (cfg.href || "").trim() || el.getAttribute("data-ad-href") || "";
    var alt = (cfg.alt || "").trim() || "Advertisement";
    var mod = "ad-promo ad-promo--" + kind + " ad-promo--live";

    el.className = mod;
    el.setAttribute("role", "complementary");
    el.setAttribute("aria-label", alt);

    var img = '<img class="ad-banner-img" src="' + esc(cfg.image) + '" alt="' + esc(alt) + '" loading="lazy" />';
    if (href) {
      el.innerHTML =
        '<a class="ad-banner-link" href="' + esc(href) + '" target="_blank" rel="noopener sponsored">' +
        img + "</a>";
    } else {
      el.innerHTML = img;
    }
  }

  function renderPromo(el) {
    var kind = el.getAttribute("data-ad-slot");
    var ads = typeof F1Data !== "undefined" && F1Data.getAds ? F1Data.getAds() : {};
    var cfg = ads[kind];
    if (cfg && cfg.enabled && cfg.image) {
      var imgSrc = cfg.image;
      if (typeof F1Paths !== "undefined" && !F1Paths.isAbsoluteUrl(imgSrc)) {
        imgSrc = F1Paths.asset(imgSrc);
      }
      renderImageAd(el, Object.assign({}, cfg, { image: imgSrc }));
      return;
    }
    if (kind === "article" || el.closest("#articleRoot")) {
      renderArticlePlaceholder(el, kind);
      return;
    }
    var c = COPY[kind] || COPY.inline;
    var href = el.getAttribute("data-ad-href") || MEDIA_KIT;
    var mod = "ad-promo ad-promo--" + kind;

    el.className = mod;
    el.setAttribute("role", "complementary");
    el.setAttribute("aria-label", "Advertisement opportunity");
    el.innerHTML =
      '<a class="ad-promo-link" href="' + esc(href) + '">' +
      '<span class="ad-promo-checker" aria-hidden="true"></span>' +
      '<span class="ad-promo-stripe" aria-hidden="true"></span>' +
      '<span class="ad-promo-size">' + esc(c.size) + "</span>" +
      '<span class="ad-promo-badge">' + esc(c.badge) + "</span>" +
      '<span class="ad-promo-brand">PITLANE LK</span>' +
      '<strong class="ad-promo-title">' + esc(c.title) + "</strong>" +
      '<span class="ad-promo-line">' + esc(c.line) + "</span>" +
      '<span class="ad-promo-cta">' + esc(AD_CTA) + " →</span>" +
      "</a>";
  }

  function init(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-ad-slot]").forEach(function (el) {
      if (!el.classList.contains("ad-promo")) renderPromo(el);
    });
  }

  window.initAdSlots = init;

  function boot() {
    init();
  }

  if (typeof F1Data !== "undefined" && F1Data.whenReady) {
    F1Data.whenReady(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
