(function(W){
"use strict";
if(!W||!W.ai||!W.state)return;

function stripCodeFence(s){return String(s||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");}
function extractJson(s){
  s=stripCodeFence(s);
  const a=s.indexOf("{"),b=s.lastIndexOf("}");
  if(a<0||b<=a)return null;
  try{return JSON.parse(s.slice(a,b+1));}catch(e){return null;}
}
function uniq(a){return [...new Set((Array.isArray(a)?a:[]).map(v=>String(v||"").trim().toLowerCase()).filter(Boolean))];}
function allowedIntent(x){
  return ["website_request","website_goal","website_requirements","website_size","price_question","website_order_process","it_help","guide","other"].includes(x)?x:"other";
}
function clipBusiness(s){
  s=String(s||"").trim().replace(/^(?:a|an|the|my|our|your)\s+/i,"").replace(/[.!?,;:]+$/,"").trim();
  return (!s||s.length>80)?null:s;
}
function explicitFacts(text){
  const o=String(text||"");
  const x=o.toLowerCase();
  let business=null;
  const bp=[
    /\b(?:i(?:'ve| have)? got|i have|i run|i own)\s+(?:a|an|the)?\s*([^,.!?]{2,60}?(?:business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store))\b/i,
    /\b(?:my|our)\s+([^,.!?]{2,60}?(?:business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store))\b/i
  ];
  for(const rx of bp){const m=o.match(rx); if(m){business=clipBusiness(m[1]); if(business)break;}}

  const confirmed=[];
  // Only explicit requested/desired functionality becomes confirmed.
  if(/\b(book|booking|appointment|arrange a time|schedule a time|make an appointment)\b/i.test(x)) confirmed.push("booking");
  if(/\b(buy|purchase|sell|shop online|e-?commerce|online store)\b/i.test(x)) confirmed.push("product sales");
  if(/\b(gallery|photo gallery|show photos|show images)\b/i.test(x)) confirmed.push("gallery");
  if(/\b(show|display|see|view)\s+(?:our|my|the)?\s*prices?\b/i.test(x) || /\bprice list\b/i.test(x)) confirmed.push("price list");
  if(/\b(choose|select)\s+(?:a|the)?\s*(?:service )?location\b/i.test(x)) confirmed.push("service location");
  if(/\b(portfolio|work examples|show our work|show my work)\b/i.test(x)) confirmed.push("portfolio");
  if(/\b(video|videos)\b/i.test(x)) confirmed.push("video");
  if(/\b(contact us|contact me|send us a message|send me a message|contact form)\b/i.test(x)) confirmed.push("contact");
  if(/\b(see what i do|see what we do|see my services|see our services|view my services|view our services)\b/i.test(x)) confirmed.push("services");

  const inferred=[];
  // Context is useful, but must NOT be stored as a client requirement.
  if(/\bpeople mostly call me\b/i.test(x) || /\bcustomers? mostly call\b/i.test(x)) inferred.push("contact could be made easier online");
  if(confirmed.includes("booking")) inferred.push("a dedicated Booking page may be useful");
  if(/\btyre|tire|repair|service\b/i.test(x) && confirmed.includes("services")) inferred.push("a Services page may be useful");

  const goals=[];
  if(/\b(see what i do|see what we do|see my services|see our services|view my services|view our services)\b/i.test(x)) goals.push("see the services");
  if(/\b(book|booking|appointment|arrange a time|schedule a time)\b/i.test(x)) goals.push("book a service time");
  if(/\b(choose|select).{0,25}(?:service )?location\b/i.test(x)) goals.push("choose the service location");
  if(/\b(contact us|contact me|send us a message|send me a message|contact form)\b/i.test(x)) goals.push("contact the business");

  let intent="other";
  const online=/\b(somewhere online|online presence|website|web site|webpage|site)\b/i.test(x);
  if(online || (business && (confirmed.length||goals.length))) intent="website_request";

  return {
    intent,business,
    goal:goals.length?[...new Set(goals)].join(" and "):null,
    confirmed_requirements:uniq(confirmed),
    inferred_suggestions:uniq(inferred),
    size:null,
    confidence:intent==="website_request" ? (business?0.94:0.84) : 0.0
  };
}

W.semantic={
  shouldTry:function(text){
    const c=W.state.context(),x=String(text||"").toLowerCase();
    if(c.role==="secretary"||c.topic==="website_consultation")return true;
    return /\b(website|web site|site|webpage|online|business|company|shop|salon|service|customer|client|booking|appointment|product|price|portfolio|gallery|contact|order|build|create|design|somewhere online|arrange a time)\b/i.test(x)
      || /сайт|онлайн|бизнес|клиент|заказ|брон|запис|цен|услуг/i.test(x);
  },
  interpret:async function(text,language){
    const local=explicitFacts(text);
    if(!W.ai.endpoint||!W.ai.endpoint())return local;

    const prompt=[
      "SEMANTIC CLASSIFICATION ONLY. Return ONLY minified JSON.",
      "Do not answer the visitor.",
      "Never convert an inference into a confirmed requirement.",
      "confirmed_requirements = functionality the visitor explicitly asked for or clearly said visitors should be able to do.",
      "inferred_suggestions = useful ideas implied by context but NOT explicitly requested.",
      'Schema: {"intent":"website_request|website_goal|website_requirements|website_size|price_question|website_order_process|it_help|guide|other","business":null,"goal":null,"confirmed_requirements":[],"inferred_suggestions":[],"size":null,"confidence":0.0}',
      "Visitor message: "+JSON.stringify(String(text||""))
    ].join("\n");

    try{
      const r=await W.ai.ask(prompt,language||"en");
      if(!r||!r.ok)return local;
      const obj=extractJson(r.answer);
      if(!obj)return local;

      obj.intent=allowedIntent(String(obj.intent||local.intent||"other"));
      obj.business=clipBusiness(obj.business)||local.business;
      obj.confirmed_requirements=uniq([...(obj.confirmed_requirements||[]),...local.confirmed_requirements]);
      obj.inferred_suggestions=uniq([...(obj.inferred_suggestions||[]),...local.inferred_suggestions]);

      // Safety filter: inferred-only items may never become confirmed unless explicit local evidence exists.
      const explicitSet=new Set(local.confirmed_requirements);
      obj.confirmed_requirements=obj.confirmed_requirements.filter(v=>{
        if(["price list","contact","fast contact","services"].includes(v) && !explicitSet.has(v)) return false;
        return true;
      });

      obj.goal=obj.goal||local.goal;
      obj.size=obj.size||null;
      obj.confidence=Math.max(Number(obj.confidence||0),local.confidence||0);
      return obj;
    }catch(e){return local;}
  }
};
})(window.ANITA50=window.ANITA50||{});