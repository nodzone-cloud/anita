/* ANITA 0.1.8 — semantic needs understanding: separate facts, behaviour, needs and confirmed requirements */
(function(W){
"use strict";
if(!W||!W.ai||!W.state)return;

const NEEDS=[
  "booking","availability calendar","service location","price list","services",
  "information","product sales","gallery","portfolio","video","contact",
  "fast contact","quote request","map"
];

function stripCodeFence(s){return String(s||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");}
function extractJson(s){
  s=stripCodeFence(s);
  const a=s.indexOf("{"),b=s.lastIndexOf("}");
  if(a<0||b<=a)return null;
  try{return JSON.parse(s.slice(a,b+1));}catch(e){return null;}
}
function cleanText(s){return String(s||"").trim();}
function uniq(a){return [...new Set((Array.isArray(a)?a:[]).map(v=>cleanText(v).toLowerCase()).filter(Boolean))];}
function normalizeNeed(v){
  v=cleanText(v).toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ");
  const aliases={
    "online booking":"booking","appointment booking":"booking","appointments":"booking",
    "calendar":"availability calendar","availability":"availability calendar","available times":"availability calendar",
    "location choice":"service location","choose location":"service location","service place":"service location",
    "prices":"price list","pricing":"price list","pricing page":"price list",
    "service list":"services","business info":"information","company information":"information",
    "online shop":"product sales","ecommerce":"product sales","e commerce":"product sales","shop":"product sales",
    "quick contact":"fast contact","contact button":"fast contact",
    "quote":"quote request","estimate":"quote request","request quote":"quote request",
    "google maps":"map","location map":"map"
  };
  v=aliases[v]||v;
  return NEEDS.includes(v)?v:null;
}
function uniqNeeds(a){return [...new Set((a||[]).map(normalizeNeed).filter(Boolean))];}
function allowedIntent(x){
  return ["website_request","website_goal","website_requirements","website_size","price_question","website_order_process","it_help","guide","other"].includes(x)?x:"other";
}
function clipBusiness(s){
  s=cleanText(s).replace(/^(?:a|an|the|my|our|your)\s+/i,"").replace(/[.!?,;:]+$/,"").trim();
  return (!s||s.length>80)?null:s;
}
function looksLikeBehaviour(x){
  const desired=/\b(?:want|need|would like)\s+(?:customers?|clients?|people|visitors?)\s+to\b|\b(?:customers?|clients?|people|visitors?)\s+(?:should|must|need to|can|could|will be able to)\b/i.test(x)
    || /(?:хочу|хотим).{0,35}(?:клиент|покупател|посетител).{0,20}(?:мог|делал|делали)|(?:клиент|покупател|посетител).{0,25}(?:долж|мог)/i.test(x);
  const current=/\b(?:usually|mostly|normally|currently|right now|at the moment)\b/i.test(x)
    || /(?:обычно|сейчас|в основном)/i.test(x);
  if(desired&&!current)return false;
  return /\b(?:people|customers?|clients?|they|visitors?)\b.{0,45}\b(?:call|phone|message|text|email|ask|come|visit|contact)\b/i.test(x)
    || current
    || /(?:клиент|покупател|люди).{0,45}(?:звон|пиш|спраш|приход)/i.test(x);
}
function looksLikeExplicitWish(x){
  return /\b(?:i|we)\s+(?:want|need|would like|require)\b|\b(?:website|site|webpage)\b.{0,35}\b(?:should|must|needs?|include|have|with)\b|\b(?:customers?|clients?|visitors?|users?|people)\s+(?:should|must|need to|can|could|be able to)\b/i.test(x)
    || /(?:я|мы)\s+(?:хочу|хотим|нужно|нужен|нужна|нужны)|(?:сайт|посетител|клиент).{0,40}(?:долж|мог|нуж)/i.test(x);
}
function isShortAnswerContext(ctx,x){
  return ctx&&ctx.topic==="website_consultation"&&ctx.pending==="goal"&&x.length<=180&&!looksLikeBehaviour(x);
}
function detectBusiness(text,ctx){
  const o=cleanText(text);
  const ps=[
    /\b(?:website|site)\s+for\s+(?:my\s+)?(?:a|an\s+)?(.+?)(?:[.!?]|$)/i,
    /\b(?:i(?:'ve| have)? got|i have|i run|i own)\s+(?:a|an|the)?\s*([^,.!?]{2,70})/i,
    /\b(?:my|our)\s+business\s+(?:is\s+)?(?:a|an\s+)?([^,.!?]{2,70})/i,
    /(?:мой|наш)\s+бизнес\s*[-—:]?\s*(.+?)(?:[.!?]|$)/i
  ];
  for(const rx of ps){
    const m=o.match(rx);
    if(m){
      const b=clipBusiness(m[1]);
      if(b&&!/\b(?:website|site|page|section|booking|gallery|price|calendar)\b/i.test(b))return b;
    }
  }
  if(ctx&&ctx.topic==="website_consultation"&&ctx.pending==="business"){
    const x=o.toLowerCase();
    if(o.length>=2&&o.length<=80&&!/\b(?:website|site|page|section|booking|gallery|price|calendar|what|how|why|when)\b/i.test(x)){
      return clipBusiness(o);
    }
  }
  return null;
}
function pushIf(arr,key,cond){if(cond)arr.push(key);}
function explicitFacts(text){
  const ctx=W.state.context();
  const o=cleanText(text),x=o.toLowerCase();
  const behaviour=looksLikeBehaviour(x);
  const explicitWish=looksLikeExplicitWish(x);
  const shortGoal=isShortAnswerContext(ctx,o);
  const direct=(explicitWish||shortGoal)&&!behaviour;

  let business=detectBusiness(o,ctx);
  const confirmed=[],inferred=[],signals=[],goals=[];

  const hasBooking=/\b(?:book|booking|appointment|schedule|reservation|arrange a time|make an appointment)\b|запис|брон/i.test(x);
  const hasAvailability=/\b(?:availability|available|free|booked|occupied|open slots?|time slots?)\b|\bcalendar\b.{0,45}\b(?:time|slot|available|free|booked)\b|свобод|занят|доступ.*врем|календар/i.test(x);
  const hasLocation=/\b(?:choose|select).{0,30}(?:service )?(?:location|place)\b|\bwhere (?:to )?(?:bring|come|go)\b|\bwhich location\b|локац|место|куда.*привез/i.test(x);
  const hasPrices=/\b(?:price list|prices|pricing|how much|cost)\b|прайс|цен|стоим/i.test(x);
  const hasServices=/\b(?:services?|what (?:do|can) you do|see what (?:i|we) do|service list)\b|услуг|что.*дела/i.test(x);
  const hasInfo=/\b(?:business information|company information|information about|opening hours?|hours|when (?:are|is).+open)\b|информац|часы работ|когда.*откры/i.test(x);
  const hasSales=/\b(?:buy|purchase|sell|online store|online shop|checkout|cart|e-?commerce|order products?)\b|магазин|купить|прода.*товар/i.test(x);
  const hasGallery=/\b(?:gallery|photo gallery|show photos|show images)\b|галере|фото/i.test(x);
  const hasPortfolio=/\b(?:portfolio|work examples|show (?:my|our) work)\b|портфолио|работы/i.test(x);
  const hasVideo=/\bvideos?\b|видео/i.test(x);
  const hasContact=/\b(?:contact form|contact us|contact me|send (?:us|me) a message)\b|форма.*связ|написать/i.test(x);
  const hasQuote=/\b(?:quote|estimate|request a quote|get an estimate)\b|расч[её]т|оценк.*цен/i.test(x);
  const hasMap=/\b(?:map|google maps|directions|address)\b|карта|адрес/i.test(x);

  if(direct){
    pushIf(confirmed,"booking",hasBooking);
    pushIf(confirmed,"availability calendar",hasAvailability);
    pushIf(confirmed,"service location",hasLocation);
    pushIf(confirmed,"price list",hasPrices);
    pushIf(confirmed,"services",hasServices);
    pushIf(confirmed,"information",hasInfo);
    pushIf(confirmed,"product sales",hasSales);
    pushIf(confirmed,"gallery",hasGallery);
    pushIf(confirmed,"portfolio",hasPortfolio);
    pushIf(confirmed,"video",hasVideo);
    pushIf(confirmed,"contact",hasContact);
    pushIf(confirmed,"quote request",hasQuote);
    pushIf(confirmed,"map",hasMap);
  }

  // Behaviour is evidence of a possible need, never confirmation.
  if(behaviour){
    if(/\b(?:call|phone|message|text|ask)\b/i.test(x)&&( /\b(?:when|time|free|available|appointment|book|schedule)\b/i.test(x)||/когда|врем|свобод|запис/i.test(x))){
      inferred.push(hasAvailability||/\bwhen\b.*\bfree\b/i.test(x)?"availability calendar":"booking");
      signals.push("customers contact the business to arrange a time");
    }
    if(/\b(?:ask|call|message|text)\b/i.test(x)&&hasPrices){
      inferred.push("price list");signals.push("customers ask about prices");
    }
    if(/\b(?:ask|call|message|text)\b/i.test(x)&&hasServices){
      inferred.push("services");signals.push("customers ask what services are offered");
    }
    if(/\b(?:ask|call|message|text|come)\b/i.test(x)&&hasLocation){
      inferred.push("service location");signals.push("customers need help choosing or finding the service location");
    }
    if(/\b(?:ask|call|message|text)\b/i.test(x)&&hasInfo){
      inferred.push("information");signals.push("customers ask for basic business information");
    }
    if(/\b(?:ask|call|message|text)\b/i.test(x)&&hasQuote){
      inferred.push("quote request");signals.push("customers request quotes or estimates");
    }
    if(/\b(?:call|message|text)\b/i.test(x)&&hasSales){
      inferred.push("product sales");signals.push("customers currently arrange product orders manually");
    }
    if(/\b(?:call|phone|message|text)\b/i.test(x)&&!hasBooking&&!hasAvailability&&!hasPrices&&!hasServices&&!hasLocation&&!hasInfo&&!hasQuote&&!hasSales){
      inferred.push("fast contact");signals.push("customers frequently contact the business directly");
    }
  }

  // Explicit goals, not guessed goals.
  if(direct&&hasServices)goals.push("see the services");
  if(direct&&hasBooking)goals.push("book a service time");
  if(direct&&hasAvailability)goals.push("see available times");
  if(direct&&hasLocation)goals.push("choose the service location");
  if(direct&&hasPrices)goals.push("see prices");
  if(direct&&hasSales)goals.push("buy products online");
  if(direct&&hasContact)goals.push("contact the business");
  if(direct&&hasQuote)goals.push("request a quote");

  let intent="other";
  if(/\b(?:how much|price difference|pricing|what.*price)\b|сколько.*сто|какая.*цен/i.test(x)&&!direct&&!behaviour)intent="price_question";
  else if(ctx&&ctx.topic==="website_consultation"){
    intent=(confirmed.length||inferred.length)?"website_requirements":"website_goal";
  }else{
    const online=/\b(?:somewhere online|online presence|website|web site|webpage|site)\b/i.test(x)||/сайт|онлайн/i.test(x);
    if(online||(business&&(confirmed.length||inferred.length||goals.length)))intent="website_request";
  }

  const existing=(ctx&&ctx.websiteBrief)||{};
  const existingReq=new Set(uniqNeeds(existing.requirements||[]));
  const rejected=new Set(uniqNeeds(existing.rejectedSuggestions||[]));
  const safeInferred=uniqNeeds(inferred).filter(v=>!existingReq.has(v)&&!rejected.has(v));

  return {
    intent,business,
    goal:goals.length?[...new Set(goals)].join(" and "):null,
    confirmed_requirements:uniqNeeds(confirmed),
    inferred_suggestions:safeInferred,
    customer_signals:uniq(signals),
    size:null,
    confidence:intent==="other"?0:(ctx&&ctx.topic==="website_consultation"?0.92:(business?0.94:0.84)),
    _behaviour:behaviour,
    _explicit:direct
  };
}

W.semantic={
  shouldTry:function(text){
    const c=W.state.context(),x=String(text||"").toLowerCase();
    if(c.role==="secretary"||c.topic==="website_consultation")return true;
    return /\b(?:website|web site|site|webpage|online|business|company|shop|salon|service|customer|client|booking|appointment|product|price|portfolio|gallery|contact|order|build|create|design|somewhere online|arrange a time)\b/i.test(x)
      || /сайт|онлайн|бизнес|клиент|заказ|брон|запис|цен|услуг/i.test(x);
  },

  interpret:async function(text,language){
    const local=explicitFacts(text);
    const ctx=W.state.context();
    if(!W.ai.endpoint||!W.ai.endpoint()){
      const out=Object.assign({},local); delete out._behaviour; delete out._explicit; return out;
    }

    const prompt=[
      "SEMANTIC CLASSIFICATION ONLY. Return ONLY minified JSON.",
      "Do not answer the visitor.",
      "Your job is to understand business context, what the visitor explicitly wants, and what their current customer behaviour may imply.",
      "CRITICAL: never convert a possible need into a confirmed requirement.",
      "confirmed_requirements = only functionality the visitor explicitly asks for, approves, wants, needs, or clearly says visitors should be able to do.",
      "inferred_suggestions = possible useful website needs inferred from current behaviour/problems, NOT yet approved by the visitor.",
      "customer_signals = short factual observations from the visitor's message, not advice.",
      "Allowed requirement/suggestion keys only: "+NEEDS.join(", ")+".",
      "If the visitor only describes what customers currently do (call, message, ask, visit), place the possible solution in inferred_suggestions, not confirmed_requirements.",
      '{"intent":"website_request|website_goal|website_requirements|website_size|price_question|website_order_process|it_help|guide|other","business":null,"goal":null,"confirmed_requirements":[],"inferred_suggestions":[],"customer_signals":[],"size":null,"confidence":0.0}',
      "Current conversation context: "+JSON.stringify({
        topic:ctx.topic||null,
        pending:ctx.pending||null,
        known_business:ctx.websiteBrief&&ctx.websiteBrief.business||ctx.clientMemory&&ctx.clientMemory.business||null,
        confirmed_requirements:ctx.websiteBrief&&ctx.websiteBrief.requirements||[],
        rejected_suggestions:ctx.websiteBrief&&ctx.websiteBrief.rejectedSuggestions||[]
      }),
      "Visitor message: "+JSON.stringify(String(text||""))
    ].join("\n");

    try{
      const r=await W.ai.ask(prompt,language||"en");
      if(!r||!r.ok){
        const out=Object.assign({},local); delete out._behaviour; delete out._explicit; return out;
      }
      const obj=extractJson(r.answer);
      if(!obj){
        const out=Object.assign({},local); delete out._behaviour; delete out._explicit; return out;
      }

      obj.intent=allowedIntent(String(obj.intent||local.intent||"other"));
      if(ctx.topic==="website_consultation"&&obj.intent==="other")obj.intent=local.intent||"website_goal";
      obj.business=clipBusiness(obj.business)||local.business;

      let aiConfirmed=uniqNeeds(obj.confirmed_requirements||[]);
      let aiInferred=uniqNeeds(obj.inferred_suggestions||[]);

      // Behaviour descriptions are not permission to add features.
      if(local._behaviour&&!local._explicit){
        aiInferred=uniqNeeds([...aiInferred,...aiConfirmed]);
        aiConfirmed=[];
      }

      obj.confirmed_requirements=uniqNeeds([
        ...local.confirmed_requirements,
        ...(local._explicit?aiConfirmed:[])
      ]);
      obj.inferred_suggestions=uniqNeeds([...local.inferred_suggestions,...aiInferred]);
      obj.customer_signals=uniq([...(local.customer_signals||[]),...(obj.customer_signals||[])]);

      const existing=(ctx.websiteBrief)||{};
      const confirmedSet=new Set(uniqNeeds([...(existing.requirements||[]),...obj.confirmed_requirements]));
      const rejectedSet=new Set(uniqNeeds(existing.rejectedSuggestions||[]));
      obj.inferred_suggestions=obj.inferred_suggestions.filter(v=>!confirmedSet.has(v)&&!rejectedSet.has(v));

      // AI may phrase a goal, but behaviour-only messages must not become a confirmed goal.
      obj.goal=local.goal||(local._explicit?cleanText(obj.goal)||null:null);
      obj.size=cleanText(obj.size)||null;
      obj.confidence=Math.max(Number(obj.confidence||0),local.confidence||0);

      return obj;
    }catch(e){
      const out=Object.assign({},local); delete out._behaviour; delete out._explicit; return out;
    }
  }
};
})(window.ANITA50=window.ANITA50||{});