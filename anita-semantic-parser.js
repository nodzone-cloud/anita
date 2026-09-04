/* ANITA v26.1.0 — Semantic Intent Layer
   Loads anita-semantic-intents-v1.json and converts ordinary RU/EN/FI wording
   into structured intent/entity/symptom data. It does NOT replace ANITA Core.
*/
(function(){
"use strict";

const scriptSrc=(document.currentScript&&document.currentScript.src)||"";
const BASE=scriptSrc?scriptSrc.replace(/[^/]*$/,"/"):"https://nodzone-cloud.github.io/anita/";
const DATA_URL=BASE+"anita-semantic-intents-v1.json?v=26.1.0";
let DATA=null, LOAD_ERROR=null;

function clean(s){
  return String(s||"").toLowerCase().replace(/ё/g,"е").normalize("NFKC")
    .replace(/[“”„«»]/g,'"').replace(/[’`]/g,"'")
    .replace(/[^a-zа-я0-9äöå%+.#'\-\s]/gi," ").replace(/\s+/g," ").trim();
}
function esc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
function hasPhrase(text,phrase){
  const t=" "+clean(text)+" ", p=clean(phrase);
  if(!p)return false;
  return new RegExp("(?:^|\\s)"+esc(p).replace(/\\ /g,"\\s+")+"(?:$|\\s)","i").test(t.trim());
}
function langOf(text){
  const s=String(text||"");
  if(/[а-яё]/i.test(s))return "ru";
  if(/[äöå]/i.test(s))return "fi";
  return "en";
}
function applyReplacements(text,lang){
  let out=clean(text);
  const maps=(DATA&&DATA.normalization&&DATA.normalization.replace)||{};
  const order=[];
  if(maps[lang]) order.push(maps[lang]);
  Object.keys(maps).forEach(k=>{if(k!==lang)order.push(maps[k]);});
  for(const mp of order){
    const entries=Object.entries(mp).sort((a,b)=>b[0].length-a[0].length);
    for(const [from,to] of entries){
      const p=clean(from); if(!p)continue;
      const re=new RegExp("(^|\\s)"+esc(p).replace(/\\ /g,"\\s+")+"(?=$|\\s)","gi");
      out=out.replace(re,(m,pre)=>pre+clean(to));
    }
  }
  return out.replace(/\s+/g," ").trim();
}
function detectGroups(original,normalized){
  const found={device:[],symptom:[]};
  if(!DATA||!DATA.semantic_groups)return found;
  for(const type of ["device","symptom"]){
    const groups=DATA.semantic_groups[type]||{};
    for(const [name,phrases] of Object.entries(groups)){
      if((phrases||[]).some(p=>hasPhrase(original,p)||hasPhrase(normalized,p))) found[type].push(name);
    }
  }
  // contextual additions that are hard to express as isolated synonyms
  const t=clean(original);
  if(/(?:black screen|no signal|нет изображения|черн(?:ый|ая) экран|нет сигнала|musta ruutu|ei signaalia)/i.test(t)){
    if(!found.device.includes("monitor")) found.device.push("monitor");
    if(!found.symptom.includes("no_picture")) found.symptom.push("no_picture");
  }
  return found;
}
function phraseScore(text,intent,lang){
  let best=0;
  const pools=[];
  if(intent.patterns){pools.push(...(intent.patterns[lang]||[]));}
  if(intent.examples){pools.push(...(intent.examples[lang]||[]));}
  for(const p of pools){
    if(hasPhrase(text,p))best=Math.max(best,1);
    else {
      const a=clean(text).split(/\s+/).filter(Boolean), b=clean(p).split(/\s+/).filter(Boolean);
      if(b.length){const overlap=b.filter(x=>a.includes(x)).length/b.length;best=Math.max(best,overlap*.72);}
    }
  }
  return best;
}
function requiredScore(intent,groups){
  if(!intent.requires)return {score:0,valid:true};
  let total=0,hit=0;
  for(const [type,allowed] of Object.entries(intent.requires)){
    total++;
    const have=groups[type]||[];
    if((allowed||[]).some(x=>have.includes(x)))hit++;
  }
  return {score:total?hit/total:0,valid:hit===total};
}
function contextualShortReply(text){
  if(!DATA||!DATA.dialogue||!DATA.dialogue.short_replies)return null;
  for(const [kind,arr] of Object.entries(DATA.dialogue.short_replies)){
    if((arr||[]).some(p=>hasPhrase(text,p)))return kind;
  }
  return null;
}
function analyze(text,opts){
  if(!DATA)return null;
  opts=opts||{};
  const lang=opts.lang||langOf(text), normalized=applyReplacements(text,lang), groups=detectGroups(text,normalized);
  const short=contextualShortReply(text);
  const pending=!!(opts.pendingQuestion || (window.ANITA_MEMORY&&window.ANITA_MEMORY.state&&window.ANITA_MEMORY.state.lastQuestion));
  if(short&&pending){
    return {kind:"context_reply",reply:short,language:lang,normalized,confidence:.99,groups};
  }
  let best=null;
  for(const intent of (DATA.intents||[])){
    const ps=phraseScore(text,intent,lang), rs=requiredScore(intent,groups);
    let score=ps;
    if(intent.requires){score=Math.max(score, rs.valid ? .88 : (rs.score*.5));}
    if(ps>.45&&rs.score>.0)score=Math.min(.99,score+.12*rs.score);
    if(!best||score>best.confidence||(score===best.confidence&&(intent.priority||0)>(best.intent.priority||0))){
      best={intent,confidence:score};
    }
  }
  if(!best||best.confidence<.58){
    return {kind:"unknown",language:lang,normalized,confidence:best?best.confidence:0,groups,aiFallbackEligible:true};
  }
  const i=best.intent;
  let target=i.legacy_target?Object.assign({},i.legacy_target):null;
  if(i.id==="monitor_not_working"&&target){
    if(groups.symptom.includes("no_picture"))target.issue="no_picture";
    else if(groups.symptom.includes("no_power"))target.issue="boot";
    else target.issue="not_working";
  }
  return {kind:"intent",intentId:i.id,type:i.type||null,route:i.route||null,language:lang,normalized,
    confidence:Math.round(best.confidence*1000)/1000,groups,target,canonicalQuery:i.canonical_query||null,
    aiFallbackEligible:false};
}
function getData(){return DATA;}
const ready=fetch(DATA_URL,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json();})
  .then(j=>{DATA=j;console.log("[ANITA v26.1] Semantic JSON loaded",j&&j.meta&&j.meta.version);return j;})
  .catch(e=>{LOAD_ERROR=e;console.warn("[ANITA v26.1] Semantic JSON unavailable; legacy routing remains active",e);return null;});

window.ANITA_SEMANTIC={version:"26.1.0",ready,analyze,getData,get error(){return LOAD_ERROR;},dataUrl:DATA_URL};
console.log("[ANITA v26.1] Semantic parser loaded");
})();
