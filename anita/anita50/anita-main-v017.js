(function(){
"use strict";

/*
 * ANITA 0.1.7 — CLEAN MILESTONE BUILD
 *
 * Baseline:
 *   - Safe CSS + DOM bootstrap/mount from working v0165m
 *   - Roles preserved from v0165m
 *   - Delegated controls from v0166b core
 *   - Semantic confirmed_requirements / inferred_suggestions from v0166b
 *   - State/config/AI bridge carried forward without architectural changes
 *
 * This file is separate from v0165m and does not modify the working baseline.
 */

if(window.__ANITA50_BOOTSTRAPPED_017__) return;
window.__ANITA50_BOOTSTRAPPED_017__ = true;

const BASE = "https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const VERSION = "017";

const files = [
  "config-v017.js",
  "state-v017.js",
  "ui.js",
  "actions.js",
  "roles-v017.js",
  "ai-bridge-v017.js",
  "semantic-v017.js",
  "semantic-adapter-v017.js",
  "tour.js",
  "core-v017.js"
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

function mount(){
  if(document.getElementById("an50-root")) return;

  const r = document.createElement("div");
  r.id = "an50-root";
  r.innerHTML = `
    <img id="an50-img" alt="ANITA">
    <div id="an50-bubble"></div>
    <div id="an50-chat">
      <input id="an50-input" placeholder="Ask ANITA..." autocomplete="off">
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

    loadCSS(BASE + "anita50.css?v=" + VERSION);
    mount();

    if(!document.getElementById("an50-root")){
      throw new Error("ANITA mount failed: #an50-root was not created");
    }

    for(const file of files){
      await loadScript(BASE + file + "?v=" + VERSION);
    }

    window.__ANITA_BOOT_FILES_017__ = files.slice();
    window.__ANITA_SEMANTIC_READY__ = {
      semantic: !!window.ANITA50?.semantic,
      semanticAdapter: !!window.ANITA50?.semanticAdapter,
      ai: !!window.ANITA50?.ai,
      state: !!window.ANITA50?.state
    };

    window.__ANITA_MOUNT_READY_017__ = {
      root: !!document.querySelector("#an50-root"),
      send: !!document.querySelector("#an50-send"),
      input: !!document.querySelector("#an50-input"),
      semantic: !!window.ANITA50?.semantic
    };

    console.log("[ANITA 0.1.7 CLEAN MILESTONE]", window.__ANITA_MOUNT_READY_017__);
  }catch(err){
    console.error("[ANITA 0.1.7 bootstrap]", err);
    window.__ANITA_BOOT_ERROR_017__ = String(err && err.message || err);
  }
}

boot();
})();