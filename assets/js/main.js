/**
 * Roman Idov — Portfolio
 * Plain JS, no dependencies. Handles fade-in-on-load and
 * scroll-triggered reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroWidget();
  renderExperience();
  initSkillsWidget();
});

/* ============================================================
   SWAPPABLE WIDGETS (future: live terminal effects)

   Each function below owns one component that is currently
   rendered as static markup with a scroll-triggered reveal. When the
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
 * Shared scroll-reveal: staggers [data-fade] elements matching
 * `selector` into view via IntersectionObserver, one CSS custom
 * property per element to drive the transition-delay in style.css.
 * Respects prefers-reduced-motion by skipping the observer and
 * showing everything immediately.
 */
function revealOnScroll(selector, staggerMs) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  items.forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${i * staggerMs}ms`);
    if (reduceMotion) el.classList.add('is-visible');
  });
  if (reduceMotion) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  items.forEach(el => observer.observe(el));
}

/**
 * Experience timeline — [data-widget="experience-timeline"],
 * entries tagged [data-role-index].
 * Stagger-reveals each .timeline-entry as it scrolls into view.
 */
function renderExperience() {
  revealOnScroll('[data-role-index]', 90);
}

/**
 * Skills grid — [data-widget="skills-grid"], groups tagged
 * [data-skill-category].
 * Stagger-reveals each .skill-group as it scrolls into view.
 */
function initSkillsWidget() {
  revealOnScroll('[data-skill-category]', 70);
}
