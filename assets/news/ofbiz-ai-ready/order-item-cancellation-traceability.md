# 주문 항목 취소 규칙 연결표

- 기능 ID: ORDER-ITEM-CANCEL
- 대상: Apache OFBiz 18.12.19
- 기준 커밋: `e7b7ae0eaa4561a2357b198e21cc8ca63ffac105`
- 작성·소스 확인일: 2026-10-24
- 작성: 헬로우 휴먼
- 기능 설명서: [주문 항목 취소](./order-item-cancellation.md)
- 규칙의 근거 확인: 공개 소스 확인 완료
- 실행 검증: T01~T04 모두 초안·미실행
- 업무 정책 확인: 담당자 확인 대기

## 규칙과 근거 연결

| 규칙 ID | 확인한 동작 | 소스 근거 | 연결할 테스트 | 현재 상태 |
| --- | --- | --- | --- | --- |
| CANCEL-01 | 주문 UPDATE 권한이 없으면 오류를 반환한다. | [S2 OrderServices.java 2023~2030행](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2023-L2030) | T01 권한 없는 취소 요청 | 소스 확인 / 실행 대기 |
| CANCEL-02 | 주문 항목과 배송 그룹 연결의 취소 수량을 누적하고, 일부 취소 분기에서는 재고 예약 취소 서비스를 호출한다. | [S2 OrderServices.java 2065~2215행](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L2065-L2215) | T02 미출고 수량의 부분 취소 | 소스 확인 / 실행 대기 |
| CANCEL-03 | 일반 취소 서비스의 커밋 후 이벤트에 조정 금액 재생성·총액 갱신·비동기 알림이 연결된다. | [S3 secas.xml 152~157행](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L152-L157) | T03 금액·알림 후처리 | 소스 확인 / 실행 대기 |
| CANCEL-04 | NoActions 서비스는 같은 Java 메서드를 쓰지만 위 서비스에 직접 붙는 ECA 후처리는 없다. | [S1 services.xml 278~296행](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/services.xml#L278-L296), [S3](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L152-L157) | T04 서비스별 직접 후처리 비교 | 소스 확인 / 실행 대기 |

## 추가 테스트 초안

아래 ID는 이 산출물에서 붙인 검증 계획의 식별자다. 실행 가능한 테스트가 구현됐다는 의미는 아니다.

### T01 권한 없는 취소 요청

- 연결 규칙: CANCEL-01
- 준비: 주문이 존재하고, 호출 사용자에게 해당 주문 UPDATE 권한이 없는 조건을 구성한다.
- 실행할 요청: 해당 주문의 항목·배송 그룹을 지정해 `cancelOrderItem` 호출.
- 확인할 결과: 권한 오류가 반환되고 주문·취소 수량 데이터가 바뀌지 않는다.
- 실행 결과: 미실행.
- 업무 담당자 확인: 대기.

### T02 미출고 수량의 부분 취소

- 연결 규칙: CANCEL-02
- 준비: 판매 주문의 한 항목·한 배송 그룹. 주문 수량 2, 기취소 0, 출고 0, 재고 예약 2, UPDATE 권한 있음.
- 실행할 요청: `cancelQuantity=1`로 `cancelOrderItem` 호출.
- 확인할 결과: OrderItem과 OrderItemShipGroupAssoc의 cancelQuantity가 각각 1이 되는지, 예약 취소 서비스 호출과 실제 예약 수량 변화를 확인한다. 예약 수량 1을 기대값 후보로 두고 연결 서비스까지 추적·검증한다.
- 실행 결과: 미실행.
- 업무 담당자 확인: 대기.

### T03 금액·알림 후처리

- 연결 규칙: CANCEL-03
- 준비: T02와 같은 정상 취소 조건, 금액을 비교할 기준 데이터, 외부로 실제 알림을 보내지 않는 테스트 환경.
- 실행할 요청: 일반 `cancelOrderItem` 서비스를 호출하고 트랜잭션을 정상 완료한다.
- 확인할 결과: `recreateOrderAdjustments`와 `resetGrandTotal`의 호출·처리 결과, 변경 알림 작업 등록을 확인한다. 구체적 금액 기대값은 계산 규칙을 더 추적해 확정한다.
- 범위: 알림 작업 등록과 실제 전달 성공은 별도 검증 항목이다.
- 실행 결과: 미실행.
- 업무 담당자 확인: 대기.

### T04 서비스별 직접 후처리 비교

- 연결 규칙: CANCEL-04
- 준비: 같은 초기 데이터와 입력으로 일반 취소 서비스와 NoActions 서비스를 각각 실행할 수 있게 한다.
- 실행할 요청: `cancelOrderItem`과 `cancelOrderItemNoActions`를 별도 초기 상태에서 호출한다.
- 확인할 결과: 같은 Java 메서드로 이어지는지, 일반 취소 서비스에 직접 연결된 S3 후처리의 실행 여부가 서비스별로 다른지 확인한다.
- 범위: Java 내부의 서비스 호출이나 그 서비스의 후처리까지 사라진다고 가정하지 않는다.
- 실행 결과: 미실행.
- 업무 담당자 확인: 대기.

## 기존 테스트를 연결할 때

E01은 [SalesOrderTest.testCreateSalesOrder](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/test/SalesOrderTest.java#L51-L154)다. 이 파일에서 확인한 검사는 주문 생성 뒤 주문 ID·상태 ID의 존재 여부다. 취소 규칙의 통과 근거로 쓰지 않는다. 다른 취소 테스트를 찾으면 실제 검증 내용을 읽고 해당 CANCEL ID에 연결한다.

## 갱신 기준

코드·서비스 정의·후처리 설정이 바뀌면 영향을 받는 CANCEL ID를 찾아 기능 설명서, 테스트 코드·실행 결과, 담당자 확인을 갱신한다. 소스 확인·실행 확인·업무 정책 확인의 상태를 각각 기록한다.

