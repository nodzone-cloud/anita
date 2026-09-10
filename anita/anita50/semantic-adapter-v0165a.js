(function(W){
"use strict";
if(!W||!W.roles)return;
W.semanticAdapter={
  toNormalizedMessage:function(o){
    if(!o||Number(o.confidence||0)<0.68)return null;
    const b=o.business?String(o.business).trim():"";
    const g=o.goal?String(o.goal).trim():"";
    const req=Array.isArray(o.requirements)?o.requirements.filter(Boolean).join(", "):"";
    switch(o.intent){
      case "website_request":
        if(b&&g)return "I need a website for my "+b+". I want visitors to "+g+(req?". Requirements: "+req:"");
        if(b)return "I need a website for my "+b;
        return "I need a website";
      case "website_goal":
      case "website_requirements":
        return g||(req?("I want visitors to "+req):null);
      case "website_size":
        return o.size||null;
      case "price_question":
        return "what is the price difference?";
      case "website_order_process":
        return "so do i need to talk to alex then? why did you ask me these questions?";
      default:return null;
    }
  }
};
})(window);