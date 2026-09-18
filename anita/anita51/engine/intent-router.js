(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
function n(x){return String(x||"").trim().toLowerCase()}
function classify(text,state){const x=n(text),signals=[];
if(!x)return{primary:"empty",signals};
if(/^(hi|hello|hey|привет|здравствуйте|hei|moi)[!. ]*$/.test(x))signals.push("greeting");
if(/^(thanks|thank you|спасибо|kiitos|cool|круто)[!. ]*$/.test(x))signals.push("smalltalk");
if(/\b(website|web site|сайт|verkkosivu|landing|лендинг)\b/.test(x))signals.push("website");
if(/\b(windows|wifi|wi-fi|printer|driver|драйвер|компьютер|computer|принтер|router|роутер)\b/.test(x))signals.push("it");
if(/\b(price|prices|pricing|цена|цены|стоимость|contact|контакт|alex node|анита|anita|services|услуги)\b/.test(x))signals.push("guide");
if(state&&state.pending)return{primary:"pending_answer",signals};
if(signals.includes("website"))return{primary:"website",signals};
if(signals.includes("it"))return{primary:"it",signals};
if(signals.includes("guide"))return{primary:"guide",signals};
if(signals.includes("greeting")||signals.includes("smalltalk"))return{primary:"human",signals};
return{primary:"unknown",signals};}
A.IntentRouter={classify};
})(window);