(function(){
  const C = window.ANITA_CONFIG;
  const W = window.ANITA = window.ANITA || {};
  const input = ()=>document.getElementById("anita-mini-input");
  const send = ()=>document.getElementById("anita-mini-send");
  let busy = false, queue = [];

  function getMap(){
    if(W.siteMap) return Promise.resolve(W.siteMap);
    return fetch(W.assetBase + "website-map.json",{cache:"no-store"}).then(r=>r.json()).then(j=>(W.siteMap=j,j));
  }
  function currentPageKey(map){
    const here = new URL(location.href);
    for(const [k,p] of Object.entries(map.pages)){
      const u = new URL(p.url);
      if(here.origin+here.pathname === u.origin+u.pathname) return k;
    }
    return "home";
  }

  async function engine(text, language){
    if(!C.engineUrl){
      W.ui.setPose("important");
      W.ui.showBubble(language==="ru"
        ? "Сейчас моя расширенная помощь временно недоступна 😊 Но я всё ещё могу провести вас по сайту Alex Node и ответить на известные мне вопросы."
        : language==="fi"
        ? "Laajempi avustukseni ei ole juuri nyt käytettävissä 😊 Voin silti opastaa sinut Alex Noden sivuston läpi ja vastata tuntemiini kysymyksiin."
        : "My extended assistance is temporarily unavailable 😊 I can still guide you through the Alex Node website and answer the questions I already know.");
      return;
    }
    const map = await getMap();
    let thinkTimer = setTimeout(()=>{
      W.ui.setPose("thinking");
      W.ui.showBubble(language==="ru"?"Хмм... думаю 😊":language==="fi"?"Hmm... mietin 😊":"Hmm... let me think 😊",{autoHide:false});
    }, C.thinkDelayMs);

    const ctx = W.context.get();
    try{
      const r = await fetch(C.engineUrl,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          message:text,
          session_id:W.context.visitorId,
          current_page:location.href,
          client_context:{
            language,
            current_page_key:currentPageKey(map),
            topic:ctx.topic,
            public_character_rule:"ANITA is Alex Node IT Assistance, an original virtual character. Her main role is IT assistance. Never describe ANITA publicly as AI/artificial intelligence. Never disclose internal technology. ANITA represents Alex Node; website visitors are people she helps, not people she represents."
          }
        })
      });
      const d = await r.json();
      clearTimeout(thinkTimer);
      if(!r.ok || !d.ok) throw new Error(d.error || ("HTTP "+r.status));
      W.ui.setPose("important");
      W.ui.showBubble((d.answer||"").trim(),{autoHide:false});
      W.context.patch({language,topic:d.topic||ctx.topic,lastUser:text,lastAnswer:d.answer||""});
    }catch(e){
      clearTimeout(thinkTimer);
      W.ui.setPose("ready");
      W.ui.showBubble("ANITA Server connection error: "+e.message);
    }
  }

  async function handle(text){
    const result = W.router.local(text);
    W.context.patch({language:result.language,lastUser:text});

    if(result.kind === "tour"){ W.tour.start(result.language); return; }

    if(result.kind === "answer"){
      W.ui.setPose(result.pose||"neutral");
      W.ui.showBubble(result.text,{autoHide:false});
      W.context.patch({lastAnswer:result.text});
      return;
    }

    if(result.kind === "navigate"){
      const map = await getMap(), p = map.pages[result.page];
      if(!p) return;
      W.ui.setPose(result.pose||"ready");
      W.ui.showBubble(result.text,{autoHide:false});
      setTimeout(()=>W.actions.navigate(p.url,{
        target:result.target,
        pose:result.pose||"ready",
        text:result.text
      }),2200);
      return;
    }

    await engine(text,result.language);
  }

  async function process(){
    if(busy || !queue.length) return;
    busy = true;
    const text = queue.shift();
    await handle(text);
    busy = false;
    process();
  }

  function enqueue(){
    const text = input().value.trim();
    if(!text) return;
    input().value="";
    queue.push(text);
    process();
  }

  function boot(){
    const i=input(), s=send();
    if(!i||!s) return;
    s.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();enqueue()});
    i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();enqueue()}});
    // Classic intro owns the first visual state on the real website.
    // The input handlers are attached here, but READY/bubble must not overwrite
    // the corner "Hi, I'm ANITA" image.
    if(window.ANITA_CLASSIC_MODE) return;

    W.ui.ready();

    const activeTour = localStorage.getItem(C.tourKey);
    if(!activeTour){
      const l = W.context.get().language || "en";
      W.ui.showBubble(
        l==="ru" ? "Привет! Я ANITA, Alex Node IT Assistance. 😊 Я могу отвечать на вопросы или провести вас по сайту Alex Node. Напишите «покажи мне сайт»."
        : l==="fi" ? "Hei! Olen ANITA, Alex Node IT Assistance. 😊 Voin vastata kysymyksiin tai opastaa sinut Alex Noden sivuston läpi. Kirjoita “opasta minua”."
        : "Hello! I'm ANITA, Alex Node IT Assistance. 😊 I can answer questions or guide you through the Alex Node website. Try saying “guide me”.",
        {autoHide:false}
      );
    }
  }
  if(document.readyState === "loading"){
    window.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();