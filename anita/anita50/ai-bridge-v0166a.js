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
          website_brief:c.websiteBrief||{},
          verified_business_facts:{
            contact:{phone:C.contact.phone,email:C.contact.email},
            packages:C.packages,
            rules:[
              "Do not invent or substitute Alex Node contact details.",
              "Do not promise project start dates, current availability or delivery timelines.",
              "Do not invent fixed custom-coding prices.",
              "For website-order intent, help collect a brief instead of redirecting the visitor to browse the website."
            ]
          }
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
