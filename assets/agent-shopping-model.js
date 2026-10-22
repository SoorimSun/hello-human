// A local teaching model. These are invented rules, not a retailer integration.
export const agents = { a: 'A · 정기 장보기', b: 'B · 모임 준비', c: 'C · 가격 비교' };
export const items = { water: '생수 1상자', snacks: '간식 1상자', coffee: '커피 1봉' };
export const stores = ['홈앤쇼핑', 'SK스토아', '쇼핑엔티', 'W쇼핑', '신세계라이브쇼핑'];
export const specifications = {
  water: { sizes: { small: '500mL × 20병', large: '2L × 6병' }, options: { standard: '일반 뚜껑', sport: '스포츠 캡' } },
  snacks: { sizes: { small: '20g × 10봉', large: '40g × 10봉' }, options: { standard: '오리지널', unsalted: '무염' } },
  coffee: { sizes: { small: '200g', large: '500g' }, options: { standard: '일반', decaf: '디카페인' } }
};
export const matchRules = { name: '상품명만 비교', variant: '용량·옵션까지 비교', quantity: '필요 수량까지 고려' };
export const sameVariant = (left, right) => left.item === right.item && left.size === right.size && left.option === right.option;
export const specificationLabel = request => `${specifications[request.item].sizes[request.size]} · ${specifications[request.item].options[request.option]}`;
export const bottlesPerPack = request => request.item === 'water' ? (request.size === 'large' ? 6 : 20) : 0;
export const nextMeetingPackPrice = 24000;
export const arrivalLabels = { before: '모임 시작 전 도착 예정', after: '모임 시작 후 도착 예정', unknown: '도착 시점 미확인' };
const sharedPolicy = { active: true, purchase: true, limit: 50000, approval: 'within' };
const defaults = {
  a: { active: true, purchase: true, limit: 30000, approval: 'within' },
  b: { active: true, purchase: true, limit: 50000, approval: 'always' },
  c: { active: true, purchase: false, limit: 30000, approval: 'within' }
};

export class ShoppingExperiment {
  constructor() {
    this.policies = structuredClone(defaults);
    this.records = { shared: [], scoped: [] };
    this.totalLimit = 0;
    this.duplicateAlert = false;
    this.duplicateMatch = 'name';
    this.requiredQuantities = new Map();
    this.homeStock = new Map();
    this.incomingShipments = new Map();
    this.cancellationTerms = new Map();
    this.sequence = 0;
    this.lastRequest = null;
  }

  spent(mode) {
    return this.records[mode].filter(row => row.status === 'ordered')
      .reduce((sum, row) => sum + row.request.amount, 0);
  }

  policy(mode, agent) {
    return mode === 'shared' ? sharedPolicy : this.policies[agent];
  }

  variantKey(request) {
    const size = request.size ?? 'small';
    const option = request.option ?? 'standard';
    const spec = specifications[request.item];
    if (!Object.hasOwn(specifications, request.item) || !Object.hasOwn(spec.sizes, size)
      || !Object.hasOwn(spec.options, option)) throw new Error('목표 수량을 정할 상품·용량·옵션을 확인해 주세요.');
    return JSON.stringify([request.item, size, option]);
  }

  required(request) {
    return this.requiredQuantities.get(this.variantKey(request)) ?? 1;
  }

