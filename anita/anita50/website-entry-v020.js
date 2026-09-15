/* ANITA 0.2.0 — memory-aware website topic entry */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||W.__websiteEntry020)return;
W.__websiteEntry020=true;

const original=W.roles.route.bind(W.roles);
const norm=s=>String(s||"").trim().toLowerCase().replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
function lang(text,c){const s=String(text||"");if(/[А-Яа-яЁё]/.test(s))return"ru";if(/[äöåÄÖÅ]/.test(s))return"fi";return(c&&c.language)||"en";}
function isBroadWebsite(x){return /^(?:website|web site|site|webpage|web page|сайт|вебсайт|verkkosivu|verkkosivut|kotisivu|kotisivut)$/.test(x);}
function isContinue(x){return /^(?:continue|continue it|continue that|continue old|old one|same one|same project|that project|my project|previous project|yes continue|продолжить|продолжай|старый|тот же|тот проект|мой проект|jatka|jatketaan|sama|sama projekti|vanha projekti)$/.test(x);}
function isNew(x){return /^(?:new|new one|new website|new site|start new|start a new one|another website|another site|different website|новый|новый сайт|другой сайт|начать новый|uusi|uusi sivusto|uusi verkkosivu|toinen sivusto)$/.test(x);}
function freshBrief(){return{business:null,goal:null,size:null,requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[],recommendedPackage:null,recommendedStructure:null,needsAlexReview:false};}
function hasProject(c){const b=(c&&c.websiteBrief)||{};return !!(b.business||b.goal||b.size||(b.requirements&&b.requirements.length));}
function projectLabel(c,l){const b=(c&&c.websiteBrief)||{},m=(c&&c.clientMemory)||{},business=b.business||m.business;return business?business:(l==="ru"?"предыдущий проект":l==="fi"?"aiempi projekti":"previous project");}
function nextPending(c){const b=(c&&c.websiteBrief)||{};if(!b.business)return"business";if(!b.goal)return"goal";if(!b.size)return"size";return null;}
function resumeText(c,l){const p=nextPending(c),b=c.websiteBrief||{};if(p==="business")return say(l,"Sure 😊 Let's continue. What kind of business is the website for?","Конечно 😊 Продолжим. Для какого бизнеса нужен сайт?","Totta kai 😊 Jatketaan. Millaiselle yritykselle sivusto tulee?");if(p==="goal")return say(l,"Sure 😊 Let's continue your "+projectLabel(c,l)+" website. What should visitors mainly be able to do there?","Конечно 😊 Продолжим проект сайта для "+projectLabel(c,l)+". Что посетители должны в первую очередь уметь делать на сайте?","Totta kai 😊 Jatketaan projektia. Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?");if(p==="size")return say(l,"Sure 😊 Let's continue your "+projectLabel(c,l)+" website. Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?","Конечно 😊 Продолжим проект сайта для "+projectLabel(c,l)+". Какой объём нужен: одна страница, несколько страниц или большой многостраничный сайт?","Totta kai 😊 Jatketaan projektia. Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama sivu vai suurempi monisivuinen sivusto?");return say(l,"Sure 😊 I remember the "+projectLabel(c,l)+" website project. Would you like to change something, add another requirement, or prepare the brief for Alex?","Конечно 😊 Я помню проект сайта для "+projectLabel(c,l)+". Хотите что-то изменить, добавить новое требование или подготовить бриф для Алекса?","Totta kai 😊 Muistan projektin. Haluatko muuttaa jotain, lisätä uuden vaatimuksen vai valmistella briiffin Alexille?");}

W.roles.route=function(text){
  const c=W.state.context(),x=norm(text),l=lang(text,c);

  if(c.pendingAction==="choose_website_context"){
    if(isContinue(x)){
      const p=nextPending(c);
      return{kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:p,pendingAction:null,brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"professional",text:resumeText(c,l)};
    }
    if(isNew(x)){
      const mem=Object.assign({},c.clientMemory||{}, {business:null,businessRaw:null});
      return{kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",pendingAction:null,brief:freshBrief(),memory:mem,pose:"professional",text:say(l,"Of course 😊 Let's start a new website project. What kind of business is it for?","Конечно 😊 Начнём новый проект сайта. Для какого бизнеса он нужен?","Totta kai 😊 Aloitetaan uusi verkkosivuprojekti. Millaiselle yritykselle se tulee?")};
    }
    return{kind:"answer",role:"secretary",language:l,topic:c.topic,pending:c.pending,pendingAction:"choose_website_context",brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"professional",text:say(l,"Do you mean continue the website project I remember, or start a new website project? 😊","Вы хотите продолжить проект сайта, который я помню, или начать новый проект? 😊","Haluatko jatkaa muistamaani verkkosivuprojektia vai aloittaa uuden? 😊")};
  }

  if(isBroadWebsite(x)){
    const active=c.topic==="website_consultation"&&(c.pending==="business"||c.pending==="goal"||c.pending==="size"||String(c.pendingAction||"").startsWith("confirm_need:"));
    if(active)return original(text);

    if(hasProject(c)){
      return{kind:"answer",role:"secretary",language:l,topic:c.topic,pending:c.pending,pendingAction:"choose_website_context",brief:c.websiteBrief||{},memory:c.clientMemory||{},pose:"professional",text:say(l,"Sure 😊 I remember your "+projectLabel(c,l)+" website project. Would you like to continue that project, or start a new website project?","Конечно 😊 Я помню ваш проект сайта для "+projectLabel(c,l)+". Хотите продолжить его или начать новый проект сайта?","Totta kai 😊 Muistan aiemman verkkosivuprojektisi. Haluatko jatkaa sitä vai aloittaa uuden projektin?")};
    }

    return{kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",pendingAction:null,brief:freshBrief(),memory:c.clientMemory||{},pose:"professional",text:say(l,"Of course 😊 We can talk about a website. What kind of business is the website for?","Конечно 😊 Можем обсудить сайт. Для какого бизнеса нужен сайт?","Totta kai 😊 Voimme puhua verkkosivusta. Millaiselle yritykselle sivusto tulee?")};
  }

  return original(text);
};
})(window.ANITA50=window.ANITA50||{});
