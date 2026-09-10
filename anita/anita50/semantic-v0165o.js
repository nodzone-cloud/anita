(function(W){
"use strict";
if(!W||!W.ai||!W.state)return;

function stripCodeFence(s){
  return String(s||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
}
function extractJson(s){
  s=stripCodeFence(s);
  const a=s.indexOf("{"),b=s.lastIndexOf("}");
  if(a<0||b<=a)return null;
  try{return JSON.parse(s.slice(a,b+1));}catch(e){return null;}
}
function allowedIntent(x){
  return ["website_request","website_goal","website_requirements","website_size",
          "price_question","website_order_process","it_help","guide","other"].includes(x)?x:"other";
}
function normReqs(a){
  return [...new Set((Array.isArray(a)?a:[]).map(v=>String(v||"").trim().toLowerCase()).filter(Boolean))];
}
function clipBusiness(s){
  s=String(s||"").trim()
    .replace(/^(?:a|an|the|my|our|your)\s+/i,"")
    .replace(/\s+(?:where|that|which|and i|and we|with)\b.*$/i,"")
    .replace(/[.!?,;:]+$/,"")
    .trim();
  if(!s || s.length>80)return null;
  return s;
}
function salvageFromConversation(original,answer){
  const o=String(original||"");
  const a=String(answer||"");
  const all=(o+" "+a).toLowerCase();

  let intent="other";
  if(/\b(price|cost|how much|price difference|packages?)\b/i.test(o)) intent="price_question";
  else if(/\b(talk to alex|speak to alex|why did you ask|why are you asking)\b/i.test(o)) intent="website_order_process";
  else if(
    /\b(website|web site|webpage|online presence|online where|somewhere online|business online)\b/i.test(all) ||
    (/\b(customers?|clients?|people)\b/i.test(all) && /\b(book|appointment|arrange a time|see your services|see what i do|contact)\b/i.test(all))
  ) intent="website_request";

  let business=null;
  const patterns=[
    /\b(?:i(?:'ve| have)? got|i have|i run|i own)\s+(?:a|an|the)?\s*([^,.!?]{2,60}?(?:business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store))\b/i,
    /\bfor (?:your|my|our)\s+([^,.!?]{2,60}?(?:business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store))\b/i,
    /\b(?:your|my|our)\s+([^,.!?]{2,60}?(?:business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store))\b/i
  ];
  for(const rx of patterns){
    const m=(o+" "+a).match(rx);
    if(m){business=clipBusiness(m[1]); if(business)break;}
  }

  const req=[];
  if(/\b(book|booking|appointment|arrange a time|schedule a time|calendar)\b/i.test(all)) req.push("booking");
  if(/\b(buy|purchase|shop online|e-?commerce|sell products?|product sales)\b/i.test(all)) req.push("product sales");
  if(/\b(gallery|photos?|images?)\b/i.test(all)) req.push("gallery");
  if(/\b(price list|prices)\b/i.test(all)) req.push("price list");
  if(/\b(map|location|choose a service location|choose.*location)\b/i.test(all)) req.push("map");
  if(/\b(portfolio|projects?|work examples?)\b/i.test(all)) req.push("portfolio");
  if(/\b(video|videos)\b/i.test(all)) req.push("video");
  if(/\b(contact|call|email|message)\b/i.test(all)) req.push("fast contact");
  if(/\b(services?|what i do|what we do)\b/i.test(all)) req.push("services");

  let goal=null;
  const goals=[];
  if(/\b(see what i do|see your services|see our services|see services|view services)\b/i.test(all)) goals.push("see the services");
  if(/\b(book|booking|appointment|arrange a time|schedule a time)\b/i.test(all)) goals.push("book a service time");
  if(/\b(choose a service location|choose.*location)\b/i.test(all)) goals.push("choose the service location");
  if(/\b(contact|call|email|message)\b/i.test(o)) goals.push("contact the business");
  if(goals.length) goal=[...new Set(goals)].join(" and ");

  let confidence=0.0;
  if(intent==="website_request") confidence=0.78;
  if(intent==="price_question"||intent==="website_order_process") confidence=0.95;
  if(business) confidence=Math.max(confidence,0.84);
  if(req.length) confidence=Math.max(confidence,0.86);
  if(goal) confidence=Math.max(confidence,0.88);

  return {
    intent,
    business,
    goal,
    requirements:[...new Set(req)],
    size:null,
    confidence,
    _salvaged:true
  };
}

W.semantic={
  shouldTry:function(text){
    const x=String(text||"").toLowerCase();

    // v0165o SECRETARY CONTEXT BOUNDARY:
    // An old Secretary/website context is memory, not permission to capture every next message.
    // Semantic website classification runs only when THIS message itself is website/business-project related.
    return /\b(website|web site|site|webpage|landing page|pages?|online presence|business website|company website|shop website|salon website|service website|booking|appointment|calendar|price list|portfolio|gallery|contact form|website order|order a website|build a website|create a website|design a website|somewhere online|arrange a time)\b/i.test(x)
      || /сайт|веб.?сайт|лендинг|страниц|онлайн.?присутств|заказ.*сайт|сайт.*заказ|брон|запис|календар|прайс|портфолио|галере|форма.*контакт/i.test(x);
  },

  interpret:async function(text,language){
    if(!W.ai.endpoint||!W.ai.endpoint())return null;

    const prompt=[
      "SEMANTIC CLASSIFICATION ONLY.",
      "Do NOT answer the visitor conversationally.",
      "Return ONLY one minified JSON object and nothing else.",
      "Use only facts explicitly present in the visitor message. Never invent Alex Node facts.",
      'Schema: {"intent":"website_request|website_goal|website_requirements|website_size|price_question|website_order_process|it_help|guide|other","business":null,"goal":null,"requirements":[],"size":null,"confidence":0.0}',
      'size can only be "one landing page", "a few separate pages", "a larger multi-page site", or null.',
      "A visitor can request a website indirectly. If they describe wanting an online place for their business where customers can see information, contact, book or buy, classify it as website_request even if they never use the word website.",
      "Visitor message: "+JSON.stringify(String(text||""))
    ].join("\n");

    try{
      // IMPORTANT: this is the only AI call for the business semantic path.
      const r=await W.ai.ask(prompt,language||"en");
      if(!r||!r.ok)return salvageFromConversation(text,"");

      const raw=String(r.answer||"");
      const obj=extractJson(raw);

      if(obj){
        obj.intent=allowedIntent(String(obj.intent||"other"));
        obj.confidence=Math.max(0,Math.min(1,Number(obj.confidence||0)));
        obj.requirements=normReqs(obj.requirements);
        return obj;
      }

      // If Qwen ignored the JSON instruction and answered conversationally,
      // DO NOT display that answer. Salvage semantic facts from it instead.
      return salvageFromConversation(text,raw);

    }catch(e){
      return salvageFromConversation(text,"");
    }
  }
};
})(window.ANITA50=window.ANITA50||{});