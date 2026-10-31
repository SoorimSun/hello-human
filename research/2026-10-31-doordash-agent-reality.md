# DoorDash의 외부 에이전트 주문과 업무 평가

- 확인일·기사 발행일: 2026-10-31, 한국시간
- 결과: `news/2026-10-31-doordash-agent-reality.html`, 일반뉴스 ISSUE 33
- 범위: 제공 초안의 다섯 소식을 검증·편집해 정적 HTML, 목록·홈에 반영.
- 발행 승인: 로컬 검토와 후속 수정을 마친 뒤 2026-10-31 사용자 요청으로 커밋·푸시 진행. 아래 ‘푸시하지 않음’ 검증 기록은 승인 전 각 수정 시점의 상태다.

## 주장별 확인

| 주장 | 주체·대상·단위·시점 | 근거 | 상태·기사 표현·한계 |
| --- | --- | --- | --- |
| 외부 에이전트 주문 수백 건 | DoorDash CEO 발언, 제3자 에이전트에서 접수된 누적 주문. 집계 시작일 미공개 | [TechCrunch 10월 30일](https://techcrunch.com/2026/10/30/doordash-said-its-only-received-several-hundred-orders-from-ai-agents/) | 원문 보도 직접 열람. 발언 인용 보도로 명시. 공식 콘퍼런스콜 음성·전문을 직접 확인하지 않았으므로 자체 집계로 단정하지 않음. |
| 3분기 전체 주문 993 million | DoorDash, 2026-09-30 종료 분기 Total Orders, 2026-10-29 발표 | [공식 IR](https://ir.doordash.com/news/news-details/2026/DoorDash-Releases-Third-Quarter-2026-Financial-Results/default.aspx) | 확인된 발표. 9억 9,300만 건. 외부 에이전트 누적치와 기간이 달라 비중 계산·공통축 그래프 제외. |
| 자체 앱에서 사진·자연어로 장바구니 구성 | Ask DoorDash, 2026-06-11 발표 | [공식 제품 소개](https://about.doordash.com/en-us/news/ask-doordash) | 공개 당시 일부 지역 iOS 제공. 현재 전체 제공 범위는 주장하지 않음. 자체 기능과 외부 주문 통계 구분. |
| 합성 기업 환경과 평가 질문 자동 생성 | Microsoft Research, Industry Evaluation Data Generation Platform, 2026-10-30 | [공식 원문](https://www.microsoft.com/en-us/research/blog/from-synthetic-enterprise-data-evaluations-to-real-microsoft-copilot-ai-confidence/) | 공식 설명. 고객 데이터 입력 없이 제약·자본시장·IT 환경 생성, 시간에 따라 변화하는 업무 이력. 플랫폼을 내부 공유 카탈로그에 등록했으며 독립 제품 출시로 쓰지 않음. |
| 품질 39% 개선 | Microsoft 내부 합성 데이터 종합 품질 지표, 초기 생성 방식 대비 | 위 Microsoft 원문 Results and impact | 공급사 자체 평가. Copilot 정확도·생산성 향상으로 해석하지 않음. 평가 데이터 생성 자동화와 업무 완료 능력도 구분. |
| 웹사이트 학습 선호 공통 신호 지원 | OpenAI, 2026-10-30 발표, 향후 몇 달 내 적용 목표 | [확인된 한국어 원문](https://openai.com/ko-KR/index/helping-websites-express-ai-training-preferences/) | 예정. 기존 크롤러 제어 유지. 이미 모든 업체에서 적용 중이라고 쓰지 않음. |
| 규약의 표준화 상태 | Kevin Kelley 제출 draft-kelley-aipref-training-preference-signal-00, 2026-10-30 | [Datatracker](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/) | 웹 추출 실패 후 실제 브라우저로 상태와 본문 확인. Active Internet-Draft (individual), IETF 미승인. 토큰은 `__usage_ai-training`. 경로별 선호 예제 사용. |
| Google 지원 시점 | 2027년 초 계획 | [영문 크롤러 문서](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended) | 영문에 early 2027 명시. 한국어 페이지도 열었으나 최신 지원 일정은 영문을 근거로 사용. |
| Microsoft 학습과 grounding 분리 | 새 선호 적용 2027-02-01부터 재수집 시, 기존 제한 전환 마감 2027-03-01 | [Bing 공식 안내](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/) | 예정. 기존 NoArchive/NoCache 이용자의 grounding 제한은 페이지 설정과 BWT 임시 설정 모두 확인. 2026-12-15 기준 기존 설정 사이트에 전환 적용, 임시 설정은 재수집 또는 2027-09-30 중 빠른 시점까지. 전체 사이트 robots.txt grounding 설정은 없음. |
| 공격에서 ARTEX·PentAGI·CAIRN 악용 관찰 | GTIG·Mandiant, 2026년 8월 말부터 실제 사고 조사·텔레메트리 | [공식 보고서](https://cloud.google.com/blog/topics/threat-intelligence/artex-and-friends-enter-agentic-offensive-frameworks) | 웹 검색·추출에는 10월 30일, 실제 브라우저 본문 날짜는 10월 31일. 기사에서는 10월 31일 확인으로 표기. 보고서의 관찰·평가로 한정하고 완전 자율 공격의 일반화 제외. |
| 23초에 27개 이벤트 | ARTEX의 특정 AWS 권한 탐색 집중 실행 구간 | 위 보고서 ARTEX Framework | 브라우저 본문 직접 확인. 전체 침투 소요 시간 아님. 정상 API 악용·시행착오·오류 흔적과 방어 5개 영역 확인. |
| OpenAI 도입 조직 25,000명 이상 | Cognizant OpenAI Frontier Capability Group, 2026-10-30 | [공식 IR](https://investors.cognizant.com/news-and-events/news/news-details/2026/Cognizant-commits-more-than-25000-professionals-to-OpenAI-delivery-as-enterprises-move-frontier-AI-into-production/default.aspx) | 기존 인력을 모은 조직. 신규 채용 수로 쓰지 않음. 21,000명 이상·40,000개 이상 배지는 교육 이수 수치. |
| 고객 서비스 500만 대화·콘텐츠 생성 시간 60% 감소 | 글로벌 바이오 제약회사와 공동 개발한 OpenAI 기반 기업용 AI 어시스턴트, 검색·생성·번역·승인 | 위 Cognizant 공식 발표 | 공급사 고객 사례. 기간·세부 비교 조건 미공개. Codex 개발자 생산성과 구분. 조직 전체를 FDE로 단정하지 않음. |

## 편집 판단

- 제목은 DoorDash와 외부 주문 수치 중심. 다섯 소식을 단일 기술·같은 성과로 묶지 않았다.
- 최근 24시간이라는 엄격한 범위 대신 확인일과 원문 날짜를 표기했다. 초안의 파비콘·검색 출처 흔적, 중복 개념 정의, 과도한 당위 문장을 제거했다.
- 수백 건·993 million의 비교는 두 범위 카드로 보이고 비중을 계산하지 않았다.
- DoorDash 절에 외부 에이전트와 자체 앱을 함께 소개한 함의를 보강했다. 외부 AI가 새 주문 채널이 되면 상품 탐색·선택의 고객 접점이 앱 밖으로 이동할 수 있고, 자체 앱의 AI는 기존 접점에서 구매 과정을 개선한다는 모임의 해석이다. 자체 앱의 성과 우위를 입증한 것으로 쓰지 않았으며, 두 경로의 이용량·구매 전환·반복 사용을 같은 기준으로 비교할 자료가 부족하다는 한계를 남겼다.
- Microsoft 합성 데이터 점수를 답변 정확도와 분리했다. 데이터 생성과 정답 검토의 차이는 모임의 해석으로 설명했다.
- Bing의 적용 시작·전환 마감을 나눴다. 개인 제출 초안을 IETF가 승인한 표준이나 작업반 채택 문서로 표현하지 않았다.
- 독자 피드백에 따라 웹 학습 선호 절의 추상적인 운영 제안을 쇼핑몰 예시로 바꿨다. 상품의 검색·답변 노출을 원하면서 모델 학습에는 동의하지 않을 수 있다는 이유를 설명하고, Microsoft의 발표된 선택 방식과 연결했다.
- 기사 전체의 맥락·문체 점검에서 부제·요약·본문·소제목·캡션·실험·공유 설명과 홈·목록 소개를 함께 다듬었다. 새 소식의 조사나 수치 갱신은 하지 않았으며, 기존 확인 기록의 사실·범위·발표 주체·예정 시점을 유지했다.
- ‘다른 완료 기준’은 반복 장보기의 수정 횟수와 고가 상품의 비교 시간으로, ‘운영할 수 있게 만드는 일’은 문서 접근 범위·승인 담당자·실패 후 인계로 풀었다. 보안 절은 조회 계정의 권한을 제한하는 이유와 탐지 뒤 중단 절차를 연결했다. 이 사례들은 모임의 적용 예시다.
- 실험은 등록 시각과 승인된 결정 이력을 우선하는 두 검색 방식, 과거·현재 질문, 미승인 변경안과 근거 충돌의 처리 차이를 명시했다. ‘다음 단계’는 자료 종류·예외를 늘린 평가로 구체화하고, 반복 검토의 기억 효과를 한계로 남겼다. 실행 결과를 추가한 것은 아니다.
- 비용 추정은 이번 기사 범위에서 새로 만들지 않았다. 실험의 토큰·재시도·검토시간은 측정 제안이다.
- Cognizant의 인력 규모와 세 초기 업무 영역을 정적 설명도로 추가했다. 공식 10월 30일 발표의 Codex 개발 지원, 기존 코드 분석·클라우드 코드 생성, 영업·서비스·지원 적용을 재구성하고 엔지니어 검토 조건을 남겼다. 같은 내용을 나열하던 본문 한 문장은 도식으로 옮겨 반복을 줄였다. 2만 1천 명 교육 이수·4만 배지와 바이오 제약회사 사례 성과는 별도 본문에 유지했다.
- Cognizant 고객 사례의 원문 표현 `OpenAI-powered enterprise assistant`에 맞춰 첫 언급은 ‘OpenAI 기반 기업용 AI 어시스턴트’, 이후에는 ‘AI 어시스턴트’로 통일했다. 원문에 명시된 공동 개발 맥락도 반영했다. 특정 제품명이나 공식 한국어 명칭을 뜻하지 않는다.

## 공식 용어 대조와 수정

2026-10-31 후속 요청으로 다섯 소식의 원문 용어를 다시 대조했다. 아래 한국어 표현은 원문 의미를 살린 기사 번역이며, 별도 공식 한국어 제품명으로 제시하지 않는다. 제품·플랫폼 이름은 영문을 유지하고, 범위가 흐려진 기술 용어는 첫 등장에 원문이나 기능 설명을 붙였다.

| 소식·근거 | 기존 표현 | 원문 용어·수정 판단 |
| --- | --- | --- |
| DoorDash [발언 인용 보도](https://techcrunch.com/2026/10/30/doordash-said-its-only-received-several-hundred-orders-from-ai-agents/)·[제품 소개](https://about.doordash.com/en-us/news/ask-doordash)·[공식 실적](https://ir.doordash.com/news/news-details/2026/DoorDash-Releases-Third-Quarter-2026-Financial-Results/default.aspx) | 외부 에이전트, 자체 앱 기능, 전체 주문 | `third-party agents`를 제3자 에이전트로 설명하고 이후 외부 에이전트로 유지. `Ask DoorDash`는 공식 명칭을 유지하며 대화형 검색 기능임을 명시. `Total Orders`는 완료 주문 지표라는 조건을 보강. 발언 전문 직접 확인으로 확대하지 않음. |
| [Microsoft Research](https://www.microsoft.com/en-us/research/blog/from-synthetic-enterprise-data-evaluations-to-real-microsoft-copilot-ai-confidence/) | 가상 업무 평가, 내부 도구, 내부 공유 목록 | `Industry Evaluation Data Generation Platform`과 `Microsoft Copilot` 유지. `synthetic enterprise environments`는 ‘합성 기업 환경’, `internal shared catalog`는 ‘내부 공유 카탈로그’로 복원. 카탈로그 등록 대상이 플랫폼임을 명확히 함. `query`와 `composite quality metric`을 평가 질문·종합 품질 지표라는 설명과 함께 표기. 합성 환경은 조직·사용자·업무 기록을 생성한 것임을 유지. |
| [OpenAI 한국어 발표](https://openai.com/ko-KR/index/helping-websites-express-ai-training-preferences/)·[IETF 초안](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)·[Google 문서](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended) | 학습 허용 신호, 규약 초안 | `training preference`를 학습 선호로 병기하고 생성형 AI 모델 학습에 대한 의사임을 명시. 개인 제출 `Internet-Draft`라는 상태와 코드 토큰은 유지. Google 지원 계획도 원문에서 재확인. |
| [Microsoft Bing](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/) | AI 답변의 참고 자료 활용, 새 페이지 설정 | `AI Training`·`AI Grounding`을 모델 학습·그라운딩으로 구분. 그라운딩은 답변 생성 시 웹 콘텐츠를 입력으로 사용하는 동작으로 설명. 페이지별 AI Grounding과 Bing Webmaster Tools 임시 전환 설정의 이름·범위 유지. 일정·예정 상태는 변경하지 않음. |
| [Google·Mandiant 보고서](https://cloud.google.com/blog/topics/threat-intelligence/artex-and-friends-enter-agentic-offensive-frameworks) | 에이전트 기반 도구, 내부 이동, 관리 시스템·계정과 키·설정과 연결·업무 기능·행동 변화 | `agentic pentesting frameworks`를 에이전트 기반 침투 테스트 프레임워크로, `lateral movement`를 측면 이동과 그 동작 설명으로 수정. Table 1의 Control Planes, Identities & Keys, Harden Configurations, Application Protections, Detect Behavioral Changes를 한국어 영역명과 함께 표기. 보안 점검 도구의 악용이라는 구분을 복원. |
| [Cognizant 공식 발표](https://investors.cognizant.com/news-and-events/news/news-details/2026/Cognizant-commits-more-than-25000-professionals-to-OpenAI-delivery-as-enterprises-move-frontier-AI-into-production/default.aspx) | 소프트웨어 개발, 기존 시스템 개선, 고객 업무 자동화, 클라우드용 코드 | `AI-native software engineering with Codex`, `application modernization`, `agentic customer operations`를 AI 네이티브 소프트웨어 엔지니어링·애플리케이션 현대화·에이전트 기반 고객 업무 운영으로 수정. 제품명 `Cognizant Application Modernizer`, 메인프레임 코드 역공학, 클라우드 네이티브 코드 생성 범위와 엔지니어 검토 조건을 도식에 복원. 사용자와 합의한 기업용 AI 어시스턴트 표기는 유지. |

모임의 적용 예시와 실험 설계는 공식 제품 기능이나 표준 명칭이 아니므로 문체를 유지했다. 제목·호수·발행일·통계 수치·출처 링크를 바꾸지 않았고, 합성 기업 환경에 대한 표현은 본문·요약·메타 설명·홈·목록·실험 도입을 함께 맞췄다. 새 미디어·기능은 추가하지 않았다.

## 실험 중복 검토와 설계

최근 일반뉴스 실험: 10월 27일 쿠폰 변경의 작성·별도 검토, 28일 쿠폰·반품·정산 영향 분석, 29일 참여형 이벤트 지급 상태, 30일 재시도·늦은 비용 기록 대조를 확인했다.

이번에는 합성 업무 기록의 시간적 일관성으로 문제를 바꿨다. 질문은 새로 등록된 과거 문서가 있어도 현재 유효한 일정·담당자와 과거 결정을 구분하는가다. 언어·프레임워크는 결과를 결정하지 않으므로 지정하지 않았다.

- 입력: 가상 출시 결정·변경 승인·사본 기록. 문서 ID, 결정 시각, 등록 시각, 승인 상태.
- 출력: 일정·담당자·근거 ID·확정/보류. 시스템 실패 별도.
- 조정용 이력 8묶음, 별도 최종 이력 12묶음 × 과거/현재 질문 2개 = 24건. 동일 이력 변형을 양쪽에 분배하지 않는다.
- 비교: 관련 문서를 등록 시각순으로 전달하는 검색 대 질문 시점까지 승인된 결정·변경 이력을 우선하고 시각·승인 상태를 함께 전달하는 검색. 모델·지침·문서 수 제한 고정.
- 각 방식 3회. 회차별 분모 24건, 날짜·담당자·상태·근거 모두 맞춘 정답과 불필요 보류·실패 별도 집계.
- 기대 사례: 월요일 11/6·A → 수요일 승인 11/13·B → 목요일 월요일 문서 사본. 현재 답은 11/13·B, 근거는 수요일 승인 메일.
- 예외·실패: 미승인 변경안만 추가되면 기존 승인 결정 유지. 승인 기록 충돌·필수 첨부 누락으로 확정할 수 없으면 보류, 시간 초과·형식 오류는 시스템 실패. 가상 문서 읽기 전용.
- 결과물: 변경 이력·합성 문서·모델에 제공하지 않는 정답·실행 설정·오류 보고서. 실험은 실행하지 않았다.

## 검증 기록

- `node --test`: 기존 71개 테스트 모두 통과. 기사 실험을 실행한 결과가 아니다.
- `git diff --check`: 통과.
- 기사·목록·홈의 로컬 링크, 목차 대상, ID 중복, 외부 링크의 새 탭·rel, noindex를 검사했다. 오류 0건.
- 일반뉴스 33, 단신 12, 전체 45편 확인. 목록에 새 기사 한 번만 등록, 홈 최신 일반뉴스 링크·제목·날짜 일치, 단신 링크 유지.
- 프로젝트 경로 `/hello-human/` 아래에서 loopback 읽기 전용 서버로 검증. 개발용 숨김 폴더·조사 기록은 제공하지 않는다. 초기 격리 서버의 연결 실패를 해결한 뒤 실제 HTTP 화면으로 확인했다.
- 실제 브라우저의 1280px 데스크톱, 390px·320px 좁은 화면에서 제목·본문·코드 예제·표·실험 흐름을 확인. 검사한 모바일 폭에서 가로 넘침 없음. 라이트·다크 모드와 테마 전환 확인.
- 공식 이미지 두 장 로딩 확인. 내려받은 원본의 실제 크기 2400×2146, 1400×782에 맞춰 HTML 속성과 미디어 기록을 수정했다. 캡션·원문 링크·비율 확인.
- 목록 필터에서 단신 12편·일반뉴스 33편 표시, 새 기사 단신 탭에서 숨김. 기사 열기·목차 이동·목록 복귀·새로고침 후 새 기사에 잘못된 Updated 표시 없음.
- 홈 카드에서 새 기사로 이동 확인. 최종 기사 브라우저 콘솔 오류 0건.
- 새 JS나 인터랙션은 추가하지 않았다. 실험 도식은 정적 HTML이다. JS 비활성화·인쇄 화면은 별도로 실행하지 않았다.
- 남은 한계: DoorDash 콘퍼런스콜 음성·전문 직접 확인과 공급사 성과의 독립 재측정은 하지 않았다. 본문에 발언 보도·공급사 주장으로 구분. 모임 실험은 제안 상태다.
- 후속 문장 수정: 쇼핑몰 예시 반영 후 `node --test` 71개와 `git diff --check` 통과. 수정 문단은 파일에서 확인했으며 브라우저 재확인은 탭 연결 오류로 수행하지 못했다.
- 전체 문장 수정 후 최종 검증: `node --test` 71개 통과, 다섯 소식 본문의 수치와 모든 출처·자산 참조가 수정 전과 동일함을 대조했다. 목차·ID·로컬 파일·외부 링크 속성·제목·날짜·noindex 검사 오류 0건.
- 브라우저 연결을 복구해 최종 HTML을 새로고침했다. 1625px 데스크톱과 390px 모바일에서 관점·실험·학습 허용 문단을 확인했으며 가로 넘침 없음. 모바일 라이트·다크 확인 후 원래 데스크톱·라이트 설정 복원, 콘솔 오류 0건. 이번 수정에서는 기사 속 실험을 실행하지 않았다.
- Cognizant 도식 추가 후 기존 테스트 71개와 `git diff --check` 통과. 실제 브라우저에서 데스크톱 3열·390px 모바일 1열, 라이트·다크 표시와 캡션을 확인했다. 390px·320px 폭에서 도식 가로 넘침 없음. 데스크톱·라이트 설정 복원 후 콘솔 오류 0건, 최종 화면 저장. 커밋·푸시·배포하지 않았다.
- 전체 용어 대조 수정 후 기존 테스트 71개와 `git diff --check` 통과. 기사·홈·목록의 ID·목차 대상·로컬 파일·외부 링크 속성·noindex 검사와 주요 용어 8개 확인에서 오류 0건. 데스크톱에서 Cognizant 도식·보안 표, 390px에서 수정 본문·도식·보안 표의 라이트·다크 표시를 확인했다. 320px·390px에서 가로 넘침 없음. 보안 표의 긴 영문이 잘리지 않도록 원문 표기를 작은 별도 줄로 옮기고 열 너비를 조정했으며 기사 전용 CSS 버전을 3으로 올렸다. 최종 데스크톱·라이트 설정 복원과 콘솔 오류 0건 확인. 이번에는 실험 실행이나 새 기능 검증을 수행하지 않았다. 커밋·푸시·배포하지 않았다.
