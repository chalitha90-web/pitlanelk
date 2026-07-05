/**
 * Default content for editable site pages (About, legal, Advertise)
 */
(function (global) {
  "use strict";

  global.F1PageDefaults = {
    social: {
      youtube: "https://www.youtube.com/",
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
    },
    pages: {
      about: {
        slug: "about",
        path: "./about.html",
        title: "About PITLANE LK",
        updated: "",
        intro:
          "**PITLANE LK** is an independent Formula 1-related news and information platform created especially for **Formula 1 fans in Sri Lanka** and Sri Lankan F1 supporters around the world.\n\n" +
          "Built from a genuine passion for Formula 1, PITLANE LK was created to bring the sport closer to the growing F1 community in Sri Lanka. This platform is for Sri Lankan fans who love racing, follow the teams and drivers, and want a dedicated space to stay updated with the world of Formula 1.\n\n" +
          "Our mission is to make Formula 1 easier, more exciting, and more accessible for fans in Sri Lanka. Through independent articles, commentary, race-weekend updates, championship information, season calendars, and statistics, PITLANE LK helps Sri Lankan F1 fans follow the sport in one simple place.\n\n" +
          "We also support both **English and Sinhala articles**, helping fans in Sri Lanka enjoy Formula 1-related content in the language they are most comfortable with.",
        sections: [
          {
            title: "What We Do",
            body:
              "PITLANE LK shares independent Formula 1-related news, commentary, race-weekend updates, championship information, team and driver stories, season calendars, and season statistics.\n\n" +
              "Our content is created for informational, editorial, commentary, and fan-community purposes. Whether you are a long-time Formula 1 follower or a new fan discovering the sport, PITLANE LK aims to make F1 easier to follow for the Sri Lankan community.",
          },
          {
            title: "Our Independence",
            body:
              "PITLANE LK is an independent platform and is **not affiliated with, endorsed by, sponsored by, or officially connected to Formula 1, Formula One Management, the FIA, or any Formula 1 team**.\n\n" +
              "All team names, driver names, race names, championship references, logos, images, and related Formula 1 references are used only for identification, news reporting, commentary, editorial, and informational purposes.\n\n" +
              "PITLANE LK does not claim ownership of any third-party trademarks, logos, images, or intellectual property belonging to Formula 1, the FIA, teams, drivers, sponsors, or other rights holders.",
          },
          {
            title: "Content Concerns",
            body:
              "PITLANE LK aims to respect the rights of Formula 1, the FIA, teams, drivers, photographers, media owners, sponsors, and all other rights holders.\n\n" +
              "If you believe that any content published on PITLANE LK infringes your rights, has been used incorrectly, or should be reviewed, please contact us through the {contact} form on our homepage.\n\n" +
              "We will review the matter and, where appropriate, update, credit, modify, or remove the relevant content.",
          },
        ],
      },
      disclaimer: {
        slug: "disclaimer",
        path: "./disclaimer.html",
        title: "Disclaimer",
        updated: "Last updated: June 2026",
        intro:
          "PITLANE LK is an independent Formula 1 news and information website. We are not affiliated with, endorsed by, or connected to Formula 1, the FIA, Formula One Management, Liberty Media, or any F1 team.\n\n" +
          "Formula 1, FIA Formula One World Championship, Grand Prix and related marks are trademarks of their respective owners. All team and driver names are used for identification and reporting purposes only.",
        sections: [
          {
            title: "Editorial content",
            body:
              "News, standings, and statistics on this site are for general information. While we aim to keep content accurate and up to date, we do not guarantee completeness or correctness. Always refer to official sources for confirmed results and regulations.",
          },
          {
            title: "No professional advice",
            body: "Nothing on this site constitutes professional, legal, or financial advice.",
          },
        ],
      },
      privacy: {
        slug: "privacy",
        path: "./privacy.html",
        title: "Privacy Policy",
        updated: "Last updated: June 2026",
        intro: 'PITLANE LK ("we", "us") respects your privacy. This policy explains what information we collect and how we use it.',
        sections: [
          {
            title: "Information we collect",
            body:
              "**Contact form:** If you use our Contact page, you may provide your name, email, subject, and message. This is stored locally in your browser (localStorage) on the device you use to submit the form.\n\n" +
              "**Site preferences:** Your article language choice (English / Sinhala) is saved in your browser so the site remembers your selection.\n\n" +
              "**Admin access:** If you use the private admin panel, a session flag is stored in your browser.",
          },
          {
            title: "How we use information",
            body:
              "Contact messages are intended for the site operator to read and respond. We do not sell personal data. We do not currently send data to a remote server as part of normal site operation.",
          },
          {
            title: "Third parties",
            body:
              "If we add analytics, advertising, or embedded content from third parties in future, this policy will be updated. Third-party services may collect data under their own policies.",
          },
          {
            title: "Your rights",
            body:
              "You can clear site data at any time by clearing your browser's local storage for this website. To ask about data we hold, contact us via the {contact} page.",
          },
          {
            title: "Contact",
            body:
              "Questions about this policy: use the contact form on our homepage or email the address listed on our Contact page.",
          },
        ],
      },
      cookies: {
        slug: "cookies",
        path: "./cookies.html",
        title: "Cookie Policy",
        updated: "Last updated: June 2026",
        intro: "This site uses minimal browser storage. We do not currently use advertising or analytics cookies.",
        sections: [
          {
            title: "What we use today",
            body:
              "**Local storage** — to save your language preference, site content (admin), and contact form messages in your browser. This is not a cookie but works similarly for storing small amounts of data on your device.",
          },
          {
            title: "Cookies",
            body:
              "We do not set marketing or tracking cookies at this time. If that changes (for example Google Analytics or ad partners), we will update this page and, where required, ask for your consent.",
          },
          {
            title: "Managing storage",
            body:
              "You can delete local storage and cookies through your browser settings. Clearing site data will reset language preference and any locally saved contact messages on your device.",
          },
          {
            title: "More information",
            body: "See our {privacy} for how we handle personal information.",
          },
        ],
      },
      advertise: {
        slug: "advertise",
        path: "./advertise.html",
        heroTitle: "Advertise on PITLANE LK",
        stats: [
          { value: "F1", label: "Dedicated audience" },
          { value: "EN + SI", label: "Bilingual readers" },
          { value: "24/7", label: "Always-on site" },
          { value: "GP", label: "Race-weekend packages" },
        ],
        placementsTitle: "Banner sizes & placements",
        placementsDesc: "Standard formats shown below — we supply the slots, you supply the creative (or we can help design).",
        packagesTitle: "Advertising packages",
        packagesDesc: "Flexible options for local brands, automotive, hospitality, and international partners targeting Sri Lankan F1 fans.",
        packages: [
          {
            name: "Pit Lane",
            price: "From LKR 15,000",
            period: "/ month",
            featured: false,
            features: [
              "Sidebar MPU on homepage",
              "Your logo + link",
              "Monthly impression report",
              "Ideal for local SMEs",
            ],
            cta: "Enquire",
          },
          {
            name: "Grand Prix",
            price: "From LKR 45,000",
            period: "/ race weekend",
            featured: true,
            features: [
              "Leaderboard on all pages",
              "Billboard on homepage",
              "Sponsored article slot",
              "Social mention (when live)",
              "Perfect for race-weekend campaigns",
            ],
            cta: "Book GP package",
          },
          {
            name: "Championship",
            price: "Custom",
            period: "/ season",
            featured: false,
            features: [
              "All placements included",
              "Title sponsor branding",
              "Exclusive category rights",
              "Custom landing page",
              "Priority on calendar events",
            ],
            cta: "Talk to us",
          },
        ],
        footerNote:
          "Ready to start? {contact} with your company name, preferred package, and campaign dates.",
      },
    },
  };
})(typeof window !== "undefined" ? window : this);
