# AI 연결·권한·운영 기사 대표 이미지

| 항목 | 기록 |
| --- | --- |
| 파일 | `assets/news/agent-connections-controls-v2.png` |
| 제작·확인일 | 헬로우 휴먼, 2026-10-11 |
| 크기 | PNG, 1672×941 |
| 생성 방법 | 내장 image_gen 도구로 신규 생성 후 손·팔 자세 편집, 불투명 배경 |
| 용도 | 일반뉴스 13호 상단 썸네일 및 공유 대표 이미지 |
| 내용 | 여러 도구에 연결된 AI 구체, 사람이 조작하는 실행 제어 장치, 서버 |
| 자료 성격 | 설명용 AI 생성 삽화. 실제 제품 화면·사건 재현·기업의 내부 구조도 아님 |
| 가공 | 턱을 받치던 손을 탁자에 편하게 올린 자세로 변경하고 스위치를 누르는 손과 팔을 보정. 편집 결과를 자르기 없이 복사 |
| 외부 원본·이용 조건 | 외부 이미지나 브랜드 로고를 사용하지 않은 신규 생성물. 제3자 원본의 재사용 허가에 기대지 않음. AI 생성물에 대한 독점 권리를 주장하지 않음 |
| 내용 근거 | GitHub 변경 기록, Anthropic 보고서, Reflection 발표. 개별 URL과 확인 한계는 `research/2026-10-11-agent-connections-controls.md` |

## 생성 프롬프트

```text
Use case: illustration-story. Create one polished editorial illustration for a Korean AI news article, wide landscape 16:9. Theme: AI agents connect to more tools, while humans define boundaries and retain responsibility for operating them. A warm, minimalist isometric workbench on an ivory paper-textured background. On the left, a small generic code editor object and a luminous abstract AI core with several clearly visible plug-in connectors; center, a physical translucent amber permission gate with a small manual toggle and orderly cables running through approved ports; right, a compact stack of server modules behind the gate, with one disconnected cable resting safely on the table. Emphasize connection, a deliberate control switch, and infrastructure as three coherent parts of a single elegant scene. Editorial ink outlines, subtle tactile paper and soft shadows, restrained charcoal, sage green and warm orange palette, generous breathing room, contemporary thoughtful technology magazine feel. No text, no logos, no labels, no real product UI, no scary robots, no padlock cliché, no claims that this depicts real systems or incidents. This is explanatory artwork, not an actual product screenshot.
```

## HTML 시각 자료

- 연결 설정 도식: 기본 모델·자동 시작은 GitHub 발표 범위, 접근 권한은 별도 설계 사항으로 표시.
- 날짜 도식: Reflection 10월 5일 발표, Reuters 10월 10일 협상 보도, Reflection의 10월 중 가중치 공개 계획. 마지막 단계는 점선과 ‘예정’ 문구로 구분.
- 반응형 배치와 테마 대비는 기사 전용 CSS에서 처리. 실제 제품의 조작 화면을 가장하지 않음.

## 손 자세 수정 · 2026-10-11

- 사용자 검토 의견에 따라 어색하게 구부러진 손과 손목을 수정했다. 왼손은 탁자에 편하게 놓고 오른손은 스위치를 누르는 자세로 정리했다.
- 원래 장면·색감·구도는 유지했다. 이전 이미지는 `assets/news/agent-connections-controls.png`에 보존하고, 기사·공유 이미지 참조는 `agent-connections-controls-v2.png`로 변경했다.
- 내장 image_gen 편집 도구를 사용했다. 별도 수작업 합성·크롭은 하지 않았다.

### 편집 프롬프트

```text
Use case: precise-object-edit. Edit this existing editorial illustration to correct the anatomically awkward hand beside the person's chin. Preserve the existing scene, framing, wide 16:9 aspect ratio, face/hair, dark green sweater, chair, AI sphere, amber control panel, server stack, cables, plants, cat, warm ivory paper texture, lighting, palette, and illustration style. Only revise the person's hands/forearms as needed for anatomically natural posture. Remove the awkward bent hand touching the face. Instead, show their non-operating LEFT forearm comfortably resting on the tabletop near their body, with a relaxed left hand resting palm down, correctly attached to the sleeve and wrist, with five natural fingers in a simple readable pose. Keep the operating RIGHT arm reaching to the amber panel and the right index finger touching its switch; ensure that hand also has a correctly placed thumb and naturally curled remaining fingers, with plausible proportions and a straight comfortable wrist. Two arms and two hands total, no extra or fused fingers, no twisted wrists, no isolated floating hands. Do not add text, change the objects, repaint unrelated areas, or alter the article illustration's visual concept.
```
