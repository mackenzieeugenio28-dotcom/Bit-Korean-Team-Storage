/* ============================================================
   K-Drama Korean — data.js
   All lesson content is hard-coded here (docx requirement).
   Each lesson: id, drama meta, line, romanisation, word
   breakdown, one grammar point, and a 3-question quiz.
   ============================================================ */
'use strict';

const SITE_IMG = {
  hero: 'https://aka.doubaocdn.com/s/8NUePFq7Mr',
  team: 'https://aka.doubaocdn.com/s/XF60a63pzy',
};

const LESSONS = [
  {
    id: 1,
    drama: { en: 'Goblin', zh: '鬼怪', kr: '도깨비' },
    year: 2016,
    category: 'romance',
    difficulty: 2,
    cover: 'https://aka.doubaocdn.com/s/boPzUK7Vk4',
    video: 'media/ep01.mp4',
    scene: {
      en: 'A simple and direct confession — the Goblin tells the person in front of him: I love you.',
      zh: '一句简单而直白的表白——鬼怪对眼前的人说：我爱你。',
    },
    line: '사랑해요.',
    roman: 'saranghaeyo.',
    translation: {
      en: 'I love you.',
      zh: '我爱你。',
    },
    words: [
      { kr: '사랑', roman: 'sarang', en: 'love', zh: '爱' },
      { kr: '하다', roman: 'hada', en: 'to do', zh: '做' },
      { kr: '사랑하다', roman: 'saranghada', en: 'to love', zh: '去爱' },
      { kr: '사랑해요', roman: 'saranghaeyo', en: 'I love you (polite)', zh: '我爱你（敬语）' },
      { kr: '해요', roman: 'haeyo', en: 'polite ending (해요-che)', zh: '敬语词尾（해요体）' },
    ],
    grammar: {
      title: { en: 'The polite 해요-che (해요体)', zh: '敬语해요体' },
      tip: {
        en: '사랑하다 (to love) becomes 사랑해요 in polite daily speech: stem 사랑하- + polite ending -여요 → 사랑해요. The 해요-che is a friendly-polite form used in everyday conversation.',
        zh: '사랑하다（去爱）在日常礼貌用语中变为 사랑해요：词干 사랑하- + 敬语词尾 -여요 → 사랑해요。해요体是日常对话中友好而礼貌的表达形式。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 사랑 mean?', zh: '사랑 是什么意思？' },
        options: [
          { en: 'love', zh: '爱' },
          { en: 'heart', zh: '心脏' },
          { en: 'sleep', zh: '睡觉' },
        ],
        answer: 0,
        explain: { en: '사랑 (sarang) = love.', zh: '사랑（sarang）= 爱。' },
      },
      {
        q: { en: 'What does 사랑해요 mean?', zh: '사랑해요 是什么意思？' },
        options: [
          { en: 'I love you', zh: '我爱你' },
          { en: 'Goodbye', zh: '再见' },
          { en: 'Thank you', zh: '谢谢' },
        ],
        answer: 0,
        explain: { en: '사랑해요 = “I love you” in polite speech.', zh: '사랑해요 = 敬语形式的“我爱你”。' },
      },
      {
        q: { en: 'In 사랑해요, the ending -해요 expresses...', zh: '사랑해요 中的词尾 -해요 表示……' },
        options: [
          { en: 'a rude tone', zh: '粗鲁的语气' },
          { en: 'polite, friendly speech', zh: '礼貌、友好的表达' },
          { en: 'past tense', zh: '过去时' },
        ],
        answer: 1,
        explain: { en: '-해요 is the polite 해요-che ending used in everyday conversation.', zh: '-해요 是日常口语中常用的敬语해요体词尾。' },
      },
    ],
  },

  {
    id: 2,
    drama: { en: 'Descendants of the Sun', zh: '太阳的后裔', kr: '태양의 후예' },
    year: 2016,
    category: 'action',
    difficulty: 1,
    cover: 'https://aka.doubaocdn.com/s/D97VgCVWlN',
    scene: {
      en: 'A phone confession: Captain Yoo Si-jin admits that right now, he misses Dr. Kang Mo-yeon a lot.',
      zh: '一通电话里的告白：柳时镇大尉承认，此刻他很想念姜暮烟医生。',
    },
    line: '저 지금 많이 보고 싶었거든요.',
    roman: 'jeo jigeum mani bogo sipeotgeodeunyo.',
    translation: {
      en: 'I have been missing you a lot right now.',
      zh: '我现在真的很想你。',
    },
    words: [
      { kr: '저', roman: 'jeo', en: 'I (humble form)', zh: '我（谦称）' },
      { kr: '지금', roman: 'jigeum', en: 'now', zh: '现在' },
      { kr: '많이', roman: 'mani', en: 'a lot', zh: '很多' },
      { kr: '보고 싶다', roman: 'bogo sipda', en: 'to miss (want to see)', zh: '想念（想见）' },
    ],
    grammar: {
      title: { en: '-거든요: sharing a reason', zh: '-거든요：向对方说明理由' },
      tip: {
        en: '보고 싶다 literally means “want to see” (보다 + -고 싶다), the standard way to say “I miss you”. The ending -거든요 tells the listener something they did not know, and softens the confession into a personal truth.',
        zh: '보고 싶다 字面意思是“想见”（보다 + -고 싶다），是“想念”的标准说法。结尾 -거든요 用来告诉对方一个他不知道的信息，让这句告白听起来像在分享一个个人心声。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 지금 mean?', zh: '지금 是什么意思？' },
        options: [
          { en: 'now', zh: '现在' },
          { en: 'later', zh: '稍后' },
          { en: 'always', zh: '总是' },
        ],
        answer: 0,
        explain: { en: '지금 (jigeum) = now.', zh: '지금（jigeum）= 现在。' },
      },
      {
        q: { en: '보고 싶다 literally means “want to ___”.', zh: '보고 싶다 的字面意思是“想___”。' },
        options: [
          { en: 'see', zh: '见' },
          { en: 'eat', zh: '吃' },
          { en: 'sleep', zh: '睡' },
        ],
        answer: 0,
        explain: { en: '보다 = to see; -고 싶다 = want to.', zh: '보다 = 看/见；-고 싶다 = 想要。' },
      },
      {
        q: { en: 'The ending -거든요 is used to…', zh: '结尾 -거든요 的用法是……' },
        options: [
          { en: 'ask a yes/no question', zh: '提出是非问句' },
          { en: 'give a reason the listener does not know', zh: '说明对方不知道的理由' },
          { en: 'give an order', zh: '下达命令' },
        ],
        answer: 1,
        explain: { en: '-거든요 shares background the listener does not know yet.', zh: '-거든요 用来分享对方还不知道的背景信息。' },
      },
    ],
  },

  {
    id: 3,
    drama: { en: 'Reply 1988', zh: '请回答1988', kr: '응답하라 1988' },
    year: 2015,
    category: 'healing',
    difficulty: 1,
    cover: 'https://aka.doubaocdn.com/s/EgDVUSkqUx',
    scene: {
      en: 'The narrator’s warm reflection from Ssangmun-dong: grown-ups are just enduring, busy with the business of being adults.',
      zh: '来自双门洞的温暖旁白：大人们只是在硬撑，忙着做大人们该做的事。',
    },
    line: '어른들은 그저 견디고 있을 뿐이다.',
    roman: 'eoreundeureun geujeo gyeondigo isseul ppunida.',
    translation: {
      en: 'Adults are just enduring — that is all.',
      zh: '大人们只是在强撑着而已。',
    },
    words: [
      { kr: '어른', roman: 'eoreun', en: 'adult', zh: '大人' },
      { kr: '그저', roman: 'geujeo', en: 'just, merely', zh: '只是' },
      { kr: '견디다', roman: 'gyeondida', en: 'to endure', zh: '忍耐、坚持' },
      { kr: '뿐이다', roman: 'ppunida', en: 'that is all', zh: '仅此而已' },
    ],
    grammar: {
      title: { en: '-고 있다 + 뿐이다: “just in the middle of -ing”', zh: '-고 있다 + 뿐이다：“正在……而已”' },
      tip: {
        en: '-고 있다 marks an ongoing action (견디고 있다 = “is enduring”). Adding 뿐이다 (“that’s all”) emphasises that there is nothing more to it: they are simply enduring, nothing else.',
        zh: '-고 있다 表示正在进行的动作（견디고 있다 = “正在忍耐”）。再加上 뿐이다（“仅此而已”），强调没有别的了：只是在撑着，仅此而已。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 어른 mean?', zh: '어른 是什么意思？' },
        options: [
          { en: 'child', zh: '孩子' },
          { en: 'adult', zh: '大人' },
          { en: 'friend', zh: '朋友' },
        ],
        answer: 1,
        explain: { en: '어른 (eoreun) = adult.', zh: '어른（eoreun）= 大人。' },
      },
      {
        q: { en: 'What does 견디다 mean?', zh: '견디다 是什么意思？' },
        options: [
          { en: 'to endure', zh: '忍耐' },
          { en: 'to laugh', zh: '笑' },
          { en: 'to run', zh: '跑' },
        ],
        answer: 0,
        explain: { en: '견디다 (gyeondida) = to endure.', zh: '견디다（gyeondida）= 忍耐。' },
      },
      {
        q: { en: '뿐이다 adds the meaning of…', zh: '뿐이다 补充的意思是……' },
        options: [
          { en: '“that is all, nothing more”', zh: '“仅此而已，没有别的”' },
          { en: '“let’s start”', zh: '“开始吧”' },
          { en: '“never”', zh: '“绝不”' },
        ],
        answer: 0,
        explain: { en: '뿐이다 = “that’s all”.', zh: '뿐이다 = “仅此而已”。' },
      },
    ],
  },

  {
    id: 4,
    drama: { en: 'Crash Landing on You', zh: '爱的迫降', kr: '사랑의 불시착' },
    year: 2019,
    category: 'romance',
    difficulty: 3,
    cover: 'https://aka.doubaocdn.com/s/j0wVOUgcue',
    scene: {
      en: 'At the military demarcation line, Ri Jeong-hyeok warns Yoon Se-ri — a warning that works as a metaphor for falling in love.',
      zh: '在军事分界线旁，李政赫警告尹世理——这句警告也是“爱上你”的隐喻。',
    },
    line: '이 선을 넘으면 너는 정말 위험해지는 거야.',
    roman: 'i seoneul neomeumyeon neoneun jeongmal wiheomhaejineun geoya.',
    translation: {
      en: 'If you cross this line, you will really be in danger.',
      zh: '越过这条线，你真的会变得很危险。',
    },
    words: [
      { kr: '이', roman: 'i', en: 'this', zh: '这' },
      { kr: '선', roman: 'seon', en: 'line, border', zh: '线、边界' },
      { kr: '넘다', roman: 'neomda', en: 'to cross', zh: '越过' },
      { kr: '정말', roman: 'jeongmal', en: 'really', zh: '真的' },
      { kr: '위험하다', roman: 'wiheomhada', en: 'dangerous', zh: '危险' },
    ],
    grammar: {
      title: { en: 'Conditional -으면 + -아/어지다', zh: '条件句 -으면 + -아/어지다' },
      tip: {
        en: '-으면 means “if/when”: 넘으면 = “if you cross”. -아/어지다 turns an adjective into a change of state: 위험하다 (dangerous) → 위험해지다 (to become dangerous). The final -거야 adds certainty.',
        zh: '-으면 表示“如果/当”：넘으면 = “如果越过”。-아/어지다 把形容词变成状态变化：위험하다（危险）→ 위험해지다（变得危险）。句尾 -거야 加强肯定语气。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 넘다 mean?', zh: '넘다 是什么意思？' },
        options: [
          { en: 'to cross', zh: '越过' },
          { en: 'to close', zh: '关闭' },
          { en: 'to ask', zh: '询问' },
        ],
        answer: 0,
        explain: { en: '넘다 (neomda) = to cross.', zh: '넘다（neomda）= 越过。' },
      },
      {
        q: { en: '위험해지다 means “to ___ dangerous”.', zh: '위험해지다 的意思是“变得___”。' },
        options: [
          { en: 'become', zh: '危险' },
          { en: 'avoid', zh: '避免' },
          { en: 'enjoy', zh: '享受' },
        ],
        answer: 0,
        explain: { en: '-아/어지다 expresses “to become”: 위험하다 → 위험해지다.', zh: '-아/어지다 表示“变得”：위험하다 → 위험해지다。' },
      },
      {
        q: { en: '-으면 expresses…', zh: '-으면 表示……' },
        options: [
          { en: 'a condition (“if”)', zh: '条件（“如果”）' },
          { en: 'a past event', zh: '过去的事件' },
          { en: 'an exclamation', zh: '感叹' },
        ],
        answer: 0,
        explain: { en: '-으면 = “if/when”.', zh: '-으면 = “如果/当……时”。' },
      },
    ],
  },

  {
    id: 5,
    drama: { en: 'Squid Game', zh: '鱿鱼游戏', kr: '오징어 게임' },
    year: 2021,
    category: 'thriller',
    difficulty: 1,
    cover: 'https://aka.doubaocdn.com/s/qGsJjbM7ii',
    scene: {
      en: 'The famous chant of the “Red Light, Green Light” game — a children’s game phrase that became unforgettable.',
      zh: '“一二三，木头人”游戏里的经典口令——一句童谣因这部戏而令人难忘。',
    },
    line: '무궁화 꽃이 피었습니다.',
    roman: 'mugunghwa kkochi pieotseumnida.',
    translation: {
      en: 'The hibiscus flower has bloomed.',
      zh: '木槿花开了。',
    },
    words: [
      { kr: '무궁화', roman: 'mugunghwa', en: 'rose of Sharon (Korea’s national flower)', zh: '无穷花（韩国国花）' },
      { kr: '꽃', roman: 'kkot', en: 'flower', zh: '花' },
      { kr: '피다', roman: 'pida', en: 'to bloom', zh: '开花' },
      { kr: '-습니다', roman: '-seumnida', en: 'formal polite ending', zh: '正式敬语终结词尾' },
    ],
    grammar: {
      title: { en: 'Formal past tense: -았/었습니다', zh: '正式敬语过去时：-았/었습니다' },
      tip: {
        en: '피다 (to bloom) → 피었습니다 (“has bloomed”): the formal polite past ending. In Korea this is a real children’s game chant — like “Red Light, Green Light”.',
        zh: '피다（开花）→ 피었습니다（“开了”）：正式敬语过去时结尾。在韩国这其实是真实的儿童游戏口令，相当于“一二三，木头人”。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 꽃 mean?', zh: '꽃 是什么意思？' },
        options: [
          { en: 'flower', zh: '花' },
          { en: 'tree', zh: '树' },
          { en: 'sky', zh: '天空' },
        ],
        answer: 0,
        explain: { en: '꽃 (kkot) = flower.', zh: '꽃（kkot）= 花。' },
      },
      {
        q: { en: '무궁화 is Korea’s…', zh: '무궁화 是韩国的……' },
        options: [
          { en: 'national flower', zh: '国花' },
          { en: 'national dish', zh: '国菜' },
          { en: 'national anthem', zh: '国歌' },
        ],
        answer: 0,
        explain: { en: '무궁화 (mugunghwa) = rose of Sharon, Korea’s national flower.', zh: '무궁화（mugunghwa）= 无穷花，韩国的国花。' },
      },
      {
        q: { en: 'What does 피다 mean?', zh: '피다 是什么意思？' },
        options: [
          { en: 'to bloom', zh: '开花' },
          { en: 'to fall', zh: '掉落' },
          { en: 'to fly', zh: '飞' },
        ],
        answer: 0,
        explain: { en: '피다 (pida) = to bloom.', zh: '피다（pida）= 开花。' },
      },
    ],
  },

  {
    id: 6,
    drama: { en: 'The Heirs', zh: '继承者们', kr: '상속자들' },
    year: 2013,
    category: 'youth',
    difficulty: 2,
    cover: 'https://aka.doubaocdn.com/s/HRbGJx5AJ9',
    scene: {
      en: 'Kim Tan finds Eun-sang sleeping somewhere she shouldn’t — and realises he wants to protect her.',
      zh: '金叹发现车恩尚睡在奇怪的地方——并意识到自己想守护她。',
    },
    line: '넌 왜 맨날 이런데서 자냐? 지켜주고 싶게.',
    roman: 'neon wae maennal ireondeseo janya? jikyeojugo sipge.',
    translation: {
      en: 'Why do you always sleep in places like this? It makes me want to protect you.',
      zh: '你为什么总在这种地方睡觉？让人想守护你。',
    },
    words: [
      { kr: '넌', roman: 'neon', en: 'you (casual)', zh: '你（半语）' },
      { kr: '왜', roman: 'wae', en: 'why', zh: '为什么' },
      { kr: '맨날', roman: 'maennal', en: 'always, every day', zh: '总是、每天' },
      { kr: '자다', roman: 'jada', en: 'to sleep', zh: '睡觉' },
      { kr: '지켜주다', roman: 'jikyeojuda', en: 'to protect (for someone)', zh: '守护（为某人）' },
    ],
    grammar: {
      title: { en: '-고 싶게: “makes me want to…”', zh: '-고 싶게：“让我想……”' },
      tip: {
        en: '지켜주고 싶다 = “I want to protect (you)”; -고 싶게 changes it into “(it) makes me want to protect you”. The extra 주다 in 지켜주다 adds “for someone’s sake”.',
        zh: '지켜주고 싶다 = “我想守护（你）”；-고 싶게 变成“（这）让我想守护你”。지켜주다 中多加的 주다 表示“为某人而做”。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 왜 mean?', zh: '왜 是什么意思？' },
        options: [
          { en: 'why', zh: '为什么' },
          { en: 'who', zh: '谁' },
          { en: 'where', zh: '哪里' },
        ],
        answer: 0,
        explain: { en: '왜 (wae) = why.', zh: '왜（wae）= 为什么。' },
      },
      {
        q: { en: 'What does 자다 mean?', zh: '자다 是什么意思？' },
        options: [
          { en: 'to sleep', zh: '睡觉' },
          { en: 'to eat', zh: '吃饭' },
          { en: 'to study', zh: '学习' },
        ],
        answer: 0,
        explain: { en: '자다 (jada) = to sleep.', zh: '자다（jada）= 睡觉。' },
      },
      {
        q: { en: '-고 싶다 expresses…', zh: '-고 싶다 表示……' },
        options: [
          { en: '“want to do”', zh: '“想要做”' },
          { en: '“must not do”', zh: '“禁止做”' },
          { en: '“finished doing”', zh: '“做完了”' },
        ],
        answer: 0,
        explain: { en: '-고 싶다 = want to do something.', zh: '-고 싶다 = 想要做某事。' },
      },
    ],
  },

  {
    id: 7,
    drama: { en: 'Hometown Cha-Cha-Cha', zh: '海岸村恰恰恰', kr: '갯마을 차차차' },
    year: 2021,
    category: 'healing',
    difficulty: 2,
    cover: 'https://aka.doubaocdn.com/s/TJ8aeOrfmH',
    scene: {
      en: 'A seaside confession: Hong Doo-sik gathers his courage and tells Yoon Hye-jin he likes her.',
      zh: '海边的告白：洪班长鼓起勇气，对尹惠珍说出“我喜欢你”。',
    },
    line: '용기 내서 말하는 건데, 나 너 좋아해.',
    roman: 'yonggi naeseo malhaneun geonde, na neo joahae.',
    translation: {
      en: 'I am being brave to say this — I like you.',
      zh: '我鼓起勇气说这句话——我喜欢你。',
    },
    words: [
      { kr: '용기', roman: 'yonggi', en: 'courage', zh: '勇气' },
      { kr: '내다', roman: 'naeda', en: 'to bring out', zh: '拿出' },
      { kr: '말하다', roman: 'malhada', en: 'to speak', zh: '说话' },
      { kr: '나', roman: 'na', en: 'I (casual)', zh: '我（半语）' },
      { kr: '너', roman: 'neo', en: 'you (casual)', zh: '你（半语）' },
      { kr: '좋아하다', roman: 'joahada', en: 'to like', zh: '喜欢' },
    ],
    grammar: {
      title: { en: '-아/어서 + -는데: “having mustered courage…”', zh: '-아/어서 + -는데：“鼓起勇气之后……”' },
      tip: {
        en: '용기 내서 = 용기를 내다 (to muster courage) + -아/어서 (“and so”). -는데 sets up the context before the main statement. 좋아해 is the casual form of 좋아해요 — direct and intimate.',
        zh: '용기 내서 = 용기를 내다（鼓起勇气）+ -아/어서（“然后/因而”）。-는데 先铺垫语境，再说主要内容。좋아해 是 좋아해요 的半语形式——直接又亲密。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 좋아하다 mean?', zh: '좋아하다 是什么意思？' },
        options: [
          { en: 'to like', zh: '喜欢' },
          { en: 'to hate', zh: '讨厌' },
          { en: 'to forget', zh: '忘记' },
        ],
        answer: 0,
        explain: { en: '좋아하다 (joahada) = to like.', zh: '좋아하다（joahada）= 喜欢。' },
      },
      {
        q: { en: 'What does 용기 mean?', zh: '용기 是什么意思？' },
        options: [
          { en: 'courage', zh: '勇气' },
          { en: 'hope', zh: '希望' },
          { en: 'luck', zh: '运气' },
        ],
        answer: 0,
        explain: { en: '용기 (yonggi) = courage.', zh: '용기（yonggi）= 勇气。' },
      },
      {
        q: { en: 'What does 말하다 mean?', zh: '말하다 是什么意思？' },
        options: [
          { en: 'to speak', zh: '说话' },
          { en: 'to sing', zh: '唱歌' },
          { en: 'to listen', zh: '听' },
        ],
        answer: 0,
        explain: { en: '말하다 (malhada) = to speak.', zh: '말하다（malhada）= 说话。' },
      },
    ],
  },

  {
    id: 8,
    drama: { en: 'Twenty-Five Twenty-One', zh: '二十五，二十一', kr: '스물다섯 스물하나' },
    year: 2022,
    category: 'youth',
    difficulty: 2,
    cover: 'https://aka.doubaocdn.com/s/y2R23zWC5B',
    scene: {
      en: 'After a defeat, Na Hee-do picks herself up: even if a dream fades, you can simply dream a new one.',
      zh: '输掉比赛后，罗希度重新振作：即使梦想消失，你也可以重新做一个梦。',
    },
    line: '꿈이 사라져도 괜찮아. 새로운 꿈을 꾸면 돼.',
    roman: 'kkumi sarajyeodo gwaenchana. saeroun kkumeul kkumyeon dwae.',
    translation: {
      en: 'It is okay if a dream disappears. You just dream a new one.',
      zh: '梦想消失了也没关系，做一个新的梦就好。',
    },
    words: [
      { kr: '꿈', roman: 'kkum', en: 'dream', zh: '梦、梦想' },
      { kr: '사라지다', roman: 'sarajida', en: 'to disappear', zh: '消失' },
      { kr: '괜찮다', roman: 'gwaenchanta', en: 'to be okay', zh: '没关系' },
      { kr: '새로운', roman: 'saeroun', en: 'new', zh: '新的' },
      { kr: '꾸다', roman: 'kkuda', en: 'to dream (a dream)', zh: '做梦' },
    ],
    grammar: {
      title: { en: '-아/어도 + -면 돼: “even if…, you just need to…”', zh: '-아/어도 + -면 돼：“即使……，只要……就行”' },
      tip: {
        en: '-아/어도 means “even if”: 사라져도 = “even if (it) disappears”. -면 돼 means “you just need to”: 꾸면 돼 = “you just need to dream”. 꿈을 꾸다 is the fixed collocation for “to dream a dream”.',
        zh: '-아/어도 表示“即使”：사라져도 = “即使（它）消失”。-면 돼 表示“只要……就行”：꾸면 돼 = “只要做个梦就行”。꿈을 꾸다 是“做梦”的固定搭配。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 꿈 mean?', zh: '꿈 是什么意思？' },
        options: [
          { en: 'dream', zh: '梦、梦想' },
          { en: 'song', zh: '歌曲' },
          { en: 'letter', zh: '信' },
        ],
        answer: 0,
        explain: { en: '꿈 (kkum) = dream.', zh: '꿈（kkum）= 梦、梦想。' },
      },
      {
        q: { en: 'What does 괜찮아 mean?', zh: '괜찮아 是什么意思？' },
        options: [
          { en: 'it is okay', zh: '没关系' },
          { en: 'it is over', zh: '结束了' },
          { en: 'it is wrong', zh: '错了' },
        ],
        answer: 0,
        explain: { en: '괜찮아 (gwaenchana) = it’s okay.', zh: '괜찮아（gwaenchana）= 没关系。' },
      },
      {
        q: { en: '-면 돼 means…', zh: '-면 돼 的意思是……' },
        options: [
          { en: '“you just need to…”', zh: '“只要……就行”' },
          { en: '“you must never…”', zh: '“绝不能……”' },
          { en: '“I wonder…”', zh: '“我很好奇……”' },
        ],
        answer: 0,
        explain: { en: '-면 돼 = “you just need to do X”.', zh: '-면 돼 = “只要做 X 就行”。' },
      },
    ],
  },
];

/* Convenience helpers */
const LESSON_BY_ID = {};
LESSONS.forEach((l) => { LESSON_BY_ID[l.id] = l; });

const CATEGORY_LABEL_KEY = {
  romance: 'course.filter.romance',
  healing: 'course.filter.healing',
  thriller: 'course.filter.thriller',
  youth: 'course.filter.youth',
  action: 'course.filter.action',
};

const DIFFICULTY_LABEL_KEY = {
  1: 'course.difficulty.1',
  2: 'course.difficulty.2',
  3: 'course.difficulty.3',
};
