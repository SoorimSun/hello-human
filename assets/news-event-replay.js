// Authored explanatory states, not a promotion engine or a model evaluation.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('event-replay');
  if (!root) return;

  const cases = {
    cancel: {
      context: '기존 99명은 그대로 두고, 마지막 한 자리의 A와 대기자 B를 봅니다. 두 사람 모두 출석·퀴즈 조건은 채웠습니다.',
      steps: [
        { title: '취소 전', action: 'A가 마지막 자리를 예약하고, B는 기다립니다.',
          members: [['A', '예약', '유효 구매액 55,000원', 'active'], ['B', '대기 1번', '유효 구매액 60,000원', 'waiting']],
          seats: { occupied: 100, last: 'A 예약', queue: 'B 대기 1번' },
          result: '예약은 아직 지급이 아닙니다. 취소가 생기면 자격을 다시 확인합니다.' },
        { title: '구매 취소', action: '종료 전에 A가 10,000원을 취소합니다.',
          members: [['A', '자격 상실', '55,000 − 10,000 = 45,000원', 'changed'], ['B', '승계 대기', '유효 구매액 60,000원', 'waiting']],
          seats: { occupied: 99, last: '빈자리', queue: 'B 승계 대기' },
          result: '5만 원 조건을 충족하지 못해 A의 예약을 해제합니다. 그림은 승계 직전의 판단 순서를 나누어 보여줍니다.' },
        { title: '대기자 승계', action: '자격을 유지한 대기자 B에게 빈자리를 넘깁니다.',
          members: [['A', '예약 해제', '유효 구매액 45,000원', 'changed'], ['B', '예약', '유효 구매액 60,000원', 'active']],
          seats: { occupied: 100, last: 'B 예약', queue: '대기자 없음' },
          result: '예약자는 다시 100명입니다. A에게 지급하지 않고 B의 예약을 유지합니다.' },
      ],
    },
    race: {
      context: '99명이 예약한 상태입니다. A와 B는 같은 시각에 모든 참여 조건을 채우지만, 남은 자리는 하나입니다.',
      steps: [
        { title: '한 자리 남음', action: 'A와 B가 마지막 자리에 참여하려고 합니다.',
          members: [['A', '접수 전', '참여 조건 모두 충족', 'waiting'], ['B', '접수 전', '참여 조건 모두 충족', 'waiting']],
          seats: { occupied: 99, last: '빈자리', queue: '접수 대기' },
          result: '남은 자리가 보인다는 이유로 두 사람에게 각각 예약을 약속하면 안 됩니다.' },
        { title: '접수 순번 확인', action: '같은 시각의 요청을 서버가 기록한 순번으로 구분합니다.',
          members: [['A', '접수 501번', '먼저 기록된 요청', 'active'], ['B', '접수 502번', '다음에 기록된 요청', 'waiting']],
          seats: { occupied: 99, last: '순번 확인 중', queue: '501 → 502' },
          result: '예시에서는 A가 앞섭니다. 예약 확정과 잔여 수량 차감은 한 번의 처리로 묶어야 합니다.' },
        { title: '한 명만 예약', action: 'A의 예약을 확정하고 B는 대기자로 남깁니다.',
          members: [['A', '예약', '접수 501번', 'active'], ['B', '대기 1번', '접수 502번', 'waiting']],
          seats: { occupied: 100, last: 'A 예약', queue: 'B 대기 1번' },
          result: '101번째 예약이 생기면 실패입니다. 실제 동시 요청을 보내 이 조건이 지켜지는지는 별도 구현에서 시험합니다.' },
      ],
    },
    attendance: {
      context: 'A는 퀴즈와 구매 조건을 이미 채웠습니다. 출석은 누른 횟수 대신 한국시간 기준 서로 다른 날짜를 셉니다.',
      steps: [
        { title: '첫 출석', action: 'A가 월요일에 출석 버튼을 한 번 누릅니다.',
          members: [['A', '출석 미달', '출석 1일 / 필요한 3일', 'waiting']],
          days: [1, 0, 0, 0, 0, 0, 0], dayCount: 1,
          result: '월요일 출석 기록 하나가 생깁니다. 나머지 조건을 채웠어도 아직 참여 자격은 없습니다.' },
        { title: '같은 날 세 번', action: '월요일에 출석 버튼을 두 번 더 누릅니다.',
          members: [['A', '여전히 출석 미달', '버튼 3번 → 출석은 1일', 'waiting']],
          days: [3, 0, 0, 0, 0, 0, 0], dayCount: 1,
          result: '같은 날짜의 중복 참여로 출석 일수가 늘어나면 실패입니다.' },
        { title: '다른 날짜 추가', action: '화요일과 수요일에 한 번씩 더 출석합니다.',
          members: [['A', '참여 자격 충족', '출석 3일 / 필요한 3일', 'active']],
          days: [3, 1, 1, 0, 0, 0, 0], dayCount: 3,
          result: '서로 다른 3일을 채웠습니다. 보상 예약 여부는 이후 선착순과 남은 수량으로 결정합니다.' },
      ],
    },
    retry: {
      context: '이벤트 종료 24시간 뒤, 원천 이력 대조를 마쳤고 A의 지급 자격을 확정했다고 가정합니다. 모의 지급 한 건만 봅니다.',
      steps: [
        { title: '지급 요청', action: 'A에게 5,000포인트를 지급할 고유 번호를 만듭니다.',
          members: [['A', '지급 준비', '지급 번호 EVENT-A', 'waiting']],
          payout: { requests: 0, count: 0, points: 0, receipt: '요청 준비' },
          result: '같은 이벤트·회원에게 다시 요청해도 이 지급 번호를 그대로 사용합니다.' },
        { title: '응답 끊김', action: '지급은 처리됐지만, 요청한 쪽이 완료 응답을 받지 못했습니다.',
          members: [['A', '처리 결과 확인 필요', '서버에는 EVENT-A 지급 기록이 있음', 'changed']],
          payout: { requests: 1, count: 1, points: 5000, receipt: '완료 응답을 받지 못함' },
          result: '응답을 못 받았다고 지급까지 실패한 것은 아닙니다. 새 지급 번호를 만들면 중복 지급 위험이 생깁니다.' },
        { title: '같은 번호로 재요청', action: 'EVENT-A로 다시 요청해 이미 처리된 결과를 받습니다.',
          members: [['A', '지급 확인', '새 지급 없이 기존 결과 반환', 'active']],
          payout: { requests: 2, count: 1, points: 5000, receipt: '기존 지급 결과 확인' },
          result: '요청은 두 번이어도 지급은 한 번, 합계는 5,000포인트입니다.' },
      ],
    },
  };

  const app = root.querySelector('.event-replay-app');
  const select = root.querySelector('select');
  const stage = root.querySelector('[data-stage]');
  const progress = root.querySelector('[data-progress]');
  const previous = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  const position = root.querySelector('[data-position]');
  let stepIndex = 0;
  const number = value => value.toLocaleString('ko-KR');

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function render() {
    const current = cases[select.value];
    const step = current.steps[stepIndex];
    root.querySelector('[data-context]').textContent = current.context;
    progress.replaceChildren(...current.steps.map((item, index) => {
      const node = element('li', '', `${index + 1}. ${item.title}`);
      if (index === stepIndex) node.setAttribute('aria-current', 'step');
      return node;
    }));
    stage.replaceChildren(element('p', 'event-action', step.action));
    const members = element('div', 'event-members');
    for (const [name, status, fact, tone] of step.members) {
      const member = element('div', `event-member is-${tone}`);
      member.append(element('span', 'event-avatar', name));
      const copy = element('div', 'event-member-copy');
      copy.append(element('strong', '', `참여자 ${name}`), element('span', 'event-member-fact', fact));
      member.append(copy, element('span', 'event-status', status));
      members.append(member);
    }
    stage.append(members);

    if (step.seats) {
      const board = element('div', 'event-seats');
      const heading = element('div', 'event-seat-heading');
      heading.append(element('span', '', '보상 예약'), element('strong', '', `${step.seats.occupied} / 100명`));
      const lane = element('div', 'event-seat-lane');
      lane.append(element('div', 'event-existing', '기존 99명 예약'), element('div', `event-last-slot ${step.seats.occupied === 100 ? 'is-filled' : ''}`, step.seats.last));
      board.append(heading, lane, element('p', 'event-queue', `대기 순서 · ${step.seats.queue}`));
      stage.append(board);
    }
    if (step.days) {
      const calendar = element('div', 'event-calendar');
      calendar.setAttribute('role', 'list');
      calendar.setAttribute('aria-label', '일주일 출석 기록');
      step.days.forEach((count, index) => {
        const day = element('div', count ? 'is-attended' : '');
        day.setAttribute('role', 'listitem');
        day.append(element('span', '', ['월', '화', '수', '목', '금', '토', '일'][index]), element('b', '', count ? '출석' : '·'), element('small', '', count ? `${count}번 클릭` : '기록 없음'));
        calendar.append(day);
      });
      stage.append(calendar, element('p', 'event-calendar-total', `출석한 날짜 ${step.dayCount}일 / 필요한 날짜 3일`));
    }
    if (step.payout) {
      const ledger = element('div', 'event-ledger');
      ledger.append(element('p', '', '모의 지급 기록 · EVENT-A'));
      const values = element('dl', '');
      for (const [label, value] of [['요청 횟수', `${step.payout.requests}회`], ['지급 횟수', `${step.payout.count}회`], ['총지급', `${number(step.payout.points)} P`]]) {
        const pair = element('div', '');
        pair.append(element('dt', '', label), element('dd', '', value));
        values.append(pair);
      }
      ledger.append(values, element('p', 'event-receipt', step.payout.receipt));
      stage.append(ledger);
    }
    stage.append(element('p', 'event-result', step.result));
    previous.disabled = stepIndex === 0;
    next.disabled = stepIndex === current.steps.length - 1;
    position.textContent = `${stepIndex + 1} / ${current.steps.length} · ${step.title}`;
  }

  select.addEventListener('change', () => { stepIndex = 0; render(); });
  previous.addEventListener('click', () => {
    if (stepIndex > 0) { stepIndex -= 1; render(); }
  });
  next.addEventListener('click', () => {
    if (stepIndex < cases[select.value].steps.length - 1) { stepIndex += 1; render(); }
  });
  render();
  root.querySelector('.event-replay-fallback').hidden = true;
  app.hidden = false;
}, { once: true });
