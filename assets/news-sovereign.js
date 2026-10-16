document.addEventListener('DOMContentLoaded', () => {
  const copyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
  const checkIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>';
  document.querySelectorAll('.sovereign-tools [data-copy-label]').forEach((content, index) => {
    const prompt = content.closest('.sovereign-tool-prompt');
    const kind = prompt ? '요청 예시' : '명령어';
    let wrapper = prompt;
    if (prompt) {
      prompt.classList.add('has-copy');
    } else {
      const pre = content.closest('pre');
      const target = pre || content;
      wrapper = document.createElement(pre ? 'div' : 'span');
      wrapper.className = pre ? 'sovereign-command' : 'sovereign-command-inline';
      target.before(wrapper);
      wrapper.append(target);
    }

    content.id = `sovereign-copy-content-${index + 1}`;
    content.tabIndex = -1;
    const status = document.createElement('span');
    status.id = `${content.id}-status`;
    status.className = 'sovereign-copy-status';
    status.setAttribute('role', 'status');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sovereign-copy';
    button.innerHTML = copyIcon;
    button.title = `${kind} 복사`;
    button.setAttribute('aria-label', content.dataset.copyLabel);
    button.setAttribute('aria-controls', content.id);
    button.setAttribute('aria-describedby', status.id);
    wrapper.append(button, status);

    button.addEventListener('click', async () => {
      button.disabled = true;
      button.innerHTML = copyIcon;
      button.title = '복사 중…';
      button.setAttribute('aria-busy', 'true');
      status.textContent = '';
      delete status.dataset.state;
      try {
        // Copy the text only, without labels or decorative quotes; preserve line breaks.
        await navigator.clipboard.writeText(content.textContent.trim());
        button.innerHTML = checkIcon;
        button.title = '복사 완료 · 다시 복사';
        status.textContent = `${kind}를 복사했습니다.`;
      } catch {
        content.focus({ preventScroll: true });
        const range = document.createRange();
        range.selectNodeContents(content);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        button.innerHTML = copyIcon;
        button.title = '다시 복사';
        status.dataset.state = 'error';
        status.textContent = `자동 복사를 사용할 수 없습니다. 선택된 ${kind}를 직접 복사해 주세요.`;
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  });
});
