/* ANITA v18 - Response / Diagnostic Dialogue Module */
(function(){
"use strict";
const M=()=>window.ANITA_MEMORY;

function L(lang,en,ru,fi){return lang==="ru"?ru:lang==="fi"?fi:en;}

const objectNames={
  mouse:{en:"mouse",ru:"мышь",fi:"hiiri"},
  keyboard:{en:"keyboard",ru:"клавиатура",fi:"näppäimistö"},
  display:{en:"monitor/display",ru:"монитор/экран",fi:"näyttö"},
  audio_output:{en:"headphones/speakers",ru:"наушники/звук",fi:"kuulokkeet/ääni"},
  microphone:{en:"microphone",ru:"микрофон",fi:"mikrofoni"},
  webcam:{en:"webcam",ru:"веб-камера",fi:"verkkokamera"},
  usb_storage:{en:"USB/storage device",ru:"USB/накопитель",fi:"USB/tallennuslaite"},
  printer:{en:"printer",ru:"принтер",fi:"tulostin"},
  scanner:{en:"scanner",ru:"сканер",fi:"skanneri"},
  game_controller:{en:"game controller",ru:"геймпад",fi:"peliohjain"},
  bluetooth:{en:"Bluetooth device",ru:"Bluetooth-устройство",fi:"Bluetooth-laite"},
  dock_hub:{en:"dock/USB hub",ru:"док-станция/USB-хаб",fi:"telakka/USB-keskitin"},
  generic_device:{en:"device",ru:"устройство",fi:"laite"},
  ram:{en:"RAM",ru:"оперативная память",fi:"RAM-muisti"},
  disk:{en:"drive",ru:"диск",fi:"levy"},
  gpu:{en:"graphics card",ru:"видеокарта",fi:"näytönohjain"},
  windows:{en:"Windows",ru:"Windows",fi:"Windows"},
  software:{en:"program",ru:"программа",fi:"ohjelma"}
};

function ask(text,q,expected,match){
  if(M()){
    M().setIssue(match.category,match.issue,objectNames[match.category]?.en||match.category);
    M().setQuestion(q,expected);
    M().state.lastMatch=match;
    M().push("assistant",text,{q,expected,caseId:match.id});
  }
  return {type:"answer",text};
}

function first(match,lang){
  const c=match.category, issue=match.issue;
  const obj=objectNames[c]||objectNames.generic_device;

  if(c==="mouse"){
    if(issue==="disconnects" || issue==="not_working"){
      return ask(L(lang,
        "Got it — the mouse stopped working or lost connection. First: does it still fail outside the game/program too, or only there?",
        "Поняла — мышь перестала работать или потеряла соединение. Сначала уточним: она не работает и вне игры/программы или только там?",
        "Selvä — hiiri lakkasi toimimasta tai yhteys katkesi. Toimiiko se muualla kuin pelissä/ohjelmassa vai ei?"
      ),"mouse_scope","scope",match);
    }
    if(issue==="not_detected"){
      return ask(L(lang,
        "Got it — the computer isn't detecting the mouse. Is it USB, Bluetooth, or a wireless mouse with a USB receiver?",
        "Поняла — компьютер не определяет мышь. Это USB, Bluetooth или беспроводная мышь с USB-приёмником?",
        "Selvä — tietokone ei tunnista hiirtä. Onko se USB-, Bluetooth- vai USB-vastaanottimella toimiva langaton hiiri?"
      ),"mouse_connection_type","connection_type",match);
    }
    if(issue==="button_key" || issue==="scroll"){
      return ask(L(lang,
        "Got it — movement may work, but a mouse button or wheel does not. Does the same button/wheel fail in every program, or only in one app/game?",
        "Поняла — движение мыши может работать, но кнопка или колёсико нет. Эта кнопка/колесо не работает во всех программах или только в одной игре/приложении?",
        "Selvä — hiiri voi liikkua, mutta painike tai rulla ei toimi. Onko sama ongelma kaikissa ohjelmissa vai vain yhdessä pelissä/sovelluksessa?"
      ),"mouse_control_scope","scope",match);
    }
    return ask(L(lang,
      "Got it — this is a mouse problem. Is the mouse wired USB, Bluetooth, or wireless with a USB receiver?",
      "Поняла — проблема именно с мышью. Она проводная USB, Bluetooth или беспроводная с USB-приёмником?",
      "Selvä — kyse on hiiriongelmasta. Onko hiiri USB-kaapelilla, Bluetoothilla vai USB-vastaanottimella?"
    ),"mouse_connection_type","connection_type",match);
  }

  if(c==="keyboard"){
    return ask(L(lang,
      "Got it — this is a keyboard/input problem. Does it happen everywhere in Windows, or only in one program/game?",
      "Поняла — проблема с клавиатурой/вводом. Это происходит во всём Windows или только в одной программе/игре?",
      "Selvä — kyse on näppäimistö-/syöttöongelmasta. Tapahtuuko se kaikkialla Windowsissa vai vain yhdessä ohjelmassa/pelissä?"
    ),"keyboard_scope","scope",match);
  }

  if(c==="display"){
    if(issue==="no_picture"){
      return ask(L(lang,
        "Got it — the monitor is on but the image/signal is missing. Does the monitor show its own logo/menu when you turn it on?",
        "Поняла — монитор включён, но изображения/сигнала нет. Показывает ли сам монитор свой логотип или меню при включении?",
        "Selvä — näyttö on päällä, mutta kuva/signaali puuttuu. Näyttääkö näyttö oman logonsa tai valikkonsa käynnistyessä?"
      ),"display_own_menu","yes_no",match);
    }
    return ask(L(lang,
      "Got it — this is a display/monitor problem. Is it happening all the time, or only during games, video, wake-from-sleep, or after an update?",
      "Поняла — проблема с монитором/изображением. Она постоянная или появляется только в играх, видео, после сна или после обновления?",
      "Selvä — kyse on näyttöongelmasta. Tapahtuuko se jatkuvasti vai vain pelissä, videossa, lepotilasta palatessa tai päivityksen jälkeen?"
    ),"display_when","context",match);
  }

  if(c==="audio_output"){
    return ask(L(lang,
      "Got it — this is an audio-output problem. Are you using Bluetooth, USB, 3.5 mm headphones, or speakers?",
      "Поняла — проблема с выводом звука. Ты используешь Bluetooth, USB, наушники 3.5 мм или колонки?",
      "Selvä — kyse on äänentoisto-ongelmasta. Käytätkö Bluetoothia, USB:tä, 3,5 mm kuulokkeita vai kaiuttimia?"
    ),"audio_connection","connection_type",match);
  }

  if(c==="microphone"){
    return ask(L(lang,
      "Got it — this is a microphone problem. Does the microphone work in Windows Sound settings, or is it missing/not working there too?",
      "Поняла — проблема с микрофоном. Работает ли он в настройках звука Windows или там тоже не определяется/не работает?",
      "Selvä — kyse on mikrofoniongelmasta. Toimiiko mikrofoni Windowsin ääniasetuksissa vai puuttuuko/toimiiko se sielläkin huonosti?"
    ),"mic_windows_test","scope",match);
  }

  if(c==="webcam"){
    return ask(L(lang,
      "Got it — this is a webcam problem. Does the camera work in the Windows Camera app, or does it fail there too?",
      "Поняла — проблема с веб-камерой. Работает ли камера в приложении «Камера» Windows или там тоже нет?",
      "Selvä — kyse on verkkokameraongelmasta. Toimiiko kamera Windowsin Kamera-sovelluksessa vai ei sielläkään?"
    ),"webcam_windows_test","scope",match);
  }

  if(["usb_storage","generic_device","dock_hub","bluetooth","game_controller","printer","scanner"].includes(c)){
    return ask(L(lang,
      `Got it — this is a ${obj.en} connection/detection problem. Does Windows show any sound, popup, or Device Manager change when you connect it?`,
      `Поняла — проблема с подключением/определением устройства. Когда ты его подключаешь, Windows издаёт звук, показывает уведомление или что-то меняется в Диспетчере устройств?`,
      `Selvä — kyse on laitteen yhteys-/tunnistusongelmasta. Kuuluuko Windowsissa ääni, tuleeko ilmoitus tai muuttuuko Laitehallinta kun liität laitteen?`
    ),"device_connect_reaction","detail",match);
  }

  if(c==="ram"){
    return ask(L(lang,
      "Got it — this is a RAM problem. Was the RAM recently installed/changed, or did the issue start without any hardware change?",
      "Поняла — проблема связана с оперативной памятью. RAM недавно устанавливали/меняли или проблема появилась без изменений железа?",
      "Selvä — kyse on RAM-ongelmasta. Asennettiinko/vaihdettiinko muistia äskettäin vai alkoiko ongelma ilman laitteistomuutosta?"
    ),"ram_changed","yes_no_detail",match);
  }

  if(c==="disk"){
    if(issue==="noise"){
      return ask(L(lang,
        "A clicking or unusually loud HDD can indicate a failing drive. Avoid unnecessary writes for now. Is there important data on this drive that is not backed up?",
        "Щелчки или необычно громкий HDD могут указывать на неисправность диска. Пока лучше не записывать на него лишние данные. Есть ли на диске важные файлы без резервной копии?",
        "Naksuva tai poikkeuksellisen äänekäs HDD voi viitata vikaantumiseen. Vältä turhaa kirjoittamista levylle. Onko levyllä tärkeitä tiedostoja ilman varmuuskopiota?"
      ),"disk_backup","yes_no",match);
    }
    return ask(L(lang,
      "Got it — this is a drive/storage problem. Is the drive visible in Disk Management (Disk Management / Управление дисками / Levynhallinta)?",
      "Поняла — проблема с диском/накопителем. Видно ли этот диск в «Управлении дисками» Windows?",
      "Selvä — kyse on levy-/tallennusongelmasta. Näkyykö levy Windowsin Levynhallinnassa?"
    ),"disk_management_visible","yes_no",match);
  }

  if(c==="gpu"){
    return ask(L(lang,
      "Got it — this is a graphics-card/GPU problem. Did it start after installing the GPU or updating its driver, or did it appear suddenly?",
      "Поняла — проблема связана с видеокартой. Она появилась после установки видеокарты/обновления драйвера или возникла внезапно?",
      "Selvä — kyse on näytönohjainongelmasta. Alkoiko se kortin asennuksen/ajuripäivityksen jälkeen vai yhtäkkiä?"
    ),"gpu_change","context",match);
  }

  if(c==="windows"){
    return ask(L(lang,
      "Got it — this is a Windows startup/system problem. How far does the PC get: BIOS/manufacturer logo, Windows logo, login screen, or desktop?",
      "Поняла — проблема с запуском/работой Windows. До какого этапа доходит компьютер: BIOS/логотип производителя, логотип Windows, экран входа или рабочий стол?",
      "Selvä — kyse on Windowsin käynnistys-/järjestelmäongelmasta. Mihin asti kone pääsee: BIOS/valmistajan logo, Windows-logo, kirjautumisruutu vai työpöytä?"
    ),"windows_stage","boot_stage",match);
  }

  if(c==="software"){
    return ask(L(lang,
      "Got it — this is a program/application problem. What is the program's name?",
      "Поняла — проблема с программой/приложением. Как называется программа?",
      "Selvä — kyse on ohjelma-/sovellusongelmasta. Mikä ohjelman nimi on?"
    ),"software_name","object_name",match);
  }

  return ask(L(lang,
    "Got it. Tell me what changed immediately before the problem started.",
    "Поняла. Расскажи, что изменилось непосредственно перед появлением проблемы.",
    "Selvä. Kerro mitä muuttui juuri ennen ongelman alkamista."
  ),"generic_before","context",match);
}

function follow(text,lang){
  const mem=M()?.state;
  if(!mem || !mem.lastQuestion) return null;
  const t=String(text||"").trim();

  if(mem.lastQuestion==="mouse_scope"){
    M().fact("mouseScope",t);
    return ask(L(lang,
      "Good — that tells us whether the game/app is involved. Next: is the mouse USB, Bluetooth, or wireless with a USB receiver?",
      "Хорошо — так мы поймём, связана ли проблема с игрой/программой. Теперь: мышь USB, Bluetooth или беспроводная с USB-приёмником?",
      "Hyvä — näin selviää liittyykö ongelma peliin/ohjelmaan. Seuraavaksi: onko hiiri USB-, Bluetooth- vai USB-vastaanottimella?"
    ),"mouse_connection_type","connection_type",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
  }

  if(mem.lastQuestion==="mouse_connection_type"){
    M().fact("mouseConnection",t);
    return ask(L(lang,
      "Now check one thing: unplug/reconnect it (or turn Bluetooth/wireless off and on), then tell me whether the cursor starts moving again.",
      "Теперь проверь одно: переподключи мышь (или выключи/включи Bluetooth/беспроводное соединение) и напиши, начал ли курсор снова двигаться.",
      "Tarkista yksi asia: irrota ja liitä hiiri uudelleen (tai kytke Bluetooth/langaton yhteys pois ja päälle) ja kerro alkaako osoitin taas liikkua."
    ),"mouse_reconnect_result","result",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
  }

  if(mem.lastQuestion==="software_name"){
    M().state.currentObject=t;
    M().fact("softwareName",t);
    return ask(L(lang,
      `Got it — ${t}. Does it fail to start, freeze, crash, show an error, or just behave incorrectly?`,
      `Поняла — ${t}. Она не запускается, зависает, вылетает, показывает ошибку или просто работает неправильно?`,
      `Selvä — ${t}. Eikö se käynnisty, jäätyykö, kaatuuko, näyttääkö virheen vai toimiiko muuten väärin?`
    ),"software_symptom","symptom",mem.lastMatch||{category:"software",issue:"software_issue",id:null});
  }

  // Frequency replies remain attached to the current question.
  const low=t.toLowerCase();
  if(/^(every time|always|каждый раз|всегда|joka kerta|aina)$/.test(low)){
    M().fact("frequency","always");
    return {type:"answer",text:L(lang,
      "Got it — it happens every time. What happens immediately before the failure?",
      "Поняла — это происходит каждый раз. Что происходит непосредственно перед сбоем?",
      "Selvä — se tapahtuu joka kerta. Mitä tapahtuu juuri ennen vikaa?"
    )};
  }
  if(/^(sometimes|not always|иногда|не всегда|joskus|ei aina)$/.test(low)){
    M().fact("frequency","sometimes");
    return {type:"answer",text:L(lang,
      "Got it — it is intermittent. Do you notice a pattern: a specific program, game, USB port, action, or time after startup?",
      "Поняла — проблема появляется не всегда. Есть ли закономерность: конкретная программа, игра, USB-порт, действие или время после запуска?",
      "Selvä — ongelma on satunnainen. Huomaatko kaavaa: tietty ohjelma, peli, USB-portti, toiminto tai aika käynnistyksen jälkeen?"
    )};
  }

  return null;
}

window.ANITA_RESPONSES={version:"18.1",first,follow};
console.log("[ANITA v18.1] Response module loaded");
})();