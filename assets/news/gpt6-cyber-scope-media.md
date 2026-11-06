# 일반뉴스 39 미디어 기록

확인일: 2026-11-06 KST. 공식 자료를 원본 비율로 보존했고, 자르기·색상 변경·생성형 편집을 하지 않았다. 출처 표기는 소유권·재배포 라이선스 이전을 의미하지 않는다. 공급사 화면은 제품 소개를 비평·설명하는 문맥에 필요한 범위로 사용한다.

| 파일·도식 | 원본과 제공자 | 성격·채택 이유·확인 범위 |
| --- | --- | --- |
| HTML의 ExploitGym 막대 | [OpenAI 발표](https://openai.com/index/introducing-gpt-6-cyber/), [시스템 카드](https://deploymentsafety.openai.com/gpt-6-cyber) | 자체 HTML/CSS 재도식. 32.1%·48.5%, 공통 0~100% 축. 원문 브라우저에서 ExploitGym 탭을 확인했으나 그래프 영역의 읽을 수 있는 원본 이미지가 노출되지 않아 수치 기반 도식 채택. 페이지의 Loading은 음성 읽기 영역이며 영상으로 간주하지 않음. 장식용 표지·고객사 로고는 제외 |
| gpt6-cyber-metr-aeci.png | [METR 원본 PNG](https://metr.org/assets/images/ai-rd-acceleration-assessment/aeci-main.png), [보고서](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/) | 1400×1162. 원본 그래프를 직접 열어 축·내부 모델·신뢰구간·추세 확인. 직원 제공 시점과 공개 출시일 구분. 가상 예시 attribution-sketch·growth-rates-illustration 및 직원 자가보고 그래프는 AECI 실측 추세와 혼동을 피하려고 제외 |
| gpt6-cyber-box-architect.png | [Box 원본 PNG](https://assets.box.com/sites/default/files/styles/3600xauto/public/2026-11/1-hero_architect_.png?itok=dwfyLGcS), [제품 페이지](https://www.box.com/architect) | 2000×1150. 공식 제품 소개 UI. 업무 입력·파일/솔루션/프롬프트 시작 지점 확인. 실제 고객 운영 화면으로 쓰지 않음. 블로그의 행사 배너·제품 홍보 타일은 제외. 연결된 제품 페이지에서 관련 UI까지 확인. Brightcove Watch demo 링크도 발견했으나 입력 흐름의 화면과 중복되고 이 기사에 필요한 절차는 본문·화면으로 설명하여 별도 임베드하지 않음. 영상 재생·전체 내용 검증은 하지 않음 |
| gpt6-cyber-claude-security.png | [Anthropic 원본 PNG](https://assets.claude.com/893acaa9f8b564cda630ed280d69e5c7d2bca5f7.png), [발표](https://claude.com/resources/articles/claude-enterprise-security-updates) | 1200×675. Security posture Beta, 조직·Cowork·Claude Code별 설정 결과 확인. 13/16은 예시 설정 점검, 제품 보안 성능으로 인용하지 않음. Hooks 화면으로 오인하지 않도록 별도 캡션 |
| HTML의 두 Hook 검사 지점 | 위 발표와 [Hooks 도움말](https://support.claude.com/en/articles/16059458-inference-hooks-overview) | 자체 설명용 도식. 입력 검사와 도구 실행 전 검사를 분리. 보안 검사 서버의 실제 연결 결과 아님 |
| gpt6-cyber-claude-finance.png | [Anthropic 원본 PNG](https://assets.claude.com/b87507b2ca680b626804a95946d15f34391e07f7.png), [발표](https://claude.com/resources/articles/introducing-personal-finance-in-claude) | 3168×1782. Personal Finance Beta 화면의 질문 카드 확인. 공급사 모바일 소개 이미지이며 실제 사용자 계좌 아님. 다른 두 원본 이미지도 발표 HTML에서 발견했으나 이 화면으로 기능 접근을 설명할 수 있어 중복 추가하지 않음 |
| GPT-6 Cyber 두 평가 비교 | 위 OpenAI 발표와 시스템 카드 | HTML/CSS 설명도. ExploitGym 악용 성공률 48.5%와 Honeypot 범위 준수율 99.93%·100%의 성공 기준·조건을 별도 카드로 표시. 서로 다른 비율을 같은 성능 척도로 비교하지 않음. 기존 모델 간 ExploitGym 막대는 유지 |
| METR 그래프 한국어 안내 | 위 METR 원본 PNG와 보고서 | 원본을 다시 시각 확인해 직원 제공 시점·AECI 축, 공개/내부 모델 색, 2025년 10월 전후 약 +15점/년·+29점/년을 HTML로 설명. 1.9배는 상승 속도 추정이며 95% 신뢰구간 1.5~2.8배를 유지. 이미지 파일 자체는 변경하지 않음 |
| V-017 상황 선택형 설명과 표 | 편집부의 가상 제안 | 정상 조회·관리자 문서 요청·문서 속 승인 지시·검사 서버 장애의 4상황을 각 4단계로 설명. 자료·모델 제안·도구 실행 기대값·등록 상태를 구분하고 이전/다음/처음으로 조작 제공. 승인 호출은 모델이 제안했다고 가정한 분기이며 실제 발생 빈도를 뜻하지 않음. 고정된 문구를 보여주는 설명용 재생으로, 실제 모델·검색 API·권한 서버·업무 실행 측정은 하지 않음. 스크립트가 없으면 정적 흐름과 본문의 기대 결과 표를 제공 |

모든 이미지에 본문 alt, 실제 픽셀 비율의 width·height, 원본을 보존한 로컬 확대 링크, 공식 원문 링크를 제공한다. 기사 이미지 렌더링 확인은 조사 기록의 검증 절에 남긴다.
