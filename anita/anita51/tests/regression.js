/* Run after ANITA51 core files are loaded. Throws on regression. */
(function(root){"use strict";const A=root.ANITA51;
function assert(ok,msg){if(!ok)throw new Error("ANITA51 regression: "+msg)}
async function run(){
A.State.resetAll();
let r=await A.Interpreter.handle("I need a website");assert(r.pending&&r.pending.id==="business","website request must ask business");
r=await A.Interpreter.handle("book shop");
const s=A.State.get();
assert(s.brief.confirmed.business==="book shop","book shop must be confirmed as business");
assert(s.brief.confirmed.goal===null,"book shop must not invent goal/booking");
assert(!s.brief.confirmed.requirements.includes("online store"),"book shop must not invent online store");
assert(s.brief.confirmed.size===null,"book shop must not invent size");
assert(r.pending&&r.pending.id==="goal","after business ANITA must ask visitor goal");
return true}
A.Tests={run};
})(window);