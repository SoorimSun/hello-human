# AI가 화면을 만들고, 작은 모델이 판단하며, 실행은 격리한다

- 발행·확인일: 2026-10-08, 한국시간. 원문 날짜는 각 발행처 표시 기준이다.
- 대상: 일반뉴스 ISSUE 10. 사용자 제공 원고를 공식 발표·문서와 대조해 로컬 HTML로 편집한다.
- 범위: 10월 6~7일 발표. ‘최근 24시간’은 정확한 시간 범위가 아니므로 쓰지 않는다.
- 원격 게시: 커밋·푸시·배포하지 않는다.

## 주장별 확인

| 주장 | 주체·대상·시점·단위 | 직접 확인한 근거 | 상태와 편집 판단 |
| --- | --- | --- | --- |
| GPT-6 Intelligent UI 확대 | OpenAI, ChatGPT Chat 탭, 10월 7일 유료 플랜부터 순차 배포·8일부터 Free/Go 확대 | [공식 발표](https://openai.com/index/gpt-6-for-everyone/), [한국어 경로](https://openai.com/ko-KR/index/gpt-6-for-everyone/), [릴리스 노트](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) | 발표 확인. 전체 계정 배포 완료로 쓰지 않는다. Work·Codex 모델 변경 아님. Pro 플랜과 Pro 추론 옵션을 구분하며 Astra의 Pro 추론은 Intelligent UI 미지원. |
| UI 구성과 점진 표시 | 버튼·입력창·차트 등 컴포넌트와 생성 중 처리하는 컴파일러 | 위 발표의 How Intelligent UI works | 공급사 설명. BO 상품 조회는 출시 기능이 아닌 가상 적용 아이디어로 별도 표시. |
| 공식 UI 데모 | OpenAI가 선정한 더치페이 계산기 | [원본 데모](https://cdn.openai.com/ctf-cdn/intelligent-ui/bill-splitter-v5.html) | 발표 페이지에 포함된 원본을 브라우저에서 열고 기본값의 Split the check를 눌러 결과 표시 확인. 새 프롬프트로 모델 생성 실험을 한 것은 아님. 캡처 2개, 미디어 기록 별도. |
| Haiku 5.5 출시·용도 | Anthropic, 10월 7일, 반복 요약·분류와 보조 에이전트 | [발표](https://www.anthropic.com/claude-haiku-5-5), [한국어 릴리스 노트](https://support.claude.com/ko/articles/12138966-릴리스-노트) | 발표 확인. 복잡한 코딩 전체를 대체한다는 표현 제외. |
| Haiku API 단가 | USD/100만 토큰. 4.5 입력 1·출력 5. 5.5 프롬프트 10만 이하 입력 0.10·출력 0.50, 초과 입력 0.50·출력 2.50 | 발표 Pricing·각주 2 | 확인된 게시 단가. 짧은 구간 90%, 긴 구간 50% 인하. 입력과 출력의 달러 축을 분리한다. 같은 토큰 수의 비교이며 총 작업 비용 아님. |
| 평균 실행비 약 75% 감소 | Anthropic, 이전 Haiku 요청 길이 분포와 새 토크나이저의 사용량 변화 반영 | 발표 각주 2 | 공급사 산정값. 직접 측정 아님. 모든 요청에 75% 절감 보장으로 쓰지 않는다. |
| Sonnet 5.5 캐시 | 읽기 USD/100만 토큰 0.20→0.10. 대부분 에이전트 작업비 약 20% 감소 추정 | 발표 Further updates | 단가 50%와 전체 작업비 추정 20%를 분리. |
| Haiku Copilot 제공 | 10월 7일, Copilot Pro·Pro+·Max·Business·Enterprise, 순차 배포·관리자 정책 적용 | [GitHub 공지](https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/) | 정식 제공 발표 확인. 모든 계정에서 즉시 표시된다는 표현 제외. |
| Decisions 공개 베타 | OpenAI, 10월 6일 변경 기록, 현재 gpt-6-luna | [변경 기록](https://developers.openai.com/api/docs/changelog), [가이드](https://developers.openai.com/api/docs/guides/decisions) | 베타 확인. 텍스트·이미지 입력, predicate/choice/score. 점수는 정의한 단계 인덱스의 확률 가중 평균. |
| Decisions 가격·속도 | 입력 USD 0.10/100만 토큰, 출력·캐시 읽기/쓰기 별도 과금 없음. Responses 대비 약 10배 빠르다는 설명 | 가이드 Pricing and availability·도입부 | 지역 처리·장문 입력 할증 적용. 속도는 공급사 주장, 전체 업무 속도나 비용 절감 배수 아님. 원고의 ‘일반 API는 문장만 생성’ 수정: Structured Outputs·function calling과 용도 구별. |
| 판단 신뢰도 | predicate는 확률, choice/score는 확률 분포와 별도 confidence | 가이드 Interpret the answers | confidence를 실제 정확도나 권한 승인으로 바꾸지 않는다. 데이터 기반 임계값·사람 검토는 모임 제안. |
| MXC 정식 출시·백엔드 | Microsoft, 10월 7일. 프로세스는 Windows 11/macOS/Linux, 세션·WSLc는 Windows 11, MicroVM은 Windows 11/Linux 실험 단계 | [Windows 발표](https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/) | 공식 발표 확인. 모든 격리 방식이 같은 보안 성질을 가진다고 쓰지 않는다. Entra·Agent 365 신원/관리 확장과 Intune 정책은 향후 계획으로 구분. |
| Copilot 로컬 샌드박스 GA | 10월 7일, CLI·앱·Agent Host를 쓰는 VS Code 세션. 조직 정책 강제 지원 | [GitHub 출시 공지](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/) | 정식 제공 범위를 정확히 적는다. 모델 추론과 도구 격리 별개. |
| OS 격리 범위 | 셸 및 기본 로컬 MCP/언어 서버는 프로세스 경계. 내장 파일 도구는 Copilot 내부 정책 검사, 원격 MCP는 로컬 프로세스 경계 밖 | [Microsoft 기술 설명](https://commandline.microsoft.com/local-models-sandboxed-tools-github-windows/) How sandboxes help secure tool execution | 핵심 보정. ‘모든 도구/API를 OS가 격리’로 일반화 금지. 허용된 범위의 업무 오류까지 막는다는 주장 제외. |
| 비밀정보 탐지 모델 | GitHub, 10월 7일, 주변 코드 문맥으로 후보를 분류하는 ModernBERT 모델 | [기술 글](https://github.blog/ai-and-ml/github-copilot/secret-protection-must-scale-with-software/) | ‘모델 공개’는 도입 발표 의미이며 가중치 오픈소스로 오해하지 않도록 ‘새 모델 도입’ 사용. 기존에도 문맥 기반 탐지가 있었음. |
| 기능별 제공·과금 | 기존 AI Password 경고 모델 교체 완료. AI push protection 비공개 프리뷰. /security-review 새 검사 비공개 프리뷰 예정 | [기능·과금 공지](https://github.blog/changelog/2026-10-07-purpose-built-model-for-leaked-secret-detection/) | 기존 경고 추가 요금 없음. 새 선택형 검사는 AI Credits 과금 계획, 향후 공개 프리뷰 활성화에 따른 조건. 기존 /security-review 자체와 새 분류기 추가를 혼동하지 않는다. |

## 편집 판단과 한계

- 제목은 사용자 원고의 방향을 살리고 다섯 발표를 각각 설명한다. 전체 흐름도는 실제 공동 제품이나 필수 아키텍처가 아닌 헬로우 휴먼의 설계 관점으로 표시한다.
- 한국어 OpenAI 경로가 실제 존재하지만 본문 다수는 영문이고 응답 시작 속도 수치가 한글 32%·영문 44%로 섞여 있다. 이번 기사의 핵심이 아니므로 속도 수치를 옮기지 않고 영문 원문·릴리스 노트로 제공 범위를 확인했다. 한국어 경로를 완전한 번역이라 부르지 않는다.
- GitHub 출시 공지와 기술 글은 정식 제공·프리뷰·향후 과금 시점이 다르므로 10월 8일 확인 범위를 기준으로 썼다. 이후 전면 제공을 확인한 것처럼 쓰지 않는다.
- 공급사 성능·비용 주장을 독립 검증하지 않았다. API 호출·실제 업무 시스템 연결·보안 성능 실험을 하지 않았다.
- 가상 운영 요청 50건 실험은 제안이다. 읽기 전용 가짜 조회 함수, 불명확·거절·범위 밖 요청의 사람 검토, 실패·재시도 비용과 사람 시간 기록을 포함한다.
- README는 개별 글을 추가하지 않는 현행 운영 지침을 따른다. 목록·홈·조사 노트·기사 전용 CSS·미디어 기록만 변경한다.

## 로컬 검증 기록

- `node --test`: 7개 통과, 실패 0. 공통 콘텐츠 갱신 로직의 기존 테스트이며 기사 사실 검증의 대체가 아니다.
- 기사·목록·홈의 중복 ID, 같은 페이지 앵커, 상대 자산·링크 존재, noindex, 제목·10호 표기, 목록 날짜순과 동일 날짜의 단신 우선 순서를 확인했다.
- 정적 목록과 브라우저 모두 전체 17편·일반뉴스 10편·단신 7편. 새 기사 등록은 한 번이며 홈의 기존 단신 링크는 유지됐다.
- 기존 로컬 서버에서 데스크톱 1198px, 모바일 390px와 320px 폭을 확인했다. 기사 가로 넘침 없음. 공식 이미지 2개의 로딩과 1265×712 원본 크기를 확인했다.
- 가격 그래프의 라이트·다크 화면, 모바일 한 열 배치, 역할 흐름도의 세로 순서와 한글 줄바꿈을 스크린샷으로 확인했다.
- 목차 이동·현재 절 표시, 뉴스 필터의 10/7/17개 전환, 방향키로 탭 이동, 기사 읽기·테마 조작·목록 복귀·새로고침 뒤 해당 기사에 잘못된 Updated 배지가 생기지 않는 것을 확인했다.
- 홈 최신 일반뉴스를 눌러 새 기사로 이동하는 것을 확인했다. 임시 모바일 뷰포트와 테스트용 다크 모드는 원래 상태로 돌렸다.
- 새 JavaScript는 없다. 주요 내용과 도식은 정적 HTML이므로 전용 스크립트에 의존하지 않는다. JavaScript를 끈 실제 브라우저·인쇄 화면은 별도 검증하지 않았다.

## 문장 다듬기 · 2026-10-08

- 멤버가 쉽게 이해하도록 문장을 다듬어 달라는 요청을 반영했다. 발행일·10호·URL·가격·할인율·제공 단계·출처는 유지했다. 새로운 사실 조사나 최신화 작업은 하지 않았다.
- 설명 전에 업무 장면을 제시하고, 토큰·입력/출력·프롬프트는 가격 그래프 앞에서 풀었다. 캐시, API, 생성형 UI, 샌드박스도 구체적인 용도와 함께 설명했다.
- Decisions의 문의 분류, GitHub의 인증 정보 탐지, 모임 실험을 일반 멤버가 이해할 수 있는 말로 바꿨다. 확률은 추정값이며, 분류 결과가 실행 권한을 주지 않는다는 조건은 남겼다.
- 상세 구현 용어 일부는 본문에서 덜어냈다. 원문의 ModernBERT 모델명과 로컬 MCP·언어 서버 등 구체 항목은 위 검증 표에 남아 있다. 운영체제 격리와 앱 내부 권한 검사, 원격 도구의 차이는 본문에서도 유지했다.
- 부제·요약·도식 설명·홈·목록 소개도 함께 다듬었다. 공식 시연을 직접 새로 생성한 결과로 오해하지 않도록 캡처 설명을 유지했다.
- 문장 수정 후 기존 테스트 7개와 공백 검사, 앵커·자산·호수·날짜·가격 수치·목록 편수·소개 문구 일치를 확인했다. 데스크톱 1198px와 모바일 390px에서 가로 넘침 없이 표시됐으며, 비밀정보 본문과 실험 평가 항목의 줄바꿈을 스크린샷으로 확인했다.
