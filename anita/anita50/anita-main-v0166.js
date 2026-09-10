(function(){
"use strict";
if(window.__ANITA50_BOOTSTRAPPED_0166__) return;
window.__ANITA50_BOOTSTRAPPED_0166__=true;
const BASE="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const VERSION="0166";
const files=[
  "config-v0166.js","state-v0166.js","ui.js","actions.js","roles-v0166.js",
  "ai-bridge-v0166.js","semantic-v0166.js","semantic-adapter-v0166.js",
  "tour.js","core-v0166.js"
];
function loadScript(src){
  return new Promise((resolve,reject)=>{
    const s=document.createElement("script");
    s.src=src;s.async=false;
    s.onload=()=>resolve(src);
    s.onerror=()=>reject(new Error("Failed to load "+src));
    document.head.appendChild(s);
  });
}
(async function(){
  try{
    for(const file of files) await loadScript(BASE+file+"?v="+VERSION);
    window.__ANITA_BOOT_FILES_0166__=files.slice();
    window.__ANITA_SEMANTIC_READY__={
      semantic:!!window.ANITA50?.semantic,
      semanticAdapter:!!window.ANITA50?.semanticAdapter,
      ai:!!window.ANITA50?.ai,
      state:!!window.ANITA50?.state
    };
  }catch(err){
    console.error("[ANITA 0.1.6.6 bootstrap]",err);
    window.__ANITA_BOOT_ERROR_0166__=String(err&&err.message||err);
  }
})();
})();