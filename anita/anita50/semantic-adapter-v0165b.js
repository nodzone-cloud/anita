(function(W){
"use strict";
if(!W||!W.roles||!W.state)return;

function clean(v){return v==null?null:String(v).trim()||null;}
function uniq(a){return [...new Set((a||[]).map(v=>String(v||"").trim().toLowerCase()).filter(Boolean))];}

W.semanticAdapter={
  buildHandoff:function(o,text){
    if(!o||Number(o.confidence||0)<0.68)return null;
    const intent=String(o.intent||"other");
    if(!["website_request","website_goal","website_requirements","website_size","price_question","website_order_process"].includes(intent))return null;

    return {
      intent,
      business:clean(o.business),
      goal:clean(o.goal),
      requirements:uniq(o.requirements),
      size:clean(o.size),
      originalText:String(text||""),
      confidence:Number(o.confidence||0)
    };
  },

  routeToSecretary:function(h){
    if(!h)return null;
    const c=W.state.context();

    // Fixed deterministic business facts stay in the existing router.
    if(h.intent==="price_question"){
      return W.roles.route("what is the price difference?");
    }
    if(h.intent==="website_order_process"){
      return W.roles.route("so do i need to talk to alex then? why did you ask me these questions?");
    }

    // Feed structured facts into the existing Secretary flow in small deterministic steps.
    // This prevents Qwen from becoming the final speaker and prevents role mixing.
    let r=null;

    // If no active website consultation yet, enter it first.
    if(c.topic!=="website_consultation"){
      r=W.roles.route("I need a website");
      if(r&&r.kind!=="answer")r=null;
    }

    // Business
    let now=W.state.context();
    if(h.business && !(now.websiteBrief&&now.websiteBrief.business)){
      r=W.roles.route("I have a "+h.business);
      if(r&&r.kind==="answer"){
        W.state.patch({
          language:r.language||now.language,
          role:r.role||now.role,
          topic:r.topic!==undefined?r.topic:now.topic,
          pending:r.pending!==undefined?r.pending:now.pending,
          pendingAction:r.pendingAction!==undefined?r.pendingAction:now.pendingAction,
          websiteBrief:r.brief||now.websiteBrief,
          clientMemory:r.memory||now.clientMemory
        });
      }
    }

    // Goal / requirements
    now=W.state.context();
    const brief=now.websiteBrief||{};
    if((h.goal||h.requirements.length) && !brief.goal){
      let msg=h.goal||"";
      if(h.requirements.length){
        const req=h.requirements.join(", ");
        msg = msg ? (msg+". Requirements: "+req) : ("Visitors should be able to "+req);
      }
      r=W.roles.route(msg);
      if(r&&r.kind==="answer"){
        now=W.state.context();
        W.state.patch({
          language:r.language||now.language,
          role:r.role||now.role,
          topic:r.topic!==undefined?r.topic:now.topic,
          pending:r.pending!==undefined?r.pending:now.pending,
          pendingAction:r.pendingAction!==undefined?r.pendingAction:now.pendingAction,
          websiteBrief:r.brief||now.websiteBrief,
          clientMemory:r.memory||now.clientMemory
        });
      }
    }

    // Size
    now=W.state.context();
    if(h.size && !(now.websiteBrief&&now.websiteBrief.size)){
      r=W.roles.route(h.size);
      if(r&&r.kind==="answer"){
        now=W.state.context();
        W.state.patch({
          language:r.language||now.language,
          role:r.role||now.role,
          topic:r.topic!==undefined?r.topic:now.topic,
          pending:r.pending!==undefined?r.pending:now.pending,
          pendingAction:r.pendingAction!==undefined?r.pendingAction:now.pendingAction,
          websiteBrief:r.brief||now.websiteBrief,
          clientMemory:r.memory||now.clientMemory
        });
      }
    }

    // Return one fresh Secretary response based on the CURRENT structured state.
    now=W.state.context();
    const b=now.websiteBrief||{};
    if(!b.business){
      return W.roles.route("I need a website");
    }
    if(!b.goal){
      return W.roles.route("I have a "+b.business);
    }
    if(!b.size){
      // Ask size without overwriting already captured business/goal.
      return {
        kind:"answer",
        role:"secretary",
        language:now.language||"en",
        topic:"website_consultation",
        pending:"size",
        brief:b,
        memory:now.clientMemory||{},
        pose:"professional",
        text:"Got it 😊 I've noted your business and what visitors should be able to do. Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?"
      };
    }

    // Let the deterministic router generate the recommendation from stored brief.
    return W.roles.route("continue with my website");
  }
};
})(window);