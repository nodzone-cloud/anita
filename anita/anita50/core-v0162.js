(function(W){
let chain=Promise.resolve();
function localFallback(m){
 const x=m.toLowerCase();
 if(/^(hi|hello|hey)\b/.test(x))return "Hi 😊 How can I help you today?";
 if(/\b(real person|are you real)\b/.test(x))return "No 😊 I'm not a real person. I'm ANITA, Alex Node IT Assistance — an original virtual character created by Alex Node. My main role is IT assistance, and I also help visitors with Alex Node services and website guidance.";
 return null;
}
async function process(message){
 const r=W.ANITA50_ROLES.handle(message);
 if(r&&r.handled)return r.text;
 const l=localFallback(message); if(l)return l;
 return await W.ANITA50_AI.ask(message);
}
W.ANITA50_CORE={ask:function(message){
 const job=()=>process(message);
 const p=chain.then(job,job); chain=p.catch(()=>{});
 return p;
}};
})(window);