/* ============================================================
   K-Drama Korean — wrong.js (wrong.html)
   The mistake book page: lists everything collected by
   wrongbook.js and runs a review session in which one correct
   answer masters a question (and it leaves the queue).
   ============================================================ */
'use strict';

const WRONG_XP_PER_QUESTION = 2;

const Wrong = {
  filter: 'pending',      /* all | pending | mastered */
  lessonId: 'all',
  review: null,           /* { queue, idx, total, correct, mastered, answered, done, options, answer } */
};

/* ---------------- Helpers ---------------- */
function wrongFmtDay(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return mm + '-' + dd;
}

function wrongItemsForView() {
  return getWrongItems().filter((it) => {
    if (Wrong.lessonId !== 'all' && Number(it.lessonId) !== Number(Wrong.lessonId)) return false;
    if (Wrong.filter === 'pending') return !it.mastered;
    if (Wrong.filter === 'mastered') return it.mastered;
    return true;
  });
}

/* ---------------- Stats / motto / toolbar ---------------- */
function renderWrongStats() {
  const grid = document.getElementById('wrongStats');
  if (!grid) return;
  const s = wrongBookStats();
  const tile = (mod, labelKey, value, subKey) =>
    '<div class="stat-tile' + mod + '">' +
    '<div class="stat-tile__label">' + Lang.t(labelKey) + '</div>' +
    '<div class="stat-tile__value">' + value + '</div>' +
    '<div class="stat-tile__sub">' + Lang.t(subKey) + '</div>' +
    '</div>';
  grid.innerHTML =
    tile('', 'wrong.stat.pending', s.pending, 'wrong.stat.pending.sub') +
    tile(' stat-tile--green', 'wrong.stat.mastered', s.mastered, 'wrong.stat.mastered.sub') +
    tile(' stat-tile--blue', 'wrong.stat.misses', s.misses, 'wrong.stat.misses.sub') +
    tile(' stat-tile--amber', 'wrong.stat.lessons', s.lessons, 'wrong.stat.lessons.sub');
}

function renderWrongMotto() {
  const el = document.getElementById('wrongMotto');
  if (!el) return;
  const s = wrongBookStats();
  if (s.total === 0) el.textContent = Lang.t('wrong.motto.empty');
  else if (s.pending > 0) el.textContent = Lang.t('wrong.motto.pending', { n: s.pending });
  else el.textContent = Lang.t('wrong.motto.mastered');
}

function renderWrongToolbar() {
  const s = wrongBookStats();
  const reviewBtn = document.getElementById('wrongReviewBtn');
  if (reviewBtn) {
    reviewBtn.disabled = s.pending === 0;
    reviewBtn.textContent = s.pending > 0
      ? Lang.t('wrong.review.start.count', { n: s.pending })
      : Lang.t('wrong.review.start');
  }
  const clearBtn = document.getElementById('wrongClearBtn');
  if (clearBtn) clearBtn.disabled = s.total === 0;
}

/* ---------------- Lesson filter ---------------- */
function renderWrongLessonFilter() {
  const sel = document.getElementById('wrongLessonSelect');
  if (!sel) return;
  const lang = Lang.current;
  const ids = [];
  getWrongItems().forEach((it) => { if (ids.indexOf(it.lessonId) === -1) ids.push(it.lessonId); });
  ids.sort((a, b) => a - b);
  if (Wrong.lessonId !== 'all' && ids.indexOf(Number(Wrong.lessonId)) === -1) Wrong.lessonId = 'all';
  sel.innerHTML =
    '<option value="all">' + Lang.t('wrong.filter.lesson.all') + '</option>' +
    ids.map((id) =>
      '<option value="' + id + '">' + escapeHtml(LESSON_BY_ID[id].drama[lang]) + '</option>'
    ).join('');
  sel.value = String(Wrong.lessonId);
}

