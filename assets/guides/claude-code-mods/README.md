# Claude Code Mods 가이드 미디어

확인·저장일: 2026-10-10. 공식 샘플은 Anthropic, 커뮤니티 사례는 각 제작자의 공개 자료입니다. 직접 실행한 화면으로 소개하지 않습니다. 원본 이미지를 수정하지 않고 저장했으며 웹페이지에서는 비율을 유지해 축소 표시합니다.

| 로컬 파일 | 원본 | 사용 위치 |
| --- | --- | --- |
| `official-cover.png` | [공식 글의 OG 이미지](https://claude.dev/blog/getting-started-with-claude-code-mods/og.png) | 가이드 표지, 홈 썸네일, 공유 메타데이터 |
| `official-demo-poster.jpg` | [공식 종합 영상의 포스터](https://claude.dev/media/6acebe833d3657a8320e610e6e2d3e850d8d7c0fdc45eaf3519c8775afc30d53.jpg) | 영상 재생 전 미리보기 |
| `token-weather-showers.png` | [Token Weather 원본](https://github.com/anthropics/claude-code-playground/blob/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/token-weather/screenshots/token-weather-showers.png) | 컨텍스트 사용률 설명 |
| `replay-theater-pane.png` | [Replay Theater 원본](https://github.com/anthropics/claude-code-playground/blob/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/replay-theater/screenshots/replay-theater-pane.png) | 편집 검토 설명 |
| `blast-radius-pane.png` | [Blast Radius 원본](https://github.com/anthropics/claude-code-playground/blob/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/claude-code/mods/blast-radius/screenshots/blast-radius-pane.png) | 실행 확인 설명 |
| `claude-image-view.png` | [Jarrod Watts의 원본](https://github.com/jarrodwatts/claude-image-view/blob/b3c412bb6d167cafade79148e95f9114ee1aad7c/claude-image-view.png) | 커뮤니티 사례의 이미지 미리보기 화면, 1734×1040 |
| `intermission-preview.png` | [Jarrod Watts의 원본](https://github.com/jarrodwatts/intermission/blob/f37a26b526c630bdea91688f3f1da733bac5ae84/intermission-preview.png) | 커뮤니티 사례의 Claude Code·Doom 분할 화면, 1726×1040 |

공식 종합 영상은 [Getting started with Claude Code mods](https://claude.dev/blog/getting-started-with-claude-code-mods/)의 FIG A, Terminal 버전입니다. 원본 [MP4](https://claude.dev/media/a4e8983c1c68c9549dbf74a7478c8e2b7932e65d881a978d51a5191e2c7ce5ac.mp4)를 `controls`, `playsinline`, `preload="none"`으로 연결했습니다. 자동 재생하지 않습니다. 재생 불가 시 원문 링크와 정적 이미지·한국어 설명으로 내용을 확인할 수 있습니다.

공개 저장소의 샘플 이미지 3장은 저장소의 Apache-2.0 라이선스를 따르며 [원본 LICENSE](https://github.com/anthropics/claude-code-playground/blob/569c5283d9a0a7ee7938df85bb32e4f48cbb8c86/LICENSE)를 `LICENSE-anthropic.txt`로 보관했습니다. 공식 블로그의 표지·포스터·영상까지 이 라이선스를 적용한다고 주장하지 않습니다. 블로그 이미지는 해당 공식 자료를 소개하는 출처 표시와 함께 사용합니다.

커뮤니티 이미지 2장은 Jarrod Watts가 각각 MIT 라이선스로 공개한 저장소의 README에 포함된 화면입니다. 각 저장소의 고정 커밋에 있는 LICENSE를 `LICENSE-claude-image-view.txt`, `LICENSE-intermission.txt`로 함께 보관합니다. Intermission 게임 엔진·게임 데이터의 라이선스는 Mod와 별개이며, 이 사이트에서 게임 프로그램·데이터를 재배포하지 않습니다.

Terminal Browser는 [제작자의 Claude Code 플러그인 README](https://github.com/zenbu-labs/terminal-browser/blob/2165ae76c9639e3996829ab0e6d54ddbd4f06ad8/claude-code-plugin/README.md)에 연결된 `tbccplugin.mp4`를 사용합니다. [원본 GitHub 첨부 주소](https://github.com/user-attachments/assets/a79e7667-6fcb-49a4-9967-44d0f942102c)를 영상 소스로 연결했으며, 만료되는 서명 URL은 저장하지 않습니다. 원본은 3424×2160, 약 16.36초이며 `controls`, `playsinline`, `preload="metadata"`로 자동 재생 없이 표시합니다. 영상 속 Claude Code는 2.1.274로 보이므로 초기 데모임을 표시했습니다. 제작자 문서에서 직접 보는 대체 링크를 함께 둡니다. 영상은 로컬에 복제하지 않습니다.

상태판 웹 체험과 HTML/CSS 흐름도는 헬로우 휴먼의 자체 교육용 구성입니다. 실제 Mod 화면이나 실행 결과가 아닙니다.
