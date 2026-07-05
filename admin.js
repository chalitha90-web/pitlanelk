(function () {
  "use strict";

  var ADMIN_PASS = "f1insight2026";
  var data = null;
  var editingNewsId = null;
  var selectedWeekendIdx = 0;
  var editingPageSlug = "about";
  var pendingNewsImage = null;
  var newsImageRemoved = false;
  var pendingAdImages = {};
  var adImageRemoved = {};
  var MAX_NEWS_IMAGE_BYTES = 1572864;

  var PAGE_SLUGS = [
    { slug: "about", label: "About Us", path: "./about.html" },
    { slug: "disclaimer", label: "Disclaimer", path: "./disclaimer.html" },
    { slug: "privacy", label: "Privacy", path: "./privacy.html" },
    { slug: "cookies", label: "Cookies", path: "./cookies.html" },
    { slug: "advertise", label: "Advertise", path: "./advertise.html" },
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 2800);
  }

  function persist() {
    try {
      F1Data.save(data);
      toast("Saved");
    } catch (err) {
      toast(err && err.name === "QuotaExceededError" ? "Save failed — image may be too large for browser storage" : "Save failed");
    }
  }

  function showApp(on) {
    var login = document.getElementById("loginScreen");
    var app = document.getElementById("adminApp");
    if (!login || !app) return;

    if (on) {
      login.hidden = true;
      login.style.display = "none";
      app.hidden = false;
      app.style.display = "flex";
      try {
        data = F1Data.loadLocal();
        renderAll();
        showLoginError("");
      } catch (err) {
        console.error(err);
        if (typeof F1Data !== "undefined") F1Data.setAdminSession(false);
        login.hidden = false;
        login.style.display = "";
        app.hidden = true;
        app.style.display = "none";
        showLoginError("Could not load admin: " + err.message);
      }
    } else {
      login.hidden = false;
      login.style.display = "";
      app.hidden = true;
      app.style.display = "none";
    }
  }

  function switchPanel(id) {
    document.querySelectorAll(".admin-nav-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-panel") === id);
    });
    document.querySelectorAll(".admin-panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "panel-" + id);
    });
    if (id === "messages") renderMessages();
    if (id === "weekend") renderWeekendAdmin();
    if (id === "pages") renderPagesAdmin();
    if (id === "ads") renderAdsAdmin();
  }

  /* ——— News ——— */
  function renderNewsList() {
    var el = document.getElementById("newsList");
    if (!el || !data) return;
    if (!Array.isArray(data.news)) data.news = [];
    el.innerHTML = data.news.map(function (n) {
      return '<div class="admin-list-item"><div><strong>' + esc(n.title) + '</strong><div class="meta">' +
        esc(n.category) + " · " + esc(n.author) + (n.featured ? " · ★ Featured" : "") +
        (n.image ? " · 🖼 Image" : "") + "</div></div>" +
        '<div class="admin-list-actions"><button type="button" class="btn btn-sm" data-edit-news="' + n.id + '">Edit</button>' +
        '<button type="button" class="btn btn-sm" data-del-news="' + n.id + '">Delete</button></div></div>';
    }).join("");

    el.querySelectorAll("[data-edit-news]").forEach(function (btn) {
      btn.addEventListener("click", function () { openNewsForm(parseInt(btn.getAttribute("data-edit-news"), 10)); });
    });
    el.querySelectorAll("[data-del-news]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!confirm("Delete this article?")) return;
        var id = parseInt(btn.getAttribute("data-del-news"), 10);
        data.news = data.news.filter(function (n) { return n.id !== id; });
        persist();
        renderNewsList();
      });
    });
  }

  function populateCategorySelect() {
    var sel = document.getElementById("newsCategory");
    if (!sel) return;
    sel.innerHTML = (data.categories || []).map(function (c) {
      return '<option value="' + esc(c) + '">' + esc(c) + "</option>";
    }).join("");
  }

  function updateNewsImagePreview() {
    var wrap = document.getElementById("newsImagePreviewWrap");
    var img = document.getElementById("newsImagePreview");
    if (!wrap || !img) return;
    if (pendingNewsImage) {
      img.src = pendingNewsImage;
      wrap.hidden = false;
    } else {
      img.removeAttribute("src");
      wrap.hidden = true;
    }
  }

  function setPendingNewsImage(src) {
    pendingNewsImage = src || null;
    if (src) newsImageRemoved = false;
    updateNewsImagePreview();
  }

  function resetNewsImageFields(imageSrc) {
    pendingNewsImage = imageSrc || null;
    newsImageRemoved = false;
    var fileInput = document.getElementById("newsImageFile");
    var urlInput = document.getElementById("newsImageUrl");
    if (fileInput) fileInput.value = "";
    if (urlInput) urlInput.value = (imageSrc && /^https?:\/\//i.test(imageSrc)) ? imageSrc : "";
    updateNewsImagePreview();
  }

  function openNewsForm(id) {
    var form = document.getElementById("newsForm");
    var title = document.getElementById("newsFormTitle");
    editingNewsId = id || null;
    populateCategorySelect();

    if (id) {
      var n = data.news.find(function (x) { return x.id === id; });
      if (!n) return;
      title.textContent = "Edit article";
      document.getElementById("newsId").value = n.id;
      document.getElementById("newsTitle").value = n.title;
      document.getElementById("newsCategory").value = n.category;
      document.getElementById("newsAuthor").value = n.author;
      document.getElementById("newsTime").value = n.time || "";
      document.getElementById("newsExcerpt").value = n.excerpt;
      document.getElementById("newsBody").value = n.body || "";
      document.getElementById("newsTitleSi").value = (n.si && n.si.title) || "";
      document.getElementById("newsExcerptSi").value = (n.si && n.si.excerpt) || "";
      document.getElementById("newsBodySi").value = (n.si && n.si.body) || "";
      document.getElementById("newsFeatured").checked = !!n.featured;
      resetNewsImageFields(n.image || null);
    } else {
      title.textContent = "New article";
      form.reset();
      document.getElementById("newsId").value = "";
      document.getElementById("newsFeatured").checked = false;
      document.getElementById("newsTitleSi").value = "";
      document.getElementById("newsExcerptSi").value = "";
      document.getElementById("newsBodySi").value = "";
      resetNewsImageFields(null);
    }
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth" });
  }

  function closeNewsForm() {
    var form = document.getElementById("newsForm");
    if (form) form.hidden = true;
    editingNewsId = null;
    pendingNewsImage = null;
    newsImageRemoved = false;
  }

  function resolveNewsImageOnSave(prev) {
    var urlInput = document.getElementById("newsImageUrl");
    var urlVal = urlInput ? urlInput.value.trim() : "";
    if (pendingNewsImage) return pendingNewsImage;
    if (urlVal) return urlVal;
    if (newsImageRemoved) return "";
    return prev && prev.image ? prev.image : "";
  }

  /* ——— Standings ——— */
  function renderStandingsAdmin() {
    var dEl = document.getElementById("driversAdmin");
    var cEl = document.getElementById("constructorsAdmin");
    if (!dEl || !cEl || !data) return;

    if (!Array.isArray(data.drivers)) data.drivers = [];
    if (!Array.isArray(data.constructors)) data.constructors = [];
    dEl.innerHTML = data.drivers.map(function (d, i) {
      return '<div class="row-editor" data-driver="' + i + '">' +
        '<input type="number" class="pos" value="' + d.pos + '" min="1" />' +
        '<input type="text" class="name" value="' + esc(d.name) + '" />' +
        '<input type="text" class="team" value="' + esc(d.team) + '" />' +
        '<input type="text" class="nat" value="' + esc(d.nationality || "") + '" maxlength="2" placeholder="IT" title="Nationality (2-letter code)" />' +
        '<input type="number" class="wins" value="' + (d.wins != null ? d.wins : 0) + '" min="0" />' +
        '<input type="number" class="podiums" value="' + (d.podiums != null ? d.podiums : 0) + '" min="0" />' +
        '<input type="number" class="points" value="' + d.points + '" min="0" />' +
        '<button type="button" data-rm-driver="' + i + '">×</button></div>';
    }).join("");

    cEl.innerHTML = data.constructors.map(function (c, i) {
      return '<div class="row-editor constructors" data-constructor="' + i + '">' +
        '<input type="number" class="pos" value="' + c.pos + '" min="1" />' +
        '<input type="text" class="name" value="' + esc(c.name) + '" />' +
        '<input type="number" class="wins" value="' + c.wins + '" min="0" />' +
        '<input type="number" class="points" value="' + c.points + '" min="0" />' +
        '<button type="button" data-rm-constructor="' + i + '">×</button></div>';
    }).join("");

    dEl.querySelectorAll("[data-rm-driver]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        data.drivers.splice(parseInt(btn.getAttribute("data-rm-driver"), 10), 1);
        renderStandingsAdmin();
      });
    });
    cEl.querySelectorAll("[data-rm-constructor]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        data.constructors.splice(parseInt(btn.getAttribute("data-rm-constructor"), 10), 1);
        renderStandingsAdmin();
      });
    });
  }

  function collectStandings() {
    data.drivers = Array.prototype.map.call(document.querySelectorAll("[data-driver]"), function (row) {
      return {
        pos: parseInt(row.querySelector(".pos").value, 10) || 1,
        name: row.querySelector(".name").value.trim(),
        team: row.querySelector(".team").value.trim(),
        nationality: row.querySelector(".nat").value.trim().toUpperCase(),
        wins: parseInt(row.querySelector(".wins").value, 10) || 0,
        podiums: parseInt(row.querySelector(".podiums").value, 10) || 0,
        points: parseInt(row.querySelector(".points").value, 10) || 0,
      };
    });
    data.constructors = Array.prototype.map.call(document.querySelectorAll("[data-constructor]"), function (row) {
      return {
        pos: parseInt(row.querySelector(".pos").value, 10) || 1,
        name: row.querySelector(".name").value.trim(),
        wins: parseInt(row.querySelector(".wins").value, 10) || 0,
        points: parseInt(row.querySelector(".points").value, 10) || 0,
      };
    });
    data.drivers.sort(function (a, b) { return a.pos - b.pos; });
    data.constructors.sort(function (a, b) { return a.pos - b.pos; });
    persist();
  }

  /* ——— Stats ——— */
  function renderStatsAdmin() {
    var el = document.getElementById("statsAdmin");
    if (!el || !data) return;
    if (!Array.isArray(data.seasonStats)) data.seasonStats = [];
    el.innerHTML = data.seasonStats.map(function (s, i) {
      return '<div class="stat-row" data-stat="' + i + '">' +
        '<label>Value<input type="text" class="value" value="' + esc(s.value) + '" /></label>' +
        '<label>Label<input type="text" class="label" value="' + esc(s.label) + '" /></label>' +
        '<label>Subtext<input type="text" class="sub" value="' + esc(s.sub || "") + '" /></label>' +
        '<button type="button" class="btn btn-sm" data-rm-stat="' + i + '">Remove</button></div>';
    }).join("");
    el.querySelectorAll("[data-rm-stat]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        data.seasonStats.splice(parseInt(btn.getAttribute("data-rm-stat"), 10), 1);
        renderStatsAdmin();
      });
    });
  }

  function collectStats() {
    data.seasonStats = Array.prototype.map.call(document.querySelectorAll("[data-stat]"), function (row) {
      return {
        value: row.querySelector(".value").value.trim(),
        label: row.querySelector(".label").value.trim(),
        sub: row.querySelector(".sub").value.trim(),
      };
    });
    persist();
  }

  /* ——— Calendar ——— */
  function renderCalendarAdmin() {
    var el = document.getElementById("calendarAdmin");
    if (!el || !data) return;
    if (!Array.isArray(data.calendar)) data.calendar = [];
    el.innerHTML = data.calendar.map(function (r, i) {
      return '<div class="race-row" data-race="' + i + '">' +
        '<label>Round<input type="number" class="round" value="' + r.round + '" /></label>' +
        '<label>Name<input type="text" class="name" value="' + esc(r.name) + '" /></label>' +
        '<label>Circuit<input type="text" class="circuit" value="' + esc(r.circuit) + '" /></label>' +
        '<label>Date<input type="text" class="date" value="' + esc(r.date) + '" /></label>' +
        '<label class="check-row"><input type="checkbox" class="next"' + (r.next ? " checked" : "") + ' /> Next</label>' +
        '<button type="button" class="btn btn-sm" data-rm-race="' + i + '">Remove</button></div>';
    }).join("");
    el.querySelectorAll("[data-rm-race]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        data.calendar.splice(parseInt(btn.getAttribute("data-rm-race"), 10), 1);
        renderCalendarAdmin();
      });
    });
  }

  function collectCalendar() {
    data.calendar = Array.prototype.map.call(document.querySelectorAll("[data-race]"), function (row, i) {
      var prev = data.calendar[i] || {};
      return {
        round: parseInt(row.querySelector(".round").value, 10) || 1,
        name: row.querySelector(".name").value.trim(),
        circuit: row.querySelector(".circuit").value.trim(),
        date: row.querySelector(".date").value.trim(),
        next: row.querySelector(".next").checked,
        sprint: prev.sprint === true,
        sessions: prev.sessions,
      };
    });
    if (data.calendar.filter(function (r) { return r.next; }).length > 1) {
      var found = false;
      data.calendar.forEach(function (r) {
        if (r.next && !found) found = true;
        else r.next = false;
      });
    }
    persist();
  }

  /* ——— Weekend times ——— */
  function readWeekendFormSessions(race) {
    return Array.prototype.map.call(document.querySelectorAll(".session-row"), function (row) {
      var i = parseInt(row.getAttribute("data-session"), 10);
      var label = race.sessions[i] ? race.sessions[i].label : "";
      var date = row.querySelector(".session-date").value;
      var time = row.querySelector(".session-time").value;
      var endTime = row.querySelector(".session-end-time").value;
      return {
        label: label,
        start: date && time ? F1Data.slToIso(date, time) : "",
        end: date && endTime ? F1Data.slToIso(date, endTime) : "",
      };
    });
  }

  function updateWeekendPreview() {
    var preview = document.getElementById("weekendPreview");
    if (!preview || !data) return;
    var idx = parseInt((document.getElementById("weekendRaceSelect") || {}).value || "0", 10);
    var race = data.calendar[idx];
    if (!race) {
      preview.textContent = "";
      return;
    }
    var draft = Object.assign({}, race, { sessions: readWeekendFormSessions(race) });
    var text = F1Data.formatRaceWeekendSl(draft);
    preview.textContent = text ? "Banner preview: " + text : "Banner preview: (add at least one session time)";
  }

  function renderWeekendAdmin() {
    var sel = document.getElementById("weekendRaceSelect");
    var container = document.getElementById("weekendSessionsAdmin");
    if (!sel || !container || !data) return;
    if (!Array.isArray(data.calendar)) data.calendar = [];
    if (selectedWeekendIdx >= data.calendar.length) selectedWeekendIdx = 0;

    sel.innerHTML = data.calendar.map(function (r, i) {
      return '<option value="' + i + '">R' + r.round + " — " + esc(r.name) + (r.next ? " (Next)" : "") + "</option>";
    }).join("");
    if (!data.calendar.length) {
      container.innerHTML = '<p class="section-desc">Add races on the Calendar tab first.</p>';
      updateWeekendPreview();
      return;
    }
    sel.value = String(selectedWeekendIdx);

    var race = data.calendar[selectedWeekendIdx];
    F1Data.normalizeRaceWeekend(race);

    document.querySelectorAll('input[name="weekendFormat"]').forEach(function (radio) {
      radio.checked = (radio.value === "sprint") === !!race.sprint;
    });

    container.innerHTML = race.sessions.map(function (s, i) {
      var parts = s.start ? F1Data.isoToSlParts(s.start) : { date: "", time: "" };
      var endParts = s.end ? F1Data.isoToSlParts(s.end) : { date: "", time: "" };
      return '<div class="session-row" data-session="' + i + '">' +
        '<span class="session-label">' + esc(s.label) + "</span>" +
        '<label>Date<input type="date" class="session-date" value="' + esc(parts.date) + '" /></label>' +
        '<label>Start (SL)<input type="time" class="session-time" value="' + esc(parts.time) + '" step="60" /></label>' +
        '<label>End (SL)<input type="time" class="session-end-time" value="' + esc(endParts.time) + '" step="60" /></label>' +
        "</div>";
    }).join("");

    updateWeekendPreview();
  }

  function applyWeekendFormatChange() {
    var sel = document.getElementById("weekendRaceSelect");
    if (!sel || !data) return;
    var idx = parseInt(sel.value, 10);
    var race = data.calendar[idx];
    if (!race) return;
    var sprint = document.querySelector('input[name="weekendFormat"]:checked').value === "sprint";
    var current = readWeekendFormSessions(race);
    race.sprint = sprint;
    race.sessions = F1Data.buildSessionsFromFormat(sprint, current);
    selectedWeekendIdx = idx;
    renderWeekendAdmin();
  }

  function collectWeekend() {
    var sel = document.getElementById("weekendRaceSelect");
    if (!sel || !data) return;
    var idx = parseInt(sel.value, 10);
    var race = data.calendar[idx];
    if (!race) return;
    race.sprint = document.querySelector('input[name="weekendFormat"]:checked').value === "sprint";
    race.sessions = readWeekendFormSessions(race);
    selectedWeekendIdx = idx;
    persist();
    renderWeekendAdmin();
  }

  /* ——— Messages ——— */
  function renderMessages() {
    var el = document.getElementById("messagesList");
    var msgs = F1Data.loadContacts();
    if (!msgs.length) {
      el.innerHTML = '<p class="section-desc">No messages yet.</p>';
      return;
    }
    el.innerHTML = msgs.map(function (m) {
      var when = new Date(m.at).toLocaleString("en-GB");
      return '<div class="msg-card"><div class="msg-head"><span>' + esc(when) + '</span><span>' + esc(m.email) + '</span></div>' +
        '<strong>' + esc(m.name) + " — " + esc(m.subject) + "</strong>" +
        "<p>" + esc(m.message) + "</p></div>";
    }).join("");
  }

  /* ——— Site pages ——— */
  function ensurePagesData() {
    if (!data.pages || typeof data.pages !== "object") data.pages = {};
    if (!data.social || typeof data.social !== "object") data.social = F1Data.getSocial();
    PAGE_SLUGS.forEach(function (meta) {
      if (!data.pages[meta.slug] && F1PageDefaults && F1PageDefaults.pages && F1PageDefaults.pages[meta.slug]) {
        data.pages[meta.slug] = JSON.parse(JSON.stringify(F1PageDefaults.pages[meta.slug]));
      }
    });
  }

  function renderPageSlugTabs() {
    var el = document.getElementById("pageSlugTabs");
    if (!el) return;
    el.innerHTML = PAGE_SLUGS.map(function (meta) {
      return '<button type="button" class="filter-tab' + (editingPageSlug === meta.slug ? " active" : "") +
        '" data-page-slug="' + esc(meta.slug) + '">' + esc(meta.label) + "</button>";
    }).join("");
    el.querySelectorAll("[data-page-slug]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        editingPageSlug = btn.getAttribute("data-page-slug");
        renderPagesAdmin();
      });
    });
  }

  function renderPageSectionsEditor(sections) {
    var el = document.getElementById("pageSections");
    if (!el) return;
    el.innerHTML = (sections || []).map(function (sec, i) {
      return '<div class="page-section-row" data-section-idx="' + i + '">' +
        '<label>Section heading<input type="text" class="page-sec-title" value="' + esc(sec.title || "") + '" placeholder="Optional heading" /></label>' +
        '<label>Section body<textarea class="page-sec-body" rows="4">' + esc(sec.body || "") + "</textarea></label>" +
        '<button type="button" class="btn btn-sm page-sec-remove">Remove section</button></div>';
    }).join("");
    el.querySelectorAll(".page-sec-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".page-section-row").remove();
      });
    });
  }

  function renderAdvertiseEditor(page) {
    var wrap = document.getElementById("advertisePageFields");
    if (!wrap) return;
    wrap.hidden = false;
    document.getElementById("legalPageFields").hidden = true;

    document.getElementById("advHeroTitle").value = page.heroTitle || "";
    document.getElementById("advPlacementsTitle").value = page.placementsTitle || "";
    document.getElementById("advPlacementsDesc").value = page.placementsDesc || "";
    document.getElementById("advPackagesTitle").value = page.packagesTitle || "";
    document.getElementById("advPackagesDesc").value = page.packagesDesc || "";
    document.getElementById("advFooterNote").value = page.footerNote || "";

    var statsEl = document.getElementById("advStatsFields");
    statsEl.innerHTML = (page.stats || []).map(function (s, i) {
      return '<div class="form-grid adv-stat-row"><label>Stat ' + (i + 1) + ' value<input type="text" class="adv-stat-value" value="' + esc(s.value) + '" /></label>' +
        '<label>Stat ' + (i + 1) + ' label<input type="text" class="adv-stat-label" value="' + esc(s.label) + '" /></label></div>';
    }).join("");

    var pkgEl = document.getElementById("advPackagesFields");
    pkgEl.innerHTML = (page.packages || []).map(function (pkg, i) {
      return '<fieldset class="lang-fields adv-pkg-row"><legend>Package ' + (i + 1) + "</legend>" +
        '<div class="form-grid">' +
        '<label>Name<input type="text" class="adv-pkg-name" value="' + esc(pkg.name) + '" /></label>' +
        '<label>Price<input type="text" class="adv-pkg-price" value="' + esc(pkg.price) + '" /></label>' +
        '<label>Period<input type="text" class="adv-pkg-period" value="' + esc(pkg.period || "") + '" /></label>' +
        '<label class="check-row"><input type="checkbox" class="adv-pkg-featured"' + (pkg.featured ? " checked" : "") + " /> Featured package</label>" +
        "</div>" +
        '<label>Features (one per line)<textarea class="adv-pkg-features" rows="4">' + esc((pkg.features || []).join("\n")) + "</textarea></label>" +
        '<label>Button text<input type="text" class="adv-pkg-cta" value="' + esc(pkg.cta || "Enquire") + '" /></label></fieldset>';
    }).join("");
  }

  function renderLegalPageEditor(page) {
    var adv = document.getElementById("advertisePageFields");
    var legal = document.getElementById("legalPageFields");
    if (adv) adv.hidden = true;
    if (legal) legal.hidden = false;

    document.getElementById("pageTitle").value = page.title || "";
    document.getElementById("pageUpdated").value = page.updated || "";
    document.getElementById("pageIntro").value = page.intro || "";
    renderPageSectionsEditor(page.sections || []);
  }

  function renderPagesAdmin() {
    ensurePagesData();
    renderPageSlugTabs();
    var meta = PAGE_SLUGS.find(function (m) { return m.slug === editingPageSlug; }) || PAGE_SLUGS[0];
    var page = data.pages[meta.slug];
    var preview = document.getElementById("pagePreviewLink");
    if (preview) {
      preview.href = meta.path;
      preview.textContent = "View " + meta.label + " live →";
    }
    if (meta.slug === "advertise") renderAdvertiseEditor(page);
    else renderLegalPageEditor(page);
  }

  function collectLegalPageForm() {
    var sections = Array.prototype.map.call(document.querySelectorAll(".page-section-row"), function (row) {
      return {
        title: row.querySelector(".page-sec-title").value.trim(),
        body: row.querySelector(".page-sec-body").value.trim(),
      };
    });
    return {
      slug: editingPageSlug,
      path: (PAGE_SLUGS.find(function (m) { return m.slug === editingPageSlug; }) || {}).path,
      title: document.getElementById("pageTitle").value.trim(),
      updated: document.getElementById("pageUpdated").value.trim(),
      intro: document.getElementById("pageIntro").value.trim(),
      sections: sections,
    };
  }

  function collectAdvertisePageForm() {
    var stats = Array.prototype.map.call(document.querySelectorAll(".adv-stat-row"), function (row) {
      return {
        value: row.querySelector(".adv-stat-value").value.trim(),
        label: row.querySelector(".adv-stat-label").value.trim(),
      };
    });
    var packages = Array.prototype.map.call(document.querySelectorAll(".adv-pkg-row"), function (row) {
      return {
        name: row.querySelector(".adv-pkg-name").value.trim(),
        price: row.querySelector(".adv-pkg-price").value.trim(),
        period: row.querySelector(".adv-pkg-period").value.trim(),
        featured: row.querySelector(".adv-pkg-featured").checked,
        features: row.querySelector(".adv-pkg-features").value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean),
        cta: row.querySelector(".adv-pkg-cta").value.trim() || "Enquire",
      };
    });
    return {
      slug: "advertise",
      path: "./advertise.html",
      heroTitle: document.getElementById("advHeroTitle").value.trim(),
      stats: stats,
      placementsTitle: document.getElementById("advPlacementsTitle").value.trim(),
      placementsDesc: document.getElementById("advPlacementsDesc").value.trim(),
      packagesTitle: document.getElementById("advPackagesTitle").value.trim(),
      packagesDesc: document.getElementById("advPackagesDesc").value.trim(),
      packages: packages,
      footerNote: document.getElementById("advFooterNote").value.trim(),
    };
  }

  function saveCurrentPage() {
    ensurePagesData();
    if (editingPageSlug === "advertise") data.pages.advertise = collectAdvertisePageForm();
    else data.pages[editingPageSlug] = collectLegalPageForm();
    persist();
    renderPagesAdmin();
  }

  /* ——— Advertisements ——— */
  function ensureAdsData() {
    if (!data.ads || typeof data.ads !== "object") data.ads = {};
    Object.keys(F1Data.AD_SLOTS).forEach(function (key) {
      if (!data.ads[key]) data.ads[key] = { image: "", href: "", alt: "", enabled: false };
    });
  }

  function adPreviewSrc(key) {
    if (adImageRemoved[key]) return "";
    if (Object.prototype.hasOwnProperty.call(pendingAdImages, key)) return pendingAdImages[key] || "";
    return (data.ads[key] && data.ads[key].image) || "";
  }

  function renderAdsAdmin() {
    var el = document.getElementById("adsAdmin");
    if (!el || !data) return;
    ensureAdsData();

    el.innerHTML = Object.keys(F1Data.AD_SLOTS).map(function (key) {
      var meta = F1Data.AD_SLOTS[key];
      var ad = data.ads[key] || {};
      var src = adPreviewSrc(key);
      var urlVal = (Object.prototype.hasOwnProperty.call(pendingAdImages, key) && pendingAdImages[key] && /^https?:\/\//i.test(pendingAdImages[key]))
        ? pendingAdImages[key]
        : ((ad.image && /^https?:\/\//i.test(ad.image)) ? ad.image : "");
      return '<article class="ad-slot-card" data-ad-slot-admin="' + esc(key) + '">' +
        '<div class="ad-slot-head">' +
          "<div><strong>" + esc(meta.label) + "</strong>" +
          '<span class="meta">' + esc(meta.size) + " · " + esc(meta.pages) + "</span></div>" +
          '<label class="check-row ad-slot-toggle"><input type="checkbox" class="ad-enabled" ' + (ad.enabled ? "checked" : "") + " /> Live on site</label>" +
        "</div>" +
        '<div class="form-grid">' +
          '<label>Upload image<input type="file" class="ad-file" accept="image/png,image/jpeg,image/webp,image/gif" data-ad-key="' + esc(key) + '" /></label>' +
          '<label>Or image URL<input type="url" class="ad-url" value="' + esc(urlVal) + '" placeholder="https://example.com/banner.jpg" data-ad-key="' + esc(key) + '" /></label>' +
          '<label>Click-through URL<input type="url" class="ad-href" value="' + esc(ad.href || "") + '" placeholder="https://sponsor.com" /></label>' +
          '<label>Alt text<input type="text" class="ad-alt" value="' + esc(ad.alt || "") + '" placeholder="Advertisement" /></label>' +
        "</div>" +
        (src
          ? '<div class="ad-slot-preview"><img src="' + esc(src) + '" alt="Preview" /><button type="button" class="btn btn-sm ad-remove" data-ad-key="' + esc(key) + '">Remove image</button></div>'
          : '<p class="section-desc ad-slot-empty">No image — default house ad will show.</p>') +
        "</article>";
    }).join("");

    el.querySelectorAll(".ad-file").forEach(function (input) {
      input.addEventListener("change", function (e) {
        var key = input.getAttribute("data-ad-key");
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!/^image\//i.test(file.type)) {
          toast("Please choose an image file");
          e.target.value = "";
          return;
        }
        if (file.size > MAX_NEWS_IMAGE_BYTES) {
          toast("Image too large — max 1.5 MB");
          e.target.value = "";
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          pendingAdImages[key] = reader.result;
          delete adImageRemoved[key];
          var urlInput = el.querySelector('.ad-url[data-ad-key="' + key + '"]');
          if (urlInput) urlInput.value = "";
          renderAdsAdmin();
        };
        reader.readAsDataURL(file);
      });
    });

    el.querySelectorAll(".ad-url").forEach(function (input) {
      input.addEventListener("change", function () {
        var key = input.getAttribute("data-ad-key");
        var val = input.value.trim();
        if (!val) return;
        pendingAdImages[key] = val;
        delete adImageRemoved[key];
        var fileInput = el.querySelector('.ad-file[data-ad-key="' + key + '"]');
        if (fileInput) fileInput.value = "";
        renderAdsAdmin();
      });
    });

    el.querySelectorAll(".ad-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-ad-key");
        pendingAdImages[key] = "";
        adImageRemoved[key] = true;
        renderAdsAdmin();
      });
    });
  }

  function collectAds() {
    ensureAdsData();
    Object.keys(F1Data.AD_SLOTS).forEach(function (key) {
      var row = document.querySelector('[data-ad-slot-admin="' + key + '"]');
      if (!row) return;
      var enabled = row.querySelector(".ad-enabled").checked;
      var href = row.querySelector(".ad-href").value.trim();
      var alt = row.querySelector(".ad-alt").value.trim();
      var urlVal = row.querySelector(".ad-url").value.trim();
      var image = (data.ads[key] && data.ads[key].image) || "";

      if (adImageRemoved[key]) image = "";
      else if (Object.prototype.hasOwnProperty.call(pendingAdImages, key)) image = pendingAdImages[key] || "";
      else if (urlVal) image = urlVal;

      data.ads[key] = {
        enabled: enabled && !!image,
        href: href,
        alt: alt,
        image: image,
      };
    });
    pendingAdImages = {};
    adImageRemoved = {};
    persist();
    renderAdsAdmin();
  }

  /* ——— Settings ——— */
  function renderSettings() {
    var banner = document.getElementById("settingsBanner");
    var cats = document.getElementById("siteCategories");
    var yt = document.getElementById("socialYoutube");
    var fb = document.getElementById("socialFacebook");
    var ig = document.getElementById("socialInstagram");
    if (!data) return;
    if (banner) banner.value = data.siteBanner || "";
    if (cats) cats.value = (data.categories || []).join(", ");
    ensurePagesData();
    if (yt) yt.value = (data.social && data.social.youtube) || "";
    if (fb) fb.value = (data.social && data.social.facebook) || "";
    if (ig) ig.value = (data.social && data.social.instagram) || "";
  }

  function renderAll() {
    if (!data) data = F1Data.loadLocal();
    if (!validateAdminData(data)) {
      data = F1Data.reset();
      toast("Data was repaired — using demo defaults");
    }
    renderNewsList();
    renderStandingsAdmin();
    renderStatsAdmin();
    renderCalendarAdmin();
    renderWeekendAdmin();
    renderPagesAdmin();
    renderAdsAdmin();
    renderSettings();
    closeNewsForm();
  }

  function validateAdminData(d) {
    return d && Array.isArray(d.news) && Array.isArray(d.drivers) &&
      Array.isArray(d.constructors) && Array.isArray(d.calendar) &&
      Array.isArray(d.seasonStats);
  }

  function showLoginError(msg) {
    var el = document.getElementById("loginError");
    if (!el) return;
    el.textContent = msg;
    el.hidden = !msg;
  }

  function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof F1Data === "undefined") {
      showLoginError("Site data failed to load. Refresh the page.");
      return;
    }
    var pass = (document.getElementById("adminPass").value || "").replace(/\s/g, "");
    if (pass === ADMIN_PASS || pass === "pitlanelk2026") {
      showLoginError("");
      F1Data.setAdminSession(true);
      showApp(true);
    } else {
      showLoginError("Wrong password. Use: f1insight2026");
    }
  }

  function wireAdminPanel() {
    document.getElementById("btnLogout").addEventListener("click", function () {
      F1Data.setAdminSession(false);
      showApp(false);
      document.getElementById("adminPass").value = "";
    });

    document.getElementById("btnResetData").addEventListener("click", function () {
      if (!confirm("Reset all site content to demo defaults?")) return;
      data = F1Data.reset();
      renderAll();
      toast("Demo data restored");
    });

    document.querySelectorAll(".admin-nav-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { switchPanel(btn.getAttribute("data-panel")); });
    });

    document.getElementById("btnAddNews").addEventListener("click", function () { openNewsForm(null); });
    document.getElementById("newsFormCancel").addEventListener("click", closeNewsForm);

    document.getElementById("newsImageFile").addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!/^image\//i.test(file.type)) {
        toast("Please choose an image file");
        e.target.value = "";
        return;
      }
      if (file.size > MAX_NEWS_IMAGE_BYTES) {
        toast("Image too large — max 1.5 MB");
        e.target.value = "";
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        setPendingNewsImage(reader.result);
        var urlInput = document.getElementById("newsImageUrl");
        if (urlInput) urlInput.value = "";
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("newsImageUrl").addEventListener("change", function () {
      var val = this.value.trim();
      if (!val) return;
      setPendingNewsImage(val);
      var fileInput = document.getElementById("newsImageFile");
      if (fileInput) fileInput.value = "";
    });

    document.getElementById("newsImageRemove").addEventListener("click", function () {
      pendingNewsImage = null;
      newsImageRemoved = true;
      var fileInput = document.getElementById("newsImageFile");
      var urlInput = document.getElementById("newsImageUrl");
      if (fileInput) fileInput.value = "";
      if (urlInput) urlInput.value = "";
      updateNewsImagePreview();
    });

    document.getElementById("newsForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var prev = editingNewsId ? data.news.find(function (n) { return n.id === editingNewsId; }) : null;
      var payload = {
        title: document.getElementById("newsTitle").value.trim(),
        category: document.getElementById("newsCategory").value,
        author: document.getElementById("newsAuthor").value.trim(),
        time: document.getElementById("newsTime").value.trim() || "Just now",
        excerpt: document.getElementById("newsExcerpt").value.trim(),
        body: document.getElementById("newsBody").value.trim(),
        featured: document.getElementById("newsFeatured").checked,
        thumb: (prev && prev.thumb) ? prev.thumb.slice() : ["#f3f4f6", "#e5e7eb"],
      };
      var imageVal = resolveNewsImageOnSave(prev);
      if (imageVal) payload.image = imageVal;
      var siTitle = document.getElementById("newsTitleSi").value.trim();
      var siExcerpt = document.getElementById("newsExcerptSi").value.trim();
      var siBody = document.getElementById("newsBodySi").value.trim();
      if (siTitle || siExcerpt || siBody) {
        payload.si = { title: siTitle, excerpt: siExcerpt, body: siBody };
      }
      if (payload.featured) {
        data.news.forEach(function (n) { n.featured = false; });
      }
      if (editingNewsId) {
        var idx = data.news.findIndex(function (n) { return n.id === editingNewsId; });
        if (idx >= 0) {
          var prevRow = data.news[idx];
          data.news[idx] = Object.assign({}, prevRow, payload);
          if (!imageVal) delete data.news[idx].image;
          if (!payload.si) delete data.news[idx].si;
        }
      } else {
        payload.id = F1Data.nextNewsId(data.news);
        data.news.unshift(payload);
      }
      persist();
      renderNewsList();
      closeNewsForm();
    });

    document.getElementById("btnAddDriver").addEventListener("click", function () {
      data.drivers.push({ pos: data.drivers.length + 1, name: "New Driver", team: "McLaren", nationality: "GB", points: 0, wins: 0, podiums: 0 });
      renderStandingsAdmin();
    });
    document.getElementById("btnAddConstructor").addEventListener("click", function () {
      data.constructors.push({ pos: data.constructors.length + 1, name: "New Team", points: 0, wins: 0 });
      renderStandingsAdmin();
    });
    document.getElementById("btnSaveStandings").addEventListener("click", collectStandings);

    document.getElementById("btnAddStat").addEventListener("click", function () {
      data.seasonStats.push({ value: "0", label: "New stat", sub: "" });
      renderStatsAdmin();
    });
    document.getElementById("btnSaveStats").addEventListener("click", collectStats);

    document.getElementById("btnAddRace").addEventListener("click", function () {
      data.calendar.push({
        round: data.calendar.length + 1,
        name: "New Grand Prix",
        circuit: "Circuit",
        date: "TBC",
        next: false,
        sprint: false,
        sessions: F1Data.buildSessionsFromFormat(false, []),
      });
      renderCalendarAdmin();
    });
    document.getElementById("btnSaveCalendar").addEventListener("click", function () {
      collectCalendar();
      renderWeekendAdmin();
    });

    var weekendSessions = document.getElementById("weekendSessionsAdmin");
    var weekendSelect = document.getElementById("weekendRaceSelect");
    if (weekendSelect) {
      weekendSelect.addEventListener("change", function () {
        selectedWeekendIdx = parseInt(weekendSelect.value, 10);
        renderWeekendAdmin();
      });
    }
    document.querySelectorAll('input[name="weekendFormat"]').forEach(function (radio) {
      radio.addEventListener("change", applyWeekendFormatChange);
    });
    if (weekendSessions) {
      weekendSessions.addEventListener("input", updateWeekendPreview);
    }
    document.getElementById("btnSaveWeekend").addEventListener("click", collectWeekend);
    document.getElementById("btnSaveAds").addEventListener("click", collectAds);

    document.getElementById("settingsForm").addEventListener("submit", function (e) {
      e.preventDefault();
      data.siteBanner = document.getElementById("settingsBanner").value.trim();
      data.categories = document.getElementById("siteCategories").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      ensurePagesData();
      data.social = {
        youtube: document.getElementById("socialYoutube").value.trim(),
        facebook: document.getElementById("socialFacebook").value.trim(),
        instagram: document.getElementById("socialInstagram").value.trim(),
      };
      persist();
      renderSettings();
    });

    document.getElementById("btnExportSiteData").addEventListener("click", function () {
      if (!data) data = F1Data.loadLocal();
      var payload = F1Data.exportSiteData(data);
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "site-data.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      toast("Downloaded site-data.json — commit it to GitHub next to index.html (with assets/logo.png)");
    });

    document.getElementById("pageForm").addEventListener("submit", function (e) {
      e.preventDefault();
      saveCurrentPage();
    });
    document.getElementById("btnAddPageSection").addEventListener("click", function () {
      var el = document.getElementById("pageSections");
      if (!el) return;
      var row = document.createElement("div");
      row.className = "page-section-row";
      row.innerHTML =
        '<label>Section heading<input type="text" class="page-sec-title" placeholder="Optional heading" /></label>' +
        '<label>Section body<textarea class="page-sec-body" rows="4"></textarea></label>' +
        '<button type="button" class="btn btn-sm page-sec-remove">Remove section</button>';
      el.appendChild(row);
      row.querySelector(".page-sec-remove").addEventListener("click", function () { row.remove(); });
    });

    if (F1Data.isAdminSession()) showApp(true);
  }

  function init() {
    var form = document.getElementById("loginForm");
    var btn = document.getElementById("btnSignIn");
    if (!form) return;

    form.addEventListener("submit", handleLogin);
    if (btn) btn.addEventListener("click", handleLogin);
    var passInput = document.getElementById("adminPass");
    if (passInput) {
      passInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          handleLogin(e);
        }
      });
    }

    if (typeof F1Data === "undefined") {
      showLoginError("Site data failed to load. Refresh the page.");
      return;
    }

    try {
      wireAdminPanel();
    } catch (err) {
      showLoginError("Admin failed to start: " + err.message);
      console.error(err);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
