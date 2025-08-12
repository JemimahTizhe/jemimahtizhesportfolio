//Beginning of Bottom Footer
document.getElementById("year").textContent = new Date().getFullYear();
// Ending of Bottom Footer

//Beginning of LS Logo Page

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const images = document.querySelectorAll(".modal-trigger");
  const closeBtn = document.querySelector(".close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }

//Ending of LS Logo Page 

//Beginning of Auspisprime Page


//Ending of Auspisprime Page