# AI-Ready 시스템 기사 미디어 기록

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-systems-thumbnail.png` |
| 크기·형식 | 1672 × 941, PNG |
| 제작·확인일 | 헬로우 휴먼 편집 작업에서 내장 `image_gen`으로 생성, 2026-10-24 |
| 사용 위치 | 기사 상단, 뉴스 목록·홈의 최신 일반뉴스 카드, Open Graph·Twitter 대표 이미지 |
| 표현한 내용 | 오래된 서버의 문서·코드·테스트를 연결하고, 실행할 수 있는 범위를 투명한 보호 공간으로 표현 |
| 자료 성격 | 설명용 AI 생성 일러스트. 실제 제품 화면·공급사 데모·보안 구조·성능 증거가 아님 |
| 원본·가공 | 내장 도구의 생성 원본을 그대로 복사. 리사이즈·자르기·색상 변경 없음 |
| 이용 조건 | 외부 회사의 이미지를 재사용하지 않은 생성물. 독점성이나 별도 제3자 라이선스를 주장하지 않음 |
| 대체 텍스트 | 오래된 서버에서 문서·코드·테스트 카드로 이어진 주황색 리본과, 같은 자산을 담은 투명한 보호 공간 |

NTT의 공식 발표와 각사의 공개 연구·제품 설명을 우선 검토했다. 네 주제를 함께 표현하기 위해 설명용 이미지를 제작했다. 실제 수치와 시점은 본문 HTML 그래프·타임라인에 별도로 표시했다.

## 생성 프롬프트

도구: 내장 `image_gen`, 배경 불투명, 새 이미지 생성. 참고 이미지 없음.

> Use case: stylized-concept. Asset type: wide 16:9 editorial thumbnail for a Korean AI news article about understanding legacy software through linked documentation, source code and tests, and keeping AI actions inside controlled boundaries. Create a refined tactile paper-cut and clay editorial illustration on warm ivory paper: a small weathered server cabinet at left, a paper specification sheet, a dark code window with only abstract short strokes, and a test checklist connected by a continuous terracotta ribbon; at right the connected system rests inside a clear protective glass enclosure with one controlled gateway. Warm terracotta, charcoal, sage green, cream palette, soft natural light, subtle paper grain, generous negative space, mature magazine art direction, compelling at small card size. No words, no letters, no numbers, no brand logos, no humanoid robots, no cybersecurity hacker imagery, no fabricated product UI, no watermark. This is an explanatory illustration, not an actual product screenshot.

생성 결과에서 서버·문서·코드·체크리스트·보호 공간을 확인했다. 로고나 읽을 수 있는 제품 문구가 없으며, 상단 캡션에 생성물임을 표시한다.

## 2026-10-24 공식 시각 자료 추가

사용자의 후속 요청에 따라 각 소식 원문의 공식 그림을 확인해 본문에 5개를 추가했다. 아래 자료는 모두 실제 이미지를 열어 내용을 확인했다. 공식 파일 4개는 내려받은 바이트 그대로 보관하고, TanStack의 인라인 흐름도 1개는 도식 전체 영역을 직접 캡처했다. 그림 안의 문구·색·축·수치를 수정하지 않았으며, 한국어 해설은 이미지 밖에 둔다. HTML에서는 원래 비율을 유지해 축소 표시하고 큰 원본 링크를 제공한다.

공식 페이지에서 공개한 자료라는 점만으로 자유 이용 허락을 주장하지 않는다. 개별 이미지에 적용되는 재배포 라이선스는 확인하지 못했다. 기사에서 해당 발표·연구를 설명하는 용도로 제공자와 출처를 명시했으며, 이 작업에서 원격 게시·배포는 하지 않았다.

### NTT 추적성 분석도

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-ntt-traceability.jpg` |
| 크기·형식 | 1000 × 483, JPEG |
| 제공자·확인일 | NTT, 2026-10-24 |
| 공식 소개 | https://www.group.ntt/en/newsrelease/2026/10/23/261023a.html |
| 공식 파일 | https://www.group.ntt/en/newsrelease/2026/10/23/img/261023ac.jpg |
| 사용 위치·내용 | NTT 본문. 원문 Figure 3, 문서·코드·테스트를 기능 단위로 연결하고 불일치·누락을 보완하는 기술 설명도 |
| 상태·가공 | 공급사 개념 설명도이며 실제 제품 화면·평가 결과가 아님. 원본 파일 그대로 |
| 이용 조건 | 개별 재배포 라이선스 미확인. NTT와 공식 원문을 캡션에 표시 |

