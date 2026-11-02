// 고정된 가상 사례의 화면 전환. 모델 호출·상품 조회·발송은 수행하지 않는다.
// content-updates.js가 원본 HTML을 기록한 뒤에 화면을 초기화한다.
document.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('[data-journey-demo]');
  if (!demo) return;

  const states = {
    exploring: {
      shelfTitle: '다른 선반 더 보기',
      shelfDetail: '폭 30cm 이하 후보',
      itemsNote: '각 상품을 출발점으로 후보를 찾습니다.',
      takeaway: '상품 종류가 달라도, 같은 일을 위한 선택지로 묶을 수 있습니다.',
      reason: '선반과 수납함은 함께 비교하고, 근거가 약한 장난감 클릭은 별도의 구매 목적으로 키우지 않습니다.'
    },
    finished: {
      shelfTitle: '다른 선반 더 보기',
      shelfDetail: '폭 30cm 이하 후보',
      itemsNote: '이 비교 설계에서는 목적이 끝났다는 정보를 사용하지 않습니다.',
      takeaway: '무엇을 더 보여줄지뿐 아니라, 언제 그만 보여줄지도 정할 수 있습니다.',
      reason: '고객이 끝냈다고 알려준 목적을 기억하면, 다음 방문에서 같은 일을 위한 반복 제안을 멈출 수 있습니다.'
    },
    soldout: {
      shelfTitle: '선반 추천 보류',
      shelfDetail: '폭 조건을 만족하는 후보 품절',
      itemsNote: '두 방식 모두 같은 재고를 확인해 품절 선반을 제외합니다.',
      takeaway: '목적을 이해한 뒤에도, 지금 가능한 선택을 따로 확인해야 합니다.',
      reason: '주방 정리라는 목적은 남아 있습니다. 선반 제안은 보류하고, 비교 가능한 수납함으로 이어줍니다.'
    }
  };
  const inputs = [...demo.querySelectorAll('input[name="journey-state"]')];
  const panels = [...demo.querySelectorAll('[data-demo-panel]')];

  function render(state) {
    if (!Object.hasOwn(states, state)) return;
    const copy = states[state];
    panels.forEach(panel => { panel.hidden = panel.dataset.demoPanel !== state; });
    demo.querySelector('[data-shelf-row]').classList.toggle('is-unavailable', state === 'soldout');
    demo.querySelector('[data-shelf-title]').textContent = copy.shelfTitle;
    demo.querySelector('[data-shelf-detail]').textContent = copy.shelfDetail;
    demo.querySelector('[data-items-note]').textContent = copy.itemsNote;
    demo.querySelector('[data-demo-takeaway]').textContent = copy.takeaway;
    demo.querySelector('[data-demo-reason]').textContent = copy.reason;
  }

  inputs.forEach(input => input.addEventListener('change', () => {
    if (input.checked) render(input.value);
  }));
  demo.querySelector('[data-demo-reset]').addEventListener('click', () => {
    inputs.forEach(input => { input.checked = input.defaultChecked; });
    render('exploring');
  });
  render(inputs.find(input => input.checked)?.value || 'exploring');
  demo.querySelector('[data-demo-controls]').hidden = false;
}, { once: true });
