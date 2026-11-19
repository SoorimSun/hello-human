# 일반뉴스 52호 조사 기록

기사 기준일은 2026년 11월 19일(KST)이다. 날짜가 있는 11월 18일 발표와 평가를 기준으로 삼았다. 운영 서비스, 모델 API, 비공개 대기 등록 기능은 직접 실행하지 않았다.

## Google Labs와 Stitch Loop

- Stitch의 기존 화면 설계와 구분하기 위해 3월 18일 소개된 자연어 기반 UI 시안 제작 기능을 대조했다. [Google Labs의 기존 Stitch 소개](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/)

- Google Labs가 11월 18일 장기 실행 제품 에이전트 실험을 공개하고 전 세계 대기 등록을 열었다. 자격을 갖춘 Google AI Ultra 이용자를 우선한다. 공개 당시의 접근 조건은 발표문의 ‘Join the waitlist’에서 확인했다. [Google Labs의 Stitch Loop 발표](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-loop/)
- 발표사가 설명한 순서는 운영 신호에서 후보를 찾기, 해결책별 장단점과 범위 제시, 사용자가 선택한 방향으로 격리 환경에서 코드 작성 및 PR 열기, 운영 지표 재관찰이다. 병합은 사람의 검토가 필요하다. 기본 루프는 보안·지연 시간·접근성이다. 보안 루프에 명시된 모델은 Carbon이며, 같은 날 공개된 Neon을 Loop의 기반으로 단정하지 않았다. [Google Labs의 Stitch Loop 발표](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-loop/)
- 상세 주소를 비운 고객의 주문 거절과 Loop의 예시 제안은 제품 흐름을 설명하기 위해 구성한 가상 상황이다. 인용 부호 속 문장은 공급사나 실사용자의 발언이 아니다. 실제 고객사의 개선율·장애 감소·시간 절감은 확인하지 못했다.

## Google DeepMind와 독립 평가

