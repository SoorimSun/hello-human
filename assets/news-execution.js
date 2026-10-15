document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-execution-copy]').forEach(button => {
    const prompt = document.getElementById(button.dataset.executionCopy);
    const status = document.getElementById(button.getAttribute('aria-describedby'));
    if (!prompt || !status) return;

    const label = button.getAttribute('aria-label').replace(/ 복사$/, '');
    button.closest('.execution-prompt-actions').hidden = false;
    button.closest('.execution-prompt').classList.add('has-copy');
    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = '복사 중…';
      status.textContent = '';
      delete status.dataset.state;
      try {
        // Keep line breaks even when the prompt's details element is closed.
        const copy = prompt.cloneNode(true);
        copy.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
        const text = [...copy.querySelectorAll('p')]
          .map(paragraph => paragraph.textContent.trim()).join('\n\n');
        await navigator.clipboard.writeText(text);
        button.textContent = '복사 완료';
        status.dataset.state = 'success';
        status.textContent = `${label}을 복사했습니다.`;
      } catch {
        button.textContent = '다시 복사';
        status.dataset.state = 'error';
        prompt.closest('details').open = true;
        prompt.focus({ preventScroll: true });
        const range = document.createRange();
        range.selectNodeContents(prompt);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        status.textContent = '자동 복사를 사용할 수 없습니다. 펼쳐진 요청문을 직접 복사해 주세요.';
      } finally {
        button.disabled = false;
      }
    });
  });
});
