# Gemini Decision 1 기사 미디어

- 기사 `news/2026-11-12-gemini-decision.html`, 일반뉴스45
- 확인일 2026-11-12. 원문별 공개일은 기사 출처 목록에 표기한다.
- 원본 이미지 4개를 다운로드하여 픽셀 내용을 직접 확인했다. 다운로드한 파일은 리사이즈·문구 변경 없이 사용한다.

| 파일·위치 | 제공자·원문·원본 | 성격·채택 이유 |
| --- | --- | --- |
| `decision-options.webp`, 1200×491 | Google, [발표](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/), [원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/decisions-architecture_f0NFXU9.width-1200.format-webp.webp) | 공급사 구조도. 공유 입력과 독립 질문이 서로 다른 유형의 응답으로 나오는 과정. 모바일에서 세부 영문이 작으므로 본문 한국어 표와 원본 확대 링크 제공 |
| `decision-spill.webp`, 1200×676 | Google, 위 발표, [원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/decisions-hero-hud_l8rnHOK.width-1200.format-webp.webp) | 공급사 선정 설명 화면. 액체 유무0.95·닦는 행동98%·심각도1.19/2를 직접 대조. 실제 실험이나 정답률 그래프로 사용하지 않음. 공유 메타 이미지에도 사용 |
| Tabletop iframe | Google Labs, [소개](https://blog.google/innovation-and-ai/models-and-research/google-labs/tabletop/), [영상](https://www.youtube.com/watch?v=8upa4JZir3I) | 제목 Meet Tabletop: Plan, Play & Build Together / 채널 Google Labs / 길이1분7초 확인. 공식 소개에 연결된 영상. YouTube nocookie 플레이어, 자동·반복 재생 해제, 공식 원문 링크 제공 |
| `decision-tabletop.webp`, 1000×562 | Google Labs, 위 소개, [원본](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Labs_Tabletop.width-1000.format-webp.webp) | 대진표·지도·산책 담당 추첨의 공식 소개 이미지. 인쇄와 JS 없는 환경의 대체 이미지 |
| CloudSEK 연표 | [조사 원문](https://www.cloudsek.com/blog/off-the-rails-inside-an-exposed-silent-lynx-server) | 공개 보고서의4~10월 기록과11월11일 공개를 분리한 자체 HTML 설명도 |
| CloudSEK 에이전트 작업 구조·설정 표 | [공식 본문 The operator and the AI agent](https://www.cloudsek.com/blog/off-the-rails-inside-an-exposed-silent-lynx-server#the-operator-and-the-ai-agent) | 공격자 지시 → Hermes 작업 관리 → 서버 도구 실행을 한국어로 재구성한 자체 HTML 설명도. 일부 명령 사전 허용과 반복 실패 중단 제한 해제를 별도 표로 설명. 공식 이미지나 직접 조사 결과로 표시하지 않음 |
| 인증 평가 절차 | [영문 안내](https://cloud.google.com/learn/certification/agentic-architect) | 객관식 합격 후 실습으로 이어지는 자체 HTML 설명도 |
| `agentic-architect-official.png`, 2437×1201 | Google Cloud, [공식 발표](https://cloud.google.com/blog/topics/training-certifications/google-cloud-agentic-architect-certification-dont-just-prompt-ai-design-it), [원본](https://storage.googleapis.com/gweb-cloudblog-publish/images/PAA_blog_header_approved.max-2500x2500.png) | Professional Agentic Architect 인증명과 원형 배지가 있는 공식 소개 이미지. 인증 소식 첫 문단 뒤에 배치. 원본 비율·문구 보존, 원본 확대 링크 제공. 시험·실습 화면이나 취득 실적으로 쓰지 않음 |
| 분류 실험 흐름·상황표 | 기사 OUR LAB | 헬로우 휴먼의 미실행 제안. 미리 만든 입력·점수와 기대 결과. 모델 평가·운영 측정 아님 |

## 소식별 검토·제외

- Gemini: 공식 구조도와 판단 예시 채택. 공급사 벤치마크 도표도 찾았지만 이번 글은 판단 인터페이스와 조건이 중심이므로 추가하지 않았다. Stitch의 rapid canvas 영상은 별도 제품 흐름이므로 제외.
- CloudSEK: 원문의 서버 디렉터리·설정·대화·피해 문서 캡처를 검토했다. 후속 요청에 따라 공식 페이지에서 에이전트 persona 캡처(1561×670)를 직접 확인했다. 공격적 보안 전문가 역할과 응답 방식 지침이며 비밀번호·피해 문서·실행 명령은 보이지 않았다. 공식 CDN에서 이 이미지를 다운로드하는 동작은 브라우저 사이트 보안 정책이 차단했다. 차단 후 다른 경로로 이미지 복사를 시도하지 않았고, 조사 본문과 설정 표를 한국어 HTML 도식으로 재구성했다. 원본 이미지 파일은 추가하지 않았다.
- 인증: 공식 발표의 배지 헤더·홍보 영상 썸네일을 확인했다. 최초 작성에는 평가 절차 도식만 사용했으며, 공식 시각 자료 추가 요청을 받아 인증명과 배지가 담긴 헤더 이미지를 추가했다. 기존 도식은 객관식 합격 뒤 실습으로 이어지는 절차를 설명하므로 함께 유지한다. 홍보 영상 썸네일은 중복해 넣지 않았다.
- Tabletop: 공식 소개 이미지와 내장 영상을 확인했다. 소개 페이지의 시연을 직접 재생했고 게시 주체·길이를 확인했다. 제품에 로그인하거나 실제 협업 기능을 실행한 검증은 아니다.

## 이용 조건·확인 범위

이미지는 공개 발표에 실린 원본으로 제공자와 원문 링크를 표기한다. 별도의 재배포 라이선스·개별 허락은 확인하지 못했다. 출처 표기가 포괄적인 이용 허락을 뜻하지 않으며, 원문 이미지의 제품 성능을 독립 검증한 것도 아니다. 영상은 다운로드하지 않고 공식 플레이어로 임베드한다.

## 로컬 브라우저 검증

- Gemini 이미지2개는 기사에서 로드됐고 원래1200×491·1200×676 크기를 유지했다. 가로로 넓은 구조도에는 원본 확대 링크와 한국어 설명표를 붙였다.
- Tabletop은 기사에서 처음에 재생 버튼을 보였다. 재생 후0초에서17초 이상으로 진행하고 팀 명단·대진표 장면을 확인했다. 일시 정지 상태를 확인한 뒤 키보드k로 재개했다. 전체 영상의 모든 주장·장면을 검증한 것은 아니다.
- 재생 중 플레이어의 실제 길이는66.581초였고 표시 길이는1:07이었다. 캡션은 공식 표시 길이를 사용한다.
- 390×844 모바일에서 영상 약343×193, 가로 넘침 없음. 다크 모드에서도 캡션과 원문 링크가 읽혔다.
- 인쇄 대체 이미지는 파일 원본을 직접 열어 확인했다. 브라우저 인쇄·JavaScript 비활성화 모드의 시각 검증은 별도 수행하지 않았다.

## CloudSEK 시각 자료 보완 · 2026-11-12

- 검토한 persona 원본은 [CloudSEK 공개 캡처](https://cdn.prod.website-files.com/635e632477408d12d1811a64/6af2ded0f6d8f3a2b622a590_d831e7c3.png)다. 공식 페이지에서 로딩과 픽셀 내용을 확인했지만 저장·재배포하지 않았다.
- 추가한 도식은 세 단계 작업 구조와 두 실행 설정을 보여준다. 기술적 침입 절차, 실제 피해 문서나 계정 식별값은 포함하지 않는다. 본문의 공격자 지시·실행 환경 설명 뒤에 배치하고 공식 본문 링크를 붙였다.
- 로컬 기사에서 데스크톱의 가로 세 단계 배치와 모바일의 세로 배치, 표·캡션 가독성, 가로 넘침 없음을 확인했다. 임시 모바일 화면 크기는 확인 뒤 해제했다.

## Google Cloud 인증 시각 자료 보완 · 2026-11-12

- 공식 발표 페이지의 헤더 이미지를 브라우저에서 직접 확인한 뒤 원본 PNG를 저장했다. 2437×1201, 364,925바이트이며 원본을 별도로 열어 인증명·배지·문구를 대조했다. 자르기·재작성·포맷 변환은 하지 않았다.
- 브라우저 다운로드 기능은 시간 초과로 완료 여부를 확인하지 못했다. 공식 Google Storage URL에서 직접 저장한 파일을 기사에 사용한다.
- 실제 브라우저의 영문 발표 페이지에는 November 12, 2026이 표시됐고 웹 텍스트 추출은 November 11, 2026을 반환했다. 차이의 원인은 확인하지 못했으며, 기사 출처 목록은 직접 확인한 현재 브라우저 표시를 따랐다.
- 로컬 기사에서 새 이미지의 실제 로딩·고유 크기 2437×1201을 확인했다. 데스크톱과 모바일에서 원본 비율, 캡션, 기존 평가 절차 도식과의 배치, 가로 넘침 없음을 확인했고 임시 화면 크기를 해제했다.
