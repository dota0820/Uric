// 嘌呤食物数据库（参考值）
// purine: 约每 100g 的总嘌呤 mg（参考日本痛风·核酸代谢学会等公开数据的近似值；同一食物不同来源会有差异）
// level: green = 可以吃 / yellow = 少量 / red = 尽量避免
// 注意：判定不只看嘌呤 —— 酒精、含糖饮料（果糖）、浓肉汤虽然嘌呤数字不一定最高，但会明显升高尿酸，所以也列为红色。
// 植物性嘌呤（豆腐、菇类、菠菜）研究显示对痛风影响小，所以多数列为绿色或黄色。

const FOODS = [
  // ===== 内脏 Offal =====
  { id: 'chicken_liver', zh: '鸡肝', en: 'Chicken liver', purine: 312, level: 'red', cat: 'offal' },
  { id: 'pork_liver', zh: '猪肝', en: 'Pork liver', purine: 285, level: 'red', cat: 'offal' },
  { id: 'beef_liver', zh: '牛肝', en: 'Beef liver', purine: 220, level: 'red', cat: 'offal' },
  { id: 'pork_kidney', zh: '猪腰', en: 'Pork kidney', purine: 195, level: 'red', cat: 'offal' },
  { id: 'pork_intestine', zh: '猪肠 / 猪杂', en: 'Pork intestine / mixed pig offal', purine: 120, level: 'red', cat: 'offal' },
  { id: 'chicken_heart', zh: '鸡心', en: 'Chicken heart', purine: 125, level: 'red', cat: 'offal' },
  { id: 'chicken_gizzard', zh: '鸡胗', en: 'Chicken gizzard', purine: 142, level: 'red', cat: 'offal' },

  // ===== 海鲜 Seafood =====
  { id: 'ikan_bilis', zh: '江鱼仔 / 小鳀鱼干', en: 'Ikan bilis (dried anchovies)', purine: 1100, level: 'red', cat: 'seafood' },
  { id: 'dried_sardine', zh: '小鱼干', en: 'Dried small fish', purine: 750, level: 'red', cat: 'seafood' },
  { id: 'dried_scallop', zh: '干贝 / 瑶柱', en: 'Dried scallop', purine: 390, level: 'red', cat: 'seafood' },
  { id: 'dried_shrimp', zh: '虾米 / 虾干', en: 'Dried shrimp', purine: 380, level: 'red', cat: 'seafood' },
  { id: 'belacan', zh: '峇拉煎 / 虾膏', en: 'Belacan (shrimp paste)', purine: 300, level: 'red', cat: 'seafood' },
  { id: 'sardine', zh: '沙丁鱼', en: 'Sardine', purine: 210, level: 'red', cat: 'seafood' },
  { id: 'prawn', zh: '大虾 / 明虾', en: 'Prawn', purine: 230, level: 'red', cat: 'seafood' },
  { id: 'shrimp', zh: '虾', en: 'Shrimp', purine: 150, level: 'yellow', cat: 'seafood' },
  { id: 'cockles', zh: '蚶 / 血蚶', en: 'Cockles (kerang)', purine: 200, level: 'red', cat: 'seafood' },
  { id: 'lala', zh: '啦啦 / 蛤蜊', en: 'Clams (lala)', purine: 145, level: 'yellow', cat: 'seafood' },
  { id: 'oyster', zh: '蚝 / 生蚝', en: 'Oyster', purine: 185, level: 'red', cat: 'seafood' },
  { id: 'mussel', zh: '青口 / 贻贝', en: 'Mussel', purine: 180, level: 'red', cat: 'seafood' },
  { id: 'squid', zh: '苏东 / 鱿鱼', en: 'Squid (sotong)', purine: 187, level: 'yellow', cat: 'seafood' },
  { id: 'octopus', zh: '章鱼', en: 'Octopus', purine: 137, level: 'yellow', cat: 'seafood' },
  { id: 'crab', zh: '螃蟹', en: 'Crab', purine: 136, level: 'yellow', cat: 'seafood' },
  { id: 'tuna', zh: '吞拿鱼 / 金枪鱼', en: 'Tuna', purine: 157, level: 'yellow', cat: 'seafood' },
  { id: 'mackerel', zh: '甘望鱼 / 鲭鱼', en: 'Mackerel (ikan kembung)', purine: 122, level: 'yellow', cat: 'seafood' },
  { id: 'salmon', zh: '三文鱼', en: 'Salmon', purine: 119, level: 'yellow', cat: 'seafood' },
  { id: 'white_fish', zh: '一般白肉鱼（金凤、石斑、红鱼等）', en: 'White fish (pomfret, grouper, snapper)', purine: 120, level: 'yellow', cat: 'seafood' },
  { id: 'fish_ball', zh: '鱼丸 / 鱼饼', en: 'Fish balls / fish cake', purine: 60, level: 'green', cat: 'seafood' },
  { id: 'fish_head', zh: '鱼头', en: 'Fish head', purine: 150, level: 'yellow', cat: 'seafood' },

  // ===== 肉类 Meat =====
  { id: 'chicken_breast', zh: '鸡胸肉', en: 'Chicken breast', purine: 141, level: 'yellow', cat: 'meat' },
  { id: 'chicken_thigh', zh: '鸡腿肉', en: 'Chicken thigh', purine: 122, level: 'yellow', cat: 'meat' },
  { id: 'chicken_skin', zh: '鸡皮', en: 'Chicken skin', purine: 120, level: 'yellow', cat: 'meat' },
  { id: 'duck', zh: '鸭肉', en: 'Duck', purine: 138, level: 'yellow', cat: 'meat' },
  { id: 'pork', zh: '猪肉', en: 'Pork', purine: 100, level: 'yellow', cat: 'meat' },
  { id: 'pork_belly', zh: '五花肉 / 烧肉', en: 'Pork belly / roast pork', purine: 75, level: 'yellow', cat: 'meat' },
  { id: 'char_siu', zh: '叉烧', en: 'Char siu', purine: 100, level: 'yellow', cat: 'meat' },
  { id: 'beef', zh: '牛肉', en: 'Beef', purine: 100, level: 'yellow', cat: 'meat' },
  { id: 'mutton', zh: '羊肉', en: 'Mutton / lamb', purine: 93, level: 'yellow', cat: 'meat' },
  { id: 'sausage', zh: '香肠 / 火腿', en: 'Sausage / ham', purine: 50, level: 'yellow', cat: 'meat' },

  // ===== 汤 / 调味 Soup & seasonings =====
  { id: 'meat_broth', zh: '浓肉汤 / 骨头汤 / 火锅汤底', en: 'Rich meat or bone broth / steamboat soup', purine: 200, level: 'red', cat: 'soup' },
  { id: 'chicken_essence', zh: '鸡精（瓶装）', en: 'Chicken essence (bottled)', purine: 300, level: 'red', cat: 'soup' },
  { id: 'marmite', zh: '马麦酱 / 酵母酱', en: 'Marmite / yeast extract', purine: 1000, level: 'red', cat: 'soup' },
  { id: 'oyster_sauce', zh: '蚝油', en: 'Oyster sauce', purine: 30, level: 'green', cat: 'soup' },

  // ===== 本地熟食 Malaysian dishes（按常见做法估计）=====
  { id: 'bak_kut_teh', zh: '肉骨茶', en: 'Bak kut teh', purine: 160, level: 'red', cat: 'dish', note_zh: '浓汤 + 排骨 + 常加猪杂，汤最好不要喝。', note_en: 'Rich broth + ribs, often with offal. Avoid drinking the soup.' },
  { id: 'nasi_lemak', zh: '椰浆饭', en: 'Nasi lemak', purine: 90, level: 'yellow', cat: 'dish', note_zh: '江鱼仔和峇拉煎嘌呤很高，可以叫少江鱼仔、改配鸡蛋。', note_en: 'Ikan bilis and sambal belacan are high. Ask for less ikan bilis, have it with egg.' },
  { id: 'curry_laksa', zh: '咖喱叻沙', en: 'Curry laksa', purine: 150, level: 'red', cat: 'dish', note_zh: '有血蚶、虾和浓汤底。', note_en: 'Contains cockles, prawns and rich broth.' },
  { id: 'asam_laksa', zh: '亚参叻沙', en: 'Asam laksa', purine: 170, level: 'red', cat: 'dish', note_zh: '用沙丁鱼 / 鲭鱼熬汤，加虾膏。', note_en: 'Broth made from sardine/mackerel with shrimp paste.' },
  { id: 'char_kuey_teow', zh: '炒粿条', en: 'Char kuey teow', purine: 130, level: 'red', cat: 'dish', note_zh: '有血蚶和虾，可以叫走蚶走虾。', note_en: 'Has cockles and prawns. Ask for no cockles/prawns.' },
  { id: 'hokkien_mee', zh: '福建虾面', en: 'Prawn mee (Hokkien mee)', purine: 170, level: 'red', cat: 'dish', note_zh: '虾头熬汤，嘌呤高。', note_en: 'Broth boiled from prawn heads.' },
  { id: 'chicken_rice', zh: '海南鸡饭', en: 'Chicken rice', purine: 80, level: 'yellow', cat: 'dish', note_zh: '鸡肉适量没问题，去皮、少喝鸡汤。', note_en: 'Moderate chicken is fine. Remove skin, skip the soup.' },
  { id: 'wantan_mee', zh: '云吞面', en: 'Wantan mee', purine: 70, level: 'yellow', cat: 'dish' },
  { id: 'pig_offal_porridge', zh: '猪杂粥 / 猪杂汤', en: 'Pig offal porridge / soup', purine: 180, level: 'red', cat: 'dish' },
  { id: 'fish_head_noodle', zh: '鱼头米粉', en: 'Fish head noodle soup', purine: 140, level: 'red', cat: 'dish', note_zh: '鱼头 + 浓汤，汤尽量不要喝。', note_en: 'Fish head + rich soup; avoid the soup.' },
  { id: 'steamboat', zh: '火锅 / Steamboat', en: 'Steamboat / hotpot', purine: 200, level: 'red', cat: 'dish', note_zh: '煮到后面汤里嘌呤非常高，只吃菜和少量肉，不喝汤。', note_en: 'Soup becomes very high in purine. Eat veg and a little meat, don\'t drink the soup.' },
  { id: 'satay', zh: '沙爹', en: 'Satay', purine: 110, level: 'yellow', cat: 'dish' },
  { id: 'roti_canai', zh: '印度煎饼', en: 'Roti canai', purine: 20, level: 'green', cat: 'dish', note_zh: '嘌呤低，但油多，注意体重。', note_en: 'Low purine but oily; watch your weight.' },
  { id: 'curry_chicken', zh: '咖喱鸡', en: 'Curry chicken', purine: 100, level: 'yellow', cat: 'dish' },
  { id: 'economy_rice_veg', zh: '经济饭（多菜少肉）', en: 'Economy rice (mostly veg)', purine: 50, level: 'green', cat: 'dish' },
  { id: 'fried_rice', zh: '炒饭', en: 'Fried rice', purine: 50, level: 'green', cat: 'dish' },
  { id: 'yong_tau_foo', zh: '酿豆腐', en: 'Yong tau foo', purine: 60, level: 'green', cat: 'dish', note_zh: '选豆腐、蔬菜类，汤不要喝太多。', note_en: 'Choose tofu and vegetables; don\'t drink too much soup.' },

  // ===== 豆类 / 菇 / 蔬菜 Plant foods =====
  { id: 'tofu', zh: '豆腐', en: 'Tofu', purine: 31, level: 'green', cat: 'plant', note_zh: '植物嘌呤，对痛风影响小，可以当蛋白质来源。', note_en: 'Plant purine with little effect on gout; a good protein source.' },
  { id: 'soy_milk', zh: '豆浆', en: 'Soy milk', purine: 22, level: 'green', cat: 'plant', note_zh: '选无糖或少糖。', note_en: 'Choose unsweetened or less sugar.' },
  { id: 'soybean', zh: '黄豆（干）', en: 'Soybeans (dried)', purine: 172, level: 'yellow', cat: 'plant' },
  { id: 'tempeh', zh: '天贝', en: 'Tempeh', purine: 100, level: 'green', cat: 'plant' },
  { id: 'bean_sprouts', zh: '豆芽', en: 'Bean sprouts', purine: 40, level: 'green', cat: 'plant' },
  { id: 'peanut', zh: '花生', en: 'Peanuts', purine: 49, level: 'green', cat: 'plant' },
  { id: 'shiitake_fresh', zh: '香菇（新鲜）', en: 'Fresh shiitake', purine: 21, level: 'green', cat: 'plant' },
  { id: 'shiitake_dried', zh: '干香菇', en: 'Dried shiitake', purine: 379, level: 'yellow', cat: 'plant', note_zh: '干的嘌呤高，但一次吃的量不多，适量就好。', note_en: 'High per 100g dry, but servings are small. Moderate.' },
  { id: 'mushroom', zh: '其他菇类（金针菇、蘑菇）', en: 'Other mushrooms', purine: 50, level: 'green', cat: 'plant' },
  { id: 'spinach', zh: '菠菜', en: 'Spinach', purine: 51, level: 'green', cat: 'plant' },
  { id: 'broccoli', zh: '西兰花', en: 'Broccoli', purine: 70, level: 'green', cat: 'plant' },
  { id: 'cauliflower', zh: '花椰菜', en: 'Cauliflower', purine: 57, level: 'green', cat: 'plant' },
  { id: 'asparagus', zh: '芦笋', en: 'Asparagus', purine: 55, level: 'green', cat: 'plant' },
  { id: 'leafy_veg', zh: '一般青菜（菜心、芥兰、白菜等）', en: 'Leafy greens (choy sum, kailan, cabbage)', purine: 20, level: 'green', cat: 'plant' },
  { id: 'vegetables', zh: '瓜类、萝卜、番茄等蔬菜', en: 'Gourds, radish, tomato, etc.', purine: 10, level: 'green', cat: 'plant' },

  // ===== 主食 Staples =====
  { id: 'rice', zh: '白饭', en: 'White rice', purine: 26, level: 'green', cat: 'staple' },
  { id: 'brown_rice', zh: '糙米', en: 'Brown rice', purine: 37, level: 'green', cat: 'staple' },
  { id: 'noodles', zh: '面 / 米粉 / 粿条', en: 'Noodles / bee hoon / kuey teow', purine: 20, level: 'green', cat: 'staple' },
  { id: 'bread', zh: '面包', en: 'Bread', purine: 5, level: 'green', cat: 'staple' },
  { id: 'oats', zh: '燕麦', en: 'Oats', purine: 94, level: 'green', cat: 'staple' },
  { id: 'potato', zh: '马铃薯 / 番薯', en: 'Potato / sweet potato', purine: 10, level: 'green', cat: 'staple' },

  // ===== 蛋奶 Eggs & dairy =====
  { id: 'egg', zh: '鸡蛋', en: 'Egg', purine: 0, level: 'green', cat: 'dairy', note_zh: '几乎没有嘌呤，很好的蛋白质来源。', note_en: 'Almost no purine; excellent protein.' },
  { id: 'milk_lowfat', zh: '低脂牛奶', en: 'Low-fat milk', purine: 0, level: 'green', cat: 'dairy', note_zh: '研究显示低脂奶有助于降尿酸。', note_en: 'Low-fat dairy may help lower uric acid.' },
  { id: 'yogurt', zh: '酸奶（少糖）', en: 'Yogurt (low sugar)', purine: 5, level: 'green', cat: 'dairy' },
  { id: 'cheese', zh: '奶酪', en: 'Cheese', purine: 6, level: 'green', cat: 'dairy' },

  // ===== 水果 Fruit =====
  { id: 'cherry', zh: '樱桃', en: 'Cherries', purine: 5, level: 'green', cat: 'fruit', note_zh: '研究显示可能减少痛风发作。', note_en: 'May reduce gout flares.' },
  { id: 'fruit_general', zh: '一般水果（木瓜、苹果、橙、香蕉、西瓜）', en: 'Most fruit (papaya, apple, orange, banana, watermelon)', purine: 10, level: 'green', cat: 'fruit' },
  { id: 'durian', zh: '榴莲', en: 'Durian', purine: 20, level: 'yellow', cat: 'fruit', note_zh: '嘌呤不高，但糖分高、热量高，一次一两粒就好。', note_en: 'Low purine but very sugary; just a seed or two.' },
  { id: 'fruit_juice', zh: '果汁（盒装 / 鲜榨）', en: 'Fruit juice', purine: 5, level: 'red', cat: 'fruit', note_zh: '果糖会直接升高尿酸，吃整颗水果比较好。', note_en: 'Fructose raises uric acid directly. Eat whole fruit instead.' },

  // ===== 饮料 Drinks =====
  { id: 'water', zh: '白开水', en: 'Plain water', purine: 0, level: 'green', cat: 'drink', note_zh: '每天 2 公升以上，帮助排尿酸（有心脏或肾病要先问医生）。', note_en: '2+ litres a day helps flush uric acid (ask your doctor if you have heart or kidney disease).' },
  { id: 'coffee', zh: '咖啡（少糖）', en: 'Coffee (less sugar)', purine: 0, level: 'green', cat: 'drink', note_zh: '研究显示咖啡可能帮助降尿酸，但不要加太多糖和炼奶。', note_en: 'Coffee may help lower uric acid; avoid lots of sugar and condensed milk.' },
  { id: 'tea', zh: '茶 / 中国茶', en: 'Tea', purine: 0, level: 'green', cat: 'drink' },
  { id: 'teh_tarik', zh: '拉茶 / 奶茶（有糖）', en: 'Teh tarik / sweetened milk tea', purine: 0, level: 'yellow', cat: 'drink', note_zh: '糖多，叫 kurang manis（少甜）。', note_en: 'High sugar; ask for kurang manis.' },
  { id: 'soft_drink', zh: '汽水 / 含糖饮料', en: 'Soft drinks / sugary drinks', purine: 0, level: 'red', cat: 'drink', note_zh: '果糖会明显升高尿酸。', note_en: 'Fructose clearly raises uric acid.' },
  { id: 'beer', zh: '啤酒', en: 'Beer', purine: 8, level: 'red', cat: 'drink', note_zh: '酒精 + 嘌呤，最容易引发痛风。', note_en: 'Alcohol + purine — the classic gout trigger.' },
  { id: 'liquor', zh: '烈酒 / 白酒 / 威士忌', en: 'Spirits (whisky, brandy)', purine: 0, level: 'red', cat: 'drink', note_zh: '酒精会让肾脏排尿酸变慢。', note_en: 'Alcohol slows uric acid excretion by the kidneys.' },
  { id: 'wine', zh: '红酒 / 葡萄酒', en: 'Wine', purine: 0, level: 'yellow', cat: 'drink', note_zh: '比啤酒好一点，但仍然尽量少喝。', note_en: 'Less bad than beer, but still limit it.' },
  { id: 'bird_nest', zh: '燕窝', en: 'Bird\'s nest', purine: 10, level: 'green', cat: 'drink' },
];

const BY_ID = Object.fromEntries(FOODS.map((f) => [f.id, f]));

const LEVEL_ORDER = { green: 0, yellow: 1, red: 2 };

function catalogForPrompt() {
  return FOODS.map((f) => `${f.id}: ${f.zh} / ${f.en}`).join('\n');
}

module.exports = { FOODS, BY_ID, LEVEL_ORDER, catalogForPrompt };
