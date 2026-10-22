import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runComparedAlertScenario } from '../assets/agent-shopping-alert-comparison.js';

const settings = { scenario: 'same', enabled: true, matching: 'name', storeA: '홈앤쇼핑', storeB: 'SK스토아' };

test('on/off comparison counts pending requests separately and runs only the chosen arm', () => {
  for (const enabled of [false, true]) {
    const { model, comparison } = runComparedAlertScenario({ ...settings, enabled });
    assert.deepEqual(comparison.off.shared, { purchases: 2, spent: 48000, pending: 0, needed: 0 });
    assert.deepEqual(comparison.on.shared, { purchases: 1, spent: 24000, pending: 1, needed: 0 });
    assert.equal(model.spent('shared'), enabled ? 24000 : 48000);
    assert.equal(model.sequence, 2);
    assert.deepEqual(comparison.off.shared, comparison.off.scoped);
    assert.deepEqual(comparison.on.shared, comparison.on.scoped);
  }
});

test('different sizes and options expose necessary purchases held by name-only matching', () => {
  for (const scenario of ['size', 'option']) {
    const broad = runComparedAlertScenario({ ...settings, scenario }).comparison;
    assert.equal(broad.on.scoped.needed, 1);
    const precise = runComparedAlertScenario({ ...settings, scenario, matching: 'variant', storeA: '쇼핑엔티', storeB: '신세계라이브쇼핑' }).comparison;
    assert.deepEqual(precise.on.scoped, precise.off.scoped);
    assert.equal(precise.on.scoped.needed, 0);
  }
});

test('growing demand is introduced after the first order and quantity matching permits both purchases', () => {
  const broad = runComparedAlertScenario({ ...settings, scenario: 'growth', matching: 'variant' });
  assert.equal(broad.comparison.on.scoped.needed, 1);
  const precise = runComparedAlertScenario({ ...settings, scenario: 'growth', matching: 'quantity', storeB: 'W쇼핑' });
  assert.deepEqual(precise.comparison.on.scoped, precise.comparison.off.scoped);
  assert.deepEqual(precise.model.records.scoped.map(row => row.requiredQuantity), [1, 2]);
});

test('initial comparison remains a snapshot after approval, skip, and additional requests', () => {
  const { model, comparison, second } = runComparedAlertScenario(settings);
  const original = structuredClone(comparison);
  model.approve('scoped', second.request.id, { allowDuplicate: true });
  model.skip('shared', second.request.id);
  const { id, ...next } = second.request;
  model.submit(next);
  assert.deepEqual(comparison, original);
  assert.equal(model.spent('scoped'), 48000);
  assert.equal(model.sequence, 3);
});
