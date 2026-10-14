# Gemini 4 Argon과 기존 개발 환경 연결

- 기사: `news/2026-10-14-gemini-argon-development.html`, 일반뉴스 ISSUE 16
- 발행일·확인일: 2026-10-14, 한국시간 기준
- 입력: 사용자가 제공한 일반뉴스 초안. 실제 검증은 아래 공식 원문을 열어 수행했다.
- 범위: 모델 일반 공개, Copilot 지원, ADK 다섯 언어 가이드, GitHub 인증정보·관리 정책 변경
- 상태: 로컬 검토용. 커밋·푸시·배포하지 않는다.

## 주장별 근거와 편집 판단

| 주장 | 주체·대상·기준 | 원문 | 확인 상태·기사에 쓸 범위 |
| --- | --- | --- | --- |
| Argon 일반 제공 | Google, 10월 13일 공개 발표; 유료 API·Cloud·구독 경로 | [개발자 발표](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-argon/), [한국어 일반 공개](https://blog.google/intl/ko-kr/products/introducing-gemini-4-argon-kr/) | 발표 확인. Gemini 앱 Pro·Ultra, 개인 Antigravity Ultra를 구분한다. 무료 무제한 공개로 쓰지 않는다. |
| 이전 제한적 공개 | Google, 9월 30일 Fairwind 전문가 우선 배포 | [한국어 최초 발표](https://blog.google/intl/ko-kr/products/gemini-4-argon-kr/) | 날짜 확인. 정부의 사전 접근 절차와 Fairwind 배포는 별개라 본문에서는 전문가 우선 배포만 설명한다. |
| 문맥 한도 | 텍스트·이미지·오디오·영상, 입력·출력 통합 최대 약 1M | [모델 카드](https://deepmind.google/models/model-cards/gemini-4-argon/), [모델 사양](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon) | 공급사 사양. 1M을 입력만의 한도나 기본 출력 한도로 표현하지 않는다. 긴 문맥이 정확성을 보장하지 않는다고 설명한다. |
| 평가값 | 2026년 10월 모델 카드, DeepSWE v1.1 Argon 77.9%·Opus 5.5 74.2%; Terminal-Bench 4.0 Argon 57.4%·Opus 5.5 66.4% | [모델 카드](https://deepmind.google/models/model-cards/gemini-4-argon/), [평가 방법 PDF](https://deepmind.google/models/evals-methodology/gemini-4-argon) | Google이 모은 평가표. Argon 두 점수는 자체 측정. DeepSWE는 mini-swe 실행 환경이며 Opus는 시스템 카드 값, Terminal 비교값은 공식 공개 순위표. 두 평가를 별도 그래프로 표시하고 동일 조건의 독립 재측정으로 쓰지 않는다. |
| ADK 최적화 | Google 개발팀, Python 프레임워크의 긴 세션 준비 약 40% 감소·첫 패키지 import 21% 개선 | [개발팀 상세 글](https://developers.googleblog.com/optimizing-a-200000-line-python-codebase-overnight-with-gemini-4-argon/) | 공급사 실험. 실제 모델·도구 응답 시간을 제외한 프레임워크 측정. 6개 제안 중 2개 반영, 4개 검토 제외. 새 프로세스의 첫 모델 요청까지는 3.07초→3.09초로 거의 동일. 전체 코딩 생산성 40%로 확대하지 않는다. |
| Google 가격 | 일반 공개 Argon, 100만 토큰당 입력/출력 USD 2/10, 11월 30일까지; 이후 4/20 | [Cloud 발표](https://cloud.google.com/blog/products/ai-machine-learning/gemini-4-argon-available-on-google-cloud), [한국어 발표 각주](https://blog.google/intl/ko-kr/products/introducing-gemini-4-argon-kr/), [현재 가격표](https://ai.google.dev/gemini-api/docs/pricing) | 출시 기간과 표준 가격을 표에서 분리. 캐시 입력은 출시 기간 일반 입력 대비 95% 할인. 부가 기능·처리 옵션을 포함한 최종 청구의 보장은 하지 않는다. |
| Copilot 제공 | GitHub, 10월 13일; Pro+·Max·Business·Enterprise; VS Code·Visual Studio·CLI·coding agent·앱·JetBrains·Xcode·Eclipse | [변경 기록](https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot/) | GA 발표, 순차 배포. 조직 관리자의 모델 정책이 별도로 적용된다. |
| Copilot 과금 | 100만 토큰당 입력 USD 2·캐시 0.10·출력 10 | [현재 가격표](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) | 가격표와 각주 직접 확인. 할인 종료를 원문은 “until December 1, 2026”으로 표기. 초안의 ‘정가’가 표준 4/20으로 오해되지 않도록 현재 할인 단가 일치를 명시. 구독·크레딧 조건과 분리한다. |
| ADK 다섯 언어 | Google, 10월 13일 기술 가이드; Python·Go·TypeScript·Java·Kotlin | [언어별 가이드](https://cloud.google.com/blog/topics/developers-practitioners/one-agent-development-kit-five-languages) | 기존 구현 소개이며 다섯 언어 동시 신규 출시로 쓰지 않는다. MCP 클라이언트와 A2A 연결 지원은 확인했으나 전 기능의 언어 간 동등성을 주장하지 않는다. |
| Java 연결 | 같은 가이드의 Java 절 | [Java 절을 포함한 공식 가이드](https://cloud.google.com/blog/topics/developers-practitioners/one-agent-development-kit-five-languages) | Maven·Gradle·Spring Boot, 매개변수 @Schema, LlmAgent.builder(), Spring AI·LangChain4j 브리지 설명 확인. 설치 안내 대신 접힌 기술 설명에 둔다. |
| 인증정보 차단 확대 | GitHub, 10월 13일; anthropic_service_api_key, anthropic_user_api_key | [Secret Scanning 변경](https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce/) | 새 탐지와 기본 push protection 차단 확인. Secret Scanning 활성 저장소(무료 공개 포함)라는 발표 범위와 지원 형식 한계를 명시. Salesforce 파트너·Cloudsmith 탐지도 확인. |
| 최신 정책 강제 | GitHub, 10월 13일; forceRemoteSettingsRefresh=true | [관리 정책 변경](https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates/) | CLI·VS Code·앱 지원. MDM/파일은 첫 로그인 전, 서버 설정은 한 번 수신한 후 다음 시작부터. 꺼져 있으면 캐시 방식 유지. 모델 지원 IDE 전체에 적용한다고 쓰지 않는다. sandbox 키 포함 시 최소 버전 강제도 확인. |
| 업무 연결·30건 실험 | 헬로우 휴먼의 해석·제안 | 사용자 초안과 편집 구성, [ADK 함수 도구](https://adk.dev/tools-custom/function-tools/) | 가상 쿠폰·배송·상품 문의. 사용 가능한 AI 채팅 도구에 자료를 직접 넣는 첫 연습과, 개발자가 읽기 전용 조회 도구를 연결하는 후속 실험을 구분한다. 특정 모델을 전제하지 않으며 도식·답변은 기대 예시다. 수행 실적이나 측정 결과가 없다. |

## 확인 과정과 변경 판단

- 직접 URL 열기는 처음에 검색 도구 접근 오류를 반환했다. 공식 도메인 검색 후 같은 원문을 다시 열어 본문을 읽었다. 초기 오류만으로 원문 부재를 결론 내리지 않았다.
- Google 한국어 최초·일반 공개 페이지의 본문을 실제 확인했다. 모델 카드·가격·ADK·GitHub 기술 조건은 영문 원문으로 대조했다.
- ‘최근 24시간’ 대신 원문 발표일과 한국시간 확인일을 구분했다.
- 평가 방법 문서는 점수의 출처가 혼합돼 있음을 명시한다. ‘모든 값이 Google 실험’이라고 단순화하지 않았다.
- ADK 최적화 수치는 상세 개발기에서 검토 탈락 제안과 첫 요청 시간의 한계를 함께 확인했다.
- Copilot 토큰 단가와 API 토큰 단가가 현재 같음을 보완했다. 실제 작업 비용은 재시도·사람의 검토 부담까지 볼 필요가 있다는 부분은 편집 해석이다.
- 네 소식을 하나의 실제 통합 제품으로 묘사하지 않았다. 개발자 코딩 도구인 Copilot과 업무 프로그램을 만드는 ADK의 역할을 나눴다.
- 초안의 반복적인 결론·영문 계층 나열은 쉬운 설명과 가상 업무 흐름으로 정리했다.
- 현재 README·운영 문서는 개별 기사마다 파일 목록을 늘리지 말라고 정한다. README는 변경하지 않았다.

## 시각 자료

| 자료 | 출처·성격 | 사용·확인 |
| --- | --- | --- |
| Copilot 모델 선택 이미지 | GitHub [공식 발표](https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot/), [원본 제공 URL](https://github.blog/wp-content/uploads/2026/10/669842939-b88c190d-d4b1-4884-b039-48446f62d5fe.png?resize=2064%2C600) | 2026-10-14 브라우저에서 Argon 선택 화면 확인. 제공 크기 2064×600, 원본 내용을 수정하지 않고 원격 이미지로 표시. 별도 재배포 라이선스는 확인하지 않아 저장소에 파일 복제하지 않았다. 공급사 소개 이미지이며 IntelliJ 실사용 캡처가 아님을 표시. 외부 호스트가 내려가면 이미지가 안 보일 수 있어 원문 링크·설명 병기. |
| 두 평가 막대 | 모델 카드 수치를 HTML/CSS로 재작성 | 평가별 분리, 0~100% 축, 텍스트 수치와 모델 이름 제공. 독립 실험·전체 순위가 아님을 표시. |
| 가격 표 | Google Cloud 출시 가격 | USD/100만 토큰, 출시 기간·이후 가격 구분. |
| MCP/A2A·실험 흐름 | 헬로우 휴먼 설명용 도식 | 공급사 실제 아키텍처나 운영 실적 아님. JavaScript 없이 읽을 수 있는 HTML. |

## 로컬 확인

### 기사 전체 흐름 다듬기

- 사실의 신규 조사나 수치 변경 없이 문장·문단 연결을 검토했다. 모델 성능 → 개발 도구 → 업무 기능 연결 → 관리 정책 → 모임의 관점 → 가상 문의 실험으로 읽히도록 도입과 전환 문장을 정리했다.
- 부제에서 Copilot 선택과 업무 연결을 한 작업처럼 묶던 표현을 풀었다. GitHub Copilot의 개발자용 역할을 명시하고, ADK와의 역할 차이는 ADK 도입에서 설명한다. 홈·뉴스 목록·설명 메타도 같은 범위로 맞췄다.
- 평가표의 출처 설명은 캡션에, 실행 환경 세부 조건은 접힌 설명에 두었다. 최적화 본문과 도표에서 중복되던 첫 요청 시간 설명도 도표에 모았다. 기존 수치·원본 이미지·출처는 유지했다.
- ADK의 가상 예시를 쿠폰 문의로 맞춰 모임 관점과 실험으로 이어지게 했다. 실험 도식의 02에서 직접 자료 입력과 후속 도구 조회를 구분했다. 따라 하기 순서는 입력 → 기대 답 대조 → 정보 누락 확인으로 정리하고, 누락 사례의 기대 답은 실습 입력문 뒤로 옮겼다.
- 실험 결과를 AI에 맡길 부분과 사람이 확인할 부분으로 정리하는 마무리를 추가했다. 특정 모델의 이용을 요구하지 않으며, 실제 모델 실행이나 조회 연결 실험을 수행한 것으로 표현하지 않는다.
- 검증: 기존 테스트 7개 통과. 기사 ID·목차·로컬 경로·태그 짝·문구 일치·공백을 검사했고, 수정 전후의 원본 이미지 태그·외부 링크·평가 막대 수치·실습 입력문·출처 섹션이 같은지 대조했다. 데스크톱 라이트와 모바일 라이트·다크(실제 CSS 너비 341px)에서 배치와 가로 넘침 없음을 확인했다. 새 평가 조건과 옮긴 누락 사례의 접힌 설명은 Enter로 열고 닫았다. 이미지 3개 로드·콘솔 오류 없음 확인 후 테마·뷰포트·접기 상태를 복원했다.

### 실험 안내 개선

- 사용자 요청에 따라 실험은 특정 모델을 전제하지 않고 사용 가능한 AI 도구로 진행하도록 정리했다. 도입 문장에서 ‘AI를 기존 업무에 연결하기’라는 기사 주제와 이어주며, 본문의 Argon 발표·평가 내용과 실험 제안을 구분한다.
- ‘담당자 문의 → AI의 정보 선택·조회 도구 → 근거 정리 → 담당자 확인’의 네 단계 도식을 넣었다. 실제 UI나 실행 결과처럼 보이지 않도록 가상 설계·기대 답이라고 표시했다.
- C-01의 가상 쿠폰 조건은 배송비 제외 상품 금액 50,000원 이상, O-01은 상품 49,000원·배송비 3,000원·합계 52,000원으로 만들었다. 첫 연습의 프롬프트와 도식의 수치·자료 ID를 맞췄다.
- 자료 직접 입력 단계에서는 자료 해석·근거 설명만 확인한다. 자동 조회·도구 선택 검증은 연결 후로 구분했다. 주문 정보 누락 사례는 이전 대화의 정보가 남지 않도록 새 대화에서 시험하도록 안내했다.
- 30건은 쿠폰·배송·상품 노출 각 10건 중 6건을 정보 부족 사례로 구성하는 제안이다. 정답표를 AI에 주지 않고, 분류·근거 판단·검토 포함 완료 시간을 기록한다. 도구 선택 점수는 후속 연결 단계에서만 추가한다.
- 실험의 Argon 계정·모델 선택 조건을 제거하고 사용 도구·실험 날짜·표시되는 모델명을 기록하도록 안내했다. 후속 조회 연결은 개발자가 도구 호출을 지원하는 모델·환경을 선택해야 하며, ADK는 개발 도구의 한 예로 제시한다.
- 모델 중립 문구로 수정한 뒤 실험 섹션의 독자용 텍스트에 특정 제품명이 남지 않았음을 검사했다. 브라우저에서 제목·도입·도식·따라 하기 문구와 데스크톱 가로 넘침 없음을 확인했다. `git diff --check`와 새 기사 파일의 줄 끝 공백 검사도 통과했다.
- [ADK 함수 도구 공식 문서](https://adk.dev/tools-custom/function-tools/)를 열어 개발자가 정의한 함수를 에이전트 도구로 연결하는 방식을 확인했다. 이 기사에서는 실제 API·권한·에이전트를 만들거나 실행하지 않았다.
- 실습 입력문 복사 버튼만 기사 전용 JavaScript로 추가했다. 기존 `news-decart.js`의 동작 패턴을 따르고 `DOMContentLoaded`에서 초기화한다. JavaScript 없이도 본문·도식·details·입력문을 읽고 직접 복사할 수 있다.
- 개선 후 검증: `node --test` 7개 통과, 기사 전용 JS의 `node --check`와 `git diff --check` 통과. 로컬 링크·fragment·중복 ID·H1·샘플 수치·줄 끝 공백을 검사했다. 브라우저에서 상세 설명의 Enter 열기·닫기, 복사 버튼의 Enter 실행 및 클립보드와 입력문 전체 일치를 확인했다. 데스크톱 도식과 모바일 라이트·다크 화면을 살폈으며, 실제 CSS 뷰포트 355px·291px에서 가로 넘침이 없었다. 테마·뷰포트·상세 설명 접기 상태를 복원했다. 실제 모델 호출이나 조회 연결 실험은 수행하지 않았다.

### 브라우저 코멘트 반영

- 10월 13일 일반 공개 영문 원문의 `og:image`를 확인했다. 9월 30일 이미지와 구성이 다른 중앙 숫자 4 이미지를 Argon 섹션과 공유 썸네일로 추가했다. 두 공식 이미지의 제공 URL·크기·선택 이유는 `assets/news/gemini-argon-development-media.md`에 기록했다.
- [DeepSWE 공식 소개](https://deepswe.datacurve.ai/)의 직접 작성한 저장소 과제·동작 검증 테스트 설명을 확인했다. 그래프 위에는 평가 의미, 아래에는 77.9−74.2=3.7%p라는 점수 차이를 설명했다. 차이를 생산성 향상이나 통계적으로 확정된 우열로 표현하지 않았다.
- [Terminal-Bench 공식 소개](https://www.tbench.ai/)와 공식 소개가 연결한 [Harbor의 v4 과제 페이지](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench/4?tab=tasks)에서 터미널을 사용한 과제 해결 평가임을 확인했다. 66.4−57.4=9.0%p 차이와 과제 해결률이라는 의미를 설명했다. 모델별 수치는 기존 Google 모델 카드 기준을 유지한다.
- ADK 원문의 Figure 5를 원형 그대로 추가했다. 첫 요청까지의 시간이 거의 같다는 행과 실험 조건을 포함하는 도표를 선택했다. 실제 응답 지연을 포함한 사용자 체감 속도나 코딩 생산성 전체 수치로 확대하지 않는다.
- 원본 이미지 두 개를 직접 열어 확인했다. 별도 재배포 라이선스 확인을 주장하지 않으며, Google 제공자 표시·원문·원본 크게 보기·한국어 설명을 붙였다.
- 반영 후 재확인: 기존 테스트 7개 통과, 로컬 링크·fragment·중복 ID·이미지 크기/대체 텍스트·줄 끝 공백 검사 통과. 두 이미지의 브라우저 로딩을 확인했다. 데스크톱의 이미지·평가표·ADK 도표, 모바일 390px 다크 모드의 비교 해설·ADK 한국어 설명을 시각 확인했다. 390px·320px 모두 가로 넘침이 없었다. 테마와 뷰포트는 원래 상태로 복원했다.

- `node --test`: 기존 테스트 7개 통과.
- `git diff --check`: 통과. 새 파일의 줄 끝 공백도 별도 확인.
- 기사·목록·홈의 로컬 링크와 fragment 대상 검사: 누락 없음. 중복 ID 없음. 기사 H1 1개, ISSUE 16·발행일·noindex·공통 자산 순서 확인.
- 목록 24개 고유 URL, 일반뉴스 16편·속보/단신 8편. 브라우저 필터 전환 결과와 정적 편수 일치.
- Codex 브라우저에서 기본 데스크톱, 390×844·320×800 모바일 폭을 확인. 가로 넘침 없음. 라이트·다크 화면의 제목·그래프·가격표·연결 도식·실험 도식 스크린샷을 직접 살폈다.
- 공식 Copilot 이미지 로드 확인(2064×600). 목차 이동, 상세 설명의 Enter 키 열기·닫기 확인.
- 기사 열기·상세 설명 조작·목록 복귀·새로고침 이후 해당 카드에 잘못된 New/Updated 표시 없음. 브라우저 콘솔 오류 없음.
- 홈의 최신 일반뉴스 카드·날짜·호수·제목 일치, 기존 단신 유지 확인.
- 미리보기는 loopback 전용 서버와 `/hello-human/` 경로로 확인. 허용한 정적 웹 자산만 제공하며 `.git`·`.agents`·조사 Markdown 요청 차단 확인.
- 별도 인쇄 미리보기와 JavaScript 비활성 브라우저 검사는 수행하지 않았다. 본문·그래프·표·도식은 JavaScript 없이 제공되는 HTML이다. 기사 전용 JS는 실습 입력문 복사만 보조한다.
- 모델 성능 실험·실제 문의 분류는 수행하지 않았다. 원격 이미지의 장기 제공 여부는 외부 호스트에 달려 있다.
