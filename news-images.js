/**
 * Article image helpers — upload URL or gradient fallback
 */
(function (global) {
  "use strict";

  function imageSrc(article) {
    if (!article || !article.image) return "";
    var src = String(article.image).trim();
    if (global.F1Paths && !global.F1Paths.isAbsoluteUrl(src)) {
      return global.F1Paths.asset(src);
    }
    return src;
  }

  function thumbColors(article) {
    var t = article && article.thumb;
    return Array.isArray(t) && t.length >= 2 ? t : ["#f3f4f6", "#e5e7eb"];
  }

  function attrEsc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function leadHtml(article, badgeHtml) {
    var src = imageSrc(article);
    var colors = thumbColors(article);
    if (src) {
      return '<div class="lead-image has-photo">' +
        '<img src="' + attrEsc(src) + '" alt="" loading="eager" />' +
        (badgeHtml ? '<span class="lead-image-label">' + badgeHtml + "</span>" : "") +
        "</div>";
    }
    return '<div class="lead-image" style="--thumb-a:' + colors[0] + ";--thumb-b:" + colors[1] + '">' +
      (badgeHtml ? '<span class="lead-image-label">' + badgeHtml + "</span>" : "") +
      "</div>";
  }

  function cardHtml(article, tagHtml) {
    var src = imageSrc(article);
    var colors = thumbColors(article);
    if (src) {
      return '<div class="thumb has-photo">' +
        '<img src="' + attrEsc(src) + '" alt="" loading="lazy" />' +
        (tagHtml || "") +
        "</div>";
    }
    return '<div class="thumb" style="--thumb-a:' + colors[0] + ";--thumb-b:" + colors[1] + '">' +
      (tagHtml || "") +
      "</div>";
  }

  function articleHtml(article, tagHtml) {
    var src = imageSrc(article);
    if (src) {
      return '<figure class="article-figure">' +
        '<img class="article-photo" src="' + attrEsc(src) + '" alt="" loading="eager" />' +
        (tagHtml ? '<figcaption class="article-photo-cap">' + tagHtml + "</figcaption>" : "") +
        "</figure>";
    }
    return '<div class="lead-image article-placeholder" style="margin:24px 0">' + (tagHtml || "") + "</div>";
  }

  global.F1NewsImages = {
    imageSrc: imageSrc,
    thumbColors: thumbColors,
    leadHtml: leadHtml,
    cardHtml: cardHtml,
    articleHtml: articleHtml,
  };
})(typeof window !== "undefined" ? window : this);
