// 验血指标：单位换算 + 判定（马来西亚常用 SI 单位）
// 判定写在代码里，不让 AI 自己决定"正常/不正常"，确保一致、可检查。
// status: good | borderline | high | low | unknown

const LABS = {
  uric_acid: {
    zh: '尿酸', en: 'Uric acid', unit: 'µmol/L',
    // mg/dL × 59.48 = µmol/L
    convert: { 'mg/dl': 59.48, 'mmol/l': 1000 },
    judge(v, profile) {
      const target = profile && profile.tophi ? 300 : 360;
      if (v < target) return { status: 'good', zh: `达标（目标 < ${target}）`, en: `On target (< ${target})` };
      if (v < 420) return { status: 'borderline', zh: `偏高，未达治疗目标 < ${target}`, en: `Above treatment target (< ${target})` };
      return { status: 'high', zh: '高尿酸', en: 'High' };
    },
  },
  creatinine: {
    zh: '肌酐', en: 'Creatinine', unit: 'µmol/L',
    convert: { 'mg/dl': 88.4, 'mmol/l': 1000 },
    judge(v, profile) {
      const female = profile && profile.sex === 'female';
      const hi = female ? 80 : 106;
      const lo = female ? 44 : 62;
      if (v > hi * 1.5) return { status: 'high', zh: '明显偏高，肾功能需要医生评估', en: 'Clearly high — kidney function needs review' };
      if (v > hi) return { status: 'borderline', zh: '偏高', en: 'Slightly high' };
      if (v < lo) return { status: 'good', zh: '偏低（通常没关系）', en: 'Slightly low (usually fine)' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  egfr: {
    zh: '肾功能 eGFR', en: 'Kidney function (eGFR)', unit: 'mL/min/1.73m²',
    convert: {},
    judge(v) {
      if (v >= 90) return { status: 'good', zh: '正常', en: 'Normal' };
      if (v >= 60) return { status: 'borderline', zh: '轻度下降（这个年龄常见）', en: 'Mildly reduced (common at this age)' };
      if (v >= 30) return { status: 'high', zh: '中度下降，用药要由医生调整', en: 'Moderately reduced — doctor should adjust medicine' };
      return { status: 'high', zh: '严重下降，请尽快见医生', en: 'Severely reduced — see a doctor soon' };
    },
  },
  urea: {
    zh: '尿素', en: 'Urea', unit: 'mmol/L',
    convert: { 'mg/dl': 0.357 },
    judge(v) {
      if (v > 8.3) return { status: 'borderline', zh: '偏高', en: 'Slightly high' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  alt: {
    zh: '肝功能 ALT', en: 'Liver ALT', unit: 'U/L', convert: {},
    judge(v) {
      if (v > 120) return { status: 'high', zh: '明显偏高', en: 'Clearly high' };
      if (v > 40) return { status: 'borderline', zh: '偏高', en: 'Slightly high' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  ast: {
    zh: '肝功能 AST', en: 'Liver AST', unit: 'U/L', convert: {},
    judge(v) {
      if (v > 120) return { status: 'high', zh: '明显偏高', en: 'Clearly high' };
      if (v > 40) return { status: 'borderline', zh: '偏高', en: 'Slightly high' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  fasting_glucose: {
    zh: '空腹血糖', en: 'Fasting glucose', unit: 'mmol/L',
    convert: { 'mg/dl': 0.0555 },
    judge(v) {
      if (v >= 7.0) return { status: 'high', zh: '偏高（糖尿病范围）', en: 'High (diabetes range)' };
      if (v >= 6.1) return { status: 'borderline', zh: '偏高（糖尿病前期）', en: 'Borderline (prediabetes)' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  hba1c: {
    zh: '糖化血红蛋白 HbA1c', en: 'HbA1c', unit: '%', convert: {},
    judge(v) {
      // 马来西亚 CPG：≥ 6.3% 为糖尿病
      if (v >= 6.3) return { status: 'high', zh: '偏高（糖尿病范围）', en: 'High (diabetes range)' };
      if (v >= 5.7) return { status: 'borderline', zh: '偏高（糖尿病前期）', en: 'Borderline (prediabetes)' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  total_cholesterol: {
    zh: '总胆固醇', en: 'Total cholesterol', unit: 'mmol/L',
    convert: { 'mg/dl': 0.02586 },
    judge(v) {
      if (v >= 6.2) return { status: 'high', zh: '偏高', en: 'High' };
      if (v >= 5.2) return { status: 'borderline', zh: '稍高', en: 'Borderline' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  ldl: {
    zh: '坏胆固醇 LDL', en: 'LDL cholesterol', unit: 'mmol/L',
    convert: { 'mg/dl': 0.02586 },
    judge(v) {
      if (v >= 4.1) return { status: 'high', zh: '偏高', en: 'High' };
      if (v >= 3.4) return { status: 'borderline', zh: '稍高', en: 'Borderline' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  hdl: {
    zh: '好胆固醇 HDL', en: 'HDL cholesterol', unit: 'mmol/L',
    convert: { 'mg/dl': 0.02586 },
    judge(v, profile) {
      const min = profile && profile.sex === 'female' ? 1.2 : 1.0;
      if (v < min) return { status: 'borderline', zh: '偏低（越高越好）', en: 'Low (higher is better)' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
  triglycerides: {
    zh: '甘油三酯', en: 'Triglycerides', unit: 'mmol/L',
    convert: { 'mg/dl': 0.01129 },
    judge(v) {
      if (v >= 2.3) return { status: 'high', zh: '偏高', en: 'High' };
      if (v >= 1.7) return { status: 'borderline', zh: '稍高', en: 'Borderline' };
      return { status: 'good', zh: '正常', en: 'Normal' };
    },
  },
};

function normUnit(u) {
  return String(u || '').toLowerCase().replace(/\s/g, '').replace('μ', 'µ').replace('umol', 'µmol');
}

// 把 AI 读出的原始数值换算成标准单位
function normalize(key, value, unit) {
  const def = LABS[key];
  if (!def || typeof value !== 'number' || !isFinite(value)) return null;
  const u = normUnit(unit);
  const std = normUnit(def.unit);
  let v = value;
  if (u && u !== std && def.convert[u]) v = value * def.convert[u];
  // 没写单位时用数值大小猜测尿酸 / 肌酐的单位
  if (!u && key === 'uric_acid' && value < 20) v = value * 59.48;
  if (!u && key === 'creatinine' && value < 15) v = value * 88.4;
  return Math.round(v * 100) / 100;
}

function evaluate(items, profile) {
  const out = [];
  for (const it of items || []) {
    const def = LABS[it.key];
    if (!def) continue;
    const v = normalize(it.key, Number(it.value), it.unit);
    if (v == null) continue;
    const j = def.judge(v, profile || {});
    out.push({
      key: it.key, zh: def.zh, en: def.en, value: v, unit: def.unit,
      raw: `${it.value} ${it.unit || ''}`.trim(),
      status: j.status, label: { zh: j.zh, en: j.en },
    });
  }
  return out;
}

// 危险信号：需要建议尽快看医生
function redFlags(results) {
  const flags = [];
  for (const r of results) {
    if (r.key === 'egfr' && r.value < 30) flags.push({ zh: '肾功能严重下降（eGFR < 30）', en: 'Severely reduced kidney function (eGFR < 30)' });
    if (r.key === 'creatinine' && r.status === 'high') flags.push({ zh: '肌酐明显偏高', en: 'Creatinine clearly high' });
    if (r.key === 'uric_acid' && r.value >= 600) flags.push({ zh: '尿酸非常高（≥ 600）', en: 'Uric acid very high (≥ 600)' });
    if ((r.key === 'alt' || r.key === 'ast') && r.value > 120) flags.push({ zh: '肝指数明显偏高（服药中要特别注意）', en: 'Liver enzymes clearly high (important if on medication)' });
  }
  return flags;
}

module.exports = { LABS, normalize, evaluate, redFlags };
