/* ANITA v26.1.1 — SEMANTIC QUICK CHOICE UI
   Adds buttons whenever ANITA asks a finite-choice question.
   Free text and voice input always remain available.
*/
(function(){
"use strict";

function lang(){
  try{
    const active=document.querySelector("#anitaDemoRoot .langBtn.active");
    const manual=String(active?.dataset?.lang||"").toLowerCase();
    if(["ru","en","fi"].includes(manual))return manual;
  }catch(_){}
  try{
    const l=window.ANITA_MEMORY?.state?.language;
    if(["ru","en","fi"].includes(l))return l;
  }catch(_){}
  return"ru";
}
function C(label,value,canonical){return{label,value,canonical:canonical||value}}

const SETS={
 connection:{
  ru:[C("Проводная USB / кабель","проводная USB","wired_usb"),C("Беспроводная с USB-приёмником","USB-приёмник","usb_receiver"),C("Bluetooth","Bluetooth","bluetooth"),C("Не знаю","не знаю","unknown")],
  en:[C("Wired USB / cable","wired USB","wired_usb"),C("Wireless with USB receiver","USB receiver","usb_receiver"),C("Bluetooth","Bluetooth","bluetooth"),C("I don't know","I don't know","unknown")],
  fi:[C("Langallinen USB / kaapeli","johdollinen USB","wired_usb"),C("Langaton USB-vastaanottimella","USB-vastaanotin","usb_receiver"),C("Bluetooth","Bluetooth","bluetooth"),C("En tiedä","en tiedä","unknown")]
 },
 scope:{
  ru:[C("Во всём Windows","во всём Windows","system_wide"),C("Только в одной игре/программе","только в одной игре или программе","app_only"),C("Не знаю","не знаю","unknown")],
  en:[C("Everywhere in Windows","everywhere in Windows","system_wide"),C("Only in one game/app","only in one game or program","app_only"),C("I don't know","I don't know","unknown")],
  fi:[C("Koko Windowsissa","koko Windowsissa","system_wide"),C("Vain yhdessä pelissä/ohjelmassa","vain yhdessä pelissä tai ohjelmassa","app_only"),C("En tiedä","en tiedä","unknown")]
 },
 timing:{
  ru:[C("Примерно одновременно","примерно одновременно","simultaneous"),C("Сначала одно, потом другое","сначала одно, потом другое","sequential"),C("Не знаю","не знаю","unknown")],
  en:[C("About the same time","at about the same time","simultaneous"),C("One first, another later","one first, then the other","sequential"),C("I don't know","I don't know","unknown")],
  fi:[C("Suunnilleen samaan aikaan","suunnilleen samaan aikaan","simultaneous"),C("Ensin yksi, sitten toinen","ensin yksi, sitten toinen","sequential"),C("En tiedä","en tiedä","unknown")]
 },
 responsive:{
  ru:[C("Компьютер продолжал работать","компьютер продолжал работать","responsive"),C("Компьютер завис целиком","компьютер завис целиком","frozen"),C("Не знаю","не знаю","unknown")],
  en:[C("Computer kept running","computer kept running","responsive"),C("Whole computer froze","whole computer froze","frozen"),C("I don't know","I don't know","unknown")],
  fi:[C("Tietokone jatkoi toimintaa","tietokone jatkoi toimintaa","responsive"),C("Koko tietokone jumittui","koko tietokone jumittui","frozen"),C("En tiedä","en tiedä","unknown")]
 },
 frequency:{
  ru:[C("Каждый раз","каждый раз","always"),C("Только иногда","только иногда","sometimes"),C("Не знаю","не знаю","unknown")],
  en:[C("Every time","every time","always"),C("Only sometimes","only sometimes","sometimes"),C("I don't know","I don't know","unknown")],
  fi:[C("Joka kerta","joka kerta","always"),C("Vain joskus","vain joskus","sometimes"),C("En tiedä","en tiedä","unknown")]
 },
 yesno:{
  ru:[C("Да","да","yes"),C("Нет","нет","no"),C("Не знаю","не знаю","unknown")],
  en:[C("Yes","yes","yes"),C("No","no","no"),C("I don't know","I don't know","unknown")],
  fi:[C("Kyllä","kyllä","yes"),C("Ei","ei","no"),C("En tiedä","en tiedä","unknown")]
 },
 powerstate:{
  ru:[C("Включился снова сам","включился снова сам","restarted_itself"),C("Остаётся выключенным","остаётся выключенным","stays_off"),C("Выключается повторно","выключается повторно","repeats"),C("Не знаю","не знаю","unknown")],
  en:[C("Turned back on by itself","turned back on by itself","restarted_itself"),C("Stays powered off","stays powered off","stays_off"),C("Keeps shutting down","keeps shutting down","repeats"),C("I don't know","I don't know","unknown")],
  fi:[C("Käynnistyi uudelleen itsestään","käynnistyi uudelleen itsestään","restarted_itself"),C("Pysyy sammuksissa","pysyy sammuksissa","stays_off"),C("Sammuu toistuvasti","sammuu toistuvasti","repeats"),C("En tiedä","en tiedä","unknown")]
 }
};

function stateKey(){
  const q=String(window.ANITA_ENTITIES?.state?.lastQuestion||window.ANITA_MEMORY?.state?.lastQuestion||"");
  if(/^connection_entity_/.test(q)||/connection/i.test(q))return"connection";
  if(q==="multi_timing")return"timing";
  if(/scope/.test(q))return"scope";
  if(q==="system_responsive")return"responsive";
  if(/frequency/.test(q))return"frequency";
  if(/result|restart|working|works|detected|fixed|success|shared_usb_path|shared_os_input/i.test(q))return"yesno";
  return null;
}
function semanticKey(text){
  const s=String(text||"").toLowerCase();

  // Explicit connection alternatives — covers:
  // "USB/кабель, Bluetooth или беспроводное через USB-приёмник."
  if(
    /(usb\s*\/?\s*кабел|проводн.{0,30}usb|usb[- ]?при[её]мник|беспроводн.{0,35}при[её]мник).{0,80}bluetooth/i.test(s) ||
    /(wired.{0,30}usb|usb receiver|wireless.{0,35}receiver).{0,80}bluetooth/i.test(s) ||
    /(langallinen.{0,30}usb|usb-vastaanotin|langaton.{0,35}vastaanotin).{0,80}bluetooth/i.test(s)
  ) return"connection";

  if(/во вс[её]м windows|только в одной (игре|программе)|вообще в windows.*или.*игр|everywhere in windows|only in one (game|program|app)|koko windowsissa|vain yhdess[äa].*(pel|ohjelm)/i.test(s))return"scope";
  if(/примерно.*од(ин|но).*момент|сначала.*потом|одновременно|same time|one.*first.*another|samaan aikaan|ensin.*sitten/i.test(s))return"timing";
  if(/компьютер.*продолжал.*работ.*или.*завис|computer.*keep.*running.*or.*freeze|tietokone.*jatko.*vai.*jumi/i.test(s))return"responsive";
  if(/каждый раз.*или.*иногда|every time.*or.*sometimes|joka kerta.*vai.*joskus/i.test(s))return"frequency";
  if(/включил.*снова сам|оста[её]тся выключ|выключается.*повтор|turned back on.*stays.*off|keeps shutting|käynnistyi.*pysyy samm|sammuu toist/i.test(s))return"powerstate";

  // Recognition / identity questions should offer Yes / No / Not sure.
  if(/do you recognize|do you know this (?:app|program|process)|ты узна[её]шь|тебе знаком|tunnistatko/i.test(s))return"yesno";

  // Clear binary diagnostic questions.
  if(/[?？]\s*$/.test(String(text||"").trim())){
    if(/^(заработ|работает ли|работают ли|получилось|появилось ли|исчезла ли|видит ли|определяется ли|включился ли|does |did |is |are |can |has |have |toimiiko|onnistuiko|näkyykö|tunnistaako)/i.test(String(text||"").trim()))return"yesno";
    if(/после .{0,80}(работает|работают|заработал|заработало)|after .{0,80}(work|working)|sen jälkeen.{0,80}toimi/i.test(s))return"yesno";
  }
  return null;
}
function numberedChoices(text,l){
  const t=String(text||"");
  /* v26.1.1: generic numbered clarification menus, including RU/EN/FI
     "Что ближе?", "Which is closest?", "Mikä sopii parhaiten?" and 1..7. */
  if(!/(что ближе|что именно происходит|выберите|какой вариант|which is closest|what exactly happens|choose|select|mikä sopii parhaiten|mitä tarkalleen tapahtuu|valitse)/i.test(t))return null;
  const lines=t.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const opts=[];
  for(const line of lines){
    const m=line.match(/^\s*([1-7])[\).]\s*(.+?)\s*$/);
    if(m)opts.push(C(m[2],m[1],"option_"+m[1]));
  }
  return opts.length>=2&&opts.length<=7?opts:null;
}
function inferChoices(text){
  const l=lang();
  const numbered=numberedChoices(text,l);
  if(numbered)return numbered;
  const key=semanticKey(text)||stateKey();
  return key?(SETS[key]?.[l]||SETS[key]?.en||null):null;
}
function submit(opt){
  const input=document.getElementById("input"),form=document.getElementById("form");
  if(!input||!form)return;
  window.ANITA_LAST_CHOICE={canonical:opt.canonical,value:opt.value,label:opt.label,at:Date.now()};
  input.value=opt.value;
  input.dispatchEvent(new Event("input",{bubbles:true}));
  if(typeof form.requestSubmit==="function")form.requestSubmit();
  else form.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
}
function makeBox(opts,onPick){
  const l=lang(), box=document.createElement("div");
  box.className="anitaQuickChoices";
  opts.forEach(function(opt){
    const row=document.createElement("div");row.className="anitaChoiceRow";
    const label=document.createElement("span");label.className="anitaChoiceLabel";label.textContent=opt.label;
    const b=document.createElement("button");b.type="button";b.className="anitaChooseBtn";
    b.textContent=l==="ru"?"Выбрать":l==="fi"?"Valitse":"Select";
    b.addEventListener("click",function(){onPick?onPick(opt,b):submit(opt)});
    row.append(label,b);box.appendChild(row);
  });
  return box;
}
function enhance(msg){
  if(!msg||msg.dataset.anitaChoices==="1")return;
  const text=(msg.childNodes.length?Array.from(msg.childNodes).filter(n=>n.nodeType===3||!(n.classList?.contains("anitaQuickChoices"))).map(n=>n.textContent||"").join(" "):msg.textContent)||"";
  const opts=inferChoices(text.trim());
  if(!opts||!opts.length){msg.dataset.anitaChoices="1";return}
  msg.appendChild(makeBox(opts));
  msg.dataset.anitaChoices="1";
}
function renderCustom(msg,opts,onPick){
  if(!msg||!opts?.length)return;
  msg.appendChild(makeBox(opts,onPick));
  msg.dataset.anitaChoices="1";
}
const chat=document.getElementById("chat");
if(chat){
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{
    if(n.nodeType===1){
      if(n.matches?.(".msg.bot"))setTimeout(()=>enhance(n),0);
      n.querySelectorAll?.(".msg.bot").forEach(x=>setTimeout(()=>enhance(x),0));
    }
  }))).observe(chat,{childList:true,subtree:true});
  setTimeout(()=>chat.querySelectorAll(".msg.bot").forEach(enhance),300);
}

window.ANITA_CHOICES={
  version:"26.1.1",sets:SETS,inferChoices,semanticKey,stateKey,submit,renderCustom,
  option:C
};
console.log("[ANITA v26.1.1] Semantic Quick Choice UI loaded");
})();