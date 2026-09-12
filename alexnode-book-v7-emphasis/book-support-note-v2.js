/* ALEX NODE & ANITA — SUPPORT NOTE v2
   Places the text DIRECTLY UNDER the existing central .focus-copy card.
   Works on desktop + mobile.
*/
(function () {
  "use strict";

  const ID = "an-book-support-note-v2";
  const STYLE_ID = "an-book-support-note-v2-style";

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
      #anbook #focusZone .focus-copy{
        position:relative !important;
        overflow:visible !important;
      }

      #anbook #${ID}{
        position:absolute;
        top:calc(100% + 20px);
        left:50%;
        transform:translateX(-50%);
        width:min(620px,48vw);
        color:#fff;
        text-align:center;
        font-family:Arial,sans-serif;
        font-size:15px;
        line-height:1.52;
        font-weight:400;
        text-shadow:0 2px 8px rgba(0,0,0,.82);
        z-index:30;
        pointer-events:none;
      }

      #anbook #${ID}::after{
        content:"♡";
        display:block;
        margin:12px auto 0;
        color:#fff;
        font-size:23px;
        line-height:1;
        opacity:.94;
      }

      @media screen and (max-width:640px){
        #anbook #${ID}{
          top:calc(100% + 14px);
          width:min(88vw,500px);
          font-size:12.5px;
          line-height:1.45;
        }

        #anbook #${ID}::after{
          margin-top:9px;
          font-size:20px;
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

    const focusCopy = document.querySelector("#anbook #focusZone .focus-copy");
    if (!focusCopy) return false;

    /* remove the old v1 note if it exists */
    const old = document.getElementById("an-book-support-note");
    if (old) old.remove();

    let note = document.getElementById(ID);
    if (!note) {
      note = document.createElement("div");
      note.id = ID;
      focusCopy.appendChild(note);
    } else if (note.parentElement !== focusCopy) {
      focusCopy.appendChild(note);
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
  const timer = setInterval(function () {
    tries++;
    if (mount() || tries >= 20) clearInterval(timer);
  }, 150);

  document.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest(".languages button[data-lang]");
    if (btn) setTimeout(renderText, 0);
  });
})();
