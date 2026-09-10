(function(){
if(window.__ANITA50_BOOTSTRAPPED_0165F__) return;window.__ANITA50_BOOTSTRAPPED_0165F__=true;
const B="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const css=u=>{const l=document.createElement("link");l.rel="stylesheet";l.href=u;document.head.appendChild(l)};
const js=u=>new Promise((ok,no)=>{const s=document.createElement("script");s.src=u;s.async=false;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
function mount(){if(document.getElementById("an50-root"))return;const r=document.createElement("div");r.id="an50-root";r.innerHTML=`<img id="an50-img" alt="ANITA"><div id="an50-bubble"></div><div id="an50-chat"><input id="an50-input" placeholder="Ask ANITA..." autocomplete="off"><button id="an50-send">➜</button></div>`;document.body.appendChild(r)}
(async()=>{css(B+"anita50.css?v=0165f");mount();for(const f of ["config-v0165f.js","state-v0165f.js","ui.js","actions.js","roles-v0165f.js","ai-bridge-v0165f.js","semantic-v0165f.js","semantic-adapter-v0165f.js","tour.js","core-v0165f.js"])await js(B+f+"?v=0165f")})().catch(e=>console.error("ANITA50 boot failed",e));
})();

;try{
  window.__ANITA_SEMANTIC_READY__={
    semantic:!!window.ANITA50?.semantic,
    semanticAdapter:!!window.ANITA50?.semanticAdapter,
    ai:!!window.ANITA50?.ai,
    state:!!window.ANITA50?.state
  };
}catch(e){}
