# OFBiz 산출물 제공 전후 에이전트 답변 비교

2026-10-24 한국시간에 실제 독립 실행 2개를 수행했다. 두 답변 모두 핵심 알림 연결 위치와 서비스별 차이를 찾았다. 산출물을 추가한 답변은 규칙·테스트 ID와 검증 상태를 재사용했다. 이번 결과로 정확도·시간·비용의 개선을 입증한 것은 아니다.

## 실행 조건

- 실행 환경: Codex의 독립 에이전트 2개. 두 실행 모두 상위 세션의 동일 모델·추론 설정을 상속했으며 별도 모델 override는 지정하지 않았다.
- 정확한 API 모델 식별자, temperature, seed, 추론 토큰 수는 도구에서 노출되지 않아 기록하지 못했다.
- 대화 이력: 이전 대화와 기사·구성 예시를 전달하지 않는 새 컨텍스트로 시작했다. 한쪽 답변을 다른 쪽에 전달하지 않았다.
- 횟수: 조건별 1회. 결과를 보고 재실행하거나 좋은 답변을 골라내지 않았다.
- 공통 조건: 같은 지시문·질문·소스, 한국어 1,200자 이내 응답 요청. 각 입력 파일 1개만 읽고 답하도록 했고 외부 검색·추가 파일 조회·코드 실행·수정은 금지했다.
- 조건 1: 소스 발췌만 제공.
- 조건 2: 같은 입력 뒤에 [기능 설명서](./order-item-cancellation.md)와 [규칙 연결표](./order-item-cancellation-traceability.md)를 추가.
- 소스: Apache OFBiz 18.12.19, 커밋 `e7b7ae0eaa4561a2357b198e21cc8ca63ffac105`. 전체 저장소가 아닌 4개 파일의 총 485행을 제공했다.

