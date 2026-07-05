/**
 * PITLANE LK — resolve asset URLs on GitHub Pages (project sites & subfolders)
 */
(function (global) {
  "use strict";

  /**
   * Directory URL of the current page (always ends with /).
   * Fixes broken relative paths when the URL has no trailing slash, e.g.
   * https://user.github.io/repo-name  →  /repo-name/
   */
  function siteRoot() {
    var path = location.pathname || "/";
    var last = path.slice(path.lastIndexOf("/") + 1);
    if (last && last.indexOf(".") !== -1) {
      path = path.slice(0, path.lastIndexOf("/") + 1);
    } else if (!path.endsWith("/")) {
      path += "/";
    }
    return path;
  }

  function isAbsoluteUrl(url) {
    return /^(data:|https?:|\/\/)/i.test(String(url || "").trim());
  }

  /** Build a site-root-relative URL for a file under f1-insight */
  function asset(relativePath) {
    var raw = String(relativePath || "").trim();
    if (!raw || isAbsoluteUrl(raw)) return raw;
    return siteRoot() + raw.replace(/^\.\//, "");
  }

  function injectBaseTag() {
    if (document.querySelector("base[data-f1-root]")) return;
    var base = document.createElement("base");
    base.href = siteRoot();
    base.setAttribute("data-f1-root", "1");
    var head = document.head || document.getElementsByTagName("head")[0];
    if (head) head.insertBefore(base, head.firstChild);
  }

  injectBaseTag();

  global.F1Paths = {
    siteRoot: siteRoot,
    asset: asset,
    resolve: asset,
    isAbsoluteUrl: isAbsoluteUrl,
  };
})(typeof window !== "undefined" ? window : this);
