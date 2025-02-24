function initTheme() {
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const themeToggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Set initial theme based on localStorage or system preference
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!localStorage.getItem("color-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
    html.classList.add("dark");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
    html.classList.remove("dark");
  }

  // Simplified theme toggle function
  function toggleTheme() {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }

  // Desktop toggle
  themeToggleBtn.addEventListener("click", () => {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");
    toggleTheme();
  });

  // Mobile toggle
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const themeToggleDarkIconMobile = document.getElementById(
    "theme-toggle-dark-icon-mobile"
  );
  const themeToggleLightIconMobile = document.getElementById(
    "theme-toggle-light-icon-mobile"
  );

  // Set initial state for mobile toggle
  if (html.classList.contains("dark")) {
    themeToggleLightIconMobile.classList.remove("hidden");
  } else {
    themeToggleDarkIconMobile.classList.remove("hidden");
  }

  themeToggleMobile.addEventListener("click", () => {
    themeToggleDarkIconMobile.classList.toggle("hidden");
    themeToggleLightIconMobile.classList.toggle("hidden");
    toggleTheme();
  });
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle both hidden class and show class
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("show");
  });

  // Close menu when clicking a link
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("show");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
});
