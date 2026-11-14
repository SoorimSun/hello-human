// Illustrative states only: no model requests, caching, or performance measurement.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-fc-replay]');
  if (!root) return;
  const scenarios = {
    repeat: [
      ['같은 변경을 한 번 더 물어봅니다', '배송비 amount가 문자열로 바뀐 안내서 v2와 같은 프로그램 사용 명세를 받았습니다. 앞선 요청의 답이 저장돼 있습니다.', '상태 · 접수 / 이번 요청의 모델 호출 0회'],
      ['저장한 답을 써도 되는지 확인합니다', '질문, 입력 자료, 읽기 권한과 처리 설정이 앞선 요청과 같습니다. 현재 권한도 유효해 저장한 답을 확인합니다.', '상태 · 일치 / 재사용 후보 1건'],
      ['근거와 프로그램 이름을 검사합니다', '인용한 구절이 현재 안내서에 있고, 답에 적힌 프로그램도 사용 명세에 있습니다. 이 검사만으로 정산 프로그램을 빠뜨리지 않았다고 보장할 수는 없습니다.', '상태 · 자동 검사 통과 / 모델 호출 0회'],
      ['저장된 분석을 반환합니다', '조회와 자동 검사에 든 시간을 실행 시간에 포함합니다. 반환한 답의 정답 여부는 실행 후 기대 결과와 비교합니다. 기존 오답이 재사용될 가능성도 평가합니다.', '최종 · 반환 / 모델 호출 0회 / 정답 여부 별도 평가']
    ],
    revision: [
      ['같은 질문, 달라진 응답 형식입니다', 'API 안내서가 v2로 바뀌었습니다. amount 필드의 자료형이 숫자에서 문자열로 달라졌고, 캐시에는 v1의 결과가 남아 있습니다.', '상태 · 접수 / 문서 v2, 캐시 v1'],
      ['이전 버전의 답은 쓰지 않습니다', '안내서 내용이 달라졌으므로 저장한 답의 재사용 조건을 만족하지 않습니다. 질문이 같아도 v1의 답을 대신 돌려주지 않습니다.', '상태 · 저장한 답 미사용 / 모델 호출 0회'],
      ['프로그램이 자료형 변경 규칙을 적용합니다', '프로그램이 amount의 자료형 변경을 찾아, 개발자가 미리 정한 규칙에 따라 고성능 모델을 고릅니다. 모델은 안내서와 사용 명세를 읽고 고쳐야 할 프로그램과 근거를 답합니다.', '상태 · 분석 / 고성능 모델 호출 1회'],
      ['새 안내서 기준의 답을 저장합니다', '형식과 근거의 존재를 확인하는 자동 검사를 통과했다고 가정합니다. 답을 반환하고 저장합니다. 정산 프로그램을 빠뜨렸는지는 실행 후 정답지로 따로 채점합니다.', '최종 · 반환 / 모델 호출 1회 / v2 저장·정답 여부 별도 평가']
    ],
    permission: [
      ['같은 문서의 접근 권한이 바뀝니다', '질문과 문서 v1은 같지만, 요청자의 해당 문서 읽기 권한이 회수됐습니다.', '상태 · 접수 / 기존 결과는 저장돼 있음'],
      ['캐시 내용보다 권한을 먼저 확인합니다', '현재 권한 검사에서 조회 불가로 판정합니다. 예전에 읽을 수 있었다는 기록으로 지금의 권한을 대신하지 않습니다.', '상태 · 접근 거절 / 모델 호출 0회'],
      ['결과 읽기와 모델 호출을 건너뜁니다', '저장된 분석 내용도 요청자에게 공개하지 않습니다. 거절 사유만 남깁니다.', '상태 · 처리 중단 / 캐시 내용 반환 0건'],
      ['거절 상태를 반환합니다', '접근 거절은 업무 완료로 세지 않습니다. 정상 요청과 별도로 둔 권한 실패 검사에서 기대하는 동작입니다.', '최종 · 거절 / 모델 호출 0회 / 결과 미공개']
    ],
    retry: [
      ['설명 문구만 바뀐 요청을 받습니다', '프로그램이 한 API의 설명 문구만 바뀌고 다른 항목은 그대로임을 확인합니다. 저장한 답이 없어, 개발자가 정한 규칙에 따라 저비용 모델에 먼저 맡깁니다.', '상태 · 접수 / 캐시 미사용'],
      ['첫 결과의 근거가 맞지 않습니다', '저비용 모델이 존재하지 않는 필드를 근거로 들었습니다. 검증기가 반려하고 잘못된 결과는 저장하지 않습니다.', '상태 · 검증 실패 / 저비용 모델 호출 1회'],
      ['고성능 모델로 한 번만 재시도합니다', '같은 입력과 검증 실패 사유를 전달하지만, 이번에도 필수 근거가 빠졌다고 가정합니다. 재시도 상한에 도달했습니다.', '상태 · 재검증 실패 / 누적 모델 호출 2회'],
      ['보류하고 검토를 요청합니다', '오류 결과를 정답이나 캐시 적중으로 세지 않습니다. 두 호출의 비용과 대기 시간은 모두 기록하고, 검토할 입력과 실패 사유를 남깁니다.', '최종 · 보류 / 모델 호출 2회 / 캐시 저장 0건']
    ]
  };
  const select = root.querySelector('select');
  const previous = root.querySelector('[data-previous]');
  const next = root.querySelector('[data-next]');
  const steps = Array.from(root.querySelectorAll('.fc-steps li'));
  let step = 0;
  function render() {
    const current = scenarios[select.value][step];
    root.querySelector('[data-step-label]').textContent = `${step + 1} / 4 · 미리 정한 기대 상태`;
    root.querySelector('[data-step-title]').textContent = current[0];
    root.querySelector('[data-step-body]').textContent = current[1];
    root.querySelector('[data-step-result]').textContent = current[2];
    previous.disabled = step === 0;
    next.disabled = step === 3;
    steps.forEach((item, i) => {
      if (i === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
  }
  select.addEventListener('change', () => { step = 0; render(); });
  previous.addEventListener('click', () => { step = Math.max(0, step - 1); render(); });
  next.addEventListener('click', () => { step = Math.min(3, step + 1); render(); });
  render();
  root.hidden = false;
});
