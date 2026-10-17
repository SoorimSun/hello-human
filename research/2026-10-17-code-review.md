# 코드리뷰에서 배포까지, 팀이 함께 확인하는 7단계 · 조사·편집 기록

- 작성·공식 자료 확인일: 2026-10-17 (한국시간)
- 발행 준비 파일: `guides/2026-10-17-code-review.html`, GUIDE 09
- 출발 자료: 사용자가 제공한 ChatGPT 대화의 코드리뷰 가이드와 연결된 전체 문서. 내용을 읽고 공개 공식 자료로 사실을 다시 확인했다. 계정에 종속된 원문 링크는 독자용 출처로 사용하지 않았다.
- 사용자 요청: 헬로우휴먼 발행 형식과 시각화 강화. 제목에서 AI를 빼고, 후속 문장 다듬기 요청에 따라 글의 전체 범위가 드러나는 ‘코드리뷰에서 배포까지, 팀이 함께 확인하는 7단계’로 바꿨다. 본문 H1·title·OG·목록·홈을 일치시켰다. 초안 검토 중에는 로컬에서만 작업했고, 최종 내용·링크 점검 후 커밋·푸시하도록 승인받았다.

## 편집 방향

커머스·업무 시스템 개발자를 대상으로, 변경의 생성부터 운영과 복구까지 다룬다. 첫 절에 ‘THE LIFE OF A CHANGE’ 전체 흐름을 재구성하고 Anthropic의 공개 사례와 우리 팀 적용안을 단계마다 구분한다. AI는 허용된 보조 리뷰에 배치한다. 9개 절로 구성하고 PR·리뷰 프롬프트·팀 규칙 템플릿을 제공한다. 우리 팀의 리뷰 인원, 3회 상한, 2주 도입은 보편적 의무나 효과 보장 수치가 아닌 초기 운영 제안이다.

실제 사내 코드·로그·데이터를 사용하지 않았다. 결제 상황과 리뷰 코멘트는 가상 예시이며 실제 결제를 실행하지 않는다. PG별 멱등 계약, 키 보존 기간·적용 범위 확인을 명시했다. 제품 이름 외에는 제목과 절 제목에 AI를 반복하지 않았다.

멤버가 이해하고 따라 할 수 있도록 전체 9개 절의 문장을 다듬었다. PR·병합·CI·병합 큐·기능 플래그·온콜·멱등 키·웹훅·대사·Mock은 문맥 안에서 풀어 설명하고, 명사 위주의 표현을 담당자와 확인 행동이 드러나는 문장으로 바꿨다. 첫 독자를 위한 읽는 순서를 추가하고, 복사·다운로드 템플릿도 같은 용어로 맞췄다. 실제 운영과 팀 제안의 구분, 승인 인원 계산, 검사와 복구의 한계는 유지했다.

## 공식 근거

