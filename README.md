# Startrek1977.github.io

Personal portfolio site for Roman Idov. Plain HTML/CSS/JS, no build step, no
external dependencies (fonts, JS, CSS all self-contained).

## Structure

```
index.html              Single-page site (hero, about, skills, experience, education, contact)
assets/css/style.css     All styling (dark/amber, monospace, §-numbered sections)
assets/js/main.js        Fade-in-on-load + swappable widget stubs
assets/resume/           Resume PDF (see TODO below)
assets/favicon.svg       Site favicon
```

## Local preview

No server required — just open `index.html` in a browser. Or, for a local
server (recommended so relative links behave exactly like production):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo's contents to the `main` branch of `Startrek1977.github.io`
   (a repo named exactly `<username>.github.io` is treated by GitHub as a
   user/organization site).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. The site will be live at `https://Startrek1977.github.io` within a minute
   or two. No custom domain / CNAME is configured.

## TODO before going fully live

- **[TODO] Replace the placeholder resume PDF** at
  `assets/resume/Roman_Idov_Resume.pdf` with the real resume.
- **[TODO] Add individual project cards** — there's a marked spot in
  `index.html` (search for `<!-- TODO: add individual project cards here -->`)
  under the Portfolio section, which currently just links out to
  [github.com/Startrek1977](https://github.com/Startrek1977?tab=repositories).

## Future: "live terminal" effects

The hero, experience timeline, and skills grid are intentionally built as
static-but-swappable components (`data-widget` / `data-role-index` /
`data-skill-category` attributes in `index.html`, matching stub functions in
`assets/js/main.js`). To add ticking stats, a typing cursor, or code-block
reveals later, only the bodies of `initHeroWidget()`, `renderExperience()`,
and `initSkillsWidget()` in `main.js` need to change — no HTML restructuring
required.
