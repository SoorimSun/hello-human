이 메서드는 **품목 상태를 `ITEM_COMPLETED`로 변경하도록 요청하고, 3개에 대한 재고 예약 취소 서비스를 호출하며, 배송 그룹 연결은 삭제하지 않습니다.**

제공된 `OrderServices.java`에서 확인한 근거는 다음과 같습니다.

- **수량 계산:** 배송 그룹의 `availableQuantity`는 `5−0=5`입니다. 품목의 `itemQuantity`는 출고 수량까지 빼므로 `5−0−2=3`입니다. 출고 수량이 양수여서 `itemStatus`는 `ITEM_COMPLETED`가 됩니다(2065~2095행).
- **취소 수량 저장:** 요청 수량 3은 `availableQuantity=5` 이하이므로 처리됩니다. 품목과 배송 그룹 연결의 `cancelQuantity`를 각각 3으로 저장합니다(2104~2113행).
- **연결 유지:** 삭제 조건은 `availableQuantity == thisCancelQty`입니다. `5 != 3`이므로 `deleteOrderItemShipGroupAssoc`를 호출하지 않습니다(2124~2134행).
- **예약·상태 요청:** `thisCancelQty=3 >= itemQuantity=3`이고 부분 출고된 판매 주문이므로, `cancelOrderItemInvResQty`에 `cancelQuantity=3`을 전달한 뒤 `changeOrderItemStatus`에 `statusId=ITEM_COMPLETED`를 전달합니다(2180~2195행). 제공된 ECA 설정에서 완료 상태는 `checkOrderItemStatus`로 연결됩니다(`secas.xml` 69~72행).

**추가 확인 사항:** 실제 예약 레코드의 변경 방식과 최종 예약 잔량은 하위 서비스 구현·초기 예약 데이터·실행 검증이 필요합니다. 제공된 기존 테스트는 주문 생성만 검사하며, 이 부분 출고 취소 사례의 실행 근거는 아닙니다.
