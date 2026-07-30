/**
 * Roman Idov — Portfolio
 * Plain JS, no dependencies. Handles fade-in-on-load only today.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroWidget();
  renderExperience();
  initSkillsWidget();
});

/* ============================================================
   SWAPPABLE WIDGETS (future: live terminal effects)

   Each function below owns one component that is currently
   rendered as static markup with a plain fade-in. When the
   "live terminal" pass happens (ticking numbers, typing cursor,
   code-block reveals), replace only the body of the matching
   function — the HTML hooks (data-widget / data-role-index /
   data-skill-category attributes in index.html) already exist,
   so no markup restructuring should be needed.
   ============================================================ */

/**
 * Hero identity block — [data-widget="hero-static"].
 * Today: triggers the CSS fade-in transition on load.
 * Future: could type out the name/title character-by-character
 * or tick a "years of experience" counter before settling.
 */
function initHeroWidget() {
  const hero = document.querySelector('[data-widget="hero-static"]');
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add('is-visible'));
}

/**
 * Experience timeline — [data-widget="experience-timeline"],
 * entries tagged [data-role-index].
 * Today: markup is rendered server-side (static HTML), this is a
 * no-op placeholder.
 * Future: could stagger-reveal each .timeline-entry on scroll, or
 * type out bullet text line-by-line, keyed off data-role-index.
 */
function renderExperience() {
  // Intentional no-op for now — entries are static in index.html.
}

/**
 * Skills grid — [data-widget="skills-grid"], groups tagged
 * [data-skill-category].
 * Today: static tag lists, no-op placeholder.
 * Future: could animate proficiency bars or tick a skill-count
 * summary per category, keyed off data-skill-category.
 */
function initSkillsWidget() {
  // Intentional no-op for now — tags are static in index.html.
}
