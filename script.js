const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".testimonial-card"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const navLinks = document.querySelectorAll(".nav-links a");

let index = 0;
let intervalId;

const updateCarousel = () => {
  const offset = index * -100;
  track.style.transform = `translateX(${offset}%)`;
};

const nextSlide = () => {
  index = (index + 1) % slides.length;
  updateCarousel();
};

const prevSlide = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
};

const startAutoSlide = () => {
  intervalId = setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
  clearInterval(intervalId);
};

nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

track.addEventListener("mouseenter", stopAutoSlide);
track.addEventListener("mouseleave", startAutoSlide);

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

startAutoSlide();
