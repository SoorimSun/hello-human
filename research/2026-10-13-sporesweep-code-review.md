# SporeSweep 코드 리뷰 — 조민하 님 전달용

검토일: 2026-10-13

대상: [SporeSweep 공개 소스](https://github.com/twobeansdaddy-hue/SporeSweep/tree/63e40a5055229e051052285ce9aca1ae79316c53)

고정 커밋: `63e40a5055229e051052285ce9aca1ae79316c53`

Mode: Development Review

Product policy: none — SporeSweep 전용 정책이 없어 공통 코드 리뷰 기준 적용

Decision: Block — 아래 High 항목 해결 전 배포 보류 권고. 개발 작업 자체를 중단하라는 뜻은 아니다.

**우선 수정할 문제는 게임 종료 결과 전달 누락과 iCloud 저장 안내의 불일치다.** 실제 광고 ID를 설정할 때 적용되는 오류 분기도 수정하는 것이 좋다. 아래 3건은 코드와 설정으로 확인한 경로이며, iOS 기기에서 증상을 직접 재현한 결과는 아니다.

이번 검토는 게임 턴과 결과 처리, 화면 전환, 로컬 진행 저장, 초기화, iCloud, 광고 보상, 관련 테스트와 빌드 설정에 집중했다. 특정 PR의 변경분 리뷰나 전수 보안 감사는 아니다. Windows 환경에 Swift/Xcode 실행 도구가 없어 앱 빌드, Swift 테스트, 실기기 플레이는 수행하지 못했다.

## Findings

### 1. [High / Development] 종료 통지가 애니메이션과 함께 취소되어 결과 화면과 진행 저장이 누락될 수 있다

**주요 위치:** [BoardScene.swift 296–299행](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Sources/GameScene/BoardScene.swift#L296-L299)

**Evidence**

턴 처리에서 [게임 상태를 먼저 최종 결과로 바꾼다](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Sources/GameScene/BoardScene.swift#L873-L881). 화면에는 아직 블록 제거·낙하·점수 합산 연출이 남아 있지만, 이때 이미 `state.status`는 `.won` 또는 `.lost`일 수 있다.

앱에 결과를 전달하는 `showResult(notify: true)`는 [승패 애니메이션의 SKAction 완료 콜백](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Sources/GameScene/BoardScene.swift#L1364-L1376)에서 실행된다. 그런데 씬 크기가 바뀌면 `didChangeSize → rebuild`가 [모든 보드 액션을 취소](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Sources/GameScene/BoardScene.swift#L196-L209)한다. Apple 문서도 액션이 완료 전에 제거되면 완료 핸들러를 호출하지 않는다고 설명한다. [Apple: Getting Started with Actions](https://developer.apple.com/documentation/spritekit/getting-started-with-actions)

다시 그린 씬은 종료 상태를 발견해도 무조건 `showResult(notify: false)`를 호출한다. 앱이 `onFinish`를 등록한 경우에는 [입력을 막는 결과 상태만 켜고 반환](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Sources/GameScene/BoardScene.swift#L1412-L1418)한다. 아직 전달하지 않은 종료 결과와 이미 전달한 결과를 구분하지 않기 때문이다.

그 결과 앱은 결과 화면이나 이어하기 카드를 받지 못한다. 승리라면 `finish → conclude → model.record` 경로가 실행되지 않아 해당 판의 별·점수·첫 클리어 보상이 저장되지 않는다. [GameView 종료 콜백](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/GameView.swift#L348-L350), [결과 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/GameView.swift#L409-L427)

**발생 조건과 영향**

재현해야 할 핵심 조건은 “승패가 결정된 턴의 연출 도중 씬 크기 변경”이다. 테스트에서는 `scene.size`를 변경해 이 경로를 직접 만들 수 있다. 공개 앱은 iPhone 세로 방향으로 설정돼 있으므로, 단순히 기기를 가로로 돌리면 재현된다고 단정하지 않는다. 실제 기기에서 크기 변경이 발생하는 상황과 빈도는 확인이 필요하다.

같은 저장 지연 때문에 뒤로 가기도 점검해야 한다. [상단 뒤로 가기](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/GameView.swift#L45-L53)는 `hasPlayed`가 거짓이면 바로 화면을 닫고, 이 값은 [이미 승패가 정해진 상태에서 거짓](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/GameView.swift#L247-L250)이다. 종료 연출 중 이탈할 때 결과를 확정하거나 저장하는 처리가 없다. 이 경로의 실제 콜백 수명은 기기에서 확인해야 한다.

**Recommendation**

최소 수정은 판별 가능한 “아직 전달하지 않은 종료 결과”를 보관하고, 정상 연출 완료·씬 재배치·화면 이탈 때 정확히 한 번만 처리하는 것이다. 결과 확정과 화면 연출을 분리하면 더 안정적이다. 패배 후 이어하기는 별도 단계로 유지해야 한다.

`notify: false`를 일괄적으로 `true`로 바꾸는 수정은 피한다. 이미 끝난 판에서 재배치할 때 콜백이 중복되어 패배 시 생명을 다시 차감할 수 있다. 새 판과 이어하기 이후의 종료를 구분하는 상태도 필요하다.

**회귀 테스트**

- 마지막 이동 직후, 애니메이션 완료 전에 크기를 변경해도 종료 전달은 1회이고 결과/이어하기 화면이 나타난다.
- 승리 연출 중 화면을 나갔다 돌아와도 클리어 기록이 남는다.
- 종료 결과를 이미 전달한 뒤 크기를 여러 번 바꿔도 결과 처리와 생명 차감은 중복되지 않는다.
- 이어하기 후 다시 종료하면 새 결과를 정확히 한 번 처리한다.

기존 [resizeRebuilds 테스트](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Tests/GameSceneTests/BoardSceneTests.swift#L141-L151)는 플레이 중 재배치를 확인한다. [appOwnedResult 테스트](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameScene/Tests/GameSceneTests/BoardSceneTests.swift#L441-L455)는 이미 종료된 상태로 생성한 씬이 다시 통지하지 않는지만 확인한다. 종료 통지가 아직 대기 중인 경우가 빠져 있다.

### 2. [High / Development] 실제로 동작하지 않는 iCloud 저장을 기본 활성화된 기능으로 안내한다

**주요 위치:** [SettingsView.swift 40–45행](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/SettingsView.swift#L40-L45)

**Evidence**

설정 화면은 “iCloud에 저장” 스위치와 기기를 바꿔도 진행이 이어진다는 안내를 제공한다. 스위치의 기본값도 [켜짐](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/CloudSync.swift#L16-L19)이다.

하지만 공개 저장소에는 iCloud 키-값 저장소 entitlement 파일이나 해당 코드 서명 설정이 없고, [설계 문서도 현재 iCloud 저장이 동작하지 않는다고 명시](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L916-L920)한다. [CloudSync.pull](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/CloudSync.swift#L22-L33)은 `synchronize()`의 실패 여부도 UI에 전달하지 않는다.

Apple은 이 저장소에 [키-값 저장소 entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.ubiquity-kvstore-identifier)가 필요하며, 권한이 없으면 [synchronize가 실패할 수 있다](https://developer.apple.com/documentation/foundation/nsubiquitouskeyvaluestore/synchronize%28%29)고 명시한다.

**발생 조건과 영향**

공개 설정 그대로 빌드한 앱에서 사용자는 클라우드에 진행이 보관된다고 믿을 수 있다. 기기 교체나 앱 삭제 후 재설치 때 약속한 복원을 제공하지 못할 위험이다. 로컬 JSON 저장까지 고장 났다는 뜻은 아니다. 제작자의 미공개 서명 설정이나 별도 배포 바이너리는 검토하지 않았다.

**Recommendation**

현재 단계의 최소 수정은 스위치를 숨기거나 비활성화하고, 진행은 이 기기에 저장된다고 안내하는 것이다. iCloud 기능을 제공하려면 서명된 앱의 entitlement와 동일 계정의 두 기기 간 복원을 먼저 확인한다. 사용자 설정이 켜졌다는 사실을 동기화 성공으로 표시해서는 안 된다.

**회귀 테스트**

- 권한 없음·iCloud 미로그인·네트워크 단절 때 안내가 실제 상태와 일치한다.
- 기기 A의 클리어·복원 기록을 같은 계정의 기기 B에서 복구한다.
- 새 설치, 재설치, 앱 재실행에서도 로컬 기록과 클라우드 기록이 보존된다.
- 단순히 토글이 켜져 있다는 것으로 저장 성공을 판정하지 않는다.

### 3. [Medium / Development] 배포 환경 판별에 실패하면 실제 광고 ID를 사용한다

**주요 위치:** [RewardedAds.swift 40–53행](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/RewardedAds.swift#L40-L53)

**Evidence**

Release 빌드에서 `AppTransaction.shared`가 오류를 던지면 곧바로 `realUnitID`를 반환한다. 검증되지 않은 `.unverified` 거래도 검증된 거래와 같은 방식으로 환경을 판단한다. 따라서 “App Store에서 받은 앱만 실제 광고를 쓴다”는 함수의 약속이 오류 경로에서는 지켜지지 않는다.

이 문제는 **실제 광고 ID를 별도로 설정한 Release 빌드**에 해당한다. [공개 기본 설정](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Config/Project.xcconfig#L7-L11)은 Google의 시험용 ID이므로, 공개 저장소를 그대로 빌드하면 즉시 실제 광고가 나간다는 뜻은 아니다.

**영향**

스토어 설치 여부를 확인할 수 없는 실기기 테스트 빌드에서 실제 광고 요청이 발생할 수 있다. Google은 테스트 과정에서 실제 광고를 클릭하면 무효 활동으로 계정이 표시될 위험이 있다고 안내한다. 계정 제재가 이미 발생했다는 증거는 없다. [Google: 시험용 광고 사용 안내](https://developers.google.com/admob/ios/test-ads)

**Recommendation**

검증된 production 거래에만 실제 ID를 허용한다. 검증 실패나 환경 판별 오류는 광고 로딩 보류로 처리하고, 개발·테스트 환경에는 시험용 ID를 사용한다. 배포 환경 판별을 별도 함수로 분리하면 실제 광고 요청 없이 분기를 검증할 수 있다.

**회귀 테스트**

검증된 production, sandbox, 거래 검증 실패, 거래 조회 오류를 각각 주입해 실제 ID가 첫 경우에만 선택되는지 확인한다. 실제 광고를 클릭해 검사할 필요는 없다.

## Residual risk — iCloud 활성화 전에 추가 확인할 부분

아래는 현재 공개본에서 원격 데이터 손실이 재현됐다고 판정한 항목이 아니다. iCloud가 아직 비활성 상태이므로, 활성화 작업과 함께 확인할 조건이다.

**초기 읽기보다 쓰기가 먼저다.** [AppModel 초기화 257–262행](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/AppModel.swift#L257-L262)은 시작 아이템 지급 → 클라우드 읽기 → 변경 관찰 순서다. 시작 아이템 지급은 [save를 호출](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/AppModel.swift#L533-L542)하고, save는 [진행 전체를 클라우드 키에 쓴다](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/AppModel.swift#L666-L671). 기존 원격 기록을 읽기 전에 초기 상태를 쓸 수 있는 구조다. 실제 서버 충돌 결과는 초기 동기화와 캐시 상태에 좌우되므로, “새 설치마다 원격 기록이 삭제된다”고 단정하지 않는다.

관찰자를 먼저 등록하고 기존 값을 합친 뒤 쓰는 순서를 권한다. 최초 원격 읽기가 늦게 도착하는 상황도 검사해야 한다. Apple도 초기 다운로드 도중 쓰기를 시도하는 경우를 별도로 설명한다. [Apple: 초기 동기화 변경](https://developer.apple.com/documentation/foundation/nsubiquitouskeyvaluestoreinitialsyncchange)

**소모품과 초기화는 별도의 충돌 규칙이 필요하다.** [GameProgress.merging](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Progress/Sources/Progress/GameProgress.swift#L42-L55)은 별·점수·복원 부위는 합치지만 소모품은 클리어한 레벨 수가 많은 기기의 값으로 선택하고, 같으면 로컬 값을 유지한다. 같은 진행도의 두 기기가 가진 소모품은 수렴하지 않을 수 있다. 또한 초기화한 기기에 다른 기기의 예전 클리어 기록이 다시 합쳐질 수 있다. 초기화의 적용 범위와 소모품 충돌 시 어느 기록을 보존할지 정하고 두 기기로 검증할 필요가 있다.

## Verification

수행한 검증:

- 고정 커밋의 소스에서 결과 확정 → 애니메이션 → 콜백 → 저장 경로를 추적했다.
- 취소 시 콜백 동작, iCloud 권한·초기 동기화, 시험용 광고 조건을 Apple·Google 공식 문서와 대조했다.
- 관련 기존 테스트와 프로젝트 설정을 확인했다. 저장소 트리에서 앱 통합 테스트 타깃/디렉터리는 발견하지 못했다.
- 로컬 저장의 atomic 쓰기와 손상 파일 덮어쓰기 방지 처리를 확인했다. [ProgressStore](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Progress/Sources/Progress/ProgressStore.swift#L18-L35), [읽기 실패 시 저장 금지](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/AppModel.swift#L113-L122)

수행하지 못한 검증:

- Xcode 빌드와 Swift 패키지 테스트 실행.
- 승패 연출 중 화면 이탈·재배치의 iOS 기기 재현.
- 서명된 앱의 실제 entitlement, 두 기기 iCloud 동기화, 광고 SDK의 실기기 콜백.
- 배포 바이너리 및 미공개 Local.xcconfig의 내용.

테스트 코드가 존재한다는 사실을 이번 검토에서 테스트가 통과했다는 의미로 사용하지 않는다. 위 재현 항목을 실행하고 결과를 확인한 뒤 출시 가능 여부를 다시 판단해야 한다.

## 조민하 님에게 전달할 조언

민하 님, 현재 공개본을 기준으로 게임 결과와 저장이 연결되는 부분을 우선 살펴봤습니다. GameCore와 화면 연출을 나눈 구조, 로컬 파일을 atomic하게 저장하고 손상된 기록을 덮어쓰지 않는 처리는 잘 마련돼 있습니다.

가장 먼저 확인하면 좋을 부분은 마지막 턴의 종료 처리입니다. 승패는 이미 확정됐지만 앱에 알려 주는 콜백은 연출이 끝난 뒤 실행돼서, 그 사이 씬 크기가 바뀌면 결과 전달이 사라지는 경로가 있습니다. 종료 결과를 한 번만 확정하는 상태를 두고 연출 중단이나 화면 이탈에도 보존되게 하면 좋겠습니다. 특히 중복 통지 때문에 생명이 두 번 줄지 않는지도 함께 확인해 주세요.

iCloud는 문서에 아직 동작하지 않는다고 적혀 있는데 설정에서는 기본으로 켜져 있고 기기 변경 후 이어하기도 안내합니다. 실제 두 기기 복원 검증 전까지는 로컬 저장임을 표시하는 편이 좋겠습니다. 활성화할 때는 시작 아이템을 저장하기 전에 기존 클라우드 기록을 먼저 읽고 합치는 순서도 확인해 주세요.

마지막으로 광고 환경 조회가 실패했을 때 실제 광고 ID를 선택하는 분기를 수정하면 테스트 과정의 사고를 줄일 수 있습니다. 새 기능을 추가하기 전에 종료 연출 중 이탈·재배치, 두 기기 복원, 광고 환경 판별 실패를 우선 검증하는 것을 권합니다.

이번 피드백은 공개 소스의 정적 검토 결과입니다. 실제 기기에서의 재현과 수정 후 테스트가 남아 있습니다.
