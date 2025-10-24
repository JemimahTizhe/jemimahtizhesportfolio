// animation.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: false,
  });

  // Add smooth fade + motion with IntersectionObserver
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const ratio = entry.intersectionRatio;
      el.style.opacity = ratio;
      el.style.transform = `translateY(${(1 - ratio) * 30}px)`;
    });
  }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });

  elements.forEach(el => observer.observe(el));

  // Footer year updater
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