### TanStack 하네스 흐름도

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-tanstack-harness.jpg` |
| 크기·형식 | 828 × 568, JPEG |
| 제공자·확인일 | TanStack, 2026-10-24 |
| 공식 소개·원본 위치 | https://tanstack.com/blog/tanstack-ai-1-0#one-harness-many-places |
| 사용 위치·내용 | TanStack 본문. defineHarness()에서 터미널·자동화·웹 앱·편집기·MCP 클라이언트로 이어지는 원문의 Mermaid 흐름도 |
| 상태·가공 | Chrome에서 원문에 렌더링된 인라인 SVG 도식 전체 영역을 직접 캡처. 별도의 원본 이미지 URL 없음. 원문 다크 모드 색상 그대로, 도식 내부 잘림·재작성·번역·추가 주석 없음 |
| 버전·해석 | AI 1.0 발표 안의 실험적 하네스 0.x 기능. 연결 관계 설명이며 성능·격리·장애 복구 보장을 뜻하지 않음 |
| 이용 조건 | 개별 그림 재배포 라이선스 미확인. 소프트웨어 라이선스를 그림의 허락으로 추정하지 않음. TanStack 원문과 캡처임을 표시 |

### OpenAI 논리적 샌드박스 설명도

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-openai-sandbox.webp` |
| 크기·형식 | 3840 × 1978, WebP |
| 제공자·확인일 | OpenAI, 2026-10-24 |
| 공식 소개 | https://openai.com/index/securing-our-frontier-model-training-environment/ |
| 공식 파일 | https://images.ctfassets.net/kftzwdyauwt9/37XEjb1cjzKzPBG9970uRD/beaf4ede49321fe288c09b9771e5da3a/securing-our-frontier-model-training-environment-diagram-desktop-light.png?w=3840&q=90&fm=webp |
| 사용 위치·내용 | OpenAI 본문. 오프라인 검색·웹 캐시·허용된 팀 게시판과 실제 인터넷·다른 샌드박스·인프라로의 접근 경계 |
| 상태·가공 | 공급사 개념 설명도. 원문 img에 지정된 공식 CDN 파일 그대로. 전체 내부 설계도나 고객 ChatGPT/API의 기능 제한을 뜻하지 않음 |
| 이용 조건 | 개별 재배포 라이선스 미확인. OpenAI와 공식 원문을 캡션에 표시 |

### AISI 진술·행동 비교 그래프

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-aisi-statements-actions.png` |
| 크기·형식 | 7092 × 3989, PNG |
| 제공자·확인일 | 영국 AI Security Institute(AISI), 2026-10-24 |
| 공식 소개 | https://www.aisi.gov.uk/blog/investigating-alignment-failures-in-aisis-incident |
| 공식 파일 | https://cdn.prod.website-files.com/663bd486c5e4c81588db7a48/6ada1db473378d6746a497d4_clarifications_mythos.png |
| 사용 위치·내용 | AISI 본문, 원문 Figure 1. 현실의 대상·피해를 명확히 하는 요약 수정 횟수별 진술·공격 지속 비율 |
| 상태·가공 | AISI의 연구 결과, 원본 그대로. 질문과 작업 지속은 별도 실행. 동시의 진술·행동으로 표현하지 않음 |
| 이용 조건 | 원문에 그림 공유 안내가 있으나 재배포 라이선스 전체를 확인한 것은 아님. AISI와 공식 원문을 캡션에 표시 |

### Anthropic 공격 지속 비율 그래프

| 항목 | 내용 |
| --- | --- |
| 파일 | `assets/news/ai-ready-anthropic-attack-continuation.png` |
| 크기·형식 | 2000 × 890, PNG |
| 제공자·확인일 | Anthropic, 2026-10-24 |
| 공식 소개 | https://www.anthropic.com/research/alignment-assessment-ukaisi |
| 공식 파일 | https://www-cdn.anthropic.com/images/4zrzovbb/website/f4006a45dcc5bdab6c4ce89db18458285e09b5a2-2000x890.png |
| 사용 위치·내용 | AISI/Anthropic 본문. 문맥 압축 주기 시작점에서 다시 생성한 행동의 공격 시작·지속 비율 |
| 상태·가공 | 공급사 재실험 결과, 원본 그대로. 주기 3은 시작 83%, 4~9는 지속 96~100%. 4~9 시작점의 지속 약 98%와 중단 2%를 연결하되, 주기 중간 임의 지점의 별도 실험과 구분 |
| 이용 조건 | 개별 재배포 라이선스 미확인. Anthropic과 공식 원문을 캡션에 표시 |

## 2026-10-24 레거시 코드 전환과 산출물 예시

- 위치: 기사 `#experiment`의 전환 전후 비교 `#legacy-ready-heading`, 기능 설명서 발췌 `#cancel-document-heading`, 규칙 연결표. 별도 이미지 파일 없음.
- 제작: 헬로우 휴먼. 최초의 세 단계 흐름도를 후속 요청에 맞춰 소스만 있는 상태와 설명·근거·검증 상태가 연결된 상태의 비교로 바꿨다.
- 자료 성격: 실제 공개 소스를 읽어 작성한 자체 설명·연결 자료. NTT의 공식 그림이나 OFBiz의 제품 화면이 아니다. AI 응답을 실행해 얻은 성능 비교를 제시하지 않았다.
- 기능 설명서와 연결표는 `assets/news/ofbiz-ai-ready/`의 Markdown 두 파일로 제공한다. 고정 커밋 소스 링크, 네 규칙과 테스트 초안, 미확인 사항이 포함돼 있다. 실행 검증·업무 담당자 확인은 대기로 표시한다.
- 전용 CSS v3에서 문서 발췌와 비교 카드의 배치를 추가했다. 모바일에서는 전후 비교를 세로로 배치하고 긴 파일명·식별자를 줄바꿈한다.

