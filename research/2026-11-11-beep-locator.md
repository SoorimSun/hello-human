# Beep Locator 사례연구 09 조사 기록

- 발행일·확인일: 2026-11-11 (KST)
- 본문: `case-studies/2026-11-11-beep-locator.html`
- 제목: AI에게 귀를 달아 경고음의 위치를 찾다
- 사용자 제공 원고의 제목과 관찰·검증 중심 논지를 유지했다. 원고의 개인 대화·편집 페이지 주소는 공개 파일에 옮기지 않았다.
- 작업 범위: 로컬 본문·목록·홈·자산·조사 기록. 제품 개발, 운영 변경, 원격 게시 없음.

## 확인한 자료와 버전

| 자료 | 날짜·버전 | 직접 확인한 범위 |
| --- | --- | --- |
| [Simon Willison 제작기](https://simonwillison.net/2026/Nov/9/mysterious-beeps/) | 원문 표기 2026-11-09 | 본문 전체, 실제 브라우저의 원본 화면과 미디어 구성 |
| [공개 저장소](https://github.com/simonw/beep-locator/tree/449a48870969b48cd195ea157a242640a0b393a9) | `449a48870969b48cd195ea157a242640a0b393a9`, 커밋 시각 2026-11-10 04:39 UTC | 현재 main의 커밋 및 파일 트리, Apache 2.0 라이선스 추가 기록 |
| [README](https://github.com/simonw/beep-locator/blob/449a48870969b48cd195ea157a242640a0b393a9/README.md) | 위 커밋의 README blob `79dcfe0a6986dfc23a35680db87dec94f9fa5691` | Python·브라우저 구성, 제어 명령, 모듈 교체, 시뮬레이션과 테스트 안내. 문서 자체에 Claude가 작성했다는 표시가 있음 |
| [problem.md](https://github.com/simonw/beep-locator/blob/449a48870969b48cd195ea157a242640a0b393a9/problem.md) | blob `370c9b6e6989be9da02c6db86081801fab4b576b` | 문제 분해, 시간 간격 기반 거리 측정, 성공 기준, 오차 요인. 초기 설계 문서의 목표와 현재 구현을 구분 |
| [analysis.py](https://github.com/simonw/beep-locator/blob/449a48870969b48cd195ea157a242640a0b393a9/beep_locator/analysis.py) | 위 커밋 | `analyse_calibration`, `layout_from_distances`, `analyse_beep`의 정적 코드 |
| [procedures.py](https://github.com/simonw/beep-locator/blob/449a48870969b48cd195ea157a242640a0b393a9/beep_locator/procedures.py) | 위 커밋 | 기기 선택·기준음 재생·경고음 전후 녹음 수집과 분석 호출 |
| [runtime.js](https://github.com/simonw/beep-locator/blob/449a48870969b48cd195ea157a242640a0b393a9/beep_locator/static/runtime.js) | 위 커밋 | 기반 런타임과 `installModule`의 로드·시작 실패 처리 |
| [BeepBeep 논문](https://www.cs.purdue.edu/homes/chunyi/pubs/sensys106-beepbeep.pdf) | Peng, Shen, Zhang, Li, Tan / SenSys 2007 | 초록과 원리 설명. 1~2cm는 논문의 두 휴대전화 모델 거리 측정 실험의 보고값 |

현재 확인한 커밋을 제작자의 모든 현장 실험에 사용된 동일 버전으로 단정하지 않았다. 원문이 초기 생성물로 연결한 커밋은 `e36ac93a81091a246403c074e34c0041c6972fac`, 모듈 로더 설명에 연결한 커밋은 `44fea65c918fb31a7d2c0e17797ee1a106860e23`다. 본문의 구현 링크는 이번에 읽은 버전으로 통일했다.

## 주장과 근거의 경계

| 본문 내용 | 근거와 사용할 범위 |
| --- | --- |
| 다섯 기기로 약 40cm 범위까지 좁혀 감지기를 찾음 | 제작자의 현장 보고. 실제 오차를 독립 측정하지 않음. 화면의 `within ~41 cm` 표시는 앱이 계산한 추정 표시이며 실측 오차 증명이 아님 |
| 약 0.5m로 탐색 범위를 좁히는 성공 기준 | 초기 문제 정의의 목표. 모든 기기 조합에서 보장된 사양이 아님 |
| 48kHz의 한 샘플은 약 7mm | 문서의 343m/s를 사용하면 343 / 48000 = 0.0071458m. 전체 위치 정확도와 구분 |
| BeepBeep의 약 1~2cm | 2007년 논문에서 보고한 두 기기 사이 거리 측정. Beep Locator의 현대 브라우저·다중 기기 위치 추정 결과와 비교하지 않음 |
| 최근 60초 녹음, 감지 뒤 기준음 | README·런타임 설명과 수집 코드. `_locate`는 경고음 약 0.6초 전부터 기준음 약 0.8초 후까지 수집 |
| 시간축 보정 | `analyse_beep`: `(onset_frame - chirp_frame) / sample_rate + emitter_distance / speed_of_sound`. 공통 기준음의 전파시간을 보정하며, 원시 기기 타임스탬프를 직접 동일시하지 않음 |
| 불가능한 시차의 처리 | `analyse_beep`가 기기 간 거리로 허용되는 시차와 비교. 가능하면 문제 기기 하나를 제외하고, 불일치가 남으면 오류. 좋은 시각을 가진 기기가 3개 미만이어도 위치 반환을 보류 |
| 자동 배치의 한계와 Rough mode·박수·녹음 재생 | 제작자의 설명. 초기 배치가 잘 작동하지 않아 사람의 대략 배치를 추가한 맥락을 유지 |
| 새 모듈 실패 시 기존 버전 유지·복귀 시도 | `installModule`은 import 실패 시 기존 모듈을 건드리지 않고 반환. 시작 실패 시 기존 factory로 복귀 시도. 복귀도 실패할 수 있어 무조건 복구·중단 없음으로 표현하지 않음 |
| AI의 역할 | 코드 작성, 로그 조회, 도구 개선. 음향 위치 계산은 신호 처리 코드가 담당. 모델이 음성을 직접 듣고 판단했다는 표현을 추가하지 않음 |
| 업무 적용과 중복 주문 원인 조사 실험 | 헬로우 휴먼의 가상 제안. 응답 대기 3초·응답 지연 5초는 실험용 설정이며, 관측 흐름은 조건부 예시. 실제 사내 시스템의 구조·동작·성과를 주장하지 않음 |
| 비용 | 제작기에 전체 소요 시간·모델 이용료가 없어 절감률이나 비용 수치를 만들지 않음. 수작업과 준비·실행·검증 시간을 비교할 관점만 유지 |

## 미디어 조사와 채택

- 제작자 원문을 실제 브라우저에서 열어 이미지, 기능 설명, 수정 과정을 확인했다. DOM에 이미지 1개, video·iframe 0개가 있었고 이미지가 로드됐다.
- 공개 저장소의 재귀 파일 트리에서 별도 이미지·시연 영상 파일을 찾지 못했다. 주요 제작 단계는 원문의 텍스트와 코드가 근거다. 시연 영상을 보거나 수정 전후 화면을 확보했다고 하지 않는다.
- 결과·기기 배치·녹음 재생: 제작기 원본 화면 하나가 함께 보여주므로 본문에 전체 화면을 한 번 배치하고 세 부분을 짧게 설명했다. 화면 안의 참여 QR·주소는 제작자가 공개한 참여용 화면이며 관리자 토큰 표시는 없다. 실제 접속 대상으로 사용하지 않았다.
- 거리 측정·시간 보정: 정적 HTML 설명도. 코드의 처리를 읽는 순서대로 정리했으며 실행 결과 화면을 흉내 내지 않았다.
- 관측·분석·사람 확인·수정: 제작 과정의 역할을 정리한 정적 HTML 설명도. 원고의 Mermaid 흐름을 사이트에서 바로 읽을 수 있게 구성했다.
- 중복 주문 원인 조사: 응답 지연·재시도·두 번째 저장을 연결한 가상 관측 도식을 후속 편집에서 추가했다. 제작자 기록이나 실행 결과가 아닌 실험 제안으로 표시했다.
- 상호작용을 추가하지 않았다. 이 글은 측정 순서와 역할 분담을 이해하는 것이 목적이며, 가상 좌표를 조작하는 시뮬레이션은 이번 검증 범위를 넓히지 않는다.

| 항목 | 기록 |
| --- | --- |
| 로컬 파일 | `assets/case-studies/beep-locator-ui.webp` |
| 원본 | https://static.simonwillison.net/static/2026/beep-locator-ui.webp |
| 소개 페이지 | https://simonwillison.net/2026/Nov/9/mysterious-beeps/ |
| 제공자 | Simon Willison |
| 공개일·확인일 | 원문 2026-11-09 / 확인·저장 2026-11-11 |
| 크기·가공 | 1754×1894. 원본 다운로드, 크롭·색 변경·재생성 없음. 본문에서 원래 비율로 표시. 홈·목록 이미지는 후속 요청으로 아래 설명용 썸네일로 교체 |
| 용도·상태 | 제작자가 공개한 실제 앱 화면. 독립 재현 화면이 아님. 본문의 확대 링크와 원문 링크 제공 |
| 이용 조건 | 이미지의 별도 조건 미확인. 코드의 Apache 2.0을 이미지에 자동 적용하지 않음 |

## 사이트 반영과 검증

- 본문·목록·홈의 제목, 09호, 2026-11-11 날짜를 통일하고 목록을 9편으로 갱신했다.
- 기존 공통 스타일·스크립트 버전을 유지하고, 글 전용 CSS만 추가했다. README는 개별 글을 추가하지 않는 현재 운영 지침에 따라 수정하지 않았다.
- 개인 대화·편집 페이지 주소, 추적 파라미터를 공개 결과물에 넣지 않았다.
- 제품 실행, 실제 마이크 수집, 음향 위치 측정, 제품 저장소 테스트는 수행하지 않았다.
- 저장소의 `node --test`: 71개 통과, 실패 0. 공통 스크립트나 상호작용 코드는 변경하지 않았다.
- 본문·목록·홈의 상대 링크와 자산 존재, 목차 앵커·중복 ID·noindex·외부 링크 속성을 검사했다. 목록은 9편이며 새 글 등록은 1개, 홈 링크도 새 글을 가리킨다.
- 실제 브라우저에서 본문 1280px, 390px, 320px 폭과 라이트·다크 화면을 확인했다. 본문·도식의 페이지 가로 넘침이 없었고, 원본 이미지가 1754×1894로 로드되며 표시 비율을 유지했다.
- 320px에서 제목의 줄바꿈이 숨겨질 때 단어가 붙는 부분을 발견해 제목·부제·소제목·카드의 줄바꿈 뒤 띄어쓰기를 보완하고 다시 확인했다.
- 좁은 화면의 표는 내부 가로 스크롤을 유지한다. 320px에서 표 영역의 키보드 오른쪽 이동으로 `scrollLeft`가 40px 바뀌는 것을 확인했다.
- 홈의 데스크톱 카드와 목록의 모바일 화면을 확인했다. 홈 카드의 390px 레이아웃 폭과 페이지 가로 넘침 여부도 DOM으로 확인했다.
- 최종 본문 읽기 → 목록 복귀 → 새로고침에서 해당 글의 New·Updated 배지가 남지 않음을 확인했다. 홈 카드에도 해당 배지가 없었다. 페이지 콘솔의 error·warn 조회 결과는 비어 있었다.
- 로컬 미리보기는 loopback으로만 제공했다. 루트·`/hello-human/` 경로의 본문은 HTTP 200, `.git`·임시 작업 폴더·README 요청은 404임을 확인했다.
- 초안 검증에서 `git diff --check`를 통과했다. 생성한 파일의 공백·공개 범위도 별도로 검사했다. 이 단계에서는 커밋·푸시·배포를 하지 않았다.

## 원인 조사 실험으로 수정

- 기존 상품 이미지 갱신 예시를 중복 주문 증상의 원인을 좁히는 제안으로 교체했다. 06절 적용 설명, 07절 실험·도식·요청문·완료 기준과 목차를 맞췄다.
- 화면 중복, 요청 재전송, 서버 중복 처리를 구분하고 정상·이상 사례의 클릭·전송·수신·저장 기록을 연결한다. 기록 누락을 단일 요청의 증거로 취급하지 않도록 썼다.
- 재시도가 의심될 때만 응답 대기 3초와 저장 후 응답 지연 5초를 실험 조건으로 두고, 지연 여부를 바꿔 비교하는 예시다. 이 흐름이 관측되지 않으면 다른 후보와 재현 조건을 조사한다.
- 재시도를 일으킨 조건과 같은 작업을 중복 저장한 경로를 구분했다. 수정 후 동일 작업의 재전송·동시 재전송과 서로 다른 정상 주문을 확인하는 기준을 제안했다.
- 순수 편집 작업이며 주문 시스템 구현·실제 진단·재현·수정 실험은 수행하지 않았다. 실제 시스템의 결함이나 성과를 주장하지 않는다.
- HTML의 목차·중복 ID·이미지 경로·가상 예시 표시와 `git diff --check`를 확인했다. 브라우저의 1280px·390px·320px 화면에서 가로 넘침이 없고, 모바일 도식이 한 열로 표시되며 표는 내부 가로 스크롤을 유지했다. 라이트·다크 표시도 확인했다. 공통 JS 변경이 없어 기존 테스트는 재실행하지 않았다.

## 커밋 전 전체 검토

- 제작자의 원문과 고정 커밋의 `problem.md`를 다시 읽어 제작 순서, 두 단계의 측정, 목표 범위, 48kHz 계산을 대조했다. GitHub 문서는 웹 조회가 실패해 GitHub 연결 도구로 확인했다.
- 도입부의 주어와 서술어, 시간 간격 비교, 실행 중 모듈 교체, 사람의 확인 역할을 자연스럽게 다듬었다. 브라우저의 녹음·감지와 Python 서버의 녹음 비교·위치 계산을 구분했다.
- 7mm 설명에서 거리를 시간 간격으로 서술하던 문장을 바로잡았다. 수치 자체는 유지하고, 샘플 간격 동안 소리가 이동하는 거리라는 뜻과 계산을 명확히 했다.
- 중복 주문 실험의 관측 항목과 요청문을 다듬고, 재시도 관측에서 서버의 작업 ID 확인·저장 경로 조사로 이어지도록 연결했다. 수정 후 기대 결과라는 시점도 명시했다.
- 홈·목록의 소개 문구를 주체와 행동이 드러나도록 맞췄다. 제목·발행일·09호·URL·이미지는 유지했다.
- 최종 편집 후 `node --test` 71개 통과, 실패 0. 본문·목록·홈의 상대 링크, 목차·중복 ID·noindex, 이미지 파일·크기·표시 위치, 외부 링크 속성, 공개 범위와 공백 검사도 통과했다. 이 검증은 사이트 검사이며, 본문에 제안한 주문 실험을 실행한 결과가 아니다.
- 최종 본문을 1280px·390px·320px와 라이트·다크에서 확인했다. 두 이미지가 원래 크기로 로드되고 페이지 가로 넘침이 없었으며 콘솔의 error·warn 기록도 없었다. 본문에서 목록으로 돌아가 새로고침한 뒤 해당 카드에 New·Updated 배지가 남지 않는 것을 확인했다.

## 썸네일 추가

- 사용자 요청에 따라 2026-11-11에 내장 `image_gen` 도구로 생성했다. CLI/API 대체 경로는 사용하지 않았다.
- 파일: `assets/case-studies/beep-locator-cover.png`, 1672×941. 생성 원본을 그대로 복사했으며 별도 크롭·크기 변경을 하지 않았다.
- 내용: 상자 속 경고음과 휴대전화 1대, 태블릿 2대, 노트북 2대. 글자 없이 작은 카드에서도 읽히는 설명용 일러스트다. 실제 방·기기 배치·앱 화면·측정 결과를 재현한 이미지가 아니다.
- 적용: 본문 도입부·홈·사례연구 목록·OG 및 Twitter 이미지. 후속 요청에 따라 본문 첫 문단 앞에도 대표 이미지를 배치하고 AI 생성 설명용 일러스트라는 캡션을 붙였다. 제작자 원본 화면과 캡션은 유지했다.
- 생성물을 직접 확인해 기기 5대, 큰 중심 상자와 소리 표시, 로고·문자 없음, 원고와의 주제 일치를 검토했다.
- 목록의 데스크톱 카드(300×168.75px)와 390px 모바일 화면에서 이미지가 온전히 보이는지 확인했다. 모바일 페이지 가로 넘침이 없고 이미지 원본 폭은 1672px로 로드됐다.
- PNG 요청은 HTTP 200 및 `image/png`로 응답했다. 홈·목록·OG·Twitter 경로와 크기 속성, 본문의 원본 화면 유지, `git diff --check`를 확인했다. 푸시·배포는 하지 않았다.
- 본문 배치 후 1280px·390px 화면에서 대표 이미지 로드와 페이지 가로 넘침 없음을 확인했다. 모바일에서는 이미지 전체와 캡션, 이어지는 첫 문단을 직접 확인했다.

최종 생성 프롬프트:

```text
Use case: illustration-story. Asset type: a polished editorial thumbnail for a Korean AI case study titled 'AI에게 귀를 달아 경고음의 위치를 찾다', about Simon Willison's Beep Locator. Create a wide 16:9 landscape illustration, ideally 1600×900 or similar, with no text anywhere. Scene: a small cluster of unpacked cardboard moving boxes, one slightly open revealing a simple small white household alarm detector making an intermittent beep. Around the boxes sit exactly five ordinary listening devices: one smartphone, two tablets, and two open laptops. Show a few elegant curved orange sound-wave marks radiating from the box and subtle dotted paths connecting it to the devices, conveying that multiple microphones help locate the sound. The device screens have only very simple abstract waveform strokes, no realistic app UI. Style: sophisticated editorial illustration, tactile cut-paper shapes with restrained soft 3D depth, clean silhouettes, warm off-white background, charcoal devices and warm cardboard with vibrant orange accents that suit a cream-and-orange technology publication. Balanced compact composition with large recognizable shapes, strong focal point in the beeping box, readable at 300px wide, generous breathing room, entire important scene in central safe area so light crops remain usable. Calm curious problem-solving mood. No people, no robot, no brain icons, no brand logos, no writing, no letters, no numbers, no watermarks, no flames or smoke. This is a conceptual illustration, not a screenshot or a claim of measured localization accuracy.
```
