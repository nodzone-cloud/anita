/* ANITA v24.0 — CONTEXTUAL REPLY / PENDING QUESTION ENGINE
   Resolves the user's answer against ANITA's own last question before global routing.
   It deliberately uses schemas, not one-off global meanings (e.g. "slow" only means
   still_slow when the pending question is about faster vs still slow).
*/
(function(){
"use strict";
const LP=()=>window.ANITA_LANGUAGE_PARSER;
function norm(s){return LP()?.normalize?LP().normalize(s):String(s||"").toLowerCase().replace(/[^a-zа-яёäöå0-9%]+/gi," ").trim();}
function L(l,en,ru,fi){return l==="ru"?ru:l==="fi"?fi:en;}
function lastAssistant(){return window.ANITA_DIALOG_MEMORY?.state?.lastAssistant||"";}
function inferSchema(question){
 const q=norm(question);
 if(!q)return null;
 if(/faster.*still slow|noticeably faster|заметно быстрее.*все еще|быстрее.*медленно|nopeampi.*edelleen hidas/.test(q))return"faster_still_slow";
 if(/everywhere.*only|во вс.*только|kaikkialla.*vain/.test(q))return"system_wide_app_only";
 if(/usb.*bluetooth.*receiver|кабел.*bluetooth.*прием|usb.*bluetooth.*vastaanotin/.test(q))return"wired_receiver_bluetooth";
 if(/same time|simultaneous|одновременно|samaan aikaan/.test(q))return"simultaneous_sequential";
 if(/highest.*cpu.*memory.*disk|cpu.*memory.*disk|цп.*памят.*диск/.test(q))return"high_normal";
 if(/does .*work|working now|работает.*сейчас|toimiiko/.test(q))return"working_not_working";
 if(/did .*help|did .*find|нашел.*угроз|löysikö|yes or no|да или нет/.test(q))return"yes_no";
 return null;
}
function expectedSchema(){
 const m=window.ANITA_MEMORY?.state;
 const e=m?.pendingQuestion?.expected||m?.expected;
 const known=["yes_no","better_same_worse","working_not_working","system_wide_app_only","wired_receiver_bluetooth","simultaneous_sequential","done_not_done","faster_still_slow","high_normal","present_missing"];
 if(known.includes(e))return e;
 return inferSchema(lastAssistant());
}
function classify(text,schema){
 const t=norm(text); if(!t||!schema)return null;
 const has=(re)=>re.test(t);
 if(schema==="faster_still_slow"||schema==="better_same_worse"){
  if(has(/\b(still slow|slow|same|still the same|not better|no difference|no change|didn t help|didnt help|no|nope|nah|laggy|sluggish|медленно|все еще медленно|всё ещё медленно|так же|не лучше|не помог|hidas|edelleen hidas|sama|ei parempi|ei auttanut)\b/))return{value:"still_slow",confidence:.99,canonical:"still slow"};
  if(has(/\b(faster|better|much better|yes better|yes faster|быстрее|лучше|стало быстрее|стало лучше|nopeampi|parempi)\b/))return{value:"faster",confidence:.98,canonical:"faster"};
  if(has(/\b(a little|little better|slightly|немного|чуть|vähän|hieman)\b/) && has(/\b(slow|медлен|hidas)\b/))return{value:"still_slow",confidence:.93,canonical:"still slow"};
 }
 if(schema==="working_not_working"){
  if(has(/\b(no|nope|not working|still not|doesn t|doesnt|didn t|didnt|нет|не работает|неа|ei|ei toimi)\b/))return{value:"not_working",confidence:.97,canonical:"no"};
  if(has(/\b(yes|works|working|fixed|да|работает|заработало|kyllä|toimii)\b/))return{value:"working",confidence:.97,canonical:"yes"};
 }
 if(schema==="yes_no"){
  if(has(/\b(no|nope|nah|didn t|didnt|doesn t|doesnt|нет|неа|ei)\b/))return{value:"no",confidence:.96,canonical:"no"};
  if(has(/\b(yes|yeah|yep|да|ага|kyllä|joo)\b/))return{value:"yes",confidence:.96,canonical:"yes"};
 }
 if(schema==="done_not_done"){
  if(has(/\b(done|finished|ready|did it|сделал|готово|готов|valmis|tehty)\b/))return{value:"done",confidence:.98,canonical:"done"};
  if(has(/\b(not yet|not done|еще нет|ещё нет|не сделал|ei vielä)\b/))return{value:"not_done",confidence:.98,canonical:"not done"};
 }
 if(schema==="system_wide_app_only"){
  if(has(/\b(everywhere|all windows|system wide|systemwide|везде|нигде не работает|во всей windows|kaikkialla|koko windows)\b/))return{value:"system_wide",confidence:.98,canonical:"everywhere"};
  if(has(/\b(only|just).*(game|app|program|browser)|только.*(игр|программ|брауз)|vain.*(peli|ohjel|selain)/))return{value:"app_only",confidence:.96,canonical:"only in one program"};
 }
 if(schema==="wired_receiver_bluetooth"){
  if(has(/\b(bluetooth)\b/))return{value:"bluetooth",confidence:.99,canonical:"bluetooth"};
  if(has(/\b(receiver|dongle|приемник|приёмник|vastaanotin)\b/))return{value:"usb_receiver",confidence:.99,canonical:"usb receiver"};
  if(has(/\b(cable|wired|usb cable|провод|кабель|проводная|kaapeli|langallinen)\b/))return{value:"wired_usb",confidence:.96,canonical:"wired usb"};
 }
 if(schema==="simultaneous_sequential"){
  if(has(/\b(same time|simultaneous|together|одновременно|вместе|samaan aikaan|yhtä aikaa)\b/))return{value:"simultaneous",confidence:.98,canonical:"same time"};
  if(has(/\b(one after|different time|separately|по очереди|не одновременно|eri aikaan|peräkkäin)\b/))return{value:"sequential",confidence:.96,canonical:"different times"};
 }
 if(schema==="present_missing"){
  if(has(/\b(missing|not there|absent|нет|отсутств|puuttuu|ei näy)\b/))return{value:"missing",confidence:.96,canonical:"missing"};
  if(has(/\b(present|there|visible|есть|видно|näkyy|on)\b/))return{value:"present",confidence:.90,canonical:"present"};
 }
 return null;
}
function clarification(schema,l){
 const map={
  faster_still_slow:L(l,"I’m still with the same check. Is the computer faster now, or is it still slow?","Я всё ещё уточняю результат этой проверки. Компьютер стал быстрее или всё ещё работает медленно?","Pysytään samassa tarkistuksessa. Onko tietokone nyt nopeampi vai edelleen hidas?"),
  working_not_working:L(l,"I’m asking about the same device: does it work now, or is it still not working?","Я спрашиваю про то же устройство: оно сейчас работает или всё ещё не работает?","Kysyn samasta laitteesta: toimiiko se nyt vai eikö se vieläkään toimi?"),
  system_wide_app_only:L(l,"Does the problem happen everywhere in Windows, or only in one game/program?","Проблема возникает во всей Windows или только в одной игре/программе?","Onko ongelma kaikkialla Windowsissa vai vain yhdessä pelissä/ohjelmassa?")
 };
 return map[schema]||null;
}
function isClearlyNewProblem(text){
 const t=norm(text); const words=t.split(/\s+/).filter(Boolean).length;
 return words>=4 && /\b(mouse|keyboard|monitor|screen|printer|computer|pc|laptop|мыш|клавиатур|монитор|экран|принтер|комп|пк|ноут|hiiri|näppäimist|näyttö|tietokone)\b/.test(t) && /\b(not work|stopped|broken|error|freeze|crash|не работ|перестал|слом|ошиб|завис|ei toimi|lakkasi|virhe|jum)\b/.test(t);
}
function resolve(text){const schema=expectedSchema();return{schema,result:classify(text,schema),question:lastAssistant()};}
if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function"){console.error("[ANITA v24.0] Context Reply: router missing");return;}
const previous=window.ANITA_V7.handle.bind(window.ANITA_V7);
window.ANITA_V7.handle=function(text,l){
 const r=resolve(text);
 if(r.schema && !isClearlyNewProblem(text)){
   if(r.result && r.result.confidence>=.85){
     const m=window.ANITA_MEMORY?.state;
     if(m?.pendingQuestion){m.pendingQuestion.resolved=true;m.pendingQuestion.answer=r.result.value;}
     const out=previous(r.result.canonical,l);
     if(out){out.contextualReply=true;out.normalizedReply=r.result.value;out.originalUserText=String(text||"");return out;}
   }
   const wc=String(text||"").trim().split(/\s+/).length;
   if(wc<=4){const c=clarification(r.schema,l||window.ANITA_MEMORY?.state?.language||"en");if(c)return{type:"answer",text:c,handled:true,contextualReply:true,needsClarification:true,expected:r.schema};}
 }
 return previous(text,l);
};
window.ANITA_CONTEXT_REPLY={version:"24.0",inferSchema,classify,resolve,expectedSchema,isClearlyNewProblem};
console.log("[ANITA v24.0] Contextual Reply Engine loaded");
})();
