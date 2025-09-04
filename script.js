//Beginning of the Navigation Bar

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



//Aniamtion on Scroll Effect
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
