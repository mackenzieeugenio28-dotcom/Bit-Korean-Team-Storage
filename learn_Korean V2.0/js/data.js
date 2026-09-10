/* ============================================================
   K-Drama Korean — data.js
   All lesson content is hard-coded here (docx requirement).
   Each lesson: id, drama meta, line, romanisation, word
   breakdown, one grammar point, and a 3-question quiz.
   ============================================================ */
'use strict';

const LESSONS = [
  {
    id: 1,
    drama: { en: 'Goblin', zh: '鬼怪', kr: '도깨비' },
    year: 2016,
    category: 'romance',
    difficulty: 2,
    cover: 'images/material/课程照片/鬼怪.jpg',
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
    drama: { en: 'Hangul Basics', zh: '韩语字母', kr: '한글' },
    year: 1443,
    category: 'basics',
    difficulty: 1,
    cover: 'images/material/读韩语.png',
    video: 'media/korean letters.mp4',
    scene: {
      en: 'No drama scene this time — a short alphabet video instead. Meet the 24 basic Hangul letters and the sounds they make.',
      zh: '这一课没有剧集场景，而是一段字母表视频：认识 24 个基本韩文字母和它们的发音。',
    },
    line: '한글을 배워요.',
    roman: 'hangeureul baewoyo.',
    translation: {
      en: 'I am learning Hangul.',
      zh: '我在学韩语字母。',
    },
    words: [
      { kr: '한글', roman: 'hangeul', en: 'the Korean alphabet', zh: '韩语字母' },
      { kr: '배우다', roman: 'baewuda', en: 'to learn', zh: '学习' },
      { kr: '을', roman: 'eul', en: 'object particle (after a consonant)', zh: '宾格助词（用于辅音后）' },
      { kr: 'ㄱ', roman: 'g/k', en: 'consonant giyeok', zh: '辅音ㄱ（기역）' },
      { kr: 'ㅏ', roman: 'a', en: 'vowel ㅏ', zh: '元音ㅏ' },
    ],
    grammar: {
      title: { en: 'Syllable blocks: initial + vowel (+ final)', zh: '音节块：初声 + 中声（+ 终声）' },
      tip: {
        en: 'Every Korean syllable is a block: a consonant (초성), then a vowel (중성), then optionally a final consonant (종성). 한 is ㅎ + ㅏ + ㄴ — read h + a + n. Consonants imitate the shape of the mouth when the sound is made; vowels are built from the strokes ·, ㅡ and ㅣ.',
        zh: '每个韩语音节都是一个方块：初声辅音（초성）→ 中声元音（중성）→ 可选的终声（종성）。한 = ㅎ + ㅏ + ㄴ，读作 h + a + n。辅音的形状摹仿发音时的口型，元音则由「·、ㅡ、ㅣ」三个基本笔画组合而成。',
      },
    },
    quiz: [
      {
        q: { en: 'How many basic letters does Hangul have?', zh: '韩语字母一共有多少个基本字母？' },
        options: [
          { en: '24 (14 consonants + 10 vowels)', zh: '24 个（14 辅音 + 10 元音）' },
          { en: '14', zh: '14 个' },
          { en: '10', zh: '10 个' },
        ],
        answer: 0,
        explain: { en: '14 basic consonants plus 10 basic vowels = 24 letters.', zh: '14 个基本辅音加上 10 个基本元音，共 24 个字母。' },
      },
      {
        q: { en: 'Which letters make up 한?', zh: '「한」由哪些字母组成？' },
        options: [
          { en: 'ㅎ + ㅏ + ㄴ', zh: 'ㅎ + ㅏ + ㄴ' },
          { en: 'ㄱ + ㅏ + ㄴ', zh: 'ㄱ + ㅏ + ㄴ' },
          { en: 'ㅎ + ㅓ + ㄴ', zh: 'ㅎ + ㅓ + ㄴ' },
        ],
        answer: 0,
        explain: { en: '한 = initial ㅎ + vowel ㅏ + final ㄴ — a classic three-part syllable block.', zh: '한 = 初声ㅎ + 中声ㅏ + 终声ㄴ，是典型的三段式音节块。' },
      },
      {
        q: { en: 'How is Korean written?', zh: '韩语是怎么书写的？' },
        options: [
          { en: 'In syllable blocks, left to right and top to bottom', zh: '按音节块书写，从左到右、从上往下' },
          { en: 'In one long line per word', zh: '每个单词一长串连写' },
          { en: 'From right to left', zh: '从右往左书写' },
        ],
        answer: 0,
        explain: { en: 'Letters are stacked into square syllable blocks and read left to right, top to bottom.', zh: '字母叠成方块状音节，从左到右、从上往下阅读。' },
      },
    ],
  },

  {
    id: 3,
    drama: { en: 'Descendants of the Sun', zh: '太阳的后裔', kr: '태양의 후예' },
    year: 2016,
    category: 'action',
    difficulty: 1,
    cover: 'images/material/课程照片/太阳的后裔.webp',
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
    id: 4,
    drama: { en: 'Reply 1988', zh: '请回答1988', kr: '응답하라 1988' },
    year: 2015,
    category: 'healing',
    difficulty: 1,
    cover: 'images/material/课程照片/请回答1988.webp',
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
    id: 5,
    drama: { en: 'The Glory', zh: '黑暗荣耀', kr: '더 글로리' },
    year: 2022,
    category: 'thriller',
    difficulty: 3,
    cover: 'images/material/课程照片/黑暗荣耀.webp',
    scene: {
      en: 'The Glory (2022). Moon Dong-eun tells Joo Yeo-jeong that she needs no prince — what she wants is someone to dance the sword dance of revenge beside her.',
      zh: '《黑暗荣耀》（2022）名场面：文东恩对朱如炡说，她不需要王子——她要的是能陪她一起跳「行刑舞」的人。',
    },
    line: '난 왕자님은 필요 없어요. 나랑 같이 칼춤 춰줄 망나니가 필요하거든요.',
    roman: 'nan wangjanimeun pillyo eopseoyo. narang gachi kalchum chwojul mangnaniga pillyohageodeunyo.',
    translation: {
      en: 'I don’t need a prince. What I need is a thug to dance the sword dance with me.',
      zh: '我不需要王子。我需要的是能和我一起跳行刑舞的刽子手。',
    },
    words: [
      { kr: '왕자님', roman: 'wangjanim', en: 'prince (honorific)', zh: '王子（尊称）' },
      { kr: '필요 없다', roman: 'pillyo eopda', en: 'to be unnecessary', zh: '不需要' },
      { kr: '같이', roman: 'gachi', en: 'together', zh: '一起' },
      { kr: '칼춤', roman: 'kalchum', en: 'sword dance', zh: '刀舞、行刑舞' },
      { kr: '망나니', roman: 'mangnani', en: 'thug, rascal', zh: '混混、刽子手' },
    ],
    grammar: {
      title: { en: 'N은/는 필요 없다 + -거든요', zh: 'N은/는 필요 없다 + -거든요' },
      tip: {
        en: '필요 없다 means “to be unnecessary”: 왕자님은 필요 없어요 = “I don’t need a prince”. The topic marker 은/는 here replaces the object particle and pushes the unwanted thing to the front. -거든요 at the end of a sentence explains the reason for what you just said — it is the “because…” the listener is waiting for.',
        zh: '필요 없다 表示“不需要”：왕자님은 필요 없어요 = “我不需要王子”。这里用主题助词 은/는 代替宾格助词，把“不需要的东西”提到前面强调。句末的 -거든요 用来为前面的话补充理由，相当于“因为……（嘛）”，听的人会期待你继续解释。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 망나니 mean?', zh: '망나니 是什么意思？' },
        options: [
          { en: 'a thug, a rascal', zh: '混混、无赖' },
          { en: 'a king', zh: '国王' },
          { en: 'a teacher', zh: '老师' },
        ],
        answer: 0,
        explain: { en: '망나니 (mangnani) = a thug or rascal — in this line, the one who dances the sword dance.', zh: '망나니（mangnani）= 混混、无赖，剧中指“跳行刑舞的刽子手”。' },
      },
      {
        q: { en: '“왕자님은 필요 없어요.” means…', zh: '「왕자님은 필요 없어요.」的意思是……' },
        options: [
          { en: 'The prince needs me.', zh: '王子需要我。' },
          { en: 'I don’t need a prince.', zh: '我不需要王子。' },
          { en: 'Please call the prince.', zh: '请叫王子来。' },
        ],
        answer: 1,
        explain: { en: '필요 없다 = “to not need”. Together with 은/는, 왕자님 becomes the thing being set aside: “a prince? not needed”.', zh: '필요 없다 = “不需要”。加上 은/는 后，왕자님 成为被排除的对象：“王子？不需要”。' },
      },
      {
        q: { en: 'The ending -거든요 in this line…', zh: '句末的 -거든요 在本句中的作用是……' },
        options: [
          { en: 'marks the past tense', zh: '标记过去时' },
          { en: 'gives a command', zh: '表示命令' },
          { en: 'explains the reason (“because…”)', zh: '说明理由（“因为……”）' },
        ],
        answer: 2,
        explain: { en: '-거든요 gives the reason behind the statement — “because that is what I need”.', zh: '-거든요 为前面的话补充理由——“因为那才是我需要的”。' },
      },
    ],
  },

  {
    id: 6,
    drama: { en: 'Squid Game', zh: '鱿鱼游戏', kr: '오징어 게임' },
    year: 2021,
    category: 'thriller',
    difficulty: 1,
    cover: 'images/material/课程照片/鱿鱼游戏.jpg',
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
    id: 7,
    drama: { en: 'The Heirs', zh: '继承者们', kr: '상속자들' },
    year: 2013,
    category: 'youth',
    difficulty: 2,
    cover: 'images/material/课程照片/继承者们.webp',
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
    id: 8,
    drama: { en: 'Eve', zh: '夏娃', kr: '이브' },
    year: 2022,
    category: 'romance',
    difficulty: 2,
    cover: 'images/material/课程照片/夏娃image.jpg',
    scene: {
      en: 'Eve (2022), episode 15. Kang Yoon-gyeom finally understands the pain he caused and tells Lee Ra-el that hatred and love can exist at the same time.',
      zh: '《夏娃》（2022）第 15 集：姜允谦终于明白自己造成的痛苦，对李罗艾说——恨意和爱意可以同时存在。',
    },
    line: '미움이 생겼다고 해서 사랑이 식은 건 아니잖아.',
    roman: 'miumi saenggyeotdago haeseo sarangi sigeun geon anijanha.',
    translation: {
      en: 'Just because hatred has appeared doesn’t mean the love has cooled.',
      zh: '就算心里生出了恨，也不代表这份爱就冷掉了。',
    },
    words: [
      { kr: '미움', roman: 'mium', en: 'hatred', zh: '恨、厌恶' },
      { kr: '생기다', roman: 'saenggida', en: 'to appear, to arise', zh: '产生、出现' },
      { kr: '사랑', roman: 'sarang', en: 'love', zh: '爱' },
      { kr: '식다', roman: 'sikda', en: 'to cool down', zh: '冷却、变凉' },
      { kr: '아니잖아', roman: 'anijanha', en: '“it isn’t…, you know”', zh: '“不是……嘛”（求认同的语气）' },
    ],
    grammar: {
      title: { en: '-다고 해서 … -은 건 아니잖아: “just because X, it doesn’t mean Y”', zh: '-다고 해서 … -은 건 아니잖아：“不能因为 X 就说 Y”' },
      tip: {
        en: '-다고 해서 quotes a reason and then denies the conclusion drawn from it: 미움이 생겼다고 해서 = “just because hatred appeared, that does not mean…”. 사랑이 식은 건 아니잖아 is 사랑이 식은 것은 아니다 (“it is not that the love has cooled”) plus -잖아, an ending that invites the listener to agree — “you know that, right?”',
        zh: '-다고 해서 先引出一个理由，再否定由此推出的结论：미움이 생겼다고 해서 = “不能因为心里生出了恨，就说……”。사랑이 식은 건 아니잖아 = 사랑이 식은 것은 아니다（并不是爱冷却了）+ -잖아，句尾带有“你也知道的吧”这种向对方求认同的语气。',
      },
    },
    quiz: [
      {
        q: { en: 'What does 식다 mean?', zh: '식다 是什么意思？' },
        options: [
          { en: 'to cool down', zh: '冷却、变凉' },
          { en: 'to get hotter', zh: '变热' },
          { en: 'to get sweeter', zh: '变甜' },
        ],
        answer: 0,
        explain: { en: '식다 (sikda) = to cool down — used for food, weather, and also for feelings that fade.', zh: '식다（sikda）= 冷却。可指食物、天气变凉，也常用来形容感情冷却。' },
      },
      {
        q: { en: '“사랑이 식은 건 아니잖아.” means…', zh: '「사랑이 식은 건 아니잖아.」的意思是……' },
        options: [
          { en: 'The love is completely gone.', zh: '爱已经完全消失了。' },
          { en: 'It is not that the love has cooled.', zh: '并不是爱冷却了。' },
          { en: 'Please love me again.', zh: '请再爱我一次。' },
        ],
        answer: 1,
        explain: { en: '식은 건 아니야 = “it is not that (it) has cooled”: -은 것은 아니다 denies the statement, and -잖아 asks the listener to agree.', zh: '식은 건 아니야 = “并不是（它）冷却了”：-은 것은 아니다 用来否定，-잖아 则请对方认同。' },
      },
      {
        q: { en: 'The ending -잖아 in this line…', zh: '句末的 -잖아 在本句中的作用是……' },
        options: [
          { en: 'marks the past tense', zh: '标记过去时' },
          { en: 'gives a command', zh: '表示命令' },
          { en: 'appeals for the listener’s agreement', zh: '向对方寻求认同（“你也是知道的吧”）' },
        ],
        answer: 2,
        explain: { en: '-잖아 is added when the speaker assumes the listener already knows or will agree.', zh: '-잖아 用在说话人认为对方本来就知道、或会认同的时候。' },
      },
    ],
  },

  {
    id: 9,
    drama: { en: 'Twenty-Five Twenty-One', zh: '二十五，二十一', kr: '스물다섯 스물하나' },
    year: 2022,
    category: 'youth',
    difficulty: 2,
    cover: 'images/material/课程照片/二十五，二十一.webp',
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
  basics: 'course.filter.basics',
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
