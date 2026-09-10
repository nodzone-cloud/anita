(function(){
"use strict";

/*
 * ANITA 0.1.6.5i — ROUTING + CONTEXT FIX
 * Based on anita-main-v0165g.js.
 *
 * Purpose of this patch:
 *   1. Load ANITA CSS.
 *   2. Restore the ANITA DOM mount BEFORE ui/core are loaded.
 *   3. Keep the v0165g module set unchanged.
 *
 * Semantic / Semantic Adapter / Secretary-related logic is NOT modified here.
 */

if(window.__ANITA50_BOOTSTRAPPED_0165M__) return;
window.__ANITA50_BOOTSTRAPPED_0165M__ = true;

const BASE = "https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const VERSION = "0165m";

/*
 * IMPORTANT:
 * These are the same application modules used by v0165g.
 * 5i is only a bootstrap/mount repair.
 */
const files = [
  "config-v0165g.js",
  "state-v0165g.js",
  "ui.js",
  "actions.js",
  "roles-v0165m.js",
  "ai-bridge-v0165g.js",
  "semantic-v0165m.js",
  "semantic-adapter-v0165m.js",
  "tour.js",
  "core-v0165g.js"
];

function loadCSS(src){
  if(document.querySelector('link[data-anita50-css="1"]')) return;

  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = src;
  l.dataset.anita50Css = "1";
  document.head.appendChild(l);
}

function loadScript(src){
  return new Promise((resolve,reject)=>{
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = ()=>resolve(src);
    s.onerror = ()=>reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

/*
 * Restored from the original ANITA bootstrap.
 * UI code expects these nodes to exist before W.ui.ready(),
 * mode(), pose(), and core initialization run.
 */
function mount(){
  if(document.getElementById("an50-root")) return;

  const r = document.createElement("div");
  r.id = "an50-root";

  r.innerHTML = `
    <img id="an50-img" alt="ANITA">

    <div id="an50-bubble"></div>

    <div id="an50-chat">
      <input
        id="an50-input"
        placeholder="Ask ANITA..."
        autocomplete="off"
      >
      <button id="an50-send">➜</button>
    </div>
  `;

  document.body.appendChild(r);
}

function waitForBody(){
  if(document.body) return Promise.resolve();

  return new Promise(resolve=>{
    document.addEventListener("DOMContentLoaded", resolve, {once:true});
  });
}

async function boot(){
  try{
    await waitForBody();

    // 1. CSS first.
    loadCSS(BASE + "anita50.css?v=" + VERSION);

    // 2. DOM must exist before ui.js/core.
    mount();

    // Fail early if mount did not succeed.
    if(!document.getElementById("an50-root")){
      throw new Error("ANITA mount failed: #an50-root was not created");
    }

    // 3. Now load the exact v0165g module chain.
    for(const file of files){
      await loadScript(BASE + file + "?v=" + VERSION);
    }

    window.__ANITA_BOOT_FILES_0165M__ = files.slice();

    window.__ANITA_SEMANTIC_READY__ = {
      semantic: !!window.ANITA50?.semantic,
      semanticAdapter: !!window.ANITA50?.semanticAdapter,
      ai: !!window.ANITA50?.ai,
      state: !!window.ANITA50?.state
    };

    window.__ANITA_MOUNT_READY_0165M__ = {
      root: !!document.querySelector("#an50-root"),
      send: !!document.querySelector("#an50-send"),
      input: !!document.querySelector("#an50-input"),
      semantic: !!window.ANITA50?.semantic
    };

    console.log(
      "[ANITA 0.1.6.5i ROUTING + CONTEXT FIX]",
      window.__ANITA_MOUNT_READY_0165M__
    );

  }catch(err){
    console.error("[ANITA 0.1.6.5i bootstrap]", err);
    window.__ANITA_BOOT_ERROR_0165M__ =
      String(err && err.message || err);
  }
}

boot();

})();