/* ============================================================
   K-Drama Korean — home.js (index.html)
   Renders the progress dashboard and featured course cards.
   ============================================================ */
'use strict';

/* ============================================================
   Header music disc (home only).
   Plays a hidden <audio> element → media/Stay wiht me音乐.mp3.
   Swap the file in media/ to change the track, no code edits.
   ============================================================ */
const HomeMusic = { playing: true };

function homeMusicStart() {
  const audio = document.getElementById('bgMusic');
  if (!audio || !audio.src) return;
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});
  HomeMusic.playing = true;
  syncHomeMusicUi();
}

function homeMusicStop() {
  const audio = document.getElementById('bgMusic');
  if (audio) audio.pause();
  HomeMusic.playing = false;
  syncHomeMusicUi();
}

function syncHomeMusicUi() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;
  const key = HomeMusic.playing ? 'home.music.pause' : 'home.music.play';
  btn.classList.toggle('is-playing', HomeMusic.playing);
  btn.setAttribute('aria-pressed', HomeMusic.playing ? 'true' : 'false');
  btn.title = Lang.t(key);
  btn.setAttribute('aria-label', Lang.t(key));
}

function initHomeMusic() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  /* 默认开启：打开首页按钮即为“播放中”状态 */
  HomeMusic.playing = true;
  syncHomeMusicUi();

  btn.addEventListener('click', () => {
    if (HomeMusic.playing) homeMusicStop();
    else homeMusicStart();
  });

  /* 浏览器自动播放策略：无用户手势时 audio.play() 会被浏览器拦截。
     被拦截后，等用户第一次点击/按键页面任意处再自动补播。 */
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  const p = audio.play();
  if (p && p.catch) p.catch(() => {
    const resume = () => {
      if (audio.paused && HomeMusic.playing) {
        const p2 = audio.play();
        if (p2 && p2.catch) p2.catch(() => {});
      }
    };
    document.addEventListener('pointerdown', resume, { once: true });
    document.addEventListener('keydown', resume, { once: true });
  });
}

/* ============================================================
   Background music volume (#volumeRange next to #musicBtn).
   Remembered in localStorage → kdrama_volume (0–1).
   Note: iOS Safari ignores audio.volume — there the device
   volume keys are the only way to change loudness.
   ============================================================ */
const VOLUME_KEY = 'kdrama_volume';
const DEFAULT_VOLUME = 0.4;

function clampVolume(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return DEFAULT_VOLUME;
  return Math.min(Math.max(n, 0), 1);
}

function applySavedVolume() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  const saved = localStorage.getItem(VOLUME_KEY);
  audio.volume = saved === null ? DEFAULT_VOLUME : clampVolume(saved);
  const range = document.getElementById('volumeRange');
  if (range) range.value = String(audio.volume);
}

function syncVolumeLabel() {
  const range = document.getElementById('volumeRange');
  if (!range) return;
  const label = Lang.t('home.music.volume');
  range.setAttribute('aria-label', label);
  range.title = label;
}

function initVolumeControl() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  applySavedVolume();
  syncVolumeLabel();

  const range = document.getElementById('volumeRange');
  if (!range) return;
  range.addEventListener('input', () => {
    audio.volume = clampVolume(range.value);
    try {
      localStorage.setItem(VOLUME_KEY, String(audio.volume));
    } catch (e) { /* 隐私模式等场景静默失败 */ }
  });
}


/* ============================================================
   Hero line speaker (index.html hero section).
   Uses the browser's built-in Web Speech API — no audio file needed.
   Voice comes from the OS (Windows: "Microsoft Heami - Korean").
   If the browser has no Korean voice, the button is hidden.
   ============================================================ */
const HERO_KR_TEXT = '한국어를 배우자!';

function pickKoreanVoice() {
  const voices = window.speechSynthesis.getVoices() || [];
  let v = voices.find((x) => x.lang && x.lang.toLowerCase().indexOf('ko') === 0);
  if (!v) v = voices.find((x) => /korean|heami|yuna/i.test(x.name || ''));
  return v || null;
}

function stopHeroSpeaking() {
  const btn = document.getElementById('heroSpeakBtn');
  if (btn) {
    btn.classList.remove('is-speaking');
    btn.setAttribute('aria-pressed', 'false');
  }
}

function speakHeroLine() {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();

  const u = new SpeechSynthesisUtterance(HERO_KR_TEXT);
  u.lang = 'ko-KR';
  u.rate = 0.9;
  u.pitch = 1;
  const voice = pickKoreanVoice();
  if (voice) u.voice = voice;

  const btn = document.getElementById('heroSpeakBtn');
  const setState = (on) => {
    if (!btn) return;
    btn.classList.toggle('is-speaking', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  };
  u.onstart = () => setState(true);
  u.onend = () => setState(false);
  u.onerror = () => setState(false);
  synth.speak(u);
}

function initHeroSpeak() {
  const btn = document.getElementById('heroSpeakBtn');
  if (!btn) return;
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    btn.hidden = true; /* 浏览器不支持语音合成 → 隐藏按钮 */
    return;
  }
  btn.addEventListener('click', speakHeroLine);
  window.addEventListener('pagehide', stopHeroSpeaking);
}


