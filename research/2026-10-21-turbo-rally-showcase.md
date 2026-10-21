# TURBO RALLY 작업물 소개 확인

- 확인일: 2026-10-21 (한국시간).
- 최초 요청: 최태준 회원의 새 게임을 분석해 작업물 소개에 추가하고 푸시는 보류. 검토 후 사용자가 커밋·푸시를 요청함.
- 서비스: https://turbo-rally.onrender.com/
- 저장소: https://github.com/fdx5/turbo_rally
- 확인 커밋: `fc8aef879cde842dbf3d4bddd09fffa2c4467232`.
- 반영 대상: `works/choi-taejun.html`, 홈의 회원 작업물 카드, 7개 항목 목차, 실제 화면과 출처 기록.

## 기능과 근거

| 내용 | 근거 | 소개 범위 |
| --- | --- | --- |
| 플레이어 1명 + AI 7대, 3랩 레이스 | [raceSetup.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/game/raceSetup.ts)의 `buildField`, 배포 화면 | 온라인 8인 멀티플레이로 소개하지 않음 |
| 쉬움·보통·어려움, 타임어택·연습 | [Select.tsx](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/ui/screens/Select.tsx), [MainMenu.tsx](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/ui/screens/MainMenu.tsx), 배포 화면 | 쉬움 레이스로 직접 진입. 나머지 모드를 완주했다고 주장하지 않음 |
| 타임어택 고스트 | [race.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/race/race.ts)의 고스트 생성·기록·재생, 메뉴 | 구현을 확인했으며 기록 경쟁·리더보드의 전 과정을 실측한 것은 아님 |
| 캐릭터 8종·차량 20종·트랙 8종 | [characters.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/data/characters.ts), [vehicles.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/data/vehicles.ts), [tracks.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/data/tracks.ts), 선택 화면 | 전체 구성 수이며 처음부터 전부 사용할 수 있다는 뜻이 아님. 캐릭터 보정·차량 고유기도 데이터에 정의됨 |
| 트랙·차량 잠금 해제 | Select.tsx의 트랙 입상·회원 조건, vehicles.ts의 시작·레벨·별·골드 조건 | 일부 트랙·차량 구매는 회원 전용임을 표시 |
| 키보드·게임패드·터치 | [input.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/core/input.ts) | 방향키/WASD, Space 드리프트, Shift/E/X 아이템, Q/Z 고유기. 게임패드·실제 터치 기기는 직접 검증하지 않음 |
| React·TypeScript·Vite·Three.js | [package.json](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/package.json) | 불필요한 패키지 버전은 소개에서 생략 |
| 절차적으로 생성한 3D 모델·텍스처, Web Audio BGM 13곡·효과음 | [CREDITS.md](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/assets/CREDITS.md), [DECISIONS.md](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/docs/DECISIONS.md) | 제작 기록으로 귀속. 음악을 Suno 등 생성형 음악 서비스 결과로 소개하지 않음 |
| MeloTTS 한국어 음성 → Praat 음색 조정 → Whisper 발음 검수 | CREDITS.md, DECISIONS.md | 문서에 기록된 제작 과정이며 모든 음성을 직접 검수한 것은 아님 |
| 게스트 이용·Render 배포 | 배포 서비스, [profileStore.ts](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/src/net/profileStore.ts), [render.yaml](https://github.com/fdx5/turbo_rally/blob/fc8aef879cde842dbf3d4bddd09fffa2c4467232/render.yaml) | 계정을 생성하지 않았으며 실제 운영 플랜은 표기하지 않음 |

## 직접 확인한 화면과 편집 판단

- 서비스의 초기 Render 시작 대기를 거친 뒤 게스트로 진입했다.
- 대전 레이스 → 쉬움 → 한강 벚꽃 피크닉 파크 → 모모 → 기본 택배 트럭 → 출발을 확인했다. 키보드 주행 시 속도 변화와 일시정지도 확인했다.
- 캐릭터 선택과 레이스 출발 전 소개 장면을 저장했다. 이미지별 정보는 `assets/works/README.md`에 기록했다.
- 전체 트랙·차량을 해금하거나 3랩을 완주하지 않았다. 타임어택 기록 제출·회원 구매·계정 저장 등은 직접 검증하지 않았다.
- 개발 명세의 목표만으로 구현을 판단하지 않고 실제 데이터·화면·레이스 구성 코드를 대조했다.
- 코딩 모델명·개발 기간은 확인되지 않아 적지 않았다. 이전 RAMPAGE 2026의 REA·Rizin이나 다른 게임의 Suno 사용을 이 작품에 옮기지 않았다.
- 작업물은 총 7편, 그중 게임은 6편이다. 홈 카드·페이지 메타 설명·목차·본문을 함께 맞추고, 목차는 PC에서 4+3, 모바일에서 2열로 배치했다.
- 공통 `showcase.css` 변경에 맞춰 이를 참조하는 네 HTML의 캐시 버전을 함께 올렸다. 다른 회원의 소개 본문은 수정하지 않았다.

## 반영 검증

- `node --test`: 기존 테스트 7개 통과.
- `git diff --check`: 공백 오류 없음.
- 변경된 HTML 4개의 로컬 참조 144개, 중복 ID, 내부 앵커, 외부 링크 속성, 검색 차단 메타를 확인했다.
- 새 이미지 두 장의 JPEG 형식과 실제 1280×720 크기를 확인했다. 페이지에서도 정상 로드되었다.
- 브라우저에서 홈 카드의 7개 작업물, 목차 이동, PC 2열 본문과 모바일 1열 본문, 모바일의 2열 목차 및 마지막 항목 전체 너비를 확인했다.
- 기본 PC 화면과 390×844 모바일 화면에서 가로 넘침이 없었으며 라이트·다크 모드의 이미지·본문·사실 표를 확인했다. 모바일 테스트 후 뷰포트 설정을 원래대로 복구했다.
- 최초 검토 시 변경사항을 로컬에만 남겼다. 이후 사용자의 후속 요청에 따라 커밋·푸시를 진행한다.
