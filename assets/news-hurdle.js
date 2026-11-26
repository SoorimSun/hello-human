document.addEventListener('DOMContentLoaded', () => {
  const calculator = document.getElementById('ax-calculator');
  const controls = calculator.querySelector('.ax-controls');
  const cases = document.getElementById('ax-cases');
  const repeats = document.getElementById('ax-repeats');

  function updateEstimate() {
    const models = Number(controls.querySelector('input[name="ax-models"]:checked').value);
    const total = cases.valueAsNumber * repeats.valueAsNumber * 4 * models;
    document.getElementById('ax-cases-value').textContent = cases.value + '개';
    document.getElementById('ax-repeats-value').textContent = repeats.value + '회';
    document.getElementById('ax-runs').textContent = total.toLocaleString('ko-KR') + '회';
    document.getElementById('ax-formula').textContent =
      `평가 사례 ${cases.value}개 × 반복 ${repeats.value}회 × 조건 4종 × 모델 ${models}개`;
  }

  controls.addEventListener('input', updateEstimate);
  updateEstimate();
  controls.hidden = false;
});
