/* ALEX NODE & ANITA — SUPPORT TEXT UNDER MAIN BOOK CARD
   Works on desktop + mobile.
   Adds the support/purchase paragraph directly under .focus-copy.
*/
(function () {
  "use strict";

  const ID = "an-book-support-note";

  const COPY = {
    ru: "Серия книг Alex Node & ANITA доступна для бесплатного чтения. Вы также можете приобрести книгу и поддержать веб-студию Alex Node. Покупая книгу, вы становитесь небольшой частью истории Alex Node и помогаете нам расти, создавать новое и развивать наши идеи. Спасибо, что поддерживаете наш путь.",
    en: "The Alex Node & ANITA book series is free to read. You can also purchase the book to support the Alex Node web design studio. By buying a copy, you become a small part of the Alex Node story and help us grow, create, and develop new ideas. Thank you for supporting our journey.",
    fi: "Alex Node & ANITA -kirjasarjaa voi lukea ilmaiseksi. Voit myös ostaa kirjan ja tukea Alex Node -verkkosivustudiota. Ostamalla kirjan tulet pieneksi osaksi Alex Noden tarinaa ja autat meitä kasvamaan, luomaan uutta ja kehittämään uusia ideoita. Kiitos, että olet mukana matkallamme."
  };

  function addStyles() {
    if (document.getElementById("an-book-support-note-style")) return;

    const style = document.createElement("style");
    style.id = "an-book-support-note-style";
    style.textContent = `
      #${ID}{
        width:min(560px,88vw);
        margin:20px auto 0;
        color:#fff;
        text-align:center;
        font-family:Arial,sans-serif;
        font-size:15px;
        line-height:1.55;
        font-weight:400;
        text-shadow:0 2px 8px rgba(0,0,0,.75);
        opacity:.97;
        position:relative;
        z-index:15;
      }

      #${ID}::after{
        content:"♡";
        display:block;
        margin:14px auto 0;
        color:#fff;
        font-size:24px;
        line-height:1;
        opacity:.92;
      }

      @media screen and (max-width:640px){
        #${ID}{
          width:calc(100vw - 44px);
          margin:16px auto 0;
          font-size:12.5px;
          line-height:1.48;
          padding:0 2px;
        }

        #${ID}::after{
          margin-top:10px;
          font-size:21px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function currentLang() {
    const active = document.querySelector(".languages button.active[data-lang]");
    if (active) return active.dataset.lang || "ru";

    const htmlLang = document.documentElement.lang || "ru";
    if (htmlLang.toLowerCase().startsWith("en")) return "en";
    if (htmlLang.toLowerCase().startsWith("fi")) return "fi";
    return "ru";
  }

  function renderText() {
    const note = document.getElementById(ID);
    if (!note) return;

    const lang = currentLang();
    note.textContent = COPY[lang] || COPY.ru;
  }

  function mount() {
    addStyles();

    const focusZone = document.getElementById("focusZone");
    const focusCopy = focusZone && focusZone.querySelector(".focus-copy");

    if (!focusZone || !focusCopy) return false;

    let note = document.getElementById(ID);

    if (!note) {
      note = document.createElement("div");
      note.id = ID;

      /* Put the text directly AFTER the existing central card content */
      focusCopy.insertAdjacentElement("afterend", note);
    }

    renderText();
    return true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  /* Retry briefly in case the book UI is created after this script loads */
  let tries = 0;
  const timer = setInterval(function () {
    tries++;
    if (mount() || tries >= 20) clearInterval(timer);
  }, 150);

  /* Follow existing RU / EN / FI buttons */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest(".languages button[data-lang]");
    if (btn) setTimeout(renderText, 0);
  });
})();
