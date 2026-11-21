# 일반뉴스 54호 조사 기록

확인일은 2026년 11월 21일 한국시간이다. 사건과 발표의 날짜는 각 원문 표기를 따랐다. 첨부 원고의 파비콘 링크는 해당 주장을 확인한 공식 문서로 교체했다.

## 식료품 주문과 결제

- **11월 20일, 미국 순차 제공.** 구글은 검색과 Gemini 앱의 Connected Apps로 Albertsons, Safeway, Shaw’s, Target 등의 식료품 주문 구성과 결제를 지원한다고 발표했다. 같은 발표에서 Experian의 검색 확대, H&R Block 세금 계산, 수주 뒤 예정된 Angi·Thumbtack을 구분했다. 한국 제공 일정이나 개별 유통사의 결제 화면, 전환율은 발표 범위에 넣지 않았다. [11월 발표](https://blog.google/products-and-platforms/products/search/connected-apps-holiday-errands/)
- **6월에도 Target에서 구매할 수 있었다.** Target의 6월 18일 자료에는 구글에서 구매를 확정하거나 장바구니를 Target으로 옮기는 선택지가 있다. 11월의 새 소식은 식료품용 Connected Apps의 확대다. 구글의 3월 19일 자료에서도 1월 규격 공개와 3월 장바구니 확장을 확인했다. [Target 구매 안내](https://corporate.target.com/press/fact-sheet/2026/06/conversational-ai) · [구글 UCP 업데이트](https://blog.google/products-and-platforms/products/shopping/ucp-updates/)
- **판매자 역할.** 한국어 Merchant Center 문서는 UCP 기반 결제에서도 거래상 등록 판매자가 유지된다고 설명한다. 도움말에 언급된 전체 대상 국가와 이번 미국 식료품 연동의 제공 지역을 구별했다. [한국어 도움말](https://support.google.com/merchants/answer/16837055?hl=ko)

## 기업용 데이터 에이전트 평가

- **내부 연구, 11월 20일 공개.** 연구진 예시는 가상 브레이크 제조사다. 모델이 먼저 업무 규칙과 틀린 믿음까지 설계하고, 고정 설계도와 시드로 사건·테이블·정답 SQL을 재현한다. 문서 생성과 읽기 전용 도구를 통한 평가가 뒤따른다. 검증할 자료가 모자라는 질문은 제외하고, 존재하지 않는 지표에는 답을 보류하는지 확인한다. [구글 클라우드 기술 설명](https://cloud.google.com/blog/products/data-analytics/a-data-simulator-to-test-agents)
- **내부 평가 결과.** 100개가 넘는 점검 항목은 통계적 현실성과 정답 SQL을 검증한다. 설정 변경에 따른 정확도 변화의 방향과 설정 간 순위가 합성 환경 및 사람이 만든 벤치마크에서 일치했다는 것이 연구진 설명이다. 정확도 절대값이나 고객 환경 일반화 수치는 제시하지 않았다. 연구진은 실제·합성 환경의 추가 비교, 합성 패턴 과적합과 업무 변화에 따른 보정 필요성을 언급한다. [평가 결과와 한계](https://cloud.google.com/blog/products/data-analytics/a-data-simulator-to-test-agents)

## ChatGPT Space

- **11월 20일 전 세계 만 18세 이상 Plus 대상으로 순차 제공.** 공동 편집, 댓글 호출, 연결 앱·도구에 따른 갱신 설정을 확인했다. 모바일 페이지 작성·편집과 모든 슬라이드 기능 지원을 구분했다. 공유 페이지·슬라이드에는 해당 자료의 권한 및 Space가 활성화된 유료 계정이 함께 필요하다. 무료 열람과 공개 링크 제한은 페이지·슬라이드 범위다. [영문 릴리스 노트](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [한국어 제품 소개](https://chatgpt.com/ko-KR/features/space/)
- 한국어 릴리스 노트에서 확인한 본문에는 해당 날짜 항목이 없어, 발표일·나이·공유 범위는 11월 20일 항목을 직접 읽은 영문을 연결했다. [확인한 한국어 릴리스 노트](https://help.openai.com/ko-kr/articles/6825453-chatgpt-release-notes)

## Watch Duty

- **4월 협업, 7월 발생, 11월 20일 사례 공개.** Watch Duty는 4월 22일 사람이 무전에서 사건을 검증하는 과정을 지원하는 협업을 발표했다. 워싱턴주 Railroad Fire 야간 출동에서 도구가 30초 미만에 첫 출동 무전을 표시했고, 담당자가 검증한 뒤 긴급 경보를 보냈다는 7월 사례를 구글이 11월에 공개했다. 경보 발송에 걸린 총시간은 발표되지 않았다. [Watch Duty의 협업 공지](https://www.watchduty.org/blog/google-org-fellowship-watch-duty-ai-radio-transcription-fire-info-faster) · [구글의 운영 사례](https://blog.google/company-news/outreach-and-initiatives/google-org/watch-duty-gemini-tool/)
- **프로젝트 참여자 발표치.** 개발에 활용한 과거 무전 녹음은 2만 시간 초과. 활성 피드는 약 400개, 하루 전사한 무전 음성은 200시간 초과. 잡음이 심한 VHF 무전의 단어 오류율은 38%에서 22.34%로 15.66%포인트 낮아졌다. 피드 수와 녹음 시간은 서로 다른 단위다. 주민 경보의 정확도나 전 지역 성능으로 확대하지 않았다. [구글이 밝힌 측정 범위](https://blog.google/company-news/outreach-and-initiatives/google-org/watch-duty-gemini-tool/)

## OpenAI 이용정책

- **10월 21일 예고, 11월 20일 시행.** 제3자가 모델에 직접 접근하도록 하는 중개 서비스의 사전 검토·승인 요건과, 애플리케이션 자체 기능을 위한 통합에 대한 설명을 정책 본문에서 대조했다. 기사 속 상품 설명 요약은 두 서비스 구조를 설명하는 가상 예다. [개정 발표](https://openai.com/ko-KR/index/broad-access-through-consistent-standards/) · [한국어 정책과 변경 기록](https://openai.com/ko-KR/policies/usage-policies/)
- **평가 결과의 용도.** 정책은 OpenAI 모델·서비스의 대안 또는 대체 모델 학습에 쓸 자료나 신호를 생성·준비·선택·제공하는 데 모델이나 출력을 쓰는 행위를 제한한다. 평가·벤치마킹은 본문 제한 범위 안에서 가능하다. 대체 모델 학습용으로 평가 결과를 재사용·제공하는 경우와 계약상 명시적 허용 예외도 원문에 있다. [모델 학습 및 개발 조항](https://openai.com/ko-KR/policies/usage-policies/)

## 편집부의 실험 제안

최근 51~53호의 쿠폰 코드 회귀, 주문서 완료율 하락 진단, 상품 등록 시 가격 변경과 대조했다. 이번 질문은 환불 귀속 월과 중복 승인 통지 때문에 월별 순수납액이 달라지는지를 정답 SQL로 채점하는 것이다. 주문 100건과 정책 문서 5건은 제안 규모다. 예시 정답은 10월 결제 30,000원 한 건에서 10월 승인 환불 4,000원을 뺀 26,000원이다. 11월 환불은 다음 달에 귀속된다. 가상 데이터에 대한 손계산이며 모델 간 성능이나 검토 시간은 측정하지 않았다.

[원본 이미지와 정산 표의 출처 기록](../assets/news/ucp-groceries-media.md)
