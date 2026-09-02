/* ANITA v20.0 - Language-Locked Universal Context Router
   Rule: active question -> interpret reply -> continue SAME issue before global re-routing.
   A new full problem can still override old context when it clearly names another device/category.
*/
(function(){
"use strict";
if(!window.ANITA_MEMORY||!window.ANITA_INTENTS||!window.ANITA_RESPONSES){console.error("[ANITA v20.0] Missing module");return;}
if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function"){console.error("[ANITA v20.0] Legacy ANITA_V7 missing");return;}
const legacy=window.ANITA_V7.handle.bind(window.ANITA_V7), M=window.ANITA_MEMORY, I=window.ANITA_INTENTS, R=window.ANITA_RESPONSES;
const K=window.ANITA_SUPPORT_KNOWLEDGE, D=window.ANITA_DIAGNOSTICS;
function explicitTextLanguage(text){
 const s=String(text||"").trim();
 if(/[а-яё]/i.test(s)) return "ru";
 if(/[äöå]/i.test(s)) return "fi";

 const n=" "+I.normalize(s)+" ";
 const fiWords=["miksi","miten","tietokone","näyttö","ongelma","kaikkialla","langaton","vastaanotin","toimi","toimii","vain","ei"];
 const enWords=["why","how","computer","monitor","problem","everywhere","wireless","receiver","working","only","yes","no"];

 let fi=0,en=0;
 fiWords.forEach(w=>{if(n.includes(" "+w+" "))fi++;});
 enWords.forEach(w=>{if(n.includes(" "+w+" "))en++;});

 if(fi>=2 && fi>en) return "fi";
 if(en>=2 && en>fi) return "en";
 return null;
}

function activeManualLanguage(){
 try{
   const active=document.querySelector("#anitaDemoRoot .langBtn.active");
   const x=String(active?.dataset?.lang||"").toLowerCase();
   if(["ru","en","fi"].includes(x)) return x;
 }catch(_){}
 return null;
}

function language(text,l){
 const manual=activeManualLanguage();
 if(manual) return manual;

 const supplied=String(l||"").toLowerCase();
 const explicit=explicitTextLanguage(text);

 // While ANITA is waiting for an answer, keep the conversation language
 // unless the user clearly writes a full reply in another language.
 // This prevents: English conversation -> "USB receiver" -> Finnish.
 if(M.state.lastQuestion && M.state.language){
   const words=I.normalize(text).split(/\s+/).filter(Boolean).length;
   if(!explicit || words<=3) return M.state.language;
   return explicit;
 }

 if(explicit) return explicit;
 if(["ru","en","fi"].includes(supplied)) return supplied;
 return M.state.language || "en";
}
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

 // ANITA v20: if a 400-case diagnostic conversation is active, interpret the user's
 // result as evidence before any global intent matcher can steal the message.
 if(D && D.state && D.state.active){
   // A clearly new full problem can still interrupt the old diagnostic path.
   const kmNew=K && K.find ? K.find(text) : null;
   if(!(kmNew && tokenCount(text)>=4 && kmNew.confidence>=0.78 && kmNew.case.id!==D.state.caseId)){
     const df=D.follow(text,lang); if(df)return df;
   } else {
     D.reset();
   }
 }

 // New explicit problem about another device overrides the old question.
 if(M.state.lastQuestion&&cat&&M.state.currentCategory&&cat!==M.state.currentCategory&&strongNewProblem(text,cat)){
   M.setQuestion(null,null); return R.first(I.find(text)||synth(text,lang,cat),lang);
 }
 // Otherwise active conversational state has absolute priority. R.follow() now understands all expected types.
 if(M.state.lastQuestion){ const f=R.follow(text,lang); if(f)return f; }
 // ANITA v20: 400 user-provided problems have priority over the older 200-example bank.
 const km=K && K.find ? K.find(text) : null;
 if(km && km.case && D){ return D.start(km,lang); }

 // Exact/fuzzy older training bank.
 const m=I.find(text); if(m && (!cat||m.category===cat)){ return R.first(m,lang); }
 // Explicit category guard.
 if(cat) return R.first(synth(text,lang,cat),lang);
 // Legacy only when there is no active v19 question and no v19 category.
 return legacy(text,lang);
}
window.ANITA_V7.handle=route;
window.ANITA_V19={version:"19.2",route,state:M.state,reset:M.resetConversation,test:(t,l)=>route(t,l),detectCategory,parseReply:R.parseReply};
console.log("[ANITA v20.0] Language-Locked Universal Context Router loaded");
})();
