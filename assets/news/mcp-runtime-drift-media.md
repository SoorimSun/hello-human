# MCP 실행 환경 · Fable 코드 그림 미디어

확인일: 2026-11-16. 기사: `news/2026-11-16-mcp-runtime-drift.html`.

## MCP / Corelight·CSA

- [Corelight 원문](https://corelight.com/blog/mcp-server-supply-chain-risk)은 웹 텍스트와 브라우저의 실제 이미지·영상 요소를 확인했다. 로고·제휴사·수상 배지 외에 이번 조사 결과를 설명하는 원본 그림·영상은 확인되지 않았다. 원문에는 관찰값·비교 표가 있다.
- [CSA 노트](https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-server-dependency-drift-20261115-csa-s/)의 HTML 본문과 표를 확인했다. 별도 다운로드 PDF는 확인하지 않았다. [uv 공식 기술 문서](https://docs.astral.sh/uv/concepts/tools/)와 [npm 잠금 파일 문서](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)도 검토했다.
- 채택: `#mcp-observations`의 수치 묶음과 고정 범위 비교도. 자체 HTML 설명 자료로 표시. 수치 묶음은 한 서버의 관찰값만 사용하고 서로 다른 단위의 값을 공통 축에 그리지 않았다.
- 제외: 로고·일반 보안 제품 홍보 자료. 이번 설치 방식 설명에 추가 정보가 적다.

## Jake Eaton / 주차장 그림

- 제작자: Jake Eaton, Anthropic 직원의 개인 공개 사례. 한국시간 2026-11-10 04:25 게시.
- [제작 과정](https://x.com/jkeatn/status/2119874007382299087), [그림 원본 게시물](https://x.com/jkeatn/status/2119874018706874601)을 브라우저에서 직접 확인했다.
- 이미지: `https://pbs.twimg.com/media/HWtMXeqboAA3yPD?format=webp&name=large`
- 최초 원문 로딩 때 600×400으로 보였으나 기사에서 완전히 로드된 원본은 2048×1365로 확인했다. HTML 크기를 최종 원본에 맞췄다. 자르기·주석 추가 없이 제작자 공개 이미지임을 표시하고 원문으로 연결한다.
- 원본 파일은 외부 참조하며 로컬 복제하지 않았다. 별도 재배포 라이선스는 확인하지 못했다. 권리를 확보했다는 주장은 하지 않는다.
- The Decoder의 상단 Nano Banana Pro 생성 대표 이미지는 이번 실험 결과의 증거가 아니므로 제외했다.

## Michael Graczyk / 새 그림 시연

- 제작자: Michael Graczyk. 한국시간 2026-11-10 09:02 게시.
- [원문](https://x.com/mgrczyk/status/2119943813028548721), [공개 대화](https://claude.ai/share/d72e01a0-811f-46d1-97e8-a5876c879481)를 직접 열었다.
- 원문 브라우저에서 영상 재생 상태·시간 진행과 화면을 확인했다. DOM 메타데이터는 길이 21.033333초, 1080×1350. 원문이 사용하는 HLS는 여러 조각이며 초기 MP4 조각을 전체 파일로 취급하지 않았다.
- 기사에 연결한 완전한 MP4: `https://the-decoder.com/wp-content/uploads/2026/11/graczyk_demo.mp4`
- 영상 게재 페이지: [The Decoder, 2026-11-15](https://the-decoder.com/anthropics-claude-fable-5-2-doesnt-generate-images-it-paints-them/).
- 포스터: `https://pbs.twimg.com/amplify_video_thumb/2119943795248967680/img/_IdEyqIlkg5YDN-I?format=webp&name=medium`
- 제작자 영상이 매체에 게재된 경로라는 점을 캡션에 공개했다. 외부 연결이며 로컬 재업로드·편집 없음. 별도 재배포 라이선스 미확인.
- `controls playsinline preload="metadata"` 사용, autoplay·loop 없음. 4:5 비율, 최대 너비 480px. 원문 링크를 항상 제공한다.
- 시연 화면과 공개 대화 확인을 작업 재현·모델 성능 검증과 구분한다. 21초는 별도로 만든 순차 재생 영상 길이이며 실제 모델 작업 시간이 아니다.

## 실험 도식

- 전체 흐름 3단계와 조건별 기대 상태 표는 모임의 제안. 실제 코드 실행·환경 변조·패키지 설치를 수행하지 않았다.
- 입력·규칙·결과를 정적으로 제공해 JavaScript 없이도 읽힌다. 가로 흐름은 좁은 화면에서 세로로 배열한다.
- 화면 확인 결과는 조사 기록에 함께 남긴다.
