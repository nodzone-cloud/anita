/* ANITA 0.3.2 — CENTRAL ROUTER SIZE ANSWER EXTENSION
 * Extends the single v031 router; does not add a second decision layer.
 * Purpose: natural answers such as "separate pages" must be accepted as the
 * answer to the pending website-size question instead of being treated as an
 * unrelated/unclear comment.
 */
(function(W){
"use strict";
if(!W||!W.router031||!W.state||W.__routerSize032)return;
W.__routerSize032=true;

const R=W.router031;
const oldClassify=R.classify.bind(R);
const oldSizeAnswer=R.sizeAnswer.bind(R);

function naturalSizeAnswer(text){
  const s=R.norm(text);
  return oldSizeAnswer(text)
    || /^(?:separate pages?|multiple pages?|several pages?|few pages?|a few pages?|some pages?|more than one page|more pages?)$/i.test(s)
    || /^(?:2|3|4|5)\s*pages?$/i.test(s)
    || /^(?:отдельные страницы|несколько страниц|пару страниц|2|3|4|5)\s*(?:страниц[ыа]?)?$/i.test(s)
    || /^(?:erilliset sivut|erillisiä sivuja|muutama sivu|useita sivuja|2|3|4|5)\s*(?:sivua|sivut)?$/i.test(s);
}

R.sizeAnswer=naturalSizeAnswer;
R.classify=function(text){
  const c=W.state.context();
  if(c&&c.topic==="website_consultation"&&c.pending==="size"&&naturalSizeAnswer(text)){
    return{intent:"brief_answer",language:R.lang(text,c)};
  }
  return oldClassify(text);
};

window.__ANITA_V032__={naturalSizeAnswers:true,singleRouterExtended:true};
})(window.ANITA50=window.ANITA50||{});
