/* ANITA v25.1.1 — Expression / Visual Reaction Layer (load-safe patch)
   Fixes black portrait flash when focus image is not yet loaded.
   - Preloads both reaction images.
   - Never reveals the portrait overlay until the image has actually loaded.
   - No black background on the overlay image.
   - Happy image waits for load and fails silently without breaking the chat.
*/
(function(){
  "use strict";

  const VERSION = "25.1.1";
  const BASE = "https://nodzone-cloud.github.io/anita/";
  const HAPPY_IMAGE = BASE + "anita-happy.png?v=" + VERSION;
  const FOCUS_IMAGE = BASE + "anita-focus.png?v=" + VERSION;

  let pendingHappyImage = false;
  let focusTimer = null;
  let focusPreload = null;
  let happyPreload = null;

  function norm(text){
    return String(text || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function language(l){
    const x = String(l || "").toLowerCase();
    if(x === "ru" || x === "fi" || x === "en") return x;
    try{
      const m = window.ANITA_MEMORY && window.ANITA_MEMORY.state && window.ANITA_MEMORY.state.language;
      if(m === "ru" || m === "fi" || m === "en") return m;
    }catch(_){ }
    return "en";
  }

  function satisfaction(text){
    const t = norm(text);
    if(!t) return false;
    return [
      /\bthank(?:s| you)?\b/, /\bthanks a lot\b/, /\bappreciate it\b/,
      /\bthat helped\b/, /\byou helped\b/, /\bit works(?: now)?\b/,
      /\bworking now\b/, /\bfixed(?: it| now)?\b/, /\bproblem (?:is )?solved\b/,
      /\bsolved it\b/, /\bспасибо\b/, /\bспс\b/, /\bблагодарю\b/,
      /\bпомогло\b/, /\bзаработало\b/, /\bтеперь работает\b/,
      /\bвс[её] работает\b/, /\bполучилось\b/, /\bрешено\b/,
      /\bkiitos\b/, /\bkiitti\b/, /\btoimii nyt\b/, /\bnyt toimii\b/,
      /\bse auttoi\b/, /\bratkesi\b/, /\bonnistui\b/
    ].some(r => r.test(t));
  }

  function frustration(text){
    const t = norm(text);
    if(!t) return false;
    return [
      /\bfuck\b/, /\bfucking\b/, /\bfuck you\b/, /\bomfg\b/, /\bwtf\b/,
      /\bbullshit\b/, /\bbitch\b/, /\bgo to hell\b/, /\bthis sucks\b/,
      /\banita sucks\b/, /\bshit\b/, /\bdamn\b/,
      /\bбля(?:ть|дь)?\b/, /\bсука\b/, /\bхерн(?:я|и)\b/, /\bдерьмо\b/,
      /\bпошла ты\b/, /\bиди к черту\b/, /\bиди к ч[её]рту\b/,
      /\bvittu\b/, /\bperkele\b/, /\bpaska\b/
    ].some(r => r.test(t));
  }

  function problemSignal(text){
    const t = norm(text);
    if(!t) return false;
    return [
      /\bproblem\b/, /\bissue\b/, /\btrouble\b/, /\bsomething(?:'s| is) wrong\b/,
      /\bnot working\b/, /\bdoesn(?:'t|t) work\b/, /\bstopped working\b/,
      /\berror\b/, /\bfailed\b/, /\bfailure\b/, /\bcrash(?:ed|ing|es)?\b/,
      /\bfreez(?:e|es|ing|en)\b/, /\bslow\b/, /\bsluggish\b/, /\blag(?:gy|ging|s)?\b/,
      /\bvirus\b/, /\bmalware\b/, /\bthreat\b/, /\bblue screen\b/, /\bbsod\b/,
      /\bпроблем(?:а|ы|у|ой)\b/, /\bне работает\b/, /\bперестал[аои]? работать\b/,
      /\bошибк(?:а|и|у|ой)\b/, /\bзавис(?:ает|ло|ает постоянно)?\b/,
      /\bтормозит\b/, /\bлагает\b/, /\bмедленно\b/, /\bвирус\b/,
      /\bongelma\b/, /\bei toimi\b/, /\bvirhe\b/, /\bhidas\b/, /\blagaa\b/,
      /\bkaatuu\b/, /\bjumittuu\b/, /\bhaittaohjelma\b/
    ].some(r => r.test(t));
  }

  function happyReply(l){
    const lang = language(l);
    if(lang === "ru") return "Рада, что смогла помочь 😊 Если есть ещё вопрос или проблема с компьютером — рассказывай.";
    if(lang === "fi") return "Kiva, että pystyin auttamaan 😊 Jos tietokoneessa on vielä jotain, kerro vain.";
    return "Happy I could help 😊 If there’s anything else with your computer, tell me and we’ll take a look.";
  }

  function ensureStyle(){
    if(document.getElementById("anitaExpressionStyle")) return;
    const style = document.createElement("style");
    style.id = "anitaExpressionStyle";
    style.textContent = `
      #anitaDemoRoot .anitaExpressionChatImage{
        display:block;width:min(320px,100%);max-height:360px;object-fit:cover;
        object-position:center top;margin:10px 0 2px;border-radius:14px;
        border:1px solid rgba(0,0,0,.08);box-shadow:0 8px 24px rgba(0,0,0,.10)
      }
      #anitaDemoRoot .anitaPortraitExpression{
        position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
        object-position:center top;z-index:2;opacity:0;visibility:hidden;
        transition:opacity .14s ease;pointer-events:none;background:transparent
      }
      #anitaDemoRoot .anitaPortraitExpression.show{opacity:1;visibility:visible}
      #anitaDemoRoot .anitaPortraitBadge{z-index:4}
      #anitaDemoRoot .anitaIntroSoundStart{z-index:5}
    `;
    document.head.appendChild(style);
  }

  function preloadImages(){
    happyPreload = new Image();
    happyPreload.decoding = "async";
    happyPreload.src = HAPPY_IMAGE;
    focusPreload = new Image();
    focusPreload.decoding = "async";
    focusPreload.src = FOCUS_IMAGE;
  }

  function appendHappyImage(messageNode){
    if(!messageNode || messageNode.querySelector(".anitaExpressionChatImage")) return;
    const img = document.createElement("img");
    img.className = "anitaExpressionChatImage";
    img.alt = "ANITA smiling, winking and giving a thumbs up";
    img.loading = "eager";
    img.decoding = "async";
    img.style.display = "none";
    img.onload = function(){
      this.style.display = "block";
      try{
        const chat = document.getElementById("chat");
        if(chat) chat.scrollTop = chat.scrollHeight;
      }catch(_){ }
    };
    img.onerror = function(){ this.remove(); };
    img.src = HAPPY_IMAGE;
    messageNode.appendChild(img);
  }

  function ensurePortraitExpression(){
    const portrait = document.querySelector("#anitaDemoRoot .anitaPortrait");
    if(!portrait) return null;
    let img = portrait.querySelector(".anitaPortraitExpression");
    if(!img){
      img = document.createElement("img");
      img.className = "anitaPortraitExpression";
      img.alt = "ANITA focused on a difficult computer problem";
      img.decoding = "async";
      img.onload = function(){ this.dataset.loaded = "1"; };
      img.onerror = function(){
        this.dataset.loaded = "0";
        this.classList.remove("show");
      };
      img.src = FOCUS_IMAGE;
      portrait.appendChild(img);
    }
    return img;
  }

  function revealFocusWhenReady(img,duration){
    if(!img) return;
    const show = function(){
      if(!(img.complete && img.naturalWidth > 0)) return;
      img.dataset.loaded = "1";
      requestAnimationFrame(function(){ img.classList.add("show"); });
      if(focusTimer) clearTimeout(focusTimer);
      focusTimer = setTimeout(function(){
        img.classList.remove("show");
        focusTimer = null;
      }, Math.max(500, Number(duration) || 2000));
    };

    if(img.complete){
      show();
    }else{
      img.addEventListener("load", show, {once:true});
      img.addEventListener("error", function(){ img.classList.remove("show"); }, {once:true});
    }
  }

  function showFocusedPortrait(duration){
    ensureStyle();
    const img = ensurePortraitExpression();
    if(!img) return;
    // Never expose a blank/black overlay while the PNG is still downloading.
    revealFocusWhenReady(img,duration);
  }

  function observeChat(){
    const chat = document.getElementById("chat");
    if(!chat || chat.dataset.anitaExpressionsObserved === "1") return;
    chat.dataset.anitaExpressionsObserved = "1";
    const observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(!node || node.nodeType !== 1) return;
          const inspect = [];
          if(node.matches && node.matches(".msg")) inspect.push(node);
          if(node.querySelectorAll) node.querySelectorAll(".msg").forEach(x => inspect.push(x));
          inspect.forEach(function(msg){
            if(msg.classList.contains("user")){
              const txt = msg.textContent || "";
              if(frustration(txt) || problemSignal(txt)) showFocusedPortrait(2000);
            }else if(msg.classList.contains("bot") && pendingHappyImage){
              pendingHappyImage = false;
              appendHappyImage(msg);
            }
          });
        });
      });
    });
    observer.observe(chat,{childList:true,subtree:true});
  }

  function wrapConversation(){
    if(!window.ANITA_V7 || typeof window.ANITA_V7.handle !== "function") return false;
    if(window.ANITA_V7.__expressionLayer25_1_1) return true;
    const previous = window.ANITA_V7.handle.bind(window.ANITA_V7);
    window.ANITA_V7.handle = function(text,l){
      if(satisfaction(text)){
        pendingHappyImage = true;
        return {type:"answer", text:happyReply(l)};
      }
      if(frustration(text) || problemSignal(text)) showFocusedPortrait(2000);
      return previous(text,l);
    };
    window.ANITA_V7.__expressionLayer25_1_1 = true;
    return true;
  }

  function init(){
    ensureStyle();
    preloadImages();
    ensurePortraitExpression();
    observeChat();
    wrapConversation();
  }

  window.ANITA_EXPRESSIONS = {
    version:VERSION,happyImage:HAPPY_IMAGE,focusImage:FOCUS_IMAGE,
    isSatisfied:satisfaction,isFrustrated:frustration,hasProblemSignal:problemSignal,
    showFocused:function(){ showFocusedPortrait(2000); }
  };

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();

  console.log("[ANITA v25.1.1] Expression Visual Layer loaded");
})();
