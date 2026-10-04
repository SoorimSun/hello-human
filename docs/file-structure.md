# 파일 구성

사이트의 폴더별 역할과 공통 파일을 정리합니다. 코드로 표시한 경로는 프로젝트 루트 기준입니다. 개별 글은 각 목록 페이지에서 찾고, 이 문서는 폴더 구조나 공통 기능이 바뀔 때 갱신합니다.

## 페이지와 문서

| 경로 | 역할 |
| --- | --- |
| [index.html](../index.html) | 모임 소개, 분야별 최신 글, 회원 작업물을 보여주는 첫 화면 |
| [jobsim.html](../jobsim.html) | 게임 버전 소개 페이지 |
| [newsletters/](../newsletters/index.html) | 뉴스레터 소개와 지난 호 목록, 호별 본문 |
| [news/](../news/index.html) | AI 일반뉴스와 속보·단신 목록, 기사 본문 |
| [guides/](../guides/index.html) | AI 도구 활용과 실습 가이드 목록, 본문 |
| [case-studies/](../case-studies/index.html) | 공개 AI 결과물과 제작 과정의 사례연구 목록, 본문 |
| [insights/](../insights/index.html) | 커머스 인사이트 목록, 본문 |
| [works/](../works/) | 회원별 작업물 소개와 모델별 웹 제작 실험 갤러리 |
| [research/](../research/) | 글별 공식 출처, 사실 확인, 수치·날짜·평가 조건과 편집 판단 |
| [assets/](../assets/) | 공통·글별 CSS와 JavaScript, 이미지, 출처 기록과 실습 입력 |
| [docs/](./) | 파일 구성, 콘텐츠 발행과 사이트 운영 지침 |
| [_layouts/default.html](../_layouts/default.html) | Markdown 페이지 공통 레이아웃과 noindex 설정 |
| [_config.yml](../_config.yml) | Jekyll의 사이트 경로, 레이아웃과 배포 제외 설정 |
| [tests/](../tests/) | 콘텐츠 확인 기록과 갱신 판정 테스트 |
| [package.json](../package.json) | 프로젝트 설정과 테스트 명령 |

`README.md`와 `docs/`는 저장소에서 읽는 운영 문서이며, Jekyll 사이트 배포 대상에서 제외합니다.

## 콘텐츠 파일 이름과 목록

- 뉴스레터·뉴스·가이드·사례연구·인사이트 본문은 각 폴더에 `YYYY-MM-DD-주제.html`로 저장합니다. 날짜는 최초 발행일을 사용합니다.
- 각 폴더의 `index.html`에서 발행 목록과 편수를 관리합니다. 새 글을 발행하면 해당 목록과 홈의 최신 글 카드를 함께 갱신합니다.
- 회원 작업물 소개는 `works/회원명.html`로 관리하고, 홈의 회원 작업물 영역에서 연결합니다.
- 조사 메모는 `research/YYYY-MM-DD-주제.md`로 남깁니다. 본문과 함께 근거를 찾을 수 있도록 주제를 맞춥니다.
- 글별 스타일과 동작은 `assets/news-*.css`, `assets/guide-*.css`, `assets/case-*.css`, `assets/insight-*.css`와 필요한 `.js` 파일에 둡니다. 새 글이 기존 스타일로 충분하면 파일을 추가하지 않습니다.
- 이미지와 실습 입력은 `assets/news/`, `assets/guides/`, `assets/case-studies/` 등 해당 분야 폴더에 둡니다. 이미지의 출처와 캡처 날짜는 해당 폴더의 `README.md`나 `*-media.md`에 기록합니다.

분야별 번호·정렬·검증 절차는 [콘텐츠 발행 지침](publishing.md)을 따릅니다.

## 공통 스타일과 기능

| 파일 | 역할 |
| --- | --- |
| `assets/style.css` | 사이트 공통 스타일과 뉴스레터 진입점 숨김 설정 |
| `assets/theme.js` | 시스템·라이트·다크 화면 선택과 브라우저별 설정 저장 |
| `assets/news.css`, `assets/news-sections.css` | AI뉴스 목록·기사와 홈의 뉴스 영역 |
| `assets/newsletter.css` | 뉴스레터 추천 글·전체 목록·홈 카드 |
| `assets/guide.css` | AI가이드 본문 |
| `assets/case-studies.css` | 사례연구 소개 카드·목록·본문 시각화 |
| `assets/insights.css` | 커머스 인사이트 시각화 |
| `assets/showcase.css` | 회원 작업물 페이지와 홈 소개 카드 |
| `assets/benchmark.css`, `assets/benchmarks/` | 모델별 실험 갤러리 스타일과 배포된 실험의 미리보기 이미지 |
| `assets/article-toc.js` | 뉴스·사례연구·가이드·인사이트의 스크롤 위치에 맞춘 목차 표시 |
| `assets/content-updates.js` | 발행 목록과 본문 변경 감지, 메뉴·카드의 New/Updated 표시 |
| `assets/content-update-state.js` | 목록·글별 확인 기록과 갱신 판정 |
| `assets/content-updates.css` | New/Updated 배지 스타일 |
| `assets/analytics.js` | Cloudflare Web Analytics 토큰과 수집 설정 |
| `assets/social/hellobot.jpg` | 홈·게임 버전·Markdown 페이지의 공유용 헬로봇 썸네일 |
| `assets/social/hellobot-card.html` | 헬로봇 CSS를 재사용한 썸네일 원본 |

공유용 썸네일을 갱신할 때는 `hellobot-card.html`을 1200×630, 1배율로 캡처해 `hellobot.jpg`에 반영합니다. 공통 CSS·JavaScript 변경 시 이를 불러오는 페이지의 `?v=`도 함께 올립니다. 화면 모드와 갱신 표시의 세부 동작은 [사이트 운영 지침](site-operations.md)에 있습니다.

[README로 돌아가기](../README.md) · [콘텐츠 발행 지침](publishing.md) · [사이트 운영 지침](site-operations.md)
