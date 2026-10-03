// 설명용 가정 계산기. 실제 수요를 예측하거나 외부 서비스에 값을 보내지 않는다.
// Record the authored content before calculator output changes the displayed DOM.
document.addEventListener('DOMContentLoaded', () => {
  const calculator = document.querySelector('[data-promotion-calculator]');

  if (calculator) {
    const controls = calculator.querySelector('[data-calculator-controls]');
    const inputs = [...calculator.querySelectorAll('input[type="range"]')];
    const cards = [...calculator.querySelectorAll('[data-plan]')];
    const summary = calculator.querySelector('[data-calculator-summary]');
    const won = new Intl.NumberFormat('ko-KR');
    const names = ['추가 할인 없음', '5,000원 할인', '10,000원 할인'];
    const margins = [26000, 21000, 16000];

    function update() {
      const quantities = [100, ...inputs.map(input => Number(input.value))];
      const profits = quantities.map((quantity, index) => quantity * margins[index]);
      const maximum = Math.max(...profits);
      const leaders = names.filter((_, index) => profits[index] === maximum);

      inputs.forEach(input => {
        calculator.querySelector(`output[for="${input.id}"]`).value = `${input.value}개`;
        input.setAttribute('aria-valuetext', `${input.value}개`);
      });
      cards.forEach((card, index) => {
        card.classList.toggle('is-best', profits[index] === maximum);
        card.querySelector('[data-quantity]').textContent = `${quantities[index]}개`;
        card.querySelector('[data-profit]').textContent = `${won.format(profits[index])}원`;
        card.querySelector('[data-profit-bar]').style.setProperty('--bar', `${profits[index] / maximum * 100}%`);
      });

      const gap = profits[1] - profits[2];
      const comparison = gap === 0
        ? '두 할인안의 총 공헌이익이 같습니다.'
        : `${gap > 0 ? '5,000원' : '10,000원'} 할인안이 다른 할인안보다 ${won.format(Math.abs(gap))}원 더 남습니다.`;
      summary.textContent = `현재 가정에서 총 공헌이익 ${leaders.length > 1 ? '공동 ' : ''}1위: ${leaders.join(' · ')}. ${comparison} 판매량 가정이 바뀌면 결론도 달라집니다.`;
    }

    inputs.forEach(input => input.addEventListener('input', update));
    calculator.querySelector('[data-calculator-reset]').addEventListener('click', () => {
      inputs.forEach(input => { input.value = input.defaultValue; });
      update();
    });
    update();
    controls.hidden = false;
  }
}, { once: true });
