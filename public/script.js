// Initialize AOS when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 900,
    once: false,
    easing: "ease-out",
  });
  
  // Hamburger menu functionality (works on all pages)
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    const links = navMenu.querySelectorAll("a");

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");

      //Add small stagger animation delay for each link
      links.forEach((link, index) => {
        if (navMenu.classList.contains("active")) {
          link.style.animation = `fadeSlide 0.4s ease forwards ${index / 10 + 0.1}s`;
        } else {
          link.style.animation = "none";
        }
      });
    });

    // Close menu when clicking on a link (mobile)
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      });
    });
  }

  // ====== Footer Year ======
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});


// ====== Universal Image Modal with Navigation ======
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  if (!modal || !modalImg || !closeBtn) {
    return;
  }

  // Get all images with modal-trigger class
  let images = Array.from(document.querySelectorAll(".modal-trigger"));
  let currentIndex = 0;

  function initializeModal() {
    // Refresh images list in case new ones were added
    images = Array.from(document.querySelectorAll(".modal-trigger"));
    
    if (images.length === 0) {
      return;
    }
    // Open modal when any image is clicked
    images.forEach((img, index) => {
      img.style.cursor = 'pointer';
      
      img.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = index;
        openModal();
      });
      
      // Add error handling for images
      img.addEventListener("error", function() {
        console.warn('Image failed to load:', this.src);
        this.style.opacity = '0.5';
      });
    });

    function openModal() {
      if (images.length === 0 || currentIndex < 0 || currentIndex >= images.length) {
        return;
      }
      
      const img = images[currentIndex];
      if (!img || !img.src) {
        return;
      }
      
      modal.style.display = "flex"; 
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Image';
      
      // Handle image load errors in modal
      modalImg.onerror = function() {
        console.error('Failed to load image in modal:', img.src);
        this.src = ''; // Clear broken image
        this.alt = 'Image failed to load';
      };
      
      // Ensure image loads
      modalImg.onload = function() {
        this.style.display = 'block';
      };
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function showNext() {
      if (images.length === 0) return;
      currentIndex = (currentIndex + 1) % images.length;
      openModal();
    }

    function showPrev() {
      if (images.length === 0) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openModal();
    }

    // Close on X
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains('modal')) {
        closeModal();
      }
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex" || window.getComputedStyle(modal).display === "flex") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          showNext();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          showPrev();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          closeModal();
        }
      }
    });

    // Add navigation arrows dynamically (only if they don't exist)
    let prevBtn = modal.querySelector(".nav-arrow.prev");
    let nextBtn = modal.querySelector(".nav-arrow.next");
    
    if (!prevBtn) {
      prevBtn = document.createElement("span");
      prevBtn.innerHTML = "&#10094;"; // left arrow
      prevBtn.className = "nav-arrow prev";
      modal.appendChild(prevBtn);
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPrev();
      });
    }
    
    if (!nextBtn) {
      nextBtn = document.createElement("span");
      nextBtn.innerHTML = "&#10095;"; // right arrow
      nextBtn.className = "nav-arrow next";
      modal.appendChild(nextBtn);
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showNext();
      });
    }
  }

  // Initialize modal - try multiple times to catch dynamically loaded images
  function tryInitialize() {
    images = Array.from(document.querySelectorAll(".modal-trigger"));
    if (images.length > 0) {
      initializeModal();
      return true;
    }
    return false;
  }

  // Try immediately
  if (!tryInitialize()) {
    // Try after a short delay (for AOS animations)
    setTimeout(() => {
      if (!tryInitialize()) {
        // Try one more time after images might have loaded
        setTimeout(tryInitialize, 500);
      }
    }, 300);
  }
});


// ====== Contact Form (if you're using Formspree) ======
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



// Note: Hamburger menu, AOS initialization, and footer year are handled above in DOMContentLoaded
