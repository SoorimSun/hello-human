document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('[data-patch-copy]');
  const code = document.getElementById('patch-prompt');
  const status = document.getElementById('patch-copy-status');
  if (!button || !code || !status) return;
  button.disabled = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = '요청문을 복사했습니다. 가상 자료와 함께 붙여 넣으세요.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = '선택된 요청문을 직접 복사하거나 TXT 파일을 내려받으세요.';
    }
  });
});
