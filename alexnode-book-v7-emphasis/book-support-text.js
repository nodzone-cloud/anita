(() => {
  "use strict";

  const BOOK_PATHS = ["/boook", "/boook/"];

  function isBookPage() {
    return BOOK_PATHS.includes(window.location.pathname);
  }

  // Safety: never show this text outside the book page.
  if (!isBookPage()) {
    const existing = document.getElementById("anBookSupportDesktop");
    if (existing) existing.remove();
    return;
  }

  // Avoid duplicates.
  if (document.getElementById("anBookSupportDesktop")) return;

  const wrap = document.createElement("div");
  wrap.id = "anBookSupportDesktop";
  wrap.className = "an-book-support-desktop";
  wrap.innerHTML = `
    <div class="an-book-support-desktop__text">
      Серия книг Alex Node &amp; ANITA доступна для бесплатного чтения.<br>
      Вы также можете приобрести книгу и поддержать веб-студию Alex Node.<br>
      Покупая книгу, вы становитесь небольшой частью истории Alex Node<br>
      и помогаете нам расти, создавать новое и развивать наши идеи.<br>
      Спасибо, что поддерживаете наш путь.
    </div>

    <div class="an-book-support-desktop__decor">
      <span></span>
      <b>♡</b>
      <span></span>
    </div>
  `;

  document.body.appendChild(wrap);

  const style = document.createElement("style");
  style.id = "anBookSupportDesktopStyle";
  style.textContent = `
    #anBookSupportDesktop{
      display:none;
    }

    @media screen and (min-width:641px){
      #anBookSupportDesktop{
        display:block;
        position:fixed;
        left:50%;
        bottom:48px;
        transform:translateX(-50%);
        width:min(760px,70vw);
        z-index:30;
        color:#fff;
        text-align:center;
        font-family:Arial,Helvetica,sans-serif;
        font-size:14px;
        line-height:1.45;
        text-shadow:
          0 2px 8px rgba(0,0,0,.95),
          0 1px 3px rgba(0,0,0,.9);
        pointer-events:none;
        opacity:1;
        visibility:visible;
        transition:opacity .18s ease, visibility .18s ease;
      }

      #anBookSupportDesktop.is-hidden{
        opacity:0 !important;
        visibility:hidden !important;
      }

      #anBookSupportDesktop .an-book-support-desktop__decor{
        margin-top:9px;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:13px;
      }

      #anBookSupportDesktop .an-book-support-desktop__decor span{
        display:block;
        width:36px;
        height:1px;
        background:rgba(255,255,255,.7);
      }

      #anBookSupportDesktop .an-book-support-desktop__decor b{
        font-size:22px;
        font-weight:300;
        line-height:1;
      }
    }
  `;
  document.head.appendChild(style);

  function isReaderOpen() {
    const reader = document.getElementById("reader");
    if (!reader) return false;

    return (
      reader.getAttribute("aria-hidden") === "false" ||
      reader.classList.contains("show") ||
      reader.classList.contains("active") ||
      reader.classList.contains("open")
    );
  }

  function update() {
    if (!isBookPage()) {
      wrap.remove();
      return;
    }

    wrap.classList.toggle("is-hidden", isReaderOpen());
  }

  update();

  const reader = document.getElementById("reader");

  if (reader && "MutationObserver" in window) {
    new MutationObserver(update).observe(reader, {
      attributes: true,
      attributeFilter: ["aria-hidden", "class", "style"]
    });
  }

  document.addEventListener("click", () => {
    setTimeout(update, 50);
    setTimeout(update, 200);
    setTimeout(update, 500);
  });

  console.log("[AN BOOK SUPPORT] loaded only for /boook");
})();