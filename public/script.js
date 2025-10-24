//Beginning of the Navigation Bar

  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navRight = document.querySelector('.nav-right');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navRight.classList.toggle('active');
  });

//Ending of Navigation Bar

// ====== Footer Year ======
document.getElementById("year").textContent = new Date().getFullYear();


// ====== Universal Image Modal with Navigation ======
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  let images = Array.from(document.querySelectorAll(".modal-trigger"));
  let currentIndex = 0;

  if (modal && modalImg && closeBtn) {
    // Open modal when any image is clicked
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentIndex = index;
        openModal();
      });
    });

    function openModal() {
      modal.style.display = "flex"; 
      modalImg.src = images[currentIndex].src;
      modalImg.alt = images[currentIndex].alt;
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      openModal();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openModal();
    }

    // Close on X
    closeBtn.addEventListener("click", closeModal);

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeModal();
      }
    });

    // Add navigation arrows dynamically
    const prevBtn = document.createElement("span");
    prevBtn.innerHTML = "&#10094;"; // left arrow
    prevBtn.className = "nav-arrow prev";
    modal.appendChild(prevBtn);

    const nextBtn = document.createElement("span");
    nextBtn.innerHTML = "&#10095;"; // right arrow
    nextBtn.className = "nav-arrow next";
    modal.appendChild(nextBtn);

    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);
  }
});


// ====== Contact Form (if you’re using Formspree) ======
var form = document.getElementById("my-form");
if (form) {
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
  }
  form.addEventListener("submit", handleSubmit);
}

console.log("JS is connected!");



// script.js
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Example: mobile menu toggle (optional)
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000, // controls how long the animation lasts
  once: false,    // set to true if you want it to animate only once
});

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

  // Update footer year
  document.getElementById("year").textContent = new Date().getFullYear();
