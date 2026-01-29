const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".testimonial-card"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const navLinks = document.querySelectorAll(".nav-links a");
const loader = document.querySelector(".page-loader");
const revealItems = document.querySelectorAll(".reveal-on-scroll");

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

const showPage = () => {
  if (!loader) {
    return;
  }
  loader.classList.add("hidden");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1200);
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  setTimeout(showPage, 1200);
});

const observer = new IntersectionObserver(
  (entries, observe) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observe.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
