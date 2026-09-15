/* ANITA 0.3.0 — SINGLE CENTRAL ROUTER
 * Classifies every visitor message before any role/brief code can consume it.
 * The router never writes project memory.
 */
(function(W){
"use strict";
if(!W||!W.state||W.router030)return;

const clean=s=>String(s==null?"":s).trim();
const norm=s=>clean(s).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const lang=(text,c)=>/[А-Яа-яЁё]/.test(String(text||""))?"ru":/[äöåÄÖÅ]/.test(String(text||""))?"fi":((c&&c.language)||"en");

function greeting(x){return /^(?:hi|hello|hey|hiya|good morning|good afternoon|good evening|привет|здравствуй|здравствуйте|доброе утро|добрый день|добрый вечер|hei|moi|moikka|huomenta)$/.test(norm(x));}
function smalltalk(x){return /^(?:how are you|how're you|how are u|hows it going|how's it going|how is it going|how are things|how's everything|hows everything|how is everything|how have you been|you good|are you good|you okay|are you okay|what's up|whats up|как дела|как ты|как поживаешь|как жизнь|mitä kuuluu|kuinka voit|miten menee|kaikki hyvin)$/.test(norm(x));}
function reaction(x){return /^(?:thanks|thank you|thx|cool|nice|great|awesome|good|perfect|excellent|wow|lol|haha|hahaha|спасибо|круто|здорово|отлично|супер|вау|хаха|kiitos|hyvä|hienoa|mahtavaa|siisti)$/.test(norm(x));}
function meta(x){const s=norm(x);return /\b(?:are you ai|are you an ai|your ai status|ai status|what model are you|which model are you|what ai are you|who are you|who created you|who made you|are you real|are you human|what can you do|how do you work|your brain)\b/i.test(s)||/(?:ты.*ии|статус.*ии|какая.*модель|кто ты|кто тебя (?:создал|сделал)|ты настоящ|ты человек|что ты умеешь|как ты работаешь)/i.test(s)||/(?:oletko.*tekoäly|mikä.*malli|kuka.*loi sinut|oletko.*ihminen|mitä osaat|miten toimit)/i.test(s);}
function question(x){const s=norm(x);return /[?？]/.test(String(x||""))||/^(?:what|what's|whats|why|how|who|when|where|which|can|could|would|should|do|does|did|are|is|will|have|has|tell me|explain)\b/i.test(s)||/^(?:что|почему|зачем|как|кто|когда|где|какой|какая|можешь|можно|расскажи|объясни)\b/i.test(s)||/^(?:mitä|miksi|miten|kuka|milloin|missä|mikä|voitko|voiko|oletko|onko|kerro|selitä)\b/i.test(s);}
function broadWebsite(x){return /^(?:website|web site|site|webpage|web page|сайт|вебсайт|verkkosivu|verkkosivut|kotisivu|kotisivut)$/.test(norm(x));}
function newBrief(x){const s=norm(x);return /\b(?:new|another|fresh|different|one more)\s+(?:website\s+)?(?:brief|project)\b/i.test(s)||/\b(?:start|make|do|create|restart)\b.{0,25}\b(?:new|another|fresh)\b.{0,20}\b(?:brief|project|website|site)\b/i.test(s)||/^(?:start over|start again|restart|new one|another one|fresh start)$/i.test(s)||/(?:новый|другой|ещ[её] один).{0,20}(?:бриф|проект|сайт)|начать заново|заново/i.test(s)||/(?:uusi|toinen).{0,20}(?:briiffi|projekti|verkkosivu)|aloitetaan alusta/i.test(s);}
function continueBrief(x){return /^(?:continue|continue it|continue that|continue project|continue brief|same one|same project|old one|previous one|продолжить|продолжай|тот же|старый|старый проект|jatka|jatketaan|sama projekti)$/i.test(norm(x))||/\b(?:continue|resume)\b.{0,20}\b(?:website|project|brief)\b/i.test(norm(x));}
function chooseNew(x){return /^(?:new|new one|new website|new project|another|another one|start new|start over|новый|другой|начать новый|uusi|toinen)$/i.test(norm(x));}
function yes(x){return /^(?:yes|yeah|yep|yes please|sure|okay|ok|good idea|that would help|that would be useful|i want that|let'?s do that|да|ага|да пожалуйста|хорошо|это полезно|да хочу|давайте|kyllä|joo|sopii)$/i.test(norm(x));}
function no(x){return /^(?:no|nope|not really|not needed|i don'?t need that|do not need that|not necessary|нет|не надо|не нужно|не хочу|ei|ei tarvitse)$/i.test(norm(x));}
function sizeAnswer(x){const s=norm(x);return /\b(?:one|single|1)\s*(?:landing\s*)?page\b|\b(?:landing page|one-page|single-page)\b|\b(?:few|several|couple|2|3|4|5)\s+(?:separate\s+)?pages?\b|\b(?:larger?|big|multi-page|multipage)\s*(?:website|site)?\b/i.test(s)||/(?:одна|1)\s+страниц|лендинг|несколько\s+страниц|многостранич/i.test(s)||/(?:yksi sivu|muutama sivu|monisivuinen)/i.test(s);}
function goalAnswer(x){const s=norm(x);if(question(x)&&!/\b(?:i|we)\s+(?:want|need|would like|require)\b/i.test(s))return false;return /\b(?:i|we)\s+(?:want|need|would like|require)\b/i.test(s)||/\b(?:customers?|clients?|visitors?|people)\s+(?:should|must|need to|can|could|be able to)\b/i.test(s)||/^(?:book|booking|contact|call|message|see|view|show|buy|purchase|order|request|get|find|read|learn|check|browse|pay|register|services?|prices?|pricing|appointments?|information|info|products?|shop|gallery|portfolio|map|quote)\b/i.test(s)||/(?:я|мы)\s+(?:хочу|хотим|нужно|нужен|нужна|нужны)|(?:клиент|посетител).{0,35}(?:долж|мог)/i.test(s)||/(?:haluan|haluamme|tarvitsen|tarvitsemme)|(?:asiakka|kävij).{0,35}(?:pitää|voivat|pystyvät)/i.test(s);}
function behaviour(x){const s=norm(x);return /\b(?:customers?|clients?|people|visitors?|they)\b.{0,80}\b(?:call|phone|message|text|email|ask|come|visit|contact|book|order)\b/i.test(s)||/(?:клиент|покупател|люди|посетител).{0,80}(?:звон|пиш|спраш|приход|заказ|запис)/i.test(s)||/(?:asiakka|ihmis).{0,80}(?:soitta|viesti|kysy|tule|varaa|tilaa)/i.test(s);}
function alexNodeRelevant(x){const s=norm(x);return /\b(?:alex node|alexnode|website|web site|webpage|landing page|tilda|wix|wordpress|html|css|domain|hosting|ssl|seo|design|graphic design|logo|flyer|poster|banner|business card|it support|computer|pc|laptop|windows|wifi|router|printer|scanner|monitor|projector|email|outlook|backup|antivirus|driver|usb|bluetooth|virtual character|character|anita|assistant|ai assistant|service|services|package|packages|price|prices|pricing|contact|order|project|brief|business|customer|client|booking|calendar|integration|automation|online store|shop|ecommerce|product|products|support)\b/i.test(s)||/(?:алекс нод|сайт|лендинг|тильд|вордпресс|домен|хостинг|дизайн|логотип|it.?поддерж|компьютер|ноутбук|windows|анита|виртуальн.*персонаж|ассистент|услуг|пакет|цен|заказ|проект|бизнес|клиент|брон|календар|интеграц|магазин|товар)/i.test(s)||/(?:verkkosiv|kotisiv|tilda|wordpress|domain|hosting|suunnittelu|logo|it.?tuki|tietokone|windows|anita|virtuaali.*hahmo|palvelu|paketti|hinta|projekti|yritys|asiakas|varaus|kalenteri|verkkokauppa|tuote)/i.test(s);}
function prepareBrief(x){return /\b(?:prepare|make|create|show|give me)\b.{0,25}\b(?:summary|brief)\b/i.test(norm(x))||/(?:подготов|покаж|сдел).*бриф/i.test(norm(x));}
function briefActive(c){return !!(c&&c.topic==="website_consultation"&&(c.pending||String(c.pendingAction||"").startsWith("confirm_need:")));}

W.router030={
  norm,lang,greeting,smalltalk,reaction,meta,question,broadWebsite,newBrief,continueBrief,yes,no,sizeAnswer,goalAnswer,behaviour,alexNodeRelevant,briefActive,
  classify(text){
    const c=W.state.context(),l=lang(text,c),pa=String(c.pendingAction||"");
    if(newBrief(text))return{intent:"new_brief",language:l};
    if(pa==="choose_website_context"){
      if(continueBrief(text))return{intent:"continue_brief",language:l};
      if(chooseNew(text))return{intent:"new_brief",language:l};
      return{intent:"choose_website_context_unclear",language:l};
    }
    if(greeting(text))return{intent:"greeting",language:l};
    if(smalltalk(text)||reaction(text))return{intent:"social",language:l};
    if(meta(text))return{intent:"meta",language:l};
    if(broadWebsite(text))return{intent:"website_entry",language:l};
    if(prepareBrief(text))return{intent:"prepare_brief",language:l};
    if(continueBrief(text))return{intent:"continue_brief",language:l};

    if(briefActive(c)){
      if(pa.startsWith("confirm_need:")){
        if(yes(text)||no(text))return{intent:"brief_answer",language:l};
        if(alexNodeRelevant(text))return{intent:"side_question",language:l};
        return{intent:question(text)?"side_question":"unclear_during_brief",language:l};
      }
      if(c.pending==="size"){
        if(sizeAnswer(text))return{intent:"brief_answer",language:l};
        if(alexNodeRelevant(text))return{intent:"side_question",language:l};
        return{intent:question(text)?"side_question":"unclear_during_brief",language:l};
      }
      if(c.pending==="goal"){
        if(goalAnswer(text)||behaviour(text))return{intent:"brief_answer",language:l};
        if(alexNodeRelevant(text))return{intent:"side_question",language:l};
        return{intent:question(text)?"side_question":"unclear_during_brief",language:l};
      }
      if(c.pending==="business"){
        if(alexNodeRelevant(text)&&question(text))return{intent:"side_question",language:l};
        if(question(text))return{intent:"side_question",language:l};
        return{intent:clean(text).length<=120?"brief_answer":"unclear_during_brief",language:l};
      }
    }

    if(alexNodeRelevant(text))return{intent:"project_question",language:l};
    if(question(text))return{intent:"offtopic_question",language:l};
    return{intent:"conversation_unknown",language:l};
  }
};
})(window.ANITA50=window.ANITA50||{});