document.addEventListener('DOMContentLoaded', () => {
  const controls = document.getElementById('review-scenario-controls');
  const scenarios = Array.from(document.querySelectorAll('[data-review-scenario]'));
  if (controls && scenarios.length) {
    const renderScenario = () => {
      const selected = controls.querySelector('input:checked')?.value;
      scenarios.forEach(panel => { panel.hidden = panel.dataset.reviewScenario !== selected; });
    };
    controls.addEventListener('change', renderScenario);
    controls.disabled = false;
    renderScenario();
  }

  document.querySelectorAll('[data-review-copy]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.reviewCopy);
      const status = button.closest('.review-template-tools').querySelector('[role="status"]');
      if (!code || !status) return;
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = '복사했습니다.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = '본문을 선택했습니다. 복사하거나 파일을 내려받으세요.';
      }
    });
  });

  const checks = Array.from(document.querySelectorAll('[data-review-check]'));
  const result = document.getElementById('review-check-result');
  const updateChecks = () => {
    const checked = checks.filter(input => input.checked).length;
    result.textContent = `${checked} / ${checks.length} 준비${checked === checks.length ? ' · 동료에게 리뷰를 요청할 준비가 되었습니다. 실제 승인과 검증은 별도로 진행하세요.' : ' · 이 체크는 리뷰 요청 전 준비를 돕습니다.'}`;
  };
  if (checks.length && result) {
    checks.forEach(input => input.addEventListener('change', updateChecks));
    updateChecks();
  }
});
