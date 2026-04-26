// Reveal-on-scroll observer for .reveal and (legacy) .fade-in-section / .stagger-card
const observerOptions = {
  root: null,
  threshold: 0.12,
  rootMargin: "0px 0px -10% 0px",
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function initAnimations() {
  // Primary reveal class used in current markup
  document.querySelectorAll(".reveal").forEach((el, i) => {
    // Stagger groups of siblings within the same parent
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    fadeObserver.observe(el);
  });

  // Legacy classes — kept for backwards compatibility
  document
    .querySelectorAll(".fade-in-section, .stagger-card, .work-card")
    .forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
      fadeObserver.observe(el);
    });
}

document.addEventListener("DOMContentLoaded", initAnimations);
