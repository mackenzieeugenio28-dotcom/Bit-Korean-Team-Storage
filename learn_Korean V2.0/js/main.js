/* ============================================================
   K-Drama Korean — main.js
   Shared logic: language switch, mobile nav, localStorage
   progress (XP / level / streak / completed), demo accounts,
   toast helper. Loaded on every page.
   ============================================================ */
'use strict';

/* ---------- Language ---------- */
Lang.init();

/* ---------- Tiny helpers ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('is-show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('is-show'), 2600);
}

/* ---------- Header behaviour ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const lang = btn.getAttribute('data-lang');
    if (lang === Lang.current) btn.classList.add('is-active');
    btn.addEventListener('click', () => {
      Lang.set(lang);
      document.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
      });
      document.dispatchEvent(new CustomEvent('page:reflow', { detail: { lang } }));
    });
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });
    mainNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => mainNav.classList.remove('is-open'));
    });
  }

  // Highlight active page link
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach((a) => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Auth state in header
  updateNavAuth();

  // Cross-page flash toast (e.g. after registering / logging in)
  const flash = localStorage.getItem('kdrama_flash');
  if (flash) {
    localStorage.removeItem('kdrama_flash');
    setTimeout(() => showToast(Lang.t(flash)), 350);
  }
});

/* ---------- Progress (localStorage, per account) ---------- */
/* 进度按账号隔离：登录用户 → kdrama_progress_<用户名>；游客 → kdrama_progress_guest。
   旧版全局键 'kdrama_progress' 已弃用（不再读写，数据仍留在浏览器中可手动删除）。 */
function progressKey() {
  const user = getCurrentUser();
  return 'kdrama_progress_' + (user ? user.username : 'guest');
}

function defaultProgress() {
  return { xp: 0, level: 1, streak: 0, lastStudyDay: null, completed: [] };
}

function getProgress() {
  try {
    const raw = localStorage.getItem(progressKey());
    if (!raw) return defaultProgress();
    const data = JSON.parse(raw);
    return {
      xp: Number(data.xp) || 0,
      level: Number(data.level) || 1,
      streak: Number(data.streak) || 0,
      lastStudyDay: data.lastStudyDay || null,
      completed: Array.isArray(data.completed) ? data.completed : [],
    };
  } catch (e) {
    return defaultProgress();
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(progressKey(), JSON.stringify(progress));
  } catch (e) {
    showToast('localStorage unavailable — progress not saved.');
  }
}

/* 重置当前账号的本地数据：进度（XP/等级/连续天数/已完成）+ 错题册。
   键名与 wrongbook.js 的 wrongKey() 保持一致，这里直接拼键、不依赖该脚本。 */
function resetCurrentAccountData() {
  const user = getCurrentUser();
  const suffix = user ? user.username : 'guest';
  localStorage.removeItem('kdrama_progress_' + suffix);
  localStorage.removeItem('kdrama_wrong_' + suffix);
  localStorage.removeItem('kdrama_progress'); /* 旧版全局键，顺手清掉 */
}

function levelFromXp(xp) {
  return Math.floor(xp / 100) + 1;
}

function todayKey() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + mm + '-' + dd;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + mm + '-' + dd;
}

/* Record a finished lesson. Returns the updated progress.
   首次通过才发 XP；同一课重复练习只刷连续天数，不再重复加分。 */
function recordLessonResult(lessonId, passed) {
  const progress = getProgress();
  if (!passed) return progress;
  const firstTime = !progress.completed.includes(lessonId);
  if (firstTime) progress.completed.push(lessonId);
  const today = todayKey();
  if (progress.lastStudyDay === today) {
    /* 今天已经学过：连续天数不再累加 */
  } else if (progress.lastStudyDay === yesterdayKey()) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastStudyDay = today;
  if (firstTime) progress.xp += 10;
  progress.level = levelFromXp(progress.xp);
  saveProgress(progress);
  return progress;
}

/* ---------- Demo accounts ---------- */
const USERS_KEY = 'kdrama_users';
const SESSION_KEY = 'kdrama_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser({ username, email, password }) {
  const users = getUsers();
  const exists = users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) return { ok: false, reason: 'taken' };
  users.push({
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);
  return { ok: true };
}

/* 会话存哪里由「记住我」决定：勾选 → localStorage（关掉浏览器仍保持登录）；
   不勾选 → sessionStorage（关闭浏览器即退出登录）。 */
function saveSession(session, remember) {
  try {
    if (remember) {
      localStorage.setItem(SESSION_KEY, session);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, session);
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    try { localStorage.setItem(SESSION_KEY, session); } catch (e2) { /* storage unavailable */ }
  }
}

function loginUser(identifier, password, remember = true) {
  const users = getUsers();
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
  );
  if (!user) return null;
  saveSession(JSON.stringify({ username: user.username, loggedInAt: Date.now() }), remember);
  return user;
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    const user = getUsers().find((u) => u.username === session.username);
    return user ? { username: user.username, email: user.email } : null;
  } catch (e) {
    return null;
  }
}

/* Render the right auth widget in the header */
function updateNavAuth() {
  const navAuth = document.getElementById('navAuth');
  if (!navAuth) return;
  const user = getCurrentUser();
  if (user) {
    navAuth.innerHTML =
      '<span class="nav-user" title="' + escapeHtml(user.username) + '">' +
      '<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/></svg>' +
      '<span>' + escapeHtml(user.username) + '</span></span>' +
      '<button type="button" class="btn btn--ghost btn--sm" id="logoutBtn" data-i18n="nav.logout">Log out</button>';
    const logoutBtn = navAuth.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.textContent = Lang.t('nav.logout');
      logoutBtn.addEventListener('click', () => {
        logoutUser();
        showToast(Lang.t('nav.logout') + ' ✓');
        updateNavAuth();
        /* 进度按账号隔离，退出后需重载以切换到游客进度 */
        setTimeout(() => window.location.reload(), 600);
      });
    }
  } else {
    navAuth.innerHTML =
      '<a href="login.html" class="btn btn--ghost btn--sm" data-i18n="nav.login">Log in</a>' +
      '<a href="register.html" class="btn btn--primary btn--sm" data-i18n="nav.register">Sign up</a>';
    applyI18n();
  }
}
