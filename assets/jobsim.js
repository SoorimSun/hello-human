/* ------------------------------------------------------------------
   헬로우 휴먼 — 게임 버전(jobsim.html) 인터랙션
   JS가 없어도 페이지는 그대로 읽히고, 여기서는 조작만 더합니다.
------------------------------------------------------------------- */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setupCartridges();

  /* ---------- 1. 카트리지 꽂기 (Season 1) ---------- */

  function setupCartridges() {
    const machine = document.querySelector('.console');
    const carts = [...document.querySelectorAll('.cart')];
    if (!machine || !carts.length) return;

    const slot = machine.querySelector('.console-slot');
    const slotLabel = slot.querySelector('b');
    const idle = machine.querySelector('.cs-idle');
    const loaded = machine.querySelector('.cs-loaded');
    const epEl = loaded.querySelector('.cs-ep');
    const statusEl = loaded.querySelector('.cs-status');
    const titleEl = loaded.querySelector('.cs-title');
    const descEl = loaded.querySelector('.cs-desc');
    const bar = loaded.querySelector('.cs-bar i');
    const ejectBtn = loaded.querySelector('.cs-eject');

    let current = null;
    let readyTimer = 0;

    carts.forEach((cart, index) => {
      const info = readCart(cart);
      cart.tabIndex = 0;
      cart.draggable = true;
      cart.setAttribute('role', 'button');
      cart.setAttribute('aria-label', `${info.ep} ${info.title} 카트리지 꽂기`);

      cart.addEventListener('click', () => insert(cart));
      cart.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          insert(cart);
        }
      });
      cart.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', String(index));
        e.dataTransfer.effectAllowed = 'move';
        cart.classList.add('is-dragging');
        machine.classList.add('is-waiting');
      });
      cart.addEventListener('dragend', () => {
        cart.classList.remove('is-dragging');
        machine.classList.remove('is-waiting', 'is-over');
      });
    });

    machine.addEventListener('dragover', (e) => {
      e.preventDefault();
      machine.classList.add('is-over');
    });
    machine.addEventListener('dragleave', (e) => {
      if (!machine.contains(e.relatedTarget)) machine.classList.remove('is-over');
    });
    machine.addEventListener('drop', (e) => {
      e.preventDefault();
      machine.classList.remove('is-over', 'is-waiting');
      const cart = carts[Number(e.dataTransfer.getData('text/plain'))];
      if (cart) insert(cart);
    });
    ejectBtn.addEventListener('click', eject);

    function readCart(cart) {
      return {
        ep: cart.querySelector('.cart-ep').textContent.trim(),
        title: cart.querySelector('h3').textContent.trim(),
        desc: cart.querySelector('.cart-label p').textContent.trim(),
        color: cart.style.getPropertyValue('--c').trim(),
      };
    }

    function insert(cart) {
      if (cart === current) return;
      const info = readCart(cart);
      if (current) current.classList.remove('is-inserted');
      current = cart;
      cart.classList.add('is-inserted');

      machine.style.setProperty('--c', info.color);
      machine.classList.add('is-loaded');
      slotLabel.textContent = info.title;
      restartAnimation(slot, 'is-in');

      epEl.textContent = info.ep;
      titleEl.textContent = info.title;
      descEl.textContent = info.desc;
      statusEl.textContent = 'LOADING...';
      idle.hidden = true;
      loaded.hidden = false;
      loaded.classList.remove('is-ready');
      restartAnimation(bar);

      clearTimeout(readyTimer);
      readyTimer = setTimeout(() => {
        loaded.classList.add('is-ready');
        statusEl.textContent = '▶ NOW PLAYING';
      }, reduceMotion ? 0 : 950);

      // 모바일처럼 콘솔이 화면 밖에 있으면 콘솔 쪽으로 이동
      const rect = machine.getBoundingClientRect();
      if (rect.top < 70 || rect.bottom > window.innerHeight) {
        machine.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    }

    function eject() {
      clearTimeout(readyTimer);
      const cart = current;
      current = null;
      machine.classList.remove('is-loaded');
      slot.classList.remove('is-in');
      loaded.hidden = true;
      loaded.classList.remove('is-ready');
      idle.hidden = false;
      if (cart) {
        cart.classList.remove('is-inserted');
        cart.focus({ preventScroll: true });
      }
    }
  }

  /* ---------- 공통 ---------- */

  // 같은 CSS 애니메이션을 처음부터 다시 재생
  function restartAnimation(el, className) {
    if (className) el.classList.remove(className);
    else el.style.animation = 'none';
    void el.offsetWidth;
    if (className) el.classList.add(className);
    else el.style.animation = '';
  }
})();
