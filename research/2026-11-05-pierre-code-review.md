# OpenAI의 Pierre 인수 계획, 코드 검토에서 저장까지 | 일반뉴스 38 조사 기록

확인일·기사 날짜: 2026-11-05 KST. 첨부 원고의 다섯 소식을 유지했다. 아래 날짜는 발표문 표기이며, 연구 실행일과 제품 제공일은 별도로 확인했다. 발표 원문을 대조한 것으로 제품 성능·보안 결과를 독립 재현한 것은 아니다.

| 핵심 주장 | 근거·시점 | 판정과 기사 표현 |
| --- | --- | --- |
| OpenAI가 Pierre를 인수할 계획이다. | [공식 한국어 발표](https://openai.com/ko-KR/index/openai-to-acquire-pierre/), 11/4. | 발표 확인. 규제 승인 등 종결 조건이 있으며 그때까지 독립 운영. 완료·거래가·GitHub 대체로 쓰지 않는다. |
| Codex가 Trees·Diffs를 이미 사용하며, Code Storage 기능은 거래 후 통합할 계획이다. | [OpenAI](https://openai.com/ko-KR/index/openai-to-acquire-pierre/), [Pierre Diffs](https://diffs.com/). | 현재 사용과 장래 통합을 분리. 기존 고객은 거래 후에도 이용 가능하다는 회사 설명. Diffs의 편집 데모는 Pierre의 제품 화면이다. |
| Pando는 이미 내부에서 쓰는 Git 백엔드다. | [OpenAI 기술팀 (한국어)](https://openai.com/ko-KR/index/scaling-git-at-openai/), 11/2. | 내부 통합 저장소 적용은 회사가 보고. 인수로 출시되는 외부 서비스로 쓰지 않는다. |
| Conductor가 Meta에 합류했다. 작업마다 별도 브랜치·파일·터미널을 둔다. | [Conductor 공지](https://www.conductor.build/announcement), [Meta 확인을 실은 TechCrunch](https://techcrunch.com/2026/11/04/meta-acquires-ai-coding-startup-conductor/), 11/4. [공식 제품 문서](https://www.conductor.build/docs), [검토 화면](https://www.conductor.build/docs/reference/diff-viewer). | 발표·기능 확인. 현재 문서의 제품 설명은 11/4 이후의 신규 가입 가능성을 뜻하지 않는다. |
| Conductor Cloud는 11/13 읽기 전용, 11/20 종료 및 데이터 삭제 시작. | [전환 일정·FAQ](https://www.conductor.build/announcement), 11/4 신규 가입·다운로드 중단. | 11/5 기준 앞의 두 날짜는 예정. 작업공간별 Transfer to local, 전체 Settings → Account → Export data. 로컬 모델 업데이트·중요 수정은 2027년 초까지 지원 계획. 후속 기능은 미공개. |
| Linux: 후보 2,308건, 동적 재현 1,724건, 로컬 권한 상승 입증 948건. | [OpenAI 연구 ‘Findings’, ‘Summary’](https://openai.com/index/a-thousand-fewer-paths-to-root/). 10월 중순 최신 커널을 대상으로 실행, 11/4 발표. 한국어 경로는 영문으로 이동해 영어 원문 사용. | 회사 연구 결과. 아직 출시하지 않은 모델, 격리 VM, 일반 데스크톱 OS 조건. 948건은 작동한 LPE exploit 기준이지 신규 CVE·패치 적용 수가 아니다. 1,724건 모두가 LPE인 것도 아니다. |
| Linux: 61건 본류 수정, 43건 staging 패치, 299건 공개 보고·논의. | [Maintainers are moving quickly](https://openai.com/index/a-thousand-fewer-paths-to-root/). 스캔 및 수동 분석 종료 시점(열흘 뒤). | 당시 이미 해결되거나 논의되고 있던 사례. OpenAI가 이 수만큼 수정했다거나 발표일 현재의 패치 비율이라고 쓰지 않는다. 수정 후보와 사람의 검토·보고를 분리. |
| 해당 실행의 API 크레딧 합계 1,213,430달러. | [OpenAI](https://openai.com/index/a-thousand-fewer-paths-to-root/), [달러/원 과거 데이터](https://kr.investing.com/currencies/usd-krw-historical-data) 11/4 일별 종가. | 공급사가 보고한 API 크레딧만 해당. 전체 연구비·사람의 시간·서비스 요금이 아니다. 상세 환산은 아래 참고. |
| Tencent가 Hy4 정식판의 시각 이해·컴퓨터 조작을 발표했다. | [Tencent Hy 연구팀 원문·시연](https://hunyuan.tencent.com/research/hy4?langVersion=zh), [Tencent 배포 발표문](https://en.prnasia.com/releases/apac/tencent-launches-hy4-joining-the-ranks-of-the-world-s-leading-open-source-ai-models-554689.shtml), [Tencent Cloud ADP](https://adp.tencent.com/zh/blog/tencent-cloud-adp-hunyuan-hy4-release), 11/4. | 발표 확인. CLI·GUI와 이미지·차트 처리, WorkBuddy·CodeBuddy·TokenHub에서 이용 가능하다는 회사 설명. 위성사진은 시각 이해 과제이지 기업 자동화 실적이 아니다. |
| WorkBuddy 평가 평균 83.18점, 과제 통과율 96.15%. 금융 평가는 전문가 213명·과제 579개. | [Tencent 배포 발표문](https://en.prnasia.com/releases/apac/tencent-launches-hy4-joining-the-ranks-of-the-world-s-leading-open-source-ai-models-554689.shtml), 11/4. | 서로 다른 회사 주관 평가. 금융 평가에 외부 전문가 153명 참여. 579개는 WorkBuddy 통과율의 분모가 아니다. WorkBuddy 평가 과제 수를 역산하지 않았다. |
| 정식판 가중치·시스템 카드 공개 상태. | [11/4 중국어 발표](https://hunyuan.tencent.com/research/hy4?langVersion=zh)와 [영문 발표](https://en.prnasia.com/releases/apac/tencent-launches-hy4-joining-the-ranks-of-the-world-s-leading-open-source-ai-models-554689.shtml); [Preview 저장소](https://github.com/Tencent-Hunyuan/Hy4-preview), [Tencent의 모델 목록](https://huggingface.co/tencent). | 정식판 발표 시점에는 추후 공개 계획. 확인 가능한 Preview 가중치와 구분. 정식판 가중치를 내려받아 검증하지 않았다. |
| CodeQL 2.27.4 로그 정제 인식과 일부 오탐 개선. | [CodeQL CLI 11/2 변경 기록](https://codeql.github.com/docs/codeql-overview/codeql-changelog/codeql-cli-2.27.4/), [GitHub 11/4 공지](https://github.blog/changelog/2026-11-04-codeql-2-27-4-improves-accuracy-and-query-metadata/), [Java 로그 삽입 설명·예제](https://codeql.github.com/codeql-query-help/java/java-log-injection/). | Java/Kotlin 추가 정제 처리 인식, Rust 일부 로그·할당 쿼리의 오탐 감소, C/C++의 의도한 std::byte* 연산 경고 개선. 코드 스캔 자동 배포는 GitHub.com, GHES 3.24는 예정. 전체 탐지율 변화는 수치로 제시하지 않았다. |

## Linux 연구 비용의 표기

- 원문에서 총액은 1,213,430달러, 한 건당 비용은 1,279달러로 표기한다. 표시된 총액 ÷ 948 = 1,279.99달러이므로 기사는 자체 계산임을 드러내고 **약 1,280달러**로 반올림했다. 발견 비용이나 유지관리자가 패치를 승인한 건당 비용으로 환산하지 않는다.
- 환산 기준은 11/5에 열어 본 [Investing.com 일별표](https://kr.investing.com/currencies/usd-krw-historical-data)의 **2026-11-04 종가 1달러 = 1,341.15원**. 1,213,430 × 1,341.15 = 1,627,391,644.5원, 약 16억 3천만 원. 실제 원화 지출이 아니다.
- 과거 포상금에 대입한 가상 평가액은 실수령액과 혼동될 수 있어 제외했다. 연구 결과를 재측정하거나 취약점 코드를 재현하지 않았다.

## 실험 편집

11/2의 장애 조사 재개, 11/3의 견적 변경 후 승인, 11/4의 Open WebUI 파일·터미널 연결 실험과 대조했다. 원고의 ‘같은 12개 개발 과제를 사람이 검토하는 방식과 별도 검증기로 확인하는 방식 비교’는 살리고, 반복된 쿠폰 계산 대신 **배송 메모의 감사 로그와 검사 결과가 묶인 커밋**을 소재로 잡았다. 입력 원본 보존, 정상·거절 경로 모두 한 줄 기록을 정답으로 고정한다.

정상 4개, 오류 경로 누락 4개, 오래된 통과 기록 4개(재검사 정상 2·실패 2). 두 방식은 같은 첫 수정본·검사·정답·재시도 상한을 쓴다. 검토 순서의 학습 영향을 줄이도록 두 사람이 작업 절반씩 방식을 바꿔 맡는다. B의 검증기는 저장소를 수정하지 않고 판정·근거를 출력한다. 보류를 분모에서 숨기지 않도록 판정·오류 수와 사람의 총 검토 시간을 함께 비교한다. 본문의 도식은 가상 상태를 읽는 예시이며 구현·실행·측정 결과가 없다.

## 시각 자료

원본 선택, 화면 발췌, 링크와 확인 범위는 [미디어 기록](../assets/news/pierre-code-review-media.md)에 모았다.
