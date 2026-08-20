// Portfolio Main Logic & Interactive Animations
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.querySelector(".theme-toggle");

  // Load theme preference
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
  }

  // Bind theme button click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");
      const isLight = body.classList.contains("light-theme");
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
  }

  // Smooth Page Transitions
  const content = document.querySelector(".content");
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
      // Don't intercept if modifier keys are pressed or if target is blank
      if (e.metaKey || e.ctrlKey || e.shiftKey || this.target === "_blank") return;
      
      e.preventDefault();
      const targetUrl = this.href;

      if (content) {
        content.classList.add("page-transition-active");
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      } else {
        window.location.href = targetUrl;
      }
    });
  });

  // Animated Skills Progress Bars
  const progressFills = document.querySelectorAll(".skill-progress-fill");
  if (progressFills.length > 0) {
    // Set a slight timeout to trigger the animation cleanly
    setTimeout(() => {
      progressFills.forEach(fill => {
        const val = fill.getAttribute("data-value");
        fill.style.width = val + "%";
      });
    }, 100);
  }

  // Card spotlight glow tracking & 3D tilt
  const cards = document.querySelectorAll(".glow-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor displacement from card center (max 4deg)
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});
