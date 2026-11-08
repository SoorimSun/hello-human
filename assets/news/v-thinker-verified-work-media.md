# 일반뉴스 41호 미디어 기록

확인일 2026-11-08 KST. 기사 `news/2026-11-08-v-thinker-verified-work.html`.

## V-Thinker 공식 평가 도식

- 로컬 파일: `assets/news/v-thinker-vtbench.png`
- 소개: https://github.com/We-Math/V-Thinker
- 원본: https://github.com/We-Math/V-Thinker/blob/main/assets/fig7.png
- 다운로드: https://raw.githubusercontent.com/We-Math/V-Thinker/main/assets/fig7.png
- 제공자: We-Math / V-Thinker 연구진. 파일 자체의 최초 공개일은 별도 확인하지 않음. 관련 논문은 2025년 연구.
- 용도: 위쪽의 데이터 수집·사람 검토·주석 작업과 아래쪽의 세 평가 과제를 보여주는 공식 설명도. 제품 운영 화면·성능 실측 자료가 아니다.
- 3268 × 1241 원본을 변경 없이 저장했다. 전체 비율을 보존하며 이미지 링크로 크게 볼 수 있다. 그림 속 영문을 한국어 본문·alt·캡션에서 설명한다.
- 원본을 직접 열어 이미지 내용과 비율을 확인했다. 실제 기사에서도 로딩과 원본 비율을 확인했고, 데스크톱·390px 모바일 및 다크 모드에서 표·도식과 함께 점검했다. 360px 화면에서도 본문 가로 넘침이 없었다.
- 저장소의 MIT License를 확인했다. 출처: https://github.com/We-Math/V-Thinker/blob/main/LICENSE . 아래에 저작권·허가 문구를 보존한다.

## 환경단체 자료

- Reuters 전재 전문에 소개된 사진 자체보다 업무 절차를 설명할 자료를 검토했다. Save the Elephants의 해당 항공 조사에 직접 대응하는 공식 시연은 확보하지 못했다. 수치 카드에는 ‘단체 설명’으로 표시하고 독립 재현으로 표현하지 않았다.
- AWS/JGI 공식 소개 https://www.aboutamazon.com/news/aws/jane-goodall-institute-research-archive-aws-ai 에는 현장 관찰·메모 작성 등 과거 사진이 있다. 이번 도구의 처리 화면이 아니므로 새 자동화 시연 이미지로 재사용하지 않았다.
- TNC 공식 소개 https://www.nature.org/en-us/newsroom/tnc-launches-edge-ai-reports/ 에는 `fish-detector-tuna-example.png`라는 어획 탐지 화면, 참치 사진, 선박 카메라 사진이 있다. 페이지의 이미지 설명과 출처를 확인했다.
- TNC 원본 탐지 화면 URL: https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/f/i/fish-detector-tuna-example.png?wid=640 . 이미지 직접 열기는 cache miss로 실패했다.
- TNC 이용 조건 https://www.nature.org/en-us/about-us/who-we-are/accountability/terms-of-use/ 에서 시각 자료를 별도 복제·배포하는 권한을 확인하지 못했다. 따라서 이미지는 내려받거나 임베드하지 않고 원문으로 연결한다.
- 배경 보고서 https://www.nature.org/content/dam/tnc/nature/en/documents/t/n/TNC-edgeReport-2026.pdf 는 웹 도구의 파일 크기 한도로 열지 못했다. 읽은 자료처럼 쓰지 않는다.
- 기사 `#edge-title`은 공식 자료에 나온 **촬영 → 선내 분석·일지 대조 → 일일 보고서 → 사람의 검토**를 독자적으로 배치한 HTML 설명도다. 이후 사용자 요청으로 보고서의 구체적인 항목과 공식 PDF 링크를 보강했다. 공식 UI를 복제하지 않았으며 캡션에 자체 설명도임을 표시했다.

## IMF

