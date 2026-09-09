(function(){
const C=ANITA50_CONFIG,W=window.ANITA50=window.ANITA50||{};
const local=()=>location.protocol==="file:"||["localhost","127.0.0.1"].includes(location.hostname);

W.ai={
  endpoint(){return C.engineUrl||(local()?C.localDevEngineUrl:"")},
  status(){
    const e=this.endpoint();
    return{configured:!!e,endpoint:e||null,mode:C.engineUrl?"public":local()?"local-dev":"off"};
  },
  async ask(text,language){
    const e=this.endpoint();
    if(!e)return{ok:false,reason:"NO_PUBLIC_ENDPOINT"};

    const c=W.state.context();
    const r=await fetch(e,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        message:text,
        session_id:W.state.visitorId,
        current_page:location.href,
        client_context:{
          language,
          role:c.role,
          topic:c.topic,
          pending_action:c.pendingAction||null,
          client_memory:c.clientMemory||{},
          website_brief:c.websiteBrief||{}
        }
      })
    });

    const d=await r.json();
    if(!r.ok||!d.ok)throw new Error(d.error||("HTTP "+r.status));

    return{
      ok:true,
      answer:(d.answer||"").trim(),
      topic:d.topic||c.topic
    };
  }
};
})();
