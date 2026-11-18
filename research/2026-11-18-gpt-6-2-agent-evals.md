# GPT-6.2의 비용과 평가, 작업을 맡기고 확인하는 도구들

- 기사 기준일과 원문 확인일은 2026-11-18 한국시간이다. 각 발표·평가의 원문 표기일은 2026-11-17이다.
- [일반뉴스 51호](../news/2026-11-18-gpt-6-2-agent-evals.html) · [원본 이미지와 영상 기록](../assets/news/gpt-6-2-agent-evals-media.md)
- 발표 및 접근 범위는 출시 당일 공지와 제품 기록을 기준으로 했다. 제품별 유료 계정 로그인, API 호출, 결제, 실험 실행은 하지 않았다.

## 주장별 확인

| 쟁점 | 확인한 대상·수치·조건 | 근거와 기사 표현 |
| --- | --- | --- |
| OpenAI 모델·접근 | 복잡한 전문 업무용 Astra와 일상 작업용 Sol. ChatGPT Work·Codex의 Plus, Pro, Enterprise, Edu 및 API. API 모델 ID는 `gpt-6.2-astra`, `gpt-6.2-sol`. | [OpenAI 한국어 발표](https://openai.com/ko-KR/index/introducing-gpt-6-2-astra-sol/). 제품 제공과 우수하다는 공급사의 평가를 구분했다. 한국어 본문과 영문 발표의 가격·한계 설명을 대조했다. |
| 표준 API 단가 | 100만 토큰당 일반 입력/캐시 입력/출력은 Astra $8/$0.40/$40, Sol $2/$0.10/$10. Astra 일반 입력·출력 각 20% 인하, 캐시 입력 60% 인하. Sol은 GPT-6.1 Sol 단가 유지. | [OpenAI 한국어 발표](https://openai.com/ko-KR/index/introducing-gpt-6-2-astra-sol/). 이전 Astra와 이전 Sol의 세대를 나눴다. 표준 API 단가를 구독 요금이나 완료 한 건의 가격으로 옮기지 않았다. |
| Agents’ Last Exam | OpenAI가 발표한 GPT-6 Astra 대비 GPT-6.2 Astra의 차이. 여러 단계 전문 업무에서 점수 +5.2, 비용은 1/3 미만. | [OpenAI 한국어 발표](https://openai.com/ko-KR/index/introducing-gpt-6-2-astra-sol/). 해당 벤치마크의 비교 결과로 한정했다. 파일·검색 도구가 없는 두 시험에서 장애 보고 누락이 늘었고 Codex 지침 추가 뒤 누락이 줄었다는 내용도 회사의 관측이다. |
| Artificial Analysis의 독립 평가 | 11월 17일 Intelligence Index v5.0.1에서 최고 설정 기준 Astra 57→62, Sol 55→57. Astra는 Claude Fable 5.2(65)에 이어 2위. Coding Agent Index v2.1에서 Codex/max 기준 Astra 53→53, Sol 52→49. Sol의 세부 저장소 질의응답(SWE-Atlas-QnA-AA)은 14점 하락. | [Artificial Analysis의 독립 평가](https://artificialanalysis.ai/articles/openai-has-the-2-model-in-the-intelligence-index-with-the-release-of-gpt-6-2-astra-and-gpt-6-2-sol). 원문 본문과 두 원본 그래프의 축·모델 설정·표시 정수를 대조했다. 원 단위 점수를 사용하고 지수를 정확도나 실무 성공률로 환산하지 않았다. |
| Gemini 무료 제공 | 기존 Spark의 작업 기능을 Tasks로 확대. Gemini 4 Hydrogen 기반으로 미국·일본·한국·캐나다·호주·인도에서 무료 순차 출시. 미국 우선 기능으로 업체 전화, 비밀번호 관리자 연동, Google Pay를 소개했다. | [Google의 Tasks 발표](https://blog.google/innovation-and-ai/products/gemini-app/tasks-in-gemini-free-new-features/) · [Gemini 앱 출시 기록](https://gemini.google/kr/release-notes/?hl=ko). 발표자의 정비 예약은 공급사 시연 사례다. 한국 개인 계정에 어느 날 실제로 메뉴가 열렸는지는 확인하지 않았다. 출시 기록의 한국 페이지는 11월 17일 항목을 영어로 제공한다. |
| 결제·승인·실행 환경 | 미국 18세 이상 개인 Google 계정, 영어, 웹·Android·iOS. 상품·상한액 설정 → 항목별 결제 명세 → 사용자 기기 승인 → 결제. AP2, 지원 카드의 디지털 토큰, 계정 전용 하드웨어 격리 가상머신은 Google 설명. | [Gemini 앱 출시 기록](https://gemini.google/kr/release-notes/?hl=ko) · [Google의 Tasks 발표](https://blog.google/innovation-and-ai/products/gemini-app/tasks-in-gemini-free-new-features/). ‘항상 허용’의 장바구니 예를 무제한 자동 결제 권한으로 넓히지 않았다. |
| Microsoft의 모델별 제공 경로 | MAI Code 2와 Flash 모두 GitHub Copilot. Foundry는 **Flash의 제한 접근 미리보기**. Code 2는 복잡한 디버깅·여러 파일 수정, Flash는 빠른 설명·수정에 초점. | [Microsoft AI 모델 소개](https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/) · [Ignite 모델 종합 발표](https://microsoft.ai/news/microsoft-ignite-2026/). 두 모델 모두 Foundry 제공이라는 초안을 고쳤다. 비용 대비 성능은 특정 벤치마크와 출시 할인 조건의 비교다. |
| Copilot의 요금제 | Code 2는 Pro·Pro+·Max·Business·Enterprise. Flash는 해당 요금제와 Free·Student. 사용량 기반 과금이며 조직 정책을 적용한다. | [GitHub의 요금제별 제공 안내](https://github.blog/changelog/2026-11-17-mai-code-2-and-mai-code-2-flash-in-github-copilot/). 모델을 쓸 수 있는 요금제와 무료 무제한 호출을 구분했다. 모델 간 자동 인계는 이 제품의 출시 기능으로 소개하지 않았다. |
| Copilot Evals | 공개 미리보기. 스킬·에이전트·MCP에 과제와 검사 조건을 만들고 승인 후 Vally로 실행. 같은 평가의 실행 전후, 도구 호출과 검사를 비교. VS Code 확장, Copilot CLI와 앱 플러그인. | [Copilot Evals 공개 미리보기](https://github.blog/changelog/2026-11-17-github-copilot-evals-is-now-in-public-preview/) · [GitHub의 Evals 사용 예시](https://github.com/github/evals). 자연어 요청과 CLI·앱의 `/eval` 명령을 구분했다. 실행 결과와 평가 기준 자체의 적절성은 별개다. |
| 코드 리뷰와 지표 | Adaptive는 변경 위험·복잡도에 따라 Lite/Balanced/Max 중 선택하는 미리보기. Repository Insights는 조치된 코멘트, 이후 사람이 변경을 요청하지 않은 PR 등을 센다. | [GitHub의 리뷰 깊이 설정](https://github.blog/changelog/2026-11-17-copilot-code-review-adaptive-effort-secret-detection-and-more/) · [Repository Insights의 지표 정의](https://github.blog/changelog/2026-11-17-track-copilot-code-review-outcomes-in-repository-insights/). Evals의 결과 및 운영 결함률과 섞지 않았다. |
| Daydream Agent | iOS와 문자, 취향·예산 기억, 가상 착용·가격 추적. 회사 발표상 1만 개 초과 브랜드, 참여 판매처에서 구매자 승인 후 결제. 200만 명 이상은 2025년 6월 이후 기존 탐색 서비스 이용자. | [Daydream의 출시 발표](https://www.prnewswire.com/news-releases/daydream-launches-first-ever-autonomous-agent-for-fashion-shopping-styling-and-checkout-302941544.html) · [제품 소개](https://daydream.ing/about). 검색·추천에서 실제 구매까지 가는 조건을 밝혔다. 신규 에이전트의 구매·재방문 성과는 제시하지 않았다. |
| Daydream 취재와 계획 | 공동창업자 시연을 취재한 Vogue가 상품망 약 350개 파트너·300만 상품과 멕시코 여행 코디 장면을 전했다. Vogue는 Gmail·Google Calendar 통합을 개발 중이라고 썼고 회사 보도자료는 동의 기반 일반 캘린더 통합을 소개한다. | [Vogue 시연 취재](https://www.vogue.com/article/daydreams-new-ai-agent-can-shop-for-you-while-you-sleep) · [Daydream의 출시 발표](https://www.prnewswire.com/news-releases/daydream-launches-first-ever-autonomous-agent-for-fashion-shopping-styling-and-checkout-302941544.html). 상품망의 출처를 기사에 명시했다. 일반 캘린더와 특정 Google 서비스의 출시 여부를 동일시하지 않아 해당 커넥터의 가용성은 본문에서 제외했다. |

## 01절 그래프의 원자료

[OpenAI 한국어 발표의 Agents’ Last Exam v1.1](https://openai.com/ko-KR/index/introducing-gpt-6-2-astra-sol/#agents-last-exam)에 포함된 Vega-Lite의 `data.values`를 2026-11-18에 확인했다. 가로축은 과제당 비용(미국 달러), 세로축은 점수(0~1을 백분율로 표시)다. 네 모델 각각 Low, Medium, High, Xhigh, Max 다섯 지점에서 최고 점수인 행을 하나씩 골랐다. 점수와 비용은 반드시 같은 설정의 관측값을 쌍으로 사용했다.

| 모델 | 추론 설정 | 원문 score | 원문 cost(달러) | 기사 표시 |
| --- | --- | ---: | ---: | --- |
| GPT-6.2 Astra | Xhigh | 0.7833238427 | 2.890316 | 78.3% · $2.89 |
| GPT-6 Astra | Max | 0.7314293819 | 8.99226256 | 73.1% · $8.99 |
| GPT-6.2 Sol | Max | 0.7304398616 | 1.32483793 | 73.0% · $1.32 |
| GPT-6.1 Sol | Max | 0.7245202634 | 2.01654181 | 72.5% · $2.02 |

두 Astra 최고점의 차이는 5.1894%포인트, 비용 비율은 2.890316 ÷ 8.99226256 ≈ 32.1%다. 새 Astra의 Max 설정은 점수 0.7760714844, 비용 $4.46508051로 Xhigh보다 점수가 낮다. 따라서 발표문의 ‘+5.2점, 비용 3분의 1 미만’은 각 세대의 최고점을 비교했을 때 맞으며, 두 모델의 Max끼리 비교한 수치로 설명하지 않았다.

## 쿠폰 수정 비교 실험과 예시 계산

- 아직 진행하지 않은 제안. 가상 결함 20건(중복 적용·만료·반올림·필수값 각 5건). 시간대를 한국시간으로 맞추고 초기 프로젝트와 정답을 고정한다.
- A에서 사람이 테스트하고, B에서 같은 모델·스킬에 자동화한 공개 검사 피드백을 준다. C는 B에서 스킬만 바꾼다. 모두 같은 횟수의 추가 수정 기회와 동일한 별도 최종 채점기를 사용한다. A와 B의 작업 방식, B와 C의 스킬 효과를 따로 비교한다.
- B·C가 각각 16건 통과했어도 회귀 2건과 개선 2건이 동시에 있을 수 있다. 가상 분할은 계속 통과 14, 새로 통과 2, 새로 실패 2, 계속 실패 2건이다. 이전의 결제 복구(11/14), 실행 비용 장부(11/15), MCP 환경 비교(11/16), 화면 변경 내성(11/17)과 다른 검증 질문이다.
- 금액은 **실험과 별개인 가상 산출**이다. Astra 20건에 재실행 4회, 각 실행에 캐시되지 않은 입력 10,000토큰·출력 2,000토큰을 가정했다. (240,000/1,000,000 × $8) + (48,000/1,000,000 × $40) = $1.92 + $1.92 = $3.84. 완료 16건이면 $0.24/건. API만의 비용이며 별도 도구·세금·인건비는 포함하지 않는다.
- 검토 20×4분과 재시도 검토 4×5분을 가정하면 100분, 완료 16건이면 건당 6.25분. 사람의 시간을 금액으로 환산하지 않았다. 초기에 평가를 만드는 시간은 추가로 기록한다.
