# 일반뉴스 23호 미디어 기록

## 연구와 후속 업무 연결 썸네일

- 파일: `assets/news/work-execution-thumbnail.png`
- 생성·확인일: 2026-10-21
- 제작: OpenAI 내장 `image_gen` 도구. CLI/API 별도 호출 없음.
- 크기·형식: 1672 × 941px, PNG. 생성 원본을 수정하지 않고 복사.
- 용도: 일반뉴스 23호의 본문 상단, 뉴스 목록, 홈 카드, OG·Twitter 공유 이미지.
- 성격: 단백질 모형·실험용 유리병·업무 카드를 리본으로 잇는 AI 생성 설명용 일러스트. 실제 분자 구조, 제품 화면, 성능 결과를 나타내지 않음.
- 원본 보기: 본문 이미지에서 PNG 파일로 연결. 내용 중심 대체 텍스트와 AI 생성 캡션 제공.
- 출처: 이번 작업에서 생성한 이미지이며 외부 미디어를 복제하거나 실제 제품의 증거로 사용하지 않음.
- 검증: 본문·목록·홈에서 이미지 로딩과 원본 1672 × 941 비율 확인. 390px 모바일에서 가로 넘침 없음. OG·Twitter 경로·크기·대체 텍스트 확인. 기존 7개 테스트와 링크·공백 검사 통과.

## 최종 생성 프롬프트

```text
Use case: stylized-concept.
Asset type: a finished wide editorial thumbnail and article cover for a Korean technology news story about OpenAI acquiring Orchestra Bio to connect scientific research with the next steps of drug-development work.
Create one landscape 16:9 image, approximately 1536 by 864 pixels.
Scene: a carefully art-directed tabletop miniature sculpture on a warm ivory seamless background. Three clear, substantial stations form a continuous left-to-right composition: an abstract folded protein ribbon sculpture in muted moss green on a low pale plinth; a small laboratory rack of three glass sample vials in the center; and an orderly set of layered cream task cards and charcoal modular blocks on the right. One continuous burnt-orange ribbon threads between the stations, physically joining discovery, experimental checking, and coordinated follow-up work. It should feel like research being handed onward into organized work. An editorial metaphor, not a literal molecular structure or actual software diagram.
Style: sophisticated tactile magazine illustration with matte ceramic, folded paper and subtle frosted glass materials, crisp yet softly detailed edges, warm studio light and natural soft shadows, a calm and thoughtful mood. Restrained palette of ivory, charcoal, moss green, and burnt orange that fits a Korean editorial site. Strong simple silhouettes legible at small thumbnail sizes. Fill the frame with the connected subjects while leaving comfortable breathing room, keeping essential elements within the central 80 percent.
Constraints: no words, no letters, no numbers, no code, no company logos, no watermark, no people, no robots, no pills, no syringes, no claims of a proven cure, no glowing cyberpunk effects, no floating UI panels. Fully opaque background.
```

## Shopify·Xero 설명용 도식

