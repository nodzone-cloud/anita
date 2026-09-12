(() => {
  "use strict";

  const CONFIG = {
    BUY_URL: "#", // add the real purchase URL later
    HOME_URL: "https://alexnode.fi/boook",
    BRAND_URL: "https://alexnode.fi/",
    BOOK_BASE_URL: "https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/alexnode-book-v7-emphasis",
    TEXT_FILES: { ru:"book-ru.txt", en:"book-en.txt", fi:"book-fi.txt" },
    CHAPTER_1_IMAGE: "https://optim.tildacdn.net/tild3665-6335-4532-b633-636638366462/-/format/webp/picture1.jpg.webp"
  };

  const I18N = {
    ru:{home:"Главная",about:"О книге",gallery:"Галерея",reviews:"Отзывы",buyShort:"Купить",buy:"Купить книгу",tagline:"Больше, чем бизнес —<br>это путь.",focusText:"Нажмите на переднюю обложку, чтобы открыть книгу.",openBook:"Открыть книгу",contents:"Содержание",zoom:"Увеличить",fullscreen:"На весь экран",share:"Поделиться",exitFullscreen:"Выйти из полноэкранного режима",swipe:"Листайте свайпом"},
    en:{home:"Home",about:"About the book",gallery:"Gallery",reviews:"Reviews",buyShort:"Buy",buy:"Buy the book",tagline:"More than business —<br>it's a journey.",focusText:"Click the front cover to open the book.",openBook:"Open book",contents:"Contents",zoom:"Zoom",fullscreen:"Full screen",share:"Share",exitFullscreen:"Exit full screen",swipe:"Swipe to turn pages"},
    fi:{home:"Etusivu",about:"Tietoa kirjasta",gallery:"Galleria",reviews:"Arvostelut",buyShort:"Osta",buy:"Osta kirja",tagline:"Enemmän kuin bisnes —<br>se on matka.",focusText:"Avaa kirja napsauttamalla etukantta.",openBook:"Avaa kirja",contents:"Sisältö",zoom:"Suurenna",fullscreen:"Koko näyttö",share:"Jaa",exitFullscreen:"Poistu koko näytön tilasta",swipe:"Vaihda sivua pyyhkäisemällä"}
  };

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const root = $("#anbook");
  const floatingCover = $("#floatingCover");
  const focusZone = $("#focusZone");
  const returnBooksBtn = $("#returnBooksBtn");
  const reader = $("#reader");
  const bookOpen = $("#bookOpen");
  const leftPage = $("#leftPage");
  const rightPage = $("#rightPage");
  const leftNum = $("#leftNum");
  const rightNum = $("#rightNum");
  const pageCounter = $("#pageCounter");
  const prevPage = $("#prevPage");
  const nextPage = $("#nextPage");
  const contentsPanel = $("#contentsPanel");
  const contentsList = $("#contentsList");

  let language = "ru";
  let rawBook = "";
  let parsed = null;
  let pages = [];
  let spread = 0;
  let opened = false;
  let focused = false;
  let zoomed = false;
  let backCoverZoomed = false;
  let resizeTimer = null;

  document.querySelector(".brand").href = CONFIG.BRAND_URL;
  document.querySelector('[data-i18n="home"]').href = CONFIG.HOME_URL;

  ["#buyButton","#buyLinkTop"].forEach(sel=>{
    const el = $(sel);
    if(!el) return;
    el.href = CONFIG.BUY_URL;
    if(CONFIG.BUY_URL === "#") el.addEventListener("click",e=>e.preventDefault());
  });

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  }

  function fmtInline(text){
    let safe = escapeHtml(String(text || ""));

    // Spoken lines / thoughts in Russian quotes are bold + italic,
    // but stay exactly the same body-text size.
    safe = safe.replace(
      /«([^»]+)»/g,
      '<span class="spoken">«$1»</span>'
    );

    // Straight double quotes too.
    safe = safe.replace(
      /&quot;([^&]+?)&quot;/g,
      '<span class="spoken">&quot;$1&quot;</span>'
    );

    return safe;
  }

  function normalizeBookSource(raw){
    let text = String(raw || "").replace(/\r/g,"");

    /*
      "Другая дорога" is a real chapter in this edition.
      The source TXT currently has it without a number, while the following
      chapter is still called Chapter 11. Normalize the visible edition here
      without requiring the source book-ru.txt to be rewritten.
    */
    text = text.replace(
      /(^|\n)Другая дорога(?=\n)/,
      '$1Глава 11. Другая дорога'
    );
    text = text.replace(
      /(^|\n)Глава 11\. Сумбур(?=\n|$)/,
      '$1Глава 12. Сумбур'
    );

    return text;
  }

  function isSpecialEmphasisLine(line){
    const exact = [
      "И именно тогда у идеи появилось имя:",
      "Ты можешь просто сказать:",
      "А система не отвечает:",
      "Выберите тип услуги:",
      "[Landing page] [Website] [E-commerce] [Other]",
      "Она отвечает:"
    ];
    return exact.includes(line);
  }

  function parseBook(raw){
    const normalized = normalizeBookSource(raw);
    const lines = normalized.split("\n").map(s=>s.trim());

    const firstChapter = lines.findIndex(x =>
      /^Глава\s+\d+\./i.test(x) ||
      /^Chapter\s+\d+\./i.test(x)
    );

    const introLines = (firstChapter >= 0 ? lines.slice(0,firstChapter) : lines)
      .filter(Boolean);

    const title = introLines[0] || "Alex Node & ANITA";
    const subtitle = introLines[1] || "";

    const blocks = [];
    const chapters = [];
    let paragraphBuffer = [];

    function flushParagraph(){
      if(!paragraphBuffer.length) return;

      // Source TXT often places every sentence on a new physical line.
      // Join those lines into a normal flowing book paragraph.
      const text = paragraphBuffer.join(" ").replace(/\s+/g," ").trim();

      if(text){
        blocks.push({
          type:"p",
          text,
          html:`<p>${fmtInline(text)}</p>`
        });
      }
      paragraphBuffer = [];
    }

    const rest = firstChapter >= 0 ? lines.slice(firstChapter) : lines;

    for(const rawLine of rest){
      const line = rawLine.trim();

      if(!line){
        flushParagraph();
        continue;
      }

      const chapterMatch =
        line.match(/^Глава\s+(\d+)\.\s*(.+)$/i) ||
        line.match(/^Chapter\s+(\d+)\.\s*(.+)$/i);

      if(chapterMatch){
        flushParagraph();

        const number = chapterMatch[1];
        const chapterTitle = chapterMatch[2].trim();
        const id = `chapter-${number}`;

        chapters.push({number,title:chapterTitle,id});

        blocks.push({
          type:"chapter",
          number,
          title:chapterTitle,
          id,
          html:
            `<div class="chapter-head" id="${id}">`+
              `<div class="chapter-label">`+
                `${language==="en"?"Chapter":language==="fi"?"Luku":"Глава"} ${escapeHtml(number)}`+
              `</div>`+
              `<h1 class="chapter-title">${escapeHtml(chapterTitle)}</h1>`+
            `</div>`
        });
        continue;
      }

      if(isSpecialEmphasisLine(line)){
        flushParagraph();
        blocks.push({
          type:"emphasis",
          text:line,
          html:`<p class="emphasis-line">${fmtInline(line)}</p>`
        });
        continue;
      }

      // A whole line that is direct speech / thought stays on its own,
      // and becomes bold+italic at normal story-text size.
      if(/^«.*»[.!?…]?$/u.test(line)){
        flushParagraph();
        blocks.push({
          type:"spoken",
          text:line,
          html:`<p class="spoken-block">${fmtInline(line)}</p>`
        });
        continue;
      }

      /*
        IMPORTANT:
        Do NOT guess headings from "short lines".
        That old heuristic caused ordinary story lines such as
        "И мне не хотелось строить Alex Node вокруг идеи:"
        to become huge fake headings.
      */
      paragraphBuffer.push(line);
    }

    flushParagraph();

    return {title,subtitle,blocks,chapters};
  }

  function makeIntroPage(data){
    return `
      <div class="book-title">${escapeHtml(data.title)}</div>
      <div class="book-subtitle">${escapeHtml(data.subtitle)}</div>
      <div class="chapter-hero-wrap">
        <img class="chapter-hero-image" src="${CONFIG.CHAPTER_1_IMAGE}" alt="Chapter 1 illustration">
      </div>`;
  }

  function makeTester(){
    const rect = leftPage.getBoundingClientRect();
    const t = document.createElement("div");
    t.className = "page-inner page-tester";
    t.style.width = `${Math.max(330,rect.width || 480)}px`;
    t.style.height = `${Math.max(450,rect.height || 610)}px`;
    document.body.appendChild(t);
    return t;
  }

  function fits(tester){
    return tester.scrollHeight <= tester.clientHeight + 1;
  }

  function splitWords(text){
    return String(text || "").trim().split(/\s+/).filter(Boolean);
  }

  function findLargestFittingChunk(words,prefixHtml,tester){
    if(!words.length) return {html:"", used:0};

    let low = 1, high = words.length, best = 0;

    while(low <= high){
      const mid = Math.floor((low + high) / 2);
      const chunk = words.slice(0,mid).join(" ");
      tester.innerHTML = prefixHtml + `<p>${fmtInline(chunk)}</p>`;

      if(fits(tester)){
        best = mid;
        low = mid + 1;
      }else{
        high = mid - 1;
      }
    }

    if(best === 0) return {html:"", used:0};

    const chunk = words.slice(0,best).join(" ");
    return {
      html:`<p>${fmtInline(chunk)}</p>`,
      used:best
    };
  }

  function paginateParagraph(text,current,tester,out){
    let words = splitWords(text);

    while(words.length){
      // First try the whole remaining paragraph.
      const whole = `<p>${fmtInline(words.join(" "))}</p>`;
      tester.innerHTML = current + whole;

      if(fits(tester)){
        current += whole;
        words = [];
        break;
      }

      // Put the largest possible part into the remaining space
      // on the CURRENT page. This is the key fix for chapter pages:
      // chapter heading + beginning of first paragraph stay together.
      const part = findLargestFittingChunk(words,current,tester);

      if(part.used > 0){
        current += part.html;
        words = words.slice(part.used);
      }

      // The current page is now full enough; commit it.
      if(current.trim()){
        out.push(current);
        current = "";
      }

      // Safety: if somehow not even one word fitted, force a fresh-page attempt.
      if(part.used === 0){
        const fresh = findLargestFittingChunk(words,"",tester);
        if(fresh.used > 0){
          current = fresh.html;
          words = words.slice(fresh.used);
        }else{
          // pathological ultra-long token fallback
          current = `<p>${fmtInline(words.shift())}</p>`;
        }
      }
    }

    return current;
  }

  function paginate(data){
    const tester = makeTester();
    const out = [makeIntroPage(data)];
    let current = "";

    for(let i=0;i<data.blocks.length;i++){
      const block = data.blocks[i];

      /*
        Chapters always begin on a clean page.
        IMPORTANT v1.4 FIX:
        We do NOT leave a chapter title alone anymore.
        The following paragraph is allowed to split, so the chapter page
        gets as much readable story text as can actually fit.
      */
      if(block.type === "chapter"){
        if(current.trim()){
          out.push(current);
          current = "";
        }

        current = block.html;

        const nextBlock = data.blocks[i+1];

        if(nextBlock && nextBlock.type === "p"){
          current = paginateParagraph(nextBlock.text,current,tester,out);
          i += 1; // consumed the paragraph, fully or across pages
        }

        continue;
      }

      if(block.type === "p"){
        current = paginateParagraph(block.text,current,tester,out);
        continue;
      }

      // Emphasis/spoken blocks remain body-sized.
      tester.innerHTML = current + block.html;

      if(fits(tester)){
        current += block.html;
      }else{
        if(current.trim()){
          out.push(current);
          current = "";
        }

        tester.innerHTML = block.html;

        if(fits(tester)){
          current = block.html;
        }else{
          // Rare fallback: strip to plain flowing text and paginate it.
          const tmp = document.createElement("div");
          tmp.innerHTML = block.html;
          current = paginateParagraph(tmp.textContent || block.text || "",current,tester,out);
        }
      }
    }

    if(current.trim()){
      out.push(current);
    }

    tester.remove();
    return out.length ? out : [makeIntroPage(data)];
  }

  async function loadBook(lang){
    language = lang;
    let url = `${CONFIG.BOOK_BASE_URL}/${CONFIG.TEXT_FILES[lang]}`;
    try{
      let r = await fetch(url,{cache:"no-store"});
      if(!r.ok) throw new Error("language file missing");
      rawBook = await r.text();
    }catch(_e){
      const r2 = await fetch(`${CONFIG.BOOK_BASE_URL}/${CONFIG.TEXT_FILES.ru}`,{cache:"no-store"});
      rawBook = await r2.text();
    }

    parsed = parseBook(rawBook);
    // Wait one frame so page dimensions are stable before measuring.
    requestAnimationFrame(()=>{
      pages = paginate(parsed);
      spread = 0;
      buildContents();
      render();
    });
  }

  function applyLanguage(lang){
    language = lang;
    document.documentElement.lang = lang;
    $$(".languages button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    $$("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      if(I18N[lang]?.[key]) el.innerHTML = I18N[lang][key];
    });
    loadBook(lang);
  }

  function toggleBackCoverZoom(){
    const back = $("#focusBack");
    if(!back) return;

    backCoverZoomed = !backCoverZoomed;
    focusZone.classList.toggle("back-zoom-active", backCoverZoomed);
    back.setAttribute("aria-pressed", backCoverZoomed ? "true" : "false");
  }

  function resetBackCoverZoom(){
    const back = $("#focusBack");
    backCoverZoomed = false;
    focusZone.classList.remove("back-zoom-active");
    if(back) back.setAttribute("aria-pressed","false");
  }

  function focusBook(){
    if(focused || opened) return;
    focused = true;
    const r = floatingCover.getBoundingClientRect();
    const ghost = floatingCover.cloneNode(true);
    ghost.removeAttribute("id");
    Object.assign(ghost.style,{
      position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px",
      zIndex:"9999",margin:"0",animation:"none",transition:"all .76s cubic-bezier(.2,.85,.18,1)"
    });
    document.body.appendChild(ghost);
    floatingCover.style.visibility="hidden";

    requestAnimationFrame(()=>{
      ghost.style.left=(innerWidth*.5-r.width*.5)+"px";
      ghost.style.top=(innerHeight*.45-r.height*.5)+"px";
      ghost.style.transform="scale(1.24)";
      ghost.style.opacity=".12";
    });

    setTimeout(()=>{
      ghost.remove();
      focusZone.classList.add("show");
      focusZone.setAttribute("aria-hidden","false");
      returnBooksBtn.classList.add("show");
    },740);
  }

  function returnToBookList(){
    resetBackCoverZoom();

    focusZone.classList.remove("show");
    focusZone.setAttribute("aria-hidden","true");
    returnBooksBtn.classList.remove("show");

    focused = false;
    opened = false;

    // Restore original floating cover.
    floatingCover.style.visibility = "visible";

    // Small re-entry animation so returning feels intentional.
    floatingCover.animate(
      [
        {opacity:0, transform:"translateX(38px) scale(.92)"},
        {opacity:1, transform:"translateX(0) scale(1)"}
      ],
      {
        duration:420,
        easing:"cubic-bezier(.2,.85,.18,1)"
      }
    );
  }

  function setReaderUI(active){
    pageCounter.classList.toggle("hidden",!active);
  }

  function openReader(){
    resetBackCoverZoom();
    returnBooksBtn.classList.remove("show");
    opened = true;
    focusZone.classList.remove("show");
    focusZone.setAttribute("aria-hidden","true");
    reader.classList.add("show");
    reader.setAttribute("aria-hidden","false");
    spread = 0;
    setReaderUI(true);
    render();
  }

  function closeReader(){
    opened = false;
    reader.classList.remove("show");
    reader.setAttribute("aria-hidden","true");
    focusZone.classList.add("show");
    focusZone.setAttribute("aria-hidden","false");
    setReaderUI(false);
  }

  function render(){
    if(!pages.length) return;
    const mobile = matchMedia("(max-width:900px)").matches;

    if(mobile){
      const i = Math.max(0,Math.min(spread,pages.length-1));
      leftPage.innerHTML = pages[i] || "";
      leftNum.textContent = i+1;
      rightPage.innerHTML = "";
      rightNum.textContent = "";
      pageCounter.textContent = `${i+1} / ${pages.length}`;
      return;
    }

    const li = Math.max(0,Math.min(spread*2,pages.length-1));
    const ri = li+1;
    leftPage.innerHTML = pages[li] || "";
    rightPage.innerHTML = pages[ri] || "";
    leftNum.textContent = li+1;
    rightNum.textContent = ri<pages.length ? ri+1 : "";
    pageCounter.textContent = `${Math.min(ri+1,pages.length)} / ${pages.length}`;

    prevPage.disabled = spread===0;
    nextPage.disabled = false;
  }

  function next(){
    const mobile = matchMedia("(max-width:900px)").matches;
    const max = mobile ? pages.length-1 : Math.ceil(pages.length/2)-1;
    if(spread < max){
      spread++;
      render();
    }else{
      closeReader();
      // finished: show front + back preview again
    }
  }

  function prev(){
    if(spread>0){
      spread--;
      render();
    }
  }

  function buildContents(){
    contentsList.innerHTML = "";
    const found = new Set();

    pages.forEach((html,index)=>{
      const d = document.createElement("div");
      d.innerHTML = html;
      const chapter = d.querySelector(".chapter-head");
      if(!chapter || found.has(chapter.id)) return;
      found.add(chapter.id);

      const label = chapter.querySelector(".chapter-label")?.textContent || "";
      const title = chapter.querySelector(".chapter-title")?.textContent || "";
      const b = document.createElement("button");
      b.className = "content-link";
      b.textContent = `${label}. ${title}`;
      b.addEventListener("click",()=>{
        spread = matchMedia("(max-width:900px)").matches ? index : Math.floor(index/2);
        contentsPanel.classList.remove("show");
        if(!opened) openReader();
        render();
      });
      contentsList.appendChild(b);
    });
  }

  $("#floatingCover").addEventListener("click",focusBook);
  returnBooksBtn.addEventListener("click",returnToBookList);
  $("#focusFront").addEventListener("click",openReader);
  $("#focusBack").addEventListener("click",toggleBackCoverZoom);
  $("#openBookButton").addEventListener("click",openReader);
  $("#closeReader").addEventListener("click",closeReader);
  prevPage.addEventListener("click",prev);
  nextPage.addEventListener("click",next);

  $$(".languages button").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));

  $("#fullscreenBtn").addEventListener("click",async()=>{
    try{ if(!document.fullscreenElement) await root.requestFullscreen(); }catch(e){ console.warn(e); }
  });
  $("#exitFullscreen").addEventListener("click",async()=>{
    try{ if(document.fullscreenElement) await document.exitFullscreen(); }catch(e){ console.warn(e); }
  });

  $("#zoomBtn").addEventListener("click",()=>{
    if(!opened) return;
    zoomed = !zoomed;
    bookOpen.classList.toggle("zoomed",zoomed);
  });

  $("#shareBtn").addEventListener("click",async()=>{
    try{
      if(navigator.share) await navigator.share({title:document.title,url:location.href});
      else{
        await navigator.clipboard.writeText(location.href);
        alert("Link copied");
      }
    }catch(_e){}
  });

  $("#contentsBtn").addEventListener("click",()=>{
    contentsPanel.classList.add("show");
    contentsPanel.setAttribute("aria-hidden","false");
  });
  $("#contentsClose").addEventListener("click",()=>{
    contentsPanel.classList.remove("show");
    contentsPanel.setAttribute("aria-hidden","true");
  });

  let touchX = null;
  reader.addEventListener("touchstart",e=>{touchX=e.changedTouches[0].clientX},{passive:true});
  reader.addEventListener("touchend",e=>{
    if(touchX==null)return;
    const dx=e.changedTouches[0].clientX-touchX;
    touchX=null;
    if(Math.abs(dx)<45)return;
    dx<0?next():prev();
  },{passive:true});

  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      if(!parsed) return;
      const oldRatio = pages.length ? (matchMedia("(max-width:900px)").matches ? spread/pages.length : (spread*2)/pages.length) : 0;
      pages=paginate(parsed);
      spread=matchMedia("(max-width:900px)").matches
        ? Math.min(pages.length-1,Math.max(0,Math.round(oldRatio*pages.length)))
        : Math.min(Math.ceil(pages.length/2)-1,Math.max(0,Math.round(oldRatio*pages.length/2)));
      buildContents();
      render();
    },180);
  });

  setReaderUI(false);
  applyLanguage("ru");
})();