| 출처 | 확인 사항과 반영 |
| --- | --- |
| [Anthropic 운영 사례](https://claude.dev/blog/solving-code-review-at-anthropic/) | 2026-10-15 글. 6~9월 Claude Code 병합 PR 2배 이상, 되돌린 PR 비율 40% 초과 감소. 내부 관측이며 복수 운영 변화의 결과. AI만의 인과효과로 사용하지 않음. 세 차례 뒤 접근 방식 재검토 설명 확인. |
| [Google 작은 변경](https://google.github.io/eng-practices/review/developer/small-cls.html) | 독립적으로 이해 가능한 변경과 관련 테스트. 고정된 LOC 기준으로 제시하지 않음. |
| [Google 검토 항목](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | 설계·동작·코드 이해와 테스트 자체의 타당성. |
| [Google 코멘트](https://google.github.io/eng-practices/review/reviewer/comments.html) | 이유와 의도 설명, 필수 변경과 선택적 제안 구분. 한글 4분류는 편집 제안. |
| [Google 리뷰 속도](https://google.github.io/eng-practices/review/reviewer/speed.html) | 1영업일 응답 권고. 병합 완료 기한과 구분. |
| [Claude Code Review 한국어](https://code.claude.com/docs/ko/code-review) | 관리형 서비스는 읽기 기반이며 빌드·실행하지 않음. PR 승인·차단하지 않음. check run은 실패로 끝나지 않음. |
| [Claude 맞춤 설정 한국어](https://code.claude.com/docs/ko/code-review-customize) | 관리형은 CLAUDE.md·REVIEW.md, 로컬 /code-review는 CLAUDE.md를 읽음. REVIEW.md는 PR 변경본이 아닌 base/default에서 읽으며 보호 설정에 따라 달라짐. 첫 조회 오류 후 재조회 성공, 영문과 대조. |
| [GitHub Copilot 리뷰 한국어](https://docs.github.com/ko/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review) | 누락·잘못된 지적 가능성. approvals 공개 미리보기, 기본 필수 승인 불포함이나 설정 시 포함 가능. 한국어 URL 내 일부 승인 설명은 영문 제공. |
| [GitHub 브랜치 보호 한국어](https://docs.github.com/ko/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | 필수 리뷰, 코드 소유자 검토, 새 변경 이후 승인 처리. |
| [GitHub 병합 큐 한국어](https://docs.github.com/ko/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) | 최신 대상 브랜치·앞선 대기 변경을 포함한 검사. Actions에서 merge_group 이벤트 지원 필요. 모든 상호작용 결함을 보장한다는 표현을 사용하지 않음. |
| [AWS 멱등 API](https://aws.amazon.com/ko/builders-library/making-retries-safe-with-idempotent-APIs/) | 응답 유실로 결과를 모르는 상황, 같은 논리적 작업 식별과 재시도 계약. 모든 PG가 동일 계약을 보장한다는 주장 제외. 최종 점검에서 ko 경로에도 본문이 영문으로 제공됨을 확인해 독자용 링크에 표시. |
| [AWS Saga 한국어](https://docs.aws.amazon.com/ko_kr/prescriptive-guidance/latest/cloud-design-patterns/saga-orchestration.html) | 분산 업무의 보상, 실패·재처리·운영 복잡성. |
| [Spring 선언적 트랜잭션](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html) | 원격 호출에 걸친 트랜잭션 문맥 전파 한계. 일반 HTTP PG에서 로컬 롤백과 외부 취소 구분. |

공식 한국어 페이지는 실제 열리는 것을 확인한 경우 사용했다. AWS 멱등 API 문서는 ko 경로에서 영문 본문을 제공하므로 링크에 ‘영문’을 표시했다. 인원·검토 범위·복구 예시는 원문의 실무 제안을 편집한 내용이며 제품 기능으로 소개하지 않는다.

## 시각화와 접근성

- HTML/CSS로 만든 3가지 핵심 질문, 7구간 변경 흐름과 단계별 실제 운영·팀 제안 비교, 승인 기준 비교표, 3단계 위험 카드, 5가지 역할, 코멘트의 근거, 4단계 복구, 반복 리뷰 상한, 2주 도입 계획.
- 전체 흐름은 PR 전 검증 → CI·코드·보안 검토 → 위험별 승인 → 병합 큐 → 내부 적용 → 점진 배포 → 관찰·수정·롤백. PR의 세 검사는 고정된 실행 순서로 묘사하지 않음. 검사 실패 시 병합 보류, 수정 후 재검증, 운영 실패 사례의 테스트·규칙 반영을 연결.
- 승인 비교에서 원문의 인원 계산과 작성자 외 인원을 세는 우리 팀 제안을 구분. 위험 등급도 그대로 복제하지 않음. 내부 병합 정책과 공개 관리형 Code Review 기능도 구분.
- PR 양식에 코드·보안 검토, 최신 변경 승인, 결합 상태 검사, 최초 적용 대상, 확대·중단 기준과 담당자를 추가. 다운로드 원본과 본문 템플릿을 함께 수정.
- 결제 시나리오는 네이티브 radio와 fieldset, 각 패널의 설명 텍스트, aria-live로 구성. 정상 처리·응답 유실·DB 실패를 비교. 자바스크립트 비활성 시 세 시나리오 모두 노출.
- 템플릿은 details와 pre, 복사 버튼과 다운로드 링크. 클립보드 실패 시 본문 선택과 다운로드 대안. 원본 txt에 Markdown 내용을 담고 download 파일명만 md로 지정하여 Jekyll 변환 없이 전달.
- 시각화는 외부 이미지·차트 라이브러리 없이 제작. 기존 테마 변수를 이용하며 색과 텍스트를 함께 사용.
- 콘텐츠 변경 감지와 충돌하지 않도록 상호작용은 DOMContentLoaded에서 초기화. 체크리스트는 저장하지 않으며 실제 승인과 구분.

## 배포 범위

본문과 새 전용 CSS·JS·템플릿, 가이드 목록(09 GUIDES)과 홈 최신 카드만 발행 내용으로 변경한다. 기존 글의 제목은 소급 변경하지 않는다. 최종 검증을 통과한 변경을 사용자 승인에 따라 커밋하고 원격 main에 푸시한다.

## 로컬 검증 결과

- `node --test`: 기존 콘텐츠 갱신 테스트 7개 통과.
- `node --check assets/guide-code-review.js`, `git diff --check`: 통과.
- Headless Chrome에서 1440·960·768·390·320px, 라이트·다크 모드의 가로 넘침 없음. 데스크톱·모바일의 표지, 위험 카드, 결제 시나리오 캡처를 직접 확인.
- 결제 시나리오 3종 선택, PR·프롬프트·규칙의 복사와 다운로드 내용 일치 확인. Windows 클립보드의 CRLF는 비교 시 LF로 정규화. 클립보드 거절 시 선택 복사 안내 확인.
- 로컬 자산·다운로드 경로, 본문 앵커, 중복 ID, 외부 링크 속성, 제목·noindex 확인. 실행 중 pageerror 없음.
- 목록 9개와 홈 최신 글 연결 확인. 시나리오·체크리스트 조작 뒤 목록 복귀와 새로고침에서도 잘못된 Updated 배지가 생기지 않음.
- 자바스크립트 비활성 상태에서 시나리오 3종과 템플릿·다운로드 링크 유지. 체크 상태는 페이지 재진입 시 초기화.
- 전체 변경 흐름 보완 후 위 검증을 다시 실행했다. 추가한 7단계의 실제 운영·팀 제안 비교, 병합 보류 조건, 내부 적용·점진 배포, 운영 대응 분기와 재검증 연결도 브라우저 화면에서 확인했다.
- 문장·제목 편집 후 기존 테스트 7개와 브라우저 검증을 재실행했다. 새 제목의 본문·메타·홈·목록 일치, 템플릿 3종의 복사·다운로드 일치, 5개 화면 너비와 라이트·다크 모드를 확인했다. 데스크톱·모바일 표지와 모바일의 첫 단계·마지막 대응 단계 캡처도 직접 확인했다.
- 최종 링크 점검에서 GitHub Copilot 승인 절의 앵커를 실제 한국어 문서의 `copilot-승인`으로 수정했다. 수정 후 외부 고유 링크 17개(문서 13개)의 HTTP 200 응답과 지정한 절 4곳의 존재를 확인했다. Claude 사용자 지정 문서는 검색 도구 오류가 있었으나 HTTP 200과 브라우저 본문에서 규칙 파일 설명을 직접 확인했다. 최종 본문으로 기존 테스트 7개와 브라우저 기능·화면 검증도 다시 통과했다.
- 외부 결제를 실행하는 실험은 수행하지 않음.
