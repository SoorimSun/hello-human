import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ShoppingExperiment, stores } from '../assets/agent-shopping-model.js';

const order = (agent = 'a', amount = 24000, item = 'water', store = '홈앤쇼핑') => ({ agent, amount, item, store });

test('read-only identity is denied independently from the common buying permission', () => {
  const model = new ShoppingExperiment();
  const result = model.submit(order('c'));
  assert.equal(result.shared.status, 'ordered');
  assert.equal(result.scoped.code, 'read-only');
  assert.equal(model.spent('scoped'), 0);
});

test('pending orders recheck revocation and do not stop other agents', () => {
  const model = new ShoppingExperiment();
  const { request } = model.submit(order('b', 36000, 'snacks', 'SK스토아'));
  model.policies.b.active = false;
  assert.equal(model.approve('scoped', request.id).code, 'revoked');
  assert.equal(model.submit(order('a')).scoped.status, 'ordered');
});

test('a one-order approval does not raise the standing limit or buy twice', () => {
  const model = new ShoppingExperiment();
  const result = model.submit(order('a', 60000));
  assert.equal(result.scoped.status, 'pending');
  model.approve('scoped', result.request.id);
  model.approve('scoped', result.request.id);
  assert.equal(model.spent('scoped'), 60000);
  assert.equal(model.policies.a.limit, 30000);
  assert.equal(model.submit(result.request).repeated, true);
  assert.equal(model.spent('scoped'), 60000);
});

test('pending approvals cannot overspend a shared budget across stores', () => {
  const model = new ShoppingExperiment();
  model.totalLimit = 50000;
  const first = model.submit(order('b', 30000, 'snacks', 'SK스토아'));
  const second = model.submit(order('b', 30000, 'coffee', '홈앤쇼핑'));
  assert.equal(second.scoped.status, 'pending');
  assert.equal(model.approve('scoped', first.request.id).status, 'ordered');
  assert.equal(model.approve('scoped', second.request.id).code, 'budget');
  assert.equal(model.spent('scoped'), 30000);
});

test('changed payload with the same identity is rejected without changing either history', () => {
  const model = new ShoppingExperiment();
  const first = model.submit(order());
  assert.throws(() => model.submit({ ...first.request, amount: 25000 }), /같은 요청 번호/);
  assert.equal(model.records.shared.length, 1);
  assert.equal(model.records.scoped.length, 1);
  assert.equal(model.spent('shared'), 24000);
});

test('new requests can duplicate the same shopping need despite separate profiles', () => {
  const model = new ShoppingExperiment();
  model.submit(order('a'));
  const next = model.submit(order('b', 24000, 'water', 'SK스토아'));
  model.approve('scoped', next.request.id);
  assert.equal(model.spent('scoped'), 48000);
  assert.equal(model.records.scoped.filter(row => row.status === 'ordered').length, 2);
});

test('invalid amounts cannot corrupt the budget', () => {
  for (const amount of [-1, 0, NaN, 1200.5, 200001]) {
    const model = new ShoppingExperiment();
    assert.throws(() => model.submit(order('a', amount)));
    assert.equal(model.records.shared.length, 0);
  }
});

test('duplicate alerts pause a second agent across stores in both comparison arms', () => {
  for (const enabled of [false, true]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = enabled;
    model.policies.b.approval = 'within';
    model.submit(order('a'));
    const second = model.submit(order('b', 24000, 'water', 'SK스토아'));
    for (const mode of ['shared', 'scoped']) {
      assert.equal(second[mode].status, enabled ? 'pending' : 'ordered');
      assert.equal(model.spent(mode), enabled ? 24000 : 48000);
      if (enabled) assert.equal(second[mode].code, 'duplicate');
    }
  }
});

test('a customer can skip a duplicate or approve that one order without buying twice', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.submit(order('a'));
  const second = model.submit(order('b'));
  assert.equal(model.approve('scoped', second.request.id).code, 'duplicate');
  assert.equal(model.skip('shared', second.request.id).status, 'skipped');
  assert.equal(model.approve('shared', second.request.id)?.status, 'skipped');
  assert.equal(model.approve('scoped', second.request.id, { allowDuplicate: true }).status, 'ordered');
  model.approve('scoped', second.request.id, { allowDuplicate: true });
  model.submit(second.request);
  assert.equal(model.spent('shared'), 24000);
  assert.equal(model.spent('scoped'), 48000);
  assert.equal(model.duplicateAlert, true);
  assert.equal(model.policies.b.approval, 'always');
});

test('pending duplicates respect request order and do not prevent the first purchase', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  const first = model.submit(order('b'));
  const second = model.submit(order('a'));
  assert.equal(second.scoped.code, 'duplicate');
  assert.equal(model.approve('scoped', first.request.id).status, 'ordered');
  assert.equal(model.approve('scoped', second.request.id).code, 'duplicate');
});

test('duplicate confirmation never bypasses revoked access or the total budget', () => {
  for (const restriction of ['active', 'purchase', 'budget']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.submit(order('a'));
    const second = model.submit(order('b'));
    if (restriction === 'budget') model.totalLimit = 30000;
    else model.policies.b[restriction] = false;
    assert.equal(model.approve('scoped', second.request.id, { allowDuplicate: true }).status, 'blocked');
    assert.equal(model.spent('scoped'), 24000);
  }
});

