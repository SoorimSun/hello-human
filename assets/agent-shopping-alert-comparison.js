import { ShoppingExperiment, matchRules, sameVariant } from './agent-shopping-model.js?v=9';

const variants = {
  same: { size: 'small', option: 'standard' },
  size: { size: 'large', option: 'standard' },
  option: { size: 'small', option: 'sport' },
  growth: { size: 'small', option: 'standard' }
};

// Each arm starts fresh and receives the same two requests. No approvals are replayed.
export function runComparedAlertScenario({ scenario, enabled, matching, storeA, storeB }) {
  if (!Object.hasOwn(variants, scenario) || !Object.hasOwn(matchRules, matching) || typeof enabled !== 'boolean') {
    throw new Error('중복 알림의 상황과 비교 기준을 확인해 주세요.');
  }
  const run = alert => {
    const model = new ShoppingExperiment();
    model.duplicateAlert = alert;
    model.duplicateMatch = matching;
    model.policies.b.approval = 'within';
    const first = model.submit({ agent: 'a', store: storeA, item: 'water', amount: 24000 });
    if (scenario === 'growth') model.setRequired(first.request, 2);
    const second = model.submit({ agent: 'b', store: storeB, item: 'water', amount: 24000, ...variants[scenario] });
    return { model, first, second };
  };
  const off = run(false);
  const on = run(true);
  const snapshot = ({ model }) => Object.fromEntries(['shared', 'scoped'].map(mode => {
    const rows = model.records[mode];
    const ordered = rows.filter(row => row.status === 'ordered');
    const configurations = rows.map(row => row.request).filter((request, index, all) =>
      !all.slice(0, index).some(other => sameVariant(request, other)));
    return [mode, {
      purchases: ordered.length,
      spent: model.spent(mode),
      pending: rows.filter(row => row.status === 'pending').length,
      needed: configurations.reduce((total, request) => total + Math.max(0,
        model.purchaseTarget(request) - ordered.filter(row => sameVariant(row.request, request)).length), 0)
    }];
  }));
  return {
    ...(enabled ? on : off),
    comparison: { scenario, matching, storeA, storeB, enabled, off: snapshot(off), on: snapshot(on) }
  };
}
