(function(){
"use strict";
if(window.__ANITA50_BOOTSTRAPPED_0166B__) return;
window.__ANITA50_BOOTSTRAPPED_0166B__=true;
const BASE="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const VERSION="0166b";
const files=[
  "config-v0166b.js","state-v0166b.js","ui.js","actions.js","roles-v0166b.js",
  "ai-bridge-v0166b.js","semantic-v0166b.js","semantic-adapter-v0166b.js",
  "tour.js","core-v0166b.js"
];
function loadScript(src){
  return new Promise((resolve,reject)=>{
    const s=document.createElement("script");
    s.src=src;
    s.async=false;
    s.onload=()=>resolve(src);
    s.onerror=()=>reject(new Error("Failed to load "+src));
    document.head.appendChild(s);
  });
}
(async function(){
  try{
    for(const file of files) await loadScript(BASE+file+"?v="+VERSION);
    window.__ANITA_BOOT_FILES_0166B__=files.slice();
    window.__ANITA_SEMANTIC_READY__={
      semantic:!!window.ANITA50?.semantic,
      semanticAdapter:!!window.ANITA50?.semanticAdapter,
      ai:!!window.ANITA50?.ai,
      state:!!window.ANITA50?.state
    };
  }catch(err){
    console.error("[ANITA 0.1.6.6b bootstrap]",err);
    window.__ANITA_BOOT_ERROR_0166B__=String(err&&err.message||err);
  }
})();
})();