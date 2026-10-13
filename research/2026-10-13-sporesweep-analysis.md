# SporeSweep 콘텐츠 사전 분석

확인일은 2026-10-13입니다. 헬로우 휴먼 멤버 조민하 님의 작업물이라는 정보는 사용자가 제공했습니다. 분석 대상은 공개 저장소의 커밋 `63e40a5055229e051052285ce9aca1ae79316c53`입니다.

**SporeSweep의 사례 가치는 게임 규칙, 그림과 소리, 레벨 생성과 검증, 복원 연출을 하나의 제작 과정으로 연결한 데 있습니다.** 공개 코드에는 24개 도시와 380개 레벨, 진행 저장, 광고와 플레이 기록을 위한 구현이 포함돼 있습니다. 현재 저장소로 뒷받침할 수 있는 성과는 이 구현과 제작 기록이며, 출시 성과나 실제 이용자의 재미·유지율은 별도 확인이 필요합니다.

이 문서는 콘텐츠 제작 전 사실관계와 논지를 검토하기 위한 조사 메모입니다. 앱을 빌드하거나 직접 플레이하지 않았습니다. 소스·문서·저장된 점검 자료를 읽고, 공개 이미지를 브라우저에서 확인했습니다.

## 제품이 제공하는 경험

게임의 한국어 이름은 포자 대청소입니다. 외계 포자로 오염된 도시를 방문해 같은 종류의 블록을 세 개 이상 맞추고, 오염 물질을 아래쪽 격리 컨테이너로 내려보냅니다. 한 판을 깨면 별을 받아 랜드마크의 부위를 선택해 복원합니다. [제품 소개](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/README.md)와 [게임 루프](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L89-L101)에 이 관계가 설명돼 있습니다.

일반적인 매치3 규칙에 세로로 긴 보드와 물질의 낙하 경로가 더해집니다. 설계 문서 기준 보드 폭은 8칸이고 화면에는 10행만 보입니다. 카메라가 물질을 따라 내려가므로 현재 화면에서 블록을 많이 지우는 것뿐 아니라 아래로 이동할 길을 여는 판단이 필요합니다. 같은 종류의 블록은 색과 모양을 함께 다르게 설계했습니다. [보드와 조작 규칙](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L123-L150)

진행에는 서로 다른 세 가지 보상이 있습니다.

| 진행 단위 | 행동과 보상 | 콘텐츠에서 설명할 의미 |
| --- | --- | --- |
| 한 턴 | 블록을 맞추고 특수 블록을 터뜨려 오염 물질을 내립니다. | 조작에 즉시 반응하는 퍼즐 |
| 한 도시 | 레벨에서 얻은 별로 랜드마크의 부위를 복원합니다. | 점수를 눈에 보이는 변화로 바꾸는 보상 |
| 전체 여정 | 도시의 레벨을 모두 깨면 다음 도시가 열리고 지도가 정화됩니다. | 더 넓은 세계로 이동하는 진행감 |

