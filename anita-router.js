/* ANITA v19 - Universal Context Router
   Rule: active question -> interpret reply -> continue SAME issue before global re-routing.
   A new full problem can still override old context when it clearly names another device/category.
*/
(function(){
"use strict";
if(!window.ANITA_MEMORY||!window.ANITA_INTENTS||!window.ANITA_RESPONSES){console.error("[ANITA v19] Missing module");return;}
if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function"){console.error("[ANITA v19] Legacy ANITA_V7 missing");return;}
const legacy=window.ANITA_V7.handle.bind(window.ANITA_V7), M=window.ANITA_MEMORY, I=window.ANITA_INTENTS, R=window.ANITA_RESPONSES;
function language(text,l){const x=String(l||"").toLowerCase();if(["ru","en","fi"].includes(x))return x;const s=String(text||"");if(/[а-яё]/i.test(s))return"ru";if(/[äöå]/i.test(s))return"fi";return"en";}
function norm(t){return I.normalize(t);}
function tokenCount(t){return norm(t).split(/\s+/).filter(Boolean).length;}
function detectCategory(text){
 const t=" "+norm(text)+" ", tests=[
 ["mouse",/\b(mouse|cursor|pointer|hiiri|osoitin|мышь|мышка|мыши|курсор)\b/],
 ["keyboard",/\b(keyboard|key|keys|näppäimistö|näppis|näppäin|клавиатура|клава|клавиша|клавиши)\b/],
 ["display",/\b(monitor|screen|display|näyttö|монитор|экран)\b/],
 ["audio_output",/\b(headphone|headphones|speaker|speakers|audio|sound|kuuloke|kaiutin|ääni|наушник|наушники|колонки|динамики|звук)\b/],
 ["microphone",/\b(microphone|mic|mikrofoni|микрофон|микрофона)\b/],
 ["webcam",/\b(webcam|camera|kamera|verkkokamera|вебкамера|веб-камера|камера)\b/],
 ["printer",/\b(printer|tulostin|принтер)\b/],["scanner",/\b(scanner|skanneri|сканер)\b/],
 ["game_controller",/\b(gamepad|controller|peliohjain|геймпад)\b/],
 ["ram",/\b(ram|memory|muisti|оперативка|оперативная память)\b/],
 ["disk",/\b(ssd|hdd|nvme|hard drive|drive|disk|levy|kovalevy|диск|жесткий диск|жёсткий диск)\b/],
 ["gpu",/\b(gpu|graphics card|video card|näyttis|näytönohjain|видеокарта|видюха)\b/],
 ["software",/\b(program|application|app|software|ohjelma|sovellus|программа|приложение)\b/],
 ["windows",/\b(windows|виндовс)\b/],["bluetooth",/\b(bluetooth)\b/],
 ["dock_hub",/\b(dock|docking|usb hub|hub|telakka|док|хаб)\b/],
 ["usb_storage",/\b(flash drive|usb stick|external drive|флешка|muistitikku)\b/]
 ]; for(const [c,re] of tests)if(re.test(t))return c; return null;
}
function strongNewProblem(text,cat){
 if(!cat)return false; const t=norm(text); if(tokenCount(t)<3)return false;
 return /\b(not work|does not work|stopped|stop working|broken|fail|error|not detected|cannot|wont|will not|freeze|crash|no sound|no picture|не работает|перестал|ошибка|не видит|не определяется|завис|вылет|ei toimi|lakkasi|virhe|ei tunnista|jum|kaatu)\b/.test(t);
}
function detectIssue(text,cat){const t=norm(text);if(/\b(not detected|does not detect|cannot find|не видит|не определяется|ei tunnista|ei löydä)\b/.test(t))return"not_detected";if(/\b(disconnect|отключ|yhteys katke)\b/.test(t))return"disconnects";if(/\b(no picture|black screen|no signal|нет изображения|черный экран|чёрный экран|ei kuvaa|musta ruutu)\b/.test(t))return"no_picture";if(/\b(not work|does not work|stopped|не работает|перестал|ei toimi|lakkasi)\b/.test(t))return"not_working";return cat+"_issue";}
function synth(text,lang,cat){return{id:null,ru:text,en:text,fi:text,lang,category:cat,issue:detectIssue(text,cat),confidence:.94,match:"device-guard"};}
function route(text,l){
 const lang=language(text,l); M.state.language=lang; M.push("user",text); const cat=detectCategory(text);
 // New explicit problem about another device overrides the old question.
 if(M.state.lastQuestion&&cat&&M.state.currentCategory&&cat!==M.state.currentCategory&&strongNewProblem(text,cat)){
   M.setQuestion(null,null); return R.first(I.find(text)||synth(text,lang,cat),lang);
 }
 // Otherwise active conversational state has absolute priority. R.follow() now understands all expected types.
 if(M.state.lastQuestion){ const f=R.follow(text,lang); if(f)return f; }
 // Exact/fuzzy training bank.
 const m=I.find(text); if(m && (!cat||m.category===cat)){ return R.first(m,lang); }
 // Explicit category guard.
 if(cat) return R.first(synth(text,lang,cat),lang);
 // Legacy only when there is no active v19 question and no v19 category.
 return legacy(text,lang);
}
window.ANITA_V7.handle=route;
window.ANITA_V19={version:"19.0",route,state:M.state,reset:M.resetConversation,test:(t,l)=>route(t,l),detectCategory,parseReply:R.parseReply};
console.log("[ANITA v19] Universal Context Router loaded");
})();
