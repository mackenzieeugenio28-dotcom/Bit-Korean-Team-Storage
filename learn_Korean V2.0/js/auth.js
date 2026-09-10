/* ============================================================
   K-Drama Korean — auth.js (login.html / register.html)
   Demo validation: accounts live in localStorage only.
   ============================================================ */
'use strict';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(id, key) {
  const el = document.getElementById(id);
  if (el) el.textContent = Lang.t(key);
}

function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('loginId').value.trim();
    const passVal = document.getElementById('loginPass').value;
    if (!idVal || !passVal) {
      setError('loginError', 'login.err.missing');
      return;
    }
    const rememberEl = document.getElementById('loginRemember');
    const remember = rememberEl ? rememberEl.checked : true;
    const user = loginUser(idVal, passVal, remember);
    if (!user) {
      setError('loginError', 'login.err.notfound');
      return;
    }
    localStorage.setItem('kdrama_flash', 'login.ok');
    window.location.href = 'index.html';
  });

  const guest = document.querySelector('.auth-alt a[href="index.html"]');
  if (guest) {
    guest.addEventListener('click', () => {
      localStorage.setItem('kdrama_flash', 'login.guest.msg');
    });
  }
}

function initRegister() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUser').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;
    const pass2 = document.getElementById('regPass2').value;
    const terms = document.getElementById('regTerms').checked;

    if (!username || !email || !pass || !pass2) {
      setError('regError', 'register.err.fill');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('regError', 'register.err.email');
      return;
    }
    if (pass.length < 6) {
      setError('regError', 'register.err.passlen');
      return;
    }
    if (pass !== pass2) {
      setError('regError', 'register.err.passmatch');
      return;
    }
    if (!terms) {
      setError('regError', 'register.err.terms');
      return;
    }

    const result = registerUser({ username, email, password: pass });
    if (!result.ok) {
      setError('regError', 'register.err.user');
      return;
    }
    localStorage.setItem('kdrama_flash', 'register.ok');
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initRegister();
});
