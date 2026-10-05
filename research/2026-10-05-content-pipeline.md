# 라이브 한 편을 여러 콘텐츠로, AI는 어디까지 맡을까?

- 본문: `insights/2026-10-05-content-pipeline.html`, COMMERCE INSIGHT 04.
- 발행일·자료 확인일: 2026-10-05 (한국시간). 기존 URL·호수·날짜 유지.
- 업무 질문: 콘텐츠 PD가 긴 판매방송을 상품·장면별로 연결해 숏폼과 다른 형식으로 재사용할 때, 어떤 작업을 AI에 맡기고 무엇을 검수할 것인가?
- 확장 범위: 국내 방송 재편집, 중국 라이브커머스, 영상 이해·편집 연구, 원본 영상에서 문서·질문 답변·글·다국어 영상 생성.
- 자료 성격을 도입 사례·고객 증언 / 공식 제공 기능 / 학회 논문 / 사전공개 연구 / 작성자의 적용 제안으로 구분.
- 개인 대화 URL·사내 자료·비공개 고객과 기업 정보는 포함하지 않음.

## 국내 방송 재편집

### 신세계라이브쇼핑

- https://www.shinsegaegroupnewsroom.com/new-era-live-shopping-ai/ (2024-07-09, 공식 본문 확인)
- 20~60분 방송 → 1분 숏츠. 도입 당시 하루 약 10편. 대표 화면·비율·배경·자막도 처리.
- 현재 처리량·무검수 비율·시간 절감·매출 효과로 일반화하지 않음.
- https://www.shinsegaegroupnewsroom.com/new-world-live-shopping-app/ (2024-08-06)
- 공식 삽입 영상: https://www.youtube.com/watch?v=3cUPp9cMlFI
- 서비스 이용 화면을 소개하는 홍보 영상. 내부 편집 엔진의 정확도 시연으로 설명하지 않음. 이전 수정에서 직접 재생 확인.
- 공식 플레이어만 삽입, 자동 재생 없음. 영상·섬네일 다운로드·재가공 없음. 정책 확인: https://www.shinsegaegroupnewsroom.com/policy/

### 현대홈쇼핑

- https://together.ehyundai.com/vol029/sub0103_w5.html?code=0103 (공식 그룹 웹진 직접 확인)
- 평균 60분 방송 → 1분 이내. 당시 주 최대 100개 소개 계획. 스타일링·조리 등 핵심 구간 활용.
- 본문 발행연도 미표시. 공통 상단 최신 호 날짜를 이 기사의 공개일로 사용하지 않음. 물량 계획을 평균 처리량·성과로 읽지 않음.

### GS SHOP·AWS

- https://aws.amazon.com/ko/blogs/tech/gs-shop-ai-powered-video-recommendation-platform/ (2026-05-15, 본문 확인)
- TwelveLabs 기반 시연·조건 구간 검색과 소구점 추출·추천. 당시 영상은 사람이 제작했고 재생성 자동화는 향후 계획.
- 주문고객수 +57.5%는 같은 기간·영역의 50:50 추천 실험. 자동 편집의 제작 효율·매출 효과로 인용하지 않음.

## 중국 라이브커머스

### 도우인 전자상거래·화산엔진

- 자료집: https://www.cdut.edu.cn/__local/1/81/9D/E05EDA063BF333A4F9829370B67_8346F923_99381A.pdf
- 《2025 火山引擎智能视频与边缘实践精选集》, 대학 사이트 공개본. 본문 추출로 확인.
- PDF 163쪽/인쇄 156쪽: 도우인 전자상거래 적용 서술. PDF 202쪽/인쇄 195쪽: 구간 탐지·이야기 편집 흐름.
- 자료집 수록 장은 甲子光年 기사. 공급사 자료집의 적용 설명으로 귀속. 특정 상점의 독립 검증이나 무인 운영 비율로 쓰지 않음. 성과 숫자 제외.
- 자료집 배포 정보: https://www.infoq.cn/minibook/2kQxCXUXOQ1eu4czPUNA (2026-01-27, 저자 火山引擎视频云, 연구 담당자가 확인)
- PDF 스크린샷 도구는 가져오기 실패. 원본 그림을 재사용하지 않고 설명용 HTML 흐름으로 재구성.
- 보조 조사만 하고 본문에서 제외: https://docs.volcengine.com/docs/Technicalanalysis/VolcanoEngineIntelligentCreativityAlgorithmEnablingMarketingforEveryone?lang=zh (2023-01-28). 검색 본문은 반환됐지만 직접 열기는 JavaScript 안내여서 직접 열람 완료로 기록하지 않음.

