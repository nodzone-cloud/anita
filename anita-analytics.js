/* ANITA v23.0 — privacy-aware usage events.
   No technical PC values are sent by this module. Configure endpoint to receive aggregate events.
*/
(function(){"use strict";
const CONFIG={endpoint:""}; // Alex Node can later set a first-party HTTPS endpoint.
const session={started:false,profileUsed:false,messages:0};
function emit(event){const payload={event,ts:new Date().toISOString(),page:location.pathname};try{if(CONFIG.endpoint&&/^https:\/\//i.test(CONFIG.endpoint)){navigator.sendBeacon?.(CONFIG.endpoint,new Blob([JSON.stringify(payload)],{type:"application/json"}))}}catch(_){}}
const form=document.getElementById("form");if(form)form.addEventListener("submit",()=>{session.messages++;if(!session.started){session.started=true;emit("chat_started")}});
window.addEventListener("anita:profile-confirmed",e=>{if(e.detail?.hasProfile&&!session.profileUsed){session.profileUsed=true;emit("pc_profile_used")}});
window.ANITA_USAGE={version:"23.0",session,emit,config:CONFIG};
})();
