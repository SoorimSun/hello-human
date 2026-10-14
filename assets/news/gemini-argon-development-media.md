# ISSUE 16 공식 이미지 출처

확인일: 2026-10-14. 두 이미지를 원문에서 확인하고, 내려받은 파일을 직접 열어 확인했다. 자르기·합성·문구 삽입 없이 제공된 원본을 사용한다. 저작자는 Google이며 별도의 자유 재배포 라이선스를 확인한 것은 아니다. 기사에 제공자와 원문 링크를 표시한다.

## 일반 공개 이미지

- 파일: `gemini-4-argon-ga-official.png` (1300×731 PNG)
- 원문: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
- 제공 주소: https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-4-argon__blog-header__2784x1566.width-1300.png
- 발견 위치: 10월 13일 공식 일반 공개 발표의 `og:image`.
- 사용 위치: ISSUE 16의 Argon 소개 첫 부분 및 Open Graph·Twitter 공유 썸네일.
- 선택 이유: 이전 ISSUE 15의 9월 30일 이미지(`gemini-4-argon-official.webp`)는 왼쪽 모델명과 오른쪽 숫자 4 구성이었다. 이번 이미지는 중앙의 숫자 4를 강조한 별도 공개 자산이다.
- 대체 텍스트: 푸른빛 배경 중앙에 숫자 4가 놓인 Gemini 4 Argon 공식 이미지.

## ADK 최적화 전후 도표

- 파일: `gemini-4-argon-adk-benchmarks.png` (3000×2127 PNG)
- 원문: https://developers.googleblog.com/optimizing-a-200000-line-python-codebase-overnight-with-gemini-4-argon/
- 제공 주소: https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/05_figure5_benchmark_results.original.png
- 발견 위치: 원문 Figure 5, `05_figure5_benchmark_results` 이미지.
- 사용 위치: 6개 최적화 제안 중 2개 반영·4개 제외를 설명한 문단 뒤.
- 내용 확인: 50턴 뒤 64→36ms, 150턴 뒤 200→122ms, 첫 import 1.22→0.97초, 새 프로세스의 첫 요청 3.07→3.09초, 158턴 실행 65.6→56.1초. 원본의 변화율·행 순서·측정 주석을 유지한다.
- 해석: 6~12회 중앙값, 즉시 응답하는 모델·도구로 ADK 내부 처리만 측정. 메모리 세션 최적화의 범위를 외부 데이터베이스 환경까지 확대하지 않는다. 첫 요청 전체 시간은 거의 같다는 결과도 표시한다.
- 접근성: 수치를 담은 한국어 대체 텍스트, 주요 결과와 실험 범위를 설명하는 한국어 본문, 원본 크게 보기 링크를 함께 제공한다.

Copilot 이미지는 기존 원격 제공 방식을 유지하며, 그 출처는 `research/2026-10-14-gemini-argon-development.md`에 기록돼 있다.