test('current alert settings apply on approval without automatically completing a waiting order', () => {
  const model = new ShoppingExperiment();
  model.submit(order('a'));
  const second = model.submit(order('b'));
  model.duplicateAlert = true;
  assert.equal(model.approve('scoped', second.request.id).code, 'duplicate');
  model.duplicateAlert = false;
  assert.equal(second.scoped.status, 'pending');
  assert.equal(model.approve('scoped', second.request.id).status, 'ordered');
});

test('different products, same-agent retries and skipped requests do not trigger cross-agent alerts', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  const first = model.submit(order('b'));
  model.skip('scoped', first.request.id);
  assert.equal(model.submit(order('a')).scoped.status, 'ordered');
  assert.equal(model.submit(order('a')).scoped.status, 'ordered');
  assert.equal(model.submit(order('b', 18000, 'coffee')).scoped.code, 'approval');
});

test('name-only matching also holds different capacities and options', () => {
  for (const change of [{ size: 'large' }, { option: 'sport' }]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.policies.b.approval = 'within';
    model.submit(order('a'));
    const second = model.submit({ ...order('b', 24000, 'water', 'SK스토아'), ...change });
    for (const mode of ['shared', 'scoped']) {
      assert.equal(second[mode].code, 'duplicate');
      assert.equal(second[mode].differentVariant, true);
      assert.equal(model.spent(mode), 24000);
    }
  }
});

test('variant matching lets required differences proceed without disabling alerts', () => {
  for (const change of [{ size: 'large' }, { option: 'sport' }, { size: 'large', option: 'sport' }]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'variant';
    model.policies.b.approval = 'within';
    model.submit(order('a'));
    const second = model.submit({ ...order('b'), ...change });
    for (const mode of ['shared', 'scoped']) {
      assert.equal(second[mode].status, 'ordered');
      assert.equal(model.spent(mode), 48000);
    }
    assert.equal(model.duplicateAlert, true);
  }
});

test('identical variants still trigger alerts across all five fictional storefronts', () => {
  assert.deepEqual(stores, ['홈앤쇼핑', 'SK스토아', '쇼핑엔티', 'W쇼핑', '신세계라이브쇼핑']);
  for (const store of stores) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'variant';
    model.submit(order('a'));
    const second = model.submit(order('b', 24000, 'water', store));
    assert.equal(second.shared.code, 'duplicate');
    assert.equal(second.scoped.code, 'duplicate');
    assert.equal(second.scoped.differentVariant, false);
  }
});

test('request identity includes capacity and option and replays normalized defaults', () => {
  const model = new ShoppingExperiment();
  const first = model.submit(order('a'));
  assert.equal(first.request.size, 'small');
  assert.equal(first.request.option, 'standard');
  assert.equal(model.submit({ ...first.request, size: 'small', option: 'standard' }).repeated, true);
  for (const change of [{ size: 'large' }, { option: 'sport' }]) {
    assert.throws(() => model.submit({ ...first.request, ...change }), /같은 요청 번호/);
  }
  assert.equal(model.records.shared.length, 1);
  assert.equal(model.spent('scoped'), 24000);
});

test('invalid and product-incompatible specifications cannot create a request', () => {
  for (const change of [{ size: 'unknown' }, { option: 'decaf' }, { item: 'coffee', option: 'sport' }]) {
    const model = new ShoppingExperiment();
    assert.throws(() => model.submit({ ...order('a'), ...change }));
    assert.equal(model.records.shared.length, 0);
    assert.equal(model.sequence, 0);
  }
});

test('approval rechecks the current matching rule and still enforces revoked access', () => {
  for (const revoked of [false, true]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.submit(order('a'));
    const second = model.submit({ ...order('b'), size: 'large' });
    assert.equal(second.scoped.code, 'duplicate');
    model.duplicateMatch = 'variant';
    if (revoked) model.policies.b.active = false;
    assert.equal(model.approve('scoped', second.request.id).status, revoked ? 'blocked' : 'ordered');
    assert.equal(second.scoped.duplicateMatch, 'variant');
    assert.equal(second.scoped.differentVariant, false);
  }
});

test('a growing group needs an identical second pack only quantity matching releases', () => {
  for (const matching of ['variant', 'quantity']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = matching;
    model.policies.b.approval = 'within';
    const first = model.submit(order('a'));
    model.setRequired(first.request, 2);
    const second = model.submit(order('b', 24000, 'water', 'SK스토아'));
    for (const mode of ['shared', 'scoped']) {
      assert.equal(first[mode].requiredQuantity, 1);
      assert.equal(second[mode].requiredQuantity, 2);
      assert.equal(second[mode].status, matching === 'quantity' ? 'ordered' : 'pending');
    }
  }
});

