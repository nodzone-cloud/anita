(function(){
if(window.__ANITA_0162_LOADING__)return;window.__ANITA_0162_LOADING__=true;
const B="https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/anita50/";
const scripts=["config-v0162.js","state-v0162.js","roles-v0162.js","ai-bridge-v0162.js","core-v0162.js"];
function load(i){
 if(i>=scripts.length){
   // Reuse the established AN50 UI when present; otherwise load existing UI/core integration.
   if(window.ANITA50_UI&&window.ANITA50_UI.bindCore){window.ANITA50_UI.bindCore(window.ANITA50_CORE);}
   window.dispatchEvent(new CustomEvent("anita50:core-ready",{detail:{version:"0.1.6.2"}}));
   return;
 }
 const s=document.createElement("script");s.src=B+scripts[i]+"?v=0162";s.async=false;s.onload=()=>load(i+1);document.head.appendChild(s);
}
load(0);
})();