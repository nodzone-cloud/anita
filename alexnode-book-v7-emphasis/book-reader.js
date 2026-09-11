
(function(){
const cfg=window.AN_BOOK_CONFIG||{},root=document.getElementById("an-book-app");if(!root)return;
const base=(cfg.baseUrl||"").replace(/\/+$/,""),textUrl=cfg.textUrl||(base?base+"/book-ru.txt":"book-ru.txt");
root.innerHTML=`<div class="an-book-bg"></div><div class="an-book-overlay"></div><header class="an-book-header"><div class="an-brand"><div class="an-brand-logo">AN</div><div class="an-brand-line"></div><div><div class="an-brand-name">ALEX NODE</div><div class="an-brand-sub">WEBSITES. DESIGN. IT SUPPORT.</div></div></div><div class="an-header-actions"><button data-act="contents">Содержание</button><button data-act="fullscreen">На весь экран</button></div></header><main class="an-reader-shell"><button class="an-nav an-nav-left" data-act="prev">‹</button><div class="an-stage"><section class="an-state an-cover-state active" data-state="front"><div class="an-cover-wrap"><img data-img="front"><div class="an-cover-shine"></div></div><button class="an-main-button" data-act="next">Открыть книгу →</button></section><section class="an-state" data-state="book"><div class="an-open-book"><div class="an-page an-page-left"><div class="an-page-inner" data-page="left"></div><div class="an-page-number" data-num="left"></div></div><div class="an-book-spine"></div><div class="an-page an-page-right"><div class="an-page-inner" data-page="right"></div><div class="an-page-number" data-num="right"></div></div></div></section><section class="an-state an-cover-state" data-state="back"><div class="an-cover-wrap"><img data-img="back"><div class="an-cover-shine"></div></div><button class="an-main-button secondary" data-act="prev">← Вернуться к книге</button></section></div><button class="an-nav an-nav-right" data-act="next">›</button></main><div class="an-bottom-ui"><button class="an-bottom-action" data-act="contents"><span>☷</span> Содержание</button><div class="an-page-counter">Обложка</div><div class="an-bottom-right"><button class="an-zoom" data-act="zoomout">−</button><button class="an-zoom" data-act="zoomin">+</button><button data-act="fullscreen">⛶</button></div></div><div class="an-contents-panel"><div class="an-contents-card"><button class="an-close" data-act="closecontents">×</button><h2>Содержание</h2><div class="an-contents-list"></div></div></div>`;
root.querySelector(".an-book-bg").style.backgroundImage=`url("${cfg.background||cfg.frontCover||""}")`;root.querySelector('[data-img="front"]').src=cfg.frontCover||"";root.querySelector('[data-img="back"]').src=cfg.backCover||"";
let source="",pages=[],current=0,mode="front",zoom=1,tx=0,ty=0;
const states=[...root.querySelectorAll(".an-state")],L=root.querySelector('[data-page="left"]'),R=root.querySelector('[data-page="right"]'),LN=root.querySelector('[data-num="left"]'),RN=root.querySelector('[data-num="right"]'),counter=root.querySelector(".an-page-counter"),panel=root.querySelector(".an-contents-panel"),list=root.querySelector(".an-contents-list"),bookEl=root.querySelector(".an-open-book");
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function fmtInline(s){
  let out=esc(s);

  /* Quoted speech / thoughts */
  out=out.replace(/«([^»]+)»/g,'<span class="an-spoken">«$1»</span>');
  out=out.replace(/&quot;([^&]+?)&quot;/g,'<span class="an-spoken">&quot;$1&quot;</span>');

  /* Thought/question after a colon: emphasize only the phrase after ":" */
  out=out.replace(
    /((?:вопрос|мысль|идея|подумал|подумала|сказал|сказала|говорю|спросил|спросила|возникает вопрос|появляется вопрос|пришла мысль)[^:]{0,120}:)\s*([^<]+?[?!])(?=\s|$|<)/gi,
    '$1 <span class="an-spoken">$2</span>'
  );

  return out;
}

function parse(text){
 const ls=text.replace(/^\uFEFF/,"").split(/\n/).map(x=>x.trim()),a=[];let buf=[];
 const flush=()=>{if(buf.length){a.push({type:"p",text:buf.join(" ")});buf=[]}};
 for(const line of ls){
   if(!line){flush();continue}
   if(line==="Alex Node & ANITA"||line==="История, которая пишется сейчас")continue;
   if(/^Глава\s+\d+\./i.test(line)||line==="Другая дорога"){flush();a.push({type:"chapter",text:line});continue}
   buf.push(line)
 }flush();return a
}
function blockHTML(b){
 if(b.type==="chapter"){
   const m=b.text.match(/^(Глава\s+\d+)\.\s*(.*)$/);
   return m?`<div class="an-chapter-label">${esc(m[1])}</div><h1>${esc(m[2])}</h1>`:`<h1>${esc(b.text)}</h1>`
 }
 return `<p>${fmtInline(b.text)}</p>`
}
function makeTester(){
 const t=document.createElement("div");
 t.className="an-page an-page-tester";
 // Critical fix: tester lives INSIDE #an-book-app, so scoped CSS and media queries apply.
 root.appendChild(t);
 const visiblePage = root.querySelector(".an-page-left");
 const rect = visiblePage.getBoundingClientRect();
 t.style.width = rect.width + "px";
 t.style.height = rect.height + "px";
 t.innerHTML='<div class="an-page-inner" style="height:100%"></div>';
 return t
}
function fits(inner,h){inner.innerHTML=h;return inner.scrollHeight<=inner.clientHeight}
function splitPara(text,inner,prefix){
 const words=text.split(/\s+/);let fit="",rest=[];
 for(let x=0;x<words.length;x++){
   const cand=fit?fit+" "+words[x]:words[x];
   if(fits(inner,prefix+`<p>${fmtInline(cand)}</p>`))fit=cand;
   else{rest=words.slice(x);break}
 }
 return{fit,rest:rest.join(" ")}
}
function build(){
 const blocks=parse(source),t=makeTester(),inner=t.firstElementChild;pages=[];let h="";
 for(const b of blocks){
   if(b.type==="chapter"){
     if(h.trim()){pages.push(h);h=""}
     h=blockHTML(b);continue;
   }
   let rem=b.text;
   while(rem){
     const whole=`<p>${fmtInline(rem)}</p>`;
     if(fits(inner,h+whole)){h+=whole;rem="";break}
     const sp=splitPara(rem,inner,h);
     if(sp.fit){
       h+=`<p>${fmtInline(sp.fit)}</p>`;
       pages.push(h);h="";rem=sp.rest;
     }else{
       if(h){pages.push(h);h="";continue}
       const w=rem.split(/\s+/);h=`<p>${fmtInline(w.shift())}</p>`;rem=w.join(" ");
     }
   }
 }
 if(h.trim())pages.push(h);
 t.remove();
}
function show(n){states.forEach(x=>x.classList.toggle("active",x.dataset.state===n))}
function render(){
 const m=innerWidth<=760;
 if(mode==="front"){show("front");counter.textContent="Обложка";return}
 if(mode==="back"){show("back");counter.textContent="Конец";return}
 show("book");
 if(m){
   L.innerHTML=pages[current]||"";LN.textContent=current+1;R.innerHTML="";RN.textContent="";
   counter.textContent=`${current+1} / ${pages.length}`
 }else{
   const l=current,r=current+1;L.innerHTML=pages[l]||"";R.innerHTML=pages[r]||"";
   LN.textContent=pages[l]?l+1:"";RN.textContent=pages[r]?r+1:"";
   counter.textContent=`${l+1}–${Math.min(r+1,pages.length)} / ${pages.length}`
 }
}
function next(){const m=innerWidth<=760,s=m?1:2;if(mode==="front"){mode="book";current=0;render();return}if(mode==="back")return;if(current+s>=pages.length){mode="back";render();return}current+=s;render()}
function prev(){const m=innerWidth<=760,s=m?1:2;if(mode==="front")return;if(mode==="back"){mode="book";current=m?Math.max(0,pages.length-1):Math.max(0,pages.length-(pages.length%2===0?2:1));render();return}if(current===0){mode="front";render();return}current=Math.max(0,current-s);render()}
function buildContents(){list.innerHTML="";parse(source).filter(b=>b.type==="chapter").forEach(ch=>{const b=document.createElement("button");b.className="an-content-link";b.textContent=ch.text;b.onclick=()=>{panel.classList.remove("show");for(let i=0;i<pages.length;i++){if(pages[i].replace(/<[^>]+>/g," ").includes(ch.text)){mode="book";current=innerWidth>760?(i%2===0?i:i-1):i;render();break}}};list.appendChild(b)})}
function full(){if(!document.fullscreenElement)root.requestFullscreen?.();else document.exitFullscreen?.()}
root.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;if(a==="next")next();if(a==="prev")prev();if(a==="contents")panel.classList.add("show");if(a==="closecontents")panel.classList.remove("show");if(a==="fullscreen")full();if(a==="zoomin"){zoom=Math.min(1.08,zoom+.04);bookEl.style.transform=`scale(${zoom})`}if(a==="zoomout"){zoom=Math.max(.92,zoom-.04);bookEl.style.transform=`scale(${zoom})`}});
document.addEventListener("keydown",e=>{if(innerWidth<=760)return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()});
root.addEventListener("touchstart",e=>{if(innerWidth>760)return;tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
root.addEventListener("touchend",e=>{if(innerWidth>760)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<50||Math.abs(dx)<Math.abs(dy))return;dx<0?next():prev()},{passive:true});
let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(async()=>{if(document.fonts?.ready)await document.fonts.ready;build();current=Math.min(current,Math.max(0,pages.length-1));buildContents();render()},180)});
fetch(textUrl,{cache:"no-store"}).then(r=>r.text()).then(async t=>{source=t.trim();if(document.fonts?.ready)await document.fonts.ready;mode="book";render();build();mode="front";buildContents();render()}).catch(err=>{console.error(err);root.innerHTML='<div style="padding:40px;color:white">Не удалось загрузить книгу.</div>'});
})();
