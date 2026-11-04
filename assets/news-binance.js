// Reveal authored report summaries. No requests, simulation or incident reconstruction.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('attack-flow');
  if (!root) return;
  const panels = [...root.querySelectorAll('[data-incident-panel]')];
  const steps = [...root.querySelectorAll('[data-incident-step]')];
  const navigation = root.querySelector('[data-incident-navigation]');
  const previous = root.querySelector('[data-incident-prev]');
  const next = root.querySelector('[data-incident-next]');
  const all = root.querySelector('[data-incident-all]');
  const status = root.querySelector('[data-incident-status]');
  let selected = 0;
  let expanded = false;

  function render() {
    root.toggleAttribute('data-expanded', expanded);
    panels.forEach((panel, index) => { panel.hidden = !expanded && index !== selected; });
    steps.forEach((button, index) => {
      if (!expanded && index === selected) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    previous.disabled = expanded || selected === 0;
    next.disabled = expanded || selected === panels.length - 1;
    status.textContent = expanded ? `전체 ${panels.length}단계` : `${selected + 1} / ${panels.length}`;
    status.setAttribute('aria-label', expanded ? `전체 ${panels.length}단계 표시` : `${selected + 1}단계, ${panels[selected].querySelector('h3').textContent}`);
    all.textContent = expanded ? '한 단계씩 보기' : '전체 펼치기';
    all.setAttribute('aria-expanded', String(expanded));
  }

  function select(index) {
    selected = Math.max(0, Math.min(index, panels.length - 1));
    expanded = false;
    render();
  }

  steps.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: steps.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      select(target);
      steps[selected].focus();
    });
  });
  previous.addEventListener('click', () => select(selected - 1));
  next.addEventListener('click', () => select(selected + 1));
  all.addEventListener('click', () => { expanded = !expanded; render(); });
  root.setAttribute('data-enhanced', '');
  render();
  navigation.hidden = false;
}, { once: true });
