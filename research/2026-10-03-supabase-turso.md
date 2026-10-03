# 단신 04 · Supabase의 Turso 인수 발표

확인일: 2026-10-03 (한국시간)

공유된 채팅의 기사를 기존 AI뉴스 단신 형식으로 편집했다. 사용자 요청에 따라 로컬 파일과 목록·홈 연결까지 준비하고, 푸시·원격 배포는 하지 않는다.

## 사실 확인과 편집

- [Supabase 공식 발표](https://supabase.com/blog/supabase-is-acquiring-turso), 2026-10-02: 인수 발표, Postgres 중심 개발 지속, 주당 100만 개 이상 DB 생성, Turso의 Rust 기반 SQLite 재구현과 에이전트별 DB 구상. 생성량은 회사 발표이며 활성·유료 DB 수로 표현하지 않는다. 거래 종결로 단정하지 않는다.
- [Turso 공식 발표](https://turso.tech/blog/turso-is-joining-supabase), 2026-10-02: 기존 DB·API·워크플로와 오픈소스 개발 지속, 향후 수개월 동안 더 깊은 통합 계획. 자동 Postgres 이전 기능의 출시를 의미한다고 쓰지 않는다.
- [Supabase 제품 소개](https://supabase.com/): Postgres, 인증, 파일 저장, 실시간 기능. [Turso 에이전트용 DB 소개](https://turso.tech/solutions/ai-agents): 에이전트별 DB와 작업 상태 저장. 두 서비스의 역할을 비교하되 배타적인 용도로 한정하지 않는다.
- [CTO.new 고객 사례](https://turso.tech/blog/cto-new-coordinates-tens-of-thousands-of-ai-agents), 2026-08-06: 프로젝트마다 에이전트 팀이 공유하는 DB를 운영하고 핵심 인프라는 Postgres 유지. 고객 사례는 Turso가 공개한 설명으로 귀속한다. 모든 에이전트가 반드시 각자의 DB를 갖는다고 일반화하지 않는다.
- [Turso 0.8](https://turso.tech/blog/turso-0.8.0), 2026-09-29: 동시 쓰기 성능 개선 자체 발표.
- [ClickBench PR 1159](https://github.com/ClickHouse/ClickBench/pull/1159): tursodb 0.7.0을 이용한 대량 적재와 분석 쿼리 시험 문제 기록. 0.8의 동시 쓰기 시험과 조건이 다르며 현재 제품 성능으로 일반화하지 않는다. 재측정하지 않았다.
- 커뮤니티의 성능·제품 지속성 우려는 위 원자료로 확인한 범위만 반영했다. 본문·출처 목록에 Hacker News·GeekNews 링크는 넣지 않았다.
- 상품정보·프로모션·개발 지원 도식은 가상의 업무 적용 예시다. 실제 고객 구성이나 완성된 제품 통합 기능으로 오해하지 않도록 캡션에 표시했다. DB 분리와 접근 권한은 별도 설계가 필요함을 명시했다.

## 원본 미디어

- 파일: `assets/news/turso-supabase-announcement.png`
- 출처 및 권리자: Turso 공식 인수 발표, 위 공식 발표 페이지
- 원본 이미지 주소: https://turso.tech/_next/image?q=100&url=%2Fimages%2Fblog%2Fturso-is-joining-supabase%2Fcover.png&w=3840
- 공식 발표 이미지를 변경하지 않고 저장했다. 본문에 출처와 원문 링크를 표시했다. 별도의 자유 이용 라이선스가 확인됐다고 주장하지 않는다.
- 업무 도식은 HTML/CSS로 작성한 설명용 시각화이며 제품 화면을 재현한 것이 아니다.
