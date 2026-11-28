document.addEventListener('DOMContentLoaded', () => {
  const model = document.getElementById('hours-model');
  const controls = model.querySelector('fieldset');
  const projects = controls.querySelector('[name="projects"]');
  const baseline = controls.querySelector('[name="baseline"]');
  const review = controls.querySelector('[name="review"]');
  const setup = controls.querySelector('[name="setup"]');

  function updateHours() {
    const manualHours = Number(projects.value) * Number(baseline.value);
    const assistedHours = Number(setup.value) + Number(projects.value) * Number(review.value);
    const savedHours = manualHours - assistedHours;
    const percent = (Math.abs(savedHours) / manualHours * 100).toFixed(1);
    let change = '두 방식의 작업시간이 같습니다 (차이 0시간)';
    if (savedHours > 0) change = `${savedHours}시간 절감 (${percent}% 감소)`;
    if (savedHours < 0) change = `${-savedHours}시간 추가 (${percent}% 증가)`;

    model.querySelector('[data-hours="baseline"]').textContent = `${manualHours}시간`;
    model.querySelector('[data-hours="assisted"]').textContent = `${assistedHours}시간`;
    model.querySelector('[data-hours="delta"]').textContent = change;
    model.querySelector('[data-hours="formula"]').textContent =
      `직접 조사 ${projects.value} × ${baseline.value} = ${manualHours}시간 · 에이전트 활용 ${setup.value} + ${projects.value} × ${review.value} = ${assistedHours}시간`;
  }

  controls.hidden = false;
  controls.addEventListener('change', updateHours);
  updateHours();
});