test('quantity matching counts all agents and stores and holds the third pack', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.duplicateMatch = 'quantity';
  model.policies.b.approval = 'within';
  model.setRequired(order(), 2);
  model.submit(order('a'));
  model.submit(order('b', 24000, 'water', '쇼핑엔티'));
  const third = model.submit(order('b', 24000, 'water', '신세계라이브쇼핑'));
  for (const mode of ['shared', 'scoped']) {
    assert.equal(third[mode].code, 'duplicate');
    assert.equal(third[mode].quantityLimited, true);
    assert.equal(model.spent(mode), 48000);
  }
  assert.equal(model.submit(third.request).repeated, true);
  assert.equal(model.records.scoped.length, 3);
});

test('pending packs count once and skipped packs no longer consume the target', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.duplicateMatch = 'quantity';
  model.setRequired(order(), 2);
  const first = model.submit(order('b'));
  const second = model.submit(order('b', 24000, 'water', 'W쇼핑'));
  assert.equal(first.scoped.code, 'approval');
  assert.equal(second.scoped.code, 'approval');
  assert.equal(model.approve('scoped', first.request.id).status, 'ordered');
  assert.equal(model.approve('scoped', second.request.id).status, 'ordered');
  assert.equal(model.spent('scoped'), 48000);

  const skipped = new ShoppingExperiment();
  skipped.duplicateAlert = true;
  skipped.duplicateMatch = 'quantity';
  const pending = skipped.submit(order('b'));
  const waiting = skipped.submit(order('a'));
  assert.equal(waiting.scoped.quantityLimited, true);
  skipped.skip('scoped', pending.request.id);
  assert.equal(skipped.approve('scoped', waiting.request.id).status, 'ordered');
});

test('approval rechecks both increases and decreases in the required quantity', () => {
  for (const target of [1, 2]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setRequired(order(), 3 - target);
    model.submit(order('a'));
    const second = model.submit(order('b'));
    model.setRequired(order(), target);
    assert.equal(model.approve('scoped', second.request.id).status, target === 2 ? 'ordered' : 'pending');
    assert.equal(second.scoped.requiredQuantity, target);
  }
});

test('required quantities belong to exact variants and invalid targets cannot change them', () => {
  const model = new ShoppingExperiment();
  model.setRequired(order(), 2);
  assert.equal(model.required(order()), 2);
  assert.equal(model.required({ ...order(), size: 'large' }), 1);
  assert.equal(model.required({ ...order(), option: 'sport' }), 1);
  for (const quantity of [0, -1, 1.5, NaN, 4]) assert.throws(() => model.setRequired(order(), quantity));
  assert.throws(() => model.setRequired({ ...order(), option: 'unknown' }, 2));
  assert.equal(model.required(order()), 2);
});

test('quantity overrides remain one-order approvals and respect access and budget', () => {
  for (const restriction of ['none', 'active', 'purchase', 'budget']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.submit(order('a'));
    const second = model.submit(order('b'));
    assert.equal(second.scoped.quantityLimited, true);
    if (restriction === 'budget') model.totalLimit = 30000;
    else if (restriction !== 'none') model.policies.b[restriction] = false;
    assert.equal(model.approve('scoped', second.request.id, { allowDuplicate: true }).status, restriction === 'none' ? 'ordered' : 'blocked');
    model.approve('scoped', second.request.id, { allowDuplicate: true });
    assert.equal(model.required(second.request), 1);
    assert.equal(model.spent('scoped'), restriction === 'none' ? 48000 : 24000);
  }
});

test('home bottles reduce new purchases and the next pack triggers an alert', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.duplicateMatch = 'quantity';
  model.policies.b.approval = 'within';
  model.setRequired(order(), 2);
  model.setStock(order(), 20);
  const first = model.submit(order('a'));
  const second = model.submit(order('b', 24000, 'water', 'SK스토아'));
  for (const mode of ['shared', 'scoped']) {
    assert.equal(first[mode].status, 'ordered');
    assert.equal(second[mode].code, 'duplicate');
    assert.equal(second[mode].homeStock, 20);
    assert.equal(model.spent(mode), 24000);
  }
});

test('partial packs round up only the shortage and sufficient stock needs no purchase', () => {
  for (const [stock, target] of [[0, 2], [10, 2], [20, 1], [40, 0], [50, 0]]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setRequired(order(), 2);
    model.setStock(order(), stock);
    assert.equal(model.purchaseTarget(order()), target);
    for (let i = 0; i < 3; i++) {
      const result = model.submit(order('a'));
      assert.equal(result.scoped.status, i < target ? 'ordered' : 'pending');
    }
    assert.equal(model.spent('scoped'), target * 24000);
  }
});

test('home stock is kept by exact water configuration with its own bottles per pack', () => {
  const model = new ShoppingExperiment();
  model.setRequired(order(), 2);
  model.setStock(order(), 20);
  assert.equal(model.stock({ ...order(), option: 'sport' }), 0);
  assert.equal(model.stock({ ...order(), size: 'large' }), 0);
  const large = { ...order(), size: 'large' };
  model.setRequired(large, 2);
  model.setStock(large, 6);
  assert.equal(model.purchaseTarget(large), 1);
  assert.equal(model.stock(order()), 20);
  for (const value of [-1, 0.5, NaN, Infinity, 201]) assert.throws(() => model.setStock(order(), value));
  assert.throws(() => model.setStock({ ...order(), option: 'unknown' }, 10));
  assert.throws(() => model.setStock({ ...order(), item: 'coffee' }, 1));
  assert.equal(model.stock(order()), 20);
});

