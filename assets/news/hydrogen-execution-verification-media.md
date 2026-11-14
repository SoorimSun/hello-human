# Hydrogen 실행·검증 기사 미디어 기록

확인일 2026-11-13. 기사 ../../news/2026-11-13-hydrogen-execution-verification.html. 모든 파일은 원본 바이트를 보존했으며 자르기·주석 추가·생성형 이미지 가공을 하지 않았다. 제공자 저작권은 유지된다. 공개 원문에 포함된 보도·설명 자료로 출처와 원문을 연결했으며, 별도 재사용 허락·포괄적 오픈 라이선스는 확인하지 못했다.

| 파일·위치 | 원문·원본 | 제공자·공개일 | 선택·확인 범위 |
| --- | --- | --- | --- |
| hydrogen-benchmarks.gif | https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/ · https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_benchmarks_table.gif | Google, 11-12 | 1920×947. 원본 표를 직접 열어 확인. 공급사 평가·Terminal-Bench 4.1 부정행위 보정 라벨 보존. 독립 평가로 표현하지 않음 |
| anvil-bio-evaluation.png | https://safeguards.anthropic.com/2026/automated-red-teaming/ · https://safeguards.anthropic.com/2026/automated-red-teaming/fig1.png | Anthropic, 11-12 | 1999×1711. Figure 1 전체. 세 분류기·질문·시간·요청 축을 보존. 일반 공격 성공률이 아닌 심각도 비교 |
| llmon-opi.png | https://huggingface.co/blog/ibm-granite/llmon-an-llm-native-markup-language-now-in-granite · https://cdn-uploads.huggingface.co/production/uploads/6484ca4d5ff9a3d2ee52a83b/3UqXuyb58P8n3NiHnJiK4.png | IBM Granite, 11-12 | 2400×1256. OPI 9,000·1−ASR·47/95 percentage-point 표기를 원본에서 확인. 본문과 그림의 단위 차이를 기사 캡션에 명시 |
| holiday-extras-app.webp | https://www.holidayextras.com/our-apps/ · https://www.holidayextras.com/our-apps/assets/apps/holidayextras-render.webp | Holiday Extras, 제작·공개일 미확인 | 1280×1280 앱 공식 렌더링. 여행 일정·검색 화면 시각 확인. 재구축 당시 버전과 동일하다고 단정하지 않음 |
| #llmon 설명도 | IBM 모델 카드와 블로그 | 헬로우 휴먼, 11-13 | 회의실 안내문은 가상 사례. 공식 토큰 문법 재현이 아닌 의미 구분 설명 |
| #experiment 도식·표 | 이 글의 실험 제안 | 헬로우 휴먼, 11-13 | 정적 기대 결과. 실제 모델 실행·성능·보안 검증 결과 아님 |

## 주요 소식별 추가 확인·제외

- Google 발표의 벤치마크·추론 수준 그래프와 코딩·시트·슬라이드 영상 목록을 브라우저 DOM으로 확인했다. 모델 분담의 평가 조건을 읽는 데 직접 도움이 되는 원본 비교표를 채택했다. 다양한 생성 데모는 주제에 비해 범위가 넓어 제외했으며 재생이나 성능을 확인했다고 주장하지 않는다.
- Anthropic 원문 HTML의 Figure 1~11 이미지와 캡션을 확인했다. 생물학 질문의 구체적 공격 내용을 재현하지 않고 Figure 1 평가 구조만 사용한다.
- IBM 원문에 OPI·일반 능력 비교 그래프와 Attention Demo GIF, 연결된 모델 카드·저장소가 있다. 핵심 수치의 단위와 정적 공격 조건을 설명하는 OPI 그래프를 채택했다. Attention 데모는 별도 실행하지 않았다.
- OpenAI 사례를 실제 브라우저로 열고 본문 부근으로 스크롤했다. Vimeo iframe은 제목만 있고 src가 비어 있어 플레이어·재생을 확인하지 못했다. 영상 내용을 근거로 쓰거나 빈 플레이어를 임베드하지 않았다. 직접 연결된 Holiday Extras 앱 소개에서 공식 렌더링을 채택했다.
- 브라우저 미디어 다운로드가 시간 초과되어, 공개 원본 URL을 승인된 네트워크 경로로 다운로드했다. 비디오를 내려받거나 제한을 우회하지 않았다.

## 페이지 검증

원본 네 파일을 로컬 이미지 뷰어에서 열어 내용과 캡션을 대조했다. 최종 글의 표시 확인은 조사 기록의 브라우저 검증 결과를 따른다.

브라우저에서 네 이미지 모두 로드되고 비율이 유지되는 것을 확인했다. 390px 화면에서 원본 그래프는 축소되어 표시되며, 각각 원본 파일 링크로 확대할 수 있다. 라이트·다크 확인. 영상 재생은 미검증이며 기사에 영상 임베드는 없다.

## 2026-11-13 재검토

원본 이미지는 유지했다. IBM OPI 그림을 다시 열어 47%포인트는 GPT-6 Astra, 95%포인트는 Granite 4.1 8B 대비 차이라는 설명을 기사에 보충했다. Anvil Figure 1 캡션의 가로축을 발견 시간·대상 모델에 보낸 메시지 수로 풀었다. 실험 설명도에는 기대 정답을 모델에 전달하지 않고 채점기에 보관한다는 조건을 명시했다.
