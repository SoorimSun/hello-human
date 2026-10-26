요청하는 품목 상태는 **`ITEM_COMPLETED`**이며, **3개에 대한 재고 예약 취소를 호출하고 배송 그룹 연결은 유지합니다.**

확인한 근거는 다음과 같습니다.

- **수량 계산:** 배송 그룹의 `availableQuantity`는 `5−0=5`입니다. 품목의 `itemQuantity`는 기취소와 출고량을 빼서 `5−0−2=3`입니다. 출고량은 품목 잔량에서만 차감됩니다(`OrderServices.java` 2065~2094행).
- **취소 수량 저장:** 요청량 3은 연결의 가용 수량 5 이하이므로 품목과 배송 그룹 연결의 `cancelQuantity`를 각각 3으로 저장합니다(2104~2113행).
- **연결 유지:** 삭제 조건은 `availableQuantity == thisCancelQty`인데 `5 != 3`이므로 `deleteOrderItemShipGroupAssoc`를 호출하지 않습니다(2124~2134행).
- **예약 처리와 상태 요청:** 이미 2개가 출고되어 `itemStatus`는 `ITEM_COMPLETED`입니다. 취소량 3이 품목 잔량 3 이상이고 판매 주문이므로 `cancelOrderItemInvResQty`에 해당 주문·품목·배송 그룹과 `cancelQuantity=3`을 전달한 뒤, `changeOrderItemStatus`에 `ITEM_COMPLETED`를 요청합니다(2090~2094, 2180~2195행). `ITEM_CANCELLED` 조건의 예약 취소 ECA는 적용되지 않으며, 완료 상태에는 `checkOrderItemStatus`가 연결되어 있습니다(`secas.xml` 60~72행).

추가 확인이 필요한 부분은 하위 서비스가 실제로 어떤 예약 행을 얼마나 변경하는지와 주문 전체 상태의 후속 결과입니다. 제공된 발췌에는 그 구현이 없으며, 제시된 테스트도 이 취소 사례를 검증하지 않습니다.
