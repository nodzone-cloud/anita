/* ANITA 0.4.2 — HUMAN-TECH CONTEXTUAL ANSWER RESOLVER
 * A visitor may answer naturally, by number/ordinal, by clicking a choice,
 * or ask for an explanation without losing the active brief question.
 */
(function(W){
"use strict";
if(!W||!W.state||!W.ui||W.__contextualResolver042)return;
W.__contextualResolver042=true;
const clean=v=>String(v==null?"":v).trim();
const norm=v=>clean(v).toLowerCase().replace(/[ё]/g,"е").replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const lang=()=>W.state.context()?.language||"en";
const say=(l,en,ru,fi)=>l==="ru"?ru:l==="fi"?fi:en;

const SIZE=[
 {value:"one landing page",labels:{en:"One page",ru:"Одна страница",fi:"Yksi sivu"}},
 {value:"a few separate pages",labels:{en:"A few pages",ru:"Несколько страниц",fi:"Muutama sivu"}},
 {value:"a larger multi-page site",labels:{en:"Larger multi-page site",ru:"Большой многостраничный сайт",fi:"Suurempi monisivuinen sivusto"}}
];
function optionsFor(c){if(c?.pending==="size")return SIZE;return [];}
function ordinal(s){
 const x=norm(s);
 const words={"first":1,"1st":1,"первый":1,"первая":1,"первого":1,"ensimmainen":1,"ensimmäinen":1,"second":2,"2nd":2,"второй":2,"вторая":2,"второго":2,"toinen":2,"third":3,"3rd":3,"третий":3,"третья":3,"третьего":3,"kolmas":3,"fourth":4,"4th":4,"четвертый":4,"четвертая":4,"четвертого":4,"neljas":4,"neljäs":4};
 for(const [k,v] of Object.entries(words))if(new RegExp("(^|\\s)"+k+"(?:\\s|$)","i").test(x))return v;
 const m=x.match(/(?:^|\b)(?:вариант\s*)?(\d{1,2})(?:\s*(?:вариант|option))?(?:$|\b)/i);return m?Number(m[1]):null;
}
function asksDifference(text){const x=norm(text);return /(?:в чем|какая|объясни|поясни|что значит|чем).{0,45}(?:разниц|отлич)|(?:разниц|отлич).{0,45}(?:между|в чем)|difference between|what(?:'s| is) the difference|explain (?:the )?(?:difference|options)|what does .* mean|mita eroa|mitä eroa|ero .* valilla|ero .* välillä|selita|selitä/i.test(x);}
function asksExample(text){return /пример|покажи|сайт.*пример|example|show me|esimerk|nayta|näytä/i.test(norm(text));}
function unsure(text){return /^(?:не знаю|не уверен|не уверена|затрудняюсь|i don't know|not sure|unsure|en tieda|en tiedä|en ole varma)$/i.test(norm(text));}
function resolveSize(text){
 const x=norm(text),n=ordinal(x);
 /* Here a bare number means page count because the active question is size.
    Explicit 'option/вариант' or an ordinal means option index. */
 const explicitOption=/вариант|option|перв|втор|трет|четвер|first|second|third|fourth|ensimm|ensimmä|toinen|kolmas|nelj/i.test(x);
 if(n&&explicitOption&&n<=SIZE.length)return SIZE[n-1].value;
 if(/^(?:1|одна|одну|one|yksi)(?:\s*(?:страниц\w*|page\w*|sivu\w*))?$/i.test(x))return SIZE[0].value;
 if(/^(?:2|3|4|5)(?:\s*(?:страниц\w*|page\w*|sivu\w*))?$/i.test(x))return SIZE[1].value;
 if(/^\d{1,2}(?:\s*(?:страниц\w*|page\w*|sivu\w*))?$/i.test(x)){const v=parseInt(x,10);return v===1?SIZE[0].value:v<=5?SIZE[1].value:SIZE[2].value;}
 if(/пару|несколько|отдельн.*страниц|few pages|several pages|separate pages|couple.*pages|muutama sivu|useita sivu/i.test(x))return SIZE[1].value;
 if(/одностранич|лендинг|one[- ]?page|single[- ]?page|landing page|yksi sivu/i.test(x))return SIZE[0].value;
 if(/многостранич|больш.*сайт|large.*multi|larger.*site|multi[- ]?page|monisivuinen|suurempi sivusto/i.test(x))return SIZE[2].value;
 return null;
}
function explanation(l){return say(l,
 "Of course 😊 A one-page site can still have many menu items, but they usually scroll to sections on the same page. With a multi-page site, menu items such as Services, Prices or Contact can open separate pages with their own URLs. A few-page site is the middle ground: for example Home + Services + Contact. A larger multi-page site is useful when there is much more content, services or functionality. You don't need to know the technical term — tell me what you imagine, or choose below.",
 "Конечно 😊 Одностраничный сайт тоже может иметь много пунктов меню, но они обычно просто прокручивают одну длинную страницу к нужным секциям. На сайте из нескольких страниц пункты «Услуги», «Цены» или «Контакты» могут открывать отдельные страницы со своими адресами. Несколько страниц — это, например, Главная + Услуги + Контакты. Большой многостраничный сайт нужен, когда информации, услуг или функций заметно больше. Вам не обязательно знать технический термин — можете описать, как представляете сайт, или выбрать вариант ниже.",
 "Totta kai 😊 Yhden sivun sivustolla voi olla monta valikkokohtaa, mutta ne yleensä vierittävät saman pitkän sivun eri osioihin. Monisivuisella sivustolla esimerkiksi Palvelut, Hinnat ja Yhteystiedot voivat avata omat URL-sivunsa. Muutama sivu voi tarkoittaa esimerkiksi Etusivu + Palvelut + Yhteystiedot. Suurempi monisivuinen sivusto sopii, kun sisältöä tai toimintoja on paljon. Sinun ei tarvitse tuntea teknisiä termejä — voit kuvailla mitä ajattelet tai valita alta."
 );}
function ensureStyle(){if(document.getElementById("an50-context-style"))return;const s=document.createElement("style");s.id="an50-context-style";s.textContent=`.an50-context-options{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.an50-context-choice{appearance:none;border:2px solid #ec46b5;background:#fff;color:#171717;border-radius:16px;padding:9px 12px;font:800 13px/1.2 Arial;cursor:pointer;touch-action:manipulation}.an50-context-choice:hover,.an50-context-choice:focus{background:#fff2fb}.an50-context-choice.help{border-color:#777;font-weight:700}@media(max-width:640px){.an50-context-options{display:grid;grid-template-columns:1fr}.an50-context-choice{width:100%;min-height:44px}}`;document.head.appendChild(s);}
function appendChoices(){
 const c=W.state.context(),opts=optionsFor(c),b=W.ui.bubble();if(!b||!b.classList.contains("show")||!opts.length)return;
 b.querySelector(".an50-context-options")?.remove();const box=document.createElement("div");box.className="an50-context-options";const l=lang();
 opts.forEach((o,i)=>{const bt=document.createElement("button");bt.type="button";bt.className="an50-context-choice";bt.dataset.anitaContextValue=o.value;bt.textContent=(i+1)+". "+(o.labels[l]||o.labels.en);box.appendChild(bt);});
 const help=document.createElement("button");help.type="button";help.className="an50-context-choice help";help.dataset.anitaContextHelp="1";help.textContent=say(l,"What's the difference?","В чём разница?","Mitä eroa näillä on?");box.appendChild(help);b.appendChild(box);
}
function renderKeepingPending(text){W.ui.bubbleText(text);setTimeout(appendChoices,0);}
function accept(value){const c=W.state.context(),b=Object.assign({},c.websiteBrief||{});if(c.pending==="size"){b.size=value;W.state.patch({websiteBrief:b,pending:null,pendingAction:null,lastRoute:"V042_CONTEXT_SIZE"});/* feed a canonical answer through the normal core so it advances/finalizes */const input=document.getElementById("an50-input"),send=document.getElementById("an50-send");if(input&&send){input.value=value;send.click();}return true;}return false;}
function intercept(e){const input=document.getElementById("an50-input");if(!input)return false;const c=W.state.context();if(c?.topic!=="website_consultation"||!c.pending)return false;const text=clean(input.value);if(!text)return false;
 if(asksDifference(text)||asksExample(text)||unsure(text)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();input.value="";renderKeepingPending(explanation(lang()));return true;}
 if(c.pending==="size"){const value=resolveSize(text);if(value){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();input.value="";accept(value);return true;}}
 return false;
}
document.addEventListener("click",e=>{const help=e.target?.closest?.("[data-anita-context-help]");if(help){e.preventDefault();e.stopPropagation();renderKeepingPending(explanation(lang()));return;}const bt=e.target?.closest?.("[data-anita-context-value]");if(bt){e.preventDefault();e.stopPropagation();accept(bt.dataset.anitaContextValue);return;}const send=e.target?.closest?.("#an50-send");if(send)intercept(e);},true);
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target?.closest?.("#an50-input"))intercept(e);},true);
/* Re-add contextual buttons whenever ANITA renders a normal pending question. */
const oldBubble=W.ui.bubbleText.bind(W.ui);W.ui.bubbleText=function(t){oldBubble(t);setTimeout(appendChoices,0);};
ensureStyle();setTimeout(appendChoices,100);
window.__ANITA_V042__={contextualAnswers:true,shortAnswers:true,ordinalOptions:true,clarificationKeepsPending:true,briefChoiceButtons:true};
console.log("[ANITA 0.4.2 HUMAN-TECH CONTEXT]",window.__ANITA_V042__);
})(window.ANITA50=window.ANITA50||{});