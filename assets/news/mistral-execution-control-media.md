# 일반뉴스 32 미디어 기록

확인일 2026-10-30 KST. 기사 `news/2026-10-30-mistral-execution-control.html`.

| 대상 | 확인한 공식 자료·선택 판단 |
| --- | --- |
| Mistral Large 4 | [가중치 공개 원문](https://mistral.ai/news/mistral-large-4-oss/)의 차트·다운로드 메뉴와 세 개의 시연 iframe을 확인. 기능 비교에 직접 필요한 코딩 지수/평균 토큰 차트를 채택. 로고·장식 이미지 제외. 공식 사이트의 Download PNG 기능으로 저장. 다른 시연 iframe은 본문 초기에 about:blank로 보였으며 전체 재생·제품 성능을 검증하지 않았으므로 성과 증거로 사용하지 않음. |
| Anthropic | [새 API 문서](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api) 본문·응답 예시·이전 안내 확인. 본문 이미지·영상 없음. 두 엔드포인트를 자체 HTML 비교 카드로 정리하고, 센트 단위와 지연 조건은 바로 아래 본문에 설명. 추가 조사한 [Console 차트 안내](https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console)에도 본문 이미지·영상이 없어 기능 설명과 링크를 추가. [공식 Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/observability/usage_cost_api.ipynb)은 차트 앱이 아닌 이전 API용 Python 예제로 표시. 실제 Console 화면으로 오해할 이미지 제작 없음. |
| OpenAI | [한국어 원문](https://openai.com/ko-KR/index/how-we-detect-frontier-model-misalignment/)을 실제 브라우저에서 열어 지연 로딩 뒤 방어 계층, 감시 체계, 퍼널, 보안/정렬 범위 이미지 확인. 감시 체계 원본 채택. 같은 내용을 중복하는 별도 다층 도식은 추가하지 않음. |
| Serval | [10월 투자 발표](https://www.serval.com/blog/we-raised-150m-to-make-everyone-a-builder)·[8월 GA 발표](https://www.serval.com/blog/catalyst-general-availability)의 본문·포스터·제품 이미지 확인. 새 투자 홍보 이미지보다 권한/게시 승인 설명에 맞는 8월 설정 화면을 채택. 이전 자료 날짜를 캡션에 표시. 원본의 영상·움직이는 GIF는 제품 전체를 체험한 자료로 사용하지 않음. |
| Gemini | [Google 원문](https://blog.google/innovation-and-ai/products/gemini-app/edit-files-directly/)의 영상 버튼을 열어 공식 연결 YouTube ID `dJ-SIBF1nJQ` 확인. 손글씨 노트→학습용 PDF 편집 시연. iframe에 autoplay=0·loop=0, 제목·16:9 비율·원문 링크 제공. |

## 채택 파일과 이용 범위

### `mistral-large4-token-efficiency.png`

- 제공자 Mistral AI, 발표 2026-10-29.
- 원본 페이지 https://mistral.ai/news/mistral-large-4-oss/ 의 ‘Artificial Analysis Coding Agent Index vs. Token Efficiency’ 다운로드 PNG.
- 공식 기능으로 생성된 원본 1614×1358, 내용·비율 변경 없음. 직접 열어 High/Medium 구분·좌표·단위·경쟁 모델 표기를 확인.
- 도표에서 GLM-5.3은 49, ML4 High는 48. 초안의 ‘유사한 성능’을 유지하고 정확히 동점으로 쓰지 않음.
- 공식 사이트가 제공하는 다운로드 자료를 출처와 함께 뉴스 설명에 사용. 독립적인 재측정 차트가 아님. 별도 이미지 재배포 라이선스는 확인되지 않았으며 모델 가중치 라이선스를 이미지에 적용하지 않음.

### `openai-monitoring-layers.webp`

- 제공자 OpenAI, 발표 2026-10-29.
- 원본 https://images.ctfassets.net/kftzwdyauwt9/4jeM8tKIZvFaRPFLn0ffw7/0c201050f8bb34364b2c3e80246b49e0/monitoring-the-frontier-monitoring-system-diagram.png?w=1600&q=90&fm=webp
- 공식 CDN 리사이즈 1600×640. 자르기·텍스트 수정 없음. L0 생략·L2 직접 통지 등 분기가 있으므로 일렬 4단계 필수 통과라고 설명하지 않음.
- 공개 발표를 설명하기 위한 출처 명시 사용. 별도 재배포 라이선스 확인되지 않음.

### `serval-catalyst-publish.png`

- 제공자 Serval, 원문 공개 2026-08-20.
- 원본 https://cdn.sanity.io/images/0dz925b3/production/692f6dfaeb15ff047bfb6a8826c1d3e3a2051f35-3420x2214.png?w=1600
- CDN 리사이즈 1600×1036. 원본 비율 유지, 크롭·편집 없음.
- 직접 이미지 열어 Require approval before publishing, 승인 그룹·단계·자기 승인 설정 확인.
- 공급사 제품 설명 화면, 고객 운영 화면이나 10월 신규 UI로 표시하지 않음. 별도 재배포 라이선스 확인되지 않음.

### Gemini 영상

- 공식 연결 https://www.youtube.com/watch?v=dJ-SIBF1nJQ
- 임베드 https://www.youtube-nocookie.com/embed/dJ-SIBF1nJQ?autoplay=0&loop=0&rel=0
- 제공자 Google의 공식 발표. 발표 날짜 2026-10-29, YouTube 자체 게시일·전체 자막은 별도 확인하지 않음.
- 본문 캡션은 Google 원문이 설명한 시연 범위로 제한. 플레이어의 영상 제목은 ‘Generate, edit, and preview files in Gemini’, 채널은 Google Gemini, 길이는 39초로 확인했다.

## 자체 설명 자료

- Anthropic usage/cost 카드: 공식 응답 구조를 한국어로 정리한 HTML. UI 캡처 아님.
- 비용 예시: 공식 단가 + 가정한 업무량·사람 검토시간. 계산과 환율은 `research/2026-10-30-mistral-execution-control.md`에 기록.
- JOB-017의 세 단계 흐름과 실패 상황 표: 미실행 모임 실험의 기대 상태. 실제 모델 평가·동시 실행·정산 검증 결과가 아님.

## 브라우저 확인

- 로컬 기사에서 공식 이미지 3개의 `complete`·고유 크기(1614×1358, 1600×640, 1600×1036)를 확인했다. 1440px 데스크톱·390px 모바일 및 밝은/어두운 테마에서 비율과 캡션을 확인했다.
- 영상 자동 재생 없이 시작 버튼을 제공한다. 직접 재생 후 29초 진행과 38/39초 종료 상태를 확인했고 Enter로 다시보기, 탐색 슬라이더의 Home·방향키 이동이 동작했다. 5초 부근에 학습용 PDF 생성 요청 장면을 확인했다.
- 자막은 플레이어에서 ‘사용할 수 있는 자막이 없음’으로 표시됐다. 모든 장면의 전사나 개별 기능 실습은 하지 않았다. 일시정지 검증은 조작 전에 영상이 끝나 성공으로 기록하지 않았다.
- 모바일에서 동영상 16:9 비율과 원문 링크가 유지된다. 영상이 없는 인쇄에서도 설명을 읽을 수 있도록 캡션·링크는 정적 HTML에 남긴다. 실제 인쇄 렌더링은 별도 확인하지 않았다.
