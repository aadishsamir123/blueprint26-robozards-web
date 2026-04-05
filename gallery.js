const gallerySectionsRoot = document.getElementById("gallerySections");
const galleryModal = document.getElementById("galleryModal");
const galleryModalDialog = document.querySelector(".gallery-modal-dialog");
const galleryModalImage = document.getElementById("galleryModalImage");
let galleryModalVideo = document.getElementById("galleryModalVideo");
const galleryModalCaption = document.getElementById("galleryModalCaption");
const galleryModalClose = document.getElementById("galleryModalClose");

if (!galleryModalVideo && galleryModalDialog && galleryModalCaption) {
  galleryModalVideo = document.createElement("video");
  galleryModalVideo.id = "galleryModalVideo";
  galleryModalVideo.className = "gallery-modal-video hidden";
  galleryModalVideo.controls = true;
  galleryModalVideo.playsInline = true;
  galleryModalVideo.preload = "metadata";
  galleryModalVideo.setAttribute("aria-label", "Gallery video");
  galleryModalDialog.insertBefore(galleryModalVideo, galleryModalCaption);
}

const GALLERY_IMAGE_BASE_PATH = "assets/images/gallery/";

// Add new images by creating entries with only `file` and `caption`.
const gallerySectionsData = [
  {
    section: "VICTORY",
    images: [
      {
        file: "winning_1.JPG",
        caption: "VICTORY - 2nd Place in Beginner Category!",
      },
    ],
  },
  {
    section: "Building",
    images: [
      { file: "team.JPG", caption: "Group Pic" },
      { file: "ishat_claude.JPG", caption: "Ishat and Claude" },
      { file: "cook_1.JPG", caption: "Grinding" },
      { file: "cook_2.JPG", caption: "More grinding" },
      { file: "cook_7.JPG", caption: "More grinding" },
      {
        file: "cook_4.JPG",
        caption: "Our pre-built house which unfortunately got rejected :(",
      },
      { file: "cook_5.JPG", caption: "Making PPT" },
      { file: "cook_6.JPG", caption: "Connecting wires" },
    ],
  },
  {
    section: "Project Photos",
    images: [
      { file: "judging_7.JPG", caption: "Our whole project" },
      { file: "judging_8.JPG", caption: "Project from the side" },
      { file: "judging_6.JPG", caption: "Project from another side" },
      { file: "project_4.jpeg", caption: "The water sensor" },
      { file: "project_5.jpeg", caption: "The monitor display" },
      { file: "project_6.jpeg", caption: "An improved UI" },
      {
        file: "project_7.jpeg",
        caption: "The display being a piece of garbage and not working",
      },
      { file: "project_8.jpeg", caption: "The project has come together!" },
      { file: "project_9.jpeg", caption: "Mess of wiring" },
      { file: "project_10.mp4", caption: "Turning on the project" },
      { file: "project_11.mp4", caption: "More mess of wiring" },
      { file: "project_12.mp4", caption: "Soil moisture sensor in action" },
      { file: "project_13.mp4", caption: "Big Red Button™ fixing the display" },
    ],
  },
  {
    section: "Judging",
    images: [
      { file: "judging_1.JPG", caption: "" },
      { file: "judging_2.JPG", caption: "" },
      { file: "judging_3.JPG", caption: "" },
      { file: "judging_4.JPG", caption: "" },
      { file: "judging_5.JPG", caption: "" },
    ],
  },
];

function buildImagePath(fileName) {
  return `${GALLERY_IMAGE_BASE_PATH}${fileName}`;
}

function getMediaType(fileName) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);
  return videoExtensions.has(extension) ? "video" : "image";
}

function openGalleryModal(mediaPath, caption, mediaType) {
  if (
    !galleryModal ||
    !galleryModalImage ||
    !galleryModalVideo ||
    !galleryModalCaption
  ) {
    return;
  }

  const isVideo = mediaType === "video";

  if (isVideo) {
    galleryModalImage.classList.add("hidden");
    galleryModalImage.src = "";
    galleryModalVideo.src = mediaPath;
    galleryModalVideo.classList.remove("hidden");
    galleryModalVideo.load();
  } else {
    galleryModalVideo.pause();
    galleryModalVideo.classList.add("hidden");
    galleryModalVideo.src = "";
    galleryModalImage.src = mediaPath;
    galleryModalImage.alt = caption || "Gallery image";
    galleryModalImage.classList.remove("hidden");
  }

  galleryModalCaption.textContent = caption || "";
  galleryModal.classList.remove("hidden");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
  if (
    !galleryModal ||
    !galleryModalImage ||
    !galleryModalVideo ||
    !galleryModalCaption
  ) {
    return;
  }

  galleryModal.classList.add("hidden");
  galleryModal.setAttribute("aria-hidden", "true");
  galleryModalImage.src = "";
  galleryModalImage.classList.remove("hidden");
  galleryModalVideo.pause();
  galleryModalVideo.src = "";
  galleryModalVideo.classList.add("hidden");
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
      const mediaType = getMediaType(file);
      const mediaPath = buildImagePath(file);

      const cardEl = document.createElement("figure");
      cardEl.className = "gallery-item";
      if (mediaType === "video") {
        cardEl.classList.add("gallery-item-video");
      }
      cardEl.tabIndex = 0;
      cardEl.setAttribute("role", "button");
      cardEl.setAttribute(
        "aria-label",
        `Open ${mediaType}: ${caption || file}`,
      );

      let previewEl;

      if (mediaType === "video") {
        const videoEl = document.createElement("video");
        videoEl.src = mediaPath;
        videoEl.preload = "metadata";
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.setAttribute("aria-label", caption || file);
        previewEl = videoEl;
      } else {
        const imgEl = document.createElement("img");
        imgEl.src = mediaPath;
        imgEl.alt = caption || file;
        imgEl.loading = "lazy";
        previewEl = imgEl;
      }

      const captionEl = document.createElement("figcaption");
      captionEl.className = "gallery-caption";
      captionEl.textContent = caption || file;

      cardEl.appendChild(previewEl);

      if (mediaType === "video") {
        const badgeEl = document.createElement("span");
        badgeEl.className = "gallery-video-badge";
        badgeEl.setAttribute("aria-hidden", "true");
        badgeEl.textContent = "VIDEO";
        cardEl.appendChild(badgeEl);
      }

      cardEl.appendChild(captionEl);

      cardEl.addEventListener("click", () => {
        openGalleryModal(mediaPath, caption || file, mediaType);
      });

      cardEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openGalleryModal(mediaPath, caption || file, mediaType);
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
