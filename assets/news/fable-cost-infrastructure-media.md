# Fable 5.2 · ISSUE 43 미디어 기록

공통 확인일 2026-11-10 KST. 최초 발표일은 2026-11-09이며, TPU 제품 소개의 Google Cloud 재게시본은 11월 10일이다. 모든 이미지는 내용·비율·색을 변경하지 않았으며, HTML에서 반응형 크기로 표시한다. 출처 표기는 포괄적 재사용 허가를 의미하지 않는다. 별도 재배포 라이선스를 확인하지 못한 이미지는 아래에 그 상태를 명시한다.

| 파일·글 위치 | 원본·제공자 | 성격·가공·이용 조건 | 확인 |
| --- | --- | --- | --- |
| `fable-52-frontiercode.png`, Fable 성능 절 | [Anthropic 공식 발표](https://www.anthropic.com/claude-fable-and-mythos-5-2#evaluations)의 FrontierCode 2.0, Download chart as PNG 버튼 | 1560×1350, 공식 내보내기 원본. 동적 다운로드라 고정 PNG URL 없음. 공급사 자체 평가·로그 비용 축·Y축 생략·설정별 차이를 보존. 사이트가 제공하는 다운로드 기능 사용, 별도 재배포 라이선스는 미확인 | 다운로드 후 이미지 대조. High 45.3, Xhigh 49.1, Max의 점수 하락을 확인 |
| `fable-k-exaone-benchmarks.png`, K-엑사원 절 | [LG 한국어 보도자료](https://www.lg.co.kr/media/release/30760), [원본 이미지](https://www.lg.co.kr/media/release/images/67098) | 856×239 PNG. 공급사 자체 비교. 응답 URL은 확장자가 없으며 실제 PNG로 저장. 별도 재배포 라이선스 미확인 | 보도자료 브라우저 DOM에서 이미지 3개 확인 후 원본 전부 열어 봄. 비교 그래프를 채택하고 소개 배너 67096·67097은 제외. 표를 모바일·접근성 대체 텍스트로 병기 |
| `fable-tpu-8-family.png`, TPU 절 | [Google Cloud 발표](https://cloud.google.com/blog/topics/ai-infrastructure/tpu-8tx-and-tpu-8i-max), [원본](https://storage.googleapis.com/gweb-cloudblog-publish/images/8th-Gen-range_samesize.max-2200x2200.png) | 2200×1237. 제품군 공식 소개 이미지, 운용 사진·성능 실측이 아님. 별도 재배포 라이선스 미확인 | 8t/8i/8tx/8i Max 순서와 용도 표기 대조 |
| `fable-tpu-sync-architecture.png`, Sync 절 | [Google 기술 발표](https://cloud.google.com/blog/topics/ai-infrastructure/introducing-tpu-sync-fast-kv-cache-and-weight-transfer-on-tpu), [원본](https://storage.googleapis.com/gweb-cloudblog-publish/images/1-architecture_6N0ck5s.max-2100x2100.png) | 2100×791. 공식 구조도, 점선·레이어를 그대로 보존. 블로그 그림의 별도 재배포 라이선스 미확인, 코드 저장소 라이선스를 그림에 자동 적용하지 않음 | 애플리케이션/조정/메모리/전송·저장 계층 대조 |
| `#experiment` 흐름, `#routing-replay` 재생·표 | 위 발표에서 착안해 기사에서 설계한 합성 사례 | 자체 HTML/CSS/JS 설명. C 구성 4상황·4단계의 기대 상태. 외부 API 호출·실측·업무 엔진 없음. 원본 성능 수치를 차용하지 않음 | 입력·권한·버전·호출 수·최종 상태를 본문/표/JS에서 맞춤. 후속 검토에서 ‘완료’를 ‘반환’으로 고쳐 자동 검사와 정답 판정을 구분. 0/1회 호출은 자동 검사 통과를 가정한 예시 |

## 주요 소식별 확인과 선택

- Anthropic: 공식 페이지를 브라우저로 열어 평가 표·내보내기 그래프·Coding의 Play video를 확인했다. 주제인 비용과 설정 비교를 직접 보여주는 그래프를 채택. OS·생물학·하드웨어·로봇 영상은 이번 글의 분석 초점을 넓혀 제외했다. 재생이나 영상 전체 내용은 검증하지 않음.
- LG: 텍스트 추출에는 이미지가 나타나지 않았지만 실제 페이지에서 지연 로딩 이미지 3종을 확인. 모델 문서의 K-엑사원 배너도 확인했으나 중복 홍보 이미지라 제외. 공식 성능 그래프 채택.
- TPU: 제품군 이미지, 8tx·8i Max의 개별 GIF가 원문에 있음을 확인. 한 장에서 제품별 역할을 비교할 수 있는 정적 이미지를 선택. GIF는 추가하지 않음.
- TPU Sync: 공식 구조도와 P/D·prefix 성능 그림을 확인. 원리 설명에 적합한 구조도를 채택하고 측정 수치는 조건을 명시한 한국어 표로 제공.

## 남은 범위

직접 모델·API·TPU 성능 재현은 수행하지 않았다. 동영상은 기사에 임베드하지 않았다. 실제 글의 이미지 로딩·비율·모바일·테마·재생 조작 결과는 조사 노트의 로컬 검증에 남긴다.
