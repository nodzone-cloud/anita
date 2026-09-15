/* ANITA 0.2.2 — HUMAN-TECH CONVERSATION POLICY
 *
 * Philosophy:
 * - ANITA is a person-like business assistant, not a sales machine.
 * - Before a brief starts, allow natural short conversation and gently offer help.
 * - Do not force a website brief just because the visitor says hello or makes small talk.
 * - While a brief is actively being collected, keep focus and postpone unrelated questions.
 * - Outside a brief, keep longer conversation relevant to Alex Node / its services / IT / websites / virtual characters.
 */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||W.__humanTech022)return;
W.__humanTech022=true;

const oldRoute=W.roles.route.bind(W.roles);
const clean=s=>String(s==null?"":s).trim();
const norm=s=>clean(s).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
function lang(text,c){const s=String(text||"");if(/[А-Яа-яЁё]/.test(s))return"ru";if(/[äöåÄÖÅ]/.test(s))return"fi";return(c&&c.language)||"en";}

function briefActive(c){
  if(!c||c.topic!=="website_consultation")return false;
  const pa=String(c.pendingAction||"");
  return !!(c.pending||pa.startsWith("confirm_need:"));
}
function pendingQuestion(c,l){
  const pa=String(c.pendingAction||"");
  if(pa.startsWith("confirm_need:")&&W.semanticAdapter&&W.semanticAdapter.questionForNeed){
    return W.semanticAdapter.questionForNeed(pa.slice("confirm_need:".length),l,c.websiteBrief||{});
  }
  if(c.pending==="business")return say(l,"What kind of business is the website for?","Для какого бизнеса нужен сайт?","Millaiselle yritykselle sivusto tulee?");
  if(c.pending==="goal")return say(l,"What should visitors mainly be able to do on the website?","Что посетители должны в первую очередь уметь делать на сайте?","Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?");
  if(c.pending==="size")return say(l,"Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?","Примерно какой объём нужен: одна страница, несколько отдельных страниц или большой многостраничный сайт?","Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?");
  return"";
}

function greeting(x){return /^(?:hi|hello|hey|hiya|good morning|good afternoon|good evening|привет|здравствуй|здравствуйте|доброе утро|добрый день|добрый вечер|hei|moi|moikka|huomenta)$/.test(norm(x));}
function howAreYou(x){return /^(?:how are you|how're you|how are u|hows it going|how's it going|how is it going|how are things|how's everything|hows everything|how is everything|how have you been|you good|are you good|you okay|are you okay|what's up|whats up|как дела|как ты|как поживаешь|как жизнь|всё хорошо|все хорошо|mitä kuuluu|kuinka voit|miten menee|kaikki hyvin)$/.test(norm(x));}
function thanks(x){return /^(?:thanks|thank you|thanks a lot|thank you very much|thx|спасибо|благодарю|kiitos|kiitti)$/.test(norm(x));}
function reaction(x){return /^(?:cool|nice|great|awesome|good|very good|perfect|excellent|wow|lol|haha|hahaha|окей|круто|здорово|отлично|супер|вау|хаха|hyvä|hienoa|mahtavaa|siisti)$/.test(norm(x));}
function social(x){return greeting(x)||howAreYou(x)||thanks(x)||reaction(x);}

function metaRelevant(x){const s=norm(x);return /\b(?:who are you|what are you|are you ai|are you an ai|are you human|are you real|who created you|who made you|what can you do|your ai status|how do you work)\b/i.test(s)||/(?:кто ты|ты.*ии|ты человек|ты настоящ|кто тебя создал|что ты умеешь|как ты работаешь)/i.test(s)||/(?:kuka olet|oletko.*tekoäly|oletko.*ihminen|kuka.*loi sinut|mitä osaat|miten toimit)/i.test(s);}

