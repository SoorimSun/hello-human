document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-native-copy]').forEach(button => {
    const code = document.getElementById(button.dataset.nativeCopy);
    const status = button.parentElement.querySelector('[role="status"]');
    if (!code || !status) return;
    button.disabled = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = '복사했습니다. 새 AI 대화에 붙여 넣으세요.';
      } catch {
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(code);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        status.textContent = '본문을 직접 복사하거나 TXT 파일을 내려받으세요.';
      }
    });
  });
});
