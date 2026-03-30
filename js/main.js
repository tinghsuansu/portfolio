/* ============================================================
   MAIN.JS — shared across all pages
   ============================================================ */

// ---- Header hide/show on scroll ----
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  let lastScrollY = 0;
  const THRESHOLD = 5;   // ignore micro-jitter (px)
  const TOP_ZONE  = 100; // always visible near the top (px)

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    if (Math.abs(diff) < THRESHOLD) return;

    // Never hide while mobile nav is open
    if (mainNav && mainNav.classList.contains('is-open')) {
      lastScrollY = currentY;
      return;
    }

    if (currentY < TOP_ZONE) {
      siteHeader.classList.remove('hidden');   // always show near top
    } else if (diff > 0) {
      siteHeader.classList.add('hidden');      // scrolling down → hide
    } else {
      siteHeader.classList.remove('hidden');   // scrolling up → show
    }

    lastScrollY = currentY;
  }, { passive: true });
}

// ---- Footer year (auto-updates each year) ----
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Mobile navigation toggle ----
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

if (hamburger && mainNav) {
  const hamburgerIcon = hamburger.querySelector('i');

  function setNavOpen(open) {
    mainNav.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', open);
    if (hamburgerIcon) {
      hamburgerIcon.className = open
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    }
  }

  hamburger.addEventListener('click', () => {
    setNavOpen(!mainNav.classList.contains('is-open'));
  });

  // Close nav when a link is clicked (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      setNavOpen(false);
    }
  });
}
