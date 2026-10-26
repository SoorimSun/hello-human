확인한 근거에 따르면, **품목 상태는 `ITEM_COMPLETED`로 변경 요청하고, 재고 예약 3개 취소를 요청하며, 배송 그룹 연결은 삭제하지 않습니다.**

- **수량 계산:** 배송 그룹의 `availableQuantity`는 `5−0=5`입니다. 여기서는 출고 수량을 빼지 않습니다. 품목의 `itemQuantity`는 `5−0−2=3`이고, 출고 수량이 양수이므로 `itemStatus`는 `ITEM_COMPLETED`가 됩니다(OrderServices.java 2065~2094행).
- **취소 수량 저장:** 요청 수량 3은 가용 수량 5 이내이므로 품목과 배송 그룹 연결의 `cancelQuantity`를 각각 3으로 저장합니다(2104~2113행).
- **연결 삭제 여부:** 삭제 조건은 `availableQuantity == thisCancelQty`입니다. `5 != 3`이므로 `deleteOrderItemShipGroupAssoc`를 호출하지 않습니다. 연결은 수량 5, 취소 수량 3으로 남습니다(2124~2134행).
- **예약과 상태 처리:** `3 >= 3`이며 일부 출고된 판매 주문이므로, 먼저 해당 항목·배송 그룹에 `cancelQuantity=3`으로 `cancelOrderItemInvResQty`를 호출합니다. 이어 `changeOrderItemStatus`에 `ITEM_COMPLETED`를 전달합니다(2180~2195행). 제공된 ECA에서 완료 상태는 `checkOrderItemStatus` 대상이며, `ITEM_CANCELLED` 조건의 예약 취소 ECA는 해당하지 않습니다(secas.xml 60~72행).

추가 확인이 필요한 것은 하위 서비스가 실제로 변경하는 예약 레코드와 주문 전체의 최종 상태입니다. 해당 구현은 발췌에 없으며, 제공된 테스트도 주문 생성 테스트여서 이 취소 사례를 검증하지 않습니다.