| 소스 파일 | 제공 범위 |
| --- | --- |
| [services.xml](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/services.xml#L278-L296) | 278~296행 |
| [OrderServices.java](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L1999-L2224) | 1999~2224행 |
| [secas.xml](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L23-L158) | 23~158행 |
| [SalesOrderTest.java](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/test/SalesOrderTest.java#L51-L154) | 51~154행 |

### 두 조건의 공통 지시문

> 제공된 자료만 근거로 아래 질문에 한국어로 답하세요. 확인한 근거와 추가로 확인해야 할 내용을 구분하세요. 외부 검색·추가 파일 조회·코드 실행·수정은 하지 마세요. 질문에 대한 답변만 작성하고, 1,200자 이내로 답하세요.
>
> 질문: 부분 취소 뒤 알림 조건을 바꾸려면 어디를 확인해야 할까?

## 조건 1 응답 전문 — 소스만

아래 응답 본문은 수정하지 않았다.

---

먼저 `applications/order/servicedef/secas.xml` 152~157행을 확인해야 합니다. 부분 취소 뒤 변경 알림을 연결하는 지점입니다.

확인된 근거는 다음과 같습니다.

- `cancelOrderItem`의 `global-commit-post-run` ECA에 별도 조건 없이 `recreateOrderAdjustments` → `resetGrandTotal` → `sendOrderChangeNotification`이 선언돼 있습니다. 알림은 `async`, `persist="true"`입니다.
- `OrderServices.java` 2108~2113행은 취소 수량을 누적 저장합니다. 2180~2206행에서는 취소량이 남은 품목 수량보다 작으면 재고 예약 취소를 호출하고, `changeOrderItemStatus`는 호출하지 않습니다. 따라서 부분 수량 취소 알림을 바꾸려면 품목 상태 변경 규칙만 확인해서는 부족합니다.
- `services.xml` 278~296행의 `cancelOrderItemNoActions`는 같은 Java 메서드를 사용하지만 해당 서비스에 ECA가 붙지 않는다고 명시돼 있습니다. 이 서비스로 바꾸면 알림뿐 아니라 위 재계산 후속 작업도 빠지므로 단순 알림 차단 수단으로 교체하기는 부적절합니다.
- 같은 알림 서비스가 `secas.xml` 144~147행의 `updateOrderItems`에서도 호출됩니다. 알림 서비스 내부 조건을 바꾸면 이 경로에도 영향을 줄 수 있습니다.

추가로 확인할 내용은 실제 호출 서비스명, `sendOrderChangeNotification`의 정의·구현과 기존 발송 조건, 그리고 ECA에서 사용할 수 있는 입력·결과 값입니다. 제공된 취소 서비스에는 부분 취소 여부를 나타내는 출력이 없어 조건식을 바로 확정할 수 없습니다. ‘부분 취소’가 품목 수량 일부인지 주문 중 일부 품목 취소인지도 구분해야 합니다.

제공된 `SalesOrderTest.java` 51~154행은 주문 생성만 확인합니다. 변경 후에는 부분·전체 취소, 상태 유지·변경, 일반 품목 수정 경로에서 알림 실행 여부와 재계산 유지 여부를 별도로 검증해야 합니다.

---

## 조건 2 응답 전문 — 같은 소스와 두 산출물

아래 응답 본문은 수정하지 않았다.

---

먼저 규칙 연결표의 **CANCEL-03 → S3 → T03**, 이어 **CANCEL-04 → S1 → T04**를 확인하면 됩니다.

확인된 근거는 다음과 같습니다.

- **S3 후처리 설정:** [secas.xml 152~157행](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L152-L157)의 `cancelOrderItem`은 `global-commit-post-run`에 금액 조정 재생성·총액 갱신·변경 알림을 연결합니다. 알림은 `mode="async" persist="true"`이고, 이 ECA에는 부분 취소 여부 등의 명시적 조건이 없습니다.
- **S1 서비스 구분:** 278~296행의 `cancelOrderItemNoActions`는 같은 Java 메서드를 쓰지만 위 ECA가 붙지 않습니다. 실제 호출 서비스부터 확인해야 합니다. 내부에서 호출하는 다른 서비스의 후처리까지 사라지는 것은 아닙니다.
- 같은 알림 서비스가 `updateOrderItems`에도 연결됩니다(S3 144~146행). 알림 구현 자체를 바꾸면 이 경로의 영향도 검토해야 합니다.

추가로 확인할 내용은 **알림 서비스 내부의 발송 조건·수신자 결정, 실패·재시도 동작, 운영 조직의 알림 정책**입니다. 해당 구현과 정책은 제공 자료만으로 확정할 수 없습니다. 알림 조건을 ECA 전체에 걸면 함께 묶인 금액 후처리도 제한될 수 있으므로, 알림에만 조건을 적용할 위치를 검토해야 합니다.

검증은 **T03**을 확장해 조건 충족·미충족 때의 알림 작업 등록과 금액 후처리를 확인하고, **T04**로 서비스별 차이를 비교하면 됩니다. 작업 등록과 실제 전달 성공은 별도로 검증해야 합니다. T01~T04는 모두 미실행 초안이며, 기존 E01은 주문 생성 검사여서 취소 알림의 검증 근거가 아닙니다. 변경 후 연결 규칙·기준 커밋·실행 결과·담당자 확인 기록도 함께 갱신해야 합니다.

---

## 관찰된 차이

| 관찰 항목 | 소스만 | 소스와 산출물 |
| --- | --- | --- |
| 알림 설정 위치 | secas.xml 152~157행, 커밋 후 이벤트, 비동기·영속 설정을 찾음 | 같은 위치와 설정을 찾음 |
| 다른 호출 경로의 영향 | NoActions의 차이와 updateOrderItems의 공유 알림 경로를 지적 | 두 경로 모두 지적 |
| 부분 취소 세부 분기 | Java 분기를 설명하고, 품목 수량 일부 취소와 주문 중 일부 품목 취소의 구분을 요청 | 해당 Java 분기를 직접 설명하지 않고 연결표의 경로·검증 계획 중심으로 구성 |
| 테스트 | 제공된 기존 테스트의 범위를 짚고 부분·전체 취소와 다른 경로의 검증을 새로 제안 | T03·T04를 활용하고 T01~T04가 미실행 초안임을 명시 |
| 추가 조사 | 알림 구현, ECA에 사용할 값, 부분 취소의 의미를 확인할 필요 | 알림 구현·실패/재시도·운영 정책, 적용 위치를 확인할 필요 |

핵심 위치를 찾는 데 산출물이 필수였다는 차이는 관찰되지 않았다. 차이는 답변이 기존 규칙·검증 계획을 참조하는 방식과 세부 설명의 선택에서 나타났다. 이 사실만으로 어느 쪽의 전반적인 품질이 더 높다고 평가하지 않는다.

## 해석의 한계

1. 조건별 한 번만 실행한 소규모 관찰이다. 비결정적 생성의 변동과 모델·업무별 차이를 추정하지 못한다.
2. 관련 소스 발췌를 미리 골라 줬다. 큰 저장소에서 관련 파일을 찾아내는 과정과 시간은 시험하지 않았다.
3. 제공한 기능 설명서에 평가 질문과 유사한 질문의 탐색 예시가 이미 들어 있다. 규칙 ID와 테스트 초안의 재사용은 입력에 포함된 정보의 활용이며, 새 문제에 대한 독립 발견·일반화의 증거가 아니다.
4. 자료 추가로 입력 길이가 늘었다. 문서의 구조화 효과와 추가 정보·입력 길이의 효과를 분리하지 않았다. 길이를 맞춘 대조군은 없다.
5. 답변 길이에 동일한 제한을 뒀다. 한 답변에서 어떤 세부사항을 생략한 것은 그 내용을 이해하지 못했다는 증거가 아니다.
6. 모델의 정확한 API 식별자와 sampling 값이 노출되지 않았다. 같은 모델·추론 설정을 상속하도록 실행했지만, 이 기록만으로 외부에서 비트 단위 재현을 보장할 수 없다.
7. 실제 OFBiz 실행·알림 전송·테스트 실행·사람의 업무 검토는 하지 않았다. 정확도 개선, 탐색 시간 단축, 검토 시간 절감, 비용 절감의 측정 결과가 아니다.

## 입력 파일 무결성 기록

UTF-8 입력 파일의 SHA-256. 공통 질문·지시문·소스가 조건 2의 동일한 앞부분인지 확인했다.

| 파일 | SHA-256 |
| --- | --- |
| run-01-input.txt | 2F2F3270E2BECCD82D9E14027A954C3F130BD6AB819E8CD491F9994E045C6FB9 |
| run-02-input.txt | 229A103BC81F7AA57403DE8F80FE51FB086A6F8EC1B3E98A0BAFDD5DBE91A167 |
| source.txt | 816A028854BEC1226CCC8DD32B4B07069BE7EEA72FD9536CB895FD2968BA9990 |
| order-item-cancellation.md | EE11D883A9B1E8AC0508B218ADFF7748B529A592671A5640C9D70A87EF6F4649 |
| order-item-cancellation-traceability.md | CF1BEF66E4458495040A98DB228D71FD42E5F354B0C6622130F672E3A246AA05 |

원본 입력·응답과 사전 비교 계획은 저장소의 `research/experiments/2026-10-24-ofbiz-ai-ready/`에 보관한다.

