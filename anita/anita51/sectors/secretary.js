(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
function reply(text,pending){return{text,pending,sector:"secretary"}}
function next(){const s=A.State.get(),c=s.brief.confirmed;let id=!c.business?"business":!c.goal?"goal":!c.size?"size":null;if(!id)return reply("BRIEF_READY",A.Questions.get("confirm"));const q=A.Questions.get(id);A.State.setPending(q);return reply(A.Questions.prompt(q,s.language),q)}
function start(){A.State.resetBrief();return next()}
function answer(text){const s=A.State.get(),q=s.pending;if(!q)return next();const value=String(text||"").trim();if(!value)return reply(A.Questions.prompt(q,s.language),q);
const c=Object.assign({},s.brief.confirmed);
// Critical rule: targeted answers confirm only the field that was asked.
if(q.id==="business")c.business=value;
else if(q.id==="goal")c.goal=value;
else if(q.id==="size")c.size=value;
else if(q.id==="requirements")c.requirements=[value];
A.State.update({brief:Object.assign({},s.brief,{confirmed:c}),sector:"secretary",topic:"website",phase:"brief"});A.State.clearPending();return next()}
A.Secretary={start,answer,next};
})(window);