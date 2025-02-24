function initTheme() {
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!localStorage.getItem("color-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
    document.documentElement.classList.add("dark");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
    document.documentElement.classList.remove("dark");
  }

  themeToggleBtn.addEventListener("click", function () {
    // Preserve animation states during theme switch
    document
      .querySelectorAll(".work-card, .stagger-card, .project-card")
      .forEach((card) => {
        card.style.transition = "none";
        card.offsetHeight; // Force reflow
        card.style.transition = "";
      });

    // Toggle icons
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // If is set in localStorage
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }

    // Re-trigger animations if needed
    requestAnimationFrame(() => {
      document.querySelectorAll(".is-visible").forEach((el) => {
        el.classList.remove("is-visible");
        el.offsetHeight; // Force reflow
        el.classList.add("is-visible");
      });
    });
  });

  // Add mobile theme toggle functionality
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const themeToggleDarkIconMobile = document.getElementById(
    "theme-toggle-dark-icon-mobile"
  );
  const themeToggleLightIconMobile = document.getElementById(
    "theme-toggle-light-icon-mobile"
  );

  // Set initial state for mobile toggle
  if (document.documentElement.classList.contains("dark")) {
    themeToggleLightIconMobile.classList.remove("hidden");
  } else {
    themeToggleDarkIconMobile.classList.remove("hidden");
  }

  // Add click handler for mobile toggle
  themeToggleMobile.addEventListener("click", function () {
    themeToggleDarkIconMobile.classList.toggle("hidden");
    themeToggleLightIconMobile.classList.toggle("hidden");

    // Reuse the same theme toggle logic
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  });
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu when clicking on mobile menu links
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
});
