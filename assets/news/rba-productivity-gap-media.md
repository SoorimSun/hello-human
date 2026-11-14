# RBA 생산성 기사 미디어 기록

확인일: 2026-11-09, 한국시간. 대상 기사 `news/2026-11-09-rba-productivity-gap.html`.

## RBA · 공식 그래프

- 로컬 파일: `rba-productivity-gains.svg`.
- 원문: https://www.rba.gov.au/speeches/2026/sp-ag-2026-11-09.html
- 원본: https://www.rba.gov.au/speeches/2026/images/sp-ag-2026-11-09-graph02.svg
- 제공자·공개일: Reserve Bank of Australia, 2026-11-09 연설의 Graph 2.
- 통계 기준: 2026년 6~10월 AI liaison 질문 응답. 그림의 Source는 RBA 단독 표기다.
- 용도: 기업이 응답한 생산성 변화 분포. 공식 원본이며, 번역·도형 변경·잘라내기를 하지 않았다. 원본 viewBox 617.22 × 606.06을 보존했다.
- 이용 조건: https://www.rba.gov.au/copyright/ 의 §3 출처 표시, §5 Financial Data terms and conditions를 확인했다. 출처를 밝히고 RBA가 이 기사를 보증한다는 인상을 주지 않는다. 모든 RBA 이미지가 CC BY라고 일괄 처리하지 않았다.
- 기사 캡션에 `Source: Reserve Bank of Australia 2026`과 원본 유지 여부를 표시했다. 원본으로 가는 링크를 제공한다.
- 원문 페이지·SVG의 렌더링, 그림의 하단 조사 기간, 접근성 설명을 확인했다. alt의 ‘약 11%’와 막대의 약 12% 차이는 조사 노트에 남기고 본문에는 ‘10%대 초반’을 썼다.
- 원문에는 연설 영상 링크도 있다. 기사 핵심인 분포를 직접 보여주는 Graph 2를 채택했으며 중복되는 연설 영상은 임베드하지 않았다. 영상을 재생하거나 전체 내용을 검증하지 않았다.

## llama.cpp · 공식 코드 발췌와 자체 설명도

- 위치: `#llamacpp` 코드 비교.
- 원문: https://github.com/ggml-org/llama.cpp/pull/31861
- 코드: https://github.com/ggml-org/llama.cpp/commit/372dc5ca157276beb6c67b2e92477e8d662e964a
- 제공자·공개일: ggml-org/llama.cpp, 2026-11-08 병합·b12199 공개.
- 최초 확인 범위: 릴리스 본문, PR 본문과 메타데이터, 병합 파일 diff. 확인한 본문에 이번 수정의 제품 화면·영상 첨부는 없었다. 후속 확인에서 공식 기술 문서까지 범위를 넓혔다.
- 용도·가공: 공식 코드의 두 대입문을 수정 전후로 발췌하고 줄바꿈했다. 변경의 의미를 설명하는 한국어 라벨을 더했다. 직접 재현 화면이나 테스트 결과 캡처가 아니다.
- 코드 발췌는 읽을 수 있는 HTML 텍스트로 제공한다. 이 기사에서 전체 원본 파일이나 라이브러리를 배포하지 않는다.
- 추가 공식 자료: https://github.com/ggml-org/llama.cpp/blob/b12199/docs/autoparser.md#analysis-flow 의 ASCII `Analysis Flow`. 템플릿 분석 → PEG 파서 생성의 전체 구조이며 이번 UTF-8 패치의 실행 결과 도식은 아니다.
- 추가 설명도: `#llamacpp`의 ‘같은 비정상 입력, 달라진 문자 처리’. 공식 문서·패치에 근거해 잘못된 바이트의 수정 전후 처리와 별도 업무 검증을 HTML/CSS로 재구성했다. 공식 원본 이미지·공식 성능 그래프·실측 결과로 표시하지 않는다.
- 문서와 b12199 소스의 `current_tool->id` 대입을 대조해 호출 ID와 함수 이름을 구분했다. 기사와 실험 제안의 비정상 입력 위치도 호출 ID·문서 ID 인자로 바로잡았다.

## Anthropic·OnePWR · 거래 타임라인

