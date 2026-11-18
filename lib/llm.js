// OpenRouter 调用（OpenAI 兼容接口）
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MODELS = {
  // 日常：拍食物、聊天 —— 快、便宜
  fast: process.env.MODEL_FAST || 'google/gemini-3.8-flash',
  // 验血报告：读小字表格 + 医疗推理 —— 用最强的
  smart: process.env.MODEL_SMART || 'google/gemini-4-argon',
};

function hasKey() {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

async function chat({ model, messages, json = false, temperature = 0.2, maxTokens = 1500 }) {
  if (!hasKey()) throw new Error('NO_API_KEY');
  const body = { model, messages, temperature, max_tokens: maxTokens };
  if (json) body.response_format = { type: 'json_object' };

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'X-Title': 'Uric Care',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return json ? parseJson(content) : content;
}

function parseJson(text) {
  const t = String(text).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try {
    return JSON.parse(t);
  } catch {
    const m = t.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error('BAD_JSON');
  }
}

function imagePart(dataUrl) {
  return { type: 'image_url', image_url: { url: dataUrl } };
}

module.exports = { MODELS, chat, hasKey, imagePart, parseJson };
