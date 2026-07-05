(function () {
  "use strict";

  var data = null;
  var activeCategory = "All";
  var activeStandings = "drivers";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function posClass(pos) {
    return pos <= 3 ? "pos pos-" + pos : "pos";
  }

  function articleUrl(id) {
    return "./article.html?id=" + encodeURIComponent(id);
  }

  function setToday() {
    if (window.F1TopStrip) {
      F1TopStrip.refresh();
      return;
    }
    var el = document.getElementById("todayDate");
    if (el) {
      el.textContent = new Date().toLocaleDateString(I18n.dateLocale(), {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
    }
    var banner = document.getElementById("siteBanner");
    var label = data.siteBanner || I18n.t("siteBanner");
    if (banner) banner.textContent = label;
  }

  function articleText(article) {
    return F1Data.getArticleFields(article, I18n.getLang());
  }

  function getFeaturedArticle() {
    return data.news.find(function (n) { return n.featured; }) || data.news[0];
  }

  function renderLead() {
    var featured = getFeaturedArticle();
    var el = document.getElementById("leadStory");
    if (!el || !featured) return;
    var text = articleText(featured);
    var badge = esc(I18n.catLabel(featured.category)) + " · " + esc(I18n.t("feature_badge"));
    var imageHtml = typeof F1NewsImages !== "undefined"
      ? F1NewsImages.leadHtml(featured, badge)
      : '<div class="lead-image"><span class="lead-image-label">' + badge + "</span></div>";
    el.innerHTML =
      '<a href="' + articleUrl(featured.id) + '" class="lead-link">' +
      imageHtml +
      '<div class="lead-body">' +
      '<span class="category">' + esc(I18n.catLabel(featured.category)) + "</span>" +
      "<h1>" + esc(text.title) + "</h1>" +
      '<p class="dek">' + esc(text.excerpt) + "</p>" +
      '<p class="meta"><strong>' + esc(featured.author) + "</strong><span>" + esc(featured.time) + "</span></p></div></a>";
  }

  function renderHeadlines() {
    var featured = getFeaturedArticle();
    var el = document.getElementById("headlineList");
    if (!el) return;
    var items = data.news.filter(function (n) { return !featured || n.id !== featured.id; }).slice(0, 5);
    if (!items.length) {
      el.innerHTML = '<li class="headlines-empty">More stories coming soon.</li>';
      return;
    }
    el.innerHTML = items.map(function (n, i) {
      var text = articleText(n);
      var num = String(i + 1).padStart(2, "0");
      return '<li class="headline-item">' +
        '<span class="headline-num" aria-hidden="true">' + num + "</span>" +
        '<div class="headline-content">' +
        '<span class="headline-cat">' + esc(I18n.catLabel(n.category)) + "</span>" +
        '<a href="' + articleUrl(n.id) + '">' + esc(text.title) + "</a>" +
        '<div class="time">' + esc(n.author) + " · " + esc(n.time) + "</div></div></li>";
    }).join("");
  }

  function renderNewsFilters() {
    var el = document.getElementById("newsFilters");
    if (!el) return;
    var cats = ["All"].concat(data.categories || []);
    el.innerHTML = cats.map(function (cat) {
      return '<button type="button" class="filter-tab' + (cat === activeCategory ? " active" : "") + '" data-category="' + esc(cat) + '">' + esc(I18n.catLabel(cat)) + "</button>";
    }).join("");
    el.querySelectorAll(".filter-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-category");
        renderNewsFilters();
        renderNewsGrid();
      });
    });
  }

  function renderNewsGrid() {
    var el = document.getElementById("newsGrid");
    if (!el) return;
    var items = data.news.filter(function (n) {
      return activeCategory === "All" || n.category === activeCategory;
    });
    el.innerHTML = items.map(function (n) {
      var text = articleText(n);
      var tag = '<span class="tag">' + esc(I18n.catLabel(n.category)) + "</span>";
      var thumbHtml = typeof F1NewsImages !== "undefined"
        ? F1NewsImages.cardHtml(n, tag)
        : '<div class="thumb"><span class="tag">' + esc(I18n.catLabel(n.category)) + "</span></div>";
      return '<article class="news-card">' + thumbHtml + '<div class="body"><h3><a href="' + articleUrl(n.id) + '">' +
        esc(text.title) + "</a></h3><p>" + esc(text.excerpt) + '</p><div class="meta">' + esc(n.author) + " · " + esc(n.time) + "</div></div></article>";
    }).join("");
  }

  function renderStandings() {
    var el = document.getElementById("standingsTable");
    if (!el) return;
    var TC = F1Data.TEAM_COLORS;

    if (activeStandings === "drivers") {
      el.innerHTML = '<div class="standings-scroll"><table><thead><tr>' +
        "<th>" + esc(I18n.t("th_pos")) + "</th>" +
        "<th>" + esc(I18n.t("th_driver")) + "</th>" +
        '<th class="num">' + esc(I18n.t("th_points")) + "</th>" +
        '<th class="num">' + esc(I18n.t("th_wins")) + "</th>" +
        '<th class="num">' + esc(I18n.t("th_podiums")) + "</th>" +
        "</tr></thead><tbody>" +
        data.drivers.map(function (d) {
          var c = TC[d.team] || "#888";
          var flag = F1Data.flagEmoji(d.nationality);
          var shortName = F1Data.shortDriverName(d.name);
          return "<tr>" +
            '<td class="' + posClass(d.pos) + '">' + d.pos + "</td>" +
            "<td>" +
              '<div class="driver-cell">' +
              (flag ? '<span class="driver-flag" aria-hidden="true">' + flag + "</span>" : "") +
              '<span class="driver-info">' +
                '<strong class="driver-name">' + esc(shortName) + "</strong>" +
                '<span class="driver-team"><span class="team-dot" style="background:' + c + '"></span>' + esc(d.team) + "</span>" +
              "</span></div></td>" +
            '<td class="num points">' + d.points + "</td>" +
            '<td class="num">' + d.wins + "</td>" +
            '<td class="num">' + (d.podiums != null ? d.podiums : 0) + "</td>" +
            "</tr>";
        }).join("") + "</tbody></table></div>";
    } else {
      el.innerHTML = '<div class="standings-scroll"><table><thead><tr>' +
        "<th>" + esc(I18n.t("th_pos")) + "</th>" +
        "<th>" + esc(I18n.t("th_team")) + "</th>" +
        '<th class="num">' + esc(I18n.t("th_wins")) + "</th>" +
        '<th class="num">' + esc(I18n.t("th_points")) + "</th>" +
        "</tr></thead><tbody>" +
        data.constructors.map(function (c) {
          var col = TC[c.name] || "#888";
          return "<tr>" +
            '<td class="' + posClass(c.pos) + '">' + c.pos + "</td>" +
            '<td><span class="team-pill"><span class="team-dot" style="background:' + col + '"></span><strong>' + esc(c.name) + "</strong></span></td>" +
            '<td class="num">' + c.wins + "</td>" +
            '<td class="num points">' + c.points + "</td>" +
            "</tr>";
        }).join("") + "</tbody></table></div>";
    }
  }

  function scrollCalendarToNext(container) {
    if (!container) return;
    var nextRow = container.querySelector(".cal-row.next");
    if (!nextRow) return;

    function align() {
      var cRect = container.getBoundingClientRect();
      var rRect = nextRow.getBoundingClientRect();
      container.scrollTop += (rRect.top + rRect.height / 2) - (cRect.top + cRect.height / 2);
    }

    align();
    requestAnimationFrame(align);
  }

  function renderCalendar() {
    var el = document.getElementById("raceCalendar");
    if (!el) return;
    var nextIdx = data.calendar.findIndex(function (r) { return r.next; });
    el.innerHTML = data.calendar.map(function (r, i) {
      var rowClass = "cal-row";
      if (r.next) rowClass += " next";
      else if (nextIdx >= 0 && i < nextIdx) rowClass += " past";
      return '<div class="' + rowClass + '"><div class="cal-round">R' + r.round + "</div><div><h3>" +
        esc(r.name) + (r.next ? '<span class="cal-badge">' + esc(I18n.t("cal_next")) + "</span>" : "") + '</h3><p class="meta">' + esc(r.circuit) +
        '</p></div><div class="cal-date">' + esc(r.date) + "</div></div>";
    }).join("");

    scrollCalendarToNext(el);
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();
      if (!name || !email || !message) {
        toast(I18n.t("toast_required"));
        return;
      }
      F1Data.saveContact({
        id: "msg-" + Date.now(),
        at: new Date().toISOString(),
        name: name,
        email: email,
        subject: subject || "(No subject)",
        message: message,
      });
      form.reset();
      toast(I18n.t("toast_thanks"));
    });
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 3000);
  }

  function initStandingsTabs() {
    document.querySelectorAll("[data-standings]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeStandings = btn.getAttribute("data-standings");
        document.querySelectorAll("[data-standings]").forEach(function (b) { b.classList.toggle("active", b === btn); });
        renderStandings();
      });
    });
  }

  function renderAll() {
    setToday();
    renderLead();
    renderHeadlines();
    renderNewsFilters();
    renderNewsGrid();
    renderStandings();
    renderCalendar();
  }

  function init() {
    data = F1Data.load();
    renderAll();
    initStandingsTabs();
    initContactForm();

    window.addEventListener("load", function () {
      scrollCalendarToNext(document.getElementById("raceCalendar"));
    }, { once: true });

    window.addEventListener("langchange", function () {
      renderLead();
      renderHeadlines();
      renderNewsGrid();
      renderStandings();
    });

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        window.location.href = "./admin.html";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      F1Data.whenReady(init);
    });
  } else {
    F1Data.whenReady(init);
  }
})();