  setRequired(request, quantity) {
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 3) {
      throw new Error('필요한 총수량은 1~3개 묶음 중에서 정해 주세요.');
    }
    this.requiredQuantities.set(this.variantKey(request), quantity);
  }

  stock(request) {
    return this.homeStock.get(this.variantKey(request)) ?? 0;
  }

  setStock(request, bottles) {
    if (request.item !== 'water' || !Number.isSafeInteger(bottles) || bottles < 0 || bottles > 200) {
      throw new Error('집에 남은 생수는 0~200병의 정수로 입력해 주세요.');
    }
    this.homeStock.set(this.variantKey(request), bottles);
  }

  incoming(request) {
    return { ...(this.incomingShipments.get(this.variantKey(request)) ?? { bottles: 0, arrival: 'before' }) };
  }

  setIncoming(request, { bottles, arrival }) {
    if (request.item !== 'water' || !Number.isSafeInteger(bottles) || bottles < 0 || bottles > 200
      || !Object.hasOwn(arrivalLabels, arrival)) {
      throw new Error('배송 중인 생수는 0~200병의 정수와 도착 시점을 확인해 주세요.');
    }
    const old = this.incoming(request);
    if (this.cancellation(request) && (old.bottles !== bottles || old.arrival !== arrival)) {
      throw new Error('취소 비교 중에는 기존 주문 조건을 고정합니다. 다른 조건은 예시를 다시 시작해 주세요.');
    }
    this.incomingShipments.set(this.variantKey(request), { bottles, arrival });
  }

  cancellation(request) {
    const terms = this.cancellationTerms.get(this.variantKey(request));
    return terms ? { ...terms } : null;
  }

  setCancellation(request, { paid, canCancel, refundAmount = paid, fee = 0 }) {
    if (request.item !== 'water' || !Number.isSafeInteger(paid) || paid < 0 || paid > 200000
      || typeof canCancel !== 'boolean' || !this.incoming(request).bottles) {
      throw new Error('기존 생수 주문과 0~200,000원의 결제액, 취소 가능 여부를 확인해 주세요.');
    }
    if (!Number.isSafeInteger(refundAmount) || refundAmount < 0 || refundAmount > paid
      || !Number.isSafeInteger(fee) || fee < 0 || fee > 200000) {
      throw new Error('환불액은 기존 결제액 이하, 수수료는 0~200,000원의 정수로 입력해 주세요.');
    }
    if (this.cancellation(request)?.cancelled) throw new Error('취소 완료한 주문은 바꿀 수 없습니다. 예시를 다시 시작해 주세요.');
    this.cancellationTerms.set(this.variantKey(request), { paid, canCancel, refundAmount, fee, cancelled: false });
  }

  cancelIncoming(request) {
    const terms = this.cancellation(request);
    if (!terms) return { cancelled: false, reason: '취소 비교 예시를 먼저 실행해 주세요.' };
    if (terms.cancelled) return { cancelled: true, repeated: true, reason: '이미 취소한 주문입니다. 추가 환불·수수료는 없습니다.' };
    if (this.incoming(request).arrival !== 'after') return { cancelled: false, reason: '이 예시는 모임 후 도착하는 기존 주문만 취소 비교합니다.' };
    if (!terms.canCancel) return { cancelled: false, reason: '취소 불가 조건입니다. 기존 주문과 결제액이 유지되고 환불·수수료는 없습니다.' };
    this.cancellationTerms.set(this.variantKey(request), { ...terms, cancelled: true });
    return { cancelled: true, repeated: false, reason: `기존 주문을 가상 취소했습니다. 환불 ${terms.refundAmount.toLocaleString('ko-KR')}원과 수수료 ${terms.fee.toLocaleString('ko-KR')}원을 반영하고, 이 주문의 배송 물량을 모두 제외합니다.` };
  }

  activeIncoming(request) {
    const incoming = this.incoming(request);
    return this.cancellation(request)?.cancelled ? { ...incoming, bottles: 0 } : incoming;
  }

  settlement(mode, request) {
    return this.calculateSettlement(mode, request, this.cancellation(request)?.cancelled ?? false);
  }

  cancellationComparison(mode, request) {
    const terms = this.cancellation(request);
    return {
      keep: this.calculateSettlement(mode, request, false),
      cancel: terms?.canCancel && this.incoming(request).arrival === 'after'
        ? this.calculateSettlement(mode, request, true) : null
    };
  }

  nextMeetingComparison(mode, request, { requiredBottles, reuseLeftovers }) {
    if (!Number.isSafeInteger(requiredBottles) || requiredBottles < 0 || requiredBottles > 200
      || typeof reuseLeftovers !== 'boolean') {
      throw new Error('다음 모임 필요량은 0~200병의 정수, 재사용 여부는 가능·불가로 정해 주세요.');
    }
    const comparison = this.cancellationComparison(mode, request);
    const forecast = result => {
      if (!result) return null;
      if (result.leftoverMin !== result.leftoverMax) throw new Error('이번 모임 뒤 잔여량을 먼저 확정해 주세요.');
      const reusableBottles = reuseLeftovers ? result.leftoverMin : 0;
      const nextNeeded = Math.max(0, requiredBottles - reusableBottles);
      const nextPacks = Math.ceil(nextNeeded / bottlesPerPack(request));
      const nextCost = nextPacks * nextMeetingPackPrice;
      return { ...result, reusableBottles, usedLeftovers: Math.min(requiredBottles, reusableBottles),
        excludedLeftovers: result.leftoverMin - reusableBottles, nextNeeded, nextPacks, nextCost,
        combinedCost: result.netCost + nextCost,
        nextLeftover: reusableBottles + nextPacks * bottlesPerPack(request) - requiredBottles };
    };
    return { keep: forecast(comparison.keep), cancel: forecast(comparison.cancel) };
  }

  calculateSettlement(mode, request, cancelled) {
    if (request.item !== 'water') throw new Error('생수 구성의 비용과 잔여량을 확인해 주세요.');
    const key = this.variantKey(request);
    const ordered = this.records[mode].filter(row => row.status === 'ordered' && this.variantKey(row.request) === key);
    const newCost = ordered.reduce((sum, row) => sum + row.request.amount, 0);
    const terms = this.cancellation(request);
    const paid = terms?.paid ?? 0;
    const refund = cancelled ? terms?.refundAmount ?? 0 : 0;
    const fee = cancelled ? terms?.fee ?? 0 : 0;
    const original = this.incoming(request);
    const incoming = cancelled ? { ...original, bottles: 0 } : original;
    const bottles = bottlesPerPack(request);
    const demand = this.required(request) * bottles;
    const base = this.stock(request) + ordered.length * bottles;
    const before = base + (incoming.arrival === 'before' ? incoming.bottles : 0);
    const remainder = Math.max(0, before - demand);
    const leftoverMin = incoming.arrival === 'unknown'
      ? Math.max(0, base + incoming.bottles - demand)
      : remainder + (incoming.arrival === 'after' ? incoming.bottles : 0);
    const leftoverMax = incoming.arrival === 'unknown' ? remainder + incoming.bottles : leftoverMin;
    return { newCost, paid, refund, fee, netCost: paid + newCost - refund + fee,
      shortage: Math.max(0, demand - before), leftoverMin, leftoverMax };
  }

  availableStock(request) {
    const incoming = this.activeIncoming(request);
    return this.stock(request) + (incoming.arrival === 'before' ? incoming.bottles : 0);
  }

  purchaseTarget(request) {
    const required = this.required(request);
    const bottles = bottlesPerPack(request);
    return bottles ? Math.max(0, Math.ceil((required * bottles - this.availableStock(request)) / bottles)) : required;
  }

  priorRows(mode, request) {
    const rows = this.records[mode];
    const position = rows.findIndex(row => row.request.id === request.id);
    return rows.filter((row, index) => row.request.id !== request.id
      && (row.status === 'ordered'
        || (row.status === 'pending' && (position < 0 || index < position))));
  }

  duplicate(mode, request) {
    return this.priorRows(mode, request).find(row => row.request.agent !== request.agent
      && row.request.item === request.item
      && (this.duplicateMatch === 'name' || sameVariant(row.request, request)));
  }

  decide(mode, request, approved = false, allowDuplicate = false) {
    const policy = this.policy(mode, request.agent);
    if (!policy.active) return { status: 'blocked', code: 'revoked', reason: '이 에이전트의 연결이 해제되어 있습니다.' };
    if (!policy.purchase) return { status: 'blocked', code: 'read-only', reason: '조회 권한만 있어 주문할 수 없습니다.' };
    if (this.totalLimit && this.spent(mode) + request.amount > this.totalLimit) {
      return { status: 'blocked', code: 'budget', reason: '고객 전체 누적 예산을 넘습니다. 예산을 바꾸거나 주문을 줄여야 합니다.' };
    }
    const quantityCheck = this.duplicateAlert && this.duplicateMatch === 'quantity';
    const prior = quantityCheck ? this.priorRows(mode, request).filter(row => sameVariant(row.request, request)) : [];
    const ordered = prior.filter(row => row.status === 'ordered').length;
    const pending = prior.filter(row => row.status === 'pending').length;
    const target = this.required(request);
    const purchaseTarget = this.purchaseTarget(request);
    const quantityLimited = quantityCheck && ordered + pending + 1 > purchaseTarget;
    const bottles = bottlesPerPack(request);
    const incoming = this.activeIncoming(request);
    const timely = incoming.arrival === 'before' ? incoming.bottles : 0;
    const shortage = Math.max(0, target * bottles - this.availableStock(request));
    const need = bottles
      ? `총 필요 ${target * bottles}병 − 집에 있던 ${this.stock(request)}병${incoming.bottles ? ` − 모임 전 배송 예정 ${timely}병` : ''} → 구매로 채울 ${shortage}병, ${bottles}병들이 ${purchaseTarget}상자가 필요합니다.${incoming.bottles && incoming.arrival !== 'before' ? ` 배송 중 ${incoming.bottles}병은 ${arrivalLabels[incoming.arrival]}이므로 필요량에서 빼지 않았습니다.` : ''}${shortage % bottles ? ' 부족분을 채우려면 상자 단위로 올림합니다.' : ''}`
      : `이 구성의 목표 ${target}개 묶음입니다.`;
    const quantityReason = `${need} 주문 완료 ${ordered} · 먼저 승인 대기 ${pending} · 이번 1개 포함 새 구매 ${ordered + pending + 1}개 묶음입니다.`;
    if (quantityLimited && !allowDuplicate) {
      return { status: 'pending', code: 'duplicate', quantityLimited: true,
        reason: `${quantityReason} 필요한 새 구매량을 넘어 확인 대기합니다. 대기 물량은 아직 구매 완료가 아닙니다.` };
    }
    const duplicate = this.duplicateAlert && !quantityCheck && this.duplicate(mode, request);
    if (duplicate && !allowDuplicate) {
      const who = mode === 'scoped' ? agents[duplicate.request.agent] : '다른 에이전트';
      const state = duplicate.status === 'ordered' ? '주문 완료' : '승인 대기';
      const differentVariant = !sameVariant(duplicate.request, request);
      return { status: 'pending', code: 'duplicate', differentVariant,
        reason: `${duplicate.request.id} · ${duplicate.request.store}의 ${who}: ${specificationLabel(duplicate.request)}, ${state}. ${differentVariant ? '이번 주문은 용량·옵션이 다르지만 상품명이 같아 확인 대기입니다.' : '이번 주문과 용량·옵션까지 같습니다.'} 추가 구매가 필요한지 확인해 주세요.` };
    }
    if (!approved && request.amount > policy.limit) {
      return { status: 'pending', code: 'limit', reason: '에이전트의 주문당 한도를 넘어 이번 주문의 별도 승인이 필요합니다.' };
    }
    if (!approved && policy.approval === 'always') {
      return { status: 'pending', code: 'approval', reason: '한도 안이어도 매번 승인하도록 설정했습니다.' };
    }
    if (quantityLimited && allowDuplicate) {
      return { status: 'ordered', code: 'duplicate-approved', quantityLimited: true,
        reason: `${quantityReason} 목표 초과를 확인하고 이 주문만 승인했습니다. 목표 수량과 다른 주문의 권한은 그대로입니다.` };
    }
    if (duplicate && allowDuplicate) {
      return { status: 'ordered', code: 'duplicate-approved', differentVariant: !sameVariant(duplicate.request, request), reason: '상품 구성을 확인하고 이 주문만 추가 승인했습니다. 다른 주문의 알림·권한 설정은 그대로입니다.' };
    }
    if (quantityCheck) {
      return { status: 'ordered', code: approved ? 'approved' : 'within',
        reason: `${quantityReason} 필요한 수량 안이며 구매 권한·예산·승인 조건을 충족해 주문했습니다.` };
    }
    return { status: 'ordered', code: approved ? 'approved' : 'within', reason: approved
      ? '이 주문만 승인했습니다. 에이전트의 기본 한도·권한은 그대로입니다.'
      : '유효한 구매 권한과 한도 내 사전 허용에 따라 가상 주문을 기록했습니다.' };
  }

  submit(input) {
    const size = input.size ?? 'small';
    const option = input.option ?? 'standard';
    if (!Object.hasOwn(agents, input.agent) || !Object.hasOwn(items, input.item)
      || !Object.hasOwn(specifications[input.item].sizes, size) || !Object.hasOwn(specifications[input.item].options, option)
      || !stores.includes(input.store) || !Number.isSafeInteger(input.amount)
      || input.amount < 1000 || input.amount > 200000) {
      throw new Error('상품·용량·옵션·에이전트·쇼핑몰과 1,000~200,000원의 정수 금액을 확인해 주세요.');
    }
    const request = { agent: input.agent, store: input.store, item: input.item, size, option, amount: input.amount,
      id: input.id ?? `R${this.sequence + 1}` };
    // Validate both comparison arms before changing either one.
    for (const mode of ['shared', 'scoped']) {
      const old = this.records[mode].find(row => row.request.id === request.id);
      if (old && JSON.stringify(old.request) !== JSON.stringify(request)) {
        throw new Error('같은 요청 번호에 다른 내용은 넣을 수 없습니다. 새 요청으로 비교해 주세요.');
      }
    }
    const repeated = this.records.shared.some(row => row.request.id === request.id);
    if (!repeated) this.sequence += 1;
    this.lastRequest = { ...request };
    const result = { repeated, request };
    for (const mode of ['shared', 'scoped']) {
      let row = this.records[mode].find(record => record.request.id === request.id);
      if (!row) {
        row = { request: { ...request }, duplicateAlert: this.duplicateAlert, duplicateMatch: this.duplicateMatch,
          requiredQuantity: this.required(request), homeStock: this.stock(request), incoming: this.activeIncoming(request),
          quantityLimited: false, differentVariant: false, ...this.decide(mode, request) };
        this.records[mode].push(row);
      }
      result[mode] = row;
    }
    return result;
  }

  approve(mode, id, { allowDuplicate = false } = {}) {
    const row = this.records[mode]?.find(record => record.request.id === id);
    if (!row || row.status !== 'pending') return row;
    // Recheck revocation, purchase access and the current cumulative budget.
    Object.assign(row, { duplicateAlert: this.duplicateAlert, duplicateMatch: this.duplicateMatch,
      requiredQuantity: this.required(row.request), homeStock: this.stock(row.request), incoming: this.activeIncoming(row.request),
      quantityLimited: false, differentVariant: false },
      this.decide(mode, row.request, true, allowDuplicate));
    return row;
  }

  skip(mode, id) {
    const row = this.records[mode]?.find(record => record.request.id === id);
    if (!row || row.status !== 'pending') return row;
    Object.assign(row, { status: 'skipped', code: 'skipped', reason: '고객이 이번 구매를 하지 않기로 했습니다. 이 요청의 추가 지출은 없습니다.' });
    return row;
  }
}
