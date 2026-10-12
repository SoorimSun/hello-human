document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.decart-test-copy');
  const prompt = document.getElementById('customer-test-prompt');
  const status = document.getElementById('customer-test-copy-status');
  if (!button || !prompt || !status) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = '복사 중…';
    status.textContent = '';
    try {
      await navigator.clipboard.writeText(prompt.textContent.trim());
      button.textContent = '복사 완료';
      status.textContent = '가상 규정과 고객 문의 3개를 복사했습니다.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(prompt);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      prompt.focus({ preventScroll: true });
      button.textContent = '다시 복사';
      status.textContent = '자동 복사를 사용할 수 없습니다. 아래 입력문을 직접 복사해 주세요.';
    } finally {
      button.disabled = false;
    }
  });
});
