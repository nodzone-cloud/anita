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
function mergeRequirements(a,b){return uniq([...(a||[]),...(b||[])]);}

W.semanticAdapter={
  buildHandoff:function(o,text){
    if(!o)return null;
    const intent=String(o.intent||"other");
    if(!["website_request","website_goal","website_requirements","website_size","price_question","website_order_process"].includes(intent))return null;
    return {
      intent,
      business:clean(o.business),
      goal:clean(o.goal),
      requirements:uniq(o.confirmed_requirements||o.requirements),
      inferredSuggestions:uniq(o.inferred_suggestions),
      size:clean(o.size),
      originalText:String(text||""),
      confidence:Number(o.confidence||0)
    };
  },

  controlledClarification:function(text){
    const c=W.state.context(),l=langOf(c);
    return {
      kind:"answer",role:"secretary",language:l,topic:"website_consultation",
      pending:c.pending||null,brief:c.websiteBrief||{},memory:c.clientMemory||{},
      pose:"professional",
      text:say(l,
        "I think you're looking for help with a website for your business 😊 Is that right?",
        "Похоже, вам нужна помощь с сайтом для вашего бизнеса 😊 Я правильно поняла?",
        "Ymmärsinkö oikein, että etsit apua yrityksesi verkkosivuun? 😊")
    };
  },

  routeToSecretary:function(h){
    if(!h)return null;
    let c=W.state.context();

    if(h.intent==="price_question") return W.roles.route("what is the price difference?");
    if(h.intent==="website_order_process") return W.roles.route("so do i need to talk to alex then? why did you ask me these questions?");

    // Hard boundary: for recognized website intent, Qwen NEVER becomes the final speaker.
    // We mutate structured memory first, then Secretary asks only the next missing question.
    const b=Object.assign({}, c.websiteBrief||{});
    const m=Object.assign({}, c.clientMemory||{});

    if(h.business && !b.business){
      b.business=h.business;
      m.business=h.business;
      m.businessRaw=null;
    }
    if(h.goal && !b.goal) b.goal=h.goal;
    b.requirements=mergeRequirements(b.requirements,h.requirements);
    b.inferredSuggestions=mergeRequirements(b.inferredSuggestions,h.inferredSuggestions);
    if(h.size && !b.size) b.size=h.size;

    W.state.patch({
      role:"secretary",
      topic:"website_consultation",
      websiteBrief:b,
      clientMemory:m,
      lastSemanticIntent:h.intent,
      lastSemanticConfidence:h.confidence
    });

    c=W.state.context();
    const bb=c.websiteBrief||{};
    const l=langOf(c);

    if(!bb.business){
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"business",
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "Yes 😊 I can help you figure that out. What kind of business is the website for?",
          "Да 😊 Я помогу с этим разобраться. Для какого бизнеса нужен сайт?",
          "Kyllä 😊 Voin auttaa selvittämään sen. Millaiselle yritykselle verkkosivu tulee?")
      };
    }

    if(!bb.goal){
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"goal",
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "Got it 😊 So the website is for your "+bb.business+". What should visitors mainly be able to do there — get information, contact you, book, view prices, buy products, or something else?",
          "Поняла 😊 Значит, сайт нужен для "+bb.business+". Что посетители должны в первую очередь делать на сайте — получать информацию, связываться с вами, записываться, смотреть цены, покупать товары или что-то ещё?",
          "Selvä 😊 Sivusto tulee siis yrityksellesi: "+bb.business+". Mitä kävijöiden pitäisi ensisijaisesti pystyä tekemään siellä?")
      };
    }

    if(!bb.size){
      const req=(bb.requirements&&bb.requirements.length)?(" Requirements: "+bb.requirements.join(", ")+"."):"";
      const suggestion=(bb.inferredSuggestions&&bb.inferredSuggestions.length)
        ? " I may suggest a couple of optional ideas later, but I haven't added them as requirements."
        : "";
      return {
        kind:"answer",role:"secretary",language:l,topic:"website_consultation",pending:"size",
        brief:bb,memory:c.clientMemory||{},pose:"professional",
        text:say(l,
          "Absolutely 😊 I've noted your "+bb.business+" and the main goal: "+bb.goal+"."+req+suggestion+" Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?",
          "Конечно 😊 Я записала бизнес: "+bb.business+", и основную цель: "+bb.goal+"."+req+" Примерно какой объём нужен: одна посадочная страница, несколько отдельных страниц или большой многостраничный сайт?",
          "Totta kai 😊 Kirjasin yrityksesi ja päätavoitteen: "+bb.goal+"."+req+" Kuinka laaja sivuston pitäisi suunnilleen olla: yksi laskeutumissivu, muutama erillinen sivu vai suurempi monisivuinen sivusto?")
      };
    }

    // Existing deterministic continuation/recommendation path.
    return W.roles.route("continue with my website");
  }
};
})(window.ANITA50=window.ANITA50||{});