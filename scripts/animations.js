// Combined animation observers and handlers
const observerOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: "-50px 0px"
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

function initAnimations() {
  // Observe sections
  document.querySelectorAll("section:not(:first-child)").forEach((section) => {
    section.classList.add("fade-in-section");
    fadeObserver.observe(section);
  });

  // Observe work cards with staggered delay
  document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 200}ms`;
    fadeObserver.observe(card);
  });

  // Observe project cards with staggered delay
  document.querySelectorAll('.stagger-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
    card.classList.add('fade-in-section'); // Add fade-in class
    fadeObserver.observe(card);
  });

  // Fix parallax section
  const parallaxSection = document.querySelector('.parallax-section');
  if (parallaxSection) {
    parallaxSection.style.position = 'relative';
  }
}

document.addEventListener('DOMContentLoaded', initAnimations);
