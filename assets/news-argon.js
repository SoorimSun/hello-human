document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.argon-prompt-copy');
  const prompt = document.getElementById('argon-trial-prompt');
  const status = document.getElementById('argon-prompt-status');
  if (!button || !prompt || !status) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = '';
    try {
      await navigator.clipboard.writeText(prompt.textContent.trim());
      status.textContent = '가상 자료와 문의가 포함된 입력문을 복사했습니다.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(prompt);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      prompt.focus({ preventScroll: true });
      status.textContent = '아래 입력문을 직접 복사해 주세요.';
    } finally {
      button.disabled = false;
    }
  });
});
