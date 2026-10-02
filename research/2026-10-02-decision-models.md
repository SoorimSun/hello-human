# Jev 유사 디시전 모델 조사 메모

확인 기준: 2026-10-02 (한국 시간). 공식 모델 카드, 공급자 문서·블로그, 코드 저장소, API 제공 플랫폼을 우선했다. 가격은 입력 100만 토큰당 USD이며 별도 표시가 없으면 이 날짜의 게시 가격이다. 모델 호출이나 자체 성능 측정은 수행하지 않았다. 아래 수치는 각 출처의 공개 측정이다.

## 편집 권고

기존 가이드의 핵심인 `state → typed questions → 확률 → 코드의 실행/검토 분기`를 유지하고, 선택지가 확장되었다는 절을 추가한다. 본문 핵심 비교는 Clef/Clef-Flash, pplx-decider, Mercury Decide로 구성한다. 추가 후보는 D1·Solar Decide·Strands Decider·Tev1을 짧게 소개하고, Rune는 공개 재현과 선택적 추론의 사례로 다룬다. Kev-9B는 셀프호스팅의 보조 비교 후보로 남긴다. Mapika는 모델과 추론 방식이 함께 비교된다는 설명에 활용할 수 있다. 모든 후보를 단일 순위로 정리하기보다 배포 방식·입출력·검증 조건을 구분하는 편이 유용하다. 이는 아래 증거를 바탕으로 한 편집 판단이다.

## 1. Cloudflare Clef / Clef-Flash

