/* ANITA 51 — bind clean core to existing ANITA visual shell */
(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
let bound=false;
function show(text){const ui=root.ANITA50&&root.ANITA50.ui;if(ui&&typeof ui.bubbleText==="function")ui.bubbleText(text);else{const b=document.getElementById("an50-bubble");if(b){b.textContent=text;b.classList.add("show")}}}
function render(result){if(!result)return;let text=result.text;if(text==="BRIEF_READY"){const c=A.State.get().brief.confirmed;text="Great 😊 Here’s what I have:\n• Business / project: "+(c.business||"—")+"\n• Website goal: "+(c.goal||"—")+"\n• Size: "+(c.size||"—")+"\n\nDoes this brief look correct?"}show(text||"")}
function bind(){if(bound)return;const input=document.getElementById("an50-input"),btn=document.getElementById("an50-send");if(!input||!btn){setTimeout(bind,100);return}bound=true;
async function send(){const text=String(input.value||"").trim();if(!text)return;input.value="";try{render(await A.Interpreter.handle(text))}catch(e){console.error("[ANITA 51 UI]",e);show("ANITA 51 test error: "+(e&&e.message||e))}}
btn.addEventListener("click",send);input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();send()}});
console.log("[ANITA 51] UI bound")}
A.UIBind={bind,render};
})(window);