/* ---------------- Collected question list ---------------- */
function wrongItemHtml(item) {
  const lesson = LESSON_BY_ID[item.lessonId];
  const q = getWrongQuestion(item);
  if (!lesson || !q) return '';

  const typeKey = item.type === 'quiz' ? 'wrong.type.quiz' : 'wrong.type.guess';
  const meta = Lang.t('wrong.meta.wrong', { n: item.wrongCount }) +
    (item.lastWrongAt ? ' · ' + Lang.t('wrong.meta.last', { d: wrongFmtDay(item.lastWrongAt) }) : '');

  let body = '';
  if (item.type === 'quiz') {
    body =
      '<p class="wrong-item__q">' + escapeHtml(q.prompt) + '</p>' +
      '<div class="wrong-options">' +
      q.options.map((opt, i) => {
        let cls = 'wrong-opt';
        let tag = '';
        if (i === q.answer) { cls += ' is-correct'; tag = Lang.t('wrong.answer'); }
        else if (item.lastChosen === i) { cls += ' is-wrong'; tag = Lang.t('wrong.yourAnswer'); }
        return '<div class="' + cls + '">' + escapeHtml(opt) +
          (tag ? '<span class="wrong-opt__tag">' + tag + '</span>' : '') + '</div>';
      }).join('') +
      '</div>' +
      (q.explain ? '<p class="wrong-item__explain">' + escapeHtml(q.explain) + '</p>' : '');
  } else {
    body =
      '<p class="subtitle-bar subtitle-bar--sm wrong-item__line">' + escapeHtml(q.korean) + '</p>' +
      '<div class="wrong-options">' +
      '<div class="wrong-opt is-correct">' + escapeHtml(q.translation) +
      '<span class="wrong-opt__tag">' + Lang.t('wrong.answer') + '</span></div>' +
      '</div>' +
      '<p class="wrong-item__meta">' + escapeHtml(q.roman) + '</p>';
  }

  return (
    '<li class="wrong-item">' +
    '<div class="wrong-item__top">' +
    '<span class="badge ' + (item.type === 'quiz' ? 'badge--blue' : 'badge--pink') + '">' + Lang.t(typeKey) + '</span>' +
    (item.mastered ? '<span class="badge badge--green">' + Lang.t('wrong.stat.mastered') + '</span>' : '') +
    '<span class="wrong-item__meta">' + escapeHtml(meta) + '</span>' +
    '</div>' +
    body +
    '<div class="wrong-item__actions">' +
    (item.mastered
      ? '<button type="button" class="btn btn--ghost btn--sm" data-act="reopen" data-lesson="' + item.lessonId + '" data-type="' + item.type + '" data-idx="' + item.idx + '">' + Lang.t('wrong.item.relearn') + '</button>'
      : '') +
    '<button type="button" class="btn btn--ghost btn--sm" data-act="remove" data-lesson="' + item.lessonId + '" data-type="' + item.type + '" data-idx="' + item.idx + '">' + Lang.t('wrong.item.remove') + '</button>' +
    '</div>' +
    '</li>'
  );
}

function renderWrongList() {
  const list = document.getElementById('wrongList');
  const empty = document.getElementById('wrongEmpty');
  if (!list) return;

  const items = wrongItemsForView();
  const total = getWrongItems().length;

  if (!items.length) {
    list.innerHTML = '';
    list.classList.add('hidden');
    if (empty) {
      empty.classList.remove('hidden');
      document.getElementById('wrongEmptyTitle').textContent =
        total ? Lang.t('wrong.empty.filtered.title') : Lang.t('wrong.empty.title');
      document.getElementById('wrongEmptyText').textContent =
        total ? Lang.t('wrong.empty.filtered') : Lang.t('wrong.empty.p');
      const cta = document.getElementById('wrongEmptyCta');
      if (cta) cta.classList.toggle('hidden', total > 0);
    }
    return;
  }

  list.classList.remove('hidden');
  if (empty) empty.classList.add('hidden');

  const lang = Lang.current;
  const order = [];
  const groups = {};
  items
    .slice()
    .sort((a, b) => (b.wrongCount - a.wrongCount) ||
      (Number(new Date(b.lastWrongAt || 0)) - Number(new Date(a.lastWrongAt || 0))))
    .forEach((it) => {
      if (!groups[it.lessonId]) { groups[it.lessonId] = []; order.push(it.lessonId); }
      groups[it.lessonId].push(it);
    });

  list.innerHTML = order.map((lessonId) => {
    const lesson = LESSON_BY_ID[lessonId];
    const other = lang === 'en' ? lesson.drama.zh : lesson.drama.en;
    const groupItems = groups[lessonId];
    return (
      '<article class="wrong-group">' +
      '<header class="wrong-group__head">' +
      '<span class="wrong-group__kr">' + escapeHtml(lesson.drama.kr) + '</span>' +
      '<h3 class="wrong-group__title">' + escapeHtml(lesson.drama[lang]) +
      ' <span class="text-muted">' + escapeHtml(other) + '</span></h3>' +
      '<span class="badge badge--pink">' + Lang.t('wrong.group.count', { n: groupItems.length }) + '</span>' +
      '<a class="btn btn--ghost btn--sm" href="learn.html?id=' + lesson.id + '">' + Lang.t('wrong.group.open') + '</a>' +
      '</header>' +
      '<ul class="wrong-items">' + groupItems.map(wrongItemHtml).join('') + '</ul>' +
      '</article>'
    );
  }).join('');
}

