# 일반뉴스 19호 · 미디어 출처

## AI 생성 협상 에이전트 썸네일

- 기사: `news/2026-10-19-agent-negotiation-rules.html`
- 제작·확인일: 2026-10-19
- 제작 방식: OpenAI 내장 `image_gen` 도구로 새로 생성. CLI·API 별도 호출은 사용하지 않음.

| 항목 | 내용 |
| --- | --- |
| 로컬 파일 | `assets/news/agent-negotiation-rules-thumbnail.png` |
| 원본·제공자 | 이 기사를 위해 생성한 OpenAI 이미지. 외부 원본 URL이나 참고 이미지는 없음 |
| 자료 성격 | AI 협상과 사람의 거래 승인을 표현한 설명용 일러스트. Anthropic 공식 자료·제품 화면·실험 증거가 아님 |
| 실제 크기·형식 | 1733×907, PNG, 2,310,669바이트 |
| 배치 | 기사 제목·부제 아래 대표 이미지, OG·Twitter 공유 썸네일 |
| 가공 | 생성 결과를 그대로 복사. 자르기·색상 변경·텍스트 추가 없음. 원본 비율 유지 |
| 접근성 | 내용 중심 alt, 실제 width·height, 원본 링크, AI 생성 캡션 제공 |
| 이용 조건 | 사용자 요청에 따라 생성한 기사 삽화. 제3자의 공식 이미지나 자유 이용 라이선스가 있는 자료로 표시하지 않음 |

## 최종 생성 프롬프트

```text
Use case: illustration-story. Asset: a polished editorial thumbnail and article hero for a Korean AI news article about AI agents negotiating prices and the need for explicit transaction rules and human approval. Create a wide landscape image, approximately 1.91:1 aspect ratio (ideally 1536 by 804). No text, letters, numerals, brand logos, watermarks, or fake application UI. Main scene: two small abstract AI assistants, represented by tasteful geometric ivory and charcoal desktop-like figures with minimal two-dot faces, sit on opposite sides of a simple negotiation table and exchange proposal cards. The central card is a cream contract sheet with three simple visual symbols for a price tag, a delivery calendar, and a return arrow, with blank checkboxes. Above the central contract, a clearly human hand holds a vermilion-orange approval stamp poised just above the page, not yet stamped: the transaction awaits human approval. Keep the visual story simple, immediately legible at thumbnail size, with the contract and hand as the focal point. Sophisticated magazine editorial illustration, tactile cut-paper construction mixed with understated dimensional forms, subtle paper grain, crisp silhouette shapes, soft natural shadows, warm off-white background, charcoal ink and restrained burnt orange accents, matching a warm minimalist Korean tech publication. Airy balanced composition with substantial negative space around the subject; all meaningful objects inside the central 80% of the canvas. Avoid neon, futuristic city skylines, glowing circuits, stock-photo handshakes, photorealism, dense decorative icons, and any implication of an actual Anthropic product interface. Opaque background.
```

요청 비율에 가까운 1733×907 결과를 채택했다. 별도 리사이즈 없이 파일의 실제 크기를 HTML과 메타데이터에 기재했다. 외부 공유 플랫폼의 실제 카드 수집은 원격 게시 전이므로 확인하지 않았다.

## 검증

- 로컬 브라우저에서 실제 이미지 로딩과 자연 크기 1733×907을 확인했다. 데스크톱·390px 모바일, 라이트·다크 모드에서 이미지와 캡션을 확인했으며 가로 넘침이 없었다.
- OG·Twitter 이미지 URL은 같은 파일을 가리키며 `summary_large_image`로 설정했다. 이미지의 width·height와 메타데이터 크기가 일치한다.
- 기사·목록·홈 링크 및 편수 검사, 기존 테스트 7개, `git diff --check`를 통과했다. 커밋·푸시는 하지 않았다.

## 세계은행 서울 서밋 공식 배너

| 항목 | 내용 |
| --- | --- |
| 로컬 파일 | `assets/news/world-bank-seoul-ai-digital-summit-2026.jpg` |
| 제공자·확인일 | World Bank Group, 2026-10-19 |
| 공식 행사 페이지 | https://www.worldbank.org/en/events/2026/10/19/global-ai-and-digital-summit-2026 |
| 원본 이미지 | https://worldbank.scene7.com/is/image/worldbankprod/GDS-web-banner-780x439-new?qlt=90&resMode=sharp2 |
| 자료 성격 | 행사명·10월 19~22일·서울을 표시한 공식 홍보 배너. 행사 현장 사진이나 AI 생성 이미지가 아님 |
| 형식·크기 | JPEG, 780×439, 59,457바이트 |
| 가공 | 공식 페이지가 표시하는 원본을 그대로 저장. `.jfif` 확장자를 `.jpg`로 변경했으며 이미지 재인코딩·자르기·문구 변경 없음 |
| 배치·접근성 | Small AI 본문의 서울 서밋 소개. 내용 중심 alt, 실제 width·height, 지연 로딩, 원본 보기·공식 출처 링크 제공 |
| 이용 조건 | [세계은행 이용 조건](https://www.worldbank.org/ext/en/legal/terms-conditions)의 일반 자료 비상업적 이용·귀속 표시 조건 확인. 동호회 정보 기사에 원본 그대로 인용하며, 지정된 영문 귀속 문장과 Legal 링크를 캡션에 넣음. 기관 로고를 따로 추출하거나 제휴·후원을 표시하지 않음 |

공식 페이지의 배너와 저장 파일의 내용·780×439 비율을 확인했다. 다운로드 파일과 기사 자산의 SHA-256이 같으며, 원본을 수정하지 않았다.

로컬 기사에서 이미지가 780×439 원본으로 로드되는 것을 확인했고, 데스크톱·390px 모바일과 라이트·다크 모드에서 원본 비율·캡션·출처 링크가 유지됐다.