test('approvals recheck home stock increases and decreases without rewriting history', () => {
  for (const [before, after] of [[0, 20], [20, 0]]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setRequired(order(), 2);
    model.setStock(order(), before);
    const first = model.submit(order('a'));
    const second = model.submit(order('b'));
    model.setStock(order(), after);
    assert.equal(model.submit(second.request).scoped.homeStock, before);
    const approved = model.approve('scoped', second.request.id);
    assert.equal(approved.status, after === 20 ? 'pending' : 'ordered');
    assert.equal(approved.homeStock, after);
    assert.equal(first.scoped.homeStock, before);
  }
});

test('home stock and pending orders are counted once and skipped reservations release', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.duplicateMatch = 'quantity';
  model.setRequired(order(), 2);
  model.setStock(order(), 20);
  const first = model.submit(order('b'));
  const second = model.submit(order('a'));
  assert.equal(first.scoped.code, 'approval');
  assert.equal(second.scoped.code, 'duplicate');
  assert.equal(model.spent('scoped'), 0);
  model.skip('scoped', first.request.id);
  assert.equal(model.approve('scoped', second.request.id).status, 'ordered');
  assert.equal(model.submit(second.request).repeated, true);
  assert.equal(model.spent('scoped'), 24000);
  assert.equal(model.stock(order()), 20);
});

test('home stock only affects the quantity rule when alerts are enabled', () => {
  for (const matching of ['name', 'variant', 'quantity']) {
    for (const alert of [false, true]) {
      const model = new ShoppingExperiment();
      model.duplicateMatch = matching;
      model.duplicateAlert = alert;
      model.setRequired(order(), 2);
      model.setStock(order(), 40);
      assert.equal(model.submit(order('a')).scoped.status, alert && matching === 'quantity' ? 'pending' : 'ordered');
    }
  }
});

test('buying despite sufficient home stock still enforces current access and budget', () => {
  for (const restriction of ['none', 'active', 'purchase', 'budget']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setStock(order(), 20);
    const pending = model.submit(order('a'));
    if (restriction === 'budget') model.totalLimit = 10000;
    else if (restriction !== 'none') model.policies.a[restriction] = false;
    const result = model.approve('scoped', pending.request.id, { allowDuplicate: true });
    assert.equal(result.status, restriction === 'none' ? 'ordered' : 'blocked');
    assert.equal(model.stock(order()), 20);
    assert.equal(model.required(order()), 1);
  }
});

test('only shipments expected before the meeting reduce new purchases', () => {
  for (const arrival of ['before', 'after', 'unknown']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.policies.b.approval = 'within';
    model.setRequired(order(), 2);
    model.setIncoming(order(), { bottles: 20, arrival });
    assert.equal(model.spent('scoped'), 0);
    const first = model.submit(order('a'));
    const second = model.submit(order('b', 24000, 'water', 'SK스토아'));
    for (const mode of ['shared', 'scoped']) {
      assert.equal(first[mode].status, 'ordered');
      assert.equal(second[mode].status, arrival === 'before' ? 'pending' : 'ordered');
      assert.equal(model.spent(mode), arrival === 'before' ? 24000 : 48000);
      assert.deepEqual(second[mode].incoming, { bottles: 20, arrival });
    }
  }
});

test('home and timely shipments combine before rounding the shortage to whole packs', () => {
  for (const [home, incoming, arrival, target] of [[10, 10, 'before', 1], [10, 10, 'after', 2], [0, 10, 'before', 2], [0, 40, 'before', 0], [10, 40, 'before', 0]]) {
    const model = new ShoppingExperiment();
    model.setRequired(order(), 2);
    model.setStock(order(), home);
    model.setIncoming(order(), { bottles: incoming, arrival });
    assert.equal(model.purchaseTarget(order()), target);
    assert.equal(model.availableStock(order()), home + (arrival === 'before' ? incoming : 0));
  }
});

test('incoming shipments are validated and isolated by variant and from callers', () => {
  const model = new ShoppingExperiment();
  const incoming = { bottles: 20, arrival: 'before' };
  model.setIncoming(order(), incoming);
  incoming.bottles = 200;
  const copy = model.incoming(order());
  copy.arrival = 'after';
  assert.deepEqual(model.incoming(order()), { bottles: 20, arrival: 'before' });
  assert.equal(model.incoming({ ...order(), size: 'large' }).bottles, 0);
  assert.equal(model.incoming({ ...order(), option: 'sport' }).bottles, 0);
  for (const bottles of [-1, 0.5, NaN, Infinity, 201]) assert.throws(() => model.setIncoming(order(), { bottles, arrival: 'before' }));
  assert.throws(() => model.setIncoming(order(), { bottles: 20, arrival: 'invalid' }));
  assert.throws(() => model.setIncoming({ ...order(), option: 'unknown' }, { bottles: 20, arrival: 'before' }));
  assert.throws(() => model.setIncoming({ ...order(), item: 'coffee' }, { bottles: 20, arrival: 'before' }));
  assert.deepEqual(model.incoming(order()), { bottles: 20, arrival: 'before' });
});

