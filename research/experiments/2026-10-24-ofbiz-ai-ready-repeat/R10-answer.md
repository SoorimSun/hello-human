이 메서드는 **품목 상태를 `ITEM_COMPLETED`로 변경하고, 재고 예약 3개를 해제하도록 요청하며, 배송 그룹 연결은 삭제하지 않습니다.**

제공 소스에서 확인되는 근거는 다음과 같습니다.

- **수량 계산:** 배송 그룹의 `availableQuantity`는 출고량을 빼지 않아 `5−0=5`입니다. 항목의 `itemQuantity`는 출고량까지 빼므로 `5−0−2=3`입니다. 출고량이 0보다 커서 `itemStatus`는 `ITEM_COMPLETED`로 설정됩니다(2065~2094행).
- **취소 수량 저장:** 요청 수량 3은 가용 수량 5 이내이므로, 항목과 배송 그룹 연결의 `cancelQuantity`를 각각 3으로 저장합니다(2104~2113행).
- **연결 유지:** 삭제 조건은 `availableQuantity == thisCancelQty`입니다. `5 != 3`이므로 `deleteOrderItemShipGroupAssoc`를 호출하지 않습니다(2124~2134행).
- **예약·상태 요청:** `thisCancelQty >= itemQuantity`, 즉 `3 >= 3`이며, 부분 출고된 판매 주문이므로 `cancelOrderItemInvResQty`에 취소 수량 3을 전달한 뒤 `changeOrderItemStatus`에 `ITEM_COMPLETED`를 전달합니다(2180~2195행).

추가로 확인할 것은 하위 서비스의 실제 예약 데이터 변경과 상태 반영 결과입니다. 제공 자료에는 그 구현과 이 사례의 실행 검증이 없습니다. 다만 제시된 ECA상 완료 상태에는 `checkOrderItemStatus`가 연결되며, `ITEM_CANCELLED` 조건의 예약 취소 ECA는 이 요청에 해당하지 않습니다(60~72행).
