// Mobile menu toggle
function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

ScrollReveal().reveal(".animate-on-scroll", {
  delay: 200,
  distance: "20px",
  origin: "bottom",
  opacity: 0,
  duration: 1000,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  interval: 100,
});

// Particle network animation
const canvas = document.getElementById("particle-network");
const ctx = canvas.getContext("2d");

// Make canvas full screen
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Particle settings
const particleCount = 100;
const particles = [];
const connectionDistance = 100;
const mouseRadius = 150;

let mouse = {
  x: null,
  y: null,
  radius: mouseRadius,
};

// Track mouse movement
document.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.velocityX = (Math.random() - 0.5) * 0.5;
    this.velocityY = (Math.random() - 0.5) * 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  update() {
    // Mouse interaction
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= Math.cos(angle) * force * 5;
        this.y -= Math.sin(angle) * force * 5;
      }
    }

    // Return to original position
    let dx = this.baseX - this.x;
    let dy = this.baseY - this.y;
    this.x += dx * 0.05;
    this.y += dy * 0.05;

    // Move particles
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Create particles
function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}
init();

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    // Connect particles
    particles.forEach((otherParticle) => {
      const dx = particle.x - otherParticle.x;
      const dy = particle.y - otherParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${
          1 - distance / connectionDistance
        })`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(otherParticle.x, otherParticle.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}
animate();

// Parallax scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll(".parallax-section").forEach((section) => {
    const speed = 0.5; // Adjust for more/less movement
    section.style.setProperty("--scroll-offset", `${scrolled * speed}px`);
  });
});

// Reveal elements on scroll
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

// Observe all elements with reveal class
document
  .querySelectorAll(".reveal-on-scroll, .stagger-card")
  .forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
    observer.observe(el);
  });

// Tilt effect for cards
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
  });
});
