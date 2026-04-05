const gallerySectionsRoot = document.getElementById("gallerySections");
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalCaption = document.getElementById("galleryModalCaption");
const galleryModalClose = document.getElementById("galleryModalClose");

const GALLERY_IMAGE_BASE_PATH = "assets/images/";

// Add new images by creating entries with only `file` and `caption`.
const gallerySectionsData = [
  {
    section: "Project Photos",
    images: [],
  },
  {
    section: "Our Achievements",
    images: [],
  },
];

function buildImagePath(fileName) {
  return `${GALLERY_IMAGE_BASE_PATH}${fileName}`;
}

function openGalleryModal(imagePath, caption) {
  if (!galleryModal || !galleryModalImage || !galleryModalCaption) {
    return;
  }

  galleryModalImage.src = imagePath;
  galleryModalImage.alt = caption || "Gallery image";
  galleryModalCaption.textContent = caption || "";
  galleryModal.classList.remove("hidden");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
  if (!galleryModal || !galleryModalImage || !galleryModalCaption) {
    return;
  }

  galleryModal.classList.add("hidden");
  galleryModal.setAttribute("aria-hidden", "true");
  galleryModalImage.src = "";
  galleryModalCaption.textContent = "";
  document.body.style.overflow = "";
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
      cardEl.tabIndex = 0;
      cardEl.setAttribute("role", "button");
      cardEl.setAttribute("aria-label", `Open image: ${caption || file}`);

      const imgEl = document.createElement("img");
      const imagePath = buildImagePath(file);
      imgEl.src = imagePath;
      imgEl.alt = caption || file;
      imgEl.loading = "lazy";

      const captionEl = document.createElement("figcaption");
      captionEl.className = "gallery-caption";
      captionEl.textContent = caption || file;

      cardEl.appendChild(imgEl);
      cardEl.appendChild(captionEl);

      cardEl.addEventListener("click", () => {
        openGalleryModal(imagePath, caption || file);
      });

      cardEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openGalleryModal(imagePath, caption || file);
        }
      });

      gridEl.appendChild(cardEl);
    });

    sectionEl.appendChild(gridEl);
    container.appendChild(sectionEl);
  });
}

if (galleryModalClose) {
  galleryModalClose.addEventListener("click", closeGalleryModal);
}

if (galleryModal) {
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeGalleryModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGalleryModal();
  }
});

renderGallerySections(gallerySectionsRoot, gallerySectionsData);
