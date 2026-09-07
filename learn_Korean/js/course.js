/* ============================================================
   K-Drama Korean — course.js (course.html)
   Renders the full lesson grid, search and category filtering.
   ============================================================ */
'use strict';

const CourseState = { cat: 'all', query: '' };

function courseCardFullHtml(lesson) {
  const p = getProgress();
  const done = p.completed.includes(lesson.id);
  const lang = Lang.current;
  const dramaName = lesson.drama[lang];
  const otherName = lang === 'en' ? lesson.drama.zh : lesson.drama.en;
  const startLabel = done ? Lang.t('course.review') : Lang.t('course.start');
  const diffLabel = Lang.t(DIFFICULTY_LABEL_KEY[lesson.difficulty]);
  const catLabel = Lang.t(CATEGORY_LABEL_KEY[lesson.category]);

  return (
    '<article class="course-card">' +
    '<a class="course-card__media" href="learn.html?id=' + lesson.id + '">' +
    '<img src="' + lesson.cover + '" alt="' + escapeHtml(dramaName) + '" loading="lazy" width="1536" height="2048">' +
    '<span class="badge badge--dark course-card__diff">' + diffLabel + '</span>' +
    (done ? '<span class="course-card__done"><svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>' + Lang.t('course.completed') + '</span>' : '') +
    '</a>' +
    '<div class="course-card__body">' +
    '<div class="course-card__meta">' +
    '<span class="course-card__kr">' + lesson.drama.kr + '</span>' +
    '<span class="badge badge--blue">' + catLabel + '</span>' +
    '</div>' +
    '<h3 class="course-card__title">' + escapeHtml(dramaName) + ' <span class="course-card__title-zh">' + escapeHtml(otherName) + '</span></h3>' +
    '<p class="course-card__scene">' + escapeHtml(lesson.scene[lang]) + '</p>' +
    '<p class="course-card__line">“' + lesson.line + '”<span class="course-card__line-roman">' + lesson.roman + '</span></p>' +
    '<div class="course-card__foot"><a class="btn ' + (done ? 'btn--blue' : 'btn--primary') + ' btn--sm" href="learn.html?id=' + lesson.id + '">' + startLabel + '</a></div>' +
    '</div></article>'
  );
}

function renderCourses() {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;
  const q = CourseState.query.trim().toLowerCase();
  const list = LESSONS.filter((l) => {
    if (CourseState.cat !== 'all' && l.category !== CourseState.cat) return false;
    if (!q) return true;
    const hay = (l.drama.en + ' ' + l.drama.zh + ' ' + l.drama.kr + ' ' + l.line + ' ' + l.roman + ' ' + l.translation[Lang.current]).toLowerCase();
    return hay.includes(q);
  });
  grid.innerHTML = list.map(courseCardFullHtml).join('');
  const empty = document.getElementById('courseEmpty');
  if (empty) empty.classList.toggle('hidden', list.length > 0);

  /* progress summary line */
  const p = getProgress();
  const line = document.getElementById('courseProgressLine');
  if (line) {
    line.textContent = Lang.t('course.learned', { n: p.completed.length, total: LESSONS.length });
  }
}

function initCourse() {
  const search = document.getElementById('courseSearch');
  if (search) {
    search.addEventListener('input', () => {
      CourseState.query = search.value;
      renderCourses();
    });
  }
  const chips = document.getElementById('filterChips');
  if (chips) {
    chips.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        CourseState.cat = chip.getAttribute('data-cat');
        chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
        renderCourses();
      });
    });
  }
  renderCourses();
}

document.addEventListener('DOMContentLoaded', initCourse);
document.addEventListener('langchange', () => {
  applyI18n();
  renderCourses();
});
