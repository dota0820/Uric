(() => {
  'use strict';

  // ---------- 本地存储（只存在这部手机） ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('uc_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('uc_' + k, JSON.stringify(v)); } catch { /* 存不了也不影响使用 */ } },
  };

  let lang = store.get('lang', 'zh');
  const T = () => I18N[lang];
  const C = (o) => o[lang];
  const $ = (s, el = document) => el.querySelector(s);
  const view = $('#view');
  let DEMO = false;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => new Date().toISOString().slice(0, 10);
  const daysSince = (d) => Math.floor((Date.now() - new Date(d).getTime()) / 864e5);

  // ---------- 数据 ----------
  const profile = () => store.get('profile', {});
  const reports = () => store.get('reports', []);
  const manualUA = () => store.get('manualUA', []);

  function uaSeries() {
    const pts = [];
    for (const r of reports()) {
      const ua = (r.results || []).find((x) => x.key === 'uric_acid');
      if (ua) pts.push({ date: r.date, value: Math.round(ua.value) });
    }
    for (const m of manualUA()) pts.push({ date: m.date, value: Math.round(m.value) });
    return pts.sort((a, b) => a.date.localeCompare(b.date));
  }
  const uaTarget = () => (profile().tophi ? 300 : 360);
  function uaStatus(v) {
    const t = uaTarget();
    if (v < t) return { cls: 's-good', label: T().statusGood };
    if (v < 420) return { cls: 's-borderline', label: T().statusBorder };
    return { cls: 's-high', label: T().statusHigh };
  }

  function buildContext() {
    const p = profile();
    const lines = [];
    if (p.name) lines.push(`称呼: ${p.name}`);
    if (p.sex) lines.push(`性别: ${p.sex === 'female' ? '女' : '男'}`);
    if (p.age) lines.push(`年龄: ${p.age}`);
    if (p.meds) lines.push(`正在吃的药: ${p.meds}`);
    const cond = [['kidney', '肾病'], ['diabetes', '糖尿病'], ['bp', '高血压'], ['heart', '心脏病'], ['tophi', '痛风石']].filter(([k]) => p[k]).map(([, v]) => v);
    if (cond.length) lines.push(`其他状况: ${cond.join('、')}`);
    const s = uaSeries();
    if (s.length) lines.push(`尿酸记录 (µmol/L): ${s.slice(-6).map((x) => `${x.date} ${x.value}`).join('; ')}`);
    const last = reports().slice(-1)[0];
    if (last) lines.push(`最近报告 ${last.date}: ${last.results.map((r) => `${r.zh} ${r.value}${r.unit} (${r.status})`).join('; ')}`);
    const foods = store.get('foodLog', []).slice(-5);
    if (foods.length) lines.push(`最近查过的食物: ${foods.map((f) => `${f.dish}(${f.overall})`).join('、')}`);
    lines.push(`今天日期: ${today()}`);
    return lines.join('\n');
  }

  // ---------- 接口 ----------
  async function api(path, body) {
    let res;
    try {
      res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, lang }) });
    } catch { throw new Error(T().errNet); }
    if (!res.ok) throw new Error(T().errAI);
    return res.json();
  }

  // 压缩照片：手机照片很大，缩小后上传更快
  function compress(file, maxSide) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('IMG')); };
      img.src = url;
    });
  }

  // ---------- 语音：朗读 + 讲话输入 ----------
  function speak(text, btn) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (synth.speaking) { synth.cancel(); if (btn) btn.textContent = T().listen; return; }
    const u = new SpeechSynthesisUtterance(String(text).replace(/[🟢🟡🔴✅⚠️❌👉💧🍲🙏🥚💊🚶🍒🍜💛📅🩺👍]/gu, ''));
    u.lang = lang === 'en' ? 'en-GB' : 'zh-CN';
    u.rate = 0.9;
    const v = synth.getVoices().find((x) => x.lang && x.lang.toLowerCase().startsWith(lang === 'en' ? 'en' : 'zh'));
    if (v) u.voice = v;
    if (btn) { btn.textContent = T().stop; u.onend = u.onerror = () => { btn.textContent = T().listen; }; }
    synth.speak(u);
  }
  function stopSpeak() { try { window.speechSynthesis.cancel(); } catch { /* ignore */ } }

  function listen(onText, micBtn, input) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert(T().noVoice); return; }
    const r = new SR();
    r.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    r.interimResults = true;
    r.maxAlternatives = 1;
    const oldPh = input ? input.placeholder : '';
    micBtn.classList.add('rec');
    if (input) input.placeholder = T().listening;
    let finalText = '';
    r.onresult = (e) => {
      let t = '';
      for (const res of e.results) t += res[0].transcript;
      if (input) input.value = t;
      if (e.results[e.results.length - 1].isFinal) finalText = t;
    };
    r.onend = () => {
      micBtn.classList.remove('rec');
      if (input) input.placeholder = oldPh;
      const t = finalText || (input && input.value);
      if (t && t.trim()) onText(t.trim());
    };
    r.onerror = () => { micBtn.classList.remove('rec'); if (input) input.placeholder = oldPh; };
    r.start();
  }

  // ---------- 小组件 ----------
  function chartSVG(series) {
    if (series.length < 2) return '';
    const W = 600, H = 220, pad = { l: 46, r: 16, t: 16, b: 34 };
    const vals = series.map((p) => p.value);
    const t = uaTarget();
    const min = Math.min(...vals, t) - 40, max = Math.max(...vals, t) + 40;
    const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (series.length - 1);
    const y = (v) => pad.t + ((max - v) * (H - pad.t - pad.b)) / (max - min);
    const path = series.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
    const dots = series.map((p, i) => {
      const col = p.value < t ? 'var(--green)' : p.value < 420 ? '#e0a100' : 'var(--red)';
      return `<circle cx="${x(i)}" cy="${y(p.value)}" r="7" fill="${col}"/>
        <text x="${x(i)}" y="${y(p.value) - 13}" text-anchor="middle" font-size="17" font-weight="700" fill="var(--ink)">${p.value}</text>
        <text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="14" fill="var(--muted)">${p.date.slice(2, 7).replace('-', '/')}</text>`;
    }).join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(T().trend)}">
      <line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="${pad.l - 6}" y="${y(t) + 5}" text-anchor="end" font-size="14" fill="var(--green)">${t}</text>
      <path d="${path}" fill="none" stroke="var(--brand)" stroke-width="3"/>${dots}</svg>`;
  }

  const loading = (msg) => `<div class="card loading"><div class="spinner"></div><div>${esc(msg)}</div></div>`;
  const backBtn = () => `<button class="back" onclick="history.back()">${T().back}</button>`;
  const lightIcon = { green: '🟢', yellow: '🟡', red: '🔴' };

  // ---------- 页面 ----------
  const pages = {};

  pages.home = () => {
    const p = profile();
    const s = uaSeries();
    const last = s[s.length - 1];
    const prev = s[s.length - 2];
    const tips = C(CONTENT.tips);
    const tip = tips[Math.floor(Date.now() / 864e5) % tips.length];
    const w = store.get('water', {});
    const cups = w.date === today() ? w.n : 0;

    let uaCard;
    if (last) {
      const st = uaStatus(last.value);
      const retest = daysSince(last.date) >= 90 ? `<p class="badge s-borderline" style="margin-top:10px">${esc(T().reminderRetest(daysSince(last.date)))}</p>` : '';
      uaCard = `<div class="card">
        <h2>${T().latestUA}</h2>
        <div class="ua-big"><span class="num">${last.value}</span><span class="muted">µmol/L</span><span class="badge ${st.cls}">${st.label}</span></div>
        <p class="muted small" style="margin:6px 0 0">${esc(last.date)} · ${T().target} &lt; ${uaTarget()}${prev ? ' · ' + esc(T().vs(last.value - prev.value)) : ''}</p>
        ${retest}
        ${chartSVG(s.slice(-8))}
        <div class="row" style="margin-top:12px"><a class="btn ghost" href="#addua">＋ ${T().addUA}</a></div>
      </div>`;
    } else {
      uaCard = `<div class="card"><h2>${T().noUA}</h2><p class="muted">${T().noUAsub}</p>
        <div class="row"><a class="btn ghost" href="#addua">＋ ${T().addUA}</a></div></div>`;
    }

    view.innerHTML = `
      <p class="hello">${esc(T().hello(p.name))}</p>
      <div class="big-actions">
        <button class="big-btn primary" data-go="food"><span class="ico">📷</span><span><b>${T().snapFood}</b><span class="sub">${T().snapFoodSub}</span></span></button>
        <button class="big-btn" data-go="report"><span class="ico">📄</span><span><b>${T().snapReport}</b><span class="sub">${T().snapReportSub}</span></span></button>
        <button class="big-btn" data-go="chat"><span class="ico">💬</span><span><b>${T().askAgent}</b><span class="sub">${T().askAgentSub}</span></span></button>
      </div>
      ${uaCard}
      <div class="card">
        <h2>💧 ${T().water}</h2>
        <p class="muted small" style="margin:0">${T().waterSub(cups)}</p>
        <div class="cups">${Array.from({ length: 8 }, (_, i) => `<button class="cup ${i < cups ? 'on' : ''}" data-cup="${i + 1}" aria-label="${i + 1}">${i < cups ? '💧' : '🥛'}</button>`).join('')}</div>
      </div>
      <div class="card"><h2>💡 ${T().tipTitle}</h2><p style="margin:0">${esc(tip)}</p></div>
      <div class="two">
        <button class="big-btn" data-go="learn"><span class="ico">📚</span><b>${T().learn}</b></button>
        <button class="big-btn" data-go="exercise"><span class="ico">🚶</span><b>${T().exercise}</b></button>
      </div>
      <button class="big-btn" data-go="profile"><span class="ico">👤</span><span><b>${T().profile}</b><span class="sub">${esc(p.name || '')}</span></span></button>
    `;
    view.querySelectorAll('[data-cup]').forEach((b) => b.addEventListener('click', () => {
      const n = Number(b.dataset.cup);
      store.set('water', { date: today(), n: n === cups ? n - 1 : n });
      pages.home();
    }));
  };

  // ---- 食物 ----
  pages.food = () => {
    view.innerHTML = `
      <div class="card">
        <h2>🍜 ${T().snapFoodSub}</h2>
        <div class="row" style="margin:12px 0">
          <button class="btn" id="fCam">${T().takePhoto}</button>
          <button class="btn ghost" id="fPick">${T().choosePhoto}</button>
        </div>
        <label class="f" for="fText">${T().orType}</label>
        <div class="row" style="flex-wrap:nowrap">
          <input type="text" id="fText" placeholder="${esc(T().foodPlaceholder)}">
          <button class="mic" id="fMic" aria-label="mic">🎤</button>
        </div>
        <button class="btn block" id="fGo" style="margin-top:12px">${T().check}</button>
      </div>
      <div id="fOut"></div>`;
    $('#fCam').onclick = () => $('#camFood').click();
    $('#fPick').onclick = () => $('#pickFood').click();
    $('#fGo').onclick = () => { const t = $('#fText').value.trim(); if (t) analyseFood({ text: t }); };
    $('#fText').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#fGo').click(); });
    $('#fMic').onclick = () => listen((t) => analyseFood({ text: t }), $('#fMic'), $('#fText'));
  };

  async function analyseFood({ text, file }) {
    const out = $('#fOut');
    if (!out) return;
    let image = null, previewHTML = '';
    out.innerHTML = loading(T().analysing);
    out.scrollIntoView({ behavior: 'smooth' });
    try {
      if (file) { image = await compress(file, 1024); previewHTML = `<img class="preview" src="${image}" alt="">`; }
      const r = await api('/api/food', { image, text });
      if (!r.items.length) {
        out.innerHTML = `<div class="card">${previewHTML}<p class="advice">${esc(r.advice)}</p></div>`;
        return;
      }
      const log = store.get('foodLog', []);
      log.push({ date: today(), dish: r.dish, overall: r.overall });
      store.set('foodLog', log.slice(-30));
      out.innerHTML = `
        ${previewHTML}
        <div class="verdict l-${r.overall}">
          <div class="light">${lightIcon[r.overall]}</div>
          <div class="word">${T()[r.overall]}</div>
          <div class="dish">${esc(r.dish)}</div>
        </div>
        <div class="card"><h2>${T().aiAdvice}</h2><p class="advice" id="fAdv">${esc(r.advice)}</p>
          <button class="btn ghost block" id="fSpeak">${T().listen}</button></div>
        <div class="card"><h2>${T().foodItems}</h2><ul class="list">
          ${r.items.map((i) => `<li><span class="dot ${i.level}"></span><div><div class="name">${esc(i.name)} <span class="badge l-${i.level}">${T()[i.level]}</span>${i.fromDb ? '' : ` <span class="muted small">${T().estimated}</span>`}</div>${i.note ? `<div class="muted small">${esc(i.note)}</div>` : ''}</div></li>`).join('')}
        </ul></div>
        <p class="note">${T().disclaimer}</p>
        <button class="btn block" id="fAgain">${T().again}</button>`;
      $('#fSpeak').onclick = (e) => speak(`${T()[r.overall]}。${r.advice}`, e.currentTarget);
      $('#fAgain').onclick = () => { stopSpeak(); pages.food(); window.scrollTo(0, 0); };
    } catch (e) {
      out.innerHTML = `<div class="alert">${esc(e.message)}</div>`;
    }
  }

  // ---- 报告 ----
  pages.report = () => {
    view.innerHTML = `
      <div class="card">
        <h2>📄 ${T().snapReportSub}</h2>
        <p class="muted small">${T().reportHint}</p>
        <div class="row">
          <button class="btn" id="rCam">${T().takePhoto}</button>
          <button class="btn ghost" id="rPick">${T().choosePhoto}</button>
        </div>
      </div>
      <div id="rOut"></div>
      <div class="card" id="rHist"></div></div>`;
    renderHistory();
    $('#rCam').onclick = () => $('#camReport').click();
    $('#rPick').onclick = () => $('#pickReport').click();
  };

  function renderHistory() {
    const el = $('#rHist');
    if (!el) return;
    const list = reports().slice().reverse();
    el.innerHTML = `<h2>${T().history}</h2>
        ${list.length ? `<ul class="list">${list.map((r) => {
          const ua = r.results.find((x) => x.key === 'uric_acid');
          return `<li><div style="flex:1"><a href="#report/${r.id}" class="name" style="color:var(--brand)">${esc(r.date)}</a>
            <div class="muted small">${ua ? `${lang === 'en' ? 'Uric acid' : '尿酸'}: ${Math.round(ua.value)} µmol/L` : ''}</div></div>
            <span>›</span></li>`;
        }).join('')}</ul>` : `<p class="muted">${T().noHistory}</p>`}`;
  }

  function reportHTML(r) {
    return `
      ${r.flags && r.flags.length ? `<div class="alert">${T().seeDoctor}<br>${r.flags.map((f) => '• ' + esc(C(f))).join('<br>')}</div>` : ''}
      <div class="card"><h2>${T().summary}</h2><p class="advice">${esc(r.summary)}</p>
        <button class="btn ghost block" data-speak>${T().listen}</button></div>
      <div class="card"><h2>${T().results} · ${esc(r.date)}</h2>
        ${r.results.map((x) => `<div class="lab-row"><div><div class="name"><b>${esc(lang === 'en' ? x.en : x.zh)}</b></div>
          <span class="badge s-${esc(x.status)}">${esc(statusText(x))}</span></div>
          <div class="v">${fmt(x.value)}<br><span class="u">${esc(x.unit)}</span></div></div>`).join('')}
        ${r.unclear && r.unclear.length ? `<p class="badge s-borderline" style="margin-top:12px">${T().unclear} ${r.unclear.map(esc).join(', ')}</p>` : ''}
        ${r.otherAbnormal && r.otherAbnormal.length ? `<p class="small" style="margin-top:12px"><b>${T().otherAbn}</b><br>${r.otherAbnormal.map(esc).join('<br>')}</p>` : ''}
      </div>
      <p class="note">${T().disclaimer}</p>`;
  }
  const fmt = (v) => (v >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
  // 判定文字：服务器同时回传华语和英文（label.zh / label.en），切换语言也能显示
  const statusText = (x) => (x.label ? C(x.label) : '');

  async function analyseReport(file) {
    const out = $('#rOut');
    if (!out) return;
    out.innerHTML = loading(T().reading);
    out.scrollIntoView({ behavior: 'smooth' });
    try {
      const image = await compress(file, 2000);
      const prev = reports().slice(-3).map((r) => ({ date: r.date, results: r.results.map(({ key, value, unit }) => ({ key, value, unit })) }));
      const r = await api('/api/report', { image, profile: profile(), history: prev });
      if (!r.ok) { out.innerHTML = `<div class="alert">${esc(r.message)}</div>`; return; }
      const rec = {
        id: Date.now().toString(36), date: r.date || today(), lab: r.lab,
        results: r.results,
        flags: r.flags, unclear: r.unclear, otherAbnormal: r.otherAbnormal, summary: r.summary,
      };
      const all = reports(); all.push(rec);
      all.sort((a, b) => a.date.localeCompare(b.date));
      store.set('reports', all);
      renderHistory();
      out.innerHTML = `<p class="badge s-good" style="margin-bottom:12px">${T().saved}</p>` + reportHTML(rec);
      const sp = out.querySelector('[data-speak]');
      sp.onclick = () => speak(rec.summary, sp);
    } catch (e) {
      out.innerHTML = `<div class="alert">${esc(e.message)}</div>`;
    }
  }

  pages.reportDetail = (id) => {
    const r = reports().find((x) => x.id === id);
    if (!r) { location.hash = '#report'; return; }
    view.innerHTML = backBtn() + reportHTML(r) + `<button class="btn ghost block" id="rDel">🗑 ${T().del}</button>`;
    const sp = view.querySelector('[data-speak]');
    sp.onclick = () => speak(r.summary, sp);
    $('#rDel').onclick = () => {
      if (!confirm(T().confirmDel)) return;
      store.set('reports', reports().filter((x) => x.id !== id));
      location.hash = '#report';
    };
  };

  // ---- 手动输入尿酸 ----
  pages.addua = () => {
    view.innerHTML = `${backBtn()}<div class="card"><h2>${T().addUATitle}</h2>
      <label class="f" for="uDate">${T().date}</label><input type="date" id="uDate" value="${today()}">
      <label class="f" for="uVal">${T().value}</label><input type="number" id="uVal" inputmode="decimal" placeholder="420">
      <label class="f">${T().unit}</label>
      <div class="seg"><button class="on" data-u="umol">µmol/L</button><button data-u="mg">mg/dL</button></div>
      <button class="btn block" id="uSave" style="margin-top:18px">${T().save}</button></div>
      ${manualUA().length ? `<div class="card"><ul class="list">${manualUA().slice().reverse().map((m, i, arr) => `<li><div style="flex:1"><b>${Math.round(m.value)}</b> µmol/L<div class="muted small">${esc(m.date)}</div></div><button class="btn ghost" data-del="${arr.length - 1 - i}">${T().del}</button></li>`).join('')}</ul></div>` : ''}`;
    let unit = 'umol';
    view.querySelectorAll('[data-u]').forEach((b) => b.onclick = () => { unit = b.dataset.u; view.querySelectorAll('[data-u]').forEach((x) => x.classList.toggle('on', x === b)); });
    $('#uSave').onclick = () => {
      let v = parseFloat($('#uVal').value);
      if (!v || v <= 0) return;
      if (unit === 'mg' || v < 20) v = v * 59.48;
      const list = manualUA(); list.push({ date: $('#uDate').value || today(), value: Math.round(v) });
      store.set('manualUA', list);
      location.hash = '#home';
    };
    view.querySelectorAll('[data-del]').forEach((b) => b.onclick = () => {
      if (!confirm(T().confirmDel)) return;
      const list = manualUA(); list.splice(Number(b.dataset.del), 1); store.set('manualUA', list); pages.addua();
    });
  };

  // ---- 聊天 ----
  pages.chat = () => {
    let msgs = store.get('chat', []);
    view.innerHTML = `<div class="chat" id="chatBox"></div><div class="chips" id="chips"></div>`;
    const box = $('#chatBox');
    const composer = document.createElement('div');
    composer.className = 'composer';
    composer.id = 'composer';
    composer.innerHTML = `<div class="inner"><button class="mic" id="cMic" aria-label="mic">🎤</button>
      <input type="text" id="cIn" placeholder="${esc(T().chatPlaceholder)}"><button class="btn" id="cSend">${T().send}</button></div>`;
    document.body.appendChild(composer);

    function render() {
      const all = [{ role: 'assistant', content: T().chatWelcome(profile().name) }, ...msgs];
      box.innerHTML = all.map((m, i) => `<div class="msg ${m.role === 'user' ? 'user' : 'bot'}">${esc(m.content)}${m.role === 'assistant' && !m.pending ? `<button class="speak" data-i="${i}">${T().listen}</button>` : ''}</div>`).join('');
      box.querySelectorAll('[data-i]').forEach((b) => b.onclick = () => speak(all[Number(b.dataset.i)].content, b));
      $('#chips').innerHTML = msgs.length < 2 ? T().quick.map((q) => `<button class="chip">${esc(q)}</button>`).join('') : '';
      $('#chips').querySelectorAll('.chip').forEach((c) => c.onclick = () => send(c.textContent));
      window.scrollTo(0, document.body.scrollHeight);
    }

    async function send(text) {
      text = String(text || '').trim();
      if (!text) return;
      $('#cIn').value = '';
      msgs.push({ role: 'user', content: text });
      msgs.push({ role: 'assistant', content: T().thinking, pending: true });
      render();
      try {
        const r = await api('/api/chat', { messages: msgs.filter((m) => !m.pending), context: buildContext() });
        msgs[msgs.length - 1] = { role: 'assistant', content: r.reply };
      } catch (e) {
        msgs[msgs.length - 1] = { role: 'assistant', content: e.message };
      }
      msgs = msgs.slice(-40);
      store.set('chat', msgs.filter((m) => !m.pending));
      render();
    }

    $('#cSend').onclick = () => send($('#cIn').value);
    $('#cIn').addEventListener('keydown', (e) => { if (e.key === 'Enter') send($('#cIn').value); });
    $('#cMic').onclick = () => listen(send, $('#cMic'), $('#cIn'));
    render();
  };

  // ---- 知识 / 运动 ----
  const cardsPage = (items, title) => {
    view.innerHTML = `${backBtn()}<h2>${title}</h2>` + items.map((it, i) => {
      const c = C(it);
      return `<details class="k" ${i === 0 ? 'open' : ''}><summary><span style="font-size:1.6rem">${it.ico}</span>${esc(c.t)}</summary><div class="body">${c.b}
        <button class="btn ghost" data-sp="${i}">${T().listen}</button></div></details>`;
    }).join('');
    view.querySelectorAll('[data-sp]').forEach((b) => b.onclick = () => {
      const tmp = document.createElement('div'); tmp.innerHTML = C(items[Number(b.dataset.sp)]).b;
      speak(tmp.textContent, b);
    });
  };
  pages.learn = () => cardsPage(CONTENT.learn, `📚 ${T().learn}`);
  pages.exercise = () => cardsPage(CONTENT.exercise, `🚶 ${T().exercise}`);

  // ---- 资料 ----
  pages.profile = () => {
    const p = profile();
    const ck = (k, label) => `<label class="check"><input type="checkbox" id="p_${k}" ${p[k] ? 'checked' : ''}>${label}</label>`;
    view.innerHTML = `${backBtn()}<div class="card"><h2>👤 ${T().profileTitle}</h2>
      <label class="f" for="pName">${T().name}</label><input type="text" id="pName" value="${esc(p.name || '')}">
      <label class="f">${T().sex}</label>
      <div class="seg"><button data-sex="male" class="${p.sex !== 'female' ? 'on' : ''}">${T().male}</button><button data-sex="female" class="${p.sex === 'female' ? 'on' : ''}">${T().female}</button></div>
      <label class="f" for="pAge">${T().age}</label><input type="number" id="pAge" inputmode="numeric" value="${esc(p.age || '')}">
      <label class="f" for="pMeds">${T().meds}</label><textarea id="pMeds">${esc(p.meds || '')}</textarea>
      <label class="f">${T().conditions}</label>
      ${ck('kidney', T().cKidney)}${ck('diabetes', T().cDiabetes)}${ck('bp', T().cBP)}${ck('heart', T().cHeart)}${ck('tophi', T().cTophi)}
      <button class="btn block" id="pSave" style="margin-top:18px">${T().saveProfile}</button>
      <p class="muted small" style="margin-top:12px">${T().privacy}</p></div>`;
    let sex = p.sex || 'male';
    view.querySelectorAll('[data-sex]').forEach((b) => b.onclick = () => { sex = b.dataset.sex; view.querySelectorAll('[data-sex]').forEach((x) => x.classList.toggle('on', x === b)); });
    $('#pSave').onclick = () => {
      const np = { name: $('#pName').value.trim(), sex, age: $('#pAge').value, meds: $('#pMeds').value.trim() };
      for (const k of ['kidney', 'diabetes', 'bp', 'heart', 'tophi']) np[k] = $('#p_' + k).checked;
      store.set('profile', np);
      alert(T().profileSaved);
      location.hash = '#home';
    };
  };

  // ---------- 路由 ----------
  function route() {
    stopSpeak();
    const old = $('#composer'); if (old) old.remove();
    const h = location.hash.replace('#', '') || 'home';
    const [name, arg] = h.split('/');
    document.body.className = 'page-' + name;
    document.querySelectorAll('#tabs a').forEach((a) => a.classList.toggle('on', a.dataset.r === name));
    if (name === 'report' && arg) pages.reportDetail(arg);
    else (pages[name] || pages.home)();
    if (name !== 'chat') window.scrollTo(0, 0);
  }

  function applyLang() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh';
    document.title = T().appName;
    $('#appName').textContent = T().appName;
    $('#langBtn').textContent = lang === 'en' ? '中文' : 'EN';
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T()[el.dataset.t]; });
    const bar = $('#demoBar'); bar.textContent = T().demo; bar.classList.toggle('hidden', !DEMO);
  }

  $('#langBtn').onclick = () => { lang = lang === 'en' ? 'zh' : 'en'; store.set('lang', lang); applyLang(); route(); };
  const setBig = (on) => { document.documentElement.classList.toggle('big', on); store.set('big', on); };
  setBig(store.get('big', false));
  $('#fontBtn').onclick = () => setBig(!document.documentElement.classList.contains('big'));

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) location.hash = '#' + go.dataset.go;
  });
  const onFile = (id, fn) => $(id).addEventListener('change', (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) fn(f); });
  onFile('#camFood', (f) => analyseFood({ file: f }));
  onFile('#pickFood', (f) => analyseFood({ file: f }));
  onFile('#camReport', analyseReport);
  onFile('#pickReport', analyseReport);

  window.addEventListener('hashchange', route);
  fetch('/api/status').then((r) => r.json()).then((s) => { DEMO = s.demo; applyLang(); }).catch(() => {});
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  applyLang();
  route();
})();
