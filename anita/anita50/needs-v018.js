/* ANITA 0.1.8 — confirmation layer for inferred client needs */
(function(W){
"use strict";
if(!W||!W.roles||!W.state||!W.semanticAdapter)return;

const original=W.roles.route.bind(W.roles);
const uniq=a=>[...new Set((a||[]).map(v=>String(v||"").trim().toLowerCase()).filter(Boolean))];
const say=(l,en,ru,fi)=>l==="ru"?(ru||en):l==="fi"?(fi||en):en;
const yes=x=>/^(?:yes|yeah|yep|yes please|sure|okay|ok|good idea|that would help|that would be useful|i want that|let'?s do that|да|ага|да пожалуйста|хорошо|это полезно|да хочу|давайте|kyllä|joo|sopii)$/i.test(x);
const no=x=>/^(?:no|nope|not really|not needed|i don'?t need that|do not need that|not necessary|нет|не надо|не нужно|не хочу|ei|ei tarvitse)$/i.test(x);

function language(text,c){
  const s=String(text||"");
  if(/[А-Яа-яЁё]/.test(s))return "ru";
  if(/[äöåÄÖÅ]/.test(s))return "fi";
  return (c&&c.language)||"en";
}
function nextStepText(l,b){
  if(!b.goal)return say(l,
    "Thanks — I won't treat that as a confirmed requirement. What should visitors mainly be able to do on the website?",
    "Спасибо — я не буду считать это подтверждённым требованием. Что посетители должны в первую очередь уметь делать на сайте?",
    "Kiitos — en merkitse sitä vahvistetuksi vaatimukseksi. Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?");
  return say(l,
    "Got it 😊 Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?",
    "Поняла 😊 Примерно какой объём нужен: одна страница, несколько отдельных страниц или большой многостраничный сайт?",
    "Selvä 😊 Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?");
}

W.roles.route=function(text){
  const c=W.state.context();
  const pa=String(c.pendingAction||"");
  if(!pa.startsWith("confirm_need:"))return original(text);

  const key=pa.slice("confirm_need:".length).trim().toLowerCase();
  const x=String(text||"").trim().toLowerCase().replace(/[.!?,;:]+$/,"").trim();
  const l=language(text,c);

  if(!yes(x)&&!no(x)){
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:c.pending||null,pendingAction:pa,brief:c.websiteBrief||{},memory:c.clientMemory||{},
      pose:"professional",
      text:say(l,
        "Just to keep your brief accurate, please answer yes or no 😊 "+W.semanticAdapter.questionForNeed(key,l,c.websiteBrief||{}),
        "Чтобы бриф был точным, ответьте, пожалуйста, да или нет 😊 "+W.semanticAdapter.questionForNeed(key,l,c.websiteBrief||{}),
        "Jotta briiffi pysyy tarkkana, vastaa kyllä tai ei 😊 "+W.semanticAdapter.questionForNeed(key,l,c.websiteBrief||{}))
    };
  }

  const b=Object.assign({
    requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[]
  },c.websiteBrief||{});
  b.requirements=uniq(b.requirements);
  b.inferredSuggestions=uniq(b.inferredSuggestions);
  b.rejectedSuggestions=uniq(b.rejectedSuggestions);

  const accepted=yes(x);
  if(accepted){
    b.requirements=uniq([...b.requirements,...W.semanticAdapter.requirementsFromNeed(key)]);
    b.rejectedSuggestions=b.rejectedSuggestions.filter(v=>v!==key);
    if(!b.goal){
      const g=W.semanticAdapter.goalFromNeed(key);
      if(g)b.goal=g;
    }
  }else{
    b.rejectedSuggestions=uniq([...b.rejectedSuggestions,key]);
  }

  b.inferredSuggestions=b.inferredSuggestions.filter(v=>v!==key);
  if(accepted&&key==="availability calendar"){
    // The combined question already included booking.
    b.inferredSuggestions=b.inferredSuggestions.filter(v=>v!=="booking");
  }

  const candidate=W.semanticAdapter.nextCandidate(b);
  if(candidate){
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:b.goal?(!b.size?"size":c.pending):"goal",
      pendingAction:"confirm_need:"+candidate,brief:b,memory:c.clientMemory||{},pose:"professional",
      text:(accepted?say(l,
        "Yes — I'll add that as a confirmed requirement 😊 ",
        "Да — я добавлю это как подтверждённое требование 😊 ",
        "Kyllä — lisään sen vahvistetuksi vaatimukseksi 😊 "):say(l,
        "Understood — I won't add that as a requirement 😊 ",
        "Поняла — я не буду добавлять это в требования 😊 ",
        "Selvä — en lisää sitä vaatimukseksi 😊 "))+W.semanticAdapter.questionForNeed(candidate,l,b)
    };
  }

  if(!b.goal){
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:"goal",pendingAction:null,brief:b,memory:c.clientMemory||{},pose:"professional",
      text:accepted?say(l,
        "Great — I've added that as a confirmed requirement 😊 What else should visitors mainly be able to do on the website?",
        "Отлично — я добавила это как подтверждённое требование 😊 Что ещё посетители должны в первую очередь уметь делать на сайте?",
        "Hyvä — lisäsin sen vahvistetuksi vaatimukseksi 😊 Mitä muuta kävijöiden pitäisi pystyä tekemään sivustolla?")
        :nextStepText(l,b)
    };
  }

  if(!b.size){
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:"size",pendingAction:null,brief:b,memory:c.clientMemory||{},pose:"professional",
      text:(accepted?say(l,
        "Great — I've added that as a confirmed requirement 😊 ",
        "Отлично — я добавила это как подтверждённое требование 😊 ",
        "Hyvä — lisäsin sen vahvistetuksi vaatimukseksi 😊 "):say(l,
        "Understood — I won't add that as a requirement 😊 ",
        "Поняла — я не буду добавлять это в требования 😊 ",
        "Selvä — en lisää sitä vaatimukseksi 😊 "))+nextStepText(l,b)
    };
  }

  return {
    kind:"answer",role:"secretary",language:l,topic:"website_consultation",
    pending:null,pendingAction:null,brief:b,memory:c.clientMemory||{},pose:"professional",
    text:accepted?say(l,
      "Great — I've added that to the confirmed requirements 😊 We can continue from the updated brief.",
      "Отлично — я добавила это в подтверждённые требования 😊 Можем продолжить с обновлённым брифом.",
      "Hyvä — lisäsin sen vahvistettuihin vaatimuksiin 😊 Voimme jatkaa päivitetystä briiffistä.")
      :say(l,
      "Understood — I won't include that as a requirement 😊 We can continue with the rest of the project.",
      "Поняла — я не буду включать это в требования 😊 Можем продолжить с остальной частью проекта.",
      "Selvä — en sisällytä sitä vaatimuksiin 😊 Voimme jatkaa muun projektin kanssa.")
  };
};
})(window.ANITA50=window.ANITA50||{});