const timelineBtn = document.getElementById("timelineBtn");
const timeline = document.getElementById("timeline");
const cheerBtn = document.getElementById("cheerBtn");
const cheerMessage = document.getElementById("cheerMessage");
const yearEl = document.getElementById("year");
const statValues = document.querySelectorAll(".value[data-target]");
const gallerySectionsRoot = document.getElementById("gallerySections");

const GALLERY_IMAGE_BASE_PATH = "assets/images/";

// Add new images by creating entries with only `file` and `caption`.
const gallerySectionsData = [
  {
    section: "Achievement",
    images: [
      {
        file: "2nd-place-badge.webp",
        caption: "Team Robozards won 2nd place at Blueprint 2026.",
      },
    ],
  },
  {
    section: "Project Moments",
    images: [
      {
        file: "2nd-place-badge.webp",
        caption: "Recognition for our smart home safety project.",
      },
    ],
  },
];

const cheers = [
  "Crowd goes wild: BEEP BEEP BEEP!",
  "Controller LEDs flash green. Victory mode on.",
  "RoboZards sync complete: 2nd place legends.",
  "Titan Crawler says: mission status = epic.",
];

function buildImagePath(fileName) {
  return `${GALLERY_IMAGE_BASE_PATH}${fileName}`;
}

function renderGallerySections(container, sections) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  sections.forEach(({ section, images }) => {
    if (!Array.isArray(images) || images.length === 0) {
      return;
    }

    const sectionEl = document.createElement("section");
    sectionEl.className = "gallery-section";

    const titleEl = document.createElement("h3");
    titleEl.textContent = section;
    sectionEl.appendChild(titleEl);

    const gridEl = document.createElement("div");
    gridEl.className = "gallery-grid";

    images.forEach(({ file, caption }) => {
      const cardEl = document.createElement("figure");
      cardEl.className = "gallery-item";

      const imgEl = document.createElement("img");
      imgEl.src = buildImagePath(file);
      imgEl.alt = caption || file;
      imgEl.loading = "lazy";

      const captionEl = document.createElement("figcaption");
      captionEl.className = "gallery-caption";
      captionEl.textContent = caption || file;

      cardEl.appendChild(imgEl);
      cardEl.appendChild(captionEl);
      gridEl.appendChild(cardEl);
    });

    sectionEl.appendChild(gridEl);
    container.appendChild(sectionEl);
  });
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 1200;
  const frameRate = 1000 / 60;
  const steps = Math.max(1, Math.floor(duration / frameRate));
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      el.textContent = String(target);
      clearInterval(timer);
      return;
    }

    el.textContent = String(Math.floor(current));
  }, frameRate);
}

statValues.forEach((el) => {
  const target = Number(el.dataset.target);
  if (!Number.isNaN(target)) {
    animateCounter(el, target);
  }
});

if (timelineBtn && timeline) {
  timelineBtn.addEventListener("click", () => {
    timeline.classList.toggle("hidden");
  });
}

if (cheerBtn && cheerMessage) {
  cheerBtn.addEventListener("click", () => {
    const random = Math.floor(Math.random() * cheers.length);
    cheerMessage.textContent = cheers[random];
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

renderGallerySections(gallerySectionsRoot, gallerySectionsData);
