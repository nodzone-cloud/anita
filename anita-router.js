/* ANITA v25.0 - Language-Locked Universal Context Router
   Rule: active question -> interpret reply -> continue SAME issue before global re-routing.
   A new full problem can still override old context when it clearly names another device/category.
*/
(function(){
"use strict";
if(!window.ANITA_MEMORY||!window.ANITA_INTENTS||!window.ANITA_RESPONSES){console.error("[ANITA v25.0] Missing module");return;}
if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function"){console.error("[ANITA v25.0] Legacy ANITA_V7 missing");return;}
const legacy=window.ANITA_V7.handle.bind(window.ANITA_V7), M=window.ANITA_MEMORY, I=window.ANITA_INTENTS, R=window.ANITA_RESPONSES;
const K=window.ANITA_SUPPORT_KNOWLEDGE, D=window.ANITA_DIAGNOSTICS, C=window.ANITA_CONTEXT, E=window.ANITA_ENTITIES, LP=window.ANITA_LANGUAGE_PARSER, MK=window.ANITA_MALWARE_KNOWLEDGE;
const SEMA=window.ANITA_SEMANTIC;
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
function powerOffIntent(text,l){
 const t=String(text||"").toLowerCase().replace(/ё/g,"е");
 const hit=/(?:\b(?:computer|pc)\b.{0,30}\b(?:turned|shut|powered)\s+off\b)|(?:\b(?:компьютер|комп|пк)\b.{0,30}(?:выключил|отключил|вырубил|погас))|(?:\btietokone\b.{0,30}(?:sammui|meni pois päältä))/i.test(t);
 if(!hit)return null;
 try{M.setQuestion&&M.setQuestion("power_off_state","powerstate")}catch(_){}
 M.state.currentCategory="windows";
 return {text:l==="ru"
   ?"Поняла — компьютер внезапно выключился. Уточню, что произошло дальше: он включился снова сам, остаётся выключенным или выключается так повторно?"
   :l==="fi"
   ?"Ymmärsin — tietokone sammui yllättäen. Mitä tapahtui sen jälkeen: käynnistyikö se uudelleen itsestään, pysyykö se sammuksissa vai sammuuko se toistuvasti?"
   :"Got it — the computer suddenly shut down. What happened next: did it turn back on by itself, does it stay powered off, or does it keep shutting down?",
   handled:true,done:false,powerOff:true};
}
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
 const lang=language(text,l); M.state.language=lang; M.push("user",text);

 const power=powerOffIntent(text,lang); if(power){M.push("bot",power.text);return power;}

 if(E && E.update) E.update(text,lang);
 if(window.ANITA_PC_PROFILE && window.ANITA_PC_PROFILE.applyToIncident) window.ANITA_PC_PROFILE.applyToIncident();
 if(E && E.shouldHandle && E.shouldHandle()){
   const eq=E.nextQuestion(lang);
   if(eq){
     M.push("bot",eq);
     return {text:eq,handled:true,done:false,multiEntity:true,incident:E.snapshot?E.snapshot():null};
   }
 }

 // v26.1.4 — ANITA product/self conversation has priority over accidental IT keyword matches.
 const PC=window.ANITA_PRODUCT_CONVERSATION;
 if(PC){
   let lastBot="";
   try{
     const hist=(M && typeof M.get==="function")?M.get():[];
     if(Array.isArray(hist)){ const b=[...hist].reverse().find(x=>x && (x.role==="bot"||x.role==="assistant")); lastBot=b?.text||""; }
   }catch(e){}
   const pr=(typeof PC.direct==="function" && PC.direct(text,lang)) ||
            (typeof PC.follow==="function" && PC.follow(text,lang,lastBot));
   if(pr && pr.text){
     if(M && M.push) M.push("bot",pr.text);
     return {text:pr.text,handled:true,done:false,productConversation:true,topic:pr.topic};
   }
 }

 // v26.1.3 — spontaneous voice/self-correction analysis.
 const VN=window.ANITA_VOICE_NATURAL;
 const voiceAnalysis=(VN && typeof VN.analyze==="function") ? VN.analyze(text,lang) : null;

 // Keep the complete utterance, but if the speaker explicitly corrected themselves,
 // feed the corrected/later clause once more so newer evidence can override vague older evidence.
 if(C && C.update) C.update(text,lang);
 if(voiceAnalysis && voiceAnalysis.hasCorrection && voiceAnalysis.preferredText &&
    voiceAnalysis.preferredText!==String(text||"")){
   C.update(voiceAnalysis.preferredText,lang);
 }

 // v26.1.2: resolve finite context-menu replies (1..7 / first / вариант 1)
 // before the generic "repeat the pending question" branch can steal them.
 if(C && typeof C.consumePending==="function"){
   const consumed=C.consumePending(text,lang);
   if(consumed){
     const cq=C.nextQuestion(lang);
     if(cq){
       M.push("bot",cq);
       return {text:cq,handled:true,done:false,contextChoice:consumed.choice};
     }
   }
 }

 // If the current message itself supplied a new concrete browser/window symptom,
 // acknowledge and follow that new evidence instead of replaying an older vague PC question.
 if(C && C.state && C.state.lastUserText===String(text||"") &&
    C.state.device==="browser" && C.state.symptom==="browser_window_switch"){
   const cq=C.nextQuestion(lang);
   if(cq){
     M.push("bot",cq);
     return {text:cq,handled:true,done:false,contextAdvance:true};
   }
 }

 const shortContextReply = String(text||"").trim().split(/\s+/).length <= 7;
 const hasActiveContextQuestion = !!(
   C && C.state && C.state.active && C.state.lastQuestion
 );
 if(hasActiveContextQuestion && shortContextReply){
   const cq=C.nextQuestion(lang);
   if(cq){
     M.push("bot",cq);
     return {text:cq,handled:true,done:false};
   }
 }
 const cat=detectCategory(text);

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

 // v25: explicit "one process/app uses a lot of CPU" is diagnostic evidence, not a generic CPU definition.
 const highCpuProcess=/\b(?:one|1|a)\s+(?:programm?|process|app|application)\b.{0,45}\b(?:uses?|using|takes?|taking|eats?|eating)\b.{0,20}\b(?:a\s+lot|alot|lots?|much|high)\b.{0,12}\bcpu\b|\b(?:одна|1)\s+(?:программ|процесс|приложен)\w*.{0,45}\b(?:грузит|использует|жр[её]т)\w*.{0,20}\bcpu\b|\byksi\s+(?:ohjelma|prosessi)\b.{0,45}\b(?:käyttää)\b.{0,20}\b(?:paljon|korkea)\b.{0,12}\bcpu\b/i.test(String(text||""));
 if(highCpuProcess){
   M.setIssue("windows","high_cpu_process","computer");
   return R.first({id:null,category:"windows",issue:"high_cpu_process",confidence:.99,match:"v25-high-cpu-evidence"},lang);
 }

 // v25: semantic performance must outrank startup-word collisions such as "Windows started to work slow".
 const semanticEarly=LP&&LP.performance?LP.performance(text):null;
 if(semanticEarly&&semanticEarly.matched&&semanticEarly.confidence>=0.82){
   M.setIssue("windows","poor_system_performance","computer");
   M.fact("performanceTemporal",semanticEarly.temporal||"current");
   M.fact("performanceOriginal",String(text||""));
   return R.first({id:null,category:"windows",issue:"poor_system_performance",confidence:semanticEarly.confidence,match:"v25-semantic-performance"},lang);
 }

 // Strong antivirus/security alert + a known threat name is evidence; a bare name is not.
 const malwareHit=MK&&MK.assess?MK.assess(text):null;
 if(malwareHit&&malwareHit.status==="strong_security_evidence"){
   M.setIssue("windows","security_threat","computer");
   M.fact("securityThreatName",malwareHit.entry.name);
   M.setQuestion("security_scan_threat","yes_no");
   const typ=MK.typeLabel?MK.typeLabel(malwareHit.entry.type,lang):malwareHit.entry.type;
   const msg=lang==="ru"
     ?`Windows Security/антивирус сообщает об угрозе «${malwareHit.entry.name}» (${typ}). Это намного сильнее, чем просто совпадение имени процесса. Выполни предложенное антивирусом действие — карантин/удаление. Если он попросит перезагрузку, сначала запиши название угрозы: текущий разговор ANITA после перезапуска может потеряться. Антивирус действительно пометил её как угрозу?`
     :lang==="fi"
     ?`Windows Security/virustorjunta ilmoittaa uhasta "${malwareHit.entry.name}" (${typ}). Tämä on paljon vahvempaa näyttöä kuin pelkkä prosessinimen osuma. Noudata karanteeni-/poistosuositusta. Jos uudelleenkäynnistys vaaditaan, kirjoita uhkan nimi muistiin, koska nykyinen ANITA-keskustelu voi kadota. Merkitsikö virustorjunta sen todella uhaksi?`
     :`Windows Security/antivirus is reporting "${malwareHit.entry.name}" (${typ}) as a threat. That is much stronger evidence than a process-name match alone. Follow its quarantine/remove action. If it asks for a restart, note the threat name first because the current ANITA conversation may be lost after reboot. Did the antivirus actually flag it as a threat?`;
   M.push("bot",msg); return {text:msg,handled:true,done:false,malwareCandidate:true};
 }

 // ANITA v26.1: semantic JSON layer. It only routes when confidence is high enough; otherwise legacy logic stays in control.
 const sem=SEMA&&SEMA.analyze?SEMA.analyze(text,{lang,pendingQuestion:M.state.lastQuestion}):null;
 if(sem&&sem.kind==="intent"&&sem.confidence>=0.82){
   M.fact&&M.fact("semanticIntent",sem.intentId);
   M.fact&&M.fact("semanticConfidence",sem.confidence);
   M.fact&&M.fact("semanticNormalized",sem.normalized);

   // Prefer the existing 400-case diagnostic engine when the JSON supplies a canonical problem sentence.
   if(sem.canonicalQuery&&K&&K.find&&D){
     const q=sem.canonicalQuery[lang]||sem.canonicalQuery.en;
     const sk=q?K.find(q):null;
     if(sk&&sk.case)return D.start(sk,lang);
   }

   // Otherwise translate the semantic intent into the same category/issue contract already used by ANITA_RESPONSES.
   if(sem.target&&sem.target.category&&sem.target.issue){
     M.setIssue&&M.setIssue(sem.target.category,sem.target.issue,sem.target.device||null);
     return R.first({id:null,category:sem.target.category,issue:sem.target.issue,confidence:sem.confidence,match:"v26.1-semantic-json",semanticIntent:sem.intentId},lang);
   }
 }

 // ANITA v20: 400 user-provided problems have priority over the older 200-example bank.
 const km=K && K.find ? K.find(text) : null;
 if(km && km.case && D){ return D.start(km,lang); }

 // Exact/fuzzy older training bank.
 const m=I.find(text); if(m && (!cat||m.category===cat)){ return R.first(m,lang); }
 // Explicit category guard.
 if(cat) return R.first(synth(text,lang,cat),lang);
 // Legacy only when there is no active v19 question and no v19 category.
 if(C && C.shouldHandle && C.shouldHandle()){
   const cq=C.nextQuestion(lang);
   if(cq){
     M.push("bot",cq);
     return {text:cq,handled:true,done:false};
   }
 }
 return legacy(text,lang);
}
window.ANITA_V7.handle=route;
window.ANITA_V19={version:"26.1.4",route,state:M.state,reset:M.resetConversation,test:(t,l)=>route(t,l),detectCategory,parseReply:R.parseReply};
console.log("[ANITA v26.1.4] Semantic-aware Universal Context Router loaded");
})();
