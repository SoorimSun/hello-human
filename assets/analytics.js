/* Cloudflare Web Analytics: 두 HTML 페이지와 Markdown 공통 레이아웃에서 사용합니다. */
(() => {
  'use strict';

  // Web Analytics > Manage site의 JS snippet에 있는 공개 사이트 토큰입니다.
  // 계정 API 토큰을 넣지 마세요. 빈 값이면 방문 정보를 수집하지 않습니다.
  const SITE_TOKEN = '9d93419ae52049cabd13a10620a56d7e';
  const SITE_HOSTNAME = 'soorimsun.github.io';

  // GitHub Pages에서만 집계하며, 로컬 서버와 파일 미리보기는 제외합니다.
  if (!SITE_TOKEN || window.location.hostname !== SITE_HOSTNAME) return;

  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  // 정적 페이지이므로 섹션 이동을 추가 페이지뷰로 측정하지 않습니다.
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: SITE_TOKEN, spa: false }));
  document.body.appendChild(beacon);
})();
