/* ============================================================
   ANITA v21.0 — MULTI-ENTITY INCIDENT ENGINE
   ENTITY LIST → RELATIONS → INCIDENT → SHARED CAUSE → NEXT ACTION
   ============================================================ */
(function(){
"use strict";

const state = {
  version:"21.0",
  active:false,
  multiActive:false,
  language:"en",
  entities:[],
  nextEntityId:1,
  group:null,
  context:null,
  timing:null,
  scope:null,
  symptom:null,
  sharedCausePossible:false,
  pendingEntityId:null,
  lastQuestion:null,
  evidence:[],
  systemResponsive:null,
  lastUserText:null
};

function norm(s){
  return String(s||"").toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/ё/g,"е")
    .replace(/[.,!?;:()[\]{}"«»]/g," ")
    .replace(/\s+/g," ").trim();
}
function L(lang,en,ru,fi){ return lang==="ru"?ru:lang==="fi"?fi:en; }

const DEVICE_DEFS = [
  {type:"mouse", names:{en:"mouse",ru:"мышь",fi:"hiiri"},
    re:/\bmouse\b|\bmice\b|мыш(?:ь|ка|ку|ки|ью|и)|hiir(?:i|en|tä|ellä|et)/gi},
  {type:"keyboard", names:{en:"keyboard",ru:"клавиатура",fi:"näppäimistö"},
    re:/\bkeyboard\b|\bkeyboards\b|клавиатур\w*|\bклава\b|näppäimist\w*|\bnäppis\b/gi},
  {type:"monitor", names:{en:"monitor",ru:"монитор",fi:"näyttö"},
    re:/\bmonitor\b|\bdisplay\b|\bscreen\b|монитор\w*|экран\w*|näyt(?:tö|ön|öt|öllä)/gi},
  {type:"headphones", names:{en:"headphones",ru:"наушники",fi:"kuulokkeet"},
    re:/\bheadphones?\b|\bheadset\b|наушник\w*|гарнитур\w*|kuulok\w*/gi},
  {type:"speakers", names:{en:"speakers",ru:"колонки",fi:"kaiuttimet"},
    re:/\bspeakers?\b|колонк\w*|динамик\w*|kaiutt\w*/gi},
  {type:"microphone", names:{en:"microphone",ru:"микрофон",fi:"mikrofoni"},
    re:/\bmicrophone\b|\bmic\b|микрофон\w*|mikrofon\w*/gi},
  {type:"webcam", names:{en:"webcam",ru:"веб-камера",fi:"webkamera"},
    re:/\bwebcam\b|\bweb camera\b|веб[\s-]?камер\w*|webkamer\w*/gi},
  {type:"printer", names:{en:"printer",ru:"принтер",fi:"tulostin"},
    re:/\bprinter\b|принтер\w*|tulost\w*/gi},
  {type:"scanner", names:{en:"scanner",ru:"сканер",fi:"skanneri"},
    re:/\bscanner\b|сканер\w*|skanner\w*/gi},
  {type:"game_controller", names:{en:"game controller",ru:"геймпад",fi:"peliohjain"},
    re:/\bgamepad\b|\bcontroller\b|геймпад\w*|джойстик\w*|peliohjain\w*/gi},
  {type:"projector", names:{en:"projector",ru:"проектор",fi:"projektori"},
    re:/\bprojector\b|проектор\w*|projektor\w*/gi},
  {type:"usb_storage", names:{en:"USB storage",ru:"USB-накопитель",fi:"USB-muisti"},
    re:/\bflash drive\b|\busb stick\b|флешк\w*|muistitik\w*/gi},
  {type:"disk", names:{en:"drive",ru:"диск",fi:"levy"},
    re:/\bssd\b|\bhdd\b|\bnvme\b|\bhard drive\b|ж[её]стк\w*\s+диск\w*|накопител\w*|kovalev\w*/gi},
  {type:"dock_hub", names:{en:"dock/USB hub",ru:"док-станция/USB-хаб",fi:"telakka/USB-hubi"},
    re:/\busb hub\b|\bdock\b|\bdocking station\b|usb[\s-]?хаб\w*|док[\s-]?станц\w*|telakk\w*|usb[\s-]?hub\w*/gi}
];

function deviceName(type,lang){
  const d=DEVICE_DEFS.find(x=>x.type===type);
  return d ? (d.names[lang]||d.names.en) : L(lang,"device","устройство","laite");
}

function detectAllDevices(raw){
  const s=String(raw||"");
  const hits=[];
  for(const def of DEVICE_DEFS){
    def.re.lastIndex=0;
    let m;
    while((m=def.re.exec(s))!==null){
      hits.push({type:def.type,index:m.index,text:m[0]});
      if(m.index===def.re.lastIndex) def.re.lastIndex++;
    }
  }
  hits.sort((a,b)=>a.index-b.index);
  const out=[];
  for(const h of hits){
    if(!out.some(x=>x.type===h.type && Math.abs(x.index-h.index)<8)) out.push(h);
  }
  return out;
}

function detectConnection(t){
  if(/\bbluetooth\b|блютуз|bluetoothilla/i.test(t)) return "bluetooth";
  if(/\b(receiver|dongle|usb receiver|usb dongle)\b|при[её]мник|ресивер|usb\s*(штук|свисток)|vastaanotin/i.test(t)) return "usb_receiver";
  if(/\b(wired|cable|wired usb)\b|проводн\w*|кабел\w*|johdoll\w*|kaapel\w*/i.test(t)) return "wired_usb";
  if(/\bwireless\b|беспроводн\w*|langaton|langattom/i.test(t)) return "wireless_unknown";
  return null;
}

function detectSymptom(t){
  if(/\b(stopped|stop|stops|quit|ceased)\b.*\b(work|working|respond)|\bnot working\b|\bdoes not work\b|\bdoesn't work\b|\bdead\b|перестал\w*\s+работ|перестали\s+работ|не работ\w*|не реагир\w*|умер\w*|lakkasi\w*\s+toimi|lakkasivat\s+toimimasta|ei toimi|eivät toimi/i.test(t))
    return "not_working";
  if(/\bdisconnect\w*|отключа\w*|отвал\w*|пропада\w*|katke\w*/i.test(t)) return "disconnecting";
  if(/\bslow|lag|laggy|sluggish|тормоз\w*|лага\w*|медлен\w*|hidas|lagaa/i.test(t)) return "slow";
  if(/\bnot detected\b|\bnot recognized\b|не видит|не определя\w*|ei tunnista/i.test(t)) return "not_detected";
  return null;
}

function detectContext(t){
  if(/\b(during|while|in the middle of)\b.*\b(game|gaming|playing)\b|во время игр\w*|во время игры|в игре|играл\w*|pelin aikana|pelatessa/i.test(t)) return "during_game";
  if(/\bafter\b.*\b(update|windows update)\b|после обновлен\w*|päivityksen jälkeen/i.test(t)) return "after_update";
  if(/\bafter\b.*\b(restart|reboot)\b|после перезагруз\w*|uudelleenkäynnistyksen jälkeen/i.test(t)) return "after_restart";
  return null;
}

function detectScope(t){
  if(/\b(everywhere|anywhere|nowhere|whole system|all apps)\b|нигде|везде|во всей системе|вообще нигде|kaikkialla|ei missään|koko järjestelmä/i.test(t)) return "system_wide";
  if(/\b(outside the game|outside game|in windows|desktop)\b.*\b(work|works|working)\b|вне игры работ\w*|в windows работ\w*|на рабочем столе работ\w*|toimii pelin ulkopuolella|toimii windowsissa/i.test(t)) return "app_only";
  if(/\b(only|just)\b.*\b(game|app|program)\b|только в игре|только в программ\w*|vain pelissä|vain ohjelmassa/i.test(t)) return "app_only";
  return null;
}

function detectGroup(t){
  if(/\b(all|every)\b.*\busb\b|все\s+usb|всё\s+usb|все\s+юсб|kaikki\s+usb/i.test(t)) return "usb_devices";
  if(/\b(all|every)\b.*\bbluetooth\b|все\s+bluetooth|все\s+блютуз|kaikki\s+bluetooth/i.test(t)) return "bluetooth_devices";
  if(/\b(all|every)\b.*\b(device|peripheral|accessor)\w*|все\s+(устройства|девайсы|аксессуары|перифер\w*)|kaikki\s+(laitteet|oheislaitteet)/i.test(t)) return "connected_devices";
  return null;
}

function simultaneousCue(t,count){
  if(count>=2 && (/\b(and|both|together|simultaneously|same time|plus)\b|\+|(?:^|\s)и(?:\s|$)|одновременно|вместе|оба|обе|также|sekä|ja|molemmat|yhdessä|samaan aikaan/i.test(t))) return true;
  return count>=2;
}
function additiveCue(t){
  return /\b(also|too|plus|another)\b|тоже|ещ[её]|также|плюс|myös|lisäksi/i.test(t);
}
function findEntityByType(type){ return state.entities.find(e=>e.type===type)||null; }
function addEntity(type){
  let e=findEntityByType(type);
  if(e) return e;
  e={id:state.nextEntityId++,type,connection:null,symptom:null,evidence:[]};
  state.entities.push(e);
  return e;
}
function localConnection(raw,hit){
  const s=String(raw||"");
  return detectConnection(norm(s.slice(Math.max(0,hit.index-32), Math.min(s.length,hit.index+hit.text.length+36))));
}
function applyPendingConnection(t){
  if(!state.pendingEntityId) return false;
  const c=detectConnection(t);
  if(!c) return false;
  const e=state.entities.find(x=>x.id===state.pendingEntityId);
  if(!e) return false;
  e.connection=c;
  return true;
}
function parseSystemResponsive(t){
  if(state.lastQuestion!=="system_responsive") return null;
  if(/(компьютер|пк|windows|виндовс).*(завис|замер)|вс[её]\s+завис|whole computer.*(frozen|freeze)|windows.*(frozen|freeze)|koko.*(jumissa|jäätyi)/i.test(t)) return false;
  if(/(игра|картинка|звук|анимац|windows).*(работ|двига|продолжа)|computer.*still.*(running|responsive)|game.*still.*(moving|running)|windows.*responsive|peli.*jatk|windows.*toim/i.test(t)) return true;
  return null;
}

function update(text,lang){
  const raw=String(text||""), t=norm(raw);
  state.lastUserText=raw;
  if(lang) state.language=lang;

  const wasMulti=state.multiActive;
  const hits=detectAllDevices(raw);
  const group=detectGroup(t);
  const globalSymptom=detectSymptom(t);
  const globalContext=detectContext(t);
  const globalScope=detectScope(t);

  applyPendingConnection(t);

  if(group){
    state.group=group;
    state.active=true;
    state.multiActive=true;
    state.sharedCausePossible=true;
  }

  if(hits.length){
    if(!wasMulti && hits.length>=2){
      state.entities=[]; state.nextEntityId=1; state.group=null; state.scope=null;
      state.systemResponsive=null; state.evidence=[];
    }
    for(const h of hits){
      const e=addEntity(h.type);
      const lc=localConnection(raw,h);
      if(lc) e.connection=lc;
      if(globalSymptom) e.symptom=globalSymptom;
    }
    if(state.entities.length>=2 || (wasMulti && additiveCue(t))){
      state.active=true;
      state.multiActive=true;
    }
  }

  if(state.multiActive){
    if(globalSymptom){
      state.symptom=globalSymptom;
      state.entities.forEach(e=>{ if(!e.symptom) e.symptom=globalSymptom; });
    }
    if(globalContext) state.context=globalContext;
    if(globalScope) state.scope=globalScope;
    if(simultaneousCue(t,state.entities.length) && state.entities.length>=2) state.timing="simultaneous";
    if(state.entities.length>=2 && (state.timing==="simultaneous" || globalSymptom)) state.sharedCausePossible=true;
    const resp=parseSystemResponsive(t);
    if(resp!==null) state.systemResponsive=resp;
  }
  return snapshot();
}

function nextMissingConnection(){ return state.entities.find(e=>!e.connection)||null; }
function connectionChoices(lang,e){
  const name=deviceName(e.type,lang);
  return L(lang,
    `What type of ${name} is it: wired USB, wireless with a USB receiver/dongle, or Bluetooth?`,
    `Какая у тебя ${name}: проводная USB, беспроводная с USB-приёмником или Bluetooth?`,
    `Millainen ${name} on: johdollinen USB, langaton USB-vastaanottimella vai Bluetooth?`
  );
}
function listNames(lang){
  const names=state.entities.map(e=>deviceName(e.type,lang));
  if(!names.length) return L(lang,"devices","устройства","laitteet");
  if(names.length===1) return names[0];
  const joiner=lang==="ru"?" и ":lang==="fi"?" ja ":" and ";
  return names.slice(0,-1).join(", ")+joiner+names[names.length-1];
}

function nextQuestion(lang){
  lang=lang||state.language||"en";
  if(!state.multiActive && !state.group) return null;

  const missing=nextMissingConnection();
  if(missing){
    state.pendingEntityId=missing.id;
    state.lastQuestion="connection_entity_"+missing.id;
    const first=state.entities.length>=2 && state.entities.every(e=>!e.connection);
    const intro=first ? L(lang,
      `I understand: ${listNames(lang)} are part of the same incident${state.context==="during_game" ? " and stopped working during the game" : ""}. Because several devices are affected, there may be a shared cause. I'll keep them as separate devices and clarify their connection one at a time. `,
      `Поняла: ${listNames(lang)} относятся к одному случаю${state.context==="during_game" ? " и перестали работать во время игры" : ""}. Поскольку затронуто сразу несколько устройств, причина может быть общей. Я сохраню их как отдельные устройства и уточню подключение по очереди. `,
      `Ymmärsin: ${listNames(lang)} kuuluvat samaan ongelmatilanteeseen${state.context==="during_game" ? " ja lakkasivat toimimasta pelin aikana" : ""}. Koska useita laitteita on mukana, syy voi olla yhteinen. Käsittelen niitä erillisinä laitteina ja tarkennan yhteydet yksi kerrallaan. `
    ) : "";
    return intro+connectionChoices(lang,missing);
  }

  state.pendingEntityId=null;

  if(state.context==="during_game" && !state.scope){
    state.lastQuestion="multi_scope";
    return L(lang,
      `Now I have the connection types for ${listNames(lang)}. Check them outside the game, for example after Alt+Tab or on the Windows desktop. Do both work outside the game, or do they still fail everywhere?`,
      `Теперь я знаю тип подключения для: ${listNames(lang)}. Проверь их вне игры — например после Alt+Tab или на рабочем столе Windows. Оба устройства работают вне игры или по-прежнему не работают нигде?`,
      `Nyt tiedän yhteystyypit laitteille: ${listNames(lang)}. Testaa niitä pelin ulkopuolella, esimerkiksi Alt+Tabin jälkeen tai Windowsin työpöydällä. Toimivatko molemmat pelin ulkopuolella vai eivätkö ne toimi missään?`
    );
  }

  if(state.scope==="app_only"){
    state.lastQuestion="multi_game_restart";
    return L(lang,
      `That points more toward the game or its input handling than two separate hardware failures. Close the game completely and start it again. Do all affected devices work in the game after restarting it?`,
      `Это больше похоже на проблему игры или обработки ввода, чем на несколько отдельных аппаратных поломок. Полностью закрой игру и запусти её снова. После перезапуска все затронутые устройства работают в игре?`,
      `Tämä viittaa enemmän pelin tai syötteen käsittelyn ongelmaan kuin useisiin erillisiin laitevikoihin. Sulje peli kokonaan ja käynnistä se uudelleen. Toimivatko kaikki laitteet pelissä uudelleenkäynnistyksen jälkeen?`
    );
  }

  if(state.scope==="system_wide" && state.systemResponsive===null){
    state.lastQuestion="system_responsive";
    return L(lang,
      `Because several input devices fail outside the game too, let's check for one shared cause. When they stopped, did the computer itself keep running — picture/animation/sound continued — or did the whole computer freeze?`,
      `Поскольку несколько устройств не работают и вне игры, проверим общую причину. Когда они перестали работать, сам компьютер продолжал работать — изображение/анимация/звук шли дальше — или завис весь компьютер?`,
      `Koska useat laitteet eivät toimi myöskään pelin ulkopuolella, tarkistetaan yhteinen syy. Kun ne lakkasivat toimimasta, jatkoiko tietokone muuten toimintaa — kuva/animaatio/ääni jatkui — vai jumittuiko koko tietokone?`
    );
  }

  if(state.scope==="system_wide" && state.systemResponsive===false){
    state.lastQuestion="restart_after_freeze";
    return L(lang,
      `If the whole computer froze at the same moment, the shared symptom is more important than treating the devices as separate failures. Restart the computer. After Windows starts again, do all affected devices work normally?`,
      `Если весь компьютер завис в тот же момент, общий симптом важнее, чем отдельная диагностика каждого устройства. Перезагрузи компьютер. После запуска Windows все затронутые устройства работают нормально?`,
      `Jos koko tietokone jumittui samalla hetkellä, yhteinen oire on tärkeämpi kuin laitteiden erillinen diagnostiikka. Käynnistä tietokone uudelleen. Toimivatko kaikki laitteet normaalisti Windowsin käynnistyttyä?`
    );
  }

  if(state.scope==="system_wide" && state.systemResponsive===true){
    const usbish=state.entities.filter(e=>["wired_usb","usb_receiver","wireless_unknown"].includes(e.connection)).length;
    if(usbish>=2){
      state.lastQuestion="shared_usb_path";
      return L(lang,
        `The computer itself stayed responsive while several devices failed. Since at least two use USB, check whether they share a USB hub/dock or nearby ports. Connect one affected device directly to another USB port on the computer. Does that device start working?`,
        `Сам компьютер продолжал работать, а несколько устройств отказали одновременно. Поскольку как минимум два используют USB, проверь, не подключены ли они через один USB-хаб/док или соседние порты. Подключи одно из затронутых устройств напрямую в другой USB-порт компьютера. Оно заработало?`,
        `Tietokone pysyi toiminnassa, mutta useita laitteita lakkasi toimimasta. Koska vähintään kaksi käyttää USB:tä, tarkista käyttävätkö ne samaa USB-hubia/telakkaa tai läheisiä portteja. Liitä yksi laite suoraan toiseen USB-porttiin. Alkaako se toimia?`
      );
    }
    state.lastQuestion="shared_os_input";
    return L(lang,
      `The computer remained responsive but several differently connected devices failed together. A shared Windows/input/driver issue is more plausible than several independent hardware failures at once. Restart Windows first. After restart, do all affected devices work?`,
      `Компьютер продолжал работать, но несколько устройств с разными типами подключения отказали одновременно. Общая проблема Windows/ввода/драйверов вероятнее, чем несколько независимых поломок сразу. Сначала перезагрузи Windows. После перезапуска все затронутые устройства работают?`,
      `Tietokone pysyi toiminnassa, mutta useita eri tavoin yhdistettyjä laitteita lakkasi toimimasta samaan aikaan. Yhteinen Windowsin/syötteen/ajurin ongelma on todennäköisempi kuin useat erilliset laiteviat. Käynnistä Windows uudelleen. Toimivatko kaikki laitteet sen jälkeen?`
    );
  }
  return null;
}

function shouldHandle(){ return !!(state.multiActive || state.group); }
function snapshot(){
  return {
    version:state.version, active:state.active, multiActive:state.multiActive,
    language:state.language,
    entities:state.entities.map(e=>({id:e.id,type:e.type,connection:e.connection,symptom:e.symptom,evidence:e.evidence.slice()})),
    group:state.group, context:state.context, timing:state.timing, scope:state.scope,
    symptom:state.symptom, sharedCausePossible:state.sharedCausePossible,
    pendingEntityId:state.pendingEntityId, lastQuestion:state.lastQuestion,
    systemResponsive:state.systemResponsive, evidence:state.evidence.slice()
  };
}
function reset(){
  state.active=false; state.multiActive=false; state.entities=[]; state.nextEntityId=1;
  state.group=null; state.context=null; state.timing=null; state.scope=null; state.symptom=null;
  state.sharedCausePossible=false; state.pendingEntityId=null; state.lastQuestion=null;
  state.evidence=[]; state.systemResponsive=null; state.lastUserText=null;
}

window.ANITA_ENTITIES={
  version:"21.0",state,update,nextQuestion,shouldHandle,snapshot,reset,
  detectAllDevices,detectConnection,detectSymptom,detectContext,detectScope
};
console.log("[ANITA v21.0] Multi-Entity Incident Engine loaded");
})();
