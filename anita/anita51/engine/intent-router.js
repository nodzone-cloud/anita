(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};function n(x){return String(x||"").trim().toLowerCase()}
function classify(text,state){const x=n(text),signals=[];if(!x)return{primary:"empty",signals};
if(/\b(website|web site|сайт|verkkosivu|landing|лендинг)\b/.test(x))signals.push("website");
if(/\b(windows|wifi|wi-fi|printer|driver|драйвер|компьютер|computer|ноутбук|принтер|router|роутер|bsod|ошибка)\b/.test(x))signals.push("it");
if(/\b(price|prices|pricing|цена|цены|стоимость|contact|контакт|alex node|anita|анита|services|услуги|portfolio|портфолио)\b/.test(x))signals.push("guide");
if(/\b(hi|hello|hey|привет|здравствуйте|hei|moi|thanks|thank you|спасибо|kiitos|cool|круто)\b/.test(x))signals.push("human");
if(/\b(new brief|start over|новый бриф|начать заново|uusi brief)\b/.test(x))return{primary:"new_brief",signals};
if(/^(i\s+(?:need|want|would like)\s+(?:a\s+)?(?:new\s+)?(?:website|web site)|(?:мне\s+)?(?:нужен|нужна|хочу)\s+(?:новый\s+)?сайт|(?:tarvitsen|haluan)\s+(?:uuden\s+)?(?:verkkosivun|verkkosivut))[.!?]*$/i.test(x))return{primary:"new_brief",signals:signals.concat("explicit_website_request")};
if(state&&state.pending)return{primary:"pending",signals};
if(signals.includes("website"))return{primary:"website",signals};if(signals.includes("it"))return{primary:"it",signals};if(signals.includes("guide"))return{primary:"guide",signals};
if(signals.length===1&&signals[0]==="human")return{primary:"human",signals};return{primary:"unknown",signals};}
A.IntentRouter={classify};})(window);