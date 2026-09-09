(function(W){
const KEY="an50_context", VID="an50_visitor_id";
function fresh(){
 return {role:"guide",topic:null,topicClosed:false,pendingAction:null,
 clientMemory:{name:null,business:null,businessRaw:null},
 websiteBrief:{business:null,goals:[],features:[],size:null,package:null,structure:[],needsReview:false},
 lastIntent:null};
}
function load(){
 let c=fresh();
 try{c=Object.assign(c,JSON.parse(localStorage.getItem(KEY)||"{}"));}catch(e){}
 c.clientMemory=Object.assign(fresh().clientMemory,c.clientMemory||{});
 c.websiteBrief=Object.assign(fresh().websiteBrief,c.websiteBrief||{});
 if(!Array.isArray(c.websiteBrief.goals))c.websiteBrief.goals=[];
 if(!Array.isArray(c.websiteBrief.features))c.websiteBrief.features=[];
 if(!Array.isArray(c.websiteBrief.structure))c.websiteBrief.structure=[];
 return c;
}
function save(c){localStorage.setItem(KEY,JSON.stringify(c));}
let visitorId=localStorage.getItem(VID);
if(!visitorId){visitorId="an-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10);localStorage.setItem(VID,visitorId);}
W.ANITA50_STATE={visitorId,context:load(),save:function(){save(this.context);},reset:function(){this.context=fresh();save(this.context);}};
})(window);