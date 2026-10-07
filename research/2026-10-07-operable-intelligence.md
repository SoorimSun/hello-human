# 운영 가능한 지능과 업무 능력 조사 기록

- 확인일: 2026-10-07, Asia/Seoul.
- 기사: `news/2026-10-07-operable-intelligence.html`, 일반뉴스 ISSUE 09.
- 사용자 요청에 따라 발행일과 파일명을 2026-10-07로 맞췄다. 원문 자료의 실제 발표일은 유지했다.
- 작업 시작 시 변경 파일 없음. 사용자의 후속 요청으로 로컬 커밋이 승인됐다. 푸시·배포는 수행하지 않는다.
- 공식 발표와 문서를 직접 읽었다. 일부 웹 검색 도구의 원문 열기가 실패해 브라우저로 원문을 열어 확인했다. 검색 요약만으로 사실을 확정하지 않았다.

## 핵심 주장과 편집 판단

| 주장·범위 | 기준과 확인 상태 | 근거 | 반영과 한계 |
| --- | --- | --- | --- |
| ML4 공개 프리뷰 | 10월 6일 Mistral 발표, 현재 API 프리뷰 | [발표](https://mistral.ai/news/mistral-large-4/) | 현재 API와 향후 가중치 공개를 구분. 월말 공개 예정이지 자체 배포가 이미 가능한 상태가 아님 |
| ML4 가중치·라이선스 | 10월 7일 문서 WEIGHTS 탭의 두 항목 모두 Coming soon | [모델 문서](https://docs.mistral.ai/models/mistral-large-4-0) | 오픈웨이트 지향과 실제 다운로드·라이선스 제공을 구분 |
| ML4 파라미터 수 | 발표문 1T·활성 49B, 현재 문서 1.05T·활성 52B·비전 인코더 1.6B | 발표와 모델 문서를 브라우저로 직접 대조 | 본문·수치 카드에 불일치 표시. 검색 캐시에는 문서의 활성량도 49B로 나왔으나 현재 원문은 52B. 어느 값이 오류인지 임의로 결론내리지 않음 |
| ML4 가격·학습 | 발표 기본 입력 $1.36/M, 출력 $4.18/M. 학습 데이터 160개 초과 언어. 자체 유럽 데이터센터 GPU 3,800개 | 발표 가격 카드와 Forged in Europe 절 | 공급사 설명으로 한정. 활성 파라미터 비율을 비용·메모리 절감률로 바꾸지 않음 |
| ML4 벤치마크 | DeepSWE v1.1 61.7%, Terminal-Bench 4 28.3% | 발표 Agentic coding 절과 평가 소개 | 자체 평가만 있다는 초안의 인상을 수정. 공식 발표에는 Artificial Analysis·Vals AI 및 Surge AI 평가도 소개됨. 외부 평가 원자료를 별도 재현한 것은 아니므로 우리 업무의 품질 보장으로 쓰지 않음 |
| GLM 5.3 Bedrock 제공 | 10월 5일 공식 정식 제공 공지. eligible enterprise customers. US·Global 교차 리전 프로필 | [출시 공지](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-bedrock-glm-5-3/) | 이용 대상과 처리 리전 조건을 본문에 보완 |
| GLM 사양 | 전체 753B·활성 약 40B. 문맥 1M·출력 128K | 같은 출시 공지 | 한글 수치로 환산. 모든 AWS 계정·리전에서 같은 기능을 바로 이용할 수 있다는 표현은 피함 |
| GLM API·캐싱 | OpenAI 호환 Responses·Chat Completions, Invoke·Converse. 자동 캐싱과 명시적 캐시 제어 | [AWS 블로그](https://aws.amazon.com/blogs/machine-learning/introducing-glm-5-3-on-amazon-bedrock/) | API별 기능 차이를 전제로 서술. 캐싱 절감률을 전체 작업 비용 절감률로 환산하지 않음 |
| GLM 품질 | AWS 블로그가 Z.ai의 코딩·보안 평가 인용 | 같은 블로그 | AWS의 운영·보안 체계와 모델 답변 품질을 구분 |
| AWS Skill | 10월 5일 SageMaker 추론 최적화에 aws-ai-ml 사용 소개. 기존 Kiro·Claude Code·Codex와 MCP 지원 에이전트 언급 | [AWS 공식 소개](https://aws.amazon.com/blogs/machine-learning/new-agent-skill-amazon-sagemaker-optimized-generative-ai-inference-for-your-coding-agent/) | 새 에이전트 출시로 쓰지 않음. MCP 규약과 Skill 지침 패키지는 다른 역할. 검토 가능한 SDK v3 코드·벤치마크 전 확인·자격 증명에 따른 실행 범위 설명 |
| AWS Skill 이전 존재 여부 | 검색에서 이전부터 있던 aws-ai-ml 문서·저장소도 확인됨 | [공식 저장소의 현재 파일](https://github.com/aws/agent-toolkit-for-aws/blob/main/skills/core-skills/aws-ai-ml/SKILL.md) | 전체 Skill의 최초 탄생이라고 확정하지 않고 이번 추론 최적화 활용 발표로 표현. 현재 저장소의 폭넓은 배포 기능을 이 발표의 실행 범위에 섞지 않음 |
| Cohere 소개일과 논문일 | 블로그 10월 6일, arXiv v1 9월 9일 16:56:25 UTC | [블로그](https://cohere.com/blog/building-multilingual-bridges), [논문](https://arxiv.org/abs/2609.10445) | ‘최근 24시간에 연구 최초 공개’ 인상 제거. 블로그에서 연구를 소개한 시점과 구분 |
| Tiny Aya L2-Thinker | 3.35B, 60개 언어·6개 벤치마크, 93% 초과 L2 reasoning rate | 같은 블로그·논문 초록 | 생성된 추론 문장의 언어 일치 비율이지 정답률이 아님. 모든 언어 각각 93%라는 주장이나 한국어 업무 정확도 주장으로 확장하지 않음 |
| 정확도·연구 한계 | 영어 추론 비교 모델 대비 대부분 평가의 차이 작음, PolyMath 하락 더 큼 | 블로그 What we measured 절 | 연구용 모델·데이터 공개. North·Command 기능 발표와 분리. 추론 문장과 내부 계산의 충실성도 구분 |

## 미디어와 해석

- 첫 뉴스에 Mistral 공식 발표의 제품 소개 화면을 직접 캡처해 삽입했다. 자세한 출처·가공 여부는 `assets/news/operable-intelligence-media.md`.
- 같은 로컬 이미지를 Open Graph·Twitter·image_src 메타데이터에 연결했다. 원격 배포 전이므로 공개 URL에서 썸네일 수집 성공을 확인했다고 주장하지 않는다.
- 공식 페이지의 배경 JPG만으로는 제품 이름과 숫자 4가 보이지 않아 쓰지 않고, 실제 렌더링된 소개 화면을 캡처했다.
- 단계·운영 경로·데이터 구성·업무 구조는 별도 설명용 도식이다. 제품 내부 구조나 실험 결과가 아니다.
- 초안의 Intent → Skill → Tool → Model → Evidence를 고정 실행 순서로 오해하지 않도록 역할 관계로 표현했다.
- ‘모델보다 업무 능력을 자산으로 보자’는 헬로우 휴먼의 종합 해석이다. 업체들이 같은 기술 구조를 발표했다는 뜻이 아니다.
- 가상 쿠폰 사례 20개 비교는 미실행 제안. 사전 기대 결과·완료 조건, 재시도·캐시 조건, 실패 비용과 사람 수정 시간을 포함한다.
- 한국어 경로를 웹 도구로 확인했지만 유효한 원문을 확보하지 못한 자료는 직접 읽은 공식 영문 원문으로 연결했다. Reuters 등 읽지 않은 보도는 근거 목록에서 제외했다.

## 검증 기록

- `node --test` 7개 통과. 새 JavaScript와 외부 패키지는 추가하지 않았다.
- `git diff --check` 통과. 기사·홈·목록의 상대 파일·앵커 링크, 중복 ID, 이미지 alt·크기, noindex와 ISSUE 09, 새 기사 단일 등록을 확인했다.
- 정적 목록과 브라우저 필터 모두 총 14편, 일반뉴스 9편, 속보·단신 5편이다. 방향키와 Home 키로 필터 전환이 동작했다.
- 로컬 HTTP 미리보기에서 홈 카드가 새 기사로 연결되는 것을 확인했다. 목차의 첫 뉴스 이동과 데스크톱 활성 절 표시도 확인했다.
- 이미지가 1250 × 710으로 정상 로딩됐다. 데스크톱과 390px 모바일 화면의 라이트·다크 스크린샷을 확인했다. 검사한 본문과 도식에 가로 넘침은 없었다.
- 기사 읽기·테마 조작·목록 복귀·새로고침 후 해당 글에 New/Updated 표시가 다시 붙지 않았다. 확인한 기사 페이지의 브라우저 오류 로그는 없었다.
- 실제 모바일 기기의 터치, 인쇄, 외부 서비스의 공유 카드 수집은 시험하지 않았다. 썸네일 메타데이터는 배포 후 사용할 공개 경로로 지정했지만 푸시·배포는 수행하지 않았다.
- 임시 미리보기 서버는 loopback에만 바인딩하고 숨김 경로와 개발 문서, 디렉터리 목록을 제공하지 않도록 제한했다. 서버 도우미·검증 스크린샷은 저장소 밖의 작업용 디렉터리에 둔다.
