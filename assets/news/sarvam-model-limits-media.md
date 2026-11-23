# Sarvam 105B와 OpenAI 개발 한계선의 시각 자료

원문 공개일은 두 건 모두 2026년 11월 22일이다. 기사 반영과 확인은 11월 23일(한국시간)에 진행했다.

## Sarvam 공식 시연

- 발표문에 있는 두 영상 중 워크스테이션에서 계약서를 검토하는 **Sarvam 105B on one RTX PRO 6000 Blackwell, network off**를 골랐다. 출시 소개 영상보다 입력 자료와 만들어 낸 문서를 확인하기에 적합하다. [On-Prem Agents 원문](https://www.sarvam.ai/blogs/sarvam-105b-1711#on-prem-agents)
- 기사에서는 공식 1280 × 720 MP4를 원격 재생한다. 원본 길이는 약 2분 38초다. 같은 플레이어가 제공한 JPEG 포스터(1200 × 675)를 변경 없이 저장했다. 별도 미디어 재배포 라이선스는 확인하지 못했으며 모델 가중치의 Apache 2.0은 영상에 적용하지 않았다. [공식 영상](https://assets.sarvam.ai/Blogs/sarvam-105b-1711/sarvam-105b-on-prem-rtx-pro-6000.mp4?tr=orig-true) · [공식 포스터](https://assets.sarvam.ai/tr:w-1200,q-70,f-auto,dpr-auto/images/03117ysv/production/3942ea41ee22170e68b8661f22f6e08cf9947f11-1280x720.jpg) · [저장한 포스터](sarvam-105b-on-prem-poster.jpg)
- 로컬 기사에서 자동·반복 재생이 꺼져 있는지 확인하고, 키보드로 재생해 시간이 진행되는 것을 확인한 뒤 일시 정지했다. 0:35에 문서 보관함, 1:40에 계약 검토 요청, 2:29에 메모와 PDF 발표 자료가 표시된다. 해당 장면과 원문 캡션을 대조했다. 워크스테이션의 실제 네트워크 상태나 추론 성능을 독립 측정한 기록은 아니다.

## OpenAI 연구 에세이의 그래프

- OpenAI가 원문에 실은 대화형 그래프의 데이터를 읽었다. 브라우저의 원문 직접 캡처는 HTTP 403으로 가져오지 못했다. 기사에는 공식 페이지가 제공한 Vega-Lite 데이터의 연도와 로그 퍼플렉서티로 다시 그린 한국어 그래프를 실었다. [공식 차트](https://openai.com/index/perplexity-and-intelligence/#base-model-log-perplexity) · [기사용 그래프](openai-base-model-log-perplexity.png)
- 원본의 출시 계열 13개 점을 같은 시간축에서 연결하고 내부 모델 1개는 같은 달에 별도 마름모로 표시했다. 예측 구간(0.68~0.70)과 실제 측정점은 서로 다른 표식으로 표시했다. 원본의 개별 능력 주석은 옮기지 않았다. 그래프 위 주요 수치는 GPT-3.5 0.986, GPT-6.2 Astra 0.761, 내부 모델 0.732다.
- 자체 제작한 PNG는 1320 × 736이다. 기사에서는 원래 비율로 축소하며 이미지를 열면 크게 볼 수 있다. 좁은 화면에서도 대표 측정값을 본문 크기로 읽을 수 있도록 캡션에 병기했다.

## 가상 상담의 판정표

[기사의 실험 제안](../../news/2026-11-23-sarvam-model-limits.html#experiment)에 넣은 HTML 표는 하나의 배송 문의에서 주문 A 조회·다른 주문 조회·취소 호출이 각각 어떤 처리와 평가 기록으로 이어지는지 보여 준다. 표의 행은 가능한 세 가지 경우이고 실제 모델 실행 기록은 없다.