/* ============================================================
   Hero background slideshow (index.html hero section).
   Put more files into images/material/课程照片/ and list them in
   HERO_SLIDES below — rotation + the two side buttons pick
   them up automatically (cross-fade every HERO_SLIDE_MS).
   ============================================================ */
const HERO_SLIDES = [
  'images/material/课程照片/鬼怪.jpg',
  'images/material/课程照片/太阳的后裔.webp',
  'images/material/课程照片/请回答1988.webp',
  'images/material/课程照片/黑暗荣耀.webp',
  'images/material/课程照片/鱿鱼游戏.jpg',
  'images/material/课程照片/继承者们.webp',
  'images/material/课程照片/夏娃image.jpg',
  'images/material/课程照片/二十五，二十一.webp'
];
const HERO_SLIDE_MS = 2000;

const HeroSlideshow = { index: 0, timer: null };

function stopHeroAutoplay() {
  if (HeroSlideshow.timer) {
    clearInterval(HeroSlideshow.timer);
    HeroSlideshow.timer = null;
  }
}

function showHeroSlide(n) {
  const wrap = document.getElementById('heroSlides');
  if (!wrap) return;
  const imgs = wrap.querySelectorAll('img');
  if (!imgs.length) return;
  HeroSlideshow.index = ((n % imgs.length) + imgs.length) % imgs.length;
  imgs.forEach((img, i) => img.classList.toggle('is-active', i === HeroSlideshow.index));
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  HeroSlideshow.timer = setInterval(() => showHeroSlide(HeroSlideshow.index + 1), HERO_SLIDE_MS);
}

/* 手动按一下 = 翻一张，并重新开始计时（不会马上又被自动切走） */
function heroSlideBy(delta) {
  showHeroSlide(HeroSlideshow.index + delta);
  startHeroAutoplay();
}

/* 按钮的提示文案跟随当前语言 */
function syncHeroNavLabels() {
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  if (prev) {
    prev.setAttribute('aria-label', Lang.t('home.hero.prev'));
    prev.title = Lang.t('home.hero.prev');
  }
  if (next) {
    next.setAttribute('aria-label', Lang.t('home.hero.next'));
    next.title = Lang.t('home.hero.next');
  }
}

function initHeroSlideshow() {
  const wrap = document.getElementById('heroSlides');
  if (!wrap) return;

  wrap.innerHTML = HERO_SLIDES
    .map((src, i) => '<img src="' + src + '" alt=""' + (i === 0 ? ' class="is-active"' : '') + '>')
    .join('');

  syncHeroNavLabels();

  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  if (prev) prev.addEventListener('click', () => heroSlideBy(-1));
  if (next) next.addEventListener('click', () => heroSlideBy(1));

  /* 标签页切到后台时暂停计时，回来再继续 */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopHeroAutoplay();
    else startHeroAutoplay();
  });

  startHeroAutoplay();
}


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
    '<div class="stat-card__value">' + p.completed.length + '<em> / ' + LESSONS.length + '</em></div><div class="stat-card__sub">' + Lang.t('course.learned', { n: p.completed.length, total: LESSONS.length }).replace('<', '&lt;') + '</div></div>';

  const empty = document.getElementById('statsEmpty');
  if (empty) empty.classList.toggle('hidden', hasProgress);

  const barWrap = document.getElementById('levelBarWrap');
  const barFill = document.getElementById('levelBarFill');
  const barNote = document.getElementById('levelBarNote');
  if (barWrap) barWrap.classList.remove('hidden');
  if (barFill) barFill.style.width = pct + '%';
  if (barNote) barNote.textContent = p.xp + ' / ' + nextLevelXp + ' XP · ' + (nextLevelXp - p.xp) + ' ' + Lang.t('home.stats.next');

  const resetWrap = document.getElementById('progressReset');
  if (resetWrap) resetWrap.classList.toggle('hidden', !hasProgress);
}

function renderFeatured() {
  const wrap = document.getElementById('featuredCourses');
  if (!wrap) return;
  wrap.innerHTML = LESSONS.slice(0, 3).map(courseCardHtml).join('');
}

/* 重置当前账号的进度与错题册（游客也能用，方便重新以新账号开始） */
function initResetProgress() {
  const btn = document.getElementById('resetProgressBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!window.confirm(Lang.t('home.reset.confirm'))) return;
    resetCurrentAccountData();
    showToast(Lang.t('home.reset.done'));
    setTimeout(() => window.location.reload(), 700);
  });
}

function initHome() {
  renderStats();
  renderFeatured();
  initVolumeControl(); /* 先恢复音量，再开始播放 */
  initHomeMusic();
  initHeroSpeak();
  initHeroSlideshow();
  initResetProgress();
}

document.addEventListener('DOMContentLoaded', initHome);
document.addEventListener('langchange', () => {
  renderStats();
  renderFeatured();
  syncHomeMusicUi();
  syncHeroNavLabels();
  syncVolumeLabel();
});
