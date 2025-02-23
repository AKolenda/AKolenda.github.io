document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow-container");

  // Create modal once
  const modal = document.createElement("div");
  modal.className = "project-modal";
  document.body.appendChild(modal);

  function createModalContent(slides, currentIndex) {
    return `
      <div class="project-modal-content">
        <button class="modal-close" onclick="this.closest('.project-modal').classList.remove('active')">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="relative aspect-video">
          ${Array.from(slides)
            .map(
              (slide, i) => `
            <img 
              src="${slide.src}" 
              class="slide w-full h-full object-contain absolute inset-0 ${
                i === currentIndex ? "active" : ""
              }"
              alt="Project image ${i + 1}"
            />
          `
            )
            .join("")}
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
        </div>
      </div>
    `;
  }

  slideshows.forEach((slideshow) => {
    let currentSlide = 0;
    const slides = slideshow.querySelectorAll(".slide");
    const dots = slideshow.querySelectorAll("button");
    const totalSlides = slides.length;

    function updateSlides() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      if (dots.length) {
        dots.forEach((dot, index) => {
          dot.style.opacity = index === currentSlide ? "1" : "0.5";
        });
      }
    }

    function navigate(direction) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      updateSlides();
    }

    // Handle slideshow click
    slideshow.addEventListener("click", () => {
      modal.innerHTML = createModalContent(slides, currentSlide);
      requestAnimationFrame(() => {
        modal.classList.add("active");
      });

      // Add navigation handlers
      const modalPrev = modal.querySelector(".prev");
      const modalNext = modal.querySelector(".next");

      modalPrev?.addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(-1);
      });

      modalNext?.addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(1);
      });
    });

    // Auto advance slides more slowly (7 seconds)
    let slideInterval = setInterval(() => navigate(1), 7000);

    // Pause slideshow when modal is open
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        slideInterval = setInterval(() => navigate(1), 7000);
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        modal.classList.remove("active");
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    });

    // Initial setup
    updateSlides();
  });
});
