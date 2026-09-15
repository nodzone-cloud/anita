(function(){
"use strict";
/* ANITA 0.3.3 — SMART BRIEF FINALIZER */
if(window.__ANITA50_BOOTSTRAPPED_033__)return;
window.__ANITA50_BOOTSTRAPPED_033__=true;

const BASE="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@11c467a4cd72fc500194a4c0845b814eac545ce5/anita/anita50/";
const VERSION="033";
const files=[
  "config-v017a.js",
  "state-v017.js",
  "ui.js",
  "actions.js",
  "roles-v017a.js",
  "ai-bridge-v017.js",
  "semantic-v018.js",
  "semantic-adapter-v018.js",
  "tour.js",
  "router-v033.js",
  "core-v033.js"
];
function loadCSS(src){if(document.querySelector('link[data-anita50-css="1"]'))return;const l=document.createElement("link");l.rel="stylesheet";l.href=src;l.dataset.anita50Css="1";document.head.appendChild(l);}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement("script");s.src=src;s.async=false;s.onload=()=>resolve(src);s.onerror=()=>reject(new Error("Failed to load "+src));document.head.appendChild(s);});}
function mount(){if(document.getElementById("an50-root"))return;const r=document.createElement("div");r.id="an50-root";r.innerHTML=`<img id="an50-img" alt="ANITA"><div id="an50-bubble"></div><div id="an50-chat"><input id="an50-input" placeholder="Ask ANITA..." autocomplete="off"><button id="an50-send">➜</button></div>`;document.body.appendChild(r);}
function waitForBody(){if(document.body)return Promise.resolve();return new Promise(resolve=>document.addEventListener("DOMContentLoaded",resolve,{once:true}));}
async function boot(){
  try{
    await waitForBody();
    loadCSS(BASE+"anita50.css?v="+VERSION);
    mount();
    if(!document.getElementById("an50-root"))throw new Error("ANITA mount failed: #an50-root was not created");
    for(const file of files)await loadScript(BASE+file+"?v="+VERSION);
    window.__ANITA_BOOT_FILES_033__=files.slice();
    window.__ANITA_READY_033__={
      singleRouter:!!window.ANITA50?.router033,
      core:!!window.ANITA50?.__core033,
      smartBriefFinalizer:!!window.__ANITA_V033__?.smartBriefFinalizer,
      commerceClarification:!!window.__ANITA_V033__?.commerceClarification,
      semantic:!!window.ANITA50?.semantic,
      ai:!!window.ANITA50?.ai,
      state:!!window.ANITA50?.state
    };
    console.log("[ANITA 0.3.3 SMART BRIEF FINALIZER]",window.__ANITA_READY_033__);
  }catch(err){
    console.error("[ANITA 0.3.3 bootstrap]",err);
    window.__ANITA_BOOT_ERROR_033__=String(err&&err.message||err);
  }
}
boot();
})();