test('approval rechecks a delayed or earlier shipment while replay preserves the old decision', () => {
  for (const [before, after] of [['before', 'after'], ['after', 'before']]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setRequired(order(), 2);
    model.setIncoming(order(), { bottles: 20, arrival: before });
    const first = model.submit(order('a'));
    const second = model.submit(order('b'));
    model.setIncoming(order(), { bottles: 20, arrival: after });
    assert.equal(model.submit(second.request).scoped.incoming.arrival, before);
    assert.equal(model.approve('scoped', second.request.id).status, after === 'before' ? 'pending' : 'ordered');
    assert.equal(second.scoped.incoming.arrival, after);
    assert.equal(first.scoped.incoming.arrival, before);
  }
});

test('shipments and pending purchases are counted once and skips release the purchase slot', () => {
  const model = new ShoppingExperiment();
  model.duplicateAlert = true;
  model.duplicateMatch = 'quantity';
  model.setRequired(order(), 2);
  model.setIncoming(order(), { bottles: 20, arrival: 'before' });
  const first = model.submit(order('b'));
  const second = model.submit(order('a'));
  assert.equal(first.scoped.code, 'approval');
  assert.equal(second.scoped.code, 'duplicate');
  model.skip('scoped', first.request.id);
  assert.equal(model.approve('scoped', second.request.id).status, 'ordered');
  assert.equal(model.submit(second.request).repeated, true);
  assert.equal(model.spent('scoped'), 24000);
  assert.deepEqual(model.incoming(order()), { bottles: 20, arrival: 'before' });
});

test('shipment timing only changes duplicate decisions in the enabled quantity rule', () => {
  for (const matching of ['name', 'variant', 'quantity']) {
    for (const alert of [false, true]) {
      const model = new ShoppingExperiment();
      model.duplicateMatch = matching;
      model.duplicateAlert = alert;
      model.setIncoming(order(), { bottles: 20, arrival: 'before' });
      assert.equal(model.submit(order('a')).scoped.status, alert && matching === 'quantity' ? 'pending' : 'ordered');
    }
  }
});

test('approving around incoming shipments never bypasses current access or budget', () => {
  for (const restriction of ['none', 'active', 'purchase', 'budget']) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.setIncoming(order(), { bottles: 20, arrival: 'before' });
    const pending = model.submit(order('a'));
    if (restriction === 'budget') model.totalLimit = 10000;
    else if (restriction !== 'none') model.policies.a[restriction] = false;
    assert.equal(model.approve('scoped', pending.request.id, { allowDuplicate: true }).status, restriction === 'none' ? 'ordered' : 'blocked');
    assert.deepEqual(model.incoming(order()), { bottles: 20, arrival: 'before' });
  }
});

test('cancelling a late existing order changes refunds and leftovers but not replacement purchases', () => {
  for (const canCancel of [true, false]) {
    const model = new ShoppingExperiment();
    model.duplicateAlert = true;
    model.duplicateMatch = 'quantity';
    model.policies.b.approval = 'within';
    model.setRequired(order(), 2);
    model.setIncoming(order(), { bottles: 20, arrival: 'after' });
    model.setCancellation(order(), { paid: 24000, canCancel });
    model.submit(order('a'));
    model.submit(order('b'));
    assert.equal(model.settlement('scoped', order()).netCost, 72000);
    assert.equal(model.settlement('scoped', order()).leftoverMin, 20);
    assert.equal(model.cancelIncoming(order()).cancelled, canCancel);
    for (const mode of ['shared', 'scoped']) {
      const result = model.settlement(mode, order());
      assert.equal(result.newCost, 48000);
      assert.equal(result.refund, canCancel ? 24000 : 0);
      assert.equal(result.netCost, canCancel ? 48000 : 72000);
      assert.equal(result.leftoverMin, canCancel ? 0 : 20);
      assert.equal(result.leftoverMax, result.leftoverMin);
      assert.equal(result.shortage, 0);
    }
    assert.equal(model.purchaseTarget(order()), 2);
    assert.equal(model.incoming(order()).bottles, 20);
    assert.equal(model.activeIncoming(order()).bottles, canCancel ? 0 : 20);
  }
});

test('unavailable cancellation keeps the original order and never refunds', () => {
  const model = new ShoppingExperiment();
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: false });
  for (let i = 0; i < 2; i++) {
    assert.equal(model.cancelIncoming(order()).cancelled, false);
    assert.equal(model.settlement('shared', order()).refund, 0);
  }
  assert.equal(model.activeIncoming(order()).bottles, 20);
});

