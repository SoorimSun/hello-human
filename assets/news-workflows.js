const comparison = document.querySelector('#sofa-comparison');
const slider = document.querySelector('#sofa-split');
const control = document.querySelector('.workflow-compare-control');

if (comparison && slider && control) {
  const updateComparison = () => {
    comparison.style.setProperty('--split', `${slider.value}%`);
    slider.setAttribute('aria-valuetext', `편집 후 이미지 ${slider.value}% 표시`);
  };
  comparison.classList.add('is-enhanced');
  control.hidden = false;
  slider.addEventListener('input', updateComparison);
  updateComparison();
}
