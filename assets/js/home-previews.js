const previews = [...document.querySelectorAll('video')];
const toggle = document.querySelector('.preview-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const visible = new Set();
let playing = !reducedMotion.matches;

function updatePreviews() {
  previews.forEach(video => {
    if (playing && visible.has(video)) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
  toggle.textContent = playing ? 'Pause previews' : 'Play previews';
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      visible.add(target);
    } else {
      visible.delete(target);
    }
  });
  updatePreviews();
}, { threshold: 0.15 });

previews.forEach(video => observer.observe(video));
toggle.addEventListener('click', () => {
  playing = !playing;
  updatePreviews();
});
reducedMotion.addEventListener('change', event => {
  playing = !event.matches;
  updatePreviews();
});
updatePreviews();
toggle.hidden = false;