test('a successful cancellation is idempotent and cannot be silently undone by editing inputs', () => {
  const model = new ShoppingExperiment();
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true });
  model.cancelIncoming(order());
  assert.equal(model.cancelIncoming(order()).repeated, true);
  assert.equal(model.settlement('scoped', order()).refund, 24000);
  assert.equal(model.settlement('scoped', order()).netCost, 0);
  assert.throws(() => model.setIncoming(order(), { bottles: 40, arrival: 'after' }));
  assert.throws(() => model.setIncoming(order(), { bottles: 20, arrival: 'before' }));
  assert.throws(() => model.setCancellation(order(), { paid: 48000, canCancel: true }));
  const copy = model.cancellation(order());
  copy.cancelled = false;
  assert.equal(model.cancellation(order()).cancelled, true);
});

test('leftovers do not use late arrivals to hide a shortage at the meeting', () => {
  const model = new ShoppingExperiment();
  model.setRequired(order(), 2);
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: false });
  model.submit(order('a'));
  const pending = model.submit(order('b'));
  const result = model.settlement('scoped', order());
  assert.equal(result.newCost, 24000);
  assert.equal(result.shortage, 20);
  assert.equal(result.leftoverMin, 20);
  assert.equal(result.netCost, 48000);
  model.skip('scoped', pending.request.id);
  assert.equal(model.settlement('scoped', order()).leftoverMin, 20);
});

test('this cancellation exercise is limited to late orders and uncertain leftovers stay a range', () => {
  for (const arrival of ['before', 'unknown']) {
    const model = new ShoppingExperiment();
    model.setRequired(order(), 2);
    model.setIncoming(order(), { bottles: 20, arrival });
    model.setCancellation(order(), { paid: 24000, canCancel: true });
    model.submit(order('a'));
    assert.equal(model.cancelIncoming(order()).cancelled, false);
    const result = model.settlement('scoped', order());
    assert.equal(result.refund, 0);
    assert.equal(result.leftoverMin, 0);
    assert.equal(result.leftoverMax, arrival === 'unknown' ? 20 : 0);
    assert.equal(result.shortage, arrival === 'unknown' ? 20 : 0);
  }
});

test('cancellation terms validate amount, eligibility and the existing water shipment', () => {
  const model = new ShoppingExperiment();
  assert.throws(() => model.setCancellation(order(), { paid: 24000, canCancel: true }));
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  for (const paid of [-1, 0.5, NaN, Infinity, 200001]) assert.throws(() => model.setCancellation(order(), { paid, canCancel: true }));
  assert.throws(() => model.setCancellation(order(), { paid: 24000, canCancel: 'yes' }));
  assert.throws(() => model.setCancellation({ ...order(), item: 'coffee' }, { paid: 24000, canCancel: true }));
  assert.equal(model.cancellation(order()), null);
});

test('cancellation accounting remains separate for each water configuration', () => {
  const model = new ShoppingExperiment();
  const sport = { ...order(), size: 'small', option: 'sport' };
  for (const request of [order(), sport]) {
    model.setIncoming(request, { bottles: 20, arrival: 'after' });
    model.setCancellation(request, { paid: 24000, canCancel: true });
  }
  model.submit(sport);
  model.cancelIncoming(order());
  assert.equal(model.cancellation(sport).cancelled, false);
  assert.equal(model.settlement('shared', order()).newCost, 0);
  assert.equal(model.settlement('shared', sport).netCost, 48000);
});

test('refunds for existing orders do not grant more new-purchase budget', () => {
  const model = new ShoppingExperiment();
  model.totalLimit = 50000;
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true });
  model.submit(order('a'));
  model.submit(order('a'));
  model.cancelIncoming(order());
  const third = model.submit(order('a'));
  assert.equal(third.shared.code, 'budget');
  assert.equal(third.scoped.code, 'budget');
  assert.equal(model.spent('scoped'), 48000);
});

test('refund and fee comparisons keep replacement costs fixed and can make cancellation more expensive', () => {
  for (const [refundAmount, fee, netCost] of [[24000, 3000, 51000], [12000, 0, 60000], [12000, 3000, 63000], [12000, 12000, 72000], [12000, 15000, 75000], [0, 0, 72000]]) {
    const model = new ShoppingExperiment();
    model.policies.b.approval = 'within';
    model.setRequired(order(), 2);
    model.setIncoming(order(), { bottles: 20, arrival: 'after' });
    model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount, fee });
    model.submit(order('a'));
    model.submit(order('b'));
    for (const mode of ['shared', 'scoped']) {
      const comparison = model.cancellationComparison(mode, order());
      assert.equal(comparison.keep.netCost, 72000);
      assert.equal(comparison.keep.leftoverMin, 20);
      assert.equal(comparison.cancel.netCost, netCost);
      assert.equal(comparison.cancel.leftoverMin, 0);
      assert.equal(comparison.cancel.newCost, 48000);
      assert.equal(comparison.cancel.refund, refundAmount);
      assert.equal(comparison.cancel.fee, fee);
    }
    model.cancelIncoming(order());
    assert.equal(model.settlement('scoped', order()).netCost, netCost);
    assert.equal(model.spent('scoped'), 48000);
  }
});

