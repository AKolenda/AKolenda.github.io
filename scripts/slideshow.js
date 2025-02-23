document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow-container");
  let activeModal = null;
  let currentModalSlide = 0;

  function createModal() {
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.innerHTML = `
      <div class="project-modal-content">
        <div class="relative aspect-video">
          <div class="slides-container h-full"></div>
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
          <button class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    `;
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
      if (!activeModal) {
        activeModal = createModal();
      }

      currentModalSlide = currentSlide;
      clearInterval(slideInterval);

      updateModalSlides(slides, currentModalSlide);

      requestAnimationFrame(() => {
        activeModal.classList.add("active");
      });

      // Add navigation handlers
      const modalPrev = activeModal.querySelector(".prev");
      const modalNext = activeModal.querySelector(".next");
      const modalClose = activeModal.querySelector(".modal-close");

      modalPrev.onclick = (e) => {
        e.stopPropagation();
        navigateModal(-1);
      };

      modalNext.onclick = (e) => {
        e.stopPropagation();
        navigateModal(1);
      };

      modalClose.onclick = () => {
        activeModal.classList.remove("active");
        slideInterval = setInterval(() => navigate(1), 7000);
        setTimeout(() => {
          if (activeModal && !activeModal.classList.contains("active")) {
            activeModal.remove();
            activeModal = null;
          }
        }, 500);
      };
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
