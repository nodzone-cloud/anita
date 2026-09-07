(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};
  const NAV_KEY = "anita_tour_pending_navigation";

  function loadMap(){
    if(W.siteMap) return Promise.resolve(W.siteMap);
    return fetch(W.assetBase + "website-map.json", {cache:"no-store"})
      .then(r=>r.json()).then(j=>(W.siteMap=j,j));
  }
  function state(){
    try{return JSON.parse(localStorage.getItem(C.tourKey)||"null")}catch(_){return null}
  }
  function save(s){localStorage.setItem(C.tourKey,JSON.stringify(s))}
  function clear(){
    localStorage.removeItem(C.tourKey);
    sessionStorage.removeItem(NAV_KEY);
  }
  function localized(t,l){return (t && (t[l] || t.en)) || "";}
  function pageKey(url){
    const u = new URL(url, location.href);
    return u.origin + u.pathname.replace(/\/+$/,"");
  }
  function markPending(url, step){
    sessionStorage.setItem(NAV_KEY, JSON.stringify({
      url: pageKey(url),
      step: step,
      at: Date.now()
    }));
  }
  function consumePendingForCurrentPage(step){
    try{
      const p = JSON.parse(sessionStorage.getItem(NAV_KEY)||"null");
      if(!p) return false;
      const fresh = Date.now() - Number(p.at||0) < 30000;
      const match = p.url === pageKey(location.href) && Number(p.step) === Number(step);
      sessionStorage.removeItem(NAV_KEY);
      return fresh && match;
    }catch(_){
      sessionStorage.removeItem(NAV_KEY);
      return false;
    }
  }
  function showStep(map,s){
    const step = map.tour[s.step];
    if(!step) return false;
    W.ui.setPose(step.pose||"ready");
    if(step.target){
      setTimeout(()=>W.ui.highlight(step.target),450);
    }else{
      try{ window.scrollTo({top:0,behavior:"smooth"}); }catch(_){ window.scrollTo(0,0); }
    }
    W.ui.showTourBubble(localized(step.text,s.language||"en"), s.step === map.tour.length-1);
    return true;
  }

  W.tour = {
    async start(language){
      const map = await loadMap();
      const s = {active:true,step:0,language:language||"en"};
      save(s);
      W.context.patch({language:language||"en",topic:"website_tour"});
      if(window.ANITA_CLASSIC && typeof window.ANITA_CLASSIC.enterTourMode === "function"){
        window.ANITA_CLASSIC.enterTourMode();
      }
      const page = map.pages[map.tour[0].page];
      if(page && pageKey(location.href) !== pageKey(page.url)){
        markPending(page.url,0);
        W.actions.navigate(page.url,{tourResume:true});
        return true;
      }
      showStep(map,s);
      return true;
    },

    async resume(){
      const map = await loadMap(), s = state();
      if(!s || !s.active) return false;
      const step = map.tour[s.step];
      if(!step){ clear(); return false; }
      const page = map.pages[step.page];
      if(!page) return false;

      /* Critical v1.1.1 rule:
         NEVER redirect merely because an active tour exists.
         Only continue automatically when this page was reached by ANITA's Next/start navigation. */
      if(pageKey(location.href) !== pageKey(page.url)) return false;
      if(!consumePendingForCurrentPage(s.step)) return false;

      if(window.ANITA_CLASSIC && typeof window.ANITA_CLASSIC.enterTourMode === "function"){
        window.ANITA_CLASSIC.enterTourMode();
      }
      showStep(map,s);
      return true;
    },

    async next(){
      const map = await loadMap(), s = state();
      if(!s || !s.active) return;
      s.step += 1;
      if(s.step >= map.tour.length){ this.finish(); return; }
      save(s);

      const step = map.tour[s.step];
      const page = map.pages[step.page];
      if(!page) return;

      if(pageKey(location.href) !== pageKey(page.url)){
        markPending(page.url,s.step);
        W.actions.navigate(page.url,{tourResume:true});
      }else{
        showStep(map,s);
      }
    },

    stop(){
      clear();
      W.context.patch({topic:null});
      W.ui.ready();
      W.ui.showBubble("Tour stopped 😊 You can keep asking me questions normally.");
      if(window.ANITA_CLASSIC && typeof window.ANITA_CLASSIC.showChat === "function"){
        window.ANITA_CLASSIC.showChat();
      }
    },

    finish(){
      clear();
      W.context.patch({topic:null});
      W.ui.setPose("success");
      W.ui.showBubble("Tour finished 😊 You can keep talking to me normally.");
      if(window.ANITA_CLASSIC && typeof window.ANITA_CLASSIC.showChat === "function"){
        window.ANITA_CLASSIC.showChat();
      }
    }
  };

  function resumeAfterLoad(){
    setTimeout(()=>W.tour.resume(),600);
  }
  if(document.readyState === "loading"){
    window.addEventListener("DOMContentLoaded",resumeAfterLoad,{once:true});
  }else{
    resumeAfterLoad();
  }
})();