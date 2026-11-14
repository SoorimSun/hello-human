# ISSUE 47 미디어 출처·확인 범위

확인일: 2026-11-14 (한국시간). 기사 `news/2026-11-14-chatgpt-wallet-verification.html`.

## ChatGPT Wallet

- 공식 발표: https://openai.com/ko-KR/index/introducing-chatgpt-wallet/
- 발표일 2026-11-13. 발표문 본문과 실제 브라우저의 이미지·영상 요소를 확인했다. 이 발표문에는 기능 시연 이미지·영상이 없고, 하단 추천 기사의 이미지가 세 개 있다. 이를 Wallet 화면으로 전용하지 않았다. 후속 요청에서 공식 소셜 채널까지 범위를 넓혀 아래 시연을 찾았다.
- 연결된 공식 Commerce Partner Playbook과 결제 문서의 절차를 추가로 읽었다.
- 채택: `#wallet-flow-title`, 구매 준비 → 사람 승인 → 결제 토큰의 자체 HTML 설명도. 실제 제품 UI가 아니며, OpenAI 발표의 현재 절차만 정리했다.
- 추가 채택: https://x.com/ChatGPT/status/2121283151729496235 . 공식 @ChatGPT 계정의 인증 표시·OpenAI 연결·Wallet 발표 링크를 실제 페이지에서 확인했다. 게시 시각 2026-11-13 16:44 UTC = 2026-11-14 01:44 한국시간.
- 처음 사용한 원본 포스터: https://pbs.twimg.com/amplify_video_thumb/2121282439788331008/img/htD5nhmieyyh_0pT?format=webp&name=medium . 1200×675, 흰 배경의 Introducing 문구. 사용자의 후속 요청에 따라 아래 결제 승인 장면으로 교체했다.
- 썸네일 원본 파일: `assets/news/chatgpt-wallet-approval.jpg`, 3840×2160, 349,999바이트. 공식 영상 33.000초 프레임에서 총액 $66.30, 상품, 배송 정보, 선택한 Visa 카드, Approve·Cancel 버튼을 확인했다. 원본 16:9 프레임 전체를 JPEG로 저장했으며 파일 자체의 자르기·합성·문구 추가·UI 재구성은 하지 않았다. 화면의 금액·주소·카드는 공급사의 공개 데모에 포함된 내용이다.
- 현재 표시 범위: 위쪽 대화도 줄여 달라는 후속 요청에 따라 원본의 `(1280, 960)`에서 시작하는 `1280×1200` 영역을 CSS로 발췌한다. 원본 JPEG는 보존하고, 16:15 비율의 표시 영역에 금액·상품·배송 정보·선택 카드·Approve·Cancel 버튼이 들어오도록 했다. 캡션에는 ‘결제 승인 창을 발췌’했다고 표시했다.
- 이전 좌우 크롭은 데스크톱 650×680·390px 모바일 341×420으로 확인했다. 현재 승인 창 중심 크롭은 모바일 341×320이며, 스크린샷에서 위쪽 대화가 빠지고 금액·상품·카드·Approve·Cancel 버튼이 모두 보이는 것을 확인했다. 본문 scrollWidth와 clientWidth는 375px로 가로 넘침이 없었다. Enter로 펼치면 크롭 영역이 숨겨지고, 다시 접으면 복구되는 동작도 확인했다.
- 추출 근거: 공식 게시물의 브라우저 재생 자산에서 확인한 `https://video.twimg.com/amplify_video/2121282439788331008/vid/avc1/0/0/3840x2160/H9CIImsUlK6EH9SW.mp4` 초기화 파일과 `https://video.twimg.com/amplify_video/2121282439788331008/vid/avc1/33000/36000/3840x2160/zt2i1PzpZmbWE_uq.m4s` 재생 구간의 첫 프레임. 36~39초 구간도 비교용으로 확인했으나 채택하지 않았다. 브라우저 자산 다운로드 실패 후 공개 구간 파일을 임시 작업 위치에서 디코딩했다. 저장소에는 선택한 JPEG 한 장만 추가했다.
- 영상은 X의 ‘담아온 게시물’ 미리보기에 나온 `https://platform.twitter.com/embed/Tweet.html` 플레이어를 `#wallet-demo`에 임베드했다. 게시물 ID 2121283151729496235, `dnt=true`, `hideThread=true`. 원본 소셜 플레이어를 유지하며 기사에 영상·음성 사본을 포함하지 않는다.
- 시연 길이 약 45.23초, 영상 비율 16:9. 확인 장면: 약 7초 dot과 선물 구매를 상의하는 휴대폰 대화, 16초 상품 추천, 35.46초 상품·총액·배송·선택 카드가 표시된 승인 화면. 일부 장면을 직접 보았으며 전체 음성·모든 프레임을 검수한 것은 아니다.
- 기사에는 공식 영상에서 추출한 결제 승인 썸네일을 먼저 표시하고 누르면 원본 게시물·영상을 펼친다. 재생은 별도 클릭으로 시작한다. 원문 링크·제공자·한국시간 공개일·캡처 시점을 캡션 및 읽은 자료에 남겼다. 별도 재배포 라이선스는 확인하지 않았다.
- 썸네일 교체 검증: 기사에서 로컬 JPEG 로딩, 실제 크기 3840×2160 및 데스크톱 표시 650×366을 확인했다. 390px 모바일에서 가로 넘침이 없고, Enter로 영상을 열면 기존 45.233초 플레이어가 paused 상태로 표시된다.
- 검증: 데스크톱에서 0.02초 → 6.97초 진행, 클릭으로 16.37초 정지, 키보드 Space 재개, 35.46초 정지. autoplay·loop false. 모바일 390px에서도 0.01초 → 6.48초 진행을 확인했다.
- `news-wallet-media.js`는 접을 때 iframe을 `about:blank`로 비워 숨겨진 재생을 끝낸다. 다시 펼치면 원본 플레이어를 다시 로드하며 0초·paused true·autoplay false·loop false를 확인했다. 초기 본문은 바꾸지 않고 DOMContentLoaded 이후에 토글을 연결한다.
- 390px·320px 라이트·다크에서 포스터 비율·캡션·키보드 펼치기와 가로 넘침 없음 확인. 영상 조작 → 목록 복귀 → 새로고침 후 기사에 잘못된 Updated 표시 없음. JavaScript를 끈 별도 세션과 인쇄 미리보기는 확인하지 않았다. 외부 미디어는 X의 서버·접근 정책에 의존하며 공식 게시물 링크로도 볼 수 있다.

