/* ------------------------------------------------------------------
   헬로우 휴먼 — 게임 버전(jobsim.html) 인터랙션
   JS가 없어도 페이지는 그대로 읽히고, 여기서는 조작만 더합니다.
------------------------------------------------------------------- */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // HELLOBOT 대사: 모두 페이지에 있는 문구에서 가져옴
  const BOT_LINES = {
    lobby: [
      '“아직도 직접 하고 계십니까?”',
      '“이 작업에 사람이 계속 개입해야 할까?”',
      '“왜 이걸 아직도 사람이 하고 있지?”',
      'Don\'t work harder. Engineer the work away.',
      '공부한 것을 발표하지 않습니다. 없앤 일을 발표합니다.',
    ],
    exit: [
      '관심 있는 분들의 참여를 기다립니다.',
      'Hello, Human.',
      '작게 만들고, 실행해보고, 실패해보는 것을 중요하게 생각합니다.',
      'AI 경험 수준은 중요하지 않습니다.',
    ],
  };

  setupCartridges();
  setupBots();

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

  /* ---------- 2. HELLOBOT 반응 ---------- */

  function setupBots() {
    const bots = [...document.querySelectorAll('.bot-wrap[data-bot]')].map(makeBot).filter(Boolean);
    if (!bots.length) return;

    // 눈이 포인터를 따라감
    let frame = 0;
    let px = 0;
    let py = 0;
    const onPointer = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(updateEyes);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });

    function updateEyes() {
      frame = 0;
      bots.forEach(({ screen }) => {
        const r = screen.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 240);
        screen.style.setProperty('--ex', `${((dx / dist) * 7 * reach).toFixed(1)}px`);
        screen.style.setProperty('--ey', `${((dy / dist) * 5 * reach).toFixed(1)}px`);
      });
    }

    // 엔딩 로봇은 무표정으로 기다리다가 화면에 들어오면 웃음
    const exitBot = bots.find((b) => b.name === 'exit');
    if (exitBot && 'IntersectionObserver' in window) {
      exitBot.setHappy(false);
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        exitBot.cheer();
        io.disconnect();
      }, { threshold: 0.6 });
      io.observe(exitBot.bot);
    }
  }

  function makeBot(wrap) {
    const bot = wrap.querySelector('.bot');
    const text = wrap.querySelector('.bubble-text');
    if (!bot || !text) return null;

    const name = wrap.dataset.bot;
    const lines = BOT_LINES[name] || [text.textContent];
    const head = bot.querySelector('.bot-head');
    let index = 0;
    let typing = 0;
    let surpriseTimer = 0;
    let happy = bot.classList.contains('is-happy');

    bot.removeAttribute('aria-hidden');
    bot.setAttribute('role', 'button');
    bot.setAttribute('aria-label', 'HELLOBOT에게 말 걸기');
    bot.tabIndex = 0;

    const hint = document.createElement('span');
    hint.className = 'bot-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '▲ 눌러서 말 걸기';
    bot.after(hint);

    // 타이핑되는 글자는 숨기고, 스크린리더에는 완성된 문장만 읽힘
    const live = document.createElement('span');
    live.className = 'sr-only';
    live.setAttribute('aria-live', 'polite');
    live.textContent = text.textContent;
    text.setAttribute('aria-hidden', 'true');
    text.after(live);

    bot.addEventListener('click', poke);
    bot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        poke();
      }
    });

    return {
      name,
      bot,
      screen: bot.querySelector('.bot-screen'),
      setHappy,
      cheer() {
        setHappy(true);
        restartAnimation(head, 'is-poked');
      },
    };

    function setHappy(value) {
      happy = value;
      if (!bot.classList.contains('is-surprised')) bot.classList.toggle('is-happy', happy);
    }

    function poke() {
      if (typing) {
        finishTyping();
        return;
      }
      index = (index + 1) % lines.length;

      clearTimeout(surpriseTimer);
      bot.classList.remove('is-happy');
      bot.classList.add('is-surprised');
      surpriseTimer = setTimeout(() => {
        bot.classList.remove('is-surprised');
        bot.classList.toggle('is-happy', happy);
      }, 700);
      restartAnimation(head, 'is-poked');

      say(lines[index]);
    }

    function say(line) {
      live.textContent = line;
      text.dataset.full = line;
      if (reduceMotion) {
        text.textContent = line;
        return;
      }
      let count = 0;
      text.textContent = '';
      text.classList.add('is-typing');
      typing = setInterval(() => {
        count += 1;
        text.textContent = line.slice(0, count);
        if (count >= line.length) finishTyping();
      }, 35);
    }

    function finishTyping() {
      clearInterval(typing);
      typing = 0;
      text.textContent = text.dataset.full;
      text.classList.remove('is-typing');
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
