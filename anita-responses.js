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
  if(["yes_no","yes_no_detail","result"].includes(expected)){
    if(neg) return {...out,value:"no",confidence:.98};
    if(pos) return {...out,value:"yes",confidence:.98};
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

function follow(text,lang){
  const mem=M()?.state; if(!mem||!mem.lastQuestion) return null;
  const q=mem.lastQuestion, expected=mem.expected, p=parseReply(text,expected), match=matchOf();
  const c=match.category;
  M().fact("lastReply",p.value||p.clean); M().fact("lastReplyQuestion",q);

  if(p.value==="clarify"){
    const clar={
      keyboard_scope:L(lang,"I mean: does the keyboard fail on the Windows desktop and in every program, or only inside one app/game?","Я имею в виду: клавиатура не работает на рабочем столе Windows и во всех программах или только в одном приложении/игре?","Tarkoitan: eikö näppäimistö toimi Windowsin työpöydällä ja kaikissa ohjelmissa vai vain yhdessä sovelluksessa/pelissä?"),
      mouse_scope:L(lang,"I mean: does the mouse fail on the Windows desktop too, or only inside one game/program?","Я имею в виду: мышь не работает и на рабочем столе Windows или только в одной игре/программе?","Tarkoitan: eikö hiiri toimi myös Windowsin työpöydällä vai vain yhdessä pelissä/ohjelmassa?"),
      wireless_kind:L(lang,"I’m asking whether the wireless device uses Bluetooth or a small USB receiver/dongle plugged into the PC.","Я спрашиваю, подключается ли беспроводное устройство через Bluetooth или через маленький USB-приёмник/донгл.","Kysyn käyttääkö langaton laite Bluetoothia vai pientä USB-vastaanotinta."),
      windows_stage:L(lang,"I’m asking what you can see before Windows stops: manufacturer/BIOS screen, Windows logo, login screen, or desktop.","Я спрашиваю, что ты видишь до момента сбоя: экран производителя/BIOS, логотип Windows, экран входа или рабочий стол.","Kysyn mitä näet ennen kuin käynnistys pysähtyy: BIOS/valmistaja, Windows-logo, kirjautuminen vai työpöytä.")
    };
    return answer(clar[q]||L(lang,"I mean my previous question. Answer with what you see or what happens, and I’ll continue from that result.","Я имею в виду предыдущий вопрос. Напиши, что ты видишь или что происходит, и я продолжу от этого результата.","Tarkoitan edellistä kysymystä. Kerro mitä näet tai tapahtuu, niin jatkan siitä."));
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

window.ANITA_RESPONSES={version:"19.1",first,follow,parseReply};
console.log("[ANITA v19.1] Universal response engine loaded");
})();
