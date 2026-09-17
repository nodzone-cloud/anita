/* ANITA 0.4.1 — OPEN BRIEF UNDERSTANDING
 * Goal: during an active website brief, understand the visitor's own wording
 * instead of forcing them to repeat menu phrases. Context wins over keywords.
 */
(function(W){
"use strict";
if(!W||!W.state||W.__briefUnderstanding041)return;
const R=W.router038||W.router034,S=W.semantic,A=W.semanticAdapter;
if(!R||!S||!A)return;
W.__briefUnderstanding041=true;

const clean=v=>String(v==null?"":v).trim();
const norm=v=>clean(v).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const uniq=a=>[...new Set((a||[]).map(v=>clean(v).toLowerCase()).filter(Boolean))];

function goalSignals(text){
  const x=norm(text),req=[],goals=[];
  const ru=/[а-яё]/i.test(x),fi=/[äöå]/i.test(x);
  const price=/\b(?:price|prices|pricing|cost|see prices|view prices)\b|цен|стоим|прайс/i.test(x);
  const sales=/\b(?:buy|purchase|shop|order products?|buy products?|purchase products?|sell online)\b|покуп|купит|приобрет|заказ.*товар|товар.*(?:куп|заказ)|verkkokauppa|osta|ostaa|tilata/i.test(x);
  const contact=/\b(?:contact|message|call|email|reach us|reach me|get in touch)\b|связ|контакт|напис|позвон|звон|yhtey|viesti|soitta/i.test(x);
  const booking=/\b(?:book|booking|reserve|appointment|choose a time|pick a time|available time)\b|брон|выб(?:рать|ирать).{0,25}врем|врем.{0,25}(?:выб|брон)|запис|varaa|varata|ajanvaraus/i.test(x);
  const info=/\b(?:information|info|learn about|read about|find information|get information)\b|информац|узна(?:ть|вать)|tieto|lisätieto/i.test(x);
  const services=/\b(?:services|service list|see services|view services)\b|услуг|palvelut|palvelu/i.test(x);
  const quote=/\b(?:quote|estimate|request a quote)\b|расч[её]т|оценк.*стоим|tarjouspyynt/i.test(x);
  if(price){req.push("price list");goals.push("see prices");}
  if(sales){req.push("product sales");goals.push("buy products online");}
  if(contact){req.push("contact");goals.push("contact the business");}
  if(booking){req.push("booking");goals.push("choose and book a suitable time");}
  if(info){req.push("information");goals.push("get information");}
  if(services){req.push("services");goals.push("see the services");}
  if(quote){req.push("quote request");goals.push("request a quote");}
  return {requirements:uniq(req),goals:uniq(goals),matched:req.length>0,ru,fi};
}
function looksLikeGoalAnswer(text){
  const x=norm(text);if(!x)return false;
  if(goalSignals(x).matched)return true;
  if(/\b(?:i|we)\s+(?:want|need|would like)|(?:customers?|clients?|visitors?|people)\s+(?:can|should|must|need to|could|will)\b/i.test(x))return true;
  if(/(?:я|мы)\s+(?:хочу|хотим|нужно)|(?:клиент|покупател|посетител).{0,45}(?:мог|долж|буд)|^(?:смотреть|посмотреть|покупать|купить|связаться|связываться|заказывать|заказать|бронировать|выбирать|узнавать|получать)\b/i.test(x))return true;
  if(/(?:haluan|haluamme|tarvitsen|asiakka|kävij).{0,45}(?:voi|voivat|pitää|pysty)/i.test(x))return true;
  return false;
}

/* Natural confirmations: visitors do not have to type one exact yes/no token. */
const oldYes=R.yes.bind(R),oldNo=R.no.bind(R);
R.yes=function(text){const x=norm(text);return oldYes(text)||/^(?:yes[, ]|yeah[, ]|sure[, ]|of course|absolutely|sounds good|that works|i do|i would|да[, ]|ага[, ]|конечно|точно|нужно|да это нужно|да хочу|хочу|подходит|согласен|согласна|kyllä[, ]|joo[, ]|tottakai|sopii)/i.test(x);};
R.no=function(text){const x=norm(text);return oldNo(text)||/^(?:no[, ]|no thanks|not for now|i don't|i do not|rather not|нет[, ]|не надо|не нужно|не хочу|не сейчас|не обязательно|ei[, ]|ei kiitos|en halua|ei tarvitse)/i.test(x);};

/* Context-first router. A word like "prices" inside the answer to the GOAL
 * question is an answer to the brief, not a request for Alex Node's price list. */
const oldClassify=R.classify.bind(R);
R.classify=function(text){
  const c=W.state.context(),base=oldClassify(text),l=R.lang(text,c),pa=String(c.pendingAction||"");
  if(!R.briefActive(c))return base;
  if(["new_brief","continue_brief","prepare_brief","greeting","social_question","social_status","social_reaction","meta"].includes(base.intent))return base;
  if(pa.startsWith("confirm_need:")){
    if(R.yes(text)||R.no(text))return{intent:"brief_answer",language:l};
    return base;
  }
  if(c.pending==="goal"){
    if(looksLikeGoalAnswer(text))return{intent:"brief_answer",language:l};
    if(!R.question(text)&&clean(text).length>1)return{intent:"brief_answer",language:l};
  }
  if(c.pending==="size"&&!R.question(text)&&clean(text).length>1)return{intent:"brief_answer",language:l};
  return base;
};
W.router038=R;W.router034=R;

/* Augment the existing AI semantic interpreter with strong local meaning.
 * The AI remains the main semantic brain; this fallback prevents simple natural
 * phrases from collapsing into a scripted price/service route. */
const oldInterpret=S.interpret.bind(S);
S.interpret=async function(text,language){
  let out;
  try{out=await oldInterpret(text,language);}catch(_){out={intent:"other",confidence:0};}
  out=Object.assign({intent:"other",business:null,goal:null,confirmed_requirements:[],inferred_suggestions:[],customer_signals:[],size:null,confidence:0},out||{});
  const c=W.state.context();
  if(c&&c.topic==="website_consultation"&&c.pending==="goal"){
    const g=goalSignals(text);
    if(g.matched){
      out.intent="website_requirements";
      out.confirmed_requirements=uniq([...(out.confirmed_requirements||[]),...g.requirements]);
      const existing=clean(out.goal);
      const local=g.goals.join(" and ");
      out.goal=existing||local;
      out.confidence=Math.max(Number(out.confidence||0),0.96);
    }else if(looksLikeGoalAnswer(text)){
      out.intent="website_goal";
      out.goal=clean(out.goal)||clean(text);
      out.confidence=Math.max(Number(out.confidence||0),0.84);
    }
  }
  return out;
};

/* Ask an open question, not a vocabulary menu. */
const oldRoute=A.routeToSecretary.bind(A);
A.routeToSecretary=function(h){
  const r=oldRoute(h);if(!r||r.kind!=="answer"||r.pending!=="goal")return r;
  const l=r.language||W.state.context()?.language||"en";
  r.text=l==="ru"
    ?"Поняла 😊 Что вы хотите, чтобы посетитель мог делать на сайте? Ответьте своими словами — я разберу смысл."
    :l==="fi"
      ?"Selvä 😊 Mitä haluat kävijän voivan tehdä sivustolla? Vastaa omin sanoin — ymmärrän tarkoituksen."
      :"Got it 😊 What do you want visitors to be able to do on the website? Answer in your own words — I'll understand the meaning.";
  return r;
};

/* Natural Russian wording for booking suggestions. */
const oldQuestionForNeed=A.questionForNeed.bind(A);
A.questionForNeed=function(k,l,b){
  if(k==="booking"&&l==="ru")return"Похоже, выбор времени — часть пути клиента. Хотите, чтобы посетитель мог выбрать и забронировать подходящее время прямо на сайте?";
  if(k==="availability calendar"&&l==="ru")return"Похоже, клиентам важно видеть свободное время. Хотите показать доступные слоты и дать возможность выбрать и забронировать подходящее время прямо на сайте?";
  return oldQuestionForNeed(k,l,b);
};

window.__ANITA_V041__={openBriefLanguage:true,contextFirstRouting:true,semanticGoalUnderstanding:true,naturalConfirmations:true,noGoalMenu:true};
console.log("[ANITA 0.4.1 OPEN BRIEF UNDERSTANDING]",window.__ANITA_V041__);
})(window.ANITA50=window.ANITA50||{});
