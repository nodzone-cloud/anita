(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};

  function loadMap(){
    if(W.siteMap) return Promise.resolve(W.siteMap);
    return fetch(W.assetBase + "website-map.json", {cache:"no-store"})
      .then(r=>r.json()).then(j=>(W.siteMap=j,j));
  }
  function state(){
    try{return JSON.parse(localStorage.getItem(C.tourKey)||"null")}catch(_){return null}
  }
  function save(s){localStorage.setItem(C.tourKey,JSON.stringify(s))}
  function clear(){localStorage.removeItem(C.tourKey)}
  function currentLanguage(){return (W.context.get().language || "en");}
  function localized(t,l){return (t && (t[l] || t.en)) || "";}

  W.tour = {
    async start(language){
      const map = await loadMap();
      save({active:true,step:0,language:language||"en"});
      W.context.patch({language:language||"en",topic:"website_tour"});
      this.resume();
    },
    async resume(){
      const map = await loadMap(), s = state();
      if(!s || !s.active) return false;
      const step = map.tour[s.step];
      if(!step){ clear(); return false; }
      const page = map.pages[step.page];
      const here = new URL(location.href);
      const there = new URL(page.url);
      if(here.origin+here.pathname !== there.origin+there.pathname){
        W.actions.navigate(page.url,{tourResume:true});
        return true;
      }
      W.ui.setPose(step.pose||"ready");
      if(step.target){
        setTimeout(()=>W.ui.highlight(step.target),450);
      }else{
        try{ window.scrollTo({top:0,behavior:"smooth"}); }catch(_){ window.scrollTo(0,0); }
      }
      W.ui.showTourBubble(localized(step.text,s.language||"en"), s.step === map.tour.length-1);
      return true;
    },
    async next(){
      const map = await loadMap(), s = state();
      if(!s || !s.active) return;
      s.step += 1;
      if(s.step >= map.tour.length){ this.finish(); return; }
      save(s);
      this.resume();
    },
    stop(){
      clear();
      W.context.patch({topic:null});
      W.ui.ready();
      W.ui.showBubble("Tour stopped 😊 You can keep asking me questions normally.");
    },
    finish(){
      clear();
      W.context.patch({topic:null});
      W.ui.setPose("success");
      W.ui.showBubble("Tour finished 😊 You can keep talking to me normally.");
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