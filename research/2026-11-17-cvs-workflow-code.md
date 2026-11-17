# 일반뉴스 50 · CVS Health, 익힌 업무를 코드로 반복한다

- 발행·확인 기준일: 2026-11-17, 한국시간.
- 사용자 제공 초안의 다섯 주제를 유지하고 정적 HTML·뉴스 목록·홈을 로컬에 반영한다. 커밋·푸시·배포는 요청 범위에 없다.
- 공식 발표일은 원문 표기의 2026-11-16이다. 시간대가 명시되지 않은 발표를 엄밀한 ‘최근 24시간’으로 묶지 않았다.

## 주장별 근거와 편집 판단

| 주장·대상·단위 | 직접 확인한 근거 | 상태와 기사 표현 |
| --- | --- | --- |
| CVS Health의 문서 발송 적체를 주말에 처리, 전문의 상담 하루 수만 건의 시스템 단계 지원 | [OpenAI 발표](https://openai.com/index/advancing-computer-use-for-healthcare-teams/) | 고객사·공급사 운영 사례 발표. 전체 진료를 에이전트가 완결했다는 의미로 쓰지 않음. 독립 인건비·총비용 측정으로 확대하지 않음. |
| CUA Agent Kit의 탐색→코드화→모델 없는 실행 | [고정 커밋 README](https://github.com/cvs-health/cua-agent-kit/blob/965ee258bfb778cad4e7077301974d4e83d97916/README.md) | GitHub 연결 도구로 README와 main 커밋 확인. 성공 기록을 Codex 스킬이 읽어 Playwright/pywinauto 코드로 변환. 엔지니어 검토·시험·검증 포함. 좌표 재생이 아니라 semantic locator 사용. 실제 제품 실행은 하지 않음. |
| Apache 2.0 공개 | [LICENSE](https://github.com/cvs-health/cua-agent-kit/blob/965ee258bfb778cad4e7077301974d4e83d97916/LICENSE) | 라이선스 본문 확인. README의 pytest·ruff·ty 명령은 존재 확인만 했으며 이 저장소의 시험 통과로 표현하지 않음. |
| 탐색 시 화면·자격정보 전달, 실행 증거 민감성 | 위 README의 Security and sensitive data | 선택 필드의 치환은 완전한 익명화가 아님. 기사에는 가상 계정·합성 자료 사용 이유만 짧게 반영. 공개 기록에 실제 자격정보·내부 경로를 남기지 않음. |
| HealthAdminBench 135개 과제 | [연구진 사이트](https://som-shahlab.github.io/health-admin-bench-website/) | 135 tasks, 1,698 subtasks, 4 GUI 환경. 사전승인·DME 주문·이의신청. 기사에는 135개 과제와 종류만 사용. |
| Astra 94.3%, Luna 91.8%, Luna $0.085/과제 및 98% 낮은 비용 | OpenAI 발표의 Administrative workflow performance and cost | OpenAI가 독립 연구진의 벤치마크에서 측정한 값. 두 모델 최대 추론 설정. rubric 점수 비율이며 완결률이 아님. 비용 비교를 CVS 운영비 절감률로 옮기지 않음. |
| Qwen4-Max 11/16 정식 모델, 11/11 preview | [모델 출시 기록](https://www.alibabacloud.com/help/en/model-studio/newly-released-models), [preview 문서](https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview) | preview는 Token Plan 전용, 정식 qwen4-max와 구분. 출시일 확인. |
| 1M 문맥, 텍스트·이미지·비디오 입력, 텍스트 출력, 병렬 도구 호출·JSON Schema, 3종 호환 인터페이스 | [정식 모델 문서](https://www.alibabacloud.com/help/en/model-studio/qwen4-max) | 공급사 사양. 1M은 전체 문맥 한도이며 thinking 최대 입력은 983,616. API 호환성을 동작 동일성으로 표현하지 않음. |
| 싱가포르 International 입력 $1.50·출력 $4.50/백만 토큰 | 위 모델 문서 Model pricing | non-thinking/thinking 공통. 출력에 추론+답변 포함. 일반 입력 단가이며 할인 입력과 혼합하지 않음. 단가 소개로 한정해 가상 업무 총비용·환율 계산을 추가하지 않음. |
| Work360 과제당 비용 약 60% 감소, 토큰 35% 감소 | [Alibaba 발표](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max?_p_lc=1) | 공급사 자체 평가, Qwen3.8-Max 대비 High effort. 공개 이미지의 종합 점수 52.69/47.74와 함께 공급사 자료임을 표시. |
| AA 지수 43, 과제당 $3.27 | [Artificial Analysis 모델 페이지](https://artificialanalysis.ai/models/qwen4-max) | 11/17 확인, v5.0.1. 입력·캐시·추론·답변 단가를 적용한 과제당 가중 평균. Alibaba Work360과 직접 비교 불가. 이전 모델 34점은 이번 확인 범위에서 독립 대조하지 않아 삭제. 변동하는 순위·속도도 생략. |
| 비공개 가중치, 작은 Qwen4 계열 공개 예정 | AA 모델 분류와 Alibaba 발표 | 현재 모델 제공과 향후 open-weight 계획 분리. |
| Gemini Notebook 자료→사이트, 새 탭·공유 | [Google 발표](https://blog.google/innovation-and-ai/products/gemini-notebook/interactive-sites/) | 11/16 웹 순차 제공, 전 세계 18+, Workspace 포함. 모바일 예정. 공식 자료 기반 소개이며 직접 생성·공유한 결과가 아님. |
| AdMob Skills 현재 사용 가능, Ask AdMob 수개월 내 시험, MCP 초기 시험 및 2027년 초 확대 | [Google 발표](https://blog.google/products/publisher-connections/new-google-admob-tools/) | 검색 본문만으로 확정하지 않고 실제 브라우저 본문·미디어 확인. 웹 추출 도구 open은 오류였으나 브라우저에서는 열림. Google Ads MCP와 AdMob MCP를 혼동하지 않음. |
| AdMob Skills 최초 공개 시점 보정 | [2026-06-24 개발자 발표](https://developers.google.com/ads/blog/posts/2026/06/more-autonomy-less-context-introducing), [현재 한국어 문서](https://developers.google.com/admob/ios/agent-skills?hl=ko) | 6월 이미 GMA Skills·migration 등 소개. 초안의 ‘이번에 공개’ 대신 현재 제공 범위로 기술. |
| Anthropic 90→30일(high/critical), 90→45일(기타), 미응답 조정 30→15일, 패치 후 상세 공개 45→30일 | [정책 변경 원문](https://www.anthropic.com/research/coordinated-vulnerability-disclosure-timelines) | 2027-01-01 이후 보고 건부터, 진행 중 보고 기존 기한 유지. 악용 중 7일 유지, 복잡한 수정 협의, 사람 검토 없는 자동 발견 제외. 이미 90일 넘긴 미공개 high/critical에는 별도 30일 유예 후 2027-01-01부터 공개 계획. |

## 언어와 편집

- OpenAI 한국어 URL은 영어 원문으로 이동해 영어를 근거로 썼다. Google Skills 한국어 문서는 실제 한국어 내용을 확인하고 채택했다.
- ‘AI가 업무를 익히고, 코드는 반복한다’는 포괄 제목을 주된 사건·기업이 드러나는 제목으로 바꿨다.
- 단어 사전식 정의, 반복된 부정형 설명, 자료 성격의 중복 설명을 줄였다. 다섯 소식을 하나의 구현으로 묶지 않았다.
- 일반 업무 자동화와 Codex 코드화 단계는 나눴다. 별도 코딩 가이드 링크는 주제 집중을 위해 추가하지 않았다.

## 실험 제안 설계

- 최근 11/13 문서 지시 경계, 11/14 결제 응답 유실, 11/15 실행·비용 기록 대조, 11/16 MCP 설치 환경 비교를 대조했다.
- 이번 질문: 탐색 기록을 코드화하면 반복 화면 업무의 정확성·비용·화면 변경 대응이 어떻게 달라지는가.
- 연습 6건과 평가 30건 분리. 평가 30건은 정상 15, 색상 누락 5, 소재 누락 5, 두 필드 누락 5. P-014는 소재 누락의 대표 예시다.
- 원래 화면/배치 변경/동일 ID 후보 중복의 세 조건, 두 실행 방식, 각 세 회차. 별도 저장 상태 검증기로 정답 대조. 수작업은 기준선.
- 기대 기준: 정상 두 조건 각각 30/30, 모호한 조건 29 완료+1 올바른 보류. 오수정·중복 저장 0. 보류는 완료 비용의 분모에서 제외.
- 모델·자동화 구현·API 호출·실측은 수행하지 않았다. 기사에는 절감 효과를 추정 수치로 만들어 넣지 않았다.

## 검증 기록

- `node --test`: 기존 71개 테스트 통과. 기사 사실 검증·제품 성능 시험과 별개다.
- `git diff --check`: 통과. 새 HTML·CSS·기록의 줄 끝 공백도 별도 검사.
- Python HTMLParser로 기사·홈·뉴스 목록의 내부 파일·앵커 존재, 중복 ID, 새 기사의 외부 링크 속성 확인: 오류 0건. 목록은 전체 66, 일반뉴스 50, 단신 16. 제목·50호·11/17 날짜·홈 링크 일치.
- 원본 다운로드와 로컬 Work360 JPEG의 SHA-256 일치 확인. 실제 표시 이미지 크기 1762×950 확인.
- 이미 실행 중이던 loopback 8765 미리보기에서 기사 확인. 새 서버 시작은 포트 사용 중으로 종료되어 기존 서버를 재사용했다.
- 브라우저 1280×720, 모바일 390×844·360×800 확인. 제목·표·세로 흐름도에 가로 넘침 없음. 라이트·다크 확인 후 기존 라이트 모드와 기본 viewport로 복원.
- 두 영상의 메타데이터·1920×1080 비율·자동/반복 재생 해제 확인. Space로 재생·일시정지, 실제 재생 시간 진행 확인. Gemini 약 25초, AdMob 약 8초 지점까지 진행을 확인했으며 영상 전체 내용·음성 검증은 아니다.
- 목차 이동, 접이식 설명 Enter로 열기·클릭으로 닫기, 홈→기사→목록 이동 확인. 일반뉴스/단신/전체 필터 표시 건수 각각 50/16/66. 기사 읽기·미디어 조작·설명 펼침 뒤 목록 복귀와 새로고침에서도 해당 글에 불필요한 Updated 표시 없음.
- 기사 페이지 콘솔 error 목록 0건. 날짜·분류 간격이 붙었던 클래스명을 공통 `news-article-meta`로 고치고 재확인했다.
- 핵심 글·도식·표는 정적 HTML이다. JS를 실제로 끈 브라우저와 인쇄 화면, 물리 터치 기기에서는 별도 확인하지 않았다.
- 실제 CUA Agent Kit 설치·실행, 모델 호출, 자동화 비교 실험, 게시·배포는 수행하지 않았다.

## 후속 편집 · 01절 공식 영상 추가

- 사용자가 CVS 소식의 공식 시각 자료 보강을 요청했다. CVS 저장소 전체 파일 트리와 `docs/choosing-an-approach.md`를 추가 확인했으며 공식 이미지·영상 파일은 없었다.
- OpenAI 발표의 MRI 시연 영역에서 재생 버튼을 누른 뒤 초기화된 Vimeo 주소 `1244445209?h=8ea96d2904`와 제목 `openai-healthcare-demo from OpenAI on Vimeo`를 확인했다. 앞선 확인에서 미확인으로 남긴 플레이어를 이번에 실제로 재생했다.
- 원문은 합성 환자 데이터로 진료 기록 검토·MRI 주문 초안·환자 답변·보험 사전승인 준비를 보여주는 OpenAI 데모라고 설명한다. CVS 운영 화면으로 소개하지 않고 01절의 공식 시연으로 분리했다. 기존 업무 코드화 설명도와 점수 그래프는 유지했다.
- 기사 전용 CSS의 iframe 반응형 규칙 추가와 `?v=2` 갱신만 수행했다. 호수·URL·날짜·홈·목록은 유지한다.
- 추가 후 `node --test --test-reporter=dot` 71개 통과, `git diff --check` 통과. 기사 안에서 영상 로드(1920×1080, 133.03초), Enter로 재생·일시정지, 104.89초에서 재개해 112.77초까지 시간 진행을 확인했다.
- 데스크톱과 좁은 모바일 화면에서 영상·캡션을 시각 확인했다. 모바일 영상 약 308.6×173.6, 가로 넘침 없음. 모바일 너비에서도 재생·일시정지를 확인하고 viewport를 복원했다. 물리 터치 기기·영상 전체 내용·음성은 별도 검증하지 않았다. 커밋·푸시하지 않았다.
