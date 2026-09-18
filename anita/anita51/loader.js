/* ANITA 51 clean experimental loader */
(function(){"use strict";if(window.__ANITA51_LOADER__)return;window.__ANITA51_LOADER__=true;
const BASE="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita51/";
const files=["engine/state.js","engine/questions.js","engine/intent-router.js","sectors/human.js","sectors/guide.js","sectors/secretary.js","engine/ai-layer.js","engine/interpreter.js"];
function load(src){return new Promise((ok,bad)=>{const s=document.createElement("script");s.src=src+"?v=20260918-1";s.async=false;s.onload=ok;s.onerror=()=>bad(new Error("Failed "+src));document.head.appendChild(s)})}
(async()=>{for(const f of files)await load(BASE+f);window.__ANITA51_READY__=true;console.log("[ANITA 51] Human-Tech core ready");})().catch(e=>console.error("[ANITA 51 loader]",e));
})();