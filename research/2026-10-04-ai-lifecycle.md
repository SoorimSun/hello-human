# AI뉴스 06 검증 기록

확인일·발행일 2026-10-04 (Asia/Seoul). 제공 초안은 10월 3일자다. 기사·홈·목록은 새 일반뉴스 06으로 로컬 반영한다. 공급사 평가를 직접 재현하지 않았다.

## 근거와 편집 판단

| 항목 | 주체·대상·시점 | 확인 상태와 사용할 표현 | 근거 |
| --- | --- | --- | --- |
| 모델 교체 | GitHub, Copilot, 10월 2일 | 공식 종료 공지 확인. 4종과 대체 모델은 기사 표 참조. 공급사 전체 서비스 종료로 확대하지 않는다. | [종료 공지](https://github.blog/changelog/2026-10-02-selected-models-in-github-copilot-deprecated/) |
| 리뷰 API | GitHub, REST·GraphQL, 10월 2일 | 일반 제공. 요청별 effort 지정. Balanced 적용일은 9월 28일이며 명시적 Lite 유지. | [발표](https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/) |
| 설정 | GitHub Copilot | 한국어 공식 페이지가 실제 제공됨을 열어 확인. 구체적 발표 날짜의 근거는 영문 공지. | [한국어 문서](https://docs.github.com/ko/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review) |
| 멀티턴 학습 | AWS SageMaker AI | 순차 행동과 보상으로 훈련. 운영 중 자동 학습이라는 표현 배제. | [MTRL 문서](https://docs.aws.amazon.com/sagemaker/latest/dg/model-customize-mtrl.html) |
| 검색 실험 | AWS, Qwen3.6-27B, 10월 2일 | 공급사 자체 평가. ESCI 학습/Wands 평가 구분 수정. nDCG@10·실패율의 수치와 단위는 기사 그래프 참조. | [실험과 결과 표](https://aws.amazon.com/blogs/machine-learning/fine-tune-a-search-agent-with-multi-turn-rl-on-amazon-sagemaker-ai/) |
| 행동 평가 | Anthropic, Sonnet 5.5, 허브 10월 2일 표시 | 자체 평가 요약 확인. AI 채점, 8개 항목 중 7개 개선. 숨겨진 작업 실험은 감시자의 추론 열람 조건을 함께 명시. | [Transparency Hub](https://www.anthropic.com/transparency) |
| 사임과 반론 | David Robinson·OpenAI, Reuters 10월 3일 | 최근 사임으로 보도. 정확한 퇴사일은 특정하지 않음. 회사의 훈련 중단·공개 보류 답변 병기. | [Reuters, MarketScreener 게재](https://www.marketscreener.com/news/openai-safety-employee-quits-says-time-for-trial-and-error-is-over-ce785ddbdc89fe22) |

## 중요한 한계

- AWS의 BrowseComp-Plus 점수 상대 변화는 `(0.6354 / 0.5136 - 1) × 100 ≈ 23.7%`. 실패율 차이는 `22.89 - 0.68 = 22.21%p`. 실패한 작업은 검색 점수 0점에 포함되므로 두 지표의 개선을 완전히 독립적인 성과로 합산하지 않는다.
- 실패율은 원문 발표값 그대로 쓰고 실패 건수를 역산하지 않는다. 원문 표의 문항 수와 비율만으로 반복 평가·집계 방식을 확정할 수 없다. 통계적 유의성·학습 포함 총비용 우위를 입증한 것으로 쓰지 않는다.
- Anthropic 허브 날짜를 Sonnet 5.5 출시일이나 평가 실시일로 바꾸지 않는다. 추론 기록 열람 실험에서 일반 서비스의 탐지율을 추론하지 않는다. 도구·승인·처리 기록 도식은 편집 제안이다.
- Reuters 최초 게재 10월 3일 14:59 EDT는 한국 시간 10월 4일 03:59. 보도일·퇴사일·기사 발행일을 구분한다. [The Atlantic 기고](https://www.theatlantic.com/technology/2026/10/openai-safety-team-resignation/688881/) 전문은 조회 오류로 직접 확인하지 못했다. Reuters가 보도한 범위만 채택했다.
- 10월 4일 관련 후속·정정 검색에서 이 기사의 핵심을 뒤집는 공식 정정은 확인하지 못했다. AWS·Anthropic 최신 항목의 공식 한국어 번역은 확인하지 못해 영문 원문을 사용한다. 검색 결과 요약만으로 추가 주장을 넣지 않았다.
- ‘최근 24시간 신모델 발표가 적었다’는 전수 조사 없는 도입부는 제외했다. 모델 역할 분리, 실행 전 승인, 가상 상품 평가 세트는 모임의 제안이며 실험 결과가 아니다.

## 화면과 검증

- 기존 기사 구조·공통 스크립트를 유지하고 기사 전용 CSS를 추가한다. 모델 교체는 표, 수치는 공통 축의 막대, 업무 흐름은 순서형 목록으로 표시한다. 색 외에 텍스트로 전후·조건을 구분한다.
- [미디어 기록](../assets/news/lifecycle-media.md)에 공식 화면 출처를 남긴다.
- `node --test`: 기존 테스트 7개 통과. 새 실행 로직은 추가하지 않았다.
- `git diff --check`: 통과. 별도 정적 검사에서 기사 ID 17개 중복 없음, 내부 목차 대상 일치, 기사·목록·홈의 상대 자산 및 파일 링크 66개 존재 확인.
- 목록 전체 10편·일반뉴스 6편·단신 4편, 새 기사 단일 등록, 홈의 뉴스 06·발행일·제목·링크 일치 확인. 기존 단신 카드는 유지.
- 앱 내 브라우저에서 1280×900, 390×844, 320×800 뷰포트 확인. 기사 전체 DOM의 가로 넘침 없음. 데스크톱·모바일 스크린샷으로 제목·메뉴·평가 그래프 확인, 라이트·다크 대비와 목차 이동 확인.
- GitHub 외부 이미지의 실제 로드 완료와 원본 크기 2064×1096 확인. 설정 화면 내용도 시각 확인.
- 일반뉴스·속보·전체 필터의 표시 개수 6·4·10, 키보드 좌우 이동, 기사 열기→목록 복귀→새로고침 후 해당 기사에 불필요한 Updated 표시 없음 확인. 모바일 홈 카드와 링크도 확인.
- 신규 도식·표·그래프는 JS 없는 정적 HTML/CSS이며 본문용 JS를 추가하지 않았다. 브라우저의 JS 비활성화 및 실제 인쇄 화면은 별도 실행하지 않았다.
- 최종 변경 범위는 기사·전용 CSS·출처 기록과 뉴스 목록·홈·README다. 검증은 로컬에서 수행했으며 원격 푸시·배포는 검증 범위에 포함하지 않았다.