### 같은 질문에 대한 실제 에이전트 답변 비교

- 위치: 기사 `#ai-answer-comparison` 아래 질문과 두 답변 카드. HTML/CSS로 작성했고 전용 CSS를 v4로 갱신했다.
- 처음 작성한 구성 예시는 실제 독립 에이전트 응답으로 교체했다. 두 실행은 같은 상위 모델·추론 설정을 상속하며, 같은 질문·지시문·소스 발췌를 받았다. 한쪽에만 기능 설명서와 연결표를 추가했다. 조건별 1회 실행했다.
- 카드에는 실제 응답에서 고른 문장을 그대로 싣고, 전체 응답·조건·관찰·한계는 `assets/news/ofbiz-ai-ready/agent-answer-comparison.md`로 제공한다. 코드 글꼴과 문단 배치만 기사 형식에 맞췄다.
- 두 답변 모두 핵심 알림 연결 위치를 찾았다. 산출물을 받은 답변은 규칙·테스트 ID와 미실행 상태를 재사용했다. 정확도·탐색 시간·비용 향상을 입증하는 자료로 제시하지 않는다.
- 관련 소스를 미리 선정했고, 추가한 문서에 유사 질문의 사용 예시가 포함돼 있다. 소규모 관찰, 입력 길이 차이, 정확한 API 모델 식별자·샘플링 값 미노출, 실제 애플리케이션·테스트 미실행이라는 한계를 본문과 기록에 남겼다.
- 본문 제목은 독자의 Claude Code·Codex 사용 맥락에 맞춰 ‘에이전트가 읽을 기능 설명서’로 수정했다. 기존 기능 설명서·연결표의 내용과 CSS v4는 유지했다.

### 새 질문 3개와 조건별 3회 반복 비교

- 현재 본문의 `#ai-answer-comparison`은 위 최초 두 응답 카드를 새 질문 3개·총 18개 응답의 집계 표로 교체한 상태다. 첫 비교의 응답 전문과 조건은 기존 다운로드 파일에 그대로 보존했다.
- 기존 두 문서에 구체적 답이 없는 입력 우선순위, 증정품 이력·메모 오류, 부분 출고 후 잔량 취소를 질문했다. 같은 소스·상위 모델 설정에서 소스만/문서 추가를 각각 세 번 독립 실행했다.
- 자체 집계 표는 질문별 세 핵심 사항을 모두 명시한 응답 수를 표시한다. 세 질문 모두 양 조건 3/3이다. 전체 정확도·성능 동등성·시간 절감의 증거로 제시하지 않는다.
- 추가 관찰은 문서 추가 응답 중 미실행 초안 언급 3/9, 그중 테스트 ID 명시 2/9다. 좋은 응답을 골라 만든 전후 예시 대신 모든 응답과 판독 근거를 `agent-answer-repeat-comparison.md`에 제공한다.
- 근거: `research/experiments/2026-10-24-ofbiz-ai-ready-repeat/`의 사전 계획·문항·입력·응답·판독·집계. 질문 선정과 판독이 같은 편집 에이전트에 의한 것임을 본문에 표시했다.
- 표는 HTML/CSS이며 기사 전용 CSS v5로 첫 열의 설명과 두 수치 열을 배치했다. 공식 그림·원본 이미지·기존 두 산출물은 수정하지 않았다.

### 최종 압축 편집

- 본문은 전후 비교 카드, 기능 설명서의 처리 흐름과 CANCEL-03 연결 예, 3문항 결과 표만 남겼다. 네 규칙 전체·질문 세부 조건·응답 전문·판독 근거는 기존 다운로드 문서에 보존한다.
- 표의 3/3 수치와 판독 범위는 그대로다. 새로운 실행·측정·그림 제작은 없으며 CSS v5를 유지했다.

### 최종 게재 범위: 코드 정리 사례

- 사용자 요청으로 모델 응답 비교 카드·집계 표·관련 설명과 다운로드 링크는 본문에서 모두 제외했다. 위 비교 자료 기록은 작업 이력이다.
- 현재 OFBiz 절의 시각 자료는 정리 전후의 자료 구성 카드와 기능 설명서·근거 연결의 짧은 발췌다. 두 산출물의 다운로드와 소스 확인·실행 검증 대기 상태를 유지한다.

### 두 산출물의 본문 발췌 분리

- 기능 설명서는 목적·처리 흐름을 담은 카드로, 근거 연결표는 CANCEL-03 → S3 소스 → T03 테스트 초안의 한 행 표로 나눠 표시했다. 각각 전체 Markdown 다운로드를 연결한다.
- 기존 산출물에서 발췌·요약한 HTML/CSS 자료이며, 테스트 초안의 미실행 상태를 표시했다. 성능 비교는 포함하지 않았고 CSS v5와 원본 산출물은 유지했다.