function alexNodeRelevant(x){
  const s=norm(x);
  return /\b(?:alex node|alexnode|website|web site|webpage|site|landing page|tilda|wix|wordpress|html|css|domain|hosting|ssl|seo|design|graphic design|logo|flyer|poster|banner|business card|it support|computer|pc|laptop|windows|wifi|wi-fi|router|printer|scanner|monitor|projector|email|outlook|backup|antivirus|driver|usb|bluetooth|virtual character|character|anita|assistant|ai assistant|service|services|package|packages|price|prices|pricing|contact|order|project|brief|business|customer|client|booking|calendar|integration|automation|online store|shop|ecommerce|e-commerce|product|products|support)\b/i.test(s)
    ||/(?:алекс нод|сайт|лендинг|тильд|вордпресс|домен|хостинг|дизайн|логотип|флаер|плакат|баннер|визитк|it.?поддерж|компьютер|ноутбук|windows|вай.?фай|роутер|принтер|сканер|монитор|почт|резервн|антивирус|драйвер|анита|виртуальн.*персонаж|ассистент|услуг|пакет|цен|заказ|проект|бизнес|клиент|брон|календар|интеграц|автоматизац|магазин|товар)/i.test(s)
    ||/(?:verkkosiv|kotisiv|tilda|wordpress|domain|hosting|suunnittelu|logo|it.?tuki|tietokone|kannettava|windows|wifi|reititin|tulostin|sähköposti|varmuuskopio|anita|virtuaali.*hahmo|palvelu|paketti|hinta|projekti|yritys|asiakas|varaus|kalenteri|integraatio|automaatio|verkkokauppa|tuote)/i.test(s);
}
function looksQuestion(x){const s=norm(x);return /[?？]/.test(String(x||""))||/^(?:what|why|how|who|when|where|which|can|could|would|should|do|does|did|are|is|will|have|has|tell me|explain)\b/i.test(s)||/^(?:что|почему|как|кто|когда|где|какой|какая|можешь|можно|расскажи|объясни)\b/i.test(s)||/^(?:mitä|miksi|miten|kuka|milloin|missä|mikä|voitko|kerro|selitä)\b/i.test(s);}
function obviousOfftopicCommand(x){return /\b(?:tell me a joke|make me laugh|sing me|write me a poem|tell me a story|recommend a movie|football score|weather today|recipe|dating advice)\b/i.test(norm(x))||/(?:расскажи анекдот|спой|стих|расскажи сказку|посоветуй фильм|погода сегодня|рецепт|совет.*отношен)/i.test(norm(x));}

function casualCount(c){return Number(c&&c.humanTechCasualTurns||0)||0;}
function setCasualCount(c,n){W.state.patch({humanTechCasualTurns:n,lastRoute:"V022_HUMAN_TECH_CHAT"});}
function resetCasual(){const c=W.state.context();if(c.humanTechCasualTurns)W.state.patch({humanTechCasualTurns:0});}

function humanGreeting(l){return say(l,
  "Hi 😊 Nice to see you. How are you? And whenever you're ready, I can help with anything around Alex Node — websites, IT support, virtual characters, services or prices.",
  "Привет 😊 Рада вас видеть. Как ваши дела? А когда будете готовы, я могу помочь с любыми вопросами об Alex Node — сайты, IT-поддержка, виртуальные персонажи, услуги или цены.",
  "Hei 😊 Mukava nähdä sinua. Mitä kuuluu? Kun olet valmis, voin auttaa Alex Nodeen liittyvissä asioissa — verkkosivut, IT-tuki, virtuaalihahmot, palvelut tai hinnat."
);}
function humanHow(l,turns){
  if(turns>=3)return say(l,
    "I'm doing well 😊 I like chatting with you, but I should probably be useful too. What brought you to Alex Node today — a website, IT help, a virtual character, prices, or something else about our services?",
    "У меня всё хорошо 😊 Мне приятно с вами общаться, но пора быть и полезной. Что привело вас сегодня в Alex Node — сайт, IT-помощь, виртуальный персонаж, цены или другой вопрос о наших услугах?",
    "Minulla menee hyvin 😊 Juttelen mielelläni, mutta haluan myös olla hyödyksi. Mikä toi sinut Alex Nodelle tänään — verkkosivut, IT-apu, virtuaalihahmo, hinnat vai jokin muu palveluihimme liittyvä asia?"
  );
  return say(l,
    "I'm doing well, thanks for asking 😊 How about you? No rush — when you're ready, just tell me what brought you to Alex Node today.",
    "У меня всё хорошо, спасибо, что спросили 😊 А у вас? Не спешите — когда будете готовы, просто расскажите, что привело вас сегодня в Alex Node.",
    "Minulla menee hyvin, kiitos kun kysyit 😊 Entä sinulla? Ei kiirettä — kerro sitten, mikä toi sinut tänään Alex Nodelle."
  );
}
function humanThanks(l){return say(l,
  "You're welcome 😊 If you'd like, we can keep talking or I can help with Alex Node services whenever you're ready.",
  "Пожалуйста 😊 Если хотите, можем ещё немного поговорить, или я помогу с услугами Alex Node, когда будете готовы.",
  "Ole hyvä 😊 Voimme jutella vielä vähän tai voin auttaa Alex Noden palveluissa, kun olet valmis."
);}
function humanReaction(l){return say(l,
  "😊 Glad you like it. What would you like to know or do next?",
  "😊 Рада, что вам нравится. Что хотите узнать или сделать дальше?",
  "😊 Kiva kuulla. Mitä haluaisit tietää tai tehdä seuraavaksi?"
);}
function scopeRedirect(l){return say(l,
  "I can chat a little 😊 but here on Alex Node I'm mainly here to help with Alex Node, websites, IT support, virtual characters, services, products, prices and related business questions. What would you like to know about that?",
  "Немного поболтать со мной можно 😊 но здесь, на Alex Node, я в первую очередь помогаю с Alex Node, сайтами, IT-поддержкой, виртуальными персонажами, услугами, продуктами, ценами и связанными с бизнесом вопросами. Что из этого вас интересует?",
  "Voimme jutella vähän 😊 mutta täällä Alex Nodella autan ensisijaisesti Alex Nodeen, verkkosivuihin, IT-tukeen, virtuaalihahmoihin, palveluihin, tuotteisiin, hintoihin ja niihin liittyviin yrityskysymyksiin. Mistä haluaisit tietää?"
);}
function deferDuringBrief(c,l){const q=pendingQuestion(c,l);return say(l,
  "Let's finish our brief first 😊 Then I can answer your other questions.",
  "Давайте сначала закончим наш бриф 😊 А потом я отвечу на ваши другие вопросы.",
  "Viimeistellään ensin briiffimme 😊 Sen jälkeen vastaan muihin kysymyksiisi."
)+(q?" "+say(l,"Back to the brief:","Вернёмся к брифу:","Palataan briiffiin:")+" "+q:"");}

