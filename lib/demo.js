// 示范模式：没有 API key 时用固定回答，方便先看界面
function food(text) {
  const t = String(text || '');
  if (/肉骨茶|bak kut/i.test(t)) return { dish_name: '肉骨茶', items: [{ id: 'bak_kut_teh' }, { id: 'pork_intestine' }, { id: 'rice' }] };
  if (/豆腐|tofu/i.test(t)) return { dish_name: '豆腐青菜', items: [{ id: 'tofu' }, { id: 'leafy_veg' }, { id: 'rice' }] };
  return { dish_name: '椰浆饭', items: [{ id: 'nasi_lemak' }, { id: 'ikan_bilis' }, { id: 'belacan' }, { id: 'egg' }] };
}

function foodAdvice(overall, L) {
  const zh = {
    red: '这餐嘌呤偏高，最好少吃。真的想吃就吃少量、汤不要喝，多配青菜，饭后多喝两杯水。（示范回答）',
    yellow: '可以吃，但份量控制一下，肉一掌心就好，多配青菜和白开水。（示范回答）',
    green: '这餐很好，放心吃！记得今天多喝水。（示范回答）',
  };
  const en = {
    red: 'This meal is high in purine — better to limit it. Eat a small portion, skip the soup, add vegetables, and drink extra water. (demo answer)',
    yellow: 'OK to eat in moderation. Keep meat to a palm-sized portion with plenty of vegetables and water. (demo answer)',
    green: 'Great choice, enjoy! Remember to drink plenty of water today. (demo answer)',
  };
  return (L === 'en' ? en : zh)[overall];
}

function report() {
  return {
    is_lab_report: true,
    report_date: new Date().toISOString().slice(0, 10),
    lab_name: 'Demo Lab',
    items: [
      { key: 'uric_acid', value: 468, unit: 'µmol/L' },
      { key: 'creatinine', value: 98, unit: 'µmol/L' },
      { key: 'egfr', value: 78, unit: 'mL/min/1.73m2' },
      { key: 'alt', value: 32, unit: 'U/L' },
      { key: 'fasting_glucose', value: 6.3, unit: 'mmol/L' },
      { key: 'triglycerides', value: 2.0, unit: 'mmol/L' },
    ],
    other_abnormal: [],
  };
}

function reportSummary(results, L) {
  const ua = results.find((r) => r.key === 'uric_acid');
  return L === 'en'
    ? `Your uric acid is ${ua ? ua.value : '-'} µmol/L, still above the target of 360. Kidney function is mildly reduced, which is common at this age. Fasting sugar and triglycerides are a bit high. Next steps: drink 2 litres of water a day, cut down sweet drinks and rich soups, walk 30 minutes a day, and recheck in 3 months. (demo answer)`
    : `你的尿酸是 ${ua ? ua.value : '-'} µmol/L，还没达到 360 以下的目标。肾功能轻微下降，这个年龄常见，但要好好保护。空腹血糖和甘油三酯都稍微偏高。接下来：每天喝 2 公升水、少喝甜饮料和浓汤、每天快走 30 分钟，3 个月后再验一次。（示范回答）`;
}

function chat(q, L) {
  return L === 'en'
    ? `Good question! This is demo mode, so I can't give a real answer yet. Once the AI key is set up, I will answer based on your own records. (You asked: "${q.slice(0, 60)}")`
    : `好问题！现在是示范模式，还不能真正回答。设定好 AI key 之后，我会根据你自己的记录来回答你。（你问的是："${q.slice(0, 60)}"）`;
}

module.exports = { food, foodAdvice, report, reportSummary, chat };
