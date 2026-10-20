# RAMPAGE 2026 작업물 소개 확인

- 확인일: 2026-10-20 (한국시간).
- 요청: 최태준 회원의 새 게임을 분석해 작업물 소개에 추가. 푸시하지 않음.
- 서비스: https://rampage2026.onrender.com/
- 저장소: https://github.com/fdx5/rampage2026
- 확인 커밋: `2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a`.
- 반영 대상: `works/choi-taejun.html`, 홈의 회원 작업물 카드, 6개 항목 목차, 실제 화면과 출처 기록.

## 확인한 기능과 근거

| 내용 | 근거 | 소개 범위 |
| --- | --- | --- |
| 1986년 Bally Midway Rampage의 개인 웹 리메이크 | [README](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/README.md) | 공식 후속작·공식 리메이크라고 쓰지 않음 |
| 건물 등반·펀치·붕괴, 음식 회복, 군인·헬기·탱크 | [게임 규칙](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/README.md#게임-규칙-원작-기준), [world.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/js/game/world.js) | 첫 도시 화면을 확인했으며 전체 적·진행을 모두 실측한 것은 아님 |
| GEORGE·LIZZIE·RALPH, 최대 3인 로컬 동시 플레이 | [input.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/js/input.js), 배포 화면 | 2·3 키로 동시 참가 확인. 온라인 멀티플레이로 표현하지 않음 |
| PC 키보드·게임패드, 모바일 가로 화면·터치 | README의 조작·모바일 절, input.js, [main.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/js/main.js) | 키보드는 직접 확인. 게임패드·실제 모바일 기기 테스트는 하지 않음 |
| 85개 도시 순환 | [data.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/js/data.js), main.js의 `CITIES[(this.day - 1) % CITIES.length]` | 도시 목록 수이며 고유 설계 스테이지 85개나 전체 완료 검증을 뜻하지 않음. 원작 힌트의 768일을 이 게임의 스테이지 수로 사용하지 않음 |
| 스테이지 시작 시 저장·이어하기·도달한 스테이지 선택 | [save.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/js/save.js), main.js, 타이틀 메뉴 | 브라우저 localStorage 저장. 계정 동기화나 서버 저장이라고 쓰지 않음 |
| Canvas 2D·ES 모듈·Web Audio, 의존성 없는 Node 정적 서버 | main.js의 `getContext('2d')`, [package.json](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/package.json), [server.js](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/server.js) | 기존 회원 게임과 달리 Three.js 기반 3D 게임으로 소개하지 않음. Render 플랜은 확인되지 않아 적지 않음 |
| V 그래픽 전환·T 사운드 테스트·M 음소거 | README의 조작 절, main.js | 코드·문서에서 확인한 기능 |
| REA를 통한 원작 코드·함수 분석 | [REA 사용 기록](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/README.md#rea를-사용했나요), [Rizin 실행 래퍼](https://github.com/fdx5/rampage2026/blob/2fcad4e3e0e9fd9317a650db95fb7ba6afb5fe4a/tools/re/rea_rz.sh) | 제작자가 REA 활용을 확인해 소개에 명시. REA의 Rizin provider로 Z80 디스어셈블·함수 탐색을 수행했으며, 결과 해석과 MAME 동적 분석·사운드 녹음은 별도 과정으로 구분 |
| 원작 분석·새 그래픽 제작 | README의 역분석 과정·그래픽 절 | 제작자 기록으로 귀속. RealVisXL(SDXL)로 생성한 괴물 머리, 코드로 그린 몸·건물·배경을 소개. 사운드는 AI 생성물이 아닌 원작 출력 녹음으로 구분 |

## 화면과 편집 판단

- 배포된 게임에서 타이틀 → 새 게임 → DAY 1 PEORIA → 2P·3P 참가 → 일시정지 → 타이틀 복귀를 확인했다.
- PC 뷰포트 1280×720에서 타이틀과 플레이 화면을 JPEG로 저장했다. 파일별 설명은 `assets/works/README.md`에 기록했다.
- 페이지의 모든 게임이 3D라는 인상을 피하도록 상단의 “3D 게임까지”를 “브라우저 게임까지”로 수정했다.
- 프로젝트 총수는 여섯 편, 게임은 다섯 편으로 맞췄다. 과거 뉴스레터의 당시 소개 내용은 유지했다.
- 코딩 모델명이나 개발 기간은 확인할 수 없어 새 프로젝트의 사실 항목에 넣지 않았다.
- 후속 요청에 따라 사실 표에 REA + Rizin을 추가하고, 제작 과정에서 REA의 구체적인 역할과 근거 링크를 설명했다. REA가 게임 전체를 자동 변환했다거나 Ghidra로 Z80을 직접 분석했다는 표현은 쓰지 않았다.
- 원작 ROM이나 사운드 파일은 이 사이트에 복사하지 않았다. 소개용 실제 화면 두 장과 게임·소스 링크를 추가했다.
