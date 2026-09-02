/* ANITA v24.0 - Memory Module (structured pending question, backward compatible) */
(function(){
"use strict";
const state = {
  version:"24.0",
  language:"en",
  currentIssue:null,
  currentCategory:null,
  currentObject:null,
  lastQuestion:null,
  expected:null,
  pendingQuestion:null,
  facts:{},
  history:[],
  lastMatch:null
};
function push(role,text,meta){
  state.history.push({role,text:String(text||""),meta:meta||null,time:Date.now()});
  if(state.history.length>60) state.history.shift();
}
function resetConversation(){
  state.currentIssue=null; state.currentCategory=null; state.currentObject=null;
  state.lastQuestion=null; state.expected=null; state.pendingQuestion=null; state.facts={}; state.lastMatch=null;
  state.history=[];
}
window.ANITA_MEMORY = {
  state,
  push,
  setQuestion(q,expected,meta){
    state.lastQuestion=q||null; state.expected=expected||null;
    state.pendingQuestion=q?{id:q,expected:expected||null,topic:meta?.topic||state.currentIssue||state.currentCategory||null,step:meta?.step||null,askedAt:Date.now(),resolved:false,answer:null}:null;
  },
  setIssue(category,issue,obj){
    state.currentCategory=category||state.currentCategory;
    state.currentIssue=issue||state.currentIssue;
    if(obj) state.currentObject=obj;
  },
  fact(k,v){ state.facts[k]=v; },
  resetConversation,
  snapshot(){ return JSON.parse(JSON.stringify(state)); }
};
console.log("[ANITA v24.0] Memory module loaded");
})();