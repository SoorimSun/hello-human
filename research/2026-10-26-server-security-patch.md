# Node.js·Java·Tomcat 보안 패치 실무 가이드 조사 기록

- 작성·확인 기준일: 2026-10-26 (KST)
- 본문: `guides/2026-10-26-server-security-patch.html`
- 사용자 요청: 연결된 ChatGPT 대화를 바탕으로 가이드 작성. 푸시 금지.
- 원 대화 ID: `6ade9fe6-efec-83e8-94c9-95e6880523a1` (`read_thread`로 확인)
- 범위: Node.js, Java/JDK, Tomcat. Spring Boot는 내장 Tomcat 관리 범위로 한정. Next.js 제외.
- 대화의 추천 구조를 채택하되 날짜·CVE·수정 버전은 아래 공식 원문으로 재확인했다.

## 확인한 핵심 주장

| 대상 | 본문에 반영한 사실 | 공식 원문 |
| --- | --- | --- |
| Node.js | 10/21 보안 릴리스. 22.23.4, 24.22.1, 26.12.1. Brotli·DNS·비표준 IP TLS 문제. 전각 IP 항목 105483은 24·26만 명시 | https://nodejs.org/en/blog/vulnerability/october-2026-security-releases |
| Node.js 지원 | 기준일에 22·24 LTS, 26 Current, 18·20 EOL | https://nodejs.org/en/about/previous-releases |
| Oracle 1차 | 10/21 CVE-2026-91403, eMudhra 중간 CA 신뢰 대응 | https://www.oracle.com/security-alerts/alert-cve-2026-91403.html |
| Oracle 후속 | 10/24 CVE-2026-114820. 관련 루트 CA 제거. .0.2도 영향 대상 | https://www.oracle.com/security-alerts/alert-cve-2026-114820.html |
| Oracle JDK | 17.0.21.0.3+1, 21.0.13.0.3+1 릴리스 날짜·전체 빌드 | https://www.oracle.com/java/technologies/javase/17-0-21-0-3-relnotes.html · https://www.oracle.com/java/technologies/javase/21-0-13-0-3-relnotes.html |
| 인증서 대응 | 10/24 갱신. 런타임 저장소 백업·관련 루트 제거·실행 인스턴스 재시작. 직접 삭제 명령은 본문에 복제하지 않고 공식 절차로 연결 | https://ops.java/emudhra |
| Tomcat 9 | 9.0.123 수정. 101356 영향 9.0.118~122, 101296 영향 9.0.0.M1~122 | https://tomcat.apache.org/security-9.html |
| Tomcat 10.1 | 10.1.61 수정. 101356 영향 10.1.55~60, 101296 영향 10.1.0-M1~60 | https://tomcat.apache.org/security-10.html |
| Tomcat 11 | 11.0.27 수정. 101356 영향 11.0.22~26, 101296 영향 11.0.0-M1~26. AJP 103119 영향 11.0.0-M25~26 | https://tomcat.apache.org/security-11.html |
| Tomcat 날짜 | 수정 릴리스 표제 10/12, 취약점 공개 10/20을 구분 | 위 세 Apache 페이지 |
| Spring Boot | 3.5.16은 마지막 3.5 OSS 릴리스. 기본 Tomcat 10.1.55. Boot 업그레이드 사실만으로 패치 완료 판정 금지 | https://spring.io/blog/2026/06/25/spring-boot-3-5-16-available-now/ · https://docs.spring.io/spring-boot/3.5/appendix/dependency-versions/coordinates.html |

## 절차 근거

- nvm install/use, POSIX·WSL 환경: https://github.com/nvm-sh/nvm#usage
- npm audit, omit, dry-run, force 및 레지스트리로 보내는 의존성 정보: https://docs.npmjs.com/cli/v11/commands/npm-audit/
- 이미지 재빌드와 베이스 이미지·digest 관리: https://docs.docker.com/build/building/best-practices/
- jcmd 프로세스 지정, 같은 머신·사용자 접근 조건: https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html
- Maven parent 상속과 BOM import의 재정의 차이: https://docs.spring.io/spring-boot/3.5/maven-plugin/using.html
- Gradle dependencyInsight로 선택 버전·구성 확인: https://docs.gradle.org/current/userguide/viewing_debugging_dependencies.html
- Tomcat 메이저 이전의 Jakarta 호환성: https://tomcat.apache.org/migration-10.html

## 편집 판단과 검증 한계

