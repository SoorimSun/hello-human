# AI뉴스 14 · 공식 이미지와 데모

- 기사: `news/2026-10-12-decart-ai-operations.html`
- 확인일: 2026-10-12
- 공식 공개 자료를 기사 설명과 제품 식별에 사용했다. 이미지 내용을 편집하거나 자르지 않았고, 큰 이미지 링크와 출처 캡션을 제공한다.
- 이미지의 별도 재배포 라이선스는 확인하지 못했다. 저작권·상표권은 각 제공자에게 있으며, 출처 표기가 자유 이용 허락을 의미하지 않는다. 영상은 공식 YouTube 임베드를 이용하며 영상 파일을 복제하지 않았다.

| 파일·영상 | 제공자·버전 | 배치·자료 성격 | 크기·처리 |
| --- | --- | --- | --- |
| `decart-lucy-2-5-official.png` | Decart, Lucy 2.5, 2026-07-16 발표 | 기사 대표 이미지 및 OG·Twitter 공유 썸네일. 공식 발표 표지 | PNG 1200×717. 원본 파일 저장, 편집 없음 |
| YouTube `sJehaIvhoaM` | Decart, Lucy / Pink dress | Lucy 설명 직후. 공급사 선정 의상 편집 시연 | 공식 플레이어, 4:3, 자동 재생 없음, 직접 재생 링크 병기 |
| YouTube `peU53BuI1Do` | Decart, Oasis 3, 2026-06-10 발표 | Oasis 설명 직후. 주행 환경 생성 시연 | 공식 플레이어, 16:9, 자동 재생 없음, 직접 재생 링크 병기 |
| 벤치마크 막대그래프 | Artificial Analysis, Intelligence Index v4.3.2 | 오픈웨이트 소식. 2026-10-12 공개 점수 네 개를 HTML/CSS로 재구성 | GLM-5.3 max 45, Kimi K3 max 44, Qwen3.8 2.4T A95B 40, DeepSeek V4.1 Flash max 39 |
| `kimi-official-logo.png` | Moonshot, Kimi | Moonshot 소식. 공식 모델 저장소의 제품 브랜드 이미지. 분쟁을 묘사하지 않음 | PNG 1097×400. 원본 저장, 편집 없음. 흰 로고가 보이도록 주변 배경을 어둡게 설정 |

## 원본 출처

- Lucy: [공식 발표](https://decart.ai/publications/lucy-2-5-raising-the-bar-for-live-ai), [표지 파일](https://cdn.prod.website-files.com/69ac78b058a3b8e6de5d1387/6a58fb11f836e7ee4c341c45_Blog%20Header.png), [Pink dress 영상](https://www.youtube.com/watch?v=sJehaIvhoaM)
- Oasis: [공식 발표](https://decart.ai/publications/introducing-oasis-3-first-interactive-world-model-for-physical-ai), [Oasis 3 영상](https://www.youtube.com/watch?v=peU53BuI1Do)
- 벤치마크: [평가 결과 원문](https://artificialanalysis.ai/leaderboards/models), [평가 구성·방법](https://artificialanalysis.ai/methodology/intelligence-benchmarking). 10월 12일 확인. 원본 차트 이미지를 복제하지 않고 수치와 모델·설정을 표시했다. 이전 Kimi K3 공식 표지는 사용자 의견에 따라 기사에서 제외했다.
- Kimi 브랜드: [공식 모델 페이지](https://huggingface.co/moonshotai/Kimi-K3), [로고 파일](https://huggingface.co/moonshotai/Kimi-K3/resolve/main/assets/kimi-logo.png)

## 배치와 접근성

### 상품 정보 보존 비교 · 2026-10-12

- 사용자가 선택한 네 단계 검수 도식을 원본과 세 가지 편집 결과를 비교하는 시각화로 교체했다.
- 기사 안에 직접 작성한 SVG 4개는 헬로우 휴먼의 설명용 그림이다. 초록색 텀블러, 가상 브랜드 DEMO, 500 mL를 기준으로 배경 변경·상품 색 변경·로고와 용량 오류를 구분한다. 실제 제품 화면, Lucy의 실제 출력, 관측한 오류율·성능 자료가 아니다.
- 실제 기업 로고나 제품 이미지를 수정하지 않았다. 기존 공식 미디어는 유지한다.
- 표준 라디오 입력과 CSS `:has()`로 결과와 검수 조치를 전환한다. 별도 JavaScript 없이 키보드·포인터로 선택할 수 있다. 각 SVG에는 내용을 설명하는 접근성 이름을 제공한다.
- 원본 상품의 색·표기 유지 여부, 추가로 시험할 움직임, 오류 시 재제작 방향과 검수 기록 항목을 안내한다. ‘일치’를 방송 사용 승인으로 표현하지 않는다.
- 인쇄와 `:has()` 미지원 환경에는 모든 예시와 설명이 남도록 구성했다.

- 이미지에 내용 중심 대체 텍스트와 실제 크기를 지정하고 원본 비율을 유지한다.
- 영상에 개별 제목과 반응형 비율을 지정했다. 지연 로딩하며 자동 재생 권한을 부여하지 않는다.
- 각 영상 캡션에 공식 재생 페이지 링크를 제공한다. 인쇄할 때는 플레이어 대신 캡션과 링크가 남는다.
- 공급사 데모와 설명용 HTML 도식을 구분한다. 제품 성능이나 실제 도입 효과를 독립 검증한 자료로 표현하지 않는다.
- 로컬 미리보기에서 최종 이미지 2장의 로딩과 두 영상의 실제 재생·완료 상태를 확인했다. 데스크톱·모바일과 라이트·다크 모드에서 가로 넘침 없이 표시된다. 인쇄 화면은 별도로 검증하지 않았다.

### 벤치마크와 배포 경로 · 2026-10-12

- 벤치마크는 같은 지수와 같은 확인일의 점수만 비교한다. 크기·추론 설정·비용·시간이 같은 조건은 아니다. 전체 순위, DoorDash의 실제 도입 버전, 한국어 상담 품질로 표현하지 않는다. 정수 원자료와 이용 조건 링크는 조사 노트에 기록했다.
- 데이터 경로의 아이콘과 화살표는 직접 작성한 HTML/CSS·SVG이며 특정 기업의 시스템을 묘사하지 않는다. 가상 문의·질문/답변 방향·관리 주체·모델 설치 방향을 함께 표시한다.

- 후속 검증: 기존 테스트 7개 통과. 모델별 공개 점수와 막대 길이, 고유 ID·접근성 이름·로컬 링크·새 탭 속성을 확인했다. Decart·Moonshot 본문은 수정 전과 동일하다.
- 데스크톱과 좁은 모바일에서 그래프와 두 실행 경로에 가로 넘침이 없었으며, 라이트·다크 모드와 키보드로 출처 설명을 펼치는 동작을 확인했다. 이전 Kimi 표지의 참조가 없어져 해당 신규 자산은 제거했다.
