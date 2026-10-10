// A teaching example only: no commands, model calls, files or persistent data.
document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('[data-mods-workboard]');
  if (!board) return;
  const fields = Object.fromEntries([...board.querySelectorAll('[data-field]')]
    .map(element => [element.dataset.field, element]));
  let revision = 1;
  let testedRevision = null;
  let lastResult = null;
  let run = 0;

  function render() {
    const stale = testedRevision !== null && testedRevision !== revision;
    fields.revision.textContent = `v${revision}`;
    fields.tested.textContent = testedRevision === null ? '아직 없음' : `v${testedRevision} · ${run}번째 모의 검사`;
    fields.result.textContent = lastResult === null ? '실행 전' : lastResult ? '통과' : '실패';
    fields.changed.textContent = testedRevision === null ? '비교할 검사 없음' : stale ? '있음' : '없음';
    board.dataset.status = testedRevision === null ? 'unverified' : stale ? 'stale' : lastResult ? 'pass' : 'fail';
    fields.verdict.textContent = testedRevision === null ? '아직 검증하지 않은 코드입니다' : stale
      ? '코드가 바뀌었습니다. 재검증이 필요합니다' : lastResult
        ? '현재 코드와 검사 대상이 같습니다' : '현재 코드의 검사에 실패했습니다';
  }

  board.querySelector('[data-mods-controls]').hidden = false;
  board.addEventListener('click', event => {
    const action = event.target.closest('button[data-action]')?.dataset.action;
    if (!action) return;
    if (action === 'edit') revision += 1;
    else if (action === 'pass' || action === 'fail') {
      testedRevision = revision;
      lastResult = action === 'pass';
      run += 1;
    } else if (action === 'reset') {
      revision = 1;
      testedRevision = null;
      lastResult = null;
      run = 0;
    }
    render();
  });
});
