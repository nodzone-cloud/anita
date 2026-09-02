/* ANITA v23.0 — DIALOG MEMORY & CLARIFICATION ENGINE
   Keeps recent meaningful turns in page memory and resolves short contextual
   replies such as "what do you mean?", "how?", "repeat", "explain simpler".
*/
(function(){
"use strict";

const state={
  version:"23.0",
  turns:[],
  maxTurns:10,
  lastUser:"",
  lastAssistant:"",
  lastAssistantBeforeProfile:"",
  currentProblem:null,
  pausedProblems:[],
  lastClarification:null
};

function norm(s){
  return String(s||"").toLowerCase().replace(/ё/g,"е")
    .replace(/[“”«»"'`]/g," ").replace(/[?!.,:;()[\]{}]/g," ")
    .replace(/\s+/g," ").trim();
}
function langOf(text, supplied){
  const l=String(supplied||"").toLowerCase();
  if(["ru","en","fi"].includes(l)) return l;
  const raw=String(text||"");
  if(/[а-яё]/i.test(raw)) return"ru";
  if(/[äöå]/i.test(raw)) return"fi";
  return (window.ANITA_MEMORY?.state?.language)||"en";
}
function push(role,text){
  text=String(text||"").trim();
  if(!text)return;
  const last=state.turns[state.turns.length-1];
  if(last&&last.role===role&&last.text===text)return;
  state.turns.push({role,text,at:Date.now()});
  while(state.turns.length>state.maxTurns)state.turns.shift();
  if(role==="user")state.lastUser=text;
  if(role==="assistant")state.lastAssistant=text;
}
function noteAssistant(text,meta){
  push("assistant",text);
  if(meta?.profile!==true) state.lastAssistantBeforeProfile=String(text||"").trim();
}
function noteUser(text){push("user",text)}

function detectClarification(text){
  const t=norm(text);
  const words=t.split(/\s+/).filter(Boolean).length;
  if(words>12)return null;

  if(/^(что ты (имеешь|имела) (?:в виду|ввиду)|что (ты )?(?:имеешь|имела) (?:в виду|ввиду)|что (?:ты )?(?:имел|имела) (?:в виду|ввиду)|что это значит|о чем ты|о чем речь|не понял|не поняла|я не понял|я не поняла|не понимаю|поясни|объясни|объясни пожалуйста|можешь объяснить|что)$/.test(t) ||
     /^(what do you mean|what does that mean|i don t understand|i dont understand|explain|can you explain|what\??)$/.test(t) ||
     /^(mitä tarkoitat|mitä se tarkoittaa|en ymmärrä|selitä|voitko selittää|mitä\??)$/.test(t)) return"clarify";

  if(/^(как|а как|как это|как это сделать|как сделать|how|how do i do that|how do i do it|miten|miten se tehdään)$/.test(t)) return"how";
  if(/^(почему|зачем|а зачем|why|why is that|miksi)$/.test(t)) return"why";
  if(/^(повтори|повтори пожалуйста|еще раз|ещё раз|скажи еще раз|repeat|say that again|again|toista|uudestaan)$/.test(t)) return"repeat";
  if(/^(проще|объясни проще|можно проще|скажи проще|simpler|explain more simply|simple please|selitä yksinkertaisemmin|yksinkertaisemmin)$/.test(t)) return"simplify";
  return null;
}
function L(l,en,ru,fi){return l==="ru"?ru:l==="fi"?fi:en}

function topicExplain(prev,l,kind){
  const p=norm(prev);
  if(/usb[\s-]?(приемник|receiver|vastaanotin)|беспроводн.*usb|wireless.*usb|langaton.*usb/.test(p)){
    return L(l,
      "I mean the small USB receiver/dongle that some wireless mice and keyboards use. It is a small piece plugged into a USB port. Bluetooth devices usually do not need that receiver.",
      "Я имею в виду маленький USB‑приёмник, который используется у некоторых беспроводных мышей и клавиатур. Это небольшая деталь, вставленная в USB‑порт компьютера. Для Bluetooth отдельный USB‑приёмник обычно не нужен.",
      "Tarkoitan pientä USB-vastaanotinta, jota jotkin langattomat hiiret ja näppäimistöt käyttävät. Se on pieni osa USB-portissa. Bluetooth-laite ei yleensä tarvitse erillistä USB-vastaanotinta.");
  }
  if(/друг(ой|ой usb).*порт|another usb port|toiseen usb-port/.test(p)){
    return L(l,
      "I mean unplug the device from its current USB socket and plug it into a different USB socket on the computer. This helps us check whether the problem is the original USB port or the device itself.",
      "Я имею в виду: отключите устройство от текущего USB‑разъёма и подключите его в другой USB‑порт компьютера. Так мы проверим, связана ли проблема с конкретным USB‑портом или с самим устройством.",
      "Irrota laite nykyisestä USB-portista ja liitä se tietokoneen toiseen USB-porttiin. Näin voidaan tarkistaa, liittyykö ongelma alkuperäiseen USB-porttiin vai itse laitteeseen.");
  }
  if(/диспетчер задач|task manager|tehtävienhallinta/.test(p)){
    return L(l,
      "To open Task Manager, press Ctrl + Shift + Esc at the same time. Then look at CPU, Memory and Disk and tell me which one has the highest percentage.",
      "Чтобы открыть Диспетчер задач, одновременно нажмите Ctrl + Shift + Esc. Затем посмотрите показатели CPU, Память и Диск и напишите, у какого из них самый высокий процент.",
      "Avaa Tehtävienhallinta painamalla Ctrl + Shift + Esc samaan aikaan. Katso sitten CPU-, Muisti- ja Levy-arvoja ja kerro, mikä prosentti on suurin.");
  }
  if(/диспетчер устройств|device manager|laitehallinta/.test(p)){
    return L(l,
      "Open Start and type Device Manager, then open the result named Device Manager. It shows the hardware Windows currently detects.",
      "Откройте меню «Пуск», напишите «Диспетчер устройств» и откройте найденный пункт. Там Windows показывает оборудование, которое она сейчас определяет.",
      "Avaa Käynnistä-valikko, kirjoita Laitehallinta ja avaa Laitehallinta. Siellä Windows näyttää tunnistamansa laitteiston.");
  }
  if(/во вс.*windows|everywhere in windows|koko windowsissa|игре\/программ|game\/program|pelissä\/ohjelmassa/.test(p)){
    return L(l,
      "I am trying to find out the scope of the problem: whether the device fails everywhere in Windows, or only inside one specific game or program. This tells us whether to investigate the device/Windows or the individual app.",
      "Я уточняю область проблемы: устройство не работает вообще в Windows или только в одной конкретной игре/программе. Это помогает понять, искать причину в устройстве/Windows или в самой программе.",
      "Selvitän ongelman laajuutta: toimiiko laite muualla Windowsissa vai onko ongelma vain yhdessä pelissä tai ohjelmassa. Se auttaa erottamaan laite-/Windows-ongelman ohjelmakohtaisesta ongelmasta.");
  }
  if(/перезагруз|restart|reboot|käynnistä uudelleen/.test(p)){
    return L(l,
      "By restart I mean use Windows Start → Power → Restart, if the computer still responds. After it starts again, tell me whether the problem changed.",
      "Под перезагрузкой я имею в виду: если компьютер отвечает, откройте «Пуск» → «Питание» → «Перезагрузка». После запуска Windows сообщите, изменилась ли проблема.",
      "Uudelleenkäynnistyksellä tarkoitan: jos tietokone reagoi, valitse Käynnistä → Virta → Käynnistä uudelleen. Kerro Windowsin käynnistyttyä, muuttuiko ongelma.");
  }

  if(kind==="repeat"){
    return L(l,"Of course. My previous message was:\n\n"+prev,
      "Конечно. Моё предыдущее сообщение:\n\n"+prev,
      "Totta kai. Edellinen viestini oli:\n\n"+prev);
  }
  if(kind==="why"){
    return L(l,
      "This step is meant to narrow down the cause without guessing. My previous step was:\n\n"+prev+"\n\nThe result helps me decide what to check next.",
      "Этот шаг нужен, чтобы сузить круг возможных причин, а не гадать. Мой предыдущий шаг был:\n\n"+prev+"\n\nПо результату я смогу выбрать следующую проверку.",
      "Tämän vaiheen tarkoitus on rajata mahdollista syytä ilman arvailua. Edellinen vaihe oli:\n\n"+prev+"\n\nTuloksen perusteella voin valita seuraavan tarkistuksen.");
  }
  if(kind==="simplify"||kind==="how"||kind==="clarify"){
    return L(l,
      "Let me put it more simply. I am referring to my previous step:\n\n"+prev+"\n\nDo that one step and tell me what happens. If one particular word or place is unclear, tell me which one and I will explain it.",
      "Скажу проще. Я говорю о предыдущем шаге:\n\n"+prev+"\n\nВыполните только этот один шаг и напишите, что получилось. Если непонятно конкретное слово или место, напишите какое — я объясню.",
      "Sanon tämän yksinkertaisemmin. Tarkoitan edellistä vaihetta:\n\n"+prev+"\n\nTee vain tämä yksi vaihe ja kerro, mitä tapahtui. Jos jokin sana tai kohta on epäselvä, kerro mikä, niin selitän sen.");
  }
  return null;
}

function hasConcreteNewProblem(text){
  const t=norm(text);
  const device=/\b(mouse|keyboard|monitor|screen|printer|computer|pc|мыш|клавиатур|монитор|экран|принтер|комп|пк|hiiri|näppäimist|näyttö|tietokone)\b/.test(t);
  const symptom=/\b(not work|stopped|turned off|freeze|error|не работ|перестал|выключ|завис|ошиб|ei toimi|lakkasi|sammui|jum)\b/.test(t);
  return device&&symptom;
}

if(!window.ANITA_V7||typeof window.ANITA_V7.handle!=="function"){
  console.error("[ANITA v23.0] Dialog Memory: router missing");
  return;
}
const previous=window.ANITA_V7.handle.bind(window.ANITA_V7);

window.ANITA_V7.handle=function(text,l){
  const language=langOf(text,l);
  const ci=detectClarification(text);

  if(ci && state.lastAssistant){
    noteUser(text);
    const answer=topicExplain(state.lastAssistant,language,ci);
    state.lastClarification={intent:ci,about:state.lastAssistant,at:Date.now()};
    noteAssistant(answer);
    return {type:"answer",text:answer,handled:true,dialogMemory:true,clarification:ci};
  }

  if(hasConcreteNewProblem(text)){
    if(state.currentProblem && state.currentProblem!==String(text||"").trim()){
      state.pausedProblems.push(state.currentProblem);
      if(state.pausedProblems.length>3)state.pausedProblems.shift();
    }
    state.currentProblem=String(text||"").trim();
  }

  noteUser(text);
  const result=previous(text,language);
  if(result&&typeof result.text==="string") noteAssistant(result.text);
  return result;
};

const chat=document.getElementById("chat");
if(chat){
  new MutationObserver(function(records){
    records.forEach(function(r){
      r.addedNodes.forEach(function(n){
        if(n.nodeType!==1)return;
        const el=n.matches?.(".msg")?n:n.querySelector?.(".msg");
        if(!el)return;
        const tx=(el.textContent||"").trim();
        if(!tx)return;
        if(el.classList.contains("user"))push("user",tx);
        else if(el.classList.contains("bot"))push("assistant",tx);
      });
    });
  }).observe(chat,{childList:true,subtree:true});
}

window.ANITA_DIALOG_MEMORY={
  version:"23.0",state,push,noteUser,noteAssistant,detectClarification,
  explain:topicExplain,
  getRecent:function(){return state.turns.slice();},
  getLastProblem:function(){return state.currentProblem;},
  getLastAssistant:function(){return state.lastAssistant;},
  reset:function(){state.turns=[];state.lastUser="";state.lastAssistant="";state.currentProblem=null;state.pausedProblems=[];state.lastClarification=null;}
};
console.log("[ANITA v23.0] Dialog Memory & Clarification Engine loaded");
})();