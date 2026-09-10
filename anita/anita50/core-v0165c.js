(function(){
const C=ANITA50_CONFIG,W=window.ANITA50=window.ANITA50||{},
q=()=>document.getElementById("an50-input"),
s=()=>document.getElementById("an50-send");

let busy=false,queue=[];
const home=()=>((location.pathname||"/").replace(/\/+$/,"")||"/")==="/";

function guardBusinessFacts(answer,language){
  let a=(answer||"").trim();
  const emails=a.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig)||[];
  if(emails.some(e=>e.toLowerCase()!==C.contact.email.toLowerCase())){
    a=a.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig,C.contact.email);
  }
  if(/start (?:working )?(?:right away|immediately)|can start (?:right away|immediately)|1\s*(?:to|–|-)\s*2 weeks/i.test(a)){
    return language==="ru"
      ?"Срок и дата начала зависят от итогового объёма проекта и текущей загрузки. Алекс подтвердит это после просмотра проекта 😊"
      :"The timeline and start date depend on the final project scope and current availability. Alex can confirm them after reviewing the project 😊";
  }
  return a;
}

async function handle(text){
  const before=W.state.context();
  const r=W.roles.route(text);

  W.state.patch({
    language:r.language,
    role:r.role||before.role,
    lastUser:text,
    topic:r.topic!==undefined?r.topic:before.topic,
    pending:r.pending!==undefined?r.pending:before.pending,
    pendingAction:r.pendingAction!==undefined?r.pendingAction:before.pendingAction,
    websiteBrief:r.brief||before.websiteBrief,
    clientMemory:r.memory||before.clientMemory
  });

  if(r.kind==="tour"){
    await W.tour.start(r.language);
    return;
  }

  if(r.kind==="answer"){
    W.ui.mode(W.state.tour()?.active?"tour":"chat");
    W.ui.pose(r.pose||"neutral");
    W.ui.bubbleText(r.text);
    return;
  }

  W.ui.pose("thinking");
  W.ui.bubbleText("Hmm... let me think 😊");

  try{
    if(W.semantic&&W.semanticAdapter&&W.semantic.shouldTry(text)){
      const sem=await W.semantic.interpret(text,r.language);
      const handoff=W.semanticAdapter.buildHandoff(sem,text);

      let sr=null;
      if(handoff && handoff.confidence>=0.68){
        sr=W.semanticAdapter.routeToSecretary(handoff);
      }else{
        // HARD BUSINESS BOUNDARY:
        // no second free-form Qwen answer after semantic failure.
        sr=W.semanticAdapter.controlledClarification(text);
      }

      if(sr&&sr.kind==="answer"){
        const before=W.state.context();
        W.state.patch({
          language:sr.language||before.language,
          role:sr.role||"secretary",
          topic:sr.topic!==undefined?sr.topic:(before.topic||"website_consultation"),
          pending:sr.pending!==undefined?sr.pending:before.pending,
          pendingAction:sr.pendingAction!==undefined?sr.pendingAction:before.pendingAction,
          websiteBrief:sr.brief||before.websiteBrief,
          clientMemory:sr.memory||before.clientMemory,
          lastSemanticIntent:(sem&&sem.intent)||before.lastSemanticIntent||null,
          lastSemanticConfidence:(sem&&sem.confidence)||before.lastSemanticConfidence||0
        });
        W.ui.pose(sr.pose||"professional");
        W.ui.bubbleText(sr.text);
        return;
      }
    }

    // Normal free AI fallback remains available only outside the protected business-intake path.
    const a=await W.ai.ask(text,r.language);
    if(!a.ok){
      W.ui.pose("important");
      W.ui.bubbleText(
        r.language==="ru"
          ?"Сейчас моя расширенная помощь не подключена к публичному сайту 😊 Но я всё ещё могу помочь с услугами, пакетами, заявкой, навигацией и базовой IT-помощью."
          :"My extended assistance is not connected to the public website yet 😊 I can still help with services, packages, enquiries, website navigation and basic IT assistance."
      );
      return;
    }
    W.ui.pose("important");
    W.ui.bubbleText(guardBusinessFacts(a.answer,r.language));
  }catch(e){
    W.ui.pose("important");
    W.ui.bubbleText("I can’t reach my extended assistance right now 😊 Please try again a little later.");
  }
}

async function process(){
  if(busy||!queue.length)return;
  busy=true;
  await handle(queue.shift());
  busy=false;
  process();
}

function enqueue(){
  const v=q().value.trim();
  if(!v)return;
  q().value="";
  queue.push(v);
  process();
}

function boot(){
  s().onclick=enqueue;
  q().addEventListener("keydown",e=>{
    if(e.key==="Enter"){
      e.preventDefault();
      enqueue();
    }
  });

  const t=W.state.tour();

  if(t&&t.active&&!home()){
    W.ui.mode("tour");
    W.tour.resume();
    return;
  }

  if(home()){
    W.state.clearTour();
    W.ui.hello();
    let stage="hello";
    W.ui.root().onclick=e=>{
      if(e.target.closest("#an50-chat,.an50-tour-controls,.an50-btn"))return;
      if(stage==="hello"){
        stage="guide";
        W.ui.guideIntro();
        return;
      }
      if(stage==="guide"){
        stage="tour";
        W.tour.start(W.state.context().language||"en");
      }
    };
  }else{
    W.ui.ready();
  }
}

if(document.readyState==="loading")
  document.addEventListener("DOMContentLoaded",boot,{once:true});
else
  boot();
})();

;(function(W){
  const C=W.ANITA50_CORE;
  if(!C||!C.ask||C.__v0163_guard)return;
  const original=C.ask.bind(C);
  C.ask=async function(message){
    let out=await original(message);
    const ctx=W.ANITA50_STATE&&W.ANITA50_STATE.context||{};
    if(ctx.topic==="website_order" && typeof out==="string"){
      if(/\b(?:your|the) website and (?:a )?character\b/i.test(out) || /\bwhatever comes next with your website and character\b/i.test(out)){
        out="I'm collecting the details for your website project so I can prepare a brief for Alex 😊 A virtual character is a separate, optional service and isn't part of your website unless you specifically want one.";
      }
    }
    return out;
  };
  C.__v0163_guard=true;
})(window);
