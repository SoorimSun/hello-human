# 헬로우 휴먼 · Workless Engineering Club

사내 동호회 사이트입니다. → https://soorimsun.github.io/hello-human/

## 콘텐츠 올리기 전에 꼭 읽어주세요

이 사이트는 **검색엔진에 노출되지 않도록(noindex)** 설정되어 있습니다.
하지만 **링크를 아는 사람은 누구나 볼 수 있고, 이 리포의 내용도 공개되어 있습니다.**

- 회사명, 실명·연락처, 사내 시스템 이름·URL, 실제 로그·코드·데이터는 올리지 마세요.
- 외부 자료에 공식 한국어 페이지가 있으면 한국어 링크를 우선 사용하세요. `en`을 `ko`로 바꾸기만 하지 말고, 해당 번역 페이지가 실제로 제공되는지 확인합니다.
- 글을 작성할 때 엠대시를 사용하지 않습니다. 굵기나 서체로 이미 구분되는 항목명 뒤에는 콜론 등 별도 구분 기호를 붙이지 않습니다. 그 밖에는 문맥에 맞게 쉼표·괄호를 쓰거나 문장을 나눕니다.
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
| `news/2026-09-29-spatial-ai-efficiency.html` | AI뉴스 두 번째 호: World Labs 인수 계약과 Sonnet 5.5의 효율 |
| `news/2026-09-30-long-running-agents.html` | AI뉴스 세 번째 호: 지속형 에이전트의 실행·권한·비용·책임 |
| `news/2026-10-02-ai-evidence.html` | AI뉴스 네 번째 호: Gemini 4 Argon·추론 추출 공격·SynthID Bio·FTC 조사와 실행 증거 |
| `news/2026-10-03-durable-ai-workflows.html` | AI뉴스 다섯 번째 호: Pi Durable·Barclays·FLUX 3 Image·에이전트 조사, 작업 복구 도식과 공식 편집 전후 비교 |
| `research/2026-10-03-durable-ai-workflows.md` | AI뉴스 05의 공식 출처, 수치·발표일 검증과 편집 판단 |
| `news/2026-10-01-meta-muse-messages.html` | AI뉴스 단신 02: 메타 Muse의 메시지 접근 의혹과 권한·기록 검증 |
| `news/2026-10-02-bank-data-breach.html` | AI뉴스 단신 03: 은행권 정보유출과 AI 사용 정황, 인증·조회 권한·응답 최소화 도식 |
| `case-studies/index.html` | AI 사례연구 소개와 목록 |
| `case-studies/2026-09-27-tidewater.html` | AI 사례연구 첫 호: Tidewater |
| `case-studies/2026-10-01-railcode.html` | AI 사례연구 두 번째 호: Railcode의 시안 탐색·비교 도구와 디자인 판단 |
| `case-studies/2026-10-02-kospimap.html` | AI 사례연구 세 번째 호: KOSPIMAP 3D 단지뷰, 엔진 재사용과 데이터·성능 검증 |
| `guides/index.html` | AI가이드 목록 |
| `guides/2026-09-25-llm-selection.html` | AI가이드 첫 호 |
| `guides/2026-09-30-jev-decisions.html` | AI가이드 두 번째 호: Jev 실습, Clef·Perplexity·Mercury 등 디시전 모델과 리더보드 비교 (10월 2일 갱신) |
| `research/2026-10-02-decision-models.md` | 디시전 모델 업데이트의 공식 출처·사양·평가 조건 조사 메모 |
| `guides/2026-10-01-openai-dots.html` | AI가이드 세 번째 호: OpenAI Dots의 일상 활용 예시·공개 사례와 업무 실습 |
| `guides/2026-10-03-claude-code.html` | AI가이드 네 번째 호: Claude Code CLI·데스크톱 비교와 설치·Opus 5.5 effort·첫 페이지 제작·GitHub Pages 배포·Wayfinder와 Superpowers 개발 과정·ultracode |
| `research/2026-10-03-claude-code.md` | Claude Code CLI·데스크톱·GitHub Pages·Wayfinder·Superpowers의 공식 문서와 저장소 조사 메모 |
| `guides/2026-10-03-codex.html` | AI가이드 다섯 번째 호: Codex 앱·CLI·권한·effort, 요리 페이지 입문과 GitHub Pages 배포, Wayfinder·Superpowers로 결정·설계·계획·TDD·리뷰·검증을 경험하는 인분 계산기 심화 |
| `research/2026-10-03-codex.md` | Codex 공식 문서, 설치·명령·스킬·플러그인과 요리 실습 구성 근거 |
| `insights/index.html` | 커머스 인사이트 목록 |
| `insights/2026-09-25-agentic-commerce.html` | 커머스 인사이트 첫 호 |
| `insights/2026-09-29-recommendation-evidence.html` | 커머스 인사이트 두 번째 글: 추천 에이전트의 근거와 검증 |
| `works/choi-taejun.html` | 회원 최태준의 작업물 소개 |
| `works/sun-soorim.html` | 회원 선수림의 모델별 웹 제작 실험 소개 |
| `assets/style.css` | 공통 스타일 |
| `assets/theme.js` | 시스템·라이트·다크 화면 선택과 브라우저별 설정 저장 |
| `assets/social/hellobot.jpg` | 홈·게임 버전·Markdown 페이지의 공유용 헬로봇 썸네일 (1200×630) |
| `assets/social/hellobot-card.html` | 기존 헬로봇 CSS를 재사용한 썸네일 원본. 1200×630, 1배율로 캡처해 JPEG 갱신 |
| `assets/news.css` | AI뉴스 목록·기사 스타일 |
| `assets/news-spatial.css` | AI뉴스 02의 공간 재구성·로봇 학습·작업 비용 도식 스타일 |
| `assets/news-agents.css` | AI뉴스 03의 지속 작업·실행 통제·팀 공유·쿠폰 검증 도식 스타일 |
| `assets/news-evidence.css` | AI뉴스 04의 작업 흐름·사건 타임라인·출처 표시·실행 기록 도식 스타일 |
| `assets/news-workflows.css`, `assets/news-workflows.js` | AI뉴스 05의 복구·업무·권한 도식과 접근 가능한 이미지 비교 슬라이더 |
| `assets/news/workflows-media.md` | AI뉴스 05의 공식 Pi 화면과 FLUX 편집 전후 이미지 출처 |
| `assets/news-security.css` | AI뉴스 단신 03의 피해 현황·접근 경로·세 방어선·해외 사례 비교 도식 스타일 |
| `assets/news-sections.css` | 홈페이지의 속보 띠·일반 뉴스 카드와 뉴스 목록의 유형별 구분 스타일 |
| `assets/news/` | AI뉴스 기사 삽화와 출처가 표시된 제품 발표 이미지 |
| `assets/guide.css` | AI가이드 본문 스타일 |
| `assets/guide-jev.css` | AI가이드 02의 역할 분담·공개 사례·처리 경로 도식 스타일 |
| `assets/guide-claude-code.css` | AI가이드 04의 하네스·권한·실습·개발 과정·컨텍스트 도식 스타일 |
| `assets/guide-codex.css` | AI가이드 05의 요리 작업대·입문/심화·인분 계산·개발 과정 도식 스타일 |
| `assets/guides/codex/` | Codex 실습용 recipe.md·AGENTS.md·심화 요구사항 advanced-brief.md |
| `assets/guides/claude-code/` | 가상 모임 안내 기본·심화 실습 입력과 다운로드용 CLAUDE.md 예시 |
| `assets/guides/jev-request.json` | 가상 고객 문의로 Choice·Score·Noul을 호출하는 다운로드용 실습 입력 |
| `assets/case-studies.css` | AI 사례연구 소개 카드·목록·본문 시각화 스타일 |
| `assets/case-railcode.css` | 사례연구 02의 배송지연 주문 화면 A·B·C 시안 스타일 |
| `assets/case-kospimap.css` | 사례연구 03의 데이터·성능 도식, 배송 위험 시간대 전환, 픽업 시간 비교, 건물 접근·AI 역할 도식 |
| `assets/case-studies/` | 실제 게임·웹사이트 캡처와 출처가 표시된 사례 이미지 |
| `assets/insights.css` | 커머스 인사이트 시각화 스타일 |
| `assets/insight-evidence.css` | 인사이트 02의 구매 사례·검수 화면·아키텍처 도식 스타일 |
| `assets/article-toc.js` | AI뉴스·AI 사례연구·AI가이드·커머스 인사이트 스크롤 위치에 맞춘 목차 표시 |
| `assets/content-updates.js` | 발행 목록과 본문 변경 감지, 메뉴·카드의 New/Updated 표시 |
| `assets/content-update-state.js` | 목록·글별 확인 기록과 갱신 판정 |
| `assets/content-updates.css` | 메뉴·카드의 New/Updated 배지 스타일 |
| `assets/showcase.css` | 회원 작업물 페이지와 기본 페이지 소개 카드 스타일 |
| `assets/benchmark.css` | 모델별 실험 갤러리 스타일 |
| `assets/benchmarks/` | 배포된 실험 페이지의 미리보기 이미지 |
| `assets/analytics.js` | Cloudflare Web Analytics 토큰과 수집 설정 |
| `_layouts/default.html` | Markdown 페이지 공통 레이아웃 (noindex 포함) |
| `_config.yml` | Jekyll 설정 |

