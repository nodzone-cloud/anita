(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};

  function safeUrl(url){
    try{
      const u = new URL(url, location.href);
      return u.protocol === "https:" && C.siteHostAllowlist.includes(u.hostname) ? u.href : null;
    }catch(_){ return null; }
  }

  W.actions = {
    navigate(url, pending){
      const safe = safeUrl(url);
      if(!safe) return false;
      if(pending) sessionStorage.setItem("anita_pending_action", JSON.stringify(pending));
      location.href = safe;
      return true;
    },
    scrollTo(target){ W.ui.highlight(target); },
    showPose(pose){ W.ui.setPose(pose || "ready"); },
    showMessage(text){ W.ui.showBubble(text,{autoHide:false}); },
    run(action){
      if(!action || !action.type) return false;
      if(action.type === "navigate_to") return this.navigate(action.url, action.pending);
      if(action.type === "scroll_to"){ this.scrollTo(action.target); return true; }
      if(action.type === "highlight"){ W.ui.highlight(action.target); return true; }
      if(action.type === "show_pose"){ this.showPose(action.pose); return true; }
      if(action.type === "show_message"){ this.showMessage(action.text); return true; }
      return false;
    }
  };

  const pending = sessionStorage.getItem("anita_pending_action");
  if(pending){
    sessionStorage.removeItem("anita_pending_action");
    try{
      const p = JSON.parse(pending);
      setTimeout(()=>{
        if(p.target) W.ui.highlight(p.target);
        if(p.pose) W.ui.setPose(p.pose);
        if(p.text) W.ui.showBubble(p.text,{autoHide:false});
      },500);
    }catch(_){}
  }
})();