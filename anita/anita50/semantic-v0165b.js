(function(W){
"use strict";
if(!W||!W.ai||!W.state)return;

function extractJson(s){
  s=String(s||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
  const a=s.indexOf("{"),b=s.lastIndexOf("}");
  if(a<0||b<=a)return null;
  try{return JSON.parse(s.slice(a,b+1));}catch(e){return null;}
}
function allowedIntent(x){
  return ["website_request","website_goal","website_requirements","website_size",
          "price_question","website_order_process","it_help","guide","other"].includes(x)?x:"other";
}
W.semantic={
  shouldTry:function(text){
    const c=W.state.context(),x=String(text||"").toLowerCase();
    if(c.role==="secretary"||c.topic==="website_consultation")return true;
    return /\b(website|web site|site|webpage|online|business|company|shop|salon|service|customer|client|booking|appointment|calendar|product|price|portfolio|gallery|contact|order|build|create|design)\b/i.test(x)
      || /сайт|онлайн|бизнес|клиент|заказ|брон|запис|цен|услуг/i.test(x);
  },
  interpret:async function(text,language){
    if(!W.ai.endpoint||!W.ai.endpoint())return null;
    const prompt=[
      "SEMANTIC CLASSIFICATION ONLY. Do not answer the visitor.",
      "Return ONLY one minified JSON object, no markdown.",
      "Use only facts explicitly present in the visitor message. Never invent business facts.",
      'Schema: {"intent":"website_request|website_goal|website_requirements|website_size|price_question|website_order_process|it_help|guide|other","business":null,"goal":null,"requirements":[],"size":null,"confidence":0.0}',
      'size can only be "one landing page", "a few separate pages", "a larger multi-page site", or null.',
      "If someone describes wanting an online place for their business where customers can see information, contact, book, or buy, use website_request even if they do not say the word website.",
      "Visitor message: "+JSON.stringify(String(text||""))
    ].join("\n");
    try{
      const r=await W.ai.ask(prompt,language||"en");
      if(!r||!r.ok)return null;
      const o=extractJson(r.answer);
      if(!o)return null;
      o.intent=allowedIntent(String(o.intent||"other"));
      o.confidence=Math.max(0,Math.min(1,Number(o.confidence||0)));
      if(!Array.isArray(o.requirements))o.requirements=[];
      return o;
    }catch(e){return null;}
  }
};
})(window);