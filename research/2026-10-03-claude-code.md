# Claude Code 입문 가이드 공식 기능 조사

확인 기준은 2026-10-03, 한국 시간이다. Anthropic과 GitHub의 공식 문서를 확인했으며, 가능한 경우 한국어 링크를 사용했다. 문서의 현재 설명을 조사했으며 설치 명령, 계정 로그인, 유료 모델 호출을 직접 실행하지 않았다. 문서 확인일을 기능 출시일로 표현하지 않는다. 가격과 계정별 한도 수치는 다루지 않는다. 모델·effort 추천은 이 입문 실습의 범위에 맞춘 편집 판단이다.

## 편집 판단

첫 실습은 별도 연습 폴더에서 가상 요구사항 문서와 작은 HTML 파일 하나를 다루도록 구성하는 편이 적절하다. 익힐 흐름은 목표와 완료 조건 작성, 관련 파일 읽기, 계획 검토, 작은 변경, 결과 확인, 다음 작업에 필요한 규칙 정리다. Hooks·MCP·subagents 설치를 첫날의 전제로 만들지 않는다. 이 문단은 조사 결과를 바탕으로 한 편집 제안이다.

## 1. 설치와 첫 실행

| 환경 | 공식 권장 네이티브 설치 명령 |
| --- | --- |
| macOS / Linux / WSL 터미널 | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Windows PowerShell | `irm https://claude.ai/install.ps1 \| iex` |