- Reuters/AOL 전재본 https://www.aol.com/articles/imfs-georgieva-says-slowdown-ai-235217000.html 에는 인물 사진이 있으나, 투자·업무 성과의 차이를 설명하는 데 직접적인 정보가 없어 채택하지 않았다.
- 해당 날짜 IMF 공식 발언 전문·공식 발표 슬라이드는 찾지 못했다. `#macro-title`은 Reuters가 전한 발언을 바탕으로 성장·물가·금융시장 영향을 연결한 자체 설명도다. 인프라 투자·서비스 운영·사용자 업무를 구분하는 기존 `#cost-title`은 모임 관점으로 옮겼다.

## 가상 상품 실험

- `#lab-title`과 캐시 조건 표는 자체 작성한 정적 설명 자료다. P-017의 39,000원과 42,000원은 가상의 상품 가격이며 API 단가나 비용 추정이 아니다.
- 실제 모델·이미지 검증기를 실행하지 않았다. 기대 동작과 실패 처리만 제안한다.
- 역할 흐름은 모바일에서 세로 순서를 유지한다. JS 없이도 모든 내용을 읽을 수 있다.

## 2026-11-08 시각 자료 재검토

사용자 요청에 따라 현재 기사와 공식 원문을 다시 대조했다. 이번 작업은 충분성 검토이며 기사 HTML·디자인은 변경하지 않았다.

| 소식 | 현재 구성 | 판단과 보완 우선순위 |
| --- | --- | --- |
| V-Thinker | 공식 VTBench 구성·과제 예시 원본, 자료별 규모 표 | 충분. 서로 다른 세 과제를 실제 예시로 보여준다. 모바일에서는 원본의 영문이 작아지지만 본문·캡션과 확대 링크가 보완한다. 같은 내용을 반복하는 이미지는 추가하지 않는다. |
| 환경단체 | 기간 수치 카드 2개, TNC 선내 분석 흐름도 | 절차 설명은 있으나 모델이 내놓는 결과와 사람이 검토할 화면이 부족하다. TNC의 공식 보고서 예시를 우선 후보로 확인했다. JGI의 과거 현장 사진은 도구의 입출력을 보여주지 않아 우선도가 낮다. |
| IMF | 인프라 투자·서비스 운영·사용자 업무를 구분하는 자체 도식 | 업무 적용 설명에는 유용하지만 소식의 핵심인 성장·물가·금융 안정성 위험을 직접 보여주지는 않는다. 해당 발언에 대응하는 공식 발표 슬라이드는 확보하지 못했다. 향후 보완 시 발언 근거에 맞는 거시경제 영향 경로를 설명하고 기존 업무 도식은 모임 관점으로 옮기는 편이 적합하다. |

### 새로 확인한 TNC 공식 자료

- 공식 자료 소개: https://www.nature.org/en-us/what-we-do/our-insights/perspectives/ai-electronic-monitoring-fisheries-report/
- 이 페이지가 현재 연결하는 보고서: https://www.nature.org/content/dam/tnc/nature/en/documents/t/n/TNC-edgeReport-2026-d1.pdf
- 앞선 검토에서 열리지 않았던 `TNC-edgeReport-2026.pdf`와는 다른 파일이다. 이번에는 46쪽 PDF를 열고, **24쪽 Figure 12와 27쪽 Figure 13을 렌더링해 직접 확인**했다. 전체 보고서의 모든 그림을 검토한 것은 아니다.
- 24쪽 Figure 12: 선박의 카메라·전자 조업일지·장치와 클라우드·보고서 전송을 연결하는 공식 구성도. 현재의 간단한 흐름도보다 상세하지만 기사 폭에서는 복잡하고 글자가 작아, 본문 추가보다는 원문 심화 링크가 적합하다.
- 27쪽 Figure 13: 어획 요약, 위험 항목, 어종·처리 유형·시각·모델 신뢰도·근거 영상 링크가 있는 일일 보고서 화면. **화면과 캡션 모두 개인정보 보호를 위한 모의 데이터라고 명시한다.** 실제 어획 실적이나 독립 측정 결과로 표현하면 안 된다. 사람이 무엇을 검토하는지 보여주므로 가장 적합한 보완 후보다.
- 29쪽 Figure 15·16의 대시보드는 보고서 본문과 캡션에서 존재를 확인했으나, 이번 검토에서 해당 쪽의 이미지를 직접 확인하지 않았다.
- TNC 보도자료의 브라우저 표시 발행일은 2026-04-27. 어획 탐지 이미지의 실제 로딩과 1440px 원본 폭은 DOM으로 확인했으나 이미지 전체 화면을 시각적으로 검토한 것으로 기록하지 않는다.
- TNC 이용 조건의 `USE OF MATERIALS ON THIS SITE`는 시각 요소를 동반 본문과 분리하여 사용하는 데 사전 서면 동의를 요구한다. 보고서에서 별도의 재배포 라이선스도 확인하지 못했다. 따라서 재검토에서는 이미지를 기사 자산으로 복제하지 않았고, 공식 보고서 해당 쪽 링크를 우선 보완안으로 남긴다.

