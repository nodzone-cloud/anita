/* ANITA v26.1.4 — Product Conversation / protected self-description layer */
(function(){
"use strict";
const BASE=(()=>{try{const s=[...document.scripts].find(x=>/anita-product-conversation\.js/i.test(x.src||""));return s?new URL(".",s.src).href:"./"}catch(e){return"./"}})();
let db=null, lastTopic=null;
const ready=fetch(BASE+"anita-product-conversation.json?v=26.1.4").then(r=>r.ok?r.json():Promise.reject(r.status)).then(x=>(db=x,x)).catch(e=>{console.warn("[ANITA Product]",e);return null});
const n=s=>String(s||"").toLowerCase().replace(/[?!.,:;]+/g," ").replace(/\s+/g," ").trim();
const L=l=>/^ru/i.test(l)?"ru":/^fi/i.test(l)?"fi":"en";
function direct(text,lang){
 if(!db)return null; const t=n(text), l=L(lang);
 for(const [topic,o] of Object.entries(db.topics||{})){
   if((o.patterns?.[l]||[]).some(p=>t.includes(n(p)))){
     lastTopic=topic; return {topic,text:o.answers?.[l],protected:topic==="internal"};
   }
 }
 return null;
}
function follow(text,lang,lastAssistant){
 if(!db)return null; const t=n(text),l=L(lang), short=t.split(" ").length<=5;
 if(!short)return null;
 const prior=n(lastAssistant||"");
 // "Распознаёт?" after ANITA just explained recognition belongs to ANITA, not keyboard/input.
 if((/распозна|recogniz|tunnist/.test(t)||/как|how|miten/.test(t)) &&
    /распозна|recogniz|tunnist|формулиров|wording|muotoil/.test(prior)){
   lastTopic="recognition";
   return {topic:"recognition",text:db.topics.recognition.answers[l]};
 }
 // Short "а как?/почему?/что значит?" continues an active product topic.
 if(lastTopic && /^(а )?(как|почему|что значит|how|why|what do you mean|miten|miksi)/.test(t)){
   const o=db.topics[lastTopic];
   if(o) return {topic:lastTopic,text:o.answers[l],continuation:true};
 }
 return null;
}
window.ANITA_PRODUCT_CONVERSATION={version:"26.1.4",ready:()=>ready,direct,follow,reset:()=>{lastTopic=null}};
console.log("[ANITA v26.1.4] Product Conversation Layer loaded");
})();