function renderWrongAll() {
  renderWrongStats();
  renderWrongMotto();
  renderWrongToolbar();
  renderWrongLessonFilter();
  renderWrongList();
}

/* ---------------- Review session ---------------- */
function startWrongReview() {
  const queue = getWrongItems()
    .filter((it) => !it.mastered)
    .sort((a, b) => (b.wrongCount - a.wrongCount) ||
      (Number(new Date(b.lastWrongAt || 0)) - Number(new Date(a.lastWrongAt || 0))));
  if (!queue.length) {
    showToast(Lang.t('wrong.review.empty'));
    return;
  }
  Wrong.review = {
    queue: queue,
    idx: 0,
    total: queue.length,
    correct: 0,
    mastered: 0,
    answered: false,
    done: false,
    options: [],
    answer: -1,
    explain: '',
  };
  document.getElementById('reviewResult').classList.add('hidden');
  document.getElementById('reviewCard').classList.remove('hidden');
  document.getElementById('reviewSection').classList.remove('hidden');
  document.getElementById('reviewSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  renderReviewQuestion();
}

function renderReviewQuestion() {
  const r = Wrong.review;
  if (!r) return;
  const item = r.queue[r.idx];
  const lesson = LESSON_BY_ID[item.lessonId];
  const lang = Lang.current;
  r.answered = false;

  let questionText = '';
  let lineText = '';
  if (item.type === 'quiz') {
    const q = lesson.quiz[item.idx];
    r.options = q.options.map((o) => o[lang]);
    r.answer = q.answer;
    r.explain = q.explain ? q.explain[lang] : '';
    questionText = q.q[lang];
  } else {
    const built = buildWrongGuessOptions(lesson.id);
    r.options = built.options;
    r.answer = built.answer;
    r.explain = '';
    questionText = Lang.t('learn.guess.q');
    lineText = lesson.line;
  }

  document.getElementById('reviewTag').textContent =
    lesson.drama[lang] + ' · ' + Lang.t(item.type === 'quiz' ? 'wrong.type.quiz' : 'wrong.type.guess');
  document.getElementById('reviewCount').textContent =
    Lang.t('wrong.review.progress', { n: r.idx + 1, total: r.total });
  document.getElementById('reviewQuestion').textContent = questionText;

  const lineEl = document.getElementById('reviewLine');
  lineEl.textContent = lineText;
  lineEl.classList.toggle('hidden', !lineText);

  document.getElementById('reviewDots').innerHTML = r.queue.map((_, i) =>
    '<span class="quiz-dot' + (i < r.idx ? ' is-done' : i === r.idx ? ' is-current' : '') + '"></span>'
  ).join('');

  const wrap = document.getElementById('reviewOptions');
  wrap.innerHTML = '';
  r.options.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = text;
    btn.addEventListener('click', () => answerReviewOption(i));
    wrap.appendChild(btn);
  });

  const fb = document.getElementById('reviewFeedback');
  fb.textContent = '';
  fb.className = 'quiz-feedback';
  const nextBtn = document.getElementById('reviewNextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = r.idx + 1 < r.total ? Lang.t('wrong.review.next') : Lang.t('wrong.review.finish');
}

function answerReviewOption(choice) {
  const r = Wrong.review;
  if (!r || r.answered) return;
  const item = r.queue[r.idx];
  r.answered = true;

  const correct = choice === r.answer;
  document.querySelectorAll('#reviewOptions .quiz-option').forEach((b, i) => {
    b.disabled = true;
    if (i === r.answer) b.classList.add('is-correct');
    else if (i === choice) b.classList.add('is-wrong');
  });

  const fb = document.getElementById('reviewFeedback');
  if (correct) {
    r.correct += 1;
    r.mastered += 1;
    markWrongItemMastered(item.lessonId, item.type, item.idx);
    fb.textContent = Lang.t('wrong.review.correct');
    fb.className = 'quiz-feedback is-right';
  } else {
    recordWrongAnswer(item.lessonId, item.type, item.idx, choice);
    fb.textContent = Lang.t('wrong.review.wrong');
    fb.className = 'quiz-feedback is-wrong';
  }

  const nextBtn = document.getElementById('reviewNextBtn');
  nextBtn.disabled = false;
  nextBtn.textContent = r.idx + 1 < r.total ? Lang.t('wrong.review.next') : Lang.t('wrong.review.finish');
}

function nextReviewQuestion() {
  const r = Wrong.review;
  if (!r || !r.answered) return;
  if (r.idx + 1 < r.total) {
    r.idx += 1;
    renderReviewQuestion();
  } else {
    finishWrongReview();
  }
}

