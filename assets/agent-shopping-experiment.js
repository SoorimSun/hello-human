import { ShoppingExperiment, agents, items, stores, specifications, specificationLabel, sameVariant, matchRules, bottlesPerPack, arrivalLabels, nextMeetingPackPrice } from './agent-shopping-model.js?v=9';
import { runComparedAlertScenario } from './agent-shopping-alert-comparison.js?v=1';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#shopping-experiment');
  if (!root) return;
  let model = new ShoppingExperiment();
  let demoContext = null;
  let activeExperiment = 'permission';
  const scenarios = {
    same: { title: '같은 구성', need: '20병 1상자만 필요한데 A·B가 같은 상자를 하나씩 요청합니다.', size: 'small', option: 'standard' },
    size: { title: '용량 다름', need: '개인용 500mL × 20병과 공용 2L × 6병이 각각 1상자 필요합니다.', size: 'large', option: 'standard' },
    option: { title: '옵션 다름', need: '같은 500mL × 20병이지만 일반 뚜껑·스포츠캡이 각각 1상자 필요합니다.', size: 'small', option: 'sport' },
    growth: { title: '모임 인원 증가', need: 'A가 20병을 산 뒤 모임이 20→40명으로 늘어, B의 20병도 필요해집니다.', size: 'small', option: 'standard' },
    stock: { title: '집에 남은 생수', need: '총 40병 필요. 집에 남은 생수를 빼고 A·B가 20병씩 요청합니다.', size: 'small', option: 'standard' },
    delivery: { title: '배송 중인 생수', need: '총 40병 필요·집 재고 0병. 기존 배송의 도착 시점에 따라 추가 구매를 비교합니다.', size: 'small', option: 'standard' },
    cancel: { title: '늦는 기존 주문 취소', need: '총 40병 필요·집 재고 0병. 기존 20병은 모임 후 도착하며 24,000원을 결제했습니다.', size: 'small', option: 'standard' }
  };
  const field = id => root.querySelector(`#${id}`);
  const money = value => `${value.toLocaleString('ko-KR')}원`;
  const labels = { ordered: '가상 주문 완료', pending: '승인 대기', blocked: '차단', skipped: '구매 안 함' };
  const label = row => row.code === 'duplicate' ? '중복 확인 대기' : labels[row.status];
  const form = field('shop-form');
  const agent = field('shop-agent');
  const status = field('shop-status');
  const history = field('shop-history');
  const ideas = field('shop-ideas');

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function comparisonCards(calculate) {
    const shared = calculate('shared');
    const scoped = calculate('scoped');
    return JSON.stringify(shared) === JSON.stringify(scoped)
      ? [{ title: '두 권한 방식의 결과가 같습니다', value: shared }]
      : [{ title: '공통 권한', value: shared }, { title: '에이전트별 권한', value: scoped }];
  }

  function showPolicy() {
    const policy = model.policies[agent.value];
    field('shop-policy-name').textContent = `${agents[agent.value]}의 권한`;
    field('shop-connected').checked = policy.active;
    field('shop-purchase').checked = policy.purchase;
    field('shop-limit').value = policy.limit;
    field('shop-approval').value = policy.approval;
  }

  function showOrder() {
    field('shop-permission-order').textContent = `${field('shop-store').value} · ${items[field('shop-item').value]} · ${money(Number(field('shop-amount').value))}`;
  }

  function showBasicMode(mode, reset = true) {
    if (reset && activeExperiment === mode && !field(`shop-${mode}-panel`).hidden) return;
    for (const key of ['permission', 'duplicate']) {
      field(`shop-${key}-panel`).hidden = key !== mode;
      field(`shop-mode-${key}`).setAttribute('aria-pressed', String(key === mode));
    }
    if (reset) {
      model = new ShoppingExperiment();
      demoContext = null;
      activeExperiment = mode;
      agent.value = 'c';
      field('shop-deep-experiment').open = false;
      field('shop-history-details').open = false;
      showPolicy();
      showRequired();
      status.textContent = '';
      render();
    }
  }

  function options(select, values) {
    select.replaceChildren(...Object.entries(values).map(([value, text]) => {
      const option = node('option', text);
      option.value = value;
      return option;
    }));
  }

  function showSpecifications() {
    const spec = specifications[field('shop-item').value];
    options(field('shop-size'), spec.sizes);
    options(field('shop-option'), spec.options);
    showRequired();
  }

  function selectedVariant() {
    return { item: field('shop-item').value, size: field('shop-size').value, option: field('shop-option').value };
  }

  function showRequired() {
    const variant = selectedVariant();
    field('shop-required-quantity').value = model.required(variant);
    field('shop-stock-controls').hidden = variant.item !== 'water';
    for (const id of ['shop-home-stock', 'shop-incoming-bottles', 'shop-incoming-arrival']) field(id).disabled = variant.item !== 'water';
    if (model.cancellation(variant)) {
      field('shop-incoming-bottles').disabled = true;
      field('shop-incoming-arrival').disabled = true;
    }
    field('shop-home-stock').value = model.stock(variant);
    field('shop-home-stock').setCustomValidity('');
    const incoming = model.incoming(variant);
    field('shop-incoming-bottles').value = incoming.bottles;
    field('shop-incoming-arrival').value = incoming.arrival;
    field('shop-incoming-bottles').setCustomValidity('');
    renderQuantitySummary();
    renderCancellationSummary();
  }

  function waterBalance(mode, variant) {
    const rows = model.records[mode].filter(row => sameVariant(row.request, variant));
    const ordered = rows.filter(row => row.status === 'ordered').length;
    const pending = rows.filter(row => row.status === 'pending').length;
    const bottles = bottlesPerPack(variant);
    const missing = Math.max(0, model.required(variant) * bottles - model.availableStock(variant) - ordered * bottles);
    return { ordered, pending, missing, remaining: Math.ceil(missing / bottles) };
  }

  function renderQuantitySummary() {
    const variant = selectedVariant();
    const summary = field('shop-stock-summary');
    summary.hidden = variant.item !== 'water';
    if (summary.hidden) return;
    const bottles = bottlesPerPack(variant);
    const goal = model.required(variant) * bottles;
    const stock = model.stock(variant);
    const incoming = model.activeIncoming(variant);
    const timely = incoming.arrival === 'before' ? incoming.bottles : 0;
    const shortage = Math.max(0, goal - model.availableStock(variant));
    const target = model.purchaseTarget(variant);
    const parts = [node('strong', `${specificationLabel(variant)} · 총 필요 ${goal}병 − 집에 ${stock}병${incoming.bottles ? ` − 모임 전 배송 예정 ${timely}병` : ''} → 새로 살 ${shortage}병 (${target}상자)`)];
    if (incoming.bottles) parts.push(node('p', `기존 배송 중 ${incoming.bottles}병 · ${arrivalLabels[incoming.arrival]}. ${incoming.arrival === 'before' ? '모임에 쓸 예정 물량으로 반영하지만 아직 수령한 재고는 아닙니다. 지연되면 다시 계산해야 합니다.' : incoming.arrival === 'after' ? '모임 준비 수량에서 제외합니다. 이 물량은 모임 뒤 도착하므로 추가 구매 후 여분이 생길 수 있으며, 기존 주문을 취소한 것은 아닙니다.' : '도착 시점을 확인하기 전에는 모임 준비 수량에서 제외합니다. 이후 제때 도착하면 추가 구매가 여분으로 남을 수 있습니다.'}`));
    if (shortage % bottles) parts.push(node('p', `${bottles}병들이 상자로만 사므로 ${target}상자로 올림합니다. ${target * bottles - shortage}병이 남아도 이 구매는 부족분을 채우는 데 필요합니다.`));
    for (const mode of ['shared', 'scoped']) {
      const balance = waterBalance(mode, variant);
      parts.push(node('p', `${mode === 'shared' ? '공통 권한' : '에이전트별 권한'}: 이번 실험에서 ${balance.ordered}상자 주문 완료 · ${balance.pending}상자 대기. 앞으로 구매 완료해야 할 양 ${balance.missing}병 (${balance.remaining}상자).${balance.pending ? ' 대기 요청은 아직 구매 완료가 아닙니다.' : ''}`));
    }
    parts.push(node('small', '재고·배송 예정을 알림에 반영하려면 중복 알림을 켜고 ‘필요 수량까지 고려’를 선택하세요. 이번 실험의 새 주문은 모임 전에 도착한다고 가정합니다.'));
    summary.replaceChildren(...parts);
  }

  function renderCancellationSummary() {
    const variant = selectedVariant();
    const terms = model.cancellation(variant);
    const summary = field('shop-cancellation-summary');
    summary.hidden = !terms;
    if (!terms) return;
    const incoming = model.incoming(variant);
    field('shop-cancellation-state').textContent = `기존 ${incoming.bottles}병 · ${terms.cancelled ? '취소 완료' : terms.canCancel ? '유지 중' : '취소 불가'}. ${terms.canCancel ? `취소 시 환불 ${money(terms.refundAmount)} · 수수료 ${money(terms.fee)} 별도.` : '환불·수수료 0원.'}`;
    field('shop-cancel-incoming').disabled = terms.cancelled;
    field('shop-cancel-incoming').textContent = terms.cancelled ? '기존 주문 취소 완료' : '기존 주문 취소 시도';
    const cards = comparisonCards(mode => ({ result: model.settlement(mode, variant), comparison: model.cancellationComparison(mode, variant) })).map(({ title, value: { result, comparison } }) => {
      const card = node('div');
      const table = node('table', null, 'shop-cancel-comparison');
      table.append(node('caption', '이번 모임 비교 · 같은 새 주문 기준'));
      const head = node('thead');
      const heading = node('tr');
      for (const text of ['기존 주문', '총지출', '모임 뒤']) {
        const th = node('th', text);
        th.scope = 'col';
        heading.append(th);
      }
      head.append(heading);
      const body = node('tbody');
      for (const [key, title] of [['keep', '유지'], ['cancel', '취소']]) {
        const value = comparison[key];
        const current = (key === 'cancel') === terms.cancelled;
        const row = node('tr');
        const th = node('th', `${title}${current ? ' · 현재' : key === 'cancel' && !value ? ' 불가' : ' 시'}`);
        th.scope = 'row';
        row.append(th, node('td', value ? money(value.netCost) : '불가'), node('td', value ? `${value.leftoverMin}병` : '불가'));
        body.append(row);
      }
      table.append(head, body);
      card.append(
        node('h4', title),
        node('p', `새 구매 비용 ${money(result.newCost)}`),
        table
      );
      if (comparison.cancel) {
        const saving = comparison.keep.netCost - comparison.cancel.netCost;
        card.append(node('p', `유지 대신 취소하면 총지출이 ${saving === 0 ? '같고' : `${money(Math.abs(saving))} ${saving > 0 ? '줄고' : '늘고'}`}, 남는 생수는 ${comparison.keep.leftoverMin}병에서 ${comparison.cancel.leftoverMin}병으로 줄어듭니다.`));
      } else card.append(node('p', '이 조건에서는 취소할 수 없어 유지 결과만 적용합니다.'));
      if (result.shortage) card.append(node('p', `모임에 쓸 생수가 ${result.shortage}병 부족합니다. 늦게 도착하는 물량은 이 부족분을 채우지 못합니다.`));
      return card;
    });
    field('shop-cancellation-results').replaceChildren(...cards);
    renderNextMeeting();
  }

  function renderNextMeeting() {
    const variant = selectedVariant();
    if (!model.cancellation(variant)) return;
    const requiredBottles = Number(field('shop-next-required').value);
    const reuseLeftovers = field('shop-next-reuse').value === 'yes';
    field('shop-next-status').textContent = `다음 ${requiredBottles}병 필요 · ${reuseLeftovers ? '남은 물 재사용' : '재사용 불가'} · 1상자 ${money(nextMeetingPackPrice)}`;
    const lowerCost = (keep, cancel) => keep === cancel ? '유지·취소의 지출이 같습니다.'
      : `${keep < cancel ? '유지' : '취소'}가 ${money(Math.abs(keep - cancel))} 적습니다.`;
    const cards = comparisonCards(mode => model.nextMeetingComparison(mode, variant, { requiredBottles, reuseLeftovers })).map(({ title, value: comparison }) => {
      const card = node('div');
      const table = node('table', null, 'shop-cancel-comparison');
      table.append(node('caption', '현재 새 주문 기준 · 다음 구매는 예상'));
      const head = node('thead');
      const heading = node('tr');
      for (const text of ['계산 항목', '유지', comparison.cancel ? '취소' : '취소 불가']) {
        const th = node('th', text);
        th.scope = 'col';
        heading.append(th);
      }
      head.append(heading);
      const body = node('tbody');
      for (const [label, key, monetary] of [['이번 지출', 'netCost', true], ['남은 물 사용', 'usedLeftovers', false], ['다음 구매', 'nextCost', true], ['두 모임 합계', 'combinedCost', true], ['다음 뒤 여분', 'nextLeftover', false]]) {
        const row = node('tr');
        const th = node('th', label);
        th.scope = 'row';
        row.append(th);
        for (const value of [comparison.keep, comparison.cancel]) {
          const cell = node('td');
          const text = value ? monetary ? money(value[key]) : `${value[key]}병` : '불가';
          cell.append(node(key === 'combinedCost' ? 'strong' : 'span', text));
          if (value && key === 'nextCost') cell.append(node('small', `${value.nextPacks}상자 · ${value.nextNeeded}병 부족분`, 'shop-next-packs'));
          row.append(cell);
        }
        body.append(row);
      }
      table.append(head, body);
      card.append(node('h4', title), table);
      if (comparison.keep.shortage) {
        card.append(node('p', `이번 모임 준비가 아직 ${comparison.keep.shortage}병 부족합니다. 합계에는 그 부족분의 추가 구매비가 빠져 있으므로 어느 쪽이 유리한지 판단을 보류합니다.`, 'permission-rule'));
      } else if (comparison.cancel) {
        card.append(node('p', `이번 지출만 보면 ${lowerCost(comparison.keep.netCost, comparison.cancel.netCost)}`));
        card.append(node('p', `다음 구매까지 합치면 ${lowerCost(comparison.keep.combinedCost, comparison.cancel.combinedCost)}`, 'permission-rule'));
      } else card.append(node('p', '이 조건에서는 취소할 수 없어 유지할 때의 다음 구매만 계산합니다.'));
      if (!reuseLeftovers && comparison.keep.excludedLeftovers) card.append(node('p', `유지하면 남을 ${comparison.keep.excludedLeftovers}병은 재사용 불가로 다음 필요량에서 빼지 않습니다. ‘다음 뒤 여분’에도 넣지 않으며 자동 폐기된다는 뜻은 아닙니다.`, 'shop-help'));
      return card;
    });
    field('shop-next-results').replaceChildren(...cards);
  }

  function showScenario() {
    const deepScenario = field('shop-deep-scenario').value;
    const key = deepScenario === 'next' ? 'cancel' : deepScenario;
    field('shop-demo-stock-controls').hidden = key !== 'stock';
    field('shop-demo-home-stock').disabled = key !== 'stock';
    field('shop-demo-delivery-controls').hidden = key !== 'delivery';
    for (const id of ['shop-demo-incoming-bottles', 'shop-demo-incoming-arrival']) field(id).disabled = key !== 'delivery';
    field('shop-demo-cancel-controls').hidden = key !== 'cancel';
    field('shop-demo-can-cancel').disabled = key !== 'cancel';
    for (const id of ['shop-demo-refund', 'shop-demo-cancel-fee']) field(id).disabled = key !== 'cancel' || field('shop-demo-can-cancel').value === 'no';
    field('shop-demo-need').textContent = scenarios[field('shop-demo-scenario').value].need;
    field('shop-deep-need').textContent = scenarios[key].need + (deepScenario === 'next' ? ' 남은 물을 다음 모임에 쓰는 경우까지 비교합니다.' : '');
  }

  function savePolicy() {
    if (activeExperiment === 'permission') {
      model.policies[agent.value] = {
        active: field('shop-connected').checked,
        purchase: field('shop-purchase').checked,
        limit: Number(field('shop-limit').value),
        approval: field('shop-approval').value
      };
      model.totalLimit = Number(field('shop-total-limit').value);
    }
    const prefix = activeExperiment === 'deep' ? 'shop-deep-duplicate' : 'shop-duplicate';
    model.duplicateAlert = activeExperiment === 'permission' ? false : field(`${prefix}-alert`).checked;
    model.duplicateMatch = field(`${prefix}-match`).value;
  }

  function renderIdeas() {
    const messages = [];
    const rows = model.records.scoped;
    if (rows.some(row => row.code === 'duplicate' && row.differentVariant)) messages.push('상품명만 같다는 이유로 용량·옵션이 다른 구매도 멈췄습니다 → 구성 차이와 사용 목적을 함께 보여 주고, 필요한 구매를 불필요하게 늦추는지 살펴보세요.');
    if (rows.some(row => row.code === 'duplicate' && !row.differentVariant && !row.quantityLimited)) messages.push('용량·옵션까지 같은 주문을 구매 전에 발견했습니다 → 이미 주문했거나 먼저 대기 중인 요청을 보여 주고, 추가 구매가 필요한지 고객이 선택하게 해보세요.');
    if (rows.some(row => row.code === 'duplicate' && row.quantityLimited)) messages.push('이번 주문까지 더하면 필요한 새 구매량을 넘습니다 → 집에 있던 생수·모임 전 배송 예정·완료 주문·승인 대기를 따로 보여 주고, 초과 구매가 필요한지 확인해 보세요. 배송 예정은 수령 완료가 아니고, 승인 대기는 구매 완료가 아닙니다.');
    if (demoContext && ['size', 'option'].includes(demoContext.scenario)) {
      const second = rows.find(row => row.request.id === demoContext.requestId);
      if (second.status === 'skipped') messages.push('이 예시는 두 구성 모두 필요하다고 정했습니다. 두 번째 구매를 생략해 필요한 구성이 빠졌습니다 → 알림·지출 감소만 성공으로 세지 말고 필요한 구매의 누락도 확인하세요.');
      else if (second.status === 'ordered') messages.push('이 예시에서 필요했던 서로 다른 두 구성을 모두 주문했습니다 → 실제로도 대체 가능한 구성인지, 두 가지가 모두 필요한지는 별도 확인해야 합니다.');
      else if (second.code === 'duplicate') messages.push('이 예시는 두 구성 모두 필요합니다. 필요한 두 번째 구매도 확인 대기 중입니다 → 알림을 켠 채 비교 기준만 ‘용량·옵션까지’로 바꾸고 같은 예시를 다시 시험해 보세요.');
    }
    if (demoContext?.scenario === 'growth') {
      const variant = demoContext.request;
      const target = model.purchaseTarget(variant);
      const relevant = rows.filter(row => sameVariant(row.request, variant));
      const completed = relevant.filter(row => row.status === 'ordered').length;
      const waiting = relevant.filter(row => row.status === 'pending').length;
      const remaining = Math.max(0, target - completed);
      messages.push(`인원 증가 예시의 새 구매 목표 ${target}상자 · 완료 ${completed}상자 · 대기 ${waiting}상자. ${remaining ? `아직 ${remaining}상자를 더 구매해야 목표를 채웁니다. 대기 요청은 필요한 구매를 늦추고 있지 않은지 살펴보세요.` : completed > target ? '목표보다 많이 주문했습니다. 추가 승인은 목표 수량 자체를 늘리지 않습니다.' : waiting ? '목표 수량은 이미 채웠고 추가 요청이 대기 중입니다. 생략하거나 필요한 추가 구매인지 확인할 수 있습니다.' : '필요한 수량을 채웠습니다. 같은 구성 1상자를 더 요청해 초과 구매 알림을 확인하세요.'}`);
      const second = rows.find(row => row.request.id === demoContext.requestId);
      if (second.code === 'duplicate' && !second.quantityLimited && remaining) messages.push('같은 용량·옵션이어도 추가 구매가 필요합니다 → ‘필요 수량까지 고려’로 바꾸고 같은 예시를 다시 시험해 보세요.');
    }
    if (demoContext?.scenario === 'stock') {
      const variant = demoContext.request;
      const balance = waterBalance('scoped', variant);
      const target = model.purchaseTarget(variant);
      messages.push(`재고·모임 전 배송 예정을 반영한 새 구매 목표는 ${target}상자입니다. 이번 실험의 완료 ${balance.ordered}상자 · 대기 ${balance.pending}상자. ${balance.remaining ? `아직 ${balance.missing}병 (${balance.remaining}상자)을 더 구매 완료해야 합니다.` : balance.ordered > target ? '필요한 새 구매량보다 많이 주문했습니다.' : '현재 가정에서는 모임에 필요한 양을 채웠습니다.'}`);
      messages.push('남은 수량을 0·10·20·40병으로 바꾸고 예시를 다시 실행해 보세요 → 10병이면 부족한 30병 때문에 두 상자가 필요하지만, 20병이면 한 상자, 40병이면 새 구매가 필요 없습니다. 용량·옵션이 다른 생수는 자동으로 대체하지 않습니다.');
    }
    if (demoContext?.scenario === 'delivery') {
      const variant = demoContext.request;
      const incoming = model.incoming(variant);
      const balance = waterBalance('scoped', variant);
      messages.push(`기존 배송 ${incoming.bottles}병 · ${arrivalLabels[incoming.arrival]}. 새 구매 목표 ${model.purchaseTarget(variant)}상자, 이번 주문 완료 ${balance.ordered}상자 · 대기 ${balance.pending}상자입니다. ${balance.remaining ? `현재 가정에서 아직 ${balance.missing}병 (${balance.remaining}상자)의 추가 구매가 필요합니다.` : balance.ordered > model.purchaseTarget(variant) ? '필요한 새 구매량보다 많이 주문했습니다.' : '현재 가정에서는 모임에 필요한 양을 채웠습니다.'}`);
      messages.push('배송 중이라는 이유만으로 중복이라고 막으면 늦게 오는 물량 때문에 모임 준비가 부족해질 수 있습니다 → 모임 시각과 도착 예정을 함께 확인하고, 지연되면 대기 주문을 다시 판단하도록 해보세요. 늦게 오는 기존 주문의 취소·반품은 별도 문제입니다.');
    }
    if (demoContext?.scenario === 'cancel') messages.push('늦는 기존 주문을 취소해도 이번 모임 전에 필요한 새 구매량은 줄지 않습니다 → 새 구매 비용·환불·수수료와 다음 구매를 나눠 보세요. 남은 생수를 다음 모임에 쓰면 유지가 더 저렴해질 수 있습니다. 다음 모임 필요량·재사용 여부는 결과 아래에서 바로 바꿔 비교하세요.');
    if (rows.some(row => row.status === 'skipped')) messages.push('고객이 대기 중인 구매를 생략했습니다 → 알림을 띄운 횟수와 실제로 생략한 구매를 나눠 보세요. 필요한 추가 구매까지 막지는 않았는지도 확인할 수 있습니다.');
    if (rows.some(row => row.code === 'read-only')) messages.push('조회는 맡기고 구매는 막을 수 있었습니다 → “가격 비교만” 같은 역할별 권한 템플릿을 생각해 보세요.');
    if (rows.some(row => row.code === 'revoked')) messages.push('한 에이전트의 연결 해제가 그 에이전트만 막았습니다 → 프로필별 중지 버튼과 영향 범위 안내를 생각해 보세요.');
    if (rows.some(row => row.status === 'pending')) messages.push('주문이 승인 대기에 걸렸습니다 → 금액·상품·에이전트 이름을 한 화면에 모은 승인함을 생각해 보세요.');
    if (['shared', 'scoped'].some(mode => model.records[mode].some(row => row.code === 'budget')) || model.spent('scoped') > 50000) {
      messages.push('에이전트별 한도와 고객 전체 예산은 다릅니다 → 쇼핑몰·에이전트를 합산하는 예산 관리가 필요할지 살펴보세요.');
    }
    const ordered = rows.filter(row => row.status === 'ordered');
    if (ordered.some((row, index) => ordered.slice(0, index).some(other => sameVariant(row.request, other.request)))) {
      messages.push('용량·옵션까지 같은 구성이 여러 번 주문됐습니다 → 필요한 수량을 넘겼는지 살펴보세요. 고객이 필요해서 추가 승인한 구매와 불필요한 중복은 구분해야 합니다.');
    }
    if (!messages.length) messages.push('C의 주문을 비교한 뒤, A와 B가 같은 상품을 사게 해보세요. 권한·이력 분리가 해결하는 문제와 남기는 문제가 달라집니다.');
    ideas.replaceChildren(...messages.map(text => node('li', text)));
  }

  function resultCell(mode, row) {
    const cell = node('td');
    cell.append(node('strong', mode === 'scoped' ? agents[row.request.agent] : '고객 계정 · 실행 주체 미표시'));
    cell.append(node('span', label(row), `shop-badge shop-${row.status}`));
    cell.append(node('p', row.reason));
    cell.append(node('small', `마지막 판단 시 알림 ${row.duplicateAlert ? '켜짐' : '꺼짐'} · ${matchRules[row.duplicateMatch]} · 총 필요 ${row.requiredQuantity}개 묶음${row.request.item === 'water' ? ` · 집에 ${row.homeStock}병` : ''}${row.incoming.bottles ? ` · 배송 중 ${row.incoming.bottles}병 (${arrivalLabels[row.incoming.arrival]})` : ''}`, 'shop-decision-note'));
    if (row.status === 'pending') {
      const isDuplicate = row.code === 'duplicate';
      const action = isDuplicate ? (row.quantityLimited ? '목표 초과 확인 후 이 주문 승인' : row.differentVariant ? '구성 차이 확인 후 이 주문 승인' : '중복이어도 이 주문 승인') : '이 주문만 승인';
      const button = node('button', action);
      button.type = 'button';
      const context = `${mode === 'shared' ? '공통 권한' : '개별 권한'} ${row.request.id}`;
      button.setAttribute('aria-label', `${context} ${action}`);
      button.addEventListener('click', () => {
        savePolicy();
        const result = model.approve(mode, row.request.id, { allowDuplicate: isDuplicate });
        status.textContent = `${context}: ${label(result)}. ${result.reason} 이 방식의 가상 지출은 ${money(model.spent(mode))}입니다.`;
        render();
        status.focus();
      });
      const skip = node('button', '이번 구매 안 함');
      skip.type = 'button';
      skip.setAttribute('aria-label', `${context} 이번 구매 안 함`);
      skip.addEventListener('click', () => {
        const result = model.skip(mode, row.request.id);
        status.textContent = `${context}: ${label(result)}. ${result.reason} 이 방식의 가상 지출은 ${money(model.spent(mode))}입니다.`;
        render();
        status.focus();
      });
      const actions = node('div', null, 'shop-result-actions');
      actions.append(skip, button);
      cell.append(actions);
    }
    return cell;
  }

  function renderBasicDifference() {
    const summary = field('shop-difference');
    summary.hidden = activeExperiment === 'deep' || !model.records.shared.length;
    if (summary.hidden) return;
    const decision = row => ({
      within: '바로 구매', approved: '승인 후 구매', 'duplicate-approved': '중복 확인 후 구매',
      'read-only': '조회 전용으로 차단', revoked: '연결 해제로 차단', budget: '전체 예산으로 차단',
      duplicate: '중복 확인 대기', limit: '한도 초과로 대기', approval: '매번 승인 대기'
    }[row.code] || labels[row.status].replace('가상 주문 완료', '구매 완료'));
    // Compare the same request, not just totals: equal counts can hide different decisions.
    const differences = model.records.shared.map(shared => ({
      shared, scoped: model.records.scoped.find(row => row.request.id === shared.request.id)
    })).filter(({ shared, scoped }) => decision(shared) !== decision(scoped));
    summary.classList.toggle('shop-difference-same', !differences.length);
    if (!differences.length) {
      summary.replaceChildren(node('strong', '구매 결과 차이 없음 · 두 방식의 처리와 지출이 같습니다.'));
      return;
    }
    const { shared, scoped } = differences.at(-1);
    const delta = model.spent('scoped') - model.spent('shared');
    const spending = delta === 0 ? '누적 지출은 같음'
      : `누적 지출은 개별이 ${money(Math.abs(delta))} ${delta < 0 ? '적음' : '많음'}`;
    summary.replaceChildren(
      node('strong', `공통은 ${decision(shared)} · 개별은 ${decision(scoped)}`),
      node('p', `${differences.length > 1 ? `차이 ${differences.length}건 중 ` : ''}${shared.request.id} · 에이전트 ${shared.request.agent.toUpperCase()} 기준. ${spending}.`)
    );
  }

  function selectComparisonSettings(comparison, matching = comparison.matching) {
    // Use the displayed result's saved conditions rather than unsubmitted form edits.
    field('shop-demo-scenario').value = comparison.scenario;
    field('shop-demo-store-a').value = comparison.storeA;
    field('shop-demo-store-b').value = comparison.storeB;
    field('shop-duplicate-alert').checked = comparison.enabled;
    field('shop-duplicate-match').value = matching;
  }

  function renderAlertComparison() {
    const comparison = demoContext?.comparison;
    const container = field('shop-alert-comparison');
    container.hidden = activeExperiment !== 'duplicate' || !comparison;
    field(container.hidden ? 'shop-live-results' : 'shop-history-comparison').append(field('shop-permission-results'));
    if (container.hidden) return;
    // Both permission modes use the same purchase rights in this preset.
    const off = comparison.off.scoped;
    const on = comparison.on.scoped;
    const difference = off.purchases - on.purchases;
    const summary = node('div', null, `shop-difference${difference ? '' : ' shop-difference-same'}`);
    const currentRule = node('p', '현재 비교 기준: ', 'shop-current-rule');
    currentRule.id = 'shop-current-rule';
    currentRule.append(node('strong', matchRules[comparison.matching]));
    if (demoContext.previousComparison || demoContext.recommendedComparison) {
      const recommended = Boolean(demoContext.previousComparison);
      const state = node('span', recommended ? '추천 기준 적용 중' : '이전 기준',
        `shop-rule-state${recommended ? ' shop-rule-state-recommended' : ''}`);
      state.id = 'shop-rule-state';
      currentRule.append(' ', state);
    }
    summary.append(currentRule);
    summary.append(node('strong', difference
      ? `알림을 켜면 구매 ${difference}건 · 지출 ${money(off.spent - on.spent)} 적음`
      : '알림을 켜도 구매 건수·지출은 같습니다.'));
    const counterpart = demoContext.previousComparison || demoContext.recommendedComparison;
    if (counterpart) {
      // Keep the direction previous → recommended in both views, using the initial two requests.
      const arm = comparison.enabled ? 'on' : 'off';
      const before = (demoContext.previousComparison || comparison)[arm].scoped;
      const after = (demoContext.recommendedComparison || comparison)[arm].scoped;
      const change = node('p', null, 'shop-application-change');
      change.id = 'shop-recommendation-change';
      change.append(node('span', `이전→추천(알림 ${comparison.enabled ? '켜짐' : '꺼짐'})`), ' · ',
        node('span', `구매 ${before.purchases}→${after.purchases}건`), ' · ',
        node('span', `지출 ${before.spent.toLocaleString('ko-KR')}→${money(after.spent)}`), ' · ',
        node('span', `대기 ${before.pending}→${after.pending}건`));
      summary.append(change);
    }
    if (on.pending) {
      const note = node('p');
      summary.append(note);
      if (on.needed) {
        const growing = comparison.scenario === 'growth';
        const reason = growing ? '필요량이 늘었으므로' : comparison.scenario === 'size' ? '용량이 다르므로' : '옵션이 다르므로';
        const matching = growing ? 'quantity' : 'variant';
        note.textContent = `알림을 켜면 필요한 구매도 ${on.needed}건 대기합니다. ${reason} 기준을 바꿔 보세요.`;
        const apply = node('button', `${matchRules[matching]} · 다시 비교`, 'shop-primary shop-recommendation');
        apply.type = 'button';
        apply.id = 'shop-apply-recommendation';
        apply.setAttribute('aria-describedby', 'shop-recommendation-help');
        apply.addEventListener('click', () => {
          selectComparisonSettings(comparison, matching);
          runDemo(false, { previousComparison: comparison });
        });
        const help = node('small', '이력을 초기화하고 같은 상황·쇼핑몰·알림 설정으로 처음 두 요청을 다시 비교합니다.', 'shop-decision-note');
        help.id = 'shop-recommendation-help';
        summary.append(apply, help);
      } else {
        note.textContent = `알림을 켜면 ${on.pending}건이 중복 확인 대기합니다. 추가 승인하면 지출이 늘어납니다.`;
      }
    }
    if (demoContext.previousComparison) {
      const previous = demoContext.previousComparison;
      const undo = node('button', '이전 기준으로 되돌리기', 'shop-recommendation');
      undo.type = 'button';
      undo.id = 'shop-undo-recommendation';
      undo.setAttribute('aria-describedby', 'shop-undo-help');
      undo.addEventListener('click', () => {
        selectComparisonSettings(previous);
        runDemo(false, { recommendedComparison: comparison, notice: `‘${matchRules[previous.matching]}’ 기준으로 되돌렸습니다. ` });
      });
      const help = node('small', `‘${matchRules[previous.matching]}’로 돌아갑니다. 이력을 초기화하고 같은 조건의 처음 두 요청을 다시 비교합니다.`, 'shop-decision-note');
      help.id = 'shop-undo-help';
      summary.append(undo, help);
    }
    const table = node('table', null, 'shop-alert-table');
    table.append(node('caption', `${scenarios[comparison.scenario].title} · 첫 2건, 승인 전`));
    const head = node('thead');
    const headers = node('tr');
    const metric = node('th', '비교 항목');
    metric.scope = 'col';
    headers.append(metric);
    for (const enabled of [false, true]) {
      const th = node('th', `알림 ${enabled ? '켜짐' : '꺼짐'}`);
      th.scope = 'col';
      th.append(node('span', comparison.enabled === enabled ? '이번 실행' : '미리보기',
        comparison.enabled === enabled ? 'shop-alert-selected' : 'shop-alert-preview'));
      headers.append(th);
    }
    head.append(headers);
    const body = node('tbody');
    for (const [key, title, format] of [
      ['purchases', '구매 완료', value => `${value}건`],
      ['spent', '지출', money],
      ['pending', '승인 대기', value => `${value}건`]
    ]) {
      const row = node('tr');
      const heading = node('th', title);
      heading.scope = 'row';
      row.append(heading);
      for (const result of [off, on]) {
        const cell = node('td');
        cell.append(node('span', format(result[key]), off[key] !== on[key] ? 'shop-value-different' : ''));
        row.append(cell);
      }
      body.append(row);
    }
    table.append(head, body);
    container.replaceChildren(summary, table,
      node('p', '위 비교는 처음 두 요청의 승인 전 결과이며, 두 권한 방식의 수치는 같습니다. 승인하거나 요청을 추가한 뒤의 결과는 주문 이력에서 확인하세요.', 'shop-help'));
  }

  function render() {
    field(activeExperiment === 'deep' ? 'shop-deep-results' : 'shop-basic-results').append(status, field('shop-results'));
    field('shop-stock-editor').hidden = activeExperiment !== 'deep' || !model.records.shared.length;
    showOrder();
    field('shop-results').hidden = !model.records.shared.length;
    const basic = activeExperiment !== 'deep';
    const counts = Object.fromEntries(['shared', 'scoped'].map(mode => [mode,
      Object.fromEntries(Object.keys(labels).map(state => [state, model.records[mode].filter(row => row.status === state).length]))
    ]));
    for (const mode of ['shared', 'scoped']) {
      const values = Object.entries(labels).filter(([state]) => basic
        ? counts.shared[state] || counts.scoped[state] : counts[mode][state]);
      field(`shop-${mode}-state`).replaceChildren(...values.map(([state, title]) =>
        node('span', `${title.replace('가상 주문 ', '')} ${counts[mode][state]}건`,
          basic && counts.shared[state] !== counts.scoped[state] ? 'shop-value-different' : '')
      ));
      field(`shop-${mode}-spent`).classList.toggle('shop-value-different', basic && model.spent('shared') !== model.spent('scoped'));
    }
    renderBasicDifference();
    renderAlertComparison();
    const pending = ['shared', 'scoped'].some(mode => model.records[mode].some(row => row.status === 'pending'));
    field('shop-history-heading').textContent = pending ? '승인 대기 있음 · 주문 이력 보기' : '주문 이력·수량 계산 보기';
    field('shop-shared-spent').textContent = money(model.spent('shared'));
    field('shop-scoped-spent').textContent = money(model.spent('scoped'));
    field('shop-repeat').disabled = !model.lastRequest;
    const extraEnabled = ['growth', 'stock', 'delivery', 'cancel'].includes(demoContext?.scenario);
    field('shop-extra-order').disabled = !extraEnabled;
    field('shop-extra-order').hidden = !extraEnabled;
    field('shop-extra-help').hidden = !extraEnabled;
    const rows = [...model.records.shared].reverse().map(shared => {
      const scoped = model.records.scoped.find(row => row.request.id === shared.request.id);
      const { request } = shared;
      const tr = node('tr');
      const heading = node('th');
      heading.scope = 'row';
      heading.append(node('strong', request.id), node('p', `${request.store} · ${items[request.item]}`), node('p', specificationLabel(request)), node('span', money(request.amount)));
      tr.append(heading, resultCell('shared', shared), resultCell('scoped', scoped));
      return tr;
    });
    if (!rows.length) {
      const tr = node('tr');
      const cell = node('td', '아직 요청이 없습니다. 위에서 같은 주문을 두 방식으로 비교해 보세요.');
      cell.colSpan = 3;
      tr.append(cell);
      rows.push(tr);
    }
    history.replaceChildren(...rows);
    renderQuantitySummary();
    renderCancellationSummary();
    renderIdeas();
  }

  function submit(input) {
    savePolicy();
    try {
      const result = model.submit(input);
      status.textContent = result.repeated
        ? `${result.request.id}의 기존 결과를 다시 보여줍니다. 새 주문·지출은 추가되지 않았습니다.`
        : `${result.request.id}: 공통 권한은 ${label(result.shared)}, 에이전트별 권한은 ${label(result.scoped)}입니다.`;
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (activeExperiment !== 'permission') {
      model = new ShoppingExperiment();
      showRequired();
    }
    activeExperiment = 'permission';
    showBasicMode('permission', false);
    field('shop-deep-experiment').open = false;
    demoContext = null;
    submit({ agent: agent.value, store: field('shop-store').value, item: field('shop-item').value,
      size: field('shop-size').value, option: field('shop-option').value,
      amount: Number(field('shop-amount').value) });
  });
  agent.addEventListener('change', showPolicy);
  for (const key of ['permission', 'duplicate']) field(`shop-mode-${key}`).addEventListener('click', () => showBasicMode(key));
  for (const id of ['shop-store', 'shop-item', 'shop-amount']) field(id).addEventListener('input', showOrder);
  for (const id of ['shop-connected', 'shop-purchase', 'shop-limit', 'shop-approval', 'shop-total-limit', 'shop-duplicate-alert', 'shop-duplicate-match', 'shop-deep-duplicate-alert', 'shop-deep-duplicate-match']) {
    field(id).addEventListener('change', () => {
      savePolicy();
      status.textContent = '새 설정은 다음 요청·승인에 적용됩니다. ‘결과 비교하기’는 이력을 초기화하고 다시 실행합니다.';
    });
  }
  field('shop-item').addEventListener('change', () => {
    showSpecifications();
    field('shop-amount').value = { water: 24000, snacks: 36000, coffee: 18000 }[field('shop-item').value];
    showOrder();
  });
  for (const id of ['shop-size', 'shop-option']) field(id).addEventListener('change', showRequired);
  field('shop-required-quantity').addEventListener('change', () => {
    model.setRequired(selectedVariant(), Number(field('shop-required-quantity').value));
    status.textContent = `선택한 구성의 목표를 ${model.required(selectedVariant())}개 묶음으로 바꿨습니다. 새 요청·대기 주문 승인 때 적용하며 기존 주문을 자동 진행·취소하지 않습니다. 다른 구성의 목표는 그대로입니다.`;
    render();
  });
  field('shop-home-stock').addEventListener('input', () => {
    const input = field('shop-home-stock');
    input.setCustomValidity('');
    try {
      if (input.value.trim() === '') throw new Error('집에 남은 생수를 0~200병의 정수로 입력해 주세요.');
      model.setStock(selectedVariant(), Number(input.value));
      status.textContent = `이 구성의 집에 있던 생수를 ${input.value}병으로 반영했습니다. 새 요청·대기 주문 승인 때 다시 계산하며, 완료 주문을 자동 취소하지 않습니다.`;
      render();
    } catch (error) {
      input.setCustomValidity(error.message);
      status.textContent = `${error.message} 잘못된 값은 반영하지 않았습니다.`;
    }
  });
  function saveIncoming() {
    const input = field('shop-incoming-bottles');
    input.setCustomValidity('');
    try {
      if (input.value.trim() === '') throw new Error('배송 중인 생수 수량을 0~200병의 정수로 입력해 주세요.');
      model.setIncoming(selectedVariant(), { bottles: Number(input.value), arrival: field('shop-incoming-arrival').value });
      status.textContent = `기존 배송 중 ${input.value}병 · ${arrivalLabels[field('shop-incoming-arrival').value]}으로 반영했습니다. 새 요청·대기 주문 승인 때 다시 판단하며, 기존 주문을 자동 진행·취소하지 않습니다.`;
      render();
    } catch (error) {
      input.setCustomValidity(error.message);
      status.textContent = `${error.message} 잘못된 값은 반영하지 않았습니다.`;
    }
  }
  field('shop-incoming-bottles').addEventListener('input', saveIncoming);
  field('shop-incoming-arrival').addEventListener('change', saveIncoming);
  field('shop-cancel-incoming').addEventListener('click', () => {
    const result = model.cancelIncoming(selectedVariant());
    status.textContent = `기존 주문 취소 시도: ${result.reason} 두 비교 방식에 함께 적용하며, 새 주문의 완료·대기 상태는 유지합니다.`;
    showRequired();
    render();
    status.focus();
  });
  field('shop-repeat').addEventListener('click', () => {
    if (model.lastRequest) submit(model.lastRequest);
  });
  field('shop-reset').addEventListener('click', () => {
    model = new ShoppingExperiment();
    demoContext = null;
    activeExperiment = 'permission';
    form.reset();
    showBasicMode('permission', false);
    field('shop-deep-experiment').open = false;
    field('shop-stock-editor').open = false;
    field('shop-advanced').open = false;
    field('shop-next-reuse').value = 'yes';
    field('shop-next-required').value = '20';
    field('shop-history-details').open = false;
    field('shop-next-meeting').open = false;
    showPolicy();
    showSpecifications();
    showScenario();
    status.textContent = '권한과 가상 주문 이력을 처음 상태로 되돌렸습니다.';
    render();
  });
  function runDemo(deep = false, { previousComparison = null, recommendedComparison = null, notice = '' } = {}) {
    const prefix = deep ? 'shop-deep-duplicate' : 'shop-duplicate';
    const enabled = field(`${prefix}-alert`).checked;
    const matching = field(`${prefix}-match`).value;
    const choice = field(deep ? 'shop-deep-scenario' : 'shop-demo-scenario').value;
    const scenarioKey = choice === 'next' ? 'cancel' : choice;
    const scenario = scenarios[scenarioKey];
    const storeA = field(deep ? 'shop-deep-store-a' : 'shop-demo-store-a').value;
    const storeB = field(deep ? 'shop-deep-store-b' : 'shop-demo-store-b').value;
    const homeStock = Number(field('shop-demo-home-stock').value);
    const incoming = { bottles: Number(field('shop-demo-incoming-bottles').value), arrival: field('shop-demo-incoming-arrival').value };
    const canCancel = field('shop-demo-can-cancel').value;
    const refundAmount = Number(field('shop-demo-refund').value);
    const cancelFee = Number(field('shop-demo-cancel-fee').value);
    // Keep each experiment's choices while clearing the manual order and old history.
    const saved = [...form.elements].filter(element => /^(shop-demo-|shop-deep-|shop-duplicate-|shop-next-)/.test(element.id) && ['INPUT', 'SELECT'].includes(element.tagName))
      .map(element => ({ element, value: element.value, checked: element.checked }));
    const compared = deep ? null : runComparedAlertScenario({ scenario: scenarioKey, enabled, matching, storeA, storeB });
    model = compared?.model ?? new ShoppingExperiment();
    activeExperiment = deep ? 'deep' : 'duplicate';
    form.reset();
    for (const { element, value, checked } of saved) {
      element.value = value;
      if (element.type === 'checkbox') element.checked = checked;
    }
    field('shop-history-details').open = false;
    field('shop-next-meeting').open = choice === 'next';
    field('shop-deep-experiment').open = deep;
    model.duplicateAlert = enabled;
    model.duplicateMatch = matching;
    model.policies.b.approval = 'within';
    field('shop-demo-home-stock').value = homeStock;
    field('shop-demo-incoming-bottles').value = incoming.bottles;
    field('shop-demo-incoming-arrival').value = incoming.arrival;
    field('shop-demo-can-cancel').value = canCancel;
    field('shop-demo-refund').value = refundAmount;
    field('shop-demo-cancel-fee').value = cancelFee;
    agent.value = 'b';
    field('shop-store').value = storeB;
    showPolicy();
    showSpecifications();
    showScenario();
    field('shop-size').value = scenario.size;
    field('shop-option').value = scenario.option;
    if (scenarioKey === 'stock') {
      model.setRequired(selectedVariant(), 2);
      model.setStock(selectedVariant(), homeStock);
    }
    if (scenarioKey === 'delivery') {
      model.setRequired(selectedVariant(), 2);
      model.setIncoming(selectedVariant(), incoming);
    }
    if (scenarioKey === 'cancel') {
      model.setRequired(selectedVariant(), 2);
      model.setIncoming(selectedVariant(), { bottles: 20, arrival: 'after' });
      model.setCancellation(selectedVariant(), { paid: 24000, canCancel: canCancel === 'yes', refundAmount, fee: cancelFee });
    }
    if (!compared) model.submit({ agent: 'a', store: storeA, item: 'water', amount: 24000 });
    const second = compared?.second ?? model.submit({ agent: 'b', store: storeB, item: 'water', size: scenario.size, option: scenario.option, amount: 24000 });
    demoContext = { scenario: scenarioKey, requestId: second.request.id, request: second.request, comparison: compared?.comparison,
      previousComparison: compared ? previousComparison : null, recommendedComparison: compared ? recommendedComparison : null };
    showRequired();
    const balance = waterBalance('scoped', second.request);
    const outcome = ['size', 'option'].includes(scenarioKey)
      ? second.scoped.status === 'ordered' ? '필요한 두 구성을 모두 샀습니다.' : '필요한 다른 구성도 중복으로 판단해 대기합니다.'
      : balance.missing ? `모임 준비에 아직 ${balance.missing}병이 부족합니다.`
      : balance.ordered > model.purchaseTarget(second.request) ? '필요한 양보다 더 샀습니다.'
      : '모임에 필요한 양을 채웠습니다.';
    const resultNotice = notice || (previousComparison ? `‘${matchRules[matching]}’ 기준으로 다시 비교했습니다. ` : '');
    status.textContent = `${resultNotice}${outcome}${balance.pending ? ' 대기 주문은 아래 이력에서 확인하세요.' : ''}`;
    render();
    status.focus();
  }
  field('shop-duplicate-demo').addEventListener('click', () => runDemo());
  field('shop-deep-demo').addEventListener('click', () => runDemo(true));
  field('shop-extra-order').addEventListener('click', () => {
    if (!['growth', 'stock', 'delivery', 'cancel'].includes(demoContext?.scenario)) return;
    const { id, ...request } = demoContext.request;
    submit(request);
    status.focus();
  });
  field('shop-demo-scenario').addEventListener('change', showScenario);
  field('shop-deep-scenario').addEventListener('change', showScenario);
  field('shop-demo-can-cancel').addEventListener('change', showScenario);
  for (const id of ['shop-next-reuse', 'shop-next-required']) field(id).addEventListener('change', renderNextMeeting);
  field('shop-demo-home-stock').addEventListener('change', showScenario);
  for (const id of ['shop-demo-incoming-bottles', 'shop-demo-incoming-arrival']) field(id).addEventListener('change', showScenario);
  for (const id of ['shop-store', 'shop-demo-store-a', 'shop-demo-store-b', 'shop-deep-store-a', 'shop-deep-store-b']) {
    options(field(id), Object.fromEntries(stores.map(store => [store, store])));
  }
  for (const id of ['shop-demo-store-b', 'shop-deep-store-b']) {
    field(id).value = stores[1];
    // A full reset restores the same store pair in both experiment groups.
    for (const option of field(id).options) option.defaultSelected = option.selected;
  }
  showPolicy();
  showSpecifications();
  showScenario();
  render();
  root.hidden = false;
}, { once: true });
