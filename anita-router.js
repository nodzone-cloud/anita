/* ANITA v18 - Main Router
   Load AFTER legacy anita-knowledge.js + memory/intents/responses.
*/
(function(){
"use strict";
if(!window.ANITA_MEMORY || !window.ANITA_INTENTS || !window.ANITA_RESPONSES){
  console.error("[ANITA v18] Missing module(s)");
  return;
}
if(!window.ANITA_V7 || typeof window.ANITA_V7.handle!=="function"){
  console.error("[ANITA v18] Legacy ANITA_V7 not found");
  return;
}

const legacy=window.ANITA_V7.handle.bind(window.ANITA_V7);
const M=window.ANITA_MEMORY;
const I=window.ANITA_INTENTS;
const R=window.ANITA_RESPONSES;

function language(text,l){
  const supplied=String(l||"").toLowerCase();
  if(["ru","en","fi"].includes(supplied)) return supplied;
  const s=String(text||"");
  if(/[а-яё]/i.test(s)) return "ru";
  if(/[äöå]/i.test(s)) return "fi";
  return "en";
}

function looksShortReply(text){
  const t=I.normalize(text);
  return t.split(/\s+/).filter(Boolean).length<=7;
}

function hasStrongDeviceSignal(text){
  const t=I.normalize(text);
  return /\b(mouse|cursor|hiiri|osoitin|мыш|курсор|keyboard|näpp|клав|monitor|screen|display|näytt|монитор|экран|microphone|mikrof|микроф|camera|webcam|kamera|камер|printer|tulost|принтер|ram|memory|оператив|muisti|ssd|hdd|disk|drive|levy|диск|gpu|graphics|näyttis|видеокарт|windows|program|app|software|ohjelma|sovellus|программ|прилож)\b/.test(t);
}

function route(text,l){
  const lang=language(text,l);
  M.state.language=lang;
  M.push("user",text);

  // Critical rule: if ANITA just asked a question and user gives a short reply,
  // interpret it in that context FIRST.
  if(M.state.lastQuestion && looksShortReply(text) && !hasStrongDeviceSignal(text)){
    const f=R.follow(text,lang);
    if(f){
      M.push("assistant",f.text,{source:"v18-followup"});
      return f;
    }
  }

  // 200-case exact/fuzzy training bank.
  const match=I.find(text);
  if(match){
    M.state.lastMatch=match;
    const r=R.first(match,lang);
    return r;
  }

  // If the user names a strong new device/problem, don't let stale context hijack it.
  if(hasStrongDeviceSignal(text)){
    M.setQuestion(null,null);
  } else if(M.state.lastQuestion){
    const f=R.follow(text,lang);
    if(f){
      M.push("assistant",f.text,{source:"v18-followup"});
      return f;
    }
  }

  // Preserve all old knowledge as fallback, but only after v18 had first chance.
  const old=legacy(text,lang);
  if(old && old.text) M.push("assistant",old.text,{source:"legacy-fallback"});
  return old;
}

window.ANITA_V7.handle=route;
window.ANITA_V18={
  version:"18.0",
  route,
  state:M.state,
  reset:M.resetConversation,
  test(text,l){return route(text,l);}
};
console.log("[ANITA v18] Modular Router loaded");
})();