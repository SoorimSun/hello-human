# 일반뉴스 32 조사 기록

- 발행·확인일: 2026-10-30, Asia/Seoul.
- 사용자 제공 초안: Mistral Large 4·Anthropic 비용 분석·OpenAI 감시·Serval·Gemini. 처음에는 로컬 검토만 요청했고, 전체 기사·출처와 제목을 검토한 뒤 2026-10-30 커밋·푸시를 명시적으로 요청했다.
- 기사: `news/2026-10-30-mistral-execution-control.html`.
- 미디어: `assets/news/mistral-execution-control-media.md`.
- 공식 한국어 원문이 실제 제공되는 OpenAI 두 발표에는 한국어 URL을 사용했다. 일부 세부 절은 한국어 페이지에도 영문으로 남아 있어 영문을 읽었다. 다른 발표는 영문 공식 원문을 근거로 삼았다.

## 주장별 확인

| 주장·범위 | 근거 | 상태·기사 표현과 한계 |
| --- | --- | --- |
| Mistral Large 4 공개 프리뷰 10월 6일, 10월 29일 개선 가중치 공개 | [프리뷰](https://mistral.ai/news/mistral-large-4/), [가중치 공개](https://mistral.ai/news/mistral-large-4-oss/), [공개 카드](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) | 공식 발표·모델 파일 목록 확인. 최초 출시와 가중치 공개를 구분. 약 1조 전체 파라미터, 멀티모달. 모델 다운로드·실행은 하지 않음. |
| Coding Agent Index 48%, GLM-5.3 대비 평균 토큰 47% 감소 | [Mistral 원문](https://mistral.ai/news/mistral-large-4-oss/) | Mistral이 AA 평가를 인용한 수치. 직접 재측정·독립 검증으로 표기하지 않음. 공식 다운로드 차트는 High 48·8.5M, GLM-5.3 49·15.9M, Medium 35·5.8M. ‘유사 성능’이지 정확히 동점 아님. 토큰 절감률을 비용 절감률로 바꾸지 않음. |
| Terminal-Bench 4.0 41%, 프리뷰보다 13%p 향상; Low/Medium/High | [동일 발표](https://mistral.ai/news/mistral-large-4-oss/) | 공급사 발표. 이전 프리뷰 28.3%와 이번 글의 반올림 표현을 섞어 정밀 차이로 계산하지 않음. |
| Cyber Index 51%, 악의적 요청 평균 거부율 96.6% | [동일 발표](https://mistral.ai/news/mistral-large-4-oss/) | 서로 다른 평가. 거부율은 JailbreakBench·StrongREJECT·AgentHarm의 사이버 관련 요청 평균. 실제 공격 능력 향상 가능성을 관찰해 가드레일을 조정한다는 회사 설명도 반영. 보안 특화 변형의 제한된 파트너 프리뷰를 공개 가중치와 혼동하지 않음. |
| 가중치 이용 조건 | [라이선스](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B/blob/main/LICENSE) | Mistral Ecosystem Open-Weight, modified MIT. 이용자 또는 계열사의 MaaS 사업 운영 시 상업 사용 전 별도 라이선스 조건. 제3자에게 제공하지 않는 내부 사용·Mistral 공식 제품 사용은 조건 2 예외. 특정 기능/하네스 내 모델 기능만 제공하는 최종 사용자 제품과 단순 요청 중계는 MaaS 정의에서 제외. 원문 조항 1~3 직접 확인. 본문에는 판단을 바꾸는 내부 사용 예외도 표시. 공개 가중치를 학습 데이터까지 공개된 오픈소스로 표현하지 않음. |
| API 요금 $0.70 입력 / $0.07 캐시 입력 / $2.10 출력, 각각 100만 토큰당 | [가중치 공개 발표](https://mistral.ai/news/mistral-large-4-oss/) | 10월 30일 원문 확인. 자체 호스팅 비용과 분리. 최신 요금이 고정된다는 주장은 하지 않음. |
| Anthropic 분석 API 베타 10월 29일 | [릴리스 기록](https://platform.claude.com/docs/en/release-notes/overview), [문서](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api) | Console·Enterprise. `/analytics/usage`, `/analytics/cost`. beta header `analytics-usage-cost-2026-08-24`의 날짜는 출시일이 아님. 기존 API는 계속 지원. |
| 기존에는 조직 총액만 볼 수 있었다 | [이전 안내](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api#migrate-from-the-usage-and-cost-api) | 초안 수정. 기존 API에도 모델·키·워크스페이스별 사용량 분석이 존재. 새 통합·분류·정렬·시간 구간 개선으로 설명. |
| 4시간 내 갱신, 최대 24시간, 월 종료 후 약 7일까지 수정 가능 | [Data freshness](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api#data-freshness) | 공식 문서 확인. `data_refreshed_at` 이후 누락·부분 데이터와 월말 정산 수정을 반영. 최종 합계는 종료 후 최소 7일이 지난 월만 조회하라는 안내도 실험에 반영. 실시간 예산 차단에 단독 사용하지 않는 것은 이 조건에서 도출한 설계 해석. |
| 비용 단위와 연결 키 | [Cost endpoint·How results are shaped](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api) | 금액은 센트 단위 decimal string. amount는 할인 후·크레딧 전. 임의 `workflowId`별 요청 상세를 직접 반환한다고 쓰지 않음. 지원하는 group/시간 구간으로 합계 대조, 내부 호출 기록으로 업무를 연결하는 제안. |
| OpenAI L0~L3 내부 감시 | [한국어 원문](https://openai.com/ko-KR/index/how-we-detect-frontier-model-misalignment/) | 10월 29일 공개. L0 내부 activation, L1 문맥·도구 검토, L2 조사, L3 외부 증거. 민감 작업 L0 생략·L2 직접 대응 등 분기 존재. 모든 작업이 4단계를 순서대로 거친다고 쓰지 않음. |
| Hugging Face 기록 재현의 30분, 침해 30시간 이상 전 | [동일 원문](https://openai.com/ko-KR/index/how-we-detect-frontier-model-misalignment/) | 과거 사고 재생 시뮬레이션. 실제 사건 예방 실적으로 쓰지 않음. |
| 9월 인터넷 접속 15분 내 탐지·3분 뒤 검토 | [동일 원문](https://openai.com/ko-KR/index/how-we-detect-frontier-model-misalignment/) | 실제 학습 실행에 대한 공급사 운영 보고. 초안의 모호한 ‘실험’ 표현을 고침. |
| 외부 API 감시·중단 범위 | [Safeguarding external usage of Astra](https://openai.com/ko-KR/index/how-we-detect-frontier-model-misalignment/), [Misalignment monitoring](https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring) | 특정 고성능 배포 대상. Responses의 persisted reasoning·WebSockets·OpenAI compaction에서 후속 실행 차단 가능. 이 방식이 없으면 감시는 하지만 자동 중단하지 않으며 Chat Completions는 제외. 비동기 감시는 이미 실행된 동작을 되돌리지 않음. 내부 Codex 긴급 호출 비활성과 감시 자체는 구분. |
| Model Spec 다섯 가치와 구현 상태 | [한국어 발표](https://openai.com/ko-KR/index/updated-model-spec/), [10월 29일 사양 Overview](https://model-spec.openai.com/2026-10-29.html) | 목표 행동 문서. production models do not yet fully reflect라는 명시 확인. 모델 원칙과 실행 권한 검사를 분리. |
| Serval $150M Series C, $3B 가치, 시스템 교체 전략 | [공식 발표](https://www.serval.com/blog/we-raised-150m-to-make-everyone-a-builder) | 투자 발표 사실. 성과·절감은 공급사 주장. 익명 자동차 제조사의 45일 사례는 ServiceNow→Serval 이전으로, 전사 IT 서비스 관리·CMDB·하드웨어/소프트웨어 자산 관리·부서별 업무 절차가 범위다. 회사의 모든 시스템을 교체했다는 뜻이 아니다. Reuters 원문을 직접 읽지 않아 Lucid Motors 실명은 제외. |
| Catalyst 기존 GA와 통제 | [8월 20일 발표](https://www.serval.com/blog/catalyst-general-availability) | 사용자 권한·팀 범위·초안·명시적 게시·승인 설정 확인. 초안의 ‘관리자 AI와 직원 AI’ 이분법보다 확인 가능한 실제 통제로 설명. |
| Gemini 대화 안 파일 생성·미리보기·편집 | [Google 발표](https://blog.google/innovation-and-ai/products/gemini-app/edit-files-directly/) | PDF 웹·모바일, 다른 명시 형식 웹. Gemini 사용 가능 언어에서 모든 사용자 제공 발표. 직접 제품 계정에서 기능 테스트하지 않음. |

## 02번 추가 자료 확인

- [Console 공식 도움말](https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console): Usage의 입력·출력 토큰 차트와 모델·API 키 필터, Cost의 워크스페이스·모델·월 선택·일별 비용·CSV 내보내기를 확인했다. 실제 화면에는 로그인과 조회 권한이 필요하다. Console 화면이 새 분석 API를 호출해 구현됐다는 주장은 하지 않았다.
- [공식 Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/observability/usage_cost_api.ipynb): 공개 노트북 코드를 직접 읽었다. `usage_report/messages`·`cost_report`를 호출하는 이전 API용이며, 조회·집계·페이지 수집·CSV 예제를 제공한다. 차트나 웹 데모 앱은 포함하지 않는다. 실제 계정 데이터를 조회하거나 노트북을 실행하지 않았다.
- [이전 안내](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api#migrate-from-the-usage-and-cost-api)와 대조해 새 API에서는 베타 헤더를 추가하고 엔드포인트·조회 매개변수·응답 처리를 바꿔야 한다고 본문에 명시했다. 02번과 읽은 자료 목록에 링크를 추가했다.

## 환산과 가상 업무 비용

- [OFX 원문](https://www.ofx.com/en-gb/exchange-rates/usd-to-krw/)에 표시된 2026-10-29 03:00 GMT+00:00 시장 환율 1 USD=1,328.20 KRW를 채택. 한국시간 12:00. 페이지 하단 월별 평균·다른 사이트 종가와 섞지 않는다. 실거래 환율·원화 계약액을 뜻하지 않는다.
- $150,000,000 × 1,328.20 = 199,230,000,000원 → 약 1,992억 원.
- $3,000,000,000 × 1,328.20 = 3,984,600,000,000원 → 약 3조 9,846억 원.
- 가상 배치 실패 보고서 30건, 재시도 포함 호출 120회. 회당 입력 12,000·출력 1,500토큰을 가정. API를 실행하거나 실제 요청 사용량을 수집한 것이 아니다.
- 입력 1,440,000 / 1,000,000 × $0.70 = $1.008. 출력 180,000 / 1,000,000 × $2.10 = $0.378. 합계 $1.386.
- $1.386 × 1,328.20 = 1,840.8852원 → 약 1,841원.
- 검토 30×2분 + 수정 6×5분 = 90분. 시간당 30,000원 가정 → 45,000원. 실제 추가 결제가 아니라 시간의 가치 환산.
- 총 46,840.8852원 / 검증 통과 27건 = 1,734.8476…원 → 건당 약 1,735원. 근거 부족으로 보류했다고 가정한 3건과 실패·재시도 투입 포함.
- 캐시·배치 할인 미적용. 개발·인프라·검색·세금 제외. 본문에 가정과 포함 범위를 표시했다.

## 실험 선택

- 10월 27일: 쿠폰 변경의 독립 검토와 평가 반복. 28일: 쿠폰·반품·정산 관계표로 영향 분석. 29일: 출석·퀴즈·구매 이벤트의 정책 충돌·지급 오류. 해당 실험 절을 확인했다.
- 이번에는 배치 실패 보고서 생성에서 ‘업무 완료와 비용 확정의 서로 다른 시점’을 다룬다. 재시도·불확실한 타임아웃·중복 수신·수정된 집계의 기록 보존이 검증 질문이다.
- 12건 중 조정 4·평가 8. 모의 응답 파일로 기록기·대조기만 구성. 마지막 호출만 저장하는 기준선과 같은 입력으로 비교한다. 실제 모델 호출·성능 평가·운영 데이터 수집은 범위 밖.
- 시간 순서가 핵심인 세 단계 정적 도식과 실패 기대표를 채택했다. 별도 대화형 재생이나 설치 튜토리얼은 추가하지 않았다. 언어·프레임워크 지정도 검증에 필요하지 않아 초안의 Java 17·Spring Boot 고정을 뺐다.
- 대조 규칙: 모든 페이지 수집 후 동일 스냅샷으로 처리, 업데이트 시 upsert, 이전 버전 보존, incomplete freshness는 보류, 업무별 근거 없는 잔차는 별도 보관. 최초 합계 일치와 월 정산 후 최종 대조를 구분하고, 과금 여부가 불명인 타임아웃은 예약 예산을 유지한다. 실제 공급사 집계는 요청별 영수증이 아니라는 조건을 유지.

## 전체 기사 재검토

- 2026-10-30 사용자 요청으로 다섯 소식과 라이선스·API 문서·공식 Cookbook·환율 출처를 다시 대조했다. 발표 날짜, 성능·요금·투자 수치는 원문과 일치했다. 공급사 성능과 고객 성과의 독립 검증을 뜻하지 않는다.
- Mistral 거부율의 평가 자료 세 가지를 본문에 명시했다. Cyber Index가 기존 기능을 유지한 취약점 수정까지 평가한다는 점을 보완했다.
- Claude 새 API 설명의 불필요한 반박 문장을 덜고, Cookbook 이전 시 필요한 베타 헤더를 추가했다. Console 차트가 이번 API로 만들어졌다는 주장은 하지 않는다.
- OpenAI API 기술 문서를 읽고 감시·자동 중단의 조건, 비동기 처리와 이전 작업을 되돌리지 않는 한계를 추가했다. L2가 전체 기록을 확보할 수 있을 때 조사한다는 조건과 Model Spec의 구현 상태도 명료하게 고쳤다.
- Serval의 45일 사례를 ServiceNow에서 Serval로 옮긴 범위로 한정했다. ‘매번 업무 전체를 새로 추론하는 대신’이라는 근거가 불명확한 비교를 삭제하고, 승인 단계가 조직의 설정 사항임을 제목에도 반영했다.
- 비용 예시의 보류 사유를 가정으로 명시하고, 실험의 과거형을 제안에 맞는 문장으로 바꿨다. 잠정 비용과 월 정산 후 대조, 과금 불명 시 예약 예산 유지 조건을 보완했다.
- 수정 후 `node --test` 71개, HTML 3개의 ID·로컬 경로·외부 링크 속성·기사 편수 검사, 비용 산식 대조와 `git diff --check`를 다시 통과했다. 1440px·390px 미리보기에서 수정한 제목·본문·실패 표를 확인했고, 본문 요소의 가로 넘침이 없었다. 미디어 재생과 인쇄는 이번 문장 검토에서 다시 시험하지 않았다.

## 사이트 반영·검증

- 최대 일반뉴스 31에서 32로 추가. 전체 44편=일반뉴스 32+단신 12. 단신 카드 유지.
- README와 현행 발행 지침은 개별 글 추가 때 README 파일 목록을 늘리지 않도록 정하고 있어 README는 수정하지 않았다.
- `node --test`: 기존 테스트 71개 통과, 실패 0. 새 동작이나 JavaScript는 추가하지 않았다.
- HTML 3개(기사·홈·뉴스 목록)의 중복 ID, 상대 링크·로컬 파일·목차 대상, 외부 새 창 링크의 rel 속성을 검사했다. 새 기사 카드는 한 번만 등록됐고 44/32/12 편수가 일치한다. `git diff --check` 통과.
- Decimal 계산으로 환산 금액·검토 시간·완료 건당 비용을 대조했다. 약 1,841원·45,000원·건당 1,735원이 본문의 가정과 일치한다.
- `/hello-human/` 하위 경로의 로컬 서버에서 1440px 데스크톱·390px 모바일 화면을 확인했다. 밝은/어두운 테마, 제목·목차·분석 카드·실험 도식·실패 표를 확인했고 모바일 본문에 가로 넘침이 없었다.
- 공식 이미지 세 장의 정상 로딩과 원본 비율, YouTube 임베드 재생 진행·종료·키보드 다시보기·탐색을 확인했다. 자막 없음 상태를 확인했다. 세부 내용은 미디어 기록 참조.
- 뉴스 목록에서 전체 44·일반 32·단신 12개가 실제 표시됐다. 탭 클릭과 키보드 선택, 홈 최신 일반뉴스 연결, 기존 단신 카드 유지, 읽은 새 기사에 Updated 표시가 다시 붙지 않는 것을 확인했다.
- 실제 모델/API 실행, 제안 실험, 공급사 제품의 계정 내 기능 검증은 하지 않았다. 인쇄 출력은 별도 렌더링하지 않았다.
- 최종 제목은 ‘Mistral Large 4 가중치 공개, 이제 직접 운영할 수 있습니다’로 정리했다. 기사 H1·문서 제목·공유 제목과 홈·뉴스 목록을 일치시켰다. 커밋 전 기존 테스트 71개와 HTML·비용 산식 검사를 다시 통과했다.
