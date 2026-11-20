# 일반뉴스 53호 조사 기록

검토 기준은 2026년 11월 20일 한국시간이다. 기사 제목은 ‘Mac 앱을 다루는 Gemini, 장부를 연결한 Xero’이다. 사건 날짜는 원문의 표기대로 적었다. 첨부 초안의 ‘최근 24시간’은 서로 다른 시간대의 발표와 이전 연구 공개를 포괄하므로 기사에서는 개별 날짜를 사용했다.

## Mac용 Gemini

- 구글은 11월 19일 미국 영어 환경에서 Mac용 Gemini의 컴퓨터 사용 기능을 순차 제공한다고 밝혔다. Apple Silicon과 macOS Sequoia 15.0 이상, 만 18세 이상 개인 계정, Google AI Plus·Pro·Ultra 구독이 조건이다. 제품 발표 각주와 실제로 연 기능 도움말의 이용 조건을 대조했다. 일부 검색 미리보기에서 빠진 Plus는 두 원문 본문에서 확인했다. 기업·학교 계정 또는 한국 출시로 확대하지 않았다. [발표와 각주](https://blog.google/innovation-and-ai/products/gemini-app/computer-use-mac/) · [기능 도움말](https://support.google.com/gemini/answer/18956635?hl=en-GB)
- 배송 PDF의 무게·치수·주소로 여러 상자의 견적 양식을 채우는 일은 발표사가 든 활용 예다. 나비 시연과 별개이며 견적 성공률이나 시간 절감 측정치는 제시하지 않았다. 별도 가상 화면과 실시간 미리보기, 앱별 거절·허용·계속 허용, 민감한 작업 확인과 중단을 확인했다. [제품 발표](https://blog.google/innovation-and-ai/products/gemini-app/computer-use-mac/) · [조작과 권한 안내](https://support.google.com/gemini/answer/18956635?hl=en-GB)
- 화면 속 외부 지시가 다른 허용 앱의 행동에 영향을 줄 수 있고, 로그인한 세션에도 접근할 수 있다는 설명은 구글 도움말의 위험 항목에서 확인했다. 임시 백업을 만들려는 옵션에는 앱별 한계가 있다. 실제 계정으로 권한·복구를 시험하지 않았다. [구글의 권한 및 백업 안내](https://support.google.com/gemini/answer/18956635?hl=en-GB)

## Xero와 ChatGPT for Accounting

- 11월 18일 OpenAI 릴리스 노트에서 회계 플러그인의 거래 대사, 청구서 입력 초안, 월말 보고서 작성을 확인했다. 19일 발표의 주체는 Xero다. 기존 ChatGPT 연동에서 월말·고객 포트폴리오·분기 검토와 미팅 준비로 넓어졌다고 밝혔다. Xero가 명시한 미국 한정은 이번 Xero 연동에 적용했다. [OpenAI 릴리스 노트](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Xero 발표](https://blog.xero.com/news-events/openai-integration-chatgpt-for-accounting/)
- Xero는 한 번 로그인하여 권한이 있는 고객별 데이터를 조회하고, 회계 변경은 원장과 이력이 있는 Xero에서 수행한다고 설명한다. OpenAI도 승인 전 원본, 회사, 대상, 금액을 대조하고 상태가 불명확하면 재시도 전 앱을 확인하라고 안내한다. 본문의 중복 청구서 검토는 이 절차를 설명하는 가상 예다. 결산 완료율·생산성 결과로 해석하지 않았다. [Xero 발표](https://blog.xero.com/news-events/openai-integration-chatgpt-for-accounting/) · [회계 업무 도움말](https://help.openai.com/ko-kr/articles/20001709-using-chatgpt-for-accounting-work)
- OpenAI의 한국어 경로로 연 회계 도움말은 확인 시 영어 본문이 표시됐다. 11월 18일 공지는 해당 항목을 직접 확인한 영문 릴리스 노트로 연결했다.

## Claude Code의 훅과 자체 호스팅 실행기

- Anthropic의 11월 19일 v2.1.328 릴리스에서 `mcp_tool` 훅에 `onFailure: "block"`을 추가한 것을 확인했다. 검사 훅 호출이 실패했을 때 해당 동작을 막도록 설정하는 기능이다. 업무 도구 자체의 모든 오류나 모든 호출에 자동 적용된다는 뜻으로 쓰지 않았다. [v2.1.328](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)
- 같은 릴리스에서 실행 전 거절된 호출에 관리형 `PostToolUse`를 실행하지 않는 변경을 확인했다. `PostToolBatch`는 그중 상당수를 받지만 거절 표시가 없다. Code Mode의 스크립트 출력에 `UserPromptSubmit` 훅이 더는 호출되지 않으며, 출력 수정은 `PostToolUse.updatedToolOutput`을 쓰도록 안내한다. 실행 전·후 정책을 일반화하지 않았다. [v2.1.328](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)
- 자체 실행기의 두 지표는 재개 세션과 새 세션의 사유별 대기 시간, 실행기 시작을 포기한 원인별 횟수다. 제품이 데이터를 제공한다는 사실만 다뤘다. [v2.1.328](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)
- 후속 v2.1.329에서 Code Mode의 `PreToolUse` 오류 시 기본 동작이 변경된 것을 확인했다. 스크립트 안의 도구 호출을 오류만으로 거절하지 않으며, 차단이 필수라면 명령·HTTP·MCP 도구 훅에 위 설정을 지정하라고 명시한다. 두 변경을 출시 버전별로 설명했다. [v2.1.329](https://github.com/anthropics/claude-code/releases/tag/v2.1.329)

## Genie 4의 세 공개 시점과 API

| 시점 | 확인한 범위 | 근거 |
| --- | --- | --- |
| 10월 28일, 한국어 발표일 | 일부 테스터에게 연구 프리뷰를 제공했다. 11월 18일을 모델 최초 공개일로 잡지 않았다. | [Google 한국어 연구 발표](https://blog.google/intl/ko-kr/company-news/technology/genie-4-a-new-generation-of-world-simulation-kr/) |
| 11월 18일 | 대상 Google AI Ultra 구독자에게 Project Genie 안에서 순차 제공했다. ‘Villa Giallo’가 Genie 4로 만든 사례인 것도 확인했다. | [Google 한국어 제품 발표](https://blog.google/intl/ko-kr/company-news/genie-4-now-available-project-genie-kr/) |
| 11월 19일 | Gemini API의 Interactions API와 Google AI Studio를 통한 개발자 제공을 발표했다. 텍스트·참조 이미지로 시작해 키보드와 텍스트로 변화시키는 720p, 24fps, 동기화된 오디오는 구글이 안내한 사양이다. | [Google 개발자 발표](https://blog.google/innovation-and-ai/technology/developers-tools/genie-4-in-gemini-api/) |
| 11월 20일 문서 확인 | 유료 API 키가 필요하다. 한 세션은 최대 120초이고, 시선을 돌리거나 돌아보면 사물이 바뀔 수 있다. 장시간 공간 일관성과 물리적 정확성을 전제하지 않았다. | [개발 문서의 입력·출력과 알려진 한계](https://aistudio.google.com/docs/genie) |

## 기사에 사용한 미디어

시각 자료는 모두 11월 20일에 확인했다. 아래 구글 영상은 발행사가 제공하는 MP4를 원격 재생한다. 공식 포스터와 Xero의 설명 그림은 원본을 자르거나 재인코딩하지 않고 로컬에 두었다. 각 자료의 제공자와 원문을 캡션에서 연결했다. 별도의 재배포 라이선스는 확인하지 못했다.

| 기사 위치 | 원본과 용도 | 확인 범위 |
| --- | --- | --- |
| Mac 앱 | 11월 19일 구글이 올린 ‘Butterfly’. [발표 페이지](https://blog.google/innovation-and-ai/products/gemini-app/computer-use-mac/) · [MP4](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/butterfly_16x9_261116b_g7DrxbI.mp4) · [공식 포스터](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/video_6251_wagtailvideo-jrku7afu.width-1200.format-webp.webp). 로컬 `assets/news/gemini-mac-butterfly-poster.webp`는 1200 × 675다. | 발표 원문의 대체 텍스트에서 스케치를 Blender로 모델링하는 사례를 확인했다. 포스터의 종이에 그리는 손과 재생 중 약 36초의 나비 장면을 대조했다. Chrome은 원본을 1920 × 1080, 62.8초로 표시했다. |
| 결산 검토 | 11월 19일 Xero의 [발표](https://blog.xero.com/news-events/openai-integration-chatgpt-for-accounting/) · [월말 검토 설명 그림](https://blog.xero.com/wp-content/uploads/2026/11/Xero_ChatGPT_Month_End_Header.png). 로컬 `assets/news/xero-month-end-review.png`는 1000 × 600이다. | 매출·비용·이익을 두 달로 비교하는 일러스트다. 실제 원장이나 고객 UI로 표시하지 않았다. 연결된 [미국 제품 페이지](https://www.xero.com/us/campaign/chatgpt-xero-plugin/)의 일반 연동 안내와 구분했다. 브라우저에서 이미지 디코딩과 원본 크기를 확인했다. |
| Claude Code | 공식 [릴리스 기록](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)과 [후속 변경](https://github.com/anthropics/claude-code/releases/tag/v2.1.329)의 훅 설명을 확인했다. | 제품 화면보다 훅 이름과 실행 시점이 판단을 좌우해, 설정 이름과 동작을 본문에 표시했다. |
| Genie 4 | 11월 18일 구글의 [한국어 Project Genie 소개](https://blog.google/intl/ko-kr/company-news/genie-4-now-available-project-genie-kr/)에 수록된 BLVCKL!GHT 협업 작품 ‘Villa Giallo’. [MP4](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/resized_Villa_Giallo.mp4) · [공식 포스터](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/video_6246_wagtailvideo-vpenwvhu.width-1400.format-webp.webp). 로컬 `assets/news/genie-4-villa-poster.webp`는 1400 × 787이다. | 저택 방 안에서 단서를 살피는 포스터와 약 9초 시점을 대조했다. Chrome은 원본을 2156 × 1212, 16.9초로 표시했다. 작품 시연이며 API 호출 녹화나 720p API 출력의 실측 자료로 사용하지 않았다. API 발표의 도시 배경 홍보 영상과 Project Genie의 Genie 3 예시는 제외했다. |

두 영상은 기사에서 자동·반복 재생을 끄고 키보드로 재생·일시 정지 및 재생 시간 진행을 확인했다. 영상 전체 감상이나 실제 제품 재현은 수행하지 않았다.

## 모임 실험의 설계

11월 17일 일반뉴스는 화면이 바뀐 뒤에도 자동화 코드가 같은 상품을 찾는지를 다뤘다. 18일에는 쿠폰 규칙 회귀, 19일에는 주문 완료율 경보의 원인 판별을 다뤘다. 이번 실험은 첨부 원고의 상품 등록 30건과 세 입력 방식을 유지하면서 **원자료가 바뀐 시점에 저장을 보류할 수 있는가**를 중심으로 삼았다. 화면 위치 변경과 동일 요청 재전송은 별도 회차로 두었다.

직접 입력·화면 조작·구조화 추출 후 API 입력 모두 같은 모의 서비스에서 검증한다. 20건은 정상이고 나머지 10건의 보류 사유는 서로 겹치지 않게 설계했다. 첫 시도의 전체 분모는 30건이다. 정상 거절과 오류 통과는 각각 20건, 10건을 기준으로 별도로 기록한다. 가격표 18,000원 → 19,800원은 가상 상품 가격이다. 본문의 세 단계 그림은 기대 동작을 설명한다. 제품 등록이나 모델 비용·작업 시간 측정은 실행하지 않았다.
