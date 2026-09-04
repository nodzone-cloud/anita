/* ANITA Download Panel — GitHub UI test */
(function(){
"use strict";
const s=document.currentScript;
const base=s&&s.src?new URL(".",s.src).href:"https://nodzone-cloud.github.io/anita/";
function render(){
 const root=document.getElementById("anita-download-panel");
 if(!root||root.dataset.ready)return;
 root.dataset.ready="1";
 const st=document.createElement("style");
 st.textContent=`
 #anita-download-panel{width:min(920px,calc(100% - 28px));margin:22px auto 34px;font-family:Arial,sans-serif}
 #anita-download-panel .card{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:22px 26px;border-radius:24px;background:linear-gradient(135deg,#111114,#18151f);border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 45px rgba(0,0,0,.20);color:#fff}
 #anita-download-panel h3{margin:0 0 6px;font-size:clamp(22px,3vw,32px);line-height:1.08}
 #anita-download-panel p{margin:0;color:rgba(255,255,255,.68);font-size:14px}
 #anita-download-panel a{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-width:170px;min-height:56px;padding:0 24px;border-radius:17px;color:#fff;text-decoration:none;font-size:17px;font-weight:800;background:linear-gradient(90deg,#7b2cff,#ff6a00);box-shadow:0 10px 28px rgba(255,106,0,.22)}
 @media(max-width:640px){#anita-download-panel{width:calc(100% - 24px);margin:16px auto 26px}#anita-download-panel .card{align-items:stretch;flex-direction:column;padding:20px}#anita-download-panel a{box-sizing:border-box;width:100%}}
 `;
 document.head.appendChild(st);
 root.innerHTML=`<div class="card"><div><h3>Скачать ANITA DEMO</h3><p>Тест загрузки файла через внешний модуль ANITA</p></div><a href="${base}ANITA-DEMO.png" download="ANITA-DEMO.png">Скачать</a></div>`;
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});else render();
})();