## 화면 모드

홈·목록·글·작업물 페이지 상단의 해·달 아이콘 토글로 라이트·다크를 전환할 수 있습니다. 처음 방문하면 기기의 화면 설정을 따르며, 직접 전환하기 전까지 시스템 설정 변경도 반영합니다. 토글로 선택한 모드는 현재 브라우저에 저장되어 새로고침과 페이지 이동 후에도 유지됩니다. 저장소가 차단된 환경에서는 현재 페이지에서만 유지됩니다.

새 HTML 페이지는 공통 CSS 앞에 `assets/theme.js?v=3`를 포함하세요. Markdown 페이지는 공통 레이아웃에서 자동으로 불러옵니다.

## 새 콘텐츠와 수정 표시

**AI뉴스·가이드·인사이트·사례연구·작업물** 메뉴와 그 안의 콘텐츠 링크에만 `New`(처음 확인할 내용), `Updated`(확인한 뒤 수정된 내용)를 표시합니다. 모임 소개·Workless·실험·운영 방식·모집 안내 같은 고정 영역은 표시 대상에서 제외합니다. 목록을 열거나 홈 메뉴로 해당 영역에 이동하면 메뉴의 표시가 사라집니다. 개별 글의 표시는 그 글을 열 때 사라집니다. 목록 확인만으로 글 전체가 읽음 처리되지는 않습니다.

