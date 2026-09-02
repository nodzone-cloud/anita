/* ANITA v18.1 - Safe Main Router
   Load AFTER:
   1) anita-knowledge.js
   2) anita-memory.js
   3) anita-intents.js
   4) anita-responses.js

   Core safety rule:
   If the user clearly names a device (mouse, keyboard, monitor, etc.),
   ANITA must NEVER fall into an unrelated legacy branch such as PC power/boot.
*/
(function(){
"use strict";

if(!window.ANITA_MEMORY || !window.ANITA_INTENTS || !window.ANITA_RESPONSES){
  console.error("[ANITA v18.1] Missing memory/intents/responses module");
  return;
}
if(!window.ANITA_V7 || typeof window.ANITA_V7.handle!=="function"){
  console.error("[ANITA v18.1] Legacy ANITA_V7 not found");
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

function detectCategory(text){
  const t=" "+I.normalize(text)+" ";

  const tests=[
    ["mouse", /\b(mouse|cursor|pointer|hiiri|osoitin|мышь|мышка|мыши|курсор)\b/],
    ["keyboard", /\b(keyboard|key|keys|näppäimistö|näppis|näppäin|клавиатура|клава|клавиша|клавиши)\b/],
    ["display", /\b(monitor|screen|display|näyttö|монитор|экран)\b/],
    ["microphone", /\b(microphone|mic|mikrofoni|микрофон|микрофона)\b/],
    ["webcam", /\b(webcam|camera|kamera|verkkokamera|вебкамера|веб-камера|камера)\b/],
    ["printer", /\b(printer|tulostin|принтер)\b/],
    ["scanner", /\b(scanner|skanneri|сканер)\b/],
    ["game_controller", /\b(gamepad|controller|peliohjain|геймпад)\b/],
    ["ram", /\b(ram|memory|muisti|оперативка|оперативная память)\b/],
    ["disk", /\b(ssd|hdd|nvme|hard drive|drive|disk|levy|kovalevy|диск|жесткий диск|жёсткий диск)\b/],
    ["gpu", /\b(gpu|graphics card|video card|näyttis|näytönohjain|видеокарта|видюха)\b/],
    ["software", /\b(program|application|app|software|ohjelma|sovellus|программа|приложение)\b/],
    ["windows", /\b(windows|виндовс)\b/],
    ["bluetooth", /\b(bluetooth)\b/],
    ["usb_storage", /\b(usb|flash drive|external drive|флешка|usb-laite|muistitikku)\b/]
  ];

  for(const [category,re] of tests){
    if(re.test(t)) return category;
  }
  return null;
}

function detectIssue(text,category){
  const t=I.normalize(text);

  if(/\b(stop|stopped|stops|quit|quit working|died|dead|not work|not working|does not work|do not work|cannot use|can't use|cant use|not respond|stuck|frozen|freeze)\b/.test(t) ||
     /\b(не работает|перестал работать|перестала работать|перестало работать|не реагирует|завис|умерла|умер)\b/.test(t) ||
     /\b(ei toimi|lakkasi toimimasta|ei reagoi|jumissa|hyytyi)\b/.test(t)){
    return "not_working";
  }
  if(/\b(not detect|does not detect|not detected|not recognize|cannot find|can't find|cant find)\b/.test(t) ||
     /\b(не видит|не определяется|не распознает|не распознаёт|не находит)\b/.test(t) ||
     /\b(ei tunnista|ei löydä)\b/.test(t)){
    return "not_detected";
  }
  if(/\b(disconnect|loses connection|lost connection)\b/.test(t) ||
     /\b(отключается|теряет соединение|пропадает)\b/.test(t) ||
     /\b(yhteys katkeaa|yhteys katoaa)\b/.test(t)){
    return "disconnects";
  }
  return category+"_issue";
}

function syntheticMatch(text,lang,category){
  return {
    id:null,
    ru:String(text||""),
    en:String(text||""),
    fi:String(text||""),
    lang,
    category,
    issue:detectIssue(text,category),
    confidence:0.92,
    match:"device-guard"
  };
}

function safeCategoryResponse(text,lang,category){
  // Use the existing response module with a synthetic intent instead of
  // letting an unrelated legacy rule hijack a clearly identified device.
  return R.first(syntheticMatch(text,lang,category),lang);
}

function route(text,l){
  const lang=language(text,l);
  M.state.language=lang;
  M.push("user",text);

  const category=detectCategory(text);

  // 1. Contextual short replies come first, unless the user clearly starts
  //    talking about a concrete device/topic.
  if(M.state.lastQuestion && looksShortReply(text) && !category){
    const f=R.follow(text,lang);
    if(f){
      M.push("assistant",f.text,{source:"v18.1-followup"});
      return f;
    }
  }

  // 2. Training bank: exact + fuzzy 200-case matching.
  const match=I.find(text);
  if(match){
    // Guard against fuzzy cross-device matches. If the user's sentence clearly
    // says "mouse", a fuzzy match is allowed only inside the mouse category.
    if(!category || match.category===category){
      M.state.lastMatch=match;
      return R.first(match,lang);
    }
  }

  // 3. HARD DEVICE GUARD.
  //    This is the important v18.1 fix:
  //    "my mouse doesnt work" can never reach old PC power logic.
  if(category){
    M.setQuestion(null,null);
    return safeCategoryResponse(text,lang,category);
  }

  // 4. Remaining contextual answer.
  if(M.state.lastQuestion){
    const f=R.follow(text,lang);
    if(f){
      M.push("assistant",f.text,{source:"v18.1-followup"});
      return f;
    }
  }

  // 5. Legacy knowledge is ONLY fallback for messages without a clearly
  //    identified v18 device/category.
  const old=legacy(text,lang);
  if(old && old.text) M.push("assistant",old.text,{source:"legacy-fallback"});
  return old;
}

window.ANITA_V7.handle=route;
window.ANITA_V18={
  version:"18.1",
  route,
  state:M.state,
  reset:M.resetConversation,
  test(text,l){ return route(text,l); },
  detectCategory
};

console.log("[ANITA v18.1] Safe Modular Router loaded");
})();