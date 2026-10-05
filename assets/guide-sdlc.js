document.addEventListener('DOMContentLoaded', () => {
  const sliders = Array.from(document.querySelectorAll('[data-sdlc-stage]'));
  const hours = value => Number.isInteger(value) ? `${value}시간` : `${Number(value.toFixed(1))}시간`;
  const baseline = sliders.reduce((sum, input) => sum + Number(input.dataset.baseHours), 0);
  const renderBar = (id, stages, total) => {
    const bar = document.getElementById(`${id}-bar`);
    bar.style.width = `${total / baseline * 100}%`;
    bar.style.gridTemplateColumns = stages.map(stage => `minmax(0, ${stage.time}fr)`).join(' ');
    document.getElementById(`${id}-description`).setAttribute('aria-label',
      `작업 시간 합계 ${hours(total)}. ${stages.map(stage => `${stage.label} ${hours(stage.time)}`).join(', ')}`);
  };
  const updateSimulation = () => {
    const stages = sliders.map(input => {
      const speed = Number(input.value);
      const time = Number(input.dataset.baseHours) / speed;
      document.getElementById(`${input.dataset.sdlcStage}-speed-value`).textContent = `${speed}배`;
      document.getElementById(`${input.dataset.sdlcStage}-time`).textContent = hours(time);
      input.setAttribute('aria-valuetext', `${speed}배, ${hours(time)}`);
      return { id: input.dataset.sdlcStage, label: input.dataset.label, base: Number(input.dataset.baseHours), speed, time };
    });
    const build = stages.find(stage => stage.id === 'build');
    const buildOnly = stages.map(stage => ({ ...stage, time: stage.id === 'build' ? stage.time : stage.base }));
    const buildOnlyTotal = buildOnly.reduce((sum, stage) => sum + stage.time, 0);
    const allStagesTotal = stages.reduce((sum, stage) => sum + stage.time, 0);
    renderBar('build-only', buildOnly, buildOnlyTotal);
    renderBar('all-stages', stages, allStagesTotal);
    document.getElementById('build-only-time').textContent = hours(buildOnlyTotal);
    document.getElementById('all-stages-time').textContent = hours(allStagesTotal);
    document.getElementById('saved-time').textContent = `${Math.round((baseline - allStagesTotal) / baseline * 100)}%`;
    document.getElementById('extra-saved-time').textContent = hours(buildOnlyTotal - allStagesTotal);
    document.getElementById('simulation-result').textContent = stages.every(stage => stage.speed === 1)
      ? `모든 단계가 1배이므로 세 경우 모두 ${hours(baseline)}입니다.`
      : `구현 속도는 똑같이 ${build.speed}배여도, 구현만 개선하면 ${hours(buildOnlyTotal)}, 다른 단계에도 설정한 배율을 적용하면 ${hours(allStagesTotal)}입니다.`;
  };
  sliders.forEach(input => input.addEventListener('input', updateSimulation));
  document.querySelectorAll('[data-sdlc-preset]').forEach(button => button.addEventListener('click', () => {
    sliders.forEach(input => { input.value = button.dataset.sdlcPreset === 'baseline' ? '1' : input.dataset.exampleSpeed; });
    updateSimulation();
  }));
  if (sliders.length) {
    updateSimulation();
    document.getElementById('simulation-controls').disabled = false;
  }
  const checks = Array.from(document.querySelectorAll('.sdlc-checks input'));
  const updateChecks = () => {
    const done = checks.filter(input => input.checked).length;
    document.getElementById('check-result').textContent = `${done} / ${checks.length} 확인${done === checks.length ? ' · 다른 멤버와 함께 확인을 마쳤습니다.' : ' · 함께 확인한 항목에 체크해 보세요.'}`;
  };
  checks.forEach(input => input.addEventListener('change', updateChecks));
  if (checks.length) updateChecks();
});
