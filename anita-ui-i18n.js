/* ANITA v26.0 — PC PROFILE UI LOCALIZATION
   Makes the optional PC profile follow the selected RU / EN / FI UI language.
*/
(function(){
"use strict";

const root=document.getElementById("anitaDemoRoot");
if(!root) return;

const T={
  ru:{
    heading:"⚙️ Информация о моём компьютере",optional:"— необязательно",
    intro:"Эти данные не обязательны. ANITA поможет и без них, но характеристики компьютера могут сделать диагностику и рекомендации точнее.",
    lead:"🔒 Перед заполнением: технические данные профиля используются ANITA только для помощи с диагностикой и рекомендациями. Заполнение необязательно.",
    privacyTitle:"🔒 Как используются введённые данные",
    privacy1:"Заполнение этого раздела добровольно. Если вы укажете характеристики своего компьютера и подключённых устройств, ANITA использует их для более точной диагностики, поиска возможной причины проблемы и подготовки рекомендаций.",
    privacy2:"Технические данные используются ANITA только для работы с вашей проблемой — диагностики и рекомендаций — и не используются для других целей. Вы можете пользоваться ANITA, не заполняя этот раздел.",
    privacy3:"Важно: данные профиля в этой версии хранятся только в текущей открытой странице. После обновления, перезагрузки или закрытия страницы ANITA забудет эти данные. При необходимости вы можете ввести их снова или просто продолжить диалог без них.",
    labels:["Тип устройства","Производитель","Модель","Windows","Процессор (CPU)","Видеокарта (GPU)","Оперативная память (RAM)","Системный диск","Мышь","Клавиатура"],
    unknown:"Не знаю / не указывать", desktop:"Настольный компьютер", laptop:"Ноутбук",
    phMaker:"Например: Dell, HP, ASUS", phKnown:"Если известна", phCpu:"Если известен", phGpu:"Если известна", phRam:"Например: 16 GB или 2 × 8 GB",
    otherVersion:"Другая версия", wired:"Проводная USB", receiver:"Беспроводная с USB-приёмником", bluetooth:"Bluetooth", other:"Другая",
    consent:"Я понимаю, как ANITA использует указанные мной технические данные.",
    save:"Сохранить для текущего сеанса", clear:"Очистить"
  },
  en:{
    heading:"⚙️ Information about my computer",optional:"— optional",
    intro:"These details are optional. ANITA can help without them, but your computer specifications may make diagnosis and recommendations more accurate.",
    lead:"🔒 Before filling this in: ANITA uses the technical profile data only to help with diagnosis and recommendations. Completing this section is optional.",
    privacyTitle:"🔒 How the entered data is used",
    privacy1:"Completing this section is voluntary. If you provide information about your computer and connected devices, ANITA uses it to improve diagnosis, identify possible causes, and prepare recommendations.",
    privacy2:"The technical data is used only to help with your current problem — diagnosis and recommendations — and is not used for other purposes. You can use ANITA without completing this section.",
    privacy3:"Important: in this version, profile data is stored only in the currently open page. After refreshing, restarting, or closing the page, ANITA forgets these details. You can enter them again later or simply continue without them.",
    labels:["Device type","Manufacturer","Model","Windows","Processor (CPU)","Graphics card (GPU)","Memory (RAM)","System drive","Mouse","Keyboard"],
    unknown:"I don't know / don't specify", desktop:"Desktop computer", laptop:"Laptop",
    phMaker:"For example: Dell, HP, ASUS", phKnown:"If known", phCpu:"If known", phGpu:"If known", phRam:"For example: 16 GB or 2 × 8 GB",
    otherVersion:"Other version", wired:"Wired USB", receiver:"Wireless with USB receiver", bluetooth:"Bluetooth", other:"Other",
    consent:"I understand how ANITA uses the technical data I provide.",
    save:"Save for this session", clear:"Clear"
  },
  fi:{
    heading:"⚙️ Tiedot tietokoneestani",optional:"— valinnainen",
    intro:"Nämä tiedot ovat valinnaisia. ANITA auttaa myös ilman niitä, mutta tietokoneen tekniset tiedot voivat tarkentaa diagnostiikkaa ja suosituksia.",
    lead:"🔒 Ennen täyttämistä: ANITA käyttää teknisiä profiilitietoja vain diagnostiikan ja suositusten parantamiseen. Tämän osion täyttäminen on vapaaehtoista.",
    privacyTitle:"🔒 Miten annettuja tietoja käytetään",
    privacy1:"Tämän osion täyttäminen on vapaaehtoista. Jos annat tietoja tietokoneestasi ja liitetyistä laitteista, ANITA käyttää niitä tarkempaan diagnostiikkaan, mahdollisen syyn etsimiseen ja suositusten laatimiseen.",
    privacy2:"Teknisiä tietoja käytetään vain nykyisen ongelmasi ratkaisemiseen — diagnostiikkaan ja suosituksiin — eikä muihin tarkoituksiin. Voit käyttää ANITAa täyttämättä tätä osiota.",
    privacy3:"Tärkeää: tässä versiossa profiilitiedot säilyvät vain tällä avoinna olevalla sivulla. Sivun päivityksen, uudelleenkäynnistyksen tai sulkemisen jälkeen ANITA unohtaa tiedot. Voit tarvittaessa syöttää ne uudelleen tai jatkaa ilman niitä.",
    labels:["Laitteen tyyppi","Valmistaja","Malli","Windows","Prosessori (CPU)","Näytönohjain (GPU)","Keskusmuisti (RAM)","Järjestelmälevy","Hiiri","Näppäimistö"],
    unknown:"En tiedä / älä määritä", desktop:"Pöytätietokone", laptop:"Kannettava tietokone",
    phMaker:"Esimerkiksi: Dell, HP, ASUS", phKnown:"Jos tiedossa", phCpu:"Jos tiedossa", phGpu:"Jos tiedossa", phRam:"Esimerkiksi: 16 Gt tai 2 × 8 Gt",
    otherVersion:"Muu versio", wired:"Langallinen USB", receiver:"Langaton USB-vastaanottimella", bluetooth:"Bluetooth", other:"Muu",
    consent:"Ymmärrän, miten ANITA käyttää antamiani teknisiä tietoja.",
    save:"Tallenna tätä istuntoa varten", clear:"Tyhjennä"
  }
};

function currentLang(){
  const active=root.querySelector(".langBtn.active");
  const l=active && active.dataset.lang;
  if(l==="ru"||l==="en"||l==="fi") return l;
  try{
    const m=window.ANITA_MEMORY?.state?.language;
    if(m==="ru"||m==="en"||m==="fi") return m;
  }catch(_){}
  const b=(navigator.language||"en").toLowerCase();
  if(b.startsWith("ru")) return "ru";
  if(b.startsWith("fi")) return "fi";
  return "en";
}

function setLabelText(label,text){
  if(!label) return;
  for(const n of label.childNodes){
    if(n.nodeType===3){ n.nodeValue=text+"\n              "; return; }
  }
  label.insertBefore(document.createTextNode(text+" "),label.firstChild);
}

function setOptions(select, map){
  if(!select) return;
  Array.from(select.options).forEach(o=>{
    if(o.value==="" && map.unknown) o.textContent=map.unknown;
    else if(map[o.value]) o.textContent=map[o.value];
  });
}

function apply(lang){
  const d=T[lang]||T.en;
  const section=document.getElementById("anitaPcProfile");
  if(!section) return;

  const toggle=document.getElementById("anitaProfileToggle");
  if(toggle){
    toggle.innerHTML="";
    toggle.appendChild(document.createTextNode(d.heading+" "));
    const span=document.createElement("span");
    span.textContent=d.optional;
    toggle.appendChild(span);
  }

  const intro=section.querySelector(".anitaProfileIntro");
  if(intro) intro.textContent=d.intro;
  const lead=section.querySelector(".anitaPrivacyLead");
  if(lead) lead.textContent=d.lead;

  const privacy=section.querySelector(".anitaPrivacyNotice");
  if(privacy){
    const summary=privacy.querySelector("summary");
    if(summary) summary.textContent=d.privacyTitle;
    const ps=privacy.querySelectorAll("p");
    if(ps[0]) ps[0].textContent=d.privacy1;
    if(ps[1]) ps[1].textContent=d.privacy2;
    if(ps[2]) ps[2].textContent=d.privacy3;
  }

  const labels=section.querySelectorAll(".anitaProfileGrid > label");
  labels.forEach((label,i)=>setLabelText(label,d.labels[i]||""));

  setOptions(document.getElementById("anitaPcType"),{
    "":d.unknown,desktop:d.desktop,laptop:d.laptop
  });
  const windows=document.getElementById("anitaPcWindows");
  if(windows){
    Array.from(windows.options).forEach(o=>{
      if(o.value==="") o.textContent=d.unknown;
      if(o.value==="other") o.textContent=d.otherVersion;
    });
  }
  setOptions(document.getElementById("anitaPcDisk"),{"":d.unknown});
  setOptions(document.getElementById("anitaPcMouse"),{"":d.unknown,wired_usb:d.wired,usb_receiver:d.receiver,bluetooth:d.bluetooth,other:d.other});
  setOptions(document.getElementById("anitaPcKeyboard"),{"":d.unknown,wired_usb:d.wired,usb_receiver:d.receiver,bluetooth:d.bluetooth,other:d.other});

  const q=id=>document.getElementById(id);
  if(q("anitaPcManufacturer")) q("anitaPcManufacturer").placeholder=d.phMaker;
  if(q("anitaPcModel")) q("anitaPcModel").placeholder=d.phKnown;
  if(q("anitaPcCpu")) q("anitaPcCpu").placeholder=d.phCpu;
  if(q("anitaPcGpu")) q("anitaPcGpu").placeholder=d.phGpu;
  if(q("anitaPcRam")) q("anitaPcRam").placeholder=d.phRam;

  const consent=section.querySelector(".anitaConsent span");
  if(consent) consent.textContent=d.consent;
  if(q("anitaProfileSave")) q("anitaProfileSave").textContent=d.save;
  if(q("anitaProfileClear")) q("anitaProfileClear").textContent=d.clear;

  section.dataset.uiLang=lang;
}

root.querySelectorAll(".langBtn").forEach(btn=>{
  btn.addEventListener("click",()=>setTimeout(()=>apply(currentLang()),0));
});

window.addEventListener("anita:language-changed",e=>{
  const l=e?.detail?.language;
  if(l==="ru"||l==="en"||l==="fi") apply(l);
});

apply(currentLang());
window.ANITA_UI_I18N={version:"26.0",apply,currentLang};
console.log("[ANITA v26.0] UI localization loaded");
})();