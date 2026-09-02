/* ANITA v19 - Universal Conversation / Diagnostic Response Engine
   Purpose: one semantic reply parser + category workflows for all 200 training cases.
   This avoids adding one-off fixes for words such as "everywhere", "usb", "no it didn't".
*/
(function(){
"use strict";
const M=()=>window.ANITA_MEMORY;
function L(lang,en,ru,fi){return lang==="ru"?ru:lang==="fi"?fi:en;}

const objectNames={
  mouse:{en:"mouse",ru:"мышь",fi:"hiiri"}, keyboard:{en:"keyboard",ru:"клавиатура",fi:"näppäimistö"},
  display:{en:"monitor/display",ru:"монитор/экран",fi:"näyttö"}, audio_output:{en:"headphones/speakers",ru:"наушники/звук",fi:"kuulokkeet/ääni"},
  microphone:{en:"microphone",ru:"микрофон",fi:"mikrofoni"}, webcam:{en:"webcam",ru:"веб-камера",fi:"verkkokamera"},
  usb_storage:{en:"USB/storage device",ru:"USB/накопитель",fi:"USB/tallennuslaite"}, printer:{en:"printer",ru:"принтер",fi:"tulostin"},
  scanner:{en:"scanner",ru:"сканер",fi:"skanneri"}, game_controller:{en:"game controller",ru:"геймпад",fi:"peliohjain"},
  bluetooth:{en:"Bluetooth device",ru:"Bluetooth-устройство",fi:"Bluetooth-laite"}, dock_hub:{en:"dock/USB hub",ru:"док-станция/USB-хаб",fi:"telakka/USB-keskitin"},
  generic_device:{en:"device",ru:"устройство",fi:"laite"}, ram:{en:"RAM",ru:"оперативная память",fi:"RAM-muisti"},
  disk:{en:"drive",ru:"диск",fi:"levy"}, gpu:{en:"graphics card",ru:"видеокарта",fi:"näytönohjain"},
  windows:{en:"Windows",ru:"Windows",fi:"Windows"}, software:{en:"program",ru:"программа",fi:"ohjelma"}
};

function matchOf(category,issue){
  const mem=M()?.state||{};
  return mem.lastMatch||{id:null,category:category||mem.currentCategory||"generic_device",issue:issue||mem.currentIssue||"issue"};
}
function ask(text,q,expected,match){
  const mm=M(); match=match||matchOf();
  if(mm){
    mm.setIssue(match.category,match.issue,objectNames[match.category]?.en||match.category);
    mm.setQuestion(q,expected); mm.state.lastMatch=match;
    mm.push("assistant",text,{q,expected,caseId:match.id,source:"v19"});
  }
  return {type:"answer",text};
}
function answer(text,clear=false){
  if(clear&&M()) M().setQuestion(null,null);
  if(M()) M().push("assistant",text,{source:"v19"});
  return {type:"answer",text};
}

function malwareAssessment(name){
  try{return window.ANITA_MALWARE_KNOWLEDGE?.assess?.(String(name||""));}catch(_){return null;}
}
function processNameFrom(text){
  let t=String(text||"").trim();
  t=t.replace(/\b(?:cpu|processor)\b\s*(?:is|at|uses?|using)?\s*\d{1,3}\s*%?/ig," ")
     .replace(/\b\d{1,3}\s*%\s*(?:cpu)?\b/ig," ")
     .replace(/\b(?:100|[1-9]?\d)\s*%/g," ")
     .replace(/\b(?:is|using|uses|takes|taking|at)\s+(?:a\s+lot|alot|lots?|high|much)\s+(?:of\s+)?cpu\b/ig," ")
     .replace(/\s+/g," ").trim();
  return t.replace(/^[,:;\-\s]+|[,:;\-\s]+$/g,"");
}
function pctFrom(text){
  const m=String(text||"").match(/\b(100|[1-9]?\d)\s*%/);
  return m?Number(m[1]):null;
}
function processIdentityPrompt(lang,name,mal){
  const nm=name||L(lang,"that process","этот процесс","tuo prosessi");
  if(mal){
    const type=window.ANITA_MALWARE_KNOWLEDGE?.typeLabel?.(mal.entry.type,lang)||mal.entry.type;
    return L(lang,
      `The name "${nm}" resembles a known ${type} name, but the name alone does NOT prove infection. Do you recognize this app/process?`,
      `Название «${nm}» похоже на имя известной угрозы типа ${type}, но одно имя НЕ доказывает заражение. Ты узнаёшь эту программу/процесс?`,
      `Nimi "${nm}" muistuttaa tunnettua uhkanimeä (${type}), mutta pelkkä nimi EI todista tartuntaa. Tunnistatko tämän ohjelman/prosessin?`);
  }
  return L(lang,`Do you recognize the app/process "${nm}"?`,`Ты узнаёшь программу/процесс «${nm}»?`,`Tunnistatko ohjelman/prosessin "${nm}"?`);
}

function clean(v){
  return String(v||"").toLowerCase().trim()
    .replace(/[’']/g,"")
    .replace(/\bitr\b/g,"it").replace(/\bteh\b/g,"the")
    .replace(/\bdidnt\b/g,"did not").replace(/\bdoesnt\b/g,"does not")
    .replace(/\bdont\b/g,"do not").replace(/\bcant\b/g,"cannot")
    .replace(/\bwont\b/g,"will not").replace(/\bisnt\b/g,"is not")
    .replace(/[^a-z0-9а-яёäöå.#+%\-\s]/gi," ").replace(/\s+/g," ").trim();
}

/* One parser for replies to ALL question types. */
function parseReply(text,expected){
  const t=clean(text), words=t.split(/\s+/).filter(Boolean);
  const out={raw:text,clean:t,value:null,confidence:0};

  if(/^(what|what do you mean|huh|sorry what|what exactly|что|в смысле|не понял|не поняла|что именно|mitä|mitä tarkoitat)$/.test(t))
    return {...out,value:"clarify",confidence:1};

  const neg=/^(no|nope|nah|нет|неа|ei)\b/.test(t)||/\b(did not|does not|still not|still no|not working|no change|nothing happened|не работает|не заработ|ничего|без изменений|ei toimi|ei muuttunut)\b/.test(t);
  const pos=/^(yes|yeah|yep|yup|да|ага|kyllä|joo)\b/.test(t)||/\b(works now|working now|started working|it works|fixed|заработ|работает теперь|toimii nyt|alkoi toimia)\b/.test(t);
  if(["yes_no","yes_no_detail","result","capability_yes_no"].includes(expected)){
    if(neg) return {...out,value:"no",confidence:.98};
    if(pos) return {...out,value:"yes",confidence:.98};
    if(/\b(not sure|dont know|do not know|не знаю|не уверен|не уверена|en tiedä|en ole varma)\b/.test(t))
      return {...out,value:"unknown",confidence:.95};
  }
  if(expected==="taskmgr_process"){
    const percent=pctFrom(t), name=processNameFrom(t);
    if(name) return {...out,value:"process",name,percent,confidence:.9};
  }

  if(expected==="scope"){
    if(/\b(everywhere|all apps|all programs|all the time|windows too|desktop too|outside too|completely|nowhere|везде|во всех|вообще|полностью|на рабочем столе тоже|kaikkialla|kaikissa|kokonaan|muuallakin)\b/.test(t))
      return {...out,value:"everywhere",confidence:.96};
    if(/\b(only there|only in|just there|only game|only app|only program|только там|только в|лишь в|vain siellä|vain pelissä|vain ohjelmassa)\b/.test(t))
      return {...out,value:"only_app",confidence:.96};
  }

  if(expected==="connection_type"){
    if(/\b(bluetooth|bt|блютуз)\b/.test(t)) return {...out,value:"bluetooth",confidence:.98};
    if(/\b(usb receiver|receiver|dongle|usb dongle|приемник|приёмник|донгл|vastaanotin)\b/.test(t)) return {...out,value:"receiver",confidence:.98};
    if(/\b(wireless|беспровод|langaton)\b/.test(t)) return {...out,value:"wireless",confidence:.95};
    if(/\b(usb|wired|cable|провод|langallinen)\b/.test(t)) return {...out,value:"usb",confidence:.95};
    if(/\b(3.5|3 5|jack|audio jack|aux)\b/.test(t)) return {...out,value:"analog",confidence:.96};
    if(/\b(speaker|speakers|колонки|динамики|kaiutin|kaiuttimet)\b/.test(t)) return {...out,value:"speakers",confidence:.9};
  }

  if(expected==="context"){
    if(/\b(always|all the time|constantly|every time|всегда|постоянно|каждый раз|aina|jatkuvasti|joka kerta)\b/.test(t)) return {...out,value:"always",confidence:.95};
    if(/\b(game|games|gaming|игра|игры|игре|игр|peli|pelit|pelissä|pela)\b/.test(t)) return {...out,value:"games",confidence:.92};
    if(/\b(video|видео)\b/.test(t)) return {...out,value:"video",confidence:.9};
    if(/\b(wake|sleep|after sleep|после сна|lepotila)\b/.test(t)) return {...out,value:"wake",confidence:.92};
    if(/\b(update|updated|after update|обновлен|обновлён|päivity)\b/.test(t)) return {...out,value:"update",confidence:.94};
    if(/\b(installed|installing|after install|установ|asenn)\b/.test(t)) return {...out,value:"install",confidence:.9};
    if(/\b(suddenly|randomly|out of nowhere|внезап|случайн|yhtäkkiä|satunna)\b/.test(t)) return {...out,value:"sudden",confidence:.9};
  }

  if(expected==="boot_stage"){
    if(/\b(bios|uefi|manufacturer|manufacturer logo|логотип производителя|биос)\b/.test(t)) return {...out,value:"bios",confidence:.96};
    if(/\b(windows logo|windows screen|логотип windows)\b/.test(t)) return {...out,value:"windows_logo",confidence:.96};
    if(/\b(login|sign in|password screen|экран входа|kirjaut)\b/.test(t)) return {...out,value:"login",confidence:.96};
    if(/\b(desktop|рабочий стол|työpöytä)\b/.test(t)) return {...out,value:"desktop",confidence:.96};
    if(/\b(nothing|black screen|no image|ничего|черный экран|чёрный экран|ei mitään|musta ruutu)\b/.test(t)) return {...out,value:"none",confidence:.9};
  }

  if(expected==="symptom"){
    if(/\b(not open|will not open|does not open|not launch|will not launch|не запуска|не открыва|ei käynnisty|ei aukea)\b/.test(t)) return {...out,value:"launch",confidence:.94};
    if(/\b(freeze|frozen|stuck|not responding|завис|не отвечает|jum|ei vastaa)\b/.test(t)) return {...out,value:"freeze",confidence:.94};
    if(/\b(crash|crashes|crashed|closes|close itself|вылет|вылетает|закрывается|kaatu|kaatuu)\b/.test(t)) return {...out,value:"crash",confidence:.94};
    if(/\b(error|ошиб|virhe)\b/.test(t)) return {...out,value:"error",confidence:.94};
    if(/\b(wrong|incorrect|weird|неправильно|странно|väärin|oudosti)\b/.test(t)) return {...out,value:"wrong",confidence:.85};
  }

  if(expected==="detail"){
    if(neg) return {...out,value:"no",confidence:.9};
    if(pos) return {...out,value:"yes",confidence:.9};
  }

  // Open text is still a valid answer: never throw it away.
  if(t) return {...out,value:"text",text:t,confidence:words.length<=8?.65:.8};
  return out;
}

function first(match,lang){
  const c=match.category, issue=match.issue, obj=objectNames[c]||objectNames.generic_device;
  if(c==="mouse"){
    if(issue==="not_detected") return ask(L(lang,"Got it — the computer isn't detecting the mouse. Is it USB, Bluetooth, or wireless?","Поняла — компьютер не определяет мышь. Она USB, Bluetooth или беспроводная?","Selvä — tietokone ei tunnista hiirtä. Onko se USB-, Bluetooth- vai langaton hiiri?"),"mouse_connection_type","connection_type",match);
    if(issue==="scroll"||issue==="button_key") return ask(L(lang,"Got it — a mouse control is failing. Does it fail everywhere, or only in one program/game?","Поняла — не работает один из элементов мыши. Это во всех программах или только в одной игре/приложении?","Selvä — yksi hiiren toiminto ei toimi. Tapahtuuko se kaikkialla vai vain yhdessä ohjelmassa/pelissä?"),"mouse_control_scope","scope",match);
    return ask(L(lang,"Got it — the mouse isn't working properly. Does it fail everywhere in Windows, or only in one game/program?","Поняла — мышь работает неправильно. Она не работает во всём Windows или только в одной игре/программе?","Selvä — hiiri ei toimi oikein. Tapahtuuko ongelma kaikkialla Windowsissa vai vain yhdessä pelissä/ohjelmassa?"),"mouse_scope","scope",match);
  }
  if(c==="keyboard") return ask(L(lang,"Got it — this is a keyboard/input problem. Does it happen everywhere in Windows, or only in one program/game?","Поняла — проблема с клавиатурой/вводом. Это происходит во всём Windows или только в одной программе/игре?","Selvä — kyse on näppäimistö-/syöttöongelmasta. Tapahtuuko se kaikkialla Windowsissa vai vain yhdessä ohjelmassa/pelissä?"),"keyboard_scope","scope",match);
  if(c==="display"){
    if(issue==="no_picture") return ask(L(lang,"Got it — there is no picture/signal. Does the monitor show its own menu or logo when you press its buttons?","Поняла — изображения/сигнала нет. Показывает ли монитор своё меню или логотип, если нажать его кнопки?","Selvä — kuva/signaali puuttuu. Näyttääkö näyttö oman valikkonsa tai logonsa, kun painat sen painikkeita?"),"display_own_menu","yes_no",match);
    return ask(L(lang,"Got it — this is a display problem. Is it happening all the time, or mainly during games/video, after sleep, or after an update?","Поняла — проблема с изображением. Она постоянная или в основном появляется в играх/видео, после сна или обновления?","Selvä — kyse on näyttöongelmasta. Tapahtuuko se jatkuvasti vai lähinnä peleissä/videossa, lepotilan tai päivityksen jälkeen?"),"display_when","context",match);
  }
  if(c==="audio_output") return ask(L(lang,"Got it — this is an audio-output problem. How is the device connected: Bluetooth, USB, 3.5 mm jack, or built-in/external speakers?","Поняла — проблема с выводом звука. Как устройство подключено: Bluetooth, USB, 3.5 мм или это встроенные/внешние колонки?","Selvä — kyse on äänentoistosta. Miten laite on liitetty: Bluetooth, USB, 3,5 mm vai kaiuttimet?"),"audio_connection","connection_type",match);
  if(c==="microphone") return ask(L(lang,"Got it — this is a microphone problem. Does it work in Windows Sound settings, or fail there too?","Поняла — проблема с микрофоном. Работает ли он в настройках звука Windows или там тоже нет?","Selvä — kyse on mikrofonista. Toimiiko se Windowsin ääniasetuksissa vai ei sielläkään?"),"mic_windows_test","scope",match);
  if(c==="webcam") return ask(L(lang,"Got it — this is a webcam problem. Does it work in the Windows Camera app, or fail there too?","Поняла — проблема с веб-камерой. Работает ли она в приложении «Камера» Windows или там тоже нет?","Selvä — kyse on verkkokamerasta. Toimiiko se Windowsin Kamera-sovelluksessa vai ei sielläkään?"),"webcam_windows_test","scope",match);
  if(["usb_storage","generic_device","dock_hub","bluetooth","game_controller","printer","scanner"].includes(c)) return ask(L(lang,`Got it — this is a ${obj.en} connection/detection problem. When you connect it, does Windows react at all — sound, popup, or Device Manager change?`,`Поняла — проблема с подключением/определением устройства. Когда подключаешь его, Windows хоть как-то реагирует — звук, уведомление или изменение в Диспетчере устройств?`,`Selvä — kyse on laitteen yhteys-/tunnistusongelmasta. Reagoiko Windows mitenkään — ääni, ilmoitus tai muutos Laitehallinnassa?`),"device_connect_reaction","detail",match);
  if(c==="ram") return ask(L(lang,"Got it — this is a RAM problem. Was the RAM recently installed/changed?","Поняла — проблема с RAM. Оперативную память недавно устанавливали или меняли?","Selvä — kyse on RAM-ongelmasta. Asennettiinko tai vaihdettiinko muistia äskettäin?"),"ram_changed","yes_no_detail",match);
  if(c==="disk"){
    if(issue==="noise") return ask(L(lang,"A clicking HDD can indicate a failing drive. Avoid unnecessary writes. Is important data already backed up?","Щелчки HDD могут указывать на неисправность. Не записывай на диск лишнее. Важные данные уже сохранены в резервной копии?","Naksuva HDD voi viitata vikaan. Vältä turhaa kirjoittamista. Onko tärkeät tiedot jo varmuuskopioitu?"),"disk_backup","yes_no",match);
    return ask(L(lang,"Got it — this is a drive/storage problem. Is the drive visible in Windows Disk Management?","Поняла — проблема с диском/накопителем. Видно ли его в «Управлении дисками» Windows?","Selvä — kyse on levy-/tallennusongelmasta. Näkyykö levy Windowsin Levynhallinnassa?"),"disk_management_visible","yes_no",match);
  }
  if(c==="gpu") return ask(L(lang,"Got it — this is a GPU problem. Did it start after installing/updating something, or did it appear suddenly?","Поняла — проблема с видеокартой. Она началась после установки/обновления или появилась внезапно?","Selvä — kyse on näytönohjaimesta. Alkoiko ongelma asennuksen/päivityksen jälkeen vai yhtäkkiä?"),"gpu_change","context",match);
  if(c==="windows" && (issue==="poor_system_performance"||issue==="high_cpu_process"||issue==="slow")){
    if(issue==="high_cpu_process") return ask(L(lang,
      "Okay — one program/process is using a lot of CPU. What is the exact process/app name, and roughly what CPU percentage does it show?",
      "Хорошо — одна программа/процесс сильно загружает CPU. Как точно называется процесс/программа и примерно какой процент CPU он показывает?",
      "Selvä — yksi ohjelma/prosessi käyttää paljon CPU:ta. Mikä on tarkka nimi ja noin kuinka monta prosenttia CPU:ta se käyttää?"),
      "taskmgr_cpu_top","taskmgr_process",match);
    return ask(L(lang,
      "Got it — Windows is running slowly. First open Task Manager with Ctrl+Shift+Esc. Can you open it?",
      "Поняла — Windows работает медленно. Сначала открой Диспетчер задач через Ctrl+Shift+Esc. Он открывается?",
      "Selvä — Windows toimii hitaasti. Avaa ensin Tehtävienhallinta painamalla Ctrl+Shift+Esc. Aukeaako se?"),
      "task_manager_opens","capability_yes_no",match);
  }
  if(c==="windows") return ask(L(lang,"Got it — this is a Windows system/startup problem. How far does the PC get: BIOS/manufacturer logo, Windows logo, login screen, or desktop?","Поняла — проблема с Windows. До какого этапа доходит компьютер: BIOS/логотип производителя, логотип Windows, экран входа или рабочий стол?","Selvä — kyse on Windowsista. Mihin asti kone pääsee: BIOS/valmistajan logo, Windows-logo, kirjautumisruutu vai työpöytä?"),"windows_stage","boot_stage",match);
  if(c==="software") return ask(L(lang,"Got it — this is a program/application problem. What is the program's name?","Поняла — проблема с программой/приложением. Как называется программа?","Selvä — kyse on ohjelmasta/sovelluksesta. Mikä ohjelman nimi on?"),"software_name","text",match);
  return ask(L(lang,"Got it. Is the problem constant, or does it happen only sometimes/in a specific situation?","Поняла. Проблема постоянная или появляется только иногда/в определённой ситуации?","Selvä. Onko ongelma jatkuva vai tapahtuuko se vain joskus/tietyssä tilanteessa?"),"generic_frequency","context",match);
}

function connectionStep(prefix,kind,lang,match){
  if(kind==="wireless") return ask(L(lang,`Okay — ${prefix} is wireless. Is it Bluetooth, or does it use a small USB receiver/dongle?`,`Хорошо — ${prefix} беспроводная/беспроводное. Это Bluetooth или маленький USB-приёмник/донгл?`,`Hyvä — ${prefix} on langaton. Onko se Bluetooth vai pieni USB-vastaanotin?`),"wireless_kind","connection_type",match);
  if(kind==="bluetooth") return ask(L(lang,"Turn Bluetooth off and back on, then remove/re-pair the device if possible. Does it work now?","Выключи и снова включи Bluetooth, затем при возможности удали устройство и подключи заново. Теперь работает?","Kytke Bluetooth pois ja takaisin päälle ja parita laite uudelleen, jos mahdollista. Toimiiko se nyt?"),"connection_test_result","result",match);
  if(kind==="receiver") return ask(L(lang,"Move the USB receiver to another USB port, preferably directly on the PC. Does it work now?","Переставь USB-приёмник в другой USB-порт, лучше напрямую в компьютер. Теперь работает?","Siirrä USB-vastaanotin toiseen USB-porttiin, mieluiten suoraan tietokoneeseen. Toimiiko se nyt?"),"connection_test_result","result",match);
  if(kind==="usb") return ask(L(lang,"Reconnect it and try another USB port, preferably directly on the PC. Does it work now?","Переподключи устройство и попробуй другой USB-порт, лучше напрямую в компьютер. Теперь работает?","Liitä laite uudelleen ja kokeile toista USB-porttia, mieluiten suoraan tietokoneeseen. Toimiiko se nyt?"),"connection_test_result","result",match);
  if(kind==="analog") return ask(L(lang,"Reconnect the 3.5 mm plug fully and check that Windows has the correct output/input device selected. Does it work now?","Вставь штекер 3.5 мм до конца и проверь, что в Windows выбрано правильное устройство звука. Теперь работает?","Työnnä 3,5 mm liitin kunnolla sisään ja tarkista oikea äänilaite Windowsissa. Toimiiko se nyt?"),"connection_test_result","result",match);
  return ask(L(lang,"Check the physical connection and reconnect the device. Does it work now?","Проверь подключение и переподключи устройство. Теперь работает?","Tarkista liitäntä ja yhdistä laite uudelleen. Toimiiko se nyt?"),"connection_test_result","result",match);
}

function genericResultNext(lang,match){
  const c=match.category;
  if(c==="mouse"||c==="keyboard"||["usb_storage","generic_device","dock_hub","game_controller","printer","scanner","bluetooth"].includes(c))
    return ask(L(lang,"It still fails. Next, test the device on another computer if possible, or test another known-working device on this computer. What happens?","Проблема осталась. Следующий шаг: если возможно, проверь устройство на другом компьютере или подключи к этому ПК заведомо рабочее устройство. Что происходит?","Ongelma jatkuu. Kokeile laitetta toisessa tietokoneessa tai toista toimivaa laitetta tässä koneessa. Mitä tapahtuu?"),"cross_test_result","detail",match);
  if(c==="display") return ask(L(lang,"It still fails. Try another cable/input (HDMI/DisplayPort) if available and make sure the monitor input source matches the cable. Any picture now?","Проблема осталась. Попробуй другой кабель/вход HDMI/DisplayPort и проверь источник сигнала на мониторе. Изображение появилось?","Ongelma jatkuu. Kokeile toista kaapelia/tuloa ja tarkista näytön tulolähde. Tuleeko kuva nyt?"),"display_cable_result","result",match);
  if(c==="audio_output"||c==="microphone"||c==="webcam") return ask(L(lang,"It still fails. Open Windows Settings and check that the correct device is selected and allowed by privacy permissions. Does Windows detect it there?","Проблема осталась. Открой параметры Windows, проверь правильное устройство и разрешения конфиденциальности. Windows видит устройство там?","Ongelma jatkuu. Avaa Windowsin asetukset, tarkista oikea laite ja tietosuojaoikeudet. Tunnistaako Windows laitteen siellä?"),"windows_device_visible","yes_no",match);
  if(c==="ram") return ask(L(lang,"Next check BIOS/UEFI: does it show the full amount of installed RAM?","Следующий шаг — проверь BIOS/UEFI: он показывает весь установленный объём RAM?","Seuraavaksi tarkista BIOS/UEFI: näkyykö siellä koko asennettu RAM-määrä?"),"ram_bios_full","yes_no",match);
  if(c==="disk") return ask(L(lang,"Next check Device Manager and Disk Management. Does the drive appear in either one?","Следующий шаг — проверь Диспетчер устройств и Управление дисками. Диск виден хотя бы в одном из них?","Tarkista seuraavaksi Laitehallinta ja Levynhallinta. Näkyykö levy kummassakaan?"),"disk_seen_anywhere","yes_no",match);
  if(c==="gpu") return ask(L(lang,"Next, check Device Manager > Display adapters. Is the GPU listed there, and is there a warning icon?","Следующий шаг — Диспетчер устройств → Видеоадаптеры. Видеокарта там есть и есть ли жёлтый значок предупреждения?","Seuraavaksi Laitehallinta > Näyttösovittimet. Näkyykö GPU siellä ja onko varoituskuvaketta?"),"gpu_device_manager","detail",match);
  if(c==="windows") return ask(L(lang,"Next, open Windows Recovery/Automatic Repair if available and try Startup Repair. Tell me whether it reports a repair, an error, or no change.","Дальше открой среду восстановления Windows/Автоматическое восстановление и попробуй «Восстановление при загрузке». Напиши: исправило, показало ошибку или ничего не изменилось.","Avaa Windowsin palautus/automaattinen korjaus ja kokeile Käynnistyksen korjausta. Kerro korjasiko se, tuliko virhe vai ei muutosta."),"windows_repair_result","detail",match);
  if(c==="software") return ask(L(lang,"Next, restart Windows and launch the program once as administrator. Does it open, crash, freeze, or show an error?","Дальше перезагрузи Windows и один раз запусти программу от имени администратора. Она открывается, вылетает, зависает или показывает ошибку?","Käynnistä Windows uudelleen ja käynnistä ohjelma kerran järjestelmänvalvojana. Aukeaako se, kaatuuko, jäätyykö vai tuleeko virhe?"),"software_after_admin","symptom",match);
  return ask(L(lang,"The first check did not solve it. Tell me exactly what changed, if anything, after the step.","Первый шаг не помог. Напиши, изменилось ли хоть что-нибудь после него.","Ensimmäinen vaihe ei ratkaissut ongelmaa. Kerro muuttuiko jokin sen jälkeen."),"generic_after_test","detail",match);
}

/* ============================================================
   ANITA v19.2 — DIAGNOSTIC EVIDENCE CORE
   ------------------------------------------------------------
   Cross-testing is not just a yes/no answer.

   It distinguishes:
   A) original device on another computer
   B) another known-good device on THIS computer
   C) another device on another computer (not diagnostic)
   D) incomplete/ambiguous result

   This is intentionally generic so it can be reused by mouse,
   keyboard, printer, scanner, controller and other peripherals.
   ============================================================ */

function normalizeEvidenceText(text){
  return String(text||"").toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/\bdoesn['’]?t\b|\bdoesnt\b/g,"does not")
    .replace(/\bdidn['’]?t\b|\bdidnt\b/g,"did not")
    .replace(/\bisn['’]?t\b|\bisnt\b/g,"is not")
    .replace(/\baren['’]?t\b|\barent\b/g,"are not")
    .replace(/\bwon['’]?t\b|\bwont\b/g,"will not")
    .replace(/\bcant\b|\bcan['’]?t\b/g,"cannot")
    .replace(/[.,!?;:()[\]{}]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function categoryTerms(category){
  const map={
    mouse:{
      en:["mouse","mice"],
      ru:["мышь","мышка","мыши","мышку"],
      fi:["hiiri","hiiren"]
    },
    keyboard:{
      en:["keyboard"],
      ru:["клавиатура","клавиатуру","клава"],
      fi:["näppäimistö","näppäimistön"]
    },
    printer:{
      en:["printer"],
      ru:["принтер","принтером"],
      fi:["tulostin","tulostimen"]
    },
    scanner:{
      en:["scanner"],
      ru:["сканер"],
      fi:["skanneri","skannerin"]
    },
    game_controller:{
      en:["controller","gamepad"],
      ru:["геймпад","контроллер"],
      fi:["peliohjain","ohjain"]
    },
    usb_storage:{
      en:["usb device","flash drive","usb drive","external drive"],
      ru:["usb устройство","флешка","usb накопитель","внешний диск"],
      fi:["usb-laite","muistitikku","ulkoinen levy"]
    },
    generic_device:{
      en:["device"],
      ru:["устройство"],
      fi:["laite"]
    },
    dock_hub:{
      en:["dock","hub","usb hub"],
      ru:["док","хаб","usb хаб"],
      fi:["telakka","usb-hubi","hubi"]
    },
    bluetooth:{
      en:["device","bluetooth device"],
      ru:["устройство","bluetooth устройство"],
      fi:["laite","bluetooth-laite"]
    }
  };
  return map[category] || map.generic_device;
}

function hasAnyPhrase(text, arr){
  return arr.some(function(x){
    return text.indexOf(x)>=0;
  });
}

function parseCrossTestEvidence(text, category){
  const t=normalizeEvidenceText(text);
  const terms=categoryTerms(category);
  const deviceTerms=[...terms.en,...terms.ru,...terms.fi];

  const positive =
    /\b(works|work|working|responds|detected|recognized|recognised|toimii|toimi|работает|заработал|заработала|определяется|видит)\b/.test(t) &&
    !/\b(does not work|did not work|not working|still not|does not respond|not detected|not recognized|not recognised|ei toimi|не работает|не заработал|не заработала|не определяется|не видит)\b/.test(t);

  const negative =
    /\b(does not work|did not work|not working|still not|does not respond|not detected|not recognized|not recognised|ei toimi|ei vieläkään|не работает|не заработал|не заработала|всё ещё не|все еще не|не определяется|не видит)\b/.test(t);

  const mentionsAnotherDevice =
    /\b(another|other|different|known good|known-good|second|другая|другой|другое|другую|другим|заведомо рабоч|toinen|toista|muu)\b/.test(t) &&
    hasAnyPhrase(t,deviceTerms);

  const mentionsOriginalDevice =
    /\b(my|this|the same|same|original|мой|моя|моё|эта|этот|тот же|оригиналь|tämä|sama|minun)\b/.test(t) &&
    hasAnyPhrase(t,deviceTerms);

  const anotherComputer =
    /\b(another computer|other computer|different computer|another pc|other pc|second computer|другом компьютере|другой компьютер|другом пк|другой пк|toisessa tietokoneessa|toinen tietokone)\b/.test(t);

  const thisComputer =
    /\b(this computer|this pc|my computer|my pc|same computer|same pc|этом компьютере|этот компьютер|моем компьютере|моём компьютере|моем пк|моём пк|tässä tietokoneessa|tällä tietokoneella|samassa tietokoneessa)\b/.test(t);

  // Common conversational ellipsis:
  // "it doesn't work on another computer" means the original/current device.
  const pronounOriginal =
    /\b(it|itself|оно|она|он|se)\b/.test(t) && anotherComputer;

  // Explicit combinations.
  if((mentionsOriginalDevice || pronounOriginal) && anotherComputer && negative){
    return {kind:"original_device_fails_elsewhere",confidence:.97,text:t};
  }

  if((mentionsOriginalDevice || pronounOriginal) && anotherComputer && positive){
    return {kind:"original_device_works_elsewhere",confidence:.97,text:t};
  }

  if(mentionsAnotherDevice && thisComputer && positive){
    return {kind:"other_device_works_here",confidence:.97,text:t};
  }

  if(mentionsAnotherDevice && thisComputer && negative){
    return {kind:"other_device_fails_here",confidence:.97,text:t};
  }

  // Important case from the user's test:
  // "On another computer, another keyboard works"
  // This proves only that a different keyboard + different computer work together.
  if(mentionsAnotherDevice && anotherComputer && positive){
    return {kind:"other_device_works_elsewhere",confidence:.97,text:t};
  }

  if(mentionsAnotherDevice && anotherComputer && negative){
    return {kind:"other_device_fails_elsewhere",confidence:.90,text:t};
  }

  // If the reply just says "it still doesn't work" while cross-test is active,
  // preserve the diagnostic state and ask WHICH test was actually performed.
  if(negative){
    return {kind:"failed_unspecified",confidence:.82,text:t};
  }
  if(positive){
    return {kind:"worked_unspecified",confidence:.82,text:t};
  }

  return {kind:"unknown",confidence:.35,text:t};
}

function crossTestNext(text,lang,match){
  const c=match.category;
  const e=parseCrossTestEvidence(text,c);
  const obj=objectNames[c] || objectNames.generic_device;

  M().fact("crossTestEvidence",e.kind);
  M().fact("crossTestText",String(text||""));

  if(e.kind==="original_device_fails_elsewhere"){
    M().fact("diagnosticConclusion","device_likely_faulty");
    return answer(L(lang,
      `That is useful: the same ${obj.en} also fails on another computer. That makes the ${obj.en} itself (or its own cable/receiver) much more likely to be the problem, not Windows on the first PC. If it has a removable cable/receiver/batteries, test or replace those first; otherwise the device is likely faulty.`,
      `Это полезный результат: та же ${obj.ru} не работает и на другом компьютере. Значит, гораздо вероятнее проблема в самом устройстве (или его кабеле/приёмнике), а не в Windows на первом ПК. Если кабель/приёмник/батарейки съёмные — сначала проверь или замени их; иначе само устройство, вероятно, неисправно.`,
      `Tämä on hyödyllinen tulos: sama ${obj.fi} ei toimi toisessakaan tietokoneessa. Siksi vika on todennäköisemmin itse laitteessa (tai sen kaapelissa/vastaanottimessa) kuin ensimmäisen tietokoneen Windowsissa. Jos kaapeli/vastaanotin/paristot ovat vaihdettavia, testaa ne ensin; muuten laite on todennäköisesti viallinen.`
    ),true);
  }

  if(e.kind==="original_device_works_elsewhere"){
    M().fact("diagnosticConclusion","computer_side_likely");
    return ask(L(lang,
      `Good test: the same ${obj.en} works on another computer. That means the ${obj.en} itself is probably okay, so the problem is more likely on this PC — port, Bluetooth/receiver connection, driver, or Windows settings. On the problem PC, does another known-working ${obj.en} work?`,
      `Хорошая проверка: та же ${obj.ru} работает на другом компьютере. Значит, само устройство, скорее всего, исправно, а проблема вероятнее на этом ПК — порт, Bluetooth/приёмник, драйвер или настройки Windows. На проблемном ПК другая заведомо рабочая ${obj.ru} работает?`,
      `Hyvä testi: sama ${obj.fi} toimii toisessa tietokoneessa. Itse laite on siis todennäköisesti kunnossa, ja vika on todennäköisemmin tässä tietokoneessa — portissa, Bluetooth-/vastaanotinyhteydessä, ajurissa tai Windows-asetuksissa. Toimiiko tässä ongelmakoneessa toinen varmasti toimiva ${obj.fi}?`
    ),"cross_test_confirm_computer","detail",match);
  }

  if(e.kind==="other_device_works_here"){
    M().fact("diagnosticConclusion","original_device_likely_faulty");
    return answer(L(lang,
      `That is a strong clue: another ${obj.en} works on the problem computer. So the PC/port can work, and the original ${obj.en} is now the more likely cause. Test the original device on another computer once if possible; if it fails there too, the device is very likely faulty.`,
      `Это сильная подсказка: другая ${obj.ru} работает на проблемном компьютере. Значит, ПК/порт в принципе работают, и теперь вероятнее проблема в исходном устройстве. Если возможно, один раз проверь исходное устройство на другом компьютере; если и там не работает — оно почти наверняка неисправно.`,
      `Tämä on vahva vihje: toinen ${obj.fi} toimii ongelmakoneessa. Tietokone/portti siis pystyy toimimaan, joten alkuperäinen laite on nyt todennäköisempi syy. Testaa alkuperäinen laite toisessa tietokoneessa, jos mahdollista; jos se ei toimi sielläkään, laite on hyvin todennäköisesti viallinen.`
    ),true);
  }

  if(e.kind==="other_device_fails_here"){
    M().fact("diagnosticConclusion","computer_side_likely");
    return ask(L(lang,
      `That points toward this computer rather than one bad ${obj.en}, because another ${obj.en} also fails here. Next, open Device Manager and check whether the device appears or whether there is a yellow warning icon. What do you see?`,
      `Это уже указывает скорее на этот компьютер, а не на одно неисправное устройство, потому что другая ${obj.ru} тоже здесь не работает. Следующий шаг: открой Диспетчер устройств и проверь, появляется ли устройство и есть ли жёлтый значок предупреждения. Что ты видишь?`,
      `Tämä viittaa enemmän tähän tietokoneeseen kuin yhteen viallisten laitteeseen, koska toinenkin ${obj.fi} ei toimi tässä. Avaa seuraavaksi Laitehallinta ja tarkista näkyykö laite tai keltainen varoituskuvake. Mitä näet?`
    ),"device_manager_cross_test","detail",match);
  }

  if(e.kind==="other_device_works_elsewhere"){
    // This is exactly the subtle case that previously caused a loop.
    return ask(L(lang,
      `I understand: another ${obj.en} works on another computer. That tells us that the other keyboard/device and the other computer are okay, but it does NOT yet isolate the problem with your original ${obj.en}. We need one crossed test: either (1) try your original ${obj.en} on the other computer, or (2) try that working ${obj.en} on the problem computer. Which one can you do?`,
      `Поняла: другая ${obj.ru} работает на другом компьютере. Это показывает, что другое устройство и другой компьютер исправны, но пока не отделяет причину проблемы с твоим исходным устройством. Нужна перекрёстная проверка: либо (1) подключить исходное устройство к другому компьютеру, либо (2) подключить рабочее устройство к проблемному компьютеру. Что из этого можешь проверить?`,
      `Ymmärsin: toinen ${obj.fi} toimii toisessa tietokoneessa. Se kertoo, että toinen laite ja toinen tietokone toimivat, mutta se ei vielä erota alkuperäisen laitteen vian syytä. Tarvitsemme ristiintestin: joko (1) kokeile alkuperäistä laitetta toisessa tietokoneessa tai (2) kokeile toimivaa laitetta ongelmakoneessa. Kumman voit tehdä?`
    ),"cross_test_result","detail",match);
  }

  if(e.kind==="failed_unspecified"){
    return ask(L(lang,
      `Got it — it still does not work. Which test did you do: did you try the original ${obj.en} on another computer, or did you try another ${obj.en} on this problem computer?`,
      `Поняла — всё ещё не работает. Уточни, какую проверку ты сделал: исходное устройство пробовал на другом компьютере или другое устройство пробовал на этом проблемном компьютере?`,
      `Selvä — se ei vieläkään toimi. Kumman testin teit: kokeilitko alkuperäistä laitetta toisessa tietokoneessa vai toista laitetta tässä ongelmakoneessa?`
    ),"cross_test_result","detail",match);
  }

  if(e.kind==="worked_unspecified"){
    return ask(L(lang,
      `Good — something worked, but I need to know which crossed test it was. Did the original ${obj.en} work on another computer, or did another ${obj.en} work on this problem computer?`,
      `Хорошо — что-то сработало, но нужно понять, какая именно перекрёстная проверка. Исходное устройство заработало на другом компьютере или другое устройство заработало на этом проблемном компьютере?`,
      `Hyvä — jokin toimi, mutta tarvitsen tiedon kummasta ristiintestistä. Toimiko alkuperäinen laite toisessa tietokoneessa vai toinen laite tässä ongelmakoneessa?`
    ),"cross_test_result","detail",match);
  }

  return ask(L(lang,
    `I’m keeping this as the same diagnostic step. Tell me the result in this form: “my ${obj.en} works/doesn't work on another computer” OR “another ${obj.en} works/doesn't work on this computer.”`,
    `Я держу это как тот же диагностический шаг. Напиши результат примерно так: «моё устройство работает/не работает на другом компьютере» ИЛИ «другое устройство работает/не работает на этом компьютере».`,
    `Pidän tämän samana diagnostiikkavaiheena. Kerro tulos esimerkiksi: “oma laite toimii/ei toimi toisessa tietokoneessa” TAI “toinen laite toimii/ei toimi tässä tietokoneessa”.`
  ),"cross_test_result","detail",match);
}

function follow(text,lang){
  const mem=M()?.state; if(!mem||!mem.lastQuestion) return null;
  const q=mem.lastQuestion, expected=mem.expected, p=parseReply(text,expected), match=matchOf();
  const c=match.category;
  M().fact("lastReply",p.value||p.clean); M().fact("lastReplyQuestion",q);

  /* v25: capability checks are not success checks. */
  if(q==="task_manager_opens"){
    if(p.value==="yes"){
      M().fact("taskManagerOpened",true);
      return ask(L(lang,
        "Good. Opening Task Manager only confirms that we can continue diagnostics — it does not mean the slow-PC problem is fixed. In the Processes tab, click the CPU column so the highest usage is at the top. Tell me the exact process/app name at the top and its CPU percentage.",
        "Хорошо. Открытие Диспетчера задач только подтверждает, что мы можем продолжить диагностику — это не значит, что проблема уже исправлена. Во вкладке «Процессы» нажми на столбец CPU, чтобы самая высокая загрузка была сверху. Напиши точное имя процесса/программы сверху и процент CPU.",
        "Hyvä. Tehtävienhallinnan avautuminen tarkoittaa vain, että voimme jatkaa diagnostiikkaa — se ei tarkoita, että hitaus olisi korjattu. Avaa Prosessit ja järjestä CPU-sarake suurimmasta pienimpään. Kerro ylimmän prosessin/ohjelman tarkka nimi ja CPU-prosentti."),
        "taskmgr_cpu_top","taskmgr_process",match);
    }
    if(p.value==="no"){
      return ask(L(lang,
        "Okay. Try right-clicking Start and choosing Task Manager. Does it open that way?",
        "Хорошо. Нажми правой кнопкой по «Пуск» и выбери «Диспетчер задач». Так он открывается?",
        "Selvä. Napsauta Käynnistä-painiketta hiiren oikealla ja valitse Tehtävienhallinta. Aukeaako se näin?"),
        "task_manager_alt_open","capability_yes_no",match);
    }
  }
  if(q==="task_manager_alt_open"){
    if(p.value==="yes") return ask(L(lang,
      "Good. In Processes, click CPU to sort highest first. Tell me the exact process/app name at the top and its CPU percentage.",
      "Хорошо. В «Процессах» нажми CPU для сортировки по убыванию. Напиши точное имя процесса/программы сверху и процент CPU.",
      "Hyvä. Järjestä Prosessit CPU:n mukaan suurimmasta pienimpään ja kerro ylimmän prosessin nimi sekä CPU-prosentti."),
      "taskmgr_cpu_top","taskmgr_process",match);
    if(p.value==="no") return answer(L(lang,
      "Task Manager is not opening, so I would not treat this as a successful step. Restart Windows once if you have not already, then try again. If Task Manager still will not open, tell me that and we will use another route.",
      "Диспетчер задач не открывается, значит этот шаг не выполнен. Если ещё не перезагружал Windows — перезагрузи один раз и попробуй снова. Если Диспетчер задач всё равно не открывается, скажи мне — пойдём другим путём.",
      "Tehtävienhallinta ei aukea, joten vaihe ei onnistunut. Käynnistä Windows kerran uudelleen, jos et ole vielä tehnyt sitä, ja kokeile uudelleen. Jos se ei vieläkään aukea, kerro siitä ja käytämme toista tapaa."),false);
  }
  if(q==="taskmgr_cpu_top"){
    const raw=String(text||"").trim();
    const genericCpu=/^(?:1|one|a)\s+(?:programm?|process|app|application)\b.{0,50}\b(?:using|uses?|taking|takes?|eating|eats?)\b.{0,30}\bcpu\b|^(?:1|одна|один)\s+(?:программ|процесс|приложен)\w*.{0,50}\b(?:грузит|использует|жр[её]т)\w*.{0,30}\bcpu\b|^yksi\s+(?:ohjelma|prosessi)\b.{0,50}\bkäyttää\b.{0,30}\bcpu\b/i.test(raw);
    const name=processNameFrom(text), percent=(p.percent!==undefined?p.percent:pctFrom(text));
    if(genericCpu || !name || /^(?:(?:one|1|a)\s+)?(?:process|programm?|app|application|процесс|программа|приложение|ohjelma|prosessi)$/i.test(name)){
      return ask(L(lang,
        "Please tell me the exact name shown in Task Manager, for example \"Chrome\" or \"Antimalware Service Executable\", and if possible the CPU percentage.",
        "Напиши точное имя из Диспетчера задач, например «Chrome» или «Antimalware Service Executable», и по возможности процент CPU.",
        "Kerro Tehtävienhallinnassa näkyvä tarkka nimi, esimerkiksi \"Chrome\" tai \"Antimalware Service Executable\", ja mielellään CPU-prosentti."),
        "taskmgr_cpu_top","taskmgr_process",match);
    }
    M().fact("highCpuProcess",name); if(percent!==null)M().fact("highCpuPercent",percent);
    const mal=malwareAssessment(name);
    if(mal)M().fact("malwareNameCandidate",{name:mal.entry.name,matched:name,confidence:mal.confidence,status:mal.status,type:mal.entry.type});
    return ask(processIdentityPrompt(lang,name,mal),"process_recognized","yes_no",match);
  }
  if(q==="process_recognized"){
    const name=M().state.facts.highCpuProcess||L(lang,"that process","этот процесс","tuo prosessi");
    const mal=M().state.facts.malwareNameCandidate;
    if(p.value==="yes"){
      if(mal){
        return ask(L(lang,
          `Even if you recognize "${name}", its name also resembles a known malware name, so let's verify it rather than assume either way. In Task Manager right-click it → Open file location. What folder/path opens?`,
          `Даже если ты узнаёшь «${name}», его имя также похоже на известное имя вредоносной программы, поэтому лучше проверить, а не делать вывод по названию. В Диспетчере задач нажми по нему правой кнопкой → «Открыть расположение файла». Какой путь/папка открывается?`,
          `Vaikka tunnistat "${name}", nimi muistuttaa myös tunnettua haittaohjelman nimeä, joten tarkistetaan se. Napsauta prosessia hiiren oikealla → Avaa tiedoston sijainti. Mikä polku/kansio avautuu?`),
          "process_file_location","detail",match);
      }
      return ask(L(lang,
        `If "${name}" is a normal app you opened yourself, save your work and close that app normally first — do not force-end it yet. After closing it, wait about 20 seconds. Does the CPU usage drop and does the PC feel faster?`,
        `Если «${name}» — обычная программа, которую ты сам открыл, сохрани работу и сначала закрой её обычным способом — пока не принудительно. Подожди около 20 секунд. Упала ли загрузка CPU и стал ли компьютер быстрее?`,
        `Jos "${name}" on tavallinen itse avaamasi ohjelma, tallenna työsi ja sulje ohjelma normaalisti — älä pakota lopetusta vielä. Odota noin 20 sekuntia. Laskeeko CPU-kuorma ja tuntuuko kone nopeammalta?`),
        "known_process_closed_result","result",match);
    }
    if(p.value==="no"||p.value==="unknown"||p.value==="text"){
      return ask(L(lang,
        `Do not delete or force-close "${name}" yet. First let's identify it safely. In Task Manager, right-click it → Open file location. What folder/path opens?`,
        `Пока не удаляй и не завершай принудительно «${name}». Сначала безопасно определим, что это. В Диспетчере задач нажми по нему правой кнопкой → «Открыть расположение файла». Какой путь/папка открывается?`,
        `Älä poista tai pakota "${name}"-prosessia vielä. Selvitetään ensin turvallisesti mikä se on. Napsauta Tehtävienhallinnassa hiiren oikealla → Avaa tiedoston sijainti. Mikä polku/kansio avautuu?`),
        "process_file_location","detail",match);
    }
  }
  if(q==="known_process_closed_result"){
    if(p.value==="yes"){
      return ask(L(lang,
        "Good — closing that app reduced the load and the PC became faster, so that app was at least contributing to the slowdown. Is the computer now running normally enough for you?",
        "Хорошо — после закрытия программы нагрузка упала и ПК стал быстрее, значит эта программа как минимум участвовала в замедлении. Сейчас компьютер работает достаточно нормально?",
        "Hyvä — ohjelman sulkeminen laski kuormaa ja kone nopeutui, joten ohjelma vaikutti ainakin osittain hitauteen. Toimiiko tietokone nyt riittävän normaalisti?"),
        "performance_final_check","result",match);
    }
    if(p.value==="no"){
      return ask(L(lang,
        "Okay — CPU was not the whole cause. In Task Manager click the Memory column. Tell me the overall Memory percentage and the process/app using the most memory.",
        "Хорошо — CPU был не единственной причиной. В Диспетчере задач нажми столбец «Память». Напиши общий процент использования памяти и процесс/программу, которая использует больше всего.",
        "Selvä — CPU ei ollut koko syy. Napsauta Tehtävienhallinnassa Muisti-saraketta. Kerro muistin kokonaisprosentti ja eniten muistia käyttävä prosessi/ohjelma."),
        "taskmgr_memory_top","detail",match);
    }
  }
  if(q==="taskmgr_memory_top"){
    const mp=pctFrom(text); if(mp!==null)M().fact("memoryPercent",mp);
    M().fact("memoryObservation",String(text||"").trim());
    return ask(L(lang,
      (mp!==null&&mp>=85?`Memory is around ${mp}%, which is high enough to contribute to slowness. `:"")+"Now click the Disk column. Tell me the overall Disk percentage and the process/app using the most disk activity.",
      (mp!==null&&mp>=85?`Память используется примерно на ${mp}%, это уже может заметно замедлять систему. `:"")+"Теперь нажми столбец «Диск». Напиши общий процент загрузки диска и процесс/программу с самой высокой активностью диска.",
      (mp!==null&&mp>=85?`Muistin käyttö on noin ${mp} %, mikä voi hidastaa konetta. `:"")+"Napsauta nyt Levy-saraketta. Kerro levyn kokonaisprosentti ja eniten levyä käyttävä prosessi/ohjelma."),
      "taskmgr_disk_top","detail",match);
  }
  if(q==="taskmgr_disk_top"){
    const dp=pctFrom(text); if(dp!==null)M().fact("diskPercent",dp);
    M().fact("diskObservation",String(text||"").trim());
    return ask(L(lang,
      (dp!==null&&dp>=90?`Disk usage is around ${dp}%, which can directly make Windows feel very slow. `:"")+"At this point we have checked CPU, Memory and Disk. Is the PC still noticeably slow?",
      (dp!==null&&dp>=90?`Диск загружен примерно на ${dp}%, и это само по себе может сильно замедлять Windows. `:"")+"Теперь мы проверили CPU, память и диск. Компьютер всё ещё заметно тормозит?",
      (dp!==null&&dp>=90?`Levyn käyttö on noin ${dp} %, mikä voi suoraan hidastaa Windowsia paljon. `:"")+"Nyt CPU, muisti ja levy on tarkistettu. Onko tietokone edelleen selvästi hidas?"),
      "performance_still_slow","result",match);
  }
  if(q==="performance_final_check"){
    if(p.value==="yes") return answer(L(lang,
      "Good — the slowdown has improved enough to close this diagnostic path. If it returns, note which Task Manager resource and process rise first.",
      "Хорошо — замедление достаточно уменьшилось, чтобы завершить эту диагностику. Если проблема вернётся, обрати внимание, какой ресурс и процесс в Диспетчере задач растут первыми.",
      "Hyvä — hitaus on helpottanut riittävästi. Jos ongelma palaa, katso mikä Tehtävienhallinnan resurssi ja prosessi nousevat ensin."),true);
    if(p.value==="no") return answer(L(lang,
      "Okay — it is still slow even after checking the obvious CPU/Memory/Disk load. The next useful checks are free space, Startup apps, Windows Update and a Windows Security scan. We should continue with those rather than randomly ending processes.",
      "Хорошо — ПК всё ещё медленный даже после проверки очевидной нагрузки CPU/памяти/диска. Дальше полезно проверить свободное место, автозагрузку, Windows Update и выполнить проверку Windows Security, а не завершать случайные процессы.",
      "Selvä — kone on edelleen hidas CPU-/muisti-/levytarkistuksen jälkeen. Seuraavaksi kannattaa tarkistaa vapaa tila, käynnistyssovellukset, Windows Update ja Windows Security -tarkistus eikä lopettaa satunnaisia prosesseja."),true);
  }

  if(q==="performance_still_slow"){
    if(p.value==="yes") return answer(L(lang,
      "Okay — it is still slow even after checking the obvious CPU/Memory/Disk load. The next useful checks are free space, Startup apps, Windows Update and a Windows Security scan. We should continue with those rather than randomly ending processes.",
      "Хорошо — ПК всё ещё медленный даже после проверки очевидной нагрузки CPU/памяти/диска. Дальше полезно проверить свободное место, автозагрузку, Windows Update и выполнить проверку Windows Security, а не завершать случайные процессы.",
      "Selvä — kone on edelleen hidas CPU-/muisti-/levytarkistuksen jälkeen. Seuraavaksi kannattaa tarkistaa vapaa tila, käynnistyssovellukset, Windows Update ja Windows Security -tarkistus eikä lopettaa satunnaisia prosesseja."),true);
    if(p.value==="no") return answer(L(lang,
      "Good — the PC is no longer noticeably slow. If the slowdown returns, note which Task Manager resource and process rise first.",
      "Хорошо — компьютер больше не тормозит заметно. Если проблема вернётся, обрати внимание, какой ресурс и процесс в Диспетчере задач растут первыми.",
      "Hyvä — tietokone ei ole enää selvästi hidas. Jos hitaus palaa, katso mikä Tehtävienhallinnan resurssi ja prosessi nousevat ensin."),true);
  }

  if(q==="process_file_location"){
    M().fact("processFileLocation",String(text||"").trim());
    return ask(L(lang,
      "Now right-click the file → Properties. Look for Publisher/Company name and, if present, Digital Signatures. What publisher/company is shown?",
      "Теперь нажми по файлу правой кнопкой → «Свойства». Посмотри «Издатель/Компания» и, если есть, «Цифровые подписи». Какой издатель/компания указаны?",
      "Napsauta tiedostoa hiiren oikealla → Ominaisuudet. Tarkista Julkaisija/Yritys ja mahdolliset Digitaaliset allekirjoitukset. Mikä julkaisija/yritys näkyy?"),
      "process_publisher","detail",match);
  }
  if(q==="process_publisher"){
    M().fact("processPublisher",String(text||"").trim());
    return ask(L(lang,
      "Good. Next run a Windows Security scan. If the file's context menu has “Scan with Microsoft Defender”, use it; otherwise open Windows Security → Virus & threat protection → Quick scan. Does Windows Security report a threat?",
      "Хорошо. Теперь запусти проверку Windows Security. Если в контекстном меню файла есть «Проверить с помощью Microsoft Defender» — используй её; иначе открой Безопасность Windows → Защита от вирусов и угроз → Быстрая проверка. Windows Security сообщает об угрозе?",
      "Hyvä. Suorita seuraavaksi Windows Security -tarkistus. Jos tiedoston valikossa on “Scan with Microsoft Defender”, käytä sitä; muuten Windows Security → Virus & threat protection → Quick scan. Ilmoittaako Windows Security uhasta?"),
      "security_scan_threat","yes_no",match);
  }
  if(q==="security_scan_threat"){
    if(p.value==="yes"){
      return answer(L(lang,
        "That is much stronger evidence than the process name alone. Follow Windows Security's quarantine/remove recommendation. If it asks for a restart, note the threat/process name first because the current ANITA conversation may be lost after reboot. After remediation, check whether CPU usage and PC speed return to normal.",
        "Это уже гораздо более сильное доказательство, чем одно название процесса. Выполни рекомендацию Windows Security по карантину/удалению. Если потребуется перезагрузка, сначала запиши название угрозы/процесса, потому что текущий разговор с ANITA после перезапуска может потеряться. После очистки проверь, нормализовались ли CPU и скорость ПК.",
        "Tämä on paljon vahvempi todiste kuin pelkkä prosessin nimi. Noudata Windows Securityn karanteeni-/poistosuositusta. Jos uudelleenkäynnistys vaaditaan, kirjoita uhkan/prosessin nimi muistiin, koska nykyinen ANITA-keskustelu voi kadota. Tarkista sen jälkeen CPU-kuorma ja koneen nopeus."),true);
    }
    if(p.value==="no"){
      return ask(L(lang,
        "No threat was reported, so I would not call it malware based on the name alone. Go back to Task Manager and tell me whether that process is still using unusually high CPU.",
        "Угроза не обнаружена, поэтому по одному названию я не буду считать процесс вредоносным. Вернись в Диспетчер задач и скажи, продолжает ли этот процесс необычно сильно загружать CPU.",
        "Uhkaa ei löytynyt, joten en pidä prosessia haittaohjelmana pelkän nimen perusteella. Palaa Tehtävienhallintaan ja kerro käyttääkö prosessi edelleen poikkeuksellisen paljon CPU:ta."),
        "post_scan_cpu_high","yes_no",match);
    }
  }

  if(p.value==="clarify"){
    const clar={
      keyboard_scope:L(lang,"I mean: does the keyboard fail on the Windows desktop and in every program, or only inside one app/game?","Я имею в виду: клавиатура не работает на рабочем столе Windows и во всех программах или только в одном приложении/игре?","Tarkoitan: eikö näppäimistö toimi Windowsin työpöydällä ja kaikissa ohjelmissa vai vain yhdessä sovelluksessa/pelissä?"),
      mouse_scope:L(lang,"I mean: does the mouse fail on the Windows desktop too, or only inside one game/program?","Я имею в виду: мышь не работает и на рабочем столе Windows или только в одной игре/программе?","Tarkoitan: eikö hiiri toimi myös Windowsin työpöydällä vai vain yhdessä pelissä/ohjelmassa?"),
      wireless_kind:L(lang,"I’m asking whether the wireless device uses Bluetooth or a small USB receiver/dongle plugged into the PC.","Я спрашиваю, подключается ли беспроводное устройство через Bluetooth или через маленький USB-приёмник/донгл.","Kysyn käyttääkö langaton laite Bluetoothia vai pientä USB-vastaanotinta."),
      windows_stage:L(lang,"I’m asking what you can see before Windows stops: manufacturer/BIOS screen, Windows logo, login screen, or desktop.","Я спрашиваю, что ты видишь до момента сбоя: экран производителя/BIOS, логотип Windows, экран входа или рабочий стол.","Kysyn mitä näet ennen kuin käynnistys pysähtyy: BIOS/valmistaja, Windows-logo, kirjautuminen vai työpöytä."),
      task_manager_opens:L(lang,"I mean: can Task Manager itself open? Opening it does not fix the slow PC; it only gives us the next diagnostic tool.","Я спрашиваю: открывается ли сам Диспетчер задач? Его открытие не исправляет медленный ПК, а только даёт нам инструмент для дальнейшей диагностики.","Tarkoitan: aukeaako Tehtävienhallinta? Sen avaaminen ei korjaa hidasta konetta, vaan antaa meille diagnostiikkatyökalun."),
      taskmgr_cpu_top:L(lang,"I mean: in Task Manager sort by CPU and tell me the process/app name at the top and its CPU percentage.","Я имею в виду: в Диспетчере задач отсортируй по CPU и напиши имя процесса/программы сверху и его процент CPU.","Tarkoitan: järjestä Tehtävienhallinta CPU:n mukaan ja kerro ylimmän prosessin/ohjelman nimi sekä CPU-prosentti.")
    };
    return answer(clar[q]||L(lang,"I mean my previous question. Answer with what you see or what happens, and I’ll continue from that result.","Я имею в виду предыдущий вопрос. Напиши, что ты видишь или что происходит, и я продолжу от этого результата.","Tarkoitan edellistä kysymystä. Kerro mitä näet tai tapahtuu, niin jatkan siitä."));
  }

  // v19.2: Cross-test evidence is a diagnostic branch, not a generic detail reply.
  if(q==="cross_test_result" || q==="cross_test_confirm_computer"){
    return crossTestNext(text,lang,match);
  }

  // Universal scope handling: used by mouse, keyboard, mic, webcam and future devices.
  if(expected==="scope"){
    if(p.value==="everywhere"){
      M().fact("scope","everywhere");
      if(c==="mouse"||c==="keyboard") return ask(L(lang,`Okay — so it fails everywhere, not just one app. How is the ${objectNames[c].en} connected: USB, Bluetooth, or wireless?`,`Хорошо — значит, проблема везде, а не только в одном приложении. Как подключена ${objectNames[c].ru}: USB, Bluetooth или беспроводно?`,`Hyvä — ongelma on kaikkialla, ei vain yhdessä sovelluksessa. Miten ${objectNames[c].fi} on liitetty: USB, Bluetooth vai langattomasti?`),c+"_connection_type","connection_type",match);
      if(c==="microphone") return ask(L(lang,"Okay — it also fails in Windows, so this is not only an app setting. Is the microphone USB, Bluetooth, 3.5 mm, or built into the laptop/headset?","Хорошо — он не работает и в Windows, значит дело не только в приложении. Микрофон USB, Bluetooth, 3.5 мм или встроенный?","Hyvä — se ei toimi Windowsissakaan. Onko mikrofoni USB, Bluetooth, 3,5 mm vai sisäänrakennettu?"),"mic_connection_type","connection_type",match);
      if(c==="webcam") return ask(L(lang,"Okay — it also fails in Windows Camera. Is it a built-in laptop camera or an external USB webcam?","Хорошо — она не работает и в «Камере» Windows. Это встроенная камера ноутбука или внешняя USB-вебкамера?","Hyvä — se ei toimi Windowsin Kamera-sovelluksessakaan. Onko kamera sisäänrakennettu vai ulkoinen USB-kamera?"),"webcam_connection_type","connection_type",match);
    }
    if(p.value==="only_app"){
      M().fact("scope","only_app");
      return ask(L(lang,"Good — the hardware works outside that app, so the app/settings are more likely. Which program or game is it?","Хорошо — вне этого приложения устройство работает, значит вероятнее настройки программы. Какая это программа или игра?","Hyvä — laite toimii sovelluksen ulkopuolella, joten syy on todennäköisemmin sovelluksen asetuksissa. Mikä ohjelma tai peli?"),"affected_app","text",match);
    }
    // Free-text scope: preserve it and move on rather than dead-ending.
    M().fact("scopeText",p.clean);
    if(c==="mouse"||c==="keyboard") return ask(L(lang,"Okay. Next, how is it connected: USB, Bluetooth, or wireless?","Хорошо. Теперь уточним подключение: USB, Bluetooth или беспроводное?","Hyvä. Miten se on liitetty: USB, Bluetooth vai langattomasti?"),c+"_connection_type","connection_type",match);
  }

  if(expected==="connection_type"){
    if(p.value&&p.value!=="text"){
      M().fact("connection",p.value);
      return connectionStep(objectNames[c]?.en||"device",p.value,lang,match);
    }
    return ask(L(lang,"Tell me which connection it uses: USB/cable, Bluetooth, or wireless with a USB receiver.","Уточни тип подключения: USB/кабель, Bluetooth или беспроводное через USB-приёмник.","Kerro liitäntätapa: USB/kaapeli, Bluetooth tai langaton USB-vastaanottimella."),q,"connection_type",match);
  }

  if(q==="software_name"){
    M().fact("softwareName",String(text).trim());
    return ask(L(lang,`Got it — ${String(text).trim()}. What happens: it won't open, freezes, crashes, shows an error, or behaves incorrectly?`,`Поняла — ${String(text).trim()}. Что происходит: не открывается, зависает, вылетает, показывает ошибку или работает неправильно?`,`Selvä — ${String(text).trim()}. Mitä tapahtuu: ei aukea, jäätyy, kaatuu, näyttää virheen vai toimii väärin?`),"software_symptom","symptom",match);
  }

  if(q==="affected_app"){
    M().fact("affectedApp",String(text).trim());
    return ask(L(lang,"Open that app's input/device settings and make sure the correct device is selected. After selecting it, does it work there?","Открой настройки устройства/ввода в этой программе и проверь, что выбрано правильное устройство. После выбора оно работает?","Avaa sovelluksen laite-/syöttöasetukset ja valitse oikea laite. Toimiiko se sen jälkeen?"),"app_device_test","result",match);
  }

  if(expected==="result"||expected==="yes_no"){
    if(p.value==="yes"){
      M().fact("lastTest","worked");
      return answer(L(lang,"Great — that step fixed it. If it happens again, the last connection/setting we changed is the first thing to check.","Отлично — этот шаг помог. Если проблема повторится, первым делом проверь последнее соединение/настройку, которую мы изменили.","Hyvä — tämä vaihe korjasi ongelman. Jos se palaa, tarkista ensin viimeksi muutettu yhteys/asetus."),true);
    }
    if(p.value==="no"){
      M().fact("lastTest","failed");
      return genericResultNext(lang,match);
    }
  }

  if(q==="display_own_menu"){
    if(p.value==="yes") return ask(L(lang,"Good — the monitor itself is powered and can draw its menu. Reseat the video cable and verify the monitor input source matches HDMI/DisplayPort. Do you get a picture?","Хорошо — сам монитор работает. Переподключи видеокабель и проверь, что выбран правильный вход HDMI/DisplayPort. Изображение появилось?","Hyvä — näyttö itse toimii. Liitä videokaapeli uudelleen ja tarkista oikea HDMI/DisplayPort-tulo. Tuleeko kuva?"),"display_cable_result","result",match);
    if(p.value==="no") return ask(L(lang,"If the monitor cannot even show its own menu/logo, check its power cable/adapter and try another outlet. Does its power light come on?","Если монитор не показывает даже своё меню/логотип, проверь питание/адаптер и другую розетку. Индикатор питания загорается?","Jos näyttö ei näytä omaa valikkoa/logoa, tarkista virtajohto/sovitin ja toinen pistorasia. Syttyykö virtavalo?"),"display_power_light","yes_no",match);
  }

  if(q==="device_connect_reaction"){
    if(p.value==="yes") return ask(L(lang,"Windows notices the connection, so open Device Manager and look for the device or a yellow warning icon. Do you see one?","Windows замечает подключение. Открой Диспетчер устройств и найди устройство или жёлтый значок предупреждения. Видишь его?","Windows huomaa yhteyden. Avaa Laitehallinta ja etsi laite tai keltainen varoituskuvake. Näkyykö sitä?"),"device_manager_seen","yes_no",match);
    if(p.value==="no") return connectionStep(objectNames[c]?.en||"device","usb",lang,match);
    return ask(L(lang,"Open Device Manager while connecting/disconnecting the device. Does anything appear or disappear in the list?","Открой Диспетчер устройств и подключай/отключай устройство. Что-нибудь появляется или исчезает в списке?","Avaa Laitehallinta ja liitä/irrota laite. Ilmestyykö tai katoaako jotain listalta?"),"device_manager_seen","yes_no",match);
  }

  if(q==="ram_changed"){
    if(p.value==="yes") return ask(L(lang,"Because the RAM was changed recently, power the PC off and reseat the modules firmly. Then check BIOS/UEFI. Does BIOS show the full installed amount?","Так как RAM недавно меняли, выключи ПК и плотно переустанови модули. Затем проверь BIOS/UEFI. Он показывает весь установленный объём?","Koska RAM muutettiin äskettäin, sammuta kone ja asenna moduulit uudelleen kunnolla. Näkyykö BIOS/UEFI:ssa koko määrä?"),"ram_bios_full","yes_no",match);
    if(p.value==="no") return ask(L(lang,"Check BIOS/UEFI first. Does it show the full amount of RAM that is physically installed?","Сначала проверь BIOS/UEFI. Он показывает весь физически установленный объём RAM?","Tarkista ensin BIOS/UEFI. Näkyykö siellä koko fyysisesti asennettu RAM-määrä?"),"ram_bios_full","yes_no",match);
  }

  if(q==="disk_backup"){
    if(p.value==="no") return answer(L(lang,"Stop using the clicking drive for normal work if the files matter. Back up the most important data first; repeated reads/writes can make a failing HDD worse. After the backup, we can check its health.","Если файлы важны, не используй щёлкающий диск для обычной работы. Сначала скопируй самые важные данные: лишние чтения/записи могут ухудшить состояние неисправного HDD. После резервной копии можно проверять здоровье диска.","Jos tiedostot ovat tärkeitä, älä käytä naksuvaa levyä normaalisti. Varmuuskopioi tärkeimmät tiedot ensin; lisäkäyttö voi pahentaa vikaa. Sen jälkeen voidaan tarkistaa levyn kunto."),true);
    if(p.value==="yes") return ask(L(lang,"Good. Now check the drive's SMART/health status with a trusted disk-health tool. Does it report Caution/Bad or errors?","Хорошо. Теперь проверь SMART/состояние диска надёжной утилитой. Есть статус Caution/Bad или ошибки?","Hyvä. Tarkista nyt levyn SMART/terveystila luotettavalla työkalulla. Näkyykö Caution/Bad tai virheitä?"),"disk_smart_result","detail",match);
  }

  if(q==="disk_management_visible"){
    if(p.value==="yes") return ask(L(lang,"Good — Windows can see the drive. Does it have a drive letter and a normal partition/file system shown there?","Хорошо — Windows видит диск. Есть ли у него буква диска и нормальный раздел/файловая система?","Hyvä — Windows näkee levyn. Onko sillä asemakirjain ja normaali osio/tiedostojärjestelmä?"),"disk_partition_state","detail",match);
    if(p.value==="no") return ask(L(lang,"If Disk Management cannot see it, check whether BIOS/UEFI detects the drive. Does BIOS see it?","Если «Управление дисками» его не видит, проверь BIOS/UEFI. BIOS видит диск?","Jos Levynhallinta ei näe levyä, tarkista BIOS/UEFI. Näkyykö levy BIOSissa?"),"disk_bios_seen","yes_no",match);
  }

  if(q==="gpu_change"||expected==="context"){
    M().fact("context",p.value||p.clean);
    if(c==="gpu"){
      if(p.value==="update") return ask(L(lang,"Because it started after a driver update, open Device Manager > GPU > Properties > Driver and try Roll Back Driver if available. Does the problem stop?","Так как проблема началась после обновления драйвера, открой Диспетчер устройств → GPU → Свойства → Драйвер и попробуй «Откатить», если доступно. Проблема исчезла?","Koska ongelma alkoi ajuripäivityksen jälkeen, kokeile Laitehallinta > GPU > Ominaisuudet > Ajuri > Palauta ohjain. Poistuuko ongelma?"),"gpu_rollback_result","result",match);
      return ask(L(lang,"Check Device Manager > Display adapters. Is the GPU listed normally, or is there a warning icon/missing device?","Проверь Диспетчер устройств → Видеоадаптеры. Видеокарта отображается нормально, есть значок предупреждения или её нет?","Tarkista Laitehallinta > Näyttösovittimet. Näkyykö GPU normaalisti, varoituskuvakkeella vai puuttuuko se?"),"gpu_device_manager","detail",match);
    }
    if(c==="display") return ask(L(lang,"Reseat the display cable and, if possible, try another cable or port. Does the image become stable?","Переподключи кабель монитора и, если возможно, попробуй другой кабель или порт. Изображение стало стабильным?","Liitä näyttökaapeli uudelleen ja kokeile mahdollisuuksien mukaan toista kaapelia/porttia. Vakautuuko kuva?"),"display_cable_result","result",match);
    return genericResultNext(lang,match);
  }

  if(q==="windows_stage"){
    M().fact("windowsStage",p.value||p.clean);
    if(p.value==="desktop") return ask(L(lang,"Since you reach the desktop, this is not a basic boot failure. Can you open Task Manager with Ctrl+Shift+Esc?","Раз рабочий стол загружается, это не базовый сбой загрузки. Открывается ли Диспетчер задач по Ctrl+Shift+Esc?","Koska työpöytä latautuu, kyse ei ole peruskäynnistysviasta. Aukeaako Tehtävienhallinta Ctrl+Shift+Esc?"),"task_manager_opens","yes_no",match);
    if(p.value==="login") return ask(L(lang,"You reach the login screen. After signing in, does Windows freeze/black-screen, or does it return to login?","До экрана входа система доходит. После входа Windows зависает/становится чёрным или возвращает на экран входа?","Kirjautumisruutu näkyy. Kirjautumisen jälkeen jäätyykö/meneekö näyttö mustaksi vai palaako kirjautumiseen?"),"windows_after_login","detail",match);
    return ask(L(lang,"Open Windows Recovery/Automatic Repair if it appears and choose Startup Repair. What result do you get?","Открой среду восстановления/Автоматическое восстановление Windows и выбери «Восстановление при загрузке». Какой результат?","Avaa Windowsin palautus/automaattinen korjaus ja valitse Käynnistyksen korjaus. Mikä tulos tulee?"),"windows_repair_result","detail",match);
  }

  if(q==="software_symptom"||expected==="symptom"){
    M().fact("softwareSymptom",p.value||p.clean);
    if(p.value==="error") return ask(L(lang,"Copy the exact error text/code here. The exact wording matters for the next step.","Скопируй сюда точный текст/код ошибки. Формулировка важна для следующего шага.","Kopioi tarkka virheteksti/koodi tähän. Tarkka sanamuoto ratkaisee seuraavan vaiheen."),"software_error_text","text",match);
    if(p.value==="crash"||p.value==="freeze") return ask(L(lang,"Restart Windows, then launch the program once with other unnecessary apps closed. Does it still fail the same way?","Перезагрузи Windows, затем запусти программу с закрытыми лишними приложениями. Сбой повторяется так же?","Käynnistä Windows uudelleen ja ohjelma muiden turhien sovellusten ollessa suljettuina. Toistuuko sama vika?"),"software_clean_test","result",match);
    return ask(L(lang,"Restart Windows and try launching the program once as administrator. Does anything change?","Перезагрузи Windows и один раз попробуй запустить программу от имени администратора. Что-нибудь изменилось?","Käynnistä Windows uudelleen ja kokeile ohjelmaa kerran järjestelmänvalvojana. Muuttuuko jokin?"),"software_admin_result","result",match);
  }

  // Universal last resort for an ACTIVE conversation: never throw away the reply.
  M().fact("unclassifiedReply",p.clean);
  return genericResultNext(lang,match);
}

window.ANITA_RESPONSES={version:"19.2",first,follow,parseReply};
console.log("[ANITA v19.2] Universal response engine loaded");
})();
