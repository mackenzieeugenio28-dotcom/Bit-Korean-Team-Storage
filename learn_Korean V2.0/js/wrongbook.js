/* ============================================================
   K-Drama Korean — wrongbook.js
   Mistake-book data layer (used by learn.html + wrong.html).

   Every question a learner answers wrong is collected here:
     · type 'quiz'  → one of the three mini-quiz questions of a lesson
     · type 'guess' → the listening question of step 1
   A record is keyed by lesson + type + question index, so the
   same question is stored once, with a running "missed" count.

   Storage key: kdrama_wrong_<username> / kdrama_wrong_guest
   (same per-account isolation as the XP progress in main.js)

   Record shape:
   {
     lessonId: 3,
     type: 'quiz' | 'guess',
     idx: 0,                 // question index inside lesson.quiz
     wrongCount: 2,          // how often it was answered wrong
     rightCount: 0,          // correct answers given during review
     mastered: false,        // true → left the review queue
     firstWrongAt: ISO, lastWrongAt: ISO,
     lastChosen: 1 | null    // option index the learner picked
   }
   ============================================================ */
'use strict';

function wrongKey() {
  const user = getCurrentUser();
  return 'kdrama_wrong_' + (user ? user.username : 'guest');
}

function wrongItemKey(lessonId, type, idx) {
  return lessonId + ':' + type + ':' + idx;
}

/* All valid records of the current account (invalid ones are dropped). */
function getWrongItems() {
  let items = [];
  try {
    const raw = localStorage.getItem(wrongKey());
    const data = raw ? JSON.parse(raw) : null;
    if (data && Array.isArray(data.items)) items = data.items;
  } catch (e) {
    items = [];
  }
  return items
    .filter((it) => it && LESSON_BY_ID[it.lessonId] && (it.type === 'quiz' || it.type === 'guess'))
    .map((it) => ({
      lessonId: Number(it.lessonId),
      type: it.type,
      idx: Number(it.idx) || 0,
      wrongCount: Number(it.wrongCount) || 1,
      rightCount: Number(it.rightCount) || 0,
      mastered: !!it.mastered,
      firstWrongAt: it.firstWrongAt || it.lastWrongAt || null,
      lastWrongAt: it.lastWrongAt || it.firstWrongAt || null,
      lastChosen: typeof it.lastChosen === 'number' ? it.lastChosen : null,
    }));
}

function saveWrongItems(items) {
  try {
    localStorage.setItem(wrongKey(), JSON.stringify({ version: 1, items: items }));
  } catch (e) {
    showToast('localStorage unavailable — mistake book not saved.');
  }
}

function findWrongItem(items, lessonId, type, idx) {
  const key = wrongItemKey(lessonId, type, idx);
  return items.find((it) => wrongItemKey(it.lessonId, it.type, it.idx) === key) || null;
}

/* ---------- Write API (called from learn.js and wrong.js) ---------- */

/* A wrong answer: create the record or bump its miss counter.
   A question that was already mastered goes back into the queue. */
function recordWrongAnswer(lessonId, type, idx, chosen) {
  if (!LESSON_BY_ID[lessonId]) return;
  const items = getWrongItems();
  const now = new Date().toISOString();
  const found = findWrongItem(items, lessonId, type, idx);
  if (found) {
    found.wrongCount += 1;
    found.lastWrongAt = now;
    found.lastChosen = typeof chosen === 'number' ? chosen : null;
    found.mastered = false;
  } else {
    items.push({
      lessonId: Number(lessonId),
      type: type,
      idx: Number(idx) || 0,
      wrongCount: 1,
      rightCount: 0,
      mastered: false,
      firstWrongAt: now,
      lastWrongAt: now,
      lastChosen: typeof chosen === 'number' ? chosen : null,
    });
  }
  saveWrongItems(items);
}

/* A correct answer during a review session → the question is mastered
   and leaves the review queue (it stays visible under “mastered”). */
function markWrongItemMastered(lessonId, type, idx) {
  const items = getWrongItems();
  const found = findWrongItem(items, lessonId, type, idx);
  if (!found) return false;
  found.rightCount += 1;
  found.mastered = true;
  saveWrongItems(items);
  return true;
}

/* Mastered by mistake? Put the question back into the review queue. */
function reopenWrongItem(lessonId, type, idx) {
  const items = getWrongItems();
  const found = findWrongItem(items, lessonId, type, idx);
  if (!found) return false;
  found.mastered = false;
  saveWrongItems(items);
  return true;
}

function removeWrongItem(lessonId, type, idx) {
  const key = wrongItemKey(lessonId, type, idx);
  const items = getWrongItems().filter((it) => wrongItemKey(it.lessonId, it.type, it.idx) !== key);
  saveWrongItems(items);
}

function clearWrongBook() {
  saveWrongItems([]);
}

/* ---------- Read helpers ---------- */

function wrongBookStats() {
  const items = getWrongItems();
  const lessons = {};
  let pending = 0;
  let mastered = 0;
  let misses = 0;
  items.forEach((it) => {
    lessons[it.lessonId] = true;
    if (it.mastered) mastered += 1; else pending += 1;
    misses += it.wrongCount;
  });
  return {
    total: items.length,
    pending: pending,
    mastered: mastered,
    misses: misses,
    lessons: Object.keys(lessons).length,
  };
}

/* Question + options of one record, resolved for the current language.
   Returns null when the lesson/question no longer exists. */
function getWrongQuestion(item) {
  const lesson = LESSON_BY_ID[item.lessonId];
  if (!lesson) return null;
  const lang = Lang.current;
  if (item.type === 'quiz') {
    const q = lesson.quiz[item.idx];
    if (!q) return null;
    return {
      prompt: q.q[lang],
      options: q.options.map((o) => o[lang]),
      answer: q.answer,
      explain: q.explain ? q.explain[lang] : '',
      korean: '',
      roman: '',
    };
  }
  /* listening question of step 1: the line itself is the prompt */
  return {
    prompt: Lang.t('learn.guess.q'),
    options: [],
    answer: -1,
    explain: '',
    korean: lesson.line,
    roman: lesson.roman,
    translation: lesson.translation[lang],
  };
}

/* Options for a listening question: the lesson translation plus two
   other lessons' translations (never a duplicate of the answer). */
function buildWrongGuessOptions(lessonId) {
  const lang = Lang.current;
  const correct = LESSON_BY_ID[lessonId].translation[lang];
  const pool = [];
  LESSONS.forEach((l) => {
    if (l.id === lessonId) return;
    const text = l.translation[lang];
    if (text !== correct && pool.indexOf(text) === -1) pool.push(text);
  });
  /* keep the order random but stable for the current language */
  const picked = shuffle(pool).slice(0, 2);
  const options = shuffle([correct].concat(picked));
  return { options: options, answer: options.indexOf(correct) };
}
