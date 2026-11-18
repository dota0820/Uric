// 知识与运动内容（华语 / English）
const CONTENT = {
  learn: [
    {
      ico: '🧪',
      zh: { t: '尿酸是什么？', b: `<p>尿酸是身体分解"嘌呤"之后产生的废物，主要靠<b>肾脏</b>从小便排出去。</p><p>尿酸太高，会在关节里变成<b>针一样的结晶</b>，就是痛风；也可能在肾里形成<b>结石</b>。</p><p>大约 <b>80%</b> 的尿酸是身体自己制造的，只有 20% 来自食物 —— 所以<b>饮食重要，但吃药更重要</b>。</p>` },
      en: { t: 'What is uric acid?', b: `<p>Uric acid is a waste product made when the body breaks down "purines". It leaves mainly through the <b>kidneys</b> in urine.</p><p>Too much uric acid forms <b>needle-like crystals</b> in joints (gout) and can cause <b>kidney stones</b>.</p><p>About <b>80%</b> is made by your own body; only 20% comes from food — so <b>diet matters, but medicine matters more</b>.</p>` },
    },
    {
      ico: '🎯',
      zh: { t: '我的尿酸要降到多少？', b: `<ul><li>一般目标：<b>低于 360 µmol/L</b>（6 mg/dL）</li><li>有痛风石（关节旁硬块）：<b>低于 300 µmol/L</b></li></ul><p>马来西亚化验所多数用 µmol/L。如果报告写 mg/dL，乘 60 左右就是 µmol/L。</p><p>每 <b>3 个月</b>验一次，稳定后可以 6 个月一次。</p>` },
      en: { t: 'What is my target?', b: `<ul><li>Usual target: <b>below 360 µmol/L</b> (6 mg/dL)</li><li>With tophi (hard lumps near joints): <b>below 300 µmol/L</b></li></ul><p>Most Malaysian labs use µmol/L. If your report says mg/dL, multiply by about 60.</p><p>Test every <b>3 months</b>; every 6 months once stable.</p>` },
    },
    {
      ico: '💊',
      zh: { t: '降尿酸药要怎样吃？', b: `<ul><li>Allopurinol、Febuxostat 这类药要<b>每天吃，不痛也要吃</b>。</li><li>刚开始吃的头几个月，痛风<b>反而可能发作</b> —— 这是尿酸结晶在溶解，<b>不要自己停药</b>，告诉医生。</li><li>吃 Allopurinol 如果出现<b>皮肤红疹、起水泡、发烧</b>，要立刻停药并马上看医生。</li><li>任何加药、减药、换药都要问医生。</li></ul>` },
      en: { t: 'How to take uric-acid medicine', b: `<ul><li>Medicines like Allopurinol or Febuxostat must be taken <b>every day, even with no pain</b>.</li><li>In the first few months gout may <b>flare more</b> — crystals are dissolving. <b>Don't stop on your own</b>; tell your doctor.</li><li>If you get a <b>rash, blisters or fever</b> on Allopurinol, stop and see a doctor immediately.</li><li>Always ask your doctor before changing any dose.</li></ul>` },
    },
    {
      ico: '🔥',
      zh: { t: '痛风发作时怎么办？', b: `<ul><li><b>休息</b>，把痛的脚抬高。</li><li><b>冰敷</b> 15–20 分钟（用毛巾包着冰），一天几次。</li><li><b>多喝水</b>。</li><li>不要按摩、不要热敷、不要贴膏药用力揉。</li><li>已经在吃降尿酸药的，<b>继续吃，不要停</b>。</li><li>尽快看医生拿消炎止痛药。</li></ul><p class="alert">⚠️ 如果关节红肿热痛<b>还发烧</b>、完全不能走路、或尿里有血、剧烈腰痛 —— 马上去医院。</p>` },
      en: { t: 'What to do during a gout attack', b: `<ul><li><b>Rest</b> and raise the painful foot.</li><li><b>Ice</b> for 15–20 minutes (wrapped in a towel), a few times a day.</li><li><b>Drink plenty of water.</b></li><li>No massage, no heat, no rubbing.</li><li>If you already take uric-acid medicine, <b>keep taking it</b>.</li><li>See a doctor soon for anti-inflammatory medicine.</li></ul><p class="alert">⚠️ If the joint is hot and swollen <b>with fever</b>, you cannot walk, there is blood in urine or severe back pain — go to hospital now.</p>` },
    },
    {
      ico: '🍽️',
      zh: { t: '饮食红绿灯', b: `<p><b>🟢 放心吃</b>：鸡蛋、低脂牛奶、豆腐、豆浆、青菜（菠菜、菇也可以）、白饭、面、大部分水果、白开水、咖啡（少糖）。</p><p><b>🟡 适量</b>：鸡、猪、牛、鱼、虾、苏东 —— 每天大约一个手掌的份量。</p><p><b>🔴 尽量避免</b>：内脏（猪肝、猪杂）、江鱼仔、沙丁鱼、峇拉煎、血蚶、生蚝、浓肉汤、火锅汤、肉骨茶汤、鸡精、啤酒和烈酒、汽水、果汁。</p><p>👉 吃外面：叫<b>走蚶、走虾</b>、<b>汤不要喝</b>、饮料叫 <b>kosong 或 kurang manis</b>。</p>` },
      en: { t: 'Food traffic light', b: `<p><b>🟢 Enjoy</b>: eggs, low-fat milk, tofu, soy milk, vegetables (spinach and mushrooms are fine), rice, noodles, most fruit, water, coffee (less sugar).</p><p><b>🟡 Moderate</b>: chicken, pork, beef, fish, prawns, sotong — about one palm-size portion a day.</p><p><b>🔴 Avoid</b>: organ meats, ikan bilis, sardines, belacan, cockles, oysters, rich broths, steamboat soup, bak kut teh soup, chicken essence, beer and spirits, soft drinks, fruit juice.</p><p>👉 Eating out: ask for <b>no cockles/prawns</b>, <b>skip the soup</b>, order drinks <b>kosong or kurang manis</b>.</p>` },
    },
    {
      ico: '💧',
      zh: { t: '喝水的秘诀', b: `<ul><li>每天 <b>2 公升以上</b>（大约 8 杯）。</li><li>早上起床先喝一杯；每餐前一杯；放一个水壶在身边。</li><li>小便颜色<b>淡黄</b>就表示够了。</li><li>有心脏衰竭或肾病要限水的人，请照医生的指示。</li></ul>` },
      en: { t: 'Water tips', b: `<ul><li><b>2+ litres</b> a day (about 8 glasses).</li><li>One glass after waking up, one before each meal, keep a bottle nearby.</li><li><b>Pale yellow</b> urine means you're drinking enough.</li><li>If you have heart failure or kidney disease with fluid limits, follow your doctor.</li></ul>` },
    },
    {
      ico: '❌',
      zh: { t: '常见误解', b: `<ul><li>❌ "不痛就不用吃药" → 尿酸高还是会伤关节和肾。</li><li>❌ "豆腐、豆浆不能吃" → 植物嘌呤影响很小，可以吃。</li><li>❌ "只要不吃肉就好" → 汽水、果汁、酒同样会升高尿酸。</li><li>❌ "快速减肥最好" → 饿肚子或快速减重反而让尿酸升高。</li><li>❌ "吃药会伤肾" → 尿酸长期太高才伤肾；药物剂量医生会按肾功能调整。</li></ul>` },
      en: { t: 'Common myths', b: `<ul><li>❌ "No pain, no need for medicine" → high uric acid still damages joints and kidneys.</li><li>❌ "Tofu and soy milk are banned" → plant purines have little effect; they're fine.</li><li>❌ "Just avoid meat" → soft drinks, juice and alcohol also raise uric acid.</li><li>❌ "Crash diets are best" → fasting or fast weight loss raises uric acid.</li><li>❌ "Medicine damages kidneys" → long-term high uric acid does; doctors adjust the dose to kidney function.</li></ul>` },
    },
  ],

  exercise: [
    {
      ico: '🚶',
      zh: { t: '快走（最推荐）', b: `<p>每次 <b>30 分钟</b>，每周 <b>5 天</b>。走到会微微喘、但还能讲话的程度。</p><p>可以分开走：早上 15 分钟 + 傍晚 15 分钟。公园、商场里走都可以。</p>` },
      en: { t: 'Brisk walking (best choice)', b: `<p><b>30 minutes</b>, <b>5 days</b> a week. Walk until slightly breathless but still able to talk.</p><p>You can split it: 15 minutes morning + 15 minutes evening. Parks or shopping malls are fine.</p>` },
    },
    {
      ico: '🏊',
      zh: { t: '游泳 / 水中步行', b: `<p>水的浮力保护膝盖和脚踝，<b>关节不好的人最适合</b>。每次 20–30 分钟。</p>` },
      en: { t: 'Swimming / water walking', b: `<p>Water protects your knees and ankles — <b>ideal if your joints hurt</b>. 20–30 minutes each time.</p>` },
    },
    {
      ico: '🚴',
      zh: { t: '骑脚车 / 健身脚车', b: `<p>对关节压力小。轻松踩 20–30 分钟，不需要很用力。</p>` },
      en: { t: 'Cycling / stationary bike', b: `<p>Low stress on joints. Pedal easily for 20–30 minutes; no need to push hard.</p>` },
    },
    {
      ico: '🧘',
      zh: { t: '太极 / 八段锦 / 伸展', b: `<p>动作慢、增加平衡和柔软度，减少跌倒。每天早上 15–20 分钟。</p>` },
      en: { t: 'Tai chi / Baduanjin / stretching', b: `<p>Slow movements improve balance and flexibility and prevent falls. 15–20 minutes each morning.</p>` },
    },
    {
      ico: '⚠️',
      zh: { t: '要避免的运动', b: `<ul><li>短跑冲刺、举很重的重量、打到很喘的羽毛球 / 篮球 —— 剧烈运动会让尿酸<b>短时间升高</b>。</li><li>大热天在户外长时间运动 —— 流汗多、身体缺水，尿酸更难排。</li></ul>` },
      en: { t: 'Exercise to avoid', b: `<ul><li>Sprinting, very heavy weights, intense badminton or basketball — hard exercise <b>raises uric acid temporarily</b>.</li><li>Long outdoor exercise in the midday heat — sweating and dehydration make uric acid harder to clear.</li></ul>` },
    },
    {
      ico: '🛑',
      zh: { t: '痛风发作时', b: `<p><b>不要运动</b>。让关节休息、抬高、冰敷。痛完全消了之后再<b>慢慢</b>恢复走路。</p>` },
      en: { t: 'During a gout attack', b: `<p><b>Don't exercise.</b> Rest, raise and ice the joint. Restart walking <b>slowly</b> once the pain is fully gone.</p>` },
    },
    {
      ico: '💧',
      zh: { t: '运动小提醒', b: `<ul><li>运动<b>前后都要喝水</b>。</li><li>运动后不要马上喝啤酒、汽水"解渴"。</li><li>目标是<b>慢慢</b>减重（一个月 1–2 公斤），不是快速减肥。</li><li>有心脏病、高血压控制不好的，先问医生再开始。</li></ul>` },
      en: { t: 'Exercise tips', b: `<ul><li>Drink water <b>before and after</b> exercise.</li><li>Don't "rehydrate" with beer or soft drinks.</li><li>Aim for <b>slow</b> weight loss (1–2 kg a month), not crash dieting.</li><li>If you have heart disease or poorly controlled blood pressure, ask your doctor first.</li></ul>` },
    },
  ],

  // ===== 冷知识（每条都附研究出处）=====
  facts: [
    {
      ico: '🍲',
      zh: { q: '为什么汤不能喝，肉却可以吃一点？', a: '嘌呤"怕水"——一煮就跑进汤里。', why: '嘌呤很容易溶在水里。肉、骨头、海鲜一煮，嘌呤就从肉里跑进汤里，所以<b>汤反而比肉更"毒"</b>。火锅、肉骨茶、猪杂汤煮得越久，汤里的嘌呤越多。<br>👉 肉可以吃一点，<b>汤尽量不要喝</b>。', src: '日本痛风·核酸代谢学会《食物嘌呤含量表》；Kaneko K 等, Biol Pharm Bull 2014' },
      en: { q: 'Why skip the soup but a little meat is OK?', a: 'Purines dissolve in water — they move into the soup.', why: 'When meat, bones or seafood are boiled, purines leach out into the broth. So <b>the soup can be worse than the meat</b>. Steamboat, bak kut teh and pig-offal soup get richer in purine the longer they cook.<br>👉 Eat a little meat, <b>skip the soup</b>.', src: 'Japan Society of Gout & Nucleic Acid Metabolism purine table; Kaneko K et al., Biol Pharm Bull 2014' },
    },
    {
      ico: '🧃',
      zh: { q: '果汁是水果做的，为什么不能喝？', a: '一杯果汁 = 好几颗水果的果糖，却没有纤维。', why: '果糖在肝脏分解时会<b>直接制造尿酸</b>，喝下去不久尿酸就会上升。整颗水果有纤维、吃得慢，影响小；果汁一口气喝下大量果糖。美国一项追踪 7 万多名女性的研究发现，每天喝 2 杯以上橙汁的人，痛风风险大约是少喝的人的 <b>2.4 倍</b>。<br>👉 <b>吃整颗水果，不要喝果汁</b>。', src: 'Choi HK 等, JAMA 2010（护士健康研究）' },
      en: { q: 'Fruit juice comes from fruit — why avoid it?', a: 'One glass = the fructose of several fruits, minus the fibre.', why: 'When the liver breaks down fructose, it <b>directly produces uric acid</b>. Whole fruit has fibre and is eaten slowly; juice delivers a lot of fructose at once. In a study of 70,000+ women, those drinking 2+ glasses of orange juice a day had about <b>2.4×</b> the gout risk.<br>👉 <b>Eat whole fruit, not juice.</b>', src: 'Choi HK et al., JAMA 2010 (Nurses\' Health Study)' },
    },
    {
      ico: '🥤',
      zh: { q: '汽水没有嘌呤，为什么也会痛风？', a: '问题不是嘌呤，是果糖（糖）。', why: '汽水和很多甜饮料用"高果糖糖浆"。追踪 4 万多名男性 12 年的研究发现，每天喝 2 罐以上含糖汽水的人，痛风风险高了约 <b>85%</b>；无糖汽水则没有这个现象。<br>👉 饮料叫 <b>kosong</b> 或 <b>kurang manis</b>。', src: 'Choi HK & Curhan G, BMJ 2008（医疗专业人员追踪研究）' },
      en: { q: 'Soft drinks have no purine — why do they cause gout?', a: 'It\'s not purine, it\'s fructose (sugar).', why: 'Many sweet drinks use high-fructose syrup. A 12-year study of 46,000+ men found 2+ sugary soft drinks a day raised gout risk by about <b>85%</b>; diet sodas did not.<br>👉 Order drinks <b>kosong</b> or <b>kurang manis</b>.', src: 'Choi HK & Curhan G, BMJ 2008 (Health Professionals Follow-up Study)' },
    },
    {
      ico: '🍺',
      zh: { q: '啤酒、烈酒、红酒，哪个最伤？', a: '啤酒最伤，烈酒其次，适量红酒影响最小。', why: '酒精让肾脏<b>排尿酸变慢</b>，啤酒还额外含有嘌呤（来自酵母）。研究发现每天多喝一罐啤酒，痛风风险约增加 <b>49%</b>；烈酒约 15%；适量红酒没有明显增加。<br>👉 最好不喝；真的要喝，避开啤酒。', src: 'Choi HK 等, Lancet 2004' },
      en: { q: 'Beer, spirits or wine — which is worst?', a: 'Beer is worst, then spirits; moderate wine least.', why: 'Alcohol <b>slows uric acid removal</b> by the kidneys, and beer also contains purines from yeast. Each extra daily beer raised gout risk by about <b>49%</b>; spirits about 15%; moderate wine showed no clear increase.<br>👉 Best not to drink; if you do, avoid beer.', src: 'Choi HK et al., Lancet 2004' },
    },
    {
      ico: '🥬',
      zh: { q: '菠菜、香菇、豆腐真的不能吃吗？', a: '可以吃！植物的嘌呤影响很小。', why: '追踪 4.7 万名男性的大型研究发现：吃<b>肉和海鲜</b>多的人痛风风险较高，但吃<b>高嘌呤蔬菜</b>（菠菜、菇、豆类）的人，风险<b>没有增加</b>。豆腐、豆浆是很好的蛋白质来源。<br>👉 不用因为怕嘌呤而不敢吃菜。', src: 'Choi HK 等, New England Journal of Medicine 2004' },
      en: { q: 'Are spinach, mushrooms and tofu really banned?', a: 'No! Plant purines have little effect.', why: 'A study of 47,000 men found more <b>meat and seafood</b> meant higher gout risk, but <b>purine-rich vegetables</b> (spinach, mushrooms, beans) did <b>not</b> raise risk. Tofu and soy milk are good protein.<br>👉 Don\'t avoid vegetables because of purine.', src: 'Choi HK et al., New England Journal of Medicine 2004' },
    },
    {
      ico: '🥛',
      zh: { q: '喝牛奶可以帮忙降尿酸？', a: '是的，低脂奶类和痛风风险较低有关。', why: '同一个大型研究发现，奶类吃得最多的人，痛风风险比最少的人低约 <b>44%</b>。牛奶里的蛋白质可能帮助肾脏排出尿酸。<br>👉 每天一杯<b>低脂、无糖</b>牛奶或酸奶。', src: 'Choi HK 等, NEJM 2004；Dalbeth N 等, Ann Rheum Dis 2010' },
      en: { q: 'Can milk help lower uric acid?', a: 'Yes — low-fat dairy is linked to lower gout risk.', why: 'In the same large study, people who ate the most dairy had about <b>44%</b> lower gout risk. Milk proteins may help the kidneys excrete uric acid.<br>👉 A glass of <b>low-fat, unsweetened</b> milk or yogurt a day.', src: 'Choi HK et al., NEJM 2004; Dalbeth N et al., Ann Rheum Dis 2010' },
    },
    {
      ico: '☕',
      zh: { q: '痛风的人可以喝咖啡吗？', a: '可以，而且研究显示可能有帮助。', why: '研究发现每天喝 4–5 杯咖啡的人，痛风风险低约 <b>40%</b>；和咖啡因无关，无咖啡因咖啡也有类似效果。但要<b>少糖、少炼奶</b>，不然糖分会抵消好处。<br>👉 Kopi-O kosong 或 kurang manis 最好。有心律不整、睡不好的人要适量。', src: 'Choi HK 等, Arthritis & Rheumatism 2007' },
      en: { q: 'Can people with gout drink coffee?', a: 'Yes — research suggests it may help.', why: '4–5 cups a day was linked to about <b>40%</b> lower gout risk, and decaf showed a similar effect. But keep <b>sugar and condensed milk low</b>, or the sugar cancels the benefit.<br>👉 Kopi-O kosong or kurang manis. Limit it if you have palpitations or poor sleep.', src: 'Choi HK et al., Arthritis & Rheumatism 2007' },
    },
    {
      ico: '🍒',
      zh: { q: '樱桃真的能防痛风发作？', a: '研究显示可能减少约三分之一的发作。', why: '一项研究追踪 600 多位痛风病人，发现两天内吃过樱桃的人，发作风险低约 <b>35%</b>。樱桃里的花青素有抗发炎作用。<br>👉 当零食很好，但<b>不能代替药物</b>；樱桃汁含糖多，吃新鲜的比较好。', src: 'Zhang Y 等, Arthritis & Rheumatism 2012' },
      en: { q: 'Can cherries really prevent flares?', a: 'Studies suggest about a third fewer flares.', why: 'In 600+ gout patients, eating cherries over two days was linked to about <b>35%</b> lower flare risk, likely from anti-inflammatory anthocyanins.<br>👉 A good snack, but <b>not a replacement for medicine</b>; fresh cherries are better than sweetened juice.', src: 'Zhang Y et al., Arthritis & Rheumatism 2012' },
    },
    {
      ico: '🍊',
      zh: { q: '维生素 C 和尿酸有关系？', a: '有，维生素 C 能帮助肾脏排尿酸。', why: '追踪 4.6 万名男性 20 年的研究发现，维生素 C 摄取越多，痛风风险越低。番石榴、木瓜、橙都含丰富维生素 C。<br>👉 先从<b>水果蔬菜</b>摄取；想吃补充品先问医生（有肾结石的人尤其要问）。', src: 'Choi HK 等, Archives of Internal Medicine 2009' },
      en: { q: 'Is vitamin C linked to uric acid?', a: 'Yes — vitamin C helps the kidneys remove uric acid.', why: 'A 20-year study of 46,000 men found higher vitamin C intake meant lower gout risk. Guava, papaya and oranges are rich sources.<br>👉 Get it from <b>fruit and vegetables</b> first; ask your doctor before supplements (especially with kidney stones).', src: 'Choi HK et al., Archives of Internal Medicine 2009' },
    },
    {
      ico: '🎉',
      zh: { q: '为什么吃完大餐隔天就痛风？', a: '短时间吃很多嘌呤，发作风险会急升。', why: '研究发现，两天内吃进大量高嘌呤食物（尤其动物性）的人，痛风发作风险是吃得少的人的<b>差不多 5 倍</b>。喜酒、过年、火锅聚餐后特别常见。<br>👉 聚餐时<b>少喝汤、不喝酒、多喝水</b>，吃完隔天也多喝水。', src: 'Zhang Y 等, Annals of the Rheumatic Diseases 2012' },
      en: { q: 'Why does gout strike the day after a feast?', a: 'A big purine load in a short time spikes flare risk.', why: 'Eating lots of high-purine (especially animal) food over two days raised flare risk to <b>nearly 5×</b>. It\'s common after wedding dinners, Chinese New Year and steamboat.<br>👉 At feasts: <b>skip the soup, no alcohol, drink water</b> — and keep drinking water the next day.', src: 'Zhang Y et al., Annals of the Rheumatic Diseases 2012' },
    },
    {
      ico: '🌙',
      zh: { q: '为什么痛风常常半夜痛醒？', a: '晚上身体缺水、体温较低，尿酸更容易结晶。', why: '研究发现痛风在<b>夜里到清晨</b>发作的风险，大约是白天的 <b>2.4 倍</b>。可能原因：睡觉时没喝水、脚部温度较低、夜间荷尔蒙变化。<br>👉 <b>睡前喝一杯水</b>，晚上注意脚部保暖。', src: 'Choi HK 等, Arthritis & Rheumatology 2015' },
      en: { q: 'Why does gout often wake you at night?', a: 'At night you\'re dehydrated and cooler — crystals form more easily.', why: 'Flares were about <b>2.4×</b> more likely <b>overnight to early morning</b> than in daytime — likely from no water during sleep, cooler feet and night-time hormone changes.<br>👉 <b>Drink a glass of water before bed</b> and keep your feet warm.', src: 'Choi HK et al., Arthritis & Rheumatology 2015' },
    },
    {
      ico: '🏃',
      zh: { q: '想快点降尿酸，饿肚子减肥可以吗？', a: '不可以！饿肚子反而让尿酸升高。', why: '长时间饿肚子或极低碳水饮食时，身体会产生"酮体"，它和尿酸<b>抢同一条路</b>从肾脏排出，尿酸就排不出去。快速减重时身体组织分解，也会释放嘌呤。<br>👉 <b>慢慢减</b>：一个月 1–2 公斤，正常三餐、少糖少油。', src: '肾脏尿酸排泄生理（内科学教科书）；ACR 美国风湿病学会痛风指南 2020' },
      en: { q: 'Can I starve myself to lower uric acid faster?', a: 'No! Fasting actually raises uric acid.', why: 'During long fasts or very low-carb diets the body makes "ketones", which <b>compete with uric acid</b> for removal by the kidneys. Rapid weight loss also breaks down tissue and releases purines.<br>👉 <b>Lose slowly</b>: 1–2 kg a month, three normal meals, less sugar and oil.', src: 'Renal urate physiology (internal medicine textbooks); ACR Gout Guideline 2020' },
    },
    {
      ico: '💊',
      zh: { q: '有些药会让尿酸升高？', a: '有，例如部分利尿剂（水丸）和低剂量阿斯匹灵。', why: '一些降血压的"水丸"（如 hydrochlorothiazide）和每天吃的低剂量阿斯匹灵，会减少肾脏排尿酸。美国痛风指南建议医生在可行时考虑换药。<br>⚠️ <b>千万不要自己停药</b>，下次看医生时问："我的药会影响尿酸吗？"', src: 'ACR 痛风指南（FitzGerald JD 等, Arthritis Care & Research 2020）；Caspi D 等, Arthritis & Rheumatism 2000' },
      en: { q: 'Can some medicines raise uric acid?', a: 'Yes — e.g. some diuretics ("water pills") and low-dose aspirin.', why: 'Some blood-pressure water pills (e.g. hydrochlorothiazide) and daily low-dose aspirin reduce uric acid removal. US gout guidelines suggest doctors consider switching when feasible.<br>⚠️ <b>Never stop on your own</b> — ask your doctor: "Does my medicine affect uric acid?"', src: 'ACR Gout Guideline (FitzGerald JD et al., Arthritis Care & Research 2020); Caspi D et al., Arthritis & Rheumatism 2000' },
    },
    {
      ico: '🧬',
      zh: { q: '为什么人类特别容易尿酸高？', a: '人类在演化中"弄丢"了分解尿酸的酵素。', why: '大部分动物（例如狗、猫）有一种叫<b>尿酸氧化酶</b>的酵素，可以把尿酸再分解掉。人类和猿类的祖先在千万年前失去了这个酵素，所以我们血里的尿酸天生比其他动物高好几倍。<br>👉 这不是你的错，但更要靠饮食和药物来控制。', src: 'Kratzer JT 等, PNAS 2014' },
      en: { q: 'Why are humans so prone to high uric acid?', a: 'We "lost" the enzyme that breaks it down during evolution.', why: 'Most animals (dogs, cats) have an enzyme called <b>uricase</b> that breaks uric acid down further. Our ape ancestors lost it millions of years ago, so our uric acid is naturally several times higher.<br>👉 It\'s not your fault — but it means diet and medicine matter more.', src: 'Kratzer JT et al., PNAS 2014' },
    },
    {
      ico: '🛡️',
      zh: { q: '尿酸是"坏东西"吗？', a: '不全是——适量的尿酸其实是抗氧化剂。', why: '尿酸是血液里重要的<b>抗氧化物质</b>之一，所以目标是把它控制在<b>适当范围</b>（低于 360），不是越低越好。降得太低也不一定好，这也是为什么吃药要听医生调整剂量。', src: 'Ames BN 等, PNAS 1981' },
      en: { q: 'Is uric acid simply "bad"?', a: 'Not entirely — in normal amounts it\'s an antioxidant.', why: 'Uric acid is one of the blood\'s main <b>antioxidants</b>. The goal is the <b>right range</b> (below 360), not "as low as possible" — that\'s why your doctor adjusts the dose.', src: 'Ames BN et al., PNAS 1981' },
    },
    {
      ico: '🎯',
      zh: { q: '不痛了，可以停药吗？', a: '不可以。不痛不代表尿酸已经降下来。', why: '关节里的尿酸结晶要<b>好几个月到几年</b>才会慢慢溶掉。国际痛风指南都建议：吃降尿酸药要长期把尿酸维持在 <b>360 以下</b>（有痛风石要 300 以下），自己停药很容易再发作。', src: 'ACR 痛风指南 2020；EULAR 欧洲痛风指南（Richette P 等, Ann Rheum Dis 2017）' },
      en: { q: 'No more pain — can I stop my medicine?', a: 'No. No pain doesn\'t mean uric acid is low.', why: 'Crystals in joints take <b>months to years</b> to dissolve. International guidelines say to keep uric acid <b>below 360</b> long-term (below 300 with tophi). Stopping on your own often brings flares back.', src: 'ACR Gout Guideline 2020; EULAR (Richette P et al., Ann Rheum Dis 2017)' },
    },
  ],

  // ===== 《疯狂的尿酸》书本精华（用我们自己的话整理，不是原文）=====
  book: {
    intro: {
      zh: '《疯狂的尿酸》（英文原名 <i>Drop Acid</i>，2022）作者是美国神经科医生 David Perlmutter（也是《谷物大脑》的作者）。以下是<b>用我们自己的话整理的重点</b>，不是原文，想深入了解建议购买原书。书里有些建议比现行医学指南更积极，所以每一点都附上"🩺 主流医学怎么看"。',
      en: '<i>Drop Acid</i> (2022; Chinese title 《疯狂的尿酸》) is by US neurologist Dr David Perlmutter (author of <i>Grain Brain</i>). Below is <b>our own summary of key ideas</b>, not the original text — read the book for more. Some of its advice goes further than current guidelines, so each point includes "🩺 What mainstream medicine says".',
    },
    points: [
      {
        ico: '🔥',
        zh: { t: '尿酸不只是痛风的问题', b: '书的核心观点：尿酸高不只会痛风，还和<b>肥胖、胰岛素阻抗（糖尿病前期）、高血压、脂肪肝、肾病</b>有关，作者认为它是很多"代谢病"背后的推手之一。', m: '研究确实发现尿酸高的人比较常有这些病，但到底是尿酸"造成"这些病，还是一起出现，目前还在研究，没有定论。' },
        en: { t: 'Uric acid is about more than gout', b: 'The book\'s core idea: high uric acid is linked not only to gout but to <b>obesity, insulin resistance, high blood pressure, fatty liver and kidney disease</b> — the author sees it as a driver of many metabolic diseases.', m: 'Studies do show these conditions are more common with high uric acid, but whether uric acid <i>causes</i> them or simply travels with them is still being researched.' },
      },
      {
        ico: '🧬',
        zh: { t: '为什么人类容易尿酸高？"节俭基因"', b: '作者引用 Richard Johnson 教授的理论：远古祖先失去分解尿酸的酵素，尿酸较高能帮助身体在缺乏食物时<b>储存脂肪</b>，是一种求生机制。可是在食物（特别是糖）过多的现代，这个机制反而让人变胖、生病。', m: '人类失去尿酸氧化酶是确定的事实；至于这是不是为了"储存脂肪"，是一个有研究支持、但仍在讨论中的假说。' },
        en: { t: 'Why humans run high: the "thrifty gene"', b: 'Citing Prof. Richard Johnson\'s theory: our ancestors lost the uric-acid-breaking enzyme, and higher uric acid helped them <b>store fat</b> when food was scarce. In today\'s world of plenty — especially sugar — that survival trick backfires.', m: 'The loss of uricase is established fact; whether it evolved to help store fat is a supported but still-debated hypothesis.' },
      },
      {
        ico: '🍬',
        zh: { t: '最大元凶：果糖', b: '书中最强调的一点：<b>果糖</b>（汽水、果汁、甜点、高果糖糖浆）在肝脏代谢时会直接产生尿酸，而尿酸又让身体更容易囤积脂肪——形成恶性循环。作者认为控制果糖比只算嘌呤更重要。', m: '这点和研究一致：大型研究证实含糖饮料、果汁会提高痛风风险（见"冷知识"）。主流指南也建议限制含糖饮料。' },
        en: { t: 'Main culprit: fructose', b: 'The book\'s strongest message: <b>fructose</b> (soft drinks, juice, desserts, high-fructose syrup) directly produces uric acid in the liver, and uric acid in turn promotes fat storage — a vicious circle. The author argues limiting fructose matters as much as counting purines.', m: 'This matches the evidence: large studies show sugary drinks and juice raise gout risk (see Facts). Guidelines also advise limiting sugary drinks.' },
      },
      {
        ico: '🎯',
        zh: { t: '作者建议更低的目标', b: '作者建议把尿酸维持在 <b>5.5 mg/dL（约 330 µmol/L）或以下</b>，认为这样对整体代谢健康更好。', m: '痛风治疗指南的目标是 <b>低于 360</b>（有痛风石低于 300）。如果<b>没有痛风</b>、只是尿酸稍高，多数指南<b>不建议吃药</b>，而是先改生活习惯。目标请跟医生讨论。' },
        en: { t: 'A stricter target', b: 'The author suggests keeping uric acid at <b>5.5 mg/dL (about 330 µmol/L) or lower</b> for overall metabolic health.', m: 'Gout treatment guidelines target <b>below 360</b> (below 300 with tophi). For high uric acid <b>without gout</b>, most guidelines <b>do not recommend medicine</b> — lifestyle first. Discuss your target with your doctor.' },
      },
      {
        ico: '🥗',
        zh: { t: '降尿酸饮食（书中称 LUV 饮食）', b: '书里的饮食原则：<ul><li>❌ 少果糖：汽水、果汁、甜点、加工食品</li><li>❌ 少高嘌呤：内脏、某些海鲜、浓汤</li><li>❌ 少酒，特别是啤酒</li><li>✅ 多蔬菜、樱桃、富含维生素 C 的水果</li><li>✅ 咖啡（不加糖）、多喝水</li></ul>', m: '大部分和主流建议一致。唯一要提醒：书中偏向低碳水，但<b>极低碳水或断食</b>会让尿酸短暂升高，痛风病人要循序渐进。' },
        en: { t: 'The uric-acid-lowering diet ("LUV" diet)', b: 'The book\'s eating principles:<ul><li>❌ Less fructose: soft drinks, juice, desserts, processed food</li><li>❌ Fewer high-purine foods: organ meats, some seafood, rich broths</li><li>❌ Less alcohol, especially beer</li><li>✅ More vegetables, cherries, vitamin-C-rich fruit</li><li>✅ Coffee (no sugar), plenty of water</li></ul>', m: 'Mostly in line with mainstream advice. One caution: the book leans low-carb, but <b>very low-carb diets or fasting</b> can briefly raise uric acid — people with gout should change gradually.' },
      },
      {
        ico: '😴',
        zh: { t: '睡眠、运动和压力也很重要', b: '作者提醒：<b>睡眠不足</b>、缺乏运动、长期压力都会扰乱代谢、影响尿酸。建议每晚睡 7–8 小时、规律运动，书中也提到"限时进食"（例如把三餐集中在白天的某段时间）。', m: '规律运动、睡眠充足是大家都同意的。"限时进食"对尿酸的效果证据还不多；长时间空腹可能诱发痛风，<b>有痛风的人先问医生</b>。' },
        en: { t: 'Sleep, exercise and stress matter too', b: 'The author notes that <b>poor sleep</b>, inactivity and chronic stress disrupt metabolism and uric acid. He recommends 7–8 hours of sleep, regular exercise, and mentions "time-restricted eating" (eating within a set daytime window).', m: 'Exercise and good sleep are universally agreed. Evidence for time-restricted eating on uric acid is limited; long fasting may trigger gout, so <b>ask your doctor first if you have gout</b>.' },
      },
      {
        ico: '💊',
        zh: { t: '补充品', b: '书中提到一些可能帮助降尿酸的补充品，例如<b>槲皮素、维生素 C、DHA（鱼油）</b>等。', m: '这些补充品的研究证据<b>有限</b>，效果远不如降尿酸药，<b>不能用来代替医生开的药</b>。有肾病、正在吃药的人，吃任何补充品前都要先问医生或药剂师。' },
        en: { t: 'Supplements', b: 'The book mentions supplements that may help, such as <b>quercetin, vitamin C and DHA (fish oil)</b>.', m: 'Evidence for these is <b>limited</b> and far weaker than for prescribed medicine — they <b>cannot replace your medication</b>. With kidney disease or other medicines, ask your doctor or pharmacist first.' },
      },
      {
        ico: '📈',
        zh: { t: '自己追踪尿酸', b: '作者鼓励大家<b>定期测量尿酸</b>（包括使用家用尿酸测量仪），像量血压一样了解自己的身体变化，看看饮食改变有没有效果。', m: '定期追踪是好事。家用测量仪方便但<b>准确度不如化验所</b>，可以用来看趋势，重要决定还是以医院或化验所的报告为准。👉 你可以在本 App 首页"自己输入尿酸"记录每次结果。' },
        en: { t: 'Track your own uric acid', b: 'The author encourages <b>regular testing</b> (including home uric acid meters) — like checking blood pressure — to see whether diet changes work.', m: 'Tracking is good. Home meters are handy but <b>less accurate than labs</b> — use them for trends, and rely on lab reports for decisions. 👉 Use "Enter uric acid" on the home page to log each result.' },
      },
    ],
  },
};

if (typeof window !== 'undefined') window.CONTENT = CONTENT;
if (typeof module !== 'undefined') module.exports = CONTENT;
