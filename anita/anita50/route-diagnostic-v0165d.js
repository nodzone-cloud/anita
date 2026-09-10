(function(W){
"use strict";
if(!W||!W.state)return;
function detectLanguage(text){
  const s=String(text||"");
  if(/[А-Яа-яЁё]/.test(s))return "ru";
  if(/[äöåÄÖÅ]/.test(s))return "fi";
  return "en";
}
function looksLikeNaturalWebsiteRequest(text){
  const x=String(text||"").toLowerCase();
  const online=/\b(somewhere online|online presence|online where|business online|website|web site|webpage|site)\b/.test(x);
  const biz=/\b(business|service|shop|salon|garage|studio|company|clinic|restaurant|cafe|store)\b/.test(x);
  const action=/\b(customers?|clients?|people).{0,120}\b(book|appointment|arrange a time|see what i do|see your services|see our services|contact|buy|order)\b/.test(x)
    || /\b(book|appointment|arrange a time).{0,120}\b(customers?|clients?|people)\b/.test(x);
  return (online&&biz)||(biz&&action)||(online&&action);
}
W.routeDiag={
  last:null,
  detectLanguage,
  classify:function(text){
    const c=W.state.context?W.state.context():{};
    const r={
      input:String(text||""),
      language:detectLanguage(text),
      matchedNaturalWebsite:looksLikeNaturalWebsiteRequest(text),
      stateRole:c.role||null,stateTopic:c.topic||null,statePending:c.pending||null
    };
    this.last=r;
    try{window.__ANITA_ROUTE_DIAG__=r;}catch(e){}
    return r;
  },
  shouldForceSemantic:function(text){return !!this.classify(text).matchedNaturalWebsite;}
};
})(window);