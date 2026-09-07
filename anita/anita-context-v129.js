(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};

  function load(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch(_){ return fallback; }
  }
  function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

  let visitor = localStorage.getItem(C.visitorKey);
  if(!visitor){
    visitor = "anita-" + (crypto.randomUUID ? crypto.randomUUID() : Date.now()+"-"+Math.random().toString(16).slice(2));
    localStorage.setItem(C.visitorKey, visitor);
  }

  W.context = {
    visitorId: visitor,
    get(){ return load(C.contextKey,{language:null,topic:null,lastUser:null,lastAnswer:null}); },
    patch(p){ const n = Object.assign({},this.get(),p); save(C.contextKey,n); return n; },
    clear(){ localStorage.removeItem(C.contextKey); }
  };
})();