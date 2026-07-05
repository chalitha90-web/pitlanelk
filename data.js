/**
 * PITLANE LK — shared data layer (localStorage)
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "f1insight_site_v2";
  var CONTACT_KEY = "f1insight_contact_v1";
  var ADMIN_SESSION_KEY = "f1insight_admin_session";
  var STANDINGS_VERSION = 4;
  var CALENDAR_SESSIONS_VERSION = 1;

  /** Sinhala article text — managed in Admin under each article */
  var SI_NEWS = {
    1: {
      title: "බාර්සිලෝනා හදගැස්මෙන් පසු ඔස්ට්‍රියානු GP එකේ ඇන්ටොනෙල්ලි නැවත එනතුරු",
      excerpt: "ශූරතා ප්‍රමුඛ කිමි ඇන්ටොනෙල්ලි ලුවිස් හැමිල්ටන්ගේ ෆෙරාරි ජයග්‍රහණයෙන් පසු 41 ලකුණු පරතරය නැවත පිහිටුවීමට ඉලක්ක කරයි.",
      body: "කිමි ඇන්ටොනෙල්ලි රෙඩ් බුල් රිංගයට 156 ලකුණු සමඟ 2026 රියදුරන් ශූරතාවේ ප්‍රමුඛත්වයෙන් පැමිණෙන අතර, බාර්සිලෝනාවේ තාක්ෂණික දෝෂයක් නිසා පොඩියම් එකක් අහිමි වූ මතකය මකා දැමීමට මර්සිඩීස් තරුණයා උත්සාහ කරනු ඇත.\n\nලුවිස් හැමිල්ටන්ගේ ජයග්‍රහණය ඉතාලියානුවාගේ ප්‍රමුඛත්වය කපා හැමිල්ටන්ගේ ෆෙරාරි ශූරතා බලාපොරොත්තු නැවත දල්වා තිබේ. කණ්ඩායම් ප්‍රධානී ටෝටෝ වොල්ෆ් ඇන්ටොනෙල්ලි ඔස්ට්‍රියාවේ ඉහළ වේගයේ අභියෝගයක් ලබා දෙන බැවින් \"ඉක්මනින් නැවත සකස් විය යුතු\" බව පැවසීය."
    },
    2: {
      title: "හැමිල්ටන් බාර්සිලෝනාවේ හැඟුම්බර පළමු ෆෙරාරි ජයග්‍රහණය සමරයි",
      excerpt: "සත් වරක් ශූරතා විජේතූ කැටලන් ග්‍රෑන්ඩ් ප්‍රික්ස් එකේ ටයර් කළමනාකරණයේ ප්‍රවීණත්වයෙන් මර්සිඩීස්ගේ ධාවන හයක ජයග්‍රහණ පෙරළිය අවසන් කළේය.",
      body: "ලුවිස් හැමිල්ටන් බාර්සිලෝනා-කැටලන් ග්‍රෑන්ඩ් ප්‍රික්ස් එකේ ෆෙරාරි වෙනුවෙන් බලාපොරොත්තු වූ පළමු ජයග්‍රහණය ලබා ගත්තේය. ජෝර්ජ් රසල් සහ ලැන්ඩෝ නොරිස්ට වඩා ඉදිරියෙන් 1968 සිට පළමු සම්පූර්ණ බ්‍රිතාන්‍ය පොඩියම් එක සාදා තිබේ.\n\nහැමිල්ටන්ගේ ජයග්‍රහණය ඔහුව 115 ලකුණු වෙත ගෙන යන අතර ඇන්ටොනෙල්ලිට පසු 41 කින් පසුවී තිබේ. දුෂ්කර ආරම්භක අවධියකින් පසු ෆෙරාරිට සමාජික ලකුණු වැඩිදියුණුවක් ලබා දුන්නේය."
    },
    3: {
      title: "වෙර්ස්ටැප්පන්: \"ඔස්ට්‍රියාව Mercedesට එරෙහිව පරතරය අඩු කිරීමට අපේ හොඳම අවස්ථාව\"",
      excerpt: "සිව් වරක් ශූරතා විජේතූ Red Bullගේ නිවහන පිටිය 2026 හි දුෂ්කර ආරම්භයෙන් පසු Mercedesට එරෙහිව සැබෑ අවස්ථාවක් ලබා දෙන බව ඔහු විශ්වාස කරයි.",
      body: "මැක්ස් වෙර්ස්ටැප්පන් බාර්සිලෝනාවේ සිව්වැනි ස්ථානය ගත් පසු ශ්‍රේණිගත කිරීමේ සිව්වැනි ස්ථානයේ 55 ලකුණු සමඟ සිටී. Red Bull මෙම සමයේ තවම ධාවනයක් ජයගෙන නැත, නමුත් Red Bull Ring ඔවුන්ගේ 2026 පැකේජයට මොනාකෝ හෝ ස්පේන්ට වඩා හොඳ බව වෙර්ස්ටැප්පන් යටපත් කළේය.\n\n\"මෙහි ශක්තිමත් සති අන්තයක් අවශ්‍යයි,\" වෙර්ස්ටැප්පන් පැවසීය. \"මර්සිඩීස් අසම්පූර්ණ වුවත්, ඔස්ට්‍රියාව සැමවිටම අපට හොඳ වී ඇත.\""
    },
    4: {
      title: "ගැස්ලි Alpine පිටුපස පහේ සමාජික සටනට නායකත්වය දෙයි",
      excerpt: "ප්‍රමුඛ කණ්ඩායම් තුනට පසුව නිරන්තර ලකුණු ලබා ගැනීමෙන් රියදුරන් ශ්‍රේණිගත කිරීමේ අටවැනි ස්ථානයේ සිටී.",
      body: "පියරේ ගැස්ලි Alpine 2026 හි ඉතිරි කණ්ඩායම් අතර හොඳම කණ්ඩායම බවට පත් කිරීමට උදව් කළේය. සමාජික ශූරතාවේ පහවැනි ස්ථානයේ 57 ලකුණු සමඟ.\n\nගැස්ලි බාර්සිලෝනාවේ සිව්වැනි ස්ථානය ගත් අතර ෆ්‍රැන්කෝ කොලපින්ටෝ ධාවනයෙන් පසු දඬුවමකින් පසු දසවැනි ස්ථානයට පැමිණ Racing Bullsට වඩා Alpine ඉදිරියෙන් තබා ගත්තේය."
    },
    5: {
      title: "F1 2027 සමය සඳහා පුළුල් කළ තිරසාරත්ව ඉලක්ක නිවේදනය කරයි",
      excerpt: "නව නියමයන් ලොජිස්ටික් සහ ආගන්තුක සත්කාරය පුරා scope-3 උත්සර්ජන දැනුම් දීමට කණ්ඩායම්වලට අවශ්‍ය කරයි.",
      body: "Formula 1 2027 සිට කණ්ඩායම් සඳහා දැඩි තිරසාරත්ව වාර්තාකරණ අවශ්‍යතා නිර්දේශ කළේය. මෙයට ගමනාගමන, සංචාර සහ ආගන්තුක සත්කාරය පුරා පුළුල් කළ scope-3 උත්සර්ජන හෙළිදරව් ඇතුළත් වේ.\n\nමෙම පියවර 2030 නිෂ්පල්‍ය බැදීම සමඟ ගැලපෙන බව ක්‍රීඩාව පවසයි."
    },
    6: {
      title: "McLaren ඔස්ට්‍රියාවට සිල්වර්ස්ටෝන්-විශේෂ ෆ්ලෝර් එක ගෙන එයි",
      excerpt: "නව නියමයන් යුගයේ ජයග්‍රහණයක් නොමැති ආරම්භයෙන් පසු සංශෝධිත වායුගතිකතාව ධාවන වේගය අගුළු හරිනු ඇතැයි Woking බලාපොරොත්තු වේ.",
      body: "McLaren 2026 හි පළමු ජයග්‍රහණය සොයමින් Red Bull Ring හි සංශෝධිත ෆ්ලෝර් එකක් හඳුන්වා දෙනු ඇත.\n\nලැන්ඩෝ නොරිස් සහ ඕස්කාර් පියාස්ට්‍රි නිරන්තර ලකුණු ලබා ඇත — කණ්ඩායම සමාජික ශ්‍රේණිගත කිරීමේ තුන්වැනි ස්ථානයේ — නමුත් ධාවන හතකින් පසු මර්සිඩීස්ට වඩා ලකුණු 121 කින් පසුවී සිටී."
    },
    7: {
      title: "රසල්: බාර්සිලෝනා පසුබැසීමෙන් පසුත් Mercedes තවම පරාජය කිරීමට අපහසු කණ්ඩායමයි",
      excerpt: "ජෝර්ජ් රසල් ස්පේන් එකේ දෙවැනි ස්ථානය ගත් අතර සම්පූර්ණ සමය පුරා වේගවත්ම මෝටර් රථය ඔවුන් සතු බව යටපත් කළේය.",
      body: "ලුවිස් හැමිල්ටන්ගේ ෆෙරාරි ජයග්‍රහණය නිසා ඔවුන්ගේ පරිපූර්ණ ඉරිදා වාර්තාව අවසන් වුවද ජෝර්ජ් රසල් මර්සිඩීස් දෙකේම ශූරතාවල ප්‍රියතමයි බවට පිටුපස සිටී.\n\nතුන්වැනි ස්ථානයේ ලකුණු 106 සමඟ රසල් පැවසුවේ: \"එක් ධාවනයක් පින්තූරය වෙනස් නොකරයි. අපට තවම වැඩිම ජයග්‍රහණ සහ ලකුණු තිබේ.\""
    },
    8: {
      title: "ඉතිහාසයේ අඩුම වයසේ ශූරතා ප්‍රමුඛයා — ඇන්ටොනෙල්ලි F1 වෙනස් කළ ආකාරය",
      excerpt: "වයස 19 දී මර්සිඩීස් නවකයා ධාවන හතකින් ජයග්‍රහණ පහක් ලබා හැමිල්ටන්ට වඩා ලකුණු 41 කින් ඉදිරියෙන් සිටී.",
      body: "කිමි ඇන්ටොනෙල්ලිගේ 2026 හි අසාමාන්‍ය ආරම්භය ඔහුව Formula 1 ඉතිහාසයේ අඩුම වයසේ රියදුරන් ශූරතා ප්‍රමුඛයා බවට පත් කළේය.\n\nචීනය, ජපානය, මියාමි, කැනඩාව සහ මොනාකෝවේ ජයග්‍රහණ — ඕස්ට්‍රේලියාවේ දෙවැනි ස්ථානය — මර්සිඩීස්වලට සමාජික ලකුණු 262 ලබා දී ෆෙරාරිට වඩා 72 කින් ඉදිරියෙන් තබා ඇත."
    }
  };

  function attachSiTranslations(news) {
    news.forEach(function (n) {
      if (SI_NEWS[n.id]) n.si = SI_NEWS[n.id];
    });
    return news;
  }

  function mergeSiFromSeed(data) {
    var seedNews = seed().news;
    var byId = {};
    seedNews.forEach(function (n) { byId[n.id] = n; });
    data.news.forEach(function (n) {
      if (!n.si && byId[n.id] && byId[n.id].si) n.si = byId[n.id].si;
    });
    return data;
  }

  function getArticleFields(article, lang) {
    if (!article) return { title: "", excerpt: "", body: "" };
    if (lang === "si" && article.si) {
      return {
        title: article.si.title || article.title,
        excerpt: article.si.excerpt || article.excerpt,
        body: article.si.body || article.body || "",
      };
    }
    return {
      title: article.title || "",
      excerpt: article.excerpt || "",
      body: article.body || "",
    };
  }

  function clonePageDefaults() {
    if (global.F1PageDefaults && global.F1PageDefaults.pages) {
      return JSON.parse(JSON.stringify(global.F1PageDefaults.pages));
    }
    return {};
  }

  function cloneSocialDefaults() {
    if (global.F1PageDefaults && global.F1PageDefaults.social) {
      return Object.assign({}, global.F1PageDefaults.social);
    }
    return { youtube: "", facebook: "", instagram: "" };
  }

  var AD_SLOTS = {
    leaderboard: { label: "Leaderboard", size: "728 × 90", pages: "All pages — top banner" },
    billboard: { label: "Billboard", size: "970 × 250", pages: "Homepage — above news feed" },
    mpu: { label: "Medium rectangle (MPU)", size: "300 × 250", pages: "Advertise page & sidebars" },
    inline: { label: "In-feed banner", size: "Responsive", pages: "Article page — mid-content" },
    strip: { label: "Full-width strip", size: "Full width", pages: "Advertise page — footer strip" },
    article: { label: "Article inline", size: "300 × 250", pages: "Inside article body" },
  };

  function cloneAdDefaults() {
    var ads = {};
    Object.keys(AD_SLOTS).forEach(function (key) {
      ads[key] = { image: "", href: "", alt: "", enabled: false };
    });
    return ads;
  }

  function mergeAdsFromSeed(data) {
    if (!data.ads || typeof data.ads !== "object") {
      data.ads = cloneAdDefaults();
      return true;
    }
    var changed = false;
    Object.keys(AD_SLOTS).forEach(function (key) {
      if (!data.ads[key]) {
        data.ads[key] = { image: "", href: "", alt: "", enabled: false };
        changed = true;
      }
    });
    return changed;
  }

  function getAds() {
    var data = load();
    var merged = cloneAdDefaults();
    var saved = data.ads || {};
    Object.keys(merged).forEach(function (key) {
      merged[key] = Object.assign({}, merged[key], saved[key] || {});
    });
    return merged;
  }

  function mergePagesFromSeed(data) {
    var seedPages = seed().pages;
    if (!data.pages || typeof data.pages !== "object") {
      data.pages = clonePageDefaults();
      return true;
    }
    var changed = false;
    Object.keys(seedPages).forEach(function (key) {
      if (!data.pages[key]) {
        data.pages[key] = JSON.parse(JSON.stringify(seedPages[key]));
        changed = true;
      }
    });
    if (!data.social || typeof data.social !== "object") {
      data.social = cloneSocialDefaults();
      changed = true;
    }
    return changed;
  }

  function getPage(slug) {
    var data = load();
    return data.pages && data.pages[slug] ? data.pages[slug] : null;
  }

  function getSocial() {
    var data = load();
    return Object.assign({}, cloneSocialDefaults(), data.social || {});
  }

  function seed() {
    var data = {
      siteBanner: "PITLANE LK · Round 9 — British GP this weekend",
      categories: ["Race", "Technical", "Driver", "Business"],
      news: [
        { id: 1, category: "Race", title: "Antonelli targets Austrian GP rebound after Barcelona heartbreak", excerpt: "Championship leader Kimi Antonelli aims to restore his 41-point buffer after a late retirement handed Lewis Hamilton Ferrari's first win of 2026.", body: "Kimi Antonelli arrives at the Red Bull Ring still leading the 2026 drivers' championship on 156 points, but the Mercedes teenager will be eager to erase the memory of Barcelona where a technical failure cost him a likely podium.\n\nLewis Hamilton's victory cut the Italian's advantage and reignited Ferrari's title hopes. Team principal Toto Wolff said Antonelli must \"reset quickly\" with Austria offering another high-speed challenge.", author: "Sarah Mitchell", time: "2 hours ago", featured: true, thumb: ["#ecfeff", "#a5f3fc"] },
        { id: 2, category: "Race", title: "Hamilton savours emotional first Ferrari win at Barcelona", excerpt: "The seven-time champion ended Mercedes' six-race winning streak with a masterclass in tyre management at the Catalan Grand Prix.", body: "Lewis Hamilton claimed a long-awaited first victory for Ferrari at the Barcelona-Catalunya Grand Prix, finishing ahead of George Russell and Lando Norris in the first all-British podium since 1968.\n\nHamilton's win moved him to 115 points — 41 behind Antonelli — and gave Ferrari their first constructors' points boost of the season after a difficult opening phase.", author: "Marco Rossi", time: "4 hours ago", featured: false, thumb: ["#fef2f2", "#fecaca"] },
        { id: 3, category: "Driver", title: "Verstappen: \"Austria is our best chance to close the gap\"", excerpt: "The four-time champion believes Red Bull's home circuit offers a genuine opportunity to challenge Mercedes after a difficult start to 2026.", body: "Max Verstappen sits seventh in the standings on 55 points after finishing fourth in Barcelona. Red Bull have yet to win a race this season, but Verstappen insisted the Red Bull Ring suits their 2026 package better than Monaco or Spain.\n\n\"We need a strong weekend here,\" Verstappen said. \"Mercedes have been untouchable, but Austria has always been good to us.\"", author: "James Cooper", time: "5 hours ago", featured: false, thumb: ["#eff6ff", "#bfdbfe"] },
        { id: 4, category: "Race", title: "Gasly leads Alpine charge into top-five constructors fight", excerpt: "The Frenchman is P8 in the drivers' standings after consistent points finishes behind the leading trio of teams.", body: "Pierre Gasly has helped Alpine establish themselves as the best of the rest in 2026, with the team fifth in the constructors' championship on 57 points.\n\nGasly finished seventh in Barcelona while Franco Colapinto recovered to tenth after a post-race penalty, keeping Alpine ahead of Racing Bulls in the midfield battle.", author: "Elena Varga", time: "Yesterday", featured: false, thumb: ["#f0fdf4", "#bbf7d0"] },
        { id: 5, category: "Business", title: "F1 announces expanded sustainability targets for 2027 season", excerpt: "New regulations will require teams to report scope-3 emissions across logistics and hospitality.", body: "Formula 1 has outlined stricter sustainability reporting requirements for teams from 2027, including expanded scope-3 emissions disclosures across freight, travel, and hospitality.\n\nThe sport says the measures align with its 2030 net-zero commitment.", author: "Tom Bradley", time: "Yesterday", featured: false, thumb: ["#f9fafb", "#e5e7eb"] },
        { id: 6, category: "Technical", title: "McLaren bring Silverstone-spec floor to Austria in recovery push", excerpt: "Woking hopes revised aerodynamics will unlock race pace after a winless start to the new regulations era.", body: "McLaren will introduce a revised floor at the Red Bull Ring as the team searches for their first victory of 2026.\n\nLando Norris and Oscar Piastri have scored consistently — the team is third in the constructors' standings — but remain 121 points behind Mercedes after seven rounds.", author: "Sarah Mitchell", time: "2 days ago", featured: false, thumb: ["#fff7ed", "#ffedd5"] },
        { id: 7, category: "Driver", title: "Russell: Mercedes still the team to beat despite Barcelona setback", excerpt: "George Russell finished second in Spain and insists the squad retain the fastest car over a full season.", body: "George Russell backed Mercedes to remain favourites for both championships despite Lewis Hamilton's Ferrari win ending their perfect Sunday record.\n\nRussell, on 106 points in third, said: \"One race doesn't change the picture. We still have the most wins and the most points.\"", author: "Marco Rossi", time: "2 days ago", featured: false, thumb: ["#ecfeff", "#a5f3fc"] },
        { id: 8, category: "Race", title: "Youngest championship leader in history — how Antonelli has transformed F1", excerpt: "At 19, the Mercedes rookie has five wins from seven rounds and leads Hamilton by 41 points.", body: "Kimi Antonelli's sensational start to 2026 has made him the youngest drivers' championship leader in Formula 1 history.\n\nVictories in China, Japan, Miami, Canada and Monaco — plus second in Australia — have put Mercedes on 262 constructors' points, 72 clear of Ferrari.", author: "James Cooper", time: "3 days ago", featured: false, thumb: ["#eff6ff", "#93c5fd"] },
      ],
      standingsVersion: STANDINGS_VERSION,
      calendarSessionsVersion: CALENDAR_SESSIONS_VERSION,
      drivers: [
        { pos: 1, name: "Kimi Antonelli", team: "Mercedes", nationality: "IT", points: 171, wins: 5, podiums: 7 },
        { pos: 2, name: "George Russell", team: "Mercedes", nationality: "GB", points: 131, wins: 2, podiums: 4 },
        { pos: 3, name: "Lewis Hamilton", team: "Ferrari", nationality: "GB", points: 125, wins: 1, podiums: 4 },
        { pos: 4, name: "Oscar Piastri", team: "McLaren", nationality: "AU", points: 80, wins: 0, podiums: 3 },
        { pos: 5, name: "Lando Norris", team: "McLaren", nationality: "GB", points: 79, wins: 0, podiums: 2 },
        { pos: 6, name: "Charles Leclerc", team: "Ferrari", nationality: "MC", points: 79, wins: 0, podiums: 3 },
        { pos: 7, name: "Max Verstappen", team: "Red Bull", nationality: "NL", points: 73, wins: 0, podiums: 2 },
        { pos: 8, name: "Isack Hadjar", team: "Red Bull", nationality: "FR", points: 42, wins: 0, podiums: 0 },
        { pos: 9, name: "Pierre Gasly", team: "Alpine", nationality: "FR", points: 41, wins: 0, podiums: 0 },
        { pos: 10, name: "Liam Lawson", team: "Racing Bulls", nationality: "NZ", points: 30, wins: 0, podiums: 0 },
        { pos: 11, name: "Oliver Bearman", team: "Haas", nationality: "GB", points: 18, wins: 0, podiums: 0 },
        { pos: 12, name: "Franco Colapinto", team: "Alpine", nationality: "AR", points: 16, wins: 0, podiums: 0 },
        { pos: 13, name: "Arvid Lindblad", team: "Racing Bulls", nationality: "GB", points: 14, wins: 0, podiums: 0 },
        { pos: 14, name: "Carlos Sainz", team: "Williams", nationality: "ES", points: 6, wins: 0, podiums: 0 },
        { pos: 15, name: "Alexander Albon", team: "Williams", nationality: "TH", points: 5, wins: 0, podiums: 0 },
        { pos: 16, name: "Esteban Ocon", team: "Haas", nationality: "FR", points: 3, wins: 0, podiums: 0 },
        { pos: 17, name: "Gabriel Bortoleto", team: "Audi", nationality: "BR", points: 2, wins: 0, podiums: 0 },
        { pos: 18, name: "Fernando Alonso", team: "Aston Martin", nationality: "ES", points: 1, wins: 0, podiums: 0 },
        { pos: 19, name: "Nico Hulkenberg", team: "Audi", nationality: "DE", points: 0, wins: 0, podiums: 0 },
        { pos: 20, name: "Valtteri Bottas", team: "Cadillac", nationality: "FI", points: 0, wins: 0, podiums: 0 },
        { pos: 21, name: "Sergio Perez", team: "Cadillac", nationality: "MX", points: 0, wins: 0, podiums: 0 },
        { pos: 22, name: "Lance Stroll", team: "Aston Martin", nationality: "CA", points: 0, wins: 0, podiums: 0 },
      ],
      constructors: [
        { pos: 1, name: "Mercedes", points: 302, wins: 7 },
        { pos: 2, name: "Ferrari", points: 204, wins: 1 },
        { pos: 3, name: "McLaren", points: 159, wins: 0 },
        { pos: 4, name: "Red Bull", points: 115, wins: 0 },
        { pos: 5, name: "Alpine", points: 57, wins: 0 },
        { pos: 6, name: "Racing Bulls", points: 44, wins: 0 },
        { pos: 7, name: "Haas", points: 21, wins: 0 },
        { pos: 8, name: "Williams", points: 11, wins: 0 },
        { pos: 9, name: "Audi", points: 2, wins: 0 },
        { pos: 10, name: "Aston Martin", points: 1, wins: 0 },
        { pos: 11, name: "Cadillac", points: 0, wins: 0 },
      ],
      calendar: [
        { round: 1, name: "Australian Grand Prix", circuit: "Albert Park", date: "14–16 Mar 2026", next: false },
        { round: 2, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", date: "21–23 Mar 2026", next: false, sprint: true },
        { round: 3, name: "Japanese Grand Prix", circuit: "Suzuka", date: "4–6 Apr 2026", next: false },
        { round: 4, name: "Bahrain Grand Prix", circuit: "Sakhir", date: "11–13 Apr 2026", next: false },
        { round: 5, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche", date: "18–20 Apr 2026", next: false },
        { round: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", date: "2–4 May 2026", next: false },
        { round: 7, name: "Emilia Romagna Grand Prix", circuit: "Imola", date: "16–18 May 2026", next: false },
        {
          round: 8,
          name: "Austrian Grand Prix",
          circuit: "Red Bull Ring",
          date: "26–28 Jun 2026",
          next: false,
          sprint: false,
          sessions: [
            { label: "FP1", start: "2026-06-26T10:30:00.000Z" },
            { label: "FP2", start: "2026-06-26T14:00:00.000Z" },
            { label: "FP3", start: "2026-06-27T09:30:00.000Z" },
            { label: "Qualifying", start: "2026-06-27T13:00:00.000Z" },
            { label: "Race", start: "2026-06-28T13:00:00.000Z" },
          ],
        },
        {
          round: 9,
          name: "British Grand Prix",
          circuit: "Silverstone",
          date: "3–5 Jul 2026",
          next: true,
          sprint: true,
          sessions: [
            { label: "FP1", start: "2026-07-03T11:30:00.000Z", end: "2026-07-03T12:30:00.000Z" },
            { label: "Sprint Qualifying", start: "2026-07-03T15:30:00.000Z", end: "2026-07-03T16:14:00.000Z" },
            { label: "Sprint", start: "2026-07-04T11:00:00.000Z", end: "2026-07-04T12:00:00.000Z" },
            { label: "Qualifying", start: "2026-07-04T15:00:00.000Z", end: "2026-07-04T16:00:00.000Z" },
            { label: "Race", start: "2026-07-05T14:00:00.000Z", end: "" },
          ],
        },
        { round: 10, name: "Belgian Grand Prix", circuit: "Spa-Francorchamps", date: "17–19 Jul 2026", next: false },
        { round: 11, name: "Hungarian Grand Prix", circuit: "Hungaroring", date: "24–26 Jul 2026", next: false },
        { round: 12, name: "Dutch Grand Prix", circuit: "Zandvoort", date: "21–23 Aug 2026", next: false },
        { round: 13, name: "Italian Grand Prix", circuit: "Monza", date: "4–6 Sep 2026", next: false },
        { round: 14, name: "Spanish Grand Prix", circuit: "Barcelona-Catalunya", date: "11–13 Sep 2026", next: false },
        { round: 15, name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", date: "25–27 Sep 2026", next: false },
        { round: 16, name: "Singapore Grand Prix", circuit: "Marina Bay", date: "9–11 Oct 2026", next: false },
        { round: 17, name: "United States Grand Prix", circuit: "Circuit of the Americas", date: "23–25 Oct 2026", next: false, sprint: true },
        { round: 18, name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", date: "30 Oct – 1 Nov 2026", next: false },
        { round: 19, name: "São Paulo Grand Prix", circuit: "Interlagos", date: "6–8 Nov 2026", next: false, sprint: true },
        { round: 20, name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", date: "20–22 Nov 2026", next: false },
        { round: 21, name: "Qatar Grand Prix", circuit: "Lusail International Circuit", date: "27–29 Nov 2026", next: false },
        { round: 22, name: "Abu Dhabi Grand Prix", circuit: "Yas Marina", date: "4–6 Dec 2026", next: false },
      ],
      seasonStats: [
        { value: "8", label: "Races completed", sub: "of 22 scheduled" },
        { value: "40", label: "Championship gap", sub: "Antonelli leads Russell" },
        { value: "3", label: "Different winners", sub: "Antonelli ×5, Russell ×2, Hamilton" },
        { value: "302", label: "Mercedes points", sub: "98 ahead of Ferrari" },
        { value: "19", label: "Youngest ever leader", sub: "Kimi Antonelli (years old)" },
        { value: "7", label: "Mercedes race wins", sub: "from 8 Grands Prix" },
      ],
      social: cloneSocialDefaults(),
      ads: cloneAdDefaults(),
      pages: clonePageDefaults(),
    };
    attachSiTranslations(data.news);
    return data;
  }

  function validateData(d) {
    return d && Array.isArray(d.news) && Array.isArray(d.drivers) &&
      Array.isArray(d.constructors) && Array.isArray(d.calendar) &&
      Array.isArray(d.seasonStats);
  }

  function mergeStandingsFromSeed(data) {
    if (data.standingsVersion === STANDINGS_VERSION) return false;
    var s = seed();
    data.drivers = JSON.parse(JSON.stringify(s.drivers));
    data.constructors = JSON.parse(JSON.stringify(s.constructors));
    data.seasonStats = JSON.parse(JSON.stringify(s.seasonStats));
    data.siteBanner = s.siteBanner;
    data.standingsVersion = STANDINGS_VERSION;
    return true;
  }

  function ensureNextRaceFlag(data) {
    if (!data || !Array.isArray(data.calendar) || !data.calendar.length) return false;
    var marked = data.calendar.filter(function (r) { return r.next; });
    if (marked.length === 1) return false;

    data.calendar.forEach(function (r) { r.next = false; });

    if (marked.length > 1) {
      marked[0].next = true;
      return true;
    }

    var seedNext = seed().calendar.find(function (r) { return r.next; });
    var target = seedNext
      ? data.calendar.find(function (r) { return r.round === seedNext.round; })
      : null;
    if (target) target.next = true;
    else data.calendar[0].next = true;
    return true;
  }

  function mergeCalendarFromSeed(data) {
    var seedCal = seed().calendar;
    if (!Array.isArray(data.calendar) || data.calendar.length >= seedCal.length) return;
    var byRound = {};
    data.calendar.forEach(function (r) { byRound[r.round] = r; });
    data.calendar = seedCal.map(function (sr) {
      var saved = byRound[sr.round];
      if (!saved) return sr;
      return Object.assign({}, sr, saved, {
        sessions: saved.sessions && saved.sessions.length ? saved.sessions : sr.sessions,
      });
    });
  }

  function mergeCalendarSessionsFromSeed(data) {
    if (data.calendarSessionsVersion === CALENDAR_SESSIONS_VERSION) return false;
    var seedCal = seed().calendar;
    var changed = false;
    [9].forEach(function (round) {
      var seedRace = seedCal.find(function (r) { return r.round === round; });
      var race = data.calendar.find(function (r) { return r.round === round; });
      if (!seedRace || !race || !seedRace.sessions) return;
      race.sprint = !!seedRace.sprint;
      race.sessions = JSON.parse(JSON.stringify(seedRace.sessions));
      normalizeRaceWeekend(race);
      changed = true;
    });
    if (changed) data.calendarSessionsVersion = CALENDAR_SESSIONS_VERSION;
    return changed;
  }

  function mergeSessionsFromSeed(data) {
    var seedCal = seed().calendar;
    if (!Array.isArray(data.calendar)) return;
    data.calendar.forEach(function (race) {
      var seedRace = seedCal.find(function (s) { return s.round === race.round; });
      if (typeof race.sprint !== "boolean" && seedRace) race.sprint = !!seedRace.sprint;
      if ((!Array.isArray(race.sessions) || !race.sessions.length) && seedRace && seedRace.sessions) {
        race.sessions = JSON.parse(JSON.stringify(seedRace.sessions));
      }
      normalizeRaceWeekend(race);
    });
  }

  var SL_TZ = "Asia/Colombo";
  var STANDARD_LABELS = ["FP1", "FP2", "FP3", "Qualifying", "Race"];
  var SPRINT_LABELS = ["FP1", "Sprint Qualifying", "Sprint", "Qualifying", "Race"];

  function slToIso(dateStr, timeStr) {
    if (!dateStr || !timeStr) return "";
    var d = new Date(dateStr + "T" + timeStr + ":00+05:30");
    return isNaN(d.getTime()) ? "" : d.toISOString();
  }

  function isoToSlParts(iso) {
    if (!iso) return { date: "", time: "" };
    var d = new Date(iso);
    if (isNaN(d.getTime())) return { date: "", time: "" };
    return {
      date: d.toLocaleDateString("en-CA", { timeZone: SL_TZ }),
      time: d.toLocaleTimeString("en-GB", {
        timeZone: SL_TZ,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  }

  function buildSessionsFromFormat(sprint, existing) {
    var labels = sprint ? SPRINT_LABELS : STANDARD_LABELS;
    var existingMap = {};
    if (Array.isArray(existing)) {
      existing.forEach(function (s) {
        if (s && s.label) {
          existingMap[s.label] = { start: s.start || "", end: s.end || "" };
        }
      });
    }
    return labels.map(function (label) {
      var prev = existingMap[label] || {};
      return { label: label, start: prev.start || "", end: prev.end || "" };
    });
  }

  function normalizeRaceWeekend(race) {
    if (!race) return;
    if (typeof race.sprint !== "boolean") race.sprint = false;
    var labels = race.sprint ? SPRINT_LABELS : STANDARD_LABELS;
    var hasLabels = Array.isArray(race.sessions) && race.sessions.length &&
      race.sessions.every(function (s, i) { return s.label === labels[i]; });
    if (!hasLabels) {
      race.sessions = buildSessionsFromFormat(race.sprint, race.sessions || []);
    }
  }

  function normalizeCalendarWeekends(data) {
    if (!data || !Array.isArray(data.calendar)) return;
    data.calendar.forEach(normalizeRaceWeekend);
  }

  function formatSlSession(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    var day = d.toLocaleDateString("en-LK", { timeZone: SL_TZ, weekday: "short" });
    var time = d.toLocaleTimeString("en-LK", {
      timeZone: SL_TZ,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return day + " " + time;
  }

  function formatSlTime(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("en-GB", {
      timeZone: SL_TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function formatSlDateShort(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      timeZone: SL_TZ,
      day: "2-digit",
      month: "long",
    });
  }

  var SESSION_DISPLAY_LABELS = {
    FP1: "Practice 1",
    FP2: "Practice 2",
    FP3: "Practice 3",
  };

  function sessionDisplayLabel(label) {
    return SESSION_DISPLAY_LABELS[label] || label;
  }

  function formatSessionSlRange(session) {
    if (!session || !session.start) return "";
    var start = formatSlTime(session.start);
    if (session.end) return start + " – " + formatSlTime(session.end);
    return start;
  }

  function formatRaceWeekendSl(race) {
    if (!race || !Array.isArray(race.sessions)) return "";
    var parts = race.sessions.filter(function (s) { return s.start; }).map(function (s) {
      return sessionDisplayLabel(s.label) + " " + formatSlSession(s.start);
    });
    if (!parts.length) return "";
    return parts.join(" · ") + " SL";
  }

  function formatRaceWeekendSchedule(race) {
    if (!race || !Array.isArray(race.sessions)) return [];
    return race.sessions.filter(function (s) { return s.start; }).map(function (s) {
      return {
        date: formatSlDateShort(s.start),
        session: sessionDisplayLabel(s.label),
        time: formatSessionSlRange(s),
      };
    });
  }

  function getNextRace(calendar) {
    if (!Array.isArray(calendar)) return null;
    return calendar.find(function (r) { return r.next; }) || calendar[0] || null;
  }

  function loadLocal() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) raw = localStorage.getItem("f1insight_site_v1");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (validateData(parsed)) {
          var before = JSON.stringify(parsed.news);
          var beforeCal = JSON.stringify(parsed.calendar);
          mergeSiFromSeed(parsed);
          mergeCalendarFromSeed(parsed);
          mergeSessionsFromSeed(parsed);
          var calendarSessionsMerged = mergeCalendarSessionsFromSeed(parsed);
          var standingsMerged = mergeStandingsFromSeed(parsed);
          var nextFixed = ensureNextRaceFlag(parsed);
          var pagesMerged = mergePagesFromSeed(parsed);
          var adsMerged = mergeAdsFromSeed(parsed);
          if (JSON.stringify(parsed.news) !== before || JSON.stringify(parsed.calendar) !== beforeCal || nextFixed || pagesMerged || standingsMerged || calendarSessionsMerged || adsMerged) save(parsed);
          return parsed;
        }
      }
    } catch (_) {}
    var data = seed();
    save(data);
    return data;
  }

  var packagedCache = null;
  var publicDataReady = false;

  function isAdminPage() {
    try {
      return /admin\.html/i.test(location.pathname || "");
    } catch (_) {
      return false;
    }
  }

  function hydratePackagedData(parsed) {
    if (!validateData(parsed)) return null;
    var data = JSON.parse(JSON.stringify(parsed));
    normalizeCalendarWeekends(data);
    ensureNextRaceFlag(data);
    mergePagesFromSeed(data);
    mergeAdsFromSeed(data);
    return data;
  }

  function load() {
    if (packagedCache) return packagedCache;
    return loadLocal();
  }

  function whenReady(cb) {
    if (publicDataReady || isAdminPage()) {
      cb(load());
      return;
    }
    document.addEventListener("f1dataready", function () {
      cb(load());
    }, { once: true });
  }

  function bootPublicSite() {
    if (isAdminPage()) {
      publicDataReady = true;
      return;
    }
    fetch((global.F1Paths ? global.F1Paths.asset("site-data.json") : "./site-data.json"), { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (json) {
        if (json) {
          var hydrated = hydratePackagedData(json);
          if (hydrated) packagedCache = hydrated;
        }
        publicDataReady = true;
        document.dispatchEvent(new CustomEvent("f1dataready"));
      });
  }

  function exportSiteData(data) {
    return {
      siteBanner: data.siteBanner,
      categories: data.categories,
      news: data.news,
      standingsVersion: data.standingsVersion,
      calendarSessionsVersion: data.calendarSessionsVersion,
      drivers: data.drivers,
      constructors: data.constructors,
      calendar: data.calendar,
      seasonStats: data.seasonStats,
      social: data.social,
      ads: data.ads,
      pages: data.pages,
    };
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Could not save site data:", e);
      throw e;
    }
  }

  function reset() {
    var data = seed();
    save(data);
    return data;
  }

  function nextNewsId(news) {
    var max = 0;
    news.forEach(function (n) { if (n.id > max) max = n.id; });
    return max + 1;
  }

  function loadContacts() {
    try {
      var raw = localStorage.getItem(CONTACT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return [];
  }

  function saveContact(entry) {
    var list = loadContacts();
    list.unshift(entry);
    localStorage.setItem(CONTACT_KEY, JSON.stringify(list.slice(0, 100)));
  }

  function isAdminSession() {
    try {
      if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "1") return true;
    } catch (_) {}
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === "1";
    } catch (_) {}
    return false;
  }

  function setAdminSession(on) {
    try {
      if (on) sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      else sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (_) {}
    try {
      if (on) localStorage.setItem(ADMIN_SESSION_KEY, "1");
      else localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (_) {}
  }

  global.F1Data = {
    STORAGE_KEY: STORAGE_KEY,
    TEAM_COLORS: {
      McLaren: "#ff8000", Ferrari: "#e8002d", "Red Bull": "#3671c6", Mercedes: "#27f4d2",
      Williams: "#64c4ff", "Racing Bulls": "#6692ff", "Aston Martin": "#229971",
      Haas: "#b6babd", Audi: "#f50537", Alpine: "#ff87bc", Cadillac: "#0e5a63",
    },
    flagEmoji: function (code) {
      if (!code || String(code).length !== 2) return "";
      return String(code).toUpperCase().split("").map(function (c) {
        return String.fromCodePoint(127397 + c.charCodeAt(0));
      }).join("");
    },
    shortDriverName: function (name) {
      var parts = String(name || "").trim().split(/\s+/);
      if (parts.length < 2) return name || "";
      return parts[0].charAt(0) + ". " + parts[parts.length - 1];
    },
    seed: seed,
    load: load,
    save: save,
    reset: reset,
    nextNewsId: nextNewsId,
    loadContacts: loadContacts,
    saveContact: saveContact,
    getArticleFields: getArticleFields,
    formatRaceWeekendSl: formatRaceWeekendSl,
    formatRaceWeekendSchedule: formatRaceWeekendSchedule,
    formatSessionSlRange: formatSessionSlRange,
    sessionDisplayLabel: sessionDisplayLabel,
    getNextRace: getNextRace,
    getPage: getPage,
    getSocial: getSocial,
    getAds: getAds,
    AD_SLOTS: AD_SLOTS,
    buildSessionsFromFormat: buildSessionsFromFormat,
    slToIso: slToIso,
    isoToSlParts: isoToSlParts,
    normalizeRaceWeekend: normalizeRaceWeekend,
    STANDARD_LABELS: STANDARD_LABELS,
    SPRINT_LABELS: SPRINT_LABELS,
    isAdminSession: isAdminSession,
    setAdminSession: setAdminSession,
    whenReady: whenReady,
    exportSiteData: exportSiteData,
    loadLocal: loadLocal,
  };

  bootPublicSite();
})(typeof window !== "undefined" ? window : this);
