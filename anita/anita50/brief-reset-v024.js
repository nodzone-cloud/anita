/* ANITA 0.2.4 — ROBUST NEW-BRIEF ESCAPE HATCH */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||W.__briefReset024)return;
W.__briefReset024=true;

const oldRoute=W.roles.route.bind(W.roles);
const clean=s=>String(s==null?"":s).trim();
const norm=s=>clean(s).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
function lang(text,c){const s=String(text||"");if(/[А-Яа-яЁё]/.test(s))return"ru";if(/[äöåÄÖÅ]/.test(s))return"fi";return(c&&c.language)||"en";}

function newBriefIntent(text){
  const x=norm(text);

  // Direct short forms.
  if(/^(?:new brief|a new brief|another brief|one more brief|fresh brief|different brief|new one|another one|start over|start again|restart|restart brief|restart the brief|from scratch|new project|a new project|another project|different project|another website|different website|new website project|another website project|fresh website project)$/i.test(x))return true;

  // Natural English requests such as "let's make another brief", "can we do a new brief?"
  if(/\b(?:make|create|start|do|begin|open|prepare|want|need|let'?s|can we|could we|i want|i need)\b.{0,35}\b(?:new|another|fresh|different|one more)\b.{0,20}\b(?:brief|website brief|project|website project)\b/i.test(x))return true;
  if(/\b(?:new|another|fresh|different|one more)\b.{0,20}\bbrief\b/i.test(x))return true;

  // Russian.
  if(/^(?:новый бриф|другой бриф|ещё один бриф|еще один бриф|новый проект|другой проект|другой сайт|новый сайт|начать заново|начнем заново|начнём заново|с нуля)$/i.test(x))return true;
  if(/(?:сделай|сделаем|давай|хочу|начать|создать).{0,30}(?:новый|другой|ещё один|еще один).{0,20}(?:бриф|проект)/i.test(x))return true;

  // Finnish.
  if(/^(?:uusi briiffi|toinen briiffi|uusi projekti|toinen projekti|uusi verkkosivuprojekti|toinen verkkosivuprojekti|aloitetaan alusta|alusta asti)$/i.test(x))return true;
  if(/(?:tehdään|aloitetaan|haluan|luodaan).{0,30}(?:uusi|toinen).{0,20}(?:briiffi|projekti)/i.test(x))return true;

  return false;
}

function freshBrief(){return{business:null,businessDescription:null,goal:null,size:null,requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[],recommendedPackage:null,recommendedStructure:null,needsAlexReview:false};}
function freshMemory(c){const m=Object.assign({},c&&c.clientMemory||{});m.business=null;m.businessRaw=null;m.businessDescription=null;return m;}

function startFresh(c,l){
  const brief=freshBrief(),memory=freshMemory(c);
  return{
    kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",pendingAction:null,
    brief,memory,pose:"professional",
    text:say(l,
      "Of course 😊 We can start a new brief anytime. Nothing is sent automatically. What kind of business is the new website for?",
      "Конечно 😊 Новый бриф можно начать в любой момент. Ничего автоматически не отправляется. Для какого бизнеса нужен новый сайт?",
      "Totta kai 😊 Uuden briiffin voi aloittaa milloin tahansa. Mitään ei lähetetä automaattisesti. Millaiselle yritykselle uusi sivusto tulee?"
    )
  };
}

W.roles.route=function(text){
  const c=W.state.context(),l=lang(text,c);

  // Highest-priority escape hatch: works before, during, or after a brief.
  // This prevents phrases like "another brief" from ever being stored as a business/goal/size answer.
  if(newBriefIntent(text)){
    const r=startFresh(c,l);
    W.state.patch({
      role:"secretary",topic:"website_consultation",pending:"business",pendingAction:null,
      websiteBrief:r.brief,clientMemory:r.memory,deferredQuestions:[],humanTechCasualTurns:0,lastRoute:"V024_NEW_BRIEF_ESCAPE"
    });
    return r;
  }

  return oldRoute(text);
};

window.__ANITA_V024__={robustNewBriefEscape:true};
})(window.ANITA50=window.ANITA50||{});
