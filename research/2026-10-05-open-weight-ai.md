# AI뉴스 07 검증 기록

확인일·발행일 2026-10-05 (Asia/Seoul). 제공 초안을 바탕으로 기사·목록·홈을 로컬 반영한다. 모델 실행·성능 측정은 수행하지 않았다.

## 주장별 근거와 판단

| 주장 | 주체·대상·시점 | 확인 상태·편집 판단 | 근거 |
| --- | --- | --- | --- |
| 첫 모델 공개 관련 소식 | Reflection, Axios 10월 4일 보도 | 보도임을 명시. 실제 배포와 구분. 검색 도구의 본문 조회 오류 뒤 앱 브라우저에서 원문 본문 확인. | [Axios](https://www.axios.com/2026/10/04/reflection-open-weight-ai) |
| NVIDIA 투자 참여 | Reflection 공식 팀 발표, 2025-10-09 | 공식 투자자 목록 확인. 새 투자 소식으로 쓰지 않는다. | [공식 발표](https://reflection.ai/blog/frontier-open-intelligence/) |
| 가중치·연구·소프트웨어 공개 | Reflection About, 10월 5일 확인 | 미래형 약속. 이미 전부 공개됐다는 표현 제외. 학습용 강화학습 도구·환경까지 공개하겠다는 설명이 있지만 데이터 전체 공개로 확대하지 않는다. | [About](https://reflection.ai/about) |
| AI Factory | Reflection Solutions, 10월 5일 확인 | 회사의 솔루션 구상. 기사 도식은 설명용 재구성이며 직접 사용 결과가 아니다. | [Solutions](https://reflection.ai/solutions) |
| Reflection 배포 상태 | 공식 About·Solutions·News, 10월 5일 확인 | 확인한 공식 페이지에서 첫 모델 배포 파일·확정일 미확인. 인터넷 어디에도 존재하지 않는다는 단정으로 쓰지 않는다. | [News](https://reflection.ai/news) |
| Kolibri 공개 | Aleph Alpha, 2026-10-03 | 공식 발표와 모델 카드 출시일 일치. 파일 목록에 가중치 실재 확인. 저장소 파일 커밋 날짜와 발표일을 구분. | [발표](https://aleph-alpha.com/en/blog/kolibri-has-landed-a-sovereign-open-weight-model/), [파일](https://huggingface.co/Aleph-Alpha/Kolibri-1/tree/main) |
| 구조·언어 | Kolibri-1, 공급사 설명 | 전체·활성 파라미터를 구분. 상세 수치는 기사 참조. 독일어·영어 중심이며 한국어 업무 성능을 보장하지 않는다. | [공식 발표의 비교표](https://aleph-alpha.com/en/blog/kolibri-has-landed-a-sovereign-open-weight-model/) |
| 장문 범위 | Kolibri-1, 공급사 검증·권장 | 학습 길이와 확장 검증 상한을 분리. 복잡한 작업·지연·처리량에 대한 권장을 인접 문장에 표시. 도식은 길이 비율이며 정확도·처리속도 그래프가 아니다. | [Intended use](https://huggingface.co/Aleph-Alpha/Kolibri-1#intended-use) |
| 운영 장비 | Kolibri-1 공식 FP8 배포판 | 메모리와 최소 장비 예시는 기사 접이식 설명 참조. 모델 메모리와 요청 처리 메모리를 구분하며 모든 변형·양자화판의 절대 최소 사양으로 일반화하지 않는다. | [Model overview](https://huggingface.co/Aleph-Alpha/Kolibri-1#model-overview) |
| 이용 조건 | 모델 카드 License and terms | 공급사의 적용 범위 설명만 요약. 저장소 외 지식재산까지 포함하는 완전한 공개라는 표현 배제. 법률 판단은 하지 않는다. | [License and terms](https://huggingface.co/Aleph-Alpha/Kolibri-1#license-and-terms) |
| 자체 평가·외부 사용 | Aleph Alpha 성능표, NVIDIA 포럼 이용자 10월 4일 글 | 자체 성능표와 사용자 실행 보고를 구분. 포럼은 NVIDIA 공식 인증·평가가 아니다. 직접 재현하지 않았으므로 수치 우열은 인용하지 않는다. | [사용자 실행 보고](https://forums.developer.nvidia.com/t/kolibri-1-aleph-alphas-78b-fp8-moe-runs-on-the-spark-setup-numbers-and-a-few-things-id-love-to-share/385048) |
| 폭넓은 AI 접근성 | Sam Altman, Reuters 10월 4일 | 정책 견해로 표시. 가중치 공개 선언·새 제품·안전 기술 발표로 연결하지 않는다. Reuters가 인용한 POLITICO 인터뷰 범위만 사용. | [Reuters · StreetInsider 게재](https://www.streetinsider.com/Reuters/OpenAIs%2BAltman%2Bsays%2BAI%2Bbenefits%2Bwarrant%2Baccepting%2Bsome%2Brisks/27144435.html) |

## 날짜·확인 한계

- Reuters 게재 시각 2026-10-04 18:35 EDT는 한국시간 2026-10-05 07:35이다. 보도일을 인터뷰 실시일로 확정하지 않는다.
- POLITICO는 검색 접근이 robots 정책으로 제한돼 인터뷰 전문을 확인하지 못했다. Reuters 재게재 본문을 직접 열어 확인했다. Blue Water Healthy Living 재게재 URL은 열기 오류가 나 출처로 채택하지 않았다.
- Reflection·Kolibri 관련 출시·후속 검색과 공식 소개·뉴스를 확인했다. 새 공식 배포나 이 기사의 핵심을 뒤집는 정정은 해당 확인 범위에서 찾지 못했다. Kolibri 외부 실행 보고는 발견해 초안의 외부 평가 부재 단정을 완화했다.
- 공식 발표의 한국어 원문은 확인하지 못했다. 영문 공식 문서를 근거로 쓰며 존재를 확인하지 않은 번역 URL을 만들지 않았다.
- ‘최근 24시간 큰 모델 출시가 없었다’, ‘AI 경쟁이 성능에서 운영으로 넘어갔다’는 전수 조사·시장 근거가 없는 단정은 제외했다.

## 편집 판단·시각화

- 제목은 ‘오픈웨이트 AI, 이제 ‘직접 운영’의 조건을 볼 때’. ‘모델 소유’의 의미를 실행·운영 선택권으로 설명하고 지식재산 소유와 구분한다.
- Reflection의 계획, Kolibri의 실제 배포, Altman의 정책 발언을 세 상태로 표시한다. Altman 발언을 오픈웨이트 지지 선언으로 합치지 않는다.
- API는 인터페이스·제공 방식이며 오픈웨이트/비공개와 다른 축이다. 데이터 전송 범위는 모델·외부 도구·로그까지 보도록 설명한다. 자체 운영을 무조건 저렴하거나 자동으로 안전한 방식으로 표현하지 않는다.
- 회사 전략 도식, 장문 길이 도식, 권한·업무 경로 도식은 HTML/CSS로 직접 구성한다. 공급사 로고·장식 사진은 추가하지 않는다. 원본 미디어 파일 사용 없음.
- 길이 도식은 262,144 / 1,048,576 = 25%의 공통 축. 단위·주체·학습과 검증의 차이를 라벨·캡션에 명시한다.
- 모임 실험은 가상 상품 50건으로 제한하고 정상 사례·정답·반복 조건·사람 수정 시간·운영비 배분을 포함한다. 이미지 URL 누락만 검사하며 이미지 내용 인식 실험으로 확대하지 않는다. 규칙 기반 검사도 기준선으로 둔다.
- 동작 추가 없이 기존 테마·목차·갱신 스크립트와 네이티브 details를 사용한다. 별도 제품용 JavaScript는 추가하지 않는다.

## 로컬 검증

- `node --test`: 기존 테스트 7개 통과. 새 제품용 JS·테스트 파일은 추가하지 않았다.
- `git diff --check`: 통과. 기사·목록·홈의 상대 링크·자산 경로 95개 존재 확인, 새 기사 ID 13개 중복 없음, 목차 대상 일치 확인.
- 전체 11편·일반뉴스 7편·속보/단신 4편과 새 기사 단일 등록 확인. 홈·목록·기사의 제목·일반뉴스 07·2026-10-05·URL 일치 확인. 기존 단신 카드는 유지했다.
- 앱 브라우저에서 1280×900, 390×844, 320×800 화면 확인. 기사 DOM 전체에서 가로 넘침 없음. 데스크톱 전략 도식·장문 그래프, 모바일 라이트 제목·다크 그래프·업무 경로를 스크린샷으로 확인했다.
- 모바일에서 숨겨진 줄바꿈 때문에 제목·부제의 단어가 붙던 부분에 공백을 보완했다. 파라미터 설명은 올바른 정의 목록 구조로 정리했다.
- 목차 앵커 이동, 네이티브 details의 Enter 및 클릭 열기, 테마 전환 확인. 일반뉴스·속보/단신·전체 필터의 표시 개수 7·4·11, 키보드 좌우 이동 확인.
- 기사 열기 → 접이식 설명 열기 → 목록 복귀 → 새로고침 후 해당 글에 불필요한 New/Updated가 붙지 않음을 최종 수정 뒤 재확인했다. 홈의 새 기사 카드도 클릭해 정상 이동을 확인했다.
- 신규 도식·수치·접이식 설명은 정적 HTML/CSS와 브라우저 기본 기능이다. JS 비활성화·실제 인쇄 화면은 별도로 실행하지 않았다. 이미지·동영상은 추가하지 않았다.
- 변경 범위는 기사·기사 전용 CSS·조사 기록·뉴스 목록·홈의 5개 파일이다. 개별 글을 운영 문서에 계속 추가하지 않는 현재 저장소 지침에 따라 README·뉴스레터는 수정하지 않았다.
- 원격 커밋·푸시·배포는 수행하지 않았다. 실제 모델의 한국어 품질·운영비 비교는 제안한 실험을 실행해야 확인할 수 있다.
