/* ============================================================
   K-Drama Korean — learn.js (learn.html)
   The four-step learning flow: listen & guess → breakdown →
   words & grammar → mini quiz, with localStorage rewards.
   ============================================================ */
'use strict';

const Learn = {
  lesson: null,
  step: 1,
  stepDone: { 1: false, 2: false, 3: false },
  playTimer: null,
  guess: { selected: -1, answered: false, correct: false },
  quiz: { idx: 0, score: 0, selected: -1, answered: false, finished: false, passed: null },
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* ---------------- Header ---------------- */
function renderLessonHeader() {
  const l = Learn.lesson;
  const lang = Lang.current;
  const other = lang === 'en' ? l.drama.zh : l.drama.en;
  const p = getProgress();
  const done = p.completed.includes(l.id);
  document.title = l.drama[lang] + ' — K-Drama Korean';
  document.getElementById('lessonKicker').textContent = l.drama.kr + ' · ' + l.year + ' · ' + Lang.t(CATEGORY_LABEL_KEY[l.category]);
  document.getElementById('lessonTitle').textContent = l.drama[lang];
  document.getElementById('lessonScene').textContent = l.scene[lang];
  document.getElementById('lessonMeta').innerHTML =
    '<span class="badge badge--dark">' + Lang.t(DIFFICULTY_LABEL_KEY[l.difficulty]) + '</span>' +
    '<span class="badge badge--blue">' + Lang.t(CATEGORY_LABEL_KEY[l.category]) + '</span>' +
    (done ? '<span class="badge badge--green">' + Lang.t('course.completed') + '</span>' : '') +
    '<span class="badge badge--pink">' + l.drama[other] + '</span>';
  document.getElementById('lessonCover').innerHTML =
    '<img src="' + l.cover + '" alt="' + escapeHtml(l.drama[lang]) + '" width="1536" height="2048">';
}

/* ---------------- Stepper ---------------- */
function renderStepper() {
  document.querySelectorAll('.stepper__item').forEach((item) => {
    const n = Number(item.getAttribute('data-step'));
    item.classList.toggle('is-active', n === Learn.step);
    item.classList.toggle('is-done', n < Learn.step);
    const btn = item.querySelector('.stepper__btn');
    const unlock = n <= Learn.step || Learn.stepDone[n - 1];
    btn.disabled = !unlock;
    btn.setAttribute('aria-disabled', unlock ? 'false' : 'true');
  });
  /* update step labels (they carry data-i18n with {n}) */
  document.querySelectorAll('[data-i18n="learn.step"]').forEach((el) => {
    el.textContent = Lang.t('learn.step', { n: Learn.step });
  });
}

/* ---------------- Step 1 ---------------- */
function buildGuessOptions() {
  const l = Learn.lesson;
  const correct = l.translation[Lang.current];
  const others = shuffle(LESSONS.filter((x) => x.id !== l.id)).slice(0, 2).map((x) => x.translation[Lang.current]);
  return shuffle([correct, ...others]);
}

function renderGuessOptions() {
  const l = Learn.lesson;
  const wrap = document.getElementById('guessOptions');
  const options = buildGuessOptions();
  wrap.innerHTML = '';
  options.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'guess-option' + (idx === Learn.guess.selected ? ' is-selected' : '');
    btn.textContent = text;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', idx === Learn.guess.selected ? 'true' : 'false');
    btn.addEventListener('click', () => {
      if (Learn.guess.answered) return;
      Learn.guess.selected = idx;
      document.querySelectorAll('.guess-option').forEach((b, i) => {
        b.classList.toggle('is-selected', i === idx);
        b.setAttribute('aria-checked', i === idx ? 'true' : 'false');
      });
      document.getElementById('guessCheckBtn').disabled = false;
    });
    wrap.appendChild(btn);
  });
}

function renderStep1() {
  const l = Learn.lesson;
  renderGuessOptions();
  const checkBtn = document.getElementById('guessCheckBtn');
  checkBtn.disabled = true;
  const fb = document.getElementById('guessFeedback');
  fb.textContent = '';
  fb.className = 'guess-feedback';
  const reveal = document.getElementById('revealBox');
  if (Learn.guess.answered) {
    /* keep revealed state visible */
    reveal.classList.remove('hidden');
    document.getElementById('revealKr').textContent = l.line;
    document.getElementById('revealRoman').textContent = l.roman;
    document.getElementById('revealTrans').textContent = '“' + l.translation[Lang.current] + '”';
    document.querySelectorAll('.guess-option').forEach((b) => b.disabled = true);
    fb.textContent = Learn.guess.correct ? Lang.t('learn.guess.right') : Lang.t('learn.guess.wrong');
    fb.classList.add(Learn.guess.correct ? 'is-right' : 'is-wrong');
    const correctText = l.translation[Lang.current];
    document.querySelectorAll('.guess-option').forEach((b) => {
      if (b.textContent === correctText) b.classList.add('is-correct');
      else if (b === document.querySelectorAll('.guess-option')[Learn.guess.selected]) b.classList.add('is-wrong');
    });
  } else {
    reveal.classList.add('hidden');
  }
}

