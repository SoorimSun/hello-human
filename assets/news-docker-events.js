document.addEventListener('DOMContentLoaded', () => {
  const simulator = document.querySelector('.events-simulator');
  const share = simulator.querySelector('#analysis-share');
  const percent = simulator.querySelector('[data-event-percent]');
  const count = simulator.querySelector('[data-event-count]');
  const reduction = simulator.querySelector('[data-event-reduction]');

  function updateCounts() {
    const selected = share.valueAsNumber;
    const skipped = 100 - selected;
    percent.textContent = selected + '%';
    count.textContent = selected + '건';
    reduction.textContent = skipped + '건(' + skipped + '%)';
    share.setAttribute('aria-valuetext', selected + '퍼센트');
  }

  share.addEventListener('input', updateCounts);
  updateCounts();
  simulator.querySelector('.events-slider').hidden = false;
});
