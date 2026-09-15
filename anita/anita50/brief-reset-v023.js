/* ANITA 0.2.3 — NEW BRIEF ANYTIME + NO-PRESSURE HANDOFF */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||W.__briefReset023)return;
W.__briefReset023=true;

const oldRoute=W.roles.route.bind(W.roles);
const clean=s=>String(s==null?"":s).trim();
const norm=s=>clean(s).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
function lang(text,c){const s=String(text||"");if(/[А-Яа-яЁё]/.test(s))return"ru";if(/[äöåÄÖÅ]/.test(s))return"fi";return(c&&c.language)||"en";}

function newBriefIntent(text){
  const x=norm(text);
  return /^(?:new brief|a new brief|make a new brief|make new brief|lets make a new brief|let's make a new brief|lets make a new one|let's make a new one|make a new one|new one|start over|start again|restart brief|restart the brief|new project|a new project|start a new project|another project|another website|new website project|start a new website project|fresh brief)$/i.test(x)
    || /^(?:новый бриф|сделай новый бриф|давай новый бриф|начать заново|начнем заново|начать новый проект|новый проект|другой проект|другой сайт|новый сайт)$/i.test(x)
    || /^(?:uusi briiffi|tehdään uusi briiffi|aloitetaan alusta|uusi projekti|toinen projekti|uusi verkkosivuprojekti)$/i.test(x);
}
function hasProject(c){const b=(c&&c.websiteBrief)||{};return !!(b.business||b.goal||b.size||(b.requirements&&b.requirements.length));}
function freshBrief(){return{business:null,businessDescription:null,goal:null,size:null,requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[],recommendedPackage:null,recommendedStructure:null,needsAlexReview:false};}
function freshMemory(c){const m=Object.assign({},c&&c.clientMemory||{});m.business=null;m.businessRaw=null;m.businessDescription=null;return m;}
function startFresh(c,l){
  const had=hasProject(c);
  return {
    kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",pendingAction:null,
    brief:freshBrief(),memory:freshMemory(c),pose:"professional",
    text:say(l,
      (had?"Absolutely 😊 You can start a new brief at any time. Nothing from the previous brief was sent automatically, so there is nothing to feel committed to. Let's start fresh — what kind of business is this website for?":"Absolutely 😊 Let's start a fresh website brief. What kind of business is it for?"),
      (had?"Конечно 😊 Вы можете начать новый бриф в любой момент. Предыдущий бриф никуда автоматически не отправлялся, поэтому вы ни к чему не привязаны. Начнём заново — для какого бизнеса нужен этот сайт?":"Конечно 😊 Начнём новый бриф сайта. Для какого бизнеса он нужен?"),
      (had?"Totta kai 😊 Voit aloittaa uuden briiffin milloin tahansa. Edellistä briiffiä ei lähetetty automaattisesti minnekään, joten et ole sitoutunut siihen. Aloitetaan puhtaalta pöydältä — millaiselle yritykselle sivusto tulee?":"Totta kai 😊 Aloitetaan uusi verkkosivubriiffi. Millaiselle yritykselle sivusto tulee?")
    )
  };
}
function softenHandoffText(text,l){
  let t=String(text||"");
  if(l==="ru"){
    t=t.replace(/Я могу подготовить короткий бриф для Алекса\. Подготовить\?/g,"Я могу подготовить короткий бриф, чтобы вы сначала сами его посмотрели 😊 Ничего автоматически не отправляется. Подготовить?");
    t=t.replace(/Основной бриф готов для просмотра Алексом\./g,"Основной бриф готов. Ничего автоматически не отправлено — вы можете изменить его, начать новый бриф или позже передать его Алексу.");
  }else if(l==="fi"){
    t=t.replace(/I can prepare a short project summary for Alex now\. Would you like me to do that\?/g,"I can prepare a short project summary for you to review first 😊 Nothing is sent automatically. Would you like me to prepare it?");
    t=t.replace(/The main brief is ready for Alex to review\./g,"The main brief is ready. Nothing has been sent automatically — you can change it, start a new brief, or pass it to Alex later.");
  }else{
    t=t.replace(/I can prepare a short project summary for Alex now\. Would you like me to do that\?/g,"I can prepare a short project summary for you to review first 😊 Nothing is sent automatically. Would you like me to prepare it?");
    t=t.replace(/The main brief is ready for Alex to review\./g,"The main brief is ready. Nothing has been sent automatically — you can change it, start a new brief, or pass it to Alex later.");
  }
  return t;
}

W.roles.route=function(text){
  const c=W.state.context(),l=lang(text,c);

  // This escape hatch has priority over every pending question or finished brief.
  if(newBriefIntent(text)){
    const r=startFresh(c,l);
    W.state.patch({
      role:"secretary",topic:"website_consultation",pending:"business",pendingAction:null,
      websiteBrief:r.brief,clientMemory:r.memory,deferredQuestions:[],humanTechCasualTurns:0,lastRoute:"V023_NEW_BRIEF_ANYTIME"
    });
    return r;
  }

  const r=oldRoute(text);
  if(r&&r.kind==="answer"&&r.text){
    r.text=softenHandoffText(r.text,r.language||l);
  }
  return r;
};

window.__ANITA_V023__={newBriefAnytime:true,noAutomaticSendLanguage:true};
})(window.ANITA50=window.ANITA50||{});
