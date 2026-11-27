document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('request-budget');
  const inputs = document.getElementById('budget-inputs');
  const field = name => Number(inputs.querySelector(`[name="${name}"]`).value);
  const show = (name, value) => {
    panel.querySelector(`[data-result="${name}"]`).textContent = value;
  };
  const count = n => `${n.toLocaleString('ko-KR')}회`;

  function update() {
    const perCondition = field('scenarios') * field('repeats');
    const pages = perCondition * field('pages');
    const calls = perCondition * field('api');
    const difference = Math.abs(100 * (calls - pages) / pages);
    let change = '변화 없음';
    if (calls !== pages) {
      change = `${difference.toFixed(1)}% ${calls < pages ? '감소' : '증가'}`;
    }
    show('runs', count(perCondition * 3));
    show('pages', count(pages));
    show('api', count(calls));
    show('change', change);
  }

  inputs.hidden = false;
  inputs.addEventListener('change', update);
  update();
});
