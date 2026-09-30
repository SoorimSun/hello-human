(() => {
  const storageKey = 'hello-human:theme';
  const modes = ['system', 'light', 'dark'];
  let mode = 'system';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let toggle;

  function isDark() {
    return mode === 'dark' || (mode === 'system' && systemTheme.matches);
  }

  function updateToggle() {
    if (!toggle) return;
    toggle.setAttribute('aria-checked', String(isDark()));
    toggle.title = isDark() ? '라이트 모드로 전환' : '다크 모드로 전환';
  }

  function apply(value) {
    mode = modes.includes(value) ? value : 'system';
    document.documentElement.dataset.theme = mode;
    updateToggle();
  }

  // Apply the saved choice before styles load to avoid flashing the system theme.
  try { mode = localStorage.getItem(storageKey) ?? 'system'; } catch { /* Storage may be disabled. */ }
  apply(mode);

  function addControl() {
    const header = document.querySelector('.topbar-inner');
    if (!header) return;

    const control = document.createElement('div');
    control.className = 'theme-control';
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('aria-label', '다크 모드');
    toggle.innerHTML = '<span class="theme-toggle-thumb" aria-hidden="true"></span>'
      + '<svg class="theme-toggle-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>'
      + '<svg class="theme-toggle-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.9 13.2A9 9 0 1 1 10.8 3.1a7 7 0 0 0 10.1 10.1Z"/></svg>';
    toggle.addEventListener('click', () => {
      apply(isDark() ? 'light' : 'dark');
      try { localStorage.setItem(storageKey, mode); } catch { /* Keep the choice for this page. */ }
    });
    updateToggle();
    control.append(toggle);
    header.append(control);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addControl, { once: true });
  else addControl();

  systemTheme.addEventListener('change', () => { if (mode === 'system') updateToggle(); });

  // Keep other open pages in step with the user's choice.
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) apply(event.newValue);
  });
})();
