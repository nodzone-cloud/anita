(function(){
const C=ANITA50_CONFIG,W=window.ANITA50=window.ANITA50||{};

const load=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch(_){return f}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

const fresh=()=>({
  language:null,
  role:"guide",
  topic:null,
  pending:null,
  pendingAction:null,
  lastUser:null,
  websiteBrief:{},
  clientMemory:{
    name:null,
    business:null,
    businessRaw:null
  }
});

function normalized(){
  const c=load(C.contextKey,fresh())||fresh();
  c.websiteBrief=c.websiteBrief||{};
  c.clientMemory=Object.assign(
    {name:null,business:null,businessRaw:null},
    c.clientMemory||{}
  );
  if(c.pendingAction===undefined)c.pendingAction=null;
  return c;
}

let v=localStorage.getItem(C.visitorKey);
if(!v){
  v="an50-"+(crypto.randomUUID?crypto.randomUUID():Date.now());
  localStorage.setItem(C.visitorKey,v);
}

W.state={
  visitorId:v,
  context(){return normalized()},
  patch(p){
    const current=this.context();
    const n=Object.assign({},current,p||{});
    if(p&&p.clientMemory){
      n.clientMemory=Object.assign({},current.clientMemory,p.clientMemory);
    }
    if(p&&p.websiteBrief){
      n.websiteBrief=Object.assign({},current.websiteBrief,p.websiteBrief);
    }
    save(C.contextKey,n);
    return n;
  },
  remember(p){
    const c=this.context();
    return this.patch({clientMemory:Object.assign({},c.clientMemory,p||{})});
  },
  tour(){return load(C.tourKey,null)},
  saveTour(x){save(C.tourKey,x)},
  clearTour(){localStorage.removeItem(C.tourKey)}
};
})();
