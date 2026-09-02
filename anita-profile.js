/* ANITA v23.0 — OPTIONAL PC PROFILE / CONFIRMATION STATE
   Technical profile data is kept only in this page memory.
   No localStorage, cookies or network transmission are performed here.
*/
(function(){
"use strict";

const state={
  version:"23.0",
  pending:null,
  confirmed:null,
  confirmedAt:null
};

function clone(v){
  try{return JSON.parse(JSON.stringify(v||{}));}catch(_){return{};}
}
function meaningful(v){
  if(v===null||v===undefined||v==="") return false;
  if(Array.isArray(v)) return v.some(meaningful);
  if(typeof v==="object") return Object.values(v).some(meaningful);
  return true;
}
function setPending(data){
  state.pending=clone(data);
  window.dispatchEvent(new CustomEvent("anita:profile-pending",{detail:{hasProfile:meaningful(state.pending)}}));
  return clone(state.pending);
}
function confirm(){
  if(!meaningful(state.pending)) return null;
  state.confirmed=clone(state.pending);
  state.pending=null;
  state.confirmedAt=Date.now();
  window.dispatchEvent(new CustomEvent("anita:profile-confirmed",{detail:{hasProfile:true}}));
  applyToIncident();
  return get();
}
function cancelPending(){
  state.pending=null;
  window.dispatchEvent(new CustomEvent("anita:profile-pending-cancelled"));
}
function clear(){
  state.pending=null;
  state.confirmed=null;
  state.confirmedAt=null;
  window.dispatchEvent(new CustomEvent("anita:profile-cleared"));
}
function get(){return clone(state.confirmed);}
function getPending(){return clone(state.pending);}
function connectionFor(type){
  const d=state.confirmed||{};
  if(type==="mouse") return d.mouse?.connection || d.mouseConnection || null;
  if(type==="keyboard") return d.keyboard?.connection || d.keyboardConnection || null;
  return d[type+"Connection"]||null;
}
function applyToIncident(){
  try{
    const E=window.ANITA_ENTITIES;
    if(!E?.state?.entities || !state.confirmed) return;
    E.state.entities.forEach(function(e){
      if(!e.connection){
        const c=connectionFor(e.type);
        if(c) e.connection=c;
      }
    });
  }catch(_){}
}
function summaryData(){return get();}

window.addEventListener("anita:profile-confirmed",applyToIncident);

const api={
  version:"23.0",state,setPending,confirm,cancelPending,clear,get,getPending,
  connectionFor,applyToIncident,summaryData
};
window.ANITA_PC_PROFILE=api;
window.ANITA_PROFILE=api;
console.log("[ANITA v23.0] Optional PC Profile loaded");
})();