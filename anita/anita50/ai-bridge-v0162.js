(function(W){
async function ask(message){
 const cfg=W.ANITA50_CONFIG,c=W.ANITA50_STATE.context;
 const payload={message,session_id:W.ANITA50_STATE.visitorId,current_page:location.href,
 client_context:{language:c.language||"en",role:c.role,topic:c.topic,
 client_memory:c.clientMemory||{},website_brief:c.websiteBrief||{},
 verified_business:cfg.verifiedBusiness}};
 const res=await fetch(cfg.engineUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
 if(!res.ok)throw new Error("ANITA Engine "+res.status);
 const d=await res.json(); let text=d.answer||d.message||d.response||"";
 if(typeof text==="object")text=text.content||JSON.stringify(text);
 // Public business-fact guard: never allow invented Alex Node contact/timeline claims through.
 text=String(text)
   .replace(/\binfo@alexnode\.fi\b/gi,cfg.verifiedBusiness.email)
   .replace(/\b(?:we can|we'll|we will) start (?:working )?(?:on your project )?right away\b[.!]?/gi,"Alex can confirm current availability after reviewing the project.")
   .replace(/\bit usually takes about 1 to 2 weeks[^.!]*[.!]?/gi,"The timeline depends on the project scope and current availability. Alex can confirm an estimate after reviewing the project.");
 return text;
}
W.ANITA50_AI={ask};
})(window);