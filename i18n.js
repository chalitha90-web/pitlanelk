/**
 * PITLANE LK — site UI (English) + article language toggle (EN / SI)
 */
(function (global) {
  "use strict";

  var LANG_KEY = "pitlanelk_lang";
  var ARTICLE_LANGS = { en: true, si: true };

  var CAT_KEYS = {
    All: "cat_all",
    Race: "cat_race",
    Technical: "cat_technical",
    Driver: "cat_driver",
    Business: "cat_business",
  };

  var STRINGS = {
    en: {
      siteBanner: "PITLANE LK · Round 9 — British GP this weekend",
      page_title: "PITLANE LK — F1 News & Standings",
      nav_news: "News",
      nav_standings: "Standings",
      nav_stats: "Stats",
      nav_calendar: "Calendar",
      nav_contact: "Contact",
      nav_about: "About Us",
      btn_contact: "Contact us",
      headlines_latest: "Latest",
      section_all_news: "All News",
      section_championship: "Championship Standings",
      tab_drivers: "Drivers",
      tab_constructors: "Constructors",
      section_season_stats: "Season Stats",
      section_stats_desc: "Key numbers after 8 rounds",
      section_calendar: "Race Calendar",
      section_calendar_desc: "Full 2026 season — scroll to browse all races",
      section_contact: "Contact us",
      section_contact_desc: "Questions, tips, or partnership enquiries — send us a message and we'll respond as soon as we can.",
      contact_perk_1: "Editorial tips & story leads",
      contact_perk_2: "Advertising & sponsorship",
      contact_perk_3: "General feedback",
      form_name: "Name *",
      form_email: "Email *",
      form_subject: "Subject",
      form_message: "Message *",
      form_subject_ph: "What is this about?",
      form_message_ph: "Your message…",
      btn_send: "Send message",
      footer_tagline: "Sri Lanka's home for F1 news and standings.",
      footer_disclaimer: "Not affiliated with Formula 1 or the FIA.",
      th_pos: "Pos",
      th_driver: "Driver",
      th_team: "Team",
      th_points: "Points",
      th_wins: "Wins",
      th_podiums: "Podiums",
      th_pts: "Pts",
      th_date: "Date",
      th_session: "Session",
      th_sl_time: "Sri Lanka Time",
      weekend_schedule_desc: "All session times shown in Sri Lanka time (UTC+5:30)",
      stat_leader: "Championship leader",
      stat_gap: "Gap to P2",
      stat_wins: "Most wins",
      stat_points: "points",
      stat_victories: "victories",
      stat_pts_abbr: "pts",
      cal_next: "Next",
      feature_badge: "Feature",
      cat_all: "All",
      cat_race: "Race",
      cat_technical: "Technical",
      cat_driver: "Driver",
      cat_business: "Business",
      toast_required: "Please fill in all required fields.",
      toast_thanks: "Thank you — we'll get back to you soon.",
      back_news: "← Back to news",
      loading_article: "Loading article…",
      article_not_found: "Article not found.",
      return_home: "Return home",
      footer_article_tagline: "F1 news & analysis from Sri Lanka",
      lang_aria: "Article language",
    },
  };

  function getLang() {
    var stored = localStorage.getItem(LANG_KEY);
    return ARTICLE_LANGS[stored] ? stored : "en";
  }

  function t(key) {
    return STRINGS.en[key] != null ? STRINGS.en[key] : key;
  }

  function catLabel(cat) {
    var key = CAT_KEYS[cat];
    return key ? t(key) : cat;
  }

  function seasonStatsLabels() {
    return null;
  }

  function dateLocale() {
    return "en-GB";
  }

  function updateLangBar() {
    var lang = getLang();
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.body.classList.toggle("lang-articles-si", lang === "si");
  }

  function applyPage() {
    document.documentElement.lang = "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    if (document.querySelector("[data-i18n-title]")) {
      document.title = t("page_title");
    }

    var bar = document.querySelector(".lang-bar");
    if (bar) bar.setAttribute("aria-label", t("lang_aria"));
    updateLangBar();
  }

  function setLang(lang) {
    if (!ARTICLE_LANGS[lang]) return;
    localStorage.setItem(LANG_KEY, lang);
    updateLangBar();
    global.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function initLangBar() {
    var bar = document.querySelector(".lang-bar");
    if (!bar) return;
    bar.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function init() {
    initLangBar();
    applyPage();
    if (global.F1TopStrip) global.F1TopStrip.refresh();
  }

  global.I18n = {
    getLang: getLang,
    setLang: setLang,
    t: t,
    catLabel: catLabel,
    seasonStatsLabels: seasonStatsLabels,
    dateLocale: dateLocale,
    applyPage: applyPage,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