function playLine() {
  if (Learn.playTimer) clearInterval(Learn.playTimer);
  const l = Learn.lesson;
  const romanEl = document.getElementById('listenRoman');
  const status = document.getElementById('listenStatus');
  const player = document.getElementById('mediaPlayer');
  const video = document.getElementById('lessonVideo');
  const playBtn = document.getElementById('playBtn');

  /* 有视频素材就用真实视频播放 */
  if (video.src) {
    romanEl.classList.add('hidden');
    player.classList.remove('hidden');
    status.textContent = Lang.t('learn.listening');
    playBtn.innerHTML =
      '<svg class="svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
      '<span>' + Lang.t('learn.play.again') + '</span>';
    video.play();
    video.addEventListener('ended', onVideoEnd, { once: true });
    return;
  }
  romanEl.classList.remove('hidden');
  romanEl.textContent = '';
  status.textContent = Lang.t('learn.listening');
  let i = 0;
  Learn.playTimer = setInterval(() => {
    i += 2;
    romanEl.textContent = l.roman.slice(0, i);
    if (i >= l.roman.length) {
      clearInterval(Learn.playTimer);
      Learn.playTimer = null;
      status.textContent = '';
      playBtn.innerHTML =
        '<svg class="svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
        '<span>' + Lang.t('learn.play.again') + '</span>';
      document.getElementById('guessBox').classList.remove('hidden');
    }
  }, 150);
}

function onVideoEnd() {
  document.getElementById('listenStatus').textContent = '';
  document.getElementById('guessBox').classList.remove('hidden');
}

function checkGuess() {
  const l = Learn.lesson;
  const correctText = l.translation[Lang.current];
  const fb = document.getElementById('guessFeedback');
  const opts = document.querySelectorAll('.guess-option');
  if (Learn.guess.selected < 0) return;
  Learn.guess.answered = true;
  const chosen = opts[Learn.guess.selected];
  Learn.guess.correct = chosen.textContent === correctText;
  /* 听力题答错也收进错题册（wrong.html） */
  if (!Learn.guess.correct && typeof recordWrongAnswer === 'function') recordWrongAnswer(l.id, 'guess', 0, null);
  opts.forEach((b) => b.disabled = true);
  opts.forEach((b) => {
    if (b.textContent === correctText) b.classList.add('is-correct');
    else if (b === chosen) b.classList.add('is-wrong');
  });
  fb.textContent = Learn.guess.correct ? Lang.t('learn.guess.right') : Lang.t('learn.guess.wrong');
  fb.classList.add(Learn.guess.correct ? 'is-right' : 'is-wrong');
  document.getElementById('revealBox').classList.remove('hidden');
  document.getElementById('revealKr').textContent = l.line;
  document.getElementById('revealRoman').textContent = l.roman;
  document.getElementById('revealTrans').textContent = '“' + correctText + '”';
  document.getElementById('guessCheckBtn').disabled = true;
  Learn.stepDone[1] = true;
  updateNavButtons();
}

/* ---------------- Step 2 ---------------- */
function renderStep2() {
  const l = Learn.lesson;
  document.getElementById('bdKr').textContent = l.line;
  document.getElementById('bdRoman').textContent = l.roman;
  document.getElementById('bdTrans').textContent = '“' + l.translation[Lang.current] + '”';
  const table = document.getElementById('wordTable');
  table.innerHTML =
    '<div class="word-table__head">' + Lang.t('learn.step2.word') + '</div>' +
    '<div class="word-table__head">Roman</div>' +
    '<div class="word-table__head">' + Lang.t('learn.step2.meaning') + '</div>' +
    l.words.map((w) =>
      '<div class="word-table__cell word-table__cell--kr">' + w.kr + '</div>' +
      '<div class="word-table__cell word-table__cell--roman">' + w.roman + '</div>' +
      '<div class="word-table__cell word-table__cell--meaning">' + escapeHtml(w[Lang.current]) + '</div>'
    ).join('');
}