- 위치: `#anthropic`의 9월 말 → 11월 8일 → 가동 미확인 타임라인.
- 근거: Reuters 배포본, Piper Sandler 거래 상세. URL은 기사와 조사 노트에 기록했다.
- 확인 범위: Reuters 본문과 이미지 링크, Piper Sandler 공식 거래 페이지와 거래 목록. 공식 거래 상세는 로고를 보여주지만 구체적 설비 배치·가동 화면·설비 사진은 확인하지 못했다. Anthropic 공식 도메인 검색에서도 이 계약의 설치 현황을 뒷받침하는 시각 자료를 확보하지 못했다.
- FT 원문은 접근하지 못했다. 그 원문에 이미지·영상이 없다고 단정하지 않는다. Reuters의 보도용 이미지는 실제 설비를 입증하는 자료로 쓰지 않았다.
- 채택 이유: 보도상 계약 시점과 가동 미확인 상태를 분리한 자체 설명도가 거래의 확인 범위를 전달한다. 아래의 과거 협력 발표 이미지는 사업 배경으로만 덧붙였다.
- 보도된 총량은 설비 용량이며 현재 전력 생산량·상업운전 용량이 아니다. 설명도 자체를 공식 설계도로 표시하지 않는다.

## OnePWR·Caterpillar·Vero3 · 공식 참고 이미지

- 로컬 파일: `onepwr-caterpillar-collaboration.jpg` (JPEG, 1200×900).
- 원문: https://www.cat.com/en_US/news/engine-press-releases/caterpillar-onepwr-solutions-and-vero3-announce-strategic-collaboration.html
- 원본: https://s7d2.scene7.com/is/image/Caterpillar/CM20260227-91102-f41c7
- 제공자·발표 시점: Caterpillar, `For Release: March 2026`. 페이지의 이미지 alt는 `Caterpillar Inc, OnePWR Solutions and Vero3`다.
- 실제 이미지와 공식 게시 맥락을 브라우저로 확인했다. 대형 건물, 탱크, 배관과 주변 부지가 보인다. 원문은 이 그림의 시설명·장소·실사/렌더링 여부를 설명하지 않으므로 추정하지 않았다.
- 용도: OnePWR의 데이터센터 전력 인프라 사업을 설명하는 배경 자료. 이번 Anthropic 계약의 자산·위치·설치 또는 가동 현장을 확인하는 증거로 쓰지 않는다. 3월 자료임과 이번 계약의 현장 사진으로 확인되지 않았음을 본문 캡션에 명시했다.
- 가공: 공개 JPEG를 그대로 저장했다. 다운로드 확장자 `.jfif`를 `.jpg`로 바꾸었으며 재압축·자르기·문자 삽입을 하지 않았다. 다운로드와 로컬 복사본의 SHA-256이 `9C888DBFDE8266DFC6D7B4B4324AD1084C8DBB491D037ACDF6FF870A5B96DEAF`로 일치한다.
- 권리 상태: 공식 보도자료에 공개된 이미지를 출처와 원문 링크를 갖춘 기사 내 참고 인용으로 사용한다. 페이지는 `© 2026 Caterpillar. All Rights Reserved.`를 표시하며 고해상도 요청 연락처를 제공한다. CC/퍼블릭 도메인 이미지 또는 별도 재배포 허가를 받은 자료라고 표시하지 않는다.
- 추가 검색: OnePWR의 공식 도메인은 `onepwrsolutions.com`이다. `/solutions/`는 검색 결과에 모듈형 발전설비 설명이 있으나 실제 브라우저에서 Sucuri 국가 접근 제한으로 열리지 않아 원본 시각 자료를 검증하지 못했다. 접근 제한을 우회하지 않았다. 관련 2월 GlobeNewswire 공식 발표도 확인했으나 확보한 이미지 링크는 로고여서 채택하지 않았다.

## 실험 흐름 · 자체 설명도

- 위치: `#experiment`, 입력 재생기 → 채팅 파서 → 업무 검증기와 세 가지 기대 결과.
- 합성 입력과 모의 API를 사용하는 아직 실행하지 않은 실험 제안이다.
- 상태 분기가 짧으므로 자바스크립트 없이 읽을 수 있는 정적 흐름·결과 목록·기록 표로 구성했다. 실제 모델 호출·시뮬레이터·측정 결과가 아니다.
- 새 영상·자동 재생·추가 자바스크립트는 없다. 1280px·390px·320px 미리보기에서 도식의 읽는 순서·반응형 배치·가로 넘침을 확인했다. 라이트·다크 화면을 확인했으며, 원본 그래프도 실제 기사에서 정상 로드됐다. 이미지·설명도에 겹침이나 잘림은 없었다.
- 후속 추가한 02 도식·03 이미지는 CSS 뷰포트 폭 1163px 데스크톱, 390px·320px 모바일에서 확인했다. 02는 데스크톱 두 열·모바일 한 열로 배치되고, 03 JPEG는 1200×900 원본 비율로 정상 로드됐다. 320px에서 두 소식의 가로 넘침이 없고 라이트·다크 도식이 읽히는 것을 확인했다. 브라우저 콘솔 오류는 없었다.
