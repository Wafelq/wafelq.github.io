console.log("modal.js załadowany kurwaaaa");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const images = Array.from(document.querySelectorAll(".ph_w"));
let current = 0;

function show(i) {
  // zapętlenie: po ostatnim wraca do pierwszego i odwrotnie
  current = (i + images.length) % images.length;
  const img = images[current];
  modalImg.src = img.dataset.full || img.src;
  modalImg.alt = img.alt;
}

function openModal(i) {
  show(i);
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // blokuje scroll strony pod spodem
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

const isOpen = () => modal.style.display === "flex";

// otwieranie po kliknięciu w miniaturkę
images.forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));
});

// przyciski
prevBtn.addEventListener("click", () => show(current - 1));
nextBtn.addEventListener("click", () => show(current + 1));
closeBtn.addEventListener("click", closeModal);

// kliknięcie w tło zamyka
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// klawiatura
document.addEventListener("keydown", e => {
  if (!isOpen()) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

// przesuwanie palcem (telefon)
let touchStartX = 0;
modal.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

modal.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    show(dx > 0 ? current - 1 : current + 1);
  }
}, { passive: true });