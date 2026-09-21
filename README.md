# 헬로우 휴먼 · Workless Engineering Club

사내 동호회 사이트입니다. → https://soorimsun.github.io/hello-human/

## 콘텐츠 올리기 전에 꼭 읽어주세요

이 사이트는 **검색엔진에 노출되지 않도록(noindex)** 설정되어 있습니다.
하지만 **링크를 아는 사람은 누구나 볼 수 있고, 이 리포의 내용도 공개되어 있습니다.**

- 회사명, 실명·연락처, 사내 시스템 이름·URL, 실제 로그·코드·데이터는 올리지 마세요.
- 새 페이지는 `.md` 파일로 올리면 됩니다. `_layouts/default.html`이 자동으로 적용되어 noindex가 붙습니다.
- `.html` 파일을 직접 만들 때는 `<head>`에 아래 태그를 반드시 넣어주세요.

  ```html
  <meta name="robots" content="noindex, nofollow, noarchive">
  ```

## 방문 추이 확인 (Cloudflare Web Analytics)

GitHub Pages에 분석 스크립트를 직접 연결합니다. DNS나 호스팅을 옮길 필요는 없습니다.

1. [Cloudflare 대시보드](https://dash.cloudflare.com/)에서 **Web Analytics → Add a site**를 선택합니다.
2. 호스트 이름에 `soorimsun.github.io`를 입력합니다. `https://`나 `/hello-human/` 경로는 넣지 않습니다.
3. **Manage site → JS snippet**의 `data-cf-beacon` 안에 있는 `token` 값을 `assets/analytics.js`의 `SITE_TOKEN`에 넣습니다. 계정 API 토큰이 아닌, HTML에 공개하는 사이트 식별용 토큰입니다.
4. 변경을 GitHub Pages 배포 브랜치에 반영하고 배포가 완료되면 사이트를 방문합니다. 대시보드에 표시되기까지 몇 분 걸릴 수 있습니다.
5. **Web Analytics → 해당 사이트**에서 기간을 바꾸며 **Visits**와 **Page views** 추이를 확인합니다. **Path**로 `/hello-human/`과 `/hello-human/jobsim.html`을 구분하고, 유입 사이트와 기기별 내역도 볼 수 있습니다.

`SITE_TOKEN`이 비어 있으면 수집하지 않습니다. 토큰 설정 후에도 `soorimsun.github.io`에서만 수집하므로 로컬 서버와 파일 미리보기는 집계되지 않습니다. 커스텀 도메인으로 바꿀 때는 Cloudflare의 등록 호스트와 `SITE_HOSTNAME`을 함께 수정하세요.

기본 페이지, 게임 페이지, Markdown 공통 레이아웃이 같은 스크립트를 사용합니다. 각 페이지에 Cloudflare 스크립트를 중복으로 붙이지 마세요. `spa: false`로 설정해 페이지 안의 섹션 이동을 추가 페이지뷰로 측정하지 않습니다. `assets/analytics.js`를 수정하면 세 HTML 파일의 `?v=` 값도 함께 올려 캐시를 갱신하세요.

**Visits는 고유 방문자 수가 아닌 방문 횟수입니다.** 외부 사이트나 직접 링크로 들어온 방문을 세며, 한 번의 방문에서 여러 페이지뷰가 발생할 수 있습니다. 광고 차단 확장 프로그램 등으로 분석 스크립트가 차단된 방문은 누락될 수 있습니다.

설치 확인은 브라우저 개발자 도구의 Network에서 `beacon.min.js`와 `cloudflareinsights.com/cdn-cgi/rum` 요청을 확인하면 됩니다. 로컬에서는 요청이 발생하지 않는 것이 정상입니다. 데이터는 적용 이후부터 쌓입니다.

공식 안내: [설치 방법](https://developers.cloudflare.com/web-analytics/get-started/), [지표의 의미](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/), [기간과 필터](https://developers.cloudflare.com/web-analytics/configuration-options/filters/), [SPA 측정 설정](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/).

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | 소개 페이지 (사이트 첫 화면) |
| `assets/style.css` | 공통 스타일 |
| `assets/analytics.js` | Cloudflare Web Analytics 토큰과 수집 설정 |
| `_layouts/default.html` | Markdown 페이지 공통 레이아웃 (noindex 포함) |
| `_config.yml` | Jekyll 설정 |
