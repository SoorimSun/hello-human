# 일반뉴스 38 시각 자료

확인일: 2026-11-05 KST. 공개 페이지의 시연·공식 문서와 헬로우 휴먼의 설명 자료를 아래처럼 구분했다. 화면 발췌는 기사 인용이며 별도 재사용 허락을 확인한 것은 아니다.

| 본문 | 자료·출처 | 채택 이유와 가공 |
| --- | --- | --- |
| Pierre | `pierre-diffs-demo.png` · [Pierre 공식 Diffs 데모](https://diffs.com/), ‘Edit diffs and code’ 절. 화면 공개일 미표기. | 브라우저에 렌더링된 데모 중 제품 패널만 발췌(1,240 × 750 PNG). 파일 목록·줄 번호·삭제 줄이 보이는 예시다. Codex나 향후 통합 제품 화면으로 쓰지 않았다. OG 이미지도 동일한 화면 사용. |
| Conductor | [공식 Diff viewer 문서](https://www.conductor.build/docs/reference/diff-viewer)의 [Diff Viewer walkthrough 원본 MP4](https://meltylabs.t3.storage.dev/conductor-docs/ConductorDiffExplainer.mp4). 문서·영상 게시일 미표기. | 문서의 원본 영상(1,336 × 1,080, 약 49초)을 기본 재생 컨트롤로 연결했다. `conductor-diff-poster.jpg`는 약 2초 지점의 전체 화면 발췌(543 × 440). 대화·변경 파일 패널을 확인했다. 내보내기나 Cloud 종료 자체를 시연한 영상은 아니다. 일정은 [합류 공지](https://www.conductor.build/announcement)에 근거한 별도 HTML이다. |
| Linux | [OpenAI의 11/4 연구 원문](https://openai.com/index/a-thousand-fewer-paths-to-root/), 방법·결과 절. | 원문에서 수치를 대조했다. 원본 HTML의 일부 미디어 확인은 직접 접속 제한으로 범위가 좁다. 단계마다 증거가 달라지므로 연구 숫자를 한국어 막대 3개로 직접 그렸다(2,308을 100%로 길이만 정규화). 실제 원본 그래프나 독립 실측으로 표시하지 않는다. |
| Tencent Hy4 | `hy4-satellite-demo.jpg` · [Tencent Hy 연구팀 11/4 발표](https://hunyuan.tencent.com/research/hy4?langVersion=zh), ‘视觉与电脑任务’ 중 ‘卫星图定位’. | 제목·과제 요청과 20초 시연 중 14.4초의 물체 위치 비교 장면을 확인해 800 × 450으로 발췌. 3.5초짜리 Hy 오프닝과 구분했다. 미디어 파일 주소에는 서명 파라미터가 있어 복제·임베드하지 않고, 정지 화면과 재생 가능한 공식 발표 페이지로 연결했다. 주관사가 고른 사례이며 전체 시연의 정확도를 평가하지 않았다. |
| CodeQL | [11/4 공지](https://github.blog/changelog/2026-11-04-codeql-2-27-4-improves-accuracy-and-query-metadata/), [CLI 릴리스](https://codeql.github.com/docs/codeql-overview/codeql-changelog/codeql-cli-2.27.4/), [로그 삽입 예제](https://codeql.github.com/codeql-query-help/java/java-log-injection/). | 제품 화면보다 입력값이 로그에 도달하는 코드 경로가 핵심이다. 공식 문서의 코드 예제를 연결하고 기사에는 가상의 줄바꿈 사례를 설명했다. |
| 모임 실험 | 기사 안 LOG-07 검사 흐름. | 직접 작성한 HTML 도식. 작성자 → 검증기 → 사람의 역할, 커밋 불일치·로그 실패·검토 가능의 세 경우를 텍스트와 함께 보여준다. 미리 정한 기대 상태이며 실험 실행 기록이 아니다. |

이미지 가로세로와 공식 화면의 내용은 발췌본과 대조했다. 로컬 기사에서 이미지 디코딩을 확인했고, Chrome에서 Conductor 영상이 자동으로 시작하지 않는 상태와 키보드로 재생 후 시간이 진행되고 다시 일시 정지되는 동작을 확인했다. 전체 영상 내용을 검증한 것은 아니다. 외부 원본의 호스팅 상태에 따라 재생 가능 여부가 달라지므로 시연 문서 링크도 유지한다.
