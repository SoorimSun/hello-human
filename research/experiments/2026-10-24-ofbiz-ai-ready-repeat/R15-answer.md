이 메서드는 **품목 상태를 `ITEM_COMPLETED`로 변경하고, 재고 예약 3개를 해제하도록 요청하며, 배송 그룹 연결은 삭제하지 않습니다.**

제공 코드에서 확인되는 근거는 다음과 같습니다.

- 배송 그룹의 `availableQuantity`는 출고량을 빼지 않아 `5−0=5`입니다. 품목의 `itemQuantity`는 출고량까지 빼서 `5−0−2=3`이고, 출고량이 있으므로 `itemStatus`는 `ITEM_COMPLETED`가 됩니다(`OrderServices.java` 2065~2095행).
- 취소 수량 3은 가용 수량 5 이하이므로 처리됩니다. 품목과 배송 그룹 연결의 `cancelQuantity`를 각각 3으로 저장합니다(2104~2113행).
- 연결 삭제 조건은 `availableQuantity == thisCancelQty`입니다. `5≠3`이므로 `deleteOrderItemShipGroupAssoc`는 호출하지 않습니다(2124~2134행).
- `thisCancelQty >= itemQuantity`, 즉 `3>=3`이므로 남은 수량 전체 취소 분기로 들어갑니다. 판매 주문이고 일부 출고되었으므로 `cancelOrderItemInvResQty`에 취소 수량 3을 전달한 뒤, `changeOrderItemStatus`에 `ITEM_COMPLETED`를 전달합니다(2180~2195행).

제공된 ECA에서도 완료 상태에는 `checkOrderItemStatus`가 연결되어 있으며, `ITEM_CANCELLED`용 예약 취소 ECA 조건은 충족하지 않습니다(`secas.xml` 60~72행).

추가 확인이 필요한 것은 하위 서비스가 실제로 변경하는 예약 레코드와 최종 주문 전체 상태입니다. 해당 구현은 발췌에 없고, 제공된 테스트도 이 취소 사례를 검증하지 않습니다.
