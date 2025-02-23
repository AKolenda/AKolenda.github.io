document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow-container");
  let activeModal = null;
  let currentModalSlide = 0;

  function createModal() {
    const modal = document.createElement("div");
    modal.className = "project-modal";
    document.body.appendChild(modal);
    return modal;
  }

  function updateModalSlides(slides, currentIndex) {
    const container = activeModal.querySelector(".slides-container");
    container.innerHTML = "";

    slides.forEach((slide, i) => {
      const img = document.createElement("img");
      img.src = slide.src;
      img.className = `modal-slide w-full h-full object-contain absolute inset-0 ${
        i === currentIndex ? "active" : ""
      }`;
      img.alt = `Project image ${i + 1}`;
      container.appendChild(img);
    });
  }

  function navigateModal(direction) {
    if (!activeModal) return;

    const slides = activeModal.querySelectorAll(".modal-slide");
    slides[currentModalSlide].classList.remove("active");

    currentModalSlide =
      (currentModalSlide + direction + slides.length) % slides.length;
    slides[currentModalSlide].classList.add("active");
  }

  function getProjectDetails(projectId) {
    const details = {
      "discord-bot": {
        title: "Discord Role Manager Bot",
        description:
          "An advanced Discord bot that automates role management and integrates with Whop's API for subscription-based access control.",
        features: [
          "Automatic role assignment based on Whop subscription status",
          "Real-time subscription verification",
          "Custom command handling system",
          "Webhook integration for subscription events",
          "Automatic cleanup of expired roles",
        ],
        technologies: [
          "Node.js for runtime environment",
          "Discord.js for bot functionality",
          "Express.js for webhook handling",
          "Whop API integration",
          "MongoDB for data persistence",
        ],
        challenges: [
          "Implementing real-time role updates",
          "Handling API rate limits",
          "Ensuring secure webhook verification",
          "Managing concurrent subscription checks",
        ],
      },
      "mru-chemistry": {
        title: "Chemistry Department Inventory System",
        description:
          "A comprehensive inventory management system built for MRU's Chemistry Department to track chemicals and lab equipment.",
        features: [
          "Real-time inventory tracking and updates",
          "Barcode scanning integration",
          "Chemical safety information display",
          "Location tracking and management",
          "Low stock alerts and reordering system",
        ],
        technologies: [
          "PHP for backend logic",
          "JavaScript for interactive features",
          "Tailwind CSS for responsive design",
          "MySQL database integration",
          "Mobile-first approach for tablet usage",
        ],
        challenges: [
          "Complex chemical classification system",
          "Multi-user concurrent access handling",
          "Real-time inventory synchronization",
          "Safety protocol integration",
          "Mobile responsiveness for lab use",
        ],
      },
      "cookie-manager": {
        title: "Cookie Manager Pro Chrome Extension",
        description:
          "A powerful Chrome extension for advanced cookie management and privacy protection.",
        features: [
          "Detailed cookie analysis and management",
          "Privacy risk assessment",
          "Automated cookie cleanup",
          "Custom filtering rules",
          "Tab suspension for memory optimization",
        ],
        technologies: [
          "JavaScript ES6+",
          "Chrome Extension APIs",
          "Tailwind CSS for UI",
          "Local Storage for settings",
          "Service Workers for background tasks",
        ],
        challenges: [
          "Complex cookie parsing and analysis",
          "Cross-domain security handling",
          "Performance optimization",
          "Browser API limitations",
          "Real-time cookie monitoring",
        ],
      },
    };
    return details[projectId];
  }

  function createModalContent(slides, currentIndex, projectId) {
    const details = getProjectDetails(projectId);
    const slidesArray = Array.from(slides); // Convert NodeList to Array

    if (!details && slidesArray.length === 1) {
      // Single image without project details
      return `
        <div class="project-modal-content">
          <button class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div class="relative aspect-video">
            <img src="${slidesArray[0].src}" class="w-full h-full object-contain" alt="Project image"/>
          </div>
        </div>
      `;
    }

    // Enhanced modal with project details
    return `
      <div class="project-modal-content overflow-y-auto max-h-[90vh]">
        <button class="modal-close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="relative aspect-video">
          ${slidesArray
            .map(
              (slide, i) => `
            <img src="${slide.src}" 
                 class="slide w-full h-full object-contain absolute inset-0 ${
                   i === currentIndex ? "active" : ""
                 }" 
                 alt="Project image ${i + 1}"/>
          `
            )
            .join("")}
          ${
            slidesArray.length > 1
              ? `
            <button class="modal-nav-button prev">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button class="modal-nav-button next">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          `
              : ""
          }
        </div>
        ${
          details
            ? `
          <div class="project-details">
            <h3>${details.title}</h3>
            <p class="text-slate-600">${details.description}</p>
            <div class="project-details-grid">
              <div class="project-details-item">
                <h4>Key Features</h4>
                <ul class="list-disc ml-4">
                  ${details.features
                    .map((feature) => `<li>${feature}</li>`)
                    .join("")}
                </ul>
              </div>
              <div class="project-details-item">
                <h4>Technologies Used</h4>
                <ul class="list-disc ml-4">
                  ${details.technologies
                    .map((tech) => `<li>${tech}</li>`)
                    .join("")}
                </ul>
              </div>
              <div class="project-details-item">
                <h4>Technical Challenges</h4>
                <ul class="list-disc ml-4">
                  ${details.challenges
                    .map((challenge) => `<li>${challenge}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  slideshows.forEach((slideshow) => {
    let currentSlide = 0;
    const slides = slideshow.querySelectorAll(".slide");
    const dots = slideshow.querySelectorAll("button");
    let slideInterval = setInterval(() => navigate(1), 7000);

    function navigate(direction) {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + direction + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");

      if (dots.length) {
        dots.forEach(
          (dot, i) => (dot.style.opacity = i === currentSlide ? "1" : "0.5")
        );
      }
    }

    // Handle slideshow click to open modal
    slideshow.addEventListener("click", () => {
      const projectId = slideshow.dataset.project;
      if (!activeModal) {
        activeModal = createModal();
      }

      currentModalSlide = currentSlide;
      clearInterval(slideInterval);

      activeModal.innerHTML = createModalContent(
        slides,
        currentModalSlide,
        projectId
      );

      requestAnimationFrame(() => {
        activeModal.classList.add("active");
      });

      document.body.style.overflow = "hidden"; // Prevent body scroll

      // Add navigation handlers only if there are multiple slides
      if (slides.length > 1) {
        const modalPrev = activeModal.querySelector(".prev");
        const modalNext = activeModal.querySelector(".next");

        if (modalPrev)
          modalPrev.onclick = (e) => {
            e.stopPropagation();
            navigateModal(-1);
          };

        if (modalNext)
          modalNext.onclick = (e) => {
            e.stopPropagation();
            navigateModal(1);
          };
      }

      // Add close handler
      const modalClose = activeModal.querySelector(".modal-close");
      if (modalClose) {
        modalClose.onclick = () => {
          activeModal.classList.remove("active");
          slideInterval = setInterval(() => navigate(1), 7000);
          setTimeout(() => {
            if (activeModal && !activeModal.classList.contains("active")) {
              activeModal.remove();
              activeModal = null;
            }
          }, 500);
          document.body.style.overflow = ""; // Restore body scroll
        };
      }
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!activeModal?.classList.contains("active")) return;

    if (e.key === "Escape") {
      activeModal.querySelector(".modal-close").click();
    } else if (e.key === "ArrowLeft") {
      navigateModal(-1);
    } else if (e.key === "ArrowRight") {
      navigateModal(1);
    }
  });
});
