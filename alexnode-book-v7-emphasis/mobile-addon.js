/* Alex Node & ANITA — MOBILE ADD-ON ONLY
   Runs only on screens <= 760px.
   Does not change the desktop book layout or desktop DOM.
*/
(function(){
  "use strict";

  const MQ = window.matchMedia("(max-width: 760px)");
  const ID = "an-mobile-book-addon";

  const COPY = {
    ru: {
      titleAlex: "Alex Node",
      titleAnita: "ANITA",
      sub: "История, которая пишется сейчас"
    },
    en: {
      titleAlex: "Alex Node",
      titleAnita: "ANITA",
      sub: "The story being written now"
    },
    fi: {
      titleAlex: "Alex Node",
      titleAnita: "ANITA",
      sub: "Tarina, jota kirjoitetaan juuri nyt"
    }
  };

  function normalizeLang(v){
    v = String(v || "").toLowerCase();
    if(v.startsWith("fi")) return "fi";
    if(v.startsWith("en")) return "en";
    return "ru";
  }

  function getCurrentLang(){
    if(window.AN_BOOK_MOBILE_ADDON_LANG) {
      return normalizeLang(window.AN_BOOK_MOBILE_ADDON_LANG);
    }

    const htmlLang = document.documentElement.getAttribute("lang");
    if(htmlLang) return normalizeLang(htmlLang);

    return "ru";
  }

  function renderLanguage(lang){
    const el = document.getElementById(ID);
    if(!el) return;
    const c = COPY[normalizeLang(lang)];
    el.querySelector(".an-mobile-alex").textContent = c.titleAlex;
    el.querySelector(".an-mobile-anita").textContent = c.titleAnita;
    el.querySelector(".an-mobile-book-addon-sub").textContent = c.sub;
    el.dataset.lang = normalizeLang(lang);
  }

  function mount(){
    if(!MQ.matches) return;

    const root = document.getElementById("an-book-app");
    if(!root) return;

    let el = document.getElementById(ID);
    if(!el){
      el = document.createElement("div");
      el.id = ID;
      el.className = "an-mobile-book-addon";
      el.setAttribute("aria-hidden","true");
      el.innerHTML = `
        <div class="an-mobile-book-addon-title">
          <span class="an-mobile-alex"></span>
          <span class="an-mobile-amp">&amp;</span>
          <span class="an-mobile-anita"></span>
        </div>
        <div class="an-mobile-book-addon-sub"></div>
        <div class="an-mobile-book-addon-accent"></div>
      `;

      /* Put it after the header and before the book/cover area. */
      const header = root.querySelector(".an-book-header");
      if(header && header.nextSibling){
        root.insertBefore(el, header.nextSibling);
      }else{
        root.appendChild(el);
      }
    }

    renderLanguage(getCurrentLang());
  }

  function unmountDesktop(){
    if(MQ.matches) return;
    const el = document.getElementById(ID);
    if(el) el.remove();
  }

  function sync(){
    if(MQ.matches) mount();
    else unmountDesktop();
  }

  /* Public mini API.
     If your RU/EN/FI buttons already have their own language code,
     call: ANBookMobileAddon.setLanguage("en")
  */
  window.ANBookMobileAddon = {
    setLanguage(lang){
      window.AN_BOOK_MOBILE_ADDON_LANG = normalizeLang(lang);
      renderLanguage(lang);
    },
    refresh: sync
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", sync, {once:true});
  }else{
    sync();
  }

  if(MQ.addEventListener) MQ.addEventListener("change", sync);
  else if(MQ.addListener) MQ.addListener(sync);

  /* Book loader can finish after this add-on. Retry briefly on mobile only. */
  let tries = 0;
  const timer = setInterval(function(){
    tries++;
    if(!MQ.matches){ clearInterval(timer); return; }
    if(document.getElementById("an-book-app")){
      mount();
      if(document.querySelector("#an-book-app .an-book-header") || tries >= 20){
        clearInterval(timer);
      }
    }
    if(tries >= 20) clearInterval(timer);
  },150);
})();
