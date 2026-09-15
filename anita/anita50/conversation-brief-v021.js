/* ANITA 0.2.1 — brief focus + conversation/project separation + data hygiene */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||W.__conversationBrief021)return;
W.__conversationBrief021=true;

const oldRoute=W.roles.route.bind(W.roles);
const oldSemanticInterpret=W.semantic&&W.semantic.interpret?W.semantic.interpret.bind(W.semantic):null;
const oldSemanticShouldTry=W.semantic&&W.semantic.shouldTry?W.semantic.shouldTry.bind(W.semantic):null;
const oldAIAsk=W.ai&&W.ai.ask?W.ai.ask.bind(W.ai):null;
const oldBuildHandoff=W.semanticAdapter&&W.semanticAdapter.buildHandoff?W.semanticAdapter.buildHandoff.bind(W.semanticAdapter):null;
const oldSecretary=W.semanticAdapter&&W.semanticAdapter.routeToSecretary?W.semanticAdapter.routeToSecretary.bind(W.semanticAdapter):null;

const clean=s=>String(s==null?"":s).trim();
const norm=s=>clean(s).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
function lang(text,c){const s=String(text||"");if(/[А-Яа-яЁё]/.test(s))return"ru";if(/[äöåÄÖÅ]/.test(s))return"fi";return(c&&c.language)||"en";}