위 표의 `\|`는 Markdown 표의 이스케이프다. 실제 명령의 파이프는 `|` 하나다. 설치 후 **새 터미널**에서 `claude --version`으로 확인하고 작업 폴더로 이동해 시작한다. 네이티브 설치는 자동 업데이트된다. Homebrew·WinGet 설치는 별도 업데이트가 필요하다. [공식 빠른 시작](https://code.claude.com/docs/ko/quickstart)

Windows는 네이티브 실행과 WSL 실행을 선택할 수 있다. **Git for Windows는 현재 선택 사항**이다. 설치하면 Git Bash 기반 Bash 도구를 사용할 수 있고, 없으면 PowerShell 도구로 명령을 실행한다. WSL에서는 Linux 설치 명령과 WSL 터미널을 사용하며 Git for Windows는 필요 없다. 네이티브 Windows는 Claude Code 샌드박싱을 지원하지 않고 WSL 2는 지원한다. 설치 점검은 `claude doctor`다. npm 방식도 현재 지원되지만 네이티브 설치가 권장된다. npm 방식의 최신 요구사항은 Node.js 22+이므로 과거 강좌의 Node 18+ 안내를 그대로 쓰지 않는다. [공식 설정 문서](https://code.claude.com/docs/ko/setup)

## 2. 로그인과 비용

처음 `claude`를 실행하면 로그인 안내가 나오며, 지원되는 Claude 구독 계정이나 Claude Console 계정 등으로 인증한다. 실행 중 계정 전환은 `/login`이다. Console의 API 사용과 Claude 구독 사용은 같은 과금 경로가 아니다. [빠른 시작의 계정 로그인](https://code.claude.com/docs/ko/quickstart)

구독이 있어도 `ANTHROPIC_API_KEY`가 설정되어 있고 사용을 승인했다면 CLI가 API 키를 사용할 수 있다. `/status`에서 실제 인증 경로를 확인하는 습관을 안내한다. 회사가 제공한 계정은 조직 설정을 따른다. [공식 인증 문서](https://code.claude.com/docs/ko/authentication)

`/usage`의 세션 비용 수치는 API 사용자를 위한 것이며, Pro·Max 구독자의 추가 청구액으로 곧바로 해석하면 안 된다. 구독 사용자는 같은 화면에서 플랜 한도와 활동 통계를 확인한다. 컨텍스트 사용량과 플랜 사용 한도는 다른 개념이다. [공식 비용 문서](https://code.claude.com/docs/ko/costs)

## 3. 계획에서 구현으로 넘어가는 정확한 경로

입문 실습에서는 다음 순서를 권한다. 마지막 단계의 화면 명칭은 버전·언어·조직 설정에 따라 다를 수 있다.

1. 터미널에서 `claude --permission-mode plan`으로 시작한다.
2. 관련 파일, 목표, 범위, 완료 조건을 설명하고 계획을 읽는다.
3. 계획 승인 화면에서 **편집 수동 승인** 옵션을 선택한다. 계획 모드가 종료되고 구현 단계로 넘어간다.
4. 상태 줄의 `manual mode on` 표시를 확인한다. 세션의 모드 전환은 `Shift+Tab`으로도 가능하다.

승인 화면이 없다면 `/exit` 후 같은 폴더에서 `claude --continue --permission-mode default`로 재개하는 대안도 유효하다. 공식 세션 문서는 재개할 때 `--permission-mode`가 복원될 모드를 재정의한다고 명시한다. 세션 안의 `/resume`은 선택한 대화의 저장된 모드 대신 현재 세션 모드를 유지한다. [공식 세션 관리](https://code.claude.com/docs/ko/sessions)

Plan은 소스 변경 전에 탐색하고 계획을 제안하는 모드다. **컴퓨터 전체가 읽기 전용이 된다는 보장은 아니다.** 셸 명령을 실행할 수 있으며, 자동 모드를 사용할 수 있는 구성에서는 분류기가 승인한 명령이 질문 없이 실행될 수 있다. 권한 우회가 가능한 터미널에는 편집 차단의 예외도 문서화되어 있다. 실습에서 권한 우회를 활성화하지 않는다. [공식 권한 모드](https://code.claude.com/docs/ko/permission-modes)

최신 문서는 v2.1.283+ 대화형 터미널의 기본 시작 모드를 `auto`로 설명한다. 조직·사용자 설정과 모델 지원 여부로 달라질 수 있으므로 “처음에는 항상 승인 질문이 나온다”는 문장을 사용하지 않는다. `default`의 현재 UI 명칭은 Manual이다. 자동 모드는 안전 보장을 뜻하지 않는다. [시작 모드와 자동 모드](https://code.claude.com/docs/ko/permission-modes)

`/permissions`는 허용·확인 요청·거부 **규칙**을 관리한다. 이 명령을 모드 전환 명령으로 설명하지 않는다. Manual도 모든 읽기와 이미 허용된 동작마다 재승인을 요구하는 것은 아니다. `bypassPermissions`는 권한 프롬프트를 건너뛰며, 공식 문서는 손상을 제한할 수 있는 격리 환경에만 사용하도록 안내한다. [권한 규칙과 모드](https://code.claude.com/docs/ko/permissions)

## 4. 터미널 명령과 세션 명령

터미널에서 쓰는 명령이다. `--continue`는 현재 디렉터리의 최근 대화를, `--resume`은 선택하거나 지정한 대화를 다시 연다. `--permission-mode default`는 Manual로 시작하는 값이다. [CLI 참조](https://code.claude.com/docs/ko/cli-reference)

| 명령 | 뜻 |
| --- | --- |
| `claude` | 대화형 세션 시작 |
| `claude --permission-mode plan` | 계획 모드로 시작 |
| `claude --permission-mode default` | Manual 모드로 시작 |
| `claude --continue` 또는 `claude -c` | 최근 대화 계속 |
| `claude --resume` 또는 `claude -r` | 이전 대화 선택 |

아래는 **Claude Code 안에서** 입력한다. 공식 명령 목록은 현재 별도 `commands` 페이지다. [공식 세션 명령](https://code.claude.com/docs/ko/commands)

| 명령 | 입문 설명 |
| --- | --- |
| `/help` | 사용 가능한 명령 확인 |
| `/init` | 프로젝트를 살펴 `CLAUDE.md` 초안 만들기 |
| `/memory` | 지침 파일 편집 및 자동 메모리 확인·설정 |
| `/permissions` | 도구 권한 규칙 관리 |
| `/plan` | 계획 모드 진입 |
| `/context` | 현재 컨텍스트 사용량 확인 |
| `/compact 보존할 내용` | 같은 대화를 요약해 공간 확보 |
| `/clear` | 빈 컨텍스트로 새 대화 시작 |
| `/resume` | 이전 대화 선택·재개 |
| `/usage` | 세션 비용·플랜 한도·활동 통계 |
| `/cost` | 현재는 `/usage`의 별칭 |
| `/exit` | 세션 종료 |

`/clear`는 파일을 되돌리는 명령이 아니며, 이전 대화는 `/resume`으로 재개할 수 있다. `/compact`도 파일 복구 명령이 아니다. [세션 초기화와 압축](https://code.claude.com/docs/ko/commands)

## 5. CLAUDE.md, rules, skills의 구분

| 무엇을 남기나 | 위치와 역할 |
| --- | --- |
| 매번 적용할 프로젝트 약속 | 루트 `CLAUDE.md` 또는 `.claude/CLAUDE.md` |
| 주제·파일 종류별 약속 | `.claude/rules/*.md`; `paths`로 적용 범위 지정 가능 |
| Claude가 작업 중 정리한 학습 | 자동 메모리; `/memory`로 검토·편집 |

`CLAUDE.md`는 테스트 방법, 작업 범위, 프로젝트 규칙처럼 반복해서 설명할 내용을 간결하게 적는다. `/init` 초안은 사람이 확인한다. 이미 파일이 있으면 `/init`은 덮어쓰기 대신 개선을 제안한다. 지침과 자동 메모리는 모델이 읽는 컨텍스트이며 강제 실행 규칙은 아니다. 실제 로딩 여부는 `/context`에서 확인한다. 자동 메모리는 로컬 저장이며 다른 기기까지 자동 동기화되는 팀 문서로 소개하지 않는다. [메모리와 프로젝트 지침](https://code.claude.com/docs/ko/memory)

반복할 다단계 작업은 `.claude/skills/<이름>/SKILL.md`로 만든다. 기본적으로 사용자가 `/이름`으로 부르거나 Claude가 관련성을 판단해 사용할 수 있다. 본문은 호출할 때 로드되고, 필요하면 참고 파일도 함께 둘 수 있다. 사용자가 직접 부를 때만 실행하려면 frontmatter에 `disable-model-invocation: true`를 사용한다. `.claude/commands/*.md`도 계속 동작하지만 새 작업에는 skills가 권장된다. `allowed-tools`는 도구를 제한하는 목록이 아니라 해당 도구에 대한 허용을 부여하는 필드이므로, 입문 예시에 무심코 추가하지 않는다. [공식 Skills 문서](https://code.claude.com/docs/ko/skills)

## 6. 확장은 필요가 생기면 추가한다

| 기능 | 정확한 개념과 입문 예시 | 공식 출처 |
| --- | --- | --- |
| Hook | 도구 실행 전후 등의 이벤트에 지정한 동작을 연결한다. 명령 기반 hook은 포맷터·검사 같은 절차를 자동 실행한다. 모델이 판단하는 종류의 hook도 있으므로 모든 hook이 결정론적이라고 일반화하지 않는다. | [Hooks](https://code.claude.com/docs/ko/hooks-guide) |
| MCP | 외부 도구·데이터 소스와 연결하는 표준이다. 예를 들어 승인받은 이슈 도구의 내용을 직접 조회할 수 있다. 모든 연결이 읽기 전용은 아니다. | [MCP](https://code.claude.com/docs/ko/mcp) |
| Subagent | 일부 일을 별도 컨텍스트의 보조 에이전트에게 맡기고 결과를 받는다. 탐색 결과로 주 대화가 너무 길어질 때 유용하며, 사용량도 소비한다. | [Subagents](https://code.claude.com/docs/ko/sub-agents) |

## 7. 결과 확인과 복구

검증 가능한 완료 조건을 먼저 주면 Claude가 작업, 확인, 수정의 반복을 수행할 수 있다. 확인 수단은 테스트·빌드뿐 아니라 기대 결과와 실제 화면의 비교도 가능하다. 입문 HTML 실습에서는 화면을 직접 열고 문구, 버튼 동작, 모바일 폭, 의도하지 않은 변경을 확인하도록 구성한다. 앞의 일반 원리는 공식 문서에서 확인했고, HTML 실습 항목은 편집 제안이다. [공식 모범 사례](https://code.claude.com/docs/ko/best-practices)

`/rewind`는 추적된 편집과 대화를 체크포인트로 되돌리거나 요약하는 기능이다. 입력창이 비어 있을 때 `Esc` 두 번으로도 메뉴를 연다. 입력 내용이 있으면 같은 단축키는 입력을 지운다. Bash 명령이 바꾼 파일, 일반적인 subagent 편집, 외부 변경까지 모두 복원하지 않는다. 체크포인트는 Git의 장기 기록과 협업 기능을 대체하지 않는다. “무엇을 해도 되감기로 복구된다”는 설명을 피한다. [공식 Checkpointing](https://code.claude.com/docs/ko/checkpointing)

## 8. 과거 설명을 그대로 쓰지 않을 항목

- Windows에서 Git Bash가 무조건 필수라는 안내는 현재 설정 문서와 다르다. 1절을 따른다.
- npm이 유일한 설치 경로라는 안내, Node 18+ 안내, npm이 완전히 폐지되었다는 안내 모두 현재 기준으로 부정확하다. 네이티브 권장 설치를 본문에 둔다.
- 기본 모드가 항상 수동 승인이라는 안내는 최신 시작 모드와 다르다. 실습 명령에 `--permission-mode plan`을 명시한다.
- Plan을 운영체제 수준의 완전한 읽기 전용·격리 환경으로 설명하지 않는다.
- `/cost`와 `/usage`를 서로 다른 최신 기능으로 설명하지 않는다.
- `.claude/commands`만 반복 작업의 정답으로 제시하지 않는다. 새 예시는 Skills로 작성한다.
- `CLAUDE.md`에 적으면 예외 없이 강제된다는 설명, `/clear`로 파일이 초기화된다는 설명, 체크포인트가 Git을 대체한다는 설명을 피한다.

## 9. Opus 5.5와 effort 선택

Effort는 추론 깊이와 응답 시간·토큰 사용량의 균형을 조절한다. Opus 5.5는 `low`, `medium`, `high`, `xhigh`, `max`를 지원하며, 별도 지정이 없다면 기본값은 `medium`이다. Claude Code v2.1.280 이상이 필요하다. `max`는 과도한 추론과 효용 감소가 있을 수 있다. 수준은 모델마다 다르게 조정되므로 이전 모델의 값을 그대로 이어받기보다 `medium`에서 시작한다. [공식 모델·effort 구성](https://code.claude.com/docs/ko/model-config)

### 실습 시작과 현재 값 확인

터미널에서 모델·effort·권한 모드를 함께 지정할 수 있다. 다음은 이번 세션을 Opus 5.5, medium, Plan으로 시작하는 예시다. `--model`과 `--effort`는 이 실행에 적용되며 기본 설정 파일을 바꾸지 않는다. [공식 CLI 참조](https://code.claude.com/docs/ko/cli-reference)

```text
claude --model claude-opus-5-5 --effort medium --permission-mode plan
```

Claude Code 안에서는 다음 명령을 사용한다. [공식 세션 명령](https://code.claude.com/docs/ko/commands)

| 명령 | 용도 |
| --- | --- |
| `/model claude-opus-5-5` | Opus 5.5로 변경 |
| `/effort status` | 현재 적용되는 effort 확인 |
| `/effort medium` | medium 선택 |
| `/effort auto` | 현재 모델에 저장한 선택을 지우고 자동 결정으로 복귀 |
| `/effort` | 슬라이더 열기 |

`/effort medium` 같은 직접 입력이나 선택기의 `Enter`는 **모델별 기본값으로 저장되어 다음 세션에도 적용**된다. 이번 세션만 바꾸려면 `/effort` 슬라이더에서 `s`로 확정한다. `/model`에서도 좌우 화살표로 effort를 조절할 수 있다. `max`는 환경 변수로 지정하는 예외를 제외하면 현재 세션에만 적용된다. [effort 저장 범위](https://code.claude.com/docs/ko/model-config)

### 설정이 예상과 다를 때

`CLAUDE_CODE_EFFORT_LEVEL`은 `--effort`, `/effort`, `modelSettings`, `effortLevel`보다 우선한다. 허용 값은 다섯 수준과 `auto`이며, `auto`는 모델 기본값을 사용한다. 조직의 `maxEffortLevel` 제한은 여전히 적용된다. 환경 변수를 바꿨다면 새 `claude` 프로세스에서 확인한다. 초보자 본문에는 환경 변수 설정을 요구하지 않고, 값이 달라 보일 때 확인할 항목으로만 둔다. [공식 환경 변수](https://code.claude.com/docs/ko/env-vars)

저장된 모델별 값은 `modelSettings`에 있다. 과거 사용자 설정의 최상위 `effortLevel`은 Opus 5.5에 적용되지 않지만 프로젝트·로컬·관리 설정 및 `--settings`의 값은 적용된다. 설정 파일의 effort를 편집하는 것보다 세션에서 `/effort`를 사용해 변경하는 흐름을 안내한다. [모델별 기본값](https://code.claude.com/docs/ko/model-config), [설정 적용 시점](https://code.claude.com/docs/ko/settings)

Plan은 권한·진행 방식, effort는 추론 수준이다. “Plan이면 자동으로 high”라고 설명하지 않는다. 별도 모델 별칭 `opusplan`은 계획에 Opus, 구현에 Sonnet을 사용한다. [권한 모드](https://code.claude.com/docs/ko/permission-modes), [opusplan 모델 별칭](https://code.claude.com/docs/ko/model-config)

### 기존 입문 예제에 붙일 추천

다음은 **가이드 작성자의 추천**이며, 이 예제를 각 수준에서 실행해 성능을 측정한 결과가 아니다. 기본 시작점은 `medium`으로 두고 작업 범위에 따라 조정한다.

| 실습 | 추천 effort | 편집 이유 |
| --- | --- | --- |
| `brief.md`를 읽고 할 일을 간단히 요약 | `low` | 새 구현보다 짧은 내용 파악이 중심이다. |
| 모임 안내 페이지의 계획 작성 | `medium` | 요구사항과 완료 조건을 함께 정리하는 첫 설계다. |
| 계획에 따라 단일 `index.html` 만들기 | `medium` | 범위가 작은 구현이지만 문구·레이아웃·동작을 함께 맞춘다. |
| 시간 14~16시를 15~17시로 수정, 작은 색상·문구 변경 | `low` | 바꿀 위치와 기대 결과가 명확하다. |
| `next-step.md`에 변경 사항·검증 결과·다음 할 일 기록 | `low` | 이미 확인한 사실을 요약한다. |
| 장바구니 수량 0 오류의 원인 분석과 경계 조건 검증 | `high` | 재현, 원인 추적, 영향 확인을 함께 요구한다. |
| 위 작업으로 해결되지 않는 복잡한 문제의 추가 탐색 | 필요할 때 `xhigh` | 첫 수업의 기본값으로 두지 않고 난도가 실제로 높을 때 비교한다. |
| 첫날의 작은 HTML 실습 전반 | `max`는 권하지 않음 | 추가 시간·사용량의 이득을 확인하기 어려운 범위다. |

위 배정은 [공식 effort 선택 기준](https://code.claude.com/docs/ko/model-config)을 이 입문 과정에 적용한 판단이다.

## 확인하지 않은 범위

실제 계정의 기능 노출, 현재 설치 버전, 조직 정책, 플랫폼별 화면 문구, 설치 성공 여부는 이 조사에서 검증하지 않았다. 가이드에는 “2026-10-03 공식 문서 확인”을 표시하고, 독자가 `claude --version`, `/help`, 현재 모드 표시를 확인할 수 있게 한다. 공식 최신 문서는 계속 바뀌므로 이후 수정 시 위 링크를 다시 읽어야 한다.

## 10. Ultracode와 dynamic workflows 추가 조사

추가 확인일은 2026-10-03이다. 공식 기능으로 확인했으며, 아래 절차는 **Claude Code v2.1.284 이상**의 동작을 기준으로 한다. 실제 workflow나 유료 모델 호출은 실행하지 않았다.

### 용어와 역할

Dynamic workflow는 Claude가 작업에 맞는 **JavaScript 조율 스크립트**를 작성하고, 런타임이 여러 subagent를 병렬 또는 단계별로 실행하는 기능이다. 반복·분기·중간 결과는 스크립트가 관리하며 각 agent가 파일 읽기·수정·명령 실행을 담당한다. 여러 검토자가 찾은 문제를 다른 검토자가 검증하는 절차도 구성할 수 있다. 단순히 “복잡한 프롬프트를 순서대로 보낸다”는 뜻보다 구체적인 Claude Code 기능이다. [Anthropic 공식 Cookbook](https://platform.claude.com/cookbook/claude-agent-sdk-08-dynamic-workflows)

Ultracode는 모델 이름이나 `max` 다음의 effort 수준이 아니다. **workflow 조율을 자동으로 사용하게 하는 Claude Code 설정**이다. effort는 추론 수준, ultracode는 작업을 나누고 조율하는 방식, Plan은 변경 전에 탐색·계획하는 권한 모드로 구분한다. [모델 설정](https://code.claude.com/docs/ko/model-config), [권한 모드](https://code.claude.com/docs/ko/permission-modes)

### 켜는 방법마다 적용 범위가 다르다

| 어디에 입력하나 | 입력 | 최신 동작 |
| --- | --- | --- |
| Claude Code 안 | `/effort ultracode` 또는 `/effort ultracode on` | 현재 effort를 유지하면서 이번 세션의 자동 workflow 조율을 켠다. |
| Claude Code 안 | `/effort ultracode off` | 자동 조율을 끈다. effort와 저장된 `ultracode` 설정은 바꾸지 않는다. |
| Claude Code 안 | `/effort status` | 현재 effort를 확인한다. |

위 명령의 `on`·`off`와 현재 effort 유지는 v2.1.284+ 동작이다. **이전 버전은 `/effort ultracode`가 xhigh로 바꾸며 `off` 인수를 지원하지 않았다.** [공식 명령 참조](https://code.claude.com/docs/ko/commands)

터미널의 `claude --effort ultracode`는 자동 조율을 켜면서 **xhigh를 요청**한다. 이 플래그는 v2.1.203+에서 지원되며 해당 세션에만 적용된다. `/effort ultracode`와 효과가 완전히 같다고 설명하지 않는다. [CLI 참조](https://code.claude.com/docs/ko/cli-reference)

직접 입력하는 한 프롬프트의 `ultracode: …`는 그 작업에만 workflow를 요청하며 effort를 바꾸지 않는다. 자연어로 “이 작업에 dynamic workflow를 사용해 줘”라고 요청할 수도 있다. `-p`로 넘기는 프롬프트의 키워드는 같은 방식의 실행 동의가 아니다. [워크플로 요청](https://code.claude.com/docs/ko/workflows)

설정 파일의 `"ultracode": true`로 다음 세션에도 적용할 수 있다. `effortLevel`이나 `CLAUDE_CODE_EFFORT_LEVEL`에 `ultracode`를 넣는 형식은 지원하지 않는다. 최신 버전에서는 effort를 medium으로 바꾸어도 ultracode가 자동으로 꺼지지 않는다. [설정과 effort의 관계](https://code.claude.com/docs/ko/model-config)

### 지원 조건과 실행 확인

Dynamic workflows는 유료 플랜과 Anthropic API 및 지원되는 클라우드 제공자에서 사용 가능하다. **Pro는 `/config`에서 Dynamic workflows를 켠다.** 조직 설정 또는 `disableWorkflows`가 차단하면 사용할 수 없다. [지원 및 비활성화 설정](https://code.claude.com/docs/ko/workflows)

Ultracode는 workflow가 활성화되어 있고 모델이 `xhigh`를 지원해야 한다. Opus 5.5는 조건에 맞는다. `CLAUDE_CODE_EFFORT_LEVEL`이나 effort 상한이 있으면 그 수준에서 조율하며, 낮은 effort 상한만으로 ultracode를 끄지는 않는다. [Ultracode 사용 조건](https://code.claude.com/docs/ko/model-config)

Manual에서는 workflow별 실행 확인이 기본이며, 저장된 workflow에 “다시 묻지 않기”를 선택한 경우는 예외다. Auto는 최초 동의 후 확인을 생략하고, ultracode가 켜져 있으면 최초 확인과 `Large workflow` 경고도 생략한다. 도구 호출은 해당 세션의 권한 규칙을 따른다. [실행 승인과 비용](https://code.claude.com/docs/ko/workflows)

Plan 자체가 workflow를 켜지는 않는다. Plan 승인과 workflow 실행 승인은 다른 절차다. 공식 workflow 승인 표에는 Plan 행이 없으므로, 가이드에서는 Plan 안의 실행을 단정하지 않고 **계획 검토 후 Manual에서 선택 실습을 진행**하도록 제안한다. [계획 검토 절차](https://code.claude.com/docs/ko/permission-modes), [워크플로 실행 승인](https://code.claude.com/docs/ko/workflows)

### 진행 상황, 규모, 저장

`/workflows`는 실행 목록·진행 상황·agent별 토큰 사용량을 보여 준다. 실행을 선택해 `p`로 일시 중지·재개, `x`로 중지, `s`로 명령으로 저장한다. 프로젝트 저장 위치는 `.claude/workflows/`, 개인 위치는 `~/.claude/workflows/`이며 저장한 이름으로 `/<name>`을 실행한다. [실행 관리와 저장](https://code.claude.com/docs/ko/workflows)

`/config workflowSizeGuideline=small`은 **agent 5개 미만을 목표로 하는 지침**이며 강제 상한이나 비용 보장이 아니다. [규모 설정](https://code.claude.com/docs/ko/workflows)

여러 agent가 사용하는 토큰 때문에 일반 세션보다 사용량이 커질 수 있다. 공식 발표도 좁은 작업부터 시작하라고 권한다. 설치·계정 조건과 별개로 “항상 더 빠르다”, “결과를 자동 보증한다”는 표현은 사용하지 않는다. [공식 기능 발표](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)

### 기존 가이드에 넣을 선택 실습

다음은 가이드 작성자의 예시다. 작은 HTML 실습에서 workflow가 꼭 필요하다는 뜻은 아니며, **작업 분담 → 별도 검증 → 하나의 보고서** 흐름을 관찰하기 위한 선택 활동이다. 기본 구현과 시간 수정은 9절의 medium·low 추천을 유지한다.

1. 터미널에서 아래 명령으로 시작한다. Pro라면 `/config`에서 Dynamic workflows를 먼저 활성화한다.

   ```text
   claude --model claude-opus-5-5 --effort medium --permission-mode default
   ```

2. Claude Code 안에서 규모 지침을 선택한다.

   ```text
   /config workflowSizeGuideline=small
   ```

3. 세션 전체 설정을 켜지 않고, 다음 한 작업에 workflow를 요청한다.

   ```text
   ultracode: brief.md와 index.html을 검토해 줘.
   한 검토자는 날짜·시간·장소가 요구사항과 맞는지,
   다른 검토자는 버튼과 작은 화면에서 생길 수 있는 문제를 살펴봐.
   마지막 검토자는 두 결과를 파일 근거로 다시 확인하고 중복을 제거해 줘.
   파일을 수정하지 말고, 확인된 문제·확인하지 못한 사항·내가 직접 볼 항목을 나눠 보고해 줘.
   ```

4. 실행 확인에 표시된 단계와 스크립트를 읽고 진행한다. `/workflows`에서 실제 단계·agent 수·사용량을 확인한 뒤 결과를 원본 파일과 화면에서 검증한다. 작은 화면을 실제로 열어 보지 못했다면 “모바일 검증 완료”로 받아들이지 않는다.

여러 파일에 같은 검토를 반복하거나, 서로 다른 자료를 독립적으로 읽고 교차 검증해야 할 때 활용 가치가 더 크다. 반대로 문구 하나 변경, 시간 수정, 짧은 인수인계 요약에는 기존 단일 세션을 쓰는 편이 적절하다는 것이 이 가이드의 편집 판단이다.

### 문서 간 차이와 검증 한계

2026-05-28 [공식 발표](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)와 [Claude Academy](https://academy.claude.com/tutorials/choosing-the-right-effort-level-in-claude-code)에는 ultracode가 xhigh로 설정된다는 설명이 남아 있다. 이 문서에서는 v2.1.284 변경을 명시한 최신 [명령 참조](https://code.claude.com/docs/ko/commands)·[모델 설정](https://code.claude.com/docs/ko/model-config)을 현재 CLI 동작의 근거로 삼았다.

명령 이름·지원 조건·버전 차이는 공식 문서로 검증했다. 계정별 메뉴 노출, 실제 agent 배치, 토큰 사용량, 예시 결과의 정확도는 직접 실행하지 않아 검증하지 않았다. 설치·유료 실행·설정 변경은 수행하지 않았다.

## 11. 가상 프론트엔드 실습을 GitHub Pages로 공개하기

확인일은 2026-10-03이다. 이 절은 독자가 사용할 **배포 가이드와 프롬프트의 조사 자료**다. 실제 저장소 생성·업로드·push·Pages 설정·배포는 실행하지 않았다.

### 초보자에게 안내할 브라우저 절차

GitHub Pages는 HTML·CSS·JavaScript를 게시하는 정적 사이트 호스팅이다. GitHub Free에서도 public 저장소에 사용할 수 있다. 일반 프로젝트 저장소 `meetup-page`의 주소는 `https://OWNER.github.io/meetup-page/`이며, `OWNER.github.io`라는 이름을 쓰는 사용자 사이트와 구분한다. [GitHub Pages 개념과 사이트 유형](https://docs.github.com/ko/pages/getting-started-with-github-pages/what-is-github-pages)

1. GitHub의 **New repository**에서 본인 계정, 새 이름 `meetup-page`, **Public**을 선택한다. 웹 업로드 방식에서는 README를 추가해 초기 브랜치를 만들어도 된다. **Create repository**를 누른다. [새 저장소 만들기](https://docs.github.com/ko/repositories/creating-and-managing-repositories/creating-a-new-repository)
2. 저장소 루트에서 **Add file → Upload files**로 `index.html`을 올리고 커밋한다. 필요한 CSS·이미지가 있다면 함께 올리며 폴더 구조를 보존한다. 업로드가 끝난 뒤 게시할 브랜치의 루트에 파일이 있는지 확인한다. 새 브랜치로 올렸다면 게시 브랜치에 병합해야 한다. [파일 업로드](https://docs.github.com/ko/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → /(root) → Save**를 선택한다. `main`이 이미 있어야 하며, 실제 브랜치명이 다르면 먼저 이름을 확인한다. 설정 권한은 관리자 또는 유지 관리자에게 있다. [게시 소스 구성](https://docs.github.com/ko/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. **Actions**에서 해당 Pages 실행을 열어 빌드·배포 결과를 확인한다. branch 방식도 GitHub가 Actions 실행으로 배포하므로, Actions 기록이 생겼다는 이유로 Source를 GitHub Actions로 바꿀 필요는 없다. [게시·배포 방식](https://docs.github.com/ko/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [실행 기록 보기](https://docs.github.com/ko/actions/how-tos/monitor-workflows/view-workflow-run-history)
5. **Settings → Pages → Visit site**에서 실제 URL을 열어 문구·버튼·좁은 화면을 확인한다. push 후 게시까지 최대 10분이 걸릴 수 있으므로, 저장소에 파일이 보이는 것과 사이트 게시 완료를 구분한다. [사이트 게시와 확인](https://docs.github.com/ko/pages/getting-started-with-github-pages/creating-a-github-pages-site)

이 실습에서는 공개할 가상 `index.html`과 필요한 자산만 새 전용 저장소에 옮기는 구성이 단순하다. Pages는 서버 측 PHP·Ruby·Python을 실행하지 않으므로, 안내 페이지의 버튼만으로 실제 신청 데이터가 저장된다고 설명하지 않는다. [정적 파일 게시 범위](https://docs.github.com/ko/pages/getting-started-with-github-pages/creating-a-github-pages-site)

### 처음 열었을 때 404 또는 자산 누락

- 사이트 전체가 404라면 배포 완료 여부, URL의 `/meetup-page/`, 게시 브랜치·폴더, 그 위치의 **소문자 `index.html`**을 확인한다. 루트 게시인데 `practice/index.html`로 올렸다면 진입 파일 위치가 다르다. [404 해결 원문](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
- HTML만 보이고 이미지·CSS가 없다면 참조 경로와 대소문자를 확인한다. 프로젝트 주소에서 `./assets/logo.png`는 `/meetup-page/assets/logo.png`를, `/assets/logo.png`는 도메인 루트의 `/assets/logo.png`를 가리킨다. 따라서 첫 실습은 상대 경로를 권한다. 이는 공식 [프로젝트 URL 구조](https://docs.github.com/ko/pages/getting-started-with-github-pages/what-is-github-pages)에 일반적인 URL 해석을 적용한 편집 설명이다.
- Actions가 실패하면 해당 실행 로그를 먼저 읽는다. 성공했지만 변경이 안 보이면 배포된 커밋과 URL을 확인한 뒤 새로고침한다. [워크플로 기록과 로그](https://docs.github.com/ko/actions/how-tos/monitor-workflows/view-workflow-run-history)

한국어 [404 문서](https://docs.github.com/ko/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)에는 `index.HTML`을 써야 한다는 반대 의미의 번역 오류가 확인되었다. 영어 원문과 사이트 생성 문서는 `index.html`을 지정하므로 가이드에서는 소문자를 사용한다.

### GitHub CLI를 쓰는 선택 경로

아래는 **웹에서 아직 만들지 않은 새 저장소**에 대한 명령 예시다. Git·GitHub CLI 설치와 인증이 끝났고, 실습 전용 로컬 Git 저장소의 `main`에 공개할 파일만 커밋되어 있다고 가정한다. 실제 계정명으로 `OWNER`를 바꾼다.

```text
gh repo create OWNER/meetup-page --public --source . --remote origin --push
```

`--source`는 기존 로컬 저장소를 지정하고 `--push`는 그 커밋을 전송한다. 새 원격 저장소의 기본 브랜치는 계정 설정에 따르므로 무조건 main이라고 가정하지 않는다. 기존 저장소와 이력이 들어 있는 폴더에서 무심코 실행할 예시로 제시하지 않는다. [공식 gh repo create](https://cli.github.com/manual/gh_repo_create)

새 Pages 사이트를 설정하는 REST 요청은 다음과 같이 표현할 수 있다. `build_type=legacy`는 branch 기반 게시이고, `workflow`는 사용자 정의 Actions 방식이다. POST는 `source.branch`와 `source.path`를 받으며 path는 `/` 또는 `/docs`다. [공식 Pages API](https://docs.github.com/ko/rest/pages/pages#create-a-github-pages-site)

```text
gh api --method POST "repos/OWNER/meetup-page/pages" -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2026-03-10" -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
```

`gh api`의 `-f`는 문자열 필드, `key[subkey]`는 중첩 객체 표기다. 위처럼 인수를 따옴표로 묶으면 PowerShell에서도 중괄호·대괄호를 포함하는 인수를 명확히 전달할 수 있다. [공식 gh api](https://cli.github.com/manual/gh_api)

Pages 설정이 이미 있다면 생성 POST를 반복하지 않고 GET으로 조회하고, 변경할 때는 PUT을 사용한다. 생성 API에는 저장소 관리자·유지 관리자 또는 Pages 설정 관리 권한이 필요하며, fine-grained token은 Pages write와 Administration write가 필요하다. API 성공 응답은 화면 품질 검증 완료가 아니다. [Pages API 권한·조회·수정](https://docs.github.com/ko/rest/pages/pages)

```text
gh api "repos/OWNER/meetup-page/pages" --jq "{status: .status, url: .html_url, source: .source}"
```

### Claude Code 프롬프트 편집안

다음 두 요청은 독자가 실제 공개 작업을 준비하고 진행할 때 쓰는 예시다. 첫 요청으로 대상과 파일을 확인하고, 두 번째 요청에서 그 대상을 명시해 배포한다.

```text
이 연습 폴더의 가상 모임 안내 페이지를 GitHub Pages로 공개하려고 해.
새 저장소는 OWNER/meetup-page, 공개 범위는 Public이야.
index.html과 실제로 참조하는 자산을 확인하고,
게시할 파일 목록·상대 경로 수정·main 루트 게시 절차를 정리해 줘.
먼저 로컬 화면과 링크를 검증하고 변경 내역을 보여줘.
지금은 원격 저장소 생성이나 push, Pages 활성화는 하지 마.
```

```text
확인한 파일을 새 Public 저장소 OWNER/meetup-page에 게시해 줘.
위에서 확인한 실습 폴더와 파일 목록을 사용해.
같은 이름의 저장소가 이미 있으면 덮어쓰지 말고 알려줘.
main 브랜치의 루트를 Pages 게시 원본으로 설정해.
Actions 배포 결과와 실제 github.io URL을 확인하고,
저장소 주소·게시 주소·확인한 항목·아직 확인하지 못한 항목을 보고해 줘.
GitHub CLI를 사용할 수 없으면 내가 따라 할 브라우저 절차를 안내해 줘.
```

위 프롬프트·파일 범위·완료 기준은 이 가이드를 위한 편집 제안이다. 공식 문서로 UI 순서와 API 형식을 확인했지만 실제 계정 권한, API 응답, 첫 배포 소요 시간, 게시 화면은 직접 검증하지 않았다.

## 12. Wayfinder와 Superpowers로 의사결정부터 검증까지

확인일은 2026-10-03이다. 이 절은 기본 실습 다음에 넣을 **교육용 안내의 조사 자료**다. 아래 명령은 독자가 사용할 예시이며, 이번 조사에서 플러그인 설치·설정 변경·이슈 생성·기능 구현·커밋은 실행하지 않았다.

### 설치와 호출 이름

두 프로젝트의 현재 README는 Claude Code 공식 마켓플레이스 설치를 안내한다. Claude Code 대화창에서 다음 명령을 각각 실행하는 경로를 기본으로 제시할 수 있다. Matt Pocock의 대안인 `npx skills@latest add mattpocock/skills`는 파일 복사 방식이므로 같은 스킬을 중복 설치하는 안내는 피한다. [Matt Pocock 설치 안내](https://github.com/mattpocock/skills), [Superpowers 설치 안내](https://github.com/obra/superpowers)

```text
/plugin install mattpocock-skills
/plugin install superpowers@claude-plugins-official
```

Claude 공식 문서에서 플러그인 스킬의 호출 형식은 `/plugin-name:skill-name`이다. Matt 플러그인의 이름은 `mattpocock-skills`이므로 가이드에서는 `/mattpocock-skills:wayfinder`와 `/mattpocock-skills:setup-matt-pocock-skills`를 쓴다. README의 짧은 `/wayfinder` 표기와 파일 복사 설치의 이름을 혼동하지 않도록 설치 후 실제 `/` 목록을 확인한다. [Claude 스킬 이름 규칙](https://code.claude.com/docs/en/skills), [Matt 플러그인 manifest](https://github.com/mattpocock/skills/blob/main/.claude-plugin/plugin.json)

공식 마켓플레이스는 저장소의 특정 커밋을 가리킬 수 있어 저장소 `main`의 지침과 독자가 설치한 버전이 항상 같다고 단정하지 않는다. 현재 설치 안내는 예전의 별도 마켓플레이스 등록 절차를 대체한다. [Matt 플러그인 배포 결정 기록](https://github.com/mattpocock/skills/blob/main/.agents/adr/0002-ship-as-a-claude-code-plugin.md)

### Wayfinder의 역할과 로컬 실습 설정

Wayfinder는 경로가 불명확한 여러 세션 규모의 작업에서 **무엇을 결정해야 하는지** 지도를 만든다. 기본 모드는 의사결정이며, 각 티켓은 구현 작업량보다 답해야 할 질문을 나타낸다. 첫 세션은 지도와 의존 관계를 만들고 멈춘다. 이후에는 막히지 않은 질문 하나씩 해결한다. 작거나 이미 명확한 요청이라면 지도가 필요 없다고 판단할 수 있다. [Wayfinder 원문](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md), [용도 설명](https://github.com/mattpocock/skills/blob/main/docs/engineering/wayfinder.md)

`setup-matt-pocock-skills`는 저장소마다 한 번 실행하는 설정 대화다. GitHub·Linear·로컬 파일 중 트래커와 문서 위치를 정한다. GitHub remote가 있으면 GitHub를 기본 제안할 수 있으므로, 입문 실습에서는 **로컬 Markdown**을 명시한다. 설정은 `docs/agents/issue-tracker.md` 등의 문서를 만들고 기존 `CLAUDE.md` 또는 `AGENTS.md`에 참조를 연결할 수 있다. [설정 스킬](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md)

```text
/mattpocock-skills:setup-matt-pocock-skills
이번 저장소는 학습용이야. 이슈 트래커는 로컬 Markdown으로 설정해.
.scratch/checklist/ 아래에 지도와 질문을 보관하고 GitHub·Linear 이슈는 만들지 마.
제안하는 설정 파일과 기존 CLAUDE.md 변경 내용을 먼저 보여줘.
```

로컬 트래커 템플릿의 기본 구조는 `.scratch/<effort>/map.md`와 `.scratch/<effort>/issues/NN-<slug>.md`다. 질문 파일의 상태·의존 관계·답과 지도 링크로 진행 상황을 보존한다. 이는 Superpowers의 구현 계획과 별개다. [로컬 트래커 템플릿](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md)

### 두 묶음을 잇는 교육용 과정

다음 연결은 공식 공동 통합 절차가 아니라 **이 가이드의 편집 구성**이다. Wayfinder로 미결정을 정리한 뒤 Superpowers로 설계와 구현을 구체화한다. 앞의 ‘계획’은 질문·범위·완료 기준을 정하는 활동이고, 설계 뒤의 ‘구현 계획’은 변경 파일과 실행 순서를 정하는 활동이다.

| 단계 | 역할 | 독자가 확인할 결과 |
| --- | --- | --- |
| 1. 의사결정 계획 | Wayfinder | 목표, 미결정 질문, 선택 이유, 이번에 하지 않을 범위 |
| 2. 설계 | `superpowers:brainstorming` | 화면·동작·상태 저장·오류 처리·성공 기준 |
| 3. 구현 계획 | `superpowers:writing-plans` | 변경 파일, 작업별 테스트, 실행 명령과 기대 결과 |
| 4. 구현과 반복 테스트 | `superpowers:executing-plans` + `superpowers:test-driven-development` | 실패하는 테스트 → 최소 구현 → 통과 → 정리의 실제 결과 |
| 5. 최종 확인 | `superpowers:verification-before-completion` | 전체 관련 검증, 요구사항 대조, 확인하지 못한 항목 |

최신 brainstorming은 실험(spike)·기존 흐름의 제한된 변경(bounded)·새 프로젝트나 구조 변경(architectural)을 구분한다. bounded는 짧은 채팅 설계 확인 후 문서 계획 없이 구현할 수 있다. architectural은 설계 문서를 검토한 다음 구현 계획으로 넘어간다. 따라서 작은 체크리스트 기능에 모든 문서가 항상 필수라고 설명하지 않는다. 전체 단계를 연습하는 경우에는 학습 목적의 문서화를 별도로 요청한다. [brainstorming 원문](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)

문서가 필요한 경로의 기본 설계 위치는 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`, 구현 계획 위치는 `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`다. writing-plans는 작업을 독립적으로 검증할 수 있는 단위로 나누고 테스트·구현·검증 순서와 구체적인 파일을 적는다. 계획을 읽은 뒤 사용자가 실행 방식을 선택하는 단계가 있다. [설계 문서 위치](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md), [writing-plans 원문](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md)

최신 executing-plans는 **현재 세션에서 직접** 계획을 실행하고 마지막에 전체 변경을 별도 검토하는 경로다. 오래된 설명처럼 반드시 새 세션에서만 실행한다고 쓰지 않는다. 서브에이전트별 구현·검토를 원하는 경우의 `subagent-driven-development`와 구분한다. [executing-plans 원문](https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md)

TDD는 기능 구현 후 테스트를 몰아서 붙이는 절차가 아니다. 원하는 행동을 테스트로 표현하고 실제 실패를 확인한 뒤 최소 구현을 추가한다. 통과 후 정리하고 관련 전체 테스트도 확인한다. 최종 검증은 명령·종료 상태·출력을 읽고 주장할 수 있는 범위를 정하는 별도 단계다. [TDD 원문](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md), [완료 전 검증 원문](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md)

### 기본 모임 안내 페이지 다음에 넣을 체크리스트 예시

아래는 **독자가 따라 하는 기능 추가 프롬프트**이며, 현재 가이드에 체크리스트 기능을 실제 구현하라는 요청이 아니다. 작은 예제에서는 Wayfinder가 지도를 생략하자고 할 수 있다는 설명을 함께 둔다.

```text
/mattpocock-skills:wayfinder
기본 모임 안내 페이지에 ‘참가 준비 체크리스트’를 추가하는 과정을 연습하고 싶어.
이 단계에서는 구현하지 말고 결정할 질문부터 정리해 줘.
항목을 고정할지, 새로고침 후 체크 상태를 보존할지,
완료 개수를 보여줄지, 키보드로 조작할 때 무엇을 확인할지 검토해.
질문 지도는 로컬 .scratch/checklist/에 보관해.
작은 요청이라 지도가 불필요하다면 그 이유와 간단한 결정 메모를 제안해.
```

지도가 생겼다면 후속 요청은 ‘열려 있고 막히지 않은 질문 하나를 함께 해결하자’다. 답을 결정 기록에 남긴 뒤 다음 단계로 넘긴다. 기능 티켓을 모두 구현하라는 의미로 지도 전체를 넘기지 않는다.

```text
/superpowers:brainstorming
앞의 결정 기록을 읽고 참가 준비 체크리스트를 설계해 줘.
이번에는 전체 과정을 배우려 하므로 짧은 설계 문서와 구현 계획도 남기고 싶어.
완료 기준은 항목 체크·해제, 완료 개수의 정확성, 키보드 조작이야.
저장 여부와 초기화 동작은 앞에서 선택한 결정을 따라.
기존 안내 문구와 화면 구성을 확인하고, 설계 검토부터 진행해.
```

설계 확인 뒤에는 `/superpowers:writing-plans`로 파일·작업·검증 기준을 계획한다. 학습자는 계획을 읽고 ‘이 계획으로 현재 세션에서 진행해’라고 실행 방식을 지정한 다음 `/superpowers:executing-plans`로 이어갈 수 있다. 테스트 환경이 없는 정적 페이지라면 계획 단계에서 자동 검증 방법과 브라우저에서 직접 볼 항목을 먼저 정한다. 준비되지 않은 `npm test`가 이미 존재하는 것처럼 예시를 쓰지 않는다.

완료 보고서에는 체크·해제·개수·키보드 조작 및 선택한 저장 동작을 각각 어떻게 확인했는지 적도록 한다. 자동 테스트 통과만으로 실제 작은 화면까지 검증했다고 표현하지 않는다. 이 예시의 기능 선택과 완료 기준은 교육용 편집 제안이며, 명령의 실제 설치 결과·생성 파일·테스트 결과는 이번 조사에서 실행 검증하지 않았다.

## 13. Claude 데스크톱 앱과 CLI의 차이

확인일은 2026-10-03이다. 공식 최신 문서로 조사했으며 앱 설치·로그인·실제 세션 실행은 하지 않았다. 다음 안내는 입문 실습에 맞춘 **Code 탭의 Local 환경** 기준이다.

### 어디서 시작하는가

Claude 데스크톱의 Chat은 일반 대화, Cowork는 독립적으로 진행하는 작업, Code는 프로젝트 파일을 직접 다루는 개발 세션이다. 이 가이드의 HTML 실습에는 **Code**를 선택한다. 일반 구독 경로는 Pro·Max·Team·Enterprise를 지원한다. 앱에 Claude Code가 포함되므로 Code 탭 사용에 CLI나 Node.js를 먼저 설치할 필요는 없다. 터미널의 `claude` 명령을 쓰려면 CLI를 별도로 설치한다. 프로젝트 자체가 요구하는 실행 도구까지 모두 포함된다는 뜻은 아니다. [데스크톱 시작하기](https://code.claude.com/docs/ko/desktop-quickstart)

macOS와 Windows용 앱 외에 **Linux 베타도 현재 제공**된다. Linux는 Ubuntu 22.04+/Debian 12+, x86_64·arm64가 대상이다. ‘Linux에서는 데스크톱 앱을 사용할 수 없다’는 오래된 설명을 옮기지 않는다. [현재 다운로드 안내](https://code.claude.com/docs/ko/desktop-quickstart), [Linux 베타 요구사항](https://code.claude.com/docs/ko/desktop-linux)

독자가 따라 할 순서는 **앱 로그인 → Code → Local → Select folder → 기존 실습 폴더 → 모델 선택 → 요청 입력**이다. 기본 실습의 자연어 프롬프트는 같은 목표와 파일명을 사용하면 된다. 파일 변경은 권한 모드에 따라 승인하거나 적용 후 검토한다. `+12 -1` 같은 표시를 누르면 파일별 diff를 볼 수 있다. [첫 세션과 변경 검토](https://code.claude.com/docs/ko/desktop-quickstart)

### CLI 명령을 데스크톱 조작으로 바꾸기

| 하려는 일 | 데스크톱 Code 탭 |
| --- | --- |
| 모델·권한 선택 | 전송 버튼 옆 메뉴 |
| effort 조정 | effort 메뉴. Windows `Ctrl+Shift+E`, macOS `Cmd+Shift+E` |
| `index.html` 보기 | 채팅의 HTML 경로를 클릭하면 Browser 미리보기 |
| 명령 실행 | Views → Terminal. Local에서 세션과 같은 작업 폴더 사용 |
| 설정 변경 | `/config`는 Settings → Claude Code를 열며 뒤의 `key=value`는 무시 |

[데스크톱 기능·단축키·CLI 차이](https://code.claude.com/docs/ko/desktop)

`claude --model claude-opus-5-5 --effort medium --permission-mode default`는 **터미널에서 CLI를 시작하는 명령**이다. 데스크톱 프롬프트의 설정 명령으로 복사하지 않는다. `claude --desktop`에도 `--model`·`--effort`를 붙일 수 없다. 앱이 세션을 시작하므로 해당 플래그를 허용하지 않는다. [CLI 시작 플래그](https://code.claude.com/docs/en/cli-reference)

가이드의 Opus 5.5·medium 추천은 데스크톱에서도 모델·effort 메뉴에서 선택하도록 표현한다. 일반 명령 참조는 `/effort medium` 구문을 설명하지만, 이번 조사에서 그 구문의 데스크톱 직접입력 및 저장 범위는 실행 확인하지 않았다. 따라서 데스크톱 예시는 확인된 메뉴 경로를 사용하고, CLI의 슬라이더 키나 저장 동작을 동일하다고 보장하지 않는다. [effort 의미와 CLI 설정](https://code.claude.com/docs/en/model-config), [앱의 effort 메뉴](https://code.claude.com/docs/ko/desktop)

### 기존 스킬과 플러그인은 사용할 수 있는가

가능하다. 데스크톱 Local에서 `/` 또는 **+ → Slash commands**로 설치된 스킬을 선택하고 요청을 덧붙인다. 플러그인 설치는 **+ → Plugins → Add plugin**, 관리는 **Manage plugins**를 사용한다. `mattpocock-skills`와 `superpowers`를 찾아 설치한 뒤 목록에서 `/mattpocock-skills:wayfinder`, `/superpowers:brainstorming` 등을 확인하는 방식으로 12절 실습을 연결한다. 스킬 호출과 `/plugin install ...` 설치 명령을 구분하여, 후자는 데스크톱 UI 절차로 안내한다. [스킬 선택](https://code.claude.com/docs/ko/desktop-quickstart), [플러그인 설치 표면별 절차](https://code.claude.com/docs/en/plugins/install)

같은 컴퓨터의 CLI·데스크톱 Local·VS Code는 설정 파일을 공유하며, user 범위로 설치한 플러그인도 공유한다. 프로젝트 범위의 활성화는 설치 자체와 다르므로 다른 컴퓨터에 자동 설치된다고 설명하지 않는다. [플러그인 설치 범위](https://code.claude.com/docs/en/plugins)

`CLAUDE.md`, 개인 skills, 권한 규칙·hooks·MCP 설정도 공유한다. 단, **Cloud는 로컬 설치 플러그인을 읽지 않고 WSL 세션에서는 플러그인을 지원하지 않는다**. Cowork와 Code를 같은 설정 화면·저장 위치라고 설명하지 않는다. 이 때문에 이번 확장 실습은 Local로 한정한다. [공유 구성과 환경별 차이](https://code.claude.com/docs/ko/desktop)

### CLI에서 하던 대화 이어가기와 제한

CLI 대화에서 `/desktop`으로 앱에 넘길 수 있다. macOS·x64 Windows와 Claude 구독 로그인이 조건이다. API 키 인증에는 해당하지 않는다. 셸의 `claude --desktop`은 v2.1.285+에서 지원하며, `--resume`을 함께 쓰면 이름이 아닌 세션 ID가 필요하다. [이동 명령](https://code.claude.com/docs/en/commands), [셸 플래그의 조건](https://code.claude.com/docs/en/cli-reference)

또는 터미널 세션을 닫고 데스크톱 **Local의 `/resume`**에서 선택한다. 복사본이 아닌 같은 대화를 이어간다. Browser는 정적 HTML과 개발 서버 미리보기를 지원하며, 내장 터미널·파일 편집기는 앱 v1.2581.0+ 기능이다. CLI의 `-p`·`--output-format` 같은 비대화형 실행은 Code 탭의 대응 기능이 없다. 통합 터미널에서 별도 CLI를 실행하는 것과 Code 대화창 기능은 구분한다. [세션 재개·미리보기·지원 범위](https://code.claude.com/docs/ko/desktop)

입문 가이드의 편집 방향은 ‘화면에서 폴더 선택·결과 검토를 배우려면 데스크톱, 명령 실행과 스크립트 자동화를 배우려면 CLI’다. 둘은 같은 Claude Code를 서로 다른 인터페이스에서 사용한다. 실제 계정에 표시되는 메뉴, 설치된 앱 버전, 플러그인 로딩과 예시 세션은 이번 조사에서 직접 확인하지 않았다.