test('previewing cancellation never applies refunds, fees or changes order history', () => {
  const model = new ShoppingExperiment();
  model.setRequired(order(), 2);
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount: 12000, fee: 3000 });
  model.submit(order('a'));
  model.submit(order('b'));
  const history = structuredClone(model.records);
  const before = model.settlement('scoped', order());
  const comparison = model.cancellationComparison('scoped', order());
  assert.equal(comparison.keep.shortage, 20);
  assert.equal(comparison.cancel.shortage, 20);
  assert.equal(comparison.cancel.newCost, 24000);
  assert.equal(comparison.cancel.netCost, 39000);
  assert.equal(model.cancellation(order()).cancelled, false);
  assert.deepEqual(model.records, history);
  assert.deepEqual(model.settlement('scoped', order()), before);
  assert.equal(before.refund, 0);
  assert.equal(before.fee, 0);
  comparison.cancel.netCost = 0;
  assert.equal(model.cancellationComparison('scoped', order()).cancel.netCost, 39000);
});

test('failed cancellation has no fee or refund and no available cancel comparison', () => {
  for (const [arrival, canCancel] of [['after', false], ['before', true], ['unknown', true]]) {
    const model = new ShoppingExperiment();
    model.setIncoming(order(), { bottles: 20, arrival });
    model.setCancellation(order(), { paid: 24000, canCancel, refundAmount: 12000, fee: 3000 });
    assert.equal(model.cancellationComparison('shared', order()).cancel, null);
    assert.equal(model.cancelIncoming(order()).cancelled, false);
    assert.equal(model.settlement('shared', order()).refund, 0);
    assert.equal(model.settlement('shared', order()).fee, 0);
    assert.equal(model.settlement('shared', order()).netCost, 24000);
  }
});

test('a repeated cancellation applies the fee and partial refund only once', () => {
  const model = new ShoppingExperiment();
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount: 12000, fee: 3000 });
  model.cancelIncoming(order());
  assert.equal(model.cancelIncoming(order()).repeated, true);
  assert.equal(model.settlement('shared', order()).netCost, 15000);
  assert.equal(model.settlement('shared', order()).fee, 3000);
  assert.equal(model.settlement('shared', order()).refund, 12000);
  assert.equal(model.cancellationComparison('shared', order()).keep.leftoverMin, 20);
  assert.deepEqual(model.cancellationComparison('shared', order()).cancel, model.settlement('shared', order()));
});

test('refunds cannot exceed the payment and fees must be nonnegative whole won', () => {
  const model = new ShoppingExperiment();
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  for (const refundAmount of [-1, 24001, 0.5, NaN, Infinity, '12000']) {
    assert.throws(() => model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount }));
  }
  for (const fee of [-1, 200001, 0.5, NaN, Infinity, '3000']) {
    assert.throws(() => model.setCancellation(order(), { paid: 24000, canCancel: true, fee }));
  }
  assert.equal(model.cancellation(order()), null);
  model.setCancellation(order(), { paid: 24000, canCancel: true });
  assert.equal(model.cancellation(order()).refundAmount, 24000);
  assert.equal(model.cancellation(order()).fee, 0);
});

test('fee and partial refund never change the new-purchase budget or other water options', () => {
  const model = new ShoppingExperiment();
  const sport = { ...order(), size: 'small', option: 'sport' };
  model.totalLimit = 50000;
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount: 12000, fee: 15000 });
  model.submit(order('a'));
  model.cancelIncoming(order());
  assert.equal(model.submit(order('a')).scoped.status, 'ordered');
  assert.equal(model.submit(order('a')).scoped.code, 'budget');
  assert.equal(model.spent('scoped'), 48000);
  assert.equal(model.settlement('scoped', sport).fee, 0);
  assert.equal(model.settlement('scoped', sport).refund, 0);
  assert.equal(model.cancellationComparison('scoped', sport).cancel, null);
});

function nextMeetingModel({ refundAmount = 12000, fee = 3000, canCancel = true } = {}) {
  const model = new ShoppingExperiment();
  model.policies.b.approval = 'within';
  model.setRequired(order(), 2);
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel, refundAmount, fee });
  model.submit(order('a'));
  model.submit(order('b'));
  return model;
}

test('using leftovers next time can reverse which cancellation choice costs less', () => {
  const model = nextMeetingModel();
  for (const mode of ['shared', 'scoped']) {
    const reuse = model.nextMeetingComparison(mode, order(), { requiredBottles: 20, reuseLeftovers: true });
    assert.equal(reuse.keep.nextPacks, 0);
    assert.equal(reuse.keep.nextCost, 0);
    assert.equal(reuse.keep.combinedCost, 72000);
    assert.equal(reuse.cancel.nextPacks, 1);
    assert.equal(reuse.cancel.nextCost, 24000);
    assert.equal(reuse.cancel.combinedCost, 87000);
    const noReuse = model.nextMeetingComparison(mode, order(), { requiredBottles: 20, reuseLeftovers: false });
    assert.equal(noReuse.keep.nextCost, 24000);
    assert.equal(noReuse.keep.combinedCost, 96000);
    assert.equal(noReuse.cancel.combinedCost, 87000);
    assert.equal(noReuse.keep.excludedLeftovers, 20);
    assert.equal(noReuse.keep.nextLeftover, 0);
  }
});

