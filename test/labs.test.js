const test = require('node:test');
const assert = require('node:assert');
const { normalize, evaluate, redFlags } = require('../lib/labs');
const { FOODS, BY_ID } = require('../lib/purine-db');

test('uric acid mg/dL converts to µmol/L', () => {
  assert.strictEqual(Math.round(normalize('uric_acid', 7.2, 'mg/dL')), 428);
  assert.strictEqual(normalize('uric_acid', 428, 'µmol/L'), 428);
  assert.strictEqual(normalize('uric_acid', 428, 'umol/L'), 428);
  assert.strictEqual(Math.round(normalize('uric_acid', 0.43, 'mmol/L')), 430);
  assert.strictEqual(Math.round(normalize('uric_acid', 6, '')), 357); // 没单位时用大小猜
});

test('uric acid judgement uses 360, or 300 with tophi', () => {
  const [a] = evaluate([{ key: 'uric_acid', value: 340, unit: 'µmol/L' }], {});
  assert.strictEqual(a.status, 'good');
  const [b] = evaluate([{ key: 'uric_acid', value: 340, unit: 'µmol/L' }], { tophi: true });
  assert.strictEqual(b.status, 'borderline');
  const [c] = evaluate([{ key: 'uric_acid', value: 500, unit: 'µmol/L' }], {});
  assert.strictEqual(c.status, 'high');
  assert.strictEqual(c.zh, '尿酸');
  assert.ok(c.label.zh && c.label.en);
});

test('unknown keys and bad values are dropped', () => {
  assert.deepStrictEqual(evaluate([{ key: 'foo', value: 1 }, { key: 'alt', value: 'abc' }]), []);
});

test('red flags for severe kidney decline', () => {
  const r = evaluate([{ key: 'egfr', value: 25 }, { key: 'uric_acid', value: 620, unit: 'umol/L' }]);
  assert.strictEqual(redFlags(r).length, 2);
});

test('food db ids are unique and levels valid', () => {
  assert.strictEqual(Object.keys(BY_ID).length, FOODS.length);
  for (const f of FOODS) assert.ok(['green', 'yellow', 'red'].includes(f.level), f.id);
});