### 그 밖의 확인 범위

- AWS/JGI 공식 소개를 브라우저로 열어 2025-11-06 발행 표시와 이미지 설명을 확인했다. 현장 관찰·망원경 관찰·텐트에서 노트 작성하는 과거 사진이며, 본문에 디지털화 도구 UI나 처리 전후 화면은 확인되지 않았다.
- Save the Elephants의 https://savetheelephants.org/news/artificial-intelligence-for-elephants/ 는 2020-05-20 배경 소개다. 이번 Reuters 인터뷰의 작업시간에 대응하는 시연이 아니어서 새 사례의 이미지로 채택하지 않는다.
- IMF 공식 AI 주제 페이지 https://www.imf.org/en/Topics/Artificial-Intelligence 와 해당 날짜·발언에 대한 공식 도메인 검색을 확인했다. 11월 6일 발언에 직접 대응하는 슬라이드를 확보하지 못했다. 검색에 나온 2026년 4월 금융안정보고서 도표는 다른 시점·분석이므로 이번 발언의 직접 시각 근거로 추가하지 않는다.
- 이번 검토에서는 코드·HTML을 바꾸지 않아 회귀 테스트와 반응형 화면 검사를 재실행하지 않았다. 출처·미디어 검토 기록만 갱신했다. 커밋·푸시·배포 없음.

## 2026-11-08 사용자 요청에 따른 보완 반영

- 환경단체: 정적인 업무 흐름을 구체화해 보고서의 어획 요약, 위험 항목, 사건별 어종·처리·시각·신뢰도·영상 근거와 사람이 확인할 내용을 연결했다. 공식 보고서 27쪽으로 가는 링크 카드를 넣고 원본 화면의 모의 데이터 성격을 가까이 표시했다. 원본 이미지·UI·수치·디자인은 복제하지 않았다.
- IMF: 투자 확대와 성장 지원·물가 압력·금융시장 위험을 세 갈래로 보여주고, 성장 동력이 약해질 경우 중앙은행이 물가 대응 판단에 반영해야 한다는 조건을 별도 경로로 표시했다. Reuters 전재 전문을 다시 대조했으며 금리 방향·영향 크기나 새 전망 수치는 추가하지 않았다.
- 기존 업무 성과 도식과 비용 해석 문단은 `#our-view`로 옮겼다. `#cost-title` ID를 유지했다.
- 기사 전용 CSS를 v2로 갱신했다. 새 도식은 HTML/CSS로만 작성해 별도의 스크립트·모델 호출 없이 읽힌다. 모바일에서는 보고서와 사람의 검토, IMF의 세 영향과 조건 경로가 위에서 아래로 이어진다.
- 브라우저 검증: 1280×1000 데스크톱, 390×844·360×800 모바일의 도식을 확인했다. 가로 넘침 없음, 라이트·다크 대비와 이동한 비용 도식의 위치를 확인했다. 공식 PDF 링크를 키보드 Enter로 열어 새 탭의 URL과 `#page=27`을 확인했다. 검토용 PDF 탭을 닫고 기사 탭을 남겼다. 화면 크기와 라이트 모드를 원래대로 돌렸다.
- `node --test` 71개 통과, 실패 0개. 기사 HTML의 중복 ID·접근성 제목 참조·내부 경로·외부 링크 속성·모의 데이터 표시·CSS 버전과 `git diff --check`를 확인했다. 인쇄 화면은 별도 검증하지 않았다.
- 커밋·푸시·배포를 하지 않았다.

## V-Thinker 원본의 라이선스

```text
MIT License

Copyright (c) 2025 We-Math

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