### 텐센트

- https://cloud.tencent.com/document/product/1186/42260 (2025-01-08 갱신, 직접 확인)
- 커머스 절: 긴 판매방송 → 상품별 영상·판매 포인트. 공식 활용 시나리오이며 실명 고객 성과가 아님.
- https://cloud.tencent.com/document/product/862/112098 (2026-05-19 갱신, 직접 확인)
- 파일·라이브 입력과 클립·표지·시간·제목·요약 출력 범위 확인. 라이브 작업은 API로 시작하며 특정 물체 지정 분할은 라이브 미지원. 상품 분할 정확도 미공개.
- 이전 Media AI 콘솔을 실행 경로로 안내하지 않음. 2025년 MPS 통합과 문서의 실제 범위를 구분.

## 영상 이해·편집·사용법 제작 연구

### TLive-Omni

- https://arxiv.org/abs/2608.20958 / https://arxiv.org/html/2608.20958v1
- https://github.com/TaoLiveAIGC/TLive-Omni
- 2026-08-21 사전공개. 타오바오·티몰 연구진. 시간 정렬된 영상·음성 이해. 텍스트 출력이며 영상 생성·편집 엔진이 아님.
- 긴·잡음 많은 방송, 모호한 지시 한계. 커머스 평가를 국내 제작 정확도로 일반화하지 않음.

### Grounded Product Understanding in Livestream Videos

- https://arxiv.org/abs/2609.20508 / https://arxiv.org/html/2609.20508v1
- 2026-09-17 사전공개, 09-28 v2. 상품 식별과 여러 등장 구간 연결을 함께 평가.
- v1/v2 수치 차이가 있어 지표 숫자는 본문에서 제외. 상용 도입 사례로 분류하지 않음. v2 초록과 v1 상세를 구분해 확인.

### LAVE

- https://arxiv.org/html/2402.10294v1 (2024-02-15 사전공개, IUI 2024 학회 논문)
- https://www.dgp.toronto.edu/~bryanw/lave/ (저자 프로젝트 직접 확인)
- 영상 설명을 통해 계획하고 승인된 편집 함수를 실행. 8명 사용자 연구. 대규모 생산성 실험과 구분.
- 저자 시연: https://www.youtube.com/watch?v=t3jAqp0D3FI
- 공식 프로젝트가 연결한 YouTube 플레이어 삽입. 다운로드·재가공·자동 재생 없음. 커머스 적용은 작성자 제안.

### EditDuet

- https://arxiv.org/html/2509.10761v1
- https://research.adobe.com/publication/editduet-a-multi-agent-system-for-video-non-linear-editing/
- https://mudtriangle.com/editduet/
- SIGGRAPH 2025. Adobe 출판일 2025-08-11, arXiv 등록 09-13. 다큐 5편의 보조 화면 편집 평가.
- Editor·Critic 반복에도 출력 실패 8.2%. 파일·함수·시간값 오류. 효과·픽셀·오디오 편집은 향후 과제. 커머스 검수 대체나 매출 효과로 확대하지 않음.

### TutoAI

- https://www.hdi.cs.umd.edu/papers/TutoAI_CHI24.pdf
- https://hdi.cs.umd.edu/papers/TutoAI_CHI24_Supp.pdf
- CHI 2024. 영상·시간 자막 → 단계·대표 프레임·물체·관계 → 멀티미디어 사용법.
- 사용자 24명·제작자 2명 평가. 모든 영상에서 통계적 우위는 아님. 단계 관계·사진 선택 한계와 사람 수정 설명.

## 숏폼 밖의 파생 콘텐츠

### Guidde: 영상 → 단계별 문서

- https://help.guidde.com/en/articles/11193962-upload-mp4-videos-to-guidde (2026-08-16)
- https://help.guidde.com/en/articles/9997243-the-document-editor (2026-06-03)
- MP4·WebM 업로드와 문서 출력, Business·Enterprise 조건 확인. 직접 문서 수정 시 영상 동기화 분리.
- 원본 단계 점프 링크는 Guidde 사이트 영상 단계에 한정, 외부 임베드에는 없음. 본문에서 범용 원본 링크 기능으로 확대하지 않음.

### Panopto: 영상 → 질문 답변