test('no next meeting purchase means unused water is not counted as cash savings', () => {
  const model = nextMeetingModel();
  for (const reuseLeftovers of [true, false]) {
    const result = model.nextMeetingComparison('scoped', order(), { requiredBottles: 0, reuseLeftovers });
    assert.equal(result.keep.nextCost, 0);
    assert.equal(result.cancel.nextCost, 0);
    assert.equal(result.keep.combinedCost, 72000);
    assert.equal(result.cancel.combinedCost, 63000);
    assert.equal(result.keep.nextLeftover, reuseLeftovers ? 20 : 0);
  }
});

test('next meeting purchases round up to whole packs and show usable surplus', () => {
  const model = nextMeetingModel();
  for (const [requiredBottles, keepPacks, cancelPacks, leftover] of [[10, 0, 1, 10], [20, 0, 1, 0], [40, 1, 2, 0]]) {
    const result = model.nextMeetingComparison('scoped', order(), { requiredBottles, reuseLeftovers: true });
    assert.equal(result.keep.nextPacks, keepPacks);
    assert.equal(result.cancel.nextPacks, cancelPacks);
    assert.equal(result.keep.nextLeftover, leftover);
    assert.equal(result.cancel.nextLeftover, leftover);
  }
  model.setStock(order(), 10);
  const result = model.nextMeetingComparison('scoped', order(), { requiredBottles: 40, reuseLeftovers: true });
  assert.equal(result.keep.reusableBottles, 30);
  assert.equal(result.cancel.reusableBottles, 10);
  assert.equal(result.keep.nextPacks, 1);
  assert.equal(result.cancel.nextPacks, 2);
  assert.equal(result.keep.nextLeftover, 10);
  assert.equal(result.cancel.nextLeftover, 10);
});

test('full refund can tie over two meetings and post-cancellation comparisons remain hypothetical', () => {
  const model = nextMeetingModel({ refundAmount: 24000, fee: 0 });
  const options = { requiredBottles: 20, reuseLeftovers: true };
  const before = model.nextMeetingComparison('scoped', order(), options);
  assert.equal(before.keep.combinedCost, 72000);
  assert.equal(before.cancel.combinedCost, 72000);
  model.cancelIncoming(order());
  assert.deepEqual(model.nextMeetingComparison('scoped', order(), options), before);
  const unavailable = nextMeetingModel({ canCancel: false });
  assert.equal(unavailable.nextMeetingComparison('scoped', order(), options).cancel, null);
});

test('next meeting forecasts exclude pending purchases and never spend or change current demand', () => {
  const model = new ShoppingExperiment();
  model.totalLimit = 50000;
  model.setRequired(order(), 2);
  model.setIncoming(order(), { bottles: 20, arrival: 'after' });
  model.setCancellation(order(), { paid: 24000, canCancel: true, refundAmount: 12000, fee: 3000 });
  model.submit(order('a'));
  model.submit(order('b'));
  const records = structuredClone(model.records);
  const result = model.nextMeetingComparison('scoped', order(), { requiredBottles: 40, reuseLeftovers: true });
  assert.equal(result.keep.shortage, 20);
  assert.equal(result.cancel.shortage, 20);
  assert.equal(result.keep.newCost, 24000);
  assert.equal(result.keep.combinedCost, 72000);
  assert.equal(result.cancel.combinedCost, 87000);
  assert.deepEqual(model.records, records);
  assert.equal(model.spent('scoped'), 24000);
  assert.equal(model.required(order()), 2);
  assert.equal(model.totalLimit, 50000);
  assert.equal(model.cancellation(order()).cancelled, false);
});

test('reuse forecasts separate water options and use the selected pack size', () => {
  const model = nextMeetingModel();
  const large = { ...order(), size: 'large', option: 'standard' };
  model.setRequired(large, 1);
  model.setIncoming(large, { bottles: 6, arrival: 'after' });
  model.setCancellation(large, { paid: 24000, canCancel: true });
  model.submit(large);
  const result = model.nextMeetingComparison('shared', large, { requiredBottles: 7, reuseLeftovers: true });
  assert.equal(result.keep.reusableBottles, 6);
  assert.equal(result.keep.nextPacks, 1);
  assert.equal(result.cancel.nextPacks, 2);
  assert.equal(result.keep.nextLeftover, 5);
  assert.equal(result.cancel.nextLeftover, 5);
  assert.equal(result.keep.newCost, 24000);
});

test('next meeting assumptions validate quantity and reuse and do not hide uncertain stock', () => {
  const model = nextMeetingModel();
  for (const requiredBottles of [-1, 0.5, 201, NaN, Infinity, '20']) {
    assert.throws(() => model.nextMeetingComparison('shared', order(), { requiredBottles, reuseLeftovers: true }), /다음 모임/);
  }
  assert.throws(() => model.nextMeetingComparison('shared', order(), { requiredBottles: 20, reuseLeftovers: 'yes' }), /다음 모임/);
  const uncertain = new ShoppingExperiment();
  uncertain.setIncoming(order(), { bottles: 20, arrival: 'unknown' });
  assert.throws(() => uncertain.nextMeetingComparison('shared', order(), { requiredBottles: 20, reuseLeftovers: true }), /잔여량/);
});
