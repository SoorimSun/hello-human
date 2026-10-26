먼저 `applications/order/servicedef/secas.xml` 152~157행을 확인해야 합니다. 부분 취소 뒤 변경 알림을 연결하는 지점입니다.

확인된 근거는 다음과 같습니다.

- `cancelOrderItem`의 `global-commit-post-run` ECA에 별도 조건 없이 `recreateOrderAdjustments` → `resetGrandTotal` → `sendOrderChangeNotification`이 선언돼 있습니다. 알림은 `async`, `persist="true"`입니다.
- `OrderServices.java` 2108~2113행은 취소 수량을 누적 저장합니다. 2180~2206행에서는 취소량이 남은 품목 수량보다 작으면 재고 예약 취소를 호출하고, `changeOrderItemStatus`는 호출하지 않습니다. 따라서 부분 수량 취소 알림을 바꾸려면 품목 상태 변경 규칙만 확인해서는 부족합니다.
- `services.xml` 278~296행의 `cancelOrderItemNoActions`는 같은 Java 메서드를 사용하지만 해당 서비스에 ECA가 붙지 않는다고 명시돼 있습니다. 이 서비스로 바꾸면 알림뿐 아니라 위 재계산 후속 작업도 빠지므로 단순 알림 차단 수단으로 교체하기는 부적절합니다.
- 같은 알림 서비스가 `secas.xml` 144~147행의 `updateOrderItems`에서도 호출됩니다. 알림 서비스 내부 조건을 바꾸면 이 경로에도 영향을 줄 수 있습니다.

추가로 확인할 내용은 실제 호출 서비스명, `sendOrderChangeNotification`의 정의·구현과 기존 발송 조건, 그리고 ECA에서 사용할 수 있는 입력·결과 값입니다. 제공된 취소 서비스에는 부분 취소 여부를 나타내는 출력이 없어 조건식을 바로 확정할 수 없습니다. ‘부분 취소’가 품목 수량 일부인지 주문 중 일부 품목 취소인지도 구분해야 합니다.

제공된 `SalesOrderTest.java` 51~154행은 주문 생성만 확인합니다. 변경 후에는 부분·전체 취소, 상태 유지·변경, 일반 품목 수정 경로에서 알림 실행 여부와 재계산 유지 여부를 별도로 검증해야 합니다.
