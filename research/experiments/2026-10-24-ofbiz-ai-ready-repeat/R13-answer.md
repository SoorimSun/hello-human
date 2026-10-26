요청하는 품목 상태는 **`ITEM_COMPLETED`**이며, **3개에 대한 재고 예약 취소를 호출하고 배송 그룹 연결은 삭제하지 않습니다.**

제공된 소스에서 확인한 계산과 분기는 다음과 같습니다.

- 배송 그룹의 `availableQuantity`는 **5−0=5**입니다. 이 계산에서는 출고 수량을 빼지 않습니다(2065~2069행).
- 항목의 `itemQuantity`는 **5−0−2=3**입니다. 이미 출고한 수량이 있으므로 `itemStatus`는 `ITEM_COMPLETED`가 됩니다(2071~2094행).
- 취소 요청 3개는 허용되며, `OrderItem`과 `OrderItemShipGroupAssoc`의 `cancelQuantity`를 각각 **3**으로 저장합니다(2104~2113행).
- 연결 삭제 조건은 취소 전 `availableQuantity == thisCancelQty`입니다. **5≠3**이므로 `deleteOrderItemShipGroupAssoc`를 호출하지 않습니다. 연결은 수량 5, 취소 수량 3으로 남습니다(2124~2134행).
- **3≥3**이므로 남은 항목 수량 전부를 취소하는 분기로 들어갑니다. 판매 주문이고 일부 출고된 상태이므로 `cancelOrderItemInvResQty(cancelQuantity=3)`를 호출한 다음, `changeOrderItemStatus(statusId=ITEM_COMPLETED)`를 요청합니다(2180~2195행). `ITEM_CANCELLED`를 요청하지 않습니다.

추가 확인이 필요한 것은 하위 서비스가 실제로 변경하는 예약 레코드·최종 예약 수량과 상태 전이 결과입니다. 해당 구현과 실행 결과는 제공되지 않았습니다. 첨부된 기존 테스트도 주문 생성 검사이므로 이 부분 출고 취소 사례의 검증 근거는 아닙니다.
