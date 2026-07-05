# PITLANE LK — F1 News & Standings

Sri Lankan F1 news site with standings, stats, calendar, contact form, and a private admin panel.

**Brand colours:** black `#0a0a0a`, red `#c41e3a`, green accent `#1b7340`

## Public site

Open `index.html` in your browser.

- **News** — articles link to `article.html?id=…`
- **Standings / Stats / Calendar** — editable via admin
- **Contact us** — form saves messages to localStorage

## Admin panel (private — not linked on public site)

Open directly: **`f1-insight/admin.html`** (bookmark this URL — there is no link on the public site)

| | |
|---|---|
| **Password** | `f1insight2026` |
| **Change password** | Edit `ADMIN_PASS` in `admin.js` |
| **Shortcut** | On the homepage, press **Ctrl+Shift+A** |

### Troubleshooting admin access

1. Open **`admin.html`** from inside the **`f1-insight`** folder (same folder as `index.html`).
2. You need **`admin.js`**, **`admin.css`**, **`assets/logo.png`**, and **`styles.css`** alongside `admin.html`.
3. If login fails, use password **`f1insight2026`** exactly (no spaces).
4. A red error box on the login screen explains missing files.

### Admin sections
- **News** — add, edit, delete articles (with full body text)
- **Standings** — drivers & constructors
- **Season stats** — stat cards
- **Calendar** — races (mark one as "Next")
- **Contact messages** — submissions from the public form
- **Settings** — top banner text & news categories

Changes save to **localStorage** and appear on the public site immediately (refresh the homepage).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Public homepage |
| `article.html` | Single article reader |
| `admin.html` | Private CMS (you only) |
| `assets/logo.png` | PITLANE LK logo |
| `data.js` | Shared data + localStorage |
| `app.js` | Public site rendering |
| `i18n.js` | Language switcher (English, Sinhala, Italian) |
| `admin.js` | Admin logic |
| `styles.css` | Public styles |
| `admin.css` | Admin styles |

## GitHub Pages deploy

1. **Publish the `f1-insight` folder as the site root**  
   In repo **Settings → Pages**, set source to the branch/folder that contains `index.html`, `assets/`, and `paths.js` (either the repo root if this folder *is* the repo, or the `/f1-insight` subfolder).

2. **Commit these files** (images break if any are missing):
   - `assets/logo.png` — site logo (~1 MB)
   - `site-data.json` — export from Admin after adding article/ad images (see below)
   - `.nojekyll` — disables Jekyll so GitHub serves static files as-is
   - `paths.js` — fixes asset URLs on project sites (`username.github.io/repo-name/`)

3. **Export content with images**  
   Article and ad images are stored in **Admin → Download site snapshot** as `site-data.json`. Upload that file into the `f1-insight` folder and push to GitHub. Without it, visitors only see gradient placeholders (not your uploaded photos).

4. **Hard refresh** after deploy (Ctrl+F5) to bypass cached `site-data.json`.

### If images still fail

| Symptom | Fix |
|--------|-----|
| Logo broken | Ensure `assets/logo.png` is committed and pushed |
| Article photos missing | Export & commit `site-data.json` from admin |
| Works locally, not on GitHub | Confirm Pages URL includes the folder where `index.html` lives |
| Old content after update | Re-export `site-data.json` and push again |

## Note

Demo/static site — data lives in the browser's localStorage, not a server database.
