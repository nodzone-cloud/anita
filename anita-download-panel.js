/* ANITA Download Panel — GitHub UI test v1.1
   Forces a real download via fetch -> Blob -> temporary object URL.
*/
(function(){
"use strict";

const script = document.currentScript;
const base = script && script.src
  ? new URL(".", script.src).href
  : "https://nodzone-cloud.github.io/anita/";

const fileUrl = base + "ANITA-DEMO.png";
const fileName = "ANITA-DEMO.png";

async function forceDownload(button){
  const oldText = button.textContent;
  button.textContent = "Загрузка…";
  button.setAttribute("aria-busy","true");
  button.style.pointerEvents = "none";

  try{
    const res = await fetch(fileUrl, { cache:"no-store" });
    if(!res.ok) throw new Error("HTTP " + res.status);

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(objectUrl), 3000);
    button.textContent = "Скачивание началось";
    setTimeout(() => { button.textContent = oldText; }, 1800);
  }catch(err){
    console.error("[ANITA Download]", err);
    button.textContent = "Не удалось скачать";
    setTimeout(() => { button.textContent = oldText; }, 2200);
  }finally{
    button.removeAttribute("aria-busy");
    button.style.pointerEvents = "";
  }
}

function render(){
  const root = document.getElementById("anita-download-panel");
  if(!root || root.dataset.ready === "1") return;
  root.dataset.ready = "1";

  const st = document.createElement("style");
  st.textContent = `
    #anita-download-panel{
      width:min(920px,calc(100% - 28px));
      margin:22px auto 34px;
      font-family:Arial,Helvetica,sans-serif
    }
    #anita-download-panel .card{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:22px;
      padding:22px 26px;
      border-radius:24px;
      background:linear-gradient(135deg,#111114,#18151f);
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 18px 45px rgba(0,0,0,.20);
      color:#fff
    }
    #anita-download-panel h3{
      margin:0 0 6px;
      font-size:clamp(22px,3vw,32px);
      line-height:1.08
    }
    #anita-download-panel p{
      margin:0;
      color:rgba(255,255,255,.68);
      font-size:14px
    }
    #anita-download-panel button{
      flex:0 0 auto;
      min-width:170px;
      min-height:56px;
      padding:0 24px;
      border:0;
      border-radius:17px;
      color:#fff;
      font-size:17px;
      font-weight:800;
      background:linear-gradient(90deg,#7b2cff,#ff6a00);
      box-shadow:0 10px 28px rgba(255,106,0,.22);
      cursor:pointer
    }
    @media(max-width:640px){
      #anita-download-panel{width:calc(100% - 24px);margin:16px auto 26px}
      #anita-download-panel .card{align-items:stretch;flex-direction:column;padding:20px}
      #anita-download-panel button{width:100%;box-sizing:border-box}
    }
  `;
  document.head.appendChild(st);

  root.innerHTML = `
    <div class="card">
      <div>
        <h3>Скачать ANITA DEMO</h3>
        <p>Тест загрузки файла через внешний модуль ANITA</p>
      </div>
      <button type="button" id="anita-download-button">Скачать</button>
    </div>
  `;

  document.getElementById("anita-download-button")
    .addEventListener("click", function(){ forceDownload(this); });
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded",render,{once:true});
}else{
  render();
}
})();