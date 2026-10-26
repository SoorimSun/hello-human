확인한 선택 순서는 **명시적 `cancelQuantity` → 맵의 해당 값 → 항목의 남은 수량**입니다.

- `cancelQuantity`는 선택 입력인 `BigDecimal`, `itemQtyMap`은 선택 입력인 `Map`이며 `string-map-prefix="iqm_"`가 선언돼 있습니다(`services.xml` 284~287행).
- 둘 다 들어오면 **`cancelQuantity`가 null이 아닌 한 우선**합니다. 값이 0이어도 맵을 조회하지 않습니다(`OrderServices.java` 2006, 2012~2016행).
- `cancelQuantity`가 null이고 맵이 비어 있지 않을 때, **요청의 `orderItemSeqId + ":" + shipGroupSeqId`**로 조회합니다. 예: `itemQtyMap={"00001:00001":"2"}`. Java에서 조회하는 맵 키에는 `iqm_`이나 `orderId`가 붙지 않습니다. 해당 값이 비어 있지 않으면 `new BigDecimal(...)`로 변환합니다(2013~2016행).
- 키가 없거나 값이 비어 있으면 `cancelQuantity`는 null로 남아 **`itemQuantity`를 사용**합니다(2097~2102행). 이는 `OrderItem.quantity − 기취소 수량 − 기입고 수량(구매 주문) 또는 기출고 수량(그 외)`입니다(2071~2094행).
- 배송 그룹의 잔여 수량인 `availableQuantity`로 자동 보정하지 않습니다. 선택한 취소 수량이 이를 초과하면 오류입니다(2065~2069, 2104, 2213~2215행). 맵 조회는 반복문 전에 한 번만 하므로, 각 배송 그룹의 키를 순회하며 수량을 다시 고르지도 않습니다.

추가 확인이 필요한 부분은 `iqm_00001:00001` 같은 외부 요청 필드가 실제 맵으로 변환되는 바인딩 구현과 실행 결과입니다. 제공된 생성 테스트와 미실행 T01~T04는 이 우선순위·키 누락 동작을 검증한 증거가 아닙니다.
