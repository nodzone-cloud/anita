(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};
  let answerTimer = null;
  let poseIdleTimer = null;

  function el(id){ return document.getElementById(id); }
  function widget(){ return el("anita-widget"); }
  function image(){ return el("anita-image"); }
  function bubble(){ return el("anita-live-bubble"); }

  W.ui = {
    setPose(name){
      const src = C.urls[name] || C.urls.ready;
      image().src = src;
      clearTimeout(poseIdleTimer);
      if(name !== "ready" && name !== "thinking"){
        poseIdleTimer = setTimeout(()=>W.ui.setPose("ready"), C.idleReadyMs);
      }
    },

    setBubbleSide(side){
      const b = bubble();
      b.classList.remove("tail-left","tail-right");
      if(side === "right"){
        b.style.left = "58%";
        b.style.right = "auto";
        b.classList.add("tail-left");
      }else{
        b.style.right = "58%";
        b.style.left = "auto";
        b.classList.add("tail-right");
      }
      b.style.top = "20%";
    },

    showBubble(text, opts={}){
      const b = bubble();
      clearTimeout(answerTimer);
      b.textContent = text;
      b.classList.remove("bubble-medium","bubble-large");
      if(text.length > 320) b.classList.add("bubble-large");
      else if(text.length > 180) b.classList.add("bubble-medium");
      W.ui.setBubbleSide(opts.side || "left");
      b.classList.add("show");
      if(opts.autoHide !== false){
        const read = Math.min(C.bubbleMaxReadMs, Math.max(C.bubbleMinReadMs, C.bubbleMinReadMs + Math.max(0,text.length-90)*22));
        answerTimer = setTimeout(()=>b.classList.remove("show"), read);
      }
    },

    showTourBubble(text, isLast){
      const b = bubble();
      clearTimeout(answerTimer);
      b.innerHTML = "";
      const d = document.createElement("div");
      d.textContent = text;
      b.appendChild(d);
      const controls = document.createElement("div");
      controls.className = "anita-tour-controls";
      const next = document.createElement("button");
      next.type = "button";
      next.className = "anita-tour-btn";
      next.textContent = isLast ? "Finish ✓" : "Next ➜";
      next.onclick = ()=> isLast ? W.tour.finish() : W.tour.next();
      const stop = document.createElement("button");
      stop.type = "button";
      stop.className = "anita-tour-btn secondary";
      stop.textContent = "Stop tour";
      stop.onclick = ()=>W.tour.stop();
      controls.append(next,stop);
      b.appendChild(controls);
      b.classList.remove("bubble-medium","bubble-large");
      if(text.length > 180) b.classList.add("bubble-medium");
      W.ui.setBubbleSide("left");
      b.classList.add("show");
    },

    highlight(target){
      if(!target) return;
      const node = document.getElementById(target) || document.querySelector(`[data-anita-section="${CSS.escape(target)}"]`);
      if(!node) return;
      node.scrollIntoView({behavior:"smooth",block:"center"});
      node.classList.add("anita-highlight");
      setTimeout(()=>node.classList.remove("anita-highlight"),6000);
    },

    ready(){
      W.ui.setPose("ready");
    }
  };
})();