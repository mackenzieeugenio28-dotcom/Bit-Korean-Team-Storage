/* ============================================================
   K-Drama Korean — home.js (index.html)
   Renders the progress dashboard and featured course cards.
   ============================================================ */
'use strict';

function courseCardHtml(lesson) {
  const p = getProgress();
  const done = p.completed.includes(lesson.id);
  const lang = Lang.current;
  const dramaName = lesson.drama[lang];
  const otherName = lang === 'en' ? lesson.drama.zh : lesson.drama.en;
  const startLabel = done ? Lang.t('course.review') : Lang.t('course.start');
  const diffLabel = Lang.t(DIFFICULTY_LABEL_KEY[lesson.difficulty]);

  return (
    '<article class="course-card">' +
    '<a class="course-card__media" href="learn.html?id=' + lesson.id + '">' +
    '<img src="' + lesson.cover + '" alt="' + escapeHtml(dramaName) + '" loading="lazy" width="1536" height="2048">' +
    '<span class="badge badge--dark course-card__diff">' + diffLabel + '</span>' +
    (done ? '<span class="course-card__done"><svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>' + Lang.t('course.completed') + '</span>' : '') +
    '</a>' +
    '<div class="course-card__body">' +
    '<div class="course-card__meta"><span class="course-card__kr">' + lesson.drama.kr + '</span><span class="course-card__year">' + lesson.year + '</span></div>' +
    '<h3 class="course-card__title">' + escapeHtml(dramaName) + ' <span class="course-card__title-zh">' + escapeHtml(otherName) + '</span></h3>' +
    '<p class="course-card__line">“' + lesson.line + '”<span class="course-card__line-roman">' + lesson.roman + '</span></p>' +
    '<div class="course-card__foot"><a class="btn btn--primary btn--sm" href="learn.html?id=' + lesson.id + '">' + startLabel + '</a></div>' +
    '</div></article>'
  );
}

function renderStats() {
  const p = getProgress();
  const grid = document.getElementById('statsGrid');
  if (!grid) return;
  const hasProgress = p.completed.length > 0 || p.xp > 0;
  const nextLevelXp = p.level * 100;
  const xpInLevel = p.xp % 100;
  const pct = Math.round((xpInLevel / 100) * 100);

  grid.innerHTML =
    '<div class="stat-card stat-card--pink"><div class="stat-card__label">' + Lang.t('home.stats.xp') + '</div>' +
    '<div class="stat-card__value">' + p.xp + '</div><div class="stat-card__sub">XP</div></div>' +
    '<div class="stat-card stat-card--blue"><div class="stat-card__label">' + Lang.t('home.stats.level') + '</div>' +
    '<div class="stat-card__value"><em>Lv.</em>' + p.level + '</div><div class="stat-card__sub">' + Lang.t('home.stats.next') + ': ' + nextLevelXp + ' XP</div></div>' +
    '<div class="stat-card stat-card--amber"><div class="stat-card__label">' + Lang.t('home.stats.streak') + '</div>' +
    '<div class="stat-card__value">' + p.streak + '<em> day' + (p.streak === 1 ? '' : 's') + '</em></div>' +
    '<div class="stat-card__sub"><svg class="svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3-1 4.5-1 6a2.6 2.6 0 0 0 5 .8c.9-1.6 1.3-2.9 1.3-4.3A8.7 8.7 0 0 1 20.7 13c0 4.8-3.9 8.7-8.7 8.7S3.3 17.8 3.3 13C3.3 7.8 7.7 4.6 12 2z"/></svg> ' + Lang.t('home.stats.streak') + '</div></div>' +
    '<div class="stat-card stat-card--green"><div class="stat-card__label">' + Lang.t('home.stats.done') + '</div>' +
    '<div class="stat-card__value">' + p.completed.length + '<em> / 8</em></div><div class="stat-card__sub">' + Lang.t('course.learned', { n: p.completed.length, total: LESSONS.length }).replace('<', '&lt;') + '</div></div>';

  const empty = document.getElementById('statsEmpty');
  if (empty) empty.classList.toggle('hidden', hasProgress);

  const barWrap = document.getElementById('levelBarWrap');
  const barFill = document.getElementById('levelBarFill');
  const barNote = document.getElementById('levelBarNote');
  if (barWrap) barWrap.classList.remove('hidden');
  if (barFill) barFill.style.width = pct + '%';
  if (barNote) barNote.textContent = p.xp + ' / ' + nextLevelXp + ' XP · ' + (nextLevelXp - p.xp) + ' ' + Lang.t('home.stats.next');
}

function renderFeatured() {
  const wrap = document.getElementById('featuredCourses');
  if (!wrap) return;
  wrap.innerHTML = LESSONS.slice(0, 3).map(courseCardHtml).join('');
}

function initHome() {
  renderStats();
  renderFeatured();
}

document.addEventListener('DOMContentLoaded', initHome);
document.addEventListener('langchange', () => {
  renderStats();
  renderFeatured();
});
