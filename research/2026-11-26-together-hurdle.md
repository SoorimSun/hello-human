# 일반뉴스 59호 조사·미디어 기록

[AI 에이전트가 쓰기 좋은 API는 무엇이 다를까?](../news/2026-11-26-together-hurdle.html) · 2026년 11월 26일 한국시간 확인

GPT-6 Pro로 작성한 11월 26일자 제공 원고를 바탕으로 편집했다. 전달본은 텍스트로, 문장·표·도식 제목·선택 항목·기본 수치는 남았고 원래 HTML·스타일·스크립트와 그림 파일은 포함되지 않았다. 원문의 ‘사람이 사용하기 편한 소프트웨어’ 도입, 네 소식의 순서, 커머스 적용과 다섯 업무, ‘반복 업무의 형태만 바뀐다’는 맺음을 살렸다. 그래프·도식·계산기는 자료에 남은 내용으로 다시 구성했다. 공개 문서 기준에 맞춰 특정 사내 솔루션 예시는 가상 상품 검색으로 일반화했다.

## 주장별 대조

| 주제 | 확인한 사실과 기준 | 기사에서의 처리 |
| --- | --- | --- |
| Hurdle 공개 | Together AI 발표문 표기 11/25/2026. Claude Code와 Codex에 과제를 주고 실행 기록과 결과를 평가한다. 저장소에 MIT 라이선스가 있다. [발표](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs) · [확인한 소스 버전](https://github.com/togethercomputer/hurdle/tree/acd0e7a59de153008021ab35ed83d65b99f34a13) | AX를 API 발견, 업무 조건 이해, 오류 복구라는 질문으로 설명했다. 공개됐다는 사실과 도입 효과를 구분했다. |
| 세 가지 검사 | 코드 검사는 필요한 산출물·요청 등을 확인한다. 가드는 설정한 금지 요청을 막고 시도를 실패로 센다. 모델 심사기는 사전 기준에 따라 실행 기록을 평가한다. [사용 설명](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs) · [검사 작성 문서](https://github.com/togethercomputer/hurdle/blob/acd0e7a59de153008021ab35ed83d65b99f34a13/docs/authoring.md) | 코드 검사로 확인할 금액과 모델에 맡길 정성 평가를 나눴다. |
| 60회 예시 | GPU 클러스터 한 시간 예약 명령을 제시하되 실제 예약은 금지한 공식 과제. Opus 4.8과 Sonnet 4.6, 기본 조건과 Skill 추가, 각각 15회. [공식 예제와 별도 결과 화면](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs) | 1 × 2 × 2 × 15 = 60은 설정으로 계산한 횟수다. 본문의 공식 뷰어 그림과 결합해 60회의 성과나 Skill의 개선율을 추론하지 않았다. |
| 로컬과 샌드박스 | 로컬 실행은 임시 폴더에서 세션을 기록하지만 API 요청 감시·차단은 할 수 없다. Together Sandbox는 실행마다 환경을 만들고 로컬 Guardian이 요청을 중계한다. 샌드박스 안에서는 대체 키를 사용한다. 기본값에서는 API 엔드포인트별 제한이 없다. [발표의 Local runs / Sandboxed runs](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs) | 원고의 ‘로컬 API 요청 검증 제한’을 ‘요청 검사·차단 둘 다 미지원’으로 정정했다. 전체 코드 검사 미지원이라는 뜻으로 확대하지 않았다. |
| ERNIE 공개 시점 | [Baidu 제품 갱신 목록](https://ernie.baidu.com/)에 11월 11일로 표시된 [발표문](https://ernie.baidu.com/release/ernie-5-5-flash-preview/)은 Qianfan API는 사용 가능하고 가중치는 추후 공개한다고 썼다. [커밋 기록](https://huggingface.co/api/models/baidu/ERNIE-5.5-Flash-Preview/commits/main)의 11월 23일 초기 커밋 다음에 파일 업로드 커밋이 있다. [해당 시점 파일 목록](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview/tree/cf778e9c1cc74d4da3ac40c66c473082d3c3dd07)에서 safetensors 분할 가중치를 확인했다. | API 발표, 파일 등록, 후속 보도를 구분했다. 파일 등록 시각을 저장소가 비공개에서 공개로 바뀐 시각으로 단정하지 않았다. |
| ERNIE 수치와 이용 조건 | [Preview 모델 카드](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)의 표에 전체 280B, 토큰당 활성 14B, 최대 문맥 1,048,576토큰. 배포 예시의 기본 예제 설정은 131,072토큰. 후속 학습 중간 체크포인트이며 회사가 자사 모델 점수를 측정했다. Apache 2.0은 Preview 가중치에 적용되며 Base는 별도 라이선스다. | 14 ÷ 280 = 5%는 매개변수 비율로만 표시했다. 실행비·메모리·업무 시간 절감률을 추정하지 않았다. |
| DSpark | [모델 카드의 DSpark 설명](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview#dspark-speculative-decoding)에서 후보 블록 병렬 제안과 본체 모델의 한 번 검증을 확인했다. Preview에는 DSpark 예측 모듈을 포함한다. | 도식의 한국어 조각은 설명용이다. ECHO를 측정한 평균 수락 길이나 회사의 처리량을 업무 실측치로 넣지 않았다. |
| ARTEX | [Microsoft Threat Intelligence의 11월 25일 분석](https://www.microsoft.com/en-us/security/blog/2026/11/25/what-defenders-need-to-know-artex-agentic-ai-framework-threat-actors-abuse/)은 국가 지원·금전 목적 조직의 기존 공격 과정 자동화를 보고했다. 짧은 시간에 이어지는 다양한 요청의 행동 패턴, 인터넷 노출 축소, 인증정보 보호, 접근 제한을 방어 측면에서 설명했다. | 공개일과 관찰 기간을 구분했다. 가상의 로그인 사례와 방어 흐름은 모임의 설계 예시이며 Microsoft가 특정 쇼핑몰에서 관찰한 사건으로 소개하지 않았다. |
| 11월 랜섬웨어 빈도 | [로이터 11월 25일 기사 전문(제휴 재게재)](https://www.investing.com/news/stock-market-news/retailers-face-rising-ai-cyberattack-threat-ahead-of-black-friday-many-uninsured-5050150)에서 CFC 청구 기록 기준 유통·레저·숙박업 관련 11월 발생 빈도가 월평균보다 50% 높다는 대목을 확인했다. | 월평균 100, 11월 150은 기사에서 환산한 상대지수. 건수, 전년 대비, AI 공격 비율, 올해 블랙프라이데이 당일 사고로 표현하지 않았다. 원 청구 건수와 전체 노출 사업체 분모는 확인하지 못했다. |
| 보험 가입률 | 같은 [로이터 기사](https://www.investing.com/news/stock-market-news/retailers-face-rising-ai-cyberattack-threat-ahead-of-black-friday-many-uninsured-5050150)에 중소 유통기업 43%, 금융 81%, 기술 71%. [CFC의 10월 21일 설문 개요](https://www.cfc.com/en-us/knowledge/resources/guides/the-cyber-insurance-disconnect/)는 영국·미국·캐나다·호주 중소기업 의사결정자 2,000명 이상을 대상으로 한다. [설문 배경과 청구 기록의 구분](https://www.cfc.com/en-au/the-cyber-insurance-disconnect/). | 업종별 수치는 로이터 보도에 귀속했다. CFC 공개 소개문에서 업종별 원표, 개별 표본 수·가중치는 확인하지 못했다. 국내 가입률이나 청구 건수에서 계산한 값으로 다루지 않았다. |
| AX 실험 | 원고가 제안한 가상 상품 30개·쿠폰 10개·주문 20건과 읽기 전용 업무 5종. 업무마다 입력 4개를 두는 예시로 20사례를 구성했다. 조건 A~D는 누적된다. | 기본 20 × 9 × 4 × 1 = 720회. 범위 조작은 브라우저의 산술 계산뿐이다. 완료율 +15%포인트, 호출·조사 시간 각각 30% 감소, 금지 거래 0건은 제안한 목표다. 모델 호출, Hurdle 설치·실행, 업무 성능·비용 측정은 하지 않았다. |

## 시각 자료와 편집 범위

| 위치 | 제공자·근거 | 사용 방식 |
| --- | --- | --- |
| Hurdle 결과 뷰어 | Together AI, 2026-11-25 [발표](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs) · [결과 화면 2000 × 1250](https://cdn.prod.website-files.com/69654e88dce9154b5f12070c/6b06972f6dd7b08407d42148_01-hurdle-viewer-leaderboard.webp) · [개별 실행 화면 2000 × 1778](https://cdn.prod.website-files.com/69654e88dce9154b5f12070c/6b0697559d5717af57105e35_02-hurdle-viewer-run-detail.webp) | 발행사 CDN의 원본을 가공 없이 참조한다. 전체 결과 화면은 본문에, 개별 실행 화면은 펼치기 안에 배치했다. 실제 화면에서 15회 중 판정 제외 2회, 10/13 통과(77%), 버그 수정 과제의 검사 7개 통과를 대조했다. 별도 재배포 조건은 확인되지 않아 로컬에 복제하지 않았다. |
| Hurdle 검사·평가 행렬·환경 비교 | 제공 원고와 Together AI 예제 | 행위, 결과, 과정 평가를 세 칸에 배치했다. 60회 설정과 회사의 별도 뷰어 예시는 캡션으로 구분했다. |
| ERNIE 활성 비중·추측 디코딩 | 제공 원고와 Baidu 모델 카드. [공식 제품 시연](https://ernie.baidu.com/release/ernie-5-5-flash-preview/)도 확인했다. | 5% 채움 막대와 두 줄 흐름을 HTML/CSS로 구성했다. 제품 사이트의 게임·3D 제작 시연은 토큰 생성 방식을 보여 주지 않아 모델 카드에 근거한 설명도를 사용했다. |
| 보안 대응 흐름 | 제공 원고와 Microsoft 보고서, 2026-11-25 | 원문 보고서는 프레임워크 구조와 방어 지침을 다룬다. 기사에서는 서비스 관측 → 탐지 → 근거 정리 → 대응이라는 방어 설계 제안을 그렸다. |
| 블랙프라이데이 비교 그래프 | 제공 원고, 로이터 보도와 CFC 설문 개요 | 보험 청구 상대지수와 보험 가입률을 각각 독립된 영점 기준의 막대로 그렸다. CFC의 일반 설문 홍보 사진 대신 두 지표의 단위와 분모를 차트에 표시했다. |
| 품질 질문·서비스 구조·실험 계산기 | 제공 원고의 UX·DX·AX·OX, 사람과 에이전트의 공통 서비스, A~D, 기본값 20·9·1 | 편집부 제안. 원래 텍스트만으로 도식의 픽셀 배치와 슬라이더 범위는 알 수 없어 새로 구성했다. 모델 수 1~3은 제공본에 있으며 사례 수 1~40, 반복 1~15는 로컬 계산기 조작 범위로 정했다. JS 없이도 기본 식·결과·업무 조건이 보인다. |

## 로컬 확인

### 제공 원고와 본문 재대조

- 원문의 도입부터 맺음말까지 다시 읽고 네 소식, 모임의 관점, 실험을 기사와 대조했다. Hurdle에는 모델을 고정한 채 소프트웨어를 평가하는 이유를 되살렸다. 로컬·샌드박스 표에서는 원고에 따로 있던 ‘호출 기록 검사’와 ‘금지된 요청 차단’을 다시 나누고, 두 항목 모두 로컬 미지원이라는 공식 설명을 유지했다.
- ERNIE에는 기업이 실행 환경과 데이터 처리 방식을 선택할 수 있다는 문장, 그에 따르는 운영 비용을 함께 살렸다. DSpark의 두 가지 생성 순서는 원고의 개념도에서 가져왔다. 마지막 후보가 어긋나는 경우를 펼치는 부분은 독자의 이해를 위해 덧붙인 가상 예시다.
- 보안 흐름도의 ‘AI 보안 분석’ 역할과 행위 기반 탐지 설명, 유통업계의 사이버 복원력과 결제 복구 예시를 연결했다. 네 가지 품질 관점에는 원고의 UX·DX·AX·OX 영문 명칭을 복구했고, 모임이 제안한 분류임을 표 제목에 표시했다.
- 계산기에는 원문에 따로 표시된 ‘실행 조건 4종’과 ‘예상 실행 횟수’를 함께 배치했다. 네 가지 목표와 실험 뒤에 남길 자산을 나누고 ‘AI가 일하기 좋은 환경을 만드는 엔지니어링’을 독립된 맺음말로 옮겼다. 60회 설정·별도 뷰어의 10/13 통과·설계 예시 720회의 구분과 각 그래프의 분모를 유지했다.

### 브라우저와 링크

- 재편집한 DSpark 개념도는 키보드·터치로 펼치고 접어 확인했다. JS를 끈 화면에서도 기본 계산식과 고정 조건 4종이 보이고, 키보드로 후보가 어긋나는 예시를 열 수 있었다. 계산기의 입력을 바꿔도 조건 4종은 유지되고 전체 횟수가 바뀌는지, 새 맺음말 목차가 해당 절로 이동하는지도 확인했다.

- Chrome에서 320·390·768·1366px 너비로 열었다. 수정한 제목은 네 너비 모두 ‘AI 에이전트가 쓰기 좋은’과 ‘API는 무엇이 다를까?’ 두 줄로 표시됐고 페이지 가로 넘침이 없었다. 밝은 화면과 어두운 화면에서 제목·통계 그래프·계산기를 캡처해 읽어 봤다.
- 공식 뷰어 이미지 두 장의 원본 크기와 로딩, 개별 실행 화면 펼치기, 목차 이동을 확인했다. 이미지는 발행사 CDN에 연결해야 보인다.
- 계산기 기본 720회, 키보드 중간값 1,440회와 1,512회, 최소 4회와 최대 7,200회, 터치 모델 선택을 확인했다. 인쇄 모드에서는 조작부가 숨겨지고 JS를 끄면 기본 계산식이 보인다.
- 홈과 목록의 제목·소개·호수·날짜·링크, 본문 목차·상대 경로를 대조했다. 일반뉴스 59편과 속보 16편을 필터로 확인하고 계산기 조작 후 목록 복귀·새로고침에서 읽은 글에 갱신 표시가 다시 붙지 않는지 점검했다.
