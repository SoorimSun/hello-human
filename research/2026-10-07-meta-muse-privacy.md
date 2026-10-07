# Muse 개인정보·권한 논란 조사

- 확인일: 2026-10-07, 한국시간.
- 대상: `news/2026-10-07-meta-muse-privacy.html`, BRIEF 06.
- 요청: Techdirt 원문을 바탕으로 작성, 제공된 해커뉴스 토론은 집필에만 참고, 직접 링크 금지, 푸시 금지.
- 참조 대화 「AI뉴스 단신 작성」에서 확인한 선호: 충분한 맥락, 이미지·도식, 해커뉴스 별도 코너 제외.
- 시작 시 작업 트리 깨끗함. 기존 일반뉴스 8편·단신 5편에서 총 14편·단신 6편으로 갱신.

## 근거와 표현

| 쟁점 | 근거 | 확인 상태와 본문 처리 |
| --- | --- | --- |
| 기사의 출발점 | [Techdirt, Karl Bode, 10/6](https://www.techdirt.com/2026/10/06/metas-muse-is-an-adorable-privacy-and-security-dumpster-fire/) | 브라우저에서 본문 확인. 출시 이후 보안·개인정보 문제를 비판한 글로 소개. 정치적 평가와 향후 로비 전망은 사실처럼 옮기지 않음. |
| Mac 취약점 | [Ars Technica](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/) | 브라우저에서 후속 수정 포함 읽음. 로컬 앱·코드 실행 조건이 있는 계정 토큰 탈취 문제. 메타의 hotfix 발표도 병기. 독립 재현·패치 검증 없음. |
| 메시지 접근 주장 | [Inc. 당사자 글, 9/19](https://www.inc.com/jason-aten/metas-new-muse-ai-agent-read-my-private-messages-i-never-asked-it-to/91408202) | 허락하지 않은 메시지 접근과 잘못된 AI 설명을 문제 삼은 경험담. 사용자 권한 이력의 독립 입증은 아님. |
| 회사의 부인 | [The Next Web, 9/30](https://thenextweb.com/news/meta-muse-private-messages-denial-jason-aten) | macOS 전체 디스크 접근과 Muse 메시지 연결이 필요하다는 회사 답변 확인. 원문에 연결된 X 게시물은 웹 도구 접근 실패로 직접 검증했다고 쓰지 않음. |
| Apple 대응 | [Apple Developer, 10/2](https://developer.apple.com/news/?id=p6zjojqw) | 추가 통제를 도입할 미래 계획. Muse를 직접 지목하거나 권한 우회·수정 완료를 입증한 공지가 아님. |
| Marketplace 후속 | [Business Insider, 9/29](https://www.businessinsider.com/muse-agent-facebook-marketplace-address-setting-meta-always-allow-2026-9) | ‘항상 허용’과 가격 표시 오류에 대한 당사자 후속 설명 확인. 헐값 판매가 확정됐다는 표현 제외. 원문은 100단어 한도에 맞춰 짧게 요약. |
| 지인 정보 | [WIRED, 10/3](https://www.wired.com/story/muse-creates-detailed-profiles-of-all-your-friends-and-family/) | 지침 분석과 회사 답변으로 표현. 전 사용자에 대한 전수 수집 실증으로 확대하지 않음. 100단어 한도에 맞춰 요약. |
| 공개 기능·보호 장치 | [Meta 한국어 소개, 9/8, 9/11 수정](https://about.fb.com/ko/news/2026/09/introducing-muse-the-worlds-first-personal-ai-agent-built-for-everyone/) | 공식 소개 확인. 광고 시스템 공유 배제와 모델 학습 제외 설정을 구분. |
| 권한의 경계·미래 보호 기능 | [Meta 보안 설계, 9/8](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) | runtime cell의 root와 host root가 다름. 현재 운영 목적의 회사 접근 가능성을 인정하며 Confidential VM은 추후 제공 계획. 독립 검증으로 표현하지 않음. |
| 출시 전 격리 취약점 | [404 Media, 10/5](https://www.404media.co/meta-rushed-to-fix-muse-vm-escape-vulnerability-immediately-before-launch/) | 내부 문서·익명 취재원에 근거한 출시 전 수정 보도. 현재 대규모 유출 발생으로 표현하지 않음. |

## 토론을 반영한 편집 판단

사용자가 지정한 해커뉴스 토론 49977588을 브라우저로 읽었다. 직접 URL은 이 기록과 기사에 넣지 않는다. 댓글의 기술적 단정은 사실의 근거로 사용하지 않고 공식 문서·당사자 글·후속 취재를 확인하는 질문으로만 활용했다.

- piazz(49979930): 자기 작업 공간 공개와 탈출 취약점, 기억 기능과 외부 공개를 구분해야 한다는 반론. Meta 설계와 404 취재를 대조해 반영.
- lapcat(49981753, 49980327): 메시지 권한 우회 입증에 대한 이견, Apple 공지가 미래 업데이트라는 지적. Apple 문서의 시제를 직접 확인.
- DebtDeflation(49979099): 최저 가격을 명시적으로 제한할 수 있다는 관점. 단, 당사자는 이미 하한을 설정했다는 후속 보도가 있으므로 사건 원인을 ‘하한 미설정’으로 설명하지 않음.
- 댓글의 ‘의도적 감시’, ‘무조건 안전’, 다른 서비스에 관한 미확인 체험담은 채택하지 않음.
- 본문의 업무 예시, 동의·권한 설계에 대한 판단은 헬로우 휴먼의 해석으로 명시.

## 시각 자료와 반영 범위

- Techdirt 본문에는 기사용 제품 사진이 확인되지 않아 연결 취재원 WIRED의 Muse 자료 이미지를 출처와 함께 외부 임베드. 자세한 기록은 `assets/news/muse-privacy-media.md`.
- 데이터의 읽기·기억·실행을 설명하는 3단계 도식과 작업 공간 안팎의 권한 비교를 HTML/CSS로 구성. 실제 사고 재현도가 아님을 표시.
- 기존 메시지 접근 단신을 관련 글로 연결. 과거 글과 뉴스레터 발행본은 수정하지 않음.
- 기사, 개별 CSS, 뉴스 목록, 홈 최신 단신과 조사·미디어 기록을 변경. 원격 푸시·배포는 포함하지 않음.

## 검증

### 문장 편집

- 2026-10-07 사용자 검토에 따라 이미지 캡션의 불필요한 사고 화면 여부 설명 삭제.
- 멤버들이 편하게 읽도록 도입부·소제목·본문·도식 문장을 다듬음. 토큰·root·VM을 쉬운 말로 설명하고, 반복되는 단서 문장은 줄임.
- 주체·공격 조건·수정 발표·접근 경위의 불확실성·향후 기능의 시점은 유지. 새 사실이나 출처 추가 없음.
- 목록 요약도 쉬운 문장으로 맞춤. 기존 제목·날짜·번호 유지. 해커뉴스 직접 링크, 커밋·푸시 없음.

### 작성 시 확인

- 사용자 요청으로 본문 이미지를 `og:image`·`twitter:image`에 지정하고 공유용 제목·요약 추가. 브라우저에서 메타데이터 반영과 이미지 로드(1232×1232)를 확인. 실제 외부 공유 서비스의 카드 생성은 배포 후 확인 필요.

- `node --test`: 기존 테스트 7개 통과, 실패 0개.
- `git diff --check` 통과.
- 기사·목록·홈의 상대 링크와 앵커 존재 확인. 기사 중복 ID 없음. noindex·공통 테마·분석·갱신 스크립트 유지.
- 기사·이번 조사·미디어 기록에서 해커뉴스 직접 URL과 엠대시 없음. 본문에 해커뉴스 코너·작성자 인용 없음.
- 목록 총 14편, 일반뉴스 8편, 단신 6편 일치. 브라우저 단신 필터에서 6편 표시, 새 단신 최상단과 홈 링크 확인.
- 1280px 데스크톱에서 본문·도식·라이트·다크 모드 확인. WIRED 이미지 실제 로드 및 1232×1232 원본 크기 확인.
- 브라우저 viewport override가 적용되지 않아 임시 로컬 검사 페이지의 375px·320px iframe으로 실제 좁은 문서 폭 검증. 각각 문서 clientWidth/scrollWidth가 360/360, 305/305로 가로 넘침 없음(스크롤바 폭 제외). 3단계 도식과 권한 비교가 한 열로 바뀌고 라이트·다크 표시가 읽히는 것을 확인. 실기기 검사는 아님. 임시 검사 파일은 제거.
- 로컬 기사에서 발생한 브라우저 오류 로그 없음. 탭에 남은 Techdirt 접근 당시 Cloudflare 오류는 기사 오류와 구분.
- 로컬 미리보기 `http://127.0.0.1:8765/news/2026-10-07-meta-muse-privacy.html` 확인. 서버는 localhost에만 바인딩.
- 초안 검토 중에는 커밋·푸시·원격 배포를 수행하지 않았으며, 이후 사용자가 로컬 커밋을 요청함. 푸시·배포는 미요청.
