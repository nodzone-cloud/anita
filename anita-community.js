/* ANITA v26.0 — PUBLIC COMMUNITY COUNTER + ONE-TAP HEART LIKE
   Requires a shared backend endpoint. Configure:
   window.ANITA_COMMUNITY_ENDPOINT = "https://YOUR-WORKER.workers.dev";
*/
(function(){
"use strict";

const root=document.getElementById("anitaDemoRoot");
if(!root) return;

const BASE="https://nodzone-cloud.github.io/anita/";
const HEART=BASE+"anita-like.png?v=26.0";
const ENDPOINT=String(window.ANITA_COMMUNITY_ENDPOINT||"").replace(/\/+$/,"");
const VISIT_KEY="anita_global_visit_v1";
const LIKE_KEY="anita_global_like_v1";

function lang(){
  const active=root.querySelector(".langBtn.active");
  const l=active?.dataset?.lang;
  if(l==="ru"||l==="fi"||l==="en") return l;
  try{
    const x=window.ANITA_MEMORY?.state?.language;
    if(x==="ru"||x==="fi"||x==="en") return x;
  }catch(_){}
  const b=(navigator.language||"en").toLowerCase();
  if(b.startsWith("ru")) return "ru";
  if(b.startsWith("fi")) return "fi";
  return "en";
}

const copy={
  en:{community:"ANITA COMMUNITY",users:"people used ANITA",likes:"liked ANITA",like:"Like ANITA",thanks:"Thank you!"},
  ru:{community:"СООБЩЕСТВО ANITA",users:"человек использовали ANITA",likes:"понравилась ANITA",like:"Нравится ANITA",thanks:"Спасибо!"},
  fi:{community:"ANITA-YHTEISÖ",users:"käyttänyt ANITAa",likes:"tykkäsi ANITAsta",like:"Tykkää ANITAsta",thanks:"Kiitos!"}
};

function fmt(n){
  const x=Math.max(0,Number(n)||0);
  try{return new Intl.NumberFormat(lang()==="fi"?"fi-FI":lang()==="ru"?"ru-RU":"en-US").format(x);}
  catch(_){return String(x);}
}

function css(){
  if(document.getElementById("anitaCommunityStyle")) return;
  const s=document.createElement("style");
  s.id="anitaCommunityStyle";
  s.textContent=`
    #anitaDemoRoot .anitaCommunitySide,
    #anitaDemoRoot .anitaCommunityBar{
      font-family:Arial,Helvetica,sans-serif;color:#111
    }
    #anitaDemoRoot .anitaCommunitySide{
      display:none;align-self:center;position:sticky;top:18px
    }
    #anitaDemoRoot .anitaCommunityCard{
      background:#fff;border:1px solid #ddd;border-radius:18px;padding:14px 12px;
      box-shadow:0 12px 34px rgba(0,0,0,.08);text-align:center
    }
    #anitaDemoRoot .anitaCommunityTitle{
      font-size:10px;font-weight:900;letter-spacing:.08em;color:#666;margin-bottom:10px
    }
    #anitaDemoRoot .anitaCommunityNumber{font-size:22px;font-weight:900;line-height:1}
    #anitaDemoRoot .anitaCommunityLabel{font-size:10px;color:#777;line-height:1.25;margin-top:5px}
    #anitaDemoRoot .anitaCommunitySep{height:1px;background:#ececec;margin:12px 0}
    #anitaDemoRoot .anitaHeartButton{
      width:54px;height:54px;border:0;border-radius:50%;padding:0;background:#fff;cursor:pointer;
      transition:transform .2s ease,box-shadow .2s ease;position:relative
    }
    #anitaDemoRoot .anitaHeartButton:hover{transform:scale(1.05)}
    #anitaDemoRoot .anitaHeartButton:active{transform:scale(.94)}
    #anitaDemoRoot .anitaHeartButton img{width:100%;height:100%;object-fit:contain;display:block}
    #anitaDemoRoot .anitaHeartButton.liked{box-shadow:0 0 0 4px rgba(255,106,120,.16)}
    #anitaDemoRoot .anitaHeartThanks{font-size:10px;font-weight:800;color:#e64f73;min-height:13px;margin-top:5px}
    #anitaDemoRoot .anitaCommunityBar{
      display:flex;align-items:center;gap:11px;margin-top:11px;padding:7px 9px;border:1px solid #e6e6e6;
      border-radius:12px;background:#fafafa;font-size:11px;color:#555
    }
    #anitaDemoRoot .anitaCommunityBar strong{color:#111}
    #anitaDemoRoot .anitaCommunityBar .anitaMiniLike{
      margin-left:auto;border:0;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;gap:4px
    }
    #anitaDemoRoot .anitaCommunityBar .anitaMiniLike img{width:25px;height:25px;object-fit:contain}
    #anitaDemoRoot .anitaCommunityBar .anitaMiniLike.liked{opacity:.72}
    @media(min-width:1600px){
      #anitaDemoRoot .anitaLayout{
        width:min(1770px,100%);
        grid-template-columns:140px minmax(620px,1.18fr) minmax(390px,.82fr) 140px
      }
      #anitaDemoRoot .anitaCommunitySide{display:block}
      #anitaDemoRoot .anitaCommunityBar{display:none}
    }
    @media(max-width:820px){
      #anitaDemoRoot .anitaCommunityBar{font-size:10px;gap:8px}
    }
  `;
  document.head.appendChild(s);
}

function cardHTML(kind){
  const d=copy[lang()]||copy.en;
  if(kind==="users"){
    return `<div class="anitaCommunityCard"><div class="anitaCommunityTitle">${d.community}</div>
      <div class="anitaCommunityNumber" data-anita-users>—</div>
      <div class="anitaCommunityLabel" data-anita-users-label>${d.users}</div></div>`;
  }
  return `<div class="anitaCommunityCard"><div class="anitaCommunityTitle">${d.community}</div>
    <button class="anitaHeartButton" type="button" data-anita-like-button aria-label="${d.like}">
      <img src="${HEART}" alt=""></button>
    <div class="anitaCommunityNumber" data-anita-likes>—</div>
    <div class="anitaCommunityLabel" data-anita-likes-label>${d.likes}</div>
    <div class="anitaHeartThanks" data-anita-thanks></div></div>`;
}

function inject(){
  css();
  const layout=root.querySelector(".anitaLayout");
  const app=root.querySelector(".app");
  const portrait=root.querySelector(".anitaPortrait");
  if(!layout||!app||!portrait) return;

  if(!layout.querySelector(".anitaCommunitySide.left")){
    const left=document.createElement("aside");
    left.className="anitaCommunitySide left";
    left.innerHTML=cardHTML("users");
    layout.insertBefore(left,app);
  }
  if(!layout.querySelector(".anitaCommunitySide.right")){
    const right=document.createElement("aside");
    right.className="anitaCommunitySide right";
    right.innerHTML=cardHTML("likes");
    layout.appendChild(right);
  }

  const header=app.querySelector("header");
  if(header&&!header.querySelector(".anitaCommunityBar")){
    const bar=document.createElement("div");
    bar.className="anitaCommunityBar";
    bar.innerHTML=`<span>👤 <strong data-anita-users>—</strong></span>
      <span data-anita-users-label>${(copy[lang()]||copy.en).users}</span>
      <button class="anitaMiniLike" type="button" data-anita-like-button>
        <img src="${HEART}" alt=""><strong data-anita-likes>—</strong>
      </button>`;
    header.appendChild(bar);
  }
  bindLikes();
  paintLiked();
}

function paintLiked(){
  const liked=localStorage.getItem(LIKE_KEY)==="1";
  root.querySelectorAll("[data-anita-like-button]").forEach(b=>b.classList.toggle("liked",liked));
}

function render(stats){
  const d=copy[lang()]||copy.en;
  root.querySelectorAll("[data-anita-users]").forEach(x=>x.textContent=fmt(stats.users));
  root.querySelectorAll("[data-anita-likes]").forEach(x=>x.textContent=fmt(stats.likes));
  root.querySelectorAll("[data-anita-users-label]").forEach(x=>x.textContent=d.users);
  root.querySelectorAll("[data-anita-likes-label]").forEach(x=>x.textContent=d.likes);
}

async function call(path,method){
  if(!ENDPOINT || ENDPOINT.includes("YOUR-WORKER")) throw new Error("ANITA community backend is not configured");
  const r=await fetch(ENDPOINT+path,{method:method||"GET",mode:"cors",cache:"no-store"});
  if(!r.ok) throw new Error("community backend "+r.status);
  return r.json();
}

async function refresh(){
  try{render(await call("/stats"));}catch(e){console.warn("[ANITA community]",e.message);}
}

async function registerVisit(){
  if(localStorage.getItem(VISIT_KEY)==="1") return refresh();
  try{
    const s=await call("/visit","POST");
    localStorage.setItem(VISIT_KEY,"1");
    render(s);
  }catch(e){
    console.warn("[ANITA community]",e.message);
    refresh();
  }
}

let liking=false;
async function like(){
  if(liking||localStorage.getItem(LIKE_KEY)==="1") return;
  liking=true;
  try{
    const s=await call("/like","POST");
    localStorage.setItem(LIKE_KEY,"1");
    render(s);paintLiked();
    const d=copy[lang()]||copy.en;
    root.querySelectorAll("[data-anita-thanks]").forEach(x=>x.textContent=d.thanks);
    setTimeout(()=>root.querySelectorAll("[data-anita-thanks]").forEach(x=>x.textContent=""),1600);
  }catch(e){console.warn("[ANITA community]",e.message);}
  finally{liking=false;}
}

function bindLikes(){
  root.querySelectorAll("[data-anita-like-button]").forEach(b=>{
    if(b.dataset.bound==="1") return;
    b.dataset.bound="1";
    b.addEventListener("click",like);
  });
}

root.querySelectorAll(".langBtn").forEach(b=>b.addEventListener("click",()=>setTimeout(()=>{renderLabelsOnly();},0)));
function renderLabelsOnly(){
  const d=copy[lang()]||copy.en;
  root.querySelectorAll("[data-anita-users-label]").forEach(x=>x.textContent=d.users);
  root.querySelectorAll("[data-anita-likes-label]").forEach(x=>x.textContent=d.likes);
}

inject();
registerVisit();
window.ANITA_COMMUNITY={version:"26.0",refresh,like};
console.log("[ANITA v26.0] Community stats UI loaded");
})();