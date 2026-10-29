# AI뉴스 31 검증 기록

- 기사: `news/2026-10-29-copilot-fusion.html`
- 발행일·확인일: 2026-10-29, Asia/Seoul. 주요 원문 표기일 2026-10-28.
- 사용자 제공 초안을 공식 발표·문서·평가기관 원문과 대조했다. 처음에는 로컬 검토용으로 준비했고, 기사·실험 시각화와 뉴스 스킬 수정 후 사용자의 커밋·푸시 요청에 따라 게시 전 검증을 마쳤다.
- 제목: GitHub Copilot Fusion, 작업마다 모델을 고르다.

## 근거와 편집 판단

| 주장 | 주체·대상·기준 | 확인 상태와 사용할 표현 | 근거 |
| --- | --- | --- | --- |
| Fusion 정식 출시·세 가지 실행 방식 | GitHub, Copilot 제품 | 발표 및 문서 확인. 단일 모델·단계적 전환·상호 검토를 구분 | [출시](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/), [제품 문서](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) |
| Fusion Max 60, Claude Code Opus 5.5 Max 62 | Artificial Analysis Coding Agent Index v2.0, 표시 반올림 점수 | 평가기관 웹 차트에서 Router models를 켜 확인. 초안의 상대 점수 58을 62로 수정. Intelligence Index의 58과 혼동 금지 | [코딩 에이전트 평가](https://artificialanalysis.ai/agents/coding-agents?routers=true) |
| API 비용 약 절반·작업 시간 약 40% 감소 | GitHub가 인용한 위 평가의 작업당 비교 | GitHub 발표로 귀속. 구독료 인하·프로젝트 기간 단축으로 확대하지 않음 | Fusion 출시 글 |
| 과금과 작업 공간의 제한 | 모델별 요금 합산, 유료 플랜 한시 할인 | 문서의 11월 30일 종료일 반영. 버린 초안의 파일 변경은 자동 취소되지 않는 제한 추가 | Fusion 제품 문서 Billing / Limitations |
| Carbon High 59, Opus 5.5 Max(Default Fallback) 58 | AA Intelligence Index v5.0 | 평가기관의 독립 평가. 확인 시점의 공개 결과 중 최고. 코딩 에이전트 지수와 별개 | [Intelligence Index](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index) |
| 보안 평가 88.2% / 54.8% / 71.0% | Google, SEC-bench Pro / ExploitGym / CWE-bench | 공급사 발표. 서로 다른 과제이며 가드레일 없이 평가. CWE 이미지 조건도 확인 | [Carbon 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) |
| Carbon 접근·예고 요금 | 일부 방어 전문가부터 Fairwind 확대 | 일반 개방일 미발표. 입력/출력 100만 토큰당 도입 $2/$10, 이후 $4/$20을 함께 표기 | Carbon 발표 본문·각주 |
| 70개 이상 모델·n8n | SAP, Joule Studio | 한국어 원문 확인. n8n은 얼리 어답터 제공 | [SAP 한국어 발표](https://news.sap.com/korea/2026/10/sap-ai-개발자의-핵심-솔루션-구축-및-의도-기반-자율-실행/) |
| SAP 제공 일정 | Joule Work·Studio는 단계적 GA, n8n·Gateway는 2027 Q1 GA 예정, Ontology Manager는 2026년 11월 베타 예정 | 영문 세부 일정으로 보완. 현재 제공과 예정 구분 | [Innovation News Guide](https://www.sap.com/topics/events/teched/innovation-news-guide-2026) |
| SAP의 모델 교체·완료 작업 과금 | Reuters의 CFO 직접 인터뷰·SAP 답변 | 취재 원문 전재본 확인. 제품별 계약·단가 전체를 검증한 것으로 쓰지 않음 | [Reuters 정정 전재본](https://new.streetinsider.com/Reuters/SAP%2Bswaps%2Bcostly%2BAI%2Bmodels%2Bfor%2Bcheaper%2Balternatives,%2Btargets%2Bover%2B%E2%82%AC2%2Bbillion%2Bin%2Bgains/27246682.html) |
| Agentic Workflows GA·통제 | GitHub, Markdown→Actions YAML, 기본 읽기 권한·Safe Outputs·위협 탐지 | 공식 출시 확인. Free/Team/Enterprise, 기본 Copilot CLI는 라이선스 필요 | [정식 출시](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/) |
| Automations 개선 제안 | 별도 Copilot Automations 제품 | 제안 적용 전에 사용자가 수락·거절. Workflows 기능으로 합치지 않음 | [개선 제안 발표](https://github.blog/changelog/2026-10-28-copilot-automations-now-learn-from-outcomes-and-self-improve/) |

## 초안에서 고치거나 줄인 부분

- ‘최근 24시간’은 게시 시간·시간대 전체를 확정하지 않아 날짜 기준으로 바꿨다.
- Fusion 출시 글은 상대 점수를 ‘2점 이내 차이’로만 표현한다. AA 화면의 62점을 확인해 비교 방향을 바로잡았다. 같은 평가표에 Devin Fusion도 있어 GitHub Copilot Fusion과 구분했다.
- 제품 문서는 Critique의 여러 모델 병렬 검토를 설명한다. 생성·검토·수정의 큰 흐름을 유지하되, 검토 모델이 반드시 한 개라고 한정하지 않았다.
- Reuters 검색 요약에는 모델 교체가 효율 효과를 전부 만든다고 읽히는 초기 문장이 있었지만, 실제 전재 본문에는 ‘generate’를 ‘help generate’로 고쳤다는 정정이 있다. 모델 교체가 기여한다는 범위로 읽었다. 거시적 20억 유로 목표는 본문에서 생략해 작업 비용에 집중했다.
- 반복되는 ‘모든 업무를 보장하지 않는다’는 설명을 평가표·접근 조건 가까이 모았다.
- 단가의 가상 비용 계산은 추가하지 않았다. 실험의 건당 비용은 산식과 포함 범위만 제안하며, 임의 단가·실측 금액을 만들지 않았다.
- 실험은 미수행 제안이다.

## 실험 설계 검토

사용자의 반복성 지적에 따라 쿠폰 계산 변경·모델 재시도 비교를 참여형 이벤트의 사전 점검으로 교체했다. 10월 27일의 쿠폰 검토 분담, 28일의 쿠폰 변경 영향 분석과 겹치던 문제를 피하고, 이번에는 문서 간 정책 충돌·누락 탐지와 참여 이력 재생을 실험의 질문으로 삼았다. 언어·프레임워크 지정은 삭제했다.

- 가상 조건: 7일 중 서로 다른 3일 출석, 퀴즈 정답 1회 이상, 배송비·취소 제외 대상 상품 합계 50,000원 이상, 회원별 1회. 100명 × 5,000포인트 = 500,000포인트 한도다. 실제 행사·모델 이용료나 실측 결과가 아니다.
- 첫 입력에는 선착순과 추첨의 충돌, 취소와 대기자 승계의 누락을 심는다. 모델이 임의로 정하지 않고 원문 근거와 질문을 반환해야 한다. 가상 담당자가 규칙을 결정한 뒤의 기대 동작과 이 미해결 입력을 구분했다.
- 확정 가정: 서버 접수 순서로 예약, 종료 전 취소로 자격을 잃으면 예약 해제·유효 대기자 승계, 종료 24시간 뒤 원천 이력 대조를 완료한 다음 지급 확정. 기간은 KST, 시작 포함·종료 제외. 대조 미완료 시 보류. 지급 확정 후 반품·회수는 다음 실험 범위다.
- 검증 사례: 같은 날 출석 3회는 1일, 55,000−10,000=45,000원으로 자격 상실, 99명 예약 후 동시 요청 2건 중 1건만 추가 예약, 응답 유실 뒤 같은 지급 번호 재요청 시 중복 지급 없음.
- 모델은 출처가 붙은 조건 추출·독립 검토를 맡고, 코드는 승인된 규칙의 참여 판정·예약·수량·지급 상태를 계산한다. 실제 지급은 연결하지 않고 합성 이력과 모의 지급기로 재현한다. 스키마 미지원·모델 오류·미해결 정책은 확정 차단 조건이다.
- 사람의 체크리스트 검토와 도구 보조 검토를 비교한다. 충돌 누락·오탐·근거 확인 및 수정 부담을 따로 측정하고, 코드의 수량·중복 지급 오류와 섞지 않는다. 조정 사례와 최종 평가 사례를 분리하며 담당자·검토 순서를 교차 배정한다. 모델 비용 비교는 흐름 검증 후 추출 단계만 교체하는 후속 시험으로 둔다.
- 원고의 제안만 수정했다. 이벤트 검증기·API 호출·모델 평가를 구현하거나 실행한 것은 아니다. 공식 발표 내용과 기존 출처는 이번 수정으로 재조사하지 않았다.

## 미디어

출처·원본 크기·확인 범위는 [미디어 기록](../assets/news/copilot-fusion-media.md)에 정리했다.

## 로컬 검증

- `node --test`: 기존 테스트 71개 통과, 실패 0.
- `git diff --check`: 공백 오류 없음. Git의 기존 LF/CRLF 및 전역 ignore 접근 경고는 별개.
- 별도 정적 검사: 제목·메타·날짜·ISSUE 31, noindex, 중복 id·목차 대상, 상대 경로, 이미지 4개의 실제 크기, 외부 링크 속성을 확인했다. 전체 42편=일반뉴스 31+단신 11, 중복 등록 없음. 홈 최신 카드 일치.
- 브라우저: 1280px 데스크톱 다크, 390px 모바일 라이트에서 화면 확인. 네 이미지 로딩·비율 정상, 가로 넘침 없음. 제목 구절과 3열→1열 카드 배치 확인.
- 목차 이동, 키보드 Enter로 details 열기, 클릭으로 닫기 확인. 목록 필터의 일반뉴스 31·단신 11 표시, 기사 확인→접이식 조작→목록 복귀→새로고침 후 새 기사의 불필요한 Updated 표시 없음.
- 실제 모델·제품 성능을 재측정하지 않았다. 실험 코드 실행·배포·원격 게시도 하지 않았다. 인쇄 화면은 별도 확인하지 않았다.

### 실험 소재 교체 후 재확인

- 기사·공유 설명·홈·목록 소개를 참여형 이벤트 사례로 맞췄다. 기사에서 쿠폰·Java·Spring Boot·JUnit과 이전 모델 재시도 비교 문구가 남지 않았는지 확인했다.
- `node --test` 71개 통과. 정적 구조 검사와 `git diff --check` 통과. 기존 호수·날짜·URL·편수와 공식 출처를 유지했다.
- 기존 미리보기를 새로고침해 데스크톱 도입부와 모바일 표 4행을 확인했다. 모바일 실측 CSS 뷰포트 354px에서 가로 넘침이 없고, details를 Enter로 열고 클릭으로 닫을 수 있었다. 임시 화면 크기를 복원하고 수정한 실험 절을 열어 두었다.
- 검증 범위는 원고·연결·화면과 기존 사이트 테스트다. 제안한 이벤트 검증기나 모델의 성능을 시험한 결과가 아니다.

### 설명용 시각화 추가

- 참여 조건을 먼저 보여주고, 입력 자료 → AI의 충돌·누락 질문 → 담당자의 정책 결정 → 코드의 이력 재생을 역할별 도식으로 구성했다. 반복되던 설명 문단 일부를 이 도식으로 대체했다.
- 네 상황을 선택해 각 3단계를 이전·다음 버튼으로 이동한다. 예시 상태를 미리 작성한 해설 화면이며, 제안한 이벤트 엔진·AI 실험을 구현한 것은 아니다. 캡션과 미디어 기록에 이 범위를 명시했다.
- `node --test` 기존 71개 통과, 새 JS의 `node --check`, 기사 정적 검사와 `git diff --check` 통과. 별도 모델 호출이나 지급 시험은 하지 않았다.
- 브라우저에서 12개 상태의 전환, 처음·끝의 버튼 비활성화, 상황 변경 시 첫 단계 복귀, Enter로 다음·이전 이동을 확인했다. 데스크톱·좁은 모바일 화면, 라이트·다크에서 확인했고 12개 모바일 상태 모두 가로 넘침이 없었다.
- 스크립트를 CSP로 차단한 별도 로컬 미리보기에서 정적 도식·안내가 남고, 기본 details 조작으로 네 행의 기대 결과 표가 열리는 것을 확인했다. 재생 조작 후 목록 복귀·새로고침에서도 해당 글에 불필요한 Updated 표시가 붙지 않았다. 인쇄 미리보기는 별도 확인하지 않았다.
