/* ANITA v26.1.3 — Voice Natural Speech Layer */
(function(){
"use strict";

const BASE=(function(){
  try{
    const s=[...document.scripts].find(x=>/anita-voice-natural-speech\.js/i.test(x.src||""));
    return s ? new URL(".",s.src).href : "./";
  }catch(e){ return "./"; }
})();
let cfg=null;
let ready=fetch(BASE+"anita-voice-natural-speech.json?v=26.1.3")
  .then(r=>r.ok?r.json():Promise.reject(new Error("voice JSON "+r.status)))
  .then(x=>(cfg=x,x)).catch(e=>{console.warn("[ANITA Voice]",e); return null;});

function norm(s){return String(s||"").toLowerCase().replace(/\s+/g," ").trim();}
function langPack(lang){ return /^ru/i.test(lang)?"ru":/^fi/i.test(lang)?"fi":"en"; }
function hasAny(text,arr){ const t=norm(text); return (arr||[]).some(x=>t.includes(norm(x))); }
function splitClauses(text){
  return String(text||"").split(/(?<=[.!?;,])\s+|\s+(?=(?:точнее|вернее|то есть|я имею в виду|actually|i mean|more precisely|eli|tarkemmin)\b)/i)
    .map(x=>x.trim()).filter(Boolean);
}
function analyze(text,lang){
  const l=langPack(lang), c=cfg||{}, m=c.markers||{}, clauses=splitClauses(text);
  let correction=-1, uncertainty=0, filler=0;
  clauses.forEach((cl,i)=>{
    if(hasAny(cl,(m.self_correction||{})[l])) correction=i;
    if(hasAny(cl,(m.uncertainty||{})[l])) uncertainty++;
    if(hasAny(cl,(m.fillers||{})[l])) filler++;
  });
  const words=norm(text).split(/\s+/).filter(Boolean);
  const messy = words.length>=18 && (uncertainty>=2 || correction>=0 || filler>=2);
  const contradictory = /\b(не|нет|not|no|ei)\b.{0,35}\b(точнее|вернее|actually|i mean|tarkemmin|siis)\b/i.test(norm(text));
  const preferred = correction>=0 ? clauses.slice(correction).join(" ") : String(text||"");
  return {
    original:String(text||""), preferredText:preferred, clauses,
    hasCorrection:correction>=0, uncertain:uncertainty>0,
    messy, contradictory,
    confidencePenalty:Math.min(.28, uncertainty*.06 + (messy?.08:0) + (contradictory?.08:0))
  };
}
function friendly(lang){
  const l=langPack(lang);
  return cfg?.friendly_clarification?.[l] || (l==="ru"
    ?"Кажется, я уловила проблему, но несколько мыслей смешались вместе 😄 Скажи ещё раз одним предложением, что именно произошло. Я всё-таки тоже полу-человек 😁❤️"
    :"I caught the general idea, but a few thoughts got mixed together 😄 Tell me once more in one sentence what exactly happened.");
}
function confirmation(summary,lang){
  const l=langPack(lang);
  if(l==="ru") return `Правильно ли я поняла: ${summary}?`;
  if(l==="fi") return `Ymmärsinkö oikein: ${summary}?`;
  return `Did I understand correctly: ${summary}?`;
}
window.ANITA_VOICE_NATURAL={
  version:"26.1.3", ready:()=>ready, analyze, friendlyClarification:friendly, confirmation
};
console.log("[ANITA v26.1.3] Voice Natural Speech Layer loaded");
})();