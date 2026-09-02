/* ANITA v18.2 - Context Priority Router
   Main fix:
   A short answer to ANITA's last question has priority over global keyword routing.
   Example:
     ANITA: Is the mouse USB, Bluetooth, or wireless?
     USER: usb
   "usb" MUST mean "USB mouse", not a new USB-storage problem.
*/
(function(){
"use strict";

if(!window.ANITA_MEMORY || !window.ANITA_INTENTS || !window.ANITA_RESPONSES){
  console.error("[ANITA v18.2] Missing memory/intents/responses module");
  return;
}
if(!window.ANITA_V7 || typeof window.ANITA_V7.handle!=="function"){
  console.error("[ANITA v18.2] Legacy ANITA_V7 not found");
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

function tokenCount(text){
  return I.normalize(text).split(/\s+/).filter(Boolean).length;
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
  for(const [category,re] of tests) if(re.test(t)) return category;
  return null;
}

function expectedAnswerMatches(text, expected, lastQuestion){
  const t=I.normalize(text);

  // Clarification requests always refer to the active conversation.
  if(/^(what|what do you mean|huh|sorry what|что|в смысле|не понял|не поняла|mitä|mitä tarkoitat)$/.test(t))
    return true;

  if(expected==="connection_type" || lastQuestion==="mouse_connection_type"){
    return /^(usb|wired|wired usb|cable|bluetooth|bt|wireless|wireless usb|usb receiver|receiver|dongle|проводная|проводная usb|блютуз|bluetooth мышь|беспроводная|с приемником|с приёмником|ресивер|langallinen|langallinen usb|bluetooth hiiri|langaton|vastaanotin|langaton usb)$/.test(t);
  }

  if(expected==="yes_no"){
    return /^(yes|yeah|yep|no|nope|да|ага|нет|kyllä|joo|ei)$/.test(t);
  }

  if(expected==="scope"){
    return /^(only there|there only|only in the game|only in game|only in the app|everywhere|all the time|outside too|только там|только в игре|везде|и вне игры|vain siellä|vain pelissä|kaikkialla|muuallakin)$/.test(t);
  }

  // Most very short answers are likely contextual when ANITA explicitly asked for one.
  return tokenCount(t)<=4;
}

function detectIssue(text,category){
  const t=I.normalize(text);
  if(/\b(stop|stopped|stops|quit|died|dead|not work|not working|does not work|do not work|cannot use|not respond|stuck|frozen|freeze)\b/.test(t) ||
     /\b(не работает|перестал работать|перестала работать|перестало работать|не реагирует|завис|умерла|умер)\b/.test(t) ||
     /\b(ei toimi|lakkasi toimimasta|ei reagoi|jumissa|hyytyi)\b/.test(t)) return "not_working";
  if(/\b(not detect|does not detect|not detected|not recognize|cannot find)\b/.test(t) ||
     /\b(не видит|не определяется|не распознает|не распознаёт|не находит)\b/.test(t) ||
     /\b(ei tunnista|ei löydä)\b/.test(t)) return "not_detected";
  if(/\b(disconnect|loses connection|lost connection)\b/.test(t) ||
     /\b(отключается|теряет соединение|пропадает)\b/.test(t) ||
     /\b(yhteys katkeaa|yhteys katoaa)\b/.test(t)) return "disconnects";
  return category+"_issue";
}

function syntheticMatch(text,lang,category){
  return {
    id:null, ru:String(text||""), en:String(text||""), fi:String(text||""),
    lang, category, issue:detectIssue(text,category),
    confidence:0.95, match:"device-guard"
  };
}

function route(text,l){
  const lang=language(text,l);
  M.state.language=lang;
  M.push("user",text);

  // 1) HIGHEST PRIORITY: answer to ANITA's own active question.
  // This happens BEFORE device/category detection, because words like "usb"
  // can be both an answer and a global topic.
  if(M.state.lastQuestion && expectedAnswerMatches(text,M.state.expected,M.state.lastQuestion)){
    const f=R.follow(text,lang);
    if(f){
      if(f.text) M.push("assistant",f.text,{source:"v18.2-context"});
      return f;
    }

    // If ANITA expected a short answer but has no handler for it, do NOT let
    // legacy code reinterpret it using stale context.
    if(tokenCount(text)<=4){
      const q=M.state.lastQuestion;
      return {type:"answer",text:lang==="ru"
        ?"Я поняла ответ, но для этого шага мне нужно уточнить немного больше. Можешь ответить чуть подробнее?"
        :lang==="fi"
        ?"Ymmärsin vastauksen, mutta tarvitsen tähän vaiheeseen hieman enemmän tietoa. Voitko vastata vähän tarkemmin?"
        :"I understood the reply, but I need a little more detail for this step. Can you answer a bit more specifically?"};
    }
  }

  const category=detectCategory(text);

  // 2) Full/clear new problem: trained intent bank.
  const match=I.find(text);
  if(match && (!category || match.category===category)){
    // Switching to a new issue clears transient conversational question state.
    if(M.state.currentCategory && match.category!==M.state.currentCategory){
      M.setQuestion(null,null);
    }
    M.state.lastMatch=match;
    return R.first(match,lang);
  }

  // 3) Hard device guard for clear new device statements.
  if(category){
    if(M.state.currentCategory && category!==M.state.currentCategory){
      M.setQuestion(null,null);
    }
    return R.first(syntheticMatch(text,lang,category),lang);
  }

  // 4) Any remaining active-context reply gets one more chance.
  if(M.state.lastQuestion){
    const f=R.follow(text,lang);
    if(f){
      if(f.text) M.push("assistant",f.text,{source:"v18.2-context-late"});
      return f;
    }
  }

  // 5) Legacy fallback only when v18.2 has no active conversational question.
  // This prevents stale old monitor/boot context from hijacking "no", "yes", etc.
  if(!M.state.lastQuestion){
    const old=legacy(text,lang);
    if(old && old.text) M.push("assistant",old.text,{source:"legacy-fallback"});
    return old;
  }

  return {type:"answer",text:lang==="ru"
    ?"Я всё ещё держу в памяти текущую проблему. Ответь на мой последний вопрос чуть подробнее, чтобы я не переключилась на другую тему."
    :lang==="fi"
    ?"Pidän nykyisen ongelman edelleen muistissa. Vastaa viimeiseen kysymykseeni hieman tarkemmin, jotta en vaihda väärään aiheeseen."
    :"I'm still keeping the current problem in context. Please answer my last question a little more fully so I don't switch to the wrong topic."};
}

window.ANITA_V7.handle=route;
window.ANITA_V18={
  version:"18.2",
  route,
  state:M.state,
  reset:M.resetConversation,
  test(text,l){return route(text,l);},
  detectCategory
};

console.log("[ANITA v18.2] Context Priority Router loaded");
})();