## Google Antigravity

- 새 발표: https://www.research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/ (2026-11-13). 본문과 연결된 이전 설명 자료를 확인했다.
- 원본 소개: https://antigravity.google/blog/teamwork-when-ai-becomes-a-research-partner/ (2026-08-27).
- 채택 원본: https://antigravity.google/assets/image/blog/teamwork-distributed-coding-flow.svg
- 제공자 Google Antigravity. 1154×320, 공식 분산 코딩 구조 SVG. 브라우저의 확대 화면에서 Objective·Sentinel·Orchestrator·Explorer·Worker·Critic·Verifier와 거절시 복귀 경로를 확인했다.
- 원본 비율·내용을 그대로 외부 `<img>`로 연결하고 원본 링크를 제공한다. 내려받거나 수정하지 않았다. 8월 배경 도식임을 캡션에 표시해 이번 libgav1 실행 로그·새 측정 결과와 구분했다.
- 원문 공개 표시를 확인했으며, 별도의 재배포 라이선스는 확인하지 않았다. 출처 표기를 재사용 권한으로 간주하지 않는다. 로컬 사본은 만들지 않았다.
- libgav1 수치 카드는 G1 발표의 각 단위를 따로 표시한 HTML이며, 성능을 임의의 실행시간으로 바꾼 그래프는 만들지 않았다.

## llama.cpp

- 원본: https://huggingface.co/blog/ggml-org/llama-cpp-v1 (2026-11-13, ggml-org).
- 텍스트 추출에 보이지 않았던 아래 두 영상을 실제 페이지 DOM에서 확인했다.
  - https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/llama.cpp/llama-cpp-hardware-coverage-final.mp4
  - https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/llama.cpp/llama-cpp-model-coverage-final.mp4
- 각각 1600×900, 8초. 하드웨어 영상의 첫 화면과 재생 메타데이터를 확인했고 전체 장면은 검토하지 않았다. 지원 범위 소개 영상이며 이번 글의 API 호환성 변경을 설명하는 시연은 아니다.
- 채택: 원문의 버전 변경 표를 한국어 HTML 표로 정리. 영상은 공식 발표의 `#backend-and-model-coverage` 위치로 연결하는 카드로 제공했다. 작성자·댓글 프로필 이미지는 제외했다.

## Gemini와 Google Wallet

- 원본: https://blog.google/innovation-and-ai/products/gemini-app/google-wallet-gemini-app/ (2026-11-13, Google).
- 페이지의 `Google Wallet and Personal Intelligence rendering` 영상.
- 원본 URL: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/04_Personal_Intelligence_Wallet_1920x1080_v36_KByoW5y.mp4
- 채택: 외부 원본 MP4를 기사 `<video controls playsinline preload="metadata">`에 연결. 자동·반복 재생을 지정하지 않았다. 제공자 제품 시연이며 실제 계좌 분석을 검증한 자료로 쓰지 않는다. 아래에 공식 발표 링크와 내용 설명을 제공한다.
- 내려받거나 편집하지 않았다. 별도의 재배포 라이선스는 확인하지 않았으며 원문 공개 파일을 직접 연결했다.
- 실제 기사 검증: 1920×1080, 길이 24.066667초, readyState 4, media error 없음. 자동·반복 재생 false, controls true. Space로 재생, 0.10초 → 6.58초 진행을 확인한 뒤 클릭으로 6.71초에 정지했다. 다시 재생하고 14.45초에 Space로 정지해 지출 흐름 차트 장면을 확인했다. 전체 내용을 연속 시청한 것은 아니다.
- 390px 모바일 라이트·다크에서 16:9 표시와 캡션·원문 링크를 확인했다.

## 실험 설명도

- `#recovery-title`: 헬로우 휴먼이 만든 정적 HTML 시나리오. 승인된 가상 주문의 결제 성공, 응답 유실, 기존 거래 조회, 주문 완료를 네 단계로 표시한다.
- 가상 주문·시도·키·금액이며 실제 Wallet API나 실행 결과가 아니다. 키 보관·멱등성·상태 조회는 별도로 구현할 모의 계약이다. 실패 조회시 확인 중 유지와 사람의 대조 경로도 표시했다.
- 원본 외부 이미지나 사내 자료를 사용하지 않았다. JS가 꺼져도 전체 설명·예외 표가 보인다.

## 최종 화면 확인

- 공식 SVG는 기사에서 정상 로딩됐다. 원본의 1154:320 비율을 유지하며, 모바일에서는 원본 확대 링크를 제공한다.
- 자체 설명도·수치 카드·버전 표·실험 표는 320px·390px 화면에서 겹침과 가로 넘침이 없었다. 사람 승인 단계만 공통 강조색을 사용하고 라이트·다크 대비를 확인했다.
- 외부 영상·Google 도식은 원본 서버에 의존한다. Wallet 썸네일은 공식 영상에서 추출한 로컬 JPEG다. 인쇄 화면은 별도로 확인하지 않았다.