- https://www.panopto.com/kr/capabilities/ai-capabilities/ai-search/
- https://community.panopto.com/discussion/2984/september-2026-release-notes
- 권한 있는 영상의 답변·원본 시점 연결. Sumitomo Heavy Industries Material Solutions 장비 교육팀의 고객 증언. 정량 성과 미표시.
- 2026-09-30/10-01 지역별 배포, 관리자 활성화·AI Credits 필요. 공개 커머스 FAQ 도입 사례는 아님.

### Wistia: 웨비나 → 글·메일·뉴스레터

- https://wistia.com/blog/ai-webinar-transcript-content (2026-08-26, 직접 확인)
- Wistia·Superpath의 전사 기반 작업법. 타임스탬프와 원문 제한은 작성 지침이며 자동 사실 보장 기능이 아님.
- 시간 절감률·매출 성과 인용 없음. 구매 안내로의 확장은 작성자 제안.

### HeyGen·Happy Cats: 기존 영상 → 다른 언어

- https://www.heygen.com/customer-stories/happy-cats (발행일 미표시)
- https://help.heygen.com/en/articles/10029081-how-to-get-started-with-video-translation
- 기존 영어 영상의 프랑스어·독일어 변환 확인. 이후 아바타 제작과 분리. 전체 과정의 5배·56편·7개 언어 숫자를 번역만의 효과로 인용하지 않음.
- 화면에 박힌 글자는 미번역, 번역 후 영상 길이가 달라질 수 있음. 한국어 상품 영상 정확도 미시험.

## 보조 도구·운영 문서

- OpusClip: https://www.opus.pro/clipanything (자연어 구간 탐색·화면 비율 변환 기능 확인). 기존 출시 소개 영상은 연구진 편집 시연으로 교체. 한국어 방송 성능 미측정.
- 네이버: https://help.naver.com/service/21349/contents/23085?lang=ko&osType=COMMONOS (팝업 플레이어만 독립 제어할 수 없음). 실제 관리 화면·게시 API는 실행하지 않음.
- 이전 글의 TikTok 생성 기능 소개는 이번 확장 주제와의 중복을 줄이기 위해 제외.

## 편집·설계 판단

- 가상 밀폐용기 60분 방송과 원본 시각·조건은 설명용이며 실제 생성 결과가 아님.
- 기존 타임라인·30초 편집안·구도 도식 유지. 원본 → 상품·시간·발언·조건 → 숏폼·가이드·답변·번역본 도식 추가.
- 모든 커머스 적용 문장은 연구나 타 산업 사례에서 도출한 제안으로 구분.
- 원본 변경 시 파생물 영향 확인, 번역 시간 변동과 문서 동기화 분리까지 운영 범위 확장.
- 방송 10편은 업무 점검용 가정. 동일 원본·완성 기준, 편집자·순서 교차 배정. 숏폼과 사용 가이드의 품질·시간·비용을 따로 비교.
- 공통 분석 비용은 배분 규칙을 정하고 폐기·검수·재작업 포함. 통과 결과가 0이면 단위 비용 계산하지 않음.
- 새 AI 실행·게시 연동·외부 업로드 없음. 기존 URL·04호·날짜·총 4편 유지. 본문과 홈·목록 제목·요약 일치.
- 이번 추가 수정은 로컬 작업이며 이전 커밋 요청을 새 변경의 커밋·푸시 허가로 사용하지 않음.

## 이번 확장의 사이트 검증

- `node --test`: 기존 7개 테스트 통과. 새 JavaScript나 테스트는 추가하지 않음.
- HTML 3개 페이지에서 중복 id, 누락된 목차 대상·상대 경로, 태그 대응 검사 통과. 호수·날짜·목록 총 4편 유지.
- 1440px 데스크톱·390px 모바일의 라이트·다크 확인. 가로 넘침 없음. 파생 콘텐츠·사례 카드는 모바일에서 한 열, 짧은 처리 흐름은 두 열.
- LAVE 공식 삽입 영상을 직접 재생해 213초 길이와 31초 이상 시간 진행 확인 후 정지. 저자·영상 제목도 공식 프로젝트와 대조.
- 논문 한계의 native details를 클릭·키보드 Enter로 펼치고 닫기 확인.
- 본문 열기·펼침 조작·테마 전환 → 목록 복귀 → 새로고침에서 해당 글에 불필요한 Updated 표시 없음. 홈 최신 카드에서 본문 재진입 확인.
- 최종 `git diff --check` 통과. 검증한 본문 탭에서 브라우저 콘솔 오류 미검출.
- 실제 AI 도구로 방송을 처리하거나 편집 결과 정확도를 측정한 검증은 아님. 외부 영상·자료의 향후 가용성은 별도.
