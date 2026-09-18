(function(root){"use strict";
const A=root.ANITA51=root.ANITA51||{};
function emptyBrief(){return{confirmed:{business:null,goal:null,size:null,requirements:[]},inferred:{suggestions:[],recommendedPackage:null},rejected:{suggestions:[]}}}
function empty(){return{turnId:0,language:"en",sector:"human",topic:null,pending:null,brief:emptyBrief(),phase:"idle",lastUser:null,lastReply:null}}
let s=empty();
A.State={get:()=>s,update(p){s=Object.assign({},s,p||{});if(p&&p.brief)s.brief=Object.assign({},s.brief,p.brief);return s},nextTurn(){s.turnId++;return s.turnId},setPending(q){s.pending=q;return s},clearPending(){s.pending=null;return s},resetBrief(){s.brief=emptyBrief();s.phase="brief";s.sector="secretary";s.topic="website";s.pending=null;return s},resetAll(){s=empty();return s},emptyBrief};
})(window);