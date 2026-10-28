# AI뉴스 30 · Oracle의 업무 연동과 업무 맥락

- 기사: `news/2026-10-28-oracle-business-context.html`
- 발행일·확인일: 2026-10-28, 한국시간
- 입력: 사용자가 제공한 Oracle·OpenAI, 온톨로지, Genie 4, 인프라, ETH 연구 초안.
- 작업 범위: 기사·목록·홈의 로컬 반영 후 사용자 요청으로 내용·문체 재검토와 커밋. 푸시·배포 제외. 실험은 제안만 작성.

## 핵심 주장과 편집 판단

| 주장·대상 | 기준과 직접 읽은 근거 | 확인 상태·기사 표현 |
| --- | --- | --- |
| ChatGPT와 Oracle 업무 연동 | [OpenAI 발표](https://openai.com/index/oracle-apps-in-chatgpt/), 10월 27일 | 개발 중인 Workspace의 목표로 표현. 승인된 업무·조직 권한 조건 유지. |
| Workspace 제공 상태 | [Oracle 제품](https://www.oracle.com/artificial-intelligence/workspace/), [OpenAI 파트너](https://openai.com/business/partners/oracle/), 10월 28일 확인 | 제품 페이지의 upcoming LA 신청과 일부 플러그인 설치 안내를 구분. 실제 테넌트 사용은 시험하지 않음. |
| App Composer·Security Mesh·Marketplace | 위 OpenAI 발표와 [Oracle 협력 페이지](https://www.oracle.com/artificial-intelligence/oracle-openai/) | 제품 설계·소개 범위. 미국 Marketplace 구매와 자격을 갖춘 Universal Credits는 현재 안내. 전체 제품의 GA로 확대하지 않음. |
| 업무 관계·정책의 생성과 전문가 승인 | [Oracle AI Data Platform 발표](https://www.oracle.com/news/announcement/ai-world-oracle-ai-data-platform-brings-ai-assisted-business-context-to-enterprise-ai-2026-10-27/), 10월 27일 | AI Discovery 초안 → 전문가 승인 → Semantic Reasoning Engine의 맥락 구성. 공급사 제품 설명이며 독립 성능 측정 아님. |
| Registry·Governance·제공 시점 | 같은 발표의 관련 절, 마지막 availability 문단 | 새 기능은 향후 12개월 이내 제공 계획. Registry 목록과 실제 권한 통제를 동일시하지 않음. 효율·절감 수치 없음. |
| Genie 4 기능·모델 역할 | [DeepMind 원문](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/), 10월 27일 | 실제 브라우저 본문과 미디어 확인. 실시간 장면 조정·오디오, 3.8 Flash의 안내 역할. Argon 로봇 예시는 별도로 표기. |
| Genie 4 접근·물리 한계 | 같은 원문의 limitations·next steps, [제품 페이지](https://deepmind.google/models/genie/) 검색 결과 대조 | 제한 테스터 연구 프리뷰. Ultra·API·Studio 일부 파트너 확대 예정. 긴 실행의 일관성·공간 정확성 한계 유지. 본문 근거는 날짜가 있는 발표문. |
| NVIDIA OCI 제공 상태 | [Oracle 기술 블로그](https://blogs.oracle.com/cloud-infrastructure/nvidia-vera-rubin-vera-cpus-oci), 10월 27일 | NVL72·Vera CPU GA 발표와 NVL8 계획 구분. 고객 리전·계약별 실제 구매 가능 여부는 미검증. 배수 성능 주장은 채택하지 않음. |
| TPU·Cerebras OCI 도입 | [Oracle TPU 발표](https://www.oracle.com/news/announcement/ai-world-oracle-brings-google-tpus-to-oracle-cloud-infrastructure-2026-10-27/), [Cerebras 발표](https://www.cerebras.ai/press-release/cerebras-and-oracle-team-up-to-bring-cerebras-ai-inference-to-oracle-cloud-inf-3389429), 모두 10월 27일 | 두 서비스 모두 calendar year 2027. 동일 업무 비용 비교·구체적인 OCI 가격은 이 발표문에서 확인되지 않음. |
| ETH 반박 주장과 공개 시점 | [OpenAI 발표](https://openai.com/index/building-scientific-understanding-with-academic-communities/), 10월 26일 | 자연어 결과 10월 16일·Lean 형식화 17일은 발표사 설명. 학계 독립 검토 완료로 쓰지 않음. |
| Lean 검증의 정확한 범위 | [범위 문서](https://github.com/openai/math/blob/main/lean/docs/378.md), [원문 텍스트](https://raw.githubusercontent.com/openai/math/main/lean/docs/378.md), 10월 28일 직접 열람 | canonical k-CNF, 고정 k≥2, 준지수 시간·다항 공간. Lean 상한의 지수항은 n(log log n)^2/√log n, 10월 25일 논문은 더 강한 n log log n/√log n. 검사를 직접 재실행하지 않았음. |

## 초안에서 바꾼 점

- 포괄적인 ‘플랫폼으로 진화’ 대신 Oracle·OpenAI의 구체적인 업무 연동을 제목으로 삼았다.
- ‘최근 24시간’으로 전체를 묶지 않고 발표일을 명시했다. ETH의 발견·형식화·공개일을 구분했다.
- Workspace 개발과 일부 플러그인 안내, Marketplace 구매를 분리했다.
- 새 AI Data Platform 기능의 제공 예정 상태를 본문·요약·설명도에 반영했다.
- Genie 4·Gemini 3.8 Flash·Gemini 4 Argon의 역할을 원문과 맞췄다. 산업용 물리 검증 제품으로 확대하지 않았다.
- NVIDIA 정식 제공과 TPU·Cerebras 계획을 표로 분리했다. SambaNova는 이번 조사에서 해당 날짜의 공식 발표를 확보하지 못해 제외했다.
- TechCrunch의 연구자 반응을 재인용하지 않고 OpenAI의 공개 절차와 직접 읽은 형식화 범위로 연구 소식을 구성했다. 새 정정·독립 검토 완료를 확인했다는 주장은 하지 않았다.
- GPU·추론·RAG 등의 사전식 정의와 반복되는 부정문을 덜었다. 커머스 예시는 자체 해석으로 명시했다.

## 커밋 전 재검토

- OpenAI 협력 발표, Oracle Workspace 제공 상태, Lean 형식화 범위 원문을 다시 열어 개발·신청 단계와 증명 범위를 대조했다.
- Genie 4의 요약을 ‘글로 지시해 장면을 바꾼다’로 고쳐 장면을 텍스트로 변환한다는 오해를 줄였다.
- ‘통합 경험’, ‘수행하는 경험’, ‘신뢰할 수 있는 테스터’ 등 추상적이거나 번역투인 표현을 구체적으로 바꿨다. 온톨로지 설명의 반복을 줄이고 소제목을 내용에 맞췄다.
- ETH의 준지수 시간 표기를 명확히 하고, 개발자 관점을 검사 조건·범위 확인으로 정리했다.
- 실험 정답을 온톨로지에서도 제외하고 최종 평가 전에 설정을 고정하도록 했다. 오탐에 실제 영향이 없는 항목도 포함하고, 채택 조건은 정확도를 유지하면서 사람의 작업 시간을 줄이는 것으로 구체화했다.
- 문체 수정 후 기존 테스트 71개와 HTML의 링크·목차·제목·날짜·개수·공백 검사를 다시 통과했다. 브라우저를 새로고침해 요약·실험의 수정 문장을 확인했고, 데스크톱과 좁은 화면에서 가로 넘침이 없었다. 공식 이미지 로딩과 콘솔 오류·경고 없음도 다시 확인했다.

## 근거 확인 범위

영문 공식 발표·제품 안내를 실제로 열었다. OpenAI 한국어 URL은 영문으로 리디렉션됐고 Oracle 한국어 발표는 접근 가능한 본문을 확보하지 못했다. DeepMind 원문은 웹 추출 오류 후 실제 브라우저에서 본문·지연 로딩 미디어·공식 YouTube 플레이어를 확인했다. NVIDIA 뉴스룸의 직접 열기가 실패해 같은 날 Oracle 공식 기술 블로그로 제공 상태를 확인했다. 웹 검색으로 후속 변경도 확인했으나 정정이나 독립 검토 완료를 뒷받침할 새 공식 근거는 확보하지 못했다.

## 실험 설계의 성격

합성 커머스 프로젝트의 정책 변경 영향 분석을 제안한다. 기준선·비교군이 같은 문서와 코드를 이용하고, 승인된 관계 파일만 추가한다. 6건 조정·18건 평가·3회 반복과 채택 조건은 이 기사에서 정한 제안이다. 정답 목록은 입력에서 제외하고 정책 계열을 분리해 유사 사례 누출을 줄인다. 비용·시간은 향후 평가 항목이며 이 작업에서 실험이나 모델 사용량 통계를 수집하지 않았다. 구현·실제 호출·운영 데이터 변경은 수행하지 않았다.

## 검증 기록

- `node --test`: 기존 테스트 71개 통과. 기사 사실 검증과는 별도 검사다.
- `git diff --check`: 통과. 새 텍스트 파일은 별도로 끝 공백·탭을 확인했다.
- HTML 파서 검사: 기사·목록·홈의 중복 ID 없음, 내부 파일·목차 대상 존재, 외부 링크의 새 탭·rel 속성 확인. 일반뉴스 30·단신 10·전체 40, 기사·목록·홈의 제목·날짜·URL 일치.
- 브라우저: loopback 정적 미리보기의 `/hello-human/` 하위 경로로 확인했다. 개발용 숨김 경로와 디렉터리 목록은 제공하지 않는다.
- 1360×1000 데스크톱과 390×844 모바일에서 제목·설명도·실험 입력·표 확인. 가로 넘침 없음. 모바일의 인프라 표만 내부 가로 스크롤이며, 키보드 오른쪽 이동으로 scrollLeft 40 확인.
- 라이트·다크 전환, 목차 이동, 이미지 1328×553 정상 로딩, 모바일 세로 설명도 확인. 기사 콘솔 오류·경고 없음.
- 영상: 클릭 전 자동 재생 없음. 클릭 후 0:31·0:56 진행, Space로 0:57 일시정지 상태 확인. 약 2:28의 전체 내용을 시청·검증한 것은 아니다.
- 목록 필터: 전체 고유 40개, 일반뉴스 표시 30개, 단신 표시 10개. 기사 읽기·영상 조작·목록 복귀·새로고침 후 이 기사에 New/Updated 배지가 다시 붙지 않음. 홈 최신 카드로 기사 이동 확인.
- JS 없는 기사 본문·설명도·표는 정적 HTML에 포함된다. 실제 JS 비활성 브라우저와 인쇄 미리보기, 물리 모바일 기기의 터치 동작은 별도로 시험하지 않았다.
- 저장소 기존 파일 변경은 홈과 뉴스 목록에 한정. 기사·전용 CSS·공식 이미지·조사·미디어 기록 추가. 실제 사내 데이터·내부 URL, 이전 기사 내용 잔재 없음.
- 푸시·배포, 제품 직접 사용, 실험 구현 및 Lean 재실행은 수행하지 않았다.
