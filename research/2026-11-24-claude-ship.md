# 일반뉴스 57호 조사 기록

확인일은 2026년 11월 24일(한국시간)이다. 네 회사의 원문은 각각 11월 23일로 표기한다. 분 단위로 확인할 수 없는 발표가 있어 첨부 초안의 오전 8시 30분 마감 시각을 기사에 적용하지 않았다.

## Claude Ship

- [Anthropic 발표](https://claude.com/resources/articles/introducing-claude-ship)와 [한국어 제품 문서](https://code.claude.com/docs/ko/claude-ship)를 대조했다. GitHub 저장소를 쓰는 Team·Enterprise 대상이며 Code Review는 정식 제공, PR Steward와 Claude Approvals는 공개 베타다. Steward는 CI·리뷰·충돌에 대응해 수정 커밋을 올리고 되돌리는 방법을 알린다.
- [한국어 승인 문서](https://code.claude.com/docs/ko/approvals)에서 경로, 필요 승인 수, 정책 파일, 관찰 모드, GitHub 필수 검사의 관계를 확인했다. 정책은 저장소의 `.claude/approvals.yml`이다. 자연어로 작성할 수 있는 부분은 분류 조건이다. 단순한 자연어 지시 한 줄만으로 모든 보호 규칙을 대체한다고 쓰지 않았다.
- 승인 리뷰를 남기는 일, 정책 검사를 통과하는 일, PR 병합은 분리했다. 문서 오류를 Claude Tag가 수정한 실제 사례에서는 문서 담당자의 승인과 Approvals 검사 통과를 모두 거쳤다. 본문 이미지는 이것과 별개로 Anthropic이 제공한 설치 안내 링크 수정 예시다.
- 리뷰·분류에 쓴 토큰은 조직에 과금될 수 있다. 관찰 모드의 판단도 유료 리뷰나 분류를 실행할 수 있다. ZDR·HIPAA 구성·고객 관리 키 적용 조직은 출시 시점에 지원하지 않는다. ZDR 관련 Vercel 소식은 별도 제품이다.
- 6월 대비 9월 병합 건수 두 배 초과, 되돌린 PR의 비율 40% 초과 감소는 Claude Code 팀 내부 기록이다. 발표는 Code Review를 여러 단계 중 하나로 설명한다. Claude Ship 베타의 인과 효과, 조직 전체의 개발 생산성 또는 리뷰 시간으로 바꾸지 않았다. 한국어 발표 경로는 영어 본문을 반환해 발표문은 영어, 제품 설명은 실제 한국어 문서를 연결했다.

## 넷플릭스 발표의 범위

- [QCon 발표자 초록](https://qconsf.com/presentation/nov2026/how-netflix-retrofitted-its-sdlc-ai-coding-agents)의 세션은 현지 11월 18일, 발표자는 Mark Khuzam이다. 가입·청구를 지원하는 UI 팀에서 기존 구현 패턴을 정리하고 설계 결정을 계획, 사전 리뷰, 병합 후 문서 갱신에 다시 쓰는 방법을 소개했다. Claude Ship 고객 사례로 소개하지 않았다.
- [11월 23일 InfoQ 현장 보도](https://www.infoq.com/news/2026/11/netflix-sdlc-ai-coding-agents/)는 ADR 45건, 해당 핵심 서비스의 2026년 Sev 1 사고 0건, 전년 대비 PR 32% 증가 등을 발표자 발언으로 전한다. 발표자 초록에 성과의 측정 분모와 인과 근거가 없어 본문은 확인할 수 있는 팀의 절차에 집중했다.

## GLM-5.4

- [Z.ai 기술 발표](https://z.ai/blog/glm-5.4)의 동적 본문을 브라우저에서 읽었다. GLM-5 기반 약 750B 규모 모델에서 28개 층을 두 번 실행한다. 반복 간 가중치를 공유하더라도 연산은 추가된다. 2T~3T 규모와 맞먹는다는 설명은 회사 해석으로 종합 벤치마크 결과처럼 인용하지 않았다.
- 별도의 30B 모델 비교는 매개변수 수를 맞추고 반복형에 총 훈련 연산을 약 10% 더 쓴 조건이다. 일부 시험에서 평균 출력 길이가 10~14% 감소한 것은 공급사 측정이다. 완성 모델의 추론비 절감률이 아니다. 비혼잡 시 최대 200, 혼잡 시 70~80 토큰/초도 회사가 발표한 출력 속도로, 업무 완료 시간과 구분했다.
- 발표일의 제공 경로는 Coding Plan·ZCode·Z.ai Chat이다. 범용 API는 출시 예정이며 가중치 공개는 안전성 보완 후 계획이다. [ZCode FAQ](https://zcode.z.ai/en/docs/qa)는 1M 문맥, 현행 플랜에서 5.3 대비 동일 할당량에 사용 가능한 토큰 1.5배, 기존 V1 플랜의 배수 제외를 명시한다.

## OCRia-nano-1

- [출시 글](https://www.llamaindex.ai/blog/introducing-ocria-nano-1), [기술 보고서](https://www.llamaindex.ai/ocria/ocria-nano-1-report.pdf), [공개 가중치와 모델 카드](https://huggingface.co/llamaindex/OCRia-nano-1)를 대조했다. LiteParse가 원래 PDF 텍스트와 위치를 얻고 필요 시 OCR을 적용한다. 감지기·문자 체계 분류기·인식기 넷·LayoutNet까지 일곱 모델 합계 약 8.1M이다. Markdown·좌표 JSON 출력과 차트를 이미지로 남기는 한계를 확인했다.
- 모델 카드의 측정 조건은 임의 선정한 ParseBench 페이지 300장, 처리량은 16 vCPU에서 코어당 작업자 하나다. 단일 코어 평균 지연은 426ms/페이지, 병렬 처리량은 27.8페이지/초, ParseBench-2 종합 점수는 59.2다. 공급사 측정이며 점수를 문자 정답률로 환산하지 않았다. 우리 문서나 장비에서는 성능을 측정하지 않았다.
- LiteParse 코드에 적용되는 Apache 2.0과 모델 가중치의 수정 Open RAIL-M은 별개다. 모델 카드가 조직의 연 매출과 누적 투자액에 따라 상업적 이용 조건을 구분하므로 제품 탑재 시에는 모델 조건을 확인하도록 연결했다.

## Vercel AI Gateway

- [11월 23일 Audited ZDR 원문](https://vercel.com/blog/introducing-audited-zdr-on-ai-gateway)은 감사인이 표시된 요청을 보내 추론 제공자의 코드·설정·저장 가능 경로를 조사한다고 설명한다. 로그·캐시·백업·지원 도구, 비보존 조건을 벗어나는 대체 경로까지 조사한다. [기존 팀 단위 정책 변경 기록](https://vercel.com/changelog/zero-data-retention-no-prompt-training-on-ai-gateway)은 학습 제외·비보존 설정을 다룬 다른 발표다.
- 자격 요건에는 감사 범위·발견 사항·조치 상태 등을 담은 보고서 공개가 포함된다. Baseten, Modal, Wafer는 감사 착수 단계이고 첫 보고서는 12월 8일까지 공개될 것으로 예상한다고 밝혔다. 등급을 선택한 팀의 첫 호출과 대체 호출은 기준을 충족한 공급자로 제한한다는 설계다. 세 업체의 감사 통과나 예정일의 결과를 확정하지 않았다.
- 고유 URL에 접속하면 원인 조사를 시작하는 카나리 검사는 읽지 않은 디스크 사본을 찾을 수 없다. 감사와 보완 관계라는 원문 범위로 설명했다. 학습 제외·처리 지역·데이터 비보존을 동의어로 쓰지 않았다.

## 시각 자료

아래 원본은 각 회사가 11월 23일 발표와 함께 공개했고 11월 24일 확인했다. 화면은 발표사 예시로 실었다. 각 이미지의 별도 재배포 허락은 확인하지 않았으며, 모델이나 도구의 라이선스를 삽화의 라이선스로 표시하지 않았다.

| 본문 자료 | 원본과 편집 범위 |
| --- | --- |
| 넷플릭스의 PR 검토 흐름 | 11월 24일 [QCon 세션 페이지](https://qconsf.com/presentation/nov2026/how-netflix-retrofitted-its-sdlc-ai-coding-agents)의 공개 이미지와 링크를 확인했다. 발표자 사진·행사 배너가 있고 공개 슬라이드 링크나 절차 그림은 찾지 못했다. [InfoQ 현장 기사](https://www.infoq.com/news/2026/11/netflix-sdlc-ai-coding-agents/) 본문에도 슬라이드나 현장 사진이 없다. [행사 영상 패스](https://qconsf.com/video-only)는 12월 21일부터 녹화 영상을 제공할 예정이라고 안내한다. 본문 도식은 발표자 초록에 나온 계획 검토, 에이전트 사전 리뷰, 사람의 리뷰, 병합 뒤 문서 갱신과 다음 작업의 관계를 헬로우 휴먼이 한국어로 재구성했다. |
| Claude Approvals 승인 화면 | [Anthropic PNG](https://assets.claude.com/635a1675ea125007f1d5f686db25959d8485d5fc.png), 3000 × 2664 원본. `assets/news/claude-ship-approval.png`. 열려 있는 PR #482, 설치 안내 링크 수정, 승인과 필수 검사를 함께 보여 준다. |
| GLM-5.4 FreeCAD 영상 | [Z.ai 원본 MP4](https://z-ai-bj.oss-cn-beijing.aliyuncs.com/prompts-rich-media-resources/5.4-blog/1517_1795370530%28%E5%8E%9F%E8%A7%86%E9%A2%91%29.mp4). 발표문의 뮤직비디오·기계 설계·게임·3D 사례 중 FreeCAD를 선택했다. 원본 스트리밍, 1280 × 720, 약 21.5초. `assets/news/glm-54-freecad-poster.jpg`는 같은 영상의 10초 장면을 발췌한 정지 화면이다. |
| OCRia 문서 구조 예시 | [모델 카드의 LayoutNet 출력 PNG](https://huggingface.co/llamaindex/OCRia-nano-1/resolve/main/assets/layout_blocks.png), 916 × 642 원본. `assets/news/ocria-layout-blocks.png`. 두 페이지의 제목·문단·그림 영역을 볼 수 있어 발표문의 합성 수질 보고서 입력 사진보다 이 결과를 선택했다. |
| Audited ZDR 흐름도 | [Vercel PNG](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7911SzATc1NYfyRnFQN5Ud/3f2014ceadf901735edeab4107376f2f/audited-zdr-flow-desktop-light.png), 3600 × 1100 원본. `assets/news/audited-zdr-flow.png`. 공급자 등급 등록 전에 공개 보고서를 거치는 과정을 보여 준다. |
| 가상 PR 승인 흐름 | 모임이 제안한 관찰 모드 실험용 정적 HTML 도식. 경로 보호와 테스트 결과를 적용했을 때 서로 다른 네 가지 기대 결과를 보여 준다. 실제 제품의 기본값이나 실행 화면이 아니다. |

기사에서 세 원본 이미지가 지정 비율로 로드되는지 확인했다. 데스크톱 Chrome에서 영상의 키보드 재생·시간 진행·일시 정지, 모바일 터치 에뮬레이션에서 재생을 확인했다. 영상 전체의 설계 정확성을 평가하지 않았다. 1360·390·320px에서 제목의 두 구절이 각각 한 줄에 들어왔고, 어두운 화면과 JavaScript를 끈 화면에서도 실험의 네 가지 기대 결과를 읽을 수 있었다.

## 모임 실험

최근 54호는 정산 자료의 순수납액 대조, 55호는 취소 요청의 재전송, 56호는 모델 교체 전후의 상담 답변과 도구 호출을 다뤘다. 이번에는 초안의 실험 설계를 살려 같은 코드 변경에서 모델의 위험도 제안과 규칙이 정한 승인 대상을 따로 기록한다. 합성 PR 30건(6종 × 5건), 고위험 오승인 후보 0건과 사람 리뷰 시간 30% 단축은 제안한 시험 조건과 목표다. 제품을 설치하거나 PR을 실제 승인·병합하거나 실험을 실행하지 않았다.
