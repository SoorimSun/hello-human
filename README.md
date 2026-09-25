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

기본 페이지, 게임 페이지, 회원 작업물 페이지, Markdown 공통 레이아웃이 같은 스크립트를 사용합니다. 각 페이지에 Cloudflare 스크립트를 중복으로 붙이지 마세요. `spa: false`로 설정해 페이지 안의 섹션 이동을 추가 페이지뷰로 측정하지 않습니다. `assets/analytics.js`를 수정하면 이 스크립트를 불러오는 모든 HTML 파일의 `?v=` 값도 함께 올려 캐시를 갱신하세요.

**Visits는 고유 방문자 수가 아닌 방문 횟수입니다.** 외부 사이트나 직접 링크로 들어온 방문을 세며, 한 번의 방문에서 여러 페이지뷰가 발생할 수 있습니다. 광고 차단 확장 프로그램 등으로 분석 스크립트가 차단된 방문은 누락될 수 있습니다.

설치 확인은 브라우저 개발자 도구의 Network에서 `beacon.min.js`와 `cloudflareinsights.com/cdn-cgi/rum` 요청을 확인하면 됩니다. 로컬에서는 요청이 발생하지 않는 것이 정상입니다. 데이터는 적용 이후부터 쌓입니다.

공식 안내: [설치 방법](https://developers.cloudflare.com/web-analytics/get-started/), [지표의 의미](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/), [기간과 필터](https://developers.cloudflare.com/web-analytics/configuration-options/filters/), [SPA 측정 설정](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/).

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | 소개 페이지 (사이트 첫 화면) |
| `news/index.html` | AI뉴스 목록 |
| `news/2026-09-25-ai-agents.html` | AI뉴스 첫 호 |
| `guides/index.html` | AI가이드 목록 |
| `guides/2026-09-25-llm-selection.html` | AI가이드 첫 호 |
| `works/choi-taejun.html` | 회원 최태준의 작업물 소개 |
| `works/sun-soorim.html` | 회원 선수림의 모델별 웹 제작 실험 소개 |
| `assets/style.css` | 공통 스타일 |
| `assets/news.css` | AI뉴스 목록·기사 스타일 |
| `assets/news/` | AI뉴스 기사 삽화와 출처가 표시된 제품 발표 이미지 |
| `assets/guide.css` | AI가이드 본문 스타일 |
| `assets/article-toc.js` | AI뉴스·AI가이드 스크롤 위치에 맞춘 목차 표시 |
| `assets/showcase.css` | 회원 작업물 페이지와 기본 페이지 소개 카드 스타일 |
| `assets/benchmark.css` | 모델별 실험 갤러리 스타일 |
| `assets/benchmarks/` | 배포된 실험 페이지의 미리보기 이미지 |
| `assets/analytics.js` | Cloudflare Web Analytics 토큰과 수집 설정 |
| `_layouts/default.html` | Markdown 페이지 공통 레이아웃 (noindex 포함) |
| `_config.yml` | Jekyll 설정 |

## AI뉴스 발행하기

AI뉴스는 발행 주기를 정하지 않고, 새 소식이 있을 때 정적 HTML 페이지를 추가합니다.

1. `news/2026-09-25-ai-agents.html`을 복사해 `news/YYYY-MM-DD-주제.html`을 만듭니다. 제목·설명·날짜·호수와 기사 내용을 바꾸고, `<meta name="robots" content="noindex, nofollow, noarchive">`를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 공식 발표와 원문 링크를 기사 안에 넣고, 발표 사실·기업 자체 평가·우리의 해석을 구분합니다. 출시 예정이나 진행 중인 사건은 확인 날짜를 적습니다.
3. `news/index.html`의 발행 목록 맨 위에 새 호를 추가하고 호수를 갱신합니다. `index.html`의 `#ai-news` 카드도 최신 호로 바꿉니다.
4. 로컬에서 목록·기사·홈 링크와 모바일 화면을 확인한 뒤 배포합니다. `assets/style.css`나 `assets/news.css`를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## AI가이드 발행하기

AI가이드는 발행 주기를 정하지 않고, 실제 업무에 적용할 만한 방법이 정리됐을 때 정적 HTML 페이지를 추가합니다.

1. `guides/2026-09-25-llm-selection.html`을 참고해 `guides/YYYY-MM-DD-주제.html`을 만듭니다. 제목·설명·날짜·가이드 번호와 내용을 바꾸고 `noindex` 메타 태그를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 공개 저장소에 올릴 수 없는 회사명, 내부 시스템 이름·URL, 실제 로그·코드·데이터는 일반화하거나 익명화합니다. 외부 서비스의 기능 설명과 평가 수치는 공식 자료를 확인하고 링크합니다.
3. `guides/index.html`의 목록 맨 위에 새 가이드를 추가하고 개수를 갱신합니다. `index.html`의 `#ai-guides` 카드도 최신 글로 바꿉니다.
4. 로컬에서 목록·본문·홈 링크와 모바일 화면을 확인한 뒤 배포합니다. CSS를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## 모델별 웹 제작 실험 갤러리

`works/sun-soorim.html`은 `https://soorimsun.github.io/prompt-test/`에 배포된 모델별 HTML로 연결합니다. 실제 결과 HTML은 이 저장소에 복사하지 않습니다. `assets/benchmarks/`에는 각 페이지의 첫 화면을 저장했습니다. 기존 8편은 2026-09-21, MiMo 2.6 Flash와 Grok 4.7은 2026-09-22, Opus 5.5와 GPT-6 Sol은 2026-09-23에 캡처했습니다. 원본 결과가 바뀌면 미리보기와 소개도 함께 갱신하세요.

공통 프롬프트와 한 번의 요청 조건은 제작자가 제공한 내용입니다. 소요 시간은 제작자의 기억에 따른 대략적인 값이며, Ling 3.0 Flash는 제작자가 알려준 ‘50초 미만’으로 표시했습니다.

Opus 5.5와 GPT-6 Sol의 소요 시간과 토큰은 각 폴더의 `benchmark.html`(작업 로그 기반 보고서)에서 옮겼으며, 실험 페이지의 ‘시간 · 토큰 벤치’ 표와 보고서 링크로 연결합니다. 보고서 수치가 바뀌면 표와 카드의 소요 시간을 함께 고치세요.

앨리스 카드와 소요 시간 표는 모델 체급순으로 놓고, 같은 체급 안에서는 출시일이 최근인 모델부터 둡니다. 같은 세대의 경량 모델은 체급과 관계없이 바로 뒤에 이어 붙입니다(예: GLM 5.3 → GLM 5.3 Flash). 현재 기준은 최상위(GPT-6 Astra, Fable 5.1) → 플래그십(Opus 5.5, GPT-6 Sol, Grok 4.7, Muse Spark 1.3, GLM 5.3, GLM 5.3 Flash, Opus 5) → 경량(MiMo 2.6 Flash, Ling 3.0 Flash)입니다. 새 모델을 추가할 때도 이 순서를 따르세요.
