# 일반뉴스 44 미디어 기록

확인일 2026-11-11 KST. 공급사 원본과 자체 설명도를 구분한다. 공식 웹 공개 자료를 기사 설명에 인용하며, 별도 오픈 라이선스나 포괄적 재사용 허가를 확인한 것은 아니다. 원본 제공자·출처를 본문에 표시했다.

| 기사 자료 | 원본·제공자 | 성격·가공 |
| --- | --- | --- |
| `business-agents-conversation.webp` (1200×675) | [OpenAI 발표](https://openai.com/index/introducing-businesses-chatgpt/)의 [상품 상담 이미지](https://images.ctfassets.net/kftzwdyauwt9/3RPWSZdNGmGtugwiNzAkSH/9ce1bc7e4d50f7989d0497ded2f05b5e/businesses-in-chatgpt-customer-conversation.png?w=1200&q=90&fm=webp) | 11/10 공식 예시 화면. CDN 제공 WebP를 그대로 저장. 내용·비율 유지, 공유 이미지로도 사용. |
| `business-agents-insights.webp` (1200×675) | 같은 발표의 [집계 화면](https://images.ctfassets.net/kftzwdyauwt9/3jmbfXBdvv18XBFTeLm1ZJ/e15576b324a43a8a9306e385490b4cb5/businesses-in-chatgpt-business-insights.png?w=1200&q=90&fm=webp) | 제품 예시. 화면 수치를 성과로 재인용하지 않음. CDN 파일 그대로 저장. |
| `business-agents-walmart-profiles.webp` (1920×1080) | [Walmart 10/21 발표](https://corporate.walmart.com/news/2026/10/Making-It-Possible-for-Agents-to-Shop-on-Behalf-of-Customers)의 [공식 원본](https://corporate.walmart.com/content/dam/corporate/images/newsroom/2026/10/making-it-possible-for-agents-to-shop-on-behalf-of-customers/Lead-two-phones.webp) | 원본 WebP 그대로 저장. 구매 내역의 에이전트 주문 표시와 Agent Profile의 승인 설정을 보여주는 제품 예시. 초대 기반 초기 베타 배경 자료이며 eBay 조회 실패를 보여주는 캡처가 아님. |
| Carbon 에펠탑 영상 | [Google 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/), [공식 연결 영상](https://www.youtube.com/watch?v=rOVEmjfPmYk) | 11/10 발표의 공급사 선정 시연. 역사 자료→3D 전시. YouTube 개인정보 보호 임베드, 자동·반복 재생 없음. |
| Claude 파이 출시 데모 | [Anthropic 발표](https://claude.com/resources/articles/sheets-whiteboards-data), [공식 연결 영상](https://www.youtube.com/watch?v=YewAJPawE7I) | 11/10 발표의 Whiteboards·Sheets·Data 협업 예시. 개인정보 보호 임베드, 자동·반복 재생 없음. |
| `business-agents-upwork-diversity.png` (1024×480) | [OpenAI·Upwork PDF](https://cdn.openai.com/pdf/openai-upwork-full-report.pdf#page=11) 11쪽 Exhibit 3.1 | 2026-11 보고서의 도표 제목·A/B 패널·각주 포함 발췌. PDF 영역 (50,54)-(562,294)pt, 2배 렌더. 수치·축·비율 변경 없음. 원본 페이지를 렌더해 시각 대조. |
| Carbon 완료율 그래프 | [Zapier 보고서](https://zapier.com/benchmarks/gemini-carbon-4-report) | 31.5/53.0/53.9%를 자체 HTML 막대로 재작성. 0~100% 축, 분모·평가일·통과 건수 병기. 공급사 그래프를 그대로 복제한 자료가 아님. |
| eBay 조회 흐름 도식 | [The Verge 취재](https://www.theverge.com/tech/1030838/ebay-ai-agents-meta-muse-agentic-shopping) | 요청→조회 실패→일부 외부 복제 사이트 안내를 재구성한 설명도. 직접 재현·공식 UI 캡처가 아니며 새 제한의 시점·범위는 미확인으로 유지. |
| 견적 도식·재생 | 헬로우 휴먼 실험 설계 | 설명도 및 미리 정한 기대 상태. 실제 연동/실험 결과 아님. 가격·재고·예산은 합성 값. |

11/11 재검토에서 도식·재생 설명을 HTML/JSON 비교로 명확히 했다. 정상 재전송에도 현재 조건을 재확인하고, 가격 변경·품절은 대체 추천 없이 보류하며, 권한 철회는 403 이후 추가 호출을 하지 않는 기대 결과로 맞췄다. 원본 이미지·영상은 변경하지 않았다.

## 주요 소식별 조사와 선택

- OpenAI: 실제 발표 페이지의 지연 로딩 이미지 4개와 Vimeo 플레이어 URL을 확인. 상담 화면과 집계 화면으로 역할 차이가 드러나므로 반복되는 프로필 화면·소개 영상은 추가하지 않음.
- eBay: 약관의 자동화 접근 조항과 The Verge 원문을 확인. 보도 대표 이미지는 The Verge/Getty 장식 일러스트여서 채택하지 않음. 공식 사이트를 대상으로 한 추가 검색에서도 이번 Muse 조회 실패를 직접 보여주는 eBay 공식 캡처는 확인하지 못함. 이전 투자자 자료의 에이전트 전략 도식은 이번 제한의 증거가 아니므로 추가하지 않았다.
- 02번 보완: 최초에는 Walmart 이미지를 제외했으나, 사용자의 시각 자료 문의 후 역할을 재검토했다. Walmart 배경 문단 아래에 10/21 공식 제품 화면을 넣고, eBay 본문에는 취재 내용으로 만든 조회 흐름을 배치했다. 종전의 세 기업 비교 설명도는 조회 흐름으로 교체해 중복을 줄였다. 화면의 이름·주소·결제 표시는 공식 발표에 포함된 예시이며 사용자 자료를 추가하지 않았다.
- Google: 실제 원문에서 에펠탑·Platform 37·직물·게임·쇼핑몰 등 시연과 안전성 차트를 확인. 장기 작업을 보여주는 에펠탑 시연 하나를 선택. 모델 성능은 Zapier의 모의 업무 평가를 별도 그래프로 표현.
- Claude: 제품별 안내의 실제 iframe과 공식 설명 확인. 파이 출시 시연을 선택해 세 산출물의 연결을 보여준다. 한국어 메뉴에서도 본문은 영문이었다.
- Upwork: 원문 PDF 11쪽의 A/B 도표·각주를 대조. 전체 분포와 공고당 업무 수를 구분하는 데 적합해 함께 발췌. 회사 건물·로고 사진은 사용하지 않음.

## 최종 브라우저 확인

- 로컬 HTTP 미리보기에서 세 이미지가 모두 원래 크기로 로드됨을 확인했다. 상담·집계 화면은 1200×675, 보고서 발췌는 1024×480이다. 원본 확대 링크도 제공한다.
- Google 플레이어의 제목 `Eiffel Tower: Gemini 4 Carbon`, 공식 Google 채널, 59초 길이와 재생 진행을 확인했다.
- Claude 플레이어의 제목 `Introducing Claude Whiteboards, Sheets, and Data`, 공식 Claude 채널, 58초 길이와 재생 진행을 확인했다. 컨트롤을 표시한 뒤 Enter로 일시정지하고 재생 버튼으로 바뀐 상태를 확인했다.
- 모바일 390×844, 데스크톱 1280px 너비에서 제목·영상 비율·도표·표·재생 컨트롤을 확인했다. 모바일 다크 모드에서도 표시를 확인했고 가로 넘침은 없었다. 검증 뒤 밝은 테마로 돌리고 임시 뷰포트 설정을 해제했다.
- 기사에 연결한 발표의 날짜·영상 제목·채널·내용을 대조했다. YouTube 영상 자체의 게시일을 별도로 확인한 것은 아니므로 위의 11/10은 연결된 공식 발표일을 뜻한다.
- 영상의 재생 확인은 전체 영상 내용이나 제품 성능 검증을 뜻하지 않는다. 두 영상 모두 자동 재생·반복 재생을 설정하지 않았다.
- 02번 보완 후 추가한 Walmart 이미지가 1920×1080 원본으로 로드됨을 확인했다. eBay 흐름도는 데스크톱에서 3열, 모바일에서 1열로 표시된다. 실제 모바일 CSS 뷰포트 354px의 다크 모드에서 이미지·캡션·도식의 가로 넘침이 없었으며, 마지막 로드의 콘솔 오류·경고도 없었다. 밝은 테마로 복원하고 임시 뷰포트를 해제했다.
