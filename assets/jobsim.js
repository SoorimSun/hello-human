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
  setupRun();
  setupReveal();
  setupNotes();

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
    const brief = loaded.querySelector('.cs-brief');
    const live = machine.querySelector('.cs-live');

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

      // 회차별 추가 설명: 각 카트리지의 <template class="cart-brief">
      brief.replaceChildren();
      const tpl = cart.querySelector('template.cart-brief');
      if (tpl) brief.append(tpl.content.cloneNode(true));
      [...brief.children].forEach((el, i) => el.style.setProperty('--i', i));
      idle.hidden = true;
      loaded.hidden = false;
      loaded.classList.remove('is-ready');
      restartAnimation(bar);

      clearTimeout(readyTimer);
      readyTimer = setTimeout(() => {
        loaded.classList.add('is-ready');
        statusEl.textContent = '▶ NOW PLAYING';
        live.textContent = `${info.ep} ${info.title} 카트리지를 꽂았습니다.`;
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
      live.textContent = '카트리지를 꺼냈습니다.';
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

  /* ---------- 3. Before / After 실행 (Workless Challenge) ---------- */

  function setupRun() {
    const ba = document.querySelector('.ba');
    const btn = document.querySelector('.run-btn');
    if (!ba || !btn) return;

    const status = document.querySelector('.run-status');
    const before = ba.querySelector('[data-run="before"]');
    const after = ba.querySelector('[data-run="after"]');
    const beforeSteps = [...before.querySelectorAll('.ln')];
    const afterSteps = [...after.querySelectorAll('.ln')];
    const beforeLed = before.querySelector('.led');
    const afterLed = after.querySelector('.led');

    const MINUTE = 200;                                  // 시뮬레이션 1분 = 0.2초
    const HUMAN_STEP = 5 * MINUTE;                       // Before: 사람이 단계마다 5분
    const AGENT_STEP = 300;                              // After: 에이전트 단계는 사람 시간 0
    const REVIEW_START = AGENT_STEP * (afterSteps.length - 1);
    const TOTAL = HUMAN_STEP * beforeSteps.length;       // 30분

    let running = false;
    let start = 0;
    let timer = 0;

    btn.addEventListener('click', () => {
      if (running) return;
      running = true;
      btn.setAttribute('aria-disabled', 'true');
      btn.textContent = '■ RUNNING...';
      ba.classList.remove('is-finished');
      ba.classList.add('is-running');
      status.textContent = 'Before와 After를 실행합니다.';

      if (reduceMotion) {
        finish();
        return;
      }
      // 경과 시간은 실제 시계로 계산해서, 탭이 가려져 타이머가 느려져도 위치가 정확함
      start = performance.now();
      timer = setInterval(tick, 50);
      tick();
    });

    function tick() {
      const t = performance.now() - start;
      if (t >= TOTAL) {
        finish();
        return;
      }
      render(t);
    }

    function render(t) {
      beforeSteps.forEach((el, i) => setStep(el, t, i * HUMAN_STEP, (i + 1) * HUMAN_STEP));
      afterSteps.forEach((el, i) => {
        const isReview = i === afterSteps.length - 1;
        const from = isReview ? REVIEW_START : i * AGENT_STEP;
        const to = isReview ? REVIEW_START + 5 * MINUTE : (i + 1) * AGENT_STEP;
        setStep(el, t, from, to);
      });
      beforeLed.textContent = clock(t / MINUTE);
      afterLed.textContent = `사람 ${clock(Math.min(5, Math.max(0, (t - REVIEW_START) / MINUTE)))}`;
    }

    function setStep(el, t, from, to) {
      el.classList.toggle('is-active', t >= from && t < to);
      el.classList.toggle('is-done', t >= to);
    }

    function finish() {
      clearInterval(timer);
      render(TOTAL);
      running = false;
      ba.classList.remove('is-running');
      ba.classList.add('is-finished');
      btn.removeAttribute('aria-disabled');
      btn.textContent = '↺ REPLAY';
      status.textContent = '완료: Before는 사람이 30분, After는 사람이 5분 걸렸습니다.';
    }

    function clock(minutes) {
      const sec = Math.round(minutes * 60);
      return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    }
  }

  /* ---------- 4-1. 스크롤 연출: 보드 타일이 차례로 켜지고, 영수증이 출력됨 ---------- */

  function setupReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const targets = [];
    document.querySelectorAll('.board').forEach((board) => {
      const steps = board.querySelectorAll('.step');
      if (!steps.length) return;
      steps.forEach((step, i) => { step.style.transitionDelay = `${i * 160}ms`; });
      board.querySelectorAll('.pips i').forEach((pip, i) => { pip.style.transitionDelay = `${200 + i * 160}ms`; });
      targets.push(board);
    });
    // 영수증은 종이는 보이고 안의 글자만 출력되듯 나타남
    // (관찰 대상 자체를 clip-path로 가리면 화면 밖으로 판정되므로 자식만 가림)
    const receipt = document.querySelector('.receipt');
    if (receipt) targets.push(receipt);

    targets.forEach((el) => el.classList.add('is-armed'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-lit');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- 4-2. 포스트잇 체크: "나도 해당" ---------- */

  function setupNotes() {
    const cork = document.querySelector('.cork');
    if (!cork) return;
    const notes = [...cork.querySelectorAll('li')];

    const box = document.createElement('div');
    box.className = 'cork-bot';
    box.innerHTML = '<span class="mini-face" aria-hidden="true"><i></i><i></i><b></b></span>'
      + '<p class="cork-bot-text" aria-live="polite"></p>';
    cork.after(box);
    const text = box.querySelector('.cork-bot-text');

    // 목록 구조는 그대로 두고, 포스트잇 내용을 토글 버튼으로 감쌈
    const buttons = notes.map((note) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'note-btn';
      btn.setAttribute('aria-pressed', 'false');
      btn.append(...note.childNodes);
      note.append(btn);
      btn.addEventListener('click', () => {
        const on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', String(on));
        note.classList.toggle('is-checked', on);
        update();
      });
      return btn;
    });
    update();

    function update() {
      const n = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
      box.classList.toggle('is-happy', n > 0);
      if (n === 0) text.textContent = '해당되는 포스트잇을 눌러 보세요.';
      else if (n === notes.length) text.textContent = '전부 해당! 다음 모임에서 만나요.';
      else if (n === 1) text.textContent = '1개 해당! 이미 충분합니다.';
      else text.textContent = `${n}개나 해당! 헬로우 휴먼에 딱이에요.`;
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