/* ---------------- Step 3 ---------------- */
function renderStep3() {
  const l = Learn.lesson;
  const lang = Lang.current;
  document.getElementById('grammarCard').innerHTML =
    '<h3>' + escapeHtml(l.grammar.title[lang]) + '</h3>' +
    '<p>' + escapeHtml(l.grammar.tip[lang]) + '</p>';
  document.getElementById('vocabGrid').innerHTML = l.words.map((w) =>
    '<div class="vocab-card">' +
    '<div class="vocab-card__kr">' + w.kr + '</div>' +
    '<div class="vocab-card__roman">' + w.roman + '</div>' +
    '<div class="vocab-card__mean">' + escapeHtml(w[lang]) + '</div>' +
    '</div>'
  ).join('');
}

/* ---------------- Step 4 ---------------- */
function renderQuiz() {
  const l = Learn.lesson;
  const q = l.quiz[Learn.quiz.idx];
  document.getElementById('quizQuestion').textContent = q.q[Lang.current];
  const wrap = document.getElementById('quizOptions');
  wrap.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = opt[Lang.current];
    btn.addEventListener('click', () => selectQuizOption(idx));
    wrap.appendChild(btn);
  });
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = Learn.quiz.idx < 2 ? Lang.t('learn.next') : Lang.t('learn.finish');
  const dots = document.getElementById('quizDots');
  dots.innerHTML = l.quiz.map((_, i) =>
    '<span class="quiz-dot' +
    (i < Learn.quiz.idx ? ' is-done' : i === Learn.quiz.idx ? ' is-current' : '') +
    '"></span>'
  ).join('');
  /* 语言切换会重建选项按钮：本题若已作答，恢复反馈与按钮状态，
     否则「下一题」会卡在 disabled，已选答案的高亮也会消失。 */
  if (Learn.quiz.answered) {
    const right = Learn.quiz.selected === q.answer;
    document.querySelectorAll('.quiz-option').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('is-correct');
      else if (i === Learn.quiz.selected) b.classList.add('is-wrong');
    });
    const fb = document.getElementById('quizFeedback');
    fb.textContent = q.explain[Lang.current];
    fb.classList.add(right ? 'is-right' : 'is-wrong');
    nextBtn.disabled = false;
  }
}

function selectQuizOption(idx) {
  if (Learn.quiz.answered) return;
  const l = Learn.lesson;
  const q = l.quiz[Learn.quiz.idx];
  Learn.quiz.selected = idx;
  Learn.quiz.answered = true;
  const correct = idx === q.answer;
  if (correct) Learn.quiz.score += 1;
  else if (typeof recordWrongAnswer === 'function') recordWrongAnswer(l.id, 'quiz', Learn.quiz.idx, idx);
  const fb = document.getElementById('quizFeedback');
  fb.textContent = q.explain[Lang.current];
  fb.classList.add(correct ? 'is-right' : 'is-wrong');
  document.querySelectorAll('.quiz-option').forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('is-correct');
    else if (i === idx) b.classList.add('is-wrong');
  });
  document.getElementById('quizNextBtn').disabled = false;
}

function nextQuizQuestion() {
  Learn.quiz.selected = -1;
  Learn.quiz.answered = false;
  if (Learn.quiz.idx < 2) {
    Learn.quiz.idx += 1;
    renderQuiz();
  } else {
    finishQuiz();
  }
}

/* 结果区单独渲染：语言切换时也要重画文案与按钮（里面的 <a> 会被重建）。 */
function renderQuizResult() {
  const l = Learn.lesson;
  document.getElementById('quizResultTitle').textContent =
    Lang.t(Learn.quiz.passed ? 'learn.result.title.pass' : 'learn.result.title.fail');
  document.getElementById('quizResultScore').textContent = Lang.t('learn.result.score', { n: Learn.quiz.score });
  const xpEl = document.getElementById('quizResultXp');
  const actions = document.getElementById('quizResultActions');
  if (Learn.quiz.passed) {
    xpEl.textContent = Lang.t(Learn.quiz.firstTime ? 'learn.result.xp' : 'learn.result.xp.repeat');
    xpEl.classList.remove('text-muted');
    const next = LESSONS.find((x) => x.id > l.id) || null;
    actions.innerHTML =
      (next ? '<a class="btn btn--primary" href="learn.html?id=' + next.id + '">' + Lang.t('learn.result.next') + ' →</a>' : '') +
      '<a class="btn btn--ghost" href="course.html">' + Lang.t('learn.result.back') + '</a>';
    return;
  }
  xpEl.textContent = Lang.t('learn.result.xp.zero');
  xpEl.classList.add('text-muted');
  actions.innerHTML =
    '<button type="button" class="btn btn--primary" id="replayBtn">' + Lang.t('learn.result.replay') + '</button>' +
    '<a class="btn btn--ghost" href="course.html">' + Lang.t('learn.result.back') + '</a>';
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) replayBtn.addEventListener('click', () => {
    Learn.quiz = { idx: 0, score: 0, selected: -1, answered: false, finished: false, passed: null };
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizBox').classList.remove('hidden');
    renderQuiz();
  });
}

