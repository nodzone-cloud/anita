/* ANITA v26.1.4.2 — Product Conversation Layer */
(function(){
"use strict";
const BASE=(()=>{try{const s=[...document.scripts].find(x=>/anita-product-conversation\.js/i.test(x.src||""));return s?new URL(".",s.src).href:"./"}catch(e){return"./"}})();
let db=null,lastTopic=null;
const ready=fetch(BASE+"anita-product-conversation.json?v=26.1.4.2").then(r=>r.ok?r.json():Promise.reject(r.status)).then(x=>(db=x,x)).catch(e=>{console.warn("[ANITA Product]",e);return null});
const n=s=>String(s||"").toLowerCase().replace(/[?!.,:;]+/g," ").replace(/\s+/g," ").trim();
const L=l=>/^ru/i.test(l)?"ru":/^fi/i.test(l)?"fi":"en";
const aboutSystem=t=>/(как.*(работа|устро)|систем|алгоритм|секрет|внутр|код|архитект|защит|how.*(work|built)|system|algorithm|secret|inside|code|miten.*toimi|järjestelm|algoritm|salais)/i.test(t);
function direct(text,lang){
 if(!db)return null; const t=n(text),l=L(lang);
 // Protected/system explanation first so broad "AI" wording cannot steal it.
 const order=["internal","recognition","human","ai","creator"];
 for(const topic of order){
   const o=db.topics?.[topic]; if(!o)continue;
   if((o.patterns?.[l]||[]).some(x=>t.includes(n(x)))){
     lastTopic=topic; return {topic,text:o.answers?.[l],protected:topic==="internal"};
   }
 }
 // Natural variations that mention ANITA's workings/secrets.
 if(aboutSystem(t)){
   lastTopic="internal"; return {topic:"internal",text:db.topics.internal.answers[l],protected:true};
 }
 return null;
}
function follow(text,lang,lastAssistant){
 if(!db)return null; const t=n(text),l=L(lang),wc=t.split(" ").filter(Boolean).length;
 if(wc>9)return null;
 const prior=n(lastAssistant||"");
 if((/распозна|recogniz|tunnist/.test(t)||/^(а )?(как|как именно|how|miten)$/.test(t)) &&
    /распозна|recogniz|tunnist|формулиров|wording|muotoil/.test(prior)){
   lastTopic="recognition"; return {topic:"recognition",text:db.topics.recognition.answers[l]};
 }
 // Questions such as "какой системой?", "а как?", "что за система?" continue the product explanation.
 if(lastTopic && (
    aboutSystem(t) ||
    /^(а )?(как|как именно|почему|какой системой|что за система|что значит|и как|how|how exactly|why|what system|what do you mean|miten|miksi|mikä järjestelmä)/i.test(t)
  )){
   // If user digs into implementation, give the useful public principle + humorous boundary.
   if(lastTopic==="ai" || lastTopic==="recognition" || lastTopic==="internal"){
     lastTopic="internal"; return {topic:"internal",text:db.topics.internal.answers[l],protected:true,continuation:true};
   }
   const o=db.topics[lastTopic];
   if(o)return {topic:lastTopic,text:o.answers[l],continuation:true};
 }
 return null;
}
window.ANITA_PRODUCT_CONVERSATION={version:"26.1.4.2",ready:()=>ready,direct,follow,reset:()=>{lastTopic=null}};
console.log("[ANITA v26.1.4.2] Product Conversation Layer loaded");
})();