document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  // Optional JS-based delay control (not required if CSS is used)
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
  });

  // Optional: Scroll-based reveal (if needed later)
  // Add "reveal-on-scroll" class and use IntersectionObserver here if desired
});
