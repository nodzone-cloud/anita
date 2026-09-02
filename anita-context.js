/* ============================================================
   ANITA v20.1 — SEMANTIC CONTEXT ENGINE
   DEVICE → SYMPTOM → CONTEXT → SCOPE → CONNECTION → EVIDENCE

   Purpose:
   - accumulate facts across several user messages;
   - do not ask again for facts already supplied;
   - treat follow-up messages as additions to the current problem;
   - choose the next missing diagnostic fact;
   - preserve RU / EN / FI conversation language.
   ============================================================ */
(function(){
"use strict";

const state = {
  active:false,
  language:"en",
  device:null,
  symptom:null,
  context:null,
  scope:null,
  connection:null,
  evidence:[],
  lastQuestion:null,
  lastUserText:null
};

function norm(s){
  return String(s||"").toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/ё/g,"е")
    .replace(/[.,!?;:()[\]{}"«»]/g," ")
    .replace(/\s+/g," ").trim();
}
function has(t, re){ return re.test(t); }
function L(lang,en,ru,fi){ return lang==="ru"?ru:lang==="fi"?fi:en; }

function detectDevice(t){
  const map = [
    ["keyboard", /\bkeyboard\b|клавиатур|клав[аеуы]?|näppäimist/i],
    ["mouse", /\bmouse\b|\bmice\b|мыш[ьику]?|hiir/i],
    ["monitor", /\bmonitor\b|\bdisplay\b|\bscreen\b|монитор|экран|näytt/i],
    ["printer", /\bprinter\b|принтер|tulost/i],
    ["scanner", /\bscanner\b|сканер|skanner/i],
    ["microphone", /\bmicrophone\b|\bmic\b|микрофон|mikrofon/i],
    ["webcam", /\bwebcam\b|\bcamera\b|веб.?камер|камер|kamera/i],
    ["headphones", /\bheadphones?\b|\bheadset\b|наушник|гарнитур|kuulok/i],
    ["speakers", /\bspeakers?\b|колонк|kaiutin/i],
    ["projector", /\bprojector\b|проектор|projektor/i],
    ["disk", /\bssd\b|\bhdd\b|\bnvme\b|\bdisk\b|\bdrive\b|диск|накопител|levy|asema/i],
    ["bluetooth", /\bbluetooth\b|блютуз/i],
    ["usb_device", /\busb\b.*\b(device|stick|drive)\b|флешк|usb.?устрой|muistitik/i],
    ["computer", /\bcomputer\b|\bpc\b|компьютер|\bпк\b|tietokone/i],
    ["laptop", /\blaptop\b|\bnotebook\b|ноутбук|kannettava/i]
  ];
  for(const [name,re] of map) if(re.test(t)) return name;
  return null;
}

function detectSymptom(t){
  if(has(t, /\b(stopped|stop|quit|ceased)\b.*\b(work|working|respond)|\bnot working\b|\bdoes not work\b|\bdoesn't work\b|\bdead\b|перестал[ао]?\s+работ|не работает|не реагир|умер[лао]?|lakkasi toimimasta|ei toimi|ei reagoi/i))
    return "not_working";
  if(has(t, /\bdisconnect|keeps disconnect|отключа|пропада|katke/i)) return "disconnecting";
  if(has(t, /\bslow|lag|laggy|sluggish|тормоз|лага|медлен|hidas|lagaa/i)) return "slow";
  if(has(t, /\bno signal\b|нет сигнала|ei signaalia/i)) return "no_signal";
  if(has(t, /\bblack screen\b|черн(ый|ого) экран|pimeä näyttö/i)) return "black_screen";
  if(has(t, /\bnot detected\b|\bnot recognized\b|не видит|не определя|ei tunnista/i)) return "not_detected";
  if(has(t, /\bcrash|crashes|crashed|вылет|kaatu/i)) return "crashing";
  return null;
}

function detectContext(t){
  if(has(t, /\b(during|while|in the middle of)\b.*\b(game|gaming|playing)\b|во время игр|во время игры|в игре|играл|играла|pelin aikana|pelatessa/i))
    return "during_game";
  if(has(t, /\bafter\b.*\b(update|windows update)\b|после обновлен|päivityksen jälkeen/i)) return "after_update";
  if(has(t, /\bafter\b.*\b(restart|reboot)\b|после перезагруз|uudelleenkäynnistyksen jälkeen/i)) return "after_restart";
  if(has(t, /\bafter\b.*\b(install|installation)\b|после установк|asennuksen jälkeen/i)) return "after_install";
  if(has(t, /\bafter\b.*\b(drop|fell|impact)\b|после паден|putoamisen jälkeen/i)) return "after_physical_event";
  return null;
}

function detectScope(t){
  if(has(t, /\b(everywhere|anywhere|nowhere|all apps|whole system)\b|нигде|везде|во всей системе|вообще не реагир|kaikkialla|ei missään|koko järjestelmä/i))
    return "system_wide";
  if(has(t, /\b(only|just)\b.*\b(game|app|program)\b|только в игре|только в программе|vain pelissä|vain ohjelmassa/i))
    return "app_only";
  if(has(t, /\b(outside the game|outside game|in windows|desktop)\b.*\b(work|works|working)\b|вне игры работает|в windows работает|на рабочем столе работает|toimii pelin ulkopuolella|toimii windowsissa/i))
    return "app_only";
  return null;
}

function detectConnection(t){
  if(has(t, /\bbluetooth\b|блютуз/i)) return "bluetooth";
  if(has(t, /\b(receiver|dongle|usb receiver)\b|приемник|приёмник|ресивер|vastaanotin/i)) return "usb_receiver";
  if(has(t, /\b(wired|cable|usb cable|wired usb)\b|проводн|кабел|johdollinen|kaapeli/i)) return "wired_usb";
  if(has(t, /\bwireless\b|беспроводн|langaton/i)) return "wireless_unknown";
  return null;
}

function update(text, lang){
  const t=norm(text);
  if(lang) state.language=lang;
  state.lastUserText=String(text||"");

  const d=detectDevice(t);
  const s=detectSymptom(t);
  const c=detectContext(t);
  const sc=detectScope(t);
  const cn=detectConnection(t);

  if(d) state.device=d;
  if(s) state.symptom=s;
  if(c) state.context=c;
  if(sc) state.scope=sc;
  if(cn) state.connection=cn;

  if(d||s||c||sc||cn) state.active=true;

  return snapshot();
}

function snapshot(){
  return {
    active:state.active,
    language:state.language,
    device:state.device,
    symptom:state.symptom,
    context:state.context,
    scope:state.scope,
    connection:state.connection,
    evidence:state.evidence.slice(),
    lastQuestion:state.lastQuestion
  };
}

function rememberEvidence(text){
  const value=String(text||"").trim();
  if(value && !state.evidence.includes(value)) state.evidence.push(value);
}

function deviceName(lang){
  const names={
    keyboard:{en:"keyboard",ru:"клавиатура",fi:"näppäimistö"},
    mouse:{en:"mouse",ru:"мышь",fi:"hiiri"},
    monitor:{en:"monitor",ru:"монитор",fi:"näyttö"},
    printer:{en:"printer",ru:"принтер",fi:"tulostin"},
    scanner:{en:"scanner",ru:"сканер",fi:"skanneri"},
    microphone:{en:"microphone",ru:"микрофон",fi:"mikrofoni"},
    webcam:{en:"webcam",ru:"веб-камера",fi:"webkamera"},
    headphones:{en:"headphones",ru:"наушники",fi:"kuulokkeet"},
    speakers:{en:"speakers",ru:"колонки",fi:"kaiuttimet"},
    projector:{en:"projector",ru:"проектор",fi:"projektori"},
    disk:{en:"drive",ru:"диск",fi:"levy"},
    bluetooth:{en:"Bluetooth device",ru:"Bluetooth-устройство",fi:"Bluetooth-laite"},
    usb_device:{en:"USB device",ru:"USB-устройство",fi:"USB-laite"},
    computer:{en:"computer",ru:"компьютер",fi:"tietokone"},
    laptop:{en:"laptop",ru:"ноутбук",fi:"kannettava"}
  };
  const n=names[state.device]||{en:"device",ru:"устройство",fi:"laite"};
  return n[lang]||n.en;
}

function isPeripheral(){
  return ["keyboard","mouse","printer","scanner","microphone","webcam","headphones","speakers","usb_device","bluetooth"].includes(state.device);
}

function nextQuestion(lang){
  lang=lang||state.language||"en";
  const dev=deviceName(lang);

  // We already know DEVICE + not-working + during-game.
  // The missing discriminating fact is SCOPE, not "what happened?".
  if(state.device && state.symptom==="not_working" && state.context==="during_game" && !state.scope){
    state.lastQuestion="scope_after_game_failure";
    return L(lang,
      `I understand: the ${dev} stopped working during the game. First let's separate a game-specific problem from a device or Windows problem. Leave the game or press Alt+Tab and test it in Windows. Does it work outside the game, or does it not respond anywhere?`,
      `Поняла: ${dev} перестала работать именно во время игры. Сначала отделим проблему самой игры от проблемы устройства или Windows. Выйди из игры или нажми Alt+Tab и проверь устройство в Windows. Оно работает вне игры или не реагирует вообще нигде?`,
      `Ymmärsin: ${dev} lakkasi toimimasta pelin aikana. Erotetaan ensin pelikohtainen ongelma laitteen tai Windowsin ongelmasta. Poistu pelistä tai paina Alt+Tab ja testaa laitetta Windowsissa. Toimiiko se pelin ulkopuolella vai eikö se reagoi missään?`
    );
  }

  // If it works outside the game, don't ask connection first: diagnose app/game path.
  if(state.device && state.symptom==="not_working" && state.scope==="app_only"){
    state.lastQuestion="app_specific_restart";
    return L(lang,
      `Good, that narrows it down: the ${dev} works outside the game, so the hardware is less likely to be the cause. Close the game completely and start it again. Does the ${dev} work in the game after restarting it?`,
      `Хорошо, круг сузился: ${dev} работает вне игры, поэтому аппаратная неисправность менее вероятна. Полностью закрой игру и запусти её снова. После перезапуска ${dev} работает в игре?`,
      `Hyvä, tämä rajaa ongelmaa: ${dev} toimii pelin ulkopuolella, joten laitevika on epätodennäköisempi. Sulje peli kokonaan ja käynnistä se uudelleen. Toimiiko ${dev} pelissä uudelleenkäynnistyksen jälkeen?`
    );
  }

  // System-wide peripheral failure: connection is the next missing fact.
  if(state.device && state.symptom==="not_working" && state.scope==="system_wide" && isPeripheral() && !state.connection){
    state.lastQuestion="connection_type";
    return L(lang,
      `Understood: the ${dev} does not work anywhere, not only in the game. How is it connected: wired USB, wireless USB receiver, or Bluetooth?`,
      `Поняла: ${dev} не работает нигде, не только в игре. Как она подключена: проводной USB, беспроводной USB-приёмник или Bluetooth?`,
      `Ymmärsin: ${dev} ei toimi missään, ei vain pelissä. Miten se on yhdistetty: johdollinen USB, langaton USB-vastaanotin vai Bluetooth?`
    );
  }

  if(state.device && state.symptom==="not_working" && state.connection==="wireless_unknown"){
    state.lastQuestion="wireless_type";
    return L(lang,
      `Got it — it is wireless. Does it connect through Bluetooth or through a small USB receiver/dongle?`,
      `Поняла — устройство беспроводное. Оно подключается через Bluetooth или через маленький USB-приёмник?`,
      `Selvä — laite on langaton. Yhdistyykö se Bluetoothilla vai pienellä USB-vastaanottimella?`
    );
  }

  if(state.device && state.symptom==="not_working" && state.connection==="usb_receiver"){
    state.lastQuestion="receiver_reseat";
    return L(lang,
      `Remove the USB receiver, wait about 10 seconds, and connect it to another USB port directly on the computer if possible. Does the ${dev} work now?`,
      `Вытащи USB-приёмник, подожди около 10 секунд и подключи его в другой USB-порт прямо на компьютере, если возможно. ${dev} заработала?`,
      `Irrota USB-vastaanotin, odota noin 10 sekuntia ja liitä se toiseen USB-porttiin suoraan tietokoneeseen, jos mahdollista. Toimiiko ${dev} nyt?`
    );
  }

  if(state.device && state.symptom==="not_working" && state.connection==="wired_usb"){
    state.lastQuestion="wired_reseat";
    return L(lang,
      `Reconnect the ${dev} to another USB port directly on the computer. Avoid a hub for this test. Does it work now?`,
      `Переподключи ${dev} в другой USB-порт прямо на компьютере. Для этой проверки не используй USB-хаб. Она заработала?`,
      `Liitä ${dev} toiseen USB-porttiin suoraan tietokoneessa. Älä käytä tässä testissä USB-hubia. Toimiiko se nyt?`
    );
  }

  if(state.device && state.symptom==="not_working" && state.connection==="bluetooth"){
    state.lastQuestion="bluetooth_status";
    return L(lang,
      `Open Windows Bluetooth settings and check whether the ${dev} is shown as Connected, Paired, or not listed at all. What does Windows show?`,
      `Открой настройки Bluetooth в Windows и посмотри, что указано у устройства: «Подключено», «Сопряжено» или его вообще нет в списке. Что показывает Windows?`,
      `Avaa Windowsin Bluetooth-asetukset ja tarkista näkyykö ${dev} tilassa Yhdistetty, Paritettu vai puuttuuko se kokonaan. Mitä Windows näyttää?`
    );
  }

  // Device known, symptom missing: ask only for symptom.
  if(state.device && !state.symptom){
    state.lastQuestion="symptom";
    return L(lang,
      `I have the device: ${dev}. What exactly is it doing — not responding at all, disconnecting, working intermittently, or something else?`,
      `Устройство я уже поняла: ${dev}. Что именно происходит: совсем не реагирует, отключается, работает временами или что-то другое?`,
      `Laite on jo tiedossa: ${dev}. Mitä tarkalleen tapahtuu — eikö se reagoi lainkaan, katkeaako yhteys, toimiiko se ajoittain vai jotain muuta?`
    );
  }

  return null;
}

function shouldHandle(){
  return !!(state.active && (state.device || state.symptom || state.context || state.scope || state.connection));
}

function reset(){
  state.active=false; state.device=null; state.symptom=null; state.context=null;
  state.scope=null; state.connection=null; state.evidence=[]; state.lastQuestion=null;
  state.lastUserText=null;
}

window.ANITA_CONTEXT={
  version:"20.2",
  state,
  update,
  snapshot,
  nextQuestion,
  rememberEvidence,
  shouldHandle,
  reset
};

console.log("[ANITA v20.2] Semantic Context Engine loaded");
})();
