# 일반뉴스 58호 조사 기록

기사 [Docker Agent, 알림이 오면 작업을 시작한다](../news/2026-11-25-docker-mcp-events.html) · 확인일 2026년 11월 25일(한국시간)

첨부 원고의 다섯 소식을 발행 주체의 릴리스, 제품 문서, 규제기관 성명과 대조했다. 날짜만 제공한 발표는 원문 표기일을 사용했다. 원고의 분 단위 조사 구간은 각 발표의 게시 시각을 뜻하지 않으므로 기사에 옮기지 않았다.

| 주제 | 확인한 주장과 범위 | 기사에 반영한 판단과 근거 |
| --- | --- | --- |
| Docker Agent v1.165.0 | 11월 24일 릴리스. 도구 묶음별 실험 설정을 켜면 stdio·Streamable HTTP에서 이벤트를 탐색하고 푸시 구독을 할 수 있다. 기본값은 꺼짐. 개발팀 예제는 5초 간격의 메시지 3개다. | [릴리스](https://github.com/docker/docker-agent/releases/tag/v1.165.0) · [병합된 구현 설명과 예제](https://github.com/docker/docker-agent/pull/4895). 배치·배송은 모임의 가상 적용 예시이며 제품 도입 실적은 조사하지 않았다. |
| MCP Events | 베타 확장. 이벤트 종류별로 poll·push·webhook 중 일부를 제공한다. 안정적인 이벤트 ID로 중복을 알아보고, 커서로 재개할 수 있지만 재생은 선택 사항이다. Docker의 이번 구현 범위에서 폴링·웹훅·커서 영구 저장·연결 교체 뒤 구독 복원이 빠진다. | [공식 개요](https://modelcontextprotocol.io/extensions/events/overview) · [베타 규격](https://github.com/modelcontextprotocol/ext-events/blob/main/specification/beta/events/events.mdx) · [Docker 구현 범위](https://github.com/docker/docker-agent/pull/4895). 규격과 클라이언트가 구현한 범위를 구분했다. |
| Meta Muse 영국 출시 | Meta 원문의 게시 메타데이터는 11월 24일 06:00:40 UTC, 수정은 같은 날 14:25:41 UTC다. CMA도 24일 영국 출시를 확인했다. 영국 18세 이상, iOS·Android·웹·WhatsApp. 일부 파트너는 계정 연결, 일부는 웹 조작. Meta는 구매 전에 확인을 받는다고 설명한다. PayPal은 향후 제공 예정이다. | [Meta 출시 발표](https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/) · [CMA 성명](https://competitionandmarkets.blog.gov.uk/2026/11/24/cma-statement-on-uk-launch-of-meta-muse/). 원고의 23일 표기 대신 영국 기준을 사용했다. 소개 영상에 나온 거래는 Meta가 구성한 예시다. |
| 소비자 보호와 정보 접근 | CMA는 협의 후 Meta가 일부 약관을 고쳤으며 실제 작동 방식을 계속 살피겠다고 밝혔다. CMA와 ICO는 공동 안내에서 접근 권한의 범위와 지속성을 확인하라고 권고했다. | [CMA 원문, ‘Our engagement with Meta’와 ‘Joint tips’](https://competitionandmarkets.blog.gov.uk/2026/11/24/cma-statement-on-uk-launch-of-meta-muse/). [ICO 별도 성명](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/11/statement-on-uk-launch-of-meta-muse/)의 색인에는 자발적 모니터링·보고 참여 문구가 있으나 본문 직접 요청은 HTTP 403이었다. 기사에서는 전문을 읽은 공동 안내의 내용으로 한정했다. |
| Humanity’s First Exam | 11월 24일 구글 딥마인드가 발표. 텍스트·이미지 문항 544개, 기초 능력 20종. 같은 과제와 약간의 변형을 꾸준히 풀 수 있는지 평가한다. 공개 문항은 네온사인 단어별 세 번째 글자의 색을 묻는다. 추가 문항 모집 기한은 12월 15일이다. | [발표와 예제 정답](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/humanitys-first-exam/) · [Kaggle 리더보드](https://www.kaggle.com/benchmarks/deepmind/hfe/leaderboard). 리더보드의 동적 점수표를 검증하지 않아 순위·점수는 인용하지 않았다. 주문표 예시는 모임의 해석이다. |
| OpenAI Agents SDK for Python v0.26.0 | 11월 24일 릴리스. 입력 가드레일 거부 후 대기하던 함수 도구를 중단한다. Realtime 응답 턴 종료 시 출력 가드레일을 검사하고, 세션 기록에 인계 시 가린 정보를 그대로 유지한다. | [릴리스](https://github.com/openai/openai-agents-python/releases/tag/v0.26.0) · [해당 변경](https://github.com/openai/openai-agents-python/commit/90300af) · [한국어 가드레일 문서](https://openai.github.io/openai-agents-python/ko/guardrails/). 병렬 모드에서는 검사가 끝나기 전 실행이 가능하다. 이미 반영된 변경의 취소나 업무 규칙 검증까지 보장한다고 쓰지 않았다. |
| BigQuery 내장 텍스트 임베딩 | 4월 7일 미리보기였던 `embeddinggemma-300m`이 11월 24일 `AI.EMBED`와 `AI.SIMILARITY`에서 GA로 전환됐다. 768차원, 최대 2,048토큰, 128토큰 이하 짧은 문자열에 적합. 이 모델은 BigQuery에서 실행하며 슬롯 또는 처리 바이트에 따른 연산 요금이 든다. | [릴리스 노트](https://docs.cloud.google.com/bigquery/docs/release-notes#November_24_2026) · [모델별 사양과 과금](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-embed) · [한국어 그래프 검색 예제](https://docs.cloud.google.com/bigquery/docs/graph-search?hl=ko). 11월 23일 미리보기로 추가된 별개 모델 `embeddinggemma-2`의 사양·과금과 구분했다. |

## 실험 제안과 계산

최근 55~57호는 취소 요청 중복, 상담 모델 교체, 코드 변경 승인 기준을 다뤘다. 이번에는 첨부 원고의 배치 장애를 유지하고 **규칙으로 이벤트를 선별해도 연결 공백에서 장애를 놓치지 않고 근거가 붙은 조사 메모를 남길 수 있는지**를 묻는다.

- 고유 실행 100건 중 정상 70건과 연결 실패 10건은 기록 또는 규칙 분류다. 데이터 불일치 10건, 시간 초과 5건, 원인 불명 5건은 모델 분석 대상으로 잡는다.
- 기본값에서 분석 대상은 100건에서 20건으로 줄며 차이는 80건(80%)이다. 슬라이더는 분모 100건을 고정하고 선별 비율만 바꾼다. 사건당 한 번 분석한다는 가정에 따른 산술이며, 모델을 호출하거나 시간과 비용을 측정하지 않았다.
- 중복·순서 변경·연결 공백은 원본 100건의 전달 조건을 바꿔 시험한다. 입력을 확정할 수 없는 건은 사람 검토 대상으로 남긴다. 실제 조사 시간 30% 단축과 누락·중복 0건은 제안한 합격 기준이다.

공식 이미지·영상과 자체 도식의 확인 범위는 [미디어 기록](../assets/news/docker-mcp-events-media.md)에 정리했다.
