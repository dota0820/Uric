require('./lib/env').load();
const express = require('express');
const path = require('path');
const { BY_ID, LEVEL_ORDER, FOODS } = require('./lib/purine-db');
const { evaluate, redFlags } = require('./lib/labs');
const { MODELS, chat, hasKey, imagePart } = require('./lib/llm');
const P = require('./lib/prompts');
const demo = require('./lib/demo');

const app = express();
app.use(express.json({ limit: '12mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const DEMO = !hasKey();
if (DEMO) console.log('⚠️  没有 OPENROUTER_API_KEY，以示范模式（demo）运行。');

const lang = (req) => (req.body && req.body.lang === 'en' ? 'en' : 'zh');
const isImage = (s) => typeof s === 'string' && /^data:image\/(png|jpe?g|webp|heic|heif);base64,/.test(s);

app.get('/api/status', (req, res) => {
  res.json({ demo: DEMO, models: MODELS });
});

app.get('/api/foods', (req, res) => res.json(FOODS));

// ========== 1. 食物分析 ==========
app.post('/api/food', async (req, res) => {
  const L = lang(req);
  const { image, text } = req.body || {};
  if (!isImage(image) && !(text && String(text).trim())) return res.status(400).json({ error: 'NEED_INPUT' });
  if (image && !isImage(image)) return res.status(400).json({ error: 'BAD_IMAGE' });
  try {
    let parsed;
    if (DEMO) parsed = demo.food(text);
    else {
      const content = [];
      if (text) content.push({ type: 'text', text: String(text).slice(0, 500) });
      if (image) content.push(imagePart(image));
      if (!text) content.push({ type: 'text', text: '请认出照片里的食物。' });
      parsed = await chat({
        model: MODELS.fast, json: true,
        messages: [{ role: 'system', content: P.foodPrompt(L) }, { role: 'user', content }],
      });
    }

    const items = (parsed.items || []).slice(0, 10).map((it) => {
      const f = it.id && BY_ID[it.id];
      if (f) {
        return {
          name: L === 'en' ? f.en : f.zh, level: f.level, purine: f.purine, fromDb: true,
          note: (L === 'en' ? f.note_en : f.note_zh) || '',
        };
      }
      const g = ['green', 'yellow', 'red'].includes(it.guess_level) ? it.guess_level : 'yellow';
      return { name: it.name || '?', level: g, purine: null, fromDb: false, note: '' };
    });

    if (!items.length) {
      return res.json({ dish: parsed.dish_name || '', items: [], overall: null, advice: parsed.message || (L === 'en' ? 'I could not see the food clearly. Please try another photo.' : '看不太清楚，请再拍一张。') });
    }

    const overall = items.reduce((a, b) => (LEVEL_ORDER[b.level] > LEVEL_ORDER[a] ? b.level : a), 'green');

    let advice;
    if (DEMO) advice = demo.foodAdvice(overall, L);
    else {
      advice = await chat({
        model: MODELS.fast, temperature: 0.4, maxTokens: 400,
        messages: [
          { role: 'system', content: P.foodAdvicePrompt(L) },
          { role: 'user', content: JSON.stringify({ dish: parsed.dish_name, overall, items: items.map(({ name, level, note }) => ({ name, level, note })) }) },
        ],
      });
    }
    res.json({ dish: parsed.dish_name || '', items, overall, advice: String(advice).trim() });
  } catch (e) {
    console.error('food', e.message);
    res.status(500).json({ error: 'AI_FAILED' });
  }
});

// ========== 2. 验血报告 ==========
app.post('/api/report', async (req, res) => {
  const L = lang(req);
  const { image, profile, history } = req.body || {};
  if (!isImage(image)) return res.status(400).json({ error: 'BAD_IMAGE' });
  try {
    const extracted = DEMO ? demo.report() : await chat({
      model: MODELS.smart, json: true, temperature: 0, maxTokens: 2000,
      messages: [
        { role: 'system', content: P.reportExtractPrompt() },
        { role: 'user', content: [{ type: 'text', text: '请读取这份验血报告。' }, imagePart(image)] },
      ],
    });

    if (extracted.is_lab_report === false || !(extracted.items || []).length) {
      return res.json({ ok: false, message: L === 'en' ? 'This does not look like a blood test report, or it is not clear. Please take the photo again in good light, flat and straight.' : '这张看起来不是验血报告，或者不够清楚。请在光线充足的地方，把报告放平、拍正再试一次。' });
    }

    const results = evaluate(extracted.items, profile);
    const unclear = (extracted.items || []).filter((i) => i.unclear).map((i) => i.key);
    const flags = redFlags(results);

    const prev = Array.isArray(history) ? history.slice(-3) : [];
    let summary;
    if (DEMO) summary = demo.reportSummary(results, L);
    else {
      summary = await chat({
        model: MODELS.smart, temperature: 0.3, maxTokens: 900,
        messages: [
          { role: 'system', content: P.reportExplainPrompt(L) },
          { role: 'user', content: JSON.stringify({ profile: profile || {}, this_report: { date: extracted.report_date, results: results.map(({ key, zh, en, value, unit, status }) => ({ key, name: L === 'en' ? en : zh, value, unit, status })), other_abnormal: extracted.other_abnormal || [] }, red_flags: flags, previous_reports: prev }) },
        ],
      });
    }

    res.json({ ok: true, date: extracted.report_date || null, lab: extracted.lab_name || null, results, unclear, flags, otherAbnormal: extracted.other_abnormal || [], summary: String(summary).trim() });
  } catch (e) {
    console.error('report', e.message);
    res.status(500).json({ error: 'AI_FAILED' });
  }
});

// ========== 3. 专属 AI 管家聊天 ==========
app.post('/api/chat', async (req, res) => {
  const L = lang(req);
  const { messages, context } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'NEED_INPUT' });
  const clean = messages.slice(-12)
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  try {
    const reply = DEMO ? demo.chat(clean[clean.length - 1].content, L) : await chat({
      model: MODELS.fast, temperature: 0.5, maxTokens: 700,
      messages: [{ role: 'system', content: P.chatPrompt(L, String(context || '').slice(0, 4000)) }, ...clean],
    });
    res.json({ reply: String(reply).trim() });
  } catch (e) {
    console.error('chat', e.message);
    res.status(500).json({ error: 'AI_FAILED' });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`尿酸管家 running at http://localhost:${PORT}`));
}
module.exports = app;
