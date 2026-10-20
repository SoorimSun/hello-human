# 레거시 코드 전환 썸네일

- 파일: `assets/news/legacy-code-runtime-thumbnail.png`
- 생성·확인일: 2026-10-20
- 제작: OpenAI 내장 `image_gen` 도구. CLI/API 별도 호출은 사용하지 않았다.
- 크기·형식: 1672 × 941px, PNG, 2,142,398바이트.
- 용도: 일반뉴스 22호의 기사 상단, 뉴스 목록, 홈의 최신 일반뉴스 카드, OG·Twitter 공유 이미지.
- 성격: 레거시 시스템과 새 실행 환경의 연결을 표현한 AI 생성 설명용 일러스트. 실제 제품 화면·시스템 설계·성능 검증 자료가 아니다.
- 가공: 생성 결과를 원본 비율과 픽셀 그대로 저장했다. 로고·브랜드 표기·성능 수치는 넣지 않았다.
- 원본 보기: 기사 상단 이미지에서 PNG 파일로 연결한다. 기사에는 AI 생성 일러스트 캡션과 내용 중심 대체 텍스트를 제공한다.

## 최종 생성 프롬프트

```text
Use case: stylized-concept.
Asset type: a wide editorial cover and thumbnail for a Korean technology news article titled 'OpenAI improves preservation of behavior when translating legacy COBOL code'. The broader story covers migration of old software into modern execution infrastructure. Create a refined editorial illustration, landscape 16:9, around 1536 by 864 pixels.
Scene and subject: a single continuous ribbon of folded paper with precise punched rectangular patterns flows from an old charcoal mainframe and a small retro green-screen terminal on the left, through the center, and becomes neatly arranged modern modular computing blocks on the right. The visual emphasis is on careful translation and continuity: the same clean arrangement of punched marks is echoed on the outgoing paper. A small pair of identical cream output cards sits near the center foreground. This is an evocative editorial metaphor, not a technical architecture diagram.
Style: sophisticated tactile miniature sculpture with folded paper, matte ceramic, softly textured graphite metal; restrained magazine art direction. Warm ivory background, charcoal forms, muted moss-green terminal glow, selective burnt-orange connector accents. Soft directional studio lighting, natural shadows, crisp but gentle detail, generous breathing room, quiet and thoughtful mood. The subjects remain prominent and easy to recognize at thumbnail size; keep all essential forms inside the central 80 percent of the frame.
Constraints: no written text, no numbers, no code strings, no letters, no brand logos, no people, no humanoid robots, no graphs, no flags, no watermarks, no neon cyberpunk, no decorative floating UI. Opaque background. Produce one finished image.
```
