const timelineBtn = document.getElementById("timelineBtn");
const timeline = document.getElementById("timeline");
const cheerBtn = document.getElementById("cheerBtn");
const cheerMessage = document.getElementById("cheerMessage");
const yearEl = document.getElementById("year");
const statValues = document.querySelectorAll(".value[data-target]");

const cheers = [
  "Crowd goes wild: BEEP BEEP BEEP!",
  "Controller LEDs flash green. Victory mode on.",
  "RoboZards sync complete: 2nd place legends.",
  "Titan Crawler says: mission status = epic.",
];

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