랜드마크 복원과 다음 도시 해금은 조건이 다릅니다. 다음 도시는 이전 도시의 레벨을 모두 클리어하면 열립니다. 지도 정화도 레벨 클리어 상태를 따릅니다. 랜드마크를 모두 복원해야 다음 도시로 간다고 설명하면 부정확합니다. [도시 해금과 완료 상태](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/AppModel.swift#L285-L330), [지도 정화 조건](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L662-L670)

복원에는 선택과 선행 조건이 있습니다. 예를 들어 숭례문의 2층 문루는 1층 문루를 먼저 복원해야 합니다. 서울에서 얻을 수 있는 별은 최대 36개이고 전체 복원 비용은 30개로 설정돼 있어 모든 레벨에서 최고 평가를 받아야 하는 구조는 아닙니다. 이는 설계상 부담을 조절한 선택이며, 실제 이용자의 만족도가 입증된 것은 아닙니다. [별과 복원 비용](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L522-L545)

## 구현 범위와 현재 상태

| 항목 | 공개 자료에서 확인한 범위 | 표현할 때의 경계 |
| --- | --- | --- |
| 플랫폼 | iOS 17 이상, Swift 6, SwiftUI와 SpriteKit, iPhone 대상 빌드 설정 | Android 지원이나 iPad 정식 지원으로 확대하지 않습니다. |
| 게임 분량 | 8개 권역, 24개 도시 단위, 정식 레벨 380개. 서울 12개와 나머지 23곳의 16개씩 | 도시 단위에는 이스터섬과 남극도 포함됩니다. 시험·샘플 데이터는 정식 레벨 수에 넣지 않습니다. |
| 퍼즐 요소 | 특수 블록 3종과 조합 6종, 장애물과 아이템 | README의 장애물 17종은 강화 콘크리트를 별도로 센 분류입니다. |
| 게임 외 화면 | 타이틀, 인트로, 도시·권역·세계 지도, 복원 화면, 설정, 엔딩 | 화면과 코드 존재는 전체 기기에서의 정상 동작을 보증하지 않습니다. |
| 저장과 보상 | 로컬 JSON 진행 저장, 생명, 일일 보상, 부스터와 아이템 | 클라우드 저장과 분리해 설명합니다. |
| 언어 | 한국어와 영어 문자열 및 언어 전환 경로 | 번역 품질과 모든 화면의 배치까지 검증하지 않았습니다. |
| 보상형 광고 | Google Mobile Ads SDK, 광고 완료·취소·실패 처리 | 광고 수익 발생이나 실제 운영 실적은 확인되지 않습니다. |
| 플레이 기록 | Firebase Analytics 이벤트와 설정 유무에 따른 비활성화 경로 | 공개 저장소에는 운영 설정 파일이 없습니다. |
| iCloud | 동기화와 진행 병합 코드 | 설계 문서에 권한 미설정으로 아직 동작하지 않는다고 명시합니다. |
| 배포 | 빌드 프로젝트와 배포 준비 코드 | 문서상 TestFlight 배포는 미완료입니다. 공개 자료만으로 현재 App Store 출시를 확인하지 못했습니다. |

주요 근거는 [README](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/README.md), [빌드 설정](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep.xcodeproj/project.pbxproj#L180-L270), [광고 연결](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/RewardedAds.swift), [플레이 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/Tracker.swift), [iCloud 상태](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L916-L926), [실기기 및 배포 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L953-L979)입니다.

무료 플레이에 선택형 보상 광고를 붙이는 방향이 문서에 있습니다. 광고의 자리는 생명 추가, 이동 횟수 추가, 아이템 획득입니다. 앱 사이에 끼어드는 전면 광고는 넣지 않는 설계입니다. 수익화 장치가 구현됐다는 사실과 수익 모델이 검증됐다는 주장은 구분해야 합니다. [생명과 광고 설계](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L289-L314)

광고 관련 설명에도 작은 조건 차이가 있습니다. README는 실제 광고가 App Store 앱에서만 나온다고 요약하지만, 코드에는 앱의 배포 환경 확인에 실패하면 설정된 실제 광고 ID로 돌아가는 경로가 있습니다. 콘텐츠에서는 “개발·시험 환경에서 시험 광고를 사용하도록 구성했다” 정도로 설명하는 편이 정확합니다. [광고 단위 선택](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/RewardedAds.swift#L34-L53)

정식 도시와 실험·샘플 레벨의 구분은 [LevelLoader](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Sources/LevelData/LevelLoader.swift#L27-L42), 권역별 도시 구성은 [RegionCatalog](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Sources/LevelData/Region.swift#L45-L123)에서 확인했습니다.

## AI가 맡은 일과 제작자의 판단

확인된 AI 활용은 게임을 만드는 과정에 집중돼 있습니다. 제작 기록에는 Claude Code를 통한 단계별 구현, ChatGPT와 Codex를 통한 이미지 생성, ElevenLabs를 통한 소리와 음악 생성이 나옵니다. 레벨 점검 봇은 생성형 AI 서비스가 아니라 게임 규칙을 이용해 수를 고르는 프로그램입니다.

| 작업 | 근거가 있는 도구와 방식 | 사람이 정하거나 확인해야 하는 것 |
| --- | --- | --- |
| 규칙과 코드 | DESIGN.md를 기준으로 Claude Code에 개발 단계를 맡기는 지시문 | 게임 방향, 단계의 완료 기준, 실제 플레이에서의 판단 |
| 그림 | ChatGPT 이미지 생성, Codex CLI의 참조 이미지와 수정 요청 | 화풍, 색과 모양의 구분, 구도, 생성 오류 |
| 자산 가공 | Python·Swift 스크립트로 배경 제거, 조각 분리, 크기 조정 | 앱에서 읽히는 크기와 경계 품질 |
| 효과음과 음악 | ElevenLabs 생성 후 길이·음량·반복 재생 가공 | 소리의 적합성, 반복 피로감, 실기기 청취 |
| 레벨 | 생성기와 시뮬레이션으로 이동 횟수·별 기준 산정 | 인간의 체감 난이도와 재미 |
| 홍보물 | 스토어 이미지·영상 합성·녹화 도구 | 소개 장면 선정과 공개 범위 |

[Claude Code 작업 지시 예시](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L1015-L1036), [이미지 제작 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/PROMPTS.md#L66-L90), [효과음 생성·가공](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/make_sounds_ai.py#L1-L30), [음악 생성·가공](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/make_music_ai.py#L1-L24), [레벨 봇](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Sources/LevelTools/Solver.swift)

공개된 첫 커밋에는 AI 공동 작성 표기가 있지만, 그것만으로 코드의 AI 작성 비율이나 특정 모델의 기여도를 계산할 수 없습니다. 제작 기간, 비용, 사람의 수정량, 이전 개발 경험도 저장소만으로 확정할 수 없습니다. “며칠 만에”, “비개발자가”, “100% AI로” 같은 표현에는 별도 제작자 근거가 필요합니다.

## 그림을 실제 게임 자산으로 바꾸는 과정

이 사례에서 가장 구체적으로 배울 수 있는 부분입니다. 생성한 그림을 앱에 넣을 때 필요한 조건을 프롬프트와 가공 도구에 함께 반영했습니다.

1. **작은 화면에서 구분되는 그림으로 수정했습니다.** 제작 기록에는 첫 그림의 검은 외곽선과 거친 질감이 실기기에서 투박해 보였다고 적혀 있습니다. 이후 둥글고 선명한 화풍으로 다시 그렸습니다. 제염 빔도 가로·세로가 잘 구분되도록 길쭉하게 바꾼 뒤, 새 블록과 어울리도록 두께를 조정했습니다. [화풍 수정](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/PROMPTS.md#L5-L7), [현재 블록과 대포](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/PROMPTS.md#L37-L43), [방향 구분 문제](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/PROMPTS.md#L138-L142)
2. **공통 참조 이미지로 도시 사이의 화풍을 맞췄습니다.** 후반 도시 생성 스크립트에는 도시별 먼 풍경·땅·건물·폐허 상태의 차이를 데이터로 적고, 카이로 그림을 공통 참조로 넣는 구조가 있습니다. 후반 15개 도시와 5개 권역 지도 제작을 묶어 처리한 기록과 코드가 일치합니다. [도시 이미지 생성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/cities_batch.py#L79-L135), [권역 지도 생성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/maps_batch.py#L23-L40)
3. **복원 전후의 위치와 크기를 유지했습니다.** 완성된 건물을 만든 뒤 그 이미지를 편집해 폐허를 만들도록 요청합니다. 두 그림의 구도가 일치해야 부위별로 겹쳐 그릴 때 자연스럽게 이어지기 때문입니다. 건물과 배경도 나눠 만듭니다. [건물의 복원 전후 생성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/cities_batch.py#L108-L127)
4. **그림의 색에 따라 제거할 배경색을 바꿨습니다.** 초록 물체가 있는 블록 시트에는 자홍색 배경을 사용합니다. 가공 코드는 배경뿐 아니라 가장자리에 남는 자홍색과 작은 얼룩을 처리하고, 격자 밖으로 넘어간 물체도 이어진 덩어리 기준으로 분리합니다. 이는 생성 결과를 규격에 맞추는 작업이 별도로 필요했다는 근거입니다. [배경 제거·조각 분리](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/cut_magenta.py#L1-L54)
5. **복원 부위를 건물 모양에 맞춰 다시 정의했습니다.** 후반 도시의 건물을 가로 띠로 일괄 분할하던 방식에서, 에펠탑의 다리·전망대·철탑 몸통처럼 건축물 모양에 맞는 부위로 바꿨습니다. 한 표에서 복원 비용·선행 조건·영역과 Swift 그림 코드를 함께 생성합니다. [부위 수정 이유](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L635-L645), [데이터와 코드 함께 생성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/landmark_shapes.py#L151-L182)

랜드마크 화면은 복원된 부위 집합을 보고 폐허 또는 복원 이미지의 해당 영역을 골라 그립니다. 하늘과 땅은 별도 영역과 색상 필터로 상태를 표현합니다. 세계·권역 지도 역시 오염된 그림 위에 정화된 그림을 부분적으로 드러냅니다. 따라서 여러 복원 상태를 표현하기 위해 상태마다 완성 그림을 따로 생성하는 부담을 줄이는 구조로 해석할 수 있습니다. [랜드마크 합성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/LandmarkView.swift#L160-L211), [지도 합성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep/PurifiedMap.swift#L27-L50)

공개된 [뉴델리 비교 이미지](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/newdelhi_compare.jpg)에서는 위쪽보다 아래쪽의 건물이 크게 표현되고, 주변 도시 풍경과 광장·식생이 더해진 차이를 확인했습니다. 정적인 비교 이미지 관찰이며 직접 플레이한 결과는 아닙니다.

## 반복 수정과 검증을 가능하게 한 구조

게임 규칙은 화면과 분리된 GameCore 패키지에 있습니다. 앱에서 한 번 움직이면 코어가 새 보드 상태와 일어난 사건 목록을 반환하고, SpriteKit 화면은 그 사건들을 연출합니다. 같은 레벨의 같은 입력 순서에는 같은 결과가 나오도록 난수 시드를 관리합니다. [모듈과 턴 처리 설계](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L818-L835), [턴 결과·이벤트](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Sources/GameCore/GameEvent.swift#L178-L240), [턴 처리](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Sources/GameCore/GameState.swift#L250-L280)

이 선택의 의미는 화면을 매번 조작하지 않아도 게임 규칙을 검사하고, 문제가 생긴 입력을 재현할 수 있다는 데 있습니다. 설계 문서도 AI 코딩 에이전트가 수정한 뒤 기존 기능이 깨지는 문제를 잡기 위해 규칙을 분리한다고 설명합니다. 다만 모듈 분리와 테스트 수가 모든 버그를 막는다는 뜻은 아닙니다.

레벨 생성기는 판을 만드는 일과 난이도를 재는 일을 연결합니다. 평범하게 두는 봇이 일정 비율로 클리어할 이동 횟수를 고르고, 성공 판의 점수 분포로 별 기준을 정합니다. 기본 기준은 클리어율 약 70%, 별 2개는 성공 점수의 중간, 별 3개는 상위 약 20% 경계입니다. [난이도·별 기준 산정](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Sources/LevelTools/Calibration.swift#L23-L65)

봇의 “평범함”은 측정된 인간 모델을 뜻하지 않습니다. 코드에서는 일정 확률로 물질을 많이 내리는 수를 고르고 나머지에는 임의의 가능한 수를 고릅니다. 유리한 수를 찾을 때 후보를 실제 엔진으로 한 턴 진행해 평가합니다. 사람의 시각과 판단을 그대로 모사한 것으로 소개하면 안 됩니다. [봇의 수 선택](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Sources/LevelTools/Solver.swift#L40-L69)

## 테스트와 레벨 점검 자료의 해석

소스에서 `@Test` 선언 수를 전수 집계한 결과 README의 511개와 일치했습니다. 테스트 파일은 51개입니다.

| 패키지 | 테스트 선언 수 | 주요 범위 |
| --- | --- | --- |
| GameCore | 304 | 매치, 특수 블록, 낙하, 장애물, 물질, 점수와 아이템 |
| LevelData | 109 | 데이터 로딩과 검증, 도시 구성, 레벨 생성과 보정 |
| GameScene | 64 | 씬의 배치와 사건 연출, 효과음과 음악 |
| Progress | 34 | 진행 저장, 생명, 일일 보상과 진행 병합 |

이는 테스트 정의의 수입니다. 매개변수 테스트와 환경변수 조건으로 켜지는 테스트가 있으므로 실제 실행 사례 수나 통과 수와 같다고 쓰지 않습니다. 이번 Windows 환경의 PATH에는 Swift와 Xcode 도구가 없어 테스트를 재실행하지 않았습니다. [README 테스트 설명](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/README.md), [선택 실행되는 보정 테스트](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Tests/LevelDataTests/CalibrationTests.swift#L45-L50)

2026-10-09자 제작자 보고서와 저장된 CSV를 대조한 결과는 다음과 같습니다.

| 기록 | 확인한 수치와 조건 | 입증 범위 |
| --- | --- | --- |
| 봇 점검 | 380레벨 × 200판 × 2개 정책. 정책별 76,000판, 합계 152,000판 | 보고서의 실행 규모이며, 이번에 다시 실행한 수는 아닙니다. |
| 클리어율 | 주로 평가하는 봇의 레벨별 값은 56~100%, 중앙값 77% | 고정된 레벨 시작 상태에서 행동 시드를 달리한 봇 결과입니다. |
| 진행 불능 수정 | 주 평가 봇의 수정 전 76,000판 중 41판·24레벨에서 이동이 남은 실패. 수정 후 CSV에서는 0판 | 관측한 표본에서 해당 실패가 사라졌다는 뜻입니다. |
| 앱 점검 | 도시별 마지막 레벨 24판. 성공 17판·실패 7판 모두 결과 화면 도달 | 제작자 보고서에 기록된 시뮬레이터 점검입니다. 모든 레벨·기기·수동 조작을 검사한 것은 아닙니다. |

[점검 보고서](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Reports/LEVEL_AUDIT.md), [수정 전 CSV](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Reports/level_audit_before.csv), [수정 후 CSV](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Reports/level_audit.csv)

수정 내용도 구체적입니다. 슬러지가 늘어나 블록을 채울 길이 막히자 활성 구간에서 번질 수 있는 양에 상한을 뒀습니다. 섞어도 가능한 수가 없으면 일반 블록 하나를 폭탄으로 바꾸는 복구 경로를 추가했습니다. 숫자만 제시하는 것보다 “어떤 실패를 발견해 어떤 규칙을 바꿨는지”를 보여주는 콘텐츠 소재로 적합합니다. [발견과 수정 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Reports/LEVEL_AUDIT.md#L22-L28), [슬러지 상한](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Sources/GameCore/GameState.swift#L823-L825), [폭탄으로 복구](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Sources/GameCore/GameState.swift#L1137-L1150)

봇은 안개 아래 정보까지 이용하고 피로감이나 답답함을 느끼지 않습니다. 이동 수를 비슷한 목표 클리어율에 맞추기 때문에 도시별 성공률은 대체로 비슷해집니다. 후반에 보드와 장애물이 늘어나는 것과 후반이 체감상 더 재미있거나 적절히 어려워지는 것은 다른 문제입니다. 보고서도 인간 플레이 테스트가 필요하다고 적었습니다.

회귀 테스트에는 [슬러지 확산 상한](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Tests/GameCoreTests/SludgeLimitTests.swift#L6-L20)과 [폭탄으로 진행을 복구하는 경우](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Tests/GameCoreTests/RescueTests.swift#L6-L24)가 따로 정의돼 있습니다. [같은 입력·저장 복원 결과](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/GameCore/Tests/GameCoreTests/DeterminismTests.swift#L86-L110)와 [후반 도시 레벨의 클리어 경로](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LevelData/Tests/LevelDataTests/LaterCitiesTests.swift#L24-L61)를 검사하는 코드도 있습니다. 이 테스트 정의들은 보고서의 수정 내용과 연결되지만 이번에 실행 통과를 확인한 것은 아닙니다.

## 문서와 현행 구현을 구분할 지점

- **v0.37은 설계·개발 기록의 표기입니다.** Xcode의 `MARKETING_VERSION`은 0.1이고 공개 GitHub Release는 없었습니다. “v0.37 정식 출시”로 표현하지 않습니다.
- **개발 기간은 알 수 없습니다.** 공개 커밋은 하나이고 커밋 메시지는 기존 프로젝트를 처음 정리해 올렸다고 설명합니다. 기획서 날짜와 저장소 생성일을 빼서 전체 개발 기간을 계산하지 않습니다.
- **기획서는 수정 이력이 누적된 문서입니다.** 앞부분에 초기 초안 설명이 남고, 후반에도 380개 레벨 구현 설명과 이전 미결정 항목이 함께 있습니다. 실제 데이터와 구체적인 최신 상태 문장을 우선합니다.
- **iCloud는 코드 존재와 동작 완료가 다릅니다.** 동기화 코드는 있지만 문서에 미동작이라고 적혀 있고, 확인한 트리와 빌드 설정에는 entitlement 연결이 없습니다.
- **난이도 보고서의 요약에도 작은 어긋남이 있습니다.** 도시별 평균을 74~82%로 요약했으나 표에는 도쿄 83%가 나옵니다. 콘텐츠에서 이 범위를 그대로 쓰지 않습니다.
- **후반 15개 도시의 실기기 검증은 제한돼 있습니다.** v0.32 기록은 이 도시들을 일괄 추가했고 실기기에서 해 보지 않았다고 밝힙니다. 이후 도시별 마지막 레벨을 시뮬레이터에서 검사한 기록이 있어도 전체 레벨의 인간 플레이 검증을 대체하지는 않습니다.

[설계 이력](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L17-L87), [빌드 버전](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/SporeSweep.xcodeproj/project.pbxproj#L222-L240), [첫 공개 커밋](https://github.com/twobeansdaddy-hue/SporeSweep/commit/63e40a5055229e051052285ce9aca1ae79316c53), [배포·플레이 미완료 기록](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/DESIGN.md#L967-L979)

## 콘텐츠로 다룰 가치와 필요한 추가 근거

가장 근거가 탄탄한 논지는 **“AI로 만든 여러 결과를 일관된 게임 경험으로 연결하고, 실제로 드러난 문제를 수정한 제작 과정”**입니다. 코드, 아트, 음악, 레벨과 테스트가 각각 어떤 역할을 했는지 설명할 수 있습니다. 제작자의 작업량이나 경제적 성과를 추정하지 않아도 충분히 구체적인 사례가 됩니다.

보조 논지로는 다음 세 가지가 유용합니다.

| 관점 | 핵심 장면 | 이미 확보한 근거 |
| --- | --- | --- |
| 사람의 감각과 판단 | 투박한 그림과 구분하기 어려운 대포를 다시 그린 과정 | 실기기 피드백 기록, 아트 수정 문서 |
| 생성 결과의 제품 적용 | 그림의 배경을 지우고 건물 부위를 나누어 복원 상태를 표현 | 생성 프롬프트, 가공 코드, 비교 이미지 |
| 자동화의 성과와 한계 | 380개 레벨의 봇 점검으로 막힘을 줄인 과정 | 보고서, 전후 CSV, 수정 코드와 테스트 |

후속 인터뷰에서 가장 가치 있는 확인 사항은 다음과 같습니다.

1. 게임을 만들게 된 계기와 조민하 님이 꼭 살리고 싶었던 경험은 무엇인가요.
2. 실제 제작 기간, 본인의 개발·게임 제작 경험, 사용한 도구별 역할은 무엇인가요.
3. AI가 제안한 것 중 채택·수정·거절한 대표 사례는 무엇인가요.
4. 본인 외에 누가 어느 정도 플레이했고, 특히 후반 도시에서 어떤 피드백을 받았나요.
5. 현재 TestFlight·App Store 배포 상태와 직접 확인할 수 있는 시연 자료가 있나요.
6. 소개 글에 사용할 화면·비교 이미지·짧은 플레이 영상을 어디까지 공개할 수 있나요.

이는 제작자에게 보낼 메시지가 아니라 이후 콘텐츠 준비에 필요한 질문 목록입니다. 이번 조사에서는 외부 연락을 보내지 않았습니다.

## 공개 자료와 이미지 취급

라이선스는 열람·학습과 개인 기기에서의 빌드·실행을 허용하는 자체 조건입니다. 자료의 재배포·공개·상업적 이용은 서면 허락 없이 허용하지 않는다고 적혀 있습니다. 따라서 일반적인 자유 재사용 오픈소스 프로젝트로 소개하지 않고 “학습용으로 소스와 제작 기록을 공개한 프로젝트”로 표현합니다. [저장소 LICENSE](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/LICENSE)

| 자료 | 확인한 성격 | 사용 시 표시할 내용 |
| --- | --- | --- |
| [overview.jpg](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Docs/images/overview.jpg) | 제작자의 4개 화면 소개 이미지. 브라우저에서 확인 | 제작자 제공 홍보 합성 이미지. 직접 캡처나 무가공 게임 화면으로 표기하지 않습니다. |
| [newdelhi_compare.jpg](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/newdelhi_compare.jpg) | 랜드마크 표현을 수정한 전후 비교. 브라우저에서 확인 | 제작자 비교 이미지이며 실제 앱을 새로 실행해 재현한 결과는 아닙니다. |
| [Art/PROMPTS.md](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Art/PROMPTS.md) | 화풍과 구도, 수정 요청의 기록 | 이미지 원본 자체와 제작 기록의 증거를 구분합니다. |

스토어 이미지 제작 코드에는 폐허 화면과 복원 화면의 반쪽을 합치는 처리가 있습니다. overview의 반반 비교를 게임 안의 실제 비교 모드라고 소개하면 안 됩니다. [홍보용 비교 합성](https://github.com/twobeansdaddy-hue/SporeSweep/blob/63e40a5055229e051052285ce9aca1ae79316c53/Tools/make_store_shots.py#L69-L98)

원본 작업 파일과 Marketing 폴더는 공개 저장소에서 제외돼 있습니다. 도구 코드가 공개됐다는 사실만으로 모든 이미지·홍보물을 그대로 재생성할 수 있다고 설명하지 않습니다. 이번 작업에서는 원본 이미지와 소리를 hello-human 저장소로 복사하지 않았습니다.

## 이번 확인의 범위

- 고정 커밋의 README, DESIGN, 아트 기록, 라이선스, 핵심 게임·앱·가공 도구 코드를 읽었습니다.
- 정식 레벨과 테스트 선언 수를 소스 기준으로 집계했고, 전후 점검 CSV의 주요 수치를 다시 계산했습니다.
- GitHub에서 공개 커밋 하나, Release 없음, Actions 실행 기록 없음을 확인했습니다. 자동 테스트 정의와 CI 실행 증거를 구분했습니다.
- 공개 소개 이미지와 뉴델리 비교 이미지를 브라우저에서 확인했습니다.
- 앱 빌드, Swift 테스트 실행, 실제 플레이, 광고 노출, Firebase 전송, iCloud 동기화는 재현하지 않았습니다.
- 콘텐츠 원고·소개 페이지·홈에는 반영하지 않았습니다. 이 메모만 로컬 조사 자료로 작성했습니다.
