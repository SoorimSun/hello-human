# Docker Agent와 MCP Events 기사 시각 자료

확인일 2026년 11월 25일. [일반뉴스 58호](../../news/2026-11-25-docker-mcp-events.html)에 사용한 자료다.

## 요청 기반과 이벤트 기반 에이전트 비교 도식

- 편집자가 제공한 ChatGPT 도식을 참고해 58호용 일러스트를 OpenAI 이미지 생성 도구로 새로 그렸다. 지면에는 [배송 지연 조사 비교 도식](mcp-events-agent-comparison.webp)을 1402×1122 WebP로 실었다.
- 제작할 때 두 줄에 같은 배송 지연 상황을 놓고, 위쪽은 담당자의 질문에서, 아래쪽은 배송 시스템의 지연 알림에서 시작하도록 했다. 두 줄 모두 마지막에는 담당자가 대응을 결정한다. 미색 종이에 짙은 청록색 선화로 인물과 운송 기록을 그리고, 아래쪽 알림 전달 경로는 주황색으로 강조했다.
- Docker의 구독 예제 다음에 배치한 가상의 커머스 운영 예시다. 이어지는 MCP 공식 도식은 폴링을 통한 알림 전달 절차를 보여 준다.

## MCP Events 폴링 흐름도

- Model Context Protocol의 [Events 개요 중 ‘How Events work’](https://modelcontextprotocol.io/extensions/events/overview#how-events-work)에 있는 공식 시퀀스 다이어그램이다. [문서 원본](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/extensions/events/overview.mdx)의 Mermaid 정의와 화살표·레이블을 대조했다. [‘Delivery modes’ 표](https://modelcontextprotocol.io/extensions/events/overview#delivery-modes)는 세 방식을 비교하고, 그림은 이 중 폴링만 예로 든다.
- `mcp-events-poll-sequence.png`는 11월 25일 공식 페이지의 밝은 테마에서 도식 전체를 1378×934 PNG로 캡처한 파일이다. 도식 안의 문구·색·순서는 원본 그대로이며 한국어 설명은 기사 캡션에 덧붙였다. 그림을 누르면 원래 크기로 볼 수 있다. [저장소의 문서 라이선스](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/LICENSE)는 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)이다.

## Meta Muse 구매 승인 화면

- 제공자는 Meta다. [영국 출시 발표](https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/)에 실린 [공식 MP4 영상](https://about.fb.com/wp-content/uploads/2026/11/009_3018_Hatch-Sizzle_NAM_Acq_EN_UAC_1920x1080_83s_Null_Muse_M0-1996.mp4?_=1)을 원본 서버에서 불러온다. 영국 발표일은 11월 24일이며 영상은 일반 제품 소개용이다.
- 원본은 16:9, 83초다. 화면을 표본으로 확인했다. 약 28초에는 예상 금액과 Deny·Allow 선택지가 보이고, 약 42초에는 브라우저에서 신청서를 여는 장면이 나온다. 장면 확인 범위는 제품 소개 영상이며 실제 영국 상점에서 주문을 시험하지 않았다.
- `muse-uk-purchase-poster.jpg`는 28초 프레임 전체를 960×540 JPEG로 축소한 것이다. 자막·문구 추가나 크롭 없이 원본 비율을 유지했다. 플레이어는 사용자가 눌러 시작하며 자동·반복 재생을 끈다. 영상 재배포 권한은 별도로 확인하지 않아 동영상 파일을 저장소에 복제하지 않았다.

## Humanity’s First Exam 공개 문항

- 구글 딥마인드가 11월 24일 [공식 발표](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/humanitys-first-exam/)에 공개한 [네온사인 이미지 원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Neon_Sign.width-1200.format-webp.webp)이다. `hfe-neon-sign.webp`는 원본 1200×675 WebP와 같은 파일이며 크롭·덧그림이 없다.
- 유리창 속 다섯 단어와 각 단어의 세 번째 글자를 확인했다. 글의 정답을 여는 설명은 구글이 발표한 색 순서를 한국어로 옮긴 것이다. 공개 이미지의 재이용에 관한 별도 라이선스 표기는 확인하지 못했다.

## 문서와 자체 도식

- Docker와 MCP는 [릴리스](https://github.com/docker/docker-agent/releases/tag/v1.165.0), [구현 설명·예제](https://github.com/docker/docker-agent/pull/4895), [전달 방식 문서](https://modelcontextprotocol.io/extensions/events/overview)를 확인했다. 발표의 고유 동작은 서버가 예제 메시지 세 건을 보내는 과정이어서 본문에 짧게 옮겼다. ‘주문 시스템 → 에이전트 → 운영 담당자’는 모임이 설계한 가상 사례다.
- OpenAI SDK 절의 [주문 취소 타임라인](../../news/2026-11-25-docker-mcp-events.html#sdk-timing)은 헬로우 휴먼이 가상 주문으로 구성한 설명용 도식이다. 입력 검사와 에이전트를 병렬로 실행할 때, 검사에서 거부한 시점에 함수 도구가 아직 대기 중인 경우와 주문 취소가 이미 반영된 경우를 비교한다. 막대는 실행 순서를 나타낸다. [가드레일 실행 모드](https://openai.github.io/openai-agents-python/ko/guardrails/) · [대기 중인 함수 도구 처리 변경](https://github.com/openai/openai-agents-python/commit/90300af)
- BigQuery 절에는 Google Cloud의 [임베딩 및 벡터 검색 소개](https://docs.cloud.google.com/bigquery/docs/vector-search-intro?hl=ko)에 실린 [원본 그림](https://docs.cloud.google.com/static/bigquery/images/embedding-space.png)을 사용했다. 동물과 탈것을 가리키는 단어가 두 무리로 모이는 설명도다. 기사 속 방한 부츠는 이 원리를 쇼핑 검색에 빗댄 예시다. 원본 PNG(1510×1030)를 수정 없이 [bigquery-embedding-space.png](bigquery-embedding-space.png)에 보관하고 한국어 캡션을 붙였다. 문서의 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 표기를 따랐다.
- 배치 입력 표와 분석 대상 계산기는 첨부 원고의 구성으로 제작했다. 고유 이벤트 100건, 건당 한 번 분석하는 가정에서 비율만 달라진다. 실제 모델이나 이벤트 서버에 연결하지 않는다.

## 기사에서 확인한 동작

Chrome에서 데스크톱 1,365px과 모바일 390px·320px 너비로 열었다. Muse 영상은 기사 안에서 키보드로 재생하고 시간이 진행한 뒤 일시 정지했다. 플레이어가 읽은 원본은 1920×1080, 83초였다. HFE 이미지가 원본 너비 1200px로 로드되고 정답을 펼칠 수 있음을 확인했다. 계산기는 키보드로 0%·100%를, 터치로 중간값을 확인했다. JavaScript를 끈 화면에도 기본값 20건과 차이 80건이 표시됐다.