- 확인 기록은 로그인 없이 **현재 브라우저의 로컬 저장소**에만 남습니다. 다른 기기·브라우저와 동기화하지 않으며, 사이트 데이터를 삭제하면 초기화됩니다. 저장소가 차단된 환경에서는 페이지를 벗어난 뒤 확인 기록이 유지되지 않을 수 있습니다.
- 페이지를 열 때 발행 목록과 본문 HTML을 조회해 변경을 비교합니다. 현재 사이트 규모에 맞춘 정적 사이트 방식으로, 별도 서버·빌드 단계·수정일 입력이 필요하지 않습니다. 목록과 글을 같은 배포에 포함하세요. 요청에 실패한 목록은 확인 처리하지 않습니다.
- AI뉴스·가이드·인사이트·사례연구는 각 목록에 연결된 글을 자동으로 찾고, 작업물은 홈의 작업물 영역에 연결된 페이지를 찾습니다. 새 글도 기존 방식대로 목록에 링크하면 됩니다. 새 콘텐츠 종류를 만들면 `content-updates.js`의 `collections`에 목록 경로와 홈 영역 ID를 추가하세요.
- 본문·도식 HTML·링크·이미지 경로 등의 변경을 감지합니다. 공통 메뉴·스크립트·CSS 변경만으로 모든 글을 수정 표시하지는 않습니다. 이미지 파일을 같은 경로로 교체할 때는 이미지 URL에 버전(`?v=2`)을 붙여 변경이 감지되게 하세요.
- 새 HTML 페이지는 기존 페이지처럼 `content-updates.css`와 `content-updates.js`를 포함하세요. Markdown 페이지는 공통 레이아웃에서 자동으로 불러옵니다. 이 기능의 CSS·JS를 변경하면 해당 파일의 `?v=`도 갱신하세요.
- 전체 동작 테스트: `node --test` (외부 패키지 설치 불필요). 브라우저에서는 메뉴 확인 → 개별 글 확인 → 돌아가기 → 새로고침과 모바일 배치를 확인합니다.

