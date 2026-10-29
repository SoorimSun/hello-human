# AI뉴스 31 미디어 기록

확인일 2026-10-29. 이미지는 공식 공개 자료를 기사 설명에 인용했다. 픽셀 변경·크롭·합성은 하지 않았다. 별도 자유 재배포 라이선스는 확인하지 못했으며 각 제공자의 권리는 유지된다.

| 파일 | 원본·제공자 | 용도와 확인 범위 |
| --- | --- | --- |
| `copilot-fusion-picker.png` (1534×785 PNG) | [GitHub 발표](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/), [이미지](https://github.blog/wp-content/uploads/2026/11/683297831-90d4b889-b7d4-4473-93fc-e75bb8595652.png?w=1536) | Standard·High·Max 선택 화면. 발표문은 10월 28일 표기, 파일 URL의 11월 경로는 원본 공개일의 증거로 사용하지 않았다. 원문 브라우저와 다운로드 파일 대조. |
| `carbon-cwe-bench.webp` (1200×675 WebP) | [Google 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/), [원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_4_carbon_cwe-bench.width-1200.format-webp.webp) | 취약점 수정 평가. Pass@1, 동률 Pass@4, 모델별 실행 도구 표시를 보존. Carbon 71.0%, 가드레일 없이 평가한 조건은 캡션에 표기. 공개일 10월 28일. |
| `joule-studio-intent.webp` (2000×1128 WebP) | [SAP 제품 투어](https://www.sap.com/products/artificial-intelligence/joule-studio/product-tour.html), [원본](https://www.sap.com/content/dam/sapcom/product-tours/en-us/assets/joule-studio-208449ec/bad0b9d5-e181-421a-afa8-3d543f571c75.png?width=2000&format=webply&optimize=medium) | Start Tour → Define your intent 1/5 화면을 확인. 관세 영향 입력과 에이전트·n8n 등 선택지. 원본 URL 확장자는 PNG지만 실제 형식이 WebP여서 저장명만 바로잡았다. 제품 투어의 최초 공개일 미확인. 전체 투어의 동작·성능은 검증하지 않음. |
| `agentic-workflows-run.jpg` (2064×1016 JPEG) | [GitHub 발표](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/), [원본](https://github.blog/wp-content/uploads/2026/10/605360150-74ec2653-4565-4c79-b467-a9d296725e8f.jpg?resize=2064%2C1016) | activations → agent → detection → safe_outputs 실행 예시. 진행 중 화면을 완료 결과로 설명하지 않음. 공개일 10월 28일. |

## 소식별 선택·제외

- Fusion: 공식 선택 화면 채택. 발표의 실행 패턴 이미지는 원문에서도 로딩 실패(naturalWidth 0)여서 제외했다. 공식 제품 문서에 맞춘 HTML 3칸 설명을 대신 제공한다. 이는 자체 요약 도식이며 실제 UI가 아니다.
- Carbon: 발표에 포함된 전체 벤치마크 표·발견·악용·패치·안전성 차트를 확인하고, 수정 결과와 연결되는 CWE 차트만 채택. 수치가 다른 세 과제를 하나의 비교 막대로 재구성하지 않았다. 장식용 대표 이미지는 제외했다.
- SAP: 한국어 보도자료의 연사 사진과 세부 가이드의 분위기 사진보다 기능을 보여주는 직접 연결 제품 투어를 채택했다. 관세 입력과 생성 대상 선택을 보여주는 한 장만 사용한다.
- Agentic Workflows: 출시 글과 공식 문서 홈페이지를 확인했다. 실행과 검증 단계가 보이는 공식 이미지를 채택했다. 별도 Automations의 개선 승인 이미지는 소식 비중을 고려해 추가하지 않았다.
- 새 영상 임베드는 없다. 이미지마다 원문 링크·내용 중심 대체 텍스트·원본 비율을 넣었다.

## 파일 확인

네 이미지 모두 로컬에서 열어 실제 내용과 형식을 확인했다. 본문에서의 로딩·모바일 비율 확인 결과는 조사 기록에 남긴다.

## 참여형 이벤트 설명 시각화

- 기사 안의 참여 조건·역할 흐름 도식과 단계별 재생 화면은 직접 구성한 설명용 자료다. 공식 제품 UI나 실행 결과를 재현한 화면이 아니다.
- 재생은 `assets/news-event-replay.js`에 작성한 네 상황의 각 3단계를 보여준다. 취소·대기자 승계, 마지막 한 자리 경쟁, 같은 날짜의 중복 출석, 지급 응답 유실 후 재요청을 다룬다.
- 모델 호출·운영 데이터·포인트 지급 API를 연결하지 않았다. 실제 동시성 처리나 지급 보장 성능을 검증하는 코드가 아니다. 취소 후 빈자리는 승계 전 판단을 설명하기 위해 분리한 단계다.
- 정적 역할 흐름과 펼쳐 읽는 기대 결과 표를 함께 제공한다. JavaScript를 차단해도 자료를 읽을 수 있다.
