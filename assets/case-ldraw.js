/* 설명용 창문 간격 도식. 실제 LDraw 생성기나 검증기를 실행하지 않습니다. */
document.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('[data-spacing-demo]');
  if (!demo) return;
  const input = demo.querySelector('input');
  const value = demo.querySelector('output');
  const formula = demo.querySelector('[data-gap]');
  const description = demo.querySelector('desc');
  const windows = [...demo.querySelectorAll('[data-window]')];
  const update = () => {
    const gap = Number(input.value);
    const positions = windows.map((window, index) => {
      const x = 120 + index * gap;
      window.setAttribute('transform', 'translate(' + x + ' 0)');
      window.querySelector('text').textContent = x;
      return x;
    });
    value.value = String(gap);
    formula.textContent = gap;
    input.setAttribute('aria-valuetext', '간격 ' + gap + ', 창문 중심 ' + positions.join(', '));
    description.textContent = '첫 위치는 120, 간격은 ' + gap + '이며 창문 중심은 ' + positions.join(', ') + '입니다.';
  };
  input.addEventListener('input', update);
  demo.querySelector('.nova-demo-controls').hidden = false;
  update();
});

/* 미리 작성한 가상 전시 계획 비교. 실제 AI 생성·상품 조회·재고 검사는 하지 않습니다. */
document.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('[data-store-demo]');
  if (!demo) return;
  const purpose = demo.querySelector('select');
  const shortage = demo.querySelector('input[type="checkbox"]');
  const plans = [...demo.querySelectorAll('[data-store-plan]')];
  const update = () => {
    plans.forEach((plan) => {
      plan.hidden = plan.dataset.storePlan !== purpose.value;
      plan.querySelectorAll('[data-stock-count], [data-stock-state]').forEach((element) => {
        element.textContent = shortage.checked ? element.dataset.shortage : element.dataset.normal;
      });
      const piece = plan.querySelector('[data-stock-piece]');
      piece.hidden = shortage.checked && plan.dataset.storePlan === 'story';
      piece.classList.toggle('is-reserve', shortage.checked && plan.dataset.storePlan === 'campaign');
    });
  };
  plans.forEach((plan) => plan.querySelector('[data-stock-state]').setAttribute('role', 'status'));
  purpose.addEventListener('change', update);
  shortage.addEventListener('change', update);
  demo.querySelector('.nova-store-controls').hidden = false;
  update();
});
