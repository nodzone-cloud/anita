/* ANITA v25.0 — CONTROLLED LOCAL LEARNING
   No backend. Candidates live only in this browser (localStorage).
   They never modify GitHub files or ANITA's global knowledge automatically.
*/
(function(){
"use strict";
const KEY="anita_learning_v25";
const MAX=250;
const SAFE_MEANINGS={
  poor_system_performance:{en:"my pc is slow",ru:"компьютер работает медленно",fi:"tietokone on hidas"},
  system_wide:{en:"everywhere in Windows",ru:"во всём Windows",fi:"koko Windowsissa"},
  app_only:{en:"only in one program",ru:"только в одной программе",fi:"vain yhdessä ohjelmassa"},
  still_slow:{en:"still slow",ru:"всё ещё медленно",fi:"edelleen hidas"},
  faster:{en:"faster",ru:"быстрее",fi:"nopeampi"}
};
function now(){return new Date().toISOString();}
function norm(s){return String(s||"").normalize("NFKC").toLowerCase().replace(/[’']/g,"'").replace(/[^\p{L}\p{N}+#.%\-\s]/gu," ").replace(/\s+/g," ").trim();}
function load(){
  try{
    const v=JSON.parse(localStorage.getItem(KEY)||"null");
    return v&&Array.isArray(v.candidates)?v:{version:"25.0",candidates:[],events:[]};
  }catch(_){return{version:"25.0",candidates:[],events:[]};}
}
let state=load();
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(_){return false;}
}
function idFor(phrase,meaning){return norm(phrase)+"::"+String(meaning||"unknown");}
function addCandidate(phrase,meaning,meta){
  phrase=String(phrase||"").trim(); meaning=String(meaning||"unknown");
  if(!phrase||phrase.length>240)return null;
  const key=idFor(phrase,meaning);
  let c=state.candidates.find(x=>x.key===key);
  if(!c){
    c={key,phrase,meaning,status:"candidate",seen:0,explicitConfirmations:0,contradictions:0,confidence:0.25,
       language:meta?.language||null,createdAt:now(),updatedAt:now(),examples:[]};
    state.candidates.unshift(c);
  }
  c.seen++; c.updatedAt=now();
  if(meta?.explicit)c.explicitConfirmations++;
  if(meta?.contradiction)c.contradictions++;
  if(meta?.example && !c.examples.includes(meta.example))c.examples.slice(0,4).push(meta.example);
  // deterministic score, not statistical probability
  c.confidence=Math.max(0.05,Math.min(0.95,0.20+Math.min(c.seen,5)*0.07+Math.min(c.explicitConfirmations,4)*0.13-c.contradictions*0.20));
  state.candidates=state.candidates.slice(0,MAX);
  save(); return c;
}
function approve(key){const c=state.candidates.find(x=>x.key===key);if(c){c.status="approved_local";c.updatedAt=now();save();}return c||null;}
function reject(key){const c=state.candidates.find(x=>x.key===key);if(c){c.status="rejected";c.updatedAt=now();save();}return c||null;}
function edit(key,patch){const c=state.candidates.find(x=>x.key===key);if(!c)return null; if(patch?.phrase)c.phrase=String(patch.phrase);if(patch?.meaning)c.meaning=String(patch.meaning);c.key=idFor(c.phrase,c.meaning);c.updatedAt=now();save();return c;}
function clear(){state={version:"25.0",candidates:[],events:[]};save();}
function exportData(){
  const blob=new Blob([JSON.stringify({...state,exportedAt:now()},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="anita-learning-export-v25.json";a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),5000);
}
function lookup(text,lang){
  const n=norm(text);
  const c=state.candidates.find(x=>x.status==="approved_local"&&norm(x.phrase)===n&&SAFE_MEANINGS[x.meaning]);
  if(!c)return null;
  return SAFE_MEANINGS[c.meaning][lang]||SAFE_MEANINGS[c.meaning].en;
}
let pending=null;
function rememberPending(text,out,lang){
  if(!text||!out)return;
  const asksClarification=!!out.needsClarification || /\b(what do you mean|what exactly|which one do you mean|что ты имеешь|что именно|уточни|mitä tarkoitat|mitä tarkalleen)\b/i.test(String(out.text||""));
  if(asksClarification)pending={phrase:String(text).trim(),language:lang,at:Date.now()};
}
function observeResolved(original,out,lang){
  if(!pending)return;
  if(Date.now()-pending.at>10*60*1000){pending=null;return;}
  const choice=window.ANITA_LAST_CHOICE;
  const meaning=out?.normalizedReply || (choice&&Date.now()-choice.at<10000?choice.canonical:null);
  if(meaning && meaning!=="unknown"){
    addCandidate(pending.phrase,meaning,{explicit:true,language:pending.language||lang,example:String(original||"")});
    pending=null;
  }
}
function panel(){
  if(!/[?&]anitaLearning=1(?:&|$)/.test(location.search))return;
  const box=document.createElement("div");
  box.id="anitaLearningPanel";
  box.style.cssText="position:fixed;right:12px;bottom:12px;width:min(420px,calc(100vw - 24px));max-height:62vh;overflow:auto;z-index:2147483647;background:#111;color:#fff;border:1px solid #f39a22;border-radius:14px;padding:12px;font:13px/1.35 Arial,sans-serif;box-shadow:0 8px 30px #0008";
  function esc(s){return String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function render(){
    box.innerHTML='<div style="display:flex;gap:8px;align-items:center"><b style="font-size:15px">ANITA Learning</b><span style="margin-left:auto">'+state.candidates.length+' candidates</span></div>'+
      '<div style="margin:8px 0;display:flex;gap:6px"><button data-act="export">Export JSON</button><button data-act="clear">Clear local</button></div>'+
      (state.candidates.slice(0,50).map(c=>'<div style="border-top:1px solid #333;padding:8px 0"><div><b>'+esc(c.phrase)+'</b></div><div>→ '+esc(c.meaning)+' · seen '+c.seen+' · score '+Math.round(c.confidence*100)+'% · '+esc(c.status)+'</div><div style="margin-top:5px;display:flex;gap:5px"><button data-approve="'+esc(c.key)+'">✓ Approve local</button><button data-reject="'+esc(c.key)+'">✕ Reject</button></div></div>').join("")||'<div style="opacity:.7">No learning candidates yet.</div>');
  }
  box.addEventListener("click",e=>{
    const t=e.target;
    if(t.dataset.act==="export")exportData();
    if(t.dataset.act==="clear"&&confirm("Clear ANITA local learning candidates?"))clear();
    if(t.dataset.approve)approve(t.dataset.approve);
    if(t.dataset.reject)reject(t.dataset.reject);
    render();
  });
  document.body.appendChild(box);render();
}
function wrap(){
  if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function")return;
  const previous=window.ANITA_V7.handle.bind(window.ANITA_V7);
  window.ANITA_V7.handle=function(text,l){
    const lang=l||window.ANITA_MEMORY?.state?.language||"en";
    const learned=lookup(text,lang);
    const out=previous(learned||text,l);
    if(learned&&out){out.localLearningApplied=true;out.originalUserText=String(text||"");}
    observeResolved(text,out,lang);
    rememberPending(text,out,lang);
    return out;
  };
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",panel);else panel();
wrap();
window.ANITA_LEARNING={version:"25.0",state,addCandidate,approve,reject,edit,clear,exportData,lookup,SAFE_MEANINGS};
console.log("[ANITA v25.0] Controlled Local Learning loaded");
})();
