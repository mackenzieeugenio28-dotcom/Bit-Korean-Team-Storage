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

/* ---------- Progress (localStorage) ---------- */
const PROGRESS_KEY = 'kdrama_progress';

function defaultProgress() {
  return { xp: 0, level: 1, streak: 0, lastStudyDay: null, completed: [] };
}

function getProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
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
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    showToast('localStorage unavailable — progress not saved.');
  }
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

/* Record a finished lesson. Returns the updated progress. */
function recordLessonResult(lessonId, passed) {
  const progress = getProgress();
  if (!passed) return progress;
  if (!progress.completed.includes(lessonId)) progress.completed.push(lessonId);
  const today = todayKey();
  if (progress.lastStudyDay === today) {
    /* already studied today: only XP once per lesson completion is fine */
  } else if (progress.lastStudyDay === yesterdayKey()) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastStudyDay = today;
  progress.xp += 10;
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

function registerUser({ username, email, password, gender, interests }) {
  const users = getUsers();
  const exists = users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) return { ok: false, reason: 'taken' };
  users.push({
    username,
    email,
    password,
    gender: gender || '',
    interests: interests || [],
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);
  return { ok: true };
}

function loginUser(identifier, password) {
  const users = getUsers();
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
  );
  if (!user) return null;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.username, loggedInAt: Date.now() }));
  return user;
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    const user = getUsers().find((u) => u.username === session.username);
    return user ? { username: user.username, email: user.email, gender: user.gender, interests: user.interests } : null;
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
      });
    }
  } else {
    navAuth.innerHTML =
      '<a href="login.html" class="btn btn--ghost btn--sm" data-i18n="nav.login">Log in</a>' +
      '<a href="register.html" class="btn btn--primary btn--sm" data-i18n="nav.register">Sign up</a>';
    applyI18n();
  }
}
