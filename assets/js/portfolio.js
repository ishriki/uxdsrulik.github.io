const audit = document.querySelector('[data-audit]');
if (audit) {
  const steps = [...audit.querySelectorAll('[data-audit-step]')];
  const controls = audit.querySelector('[data-audit-controls]');
  const previous = controls.querySelector('[data-prev]');
  const next = controls.querySelector('[data-next]');
  const status = controls.querySelector('[data-audit-status]');
  let current = 0;

  function showStep(index) {
    current = index;
    steps.forEach((step, position) => {
      step.hidden = position !== current;
    });
    status.textContent = `Step ${current + 1} of ${steps.length}`;
    previous.disabled = current === 0;
    next.disabled = current === steps.length - 1;
    if (previous.disabled && document.activeElement === previous) next.focus();
    if (next.disabled && document.activeElement === next) previous.focus();
  }

  previous.addEventListener('click', () => showStep(current - 1));
  next.addEventListener('click', () => showStep(current + 1));
  showStep(current);
  controls.hidden = false;
}

const tracker = document.querySelector('[data-tracker]');
if (tracker) {
  const button = tracker.querySelector('[data-replay]');
  const status = tracker.querySelector('[data-tracker-status]');
  const stages = [...tracker.querySelectorAll('li')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  function showStage(index) {
    stages.forEach((stage, position) => {
      stage.toggleAttribute('data-reached', position <= index);
      stage.removeAttribute('aria-current');
    });
    stages[index].setAttribute('aria-current', 'step');
    status.textContent = stages[index].textContent;
  }

  button.hidden = false;
  button.addEventListener('click', () => {
    clearInterval(timer);
    let current = motion.matches ? stages.length - 1 : 0;
    showStage(current);
    if (motion.matches) return;

    timer = setInterval(() => {
      current += 1;
      showStage(current);
      if (current === stages.length - 1) clearInterval(timer);
    }, 900);
  });
}
