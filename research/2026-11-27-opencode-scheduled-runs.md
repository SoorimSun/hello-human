# 일반뉴스 60호 조사 메모

- 기사 기준일과 원문 확인일은 2026-11-27 KST. 첨부 원고에서 11월 26일 소식 세 건, 25일과 24일의 배경 자료를 구분했다. 원고에 적힌 08:12 마감까지의 전수 조사는 수행하지 않아 기사에서는 각 발표·보도 날짜를 표시했다.
- 실제 사이트에 쓰는 예시는 가상의 매장과 상품이다. 첨부의 내부 솔루션 이름과 검색 결과의 파비콘을 제외했다.

## 주장별 대조

| 확인 대상 | 근거와 확인 범위 | 편집 판단 |
| --- | --- | --- |
| OpenCode의 모델 지시문 | 11월 26일 [v2.4.2 릴리스](https://github.com/anomalyco/opencode/releases/tag/v2.4.2) 및 [공식 변경 이력](https://opencode.ai/changelog). GPT-6.2 Sol·Astra 및 `gpt-latest` 별칭, Plan 규칙의 시스템 지시문 편입, 압축 뒤 반복 알림 문제 수정을 확인했다. | 모델 자체 성능 향상을 나타내는 전후 평가 수치는 싣지 않았다. 여러 버전이 한 페이지에 나오는 변경 이력 대신 버전 고정 릴리스를 우선했다. |
| 개별 실행과 예약 | 릴리스와 [PR #66422](https://github.com/anomalyco/opencode/pull/66422). 실패를 기록한 뒤 다음 예약을 실행한다. 생성 세션 또는 디렉터리가 사라지거나 구성 자체가 유효하지 않으면 일시 정지한다. 자동화 코드에서 시간 초과한 셸 명령은 백그라운드로 보내지 않고 중단해 해당 호출을 실패 처리한다. | 일반 셸 명령 전체에 대한 변경이나 실패 회차의 즉시 재시도로 확대하지 않았다. 상품 파일 예시는 편집부가 만든 사례다. |
| 접근 권한 | [PR #66000](https://github.com/anomalyco/opencode/pull/66000)과 릴리스의 업그레이드 안내. 새 web fetch 영구 승인은 해당 사이트로 한정되며 과거 승인에 소급하지 않는다. | 다른 사이트, 브라우저 조작과 모든 도구에 일괄 적용되는 권한 정책으로 표현하지 않았다. |
| Debia·Mastercard | Debia가 11월 26일 배포한 [보도자료](https://www.prnewswire.com/apac/news-releases/debia-and-mastercard-sign-mou-to-advance-agentic-commerce-302950485.html). MoU 체결 발표, Agent Pay·동남아 가맹점망·Luban AI Agent를 활용할 공동 실증 계획. 행사 시연은 매장 추천·주문·현장 확인까지. QR·태그는 제안한 현장 확인 방식이다. | 발표일을 서명일로 단정하지 않았다. 전체 가맹점 도입, 시연에서의 실제 자금 정산이나 거래 실적으로 쓰지 않았다. |
| 결제 권한과 의도 | [Mastercard 한국어 제품 페이지](https://www.mastercard.com/kr/ko/business/artificial-intelligence/mastercard-agent-pay.html)에서 등록된 에이전트·네트워크 토큰을, [Verifiable Intent 한국어 설명](https://www.mastercard.com/kr/ko/news-and-trends/stories/2026/verifiable-intent.html)에서 사용자 승인 조건을 기록·검증하는 구상을 확인했다. | Mastercard 프로그램의 설명과 Debia의 구현을 구분했다. 5만 원 승인과 6만 원 가격은 가상 예시다. |
| 미국 규칙의 날짜와 범위 | [BIS 11월 16일 보도자료](https://www.bis.gov/sites/default/files/documents/BIS%20Issues%20Rule%20Addressing%20Remote%20Access%20to%20American%20Super%20Intelligence%20Technology.pdf)와 [11월 19일자 연방관보](https://www.federalregister.gov/documents/2026/11/19/2026-23529/addressing-remote-access-to-advanced-semiconductors)의 Summary, Dates, Background. 일정 연산량을 지정 지역 소재 기업 또는 그곳에 최종 모회사를 둔 기업에 제공하는 데이터센터 관련 첨단 품목 허가 요건을 확인했다. | 26일의 새 규제 또는 해외 연산 자원의 일괄 금지로 표현하지 않았다. |
| 중국 모델 출시 전망과 증류 관련 입장 | 11월 26일 [로이터 원문 전재(Daily Maverick)](https://www.dailymaverick.co.za/article/2026-11-26-us-chip-curbs-distillation-crackdown-threaten-chinese-ai-model-development-sources-say/)와 [같은 기사의 다른 전재](https://economictimes.indiatimes.com/tech/artificial-intelligence/us-chip-curbs-distillation-crackdown-threaten-chinese-ai-model-development-sources-say/articleshow/136182809.cms). 익명 관계자는 GLM-5.5를 2027년 1분기 이후 가능성, Kimi K4를 해외 연산 접근 제약 시 2027년 중반 가능성으로 설명했다. Moonshot은 앞서 Kimi K3 성능에 대해 자체 설계 개선이라고 밝혔다. | 복수 전재는 같은 취재 한 건이다. 발표 시점의 전망을 회사 확정 일정으로, 증류 의심을 위반 판정으로 쓰지 않았다. 후속 보도 검색에서 이 전망을 대체할 확정 일정을 확인하지 못했다. |
| Cloudflare 검색 | 11월 25일 [발표](https://developers.cloudflare.com/changelog/post/2026-11-25-search-for-agents/)와 [설정·응답 문서](https://developers.cloudflare.com/ai-search/how-to/search-for-agents/). 대시보드에서 활성화하면 도메인 인덱스와 발견용 메타데이터를 만들고 `/.well-known/search`에서 Markdown 원문·출처·관련성 점수를 반환한다. 새 인스턴스의 기본값은 하이브리드 검색, 동기화 24시간, 유사도 캐시 활성화(유효기간 48시간)다. | 캐시와 동기화 주기를 합쳐 일괄 지연 시간으로 해석하지 않았다. 원본 문서 검색과 실시간 매장 조회의 차이는 모임의 설계 해석이다. |
| 플랜과 요금 | 모든 플랜에서 켤 수 있다는 발표와 [AI Search 한도·과금 문서](https://developers.cloudflare.com/ai-search/platform/limits-pricing/)의 2026-12-01 과금 개시 안내를 대조했다. | 설정의 Beta 표기와 확인 당시 과금 일정을 함께 적었다. |
| ShellBench 규모와 반복 성공 | 11월 24일 [연구진 설명](https://openclaw.ai/blog/shellbench) 및 [논문 v1](https://arxiv.org/html/2611.32946v1)의 실험 설계, 결과, 부록. 과제 100개, 모델 12종, 하네스 5종, 실제 조합 59개, 추론 강도 3단계, 조건당 3회로 총 53,100회. 단일 시도 통과율은 연구진 하네스 평균으로 GPT-6 Astra 62.5%, Claude Fable 5.2 61.9%, GPT-6.1 Sol 61.4%. GPT-6 Astra는 세 번 중 한 번 이상 75.1%, 세 번 모두 48.8%. | OpenCode의 업데이트 또는 GPT-6.2 성능과 별개인 11월 24일 연구다. 채점 변동의 가능성을 곁들였다. |
| ShellBench 안전성의 분모 | [논문 결론·부록 C](https://arxiv.org/html/2611.32946v1). 전체 53,100회 중 하나 이상 안전성 기준을 위반한 실행 8,340회(15.7%). 정확성 기준을 전부 통과한 26,151회 중 안전성 기준 위반은 2,589회(9.9%). 안전성 기준이 없는 과제는 전체 분석에서 그 기준을 통과한 것으로 센다. | 원고에서 후속 매체에 귀속했던 수치는 원 논문에서 직접 확인했다. 모의 과제 판정으로 한정하고 금융 사고율로 일반화하지 않았다. |

## 시각 자료

| 위치 | 제공자·원본 | 사용과 확인 범위 |
| --- | --- | --- |
| OpenCode 실행 분기 | 11월 26일 [릴리스](https://github.com/anomalyco/opencode/releases/tag/v2.4.2)와 [자동화 PR](https://github.com/anomalyco/opencode/pull/66422), [권한 PR](https://github.com/anomalyco/opencode/pull/66000). | 해당 실행 규칙을 보여주는 제품 화면 대신 이번 실행 실패·명령 중단·예약 일시 정지를 비교하는 HTML 설명도를 만들었다. 권한 PR에는 TUI 화면을 확보하지 못했다는 작성자 기록이 있다. |
| 매장 거래 흐름 | 11월 26일 [Debia 발표](https://www.prnewswire.com/apac/news-releases/debia-and-mastercard-sign-mou-to-advance-agentic-commerce-302950485.html)와 Mastercard의 한국어 제품 문서. | 협약 자료에서 연속된 제품 조작 화면을 확인하지 못했다. 발표의 현장 확인 구상에 가상 수령 상황을 붙인 네 단계 설명도다. 실제 결제 연동 구성도는 공개 자료에서 확인하지 않았다. |
| 모델 공급 일정 | BIS·연방관보·로이터의 발표일 및 보도. | 연산 장비 일반 사진은 일정이나 정책 범위를 보여 주지 않아 날짜와 조건을 본문에 썼다. |
| Cloudflare 베타 토글 | Cloudflare Docs, 11월 25일 [설정 문서](https://developers.cloudflare.com/ai-search/how-to/search-for-agents/) 및 [원본 PNG](https://developers.cloudflare.com/_astro/search-for-agents.CkMydMyZ.png). 로컬 파일 `assets/news/search-for-agents-toggle.png`. | 958 × 244. 리사이즈·크롭·주석 없이 원본 비율을 유지했다. 이미지에서 기능명·Beta·활성화 토글을 확인했다. [문서 저장소 라이선스](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/LICENSE)는 CC BY 4.0이며 캡션에 출처·조건을 표기했다. |
| 반복 성공률 그래프 | OpenClaw, 11월 24일 [연구 발표](https://openclaw.ai/blog/shellbench)의 [원본 PNG](https://openclaw.ai/blog/shellbench/repeat-reliability-dark-v3.png), 1260 × 655. | 공식 서버 원본을 가공 없이 참조한다. 별도 재배포 조건은 확인되지 않아 저장소에 복제하지 않았다. 흰 막대는 GPT-6 Astra, 회색은 59개 조합 평균이다. 범례와 여섯 수치를 이미지와 대조해 대체 텍스트에 담았다. |

## 화면 검증

로컬 HTTP 미리보기에서 Chrome으로 기사·홈·목록을 열었다. 두 이미지가 각각 958 × 244, 1260 × 655로 로드됐다. 제목의 두 구절과 가로 넘침을 320·390·768·1366px에서 점검했고, 데스크톱과 모바일의 화면, 라이트·다크 모드의 계산기를 확인했다. 공식 그래프를 표시하려면 OpenClaw 서버에 연결할 수 있어야 한다.

목차 이동, 목록의 전체 76편·일반뉴스 60편·속보 16편, 홈에서 기사 열기, 읽고 돌아온 뒤 새로고침 시 배지 상태를 확인했다. 계산기의 기본값, 최솟값·중간값·최댓값, 증가·감소·변화 없음, 키보드 입력과 터치 화면의 선택을 점검했다. 자바스크립트를 끄면 기본 가정과 결과가 남고, 인쇄 화면에서는 결과가 표시된다.

## 실험과 계산기

원고의 상품 100개·5개 카테고리·정책 10개를 유지했다. 전호의 API 문서·지시문 개선과 달리, 이번에는 검색 인덱스를 고정하고 업무 원본만 갱신해 검색 경로와 최신성 확인의 효과를 나눠 본다. A는 최신 내용을 표시하는 페이지, B는 이전 인덱스, C는 이전 인덱스와 최신 읽기 전용 API를 쓴다. 조건 B와 C의 검색 자료는 같다. 검증기는 추천뿐 아니라 잘못된 보류·누락도 확인한다. 실험과 주문·결제는 실행하지 않았다.

원고에 남은 기본값을 바탕으로 네 선택 입력을 재구성했다. 선택 범위는 이 기사에서 정했다. 쇼핑 요청 수 5·10·20·40개, 반복 1·2·3·5회, A의 조회 2·5·10·15회, C의 검색과 업무 API 합계 2·3·5·10회다. 조건별 작업 수를 N이라고 하면 세 조건은 3N회 실행한다. A와 C만 비교할 때 각각 N × 페이지 수, N × 호출 수이며, 상대 변화는 (C − A) ÷ A다. 기본값은 조건별 60회, 전체 180회, A 600회, C 180회, C의 조회 요청 수 70% 감소다. 비용과 사람의 처리 시간은 이 식에서 산출할 수 없다. 실험의 30% 목표는 계산기의 가정과 구별했다.