- Cloudflare 발표일은 2026-10-01. 두 모델은 Qwen 백본에 판단용 후속 학습을 적용하고, 토큰을 차례로 생성하지 않는 방식으로 선택지에 점수를 매긴다. Workers AI 배포와 공개 가중치 사용을 모두 제공한다. [Cloudflare 발표](https://blog.cloudflare.com/clef-decision-models/)
- Clef는 Qwen3.8-27B, Clef-Flash는 Qwen3.5-9B 기반이다. 텍스트·JSON·이미지·영상 입력에 대해 모든 질문의 모든 선택지 확률을 한 번의 forward pass로 반환한다. 두 모델 카드는 Apache-2.0, `choice`·`score`·`noul`, Jev/SystemOne 요청·응답 호환을 명시한다. 로컬 `systemone` helper는 HTTP 서버 자체가 아니라 요청 본문을 받아 동일한 응답 본문을 만드는 함수다. 로컬 인코더의 기본 `max_length=16,384`와 서비스 컨텍스트를 혼동하지 않는다. [Clef 모델 카드](https://huggingface.co/Cloudflare/clef), [Clef-Flash 모델 카드](https://huggingface.co/Cloudflare/clef-flash)
- Workers AI 문서는 Clef 입력 $0.24/M, Flash $0.09/M, 각각 65,536 컨텍스트 및 요청당 1~64개 질문을 명시한다. 호출 URL은 Cloudflare 계정별 `/ai/run/@cf/cloudflare/clef` 또는 `clef-flash`이다. 이미지 확장은 최대 4개이며 외부 이미지 URL은 받지 않는다. 카드의 영상 지원과 현재 호스팅 API의 노출 필드는 구분해야 한다. [Clef API](https://developers.cloudflare.com/workers-ai/models/clef/), [Flash API](https://developers.cloudflare.com/workers-ai/models/clef-flash/)
- Cloudflare 자체 Decision Index 실행의 지연은 median/p95가 Clef 209.3/238.6 ms, Flash 38.8/122.4 ms, Jev 524.1/536.0 ms다. 발표의 별도 웹사이트 분류 사례 2.2초는 페이지 가져오기·렌더링·분류를 포함하므로 위 추론 표와 다른 측정이다. 모델 카드에 H200에서 사용법을 테스트했다고 나와도 이 표의 모든 모델이 같은 하드웨어·서빙 환경이라는 뜻은 아니다. [Cloudflare 결과와 측정 설명](https://blog.cloudflare.com/clef-decision-models/)

해석: 공개 가중치, 멀티모달 입력, Cloudflare 호스팅을 함께 검토할 때 의미 있다. Flash가 더 작고 빠르다고 모든 업무에서 동등하게 정확한 것은 아니다. 공식 표에서도 CLINC150+OOS와 RAGTruth 등 결과 차이가 크므로 업무별 비교가 필요하다. [모델별 세부 결과](https://huggingface.co/Cloudflare/clef)

## 2. Perplexity pplx-decider-v1-27b

- 공식 카드는 Qwen3.8-27B를 미세조정한 decision model, Apache-2.0, 텍스트 및 이미지 사용을 명시한다. 셀프호스팅 예제는 Python 3.12+, 약 49 GiB 가중치와 추가 작업 메모리를 수용하는 CUDA GPU를 요구한다. HF 자동 표시 파라미터 수는 26B지만 이름/기반 모델은 27B다. [Perplexity 모델 카드](https://huggingface.co/perplexity-ai/pplx-decider-v1-27b)
- API는 `POST https://api.perplexity.ai/v1/decisions`다. `state`와 이름을 붙인 질문을 보내며 `choice`는 선택지별 확률과 최댓값 선택, `score`는 수준별 확률과 기대 점수, `noul`은 참일 확률을 반환한다. 입력 $0.04/M, 출력 무료이며 별도 요청 수수료가 없다. 요청당 질문 1~128개, choice 1~255개, score 1~10단계, 전체 입력 262,144토큰 미만, 조직당 초당 10요청이다. 텍스트·JSON·이미지를 받는다. 같은 질문 유형이지만 Jev와 URL·인증·제약이 같다고 보장할 수 없다. [Perplexity Decisions API](https://docs.perplexity.ai/docs/decisions/quickstart)
- 위 API 문서는 2026-09-30 자체 테스트에서 수백 입력 토큰은 2초 미만, 약 9만 토큰은 5초, 19만은 14초, 한도 부근은 23초라고 설명한다. 이는 모델의 고정 latency 또는 다른 공급자와의 동일조건 비교가 아니다. [Perplexity 입력 크기별 응답시간](https://docs.perplexity.ai/docs/decisions/quickstart#timeouts)
- 카드의 11개 벤치마크는 Perplexity API에서 측정했다. 과제별 우열이 다르다: RAGTruth는 pplx 88.80 / Jev 77.27, BBH는 pplx 82.80 / Jev 94.27. 게시된 Overall은 85.71 / 84.51이지만 집계법 설명을 확인하지 못했고 개별 행의 단순 평균과 같지 않으므로 ‘평균 정확도’라고 재명명하지 않는다. Decision Index와도 다른 평가다. [공식 평가 표](https://huggingface.co/perplexity-ai/pplx-decider-v1-27b)

발표일 상태: 10월 1일 출시라는 2차 자료는 찾았지만 이번에 읽은 공식 카드·quickstart·changelog에서 명확한 출시 날짜를 확인하지 못했다. 본문에서 정확한 출시일을 반드시 쓸 필요가 없다면 ‘10월 2일 확인’으로 표시하는 것이 안전하다.

## 3. Inception Mercury Decide

OpenRouter는 출시일을 2026-09-30으로 표시한다. 텍스트를 받아 choice·score·yes/no와 확률을 반환하는 System One endpoint이며, Jev와 동일한 `/v1/systemone` schema를 사용한다고 명시한다. 컨텍스트는 32,768토큰. `inception/mercury-decide:free`는 현재 입력·출력 가격이 모두 0이지만 무료 endpoint에는 rate limit이 있다. 최대 초당 14 decisions라는 설명에는 입력 길이·동시성·하드웨어 등 측정 조건이 없다. 이를 요청당 71ms나 운영 환경의 보장 속도로 역산하면 안 된다. 페이지의 최근 3일 P50은 조회 중 0.44초와 0.28초 등으로 달라지는 운영 통계다. 공개 가중치·기반 체크포인트·가중치 라이선스는 이 출처에서 확인하지 못했다. [OpenRouter Mercury Decide](https://openrouter.ai/inception/mercury-decide:free/)

해석: API로 빠르게 시험할 수 있는 대안이다. 일반 Mercury 2/2.5의 생성 토큰 속도를 Mercury Decide의 결정 속도와 섞지 않는다. 추후 가격과 무료 제공 조건은 재확인이 필요하다.

## 4. 본문에 짧게 추가할 후보

| 후보 | 확인된 차이와 이용 조건 | 본문에서의 위치 |
| --- | --- | --- |
| Liquid D1 | OpenRouter 유료 ID `liquid/d1`: 출시 표시 2026-10-01, 텍스트 65,536토큰, 입력 $0.04/M·출력 $0. Jev와 같은 SystemOne schema. 기반 모델·공개 가중치·라이선스는 해당 페이지에서 미확인. 과거 `d1:free` 출시와 유료 ID 출시를 혼동하지 않는다. [공식 API 판매 페이지](https://openrouter.ai/liquid/d1) | 관리형 API 후보 |
| Upstage Solar Decide | 출시 표시 2026-09-28. Solar Mini 4 기반, 텍스트 524,288토큰, 동일 SystemOne schema. 입력 $0.05/M은 50% 할인 표시이며 정가 $0.10/M와 구분한다. 한국어 이해를 강조하지만 공개 카드만으로 한국어 업무 우위를 검증했다고 말할 수 없다. 가중치 공개·라이선스 미확인. [OpenRouter 모델 페이지](https://openrouter.ai/upstage/solar-decide) | 긴 한국어 문서·정책 분류 평가 후보 |
| Kev-9B v2 | 2026-09-30 릴리스. Qwen3.5-9B-Base + LoRA + pointer head, Apache-2.0. `POST /v1/systemone`을 구현하여 TypeSafe SDK 호환. 24GB급 GPU, CUDA 약22GB resident 또는 Apple Silicon MLX. 영어 모델이며 제공 state 한도65,536과 검증 컨텍스트8,192를 구분. [공식 카드](https://huggingface.co/jaredpalmer/kev-9b) | 로컬·셀프호스팅 대안 |
| Together Tev1-4B-experimental | 2026-09-23 공식 발표. Qwen3.5-4B SFT, 2~24개 선택지 중 답 문자 하나를 기존 LM head로 생성하는 실험적 모델. 학습 코드와 recipe 공개. [Together 발표](https://www.together.ai/blog/how-to-train-your-own-jev), [공식 코드](https://github.com/togethercomputer/tev1) | 자체 분류기 학습의 예; 완전 동일 API 모델로 소개하지 않음 |
| Strands Decider 2B | 2026-10-01 공식 발표. Qwen3.5-2B-Base에 LoRA와 pointer head를 붙이며 LM head를 제거. 로컬 CPU/CUDA/MPS, `choice`·`noul`·`score`와 `/v1/systemone` 서버 제공. 코드와 모델 모두 Apache-2.0. [공식 발표](https://strandsagents.com/blog/introducing-strands-decider/), [모델 카드](https://huggingface.co/StrandsAgents/strands-decider-2B-hobson-v19) | 작은 로컬 판단기와 도구 실행 전 검사 사례 |

Tev1 주의: 일반 chat completions 방식이며 정해진 문자 응답을 애플리케이션에서 선택지 키로 바꾼다. GitHub MIT는 코드 라이선스다. HF 모델 카드는 기반 Qwen이 Apache-2.0라고 하면서 미세조정 가중치의 release license는 아직 확정 중이라고 명시한다. 따라서 가중치도 Apache/MIT라고 일반화하지 않는다. [Tev1 가중치 카드](https://huggingface.co/togethercomputer/Tev1-4B-experimental)

Strands의 공개 릴리스는 `StrandsAgents/strands-decider-2B-hobson-v19`이다. 공식 발표에는 에이전트가 임의로 만든 도시를 날씨 도구에 넘기려 할 때, 실행 전 검사에서 ‘인자가 사용자의 말에 근거하는가/아직 묻지 않은 것이 있는가’를 판단하고 에이전트에게 되돌리는 예가 있다. 글에 넣기 좋은 구체적 활용이다. [공식 Strands 예제](https://strandsagents.com/blog/introducing-strands-decider/)

Strands 성능 주의: 저장소 표의 RTX3090/WSL2 median115ms·p95299ms는 JevBench 질문당 로컬 측정이다. 블로그의 그래프 캡션은 v18이고 공개 모델은 v19이므로 세부 버전을 생략한 최속 주장을 피한다. ‘2B 중3위’는9/25 JevBench v1.4.2·231개 공개 문제 정확도 순위이며 비공개 문제·속도·비용을 합친 최신 복합지수가 아니다. [공식 저장소](https://github.com/strands-labs/strands-decider), [평가 범위](https://github.com/strands-labs/strands-decider/blob/main/evaluation/jevbench.md) 모델 카드 자체도 복잡한 긴 문서, 낯선 rubric의 score/noul, 학습 도메인 밖 confidence 적용을 한계로 명시한다. [한계 설명](https://huggingface.co/StrandsAgents/strands-decider-2B-hobson-v19)

## 5. Rune와 Mapika: 모델·서빙 방식·버전 구분

Surogate Rune v3는 Gemma 4 26B-A4B-it 계열의 텍스트·이미지 판단 모델이며 Apache-2.0, 26.5B/활성 약4B, BF16 가중치51.6GB를 명시한다. HF 접근 조건 동의가 필요하다. 저장소 이름에 `GGUF`가 있지만 현재 v3는 safetensors이며 v3 GGUF는 아직 없다고 명시한다. 기존 v1 GGUF는 과거 revision에 있다. 기본은 단일패스지만 `thinking: true`는 낮은 확신 질문에서 최대512토큰을 생성한다. 모델 카드의 thinking 지수59.2는 공식 보드 점수가 아닌 추정치다. [Rune 공식 카드](https://huggingface.co/surogate/rune-26b-a4b-GGUF)

Rune 공급자 블로그는 2026-09-28 보드 스냅샷 기준 Rune57.44/Jev57.91, 별도 단일 RTX PRO6000 로컬 단일질문 median90~180ms를 명시한다. 모델 카드의 다중질문·GPU당4동시클라이언트 median388ms/p95 2.33초와 조건이 다르다. 서비스 예제 경로는 `/api/alpha/decisions`이며 Jev와 비슷한 본문을 쓰는 것과 완전한 SDK drop-in 호환은 구분한다. [공급자 설명](https://invergent.ai/blog/rune/), [서빙 API 문서](https://github.com/invergent-ai/surogate/blob/main/docs/inference/decisions.md)

Mapika decider에는 실제 후속학습한 모델과 기존 LLM의 선택지 logits를 읽는 구성이 함께 있다. `decider-2b` v11은 Qwen3.5-2B-Base 기반 공개 모델(약3.8GB BF16, Apache-2.0)로 SystemOne을 지원한다. [모델 카드](https://huggingface.co/Mapika/decider-2b) 반면 `decider-chat-gemma4-31b` 및 `decider-chat-qwen3.6-27b`는 저장소가 ‘stock checkpoints plus configuration’이라고 설명한다. 이들을 별도 학습된 새 모델로 세면 안 된다. v11은9/24, chat 모델 설정 공개는9/29로 changelog에 표시된다. [공식 변경 기록](https://github.com/Mapika/decider/blob/main/docs/CHANGELOG.md)

## 6. 본문에서 생략해도 되는 보조 후보

- Laya: ModernBERT-large 421M 영어 모델, mmBERT-base322M 다국어 모델 등 작은 encoder 기반 판단 계열. 로컬 자원 제약 측면의 비교 가치가 있다. 모델/버전별 문맥 길이와 언어 coverage를 구분해야 한다. [Laya 공식 카드](https://huggingface.co/convaiinnovations/laya)
- Bespoke-Nimble-9B: Qwen3.5-9B LoRA, Apache-2.0. 9/24 갱신판은8,192토큰·필드당255 choices, 허용 answer-token 점수를 직접 읽는다. 참조 helper는 필드를 개별 처리하며, Jev HTTP 계약의 완전 호환은 해당 카드에서 확인하지 못했다. [Nimble 공식 카드](https://huggingface.co/bespokelabs/Bespoke-Nimble-9B)
- Respan Span-01/Lite: 9/24 발표. 에이전트 trace의 자연어 행동 정의를 검사해 present/absent/not_observable 세 확률을 반환한다. 전용 `/api/v1/scores`, Lite무료(일일 cap), Pro입력$0.02/M·출력무료. 범용 choice/score와 다른 행동 감지 전용 입출력이라 별도 예시로 적절하다. 공개 가중치·기반 모델·라이선스는 미확인. [출시 블로그](https://www.respan.ai/blog/introducing-span-1), [공식 문서](https://www.respan.ai/docs/documentation/span-01/concept)

## 7. 두 리더보드 해석

- [HF Jev Decision Index](https://huggingface.co/spaces/multimodalart/jev-decision-index)는 다양한 모델·추론 구성을 비교한다. 모든 행이 상용 제품 또는 별도 학습된 전용 모델은 아니다. [Methodology 0.2.1](https://multimodalart-jev-decision-index.static.hf.space/methodology.html)의 지수 패널은38개 benchmark·5범주이며 무작위 선택의 기대 성능을 보정한다. 화면의 전체43개 benchmark와 지수 산정38개를 혼용하지 않는다.
- [Cloudflare Decision Model Leaderboard](https://clef-evals.workers-ai-mle.workers.dev/)는 원본 커뮤니티 snapshot에 Cloudflare 자체 측정 행을 추가한 비교다. 원본과 미러의 갱신일·실행 주체·하드웨어가 같지 않으므로 순위를 동일 실험의 승패처럼 해석하지 않는다. 미실행 benchmark를0으로 처리하는 조건과 평가 coverage도 함께 확인한다.
- HF 원본의 `pplx-decider-v1-27b`와 Cloudflare 쪽 `AutoJev-27B`는 같은56.40 지수로 보이더라도 명칭만 보고 동일 체크포인트라고 단정하지 않는다. 원본의 오래된 snapshot 결과를 Perplexity API 최신11개 평가의 Overall85.71와 합치지 않는다.
- Rune가 설명하는 예전0.2→0.2.1 변화처럼 benchmark panel·재채점·분야 가중치가 바뀌면 동일 모델 점수도 달라진다. 지수는 업무 정답률이 아니다. [Rune의 버전별 평가 설명](https://huggingface.co/surogate/rune-26b-a4b-GGUF)

위 리더보드의 화면 수치·snapshot와 methodology는 콘텐츠 수정 과정에서 브라우저로도 확인했다. 발표일 이후를 뜻하는 자료를 추정해서 채우지 않았다. 가격·제품 사양은 서비스 갱신에 따라 달라질 수 있다.

## 적용 시 확인할 항목

이는 이 조사에 대한 실무적 해석이다. 같은 `choice`, `score`, `noul` 형식이더라도 실제 도입 전에는 ① endpoint·인증·이미지 인코딩, ② 질문/선택지/입력 한도, ③ confidence·score 정의와 확률 보정, ④ 한국어 실제 정답률 및 검토 전환율, ⑤ 입력 길이·동시성을 맞춘 median/p95, ⑥ 모델·질문 버전별 결과를 함께 비교한다. 공개 가중치 비용은 API 토큰값0으로 계산하지 말고 GPU·서빙·운영비를 포함한다.
