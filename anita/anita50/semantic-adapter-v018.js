/* ANITA 0.1.8 — semantic adapter: confirm inferred needs before storing them as requirements */
(function(W){
"use strict";
if(!W||!W.roles||!W.state)return;

function clean(v){return v==null?null:String(v).trim()||null;}
function uniq(a){return [...new Set((a||[]).map(v=>String(v||"").trim().toLowerCase()).filter(Boolean))];}
function langOf(c){return (c&&c.language)||"en";}
function say(l,en,ru,fi){
  if(l==="ru")return ru||en;
  if(l==="fi")return fi||en;
  return en;
}
function normalizeNeed(v){
  v=String(v||"").trim().toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ");
  const a={
    "online booking":"booking","appointments":"booking","appointment booking":"booking",
    "calendar":"availability calendar","available times":"availability calendar","availability":"availability calendar",
    "choose location":"service location","location choice":"service location",
    "prices":"price list","pricing":"price list","service list":"services",
    "business info":"information","company information":"information",
    "online shop":"product sales","ecommerce":"product sales","shop":"product sales",
    "quick contact":"fast contact","contact button":"fast contact",
    "quote":"quote request","estimate":"quote request","request quote":"quote request",
    "google maps":"map","location map":"map"
  };
  return a[v]||v;
}
function uniqNeeds(a){return uniq(a).map(normalizeNeed);}
function merge(a,b){return uniqNeeds([...(a||[]),...(b||[])]);}

const PRIORITY=[
  "availability calendar","booking","service location","price list","services",
  "information","quote request","product sales","fast contact","contact","map",
  "gallery","portfolio","video"
];

function nextCandidate(b){
  const req=new Set(uniqNeeds(b.requirements||[]));
  const rej=new Set(uniqNeeds(b.rejectedSuggestions||[]));
  const inf=new Set(uniqNeeds(b.inferredSuggestions||[]));
  for(const k of PRIORITY)if(inf.has(k)&&!req.has(k)&&!rej.has(k))return k;
  for(const k of inf)if(!req.has(k)&&!rej.has(k))return k;
  return null;
}

function questionForNeed(k,l,b){
  const map={
    "availability calendar":[
      "You mentioned that customers may need to know when you're free. Would you like them to see available times and book a suitable time directly on the website?",
      "Вы упомянули, что клиентам важно понимать, когда вы свободны. Хотите, чтобы они видели доступное время и могли сразу выбрать и забронировать подходящее время на сайте?",
      "Mainitsit, että asiakkaiden voi olla tärkeää nähdä milloin olet vapaa. Haluatko, että he näkevät vapaat ajat ja voivat varata sopivan ajan suoraan sivustolla?"
    ],
    "booking":[
      "It sounds like arranging a time is part of the customer journey. Would you like customers to be able to book a service time directly on the website?",
      "Похоже, согласование времени — часть пути клиента. Хотите, чтобы клиенты могли записываться на услугу прямо на сайте?",
      "Ajan sopiminen näyttää olevan osa asiakaspolkua. Haluatko, että asiakkaat voivat varata palveluajan suoraan sivustolla?"
    ],
    "service location":[
      "It sounds like customers also need to know where the service will happen. Would you like them to choose the service location on the website?",
      "Похоже, клиентам также важно понимать, где будет оказана услуга. Хотите, чтобы место услуги можно было выбрать на сайте?",
      "Vaikuttaa siltä, että asiakkaiden pitää myös tietää palvelupaikka. Haluatko, että he voivat valita palvelupaikan sivustolla?"
    ],
    "price list":[
      "You mentioned customers asking about prices. Would you like the website to show a clear price list?",
      "Вы упомянули, что клиенты спрашивают цены. Хотите разместить на сайте понятный прайс-лист?",
      "Mainitsit asiakkaiden kysyvän hintoja. Haluatko sivustolle selkeän hinnaston?"
    ],
    "services":[
      "Customers seem to ask what you offer. Would you like a clear Services section showing what you do?",
      "Похоже, клиенты спрашивают, какие услуги вы предлагаете. Хотите отдельный понятный раздел «Услуги»?",
      "Asiakkaat näyttävät kysyvän mitä tarjoat. Haluatko selkeän Palvelut-osion?"
    ],
    "information":[
      "Some customers seem to ask for basic business information. Would you like that information to be easy to find on the website?",
      "Похоже, клиенты спрашивают базовую информацию о бизнесе. Хотите сделать её легко доступной на сайте?",
      "Osa asiakkaista näyttää kysyvän perustietoja yrityksestä. Haluatko, että ne löytyvät helposti sivustolta?"
    ],
    "quote request":[
      "Customers seem to ask for estimates. Would you like a quote-request form on the website?",
      "Похоже, клиенты запрашивают расчёт стоимости. Хотите форму запроса расчёта на сайте?",
      "Asiakkaat näyttävät pyytävän hinta-arvioita. Haluatko sivustolle tarjouspyyntölomakkeen?"
    ],
    "product sales":[
      "It sounds like some product orders may currently happen manually. Would you like customers to be able to buy products directly on the website?",
      "Похоже, часть заказов товаров сейчас оформляется вручную. Хотите, чтобы клиенты могли покупать товары прямо на сайте?",
      "Vaikuttaa siltä, että osa tuotetilauksista hoidetaan käsin. Haluatko, että asiakkaat voivat ostaa tuotteita suoraan sivustolta?"
    ],
    "fast contact":[
      "Customers contact you frequently. Would you like the website to make contacting you especially quick, for example with a prominent contact button?",
      "Клиенты часто связываются с вами напрямую. Хотите сделать связь особенно быстрой, например заметной кнопкой контакта?",
      "Asiakkaat ottavat sinuun usein yhteyttä. Haluatko tehdä yhteydenotosta erityisen nopeaa esimerkiksi näkyvällä yhteyspainikkeella?"
    ],
    "contact":[
      "Would you like visitors to have a contact form on the website?",
      "Хотите добавить на сайт форму связи?",
      "Haluatko sivustolle yhteydenottolomakkeen?"
    ],
    "map":[
      "Would a map or clear location section be useful for your customers?",
      "Была бы полезна клиентам карта или понятный раздел с местоположением?",
      "Olisiko kartta tai selkeä sijaintiosio hyödyllinen asiakkaillesi?"
    ]
  };
  const q=map[k]||[
    "I noticed a possible need for "+k+". Would you like me to include that as a website requirement?",
    "Я заметила возможную потребность: "+k+". Добавить это как требование к сайту?",
    "Huomasin mahdollisen tarpeen: "+k+". Lisätäänkö se sivuston vaatimukseksi?"
  ];
  return l==="ru"?q[1]:l==="fi"?q[2]:q[0];
}

function goalFromNeed(k){
  const m={
    "availability calendar":"customers can see available times and book a suitable time",
    "booking":"customers can book a service time online",
    "service location":"customers can choose the service location",
    "price list":"customers can see prices clearly",
    "services":"customers can understand which services are offered",
    "information":"customers can quickly find the main business information",
    "quote request":"customers can request a quote online",
    "product sales":"customers can buy products online",
    "fast contact":"customers can contact the business quickly",
    "contact":"customers can contact the business",
    "map":"customers can easily find the business location"
  };
  return m[k]||null;
}
function requirementsFromNeed(k){
  if(k==="availability calendar")return ["availability calendar","booking"];
  return [k];
}

W.semanticAdapter={
  buildHandoff:function(o,text){
    if(!o)return null;
    const intent=String(o.intent||"other");
    if(!["website_request","website_goal","website_requirements","website_size","price_question","website_order_process"].includes(intent))return null;
    return {
      intent,
      business:clean(o.business),
      goal:clean(o.goal),
      requirements:uniqNeeds(o.confirmed_requirements||o.requirements),
      inferredSuggestions:uniqNeeds(o.inferred_suggestions),
      customerSignals:uniq(o.customer_signals),
      size:clean(o.size),
      originalText:String(text||""),
      confidence:Number(o.confidence||0)
    };
  },

  nextCandidate,
  questionForNeed,
  goalFromNeed,
  requirementsFromNeed,

  controlledClarification:function(text){
    const c=W.state.context(),l=langOf(c);
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:c.pending||null,brief:c.websiteBrief||{},memory:c.clientMemory||{},
      pose:"professional",
      text:say(l,
        "I think you're talking about a website or digital need for your business 😊 Is that right?",
        "Похоже, речь идёт о сайте или цифровой потребности вашего бизнеса 😊 Я правильно поняла?",
        "Ymmärsinkö oikein, että puhut yrityksesi verkkosivusta tai digitaalisesta tarpeesta? 😊")
    };
  },

  routeToSecretary:function(h){
    if(!h)return null;
    let c=W.state.context();

    if(h.intent==="price_question")return W.roles.route("what is the price difference?");
    if(h.intent==="website_order_process")return W.roles.route("so do i need to talk to alex then? why did you ask me these questions?");

    const b=Object.assign({
      requirements:[],inferredSuggestions:[],rejectedSuggestions:[],customerSignals:[]
    },c.websiteBrief||{});
    const m=Object.assign({},c.clientMemory||{});

    if(h.business&&!b.business){
      b.business=h.business;
      m.business=h.business;
      m.businessRaw=null;
    }
    if(h.goal&&!b.goal)b.goal=h.goal;
    b.requirements=merge(b.requirements,h.requirements);
    b.inferredSuggestions=merge(b.inferredSuggestions,h.inferredSuggestions);
    b.rejectedSuggestions=uniqNeeds(b.rejectedSuggestions||[]);
    b.customerSignals=uniq([...(b.customerSignals||[]),...(h.customerSignals||[])]);
    if(h.size&&!b.size)b.size=h.size;

    // Anything already confirmed or rejected is no longer a pending suggestion.
    const reqSet=new Set(uniqNeeds(b.requirements));
    const rejSet=new Set(uniqNeeds(b.rejectedSuggestions));
    b.inferredSuggestions=uniqNeeds(b.inferredSuggestions).filter(v=>!reqSet.has(v)&&!rejSet.has(v));

    W.state.patch({
      role:"secretary",
      topic:"website_consultation",
      websiteBrief:b,
      clientMemory:m,
      lastSemanticIntent:h.intent,
      lastSemanticConfidence:h.confidence
    });

    c=W.state.context();
    const bb=c.websiteBrief||b;
    const l=langOf(c);

    if(!bb.business){
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "I understand the direction 😊 Before I suggest anything, what kind of business is the website for?",
          "Я поняла направление 😊 Прежде чем что-то предлагать, уточню: для какого бизнеса нужен сайт?",
          "Ymmärsin suunnan 😊 Ennen ehdotuksia: millaiselle yritykselle sivusto tulee?")
      };
    }

    const candidate=nextCandidate(bb);
    if(candidate){
      const nextPending=bb.goal?(!bb.size?"size":c.pending):"goal";
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",
        pending:nextPending||null,pendingAction:"confirm_need:"+candidate,
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:questionForNeed(candidate,l,bb)
      };
    }

    if(!bb.goal){
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"goal",pendingAction:null,
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "Got it 😊 What should visitors mainly be able to do on the website — get information, contact you, book, view prices, buy products, or something else?",
          "Поняла 😊 Что посетители должны в первую очередь уметь делать на сайте — получать информацию, связываться с вами, записываться, смотреть цены, покупать товары или что-то ещё?",
          "Selvä 😊 Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään sivustolla?")
      };
    }

    if(!bb.size){
      const req=(bb.requirements&&bb.requirements.length)?(" Requirements: "+bb.requirements.join(", ")+"."):"";
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"size",pendingAction:null,
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "Great 😊 I've separated what you actually requested from ideas I only inferred."+req+" Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?",
          "Отлично 😊 Я отделила подтверждённые требования от идей, которые только предположила."+req+" Примерно какой объём нужен: одна страница, несколько отдельных страниц или большой многостраничный сайт?",
          "Hyvä 😊 Erottelin vahvistetut vaatimukset pelkistä päätelmistä."+req+" Kuinka laaja sivuston pitäisi olla: yksi sivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?")
      };
    }

    return W.roles.route("continue with my website");
  }
};
})(window.ANITA50=window.ANITA50||{});