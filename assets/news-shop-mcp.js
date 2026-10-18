(() => {
  function initializeFlow() {
    const flow = document.getElementById('shop-id-flow');
    const examples = document.getElementById('shop-mcp-examples');
    if (!flow || !examples) return;

    const links = Array.from(flow.querySelectorAll('[data-shop-step]'));
    const calls = Array.from(examples.querySelectorAll('.shop-api-call'));
    const fields = Array.from(examples.querySelectorAll('[data-shop-field]'));
    const status = document.getElementById('shop-flow-status');
    const comparison = document.getElementById('shop-comparison');
    const comparisonHeading = document.getElementById('shop-comparison-heading');
    const comparisonFields = document.getElementById('shop-compare-fields');
    const comparisonJson = document.getElementById('shop-compare-json');
    const comparisonContext = document.getElementById('shop-compare-context');
    const comparisonButtons = Array.from(comparison.querySelectorAll('[data-shop-compare-step]'));
    const requestSnippets = Array.from(examples.querySelectorAll('pre[id$="-request"][data-format="json"]'));
    const disclosureStorageKey = 'hello-human:shop-example-disclosures';
    const disclosureKeys = new Set([
      examples.id, ...calls.map(call => call.id),
      ...requestSnippets.map(snippet => `curl:request:${snippet.id}`),
      ...links.map(link => `json:${link.dataset.shopStep}`),
      ...links.map(link => `curl:comparison:${link.dataset.shopTarget}`)
    ]);
    const disclosureState = {};
    let lastComparisonStep = '';
    try {
      const saved = JSON.parse(localStorage.getItem(disclosureStorageKey));
      disclosureKeys.forEach(key => {
        if (typeof saved?.[key] === 'boolean') disclosureState[key] = saved[key];
      });
      if (links.some(link => link.dataset.shopStep === saved?.comparisonStep)) lastComparisonStep = saved.comparisonStep;
    } catch { /* Invalid or unavailable storage leaves the default disclosure states. */ }
    const curlShellStorageKey = 'hello-human:shop-curl-shell';
    let selectedCurlShell = 'bash';
    try {
      const savedShell = localStorage.getItem(curlShellStorageKey);
      if (savedShell === 'bash' || savedShell === 'powershell') selectedCurlShell = savedShell;
    } catch { /* Storage may be disabled; use the default for this page. */ }
    const curlViews = new WeakMap();
    const curlShellLabels = { bash: 'Bash / zsh', powershell: 'PowerShell' };
    const fieldLabels = {
      product: ['P', '상품 ID'], variant: ['V', '옵션 ID'],
      seller: ['S', '판매자'], checkout: ['C', '체크아웃 ID · 가림']
    };

    function element(tag, className, text) {
      const node = document.createElement(tag);
      node.className = className;
      if (text) node.textContent = text;
      return node;
    }

    function restoreDisclosure(details, key, defaultOpen = false) {
      details.dataset.shopDisclosure = key;
      details.open = disclosureState[key] ?? defaultOpen;
    }

    function saveDisclosures() {
      // Save only known UI choices, including nested closed sections.
      document.querySelectorAll('details[data-shop-disclosure]').forEach(details => {
        const key = details.dataset.shopDisclosure;
        if (disclosureKeys.has(key)) disclosureState[key] = details.open;
      });
      try {
        localStorage.setItem(disclosureStorageKey, JSON.stringify({ ...disclosureState, comparisonStep: lastComparisonStep }));
      } catch { /* Keep this page usable without storage. */ }
    }

    function toolName(snippet) {
      return snippet.closest('.shop-api-call').querySelector('summary').textContent
        .split(' · ')[0].replace(/^\d+\.\s*/, '');
    }

    function addCopyButton(container, header, pre, label, format) {
      const button = element('button', `shop-json-copy${format === 'cURL' ? ' shop-curl-copy' : ''}`, `${format} 복사`);
      button.type = 'button';
      button.setAttribute('aria-label', `${label} ${format} 복사`);
      const copyStatus = element('p', 'shop-copy-status');
      copyStatus.setAttribute('role', 'status');
      copyStatus.setAttribute('aria-atomic', 'true');
      header.append(button);
      header.after(copyStatus);
      let copyRevision = 0;
      function reset() {
        copyRevision += 1;
        button.disabled = false;
        button.textContent = `${format} 복사`;
        button.setAttribute('aria-label', `${label} ${pre.dataset.copyFormat || format} 복사`);
        copyStatus.textContent = '';
      }
      button.addEventListener('click', async () => {
        const revision = ++copyRevision;
        const copyFormat = pre.dataset.copyFormat || format;
        button.disabled = true;
        button.textContent = '복사 중…';
        copyStatus.textContent = '';
        try {
          // Copy only displayed text, including its redacted placeholders.
          await navigator.clipboard.writeText(pre.querySelector('code').textContent);
          if (revision !== copyRevision || !container.isConnected) return;
          button.textContent = '복사 완료';
          copyStatus.textContent = `표시된 ${copyFormat}을 복사했습니다.`;
        } catch {
          if (revision !== copyRevision || !container.isConnected) return;
          pre.focus({ preventScroll: true });
          const range = document.createRange();
          range.selectNodeContents(pre.querySelector('code'));
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          button.textContent = '다시 복사';
          copyStatus.textContent = `자동 복사를 사용할 수 없습니다. 선택된 ${copyFormat}을 직접 복사해 주세요.`;
        } finally {
          if (revision === copyRevision) button.disabled = false;
        }
      });
      return reset;
    }

    function createCurlExample(snippet, scope = 'request') {
      // Build examples from the public request, never from a live response.
      const request = JSON.parse(snippet.querySelector('code').textContent);
      const body = {
        jsonrpc: '2.0', id: 1, method: 'tools/call',
        params: {
          ...request,
          _meta: {
            'io.modelcontextprotocol/protocolVersion': '2026-07-28',
            'io.modelcontextprotocol/clientInfo': { name: 'hello-human-example', version: '1.0.0' },
            'io.modelcontextprotocol/clientCapabilities': {}
          }
        }
      };
      const bashCommand = [
        "curl --request POST 'https://mcp.shop.com/' \\",
        "  --header 'Content-Type: application/json' \\",
        "  --header 'Accept: application/json, text/event-stream' \\",
        "  --header 'MCP-Protocol-Version: 2026-07-28' \\",
        "  --header 'Mcp-Method: tools/call' \\",
        `  --header 'Mcp-Name: ${request.name}' \\`,
        "  --data-binary @- <<'SHOP_JSON'",
        JSON.stringify(body, null, 2),
        'SHOP_JSON'
      ].join('\n');
      const powershellCommand = [
        "$shopMcpJson = @'",
        JSON.stringify(body, null, 2),
        "'@",
        '$shopMcpBodyFile = [System.IO.Path]::GetTempFileName()',
        'try {',
        '  [System.IO.File]::WriteAllText($shopMcpBodyFile, $shopMcpJson, [System.Text.UTF8Encoding]::new($false))',
        "  curl.exe --request POST 'https://mcp.shop.com/' `",
        "    --header 'Content-Type: application/json' `",
        "    --header 'Accept: application/json, text/event-stream' `",
        "    --header 'MCP-Protocol-Version: 2026-07-28' `",
        "    --header 'Mcp-Method: tools/call' `",
        `    --header 'Mcp-Name: ${request.name}' ` + '`',
        '    --data-binary "@$shopMcpBodyFile"',
        '} finally {',
        '  Remove-Item -LiteralPath $shopMcpBodyFile',
        '}'
      ].join('\n');
      const commands = { bash: bashCommand, powershell: powershellCommand };
      const details = element('details', 'access-details shop-curl-example');
      details.dataset.shopCurl = request.name;
      restoreDisclosure(details, `curl:${scope}:${snippet.id}`);
      const summary = element('summary', '');
      const shellPicker = element('div', 'shop-compare-nav shop-curl-shell');
      shellPicker.setAttribute('role', 'group');
      shellPicker.setAttribute('aria-label', `${request.name} cURL 셸 선택`);
      Object.entries(curlShellLabels).forEach(([shell, label]) => {
        const button = element('button', '', label);
        button.type = 'button';
        button.dataset.shopShell = shell;
        shellPicker.append(button);
      });
      const shellNote = element('p', 'shop-curl-note');
      details.append(summary, shellPicker, shellNote);
      if (request.name === 'create_checkout') {
        details.append(element('p', 'shop-curl-note', '멱등성 키는 [IDEMPOTENCY_KEY_REMOVED]로 가렸습니다. 새 생성 요청에는 새 UUID가 필요하며, 실행하면 실제 체크아웃이 생성됩니다.'));
      } else if (request.name === 'get_checkout') {
        details.append(element('p', 'shop-curl-note', '[CHECKOUT_ID_REMOVED]는 생성 응답에서 받은 체크아웃 ID의 자리표시자입니다. 공개 예시와 복사본 모두 가린 값을 유지합니다.'));
      }
      const header = element('div', 'shop-compare-json-head');
      header.append(element('h4', '', `${request.name} 요청`));
      const pre = element('pre', 'shop-api-code shop-curl-code');
      pre.tabIndex = 0;
      const code = element('code', '');
      pre.append(code);
      details.append(header, pre);
      const resetCopy = addCopyButton(details, header, pre, `${request.name} 요청`, 'cURL');
      function renderShell(shell) {
        const label = curlShellLabels[shell];
        details.dataset.shopShell = shell;
        summary.textContent = `cURL 요청 예시 · ${label}`;
        shellPicker.querySelectorAll('button').forEach(button => {
          button.setAttribute('aria-pressed', String(button.dataset.shopShell === shell));
        });
        shellNote.textContent = shell === 'powershell'
          ? 'Windows PowerShell 형식입니다. curl.exe를 사용하고, 한글을 보존하도록 JSON을 UTF-8 임시 파일로 전달한 뒤 삭제합니다.'
          : 'Bash/zsh 형식입니다. JSON을 표준 입력으로 전달합니다.';
        code.textContent = commands[shell];
        pre.dataset.copyFormat = `${label} cURL`;
        pre.setAttribute('aria-label', `${request.name} ${label} cURL 요청 예시`);
        resetCopy();
      }
      curlViews.set(details, renderShell);
      renderShell(selectedCurlShell);
      return details;
    }

    function showComparison(link, source, target, carry, selectedFields) {
      comparison.hidden = false;
      comparisonHeading.textContent = `${link.dataset.shopLabel} 연결`;
      comparisonButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.shopCompareStep === link.dataset.shopStep));
      });
      comparisonFields.replaceChildren();
      comparisonJson.replaceChildren();
      restoreDisclosure(comparisonContext, `json:${link.dataset.shopStep}`);
      comparisonFields.style.setProperty('--shop-compare-rows', selectedFields.length * 4 + 1);

      [source, target].forEach((snippet, side) => {
        const label = `${toolName(snippet)} ${side === 0 ? '응답' : '요청'}`;
        const card = element('div', 'shop-compare-card');
        const header = element('div', 'shop-compare-header');
        header.append(element('span', '', side === 0 ? '출발 · 응답' : '도착 · 다음 요청'));
        header.append(element('h4', '', toolName(snippet)));
        card.append(header);

        selectedFields.forEach(key => {
          const selector = `[data-shop-field="${key}"]`;
          const field = snippet.querySelector(selector) || (side === 0 && carry?.querySelector(selector));
          if (!field) return;
          const row = element('div', 'shop-compare-field');
          row.dataset.shopMatch = key;
          const badge = element('span', 'shop-id-chip');
          badge.append(element('i', '', fieldLabels[key][0]), document.createTextNode(fieldLabels[key][1]));
          row.append(badge);
          row.append(element('code', 'shop-compare-path', field.dataset.shopPath));
          const pre = element('pre', 'shop-api-code');
          const code = element('code', '');
          code.append(element('mark', 'is-highlighted', field.textContent));
          pre.append(code);
          row.append(pre);
          if (!snippet.contains(field)) {
            row.append(element('p', 'shop-compare-carried', '앞선 create_checkout 요청에서 유지한 값 · 이 응답의 필드가 아닙니다.'));
          }
          card.append(row);
        });
        comparisonFields.append(card);

        const context = element('div', 'shop-compare-snippet');
        const actions = element('div', 'shop-compare-json-head');
        actions.append(element('h4', '', label));
        context.append(actions);
        const copy = snippet.cloneNode(true);
        copy.removeAttribute('id');
        // Keep a single canonical set of JSON examples and field markers.
        copy.removeAttribute('data-format');
        copy.querySelectorAll('[data-shop-field]').forEach(field => {
          field.removeAttribute('data-shop-field');
          field.removeAttribute('data-shop-path');
        });
        context.append(copy);
        addCopyButton(context, actions, copy, label, 'JSON');
        if (side === 1) context.append(createCurlExample(snippet, 'comparison'));
        comparisonJson.append(context);
      });
    }

    function focusContent(node, block = 'center') {
      node.focus({ preventScroll: true });
      (node.querySelector('.is-highlighted') || node).scrollIntoView({
        block,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    }

    function selectStep(link, focusId, restoreSaved = false, moveFocus = true) {
      const source = document.getElementById(link.dataset.shopSource);
      const target = document.getElementById(link.dataset.shopTarget);
      if (!source || !target) return;

      const controlled = link.getAttribute('aria-controls').split(/\s+/);
      const selectedFields = link.dataset.shopFields.split(/\s+/);
      // Reload keeps closed sections, while following a new request link reveals its target.
      const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
      const restoreCalls = restoreSaved && (!focusId || isReload);
      examples.open = restoreCalls ? (disclosureState[examples.id] ?? true) : true;
      calls.forEach(call => {
        const linked = controlled.includes(call.id);
        call.open = restoreCalls ? (disclosureState[call.id] ?? linked) : linked;
        call.classList.toggle('is-linked', linked);
      });
      links.forEach(item => {
        if (item === link) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      fields.forEach(field => field.classList.remove('is-highlighted'));

      // The seller carried into get_checkout comes from the earlier request,
      // not from a new seller field in the create_checkout response.
      const carry = document.getElementById(link.dataset.shopCarry || '');
      [source, target, carry].filter(Boolean).forEach(snippet => {
        snippet.querySelectorAll('[data-shop-field]').forEach(field => {
          field.classList.toggle('is-highlighted', selectedFields.includes(field.dataset.shopField));
        });
      });
      showComparison(link, source, target, carry, selectedFields);
      lastComparisonStep = link.dataset.shopStep;

      examples.querySelectorAll('[data-shop-next]').forEach(next => { next.hidden = true; });
      const next = source.closest('.shop-api-call').querySelector('[data-shop-next]');
      next.href = `#${target.id}`;
      next.hidden = false;
      status.textContent = `${link.dataset.shopLabel} 연결을 선택했습니다. 응답과 다음 요청의 대응 필드를 비교 영역에 표시했습니다.`;

      saveDisclosures();
      if (!moveFocus) return;
      if (focusId) {
        const focusNode = document.getElementById(focusId) || source;
        if (!examples.open || !focusNode.closest('.shop-api-call').open) focusContent(examples.querySelector('summary'), 'start');
        else focusContent(focusNode);
      } else focusContent(comparisonHeading, 'start');
    }

    function selectHash(restoreSaved = false) {
      const id = window.location.hash.slice(1);
      const link = links.find(item => `shop-compare-${item.dataset.shopStep}` === id
        || item.dataset.shopSource === id || item.dataset.shopTarget === id);
      if (!link) return false;
      if (id === link.dataset.shopSource) {
        window.history.replaceState(null, '', `#shop-compare-${link.dataset.shopStep}`);
      }
      selectStep(link, id === link.dataset.shopTarget ? id : undefined, restoreSaved);
      return true;
    }

    function navigateStep(link, focusId) {
      saveDisclosures();
      const hash = focusId ? `#${focusId}` : `#shop-compare-${link.dataset.shopStep}`;
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      selectStep(link, focusId);
    }

    links.forEach(link => {
      link.setAttribute('aria-controls', `${link.getAttribute('aria-controls')} shop-comparison`);
      link.querySelector('h4 small').textContent = '나란히 비교 ↘';
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigateStep(link);
      });
    });
    comparisonButtons.forEach(button => {
      button.addEventListener('click', () => {
        navigateStep(links.find(link => link.dataset.shopStep === button.dataset.shopCompareStep));
      });
    });
    examples.querySelectorAll('[data-shop-next]').forEach(next => {
      next.addEventListener('click', event => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const targetId = next.hash.slice(1);
        const link = links.find(item => item.dataset.shopTarget === targetId);
        if (!link) return;
        event.preventDefault();
        navigateStep(link, targetId);
      });
    });
    restoreDisclosure(examples, examples.id);
    calls.forEach(call => restoreDisclosure(call, call.id));
    requestSnippets.forEach(snippet => {
      snippet.after(createCurlExample(snippet));
    });
    function switchCurlShell(event) {
      const button = event.target.closest('button[data-shop-shell]');
      if (!button) return;
      selectedCurlShell = button.dataset.shopShell;
      // Persist only the shell preference, never request data or identifiers.
      try { localStorage.setItem(curlShellStorageKey, selectedCurlShell); } catch { /* Keep the choice for this page. */ }
      document.querySelectorAll('.shop-curl-example').forEach(details => {
        curlViews.get(details)(selectedCurlShell);
      });
    }
    examples.addEventListener('click', switchCurlShell);
    comparison.addEventListener('click', switchCurlShell);
    examples.addEventListener('toggle', saveDisclosures, true);
    comparison.addEventListener('toggle', saveDisclosures, true);
    window.addEventListener('pagehide', saveDisclosures);
    window.addEventListener('hashchange', () => {
      saveDisclosures();
      selectHash();
    });
    if (!selectHash(true) && lastComparisonStep) {
      const lastLink = links.find(link => link.dataset.shopStep === lastComparisonStep);
      selectStep(lastLink, undefined, true, false);
    }
  }

  // Preserve the original article snapshot used by content-updates.js.
  document.addEventListener('DOMContentLoaded', initializeFlow, { once: true });
})();