function isGreeting(x){return /^(?:hi|hello|hey|hiya|привет|здравствуй|здравствуйте|hei|moi|moikka)$/.test(norm(x));}
function isSmalltalk(x){return /^(?:how are you|how're you|how are u|how is it going|how's it going|what's up|whats up|how have you been|как дела|как ты|как поживаешь|mitä kuuluu|kuinka voit|miten menee)$/.test(norm(x));}
function isMeta(x){const s=norm(x);return /\b(?:are you ai|are you an ai|your ai status|ai status|what model are you|which model are you|what ai are you|who are you|who created you|who made you|are you real|are you human|what can you do|how do you work|your brain)\b/i.test(s)||/(?:ты.*ии|статус.*ии|какая.*модель|кто ты|кто тебя (?:создал|сделал)|ты настоящ|ты человек|что ты умеешь|как ты работаешь)/i.test(s)||/(?:oletko.*tekoäly|mikä.*malli|kuka.*loi sinut|oletko.*ihminen|mitä osaat|miten toimit)/i.test(s);}
function isQuestion(x){const s=norm(x);return /[?？]/.test(String(x||""))||/^(?:what|what's|whats|why|how|who|when|where|which|can|could|would|should|do|does|did|are|is|will|have|has)\b/i.test(s)||/^(?:что|почему|зачем|как|кто|когда|где|какой|какая|можешь|можно)\b/i.test(s)||/^(?:mitä|miksi|miten|kuka|milloin|missä|mikä|voitko|voiko|oletko|onko)\b/i.test(s);}
function hasProjectWords(x){return /\b(?:website|web site|site|page|pages|section|sections|business|customer|client|visitor|booking|book|appointment|calendar|price|pricing|product|shop|store|service|gallery|portfolio|contact|quote|map|location|sell|buy|order|requirement|brief|project)\b/i.test(norm(x))||/(?:сайт|страниц|раздел|бизнес|клиент|посетител|брон|запис|календар|цен|товар|магазин|услуг|галере|портфолио|контакт|проект|бриф)/i.test(norm(x));}
function isSide(x){return isGreeting(x)||isSmalltalk(x)||isMeta(x)||(isQuestion(x)&&!hasProjectWords(x));}
function isYesNo(x){return /^(?:yes|yeah|yep|yes please|sure|okay|ok|good idea|that would help|i want that|no|nope|not really|not needed|i don't need that|да|ага|хорошо|ок|нет|не надо|не нужно|kyllä|joo|sopii|ei|ei tarvitse)$/.test(norm(x));}
function isDonePhrase(x){return /^(?:nothing|nothing else|that's all|thats all|all good|no thanks|no thank you|done|finished|нет больше|ничего|ничего больше|всё|все|готово|ei muuta|siinä kaikki|valmis)$/.test(norm(x));}

function briefActive(c){if(!c||c.topic!=="website_consultation")return false;const pa=String(c.pendingAction||"");return !!(c.pending||pa.startsWith("confirm_need:"));}
function briefComplete(c){if(!c||c.topic!=="website_consultation")return false;const b=c.websiteBrief||{};return !c.pending&&!c.pendingAction&&!!(b.business||b.goal||b.size||(b.requirements||[]).length);}
function pendingQuestion(c,l){
  const pa=String(c.pendingAction||"");
  if(pa.startsWith("confirm_need:")&&W.semanticAdapter&&W.semanticAdapter.questionForNeed){return W.semanticAdapter.questionForNeed(pa.slice("confirm_need:".length),l,c.websiteBrief||{});}
  if(c.pending==="business")return say(l,"What kind of business is the website for?","Для какого бизнеса нужен сайт?","Millaiselle yritykselle sivusto tulee?");
  if(c.pending==="goal")return say(l,"What should visitors mainly be able to do on the website?","Что посетители должны в первую очередь уметь делать на сайте?","Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?");
  if(c.pending==="size")return say(l,"Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?","Примерно какой объём нужен: одна страница, несколько отдельных страниц или большой многостраничный сайт?","Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?");
  return"";
}
function deferText(c,l){const q=pendingQuestion(c,l);return say(l,"Let's finish our brief first 😊 Then I can answer your other questions.","Давайте сначала закончим наш бриф 😊 А потом я смогу ответить на ваши другие вопросы.","Viimeistellään ensin briiffimme 😊 Sen jälkeen voin vastata muihin kysymyksiisi.")+(q?" "+say(l,"Back to the brief:","Вернёмся к брифу:","Palataan briiffiin:")+" "+q:"");}
function directSideAnswer(text,l){const x=norm(text);if(isGreeting(x))return say(l,"Hi 😊","Привет 😊","Hei 😊");if(isSmalltalk(x))return say(l,"I'm doing well, thank you 😊 What would you like to talk about?","У меня всё хорошо, спасибо 😊 О чём хотите поговорить?","Minulla menee hyvin, kiitos 😊 Mistä haluaisit puhua?");if(/\b(?:are you ai|are you an ai)\b/i.test(x)||/ты.*ии/i.test(x)||/oletko.*tekoäly/i.test(x))return say(l,"Yes 😊 I'm ANITA, Alex Node's virtual IT Assistant. I use AI for extended assistance, while my project and business logic also has structured rules and memory.","Да 😊 Я ANITA, виртуальный IT-ассистент Alex Node. Я использую ИИ для расширенной помощи, а логика проектов и бизнеса также опирается на структурированные правила и память.","Kyllä 😊 Olen ANITA, Alex Noden virtuaalinen IT-assistentti. Käytän tekoälyä laajennettuun apuun, ja projekti- sekä liiketoimintalogiikassani on myös rakenteisia sääntöjä ja muistia.");if(/\b(?:who created you|who made you)\b/i.test(x)||/кто тебя (?:создал|сделал)/i.test(x))return say(l,"I was created by Alex Node 😊","Меня создал Alex Node 😊","Minut loi Alex Node 😊");if(/\b(?:who are you|are you real|are you human)\b/i.test(x)||/кто ты|ты настоящ|ты человек/i.test(x))return say(l,"I'm ANITA — Alex Node's virtual IT Assistant 😊 I'm not a human.","Я ANITA — виртуальный IT-ассистент Alex Node 😊 Я не человек.","Olen ANITA — Alex Noden virtuaalinen IT-assistentti 😊 En ole ihminen.");return null;}

function splitBusiness(raw){
  const s=clean(raw).replace(/[.!?,;:]+$/g,"").trim();
  if(!s)return{business:s,description:null};
  const patterns=[
    /^(.{2,55}?)\s+(?:and\s+)?(i|we)\s+(sell|repair|provide|offer|make|build|serve|stock|supply|install|design|create)\s+(.+)$/i,
    /^(.{2,55}?)\s+(?:where|that)\s+(i|we)\s+(sell|repair|provide|offer|make|build|serve|stock|supply|install|design|create)\s+(.+)$/i
  ];
  for(const rx of patterns){const m=s.match(rx);if(m){const business=clean(m[1]).replace(/[,-]+$/g,"").trim();const description=(m[2]+" "+m[3]+" "+m[4]).trim();if(business.length>=2)return{business,description};}}
  return{business:s,description:null};
}
function sectionCount(req){const m=String(req||"").match(/^(\d{1,2})\s+(?:sections?\s*\/\s*pages?|sections?|pages?)$/i);return m?Number(m[1]):null;}
function sanitizeBrief(input){
  const b=Object.assign({},input||{}),req=Array.isArray(b.requirements)?b.requirements:[];
  let count=null;
  b.requirements=req.filter(v=>{const n=sectionCount(v);if(n!=null){count=count||n;return false;}return true;});
  if(count&&!b.size){b.size=count===1?"one landing page":count<=5?"a few separate pages":"a larger multi-page site";}
  if(b.business){const p=splitBusiness(b.business);b.business=p.business;if(p.description&&!b.businessDescription)b.businessDescription=p.description;}
  return b;
}
function sanitizeMemory(input,b){const m=Object.assign({},input||{});if(m.business){const p=splitBusiness(m.business);m.business=p.business;if(p.description&&!m.businessDescription)m.businessDescription=p.description;}if(b&&b.business)m.business=b.business;if(b&&b.businessDescription&&!m.businessDescription)m.businessDescription=b.businessDescription;return m;}
function sanitizeStored(){const c=W.state.context(),b=sanitizeBrief(c.websiteBrief||{}),m=sanitizeMemory(c.clientMemory||{},b);const changed=JSON.stringify(b)!==JSON.stringify(c.websiteBrief||{})||JSON.stringify(m)!==JSON.stringify(c.clientMemory||{});if(changed)W.state.patch({websiteBrief:b,clientMemory:m,lastRoute:"V021_DATA_HYGIENE"});}

sanitizeStored();

if(oldSemanticInterpret){
  W.semantic.interpret=async function(text,language){const o=await oldSemanticInterpret(text,language);if(o&&o.business){const p=splitBusiness(o.business);o.business=p.business;if(p.description)o.businessDescription=p.description;}return o;};
}
if(oldBuildHandoff){
  W.semanticAdapter.buildHandoff=function(o,text){const h=oldBuildHandoff(o,text);if(h&&o&&o.businessDescription)h.businessDescription=o.businessDescription;return h;};
}
if(oldSecretary){
  W.semanticAdapter.routeToSecretary=function(h){const r=oldSecretary(h);if(r&&r.brief){r.brief=sanitizeBrief(r.brief);if(h&&h.businessDescription&&!r.brief.businessDescription)r.brief.businessDescription=h.businessDescription;r.memory=sanitizeMemory(r.memory||{},r.brief);W.state.patch({websiteBrief:r.brief,clientMemory:r.memory});}return r;};
}

W.roles.route=function(text){
  const c0=W.state.context(),l=lang(text,c0);

  // While the brief is unfinished, unrelated questions are postponed instead of
  // becoming business/goal/size data. Yes/no answers to a pending confirmation still pass through.
  if(briefActive(c0)&&isSide(text)&&!isYesNo(text)){
    const deferred=[...((c0.deferredQuestions&&Array.isArray(c0.deferredQuestions))?c0.deferredQuestions:[])];
    const raw=clean(text);if(raw&&!deferred.includes(raw))deferred.push(raw);
    W.state.patch({deferredQuestions:deferred.slice(-5),lastRoute:"V021_DEFERRED_SIDE_QUESTION"});
    return{kind:"answer",role:"secretary",language:l,topic:c0.topic,pending:c0.pending,pendingAction:c0.pendingAction,brief:c0.websiteBrief||{},memory:c0.clientMemory||{},pose:"professional",text:deferText(c0,l)};
  }

  // Once the brief is complete, normal conversation is allowed again and must
  // not dump the project summary unless the visitor explicitly asks for it.
  if(briefComplete(c0)&&isSide(text)){
    const known=directSideAnswer(text,l);
    if(known)return{kind:"answer",role:"guide",language:l,topic:c0.topic,pending:null,pendingAction:null,brief:c0.websiteBrief||{},memory:c0.clientMemory||{},pose:"neutral",text:known};
    W.__sideAIPass021={text:String(text||""),language:l};
    return{kind:"side_ai",role:"guide",language:l,topic:c0.topic,pending:null,pendingAction:null,brief:c0.websiteBrief||{},memory:c0.clientMemory||{},pose:"neutral"};
  }

  if(briefComplete(c0)&&isDonePhrase(text)){
    return{kind:"answer",role:"guide",language:l,topic:c0.topic,pending:null,pendingAction:null,brief:c0.websiteBrief||{},memory:c0.clientMemory||{},pose:"neutral",text:say(l,"No problem 😊 I've kept the project brief. If you need anything else later, just ask me.","Хорошо 😊 Я сохранила бриф проекта. Если позже понадобится что-то ещё — просто спросите меня.","Selvä 😊 Säilytin projektibriiffin. Jos tarvitset myöhemmin jotain muuta, kysy vain.")};
  }

  const r=oldRoute(text);
  if(r&&r.brief){r.brief=sanitizeBrief(r.brief);r.memory=sanitizeMemory(r.memory||c0.clientMemory||{},r.brief);}
  if(r&&r.pending===null&&c0.deferredQuestions&&c0.deferredQuestions.length&&r.kind==="answer"){
    r.text=String(r.text||"")+" "+say(l,"We've finished the brief 😊 You can ask me your other question now.","Мы закончили бриф 😊 Теперь можете задать мне ваш другой вопрос.","Briiffi on valmis 😊 Voit nyt kysyä minulta muun kysymyksesi.");
  }
  return r;
};

if(oldSemanticShouldTry){
  W.semantic.shouldTry=function(text){if(W.__sideAIPass021&&String(text||"")===W.__sideAIPass021.text)return false;return oldSemanticShouldTry(text);};
}
if(oldAIAsk){
  W.ai.ask=async function(text,language){
    const p=W.__sideAIPass021;
    if(p&&String(text||"")===p.text){W.__sideAIPass021=null;const instruction="GENERAL CONVERSATION AFTER A WEBSITE BRIEF. Answer the visitor's question normally and briefly in their language. Do not summarize, modify or reinterpret the saved website project unless the visitor explicitly asks about the project. Visitor: "+JSON.stringify(String(text||""));return oldAIAsk(instruction,language||p.language);}
    return oldAIAsk(text,language);
  };
}

window.__ANITA_V021__={briefFocus:true,sideConversationAfterBrief:true,businessDescription:true,requirementHygiene:true};
})(window.ANITA50=window.ANITA50||{});
