/* ANITA 0.1.8 — greeting priority guard */
(function(W){
"use strict";
if(!W||!W.roles||!W.state)return;

const original=W.roles.route.bind(W.roles);

function detectLanguage(text,c){
  const s=String(text||"");
  if(/[А-Яа-яЁё]/.test(s))return "ru";
  if(/[äöåÄÖÅ]/.test(s))return "fi";
  return (c&&c.language)||"en";
}

function greetingText(l){
  if(l==="ru")return "Привет 😊 Чем могу помочь?";
  if(l==="fi")return "Hei 😊 Miten voin auttaa?";
  return "Hi 😊 How can I help you today?";
}

W.roles.route=function(text){
  const c=W.state.context();
  const x=String(text||"").trim().toLowerCase().replace(/[.!?,;:]+$/g,"").trim();

  // Greeting must always be treated as a greeting, even when an old
  // website-consultation state is still stored in localStorage.
  if(/^(?:hi|hello|hey|hiya|привет|здравствуй|здравствуйте|hei|moi|moikka)$/.test(x)){
    const l=detectLanguage(text,c);
    return {
      kind:"answer",
      role:c.role||"guide",
      language:l,
      topic:c.topic,
      pending:c.pending,
      pendingAction:c.pendingAction,
      brief:c.websiteBrief||{},
      memory:c.clientMemory||{},
      pose:"neutral",
      text:greetingText(l)
    };
  }

  return original(text);
};
})(window.ANITA50=window.ANITA50||{});
