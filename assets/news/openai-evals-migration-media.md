# ISSUE 34 미디어 기록

확인일: 2026-11-01. 기사: `news/2026-11-01-openai-evals-migration.html`.

## 채택 자료

### Promptfoo 공식 예제 화면

- 파일: `assets/news/evals-promptfoo-official.png`
- 제공자: OpenAI Cookbook, Konstantine Kahadze.
- 원문: https://developers.openai.com/cookbook/examples/evaluation/moving-from-openai-evals-to-promptfoo
- 원본 파일: https://developers.openai.com/cookbook/assets/images/promptfoo-custom-example-view.png
- 가이드 공개일: 2026-06-03. 이미지 자체 최초 제작일은 확인하지 못함.
- 용도: 동일 입력에 대한 모델별 출력·통과 여부·사용량을 나란히 보는 평가 결과 화면 설명.
- 상태: 공급사가 제공한 두 번역 사례 예제. 현재 모델 성능 비교나 모임의 재현 결과로 사용하지 않음. 예전 모델명과 예제 결과임을 캡션 맥락으로 구분.
- 가공: 공식 이미지 원본4433×2035, 153,200바이트를 그대로 저장. 크롭·합성·색상 변경 없음. 상세 내용은 이미지 링크로 원본 크기로 확인 가능.
- 권리: [OpenAI Cookbook MIT License](https://github.com/openai/openai-cookbook/blob/main/LICENSE) 직접 확인. 저작권·허가문은 아래에 보존한다. 상표·서비스 권리까지 허가하는 것으로 해석하지 않는다.
- 검증: 공식 문서의 이미지 alt·원본 주소와 내려받은 파일을 대조하고 직접 열어 확인. 실제 기사에서 데스크톱·360픽셀 모바일의 로딩과 원본 크기4433×2035를 확인했고, 가로 넘침이 없었다. 라이트·다크 배경에서 이미지·캡션을 확인했다.

### 자체 일정표와 설명도

- Evals 3단계 일정표: 공식 [Deprecations](https://developers.openai.com/api/docs/deprecations) 날짜를 HTML 텍스트로 재구성. 실제 계정 상태를 측정한 화면이 아니다.
- 자금 그래프: Reuters 보도의 종전 모집 목표300억 달러와 수정 목표약200억 달러를 0 기준의 같은 축으로 비교. Investing.com의 투자 약정약110억 달러는 별도 상자로 분리하며 막대·달성률로 그리지 않았다. 원화와 모든 값은 읽을 수 있는 HTML 텍스트로 제공한다. 환율·계산은 조사 기록 참조.
- NVIDIA→Nscale→Anthropic 관계도: GPU·컴퓨팅 공급 계획은 실선, 건설 차입 보증 논의는 점선과 ‘조건 미확정’으로 구분. Nscale 공시의 Anthropic 공급 계약에는 최대 지급액과 납품·서비스 가용성 조건을 붙였다. 공식 계획·공시와 언론 보도를 바탕으로 만든 자체 설명도이며 실제 자금 이동·보증 체결·건설 완료 화면이 아니다. 모바일에서는 공급사→두 역할→Nscale의 순서를 세로로 배치한다.
- 평가 실험 도식·표: 모임의 가상 제안. 고정 응답을 기존 판정/사람 기준과 대조하는 절차. 실제 모델 호출·평가 결과를 만들지 않았다.

## 주요 소식별 확인 범위와 제외 이유

- **Evals**: 공식 종료 문서와 Cookbook을 직접 읽고, 실제 브라우저에서 코드·표·결과 이미지까지 확인했다. 기능 이해에 적합한 결과 화면 한 장을 채택했다.
- **OpenAI 조달**: Reuters 재게시·Investing.com 기사, 공식 도메인 검색, [OpenAI 뉴스 목록](https://openai.com/news/)의10월26~30일 발표를 확인했다. 이번 조달을 확정하는 공식 발표·관련 시각 자료는 찾지 못했다. 보도 페이지의 대표 사진은 로고 이미지여서 제외하고, 목표 변경 그래프와 약정 상자로 설명한다.
- **Nscale**: SEC 공시와 공식 Monarch 페이지를 실제 브라우저로 확인했다. 11월1일 후속 요청에서 스크롤해 캠퍼스 조감도·설비 소개를 다시 확인하고 기사에 전용 원문 링크를 추가했다. 시각 자료가 없는 것으로 취급하지 않는다. 보증 자체를 설명하는 공식 도식은 확인하지 못해 기사에서는 자체 관계도를 사용한다. 페이지의 계획 수치에 상충이 있어 설비 용량·투자액은 새로 옮기지 않았다. 확인한 페이지 DOM에서 관련 재생 영상을 찾지 못했으며 별도 영상 전체를 확인했다고 주장하지 않는다.

### 11월1일 추가 확인한 공식 이미지와 이용 조건

- [Monarch 공식 프로젝트 페이지](https://www.nscale.com/ai-infrastructure/monarch): 상단의 설비 선화와 본문의 캠퍼스 조감도를 확인했다. 현재 준공 사진이나 보증 계약 증거로 쓰지 않는다. 이미지 자체의 최초 공개일은 미확인이다.
- 본문 조감도 원본: https://cdn.prod.website-files.com/6a82f7ca23e97c6371bbf5cf/6a82f7ca23e97c6371bbf701_e25d662a388efaee5c5ca35cd6da3f1a_split_2-1.avif . 이미지 내용·원본 주소를 브라우저 DOM과 실제 화면으로 확인했다. 복사·가공·다운로드하지 않았다.
- [Nscale 미디어 키트](https://www.nscale.com/media-kit)는 로고·색상·폰트·브랜드 지침을 제공한다. 확인한 목록에 Monarch 조감도의 재사용 허가가 별도로 나오지 않았다. [이용약관](https://www.nscale.com/policies/terms-conditions)의 Intellectual Property 항목에는 재생산·재배포를 금지하는 문구가 있어 로컬 이미지로 채택하지 않고 원문 안내만 제공했다. 이는 이미지 자체가 없다는 판단과 구분한다.
- [NVIDIA·Emerald AI의3월23일 공식 발표](https://nvidianews.nvidia.com/news/nvidia-and-emerald-ai-join-leading-energy-companies-to-pioneer-flexible-ai-factories-as-grid-assets)에는 Nscale이 참여하는 전력 유연성 협력이 나온다. 이번10월의 건설 차입 보증 발표가 아니므로 관련 이미지를 현재 협상 도식처럼 전용하지 않았다.
- 검증: 1280픽셀 데스크톱에서 목표 막대의2:3 비율·축 정렬과 관계도의 화살표를 확인했다. 360픽셀 모바일에서 세로 재배치·실선/점선·금액 줄바꿈·가로 넘침 없음, 라이트·다크 대비를 확인했다. 추가 이미지 파일·영상·JS는 없다.

## OpenAI Cookbook license

MIT License

Copyright (c) 2025 OpenAI

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