## AI뉴스 발행하기

AI뉴스는 발행 주기를 정하지 않고, 새 소식이 있을 때 정적 HTML 페이지를 추가합니다.

1. `news/2026-09-25-ai-agents.html`을 복사해 `news/YYYY-MM-DD-주제.html`을 만듭니다. 제목·설명·날짜·호수와 기사 내용을 바꾸고, `<meta name="robots" content="noindex, nofollow, noarchive">`를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 공식 발표와 원문 링크를 기사 안에 넣고, 발표 사실·기업 자체 평가·우리의 해석을 구분합니다. 출시 예정이나 진행 중인 사건은 확인 날짜를 적습니다.
3. `news/index.html`의 해당 유형(일반 뉴스 또는 속보·단신) 목록 맨 위에 새 글을 추가하고, 유형별 편수와 전체 편수를 갱신합니다. 일반 뉴스는 `ISSUE`, 속보·단신은 `BRIEF` 번호를 각각 이어갑니다. 홈페이지 `index.html`의 `#ai-news`에서는 속보 띠와 일반 뉴스 카드를 각각 해당 유형의 최신 글로 갱신합니다.
4. 로컬에서 목록·기사·홈 링크와 모바일 화면을 확인한 뒤 배포합니다. `assets/style.css`, `assets/news.css`, `assets/news-sections.css`를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## AI 사례연구 발행하기

AI 사례연구는 공개된 AI 결과물과 구현 과정을 살펴보고, 확인 범위와 우리 실험에 가져갈 교훈을 비정기적으로 발행합니다.

1. `case-studies/2026-09-27-tidewater.html`을 참고해 `case-studies/YYYY-MM-DD-주제.html`을 만듭니다. 제목·부제·날짜·사례 번호를 바꾸고 `noindex` 메타 태그를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 직접 체험한 내용, 공개 코드·문서에서 확인한 사실, 제작자 주장과 우리의 해석을 구분합니다. 성능을 재측정하지 않았다면 제작자 기록임을 적고, 코드·변경 기록은 가능하면 확인 당시 커밋으로 연결합니다.
3. 결과물 사이트와 공개 소스 링크를 넣습니다. 본문에 실제 화면이나 영상을 배치하고 원작·출처·캡처 날짜를 표기합니다. 이미지는 `assets/case-studies/`에 저장하고 해당 폴더의 `README.md`에 출처를 남깁니다.
4. `case-studies/index.html`의 목록 맨 위에 새 글을 추가하고 편수를 갱신합니다. 홈페이지 `index.html`의 `#ai-case-studies` 카드도 최신 글로 바꿉니다.
5. 홈·목록·본문·결과물 링크와 모바일 화면을 확인한 뒤 배포합니다. `assets/case-studies.css`를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## AI가이드 발행하기

AI가이드는 발행 주기를 정하지 않고, 실제 업무에 적용할 만한 방법이 정리됐을 때 정적 HTML 페이지를 추가합니다.

1. `guides/2026-09-25-llm-selection.html`을 참고해 `guides/YYYY-MM-DD-주제.html`을 만듭니다. 제목·설명·날짜·가이드 번호와 내용을 바꾸고 `noindex` 메타 태그를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 공개 저장소에 올릴 수 없는 회사명, 내부 시스템 이름·URL, 실제 로그·코드·데이터는 일반화하거나 익명화합니다. 외부 서비스의 기능 설명과 평가 수치는 공식 자료를 확인하고 링크합니다.
3. `guides/index.html`의 목록 맨 위에 새 가이드를 추가하고 개수를 갱신합니다. `index.html`의 `#ai-guides` 카드도 최신 글로 바꿉니다.
4. 로컬에서 목록·본문·홈 링크와 모바일 화면을 확인한 뒤 배포합니다. CSS를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## 커머스 인사이트 발행하기

