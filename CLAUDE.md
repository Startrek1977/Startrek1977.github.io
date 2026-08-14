# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Roman Idov's personal portfolio/resume site — a single-page static site (`index.html`), plain HTML/CSS/JS with **no build step, no package manager, and no external runtime dependencies** (fonts, JS, CSS, icons are all self-contained). Deployed directly to GitHub Pages from the repo root (`.nojekyll` disables Jekyll processing; a repo named `<username>.github.io` is served automatically as the user's site).

## Commands

Local preview (no server required, but a server matches production behavior for relative paths):
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`. There is no build, lint, or test tooling in this repo — changes are verified by opening the page and checking visually (see verification checklist pattern used in past changes: check Network tab for 404s, console for errors, and visually inspect the changed section).

Deploying: push to `main`, GitHub Pages serves it directly (root, no CNAME configured).

## Architecture

### Single-file structure
- `index.html` — entire site content, all sections
- `assets/css/style.css` — all styling, single file
- `assets/js/main.js` — all behavior, single file, no dependencies
- `assets/icons/` — vendored technology-logo SVGs (see `assets/icons/ATTRIBUTION.md` for source/license per file — sourced from Devicon (MIT) and Simple Icons (CC0), never hotlinked from a CDN)
- `assets/resume/` — resume PDF
- `assets/favicon.svg`

### Theming
All colors/fonts/spacing are CSS custom properties in `:root` in `style.css` (`--bg`, `--accent`, `--text*`, `--mono-font`, `--sans-font`, `--radius`, etc.). Dark theme, single amber accent color reserved for emphasis/interaction states (links, hover, active borders) — don't introduce a second accent color. Monospace font is used for structural/label text (nav, section numbers, tags, dates); sans-serif for prose.

### The "swappable widget" pattern — read this before touching hero/experience/skills
The hero, experience timeline, and skills grid are deliberately built as static markup with dedicated JS hooks, so future animation work never requires restructuring HTML:
- `data-widget="hero-static"` / `data-widget="experience-timeline"` / `data-widget="skills-grid"` mark the three swappable regions in `index.html`.
- `data-role-index="N"` tags each `.timeline-entry` article; `data-skill-category="..."` tags each `.skill-group` div.
- `assets/js/main.js` has one function per widget (`initHeroWidget()`, `renderExperience()`, `initSkillsWidget()`), called from a single `DOMContentLoaded` listener. Each function owns everything about how that widget is enhanced — when changing animation/behavior for one of these sections, edit the matching function body only.
- Visual reveal state is driven by a `[data-fade]` attribute + `.is-visible` class pair in `style.css`, combined with a shared `revealOnScroll(selector, staggerMs)` IntersectionObserver helper in `main.js` that staggers matched elements into view (`transition-delay` set per-element via a `--reveal-delay` custom property). `initHeroWidget()` just flips `.is-visible` directly on load instead of observing.
- `<noscript>` in `<head>` forces `[data-fade]` elements fully visible when JS is disabled — any new `data-fade` element is automatically covered, no extra markup needed.
- `@media (prefers-reduced-motion: reduce)` in `style.css` neutralizes `[data-fade]` transitions; `revealOnScroll()` also short-circuits (skips the observer, adds `.is-visible` immediately) when reduced motion is detected — both sides need to stay in sync if this logic changes.

### Skill tags and icons
`.skill-tags li` in the skills grid optionally contains a leading `<img class="skill-icon" src="assets/icons/....svg" alt="">` before the text. Only add an icon when a real, correctly-matched logo exists in Devicon or Simple Icons — many tags intentionally have no icon (abstract concepts, discontinued tech, niche vendor libraries with no available logo) and should stay plain text rather than get a mismatched or invented icon. Icons keep their native brand colors (not recolored to monochrome), except where a vendored icon is unreadable against the site's dark background (e.g. `assets/icons/github.svg` had its fill changed from near-black to `#e6e6e6` — deviations like this are noted in `assets/icons/ATTRIBUTION.md`).

### Performance
`content-visibility: auto` is applied to `#skills`, `#experience`, `#education` (below-the-fold sections) with per-breakpoint `contain-intrinsic-size` estimates, to skip layout/paint work until scrolled near viewport. Keep this in mind when debugging why a below-fold section's JS-driven state (e.g. scroll-reveal) doesn't appear to fire until scrolled into view — that's expected.

## Known TODOs (from README)

- `assets/resume/Roman_Idov_Resume.pdf` is a placeholder — flagged for replacement with the real resume.
- Portfolio section is a stub (see `<!-- TODO: add individual project cards here -->` in `index.html`) — currently just links out to the GitHub profile. Needs real project details before cards can be built.
