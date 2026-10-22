# 에이전트별 구매 권한 기사, 공식 미디어 기록

- 기사: `news/2026-10-22-agent-permissions.html`, ISSUE 24
- 확인일: 2026-10-22, Asia/Seoul
- 사용자 요청: Walmart에 이어 다른 발표의 공식 이미지도 관련 설명 옆에 배치. 푸시하지 않는 기존 지시 유지.

| 항목 | 기록 |
| --- | --- |
| 로컬 파일 | `assets/news/agent-permissions-walmart-official.webp` |
| 제공자 | Walmart Inc. |
| 공식 소개 페이지 | https://corporate.walmart.com/news/2026/10/Making-It-Possible-for-Agents-to-Shop-on-Behalf-of-Customers |
| 원본 파일 | https://corporate.walmart.com/content/dam/corporate/images/newsroom/2026/10/making-it-possible-for-agents-to-shop-on-behalf-of-customers/Lead-two-phones.webp |
| 발표일 | 2026-10-21 |
| 규격 | WebP, 1920 × 1080, 16:9 |
| 내용 | 왼쪽 구매 이력에 에이전트 주문 표시. 오른쪽 Agent profile에 승인 기준 금액 $50.00, 구매 이력, Delete Agent 메뉴 |
| 자료 성격 | 출시 예정 Agent Profiles의 공식 소개 이미지. 실제 사용·테스트 캡처가 아님 |
| 배치 | Walmart 절의 발표·출시 상태 설명 바로 뒤. MCP 설명과 편집자가 만든 흐름도 앞 |
| 가공 | 원본 파일 그대로 저장. 크롭·합성·문자 덧씌우기·색상 수정 없음. CSS로 원본 비율에 맞춰 축소 표시 |
| 해설 | 원본과 분리한 한국어 좌우 설명, 출처·발표일·예시 금액·직접 체험 아님 표시. 고객 관리 화면에 있는 결제수단 변경 메뉴가 에이전트 권한을 뜻하지 않음을 설명 |
| 이용 조건 | https://corporate.walmart.com/terms-of-use 의 Site Use 확인. 개인·비상업적 열람·다운로드 조건과 재배포 제한이 기재됨. 별도의 공개 재배포 허가는 확인하지 못함. 이번 파일은 사용자가 요청한 로컬 검토본에 배치했으며 원격 게시하지 않음. 공개 배포 전 이미지 이용 범위 확인 필요 |

원본은 발표 페이지의 실제 이미지 요소와 브라우저 자산 목록에서 확인해 저장했다. 미디어 라이브러리의 별도 재사용 허가는 확인하지 못했다. 출처 표기를 자유 이용 허락으로 간주하지 않는다.

## 추가 공식 이미지

아래 세 이미지는 2026-10-22 공식 페이지의 이미지 요소에서 확인했다. 파일 내용을 직접 열어 본 뒤, 원본 비율·내용을 유지해 관련 본문에 배치했다. 크롭·합성·번역문 덧씌우기·색상 변경은 하지 않았다. 설명은 이미지 바깥에 두고, 내용 중심 대체 텍스트·규격·원본 확대 링크·발표 링크를 제공했다. 별도 공개 재배포 허가는 확인하지 못했으며, 이번 요청의 결과는 로컬 검토본이다. 원격 게시하지 않았다.

### Claude Duet 연결 앱

- 로컬 파일: `assets/news/agent-permissions-duet-apps-official.png`
- 제공자: Anthropic. 이미지 안의 상표는 각 권리자 소유.
- 공식 발표: https://claude.com/ko/resources/articles/claude-duet
- 원본: https://assets.claude.com/c3618d5ce675bcaa9716a06d180879c2b94161c3.png
- 규격: PNG, 3840 × 2160.
- 내용: Gmail, Calendar, Drive, Slack, Shopify, QuickBooks 등 연결 앱의 아이콘 모음.
- 배치: Duet의 개인 업무 에이전트 성격·맥락 유지·프리뷰 이용 대상 설명 다음, 읽기·준비와 실행 전 승인을 나눈 표 앞. 이미지 제목은 업무를 이어가기 위해 사용하는 도구라는 역할을 드러내도록 조정.
- 자료 성격: 공식 연결 앱 안내. 제품 사용 화면이나 직접 체험 캡처가 아님.
- 오해 방지: 이미지에 포함된 1Password 로그인은 발표문에서 coming soon으로 설명. 연결과 실행 승인을 구분하는 캡션 추가.
- 선택 근거: 제품 페이지의 휴대전화 화면은 정적 이미지 파일이 아닌 움직이는 HTML 데모였다. 이번 이미지 추가에는 발표 페이지의 원본 파일을 사용했다.

### Cohere Rerank 5 검색 성능 그래프

- 로컬 파일: `assets/news/agent-permissions-rerank-benchmarks-official.png`
- 제공자: Cohere.
- 공식 발표: https://cohere.com/blog/rerank-5
- 원본: https://cdn.sanity.io/images/rjtqmwfu/web3-prod/f7a7f8d8fe71a73238450f2638d6d7d0ad896f7b-3140x1412.png
- 규격: PNG, 3140 × 1412. 발표 페이지가 사용하는 동일 자산의 원본 해상도. 브라우저 제공 축소본의 AVIF 변환 대신 PNG 원본을 저장.
- 내용: ViDoRe V3, BEIR, BRIGHT, nanoMTEB의 RCP-nDCG@10 검색 순위 평가. 비교 대상은 Rerank 5 Pro/Fast, Rerank 4 Pro, Voyage AI Rerank 3/3 Lite, Qwen3-Reranker-8B/0.6B.
- 확인 수치: Rerank 5 Pro의 네 점수는 순서대로 92.2, 90.4, 82.2, 87.3. 묶음별 데이터셋 수는 8, 13, 12, 13.
- 배치: 자체 평가·처리량 조건을 설명한 문단 뒤, 전체 업무 속도와 구분하는 해석 문단 앞.
- 자료 성격: 공급사 자체 평가. 독립 측정, 답변 정답률, 업무 생산성·구매 전환율이 아님. 축 설명과 평가 범위를 원본 아래 한국어로 제공.

### Google Cloud 협력 발표

- 로컬 파일: `assets/news/agent-permissions-google-cloud-official.png`
- 제공자: Google Cloud.
- 공식 발표: https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers
- 원본: https://storage.googleapis.com/gweb-cloudblog-publish/images/Open-ai-google-models-hero.max-2500x2500.png
- 규격: PNG, 2436 × 1200.
- 내용: ‘OpenAI models for Google Cloud customers’ 문구와 점으로 구성된 파형.
- 배치: 협력·모델·비공개 프리뷰 설명 다음, 현재와 예정 기능을 구분한 표 앞.
- 자료 성격: 공식 대표 이미지. Model Garden 사용 화면이나 시스템 구조도가 아님. 캡션에도 비공개 프리뷰 범위를 표시.

### OpenAI 감시 사고 보고서

- 확인한 원문: https://alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring
- 확인 결과: 본문과 기록 발췌 중심이며 기사에 사용할 별도 공식 이미지를 찾지 못했다. 관련 없는 로고·사진을 넣지 않고 기존 사건 타임라인을 유지했다.