function finishQuiz() {
  const l = Learn.lesson;
  Learn.quiz.finished = true;
  Learn.quiz.passed = Learn.quiz.score >= 2;
  document.getElementById('quizBox').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  Learn.quiz.firstTime = false;
  if (Learn.quiz.passed) {
    Learn.quiz.firstTime = !getProgress().completed.includes(l.id);
    recordLessonResult(l.id, true);
  }
  renderQuizResult();
  showToast(Lang.t('toast.saved'));
}

/* ---------------- Navigation ---------------- */
function setStep(n) {
  if (n < 1 || n > 4) return;
  if (n > Learn.step && !Learn.stepDone[n - 1]) return;
  Learn.step = n;
  renderStepper();
  renderStep();
  updateNavButtons();
  scrollToStep(n);
}

/* 切换到某步骤后定位到该步骤面板的顶部，而不是整页最顶部；
   同时减去吸顶 header 的高度，避免内容被遮挡。 */
function scrollToStep(n) {
  const panel = document.getElementById('panel-' + n);
  if (!panel) return;
  const header = document.querySelector('.site-header');
  const offset = (header ? header.offsetHeight : 0) + 16;
  const top = panel.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

function renderStep() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('panel-' + i).classList.toggle('hidden', i !== Learn.step);
  }
  if (Learn.step === 1) renderStep1();
  else if (Learn.step === 2) renderStep2();
  else if (Learn.step === 3) renderStep3();
  else if (Learn.step === 4) renderQuiz();
}

function updateNavButtons() {
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  prev.disabled = Learn.step === 1;
  if (Learn.step < 4) {
    /* step 1 requires a finished guess; steps 2 & 3 are informational */
    next.disabled = Learn.step === 1 && !Learn.stepDone[1];
    next.textContent = Lang.t('learn.next');
  } else {
    next.textContent = Lang.t('learn.finish');
    next.disabled = Learn.quiz.finished;
  }
}

/* ---------------- Init ---------------- */
function initLearn() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  Learn.lesson = LESSON_BY_ID[id] || LESSONS[0];
  Learn.step = 1;
  Learn.stepDone = { 1: false, 2: false, 3: false };
  Learn.guess = { selected: -1, answered: false, correct: false };
  Learn.quiz = { idx: 0, score: 0, selected: -1, answered: false, finished: false, passed: null };

  renderLessonHeader();
  renderStepper();
  renderStep();
  updateNavButtons();

  /* 绑定视频素材（lesson.video 指向 media 下的 mp4） */
  const video = document.getElementById('lessonVideo');
  if (video) {
    if (Learn.lesson.video) {
      video.src = Learn.lesson.video;
    } else {
      video.removeAttribute('src');
    }
  }

  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', playLine);
  document.getElementById('guessCheckBtn').addEventListener('click', checkGuess);
  document.getElementById('quizNextBtn').addEventListener('click', nextQuizQuestion);

  document.getElementById('prevBtn').addEventListener('click', () => setStep(Learn.step - 1));
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (Learn.step < 4) {
      if (Learn.step === 1 && !Learn.stepDone[1]) return;
      if (Learn.step === 2) Learn.stepDone[2] = true;
      if (Learn.step === 3) Learn.stepDone[3] = true;
      setStep(Learn.step + 1);
    } else if (Learn.step === 4 && !Learn.quiz.finished) {
      nextQuizQuestion();
    }
  });

  document.querySelectorAll('.stepper__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const n = Number(btn.getAttribute('data-goto'));
      if (n > Learn.step && !Learn.stepDone[n - 1]) return;
      if (n === Learn.step) return;
      setStep(n);
    });
  });
}

document.addEventListener('DOMContentLoaded', initLearn);
document.addEventListener('langchange', () => {
  if (!Learn.lesson) return;
  applyI18n();
  renderLessonHeader();
  renderStepper();
  renderStep();
  updateNavButtons();
  if (Learn.quiz.finished) renderQuizResult();
});
