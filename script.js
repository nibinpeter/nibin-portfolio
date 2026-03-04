// Apply book-style flip animation when navigating
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = this.href;

    // Add flip-out effect
    document.body.classList.add("page-flip");
    document.body.style.animation = "flipOut 0.8s ease forwards";

    setTimeout(() => {
      window.location.href = target;
    }, 800);
  });
});