- 위치: 기사 Google 절의 `shopify-flow-heading`, `xero-flow-heading` 도식.
- 제작·확인 기준: 2026-10-21. 정적 HTML·CSS로 직접 작성. 이 도식 자체는 원본 제품 화면이나 영상이 아님. 이후 추가한 공식 미디어는 아래에 별도 기록.
- 근거: [Shopify 공식 Gemini 사용 문서](https://help.shopify.com/en/manual/ai-powered-tools/connecting-ai-tools/shopify-connector-for-gemini), [Xero 기능 발표](https://www.xero.com/ca/media-releases/xero-brings-real-time-financial-intelligence-to-google-gemini/), [Xero 활용 시나리오](https://blog.xero.com/news-events/xero-gemini-integration/).
- 상품명·금액·연체 구간은 설명용 가상 데이터. Shopify 질문은 공식 예시 번역, Xero 질문은 공식 기능을 바탕으로 작성. 실제 UI·고객 데이터·실행 결과가 아님을 각 도식에 명시.
- 도식의 근거 자료는 링크로 제공하며 저작물의 포괄적인 복제·사용 권한을 주장하지 않음.

## Shopify 연결 화면 · Google 공식 영상

- 공식 출처: [Google, New tools for small business owners](https://blog.google/innovation-and-ai/products/gemini-app/new-tools-small-business-owners/), 2026-10-20.
- 원본: [27초 시작 화면 영상](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/28518_Solopreneurs_MKT_Skills_HERO_FINAL_under32MB_1.mp4). Google 원문에 게시된 3840 × 2160 MP4이며 원문은 다운로드 링크도 제공한다. 기사에서는 Google 호스팅 원본을 재생하고 동영상 파일은 저장하지 않았다.
- 캡처: `assets/news/work-execution-shopify-official.jpg`, 1280 × 720 JPEG. 원본 영상의 18.018828초 장면을 브라우저에서 일시 정지해 전체 프레임으로 캡처했다. 별도 재그림·문구 삽입·내용 변경 없음.
- 보여 주는 범위: 연결 앱 목록의 Shopify, 설명 문구와 Connect 버튼. 상품별 매출을 조회하는 전체 과정이나 Xero 연결 화면을 보여 준다고 주장하지 않는다.
- 등록: `shopify-official-demo`에 연결 버튼을 가리지 않는 정지 화면과 캡처 원본 링크를 먼저 제공하고, 27초 원본은 펼쳐서 재생하는 네이티브 영상으로 제공. 이미지 대체 텍스트와 출처·발표일·볼 구간·시연 범위 캡션 제공. 자동 재생 없음, 초기 영상 다운로드는 `preload="none"`.
- 권리 안내: 공개된 공급사 원문을 출처와 함께 기사 설명에 사용. 원본의 모든 권리에 대한 자유로운 재배포 허가를 확인했다고 주장하지 않는다.
- 확인: Google 원문과 기사 안에서 영상 재생, 16~19초 연결 앱 구간, 저장한 캡처의 실제 내용을 확인했다.

## Xero JAX · Google Cloud 공식 영상

- 공식 출처: [Xero: Autonomously managing multi-week tax workflows with JAX and Gemini 3.5 Flash](https://www.youtube.com/watch?v=0WKFm_t-Nk4), Google Cloud의 인증된 YouTube 채널, 2026-05-20, 2분 37초.
- 삽입: YouTube 공식 공유 → 퍼가기에서 확인한 privacy-enhanced 플레이어 `https://www.youtube-nocookie.com/embed/0WKFm_t-Nk4`. 영상·썸네일을 다운로드하거나 재편집하지 않았다. 지연 로딩, 자동 재생 없음, 공식 시청 페이지 링크 제공.
- 확인 구간: 0:32 미국 1099 준비의 업무 사례, 0:58 하나의 요청을 후속 작업으로 나누는 구상. 인터뷰·설명용 장면으로 구성되어 있으며 전체 조작 튜토리얼이 아님.
- 범위: Gemini 모델을 쓰는 Xero JAX의 별도 사례. 10월 발표된 Gemini 앱의 Xero 연결 시연과 혼동하지 않도록 영상 위·아래에서 구분했다. 미국 세무 업무 사례를 한국 세무 기능으로 확대하지 않는다.
- 확인: 공식 채널·제목·게시일·영상 길이·자막의 해당 구간과 주요 장면을 원문에서 확인했고, 로컬 기사 임베드에서도 실제 장면 재생을 확인했다.

## 찾지 못한 자료와 제외한 자료

- 2026-10-21 조사한 Google·Shopify·Xero 공식 발표·도움말·공식 채널에서는 Gemini 앱 안에서 Xero 손익·미수금을 조회하는 전용 데모를 찾지 못했다. 그런 자료가 전혀 없다고 단정하지 않는다.
- Xero 발표 글의 장식용 로고 이미지, Shopify 구매자용 결제 시연, 제3자 앱의 Gemini API 데모는 요청한 판매자·회계 연결의 실제 화면 근거로 쓰지 않았다.
- 제품을 직접 연결하거나 실제 상점·재무 데이터로 기능을 재현하지 않았다. 기존 가상 데이터 도식과 공식 미디어를 별도 figure로 구분했다.

## 공식 미디어 등록 후 검증

- 데스크톱에서 영상 펼치기·실제 재생·일시 정지와 Xero 임베드의 실제 장면을 확인했다. 390px 모바일에서 이미지와 플레이어의 가로 넘침 없음, Xero 관련 사례 구분 문구와 밝은/어두운 테마 확인.
- 캡처 파일의 실제 그림과 1280 × 720 비율, 이미지 로딩, 원문·원본 링크를 확인했다. 임시 검사 페이지는 삭제했다.
- `node --test` 기존 7개 통과. HTML 상대 경로·중복 ID·앵커·noindex·목록 개수와 공백 검사 통과. 커밋·푸시·배포 없음.

## Rosalind Workbench · OpenAI 공식 화면과 시연

- 공식 출처: [Meet Rosalind Workbench: Empowering every scientist to be their own research team](https://developers.openai.com/blog/rosalind-workbench), OpenAI Rosalind team, 2026-08-28. 확인일 2026-10-21.
- 화면 원본: [molecular-demo-poster.webp](https://developers.openai.com/images/blog/rosalind-workbench/molecular-demo-poster.webp), 1600 × 941 WebP. `assets/news/work-execution-rosalind-official.webp`로 원본 그대로 저장. 재그림·자르기·문구 삽입 없음. 공식 페이지의 실제 시연 미리보기이며 직접 제품을 사용해 촬영한 화면은 아니다.
- 영상 원본: [molecular-demo.webm](https://developers.openai.com/videos/blog/rosalind-workbench/molecular-demo.webm), 1920 × 1128, 29.4초. OpenAI 호스팅 원본을 재생하며 동영상 파일은 저장하지 않았다. 원본 비율, 네이티브 컨트롤, 펼쳐서 재생, 자동 재생 없음.
- 보여 주는 범위: 대화와 분자 구조 뷰어를 나란히 두고 GLP-1 수용체와 세마글루타이드가 결합한 구조를 살펴보며 주요 특징을 보여 주는 영상을 만드는 공식 예시. 해당 약물의 새로운 효과나 효능을 검증하는 자료로 쓰지 않는다.
- 기사 위치: `openai-official-demo`. 인수 발표의 Rosalind 맥락을 설명하는 기존 제품 시연으로 표시. Orchestra 통합 제품 화면이나 제조 일정 지연 대응의 직접 시연으로 주장하지 않는다.
- 조사 범위: OpenAI 인수 발표와 Orchestra 공식 홈페이지를 확인했으나, 전자는 설명 중심이고 후자는 합류 안내였다. 이번에 확인한 자료에서 Orchestra 통합 화면은 확보하지 못했다.
- 권리 안내: OpenAI 공식 공개 자료를 출처·게시일·범위와 함께 사용했다. 포괄적인 자유 재배포 허가를 확인했다고 주장하지 않는다.

## 전갈 독소 결합체 · Anthropic 공식 설명 애니메이션

- 공식 출처: [How Claude designed protein binders against scorpion neurotoxins](https://www.anthropic.com/research/claude-scorpion-toxin-binder-design), Anthropic, 2026-10-20. 확인일 2026-10-21.
- 영상 원본: [공식 글에 삽입된 MP4](https://cdn.sanity.io/files/4zrzovbb/website/ed77ef7e1a1fc40d96df2ffb4eeaad008ccb702f.mp4), 3840 × 2160, 60초. 원본 호스트에서 재생하며 파일을 다운로드·재편집하지 않았다.
- 기사 위치: `anthropic-official-video`. 원본 비율, 네이티브 재생 컨트롤과 별도 원본 링크, 자동 재생 없음. metadata와 2초 시작 위치를 사용해 첫 설명 장면을 표시한다. 파일 내용은 바꾸지 않았으며 0초부터의 재생도 컨트롤로 가능하다.
- 성격: 독소, 기존 항체와 Claude가 설계한 결합체의 관계를 설명하는 애니메이션. 실제 실험실 촬영이나 Claude 제품 조작 데모가 아님을 명시했다.
- 마지막 장면의 중화 가능성은 연구팀의 예상이며, 세포 시험은 다음 단계로 남아 있다. 결합 확인과 독성 중화·치료 효과 검증을 캡션에서도 구분했다.
- 원문에서 재생·주요 장면과 종료 화면을 확인했다. 공식 글의 이미지 프록시 주소를 별도로 여는 동작은 브라우저에서 차단되어 우회하지 않았으며, 이미지 복제 대신 정상 재생되는 공식 원본 영상을 사용했다.

## OpenAI·Anthropic 추가 후 검증

- 두 영상을 기사 안에서 직접 재생해 영상 길이(29.4초·60초), 실제 시간 진행과 오류 없음 확인. Rosalind 펼치기·접기, Anthropic 초기 설명 장면과 자동 재생 없음 확인.
- 1280px 데스크톱과 390px 모바일에서 새 미디어 확인. 이미지 원본 비율(1600 × 941), 두 figure의 가로 넘침 없음, 밝은/어두운 테마에서 출처·범위·캡션을 확인했다.
- 기존 `node --test` 7개, HTML 경로·ID·앵커·noindex·목록 검사, `git diff --check` 및 신규 파일 공백 검사 통과. 기본 화면 크기와 밝은 테마로 복원. 커밋·푸시·배포 없음.

## Agent Registry · AWS Events 공식 데모

- 공식 출처: [AWS AgentCore Registry: Discover, Govern, and Reuse AI Agents at Scale | AWS Show & Tell](https://www.youtube.com/watch?v=rIcOJrE-fTk), 인증된 AWS Events 채널, 2026-04-15 라이브 방송. 전체 1시간 1분 1초. 확인일 2026-10-21.
- 삽입: YouTube 공식 공유 → 퍼가기에서 확인한 privacy-enhanced 플레이어 `https://www.youtube-nocookie.com/embed/rIcOJrE-fTk?start=2467`. 공유 추적 매개변수는 제외했다. 영상·썸네일을 다운로드하거나 재편집하지 않았으며, 지연 로딩·자동 재생 없음·공식 시청 페이지 링크를 제공한다.
- 기사 위치: `registry-official-video`. 41:07 승인·검색 구간에서 시작한다. 공식 목차의 46:06 사용자 검색 구간으로 바로 가는 링크도 제공한다.
- 확인 내용: 원본의 23:20 관리자 설정과 41:07 승인·검색 구간에서 코드·노트북 실행 화면과 등록 항목의 승인 상태를 확인했다. AWS 관리 콘솔 조작 영상으로 표시하지 않는다. 46:06은 공식 목차를 확인한 구간명이다.
- 범위: 4월 프리뷰 당시 자료. 8월 31일 정식 출시와 본문의 10월 20일 실행 중 도구 탐색 예제에 앞선 시연이라는 점을 영상 위에 표시했다. 현재 API·화면 또는 주문·가격·반품 예제를 그대로 재생한 영상이라고 주장하지 않는다.
- 조사 범위: 10월 실행 중 탐색 글과 8월 정식 출시 글에는 구조 설명 그림이 있었다. 실제 UI 자료로 오인하지 않도록 별도의 공식 시연을 골랐으며, 개인 채널 영상과 다른 MCP 레지스트리 제품의 자료는 제외했다.

## Transform custom · AWS 공식 CLI 화면

- 공식 출처: [AWS Transform custom: AI-driven Java modernization to reduce tech debt](https://aws.amazon.com/blogs/devops/aws-transform-custom-ai-driven-java-modernization-to-reduce-tech-debt/), 2026-02-04, Figure 3. 확인일 2026-10-21.
- 이미지 원본: [atx_custom_java_fig3.png](https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2026/01/23/atx_custom_java_fig3.png), 1430 × 809 PNG. `assets/news/work-execution-transform-official.png`로 원본 그대로 저장했다. 재그림·자르기·문구 삽입 없음.
- 기사 위치: `transform-official-screen`. 원본 비율, 내용 중심 대체 텍스트, 공식 Figure 3 출처와 로컬 원본 확대 링크를 제공한다.
- 보여 주는 범위: 모든 도구를 신뢰한다는 노란 안내와 Java 8 → 21 전환 계획·추가 요구사항 질문. 화면에 보이는 전체 신뢰 설정을 세부 명령 허용 목록과 구분했다. 버전 번호가 보이지 않으므로 CLI 3.9·3.10 화면이라고 표시하지 않는다.
- 시점: 2월 4일은 글의 공개일이며 화면 촬영일로 단정하지 않는다. 본문의 8~9월 Java 예제와 별개의 실행이다. 1.09 Agent Minute에서 중단된 장면을 보여 준다고 주장하지 않는다.
- 조사 범위: 10월 권한·비용 제한 글의 그림은 구조 설명 자료였으므로 실제 화면으로 쓰지 않았다. 공식 Java 가이드의 이미지 내용을 원문과 저장한 원본에서 직접 확인했다. 제품을 설치하거나 사용자 코드를 전환하지 않았다.
- 권리 안내: 공개된 AWS 공식 자료를 출처·발표일·범위와 함께 기사 설명에 사용했다. 포괄적인 자유 재배포 허가를 확인했다고 주장하지 않는다.

## AWS 미디어 추가 후 화면 확인

- 로컬 기사에서 Registry 임베드를 직접 재생해 코드 실행 장면과 41분대에서 42분대로 진행하는 것을 확인하고 일시 정지했다. 원본 시청 페이지와 기사 플레이어 모두 정상 재생됐다.
- Transform 이미지 로딩과 원본 1430 × 809 비율을 확인했다. 1280px 데스크톱과 390px 모바일에서 새 미디어를 확인했으며, 두 figure와 전체 페이지의 가로 넘침이 없었다. 모바일 밝은 테마의 Transform과 어두운 테마의 Registry에서 출처·시점·캡션을 확인했다.
- 기존 `node --test` 7개, HTML 경로·ID·앵커·noindex·목록 검사, `git diff --check`와 신규 파일 공백 검사 통과. 기본 화면 크기와 밝은 테마로 복원했다. 커밋·푸시·배포 없음.

## 전체 기사 흐름 검토에 따른 배치 조정

- 2026-10-21 최종 편집에서 Anthropic 애니메이션을 실험 수치 앞에, Xero JAX 영상을 10월 연결 기능의 가상 예시·작업 범위 뒤에 배치했다. 기존 미디어 6개와 원본 주소·이미지 규격·재생 설정을 모두 유지했다.
- Rosalind·Registry·Transform 캡션의 중복 설명을 줄였다. 기존 시연과 현재 기사 예제의 시점·내용 차이, 설명 애니메이션과 실험 증거의 차이를 유지했다. 자세한 편집 판단은 조사 기록의 “전체 흐름 최종 검토”에 남겼다.
- 배치를 바꾼 Anthropic·Xero 영상의 실제 재생을 다시 확인했다. 데스크톱과 390px 모바일, 밝은/어두운 테마에서 미디어와 캡션 확인. 미디어·표·도식의 가로 넘침 없음. 기존 테스트 7개와 HTML·공백 검사 통과. 커밋·푸시·배포 없음.

## 모임 실험용 가상 자료와 답안 표

- 위치: `experiment-inputs`, `experiment-worklist`. 2026-10-21 편집자가 만든 정적 HTML 자료 카드와 후속 작업표다. 원본 제품 화면이나 AI가 실제 실행해 만든 출력물이 아니다.
- 같은 가상 상품의 독립된 A·B·C 상황을 비교한다. A는 행사 없음·대기 주문 0건, B는 행사 있음·대기 1건·출고 가능 기재, C는 행사 있음·대기 1건·출고 정보 누락이다. 수치는 실적이 아니며 상황 간 합산하지 않는다.
- 상품·행사·역할·승인 규칙도 모두 가정이다. Shopify·Xero·AWS 등 실제 제품 정책을 뜻하지 않는다. 각 작업의 근거와 담당·승인 상태를 글자로 제공하며, C의 정보 누락과 판단 보류를 색상에만 의존하지 않고 설명했다.
- 외부 미디어나 새로운 JS는 추가하지 않았다. 공식 미디어 6개와 기존 자산을 그대로 유지했다.
- 데스크톱과 390px 모바일에서 자료 카드와 표를 확인했다. 밝은/어두운 테마에서 누락·보류 설명과 표 머리글이 읽히고 가로 넘침이 없으며, 근거 링크로 자료 C에 키보드 이동할 수 있음을 확인했다.
