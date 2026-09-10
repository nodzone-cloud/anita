(function(){
"use strict";

if(window.__ANITA50_BOOTSTRAPPED_0165G__) return;
window.__ANITA50_BOOTSTRAPPED_0165G__=true;

const BASE="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const VERSION="0165g";

const files=[
  "config-v0165g.js",
  "state-v0165g.js",
  "ui.js",
  "actions.js",
  "roles-v0165g.js",
  "ai-bridge-v0165g.js",
  "semantic-v0165g.js",
  "semantic-adapter-v0165g.js",
  "tour.js",
  "core-v0165g.js"
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

async function boot(){
  try{
    for(const file of files){
      await loadScript(BASE+file+"?v="+VERSION);
    }

    window.__ANITA_BOOT_FILES_0165G__=files.slice();
    window.__ANITA_SEMANTIC_READY__={
      semantic:!!window.ANITA50?.semantic,
      semanticAdapter:!!window.ANITA50?.semanticAdapter,
      ai:!!window.ANITA50?.ai,
      state:!!window.ANITA50?.state
    };
  }catch(err){
    console.error("[ANITA 0.1.6.5g bootstrap]",err);
    window.__ANITA_BOOT_ERROR_0165G__=String(err&&err.message||err);
  }
}

boot();
})();