function renderReviewResult() {
  const r = Wrong.review;
  if (!r) return;
  const xp = r.mastered * WRONG_XP_PER_QUESTION;

  document.getElementById('reviewResultTitle').textContent = Lang.t('wrong.review.done.title');
  document.getElementById('reviewResultScore').textContent =
    Lang.t('wrong.review.done.score', { n: r.correct, total: r.total });
  document.getElementById('reviewResultMastered').textContent = r.mastered
    ? Lang.t('wrong.review.done.mastered', { n: r.mastered })
    : Lang.t('wrong.review.done.none');

  const xpEl = document.getElementById('reviewResultXp');
  xpEl.textContent = xp > 0 ? Lang.t('wrong.review.done.xp', { n: xp }) : '';
  xpEl.classList.toggle('hidden', xp === 0);

  const remaining = getWrongItems().filter((it) => !it.mastered).length;
  const actions = document.getElementById('reviewResultActions');
  actions.innerHTML =
    (remaining > 0
      ? '<button type="button" class="btn btn--primary" id="reviewAgainBtn">' +
        Lang.t('wrong.review.again') + ' (' + remaining + ')</button>'
      : '') +
    '<button type="button" class="btn btn--ghost" id="reviewBackBtn">' +
    Lang.t('wrong.review.back') + '</button>';

  const againBtn = document.getElementById('reviewAgainBtn');
  if (againBtn) againBtn.addEventListener('click', startWrongReview);
  const backBtn = document.getElementById('reviewBackBtn');
  if (backBtn) backBtn.addEventListener('click', exitWrongReview);
}

function finishWrongReview() {
  const r = Wrong.review;
  if (!r) return;
  r.done = true;
  r.answered = false;

  const xp = r.mastered * WRONG_XP_PER_QUESTION;
  if (xp > 0) {
    const progress = getProgress();
    progress.xp += xp;
    progress.level = levelFromXp(progress.xp);
    saveProgress(progress);
  }

  document.getElementById('reviewCard').classList.add('hidden');
  document.getElementById('reviewResult').classList.remove('hidden');
  renderReviewResult();
  renderWrongAll();
  showToast(Lang.t('toast.saved'));
}

function exitWrongReview() {
  Wrong.review = null;
  document.getElementById('reviewSection').classList.add('hidden');
  document.getElementById('reviewResult').classList.add('hidden');
  document.getElementById('reviewCard').classList.remove('hidden');
  renderWrongAll();
}

/* ---------------- Events ---------------- */
function onWrongListClick(e) {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const lessonId = Number(btn.getAttribute('data-lesson'));
  const type = btn.getAttribute('data-type');
  const idx = Number(btn.getAttribute('data-idx'));
  if (btn.getAttribute('data-act') === 'remove') {
    removeWrongItem(lessonId, type, idx);
    renderWrongAll();
    showToast(Lang.t('wrong.remove.done'));
  } else if (btn.getAttribute('data-act') === 'reopen') {
    reopenWrongItem(lessonId, type, idx);
    renderWrongAll();
    showToast(Lang.t('wrong.relearn.done'));
  }
}

function initWrong() {
  const chips = document.getElementById('wrongChips');
  if (chips) {
    chips.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        Wrong.filter = chip.getAttribute('data-filter');
        chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
        renderWrongList();
      });
    });
  }

  const sel = document.getElementById('wrongLessonSelect');
  if (sel) {
    sel.addEventListener('change', () => {
      Wrong.lessonId = sel.value;
      renderWrongList();
    });
  }

  const reviewBtn = document.getElementById('wrongReviewBtn');
  if (reviewBtn) reviewBtn.addEventListener('click', startWrongReview);

  const clearBtn = document.getElementById('wrongClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!getWrongItems().length) return;
      if (!window.confirm(Lang.t('wrong.clear.confirm'))) return;
      clearWrongBook();
      exitWrongReview();
      showToast(Lang.t('wrong.clear.done'));
    });
  }

  const list = document.getElementById('wrongList');
  if (list) list.addEventListener('click', onWrongListClick);

  const nextBtn = document.getElementById('reviewNextBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextReviewQuestion);

  const exitBtn = document.getElementById('reviewExitBtn');
  if (exitBtn) exitBtn.addEventListener('click', exitWrongReview);

  renderWrongAll();
}

document.addEventListener('DOMContentLoaded', initWrong);
document.addEventListener('langchange', () => {
  applyI18n();
  renderWrongAll();
  if (Wrong.review) {
    if (Wrong.review.done) renderReviewResult();
    else renderReviewQuestion();
  }
});
