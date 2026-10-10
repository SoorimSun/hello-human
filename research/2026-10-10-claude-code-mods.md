# Claude Code Mods 가이드 확인 메모

- 확인일: 2026-10-10 (한국시간)
- 결과물: `guides/2026-10-10-claude-code-mods.html`, GUIDE 08
- 사용자가 지정한 채팅의 가이드 초안을 바탕으로 공식 문서·공개 샘플을 재확인하고 사이트 형식으로 편집했다.
- 원고의 내부 업무명은 일반적인 커머스 개발 예시로 바꿨다. 비공개 채팅 URL 및 회사 내부 정보는 본문에 넣지 않았다.
- 초안은 로컬에서 작성·검증했고, 최종 수정 확인 후 사용자가 커밋·푸시를 요청했다.

## 출처와 확인 사항

| 공식 출처 | 확인 내용 |
| --- | --- |
| [Customize Claude Code with mods](https://claude.com/resources/articles/claude-code-mods) | 발표일 2026-10-01, 이벤트 처리·UI 확장, `/diff`, 샌드박스 미격리, 조직 설정과 `sec-default`의 적용 조건 |
| [Getting started with Claude Code mods](https://claude.dev/blog/getting-started-with-claude-code-mods/) | 세 가지 샘플·공식 영상, `register`, `$`/`e`/`next`, `$.state`와 타입 계약, `claude plugin test`, 재로드 |
| [샘플 저장소의 Mods 폴더](https://github.com/anthropics/claude-code-playground/tree/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods) | 2.1.287 이상에서 기본 로드, 정확한 clone/cd 경로, `--plugin-dir`, 공급처 이름 `claude-code-playground-mods` |
| [Token Weather](https://github.com/anthropics/claude-code-playground/tree/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/token-weather) | 별도 모델 호출 없음, 메인 턴 완료 시 사용량 갱신, 사용 한도와 다른 지표, 초기 0%, 자동 압축 분모 차이, 재로드 초기화, AbovePrompt 충돌 |
| [Replay Theater](https://github.com/anthropics/claude-code-playground/tree/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/replay-theater) | `/replay`, 실패·거절된 시도도 기록, 기록은 메모리에만 남음, 실제 변경 증거로 쓰지 않기 |
| [Blast Radius](https://github.com/anthropics/claude-code-playground/tree/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/blast-radius) | Bash 일부 명령 패턴, 스크립트·다른 도구는 우회 가능, bash/git/find/du 필요, 조사 단계에서 프로젝트 상태 명령을 실행할 수 있음 |
| [플러그인 설치·관리](https://code.claude.com/docs/ko/discover-plugins) | local/user/project 범위, project 설정 공유와 실제 설치 구분, `/reload-plugins` |
| [플러그인 명령 참조](https://code.claude.com/docs/ko/plugins/cli-reference) | install/update/disable/uninstall의 `--scope`, 한 세션 로드 옵션 |
| [매니페스트 참조](https://code.claude.com/docs/ko/plugins-reference) | `validate`의 구성·경로 검사 범위 |
| [업데이트 안내](https://code.claude.com/docs/ko/setup) | 네이티브 `claude update`와 패키지 관리자 설치의 갱신 방식 구분 |

## 편집 판단

- 상태 표시 → 편집 검토 → 실행 개입 순으로 입문 난이도를 높였다. 첫 실습은 Token Weather만 사용한다.
- 공개 샘플과 공식 튜토리얼의 Token Weather 구현은 동일하다고 가정하지 않는다. 튜토리얼은 `$.state`를 사용해 재로드 후 상태를 유지하지만 고정 커밋의 샘플 README는 재로드 초기화를 명시한다.
- 생성 프롬프트의 ‘파일 수정 금지’는 완성된 Mod의 실행 중 제약으로 한정했다. 제작 과정의 파일 생성과 충돌하지 않게 했다.
- 커머스 작업 상태판·아이디어는 자체 응용 과제다. 기존 제품의 기능, 공식 구현, 실제 검증 성과로 표현하지 않는다.
- 웹 체험은 v1 → 테스트 통과 → v2 수정 → 재검증 필요 관계를 보여준다. 외부 실행·파일 접근·모델 호출·데이터 저장을 하지 않는다. 테스트 실패와 초기화도 체험 가능하다.
- 공식 이미지·영상의 출처는 본문 캡션과 `assets/guides/claude-code-mods/README.md`에 기록했다. 저장소 이미지의 Apache-2.0 LICENSE를 함께 보관했다.

## 검증 범위

문서와 샘플의 정적 확인을 근거로 작성했다. 사용자 환경에 Mod를 설치하거나 Claude Code 실습 전체를 실행하지 않았다.

- `node --test`: 기존 테스트 7개 통과.
- `node --check assets/guide-mods.js`, `git diff --check`: 통과.
- 실제 헤드리스 Edge로 가이드·목록·홈의 로컬 링크, 동일 페이지 앵커, 중복 ID, noindex를 확인했다.
- 공식 이미지 5개의 브라우저 로드와 영상의 수동 재생 설정을 확인했다. 공식 MP4 HEAD 응답은 200, `video/mp4`였다. 영상 전체를 재생 시청한 검증은 아니다.
- 모의 상태판의 초기 상태, 통과, 수정 후 재검증 필요, 실패, 재검사, 초기화 전이를 확인했다.
- 1440px 데스크톱과 390px 모바일 화면을 캡처해 살펴봤다. 다크 모드, 문서 가로 넘침, JavaScript 비활성화 시 정적 본문·대체 설명을 확인했다.
- 상태판을 조작한 뒤 목록으로 돌아가 새로고침해도 잘못된 Updated 배지가 생기지 않는 것을 확인했다.

## 커뮤니티 사례 추가 (2026-10-10)

최근 관심을 모은 Mod와 검증 근거를 소개해 달라는 요청에 따라 공식 샘플 다음에 세 사례를 추가했다. 사용자 수나 장기 안정성이 입증됐다는 표현은 쓰지 않았다. GitHub 별은 관심 지표로만 설명하고, 공개 테스트의 정적 검토와 실제 실행 검증을 구분했다.

아래 수치는 GitHub 공개 REST API의 저장소 메타데이터와 기본 브랜치 커밋을 직접 조회한 결과다. 테스트 파일은 해당 커밋의 원문을 읽고 `test(...)` 정의와 확인 대상을 살펴봤으며 실행하지 않았다.

| 사례 | 관심 지표 | 확인 버전·최근 기본 브랜치 변경 | 확인 근거와 남은 한계 |
| --- | --- | --- | --- |
| [Claude Image View](https://github.com/jarrodwatts/claude-image-view) | 별 172, 포크 12 | `b3c412bb6d167cafade79148e95f9114ee1aad7c`, 2026-10-03 | `tests/claude-image-view.test.ts`의 테스트 5개를 읽음. 이미지 번호, PNG 크기, 비율·배치, 표시·제거 확인. 다른 기여자의 문서 수정 PR #2 병합. macOS·Linux·이미지 표시 터미널 요구. Windows 및 터미널 조합 문제는 공개 이슈에 남음. |
| [Terminal Browser](https://github.com/zenbu-labs/terminal-browser) | 별 3,764, 포크 179 | `2165ae76c9639e3996829ab0e6d54ddbd4f06ad8`, 2026-10-07 | 별은 브라우저 전체 저장소 수치. `claude-code-plugin/README.md`는 플러그인을 실험 단계로 명시. 별도 프로그램, kitty 그래픽 및 Unicode placeholder 요구. Windows는 WSL·호환 터미널 필요. 플러그인 전용 테스트 통과 근거를 확보하지 못해 주장하지 않음. 루트 README의 telemetry 안내도 확인. |
| [Intermission](https://github.com/jarrodwatts/intermission) | 별 108, 포크 8 | `f37a26b526c630bdea91688f3f1da733bac5ae84`, 2026-10-02 | `tests/turns.test.ts` 테스트 12개를 읽음. 지연 시작·종료·중단·권한 요청·좁은 화면·서버 미응답 전환 등을 모의 처리로 확인하는 코드. 실제 게임·서버 검증은 아님. macOS 15+, Ghostty·kitty, 게임 다운로드와 외부 서버 연결 필요. |

- 기능·환경·제약은 제작자 저장소를 근거로 썼다. 검토한 테스트와 플러그인 문서는 고정 커밋 링크로 연결했다.
- Intermission의 화제성 보조 근거는 [WeAreDevelopers의 2026-10-09 소개](https://www.wearedevelopers.com/magazine/780-play-doom-with-developers-while-claude-code-works)다. 기술 설명은 제작자 README와 테스트를 사용했다. 기사에 연결된 제작자 X 게시물 `2105858869482471602`는 직접 열리지 않아 좋아요·조회수는 인용하지 않았다.
- cc-arcade는 현행 요구사항과 차이가 있는 초기 접근 문서여서 이번 추천 후보에서 제외했다. 커뮤니티 디렉터리의 자동 안전 등급이나 추정 사용자 수는 채택하지 않았다.
- 사용자 컴퓨터에 커뮤니티 Mod를 설치·실행하지 않았다. 새 섹션, 목차·절 번호, 읽기 시간과 참고 자료만 변경했고 CSS·JavaScript는 바꾸지 않았다.

### 커뮤니티 실제 화면·데모 추가

- Claude Image View와 Intermission의 고정 커밋 README에서 실제 화면 PNG를 찾아 원본 그대로 자산 폴더에 저장했다. 각각 1734×1040, 1726×1040이며 직접 열어 입력창 미리보기와 Doom 분할 화면임을 확인했다. MIT LICENSE도 함께 보관하고 본문 캡션에 제작자와 원본 링크를 표시했다.
- Terminal Browser의 플러그인 README가 가리키는 GitHub 첨부 `a79e7667-6fcb-49a4-9967-44d0f942102c`를 본문 MP4로 연결했다. 원본 문서와 로컬 가이드 양쪽에서 브라우저 재생을 확인했다. 길이는 16.362초, 해상도 3424×2160이며 본문에서 7.78초까지 재생 후 브라우저 패널이 열린 장면을 확인했다. 화면의 Claude Code 2.1.274 표시를 보고 초기 데모임을 캡션에 밝혔다.
- 명령줄 HEAD에서는 오래된 서명 리디렉션 때문에 403이 났지만, 실제 브라우저에서 원본 첨부 주소가 정상 로드·재생됐다. HTML에는 원본 첨부 주소만 사용하고, 일시적인 서명 URL이나 인증 정보를 기록하지 않았다. 영상은 내려받지 않았고 대체 원문 링크를 제공한다.
- 두 이미지는 lazy loading·원본 확대 링크, 영상은 metadata 사전 로드·수동 재생·원본 비율을 사용한다. CSS·JavaScript 변경은 없다.

### 최종 문장·홈 카드 정리

- 기술 용어와 번역투를 다듬고 공식 샘플, 커뮤니티 사례, 설치 실습의 흐름을 정리했다. 명령어와 출처 링크, 검증 범위는 유지했다.
- 홈 가이드 카드는 사례연구와 같은 이미지·설명 좌우 배치로 맞췄다. 표지 비율을 유지하고, 모바일에서는 위아래로 배치한다. 가이드 목록의 썸네일은 제거했다.
- 홈과 본문의 전용 CSS 참조를 `?v=2`로 갱신했다. 데스크톱·390px 모바일 배치와 가로 넘침 없음, 목록 이미지 제거를 실제 브라우저에서 확인했다.
