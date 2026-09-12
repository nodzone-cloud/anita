
(function(){
/* Alex Node WebBook reader v9 — COMPLETE RU/EN + v8 reader fixes */
const cfg=window.AN_BOOK_CONFIG||{},root=document.getElementById("an-book-app");if(!root)return;
const base=(cfg.baseUrl||"").replace(/\/+$/,"");
const languages=cfg.languages||{
  ru:{
    label:"RU",
    textUrl:base?base+"/book-ru.txt":"book-ru.txt",
    background:cfg.background||cfg.frontCover||"",
    frontCover:cfg.frontCover||"",
    backCover:cfg.backCover||""
  }
};
let currentLang=(cfg.defaultLanguage&&languages[cfg.defaultLanguage])?cfg.defaultLanguage:(languages.ru?"ru":Object.keys(languages)[0]);
root.innerHTML=`<div class="an-book-bg"></div><div class="an-book-overlay"></div><header class="an-book-header"><div class="an-brand"><div class="an-brand-logo">AN</div><div class="an-brand-line"></div><div><div class="an-brand-name">ALEX NODE</div><div class="an-brand-sub">WEBSITES. DESIGN. IT SUPPORT.</div></div></div><div class="an-header-tools"><div class="an-languages"></div><div class="an-header-actions"><button data-act="contents" data-i18n="contents">Содержание</button><button data-act="fullscreen" data-i18n="fullscreen">На весь экран</button></div></div></header><main class="an-reader-shell"><button type="button" class="an-nav an-nav-left" data-act="prev">‹</button><div class="an-stage"><section class="an-state an-cover-state active" data-state="front"><div class="an-cover-wrap"><img data-img="front"><div class="an-cover-shine"></div></div><button type="button" class="an-main-button" data-act="next"><span data-i18n="open">Открыть книгу</span> →</button></section><section class="an-state" data-state="book"><div class="an-open-book"><div class="an-page an-page-left"><div class="an-page-inner" data-page="left"></div><div class="an-page-number" data-num="left"></div></div><div class="an-book-spine"></div><div class="an-page an-page-right"><div class="an-page-inner" data-page="right"></div><div class="an-page-number" data-num="right"></div></div></div></section><section class="an-state an-cover-state" data-state="back"><div class="an-cover-wrap"><img data-img="back"><div class="an-cover-shine"></div></div><button type="button" class="an-main-button secondary" data-act="prev">← <span data-i18n="back">Вернуться к книге</span></button></section></div><button type="button" class="an-nav an-nav-right" data-act="next">›</button></main><div class="an-bottom-ui"><button class="an-bottom-action" data-act="contents"><span>☷</span> <span data-i18n="contents">Содержание</span></button><div class="an-page-counter">Обложка</div><div class="an-bottom-right"><button class="an-zoom" data-act="zoomout">−</button><button class="an-zoom" data-act="zoomin">+</button><button data-act="fullscreen">⛶</button></div></div><div class="an-contents-panel"><div class="an-contents-card"><button class="an-close" data-act="closecontents">×</button><h2 data-i18n="contents">Содержание</h2><div class="an-contents-list"></div></div></div>`;
const bgEl=root.querySelector(".an-book-bg"),frontImg=root.querySelector('[data-img="front"]'),backImg=root.querySelector('[data-img="back"]'),langBox=root.querySelector(".an-languages");
const I18N={
 ru:{contents:"Содержание",fullscreen:"На весь экран",open:"Открыть книгу",back:"Вернуться к книге",cover:"Обложка",end:"Конец",loadError:"Не удалось загрузить книгу."},
 en:{contents:"Contents",fullscreen:"Full screen",open:"Open book",back:"Back to book",cover:"Cover",end:"The End",loadError:"Could not load the book."},
 fi:{contents:"Sisältö",fullscreen:"Koko näyttö",open:"Avaa kirja",back:"Takaisin kirjaan",cover:"Kansi",end:"Loppu",loadError:"Kirjaa ei voitu ladata."}
};
function langCfg(){return languages[currentLang]||languages.ru||Object.values(languages)[0]}
function applyVisualLanguage(){
 const lc=langCfg()||{};
 bgEl.style.backgroundImage=`url("${lc.background||""}")`;
 frontImg.src=lc.frontCover||"";
 backImg.src=lc.backCover||"";
 document.documentElement.lang=currentLang;
 root.querySelectorAll("[data-i18n]").forEach(el=>{
   const k=el.dataset.i18n;
   if(I18N[currentLang]?.[k])el.textContent=I18N[currentLang][k]
 });
 root.querySelectorAll(".an-lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===currentLang));
}
function buildLanguageButtons(){
 langBox.innerHTML="";
 Object.entries(languages).forEach(([code,lc])=>{
   const b=document.createElement("button");
   b.type="button";
   b.className="an-lang-btn";
   b.dataset.lang=code;
   b.textContent=lc.label||code.toUpperCase();
   if(!lc.textUrl){
     b.disabled=true;
     b.title=lc.unavailableLabel||"Book text not available yet";
   }
   langBox.appendChild(b)
 });
}
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
   if(line==="Alex Node & ANITA"||line==="История, которая пишется сейчас"||line==="A Story Being Written Right Now"||line==="The Story Being Written Right Now")continue;
   if(/^Глава\s+\d+\./i.test(line)||/^Chapter\s+\d+\./i.test(line)||line==="Другая дорога"||line==="Another Road"){flush();a.push({type:"chapter",text:line});continue}
   buf.push(line)
 }flush();return a
}
function blockHTML(b){
 if(b.type==="chapter"){
   const m=b.text.match(/^((?:Глава|Chapter)\s+\d+)\.\s*(.*)$/i);
   return m?`<div class="an-chapter-label">${esc(m[1])}</div><h1>${esc(m[2])}</h1>`:`<h1>${esc(b.text)}</h1>`
 }
 return `<p>${fmtInline(b.text)}</p>`
}
function getPageRect(){
 const bookState=root.querySelector('[data-state="book"]');
 const wasActive=bookState.classList.contains("active");
 const old={
   display:bookState.style.display,
   position:bookState.style.position,
   visibility:bookState.style.visibility,
   pointerEvents:bookState.style.pointerEvents
 };
 if(!wasActive){
   bookState.style.display="flex";
   bookState.style.position="absolute";
   bookState.style.visibility="hidden";
   bookState.style.pointerEvents="none";
 }
 const page=root.querySelector(".an-page-left");
 let rect=page.getBoundingClientRect();
 if((!rect.width||!rect.height) && bookEl){
   const br=bookEl.getBoundingClientRect();
   const mobile=innerWidth<=760;
   rect={width:mobile?br.width:(br.width-12)/2,height:br.height};
 }
 if(!wasActive){
   bookState.style.display=old.display;
   bookState.style.position=old.position;
   bookState.style.visibility=old.visibility;
   bookState.style.pointerEvents=old.pointerEvents;
 }
 return rect
}
function makeTester(){
 const t=document.createElement("div");
 t.className="an-page an-page-tester";
 root.appendChild(t);
 const rect=getPageRect();
 t.style.width=Math.max(1,rect.width)+"px";
 t.style.height=Math.max(1,rect.height)+"px";
 t.innerHTML='<div class="an-page-inner" style="height:100%"></div>';
 return t
}
function fits(inner,h){
 inner.innerHTML=h;
 return inner.scrollHeight<=inner.clientHeight+1
}
function splitPara(text,inner,prefix){
 const words=text.split(/\s+/).filter(Boolean);let fit="",rest=[];
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
 pages=pages.filter(p=>String(p||"").replace(/<[^>]+>/g," ").trim().length>0);
 t.remove();
}
function show(n){states.forEach(x=>x.classList.toggle("active",x.dataset.state===n))}
function render(){
 const m=innerWidth<=760;
 if(mode==="front"){show("front");counter.textContent=I18N[currentLang]?.cover||"Cover";return}
 if(mode==="back"){show("back");counter.textContent=I18N[currentLang]?.end||"The End";return}
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
root.addEventListener("click",e=>{
 const lb=e.target.closest(".an-lang-btn");
 if(lb && !lb.disabled){switchLanguage(lb.dataset.lang);return}
 const b=e.target.closest("[data-act]");if(!b)return;
 const a=b.dataset.act;
 if(a==="next")next();
 if(a==="prev")prev();
 if(a==="contents")panel.classList.add("show");
 if(a==="closecontents")panel.classList.remove("show");
 if(a==="fullscreen")full();
 if(a==="zoomin"){zoom=Math.min(1.08,zoom+.04);bookEl.style.transform=`scale(${zoom})`}
 if(a==="zoomout"){zoom=Math.max(.92,zoom-.04);bookEl.style.transform=`scale(${zoom})`}
});
document.addEventListener("keydown",e=>{if(innerWidth<=760)return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()});
root.addEventListener("wheel",e=>{
 if(innerWidth<=760)return;
 if(Math.abs(e.deltaX)>Math.abs(e.deltaY) && Math.abs(e.deltaX)>8)e.preventDefault();
},{passive:false});

root.addEventListener("touchstart",e=>{
 if(innerWidth>760||!e.touches.length)return;
 if(e.target.closest("button,.an-contents-card"))return;
 tx=e.touches[0].clientX;
 ty=e.touches[0].clientY
},{passive:true});
root.addEventListener("touchend",e=>{
 if(innerWidth>760||!e.changedTouches.length)return;
 if(e.target.closest("button,.an-contents-card"))return;
 const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
 if(Math.abs(dx)<48||Math.abs(dx)<=Math.abs(dy)*1.15)return;
 dx<0?next():prev()
},{passive:true});
let rt,lastMobile=innerWidth<=760;
addEventListener("resize",()=>{
 clearTimeout(rt);
 rt=setTimeout(async()=>{
   const oldLen=Math.max(1,pages.length);
   const progress=Math.min(1,current/oldLen);
   if(document.fonts?.ready)await document.fonts.ready;
   build();
   const mobile=innerWidth<=760;
   current=Math.min(Math.max(0,Math.round(progress*Math.max(0,pages.length-1))),Math.max(0,pages.length-1));
   if(!mobile && current%2===1)current=Math.max(0,current-1);
   lastMobile=mobile;
   buildContents();
   render()
 },180)
});
async function loadLanguageText(reset=true){
 const lc=langCfg()||{};
 if(!lc.textUrl)throw new Error("No book text configured for "+currentLang);
 const r=await fetch(lc.textUrl,{cache:"no-store"});
 if(!r.ok)throw new Error("Book text HTTP "+r.status+" for "+currentLang);
 source=(await r.text()).trim();
 if(document.fonts?.ready)await document.fonts.ready;
 build();
 if(reset){mode="front";current=0}
 else current=Math.min(current,Math.max(0,pages.length-1));
 buildContents();
 render()
}
async function switchLanguage(code){
 if(!languages[code]||!languages[code].textUrl||code===currentLang)return;
 currentLang=code;
 applyVisualLanguage();
 try{await loadLanguageText(true)}
 catch(err){console.error(err)}
}
buildLanguageButtons();
applyVisualLanguage();
loadLanguageText(true).catch(err=>{
 console.error(err);
 root.innerHTML='<div style="padding:40px;color:white">'+(I18N[currentLang]?.loadError||"Could not load the book.")+'</div>'
});
})();
