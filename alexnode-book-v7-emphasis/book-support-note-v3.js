/* ALEX NODE & ANITA — SUPPORT NOTE v3
   Places the white support text visually DIRECTLY UNDER
   the existing central .focus-copy card, matching the shown mockup.
   Works on desktop + mobile. Does not move books/card/background/navigation.
*/
(function () {
  "use strict";

  const ID = "an-book-support-note-v3";
  const STYLE_ID = "an-book-support-note-v3-style";

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
      #anbook #focusZone{
        position:relative !important;
        overflow:visible !important;
      }

      #anbook #${ID}{
        position:absolute;
        color:#fff;
        text-align:center;
        font-family:Arial,sans-serif;
        font-weight:400;
        font-size:14px;
        line-height:1.5;
        text-shadow:0 2px 8px rgba(0,0,0,.85);
        z-index:40;
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

  function placeNote() {
    const zone = document.querySelector("#anbook #focusZone");
    const card = zone && zone.querySelector(".focus-copy");
    const note = document.getElementById(ID);
    if (!zone || !card || !note) return;

    const zoneRect = zone.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const isMobile = window.matchMedia("(max-width:640px)").matches;

    const width = isMobile
      ? Math.min(window.innerWidth - 42, 470)
      : Math.min(Math.max(cardRect.width * 1.55, 430), 520);

    const left = (cardRect.left - zoneRect.left) + (cardRect.width / 2);
    const top = (cardRect.bottom - zoneRect.top) + (isMobile ? 14 : 18);

    note.style.width = width + "px";
    note.style.left = left + "px";
    note.style.top = top + "px";
    note.style.transform = "translateX(-50%)";
  }

  function mount() {
    addStyles();

    const zone = document.querySelector("#anbook #focusZone");
    const card = zone && zone.querySelector(".focus-copy");
    if (!zone || !card) return false;

    ["an-book-support-note", "an-book-support-note-v2"].forEach(function(id){
      const old = document.getElementById(id);
      if (old) old.remove();
    });

    let note = document.getElementById(ID);
    if (!note) {
      note = document.createElement("div");
      note.id = ID;
      zone.appendChild(note);
    }

    renderText();
    requestAnimationFrame(placeNote);
    return true;
  }

  function refresh() {
    if (mount()) {
      setTimeout(placeNote, 60);
      setTimeout(placeNote, 220);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refresh, { once:true });
  } else {
    refresh();
  }

  let tries = 0;
  const timer = setInterval(function () {
    tries++;
    if (mount() || tries >= 20) clearInterval(timer);
  }, 150);

  window.addEventListener("resize", placeNote);
  window.addEventListener("orientationchange", function(){
    setTimeout(placeNote, 120);
  });

  document.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest(".languages button[data-lang]");
    if (btn) {
      setTimeout(function(){
        renderText();
        placeNote();
      }, 0);
    }
  });
})();