커머스 인사이트는 AI를 커머스 제품에 적용할 때의 기회와 설계를 비정기적으로 살펴봅니다.

1. `insights/2026-09-25-agentic-commerce.html`을 참고해 `insights/YYYY-MM-DD-주제.html`을 만듭니다. 제목·부제·날짜·호수와 내용을 바꾸고 `noindex` 메타 태그를 유지합니다. 목차 링크와 본문 절의 `id`를 맞추고 `article-toc.js`를 유지합니다.
2. 발표된 기능과 표준의 설계안, 헬로우 휴먼의 제품 제안을 구분합니다. 기능·수치·규격은 공식 자료를 확인하고 본문 가까이에 링크합니다. 공개 저장소에 올릴 수 없는 회사명, 내부 시스템과 실제 데이터는 일반화합니다.
3. `insights/index.html`의 목록 맨 위에 새 글을 추가하고 개수를 갱신합니다. `index.html`의 `#commerce-insights` 카드도 최신 글로 바꿉니다.
4. 로컬에서 홈·목록·본문 링크와 모바일 화면을 확인한 뒤 배포합니다. CSS를 바꾸면 이를 불러오는 페이지의 `?v=` 값도 올립니다.

## 모델별 웹 제작 실험 갤러리

`works/sun-soorim.html`은 `https://soorimsun.github.io/prompt-test/`에 배포된 모델별 HTML로 연결합니다. 실제 결과 HTML은 이 저장소에 복사하지 않습니다. `assets/benchmarks/`에는 각 페이지의 첫 화면을 저장했습니다. 기존 8편은 2026-09-21, MiMo 2.6 Flash와 Grok 4.7은 2026-09-22, Opus 5.5와 GPT-6 Sol은 2026-09-23, Sonnet 5.5는 2026-09-29, GPT-6.1 Sol은 2026-09-30, Space Bunny Free와 LongCat 2.5 Preview는 2026-10-01에 캡처했습니다. 원본 결과가 바뀌면 미리보기와 소개도 함께 갱신하세요.

공통 프롬프트와 한 번의 요청 조건은 제작자가 제공한 내용입니다. 소요 시간은 제작자의 기억에 따른 대략적인 값이며, Ling 3.0 Flash는 제작자가 알려준 ‘50초 미만’으로 표시했습니다.

Opus 5.5, Sonnet 5.5, GPT-6.1 Sol, GPT-6 Sol, Space Bunny Free, LongCat 2.5 Preview의 소요 시간과 토큰은 각 폴더의 `benchmark.html`(작업 로그 기반 보고서)에서 옮겼으며, 실험 페이지의 ‘시간 · 토큰 벤치’ 표와 보고서 링크로 연결합니다. 보고서 수치가 바뀌면 표와 카드의 소요 시간을 함께 고치세요.

앨리스 카드와 소요 시간 표는 모델 체급순으로 놓고, 같은 체급 안에서는 출시일이 최근인 모델부터 둡니다. 같은 세대의 경량 모델은 체급과 관계없이 바로 뒤에 이어 붙입니다(예: GLM 5.3 → GLM 5.3 Flash). 현재 기준은 최상위(GPT-6 Astra, Fable 5.1) → 플래그십(Opus 5.5, Sonnet 5.5, GPT-6.1 Sol, GPT-6 Sol, Grok 4.7, Muse Spark 1.3, GLM 5.3, GLM 5.3 Flash, Opus 5) → 경량(MiMo 2.6 Flash, Ling 3.0 Flash)입니다. OpenCode의 무료 제공 모델로 실행한 결과(Space Bunny Free, LongCat 2.5 Preview)는 체급순에 넣지 않고 맨 끝에 추가한 순서대로 둡니다. LongCat 2.5 Preview는 prompt-test의 `longcat-2.5-preview-free` 폴더(OpenCode 무료 제공판으로 실행)를 가리키며, 미리보기 파일은 `longcat-2.5-preview.jpg`입니다. 새 모델을 추가할 때도 이 순서를 따르세요.
