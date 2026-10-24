import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const dir=path.join(root,'research/experiments/2026-10-24-ofbiz-ai-ready-repeat');
const read=p=>fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n');
const spec=JSON.parse(read(path.join(dir,'questions-and-rubric.json')));
const manifest=JSON.parse(read(path.join(dir,'manifest.json')));
const judgments=JSON.parse(read(path.join(dir,'judgments.json')));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const lines=[];
const add=s=>lines.push(s);
const runs=manifest.runs.map(r=>({...r,...judgments.judgments.find(j=>j.id===r.id),answer:read(path.join(dir,r.id+'-answer.md')).trim()}));
function evidence(r){
 const l=r.answer.split('\n').filter(Boolean);
 const find=regex=>l.filter(s=>regex.test(s)).join('\n');
 if(r.question==='Q1') return [find(/둘 다 들어오면|둘 다 들어오면|cancelQuantity == null|null이 아닌 한 우선/),find(/orderItemSeqId \+ ":" \+ shipGroupSeqId/),find(/기입고|기취소|기존 취소|입고수량|입고 수량/)];
 if(r.question==='Q2') return [find(/214[12]~2165|2167~2178/),find(/ServiceUtil\.isError/),find(/GenericServiceException/)];
 return [find(/itemQuantity/),find(/cancelOrderItemInvResQty/),find(/deleteOrderItemShipGroupAssoc/)];
}
for(const r of runs){
 r.evidence=evidence(r);
 if(r.evidence.some(e=>!e)) throw Error('Missing evidence: '+r.id);
 r.answerCharacters=r.answer.length;
 r.answerSha256=sha(Buffer.from(r.answer+'\n'));
 r.draftMention=r.answer.includes('미실행');
 r.testIdMention=/T01~T04/.test(r.answer);
 if(sha(fs.readFileSync(path.join(dir,r.input)))!==r.sha256) throw Error('Input changed');
}
for(const d of manifest.documentHashes) if(sha(fs.readFileSync(path.join(root,'assets/news/ofbiz-ai-ready',d.file)))!==d.sha256) throw Error('Document changed');
const grouped=spec.questions.map(q=>({id:q.id,title:q.title,A:runs.filter(r=>r.question===q.id&&r.condition==='A'&&r.status.every(s=>s==='명시')).length,B:runs.filter(r=>r.question===q.id&&r.condition==='B'&&r.status.every(s=>s==='명시')).length}));
const summary={runs:runs.length,questions:3,repeatsPerCondition:3,grouped,documentDraftMention:runs.filter(r=>r.condition==='B'&&r.draftMention).map(r=>r.id),documentTestIdMention:runs.filter(r=>r.condition==='B'&&r.testIdMention).map(r=>r.id),minCharacters:Math.min(...runs.map(r=>r.answerCharacters)),maxCharacters:Math.max(...runs.map(r=>r.answerCharacters)),overLength:runs.filter(r=>r.answerCharacters>1200).map(r=>r.id)};
fs.writeFileSync(path.join(dir,'results.json'),JSON.stringify({summary,runs},null,2)+'\n');
add('# OFBiz 새 질문 3개 · 산출물 제공 전후 반복 비교\n');
add('2026-10-24 한국시간에 3문항 × 2조건 × 3회, 총 18개 독립 대화에서 응답을 수집했다. 모든 문항에서 사전 핵심 사항 세 개를 모두 명시한 응답은 소스만 제공 3/3, 문서 추가 3/3이었다. 이 범위에서 핵심 사항 충족의 차이는 관찰되지 않았다. 두 조건의 전반적 성능이 동등하다거나 문서화가 불필요하다는 결론은 아니다.\n');
add('## 실행 조건\n');
add('- 같은 상위 모델·추론 설정을 상속한 Codex 독립 에이전트 18개. 모델 override 없음. 이전 대화·다른 실행의 응답·판독 기준을 전달하지 않았다.\n- 정확한 API 모델 식별자, temperature, seed는 도구에서 노출되지 않았다. 새 대화로 분리했지만 통계적 독립성이나 외부 재현성을 보장하지 않는다.\n- A: 질문·지시문·소스 발췌. B: 동일한 A 입력 뒤에 기존 기능 설명서·규칙 연결표를 추가. 질문별·조건별 세 입력은 바이트 단위로 동일하다. 문서 내용은 실험 전에 고정하고 수정하지 않았다.\n- 각 실행은 지정한 입력 파일 하나만 읽도록 제한했다. 도구 호출에서 그 파일의 읽기만 수행했음을 확인했다. 추가 검색·다른 파일·프로그램 실행·수정 없음.\n- 한국어 1,200자 이내라는 같은 지시. 실제 답변은 원문 마크업·공백·줄바꿈을 포함해 '+summary.minCharacters+'~'+summary.maxCharacters+'자였고 제한 초과는 없었다.\n- 질문·조건의 순서는 시드 20261024로 섞어 고정했고 최대 3개를 병행했다. 여기서 시드는 실행 순서용이며 모델의 생성 시드가 아니다.\n- 조건별 3회 모두 보존했다. 실패나 답변 선별을 위한 재실행은 없었다. 이 보고서에서 시간·토큰 비용은 평가 지표로 사용하지 않는다.\n');
add('### 공통 소스와 추가 문서\n');
add('Apache OFBiz 18.12.19의 고정 커밋 `e7b7ae0eaa4561a2357b198e21cc8ca63ffac105`. 최초 비교와 동일한 네 파일의 485행이다. 전체 저장소 탐색 실험은 아니다.\n');
add('| 소스 | 발췌 범위 |\n| --- | --- |\n| [services.xml](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/services.xml#L278-L296) | 278~296행 |\n| [OrderServices.java](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/order/OrderServices.java#L1999-L2224) | 1999~2224행 |\n| [secas.xml](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/servicedef/secas.xml#L23-L158) | 23~158행 |\n| [SalesOrderTest.java](https://github.com/apache/ofbiz-framework/blob/e7b7ae0eaa4561a2357b198e21cc8ca63ffac105/applications/order/src/main/java/org/apache/ofbiz/order/test/SalesOrderTest.java#L51-L154) | 51~154행 |\n');
add('B에만 추가한 문서: [기능 설명서](./order-item-cancellation.md), [규칙 연결표](./order-item-cancellation-traceability.md). 첫 알림 질문은 문서에 유사 답이 있어 이번 18회 집계에서 제외했다. [첫 비교 기록](./agent-answer-comparison.md)은 별도로 보존한다.\n');
add('### 공통 응답 지시\n\n> 제공된 자료만 근거로 아래 질문에 한국어로 답하세요. 확인한 근거와 추가로 확인해야 할 내용을 구분하세요. 외부 검색·추가 파일 조회·코드 실행·수정은 하지 마세요. 질문에 대한 답변만 작성하고, 1,200자 이내로 답하세요.\n');
add('## 실행 전에 고정한 질문과 판독 기준\n');
for(const q of spec.questions){
 add('### '+q.id+' · '+q.title+'\n\n'+q.text+'\n\n**문서에 답이 직접 없는 이유:** '+q.notInDocs+'\n');
 add('| 기준 | 소스에서 확인할 핵심 사항 | OrderServices.java 근거 |\n| --- | --- | --- |');
 for(const c of q.criteria)add('| '+c.id+' | '+c.fact+' | '+c.lines+'행 |');
 add('');
}
add('## 전체 관찰\n');
add('동일 편집 에이전트가 조건을 알고 직접 소스·응답을 대조했다. 질문 작성자와 판독자가 동일하며 독립 평가자·블라인드 채점은 없다. 사전 기준은 명시/부분 명시/없음/소스와 모순으로 판독했다. 아래 수치는 세 사항을 모두 명시한 응답 수로, 답변 전체의 정확도 점수가 아니다.\n');
add('| 질문 | A 소스만 | B 소스와 문서 |\n| --- | --- | --- |');
for(const g of grouped)add('| '+g.id+' '+g.title+' | '+g.A+'/3 | '+g.B+'/3 |');
add('\n- 사전 핵심 사항에서는 조건 간 차이와 조건 내 누락·모순이 관찰되지 않았다. 이 판독은 모든 문장이나 실행 결과를 검증한 평가가 아니다.\n- 문서 추가 응답 9개 중 3개(R05·R06·R17)가 테스트 초안이 미실행임을 명시했다. 그중 2개(R05·R17)는 T01~T04 ID를 그대로 썼다. 나머지 문서 추가 응답에서는 이 명시적 재사용이 나타나지 않았다. 규칙 CANCEL ID를 직접 참조한 응답은 없었다.\n- 소스만 받은 응답도 모두 추가 확인 사항과 제공된 테스트의 제한을 설명했다. 추가 문서가 있어야 한계를 구분한다는 차이는 관찰되지 않았다.\n- 부분 출고 질문에서 상태 변경 ECA를 덧붙이는 등 부가 설명의 선택은 달랐다. 소스만 조건의 세 응답은 ECA를 언급했고 문서 추가 조건에서는 R04·R10이 언급하고 R13은 생략했다. 1,200자 제한 속 설명 선택이며, 생략을 이해 실패로 판정하지 않았다.\n- Q2의 저장·롤백, Q3의 실제 예약 레코드·최종 상태는 양쪽 모두 추가 확인 대상으로 남겼다. R10·R15의 첫 문장 및 R11·R13의 연결 상태 표현은 본문의 요청·실행 한계와 함께 해석했다. 핵심 기준 밖의 모든 잠재적 오류가 없다는 보장은 아니다.\n');
add('## 해석의 한계\n\n1. 한 모델 설정, 한 메서드 주변의 세 질문, 조건별 세 번뿐이다. 유의성·효과 크기·모델 간 일반화나 성능 동등성을 추정하지 않는다.\n2. 관련 코드를 미리 골랐다. 두 조건이 모두 기준을 충족해 차이를 구분하지 못한 범위이며, 큰 저장소에서 자료를 찾는 어려움과 탐색 시간을 시험하지 않았다.\n3. 새 질문의 구체적 답은 두 문서에 없지만 질문은 같은 기능·코드 범위에 속한다. 학습 때 접했는지 알 수 없어 새로운 문제 일반화의 증거로 해석하지 않는다.\n4. 구조화된 문서의 효과와 추가 정보·입력 길이의 효과를 분리하지 않았다. 길이를 맞춘 대조군은 없다.\n5. 문서·질문 작성자와 판독자가 같고 조건을 아는 판독이다. 선정 편향과 판독 편향의 가능성이 있다. 외부 전문가 평가나 사람의 업무 검토는 하지 않았다.\n6. 정확한 모델 ID와 샘플링 값이 미공개이며, 독립 대화가 독립적인 확률 표본임을 보장하지 않는다.\n7. 실제 OFBiz·하위 서비스·테스트는 실행하지 않았다. 정확도 개선, 조사·검토 시간 또는 비용 절감의 실측 결과가 아니다.\n');
add('## 실행별 원문 응답과 판독 근거\n\n아래 응답은 원문 문구·마크업을 바꾸지 않았다. 각 원문 뒤에 편집자의 판독을 분리했다.\n');
for(const r of runs){
 add('### '+r.id+' · '+r.question+' · '+r.condition+' · 반복 '+r.repetition+'\n\n**응답 원문 시작**\n\n'+r.answer+'\n\n**응답 원문 끝**\n');
 add('**판독:** '+r.status.join(' / ')+'. '+r.notes+'\n');
 r.evidence.forEach((e,i)=>add('- '+r.question+'-'+(i+1)+' 인용:\n\n'+e.split('\n').map(l=>'> '+l).join('\n')+'\n'));
}
add('## 무결성 기록\n\n각 입력의 SHA-256은 파일 바이트 기준이다. 원문 응답 해시는 LF 줄바꿈·말미 줄바꿈 1개로 저장한 파일 기준이다.\n');
add('| 항목 | SHA-256 |\n| --- | --- |\n| source.txt | '+manifest.sourceSha256+' |');
for(const d of manifest.documentHashes)add('| '+d.file+' | '+d.sha256+' |');
add('\n| 실행 | 질문·조건·반복 | 입력 SHA-256 | 응답 SHA-256 |\n| --- | --- | --- | --- |');
for(const r of runs)add('| '+r.id+' | '+r.question+' '+r.condition+' '+r.repetition+' | '+r.sha256+' | '+r.answerSha256+' |');
add('\n사전 계획·질문·판독 기준·전체 입력·응답·집계는 저장소의 `research/experiments/2026-10-24-ofbiz-ai-ready-repeat/`에 보존한다.');
const report=lines.join('\n');
for(const r of runs)if(!report.includes(r.answer))throw Error('Raw response omitted');
fs.writeFileSync(path.join(root,'assets/news/ofbiz-ai-ready/agent-answer-repeat-comparison.md'),report+'\n');
console.log(JSON.stringify(summary,null,2));
