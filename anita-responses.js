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

  if(mem.lastQuestion==="software_name"){
    M().state.currentObject=t;
    M().fact("softwareName",t);
    return ask(L(lang,
      `Got it — ${t}. Does it fail to start, freeze, crash, show an error, or just behave incorrectly?`,
      `Поняла — ${t}. Она не запускается, зависает, вылетает, показывает ошибку или просто работает неправильно?`,
      `Selvä — ${t}. Eikö se käynnisty, jäätyykö, kaatuuko, näyttääkö virheen vai toimiiko muuten väärin?`
    ),"software_symptom","symptom",mem.lastMatch||{category:"software",issue:"software_issue",id:null});
  }

  // Context-first handling for short answers to ANITA's own questions.
  const low=t.toLowerCase().trim();

  // User answered the mouse connection-type question.
  if(mem.lastQuestion==="mouse_connection_type"){
    const usb=/^(usb|wired|wired usb|cable|проводная|проводная usb|usb мышь|usb-мышь|usb hiiri|langallinen|langallinen usb)$/.test(low);
    const bt=/^(bluetooth|bt|блютуз|bluetooth мышь|bluetooth-мышь|bluetooth hiiri)$/.test(low);
    const wireless=/^(wireless|wireless usb|usb receiver|receiver|dongle|беспроводная|с приемником|с приёмником|ресивер|vastaanotin|langaton|langaton usb)$/.test(low);

    if(usb || bt || wireless){
      const kind=usb?"usb":bt?"bluetooth":"wireless_unspecified";
      M().fact("mouseConnection",kind);

      if(kind==="wireless_unspecified"){
        return ask(L(lang,
          "Okay — wireless. Does it connect through Bluetooth, or does it use a small USB receiver/dongle plugged into the computer?",
          "Хорошо — беспроводная. Она подключается через Bluetooth или через маленький USB-приёмник/донгл, вставленный в компьютер?",
          "Hyvä — langaton. Yhdistyykö se Bluetoothilla vai käyttääkö se tietokoneeseen liitettyä pientä USB-vastaanotinta?"
        ),"mouse_wireless_kind","connection_type",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
      }

      if(kind==="usb"){
        return ask(L(lang,
          "Okay — USB mouse. Unplug it and connect it to a different USB port, preferably directly on the PC rather than through a hub. Does the cursor start moving?",
          "Хорошо — USB-мышь. Отключи её и подключи в другой USB-порт, лучше напрямую к компьютеру, а не через хаб. Курсор начал двигаться?",
          "Hyvä — USB-hiiri. Irrota se ja liitä toiseen USB-porttiin, mieluiten suoraan tietokoneeseen eikä hubin kautta. Alkaako osoitin liikkua?"
        ),"mouse_usb_port_test","yes_no",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
      }
      if(kind==="bluetooth"){
        return ask(L(lang,
          "Okay — Bluetooth mouse. Turn Bluetooth off and back on, then reconnect the mouse. Does it start working again?",
          "Хорошо — Bluetooth-мышь. Выключи и снова включи Bluetooth, затем переподключи мышь. Она снова заработала?",
          "Hyvä — Bluetooth-hiiri. Kytke Bluetooth pois ja takaisin päälle ja yhdistä hiiri uudelleen. Alkaako se toimia?"
        ),"mouse_bt_reconnect","yes_no",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
      }
      return ask(L(lang,
        "Okay — wireless mouse with a USB receiver. Unplug the receiver and try another USB port. Does the mouse start working?",
        "Хорошо — беспроводная мышь с USB-приёмником. Переставь приёмник в другой USB-порт. Мышь заработала?",
        "Hyvä — langaton hiiri USB-vastaanottimella. Siirrä vastaanotin toiseen USB-porttiin. Alkaako hiiri toimia?"
      ),"mouse_receiver_port_test","yes_no",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
    }
  }

  // Resolve "wireless" without guessing whether it means Bluetooth or a USB receiver.
  if(mem.lastQuestion==="mouse_wireless_kind"){
    const bt2=/^(bluetooth|bt|блютуз|bluetooth мышь|bluetooth-мышь|bluetooth hiiri)$/.test(low);
    const recv2=/^(usb|usb receiver|receiver|dongle|usb dongle|приемник|приёмник|usb приемник|usb приёмник|донгл|vastaanotin|usb vastaanotin)$/.test(low);
    if(bt2){
      M().fact("mouseConnection","bluetooth");
      return ask(L(lang,
        "Okay — Bluetooth mouse. Turn Bluetooth off and back on, reconnect the mouse, and tell me whether the cursor starts moving again.",
        "Хорошо — Bluetooth-мышь. Выключи и снова включи Bluetooth, переподключи мышь и скажи, начал ли курсор снова двигаться.",
        "Hyvä — Bluetooth-hiiri. Kytke Bluetooth pois ja takaisin päälle, yhdistä hiiri uudelleen ja kerro alkaako osoitin liikkua."
      ),"mouse_bt_reconnect","result",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
    }
    if(recv2){
      M().fact("mouseConnection","wireless_receiver");
      return ask(L(lang,
        "Okay — wireless mouse with a USB receiver. Move the receiver to another USB port, preferably directly on the PC. Does the cursor start moving?",
        "Хорошо — беспроводная мышь с USB-приёмником. Переставь приёмник в другой USB-порт, лучше напрямую в компьютер. Курсор начал двигаться?",
        "Hyvä — langaton hiiri USB-vastaanottimella. Siirrä vastaanotin toiseen USB-porttiin, mieluiten suoraan tietokoneeseen. Alkaako osoitin liikkua?"
      ),"mouse_receiver_port_test","result",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
    }
  }

  // Yes/no/result understanding. Do not require an exact one-word answer.
  // Examples accepted: "no", "no it didn't", "no itr didnt", "still no",
  // "yes now it works", "yeah it started working".
  function compactAnswer(v){
    return String(v||"").toLowerCase()
      .replace(/[’']/g,"")
      .replace(/\bitr\b/g,"it")       // common typo: "no itr didnt"
      .replace(/\bdidnt\b/g,"did not")
      .replace(/\bdoesnt\b/g,"does not")
      .replace(/\bcant\b/g,"cannot")
      .replace(/[^a-zа-яёäöå\s]/gi," ")
      .replace(/\s+/g," ").trim();
  }
  const ans=compactAnswer(low);

  const yes =
    /^(yes|yeah|yep|yup|да|ага|kyllä|joo)\b/.test(ans) ||
    /\b(it works|works now|working now|started working|cursor moves|заработал|заработала|работает теперь|курсор двигается|toimii nyt|osoitin liikkuu)\b/.test(ans);

  const no =
    /^(no|nope|nah|нет|неа|ei)\b/.test(ans) ||
    /\b(still not|still does not|did not|does not work|not working|cursor does not move|не заработал|не заработала|все еще не|всё ещё не|не работает|курсор не двигается|ei toimi|ei vielakaan|ei vieläkään)\b/.test(ans);

  // Yes/no results for mouse troubleshooting must stay in the mouse branch.

  if(["mouse_usb_port_test","mouse_bt_reconnect","mouse_receiver_port_test","mouse_reconnect_result"].includes(mem.lastQuestion)){
    if(yes){
      M().fact("mouseTestResult","worked");
      M().setQuestion(null,null);
      return {type:"answer",text:L(lang,
        "Great — that points to the previous port/connection rather than the mouse itself. If the problem returns, tell me and we'll continue from here.",
        "Отлично — значит, проблема скорее была в предыдущем порте/соединении, а не в самой мыши. Если проблема вернётся, напиши — продолжим отсюда.",
        "Hyvä — ongelma oli todennäköisemmin aiemmassa portissa/yhteydessä kuin itse hiiressä. Jos ongelma palaa, jatketaan tästä."
      )};
    }
    if(no){
      M().fact("mouseTestResult","failed");
      return ask(L(lang,
        "Okay — it still doesn't work. Next, try this mouse on another computer if possible, or try another mouse on this PC. Which of those can you test?",
        "Хорошо — мышь всё ещё не работает. Следующий шаг: если возможно, проверь эту мышь на другом компьютере или подключи другую мышь к этому ПК. Что из этого ты можешь проверить?",
        "Selvä — hiiri ei vieläkään toimi. Seuraavaksi kokeile tätä hiirtä toisessa tietokoneessa tai toista hiirtä tässä koneessa. Kumman voit testata?"
      ),"mouse_cross_test","choice",mem.lastMatch||{category:"mouse",issue:"not_working",id:null});
    }
  }

  // "What?" / "What do you mean?" should clarify ANITA's last question,
  // not fall into a generic fallback.
  if(/^(what|what\?|what do you mean|huh|sorry what|что|что\?|в смысле|не понял|не поняла|mitä|mitä\?|mitä tarkoitat)$/.test(low)){
    const q=mem.lastQuestion;
    if(q==="mouse_scope"){
      return {type:"answer",text:L(lang,
        "I mean: does the mouse stop working only inside that game/program, or does it also stop working on the Windows desktop?",
        "Я имею в виду: мышь перестаёт работать только в этой игре/программе или также на рабочем столе Windows?",
        "Tarkoitan: lakkaako hiiri toimimasta vain siinä pelissä/ohjelmassa vai myös Windowsin työpöydällä?"
      )};
    }
    if(q==="mouse_connection_type"){
      return {type:"answer",text:L(lang,
        "I’m asking how the mouse connects: USB cable, Bluetooth, or wireless with a small USB receiver.",
        "Я спрашиваю, как подключена мышь: USB-кабелем, через Bluetooth или беспроводно через маленький USB-приёмник.",
        "Kysyn, miten hiiri yhdistyy: USB-kaapelilla, Bluetoothilla vai pienellä USB-vastaanottimella."
      )};
    }
    if(q==="mouse_usb_port_test"){
      return {type:"answer",text:L(lang,
        "Try moving the mouse's USB plug to another USB port on the computer. Then tell me whether the cursor moves.",
        "Переставь USB-штекер мыши в другой USB-порт компьютера и скажи, начал ли двигаться курсор.",
        "Siirrä hiiren USB-liitin tietokoneen toiseen USB-porttiin ja kerro liikkuuko osoitin."
      )};
    }
    return {type:"answer",text:L(lang,
      "I mean the last question I asked. Tell me which part is unclear and I’ll say it more simply.",
      "Я имею в виду мой последний вопрос. Скажи, какая часть непонятна, и я объясню проще.",
      "Tarkoitan viimeistä kysymystäni. Kerro mikä kohta on epäselvä, niin selitän sen yksinkertaisemmin."
    )};
  }

  // Frequency replies remain attached to the current question.
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

window.ANITA_RESPONSES={version:"18.3",first,follow};
console.log("[ANITA v18.3] Response module loaded");
})();