| 확인할 주장 | 확인 결과와 기사 처리 | 근거 |
| --- | --- | --- |
| Neon의 공개와 사용처 | 11월 18일 순차 제공 시작. 유료 Gemini API, Gemini for business, 대상 Pro·Ultra의 Antigravity와 Gemini 앱. Google이 설명한 역할 분담 예시는 Neon의 계획·조정과 Hydrogen의 하위 작업 수행이다. | [Google의 Gemini 4 Neon 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) |
| 평가 설정·점수 | 11월 18일 Artificial Analysis 발표에서 최고 설정끼리 비교한 Neon xhigh 61점, Carbon high 60점. 당시 발표는 Neon을 3위로 설명하며, 모델 페이지 순위는 비교 설정과 시점에 따라 달라 기사 표에는 점수만 사용했다. 별도 Vals Index의 확인 당시 점수는 70.87%, 42개 모델 중 2위다. | [Artificial Analysis의 11월 18일 평가](https://artificialanalysis.ai/articles/gemini-4-neon-intelligence-gain) · [Artificial Analysis 모델 페이지](https://artificialanalysis.ai/models/gemini-4-neon) · [Vals AI의 Neon 평가](https://www.vals.ai/models/google_gemini-4-neon) |
| 과제당 비용과 시간 | AA 평가기관의 당시 발표 기준 약 21분·6.44달러 대 약 36분·7.76달러. Neon은 출력 토큰이 약 15% 많았고 출력 속도는 초당 약 110 대 57토큰. AA는 낮은 비용을 정가 기준 토큰 단가 차이로 설명했다. 시간은 지수의 과제당 시간 지표이며 실제 개발자가 조사·승인하는 시간까지 측정한 값으로 쓰지 않는다. | [Artificial Analysis의 11월 18일 평가](https://artificialanalysis.ai/articles/gemini-4-neon-intelligence-gain) |
| 적용한 가격 | Google이 밝힌 Neon의 100만 토큰당 입력 3달러, 캐시 입력 0.15달러, 출력 15달러. Carbon 유료 Standard의 11월 30일까지 입력·출력·캐시 입력은 2·10·0.10달러, 12월 1일부터 4·20·0.20달러. | [Google의 Gemini 4 Neon 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [Google의 API 가격표](https://aistudio.google.com/docs/pricing#gemini-4-carbon) |
| 17% 절감의 조건 | AA는 Carbon의 할인 전 단가를 사용했다. (7.76 − 6.44) ÷ 7.76 ≈ 17.0%. 같은 Carbon 토큰 구성에 세 단가 모두 절반을 적용하면 7.76 × 0.5 = 3.88달러. 후자는 편집부 환산이며 새 실측이나 특정 회사 청구서가 아니다. Google이 인용한 기본 high 설정의 비용 절감률은 이 비교에 섞지 않았다. | [Artificial Analysis의 11월 18일 평가](https://artificialanalysis.ai/articles/gemini-4-neon-intelligence-gain) · [Google의 API 가격표](https://aistudio.google.com/docs/pricing#gemini-4-carbon) |

## OpenAI API의 데이터 지역

- 11월 18일자 릴리스 노트는 자격을 갖춘 API 조직 소유자가 프로젝트 생성 시 고정 지역을 선택하거나 새 Global 프로젝트에서 요청별 지역 선택을 켤 수 있다고 명시한다. 이번 변경은 설정 절차이며, 지역 추론 기능 전체가 이날 신설됐다고 쓰지 않았다. 해당 릴리스 노트의 한국어 사이트에는 이 항목이 영어로 실려 있다. [OpenAI의 11월 18일 릴리스 노트](https://help.openai.com/ko-kr/articles/10128477-chatgpt-enterprise-and-edu-release-notes) · [프로젝트 관리 안내](https://help.openai.com/en/articles/9186755-managing-projects-in-the-api-platform)
- 별도 ZDR 신청 없이 지역 설정 가능. ZDR이 자동 적용된다는 뜻으로 확대하지 않는다. API 지역 지원표의 South Korea 행은 저장 Yes, 처리 No다. 지속 저장이 필요한 지원 고객 콘텐츠에 한하며, 모델·엔드포인트·스냅샷별 지원을 확인해야 한다. 외부 MCP 서버에 보낸 데이터에는 그 서버의 지역 정책이 적용된다. [OpenAI API 지역별 지원표](https://developers.openai.com/api/docs/guides/data-residency)

## OpenAI의 연구와 배포 통제

- 11월 18일 발표는 연구, 직원 내부 사용, 외부 공개에 적용하는 통제를 정리했다. 7월의 Hugging Face 관련 사건과 9월 연구 환경 사건을 회고했다. 회사에 따르면 9월 20일부터 10월 1일까지 가장 강력한 모델들의 훈련과 평가를 일시 중단했다. [OpenAI의 단계별 안전 운영 설명](https://openai.com/index/managing-frontier-ai-risk/)
- 11월 9일 소개된 Control Room은 추론 계층에서 작업별 권한을 확인한다. 중단 지시 수신부터 추가 모델 출력이 불가능해지기까지 최대 35초라는 회사 설명에는 권한 캐시의 시차가 포함된다. 11월 18일 발표는 프런티어 모델 연구 작업에서 Control Room 장애 시에도 출력을 막는다고 설명한다. 소비자용 Codex의 중단 보장이나 완료된 업무의 원복 시간으로 확장하지 않았다. [OpenAI의 Control Room 기술 설명](https://openai.com/ko-KR/index/control-room/) · [OpenAI 한국어 안전 뉴스룸의 발표 날짜](https://openai.com/ko-KR/news/safety-alignment/)
- 내부 Codex는 잠재적 위험 행동을 독립적으로 검토하는 Auto-Review를 일반적으로 요구한다. 외부 제공에는 추가 안전성 평가·일부 제3자 시험·내부 경보 검토가 있다. 운영 방식은 회사의 설명이고, 통제 효과를 독립적으로 측정한 수치는 확보하지 않았다. [OpenAI의 단계별 안전 운영 설명](https://openai.com/index/managing-frontier-ai-risk/)

## 미디어와 설명용 자료

| 기사 위치 | 원본·제공자와 채택 이유 |
| --- | --- |
| Stitch Loop 제품 화면 | Google Labs가 11월 18일 발표한 [Stitch Loop UI 원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/CleanShot_2026-11-17_at_13.01.13.width-1200.format-webp.webp). 11월 19일 확인. 기사 파일은 `assets/news/stitch-loop-overview.webp`, 1200 × 836 WebP. 전경·비율·픽셀을 바꾸지 않고 기사 너비에 맞춰 축소 표시한다. Storybook 커버리지 목표·추이와 작업 목록을 함께 보여줘 채택했다. 화면 속 58.06%는 예시 프로젝트 화면의 값이다. 출처를 표시했으며 별도 재사용 라이선스는 확인되지 않았다. [Google Labs의 Stitch Loop 발표](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-loop/) |
| Neon 대표 이미지 | 11월 18일 [구글 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)에 실린 [공식 대표 이미지 원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-4-neon__blog-header__sm.width-1600.format-webp.webp). 11월 19일 확인. 주황색 네온관으로 모델명을 표시한 이미지를 Neon 절의 도입에 배치했다. 파일은 `assets/news/gemini-4-neon-official.webp`이며, 구글이 제공한 1600 × 893 WebP를 가공 없이 사용했다. 별도 재사용 라이선스는 확인하지 못했다. |
| Neon 비교표 | [Google의 과제당 비용 도표 원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_4_neon__benchmarks__aa-in.width-1200.format-webp.webp)과 3D 작업 등 발표 페이지의 공식 시연 목록을 확인했다. 기사에서 따지는 것은 할인 전후 비용이어서 11월 18일 독립 평가와 가격표로 텍스트 표를 재구성했다. 영상의 전체 재생이나 성능 재현은 수행하지 않았다. [Artificial Analysis의 11월 18일 평가](https://artificialanalysis.ai/articles/gemini-4-neon-intelligence-gain) · [Google의 API 가격표](https://aistudio.google.com/docs/pricing#gemini-4-carbon) |
| 지역 설정 | 프로젝트 관리 문서에 있는 프로젝트 생성 예시 이미지와 개발자 문서의 한국 리전 행을 확인했다. 화면 소개보다 저장·추론의 지원 여부가 핵심이므로, 해당 행의 두 항목을 한국어로 풀어 썼다. [OpenAI API 지역별 지원표](https://developers.openai.com/api/docs/guides/data-residency) |
| Control Room 중단 과정 | 11월 18일 종합 발표와 11월 9일 [한국어 기술 설명의 공식 13단계 도식](https://openai.com/ko-KR/index/control-room/#4t9Yu5Vdp7LCXHV56T7lx1)을 확인했다. 원문 9~13단계의 중단 결정, 작업 ID 상태 변경, 승인 거부와 후속 출력 차단을 기사 안의 HTML 설명도에 재구성했다. 원도식은 문서 내부에서 작동하며 자동 브라우저는 접근 확인 화면으로 연결되어 원본 재생 화면을 캡처하지 않았다. 최대 35초는 원문의 ‘속도 및 안정성’ 설명에 따라 중단 지시 수신과 추가 출력 차단 사이에만 표시했다. 9월 사건의 당시 화면이나 실측 경과 시간이 아니다. 확인일 2026년 11월 19일. |
| 작은 실험 | 같은 100명 중 60건이 집계돼도 실제 주문은 60건 또는 80건일 수 있다는 가상 사례 두 개를 나란히 배치했다. 10분 지연·20건 차이와 별도 검색 지연 사례는 동호회의 실험 설계값이다. 최근 49호의 실행 환경 비교, 50호의 화면 변경, 51호의 스킬 회귀와 달리 운영 지표가 흔들릴 때 실제 결함과 집계 지연을 가르는지 본다. 그림·사례는 설명용이며 모델 호출, 운영 로그 분석, 성능 실측은 하지 않았다. |
