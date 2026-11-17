# 일반뉴스 50 미디어 기록

확인일 2026-11-17. 기사 `news/2026-11-17-cvs-workflow-code.html`.

| 소식·파일/위치 | 원본·제공자·공개일 | 채택 이유·가공·이용 조건 |
| --- | --- | --- |
| OpenAI `#healthcare-demo` 공식 영상 | [공식 발표의 MRI 시연](https://openai.com/index/advancing-computer-use-for-healthcare-teams/#from-a-patients-message-to-an-mri-authorization-request), 제목 openai-healthcare-demo, OpenAI, 11/16 | [공식 Vimeo 플레이어](https://player.vimeo.com/video/1244445209?h=8ea96d2904), 원본 영역 16:9, 약 2분 13초. 원문 재생 버튼을 눌러 실제 로드된 주소·제공자 확인. 공식 임베드, controls 활성화, autoplay/loop 해제. 합성 환자 데이터의 OpenAI 시연임을 밝히고 CVS 운영 화면과 구분. 별도 재사용 라이선스 확인 없이 재배포·다운로드하지 않음. |
| CVS `#cvs` 업무 흐름도 | [CUA Agent Kit README](https://github.com/cvs-health/cua-agent-kit/blob/965ee258bfb778cad4e7077301974d4e83d97916/README.md), CVS Health, 11/17 확인 | README의 탐색·코드화·실행 절차를 HTML 설명도로 재구성. 실제 운영 화면 아님. README는 Apache 2.0 프로젝트. |
| CVS `#cvs` 평가 막대 | [OpenAI 발표](https://openai.com/index/advancing-computer-use-for-healthcare-teams/), 11/16 | 공식 수치로 자체 HTML 막대 작성. 0~100% 축, rubric 점수·최대 추론 조건 표시. 비용은 다른 단위라 축에 합치지 않음. |
| `qwen4-max-work360.jpg` | [Alibaba 발표](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max?_p_lc=1), [원본 이미지](https://img.alicdn.com/imgextra/i3/O1CN01flbbkpi4wHD3Zo0O_!!6000000007689-0-tps-1762-950.jpg), 11/16 | 1762×950 JPEG 원본. 잘라내기·색·텍스트 수정 없음. 브라우저 다운로드 후 로컬 복사. 공급사 Work360 비교이며 독립 평가와 분리. 별도 재사용 라이선스는 확인하지 못했으며 제공자·원문을 표기하고 보도 맥락에서 사용. |
| Gemini Notebook `#notebook` 영상 | [Google 발표](https://blog.google/innovation-and-ai/products/gemini-notebook/interactive-sites/), 제목 Overview of sites in Gemini Notebook, 11/16 | [MP4](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/Sites_Final.mp4), 1920×1080, 약 48초. [공식 포스터](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/video_6220_wagtailvideo-1xlmtbrm.width-1200.format-webp.webp). 공식 호스트 직접 참조, 자동·반복 재생 없음. Google 선정 시연, 기능·생성 결과 독립 검증 아님. |
| AdMob `#admob` 영상 | [Google 발표](https://blog.google/products/publisher-connections/new-google-admob-tools/), 제목 Creating an AdMob agent skill, 11/16 | [MP4](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/AdMob_skills.mp4), 1920×1080. 원문 aria-label과 영상의 SDK 이전 지시 장면 확인. 직접 참조, 원문의 자동·반복 재생은 기사에서 해제. |
| Anthropic `#security` 비교표 | [정책 원문](https://www.anthropic.com/research/coordinated-vulnerability-disclosure-timelines), 11/16 | 직접 연 원문에 바위·산의 장식 그림이 있으나 기한 이해에 도움이 적어 제외. 네 변경을 표로 재구성하고 적용일·예외를 본문에 표시. |
| `#experiment` 흐름도·정답 표 | 헬로우 휴먼의 가상 실험 제안, 11/17 | 같은 입력·두 실행기·독립 검증기 관계를 HTML로 구성. 모든 기대값은 미실행 실험의 기준이며 실측 결과 아님. 단순한 세 조건 비교여서 재생 UI를 추가하지 않음. |

## 소식별 원본 확인 범위

- OpenAI: 최초 확인 때 Vimeo iframe이 `src` 없이 비어 있어 보류했다. 사용자 후속 요청으로 재생 버튼까지 조작하자 공식 iframe이 초기화됐고 `openai-healthcare-demo from OpenAI on Vimeo` 제목·원본 주소와 02:13 길이를 확인했다. 01절에 이 영상을 추가하고 기존 CVS 설명도·평가 그래프는 유지했다. CVS 저장소 고정 커밋의 전체 파일 트리와 README·선택 가이드를 확인했으며 이미지·영상 파일은 없었다.
- Qwen: 공식 발표의 Code Arena 순위 이미지와 Work360 원본 그래프를 확인했다. 실제 업무 범위와 연결되는 Work360만 채택. 순위 이미지를 추가해 비교 수치를 반복하지 않았다.
- Gemini Notebook: 본문 끝에 지연 노출된 영상 플레이어·포스터·원본 주소 확인. 재생 후 약 22초 지점의 학습용 주기율표 탐색 장면과 일시정지 확인. 음성·자막 전체를 검증한 것은 아니다.
- AdMob: 공식 페이지의 Ask AdMob hero·문제 진단·추천·차단 규칙·Skills 영상 모두 DOM에서 확인. 현재 제공되는 Skills의 SDK 이전 지시 장면을 채택했다. 예정 기능 영상을 현재 운영 결과처럼 보이지 않도록 중복 채택하지 않음.
- Anthropic: 공식 원문의 장식 이미지 대신 정책 비교표 선택. 별도 제품 데모가 필요한 기능 발표가 아니므로 일반 제품 영상은 추가하지 않음.
- Google 영상·포스터는 공식 공개 호스트를 그대로 참조한다. 별도 오픈 라이선스는 확인하지 못했으며 콘텐츠 소유권을 주장하지 않는다.

## 기사 안 검증

- Work360 이미지가 실제 기사에서 로드됐고 자연 크기 1762×950, 원본과 로컬 파일의 바이트 해시 일치를 확인했다. 원본 종합 점수와 alt·캡션 일치.
- Gemini 영상 약 48.16초, AdMob 영상 약 18.87초, 두 영상 모두 1920×1080으로 로드됨. controls와 키보드 Space로 재생·일시정지 확인. 재생 시간이 각각 약 25초·8초까지 진행했고, autoplay/loop 모두 false.
- 데스크톱 1280px와 모바일 390px·360px에서 전체 페이지 가로 넘침 없음. 390px 화면의 영상 영역 약 343×193으로 원본 16:9 유지. 라이트·다크에서 흐름도·정책 비교표 확인.
- 영상 전체 재생·음성 전사, 물리 터치 기기, 인쇄 화면은 검증하지 않았다. 공식 영상 호스트가 바뀌거나 접근이 제한될 때 사용할 원문 링크를 캡션에 유지했다.

### OpenAI 영상 추가 검증

- 원문 플레이어에서 재생 후 00:27까지 진행·일시정지 확인. 공개 본문의 합성 환자 데이터·검토 절차 설명을 함께 대조했다.
- 기사 iframe에서 1920×1080, 약 133.03초 영상이 로드됐다. Enter로 재생·일시정지했으며 104.89초에서 재개 후 112.77초까지 진행한 것을 확인했다.
- 데스크톱과 모바일 너비에서 영상·캡션을 확인했다. 좁은 화면의 영상 영역 약 308.6×173.6으로 16:9를 유지하며 가로 넘침이 없었다. 모바일 너비에서도 재생·일시정지가 동작했고 검증 후 기본 viewport로 복원했다.
- 영상 전체 내용·음성, 물리 터치 기기에서의 조작은 검증하지 않았다.
