# 일반뉴스 22호 근거 확인

- 발행일·확인일: 2026-10-20, 한국시간 기준. 발표일은 각 원문의 현지 표기를 유지했다.
- 결과물: `news/2026-10-20-legacy-code-runtime.html`
- 입력: 사용자가 제공한 코드 전환·TorchNeuron·Vera·DeepSeek 초안.
- 성능 재측정, 패키지 설치, 모델 실행은 하지 않았다. 조사와 로컬 편집만 수행한다.

## 주장별 기록

| 주장 | 주체·대상·기준 | 근거 | 확인 상태·기사 표현 |
| --- | --- | --- | --- |
| 학습 자료가 적은 언어의 평가 개선 | OpenAI, 10/19 연구 발표. 학습용 공개 코드·문서의 상대적 부족 | [연구 발표](https://openai.com/index/low-resource-programming-languages/) | 공식 발표 확인. 새 모델 출시 소식으로 쓰지 않음 |
| MultiLangBench 26.8% → 87.4% | GPT-5.6 Sol → GPT-6 Astra, 20개 언어 평균 테스트 통과율, 최대 추론 노력 | [연구 발표](https://openai.com/index/low-resource-programming-languages/) | 공급사 자체 평가. COBOL 전환 성공률과 분리한 그래프 |
| SQLite 호환 구현의 검사 방식 | 데이터베이스 생성·질의·변경 결과를 참조 SQLite로 검사 | [공식 저장소](https://github.com/openai/MultiLangBench) | README 열람. 실제 평가 실행은 하지 않음 |
| COBOL 전환 5.4% → 86.6% | GPT-5.6 Sol → GPT-6.1 Sol, 모두 낮은 추론 노력. 출력의 바이트 일치와 모든 숨김 테스트 통과가 기준 | [연구 발표](https://openai.com/index/low-resource-programming-languages/) | 공급사 평가. 대상 언어 C++·Java·Kotlin·Python·Rust. 실제 기업 성공률 아님 |
| 높은 추론 노력 97.9% | GPT-6.1 Sol, 위 낮은 추론 노력과 조건이 다름 | [연구 발표](https://openai.com/index/low-resource-programming-languages/) | 별도 주석으로 표시. 같은 조건 막대 비교에 합치지 않음 |
| 평가 API 비용 39% 감소 | 동일한 낮은 추론 노력에서 GPT-5.6 Sol 대비 GPT-6.1 Sol의 평가 API 사용 비용 | [연구 발표](https://openai.com/index/low-resource-programming-languages/) | API 단가·전체 전환 비용의 인하율로 표현하지 않음 |
| TorchNeuron 소개·공개 계획 | 10/19 PyTorch 블로그의 AWS 작성 발표, 10/20 오픈소스·공개 베타 예고 | [기술 발표](https://pytorch.org/blog/introducing-torchneuron-native-pytorch-backend-for-aws-trainium/) | 발표일과 예정일을 구분 |
| 공개 저장소와 라이선스 | AWS Neuron 공식 저장소의 Beta·Apache-2.0 표시 및 설치 문서 | [저장소](https://github.com/aws-neuron/torch-neuronx) | 열람 시 공개 상태 확인. 초안의 ‘공개할 계획’만 유지하지 않고 현재 상태 보완. 설치 성공을 의미하지 않음 |
| PyTorch 호환성과 제약 | Trainium2·3 지원. 일부 미지원 연산의 CPU 대체 실행, 정적 입력 크기·재컴파일 제약 | [릴리스 노트](https://github.com/aws-neuron/torch-neuronx/blob/main/release-notes/2.33.0.md) | 기능·제약 확인. CUDA 코드 전체의 자동 호환으로 일반화하지 않음 |
| Nova-3 최적화 과정 | AWS·Deepgram 공동 작성 10/19 사례. 수개월의 포팅·정확도 검사·커널 최적화·Rust 연결 | [AWS 사례](https://aws.amazon.com/blogs/machine-learning/how-deepgram-optimized-voice-ai-at-scale-with-aws-trainium/) | 발표사의 적용 사례. 작업 과정을 설명용 흐름도로 재구성 |
| 1달러당 오디오 처리량 11~70% 증가 | Trainium2 trn2.3xlarge, Deepgram의 기존 사용 구성 대비. 오프라인 배치, 평가 당시 인스턴스 가격 | [AWS 사례](https://aws.amazon.com/blogs/machine-learning/how-deepgram-optimized-voice-ai-at-scale-with-aws-trainium/) | 공동 측정 주장. 고객 API 가격·실시간 지연·모든 모델의 개선으로 확대하지 않음 |
| Modal의 Vera 시험·지원 방향 | Modal 10/19 기술 발표, 기존 x86 기반에서 Arm 지원을 위한 시스템 변경 필요 | [Modal 발표](https://modal.com/blog/nvidia-vera-sandboxes) | 초기 시험·지원 추진. 전면 배포 완료로 쓰지 않음 |
| Vera 처리량 최대 2배 | 동급 x86 GNR 장비 대비, 높은 동시 부하. 개별 지연은 비슷하거나 더 낮음 | [Modal 발표](https://modal.com/blog/nvidia-vera-sandboxes) | 초안의 Intel·AMD 전체 대비 표현을 비교 대상에 맞춰 축소 |
| Modal 평가의 범위 | 50개 Terminal-Bench 작업, 네트워크 호출 제거, 사전 준비된 컨테이너 | [발표](https://modal.com/blog/nvidia-vera-sandboxes), [벤치마크 코드](https://github.com/modal-projects/agentless-agent-bench) | CPU 작업 중심. 모델 응답·외부 API 대기까지 포함한 업무 시간 비교가 아님 |
| 원 명령의 발행일·번호 | DHS 장관 서명이 있는 Exclusion and Removal Order #2026-01, Original Release Date: July 24, 2026 | [PDF 3쪽·부록 1쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=3) | 부록 이미지를 직접 확인. 7/24 명령 발행과 10/19 공고 사전 공개를 분리 |
| DeepSeek 제한 공고의 대상 | 연방 민간 행정부 기관의 조달 제외·IT 제거. DeepSeek·관계사 제품과 DeepSeek 구현을 이용한 제3자 제품·서비스 포함 | [PDF 3~5쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=3) | 공고 본문과 부록 본문·각주 10·13 확인. 제3자 구현은 조달과 제거 양쪽에 포함. 미국 개인·민간기업 전면 금지로 쓰지 않음 |
| 시스템 적용 범위 | national security systems 및 secure compartmented information systems는 이 DHS 명령에서 제외. 국방·정보당국의 별도 권한 명시 | [PDF 3~4쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=3) | 기관·시스템 범위를 구분. 제외를 모든 연방기관의 사용 허용으로 확대하지 않음 |
| 이행 시점 | 명령 발행 직후 조달 제외·시스템 제거 또는 예외 신청. 승인 제품·장비 목록·전자상거래 장터 등 포함 | [PDF 5쪽·부록 3쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=5) | Required Actions 직접 확인. 10월 공고일부터 새 의무가 시작된 것으로 쓰지 않음 |
| 60일 예외 신청 | 명령 발행일부터 60일 이내 서면 요청. 적용 제외·일부 조치 제외·이행 연기 요청 가능. 대상·범위·정당한 사유·대체 완화 조치 제출 | [PDF 5쪽·부록 3쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=5) | Exceptions 직접 확인. 일반적 제거 유예기간 또는 자동 예외로 쓰지 않음. CISA의 심사·서면 승인/불승인 명시, PDF 6쪽은 DHS의 서면 결정 설명 |
| 제거 전 임시 보안 조치 | 트래픽 감시·로그 강화·데이터 유출 통제·이상 탐지 권고 | [PDF 5~6쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=5) | Interim Cybersecurity Measures 확인. 권고(encouraged)를 별도 의무로 강화하지 않음 |
| DHS의 위험 판단 | 중국 내 서버·정부 접근 가능성, 입력 정보 전송, 취약점 및 악성코드 가능성 등 | [PDF 3~4쪽](https://public-inspection.federalregister.gov/2026-21447.pdf#page=3) | DHS의 근거 제시로 귀속. 모든 모델의 악성코드가 입증됐다고 표현하지 않음. 인용된 외부 위험 연구를 이번에 독립 재검증하지 않음 |
| 사전 공개와 정식 게재 | 문서 2026-21447, Filed 10/19 8:45 am. 10/20 정식 게재, 91 FR 66346, 66346~66350쪽 | [정식 공고 PDF](https://www.govinfo.gov/content/pkg/FR-2026-10-20/pdf/2026-21447.pdf), [연방관보 게재본](https://www.federalregister.gov/d/2026-21447) | 한국시간 10/20 후속 확인에서 정식 게재 페이지·API·GovInfo PDF 확보. 공고 본문과 서명 부록 전체를 보존한 사전 공개본과 대조했으며 실질적 내용 변경 없음. 상세 대조는 아래 기록 |

## 추가 확인과 편집 판단

- 사용자의 전체 문장 다듬기 요청에 따라 제목·요약·본문·도식 설명·목록·홈 소개를 함께 고쳤다. ‘기존 동작 보존’을 ‘같은 결과를 내는 능력’으로 풀고, 추론 노력·재컴파일·샌드박스 등은 등장하는 자리에서 설명했다. AWS의 칩과 PyTorch의 관계를 명확히 하고, Modal의 절은 모델 답변 대기보다 실제 도구 실행에 초점을 맞췄다. DHS의 적용 범위와 예외 신청 절차는 문단을 나눴다. 기존 평가 수치·조건·출처·이미지·기사 날짜는 유지했으며, 이번 편집에서 새로운 사실 조사나 성능 재측정을 한 것은 아니다.
- OpenAI 한국어 경로 `https://openai.com/ko-KR/index/low-resource-programming-languages/`를 직접 열었지만 영문 원문으로 이동했다. 확인하지 않은 번역 링크를 사용하지 않았다.
- OpenAI 연구 발표와 Modal 발표의 정정·갱신을 추가 검색하고 공식 본문을 대조했다. 이번 조사 범위에서는 별도 정정 공지를 찾지 못했다. 정정이 없음을 보장하는 표현은 쓰지 않았다.
- TorchNeuron 릴리스 기록은 `Date of release: 10/15/2026`을 표시하지만, PyTorch 발표는 10/20 공개를 예고한다. 패키지 릴리스 날짜와 대외 공개 행사를 같은 사건으로 단정하지 않았다. 기사에는 발표의 예정일과 확인 시점의 공개 저장소 상태를 함께 썼다.
- Reuters 원문은 도구에서 열리지 않았다. Modal은 공식 기술 글을 주 근거로 삼고, AWS도 PyTorch·AWS·공개 저장소를 사용했다. Reuters의 Modal 보도는 [Euronext 게재본](https://live.euronext.com/en/financial-news/nvidia-wins-fast-growing-ai-startup-modal-new-central-processors)을 열었으나 기사 핵심 수치는 Modal 원문으로 대체했다.
- DHS 부록은 이미지로 수록돼 초기 웹 텍스트 추출에서 확인되지 않았다. 사용자의 추가 확인 요청에 따라 읽기 전용 다운로드 권한으로 공식 PDF를 확보했다. 전체 6쪽을 렌더링하고 PDF 3~6쪽에 있는 서명된 부록 4쪽을 직접 읽었다. 이에 따라 초기에 보류했던 원 발행일·적용 범위·요구 조치·예외 절차를 기사에 보완했다.
- 부록 1쪽에는 DHS 장관 Markwayne Mullin의 서명과 원 발행일 7/24가 있다. 부록 3쪽의 60일은 명령 발행일부터의 서면 예외 신청 기한이다. 10/19 사전 공개나 10/20 예정 게재일을 기준으로 60일의 제거 유예가 새로 생긴다고 계산하지 않았다. 자체 호스팅·연구 목적이라는 이유의 자동 예외도 확인되지 않았다.
- 부록 4쪽은 제거 전 임시 보안 조치를 권고하고, 기술 역량이 부족한 기관에 대한 CISA의 지원 가능성을 설명한다. 장관은 명령을 1년 이내 검토한 뒤 매년 재검토하도록 되어 있다. 재검토 주기는 기사 본문 핵심에서 제외했다.
- 정식 게재 전 확인에서는 연방관보 링크 `https://www.federalregister.gov/d/2026-21447`가 HTTP 200 응답과 함께 `https://www.federalregister.gov/public-inspection/2026-21447/order-exclusion-and-removal-of-deepseek-products-from-federal-civilian-executive-branch-information`으로 이동했다. 페이지는 `This document is unpublished.`와 예정 게재일 10/20을 표시했다. 당시 기사에는 이 사전 공개 상태를 명시했다.
- 같은 시점에 정식 문서 API `https://www.federalregister.gov/api/v1/documents/2026-21447.json`는 HTTP 404를 반환했다. GovInfo의 해당 날짜·문서 번호 PDF 경로 `https://www.govinfo.gov/content/pkg/FR-2026-10-20/pdf/2026-21447.pdf`는 HTTP 200이지만 `https://www.govinfo.gov/error`의 HTML로 이동했으므로 PDF 확보 성공으로 보지 않았다. 이후 정식 게재본을 확보한 후속 대조 결과와 현재 상태는 아래에 별도로 기록했다.
- OpenAI 세부 언어별 수치와 장문의 설치·Java 17/Spring Boot 지시는 일반 독자의 흐름을 위해 줄였다. 수치의 의미, 가상 금액 계산 예시와 가상 코드 검증 실험은 살렸다.
- 공급사 수치는 독립 검증으로 표기하지 않았다. 우리 관점과 실험 제안은 별도 절로 구분했다.

## 시각화·미디어

- 사용자의 썸네일 추가 요청으로 레거시 시스템과 새 실행 환경을 연결한 AI 생성 일러스트를 제작했다. 기사 상단·목록·홈 카드·공유 메타데이터에 같은 이미지를 사용한다. [미디어 제작 기록](../assets/news/legacy-code-runtime-media.md)에 생성 도구·최종 프롬프트·크기를 남겼으며, 실제 제품 화면이나 평가 근거로 쓰지 않는다.
- 원본 제품 화면·영상이 핵심인 소재가 아니므로 외부 미디어를 복제하지 않았다.
- OpenAI 두 평가를 서로 다른 묶음으로 나눴다. 단위·모델·추론 설정·자체 평가 표시와 0~100% 축을 포함했다. 높은 추론 노력 97.9%는 별도 조건으로 표시했다.
- Deepgram은 작업 순서와 수치 설명, Modal은 측정 조건 비교, DHS는 공고 일정으로 표현했다. 모든 도식은 HTML 텍스트로 읽히며 JS 없이도 핵심 정보가 남는다.
- 기존 공통 CSS·JS는 변경하지 않았다. 기사 전용 CSS와 목록·홈의 이미지가 있는 카드에만 적용하는 썸네일 CSS를 추가했다.
- 현재 README·발행 지침은 개별 글을 README에 추가하지 않도록 명시한다. 이에 따라 목록과 홈만 갱신했다. 전체 31편, 일반뉴스 22편, 속보·단신 9편이다.

## 로컬 검증

- `node --test`: 기존 테스트 7개 통과, 실패 없음. 기사·CSS만 추가해 새 JS 테스트는 만들지 않았다.
- `git diff --check`: 통과. 새 파일도 별도로 공백·충돌 표식을 검사했다.
- HTML 파서로 기사·목록·홈의 중복 ID, 목차·내부 앵커, 상대 링크의 파일 존재, 외부 링크의 새 탭·보안 속성, noindex를 확인했다.
- 제목·22호·2026-10-20 날짜·목록의 단일 등록과 31/22/9 편수를 대조했다. 홈의 속보·단신 링크는 그대로 유지됐다.
- loopback 로컬 서버에서 실제 브라우저로 확인했다. 비공개 폴더·Markdown 파일·디렉터리 목록은 제공하지 않도록 서버를 제한했다. 모듈과 목록 fetch 확인을 위해 HTTP를 사용했다.
- 1280px 데스크톱과 390px 모바일의 밝은/어두운 화면에서 제목·평가 그래프·도식 배치를 확인했다. 320px에서도 본문·표·도식이 화면을 벗어나지 않는지 DOM 경계를 확인했다.
- 일반뉴스 클릭, 화살표 키로 속보·단신 이동, Home 키로 전체 목록 이동에서 22/9/31편을 확인했다. 고유 기사 링크는 31개였다.
- 기사 열기 → 목록 복귀 → 새로고침 후 최신 기사에 잘못된 Updated 표시가 없었다. 목차 이동과 홈 최신 카드도 확인했다.
- 브라우저 경고·오류 기록은 비어 있었다. 기사 전용 JS·동영상·외부 원본 이미지는 추가하지 않았다.
- 인쇄 렌더링과 JavaScript를 실제로 끈 브라우저 검증은 수행하지 않았다. 핵심 본문·수치·도식은 정적 HTML로 제공한다.
- DHS 보완 후 기존 테스트 7개를 다시 통과했고, HTML의 ID·앵커·출처 링크 속성·상대 파일 경로·공백을 재검사했다. 실제 브라우저의 1359px 데스크톱과 355px 모바일 너비에서 수정된 일정·예외 절차를 확인했으며 가로 넘침은 없었다. 모바일 밝은/어두운 화면을 확인하고 밝은 화면으로 복원했다. 브라우저 경고·오류는 없었다.
- 썸네일 추가 후 테스트 7개가 통과했다. 기사·목록·홈의 이미지 경로·크기·대체 텍스트와 공유 메타데이터를 검사했다. 브라우저의 1280~1359px 데스크톱 및 390px 모바일에서 이미지 로딩·비율·가로 넘침을 확인했고, 어두운 화면을 확인한 뒤 밝은 화면으로 복원했다. 목록의 일반뉴스 필터는 22편을 표시했고 홈 카드에서 기사로 정상 이동했다. 관련 브라우저 경고·오류는 없었다. 원격 공유 서비스의 실제 미리보기는 배포하지 않았으므로 확인하지 않았다.
- 전체 문장 편집 후 기존 테스트 7개가 통과했다. 편집 전 사본과 비교해 비율 수치·그래프 값·모델명·날짜·모든 링크·이미지 속성·목차 ID가 유지됐는지 확인했다. 제목은 기사·공유 메타데이터·목록·홈에서 일치한다. 1359px 데스크톱과 355px 모바일에서 제목·요약·DHS 문단을 확인했고, 긴 소제목을 줄여 어색한 줄바꿈을 정리했다. 화면 밖으로 넘치는 내용은 없었다.
- 사용자가 최종 점검과 로컬 커밋을 요청했다. 푸시·원격 배포는 요청 범위에 포함되지 않는다.

## 커밋 전 최종 점검

- 검토 기준: 로컬 변경을 대상으로 한 Development Review. hello-human 전용 코드 리뷰 정책은 없어 공통 리뷰 정책과 일반뉴스 편집·발행 지침을 적용했다. 커밋을 막을 문제는 발견하지 못했다.
- `node --test`의 테스트 7개가 통과했고 `git diff --check`도 통과했다. 새 HTML·CSS·조사 기록의 공백·충돌 표식, 로컬 PC 경로와 인증 정보로 보이는 문자열도 검사했다.
- 기사·목록·홈의 제목과 링크, 22호·발행일, 전체 31편·일반뉴스 22편·속보 9편을 대조했다. 중복 ID·누락된 목차 대상·끊어진 로컬 이미지 경로는 없었으며, PNG의 실제 크기와 메타데이터도 일치했다.
- 브라우저에서 데스크톱 기사와 320px 모바일의 홈·목록·기사 화면을 확인했다. 이미지가 정상 로딩됐고 본문·도식의 가로 넘침은 없었다. 다크 모드를 확인한 뒤 밝은 화면으로 복원했다.
- 일반뉴스 선택, 화살표 키로 속보 이동, Home 키로 전체 이동에서 22/9/31편을 확인했다. 기사를 읽고 목록으로 돌아와 새로고침해도 해당 기사에 잘못된 Updated 표시가 생기지 않았다. 브라우저 경고·오류도 없었다.
- 커밋 전에는 DHS 공식 문서 링크가 사전 공개 페이지로 연결됐고 `unpublished` 표시가 남아 있었다. 당시 후속 작업으로 남겨 둔 정식 게재본 대조는 아래의 후속 확인에서 완료했다. 원격 공유 미리보기와 배포 환경은 검증하지 않았다.

## DHS 정식 게재본 대조 (2026-10-20 후속 확인)

- 공식 단축 링크가 `/public-inspection/` 대신 [정식 문서 페이지](https://www.federalregister.gov/documents/2026/10/20/2026-21447/notice-of-order-regarding-exclusion-and-removal-of-deepseek-products-from-federal-civilian-executive)로 연결됐고, `unpublished`와 게재 예정 표시가 사라졌다. [공식 API](https://www.federalregister.gov/api/v1/documents/2026-21447.json)는 게재일 `2026-10-20`, 인용 표기 `91 FR 66346`, 시작·끝 쪽 `66346`·`66350`을 반환했다.
- Federal Register의 게재 페이지·메타데이터·[공고 텍스트](https://www.federalregister.gov/documents/full_text/text/2026/10/20/2026-21447.txt)와 [GovInfo 정식 PDF](https://www.govinfo.gov/content/pkg/FR-2026-10-20/pdf/2026-21447.pdf)를 확보했다. PDF는 오류 페이지로 이동하지 않았고, `application/pdf`, `%PDF-` 파일 헤더, 실제 파싱 가능한 5쪽 문서임을 확인했다. 파일 크기는 1,167,913바이트이며 SHA256은 `A33E0D1054EF76C0D17B9999B32FD4E46728A340A96A77DFDFD1418697A957E4`이다.
- 대조 기준은 최초 보존한 `2026-21447-public-inspection-baseline.pdf`이다. SHA256을 다시 계산해 지정된 `E6E9A7896C43142885067AA011C94DDFA089C08DD5ED54F2D0C051A363ED260B`와 일치함을 확인했다. 위 주장별 표에 남긴 사전 공개 PDF 인용은 당시 조사 근거이며, 이번 대조의 정식 근거는 GovInfo PDF와 Federal Register 게재본이다.
- 사전 공개본은 공고 2쪽과 부록 4쪽, 정식 PDF는 공고 1쪽과 부록 4쪽이다. 정식 PDF의 첫쪽과 마지막쪽에는 인접한 다른 문서의 일부도 실려 있어, 문서 번호·도켓·구분선을 기준으로 대조 대상을 분리했다. 공고 본문은 예정 안내와 인쇄용 머리말·꼬리말을 제외하고 공백·줄바꿈·대시·대소문자 등 편집 형식을 정규화했을 때 일치했다.
- 정식 PDF 5쪽을 모두 렌더링했다. 텍스트 추출만으로 읽을 수 없는 서명 부록은 정식 PDF 2~5쪽과 사전 공개 PDF 3~6쪽을 각각 직접 열어 본문·각주·서명을 대조했다. 부록의 해상도와 흑백 처리, 배치가 달라 파일이나 이미지 픽셀이 동일하다고 판단한 것은 아니다.

| 대조 항목 | 정식 게재본에서 확인한 내용 | 사전 공개본 대비 |
| --- | --- | --- |
| 원 발행일·명령 번호·서명 | 7월 24일, Exclusion and Removal Order #2026-01, Markwayne Mullin 서명. 정식 PDF 2쪽·연방관보 66347쪽 | 변경 없음. 10월 20일은 공고의 정식 게재일 |
| 대상 기관·시스템 | 연방 민간 행정부 기관. 국가안보 시스템과 보안 구획 정보시스템 제외, 국방·정보당국의 별도 권한 설명. PDF 2~3쪽 | 변경 없음 |
| 제3자 제품 범위 | DeepSeek·관계사와 그 제품, DeepSeek 구현을 이용한 제3자 제품·서비스. 부록 각주 10·13에서 제3자 구현을 조달 범위에도 포함. PDF 3~4쪽 | 변경 없음 |
| 즉시 제외·제거 | 명령 발행 직후 조달 제외, 시스템에서 제거하거나 예외 신청. 승인 제품·장비 목록과 전자상거래 장터 등 포함. PDF 4쪽 | 변경 없음 |
| 서면 예외 신청 | 명령 발행일부터 60일 이내. 요청 대상·범위·제품·정당한 사유·대체 완화 조치 제출, CISA 심사·서면 승인 또는 불승인. PDF 4쪽 | 변경 없음. 제거 유예기간이나 10월부터 새로 계산하는 기한으로 해석하지 않음 |
| 임시 보안 조치 | 완전 제거 전 트래픽 감시·로그 강화·데이터 유출 통제·이상 탐지 권고. PDF 5쪽 | 변경 없음. 권고를 의무로 강화하지 않음 |
| 위험 판단 | 중국 내 서버와 정부 접근 권한, 개인정보·민감한 입력 전송, 취약점·악성코드 가능성, iOS 앱 연구 인용. PDF 2~3쪽 | 변경 없음. DHS의 판단으로 귀속 |
| DHS·CISA 후속 조치 | CISA 기술 지원 가능, DHS의 서면 예외 결정, 장관의 1년 이내 및 이후 연례 재검토. PDF 5쪽 | 변경 없음 |

- **결론:** 공고 본문과 서명 부록 전체에서 실질적인 내용 변경을 확인하지 못했다. 확인한 차이는 게재 상태, 연방관보 인용·쪽수, 인쇄 머리말·꼬리말, 줄바꿈·단 구성, 부록 이미지의 흑백 처리와 배치 등 편집 형식이다.
- 기사에는 정식 게재일과 완료된 타임라인, GovInfo PDF의 실제 부록 쪽수, 공식 출처와 대조 결과를 반영했다. 원래 URL·22호·발행일과 성능 평가·썸네일은 유지했다. 제목·요약·목록·홈 소개에는 미게재 안내가 없어 추가 수정하지 않았다.
- 한계: 이번 작업은 두 공고의 문서 내용 대조다. DHS가 인용한 외부 보안 연구의 독립 재검증, 개별 기관의 이행·예외 승인 여부, 실제 서비스의 DeepSeek 포함 여부는 조사하지 않았다. 자동 확인 단계에서는 커밋·푸시·원격 배포를 수행하지 않았다.
- 검증: `node --test` 7개와 `git diff --check`를 통과했다. 기사·목록·홈의 ID·앵커·접근성 참조·로컬 파일 경로·외부 링크 속성·noindex를 검사했고, DHS 절·출처 외의 기사 본문과 제목·호수·날짜·썸네일이 그대로인지 이전 버전과 대조했다.
- 실제 브라우저의 1280px 데스크톱과 390px 모바일에서 게재 일정·본문·출처를 확인했다. 모바일 밝은/어두운 화면에서 가로 넘침이 없었고 썸네일이 정상 로딩됐다. 목차의 출처 이동도 확인했으며 브라우저 경고·오류는 없었다. 확인 후 밝은 화면과 기본 화면 크기로 복원했다.