W.roles.route=function(text){
  const c=W.state.context(),l=lang(text,c),x=norm(text);

  // During an active brief, social chat and unrelated questions are politely postponed.
  if(briefActive(c)){
    const unrelated=social(text)||metaRelevant(text)||obviousOfftopicCommand(text)||(looksQuestion(text)&&!alexNodeRelevant(text));
    if(unrelated){
      const arr=Array.isArray(c.deferredQuestions)?c.deferredQuestions.slice():[];
      const raw=clean(text);if(raw&&!arr.includes(raw))arr.push(raw);
      W.state.patch({deferredQuestions:arr.slice(-5),lastRoute:"V022_BRIEF_FOCUS"});
      return{kind:"answer",role:"secretary",language:l,topic:c.topic,pending:c.pending,pendingAction:c.pendingAction,brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"professional",text:deferDuringBrief(c,l)};
    }
  }

  // Human-Tech small talk is deterministic so it can never accidentally become prices,
  // a project summary, or a forced sales flow.
  if(!briefActive(c)&&social(text)){
    const turns=casualCount(c)+1;setCasualCount(c,turns);
    let out;
    if(greeting(text))out=humanGreeting(l);
    else if(howAreYou(text))out=humanHow(l,turns);
    else if(thanks(text))out=humanThanks(l);
    else out=humanReaction(l);
    return{kind:"answer",role:"guide",language:l,topic:c.topic,pending:c.pending,pendingAction:c.pendingAction,brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"neutral",text:out};
  }

  // ANITA/meta questions are relevant to the Alex Node experience; let the existing
  // dedicated ANITA logic answer them outside an active brief.
  if(!briefActive(c)&&metaRelevant(text)){resetCasual();return oldRoute(text);}

  // Do not allow an unlimited unrelated general-purpose chatbot conversation.
  // Relevant Alex Node / IT / website / business questions continue normally.
  if(!briefActive(c)&&(obviousOfftopicCommand(text)||(looksQuestion(text)&&!alexNodeRelevant(text)&&!metaRelevant(text)))){
    const genericHelp=/^(?:can you help me|could you help me|what can i ask|what can you help with|можешь помочь|чем можешь помочь|voitko auttaa)$/i.test(x);
    if(!genericHelp){
      setCasualCount(c,Math.max(casualCount(c),3));
      return{kind:"answer",role:"guide",language:l,topic:c.topic,pending:c.pending,pendingAction:c.pendingAction,brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"neutral",text:scopeRedirect(l)};
    }
  }

  // A meaningful service/business question resets the casual-chat counter.
  if(alexNodeRelevant(text))resetCasual();
  return oldRoute(text);
};

window.__ANITA_V022__={humanTech:true,briefFocus:true,businessScope:true,casualChatCap:true};
})(window.ANITA50=window.ANITA50||{});
