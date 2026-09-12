/* ALEX NODE & ANITA — SUPPORT NOTE FIXED
   Stable placement:
   - does NOT move books, card, background or navigation
   - places the support text in the lower-center area of the book hero
   - works on desktop and mobile
*/
(function () {
  "use strict";

  const ID = "an-book-support-note-fixed";
  const STYLE_ID = "an-book-support-note-fixed-style";

  const COPY = {
    ru: "Серия книг Alex Node & ANITA доступна для бесплатного чтения. Вы также можете приобрести книгу и поддержать веб-студию Alex Node. Покупая книгу, вы становитесь небольшой частью истории Alex Node и помогаете нам расти, создавать новое и развивать наши идеи. Спасибо, что поддерживаете наш путь.",
    en: "The Alex Node & ANITA book series is free to read. You can also purchase the book to support the Alex Node web design studio. By buying a copy, you become a small part of the Alex Node story and help us grow, create, and develop new ideas. Thank you for supporting our journey.",
    fi: "Alex Node & ANITA -kirjasarjaa voi lukea ilmaiseksi. Voit myös ostaa kirjan ja tukea Alex Node -verkkosivustudiota. Ostamalla kirjan tulet pieneksi osaksi Alex Noden tarinaa ja autat meitä kasvamaan, luomaan uutta ja kehittämään uusia ideoita. Kiitos, että olet mukana matkallamme."
  };

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #anbook #book{
        position:relative !important;
      }

      #anbook #${ID}{
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        bottom:86px;
        width:min(560px,46vw);
        color:#fff;
        text-align:center;
        font-family:Arial,sans-serif;
        font-size:14px;
        line-height:1.5;
        font-weight:400;
        text-shadow:0 2px 8px rgba(0,0,0,.88);
        z-index:35;
        pointer-events:none;
        box-sizing:border-box;
      }

      #anbook #${ID}::after{
        content:"♡";
        display:block;
        margin:10px auto 0;
        color:#fff;
        font-size:22px;
        line-height:1;
        opacity:.95;
      }

      @media screen and (max-width:640px){
        #anbook #${ID}{
          bottom:112px;
          width:calc(100vw - 42px);
          max-width:500px;
          font-size:12px;
          line-height:1.42;
        }

        #anbook #${ID}::after{
          margin-top:8px;
          font-size:19px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function currentLang() {
    const active = document.querySelector(".languages button.active[data-lang]");
    if (active) return active.dataset.lang || "ru";

    const h = String(document.documentElement.lang || "ru").toLowerCase();
    if (h.startsWith("en")) return "en";
    if (h.startsWith("fi")) return "fi";
    return "ru";
  }

  function renderText() {
    const note = document.getElementById(ID);
    if (!note) return;
    note.textContent = COPY[currentLang()] || COPY.ru;
  }

  function mount() {
    addStyles();

    const hero = document.querySelector("#anbook #book");
    if (!hero) return false;

    [
      "an-book-support-note",
      "an-book-support-note-v2",
      "an-book-support-note-v3",
      "an-book-support-note-v4"
    ].forEach(function(oldId){
      const old = document.getElementById(oldId);
      if (old) old.remove();
    });

    let note = document.getElementById(ID);
    if (!note) {
      note = document.createElement("div");
      note.id = ID;
      hero.appendChild(note);
    }

    renderText();
    return true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once:true });
  } else {
    mount();
  }

  let tries = 0;
  const timer = setInterval(function(){
    tries++;
    if (mount() || tries >= 20) clearInterval(timer);
  }, 150);

  document.addEventListener("click", function(e){
    const btn = e.target.closest && e.target.closest(".languages button[data-lang]");
    if (btn) setTimeout(renderText, 0);
  });
})();