- 일반적인 보안 패치 절차에 AI를 자료 대조·미확인 항목 정리 도구로 연결했다. 운영 명령 실행이나 자동 배포를 AI 실습에 포함하지 않았다.
- 원 대화에 나온 Temurin 빌드를 모든 플랫폼의 완료 기준으로 확대하지 않았다. 본문 숫자표는 확인한 Oracle 17·21 예시로 한정하고 타 배포판은 공급자 공지를 따르게 했다.
- Node.js 주요 네 항목과 Tomcat 주요 두 항목·11의 AJP를 선별했다. 전체 CVE 목록이나 모든 취약점에 대한 안전 판정을 표방하지 않는다.
- 원문 사실, 헬로우 휴먼의 환경 조사·회귀·복구 제안, 가상 실습 답안을 구분했다.
- 셸 버전, 의존성 소스 설정, 새 프로세스에서의 버전 출력만으로 기존 서비스의 실행 버전을 증명하지 않도록 반복 확인했다.
- 실제 서비스·JDK·Tomcat·인증서 저장소의 패치, 취약점 재현, Maven/Gradle 앱 빌드는 수행하지 않았다. 명령은 독자의 환경에 맞춰 실행하는 문서 예시다.
- 공식 웹 조회로 근거를 확인했다. PowerShell 직접 HTTPS 조회는 네트워크 제한으로 실패했으며 그 결과를 근거로 쓰지 않았다.
- 최초 작성·최종 검토 단계에서는 사용자 요청에 따라 커밋·푸시·배포를 보류했다.

## 사이트 검증

- `node --test`: 71개 통과, 실패 0.
- `git diff --check`: 통과. 새 파일의 공백·구조도 별도 확인.
- Chromium 로컬 HTTP 검증: 본문의 로컬 링크·자산 29개 응답 200, 중복 ID·끊긴 목차 없음, 외부 링크 새 탭·rel 속성 확인.
- H1·title·OG·홈·목록의 제목과 날짜 일치. 가이드 목록 11개, 새 글 첫 번째.
- 본문 1440/768/390/320px × 라이트·다크 8가지 조합에서 문서 가로 넘침 없음. 홈·목록도 네 너비에서 넘침 없음.
- 요청문 복사 성공, 클립보드 거부 시 선택·안내, 기대 결과 펼치기, 목차 이동, 테마 전환·새로고침 유지 확인.
- TXT 2개와 본문 텍스트 일치, 확인표 다운로드, JavaScript 비활성화 시 본문·다운로드 접근 확인.
- 글에서 상호작용 후 목록 복귀·새로고침 시 불필요한 Updated 표시 없음.
- 검증 중 페이지 JavaScript 오류·로컬 자산 실패 0. 데스크톱·모바일 캡처를 직접 확인하고 모바일 H1의 쉼표 뒤 공백을 보완.
- 이 검증은 가이드 웹페이지에 대한 것으로, 문서에 소개한 서버 패치의 현장 실행 검증은 아니다.

## 최종 재검토 · 2026-10-26

- Development Review로 사이트 작성 기준(Standards)과 내용·요구사항(Spec)을 독립 검토했다. 작성 기준 위반 0건, 공식 근거와 대조한 내용 오류·요구 누락 0건. 원격 반영 판단은 포함하지 않았다.
- Node.js 보안 공지·지원 상태, Oracle 두 차례 공지·전체 수정 빌드·인증서 대응, Tomcat 세 계열의 영향 조건·수정 버전, Spring Boot 3.5.16 지원 종료·의존성 관리 문서를 재대조했다.
- 실제 앱 내 미리보기에서 모바일 표의 오른쪽 열을 놓치기 쉽고 CVE 번호가 여러 줄로 갈라지는 점을 발견했다. 전용 CSS에 작은 화면의 좌우 스크롤 안내와 식별자 줄바꿈 방지를 추가하고 참조 버전을 `v=2`로 갱신했다.
- 수정 후 실제 CSS 화면 너비 320/390/768/1440px × 라이트·다크의 8가지 조합에서 문서 가로 넘침 없음. 모바일 표·데스크톱 첫 화면을 직접 확인했고, 표의 키보드 가로 스크롤·목차 이동·기대 결과 펼치기도 확인했다. 페이지 콘솔 오류 0건.
- `node --test` 71개 통과, `git diff --check`와 전용 JS 구문 검사 통과. 새 파일 공백 검사도 통과했다. 미리보기 본문·수정 CSS·다운로드 자료 세 개는 모두 HTTP 200이다.
- 이번 앱 내 브라우저에서는 복사 성공 안내가 표시됐으나 도구의 클립보드 읽기가 빈 값을 반환해 내용 일치를 재확정하지 못했다. 다운로드 클릭도 도구의 완료 이벤트 감지가 시간 초과됐다. 앞선 독립 Chromium의 복사·다운로드 성공 검증과 구분하며, 이번 확인만으로 앱 내 실제 복사·저장 완료를 단정하지 않는다.
- 가이드의 명령을 실제 서버에서 실행하지 않았고, 커밋·푸시·배포하지 않았다.

## 발행 승인 · 2026-10-26

- 최종 검토 후 사용자가 가이드 변경사항의 커밋·푸시를 명시적으로 요청했다.
- 본문, 홈·목록, 전용 CSS·JS, 실습 자료 세 개, 조사·검토 기록을 함께 반영한다. 위의 미푸시 기록은 승인 전 작업 단계의 상태다.
