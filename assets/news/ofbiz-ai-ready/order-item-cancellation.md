# 주문 항목 취소 기능 설명서

- 기능 ID: ORDER-ITEM-CANCEL
- 대상: Apache OFBiz 18.12.19
- 기준 커밋: `e7b7ae0eaa4561a2357b198e21cc8ca63ffac105`
- 작성·소스 확인일: 2026-10-24
- 작성: 헬로우 휴먼
- 확인 수준: 공개 소스 확인 완료 / 실행 검증 대기 / 업무 담당자 확인 대기
- 연결 자료: [주문 취소 규칙 연결표](./order-item-cancellation-traceability.md)

## 목적과 범위

주문 항목의 취소 수량을 반영하고, 해당 경로의 재고 예약 처리와 금액·알림 후처리를 연결한다.

이 설명서의 검증 초안은 판매 주문의 한 항목·한 배송 그룹을 기준으로 한다. 부분 출고, 구매 주문, 여러 배송 그룹은 별도 확인 대상으로 남긴다. 실제 운영 조직의 업무 정책은 담당자 확인이 필요하다.

## 진입점과 입력

- 서비스: `cancelOrderItem`
- 구현: `org.apache.ofbiz.order.order.OrderServices.cancelOrderItem`
- 필수 입력: `orderId`
- 선택 입력: `orderItemSeqId`, `shipGroupSeqId`, `cancelQuantity`, `itemReasonMap`, `itemCommentMap`, `itemQtyMap`
- 서비스 정의는 인증을 요구한다(`auth="true"`). 메서드에서는 `userLogin`과 해당 주문의 UPDATE 권한을 확인한다.
- 한 항목·한 배송 그룹만 대상으로 할 때는 해당 식별자를 명시한다. 식별자 생략 경로는 이 검증 초안의 범위 밖이다.
- 근거: [S1 서비스 정의](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/services.xml#L278-L296), [S2 입력·권한·조회 조건](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2000-L2047).

## 처리 흐름과 규칙

1. **CANCEL-01 · 권한:** 주문 UPDATE 권한이 없으면 오류를 반환한다. [근거](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2023-L2030)
2. **CANCEL-02 · 수량과 예약:** 주문 항목 `OrderItem`과 배송 그룹 연결 `OrderItemShipGroupAssoc`의 취소 수량을 누적한다. 남은 항목 수량의 일부를 취소하는 분기에서는 `cancelOrderItemInvResQty`를 호출한다. [근거](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2065-L2215)
3. **CANCEL-03 · 금액과 알림:** 서비스의 `global-commit-post-run` 이벤트에 `recreateOrderAdjustments`, `resetGrandTotal`, `sendOrderChangeNotification`이 연결돼 있다. 알림은 비동기·영속 작업으로 설정돼 있다. [S3 후처리 설정](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L152-L157)
4. **CANCEL-04 · 서비스별 차이:** `cancelOrderItemNoActions`도 같은 Java 메서드를 사용하지만, 이 서비스에는 위 취소 서비스의 ECA 후처리가 붙지 않는다. 내부에서 호출하는 다른 서비스의 부수 효과까지 없다는 뜻은 아니다. [S1 서비스 정의](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/services.xml#L278-L296)

메서드는 정상 종료 시 성공 결과를 반환하고, 권한·조회·저장 등의 오류 경로에서는 오류를 반환한다. 반환 결과만으로 비동기 알림의 실제 전달 성공을 판단할 수 없다. [메서드 끝부분](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2180-L2224)

## 테스트와 검증 상태

- E01 · 기존 테스트: [SalesOrderTest.testCreateSalesOrder](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/test/SalesOrderTest.java#L51-L154). `storeOrder`를 호출한 뒤 주문 ID와 상태 ID가 null이 아닌지 검사한다. 이 검사는 위 취소 규칙을 검증한 근거로 연결하지 않는다.
- T01~T04 · 추가 테스트 초안: [규칙 연결표](./order-item-cancellation-traceability.md)에 사전 조건·확인할 결과를 정리했다. 테스트 코드·실행 결과는 아직 없다.
- 확인한 소스의 현재 동작과 업무상 의도는 구분한다. 담당자 확인 뒤 정책 문서와 승인 기록을 연결한다.

## 미확인 사항

- Q01: 다른 파일에 취소 관련 테스트가 있는가? 발견하면 해당 규칙과 연결하고 중복 초안을 정리한다.
- Q02: 부분 출고·구매 주문·여러 배송 그룹에서 상태와 예약 처리는 어떻게 달라지는가?
- Q03: 주문 조정 금액 재생성의 세부 계산과 비동기 알림의 실패·재시도 동작은 무엇인가?
- Q04: 현재 운영 조직의 취소 권한·금액·알림 정책과 이 버전의 구현이 일치하는가?

## 다음 변경에서 사용하는 방법

“부분 취소 뒤 변경 알림 조건을 바꾸려면 어디를 확인해야 하는가?”라는 질문에는 CANCEL-03에서 S3 설정과 T03을 찾고, CANCEL-04에서 호출 서비스의 차이를 함께 확인한다. 미확인 사항을 해소해야 하는 변경이면 먼저 해당 질문을 조사한다.

관련 소스가 바뀌면 기준 커밋, 연결된 규칙, 테스트 결과, 담당자의 확인 기록을 함께 갱신한다. 이 문서가 코드와 다른 버전을 가리키면 새 버전에서 근거를 다시 확인한다.

