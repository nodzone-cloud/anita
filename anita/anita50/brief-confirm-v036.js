/* ANITA 0.3.6 — VISUAL BRIEF CONFIRMATION
 * UI interaction only: keeps the v034 central router/core as the decision system.
 * At final brief completion, shows a readable review plus Yes/No buttons.
 */
(function(W){
"use strict";
if(!W||!W.ui||!W.state||W.__briefConfirm036)return;
W.__briefConfirm036=true;

const C=window.ANITA50_CONFIG||{};
const rawBubbleText=W.ui.bubbleText.bind(W.ui);
const clean=v=>String(v==null?"":v).trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
const lang=()=>W.state.context()?.language||"en";

function brief(c){return Object.assign({business:null,businessDescription:null,goal:null,size:null,requirements:[],recommendedPackage:null,recommendedStructure:null,needsAlexReview:false,commerceMode:null},c?.websiteBrief||{});}
function fingerprint(b){return JSON.stringify({business:b.business||null,businessDescription:b.businessDescription||null,goal:b.goal||null,size:b.size||null,requirements:[...(b.requirements||[])].map(String).sort(),commerceMode:b.commerceMode||null,recommendedStructure:b.recommendedStructure||null,recommendedPackage:b.recommendedPackage||null,needsAlexReview:!!b.needsAlexReview});}
function finalRoute(c){return ["V034_BRIEF_FINALIZED","V033_BRIEF_FINALIZED"].includes(String(c?.lastRoute||""));}
function reviewText(c,l){
  const b=brief(c),p=[];
  p.push(say(l,"Great 😊 Here is the final brief for you to check:","Отлично 😊 Вот итоговый бриф — проверьте, всё ли верно:","Hyvä 😊 Tässä on lopullinen briiffi tarkistettavaksi:"));
  if(b.business)p.push(say(l,"Business: "+b.business+".","Бизнес: "+b.business+".","Yritys: "+b.business+"."));
  if(b.businessDescription)p.push(say(l,"Business description: "+b.businessDescription+".","Описание бизнеса: "+b.businessDescription+".","Yrityksen kuvaus: "+b.businessDescription+"."));
  if(b.goal)p.push(say(l,"Website goal: "+b.goal+".","Цель сайта: "+b.goal+".","Sivuston tavoite: "+b.goal+"."));
  if(b.size)p.push(say(l,"Website size: "+b.size+".","Размер сайта: "+b.size+".","Sivuston koko: "+b.size+"."));
  if((b.requirements||[]).length)p.push(say(l,"Confirmed requirements: "+b.requirements.join(", ")+".","Подтверждённые требования: "+b.requirements.join(", ")+".","Vahvistetut vaatimukset: "+b.requirements.join(", ")+"."));
  if(b.commerceMode)p.push(say(l,"Purchase flow: "+(b.commerceMode==="checkout"?"cart / checkout / online payment":"order request")+".","Покупка: "+(b.commerceMode==="checkout"?"корзина / checkout / онлайн-оплата":"заявка на заказ")+".","Ostopolku: "+(b.commerceMode==="checkout"?"ostoskori / kassa / verkkomaksu":"tilauspyyntö")+"."));
  if(b.recommendedStructure)p.push(say(l,"Suggested structure: "+b.recommendedStructure+".","Предлагаемая структура: "+b.recommendedStructure+".","Ehdotettu rakenne: "+b.recommendedStructure+"."));
  if(b.needsAlexReview)p.push(say(l,"Technical note: Alex should confirm the exact implementation, package and price before anything is agreed.","Техническая пометка: Алекс должен подтвердить точную реализацию, пакет и цену до каких-либо договорённостей.","Tekninen huomio: Alexin tulee vahvistaa tarkka toteutus, paketti ja hinta ennen sopimista."));
  else if(b.recommendedPackage){const price=C.packages?.[b.recommendedPackage]?.price||"";p.push(say(l,"Closest package: "+b.recommendedPackage+(price?" — "+price:"")+".","Ближайший пакет: "+b.recommendedPackage+(price?" — "+price:"")+".","Lähin paketti: "+b.recommendedPackage+(price?" — "+price:"")+"."));}
  p.push(say(l,"Nothing has been sent automatically. Is everything correct?","Ничего автоматически не отправлялось. Всё верно?","Mitään ei ole lähetetty automaattisesti. Onko kaikki oikein?"));
  return p.join(" ");
}
function injectStyle(){if(document.getElementById("an50-brief-confirm-style"))return;const s=document.createElement("style");s.id="an50-brief-confirm-style";s.textContent=`
#an50-bubble.an50-brief-review{max-height:calc(100vh - 300px);overflow:auto}
.an50-brief-confirm-question{margin-top:12px;font-weight:800}
.an50-brief-confirm-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}
.an50-brief-choice{appearance:none;-webkit-appearance:none;background:#fff;color:#171717;border:3px solid #ec46b5;border-radius:18px;padding:10px 15px;font:800 14px/1.15 Arial,sans-serif;box-shadow:0 6px 16px rgba(0,0,0,.12);cursor:pointer;touch-action:manipulation}
.an50-brief-choice:active{transform:scale(.98)}
.an50-brief-choice.primary{background:#ec46b5;color:#fff}
.an50-brief-edit-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}
.an50-brief-edit-actions .an50-brief-choice{padding:8px 11px;font-size:13px}
@media(max-width:640px){#an50-bubble.an50-brief-review{max-height:calc(100vh - 300px)}.an50-brief-confirm-actions{display:grid;grid-template-columns:1fr 1fr}.an50-brief-choice{width:100%;min-height:46px}}
`;document.head.appendChild(s);}
function textDiv(text){const d=document.createElement("div");d.textContent=text;return d;}
function button(label,action,primary=false){const b=document.createElement("button");b.type="button";b.className="an50-brief-choice"+(primary?" primary":"");b.dataset.anitaBriefAction=action;b.textContent=label;return b;}
function renderReview(){const c=W.state.context(),l=lang(),b=brief(c),fp=fingerprint(b),el=W.ui.bubble();if(!el)return;el.innerHTML="";el.classList.add("an50-brief-review","show");el.appendChild(textDiv(reviewText(c,l)));const actions=document.createElement("div");actions.className="an50-brief-confirm-actions";actions.append(button(say(l,"✓ Yes, correct","✓ Да, всё верно","✓ Kyllä, oikein"),"confirm",true),button(say(l,"✎ No, change something","✎ Нет, изменить","✎ Ei, muuta jotain"),"change"));el.appendChild(actions);W.state.patch({briefConfirmationFingerprint:fp,briefConfirmed:false,lastRoute:"V036_AWAITING_CONFIRMATION"});}
function renderEditMenu(){const c=W.state.context(),l=lang(),el=W.ui.bubble();if(!el)return;el.innerHTML="";el.classList.add("an50-brief-review","show");el.appendChild(textDiv(say(l,"No problem 😊 Nothing has been sent. What would you like to correct?","Без проблем 😊 Ничего не отправлялось. Что вы хотите исправить?","Ei hätää 😊 Mitään ei ole lähetetty. Mitä haluaisit korjata?")));const actions=document.createElement("div");actions.className="an50-brief-edit-actions";actions.append(button(say(l,"Business","Бизнес","Yritys"),"edit-business"),button(say(l,"Main goal","Цель сайта","Päätavoite"),"edit-goal"),button(say(l,"Site size","Размер сайта","Sivuston koko"),"edit-size"));if(brief(c).commerceMode||String(brief(c).goal||"").match(/buy|purchase|shop|order/i))actions.append(button(say(l,"Purchase setup","Покупка / оплата","Osto / maksu"),"edit-commerce"));actions.append(button(say(l,"Start a new brief","Новый бриф","Uusi briiffi"),"new-brief"));el.appendChild(actions);}
function clearDerived(b){b.recommendedPackage=null;b.recommendedStructure=null;b.needsAlexReview=false;return b;}
function edit(action){const c=W.state.context(),l=lang(),b=clearDerived(brief(c)),m=Object.assign({},c.clientMemory||{});if(action==="edit-business"){b.business=null;b.businessDescription=null;m.business=null;m.businessRaw=null;m.businessDescription=null;W.state.patch({websiteBrief:b,clientMemory:m,briefStage:"collecting",briefConfirmed:false,pending:"business",pendingAction:null,lastRoute:"V036_EDIT_BUSINESS"});rawBubbleText(say(l,"Of course 😊 What kind of business is the website for?","Конечно 😊 Для какого бизнеса нужен сайт?","Totta kai 😊 Millaiselle yritykselle sivusto tulee?"));return;}
  if(action==="edit-goal"){b.goal=null;b.commerceMode=null;b.requirements=(b.requirements||[]).filter(v=>!["product sales","online checkout","order request"].includes(String(v).toLowerCase()));W.state.patch({websiteBrief:b,briefStage:"collecting",briefConfirmed:false,pending:"goal",pendingAction:null,lastRoute:"V036_EDIT_GOAL"});rawBubbleText(say(l,"Sure 😊 What should visitors mainly be able to do on the website?","Конечно 😊 Что посетители должны в первую очередь уметь делать на сайте?","Totta kai 😊 Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?"));return;}
  if(action==="edit-size"){b.size=null;W.state.patch({websiteBrief:b,briefStage:"collecting",briefConfirmed:false,pending:"size",pendingAction:null,lastRoute:"V036_EDIT_SIZE"});rawBubbleText(say(l,"Sure 😊 Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?","Конечно 😊 Какой примерно объём нужен: одна страница, несколько отдельных страниц или большой многостраничный сайт?","Totta kai 😊 Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?"));return;}
  if(action==="edit-commerce"){b.commerceMode=null;b.requirements=(b.requirements||[]).filter(v=>!["online checkout","order request"].includes(String(v).toLowerCase()));W.state.patch({websiteBrief:b,briefStage:"clarifying_commerce",briefConfirmed:false,pending:null,pendingAction:"commerce_mode",lastRoute:"V036_EDIT_COMMERCE"});rawBubbleText(say(l,"Sure 😊 Should customers pay directly on the website with a cart/checkout, or choose products and send you an order/request?","Конечно 😊 Клиенты должны оплачивать прямо на сайте через корзину/checkout или выбирать товары и отправлять заказ/заявку?","Totta kai 😊 Maksavatko asiakkaat suoraan sivustolla ostoskorin/kassan kautta vai lähettävätkö tilauspyynnön?"));return;}
  if(action==="new-brief"){const fresh={business:null,businessDescription:null,goal:null,size:null,requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[],recommendedPackage:null,recommendedStructure:null,needsAlexReview:false,commerceMode:null};m.business=null;m.businessRaw=null;m.businessDescription=null;W.state.patch({websiteBrief:fresh,clientMemory:m,topic:"website_consultation",role:"secretary",briefStage:"collecting",briefConfirmed:false,pending:"business",pendingAction:null,lastRoute:"V036_NEW_BRIEF"});rawBubbleText(say(l,"Absolutely 😊 Let's start fresh. Nothing from the previous brief was sent. What kind of business is this website for?","Конечно 😊 Начнём заново. Ничего из предыдущего брифа не отправлялось. Для какого бизнеса нужен этот сайт?","Totta kai 😊 Aloitetaan alusta. Mitään edellisestä briiffistä ei lähetetty. Millaiselle yritykselle sivusto tulee?"));}
}

W.ui.bubbleText=function(text){injectStyle();const c=W.state.context(),b=brief(c),fp=fingerprint(b);if(finalRoute(c)&&c.briefStage==="complete"&&c.briefConfirmedFingerprint!==fp){renderReview();return;}const el=W.ui.bubble();if(el)el.classList.remove("an50-brief-review");rawBubbleText(text);};

document.addEventListener("click",function(e){const btn=e.target?.closest?.("[data-anita-brief-action]");if(!btn)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const action=btn.dataset.anitaBriefAction,l=lang();if(action==="confirm"){const b=brief(W.state.context()),fp=fingerprint(b);W.state.patch({briefConfirmed:true,briefConfirmedFingerprint:fp,briefStage:"complete",pending:null,pendingAction:null,lastRoute:"V036_BRIEF_CONFIRMED"});const el=W.ui.bubble();if(el)el.classList.remove("an50-brief-review");rawBubbleText(say(l,"Perfect 😊 The brief is confirmed. Nothing has been sent automatically. You can still ask me to show it again, change it, start a new brief, or ask another Alex Node question.","Отлично 😊 Бриф подтверждён. Ничего автоматически не отправлялось. Вы всё ещё можете попросить показать его снова, изменить его, начать новый бриф или задать другой вопрос об Alex Node.","Täydellistä 😊 Briiffi on vahvistettu. Mitään ei ole lähetetty automaattisesti. Voit silti pyytää näyttämään sen uudelleen, muuttaa sitä, aloittaa uuden briiffin tai kysyä muuta Alex Nodesta."));return;}if(action==="change"){W.state.patch({briefConfirmed:false,lastRoute:"V036_BRIEF_CHANGE_MENU"});renderEditMenu();return;}edit(action);},true);

injectStyle();
window.__ANITA_V036__={briefConfirmationButtons:true,briefCorrectionMenu:true,confirmationFingerprint:true};
console.log("[ANITA 0.3.6 BRIEF CONFIRMATION]",window.__ANITA_V036__);
})(window.ANITA50=window.ANITA50||{});