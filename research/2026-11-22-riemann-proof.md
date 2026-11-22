# 클로드와 쓴 리만 가설 증명, 독립 검증 통과

일반뉴스 55호 · 발행 및 자료 확인 2026-11-22 (한국시간). 사건 날짜는 각 발표문의 표기를 따랐다.

| 확인할 주장 | 확인한 내용과 기사에 쓴 범위 | 원문 |
| --- | --- | --- |
| 누가 언제 무엇을 공개했나 | 11월 20일 앤트로픽 소속 수학자 레벤트 알푀게가 개인 자격으로 발표했다. 네 쪽 발표문 첫 쪽과 각주에서 Claude와의 협업에 관한 저자 설명, 14개 조각으로 배포한 Lean 아카이브를 확인했다. 기여에 관한 서술은 저자의 설명이며 회사 발표나 독립적인 기여도 평가로 쓰지 않았다. | [발표문](https://alpo.ge/remark.pdf) · [저자의 소속](https://alpo.ge/) · [공개일을 명시한 공동 성명](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) |
| 리만 가설의 내용 | 클레이는 1859년 제기된 가설을 리만 제타 함수의 비자명한 영점 모두의 실수부가 ½라는 주장으로 설명한다. 제출물의 다섯 정리에는 디리클레 L함수에 대한 일반화도 포함된다. | [공식 문제 설명](https://www.claymath.org/millennium/riemann-hypothesis/) · [Mathlib 정의](https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/LSeries/RiemannZeta.html#RiemannHypothesis) · [다섯 정리의 명제](https://math.mit.edu/~drew/grh/) |
| 공동체가 발표한 판정 | 11월 21일 Lean FRO와 Mathlib Initiative가 지지한 공동 성명에서 명제 적합성, 여러 참여자의 동일 추출본 재현, 독립 도구 두 개를 통한 결론 대조, 비실행 데이터에 대한 여러 검증기의 증명 수용을 확인했다. 약 1,700만 줄은 공개한 Lean 라이브러리 규모다. | [공동 성명의 네 항목](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) |
| 서덜랜드의 실행에서 확인한 결과 | 개인 검증 기록 마지막 갱신 11월 21일 12:55 UTC(한국시간 21:55). Claude Code를 사용했다. Lean과 Mathlib v4.33.1로 175,187개 모듈 컴파일 및 모듈별 커널 재검사 완료. 다섯 정리가 의존하는 공리는 표준 공리 세 개. 전체 증명 추출본은 nanoda와 con-leche가 수용했다. | [검증표](https://math.mit.edu/~drew/grh/) · [의존 공리 출력](https://math.mit.edu/~drew/grh/audit.log) |
| ‘진행 중’은 어느 실행인가 | 위 기록에는 서덜랜드 환경에서 진행하던 lake comparator 전체 실행 및 추출본의 Lean 커널 재검사가 진행 중으로 표시돼 있다. 같은 페이지의 모듈별 검사 완료, 공동체 전체의 명제 대조·커널 검사 완료와 대상 및 실행 주체를 구분했다. | [검사별 결과](https://math.mit.edu/~drew/grh/) · [여러 참여자의 결과](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) |
| 사람이 읽는 해설의 진행 상황 | 11월 21일자 루빈스타인의 작업 초안과 안내문을 열었다. 리만 제타 함수에 특화한 해설로, 소수의 가중합에 관한 부등식 (M)에서 결론으로 가는 길을 설명하며 그 부등식의 증명을 Lean에서 가져온다. ‘읽을 수 있는 설명이 전혀 없다’는 표현을 피했다. | [워털루대 연구자 안내](https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/) · [해설 PDF의 서문과 범위](https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf) |
| 클레이의 현재 표기와 심사 절차 | 확인 당시 문제 페이지에 Unsolved가 표시됐다. 상 심사를 고려하기 위한 세 요건은 적격 매체 출판, 그 출판 뒤 최소 2년 경과, 국제 수학계의 일반적 수용이다. 2년을 코드 공개일로부터 계산하지 않았다. | [문제 페이지](https://www.claymath.org/millennium/riemann-hypothesis/) · [연구소의 규정](https://www.claymath.org/millennium-problems/rules/) |

이번 사건에 대한 원저자·검증진의 발표와 후속 해설을 기준으로 삼았다. 검토한 원문과 후속 검색에서 공동 성명을 철회하는 공지는 찾지 못했다. 이번 작업에서는 공개 기록을 대조했으며 증명 라이브러리를 직접 컴파일하거나 수학적 논증을 독자적으로 검증하지 않았다. 첨부 원고에 섞인 검색 서비스 아이콘과 매체 이름은 관련 주체의 원문 링크로 교체했다.

## 모임 실험의 편집 기준

51호의 쿠폰 코드 수정 회귀, 52호의 주문서 완료율 진단, 53호의 상품 입력 검토, 54호의 월별 정산 대조와 비교했다. 첨부 원고의 주문 취소·쿠폰 소재를 살리고, 이번에는 **동일한 결함을 구현자 자신의 테스트와 업무 담당자의 독립 기대값이 각각 잡아낼 수 있는가**를 묻는다. 약 20개 시나리오와 두 개의 의도한 결함은 실험 설계값이다. 예시의 잔여 횟수는 0→1→1, 누적 복구 건수는 0→1→1이다. 모델이나 구현의 측정값은 제시하지 않았다.

[검사 로그 발췌와 실험 표의 출처](../assets/news/riemann-proof-media.md)

## 로컬 기사 확인

Chrome에서 프로젝트 하위 경로로 홈·목록·기사를 열었다. 제목·설명·날짜와 목차 대상, 내부 링크 및 자산 응답, 외부 링크의 새 탭 속성을 대조했다. 목록에는 전체 71편, 일반뉴스 55편, 속보·단신 16편이 표시되며, 필터 전환과 본문 열람 후 목록 복귀·새로고침에서 새 글 표시가 해제되는 것을 확인했다.

외부 요청을 차단하고 시스템 대체 글꼴로 1280·390·360·320px 폭을 확인했다. 제목은 각 폭에서 두 줄이고, 본문·코드·표에 가로 넘침이 없었다. 라이트 모드의 기사 첫 화면, 다크 모드의 로그와 기대값 표를 캡처해 확인했다. 스크립트를 끈 상태에서도 로그와 표를 읽을 수 있었다.
