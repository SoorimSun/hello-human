# Droid 실행 기록·OpenAI 비용 데이터 시각 자료

- 기사: `news/2026-11-15-droid-cost-records.html`
- 확인일: 2026-11-15
- 공식 제품 영상 1개와 공식 비용 그래프 1개를 원본 URL로 연결하고, HTML 설명도·연표·표를 함께 사용한다. 로컬 미디어 복제 파일은 없다.

| 소식·위치 | 확인한 공식 원본 | 채택·제외 판단 |
| --- | --- | --- |
| Factory v1.12.0 | [릴리스](https://docs.factory.com/changelog/release-notes#v1.12.0), [Autonomy Level](https://docs.factory.com/autonomy-and-safety/auto-run), [Desktop 소개](https://factory.com/product/desktop), [MCP 문서](https://docs.factory.com/harness/mcp) | 릴리스에 대응하는 특정 버전 시연은 확인하지 못했다. Desktop의 세션·도구 호출 화면을 이해할 수 있도록 공식 소개 영상을 추가하고 일반 제품 시연임을 캡션에 명시했다. 호출 식별/결과 검증 설명도도 유지했다. |
| OpenAI 비용 지연 | [사건 페이지](https://status.openai.com/incidents/01M7ATRS6BMZ61E4JDHJGM79Y0), [Costs API](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage/methods/costs), [Cookbook](https://developers.openai.com/cookbook/examples/completions_usage_api)의 실제 그래프·작성 코드 | 사건 자체는 한국시간 HTML 연표로 정리한다. 공식 일별 비용 그래프는 API 집계 방법을 설명하는 문단에 추가했다. 2025년 예제이며 이번 지연의 관측 데이터와 다르다는 점을 캡션과 alt에 표시했다. |
| 실험 흐름과 기대 처리 | 이 기사의 가상 상품 설명 수정·비용 지연 시나리오 | 자체 설명도와 상태 표. 실제 모델 응답·비용·실행 결과를 측정한 화면이 아니다. |

## 자료 성격·가공

- Factory 설명도는 공식 UI를 복제하지 않고 ‘호출 식별’과 ‘결과 검증’이라는 편집 해석을 표시한다.
- OpenAI 연표는 공식 업데이트 3개를 요약·번역했다. 2026-11-14 01:10 / 03:56 / 14:31 KST. 장애 지속시간을 수치로 만들어 넣지 않는다.
- 실험 흐름은 실행 → 업무 상태 대조 → 비용 대조를 보여준다. 비용 대기 중에도 업무 검증 완료를 유지한다는 분기 조건은 캡션과 표에 명시한다.
- 공식 영상은 원본 MP4를 HTML video로 연결했다. 자동·반복 재생 없이 controls·playsinline과 16:9 영역을 제공한다. 공식 소개 페이지와 MP4 원본 링크를 함께 둔다.
- 공식 그래프는 원본 PNG를 원격 img로 연결했다. 1189×590의 비율과 내용·축·라벨을 보존하고, 클릭하면 원본을 확대해 볼 수 있다.
- 외부 이미지·영상의 복제나 다운로드는 없다. 공식 원본 URL의 브라우저 표시를 확인했으며, 별도 미디어 재배포 허락은 확인하지 않았다. 모든 자료에 제공자와 원문 링크를 붙였다.
- 실제 실행·독립 성능 검증은 하지 않았다.

## 추가한 공식 미디어

| 항목 | Factory Desktop 영상 | OpenAI Cookbook 일별 비용 그래프 |
| --- | --- | --- |
| 기사 위치 | `#droid-official-video`, 첫 소식 도입 뒤 | `#costs-official-chart`, Costs API 집계 단위 설명 뒤 |
| 제공자 | Factory | OpenAI Cookbook, Mitch Welzen·Thomas Li |
| 원본 URL | `https://factory.com/videos/desktop-overview.mp4` | `https://developers.openai.com/cookbook/assets/notebook-outputs/examples/completions_usage_api/cell-23-output-0.png` |
| 공개일 | 제품 페이지에서 영상 게시일 미확인 | 문서 표기는 2025-01-14. 현재 그래프에는 2025년 1~2월 날짜가 포함돼 원문 수정일과 그래프 생성일은 단정하지 않는다. |
| 확인일·규격 | 2026-11-15, 1920×1080, 약 31.9초 | 2026-11-15, 1189×590 PNG |
| 확인 범위 | 공식 페이지에서 세션 목록과 Figma 도구 호출 장면을 확인. 기사에서 일부 구간 재생·일시정지를 확인하며, 전체 영상과 제품 기능 검증은 구분한다. | 원문 차트와 직전 코드의 날짜별 `amount_value` 합산, USD 축을 확인. 기사에서 원본 로딩과 확대 링크를 확인한다. |
| 자료 성격 | 일반 제품 소개 시연. v1.12.0의 변경 기능만을 재현한 자료로 쓰지 않는다. | 과거 예제 데이터의 시각화. 이번 사건의 비용·지연 규모로 해석하지 않는다. |

## 화면 확인

초기 기사에서는 데스크톱 1280px와 모바일 390px·320px의 제목·도식·표, 다크 모드 실험 흐름·상태 표, 라이트 모드 공지 연표를 확인했다. 공식 미디어 추가 후 검증 결과는 조사 기록의 추가 검증 절에 남긴다. 인쇄 화면은 별도 확인하지 않았다.
